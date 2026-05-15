import type { Article } from '../articles'

export const prefixSumArticle: Article = {
  slug: 'prefix-sum',
  title: 'Prefix Sum & Difference Array',
  emoji: '∑',
  tagline: 'Precompute prefix sums. Any range query becomes O(1).',
  description: 'Prefix sums answer range queries in O(1) after O(n) preprocessing. Difference arrays do range updates in O(1). Together they solve most subarray/interval problems that sliding window can\'t handle (negatives, non-contiguous constraints).',
  gradient: 'from-lime-400 to-green-500',
  topicSlug: 'dp',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `Prefix sum is the most underused O(1) trick in competitive programming. Build it once in O(n), then answer any "sum of nums[i..j]" in O(1). The difference array is the inverse: instead of querying, it does range updates in O(1). Together they handle range sum queries, 2D queries, and interval coverage problems that nested loops would solve in O(n²).`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Prefix Sum — Range Query in O(1)',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: '1D prefix sum template',
      code: `// Build: O(n)
const prefix = new Array(n + 1).fill(0);
for (let i = 0; i < n; i++) prefix[i+1] = prefix[i] + nums[i];

// Query sum of nums[l..r] (0-indexed, inclusive): O(1)
const rangeSum = (l, r) => prefix[r+1] - prefix[l];

// Common usage: check if subarray sum === target
// sum(l..r) = target → prefix[r+1] - prefix[l] = target → prefix[l] = prefix[r+1] - target
// So: track seen prefix sums in a hashmap!
const countSubarraysWithSum = (nums, target) => {
    const prefix = new Map([[0, 1]]); // prefix sum 0 seen once (before start)
    let count = 0, sum = 0;
    for (const n of nums) {
        sum += n;
        count += (prefix.get(sum - target) ?? 0);
        prefix.set(sum, (prefix.get(sum) ?? 0) + 1);
    }
    return count;
};`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Prefix Sum + Hashmap (the two-sum pattern)',
    },
    {
      type: 'callout',
      icon: '🔑',
      color: 'teal',
      content: `**Key insight for "count subarrays with sum = k":**\nsum(l..r) = k means prefix[r] - prefix[l-1] = k, i.e., prefix[l-1] = prefix[r] - k.\n\nFor each position r, look up how many past prefix sums equal prefix[r] - k.\nSame pattern as two-sum: use a hashmap to count occurrences.\n\nWhy this beats sliding window: works with NEGATIVE numbers (sliding window requires all-positive for monotonicity).`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Difference Array — Range Updates in O(1)',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Difference array — O(1) updates, O(n) to reconstruct',
      code: `// Add delta to all nums[l..r] in O(1)
const diff = new Array(n + 1).fill(0);
const rangeAdd = (l, r, delta) => {
    diff[l] += delta;
    diff[r + 1] -= delta;  // stop adding after r
};

// Reconstruct original array after all updates: O(n)
const result = new Array(n).fill(0);
let running = 0;
for (let i = 0; i < n; i++) {
    running += diff[i];
    result[i] = running;
}

// Use case: "apply k range updates, then query each element"
// Without diff array: O(k·n). With diff array: O(k + n).`,
    },
    {
      type: 'heading',
      level: 2,
      text: '2D Prefix Sum',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: '2D prefix sum — O(1) rectangle sum query',
      code: `// Build: prefix[i][j] = sum of rectangle (0,0) to (i-1,j-1)
const buildPrefix2D = (matrix) => {
    const m = matrix.length, n = matrix[0].length;
    const p = Array.from({length:m+1}, () => new Array(n+1).fill(0));
    for (let i = 1; i <= m; i++)
        for (let j = 1; j <= n; j++)
            p[i][j] = matrix[i-1][j-1] + p[i-1][j] + p[i][j-1] - p[i-1][j-1];
    return p;
};

// Query sum of rectangle (r1,c1) to (r2,c2) — 0-indexed: O(1)
const query2D = (p, r1, c1, r2, c2) =>
    p[r2+1][c2+1] - p[r1][c2+1] - p[r2+1][c1] + p[r1][c1];`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Subarray Sum Equals K',
      url: 'https://leetcode.com/problems/subarray-sum-equals-k/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: O(n²) brute force — check every subarray',
          explanation: 'Two nested loops: for each (i, j), compute sum(i..j). Can be optimized to O(n²) by keeping running sum, but still quadratic.',
        },
        {
          label: 'Intuition 2: O(n) prefix sum + hashmap',
          explanation: 'sum(i..j) = k means prefix[j] - prefix[i-1] = k. For each j, check how many previous i-1 had prefix[i-1] = prefix[j] - k. Track prefix sum frequency in a map.',
          code: `var subarraySum = function(nums, k) {
    const map = new Map([[0, 1]]); // prefix sum 0 seen once
    let sum = 0, count = 0;
    for (const n of nums) {
        sum += n;
        count += (map.get(sum - k) ?? 0); // how many past prefixes = sum - k
        map.set(sum, (map.get(sum) ?? 0) + 1);
    }
    return count;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Range Sum Query 2D - Immutable',
      url: 'https://leetcode.com/problems/range-sum-query-2d-immutable/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: O(m·n) per query — recompute each time',
          explanation: 'For each query, sum all elements in the rectangle. Too slow for many queries.',
        },
        {
          label: 'Intuition 2: O(1) per query after O(m·n) preprocessing',
          explanation: 'Build 2D prefix sum. Each rectangle query = 4 prefix sum lookups using inclusion-exclusion.',
          code: `class NumMatrix {
    constructor(matrix) {
        const m=matrix.length, n=matrix[0].length;
        this.p=Array.from({length:m+1},()=>new Array(n+1).fill(0));
        for(let i=1;i<=m;i++)
            for(let j=1;j<=n;j++)
                this.p[i][j]=matrix[i-1][j-1]+this.p[i-1][j]+this.p[i][j-1]-this.p[i-1][j-1];
    }
    sumRegion(r1,c1,r2,c2){
        return this.p[r2+1][c2+1]-this.p[r1][c2+1]-this.p[r2+1][c1]+this.p[r1][c1];
    }
}`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Continuous Subarray Sum (multiple of k)',
      url: 'https://leetcode.com/problems/continuous-subarray-sum/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: O(n²) — check all subarrays of length >= 2',
          explanation: 'For each pair (i, j) with j-i >= 1, compute sum and check if divisible by k.',
        },
        {
          label: 'Intuition 2: O(n) prefix sum mod k',
          explanation: 'sum(i..j) divisible by k ↔ prefix[j] mod k === prefix[i-1] mod k. Store first seen index for each mod value. If same mod seen with gap >= 2, return true.',
          code: `var checkSubarraySum = function(nums, k) {
    const seen = new Map([[0, -1]]); // mod 0 seen at index -1 (before start)
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
        sum = (sum + nums[i]) % k;
        if (seen.has(sum)) {
            if (i - seen.get(sum) >= 2) return true; // length >= 2
        } else {
            seen.set(sum, i); // store first occurrence only
        }
    }
    return false;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Car Pooling',
      url: 'https://leetcode.com/problems/car-pooling/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Difference array — range updates for passenger boarding/alighting',
          explanation: 'Each trip adds passengers at from, removes them at to. Build difference array: diff[from] += numPassengers, diff[to] -= numPassengers. Reconstruct and check if any position exceeds capacity.',
          code: `var carPooling = function(trips, capacity) {
    const diff = new Array(1001).fill(0); // max stop = 1000
    for (const [num, from, to] of trips) {
        diff[from] += num;
        diff[to] -= num; // passengers exit AT 'to' so subtract there
    }
    let passengers = 0;
    for (const delta of diff) {
        passengers += delta;
        if (passengers > capacity) return false;
    }
    return true;
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
      title: 'Number of Ways to Split Array',
      url: 'https://leetcode.com/problems/number-of-ways-to-split-array/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Prefix sum — check left vs right sum at each split point',
          explanation: `A valid split at index i means prefix[i+1] >= suffix sum from i+1. Precompute total sum. Left sum = prefix[i+1]. Right sum = total - left. If leftSum >= rightSum, count it.`,
          code: `var waysToSplitArray = function(nums) {
    const total = nums.reduce((a,b)=>a+b, 0);
    let leftSum = 0, count = 0;
    for (let i = 0; i < nums.length - 1; i++) {
        leftSum += nums[i];
        if (leftSum >= total - leftSum) count++;
    }
    return count;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 6,
      title: 'Product of Array Except Self',
      url: 'https://leetcode.com/problems/product-of-array-except-self/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: O(n) space — left prefix product × right suffix product',
          explanation: `For each index i, answer = (product of all elements left of i) × (product of all elements right of i). Build left-prefix array and right-suffix array, multiply element-wise.`,
        },
        {
          label: 'Intuition 2: O(1) space — accumulate right product on the fly',
          explanation: `First pass: fill result with left prefix products. Second pass: multiply in right suffix products using a running variable (no extra array needed).`,
          code: `var productExceptSelf = function(nums) {
    const n = nums.length, result = new Array(n).fill(1);
    // Pass 1: result[i] = product of nums[0..i-1]
    for (let i = 1; i < n; i++) result[i] = result[i-1] * nums[i-1];
    // Pass 2: multiply by product of nums[i+1..n-1]
    let right = 1;
    for (let i = n-1; i >= 0; i--) {
        result[i] *= right;
        right *= nums[i];
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
      title: 'Minimum Size Subarray Sum',
      url: 'https://leetcode.com/problems/minimum-size-subarray-sum/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Sliding window (all positive) — O(n)',
          explanation: `Since all values positive, sliding window works. Expand right pointer. When sum ≥ target, shrink from left while sum stays ≥ target. Track minimum window size.`,
          code: `var minSubArrayLen = function(target, nums) {
    let lo = 0, sum = 0, min = Infinity;
    for (let hi = 0; hi < nums.length; hi++) {
        sum += nums[hi];
        while (sum >= target) {
            min = Math.min(min, hi - lo + 1);
            sum -= nums[lo++];
        }
    }
    return min === Infinity ? 0 : min;
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Prefix sum + binary search — O(n log n)',
          explanation: `Build prefix sums. For each start index i, binary search for the smallest j where prefix[j] - prefix[i] >= target. O(n log n) — useful when values could be negative.`,
          code: `var minSubArrayLen = function(target, nums) {
    const prefix = [0];
    for (const n of nums) prefix.push(prefix.at(-1) + n);
    let min = Infinity;
    for (let i = 0; i < nums.length; i++) {
        // find smallest j > i where prefix[j] >= prefix[i] + target
        let lo = i+1, hi = nums.length;
        while (lo < hi) {
            const mid = (lo+hi)>>1;
            prefix[mid] >= prefix[i]+target ? hi=mid : lo=mid+1;
        }
        if (lo <= nums.length) min = Math.min(min, lo-i);
    }
    return min === Infinity ? 0 : min;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 8,
      title: 'Count Number of Bad Pairs',
      url: 'https://leetcode.com/problems/count-number-of-bad-pairs/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Count good pairs, subtract from total',
          explanation: `Bad pair: j - i ≠ nums[j] - nums[i], equivalently: nums[i] - i ≠ nums[j] - j. So good pairs = pairs where nums[i]-i === nums[j]-j. Use a hashmap to count occurrences of each (nums[i]-i) value. Good pairs = sum of C(count, 2) for each group. Bad = total - good.`,
          code: `var countBadPairs = function(nums) {
    const n = nums.length;
    const total = BigInt(n) * BigInt(n-1) / 2n;
    const freq = new Map();
    for (let i = 0; i < n; i++) {
        const key = nums[i] - i;
        freq.set(key, (freq.get(key) ?? 0) + 1);
    }
    let good = 0n;
    for (const c of freq.values()) good += BigInt(c) * BigInt(c-1) / 2n;
    return Number(total - good);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧠',
      color: 'green',
      content: `**Prefix sum checklist:**\n- "Sum of subarray" → prefix[r+1] - prefix[l]\n- "Count subarrays with sum = k" → prefix map (two-sum trick)\n- "Subarray sum divisible by k" → prefix mod k (two-sum trick with modulo)\n- "Range updates + query each element" → difference array\n- "2D rectangle sum" → 2D prefix sum with inclusion-exclusion\n- Input has negatives → sliding window fails → use prefix sum + hashmap\n- "Product except self" → prefix product + suffix product (same idea, multiplication)`,
    },
  ],
}
