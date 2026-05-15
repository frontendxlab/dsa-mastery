import type { Article } from '../articles'

export const graphAdvancedArticle: Article = {
  slug: 'graph-advanced',
  title: 'Advanced Graph: SCC, Bridges & 2-SAT',
  emoji: '🕸️',
  tagline: 'Tarjan finds everything: SCCs, bridges, articulation points — one DFS.',
  description: 'Advanced graph algorithms detect critical structure: Strongly Connected Components (Kosaraju/Tarjan), bridges (edges whose removal disconnects), articulation points (vertices whose removal disconnects), and 2-SAT (satisfiability for pairs of boolean variables). These appear in hard graph problems.',
  gradient: 'from-slate-600 to-gray-700',
  topicSlug: 'graph',
  readTime: '22 min',
  sections: [
    {
      type: 'text',
      content: `Once you've mastered BFS/DFS for basic traversal, the next level is finding critical structure in graphs: Which edges are bridges (removal disconnects the graph)? Which vertices are articulation points? Which nodes are strongly connected (can reach each other)? These all use variants of one DFS with timestamps and low values.`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Strongly Connected Components (Kosaraju)',
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'teal',
      content: `**SCC**: A maximal subgraph where every node can reach every other. Kosaraju's algorithm:\n1. DFS on original graph; push nodes to stack in FINISH order\n2. Transpose the graph (reverse all edges)\n3. DFS on transposed graph in reverse finish order — each DFS tree = one SCC\n\nTarjan's algorithm does it in one pass using disc (discovery time) and low (minimum discovery time reachable).`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Kosaraju\'s SCC — two DFS passes',
      code: `function kosaraju(n, adj) {
    const vis = new Array(n).fill(false);
    const order = [];
    // Pass 1: DFS on original, record finish order
    const dfs1 = (u) => {
        vis[u] = true;
        for (const v of adj[u]) if (!vis[v]) dfs1(v);
        order.push(u);
    };
    for (let i = 0; i < n; i++) if (!vis[i]) dfs1(i);
    // Transpose graph
    const radj = Array.from({length:n}, ()=>[]);
    for (let u = 0; u < n; u++) for (const v of adj[u]) radj[v].push(u);
    // Pass 2: DFS on transposed in reverse finish order
    vis.fill(false);
    const sccs = [];
    const dfs2 = (u, scc) => {
        vis[u] = true; scc.push(u);
        for (const v of radj[u]) if (!vis[v]) dfs2(v, scc);
    };
    while (order.length) {
        const u = order.pop();
        if (!vis[u]) { const scc = []; dfs2(u, scc); sccs.push(scc); }
    }
    return sccs; // each array = one SCC
}`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Bridges and Articulation Points (Tarjan)',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Tarjan\'s bridge/articulation point algorithm',
      code: `function findBridgesAndAP(n, adj) {
    const disc = new Array(n).fill(-1); // discovery time
    const low  = new Array(n).fill(0);  // min disc reachable via back edges
    const bridges = [], aps = new Set();
    let timer = 0;

    const dfs = (u, parent) => {
        disc[u] = low[u] = timer++;
        let childCount = 0;
        for (const v of adj[u]) {
            if (disc[v] === -1) { // tree edge
                childCount++;
                dfs(v, u);
                low[u] = Math.min(low[u], low[v]);
                // Bridge: no back edge from subtree of v reaches above u
                if (low[v] > disc[u]) bridges.push([u, v]);
                // Articulation point:
                if (parent === -1 && childCount > 1) aps.add(u); // root with 2+ children
                if (parent !== -1 && low[v] >= disc[u]) aps.add(u); // non-root
            } else if (v !== parent) { // back edge (not to direct parent)
                low[u] = Math.min(low[u], disc[v]);
            }
        }
    };
    for (let i = 0; i < n; i++) if (disc[i] === -1) dfs(i, -1);
    return { bridges, aps: [...aps] };
}

// KEY INSIGHT:
// low[v] = min discovery time reachable from subtree of v using back edges
// Bridge (u,v): low[v] > disc[u] — subtree of v can't reach u or above without edge u-v
// AP u: low[v] >= disc[u] for some child v — subtree of v needs u to connect to rest`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Critical Connections in a Network (Bridges)',
      url: 'https://leetcode.com/problems/critical-connections-in-a-network/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Tarjan\'s bridge algorithm',
          explanation: `An edge (u,v) is a bridge if removing it disconnects the graph. Using Tarjan: (u,v) is a bridge if low[v] > disc[u] — meaning the subtree rooted at v has no back edge reaching disc[u] or earlier.`,
          code: `var criticalConnections = function(n, connections) {
    const adj=Array.from({length:n},()=>[]);
    for(const [u,v] of connections){adj[u].push(v);adj[v].push(u);}
    const disc=new Array(n).fill(-1), low=new Array(n).fill(0);
    const bridges=[];
    let timer=0;
    const dfs=(u,par)=>{
        disc[u]=low[u]=timer++;
        for(const v of adj[u]){
            if(disc[v]===-1){
                dfs(v,u);
                low[u]=Math.min(low[u],low[v]);
                if(low[v]>disc[u]) bridges.push([u,v]);
            } else if(v!==par) low[u]=Math.min(low[u],disc[v]);
        }
    };
    for(let i=0;i<n;i++) if(disc[i]===-1) dfs(i,-1);
    return bridges;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Strongly Connected Components (Tarjan)',
      url: 'https://leetcode.com/problems/number-of-provinces/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Number of SCCs using DFS/Union-Find',
          explanation: `For undirected graph: connected components = SCCs. Use DFS flood-fill or Union-Find to count components. For directed graphs: use Kosaraju or Tarjan to find SCCs.`,
          code: `var findCircleNum = function(isConnected) {
    const n=isConnected.length;
    const vis=new Array(n).fill(false);
    let components=0;
    const dfs=u=>{
        vis[u]=true;
        for(let v=0;v<n;v++) if(!vis[v]&&isConnected[u][v]) dfs(v);
    };
    for(let i=0;i<n;i++) if(!vis[i]){dfs(i);components++;}
    return components;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Redundant Connection II (directed graph cycle)',
      url: 'https://leetcode.com/problems/redundant-connection-ii/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Two cases: node with 2 parents OR cycle with root',
          explanation: `In a rooted tree, every node has exactly one parent. Case 1: a node has 2 parents → one of those edges is redundant. Case 2: no node has 2 parents but there's a cycle → the last edge forming the cycle is redundant. Handle both cases with Union-Find.`,
          code: `var findRedundantDirectedConnection = function(edges) {
    const n=edges.length;
    const parent=new Array(n+1).fill(0);
    let cand1=null, cand2=null;
    // Find node with 2 parents
    for(const [u,v] of edges){
        if(parent[v]){cand1=[parent[v],v];cand2=[u,v];}
        else parent[v]=u;
    }
    // Try removing cand2, check if still has cycle
    const uf=Array.from({length:n+1},(_,i)=>i);
    const find=x=>uf[x]===x?x:(uf[x]=find(uf[x]));
    for(const [u,v] of edges){
        if(cand2&&u===cand2[0]&&v===cand2[1]) continue; // skip cand2
        const pu=find(u),pv=find(v);
        if(pu===pv){return cand1??[u,v];} // cycle: either cand1 or this edge
        uf[pu]=pv;
    }
    return cand2;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Minimum Number of Days to Disconnect Island',
      url: 'https://leetcode.com/problems/minimum-number-of-days-to-disconnect-island/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: 0, 1, or 2 days — prove cases',
          explanation: `Answer is always 0, 1, or 2. 0: already disconnected (0 or 2+ islands). 1: removing an articulation point disconnects (check all cells). 2: always possible — remove corner of any island. So: if 0→return 0; if removing any single cell disconnects→return 1; else return 2.`,
          code: `var minDays = function(grid) {
    const m=grid.length, n=grid[0].length;
    const countIslands=()=>{
        const vis=Array.from({length:m},()=>new Array(n).fill(false));
        const dfs=(r,c)=>{
            if(r<0||r>=m||c<0||c>=n||vis[r][c]||grid[r][c]===0) return;
            vis[r][c]=true; [[0,1],[0,-1],[1,0],[-1,0]].forEach(([dr,dc])=>dfs(r+dr,c+dc));
        };
        let count=0;
        for(let r=0;r<m;r++) for(let c=0;c<n;c++) if(!vis[r][c]&&grid[r][c]===1){dfs(r,c);count++;}
        return count;
    };
    if(countIslands()!==1) return 0; // already disconnected
    for(let r=0;r<m;r++) for(let c=0;c<n;c++) if(grid[r][c]===1){
        grid[r][c]=0;
        if(countIslands()!==1){grid[r][c]=1;return 1;}
        grid[r][c]=1;
    }
    return 2;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧠',
      color: 'gray',
      content: `**When to use advanced graph algorithms:**\n- "Which edges/nodes are critical?" → Bridges/Articulation Points (Tarjan)\n- "Which nodes can reach each other in directed graph?" → SCC (Kosaraju/Tarjan)\n- "Minimum edges to make strongly connected?" → Condense to DAG, count in/out-degree 0 nodes\n- "Satisfiability with pairs of boolean constraints?" → 2-SAT (build implication graph, SCC)\n\n**Tarjan's low-link values:**\n- disc[u]: discovery time (when we first visit u)\n- low[u]: minimum disc reachable from subtree of u via back edges\n- Bridge: edge (u,v) where low[v] > disc[u]\n- Articulation point: vertex u where low[v] >= disc[u] for some child v`,
    },
  ],
}
