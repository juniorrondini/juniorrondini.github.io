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
    media.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 761px)",
      },
      (match) => {
        if (!match.conditions?.motion) return;
        const context = gsap.context(() => {
          const entrance = gsap.timeline({ defaults: { ease: "expo.out" } });
          entrance
            .from(
              ".hero-name-first .hero-letter",
              {
                yPercent: 130,
                rotation: -7,
                duration: 1.35,
                stagger: 0.055,
                clearProps: "all",
              },
              0,
            )
            .from(
              ".hero-name-last .hero-letter",
              {
                yPercent: 125,
                rotation: 7,
                duration: 1.35,
                stagger: 0.045,
                clearProps: "all",
              },
              0.2,
            )
            .from(
              ".hero-preview-button",
              {
                clipPath: "inset(0 100% 0 0)",
                xPercent: 22,
                duration: 1.3,
                clearProps: "all",
              },
              0.45,
            );
          gsap.from(".hero-bottom, .hero-topline, .hero-footer", {
            y: 18,
            opacity: 0,
            duration: 0.8,
            delay: 0.8,
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
          if (match.conditions?.desktop) {
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: ".hero",
                  start: "top top",
                  end: "bottom bottom",
                  scrub: 0.8,
                  invalidateOnRefresh: true,
                },
              })
              .to(
                ".hero-name-first",
                { xPercent: -24, yPercent: -18, opacity: 0.3, ease: "none" },
                0,
              )
              .to(
                ".hero-name-last",
                { xPercent: 16, yPercent: 16, opacity: 0.3, ease: "none" },
                0,
              )
              .to(
                ".hero-preview-position",
                { xPercent: -35, scale: 1.26, rotation: -4, ease: "none" },
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
