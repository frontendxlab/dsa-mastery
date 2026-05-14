# My DSA Problem-Solving Style & Note-Taking Approach

## How I Grasp Problems

### Step 1: Read and Rephrase
- Read problem statement, identify what input→output means visually
- Rephrase to myself: "We are given X, find Y, constraint Z"
- Think of the simplest possible example by hand

### Step 2: Multiple Intuitions (BF → Optimal)
Always develop intuitions in order:
- **Intuition 1**: Brute force — nested loops, check everything, O(n²) or worse
- **Intuition 2**: Smarter observation — reduce passes, use hashmap, sort first
- **Intuition 3+**: Optimal — sliding window, two pointer, binary search, DP, graph algo

Never jump straight to optimal. BF clarifies the problem structure first.

### Step 3: Explain Before Code
Write the approach in plain English before touching code:
- What data structure to use and WHY
- How the pointer/window moves
- What the state represents
- What the base case / termination condition is

### Step 4: Code with Inline Notes
- Keep the commented-out BF solution above the optimal one
- Variable names: `i,j,n,m,k` for indices; `vis,adj,freq,path` for structures
- Notes explain WHY a specific decision was made (not what — the code shows that)

---

## Pattern Templates I Use

### Sliding Window (Dynamic)
```javascript
let i = j = ans = 0;
while (j < n) {
    // expand: add nums[j] to window state
    while (condition_violated) {
        // shrink: remove nums[i] from state
        i++;
    }
    ans = Math.max(ans, j - i + 1); // or ans += j - i + 1
    j++;
}
```

### Exact Count = AtMost(k) - AtMost(k-1)
Used when input has zeros — can't shrink to exact count directly:
```javascript
const atMost = (goal) => { /* sliding window ≤ goal */ }
return atMost(k) - atMost(k - 1);
```
Examples: Binary Subarrays With Sum, Count Nice Subarrays, Count Vowel Substrings

### All Subarrays From Valid Window: `ans += n - j`
When window [i..j] is valid, ALL extensions [i..n-1] are also valid:
```javascript
while (window_is_valid) {
    ans += n - j;   // count all right-extending subarrays
    shrink_window();
}
```
NOT `ans += j - i + 1` — that counts left-shrinking subarrays, different set.

### Graph: BFS for Shortest Path, DFS for Components/Cycles
```javascript
// Delta arrays for 4-directional grid
const dr = [1, 0, -1, 0];
const dc = [0, 1, 0, -1];

// BFS template
const bfs = (r, c) => {
    const q = new Queue([[r, c]]);
    vis[r][c] = true;
    while (!q.isEmpty()) {
        const [r, c] = q.dequeue();
        for (let i = 0; i < 4; i++) {
            const nr = r + dr[i], nc = c + dc[i];
            if (nr >= 0 && nr < n && nc >= 0 && nc < m && !vis[nr][nc]) {
                q.enqueue([nr, nc]);
                vis[nr][nc] = true;
            }
        }
    }
};
```

### Flood Fill Variant: Start from Boundary
When problem = "mark cells NOT reachable from boundary":
1. Iterate boundary cells
2. DFS/BFS from each boundary cell, mark as visited/safe
3. Count/flip remaining unmarked cells
Examples: Surrounded Regions, Number of Enclaves

### Cycle Detection
- **Undirected**: BFS/DFS — if visited AND not parent → cycle
- **Directed**: DFS with `vis[]` + `path[]` — if visited AND in current path → cycle
- **Kahn's Topo Sort**: if result.length !== n → cycle exists

### DP Recurrence Pattern
1. Draw the DAG of recursive calls
2. Identify overlapping subproblems from the DAG
3. Rotate DAG clockwise → dp table shape
4. Go BF → Memoization → Tabulation → Space Optimized

