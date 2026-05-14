import { createFileRoute, Link } from '@tanstack/react-router'
import { articles } from '#/data/articles'

export const Route = createFileRoute('/learn/')({ component: LearnPage })

function LearnPage() {
  return (
    <main className="nb-page-wrap px-4 pb-20 pt-10 sm:pt-14">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="nb-card nb-accent-bg mb-12 bg-[var(--nb-yellow)] p-8 sm:p-12">
        <p className="nb-kicker mb-3">DSA Course</p>
        <h1 className="nb-display mb-4 text-[clamp(2.2rem,6vw,4.2rem)] leading-tight">
          Learn every pattern.<br/>
          <span className="nb-underline">Actually understand it.</span>
        </h1>
        <p className="max-w-xl text-base font-medium opacity-80">
          {articles.length} deep-dive articles. Each one teaches the intuition first,
          brute force second, optimal last — the way you actually learn.
          Linked to {articles.reduce((s) => s + 1, 0)}k+ practice problems.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <div className="nb-chip bg-white">
            <span className="font-bold">{articles.length}</span> patterns
          </div>
          <div className="nb-chip bg-white">
            38k+ problems
          </div>
          <div className="nb-chip bg-white">
            Written in your style
          </div>
        </div>
      </section>

      {/* ── Article grid ─────────────────────────────────────────── */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, i) => (
          <Link
            key={article.slug}
            to="/learn/$pattern"
            params={{ pattern: article.slug }}
            className="group no-underline"
          >
            <article
              className="nb-card nb-card-hover h-full p-5"
              style={{ '--nb-card-rotate': `${(i % 3 === 1 ? 0.4 : i % 3 === 2 ? -0.5 : 0.3)}deg` } as React.CSSProperties}
            >
              {/* Sticky corner */}
              <div className="absolute -right-2 -top-2 h-6 w-6 bg-[var(--nb-yellow)] border-2 border-[var(--nb-border-color)] shadow-[2px_2px_0px_var(--nb-border-color)]" />

              <div className="mb-3 flex items-start gap-3">
                <span className="nb-emoji-badge">{article.emoji}</span>
                <div className="min-w-0 flex-1">
                  <h3 className="nb-heading-sm truncate">{article.title}</h3>
                  <p className="mt-0.5 text-xs font-medium opacity-60">{article.readTime} read</p>
                </div>
              </div>

              <p className="mb-4 text-sm leading-relaxed opacity-75">
                {article.tagline}
              </p>

              <div className="flex items-center justify-between border-t-2 border-[var(--nb-border-color)] pt-3">
                <Link
                  to="/problems/$topic"
                  params={{ topic: article.topicSlug }}
                  className="nb-chip bg-[var(--nb-surface)] text-xs no-underline"
                  onClick={e => e.stopPropagation()}
                >
                  {article.topicSlug.replace('_', ' ')} →
                </Link>
                <span className="text-xs font-bold uppercase tracking-wider opacity-50 group-hover:opacity-100 transition-opacity">
                  Read →
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* ── Footer note ──────────────────────────────────────────── */}
      <div className="mt-16 nb-card nb-accent-bg bg-[var(--nb-green)] p-6 text-center">
        <p className="nb-heading-sm mb-2">More articles coming</p>
        <p className="text-sm opacity-75">String algorithms, Segment Trees, Monotonic Stack, Bit DP — next up.</p>
      </div>
    </main>
  )
}
