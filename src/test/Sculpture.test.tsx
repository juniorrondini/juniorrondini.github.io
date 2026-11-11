import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Sculpture from "../components/Sculpture";
import { preferences } from "./setup";
import { SCENE_START_DELAY_MS } from "../motion-settings";

const { mount, dispose } = vi.hoisted(() => ({
  mount: vi.fn(),
  dispose: vi.fn(),
}));
vi.mock("../scene", () => ({ mountScene: mount }));

describe("Progressive 3D enhancement", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mount.mockReset();
    dispose.mockReset();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  const advance = async (duration: number) => {
    await act(async () => {
      await vi.advanceTimersByTimeAsync(duration);
      await vi.dynamicImportSettled();
    });
  };
  it("keeps the original SVG on mobile and with reduced motion without initializing WebGL", async () => {
    mount.mockClear();
    const page = render(<Sculpture theme="light" label="JR sculpture" />);
    expect(
      screen.getByRole("img", { name: "JR sculpture" }).querySelector("svg"),
    ).toBeTruthy();
    await advance(SCENE_START_DELAY_MS + 100);
    expect(mount).not.toHaveBeenCalled();
    page.unmount();
    preferences.reduce = false;
    preferences.mobile = true;
    render(<Sculpture theme="dark" label="JR sculpture" />);
    await advance(SCENE_START_DELAY_MS + 100);
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
    await advance(SCENE_START_DELAY_MS - 1);
    expect(mount).not.toHaveBeenCalled();
    await advance(1);
    expect(mount).toHaveBeenCalledTimes(1);
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
    await advance(SCENE_START_DELAY_MS);
    expect(mount).toHaveBeenCalledTimes(1);
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
