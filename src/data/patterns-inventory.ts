// ─── Pattern Inventory — 8 parts, 171+ chapters, structured metadata ─────────

import { topics } from './topics'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PatternVariation {
  name: string
  description: string
  templateSnippet: string
  minChange: string
  problemCountEstimate: number
  keyConceptKeywords?: string[]
}

export interface PatternInventoryEntry {
  slug: string
  title: string
  emoji: string
  tagline: string
  topicSlug: string
  problemCount: number
  variations?: PatternVariation[]
}

export interface PatternPart {
  part: string
  color: string
  patterns: PatternInventoryEntry[]
}

// ─── Lookup helpers ────────────────────────────────────────────────────────────

const problemCounts: Record<string, number> = {}
for (const t of topics) {
  problemCounts[t.slug] = t.count
}

// (static structure — entries are hand-curated from article metadata)

// ─── Sliding Window Variations ────────────────────────────────────────────────

const slidingWindowVariations: PatternVariation[] = [
  {
    name: 'Fixed window',
    description: 'Window size k is given. Slide one step at a time: add nums[j], remove nums[j-k]. O(n).',
    templateSnippet: `let sum = 0;
for (let i = 0; i < k; i++) sum += nums[i];
let ans = sum;
for (let i = k; i < n; i++) {
    sum += nums[i];        // add incoming
    sum -= nums[i - k];    // remove outgoing
    ans = Math.max(ans, sum);
}`,
    minChange: 'Only the "add/remove" logic changes (what stat you track: sum, freq, distinct count, etc.). Everything else stays.',
    problemCountEstimate: 120,
    keyConceptKeywords: [
      'fixed-size',
      'size k',
      'fixed',
      'first negative',
      'max average',
      'distinct count',
      'pattern matching',
      'k scores',
    ],
  },
  {
    name: 'Dynamic longest valid',
    description: 'Expand j, shrink i while invalid, track max(j-i+1) over all valid windows.',
    templateSnippet: `let i = 0, j = 0, ans = 0;
while (j < n) {
    add(nums[j]);                          // expand
    while (!isValid()) remove(nums[i++]);  // shrink
    ans = Math.max(ans, j - i + 1);        // track max
    j++;
}`,
    minChange: 'What add/remove do (sum, freq map, bitmask). The validity predicate. That is the entire variation.',
    problemCountEstimate: 200,
    keyConceptKeywords: [
      'longest',
      'max length',
      'maximum',
      'variable-size',
      'at most k',
      'k distinct',
      'k flips',
      'sum bound',
      'distinct',
      'replacement',
      'continuous',
      'common substring',
    ],
  },
  {
    name: 'Dynamic shortest valid',
    description: 'Expand j until valid, then greedily shrink i while still valid, tracking min(j-i+1).',
    templateSnippet: `let i = 0, ans = Infinity;
for (let j = 0; j < n; j++) {
    add(nums[j]);
    while (isValid()) {
        ans = Math.min(ans, j - i + 1);
        remove(nums[i++]);
    }
}`,
    minChange: 'Same as longest but ans = Math.min and shrink happens while valid (not while invalid). Swap the predicate mentality.',
    problemCountEstimate: 80,
    keyConceptKeywords: [
      'minimum',
      'shortest',
      'min length',
      'smallest',
      'min cover',
      'min window',
    ],
  },
  {
    name: 'At-most-k + exact-count formula',
    description: 'count(exactly k) = count(atMost k) - count(atMost k-1). Essential when input has zeros (direct shrink is ambiguous).',
    templateSnippet: `const atMost = (goal) => {
    if (goal < 0) return 0;
    let i = 0, j = 0, ans = 0, sum = 0;
    while (j < n) {
        sum += nums[j];
        while (sum > goal) sum -= nums[i++];
        ans += j - i + 1;      // count windows ≤ goal ending at j
        j++;
    }
    return ans;
};
return atMost(k) - atMost(k - 1);`,
    minChange: 'What sum tracks (parity, distinct chars, frequency reaching threshold). The formula wrapper stays identical.',
    problemCountEstimate: 60,
    keyConceptKeywords: [
      'exactly k',
      'at most',
      'exactly',
      'atMost',
      'nice subarray',
      'binary subarray',
      'subarray with exactly',
      'count of subarray',
    ],
  },
  {
    name: 'ans += n - j (right extensions)',
    description: 'When window [i..j] first becomes valid, ALL extensions to the right are also valid. Count them all at once.',
    templateSnippet: `while (j < n) {
    add(nums[j]);
    while (isValid()) {
        ans += n - j;          // this window + every longer one ending ≥ j
        remove(nums[i++]);
    }
    j++;
}`,
    minChange: 'ans += n - j instead of ans += j - i + 1. The latter counts left-shrinking prefixes; the former counts right-extending suffixes.',
    problemCountEstimate: 80,
    keyConceptKeywords: [
      'count subarray',
      'right extension',
      'n - j',
      'max appears at least k',
      'every longer',
      'counting window',
    ],
  },
]

// ─── Two Pointers Variations ──────────────────────────────────────────────────

const twoPointersVariations: PatternVariation[] = [
  {
    name: 'Opposite direction (meet in middle)',
    description: 'Left at start, right at end. Move toward each other based on condition. Sorted array 2-sum, container with most water.',
    templateSnippet: `let i = 0, j = n - 1, ans = 0;
while (i < j) {
    const current = condition(nums[i], nums[j]);
    ans = Math.max(ans, current);
    if (shouldMoveLeft(nums[i], nums[j])) i++;
    else j--;
}`,
    minChange: 'The condition and which pointer to move. For 2-sum: if sum < target, move left; else move right. For max area: move the smaller pointer.',
    problemCountEstimate: 100,
    keyConceptKeywords: [
      'two sum',
      '2-sum',
      '3sum',
      'three sum',
      'container with most water',
      'sorted two pointer',
      'opposite direction',
      'meet in middle',
    ],
  },
  {
    name: 'Fast and slow (Floyd\'s cycle detection)',
    description: 'Slow moves 1 step, fast moves 2 steps. If there\'s a cycle, they meet. Then find cycle start: reset one to head, move both at same speed.',
    templateSnippet: `// Phase 1: Detect cycle
let slow = head, fast = head;
while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) break;
}
if (!fast || !fast.next) return null;  // no cycle

// Phase 2: Find cycle start
slow = head;
while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
}
return slow;`,
    minChange: 'The "meeting point" proof is the magic. After meeting, distance from head to cycle start = distance from meeting point to cycle start when moving same speed.',
    problemCountEstimate: 40,
    keyConceptKeywords: [
      'cycle detection',
      'floyd',
      'tortoise and hare',
      'fast slow',
      'happy number',
      'linked list cycle',
      'duplicate number',
    ],
  },
  {
    name: 'Three-way partition (Dutch National Flag)',
    description: 'Partition array into three regions: elements < pivot, == pivot, > pivot. One pass with three pointers.',
    templateSnippet: `let low = 0, mid = 0, high = n - 1;
while (mid <= high) {
    if (nums[mid] === 0) {
        [nums[low], nums[mid]] = [nums[mid], nums[low]];
        low++; mid++;
    } else if (nums[mid] === 1) {
        mid++;
    } else {
        [nums[mid], nums[high]] = [nums[high], nums[mid]];
        high--;
    }
}`,
    minChange: 'The comparison values (0, 1, 2 in DNF) and what to do in each branch. The three-pointer architecture: low/mid/high with mid doing the scan.',
    problemCountEstimate: 30,
    keyConceptKeywords: [
      'dutch national flag',
      'three-way partition',
      'sort colors',
      'three partition',
      '0 1 2 sort',
    ],
  },
  {
    name: 'Merge sorted arrays (in-place)',
    description: 'Two pointers reading from sorted regions, one pointer writing. Often work backwards to avoid overwriting.',
    templateSnippet: `// Merge nums1 (size m + n with n trailing zeros) and nums2 (size n)
let i = m - 1, j = n - 1, k = m + n - 1;
while (i >= 0 && j >= 0) {
    nums1[k--] = nums1[i] > nums2[j] ? nums1[i--] : nums2[j--];
}
while (j >= 0) nums1[k--] = nums2[j--];`,
    minChange: 'Working backwards is the key insight. Which arrays get read from, which gets written to. The boundary conditions after one pointer runs out.',
    problemCountEstimate: 50,
    keyConceptKeywords: [
      'merge sorted',
      'merge two sorted',
      'in-place merge',
      'merge from end',
    ],
  },
]

