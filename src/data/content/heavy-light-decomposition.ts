import type { Article } from '../articles'

export const heavyLightDecompositionArticle: Article = {
  slug: 'heavy-light-decomposition',
  title: 'Heavy-Light Decomposition',
  emoji: '🏋️',
  tagline: 'Decompose tree into O(log n) chains. Enables range queries on any tree path.',
  description: 'Heavy-Light Decomposition (HLD) decomposes a tree into "heavy chains" — each node connects to its heaviest child (most nodes in subtree) via a heavy edge. Any path between two nodes crosses O(log n) chains. By flattening chains into a linear array and using a segment tree on that array, we answer path max/sum/update queries in O(log²n). Essential for tree path queries that BFS/DFS cannot solve efficiently.',
  gradient: 'from-stone-600 to-neutral-700',
  topicSlug: 'graph',
  readTime: '18 min',
  sections: [
    {
      type: 'text',
      content: `HLD works by labeling each node with a DFS timestamp such that every heavy chain occupies a contiguous range in the timestamp array. Then "query path u to v" becomes: walk up from u and v to their LCA, querying the segment tree on each chain segment encountered. Since any path crosses at most O(log n) chains (each switch to a new chain at least doubles the chain\'s subtree size), total query time is O(log²n).`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Heavy-Light Decomposition with segment tree',
      code: `class HLD {
    constructor(n, edges, values, root = 0) {
        this.n = n; this.root = root;
        this.adj = Array.from({length: n}, () => []);
        for (const [u, v] of edges) { this.adj[u].push(v); this.adj[v].push(u); }
        this.parent = new Array(n).fill(-1);
        this.depth = new Array(n).fill(0);
        this.subtreeSize = new Array(n).fill(1);
        this.heavyChild = new Array(n).fill(-1);
        this.chainTop = new Array(n).fill(0);
        this.pos = new Array(n); // DFS timestamp
        this.vals = values; // node values

        this._dfs1(root, -1); // compute sizes, heavy children
        this._timer = 0;
        this._flatVals = new Array(n);
        this._dfs2(root, root); // assign positions, build flat array
        this._seg = new SegTree(this._flatVals); // build segment tree
    }
    _dfs1(u, p) {
        this.parent[u] = p;
        let maxSize = 0;
        for (const v of this.adj[u]) {
            if (v === p) continue;
            this.depth[v] = this.depth[u] + 1;
            this._dfs1(v, u);
            this.subtreeSize[u] += this.subtreeSize[v];
            if (this.subtreeSize[v] > maxSize) { maxSize = this.subtreeSize[v]; this.heavyChild[u] = v; }
        }
    }
    _dfs2(u, top) {
        this.chainTop[u] = top;
        this.pos[u] = this._timer++;
        this._flatVals[this.pos[u]] = this.vals[u];
        if (this.heavyChild[u] !== -1) this._dfs2(this.heavyChild[u], top);
        for (const v of this.adj[u]) {
            if (v === this.parent[u] || v === this.heavyChild[u]) continue;
            this._dfs2(v, v); // new chain starts at v
        }
    }
    // Query max on path u → v
    queryPath(u, v) {
        let res = -Infinity;
        while (this.chainTop[u] !== this.chainTop[v]) {
            if (this.depth[this.chainTop[u]] < this.depth[this.chainTop[v]]) [u, v] = [v, u];
            res = Math.max(res, this._seg.query(this.pos[this.chainTop[u]], this.pos[u]));
            u = this.parent[this.chainTop[u]];
        }
        if (this.depth[u] > this.depth[v]) [u, v] = [v, u];
        return Math.max(res, this._seg.query(this.pos[u], this.pos[v]));
    }
    update(u, val) { this._seg.update(this.pos[u], val); }
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
      title: 'Path Sum in Tree (tree with range updates)',
      url: 'https://leetcode.com/problems/path-sum-iii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DFS + prefix sums',
          explanation: `For path sum = targetSum, use DFS maintaining prefix sums from root. At each node, count how many ancestors have prefix sum (current - targetSum). Use a hashmap of prefix sums seen so far.`,
          code: `var pathSum = function(root, targetSum) {
    const map=new Map([[0,1]]);
    let count=0;
    const dfs=(node,prefSum)=>{
        if(!node) return;
        prefSum+=node.val;
        count+=(map.get(prefSum-targetSum)||0);
        map.set(prefSum,(map.get(prefSum)||0)+1);
        dfs(node.left,prefSum);
        dfs(node.right,prefSum);
        map.set(prefSum,map.get(prefSum)-1);
    };
    dfs(root,0);
    return count;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Binary Tree Maximum Path Sum',
      url: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: DFS — return max extending path, update global max',
          explanation: `For each node, the best path through it = node.val + max(0, bestFromLeft) + max(0, bestFromRight). The function returns max(0, node.val + max(left,right)) for the parent to use (extending path, not splitting).`,
          code: `var maxPathSum = function(root) {
    let res=-Infinity;
    const dfs=(node)=>{
        if(!node) return 0;
        const l=Math.max(0,dfs(node.left)), r=Math.max(0,dfs(node.right));
        res=Math.max(res,node.val+l+r);
        return node.val+Math.max(l,r);
    };
    dfs(root);
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Kth Ancestor of a Tree Node',
      url: 'https://leetcode.com/problems/kth-ancestor-of-a-tree-node/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Binary lifting — O(n log n) preprocessing, O(log n) query',
          explanation: `Precompute anc[node][j] = 2^j-th ancestor of node. Then for query (node, k): decompose k in binary, jump using precomputed ancestors.`,
          code: `class TreeAncestor {
    constructor(n, parent) {
        const LOG=16;
        this.anc=Array.from({length:n},()=>new Array(LOG).fill(-1));
        for(let i=0;i<n;i++) this.anc[i][0]=parent[i];
        for(let j=1;j<LOG;j++)
            for(let i=0;i<n;i++)
                if(this.anc[i][j-1]!==-1)
                    this.anc[i][j]=this.anc[this.anc[i][j-1]][j-1];
    }
    getKthAncestor(node, k) {
        for(let j=0;j<16;j++){
            if((k>>j)&1){
                node=this.anc[node][j];
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
      num: 4,
      title: 'Sum of Distances in Tree',
      url: 'https://leetcode.com/problems/sum-of-distances-in-tree/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Two-pass DFS — root rerooting technique',
          explanation: `First DFS from root: count subtree sizes and sum distances from root to all nodes. Second DFS: reroot — when moving root from parent to child c, distances decrease by count[c] (c's subtree gets closer) and increase by (n - count[c]) (rest gets farther).`,
          code: `var sumOfDistancesInTree = function(n, edges) {
    const adj=Array.from({length:n},()=>[]);
    for(const[u,v] of edges){adj[u].push(v);adj[v].push(u);}
    const cnt=new Array(n).fill(1), ans=new Array(n).fill(0);
    // DFS1: bottom-up, compute cnt and ans[0]
    const dfs1=(u,p)=>{
        for(const v of adj[u]) if(v!==p){
            dfs1(v,u); cnt[u]+=cnt[v]; ans[u]+=ans[v]+cnt[v];
        }
    };
    // DFS2: top-down rerooting
    const dfs2=(u,p)=>{
        for(const v of adj[u]) if(v!==p){
            ans[v]=ans[u]-cnt[v]+(n-cnt[v]);
            dfs2(v,u);
        }
    };
    dfs1(0,-1); dfs2(0,-1);
    return ans;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🏋️',
      color: 'gray',
      content: `**HLD key insight:** Any path in a tree = O(log n) contiguous chain segments. Each time we jump to a new chain, the subtree size at least doubles, so at most O(log n) jumps.\n\n**When to use HLD:**\n- Path query on tree (max, sum, update) that can't be solved with simple DFS\n- When you need a segment tree / Fenwick on tree paths\n\n**Simpler alternatives first:**\n- Single path between fixed endpoints: DFS/LCA\n- Subtree queries: Euler tour + segment tree (no HLD needed)\n- Path sum without updates: prefix sums from root\n\n**Related:** Centroid decomposition (different decomposition, handles "all paths through centroid" queries), Link-cut trees (dynamic connectivity + path queries).`,
    },
  ],
}
