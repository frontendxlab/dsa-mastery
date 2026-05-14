import type { Article } from '../articles'

export const advancedTreesArticle: Article = {
  slug: 'advanced-trees',
  title: 'Advanced Tree Structures',
  emoji: '🌲',
  tagline: 'Segment tree for range queries. Fenwick for prefix sums. O(log n) both.',
  description: 'Segment trees and Fenwick/Binary Indexed Trees solve range queries and point updates in O(log n). Learn when to use each, how to build them, and the lazy propagation pattern for range updates.',
  gradient: 'from-lime-400 to-green-500',
  topicSlug: 'advanced_tree',
  readTime: '20 min',
  sections: [
    {
      type: 'text',
      content: `When a problem needs repeated range queries (sum, min, max) with point updates, a flat array is O(n) per query and a prefix sum is O(n) per update. Both Fenwick tree and Segment tree give O(log n) for both operations — the choice is between simplicity (Fenwick, only works for invertible operations) and generality (Segment, works for anything).`,
    },
    {
      type: 'table',
      headers: ['Structure', 'Build', 'Query', 'Update', 'Supports'],
      rows: [
        ['Prefix Sum', 'O(n)', 'O(1)', 'O(n)', 'Sum only, no updates'],
        ['Fenwick (BIT)', 'O(n log n)', 'O(log n)', 'O(log n)', 'Prefix sum, invertible ops'],
        ['Segment Tree', 'O(n)', 'O(log n)', 'O(log n)', 'Sum, min, max, GCD, any associative op'],
        ['Seg Tree + Lazy', 'O(n)', 'O(log n)', 'O(log n)', 'Range updates (add, set)'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Fenwick Tree (Binary Indexed Tree)',
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'teal',
      content: `**The key trick**: \`i & (-i)\` isolates the lowest set bit of i. In Fenwick tree:\n- **Update**: travel up by adding \`i & (-i)\` — propagates change to all ancestors\n- **Query**: travel down by subtracting \`i & (-i)\` — sums up all relevant ranges`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Fenwick Tree — point update, prefix sum query',
      code: `class FenwickTree {
    constructor(n) {
        this.n = n;
        this.tree = new Array(n + 1).fill(0);
    }
    update(i, delta) {    // 1-indexed
        for (; i <= this.n; i += i & (-i))
            this.tree[i] += delta;
    }
    query(i) {             // prefix sum [1..i]
        let sum = 0;
        for (; i > 0; i -= i & (-i))
            sum += this.tree[i];
        return sum;
    }
    rangeQuery(l, r) {     // sum [l..r]
        return this.query(r) - this.query(l - 1);
    }
}`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Segment Tree',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Segment Tree — range sum, point update',
      code: `class SegmentTree {
    constructor(arr) {
        this.n = arr.length;
        this.tree = new Array(4 * this.n).fill(0);
        this.build(arr, 0, 0, this.n - 1);
    }
    build(arr, node, start, end) {
        if (start === end) { this.tree[node] = arr[start]; return; }
        const mid = (start + end) >> 1;
        this.build(arr, 2*node+1, start, mid);
        this.build(arr, 2*node+2, mid+1, end);
        this.tree[node] = this.tree[2*node+1] + this.tree[2*node+2];
    }
    update(node, start, end, idx, val) {
        if (start === end) { this.tree[node] = val; return; }
        const mid = (start + end) >> 1;
        if (idx <= mid) this.update(2*node+1, start, mid, idx, val);
        else this.update(2*node+2, mid+1, end, idx, val);
        this.tree[node] = this.tree[2*node+1] + this.tree[2*node+2];
    }
    query(node, start, end, l, r) {
        if (r < start || end < l) return 0;      // out of range
        if (l <= start && end <= r) return this.tree[node]; // full overlap
        const mid = (start + end) >> 1;
        return this.query(2*node+1, start, mid, l, r)
             + this.query(2*node+2, mid+1, end, l, r);
    }
    // Public API
    set(idx, val) { this.update(0, 0, this.n-1, idx, val); }
    sum(l, r) { return this.query(0, 0, this.n-1, l, r); }
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
      title: 'Range Sum Query — Mutable',
      url: 'https://leetcode.com/problems/range-sum-query-mutable/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Fenwick Tree — O(log n) both',
          explanation: `Classic Fenwick tree problem. Build from array, update in O(log n), prefix sum query in O(log n). Range sum = prefix(r) - prefix(l-1).`,
          code: `var NumArray = function(nums) {
    this.n = nums.length;
    this.bit = new Array(this.n + 1).fill(0);
    nums.forEach((v, i) => this.update(i, v));
};
NumArray.prototype.update = function(index, val) {
    const delta = val - (this.sumRange(index, index));
    for (let i = index + 1; i <= this.n; i += i & (-i)) this.bit[i] += delta;
};
NumArray.prototype.sumRange = function(left, right) {
    const prefix = (i) => { let s = 0; for (++i; i > 0; i -= i&(-i)) s += this.bit[i]; return s; };
    return prefix(right) - prefix(left - 1);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Count of Smaller Numbers After Self',
      url: 'https://leetcode.com/problems/count-of-smaller-numbers-after-self/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Fenwick tree with coordinate compression',
          explanation: `Process from right to left. For each element: query BIT for count of elements already processed (to the right) that are smaller. Then add current element to BIT.\n\nCoordinate compress values to [1..n] range since BIT is index-based.`,
          code: `var countSmaller = function(nums) {
    // Coordinate compression
    const sorted = [...new Set(nums)].sort((a,b) => a-b);
    const rank = new Map(sorted.map((v, i) => [v, i + 1]));
    const n = nums.length, bit = new Array(sorted.length + 1).fill(0);

    const update = (i) => { for (; i < bit.length; i += i&(-i)) bit[i]++; };
    const query = (i) => { let s = 0; for (; i > 0; i -= i&(-i)) s += bit[i]; return s; };

    const result = new Array(n);
    for (let i = n - 1; i >= 0; i--) {
        const r = rank.get(nums[i]);
        result[i] = query(r - 1);
        update(r);
    }
    return result;
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
      num: 4,
      title: 'Range Sum Query — Mutable',
      url: 'https://leetcode.com/problems/range-sum-query-mutable/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Brute force — O(n) query, O(1) update',
          explanation: 'Sum by iterating; update in O(1). Too slow for many queries.',
        },
        {
          label: 'Intuition 2: Fenwick Tree — O(log n) for both update and query',
          explanation: 'BIT: update one element and query prefix sum both in O(log n). Range sum = prefix(right) - prefix(left-1).',
          code: `class NumArray {
    constructor(nums) {
        this.n = nums.length;
        this.bit = new Array(this.n + 1).fill(0);
        for (let i = 0; i < nums.length; i++) this._update(i+1, nums[i]);
    }
    _update(i, delta) { for (; i <= this.n; i += i&(-i)) this.bit[i] += delta; }
    _query(i) { let s=0; for (; i>0; i -= i&(-i)) s+=this.bit[i]; return s; }
    update(i, val) {
        const diff = val - (this._query(i+1) - this._query(i)); // current value
        this._update(i+1, diff);
    }
    sumRange(l, r) { return this._query(r+1) - this._query(l); }
}`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Longest Increasing Subsequence (with BIT for O(n log n))',
      url: 'https://leetcode.com/problems/longest-increasing-subsequence/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: O(n²) DP — for each i, check all j < i',
          explanation: 'dp[i] = max dp[j]+1 for all j < i where nums[j] < nums[i]. O(n²).',
        },
        {
          label: 'Intuition 2: O(n log n) — patience sorting with binary search',
          explanation: 'Maintain "tails" array: tails[i] = smallest tail element of all increasing subsequences of length i+1. For each num, binary search for insertion position. Length of tails = LIS length.',
          code: `var lengthOfLIS = function(nums) {
    const tails = [];
    for (const num of nums) {
        let lo=0, hi=tails.length;
        while (lo<hi) { const mid=(lo+hi)>>1; if(tails[mid]<num) lo=mid+1; else hi=mid; }
        tails[lo] = num; // replace or extend
    }
    return tails.length;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🔑',
      color: 'amber',
      content: `**When to use Fenwick vs Segment Tree:**\n- Fenwick: simpler code, only works for operations with inverses (sum, xor). Not for min/max.\n- Segment Tree: more code, works for ANY associative operation (sum, min, max, GCD, product mod p).\n\nFor range UPDATES (add delta to all elements in [l..r]): need lazy propagation on Segment Tree or difference array trick.`,
    },
  ],
}
