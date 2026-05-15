import type { Article } from '../articles'

export const arithmeticDpArticle: Article = {
  slug: 'arithmetic-dp',
  title: 'Arithmetic Progression DP',
  emoji: '📐',
  tagline: 'Count/find longest AP subsequences. State = (last, diff). Key: hash by difference.',
  description: 'Arithmetic progression DP finds longest/count AP subsequences. State: dp[i][d] = length of longest AP ending at index i with common difference d. Transition: for each j < i, dp[i][d] = dp[j][d-that is wrong... dp[i][(arr[i]-arr[j])] = dp[j][(arr[i]-arr[j])] + 1. Use hashmaps for the difference dimension. Key: O(n²) with hashmaps, or O(n² log n) if sorted.',
  gradient: 'from-cyan-700 to-teal-800',
  topicSlug: 'dp',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `For longest arithmetic subsequence: dp[i] is a map from difference d to the length of the longest AP ending at arr[i] with difference d. For each i, j < i: d = arr[i] - arr[j]; dp[i][d] = max(dp[i][d], (dp[j][d] ?? 1) + 1). The answer is the maximum value across all dp[i] maps. O(n²) time with hashmaps for differences.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Arithmetic progression DP templates',
      code: `// Longest arithmetic subsequence
function longestArithSeqLength(nums) {
    const n = nums.length;
    const dp = Array.from({length: n}, () => new Map());
    let ans = 2;
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            const d = nums[i] - nums[j];
            const len = (dp[j].get(d) ?? 1) + 1;
            dp[i].set(d, Math.max(dp[i].get(d) ?? 2, len));
            ans = Math.max(ans, dp[i].get(d));
        }
    }
    return ans;
}

// Count arithmetic slices (subarrays) with at least 3 elements
function countArithSlices(nums) {
    const n = nums.length;
    let total = 0, cur = 0;
    for (let i = 2; i < n; i++) {
        if (nums[i] - nums[i-1] === nums[i-1] - nums[i-2]) {
            cur++;
            total += cur;
        } else {
            cur = 0;
        }
    }
    return total;
}

// Count arithmetic subsequences (not just subarrays)
function countArithSeqSubseq(nums) {
    const MOD = 1e9 + 7;
    const n = nums.length;
    const dp = Array.from({length: n}, () => new Map());
    let total = 0;
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            const d = nums[i] - nums[j];
            const prevLen = dp[j].get(d) ?? 0;
            const newLen = prevLen + 1;
            dp[i].set(d, (dp[i].get(d) ?? 0) + newLen);
            total += prevLen; // count subsequences of length >= 3
        }
    }
    return total % MOD;
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
      title: 'Longest Arithmetic Subsequence',
      url: 'https://leetcode.com/problems/longest-arithmetic-subsequence/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DP with hashmap per position',
          explanation: `dp[i] = map from difference d to length of longest AP ending at i with diff d. For each i, j: dp[i][d] = dp[j][d] + 1. Answer = max over all dp[i] values.`,
          code: `var longestArithSeqLength = function(nums) {
    const n=nums.length, dp=Array.from({length:n},()=>new Map());
    let ans=2;
    for(let i=1;i<n;i++){
        for(let j=0;j<i;j++){
            const d=nums[i]-nums[j];
            const len=(dp[j].get(d)??1)+1;
            dp[i].set(d,Math.max(dp[i].get(d)??2,len));
            ans=Math.max(ans,dp[i].get(d));
        }
    }
    return ans;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Arithmetic Slices',
      url: 'https://leetcode.com/problems/arithmetic-slices/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Running count of consecutive AP extensions',
          explanation: `When arr[i] - arr[i-1] = arr[i-1] - arr[i-2], this extends the current AP. Each extension adds (len-2) new AP slices, where len is current AP length.`,
          code: `var numberOfArithmeticSlices = function(nums) {
    let res=0,cur=0;
    for(let i=2;i<nums.length;i++){
        if(nums[i]-nums[i-1]===nums[i-1]-nums[i-2]) res+=(++cur);
        else cur=0;
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Arithmetic Slices II — Subsequence',
      url: 'https://leetcode.com/problems/arithmetic-slices-ii-subsequence/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: DP with hashmap — count length-2 APs that can extend',
          explanation: `dp[i][d] = number of arithmetic subsequences of length ≥ 2 ending at i with difference d. For each (j,i) pair: d = arr[i]-arr[j]; count += dp[j][d] (these extend to length ≥ 3); dp[i][d] += dp[j][d] + 1 (+1 for the pair (j,i) itself).`,
          code: `var numberOfArithmeticSlices = function(nums) {
    const MOD=1e9+7, n=nums.length;
    const dp=Array.from({length:n},()=>new Map());
    let total=0;
    for(let i=1;i<n;i++) for(let j=0;j<i;j++){
        const d=nums[i]-nums[j];
        const prev=dp[j].get(d)||0;
        total+=prev;
        dp[i].set(d,(dp[i].get(d)||0)+prev+1);
    }
    return total%MOD;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Longest Arithmetic Subsequence of Given Difference',
      url: 'https://leetcode.com/problems/longest-arithmetic-subsequence-of-given-difference/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DP with hashmap — O(n)',
          explanation: `dp[v] = longest AP ending with value v and fixed difference. For each element x: dp[x] = (dp[x-diff] ?? 0) + 1.`,
          code: `var longestSubsequence = function(arr, difference) {
    const dp=new Map(); let res=1;
    for(const x of arr){
        const prev=dp.get(x-difference)||0;
        dp.set(x,prev+1);
        res=Math.max(res,dp.get(x));
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '📐',
      color: 'teal',
      content: `**AP DP state space:**\n- dp[i][d] = AP length ending at index i with difference d\n- Transitions: O(n) per index, n indices → O(n²) total\n- Space: O(n²) in worst case (all different differences), but often sparse\n\n**Subarrays vs subsequences:**\n- Subarrays: O(n) with running count (simple)\n- Subsequences: O(n²) with hashmaps\n\n**Fixed difference:** O(n) with a single hashmap dp[value] = longest AP ending at this value.\n\n**Optimization for counting:** dp stores (partial APs of length ≥ 2) that can be extended. When we extend them to length 3, they contribute to the count.`,
    },
  ],
}
