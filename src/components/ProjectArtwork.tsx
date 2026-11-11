import { ArrowUpRight, Asterisk, FileText, Plus } from "lucide-react";
import type { Copy, Project } from "../content";

export function ProjectArtwork({ kind, t }: { kind: Project["art"]; t: Copy }) {
  if (kind === "genesys")
    return (
      <div className="art art-genesys" aria-hidden="true">
        <div className="art-grid" />
        <span className="art-kicker">GENESYS / {t.art.portal}</span>
        <div className="genesys-orbit">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit-core">
            g<span>↗</span>
          </div>
          <i className="orbit-point p1" />
          <i className="orbit-point p2" />
        </div>
        <div className="genesys-mini">
          <div className="mini-top">
            <b>
              genesys<span>+</span>
            </b>
            <Plus size={13} />
          </div>
          <div className="mini-title">{t.art.ecosystem}</div>
          <div className="mini-services">
            {[t.art.news, t.art.client, t.art.license].map((v, i) => (
              <span key={v}>
                <i>0{i + 1}</i>
                {v}
                <ArrowUpRight size={13} />
              </span>
            ))}
          </div>
        </div>
        <span className="art-bottom">{t.art.connected}</span>
        <span className="art-coordinate">G—01 / 23°</span>
      </div>
    );
  if (kind === "nutrition")
    return (
      <div className="art art-nutrition" aria-hidden="true">
        <div className="nutrition-circle" />
        <span className="art-kicker">
          {t.art.nutrition} / {t.art.services}
        </span>
        <div className="nutrition-headline">
          {t.art.healthy.split("\n").map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
        <div className="nutrition-leaf leaf-one" />
        <div className="nutrition-leaf leaf-two" />
        <div className="nutrition-seed" />
        <div className="nutrition-card">
          <span className="nutrition-symbol">
            sa<span>·</span>
          </span>
          <div>
            <span>{t.art.nutrition}</span>
            <small>{t.art.review}</small>
          </div>
          <ArrowUpRight size={20} />
        </div>
        <span className="art-bottom">{t.art.nature}</span>
        <span className="art-coordinate">S—02 / 08°</span>
      </div>
    );
  return (
    <div className="art art-resume" aria-hidden="true">
      <div className="art-grid" />
      <span className="art-kicker">
        {t.art.resume} / {t.art.tool}
      </span>
      <div className="resume-word">
        Aa<span>↗</span>
      </div>
      <div className="paper paper-back" />
      <div className="paper paper-front">
        <div className="paper-header">
          <div className="paper-avatar">
            <Asterisk />
          </div>
          <div>
            <div className="paper-name" />
            <div className="paper-line short" />
          </div>
        </div>
        {[t.art.document, t.art.education, t.art.skills].map((v, i) => (
          <div className="paper-section" key={v}>
            <b>
              0{i + 1} / {v}
            </b>
            <div className="paper-line" />
            <div className="paper-line" />
            <div className="paper-line short" />
          </div>
        ))}
        <FileText className="paper-icon" />
      </div>
      <span className="resume-caption">
        {t.art.story.split("\n").map((line) => (
          <span key={line}>{line}</span>
        ))}
      </span>
      <span className="art-bottom">{t.art.templates}</span>
      <span className="art-coordinate">C—03 / A4</span>
    </div>
  );
}
