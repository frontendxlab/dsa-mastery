import type { Article } from '../articles'

export const aStarSearchArticle: Article = {
  slug: 'a-star-search',
  title: 'A* Search',
  emoji: '⭐',
  tagline: 'Dijkstra guided by a heuristic. Finds optimal path faster when heuristic is good.',
  description: 'A* search finds the shortest path from start to goal by prioritizing nodes based on f(n) = g(n) + h(n), where g(n) is the actual distance from start and h(n) is an admissible heuristic (never overestimates the true remaining distance). When h(n) = 0, A* becomes Dijkstra. With a perfect heuristic, A* is O(n). Applications: robot navigation, game pathfinding, k-th shortest path, and puzzle solving.',
  gradient: 'from-yellow-700 to-amber-800',
  topicSlug: 'graph',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `A* uses a priority queue ordered by f = g + h. Expand the node with smallest f first. Guarantee: if h is admissible (h(n) ≤ true remaining distance), A* finds the optimal path. If h is consistent (h(n) ≤ cost(n,n') + h(n')), each node is expanded at most once — more efficient. Common heuristics: Manhattan distance (grid, 4-directional), Euclidean distance, Chebyshev distance (8-directional).`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'A* search with Manhattan distance heuristic',
      code: `function aStar(grid, start, goal) {
    const [rows, cols] = [grid.length, grid[0].length];
    const h = (r, c) => Math.abs(r - goal[0]) + Math.abs(c - goal[1]); // Manhattan

    const g = Array.from({length: rows}, () => new Array(cols).fill(Infinity));
    g[start[0]][start[1]] = 0;

    // Min-heap: [f, r, c]
    const heap = [[h(start[0], start[1]), start[0], start[1]]];

    while (heap.length) {
        heap.sort((a, b) => a[0] - b[0]); // use real min-heap in production
        const [f, r, c] = heap.shift();
        if (r === goal[0] && c === goal[1]) return g[r][c];

        if (f > g[r][c] + h(r, c)) continue; // outdated entry

        for (const [dr, dc] of [[0,1],[0,-1],[1,0],[-1,0]]) {
            const [nr, nc] = [r+dr, c+dc];
            if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || grid[nr][nc] === 1) continue;
            const ng = g[r][c] + 1;
            if (ng < g[nr][nc]) {
                g[nr][nc] = ng;
                heap.push([ng + h(nr, nc), nr, nc]);
            }
        }
    }
    return -1; // unreachable
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
      title: 'Shortest Path in Binary Matrix',
      url: 'https://leetcode.com/problems/shortest-path-in-binary-matrix/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: A* with Chebyshev distance (8-directional)',
          explanation: `8-directional movement. Heuristic = Chebyshev distance = max(|row-goalRow|, |col-goalCol|). A* expands fewer nodes than pure BFS.`,
          code: `var shortestPathBinaryMatrix = function(grid) {
    const n=grid.length;
    if(grid[0][0]||grid[n-1][n-1]) return -1;
    if(n===1) return 1;
    const h=(r,c)=>Math.max(n-1-r,n-1-c); // Chebyshev to (n-1,n-1)
    const dist=Array.from({length:n},()=>new Array(n).fill(Infinity));
    dist[0][0]=1;
    // Priority queue (sorted array for simplicity)
    const pq=[[1+h(0,0),0,0,1]]; // [f, r, c, g]
    while(pq.length){
        pq.sort((a,b)=>a[0]-b[0]);
        const[,r,c,g]=pq.shift();
        if(g>dist[r][c]) continue;
        if(r===n-1&&c===n-1) return g;
        for(const[dr,dc] of [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]){
            const[nr,nc]=[r+dr,c+dc];
            if(nr<0||nr>=n||nc<0||nc>=n||grid[nr][nc]) continue;
            const ng=g+1;
            if(ng<dist[nr][nc]){dist[nr][nc]=ng;pq.push([ng+h(nr,nc),nr,nc,ng]);}
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
      num: 2,
      title: 'K-th Shortest Path (Yen\'s Algorithm concept)',
      url: 'https://leetcode.com/problems/k-th-smallest-prime-fraction/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Min-heap of fractions — expand greedily',
          explanation: `Think of it as A*-like expansion: start with all fractions p[0]/p[i] for all i. Min-heap by value. Pop minimum, if it's from pair (i,j) where j < n-1, push (i, j+1). After k pops, have k-th smallest.`,
          code: `var kthSmallestPrimeFraction = function(arr, k) {
    const n=arr.length;
    // Min-heap: [value, i, j] where fraction = arr[i]/arr[j]
    const heap=arr.slice(0,-1).map((v,i)=>[v/arr[n-1],i,n-1]);
    heap.sort((a,b)=>a[0]-b[0]);
    for(let cnt=1;cnt<k;cnt++){
        const[,i,j]=heap.shift();
        if(j>i+1){
            const nf=[arr[i]/arr[j-1],i,j-1];
            let pos=heap.findIndex(h=>h[0]>nf[0]);
            if(pos===-1) heap.push(nf);
            else heap.splice(pos,0,nf);
        }
    }
    const[,i,j]=heap[0];
    return[arr[i],arr[j]];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Sliding Puzzle',
      url: 'https://leetcode.com/problems/sliding-puzzle/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: BFS on puzzle states (A* with Manhattan sum heuristic)',
          explanation: `State = board configuration as string. BFS from initial state, apply all valid moves (swap 0 with adjacent). Target = "123450". BFS guarantees minimum moves.`,
          code: `var slidingPuzzle = function(board) {
    const start=board.flat().join(''), target='123450';
    if(start===target) return 0;
    const adj=[[1,3],[0,2,4],[1,5],[0,4],[1,3,5],[2,4]];
    const q=[[start,0]], vis=new Set([start]);
    let i=0;
    while(i<q.length){
        const[state,steps]=q[i++];
        const zero=state.indexOf('0');
        for(const nei of adj[zero]){
            const next=[...state]; [next[zero],next[nei]]=[next[nei],next[zero]];
            const ns=next.join('');
            if(ns===target) return steps+1;
            if(!vis.has(ns)){vis.add(ns);q.push([ns,steps+1]);}
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
      icon: '⭐',
      color: 'amber',
      content: `**A* admissibility:** h(n) is admissible if h(n) ≤ true remaining distance. Never overestimate.\n\n**Common heuristics:**\n- 4-directional grid: Manhattan distance |Δr| + |Δc|\n- 8-directional grid: Chebyshev distance max(|Δr|, |Δc|)\n- 2D Euclidean: √(Δr² + Δc²)\n- Puzzle: sum of Manhattan distances for each tile\n\n**A* vs Dijkstra:** Same algorithm structure, but A* uses f=g+h instead of f=g. When h=0, identical. With a good h, A* explores far fewer nodes.\n\n**Limitations:** A* requires knowing the goal ahead of time. For multi-target problems or when goal is unknown, use Dijkstra.`,
    },
  ],
}
