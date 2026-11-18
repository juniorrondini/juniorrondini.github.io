import type { Language, Project } from "../content";

export function ProjectPreview({
  project,
  language,
  sizes = "(max-width: 760px) 88vw, 850px",
  priority = false,
}: {
  project: Project;
  language: Language;
  sizes?: string;
  priority?: boolean;
}) {
  if (!project.preview) return null;
  const { preview } = project;
  return (
    <span className="project-preview">
      <img
        src={preview.src}
        srcSet={`${preview.smallSrc} 768w, ${preview.src} 1280w`}
        sizes={sizes}
        width={preview.width}
        height={preview.height}
        alt={preview.alt[language]}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
      />
    </span>
  );
}
