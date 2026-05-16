import { createFileRoute, Link } from "@tanstack/react-router"
import { useState, useMemo } from "react"

export const Route = createFileRoute("/pattern/")({
  component: PatternOverviewPage,
})

// ─── Data ────────────────────────────────────────────────────────────────────

interface PatternEntry {
  slug: string
  name: string
  emoji: string
  description: string
  dataStructures: string[]
  signals: string[]
  complexity: string
  level: "Beginner" | "Intermediate" | "Advanced"
  problemCount: number
  status: "ready" | "needs mapping" | "needs review" | "advanced / later"
}

const PATTERNS: PatternEntry[] = [
  // ── Beginner Foundation ──
  {
    slug: "hash-map-frequency",
    name: "Hash Map / Frequency Counting",
    emoji: "🗺️",
    description: "Use a hash map to count occurrences, track pair sums, or detect duplicates in O(1) average lookup time. The bread and butter of O(n) solutions.",
    dataStructures: ["HashMap", "HashSet", "Array"],
    signals: ["count occurrences", "find duplicates", "pair sum", "anagram check", "frequency of elements"],
    complexity: "O(n) time, O(k) space",
    level: "Beginner",
    problemCount: 3200,
    status: "needs mapping",
  },
  {
    slug: "two-pointers",
    name: "Two Pointers",
    emoji: "👆",
    description: "Two indices moving through a sequence — opposite direction or same direction. Turns O(n²) comparisons into O(n) by maintaining an invariant about pointer positions.",
    dataStructures: ["Array", "String"],
    signals: ["sorted array", "find pair with condition", "palindrome", "three sum", "container with water"],
    complexity: "O(n) time, O(1) space",
    level: "Beginner",
    problemCount: 2500,
    status: "ready",
  },
  {
    slug: "sliding-window",
    name: "Sliding Window",
    emoji: "🪟",
    description: "Maintain a window over a contiguous segment of an array/string. Expand the right edge, shrink the left edge when the window becomes invalid. Turns O(n²) subarray enumeration into O(n).",
    dataStructures: ["Array", "String", "Deque", "HashMap"],
    signals: ["subarray", "substring", "contiguous", "longest/shortest with condition", "exactly k"],
    complexity: "O(n) time, O(1) or O(k) space",
    level: "Beginner",
    problemCount: 610,
    status: "ready",
  },
  {
    slug: "prefix-sum",
    name: "Prefix Sum",
    emoji: "➕",
    description: "Precompute running sums so that sum(l..r) = prefix[r] - prefix[l-1] in O(1). Works with hash maps to count subarrays matching a target.",
    dataStructures: ["Array", "HashMap"],
    signals: ["range sum query", "subarray sum equals k", "balance point", "cumulative frequency"],
    complexity: "O(n) precompute, O(1) query",
    level: "Beginner",
    problemCount: 1800,
    status: "needs mapping",
  },
  {
    slug: "sorting-based",
    name: "Sorting-Based Patterns",
    emoji: "📊",
    description: "Sorting is not a pattern itself, but many problems become trivial once the input is sorted. Sort + two pointers, sort + greedy, sort + binary search — the prep step that unlocks linear passes.",
    dataStructures: ["Array"],
    signals: ["unsorted input", "closest pair", "merge intervals", "meeting rooms", "kth element"],
    complexity: "O(n log n) sort + O(n) pass",
    level: "Beginner",
    problemCount: 4000,
    status: "needs mapping",
  },
  {
    slug: "stack",
    name: "Stack",
    emoji: "🗄️",
    description: "Last-in-first-out structure. Used for matching problems (parentheses), undo operations, expression evaluation, and maintaining a history of elements to compare against later elements.",
    dataStructures: ["Stack", "Array"],
    signals: ["nested structure", "parentheses", "expression evaluation", "backtrack", "undo"],
    complexity: "O(n) time, O(n) space",
    level: "Beginner",
    problemCount: 1500,
    status: "needs mapping",
  },
  {
    slug: "queue",
    name: "Queue",
    emoji: "🚶",
    description: "First-in-first-out structure. Used for level-order traversal, BFS, streaming data, and maintaining elements in arrival order.",
    dataStructures: ["Queue", "Deque", "LinkedList"],
    signals: ["first come first served", "level order", "stream processing", "buffer", "sliding"],
    complexity: "O(n) time, O(n) space",
    level: "Beginner",
    problemCount: 800,
    status: "needs mapping",
  },
  {
    slug: "binary-search",
    name: "Binary Search",
    emoji: "🎯",
    description: "Repeatedly divide the search space in half. Works when the search space is monotonic — sorted arrays, or any predicate that transitions from false to true.",
    dataStructures: ["Array"],
    signals: ["sorted array", "O(log n) required", "search in range", "find boundary"],
    complexity: "O(log n) time, O(1) space",
    level: "Beginner",
    problemCount: 3709,
    status: "ready",
  },
  // ── Core Intermediate ──
  {
    slug: "linked-list",
    name: "Linked List Patterns",
    emoji: "🔗",
    description: "Dummy nodes, reversal, slow/fast pointers, merging, partitioning. Linked lists enforce sequential access, so the patterns focus on pointer manipulation and two-pass techniques.",
    dataStructures: ["SinglyLinkedList", "DoublyLinkedList", "DummyNode"],
    signals: ["linked list", "reverse", "merge list", "remove nth", "cycle", "palindrome list"],
    complexity: "O(n) time, O(1) space",
    level: "Intermediate",
    problemCount: 1135,
    status: "ready",
  },
  {
    slug: "recursion",
    name: "Recursion",
    emoji: "🔄",
    description: "Solve a problem by solving smaller instances of the same problem. Every recursive solution needs a base case and a recurrence that moves toward the base. The foundation for trees, DP, backtracking.",
    dataStructures: ["CallStack"],
    signals: ["self-similar subproblems", "tree-like structure", "divide and conquer", "base case + recurrence"],
    complexity: "Varies — O(n) to O(2ⁿ)",
    level: "Intermediate",
    problemCount: 3000,
    status: "needs mapping",
  },
  {
    slug: "backtracking",
    name: "Backtracking",
    emoji: "🔙",
    description: "Explore all candidate solutions by building incrementally and abandoning (pruning) paths that cannot lead to a valid solution. State space search with undo.",
    dataStructures: ["Array", "Set", "Stack"],
    signals: ["all permutations", "all combinations", "all subsets", "N-queens", "constraint satisfaction", "generate all"],
    complexity: "O(n!) or O(2ⁿ) worst case with pruning",
    level: "Intermediate",
    problemCount: 325,
    status: "ready",
  },
  {
    slug: "tree-dfs",
    name: "Tree DFS",
    emoji: "🌳",
    description: "Recursive depth-first traversal of a tree. Pre-order (process before children), in-order (process between children — gives sorted order in BST), post-order (process after children — need child results first).",
    dataStructures: ["BinaryTree", "Stack", "Recursion"],
    signals: ["binary tree", "BST", "path sum", "tree traversal", "ancestor", "diameter"],
    complexity: "O(n) time, O(h) space",
    level: "Intermediate",
    problemCount: 2000,
    status: "needs mapping",
  },
  {
    slug: "tree-bfs",
    name: "Tree BFS / Level Order",
    emoji: "📊",
    description: "Queue-based level-by-level traversal of a tree. Process all nodes at depth d before depth d+1. Level averages, right side view, zigzag, connect siblings.",
    dataStructures: ["Queue", "BinaryTree", "Array"],
    signals: ["level order", "by level", "row by row", "right side view", "zigzag", "level average"],
    complexity: "O(n) time, O(w) width",
    level: "Intermediate",
    problemCount: 800,
    status: "needs mapping",
  },
  {
    slug: "matrix-traversal",
    name: "Matrix Traversal",
    emoji: "🧮",
    description: "Iterating a 2D grid systematically — row-major, spiral order, diagonal traversal, neighbor iteration with delta arrays (dr/dc). Often combined with BFS/DFS.",
    dataStructures: ["Matrix", "Queue", "Set"],
    signals: ["grid", "matrix", "2D array", "spiral", "rotate image", "set zeroes", "game of life"],
    complexity: "O(m×n) time, O(1) or O(m×n) space",
    level: "Intermediate",
    problemCount: 331,
    status: "ready",
  },
  {
    slug: "graph-dfs",
    name: "Graph DFS",
    emoji: "🕸️",
    description: "Recursive or stack-based depth-first graph traversal. Mark visited on entry. Count connected components, detect cycles (track parent undirected, path[] for directed), topological sort via post-order.",
    dataStructures: ["AdjacencyList", "Stack", "VisitedArray", "Recursion"],
    signals: ["graph", "connected components", "islands", "cycle detection", "province count"],
    complexity: "O(V + E) time, O(V) space",
    level: "Intermediate",
    problemCount: 1200,
    status: "needs mapping",
  },
  {
    slug: "graph-bfs",
    name: "Graph BFS",
    emoji: "🌊",
    description: "Queue-based breadth-first graph traversal. Guarantees shortest path in unweighted graphs. Level-by-level expansion. Multi-source variant: enqueue all sources at level 0.",
    dataStructures: ["AdjacencyList", "Queue", "DistanceArray", "VisitedArray"],
    signals: ["shortest path unweighted", "nearest distance", "word ladder", "rotten oranges", "walls and gates"],
    complexity: "O(V + E) time, O(V) space",
    level: "Intermediate",
    problemCount: 1000,
    status: "needs mapping",
  },
  {
    slug: "heap-priority-queue",
    name: "Heap / Priority Queue",
    emoji: "📚",
    description: "Always extract the min/max element in O(log n). Used for top-K, median finding, Dijkstra, merge K sorted lists, scheduling, and anytime you need repeated extreme-value queries.",
    dataStructures: ["MinHeap", "MaxHeap", "PriorityQueue"],
    signals: ["kth largest/smallest", "top k", "merge k sorted", "median", "task scheduler", "Dijkstra"],
    complexity: "O(n log k) or O((V+E) log V)",
    level: "Intermediate",
    problemCount: 496,
    status: "ready",
  },
  {
    slug: "intervals",
    name: "Intervals",
    emoji: "📏",
    description: "Sort by start time, then merge, intersect, or compare adjacent intervals. Overlap check: max(start1, start2) < min(end1, end2). Sweep-line for complex coverage.",
    dataStructures: ["Array", "SortedList"],
    signals: ["intervals", "meeting rooms", "merge intervals", "overlap", "insert interval"],
    complexity: "O(n log n) sort, O(n) pass",
    level: "Intermediate",
    problemCount: 600,
    status: "needs mapping",
  },
  {
    slug: "greedy",
    name: "Greedy",
    emoji: "🏃",
    description: "Make the locally optimal choice at each step, trusting it leads to the global optimum. Works when the problem has optimal substructure and a greedy choice property. Classic: interval scheduling, coin change (canonical).",
    dataStructures: ["Array", "Sorting"],
    signals: ["maximum profit", "minimum cost", "schedule as many as possible", "locally optimal"],
    complexity: "O(n log n) typically",
    level: "Intermediate",
    problemCount: 2000,
    status: "ready",
  },
  // ── Advanced Intermediate ──
  {
    slug: "monotonic-stack",
    name: "Monotonic Stack",
    emoji: "📊",
    description: "Stack that maintains elements in increasing or decreasing order. Each element is pushed once and popped once — O(n). Used for next greater/smaller element, largest rectangle, trapping rain water.",
    dataStructures: ["Stack", "Array"],
    signals: ["next greater element", "previous smaller element", "largest rectangle", "daily temperatures", "stock span"],
    complexity: "O(n) time, O(n) space",
    level: "Advanced",
    problemCount: 400,
    status: "ready",
  },
  {
    slug: "monotonic-queue-deque",
    name: "Monotonic Queue / Deque",
    emoji: "📈",
    description: "Deque maintaining monotonic order for sliding window min/max. Maintain indices, keep front as current answer, remove out-of-window indices from front, maintain order from back.",
    dataStructures: ["Deque", "Array"],
    signals: ["sliding window maximum/minimum", "range max/min query", "deque sliding"],
    complexity: "O(n) time, O(k) space",
    level: "Advanced",
    problemCount: 200,
    status: "ready",
  },
  {
    slug: "binary-search-on-answer",
    name: "Binary Search on Answer",
    emoji: "🎯",
    description: "Binary search the answer space (not the input). Define a feasibility function that is monotonic (FFFFFFTTTTT). Find the first true or last false. Used when the answer is bounded and you can check if a candidate is achievable in O(n) or O(n log n).",
    dataStructures: ["Array"],
    signals: ["minimize maximum", "maximize minimum", "capacity to ship", "split array", "koko eating bananas", "feasibility check"],
    complexity: "O(n log M) or O(n log n log M)",
    level: "Advanced",
    problemCount: 800,
    status: "ready",
  },
  {
    slug: "topological-sort",
    name: "Topological Sort",
    emoji: "📋",
    description: "Linear ordering of DAG vertices: every edge u→v, u comes before v. Kahn's algorithm (BFS with in-degree array) or DFS post-order. Detects cycles implicitly.",
    dataStructures: ["AdjacencyList", "Queue", "InDegreeArray"],
    signals: ["dependency order", "course schedule", "prerequisite", "build order", "alien dictionary"],
    complexity: "O(V + E) time, O(V) space",
    level: "Advanced",
    problemCount: 300,
    status: "ready",
  },
  {
    slug: "union-find-dsu",
    name: "Union-Find / DSU",
    emoji: "🔗",
    description: "Disjoint set union with path compression and union by size/rank. O(α(n)) per operation — effectively constant. Dynamic connectivity, cycle detection in undirected graphs, Kruskal's MST, connected components queries.",
    dataStructures: ["ParentArray", "SizeArray"],
    signals: ["connected components dynamic", "graph connectivity queries", "accounts merge", "redundant connection", "Kruskal"],
    complexity: "O(α(n)) amortized per operation",
    level: "Advanced",
    problemCount: 500,
    status: "ready",
  },
  {
    slug: "trie",
    name: "Trie",
    emoji: "🔤",
    description: "Prefix tree for efficient string lookups (O(L) per operation). Insert, search, prefix search. Used for autocomplete, spell check, IP routing, maximum XOR pair (binary trie).",
    dataStructures: ["TrieNode", "HashMap", "Array"],
    signals: ["prefix", "autocomplete", "dictionary", "word search multiple", "longest common prefix", "XOR max pair"],
    complexity: "O(L) per operation where L = word length",
    level: "Advanced",
    problemCount: 158,
    status: "ready",
  },
  {
    slug: "dynamic-programming",
    name: "Dynamic Programming",
    emoji: "🧠",
    description: "Solve overlapping subproblems by storing intermediate results. Top-down (memoization) or bottom-up (tabulation). Pattern: define state, write recurrence, handle base cases, optimize space.",
    dataStructures: ["Array", "HashMap", "Matrix"],
    signals: ["optimal substructure", "overlapping subproblems", "count ways", "max/min of something", "decision at each step"],
    complexity: "Varies — O(n), O(n²), O(n × W), etc.",
    level: "Advanced",
    problemCount: 4313,
    status: "ready",
  },
  {
    slug: "bit-manipulation",
    name: "Bit Manipulation",
    emoji: "💡",
    description: "Bitwise operations: AND, OR, XOR, NOT, shifts. XOR tricks (x^x=0, x^0=x), Brian Kernighan's bit count, lowbit, subset enumeration via bits, gray code.",
    dataStructures: ["IntegerBits"],
    signals: ["XOR", "bit count", "power of two", "set bit/clear bit", "bitmask", "subset via bits", "bit tricks"],
    complexity: "O(1) or O(number of bits)",
    level: "Advanced",
    problemCount: 2868,
    status: "ready",
  },
  // ── Advanced ──
  {
    slug: "knapsack-dp",
    name: "Knapsack DP",
    emoji: "🎒",
    description: "0/1 knapsack (each item once, reverse loop for 1D DP), unbounded knapsack (each item infinite, forward loop), bounded knapsack (limited copies, binary splitting). Subset sum, coin change, partition equal subset.",
    dataStructures: ["Array", "Matrix"],
    signals: ["subset with target sum", "coin change", "partition equal", "with/without items", "capacity constraint"],
    complexity: "O(n × W) time",
    level: "Advanced",
    problemCount: 600,
    status: "ready",
  },
  {
    slug: "interval-dp",
    name: "Interval DP",
    emoji: "🔲",
    description: "DP over subarrays where dp[l][r] depends on smaller intervals between l and r. Solve by interval length (smallest first). Matrix chain multiplication, burst balloons, palindrome partitioning, stone game.",
    dataStructures: ["Matrix"],
    signals: ["dp over subarray", "burst balloons", "matrix chain", "palindrome partitioning", "stone game"],
    complexity: "O(n²) or O(n³) time",
    level: "Advanced",
    problemCount: 300,
    status: "ready",
  },
  {
    slug: "tree-dp",
    name: "Tree DP",
    emoji: "🌳",
    description: "DP on tree where each node's value depends on children (post-order). Rerooting DP for problems where you need the answer at every node as root. Tree diameter, max path sum, tree matching, tree knapsack.",
    dataStructures: ["AdjacencyList", "TreeNode", "Array"],
    signals: ["tree max/min", "tree path sum", "tree matching", "reroot dp", "distance sum in tree"],
    complexity: "O(n) with DFS, O(n²) with knapsack",
    level: "Advanced",
    problemCount: 400,
    status: "needs mapping",
  },
  {
    slug: "bitmask-dp",
    name: "Bitmask DP",
    emoji: "🎭",
    description: "DP over subsets represented as bitmasks. State = dp[mask][last] often. TSP, assignment, graph covering, partition into subsets. 2ⁿ states, each needing O(n) transitions.",
    dataStructures: ["IntegerBits", "Array", "Matrix"],
    signals: ["subset DP", "TSP", "assignment problem", "partition into groups", "state = subset"],
    complexity: "O(2ⁿ × n) or O(2ⁿ × n²)",
    level: "Advanced",
    problemCount: 200,
    status: "ready",
  },
  {
    slug: "digit-dp",
    name: "Digit DP",
    emoji: "🔢",
    description: "DP on digit positions of a number with tight/loose bounds. Count numbers in [L, R] satisfying a digit property. State = dp[pos][tight][sum][mod] etc.",
    dataStructures: ["Array", "Memoization"],
    signals: ["count numbers in range", "digit sum", "divisible by", "palindrome number", "digits constraint"],
    complexity: "O(digits × states × transition)",
    level: "Advanced",
    problemCount: 300,
    status: "ready",
  },
  {
    slug: "shortest-path",
    name: "Shortest Path",
    emoji: "🗺️",
    description: "Dijkstra (non-negative weights), Bellman-Ford (negative weights, detect negative cycles), Floyd-Warshall (all-pairs), 0-1 BFS (edge weights 0 or 1, deque).",
    dataStructures: ["AdjacencyList", "PriorityQueue", "Queue", "Deque"],
    signals: ["shortest path weighted", "negative edges", "all pairs shortest", "0-1 weights", "minimum cost"],
    complexity: "O((V+E) log V) Dijkstra, O(VE) Bellman-Ford, O(V³) Floyd",
    level: "Advanced",
    problemCount: 600,
    status: "needs mapping",
  },
  {
    slug: "minimum-spanning-tree",
    name: "Minimum Spanning Tree",
    emoji: "🌉",
    description: "Kruskal (sort edges, DSU), Prim (priority queue from a start node), Borůvka. MST verification, second-best MST. Used in network design, clustering.",
    dataStructures: ["DSU", "PriorityQueue", "EdgeList"],
    signals: ["connect all nodes with min cost", "network design", "MST"],
    complexity: "O(E log E) Kruskal, O(E log V) Prim",
    level: "Advanced",
    problemCount: 200,
    status: "needs mapping",
  },
  {
    slug: "segment-tree",
    name: "Segment Tree",
    emoji: "🌱",
    description: "Tree data structure for range queries and point updates in O(log n). Can be extended to range updates with lazy propagation. GCD queries, range sum, range min/max, range assignment.",
    dataStructures: ["SegmentTree", "Array", "LazyPropagation"],
    signals: ["range query", "point update", "range sum/min/max/gcd", "range update offline", "O(log n) query"],
    complexity: "O(log n) per query/update, O(n) build",
    level: "Advanced",
    problemCount: 400,
    status: "needs mapping",
  },
  {
    slug: "fenwick-tree-bit",
    name: "Fenwick Tree / BIT",
    emoji: "🌲",
    description: "Array-based range sum data structure with point updates. Simpler than segment tree but limited to prefix operations. Inversion count, LIS count, order statistics, frequency queries.",
    dataStructures: ["FenwickTree", "Array"],
    signals: ["prefix sum dynamic", "inversion count", "point update prefix query", "LIS with count"],
    complexity: "O(log n) per query/update",
    level: "Advanced",
    problemCount: 300,
    status: "needs mapping",
  },
  {
    slug: "string-matching",
    name: "String Matching",
    emoji: "🔍",
    description: "Find all occurrences of a pattern in text. KMP (LPS prefix function, O(n+m)), Rabin-Karp (rolling hash), Z-algorithm (Z-array). LPS tells you where to resume after a mismatch.",
    dataStructures: ["Array", "String"],
    signals: ["find pattern in text", "string matching", "count occurrences", "shortest palindrome", "repeated substring"],
    complexity: "O(n + m) KMP/Z, O(n) average Rabin-Karp",
    level: "Advanced",
    problemCount: 400,
    status: "needs mapping",
  },
  {
    slug: "rolling-hash",
    name: "Rolling Hash",
    emoji: "#️⃣",
    description: "Hash a substring in O(1) after O(n) preprocessing using polynomial rolling hash. Compare substrings without O(L) comparison. Double hash to avoid collisions. Used with binary search for longest common substring.",
    dataStructures: ["Array", "BigInt"],
    signals: ["substring comparison O(1)", "longest common substring", "palindrome substring via hash", "duplicate substring"],
    complexity: "O(n) precompute, O(1) hash, O(log n) with binary search",
    level: "Advanced",
    problemCount: 250,
    status: "needs mapping",
  },
  {
    slug: "math-number-theory",
    name: "Math / Number Theory",
    emoji: "🔢",
    description: "GCD/LCM (Euclidean), modular arithmetic, prime sieve (Eratosthenes, linear), modular inverse (Fermat, extended Euclid), CRT, Euler's totient, Miller-Rabin primality test, Pollard's Rho factorization.",
    dataStructures: ["Array", "Set"],
    signals: ["prime", "gcd", "modular", "divisible", "factorial", "nCr mod", "coprime", "Chinese remainder"],
    complexity: "Varies — O(√n) to O(log n)",
    level: "Advanced",
    problemCount: 9632,
    status: "needs mapping",
  },
  {
    slug: "simulation",
    name: "Simulation",
    emoji: "🎮",
    description: "Faithfully implement the problem description step by step. No clever algorithm — just careful state management, edge case handling, and faithful translation from spec to code.",
    dataStructures: ["Array", "Matrix", "HashMap", "Queue"],
    signals: ["implement process", "simulate steps", "game simulation", "protocol", "multi-step transformation"],
    complexity: "O(n) or O(m×n) as specified",
    level: "Advanced",
    problemCount: 2000,
    status: "needs mapping",
  },
  {
    slug: "design",
    name: "Design Problems",
    emoji: "🏗️",
    description: "Design a data structure that supports specific operations efficiently. LRU Cache (HashMap + DLL), LFU Cache, Min Stack, Snapshot Array, Time-Based Key-Value Store. Combine multiple data structures intentionally.",
    dataStructures: ["HashMap", "DLL", "Stack", "Heap", "TreeMap"],
    signals: ["design a data structure", "LRU/LFU cache", "min stack", "time-based store", "snapshot array"],
    complexity: "O(1) or O(log n) per operation",
    level: "Advanced",
    problemCount: 500,
    status: "needs mapping",
  },
  {
    slug: "geometry",
    name: "Geometry",
    emoji: "📐",
    description: "Convex hull (Graham scan, monotone chain), line intersection, polygon area (shoelace), point in polygon, rotating calipers for width/diameter of convex polygon.",
    dataStructures: ["Array", "SortedSet"],
    signals: ["convex hull", "polygon area", "line intersection", "closest pair", "point location"],
    complexity: "O(n log n) for hull, O(n) for area",
    level: "Advanced",
    problemCount: 300,
    status: "needs mapping",
  },
  {
    slug: "game-theory",
    name: "Game Theory",
    emoji: "🎲",
    description: "Impartial games, Nim, Grundy numbers (mex), Sprague-Grundy theorem: sum of impartial games = XOR of Grundy numbers. Minimax for adversarial games. DP on game states.",
    dataStructures: ["Array", "Set", "DP Table"],
    signals: ["two player game", "optimal play", "nim", "grundy", "minimax", "winning/losing state"],
    complexity: "O(states × moves) typically",
    level: "Advanced",
    problemCount: 400,
    status: "needs mapping",
  },
]

