import type { Article } from '../articles'

export const arrayRotationArticle: Article = {
  slug: 'array-rotation',
  title: 'Array Rotation & Circular Problems',
  emoji: '🔁',
  tagline: 'Rotate by k, search in rotated array, circular queue/buffer problems.',
  description: 'Array rotation problems work with shifted or circular arrays. Key insight: rotating right by k is equivalent to reversing the full array, then reversing [0..k-1] and [k..n-1] (three-reversal trick). Search in rotated sorted array: binary search with one side always sorted. Circular problems (max sum subarray in circular array) require handling wrap-around: answer is either normal max subarray or total sum minus min subarray.',
  gradient: 'from-cyan-600 to-teal-700',
  topicSlug: 'dp',
  readTime: '12 min',
  sections: [
    {
      type: 'text',
      content: `Rotate array by k: three reversals. Reverse all → reverse [0..k-1] → reverse [k..n-1]. O(n) time, O(1) space. Search in rotated array: one half is always sorted. If nums[l] <= nums[mid], left half sorted; check if target in [nums[l], nums[mid]], else go right. Circular max subarray: max(max_subarray, total - min_subarray). Edge case: all negative means min_subarray = full array.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Rotate array and circular max subarray',
      code: `// Rotate array right by k — three reversals
function rotate(nums, k) {
    const n = nums.length;
    k %= n;
    reverse(nums, 0, n - 1);
    reverse(nums, 0, k - 1);
    reverse(nums, k, n - 1);
}
function reverse(arr, l, r) {
    while (l < r) { [arr[l], arr[r]] = [arr[r], arr[l]]; l++; r--; }
}

// Maximum sum circular subarray
function maxSubarraySumCircular(nums) {
    let maxSum = nums[0], curMax = 0;
    let minSum = nums[0], curMin = 0;
    let total = 0;
    for (const n of nums) {
        curMax = Math.max(curMax + n, n);
        maxSum = Math.max(maxSum, curMax);
        curMin = Math.min(curMin + n, n);
        minSum = Math.min(minSum, curMin);
        total += n;
    }
    // If maxSum < 0, all negative — return maxSum
    return maxSum > 0 ? Math.max(maxSum, total - minSum) : maxSum;
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
      title: 'Search in Rotated Sorted Array',
      url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Binary search — one half is always sorted',
          explanation: `If nums[l] <= nums[mid], left half [l..mid] is sorted. Check if target in range; if yes, go left. Else go right. If right half sorted, same logic on right half.`,
          code: `var search = function(nums, target) {
    let l=0,r=nums.length-1;
    while(l<=r){
        const m=(l+r)>>1;
        if(nums[m]===target) return m;
        if(nums[l]<=nums[m]){ // left sorted
            if(nums[l]<=target&&target<nums[m]) r=m-1;
            else l=m+1;
        } else { // right sorted
            if(nums[m]<target&&target<=nums[r]) l=m+1;
            else r=m-1;
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
      title: 'Rotate Array',
      url: 'https://leetcode.com/problems/rotate-array/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Three reversals — reverse all, reverse [0..k-1], reverse [k..n-1]',
          explanation: `Rotating right by k: reverse entire array, then reverse first k elements, then reverse remaining n-k elements. Result is the rotation.`,
          code: `var rotate = function(nums, k) {
    const n=nums.length; k%=n;
    const rev=(l,r)=>{while(l<r){[nums[l],nums[r]]=[nums[r],nums[l]];l++;r--;}};
    rev(0,n-1); rev(0,k-1); rev(k,n-1);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Maximum Sum Circular Subarray',
      url: 'https://leetcode.com/problems/maximum-sum-circular-subarray/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: max(max_subarray, total - min_subarray)',
          explanation: `Non-wrapping max = standard Kadane. Wrapping max = total sum - min subarray (the "excluded" middle). Answer = max of both. Edge case: if all negative, min_subarray = all elements, total - min = 0, but we need at least one element, so return non-wrapping max.`,
          code: `var maxSubarraySumCircular = function(nums) {
    let maxS=nums[0],curMax=0,minS=nums[0],curMin=0,total=0;
    for(const n of nums){
        curMax=Math.max(curMax+n,n); maxS=Math.max(maxS,curMax);
        curMin=Math.min(curMin+n,n); minS=Math.min(minS,curMin);
        total+=n;
    }
    return maxS>0?Math.max(maxS,total-minS):maxS;
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
          label: 'Intuition 1: Binary search — minimum is in the unsorted half',
          explanation: `If nums[mid] > nums[r], minimum is in right half (after mid). Else minimum is in left half including mid. Shrink to O(log n).`,
          code: `var findMin = function(nums) {
    let l=0,r=nums.length-1;
    while(l<r){
        const m=(l+r)>>1;
        if(nums[m]>nums[r]) l=m+1; // min in right
        else r=m; // min in left (including m)
    }
    return nums[l];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🔁',
      color: 'teal',
      content: `**Three-reversal rotation:** To rotate right by k: (1) reverse all, (2) reverse [0..k-1], (3) reverse [k..n-1]. Visualize: [1,2,3,4,5] k=2 → [5,4,3,2,1] → [4,5,3,2,1] → [4,5,1,2,3] ✓\n\n**Rotated sorted array binary search:** Always ask "which half is sorted?" The sorted half can be checked with a simple range test; if target not there, it must be in the other half.\n\n**Circular subarray wrap:** Wrapping subarray = total - middle subarray. To maximize wrapping sum, minimize the middle. Two Kadane passes: one for max (forward), one for min.`,
    },
  ],
}
