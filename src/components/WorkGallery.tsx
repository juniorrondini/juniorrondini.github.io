import { useState } from "react";
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
  const project = featured[active];
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
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") setActive(index);
            }}
            onFocus={() => setActive(index)}
            onClick={() => setActive(index)}
          >
            <span className="eyebrow">{item.number}</span>
            <span>{item.name}</span>
          </button>
        ))}
        <div className="work-project-copy" key={project.id}>
          <span className="eyebrow">{project.category[language]}</span>
          <p>{project.description[language]}</p>
          <span className="work-stack">
            {project.stack.slice(0, 3).join(" / ")}
          </span>
        </div>
      </div>
      <div className="work-showcase">
        <button
          className="project-preview-button"
          onClick={(event) => onOpen(project, event)}
          aria-label={`${t.viewProject}: ${project.name}`}
        >
          <span className="work-image-stage">
            <span className="work-image-reveal" key={project.id}>
              <ProjectPreview
                project={project}
                language={language}
                sizes="(max-width: 760px) 88vw, 470px"
              />
            </span>
          </span>
          <span className="work-preview-caption">
            <span>{project.preview?.source}</span>
            <span className="work-open-caption">{t.viewProject}</span>
          </span>
        </button>
      </div>
    </div>
  );
}
