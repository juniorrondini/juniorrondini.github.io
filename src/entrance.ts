import gsap from "gsap";

const introKey = "jr-intro-seen";
const introVersion = "2";
const coverHold = 2.65;

function hasSeenIntro() {
  try {
    return sessionStorage.getItem(introKey) === introVersion;
  } catch {
    return false;
  }
}

function rememberIntro() {
  try {
    sessionStorage.setItem(introKey, introVersion);
  } catch {
    // The entrance still works when storage is unavailable.
  }
}

export function playEntrance(root: HTMLElement) {
  if (window.scrollY > 1 || (location.hash && location.hash !== "#top"))
    return;

  const hero = gsap.timeline({ paused: true, defaults: { ease: "power4.out" } });
  hero
    .from(".hero-name-first .hero-letter", {
      yPercent: 116,
      rotation: 8,
      duration: 0.95,
      stagger: 0.035,
      clearProps: "all",
    }, 0)
    .from(".hero-name-last .hero-letter", {
      yPercent: 112,
      rotation: -6,
      duration: 1,
      stagger: 0.045,
      clearProps: "all",
    }, 0.12)
    .from(".hero-shot", {
      clipPath: "inset(0 100% 0 0)",
      duration: 1.1,
      clearProps: "clipPath",
    }, 0.16)
    .from(".hero-role, .hero-statement", {
      y: 12,
      opacity: 0,
      duration: 0.6,
      stagger: 0.12,
      clearProps: "all",
    }, 0.18);

  const cover = root.querySelector<HTMLElement>(".site-intro");
  const counter = cover?.querySelector<HTMLElement>(".intro-count");
  const image = root.querySelector<HTMLImageElement>(".hero-shot img");
  if (!cover || !counter || !image || hasSeenIntro()) {
    hero.play();
    return;
  }

  const interaction = new AbortController();
  const assets = [
    document.fonts?.load('800 1em "Big Shoulders Display Variable"'),
    document.fonts?.load('italic 500 1em "Cormorant Garamond"'),
    image.decode?.(),
  ];
  let completed = 0;
  const progress = { value: 0 };
  const updateCounter = () => {
    const ready = Math.round(completed / assets.length * 100);
    const displayed = Math.min(Math.floor(progress.value), ready);
    counter.textContent = String(displayed).padStart(2, "0");
  };
  updateCounter();
  const count = gsap.to(progress, {
    value: 100,
    duration: coverHold - 0.15,
    ease: "none",
    onUpdate: updateCounter,
  });

  gsap.set(cover, { autoAlpha: 1 });
  gsap.from(".intro-signature", {
    clipPath: "inset(0 100% 0 0)",
    x: -14,
    duration: 0.9,
    ease: "power3.out",
    clearProps: "all",
  });
  const opening = gsap.timeline({
    paused: true,
    onComplete: () => interaction.abort(),
  });
  opening
    .to(cover, { yPercent: -100, duration: 0.7, ease: "power4.inOut" }, 0.12)
    .call(() => hero.timeScale(1.2).play(), [], 0.06)
    .set(cover, { autoAlpha: 0 });

  const reveal = () => {
    rememberIntro();
    opening.play();
  };
  const deadline = gsap.delayedCall(coverHold, reveal);

  const advance = () => {
    if (interaction.signal.aborted) return;
    completed += 1;
    updateCounter();
  };
  // A failed resource is settled too. The page can reveal its fallback.
  for (const asset of assets)
    void Promise.resolve(asset).then(advance, advance);

  const skip = () => {
    count.kill();
    deadline.kill();
    reveal();
    opening.progress(1).pause();
    hero.progress(1).pause();
  };
  const options = { signal: interaction.signal, passive: true, capture: true };
  for (const event of ["keydown", "pointerdown", "wheel", "hashchange"])
    window.addEventListener(event, skip, options);

  return () => {
    interaction.abort();
    deadline.kill();
  };
}
