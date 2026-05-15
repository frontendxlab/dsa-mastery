import { createFileRoute, Link } from '@tanstack/react-router'
import { articles } from '#/data/articles'

export const Route = createFileRoute('/learn/')({ component: LearnPage })

// ─── Book structure ───────────────────────────────────────────────────────────
const BOOK: { part: string; color: string; chapters: string[] }[] = [
  {
    part: 'Part I — Arrays & Pointers',
    color: 'var(--nb-teal)',
    chapters: ['two-pointers', 'sliding-window', 'binary-search', 'prefix-sum', 'two-sum-family', 'array-tricks'],
  },
  {
    part: 'Part II — Linked Structures',
    color: 'var(--nb-blue)',
    chapters: ['linked-list', 'trees', 'advanced-trees', 'sparse-table', 'segment-tree-lazy', 'cycle-detection', 'tree-construction'],
  },
  {
    part: 'Part III — Hashing & Auxiliary Structures',
    color: 'var(--nb-purple)',
    chapters: ['heap', 'trie', 'monotonic-stack', 'hashmap-patterns', 'stack-queue', 'counting-patterns', 'kth-element'],
  },
  {
    part: 'Part IV — Core Algorithms',
    color: 'var(--nb-green)',
    chapters: ['dynamic-programming', 'backtracking', 'greedy', 'graph', 'shortest-path', 'bitmask-dp', 'divide-conquer', 'knapsack-dp', 'graph-advanced', 'bipartite', 'coordinate-compression'],
  },
  {
    part: 'Part V — Strings, Sequences & Grid',
    color: 'var(--nb-orange)',
    chapters: ['string-algorithms', 'string-matching', 'sequences', 'matrix', 'string-dp', 'palindrome-patterns'],
  },
  {
    part: 'Part VI — Math & Discrete',
    color: 'var(--nb-pink)',
    chapters: ['math', 'bit-manipulation', 'combinatorics', 'game-theory', 'geometry', 'number-theory', 'probability-dp'],
  },
  {
    part: 'Part VII — Advanced Topics',
    color: 'var(--nb-yellow)',
    chapters: ['linear-algebra', 'numerical-methods', 'scheduling', 'shapes', 'miscellaneous', 'design-patterns', 'sorting-algorithms'],
  },
  {
    part: 'Part VIII — Cross-Topic Deep Dives',
    color: 'var(--nb-red)',
    chapters: ['bfs-vs-dfs', 'interval-problems', 'dp-on-trees', 'union-find', 'digit-dp', 'interval-dp', 'grid-dp', 'state-machine-dp', 'recursion-memoization', 'grid-patterns'],
  },
]

// chapter number across all parts
let chNum = 0
const CHAPTER_NUM: Record<string, number> = {}
for (const part of BOOK) for (const slug of part.chapters) CHAPTER_NUM[slug] = ++chNum

function LearnPage() {
  const articleMap = Object.fromEntries(articles.map(a => [a.slug, a]))

  return (
    <main className="nb-page-wrap px-4 pb-20 pt-10 sm:pt-14">

      {/* ── Book cover ───────────────────────────────────────────── */}
      <section className="nb-card nb-accent-bg mb-10 bg-[var(--nb-yellow)] p-8 sm:p-12">
        <p className="nb-kicker mb-3">DSA Course — Complete Textbook</p>
        <h1 className="nb-display mb-4 text-[clamp(2rem,6vw,4rem)] leading-tight">
          Mastering DSA<br/>
          <span className="nb-underline">Through Patterns</span>
        </h1>
        <p className="max-w-2xl text-sm font-medium leading-relaxed opacity-80">
          {BOOK.length} parts · {articles.length} chapters · 38k+ practice problems.<br/>
          Each chapter: brute force first, then the insight, then the optimal. That's how you actually learn.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/learn/patterns"
            className="nb-chip bg-white font-bold no-underline hover:bg-[var(--nb-teal)] transition-colors"
          >
            ⚡ Quick Patterns Cheat Sheet
          </Link>
          <Link
            to="/explore"
            className="nb-chip bg-white no-underline hover:bg-[var(--nb-green)] transition-colors"
          >
            Browse 38k+ Problems →
          </Link>
        </div>
      </section>

      {/* ── Table of Contents ────────────────────────────────────── */}
      <div className="mb-8 space-y-10">
        {BOOK.map((section) => {
          const validChapters = section.chapters
            .map(slug => ({ slug, article: articleMap[slug], num: CHAPTER_NUM[slug] }))
            .filter(({ article }) => !!article)

          return (
            <section key={section.part}>
              {/* Part header */}
              <div
                className="mb-4 flex items-center gap-3 border-b-2 border-[var(--nb-border-color)] pb-3"
              >
                <span
                  className="h-3 w-3 rounded-full border-2 border-[var(--nb-border-color)] shrink-0"
                  style={{ background: section.color }}
                />
                <h2 className="nb-heading-sm text-[var(--nb-ink)]">{section.part}</h2>
                <span className="ml-auto text-xs font-bold opacity-50">{validChapters.length} chapters</span>
              </div>

              {/* Chapter list */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {validChapters.map(({ slug, article, num }) => (
                  <ChapterCard key={slug} article={article} num={num} accentColor={section.color} />
                ))}
              </div>
            </section>
          )
        })}
      </div>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <div className="nb-card nb-accent-bg bg-[var(--nb-green)] p-6 text-center">
        <p className="nb-heading-sm mb-1">More chapters coming</p>
        <p className="text-sm opacity-75">Segment Trees, Network Flow, Number Theory deep dives — next up.</p>
      </div>
    </main>
  )
}

function ChapterCard({ article, num, accentColor }: { article: (typeof articles)[0]; num: number; accentColor: string }) {
  return (
    <Link
      to="/learn/$pattern"
      params={{ pattern: article.slug }}
      className="group nb-card nb-card-hover flex gap-4 p-4 no-underline"
    >
      {/* Chapter number badge */}
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-[var(--nb-border-color)] text-sm font-black shadow-[2px_2px_0px_var(--nb-border-color)] transition-shadow group-hover:shadow-none"
        style={{ background: accentColor, color: 'var(--nb-on-accent)' }}
      >
        {num}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-2">
          <span className="text-lg leading-none">{article.emoji}</span>
          <h3 className="nb-heading-sm truncate leading-tight">{article.title}</h3>
        </div>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed opacity-60">
          {article.tagline}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wide opacity-40">{article.readTime} read</span>
          <span className="text-xs font-bold text-[var(--lagoon-deep)] opacity-0 transition-opacity group-hover:opacity-100">
            Start →
          </span>
        </div>
      </div>
    </Link>
  )
}
