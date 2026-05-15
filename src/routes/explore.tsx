import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { Search } from 'lucide-react'

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    setIsMobile(mq.matches)
    const h = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [breakpoint])
  return isMobile
}
import { topics } from '#/data/topics'
import { z } from 'zod'

// ─── URL search schema ────────────────────────────────────────────────────
const searchSchema = z.object({
  q:        z.string().optional().default(''),
  topics:   z.string().optional().default(''),
  platform: z.string().optional().default('all'),
  diff:     z.enum(['tier', 'range']).optional().default('tier'),
  tiers:    z.string().optional().default(''),
  rmin:     z.number().optional().default(800),
  rmax:     z.number().optional().default(3500),
  sort:     z.enum(['name', 'difficulty', 'platform', 'topic']).optional().default('name'),
  dir:      z.enum(['asc', 'desc']).optional().default('asc'),
})

export const Route = createFileRoute('/explore')({
  validateSearch: searchSchema,
  component: ExplorePage,
})

// ─── Virtualizer ──────────────────────────────────────────────────────────
function useSimpleVirtual(count: number, itemH: number, ref: React.RefObject<HTMLDivElement>, overscan = 20) {
  const [scrollTop, setScrollTop] = useState(0)
  const [containerH, setContainerH] = useState(600)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    setContainerH(el.clientHeight)
    const ro = new ResizeObserver(() => setContainerH(el.clientHeight))
    ro.observe(el)
    const onScroll = () => setScrollTop(el.scrollTop)
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => { ro.disconnect(); el.removeEventListener('scroll', onScroll) }
  }, [ref])
  const start = Math.max(0, Math.floor(scrollTop / itemH) - overscan)
  const end   = Math.min(count - 1, Math.ceil((scrollTop + containerH) / itemH) + overscan)
  return {
    totalH: count * itemH,
    items: Array.from({ length: Math.max(0, end - start + 1) }, (_, i) => ({
      index: start + i,
      top: (start + i) * itemH,
    })),
  }
}

// ─── Types ────────────────────────────────────────────────────────────────
interface Problem {
  id: string; platform: string; name: string; url: string
  difficulty: string; keyConcept: string; topic: string; topicSlug: string
}

// ─── Difficulty helpers ───────────────────────────────────────────────────
type Tier = 'easy' | 'medium' | 'hard' | 'rating' | 'unknown'
function diffTier(d: string): Tier {
  const l = d.toLowerCase()
  if (l === 'easy'   || l === '1' || l === 'school') return 'easy'
  if (l === 'medium' || l === '2')                   return 'medium'
  if (l === 'hard'   || l === '3')                   return 'hard'
  const n = parseInt(d, 10)
  return !isNaN(n) && n >= 800 ? 'rating' : 'unknown'
}
function diffRating(d: string): number | null {
  const n = parseInt(d, 10); return !isNaN(n) && n >= 800 ? n : null
}

