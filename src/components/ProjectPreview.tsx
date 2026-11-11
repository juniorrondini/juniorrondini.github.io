import type { Language, Project } from "../content";

export function ProjectPreview({
  project,
  language,
}: {
  project: Project;
  language: Language;
}) {
  if (!project.preview) return null;
  const { preview } = project;
  return (
    <div className="project-preview">
      <img
        src={preview.src}
        srcSet={`${preview.smallSrc} 768w, ${preview.src} 1280w`}
        sizes="(max-width: 760px) 88vw, (max-width: 1100px) 86vw, 1200px"
        width={preview.width}
        height={preview.height}
        alt={preview.alt[language]}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
