import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { projects, type Copy, type Language, type Project } from "../content";
import { ProjectPreview } from "./ProjectPreview";

const featured = projects.filter((project) => project.preview);
type OpenProject = (
  project: Project,
  event: React.MouseEvent<HTMLButtonElement>,
) => void;

function Lettering({ word }: { word: string }) {
  return (
    <span className="hero-line">
      {[...word].map((letter, index) => (
        <span className="letter-mask" key={index}>
          <span className="hero-letter">{letter}</span>
        </span>
      ))}
    </span>
  );
}

export function Hero({
  language,
  t,
  onOpen,
}: {
  language: Language;
  t: Copy;
  onOpen: OpenProject;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const picture = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const project = featured[active];

  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    let visible = true;
    let timer: ReturnType<typeof setInterval> | undefined;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      clearInterval(timer);
      if (media.matches || paused || hovered) return;
      timer = setInterval(() => {
        if (
          visible &&
          !document.hidden &&
          !document.querySelector("dialog[open]")
        )
          setActive((index) => (index + 1) % featured.length);
      }, 5800);
    };
    const observer =
      typeof IntersectionObserver === "undefined"
        ? undefined
        : new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
          });
    observer?.observe(element);
    media.addEventListener("change", update);
    update();
    return () => {
      clearInterval(timer);
      observer?.disconnect();
      media.removeEventListener("change", update);
    };
  }, [paused, hovered]);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.fromTo(
          picture.current,
          { clipPath: "inset(0 100% 0 0)", x: 22 },
          {
            clipPath: "inset(0 0% 0 0)",
            x: 0,
            duration: 0.9,
            ease: "expo.out",
            clearProps: "all",
          },
        );
      }, stage);
      return () => context.revert();
    });
    return () => media.revert();
  }, [active]);

  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    const media = gsap.matchMedia();
    media.add(
      "(prefers-reduced-motion: no-preference) and (pointer: fine) and (min-width: 761px)",
      () => {
        const title = element.querySelector<HTMLElement>(
          ".hero-title-parallax",
        );
        const image = element.querySelector<HTMLElement>(".hero-preview-depth");
        const move = (event: PointerEvent) => {
          const rect = element.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          gsap.to(title, {
            x: x * 35,
            y: y * 20,
            rotateY: x * 6,
            duration: 0.8,
            ease: "power3.out",
            overwrite: true,
          });
          gsap.to(image, {
            x: x * -24,
            y: y * -18,
            rotateY: x * -8,
            rotateX: y * 6,
            duration: 0.8,
            ease: "power3.out",
            overwrite: true,
          });
        };
        const leave = () => {
          gsap.to([title, image], {
            x: 0,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            duration: 1,
            ease: "power3.out",
            overwrite: true,
          });
        };
        element.addEventListener("pointermove", move, { passive: true });
        element.addEventListener("pointerleave", leave);
        return () => {
          element.removeEventListener("pointermove", move);
          element.removeEventListener("pointerleave", leave);
          gsap.killTweensOf([title, image]);
          gsap.set([title, image], { clearProps: "transform" });
        };
      },
    );
    return () => media.revert();
  }, []);

  return (
    <section className="hero" id="top" aria-labelledby="hero-heading">
      <div className="hero-stage" ref={stage}>
        <h1 id="hero-heading" className="sr-only">
          Junior Rondini — Full Stack Developer
        </h1>
        <div className="hero-topline eyebrow">
          <span>{t.role}</span>
          <span>{t.discipline}</span>
          <span>{t.portfolio}</span>
        </div>
        <div className="hero-title-parallax" aria-hidden="true">
          <div className="hero-type">
            <div className="hero-name-first">
              <Lettering word="JUNIOR" />
            </div>
            <div className="hero-name-last">
              <Lettering word="Rondini" />
            </div>
          </div>
        </div>
        <div className="hero-preview-position">
          <div
            className="hero-preview-depth"
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
            onFocusCapture={() => setHovered(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node))
                setHovered(false);
            }}
          >
            <button
              className="hero-preview-button"
              onClick={(event) => onOpen(project, event)}
              aria-label={`${t.heroPreview}: ${project.name}`}
            >
              <div ref={picture}>
                <ProjectPreview
                  project={project}
                  language={language}
                  sizes="(max-width: 760px) 62vw, 36vw"
                />
              </div>
            </button>
            <div className="hero-preview-caption">
              <span>
                {t.inFocus} / {project.name}
              </span>
              <span>
                0{active + 1}—0{featured.length}
              </span>
            </div>
          </div>
        </div>
        <div className="hero-bottom">
          <div className="hero-statement">
            {t.heroLine.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
          <div
            className="hero-preview-controls"
            aria-label={t.previewControls}
            role="group"
          >
            <div>
              {featured.map((item, index) => (
                <button
                  key={item.id}
                  aria-label={`${t.selectPreview}: ${item.name}`}
                  aria-pressed={active === index}
                  onClick={() => {
                    setActive(index);
                    setPaused(true);
                  }}
                >
                  {item.name}
                </button>
              ))}
            </div>
            <button
              className="playback-control"
              onClick={() => setPaused(!paused)}
              aria-label={paused ? t.resumePreview : t.pausePreview}
            >
              {paused ? t.resume : t.pause}
            </button>
          </div>
          <a className="hero-work-link" href="#work">
            {t.selected}
          </a>
        </div>
        <div className="hero-footer eyebrow">
          <span>{t.heroSide}</span>
          <a href="#work">{t.scroll}</a>
        </div>
      </div>
    </section>
  );
}
