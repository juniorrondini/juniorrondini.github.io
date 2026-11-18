import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { playEntrance } from "./entrance";

gsap.registerPlugin(ScrollTrigger);
const motionQuery = "(prefers-reduced-motion: no-preference)";

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
    let playOnMount = window.matchMedia(motionQuery).matches;
    media.add(motionQuery, () => {
      if (!playOnMount) return;
      playOnMount = false;
      const context = gsap.context(() => playEntrance(element), element);
      return () => context.revert();
    });
    media.add(
      {
        motion: motionQuery,
        desktop: "(min-width: 761px) and (min-height: 650px)",
      },
      (match) => {
        if (!match.conditions?.motion) return;
        const context = gsap.context(() => {
          gsap.utils.toArray<HTMLElement>(".reveal").forEach((target) => {
            gsap.from(target, {
              y: 24,
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
          gsap.utils.toArray<HTMLElement>(".section-intro .display-heading em").forEach((target) => {
            gsap.from(target, {
              x: -24,
              opacity: 0.35,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: target,
                start: "top 90%",
                once: true,
                invalidateOnRefresh: true,
              },
              clearProps: "all",
            });
          });
          gsap.utils.toArray<HTMLElement>(".about .section-topline, .lab .section-topline, .contact .section-topline").forEach((target) => {
            gsap.from(target, {
              backgroundSize: "0% 1px",
              duration: 1.15,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: target,
                start: "top 90%",
                once: true,
              },
              clearProps: "backgroundSize",
            });
          });
          if (match.conditions?.desktop) {
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: ".hero",
                  start: "top top",
                  end: "bottom bottom",
                  scrub: 0.45,
                  invalidateOnRefresh: true,
                },
              })
              .to(
                ".hero-name-first",
                { xPercent: -7, yPercent: -19, opacity: 0.64, ease: "none" },
                0,
              )
              .to(
                ".hero-name-last",
                { xPercent: 8, yPercent: -12, opacity: 0.76, ease: "none" },
                0,
              )
              .to(
                ".hero-shot",
                { yPercent: -3, scale: 1.035, ease: "none" },
                0,
              );
            gsap.fromTo(
              ".work-showcase",
              { y: 35 },
              {
                y: -18,
                ease: "none",
                scrollTrigger: {
                  trigger: ".work-gallery",
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.7,
                },
              },
            );
          }
          gsap.utils
            .toArray<HTMLElement>(".contact-heading > span")
            .forEach((line, index) => {
              gsap.from(line, {
                xPercent: index % 2 ? 10 : -8,
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
      },
    );
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
