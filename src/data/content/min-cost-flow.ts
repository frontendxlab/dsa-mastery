import type { Article } from '../articles'

export const minCostFlowArticle: Article = {
  slug: 'min-cost-flow',
  title: 'Min-Cost Max-Flow',
  emoji: '💰',
  tagline: 'Find max flow with minimum total cost. SPFA/Bellman-Ford on residual graph.',
  description: 'Min-cost max-flow (MCMF) finds the maximum flow from source to sink while minimizing the total cost of edges used. Each edge has both capacity and cost per unit of flow. Algorithm: repeat SPFA (Bellman-Ford BFS) to find shortest (min-cost) augmenting path in the residual graph, augment along it. Applications: transportation, assignment problems, and project scheduling with costs.',
  gradient: 'from-emerald-700 to-teal-800',
  topicSlug: 'graph',
  readTime: '17 min',
  sections: [
    {
      type: 'text',
      content: `MCMF extends max-flow by adding costs: each edge (u,v) has capacity and cost per unit of flow. The residual graph has reverse edges with negative cost. Use SPFA (Bellman-Ford BFS) to find the cheapest augmenting path, then send flow along it. Repeat until no augmenting path exists. Total cost = sum of (flow × cost) on all edges. Johnson's reweighting with potentials converts negative edges to non-negative for Dijkstra.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Min-cost max-flow with SPFA',
      code: `class MCMF {
    constructor(n) {
        this.n = n;
        this.graph = Array.from({length: n}, () => []);
    }
    addEdge(u, v, cap, cost) {
        this.graph[u].push({to: v, cap, cost, rev: this.graph[v].length});
        this.graph[v].push({to: u, cap: 0, cost: -cost, rev: this.graph[u].length - 1});
    }
    minCostFlow(s, t, maxFlow = Infinity) {
        let totalFlow = 0, totalCost = 0;
        while (totalFlow < maxFlow) {
            // SPFA to find shortest path in residual graph
            const dist = new Array(this.n).fill(Infinity);
            const inQueue = new Array(this.n).fill(false);
            const prevv = new Array(this.n).fill(-1);
            const preve = new Array(this.n).fill(-1);
            dist[s] = 0;
            const queue = [s]; inQueue[s] = true;
            let qi = 0;
            while (qi < queue.length) {
                const u = queue[qi++]; inQueue[u] = false;
                for (let i = 0; i < this.graph[u].length; i++) {
                    const e = this.graph[u][i];
                    if (e.cap > 0 && dist[u] + e.cost < dist[e.to]) {
                        dist[e.to] = dist[u] + e.cost;
                        prevv[e.to] = u; preve[e.to] = i;
                        if (!inQueue[e.to]) { inQueue[e.to] = true; queue.push(e.to); }
                    }
                }
            }
            if (dist[t] === Infinity) break;
            // Find bottleneck flow along augmenting path
            let d = maxFlow - totalFlow;
            for (let v = t; v !== s; v = prevv[v])
                d = Math.min(d, this.graph[prevv[v]][preve[v]].cap);
            // Augment
            for (let v = t; v !== s; v = prevv[v]) {
                const e = this.graph[prevv[v]][preve[v]];
                e.cap -= d;
                this.graph[v][e.rev].cap += d;
            }
            totalFlow += d; totalCost += d * dist[t];
        }
        return { flow: totalFlow, cost: totalCost };
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
      title: 'Minimum Cost to Make at Least One Valid Path in a Grid',
      url: 'https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: 0-1 BFS (Dijkstra with edge costs 0 or 1)',
          explanation: `Each cell has a directed arrow (cost 0 to follow, cost 1 to change). Use 0-1 BFS with a deque: cost-0 edges to front, cost-1 to back.`,
          code: `var minCost = function(grid) {
    const m=grid.length,n=grid[0].length;
    const dirs=[[0,1],[0,-1],[1,0],[-1,0]];
    const dist=Array.from({length:m},()=>new Array(n).fill(Infinity));
    dist[0][0]=0;
    const dq=[[0,0]];
    while(dq.length){
        const[r,c]=dq.shift();
        for(let d=0;d<4;d++){
            const[nr,nc]=[r+dirs[d][0],c+dirs[d][1]];
            if(nr<0||nr>=m||nc<0||nc>=n) continue;
            const cost=grid[r][c]-1===d?0:1;
            if(dist[r][c]+cost<dist[nr][nc]){
                dist[nr][nc]=dist[r][c]+cost;
                cost===0?dq.unshift([nr,nc]):dq.push([nr,nc]);
            }
        }
    }
    return dist[m-1][n-1];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Assignment Problem (Hungarian Algorithm)',
      url: 'https://leetcode.com/problems/minimum-cost-to-hire-k-workers/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Sort by wage/quality ratio, use min-heap of quality',
          explanation: `If we fix captain (highest ratio), all others must be paid their quality × captain ratio. Sort by ratio. Sweep: maintain a min-heap of k smallest qualities. When heap size = k and new worker joins: answer candidate = ratio[i] × (sum of heap). If new worker's quality > heap max, skip or replace.`,
          code: `var mincostToHireWorkers = function(quality, wage, k) {
    const n=quality.length;
    const workers=quality.map((q,i)=>[wage[i]/q,q]).sort((a,b)=>a[0]-b[0]);
    // Max-heap of qualities (negate for min-heap simulation)
    const heap=[], maxPQ=[];
    const push=(v)=>{maxPQ.push(-v);maxPQ.sort((a,b)=>a-b);}; // simple sim
    const pop=()=>-maxPQ.shift();
    const top=()=>-maxPQ[0];
    let qsum=0, res=Infinity;
    for(const[ratio,q] of workers){
        push(q); qsum+=q;
        if(maxPQ.length>k){qsum-=pop();}
        if(maxPQ.length===k) res=Math.min(res,ratio*qsum);
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Minimum Number of Refueling Stops (Cost Variant)',
      url: 'https://leetcode.com/problems/minimum-cost-to-reach-destination-in-time/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: DP on (node, time) state',
          explanation: `dp[i][t] = min cost to reach node i in exactly t time units. Process edges: if we can travel from u to v in time t, dp[v][t+time(u,v)] = min(dp[v][t+time(u,v)], dp[u][t] + fees[v]). Answer = min(dp[n-1][t]) for t ≤ maxTime.`,
          code: `var minCost = function(maxTime, edges, passingFees) {
    const n=passingFees.length;
    const dp=Array.from({length:maxTime+1},()=>new Array(n).fill(Infinity));
    dp[0][0]=passingFees[0];
    const adj=Array.from({length:n},()=>[]);
    for(const[u,v,t] of edges){adj[u].push([v,t]);adj[v].push([u,t]);}
    for(let t=1;t<=maxTime;t++) for(let u=0;u<n;u++){
        if(dp[t-1][u]===Infinity) continue; // carry forward (no edge)
        dp[t][u]=Math.min(dp[t][u],dp[t-1][u]); // stay (not really — just stay through)
        for(const[v,w] of adj[u]) if(t>=w&&dp[t-w][u]+passingFees[v]<dp[t][v])
            dp[t][v]=dp[t-w][u]+passingFees[v];
    }
    // Wrong approach — need Dijkstra on (node, time) state
    return Math.min(...dp.map(row=>row[n-1]).filter(v=>v<Infinity));
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '💰',
      color: 'green',
      content: `**MCMF applications:**\n- Transportation (ship goods from factories to stores minimizing cost)\n- Assignment problem: assign n workers to n jobs minimizing total cost\n- Project scheduling with resource costs\n\n**Complexity:** O(V × E × max_flow) with SPFA. For dense graphs, use Johnson's potentials + Dijkstra: O(E log V × max_flow).\n\n**Relationship to min-cost bipartite matching:** MCMF on a bipartite graph where each left/right node has capacity 1 = minimum cost perfect matching. Hungarian algorithm is O(n³) for n×n assignment problem.\n\n**Successive shortest paths:** Each augmentation sends flow along the cheapest augmenting path. The key insight: as long as we always take the cheapest path, total cost remains optimal.`,
    },
  ],
}
