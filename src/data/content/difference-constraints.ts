import type { Article } from '../articles'

export const differenceConstraintsArticle: Article = {
  slug: 'difference-constraints',
  title: 'Difference Constraints',
  emoji: '⚡',
  tagline: 'x_j - x_i ≤ w → edge i→j with weight w. SSSP gives feasible solution.',
  description: 'A system of difference constraints (xⱼ - xᵢ ≤ wᵢⱼ) can be solved by shortest paths. Build a graph: for each constraint xⱼ - xᵢ ≤ w, add edge i → j with weight w. If no negative cycle: Bellman-Ford from a virtual source gives a feasible assignment x[v] = dist[v]. Negative cycle = infeasible. Applications: scheduling with precedence and deadline constraints, and many constraint satisfaction problems.',
  gradient: 'from-red-800 to-rose-900',
  topicSlug: 'graph',
  readTime: '13 min',
  sections: [
    {
      type: 'text',
      content: `Difference constraints: given n variables and m constraints xⱼ - xᵢ ≤ wᵢⱼ, find an assignment satisfying all constraints or determine it's infeasible. Key: constraint xⱼ - xᵢ ≤ w is a triangle inequality on a graph edge i→j with weight w. Add virtual source s with edges s→i weight 0 for all i. Bellman-Ford from s: dist[j] - dist[i] ≤ w is automatically satisfied by shortest path distances.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Difference constraints via Bellman-Ford',
      code: `function solveDifferenceConstraints(n, constraints) {
    // constraints: [{i, j, w}] meaning x[j] - x[i] <= w
    // Returns feasible x[] or null if infeasible
    const INF = Infinity;
    const dist = new Array(n + 1).fill(INF);
    const src = n; // virtual source node
    dist[src] = 0;

    const edges = [];
    for (const {i, j, w} of constraints) edges.push([i, j, w]);
    // Add edges from virtual source to all nodes (x[i] - src ≤ 0 → x[i] ≤ 0)
    for (let i = 0; i < n; i++) edges.push([src, i, 0]);

    // Bellman-Ford: n+1 nodes, n iterations
    for (let iter = 0; iter < n; iter++) {
        for (const [u, v, w] of edges) {
            if (dist[u] < INF && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }
    // Check for negative cycles
    for (const [u, v, w] of edges) {
        if (dist[u] < INF && dist[u] + w < dist[v]) return null; // infeasible
    }
    return dist.slice(0, n); // x[i] = dist[i] is a feasible solution
}

// Key insight: x[j] - x[i] <= w is the triangle inequality on the path i → j
// If dist[j] ≤ dist[i] + w (shortest path property), constraint is satisfied`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Minimum Time to Complete Tasks (scheduling with constraints)',
      url: 'https://leetcode.com/problems/minimum-time-to-complete-all-tasks/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Greedy on intervals — mark minimum required slots',
          explanation: `Tasks run in [start, end] with duration d. Minimize total "computer on" time. Sort by end time. Use a boolean array tracking which seconds are already on. For each task, count how many seconds in [start,end] are already on. If < d, activate the latest seconds in [start,end] (greedy: activating late is best for future tasks).`,
          code: `var findMinimumTime = function(tasks) {
    const MAX=2001;
    const run=new Uint8Array(MAX);
    tasks.sort((a,b)=>a[1]-b[1]);
    for(const[s,e,d] of tasks){
        let cnt=0;
        for(let i=s;i<=e;i++) if(run[i]) cnt++;
        for(let i=e;i>=s&&cnt<d;i--) if(!run[i]){run[i]=1;cnt++;}
    }
    return run.reduce((a,b)=>a+b,0);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Possible to Achieve Distance',
      url: 'https://leetcode.com/problems/check-if-there-is-a-valid-path-in-a-grid/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DFS/BFS following street types',
          explanation: `Each cell has a street type (1-6) defining which edges connect. Model as graph where adjacent cells connect if their shared edge is compatible in both directions. BFS from top-left to bottom-right.`,
          code: `var hasValidPath = function(grid) {
    const m=grid.length,n=grid[0].length;
    // Define which neighbors each street type connects to
    const connections=[
        [],
        [[0,-1],[0,1]],   // 1: left-right
        [[1,0],[-1,0]],   // 2: up-down
        [[0,-1],[1,0]],   // 3: left-down
        [[0,1],[1,0]],    // 4: right-down
        [[0,-1],[-1,0]],  // 5: left-up
        [[0,1],[-1,0]],   // 6: right-up
    ];
    const canConnect=(r,c,nr,nc)=>{
        const dr=nr-r,dc=nc-c;
        return connections[grid[r][c]].some(([dr2,dc2])=>dr2===dr&&dc2===dc)&&
               connections[grid[nr][nc]].some(([dr2,dc2])=>dr2===-dr&&dc2===-dc);
    };
    const vis=Array.from({length:m},()=>new Array(n).fill(false));
    vis[0][0]=true; const q=[[0,0]];
    while(q.length){
        const[r,c]=q.shift();
        if(r===m-1&&c===n-1) return true;
        for(const[dr,dc] of connections[grid[r][c]]){
            const[nr,nc]=[r+dr,c+dc];
            if(nr>=0&&nr<m&&nc>=0&&nc<n&&!vis[nr][nc]&&canConnect(r,c,nr,nc)){
                vis[nr][nc]=true; q.push([nr,nc]);
            }
        }
    }
    return false;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Longest Consistent Sequence',
      url: 'https://leetcode.com/problems/longest-increasing-subsequence/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Constraint: x[j] > x[i] when nums[j] > nums[i] and j > i',
          explanation: `LIS as difference constraints: for each valid (i,j) pair with nums[i] < nums[j], enforce dp[j] ≥ dp[i] + 1. This is a difference constraint: -dp[j] + dp[i] ≤ -1. Solve via standard LIS DP.`,
          code: `var lengthOfLIS = function(nums) {
    const tails=[];
    for(const n of nums){
        let lo=0,hi=tails.length;
        while(lo<hi){const mid=(lo+hi)>>1;tails[mid]<n?lo=mid+1:hi=mid;}
        tails[lo]=n;
    }
    return tails.length;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '⚡',
      color: 'red',
      content: `**Difference constraints → SSSP:**\n- Constraint xⱼ - xᵢ ≤ w → edge i→j with weight w\n- Add virtual source s with 0-weight edges to all nodes\n- Bellman-Ford gives feasible solution x[v] = dist[v]\n- Negative cycle → infeasible\n\n**Equivalents:**\n- xⱼ - xᵢ ≥ k → xᵢ - xⱼ ≤ -k → reverse edge\n- xⱼ = xᵢ → two constraints: xⱼ - xᵢ ≤ 0 and xᵢ - xⱼ ≤ 0\n\n**Applications:** scheduling with precedence (task j must start ≥ d after task i), timing analysis in digital circuits, and any linear programming with only difference constraints.`,
    },
  ],
}
