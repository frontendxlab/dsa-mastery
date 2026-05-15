import type { Article } from '../articles'

export const dpSpaceOptimizationArticle: Article = {
  slug: 'dp-space-optimization',
  title: 'DP Space Optimization',
  emoji: '💾',
  tagline: 'Rolling array: reduce O(n²) DP space to O(n) or O(1). Fill order matters.',
  description: 'Many 2D DP tables can be compressed to 1D by observing that each row only depends on the previous row. The key: when dp[i][j] depends on dp[i-1][j], dp[i][j-1], and dp[i-1][j-1], we can use a 1D array if we process in the right order. Traversal direction (left-to-right vs right-to-left) determines whether we use the new or old row\'s values.',
  gradient: 'from-teal-600 to-cyan-700',
  topicSlug: 'dp',
  readTime: '12 min',
  sections: [
    {
      type: 'text',
      content: `Space compression rule: if dp[i][j] depends only on row i-1, use one row. Overwrite from left-to-right when you need dp[i-1][j-1] (old diagonal) — BUT it gets overwritten, so save prev diagonally or use two arrays. Classic trick: LCS can use 1 row with careful ordering. 0/1 Knapsack: traverse weight right-to-left so items aren't counted twice.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'LCS and 0/1 knapsack with O(n) space',
      code: `// LCS with O(min(m,n)) space — 1D rolling array
function lcs(s, t) {
    const m = s.length, n = t.length;
    let dp = new Array(n + 1).fill(0);
    for (let i = 1; i <= m; i++) {
        let prev = 0; // dp[i-1][j-1]
        for (let j = 1; j <= n; j++) {
            const temp = dp[j]; // save dp[i-1][j] before overwrite
            if (s[i-1] === t[j-1]) dp[j] = prev + 1;
            else dp[j] = Math.max(dp[j], dp[j-1]);
            prev = temp; // prev becomes dp[i-1][j] for next iteration
        }
    }
    return dp[n];
}

// 0/1 Knapsack with O(W) space — process weights right-to-left
function knapsack(weights, values, W) {
    const dp = new Array(W + 1).fill(0);
    for (let i = 0; i < weights.length; i++) {
        // Right-to-left: ensures each item used at most once
        for (let w = W; w >= weights[i]; w--)
            dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
    }
    return dp[W];
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
      title: 'Longest Common Subsequence',
      url: 'https://leetcode.com/problems/longest-common-subsequence/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: 2D DP compressed to 1D with prev diagonal tracking',
          explanation: `dp[j] = LCS of text1[0..i] and text2[0..j]. Each cell needs dp[i-1][j-1] (diagonal), dp[i-1][j] (above), dp[i][j-1] (left). Track diagonal separately as \`prev\`.`,
          code: `var longestCommonSubsequence = function(text1, text2) {
    const m=text1.length,n=text2.length;
    const dp=new Array(n+1).fill(0);
    for(let i=1;i<=m;i++){
        let prev=0;
        for(let j=1;j<=n;j++){
            const temp=dp[j];
            dp[j]=text1[i-1]===text2[j-1]?prev+1:Math.max(dp[j],dp[j-1]);
            prev=temp;
        }
    }
    return dp[n];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Coin Change',
      url: 'https://leetcode.com/problems/coin-change/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Unbounded knapsack — 1D DP, left-to-right (allows reuse)',
          explanation: `dp[i] = minimum coins for amount i. dp[0]=0. For each coin, update dp[i] = min(dp[i], dp[i-coin]+1). Left-to-right traversal allows using same coin multiple times.`,
          code: `var coinChange = function(coins, amount) {
    const dp=new Array(amount+1).fill(Infinity); dp[0]=0;
    for(const coin of coins)
        for(let i=coin;i<=amount;i++)
            dp[i]=Math.min(dp[i],dp[i-coin]+1);
    return dp[amount]===Infinity?-1:dp[amount];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Target Sum',
      url: 'https://leetcode.com/problems/target-sum/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Subset sum — count subsets with sum = (target + total) / 2',
          explanation: `Assign + to some elements and - to others. Sum of + minus sum of - = target. Sum of + = (target + total) / 2 = S. Count subsets summing to S. Use 1D DP, right-to-left (0/1 knapsack style).`,
          code: `var findTargetSumWays = function(nums, target) {
    const total=nums.reduce((a,b)=>a+b,0);
    if((total+target)%2!==0||Math.abs(target)>total) return 0;
    const S=(total+target)/2;
    const dp=new Array(S+1).fill(0); dp[0]=1;
    for(const n of nums)
        for(let j=S;j>=n;j--)
            dp[j]+=dp[j-n];
    return dp[S];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Maximal Square',
      url: 'https://leetcode.com/problems/maximal-square/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: 1D DP with tracking previous diagonal',
          explanation: `dp[j] = side length of largest square ending at (current row, col j). dp[j] = min(dp[j-1], dp[j], prev) + 1 when matrix[i][j]=='1'. Track prev = dp[j] before update (that's dp[i-1][j-1]).`,
          code: `var maximalSquare = function(matrix) {
    const m=matrix.length,n=matrix[0].length;
    const dp=new Array(n+1).fill(0);
    let maxSide=0,prev=0;
    for(let i=1;i<=m;i++){
        for(let j=1;j<=n;j++){
            const temp=dp[j];
            if(matrix[i-1][j-1]==='1'){
                dp[j]=Math.min(dp[j-1],dp[j],prev)+1;
                maxSide=Math.max(maxSide,dp[j]);
            } else dp[j]=0;
            prev=temp;
        }
        prev=0; // reset prev for new row start
    }
    return maxSide*maxSide;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '💾',
      color: 'teal',
      content: `**Space compression rules:**\n- Row depends on previous row only → 1D rolling array\n- Cell uses diagonal (i-1,j-1): save in \`prev\` variable before overwriting\n- 0/1 knapsack (each item once): iterate weights right-to-left\n- Unbounded knapsack (infinite items): iterate weights left-to-right\n\n**When NOT to compress:** When you need to reconstruct the solution (backtrack through DP table) — keep 2D array or store choices separately.\n\n**Maximal Square trick:** dp[j] = min(left, above, diagonal) + 1. The three neighbors in 2D compress elegantly to three accessible values in 1D + prev variable.`,
    },
  ],
}
