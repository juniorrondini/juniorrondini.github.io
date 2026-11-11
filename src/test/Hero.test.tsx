import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Hero } from "../components/Hero";
import { copy, projects } from "../content";
import { preferences } from "./setup";

// State and accessibility are covered here; browser scenarios verify the motion itself.
vi.mock("gsap", () => ({
  default: {
    context: (callback: () => void) => {
      callback();
      return { revert: vi.fn() };
    },
    fromTo: vi.fn(),
    matchMedia: () => ({ add: vi.fn(), revert: vi.fn() }),
  },
}));
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("Hero work preview", () => {
  it("changes to a real project, pauses after a manual choice and opens its details", () => {
    preferences.reduce = false;
    const open = vi.fn();
    render(<Hero language="pt" t={copy.pt} onOpen={open} />);
    fireEvent.click(
      screen.getByRole("button", {
        name: `${copy.pt.selectPreview}: Saúde Alimentar`,
      }),
    );
    expect(screen.getByRole("img").getAttribute("src")).toBe(
      projects[1].preview!.src,
    );
    expect(
      screen.getByRole("button", { name: copy.pt.resumePreview }),
    ).toBeTruthy();
    fireEvent.click(
      screen.getByRole("button", {
        name: `${copy.pt.heroPreview}: Saúde Alimentar`,
      }),
    );
    expect(open.mock.calls[0][0].id).toBe("saude");
  });
  it("rotates the actual work and respects pause and resume", async () => {
    preferences.reduce = false;
    vi.useFakeTimers();
    render(<Hero language="pt" t={copy.pt} onOpen={vi.fn()} />);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(5800);
    });
    expect(screen.getByRole("img").getAttribute("src")).toBe(
      projects[1].preview!.src,
    );
    fireEvent.click(screen.getByRole("button", { name: copy.pt.pausePreview }));
    await act(async () => {
      await vi.advanceTimersByTimeAsync(12000);
    });
    expect(screen.getByRole("img").getAttribute("src")).toBe(
      projects[1].preview!.src,
    );
    fireEvent.click(
      screen.getByRole("button", { name: copy.pt.resumePreview }),
    );
    await act(async () => {
      await vi.advanceTimersByTimeAsync(5800);
    });
    expect(screen.getByRole("img").getAttribute("src")).toBe(
      projects[0].preview!.src,
    );
  });
  it("keeps autoplay disabled when reduced motion is requested", async () => {
    vi.useFakeTimers();
    render(<Hero language="pt" t={copy.pt} onOpen={vi.fn()} />);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(12000);
    });
    expect(screen.getByRole("img").getAttribute("src")).toBe(
      projects[0].preview!.src,
    );
  });
});
