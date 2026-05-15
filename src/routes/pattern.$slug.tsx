import { createFileRoute, Link, notFound } from "@tanstack/react-router"

export const Route = createFileRoute("/pattern/$slug")({
  loader: ({ params }) => {
    const entry = PATTERN_REGISTRY[params.slug]
    if (!entry) throw notFound()
    return { slug: params.slug, entry }
  },
  component: PatternDetailPage,
  notFoundComponent: () => (
    <main className="nb-page-wrap px-4 py-20 text-center">
      <div className="mx-auto max-w-md rounded-xl border-2 border-[var(--nb-border-color,#0f0f0f)] bg-[var(--nb-pink,#ff9ec4)] p-8 shadow-[4px_4px_0px_var(--nb-border-color,#0f0f0f)]">
        <p className="nb-display text-4xl mb-4">🧩</p>
        <p className="text-lg font-black mb-2">Pattern not found</p>
        <p className="text-sm opacity-70 mb-4">
          This pattern hasn't been written yet or the URL is wrong.
        </p>
        <Link
          to="/pattern"
          className="inline-flex items-center gap-2 rounded-lg border-2 border-[var(--nb-border-color,#0f0f0f)] bg-[var(--nb-surface,#fff9f0)] px-4 py-2 text-xs font-black shadow-[3px_3px_0px_var(--nb-border-color,#0f0f0f)] transition-all no-underline hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
        >
          ← Back to Pattern Guide
        </Link>
      </div>
    </main>
  ),
})

// ─── Pattern registry ──────────────────────────────────────────────────────────
// Each pattern article will register its content here when created.
// For now, every pattern from the overview page gets a placeholder page.

type PatternStatus = "draft" | "ready" | "needs mapping" | "needs review"

interface PatternArticle {
  title: string
  emoji: string
  status: PatternStatus
  sections: string[]
}

