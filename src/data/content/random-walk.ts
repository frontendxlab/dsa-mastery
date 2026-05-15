import type { Article } from '../articles'

export const randomWalkArticle: Article = {
  slug: 'random-walk',
  title: 'Random Walk & Expected Value',
  emoji: '🎲',
  tagline: 'Expected number of steps in random processes. Linear system or DP on states.',
  description: 'Random walk problems compute expected values: expected steps to reach a target, expected number of failures before success, expected cost in stochastic processes. Technique: define E[state] = expected value from that state, write recurrence, solve backward from absorbing states. Key formulas: geometric distribution, gambler\'s ruin, absorbing Markov chains.',
  gradient: 'from-pink-700 to-rose-800',
  topicSlug: 'math',
  readTime: '13 min',
  sections: [
    {
      type: 'text',
      content: `**Core recurrence:** $E[s] = \\text{cost}(s) + \\sum_i P(s \\to s_i) \\cdot E[s_i]$\n\nFor absorbing states (terminal): $E[\\text{absorbed}] = 0$. Work backward — compute $E$ for states closest to the absorbing state first, then propagate.\n\n**Geometric distribution:** If each trial succeeds with probability $p$, the expected number of trials to first success is $E = \\frac{1}{p}$.\n\n**Games with restart:** If reaching the restart costs $c$ steps and happens with probability $q$, then $E = c + q \\cdot E$ — solve to get $E = \\frac{c}{1-q}$.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Expected value DP template',
      code: `// Expected number of rolls of a fair die to reach sum >= n
// Recurrence: E[i] = 1 + (1/6) * sum(E[min(i+j, n)] for j=1..6)
// Base case: E[i] = 0 for i >= n (already reached)
function expectedRolls(n) {
    const E = new Array(n + 6).fill(0); // E[i]=0 for i>=n (absorbed)
    for (let i = n - 1; i >= 0; i--) {
        let sumNext = 0;
        for (let j = 1; j <= 6; j++) sumNext += E[Math.min(i + j, n)];
        E[i] = 1 + sumNext / 6;
    }
    return E[0];
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
      title: 'New 21 Game',
      url: 'https://leetcode.com/problems/new-21-game/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Brute force — simulate all possible score sequences',
          explanation: `Recursively enumerate all sequences of draws, sum probabilities of landing in [n, n+maxPts-1]. Exponential — too slow for large inputs.`,
          code: `// Brute force (TLE) — just to illustrate the structure
function new21GameBF(n, k, maxPts) {
    if (k === 0 || n >= k + maxPts) return 1;
    function dp(score) {
        if (score >= k) return score <= n ? 1 : 0;
        let prob = 0;
        for (let i = 1; i <= maxPts; i++) prob += dp(score + i);
        return prob / maxPts;
    }
    return dp(0);
}`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: DP with sliding window — O(n)',
          explanation: `dp[i] = probability of landing exactly at score i. dp[0] = 1. For i in 1..n+maxPts-1: dp[i] = (sum of dp[i-1..i-maxPts]) / maxPts. The sum is a sliding window of size maxPts — maintain it as windowSum. Answer = sum dp[n..min(n+maxPts-1, k+maxPts-1)] for scores ≤ n.`,
          code: `var new21Game = function(n, k, maxPts) {
    if(k===0||n>=k+maxPts) return 1;
    const dp=new Array(n+maxPts+1).fill(0); dp[0]=1;
    let windowSum=1, res=0;
    for(let i=1;i<=n+maxPts;i++){
        dp[i]=windowSum/maxPts;
        if(i<=k) windowSum+=dp[i];
        if(i>=maxPts) windowSum-=dp[i-maxPts];
        if(i>=n) res+=dp[i];
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Soup Servings',
      url: 'https://leetcode.com/problems/soup-servings/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Probability DP on (A remaining, B remaining)',
          explanation: `P[a][b] = probability A finishes first (or tie). Base cases: a=0,b=0 → 0.5; a=0 → 1; b=0 → 0. Transition: average of 4 equal operations. For large n: probability converges to 1 rapidly — short-circuit at n ≥ 4000.`,
          code: `var soupServings = function(n) {
    if(n>=4000) return 1;
    const m=Math.ceil(n/25); // scale down (same operations, just smaller numbers)
    const memo=new Map();
    const dp=(a,b)=>{
        if(a<=0&&b<=0) return 0.5;
        if(a<=0) return 1;
        if(b<=0) return 0;
        const key=a*201+b; if(memo.has(key)) return memo.get(key);
        const res=(dp(a-4,b)+dp(a-3,b-1)+dp(a-2,b-2)+dp(a-1,b-3))/4;
        memo.set(key,res); return res;
    };
    return dp(m,m);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Knight Probability in Chessboard',
      url: 'https://leetcode.com/problems/knight-probability-in-chessboard/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Forward DP — spread probability to valid next cells',
          explanation: `dp[r][c] = probability of knight being at (r,c) after current number of moves. Each step: for each cell, spread its probability to 8 possible next cells (each gets $\\frac{1}{8}$ of current). Sum all dp values after k moves = probability of still being on board.`,
          code: `var knightProbability = function(n, k, row, col) {
    const dirs=[[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];
    let dp=Array.from({length:n},()=>new Array(n).fill(0));
    dp[row][col]=1;
    for(let m=0;m<k;m++){
        const nd=Array.from({length:n},()=>new Array(n).fill(0));
        for(let r=0;r<n;r++) for(let c=0;c<n;c++) if(dp[r][c])
            for(const[dr,dc] of dirs){
                const[nr,nc]=[r+dr,c+dc];
                if(nr>=0&&nr<n&&nc>=0&&nc<n) nd[nr][nc]+=dp[r][c]/8;
            }
        dp=nd;
    }
    return dp.reduce((s,row)=>s+row.reduce((a,b)=>a+b,0),0);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🎲',
      color: 'red',
      content: `**Expected value DP recipe:**\n1. Define $E[s]$ = expected value from state $s$\n2. Write recurrence: $E[s] = \\text{cost} + \\sum_i P(s \\to s_i) \\cdot E[s_i]$\n3. Set base cases: $E[\\text{absorbing}] = 0$\n4. Compute backward from absorbing states\n\n**Common formulas:**\n- Geometric: $E[\\text{trials until success}] = \\frac{1}{p}$\n- Coupon collector: $E[\\text{collect all } n] = n \\cdot H_n \\approx n \\ln n$\n- Gambler's ruin: starting at $x$, $P(\\text{reach } n \\text{ before } 0) = \\frac{x}{n}$ (fair coin)\n\n**DP vs formula:** DP when state space is finite. Formula when pattern matches known distributions.`,
    },
  ],
}
