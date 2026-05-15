import type { Article } from '../articles'

export const monotonicQueueArticle: Article = {
  slug: 'monotonic-queue',
  title: 'Monotonic Queue',
  emoji: '🪟',
  tagline: 'Sliding window max/min in O(1). Deque keeps candidates in sorted order.',
  description: 'A monotonic queue (deque) solves sliding window maximum/minimum in O(n) total. The deque stores indices in decreasing (for max) or increasing (for min) order of values — elements that can never be the answer are evicted immediately. Extends to DP optimization when transitions look like "max/min over a window of previous states."',
  gradient: 'from-amber-500 to-orange-600',
  topicSlug: 'dp',
  readTime: '15 min',
  sections: [
    {
      type: 'text',
      content: `A monotonic deque answers "what is the maximum in the last k elements?" for every position in O(1) amortized time. The key invariant: the deque holds indices of elements that are candidates to be the current window's answer. Elements that are both older AND smaller than a newly added element can never win — so we evict them from the back. Expired elements (outside window) are evicted from the front.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Monotonic deque template — sliding window maximum',
      code: `// Sliding window maximum: for every window of size k, find max
// Deque holds indices in DECREASING order of values
function slidingWindowMax(nums, k) {
    const deque = []; // indices, front = largest, back = smallest in window
    const result = [];
    for (let i = 0; i < nums.length; i++) {
        // 1. Evict elements outside window from front
        while (deque.length && deque[0] <= i - k) deque.shift();
        // 2. Maintain decreasing order: pop smaller elements from back
        while (deque.length && nums[deque.at(-1)] <= nums[i]) deque.pop();
        // 3. Add current index
        deque.push(i);
        // 4. Window is full — record answer
        if (i >= k - 1) result.push(nums[deque[0]]);
    }
    return result;
}

// For MINIMUM: flip the comparison in step 2 to >=
// while (deque.length && nums[deque.at(-1)] >= nums[i]) deque.pop();`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Sliding Window Maximum',
      url: 'https://leetcode.com/problems/sliding-window-maximum/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Brute force — O(nk)',
          explanation: `For each window position, scan all k elements to find max. Simple but too slow for large inputs.`,
          code: `var maxSlidingWindow = function(nums, k) {
    const res=[];
    for(let i=0;i<=nums.length-k;i++){
        let max=nums[i];
        for(let j=i;j<i+k;j++) max=Math.max(max,nums[j]);
        res.push(max);
    }
    return res;
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Monotonic deque — O(n)',
          explanation: `Deque stores indices in decreasing value order. Front always holds current window max. New element evicts all smaller elements from back (they can never be max while current element is in window). Front elements outside window are evicted.`,
          code: `var maxSlidingWindow = function(nums, k) {
    const dq=[],res=[];
    for(let i=0;i<nums.length;i++){
        while(dq.length&&dq[0]<=i-k) dq.shift();
        while(dq.length&&nums[dq.at(-1)]<=nums[i]) dq.pop();
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
      num: 2,
      title: 'Jump Game VI',
      url: 'https://leetcode.com/problems/jump-game-vi/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DP + monotonic deque for window max',
          explanation: `dp[i] = max score to reach index i. dp[i] = nums[i] + max(dp[j]) for j in [i-k, i-1]. Naively O(nk). Use monotonic deque to track max dp value in window of size k — reduces to O(n).`,
          code: `var maxResult = function(nums, k) {
    const n=nums.length, dp=new Array(n).fill(0);
    const dq=[]; // indices, decreasing dp values
    dp[0]=nums[0]; dq.push(0);
    for(let i=1;i<n;i++){
        while(dq.length&&dq[0]<i-k) dq.shift();
        dp[i]=nums[i]+dp[dq[0]];
        while(dq.length&&dp[dq.at(-1)]<=dp[i]) dq.pop();
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
      num: 3,
      title: 'Longest Continuous Subarray With Absolute Diff ≤ Limit',
      url: 'https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Two deques (max and min) + sliding window',
          explanation: `Maintain two deques: one for window max, one for window min. Condition: max - min ≤ limit. If violated, shrink window from left. Answer = max window size seen.`,
          code: `var longestSubarray = function(nums, limit) {
    const maxDq=[],minDq=[];
    let l=0,res=0;
    for(let r=0;r<nums.length;r++){
        while(maxDq.length&&nums[maxDq.at(-1)]<=nums[r]) maxDq.pop();
        while(minDq.length&&nums[minDq.at(-1)]>=nums[r]) minDq.pop();
        maxDq.push(r); minDq.push(r);
        while(nums[maxDq[0]]-nums[minDq[0]]>limit){
            l++;
            if(maxDq[0]<l) maxDq.shift();
            if(minDq[0]<l) minDq.shift();
        }
        res=Math.max(res,r-l+1);
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
      title: 'Constrained Subsequence Sum',
      url: 'https://leetcode.com/problems/constrained-subsequence-sum/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: DP + monotonic deque for max over k-window',
          explanation: `dp[i] = max subarray sum ending at i with jumps ≤ k. dp[i] = nums[i] + max(0, max(dp[j]) for j in [i-k, i-1]). Use deque to track max dp in last k positions — only keep positive dp values worth extending.`,
          code: `var constrainedSubsetSum = function(nums, k) {
    const n=nums.length, dp=[...nums];
    const dq=[]; // indices with decreasing dp value, max at front
    let res=nums[0];
    dq.push(0);
    for(let i=1;i<n;i++){
        while(dq.length&&dq[0]<i-k) dq.shift();
        if(dp[dq[0]]>0) dp[i]+=dp[dq[0]];
        while(dq.length&&dp[dq.at(-1)]<=dp[i]) dq.pop();
        dq.push(i);
        res=Math.max(res,dp[i]);
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Shortest Subarray with Sum at Least K',
      url: 'https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Prefix sums + monotonic deque',
          explanation: `Build prefix sum array. For each right index r, find smallest l such that prefix[r] - prefix[l] >= k. We want the LARGEST prefix[l] ≤ prefix[r] - k, and smallest (r - l). Use a monotonic increasing deque of prefix sum indices. For each r, pop from front while prefix[r] - prefix[dq[0]] >= k, recording length.`,
          code: `var shortestSubarray = function(nums, k) {
    const n=nums.length;
    const pre=new Array(n+1).fill(0);
    for(let i=0;i<n;i++) pre[i+1]=pre[i]+nums[i];
    const dq=[]; // indices of prefix sums, increasing values
    let res=Infinity;
    for(let i=0;i<=n;i++){
        while(dq.length&&pre[i]-pre[dq[0]]>=k){
            res=Math.min(res,i-dq.shift());
        }
        while(dq.length&&pre[dq.at(-1)]>=pre[i]) dq.pop();
        dq.push(i);
    }
    return res===Infinity?-1:res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 6,
      title: 'Max Value of Equation',
      url: 'https://leetcode.com/problems/max-value-of-equation/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Rewrite as window max + deque',
          explanation: `yi + yj + |xi - xj| where xj - xi ≤ k (j > i). Since j > i: yi + yj + xj - xi = (yj + xj) + (yi - xi). For each j, maximize (yi - xi) over all i where xj - xi ≤ k. This is a sliding window max of (y - x) values, with window controlled by x distance. Use deque ordered by (y - x) values.`,
          code: `var findMaxValueOfEquation = function(points, k) {
    const dq=[]; // indices, decreasing (y-x) values
    let res=-Infinity;
    for(const [x,y] of points){
        while(dq.length&&x-dq[0][0]>k) dq.shift();
        if(dq.length) res=Math.max(res,y+x+dq[0][1]-dq[0][0]);
        while(dq.length&&dq.at(-1)[1]-dq.at(-1)[0]<=y-x) dq.pop();
        dq.push([x,y]);
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🪟',
      color: 'amber',
      content: `**Monotonic deque vs monotonic stack:**\n- Stack: single end, used for "next greater/smaller element"\n- Deque: both ends, used for "window max/min" (evict old from front, maintain order from back)\n\n**Pattern recognition:**\n- "Sliding window max/min" → deque, O(n)\n- "DP where dp[i] = f(max dp[j]) for j in window" → deque DP optimization\n- Two deques (one max, one min) → control window by range constraint\n\n**Implementation:** Use array as deque: push/pop from back, shift from front (or pointer-based for O(1) shift).`,
    },
  ],
}
