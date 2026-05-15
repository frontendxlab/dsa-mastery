import type { Article } from '../articles'

export const convexHullTrickArticle: Article = {
  slug: 'convex-hull-trick',
  title: 'Convex Hull Trick',
  emoji: '📈',
  tagline: 'Optimize DP with min/max of linear functions. Maintains a convex hull of lines.',
  description: 'The Convex Hull Trick (CHT) optimizes DP transitions of the form dp[i] = min(dp[j] + b[j]*x[i]) from O(n²) to O(n log n) or O(n) amortized. It works by maintaining a "hull" of linear functions y = mx+b so the optimal line at each query can be found quickly. Essential for "Slope Optimization DP." The Li Chao tree variant handles arbitrary query orders in O(log C) per operation.',
  gradient: 'from-orange-500 to-red-600',
  topicSlug: 'dp',
  readTime: '16 min',
  sections: [
    {
      type: 'text',
      content: `CHT applies when a DP transition looks like: dp[i] = min over j < i of { f(j) + g(j) * h(i) }. Rewrite as a family of linear functions: line j has slope g(j) and intercept f(j), query at x = h(i). We want the minimum (or maximum) y-value among all lines at each query point. The trick: maintain only the "lower convex hull" of lines — lines not on the hull are never optimal.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Li Chao Tree — handles arbitrary query order, O(log C) per op',
      code: `// Li Chao Tree: handles arbitrary insertions and queries
// Each node stores the "dominant" line for its range's midpoint
class LiChaoTree {
    constructor(lo, hi) {
        this.lo = lo; this.hi = hi;
        this.line = null; this.left = null; this.right = null;
    }
    // Insert line y = mx + b (minimize)
    insert(m, b, lo = this.lo, hi = this.hi, node = this) {
        if (!node) return;
        const mid = (lo + hi) >> 1;
        const newBetter = !node.line || m * mid + b < node.line[0] * mid + node.line[1];
        if (newBetter) [m, b, node.line] = [node.line ? node.line[0] : m, node.line ? node.line[1] : b, [m, b]];
        if (lo === hi) return;
        const leftBetter = !node.line || m * lo + b < node.line[0] * lo + node.line[1];
        if (leftBetter) {
            if (!node.left) node.left = new LiChaoTree(lo, mid);
            this.insert(m, b, lo, mid, node.left);
        } else {
            if (!node.right) node.right = new LiChaoTree(mid + 1, hi);
            this.insert(m, b, mid + 1, hi, node.right);
        }
    }
    query(x, lo = this.lo, hi = this.hi, node = this) {
        if (!node) return Infinity;
        const mid = (lo + hi) >> 1;
        let best = node.line ? node.line[0] * x + node.line[1] : Infinity;
        if (x <= mid) best = Math.min(best, this.query(x, lo, mid, node.left));
        else best = Math.min(best, this.query(x, mid + 1, hi, node.right));
        return best;
    }
}

// Monotone CHT (O(n) when queries and slopes are both monotone)
class MonotoneCHT {
    constructor() { this.lines = []; } // [slope, intercept]
    bad(l1, l2, l3) {
        // l2 is never optimal if intersection(l1,l3) is left of intersection(l1,l2)
        return (l3[1]-l1[1])*(l1[0]-l2[0]) <= (l2[1]-l1[1])*(l1[0]-l3[0]);
    }
    addLine(m, b) {
        const l = [m, b];
        while (this.lines.length >= 2 && this.bad(this.lines.at(-2), this.lines.at(-1), l))
            this.lines.pop();
        this.lines.push(l);
    }
    queryMin(x) { // assumes x is non-decreasing
        while (this.lines.length >= 2 &&
               this.lines[0][0]*x+this.lines[0][1] >= this.lines[1][0]*x+this.lines[1][1])
            this.lines.shift();
        return this.lines[0][0]*x+this.lines[0][1];
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
      title: 'Maximum Profit in Job Scheduling',
      url: 'https://leetcode.com/problems/maximum-profit-in-job-scheduling/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Sort by end time + DP with binary search',
          explanation: `dp[i] = max profit considering first i jobs (sorted by end time). For job i: either skip it (dp[i] = dp[i-1]) or take it (dp[i] = profit[i] + dp[latest job ending ≤ start[i]]). Binary search for the latest non-overlapping job. O(n log n).`,
          code: `var jobScheduling = function(startTime, endTime, profit) {
    const n=profit.length;
    const jobs=[...Array(n).keys()].map(i=>[endTime[i],startTime[i],profit[i]]);
    jobs.sort((a,b)=>a[0]-b[0]);
    const ends=jobs.map(j=>j[0]);
    // dp[i] = max profit using jobs 0..i-1
    const dp=new Array(n+1).fill(0);
    for(let i=0;i<n;i++){
        const[e,s,p]=jobs[i];
        // Binary search: last job ending <= s
        let lo=0,hi=i;
        while(lo<hi){const mid=(lo+hi+1)>>1;ends[mid-1]<=s?lo=mid:hi=mid-1;}
        dp[i+1]=Math.max(dp[i], dp[lo]+p);
    }
    return dp[n];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Minimum Cost to Cut a Stick',
      url: 'https://leetcode.com/problems/minimum-cost-to-cut-a-stick/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Interval DP',
          explanation: `Add 0 and n to cuts array, sort. dp[i][j] = min cost to make all cuts between cut[i] and cut[j]. Cost to split segment [i,j] at cut k = cut[j] - cut[i] (full segment length). Base: adjacent cuts = 0. O(m³) where m = number of cuts.`,
          code: `var minCost = function(n, cuts) {
    cuts=[0,...cuts.sort((a,b)=>a-b),n];
    const m=cuts.length;
    const dp=Array.from({length:m},()=>new Array(m).fill(0));
    for(let len=2;len<m;len++)
        for(let i=0;i+len<m;i++){
            const j=i+len;
            dp[i][j]=Infinity;
            for(let k=i+1;k<j;k++)
                dp[i][j]=Math.min(dp[i][j],dp[i][k]+dp[k][j]+cuts[j]-cuts[i]);
        }
    return dp[0][m-1];
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
          label: 'Intuition 1: Greedy — always start a group at the smallest available',
          explanation: `Count frequencies. Sort unique values. For each value in order, if count > 0: start (count) groups here, consuming count of each of the next k values. If any of the next k values doesn't have enough, return false.`,
          code: `var isPossibleDivide = function(nums, k) {
    const cnt=new Map();
    for(const n of nums) cnt.set(n,(cnt.get(n)||0)+1);
    const keys=[...cnt.keys()].sort((a,b)=>a-b);
    for(const n of keys){
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
      type: 'problem',
      num: 4,
      title: 'Minimum Number of Refueling Stops',
      url: 'https://leetcode.com/problems/minimum-number-of-refueling-stops/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Greedy with max-heap — refuel at best past station when stuck',
          explanation: `Drive forward. When out of fuel, retroactively choose the best (largest) station we've passed. Use a max-heap: as we pass each station, add its fuel. When stuck, pop the max and refuel. Count pops = number of stops.`,
          code: `var minRefuelStops = function(target, startFuel, stations) {
    const heap=[]; // max-heap via negation
    let fuel=startFuel, stops=0, prev=0;
    for(const[pos,cap] of [...stations,[target,0]]){
        fuel-=(pos-prev); prev=pos;
        while(fuel<0&&heap.length) fuel+=-heap.shift(), stops++;
        if(fuel<0) return -1;
        heap.push(-cap); heap.sort((a,b)=>a-b);
    }
    return stops;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '📈',
      color: 'amber',
      content: `**CHT applicability test:** Can your DP be written as dp[i] = min/max over j of (f(j) + slope(j) * query(i))?\n- If yes and slopes are monotone + queries are monotone: O(n) monotone CHT\n- If yes but arbitrary order: Li Chao tree O(n log C)\n\n**Li Chao vs CHT:** CHT requires careful maintenance of hull; Li Chao tree is simpler to code and handles arbitrary insert/query order at cost of O(log C) per operation.\n\n**Related:** SMAWK algorithm for totally monotone matrices; Kinetic Heaps for moving queries. For competitive programming, Li Chao tree is the go-to for "slope trick" style DP optimizations when the slope pattern isn't guaranteed monotone.`,
    },
  ],
}