```javascript
// Memoized template
const mem = {};
const dp = (i, j) => {
    if (base_case) return base_value;
    if (mem[`${i},${j}`] !== undefined) return mem[`${i},${j}`];
    return mem[`${i},${j}`] = Math.max(take, skip);
};

// Tabulation template
const dp = Array.from({ length: n }, () => new Array(m).fill(0));
// fill base cases first, then iterate
```

### Two Pointer: When NOT to Use
- Input has **negative values** → window zig-zags, no guaranteed monotonicity
- Use prefix sum + hashmap instead for negative-value subarray problems

### Union-Find Template
```javascript
const parent = Array.from({ length: n }, (_, i) => i);
const find = (x) => {
    while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; }
    return x;
};
const union = (x, y) => {
    const px = find(x), py = find(y);
    if (px !== py) parent[px] = py;
};
```

### Binary Tree: DFS Templates

```javascript
// Postorder — use when decision depends on children (pruning, delete nodes, house robber 3)
const dfs = (node) => {
    if (!node) return base;
    const left = dfs(node.left);
    const right = dfs(node.right);
    // make decision using left + right
    return something;
};

// Level Order — use when need level-by-level grouping
const q = [root];
while (q.length > 0) {
    const size = q.length;          // freeze level size BEFORE loop
    for (let i = 0; i < size; i++) {
        const node = q.shift();
        // process node, use i===size-1 for last node in level
        if (node.left) q.push(node.left);
        if (node.right) q.push(node.right);
    }
}

// Tree reconstruction from traversals
// preorder: first element = root → split inorder at root → recurse
// postorder: last element = root → build RIGHT subtree first (postIdx--)
```

Key tree rules:
- **Inorder BST = sorted** — use for kth smallest, validate BST, successor
- **Same tree / symmetric**: `dfs(p,q)` comparing two nodes simultaneously
- **Max path sum**: `Math.max(dfs(child), 0)` to ignore negative branches
- **Level order right side view**: last node at each level (or DFS right-first, track depth === result.length)
- **Postorder for anything that needs child result before parent decision**

### Linked List Templates

```javascript
// Dummy node — always use when head might be modified/deleted
const dummy = new ListNode(0, head);
let curr = dummy;
// ...
return dummy.next;

// While loop condition rule:
// If accessing curr.next → while (curr)
// If accessing curr.next.next → while (curr && curr.next)

// Reversal template (prev always starts null = new tail points to nothing)
let prev = null, curr = head;
while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
}
// prev = new head of reversed list

// Floyd's slow/fast pointer
let slow = head, fast = head;
while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
}
// slow = middle node

// Find cycle entry point (after detecting slow===fast)
slow = head;
while (slow !== fast) { slow = slow.next; fast = fast.next; }
// both at cycle entry

// Partition into two lists + merge
let left = new ListNode(), right = new ListNode();
let lD = left, rD = right;
// ... append to left or right ...
right.next = null;        // MUST null-terminate right to avoid cycle
left.next = rD.next;
return lD.next;
```

Key LL rules:
- **Reverse-then-process-then-reverse**: for problems needing right-to-left on singly LL
- **Two passes OK**: first count length, second make change (Remove Nth from End)
- **Slow/fast for middle** → split + reverse second half (Palindrome, Reorder List)
- **LRU Cache** = HashMap + DLL (Map for O(1) lookup, DLL for O(1) move-to-front/remove-tail)
- **LFU Cache** = HashMap + freq-Map(freq→DLL) + minFreq tracker

### Frontend / JS Problem Patterns

```javascript
// Curry (fixed or variable arity)
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) return fn.apply(this, args);
        return (...args2) => curried.apply(this, args.concat(args2));
    };
}

// Debounce (delay until idle)
function debounce(fn, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

// Throttle (at most once per interval)
function throttle(fn, wait) {
    let waiting = false;
    return function (...args) {
        if (waiting) return;
        fn.apply(this, args);
        waiting = true;
        setTimeout(() => waiting = false, wait);
    };
}

// pipe (left→right composition)
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

// Promise.all polyfill
function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        const results = [];
        let count = 0;
        promises.forEach((p, i) => {
            Promise.resolve(p).then(val => {
                results[i] = val;
                if (++count === promises.length) resolve(results);
            }).catch(reject);
        });
    });
}
```

