import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { getBook, getTotalProblems } from '#/data/books'
import type { BookChapter } from '#/data/books'
import { useState } from 'react'
import { ChapterAccordion } from '#/components/chapter-accordion'

export const Route = createFileRoute('/books/$bookSlug')({
  head: () => ({
    meta: [
      { title: 'Book Detail \u2014 DSA Mastery' },
      { name: 'description', content: 'Browse DSA problems organized by textbook chapter. Practice problems from popular coding interview books.' },
    ],
  }),
  loader: async ({ params }) => {
    const meta = getBook(params.bookSlug)
    if (!meta) throw notFound()

    try {
      const res = await fetch(`/data/books/${params.bookSlug}.json`)
      if (res.ok) {
        const full = await res.json() as { chapters: BookChapter[]; totalExtracted?: number; matchedToDb?: number }
        return {
          book: { ...meta, chapters: full.chapters },
          totalExtracted: full.totalExtracted ?? getTotalProblems(meta),
          matchedToDb: full.matchedToDb ?? 0,
        }
      }
    } catch { /* fall through */ }

    return { book: meta, totalExtracted: getTotalProblems(meta), matchedToDb: 0 }
  },
  component: BookDetailPage,
})

function BookDetailPage() {
  const { book, totalExtracted, matchedToDb } = Route.useLoaderData()
  const [search, setSearch] = useState('')
  const [diffFilter, setDiffFilter] = useState<string>('all')
  const [platformFilter, setPlatformFilter] = useState<string>('all')

  const filteredChapters = book.chapters.map(ch => ({
    ...ch,
    problems: ch.problems.filter(p => {
      const q = search.toLowerCase()
      const matchSearch = !search
        || p.title.toLowerCase().includes(q)
        || p.id.toLowerCase().includes(q)
        || (p.tags ?? []).some(t => t.toLowerCase().includes(q))
      const matchDiff = diffFilter === 'all' || p.difficulty === diffFilter
      const matchPlatform = platformFilter === 'all' || p.platform === platformFilter || (p.matchPlatform === platformFilter)
      return matchSearch && matchDiff && matchPlatform
    }),
  })).filter(ch => ch.problems.length > 0)

  const totalShown = filteredChapters.reduce((s, c) => s + c.problems.length, 0)

  return (
    <main className="book-detail-page">
      <div className="page-wrap">
        <nav className="bk-breadcrumb">
          <Link to="/books" className="bk-bc-link">Books</Link>
          <span className="bk-bc-sep">›</span>
          <span className="bk-bc-cur">{book.shortTitle}</span>
        </nav>

        <div className="bk-header">
          <div className="bk-header-bar" />
          <div className="bk-header-body">
            {book.coverUrl ? (
              <div className="bk-header-cover">
                <img src={book.coverUrl} alt="" className="bk-header-cover-img" />
              </div>
            ) : (
              <div className="bk-header-cover-fallback" style={{ background: `linear-gradient(135deg, ${book.accentColor}22, ${book.color}44)` }}>
                <span className="bk-cover-fallback-text-lg" style={{ color: book.accentColor }}>{book.shortTitle}</span>
              </div>
            )}
            <div className="bk-header-meta">
              <h1 className="bk-header-title">{book.title}</h1>
              <p className="bk-header-author">by {book.author}{book.edition ? ` · ${book.edition} Edition` : ''}{book.year ? ` · ${book.year}` : ''}</p>
              <p className="bk-header-desc">{book.description}</p>
              <div className="bk-header-stats">
                <div className="bk-hstat">
                  <span className="bk-hstat-val">{totalExtracted}</span>
                  <span className="bk-hstat-lbl">Extracted Problems</span>
                </div>
                <div className="bk-hstat">
                  <span className="bk-hstat-val">{book.chapters.length}</span>
                  <span className="bk-hstat-lbl">Chapters</span>
                </div>
                <div className="bk-hstat">
                  <span className="bk-hstat-val">{matchedToDb}</span>
                  <span className="bk-hstat-lbl">Linked to DB</span>
                </div>
                <div className="bk-hstat">
                  <span className="bk-hstat-val">{book.totalProblems.toLocaleString()}</span>
                  <span className="bk-hstat-lbl">Book Total</span>
                </div>
              </div>
              <div className="bk-header-tags">
                {book.tags.map(t => <span key={t} className="bk-htag" style={{ borderColor: book.accentColor + '44', color: book.accentColor }}>{t}</span>)}
              </div>
              {(book.sources ?? []).length > 0 && (
                <div className="bk-sources">
                  <span className="bk-sources-label">Get the book:</span>
                  <div className="bk-sources-list">
                    {(book.sources ?? []).map((s, i) => (
                      <a key={i} href={s.url} target="_blank" rel="noreferrer"
                        className="bk-source-link"
                        style={{ borderColor: book.accentColor + '33', color: book.accentColor }}>
                        {s.type === 'free' && '📖 '}{s.type === 'amazon' && '🛒 '}{s.type === 'lulu' && '📗 '}{s.type === 'oreilly' && '📘 '}{s.type === 'github' && '💻 '}{s.type === 'official' && '🌐 '}{s.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bk-filters">
          <input
            type="text"
            placeholder="Search problems, tags..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bk-search"
          />
          <div className="bk-diff-pills">
            {['all', 'Easy', 'Medium', 'Hard', 'Classic', 'Puzzle'].map(d => (
              <button
                key={d}
                className={`bk-diff-pill ${diffFilter === d ? 'active' : ''}`}
                onClick={() => setDiffFilter(d)}
                style={diffFilter === d ? { borderColor: book.accentColor, color: book.accentColor } : undefined}
              >
                {d}
              </button>
            ))}
          </div>
          <span className="bk-count-badge">{totalShown} shown</span>
        </div>

        <div className="bk-chapters">
          <ChapterAccordion
            chapters={filteredChapters}
            accent={book.accentColor}
            parts={book.parts}
          />
          {filteredChapters.length === 0 && (
            <div className="bk-empty">No problems match your filter.</div>
          )}
        </div>
      </div>
    </main>
  )
}
