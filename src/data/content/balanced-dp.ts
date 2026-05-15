import type { Article } from '../articles'

export const balancedDpArticle: Article = {
  slug: 'balanced-dp',
  title: 'Balanced Partition DP',
  emoji: '⚖️',
  tagline: 'Split array into groups with balanced sums. Fairness DP, multiway partition.',
  description: 'Balanced partition problems ask to divide elements into groups to minimize/maximize some balance metric: equal sum halves, k groups with min max-sum, fair distribution. Techniques: bitmask DP (small n), subset-sum bitset (split into two equal halves), binary search + greedy (minimize maximum), and DP over sorted arrays with running bounds.',
  gradient: 'from-emerald-800 to-green-900',
  topicSlug: 'dp',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `Balanced partition problems come in several flavors: (1) two-way split minimizing difference → subset sum DP to target sum/2; (2) k-way split minimizing maximum group sum → binary search + greedy; (3) equal-sum k groups → bitmask DP tracking which elements are used; (4) split into groups with size constraints → DP with group size tracking. The key: identify what "balanced" means and choose the matching technique.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Balanced partition templates',
      code: `// 1. Two-way split: minimize |S1 - S2|
function minDiffPartition(nums) {
    const total = nums.reduce((a,b)=>a+b,0);
    // Bitset DP: which sums ≤ total/2 are achievable?
    let dp = 1n; // BigInt bitset
    for (const n of nums) dp |= dp << BigInt(n);
    const half = total >> 1;
    for (let s = half; s >= 0; s--)
        if ((dp >> BigInt(s)) & 1n) return total - 2 * s;
    return total; // shouldn't reach
}

// 2. k-way split: minimize maximum group sum (binary search + greedy)
function minMaxPartition(nums, k) {
    let lo = Math.max(...nums), hi = nums.reduce((a,b)=>a+b,0);
    const check = (limit) => {
        let groups = 1, cur = 0;
        for (const n of nums) {
            if (cur + n > limit) { groups++; cur = 0; }
            cur += n;
        }
        return groups <= k;
    };
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        check(mid) ? hi = mid : lo = mid + 1;
    }
    return lo;
}

// 3. k groups of equal sum (bitmask DP for small n)
function canPartitionKSubsets(nums, k) {
    const total = nums.reduce((a,b)=>a+b,0);
    if (total % k !== 0) return false;
    const target = total / k;
    const n = nums.length;
    const dp = new Array(1 << n).fill(false); dp[0] = true;
    const sums = new Array(1 << n).fill(0);
    for (let mask = 0; mask < (1 << n); mask++) {
        if (!dp[mask]) continue;
        for (let i = 0; i < n; i++) {
            if ((mask >> i) & 1) continue;
            const next = mask | (1 << i);
            const newSum = (sums[mask] + nums[i]) % target;
            if (sums[mask] + nums[i] <= target) {
                sums[next] = newSum;
                dp[next] = true;
            }
        }
    }
    return dp[(1 << n) - 1];
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
      title: 'Partition to K Equal Sum Subsets',
      url: 'https://leetcode.com/problems/partition-to-k-equal-sum-subsets/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Bitmask DP — track which elements are used',
          explanation: `dp[mask] = true if elements in mask can form some number of complete groups. sums[mask] = current partial group sum (mod target). For each valid state, try adding each unused element.`,
          code: `var canPartitionKSubsets = function(nums, k) {
    const total=nums.reduce((a,b)=>a+b,0);
    if(total%k) return false;
    const target=total/k, n=nums.length;
    nums.sort((a,b)=>b-a); // pruning: try largest first
    if(nums[0]>target) return false;
    const dp=new Array(1<<n).fill(-1); dp[0]=0;
    for(let mask=0;mask<(1<<n);mask++){
        if(dp[mask]===-1) continue;
        for(let i=0;i<n;i++){
            if((mask>>i)&1) continue;
            const next=mask|(1<<i);
            if(dp[mask]+nums[i]<=target){
                dp[next]=(dp[mask]+nums[i])%target;
                if(dp[next]===dp[mask]+nums[i]%target||dp[next]===0||true) { /* logic */ }
            }
        }
    }
    // Simpler implementation:
    const dp2=new Array(1<<n).fill(0); // dp[mask] = partial sum of current bucket
    for(let mask=0;mask<(1<<n);mask++){
        if(mask===0){dp2[mask]=0;continue;}
        for(let i=0;i<n;i++){
            if(!((mask>>i)&1)) continue;
            const prev=mask^(1<<i);
            if(dp2[prev]!==-1&&(dp2[prev]+nums[i])%target===0||dp2[prev]+nums[i]<target){
                dp2[mask]=(dp2[prev]+nums[i])%target;
                break;
            }
            dp2[mask]=-1;
        }
    }
    return dp2[(1<<n)-1]===0;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Split Array Largest Sum',
      url: 'https://leetcode.com/problems/split-array-largest-sum/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Binary search on answer (minimize maximum subarray sum)',
          explanation: `Binary search: can we split into ≤ k parts each with sum ≤ limit? Greedy check: accumulate until adding next element exceeds limit, then start new part.`,
          code: `var splitArray = function(nums, k) {
    let lo=Math.max(...nums), hi=nums.reduce((a,b)=>a+b,0);
    while(lo<hi){
        const mid=(lo+hi)>>1;
        let parts=1,cur=0;
        for(const n of nums){if(cur+n>mid){parts++;cur=0;} cur+=n;}
        parts<=k?hi=mid:lo=mid+1;
    }
    return lo;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Fair Distribution of Cookies',
      url: 'https://leetcode.com/problems/fair-distribution-of-cookies/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Backtracking with pruning',
          explanation: `Assign each bag to one of k children. Prune: if a child's sum already exceeds current best, backtrack. Sort bags descending for better pruning.`,
          code: `var distributeCookies = function(cookies, k) {
    cookies.sort((a,b)=>b-a);
    const buckets=new Array(k).fill(0);
    let res=Infinity;
    const bt=(i)=>{
        if(i===cookies.length){res=Math.min(res,Math.max(...buckets));return;}
        const seen=new Set();
        for(let j=0;j<k;j++){
            if(seen.has(buckets[j])) continue; // prune symmetric states
            seen.add(buckets[j]);
            if(buckets[j]+cookies[i]>=res) continue; // prune if already worse
            buckets[j]+=cookies[i]; bt(i+1); buckets[j]-=cookies[i];
        }
    };
    bt(0);
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '⚖️',
      color: 'green',
      content: `**Balanced partition decision tree:**\n- 2 groups, min diff: subset-sum DP to target=sum/2, O(n × sum)\n- k groups, min max: binary search + greedy, O(n log sum)\n- k groups, equal sum, small n (≤20): bitmask DP, O(2^n × n)\n- k groups, equal size: sort + pair, or DP by sorted order\n\n**Bitmask DP tip:** For "can we partition into k equal-sum groups," track partial current bucket sum mod target. An element adds to the current bucket or starts a new one when bucket fills.`,
    },
  ],
}
