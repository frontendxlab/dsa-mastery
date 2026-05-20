import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
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
  page:     z.number().optional().default(1),
})

export const Route = createFileRoute('/explore')({
  head: () => ({
    meta: [
      { title: 'Explore Topics — DSA Mastery' },
      { name: 'description', content: 'Browse 38,000+ curated DSA problems across 14 topics. Filter by difficulty, platform, and key concepts. Track your solved progress.' },
    ],
  }),
  validateSearch: searchSchema,
  component: ExplorePage,
})

const PAGE_SIZE = 50

// ─── Types ────────────────────────────────────────────────────────────────
interface Problem {
  id: string; platform: string; name: string; url: string
  difficulty: string; keyConcept: string; topic: string; topicSlug: string
}

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

function ratingColor(r: number) {
  if (r < 1000) return '#34d399'
  if (r < 1500) return '#fbbf24'
  if (r < 2000) return '#f97316'
  return '#f87171'
}

const PLATFORM_COLORS: Record<string, string> = {
  LeetCode: '#FFA116', Codeforces: '#1F8ACB', AtCoder: '#808080',
  CSES: '#4CAF50', GeeksforGeeks: '#2F8D46', CodeChef: '#5B4638',
  HackerRank: '#00EA64', SPOJ: '#E60000', Kattis: '#F9A825', Baekjoon: '#0070C0', FrontendCore: '#6366f1',
}