const PATTERN_REGISTRY: Record<string, PatternArticle> = {
  "hash-map-frequency": {
    title: "Hash Map / Frequency Counting",
    emoji: "🗺️",
    status: "draft",
    sections: [],
  },
  "two-pointers": {
    title: "Two Pointers",
    emoji: "👆",
    status: "draft",
    sections: [],
  },
  "sliding-window": {
    title: "Sliding Window",
    emoji: "🪟",
    status: "draft",
    sections: [],
  },
  "prefix-sum": {
    title: "Prefix Sum",
    emoji: "➕",
    status: "draft",
    sections: [],
  },
  "sorting-based": {
    title: "Sorting-Based Patterns",
    emoji: "📊",
    status: "draft",
    sections: [],
  },
  stack: {
    title: "Stack",
    emoji: "🗄️",
    status: "draft",
    sections: [],
  },
  queue: {
    title: "Queue",
    emoji: "🚶",
    status: "draft",
    sections: [],
  },
  "binary-search": {
    title: "Binary Search",
    emoji: "🎯",
    status: "draft",
    sections: [],
  },
  "linked-list": {
    title: "Linked List Patterns",
    emoji: "🔗",
    status: "draft",
    sections: [],
  },
  recursion: {
    title: "Recursion",
    emoji: "🔄",
    status: "draft",
    sections: [],
  },
  backtracking: {
    title: "Backtracking",
    emoji: "🔙",
    status: "draft",
    sections: [],
  },
  "tree-dfs": {
    title: "Tree DFS",
    emoji: "🌳",
    status: "draft",
    sections: [],
  },
  "tree-bfs": {
    title: "Tree BFS / Level Order",
    emoji: "📊",
    status: "draft",
    sections: [],
  },
  "matrix-traversal": {
    title: "Matrix Traversal",
    emoji: "🧮",
    status: "draft",
    sections: [],
  },
  "graph-dfs": {
    title: "Graph DFS",
    emoji: "🕸️",
    status: "draft",
    sections: [],
  },
  "graph-bfs": {
    title: "Graph BFS",
    emoji: "🌊",
    status: "draft",
    sections: [],
  },
  "heap-priority-queue": {
    title: "Heap / Priority Queue",
    emoji: "📚",
    status: "draft",
    sections: [],
  },
  intervals: {
    title: "Intervals",
    emoji: "📏",
    status: "draft",
    sections: [],
  },
  greedy: {
    title: "Greedy",
    emoji: "🏃",
    status: "draft",
    sections: [],
  },
  "monotonic-stack": {
    title: "Monotonic Stack",
    emoji: "📊",
    status: "draft",
    sections: [],
  },
  "monotonic-queue-deque": {
    title: "Monotonic Queue / Deque",
    emoji: "📈",
    status: "draft",
    sections: [],
  },
  "binary-search-on-answer": {
    title: "Binary Search on Answer",
    emoji: "🎯",
    status: "draft",
    sections: [],
  },
  "topological-sort": {
    title: "Topological Sort",
    emoji: "📋",
    status: "draft",
    sections: [],
  },
  "union-find-dsu": {
    title: "Union-Find / DSU",
    emoji: "🔗",
    status: "draft",
    sections: [],
  },
  trie: {
    title: "Trie",
    emoji: "🔤",
    status: "draft",
    sections: [],
  },
  "dynamic-programming": {
    title: "Dynamic Programming",
    emoji: "🧠",
    status: "draft",
    sections: [],
  },
  "bit-manipulation": {
    title: "Bit Manipulation",
    emoji: "💡",
    status: "draft",
    sections: [],
  },
  "knapsack-dp": {
    title: "Knapsack DP",
    emoji: "🎒",
    status: "draft",
    sections: [],
  },
  "interval-dp": {
    title: "Interval DP",
    emoji: "🔲",
    status: "draft",
    sections: [],
  },
  "tree-dp": {
    title: "Tree DP",
    emoji: "🌳",
    status: "draft",
    sections: [],
  },
  "bitmask-dp": {
    title: "Bitmask DP",
    emoji: "🎭",
    status: "draft",
    sections: [],
  },
  "digit-dp": {
    title: "Digit DP",
    emoji: "🔢",
    status: "draft",
    sections: [],
  },
  "shortest-path": {
    title: "Shortest Path",
    emoji: "🗺️",
    status: "draft",
    sections: [],
  },
  "minimum-spanning-tree": {
    title: "Minimum Spanning Tree",
    emoji: "🌉",
    status: "draft",
    sections: [],
  },
  "segment-tree": {
    title: "Segment Tree",
    emoji: "🌱",
    status: "draft",
    sections: [],
  },
  "fenwick-tree-bit": {
    title: "Fenwick Tree / BIT",
    emoji: "🌲",
    status: "draft",
    sections: [],
  },
  "string-matching": {
    title: "String Matching",
    emoji: "🔍",
    status: "draft",
    sections: [],
  },
  "rolling-hash": {
    title: "Rolling Hash",
    emoji: "#️⃣",
    status: "draft",
    sections: [],
  },
  "math-number-theory": {
    title: "Math / Number Theory",
    emoji: "🔢",
    status: "draft",
    sections: [],
  },
  simulation: {
    title: "Simulation",
    emoji: "🎮",
    status: "draft",
    sections: [],
  },
  design: {
    title: "Design Problems",
    emoji: "🏗️",
    status: "draft",
    sections: [],
  },
  geometry: {
    title: "Geometry",
    emoji: "📐",
    status: "draft",
    sections: [],
  },
  "game-theory": {
    title: "Game Theory",
    emoji: "🎲",
    status: "draft",
    sections: [],
  },
}

// ─── Status colours ────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<string, { bg: string; label: string }> = {
  draft: { bg: "var(--nb-surface-strong)", label: "Draft — coming soon" },
  ready: { bg: "var(--nb-green)", label: "Ready" },
  "needs mapping": { bg: "var(--nb-yellow)", label: "Needs Mapping" },
  "needs review": { bg: "var(--nb-orange)", label: "Needs Review" },
}

