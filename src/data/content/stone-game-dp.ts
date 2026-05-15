import type { Article } from '../articles'

export const stoneGameDpArticle: Article = {
  slug: 'stone-game-dp',
  title: 'Stone Game & Minimax DP',
  emoji: '⚪',
  tagline: 'Both players play optimally. DP for competitive game results and optimal values.',
  description: 'Stone game problems involve two players alternately making optimal moves. Key insight: dp[i][j] = maximum score advantage (current player minus opponent) achievable from stones[i..j]. Transition: current player picks from either end, opponent plays optimally on the remainder. For simple cases, mathematical tricks (parity, prefix sums) give O(1). Complex variants need true DP or alpha-beta pruning.',
  gradient: 'from-slate-700 to-gray-800',
  topicSlug: 'dp',
  readTime: '13 min',
  sections: [
    {
      type: 'text',
      content: `Stone game DP: dp[i][j] = score advantage for current player from range [i..j]. dp[i][i] = piles[i]. For j > i: dp[i][j] = max(piles[i] - dp[i+1][j], piles[j] - dp[i][j-1]). If dp[0][n-1] >= 0, first player wins. Note: score advantage = your_score - opponent_score. Since opponent plays optimally on the subproblem, their max advantage from remaining = dp[...][...].`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Stone game DP and minimax template',
      code: `// Stone Game I — can first player always win? (trivially yes for even n)
// Stone Game DP: dp[i][j] = score advantage for current player
function stoneGameAdvantage(piles) {
    const n = piles.length;
    const dp = Array.from({length: n}, (_, i) => [...piles]); // dp[i][i] = piles[i]
    // Initialize diagonal: dp[i][i] = piles[i] (already done)

    for (let len = 2; len <= n; len++) {
        for (let i = 0; i + len - 1 < n; i++) {
            const j = i + len - 1;
            dp[i][j] = Math.max(
                piles[i] - dp[i+1][j], // take left, opponent gets dp[i+1][j]
                piles[j] - dp[i][j-1]  // take right, opponent gets dp[i][j-1]
            );
        }
    }
    return dp[0][n-1]; // >= 0 means first player wins or ties
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
      title: 'Stone Game',
      url: 'https://leetcode.com/problems/stone-game/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Math — first player always wins (return true)',
          explanation: `With even number of piles, first player can always pick all even-indexed or all odd-indexed piles (whichever sums to more). So first player always wins. But DP works too: dp[i][j] = score advantage for current player.`,
          code: `var stoneGame = function(piles) {
    // Mathematical: first player always wins
    return true;
    // DP approach:
    // const n=piles.length;
    // const dp=piles.map(v=>[...Array(n).fill(0)]);
    // for(let i=0;i<n;i++) dp[i][i]=piles[i];
    // for(let len=2;len<=n;len++) for(let i=0;i+len-1<n;i++){
    //   const j=i+len-1;
    //   dp[i][j]=Math.max(piles[i]-dp[i+1][j],piles[j]-dp[i][j-1]);
    // }
    // return dp[0][n-1]>=0;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Predict the Winner',
      url: 'https://leetcode.com/problems/predict-the-winner/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DP — dp[i][j] = score advantage for current player',
          explanation: `dp[i][j] = max advantage from nums[i..j]. dp[i][i] = nums[i]. dp[i][j] = max(nums[i] - dp[i+1][j], nums[j] - dp[i][j-1]). Winner 1 wins/ties if dp[0][n-1] >= 0.`,
          code: `var predictTheWinner = function(nums) {
    const n=nums.length;
    const dp=nums.map(v=>[...Array(n).fill(0)]);
    for(let i=0;i<n;i++) dp[i][i]=nums[i];
    for(let len=2;len<=n;len++) for(let i=0;i+len-1<n;i++){
        const j=i+len-1;
        dp[i][j]=Math.max(nums[i]-dp[i+1][j],nums[j]-dp[i][j-1]);
    }
    return dp[0][n-1]>=0;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Stone Game III',
      url: 'https://leetcode.com/problems/stone-game-iii/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: DP from right — dp[i] = max advantage starting from index i',
          explanation: `dp[i] = max score advantage for current player from stoneValue[i..n-1]. Try taking 1, 2, or 3 stones. dp[i] = max over k=1,2,3 of (sum(i..i+k-1) - dp[i+k]). dp[n] = 0 (base case).`,
          code: `var stoneGameIII = function(stoneValue) {
    const n=stoneValue.length;
    const dp=new Array(n+1).fill(-Infinity); dp[n]=0;
    for(let i=n-1;i>=0;i--){
        let sum=0;
        for(let k=1;k<=3&&i+k-1<n;k++){
            sum+=stoneValue[i+k-1];
            dp[i]=Math.max(dp[i],sum-dp[i+k]);
        }
    }
    return dp[0]>0?'Alice':dp[0]<0?'Bob':'Tie';
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Stone Game IV',
      url: 'https://leetcode.com/problems/stone-game-iv/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: DP — can current player win from n stones?',
          explanation: `dp[i] = can current player win with i stones. Try removing any perfect square k² ≤ i. If dp[i-k²] is false (opponent loses), then dp[i] = true. dp[0] = false (lose).`,
          code: `var winnerSquareGame = function(n) {
    const dp=new Array(n+1).fill(false);
    for(let i=1;i<=n;i++)
        for(let k=1;k*k<=i;k++)
            if(!dp[i-k*k]){dp[i]=true;break;}
    return dp[n];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '⚪',
      color: 'gray',
      content: `**Game DP convention:** dp[i][j] = score advantage for CURRENT player (not Alice specifically). This automatically handles alternating turns — opponent's best play from subproblem is already accounted for.\n\n**Two-player game patterns:**\n- Take from ends: interval DP, O(n²)\n- Take any perfect square: 1D DP, O(n√n)\n- Take from stack in runs: DP from right, O(n)\n- Nim game: XOR of pile sizes\n\n**Reduction to Sprague-Grundy:** For impartial games (both players have same moves), compute Grundy values. Non-zero = first player wins.`,
    },
  ],
}
