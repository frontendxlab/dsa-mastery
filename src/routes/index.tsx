import { Link, createFileRoute } from "@tanstack/react-router";
import { topics, totalProblems, uniquePlatforms } from "#/data/topics";
import { articles } from "#/data/articles";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({ component: HomePage });

// ── Color palette ──────────────────────────────────────────────────────────────
const TOPIC_COLORS: Record<string, string> = {
  math: '#7c3aed', dp: '#0891b2', binary_search: '#2563eb', string: '#ea580c',
  bit: '#ca8a04', tree: '#16a34a', graph: '#0d9488', linked_list: '#db2777',
  advanced_tree: '#6d28d9', sliding_window: '#d97706', heap: '#dc2626',
  shape: '#64748b', backtrack: '#65a30d', trie: '#0284c7',
  sequences: '#9333ea', greedy: '#b45309', combinatorics: '#0f766e',
  game_theory: '#7c3aed', geometry: '#be123c', num_methods: '#1d4ed8',
  miscellaneous: '#475569', linear_algebra: '#6d28d9', scheduling: '#0369a1',
}

const PLATFORMS = ['LeetCode','Codeforces','AtCoder','GeeksforGeeks','CSES','Baekjoon','SPOJ','UVa','HackerRank','CodeChef','Kattis','TopCoder']

const FEATURES = [
  { icon: '⌕', label: 'Explore Problems',   desc: '38,000+ problems across 50+ platforms. Filter by difficulty, platform, topic, and rating range.' },
  { icon: '◈', label: 'Learn Patterns',      desc: `${articles.length} chapters of pattern-based learning. Brute force first, then the insight, then optimal.` },
  { icon: '▦', label: 'Curated Collections', desc: '14 core topics: DP, Graphs, Trees, Binary Search, Sliding Window, and more. Practice systematically.' },
  { icon: '⚡', label: 'Instant Search',      desc: 'Full-text search across problem names, concepts, topics, and platforms. Find what you need instantly.' },
  { icon: '◎', label: 'Track Progress',      desc: 'Mark problems as solved, track per-topic completion. Personal collections — no account needed.' },
  { icon: '✓', label: 'Deduplicated',        desc: 'Every problem carefully deduplicated across platforms. No more solving the same problem twice.' },
]

// ── Floating SVG shape components ─────────────────────────────────────────────
function TreeSVG() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" className="dl" style={{'--dur':'3.2s','--del':'0s'} as React.CSSProperties}>
      <circle cx="36" cy="12" r="6" stroke="#3b9eff" strokeWidth="1.5" className="dl-path"/>
      <circle cx="18" cy="36" r="6" stroke="#3b9eff" strokeWidth="1.5" className="dl-path"/>
      <circle cx="54" cy="36" r="6" stroke="#3b9eff" strokeWidth="1.5" className="dl-path"/>
      <circle cx="9" cy="58" r="5" stroke="#3b9eff" strokeWidth="1.5" className="dl-path"/>
      <circle cx="27" cy="58" r="5" stroke="#3b9eff" strokeWidth="1.5" className="dl-path"/>
      <circle cx="45" cy="58" r="5" stroke="#3b9eff" strokeWidth="1.5" className="dl-path"/>
      <circle cx="63" cy="58" r="5" stroke="#3b9eff" strokeWidth="1.5" className="dl-path"/>
      <line x1="36" y1="18" x2="18" y2="30" stroke="#3b9eff" strokeWidth="1.2" opacity=".5"/>
      <line x1="36" y1="18" x2="54" y2="30" stroke="#3b9eff" strokeWidth="1.2" opacity=".5"/>
      <line x1="18" y1="42" x2="9" y2="53" stroke="#3b9eff" strokeWidth="1.2" opacity=".5"/>
      <line x1="18" y1="42" x2="27" y2="53" stroke="#3b9eff" strokeWidth="1.2" opacity=".5"/>
      <line x1="54" y1="42" x2="45" y2="53" stroke="#3b9eff" strokeWidth="1.2" opacity=".5"/>
      <line x1="54" y1="42" x2="63" y2="53" stroke="#3b9eff" strokeWidth="1.2" opacity=".5"/>
    </svg>
  )
}