// ─── Page component ────────────────────────────────────────────────────────────

function PatternDetailPage() {
  const { entry } = Route.useLoaderData()

  const statusStyle = STATUS_STYLES[entry.status] ?? STATUS_STYLES.draft

  return (
    <main className="nb-page-wrap px-4 pb-20 pt-10 sm:pt-14">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-60">
        <Link to="/pattern" className="no-underline hover:opacity-100">
          Pattern Guide
        </Link>
        <span>/</span>
        <span className="opacity-100">{entry.title}</span>
      </div>

      {/* Hero */}
      <div className="mb-8 rounded-2xl border-2 border-[var(--nb-border-color,#0f0f0f)] bg-[var(--nb-teal,#7ee8e2)] p-8 sm:p-10 shadow-[8px_8px_0px_var(--nb-border-color,#0f0f0f)]">
        <div className="flex items-start gap-4 flex-wrap sm:flex-nowrap">
          <span className="text-5xl shrink-0">{entry.emoji}</span>
          <div className="flex-1 min-w-0">
            <p className="nb-kicker mb-1 text-xs">Pattern Reference</p>
            <h1 className="nb-display text-[clamp(1.6rem,4vw,2.8rem)] leading-tight mb-3 text-[var(--nb-on-accent,#111)]">
              {entry.title}
            </h1>
            <span
              className="inline-flex items-center rounded-full border-2 border-[var(--nb-border-color,#0f0f0f)] px-3 py-0.5 text-[10px] font-black uppercase tracking-wider shadow-[2px_2px_0px_var(--nb-border-color,#0f0f0f)]"
              style={{ backgroundColor: statusStyle.bg, color: "var(--nb-on-accent,#111)" }}
            >
              {statusStyle.label}
            </span>
          </div>
        </div>
      </div>

      {/* Draft notice */}
      {entry.status === "draft" && (
        <div className="rounded-xl border-2 border-[var(--nb-border-color,#0f0f0f)] bg-[var(--nb-yellow,#ffe566)] p-6 shadow-[4px_4px_0px_var(--nb-border-color,#0f0f0f)]">
          <h2 className="nb-heading-sm text-base font-black mb-2">Under Construction</h2>
          <p className="text-sm leading-relaxed opacity-80">
            The detailed article for <strong>{entry.title}</strong> has not been written yet.
            The pattern overview is available from the main page, and the full deep-dive —
            with templates, variants, and problem mappings from this repository's 38,000+
            problem list — will be added here.
          </p>
          <div className="mt-4">
            <Link
              to="/pattern"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-[var(--nb-border-color,#0f0f0f)] bg-[var(--nb-surface,#fff9f0)] px-4 py-2 text-xs font-black shadow-[3px_3px_0px_var(--nb-border-color,#0f0f0f)] transition-all no-underline hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
            >
              ← Back to Pattern Guide
            </Link>
          </div>
        </div>
      )}

      {/* Ready notice */}
      {entry.status === "ready" && entry.sections.length === 0 && (
        <div className="rounded-xl border-2 border-[var(--nb-border-color,#0f0f0f)] bg-[var(--nb-surface,#fff9f0)] p-6 shadow-[4px_4px_0px_var(--nb-border-color,#0f0f0f)]">
          <h2 className="nb-heading-sm text-base font-black mb-2">Article Coming</h2>
          <p className="text-sm leading-relaxed opacity-80">
            This pattern is marked as ready but the detailed article content is being migrated.
            Check back soon for the full deep-dive.
          </p>
        </div>
      )}

      {/* Future: sections will render here based on pattern data */}
      {entry.sections.length > 0 && (
        <div className="mt-8 space-y-8">
          {entry.sections.map((section, i) => (
            <div key={i} className="text-sm leading-relaxed">
              {section}
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
