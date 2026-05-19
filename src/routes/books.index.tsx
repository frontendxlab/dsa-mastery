import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { BOOKS, getTotalProblems } from '#/data/books'

export const Route = createFileRoute('/books/')({
  head: () => ({
    meta: [
      { title: 'Problems by Book — DSA Mastery' },
      { name: 'description', content: 'Browse 1,000+ DSA problems organized by popular textbooks like CTCI, CP4, CLRS, and Grokking Algorithms. Practice by book chapter.' },
    ],
  }),
  component: BooksPage,
})

const BOOK_ICONS: Record<string, string> = {
  ctci: '💡',
  cp4: '⚡',
  cph: '📘',
}

function BookCard({ book }: { book: typeof BOOKS[0] }) {
  const count = getTotalProblems(book)
  return (
    <Link to="/books/$bookSlug" params={{ bookSlug: book.slug }} className="book-card no-underline block">
      <motion.div
        className="book-card-inner"
        data-focusable
        whileHover={{ borderRadius: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        {/* Cover background image */}
        {book.coverUrl ? (
          <div className="bk-cover-bg">
            <img src={book.coverUrl} alt="" className="bk-cover-bg-img" />
          </div>
        ) : (
          <div className="bk-cover-fallback">
            <span className="bk-cover-fallback-text">{book.shortTitle}</span>
          </div>
        )}

        {/* Card content — above cover bg */}
        <div className="bk-card-body">
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
              <span className="book-stat-val">{count}</span>
              <span className="book-stat-lbl">Problems</span>
            </div>
            <div className="book-stat">
              <span className="book-stat-val">{book.chapters.length}</span>
              <span className="book-stat-lbl">Chapters</span>
            </div>
            <div className="book-stat">
              <span className="book-stat-val">{book.totalProblems.toLocaleString()}</span>
              <span className="book-stat-lbl">Book Total</span>
            </div>
          </div>

          {/* CTA */}
          <div className="book-card-cta">
            <span>Explore Problems</span>
            <span className="book-cta-arrow">→</span>
          </div>
        </div>
      </motion.div>
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
          <div className="books-coming-list">
            <span className="books-coming-item">Introduction to Algorithms (CLRS)</span>
            <span className="books-coming-item">Elements of Programming Interviews</span>
            <span className="books-coming-item">Algorithm Design Manual</span>
          </div>
        </div>
      </div>
    </main>
  )
}
