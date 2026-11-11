import { useRef } from "react";
import { act, fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotion } from "../useMotion";

function Layout({ language }: { language: string }) {
  const root = useRef<HTMLDivElement>(null);
  useMotion(root, language);
  return (
    <div ref={root}>
      <img src="/projects/genesys-desktop.webp" alt="Project" />
    </div>
  );
}

const frame = () =>
  new Promise((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(resolve)),
  );

describe("Scroll animation layout synchronization", () => {
  it("refreshes when fonts finish, an image loads or the language changes", async () => {
    const fontEvents = new EventTarget();
    const oldFonts = Object.getOwnPropertyDescriptor(document, "fonts");
    Object.defineProperty(document, "fonts", {
      configurable: true,
      value: Object.assign(fontEvents, { ready: Promise.resolve(fontEvents) }),
    });
    const refresh = vi.spyOn(ScrollTrigger, "refresh");
    try {
      const page = render(<Layout language="pt" />);
      await act(frame);
      refresh.mockClear();
      fontEvents.dispatchEvent(new Event("loadingdone"));
      await act(frame);
      expect(refresh).toHaveBeenCalledWith(true);
      refresh.mockClear();
      fireEvent.load(page.getByAltText("Project"));
      await act(frame);
      expect(refresh).toHaveBeenCalledWith(true);
      refresh.mockClear();
      page.rerender(<Layout language="en" />);
      await act(frame);
      expect(refresh).toHaveBeenCalledWith(true);
      page.unmount();
      refresh.mockClear();
      fontEvents.dispatchEvent(new Event("loadingdone"));
      await frame();
      expect(refresh).not.toHaveBeenCalled();
    } finally {
      if (oldFonts) Object.defineProperty(document, "fonts", oldFonts);
      else Reflect.deleteProperty(document, "fonts");
    }
  });
});
