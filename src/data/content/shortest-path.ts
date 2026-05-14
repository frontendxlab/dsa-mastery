import type { Article } from '../articles'

export const shortestPathArticle: Article = {
  slug: 'shortest-path',
  title: 'Shortest Path Algorithms',
  emoji: '🗺️',
  tagline: "Dijkstra for non-negative weights. Bellman-Ford for negatives. Floyd for all pairs.",
  description: 'Weighted graph shortest path problems require choosing the right algorithm. Dijkstra is O((V+E) log V) with a min-heap and works for non-negative weights. Bellman-Ford handles negative edges. Floyd-Warshall solves all-pairs in O(V³). Learn the template for each and when to apply them.',
  gradient: 'from-emerald-400 to-teal-500',
  topicSlug: 'graph',
  readTime: '22 min',
  sections: [
    {
      type: 'text',
      content: `When graph edges have weights, BFS no longer gives shortest paths. You need one of three algorithms: Dijkstra (greedy, non-negative weights), Bellman-Ford (DP, handles negative weights), or Floyd-Warshall (all-pairs DP). The right choice depends on whether negative weights exist, whether you need single-source or all-pairs, and the graph density.`,
    },
    {
      type: 'table',
      headers: ['Algorithm', 'Time', 'Handles Negatives?', 'Use When'],
      rows: [
        ['BFS', 'O(V+E)', 'No (unweighted)', 'All edges weight 1'],
        ['Dijkstra (heap)', 'O((V+E) log V)', 'No', 'Non-negative weights, single source'],
        ['Bellman-Ford', 'O(V·E)', 'Yes', 'Negative weights; negative cycle detection'],
        ['Floyd-Warshall', 'O(V³)', 'Yes (no neg cycles)', 'All pairs, dense graph, V ≤ 500'],
        ['0-1 BFS', 'O(V+E)', 'No', 'Edge weights only 0 or 1'],
        ['SPFA', 'O(V·E) worst', 'Yes', 'Faster Bellman-Ford in practice (risky)'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: "Dijkstra's Algorithm",
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'teal',
      content: `**Dijkstra's key insight**: Greedily process the unvisited node with the smallest known distance. Since all edge weights ≥ 0, this greedy choice is correct — a node processed from the heap has its final shortest distance.\n\n**Min-heap invariant**: heap stores (distance, node). Always process the smallest distance first. When we pop a node, if we've already found a shorter path to it, skip it (lazy deletion).`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: "Dijkstra's — single source shortest path with min-heap",
      code: `// graph[u] = [[v, weight], ...]
function dijkstra(graph, src, n) {
    const dist = new Array(n).fill(Infinity);
    dist[src] = 0;
    // Min-heap: [distance, node]
    // JS doesn't have built-in heap — use sorted array for small n,
    // or implement a binary heap for large n
    const heap = [[0, src]];

    while (heap.length) {
        // Extract minimum (simulate heap with sort for clarity)
        heap.sort((a, b) => a[0] - b[0]);
        const [d, u] = heap.shift();

        if (d > dist[u]) continue;  // stale entry (lazy deletion)

        for (const [v, w] of graph[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                heap.push([dist[v], v]);
            }
        }
    }
    return dist;  // dist[i] = shortest distance from src to i
}

// For competitive programming — minimal heap implementation
class MinHeap {
    constructor() { this.h = []; }
    push(item) {
        this.h.push(item);
        let i = this.h.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (this.h[p][0] <= this.h[i][0]) break;
            [this.h[p], this.h[i]] = [this.h[i], this.h[p]];
            i = p;
        }
    }
    pop() {
        const top = this.h[0];
        const last = this.h.pop();
        if (this.h.length) {
            this.h[0] = last;
            let i = 0;
            while (true) {
                let s = i, l = 2*i+1, r = 2*i+2;
                if (l < this.h.length && this.h[l][0] < this.h[s][0]) s = l;
                if (r < this.h.length && this.h[r][0] < this.h[s][0]) s = r;
                if (s === i) break;
                [this.h[s], this.h[i]] = [this.h[i], this.h[s]];
                i = s;
            }
        }
        return top;
    }
    get size() { return this.h.length; }
}`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Bellman-Ford Algorithm',
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'blue',
      content: `**Bellman-Ford key insight**: Relax ALL edges V-1 times. After k iterations, dist[v] = shortest path using at most k edges. Since any simple path has at most V-1 edges, V-1 iterations give the true shortest paths.\n\n**Negative cycle detection**: Do one more (V-th) relaxation. If any distance still improves, a negative cycle exists (you can keep going around it to get shorter and shorter distances).`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Bellman-Ford — handles negative weights',
      code: `// edges = [[u, v, weight], ...]
function bellmanFord(edges, src, n) {
    const dist = new Array(n).fill(Infinity);
    dist[src] = 0;

    // Relax all edges n-1 times
    for (let i = 0; i < n - 1; i++) {
        let updated = false;
        for (const [u, v, w] of edges) {
            if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                updated = true;
            }
        }
        if (!updated) break;  // early exit if no update
    }

    // Check for negative cycles (V-th relaxation)
    for (const [u, v, w] of edges) {
        if (dist[u] !== Infinity && dist[u] + w < dist[v])
            return null;  // negative cycle detected
    }

    return dist;
}`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Floyd-Warshall (All Pairs)',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Floyd-Warshall — all pairs shortest path in O(V³)',
      code: `function floydWarshall(n, edges) {
    // dist[i][j] = shortest distance from i to j
    const dist = Array.from({length: n}, (_, i) =>
        Array.from({length: n}, (_, j) => i === j ? 0 : Infinity)
    );
    for (const [u, v, w] of edges) {
        dist[u][v] = Math.min(dist[u][v], w);
        // For undirected: dist[v][u] = Math.min(dist[v][u], w);
    }

    // Try every intermediate node k
    for (let k = 0; k < n; k++)
        for (let i = 0; i < n; i++)
            for (let j = 0; j < n; j++)
                if (dist[i][k] + dist[k][j] < dist[i][j])
                    dist[i][j] = dist[i][k] + dist[k][j];

    // Negative cycle: dist[i][i] < 0 for any i
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
          label: 'Intuition 1: Dijkstra from source — max of all shortest distances',
          explanation: `Single source shortest path from node k. All edge weights are positive. Run Dijkstra. Answer = max of all distances (the last node to receive the signal). If any node is unreachable (dist = Infinity), return -1.`,
          code: `var networkDelayTime = function(times, n, k) {
    const graph = Array.from({length: n+1}, () => []);
    for (const [u, v, w] of times) graph[u].push([v, w]);

    const dist = new Array(n+1).fill(Infinity);
    dist[k] = 0;
    const heap = [[0, k]];  // [dist, node]

    while (heap.length) {
        heap.sort((a, b) => a[0] - b[0]);
        const [d, u] = heap.shift();
        if (d > dist[u]) continue;
        for (const [v, w] of graph[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                heap.push([dist[v], v]);
            }
        }
    }
    const max = Math.max(...dist.slice(1));
    return max === Infinity ? -1 : max;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Cheapest Flights Within K Stops',
      url: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Bellman-Ford with at-most-k-edges constraint',
          explanation: `Standard Dijkstra doesn't work here because we have a hop limit (k stops = k+1 edges). Bellman-Ford naturally handles this: after i iterations, dist[v] = cheapest path using at most i edges. Run exactly k+1 iterations. Use a copy of dist each round to prevent using edges added in the same round.`,
          code: `var findCheapestPrice = function(n, flights, src, dst, k) {
    let dist = new Array(n).fill(Infinity);
    dist[src] = 0;

    for (let i = 0; i <= k; i++) {
        const tmp = [...dist];  // copy — don't use edges from this round
        for (const [u, v, w] of flights) {
            if (dist[u] !== Infinity && dist[u] + w < tmp[v])
                tmp[v] = dist[u] + w;
        }
        dist = tmp;
    }
    return dist[dst] === Infinity ? -1 : dist[dst];
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Dijkstra with (cost, node, stops) state',
          explanation: `BFS/Dijkstra on state (cost, node, stops_remaining). Use min-heap on cost. When stops_remaining = 0, can only reach dst directly. Visited tracking needs to include stops to avoid cutting off valid longer-hop paths.`,
          code: `var findCheapestPrice = function(n, flights, src, dst, k) {
    const graph = Array.from({length: n}, () => []);
    for (const [u, v, w] of flights) graph[u].push([v, w]);
    const heap = [[0, src, k+1]]; // [cost, node, remaining_hops]
    const visited = new Map(); // node → max hops_remaining when visited
    while (heap.length) {
        heap.sort((a,b) => a[0]-b[0]);
        const [cost, u, hops] = heap.shift();
        if (u === dst) return cost;
        if (hops === 0) continue;
        if ((visited.get(u) ?? -1) >= hops) continue;
        visited.set(u, hops);
        for (const [v, w] of graph[u])
            heap.push([cost+w, v, hops-1]);
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
      title: 'Path with Minimum Effort',
      url: 'https://leetcode.com/problems/path-with-minimum-effort/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Binary search on effort + BFS validation',
          explanation: `Binary search on the answer (effort). For a given effort limit, BFS/DFS to check if you can reach bottom-right using only steps where |height difference| ≤ effort. O(m·n·log(max_height)).`,
        },
        {
          label: 'Intuition 2: Dijkstra on grid — dist = max height diff on path',
          explanation: `Define dist[r][c] = minimum possible maximum effort to reach (r,c). Use Dijkstra: edge weight from (r,c) to neighbor = |height difference|, but dist[next] = max(dist[curr], edgeWeight). This is the "minimax path" variant of Dijkstra — instead of sum, we take the max along the path.`,
          code: `var minimumEffortPath = function(heights) {
    const m = heights.length, n = heights[0].length;
    const dist = Array.from({length:m}, () => new Array(n).fill(Infinity));
    dist[0][0] = 0;
    const heap = [[0, 0, 0]]; // [effort, row, col]
    const dirs = [[0,1],[0,-1],[1,0],[-1,0]];
    while (heap.length) {
        heap.sort((a,b) => a[0]-b[0]);
        const [eff, r, c] = heap.shift();
        if (r === m-1 && c === n-1) return eff;
        if (eff > dist[r][c]) continue;
        for (const [dr, dc] of dirs) {
            const nr=r+dr, nc=c+dc;
            if (nr<0||nr>=m||nc<0||nc>=n) continue;
            const newEff = Math.max(eff, Math.abs(heights[nr][nc]-heights[r][c]));
            if (newEff < dist[nr][nc]) {
                dist[nr][nc] = newEff;
                heap.push([newEff, nr, nc]);
            }
        }
    }
    return 0;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Find the City with the Smallest Number of Reachable Threshold',
      url: 'https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-reachable-cities-with-threshold-distance/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Floyd-Warshall for all-pairs, then count',
          explanation: `Need all-pairs shortest paths. Floyd-Warshall in O(n³) fits for n ≤ 100. After computing all-pairs distances, for each city count how many other cities are within distanceThreshold. Return the city with smallest count (ties: largest city number).`,
          code: `var findTheCity = function(n, edges, threshold) {
    const dist = Array.from({length:n}, (_,i) => Array.from({length:n}, (_,j) => i===j?0:Infinity));
    for (const [u,v,w] of edges) { dist[u][v]=w; dist[v][u]=w; }
    for (let k=0;k<n;k++)
        for (let i=0;i<n;i++)
            for (let j=0;j<n;j++)
                dist[i][j] = Math.min(dist[i][j], dist[i][k]+dist[k][j]);
    let ans=-1, minCount=Infinity;
    for (let i=0;i<n;i++) {
        const count = dist[i].filter(d => d<=threshold).length - 1; // exclude self
        if (count <= minCount) { minCount=count; ans=i; }
    }
    return ans;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Minimum Cost to Reach Destination in Time',
      url: 'https://leetcode.com/problems/minimum-cost-to-reach-destination-in-time/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Dijkstra with (time, node) state + passing fees',
          explanation: `State = (time_spent, current_node). Edge weight = travel time. Node cost = passing fee paid at each visited node. Can't exceed maxTime. Use Dijkstra on cost, but also track time to prune paths that exceed maxTime. dist[t][node] = min fee to reach node in exactly t time.`,
          code: `var minCost = function(maxTime, edges, passingFees) {
    const n = passingFees.length;
    const graph = Array.from({length:n},()=>[]);
    for (const [x,y,t] of edges) { graph[x].push([y,t]); graph[y].push([x,t]); }
    // dp[t][node] = min fee to reach node in exactly t time
    const dp = Array.from({length:maxTime+1}, () => new Array(n).fill(Infinity));
    dp[0][0] = passingFees[0];
    for (let t=1;t<=maxTime;t++)
        for (let u=0;u<n;u++) {
            if (dp[t-1][u] === Infinity) continue; // can't use this
            // wait option not allowed - just use edges
        }
    // Cleaner: Dijkstra with state (cost, time, node)
    const heap = [[passingFees[0], 0, 0]]; // [cost, time, node]
    const best = Array.from({length:maxTime+1}, () => new Array(n).fill(Infinity));
    best[0][0] = passingFees[0];
    while (heap.length) {
        heap.sort((a,b)=>a[0]-b[0]);
        const [cost, time, u] = heap.shift();
        if (u === n-1) return cost;
        if (cost > best[time][u]) continue;
        for (const [v, t] of graph[u]) {
            const nt = time+t;
            if (nt > maxTime) continue;
            const nc = cost + passingFees[v];
            if (nc < best[nt][v]) {
                best[nt][v] = nc;
                heap.push([nc, nt, v]);
            }
        }
    }
    return -1;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧠',
      color: 'amber',
      content: `**Shortest path algorithm selection:**\n- Unweighted graph → **BFS** (each edge = 1)\n- Non-negative weights, single source → **Dijkstra** with min-heap\n- Negative weights / negative cycle detection → **Bellman-Ford**\n- At-most-k edges constraint → **Bellman-Ford** (k iterations)\n- All pairs, small n (≤500) → **Floyd-Warshall** O(n³)\n- Edge weights only 0/1 → **0-1 BFS** with deque\n- Minimax/maximin path (minimize the maximum edge) → **Dijkstra** with max instead of sum`,
    },
  ],
}
