import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useMotion(
  root: RefObject<HTMLDivElement | null>,
  layoutKey: string,
) {
  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    let disposed = false;
    let refreshFrame = 0;
    const refresh = () => {
      if (disposed || refreshFrame) return;
      refreshFrame = requestAnimationFrame(() => {
        refreshFrame = 0;
        if (!disposed) ScrollTrigger.refresh(true);
      });
    };
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.from(".hero-line", {
          yPercent: 110,
          rotate: 3,
          duration: 1.15,
          stagger: 0.12,
          ease: "power4.out",
          clearProps: "transform",
        });
        gsap.from(".hero-meta > *, .hero-topline", {
          y: 18,
          opacity: 0,
          duration: 0.8,
          delay: 0.45,
          stagger: 0.08,
          clearProps: "all",
        });
        gsap.utils.toArray<HTMLElement>(".reveal").forEach((target) => {
          gsap.from(target, {
            y: 42,
            opacity: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: target,
              start: "top 93%",
              once: true,
              invalidateOnRefresh: true,
            },
            clearProps: "all",
          });
        });
        gsap.to(".hero-name-first", {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        });
        gsap.utils
          .toArray<HTMLElement>(".contact-heading > span")
          .forEach((line, index) => {
            gsap.from(line, {
              xPercent: index % 2 ? 4 : -3,
              ease: "none",
              scrollTrigger: {
                trigger: ".contact-heading",
                start: "top 95%",
                end: "bottom 70%",
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            });
          });
      }, element);
      refresh();
      return () => context.revert();
    });
    // Production may receive fonts after window.load. Refresh from actual layout,
    // including text wrapping after language changes, rather than network timing.
    const observer =
      typeof ResizeObserver === "undefined"
        ? undefined
        : new ResizeObserver(refresh);
    observer?.observe(element);
    const fonts = document.fonts;
    void fonts?.ready.then(refresh, () => {});
    fonts?.addEventListener("loadingdone", refresh);
    element.addEventListener("load", refresh, true);
    window.addEventListener("pageshow", refresh);
    refresh();
    return () => {
      disposed = true;
      cancelAnimationFrame(refreshFrame);
      observer?.disconnect();
      fonts?.removeEventListener("loadingdone", refresh);
      element.removeEventListener("load", refresh, true);
      window.removeEventListener("pageshow", refresh);
      media.revert();
    };
  }, [root]);

  useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh(true));
    return () => cancelAnimationFrame(frame);
  }, [layoutKey]);
}
