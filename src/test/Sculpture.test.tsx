import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Sculpture from "../components/Sculpture";
import { preferences } from "./setup";

const { mount, dispose } = vi.hoisted(() => ({
  mount: vi.fn(),
  dispose: vi.fn(),
}));
vi.mock("../scene", () => ({ mountScene: mount }));

describe("Progressive 3D enhancement", () => {
  it("keeps the original SVG on mobile and with reduced motion without initializing WebGL", async () => {
    mount.mockClear();
    const page = render(<Sculpture theme="light" label="JR sculpture" />);
    expect(
      screen.getByRole("img", { name: "JR sculpture" }).querySelector("svg"),
    ).toBeTruthy();
    await new Promise((resolve) => setTimeout(resolve, 180));
    expect(mount).not.toHaveBeenCalled();
    page.unmount();
    preferences.reduce = false;
    preferences.mobile = true;
    render(<Sculpture theme="dark" label="JR sculpture" />);
    await new Promise((resolve) => setTimeout(resolve, 180));
    expect(mount).not.toHaveBeenCalled();
  });

  it("initializes one desktop scene and disposes its resources on unmount", async () => {
    preferences.reduce = false;
    mount.mockImplementation((_host, _theme, ready) => {
      ready();
      return dispose;
    });
    dispose.mockClear();
    const page = render(<Sculpture theme="dark" label="JR sculpture" />);
    await waitFor(() => expect(mount).toHaveBeenCalled());
    expect(mount.mock.calls.at(-1)?.[1]).toBe("dark");
    expect(
      screen
        .getByRole("img", { name: "JR sculpture" })
        .classList.contains("is-ready"),
    ).toBe(true);
    page.unmount();
    expect(dispose).toHaveBeenCalledTimes(1);
  });

  it("leaves an accessible fallback when WebGL cannot initialize", async () => {
    preferences.reduce = false;
    mount.mockImplementation(() => {
      throw new Error("WebGL unavailable");
    });
    render(<Sculpture theme="light" label="JR sculpture" />);
    await waitFor(() => expect(mount).toHaveBeenCalled());
    expect(
      screen
        .getByRole("img", { name: "JR sculpture" })
        .classList.contains("is-ready"),
    ).toBe(false);
    expect(
      screen.getByRole("img", { name: "JR sculpture" }).querySelector("svg"),
    ).toBeTruthy();
  });
});
