import type { Article } from '../articles'

export const gridIslandsArticle: Article = {
  slug: 'grid-islands',
  title: 'Grid Island Problems',
  emoji: '🏝️',
  tagline: 'Connected components in grids. BFS/DFS flood fill, area, perimeter, enclosure.',
  description: 'Grid island problems find, count, measure, or transform connected regions of cells. Core technique: BFS or DFS flood fill — visit connected cells of the same type, marking them visited. Patterns: count islands (DFS from each unvisited land cell), max area (track count during DFS), perimeter (count edges facing water), number of closed islands (flood fill from borders, then count remaining), and surrounded regions (O-cells not connected to border).',
  gradient: 'from-blue-600 to-cyan-700',
  topicSlug: 'graph',
  readTime: '13 min',
  sections: [
    {
      type: 'text',
      content: `Flood fill: from any unvisited cell, BFS/DFS marks all connected same-value cells as visited. Number of flood fills = number of connected components. Perimeter of an island: for each land cell, count edges where neighbor is water or out-of-bounds (4 - connected land neighbors). Enclosed regions: flood fill from border to mark "safe" cells; remaining unvisited cells are enclosed.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Number of islands and max area templates',
      code: `// Number of islands — DFS flood fill
function numIslands(grid) {
    const m = grid.length, n = grid[0].length;
    let count = 0;
    function dfs(r, c) {
        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] !== '1') return;
        grid[r][c] = '0'; // mark visited
        dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1);
    }
    for (let r = 0; r < m; r++)
        for (let c = 0; c < n; c++)
            if (grid[r][c] === '1') { dfs(r, c); count++; }
    return count;
}

// Max area of island
function maxAreaOfIsland(grid) {
    const m = grid.length, n = grid[0].length;
    function dfs(r, c) {
        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] === 0) return 0;
        grid[r][c] = 0;
        return 1 + dfs(r+1,c) + dfs(r-1,c) + dfs(r,c+1) + dfs(r,c-1);
    }
    let max = 0;
    for (let r = 0; r < m; r++)
        for (let c = 0; c < n; c++)
            if (grid[r][c] === 1) max = Math.max(max, dfs(r, c));
    return max;
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
          label: 'Intuition 1: DFS flood fill from each unvisited land cell',
          explanation: `For each unvisited \'1\' cell, DFS/BFS marks all connected land as visited. Count the number of such DFS/BFS starts.`,
          code: `var numIslands = function(grid) {
    const m=grid.length,n=grid[0].length;
    let count=0;
    const dfs=(r,c)=>{
        if(r<0||r>=m||c<0||c>=n||grid[r][c]!=='1') return;
        grid[r][c]='0';
        dfs(r+1,c);dfs(r-1,c);dfs(r,c+1);dfs(r,c-1);
    };
    for(let r=0;r<m;r++) for(let c=0;c<n;c++)
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
          label: 'Intuition 1: BFS from border Os, then flip all remaining Os',
          explanation: `O-cells connected to the border cannot be surrounded. BFS from all border O-cells, mark them safe (e.g., 'S'). Then: O → X (surrounded), S → O (restore safe).`,
          code: `var solve = function(board) {
    const m=board.length,n=board[0].length;
    const bfs=(r,c)=>{
        if(r<0||r>=m||c<0||c>=n||board[r][c]!=='O') return;
        board[r][c]='S';
        [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dr,dc])=>bfs(r+dr,c+dc));
    };
    for(let r=0;r<m;r++){bfs(r,0);bfs(r,n-1);}
    for(let c=0;c<n;c++){bfs(0,c);bfs(m-1,c);}
    for(let r=0;r<m;r++) for(let c=0;c<n;c++)
        board[r][c]=board[r][c]==='S'?'O':'X';
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Island Perimeter',
      url: 'https://leetcode.com/problems/island-perimeter/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: For each land cell, count edges facing water or boundary',
          explanation: `Each land cell contributes 4 edges minus the number of land neighbors. Sum over all land cells.`,
          code: `var islandPerimeter = function(grid) {
    const m=grid.length,n=grid[0].length;
    let perim=0;
    for(let r=0;r<m;r++) for(let c=0;c<n;c++) if(grid[r][c]===1){
        perim+=4;
        if(r>0&&grid[r-1][c]) perim--;
        if(r<m-1&&grid[r+1][c]) perim--;
        if(c>0&&grid[r][c-1]) perim--;
        if(c<n-1&&grid[r][c+1]) perim--;
    }
    return perim;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Number of Closed Islands',
      url: 'https://leetcode.com/problems/number-of-closed-islands/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Flood fill border land cells first, then count remaining islands',
          explanation: `Land connected to the border cannot be a closed island. First, flood fill all border land (0) cells, marking them as water (1). Then count remaining islands normally.`,
          code: `var closedIsland = function(grid) {
    const m=grid.length,n=grid[0].length;
    const fill=(r,c)=>{
        if(r<0||r>=m||c<0||c>=n||grid[r][c]!==0) return;
        grid[r][c]=1;
        fill(r+1,c);fill(r-1,c);fill(r,c+1);fill(r,c-1);
    };
    for(let r=0;r<m;r++){fill(r,0);fill(r,n-1);}
    for(let c=0;c<n;c++){fill(0,c);fill(m-1,c);}
    let count=0;
    for(let r=0;r<m;r++) for(let c=0;c<n;c++)
        if(grid[r][c]===0){fill(r,c);count++;}
    return count;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🏝️',
      color: 'blue',
      content: `**Grid island patterns:**\n- Count islands: DFS/BFS from each unvisited land cell, count starts\n- Max area: return size from DFS, track max\n- Perimeter: for each land cell, 4 - count(land neighbors)\n- Closed/enclosed: flood fill from borders first to mark unreachable cells\n\n**BFS vs DFS for grids:** DFS is simpler (recursive) but can stack overflow on large grids. BFS (queue-based) is always safe. For very large grids (m*n > 10^5), use iterative BFS.\n\n**Union-Find alternative:** For dynamic connectivity (edges added), Union-Find tracks components efficiently. For static grids, DFS/BFS is simpler.`,
    },
  ],
}
