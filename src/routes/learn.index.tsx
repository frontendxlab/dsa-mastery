import { createFileRoute, Link } from '@tanstack/react-router'
import { articles } from '#/data/articles'
import { Card } from '@heroui/react/card'
import { Button } from '@heroui/react/button'
import { ArrowUpRight } from 'lucide-react'
import {
  Share2, Layers, TreePine, Hash, Link2, ChevronUp, Network,
  Type, List, Search, Zap, Binary, RotateCcw, Shuffle,
  Gamepad2, Triangle, Grid3X3, Calendar, Package, TrendingUp,
  GitMerge, Code2, ArrowRight,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const TOPIC_ICON: Record<string, LucideIcon> = {
  graph: Share2,
  dp: Layers,
  tree: TreePine,
  math: Hash,
  linked_list: Link2,
  heap: ChevronUp,
  trie: Network,
  string: Type,
  sequences: List,
  binary_search: Search,
  greedy: Zap,
  bit: Binary,
  backtrack: RotateCcw,
  combinatorics: Shuffle,
  game_theory: Gamepad2,
  geometry: Triangle,
  linear_algebra: Grid3X3,
  scheduling: Calendar,
  miscellaneous: Package,
  num_methods: TrendingUp,
  advanced_tree: GitMerge,
  sliding_window: Search,
  shape: Package,
}

export const Route = createFileRoute('/learn/')({ component: LearnPage })

// ─── Book structure ───────────────────────────────────────────────────────────
const BOOK: { part: string; color: string; chapters: string[] }[] = [
  {
    part: 'Part I — Arrays & Pointers',
    color: 'oklch(0.82 0.096 191 / 40%)',
    chapters: ['two-pointers', 'sliding-window', 'binary-search', 'prefix-sum', 'two-sum-family', 'array-tricks', 'difference-array', 'contribution-technique', 'binary-search-answer', 'permutation-patterns', 'word-break-variants', 'shortest-supersequence', 'kadane-variants', 'two-pointer-advanced', 'cyclic-sort', 'array-rotation', 'next-permutation'],
  },
  {
    part: 'Part II — Linked Structures',
    color: 'oklch(0.72 0.112 240 / 30%)',
    chapters: ['linked-list', 'trees', 'advanced-trees', 'sparse-table', 'segment-tree-lazy', 'cycle-detection', 'tree-construction', 'lca', 'dsu-on-tree', 'tree-diameter', 'offline-lca', 'tree-isomorphism', 'persistent-union-find', 'binary-lifting', 'segment-tree-basics', 'tree-path-problems', 'iterative-traversal', 'bst-operations', 'linked-list-reversal', 'tree-level-order', 'tree-general-dp'],
  },
  {
    part: 'Part III — Hashing & Auxiliary Structures',
    color: 'oklch(0.75 0.112 290 / 30%)',
    chapters: ['heap', 'trie', 'monotonic-stack', 'hashmap-patterns', 'stack-queue', 'counting-patterns', 'kth-element', 'monotonic-queue', 'two-heaps', 'bracket-sequences', 'amortized-patterns', 'expression-parsing', 'trie-xor', 'k-way-merge'],
  },
  {
    part: 'Part IV — Core Algorithms',
    color: 'oklch(0.85 0.104 145 / 40%)',
    chapters: ['dynamic-programming', 'backtracking', 'greedy', 'graph', 'shortest-path', 'bitmask-dp', 'divide-conquer', 'knapsack-dp', 'graph-advanced', 'bipartite', 'coordinate-compression', 'topological-sort', 'minimum-spanning-tree', 'network-flow', 'meet-in-middle', 'convex-hull-trick', 'centroid-decomposition', 'line-sweep', 'two-sat', 'bridges-articulation', 'min-cost-flow', 'flow-lower-bounds', 'bidirectional-bfs', 'a-star-search', 'difference-constraints', 'functional-graphs', 'matching-flow', 'graph-coloring', 'topk-streaming', 'strongly-connected-components', 'graph-state-space', 'greedy-intervals', 'constructive-algorithms', 'backtracking-pruning', 'multi-source-bfs', 'grid-islands', 'graph-bellman-ford', 'jump-game-variants', 'union-find-applications', 'greedy-strings', 'graph-coloring-bipartite', 'floyd-warshall'],
  },
  {
    part: 'Part V — Strings, Sequences & Grid',
    color: 'oklch(0.82 0.112 60 / 40%)',
    chapters: ['string-algorithms', 'string-matching', 'sequences', 'matrix', 'string-dp', 'palindrome-patterns', 'string-hashing', 'suffix-array', 'aho-corasick', 'z-function', 'manachers', 'suffix-automaton', 'palindrome-automaton', 'string-rotations', 'lyndon-factorization', 'string-construction', 'string-decode-patterns', 'string-parsing'],
  },
  {
    part: 'Part VI — Math & Discrete',
    color: 'oklch(0.82 0.112 355 / 30%)',
    chapters: ['math', 'bit-manipulation', 'combinatorics', 'game-theory', 'geometry', 'number-theory', 'probability-dp', 'ternary-search', 'fft', 'sprague-grundy', 'chinese-remainder', 'convex-hull', 'inclusion-exclusion', 'catalan-numbers', 'josephus', 'sieve-variants', 'burnside-lemma', 'gray-code', 'gaussian-gf2', 'lucas-theorem', 'lattice-paths', 'advanced-counting-dp', 'rotating-calipers', 'carry-dp', 'random-walk', 'number-tricks', 'bit-counting'],
  },
  {
    part: 'Part VII — Advanced Topics',
    color: 'oklch(0.88 0.104 90 / 40%)',
    chapters: ['linear-algebra', 'numerical-methods', 'scheduling', 'shapes', 'miscellaneous', 'design-patterns', 'sorting-algorithms', 'simulation', 'matrix-exponentiation', 'randomized-algorithms', 'multiset-ordered-set', 'lru-lfu-cache', 'matrix-operations'],
  },
  {
    part: 'Part VIII — Cross-Topic Deep Dives',
    color: 'oklch(0.72 0.144 25 / 20%)',
    chapters: ['bfs-vs-dfs', 'interval-problems', 'dp-on-trees', 'union-find', 'digit-dp', 'interval-dp', 'grid-dp', 'state-machine-dp', 'recursion-memoization', 'grid-patterns', 'fenwick-tree', 'heavy-light-decomposition', 'euler-tour', 'mo-algorithm', 'xor-basis', 'euler-path', 'divide-conquer-dp', 'sqrt-decomposition', 'persistent-segment-tree', 'treap', 'offline-cdq', 'bitset-operations', 'slope-trick', 'segment-tree-beats', 'balanced-dp', 'profile-dp', 'aliens-trick', 'arithmetic-dp', 'subsequence-counting', 'sliding-window-advanced', 'two-d-prefix-sum', 'dp-with-deque', 'stock-trading', 'dp-space-optimization', 'string-window-patterns', 'wildcard-regex', 'counting-subarrays', 'dp-palindromes', 'trapping-rainwater', 'matrix-chain', 'stone-game-dp', 'hash-prefix-problems'],
  },
]

// chapter number across all parts
let chNum = 0
const CHAPTER_NUM: Record<string, number> = {}
for (const part of BOOK) for (const slug of part.chapters) CHAPTER_NUM[slug] = ++chNum

function LearnPage() {
  const articleMap = Object.fromEntries(articles.map(a => [a.slug, a]))

  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:pt-14">

      {/* ── Book cover ───────────────────────────────────────────── */}
      <section className="mb-10 rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--surface)] to-[var(--surface-secondary)] p-8 sm:p-12">
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[var(--accent)]">DSA Course — Complete Textbook</p>
        <h1 className="mb-4 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight text-[var(--foreground)]">
          Mastering DSA<br/>
          <span className="text-[var(--muted)]">Through Patterns</span>
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
          {BOOK.length} parts · {articles.length} chapters · 38k+ practice problems.
          Each chapter: brute force first, then the insight, then the optimal.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/learn/patterns"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--default)] px-4 py-2 text-sm font-medium text-[var(--foreground)] no-underline transition-colors hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)]"
          >
            <Zap size={13} />Quick Patterns
          </Link>
          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--default)] px-4 py-2 text-sm font-medium text-[var(--foreground)] no-underline transition-colors hover:bg-[var(--default)]"
          >
            Browse 38k+ Problems <ArrowRight size={13} />
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
              <div className="mb-4 flex items-center gap-3 border-b border-[var(--border)] pb-3">
                <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: section.color }} />
                <h2 className="text-sm font-semibold text-[var(--foreground)]">{section.part}</h2>
                <span className="ml-auto text-xs text-[var(--muted)]">{validChapters.length} chapters</span>
              </div>

              {/* Chapter list */}
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {validChapters.map(({ slug, article, num }) => (
                  <ChapterCard key={slug} article={article} num={num} accentColor={section.color} />
                ))}
              </div>
            </section>
          )
        })}
      </div>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 text-center">
        <p className="text-sm font-semibold text-[var(--foreground)] mb-1">More chapters coming</p>
        <p className="text-xs text-[var(--muted)]">Segment Trees, Network Flow, Number Theory deep dives — next up.</p>
      </div>
    </main>
  )
}

function ChapterCard({ article, num, accentColor }: { article: (typeof articles)[0]; num: number; accentColor: string }) {
  const Icon = TOPIC_ICON[article.topicSlug] ?? Code2
  return (
    <Link
      to="/learn/$pattern"
      params={{ pattern: article.slug }}
      className="group block no-underline"
    >
      <Card className="h-full border border-[var(--border)] bg-[var(--surface)] p-4 transition-all duration-200 hover:border-[var(--accent)]/50 hover:shadow-[var(--surface-shadow)] hover:-translate-y-px">
        <div className="flex gap-3">
          {/* Chapter number */}
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white shadow-sm"
            style={{ background: accentColor }}
          >
            {num}
          </div>
          {/* Content */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <Icon size={13} className="shrink-0 text-[var(--muted)]" />
              <h3 className="truncate text-sm font-semibold text-[var(--foreground)] leading-tight">{article.title}</h3>
            </div>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[var(--muted)]">
              {article.tagline}
            </p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[10px] font-medium uppercase tracking-wide text-[var(--muted)] opacity-60">{article.readTime}</span>
              <ArrowUpRight size={12} className="text-[var(--muted)] opacity-0 transition-opacity group-hover:opacity-60" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
