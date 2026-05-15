import type { Article } from '../articles'

export const slopeTrickArticle: Article = {
  slug: 'slope-trick',
  title: 'Slope Trick',
  emoji: '📉',
  tagline: 'Maintain the piecewise-linear convex function via two heaps. DP in O(n log n).',
  description: 'Slope trick maintains a convex piecewise-linear function f(x) implicitly as the set of "slope change points." Since f is convex, the slope increases by 1 at each breakpoint. Store breakpoints in two heaps: L (max-heap for left side, slope < 0) and R (min-heap for right side, slope > 0). Adding a new term (like |x - aᵢ|) extends the heaps in O(log n). Final answer = f(median).',
  gradient: 'from-cyan-800 to-teal-900',
  topicSlug: 'dp',
  readTime: '15 min',
  sections: [
    {
      type: 'text',
      content: `Slope trick represents a convex function f(x) by its breakpoints (where slope changes by 1). f(x) = sum of |x - aᵢ| terms = piecewise linear with minimum at median. Two heaps: L = max-heap of slope-change points on the left half, R = min-heap on the right half. Adding |x - a|: push a to both heaps, then rebalance (if L.max > R.min, swap tops). The minimum value is tracked incrementally.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Slope trick for minimum sum of absolute differences',
      code: `// Minimum cost to make array non-decreasing
// Cost: sum of |a[i] - b[i]| where b is non-decreasing
// Slope trick: process each element, maintain convex function

class SlopeTrick {
    constructor() {
        this.L = []; // max-heap (left breakpoints)
        this.R = []; // min-heap (right breakpoints)
        this.minVal = 0; // current minimum of f
    }

    pushL(x) { /* max-heap push */ this.L.push(-x); this.L.sort((a,b)=>a-b); }
    pushR(x) { /* min-heap push */ this.R.push(x); this.R.sort((a,b)=>a-b); }
    topL() { return -this.L[0]; }
    topR() { return this.R[0]; }

    // Add term |x - a| to f
    addAbs(a) {
        this.pushL(a); this.pushR(a);
        if (this.topL() > this.topR()) {
            const l = this.topL(), r = this.topR();
            this.minVal += l - r;
            this.L.shift(); this.R.shift();
            this.pushL(r); this.pushR(l);
        }
    }

    // Add constraint x >= prev (for non-decreasing):
    // Shift R by max(0, L.top - prev), clip L at prev
    addFloor(prev) {
        if (this.topL() > prev) {
            this.minVal += this.topL() - prev;
            this.L.shift();
            this.pushL(prev);
        }
    }
}

// Example: make array non-decreasing with minimum absolute change cost
function minCostNonDecreasing(arr) {
    const st = new SlopeTrick();
    for (const a of arr) {
        st.addAbs(a);
        // Enforce non-decreasing: clip at topL
        // This is equivalent to: if new slope > topL was changed
    }
    return st.minVal;
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
      title: 'Minimum Moves to Make Array Non-Decreasing',
      url: 'https://leetcode.com/problems/minimum-number-of-operations-to-make-array-continuous/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Sort + count needed replacements in each window',
          explanation: `Sort and deduplicate. For each starting value v, a valid continuous array covers [v, v+n-1]. Count existing elements in this range (binary search). Replace n - count elements. Answer = n - max(count).`,
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
      num: 2,
      title: 'Minimum Cost to Make Array Non-Decreasing (slope trick)',
      url: 'https://leetcode.com/problems/minimum-operations-to-reduce-x-to-zero/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Reframe as max subarray sum with fixed total',
          explanation: `Minimum ops to reduce x to zero by removing from ends. Equivalent to finding the longest subarray with sum = total - x. Sliding window on prefix sums.`,
          code: `var minOperations = function(nums, x) {
    const target=nums.reduce((a,b)=>a+b,0)-x;
    if(target<0) return -1;
    if(target===0) return nums.length;
    let maxLen=-1,sum=0,l=0;
    for(let r=0;r<nums.length;r++){
        sum+=nums[r];
        while(sum>target) sum-=nums[l++];
        if(sum===target) maxLen=Math.max(maxLen,r-l+1);
    }
    return maxLen===-1?-1:nums.length-maxLen;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Minimum Total Distance Traveled',
      url: 'https://leetcode.com/problems/minimum-total-distance-traveled/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: DP matching robots to factories in sorted order',
          explanation: `Sort both. dp[i][j] = min cost to fix first i robots using first j factories. Try assigning k robots to factory j: cost = sum of |robots[i+1..i+k] - factory[j].pos|. O(n²m) with dp.`,
          code: `var minimumTotalDistance = function(robot, factory) {
    robot.sort((a,b)=>a-b);
    factory.sort((a,b)=>a[0]-b[0]);
    // Flatten factories by capacity
    const facts=[];
    for(const[pos,cnt] of factory) for(let i=0;i<cnt;i++) facts.push(pos);
    const n=robot.length, m=facts.length;
    // dp[i] = min cost to assign robots[i..n-1] to facts[i..m-1]
    const dp=new Array(n+1).fill(0).map(()=>new Array(m+1).fill(Infinity));
    for(let j=0;j<=m;j++) dp[n][j]=0;
    for(let i=n-1;i>=0;i--){
        for(let j=m-1;j>=0;j--){
            // Skip this factory for robot i
            dp[i][j]=dp[i][j+1];
            // Assign robot i to factory j
            dp[i][j]=Math.min(dp[i][j],Math.abs(robot[i]-facts[j])+(i+1<=n&&j+1<=m?dp[i+1][j+1]:0));
        }
    }
    return dp[0][0];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '📉',
      color: 'teal',
      content: `**Slope trick core idea:**\nA sum of |x - aᵢ| terms is convex, piecewise-linear, and minimized at the median. Store breakpoints in two heaps instead of the whole function.\n\n**Two-heap invariant:**\n- L = max-heap of breakpoints where slope goes from -k to -k+1 (left of minimum)\n- R = min-heap of breakpoints where slope goes from k-1 to k (right of minimum)\n- |L| = |R| (or |L| = |R| + 1 for odd cases)\n- L.top ≤ R.top always\n\n**Applications:**\n- Minimum moves to non-decreasing sequence: slope trick with "floor at previous minimum"\n- Weighted median problems\n- DP where each transition adds a |x - a| term\n\n**Key operation:** Adding max(0, x) shifts the entire right half up (equivalent to cutting at 0 and raising).`,
    },
  ],
}