const LEVEL_COLORS: Record<string, string> = {
  Beginner: "oklch(0.75 0.15 145)",
  Intermediate: "oklch(0.88 0.15 90)",
  Advanced: "oklch(0.80 0.15 345)",
}

const STATUS_BADGES: Record<string, { bg: string; label: string }> = {
  "ready": { bg: "oklch(0.75 0.15 145)", label: "Ready" },
  "needs mapping": { bg: "oklch(0.88 0.15 90)", label: "Needs Mapping" },
  "needs review": { bg: "oklch(0.80 0.15 60)", label: "Needs Review" },
  "advanced / later": { bg: "oklch(0.70 0.15 290)", label: "Advanced / Later" },
}

const DIFFICULTY_ORDER = { Beginner: 0, Intermediate: 1, Advanced: 2 }

// ─── Components ──────────────────────────────────────────────────────────────

function PatternCard({ pattern, index }: { pattern: PatternEntry; index: number }) {
  const delay = index * 30
  const statusBadge = STATUS_BADGES[pattern.status]

  return (
    <Link
      to="/pattern/$slug"
      params={{ slug: pattern.slug }}
      className="group block no-underline"
      style={{ animationDelay: `${delay}ms` }}
    >
      <article
        className="relative h-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-md transition-all duration-200 hover:shadow-lg"
      >
        <div className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xl shadow-sm transition-all duration-200 group-hover:rotate-12">
          {pattern.emoji}
        </div>

        <div className="flex items-start gap-3 mb-3">
          <span
            className="inline-flex items-center rounded-full border border-[var(--border)] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider shadow-sm"
            style={{ backgroundColor: LEVEL_COLORS[pattern.level], color: "white" }}
          >
            {pattern.level}
          </span>
          {statusBadge && (
            <span
              className="inline-flex items-center rounded-full border border-[var(--border)] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider shadow-sm"
              style={{ backgroundColor: statusBadge.bg, color: "white" }}
            >
              {statusBadge.label}
            </span>
          )}
        </div>

        <h3 className="text-sm font-semibold text-[var(--foreground)] tracking-tight">
          {pattern.name}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-[var(--foreground)] opacity-75 line-clamp-2">
          {pattern.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1">
          {pattern.dataStructures.slice(0, 3).map((ds) => (
            <span
              key={ds}
              className="inline-flex items-center rounded-md border border-[var(--border)] bg-[var(--default)] px-1.5 py-0.5 text-[9px] font-bold"
            >
              {ds}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-3">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black tabular-nums text-[var(--foreground)]">
              {pattern.problemCount.toLocaleString()}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--foreground)] opacity-60">
              problems
            </span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--foreground)] opacity-50 transition-opacity group-hover:opacity-100">
            {pattern.complexity}
          </span>
        </div>
      </article>
    </Link>
  )
}