// ─── Binary Search Variations ─────────────────────────────────────────────────

const binarySearchVariations: PatternVariation[] = [
  {
    name: 'Standard binary search (find target)',
    description: 'Find exact target in sorted array. Return index or -1. The foundation pattern.',
    templateSnippet: `let lo = 0, hi = n - 1;
while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
}
return -1;`,
    minChange: 'The comparison and how you adjust lo/hi. For exact match: return on equality, else shrink the search space based on comparison.',
    problemCountEstimate: 150,
    keyConceptKeywords: [
      'standard binary',
      'find target',
      'exact match',
      'search in sorted',
    ],
  },
  {
    name: 'Lower bound (first >= target)',
    description: 'Find the first position where element >= target. Insert position for target in sorted array.',
    templateSnippet: `let lo = 0, hi = n;
while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (nums[mid] >= target) hi = mid;
    else lo = mid + 1;
}
return lo;`,
    minChange: 'Two critical changes: (1) hi starts at n (not n-1), (2) loop condition is lo < hi (not <=), (3) hi = mid (not mid-1) when condition met.',
    problemCountEstimate: 120,
    keyConceptKeywords: [
      'lower bound',
      'first >=',
      'insert position',
      'bisect left',
    ],
  },
  {
    name: 'Upper bound (first > target)',
    description: 'Find the first position where element > target. Together with lower bound, gives count of target occurrences.',
    templateSnippet: `let lo = 0, hi = n;
while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (nums[mid] > target) hi = mid;
    else lo = mid + 1;
}
return lo;`,
    minChange: 'Change >= to > from lower bound. count(target) = upper_bound(target) - lower_bound(target). Same "lo < hi" architecture.',
    problemCountEstimate: 100,
    keyConceptKeywords: [
      'upper bound',
      'first >',
      'bisect right',
    ],
  },
  {
    name: 'Binary search on answer (feasibility check)',
    description: 'When the answer space is monotonic, binary search the answer and check feasibility. "Can we achieve at least X?"',
    templateSnippet: `const isFeasible = (value) => {
    // Check if it's possible to achieve 'value'
    let count = 0, current = 0;
    for (const x of nums) {
        current += x;
        if (current >= value) { count++; current = 0; }
    }
    return count >= k;
};

let lo = minPossible, hi = maxPossible, ans = -1;
while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (isFeasible(mid)) {
        ans = mid;
        lo = mid + 1;  // try higher
    } else {
        hi = mid - 1;  // need lower
    }
}
return ans;`,
    minChange: 'The feasibility function is what varies entirely. The binary search skeleton stays identical: find the maximum (or minimum) value that satisfies the feasibility predicate.',
    problemCountEstimate: 180,
    keyConceptKeywords: [
      'feasibility',
      'binary search on answer',
      'minimize maximum',
      'maximize minimum',
      'koko eating',
      'capacity to ship',
      'split array',
      'search answer',
    ],
  },
  {
    name: 'Rotated sorted array (search in rotated)',
    description: 'One side is always sorted. Check which side is sorted, then decide which half to search. Leverages "at least one half is always sorted" property.',
    templateSnippet: `let lo = 0, hi = n - 1;
while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (nums[mid] === target) return mid;
    
    // Left side is sorted
    if (nums[lo] <= nums[mid]) {
        if (target >= nums[lo] && target < nums[mid]) hi = mid - 1;
        else lo = mid + 1;
    }
    // Right side is sorted
    else {
        if (target > nums[mid] && target <= nums[hi]) lo = mid + 1;
        else hi = mid - 1;
    }
}
return -1;`,
    minChange: 'The "which side is sorted" check (nums[lo] <= nums[mid]). Then check if target lies in the sorted range. If yes, go there; if no, go to the other half.',
    problemCountEstimate: 60,
    keyConceptKeywords: [
      'rotated sorted',
      'search rotated',
      'find minimum rotated',
      'rotated array',
    ],
  },
]

// ─── Dynamic Programming Variations ───────────────────────────────────────────

