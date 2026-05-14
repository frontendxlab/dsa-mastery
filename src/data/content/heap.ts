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
  ],
}