function GraphSVG() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" className="dl" style={{'--dur':'4s','--del':'0.4s'} as React.CSSProperties}>
      <circle cx="36" cy="36" r="6" stroke="#6d28d9" strokeWidth="1.5" className="dl-path"/>
      <circle cx="12" cy="20" r="5" stroke="#6d28d9" strokeWidth="1.5" className="dl-path"/>
      <circle cx="60" cy="20" r="5" stroke="#6d28d9" strokeWidth="1.5" className="dl-path"/>
      <circle cx="12" cy="52" r="5" stroke="#6d28d9" strokeWidth="1.5" className="dl-path"/>
      <circle cx="60" cy="52" r="5" stroke="#6d28d9" strokeWidth="1.5" className="dl-path"/>
      <line x1="36" y1="30" x2="12" y2="25" stroke="#6d28d9" strokeWidth="1.2" opacity=".5"/>
      <line x1="36" y1="30" x2="60" y2="25" stroke="#6d28d9" strokeWidth="1.2" opacity=".5"/>
      <line x1="36" y1="42" x2="12" y2="47" stroke="#6d28d9" strokeWidth="1.2" opacity=".5"/>
      <line x1="36" y1="42" x2="60" y2="47" stroke="#6d28d9" strokeWidth="1.2" opacity=".5"/>
      <line x1="12" y1="25" x2="12" y2="47" stroke="#6d28d9" strokeWidth="1.2" opacity=".35"/>
      <line x1="60" y1="25" x2="60" y2="47" stroke="#6d28d9" strokeWidth="1.2" opacity=".35"/>
      <line x1="17" y1="52" x2="31" y2="42" stroke="#6d28d9" strokeWidth="1.2" opacity=".35"/>
    </svg>
  )
}

function LinkedListSVG() {
  return (
    <svg width="88" height="32" viewBox="0 0 88 32" fill="none" className="dl" style={{'--dur':'3.6s','--del':'0.8s'} as React.CSSProperties}>
      <rect x="1" y="9" width="18" height="14" rx="3" stroke="#db2777" strokeWidth="1.5" className="dl-path"/>
      <rect x="35" y="9" width="18" height="14" rx="3" stroke="#db2777" strokeWidth="1.5" className="dl-path"/>
      <rect x="69" y="9" width="18" height="14" rx="3" stroke="#db2777" strokeWidth="1.5" className="dl-path"/>
      <line x1="19" y1="16" x2="35" y2="16" stroke="#db2777" strokeWidth="1.2" opacity=".5"/>
      <polyline points="32,12 35,16 32,20" stroke="#db2777" strokeWidth="1.2" opacity=".5"/>
      <line x1="53" y1="16" x2="69" y2="16" stroke="#db2777" strokeWidth="1.2" opacity=".5"/>
      <polyline points="66,12 69,16 66,20" stroke="#db2777" strokeWidth="1.2" opacity=".5"/>
    </svg>
  )
}

function DPGridSVG() {
  return (
    <svg width="66" height="66" viewBox="0 0 66 66" fill="none" className="dl" style={{'--dur':'3.8s','--del':'1.2s'} as React.CSSProperties}>
      {[0,1,2,3].map(r => [0,1,2,3].map(c => (
        <rect key={`${r}-${c}`} x={4+c*16} y={4+r*16} width="12" height="12" rx="2"
          stroke="#0891b2" strokeWidth="1.2" className="dl-path"
          opacity={r+c < 4 ? '1' : r+c < 6 ? '0.6' : '0.25'}
        />
      )))}
    </svg>
  )
}

function StackSVG() {
  return (
    <svg width="56" height="66" viewBox="0 0 56 66" fill="none" className="dl" style={{'--dur':'3.4s','--del':'1.6s'} as React.CSSProperties}>
      <rect x="4" y="48" width="48" height="14" rx="3" stroke="#16a34a" strokeWidth="1.5" className="dl-path"/>
      <rect x="4" y="30" width="48" height="14" rx="3" stroke="#16a34a" strokeWidth="1.5" className="dl-path"/>
      <rect x="4" y="12" width="48" height="14" rx="3" stroke="#16a34a" strokeWidth="1.5" className="dl-path"/>
      <line x1="28" y1="8" x2="28" y2="2" stroke="#16a34a" strokeWidth="1.4" opacity=".5"/>
      <polyline points="22,6 28,2 34,6" stroke="#16a34a" strokeWidth="1.4" opacity=".5"/>
    </svg>
  )
}

