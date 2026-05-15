import type { Article } from '../articles'

export const segmentTreeLazyArticle: Article = {
  slug: 'segment-tree-lazy',
  title: 'Segment Tree: Lazy Propagation',
  emoji: '🌳',
  tagline: 'Range update in O(log n). Defer the work until you actually need it.',
  description: 'Lazy propagation extends Segment Trees to support range updates (add/set all elements in [l..r]) in O(log n). Without lazy, range updates are O(n). The insight: defer updates by storing a "pending" tag at each node, propagating it only when you need to visit children.',
  gradient: 'from-lime-600 to-green-700',
  topicSlug: 'advanced_tree',
  readTime: '20 min',
  sections: [
    {
      type: 'text',
      content: `Basic segment tree handles point updates + range queries in O(log n). But if you need range updates (add 5 to all elements in [l,r]), the naive approach visits all O(n) elements. Lazy propagation fixes this by storing a pending update at a node and only pushing it down when you need to visit the children. The subtree root always has the correct answer; the pending tag ensures children will be updated when visited.`,
    },
    {
      type: 'table',
      headers: ['Operation', 'Without Lazy', 'With Lazy'],
      rows: [
        ['Point update', 'O(log n)', 'O(log n)'],
        ['Range update (add to all in [l,r])', 'O(n)', 'O(log n)'],
        ['Range query (sum/min/max of [l,r])', 'O(log n)', 'O(log n)'],
        ['Build', 'O(n)', 'O(n)'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Lazy Segment Tree Template',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Range add + range sum with lazy propagation',
      code: `class LazySegTree {
    constructor(n) {
        this.n = n;
        this.tree = new Array(4 * n).fill(0);  // sum at each node
        this.lazy = new Array(4 * n).fill(0);  // pending add for whole subtree
    }

    // Push down pending update to children
    _push(node, start, end) {
        if (this.lazy[node] === 0) return;
        const mid = (start + end) >> 1;
        const left = 2*node+1, right = 2*node+2;
        // Apply lazy to children
        this.tree[left]  += this.lazy[node] * (mid - start + 1);
        this.tree[right] += this.lazy[node] * (end - mid);
        this.lazy[left]  += this.lazy[node];
        this.lazy[right] += this.lazy[node];
        this.lazy[node] = 0; // clear pending
    }

    // Range update: add val to all elements in [l, r]
    update(node, start, end, l, r, val) {
        if (r < start || end < l) return; // out of range
        if (l <= start && end <= r) {     // fully covered
            this.tree[node] += val * (end - start + 1);
            this.lazy[node] += val;
            return;
        }
        this._push(node, start, end);
        const mid = (start + end) >> 1;
        this.update(2*node+1, start, mid, l, r, val);
        this.update(2*node+2, mid+1, end, l, r, val);
        this.tree[node] = this.tree[2*node+1] + this.tree[2*node+2];
    }

    // Range query: sum of [l, r]
    query(node, start, end, l, r) {
        if (r < start || end < l) return 0;
        if (l <= start && end <= r) return this.tree[node];
        this._push(node, start, end);
        const mid = (start + end) >> 1;
        return this.query(2*node+1, start, mid, l, r)
             + this.query(2*node+2, mid+1, end, l, r);
    }

    // Public API
    rangeAdd(l, r, val) { this.update(0, 0, this.n-1, l, r, val); }
    rangeSum(l, r) { return this.query(0, 0, this.n-1, l, r); }
}`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Range Set Variant',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Range set (assign all to val) instead of range add',
      code: `// For "set all elements in [l,r] to val" operations:
// Use a different lazy encoding: lazy[node] = -1 means "no pending",
// any other value means "set all to this value"

class LazySetSegTree {
    constructor(n) {
        this.n = n;
        this.tree = new Array(4*n).fill(0);
        this.lazy = new Array(4*n).fill(-1); // -1 = no pending
    }
    _push(node, start, end) {
        if (this.lazy[node] === -1) return;
        const mid = (start+end)>>1, val = this.lazy[node];
        const l=2*node+1, r=2*node+2;
        this.tree[l] = val * (mid-start+1);
        this.tree[r] = val * (end-mid);
        this.lazy[l] = this.lazy[r] = val;
        this.lazy[node] = -1;
    }
    rangeSet(node, start, end, l, r, val) {
        if(r<start||end<l) return;
        if(l<=start&&end<=r){this.tree[node]=val*(end-start+1);this.lazy[node]=val;return;}
        this._push(node,start,end);
        const mid=(start+end)>>1;
        this.rangeSet(2*node+1,start,mid,l,r,val);
        this.rangeSet(2*node+2,mid+1,end,l,r,val);
        this.tree[node]=this.tree[2*node+1]+this.tree[2*node+2];
    }
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
          label: 'Intuition 1: Fenwick Tree — simpler for point update + range sum',
          explanation: `Point update + range sum → Fenwick tree is simpler (O(log n) both). Lazy seg tree is overkill here but demonstrates the pattern.`,
          code: `class NumArray {
    constructor(nums) {
        this.n=nums.length;
        this.bit=new Array(this.n+1).fill(0);
        for(let i=0;i<nums.length;i++) this._update(i+1,nums[i]);
    }
    _update(i,d){for(;i<=this.n;i+=i&(-i))this.bit[i]+=d;}
    _query(i){let s=0;for(;i>0;i-=i&(-i))s+=this.bit[i];return s;}
    update(i,v){const diff=v-(this._query(i+1)-this._query(i));this._update(i+1,diff);}
    sumRange(l,r){return this._query(r+1)-this._query(l);}
}`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Count of Range Sum',
      url: 'https://leetcode.com/problems/count-of-range-sum/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Merge sort on prefix sums',
          explanation: `Count pairs (i,j) where lower ≤ prefix[j]-prefix[i] ≤ upper. During merge of left and right halves, use two pointers to count valid pairs across the split. This is the standard merge sort counting approach.`,
          code: `// See counting-patterns article for full implementation`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'My Calendar III (max k-booking)',
      url: 'https://leetcode.com/problems/my-calendar-iii/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Lazy segment tree — range add + range max query',
          explanation: `For each booking [start, end), do range add +1 on [start, end). Query for global maximum. Lazy segment tree: range add covers O(log n) nodes, range max query returns root's value.`,
          code: `class MyCalendarThree {
    constructor() {
        this.tree={}, this.lazy={};
    }
    update(node, start, end, l, r, val) {
        if(r<=start||end<=l) return;
        if(l<=start&&end<=r){
            this.tree[node]=(this.tree[node]??0)+val;
            this.lazy[node]=(this.lazy[node]??0)+val;
            return;
        }
        const mid=(start+end)>>1;
        this.update(2*node,start,mid,l,r,val);
        this.update(2*node+1,mid,end,l,r,val);
        this.tree[node]=Math.max(this.tree[2*node]??0,this.tree[2*node+1]??0)+(this.lazy[node]??0);
    }
    book(start, end) {
        this.update(1,0,1e9,start,end,1);
        return this.tree[1]??0;
    }
}`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'The Skyline Problem',
      url: 'https://leetcode.com/problems/the-skyline-problem/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Sweep line with max-heap',
          explanation: `Sort events (building start with -height and end with +height). Process events in order. At building start, add height to a max-heap. At building end, remove height. The skyline changes when heap's max changes. Use a sorted map for height → count to handle lazy deletion.`,
          code: `var getSkyline = function(buildings) {
    const events=[];
    for(const [l,r,h] of buildings){events.push([l,-h]);events.push([r,h]);}
    events.sort((a,b)=>a[0]-b[0]||(a[1]-b[1]));
    const result=[];
    // Use a sorted multiset (simulate with sorted array for clarity)
    const heights=[0]; // always has 0
    let prevMax=0;
    for(const [x,h] of events){
        if(h<0) heights.push(-h);  // building start: add height
        else heights.splice(heights.indexOf(h),1); // building end: remove
        heights.sort((a,b)=>b-a);
        const cur=heights[0];
        if(cur!==prevMax){result.push([x,cur]);prevMax=cur;}
    }
    return result;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🔑',
      color: 'lime',
      content: `**Lazy propagation rules:**\n1. When a node is FULLY covered by the update range: update tree[node] and lazy[node], STOP (don't recurse)\n2. When a node is PARTIALLY covered: push down first (_push), then recurse to children, then pull up (tree[node] = combine children)\n3. In _push: apply lazy to children's tree and lazy values, then clear parent's lazy\n\n**The lazy value accumulates:** multiple range-adds stack up in lazy[node]. When you push down, you pass the accumulated value to children.\n\n**Range set vs range add:** Need different "no-op" sentinel (-1 for set, 0 for add). They can be combined but gets complex.`,
    },
  ],
}
