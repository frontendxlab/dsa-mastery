import type { Article } from '../articles'

export const topkStreamingArticle: Article = {
  slug: 'topk-streaming',
  title: 'Top-K & Streaming Algorithms',
  emoji: '📊',
  tagline: 'Maintain top-K elements in streams. Heap-based selection, frequency tracking.',
  description: 'Top-K streaming problems maintain a running set of K most frequent or largest elements as data arrives. Core tool: min-heap of size K — evict smallest when size exceeds K. Variations: top-K frequent elements (bucket sort trick for O(n)), K closest points, find median in stream (two heaps), sliding window maximum (monotonic deque). Key: choose between sort O(n log n), heap O(n log k), or bucket sort O(n) based on constraints.',
  gradient: 'from-cyan-700 to-teal-800',
  topicSlug: 'dp',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `Top-K elements via min-heap of size K: push each element; if size > K, pop minimum. Result = heap contents. O(n log k). Top-K frequent: count frequencies, then heap on (freq, element). Trick: bucket sort by frequency for O(n) — bucket[freq] = list of elements with that frequency. Find median in stream: two heaps (max-heap for lower half, min-heap for upper half), maintain size balance.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Top-K frequent and two-heap median templates',
      code: `// Top K frequent elements — O(n) with bucket sort
function topKFrequent(nums, k) {
    const freq = new Map();
    for (const n of nums) freq.set(n, (freq.get(n) || 0) + 1);

    // Bucket sort: index = frequency
    const bucket = Array.from({length: nums.length + 1}, () => []);
    for (const [num, f] of freq) bucket[f].push(num);

    const result = [];
    for (let i = bucket.length - 1; i >= 0 && result.length < k; i--)
        result.push(...bucket[i]);
    return result.slice(0, k);
}

// Find median from data stream — two heaps
class MedianFinder {
    constructor() {
        // lo = max-heap (lower half), hi = min-heap (upper half)
        this.lo = []; // simulate max-heap by negating
        this.hi = []; // min-heap
    }
    addNum(num) {
        // Push to lo, then balance
        this._pushMax(this.lo, num);
        this._pushMin(this.hi, this._popMax(this.lo)); // move max of lo to hi
        if (this.hi.length > this.lo.length)
            this._pushMax(this.lo, this._popMin(this.hi));
    }
    findMedian() {
        if (this.lo.length > this.hi.length) return -this.lo[0];
        return (-this.lo[0] + this.hi[0]) / 2;
    }
    // Heap helpers (arrays sorted manually here — in practice use a heap library)
    _pushMax(h, v) { h.push(-v); h.sort((a,b)=>a-b); }
    _popMax(h) { return -h.shift(); }
    _pushMin(h, v) { h.push(v); h.sort((a,b)=>a-b); }
    _popMin(h) { return h.shift(); }
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
      title: 'Top K Frequent Elements',
      url: 'https://leetcode.com/problems/top-k-frequent-elements/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Bucket sort by frequency — O(n)',
          explanation: `Count frequencies. Create buckets indexed by frequency (0..n). Put each element in its frequency bucket. Traverse buckets from high to low, collecting elements until we have k.`,
          code: `var topKFrequent = function(nums, k) {
    const freq=new Map();
    for(const n of nums) freq.set(n,(freq.get(n)||0)+1);
    const bucket=Array.from({length:nums.length+1},()=>[]);
    for(const [n,f] of freq) bucket[f].push(n);
    const res=[];
    for(let i=bucket.length-1;i>=0&&res.length<k;i--)
        res.push(...bucket[i]);
    return res.slice(0,k);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Find Median from Data Stream',
      url: 'https://leetcode.com/problems/find-median-from-data-stream/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Two heaps — max-heap for lower half, min-heap for upper half',
          explanation: `Keep lo (max-heap, lower half) and hi (min-heap, upper half). Invariant: lo.size == hi.size or lo.size == hi.size + 1. On addNum: push to lo, move lo's max to hi, then if hi bigger than lo, move hi's min back to lo. Median: lo's max if odd, average of both tops if even.`,
          code: `var MedianFinder = function() {
    this.lo=[]; this.hi=[];
};
MedianFinder.prototype.addNum = function(num) {
    // Using sorted arrays as simple heap simulation
    const ins=(h,v,desc=false)=>{
        let i=h.length;
        h.push(v);
        while(i>0){
            const p=(i-1)>>1;
            if(desc?(h[p]<h[i]):(h[p]>h[i])){[h[p],h[i]]=[h[i],h[p]];i=p;}
            else break;
        }
    };
    const pop=(h,desc=false)=>{
        const top=h[0]; h[0]=h.pop();
        let i=0;
        while(true){
            const l=2*i+1,r=2*i+2;
            let best=i;
            if(l<h.length&&(desc?(h[l]>h[best]):(h[l]<h[best]))) best=l;
            if(r<h.length&&(desc?(h[r]>h[best]):(h[r]<h[best]))) best=r;
            if(best===i) break;
            [h[i],h[best]]=[h[best],h[i]]; i=best;
        }
        return top;
    };
    ins(this.lo,num,true);
    ins(this.hi,pop(this.lo,true),false);
    if(this.hi.length>this.lo.length) ins(this.lo,pop(this.hi,false),true);
};
MedianFinder.prototype.findMedian = function() {
    return this.lo.length>this.hi.length?this.lo[0]:(this.lo[0]+this.hi[0])/2;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'K Closest Points to Origin',
      url: 'https://leetcode.com/problems/k-closest-points-to-origin/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Sort by distance squared',
          explanation: `No need for sqrt — sort by x²+y². Take first k elements. O(n log n). Alternatively: max-heap of size k for O(n log k).`,
          code: `var kClosest = function(points, k) {
    return points.sort((a,b)=>(a[0]**2+a[1]**2)-(b[0]**2+b[1]**2)).slice(0,k);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Sort Characters By Frequency',
      url: 'https://leetcode.com/problems/sort-characters-by-frequency/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Count frequency, sort by frequency descending, rebuild string',
          explanation: `Count each character's frequency. Sort (char, freq) pairs by frequency descending. Concatenate each char repeated freq times.`,
          code: `var frequencySort = function(s) {
    const freq=new Map();
    for(const c of s) freq.set(c,(freq.get(c)||0)+1);
    return [...freq.entries()].sort((a,b)=>b[1]-a[1]).map(([c,f])=>c.repeat(f)).join('');
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Top K Frequent Words',
      url: 'https://leetcode.com/problems/top-k-frequent-words/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Count then sort by (frequency desc, word asc)',
          explanation: `Count word frequencies. Sort by frequency descending, then lexicographically for ties. Return first k.`,
          code: `var topKFrequent = function(words, k) {
    const freq=new Map();
    for(const w of words) freq.set(w,(freq.get(w)||0)+1);
    return [...freq.entries()]
        .sort((a,b)=>b[1]-a[1]||(a[0]<b[0]?-1:1))
        .slice(0,k).map(([w])=>w);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '📊',
      color: 'teal',
      content: `**Algorithm selection for top-K:**\n- Sort all: O(n log n) — simple, fine for most\n- Min-heap size K: O(n log k) — better when k << n\n- Bucket/counting sort: O(n) — when values bounded (frequencies 1..n)\n- QuickSelect: O(n) average — find kth largest without sorting\n\n**Two-heap median trick:** lo (max-heap) holds lower half, hi (min-heap) holds upper half. Maintain |lo.size - hi.size| ≤ 1. Both tops give the median. Each addNum is O(log n).\n\n**Sliding window max:** Use monotonic deque (see monotonic-queue chapter) not heap — O(n) vs O(n log k).`,
    },
  ],
}
