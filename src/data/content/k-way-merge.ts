import type { Article } from '../articles'

export const kWayMergeArticle: Article = {
  slug: 'k-way-merge',
  title: 'K-Way Merge',
  emoji: '🔀',
  tagline: 'Merge k sorted structures with a min-heap. Find smallest range, kth smallest.',
  description: 'K-way merge combines k sorted arrays/lists into a single sorted stream. Core tool: min-heap storing the current minimum from each of the k lists. Each step: extract minimum from heap, advance that list\'s pointer, push next element. Applications: merge k sorted lists, find k-th smallest in sorted matrix, smallest range covering k lists, external merge sort.',
  gradient: 'from-purple-700 to-violet-800',
  topicSlug: 'dp',
  readTime: '13 min',
  sections: [
    {
      type: 'text',
      content: `K-way merge: min-heap of size k stores (value, list_index, element_index). Pop min, add to result, push next element from same list. O(n log k) total where n = total elements. Kth smallest in sorted matrix: same idea — treat each row as a sorted list. Smallest range: maintain window [min, max] while advancing the list that had the minimum.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'K-way merge with min-heap simulation',
      code: `// Merge k sorted arrays using min-heap
// Simulating with sorted array (in practice use a proper heap)
function mergeKSortedArrays(arrays) {
    const heap = []; // [value, arrayIdx, elemIdx]
    // Initialize heap with first element of each array
    for (let i = 0; i < arrays.length; i++)
        if (arrays[i].length) heap.push([arrays[i][0], i, 0]);

    heap.sort((a, b) => a[0] - b[0]);
    const result = [];

    while (heap.length) {
        heap.sort((a, b) => a[0] - b[0]); // maintain heap property
        const [val, ai, ei] = heap.shift();
        result.push(val);
        if (ei + 1 < arrays[ai].length)
            heap.push([arrays[ai][ei+1], ai, ei+1]);
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
      title: 'Merge K Sorted Lists',
      url: 'https://leetcode.com/problems/merge-k-sorted-lists/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Divide and conquer — repeatedly merge pairs of lists',
          explanation: `Merge lists in pairs: merge lists[0]+lists[1], lists[2]+lists[3], etc. Repeat until one list remains. O(n log k) total — each element participates in O(log k) merges.`,
          code: `var mergeKLists = function(lists) {
    if(!lists.length) return null;
    while(lists.length>1){
        const merged=[];
        for(let i=0;i<lists.length;i+=2)
            merged.push(merge2(lists[i],lists[i+1]||null));
        lists=merged;
    }
    return lists[0];
};
const merge2=(l1,l2)=>{
    const dummy={next:null}; let cur=dummy;
    while(l1&&l2){
        if(l1.val<=l2.val){cur.next=l1;l1=l1.next;}
        else{cur.next=l2;l2=l2.next;}
        cur=cur.next;
    }
    cur.next=l1||l2;
    return dummy.next;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Kth Smallest Element in a Sorted Matrix',
      url: 'https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Binary search on value — count elements ≤ mid',
          explanation: `Binary search on the answer value in [matrix[0][0], matrix[n-1][n-1]]. For each mid, count elements ≤ mid in O(n) using two-pointer from bottom-left. Find smallest value where count >= k.`,
          code: `var kthSmallest = function(matrix, k) {
    const n=matrix.length;
    let lo=matrix[0][0],hi=matrix[n-1][n-1];
    const count=mid=>{
        let c=0,r=n-1,col=0;
        while(r>=0&&col<n){
            if(matrix[r][col]<=mid){c+=r+1;col++;}
            else r--;
        }
        return c;
    };
    while(lo<hi){
        const mid=(lo+hi)>>1;
        count(mid)<k?lo=mid+1:hi=mid;
    }
    return lo;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Find K Pairs with Smallest Sums',
      url: 'https://leetcode.com/problems/find-k-pairs-with-smallest-sums/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Min-heap of (sum, i, j) — expand by incrementing j',
          explanation: `Start with (nums1[i]+nums2[0], i, 0) for all i in [0..min(k-1, n-1)]. Each time we extract (sum, i, j), push (nums1[i]+nums2[j+1], i, j+1) if j+1 < nums2.length.`,
          code: `var kSmallestPairs = function(nums1, nums2, k) {
    const heap=[]; // [sum, i, j]
    for(let i=0;i<Math.min(k,nums1.length);i++)
        heap.push([nums1[i]+nums2[0],i,0]);
    heap.sort((a,b)=>a[0]-b[0]);
    const res=[];
    while(res.length<k&&heap.length){
        heap.sort((a,b)=>a[0]-b[0]);
        const [,i,j]=heap.shift();
        res.push([nums1[i],nums2[j]]);
        if(j+1<nums2.length) heap.push([nums1[i]+nums2[j+1],i,j+1]);
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
      title: 'Smallest Range Covering Elements from K Lists',
      url: 'https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Min-heap with tracked max — window [min, max] contains one from each list',
          explanation: `Heap stores (value, list_idx, elem_idx). Track current max. Window = [heap_min, current_max] contains one element from each list. Advance the list with minimum element to potentially shrink range.`,
          code: `var smallestRange = function(nums) {
    const heap=[]; let curMax=-Infinity;
    for(let i=0;i<nums.length;i++){
        heap.push([nums[i][0],i,0]);
        curMax=Math.max(curMax,nums[i][0]);
    }
    heap.sort((a,b)=>a[0]-b[0]);
    let res=[heap[0][0],curMax];
    while(true){
        heap.sort((a,b)=>a[0]-b[0]);
        const [val,i,j]=heap.shift();
        if(j+1>=nums[i].length) break;
        heap.push([nums[i][j+1],i,j+1]);
        curMax=Math.max(curMax,nums[i][j+1]);
        const min=heap[0][0];
        if(curMax-min<res[1]-res[0]) res=[min,curMax];
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🔀',
      color: 'blue',
      content: `**K-way merge complexity:** O(n log k) where n = total elements, k = number of lists. Min-heap of size k enables O(log k) extraction and insertion.\n\n**Pattern variations:**\n- Merge k lists: same pattern, pointer follows linked list next\n- Kth smallest in matrix: binary search on value (more elegant than heap)\n- Smallest range: maintain max separately, advance min's list\n- K pairs smallest sum: expand one dimension at a time\n\n**Lazy deletion heap:** For priority queues where elements become invalid, push (priority, id) to heap. When popping, check if id is still valid; skip if not. Avoids O(n) removal from heap.`,
    },
  ],
}
