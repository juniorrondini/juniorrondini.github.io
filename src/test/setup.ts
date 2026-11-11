import { afterEach, beforeEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

export const preferences = { dark: false, reduce: true, mobile: false };
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn((query: string) => ({
    matches: query.includes("no-preference")
      ? !preferences.reduce
      : query.includes("color-scheme")
        ? preferences.dark
        : (query.includes("reduce") && preferences.reduce) ||
          (query.includes("max-width") && preferences.mobile),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
Object.defineProperty(HTMLDialogElement.prototype, "showModal", {
  configurable: true,
  value() {
    this.setAttribute("open", "");
  },
});
Object.defineProperty(HTMLDialogElement.prototype, "close", {
  configurable: true,
  value() {
    this.removeAttribute("open");
  },
});
Object.defineProperty(window, "scrollTo", { value: vi.fn() });
beforeEach(() => {
  localStorage.clear();
  preferences.dark = false;
  preferences.reduce = true;
  preferences.mobile = false;
  document.documentElement.dataset.theme = "light";
  document.body.style.overflow = "";
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
