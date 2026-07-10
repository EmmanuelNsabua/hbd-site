"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState, useCallback } from "react";

type CssVars = CSSProperties & Record<`--${string}`, string>;
type AudioWindow = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext;
  };

const bootLines = [
  "pnpm deploy:birthday",
  "bundling wishes...",
  "optimizing cake layers...",
];

const wishText =
  "Happy Deploy Day, Gael ! \nQue le script de ta nouvelle année de naissance s'exécute sans le moindre warning. On te souhaite un quotidien en Clean Architecture, des projets qui compilent du premier coup, et un niveau de batterie toujours au max. La pull request la plus importante de l'année vient d'être approuvée : place à la fête !";

const stack = ["JS", "React", "Next", "Tailwind"];
const checks = ["intro", "cake", "wish", "party"];
const tokens = ["{}", "</>", "npm", "git", "PR", "++", "tsx", "ship"];

export default function Home() {
  const [bookOpen, setBookOpen] = useState(false);
  const [typedWish, setTypedWish] = useState("");
  const [partyKey, setPartyKey] = useState(0);
  const [lightMode, setLightMode] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const burstTokens = useMemo(
    () =>
      Array.from({ length: 42 }, (_, index) => ({
        token: tokens[index % tokens.length],
        x: `${Math.round(Math.cos(index * 1.7) * (90 + (index % 5) * 22))}px`,
        y: `${Math.round(Math.sin(index * 1.3) * (70 + (index % 6) * 18))}px`,
        r: `${(index * 29) % 180}deg`,
        d: `${(index % 12) * 42}ms`,
      })),
    [],
  );

  useEffect(() => {
    if (!bookOpen) return;

    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedWish(wishText.slice(0, index));
      if (index >= wishText.length) window.clearInterval(timer);
    }, 24);

    return () => window.clearInterval(timer);
  }, [bookOpen]);

  function playTone() {
    if (!soundOn) return;

    // ---------------------------------------------------------
    // POUR METTRE TON PROPRE SON :
    // 1. Mets ton fichier (ex: mon-son.mp3) dans public/
    // 2. Décommente les deux lignes ci-dessous :
    // ---------------------------------------------------------
    const customAudio = new Audio('/assets/mon-son.mp3');
    customAudio.play().catch(() => {});
    return;

    // Son "bip" généré par défaut :
    /*const AudioContextClass = window.AudioContext || (window as AudioWindow).webkitAudioContext;
    if (!AudioContextClass) return;
    const audio = new AudioContextClass();
    [523.25, 659.25, 783.99].forEach((frequency, index) => {
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      osc.type = "triangle";
      osc.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, audio.currentTime + index * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.12, audio.currentTime + index * 0.1 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + index * 0.1 + 0.22);
      osc.connect(gain).connect(audio.destination);
      osc.start(audio.currentTime + index * 0.1);
      osc.stop(audio.currentTime + index * 0.1 + 0.24);
    });*/
  }

  function openCard() {
    setTypedWish("");
    setBookOpen(true);
    setPartyKey((key) => key + 1);
    playTone();
  }

  function closeCard() {
    setBookOpen(false);
    setTypedWish("");
  }

  function celebrate() {
    setPartyKey((key) => key + 1);
    playTone();
  }

  return (
    <main
      className={[
        "relative flex min-h-dvh w-full flex-col items-center justify-center overflow-x-hidden overflow-y-auto px-4 py-8 text-[#fff6d9]",
        lightMode ? "deploy-scene deploy-scene-light" : "deploy-scene",
      ].join(" ")}
    >
      <div className="code-grid" aria-hidden="true" />
      <div className="circuit-line circuit-line-one" aria-hidden="true" />
      <div className="circuit-line circuit-line-two" aria-hidden="true" />

      <header className="absolute left-4 right-4 top-3 z-20 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-mono text-xs font-black tracking-[0.18em] sm:text-sm">
          <span className="grid size-9 place-items-center rounded-lg border border-emerald-300/35 bg-slate-950/60 text-emerald-300 shadow-[0_0_22px_rgba(45,255,169,0.22)]">
            {"{}"}
          </span>
          <span className="hidden sm:inline" translate="no">deploy_day.card</span>
        </div>

        <div className="flex min-w-0 items-center gap-2">
          {stack.map((item, index) => (
            <span
              className="stack-pill hidden border border-white/12 bg-white/7 px-3 py-2 font-mono text-[0.68rem] font-bold text-white/80 shadow-lg backdrop-blur md:inline-flex"
              key={item}
              style={{ "--delay": `${index * 90}ms` } as CssVars}
            >
              {item}
            </span>
          ))}
          <button
            aria-label="Audio festif"
            aria-pressed={soundOn}
            className="icon-control"
            onClick={() => setSoundOn((value) => !value)}
            type="button"
          >
            ♪
          </button>
          <button
            aria-label="Mode IDE"
            aria-pressed={lightMode}
            className="icon-control"
            onClick={() => setLightMode((value) => !value)}
            type="button"
          >
            ◐
          </button>
        </div>
      </header>

      <section className="relative z-10 grid h-auto min-h-[min(720px,calc(100dvh-92px))] w-full max-w-6xl grid-cols-1 items-center gap-4 pt-12 md:grid-cols-[1.02fr_0.98fr] md:pt-6">
        <div className="intro-panel min-w-0 min-h-0 overflow-hidden rounded-lg border border-white/12 bg-[#151a31]/82 shadow-2xl backdrop-blur-xl">
          <div className="flex h-11 items-center gap-2 border-b border-white/10 bg-white/6 px-4">
            <span className="size-3 rounded-full bg-[#ff5c9a]" />
            <span className="size-3 rounded-full bg-[#ffe98a]" />
            <span className="size-3 rounded-full bg-[#3bffae]" />
            <span className="ml-2 font-mono text-xs font-bold text-white/62">birthday-build.tsx</span>
          </div>

          <div className="grid gap-5 p-5 sm:p-7">
            <div className="space-y-2 font-mono text-xs text-cyan-100/76 sm:text-sm" suppressHydrationWarning>
              {isMounted && bootLines.map((line, index) => (
                <p
                  className="boot-line"
                  key={line}
                  style={{ "--delay": `${index * 280}ms` } as CssVars}
                >
                  <span className="text-emerald-300">$</span> {line}
                </p>
              ))}
            </div>

            <div>
              <p className="mb-3 w-fit rounded-md border border-emerald-300/35 bg-emerald-300/10 px-3 py-2 font-mono text-xs font-bold text-emerald-200">
                PR approved · #happy-deploy
              </p>
              <h1 className="max-w-xl text-[clamp(2.35rem,7vw,5.9rem)] font-black leading-[0.9] tracking-normal text-[#fff4cf]">
                Happy Deploy Day
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-200/78 sm:text-base">
                Une carte d’anniversaire compilée comme une release brillante : intro animée, gâteau-écran, livre qui
                s’ouvre et message qui s’écrit comme un commit important.
              </p>
            </div>

            <div className="grid gap-3 sm:flex sm:items-center">
              <button className="build-cta" onClick={openCard} type="button">
                <span className="grid size-7 place-items-center rounded-full bg-white/70 text-slate-950">▶</span>
                <span>Click me</span>
                <span className="build-cta-meter" aria-hidden="true" />
              </button>

              <div className="grid grid-cols-4 gap-2 sm:min-w-72">
                {checks.map((check, index) => (
                  <div className="check-chip" key={check} style={{ "--delay": `${900 + index * 120}ms` } as CssVars}>
                    <span />
                    {check}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="stage-panel relative flex flex-col min-w-0 min-h-0 overflow-hidden rounded-lg border border-white/12 bg-[#151a31]/60 shadow-2xl backdrop-blur-xl lg:mr-8 w-full h-full">
          {/* Header style visionneuse d'images */}
          <div className="flex h-11 items-center justify-between border-b border-white/10 bg-white/6 px-4 shrink-0">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-[#ff5c9a]" />
              <span className="size-3 rounded-full bg-[#ffe98a]" />
              <span className="size-3 rounded-full bg-[#3bffae]" />
              <span className="ml-2 font-mono text-xs font-bold text-white/62">preview-celebration.jpg</span>
            </div>
            <span className="font-mono text-[10px] text-emerald-300 bg-emerald-300/10 px-2 py-0.5 rounded border border-emerald-300/20">
              100% Zoom
            </span>
          </div>

          {/* Image Container */}
          <div className="relative flex-1 p-4 sm:p-6 flex items-center justify-center bg-slate-950/40 min-h-[300px]">
            <div className="relative w-full h-full max-h-[420px] aspect-[4/3] rounded-lg overflow-hidden border-2 border-white/10 shadow-2xl group">
              <img 
                src="/assets/IMG-20230707-WA0003~2.jpg.jpeg" 
                alt="Aqsa Celebration" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="font-mono text-xs text-white/80 font-bold bg-slate-900/60 px-3 py-1.5 rounded-md backdrop-blur border border-white/10">
                  📷 aqsa_live.jpg
                </span>
                <span className="font-mono text-[11px] text-emerald-400 font-bold animate-pulse">
                  ● Live Preview
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {bookOpen ? (
        <div className="book-overlay" role="dialog" aria-modal="true" aria-label="Carte de vœux">
          <button className="close-book" onClick={closeCard} type="button" aria-label="Fermer">
            ×
          </button>

          <div className="book-wrap">
            <div className="book open">
              <div className="book-cover">
                <span className="font-mono text-xs text-emerald-200">approved PR</span>
                <strong>Birthday Wish</strong>
                <small>#ship-happiness</small>
              </div>

              <div className="book-pages">
                <div className="book-page book-page-left">
                  <span className="page-kicker">release notes</span>
                  <h2>vBirthday.2026</h2>
                  <div className="mini-log">
                    <p>
                      <b>feat:</b> ajout de joie stable
                    </p>
                    <p>
                      <b>fix:</b> suppression des bugs de tristesse
                    </p>
                    <p>
                    <b>perf:</b> batteries rechargées
                    </p>
                  </div>
                  <button className="tiny-build" onClick={celebrate} type="button">
                    relancer la fête
                  </button>
                </div>

                <div className="book-page book-page-right">
                  <span className="page-kicker">wish.md</span>
                  <p className="typed-wish">
                    {typedWish}
                    <span className="cursor">|</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="token-burst" key={partyKey} aria-hidden="true">
        {burstTokens.map((token, index) => (
          <span
            key={`${partyKey}-${index}`}
            style={{ "--x": token.x, "--y": token.y, "--r": token.r, "--d": token.d } as CssVars}
          >
            {token.token}
          </span>
        ))}
      </div>
    </main>
  );
}
