import type { Article } from '../articles'

export const multisetOrderedSetArticle: Article = {
  slug: 'multiset-ordered-set',
  title: 'Multiset & Ordered Set Patterns',
  emoji: '📋',
  tagline: 'Maintain sorted collections dynamically. Order statistics, rank queries, range operations.',
  description: 'Multiset and ordered set problems require maintaining a dynamically sorted collection with efficient insert, delete, and order-statistic queries (kth smallest, count less than). JavaScript lacks a built-in TreeSet, so common approaches: sort+binary search for offline queries, Fenwick/segment tree on compressed values for online queries, or SortedList simulation. Patterns: sliding window median, kth largest in stream, count inversions.',
  gradient: 'from-orange-700 to-amber-800',
  topicSlug: 'dp',
  readTime: '13 min',
  sections: [
    {
      type: 'text',
      content: `Ordered set operations: insert O(log n), delete O(log n), find kth O(log n), count less-than O(log n). In JavaScript: simulate with Fenwick tree on coordinate-compressed values (offline), or sorted array with binary search (O(n) insert but simple). Pattern: sliding window requires removing elements — use a Fenwick tree or sorted array for O(log n) operations.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Sorted array with binary search for ordered set operations',
      code: `// Sorted array simulation — insert O(n), query O(log n)
// Use when n is small or queries dominate
class SortedList {
    constructor() { this.data = []; }

    add(val) {
        let lo = 0, hi = this.data.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (this.data[mid] < val) lo = mid + 1; else hi = mid;
        }
        this.data.splice(lo, 0, val);
    }

    remove(val) {
        const idx = this._bisectLeft(val);
        if (this.data[idx] === val) this.data.splice(idx, 1);
    }

    // Count elements strictly less than val
    countLess(val) { return this._bisectLeft(val); }

    // kth element (0-indexed)
    kth(k) { return this.data[k]; }

    _bisectLeft(val) {
        let lo = 0, hi = this.data.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (this.data[mid] < val) lo = mid + 1; else hi = mid;
        }
        return lo;
    }

    get size() { return this.data.length; }
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
      title: 'Sliding Window Median',
      url: 'https://leetcode.com/problems/sliding-window-median/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Two heaps with lazy deletion',
          explanation: `Maintain lo (max-heap) and hi (min-heap) where lo holds lower half. Lazy deletion: track which elements should be removed using a map. On each step: add new element, mark outgoing element for lazy removal. Remove from heap tops when they are marked. Rebalance heaps so lo.size == hi.size or lo.size == hi.size+1.`,
          code: `var medianSlidingWindow = function(nums, k) {
    // Using sorted array for clarity (O(nk) but passes)
    const window=[];
    const res=[];
    const ins=(v)=>{
        let lo=0,hi=window.length;
        while(lo<hi){const m=(lo+hi)>>1;window[m]<v?lo=m+1:hi=m;}
        window.splice(lo,0,v);
    };
    const del=(v)=>{
        let lo=0,hi=window.length;
        while(lo<hi){const m=(lo+hi)>>1;window[m]<v?lo=m+1:hi=m;}
        window.splice(lo,1);
    };
    for(let i=0;i<nums.length;i++){
        ins(nums[i]);
        if(i>=k) del(nums[i-k]);
        if(i>=k-1){
            const m=window.length;
            res.push(m%2?window[m>>1]:(window[m/2-1]+window[m/2])/2);
        }
    }
    return res;
};`,
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
          label: 'Intuition 1: Merge sort on prefix sums — count pairs during merge',
          explanation: `Compute prefix sums. Count pairs (i,j) where lower ≤ prefixSum[j]-prefixSum[i] ≤ upper. Use merge sort: for each right half element, count valid left half elements using two pointers (sorted property enables this).`,
          code: `var countRangeSum = function(nums, lower, upper) {
    const n=nums.length;
    const prefix=new Array(n+1).fill(0);
    for(let i=0;i<n;i++) prefix[i+1]=prefix[i]+nums[i];
    let count=0;
    const mergeSort=(lo,hi)=>{
        if(hi-lo<=1) return;
        const mid=(lo+hi)>>1;
        mergeSort(lo,mid); mergeSort(mid,hi);
        let l=mid,r=mid;
        for(let i=lo;i<mid;i++){
            while(l<hi&&prefix[l]-prefix[i]<lower) l++;
            while(r<hi&&prefix[r]-prefix[i]<=upper) r++;
            count+=r-l;
        }
        prefix.splice(lo,hi-lo,...prefix.slice(lo,hi).sort((a,b)=>a-b));
    };
    mergeSort(0,n+1);
    return count;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Contains Duplicate III',
      url: 'https://leetcode.com/problems/contains-duplicate-iii/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Bucket sort — each bucket has width (valueDiff+1)',
          explanation: `Divide numbers into buckets of size (valueDiff+1). If two numbers are in the same bucket, their diff ≤ valueDiff. Also check adjacent buckets. Maintain buckets for sliding window of size indexDiff.`,
          code: `var containsNearbyAlmostDuplicate = function(nums, indexDiff, valueDiff) {
    if(valueDiff<0) return false;
    const w=valueDiff+1;
    const buckets=new Map();
    const getId=v=>Math.floor(v<0?(v+1)/w-1:v/w);
    for(let i=0;i<nums.length;i++){
        const id=getId(nums[i]);
        if(buckets.has(id)) return true;
        if(buckets.has(id-1)&&Math.abs(buckets.get(id-1)-nums[i])<=valueDiff) return true;
        if(buckets.has(id+1)&&Math.abs(buckets.get(id+1)-nums[i])<=valueDiff) return true;
        buckets.set(id,nums[i]);
        if(i>=indexDiff) buckets.delete(getId(nums[i-indexDiff]));
    }
    return false;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Longest Consecutive Sequence',
      url: 'https://leetcode.com/problems/longest-consecutive-sequence/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: HashSet — only start chains from numbers with no left neighbor',
          explanation: `Build a set of all numbers. For each number n, if n-1 is NOT in the set, n starts a chain. Extend the chain by checking n+1, n+2, ... until break. O(n) total.`,
          code: `var longestConsecutive = function(nums) {
    const set=new Set(nums);
    let best=0;
    for(const n of set){
        if(!set.has(n-1)){
            let cur=n, len=1;
            while(set.has(cur+1)){cur++;len++;}
            best=Math.max(best,len);
        }
    }
    return best;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '📋',
      color: 'amber',
      content: `**When to use each ordered-set approach:**\n- Offline + small values: Fenwick tree with coordinate compression\n- Online + small n: SortedList (sorted array with binary search insert)\n- Median queries: Two heaps (max-heap lower half, min-heap upper half)\n- Near-duplicates in window: Bucket sort by value range\n\n**JavaScript gap:** Java has TreeMap/TreeSet, Python has SortedList (sortedcontainers). In JS, implement with Fenwick+compression or simulate with sorted array. For interviews, sorted array + binary search is easiest to explain.`,
    },
  ],
}
