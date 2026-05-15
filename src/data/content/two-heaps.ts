import type { Article } from '../articles'

export const twoHeapsArticle: Article = {
  slug: 'two-heaps',
  title: 'Two Heaps Pattern',
  emoji: '⚖️',
  tagline: 'Balance a max-heap and min-heap to maintain median in O(log n).',
  description: 'The two-heaps pattern uses a max-heap for the lower half and a min-heap for the upper half of a dataset. The median is always at the tops of these heaps. Supports O(log n) insert and O(1) median query. Extends to sliding window median, "maximize minimum" problems, and task scheduling with constraints.',
  gradient: 'from-violet-500 to-purple-600',
  topicSlug: 'heap',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `Two heaps maintain the median of a dynamic dataset by splitting elements into two halves: a max-heap holding the lower half, and a min-heap holding the upper half. The invariant: max-heap size equals min-heap size (even count) or is exactly 1 larger (odd count). Median = top of max-heap (odd) or average of both tops (even). Every insert: add to correct heap, rebalance if sizes differ by 2.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Two heaps template for median maintenance',
      code: `// JavaScript lacks a built-in heap — use a sorted structure or implement one
class MinHeap {
    constructor() { this.h = []; }
    push(x) {
        this.h.push(x);
        let i = this.h.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (this.h[p] <= this.h[i]) break;
            [this.h[p], this.h[i]] = [this.h[i], this.h[p]];
            i = p;
        }
    }
    pop() {
        const top = this.h[0];
        const last = this.h.pop();
        if (this.h.length) {
            this.h[0] = last;
            let i = 0;
            while (true) {
                let s = i, l = 2*i+1, r = 2*i+2;
                if (l < this.h.length && this.h[l] < this.h[s]) s = l;
                if (r < this.h.length && this.h[r] < this.h[s]) s = r;
                if (s === i) break;
                [this.h[s], this.h[i]] = [this.h[i], this.h[s]];
                i = s;
            }
        }
        return top;
    }
    peek() { return this.h[0]; }
    size() { return this.h.length; }
}
class MaxHeap extends MinHeap {
    push(x) { super.push(-x); }
    pop() { return -super.pop(); }
    peek() { return -super.peek(); }
}

