import type { Article } from '../articles'

export const treeDiameterArticle: Article = {
  slug: 'tree-diameter',
  title: 'Tree Diameter & Path Queries',
  emoji: '🌐',
  tagline: 'Diameter via two BFS. Rerooting DP for all-root path queries. Longest path in O(n).',
  description: 'The tree diameter is the longest path between any two nodes. Found via two BFS/DFS: first from any node to find the farthest node u, then from u to find the farthest node v — distance uv is the diameter. Rerooting DP computes the longest path through each node as root in O(n) using a two-pass DFS. Essential for: farthest node from each node, tree center, and path queries on trees.',
  gradient: 'from-green-800 to-emerald-900',
  topicSlug: 'graph',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `Tree diameter algorithm: (1) BFS from any node, find farthest node u. (2) BFS from u, find farthest node v. Distance uv = diameter. Why: the farthest node from any starting point is always an endpoint of some diameter. Rerooting: compute "down" distances (deepest path going into subtree) in first DFS, then "up" distances (going through parent and other subtrees) in second DFS. Each node's farthest neighbor is max(down, up).`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Tree diameter and rerooting template',
      code: `// Tree diameter via two BFS
function treeDiameter(n, edges) {
    const adj = Array.from({length: n}, () => []);
    for (const [u, v] of edges) { adj[u].push(v); adj[v].push(u); }

    const bfs = (start) => {
        const dist = new Array(n).fill(-1); dist[start] = 0;
        const q = [start]; let i = 0, farthest = start;
        while (i < q.length) {
            const u = q[i++];
            for (const v of adj[u]) if (dist[v] === -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
                if (dist[v] > dist[farthest]) farthest = v;
            }
        }
        return { farthest, dist };
    };

    const { farthest: u } = bfs(0);
    const { farthest: v, dist } = bfs(u);
    return { diameter: dist[v], endpoints: [u, v] };
}

// Rerooting: for each node, farthest distance in the whole tree
function allFarthest(n, adj) {
    const down = new Array(n).fill(0);   // farthest in subtree (rooted at 0)
    const down2 = new Array(n).fill(0);  // 2nd farthest (different subtree)
    const up = new Array(n).fill(0);     // farthest going through parent

    // DFS1: compute down[] (bottom-up)
    // DFS2: compute up[] (top-down), answer = max(down[u], up[u])
    // For each node: farthest = max(down[u], up[u])
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
      title: 'Tree Diameter',
      url: 'https://leetcode.com/problems/tree-diameter/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Two BFS from endpoints',
          explanation: `BFS from node 0 to find farthest node u. BFS from u to find farthest node v. Diameter = dist(u,v).`,
          code: `var treeDiameter = function(edges) {
    if(!edges.length) return 0;
    const n=edges.length+1;
    const adj=Array.from({length:n},()=>[]);
    for(const[a,b] of edges){adj[a].push(b);adj[b].push(a);}
    const bfs=(s)=>{
        const d=new Array(n).fill(-1); d[s]=0;
        const q=[s]; let far=s,i=0;
        while(i<q.length){
            const u=q[i++];
            for(const v of adj[u]) if(d[v]===-1){d[v]=d[u]+1;q.push(v);if(d[v]>d[far])far=v;}
        }
        return[far,d];
    };
    const[u]=bfs(0);
    const[v,d]=bfs(u);
    return d[v];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'All Nodes Distance K in Binary Tree',
      url: 'https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Add parent pointers, BFS from target',
          explanation: `Build parent map via DFS. Then BFS from target node, treating the tree as an undirected graph (can go to parent, left, or right). Stop at distance k. Collect all nodes at distance exactly k.`,
          code: `var distanceK = function(root, target, k) {
    const parent=new Map();
    const dfs=(node,par)=>{
        if(!node) return;
        parent.set(node,par);
        dfs(node.left,node); dfs(node.right,node);
    };
    dfs(root,null);
    const res=[]; const vis=new Set([target]);
    let q=[target];
    for(let d=0;d<k;d++){
        const next=[];
        for(const node of q){
            for(const nei of [node.left,node.right,parent.get(node)])
                if(nei&&!vis.has(nei)){vis.add(nei);next.push(nei);}
        }
        q=next;
    }
    return q.map(n=>n.val);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Count Nodes Equal to Sum of Descendants',
      url: 'https://leetcode.com/problems/count-nodes-equal-to-sum-of-descendants/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Post-order DFS returning subtree sum',
          explanation: `Post-order: compute subtree sum for each node. Node satisfies condition iff node.val == left_sum + right_sum. Count such nodes.`,
          code: `var equalToDescendants = function(root) {
    let count=0;
    const dfs=(node)=>{
        if(!node) return 0;
        const s=dfs(node.left)+dfs(node.right);
        if(node.val===s) count++;
        return node.val+s;
    };
    dfs(root); return count;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Minimum Height Trees',
      url: 'https://leetcode.com/problems/minimum-height-trees/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Tree center = endpoints of diameter stripped of leaves',
          explanation: `The center of a tree (1 or 2 nodes) minimizes maximum distance to any node. Peel leaves iteratively — the remaining nodes are the centers. At most 2 nodes remain.`,
          code: `var findMinHeightTrees = function(n, edges) {
    if(n===1) return [0];
    const adj=Array.from({length:n},()=>new Set());
    for(const[a,b] of edges){adj[a].add(b);adj[b].add(a);}
    let leaves=[];
    for(let i=0;i<n;i++) if(adj[i].size===1) leaves.push(i);
    let rem=n;
    while(rem>2){
        rem-=leaves.length;
        const next=[];
        for(const l of leaves){
            const [nei]=[...adj[l]]; adj[nei].delete(l);
            if(adj[nei].size===1) next.push(nei);
        }
        leaves=next;
    }
    return leaves;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🌐',
      color: 'green',
      content: `**Tree diameter proofs:**\n- Two BFS proof: farthest from any node is always a diameter endpoint\n- Equivalently: if u is farthest from any node v, then u is an endpoint of some diameter\n\n**Tree center:**\n- 1 or 2 nodes equidistant from all leaves\n- Found by peeling leaves (BFS from outside)\n- OR: midpoint(s) of diameter path\n\n**Rerooting DP pattern:**\n1. DFS1 (bottom-up): compute dp[v] for subtree rooted at v\n2. DFS2 (top-down): compute dp2[v] = contribution from parent side\n3. Answer at v = combine dp[v] and dp2[v]\n\nUsed for: sum of distances (each node as root), max path through each node, count of nodes at each distance.`,
    },
  ],
}
