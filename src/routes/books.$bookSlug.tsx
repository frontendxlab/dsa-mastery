import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { getBook, getTotalProblems } from '#/data/books'
import type { BookChapter, BookProblem } from '#/data/books'
import { useState } from 'react'

export const Route = createFileRoute('/books/$bookSlug')({
  loader: ({ params }) => {
    const book = getBook(params.bookSlug)
    if (!book) throw notFound()
    return { book }
  },
  component: BookDetailPage,
})

const DIFF_COLOR: Record<string, string> = {
  Easy: '#34d399',
  Medium: '#fbbf24',
  Hard: '#f87171',
  Classic: '#a78bfa',
  Puzzle: '#60a5fa',
}

function ProblemRow({ p }: { p: BookProblem }) {
  const dColor = p.difficulty ? (DIFF_COLOR[p.difficulty] ?? '#7d8299') : '#7d8299'
  return (
    <div className="bp-row">
      <span className="bp-id">{p.id}</span>
      <span className="bp-title">{p.title}</span>
      {p.hint && (
        <span className="bp-hint" title={p.hint}>💡</span>
      )}
      <div className="bp-tags">
        {(p.tags ?? []).slice(0, 3).map(t => <span key={t} className="bp-tag">{t}</span>)}
      </div>
      {p.difficulty && (
        <span className="bp-diff" style={{ color: dColor, borderColor: dColor + '44', background: dColor + '12' }}>
          {p.difficulty}
        </span>
      )}
      {p.lcNum && (
        <a
          href={`https://leetcode.com/problems/`}
          target="_blank" rel="noreferrer"
          className="bp-lc"
          title={`LC #${p.lcNum}`}
        >
          LC #{p.lcNum}
        </a>
      )}
    </div>
  )
}

function ChapterBlock({ chapter, accent }: { chapter: BookChapter; accent: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bk-chapter">
      <button
        className="bk-ch-head"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className="bk-ch-num" style={{ color: accent }}>{chapter.num}</span>
        <span className="bk-ch-title">{chapter.title}</span>
        {chapter.page && <span className="bk-ch-page">p.{chapter.page}</span>}
        <span className="bk-ch-count">{chapter.problems.length} problems</span>
        <span className="bk-ch-chevron" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
      </button>

      {chapter.summary && !open && (
        <p className="bk-ch-summary">{chapter.summary}</p>
      )}

      {open && (
        <div className="bk-ch-body">
          {chapter.summary && <p className="bk-ch-summary-open">{chapter.summary}</p>}
          <div className="bp-list">
            {chapter.problems.map(p => <ProblemRow key={p.id} p={p} />)}
          </div>
        </div>
      )}
    </div>
  )
}

function BookDetailPage() {
  const { book } = Route.useLoaderData()
  const [search, setSearch] = useState('')
  const [diffFilter, setDiffFilter] = useState<string>('all')

  const filteredChapters = book.chapters.map(ch => ({
    ...ch,
    problems: ch.problems.filter(p => {
      const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase()) || (p.tags ?? []).some(t => t.toLowerCase().includes(search.toLowerCase()))
      const matchDiff = diffFilter === 'all' || p.difficulty === diffFilter
      return matchSearch && matchDiff
    }),
  })).filter(ch => ch.problems.length > 0)

  const totalShown = filteredChapters.reduce((s, c) => s + c.problems.length, 0)
  const allProblems = getTotalProblems(book)

  return (
    <main className="book-detail-page">
      <div className="page-wrap">
        {/* Breadcrumb */}
        <nav className="bk-breadcrumb">
          <Link to="/books" className="bk-bc-link">Books</Link>
          <span className="bk-bc-sep">›</span>
          <span className="bk-bc-cur">{book.shortTitle}</span>
        </nav>

        {/* Book header */}
        <div className="bk-header" style={{ '--book-accent': book.accentColor } as React.CSSProperties}>
          <div className="bk-header-bar" style={{ background: `linear-gradient(90deg, ${book.color}, ${book.accentColor})` }} />
          <div className="bk-header-body">
            <div className="bk-header-meta">
              <h1 className="bk-header-title">{book.title}</h1>
              <p className="bk-header-author">by {book.author}{book.edition ? ` · ${book.edition} Edition` : ''}{book.year ? ` · ${book.year}` : ''}</p>
              <p className="bk-header-desc">{book.description}</p>
              <div className="bk-header-stats">
                <div className="bk-hstat">
                  <span className="bk-hstat-val" style={{ color: book.accentColor }}>{allProblems}</span>
                  <span className="bk-hstat-lbl">Listed Problems</span>
                </div>
                <div className="bk-hstat">
                  <span className="bk-hstat-val" style={{ color: book.accentColor }}>{book.chapters.length}</span>
                  <span className="bk-hstat-lbl">Chapters</span>
                </div>
                <div className="bk-hstat">
                  <span className="bk-hstat-val" style={{ color: book.accentColor }}>{book.totalProblems.toLocaleString()}</span>
                  <span className="bk-hstat-lbl">Book Total</span>
                </div>
              </div>
              <div className="bk-header-tags">
                {book.tags.map(t => <span key={t} className="bk-htag" style={{ borderColor: book.accentColor + '44', color: book.accentColor }}>{t}</span>)}
              </div>
            </div>
          </div>
        </div>

        {/* Filter bar */}
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

        {/* Chapters */}
        <div className="bk-chapters">
          {filteredChapters.map(ch => (
            <ChapterBlock key={ch.num} chapter={ch} accent={book.accentColor} />
          ))}
          {filteredChapters.length === 0 && (
            <div className="bk-empty">No problems match your filter.</div>
          )}
        </div>
      </div>
    </main>
  )
}
