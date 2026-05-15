import type { Article } from '../articles'

export const minimumSpanningTreeArticle: Article = {
  slug: 'minimum-spanning-tree',
  title: 'Minimum Spanning Tree',
  emoji: '🌲',
  tagline: 'Connect all nodes with minimum total edge weight. Kruskal or Prim.',
  description: 'A minimum spanning tree (MST) connects all n nodes with exactly n-1 edges and minimum total weight. Two greedy algorithms: Kruskal\'s (sort edges, add if no cycle — uses Union-Find) and Prim\'s (grow MST from any node, always add cheapest edge — uses min-heap). Both O(E log E). Master MST for network design, clustering, and minimum cost connection problems.',
  gradient: 'from-green-600 to-emerald-700',
  topicSlug: 'graph',
  readTime: '16 min',
  sections: [
    {
      type: 'text',
      content: `MST algorithms are greedy: they never make a suboptimal local choice. Kruskal's sorts all edges by weight, then greedily picks the cheapest edge that doesn't create a cycle (use Union-Find to check). Prim's grows the MST outward from a starting node, always picking the cheapest edge that connects the current tree to a new node. Both produce the same MST weight (may differ in structure if ties exist).`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Kruskal\'s and Prim\'s MST templates',
      code: `// ─── Kruskal's (sort edges + Union-Find) ───────────────────────────────────
function kruskal(n, edges) { // edges = [[weight, u, v], ...]
    edges.sort((a, b) => a[0] - b[0]);
    const parent = Array.from({length: n}, (_, i) => i);
    const rank = new Array(n).fill(0);
    function find(x) {
        if (parent[x] !== x) parent[x] = find(parent[x]);
        return parent[x];
    }
    function union(x, y) {
        const [px, py] = [find(x), find(y)];
        if (px === py) return false;
        if (rank[px] < rank[py]) parent[px] = py;
        else if (rank[px] > rank[py]) parent[py] = px;
        else { parent[py] = px; rank[px]++; }
        return true;
    }
    let totalWeight = 0, edgesUsed = 0;
    for (const [w, u, v] of edges) {
        if (union(u, v)) { totalWeight += w; edgesUsed++; }
        if (edgesUsed === n - 1) break;
    }
    return edgesUsed === n - 1 ? totalWeight : -1; // -1 if graph disconnected
}

// ─── Prim's (min-heap, grow from node 0) ────────────────────────────────────
function prim(n, adjList) { // adjList[u] = [[weight, v], ...]
    const inMST = new Array(n).fill(false);
    const heap = [[0, 0]]; // [cost, node], min-heap
    let totalWeight = 0, count = 0;
    while (heap.length && count < n) {
        const [cost, node] = heap.shift(); // use actual min-heap in prod
        if (inMST[node]) continue;
        inMST[node] = true; totalWeight += cost; count++;
        for (const [w, nei] of adjList[node]) {
            if (!inMST[nei]) heap.push([w, nei]);
        }
        heap.sort((a, b) => a[0] - b[0]); // use priority queue in production
    }
    return count === n ? totalWeight : -1;
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
      title: 'Min Cost to Connect All Points',
      url: 'https://leetcode.com/problems/min-cost-to-connect-all-points/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Prim\'s MST on complete graph',
          explanation: `Each pair of points is an edge with Manhattan distance cost. n² edges total — too many to sort for Kruskal's. Use Prim's with lazy min-dist tracking: maintain minDist[i] = cheapest edge from current MST to point i. Greedy pick cheapest unvisited.`,
          code: `var minCostConnectPoints = function(points) {
    const n=points.length;
    const minDist=new Array(n).fill(Infinity);
    const inMST=new Array(n).fill(false);
    minDist[0]=0;
    let total=0;
    for(let iter=0;iter<n;iter++){
        // Pick min-dist node not yet in MST
        let u=-1;
        for(let i=0;i<n;i++) if(!inMST[i]&&(u===-1||minDist[i]<minDist[u])) u=i;
        inMST[u]=true; total+=minDist[u];
        // Update neighbors
        for(let v=0;v<n;v++) if(!inMST[v]){
            const d=Math.abs(points[u][0]-points[v][0])+Math.abs(points[u][1]-points[v][1]);
            minDist[v]=Math.min(minDist[v],d);
        }
    }
    return total;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Connecting Cities With Minimum Cost',
      url: 'https://leetcode.com/problems/connecting-cities-with-minimum-cost/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Kruskal\'s MST',
          explanation: `Classic MST: sort edges by weight, greedily add edges using Union-Find if they connect two different components. If all n nodes connected, return total weight.`,
          code: `var minimumCost = function(n, connections) {
    const parent=Array.from({length:n+1},(_,i)=>i);
    const find=x=>parent[x]===x?x:(parent[x]=find(parent[x]));
    const union=(x,y)=>{
        const [px,py]=[find(x),find(y)];
        if(px===py) return false;
        parent[px]=py; return true;
    };
    connections.sort((a,b)=>a[2]-b[2]);
    let cost=0,edges=0;
    for(const [u,v,w] of connections){
        if(union(u,v)){cost+=w;edges++;}
        if(edges===n-1) return cost;
    }
    return -1;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Find Critical and Pseudo-Critical Edges in MST',
      url: 'https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Check each edge — force include vs force exclude',
          explanation: `First find baseMST weight. For each edge e:\n- Critical: MST weight WITHOUT e > baseMST → removing it disconnects or increases cost\n- Pseudo-critical: MST weight WITH e forced in = baseMST → it's in some but not all MSTs`,
          code: `var findCriticalAndPseudoCriticalEdges = function(n, edges) {
    const indexed=edges.map((e,i)=>[...e,i]).sort((a,b)=>a[2]-b[2]);
    const makeUF=()=>{
        const p=Array.from({length:n},(_,i)=>i),r=new Array(n).fill(0);
        const find=x=>p[x]===x?x:(p[x]=find(p[x]));
        const union=(x,y)=>{const[px,py]=[find(x),find(y)];if(px===py)return false;r[px]<r[py]?p[px]=py:r[px]>r[py]?p[py]=px:(p[py]=px,r[px]++);return true;};
        return{find,union,size:0};
    };
    const kruskal=(skip,forceEdge)=>{
        const uf=makeUF();
        let w=0,cnt=0;
        if(forceEdge!==-1){const[u,v,wt]=indexed[forceEdge];if(uf.union(u,v)){w+=wt;cnt++;}}
        for(let i=0;i<indexed.length;i++){
            if(i===skip) continue;
            const[u,v,wt]=indexed[i];
            if(uf.union(u,v)){w+=wt;cnt++;}
        }
        return cnt===n-1?w:Infinity;
    };
    const base=kruskal(-1,-1);
    const crit=[],pseudo=[];
    for(let i=0;i<indexed.length;i++){
        if(kruskal(i,-1)>base) crit.push(indexed[i][3]);
        else if(kruskal(-1,i)===base) pseudo.push(indexed[i][3]);
    }
    return[crit,pseudo];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Remove Max Number of Edges to Keep Graph Fully Traversable',
      url: 'https://leetcode.com/problems/remove-max-number-of-edges-to-keep-graph-fully-traversable/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Two Union-Find structures — maximize shared edges',
          explanation: `Type 3 edges (shared by Alice and Bob) are most valuable — add them first. Then add type 1 (Alice only) and type 2 (Bob only). Any edge that doesn't connect new components is redundant (remove it). Verify both graphs are fully connected at the end.`,
          code: `var maxNumEdgesToRemove = function(n, edges) {
    const makeUF=()=>{
        const p=Array.from({length:n+1},(_,i)=>i),r=new Array(n+1).fill(0);
        let comps=n;
        const find=x=>p[x]===x?x:(p[x]=find(p[x]));
        const union=(x,y)=>{const[px,py]=[find(x),find(y)];if(px===py)return false;r[px]<r[py]?p[px]=py:r[px]>r[py]?p[py]=px:(p[py]=px,r[px]++);comps--;return true;};
        return{union,connected:()=>comps===1};
    };
    const [ua,ub]=[makeUF(),makeUF()];
    let removed=0;
    for(const[t,u,v] of edges)
        if(t===3){const a=ua.union(u,v),b=ub.union(u,v);if(!a&&!b) removed++;}
    for(const[t,u,v] of edges){
        if(t===1&&!ua.union(u,v)) removed++;
        if(t===2&&!ub.union(u,v)) removed++;
    }
    return ua.connected()&&ub.connected()?removed:-1;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Optimize Water Distribution in a Village',
      url: 'https://leetcode.com/problems/optimize-water-distribution-in-a-village/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Virtual node MST — add node 0 as water source',
          explanation: `Building a well in house i costs wells[i]. Model as edge from virtual node 0 to node i with cost wells[i-1]. Pipes are edges between houses. MST of this augmented graph = minimum cost to supply all houses.`,
          code: `var minCostToSupplyWater = function(n, wells, pipes) {
    const edges=wells.map((w,i)=>[0,i+1,w]); // virtual source = node 0
    for(const [h1,h2,c] of pipes) edges.push([h1,h2,c]);
    edges.sort((a,b)=>a[2]-b[2]);
    const parent=Array.from({length:n+1},(_,i)=>i);
    const find=x=>parent[x]===x?x:(parent[x]=find(parent[x]));
    const union=(x,y)=>{const[px,py]=[find(x),find(y)];if(px===py)return false;parent[px]=py;return true;};
    let cost=0;
    for(const[u,v,w] of edges) if(union(u,v)) cost+=w;
    return cost;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🌲',
      color: 'green',
      content: `**Kruskal's vs Prim's:**\n- Kruskal's: better for sparse graphs (E log E), uses Union-Find\n- Prim's: better for dense graphs (V² with array, E log V with heap)\n- Both produce same MST weight\n\n**MST properties:**\n- Unique if all edge weights are distinct\n- n-1 edges for n nodes\n- Cut property: lightest edge crossing any cut is in MST\n- Cycle property: heaviest edge in any cycle is NOT in MST\n\n**Key applications:** network design (cable laying), clustering (remove heaviest MST edges), Borůvka for parallel MST, Steiner tree (subset of nodes).`,
    },
  ],
}
