import type { Article } from '../articles'

export const multiSourceBfsArticle: Article = {
  slug: 'multi-source-bfs',
  title: 'Multi-Source BFS & 0-1 BFS',
  emoji: '🌊',
  tagline: 'BFS from multiple sources simultaneously. 0-1 BFS with deque for mixed weights.',
  description: 'Multi-source BFS starts from all sources simultaneously — equivalent to adding a virtual super-source node connected to all real sources. Finds minimum distance from any source to every node in O(V+E). 0-1 BFS handles graphs with edge weights 0 or 1: use a deque instead of a queue — push to front for weight-0 edges, push to back for weight-1 edges. O(V+E) instead of Dijkstra\'s O(E log V).',
  gradient: 'from-cyan-600 to-blue-700',
  topicSlug: 'graph',
  readTime: '12 min',
  sections: [
    {
      type: 'text',
      content: `Multi-source BFS: enqueue all sources with distance 0 at start. Process as normal BFS — each node gets minimum distance from any source. Applications: distance to nearest X (nearest exit, nearest gate), spreading fire/rot. 0-1 BFS: deque (double-ended queue). For edge weight 0: push neighbor to front (same distance). For edge weight 1: push neighbor to back (distance+1). Front always has minimum distance node.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Multi-source BFS and 0-1 BFS templates',
      code: `// Multi-source BFS: find distance from nearest source to every cell
function multiSourceBFS(grid, sources) {
    const m = grid.length, n = grid[0].length;
    const dist = Array.from({length: m}, () => new Array(n).fill(Infinity));
    const queue = [];
    // Initialize all sources with distance 0
    for (const [r, c] of sources) { dist[r][c] = 0; queue.push([r, c]); }

    const dirs = [[0,1],[0,-1],[1,0],[-1,0]];
    while (queue.length) {
        const [r, c] = queue.shift();
        for (const [dr, dc] of dirs) {
            const [nr, nc] = [r+dr, c+dc];
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && dist[nr][nc] === Infinity) {
                dist[nr][nc] = dist[r][c] + 1;
                queue.push([nr, nc]);
            }
        }
    }
    return dist;
}

// 0-1 BFS: edge weights are 0 or 1, use deque
function zerOneeBFS(n, edges, src) {
    const dist = new Array(n).fill(Infinity);
    dist[src] = 0;
    const deque = [src]; // front = minimum dist

    while (deque.length) {
        const u = deque.shift();
        for (const [v, w] of (edges[u] || [])) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                if (w === 0) deque.unshift(v); // same dist, push to front
                else deque.push(v);            // dist+1, push to back
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
      title: 'Rotting Oranges',
      url: 'https://leetcode.com/problems/rotting-oranges/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Multi-source BFS from all rotten oranges simultaneously',
          explanation: `Enqueue all rotten oranges (2s) at time 0. BFS spreads rot to adjacent fresh oranges, incrementing time. Count fresh oranges initially; decrement as they rot. Answer = time when last fresh orange rots.`,
          code: `var orangesRotting = function(grid) {
    const m=grid.length,n=grid[0].length;
    const q=[];let fresh=0;
    for(let r=0;r<m;r++) for(let c=0;c<n;c++){
        if(grid[r][c]===2) q.push([r,c,0]);
        if(grid[r][c]===1) fresh++;
    }
    let time=0;
    const dirs=[[0,1],[0,-1],[1,0],[-1,0]];
    while(q.length){
        const [r,c,t]=q.shift();
        for(const [dr,dc] of dirs){
            const [nr,nc]=[r+dr,c+dc];
            if(nr>=0&&nr<m&&nc>=0&&nc<n&&grid[nr][nc]===1){
                grid[nr][nc]=2; fresh--; time=t+1; q.push([nr,nc,t+1]);
            }
        }
    }
    return fresh?-1:time;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Walls and Gates',
      url: 'https://leetcode.com/problems/walls-and-gates/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Multi-source BFS from all gates (0s)',
          explanation: `Enqueue all gates. BFS fills each empty room (INF) with the distance from the nearest gate. This is more efficient than BFS from each room individually.`,
          code: `var wallsAndGates = function(rooms) {
    const m=rooms.length,n=rooms[0].length,INF=2147483647;
    const q=[];
    for(let r=0;r<m;r++) for(let c=0;c<n;c++) if(rooms[r][c]===0) q.push([r,c]);
    const dirs=[[0,1],[0,-1],[1,0],[-1,0]];
    while(q.length){
        const [r,c]=q.shift();
        for(const [dr,dc] of dirs){
            const [nr,nc]=[r+dr,c+dc];
            if(nr>=0&&nr<m&&nc>=0&&nc<n&&rooms[nr][nc]===INF){
                rooms[nr][nc]=rooms[r][c]+1; q.push([nr,nc]);
            }
        }
    }
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Minimum Cost to Make at Least One Valid Path in a Grid',
      url: 'https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: 0-1 BFS — following grid direction costs 0, changing costs 1',
          explanation: `Edge in the grid direction has cost 0 (no change needed). All other edges have cost 1 (need to change the sign). Use deque-based 0-1 BFS: cost-0 edges go to front, cost-1 to back. Finds minimum changes to create a valid path.`,
          code: `var minCost = function(grid) {
    const m=grid.length,n=grid[0].length;
    const dist=Array.from({length:m},()=>new Array(n).fill(Infinity));
    dist[0][0]=0;
    const dq=[[0,0]];
    const dirs=[[0,1],[0,-1],[1,0],[-1,0]]; // right,left,down,up (1,2,3,4)
    while(dq.length){
        const [r,c]=dq.shift();
        for(let d=0;d<4;d++){
            const [nr,nc]=[r+dirs[d][0],c+dirs[d][1]];
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
      type: 'callout',
      icon: '🌊',
      color: 'blue',
      content: `**Multi-source BFS:** Add virtual super-source with 0-weight edges to all real sources. Compute shortest paths from super-source = minimum distance from any source.\n\n**0-1 BFS guarantee:** Deque front always contains the current minimum-distance node (proof: weight-0 edges don't increase distance, so front stays minimum). O(V+E) vs Dijkstra's O(E log V).\n\n**When to use 0-1 BFS:** Costs are exactly 0 or 1. Common disguises: "changing direction costs 1", "passing through a wall costs 1 health", "free moves vs paid moves".`,
    },
  ],
}
