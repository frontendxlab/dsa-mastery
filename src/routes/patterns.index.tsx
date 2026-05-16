import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { PATTERN_PARTS } from "#/data/patterns-inventory";
import type { PatternInventoryEntry, PatternPart } from "#/data/patterns-inventory";

export const Route = createFileRoute("/patterns/")({
  component: PatternsPage,
});

function PatternCard({
  pattern,
  part,
  index,
}: {
  pattern: PatternInventoryEntry;
  part: PatternPart;
  index: number;
}) {
  const delay = index * 40;

  const visualColors = [
    "oklch(0.88 0.104 90 / 60%)",
    "oklch(0.82 0.112 355 / 50%)",
    "oklch(0.82 0.096 191 / 50%)",
    "oklch(0.85 0.104 145 / 50%)",
    "oklch(0.72 0.112 240 / 40%)",
    "oklch(0.75 0.112 290 / 40%)",
    "oklch(0.82 0.112 60 / 50%)",
  ];
  const visualColor = visualColors[index % visualColors.length];

  return (
    <Link
      to="/patterns/$pattern"
      params={{ pattern: pattern.slug }}
      className="group block no-underline"
      style={{ animationDelay: `${delay}ms` }}
    >
      <article
        className="relative h-full rounded-xl border border-[var(--border)] p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
        style={{ backgroundColor: part.color }}
      >
        <div className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--card)] text-xl shadow-sm transition-all duration-200 group-hover:rotate-12">
          {pattern.emoji}
        </div>

        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--card)] shadow-sm">
          <svg viewBox="0 0 60 40" className="h-8 w-8">
            <rect x="5" y="12" width="50" height="16" fill="none" stroke={visualColor} strokeWidth="2" rx="3" />
            <rect x="15" y="14" width="20" height="12" fill={visualColor} fillOpacity="0.3" stroke={visualColor} strokeWidth="2" rx="2" />
            <path d="M25 6 L25 12 M40 6 L40 12" stroke={visualColor} strokeWidth="2" strokeDasharray="2,2" />
            <text x="22" y="11" fontSize="7" fill={visualColor} fontWeight="bold">i</text>
            <text x="37" y="11" fontSize="7" fill={visualColor} fontWeight="bold">j</text>
          </svg>
        </div>

        <div className="pr-8">
          <h3 className="text-base font-black text-[var(--foreground)] tracking-tight">
            {pattern.title}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-[var(--foreground)] opacity-75">
            {pattern.tagline}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-3">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black tabular-nums text-[var(--foreground)]">
              {pattern.problemCount.toLocaleString()}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--foreground)] opacity-60">
              problems
            </span>
          </div>
          {pattern.variations && pattern.variations.length > 0 ? (
            <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--card)] px-2 py-0.5 text-[9px] font-bold text-[var(--foreground)]">
              {pattern.variations.length} vars
            </span>
          ) : (
            <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--foreground)] opacity-50 transition-opacity group-hover:opacity-100">
              Learn →
            </span>
          )}
        </div>
      </article>
    </Link>
  );
}

function PatternSection({ part }: { part: PatternPart }) {
  return (
    <section className="mb-10">
      <div className="mb-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-[var(--border)]" />
        <span
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-1.5 text-xs font-black uppercase tracking-widest shadow-sm text-[var(--foreground)]"
          style={{ backgroundColor: part.color }}
        >
          {part.part}
        </span>
        <div className="h-px flex-1 bg-[var(--border)]" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {part.patterns.map((pattern, i) => (
          <PatternCard key={pattern.slug} pattern={pattern} part={part} index={i} />
        ))}
      </div>
    </section>
  );
}

function PatternsPage() {
  const [search, setSearch] = useState("");

  const filteredParts = useMemo(() => {
    if (!search.trim()) return PATTERN_PARTS;
    const q = search.toLowerCase();
    return PATTERN_PARTS.map((part) => ({
      ...part,
      patterns: part.patterns.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q)
      ),
    })).filter((part) => part.patterns.length > 0);
  }, [search]);

  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:pt-14">
      {/* Hero */}
      <section className="mb-10 rounded-2xl border border-[var(--border)] bg-[var(--secondary)] p-8 sm:p-12 shadow-sm">
        <div className="flex items-start gap-6 flex-wrap sm:flex-nowrap">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] text-4xl shadow-sm">
            📚
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--primary)] mb-2">Pattern-Based Learning</p>
            <h1 className="text-[clamp(2rem,6vw,3.5rem)] font-bold leading-tight text-[var(--foreground)]">
              Master DSA by Pattern
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)] max-w-2xl">
              Learn the skeleton once, apply to hundreds of problems. Each pattern breaks down into variations —
              the template stays 90% the same, only the details change.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/patterns/sliding-window"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--foreground)] px-6 py-3 text-sm font-black text-[var(--background)] shadow-sm transition-all duration-150 hover:shadow-md hover:-translate-y-0.5 no-underline"
              >
                <span>🪟</span>
                <span>Start with Sliding Window</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-xl">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patterns (e.g. 'sliding', 'graph', 'dp')..."
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--secondary)] px-5 py-4 pl-12 text-sm font-semibold text-[var(--foreground)] outline-none shadow-sm transition-all placeholder:text-[var(--muted-foreground)] placeholder:opacity-60 focus:ring-2 focus:ring-[var(--primary)]"
          />
          <svg
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
            width="18"
            height="18"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex items-center rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-[10px] font-black text-[var(--foreground)] shadow-sm transition-all hover:bg-[var(--secondary)] hover:-translate-y-px"
            >
              ✕ Clear
            </button>
          )}
        </div>
      </div>

      {/* Pattern Sections */}
      {filteredParts.length === 0 && search ? (
        <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-12 text-center shadow-sm">
          <p className="text-4xl">🔍</p>
          <p className="mt-4 text-base font-bold text-[var(--foreground)]">
            No patterns match "{search}"
          </p>
          <button
            type="button"
            onClick={() => setSearch("")}
            className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--secondary)] px-4 py-2 text-xs font-black text-[var(--foreground)] shadow-sm transition-all hover:bg-[var(--card)] hover:-translate-y-0.5"
          >
            Clear Search
          </button>
        </section>
      ) : (
        filteredParts.map((part) => (
          <PatternSection key={part.part} part={part} />
        ))
      )}
    </main>
  );
}