// ─── Background canvas ───────────────────────────────────────────────────
function BackgroundCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W = 0, H = 0, raf = 0
    interface Node { x:number; y:number; vx:number; vy:number; r:number; phase:number }
    let nodes: Node[] = []

    function resize() {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
      nodes = []
      const count = Math.min(55, Math.floor(W * H / 16000))
      for (let i = 0; i < count; i++) nodes.push({
        x: Math.random() * W, y: Math.random() * H * 0.62,
        vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.6 + 0.6, phase: Math.random() * Math.PI * 2,
      })
    }

    function draw(ts: number) {
      ctx.clearRect(0, 0, W, H)
      const c = '59,158,255'
      const vx = W / 2, horizon = H * 0.60
      const speed = (ts * 0.000038) % 1

      for (let i = 0; i <= 18; i++) {
        const xb = (i / 18) * W
        ctx.beginPath()
        ctx.strokeStyle = `rgba(${c},${i === 9 ? 0.035 : 0.02})`
        ctx.lineWidth = 0.5
        ctx.moveTo(xb, H); ctx.lineTo(vx, horizon); ctx.stroke()
      }
      for (let j = 0; j < 18; j++) {
        const raw = (j / 18 + speed) % 1, pT = raw * raw
        const y = horizon + (H - horizon) * pT
        if (y > H + 1) continue
        const xl = vx - vx * pT, xr = vx + (W - vx) * pT
        ctx.beginPath()
        ctx.strokeStyle = `rgba(${c},${0.007 + pT * 0.038})`
        ctx.lineWidth = 0.4; ctx.moveTo(xl, y); ctx.lineTo(xr, y); ctx.stroke()
      }
      const grd = ctx.createLinearGradient(0, horizon - 30, 0, horizon + 60)
      grd.addColorStop(0, `rgba(${c},0)`); grd.addColorStop(0.5, `rgba(${c},0.03)`); grd.addColorStop(1, `rgba(${c},0)`)
      ctx.fillStyle = grd; ctx.fillRect(0, horizon - 30, W, 90)

      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy
        if (n.x < -60) n.x = W + 60; if (n.x > W + 60) n.x = -60
        if (n.y < -60) n.y = H * 0.64; if (n.y > H * 0.64) n.y = -60
      })
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < 145) {
          ctx.beginPath(); ctx.strokeStyle = `rgba(${c},${(1 - d / 145) * 0.072})`
          ctx.lineWidth = 0.55; ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke()
        }
      }
      nodes.forEach(n => {
        const p2 = 0.68 + 0.32 * Math.sin(ts * 0.0009 + n.phase)
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r * p2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${c},${0.28 * p2})`; ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }

    resize()
    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={ref} style={{ position:'fixed', top:0, left:0, width:'100%', height:'100%', zIndex:0, pointerEvents:'none' }} />
}

// ─── Stat card ───────────────────────────────────────────────────────────
function StatCard({ value, label }: { value: string | number; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState<React.CSSProperties | null>(null)

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2
    setTilt({ transform: `perspective(400px) rotateX(${-y * 5}deg) rotateY(${x * 3}deg) translateY(-5px) translateZ(10px)`, boxShadow: '0 20px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(59,158,255,0.22), 0 0 28px rgba(59,158,255,0.10)', borderColor: 'rgba(59,158,255,0.22)' })
  }, [])
  const onLeave = useCallback(() => setTilt(null), [])

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ ...tilt, transition: tilt ? 'none' : 'transform .28s cubic-bezier(0.23,1,0.32,1), box-shadow .28s ease, border-color .28s ease' }}
      className="ex-stat-card"
      data-focusable="card"
    >
      <div className="ex-stat-value">{typeof value === 'number' ? value.toLocaleString() : value}</div>
      <div className="ex-stat-label">{label}</div>
    </div>
  )
}

// ─── Problem row with 3D tilt ────────────────────────────────────────────
function ProbRow({ p, idx }: { p: Problem; idx: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState<React.CSSProperties | null>(null)
  const tier = diffTier(p.difficulty)
  const rating = diffRating(p.difficulty)
  const rPct = rating ? Math.round(((rating - 800) / (3500 - 800)) * 100) : 0
  const platColor = PLATFORM_COLORS[p.platform] ?? '#888'

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2
    setTilt({ transform: `perspective(650px) rotateX(${-y * 3.5}deg) rotateY(${x * 2}deg) translateZ(10px) scale(1.004)`, boxShadow: `${-x * 8}px ${5 + y * 3}px 22px rgba(0,0,0,0.38), 0 0 0 1px rgba(59,158,255,0.20)` })
  }, [])
  const onLeave = useCallback(() => setTilt(null), [])

  const diffCls = tier === 'easy' ? 'ex-diff-easy' : tier === 'medium' ? 'ex-diff-med' : tier === 'hard' ? 'ex-diff-hard' : 'ex-diff-rating'

  return (
    <div
      ref={ref}
      className="ex-row"
      style={tilt ?? undefined}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="ex-cell ex-cell-num">{idx + 1}</div>
      <div className="ex-cell ex-cell-name">
        {p.url
          ? <a href={p.url} target="_blank" rel="noopener noreferrer" className="ex-prob-name">{p.name}</a>
          : <span className="ex-prob-name">{p.name}</span>
        }
        {p.keyConcept && <div className="ex-prob-tag">{p.keyConcept.slice(0, 40)}</div>}
      </div>
      <div className="ex-cell">
        <span className="ex-plat-badge" style={{ background: `${platColor}18`, color: platColor }}>{p.platform}</span>
      </div>
      <div className="ex-cell">
        <span className={`ex-diff-badge ${diffCls}`}>
          {(rating ?? p.difficulty) || '—'}
        </span>
      </div>
      {rating ? (
        <div className="ex-cell ex-cell-rating">
          <span className="ex-rating-num" style={{ color: ratingColor(rating) }}>{rating}</span>
          <div className="ex-rating-track"><div className="ex-rating-fill" style={{ width: `${rPct}%`, background: ratingColor(rating) }} /></div>
        </div>
      ) : <div className="ex-cell" />}
      <div className="ex-cell ex-cell-topic">{p.topic}</div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────
function ExplorePage() {
  const search   = useSearch({ from: '/explore' })
  const navigate = useNavigate({ from: '/explore' })

  const q           = search.q ?? ''
  const topicFilter = useMemo(() => search.topics ? search.topics.split(',').filter(Boolean) : [], [search.topics])
  const platform    = search.platform ?? 'all'
  const diffMode    = search.diff ?? 'tier'
  const tierFilter  = useMemo(() => search.tiers ? search.tiers.split(',').filter(Boolean) : [], [search.tiers])
  const rMin        = search.rmin ?? 800
  const rMax        = search.rmax ?? 3500
  const sortCol     = search.sort ?? 'name'
  const sortDir     = search.dir  ?? 'asc'
  const page        = search.page ?? 1

  const patch = useCallback((updates: Partial<z.infer<typeof searchSchema>>) => {
    navigate({ search: (prev) => ({ ...prev, ...updates }), replace: true })
  }, [navigate])

  // ── Data loading (single deduplicated source) ──────────────────────────
  const [problems, setProblems] = useState<Problem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetch('/data/all-problems.json')
      .then(res => res.json())
      .then(data => {
        if (cancelled) return
        const mapped: Problem[] = (data.problems ?? []).map((p: any, j: number) => {
          const topicInfo = topics.find(t => t.slug === p.topic_slug)
          return {
            id: p.id ?? `${p.topic_slug}-${j}`,
            platform: p.platform ?? '',
            name: p.name ?? '',
            url: p.url ?? '',
            difficulty: p.difficulty ?? '',
            keyConcept: p.keyConcept ?? '',
            topic: topicInfo?.name ?? p.topic_slug,
            topicSlug: p.topic_slug,
          }
        })
        setProblems(mapped)
        setLoading(false)
      })
      .catch(() => setLoading(false))
    return () => { cancelled = true }
  }, [])

  const platforms = useMemo(() => [...new Set(problems.map(p => p.platform).filter(Boolean))].sort(), [problems])

  const filtered = useMemo(() => {
    let res = problems
    if (q.trim()) {
      const lq = q.toLowerCase()
      res = res.filter(p => p.name.toLowerCase().includes(lq) || p.keyConcept.toLowerCase().includes(lq) || p.topic.toLowerCase().includes(lq) || p.platform.toLowerCase().includes(lq))
    }
    if (topicFilter.length) res = res.filter(p => topicFilter.includes(p.topicSlug))
    if (platform !== 'all') res = res.filter(p => p.platform === platform)
    if (diffMode === 'tier' && tierFilter.length) res = res.filter(p => tierFilter.includes(diffTier(p.difficulty)))
    if (diffMode === 'range') res = res.filter(p => { const r = diffRating(p.difficulty); return r !== null && r >= rMin && r <= rMax })

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

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageData   = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const toggleSort = (col: typeof sortCol) => {
    if (sortCol === col) patch({ dir: sortDir === 'asc' ? 'desc' : 'asc', page: 1 })
    else patch({ sort: col, dir: 'asc', page: 1 })
  }

  const clearAll = () => patch({ q: '', topics: '', platform: 'all', diff: 'tier', tiers: '', rmin: 800, rmax: 3500, sort: 'name', dir: 'asc', page: 1 })

  const activePills = [
    platform !== 'all' && { label: platform, clear: () => patch({ platform: 'all', page: 1 }) },
    tierFilter.length  && { label: tierFilter.join(', '), clear: () => patch({ tiers: '', page: 1 }) },
    topicFilter.length && { label: topicFilter.join(', '), clear: () => patch({ topics: '', page: 1 }) },
    diffMode === 'range' && { label: `Rating ${rMin}–${rMax}`, clear: () => patch({ diff: 'tier', rmin: 800, rmax: 3500, page: 1 }) },
  ].filter(Boolean) as { label: string; clear: () => void }[]

  const SortHdr = ({ label, col }: { label: string; col: typeof sortCol }) => (
    <div className={`ex-hdr-cell${sortCol === col ? ' ex-sort-active' : ''}`} onClick={() => toggleSort(col)}>
      {label}
      <span className="ex-sort-icon" style={{ transform: sortCol === col && sortDir === 'desc' ? 'rotate(180deg)' : undefined }}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="18 15 12 9 6 15"/></svg>
      </span>
    </div>
  )

  // page numbers to show
  const pageNums = useMemo(() => {
    const nums: number[] = []
    if (totalPages <= 7) { for (let i = 1; i <= totalPages; i++) nums.push(i) }
    else {
      nums.push(1)
      if (page > 3) nums.push(-1)
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) nums.push(i)
      if (page < totalPages - 2) nums.push(-1)
      nums.push(totalPages)
    }
    return nums
  }, [page, totalPages])

  return (
    <>
      {/* animated background — client only */}
      {typeof window !== 'undefined' && <BackgroundCanvas />}
      <div className="ex-orb ex-orb-1" />
      <div className="ex-orb ex-orb-2" />
      <div className="ex-orb ex-orb-3" />

      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80, paddingBottom: 80 }}>
        <div className="ex-w">

          {/* ── Page header ─────────────────────────────────────── */}
          <div className="ex-page-header">
            <div className="ex-eyebrow">Problem Explorer</div>
            <h1 className="ex-title">Explore 38,000+ DSA Problems</h1>
            <h2 className="ex-subtitle">Browse curated problems from 25+ platforms including LeetCode, Codeforces, AtCoder, and CSES. Filter by topic, difficulty, and platform to find the perfect practice problem. Track your solved progress across all platforms.</h2>
            <h1 className="ex-title">
              Explore <span className="ex-title-accent">
                {`${problems.length.toLocaleString()}`}
              </span> Problems
            </h1>
            <p className="ex-subtitle">Every DSA problem in one place. Filter, sort, find patterns.</p>
            <div className="ex-stat-cards">
              <StatCard value={problems.length || '38,000+'} label="Total problems" />
              <StatCard value={topics.length} label="Topics" />
              <StatCard value={platforms.length || '50+'} label="Platforms" />
              <StatCard value={filtered.length} label="Matching" />
              {loading && <StatCard value={''} label="Loading…" />}
            </div>
          </div>

          {/* ── Filter bar ──────────────────────────────────────── */}
          <div className="ex-filter-bar">
            {/* Search */}
            <div className="ex-search-wrap">
              <span className="ex-search-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </span>
              <input
                className="ex-search-input"
                placeholder="Search problems, concepts, topics…"
                value={q}
                onChange={e => patch({ q: e.target.value, page: 1 })}
                aria-label="Search problems"
              />
              {q && <button className="ex-search-clear" onClick={() => patch({ q: '', page: 1 })}>✕</button>}
            </div>

            {/* Platform */}
            <select
              className="ex-filter-select"
              value={platform}
              onChange={e => patch({ platform: e.target.value, page: 1 })}
              aria-label="Filter by platform"
            >
              <option value="all">All platforms</option>
              {platforms.map(p => <option key={p} value={p}>{p}</option>)}
            </select>

            {/* Difficulty tier buttons */}
            <div className="ex-tier-btns">
              {(['easy', 'medium', 'hard'] as const).map(t => (
                <button
                  key={t}
                  className={`ex-tier-btn ex-tier-${t}${tierFilter.includes(t) ? ' active' : ''}`}
                  onClick={() => {
                    const next = tierFilter.includes(t) ? tierFilter.filter(x => x !== t) : [...tierFilter, t]
                    patch({ tiers: next.join(','), diff: 'tier', page: 1 })
                  }}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>

            {/* Topic filter */}
            <select
              className="ex-filter-select"
              value={topicFilter[0] ?? ''}
              onChange={e => patch({ topics: e.target.value, page: 1 })}
              aria-label="Filter by topic"
            >
              <option value="">All topics</option>
              {topics.map(t => <option key={t.slug} value={t.slug}>{t.name}</option>)}
            </select>

            {/* Rating range */}
            <div className="ex-rating-range">
              <span className="ex-rating-label">Rating</span>
              <span className="ex-rating-val">{rMin}</span>
              <input type="range" className="ex-range-input" min={800} max={3500} step={100} value={rMin}
                onChange={e => { const v = +e.target.value; if (v < rMax) patch({ rmin: v, diff: 'range', page: 1 }) }}
                aria-label="Minimum rating"
              />
              <input type="range" className="ex-range-input" min={800} max={3500} step={100} value={rMax}
                onChange={e => { const v = +e.target.value; if (v > rMin) patch({ rmax: v, diff: 'range', page: 1 }) }}
                aria-label="Maximum rating"
              />
              <span className="ex-rating-val">{rMax}</span>
            </div>
          </div>

          {/* ── Active pills ────────────────────────────────────── */}
          {activePills.length > 0 && (
            <div className="ex-pills">
              <span className="ex-pills-label">Active filters:</span>
              {activePills.map((p, i) => (
                <span key={i} className="ex-pill">
                  {p.label}
                  <span className="ex-pill-x" onClick={p.clear} role="button" aria-label={`Remove ${p.label} filter`}>✕</span>
                </span>
              ))}
              <button className="ex-clear-btn" onClick={clearAll}>Clear all</button>
            </div>
          )}

          {/* ── Toolbar ─────────────────────────────────────────── */}
          <div className="ex-toolbar">
            <span className="ex-result-count">
              <strong>{filtered.length.toLocaleString()}</strong> problems
              {loading && <span className="ex-loading-dot" />}
            </span>
            <span className="ex-page-info">
              Page {page} of {totalPages}
            </span>
          </div>

          {/* ── Table ───────────────────────────────────────────── */}
          <div className="ex-table-wrap">
            <div className="ex-scanline" />

            {/* Header */}
            <div className="ex-header">
              <div className="ex-hdr-cell ex-hdr-num">#</div>
              <SortHdr label="Problem" col="name" />
              <SortHdr label="Platform" col="platform" />
              <SortHdr label="Difficulty" col="difficulty" />
              <div className="ex-hdr-cell">Rating</div>
              <SortHdr label="Topic" col="topic" />
            </div>

            {/* Rows */}
            <div className="ex-body">
              {pageData.map((p, i) => (
                <ProbRow key={p.id} p={p} idx={(page - 1) * PAGE_SIZE + i} />
              ))}
              {pageData.length === 0 && (
                <div className="ex-empty">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity={0.3}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <p>No problems match your filters.</p>
                  <button className="ex-clear-link" onClick={clearAll}>Clear filters</button>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="ex-pagination">
              <span className="ex-page-range">
                {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length.toLocaleString()}
              </span>
              <div className="ex-page-btns">
                <button className="ex-page-btn" disabled={page <= 1} onClick={() => patch({ page: page - 1 })}>←</button>
                {pageNums.map((n, i) =>
                  n === -1
                    ? <span key={`e${i}`} className="ex-page-ellipsis">…</span>
                    : <button key={n} className={`ex-page-btn${page === n ? ' ex-page-current' : ''}`} onClick={() => patch({ page: n })}>{n}</button>
                )}
                <button className="ex-page-btn" disabled={page >= totalPages} onClick={() => patch({ page: page + 1 })}>→</button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  )
}
