import type { Article } from '../articles'

export const dpWithDequeArticle: Article = {
  slug: 'dp-with-deque',
  title: 'DP Optimized with Deque',
  emoji: '🚀',
  tagline: 'Sliding window DP: O(n²) → O(n). Deque maintains useful transitions.',
  description: 'Many O(n²) DP recurrences have the form dp[i] = min/max over j in [i-k..i-1] of (dp[j] + cost(j,i)). When only the range of j matters (not the specific index), use a monotonic deque to maintain the optimal j efficiently. Deque front = best j; pop front when out of window; pop back when current is better. Classic applications: jump game with window, maximize sum with constraint on window.',
  gradient: 'from-blue-700 to-indigo-800',
  topicSlug: 'dp',
  readTime: '13 min',
  sections: [
    {
      type: 'text',
      content: `Sliding window DP pattern: dp[i] depends on dp[j] for j in some window [i-k, i-1]. Use a deque storing indices in the window. Deque is monotonic: front holds the optimal (min/max) j. When computing dp[i]: remove indices out of window from front; dp[i] = dp[deque.front] + cost; remove indices from back that are worse than i-1 for future i. Total: O(n).`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Sliding window DP template with deque',
      code: `// dp[i] = max dp[j] + val[i] for j in [i-k, i-1]
// Deque stores indices in window, front = index with max dp value
function slidingWindowDP(val, k) {
    const n = val.length;
    const dp = new Array(n).fill(0);
    const deque = []; // indices, front = best (max dp)

    for (let i = 0; i < n; i++) {
        // Remove indices out of window [i-k, i-1]
        while (deque.length && deque[0] < i - k) deque.shift();

        // dp[i] = max dp[j] + val[i] for j in window
        if (deque.length) dp[i] = dp[deque[0]] + val[i];
        else dp[i] = val[i]; // no valid j

        // Maintain monotonic deque: remove back if dp[back] <= dp[i]
        // (i will be a better choice than those for future positions)
        while (deque.length && dp[deque[deque.length-1]] <= dp[i])
            deque.pop();
        deque.push(i);
    }
    return Math.max(...dp);
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
      title: 'Jump Game VI',
      url: 'https://leetcode.com/problems/jump-game-vi/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DP + monotonic deque for sliding window max',
          explanation: `dp[i] = max score to reach index i. dp[i] = nums[i] + max(dp[i-k..i-1]). Maintain deque of indices with decreasing dp values. Front = max dp in window.`,
          code: `var maxResult = function(nums, k) {
    const n=nums.length;
    const dp=new Array(n).fill(0); dp[0]=nums[0];
    const dq=[0]; // monotonic deque of indices
    for(let i=1;i<n;i++){
        while(dq[0]<i-k) dq.shift();
        dp[i]=dp[dq[0]]+nums[i];
        while(dq.length&&dp[dq[dq.length-1]]<=dp[i]) dq.pop();
        dq.push(i);
    }
    return dp[n-1];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Constrained Subsequence Sum',
      url: 'https://leetcode.com/problems/constrained-subsequence-sum/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: DP + monotonic deque — same pattern as Jump Game VI',
          explanation: `dp[i] = max subseq sum ending at i where adjacent chosen elements are at most k apart. dp[i] = nums[i] + max(0, max dp[i-k..i-1]). Deque front = max dp in window. Don't take negative: use max(0, dp[front]).`,
          code: `var constrainedSubsetSum = function(nums, k) {
    const n=nums.length;
    const dp=new Array(n).fill(0);
    const dq=[];
    let res=-Infinity;
    for(let i=0;i<n;i++){
        while(dq.length&&dq[0]<i-k) dq.shift();
        dp[i]=nums[i]+(dq.length?Math.max(0,dp[dq[0]]):0);
        res=Math.max(res,dp[i]);
        while(dq.length&&dp[dq[dq.length-1]]<=dp[i]) dq.pop();
        dq.push(i);
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
      title: 'Sliding Window Maximum',
      url: 'https://leetcode.com/problems/sliding-window-maximum/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Monotonic deque — maintain decreasing order, front = window max',
          explanation: `Deque stores indices with decreasing nums values. For each i: remove indices out of window from front. Current max = nums[deque.front]. Remove from back any index with nums[back] <= nums[i]. Push i.`,
          code: `var maxSlidingWindow = function(nums, k) {
    const dq=[], res=[];
    for(let i=0;i<nums.length;i++){
        while(dq.length&&dq[0]<i-k+1) dq.shift();
        while(dq.length&&nums[dq[dq.length-1]]<=nums[i]) dq.pop();
        dq.push(i);
        if(i>=k-1) res.push(nums[dq[0]]);
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Longest Subarray of 1\'s After Deleting One Element',
      url: 'https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Sliding window with at most one 0',
          explanation: `Maintain window with at most one 0. Track count of zeros in window. When zeros > 1, shrink from left. Answer = window size - 1 (delete the one allowed element).`,
          code: `var longestSubarray = function(nums) {
    let l=0,zeros=0,res=0;
    for(let r=0;r<nums.length;r++){
        if(nums[r]===0) zeros++;
        while(zeros>1){if(nums[l++]===0) zeros--;}
        res=Math.max(res,r-l); // r-l not r-l+1 because we delete one element
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🚀',
      color: 'blue',
      content: `**Deque DP optimization checklist:**\n1. DP has form: dp[i] = min/max over j in window of (dp[j] + cost)\n2. Window slides as i increases (old j's become invalid)\n3. Deque maintains candidates with decreasing dp (for max) or increasing dp (for min)\n4. Front of deque = optimal j; pop front when j < i-k\n5. Pop back when new j is at least as good as back (monotone property)\n\n**Complexity:** O(n) — each index pushed and popped from deque at most once.\n\n**Relation to convex hull trick:** When cost(j,i) = linear function of j and i, use CHT or Li Chao tree instead. Deque works for window-only constraints.`,
    },
  ],
}
