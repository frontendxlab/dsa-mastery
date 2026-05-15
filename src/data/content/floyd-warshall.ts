import type { Article } from '../articles'

export const floydWarshallArticle: Article = {
  slug: 'floyd-warshall',
  title: 'Floyd-Warshall All-Pairs Shortest Paths',
  emoji: '🌐',
  tagline: 'O(V³) all-pairs shortest paths. Transitive closure, detect negative cycles.',
  description: 'Floyd-Warshall computes shortest paths between every pair of vertices in O(V³). Key insight: dp[k][i][j] = shortest path from i to j using only vertices 0..k as intermediates. Optimized to 2D: for each intermediate vertex k, relax all pairs. Detects negative cycles if any dp[i][i] < 0 after completion. Also computes transitive closure (reachability).',
  gradient: 'from-green-700 to-teal-800',
  topicSlug: 'graph',
  readTime: '12 min',
  sections: [
    {
      type: 'text',
      content: `Floyd-Warshall: initialize dist[i][j] = weight of edge (i,j) or Infinity if no edge, dist[i][i] = 0. For k from 0 to n-1: for all i,j: dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]). After n iterations, dist[i][j] = shortest path. If dist[i][i] < 0, negative cycle exists. For transitive closure: use boolean OR instead of min.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Floyd-Warshall template',
      code: `function floydWarshall(n, edges) {
    // Initialize distance matrix
    const dist = Array.from({length: n}, (_, i) =>
        Array.from({length: n}, (_, j) => i === j ? 0 : Infinity)
    );

    // Add edges
    for (const [u, v, w] of edges) {
        dist[u][v] = Math.min(dist[u][v], w);
        // dist[v][u] = w; // for undirected
    }

    // Relax through each intermediate vertex
    for (let k = 0; k < n; k++)
        for (let i = 0; i < n; i++)
            for (let j = 0; j < n; j++)
                if (dist[i][k] + dist[k][j] < dist[i][j])
                    dist[i][j] = dist[i][k] + dist[k][j];

    // Check for negative cycles
    for (let i = 0; i < n; i++)
        if (dist[i][i] < 0) return null; // negative cycle

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
      title: 'Find the City With the Smallest Number of Neighbors at a Threshold Distance',
      url: 'https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Floyd-Warshall, then count neighbors within threshold for each city',
          explanation: `All-pairs shortest paths with Floyd-Warshall. For each city, count others within distanceThreshold. Among cities with minimum such count, return the one with largest index.`,
          code: `var findTheCity = function(n, edges, distanceThreshold) {
    const d=Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?0:Infinity));
    for(const [u,v,w] of edges){d[u][v]=d[v][u]=w;}
    for(let k=0;k<n;k++) for(let i=0;i<n;i++) for(let j=0;j<n;j++)
        d[i][j]=Math.min(d[i][j],d[i][k]+d[k][j]);
    let best=-1,minCnt=Infinity;
    for(let i=0;i<n;i++){
        const cnt=d[i].filter(x=>x<=distanceThreshold).length-1;
        if(cnt<=minCnt){minCnt=cnt;best=i;}
    }
    return best;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Course Schedule IV',
      url: 'https://leetcode.com/problems/course-schedule-iv/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Transitive closure — reachability with Floyd-Warshall',
          explanation: `reachable[i][j] = can course i be reached from course j (is j a prerequisite of i). Use Floyd-Warshall with boolean OR. For each query (u,v), check reachable[v][u].`,
          code: `var checkIfPrerequisite = function(numCourses, prerequisites, queries) {
    const reach=Array.from({length:numCourses},(_,i)=>new Array(numCourses).fill(false));
    for(const [a,b] of prerequisites) reach[a][b]=true;
    for(let k=0;k<numCourses;k++) for(let i=0;i<numCourses;i++) for(let j=0;j<numCourses;j++)
        reach[i][j]|=reach[i][k]&&reach[k][j];
    return queries.map(([u,v])=>reach[u][v]);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Number of Ways to Arrive at Destination',
      url: 'https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Dijkstra with count tracking — count shortest paths',
          explanation: `Run Dijkstra from source. For each node, track both minimum distance and number of ways to reach it with that distance. When relaxing: if equal distance, add count; if strictly shorter, update distance and reset count.`,
          code: `var countPaths = function(n, roads) {
    const MOD=1e9+7;
    const adj=Array.from({length:n},()=>[]);
    for(const [u,v,t] of roads){adj[u].push([v,t]);adj[v].push([u,t]);}
    const dist=new Array(n).fill(Infinity), ways=new Array(n).fill(0);
    dist[0]=0; ways[0]=1;
    const heap=[[0,0]]; // [dist, node]
    while(heap.length){
        heap.sort((a,b)=>a[0]-b[0]);
        const [d,u]=heap.shift();
        if(d>dist[u]) continue;
        for(const [v,w] of adj[u]){
            if(dist[u]+w<dist[v]){dist[v]=dist[u]+w;ways[v]=ways[u];heap.push([dist[v],v]);}
            else if(dist[u]+w===dist[v]) ways[v]=(ways[v]+ways[u])%MOD;
        }
    }
    return ways[n-1];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🌐',
      color: 'green',
      content: `**Floyd-Warshall vs Dijkstra:**\n- Dijkstra: O(E log V) per source, O(VE log V) for all-pairs\n- Floyd-Warshall: O(V³) — better when V is small (< 500) and graph is dense\n- Floyd-Warshall handles negative edges (but not negative cycles)\n\n**Applications:**\n- All-pairs shortest paths in dense graphs\n- Transitive closure (reachability)\n- Detect negative cycles (diagonal becomes negative)\n- Find shortest path through required intermediate nodes\n\n**Optimization:** If only specific pairs needed, multiple Dijkstra runs may be faster than Floyd-Warshall.`,
    },
  ],
}
