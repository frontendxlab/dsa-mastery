import type { Article } from '../articles'

export const bridgesArticulationArticle: Article = {
  slug: 'bridges-articulation',
  title: 'Bridges & Articulation Points',
  emoji: '🌉',
  tagline: 'Find critical edges and vertices. DFS with low[] array. O(V+E).',
  description: 'A bridge is an edge whose removal disconnects the graph. An articulation point (cut vertex) is a node whose removal disconnects the graph. Both found via Tarjan\'s DFS in O(V+E): compute disc[v] (discovery time) and low[v] (minimum discovery time reachable via back edges). Bridge: low[child] > disc[parent]. Articulation: low[child] ≥ disc[node] (with root check).',
  gradient: 'from-red-700 to-rose-800',
  topicSlug: 'graph',
  readTime: '15 min',
  sections: [
    {
      type: 'text',
      content: `DFS tree edges go from parent to child. Back edges go from descendant to ancestor. low[v] = minimum of disc[v] and disc of all ancestors reachable via back edges from v's subtree. A back edge "supports" the forward edge above it. Edge (u,v) where u is parent: bridge if low[v] > disc[u] (v's subtree can't reach u or above without this edge). Node u: articulation point if some child v has low[v] ≥ disc[u] (or u is root with ≥2 children).`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Tarjan\'s algorithm for bridges and articulation points',
      code: `function findBridgesAndCuts(n, edges) {
    const adj = Array.from({length: n}, () => []);
    for (const [u, v, id] of edges) {
        adj[u].push([v, id]);
        adj[v].push([u, id]);
    }

    const disc = new Array(n).fill(-1);
    const low = new Array(n).fill(0);
    const bridges = [], cuts = [];
    let timer = 0;

    function dfs(u, parentEdgeId) {
        disc[u] = low[u] = timer++;
        let children = 0;

        for (const [v, eid] of adj[u]) {
            if (disc[v] === -1) {
                children++;
                dfs(v, eid);
                low[u] = Math.min(low[u], low[v]);

                // Bridge check: v's subtree can't reach u or above
                if (low[v] > disc[u]) bridges.push(eid);

                // Articulation point: non-root with low[v] >= disc[u]
                if (parentEdgeId !== -1 && low[v] >= disc[u]) cuts.push(u);
            } else if (eid !== parentEdgeId) {
                // Back edge (not parent): update low
                low[u] = Math.min(low[u], disc[v]);
            }
        }

        // Root is articulation point iff it has >= 2 DFS children
        if (parentEdgeId === -1 && children >= 2) cuts.push(u);
    }

    for (let i = 0; i < n; i++) if (disc[i] === -1) dfs(i, -1);
    return { bridges: [...new Set(bridges)], cuts: [...new Set(cuts)] };
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
      title: 'Critical Connections in a Network',
      url: 'https://leetcode.com/problems/critical-connections-in-a-network/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Tarjan\'s bridges',
          explanation: `An edge (u,v) is a bridge if no back edge in v's DFS subtree can reach u or higher. Compute low[] values. Edge (parent, child) is bridge if low[child] > disc[parent].`,
          code: `var criticalConnections = function(n, connections) {
    const adj=Array.from({length:n},()=>[]);
    for(const[u,v] of connections){adj[u].push(v);adj[v].push(u);}
    const disc=new Array(n).fill(-1), low=new Array(n).fill(0);
    const res=[]; let timer=0;
    const dfs=(u,parent)=>{
        disc[u]=low[u]=timer++;
        for(const v of adj[u]){
            if(disc[v]===-1){
                dfs(v,u); low[u]=Math.min(low[u],low[v]);
                if(low[v]>disc[u]) res.push([u,v]);
            } else if(v!==parent) low[u]=Math.min(low[u],disc[v]);
        }
    };
    for(let i=0;i<n;i++) if(disc[i]===-1) dfs(i,-1);
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Minimum Number of Days to Disconnect Island',
      url: 'https://leetcode.com/problems/minimum-number-of-days-to-disconnect-island/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Answer is 0, 1, or 2',
          explanation: `If already disconnected: 0. Check all land cells: if removing any one disconnects the island: 1. Otherwise always 2 (remove any corner of any land block creates disconnection). Use DFS to count islands.`,
          code: `var minDays = function(grid) {
    const m=grid.length,n=grid[0].length;
    const dirs=[[0,1],[0,-1],[1,0],[-1,0]];
    const count=()=>{
        const vis=Array.from({length:m},()=>new Array(n).fill(false));
        let c=0;
        const dfs=(r,c_)=>{
            if(r<0||r>=m||c_<0||c_>=n||vis[r][c_]||!grid[r][c_]) return;
            vis[r][c_]=true;
            dirs.forEach(([dr,dc])=>dfs(r+dr,c_+dc));
        };
        for(let r=0;r<m;r++) for(let c_=0;c_<n;c_++)
            if(grid[r][c_]&&!vis[r][c_]){dfs(r,c_);c++;}
        return c;
    };
    if(count()!==1) return 0;
    for(let r=0;r<m;r++) for(let c_=0;c_<n;c_++) if(grid[r][c_]){
        grid[r][c_]=0;
        if(count()!==1) return 1;
        grid[r][c_]=1;
    }
    return 2;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Number of Connected Components After Removing a Vertex',
      url: 'https://leetcode.com/problems/count-the-number-of-complete-components/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: BFS per component — check complete condition',
          explanation: `Find all connected components via BFS/DFS. A component is complete if every node connects to every other (edges = n*(n-1)/2). Count complete components.`,
          code: `var countCompleteComponents = function(n, edges) {
    const adj=Array.from({length:n},()=>[]);
    for(const[a,b] of edges){adj[a].push(b);adj[b].push(a);}
    const vis=new Array(n).fill(false); let count=0;
    for(let i=0;i<n;i++){
        if(vis[i]) continue;
        const comp=[]; const q=[i]; vis[i]=true;
        while(q.length){
            const u=q.shift(); comp.push(u);
            for(const v of adj[u]) if(!vis[v]){vis[v]=true;q.push(v);}
        }
        const sz=comp.length;
        const edgeCount=comp.reduce((s,u)=>s+adj[u].length,0)/2;
        if(edgeCount===sz*(sz-1)/2) count++;
    }
    return count;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🌉',
      color: 'red',
      content: `**Bridge and articulation point conditions:**\n- Bridge (u,v): low[v] > disc[u] (strictly greater)\n- Articulation non-root: low[v] ≥ disc[u] for any child v (≥, not >)\n- Articulation root: root has ≥ 2 DFS tree children\n\n**low[v] definition:** min of disc[v], disc of back-edge ancestors reachable from v's subtree\n\n**Bridge tree:** Contract each 2-edge-connected component to a node. Bridges become the tree edges. Useful for "after removing bridge, how many nodes in each component?"\n\n**Parallel edges:** Use edge IDs (not parent node) to avoid counting back-edge on duplicate edges as a bridge.`,
    },
  ],
}
