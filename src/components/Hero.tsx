import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  profiles,
  projects,
  type Copy,
  type Language,
  type Project,
} from "../content";
import { ProjectPreview } from "./ProjectPreview";

const featured = projects.filter((project) => project.preview);

function Lettering({ word }: { word: string }) {
  return (
    <span className="hero-line">
      {[...word].map((letter, index) => (
        <span className="letter-mask" key={index}>
          <span className="hero-letter">
            <span className="hero-glyph">{letter}</span>
          </span>
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
  onOpen: (
    project: Project,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hasSwitched, setHasSwitched] = useState(false);
  const project = featured[active];

  useEffect(() => {
    const element = preview.current;
    if (!element) return;
    let visible = true;
    let timer: ReturnType<typeof setInterval> | undefined;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      clearInterval(timer);
      if (
        !visible || document.hidden || media.matches || paused || hovered || focused
      )
        return;
      timer = setInterval(() => {
        if (document.querySelector("dialog[open]")) return;
        setHasSwitched(true);
        setActive((index) => (index + 1) % featured.length);
      }, 5800);
    };
    const observer =
      typeof IntersectionObserver === "undefined"
        ? undefined
        : new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            update();
          });
    observer?.observe(element);
    document.addEventListener("visibilitychange", update);
    media.addEventListener("change", update);
    update();
    return () => {
      clearInterval(timer);
      observer?.disconnect();
      document.removeEventListener("visibilitychange", update);
      media.removeEventListener("change", update);
    };
  }, [paused, hovered, focused]);

  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    const media = gsap.matchMedia();
    media.add(
      "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine) and (min-width: 761px)",
      () => {
        const title = element.querySelector(".hero-title-parallax");
        const frame = element.querySelector(".hero-preview-depth");
        const letters = Array.from(element.querySelectorAll(".hero-glyph"));
        const glide = (target: Element | null, axis: "x" | "y") =>
          gsap.quickTo(target, axis, { duration: 0.65, ease: "power3.out" });
        const titleX = glide(title, "x");
        const titleY = glide(title, "y");
        const frameX = glide(frame, "x");
        const frameY = glide(frame, "y");
        const letterMotion = letters.map((letter) => ({
          y: glide(letter, "y"),
          mask: letter.closest(".letter-mask")!,
        }));
        let centers: { x: number; y: number }[] = [];
        const invalidate = () => {
          centers = [];
        };
        const move = (event: PointerEvent) => {
          if (event.pointerType !== "mouse") return;
          if (!centers.length) {
            centers = letterMotion.map(({ mask }) => {
              const rect = mask.getBoundingClientRect();
              return {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
              };
            });
          }
          const rect = element.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          titleX(x * 28);
          titleY(y * 18);
          frameX(x * -22);
          frameY(y * -14);
          centers.forEach((center, index) => {
            const distance = Math.hypot(
              center.x - event.clientX,
              center.y - event.clientY,
            );
            letterMotion[index].y(-26 * Math.max(0, 1 - distance / 180));
          });
        };
        const leave = () => {
          invalidate();
          titleX(0);
          titleY(0);
          frameX(0);
          frameY(0);
          letterMotion.forEach(({ y }) => y(0));
        };
        element.addEventListener("pointermove", move, { passive: true });
        element.addEventListener("pointerleave", leave);
        window.addEventListener("scroll", invalidate, { passive: true });
        window.addEventListener("resize", invalidate);
        document.fonts?.addEventListener("loadingdone", invalidate);
        return () => {
          element.removeEventListener("pointermove", move);
          element.removeEventListener("pointerleave", leave);
          window.removeEventListener("scroll", invalidate);
          window.removeEventListener("resize", invalidate);
          document.fonts?.removeEventListener("loadingdone", invalidate);
        };
      },
    );
    return () => media.revert();
  }, []);

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-stage" ref={stage}>
        <div className="hero-identity">
          <p className="hero-role eyebrow">{t.role}</p>
          <h1 id="hero-heading" className="hero-title-parallax">
            <span className="sr-only">Junior Rondini</span>
            <span className="hero-type" aria-hidden="true">
              <span className="hero-name-first">
                <Lettering word="JUNIOR" />
              </span>
              <span className="hero-name-last">
                <Lettering word="Rondini" />
              </span>
            </span>
          </h1>
          <p className="hero-statement">
            {t.heroLine[0]} <em>{t.heroLine[1]}</em>
          </p>
          <div className="hero-actions">
            <a className="hero-work-link" href="#work">
              {t.selected}
            </a>
            <div className="hero-profiles">
              {profiles.map(({ name, url }) => (
                <a key={name} href={url} target="_blank" rel="noreferrer">
                  {name}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="hero-preview-position" ref={preview}>
          <div className="hero-preview-depth">
            <div className="hero-preview-meta eyebrow">
              <span>{t.inFocus}</span>
              <span aria-hidden="true">
                {project.number} / {String(featured.length).padStart(2, "0")}
              </span>
            </div>
            <button
              className="hero-preview-button"
              onClick={(event) => onOpen(project, event)}
              aria-label={`${t.heroPreview}: ${project.name}`}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setHovered(true);
              }}
              onPointerLeave={() => setHovered(false)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            >
              <span className="hero-shot">
                <span
                  key={project.id}
                  className={hasSwitched ? "hero-shot-swap" : undefined}
                >
                  <ProjectPreview
                    project={project}
                    language={language}
                    sizes="(max-width: 760px) 86vw, (max-width: 1220px) 39vw, 480px"
                    priority={!hasSwitched}
                  />
                </span>
              </span>
              <span className="hero-preview-caption">
                <span>
                  <strong>{project.name}</strong>
                  <small>{project.preview?.source}</small>
                </span>
                <span className="hero-preview-action">{t.details}</span>
              </span>
            </button>
            <div
              className="hero-preview-controls"
              aria-label={t.previewControls}
              role="group"
            >
              {featured.map((item, index) => (
                <button
                  key={item.id}
                  aria-label={`${t.selectPreview}: ${item.name}`}
                  aria-pressed={active === index}
                  onClick={() => {
                    if (active !== index) setHasSwitched(true);
                    setActive(index);
                    setPaused(true);
                  }}
                >
                  {item.name}
                </button>
              ))}
              <button
                className="playback-control"
                onClick={() => setPaused((value) => !value)}
                aria-label={paused ? t.resumePreview : t.pausePreview}
              >
                {paused ? t.resume : t.pause}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