// ── Per-topic SVG icons ────────────────────────────────────────────────────────
const TOPIC_ICONS: Record<string, React.ReactNode> = {
  math: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><text x="2" y="15" fontSize="14" fill="currentColor" opacity=".6">∑</text></svg>,
  dp: <svg width="20" height="20" viewBox="0 0 20 20" fill="none">{[0,1,2,3].map(i=><rect key={i} x={2+i*4} y={16-i*4} width="3" height={4+i*4} rx="1" fill="currentColor" opacity={0.3+i*0.2}/>)}</svg>,
  binary_search: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><line x1="2" y1="10" x2="18" y2="10" stroke="currentColor" strokeWidth="1.5" opacity=".5"/><circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/><line x1="10" y1="2" x2="10" y2="18" stroke="currentColor" strokeWidth="1.5" opacity=".3"/></svg>,
  string: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><text x="1" y="15" fontSize="12" fill="currentColor" opacity=".6" fontFamily="monospace">abc</text></svg>,
  bit: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><text x="2" y="15" fontSize="11" fill="currentColor" opacity=".6" fontFamily="monospace">101</text></svg>,
  tree: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.3"/><circle cx="5" cy="13" r="2.5" stroke="currentColor" strokeWidth="1.3"/><circle cx="15" cy="13" r="2.5" stroke="currentColor" strokeWidth="1.3"/><line x1="10" y1="6.5" x2="5" y2="10.5" stroke="currentColor" strokeWidth="1.2" opacity=".5"/><line x1="10" y1="6.5" x2="15" y2="10.5" stroke="currentColor" strokeWidth="1.2" opacity=".5"/></svg>,
  graph: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.3"/><circle cx="3" cy="5" r="2" stroke="currentColor" strokeWidth="1.3"/><circle cx="17" cy="5" r="2" stroke="currentColor" strokeWidth="1.3"/><circle cx="3" cy="15" r="2" stroke="currentColor" strokeWidth="1.3"/><line x1="5" y1="6" x2="7.5" y2="8" stroke="currentColor" strokeWidth="1" opacity=".5"/><line x1="15" y1="6" x2="12.5" y2="8" stroke="currentColor" strokeWidth="1" opacity=".5"/><line x1="5" y1="14" x2="7.5" y2="12" stroke="currentColor" strokeWidth="1" opacity=".5"/></svg>,
  linked_list: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="1" y="7" width="5" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><rect x="8" y="7" width="5" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><rect x="15" y="7" width="5" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><line x1="6" y1="10" x2="8" y2="10" stroke="currentColor" strokeWidth="1.2" opacity=".5"/><line x1="13" y1="10" x2="15" y2="10" stroke="currentColor" strokeWidth="1.2" opacity=".5"/></svg>,
  advanced_tree: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.3" opacity=".4"/><line x1="2" y1="10" x2="18" y2="10" stroke="currentColor" strokeWidth="1.2" opacity=".5"/><line x1="10" y1="2" x2="10" y2="18" stroke="currentColor" strokeWidth="1.2" opacity=".5"/></svg>,
  sliding_window: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="1" y="7" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3" opacity=".4"/><rect x="5" y="7" width="8" height="6" rx="1" fill="currentColor" opacity=".25"/><line x1="9" y1="4" x2="9" y2="16" stroke="currentColor" strokeWidth="1" opacity=".4"/></svg>,
  heap: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="4" r="2.5" fill="currentColor" opacity=".7"/><circle cx="5" cy="11" r="2" fill="currentColor" opacity=".5"/><circle cx="15" cy="11" r="2" fill="currentColor" opacity=".5"/><circle cx="2" cy="17" r="1.5" fill="currentColor" opacity=".3"/><circle cx="8" cy="17" r="1.5" fill="currentColor" opacity=".3"/></svg>,
  shape: <svg width="20" height="20" viewBox="0 0 20 20" fill="none">{[0,1,2,3].map(r=>[0,1,2,3].map(c=><rect key={`${r}-${c}`} x={2+c*4} y={2+r*4} width="3" height="3" rx=".5" fill="currentColor" opacity={(r+c)%2===0?'0.5':'0.2'}/>))}</svg>,
  backtrack: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 3 L17 15 L3 15 Z" stroke="currentColor" strokeWidth="1.3" opacity=".5"/><path d="M10 7 L15 15 L5 15 Z" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity=".15"/></svg>,
  trie: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="3" r="2" stroke="currentColor" strokeWidth="1.3"/><circle cx="4" cy="10" r="2" stroke="currentColor" strokeWidth="1.3"/><circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.3"/><circle cx="16" cy="10" r="2" stroke="currentColor" strokeWidth="1.3"/><circle cx="2" cy="17" r="1.5" stroke="currentColor" strokeWidth="1.2"/><circle cx="6" cy="17" r="1.5" stroke="currentColor" strokeWidth="1.2"/><line x1="10" y1="5" x2="4" y2="8" stroke="currentColor" strokeWidth="1" opacity=".4"/><line x1="10" y1="5" x2="10" y2="8" stroke="currentColor" strokeWidth="1" opacity=".4"/><line x1="10" y1="5" x2="16" y2="8" stroke="currentColor" strokeWidth="1" opacity=".4"/></svg>,
}

