import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/geometry-book/')({ component: GeometryBookHome })

interface ChapterMeta {
  chapter: number
  slug: string
  title: string
  icon: string
  color: string
  problemCount: number
}

interface BookIndex {
  totalChapters: number
  totalProblems: number
  chapters: ChapterMeta[]
}

const PARTS = [
  { name: 'Part I — Foundations', range: [1, 2, 3, 4], description: 'Core concepts, shapes, triangles, and right triangles.' },
  { name: 'Part II — Planar Shapes', range: [5, 6, 7, 8], description: 'Rectangles, circles, coordinate geometry, and lines.' },
  { name: 'Part III — Spatial Reasoning', range: [9, 10, 11], description: 'Distance, polygons, and grid-based geometry.' },
  { name: 'Part IV — Computation & Analysis', range: [12, 13, 14, 15], description: 'Area, angles, computational geometry, and advanced algorithms.' },
]

function GeometryBookHome() {
  const [index, setIndex] = useState<BookIndex | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/geometry-book/index.json')
      .then(r => r.json())
      .then(d => { setIndex(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:pt-32">
        <div className="flex items-center justify-center py-32">
          <div className="gb-loader" />
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:pt-32">
      {/* Hero */}
      <section className="gb-hero mb-12">
        <div className="gb-hero-glow" />
        <div className="gb-hero-content">
          <div className="gb-hero-icon-wrap">
            <span className="gb-hero-icon">📐</span>
          </div>
          <div>
            <p className="gb-eyebrow">Interactive Textbook</p>
            <h1 className="gb-hero-title">
              Geometry & Shape Problems<br />
              <span className="gb-hero-gradient">in Data Structures & Algorithms</span>
            </h1>
            <p className="gb-hero-desc">
              From Beginner to Advanced · {index?.totalChapters ?? 15} chapters · {index?.totalProblems?.toLocaleString() ?? '10,000+'} curated problems
            </p>
            <div className="gb-hero-actions">
              <a href="#toc" className="gb-btn gb-btn-primary">Start Reading ↓</a>
              <Link to="/explore" search={{ topics: 'geometry', q: '', platform: 'all', diff: 'tier', tiers: '', rmin: 800, rmax: 3500, sort: 'name', dir: 'asc', page: 1 }} className="gb-btn gb-btn-outline">Browse Geometry Problems</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <div id="toc" className="mb-8">
        {(index?.chapters.length ?? 0) > 0 && PARTS.map(part => {
          const partChapters = index!.chapters.filter(c => part.range.includes(c.chapter))
          return (
            <section key={part.name} className="gb-part-section">
              <div className="gb-part-header">
                <span className="gb-part-dot" />
                <h2 className="gb-part-title">{part.name}</h2>
                <span className="gb-part-count">{partChapters.length} chapters</span>
              </div>
              <p className="gb-part-desc">{part.description}</p>
              <div className="gb-chapter-grid">
                {partChapters.map(ch => (
                  <Link
                    key={ch.chapter}
                    to="/geometry-book/$chapterSlug"
                    params={{ chapterSlug: ch.slug }}
                    className="gb-chapter-card"
                  >
                    <div className="gb-chapter-icon-wrap" style={{ background: `${ch.color}18` }}>
                      <span className="gb-chapter-icon" style={{ color: ch.color }}>{ch.icon}</span>
                    </div>
                    <div className="gb-chapter-info">
                      <span className="gb-chapter-num">Chapter {ch.chapter}</span>
                      <h3 className="gb-chapter-title">{ch.title}</h3>
                      <span className="gb-chapter-meta">{ch.problemCount.toLocaleString()} problems</span>
                    </div>
                    <span className="gb-chapter-arrow">→</span>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </div>

      {/* Info footer */}
      <div className="gb-footer-card">
        <div className="gb-footer-grid">
          <div>
            <h4 className="gb-footer-title">The Dataset</h4>
            <p className="gb-footer-text">10,692 geometry problems filtered from 38,000+ across 45+ platforms — LeetCode, Codeforces, AtCoder, and more.</p>
          </div>
          <div>
            <h4 className="gb-footer-title">How to Use</h4>
            <p className="gb-footer-text">Each chapter teaches concepts first, then walks through curated problems. Follow the progression: Basics → Patterns → Solutions.</p>
          </div>
          <div>
            <h4 className="gb-footer-title">Quick Navigation</h4>
            <ul className="gb-footer-links">
              <li><Link to="/learn" className="gb-footer-link">DSA Pattern Library →</Link></li>
              <li><Link to="/explore" className="gb-footer-link">Problem Explorer →</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
