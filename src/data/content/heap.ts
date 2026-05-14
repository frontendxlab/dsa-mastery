import type { Article } from '../articles'

export const heapArticle: Article = {
  slug: 'heap',
  title: 'Heap & Priority Queue',
  emoji: '📦',
  tagline: 'O(log n) access to the min or max. Always.',
  description: 'Heaps power the top-K, merge K sorted, and median maintenance patterns. Learn when to use min-heap vs max-heap, the two-heap trick for medians, and heap-based graph algorithms.',
  gradient: 'from-red-400 to-rose-500',
  topicSlug: 'heap',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `A heap gives you O(log n) insert and O(1) peek at the minimum (min-heap) or maximum (max-heap). The key patterns: keep a heap of size k to maintain the top-k elements, use two heaps to maintain a running median, and use min-heap for Dijkstra's shortest path.`,
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'red',
      content: `**Min-heap vs Max-heap choice**:\n- "Find kth LARGEST" → use **min-heap of size k** (smallest of the k largest is at top)\n- "Find kth SMALLEST" → use **max-heap of size k** (largest of the k smallest is at top)\n- "Running median" → two heaps: max-heap for lower half, min-heap for upper half`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Pattern Recognition',
    },
    {
      type: 'table',
      headers: ['Problem Signal', 'Heap Strategy'],
      rows: [
        ['"kth largest / smallest"', 'Min/max-heap of size k'],
        ['"top k frequent"', 'Build frequency map, heap on frequencies'],
        ['"merge k sorted lists"', 'Min-heap holding current head of each list'],
        ['"running median"', 'Two heaps: lower-half max-heap + upper-half min-heap'],
        ['"shortest path (weighted)"', 'Min-heap Dijkstra: [dist, node]'],
        ['"task scheduler"', 'Max-heap by frequency, simulate rounds'],
      ],
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
          explanation: `Sort descending, return index k-1. Simple but doesn't use heap efficiently.`,
        },
        {
          label: 'Intuition 2: Min-heap of size k — O(n log k)',
          explanation: `Maintain a min-heap of size k. For each element: push it. If heap size > k, pop the smallest. After processing all elements, the heap contains exactly the k largest, and the root (minimum of those k) is the kth largest.`,
          code: `// Using MinPriorityQueue (LeetCode built-in) or manual implementation
var findKthLargest = function(nums, k) {
    const pq = new MinPriorityQueue();
    for (const n of nums) {
        pq.enqueue(n);
        if (pq.size() > k) pq.dequeue();  // remove smallest, keep k largest
    }
    return pq.dequeue().element;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Kth Largest Sum in a Binary Tree',
      url: 'https://leetcode.com/problems/kth-largest-sum-in-a-binary-tree/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Level-order BFS + min-heap of size k',
          explanation: `Level-order traversal to compute sum of each level. Maintain a min-heap of size k over those level sums. Same pattern as kth largest — min-heap of size k, root = kth largest.`,
          code: `var kthLargestLevelSum = function(root, k) {
    const pq = new MinPriorityQueue();
    const q = new Queue([root]);
    while (!q.isEmpty()) {
        const size = q.size();
        let sum = 0;
        for (let i = 0; i < size; i++) {
            const node = q.dequeue();
            sum += node.val;
            if (node.left) q.enqueue(node.left);
            if (node.right) q.enqueue(node.right);
        }
        pq.enqueue(sum);
        if (pq.size() > k) pq.dequeue();
    }
    if (pq.size() < k) return -1;
    return pq.dequeue().element;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Find Median from Data Stream',
      url: 'https://leetcode.com/problems/find-median-from-data-stream/',
      difficulty: 'Hard',
      note: 'Two-heap trick — most elegant heap problem.',
      intuitions: [
        {
          label: 'Intuition 1: Two heaps — lower half max-heap, upper half min-heap',
          explanation: `Split stream into lower half (max-heap) and upper half (min-heap). Invariant: lower.size() === upper.size() OR lower.size() === upper.size() + 1.\n\nAddNum: always push to lower first, then rebalance. Pop from lower into upper. If upper becomes bigger, pop from upper into lower.\n\nFindMedian: if sizes equal → (lower.top + upper.top) / 2. If lower bigger → lower.top.`,
          code: `class MedianFinder {
    constructor() {
        this.lower = new MaxPriorityQueue();  // lower half
        this.upper = new MinPriorityQueue();  // upper half
    }
    addNum(num) {
        this.lower.enqueue(num);
        // ensure lower's max ≤ upper's min
        this.upper.enqueue(this.lower.dequeue().element);
        // rebalance sizes
        if (this.upper.size() > this.lower.size())
            this.lower.enqueue(this.upper.dequeue().element);
    }
    findMedian() {
        if (this.lower.size() > this.upper.size())
            return this.lower.front().element;
        return (this.lower.front().element + this.upper.front().element) / 2;
    }
}`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Top K Frequent Elements',
      url: 'https://leetcode.com/problems/top-k-frequent-elements/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Build frequency map, heap on frequencies',
          explanation: `Count frequencies with a hashmap. Then maintain a min-heap of size k keyed by frequency. After processing all elements, the heap contains the k most frequent elements.`,
          code: `var topKFrequent = function(nums, k) {
    const freq = new Map();
    for (const n of nums) freq.set(n, (freq.get(n) || 0) + 1);

    const pq = new MinPriorityQueue({ priority: x => x[1] });
    for (const [val, count] of freq) {
        pq.enqueue([val, count]);
        if (pq.size() > k) pq.dequeue();
    }
    return pq.toArray().map(x => x.element[0]);
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
      title: 'K Closest Points to Origin',
      url: 'https://leetcode.com/problems/k-closest-points-to-origin/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Sort by squared distance — O(n log n)',
          explanation: 'Compute x²+y² (no sqrt needed — monotone). Sort ascending. Return first k. Simple but processes all n points.',
          code: `var kClosest = function(points, k) {
    return points.sort((a,b)=>(a[0]*a[0]+a[1]*a[1])-(b[0]*b[0]+b[1]*b[1])).slice(0,k);
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Max-heap of size k — O(n log k), better for streaming',
          explanation: 'Maintain max-heap of size k (keyed by distance). For each point, add it; if size > k, pop the farthest. Heap always holds the k closest seen so far.',
          code: `var kClosest = function(points, k) {
    const heap = new MinPriorityQueue({ priority: x => -(x[0]*x[0]+x[1]*x[1]) });
    for (const p of points) {
        heap.enqueue(p);
        if (heap.size() > k) heap.dequeue();
    }
    return heap.toArray().map(x => x.element);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 6,
      title: 'Merge K Sorted Lists',
      url: 'https://leetcode.com/problems/merge-k-sorted-lists/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: O(kN) brute force — merge lists one by one',
          explanation: 'Merge lists[0] and lists[1], then merge result with lists[2], etc. Each merge is O(N) total, done k-1 times = O(kN).',
        },
        {
          label: 'Intuition 2: O(N log k) min-heap — always pop the globally smallest',
          explanation: 'Push the head of each list into a min-heap. Pop the minimum, advance that list\'s pointer and push the next node. Each of N nodes gets pushed/popped once = O(N log k).',
          code: `var mergeKLists = function(lists) {
    const dummy = new ListNode(0);
    let curr = dummy;
    // Min-heap: [value, listIndex, node]
    const heap = new MinPriorityQueue({ priority: x => x[0] });
    for (let i = 0; i < lists.length; i++)
        if (lists[i]) heap.enqueue([lists[i].val, i, lists[i]]);
    while (!heap.isEmpty()) {
        const [, i, node] = heap.dequeue().element;
        curr.next = node;
        curr = curr.next;
        if (node.next) heap.enqueue([node.next.val, i, node.next]);
    }
    return dummy.next;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Two-Heap Pattern',
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'blue',
      content: `**Two heaps** split data into two halves:\n- **Max-heap** (lower half): top = largest of the smaller half\n- **Min-heap** (upper half): top = smallest of the larger half\n\nMedian = average of both tops (even count) or top of larger heap (odd count).\n\nBalance rule: sizes differ by at most 1. After every insert, rebalance if needed.`,
    },
    {
      type: 'problem',
      num: 7,
      title: 'Find Median from Data Stream',
      url: 'https://leetcode.com/problems/find-median-from-data-stream/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Sort on every query — O(n log n) per query',
          explanation: `Store all numbers. On findMedian, sort and return middle. Too slow for large streams.`,
        },
        {
          label: 'Intuition 2: Two heaps — max-heap (lower) + min-heap (upper), O(log n) add O(1) find',
          explanation: `Maintain lower = max-heap (left half), upper = min-heap (right half). Every number in lower ≤ every number in upper. Add num: push to lower, then rebalance by moving max(lower) to upper if lower.top > upper.top. Keep sizes within 1. Median = top of larger heap or average of both tops.`,
          code: `class MedianFinder {
    constructor() {
        // JS doesn't have built-in heap — simulate with sorted array for clarity
        // In production: use a proper min/max heap implementation
        this.lower = [];  // max-heap (negate values to simulate)
        this.upper = [];  // min-heap
    }
    // Helper: binary insertion into sorted array (simulation)
    _insert(arr, val, asc = true) {
        let lo = 0, hi = arr.length;
        while (lo < hi) { const mid = (lo+hi)>>1; arr[mid] < val === asc ? lo=mid+1 : hi=mid; }
        arr.splice(lo, 0, val);
    }
    addNum(num) {
        this._insert(this.lower, num, false); // insert descending
        // Balance: move max of lower to upper
        this.upper.unshift(this.lower.shift());  // simplified
        this._insert(this.upper, this.upper.shift(), true);
        if (this.upper.length > this.lower.length)
            this.lower.unshift(this.upper.shift());
    }
    findMedian() {
        return this.lower.length > this.upper.length
            ? this.lower[0]
            : (this.lower[0] + this.upper[0]) / 2;
    }
}

// Clean two-heap template (conceptual — replace array ops with real heap):
// addNum(num):
//   1. Push to lower (max-heap)
//   2. Push lower.pop() to upper (min-heap)  → ensures lower.max <= upper.min
//   3. If upper.size > lower.size: push upper.pop() to lower  → rebalance
// findMedian():
//   lower.size > upper.size ? lower.top : (lower.top + upper.top) / 2`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 8,
      title: 'IPO (maximize capital with limited projects)',
      url: 'https://leetcode.com/problems/ipo/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Greedy with two heaps — min-heap by capital, max-heap by profit',
          explanation: `Greedy: at each step, pick the highest-profit project we can afford. Use a min-heap sorted by required capital (to find newly affordable projects) and a max-heap by profit (to pick the best among affordable ones). For each of k rounds: move all newly affordable projects to max-heap, pick the max-profit one.`,
          code: `var findMaximizedCapital = function(k, w, profits, capital) {
    const n = profits.length;
    // Sort by capital requirement
    const byCapital = profits.map((p,i)=>[capital[i],p]).sort((a,b)=>a[0]-b[0]);
    // Max-heap by profit (simulate with array + sort)
    const available = [];
    let i = 0;
    for (let round = 0; round < k; round++) {
        // Add all projects we can afford
        while (i < n && byCapital[i][0] <= w) available.push(byCapital[i++][1]);
        if (!available.length) break;
        available.sort((a,b) => b-a);  // max first
        w += available.shift();         // take highest profit
    }
    return w;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧠',
      color: 'teal',
      content: `**Heap pattern selector:**\n- "k-th largest/smallest overall" → min-heap of size k\n- "k-th largest in stream" → maintain min-heap of size k, top = answer\n- "merge k sorted lists/arrays" → min-heap of size k (one per list)\n- "find median from stream" → two heaps (max-heap lower half + min-heap upper half)\n- "Dijkstra / Prim's / scheduling" → min-heap with (cost, node)\n- "maximize under budget constraint" → min-heap by cost + max-heap by benefit (IPO pattern)\n- "sliding window median" → two heaps with lazy deletion`,
    },
  ],
}
