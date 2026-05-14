import type { Article } from '../articles'

export const sequencesArticle: Article = {
  slug: 'sequences',
  title: 'Sequences — LIS, LCS & More',
  emoji: '📈',
  tagline: 'LIS in O(n log n). LCS from DP. Every sequence has a structure.',
  description: 'Sequence problems — Longest Increasing Subsequence, Longest Common Subsequence, and arithmetic/geometric sequences — appear constantly. Master the 3 LIS approaches and the 2D LCS table.',
  gradient: 'from-indigo-400 to-violet-500',
  topicSlug: 'sequences',
  readTime: '18 min',
  sections: [
    {
      type: 'text',
      content: `Sequence problems ask you to find a longest/shortest/optimal subsequence (elements in order but not necessarily contiguous). The two giants are LIS (Longest Increasing Subsequence) and LCS (Longest Common Subsequence). Both have three levels of solutions — brute force, DP, and optimized — and understanding each level gives insight into the structure.`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'LIS — Longest Increasing Subsequence',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'LIS — O(n²) DP',
      code: `// dp[i] = LIS ending at index i
// For each i, look at all j < i where nums[j] < nums[i]
function lis_n2(nums) {
    const n = nums.length;
    const dp = new Array(n).fill(1);
    for (let i = 1; i < n; i++)
        for (let j = 0; j < i; j++)
            if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
    return Math.max(...dp);
}`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'LIS — O(n log n) patience sorting / binary search',
      code: `// Maintain 'tails': tails[i] = smallest tail element of all increasing subsequences of length i+1
// Binary search for position where nums[i] should go:
//   - If nums[i] > tails[-1]: extend, push
//   - Else: replace first tail >= nums[i] (keeps tails minimal → more room for future)
function lis_nlogn(nums) {
    const tails = [];
    for (const num of nums) {
        let lo = 0, hi = tails.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (tails[mid] < num) lo = mid + 1;
            else hi = mid;
        }
        tails[lo] = num;  // replace or extend
    }
    return tails.length;  // tails.length = LIS length
}
// Note: tails array does NOT contain the actual LIS — it's a auxiliary structure
// To reconstruct: track predecessors during the binary search`,
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'teal',
      content: `**Why patience sorting works**: We're maintaining the minimum possible "tail" for each subsequence length. By replacing the first tail ≥ num (not > num), we keep tails strictly increasing. A smaller tail gives more future elements a chance to extend. The length of tails = LIS length, even though tails itself isn't the LIS.`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'LCS — Longest Common Subsequence',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'LCS — O(m×n) DP',
      code: `// dp[i][j] = LCS of text1[0..i-1] and text2[0..j-1]
// Base case: dp[0][j] = dp[i][0] = 0 (empty string has LCS 0)
// If chars match: dp[i][j] = dp[i-1][j-1] + 1
// Else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])
function lcs(text1, text2) {
    const m = text1.length, n = text2.length;
    const dp = Array.from({length: m+1}, () => new Array(n+1).fill(0));
    for (let i = 1; i <= m; i++)
        for (let j = 1; j <= n; j++)
            dp[i][j] = text1[i-1] === text2[j-1]
                ? dp[i-1][j-1] + 1
                : Math.max(dp[i-1][j], dp[i][j-1]);
    return dp[m][n];
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
      title: 'Longest Increasing Subsequence',
      url: 'https://leetcode.com/problems/longest-increasing-subsequence/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: O(n²) DP',
          explanation: `dp[i] = length of LIS ending at nums[i]. For each i, scan all j < i, if nums[j] < nums[i] then dp[i] = max(dp[i], dp[j]+1). Answer = max(dp).`,
          code: `var lengthOfLIS = function(nums) {
    const dp = new Array(nums.length).fill(1);
    for (let i = 1; i < nums.length; i++)
        for (let j = 0; j < i; j++)
            if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
    return Math.max(...dp);
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: O(n log n) patience sort',
          explanation: `Maintain tails array. Binary search to find insertion position. Replace or extend. Length of tails = LIS length.`,
          code: `var lengthOfLIS = function(nums) {
    const tails = [];
    for (const n of nums) {
        let l = 0, r = tails.length;
        while (l < r) { const m = (l+r)>>1; tails[m] < n ? l = m+1 : r = m; }
        tails[l] = n;
    }
    return tails.length;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Longest Common Subsequence',
      url: 'https://leetcode.com/problems/longest-common-subsequence/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: 2D DP table',
          explanation: `Classic LCS — see template above. The table fills left-to-right, top-to-bottom. Cell (i,j) uses cell (i-1,j-1) if chars match, otherwise max of (i-1,j) and (i,j-1).`,
          code: `var longestCommonSubsequence = function(text1, text2) {
    const m = text1.length, n = text2.length;
    const dp = Array.from({length: m+1}, () => new Array(n+1).fill(0));
    for (let i = 1; i <= m; i++)
        for (let j = 1; j <= n; j++)
            dp[i][j] = text1[i-1] === text2[j-1]
                ? dp[i-1][j-1] + 1
                : Math.max(dp[i-1][j], dp[i][j-1]);
    return dp[m][n];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Number of Longest Increasing Subsequence',
      url: 'https://leetcode.com/problems/number-of-longest-increasing-subsequence/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Two DP arrays — length and count',
          explanation: `Run the O(n²) LIS DP but track two arrays: dp[i] = LIS length ending at i, count[i] = number of such subsequences.\n\nFor each pair (j, i) where j < i and nums[j] < nums[i]:\n- If dp[j]+1 > dp[i]: new longest found, update dp[i] and reset count[i] = count[j]\n- If dp[j]+1 === dp[i]: same length, add count[j] to count[i]\n\nAnswer = sum of count[i] for all i where dp[i] === maxLen.`,
          code: `var findNumberOfLIS = function(nums) {
    const n = nums.length;
    const dp = new Array(n).fill(1);
    const cnt = new Array(n).fill(1);
    for (let i = 1; i < n; i++)
        for (let j = 0; j < i; j++) {
            if (nums[j] >= nums[i]) continue;
            if (dp[j] + 1 > dp[i]) { dp[i] = dp[j]+1; cnt[i] = cnt[j]; }
            else if (dp[j] + 1 === dp[i]) cnt[i] += cnt[j];
        }
    const maxLen = Math.max(...dp);
    return dp.reduce((s, d, i) => d === maxLen ? s + cnt[i] : s, 0);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Delete Operation for Two Strings (min deletions = n + m - 2*LCS)',
      url: 'https://leetcode.com/problems/delete-operation-for-two-strings/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Find LCS, then deletions = n + m - 2*LCS',
          explanation: `We need minimum deletions to make both strings equal (= find LCS and delete everything else). Deletions from word1: n - LCS, from word2: m - LCS. Total = n + m - 2*LCS.`,
          code: `var minDistance = function(word1, word2) {
    return word1.length + word2.length - 2 * lcs(word1, word2);
};`,
          lang: 'javascript',
        },
      ],
    },
  ],
}