function DiffBadge({ d }: { d: string }) {
  const tier = diffTier(d)
  const cls =
    tier === 'easy'   ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
    tier === 'medium' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
    tier === 'hard'   ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
    tier === 'rating' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200' :
                        'bg-[var(--chip-bg)] text-[var(--sea-ink-soft)]'
  return (
    <span className={`inline-block shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${cls}`}>
      {d || '—'}
    </span>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────
function ExplorePage() {
  const search   = useSearch({ from: '/explore' })
  const navigate = useNavigate({ from: '/explore' })

  // derive state from URL
  const q           = search.q ?? ''
  const topicFilter = useMemo(() => search.topics ? search.topics.split(',').filter(Boolean) : [], [search.topics])
  const platform    = search.platform ?? 'all'
  const diffMode    = search.diff ?? 'tier'
  const tierFilter  = useMemo(() => search.tiers ? search.tiers.split(',').filter(Boolean) : [], [search.tiers])
  const rMin        = search.rmin ?? 800
  const rMax        = search.rmax ?? 3500
  const sortCol     = search.sort ?? 'name'
  const sortDir     = search.dir  ?? 'asc'

  const patch = useCallback((updates: Partial<z.infer<typeof searchSchema>>) => {
    navigate({ search: (prev) => ({ ...prev, ...updates }), replace: true })
  }, [navigate])

  // ── Data loading ─────────────────────────────────────────────────────────
  const [problems, setProblems] = useState<Problem[]>([])
  const [loadedCount, setLoadedCount] = useState(0)
  const totalTopics = topics.length

  useEffect(() => {
    const PRIORITY = ['dp', 'binary_search', 'graph', 'tree', 'string', 'bit', 'math']
    const rest  = topics.map(t => t.slug).filter(s => !PRIORITY.includes(s))
    const order = [...PRIORITY.filter(s => topics.some(t => t.slug === s)), ...rest]
    let cancelled = false
    const acc: Problem[] = []
    let loaded = 0

    async function loadOne(slug: string) {
      try {
        const res = await fetch(`/data/${slug}.json`)
        if (!res.ok) return
        const data: { problems: { platform: string; name: string; url: string; difficulty: string; keyConcept: string }[] } = await res.json()
        const topicInfo = topics.find(t => t.slug === slug)
        const mapped = (data.problems ?? []).map((p, j) => ({
          id: `${slug}-${j}`,
          platform: p.platform ?? '',
          name: p.name ?? '',
          url: p.url ?? '',
          difficulty: p.difficulty ?? '',
          keyConcept: p.keyConcept ?? '',
          topic: topicInfo?.name ?? slug,
          topicSlug: slug,
        }))
        if (!cancelled) {
          acc.push(...mapped)
          loaded++
          setProblems([...acc])
          setLoadedCount(loaded)
        }
      } catch { /* skip */ }
    }

    // first 6 parallel, rest staggered
    Promise.all(order.slice(0, 6).map(loadOne)).then(() => {
      order.slice(6).reduce((p, slug, i) =>
        p.then(() => new Promise<void>(r => setTimeout(() => { if (!cancelled) loadOne(slug).then(r) }, i * 80))),
        Promise.resolve()
      )
    })

    return () => { cancelled = true }
  }, [])

  // ── Topic counts ──────────────────────────────────────────────────────────
  const topicCounts = useMemo(() => {
    const m: Record<string, number> = {}
    for (const p of problems) m[p.topicSlug] = (m[p.topicSlug] ?? 0) + 1
    return m
  }, [problems])

  // ── Platforms ─────────────────────────────────────────────────────────────
  const platforms = useMemo(
    () => [...new Set(problems.map(p => p.platform).filter(Boolean))].sort(),
    [problems],
  )

  // ── Filter + sort ─────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let res = problems
    if (q.trim()) {
      const lq = q.toLowerCase()
      res = res.filter(p =>
        p.name.toLowerCase().includes(lq) ||
        p.keyConcept.toLowerCase().includes(lq) ||
        p.topic.toLowerCase().includes(lq) ||
        p.platform.toLowerCase().includes(lq),
      )
    }
    if (topicFilter.length)  res = res.filter(p => topicFilter.includes(p.topicSlug))
    if (platform !== 'all')  res = res.filter(p => p.platform === platform)
    if (diffMode === 'tier' && tierFilter.length)
      res = res.filter(p => tierFilter.includes(diffTier(p.difficulty)))
    if (diffMode === 'range')
      res = res.filter(p => { const r = diffRating(p.difficulty); return r !== null && r >= rMin && r <= rMax })

    return [...res].sort((a, b) => {
      let cmp = 0
      if (sortCol === 'name')       cmp = a.name.localeCompare(b.name)
      else if (sortCol === 'platform') cmp = a.platform.localeCompare(b.platform)
      else if (sortCol === 'topic')    cmp = a.topic.localeCompare(b.topic)
      else if (sortCol === 'difficulty') {
        const av = diffRating(a.difficulty) ?? (diffTier(a.difficulty) === 'easy' ? 1 : diffTier(a.difficulty) === 'medium' ? 2 : 3)
        const bv = diffRating(b.difficulty) ?? (diffTier(b.difficulty) === 'easy' ? 1 : diffTier(b.difficulty) === 'medium' ? 2 : 3)
        cmp = (av as number) - (bv as number)
      }
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [problems, q, topicFilter, platform, diffMode, tierFilter, rMin, rMax, sortCol, sortDir])

  // ── Virtualizer ───────────────────────────────────────────────────────────
  const parentRef = useRef<HTMLDivElement>(null)
  const virt = useSimpleVirtual(filtered.length, 44, parentRef)

  // ── Sort toggle ───────────────────────────────────────────────────────────
  const toggleSort = (col: typeof sortCol) => {
    if (sortCol === col) patch({ dir: sortDir === 'asc' ? 'desc' : 'asc' })
    else patch({ sort: col, dir: 'asc' })
  }
  const sortIcon = (col: typeof sortCol) =>
    sortCol !== col ? ' ↕' : sortDir === 'asc' ? ' ↑' : ' ↓'

  const loading    = loadedCount < totalTopics
  const hasFilters = q || topicFilter.length || platform !== 'all' || tierFilter.length || diffMode === 'range'

  const clearAll = () => patch({ q: '', topics: '', platform: 'all', diff: 'tier', tiers: '', rmin: 800, rmax: 3500, sort: 'name', dir: 'asc' })

  const isMobile = useIsMobile()
  const COLS = isMobile ? '2rem 1fr 5rem' : '2.5rem 1fr 8rem 8rem 6rem 10rem'

  return (
    <main className="page-wrap px-4 pb-16 pt-8 sm:pt-12">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="island-shell rise-in mb-6 rounded-2xl px-6 py-7 sm:px-10">
        <p className="island-kicker mb-1 text-xs">Problem Explorer</p>
        <h1 className="display-title mb-1 text-2xl font-bold tracking-tight text-[var(--sea-ink)] sm:text-3xl">
          {loading
            ? <><span className="tabular-nums">{problems.length.toLocaleString()}</span> problems loaded…</>
            : <><span className="text-[var(--lagoon-deep)] tabular-nums">{problems.length.toLocaleString()}</span> problems</>
          }
        </h1>
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-[var(--sea-ink-soft)]">
          <span>{totalTopics} topics</span>
          <span>{platforms.length || '…'} platforms</span>
          {loading && (
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[var(--lagoon)]" />
              Loading {loadedCount}/{totalTopics}
            </span>
          )}
          {filtered.length !== problems.length && (
            <span className="font-semibold text-[var(--lagoon-deep)]">
              {filtered.length.toLocaleString()} matching
            </span>
          )}
        </div>
        {loading && (
          <div className="mt-3 h-1 w-full max-w-xs overflow-hidden rounded-full bg-[var(--line)]">
            <div
              className="h-full rounded-full bg-[var(--lagoon)] transition-all duration-300"
              style={{ width: `${(loadedCount / totalTopics) * 100}%` }}
            />
          </div>
        )}
      </section>

      {/* ── Filters ──────────────────────────────────────────────────────── */}
      <section className="rise-in mb-3 space-y-2.5" style={{ animationDelay: '60ms' }}>

        {/* Search bar */}
        <div className="relative">
          <input
            value={q}
            onChange={e => patch({ q: e.target.value })}
            placeholder="Search by name, concept, topic, platform…"
            className="w-full rounded-xl border border-[var(--chip-line)] bg-[var(--chip-bg)] px-5 py-3 pl-11 text-sm text-[var(--sea-ink)] outline-none transition placeholder:text-[var(--sea-ink-soft)] focus:border-[var(--lagoon)] focus:ring-2 focus:ring-[rgba(79,184,178,0.2)]"
          />
          <svg className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--sea-ink-soft)]" width="15" height="15" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          {q && (
            <button onClick={() => patch({ q: '' })} className="absolute right-4 top-1/2 -translate-y-1/2 text-lg leading-none text-[var(--sea-ink-soft)] hover:text-[var(--sea-ink)]">×</button>
          )}
        </div>

        {/* Platform + difficulty mode */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={platform}
            onChange={e => patch({ platform: e.target.value })}
            className="rounded-lg border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-2 text-xs font-medium text-[var(--sea-ink)] outline-none"
          >
            <option value="all">All platforms</option>
            {platforms.map(p => <option key={p} value={p}>{p}</option>)}
          </select>

          <div className="flex overflow-hidden rounded-lg border border-[var(--chip-line)]">
            {(['tier', 'range'] as const).map(m => (
              <button key={m} onClick={() => patch({ diff: m })}
                className={`px-3 py-2 text-xs font-semibold transition-colors ${diffMode === m ? 'bg-[var(--lagoon)] text-white' : 'bg-[var(--chip-bg)] text-[var(--sea-ink-soft)]'}`}>
                {m === 'tier' ? 'Tier filter' : 'Rating range'}
              </button>
            ))}
          </div>

          {diffMode === 'tier' && (
            <div className="flex flex-wrap gap-1.5">
              {(['easy', 'medium', 'hard'] as Tier[]).filter(t => t !== 'rating' && t !== 'unknown').map(t => (
                <button key={t} onClick={() => {
                  const next = tierFilter.includes(t) ? tierFilter.filter(x => x !== t) : [...tierFilter, t]
                  patch({ tiers: next.join(',') })
                }}
                  className={`capitalize rounded-full px-3 py-1 text-xs font-bold transition-colors ${
                    tierFilter.includes(t) ? 'bg-[var(--lagoon)] text-white' : 'bg-[var(--chip-bg)] text-[var(--sea-ink)]'
                  }`}>
                  {t}
                </button>
              ))}
            </div>
          )}

          {diffMode === 'range' && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[var(--sea-ink-soft)]">Rating</span>
              <input type="range" min={800} max={3500} step={100} value={rMin}
                onChange={e => patch({ rmin: Math.min(+e.target.value, rMax - 100) })}
                className="w-24 accent-[var(--lagoon)]"/>
              <span className="w-10 text-xs font-bold text-[var(--sea-ink)]">{rMin}</span>
              <span className="text-xs text-[var(--sea-ink-soft)]">–</span>
              <input type="range" min={800} max={3500} step={100} value={rMax}
                onChange={e => patch({ rmax: Math.max(+e.target.value, rMin + 100) })}
                className="w-24 accent-[var(--lagoon)]"/>
              <span className="w-10 text-xs font-bold text-[var(--sea-ink)]">{rMax}</span>
            </div>
          )}

          {hasFilters && (
            <button onClick={clearAll}
              className="ml-auto rounded-lg border border-[var(--chip-line)] px-3 py-2 text-xs font-semibold text-[var(--sea-ink-soft)] transition hover:border-red-300 hover:text-red-500">
              Clear all ×
            </button>
          )}
        </div>

        {/* Topic chips with counts */}
        <div className="flex max-h-24 flex-wrap gap-1.5 overflow-y-auto">
          {topics.map(t => {
            const cnt = topicCounts[t.slug]
            const active = topicFilter.includes(t.slug)
            return (
              <button key={t.slug}
                onClick={() => {
                  const next = active ? topicFilter.filter(x => x !== t.slug) : [...topicFilter, t.slug]
                  patch({ topics: next.join(',') })
                }}
                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                  active
                    ? 'border-[var(--lagoon)] bg-[var(--lagoon)] text-white'
                    : 'border-[var(--chip-line)] bg-[var(--chip-bg)] text-[var(--sea-ink-soft)]'
                }`}>
                {t.name}
                {cnt != null && (
                  <span className={`rounded-full px-1 text-[10px] ${active ? 'bg-white/20' : 'bg-[var(--line)]'}`}>
                    {cnt >= 1000 ? `${(cnt/1000).toFixed(1)}k` : cnt}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        <p className="text-xs text-[var(--sea-ink-soft)]">
          <span className="font-semibold text-[var(--sea-ink)]">{filtered.length.toLocaleString()}</span> of {problems.length.toLocaleString()} problems
          {filtered.length !== problems.length && hasFilters && ' · filtered'}
        </p>
      </section>

      {/* ── Table ─────────────────────────────────────────────────────────── */}
      <section className="rise-in overflow-hidden rounded-2xl border border-[var(--line)]" style={{ animationDelay: '130ms' }}>

        {/* Sticky header */}
        <div className="sticky top-0 z-10 grid border-b border-[var(--line)] bg-[var(--surface-strong)] text-[11px] font-bold uppercase tracking-wider text-[var(--sea-ink-soft)] backdrop-blur"
          style={{ gridTemplateColumns: COLS }}>
          <div className="px-3 py-3">#</div>
          <button onClick={() => toggleSort('name')} className="px-3 py-3 text-left capitalize transition-colors hover:text-[var(--sea-ink)]">
            Problem{sortIcon('name')}
          </button>
          {!isMobile && <>
            <button onClick={() => toggleSort('topic')} className="px-3 py-3 text-left capitalize transition-colors hover:text-[var(--sea-ink)]">
              Topic{sortIcon('topic')}
            </button>
            <button onClick={() => toggleSort('platform')} className="px-3 py-3 text-left capitalize transition-colors hover:text-[var(--sea-ink)]">
              Platform{sortIcon('platform')}
            </button>
          </>}
          <button onClick={() => toggleSort('difficulty')} className="px-3 py-3 text-left capitalize transition-colors hover:text-[var(--sea-ink)]">
            Diff{sortIcon('difficulty')}
          </button>
          {!isMobile && <div className="px-3 py-3">Concept</div>}
        </div>

        {/* Virtual rows */}
        <div ref={parentRef} className="overflow-auto" style={{ height: '62vh' }}>
          {problems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-3 h-6 w-6 animate-spin rounded-full border-2 border-[var(--lagoon)] border-t-transparent" />
              <p className="text-sm text-[var(--sea-ink-soft)]">Loading problems…</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center">
              <Search size={28} className="mx-auto mb-2 opacity-30" />
              <p className="mt-2 text-sm font-medium text-[var(--sea-ink)]">No problems match</p>
              <p className="mt-1 text-xs text-[var(--sea-ink-soft)]">Try a different search or clear filters</p>
              <button onClick={clearAll} className="mt-3 rounded-lg bg-[var(--lagoon)] px-4 py-2 text-xs font-bold text-white">
                Clear filters
              </button>
            </div>
          ) : (
            <div style={{ height: virt.totalH, position: 'relative' }}>
              {virt.items.map(({ index, top }) => {
                const p = filtered[index]
                if (!p) return null
                return (
                  <div key={p.id}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', transform: `translateY(${top}px)`, height: 44, display: 'grid', gridTemplateColumns: COLS, alignItems: 'center' }}
                    className="border-b border-[var(--line)] text-sm hover:bg-[rgba(79,184,178,0.04)]">
                    <div className="px-3 text-[11px] tabular-nums text-[var(--sea-ink-soft)]">{index + 1}</div>
                    <div className="min-w-0 px-3">
                      {p.url
                        ? <a href={p.url} target="_blank" rel="noopener noreferrer"
                            className="block truncate font-medium text-[var(--sea-ink)] no-underline hover:text-[var(--lagoon-deep)]">
                            {p.name}
                          </a>
                        : <span className="block truncate font-medium text-[var(--sea-ink)]">{p.name}</span>
                      }
                    </div>
                    {!isMobile && <div className="px-3">
                      <span className="block truncate rounded-md bg-[var(--chip-bg)] px-2 py-0.5 text-[10px] font-medium text-[var(--sea-ink-soft)]">
                        {p.topic}
                      </span>
                    </div>}
                    {!isMobile && <div className="px-3">
                      <span className="block truncate rounded-md bg-[var(--chip-bg)] px-2 py-0.5 text-[10px] font-medium text-[var(--sea-ink-soft)]">
                        {p.platform}
                      </span>
                    </div>}
                    <div className="px-3"><DiffBadge d={p.difficulty} /></div>
                    {!isMobile && <div className="truncate px-3 text-[11px] text-[var(--sea-ink-soft)]">{p.keyConcept}</div>}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