Frontend pattern recognition:
| Problem Type | Pattern |
|---|---|
| "implement debounce/throttle" | Timer + closure (clearTimeout vs flag) |
| "implement curry" | Collect args until fn.length reached |
| "implement Promise.X" | Counter + resolve/reject logic |
| "implement pipe/compose" | reduce left→right or right→left |
| "flatten array/object" | Recursion + typeof check |
| "LRU Cache" | Map + DLL (or JS Map insertion order trick) |
| UI component (accordion, tab, todo) | State + event delegation + accessibility |
| "implement once()" | Closure flag — call fn once, cache result |

---

## How I Take Notes

### Problem Entry Format
```
N. [Problem Name - Platform](url)
   1. Intuition 1: [BF explanation]
   2. Intuition 2: [Better approach]
   3. Intuition 3: [Optimal - explain WHY this works]
   <details>
   <summary>Code ([BF/Optimal/Variant name])</summary>
   [code with commented older approach if applicable]
   </details>
```

### Key Callout Patterns I Write
- **"If input has X, use Y"** rules
- **BFS vs DFS choice** reasoning
- **When NOT to use** a pattern (e.g., two pointer + negatives)
- **The formula** for tricky counting problems

### Code Comment Style
- Comment the DECISION, not the action
- "we are not sure what's in the swapped position so don't increment mid" ✓
- "// swap" ✗ (code shows that)
- Keep commented-out BF/alternative solutions above final solution

---

## Pattern Recognition Triggers

| See This... | Think This... |
|-------------|---------------|
| "longest/shortest subarray with condition" | Sliding window |
| "count subarrays with exactly k" | atMost(k) - atMost(k-1) |
| "minimum/maximum in matrix path" | DP (top-down → tabulation) |
| "connected components / islands" | DFS/BFS with visited array |
| "shortest path between two nodes" | BFS (not DFS) |
| "cycle in undirected graph" | BFS/DFS + parent tracking |
| "cycle in directed graph" | DFS + vis + path arrays |
| "topological order / DAG check" | Kahn's (BFS indegree) |
| "boundary → inside" flip problems | Flood fill from boundary |
| "union two groups / same component" | Union-Find |
| "string matching / substring search" | KMP with LPS array |
| "bipartite / two-color graph" | BFS coloring |
| input has ALL positive → two pointer OK | Dynamic sliding window |
| input has zeros → use exact count formula | atMost(k) - atMost(k-1) |
| input has negatives → avoid two pointer | Prefix sum + hashmap |

---

## My Preferred Variable Names
- `i, j` — left/right pointer or loop indices
- `n, m` — row/col count
- `vis` — visited array (boolean)
- `path` — current DFS path (for directed cycle detection)
- `adj` — adjacency list
- `freq` — frequency map
- `dr, dc` — delta row/col for 4-directional movement
- `p_dp` — previous dp row (space optimization)
- `mem` — memoization object/array
- `ans, result` — final answer accumulator

---

## JS-Specific Patterns I Use

```javascript
// Create 2D array
Array.from({ length: n }, () => new Array(m).fill(false))

// Swap two elements
[arr[i], arr[j]] = [arr[j], arr[i]]

// Check uppercase/lowercase by charCode
cc >= 65 && cc <= 90  // uppercase A-Z
cc >= 97 && cc <= 122 // lowercase a-z

// Cyclic increment
((charCode - 97 + 1) % 26)  // next char wrapping z→a

// Min/Max of array
Math.max(...arr)  // for small arrays
arr.reduce((a, b) => Math.max(a, b))  // for large arrays
```
