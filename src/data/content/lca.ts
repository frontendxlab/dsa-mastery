import type { Article } from '../articles'

export const lcaArticle: Article = {
  slug: 'lca',
  title: 'Lowest Common Ancestor (LCA)',
  emoji: '🌲',
  tagline: 'Find common ancestor of two nodes. Binary lifting O(n log n). Euler tour + RMQ O(n).',
  description: 'Lowest Common Ancestor (LCA) of nodes u and v is the deepest node that is an ancestor of both. Three algorithms: (1) Binary lifting — precompute 2^k-th ancestors in O(n log n), query in O(log n); (2) Euler tour + sparse table RMQ — O(n log n) preprocessing, O(1) query; (3) Tarjan\'s offline — O(n + q) using Union-Find. LCA is fundamental for tree path queries, distance between nodes, and path decomposition.',
  gradient: 'from-green-700 to-teal-700',
  topicSlug: 'graph',
  readTime: '16 min',
  sections: [
    {
      type: 'text',
      content: `LCA enables computing the path between any two nodes: path(u, v) = path(u, LCA(u,v)) + path(v, LCA(u,v)). Distance = depth[u] + depth[v] - 2*depth[LCA(u,v)]. Binary lifting precomputes anc[node][j] = 2^j-th ancestor. To find LCA: lift the deeper node to the same depth, then lift both together until they meet just below their LCA, then step up one more.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'LCA via binary lifting — O(n log n) build, O(log n) query',
      code: `class LCA {
    constructor(n, edges, root = 0) {
        const LOG = Math.ceil(Math.log2(n + 1)) + 1;
        const adj = Array.from({length: n}, () => []);
        for (const [u, v] of edges) { adj[u].push(v); adj[v].push(u); }

        this.depth = new Array(n).fill(0);
        this.anc = Array.from({length: n}, () => new Array(LOG).fill(-1));

        // DFS to set depth and direct parent (anc[node][0])
        const stack = [[root, -1, 0]];
        while (stack.length) {
            const [u, p, d] = stack.pop();
            this.depth[u] = d;
            this.anc[u][0] = p >= 0 ? p : u; // root points to itself
            for (const v of adj[u]) if (v !== p) stack.push([v, u, d + 1]);
        }

        // Fill binary lifting table
        for (let j = 1; j < LOG; j++)
            for (let i = 0; i < n; i++)
                this.anc[i][j] = this.anc[this.anc[i][j-1]][j-1];

        this.LOG = LOG;
    }

    query(u, v) {
        // Bring to same depth
        if (this.depth[u] < this.depth[v]) [u, v] = [v, u];
        let diff = this.depth[u] - this.depth[v];
        for (let j = 0; diff; j++, diff >>= 1) if (diff & 1) u = this.anc[u][j];
        if (u === v) return u;
        // Lift together until just below LCA
        for (let j = this.LOG - 1; j >= 0; j--)
            if (this.anc[u][j] !== this.anc[v][j]) { u = this.anc[u][j]; v = this.anc[v][j]; }
        return this.anc[u][0];
    }

    distance(u, v) {
        return this.depth[u] + this.depth[v] - 2 * this.depth[this.query(u, v)];
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
      title: 'Lowest Common Ancestor of a Binary Tree',
      url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DFS — return node when found, LCA when both sides return',
          explanation: `Post-order DFS. If both left and right subtrees return non-null, current node is LCA. Otherwise propagate the non-null result upward. Handles all cases: one node is ancestor of other, nodes in different subtrees.`,
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
      num: 2,
      title: 'Lowest Common Ancestor of a Binary Search Tree',
      url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Use BST property — navigate without DFS',
          explanation: `In BST: if both p and q are less than root, LCA is in left subtree. If both greater, in right subtree. Otherwise root is LCA.`,
          code: `var lowestCommonAncestor = function(root, p, q) {
    while(root){
        if(p.val<root.val&&q.val<root.val) root=root.left;
        else if(p.val>root.val&&q.val>root.val) root=root.right;
        else return root;
    }
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Distance Between Two Nodes in a Tree',
      url: 'https://leetcode.com/problems/find-distance-in-a-binary-tree/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: LCA + depth counting',
          explanation: `Distance = depth(p) + depth(q) - 2 * depth(LCA(p,q)). Find LCA using DFS, then compute depths from root to each node.`,
          code: `var findDistance = function(root, p, q) {
    const lca=(node,p,q)=>{
        if(!node||node.val===p||node.val===q) return node;
        const l=lca(node.left,p,q),r=lca(node.right,p,q);
        return l&&r?node:l||r;
    };
    const depth=(node,target,d)=>{
        if(!node) return -1;
        if(node.val===target) return d;
        const l=depth(node.left,target,d+1);
        return l!==-1?l:depth(node.right,target,d+1);
    };
    const ancestor=lca(root,p,q);
    return depth(ancestor,p,0)+depth(ancestor,q,0);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Step-By-Step Directions From a Binary Tree Node to Another',
      url: 'https://leetcode.com/problems/step-by-step-directions-from-a-binary-tree-node-to-another/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Find LCA, then path from LCA to each node',
          explanation: `Path from source to dest = go up from source to LCA (all 'U') then go down from LCA to dest. Find LCA via DFS. Then find path from LCA to source (to get count of 'U') and path from LCA to dest (actual directions).`,
          code: `var getDirections = function(root, startValue, destValue) {
    const findPath=(node,target,path)=>{
        if(!node) return false;
        if(node.val===target) return true;
        path.push('L'); if(findPath(node.left,target,path)) return true; path.pop();
        path.push('R'); if(findPath(node.right,target,path)) return true; path.pop();
        return false;
    };
    const lca=(node)=>{
        if(!node) return null;
        if(node.val===startValue||node.val===destValue) return node;
        const l=lca(node.left),r=lca(node.right);
        return l&&r?node:l||r;
    };
    const ancestor=lca(root);
    const pathToStart=[],pathToDest=[];
    findPath(ancestor,startValue,pathToStart);
    findPath(ancestor,destValue,pathToDest);
    return 'U'.repeat(pathToStart.length)+pathToDest.join('');
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Maximum Difference Between Node and Ancestor',
      url: 'https://leetcode.com/problems/maximum-difference-between-node-and-ancestor/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Track min and max on path from root',
          explanation: `DFS passing (current min, current max) from root. At each node, answer candidate = max(|node.val - pathMin|, |node.val - pathMax|). Update min/max, recurse on children.`,
          code: `var maxAncestorDiff = function(root) {
    let res=0;
    const dfs=(node,min,max)=>{
        if(!node) return;
        res=Math.max(res,Math.abs(node.val-min),Math.abs(node.val-max));
        min=Math.min(min,node.val); max=Math.max(max,node.val);
        dfs(node.left,min,max); dfs(node.right,min,max);
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
      icon: '🌲',
      color: 'green',
      content: `**LCA algorithm comparison:**\n- Naive: walk up from both nodes O(n) per query\n- Binary lifting: O(n log n) build, O(log n) query — most practical\n- Euler tour + sparse table: O(n log n) build, O(1) query — fastest for many queries\n- Tarjan's offline: O(n + q) total — best when all queries known upfront\n\n**Applications:**\n- Distance between nodes: dist(u,v) = depth[u] + depth[v] - 2*depth[LCA]\n- Path queries: decompose into u→LCA and v→LCA segments\n- HLD uses LCA concept (chain tops are LCA-related)\n- Kth ancestor: binary lifting directly`,
    },
  ],
}
