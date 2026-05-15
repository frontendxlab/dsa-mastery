import type { Article } from '../articles'

export const gridDpArticle: Article = {
  slug: 'grid-dp',
  title: 'Grid DP',
  emoji: '🔲',
  tagline: 'dp[i][j] depends on neighbors. Fill row by row.',
  description: 'Grid DP problems fill a 2D array where dp[i][j] depends on adjacent cells (above, left, or diagonal). Unique paths, minimum path sum, dungeon game, maximum gold, cherry pickup — all follow a left-to-right, top-to-bottom fill order with clean base cases at the edges.',
  gradient: 'from-green-500 to-emerald-600',
  topicSlug: 'dp',
  readTime: '18 min',
  sections: [
    {
      type: 'text',
      content: `Grid DP is the simplest 2D DP. Every cell dp[i][j] summarizes the best answer for the subproblem ending at (i,j). Since movement is restricted (typically only right/down), the dependency graph is a DAG — we can fill it in topological order (row by row, left to right). The key is choosing what dp[i][j] represents.`,
    },
    {
      type: 'table',
      headers: ['What dp[i][j] represents', 'Transition', 'Problem'],
      rows: [
        ['Number of paths to (i,j)', 'dp[i-1][j] + dp[i][j-1]', 'Unique Paths'],
        ['Min cost to reach (i,j)', 'grid[i][j] + min(dp[i-1][j], dp[i][j-1])', 'Minimum Path Sum'],
        ['Min health needed at (i,j)', 'max(1, min(right,down) - dungeon[i][j])', 'Dungeon Game'],
        ['Max gold collectible ending at (i,j)', 'grid[i][j] + max of valid predecessors', 'Maximum Gold'],
        ['Max sum of submatrix corner at (i,j)', '2D prefix sum', 'Max Rectangle Sum'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Core Template',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Grid DP — fill top-left to bottom-right',
      code: `// dp[i][j] = best answer for subproblem "ending at cell (i,j)"
// Movement: only right (→) and down (↓)

const m = grid.length, n = grid[0].length;
const dp = Array.from({length:m}, () => new Array(n).fill(0));

// Base cases: top row (can only come from left)
dp[0][0] = f(grid[0][0]);
for (let j=1; j<n; j++) dp[0][j] = transition(dp[0][j-1], grid[0][j]);
// Left column (can only come from above)
for (let i=1; i<m; i++) dp[i][0] = transition(dp[i-1][0], grid[i][0]);

// Fill rest
for (let i=1; i<m; i++)
    for (let j=1; j<n; j++)
        dp[i][j] = combine(dp[i-1][j], dp[i][j-1], grid[i][j]);

return dp[m-1][n-1];

// Space optimization: only need previous row
// let prev = dp[0], curr;
// for (let i=1; ...) { curr = []; ... prev = curr; }`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Unique Paths',
      url: 'https://leetcode.com/problems/unique-paths/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DP — dp[i][j] = paths to reach (i,j)',
          explanation: `dp[i][j] = paths to (i,j) = paths to (i-1,j) + paths to (i,j-1). Base: first row and column = 1 (only one way to reach any edge cell — go straight). O(m×n).`,
          code: `var uniquePaths = function(m, n) {
    const dp = Array.from({length:m},()=>new Array(n).fill(1));
    for(let i=1;i<m;i++)
        for(let j=1;j<n;j++)
            dp[i][j]=dp[i-1][j]+dp[i][j-1];
    return dp[m-1][n-1];
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Math — C(m+n-2, m-1)',
          explanation: `Total steps = (m-1) down + (n-1) right. Choose which (m-1) steps are "down." Answer = C(m+n-2, m-1). O(min(m,n)).`,
          code: `var uniquePaths = function(m, n) {
    // C(m+n-2, m-1) using iterative multiplication
    let result = 1;
    for (let i=0; i<m-1; i++) result = result*(n+i)/(i+1);
    return Math.round(result);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Minimum Path Sum',
      url: 'https://leetcode.com/problems/minimum-path-sum/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DP — dp[i][j] = min cost to reach (i,j)',
          explanation: `dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1]). Edge cells: can only come from one direction. Can optimize to O(n) space by using 1D dp array.`,
          code: `var minPathSum = function(grid) {
    const m=grid.length, n=grid[0].length;
    const dp=grid.map(r=>[...r]); // work in-place on a copy
    for(let i=0;i<m;i++)
        for(let j=0;j<n;j++){
            if(i===0&&j===0) continue;
            const up=i>0?dp[i-1][j]:Infinity;
            const left=j>0?dp[i][j-1]:Infinity;
            dp[i][j]+=Math.min(up,left);
        }
    return dp[m-1][n-1];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Dungeon Game',
      url: 'https://leetcode.com/problems/dungeon-game/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Fill backwards from bottom-right to top-left',
          explanation: `Forward DP fails because we need to track both current health AND current coins — state explosion. Fill backwards: dp[i][j] = minimum health needed at (i,j) to survive to the princess. From bottom-right, dp[m-1][n-1] = max(1, 1-dungeon[m-1][n-1]). For other cells: min_health_after = min(dp[i+1][j], dp[i][j+1]); dp[i][j] = max(1, min_health_after - dungeon[i][j]).`,
          code: `var calculateMinimumHP = function(dungeon) {
    const m=dungeon.length, n=dungeon[0].length;
    const dp=Array.from({length:m+1},()=>new Array(n+1).fill(Infinity));
    dp[m][n-1]=dp[m-1][n]=1; // sentinels
    for(let i=m-1;i>=0;i--)
        for(let j=n-1;j>=0;j--){
            const need=Math.min(dp[i+1][j],dp[i][j+1]);
            dp[i][j]=Math.max(1, need-dungeon[i][j]);
        }
    return dp[0][0];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Triangle (Min Path Top to Bottom)',
      url: 'https://leetcode.com/problems/triangle/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Bottom-up DP — fill from bottom row up',
          explanation: `dp[i][j] = minimum path sum from row i down to the bottom, starting at position j in row i. Fill from bottom row (base case: dp[last row] = last row values) up. Transition: dp[i][j] = triangle[i][j] + min(dp[i+1][j], dp[i+1][j+1]). Answer: dp[0][0]. Modify in-place for O(1) space.`,
          code: `var minimumTotal = function(triangle) {
    const dp = [...triangle[triangle.length-1]]; // copy bottom row
    for(let i=triangle.length-2;i>=0;i--)
        for(let j=0;j<=i;j++)
            dp[j]=triangle[i][j]+Math.min(dp[j],dp[j+1]);
    return dp[0];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Maximal Square',
      url: 'https://leetcode.com/problems/maximal-square/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: dp[i][j] = side length of largest square with bottom-right at (i,j)',
          explanation: `If matrix[i][j] = '1': dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1. The minimum of the three neighbors limits the square size — the largest square that can end at (i,j) is constrained by the smallest of the three adjacent squares. Answer = max dp value, squared.`,
          code: `var maximalSquare = function(matrix) {
    const m=matrix.length, n=matrix[0].length;
    const dp=Array.from({length:m+1},()=>new Array(n+1).fill(0));
    let maxSide=0;
    for(let i=1;i<=m;i++)
        for(let j=1;j<=n;j++)
            if(matrix[i-1][j-1]==='1'){
                dp[i][j]=Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1])+1;
                maxSide=Math.max(maxSide,dp[i][j]);
            }
    return maxSide*maxSide;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 6,
      title: 'Cherry Pickup II (Two Robots)',
      url: 'https://leetcode.com/problems/cherry-pickup-ii/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: 3D DP — dp[row][col1][col2] for two robots',
          explanation: `Two robots start at row 0, columns 0 and n-1 respectively. Both move down simultaneously. dp[r][c1][c2] = max cherries collectible from row r to bottom with robot 1 at column c1 and robot 2 at c2. At each row, try all 9 combinations of (robot1 move, robot2 move) = (-1,0,+1) × (-1,0,+1). Collect: grid[r][c1] + grid[r][c2] (but if c1===c2, count once).`,
          code: `var cherryPickup = function(grid) {
    const m=grid.length, n=grid[0].length;
    // dp[c1][c2] = max cherries from current row down
    let dp=Array.from({length:n},()=>new Array(n).fill(-Infinity));
    dp[0][n-1]=grid[0][0]+grid[0][n-1]; // initial positions
    for(let r=1;r<m;r++){
        const next=Array.from({length:n},()=>new Array(n).fill(-Infinity));
        for(let c1=0;c1<n;c1++)
            for(let c2=0;c2<n;c2++){
                if(dp[c1][c2]===-Infinity) continue;
                for(let d1=-1;d1<=1;d1++)
                    for(let d2=-1;d2<=1;d2++){
                        const nc1=c1+d1, nc2=c2+d2;
                        if(nc1<0||nc1>=n||nc2<0||nc2>=n) continue;
                        const cherries=grid[r][nc1]+(nc1===nc2?0:grid[r][nc2]);
                        next[nc1][nc2]=Math.max(next[nc1][nc2],dp[c1][c2]+cherries);
                    }
            }
        dp=next;
    }
    return Math.max(0,...dp.flat());
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧠',
      color: 'green',
      content: `**Grid DP pattern guide:**\n- Moving right+down only → fill top-left to bottom-right\n- Moving in all 4 directions → BFS/DFS with memoization\n- "Min health at start" → fill backwards from goal\n- "Count paths with obstacle" → dp[i][j]=0 if obstacle, else sum\n- "Two agents moving simultaneously" → 3D dp[row][col1][col2]\n- "Max square of 1s" → min(left, above, diagonal) + 1\n\n**Space optimization:** if dp[i][j] only depends on row i-1, use two 1D arrays (prev and curr). If depends only on dp[i][j-1], use single 1D array in-place.`,
    },
  ],
}
