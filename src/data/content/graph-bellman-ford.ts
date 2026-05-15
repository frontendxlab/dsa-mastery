import type { Article } from '../articles'

export const graphBellmanFordArticle: Article = {
  slug: 'graph-bellman-ford',
  title: 'Bellman-Ford & Negative Cycles',
  emoji: '⚠️',
  tagline: 'Shortest paths with negative edges. Detect negative cycles. SPFA optimization.',
  description: 'Bellman-Ford finds shortest paths from a source in O(VE), handling negative edge weights unlike Dijkstra. After V-1 relaxation rounds, one more round that still improves distances reveals a negative cycle. SPFA (Shortest Path Faster Algorithm) is a queue-based optimization that is faster in practice. Applications: arbitrage detection, constraint satisfaction (difference constraints).',
  gradient: 'from-red-800 to-rose-900',
  topicSlug: 'graph',
  readTime: '13 min',
  sections: [
    {
      type: 'text',
      content: `Bellman-Ford: V-1 rounds of relaxing all edges. Each round: for each edge (u,v,w), if dist[u]+w < dist[v], update dist[v]. After V-1 rounds, shortest paths are correct (no path has more than V-1 edges). Round V: if any dist still updates, negative cycle exists. SPFA: only re-relax neighbors of updated vertices (BFS-like queue).`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Bellman-Ford and SPFA templates',
      code: `// Bellman-Ford — O(VE)
function bellmanFord(n, edges, src) {
    const dist = new Array(n).fill(Infinity);
    dist[src] = 0;

    for (let i = 0; i < n - 1; i++) {
        for (const [u, v, w] of edges) {
            if (dist[u] !== Infinity && dist[u] + w < dist[v])
                dist[v] = dist[u] + w;
        }
    }

    // Detect negative cycle
    for (const [u, v, w] of edges)
        if (dist[u] !== Infinity && dist[u] + w < dist[v])
            return null; // negative cycle

    return dist;
}

// SPFA — O(VE) worst case, O(E) average
function spfa(n, adj, src) {
    const dist = new Array(n).fill(Infinity);
    const inQueue = new Array(n).fill(false);
    dist[src] = 0;
    const queue = [src];
    inQueue[src] = true;

    while (queue.length) {
        const u = queue.shift();
        inQueue[u] = false;
        for (const [v, w] of (adj[u] || [])) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                if (!inQueue[v]) { queue.push(v); inQueue[v] = true; }
            }
        }
    }
    return dist;
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
      title: 'Network Delay Time',
      url: 'https://leetcode.com/problems/network-delay-time/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Bellman-Ford — relax all edges V-1 times',
          explanation: `Initialize dist[k]=0, all others Infinity. Relax all edges n-1 times. Answer = max(dist) if all reachable, else -1.`,
          code: `var networkDelayTime = function(times, n, k) {
    const dist=new Array(n+1).fill(Infinity); dist[k]=0;
    for(let i=0;i<n-1;i++)
        for(const [u,v,w] of times)
            if(dist[u]!==Infinity&&dist[u]+w<dist[v]) dist[v]=dist[u]+w;
    const max=Math.max(...dist.slice(1));
    return max===Infinity?-1:max;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Cheapest Flights Within K Stops (Bellman-Ford)',
      url: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Bellman-Ford with exactly k+1 rounds (one per stop)',
          explanation: `Run Bellman-Ford for exactly k+1 rounds. Use a copy each round to prevent multi-hop in same round. dist[v] after i rounds = cheapest price with at most i edges.`,
          code: `var findCheapestPrice = function(n, flights, src, dst, k) {
    let dist=new Array(n).fill(Infinity); dist[src]=0;
    for(let i=0;i<=k;i++){
        const temp=[...dist];
        for(const [u,v,w] of flights)
            if(dist[u]!==Infinity) temp[v]=Math.min(temp[v],dist[u]+w);
        dist=temp;
    }
    return dist[dst]===Infinity?-1:dist[dst];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Find Negative Cycle (Conceptual)',
      url: 'https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Floyd-Warshall for all-pairs shortest paths',
          explanation: `For each city as source, count cities reachable within distanceThreshold. Use Floyd-Warshall for all-pairs. Among cities with minimum count, return the one with largest index.`,
          code: `var findTheCity = function(n, edges, distanceThreshold) {
    const dist=Array.from({length:n},(_,i)=>new Array(n).fill(Infinity));
    for(let i=0;i<n;i++) dist[i][i]=0;
    for(const [u,v,w] of edges){dist[u][v]=w;dist[v][u]=w;}
    for(let k=0;k<n;k++) for(let i=0;i<n;i++) for(let j=0;j<n;j++)
        dist[i][j]=Math.min(dist[i][j],dist[i][k]+dist[k][j]);
    let minCnt=Infinity,res=-1;
    for(let i=0;i<n;i++){
        const cnt=dist[i].filter(d=>d<=distanceThreshold).length-1;
        if(cnt<=minCnt){minCnt=cnt;res=i;}
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Evaluate Division',
      url: 'https://leetcode.com/problems/evaluate-division/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Weighted directed graph + BFS/DFS for path product',
          explanation: `Build graph where edge A→B has weight a/b and B→A has weight b/a. For each query (C,D), find path from C to D, multiply edge weights. BFS finds any path. Return -1 if no path or unknown variable.`,
          code: `var calcEquation = function(equations, values, queries) {
    const graph=new Map();
    const add=(a,b,v)=>{
        if(!graph.has(a)) graph.set(a,new Map());
        graph.get(a).set(b,v);
    };
    for(let i=0;i<equations.length;i++){
        const [a,b]=equations[i],v=values[i];
        add(a,b,v); add(b,a,1/v); add(a,a,1); add(b,b,1);
    }
    const bfs=(src,dst)=>{
        if(!graph.has(src)||!graph.has(dst)) return -1;
        const vis=new Set([src]), q=[[src,1]];
        while(q.length){
            const [u,prod]=q.shift();
            if(u===dst) return prod;
            for(const [v,w] of graph.get(u)){
                if(!vis.has(v)){vis.add(v);q.push([v,prod*w]);}
            }
        }
        return -1;
    };
    return queries.map(([a,b])=>bfs(a,b));
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '⚠️',
      color: 'red',
      content: `**Bellman-Ford vs Dijkstra:**\n- Dijkstra: O(E log V), requires non-negative weights\n- Bellman-Ford: O(VE), handles negative weights, detects negative cycles\n- SPFA: Bellman-Ford with queue optimization, O(E) average but O(VE) worst\n\n**Negative cycle detection:** Run one extra round after V-1 rounds. If any distance still decreases, a negative cycle is reachable from the source.\n\n**K-hop variant:** Run exactly k rounds of relaxation (don't let updates from the same round cascade). Use a copy of the distance array each round.`,
    },
  ],
}
