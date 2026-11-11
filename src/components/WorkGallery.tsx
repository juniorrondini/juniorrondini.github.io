import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { projects, type Copy, type Language, type Project } from "../content";
import { ProjectPreview } from "./ProjectPreview";

const featured = projects.filter((project) => project.preview);

export function WorkGallery({
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
  const [active, setActive] = useState(0);
  const content = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLButtonElement>(null);
  const project = featured[active];
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.fromTo(
          ".work-image-reveal",
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 0.75,
            ease: "expo.out",
            clearProps: "clipPath",
          },
        );
        gsap.from(".work-project-copy > *", {
          y: 18,
          opacity: 0,
          duration: 0.55,
          stagger: 0.045,
          ease: "power3.out",
          clearProps: "all",
        });
      }, content);
      return () => context.revert();
    });
    return () => media.revert();
  }, [active]);
  const move = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (
      window.matchMedia(
        "(prefers-reduced-motion: reduce), (pointer: coarse), (max-width: 760px)",
      ).matches
    )
      return;
    const rect = event.currentTarget.parentElement!.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    gsap.to(image.current, {
      rotateY: x * 7,
      rotateX: -y * 5,
      y: -4,
      duration: 0.6,
      overwrite: true,
      ease: "power3.out",
    });
  };
  const reset = () => {
    gsap.to(image.current, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      duration: 0.7,
      overwrite: true,
    });
  };
  return (
    <div className="work-gallery reveal" data-testid="work-gallery">
      <div className="work-index" aria-label={t.galleryLabel} role="group">
        <p className="eyebrow">{t.galleryInstruction}</p>
        {featured.map((item, index) => (
          <button
            className={`work-index-item ${active === index ? "is-selected" : ""}`}
            key={item.id}
            aria-label={`${t.chooseProject}: ${item.name}`}
            aria-pressed={active === index}
            onPointerEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onClick={() => setActive(index)}
          >
            <span className="eyebrow">{item.number}</span>
            <span>{item.name}</span>
          </button>
        ))}
        <div className="work-index-footnote">
          <span>{t.workIndexNote}</span>
          <span>
            0{active + 1} / 0{featured.length}
          </span>
        </div>
      </div>
      <div className="work-showcase" ref={content}>
        <div className="work-image-stage">
          <button
            className="project-preview-button work-image-reveal"
            ref={image}
            onPointerMove={move}
            onPointerLeave={reset}
            onBlur={reset}
            onClick={(event) => onOpen(project, event)}
            aria-label={`${t.viewProject}: ${project.name}`}
          >
            <ProjectPreview
              project={project}
              language={language}
              sizes="(max-width: 760px) 88vw, 42vw"
            />
            <span className="work-open-caption">{t.viewProject}</span>
          </button>
        </div>
        <div className="work-project-copy">
          <span className="eyebrow">{project.category[language]}</span>
          <h3>{project.name}</h3>
          <p>{project.description[language]}</p>
          <span className="work-stack">
            {project.stack.slice(0, 3).join(" / ")}
          </span>
          <div className="preview-caption">
            <span>{project.preview?.source}</span>
            <span>{t.screenCapture}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