const dpVariations: PatternVariation[] = [
  {
    name: '1D DP (Fibonacci-style)',
    description: 'dp[i] depends only on dp[i-1] and/or dp[i-2]. Often can be space-optimized to O(1). Climbing stairs, house robber, min cost climbing.',
    templateSnippet: `// dp[i] = answer for first i elements
const dp = new Array(n + 1).fill(0);
dp[0] = base0;
dp[1] = base1;
for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];  // recurrence varies
}
return dp[n];`,
    minChange: 'The recurrence (dp[i] = ...). The base cases. Sometimes you need to think: "what decision do I make at position i?"',
    problemCountEstimate: 200,
  },
  {
    name: '1D DP with O(1) space optimization',
    description: 'When dp[i] only needs dp[i-1] and dp[i-2], use variables instead of array. Same logic, better space complexity.',
    templateSnippet: `if (n === 0) return base0;
if (n === 1) return base1;
let prev2 = base0;  // dp[i-2]
let prev1 = base1;  // dp[i-1]
let current = 0;
for (let i = 2; i <= n; i++) {
    current = prev1 + prev2;  // recurrence
    prev2 = prev1;
    prev1 = current;
}
return prev1;`,
    minChange: 'Replace dp array with 2-3 variables. Track only what you need for the next computation. prev2, prev1, current pattern.',
    problemCountEstimate: 150,
  },
  {
    name: 'Grid DP (2D paths)',
    description: 'dp[i][j] = answer for cell (i,j). Usually: dp[i][j] = dp[i-1][j] + dp[i][j-1] for paths from top-left to bottom-right.',
    templateSnippet: `// dp[i][j] = number of ways to reach (i,j)
const dp = Array(m).fill(0).map(() => Array(n).fill(0));
// Base: first row and first column
for (let j = 0; j < n; j++) dp[0][j] = 1;
for (let i = 0; i < m; i++) dp[i][0] = 1;
// Fill rest
for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
}
return dp[m - 1][n - 1];`,
    minChange: 'The recurrence: usually min or max or sum of coming from top or left. Obstacles? Set dp[i][j] = 0 when blocked. Need min path sum? Use Math.min.',
    problemCountEstimate: 120,
  },
  {
    name: 'Subset / Knapsack 0/1',
    description: 'Choose or not choose each item. 2D dp: dp[i][w] = max value using first i items with capacity w. Space-optimizable to 1D (reverse loop).',
    templateSnippet: `// 2D version
const dp = Array(n + 1).fill(0).map(() => Array(capacity + 1).fill(0));
for (let i = 1; i <= n; i++) {
    const w = weights[i - 1], v = values[i - 1];
    for (let j = 0; j <= capacity; j++) {
        if (w > j) dp[i][j] = dp[i - 1][j];  // can't take
        else dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - w] + v); // skip vs take
    }
}

// 1D optimized (IMPORTANT: reverse j loop!)
const dp = Array(capacity + 1).fill(0);
for (let i = 0; i < n; i++) {
    const w = weights[i], v = values[i];
    for (let j = capacity; j >= w; j--) {  // REVERSE!
        dp[j] = Math.max(dp[j], dp[j - w] + v);
    }
}`,
    minChange: 'The decision: take or not take. 1D optimization: iterate j backwards to prevent reusing the same item multiple times (that would be unbounded knapsack).',
    problemCountEstimate: 150,
  },
  {
    name: 'Interval DP (dp over subarrays)',
    description: 'dp[l][r] = answer for subarray [l..r]. Solve smaller intervals first, then build up larger ones. Burst balloons, palindrome partitioning, matrix chain.',
    templateSnippet: `// dp[l][r] = answer for nums[l..r]
const dp = Array(n).fill(0).map(() => Array(n).fill(0));
// Base: length 1 intervals
for (let i = 0; i < n; i++) dp[i][i] = baseValue;
// Fill by interval length: 2, 3, ..., n
for (let len = 2; len <= n; len++) {
    for (let l = 0; l + len <= n; l++) {
        const r = l + len - 1;
        dp[l][r] = initialValue;
        // Try all possible split points k in [l..r)
        for (let k = l; k < r; k++) {
            const current = dp[l][k] + dp[k + 1][r] + mergeCost;
            dp[l][r] = Math.min(dp[l][r], current);  // or Math.max
        }
    }
}
return dp[0][n - 1];`,
    minChange: 'The outer loop by interval length (not position). The split loop k between l and r. How to combine left and right results plus any merge cost.',
    problemCountEstimate: 80,
  },
  {
    name: 'LIS (Longest Increasing Subsequence)',
    description: 'Two approaches: (1) O(n²) DP: dp[i] = LIS ending at i, (2) O(n log n) patience sorting with binary search.',
    templateSnippet: `// O(n²) DP
const dp = Array(n).fill(1);
let ans = 1;
for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
        if (nums[j] < nums[i]) {
            dp[i] = Math.max(dp[i], dp[j] + 1);
        }
    }
    ans = Math.max(ans, dp[i]);
}

// O(n log n) Patience Sorting
const tails = [];
for (const x of nums) {
    let lo = 0, hi = tails.length;
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (tails[mid] < x) lo = mid + 1;
        else hi = mid;
    }
    if (lo === tails.length) tails.push(x);
    else tails[lo] = x;
}
return tails.length;`,
    minChange: 'The comparison: strictly increasing (nums[j] < nums[i]) vs non-decreasing (nums[j] <= nums[i]). The O(n log n) version uses lower_bound on the tails array.',
    problemCountEstimate: 100,
  },
]

// ─── Graph Variations ──────────────────────────────────────────────────────────

const graphVariations: PatternVariation[] = [
  {
    name: 'BFS (shortest path in unweighted graph)',
    description: 'Level-by-level traversal using queue. Gives shortest path in unweighted graph. Track visited + distance array.',
    templateSnippet: `const dist = Array(n).fill(-1);
const q = [start];
dist[start] = 0;

while (q.length > 0) {
    const u = q.shift();
    for (const v of adj[u]) {
        if (dist[v] === -1) {
            dist[v] = dist[u] + 1;
            q.push(v);
        }
    }
}
return dist;`,
    minChange: 'What information you track at each node (distance, parent, visited). How you build the adjacency list. For grid: use dr/dc arrays for neighbor iteration.',
    problemCountEstimate: 250,
    keyConceptKeywords: [
      'bfs',
      'breadth first',
      'shortest path unweighted',
      'level order',
      'grid bfs',
      'nearest exit',
      'ocean view',
    ],
  },
  {
    name: 'Multi-source BFS',
    description: 'Enqueue ALL sources at level 0 before starting BFS. Each level = one unit of distance from ANY source. Rotten oranges, walls and gates.',
    templateSnippet: `const dist = Array(m).fill(0).map(() => Array(n).fill(Infinity));
const q = [];

// Enqueue ALL sources first
for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
        if (isSource(grid[r][c])) {
            dist[r][c] = 0;
            q.push([r, c, 0]);
        }
    }
}

const dr = [-1, 0, 1, 0], dc = [0, 1, 0, -1];
while (q.length > 0) {
    const [r, c, d] = q.shift();
    for (let i = 0; i < 4; i++) {
        const nr = r + dr[i], nc = c + dc[i];
        if (nr >= 0 && nr < m && nc >= 0 && nc < n && dist[nr][nc] > d + 1) {
            dist[nr][nc] = d + 1;
            q.push([nr, nc, d + 1]);
        }
    }
}`,
    minChange: 'The "enqueue all sources first" is the only change from standard BFS. The rest is identical. This finds shortest distance from ANY source, not one specific source.',
    problemCountEstimate: 60,
    keyConceptKeywords: [
      'multi-source',
      'rotten oranges',
      'walls and gates',
      '01 matrix',
      'distance from nearest',
      'as far from land',
    ],
  },
  {
    name: 'DFS (connected components, cycle detection)',
    description: 'Recursive or iterative depth-first traversal. Mark visited on entry. Used for: connected components, cycle detection, topological sort, maze exploration.',
    templateSnippet: `const visited = Array(n).fill(false);
let componentCount = 0;

const dfs = (u) => {
    if (visited[u]) return;
    visited[u] = true;
    for (const v of adj[u]) {
        if (!visited[v]) dfs(v);
    }
};

for (let i = 0; i < n; i++) {
    if (!visited[i]) {
        componentCount++;
        dfs(i);
    }
}
return componentCount;`,
    minChange: 'What you do in the DFS: count components, check for cycles (track parent or recursion stack), build topological order (post-order), or record entry/exit times.',
    problemCountEstimate: 280,
    keyConceptKeywords: [
      'dfs',
      'depth first',
      'connected components',
      'cycle detection',
      'island',
      'number of provinces',
      'flood fill',
    ],
  },
  {
    name: 'Union-Find / DSU (Disjoint Set Union)',
    description: 'Two operations: find(u) with path compression, union(u, v) with union-by-size/rank. Near-constant time per operation. Dynamic connectivity.',
    templateSnippet: `class DSU {
    constructor(n) {
        this.parent = Array(n).fill(0).map((_, i) => i);
        this.size = Array(n).fill(1);
    }
    
    find(u) {
        if (this.parent[u] !== u) {
            this.parent[u] = this.find(this.parent[u]);  // path compression
        }
        return this.parent[u];
    }
    
    union(u, v) {
        u = this.find(u);
        v = this.find(v);
        if (u === v) return false;  // already in same set
        // union by size: attach smaller to larger
        if (this.size[u] < this.size[v]) [u, v] = [v, u];
        this.parent[v] = u;
        this.size[u] += this.size[v];
        return true;
    }
}`,
    minChange: 'Two optimizations make it O(α(n)) amortized: (1) path compression in find(), (2) union-by-size/rank in union(). The data structure itself is the pattern.',
    problemCountEstimate: 120,
    keyConceptKeywords: [
      'union find',
      'dsu',
      'disjoint set',
      'connected components',
      'redundant connection',
      'accounts merge',
      'is graph bipartite',
    ],
  },
  {
    name: 'Topological Sort (Kahn\'s algorithm)',
    description: 'Linear ordering of DAG vertices where for every edge u→v, u comes before v. Kahn\'s: BFS using in-degree array. Process nodes with in-degree zero.',
    templateSnippet: `const inDegree = Array(n).fill(0);
for (const [u, v] of edges) inDegree[v]++;

const q = [];
for (let i = 0; i < n; i++) {
    if (inDegree[i] === 0) q.push(i);
}

const order = [];
while (q.length > 0) {
    const u = q.shift();
    order.push(u);
    for (const v of adj[u]) {
        inDegree[v]--;
        if (inDegree[v] === 0) q.push(v);
    }
}

if (order.length !== n) return null;  // has cycle
return order;`,
    minChange: 'Track in-degree, process nodes when in-degree becomes zero. If final order size < n, there\'s a cycle. Works on DAGs only; detects cycles implicitly.',
    problemCountEstimate: 80,
    keyConceptKeywords: [
      'topological',
      'kahn',
      'course schedule',
      'dag order',
      'alien dictionary',
      'prerequisites',
    ],
  },
  {
    name: 'Dijkstra\'s algorithm (shortest path weighted)',
    description: 'Shortest path from single source in graph with non-negative edge weights. Priority queue (min-heap) always picks next node with smallest tentative distance.',
    templateSnippet: `const dist = Array(n).fill(Infinity);
dist[start] = 0;

// Priority queue: [distance, node], min-heap by distance
const pq = new MinPriorityQueue({ priority: x => x[0] });
pq.enqueue([0, start]);

while (!pq.isEmpty()) {
    const [d, u] = pq.dequeue().element;
    if (d > dist[u]) continue;  // already found better path
    for (const [v, weight] of adj[u]) {
        if (dist[v] > dist[u] + weight) {
            dist[v] = dist[u] + weight;
            pq.enqueue([dist[v], v]);
        }
    }
}
return dist;`,
    minChange: 'The priority queue ordering (always pick smallest distance). The "if d > dist[u] continue" skip is critical for efficiency when multiple entries for same node exist in heap.',
    problemCountEstimate: 150,
    keyConceptKeywords: [
      'dijkstra',
      'shortest path weighted',
      'priority queue path',
      'min cost path',
      'network delay',
      'cheapest flights',
    ],
  },
]

