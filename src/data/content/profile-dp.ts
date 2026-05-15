import type { Article } from '../articles'

export const profileDpArticle: Article = {
  slug: 'profile-dp',
  title: 'Profile DP (Broken Profile)',
  emoji: '🧩',
  tagline: 'Count tilings column by column. State = which cells in current column are filled.',
  description: 'Profile DP (broken profile DP) counts the number of ways to tile a grid with dominoes or other pieces by processing cells one at a time. State = bitmask of which cells in the current "profile" (boundary) are already filled. Transition: for each cell, either place a piece extending right or down. O(2^m × n×m) for n×m grid. Used for: domino tiling, polyomino counting, circuit layout.',
  gradient: 'from-indigo-800 to-blue-900',
  topicSlug: 'dp',
  readTime: '15 min',
  sections: [
    {
      type: 'text',
      content: `Profile DP processes the grid cell by cell, left to right, top to bottom. State: bitmask of whether each cell in the current column is already filled (by a piece placed from the previous column). For each new cell: if already filled (bit=1), move to next cell. If not filled: either leave it for a vertical piece (try extending right and coming back) or place a horizontal piece (requires adjacent cell to the right is also free). Count ways to reach a fully filled state at the end.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Profile DP for domino tiling count',
      code: `// Count ways to tile n×m grid with 1×2 dominoes
// Process cells column by column, state = which cells in column are "pre-filled"
function countDominoTilings(n, m) {
    const MOD = 1e9 + 7;
    // dp[mask] = ways to reach this column with mask indicating pre-filled cells
    let dp = new Array(1 << n).fill(0);
    dp[0] = 1; // start: no cells pre-filled in first column

    for (let col = 0; col < m; col++) {
        // For each column, process rows top to bottom
        // Use DFS/recursion to enumerate valid placements
        const ndp = new Array(1 << n).fill(0);
        function dfs(row, prevMask, curMask) {
            if (row === n) { ndp[curMask] += dp[prevMask]; return; }
            const filled = (prevMask >> row) & 1;
            if (filled) {
                // This cell is already filled by a horizontal domino from previous column
                dfs(row + 1, prevMask, curMask);
            } else {
                // Option 1: place horizontal domino extending to next column
                dfs(row + 1, prevMask, curMask | (1 << row));
                // Option 2: place vertical domino (needs row+1 to also be empty)
                if (row + 1 < n && !((prevMask >> (row + 1)) & 1)) {
                    dfs(row + 2, prevMask, curMask);
                }
            }
        }
        for (let mask = 0; mask < (1 << n); mask++) {
            if (dp[mask]) dfs(0, mask, 0);
        }
        dp = ndp.map(v => v % MOD);
    }
    return dp[0]; // all cells filled, no cells pre-filled for next column
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
      title: 'Domino and Tromino Tiling',
      url: 'https://leetcode.com/problems/domino-and-tromino-tiling/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DP with state tracking',
          explanation: `For 2×n grid with 1×2 dominoes and L-shaped trominoes. States: how many columns are fully filled and what "overhang" exists. Recurrence: dp[n] = dp[n-1] + dp[n-2] + 2*(dp[n-3] + ... + dp[0]).`,
          code: `var numTilings = function(n) {
    const MOD=1e9+7;
    if(n===1) return 1;
    const dp=new Array(n+1).fill(0);
    dp[0]=1;dp[1]=1;dp[2]=2;
    for(let i=3;i<=n;i++)
        dp[i]=(2n*BigInt(dp[i-1])+BigInt(dp[i-3]))%BigInt(MOD);
    return Number(dp[n]);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Tiling a Rectangle with the Fewest Squares',
      url: 'https://leetcode.com/problems/tiling-a-rectangle-with-the-fewest-squares/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: DFS with pruning — place largest square at first uncovered cell',
          explanation: `Find the topmost-leftmost uncovered cell. Try placing squares of size 1 to min(remaining_width, remaining_height). Track minimum number of squares needed. Prune with best known answer.`,
          code: `var tilingRectangle = function(n, m) {
    const grid=Array.from({length:n},()=>new Array(m).fill(0));
    let ans=n*m; // worst case: all 1×1
    const dfs=(cnt)=>{
        if(cnt>=ans) return;
        let r=-1,c=-1;
        outer: for(let i=0;i<n;i++) for(let j=0;j<m;j++) if(!grid[i][j]){r=i;c=j;break outer;}
        if(r===-1){ans=Math.min(ans,cnt);return;}
        // Try all square sizes that fit
        for(let s=Math.min(n-r,m-c);s>=1;s--){
            // Check if s×s area starting at (r,c) is free
            let ok=true;
            for(let i=r;i<r+s&&ok;i++) for(let j=c;j<c+s&&ok;j++) if(grid[i][j]) ok=false;
            if(!ok) continue;
            // Place square
            for(let i=r;i<r+s;i++) for(let j=c;j<c+s;j++) grid[i][j]=1;
            dfs(cnt+1);
            for(let i=r;i<r+s;i++) for(let j=c;j<c+s;j++) grid[i][j]=0;
        }
    };
    dfs(0);
    return ans;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Minimum Number of Flips to Make the Binary String Alternating',
      url: 'https://leetcode.com/problems/minimum-number-of-flips-to-make-the-binary-string-alternating/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Sliding window on doubled string',
          explanation: `Target is either "010101..." or "101010...". For each rotation (using doubled string), count differences with both targets. Sliding window tracks the count in current window of length n.`,
          code: `var minFlips = function(s) {
    const n=s.length;
    const t=s+s;
    let diff0=0,diff1=0; // diffs with "010..." and "101..."
    for(let i=0;i<n;i++){
        if(t[i]!==String(i%2)) diff0++;
        if(t[i]!==String(1-i%2)) diff1++;
    }
    let res=Math.min(diff0,diff1);
    for(let i=n;i<2*n;i++){
        // Add right
        if(t[i]!==String(i%2)) diff0++;
        if(t[i]!==String(1-i%2)) diff1++;
        // Remove left
        if(t[i-n]!==String((i-n)%2)) diff0--;
        if(t[i-n]!==String(1-(i-n)%2)) diff1--;
        res=Math.min(res,diff0,diff1);
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧩',
      color: 'blue',
      content: `**Profile DP template:**\n1. Process cells left-to-right, top-to-bottom\n2. State = bitmask of current column profile (which cells are pre-filled)\n3. For each cell in each column: enumerate all valid placements\n4. Transition to next state via DFS within a column\n\n**Complexity:** O(2^m × n × m) for n×m grid with m ≤ row dimension\n\n**Tip:** Orient the grid so m ≤ min(n,m) to minimize state space. For 4×n grids, 2^4 = 16 states; for 12×n, 2^12 = 4096 states (manageable).`,
    },
  ],
}
