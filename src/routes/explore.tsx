import { createFileRoute } from '@tanstack/react-router'
import { useState, useMemo, useEffect, useRef, useCallback } from 'react'

// Simple fixed-height virtualizer — no external deps, no react-dom CJS issues
function useSimpleVirtual(count: number, itemHeight: number, parentRef: React.RefObject<HTMLDivElement>, overscan = 20) {
  const [scrollTop, setScrollTop] = useState(0)
  const [containerH, setContainerH] = useState(600)
  useEffect(() => {
    const el = parentRef.current
    if (!el) return
    setContainerH(el.clientHeight)
    const ro = new ResizeObserver(() => setContainerH(el.clientHeight))
    ro.observe(el)
    const onScroll = () => setScrollTop(el.scrollTop)
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => { ro.disconnect(); el.removeEventListener('scroll', onScroll) }
  }, [parentRef])
  const startIdx = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
  const endIdx = Math.min(count - 1, Math.ceil((scrollTop + containerH) / itemHeight) + overscan)
  const virtualItems = Array.from({ length: Math.max(0, endIdx - startIdx + 1) }, (_, i) => ({
    index: startIdx + i,
    start: (startIdx + i) * itemHeight,
  }))
  return { getTotalSize: () => count * itemHeight, getVirtualItems: () => virtualItems }
}
import { topics } from '#/data/topics'

export const Route = createFileRoute('/explore')({ component: ExplorePage })

// ─── Types ────────────────────────────────────────────────────────────────

interface Problem {
  id: string
  platform: string
  category: string
  name: string
  url: string
  difficulty: string
  keyConcept: string
  topic: string
  topicSlug: string
}

// ─── Difficulty helpers ───────────────────────────────────────────────────

function diffTier(d: string): 'easy' | 'medium' | 'hard' | 'rating' | 'unknown' {
  const l = d.toLowerCase()
  if (l === 'easy' || l === '1' || l === 'school') return 'easy'
  if (l === 'medium' || l === '2') return 'medium'
  if (l === 'hard' || l === '3') return 'hard'
  const n = parseInt(d, 10)
  if (!isNaN(n) && n >= 800) return 'rating'
  return 'unknown'
}

function diffRating(d: string): number | null {
  const n = parseInt(d, 10)
  return !isNaN(n) && n >= 800 ? n : null
}

