import type { Article } from '../articles'

export const ternarySearchArticle: Article = {
  slug: 'ternary-search',
  title: 'Ternary Search',
  emoji: '🔭',
  tagline: 'Find minimum of unimodal function in O(log n). Divide range into thirds.',
  description: 'Ternary search finds the minimum (or maximum) of a unimodal function — one that decreases then increases (or vice versa) — in O(log n) evaluations. Divide the search range into thirds: evaluate at m1 and m2. If f(m1) > f(m2), minimum is in [m1, hi]; else in [lo, m2]. More useful than binary search when you cannot compute derivatives but can evaluate the function.',
  gradient: 'from-teal-500 to-emerald-600',
  topicSlug: 'math',
  readTime: '12 min',
  sections: [
    {
      type: 'text',
      content: `Ternary search requires the function to be strictly unimodal: it decreases from lo to some peak/valley, then increases (or decreases) to hi. At each step, evaluate at 1/3 and 2/3 of the interval. The worse side is eliminated. After O(log_{3/2}(range/eps)) steps, converge to the answer. For discrete domains, 100 iterations of continuous ternary search is overkill — use binary search on the derivative instead when possible.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Ternary search templates — continuous and discrete',
      code: `// Continuous ternary search — find x minimizing f(x) in [lo, hi]
function ternarySearchMin(lo, hi, f, iterations = 200) {
    for (let i = 0; i < iterations; i++) {
        const m1 = lo + (hi - lo) / 3;
        const m2 = hi - (hi - lo) / 3;
        if (f(m1) < f(m2)) hi = m2;
        else lo = m1;
    }
    return (lo + hi) / 2;
}

// Discrete ternary search — integer domain
function ternarySearchDiscrete(lo, hi, f) {
    while (hi - lo > 2) {
        const m1 = lo + Math.floor((hi - lo) / 3);
        const m2 = hi - Math.floor((hi - lo) / 3);
        if (f(m1) <= f(m2)) hi = m2;
        else lo = m1;
    }
    // Check remaining candidates
    let best = lo;
    for (let x = lo; x <= hi; x++) if (f(x) < f(best)) best = x;
    return best;
}

// Alternative for discrete: binary search on derivative
// If f is unimodal with integer domain, f(x) - f(x-1) changes sign once
// Binary search for where derivative flips sign`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Minimum Distance to Target Element',
      url: 'https://leetcode.com/problems/minimum-distance-to-target-element/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Linear scan',
          explanation: `Find all positions where nums[i] = target. Among those, find one closest to start position. Track min |i - start| while scanning.`,
          code: `var getMinDistance = function(nums, target, start) {
    let res=Infinity;
    for(let i=0;i<nums.length;i++)
        if(nums[i]===target) res=Math.min(res,Math.abs(i-start));
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Peak Index in a Mountain Array',
      url: 'https://leetcode.com/problems/peak-index-in-a-mountain-array/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Binary search on slope',
          explanation: `If arr[mid] < arr[mid+1], peak is to the right (increasing). If arr[mid] > arr[mid+1], peak is at mid or left. Standard binary search.`,
          code: `var peakIndexInMountainArray = function(arr) {
    let lo=0,hi=arr.length-1;
    while(lo<hi){
        const mid=(lo+hi)>>1;
        arr[mid]<arr[mid+1]?lo=mid+1:hi=mid;
    }
    return lo;
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Ternary search',
          explanation: `Mountain array is unimodal. Ternary search: compare f(m1) and f(m2) to eliminate one third of the range. O(log n).`,
          code: `var peakIndexInMountainArray = function(arr) {
    let lo=0,hi=arr.length-1;
    while(hi-lo>2){
        const m1=lo+Math.floor((hi-lo)/3);
        const m2=hi-Math.floor((hi-lo)/3);
        arr[m1]<arr[m2]?lo=m1+1:hi=m2-1;
    }
    let best=lo;
    for(let i=lo;i<=hi;i++) if(arr[i]>arr[best]) best=i;
    return best;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Find in Mountain Array',
      url: 'https://leetcode.com/problems/find-in-mountain-array/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Find peak, binary search both halves',
          explanation: `Three steps: (1) Find peak index via binary search. (2) Binary search ascending half [0, peak] for target. (3) Binary search descending half [peak, n-1] for target. All binary searches.`,
          code: `var findInMountainArray = function(target, mountainArr) {
    const n=mountainArr.length();
    // Find peak
    let lo=0,hi=n-1;
    while(lo<hi){
        const mid=(lo+hi)>>1;
        mountainArr.get(mid)<mountainArr.get(mid+1)?lo=mid+1:hi=mid;
    }
    const peak=lo;
    // Binary search ascending
    lo=0; hi=peak;
    while(lo<=hi){
        const mid=(lo+hi)>>1;
        const v=mountainArr.get(mid);
        if(v===target) return mid;
        v<target?lo=mid+1:hi=mid-1;
    }
    // Binary search descending
    lo=peak+1; hi=n-1;
    while(lo<=hi){
        const mid=(lo+hi)>>1;
        const v=mountainArr.get(mid);
        if(v===target) return mid;
        v>target?lo=mid+1:hi=mid-1;
    }
    return -1;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Minimum Moves to Make Array Complementary',
      url: 'https://leetcode.com/problems/minimum-moves-to-make-array-complementary/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Difference array on target sum range',
          explanation: `For each pair (nums[i], nums[n-1-i]) with a = min, b = max: target sum T can be achieved with 0 moves in [a+1, b+limit], 1 move in [2, a+1) or (b+limit, a+b], 2 moves at endpoints. Use difference array on target sum range [2, 2*limit], then find minimum.`,
          code: `var minMoves = function(nums, limit) {
    const n=nums.length, diff=new Array(2*limit+2).fill(0);
    for(let i=0;i<n/2;i++){
        const [a,b]=[Math.min(nums[i],nums[n-1-i]),Math.max(nums[i],nums[n-1-i])];
        diff[2]+=2; diff[2*limit+1]-=2;        // base: 2 moves everywhere
        diff[a+1]-=1; diff[b+limit+1]+=1;     // 1 move range: [a+1, b+limit]
        diff[a+b]-=1; diff[a+b+1]+=1;         // 0 moves at a+b
    }
    let cur=0,res=Infinity;
    for(let t=2;t<=2*limit;t++){cur+=diff[t];res=Math.min(res,cur);}
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🔭',
      color: 'green',
      content: `**When to use ternary search vs binary search:**\n- Binary search: function is monotone (strictly increasing or decreasing) → O(log n)\n- Ternary search: function is unimodal (one peak/valley) → O(log n)\n- Binary search on derivative: f'(x) changes sign once → more natural for discrete domains\n\n**Pitfall:** Ternary search requires strictly unimodal function. If there's a flat region at the peak, ternary search may not converge correctly.\n\n**Practical alternatives for discrete unimodal:** binary search on f(x) ≤ f(x+1) (slope). Simpler and fewer iterations than ternary search for integers.`,
    },
  ],
}
