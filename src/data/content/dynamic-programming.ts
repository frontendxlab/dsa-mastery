import type { Article } from '../articles'

export const dpArticle: Article = {
  slug: 'dynamic-programming',
  title: 'Dynamic Programming',
  emoji: '🧠',
  tagline: 'Overlapping subproblems + optimal substructure = DP.',
  description: 'DP is not magic. It\'s recursion with memoization, then turned into a table. Learn the 4-step progression from brute force to space-optimized tabulation, and the classic problem families.',
  gradient: 'from-violet-400 to-purple-500',
  topicSlug: 'dp',
  readTime: '24 min',
  sections: [
    {
      type: 'text',
      content: `Dynamic programming has a reputation for being mysterious, but there's a mechanical progression that works on almost every DP problem. The key is recognizing that DP is just recursion where you cache intermediate results to avoid recomputing them. Once you have the recursive solution, turning it into tabulation is almost mechanical.`,
    },
    {
      type: 'callout',
      icon: '🔑',
      color: 'teal',
      content: `**Two requirements for DP:**\n1. **Optimal substructure** — optimal solution of the whole can be built from optimal solutions of subproblems\n2. **Overlapping subproblems** — same subproblems are solved multiple times in the naive recursion`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'The 4-Step Progression',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Step 1 → Brute force recursion',
      code: `// No memoization. Time: O(2^n)
const helper = (i) => {
    if (i >= n) return 0;
    return Math.max(helper(i + 1), nums[i] + helper(i + 2));
};`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Step 2 → Memoization (top-down)',
      code: `// Cache results. Time: O(n), Space: O(n)
const mem = {};
const helper = (i) => {
    if (i >= n) return 0;
    if (mem[i] !== undefined) return mem[i];
    return mem[i] = Math.max(helper(i + 1), nums[i] + helper(i + 2));
};`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Step 3 → Tabulation (bottom-up)',
      code: `// Build table iteratively. Time: O(n), Space: O(n)
const dp = new Array(n + 2).fill(0);
for (let i = n - 1; i >= 0; i--)
    dp[i] = Math.max(dp[i + 1], nums[i] + dp[i + 2]);
return dp[0];`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Step 4 → Space optimization',
      code: `// Only need last two values. Time: O(n), Space: O(1)
let next1 = 0, next2 = 0;
for (let i = n - 1; i >= 0; i--) {
    const curr = Math.max(next1, nums[i] + next2);
    next2 = next1;
    next1 = curr;
}
return next1;`,
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'blue',
      content: `**DAG visualization trick**: Draw the recursion tree as a DAG (Directed Acyclic Graph) — each unique subproblem is one node. The DAG shape tells you:\n- Shape of the DP table (dimensions)\n- What subproblems each problem needs\n- Rotate DAG 90° clockwise → it looks like the DP table filling order`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Problem Families',
    },
    {
      type: 'table',
      headers: ['Family', 'Key Words', 'State Shape'],
      rows: [
        ['1D linear', 'Fibonacci, house robber, climbing stairs', 'dp[i]'],
        ['2D grid', 'Min path, unique paths, coin change (unbounded)', 'dp[i][j]'],
        ['Knapsack', '0/1 take or skip, weight/value', 'dp[i][w]'],
        ['Interval DP', 'Merge, burst, cut, matrix chain', 'dp[i][j] = range [i..j]'],
        ['Tree DP', 'House robber III, max path sum', 'pair [skip, rob] from postorder'],
        ['Bitmask DP', 'Assigned tasks, TSP', 'dp[mask][i]'],
        ['Digit DP', 'Count numbers with property ≤ N', 'dp[pos][tight][state]'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'House Robber',
      url: 'https://leetcode.com/problems/house-robber/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Recurrence — rob or skip',
          explanation: `For house i: either rob it (gain nums[i] + best up to i-2) or skip it (best up to i-1). Take max. This is the recurrence: dp[i] = max(dp[i-1], nums[i] + dp[i-2]).`,
        },
        {
          label: 'Intuition 2: All 4 variants',
          explanation: `House Robber 1 → 1D DP, classic recurrence.\nHouse Robber 2 → Houses in circle: run 1D DP twice — once excluding first house, once excluding last. Take max.\nHouse Robber 3 → Houses on binary tree: postorder DFS returns pair [best if skip, best if rob]. Parent uses children's values.\nHouse Robber 4 → Find minimum capability using binary search on answer.`,
          code: `// House Robber 1
function rob(nums) {
    const n = nums.length;
    if (n === 1) return nums[0];
    let pp = nums[0], p = Math.max(nums[0], nums[1]);
    for (let i = 2; i < n; i++) {
        const curr = Math.max(p, nums[i] + pp);
        pp = p; p = curr;
    }
    return p;
}

// House Robber 2 (circular)
function robCircular(nums) {
    const robRange = (l, r) => {
        let pp = 0, p = 0;
        for (let i = l; i <= r; i++) {
            const curr = Math.max(p, nums[i] + pp);
            pp = p; p = curr;
        }
        return p;
    };
    const n = nums.length;
    return Math.max(robRange(0, n-2), robRange(1, n-1));
}

// House Robber 3 (binary tree)
function robTree(root) {
    const dfs = (node) => {
        if (!node) return [0, 0];  // [skipRob, doRob]
        const left = dfs(node.left), right = dfs(node.right);
        const doRob = node.val + left[0] + right[0];
        const skipRob = Math.max(...left) + Math.max(...right);
        return [skipRob, doRob];
    };
    return Math.max(...dfs(root));
}`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Minimum Cost Path (DP on 2D grid)',
      url: 'https://leetcode.com/problems/minimum-path-sum/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Recursion — choose min of right or down',
          explanation: `From (0,0) to (n-1,m-1), can only go right or down. At each cell, min cost = cell value + min(go right, go down). Base case: at (n-1,m-1) return cell value. At edges (last row/col) only one direction available.`,
          code: `// Memoized
const mem = Array.from({length: n}, () => new Array(m).fill(-1));
const helper = (i, j) => {
    if (i >= n || j >= m) return Infinity;
    if (mem[i][j] !== -1) return mem[i][j];
    if (i === n-1 && j === m-1) return mem[i][j] = grid[i][j];
    return mem[i][j] = grid[i][j] + Math.min(helper(i+1, j), helper(i, j+1));
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Tabulation — fill row by row',
          explanation: `Fill dp[0][0] = grid[0][0]. Fill first row with running sum (can only come from left). Fill first column with running sum (can only come from above). Fill rest: dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1]).`,
          code: `function minPathSum(grid) {
    const n = grid.length, m = grid[0].length;
    const dp = Array.from({length: n}, () => new Array(m).fill(0));
    dp[0][0] = grid[0][0];
    for (let i = 1; i < n; i++) dp[i][0] = dp[i-1][0] + grid[i][0];
    for (let j = 1; j < m; j++) dp[0][j] = dp[0][j-1] + grid[0][j];
    for (let i = 1; i < n; i++)
        for (let j = 1; j < m; j++)
            dp[i][j] = grid[i][j] + Math.min(dp[i-1][j], dp[i][j-1]);
    return dp[n-1][m-1];
}`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Coin Change',
      url: 'https://leetcode.com/problems/coin-change/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Recursion — try each coin',
          explanation: `For amount a, try each coin c: if c ≤ a, use it and recurse on amount a-c. Min of all choices + 1 is the answer. Base case: amount 0 = 0 coins. Cache with memoization.`,
        },
        {
          label: 'Intuition 2: Bottom-up tabulation (unbounded knapsack pattern)',
          explanation: `dp[i] = min coins to make amount i. Initialize dp[0] = 0, rest = Infinity. For each amount from 1 to target: try each coin, dp[i] = min(dp[i], dp[i - coin] + 1). Classic unbounded knapsack structure.`,
          code: `var coinChange = function(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    for (let i = 1; i <= amount; i++)
        for (const coin of coins)
            if (coin <= i && dp[i - coin] !== Infinity)
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    return dp[amount] === Infinity ? -1 : dp[amount];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Maximum Sum of 3 Non-Overlapping Subarrays',
      url: 'https://leetcode.com/problems/maximum-sum-of-3-non-overlapping-subarrays/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Precompute window sums, then DP take/skip',
          explanation: `First, compute sums of every k-width window. Then use DP: dp(idx, rem) = max sum taking rem more windows starting at or after idx. Take = sums[idx] + dp(idx+k, rem-1). Skip = dp(idx+1, rem). Return max.\n\nFor the actual indices (not just max value), run the same DP again and prefer "take" when take ≥ skip.`,
          code: `var maxSumOfThreeSubarrays = function(nums, k) {
    const n = nums.length - k + 1;
    const sums = [];
    let sum = nums.slice(0, k).reduce((a, b) => a + b, 0);
    sums.push(sum);
    for (let i = k; i < nums.length; i++) {
        sum += nums[i] - nums[i - k];
        sums.push(sum);
    }

    // Memoized DP
    const mem = Array.from({length: n+1}, () => new Array(4).fill(-1));
    const dp = (idx, rem) => {
        if (rem === 0) return 0;
        if (idx >= n) return rem > 0 ? -Infinity : 0;
        if (mem[idx][rem] !== -1) return mem[idx][rem];
        const take = sums[idx] + dp(idx + k, rem - 1);
        const skip = dp(idx + 1, rem);
        return mem[idx][rem] = Math.max(take, skip);
    };

    const indices = [];
    const buildPath = (idx, rem) => {
        if (rem === 0 || idx >= n) return;
        const take = sums[idx] + dp(idx + k, rem - 1);
        const skip = dp(idx + 1, rem);
        if (take >= skip) { indices.push(idx); buildPath(idx + k, rem - 1); }
        else buildPath(idx + 1, rem);
    };
    dp(0, 3);
    buildPath(0, 3);
    return indices;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'green',
      content: `**Recognizing DP problem titles**: Problems using words like *shortest, longest, minimum, maximum, count, ways, best* — especially when combined with constraints like "at most k" or "contiguous" — are almost always DP candidates. The optimal substructure is usually obvious once you ask: "if I knew the answer for all smaller subproblems, could I solve this one?"`,
    },
  ],
}
