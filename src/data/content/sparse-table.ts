import type { Article } from '../articles'

export const sparseTableArticle: Article = {
  slug: 'sparse-table',
  title: 'Sparse Table & Binary Lifting',
  emoji: '📊',
  tagline: 'Precompute powers of 2. Answer range min/max in O(1).',
  description: 'Sparse Table answers range minimum/maximum queries in O(1) after O(n log n) preprocessing. Binary lifting on trees answers LCA (Lowest Common Ancestor) queries in O(log n). Both use the same "jumping by powers of 2" trick. Use these when you have many queries on a static array/tree.',
  gradient: 'from-blue-600 to-indigo-700',
  topicSlug: 'advanced_tree',
  readTime: '18 min',
  sections: [
    {
      type: 'text',
      content: `Sparse table and binary lifting both exploit the same insight: any range [l, r] can be covered by two overlapping ranges of length 2^k (the largest power of 2 that fits). For idempotent operations (min, max, GCD), two overlapping answers can be combined. For sum, they can't — use Fenwick/Segment tree instead.`,
    },
    {
      type: 'table',
      headers: ['Structure', 'Build', 'Query', 'Update', 'Use for'],
      rows: [
        ['Prefix Sum', 'O(n)', 'O(1)', 'O(n)', 'Range sum (static)'],
        ['Sparse Table', 'O(n log n)', 'O(1)', 'Not supported', 'Range min/max/GCD (static, idempotent ops)'],
        ['Fenwick Tree', 'O(n log n)', 'O(log n)', 'O(log n)', 'Range sum with point updates'],
        ['Segment Tree', 'O(n)', 'O(log n)', 'O(log n)', 'Any associative op with updates'],
        ['Binary Lifting', 'O(n log n)', 'O(log n)', 'N/A', 'LCA queries on trees'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Sparse Table — O(1) Range Min/Max',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Sparse Table — build O(n log n), query O(1)',
      code: `class SparseTable {
    constructor(arr) {
        const n = arr.length;
        const LOG = Math.floor(Math.log2(n)) + 1;
        // st[k][i] = min of arr[i..i+2^k-1]
        this.st = Array.from({length:LOG}, () => new Array(n).fill(0));
        this.log = new Array(n + 1).fill(0);
        for (let i = 2; i <= n; i++) this.log[i] = this.log[i>>1] + 1;
        this.st[0] = [...arr]; // base: 2^0 = single elements
        for (let k = 1; k < LOG; k++)
            for (let i = 0; i + (1<<k) <= n; i++)
                this.st[k][i] = Math.min(this.st[k-1][i], this.st[k-1][i + (1<<(k-1))]);
    }
    // Range min query [l, r] inclusive — O(1)
    query(l, r) {
        const k = this.log[r - l + 1];
        return Math.min(this.st[k][l], this.st[k][r - (1<<k) + 1]);
        // Two overlapping blocks of length 2^k covering [l,r]
        // Works for min/max/GCD (idempotent — overlap is fine)
    }
}

// NOTE: Does NOT work for sum/product (overlapping double-counts!)
// For sum: use Fenwick Tree or Prefix Sum instead`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Binary Lifting — LCA in O(log n)',
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'teal',
      content: `**Lowest Common Ancestor (LCA)**: The deepest node that is an ancestor of both u and v.\n\n**Binary lifting approach:**\n1. Precompute up[k][v] = 2^k-th ancestor of node v (O(n log n))\n2. For LCA(u,v): bring both nodes to the same depth, then jump together until they meet\n3. Each LCA query: O(log n)\n\n**up[0][v]** = parent[v]. **up[k][v]** = up[k-1][up[k-1][v]] (apply 2^(k-1) jump twice).`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Binary Lifting for LCA — O(n log n) preprocessing, O(log n) per query',
      code: `class LCA {
    constructor(n, adj, root = 0) {
        this.LOG = Math.ceil(Math.log2(n + 1)) + 1;
        this.depth = new Array(n).fill(0);
        this.up = Array.from({length:this.LOG}, () => new Array(n).fill(-1));
        // BFS/DFS to set parent and depth
        const visited = new Array(n).fill(false);
        const queue = [root];
        visited[root] = true;
        this.up[0][root] = root; // root's parent is itself
        while (queue.length) {
            const u = queue.shift();
            for (const v of adj[u]) {
                if (!visited[v]) {
                    visited[v] = true;
                    this.depth[v] = this.depth[u] + 1;
                    this.up[0][v] = u; // direct parent
                    queue.push(v);
                }
            }
        }
        // Build sparse table: up[k][v] = 2^k-th ancestor
        for (let k = 1; k < this.LOG; k++)
            for (let v = 0; v < n; v++)
                this.up[k][v] = this.up[k-1][this.up[k-1][v]];
    }
    lca(u, v) {
        // Bring to same depth
        if (this.depth[u] < this.depth[v]) [u, v] = [v, u];
        let diff = this.depth[u] - this.depth[v];
        for (let k = 0; diff; k++, diff >>= 1)
            if (diff & 1) u = this.up[k][u];
        if (u === v) return u;
        // Jump both up until they differ
        for (let k = this.LOG - 1; k >= 0; k--)
            if (this.up[k][u] !== this.up[k][v]) {
                u = this.up[k][u]; v = this.up[k][v];
            }
        return this.up[0][u];
    }
    // Distance between two nodes
    dist(u, v) {
        return this.depth[u] + this.depth[v] - 2 * this.depth[this.lca(u, v)];
    }
}`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Range Minimum Query (static)',
      url: 'https://leetcode.com/problems/range-minimum-query/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Sparse Table — O(1) query after O(n log n) build',
          explanation: `Build sparse table. Query [l,r]: find k = floor(log2(r-l+1)), return min of st[k][l] and st[k][r-(1<<k)+1]. Two overlapping blocks of size 2^k cover [l,r] completely. For idempotent min, overlap is harmless.`,
          code: `// Use SparseTable class defined above
// NumArray constructor: build sparse table
// query(left, right): return this.sparse.query(left, right)`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Find the Kth Ancestor of a Tree Node',
      url: 'https://leetcode.com/problems/find-the-kth-ancestor-of-a-tree-node/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Binary lifting — O(log n) per query',
          explanation: `This is exactly what binary lifting is built for. Precompute up[k][v] = 2^k-th ancestor. For k-th ancestor: decompose k into binary, jump by each set bit.`,
          code: `class TreeAncestor {
    constructor(n, parent) {
        const LOG = Math.ceil(Math.log2(n+1)) + 1;
        this.up = Array.from({length:LOG}, () => new Array(n).fill(-1));
        for(let v=0;v<n;v++) this.up[0][v]=parent[v];
        for(let k=1;k<LOG;k++)
            for(let v=0;v<n;v++)
                if(this.up[k-1][v]!==-1)
                    this.up[k][v]=this.up[k-1][this.up[k-1][v]];
        this.LOG=LOG;
    }
    getKthAncestor(node, k) {
        for(let b=0;b<this.LOG;b++){
            if(k>>b&1){
                node=this.up[b][node];
                if(node===-1) return -1;
            }
        }
        return node;
    }
}`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Minimum Score of a Path Between Two Cities',
      url: 'https://leetcode.com/problems/minimum-score-of-a-path-between-two-cities/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Union-Find — min edge in connected component',
          explanation: `Nodes 1 and n are always connected. Any path between them can use any edge in their connected component (by detour). So the answer is the minimum edge weight in the entire connected component of node 1 (which must contain node n).`,
          code: `var minScore = function(n, roads) {
    const parent=Array.from({length:n+1},(_,i)=>i);
    const find=x=>parent[x]===x?x:(parent[x]=find(parent[x]));
    const union=(a,b)=>parent[find(a)]=find(b);
    const minEdge=new Array(n+1).fill(Infinity);
    for(const [a,b,d] of roads){
        union(a,b);
        minEdge[a]=Math.min(minEdge[a],d);
        minEdge[b]=Math.min(minEdge[b],d);
    }
    // Find min edge in connected component of node 1
    let ans=Infinity;
    const root=find(1);
    for(let i=1;i<=n;i++)
        if(find(i)===root) ans=Math.min(ans,minEdge[i]);
    return ans;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Sliding Window Minimum',
      url: 'https://leetcode.com/problems/sliding-window-minimum/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Sparse table for static range min',
          explanation: `For each window [i, i+k-1], compute range min using sparse table in O(1). Total O(n log n) build + O(n) queries = O(n log n). Alternatively, monotonic deque gives O(n) — but sparse table shows the general approach.`,
          code: `// Using SparseTable:
// const st = new SparseTable(nums);
// for(let i=0;i<=nums.length-k;i++) result.push(st.query(i,i+k-1));

// Monotonic deque is O(n) and preferred — see stack-queue article`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧠',
      color: 'blue',
      content: `**When to use Sparse Table vs Segment Tree:**\n- Static array, many range min/max/GCD queries → Sparse Table (O(1) query)\n- Array changes (point updates) → Fenwick or Segment Tree\n- Range updates → Segment Tree with lazy propagation\n- Tree LCA queries → Binary Lifting\n\n**Idempotent operations** (can use sparse table): min, max, GCD, bitwise AND/OR\n**NOT idempotent** (cannot use sparse table): sum, count, product — use prefix sums or Fenwick`,
    },
  ],
}
