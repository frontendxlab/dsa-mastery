import { createFileRoute, Link } from '@tanstack/react-router'
import { BOOKS, getTotalProblems } from '#/data/books'

export const Route = createFileRoute('/books/')({ component: BooksPage })

const BOOK_ICONS: Record<string, string> = {
  ctci: '💡',
  cp4: '⚡',
  cph: '📘',
}

function BookCard({ book }: { book: typeof BOOKS[0] }) {
  const count = getTotalProblems(book)
  return (
    <Link to="/books/$bookSlug" params={{ bookSlug: book.slug }} className="book-card group no-underline block">
      <div className="book-card-inner" style={{ '--book-color': book.accentColor } as React.CSSProperties}>
        {/* Color bar top */}
        <div className="book-card-bar" style={{ background: `linear-gradient(90deg, ${book.color}, ${book.accentColor})` }} />

        {/* Header */}
        <div className="book-card-head">
          <div className="book-card-icon">{BOOK_ICONS[book.slug]}</div>
          <div className="book-card-badge">{book.shortTitle}</div>
        </div>

        {/* Title + author */}
        <h3 className="book-card-title">{book.title}</h3>
        <p className="book-card-author">by {book.author}{book.edition ? ` · ${book.edition} Ed.` : ''}{book.year ? ` · ${book.year}` : ''}</p>
        <p className="book-card-desc">{book.description}</p>

        {/* Stats */}
        <div className="book-card-stats">
          <div className="book-stat">
            <span className="book-stat-val" style={{ color: book.accentColor }}>{count}</span>
            <span className="book-stat-lbl">Problems</span>
          </div>
          <div className="book-stat">
            <span className="book-stat-val" style={{ color: book.accentColor }}>{book.chapters.length}</span>
            <span className="book-stat-lbl">Chapters</span>
          </div>
          <div className="book-stat">
            <span className="book-stat-val" style={{ color: book.accentColor }}>{book.totalProblems.toLocaleString()}</span>
            <span className="book-stat-lbl">Book Total</span>
          </div>
        </div>

        {/* Tags */}
        <div className="book-card-tags">
          {book.tags.slice(0, 4).map(t => (
            <span key={t} className="book-tag">{t}</span>
          ))}
        </div>

        {/* CTA */}
        <div className="book-card-cta">
          <span>Explore Problems</span>
          <span className="book-cta-arrow">→</span>
        </div>
      </div>
    </Link>
  )
}

function BooksPage() {
  const totalAcross = BOOKS.reduce((s, b) => s + getTotalProblems(b), 0)
  return (
    <main className="books-page">
      <div className="page-wrap">
        {/* Header */}
        <div className="books-hero">
          <p className="books-eyebrow">Curated Library</p>
          <h1 className="books-title">Problems by Book</h1>
          <p className="books-subtitle">
            {totalAcross.toLocaleString()} problems across {BOOKS.length} books.
            Every chapter. Every exercise. Practice exactly what the book teaches.
          </p>
        </div>

        {/* Book grid */}
        <div className="books-grid">
          {BOOKS.map(b => <BookCard key={b.slug} book={b} />)}
        </div>

        {/* Coming soon */}
        <div className="books-coming">
          <p className="books-coming-title">More books coming</p>
          <p className="books-coming-sub">Introduction to Algorithms (CLRS) · Elements of Programming Interviews · Algorithm Design Manual</p>
        </div>
      </div>
    </main>
  )
}
