import type { Article } from '../articles'

export const divideConquerArticle: Article = {
  slug: 'divide-conquer',
  title: 'Divide and Conquer',
  emoji: '⚔️',
  tagline: 'Split. Solve each half. Merge. Repeat until trivial.',
  description: 'Divide and conquer splits a problem into independent subproblems, solves each recursively, and merges results. Merge sort, quick sort, closest pair of points, count inversions, and maximum subarray all follow this pattern. The merge step is where the real work happens.',
  gradient: 'from-red-500 to-orange-500',
  topicSlug: 'graph',
  readTime: '18 min',
  sections: [
    {
      type: 'text',
      content: `Divide and conquer has three steps: divide the problem into smaller subproblems, conquer each recursively (base case when trivial), and combine the results. The key insight is that combining partial results is cheaper than solving the full problem directly. Merge sort is the canonical example: splitting is O(1), merging is O(n), recursion depth is O(log n), total O(n log n).`,
    },
    {
      type: 'table',
      headers: ['Problem', 'Split', 'Merge cost', 'Total'],
      rows: [
        ['Merge Sort', 'Half/half', 'O(n) merge two sorted halves', 'O(n log n)'],
        ['Quick Sort', 'Partition around pivot', 'O(n) partition', 'O(n log n) avg'],
        ['Count Inversions', 'Half/half', 'O(n) count cross-half inversions during merge', 'O(n log n)'],
        ['Closest Pair of Points', 'Half/half by x', 'O(n) strip check', 'O(n log n)'],
        ['Maximum Subarray', 'Half/half', 'O(n) find max crossing subarray', 'O(n log n)'],
        ['QuickSelect (k-th smallest)', 'Partition', 'O(1) — only recurse one side', 'O(n) avg'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Merge Sort Template',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Merge sort — the canonical D&C example',
      code: `function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = arr.length >> 1;
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length)
        result.push(left[i] <= right[j] ? left[i++] : right[j++]);
    return result.concat(left.slice(i), right.slice(j));
}

// In-place merge sort with index tracking (avoids array slices)
function mergeSortInPlace(arr, lo, hi, temp) {
    if (lo >= hi) return;
    const mid = (lo + hi) >> 1;
    mergeSortInPlace(arr, lo, mid, temp);
    mergeSortInPlace(arr, mid+1, hi, temp);
    mergeInPlace(arr, lo, mid, hi, temp);
}`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'QuickSelect — O(n) Average k-th Element',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'QuickSelect — find k-th smallest in O(n) average',
      code: `function quickSelect(arr, lo, hi, k) {
    if (lo === hi) return arr[lo];
    const pivot = partition(arr, lo, hi);
    if (k === pivot) return arr[pivot];
    if (k < pivot) return quickSelect(arr, lo, pivot - 1, k);
    return quickSelect(arr, pivot + 1, hi, k);
}

function partition(arr, lo, hi) {
    const pivot = arr[hi];
    let i = lo;
    for (let j = lo; j < hi; j++) {
        if (arr[j] <= pivot) [arr[i], arr[j]] = [arr[j], arr[i++]];
    }
    [arr[i], arr[hi]] = [arr[hi], arr[i]];
    return i;
}

// Usage: k-th smallest (0-indexed)
// quickSelect(arr, 0, arr.length-1, k-1)

// Randomized pivot for O(n) expected (not worst case O(n²)):
function randPartition(arr, lo, hi) {
    const r = lo + Math.floor(Math.random() * (hi - lo + 1));
    [arr[r], arr[hi]] = [arr[hi], arr[r]];
    return partition(arr, lo, hi);
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
      title: 'Sort an Array (Merge Sort)',
      url: 'https://leetcode.com/problems/sort-an-array/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Built-in sort',
          explanation: `Array.sort() is O(n log n). Fine for most problems.`,
          code: `var sortArray = function(nums) { return nums.sort((a,b) => a-b); };`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Merge sort — stable, O(n log n) guaranteed',
          explanation: `Split in half, sort each half recursively, merge two sorted halves. Unlike quick sort, merge sort is guaranteed O(n log n) and is stable (equal elements keep relative order).`,
          code: `var sortArray = function(nums) {
    const merge = (l, r) => {
        const res = [];
        let i=0, j=0;
        while(i<l.length && j<r.length) res.push(l[i]<=r[j] ? l[i++] : r[j++]);
        return res.concat(l.slice(i), r.slice(j));
    };
    const sort = (arr) => {
        if(arr.length<=1) return arr;
        const mid=arr.length>>1;
        return merge(sort(arr.slice(0,mid)), sort(arr.slice(mid)));
    };
    return sort(nums);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Kth Largest Element in an Array',
      url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Sort — O(n log n)',
          explanation: `Sort descending, return index k-1. Simple but doesn't use the "k-th" structure.`,
          code: `var findKthLargest = function(nums, k) {
    return nums.sort((a,b)=>b-a)[k-1];
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: QuickSelect — O(n) average',
          explanation: `Partial sort: partition around a pivot. The pivot ends up in its final sorted position. If pivot index is n-k (k-th largest position), done. Otherwise recurse on the relevant half only. Average O(n), worst case O(n²) without randomization.`,
          code: `var findKthLargest = function(nums, k) {
    const target = nums.length - k; // k-th largest = (n-k)-th smallest
    const partition = (lo, hi) => {
        const pivot = nums[hi];
        let i = lo;
        for (let j=lo; j<hi; j++) if(nums[j]<=pivot) [nums[i],nums[j]]=[nums[j],nums[i++]];
        [nums[i],nums[hi]]=[nums[hi],nums[i]];
        return i;
    };
    let lo=0, hi=nums.length-1;
    while(lo<=hi) {
        const p=partition(lo,hi);
        if(p===target) return nums[p];
        if(p<target) lo=p+1; else hi=p-1;
    }
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Count of Smaller Numbers After Self',
      url: 'https://leetcode.com/problems/count-of-smaller-numbers-after-self/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: O(n²) brute force — for each i, count elements to right smaller than nums[i]',
          explanation: `For each element, scan all elements to its right. O(n²).`,
        },
        {
          label: 'Intuition 2: Modified merge sort — count inversions during merge',
          explanation: `During merge sort, when we pick an element from the right half before elements from the left half, those left-half elements have a "smaller number after them." Count how many right-half elements are placed before each left-half element during each merge step.`,
          code: `var countSmaller = function(nums) {
    const n = nums.length;
    const result = new Array(n).fill(0);
    const indices = Array.from({length:n},(_,i)=>i); // track original positions

    const mergeSort = (arr) => {
        if(arr.length<=1) return arr;
        const mid=arr.length>>1;
        const left=mergeSort(arr.slice(0,mid));
        const right=mergeSort(arr.slice(mid));
        return merge(left, right);
    };
    const merge = (left, right) => {
        const merged=[];
        let i=0, j=0;
        while(i<left.length && j<right.length) {
            if(nums[left[i]] <= nums[right[j]]) {
                result[left[i]] += j; // j right-half elements already placed
                merged.push(left[i++]);
            } else {
                merged.push(right[j++]);
            }
        }
        while(i<left.length){ result[left[i]]+=j; merged.push(left[i++]); }
        while(j<right.length) merged.push(right[j++]);
        return merged;
    };
    mergeSort(indices);
    return result;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Maximum Subarray (Divide & Conquer)',
      url: 'https://leetcode.com/problems/maximum-subarray/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Kadane\'s — O(n) DP (preferred)',
          explanation: `dp[i] = max subarray sum ending at i. dp[i] = max(nums[i], dp[i-1]+nums[i]). See DP article.`,
        },
        {
          label: 'Intuition 2: D&C — O(n log n), useful to understand the pattern',
          explanation: `Split array at mid. Max subarray is either: entirely in left half, entirely in right half, or crosses mid. Cross-mid case: max suffix of left half + max prefix of right half. Recurse left and right, return max of 3 cases.`,
          code: `var maxSubArray = function(nums) {
    const solve = (lo, hi) => {
        if(lo===hi) return nums[lo];
        const mid=(lo+hi)>>1;
        // Max crossing subarray
        let leftMax=-Infinity, sum=0;
        for(let i=mid;i>=lo;i--) { sum+=nums[i]; leftMax=Math.max(leftMax,sum); }
        let rightMax=-Infinity; sum=0;
        for(let i=mid+1;i<=hi;i++) { sum+=nums[i]; rightMax=Math.max(rightMax,sum); }
        return Math.max(solve(lo,mid), solve(mid+1,hi), leftMax+rightMax);
    };
    return solve(0, nums.length-1);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Reverse Pairs',
      url: 'https://leetcode.com/problems/reverse-pairs/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: O(n²) brute — check all pairs',
          explanation: `For every pair (i, j) where i < j, check if nums[i] > 2*nums[j]. O(n²).`,
        },
        {
          label: 'Intuition 2: Modified merge sort — count cross-half pairs before merge',
          explanation: `During merge, before merging left and right, count pairs where left[i] > 2*right[j]. Two pointers: for each left[i], find how many right[j] satisfy nums[i] > 2*nums[j] (both halves are sorted). Then do the actual merge.`,
          code: `var reversePairs = function(nums) {
    let count = 0;
    const sort = (arr) => {
        if(arr.length<=1) return arr;
        const mid=arr.length>>1;
        const L=sort(arr.slice(0,mid)), R=sort(arr.slice(mid));
        // Count cross pairs before merging
        let j=0;
        for(const x of L){
            while(j<R.length && x>2*R[j]) j++;
            count+=j;
        }
        // Standard merge
        const res=[]; let i=0; j=0;
        while(i<L.length&&j<R.length) res.push(L[i]<=R[j]?L[i++]:R[j++]);
        return res.concat(L.slice(i),R.slice(j));
    };
    sort(nums);
    return count;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧠',
      color: 'orange',
      content: `**D&C pattern recognition:**\n- "Sort / order statistics" → merge sort or quick sort\n- "K-th smallest/largest" → QuickSelect O(n) avg\n- "Count inversions / cross-half pairs" → merge sort, count during merge\n- "Max subarray crossing midpoint" → D&C merge step\n- "Closest pair of points" → sort by x, split, check strip O(n log² n)\n\n**When D&C beats DP:**\n- Independent subproblems (no shared state between halves)\n- The merge step does useful work (counts/computes something nontrivial)\n- Naturally recursive structure (trees, sorted arrays)`,
    },
  ],
}
