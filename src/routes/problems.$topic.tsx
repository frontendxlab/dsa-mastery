import { createFileRoute, Link } from '@tanstack/react-router'
import { topics } from '#/data/topics'
import { useMemo, useState, useEffect, useRef } from 'react'

interface Problem {
  platform: string
  name: string
  url: string
  difficulty: string
  keyConcept: string
}

interface TopicData {
  total: number
  platforms: string[]
  problems: Problem[]
}

export const Route = createFileRoute('/problems/$topic')({
  loader: async ({ params }) => {
    const topicInfo = topics.find((t) => t.slug === params.topic)
    if (!topicInfo) return { topicInfo: null, total: 0, platforms: [], problems: [] }
    try {
      const res = await fetch(`/data/${params.topic}.json`)
      if (!res.ok) return { topicInfo, total: 0, platforms: [], problems: [] }
      const data: TopicData = await res.json()
      return { topicInfo, ...data }
    } catch {
      return { topicInfo, total: 0, platforms: [], problems: [] }
    }
  },
  component: TopicPage,
  notFoundComponent: () => (
    <main className="page-wrap px-4 py-20 text-center">
      <h1 className="display-title mb-4 text-3xl font-bold text-[var(--sea-ink)]">
        Topic not found
      </h1>
      <Link
        to="/"
        className="text-sm text-[var(--lagoon-deep)] underline underline-offset-2"
      >
        Back to all topics
      </Link>
    </main>
  ),
})

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const d = difficulty.toLowerCase()
  const color =
    d === 'easy' || d === '800' || d === '900' || d === '1000'
      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      : d === 'hard' ||
          d === '2200' || d === '2300' || d === '2400' || d === '2500' ||
          d === '2600' || d === '2700' || d === '2800' || d === '2900' ||
          d === '3000' || d === '3100' || d === '3200' || d === '3300' ||
          d === '3400' || d === '3500'
        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
        : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${color}`}
    >
      {difficulty || 'N/A'}
    </span>
  )
}

function TopicPage() {
  const { problems, platforms, total, topicInfo } = Route.useLoaderData()
  const [search, setSearch] = useState('')
  const [platformFilter, setPlatformFilter] = useState('all')
  const [difficultyFilters, setDifficultyFilters] = useState<string[]>([])
  const [visibleCount, setVisibleCount] = useState(50)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(() => {
    let result: Problem[] = problems
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.platform.toLowerCase().includes(q) ||
          p.keyConcept.toLowerCase().includes(q) ||
          p.difficulty.toLowerCase().includes(q),
      )
    }
    if (platformFilter !== 'all') {
      result = result.filter((p) => p.platform === platformFilter)
    }
    if (difficultyFilters.length > 0) {
      result = result.filter((p) => difficultyFilters.includes(p.difficulty))
    }
    return result
  }, [problems, search, platformFilter, difficultyFilters])

  const displayed = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  useEffect(() => {
    if (!sentinelRef.current || !hasMore) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((v) => Math.min(v + 50, filtered.length))
        }
      },
      { rootMargin: '200px' },
    )
    observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [hasMore, filtered.length])

  useEffect(() => {
    setVisibleCount(50)
  }, [search, platformFilter, difficultyFilters])

  const difficulties = useMemo(
    () => [...new Set(problems.map((p) => p.difficulty).filter(Boolean))].sort(),
    [problems],
  )

  if (!topicInfo) {
    return (
      <main className="page-wrap px-4 py-20 text-center">
        <h1 className="display-title mb-4 text-3xl font-bold text([var(--sea-ink)])">
          Topic not found
        </h1>
        <Link
          to="/"
          className="text-sm text-[var(--lagoon-deep)] underline underline-offset-2"
        >
          Back to all topics
        </Link>
      </main>
    )
  }

  return (
    <main className="page-wrap px-4 pb-16 pt-8 sm:pt-12">
      <Link
        to="/"
        className="island-kicker mb-6 inline-flex items-center gap-1.5 text-xs no-underline transition hover:text-[var(--lagoon-deep)]"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M7.5 2.5L4 6L7.5 9.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        All topics
      </Link>

      <section className="rise-in mb-8">
        <div className="mb-2 flex items-center gap-3">
          <span
            className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${topicInfo.gradient} text-sm font-bold text-white shadow-sm`}
          >
            {topicInfo.name.charAt(0)}
          </span>
          <div>
            <h1 className="display-title text-2xl font-bold tracking-tight text-[var(--sea-ink)] sm:text-3xl">
              {topicInfo.name}
            </h1>
            <p className="text-sm text-[var(--sea-ink-soft)]">
              {total.toLocaleString()} problems · {platforms.length} platforms
            </p>
          </div>
        </div>
        {topicInfo.description && (
          <p className="mt-2 max-w-2xl text-sm text-[var(--sea-ink-soft)]">
            {topicInfo.description}
          </p>
        )}
      </section>

      <section
        className="rise-in mb-6 space-y-3"
        style={{ animationDelay: '100ms' }}
      >
        <div className="relative">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${total.toLocaleString()} problems...`}
            className="w-full rounded-xl border border-[var(--chip-line)] bg-[var(--chip-bg)] px-5 py-3 pl-11 text-sm text-[var(--sea-ink)] outline-none transition placeholder:text-[var(--sea-ink-soft)] focus:border-[var(--lagoon)] focus:ring-2 focus:ring-[rgba(79,184,178,0.2)]"
          />
          <svg
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--sea-ink-soft)]"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <circle
              cx="7"
              cy="7"
              r="5.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M11 11L14.5 14.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="rounded-lg border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-2 text-xs font-medium text-[var(--sea-ink)] outline-none transition focus:border-[var(--lagoon)]"
          >
            <option value="all">All platforms</option>
            {platforms.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          {/* Difficulty filter as multi‑select chips */}
          <div className="flex flex-wrap items-center gap-2">
            {/* "All" chip resets the filter */}
            <button
              type="button"
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${difficultyFilters.length === 0 ? 'bg-[var(--lagoon)] text-white' : 'bg-[var(--chip-bg)] text-[var(--sea-ink)]'}`}
              onClick={() => setDifficultyFilters([])}
            >
              All
            </button>
            {difficulties.map((d) => {
              const selected = difficultyFilters.includes(d)
              return (
                <button
                  key={d}
                  type="button"
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${selected ? 'bg-[var(--lagoon)] text-white' : 'bg-[var(--chip-bg)] text-[var(--sea-ink)]'}`}
                  onClick={() => {
                    setDifficultyFilters((prev) =>
                      selected ? prev.filter((v) => v !== d) : [...prev, d],
                    )
                  }}
                >
                  {d}
                </button>
              )
            })}
          </div>

          <p className="ml-auto self-center text-xs text-[var(--sea-ink-soft)]">
            {filtered.length} of {total.toLocaleString()}
          </p>
        </div>
      </section>

      <section className="rise-in" style={{ animationDelay: '200ms' }}>
        <div className="overflow-hidden rounded-2xl border border-[var(--line)]">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--line)] bg-[var(--surface-strong)]">
                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--sea-ink-soft)]">
                    Platform
                  </th>
                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--sea-ink-soft)]">
                    Problem
                  </th>
                  <th className="hidden px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--sea-ink-soft)] sm:table-cell">
                    Difficulty
                  </th>
                  <th className="hidden px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--sea-ink-soft)] md:table-cell">
                    Key Concept
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--line)]">
                {displayed.map((problem, i) => (
                  <tr
                    key={`${problem.url}-${i}`}
                    className="transition-colors hover:bg-[rgba(79,184,178,0.04)]"
                  >
                    <td className="max-w-[120px] px-4 py-3">
                      <span className="inline-block rounded-md bg-[var(--chip-bg)] px-2 py-0.5 text-[11px] font-medium text-[var(--sea-ink-soft)]">
                        {problem.platform}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={problem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-[var(--sea-ink)] no-underline transition hover:text-[var(--lagoon-deep)]"
                      >
                        {problem.name}
                      </a>
                    </td>
                    <td className="hidden px-4 py-3 sm:table-cell">
                      <DifficultyBadge difficulty={problem.difficulty} />
                    </td>
                    <td className="hidden max-w-[240px] truncate px-4 py-3 text-xs text-[var(--sea-ink-soft)] md:table-cell">
                      {problem.keyConcept}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {hasMore && (
          <div ref={sentinelRef} className="flex justify-center py-8">
            <span className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--lagoon)] border-t-transparent" />
          </div>
        )}

        {filtered.length === 0 && (
          <p className="py-12 text-center text-sm text-[var(--sea-ink-soft)]">
            No problems match your filters
          </p>
        )}

        {!hasMore && filtered.length > 0 && (
          <p className="py-4 text-center text-xs text-[var(--sea-ink-soft)]">
            Showing all {filtered.length.toLocaleString()} problems
          </p>
        )}
      </section>
    </main>
  )
}
