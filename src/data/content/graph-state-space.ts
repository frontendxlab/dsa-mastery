import type { Article } from '../articles'

export const graphStateSpaceArticle: Article = {
  slug: 'graph-state-space',
  title: 'Graph State Space Search',
  emoji: '🗺️',
  tagline: 'BFS/Dijkstra on augmented states. (node, extra_state) as graph vertices.',
  description: 'Many graph problems require tracking extra state alongside position: (node, fuel_remaining), (node, health), (node, visited_bitmask), (node, num_stops). Model these as a new graph where each "vertex" is (original_node, extra_state). BFS finds shortest path if uniform cost; Dijkstra handles weighted. State space can be O(V × S) where S = number of extra state values.',
  gradient: 'from-rose-700 to-pink-800',
  topicSlug: 'graph',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `State space graph: vertex = (position, extra_state). Edge exists when you can transition from one state to another. BFS on this graph finds minimum steps; Dijkstra finds minimum cost. Key: choose state representation carefully — too coarse loses information, too fine causes exponential blowup. Common extra states: remaining fuel, remaining moves, number of obstacles eliminated, visited bitmask (for small sets).`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Dijkstra on state space: (node, stops) for flight pricing',
      code: `// Cheapest Flights Within K Stops — Dijkstra on (cost, node, stops_remaining)
function cheapestFlights(n, flights, src, dst, k) {
    const adj = Array.from({length: n}, () => []);
    for (const [u, v, w] of flights) adj[u].push([v, w]);

    // dist[node][stops] = min cost to reach node with stops remaining
    const dist = Array.from({length: n}, () => new Array(k+2).fill(Infinity));
    dist[src][k+1] = 0;

    // Min-heap: [cost, node, stops_remaining]
    const heap = [[0, src, k+1]];

    while (heap.length) {
        heap.sort((a,b) => a[0]-b[0]); // simple priority queue
        const [cost, u, stops] = heap.shift();
        if (u === dst) return cost;
        if (stops === 0) continue;
        for (const [v, w] of adj[u]) {
            const newCost = cost + w;
            if (newCost < dist[v][stops-1]) {
                dist[v][stops-1] = newCost;
                heap.push([newCost, v, stops-1]);
            }
        }
    }
    return -1;
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
      title: 'Cheapest Flights Within K Stops',
      url: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Bellman-Ford with k+1 relaxation rounds',
          explanation: `Run Bellman-Ford for exactly k+1 rounds. Each round = one more stop allowed. Use a copy of distances each round to avoid using edges from the same round twice.`,
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
      num: 2,
      title: 'Shortest Path in a Grid with Obstacles Elimination',
      url: 'https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: BFS on state (row, col, obstacles_remaining)',
          explanation: `State = (r, c, k_remaining). BFS guarantees minimum steps. visited[r][c][k] prevents revisiting same state. When hitting obstacle, decrement k. When k < 0, skip this path.`,
          code: `var shortestPath = function(grid, k) {
    const m=grid.length,n=grid[0].length;
    if(m===1&&n===1) return 0;
    const vis=Array.from({length:m},()=>Array.from({length:n},()=>new Array(k+1).fill(false)));
    const q=[[0,0,k,0]]; vis[0][0][k]=true;
    const dirs=[[0,1],[0,-1],[1,0],[-1,0]];
    while(q.length){
        const [r,c,rem,steps]=q.shift();
        for(const [dr,dc] of dirs){
            const [nr,nc]=[r+dr,c+dc];
            if(nr<0||nr>=m||nc<0||nc>=n) continue;
            const nk=rem-grid[nr][nc];
            if(nk<0) continue;
            if(nr===m-1&&nc===n-1) return steps+1;
            if(!vis[nr][nc][nk]){vis[nr][nc][nk]=true;q.push([nr,nc,nk,steps+1]);}
        }
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
      title: 'Jump Game VII',
      url: 'https://leetcode.com/problems/jump-game-vii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: BFS with range tracking using prefix sums to avoid O(n²)',
          explanation: `From position i, can jump to [i+minJump, i+maxJump] if position is '0'. Track reachable positions. Use prefix sum to count reachable positions in any range in O(1) — avoids revisiting each position for each jump.`,
          code: `var canReach = function(s, minJump, maxJump) {
    const n=s.length;
    if(s[n-1]==='1') return false;
    const reach=new Array(n).fill(0); reach[0]=1;
    let pre=0;
    for(let i=1;i<n;i++){
        if(i>=minJump) pre+=reach[i-minJump];
        if(i>maxJump) pre-=reach[i-maxJump-1];
        if(pre>0&&s[i]==='0') reach[i]=1;
    }
    return reach[n-1]===1;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Minimum Fuel Cost to Report to the Capital',
      url: 'https://leetcode.com/problems/minimum-fuel-cost-to-report-to-the-capital/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DFS — count people in each subtree, divide by seats for trips',
          explanation: `Post-order DFS. Each subtree has some number of people. They need ceil(people/seats) trips to move up one edge. Sum up trips across all edges.`,
          code: `var minimumFuelCost = function(roads, seats) {
    const n=roads.length+1;
    const adj=Array.from({length:n},()=>[]);
    for(const [a,b] of roads){adj[a].push(b);adj[b].push(a);}
    let fuel=0;
    const dfs=(u,par)=>{
        let people=1;
        for(const v of adj[u]) if(v!==par){
            people+=dfs(v,u);
        }
        if(u!==0) fuel+=Math.ceil(people/seats);
        return people;
    };
    dfs(0,-1);
    return fuel;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🗺️',
      color: 'red',
      content: `**State space design:**\n- (node, steps_remaining) → BFS/Bellman-Ford per step\n- (node, fuel) → Dijkstra, O(V × fuel_max)\n- (node, bitmask) → TSP-style, O(V × 2^V)\n- (node, obstacles_removed) → BFS, O(rows × cols × k)\n\n**Key insight:** If extra state is bounded, the state space is tractable. If unbounded, need to prune or use greedy instead.\n\n**BFS vs Dijkstra on state space:** BFS works when all transitions have equal cost. Dijkstra when costs vary. Both use the same state representation — just different priority mechanisms.`,
    },
  ],
}
