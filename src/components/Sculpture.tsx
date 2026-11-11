import { useEffect, useRef, useState } from "react";
import type { Theme } from "../content";

function Fallback() {
  return (
    <svg
      className="sculpture-fallback"
      viewBox="0 0 640 580"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="jr-face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--metal-light)" />
          <stop offset=".28" stopColor="var(--metal-mid)" />
          <stop offset=".5" stopColor="var(--metal-light)" />
          <stop offset=".65" stopColor="var(--metal-dark)" />
          <stop offset="1" stopColor="var(--metal-mid)" />
        </linearGradient>
        <linearGradient id="jr-side" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#161916" />
          <stop offset="1" stopColor="#7e8278" />
        </linearGradient>
        <filter id="shadow">
          <feGaussianBlur stdDeviation="19" />
        </filter>
      </defs>
      <ellipse
        cx="330"
        cy="491"
        rx="180"
        ry="16"
        fill="currentColor"
        opacity=".16"
        filter="url(#shadow)"
      />
      <g transform="translate(71 75) rotate(-12 250 220)">
        <g
          transform="translate(24 26)"
          fill="url(#jr-side)"
          stroke="#454940"
          strokeWidth="1"
        >
          <path d="M39 53H220V293Q220 388 119 388Q17 388 17 282H86Q86 320 119 320Q150 320 150 282V124H39Z" />
          <path
            fillRule="evenodd"
            d="M253 53H370Q478 53 478 160Q478 218 418 244L506 388H418L327 253V388H253ZM327 121V187H370Q403 187 403 154Q403 121 370 121Z"
          />
        </g>
        <g fill="url(#jr-face)" stroke="var(--metal-edge)" strokeWidth="1.5">
          <path d="M39 53H220V293Q220 388 119 388Q17 388 17 282H86Q86 320 119 320Q150 320 150 282V124H39Z" />
          <path
            fillRule="evenodd"
            d="M253 53H370Q478 53 478 160Q478 218 418 244L506 388H418L327 253V388H253ZM327 121V187H370Q403 187 403 154Q403 121 370 121Z"
          />
        </g>
        <path
          d="M221 180H251M220 212H251"
          stroke="var(--accent)"
          strokeWidth="14"
        />
        <circle cx="72" cy="88" r="7" fill="var(--accent)" />
        <circle cx="288" cy="88" r="7" fill="var(--accent)" />
      </g>
    </svg>
  );
}

export default function Sculpture({
  theme,
  label,
}: {
  theme: Theme;
  label: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const element = host.current;
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce), (max-width: 760px)",
    );
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    if (!element) return;
    const eligible = () =>
      !media.matches &&
      !(nav.deviceMemory !== undefined && nav.deviceMemory < 4) &&
      !nav.connection?.saveData;
    let cancelled = false;
    let generation = 0;
    let dispose: (() => void) | undefined;
    const start = async () => {
      const requestedGeneration = generation;
      try {
        const { mountScene } = await import("../scene");
        if (
          cancelled ||
          requestedGeneration !== generation ||
          !eligible() ||
          dispose
        )
          return;
        dispose = mountScene(
          element,
          theme,
          () => {
            if (!cancelled) setReady(true);
          },
          () => {
            if (!cancelled) setReady(false);
          },
        );
      } catch {
        /* The original SVG stays visible when WebGL is unavailable. */
      }
    };
    let timer = eligible()
      ? window.setTimeout(() => {
          void start();
        }, 150)
      : undefined;
    const update = () => {
      generation++;
      clearTimeout(timer);
      dispose?.();
      dispose = undefined;
      setReady(false);
      if (eligible())
        timer = window.setTimeout(() => {
          void start();
        }, 150);
    };
    media.addEventListener("change", update);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      dispose?.();
      media.removeEventListener("change", update);
    };
  }, [theme]);
  return (
    <div
      className={`sculpture ${ready ? "is-ready" : ""}`}
      role="img"
      aria-label={label}
    >
      <Fallback />
      <div ref={host} className="webgl-host" aria-hidden="true" />
    </div>
  );
}
