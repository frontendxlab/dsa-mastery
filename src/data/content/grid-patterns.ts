import type { Article } from '../articles'

export const gridPatternsArticle: Article = {
  slug: 'grid-patterns',
  title: 'Grid BFS/DFS Patterns',
  emoji: '🗺️',
  tagline: 'Mark visited. BFS for shortest. DFS for components. Multi-source for distances from all.',
  description: 'Grid problems are graph problems where cells are nodes and adjacent cells are edges. The pattern library: flood fill (DFS), shortest path to any cell (BFS), minimum steps in weighted grid (Dijkstra/0-1 BFS), find all reachable cells, boundary-connected cells. Master direction arrays and visited marking.',
  gradient: 'from-teal-500 to-green-600',
  topicSlug: 'graph',
  readTime: '18 min',
  sections: [
    {
      type: 'text',
      content: `Grid problems are graph problems in disguise: each cell is a node, adjacent cells are connected by edges. The same BFS/DFS algorithms apply, but with a direction array for neighbors and bounds checking. The key choice: BFS for shortest path, DFS for connected components, multi-source BFS for distance from any source.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Grid BFS/DFS template',
      code: `const dirs = [[0,1],[0,-1],[1,0],[-1,0]]; // 4-directional
// const dirs = [[0,1],[0,-1],[1,0],[-1,0],[1,1],[1,-1],[-1,1],[-1,-1]]; // 8-directional

const inBounds = (r, c, m, n) => r >= 0 && r < m && c >= 0 && c < n;

// DFS flood fill — mark connected region
function dfs(grid, r, c, visited) {
    if (!inBounds(r,c,grid.length,grid[0].length)) return;
    if (visited[r][c] || grid[r][c] === 0) return;
    visited[r][c] = true;
    for (const [dr,dc] of dirs) dfs(grid, r+dr, c+dc, visited);
}

// BFS shortest path to any target
function bfs(grid, startR, startC) {
    const m=grid.length, n=grid[0].length;
    const dist = Array.from({length:m},()=>new Array(n).fill(-1));
    dist[startR][startC] = 0;
    let queue = [[startR, startC]];
    while (queue.length) {
        const next = [];
        for (const [r,c] of queue) {
            for (const [dr,dc] of dirs) {
                const nr=r+dr, nc=c+dc;
                if (!inBounds(nr,nc,m,n) || dist[nr][nc] !== -1 || grid[nr][nc] === 0) continue;
                dist[nr][nc] = dist[r][c] + 1;
                next.push([nr,nc]);
            }
        }
        queue = next;
    }
    return dist;
}

// Multi-source BFS — distance from nearest source
function multiSourceBFS(grid, sources) {
    const m=grid.length, n=grid[0].length;
    const dist = Array.from({length:m},()=>new Array(n).fill(Infinity));
    const queue = [];
    for (const [r,c] of sources) { dist[r][c] = 0; queue.push([r,c]); }
    let i = 0;
    while (i < queue.length) {
        const [r,c] = queue[i++];
        for (const [dr,dc] of dirs) {
            const nr=r+dr, nc=c+dc;
            if (!inBounds(nr,nc,m,n)||dist[nr][nc]!==Infinity) continue;
            dist[nr][nc] = dist[r][c] + 1;
            queue.push([nr,nc]);
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
      title: 'Number of Islands',
      url: 'https://leetcode.com/problems/number-of-islands/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DFS flood fill — mark each component',
          explanation: `For each unvisited land cell, DFS-flood all connected land cells (marking them as water to avoid revisiting). Each DFS invocation = one island.`,
          code: `var numIslands = function(grid) {
    let count=0;
    const dfs=(r,c)=>{
        if(r<0||r>=grid.length||c<0||c>=grid[0].length||grid[r][c]!=='1') return;
        grid[r][c]='0'; // mark visited
        [[0,1],[0,-1],[1,0],[-1,0]].forEach(([dr,dc])=>dfs(r+dr,c+dc));
    };
    for(let r=0;r<grid.length;r++)
        for(let c=0;c<grid[0].length;c++)
            if(grid[r][c]==='1'){dfs(r,c);count++;}
    return count;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Surrounded Regions',
      url: 'https://leetcode.com/problems/surrounded-regions/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Mark boundary-connected O\'s, then flip the rest',
          explanation: `O's on the boundary (or connected to boundary O's) are never captured. Mark them with 'S'. Then flip all remaining O's to X, and restore S → O. Reverse thinking: instead of "which O's are surrounded," find "which O's are NOT surrounded."`,
          code: `var solve = function(board) {
    const m=board.length, n=board[0].length;
    const dfs=(r,c)=>{
        if(r<0||r>=m||c<0||c>=n||board[r][c]!=='O') return;
        board[r][c]='S'; // safe
        [[0,1],[0,-1],[1,0],[-1,0]].forEach(([dr,dc])=>dfs(r+dr,c+dc));
    };
    // Mark boundary-connected O's as safe
    for(let r=0;r<m;r++){dfs(r,0);dfs(r,n-1);}
    for(let c=0;c<n;c++){dfs(0,c);dfs(m-1,c);}
    // Flip
    for(let r=0;r<m;r++)
        for(let c=0;c<n;c++)
            board[r][c]=board[r][c]==='O'?'X':board[r][c]==='S'?'O':board[r][c];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: '01 Matrix (distance to nearest 0)',
      url: 'https://leetcode.com/problems/01-matrix/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Multi-source BFS from all 0s simultaneously',
          explanation: `Instead of BFS from each 1 separately (slow), start BFS from ALL 0-cells at once. Distance from a 1-cell to its nearest 0 = the level at which BFS first visits that cell.`,
          code: `var updateMatrix = function(mat) {
    const m=mat.length,n=mat[0].length;
    const dist=Array.from({length:m},()=>new Array(n).fill(Infinity));
    const q=[];
    for(let r=0;r<m;r++) for(let c=0;c<n;c++)
        if(mat[r][c]===0){dist[r][c]=0;q.push([r,c]);}
    let i=0;
    while(i<q.length){
        const [r,c]=q[i++];
        for(const [dr,dc] of [[0,1],[0,-1],[1,0],[-1,0]]){
            const nr=r+dr,nc=c+dc;
            if(nr>=0&&nr<m&&nc>=0&&nc<n&&dist[nr][nc]>dist[r][c]+1){
                dist[nr][nc]=dist[r][c]+1;q.push([nr,nc]);
            }
        }
    }
    return dist;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Shortest Path in Binary Matrix',
      url: 'https://leetcode.com/problems/shortest-path-in-binary-matrix/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: BFS on 8-directional grid',
          explanation: `8-directional movement. BFS from (0,0). First time we reach (n-1,n-1) = shortest path length. Mark visited immediately on enqueue (not dequeue) to avoid re-enqueuing.`,
          code: `var shortestPathBinaryMatrix = function(grid) {
    const n=grid.length;
    if(grid[0][0]||grid[n-1][n-1]) return -1;
    const dirs=[[0,1],[0,-1],[1,0],[-1,0],[1,1],[1,-1],[-1,1],[-1,-1]];
    let q=[[0,0,1]]; grid[0][0]=1; // mark visited
    while(q.length){
        const next=[];
        for(const [r,c,d] of q){
            if(r===n-1&&c===n-1) return d;
            for(const [dr,dc] of dirs){
                const nr=r+dr,nc=c+dc;
                if(nr>=0&&nr<n&&nc>=0&&nc<n&&!grid[nr][nc]){
                    grid[nr][nc]=1; next.push([nr,nc,d+1]);
                }
            }
        }
        q=next;
    }
    return -1;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Flood Fill',
      url: 'https://leetcode.com/problems/flood-fill/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: DFS from starting cell, recolor connected same-color region',
          explanation: `DFS from (sr,sc). If current cell has the original color, recolor it and recurse to 4-directional neighbors. Handle edge case: if new color = original color, return immediately (infinite loop).`,
          code: `var floodFill = function(image, sr, sc, color) {
    const orig=image[sr][sc];
    if(orig===color) return image;
    const dfs=(r,c)=>{
        if(r<0||r>=image.length||c<0||c>=image[0].length||image[r][c]!==orig) return;
        image[r][c]=color;
        [[0,1],[0,-1],[1,0],[-1,0]].forEach(([dr,dc])=>dfs(r+dr,c+dc));
    };
    dfs(sr,sc);
    return image;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 6,
      title: 'Shortest Bridge (find two islands, connect them)',
      url: 'https://leetcode.com/problems/shortest-bridge/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DFS to mark island 1, BFS from island 1 toward island 2',
          explanation: `Step 1: Find any cell of island 1, DFS to mark all its cells and add to queue. Step 2: BFS from all island 1 cells simultaneously, expanding layer by layer. First time we touch a cell from island 2 = minimum bridge length.`,
          code: `var shortestBridge = function(grid) {
    const n=grid.length,dirs=[[0,1],[0,-1],[1,0],[-1,0]];
    const q=[];
    const dfs=(r,c)=>{
        if(r<0||r>=n||c<0||c>=n||grid[r][c]!==1) return;
        grid[r][c]=2; q.push([r,c,0]); // mark as island 1
        dirs.forEach(([dr,dc])=>dfs(r+dr,c+dc));
    };
    // Find first island
    outer: for(let r=0;r<n;r++) for(let c=0;c<n;c++) if(grid[r][c]===1){dfs(r,c);break outer;}
    // BFS to island 2
    let i=0;
    while(i<q.length){
        const [r,c,d]=q[i++];
        for(const [dr,dc] of dirs){
            const nr=r+dr,nc=c+dc;
            if(nr<0||nr>=n||nc<0||nc>=n||grid[nr][nc]===2) continue;
            if(grid[nr][nc]===1) return d; // reached island 2
            grid[nr][nc]=2; q.push([nr,nc,d+1]);
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
      icon: '🗺️',
      color: 'teal',
      content: `**Grid problem pattern selector:**\n- "Count connected regions" → DFS flood fill, count DFS starts\n- "Shortest path from A to B" → BFS, return level when B reached\n- "Distance from nearest X for all cells" → Multi-source BFS from all X cells\n- "Which cells are boundary-connected?" → DFS from all boundary cells, mark them\n- "Weighted grid (different costs)" → Dijkstra or 0-1 BFS (if costs are 0 or 1)\n- "Max island size / sum" → DFS, return size instead of void\n\n**Mark visited early:** In BFS, mark cells as visited when ENQUEUED, not dequeued. Prevents the same cell from being added to queue multiple times.`,
    },
  ],
}
