import type { Article } from '../articles'

export const matrixChainArticle: Article = {
  slug: 'matrix-chain',
  title: 'Matrix Chain & Generalized Interval DP',
  emoji: '🔗',
  tagline: 'Optimal parenthesization, burst balloons, stone merging. O(n³) interval DP.',
  description: 'Matrix chain multiplication and its generalizations: given a sequence of items, find the optimal way to combine adjacent pairs. dp[i][j] = optimal cost to combine items[i..j]. Transition: for each split point k, dp[i][j] = min over k in [i..j-1] of (dp[i][k] + dp[k+1][j] + cost(i,k,j)). Applications: matrix chain, burst balloons, stone game, remove boxes.',
  gradient: 'from-amber-700 to-yellow-800',
  topicSlug: 'dp',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `Interval DP template: compute dp[i][j] for increasing lengths. For length 1: base case. For length > 1: try all split points k. dp[i][j] = optimal combination of dp[i][k] and dp[k+1][j] plus the cost of merging the two parts. Burst balloons trick: think about the LAST balloon to burst in the range [i..j], not the first. This avoids dependency issues.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Matrix chain DP template',
      code: `// Matrix chain multiplication — minimum scalar multiplications
function matrixChain(dims) {
    const n = dims.length - 1; // n matrices
    // Matrix i has dimensions dims[i] x dims[i+1]
    const dp = Array.from({length: n}, () => new Array(n).fill(0));

    for (let len = 2; len <= n; len++) {
        for (let i = 0; i + len - 1 < n; i++) {
            const j = i + len - 1;
            dp[i][j] = Infinity;
            for (let k = i; k < j; k++) {
                const cost = dp[i][k] + dp[k+1][j] + dims[i] * dims[k+1] * dims[j+1];
                dp[i][j] = Math.min(dp[i][j], cost);
            }
        }
    }
    return dp[0][n-1];
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
      title: 'Burst Balloons',
      url: 'https://leetcode.com/problems/burst-balloons/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Think about the LAST balloon burst in range [i..j]',
          explanation: `Add sentinels 1 at both ends. dp[i][j] = max coins from bursting all balloons between i and j (exclusive). For each k as the last to burst: coins = nums[i]*nums[k]*nums[j] + dp[i][k] + dp[k][j]. O(n³).`,
          code: `var maxCoins = function(nums) {
    const n=nums.length;
    nums=[1,...nums,1]; // sentinels
    const m=nums.length;
    const dp=Array.from({length:m},()=>new Array(m).fill(0));
    for(let len=2;len<m;len++){
        for(let i=0;i+len<m;i++){
            const j=i+len;
            for(let k=i+1;k<j;k++)
                dp[i][j]=Math.max(dp[i][j],dp[i][k]+dp[k][j]+nums[i]*nums[k]*nums[j]);
        }
    }
    return dp[0][m-1];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Strange Printer',
      url: 'https://leetcode.com/problems/strange-printer/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Interval DP — dp[i][j] = min turns to print s[i..j]',
          explanation: `dp[i][j] = dp[i][j-1] + 1 (print s[j] separately). Optimize: if s[k] == s[j] for some k in [i..j-1], we can print s[j] as part of s[k]'s turn: dp[i][j] = min(dp[i][j], dp[i][k] + dp[k+1][j-1]).`,
          code: `var strangePrinter = function(s) {
    const n=s.length;
    const dp=Array.from({length:n},()=>new Array(n).fill(0));
    for(let i=n-1;i>=0;i--){
        dp[i][i]=1;
        for(let j=i+1;j<n;j++){
            dp[i][j]=dp[i][j-1]+1;
            for(let k=i;k<j;k++)
                if(s[k]===s[j]) dp[i][j]=Math.min(dp[i][j],dp[i][k]+(k+1<=j-1?dp[k+1][j-1]:0));
        }
    }
    return dp[0][n-1];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Minimum Cost to Merge Stones',
      url: 'https://leetcode.com/problems/minimum-cost-to-merge-stones/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Interval DP — merge k piles at a time',
          explanation: `If (n-1) % (k-1) != 0, impossible. dp[i][j] = min cost to merge piles[i..j] into as few piles as possible. When (j-i) % (k-1) == 0, add prefix_sum[i][j] to merge final k piles into 1.`,
          code: `var mergeStones = function(stones, k) {
    const n=stones.length;
    if((n-1)%(k-1)!==0) return -1;
    const prefix=[0];
    for(const s of stones) prefix.push(prefix[prefix.length-1]+s);
    const sum=(i,j)=>prefix[j+1]-prefix[i];
    const dp=Array.from({length:n},()=>new Array(n).fill(0));
    for(let len=k;len<=n;len++){
        for(let i=0;i+len-1<n;i++){
            const j=i+len-1; dp[i][j]=Infinity;
            for(let m=i;m<j;m+=k-1)
                dp[i][j]=Math.min(dp[i][j],dp[i][m]+dp[m+1][j]);
            if((len-1)%(k-1)===0) dp[i][j]+=sum(i,j);
        }
    }
    return dp[0][n-1];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🔗',
      color: 'amber',
      content: `**Interval DP pattern:** dp[i][j] for all lengths from 2 to n. Outer loop: length. Inner loops: start i, then split point k.\n\n**Burst balloons trick:** Think about the LAST item removed, not the first. This ensures the two subproblems dp[i][k] and dp[k][j] are independent (k is not yet removed when we compute them).\n\n**Complexity:** O(n³) — n² intervals × n split points. Feasible for n ≤ 500. For n > 500, need Knuth-Yao optimization (requires monotone optimality condition) to get O(n²).`,
    },
  ],
}
