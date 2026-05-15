import type { Article } from '../articles'

export const segmentTreeBasicsArticle: Article = {
  slug: 'segment-tree-basics',
  title: 'Segment Tree Basics',
  emoji: '🌲',
  tagline: 'Point updates and range queries in O(log n). Build, query, update.',
  description: 'A segment tree is a complete binary tree where each node stores aggregate information about a contiguous range of an array. Each leaf = one element; each internal node = aggregate (sum/min/max) of its children\'s ranges. Build O(n), point update O(log n), range query O(log n). More flexible than Fenwick tree: supports min/max queries, not just prefix sums.',
  gradient: 'from-lime-700 to-green-800',
  topicSlug: 'tree',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `Segment tree stores aggregates at nodes. Node i covers a range; left child = node 2i, right child = node 2i+1 (1-indexed). Build by splitting range and combining children. Range query: recursively combine left/right where range overlaps. Point update: update the leaf, then propagate up. 1-indexed array of size 4n is sufficient for n elements.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Segment tree: sum with point update and range query',
      code: `class SegmentTree {
    constructor(n) {
        this.n = n;
        this.tree = new Array(4 * n).fill(0);
    }

    build(arr, node = 1, start = 0, end = this.n - 1) {
        if (start === end) { this.tree[node] = arr[start]; return; }
        const mid = (start + end) >> 1;
        this.build(arr, 2*node, start, mid);
        this.build(arr, 2*node+1, mid+1, end);
        this.tree[node] = this.tree[2*node] + this.tree[2*node+1];
    }

    update(idx, val, node = 1, start = 0, end = this.n - 1) {
        if (start === end) { this.tree[node] = val; return; }
        const mid = (start + end) >> 1;
        if (idx <= mid) this.update(idx, val, 2*node, start, mid);
        else this.update(idx, val, 2*node+1, mid+1, end);
        this.tree[node] = this.tree[2*node] + this.tree[2*node+1];
    }

    query(l, r, node = 1, start = 0, end = this.n - 1) {
        if (r < start || end < l) return 0; // identity for sum
        if (l <= start && end <= r) return this.tree[node];
        const mid = (start + end) >> 1;
        return this.query(l, r, 2*node, start, mid) +
               this.query(l, r, 2*node+1, mid+1, end);
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
      title: 'Range Sum Query - Mutable',
      url: 'https://leetcode.com/problems/range-sum-query-mutable/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Segment tree for O(log n) update and O(log n) range sum',
          explanation: `Build segment tree storing range sums. update(i, val): walk to leaf at index i, update it, propagate sums up. sumRange(l, r): query combining left/right subtrees where range intersects [l, r].`,
          code: `var NumArray = function(nums) {
    const n=this.n=nums.length;
    this.t=new Array(4*n).fill(0);
    const build=(node,s,e)=>{
        if(s===e){this.t[node]=nums[s];return;}
        const m=(s+e)>>1;
        build(2*node,s,m); build(2*node+1,m+1,e);
        this.t[node]=this.t[2*node]+this.t[2*node+1];
    };
    build(1,0,n-1);
};
NumArray.prototype.update = function(i,val) {
    const upd=(node,s,e)=>{
        if(s===e){this.t[node]=val;return;}
        const m=(s+e)>>1;
        i<=m?upd(2*node,s,m):upd(2*node+1,m+1,e);
        this.t[node]=this.t[2*node]+this.t[2*node+1];
    };
    upd(1,0,this.n-1);
};
NumArray.prototype.sumRange = function(l,r) {
    const qry=(node,s,e)=>{
        if(r<s||e<l) return 0;
        if(l<=s&&e<=r) return this.t[node];
        const m=(s+e)>>1;
        return qry(2*node,s,m)+qry(2*node+1,m+1,e);
    };
    return qry(1,0,this.n-1);
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
          label: 'Intuition 1: Segment tree on coordinate-compressed values, scan right to left',
          explanation: `Coordinate compress values. Scan from right to left. For each element, query segment tree for count of elements already inserted that are less than current (prefix sum [0..val-1]). Then insert current element. O(n log n).`,
          code: `var countSmaller = function(nums) {
    const sorted=[...new Set(nums)].sort((a,b)=>a-b);
    const rank=new Map(sorted.map((v,i)=>[v,i+1]));
    const n=sorted.length;
    const tree=new Array(n+1).fill(0);
    const update=i=>{for(;i<=n;i+=i&-i) tree[i]++;};
    const query=i=>{let s=0;for(;i>0;i-=i&-i) s+=tree[i];return s;};
    const res=[];
    for(let i=nums.length-1;i>=0;i--){
        const r=rank.get(nums[i]);
        res.push(query(r-1));
        update(r);
    }
    return res.reverse();
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'My Calendar I',
      url: 'https://leetcode.com/problems/my-calendar-i/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Dynamic segment tree or sorted list for interval overlap detection',
          explanation: `Use a sorted array of booked intervals. For each new booking [start,end): binary search for the first interval with end > start. Check if that interval's start < end (overlap). If no overlap, insert.`,
          code: `var MyCalendar = function() {
    this.books=[];
};
MyCalendar.prototype.book = function(start, end) {
    for(const [s,e] of this.books)
        if(Math.max(s,start)<Math.min(e,end)) return false;
    this.books.push([start,end]);
    return true;
};`,
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
          label: 'Intuition 1: Sweep line with max-heap of active building heights',
          explanation: `Process events: building start adds height, building end removes height. Sort events (x, height: negative for start, positive for end). Use max-heap. At each x, if max height changes, it's a critical point. Add to result.`,
          code: `var getSkyline = function(buildings) {
    const events=[];
    for(const [l,r,h] of buildings){
        events.push([l,-h]); // start: negative height
        events.push([r,h]);  // end: positive height
    }
    events.sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
    const res=[];
    // Multiset simulation with sorted array
    const heights=[0];
    let prev=0;
    for(const [x,h] of events){
        if(h<0) heights.push(-h);
        else heights.splice(heights.indexOf(h),1);
        const cur=Math.max(...heights);
        if(cur!==prev){res.push([x,cur]);prev=cur;}
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🌲',
      color: 'green',
      content: `**Segment tree vs Fenwick tree:**\n- Fenwick: simpler code, prefix sum only (can do point update + range sum)\n- Segment tree: range min/max, any associative operation, can add lazy propagation\n- Use Fenwick for competitive sum problems, segment tree for min/max or range update\n\n**4n array size:** Works for n up to the array bound. Alternatively, use bottom-up iterative segment tree (2n size) for simpler code.\n\n**Merge function:** Sum, min, max, GCD, XOR — any associative operation with an identity element works. Just swap out the merge and identity (0 for sum, ∞ for min, -∞ for max).`,
    },
  ],
}
