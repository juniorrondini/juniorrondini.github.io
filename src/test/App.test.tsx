import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import App from "../App";
import { copy, experiments, projects } from "../content";
import { preferences } from "./setup";

describe("Visitor journeys", () => {
  it("starts in Portuguese, follows the system theme and keeps core content outside WebGL", () => {
    preferences.dark = true;
    const { container } = render(<App />);
    expect(document.documentElement.lang).toBe("pt-BR");
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
      "Junior Rondini",
    );
    expect(container.querySelector("canvas")).toBeNull();
    expect(screen.getByRole("img", { name: copy.pt.sceneLabel })).toBeTruthy();
    for (const id of ["work", "about", "lab", "contact"])
      expect(container.querySelector(`#${id}`)).toBeTruthy();
    expect(
      screen
        .getByRole("link", { name: /jjrondinijj@gmail.com/ })
        .getAttribute("href"),
    ).toBe("mailto:jjrondinijj@gmail.com");
  });

  it("switches the complete interface and project details to English, then restores the saved choice", () => {
    const page = render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Switch to English" }));
    expect(document.documentElement.lang).toBe("en");
    expect(localStorage.getItem("jr-lang")).toBe("en");
    expect(screen.getByText("Ideas taking")).toBeTruthy();
    expect(screen.getByText(copy.en.aboutIntro)).toBeTruthy();
    fireEvent.click(
      screen.getByRole("button", { name: "Explore project: Genesys Website" }),
    );
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText(projects[0].context.en)).toBeTruthy();
    expect(within(dialog).getByText(copy.en.privateNote)).toBeTruthy();
    fireEvent.click(within(dialog).getByRole("button", { name: "Close" }));
    page.unmount();
    render(<App />);
    expect(
      screen.getByRole("button", { name: "Mudar para português" }),
    ).toBeTruthy();
  });

  it("persists the selected theme and restores it on a new visit", () => {
    const page = render(<App />);
    fireEvent.click(screen.getByRole("button", { name: copy.pt.theme }));
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(localStorage.getItem("jr-theme")).toBe("dark");
    page.unmount();
    render(<App />);
    expect(
      screen
        .getByRole("button", { name: copy.pt.theme })
        .getAttribute("aria-pressed"),
    ).toBe("true");
  });

  it("opens each project with truthful context, respects private sources and provides only confirmed demos", () => {
    render(<App />);
    for (const project of projects) {
      const button = project.preview
        ? screen.getByRole("button", {
            name: `${copy.pt.viewProject}: ${project.name}`,
          })
        : screen.getByRole("button", { name: new RegExp(project.name) });
      button.focus();
      fireEvent.click(button);
      const dialog = screen.getByRole("dialog");
      expect(dialog.hasAttribute("open")).toBe(true);
      expect(document.body.style.overflow).toBe("hidden");
      expect(
        within(dialog).getByRole("heading", { name: project.name }),
      ).toBeTruthy();
      expect(within(dialog).getByText(project.context.pt)).toBeTruthy();
      expect(
        within(dialog)
          .getByRole("link", {
            name: project.private ? copy.pt.privateCode : copy.pt.code,
          })
          .getAttribute("href"),
      ).toBe(project.repo);
      expect(
        within(dialog)
          .queryByRole("link", { name: copy.pt.visit })
          ?.getAttribute("href"),
      ).toBe(project.demo);
      fireEvent.click(
        within(dialog).getByRole("button", { name: copy.pt.close }),
      );
      expect(screen.queryByRole("dialog")).toBeNull();
      expect(document.body.style.overflow).toBe("");
      expect(document.activeElement).toBe(button);
    }
  });

  it("handles native dialog cancellation and mobile navigation without leaving the page locked", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: copy.pt.menu }));
    expect(
      screen
        .getByRole("button", { name: copy.pt.menu })
        .getAttribute("aria-expanded"),
    ).toBe("true");
    let dialog = screen.getByRole("dialog");
    fireEvent.click(within(dialog).getByRole("link", { name: /Laboratório/ }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.body.style.overflow).toBe("");
    fireEvent.click(screen.getByRole("button", { name: copy.pt.menu }));
    dialog = screen.getByRole("dialog");
    fireEvent(dialog, new Event("close", { bubbles: false }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.body.style.overflow).toBe("");
  });

  it("shows only captured project interfaces and links to real experiments", () => {
    render(<App />);
    const featured = projects.filter((project) => project.preview);
    expect(screen.getAllByRole("img").length).toBe(1 + featured.length);
    for (const project of featured) {
      const image = screen.getByRole("img", { name: project.preview!.alt.pt });
      expect(image.getAttribute("src")).toBe(project.preview!.src);
      expect(image.getAttribute("srcset")).toContain(project.preview!.smallSrc);
      expect(screen.getByText(project.preview!.source)).toBeTruthy();
    }
    expect(screen.queryByRole("slider")).toBeNull();
    for (const item of experiments)
      expect(
        screen
          .getByRole("link", { name: `${copy.pt.labLink}: ${item.name}` })
          .getAttribute("href"),
      ).toBe(item.url);
  });

  it("remains usable with invalid preferences and blocked browser storage", () => {
    localStorage.setItem("jr-lang", "invalid");
    localStorage.setItem("jr-theme", "invalid");
    render(<App />);
    expect(document.documentElement.lang).toBe("pt-BR");
    expect(document.documentElement.dataset.theme).toBe("light");
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = () => {
      throw new DOMException("Disabled", "SecurityError");
    };
    try {
      fireEvent.click(screen.getByRole("button", { name: copy.pt.theme }));
      fireEvent.click(screen.getByRole("button", { name: copy.pt.language }));
      expect(document.documentElement.dataset.theme).toBe("dark");
      expect(document.documentElement.lang).toBe("en");
    } finally {
      Storage.prototype.setItem = original;
    }
  });
});
