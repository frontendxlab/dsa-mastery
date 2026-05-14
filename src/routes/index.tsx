import { Link, createFileRoute } from '@tanstack/react-router'
import { topics, totalProblems, uniquePlatforms } from '#/data/topics'
import { useState, useMemo, useEffect, useRef } from 'react'

export const Route = createFileRoute('/')({ component: App })

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const counted = useRef(false)

  useEffect(() => {
    if (!ref.current || counted.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || counted.current) return
        counted.current = true
        const duration = 1500
        const start = performance.now()
        const animate = (now: number) => {
          const elapsed = now - start
          const progress = Math.min(elapsed / duration, 1)
          const eased = 1 - (1 - progress) * (1 - progress) * (1 - progress)
          setCount(Math.floor(eased * target))
          if (progress < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
      },
      { threshold: 0.3 },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

function App() {
  const [search, setSearch] = useState('')

  const filtered = useMemo(
    () =>
      topics.filter(
        (t) =>
          t.name.toLowerCase().includes(search.toLowerCase()) ||
          t.description.toLowerCase().includes(search.toLowerCase()) ||
          t.slug.includes(search.toLowerCase()),
      ),
    [search],
  )

  return (
    <main className="page-wrap px-4 pb-16 pt-10 sm:pt-14">
      <section className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-14 sm:px-12 sm:py-20">
        <div className="pointer-events-none absolute -left-24 -top-28 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.3),transparent_66%)]" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(47,106,74,0.16),transparent_66%)]" />
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.5),transparent_60%)]" />

        <p className="island-kicker mb-4">DSA Problem Inventory</p>

        <div className="flex flex-wrap gap-8 sm:gap-12">
          <div>
            <h1 className="display-title text-[clamp(2.5rem,7vw,5rem)] leading-[1.02] font-bold tracking-tight text-[var(--sea-ink)]">
              <span className="text-[var(--lagoon-deep)] tabular-nums">
                <AnimatedCounter target={totalProblems} />
              </span>
              <br />
              <span className="text-[length:0.45em] text-[var(--sea-ink)]">
                problems
              </span>
            </h1>
          </div>
          <div className="flex flex-col gap-2 self-end pb-2">
            <p className="text-sm text-[var(--sea-ink-soft)]">
              <span className="font-semibold text-[var(--sea-ink)]">{topics.length}</span> topics
              <span className="mx-2">·</span>
              <span className="font-semibold text-[var(--sea-ink)]">{uniquePlatforms}+</span> platforms
              <span className="mx-2">·</span>
              <span className="font-semibold text-[var(--sea-ink)]">37+</span> OJs
            </p>
            <p className="max-w-lg text-sm leading-relaxed text-[var(--sea-ink-soft)]">
              Curated, deduplicated DSA problems from LeetCode, Codeforces,
              AtCoder, GeeksforGeeks, CSES, and beyond. Built for serious practice.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            ['CSV-backed', 'All data lives in plain CSVs — auditable, portable, Git-friendly'],
            ['SSR rendered', 'TanStack Start + Cloudflare Workers for instant page loads'],
            ['Search & filter', 'Full-text search across 31k+ problems with platform filters'],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="rounded-xl border border-[var(--chip-line)] bg-[var(--chip-bg)] px-4 py-3"
            >
              <p className="text-xs font-semibold text-[var(--sea-ink)]">{title}</p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-[var(--sea-ink-soft)]">{desc}</p>
            </div>
          ))}
        </div>

        <div className="relative mt-8 max-w-md">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search topics..."
            className="w-full rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-5 py-3 pl-11 text-sm text-[var(--sea-ink)] outline-none transition placeholder:text-[var(--sea-ink-soft)] focus:border-[var(--lagoon)] focus:ring-2 focus:ring-[rgba(79,184,178,0.2)]"
          />
          <svg className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--sea-ink-soft)]" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </section>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="display-title text-xl font-bold text-[var(--sea-ink)]">
          {filtered.length} topic{filtered.length !== 1 ? 's' : ''}
        </h2>
        <p className="island-kicker text-xs">
          <AnimatedCounter target={totalProblems} /> total problems
        </p>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((topic, i) => (
          <Link
            key={topic.slug}
            to="/problems/$topic"
            params={{ topic: topic.slug }}
            className="rise-in group block no-underline"
            style={{ animationDelay: `${i * 50 + 80}ms` }}
          >
            <article className="island-shell feature-card relative rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1">
              <div className="relative z-10 mb-3 flex items-center gap-3">
                <span
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${topic.gradient} text-sm font-bold text-white shadow-sm`}
                >
                  {topic.name.charAt(0)}
                </span>
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-[var(--sea-ink)]">
                    {topic.name}
                  </h3>
                  <p className="text-xs text-[var(--sea-ink-soft)]">
                    {topic.platforms} platform{topic.platforms !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              <p className="relative z-10 mb-4 line-clamp-2 text-xs leading-relaxed text-[var(--sea-ink-soft)]">
                {topic.description}
              </p>

              <div className="relative z-10 flex items-center justify-between border-t border-[var(--line)] pt-3">
                <span className="flex items-baseline gap-1">
                  <span className="text-xl font-bold tabular-nums tracking-tight text-[var(--sea-ink)]">
                    {topic.count.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-[var(--sea-ink-soft)]">problems</span>
                </span>
              </div>

              <div
                className={`pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br ${topic.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-[0.08]`}
              />
            </article>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-sm text-[var(--sea-ink-soft)]">
          No topics match "{search}"
        </p>
      )}

      <section className="rise-in mt-16 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8" style={{ animationDelay: '300ms' }}>
        <p className="island-kicker mb-4">By the Numbers</p>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            ['Total Problems', totalProblems, 'Across all 14 topics'],
            ['Topics Covered', topics.length, 'From Math to Trie'],
            ['Source Platforms', `${uniquePlatforms}+`, 'LeetCode, Codeforces, AtCero, GFG, CSES...'],
          ].map(([label, value, desc]) => (
            <div key={label}>
              <p className="display-title text-3xl font-bold tabular-nums tracking-tight text-[var(--lagoon-deep)]">
                <AnimatedCounter target={typeof value === 'number' ? value : 0} />
                {typeof value !== 'number' ? '' : '+'}
              </p>
              <p className="mt-1 text-sm font-semibold text-[var(--sea-ink)]">{label}</p>
              <p className="mt-0.5 text-xs text-[var(--sea-ink-soft)]">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