// Two-heap median tracker
class MedianFinder {
    constructor() { this.lo = new MaxHeap(); this.hi = new MinHeap(); }
    addNum(n) {
        this.lo.push(n);
        this.hi.push(this.lo.pop()); // ensure lo.peek() <= hi.peek()
        if (this.lo.size() < this.hi.size()) this.lo.push(this.hi.pop());
    }
    findMedian() {
        if (this.lo.size() > this.hi.size()) return this.lo.peek();
        return (this.lo.peek() + this.hi.peek()) / 2;
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
      title: 'Find Median from Data Stream',
      url: 'https://leetcode.com/problems/find-median-from-data-stream/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Sorted insert — O(n) per add, O(1) median',
          explanation: `Keep a sorted array. Binary search for insertion position. Median = middle element(s). O(n) insert, O(1) query — too slow for many adds.`,
          code: `class MedianFinder {
    constructor() { this.data=[]; }
    addNum(n) {
        let lo=0,hi=this.data.length;
        while(lo<hi){const mid=(lo+hi)>>1;this.data[mid]<n?lo=mid+1:hi=mid;}
        this.data.splice(lo,0,n);
    }
    findMedian() {
        const n=this.data.length;
        return n%2?this.data[n>>1]:(this.data[n/2-1]+this.data[n/2])/2;
    }
}`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Two heaps — O(log n) add, O(1) median',
          explanation: `Max-heap lo holds lower half, min-heap hi holds upper half. Always push to lo first (via hi to maintain order), then rebalance so lo.size - hi.size ∈ {0, 1}.`,
          code: `class MedianFinder {
    constructor(){
        // Using sorted arrays as heaps for brevity
        this.lo=[]; // max-heap (store negated)
        this.hi=[]; // min-heap
    }
    addNum(n){
        // push to lo
        this.lo.push(-n); this.lo.sort((a,b)=>a-b);
        // balance: move lo's max to hi
        this.hi.push(-this.lo.shift()); this.hi.sort((a,b)=>a-b);
        // ensure lo not smaller
        if(this.lo.length<this.hi.length){
            this.lo.push(-this.hi.shift()); this.lo.sort((a,b)=>a-b);
        }
    }
    findMedian(){
        if(this.lo.length>this.hi.length) return -this.lo[0];
        return(-this.lo[0]+this.hi[0])/2;
    }
}`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Sliding Window Median',
      url: 'https://leetcode.com/problems/sliding-window-median/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Two heaps with lazy deletion',
          explanation: `Same two-heap structure but also need to remove the element leaving the window. Use "lazy deletion": mark it as deleted in a set, skip it when it reaches the heap top. Rebalance after each operation.`,
          code: `var medianSlidingWindow = function(nums, k) {
    // Use sorted arrays (for simplicity in interview context)
    const window=[...nums.slice(0,k)].sort((a,b)=>a-b);
    const med=()=>k%2?window[k>>1]:(window[k/2-1]+window[k/2])/2;
    const res=[med()];
    for(let i=k;i<nums.length;i++){
        // Remove nums[i-k]
        window.splice(window.indexOf(nums[i-k]),1);
        // Insert nums[i] in sorted position
        let lo=0,hi=window.length;
        while(lo<hi){const mid=(lo+hi)>>1;window[mid]<nums[i]?lo=mid+1:hi=mid;}
        window.splice(lo,0,nums[i]);
        res.push(med());
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'IPO (maximize capital)',
      url: 'https://leetcode.com/problems/ipo/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Min-heap on capital + max-heap on profit',
          explanation: `Sort projects by capital requirement. Use a min-heap to hold projects we can't yet afford. When our capital reaches a project's requirement, move it to a max-heap of available profits. Greedily pick highest profit k times.`,
          code: `var findMaximizedCapital = function(k, w, profits, capital) {
    const n=profits.length;
    const projects=[...Array(n).keys()].map(i=>[capital[i],profits[i]]);
    projects.sort((a,b)=>a[0]-b[0]);
    // Max-heap via negation with sorted array (interview shortcut)
    const available=[]; // profits we can pick (sorted desc)
    let idx=0;
    for(let i=0;i<k;i++){
        // Unlock all projects we can afford
        while(idx<n&&projects[idx][0]<=w){
            // Insert profit into available (sorted desc)
            const p=projects[idx][1];
            let lo=0,hi=available.length;
            while(lo<hi){const mid=(lo+hi)>>1;available[mid]<p?hi=mid:lo=mid+1;}
            available.splice(lo,0,p);
            idx++;
        }
        if(!available.length) break;
        w+=available.pop(); // take max profit
    }
    return w;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Maximize Capital (variation)',
      url: 'https://leetcode.com/problems/meeting-rooms-iii/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Two heaps — available rooms and occupied rooms',
          explanation: `Sort meetings by start time. Min-heap "available" tracks next free time of each room. Min-heap "occupied" tracks (end_time, room_id). For each meeting: free all rooms that ended before start, then assign to room with smallest number. Track usage count per room.`,
          code: `var mostBooked = function(n, meetings) {
    meetings.sort((a,b)=>a[0]-b[0]);
    const count=new Array(n).fill(0);
    // available: room numbers free now (min-heap by room number)
    // occupied: [end_time, room_id] (min-heap by end_time)
    let avail=[...Array(n).keys()]; // sorted, simulate min-heap
    const occ=[]; // [end, room]
    for(const [s,e] of meetings){
        // Free rooms that finished
        occ.sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
        while(occ.length&&occ[0][0]<=s) avail.push(occ.shift()[1]);
        avail.sort((a,b)=>a-b);
        if(avail.length){
            const room=avail.shift();
            occ.push([e,room]); count[room]++;
        } else {
            // Delay meeting to earliest free room
            const [end,room]=occ.shift();
            occ.push([end+(e-s),room]); count[room]++;
        }
    }
    return count.indexOf(Math.max(...count));
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '⚖️',
      color: 'teal',
      content: `**Two heap invariant:** max-heap (lo) holds lower half, min-heap (hi) holds upper half. Always: lo.peek() ≤ hi.peek(). Sizes: lo.size ∈ {hi.size, hi.size + 1}.\n\n**Insert protocol:**\n1. Push to lo\n2. Move lo's max to hi (ensures lo.peek() ≤ hi.peek())\n3. If lo.size < hi.size: move hi's min to lo (restore size invariant)\n\n**Median:** odd total → lo.peek(). Even total → (lo.peek() + hi.peek()) / 2\n\n**Applications:** anywhere you need online median, "k-th from each half," or "split dataset at dynamic threshold."`,
    },
  ],
}