// ── 3D tilt hook ───────────────────────────────────────────────────────────────
function use3DTilt() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const el = ref.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = (e.clientX - cx) / (r.width / 2)
      const dy = (e.clientY - cy) / (r.height / 2)
      el.style.transform = `perspective(600px) rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg) translateZ(4px)`
    }
    const onLeave = () => {
      el.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) translateZ(0)'
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return ref
}

// ── Count-up hook ──────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1200) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          const ease = 1 - Math.pow(1 - p, 3)
          setVal(Math.round(ease * target))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration])

  return { val, ref }
}

// ── StatCell ───────────────────────────────────────────────────────────────────
function StatCell({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const { val, ref } = useCountUp(target)
  return (
    <div className="ld2-stat-cell reveal">
      <div className="ld2-stat-value">
        <span ref={ref}>{val.toLocaleString()}</span>{suffix}
      </div>
      <div className="ld2-stat-label">{label}</div>
    </div>
  )
}

// ── TopicCard ──────────────────────────────────────────────────────────────────
function TopicCard({ t }: { t: typeof topics[0] }) {
  const tiltRef = use3DTilt()
  const color = TOPIC_COLORS[t.slug] ?? '#3b9eff'
  const icon = TOPIC_ICONS[t.slug]

  return (
    <Link
      to="/explore"
      search={{ topics: t.slug, q: '', platform: 'all', diff: 'tier', tiers: '', rmin: 800, rmax: 3500, sort: 'name', dir: 'asc', page: 1 }}
      className="ld2-topic-card reveal"
    >
      <div ref={tiltRef} className="ld2-topic-inner" style={{ '--tc': color } as React.CSSProperties}>
        <div className="ld2-topic-accent" />
        <div className="ld2-topic-hover-glow" />
        {icon && <div className="ld2-topic-icon" style={{ color }}>{icon}</div>}
        <div className="ld2-topic-dot" style={{ background: color }} />
        <div className="ld2-topic-name">{t.name}</div>
        <div className="ld2-topic-desc">{t.description}</div>
        <div className="ld2-topic-meta">
          <span className="ld2-topic-count">{(t.count ?? 0).toLocaleString()}</span>
          <span className="ld2-topic-sep">·</span>
          <span className="ld2-topic-plats">{t.platforms} platforms</span>
        </div>
      </div>
    </Link>
  )
}

// ── FeatureCard ────────────────────────────────────────────────────────────────
function FeatureCard({ f }: { f: typeof FEATURES[0] }) {
  const tiltRef = use3DTilt()
  return (
    <div className="ld2-feature-card reveal">
      <div ref={tiltRef} className="ld2-feature-inner">
        <div className="ld2-feature-icon">{f.icon}</div>
        <div className="ld2-feature-name">{f.label}</div>
        <p className="ld2-feature-desc">{f.desc}</p>
      </div>
    </div>
  )
}

// ── OpenBook (Codex) ───────────────────────────────────────────────────────────
function OpenBook() {
  return (
    <div className="ob-scene">
      <div className="ob-book">
        <div className="ob-cover ob-cover-left">
          <div className="ob-cover-inner">
            <div className="ob-cover-title">Shape<br/>Codex</div>
            <div className="ob-cover-sub">DSA Patterns</div>
          </div>
        </div>
        <div className="ob-spine" />
        <div className="ob-pages">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="ob-page" style={{ '--pi': i } as React.CSSProperties} />
          ))}
        </div>
        <div className="ob-cover ob-cover-right">
          <div className="ob-cover-inner ob-cover-inner-right">
            <div className="ob-cover-subtitle">Learn the Pattern.<br/>Solve the Problem.</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── HomePage ───────────────────────────────────────────────────────────────────
