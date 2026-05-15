import type { Article } from '../articles'

export const probabilityDpArticle: Article = {
  slug: 'probability-dp',
  title: 'Probability & Expected Value DP',
  emoji: '🎲',
  tagline: 'E[X] = Σ p(outcome) × value(outcome). DP builds it up iteratively.',
  description: 'Probability problems compute the expected value or probability of an outcome through a series of random choices. DP works because expected value decomposes: E[reaching state i] depends on E[reaching predecessor states]. Learn the gambler\'s ruin, dice throws, and random walk patterns.',
  gradient: 'from-purple-500 to-violet-600',
  topicSlug: 'dp',
  readTime: '16 min',
  sections: [
    {
      type: 'text',
      content: `Probability DP uses the linearity of expectation: E[X + Y] = E[X] + E[Y]. At each state, we compute either the probability of reaching it or the expected value starting from it. The key: transitions are probabilistic. Instead of "take min of neighboring states," we sum probabilities or expected values weighted by transition probabilities.`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Two Directions of DP',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Forward vs backward probability DP',
      code: `// ===== FORWARD DP: "probability of being in state s at step t" =====
// dp[t][s] = probability of being in state s after t steps
// Transition: dp[t+1][s'] += dp[t][s] * P(s → s')

// ===== BACKWARD DP: "expected cost to reach goal from state s" =====
// dp[s] = E[cost to reach goal | starting at state s]
// Transition: dp[s] = Σ P(s → s') * (cost(s→s') + dp[s'])
// Base: dp[goal] = 0 (already at goal, no more cost)

// Example: Knight on an infinite board, probability of staying on an 8x8 board
// after k moves — forward DP:
function knightProbability(n, k, row, col) {
    const moves = [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]];
    let dp = Array.from({length:n},()=>new Array(n).fill(0));
    dp[row][col] = 1.0;
    for (let m = 0; m < k; m++) {
        const next = Array.from({length:n},()=>new Array(n).fill(0));
        for (let r=0;r<n;r++)
            for (let c=0;c<n;c++) {
                if (!dp[r][c]) continue;
                for (const [dr,dc] of moves) {
                    const nr=r+dr, nc=c+dc;
                    if (nr>=0&&nr<n&&nc>=0&&nc<n)
                        next[nr][nc] += dp[r][c] / 8;
                }
            }
        dp = next;
    }
    return dp.reduce((s,row)=>s+row.reduce((a,b)=>a+b,0), 0);
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
      title: 'Knight Probability in Chessboard',
      url: 'https://leetcode.com/problems/knight-probability-in-chessboard/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Forward DP — spread probability each step',
          explanation: `dp[r][c] = probability of being at (r,c). Start with probability 1 at (row,col). Each step: spread current probabilities to all 8 knight destinations, dividing by 8. After k steps, sum all remaining probabilities on board.`,
          code: `var knightProbability = function(n, k, row, col) {
    const dirs=[[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]];
    let dp=Array.from({length:n},()=>new Array(n).fill(0));
    dp[row][col]=1;
    for(let m=0;m<k;m++){
        const next=Array.from({length:n},()=>new Array(n).fill(0));
        for(let r=0;r<n;r++) for(let c=0;c<n;c++){
            if(!dp[r][c]) continue;
            for(const [dr,dc] of dirs){
                const nr=r+dr,nc=c+dc;
                if(nr>=0&&nr<n&&nc>=0&&nc<n) next[nr][nc]+=dp[r][c]/8;
            }
        }
        dp=next;
    }
    return dp.reduce((s,r)=>s+r.reduce((a,b)=>a+b,0),0);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'New 21 Game (Reach at most maxPts in range)',
      url: 'https://leetcode.com/problems/new-21-game/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DP on probability of reaching each score',
          explanation: `dp[i] = probability of reaching exactly score i. From each score x, we can draw uniformly from [1,maxPts] to reach x+1..x+maxPts. dp[i] = sum(dp[i-maxPts..i-1]) / maxPts. Use a sliding window sum to avoid O(n²): wsum = sum of last maxPts dp values. Answer = sum of dp[n..maxPts+n-1 capped at k].`,
          code: `var new21Game = function(n, k, maxPts) {
    if(k===0||n>=k+maxPts) return 1;
    const dp=new Array(n+1).fill(0);
    dp[0]=1;
    let wsum=1, ans=0;
    for(let i=1;i<=n;i++){
        dp[i]=wsum/maxPts;
        if(i<k) wsum+=dp[i];        // still drawing: add this score to window
        else ans+=dp[i];             // done drawing (score >= k): accumulate answer
        if(i>=maxPts) wsum-=dp[i-maxPts]; // slide window: remove old score
    }
    return ans;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Soup Servings',
      url: 'https://leetcode.com/problems/soup-servings/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DP with early termination for large n',
          explanation: `dp[i][j] = probability of soup A running out first (or both simultaneously) when i portions of A and j portions of B remain. For large n (n > ~4800), the answer is essentially 1.0. For small n, fill the DP table with the 4 operations.`,
          code: `var soupServings = function(n) {
    if(n>4800) return 1; // empirical: converges fast
    const m=Math.ceil(n/25); // scale down for efficiency
    const dp=Array.from({length:m+1},()=>new Array(m+1).fill(0));
    dp[0][0]=0.5; // both empty simultaneously
    for(let i=1;i<=m;i++) dp[0][i]=1; // A empty, B not empty
    // Fill dp: p(i,j) = sum of 0.25 * p(after each operation)
    const ops=[[4,0],[3,1],[2,2],[1,3]]; // [drainA, drainB] per 1/4 operation
    for(let i=1;i<=m;i++)
        for(let j=1;j<=m;j++)
            for(const [a,b] of ops)
                dp[i][j]+=0.25*dp[Math.max(0,i-a)][Math.max(0,j-b)];
    return dp[m][m];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Frog Jump (DP on reachable stones)',
      url: 'https://leetcode.com/problems/frog-jump/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: DP on (stone, last_jump_size)',
          explanation: `State: (current stone position, size of last jump). From stone at position pos with last jump k, frog can jump k-1, k, or k+1 units. dp[pos] = set of last jump sizes that can reach pos. Build forward: for each stone and each valid jump size, propagate to reachable stones.`,
          code: `var canCross = function(stones) {
    const map=new Map(stones.map(s=>[s,new Set()]));
    map.get(0).add(0);
    for(const s of stones){
        for(const k of map.get(s)){
            for(const jump of [k-1,k,k+1]){
                if(jump>0 && map.has(s+jump))
                    map.get(s+jump).add(jump);
            }
        }
    }
    return map.get(stones[stones.length-1]).size>0;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Minimum Path Cost in a Grid (probability-like DP)',
      url: 'https://leetcode.com/problems/minimum-path-cost-in-a-grid/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DP row by row — transition cost from previous row',
          explanation: `dp[j] = min cost to reach column j in current row. Transition: from each cell (row-1, k) with value grid[row-1][k], we can move to any column j in row using moveCost[grid[row-1][k]][j]. dp[j] = min over all k of (dp_prev[k] + moveCost[grid[row-1][k]][j] + grid[row][j]).`,
          code: `var minPathCost = function(grid, moveCost) {
    const m=grid.length, n=grid[0].length;
    let dp=[...grid[0]]; // cost to reach each cell in row 0
    for(let r=1;r<m;r++){
        const next=new Array(n).fill(Infinity);
        for(let k=0;k<n;k++) // from column k in previous row
            for(let j=0;j<n;j++) // to column j in current row
                next[j]=Math.min(next[j], dp[k]+moveCost[grid[r-1][k]][j]+grid[r][j]);
        dp=next;
    }
    return Math.min(...dp);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🎲',
      color: 'purple',
      content: `**Probability DP patterns:**\n- "What's the probability of X after k steps?" → forward DP, spread probability each step\n- "Expected number of steps to goal?" → backward DP, E[s] = 1 + average E[neighbors]\n- "Probability of outcome given constraints?" → forward DP on score/state, sum valid final states\n- "Sliding window probability" → use running sum to avoid O(n²) per transition\n\n**Key insight**: For probability DP, instead of taking min/max of neighboring states, you AVERAGE them (weighted by transition probabilities). E[s] = Σ p(s→s') * (cost + E[s']).`,
    },
  ],
}
