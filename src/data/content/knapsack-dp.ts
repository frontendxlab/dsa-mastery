import type { Article } from '../articles'

export const knapsackDpArticle: Article = {
  slug: 'knapsack-dp',
  title: 'Knapsack DP',
  emoji: '🎒',
  tagline: 'Iterate backwards for 0/1. Forwards for unbounded. Know the difference.',
  description: 'Knapsack problems are "pick items to maximize/minimize subject to a capacity constraint." The 0/1 knapsack, unbounded knapsack, bounded knapsack, and multiple-knapsack variants all reduce to the same core template with one key difference: iteration direction. Backwards = each item used once. Forwards = unlimited reuse.',
  gradient: 'from-amber-500 to-yellow-600',
  topicSlug: 'dp',
  readTime: '18 min',
  sections: [
    {
      type: 'text',
      content: `Knapsack problems ask: given items with weights and values, pick a subset to maximize total value without exceeding capacity W. The brute force tries 2^n subsets. DP reduces this to O(n×W). The critical insight: whether each item can be used once (0/1) or multiple times (unbounded) changes the iteration direction.`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'The Direction Rule',
    },
    {
      type: 'callout',
      icon: '🔑',
      color: 'teal',
      content: `**The single most important rule:**\n\n- **Iterate weight backwards** (from W down to weight[i]): each item used AT MOST ONCE (0/1 knapsack). A capacity seen earlier in this pass hasn't yet included item i.\n- **Iterate weight forwards** (from weight[i] up to W): each item used UNLIMITED TIMES (unbounded knapsack). The same item can be added multiple times because we look at dp[j-weight[i]] which may already contain item i.\n\nThis is the ONLY difference between the two templates.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: '0/1 Knapsack vs Unbounded Knapsack',
      code: `// ======== 0/1 KNAPSACK ========
// Each item used at most once
// Iterate backwards to prevent reuse
function knapsack01(weights, values, W) {
    const dp = new Array(W + 1).fill(0);
    for (let i = 0; i < weights.length; i++) {
        for (let j = W; j >= weights[i]; j--) {  // ← BACKWARDS
            dp[j] = Math.max(dp[j], dp[j - weights[i]] + values[i]);
        }
    }
    return dp[W];
}

// ======== UNBOUNDED KNAPSACK ========
// Each item can be used unlimited times
// Iterate forwards to allow reuse
function unboundedKnapsack(weights, values, W) {
    const dp = new Array(W + 1).fill(0);
    for (let i = 0; i < weights.length; i++) {
        for (let j = weights[i]; j <= W; j++) {  // ← FORWARDS
            dp[j] = Math.max(dp[j], dp[j - weights[i]] + values[i]);
        }
    }
    return dp[W];
}

// ======== COUNT VARIANTS ========
// Replace max with + to count number of ways
// 0/1 count: backwards
function countSubsets(nums, target) {
    const dp = new Array(target + 1).fill(0);
    dp[0] = 1;
    for (const n of nums)
        for (let j = target; j >= n; j--)  // backwards = each used once
            dp[j] += dp[j - n];
    return dp[target];
}

// Unbounded count (coin change II): forwards
function countWays(coins, amount) {
    const dp = new Array(amount + 1).fill(0);
    dp[0] = 1;
    for (const c of coins)
        for (let j = c; j <= amount; j++)  // forwards = each used multiple times
            dp[j] += dp[j - c];
    return dp[amount];
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
      title: 'Coin Change (min coins)',
      url: 'https://leetcode.com/problems/coin-change/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Unbounded knapsack — minimize coins',
          explanation: `Each coin can be used unlimited times → forwards iteration. dp[j] = min coins to make amount j. Transition: dp[j] = min(dp[j], dp[j-c]+1) for each coin c. Base: dp[0]=0, rest=Infinity.`,
          code: `var coinChange = function(coins, amount) {
    const dp = new Array(amount+1).fill(Infinity);
    dp[0] = 0;
    for (const c of coins)
        for (let j = c; j <= amount; j++)  // forwards: coins reusable
            dp[j] = Math.min(dp[j], dp[j-c]+1);
    return dp[amount]===Infinity ? -1 : dp[amount];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Coin Change II (count ways)',
      url: 'https://leetcode.com/problems/coin-change-ii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Unbounded count knapsack',
          explanation: `Count combinations (not permutations) where order doesn't matter. Outer loop = coins (items), inner loop = amount (capacity) forwards. This ensures each coin value generates combinations, not permutations.`,
          code: `var change = function(amount, coins) {
    const dp = new Array(amount+1).fill(0);
    dp[0] = 1;
    for (const c of coins)          // outer loop: items
        for (let j=c; j<=amount; j++) // inner loop: capacity, FORWARDS
            dp[j] += dp[j-c];
    return dp[amount];
};

// NOTE: if inner/outer loops swapped, counts PERMUTATIONS (different problem!)
// To count permutations: outer = amount, inner = coins`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Partition Equal Subset Sum',
      url: 'https://leetcode.com/problems/partition-equal-subset-sum/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: 0/1 knapsack feasibility — can we reach sum/2?',
          explanation: `Total odd? Impossible. Otherwise, can any subset sum to total/2? 0/1 knapsack with each item used once → iterate backwards. dp[j] = true if subset summing to j is possible.`,
          code: `var canPartition = function(nums) {
    const total = nums.reduce((a,b)=>a+b);
    if(total%2) return false;
    const target=total/2;
    const dp=new Array(target+1).fill(false);
    dp[0]=true;
    for(const n of nums)
        for(let j=target;j>=n;j--)  // backwards: each number once
            dp[j]=dp[j]||dp[j-n];
    return dp[target];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Last Stone Weight II',
      url: 'https://leetcode.com/problems/last-stone-weight-ii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Reduce to partition — minimize difference between two groups',
          explanation: `Assign + or - to each stone. Minimize |sum+ - sum-|. This is partition into two groups to minimize difference. Optimal: maximize the subset sum S1 that's ≤ total/2. Answer = total - 2*S1. Same as 0/1 knapsack reaching closest to total/2.`,
          code: `var lastStoneWeightII = function(stones) {
    const total=stones.reduce((a,b)=>a+b);
    const target=total>>1;
    const dp=new Array(target+1).fill(0);
    for(const s of stones)
        for(let j=target;j>=s;j--)
            dp[j]=Math.max(dp[j],dp[j-s]+s);
    return total-2*dp[target];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Ones and Zeroes (2D Knapsack)',
      url: 'https://leetcode.com/problems/ones-and-zeroes/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: 2D 0/1 knapsack — two capacity dimensions',
          explanation: `dp[i][j] = max strings using at most i zeros and j ones. For each string with z zeros and o ones: iterate both dimensions backwards (0/1 knapsack in 2D). dp[i][j] = max(dp[i][j], dp[i-z][j-o]+1).`,
          code: `var findMaxForm = function(strs, m, n) {
    const dp=Array.from({length:m+1},()=>new Array(n+1).fill(0));
    for(const s of strs){
        const z=s.split('').filter(c=>c==='0').length;
        const o=s.length-z;
        for(let i=m;i>=z;i--)          // backwards: each string once
            for(let j=n;j>=o;j--)
                dp[i][j]=Math.max(dp[i][j],dp[i-z][j-o]+1);
    }
    return dp[m][n];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 6,
      title: 'Number of Ways to Form Target String (Bounded Knapsack)',
      url: 'https://leetcode.com/problems/number-of-ways-to-form-a-target-string-given-a-dictionary/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: DP counting with column frequency precomputation',
          explanation: `For each column j in words and each character c, precompute freq[j][c] = how many words have character c at column j. Then dp[i][j] = ways to form target[0..i-1] using columns 0..j-1. Transition: dp[i][j] = dp[i][j-1] (skip column j) + dp[i-1][j-1] × freq[j-1][target[i-1]] (use column j to place target[i-1]).`,
          code: `var numWays = function(words, target) {
    const MOD=1e9+7, m=target.length, n=words[0].length;
    const freq=Array.from({length:n},()=>new Array(26).fill(0));
    for(const w of words) for(let j=0;j<n;j++) freq[j][w.charCodeAt(j)-97]++;
    // dp[i][j] = ways to form target[0..i-1] using first j columns
    const dp=Array.from({length:m+1},()=>new Array(n+1).fill(0));
    for(let j=0;j<=n;j++) dp[0][j]=1; // empty target: 1 way
    for(let i=1;i<=m;i++)
        for(let j=i;j<=n;j++)
            dp[i][j]=(dp[i][j-1]+dp[i-1][j-1]*freq[j-1][target.charCodeAt(i-1)-97])%MOD;
    return dp[m][n];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧠',
      color: 'amber',
      content: `**Knapsack variant decision guide:**\n- Each item used ONCE → iterate capacity **backwards** (0/1 knapsack)\n- Each item used UNLIMITED times → iterate capacity **forwards** (unbounded)\n- Count COMBINATIONS → outer loop = items, inner loop = capacity\n- Count PERMUTATIONS → outer loop = capacity, inner loop = items\n- Multiple capacities → 2D dp (iterate all capacity dimensions backwards for 0/1)\n- Minimize instead of maximize → same template, replace max with min\n\n**Recognition signals:**\n- "Subset sum / partition" → 0/1 with boolean dp or value dp\n- "Coin change" → unbounded (coins reusable)\n- "Coin change II (ways)" → unbounded count, combinations order\n- "Bounded: each item limited k times" → binary splitting or deque optimization`,
    },
  ],
}
