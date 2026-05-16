import { Link, createFileRoute } from "@tanstack/react-router";
import { topics, totalProblems, uniquePlatforms } from "#/data/topics";
import { articles } from "#/data/articles";

export const Route = createFileRoute("/")({ component: HomePage });

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
  { icon: '⌕', label: 'Explore Problems',    desc: '38,000+ problems across 50+ platforms. Filter by difficulty, platform, topic, and rating range.' },
  { icon: '◈', label: 'Learn Patterns',       desc: `${articles.length} chapters of pattern-based learning. Brute force first, then the insight, then optimal.` },
  { icon: '▦', label: 'Curated Collections',  desc: '14 core topics: DP, Graphs, Trees, Binary Search, Sliding Window, and more. Practice systematically.' },
  { icon: '⚡', label: 'Instant Search',       desc: 'Full-text search across problem names, concepts, topics, and platforms. Find what you need instantly.' },
  { icon: '◎', label: 'Track Progress',       desc: 'Mark problems as solved, track per-topic completion. Personal collections — no account needed.' },
  { icon: '✓', label: 'Deduplicated',         desc: 'Every problem carefully deduplicated across platforms. No more solving the same problem twice.' },
]

function HomePage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="ld-hero">
        <div className="ld-hero-glow" />
        <div className="ld-hero-dots" />
        <div className="ld-w ld-hero-inner">
          <Link to="/explore" className="ld-announce-badge">
            <span className="ld-announce-dot" />
            Now with {totalProblems.toLocaleString()}+ problems
            <span style={{ opacity: .55, marginLeft: 2 }}>→</span>
          </Link>
          <h1 className="ld-hero-title">
            Master DSA.<br />
            <span className="ld-hero-dim">One pattern at a time.</span>
          </h1>
          <p className="ld-hero-desc">
            Curated, deduplicated problems from 50+ platforms. Organized by topic, tagged by concept, ready for practice.
          </p>
          <div className="ld-hero-actions">
            <Link to="/learn" className="ld-btn ld-btn-primary">Start Learning →</Link>
            <Link to="/explore" className="ld-btn ld-btn-outline">Explore Problems</Link>
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
        <div className="ld-stats-grid">
          {[
            { v: `${Math.round(totalProblems / 1000)}k+`, l: 'Problems' },
            { v: topics.length.toString(), l: 'Topics' },
            { v: `${uniquePlatforms}+`, l: 'Platforms' },
            { v: `${articles.length}+`, l: 'Chapters' },
          ].map(s => (
            <div key={s.l} className="ld-stat-cell">
              <div className="ld-stat-value">{s.v}</div>
              <div className="ld-stat-label">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Topics ────────────────────────────────────────── */}
      <section className="ld-section ld-w">
        <div className="ld-section-head">
          <div className="ld-eyebrow">Browse by Topic</div>
          <h2 className="ld-section-title">{topics.length} Topics</h2>
          <p className="ld-section-sub">Every problem tagged, every concept linked. Find exactly what you need.</p>
        </div>
        <div className="ld-topics-grid">
          {topics.map(t => {
            const color = TOPIC_COLORS[t.slug] ?? '#3b9eff'
            const letter = t.name.charAt(0).toUpperCase()
            return (
              <Link key={t.slug} to="/explore" search={{ topics: t.slug, q: '', platform: 'all', diff: 'tier', tiers: '', rmin: 800, rmax: 3500, sort: 'name', dir: 'asc', page: 1 }} className="ld-topic-card">
                <span className="ld-topic-bg-letter" style={{ color }}>{letter}</span>
                <span className="ld-topic-dot" style={{ background: color }} />
                <div className="ld-topic-name">{t.name}</div>
                <div className="ld-topic-desc">{t.description ?? t.name}</div>
                <div className="ld-topic-meta">
                  <span className="ld-topic-count">{(t.count ?? 0).toLocaleString()}</span>
                  <span>·</span>
                  <span>problems</span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────── */}
      <section className="ld-section ld-w">
        <div className="ld-section-head">
          <div className="ld-eyebrow">What You Can Do</div>
          <h2 className="ld-section-title">Everything you need to master DSA</h2>
        </div>
        <div className="ld-features-grid">
          {FEATURES.map(f => (
            <div key={f.label} className="ld-feature-card">
              <div className="ld-feature-icon">{f.icon}</div>
              <div className="ld-feature-name">{f.label}</div>
              <p className="ld-feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="ld-section ld-w">
        <div className="ld-cta-block">
          <div className="ld-cta-glow" />
          <h2 className="ld-cta-title">Start your DSA journey today.</h2>
          <p className="ld-cta-desc">{totalProblems.toLocaleString()}+ problems. {articles.length} chapters. One platform.</p>
          <div className="ld-cta-actions">
            <Link to="/learn" className="ld-btn ld-btn-primary">Learn Patterns →</Link>
            <Link to="/explore" className="ld-btn ld-btn-outline">Browse Problems</Link>
          </div>
        </div>
      </section>
    </>
  )
}
