import type { Article } from '../articles'

export const randomWalkArticle: Article = {
  slug: 'random-walk',
  title: 'Random Walk & Expected Value',
  emoji: '🎲',
  tagline: 'Expected number of steps in random processes. Linear system or DP on states.',
  description: 'Random walk problems compute expected values: expected steps to reach a target, expected number of failures before success, expected cost in stochastic processes. Technique: let E[state] = expected value from that state. Write equations E[state] = cost + Σ P(transition) × E[next_state]. Solve the linear system or find recurrence. Key: geometric distribution for i.i.d. trials, absorbing Markov chains.',
  gradient: 'from-pink-700 to-rose-800',
  topicSlug: 'math',
  readTime: '13 min',
  sections: [
    {
      type: 'text',
      content: `Expected value DP: E[state] = immediate_cost + Σ P(transition i) × E[next_state_i]. For absorbing states: E[absorbed] = 0. Solve backward from absorbing states. For games with restart: E = cost_before_restart + P(restart) × E → solve algebraically. Geometric distribution: P(first success at trial k) = p(1-p)^(k-1), E[trials] = 1/p.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Expected value DP for dice rolling',
      code: `// Expected number of rolls of a fair die to get sum >= n
// E[i] = 0 if i >= n
// E[i] = 1 + (1/6) * Σ E[i+j] for j=1..6 (if i+j >= n, that term is 0)
function expectedRolls(n) {
    const E = new Array(n + 6).fill(0); // E[i] = 0 for i >= n
    // Compute E[n-1], E[n-2], ... E[0]
    for (let i = n - 1; i >= 0; i--) {
        // E[i] = 1 + (1/6) * sum(E[i+j] for j=1..6)
        let sumNext = 0;
        for (let j = 1; j <= 6; j++) sumNext += E[Math.min(i + j, n)]; // cap at n
        E[i] = 1 + sumNext / 6;
    }
    return E[0];
}

// Probability DP: P[i] = probability of reaching position n from position i
function probReachN(n, p) { // p = prob of moving +1, 1-p = -1
    if (p <= 0.5 && n > 0) return 0; // never reaches with prob 1
    const prob = (p < 1 && n > 0) ? Math.pow((1-p)/p, 0) : 1; // gambler's ruin
    // Exact formula for 1D random walk from 0 to n:
    // P(reach n before -∞) = 1 if p > 0.5
    return p > 0.5 ? 1 : (p === 0.5 ? 0 : 0); // simplified
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
          label: 'Intuition 1: DP with sliding window sum',
          explanation: `dp[i] = probability of landing exactly at score i. dp[0] = 1. For i in 1..n+k-1: dp[i] = (sum of dp[i-1..i-k]) / k. Use sliding window sum for O(n). Answer = sum of dp[n..n+k-1] but scores ≤ x: sum dp[n..x] if x ≥ n else dp includes [n..min(n+k-1,x)].`,
          code: `var new21Game = function(n, k, maxPts) {
    if(k===0||n>=k+maxPts) return 1;
    const dp=new Array(n+maxPts+1).fill(0); dp[0]=1;
    let windowSum=1; let res=0;
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
          explanation: `P[a][b] = probability of A finishing first (or tie). Base cases: if a=0 and b=0: 0.5. If a=0: 1. If b=0: 0. Transition: average of 4 equal operations on (a,b). For large n: probability approaches 1 rapidly.`,
          code: `var soupServings = function(n) {
    if(n>=4000) return 1; // fast convergence
    const m=Math.ceil(n/25); // scale down
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
          label: 'Intuition 1: DP forward — probability of being at (r,c) after k moves',
          explanation: `dp[r][c] = probability of knight being at (r,c) after current number of moves. After k moves: for each cell, spread probability to 8 possible next cells (each with probability /8). Sum probability of still being on board after k moves.`,
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
      color: 'pink',
      content: `**Expected value DP approach:**\n1. Define E[state] = expected value from this state\n2. Write recurrence: E[state] = cost + Σ P(next) × E[next]\n3. Solve backward from absorbing states\n\n**Common formulas:**\n- Geometric: E[trials until success] = 1/p\n- Expected coupon collector: E[collect all n types] = n × Hₙ ≈ n ln n\n- Gambler's ruin: starting at x, P(reach n before 0) = x/n (fair coin)\n\n**When to use DP vs formula:** DP when state space is finite and not too large. Formula when pattern is recognizable (geometric, coupon collector, etc.).`,
    },
  ],
}