// ─── Build inventory ──────────────────────────────────────────────────────────

function entry(
  slug: string,
  title: string,
  emoji: string,
  tagline: string,
  topicSlug: string,
  variations?: PatternVariation[],
): PatternInventoryEntry {
  return {
    slug,
    title,
    emoji,
    tagline,
    topicSlug,
    problemCount: problemCounts[topicSlug] ?? 0,
    variations,
  }
}

export const PATTERN_PARTS: PatternPart[] = [
  {
    part: 'Part I — Arrays & Pointers',
    color: 'var(--nb-teal)',
    patterns: [
       entry('two-pointers', 'Two Pointers', '👆', 'Opposite-direction, fast-slow, sliding compare.', 'sliding_window', twoPointersVariations),
       entry('sliding-window', 'Sliding Window', '🪟', 'Turn O(n²) subarray loops into O(n) with a moving window.', 'sliding_window', slidingWindowVariations),
       entry('binary-search', 'Binary Search', '🎯', 'Narrow the search space in half each step — the O(log n) hammer.', 'binary_search', binarySearchVariations),
      entry('prefix-sum', 'Prefix Sum', '➕', 'Precompute running sums for O(1) range queries and subarray counting.', 'dp'),
      entry('two-sum-family', 'Two Sum Family', '💑', 'HashMap-based pair/triple sum lookups. Two Sum, Three Sum, Four Sum, best time to buy/sell.', 'dp'),
      entry('array-tricks', 'Array Tricks', '🧙', 'Cyclic rotation, reversal-based operations, in-place swaps, and the Dutch flag.', 'dp'),
      entry('difference-array', 'Difference Array', '📏', 'O(1) range updates with O(n) reconstruction. Range increment/decrement queries.', 'dp'),
      entry('contribution-technique', 'Contribution Technique', '📊', 'Count how many subarrays each element participates in.', 'dp'),
      entry('binary-search-answer', 'Binary Search on Answer', '🎯', 'When the answer space is monotonic, binary search the answer and check feasibility.', 'dp'),
      entry('permutation-patterns', 'Permutation Patterns', '🔄', 'Next permutation, permutation ranking, generating permutations systematically.', 'dp'),
      entry('word-break-variants', 'Word Break Variants', '🧩', 'Segment strings using dictionary words, with DP and memoization.', 'dp'),
      entry('shortest-supersequence', 'Shortest Common Supersequence', '🧬', 'Shortest string that has two given strings as subsequences.', 'dp'),
      entry('kadane-variants', "Kadane's Algorithm Variants", '📈', 'Maximum subarray sum in O(n), with circular, 2D, and product variants.', 'dp'),
      entry('two-pointer-advanced', 'Two Pointers — Advanced', '👆', 'Multiple pointers, three-way partition, k-sum beyond three.', 'dp'),
      entry('cyclic-sort', 'Cyclic Sort', '🔄', 'Place each number at its correct index in O(n). For problems with numbers 1..n.', 'dp'),
    ],
  },
  {
    part: 'Part II — Linked Structures',
    color: 'var(--nb-blue)',
    patterns: [
      entry('linked-list', 'Linked List', '🔗', 'Reverse, merge, detect cycles, find middle, LRU cache.', 'linked_list'),
      entry('trees', 'Trees', '🌳', 'Binary trees, BSTs, traversals (in/pre/post/level), LCA, diameter.', 'tree'),
      entry('advanced-trees', 'Advanced Trees', '🌲', 'Fenwick tree, segment tree, sqrt decomposition, Mo\'s algorithm, treap.', 'advanced_tree'),
      entry('sparse-table', 'Sparse Table', '📊', 'O(1) range min/max/gcd queries with O(n log n) preprocessing.', 'advanced_tree'),
      entry('segment-tree-lazy', 'Segment Tree with Lazy Propagation', '🌿', 'Range updates and range queries in O(log n). Lazy tags for assignment/additive updates.', 'advanced_tree'),
      entry('cycle-detection', 'Cycle Detection', '♾️', 'Floyd\'s tortoise and hare, Brent\'s algorithm. Cycle in LL, arrays, functional graphs.', 'linked_list'),
      entry('tree-construction', 'Tree Construction', '🏗️', 'Build trees from traversals, serialization, construct BST from preorder.', 'tree'),
      entry('lca', 'Lowest Common Ancestor', '👪', 'Binary lifting, Euler tour + RMQ, tarjan\'s offline LCA.', 'graph'),
      entry('dsu-on-tree', 'DSU on Tree (Sack)', '🎒', 'Small-to-large merging on trees for offline subtree queries in O(n log n).', 'graph'),
      entry('tree-diameter', 'Tree Diameter', '📏', 'Two BFS/DFS technique. Find longest path in any tree. Center(s) of tree.', 'graph'),
      entry('offline-lca', 'Offline LCA', '📝', 'Tarjan\'s offline algorithm for batch LCA queries using DSU.', 'graph'),
      entry('tree-isomorphism', 'Tree Isomorphism', '🔍', 'AHU algorithm, rooted/unrooted tree isomorphism, canonical form.', 'graph'),
      entry('persistent-union-find', 'Persistent Union-Find', '💾', 'Union-find with rollback capability for offline queries.', 'graph'),
      entry('binary-lifting', 'Binary Lifting', '🪜', 'Jump pointers for ancestors, LCA, path queries in O(log n).', 'tree'),
      entry('segment-tree-basics', 'Segment Tree Basics', '🌱', 'Point updates, range queries, building and querying segment trees.', 'tree'),
      entry('tree-path-problems', 'Tree Path Problems', '🛤️', 'Path sum queries, max/min edge on path, path aggregates with binary lifting.', 'tree'),
      entry('iterative-traversal', 'Iterative Tree Traversal', '🔄', 'Morris traversal, stack-based pre/in/post-order without recursion.', 'tree'),
    ],
  },
  {
    part: 'Part III — Hashing & Auxiliary Structures',
    color: 'var(--nb-purple)',
    patterns: [
      entry('heap', 'Heap / Priority Queue', '📚', 'Min/max heap, top-k, median finding, merge k-sorted, Huffman coding.', 'heap'),
      entry('trie', 'Trie', '🔤', 'Prefix tree for dictionary, autocomplete, spell check, IP routing, XOR max pair.', 'trie'),
      entry('monotonic-stack', 'Monotonic Stack', '📊', 'Next greater/smaller element, largest rectangle in histogram, trapping rain water.', 'string'),
      entry('hashmap-patterns', 'Hashmap Patterns', '🗺️', 'Frequency counting, anagram grouping, subarray sum equals k, longest consecutive sequence.', 'dp'),
      entry('stack-queue', 'Stack & Queue', '🗄️', 'Min stack, queue by stacks, circular deque, sliding window max (deque).', 'graph'),
      entry('counting-patterns', 'Counting Patterns', '🔢', 'Counting sort, bucket sort, frequency array, cumulative distribution, pigeonhole.', 'dp'),
      entry('kth-element', 'K-th Element', '🥇', 'Quickselect, median of medians, k-th smallest in sorted matrix, k-th largest in stream.', 'heap'),
      entry('monotonic-queue', 'Monotonic Queue', '📈', 'Deque maintaining monotonic order for sliding window min/max, range min queries.', 'dp'),
      entry('two-heaps', 'Two Heaps', '⚖️', 'Median from data stream, sliding window median, IPO capital, schedule tasks.', 'heap'),
      entry('bracket-sequences', 'Bracket Sequences', '🔣', 'Valid parentheses generation, longest valid parentheses, minimum add to make valid.', 'dp'),
      entry('amortized-patterns', 'Amortized Patterns', '⏳', 'Why O(n) operations can cost O(1) each on average (two-pointer, stack, deque).', 'dp'),
      entry('expression-parsing', 'Expression Parsing', '🧮', 'Shunting yard, recursive descent, prefix/postfix conversion, basic calculator.', 'dp'),
      entry('trie-xor', 'Trie XOR', '⊻', 'Max XOR pair/subarray using binary trie. Properties of XOR on bits.', 'dp'),
      entry('k-way-merge', 'K-Way Merge', '🔀', 'Merge k-sorted arrays/lists, smallest range covering k lists, merge k-sorted iterators.', 'dp'),
    ],
  },
  {
    part: 'Part IV — Core Algorithms',
    color: 'var(--nb-green)',
    patterns: [
       entry('dynamic-programming', 'Dynamic Programming', '🧠', 'Memoization, tabulation, state definition, transitions. The universal hammer for optimal substructure.', 'dp', dpVariations),
       entry('backtracking', 'Backtracking', '🔙', 'Decision tree exploration, pruning, permutations, combinations, subsets, N-queens.', 'backtrack'),
       entry('greedy', 'Greedy', '🏃', 'Make the locally optimal choice at each step. Interval scheduling, coin change, Huffman.', 'greedy'),
       entry('graph', 'Graph', '🕸️', 'BFS, DFS, connected components, bipartite, DAGs, topological sort, SCC.', 'graph', graphVariations),
      entry('shortest-path', 'Shortest Path', '🗺️', 'Dijkstra, Bellman-Ford, Floyd-Warshall, SPFA, 0-1 BFS, A*.', 'graph'),
      entry('bitmask-dp', 'Bitmask DP', '🎭', 'DP over subsets using bitmasks. TSP, assignment, graph covering, state space search.', 'dp'),
      entry('divide-conquer', 'Divide & Conquer', '⚔️', 'Master theorem, merge sort, quick sort, closest pair, maximum subarray (D&C).', 'graph'),
      entry('knapsack-dp', 'Knapsack DP', '🎒', '0/1 knapsack, unbounded knapsack, bounded knapsack, subset sum, coin change II.', 'dp'),
      entry('graph-advanced', 'Graph — Advanced', '🕸️', 'Johnson\'s algorithm, minimum cost flow, Gomory-Hu tree, dominator tree.', 'graph'),
      entry('bipartite', 'Bipartite / Bicoloring', '🎨', 'Check bipartite, maximum bipartite matching, König\'s theorem, Hall\'s theorem.', 'graph'),
      entry('coordinate-compression', 'Coordinate Compression', '🗜️', 'Map sparse coordinates to dense indices for segment trees, BIT, DP.', 'dp'),
      entry('topological-sort', 'Topological Sort', '📋', 'Kahn\'s algorithm, DFS-based sort, course schedule, dependency resolution.', 'graph'),
      entry('minimum-spanning-tree', 'Minimum Spanning Tree', '🌉', "Kruskal's, Prim's, Borůvka's, MST verification, second-best MST.", 'graph'),
      entry('network-flow', 'Network Flow', '🌊', "Ford-Fulkerson, Edmonds-Karp, Dinic's, max-flow min-cut, circulation.", 'graph'),
      entry('meet-in-middle', 'Meet in the Middle', '🤝', 'Split the input in half, solve each half, combine results. Subset sum, knapsack, TSP.', 'dp'),
      entry('convex-hull-trick', 'Convex Hull Trick', '📐', 'DP optimization: line container for max/min queries. Li Chao tree, dynamic CHT.', 'dp'),
      entry('centroid-decomposition', 'Centroid Decomposition', '🎯', 'Decompose tree by centroids for O(log n) path queries. Distance queries, counting paths.', 'graph'),
      entry('line-sweep', 'Line Sweep', '🧹', 'Sweep-line algorithm for interval union, skyline, rectangle area, closest pair.', 'graph'),
      entry('two-sat', '2-SAT', '⚡', 'Implication graph, strongly connected components. Boolean satisfiability with 2 variables per clause.', 'graph'),
      entry('bridges-articulation', 'Bridges & Articulation Points', '🌉', 'Tarjan\'s algorithm for bridges, articulation points, biconnected components.', 'graph'),
      entry('min-cost-flow', 'Min-Cost Max-Flow', '💰', 'Successive shortest augmenting path, potentials, cycle canceling, assignment problem.', 'graph'),
      entry('flow-lower-bounds', 'Flow with Lower Bounds', '⬇️', 'Circulation with demands, feasible flow with lower/upper bounds, max flow with lower bounds.', 'graph'),
      entry('bidirectional-bfs', 'Bidirectional BFS', '↔️', 'Meet-in-the-middle on graphs. Word ladder, 8-puzzle, shortest path in large state spaces.', 'graph'),
      entry('a-star-search', 'A* Search', '⭐', 'Heuristic-guided search for shortest path. Manhattan distance, admissible heuristics.', 'graph'),
      entry('difference-constraints', 'Difference Constraints', '📏', 'System of inequalities reduced to shortest paths. Bellman-Ford on constraint graph.', 'graph'),
      entry('functional-graphs', 'Functional Graphs', '🔄', 'Each node has exactly one outgoing edge. Cycle detection, distance to cycle, Josephus.', 'graph'),
      entry('matching-flow', 'Matching via Flow', '💞', 'Bipartite matching via max flow. Assignment, Hall\'s marriage, vertex cover, edge cover.', 'graph'),
      entry('graph-coloring', 'Graph Coloring', '🎨', 'Chromatic number, greedy coloring, Welsh-Powell, Brooks\' theorem, interval graph coloring.', 'graph'),
      entry('topk-streaming', 'Top-K Streaming', '📊', 'Heavy hitters, count-min sketch, reservoir sampling, streaming median, frequent items.', 'graph'),
      entry('strongly-connected-components', 'Strongly Connected Components', '🔗', "Kosaraju's, Tarjan's algorithm. Condensation DAG, 2-SAT, dominator trees.", 'graph'),
      entry('graph-state-space', 'Graph State Space', '🌀', 'Model problems as state transitions on a graph. Water jug, missionaries and cannibals, 8-puzzle.', 'graph'),
      entry('greedy-intervals', 'Greedy Intervals', '📅', 'Interval scheduling, interval partitioning, meeting rooms, merge intervals, insert interval.', 'graph'),
      entry('constructive-algorithms', 'Constructive Algorithms', '🔨', 'Build a valid solution step by step. Grid construction, permutation construction, array construction.', 'graph'),
      entry('backtracking-pruning', 'Backtracking with Pruning', '✂️', 'Constraint propagation, forward checking, branch and bound, sudoku, cryptarithmetic.', 'graph'),
      entry('multi-source-bfs', 'Multi-Source BFS', '🌊', 'Enqueue all sources at level 0. Rotten oranges, walls and gates, as far from land as possible.', 'graph'),
      entry('grid-islands', 'Grid Islands', '🏝️', 'Number of islands, max area island, number of distinct islands, surrounded regions.', 'graph'),
    ],
  },
  {
    part: 'Part V — Strings, Sequences & Grid',
    color: 'var(--nb-orange)',
    patterns: [
      entry('string-algorithms', 'String Algorithms', '🧵', 'String fundamentals: reverse, rotation, comparison, pattern matching basics, anagram detection.', 'string'),
      entry('string-matching', 'String Matching', '🔍', 'KMP, Rabin-Karp, Z-algorithm. Find pattern in text, count occurrences, shortest palindrome.', 'string'),
      entry('sequences', 'Sequences', '📋', 'LIS, LCS, edit distance, longest arithmetic subsequence, wiggle sequence, Russian doll envelopes.', 'sequences'),
      entry('matrix', 'Matrix / Shape', '🧮', 'Matrix traversal, rotation, spiral, set zeroes, word search, island perimeter, game of life.', 'shape'),
      entry('string-dp', 'String DP', '🧵', 'DP on strings: edit distance, interleaving string, distinct subsequences, decode ways, regular expression.', 'dp'),
      entry('palindrome-patterns', 'Palindrome Patterns', '🔄', 'Longest palindromic substring (Manacher\'s), count palindromes, palindrome partitioning, break a palindrome.', 'dp'),
      entry('string-hashing', 'String Hashing', '#️⃣', 'Rolling hash, Rabin-Karp, double hash, detect plagiarism, longest common substring via binary search + hash.', 'dp'),
      entry('suffix-array', 'Suffix Array', '📚', 'Build suffix array, LCP array, longest repeated substring, number of distinct substrings, longest common substring.', 'dp'),
      entry('aho-corasick', 'Aho-Corasick', '🔗', 'Multiple pattern matching automaton. Built on Trie + failure links. Find all occurrences of many patterns in text.', 'dp'),
      entry('z-function', 'Z-Function', '🆉', 'Compute Z-array in O(n): longest substring starting at i that matches prefix. String periodicity, pattern matching.', 'dp'),
      entry('manachers', 'Manacher\'s Algorithm', '💎', 'Longest palindromic substring in O(n) using symmetry expansion and center caching.', 'dp'),
      entry('suffix-automaton', 'Suffix Automaton', '🤖', 'Minimal DFA accepting all suffixes of a string. Count distinct substrings, longest common substring, lexicographically smallest.', 'dp'),
      entry('string-rotations', 'String Rotations', '🔄', 'Lexicographically minimal rotation (Booth\'s), string matching on rotation, periodic strings.', 'dp'),
      entry('lyndon-factorization', 'Lyndon Factorization', '📐', 'Split string into Lyndon words (non-increasing). Duval\'s algorithm. Minimal rotation, necklace computation.', 'dp'),
      entry('string-construction', 'String Construction', '🏗️', 'Build smallest/greatest string under constraints. Lexicographically smallest after swaps, K-th lexicographically smallest.', 'dp'),
      entry('string-window-patterns', 'String Window Patterns', '🪟', 'Sliding window applied to strings: anagram substrings, min window substring, substring concatenation.', 'dp'),
    ],
  },
  {
    part: 'Part VI — Math & Discrete',
    color: 'var(--nb-pink)',
    patterns: [
      entry('math', 'Math', '🔢', 'Number theory, combinatorics, Euclidean gcd/lcm, modular arithmetic, prime sieve.', 'math'),
      entry('bit-manipulation', 'Bit Manipulation', '💡', 'XOR tricks, bit hacks, Brian Kernighan, subset enumeration via bits, gray code, bitmask DP.', 'bit'),
      entry('combinatorics', 'Combinatorics', '🧮', 'Permutations, combinations, stars and bars, inclusion-exclusion, generating functions.', 'combinatorics'),
      entry('game-theory', 'Game Theory', '🎲', 'Nim, Grundy numbers, Sprague-Grundy theorem, impartial games, minimax.', 'game_theory'),
      entry('geometry', 'Geometry', '📐', 'Convex hull, line intersection, polygon area, point in polygon, rotating calipers.', 'geometry'),
      entry('number-theory', 'Number Theory', '🔢', 'Extended Euclidean, modular inverse, CRT, Euler\'s totient, Fermat\'s little theorem, Miller-Rabin, Pollard\'s Rho.', 'math'),
      entry('probability-dp', 'Probability DP', '🎲', 'Expected value DP, Markov chains, probability distributions, random walk, gambler\'s ruin.', 'dp'),
      entry('ternary-search', 'Ternary Search', '🔺', 'Find peak of unimodal function. Divide into three parts, discard one. Bitonic arrays, convex functions.', 'math'),
      entry('fft', 'Fast Fourier Transform', '🌊', 'Polynomial multiplication, convolution, big integer multiplication, signal processing.', 'math'),
      entry('sprague-grundy', 'Sprague-Grundy Theorem', '🎯', 'Grundy numbers for impartial games. Compute mex, XOR combined games, game of Nim, Kayles, subtraction games.', 'math'),
      entry('chinese-remainder', 'Chinese Remainder Theorem', '🇨🇳', 'Solve system of linear congruences. Garner\'s algorithm for big integers. RSA-related problems.', 'math'),
      entry('convex-hull', 'Convex Hull', '⬡', "Graham scan, Andrew's monotone chain, Jarvis march, dynamic convex hull, convex hull of a polygon.", 'math'),
      entry('inclusion-exclusion', 'Inclusion-Exclusion', '🔄', 'Count unions of sets, derangements, coprime count, principle applied to number theory and combinatorics.', 'math'),
      entry('catalan-numbers', 'Catalan Numbers', '📊', 'Counting: BSTs, parentheses, Dyck paths, triangulations, non-crossing partitions. Recurrence and closed form.', 'math'),
      entry('josephus', 'Josephus Problem', '💀', 'Find the last remaining position when every k-th is eliminated. O(n) DP, O(k log n) for large n.', 'math'),
      entry('sieve-variants', 'Sieve Variants', '🔍', 'Eratosthenes, linear sieve, segmented sieve, prime counting, divisor count, totient sieve, Mobius sieve.', 'math'),
      entry('burnside-lemma', "Burnside's Lemma", '🔄', 'Count distinct objects under group action. Orbit-counting, necklace/bracelet enumeration, Polya enumeration.', 'math'),
      entry('gray-code', 'Gray Code', '⚪', 'Binary representation where consecutive values differ by one bit. Sequence generation, n-queens bitset, subset generation.', 'math'),
      entry('gaussian-gf2', 'Gaussian Elimination GF(2)', '⊞', 'Solve linear systems over GF(2). XOR basis, linear basis of array, find if target reachable, maximum XOR subset.', 'math'),
      entry('lucas-theorem', "Lucas' Theorem", '🔺', 'Compute large binomial coefficients modulo prime. nCr mod p using base-p digits. Digit DP and combinatorics intersection.', 'math'),
      entry('lattice-paths', 'Lattice Paths', '📐', 'Count/generate monotonic paths on integer lattice. Delannoy numbers, with/without obstacles, with/without diagonals.', 'math'),
      entry('advanced-counting-dp', 'Advanced Counting DP', '🧮', 'Combinatorial DP beyond basics: Stirling numbers, Eulerian numbers, Bell numbers, partition DP, set partition.', 'math'),
      entry('rotating-calipers', 'Rotating Calipers', '📏', 'Width/diameter of convex polygon, minimum bounding rectangle, distance between convex polygons. O(n).', 'math'),
      entry('carry-dp', 'Carry DP', '➕', 'Digit DP where carry propagates through positions. Count numbers with sum of digits equal, etc.', 'math'),
      entry('random-walk', 'Random Walk', '🚶', 'Expected time to absorption, probability of reaching boundary, gambler\'s ruin, 1D/2D walk, drunkard\'s walk.', 'math'),
      entry('number-tricks', 'Number Tricks', '✨', 'Numerical properties, digital root, self numbers, happy numbers, narcissistic numbers, Kaprekar, Ulam, perfect numbers.', 'math'),
    ],
  },
  {
    part: 'Part VII — Advanced Topics',
    color: 'var(--nb-yellow)',
    patterns: [
      entry('linear-algebra', 'Linear Algebra', '🧮', 'Matrix operations, Gaussian elimination, determinant, rank, eigenvalues, linear transformations.', 'linear_algebra'),
      entry('numerical-methods', 'Numerical Methods', '📊', 'Newton\'s method, binary search for roots, integration, differentiation, gradient descent, Monte Carlo.', 'num_methods'),
      entry('scheduling', 'Scheduling', '📅', 'Job sequencing, interval scheduling, CPU scheduling, task scheduling with dependencies, resource allocation.', 'scheduling'),
      entry('shapes', 'Shapes / Geometry', '🔷', 'Area/perimeter/volume of geometric shapes, union/intersection of shapes, packing, tiling, cutting stock.', 'shape'),
      entry('miscellaneous', 'Miscellaneous', '📦', 'Cache policies (LRU, LFU, ARC), OOP design, system design, concurrency problems, brainteasers.', 'miscellaneous'),
      entry('design-patterns', 'Design Patterns', '🏗️', 'Singleton, factory, observer, strategy, decorator, adapter, command, iterator. OOP design in coding interviews.', 'miscellaneous'),
      entry('sorting-algorithms', 'Sorting Algorithms', '📊', 'Quick sort, merge sort, heap sort, counting sort, radix sort, bucket sort, tim sort, intro sort.', 'dp'),
      entry('simulation', 'Simulation', '🎮', 'Implement the problem description faithfully. Text processing, game simulation, protocol implementation.', 'miscellaneous'),
      entry('matrix-exponentiation', 'Matrix Exponentiation', '⚡', 'Linear recurrences via fast matrix power. Fibonacci in O(log n), linear DP acceleration.', 'math'),
      entry('randomized-algorithms', 'Randomized Algorithms', '🎲', 'Randomized quickselect, reservoir sampling, Fisher-Yates shuffle, Monte Carlo methods, Miller-Rabin.', 'dp'),
      entry('multiset-ordered-set', 'Multiset & Ordered Set', '📚', 'Order statistic tree, sorted container, balanced BST simulation. K-th element, count of elements in range.', 'dp'),
    ],
  },
  {
    part: 'Part VIII — Cross-Topic Deep Dives',
    color: 'var(--nb-red)',
    patterns: [
      entry('bfs-vs-dfs', 'BFS vs DFS', '🌊', 'When BFS beats DFS and vice versa. Shortest path, topological, bipartite, connected components, backtracking.', 'graph'),
      entry('interval-problems', 'Interval Problems', '📏', 'Interval union, intersection, overlap, covering, partition, scheduling. Sweep-line, greedy, segment tree.', 'scheduling'),
      entry('dp-on-trees', 'DP on Trees', '🌳', 'Tree DP: diameter, paths, subtree aggregates, rerooting DP, knapsack on tree, tree matching.', 'tree'),
      entry('union-find', 'Union-Find (DSU)', '🔗', 'Disjoint set union with path compression and union by size. Dynamic connectivity, Kruskal, connected components.', 'graph'),
      entry('digit-dp', 'Digit DP', '🔢', 'DP on number digits with tight/loose bounds. Count numbers with property in range. Sum of digits, divisible by k.', 'dp'),
      entry('interval-dp', 'Interval DP', '🔲', 'DP over intervals: matrix chain multiplication, burst balloons, palindrome partitioning II, stone game, optimal BST.', 'dp'),
      entry('grid-dp', 'Grid DP', '🔲', 'DP on 2D grids: unique paths, minimum path sum, dungeon game, cherry pickup, triangle, falling path sum.', 'dp'),
      entry('state-machine-dp', 'State Machine DP', '⚙️', 'DP with explicit states. Best time to buy/sell stock, paint house, student attendance, k transactions.', 'dp'),
      entry('recursion-memoization', 'Recursion + Memoization', '📝', 'Top-down DP, memoization patterns, recursion tree optimization, stack depth management, tabulation conversion.', 'dp'),
      entry('grid-patterns', 'Grid Patterns', '🔲', 'Neighbor iteration, matrix prefix sum, BFS/DFS on grid, island patterns, shortest distance, multi-source.', 'graph'),
      entry('fenwick-tree', 'Fenwick Tree (BIT)', '🌳', 'Range sum/product queries with point updates. LIS count, inversion count, order statistics, offline queries.', 'dp'),
      entry('heavy-light-decomposition', 'Heavy-Light Decomposition', '⚡', 'Decompose tree into heavy/light paths for path queries with segment tree. Path sum, max, min, update.', 'graph'),
      entry('euler-tour', 'Euler Tour (ETT)', '🔄', 'Flatten tree into array via Euler tour. Subtree queries become range queries. LCA via RMQ, subtree aggregates.', 'graph'),
      entry('mo-algorithm', "Mo's Algorithm", '📊', 'Offline query processing with sqrt decomposition. Sort queries by block, maintain pointer movement. Range queries.', 'dp'),
      entry('xor-basis', 'XOR Basis / Linear Basis', '⊻', 'Basis of numbers under XOR. Maximum XOR subset, minimum XOR subset, K-th smallest XOR, rank of XOR space.', 'dp'),
      entry('euler-path', 'Euler Path / Circuit', '🛤️', 'Hierholzer\'s algorithm for Eulerian path. Chinese postman problem, de Bruijn sequence. Hierholzer, Fleury.', 'graph'),
      entry('divide-conquer-dp', 'Divide & Conquer DP', '🔪', 'DP optimization: monotone opt property (quadrangle inequality). DP[i][j] = min over k < j of DP[i-1][k] + C[k][j].', 'dp'),
      entry('sqrt-decomposition', 'Square Root Decomposition', '📐', 'Partition array into sqrt blocks. Batch queries, lazy rebuild. Range sum/update, mode query, k-th smallest in range.', 'dp'),
      entry('persistent-segment-tree', 'Persistent Segment Tree', '💾', 'Versioned segment trees. K-th smallest in range, count distinct in range, sum/update across versions.', 'dp'),
      entry('treap', 'Treap (Randomized BST)', '🌲', 'Randomized BST with heap property. Split/merge operations. Range reverse, lazy propagation, order statistics, implicit treap.', 'dp'),
      entry('offline-cdq', 'Offline CDQ Divide & Conquer', '📝', 'CDQ divide-and-conquer for multi-dimensional offline queries. 3D partial order, dynamic convex hull, DP optimization.', 'dp'),
      entry('bitset-operations', 'Bitset Operations', '💡', 'std::bitset / BigInt manipulation for DP optimization. Bitset knapsack, graph reachability, matching, subset queries.', 'dp'),
      entry('slope-trick', 'Slope Trick', '⛰️', 'DP optimization for convex piecewise-linear functions. Priority queue management. Tree DP, grid DP, scheduling DP.', 'dp'),
      entry('segment-tree-beats', 'Segment Tree Beats', '🥁', 'Segment tree with min/max operations that break standard lazy. Range chmin/chmax, range sum queries in O(n log n).', 'dp'),
      entry('balanced-dp', 'Balanced DP', '⚖️', 'DP with equilibrium constraints. Balance brackets, load balancing, fair division, partition with balance target.', 'dp'),
      entry('profile-dp', 'Profile DP (DP on Broken Profile)', '🧩', 'DP over row/column with state profile. Bitmask DP on grids, tiling problems, crosswords, domino tilings.', 'dp'),
      entry('aliens-trick', "Aliens Trick (Lagrange DP)", '👽', 'DP optimization using Lagrangian relaxation. Attach penalty lambda for constraint, binary search lambda. k-trades, partition.', 'dp'),
      entry('arithmetic-dp', 'Arithmetic DP', '➕', 'DP on arithmetic properties. Sum of digits, divisibility, carry DP, digit DP variants with arithmetic constraints.', 'dp'),
      entry('subsequence-counting', 'Subsequence Counting', '🔢', 'Count distinct subsequences, number of subsequences with given sum/product, subsequence pattern matching.', 'dp'),
      entry('sliding-window-advanced', 'Sliding Window — Advanced', '🪟', 'At-most-k trick, exactly-k count formula, multiple-pointer windows, deque optimization for range max/min.', 'dp'),
      entry('two-d-prefix-sum', '2D Prefix Sum', '🧮', 'Prefix sum on 2D grid. Range sum queries, submatrix sum, count submatrices with sum ≤ k.', 'dp'),
      entry('dp-with-deque', 'DP with Deque Optimization', '📊', 'Sliding window DP optimization: DP[i] = max over j in window of DP[j] + f(j,i). Range min/max of DP values.', 'dp'),
      entry('stock-trading', 'Stock Trading', '📈', 'Best time to buy/sell with 1, 2, k transactions. Cooldown, transaction fee, frozen state. State machine DP.', 'dp'),
      entry('dp-space-optimization', 'DP Space Optimization', '💾', 'Rolling array, 1D to O(1) space, Knuth optimization, monotone queue optimization, divide & conquer optimization.', 'dp'),
      entry('string-window-patterns', 'String Window Patterns', '🪟', 'Sliding window applied to strings: anagram substrings, min window substring, substring concatenation, find all anagrams.', 'dp'),
    ],
  },
]

// ─── Derived helpers ──────────────────────────────────────────────────────────

export function getPart(slug: string): PatternPart | undefined {
  return PATTERN_PARTS.find(p => p.patterns.some(e => e.slug === slug))
}

export function getPattern(slug: string): PatternInventoryEntry | undefined {
  for (const p of PATTERN_PARTS) {
    const found = p.patterns.find(e => e.slug === slug)
    if (found) return found
  }
  return undefined
}

export function getPatternVariations(slug: string): PatternVariation[] | undefined {
  return getPattern(slug)?.variations
}

export function totalChapters(): number {
  return PATTERN_PARTS.reduce((s, p) => s + p.patterns.length, 0)
}

export function totalProblems(): number {
  const seen = new Set<string>()
  let total = 0
  for (const p of PATTERN_PARTS) {
    for (const e of p.patterns) {
      if (!seen.has(e.topicSlug)) {
        seen.add(e.topicSlug)
        total += e.problemCount
      }
    }
  }
  return total
}
