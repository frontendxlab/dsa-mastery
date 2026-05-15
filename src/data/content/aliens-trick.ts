import type { Article } from '../articles'

export const aliensTrickArticle: Article = {
  slug: 'aliens-trick',
  title: 'Aliens Trick (WQS Binary Search)',
  emoji: '👽',
  tagline: 'DP with "exactly k" constraint → binary search on cost penalty λ.',
  description: 'The Aliens trick (WQS binary search / lambda optimization) solves "minimize cost with exactly k groups/items" by adding a per-group penalty λ and binary searching on λ. If the unconstrained DP (with penalty) is efficiently solvable, we can find the optimal λ such that the optimal solution uses exactly k groups. Reduces O(n²k) DP to O(n log n × log(answer)).',
  gradient: 'from-indigo-700 to-purple-800',
  topicSlug: 'dp',
  readTime: '16 min',
  sections: [
    {
      type: 'text',
      content: `Problem: dp[k] = minimum cost using exactly k segments. Direct DP is O(nk). WQS binary search: add penalty λ per segment → dp_λ(n) = min cost using any number of segments, each adding λ to cost. The function dp_λ is convex in λ. Binary search for λ* such that optimal number of segments = k. Then answer = dp_λ*(n) - k×λ*. Requires: dp[k] is convex (decreasing marginal benefit for each additional segment).`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Aliens trick template',
      code: `// dp[k] = min cost to partition array into exactly k groups
// Requires dp[k] to be convex in k (each extra group helps less)
// Template: binary search on penalty lambda

function aliensTrick(arr, k, solve) {
    // solve(lambda) = {cost, count}
    // where cost = minimum cost with penalty lambda per group
    // and count = optimal number of groups at that lambda
    // Binary search for lambda where count = k

    let lo = -1e9, hi = 1e9;
    let ans = 0;

    for (let iter = 0; iter < 200; iter++) { // 200 iterations for precision
        const mid = (lo + hi) / 2;
        const { cost, count } = solve(mid);
        if (count >= k) lo = mid;
        else hi = mid;
    }

    const { cost, count } = solve((lo + hi) / 2);
    return cost - k * ((lo + hi) / 2);
}

// Example: Minimum cost to divide array into k subarrays,
// cost of subarray = (last - first)^2
// solve(lambda): DP with penalty lambda per subarray
// dp[i] = min cost for arr[0..i] with any number of subarrays + lambda each
// dp[i] = min over j<=i of (dp[j-1] + (arr[i]-arr[j])^2 + lambda)
// Can be solved in O(n log n) with convex hull trick`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Minimum Cost to Cut a Stick',
      url: 'https://leetcode.com/problems/minimum-cost-to-cut-a-stick/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Interval DP — O(m³)',
          explanation: `Add 0 and n to cuts, sort. dp[l][r] = min cost to make all cuts in (l,r). Base: adjacent positions = 0. Transition: try each cut position k in (l,r). Cost(l,r,k) = cuts[r]-cuts[l] (full segment) + dp[l][k] + dp[k][r].`,
          code: `var minCost = function(n, cuts) {
    cuts=[0,...cuts.sort((a,b)=>a-b),n];
    const m=cuts.length;
    const dp=Array.from({length:m},()=>new Array(m).fill(0));
    for(let len=2;len<m;len++)
        for(let l=0;l+len<m;l++){
            const r=l+len;
            dp[l][r]=Infinity;
            for(let k=l+1;k<r;k++)
                dp[l][r]=Math.min(dp[l][r],dp[l][k]+dp[k][r]+cuts[r]-cuts[l]);
        }
    return dp[0][m-1];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Maximum Sum of 3 Non-Overlapping Subarrays',
      url: 'https://leetcode.com/problems/maximum-sum-of-3-non-overlapping-subarrays/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Prefix sums + left/right best window positions',
          explanation: `Precompute: (1) prefix sums for window sums, (2) left[i] = best window starting position in [0,i], (3) right[i] = best window starting position in [i,n-1]. For middle window at each valid position, combine left and right best.`,
          code: `var maxSumOfThreeSubarrays = function(nums, k) {
    const n=nums.length, sums=new Array(n-k+1);
    let s=nums.slice(0,k).reduce((a,b)=>a+b,0); sums[0]=s;
    for(let i=1;i<=n-k;i++){s+=nums[i+k-1]-nums[i-1];sums[i]=s;}
    // left[i] = index of max sum in sums[0..i]
    const left=new Array(n-k+1); left[0]=0;
    for(let i=1;i<=n-k;i++) left[i]=sums[i]>sums[left[i-1]]?i:left[i-1];
    // right[i] = index of max sum in sums[i..n-k]
    const right=new Array(n-k+1); right[n-k]=n-k;
    for(let i=n-k-1;i>=0;i--) right[i]=sums[i]>=sums[right[i+1]]?i:right[i+1];
    let res=null, best=0;
    for(let mid=k;mid<=n-2*k;mid++){
        const l=left[mid-k], r=right[mid+k];
        const total=sums[l]+sums[mid]+sums[r];
        if(total>best){best=total;res=[l,mid,r];}
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
      title: 'Divide Array in Sets of K Consecutive Numbers',
      url: 'https://leetcode.com/problems/divide-array-in-sets-of-k-consecutive-numbers/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Greedy with sorted map — start k-set at smallest',
          explanation: `Sort by value. Process each distinct value: start (count) k-sets here. Each k-set consumes one of each consecutive value from this value to this+k-1. If any consecutive value is unavailable: return false.`,
          code: `var isPossibleDivide = function(nums, k) {
    const cnt=new Map();
    for(const n of nums) cnt.set(n,(cnt.get(n)||0)+1);
    const sorted=[...cnt.keys()].sort((a,b)=>a-b);
    for(const n of sorted){
        const c=cnt.get(n);
        if(c>0) for(let i=0;i<k;i++){
            if((cnt.get(n+i)||0)<c) return false;
            cnt.set(n+i,cnt.get(n+i)-c);
        }
    }
    return true;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '👽',
      color: 'blue',
      content: `**Aliens trick applicability:** dp[k] must be convex — meaning the marginal benefit of each additional "item" (segment, group, etc.) is non-increasing.\n\n**Steps:**\n1. Define f(λ) = optimal cost when adding λ per item\n2. Binary search for λ* where f uses exactly k items\n3. Answer = f(λ*) - k × λ*\n\n**Why it works:** Lagrangian relaxation — adding penalty λ per item selects the Pareto-optimal trade-off between cost and count. Convexity ensures each λ corresponds to a unique optimal count.\n\n**Complexity:** If unconstrained DP is O(n log n) (via CHT), total = O(n log n × log(RANGE)) ≈ O(n log² n).`,
    },
  ],
}
