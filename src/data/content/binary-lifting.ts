import type { Article } from '../articles'

export const binaryLiftingArticle: Article = {
  slug: 'binary-lifting',
  title: 'Binary Lifting',
  emoji: '⬆️',
  tagline: 'Jump 2^k ancestors in O(log n). LCA, kth ancestor, path queries on trees.',
  description: 'Binary lifting preprocesses a tree so that ancestor queries and LCA (Lowest Common Ancestor) run in O(log n) instead of O(n). Core idea: up[v][k] = 2^k-th ancestor of v. Precompute up[v][0] = parent, up[v][k] = up[up[v][k-1]][k-1]. To find kth ancestor: decompose k in binary, jump the set bits. For LCA: equalize depths then jump both up simultaneously.',
  gradient: 'from-green-700 to-emerald-800',
  topicSlug: 'tree',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `Binary lifting precomputes up[v][k] = 2^k-th ancestor of v. Build: up[v][0]=parent[v]; for k≥1: up[v][k]=up[up[v][k-1]][k-1]. O(n log n) build, O(log n) query. LCA: equalize depths by lifting the deeper node, then lift both simultaneously until they meet. Extension: store min/max/sum along the path in the lifting table — O(log n) path aggregate queries.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Binary lifting for LCA and kth ancestor',
      code: `const LOG = 18; // log2(10^5) ≈ 17

function buildBinaryLifting(n, parent, root = 0) {
    const up = Array.from({length: n}, () => new Array(LOG).fill(-1));
    const depth = new Array(n).fill(0);

    // BFS to set parent and depth
    const queue = [root];
    const visited = new Array(n).fill(false);
    visited[root] = true;
    while (queue.length) {
        const v = queue.shift();
        up[v][0] = parent[v] ?? -1;
        for (let k = 1; k < LOG; k++) {
            if (up[v][k-1] !== -1) up[v][k] = up[up[v][k-1]][k-1];
        }
        for (const u of (adj[v] || [])) {
            if (!visited[u]) {
                visited[u] = true;
                depth[u] = depth[v] + 1;
                parent[u] = v;
                queue.push(u);
            }
        }
    }
    return { up, depth };
}

function kthAncestor(v, k, up) {
    for (let i = 0; i < LOG; i++) {
        if ((k >> i) & 1) {
            v = up[v][i];
            if (v === -1) return -1;
        }
    }
    return v;
}

function lca(u, v, up, depth) {
    if (depth[u] < depth[v]) [u, v] = [v, u];
    // Bring u to same depth as v
    u = kthAncestor(u, depth[u] - depth[v], up);
    if (u === v) return u;
    // Binary lift both until they diverge
    for (let k = LOG - 1; k >= 0; k--) {
        if (up[u][k] !== up[v][k]) {
            u = up[u][k];
            v = up[v][k];
        }
    }
    return up[u][0];
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
      title: 'Kth Ancestor of a Tree Node',
      url: 'https://leetcode.com/problems/kth-ancestor-of-a-tree-node/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Binary lifting table — precompute 2^k ancestors',
          explanation: `Build up[node][k] = 2^k-th ancestor. BFS from root to set up[node][0] = parent. Then up[node][k] = up[up[node][k-1]][k-1]. For getKthAncestor: decompose k in binary, jump set bits.`,
          code: `var TreeAncestor = function(n, parent) {
    const LOG=16;
    this.up=Array.from({length:n},()=>new Array(LOG).fill(-1));
    for(let v=0;v<n;v++) this.up[v][0]=parent[v];
    for(let k=1;k<LOG;k++)
        for(let v=0;v<n;v++)
            if(this.up[v][k-1]!==-1) this.up[v][k]=this.up[this.up[v][k-1]][k-1];
};
TreeAncestor.prototype.getKthAncestor = function(node, k) {
    for(let i=0;i<16;i++){
        if((k>>i)&1){
            node=this.up[node][i];
            if(node===-1) return -1;
        }
    }
    return node;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Lowest Common Ancestor of a Binary Tree',
      url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Recursive — LCA is the split point',
          explanation: `If root is null or is p or q, return root. Recurse left and right. If both sides return non-null, root is LCA. If only one side returns non-null, that's the LCA (both p and q are in that subtree).`,
          code: `var lowestCommonAncestor = function(root, p, q) {
    if(!root||root===p||root===q) return root;
    const l=lowestCommonAncestor(root.left,p,q);
    const r=lowestCommonAncestor(root.right,p,q);
    return l&&r?root:l||r;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Lowest Common Ancestor of Deepest Leaves',
      url: 'https://leetcode.com/problems/lowest-common-ancestor-of-deepest-leaves/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Post-order — return (node, depth) pairs, LCA where depths match',
          explanation: `DFS returns (lca_candidate, max_depth). If both subtrees have the same max depth, current node is LCA of deepest leaves. Otherwise propagate the deeper side's answer.`,
          code: `var lcaDeepestLeaves = function(root) {
    const dfs=node=>{
        if(!node) return [null,0];
        const [ll,ld]=dfs(node.left);
        const [rl,rd]=dfs(node.right);
        if(ld===rd) return [node,ld+1];
        return ld>rd?[ll,ld+1]:[rl,rd+1];
    };
    return dfs(root)[0];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Maximum Difference Between Node and Ancestor',
      url: 'https://leetcode.com/problems/maximum-difference-between-node-and-ancestor/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Track min and max on path from root to current node',
          explanation: `DFS carrying (min_val, max_val) from root. At each node, update answer with |node.val - min_val| and |node.val - max_val|. Update min/max for children.`,
          code: `var maxAncestorDiff = function(root) {
    let res=0;
    const dfs=(node,mn,mx)=>{
        if(!node) return;
        res=Math.max(res,Math.abs(node.val-mn),Math.abs(node.val-mx));
        mn=Math.min(mn,node.val); mx=Math.max(mx,node.val);
        dfs(node.left,mn,mx); dfs(node.right,mn,mx);
    };
    dfs(root,root.val,root.val);
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '⬆️',
      color: 'green',
      content: `**Binary lifting complexity:** O(n log n) preprocess, O(log n) per query. LOG = ceil(log2(n)) — use 18 for n ≤ 10^5, 20 for n ≤ 10^6.\n\n**LCA applications:**\n- Path sum from u to v: sum[u] + sum[v] - 2*sum[LCA]\n- Distance: depth[u] + depth[v] - 2*depth[LCA]\n- Path min/max: extend lifting table to store edge weights\n\n**Euler tour + sparse table:** Alternative for static trees — O(n) preprocess, O(1) LCA query. Better for offline many-query scenarios.`,
    },
  ],
}
