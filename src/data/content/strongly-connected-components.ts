import type { Article } from '../articles'

export const stronglyConnectedComponentsArticle: Article = {
  slug: 'strongly-connected-components',
  title: 'Strongly Connected Components',
  emoji: '🔄',
  tagline: 'Tarjan\'s and Kosaraju\'s algorithms. Condense cycles into DAG of SCCs.',
  description: 'A strongly connected component (SCC) is a maximal set of vertices such that every vertex is reachable from every other. SCCs let you condense a directed graph into a DAG (condensation). Algorithms: Tarjan\'s (single DFS, stack, low-link values) and Kosaraju\'s (two DFS passes on original and reversed graph). Applications: 2-SAT, finding cycles, simplifying graph structure.',
  gradient: 'from-indigo-700 to-blue-800',
  topicSlug: 'graph',
  readTime: '15 min',
  sections: [
    {
      type: 'text',
      content: `Tarjan's SCC: DFS with discovery time and low-link values. low[v] = min discovery time reachable from subtree of v (via back/cross edges). If low[v] == disc[v], v is root of an SCC — pop stack until v. Kosaraju's: (1) DFS on original graph, push to stack in finish order. (2) Transpose graph. (3) DFS on transposed graph in reverse finish order — each DFS tree is one SCC. Both O(V+E).`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Tarjan\'s SCC algorithm',
      code: `function tarjanSCC(graph, n) {
    const disc = new Array(n).fill(-1);
    const low = new Array(n).fill(0);
    const onStack = new Array(n).fill(false);
    const stack = [];
    const sccs = [];
    let timer = 0;

    function dfs(u) {
        disc[u] = low[u] = timer++;
        stack.push(u);
        onStack[u] = true;

        for (const v of (graph[u] || [])) {
            if (disc[v] === -1) {
                dfs(v);
                low[u] = Math.min(low[u], low[v]);
            } else if (onStack[v]) {
                low[u] = Math.min(low[u], disc[v]);
            }
        }

        // u is root of an SCC
        if (low[u] === disc[u]) {
            const scc = [];
            let w;
            do {
                w = stack.pop();
                onStack[w] = false;
                scc.push(w);
            } while (w !== u);
            sccs.push(scc);
        }
    }

    for (let i = 0; i < n; i++) if (disc[i] === -1) dfs(i);
    return sccs; // SCCs in reverse topological order
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
      title: 'Course Schedule II',
      url: 'https://leetcode.com/problems/course-schedule-ii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Topological sort via DFS (cycle = no valid order)',
          explanation: `DFS with 3 states: unvisited, in-progress, done. If we hit in-progress node, cycle exists. Push to result after visiting all neighbors (reverse topological order). Reverse at end.`,
          code: `var findOrder = function(numCourses, prerequisites) {
    const adj=Array.from({length:numCourses},()=>[]);
    for(const [a,b] of prerequisites) adj[b].push(a);
    const state=new Array(numCourses).fill(0); // 0=unvisited,1=visiting,2=done
    const order=[];
    const dfs=u=>{
        if(state[u]===1) return false;
        if(state[u]===2) return true;
        state[u]=1;
        for(const v of adj[u]) if(!dfs(v)) return false;
        state[u]=2; order.push(u);
        return true;
    };
    for(let i=0;i<numCourses;i++) if(!dfs(i)) return [];
    return order.reverse();
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Number of Provinces',
      url: 'https://leetcode.com/problems/number-of-provinces/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Count connected components via DFS/Union-Find',
          explanation: `Count unvisited nodes as new components. DFS from each unvisited node marks all reachable nodes. Number of DFS calls = number of provinces.`,
          code: `var findCircleNum = function(isConnected) {
    const n=isConnected.length, vis=new Array(n).fill(false);
    let count=0;
    const dfs=i=>{vis[i]=true;for(let j=0;j<n;j++) if(isConnected[i][j]&&!vis[j]) dfs(j);};
    for(let i=0;i<n;i++) if(!vis[i]){dfs(i);count++;}
    return count;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Critical Connections in a Network',
      url: 'https://leetcode.com/problems/critical-connections-in-a-network/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Tarjan\'s bridge finding — edge (u,v) is bridge if low[v] > disc[u]',
          explanation: `DFS with disc and low arrays. For each edge (u,v): if v not visited, DFS(v), update low[u]=min(low[u],low[v]). If low[v]>disc[u], edge is a bridge. Skip parent edge to avoid false bridges.`,
          code: `var criticalConnections = function(n, connections) {
    const adj=Array.from({length:n},()=>[]);
    for(const [a,b] of connections){adj[a].push(b);adj[b].push(a);}
    const disc=new Array(n).fill(-1), low=new Array(n).fill(0);
    const bridges=[];
    let timer=0;
    const dfs=(u,parent)=>{
        disc[u]=low[u]=timer++;
        for(const v of adj[u]){
            if(v===parent) continue;
            if(disc[v]===-1){
                dfs(v,u);
                low[u]=Math.min(low[u],low[v]);
                if(low[v]>disc[u]) bridges.push([u,v]);
            } else low[u]=Math.min(low[u],disc[v]);
        }
    };
    dfs(0,-1);
    return bridges;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Redundant Connection II',
      url: 'https://leetcode.com/problems/redundant-connection-ii/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Find node with two parents; if none, find cycle edge',
          explanation: `Two cases: (1) Some node has two parents → one of those edges is redundant. Try removing each and check if valid tree. (2) No node has two parents → there's a cycle. Use Union-Find to find the edge that creates the cycle.`,
          code: `var findRedundantDirectedConnection = function(edges) {
    const n=edges.length;
    const parent=new Array(n+1).fill(0);
    let cand1=null,cand2=null;
    // Find node with two parents
    for(const [u,v] of edges){
        if(parent[v]===0) parent[v]=u;
        else{cand1=[parent[v],v];cand2=[u,v];}
    }
    // Union-Find
    const uf=new Array(n+1).fill(0).map((_,i)=>i);
    const find=x=>uf[x]===x?x:uf[x]=find(uf[x]);
    for(const [u,v] of edges){
        if(cand2&&JSON.stringify([u,v])===JSON.stringify(cand2)) continue;
        const pu=find(u),pv=find(v);
        if(pu===pv) return cand1||[u,v];
        uf[pu]=pv;
    }
    return cand2;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🔄',
      color: 'blue',
      content: `**Tarjan's SCC key insight:** low[v] = min discovery time reachable via any path (back edges). If low[v] == disc[v], v is the root of an SCC — everything on the stack above v forms the SCC.\n\n**Condensation DAG:** After finding SCCs, contract each SCC to a single node. The result is a DAG — useful for 2-SAT, shortest path in graphs with cycles.\n\n**Bridges vs SCCs:** Bridge = edge not in any SCC of size ≥ 2. Articulation point = vertex whose removal increases component count. Both use the same low-link technique.`,
    },
  ],
}
