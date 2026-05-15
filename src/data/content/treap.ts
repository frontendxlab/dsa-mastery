import type { Article } from '../articles'

export const treapArticle: Article = {
  slug: 'treap',
  title: 'Treap & Ordered Set',
  emoji: '🎯',
  tagline: 'BST + heap priorities. Split and merge in O(log n). Dynamic order statistics.',
  description: 'A treap is a randomized binary search tree that maintains heap property on random priorities. It supports split (divide by key) and merge (combine two treaps) in O(log n) expected time. This enables: insert/delete in O(log n), k-th element, rank queries, range operations. In JavaScript, use a sorted array + binary search for interview problems; treap for competitive programming.',
  gradient: 'from-orange-600 to-red-600',
  topicSlug: 'dp',
  readTime: '15 min',
  sections: [
    {
      type: 'text',
      content: `A treap node has a key (BST property: left < node < right) and a random priority (heap property: node.priority > children.priority). The random priorities make the tree balanced with high probability (O(log n) height). Split by key: recursively split left or right subtree depending on key comparison. Merge two treaps: always take the one with higher priority root, recurse on its subtree.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Treap with split/merge operations',
      code: `class TreapNode {
    constructor(key) {
        this.key = key;
        this.priority = Math.random();
        this.left = this.right = null;
        this.size = 1;
    }
}

function size(node) { return node ? node.size : 0; }
function upd(node) { if (node) node.size = 1 + size(node.left) + size(node.right); }

// Split: returns [left, right] where left has keys < key, right has keys >= key
function split(node, key) {
    if (!node) return [null, null];
    if (node.key < key) {
        const [l, r] = split(node.right, key);
        node.right = l; upd(node);
        return [node, r];
    } else {
        const [l, r] = split(node.left, key);
        node.left = r; upd(node);
        return [l, node];
    }
}

// Merge: all keys in left must be < all keys in right
function merge(left, right) {
    if (!left) return right;
    if (!right) return left;
    if (left.priority > right.priority) {
        left.right = merge(left.right, right); upd(left); return left;
    } else {
        right.left = merge(left, right.left); upd(right); return right;
    }
}

// Insert key: split, create node, merge back
function insert(root, key) {
    const [l, r] = split(root, key);
    return merge(merge(l, new TreapNode(key)), r);
}

// Kth element (1-indexed)
function kth(node, k) {
    const ls = size(node.left);
    if (k === ls + 1) return node.key;
    if (k <= ls) return kth(node.left, k);
    return kth(node.right, k - ls - 1);
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
      title: 'Design a Sorted List (OrderedSet simulation)',
      url: 'https://leetcode.com/problems/design-a-number-container-system/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: HashMap + sorted structure per number',
          explanation: `Map from number → sorted set of indices. Map from index → number. Change: remove old index from old number's set, add to new number's set. Find minimum: return first element of number's sorted set.`,
          code: `class NumberContainers {
    constructor() { this.idx=new Map(); this.num=new Map(); }
    change(index, number) {
        if(this.idx.has(index)){
            const old=this.idx.get(index);
            this.num.get(old).delete(index);
        }
        this.idx.set(index,number);
        if(!this.num.has(number)) this.num.set(number,new Set());
        this.num.get(number).add(index);
    }
    find(number) {
        if(!this.num.has(number)||!this.num.get(number).size) return -1;
        return Math.min(...this.num.get(number)); // O(n) — use sorted set for O(log n)
    }
}`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Minimum Absolute Difference',
      url: 'https://leetcode.com/problems/minimum-absolute-difference-in-bst/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: In-order traversal of BST gives sorted order',
          explanation: `In-order traversal visits BST nodes in sorted order. Track previous node. Minimum diff = min over all consecutive pairs in sorted order.`,
          code: `var getMinimumDifference = function(root) {
    let prev=null, res=Infinity;
    const inorder=(node)=>{
        if(!node) return;
        inorder(node.left);
        if(prev!==null) res=Math.min(res,node.val-prev);
        prev=node.val;
        inorder(node.right);
    };
    inorder(root);
    return res;
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
          label: 'Intuition 1: Sorted insertion + binary search (ordered set simulation)',
          explanation: `Process right to left. Maintain sorted array. For each element, binary search for its insertion position = count of smaller elements to the right. Insert it. O(n log n) total.`,
          code: `var countSmaller = function(nums) {
    const sorted=[], res=new Array(nums.length);
    for(let i=nums.length-1;i>=0;i--){
        let lo=0,hi=sorted.length;
        while(lo<hi){const mid=(lo+hi)>>1;sorted[mid]<nums[i]?lo=mid+1:hi=mid;}
        res[i]=lo;
        sorted.splice(lo,0,nums[i]);
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
      title: 'My Calendar I, II, III',
      url: 'https://leetcode.com/problems/my-calendar-i/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Sorted intervals with binary search',
          explanation: `Maintain sorted list of [start, end] intervals. For new booking [s, e]: find insertion position via binary search. Check overlap with neighbors: new interval overlaps previous if prev.end > s, overlaps next if e > next.start.`,
          code: `class MyCalendar {
    constructor() { this.intervals=[]; }
    book(start, end) {
        const n=this.intervals.length;
        let lo=0,hi=n;
        while(lo<hi){const mid=(lo+hi)>>1;this.intervals[mid][0]<start?lo=mid+1:hi=mid;}
        // Check overlap with neighbors
        if(lo<n&&this.intervals[lo][0]<end) return false;
        if(lo>0&&this.intervals[lo-1][1]>start) return false;
        this.intervals.splice(lo,0,[start,end]);
        return true;
    }
}`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🎯',
      color: 'amber',
      content: `**Treap vs other ordered sets:**\n- Treap: randomized, expected O(log n), easy split/merge\n- AVL tree: deterministic O(log n), complex rotations\n- Skip list: randomized, simpler implementation than treap\n- Sorted array: O(n) insert, O(log n) search — good for small n or rare inserts\n\n**Treap key operations:**\n- insert(key): split at key, make node, merge back — O(log n)\n- delete(key): split at [key, key+1], discard middle, merge — O(log n)\n- kth(k): navigate using subtree sizes — O(log n)\n- rank(key): split at key, size of left part — O(log n)\n\n**In interviews:** Use sorted array + binary search (splice) for simplicity. Treap is overkill unless the problem specifically requires O(log n) insert + order statistics.`,
    },
  ],
}
