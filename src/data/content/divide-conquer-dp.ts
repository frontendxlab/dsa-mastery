import type { Article } from '../articles'

export const divideConquerDpArticle: Article = {
  slug: 'divide-conquer-dp',
  title: 'Divide & Conquer DP Optimization',
  emoji: '✂️',
  tagline: 'Reduce O(n²k) DP to O(nk log n) when optimal split point is monotone.',
  description: 'Divide and Conquer DP optimization reduces certain O(n²) DP recurrences to O(n log n) by exploiting the monotone optimal split property: if opt(i) is the optimal split for state i, then opt(i) ≤ opt(i+1). This allows a divide-and-conquer approach: solve the midpoint, recurse on left with opt ≤ opt(mid) and right with opt ≥ opt(mid). Also covers Knuth-Yao speedup for specific interval DP.',
  gradient: 'from-slate-600 to-zinc-700',
  topicSlug: 'dp',
  readTime: '16 min',
  sections: [
    {
      type: 'text',
      content: `DC DP optimization applies when dp[i][j] = min over k of (dp[i-1][k] + cost(k,j)), AND the optimal k for state j (call it opt(j)) satisfies opt(j) ≤ opt(j+1). Instead of trying all n values of k for each j (O(n²)), we solve the middle j first, then recurse on left half with k ≤ opt(mid) and right half with k ≥ opt(mid). Total O(n log n) per DP layer.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Divide and Conquer DP optimization template',
      code: `// dp[j] = min over k in [lo, hi] of { prev[k] + cost(k, j) }
// Requires: optimal k for j <= optimal k for j+1 (monotone opt)
function dcDP(prevDP, n, cost) {
    const dp = new Array(n).fill(Infinity);

    function solve(lo, hi, optLo, optHi) {
        if (lo > hi) return;
        const mid = (lo + hi) >> 1;
        let bestK = optLo, bestVal = Infinity;
        // Find optimal k for mid in [optLo, min(optHi, mid)]
        for (let k = optLo; k <= Math.min(optHi, mid); k++) {
            const val = prevDP[k] + cost(k, mid);
            if (val < bestVal) { bestVal = val; bestK = k; }
        }
        dp[mid] = bestVal;
        // Left half: optimal k in [optLo, bestK]
        solve(lo, mid - 1, optLo, bestK);
        // Right half: optimal k in [bestK, optHi]
        solve(mid + 1, hi, bestK, optHi);
    }

    solve(0, n - 1, 0, n - 1);
    return dp;
}

// Knuth-Yao speedup for interval DP:
// dp[i][j] = min(dp[i][k] + dp[k][j] + w(i,j)) for i < k < j
// Requires: opt[i][j-1] <= opt[i][j] <= opt[i+1][j] (quadrangle inequality)
// Reduces O(n³) interval DP to O(n²)`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Divide Chocolate',
      url: 'https://leetcode.com/problems/divide-chocolate/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Binary search on answer',
          explanation: `Binary search on the minimum sweetness of the chunk you get. For a given minimum m, greedily cut whenever accumulated sweetness ≥ m. If we can make k+1 cuts → answer ≥ m.`,
          code: `var maximizeSweetness = function(sweetness, k) {
    let lo=Math.min(...sweetness), hi=sweetness.reduce((a,b)=>a+b,0);
    const check=(m)=>{
        let chunks=0,cur=0;
        for(const s of sweetness){cur+=s;if(cur>=m){chunks++;cur=0;}}
        return chunks>=k+1;
    };
    while(lo<hi){
        const mid=(lo+hi+1)>>1;
        check(mid)?lo=mid:hi=mid-1;
    }
    return lo;
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
          label: 'Intuition 1: Binary search on maximum subarray sum',
          explanation: `Binary search on the answer (max sum). For a given limit L, greedily split: cut when adding next element would exceed L. Count pieces needed. If ≤ k: answer ≤ L.`,
          code: `var splitArray = function(nums, k) {
    let lo=Math.max(...nums), hi=nums.reduce((a,b)=>a+b,0);
    const check=(limit)=>{
        let pieces=1,cur=0;
        for(const n of nums){
            if(cur+n>limit){pieces++;cur=0;}
            cur+=n;
        }
        return pieces<=k;
    };
    while(lo<hi){
        const mid=(lo+hi)>>1;
        check(mid)?hi=mid:lo=mid+1;
    }
    return lo;
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: DP — O(n²k) naive, DC optimization to O(nk log n)',
          explanation: `dp[j][i] = minimum largest sum splitting nums[0..i] into j parts. Transition: dp[j][i] = min over split k of max(dp[j-1][k], sum[k+1..i]). Optimal split k is monotone — DC optimization applies.`,
          code: `// DC DP: O(nk log n) — overkill here since binary search is O(n log(sum))
// But demonstrates the pattern for problems where binary search doesn't apply
var splitArray = function(nums, k) {
    const n=nums.length, pre=new Array(n+1).fill(0);
    for(let i=0;i<n;i++) pre[i+1]=pre[i]+nums[i];
    const rangeSum=(l,r)=>pre[r+1]-pre[l];
    let prev=new Array(n).fill(0).map((_,i)=>rangeSum(0,i));
    for(let j=1;j<k;j++){
        const dp=new Array(n).fill(Infinity);
        const solve=(lo,hi,optLo,optHi)=>{
            if(lo>hi) return;
            const mid=(lo+hi)>>1;
            let bestK=optLo,best=Infinity;
            for(let kk=optLo;kk<=Math.min(optHi,mid-1);kk++){
                const v=Math.max(prev[kk],rangeSum(kk+1,mid));
                if(v<best){best=v;bestK=kk;}
            }
            dp[mid]=best;
            solve(lo,mid-1,optLo,bestK);
            solve(mid+1,hi,bestK,optHi);
        };
        solve(j,n-1,j-1,n-1);
        prev=[...dp];
    }
    return prev[n-1];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Minimum Cost to Merge Stones',
      url: 'https://leetcode.com/problems/minimum-cost-to-merge-stones/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Interval DP — O(n³/k)',
          explanation: `It's impossible if (n-1) % (k-1) != 0. dp[i][j] = min cost to merge stones[i..j] into as few piles as possible. Merge groups of k into 1. dp[i][j] for length divisible by (k-1)+1: add sum[i..j].`,
          code: `var mergeStones = function(stones, k) {
    const n=stones.length;
    if((n-1)%(k-1)!==0) return -1;
    const pre=new Array(n+1).fill(0);
    for(let i=0;i<n;i++) pre[i+1]=pre[i]+stones[i];
    const sum=(l,r)=>pre[r+1]-pre[l];
    const dp=Array.from({length:n},()=>new Array(n).fill(0));
    for(let len=k;len<=n;len++){
        for(let i=0;i+len-1<n;i++){
            const j=i+len-1;
            dp[i][j]=Infinity;
            for(let m=i;m<j;m+=k-1)
                dp[i][j]=Math.min(dp[i][j],dp[i][m]+dp[m+1][j]);
            if((len-1)%(k-1)===0) dp[i][j]+=sum(i,j);
        }
    }
    return dp[0][n-1];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '✂️',
      color: 'gray',
      content: `**DC DP optimization conditions:**\n- dp[j] = min over k of (prev[k] + cost(k, j))\n- opt(j) ≤ opt(j+1) where opt(j) = argmin k for state j\n- This holds when cost function satisfies the "monotone minima" property\n\n**Knuth-Yao conditions:** For interval DP dp[i][j] = min(dp[i][k]+dp[k][j]+w[i][j]):\n- w satisfies quadrangle inequality: w[a][c]+w[b][d] ≤ w[a][d]+w[b][c] for a≤b≤c≤d\n- Then opt[i][j-1] ≤ opt[i][j] ≤ opt[i+1][j]\n- Reduces O(n³) to O(n²)\n\n**Common applicable problems:** k-partition min cost, matrix chain multiplication (Knuth), optimal BST (Knuth), polygon triangulation.`,
    },
  ],
}
