import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useMemo } from 'react'

export const Route = createFileRoute('/learn/patterns')({ component: PatternsPage })

// ─── Pattern data ─────────────────────────────────────────────────────────────
interface Pattern {
  slug: string
  name: string
  emoji: string
  trigger: string
  complexity: string
  template: string
  tips: string[]
}

const PATTERNS: Pattern[] = [
  {
    slug: 'sliding-window',
    name: 'Sliding Window',
    emoji: '🪟',
    trigger: 'subarray/substring, contiguous, at most k',
    complexity: 'O(n)',
    template: `let lo = 0, ans = 0;
for (let hi = 0; hi < n; hi++) {
  // expand window with nums[hi]
  while (/* window invalid */) {
    // shrink from left
    lo++;
  }
  ans = Math.max(ans, hi - lo + 1);
}`,
    tips: ['Sort order is preserved in window', 'Exactly k = atMost(k) - atMost(k-1)', 'Variable window: while loop to shrink; fixed: slide both ends'],
  },
  {
    slug: 'two-pointers',
    name: 'Two Pointers',
    emoji: '👆👆',
    trigger: 'sorted array, pair sum, palindrome, remove duplicates',
    complexity: 'O(n)',
    template: `let lo = 0, hi = arr.length - 1;
while (lo < hi) {
  if (condition) {
    // found answer
  } else if (arr[lo] + arr[hi] < target) {
    lo++;
  } else {
    hi--;
  }
}`,
    tips: ['Array must be sorted (or use fast/slow pointers on linked list)', 'Fast/slow: cycle detection, find middle', 'Three sum: fix one, two-pointer on rest'],
  },
  {
    slug: 'binary-search',
    name: 'Binary Search',
    emoji: '🔍',
    trigger: 'sorted, find minimum/maximum valid value, monotone predicate',
    complexity: 'O(log n)',
    template: `let lo = 0, hi = n - 1;
while (lo < hi) {
  const mid = (lo + hi) >> 1;
  if (check(mid)) hi = mid;   // mid is valid, try smaller
  else lo = mid + 1;           // mid is invalid, try larger
}
return lo; // first valid`,
    tips: ['lo < hi + return lo for "first valid"', 'lo <= hi + return -1 for "find exact"', 'Binary search on answer: check(mid) = "can we achieve mid?"'],
  },
  {
    slug: 'dynamic-programming',
    name: 'Dynamic Programming',
    emoji: '🧠',
    trigger: 'count ways, min/max value, optimal substructure, overlapping subproblems',
    complexity: 'O(n²) or O(n·k)',
    template: `// Top-down (memo)
const memo = new Map();
function dp(i) {
  if (base_case) return base_value;
  if (memo.has(i)) return memo.get(i);
  const result = Math.max(dp(i-1) + ..., dp(i-2) + ...);
  memo.set(i, result);
  return result;
}

// Bottom-up (tabulation)
const dp = new Array(n+1).fill(0);
dp[0] = base;
for (let i = 1; i <= n; i++)
  dp[i] = Math.max(dp[i-1] + ..., ...);`,
    tips: ['Define state carefully: dp[i] = ?', '2D string DP: dp[i][j] = answer for s[0..i-1] and t[0..j-1]', 'Knapsack: outer loop items, inner loop capacity'],
  },
  {
    slug: 'graph',
    name: 'BFS (Shortest Path)',
    emoji: '🌊',
    trigger: 'minimum steps, shortest path unweighted, level-by-level',
    complexity: 'O(V + E)',
    template: `const visited = new Set([start]);
let queue = [start], level = 0;
while (queue.length) {
  const next = [];
  for (const node of queue) {
    if (node === target) return level;
    for (const nb of graph[node])
      if (!visited.has(nb)) { visited.add(nb); next.push(nb); }
  }
  queue = next;
  level++;
}`,
    tips: ['BFS = shortest path in unweighted graph', 'Multi-source: push ALL starting nodes at level 0', '0-1 BFS: use deque, push 0-cost to front'],
  },
  {
    slug: 'graph',
    name: 'DFS (Components/Cycle)',
    emoji: '🕸️',
    trigger: 'connected components, cycle detection, topological sort, flood fill',
    complexity: 'O(V + E)',
    template: `// Recursive DFS with 3-color cycle detection
const color = new Array(n).fill(0); // 0=unvisited, 1=visiting, 2=done
function dfs(u) {
  color[u] = 1;
  for (const v of graph[u]) {
    if (color[v] === 1) return false; // cycle!
    if (color[v] === 0 && !dfs(v)) return false;
  }
  color[u] = 2;
  return true;
}`,
    tips: ['DFS for: components, cycles, topo sort, bridges, SCCs', 'Postorder = reverse topological order', 'Kahn\'s BFS topo = process indegree-0 first'],
  },
  {
    slug: 'trees',
    name: 'Tree DP (Postorder)',
    emoji: '🌳',
    trigger: 'tree path, subtree value, diameter, max sum through node',
    complexity: 'O(n)',
    template: `let globalAns = -Infinity;
function dfs(node) {
  if (!node) return 0;
  const left  = Math.max(0, dfs(node.left));
  const right = Math.max(0, dfs(node.right));
  // update answer: path THROUGH this node (uses both branches)
  globalAns = Math.max(globalAns, left + node.val + right);
  // return to parent: single branch only
  return node.val + Math.max(left, right);
}`,
    tips: ['Return value = single branch going UP', 'Global update = path bending at this node (both children)', 'Clamp to 0 for max-sum; keep negatives for diameter/length'],
  },
  {
    slug: 'backtracking',
    name: 'Backtracking',
    emoji: '🔄',
    trigger: 'all combinations, permutations, subsets, valid arrangements',
    complexity: 'O(2ⁿ) or O(n!)',
    template: `function backtrack(start, current) {
  if (/* is valid complete solution */) {
    result.push([...current]);
    return;
  }
  for (let i = start; i < candidates.length; i++) {
    if (/* pruning: skip invalid */) continue;
    current.push(candidates[i]);     // choose
    backtrack(i + 1, current);       // explore (i+1 for combos, i for repeats)
    current.pop();                    // unchoose
  }
}`,
    tips: ['Sort candidates first for pruning (skip duplicates, early exit)', 'Combinations: pass i+1; Permutations: pass visited set', 'Pruning is the key to beating brute force'],
  },
  {
    slug: 'greedy',
    name: 'Greedy',
    emoji: '🤑',
    trigger: 'interval scheduling, activity selection, always take best now',
    complexity: 'O(n log n)',
    template: `// Activity selection: max non-overlapping intervals
intervals.sort((a, b) => a[1] - b[1]); // sort by END
let count = 0, lastEnd = -Infinity;
for (const [start, end] of intervals) {
  if (start >= lastEnd) {
    count++;        // take this interval
    lastEnd = end;
  }
}`,
    tips: ['Interval problems: sort by END for max selection, START for merging', 'Prove greedy: exchange argument or induction', 'Heap-greedy: repeatedly take the locally best available choice'],
  },
  {
    slug: 'heap',
    name: 'Heap / Priority Queue',
    emoji: '📦',
    trigger: 'k-th largest/smallest, streaming top-k, merge k sorted',
    complexity: 'O(n log k)',
    template: `// Top-k smallest: max-heap of size k
const heap = new MaxHeap();
for (const num of nums) {
  heap.push(num);
  if (heap.size() > k) heap.pop(); // remove largest
}
return heap.top(); // kth smallest

// k-way merge: min-heap with source index
const pq = new MinHeap(); // [val, listIdx, elemIdx]
for (let i = 0; i < lists.length; i++)
  if (lists[i]) pq.push([lists[i].val, i, lists[i]]);`,
    tips: ['Top-k smallest: max-heap of size k (pop when > k)', 'Top-k largest: min-heap of size k (pop when > k)', 'Dijkstra uses min-heap on (distance, node)'],
  },
  {
    slug: 'monotonic-stack',
    name: 'Monotonic Stack',
    emoji: '📚',
    trigger: 'next greater element, span, rectangle, trapped water',
    complexity: 'O(n)',
    template: `const stack = []; // indices, in decreasing value order
const result = new Array(n).fill(-1);
for (let i = 0; i < n; i++) {
  // pop elements that are smaller (for next greater)
  while (stack.length && nums[stack.at(-1)] < nums[i]) {
    result[stack.pop()] = i; // current i is "next greater"
  }
  stack.push(i);
}`,
    tips: ['Decreasing stack → finds next GREATER element', 'Increasing stack → finds next SMALLER element', 'For previous element: process stack before push'],
  },
  {
    slug: 'bit-manipulation',
    name: 'Bit Manipulation',
    emoji: '⚡',
    trigger: 'XOR, subset enumeration, power of 2, single number',
    complexity: 'O(1) or O(2ⁿ)',
    template: `// Common bit tricks:
x & (x-1)     // clear lowest set bit (check power of 2: x & (x-1) === 0)
x & (-x)      // isolate lowest set bit
x ^ x === 0  // XOR of same number = 0
a ^ b ^ a === b // XOR is its own inverse

// Enumerate all subsets of mask
for (let sub = mask; sub > 0; sub = (sub-1) & mask) {
  // process sub
}`,
    tips: ['XOR: a^a=0, a^0=a → find single number, missing number', 'Subset DP: iterate submasks in O(3ⁿ) total', 'Bit 30 is safe upper bound for 1e9 problems'],
  },
  {
    slug: 'trie',
    name: 'Trie (Prefix Tree)',
    emoji: '🌿',
    trigger: 'prefix search, autocomplete, word matching, XOR maximize',
    complexity: 'O(L) per op',
    template: `class TrieNode { constructor() { this.children = {}; this.isEnd = false; } }
class Trie {
  constructor() { this.root = new TrieNode(); }
  insert(word) {
    let node = this.root;
    for (const c of word) {
      if (!node.children[c]) node.children[c] = new TrieNode();
      node = node.children[c];
    }
    node.isEnd = true;
  }
  search(word) { /* walk and check isEnd */ }
  startsWith(prefix) { /* walk, return any node found */ }
}`,
    tips: ['Array[26] children faster than Map for lowercase letters', 'XOR trie: insert binary digits (bit 29 to 0) for max XOR queries', 'Compressed trie (Patricia) for space: merge single-child chains'],
  },
]

