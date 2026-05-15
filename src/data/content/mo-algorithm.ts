import type { Article } from '../articles'

export const moAlgorithmArticle: Article = {
  slug: 'mo-algorithm',
  title: "Mo's Algorithm",
  emoji: '🔲',
  tagline: 'Sort offline queries to minimize total movement. O((n+q)√n) for range queries.',
  description: "Mo's algorithm answers offline range queries in O((n+q)√n) by sorting queries cleverly. Divide array into blocks of size √n. Sort queries: first by block of left endpoint, then by right endpoint (alternating direction for even/odd blocks). Maintain a running answer as you expand/contract the window by one element at a time. Each element is added/removed O(√n) times total.",
  gradient: 'from-fuchsia-600 to-purple-700',
  topicSlug: 'dp',
  readTime: '15 min',
  sections: [
    {
      type: 'text',
      content: `Mo's algorithm works when: (1) queries are offline (all known beforehand), (2) you can maintain an answer incrementally as the window expands/contracts by one element. The key insight: sort queries so the total movement of L and R pointers is minimized. With block size √n, R moves O(n) per block (O(n√n) total), and L moves O(√n) per query (O(q√n) total). Total: O((n+q)√n).`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: "Mo's algorithm template",
      code: `function moAlgorithm(n, queries, add, remove, getAnswer) {
    // queries: [{l, r, idx}]
    const block = Math.ceil(Math.sqrt(n));

    // Sort: by block of l, then by r (alternating for cache efficiency)
    queries.sort((a, b) => {
        const ba = Math.floor(a.l / block), bb = Math.floor(b.l / block);
        if (ba !== bb) return ba - bb;
        return ba % 2 === 0 ? a.r - b.r : b.r - a.r; // alternating
    });

    const answers = new Array(queries.length);
    let curL = 0, curR = -1;

    for (const {l, r, idx} of queries) {
        // Expand/contract to [l, r]
        while (curR < r) add(++curR);
        while (curL > l) add(--curL);
        while (curR > r) remove(curR--);
        while (curL < l) remove(curL++);
        answers[idx] = getAnswer();
    }
    return answers;
}

// Example: count distinct elements in range [l, r]
// add(i): freq[arr[i]]++; if freq[arr[i]] === 1: distinctCount++
// remove(i): freq[arr[i]]--; if freq[arr[i]] === 0: distinctCount--
// getAnswer(): return distinctCount`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Number of Distinct Colors After Queries',
      url: 'https://leetcode.com/problems/number-of-distinct-colors-after-applying-all-the-queries/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Offline processing with frequency maps',
          explanation: `Process queries offline. For each query, track color frequency. When a color's count drops to 0, remove from set. Count distinct = set size. Mo's not needed here since we process forward, but demonstrates range-window maintenance.`,
          code: `var queryResults = function(limit, queries) {
    const colorCount=new Map(), countSet=new Map();
    let distinct=0;
    const res=[];
    for(const[ball,color] of queries){
        // Remove old color from ball
        if(colorCount.has(ball)){
            const old=colorCount.get(ball);
            const c=countSet.get(old)-1;
            countSet.set(old,c);
            if(c===0){countSet.delete(old);distinct--;}
        }
        colorCount.set(ball,color);
        const nc=(countSet.get(color)||0)+1;
        countSet.set(color,nc);
        if(nc===1) distinct++;
        res.push(distinct);
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
      title: 'Minimum Operations to Make Array Continuous',
      url: 'https://leetcode.com/problems/minimum-operations-to-make-array-continuous/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Sort + sliding window to find max already-valid elements',
          explanation: `After dedup and sorting, we want a window of size n (range [x, x+n-1]) that contains the most existing elements — those we don't need to change. Use binary search for each element: count unique elements in [nums[i], nums[i]+n-1]. Answer = n - max count.`,
          code: `var minOperations = function(nums) {
    const n=nums.length;
    const sorted=[...new Set(nums)].sort((a,b)=>a-b);
    let res=n, r=0;
    for(let l=0;l<sorted.length;l++){
        while(r<sorted.length&&sorted[r]<sorted[l]+n) r++;
        res=Math.min(res,n-(r-l));
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
      title: 'Count Distinct Elements in Every Window',
      url: 'https://leetcode.com/problems/count-distinct-numbers-in-subarrays/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: "Intuition 1: Mo's algorithm — maintain frequency count",
          explanation: `Classic Mo's application: process all queries offline, maintain a frequency map and distinct count. O((n+q)√n) total.`,
          code: `// Mo's algorithm: sort queries by block, then by r
// State: freq map, distinctCount
// add(i): freq[arr[i]]++; if 1 → distinctCount++
// remove(i): freq[arr[i]]--; if 0 → distinctCount--
// Sliding window approach for single-pass (k fixed window):
var distinctNumbers = function(nums, k) {
    const res=[], freq=new Map();
    let distinct=0;
    for(let i=0;i<nums.length;i++){
        // Add right
        const rc=(freq.get(nums[i])||0)+1;
        freq.set(nums[i],rc); if(rc===1) distinct++;
        // Remove left
        if(i>=k){
            const lc=freq.get(nums[i-k])-1;
            freq.set(nums[i-k],lc); if(lc===0) distinct--;
        }
        if(i>=k-1) res.push(distinct);
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
      title: 'Maximum Sum of Almost Unique Subarray',
      url: 'https://leetcode.com/problems/maximum-sum-of-almost-unique-subarray/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Sliding window with frequency map',
          explanation: `Fixed window of size k. Track frequency map and window sum. Count distinct elements in window. If distinct ≥ m, candidate for answer.`,
          code: `var maxSum = function(nums, m, k) {
    const freq=new Map(); let sum=0, distinct=0, res=0;
    for(let i=0;i<nums.length;i++){
        sum+=nums[i];
        const rc=(freq.get(nums[i])||0)+1;
        freq.set(nums[i],rc); if(rc===1) distinct++;
        if(i>=k){
            const out=nums[i-k];
            sum-=out;
            const lc=freq.get(out)-1;
            freq.set(out,lc); if(lc===0){freq.delete(out);distinct--;}
        }
        if(i>=k-1&&distinct>=m) res=Math.max(res,sum);
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🔲',
      color: 'blue',
      content: `**Mo's algorithm conditions:**\n- Offline: all queries known upfront\n- Incremental: can add/remove one element and update answer in O(1) or O(log n)\n- Works for: distinct count, sum, XOR, frequency queries\n\n**Block size selection:**\n- Typical: √n ≈ 300-350 for n = 100,000\n- Optimal: n/√q if q queries\n- Alternating sort (even blocks right→left, odd blocks left→right) reduces constant by ~2x\n\n**Mo's on trees:** Euler tour the tree to flatten, then apply Mo's on the flattened array. Handles path queries offline.\n\n**Time complexity:** O((n + q) · √n). For n = q = 10^5: ~3 × 10^7 operations — fits in 2-3 seconds.`,
    },
  ],
}
