import { Link } from "@tanstack/react-router";
import ThemeToggle from "./ThemeToggle";
import { useState, useEffect, useRef } from "react";

const NB_THEMES = [
  { key: "default",  label: "Default",  swatch: "#ffe566" },
  { key: "sunset",   label: "Sunset",   swatch: "#ffb347" },
  { key: "midnight", label: "Midnight", swatch: "#6060cc" },
  { key: "forest",   label: "Forest",   swatch: "#80cbc4" },
  { key: "candy",    label: "Candy",    swatch: "#ff99cc" },
  { key: "ocean",    label: "Ocean",    swatch: "#40a8ff" },
] as const;

function NbThemePicker() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("default");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("nb-theme") ?? "default";
    setActive(saved);
    document.documentElement.setAttribute("data-nb-theme", saved === "default" ? "" : saved);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const pick = (key: string) => {
    setActive(key);
    setOpen(false);
    localStorage.setItem("nb-theme", key);
    document.documentElement.setAttribute("data-nb-theme", key === "default" ? "" : key);
  };

  const current = NB_THEMES.find(t => t.key === active) ?? NB_THEMES[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        title="Pick learn page theme"
        className="nb-theme-btn"
        style={{ "--swatch": current.swatch } as React.CSSProperties}
        aria-label="Choose colour theme"
      >
        🎨
      </button>
      {open && (
        <div className="absolute right-0 top-10 z-50 flex gap-1.5 rounded-lg border-2 border-[var(--nb-border-color,#0f0f0f)] bg-white p-2 shadow-[4px_4px_0px_#0f0f0f]">
          {NB_THEMES.map(t => (
            <button
              key={t.key}
              title={t.label}
              onClick={() => pick(t.key)}
              className={`nb-theme-btn ${active === t.key ? "active" : ""}`}
              style={{ "--swatch": t.swatch } as React.CSSProperties}
              aria-label={t.label}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] px-4 backdrop-blur-lg">
      <nav className="page-wrap flex flex-wrap items-center gap-x-3 gap-y-2 py-3 sm:py-4">
        <h2 className="m-0 flex-shrink-0 text-base font-semibold tracking-tight">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-sm text-[var(--sea-ink)] no-underline shadow-[0_8px_24px_rgba(30,90,72,0.08)] sm:px-4 sm:py-2"
          >
            <span className="h-2 w-2 rounded-full bg-[linear-gradient(90deg,#56c6be,#7ed3bf)]" />
            DSA Inventory
          </Link>
        </h2>

        <div className="order-3 flex w-full flex-wrap items-center gap-x-4 gap-y-1 pb-1 text-sm font-semibold sm:order-none sm:w-auto sm:flex-nowrap sm:pb-0">
          <Link to="/" className="nav-link" activeProps={{ className: "nav-link is-active" }}>
            Topics
          </Link>
          <Link to="/learn" className="nav-link" activeProps={{ className: "nav-link is-active" }}>
            Learn
          </Link>
          <Link to="/explore" className="nav-link" activeProps={{ className: "nav-link is-active" }}>
            Explore
          </Link>
          <a href="https://github.com/rashidtvmr/dsa-inventory" className="nav-link" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <NbThemePicker />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