// ─── Component ────────────────────────────────────────────────────────────────
export default function PatternsPage() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return PATTERNS
    const q = query.toLowerCase()
    return PATTERNS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.trigger.toLowerCase().includes(q) ||
      p.tips.some(t => t.toLowerCase().includes(q)),
    )
  }, [query])

  return (
    <main className="page-wrap px-4 pb-20 pt-8 sm:pt-12">

      {/* Hero */}
      <section className="island-shell rise-in mb-8 rounded-2xl px-6 py-8 sm:px-10">
        <p className="island-kicker mb-2 text-xs">Cheat Sheet</p>
        <h1 className="display-title mb-2 text-2xl font-bold tracking-tight text-[var(--sea-ink)] sm:text-3xl">
          Quick Patterns Reference
        </h1>
        <p className="text-sm text-[var(--sea-ink-soft)]">
          {PATTERNS.length} core templates. Copy, adapt, solve.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link to="/learn" className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--chip-line)] bg-[var(--chip-bg)] px-4 py-2 text-xs font-semibold text-[var(--sea-ink)] no-underline transition hover:border-[var(--lagoon)]">
            ← All articles
          </Link>
          <Link to="/explore" className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--chip-line)] bg-[var(--chip-bg)] px-4 py-2 text-xs font-semibold text-[var(--sea-ink)] no-underline transition hover:border-[var(--lagoon)]">
            38k problems →
          </Link>
        </div>
      </section>

      {/* Search */}
      <div className="rise-in relative mb-6" style={{ animationDelay: '60ms' }}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search patterns, triggers, keywords…"
          className="w-full rounded-xl border border-[var(--chip-line)] bg-[var(--chip-bg)] px-5 py-3 pl-11 text-sm text-[var(--sea-ink)] outline-none transition placeholder:text-[var(--sea-ink-soft)] focus:border-[var(--lagoon)] focus:ring-2 focus:ring-[rgba(79,184,178,0.2)]"
        />
        <svg className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--sea-ink-soft)]" width="15" height="15" viewBox="0 0 16 16" fill="none">
          <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        {query && (
          <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-lg leading-none text-[var(--sea-ink-soft)] hover:text-[var(--sea-ink)]">×</button>
        )}
      </div>

      {/* Pattern cards grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((p, i) => (
          <PatternCard key={`${p.slug}-${i}`} pattern={p} delay={i * 30} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-sm text-[var(--sea-ink-soft)]">
          No patterns match "{query}"
        </p>
      )}
    </main>
  )
}

function PatternCard({ pattern: p, delay }: { pattern: Pattern; delay: number }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <article
      className="rise-in flex flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] transition hover:border-[var(--lagoon)]"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Header */}
      <div className="border-b border-[var(--line)] px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{p.emoji}</span>
            <h3 className="font-bold text-[var(--sea-ink)]">{p.name}</h3>
          </div>
          <span className="rounded-md bg-[var(--chip-bg)] px-2 py-0.5 font-mono text-[10px] text-[var(--sea-ink-soft)]">
            {p.complexity}
          </span>
        </div>
        <p className="mt-1.5 text-[11px] font-medium italic text-[var(--lagoon-deep)]">
          When: {p.trigger}
        </p>
      </div>

      {/* Template code */}
      <div className="relative flex-1">
        <pre
          className={`overflow-hidden bg-[#1a1a2e] px-4 py-3 font-mono text-[11px] leading-relaxed text-[#e8f4fd] transition-all ${expanded ? 'max-h-none' : 'max-h-40'}`}
        >
          <code>{p.template}</code>
        </pre>
        {!expanded && (
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#1a1a2e] to-transparent" />
        )}
        <button
          onClick={() => setExpanded(x => !x)}
          className="absolute bottom-2 right-3 rounded-md border border-white/10 bg-white/10 px-2 py-0.5 text-[10px] text-white/70 hover:bg-white/20"
        >
          {expanded ? 'collapse ▲' : 'expand ▼'}
        </button>
      </div>

      {/* Tips */}
      <div className="px-4 py-3">
        <ul className="space-y-1">
          {p.tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-1.5 text-[11px] text-[var(--sea-ink-soft)]">
              <span className="mt-0.5 shrink-0 text-[var(--lagoon)]">▸</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="border-t border-[var(--line)] px-4 py-2.5">
        <Link
          to="/learn/$pattern"
          params={{ pattern: p.slug }}
          className="text-xs font-semibold text-[var(--lagoon-deep)] no-underline hover:underline"
        >
          Full article + problems →
        </Link>
      </div>
    </article>
  )
}
