import type { Article } from '../articles'

export const eulerTourArticle: Article = {
  slug: 'euler-tour',
  title: 'Euler Tour (DFS Order)',
  emoji: '🗺️',
  tagline: 'Flatten a tree into an array. Subtree queries become range queries.',
  description: 'An Euler tour (DFS order / in-time / out-time labeling) assigns each node an entry time and exit time during DFS. The key property: the subtree of node v occupies the contiguous range [in[v], out[v]] in the DFS order array. This converts subtree queries (sum of subtree, update subtree) into range queries on a flat array — solvable with a segment tree or Fenwick tree in O(log n).',
  gradient: 'from-lime-500 to-green-600',
  topicSlug: 'graph',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `The Euler tour trick flattens a tree into a linear array by recording the DFS visit order. Node v enters at time in[v] and leaves at time out[v]. Every node in v's subtree has entry time in [in[v], out[v]]. So "sum all values in subtree of v" = "range sum from in[v] to out[v]" on the flat array. Point update on a node = point update at its DFS position.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Euler tour preprocessing + subtree query',
      code: `function eulerTour(n, edges, values, root = 0) {
    const adj = Array.from({length: n}, () => []);
    for (const [u, v] of edges) { adj[u].push(v); adj[v].push(u); }

    const inTime = new Array(n);
    const outTime = new Array(n);
    const flat = new Array(n); // flat[i] = value of node with DFS order i
    let timer = 0;

    function dfs(u, parent) {
        inTime[u] = timer;
        flat[timer] = values[u];
        timer++;
        for (const v of adj[u]) {
            if (v !== parent) dfs(v, u);
        }
        outTime[u] = timer - 1;
    }
    dfs(root, -1);

    return { inTime, outTime, flat };
    // Now: subtree of u = flat[inTime[u]..outTime[u]]
    // Build segment tree / BIT on flat[] for range queries
}

// LCA via Euler tour (different variant — records every visit)
function eulerTourLCA(n, edges, root = 0) {
    const adj = Array.from({length: n}, () => []);
    for (const [u, v] of edges) { adj[u].push(v); adj[v].push(u); }
    const euler = [], depth = new Array(n).fill(0), first = new Array(n);
    let timer = 0;
    function dfs(u, p, d) {
        first[u] = timer;
        euler[timer++] = [d, u];
        depth[u] = d;
        for (const v of adj[u]) {
            if (v !== p) {
                dfs(v, u, d + 1);
                euler[timer++] = [d, u]; // record return
            }
        }
    }
    dfs(root, -1, 0);
    // LCA(u,v) = min depth in euler[first[u]..first[v]]
    // Use sparse table for O(1) RMQ after O(n log n) build
    return { euler, first, depth };
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
      title: 'Count Nodes Equal to Average of Subtree',
      url: 'https://leetcode.com/problems/count-nodes-equal-to-average-of-subtree/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DFS — return (sum, count) from each subtree',
          explanation: `Post-order DFS: each node gets sum and count from its subtree. Check if current value = floor(sum / count). Count matching nodes.`,
          code: `var averageOfSubtree = function(root) {
    let ans=0;
    const dfs=(node)=>{
        if(!node) return[0,0];
        const[ls,lc]=dfs(node.left),[rs,rc]=dfs(node.right);
        const sum=ls+rs+node.val, cnt=lc+rc+1;
        if(Math.floor(sum/cnt)===node.val) ans++;
        return[sum,cnt];
    };
    dfs(root);
    return ans;
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
          label: 'Intuition 1: DFS — return node if found, LCA when both sides return',
          explanation: `Post-order: if current node is p or q, return it. If both left and right subtrees return non-null, current node is LCA. Otherwise propagate the non-null result upward.`,
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
      title: 'Subtree of Another Tree',
      url: 'https://leetcode.com/problems/subtree-of-another-tree/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: DFS + isSame helper',
          explanation: `For each node in root, check if the subtree rooted there equals subRoot. Use a helper that compares two trees structurally.`,
          code: `var isSubtree = function(root, subRoot) {
    if(!root) return false;
    const same=(a,b)=>{
        if(!a&&!b) return true;
        if(!a||!b||a.val!==b.val) return false;
        return same(a.left,b.left)&&same(a.right,b.right);
    };
    return same(root,subRoot)||isSubtree(root.left,subRoot)||isSubtree(root.right,subRoot);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Time Needed to Inform All Employees',
      url: 'https://leetcode.com/problems/time-needed-to-inform-all-employees/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DFS — max time to inform whole subtree',
          explanation: `Build tree from manager array. DFS: time for node = informTime[node] + max(time for each direct report). Answer = max DFS result from root.`,
          code: `var numOfMinutes = function(n, headID, manager, informTime) {
    const adj=Array.from({length:n},()=>[]);
    for(let i=0;i<n;i++) if(manager[i]!==-1) adj[manager[i]].push(i);
    const dfs=(node)=>{
        let max=0;
        for(const child of adj[node]) max=Math.max(max,dfs(child));
        return informTime[node]+max;
    };
    return dfs(headID);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Vertical Order Traversal of a Binary Tree',
      url: 'https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: DFS with (col, row, val) tuples, sort and group',
          explanation: `Assign each node a column (root=0, left=-1, right=+1) and row (depth). Collect all (col, row, val) tuples, sort by (col, row, val). Group by column.`,
          code: `var verticalTraversal = function(root) {
    const nodes=[];
    const dfs=(node,row,col)=>{
        if(!node) return;
        nodes.push([col,row,node.val]);
        dfs(node.left,row+1,col-1);
        dfs(node.right,row+1,col+1);
    };
    dfs(root,0,0);
    nodes.sort((a,b)=>a[0]-b[0]||a[1]-b[1]||a[2]-b[2]);
    const res=[]; let prev=null;
    for(const[col,,val] of nodes){
        if(col!==prev){res.push([]);prev=col;}
        res.at(-1).push(val);
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🗺️',
      color: 'green',
      content: `**Euler tour applications:**\n- Subtree range query: in[v]..out[v] on flat array\n- LCA via RMQ: euler tour records every visit, LCA = minimum-depth node between first occurrences of u and v\n- Re-rooting DP: combine in-time DFS with parent contributions\n\n**Subtree update trick:** To add delta to all nodes in subtree of v, do point update +delta at in[v] and -delta at out[v]+1 on a difference array, then prefix sums give node values.\n\n**Implementation note:** For LCA via Euler tour, the euler array has 2n-1 entries. Use sparse table on it for O(1) RMQ after O(n log n) build.`,
    },
  ],
}
