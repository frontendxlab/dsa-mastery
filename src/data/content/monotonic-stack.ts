import type { Article } from '../articles'

export const monotonicStackArticle: Article = {
  slug: 'monotonic-stack',
  title: 'Monotonic Stack & Queue',
  emoji: '📚',
  tagline: 'Next greater element in O(n). Sliding window max in O(n).',
  description: 'A monotonic stack processes each element in O(1) amortized by maintaining a stack in sorted order. It\'s the key to Next Greater Element, Largest Rectangle in Histogram, Trapping Rain Water, and sliding window maximum.',
  gradient: 'from-orange-400 to-red-500',
  topicSlug: 'string',
  readTime: '15 min',
  sections: [
    {
      type: 'text',
      content: `A monotonic stack keeps elements in either increasing or decreasing order. When a new element violates the monotonic property, you pop elements until it doesn't — and those pops are when you compute answers. Since each element is pushed and popped at most once, the total work is O(n).`,
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'teal',
      content: `**Which direction?**\n- **Monotonic decreasing** (stack top is largest): use for "next greater element" — pop when current is greater than top\n- **Monotonic increasing** (stack top is smallest): use for "next smaller element" — pop when current is smaller than top\n\nThe element that triggers a pop IS the answer for the popped element.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Next Greater Element template',
      code: `// For each element, find the next element to the right that is strictly greater.
function nextGreaterElement(nums) {
    const result = new Array(nums.length).fill(-1);
    const stack = [];  // stores indices, not values
    for (let i = 0; i < nums.length; i++) {
        // Pop all elements smaller than current — current is their "next greater"
        while (stack.length && nums[stack.at(-1)] < nums[i]) {
            result[stack.pop()] = nums[i];
        }
        stack.push(i);
    }
    return result;
    // remaining in stack have no next greater → result stays -1
}`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Sliding Window Maximum (Monotonic Deque) — O(n)',
      code: `// Maintain a deque of indices in decreasing order of nums[].
// Front of deque = index of max in current window.
function maxSlidingWindow(nums, k) {
    const dq = [];  // indices, front has current window max
    const result = [];
    for (let i = 0; i < nums.length; i++) {
        // Remove indices out of window
        while (dq.length && dq[0] < i - k + 1) dq.shift();
        // Remove smaller elements from back (they can never be max while current exists)
        while (dq.length && nums[dq.at(-1)] < nums[i]) dq.pop();
        dq.push(i);
        if (i >= k - 1) result.push(nums[dq[0]]);
    }
    return result;
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
      title: 'Largest Rectangle in Histogram',
      url: 'https://leetcode.com/problems/largest-rectangle-in-histogram/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: For each bar, extend left and right until shorter bar',
          explanation: `For each bar as height, find the widest rectangle it can form. Extend left until a shorter bar, extend right until a shorter bar. Naive O(n²).`,
        },
        {
          label: 'Intuition 2: Monotonic increasing stack — O(n)',
          explanation: `Maintain a monotonic increasing stack. When we encounter a bar shorter than the stack top, we can compute the rectangle for the popped bar:\n- Height = popped bar's height\n- Width = current index - (new stack top index + 1) — extends from the left edge to current position\n\nAdd sentinel bar of height 0 at both ends to flush the stack cleanly.`,
          code: `var largestRectangleArea = function(heights) {
    const bars = [0, ...heights, 0];  // sentinels
    const stack = [0];
    let maxArea = 0;
    for (let i = 1; i < bars.length; i++) {
        while (bars[stack.at(-1)] > bars[i]) {
            const height = bars[stack.pop()];
            const width = i - stack.at(-1) - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        stack.push(i);
    }
    return maxArea;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Trapping Rain Water',
      url: 'https://leetcode.com/problems/trapping-rain-water/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Precompute left max and right max — O(n) time O(n) space',
          explanation: `Water at index i = min(maxLeft[i], maxRight[i]) - height[i]. Precompute max height seen from left and from right in two passes.`,
          code: `var trap = function(height) {
    const n = height.length;
    const left = new Array(n).fill(0), right = new Array(n).fill(0);
    for (let i = 1; i < n; i++) left[i] = Math.max(left[i-1], height[i-1]);
    for (let i = n-2; i >= 0; i--) right[i] = Math.max(right[i+1], height[i+1]);
    return height.reduce((sum, h, i) => sum + Math.max(0, Math.min(left[i], right[i]) - h), 0);
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Two pointers — O(n) time O(1) space',
          explanation: `Use two pointers l and r. The side with the smaller height determines the water level (limited by the shorter wall). Move the shorter side inward, computing water as we go.`,
          code: `var trap = function(height) {
    let l = 0, r = height.length - 1, lMax = 0, rMax = 0, water = 0;
    while (l < r) {
        if (height[l] < height[r]) {
            height[l] >= lMax ? lMax = height[l] : water += lMax - height[l];
            l++;
        } else {
            height[r] >= rMax ? rMax = height[r] : water += rMax - height[r];
            r--;
        }
    }
    return water;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Daily Temperatures',
      url: 'https://leetcode.com/problems/daily-temperatures/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Monotonic decreasing stack',
          explanation: `Classic next-greater-element. Stack stores indices of temperatures not yet answered. When current temperature is higher than stack top, that day's answer is (current index - top index).`,
          code: `var dailyTemperatures = function(temperatures) {
    const result = new Array(temperatures.length).fill(0);
    const stack = [];
    for (let i = 0; i < temperatures.length; i++) {
        while (stack.length && temperatures[stack.at(-1)] < temperatures[i]) {
            const j = stack.pop();
            result[j] = i - j;
        }
        stack.push(i);
    }
    return result;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Sum of Subarray Minimums',
      url: 'https://leetcode.com/problems/sum-of-subarray-minimums/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: For each element, count subarrays where it\'s the minimum',
          explanation: `For element arr[i], find:\n- left[i] = number of consecutive elements to the left that are ≥ arr[i] (including i itself)\n- right[i] = number of consecutive elements to the right that are > arr[i] (including i itself)\n\nContribution = arr[i] × left[i] × right[i]\n\nUse monotonic stack twice (or once with a clever approach) to compute left[] and right[]. Use strict inequality on one side (> vs ≥) to handle duplicates.`,
          code: `var sumSubarrayMins = function(arr) {
    const MOD = 1_000_000_007n;
    const n = arr.length;
    const left = new Array(n), right = new Array(n);
    const stack = [];

    // Previous less element (strict <)
    for (let i = 0; i < n; i++) {
        while (stack.length && arr[stack.at(-1)] >= arr[i]) stack.pop();
        left[i] = stack.length ? i - stack.at(-1) : i + 1;
        stack.push(i);
    }
    stack.length = 0;
    // Next less or equal element
    for (let i = n-1; i >= 0; i--) {
        while (stack.length && arr[stack.at(-1)] > arr[i]) stack.pop();
        right[i] = stack.length ? stack.at(-1) - i : n - i;
        stack.push(i);
    }

    let ans = 0n;
    for (let i = 0; i < n; i++)
        ans = (ans + BigInt(arr[i]) * BigInt(left[i]) * BigInt(right[i])) % MOD;
    return Number(ans);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'More Worked Problems',
    },
    {
      type: 'problem',
      num: 5,
      title: 'Daily Temperatures',
      url: 'https://leetcode.com/problems/daily-temperatures/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: O(n²) brute force — for each day, scan right for warmer day',
          explanation: 'For each day i, iterate j from i+1. First j where temperatures[j] > temperatures[i] is the answer. O(n²).',
        },
        {
          label: 'Intuition 2: O(n) monotonic stack — indices in decreasing temperature order',
          explanation: 'Maintain a stack of indices with decreasing temperatures. When we hit a day warmer than the stack top, the stack top found its answer. Pop and record distance.',
          code: `var dailyTemperatures = function(temps) {
    const n = temps.length, ans = new Array(n).fill(0);
    const stack = []; // indices, decreasing temps
    for (let i = 0; i < n; i++) {
        while (stack.length && temps[stack.at(-1)] < temps[i]) {
            const j = stack.pop();
            ans[j] = i - j; // days until warmer
        }
        stack.push(i);
    }
    return ans;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 6,
      title: 'Largest Rectangle in Histogram',
      url: 'https://leetcode.com/problems/largest-rectangle-in-histogram/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: O(n²) brute force — for each bar, extend left and right',
          explanation: 'For each bar as the minimum height, find how far left and right it extends. Width = leftBoundary to rightBoundary. Area = height × width. O(n²).',
        },
        {
          label: 'Intuition 2: O(n) monotonic stack — find previous/next smaller bar',
          explanation: 'For each bar i, the maximum rectangle using bar[i] as height extends from (previous smaller bar + 1) to (next smaller bar - 1). Use stack to find these boundaries in O(n) total.',
          code: `var largestRectangleArea = function(heights) {
    const n = heights.length;
    heights = [0, ...heights, 0]; // sentinel 0s on both ends
    const stack = [0]; // indices
    let maxArea = 0;
    for (let i = 1; i < heights.length; i++) {
        while (heights[stack.at(-1)] > heights[i]) {
            const h = heights[stack.pop()];
            const w = i - stack.at(-1) - 1; // width between current boundaries
            maxArea = Math.max(maxArea, h * w);
        }
        stack.push(i);
    }
    return maxArea;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧠',
      color: 'teal',
      content: `**Monotonic stack direction guide:**\n- Decreasing stack → pop when GREATER element arrives → finds "next greater"\n- Increasing stack → pop when SMALLER element arrives → finds "next smaller"\n- Process right→left instead for "previous greater/smaller"\n- Histogram / contribution: use both sides (left stack + right stack)`,
    },
  ],
}