function SectionHeader({ text, color }: { text: string; color: string }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="h-1 flex-1 border-t border-[var(--border)]" />
      <span
        className="text-sm font-semibold text-[var(--foreground)] inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-1.5 text-xs font-black uppercase tracking-widest shadow-sm"
        style={{ backgroundColor: color }}
      >
        {text}
      </span>
      <div className="h-1 flex-1 border-t border-[var(--border)]" />
    </div>
  )
}

function Callout({
  icon,
  color,
  children,
}: {
  icon: string
  color: string
  children: React.ReactNode
}) {
  return (
    <div
      className="my-6 flex items-start gap-3 rounded-xl border border-[var(--border)] p-4 shadow-sm"
      style={{ backgroundColor: color }}
    >
      <span className="mt-0.5 shrink-0 text-lg">{icon}</span>
      <div className="min-w-0 text-sm font-medium leading-relaxed">{children}</div>
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────

function PatternOverviewPage() {
  const [search, setSearch] = useState("")
  const [showAdvanced, setShowAdvanced] = useState(false)

  const filtered = useMemo(() => {
    let list = PATTERNS
    if (!showAdvanced) {
      list = list.filter((p) => p.level !== "Advanced")
    }
    if (!search.trim()) return list
    const q = search.toLowerCase()
    return list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.signals.some((s) => s.includes(q)) ||
        p.dataStructures.some((d) => d.toLowerCase().includes(q)),
    )
  }, [search, showAdvanced])

  const beginnerPatterns = filtered.filter((p) => p.level === "Beginner")
  const intermediatePatterns = filtered.filter((p) => p.level === "Intermediate")
  const advancedPatterns = filtered.filter((p) => p.level === "Advanced")

  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:pt-14">
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="mb-10 rounded-2xl border border-[var(--border)] bg-[oklch(0.88_0.15_90)] p-8 sm:p-10 shadow-lg">
        <div className="flex items-start gap-6 flex-wrap sm:flex-nowrap">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-4xl shadow-md">
            🧩
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-2">Pattern-Based Problem Solving</p>
            <h1 className="text-[clamp(2rem,6vw,3.5rem)] leading-tight text-white">
              DSA Pattern Guide
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-white opacity-80 max-w-2xl">
              Patterns are the skeleton of every algorithm. Learn the skeleton once, and you can
              apply it to hundreds of problems. This guide maps every pattern to the problems in this
              repository — 38,000+ problems, organized by the shape of their solution.
            </p>
          </div>
        </div>
      </section>

      {/* ── Introduction ──────────────────────────────── */}
      <section className="mb-12">
        <SectionHeader text="What Are DSA Patterns?" color="oklch(0.75 0.12 185)" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-md"
          >
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-2">Why Patterns Matter</h3>
            <p className="text-sm leading-relaxed opacity-80">
              Most DSA problems are not truly unique. They are variations of a smaller set of
              structural patterns. When you recognise the pattern behind a problem, you already know
              80% of the solution. The remaining 20% is adapting the template to the specific twist.
            </p>
          </div>
          <div
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-md"
          >
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-2">Patterns &gt; Memorisation</h3>
            <p className="text-sm leading-relaxed opacity-80">
              Nobody remembers 38,000 solutions. But you can remember 40 patterns and derive the
              rest. This is how strong engineers think: they don't brute-force recall solutions, they
              identify the structure of the problem and pick the matching template.
            </p>
          </div>
          <div
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-md"
          >
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-2">One Problem, Multiple Patterns</h3>
            <p className="text-sm leading-relaxed opacity-80">
              Many problems sit at the intersection of multiple patterns. A problem might use
              sliding window for the outer loop and a hash map for the inner state. This guide
              marks primary and secondary pattern assignments, so you see how patterns compose.
            </p>
          </div>
        </div>

        <Callout icon="📌" color="oklch(0.75 0.12 185)">
          <strong>Built from real data.</strong> Every pattern in this guide is mapped against the
          repository's actual problem list — 38,000+ problems across 50+ platforms. This is not a
          generic internet list. If a problem doesn't fit a pattern, the guide says so.
        </Callout>
      </section>

      {/* ── What This Page Is Not ─────────────────────── */}
      <section className="mb-12">
        <SectionHeader text="What This Page Is Not" color="oklch(0.80 0.15 345)" />

        <div className="rounded-xl border border-[var(--border)] bg-[var(--default)] p-6 shadow-md">
          <ul className="space-y-3 text-sm">
            {[
              "This is not the /learn section. /learn is a separate learning path. /pattern is a structural reference map.",
              "This is not a generic copy-pasted list of 14 or 16 patterns from a blog post. The taxonomy comes from this repository's 38,000+ problems.",
              "This is not forcing every problem into exactly one category. Many problems belong to multiple patterns and are tagged accordingly.",
              "This is not a one-page theory dump. Each pattern has its own page with templates, variants, problem mappings, and practice order.",
              "This is not a solved puzzle guide that gives away answers. It teaches you how to think so you can solve unseen problems.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Pattern Taxonomy ─────────────────────────── */}
      <section className="mb-12">
        <SectionHeader text="Pattern Taxonomy" color="oklch(0.75 0.15 145)" />

        <p className="mb-6 text-sm leading-relaxed opacity-80">
          The patterns below are grouped by experience level — not by data structure or topic.
          This is intentional: you should learn patterns in an order that builds on itself.
          Each level assumes comfort with the patterns before it.
        </p>

        {/* Search + Toggle */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search patterns by name, description, or signals..."
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3 pl-11 text-sm text-[var(--foreground)] outline-none transition-all placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
            />
            <svg
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="rounded-lg border border-[var(--border)] bg-[var(--default)] px-3 py-2 text-[10px] font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)]"
            >
              ✕ Clear
            </button>
          )}

          <button
            type="button"
            onClick={() => setShowAdvanced((v) => !v)}
            className={`rounded-lg border border-[var(--border)] px-3 py-2 text-[10px] font-semibold uppercase tracking-wider transition-colors ${showAdvanced ? "bg-[var(--accent)] text-white border-[var(--accent)]" : "bg-[var(--default)] text-[var(--foreground)]"}`}
          >
            {showAdvanced ? "Hide Advanced" : "Show Advanced"}
          </button>
        </div>

        {/* Pattern Grids */}
        {search && filtered.length === 0 ? (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-12 text-center">
            <p className="text-4xl">🔍</p>
            <p className="mt-4 text-base font-bold text-[var(--foreground)]">
              No patterns match "{search}"
            </p>
          </div>
        ) : (
          <>
            {beginnerPatterns.length > 0 && (
              <div className="mb-8">
                <div className="mb-3 flex items-center gap-2">
                  <span
                    className="inline-flex items-center rounded-full border border-[var(--border)] px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider"
                  style={{ backgroundColor: 'oklch(0.75 0.15 145)', color: 'white' }}
                  >
                    Beginner Foundation
                  </span>
                  <span className="text-[11px] font-bold opacity-50">{beginnerPatterns.length} patterns</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {beginnerPatterns.map((p, i) => (
                    <PatternCard key={p.slug} pattern={p} index={i} />
                  ))}
                </div>
              </div>
            )}

            {intermediatePatterns.length > 0 && (
              <div className="mb-8">
                <div className="mb-3 flex items-center gap-2">
                  <span
                    className="inline-flex items-center rounded-full border border-[var(--border)] px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider"
                  style={{ backgroundColor: 'oklch(0.88 0.15 90)', color: '#111' }}
                  >
                    Core Intermediate
                  </span>
                  <span className="text-[11px] font-bold opacity-50">{intermediatePatterns.length} patterns</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {intermediatePatterns.map((p, i) => (
                    <PatternCard key={p.slug} pattern={p} index={i + beginnerPatterns.length} />
                  ))}
                </div>
              </div>
            )}

            {advancedPatterns.length > 0 && (
              <div className="mb-8">
                <div className="mb-3 flex items-center gap-2">
                  <span
                    className="inline-flex items-center rounded-full border border-[var(--border)] px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider"
                  style={{ backgroundColor: 'oklch(0.70 0.15 290)', color: 'white' }}
                  >
                    Advanced
                  </span>
                  <span className="text-[11px] font-bold opacity-50">{advancedPatterns.length} patterns</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {advancedPatterns.map((p, i) => (
                    <PatternCard key={p.slug} pattern={p} index={i} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </section>

      {/* ── Visual Guide ──────────────────────────────── */}
      <section className="mb-12">
        <SectionHeader text="Pattern Decision Tree" color="oklch(0.70 0.15 290)" />

        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 overflow-x-auto">
          <pre className="text-xs leading-relaxed font-mono text-[var(--foreground)]" style={{ whiteSpace: "pre" }}>
{`Start with a problem...

├── Is it about counting or looking up something fast?
│   └── ✅ Hash Map / Frequency Counting
│
├── Is the input a sorted array or string?
│   ├── Looking for a pair with a target?           → Two Pointers
│   ├── Looking for a contiguous subarray/substring? → Sliding Window
│   └── Looking for a specific value?                → Binary Search
│
├── Can you precompute something to answer queries fast?
│   └── ✅ Prefix Sum, Difference Array, Rolling Hash
│
├── Does the problem ask for all permutations/combinations/subsets?
│   └── ✅ Backtracking
│
├── Is it a tree?
│   ├── Need to process level-by-level?              → Tree BFS
│   ├── Need child results before parent decision?   → Tree DFS (post-order)
│   ├── Need sorted order from BST?                  → Tree DFS (in-order)
│   └── Path query between two nodes?                → LCA / Binary Lifting
│
├── Is it a graph?
│   ├── Shortest path in unweighted graph?           → Graph BFS
│   ├── Shortest path in weighted graph?             → Dijkstra
│   ├── Connected components?                        → Graph DFS or DSU
│   ├── Cycle detection?                             → DFS + vis/path or DSU
│   ├── Topological order?                           → Kahn's / DFS post-order
│   ├── All-pairs shortest?                          → Floyd-Warshall
│   └── Minimum cost to connect all?                 → MST (Kruskal/Prim)
│
├── Is it a linked list?
│   ├── Detect cycle / find middle?                  → Fast & Slow Pointers
│   ├── Reverse / merge / remove?                    → Dummy Node + Iteration
│   └── Palindrome / reorder?                        → Slow/Fast + Reverse
│
├── Does it ask for max/min under a constraint?
│   ├── Choose or skip items?                        → DP or Greedy
│   ├── Can you check feasibility of a candidate?    → Binary Search on Answer
│   └── Locally optimal choice works?                → Greedy
│
├── Is there optimal substructure with overlapping subproblems?
│   └── ✅ Dynamic Programming (1D → 2D → Tree → etc.)
│
├── Does it involve next/previous greater/smaller?
│   └── ✅ Monotonic Stack
│
├── Sliding window with min/max tracking?
│   └── ✅ Monotonic Queue / Deque
│
├── Top K, median, or merge K sorted?
│   └── ✅ Heap / Priority Queue
│
├── String matching / prefix search?
│   └── ✅ Trie, KMP, Z-Algorithm, Rolling Hash
│
├── Range queries with updates?
│   └── ✅ Segment Tree or Fenwick Tree
│
├── Range queries without updates?
│   └── ✅ Prefix Sum, Difference Array, Sparse Table
│
├── Bit-level operations / subset enumeration?
│   └── ✅ Bit Manipulation, Bitmask DP
│
├── Game with two optimal players?
│   └── ✅ Game Theory / Minimax / Grundy
│
└── None of the above?
    └── Could be Simulation, Ad-hoc, Math, or a combination of patterns`}
          </pre>
        </div>

        <Callout icon="💡" color="oklch(0.88 0.15 90 / 40%)">
          <strong>Visualisation todo:</strong> Each pattern page should eventually have an animated
          diagram showing how the algorithm moves through data — sliding window movement, pointer
          traversal, recursion tree, graph BFS expansion, DP state transitions, etc. These will be
          added as the site grows.
        </Callout>
      </section>

      {/* ── How to Use This Guide ─────────────────────── */}
      <section className="mb-12">
        <SectionHeader text="How to Use This Guide" color="oklch(0.65 0.15 240)" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { num: "01", title: "Pick a Pattern", desc: "Start with a Beginner pattern (hash map, two pointers, sliding window). Read the pattern page — understand the mental model, not just the code." },
            { num: "02", title: "Learn the Template", desc: "Each pattern has a core template. This is the skeleton. Understand why each line exists, what invariant it maintains, and when the template breaks." },
            { num: "03", title: "Study the Variants", desc: "Templates have variants. The core idea stays the same but the details shift — fixed vs dynamic window, opposite vs same-direction pointers. Each variant opens a new class of problems." },
            { num: "04", title: "Solve the Mapped Problems", desc: "Each pattern page lists problems from this repository that fit the template and each variant. Solve them in the recommended order: beginner → intermediate → advanced." },
            { num: "05", title: "Track Your Coverage", desc: "Mark which problems you have solved. The goal is not to solve every problem — it is to internalise the pattern so thoroughly that new problems feel familiar within seconds." },
            { num: "06", title: "Repeat", desc: "When you get stuck on a new problem, come back to this guide. Find the pattern that matches the shape of your problem. Read the page again. It will make more sense each time." },
          ].map(({ num, title, desc }) => (
            <div
              key={num}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5"
            >
              <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-[var(--border)] bg-[var(--default)] text-xs font-bold text-[var(--foreground)]">
                {num}
              </span>
              <h3 className="text-sm font-semibold text-[var(--foreground)] mt-3">{title}</h3>
              <p className="mt-1 text-xs leading-relaxed opacity-75">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Recommended Learning Roadmap ──────────────── */}
      <section className="mb-12">
        <SectionHeader text="Recommended Learning Roadmap" color="oklch(0.80 0.15 60)" />

        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
          {[
            {
              level: "Beginner Foundation",
              color: "oklch(0.75 0.15 145)",
              patterns: [
                "Hash Map / Frequency Counting",
                "Two Pointers",
                "Sliding Window",
                "Prefix Sum",
                "Sorting-Based Patterns",
                "Stack",
                "Queue",
                "Binary Search",
              ],
              note: "Build the reflexes. These patterns alone can solve ~40% of interview problems. Focus on recognising the signal phrases for each one.",
            },
            {
              level: "Core Intermediate",
              color: "oklch(0.88 0.15 90)",
              patterns: [
                "Linked List Patterns",
                "Recursion",
                "Backtracking",
                "Tree DFS",
                "Tree BFS",
                "Matrix Traversal",
                "Graph DFS",
                "Graph BFS",
                "Heap / Priority Queue",
                "Intervals",
                "Greedy",
              ],
              note: "These are the patterns that separate scripted solutions from genuine problem-solving ability. Trees and graphs appear in ~30% of interviews.",
            },
            {
              level: "Advanced Intermediate",
              color: "oklch(0.80 0.15 345)",
              patterns: [
                "Monotonic Stack",
                "Monotonic Queue / Deque",
                "Binary Search on Answer",
                "Topological Sort",
                "Union-Find / DSU",
                "Trie",
                "Dynamic Programming",
                "Bit Manipulation",
              ],
              note: "These patterns add the sharpest tools to your belt. DP and Union-Find are common at top-tier companies. Monotonic stacks turn intimidating O(n²) problems into clean O(n) walks.",
            },
            {
              level: "Advanced",
              color: "oklch(0.70 0.15 290)",
              patterns: [
                "Knapsack DP",
                "Interval DP",
                "Tree DP",
                "Bitmask DP",
                "Digit DP",
                "Shortest Path (Dijkstra, Bellman-Ford, Floyd-Warshall)",
                "Minimum Spanning Tree",
                "Segment Tree",
                "Fenwick Tree",
                "String Matching (KMP, Z, Rabin-Karp)",
                "Rolling Hash",
                "Math / Number Theory",
                "Geometry",
                "Game Theory",
                "Design Problems",
                "Simulation",
              ],
              note: "These are specialist patterns. Not every interview will need them, but when they do, they separate senior engineers. Learn them if you target top companies or competitive programming.",
            },
          ].map(({ level, color, patterns, note }) => (
            <div key={level} className="mb-6 last:mb-0">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="inline-flex items-center rounded-full border border-[var(--border)] px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider"
                  style={{ backgroundColor: color, color: color === "oklch(0.88 0.15 90)" ? "#111" : "white" }}
                >
                  {level}
                </span>
                <span className="text-[11px] font-bold opacity-50">{patterns.length} patterns</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-1">
                {patterns.map((p) => (
                  <span
                    key={p}
                    className="inline-flex items-center rounded-lg border border-[var(--border)] bg-[var(--default)] px-2.5 py-1 text-[11px] font-medium text-[var(--foreground)]"
                  >
                    {p}
                  </span>
                ))}
              </div>
              <p className="text-xs leading-relaxed opacity-60 italic">{note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Coverage Tracker Plan ──────────────────────── */}
      <section className="mb-12">
        <SectionHeader text="Coverage Tracker Plan" color="oklch(0.65 0.15 15)" />

        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <p className="text-sm leading-relaxed mb-4">
            Every pattern page in this guide maps problems from the repository's 38,000+ problem
            list. The mapping is done incrementally — each pattern article adds its own mappings.
            The tracking table below shows the current state for every pattern.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr>
                  <th className="text-left font-black uppercase tracking-wider p-2 border-b border-[var(--border)]">Pattern</th>
                  <th className="text-left font-semibold uppercase tracking-wider p-2 border-b border-[var(--border)]">Problems</th>
                  <th className="text-left font-semibold uppercase tracking-wider p-2 border-b border-[var(--border)]">Level</th>
                  <th className="text-left font-semibold uppercase tracking-wider p-2 border-b border-[var(--border)]">Status</th>
                  <th className="text-left font-semibold uppercase tracking-wider p-2 border-b border-[var(--border)]">Complexity</th>
                </tr>
              </thead>
              <tbody>
                {PATTERNS.sort((a, b) => {
                  const lvl = DIFFICULTY_ORDER[a.level] - DIFFICULTY_ORDER[b.level]
                  if (lvl !== 0) return lvl
                  return b.problemCount - a.problemCount
                }).map((p) => {
                  const badge = STATUS_BADGES[p.status]
                  return (
                    <tr key={p.slug} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--default)]">
                      <td className="p-2">
                        <Link
                          to="/pattern/$slug"
                          params={{ slug: p.slug }}
                          className="font-semibold text-[var(--foreground)] no-underline hover:underline"
                        >
                          {p.emoji} {p.name}
                        </Link>
                      </td>
                      <td className="p-2 tabular-nums font-semibold">{p.problemCount.toLocaleString()}</td>
                      <td className="p-2">
                        <span
                          className="inline-flex items-center rounded-full border border-[var(--border)] px-2 py-0.5 text-[9px] font-bold text-white"
                          style={{ backgroundColor: LEVEL_COLORS[p.level] }}
                        >
                          {p.level}
                        </span>
                      </td>
                      <td className="p-2">
                        {badge && (
                          <span
                            className="inline-flex items-center rounded-full border border-[var(--border)] px-2 py-0.5 text-[9px] font-bold text-white"
                            style={{ backgroundColor: badge.bg }}
                          >
                            {badge.label}
                          </span>
                        )}
                      </td>
                      <td className="p-2 font-mono text-[10px] opacity-70">{p.complexity}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-4 rounded-lg border border-[var(--border)] bg-[oklch(0.88_0.15_90_/_30%)] p-4 text-xs leading-relaxed">
            <strong>How tracking works:</strong> Each pattern article maps problems incrementally.
            A problem is tracked by its URL, primary pattern, secondary patterns, template variant,
            and last-reviewed date. The goal is not to map all 38,000+ problems instantly — it is to
            build reliable coverage gradually while writing each pattern article. Patterns marked
            "needs mapping" have not yet had their problem mapping written. Patterns marked "ready"
            have their mapping started or completed.
          </div>
        </div>
      </section>

      {/* ── Understanding Pattern Statuses ─────────────── */}
      <section className="mb-12">
        <SectionHeader text="Pattern Status Guide" color="oklch(0.70 0.15 290)" />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { badge: "Ready", bg: "oklch(0.75 0.15 145)", desc: "Pattern article is written with templates, variants, and problem mappings. Ready to study." },
            { badge: "Needs Mapping", bg: "oklch(0.88 0.15 90)", desc: "Pattern article structure exists but problem-to-pattern mapping from the repository is not yet done." },
            { badge: "Needs Review", bg: "oklch(0.80 0.15 60)", desc: "Pattern has initial mapping but needs verification. Some problems may be incorrectly assigned." },
            { badge: "Advanced / Later", bg: "oklch(0.70 0.15 290)", desc: "Pattern is advanced and planned for a later pass. Not a priority for the current phase." },
          ].map(({ badge, bg, desc }) => (
            <div
              key={badge}
              className="rounded-xl border border-[var(--border)] p-4"
              style={{ backgroundColor: bg, color: bg === "oklch(0.88 0.15 90)" ? "#111" : "white" }}
            >
              <span className="text-[10px] font-black uppercase tracking-wider">{badge}</span>
              <p className="mt-1 text-xs leading-relaxed opacity-80">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Next Step ──────────────────────────────────── */}
      <section className="rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--surface)] to-[var(--surface-secondary)] p-8 sm:p-10">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold mb-3 text-[var(--foreground)]">
            Ready to Start?
          </h2>
          <p className="text-sm leading-relaxed opacity-80 mb-6">
            The best place to start is <strong>Two Pointers</strong>. It is beginner-friendly,
            builds foundational thinking about indices and invariants, and directly leads into
            Sliding Window and Fast-Slow Pointer patterns. Every pattern page follows the same
            structure: mental model → template → variants → problem mappings.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/pattern/$slug"
              params={{ slug: "two-pointers" }}
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--default)] px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)]"
            >
              <span>👆</span>
              <span>Start with Two Pointers</span>
            </Link>
            <Link
              to="/pattern/$slug"
              params={{ slug: "sliding-window" }}
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--accent)]/50"
            >
              <span>🪟</span>
              <span>Or Sliding Window</span>
            </Link>
          </div>
          <p className="mt-4 text-xs leading-relaxed opacity-60">
            The next pattern article will be written under <code className="rounded bg-[var(--default)] px-1 py-0.5 font-mono text-[11px]">/pattern/&lt;slug&gt;</code>.
            Each article one at a time, starting with the pattern you choose above.
          </p>
        </div>
      </section>
    </main>
  )
}
