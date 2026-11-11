import { useCallback, useEffect, useRef, useState } from "react";
import { copy, experiments, projects, toolGroups } from "./content";
import type { Copy, Language, Project, Theme } from "./content";
import { Hero } from "./components/Hero";
import { WorkGallery } from "./components/WorkGallery";
import { useMotion } from "./useMotion";
import { ProjectPreview } from "./components/ProjectPreview";

const anchors = ["work", "about", "lab", "contact"];

function stored<T extends string>(
  key: string,
  options: readonly T[],
  fallback: T,
): T {
  try {
    const value = localStorage.getItem(key) as T;
    return options.includes(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

function Monogram({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`monogram ${className}`}
      viewBox="0 0 64 48"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M1 3h25v26c0 12-6 17-17 17H1V34h7c4 0 6-2 6-6V15H1zm32 0h13c12 0 17 6 17 15 0 6-3 11-8 13l9 15H50L42 31v15H30V3zm9 12v7h4c4 0 5-1 5-4 0-2-1-3-5-3z" />
    </svg>
  );
}

function ProjectDialog({
  project,
  language,
  t,
  trigger,
  onClose,
}: {
  project: Project;
  language: Language;
  t: Copy;
  trigger: HTMLElement;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      trigger.focus();
    };
  }, [trigger]);
  return (
    <dialog
      className="project-dialog"
      ref={ref}
      onClose={onClose}
      aria-labelledby="project-dialog-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="dialog-inner">
        <div className="dialog-bar">
          <span className="eyebrow">
            {t.overview} / {project.number}
          </span>
          <button
            className="text-control"
            autoFocus
            onClick={onClose}
            aria-label={t.close}
          >
            {t.close}
          </button>
        </div>
        <span className="eyebrow accent-text">
          {project.category[language]}
        </span>
        <h2 id="project-dialog-title">{project.name}</h2>
        {project.preview && (
          <div className="dialog-preview">
            <ProjectPreview project={project} language={language} />
            <span className="preview-caption">
              {project.preview.source} <span>{t.screenCapture}</span>
            </span>
          </div>
        )}
        <div className="dialog-content">
          <div>
            <h3 className="eyebrow">{t.context}</h3>
            <p>{project.context[language]}</p>
            <h3 className="eyebrow">{t.features}</h3>
            <ul className="feature-list">
              {project.features.map((feature) => (
                <li key={feature.en}>{feature[language]}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="eyebrow">{t.stack}</h3>
            <div className="stack-list">
              {project.stack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            {project.private && <p className="private-note">{t.privateNote}</p>}
            <div className="dialog-links">
              <a
                className="text-link"
                href={project.repo}
                target="_blank"
                rel="noreferrer"
              >
                {project.private ? t.privateCode : t.code}
              </a>
              {project.demo && (
                <a
                  className="action-link"
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.visit}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

function MobileMenu({ t, close }: { t: Copy; close: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    const dialog = ref.current;
    dialog?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      id="mobile-navigation"
      className="mobile-menu"
      ref={ref}
      onClose={close}
      aria-label={t.menu}
    >
      <div className="mobile-menu-top">
        <Monogram />
        <button className="text-control" onClick={close} aria-label={t.close}>
          {t.close}
        </button>
      </div>
      <nav>
        {anchors.map((anchor, i) => (
          <a key={anchor} href={`#${anchor}`} onClick={close}>
            <small>0{i + 1}</small>
            {t.nav[i]}
          </a>
        ))}
      </nav>
      <a className="text-link" href="mailto:jjrondinijj@gmail.com">
        jjrondinijj@gmail.com
      </a>
    </dialog>
  );
}

export default function App() {
  const root = useRef<HTMLDivElement>(null);
  const [language, setLanguage] = useState<Language>(() =>
    stored("jr-lang", ["pt", "en"], "pt"),
  );
  const [theme, setTheme] = useState<Theme>(() =>
    stored(
      "jr-theme",
      ["light", "dark"],
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light",
    ),
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [selection, setSelection] = useState<{
    project: Project;
    trigger: HTMLButtonElement;
  } | null>(null);
  const openProject = (
    project: Project,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => setSelection({ project, trigger: event.currentTarget });
  const closeProject = useCallback(() => setSelection(null), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const t = copy[language];
  useMotion(root, language);

  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", t.seo);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", t.heroLine.join(" "));
    document
      .querySelector('meta[property="og:locale"]')
      ?.setAttribute("content", language === "pt" ? "pt_BR" : "en_US");
    try {
      localStorage.setItem("jr-lang", language);
    } catch {
      /* Preferences remain usable without storage. */
    }
  }, [language, t]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#0d0a12" : "#efe7da");
  }, [theme]);
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => {
      try {
        const saved = localStorage.getItem("jr-theme");
        if (saved !== "light" && saved !== "dark")
          setTheme(media.matches ? "dark" : "light");
      } catch {
        setTheme(media.matches ? "dark" : "light");
      }
    };
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("jr-theme", next);
    } catch {
      /* In-memory fallback. */
    }
  };

  return (
    <div ref={root} className="site-shell">
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Junior Rondini">
          <Monogram />
          <span>
            JUNIOR
            <br />
            RONDINI
          </span>
        </a>
        <nav className="desktop-nav" aria-label={t.index}>
          {anchors.map((anchor, i) => (
            <a key={anchor} href={`#${anchor}`}>
              <span className="nav-number">0{i + 1}</span>
              {t.nav[i]}
            </a>
          ))}
        </nav>
        <div className="header-controls">
          <button
            className="language-toggle"
            onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
            aria-label={t.language}
          >
            <span className={language === "pt" ? "active" : ""}>PT</span>
            <i>/</i>
            <span className={language === "en" ? "active" : ""}>EN</span>
          </button>
          <span className="control-divider" />
          <button
            className="text-control theme-toggle"
            onClick={toggleTheme}
            aria-label={t.theme}
            aria-pressed={theme === "dark"}
          >
            {theme === "dark" ? t.light : t.dark}
          </button>
          <button
            className="text-control menu-toggle"
            aria-label={t.menu}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(true)}
          >
            {t.menuLabel}
          </button>
        </div>
      </header>
      <main id="main">
        <Hero language={language} t={t} onOpen={openProject} />

        <section
          className="work section-pad"
          id="work"
          aria-labelledby="work-heading"
        >
          <div className="section-topline reveal">
            <span className="eyebrow">{t.workLabel}</span>
            <span className="eyebrow">{t.selectedCount}</span>
          </div>
          <div className="section-intro">
            <h2 id="work-heading" className="display-heading reveal">
              {t.workTitle[0]}
              <br />
              <em>{t.workTitle[1]}</em>
            </h2>
            <p className="reveal">{t.workIntro}</p>
          </div>
          <WorkGallery language={language} t={t} onOpen={openProject} />
          <div className="archive">
            <div className="archive-heading reveal">
              <span className="eyebrow">{t.archive}</span>
              <p>{t.archiveIntro}</p>
            </div>
            {projects
              .filter((project) => !project.preview)
              .map((project) => (
                <button
                  className="archive-row reveal"
                  key={project.id}
                  onClick={(event) => openProject(project, event)}
                >
                  <span className="eyebrow">({project.number})</span>
                  <span className="archive-title">{project.name}</span>
                  <span className="eyebrow archive-category">
                    {project.category[language]}
                  </span>
                </button>
              ))}
          </div>
        </section>

        <section
          className="about section-pad"
          id="about"
          aria-labelledby="about-heading"
        >
          <div className="section-topline reveal">
            <span className="eyebrow">{t.aboutLabel}</span>
          </div>
          <div className="about-grid">
            <div className="about-sticky">
              <h2 id="about-heading" className="display-heading reveal">
                {t.aboutTitle[0]}
                <br />
                {t.aboutTitle[1]}
                <br />
                <em>{t.aboutTitle[2]}</em>
              </h2>
              <p className="about-intro reveal">{t.aboutIntro}</p>
            </div>
            <div className="about-narrative">
              {t.aboutBlocks.map((block) => (
                <article className="narrative-block reveal" key={block.n}>
                  <span className="eyebrow">/{block.n}</span>
                  <h3>{block.title}</h3>
                  <p>{block.body}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="tools">
            <div className="tools-heading reveal">
              <span className="eyebrow">{t.toolsLabel}</span>
              <h3>
                {t.toolsTitle.split("\n").map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h3>
            </div>
            <div>
              {toolGroups.map((group, groupIndex) => (
                <div className="tool-row reveal" key={group.name}>
                  <div>
                    <h4>{t.toolNames[groupIndex]}</h4>
                    <small>
                      {t[group.type as "verified" | "profile" | "exploring"]}
                    </small>
                  </div>
                  <p>
                    {group.items.map((item) => (
                      <span key={item}>
                        {item === "AI"
                          ? t.ai
                          : item === "Esoteric languages"
                            ? t.esoteric
                            : item}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="lab section-pad"
          id="lab"
          aria-labelledby="lab-heading"
        >
          <div className="section-topline reveal">
            <span className="eyebrow">{t.labLabel}</span>
            <span className="eyebrow">{`{ EXPERIMENTAL }`}</span>
          </div>
          <div className="section-intro">
            <h2 id="lab-heading" className="display-heading reveal">
              {t.labTitle[0]}
              <br />
              <em>{t.labTitle[1]}</em>
            </h2>
            <p className="reveal">{t.labIntro}</p>
          </div>
          <div className="experiments">
            {experiments.map((experiment) => (
              <a
                className={`experiment exp-${experiment.id} reveal`}
                key={experiment.id}
                href={experiment.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${t.labLink}: ${experiment.name}`}
              >
                <span className="eyebrow experiment-id">{experiment.n}</span>
                <div className="experiment-name">
                  <h3>{experiment.name}</h3>
                  <span className="eyebrow experiment-tags">
                    {experiment.tags}
                  </span>
                </div>
                <p>{experiment.description[language]}</p>
                <span className="experiment-link">{t.labLink}</span>
              </a>
            ))}
          </div>
        </section>

        <section
          className="contact section-pad"
          id="contact"
          aria-labelledby="contact-heading"
        >
          <div className="section-topline reveal">
            <span className="eyebrow">{t.contactLabel}</span>
            <span className="eyebrow">{t.hello}</span>
          </div>
          <div className="contact-main">
            <h2 id="contact-heading" className="contact-heading reveal">
              {t.contactTitle.map((line, i) => (
                <span key={line} className={i === 1 ? "contact-middle" : ""}>
                  {line}
                </span>
              ))}
            </h2>
            <div className="contact-bottom">
              <p className="reveal">{t.contactIntro}</p>
              <a
                className="contact-email reveal"
                href="mailto:jjrondinijj@gmail.com"
              >
                <small className="eyebrow">{t.email}</small>
                <span>jjrondinijj@gmail.com</span>
              </a>
            </div>
          </div>
          <div className="contact-socials">
            <a
              href="https://github.com/juniorrondini"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/juniorrondini"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a href="#top" className="back-top">
              {t.top}
            </a>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <a href="#top" className="footer-brand" aria-label="Junior Rondini">
          <Monogram />
          <span>
            JUNIOR RONDINI<small>{t.footerRole}</small>
          </span>
        </a>
        <span>
          © {new Date().getFullYear()} — {t.footer}
        </span>
        <a
          href="https://github.com/juniorrondini/juniorrondini.github.io"
          target="_blank"
          rel="noreferrer"
        >
          {t.source}
        </a>
      </footer>
      {menuOpen && <MobileMenu t={t} close={closeMenu} />}
      {selection && (
        <ProjectDialog
          key={selection.project.id}
          project={selection.project}
          trigger={selection.trigger}
          language={language}
          t={t}
          onClose={closeProject}
        />
      )}
    </div>
  );
}
