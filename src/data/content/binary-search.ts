import type { Article } from '../articles'

export const binarySearchArticle: Article = {
  slug: 'binary-search',
  title: 'Binary Search',
  emoji: '🔍',
  tagline: 'Eliminate half the search space every step.',
  description: 'Binary search is not just for sorted arrays. The real insight is "binary search on the answer" — any monotonic yes/no predicate can be binary searched. Learn classic BS, BS on answer, and rotated array tricks.',
  gradient: 'from-emerald-400 to-teal-500',
  topicSlug: 'binary_search',
  readTime: '16 min',
  sections: [
    {
      type: 'text',
      content: `Binary search is one of the most misunderstood patterns. Beginners think it's only for "find x in sorted array." But the real power is binary search on the ANSWER: whenever you can write a monotonic predicate isValid(x) — where all false values come before all true values — you can binary search the answer space and find the boundary in O(log n).`,
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'teal',
      content: `**Three flavors of binary search:**\n1. **Classic** — find a value in sorted array\n2. **Find boundary** — find leftmost/rightmost position where condition changes\n3. **Search on answer** — the search space is a range of possible answers, not the array itself`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'When to Reach for Binary Search on Answer',
    },
    {
      type: 'table',
      headers: ['Signal', 'What It Means'],
      rows: [
        ['"minimum maximum" or "maximum minimum"', 'Binary search on the answer value'],
        ['"is it possible with k operations?"', 'Write isValid(k), binary search on k'],
        ['"at least / at most k"', 'Binary search on k with a greedy feasibility check'],
        ['Monotonic feasibility', 'If valid(x) then valid(x+1), binary search the boundary'],
        ['Sorted array — find first/last', 'Find boundary, not just any match'],
        ['Rotated sorted array', 'One half is always sorted, use that half to decide direction'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Core Templates',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Classic binary search',
      code: `let left = 0, right = n - 1;
while (left <= right) {
    const mid = (left + right) >> 1;
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
}
return -1;`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Find leftmost position where condition is true',
      code: `// All false values come BEFORE all true values.
// Find first index where isTrue(arr[mid]) flips to true.
let left = 0, right = n - 1, ans = -1;
while (left <= right) {
    const mid = (left + right) >> 1;
    if (isTrue(arr[mid])) {
        ans = mid;      // candidate — but check if there's an earlier one
        right = mid - 1;
    } else {
        left = mid + 1;
    }
}
return ans;`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Binary search on answer (minimum feasible value)',
      code: `// isValid(mid): can we achieve it with at most mid resources?
// Returns minimum k where isValid(k) is true.
let left = minPossible, right = maxPossible;
while (left <= right) {
    const mid = (left + right) >> 1;
    if (isValid(mid)) right = mid - 1;  // could be smaller
    else left = mid + 1;                 // too small, need more
}
return left;  // first value where isValid is true`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Search in Rotated Sorted Array',
      url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: O(n) linear scan',
          explanation: `Just scan. Works but misses the point of the problem entirely.`,
        },
        {
          label: 'Intuition 2: O(log n) — one half is always sorted',
          explanation: `In a rotated array, the midpoint divides it into two halves. AT LEAST ONE of those halves is always fully sorted. We can check which half is sorted by comparing arr[left] with arr[mid]. Then check if target falls in the sorted half. If yes, go there. If no, go to the other half. One comparison per step → O(log n).`,
          code: `var search = function(nums, target) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = (left + right) >> 1;
        if (nums[mid] === target) return mid;

        if (nums[left] <= nums[mid]) {
            // left half is sorted
            if (nums[left] <= target && target < nums[mid]) right = mid - 1;
            else left = mid + 1;
        } else {
            // right half is sorted
            if (nums[mid] < target && target <= nums[right]) left = mid + 1;
            else right = mid - 1;
        }
    }
    return -1;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Find First and Last Position of Element in Sorted Array',
      url: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Two binary searches — find boundary',
          explanation: `Run binary search twice: once to find the LEFTMOST position (when we find target, we save the answer and keep going left looking for an earlier one), and once for the RIGHTMOST (same but going right). Each run is O(log n).`,
          code: `var searchRange = function(nums, target) {
    const findLeft = () => {
        let l = 0, r = nums.length - 1, ans = -1;
        while (l <= r) {
            const mid = (l + r) >> 1;
            if (nums[mid] === target) { ans = mid; r = mid - 1; }  // save & go left
            else if (nums[mid] < target) l = mid + 1;
            else r = mid - 1;
        }
        return ans;
    };
    const findRight = () => {
        let l = 0, r = nums.length - 1, ans = -1;
        while (l <= r) {
            const mid = (l + r) >> 1;
            if (nums[mid] === target) { ans = mid; l = mid + 1; }  // save & go right
            else if (nums[mid] < target) l = mid + 1;
            else r = mid - 1;
        }
        return ans;
    };
    return [findLeft(), findRight()];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Koko Eating Bananas',
      url: 'https://leetcode.com/problems/koko-eating-bananas/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Brute force try every speed',
          explanation: `Try eating speed 1, 2, 3... up to max(piles). For each speed, check if she can finish in h hours. Return first valid speed. O(max(piles) × n).`,
        },
        {
          label: 'Intuition 2: Binary search on speed (answer)',
          explanation: `Observation: if speed k works, then speed k+1 also works. The predicate isValid(k) is monotonic. Binary search between 1 and max(piles). For each candidate speed mid, compute total hours needed: sum of ceil(pile/mid) for all piles. If ≤ h, it's valid (go lower); else go higher.`,
          code: `var minEatingSpeed = function(piles, h) {
    const canFinish = (speed) =>
        piles.reduce((hours, pile) => hours + Math.ceil(pile / speed), 0) <= h;

    let left = 1, right = Math.max(...piles);
    while (left < right) {
        const mid = (left + right) >> 1;
        if (canFinish(mid)) right = mid;   // valid, try slower
        else left = mid + 1;               // too slow, need faster
    }
    return left;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Find Minimum in Rotated Sorted Array',
      url: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Binary search — minimum is at the inflection point',
          explanation: `In a rotated array, the minimum is where the sequence drops. Compare nums[mid] with nums[right]: if nums[mid] > nums[right], the minimum is in the right half. Otherwise it's in the left half (including mid). We're finding the leftmost point of the "rotated" section.`,
          code: `var findMin = function(nums) {
    let left = 0, right = nums.length - 1;
    while (left < right) {  // note: < not <=
        const mid = (left + right) >> 1;
        if (nums[mid] > nums[right]) left = mid + 1;  // min in right half
        else right = mid;                              // mid could be the min
    }
    return nums[left];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Zero Array Transformation II',
      url: 'https://leetcode.com/problems/zero-array-transformation-ii/',
      difficulty: 'Medium',
      note: 'Binary search on answer + difference array. Classic "minimum k queries" pattern.',
      intuitions: [
        {
          label: 'Intuition 1: Binary search on number of queries used',
          explanation: `We need minimum k queries to make all nums[i] ≤ 0. Observation: if k queries work, then k+1 also works. Monotonic predicate → binary search on k.\n\nFor a given k, check validity using a difference array: apply the first k queries to a diff array, compute prefix sum, check if every position is decremented enough.`,
          code: `var minZeroArray = function(nums, queries) {
    const n = nums.length, m = queries.length;

    const valid = (k) => {
        const diff = new Array(n + 1).fill(0);
        for (let i = 0; i < k; i++) {
            const [l, r, v] = queries[i];
            diff[l] += v;
            diff[r + 1] -= v;
        }
        let sum = 0;
        for (let i = 0; i < n; i++) {
            sum += diff[i];
            if (sum < nums[i]) return false;
        }
        return true;
    };

    if (!valid(m)) return -1;
    let left = 0, right = m;
    while (left <= right) {
        const mid = (left + right) >> 1;
        if (valid(mid)) right = mid - 1;
        else left = mid + 1;
    }
    return left;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'variation',
      title: 'The isValid Pattern — Same Template, Different Predicate',
      baseCode: `let left = lowerBound, right = upperBound;
while (left <= right) {
    const mid = (left + right) >> 1;
    if (isValid(mid)) right = mid - 1;  // ← just change isValid()
    else left = mid + 1;
}
return left;`,
      variants: [
        {
          problem: 'Minimum days to make m bouquets',
          url: 'https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/',
          change: 'isValid(day): count groups of k consecutive bloomed flowers ≥ m',
          why: 'More days = more flowers bloomed = easier to make bouquets → monotonic',
        },
        {
          problem: 'Capacity to ship packages within D days',
          url: 'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/',
          change: 'isValid(cap): simulate shipping, check if days needed ≤ D',
          why: 'Higher capacity = fewer days needed → monotonic',
        },
        {
          problem: 'Split array largest sum',
          url: 'https://leetcode.com/problems/split-array-largest-sum/',
          change: 'isValid(maxSum): greedily split array, check if ≤ k pieces',
          why: 'Higher maxSum = fewer pieces needed → monotonic',
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
      num: 6,
      title: 'Search in Rotated Sorted Array',
      url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Determine which half is sorted at each step',
          explanation: 'At any mid, one half is always sorted (no rotation within it). Check if target is in the sorted half — if yes, search there; otherwise search the other half.',
          code: `var search = function(nums, target) {
    let lo=0, hi=nums.length-1;
    while(lo<=hi){
        const mid=(lo+hi)>>1;
        if(nums[mid]===target) return mid;
        if(nums[lo]<=nums[mid]){ // left half sorted
            if(nums[lo]<=target && target<nums[mid]) hi=mid-1;
            else lo=mid+1;
        } else {                  // right half sorted
            if(nums[mid]<target && target<=nums[hi]) lo=mid+1;
            else hi=mid-1;
        }
    }
    return -1;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 7,
      title: 'Find Peak Element',
      url: 'https://leetcode.com/problems/find-peak-element/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Binary search toward the larger neighbor',
          explanation: 'If nums[mid] < nums[mid+1], a peak must exist on the right (the right slope is ascending). Otherwise peak exists at mid or left. This eliminates half each step.',
          code: `var findPeakElement = function(nums) {
    let lo=0, hi=nums.length-1;
    while(lo<hi){
        const mid=(lo+hi)>>1;
        if(nums[mid]<nums[mid+1]) lo=mid+1;
        else hi=mid;
    }
    return lo;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 8,
      title: 'Median of Two Sorted Arrays',
      url: 'https://leetcode.com/problems/median-of-two-sorted-arrays/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Binary search on partition in shorter array',
          explanation: 'Binary search on i (how many elements to take from nums1). Partition nums2 so total left = (m+n+1)/2. Valid partition: maxLeft1 <= minRight2 && maxLeft2 <= minRight1.',
          code: `var findMedianSortedArrays = function(nums1, nums2) {
    if(nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);
    const [m,n]=[nums1.length,nums2.length];
    let lo=0, hi=m;
    while(lo<=hi){
        const i=(lo+hi)>>1, j=((m+n+1)>>1)-i;
        const mL1=i?nums1[i-1]:-Infinity, mL2=j?nums2[j-1]:-Infinity;
        const mR1=i<m?nums1[i]:Infinity, mR2=j<n?nums2[j]:Infinity;
        if(mL1<=mR2 && mL2<=mR1){
            if((m+n)%2) return Math.max(mL1,mL2);
            return (Math.max(mL1,mL2)+Math.min(mR1,mR2))/2;
        } else if(mL1>mR2) hi=i-1;
        else lo=i+1;
    }
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Even More Worked Problems',
    },
    {
      type: 'problem',
      num: 9,
      title: 'Koko Eating Bananas',
      url: 'https://leetcode.com/problems/koko-eating-bananas/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Binary search on eating speed k',
          explanation: `"Minimize k such that total hours ≤ h." Binary search on k (speed). For a given k, hours needed = Σ ceil(pile/k). If ≤ h, k might work — try smaller. Else too slow — try larger. Range: 1 to max(piles).`,
          code: `var minEatingSpeed = function(piles, h) {
    let lo = 1, hi = Math.max(...piles);
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        const hours = piles.reduce((s, p) => s + Math.ceil(p / mid), 0);
        if (hours <= h) hi = mid;  // could eat slower
        else lo = mid + 1;          // too slow, need faster
    }
    return lo;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 10,
      title: 'Capacity to Ship Packages Within D Days',
      url: 'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Binary search on ship capacity',
          explanation: `"Minimum weight capacity to ship all within D days." For a given capacity, greedily count days needed (pack as much as possible each day). Binary search on capacity: lo = max single weight, hi = total weight.`,
          code: `var shipWithinDays = function(weights, days) {
    let lo = Math.max(...weights), hi = weights.reduce((a,b)=>a+b);
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        let d = 1, curr = 0;
        for (const w of weights) {
            if (curr + w > mid) { d++; curr = 0; }
            curr += w;
        }
        if (d <= days) hi = mid;
        else lo = mid + 1;
    }
    return lo;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 11,
      title: 'Split Array Largest Sum',
      url: 'https://leetcode.com/problems/split-array-largest-sum/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Binary search on answer — minimize largest subarray sum',
          explanation: `"Split into k subarrays to minimize the largest sum." Binary search on the answer (largest sum). For a given limit, greedily check if k splits suffice: start new subarray whenever current exceeds limit. If splits needed ≤ k, limit might work (try smaller).`,
          code: `var splitArray = function(nums, k) {
    let lo = Math.max(...nums), hi = nums.reduce((a,b)=>a+b);
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        let splits = 1, curr = 0;
        for (const n of nums) {
            if (curr + n > mid) { splits++; curr = 0; }
            curr += n;
        }
        if (splits <= k) hi = mid;
        else lo = mid + 1;
    }
    return lo;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧠',
      color: 'teal',
      content: `**Binary search decision tree:**\n- Sorted array, find target → standard lo/hi\n- Rotated sorted array → check which half is sorted\n- Find peak/min → compare mid with neighbor, go toward larger\n- "Minimize maximum" / "Maximize minimum" → binary search on answer\n- Two sorted arrays, find median → binary search on partition\n\n**"Binary search on answer" template:**\n1. Identify: monotone feasibility function f(x) — if x works, x+1 also works (or vice versa)\n2. Set lo/hi to range of valid answers\n3. Check if mid is feasible (greedy simulation)\n4. Move lo/hi based on feasibility\n\nCommon "binary search on answer" problems: Koko, Ship Packages, Split Array, Minimum Effort Path.`,
    },
  ],
}
