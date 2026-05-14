import type { Article } from '../articles'

export const stackQueueArticle: Article = {
  slug: 'stack-queue',
  title: 'Stack & Queue Patterns',
  emoji: '📚',
  tagline: 'LIFO for matching/nesting. FIFO for BFS/order. Deque for sliding extremes.',
  description: 'Stack and queue problems appear in ~20% of interviews. Stack handles matching brackets, expression evaluation, and monotonic patterns. Queue drives BFS. Deque handles sliding window minimum/maximum. Learn which structure fits which signal.',
  gradient: 'from-orange-400 to-red-500',
  topicSlug: 'graph',
  readTime: '18 min',
  sections: [
    {
      type: 'text',
      content: `Stack and queue are the two most fundamental linear data structures after arrays. Stack is LIFO — last in, first out. Queue is FIFO — first in, first out. Most "bracket matching," "expression parsing," "next greater element," and "valid sequence" problems are stack problems. BFS and level-order traversal use queues. Sliding window min/max use a monotonic deque.`,
    },
    {
      type: 'table',
      headers: ['Signal in Problem', 'Structure', 'Pattern'],
      rows: [
        ['"Valid/balanced parentheses"', 'Stack', 'Push open, pop on close, check match'],
        ['"Next greater/smaller element"', 'Monotonic stack', 'Maintain decreasing/increasing stack'],
        ['"Evaluate expression"', 'Stack', 'Operand/operator stacks or postfix eval'],
        ['"Level order / BFS"', 'Queue', 'Enqueue neighbors, process level by level'],
        ['"Sliding window min/max"', 'Monotonic deque', 'Pop from back when new > back (max deque)'],
        ['"Nearest smaller to left/right"', 'Monotonic stack', 'Process left→right, maintain ascending stack'],
        ['"Implement queue using stacks"', 'Two stacks', 'Inbox stack + outbox stack (lazy transfer)'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Stack Pattern: Bracket Matching Template',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Universal bracket matching template',
      code: `// Valid parentheses: push open brackets, pop+check on close brackets
var isValid = function(s) {
    const stack = [];
    const match = { ')': '(', ']': '[', '}': '{' };
    for (const c of s) {
        if ('([{'.includes(c)) stack.push(c);
        else if (stack.pop() !== match[c]) return false;
    }
    return stack.length === 0;
};

// Min add to make valid — count unmatched open/close
var minAddToMakeValid = function(s) {
    let open = 0, close = 0;
    for (const c of s) {
        if (c === '(') open++;
        else if (open > 0) open--;  // matched
        else close++;               // unmatched close
    }
    return open + close;
};`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Monotonic Stack Template',
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'teal',
      content: `**Monotonic stack** stays sorted (increasing or decreasing). When you push a new element, pop everything that violates the order. The popped elements' "answer" is the new element (it was the next greater/smaller for them).\n\n- **Next Greater Element**: maintain decreasing stack (pop when new > top)\n- **Next Smaller Element**: maintain increasing stack (pop when new < top)\n- **Previous Greater**: same idea but process left→right; stack gives you what's "still waiting" to the left`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Next Greater Element — O(n) with monotonic stack',
      code: `// For each element, find the next element to the right that is greater
// Brute force: O(n²). Monotonic stack: O(n)
function nextGreaterElement(nums) {
    const result = new Array(nums.length).fill(-1);
    const stack = [];  // indices of elements waiting for their "next greater"
    for (let i = 0; i < nums.length; i++) {
        // pop all elements smaller than nums[i] — nums[i] is their answer
        while (stack.length && nums[stack.at(-1)] < nums[i]) {
            result[stack.pop()] = nums[i];
        }
        stack.push(i);
    }
    // remaining elements in stack have no next greater → -1 (already set)
    return result;
}

// Circular variant: run two passes (or use modulo)
function nextGreaterCircular(nums) {
    const n = nums.length;
    const result = new Array(n).fill(-1);
    const stack = [];
    for (let i = 0; i < 2 * n; i++) {
        while (stack.length && nums[stack.at(-1)] < nums[i % n])
            result[stack.pop()] = nums[i % n];
        if (i < n) stack.push(i);
    }
    return result;
}`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Monotonic Deque for Sliding Window',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Sliding window maximum — O(n) with deque',
      code: `// For each window of size k, find the maximum
// Brute force: O(n*k). Deque: O(n)
var maxSlidingWindow = function(nums, k) {
    const deque = [];  // stores indices, front = max of current window
    const result = [];
    for (let i = 0; i < nums.length; i++) {
        // remove elements outside window
        while (deque.length && deque[0] < i - k + 1) deque.shift();
        // remove smaller elements from back (they can never be the max)
        while (deque.length && nums[deque.at(-1)] < nums[i]) deque.pop();
        deque.push(i);
        // window is fully formed when i >= k-1
        if (i >= k - 1) result.push(nums[deque[0]]);
    }
    return result;
};`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Valid Parentheses',
      url: 'https://leetcode.com/problems/valid-parentheses/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Stack — push open, pop and check on close',
          explanation: `Push every opening bracket. When we see a closing bracket, the top of stack must be the matching opener. If not, or if stack is empty on close, invalid. At end, stack must be empty.`,
          code: `var isValid = function(s) {
    const stack = [];
    const match = { ')': '(', ']': '[', '}': '{' };
    for (const c of s) {
        if ('([{'.includes(c)) stack.push(c);
        else if (stack.pop() !== match[c]) return false;
    }
    return stack.length === 0;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Min Stack',
      url: 'https://leetcode.com/problems/min-stack/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Two stacks — main + min tracker',
          explanation: `Maintain a second "min stack" that only tracks minimums. When pushing x, push x onto min stack only if x <= current min (or min stack is empty). When popping, pop from min stack only if popped value equals current min.`,
          code: `var MinStack = function() {
    this.stack = [];
    this.minStack = [];
};
MinStack.prototype.push = function(val) {
    this.stack.push(val);
    if (!this.minStack.length || val <= this.minStack.at(-1))
        this.minStack.push(val);
};
MinStack.prototype.pop = function() {
    if (this.stack.pop() === this.minStack.at(-1))
        this.minStack.pop();
};
MinStack.prototype.top = function() { return this.stack.at(-1); };
MinStack.prototype.getMin = function() { return this.minStack.at(-1); };`,
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
          label: 'Intuition 1: O(n²) brute force — scan right for each day',
          explanation: `For each day, scan all future days until finding a warmer one. O(n²) — too slow for n=10^5.`,
        },
        {
          label: 'Intuition 2: Monotonic stack — pop when warmer day found',
          explanation: `Maintain a decreasing stack of day indices. When current temp is warmer than top of stack, that top's answer is (current_index - top_index). Pop and update. This processes each element at most once.`,
          code: `var dailyTemperatures = function(temperatures) {
    const n = temperatures.length;
    const result = new Array(n).fill(0);
    const stack = [];  // indices, temperatures[stack top] is always decreasing
    for (let i = 0; i < n; i++) {
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
      title: 'Next Greater Element I',
      url: 'https://leetcode.com/problems/next-greater-element-i/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Monotonic stack on nums2, then map to nums1',
          explanation: `Process nums2 with a monotonic stack to build a map: element → its next greater element in nums2. Then look up each element of nums1 in that map.`,
          code: `var nextGreaterElement = function(nums1, nums2) {
    const map = new Map();
    const stack = [];
    for (const n of nums2) {
        while (stack.length && stack.at(-1) < n)
            map.set(stack.pop(), n);
        stack.push(n);
    }
    return nums1.map(n => map.get(n) ?? -1);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Largest Rectangle in Histogram',
      url: 'https://leetcode.com/problems/largest-rectangle-in-histogram/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: O(n²) — fix each bar as shortest, expand left and right',
          explanation: `For each bar, it limits the height. Find how far left and right we can extend at that height. O(n) per bar = O(n²) total.`,
        },
        {
          label: 'Intuition 2: Monotonic stack — find left/right boundaries in O(n)',
          explanation: `Maintain an increasing stack of bar indices. When current bar is shorter than stack top, the top is "trapped" — it can't extend right (current is smaller). Its right boundary = current index. Left boundary = new stack top after popping (or 0). Area = height[top] × (right - left - 1).`,
          code: `var largestRectangleArea = function(heights) {
    const stack = [];
    let max = 0;
    heights = [...heights, 0];  // sentinel: force pop all remaining at end
    for (let i = 0; i < heights.length; i++) {
        while (stack.length && heights[stack.at(-1)] > heights[i]) {
            const h = heights[stack.pop()];
            const w = stack.length ? i - stack.at(-1) - 1 : i;
            max = Math.max(max, h * w);
        }
        stack.push(i);
    }
    return max;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 6,
      title: 'Sliding Window Maximum',
      url: 'https://leetcode.com/problems/sliding-window-maximum/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: O(n·k) brute force — scan each window',
          explanation: `For each window of size k, find max by scanning all k elements. O(n·k) — too slow for n=10^5, k=10^4.`,
        },
        {
          label: 'Intuition 2: Monotonic deque — maintain decreasing order, O(n)',
          explanation: `Deque stores indices. Invariant: deque front is always the max of the current window. When adding element i: (1) remove indices out of window from front; (2) remove smaller elements from back (they can never be max while i is in the window). Push i to back. Front of deque = answer for current window.`,
          code: `var maxSlidingWindow = function(nums, k) {
    const deque = [], result = [];
    for (let i = 0; i < nums.length; i++) {
        while (deque.length && deque[0] < i - k + 1) deque.shift();
        while (deque.length && nums[deque.at(-1)] < nums[i]) deque.pop();
        deque.push(i);
        if (i >= k - 1) result.push(nums[deque[0]]);
    }
    return result;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 7,
      title: 'Trapping Rain Water',
      url: 'https://leetcode.com/problems/trapping-rain-water/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: O(n) space — precompute left max and right max arrays',
          explanation: `Water at index i = min(maxLeft[i], maxRight[i]) - height[i]. Precompute maxLeft (max height to the left) and maxRight (max height to the right) in two passes.`,
          code: `var trap = function(height) {
    const n = height.length;
    const left = new Array(n), right = new Array(n);
    left[0] = height[0];
    for (let i = 1; i < n; i++) left[i] = Math.max(left[i-1], height[i]);
    right[n-1] = height[n-1];
    for (let i = n-2; i >= 0; i--) right[i] = Math.max(right[i+1], height[i]);
    let water = 0;
    for (let i = 0; i < n; i++) water += Math.min(left[i], right[i]) - height[i];
    return water;
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: O(1) space — two pointer approach',
          explanation: `Use two pointers (lo, hi). At each step, process the side with the smaller max. If left max < right max, process lo: water trapped at lo = leftMax - height[lo]. Move lo inward. This works because right side guarantees at least rightMax, so leftMax is the actual bottleneck.`,
          code: `var trap = function(height) {
    let lo = 0, hi = height.length - 1, leftMax = 0, rightMax = 0, water = 0;
    while (lo < hi) {
        if (height[lo] < height[hi]) {
            height[lo] >= leftMax ? (leftMax = height[lo]) : (water += leftMax - height[lo]);
            lo++;
        } else {
            height[hi] >= rightMax ? (rightMax = height[hi]) : (water += rightMax - height[hi]);
            hi--;
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
      num: 8,
      title: 'Evaluate Reverse Polish Notation',
      url: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Stack-based evaluation',
          explanation: `Process tokens left to right. If operand (number), push to stack. If operator (+, -, *, /), pop two operands, apply operator, push result. Final answer is the single remaining element.`,
          code: `var evalRPN = function(tokens) {
    const stack = [];
    const ops = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => Math.trunc(a / b)  // truncate toward zero
    };
    for (const t of tokens) {
        if (ops[t]) {
            const b = stack.pop(), a = stack.pop();
            stack.push(ops[t](a, b));
        } else {
            stack.push(Number(t));
        }
    }
    return stack[0];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 9,
      title: 'Decode String',
      url: 'https://leetcode.com/problems/decode-string/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Stack — push (count, partial_string) on each [',
          explanation: `When we see a digit, build the count number. When we see '[', push (currentCount, currentString) to stack and reset both. When we see ']', pop (prevCount, prevString) and set current = prevString + currentString.repeat(prevCount). At end, currentString is the answer.`,
          code: `var decodeString = function(s) {
    const stack = [];
    let current = '', k = 0;
    for (const c of s) {
        if (c >= '0' && c <= '9') {
            k = k * 10 + Number(c);
        } else if (c === '[') {
            stack.push([current, k]);
            current = ''; k = 0;
        } else if (c === ']') {
            const [prev, count] = stack.pop();
            current = prev + current.repeat(count);
        } else {
            current += c;
        }
    }
    return current;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧠',
      color: 'green',
      content: `**Stack pattern decision guide:**\n- "Matching pairs (brackets, tags)" → push open, pop+check on close\n- "Next greater/smaller" → monotonic stack, pop when condition breaks\n- "Largest rectangle / area under histogram" → monotonic stack with area calculation on pop\n- "Expression evaluation" → two stacks (numbers + operators) or postfix evaluation\n- "Sliding window max/min" → monotonic deque (front = answer, pop from back when new element is better)\n- "Nested structure (decode string, mini interpreter)" → stack saves state at each nesting level`,
    },
  ],
}