function HomePage() {
  // Cursor glow
  useEffect(() => {
    if (typeof window === 'undefined') return
    const glow = document.getElementById('cursor-glow')
    if (!glow) return
    let tx = window.innerWidth / 2
    let ty = window.innerHeight / 2
    let cx = tx
    let cy = ty
    let raf: number

    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY }
    const tick = () => {
      cx += (tx - cx) * 0.09
      cy += (ty - cy) * 0.09
      glow.style.left = cx + 'px'
      glow.style.top = cy + 'px'
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  // Mouse parallax for floating shapes
  useEffect(() => {
    if (typeof window === 'undefined') return
    const onMove = (e: MouseEvent) => {
      const px = (e.clientX / window.innerWidth - 0.5) * 2
      const py = (e.clientY / window.innerHeight - 0.5) * 2
      document.querySelectorAll<HTMLElement>('[data-d]').forEach(el => {
        const d = parseFloat(el.dataset.d ?? '1')
        el.style.transform = `translate(${px * d * 16}px, ${py * d * 10}px)`
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Scroll reveal
  useEffect(() => {
    if (typeof window === 'undefined') return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in') })
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      {/* Cursor glow overlay */}
      <div id="cursor-glow" />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="ld2-hero">
        <div className="ld2-hero-glow" />
        <div className="ld2-hero-dots" />

        {/* Floating shapes */}
        <div className="fwrap" style={{ position: 'absolute', top: '8%', left: '6%' }} data-d="0.6">
          <div className="finner" data-d="0.6"><TreeSVG /></div>
        </div>
        <div className="fwrap" style={{ position: 'absolute', top: '10%', right: '7%' }} data-d="0.8">
          <div className="finner" data-d="0.8"><GraphSVG /></div>
        </div>
        <div className="fwrap" style={{ position: 'absolute', top: '45%', left: '3%' }} data-d="0.5">
          <div className="finner" data-d="0.5"><LinkedListSVG /></div>
        </div>
        <div className="fwrap" style={{ position: 'absolute', top: '42%', right: '4%' }} data-d="0.7">
          <div className="finner" data-d="0.7"><DPGridSVG /></div>
        </div>
        <div className="fwrap" style={{ position: 'absolute', bottom: '12%', left: '50%', transform: 'translateX(-50%)' }} data-d="0.4">
          <div className="finner" data-d="0.4"><StackSVG /></div>
        </div>

        <div className="ld-w ld2-hero-inner">
          <Link to="/explore" className="ld2-announce-badge">
            <span className="ld2-announce-dot" />
            Now with {totalProblems.toLocaleString()}+ curated problems
            <span style={{ opacity: .5, marginLeft: 4 }}>→</span>
          </Link>

          <h1 className="ld2-hero-title">
            Master the Art of<br />
            <span className="ld2-hero-gradient">DSA.</span>
          </h1>

          <p className="ld2-hero-desc">
            Curated, deduplicated problems from 50+ platforms. Organized by
            topic, tagged by concept, ready for systematic practice.
          </p>

          <div className="ld2-hero-actions">
            <Link to="/learn" className="ld2-btn ld2-btn-primary">Start Learning →</Link>
            <Link to="/explore" className="ld2-btn ld2-btn-outline">Explore Problems</Link>
          </div>

          <div className="ld2-scroll-hint">
            <div className="ld2-scroll-line" />
            <span>scroll</span>
          </div>
        </div>
      </section>

      {/* ── Marquee ───────────────────────────────────────── */}
      <div className="ld-marquee-shell">
        <div className="ld-marquee-track">
          {[...PLATFORMS, ...PLATFORMS].map((p, i) => (
            <span key={i} className="ld-marquee-item">
              <span className="ld-marquee-dot" />{p}
            </span>
          ))}
        </div>
      </div>

      {/* ── Stats ─────────────────────────────────────────── */}
      <div className="ld-w">
        <div className="ld2-stats-grid">
          <StatCell target={totalProblems} suffix="+" label="Problems" />
          <StatCell target={topics.length} suffix="" label="Topics" />
          <StatCell target={uniquePlatforms} suffix="+" label="Platforms" />
          <StatCell target={articles.length} suffix="+" label="Chapters" />
        </div>
      </div>

      <div className="ld2-sep" />

      {/* ── Topics ────────────────────────────────────────── */}
      <section className="ld-section ld-w">
        <div className="ld2-section-head reveal">
          <div className="ld2-eyebrow">Browse by Topic</div>
          <h2 className="ld2-section-title">{topics.length} Topics</h2>
          <p className="ld2-section-sub">Every problem tagged, every concept linked. Find exactly what you need.</p>
        </div>
        <div className="ld2-topics-grid">
          {topics.map(t => <TopicCard key={t.slug} t={t} />)}
        </div>
      </section>

      <div className="ld2-sep" />

      {/* ── Codex ─────────────────────────────────────────── */}
      <section className="ld-section ld-w">
        <div className="ld2-codex-layout">
          <div className="ld2-codex-book-col reveal">
            <OpenBook />
          </div>
          <div className="ld2-codex-info-col reveal">
            <div className="ld2-eyebrow">The Shape Codex</div>
            <h2 className="ld2-section-title">Pattern-first learning</h2>
            <p className="ld2-codex-desc">
              Every chapter follows the same ritual: brute-force first,
              then the key insight, then the optimal solution. Build
              intuition — not just memorization.
            </p>
            <ul className="ld2-codex-points">
              <li><span className="ld2-codex-check">✓</span> {articles.length} curated chapters</li>
              <li><span className="ld2-codex-check">✓</span> Brute → optimal walkthroughs</li>
              <li><span className="ld2-codex-check">✓</span> Real interview problems</li>
              <li><span className="ld2-codex-check">✓</span> Pattern recognition drills</li>
            </ul>
            <Link to="/learn" className="ld2-btn ld2-btn-primary" style={{ display: 'inline-flex', marginTop: '1.5rem' }}>
              Open the Codex →
            </Link>
          </div>
        </div>
      </section>

      <div className="ld2-sep" />

      {/* ── Features ──────────────────────────────────────── */}
      <section className="ld-section ld-w">
        <div className="ld2-section-head reveal">
          <div className="ld2-eyebrow">What You Can Do</div>
          <h2 className="ld2-section-title">Everything you need to master DSA</h2>
        </div>
        <div className="ld2-features-grid">
          {FEATURES.map(f => <FeatureCard key={f.label} f={f} />)}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="ld-section ld-w">
        <div className="ld2-cta-block reveal">
          <div className="ld2-cta-glow-l" />
          <div className="ld2-cta-glow-r" />
          <h2 className="ld2-cta-title">Start your DSA journey today.</h2>
          <p className="ld2-cta-desc">{totalProblems.toLocaleString()}+ problems. {articles.length} chapters. One platform.</p>
          <div className="ld2-cta-actions">
            <Link to="/learn" className="ld2-btn ld2-btn-primary">Learn Patterns →</Link>
            <Link to="/explore" className="ld2-btn ld2-btn-outline">Browse Problems</Link>
          </div>
        </div>
      </section>
    </>
  )
}