function DiffBadge({ d }: { d: string }) {
  const tier = diffTier(d)
  const cls =
    tier === 'easy'    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
    tier === 'medium'  ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
    tier === 'hard'    ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
    tier === 'rating'  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200' :
    'bg-[var(--chip-bg)] text-[var(--sea-ink-soft)]'
  return (
    <span className={`inline-block shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${cls}`}>
      {d || '—'}
    </span>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────

function ExplorePage() {
  const [problems, setProblems] = useState<Problem[]>([])
  const [loadedTopics, setLoadedTopics] = useState(0)
  const [search, setSearch] = useState('')
  const [topicFilter, setTopicFilter] = useState<string[]>([])
  const [platformFilter, setPlatformFilter] = useState('all')
  const [diffMode, setDiffMode] = useState<'tier' | 'range'>('tier')
  const [tierFilter, setTierFilter] = useState<string[]>([]) // 'easy','medium','hard'
  const [ratingMin, setRatingMin] = useState(800)
  const [ratingMax, setRatingMax] = useState(3500)
  const [sortCol, setSortCol] = useState<'name' | 'difficulty' | 'platform' | 'topic'>('name')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  // ── Load all topics progressively ──────────────────────────────────────
  useEffect(() => {
    const PRIORITY = ['dp', 'binary_search', 'graph', 'tree', 'string', 'bit']
    const rest = topics.map(t => t.slug).filter(s => !PRIORITY.includes(s))
    const order = [...PRIORITY, ...rest]

    let cancelled = false
    const acc: Problem[] = []

    const loadNext = async (i: number) => {
      if (cancelled || i >= order.length) return
      const slug = order[i]
      try {
        const res = await fetch(`/data/${slug}.json`)
        if (!res.ok) { loadNext(i + 1); return }
        const data: { problems: { platform: string; name: string; url: string; difficulty: string; keyConcept: string }[] } = await res.json()
        const topicInfo = topics.find(t => t.slug === slug)
        const mapped = (data.problems ?? []).map((p, j) => ({
          id: `${slug}-${j}`,
          platform: p.platform ?? '',
          category: '',
          name: p.name ?? '',
          url: p.url ?? '',
          difficulty: p.difficulty ?? '',
          keyConcept: p.keyConcept ?? '',
          topic: topicInfo?.name ?? slug,
          topicSlug: slug,
        }))
        if (!cancelled) {
          acc.push(...mapped)
          setProblems([...acc])
          setLoadedTopics(i + 1)
        }
      } catch { /* skip */ }
      loadNext(i + 1)
    }

    // Load first 6 in parallel, then chain the rest
    const PARALLEL = 6
    for (let i = 0; i < Math.min(PARALLEL, order.length); i++) loadNext(i)
    // remaining chain from first batch
    for (let i = PARALLEL; i < order.length; i++) {
      setTimeout(() => { if (!cancelled) loadNext(i) }, (i - PARALLEL + 1) * 120)
    }

    return () => { cancelled = true }
  }, [])

  // ── Platform list ───────────────────────────────────────────────────────
  const platforms = useMemo(
    () => [...new Set(problems.map(p => p.platform).filter(Boolean))].sort(),
    [problems],
  )

  // ── Filtered + sorted ───────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let res = problems

    if (search.trim()) {
      const q = search.toLowerCase()
      res = res.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.keyConcept.toLowerCase().includes(q) ||
        p.topic.toLowerCase().includes(q) ||
        p.platform.toLowerCase().includes(q),
      )
    }

    if (topicFilter.length > 0)
      res = res.filter(p => topicFilter.includes(p.topicSlug))

    if (platformFilter !== 'all')
      res = res.filter(p => p.platform === platformFilter)

    if (diffMode === 'tier' && tierFilter.length > 0)
      res = res.filter(p => tierFilter.includes(diffTier(p.difficulty)))

    if (diffMode === 'range') {
      res = res.filter(p => {
        const r = diffRating(p.difficulty)
        if (r === null) return false
        return r >= ratingMin && r <= ratingMax
      })
    }

    return [...res].sort((a, b) => {
      let cmp = 0
      if (sortCol === 'name') cmp = a.name.localeCompare(b.name)
      else if (sortCol === 'platform') cmp = a.platform.localeCompare(b.platform)
      else if (sortCol === 'topic') cmp = a.topic.localeCompare(b.topic)
      else if (sortCol === 'difficulty') {
        const ar = diffRating(a.difficulty) ?? (diffTier(a.difficulty) === 'easy' ? 1 : diffTier(a.difficulty) === 'medium' ? 2 : 3)
        const br = diffRating(b.difficulty) ?? (diffTier(b.difficulty) === 'easy' ? 1 : diffTier(b.difficulty) === 'medium' ? 2 : 3)
        cmp = (ar as number) - (br as number)
      }
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [problems, search, topicFilter, platformFilter, diffMode, tierFilter, ratingMin, ratingMax, sortCol, sortDir])

  // ── Virtualizer ─────────────────────────────────────────────────────────
  const parentRef = useRef<HTMLDivElement>(null)
  const virtualizer = useSimpleVirtual(filtered.length, 44, parentRef)

  // ── Sort toggle ─────────────────────────────────────────────────────────
  const toggleSort = useCallback((col: typeof sortCol) => {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortCol(col); setSortDir('asc') }
  }, [sortCol])

  const sortIcon = (col: typeof sortCol) =>
    sortCol !== col ? ' ↕' : sortDir === 'asc' ? ' ↑' : ' ↓'

  const loading = loadedTopics < topics.length

  return (
    <main className="page-wrap px-4 pb-16 pt-8 sm:pt-12">

      {/* Hero */}
      <section className="island-shell rise-in mb-8 rounded-2xl px-6 py-8 sm:px-10">
        <p className="island-kicker mb-2">Problem Explorer</p>
        <h1 className="display-title mb-1 text-2xl font-bold tracking-tight text-[var(--sea-ink)] sm:text-3xl">
          All <span className="text-[var(--lagoon-deep)] tabular-nums">
            {problems.length.toLocaleString()}
          </span> problems
        </h1>
        <p className="text-sm text-[var(--sea-ink-soft)]">
          {loading ? `Loading… ${loadedTopics}/${topics.length} topics` : `${topics.length} topics · fully loaded`}
          {' · '}{filtered.length.toLocaleString()} matching
        </p>
        {loading && (
          <div className="mt-3 h-1.5 w-full max-w-xs rounded-full bg-[var(--line)] overflow-hidden">
            <div
              className="h-full rounded-full bg-[var(--lagoon)] transition-all duration-300"
              style={{ width: `${(loadedTopics / topics.length) * 100}%` }}
            />
          </div>
        )}
      </section>

      {/* Filters */}
      <section className="rise-in mb-4 space-y-3" style={{ animationDelay: '80ms' }}>
        {/* Search */}
        <div className="relative">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search problems, concepts, topics…"
            className="w-full rounded-xl border border-[var(--chip-line)] bg-[var(--chip-bg)] px-5 py-3 pl-11 text-sm text-[var(--sea-ink)] outline-none transition placeholder:text-[var(--sea-ink-soft)] focus:border-[var(--lagoon)] focus:ring-2 focus:ring-[rgba(79,184,178,0.2)]"
          />
          <svg className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--sea-ink-soft)]" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--sea-ink-soft)] hover:text-[var(--sea-ink)] font-bold text-lg leading-none">×</button>
          )}
        </div>

        {/* Row 2: platform + difficulty mode toggle */}
        <div className="flex flex-wrap gap-2 items-center">
          <select
            value={platformFilter}
            onChange={e => setPlatformFilter(e.target.value)}
            className="rounded-lg border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-2 text-xs font-medium text-[var(--sea-ink)] outline-none"
          >
            <option value="all">All platforms</option>
            {platforms.map(p => <option key={p} value={p}>{p}</option>)}
          </select>

          <div className="flex rounded-lg border border-[var(--chip-line)] overflow-hidden">
            {(['tier', 'range'] as const).map(m => (
              <button
                key={m}
                onClick={() => setDiffMode(m)}
                className={`px-3 py-2 text-xs font-semibold transition-colors ${diffMode === m ? 'bg-[var(--lagoon)] text-white' : 'bg-[var(--chip-bg)] text-[var(--sea-ink-soft)]'}`}
              >
                {m === 'tier' ? 'Tier filter' : 'Rating range'}
              </button>
            ))}
          </div>

          {diffMode === 'tier' && (
            <div className="flex gap-1.5 flex-wrap">
              {(['easy', 'medium', 'hard'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTierFilter(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])}
                  className={`rounded-full px-3 py-1 text-xs font-bold transition-colors capitalize ${tierFilter.includes(t) ? 'bg-[var(--lagoon)] text-white' : 'bg-[var(--chip-bg)] text-[var(--sea-ink)]'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          )}

          {diffMode === 'range' && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-[var(--sea-ink-soft)]">Rating</span>
              <input
                type="range" min={800} max={3500} step={100}
                value={ratingMin}
                onChange={e => setRatingMin(Math.min(+e.target.value, ratingMax - 100))}
                className="w-24 accent-[var(--lagoon)]"
              />
              <span className="text-xs font-bold text-[var(--sea-ink)] w-10">{ratingMin}</span>
              <span className="text-xs text-[var(--sea-ink-soft)]">–</span>
              <input
                type="range" min={800} max={3500} step={100}
                value={ratingMax}
                onChange={e => setRatingMax(Math.max(+e.target.value, ratingMin + 100))}
                className="w-24 accent-[var(--lagoon)]"
              />
              <span className="text-xs font-bold text-[var(--sea-ink)] w-10">{ratingMax}</span>
            </div>
          )}
        </div>

        {/* Topic chips */}
        <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
          {topics.map(t => (
            <button
              key={t.slug}
              onClick={() => setTopicFilter(prev =>
                prev.includes(t.slug) ? prev.filter(x => x !== t.slug) : [...prev, t.slug]
              )}
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${topicFilter.includes(t.slug) ? 'bg-[var(--lagoon)] text-white' : 'bg-[var(--chip-bg)] text-[var(--sea-ink-soft)] border border-[var(--chip-line)]'}`}
            >
              {t.name} {topicFilter.includes(t.slug) ? '×' : ''}
            </button>
          ))}
          {topicFilter.length > 0 && (
            <button onClick={() => setTopicFilter([])} className="text-xs text-[var(--sea-ink-soft)] underline px-1">
              clear
            </button>
          )}
        </div>

        <p className="text-xs text-[var(--sea-ink-soft)]">
          {filtered.length.toLocaleString()} of {problems.length.toLocaleString()} problems
        </p>
      </section>

      {/* Virtual Table */}
      <section className="rise-in rounded-2xl border border-[var(--line)] overflow-hidden" style={{ animationDelay: '160ms' }}>
        {/* Header */}
        <div className="grid text-[11px] font-bold uppercase tracking-wider text-[var(--sea-ink-soft)] bg-[var(--surface-strong)] border-b border-[var(--line)]"
          style={{ gridTemplateColumns: '2rem 1fr 7rem 7rem 6rem 8rem' }}>
          <div className="px-3 py-3">#</div>
          <button onClick={() => toggleSort('name')} className="px-3 py-3 text-left hover:text-[var(--sea-ink)] transition-colors">
            Problem{sortIcon('name')}
          </button>
          <button onClick={() => toggleSort('topic')} className="px-3 py-3 text-left hover:text-[var(--sea-ink)] transition-colors">
            Topic{sortIcon('topic')}
          </button>
          <button onClick={() => toggleSort('platform')} className="px-3 py-3 text-left hover:text-[var(--sea-ink)] transition-colors">
            Platform{sortIcon('platform')}
          </button>
          <button onClick={() => toggleSort('difficulty')} className="px-3 py-3 text-left hover:text-[var(--sea-ink)] transition-colors">
            Difficulty{sortIcon('difficulty')}
          </button>
          <div className="px-3 py-3">Concept</div>
        </div>

        {/* Virtualised rows */}
        <div
          ref={parentRef}
          className="overflow-auto"
          style={{ height: '65vh' }}
        >
          <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
            {virtualizer.getVirtualItems().map(vItem => {
              const p = filtered[vItem.index]
              if (!p) return null
              return (
                <div
                  key={p.id}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', transform: `translateY(${vItem.start}px)` }}
                >
                  <div
                    className="grid border-b border-[var(--line)] text-sm transition-colors hover:bg-[rgba(79,184,178,0.05)]"
                    style={{ gridTemplateColumns: '2rem 1fr 7rem 7rem 6rem 8rem' }}
                  >
                    <div className="px-3 py-2.5 text-xs text-[var(--sea-ink-soft)] tabular-nums">{vItem.index + 1}</div>
                    <div className="px-3 py-2.5 min-w-0">
                      {p.url ? (
                        <a href={p.url} target="_blank" rel="noopener noreferrer"
                          className="font-medium text-[var(--sea-ink)] no-underline hover:text-[var(--lagoon-deep)] line-clamp-1">
                          {p.name}
                        </a>
                      ) : (
                        <span className="font-medium text-[var(--sea-ink)] line-clamp-1">{p.name}</span>
                      )}
                    </div>
                    <div className="px-3 py-2.5">
                      <span className="inline-block rounded-md bg-[var(--chip-bg)] px-2 py-0.5 text-[10px] font-medium text-[var(--sea-ink-soft)] truncate max-w-full">
                        {p.topic}
                      </span>
                    </div>
                    <div className="px-3 py-2.5">
                      <span className="inline-block rounded-md bg-[var(--chip-bg)] px-2 py-0.5 text-[10px] font-medium text-[var(--sea-ink-soft)] truncate max-w-full">
                        {p.platform}
                      </span>
                    </div>
                    <div className="px-3 py-2.5">
                      <DiffBadge d={p.difficulty} />
                    </div>
                    <div className="px-3 py-2.5 text-xs text-[var(--sea-ink-soft)] truncate">
                      {p.keyConcept}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {filtered.length === 0 && problems.length > 0 && (
          <p className="py-12 text-center text-sm text-[var(--sea-ink-soft)]">No problems match your filters</p>
        )}
        {problems.length === 0 && (
          <div className="py-12 text-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--lagoon)] border-t-transparent mx-auto mb-3" />
            <p className="text-sm text-[var(--sea-ink-soft)]">Loading problems…</p>
          </div>
        )}
      </section>
    </main>
  )
}
