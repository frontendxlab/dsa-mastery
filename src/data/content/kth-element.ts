import type { Article } from '../articles'

export const kthElementArticle: Article = {
  slug: 'kth-element',
  title: 'K-th Element Patterns',
  emoji: '🏆',
  tagline: 'QuickSelect for O(n), heap for O(n log k), binary search for implicit structures.',
  description: 'Finding the k-th smallest/largest element or the top k elements appears in many forms. QuickSelect gives O(n) average for a single k-th element. A size-k heap gives O(n log k) for top-k from a stream. Binary search on value works for implicit structures like sorted matrices.',
  gradient: 'from-amber-600 to-yellow-700',
  topicSlug: 'heap',
  readTime: '16 min',
  sections: [
    {
      type: 'text',
      content: `K-th element problems test algorithm selection. Sort and index is O(n log n) — too slow when O(n) is possible. The right approach depends on the structure: QuickSelect for arrays, heap for streaming/top-k, binary search for implicit sorted structures like matrices or function values.`,
    },
    {
      type: 'table',
      headers: ['Problem Type', 'Best Approach', 'Time'],
      rows: [
        ['K-th smallest in unsorted array', 'QuickSelect (partition)', 'O(n) avg'],
        ['K largest elements from stream', 'Min-heap of size k', 'O(n log k)'],
        ['K-th smallest in sorted matrix', 'Binary search on value', 'O(n log(max-min))'],
        ['K-th smallest in BST', 'Inorder traversal, stop at k', 'O(k)'],
        ['Median of two sorted arrays', 'Binary search on partition', 'O(log min(m,n))'],
        ['K-th smallest pair sum', 'Min-heap multi-source BFS', 'O(k log k)'],
        ['K closest points', 'QuickSelect or max-heap', 'O(n) or O(n log k)'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'QuickSelect — O(n) Average',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'QuickSelect — find k-th smallest in O(n) average',
      code: `function quickSelect(nums, k) {
    // Find k-th smallest (0-indexed: k=0 means smallest)
    const partition = (lo, hi) => {
        // Random pivot to avoid O(n²) worst case
        const pivotIdx = lo + Math.floor(Math.random() * (hi-lo+1));
        [nums[pivotIdx], nums[hi]] = [nums[hi], nums[pivotIdx]];
        const pivot = nums[hi];
        let i = lo;
        for (let j = lo; j < hi; j++)
            if (nums[j] <= pivot) [nums[i], nums[j]] = [nums[j], nums[i++]];
        [nums[i], nums[hi]] = [nums[hi], nums[i]];
        return i; // pivot's final position
    };
    let lo = 0, hi = nums.length - 1;
    while (lo < hi) {
        const p = partition(lo, hi);
        if (p === k) break;
        if (p < k) lo = p + 1;
        else hi = p - 1;
    }
    return nums[k];
}

// For k-th LARGEST: call quickSelect(nums, nums.length-k)
// Or negate all values and find k-th smallest`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Binary Search on Value for Implicit Structures',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'K-th smallest in sorted matrix — binary search on answer',
      code: `// Sorted matrix: each row and column is sorted ascending
// Count elements <= mid, check if count >= k
function kthSmallestMatrix(matrix, k) {
    const n = matrix.length;
    let lo = matrix[0][0], hi = matrix[n-1][n-1];

    const countLEQ = (target) => {
        let count = 0, row = n-1, col = 0;
        while (row >= 0 && col < n) {
            if (matrix[row][col] <= target) { count += row + 1; col++; }
            else row--;
        }
        return count;
    };

    while (lo < hi) {
        const mid = lo + ((hi-lo) >> 1);
        if (countLEQ(mid) >= k) hi = mid; // mid might be the answer
        else lo = mid + 1;
    }
    return lo; // lo = smallest value where count >= k (must exist in matrix)
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
      title: 'Kth Largest Element in an Array',
      url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Sort — O(n log n)',
          explanation: `Sort descending, return index k-1. Simple but not optimal.`,
          code: `var findKthLargest = function(nums, k) {
    return nums.sort((a,b)=>b-a)[k-1];
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: QuickSelect — O(n) average',
          explanation: `QuickSelect partitions around a pivot. When pivot lands at position n-k (k-th largest position), done. Otherwise recurse on relevant half only.`,
          code: `var findKthLargest = function(nums, k) {
    const target=nums.length-k;
    const qs=(lo,hi)=>{
        const pivot=nums[hi];
        let i=lo;
        for(let j=lo;j<hi;j++) if(nums[j]<=pivot)[nums[i],nums[j]]=[nums[j],nums[i++]];
        [nums[i],nums[hi]]=[nums[hi],nums[i]];
        if(i===target) return nums[i];
        return i<target?qs(i+1,hi):qs(lo,i-1);
    };
    return qs(0,nums.length-1);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'K Closest Points to Origin',
      url: 'https://leetcode.com/problems/k-closest-points-to-origin/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: QuickSelect on squared distance — O(n) average',
          explanation: `Like k-th smallest but the "value" is x²+y². QuickSelect partitions by squared distance until we have k smallest at front.`,
          code: `var kClosest = function(points, k) {
    const dist=p=>p[0]**2+p[1]**2;
    const qs=(lo,hi)=>{
        if(lo>=hi) return;
        const pivot=dist(points[hi]);
        let i=lo;
        for(let j=lo;j<hi;j++) if(dist(points[j])<=pivot)[points[i],points[j]]=[points[j],points[i++]];
        [points[i],points[hi]]=[points[hi],points[i]];
        if(i>=k-1) qs(lo,i-1);
        if(i<k-1) qs(i+1,hi);
    };
    qs(0,points.length-1);
    return points.slice(0,k);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'K-th Smallest Element in a Sorted Matrix',
      url: 'https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Binary search on value — O(n log(max-min))',
          explanation: `Binary search on the answer value. For a given mid, count elements ≤ mid using a staircase traversal (start top-right, go left if ≤, down if >). The answer is the smallest value where count ≥ k.`,
          code: `var kthSmallest = function(matrix, k) {
    const n=matrix.length;
    let lo=matrix[0][0], hi=matrix[n-1][n-1];
    const count=v=>{let c=0,r=n-1,col=0;while(r>=0&&col<n){if(matrix[r][col]<=v){c+=r+1;col++;}else r--;}return c;};
    while(lo<hi){const mid=lo+((hi-lo)>>1);count(mid)>=k?hi=mid:lo=mid+1;}
    return lo;
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Min-heap merge — O(k log n)',
          explanation: `Use min-heap initialized with first element of each row. Pop k times. Each pop: push the next element from that row. The k-th pop is the answer.`,
          code: `var kthSmallest = function(matrix, k) {
    // Min-heap: [val, row, col]
    const heap=matrix.map((r,i)=>[r[0],i,0]);
    heap.sort((a,b)=>a[0]-b[0]); // initial sort
    let ans=0;
    for(let i=0;i<k;i++){
        heap.sort((a,b)=>a[0]-b[0]);
        const [val,r,c]=heap.shift();
        ans=val;
        if(c+1<matrix[r].length) heap.push([matrix[r][c+1],r,c+1]);
    }
    return ans;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Kth Smallest in Lexicographical Order',
      url: 'https://leetcode.com/problems/k-th-smallest-in-lexicographical-order/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Count prefix subtree size, skip or descend',
          explanation: `Walk the lexicographic trie without building it. At each step, count how many numbers in [1,n] start with the current prefix. If count ≤ k, skip this prefix (k -= count, move to next sibling). If count > k, descend (k -= 1, go deeper by appending digit).`,
          code: `var findKthNumber = function(n, k) {
    const countPrefix=(curr,next)=>{
        let count=0;
        while(curr<=n){count+=Math.min(next,n+1)-curr;curr*=10;next*=10;}
        return count;
    };
    let curr=1; k--;
    while(k>0){
        const count=countPrefix(curr,curr+1);
        if(count<=k){k-=count;curr++;} // skip subtree
        else{k--;curr*=10;} // descend into subtree
    }
    return curr;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'K-th Largest Element in a Stream',
      url: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Min-heap of size k — top is always k-th largest',
          explanation: `Maintain a min-heap of the k largest elements seen so far. The minimum of this heap = k-th largest. For each new element: if > heap.min, replace min with new element. Heap.min is always the answer.`,
          code: `class KthLargest {
    constructor(k, nums) {
        this.k=k; this.heap=[]; // min-heap
        for(const n of nums) this.add(n);
    }
    add(val) {
        // Simulate heap (sort for simplicity; use real heap in production)
        this.heap.push(val);
        this.heap.sort((a,b)=>a-b);
        if(this.heap.length>this.k) this.heap.shift(); // remove min
        return this.heap[0]; // k-th largest = min of heap
    }
}`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🏆',
      color: 'amber',
      content: `**K-th element algorithm selector:**\n- Array, single k-th → QuickSelect O(n) average\n- Stream / online (elements arrive one by one) → min-heap of size k\n- Sorted matrix → binary search on value O(n log range)\n- BST k-th smallest → inorder traversal, stop at k\n- Two sorted arrays, median → binary search on partition O(log min(m,n))\n- Lexicographic k-th → count prefix sizes, skip/descend O(log²n)\n- Top-k from multiple sorted lists → min-heap with pointers O(k log k)`,
    },
  ],
}
