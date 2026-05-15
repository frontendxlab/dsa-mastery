import type { Article } from '../articles'

export const binarySearchAnswerArticle: Article = {
  slug: 'binary-search-answer',
  title: 'Binary Search on Answer',
  emoji: '🎯',
  tagline: 'When you can check "is X achievable?" in O(f(n)), find optimal X in O(f(n) log range).',
  description: 'Binary search on the answer (parametric search) solves optimization problems by converting them to decision problems: "Is it possible to achieve value ≤ X?" If this check is monotone (feasible for all X ≥ threshold), binary search finds the threshold. Covers: minimize maximum, maximize minimum, k-th element in matrix, allocation problems, and any problem where the answer has a monotone feasibility function.',
  gradient: 'from-blue-600 to-indigo-700',
  topicSlug: 'dp',
  readTime: '16 min',
  sections: [
    {
      type: 'text',
      content: `The pattern: (1) Identify that the answer has a monotone structure — if X is achievable, so is X+1 (or X-1). (2) Write a check(X) function: "can we achieve value ≤ X?" (3) Binary search for the smallest X where check(X) is true. Key: the check function must be O(n) or O(n log n), making total complexity O(n log(range)). Works for: minimize, maximize, k-th smallest, feasibility with thresholds.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Binary search on answer template',
      code: `// Template: find minimum X such that check(X) is true
// Requires: if check(X) is true, then check(X+1) is also true
function binarySearchAnswer(lo, hi, check) {
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (check(mid)) hi = mid;  // X is feasible, try smaller
        else lo = mid + 1;         // X is not feasible, need larger
    }
    return lo; // smallest feasible X
}

// Template for maximum (largest X where check is true):
function binarySearchAnswerMax(lo, hi, check) {
    while (lo < hi) {
        const mid = Math.floor((lo + hi + 1) / 2); // upper mid to avoid infinite loop
        if (check(mid)) lo = mid;  // feasible, try larger
        else hi = mid - 1;         // not feasible, go smaller
    }
    return lo; // largest feasible X
}

// Floating point binary search (e.g., "find x where f(x) = target"):
function binarySearchFloat(lo, hi, check, eps = 1e-9) {
    for (let i = 0; i < 100; i++) {
        const mid = (lo + hi) / 2;
        if (check(mid)) hi = mid;
        else lo = mid;
    }
    return (lo + hi) / 2;
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
      title: 'Koko Eating Bananas',
      url: 'https://leetcode.com/problems/koko-eating-bananas/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Binary search on eating speed',
          explanation: `Answer: minimum speed k. Check: can Koko finish all piles in h hours at speed k? Hours needed = Σ ceil(pile/k). Binary search k in [1, max(piles)].`,
          code: `var minEatingSpeed = function(piles, h) {
    let lo=1, hi=Math.max(...piles);
    while(lo<hi){
        const mid=(lo+hi)>>1;
        const hours=piles.reduce((s,p)=>s+Math.ceil(p/mid),0);
        hours<=h?hi=mid:lo=mid+1;
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
      title: 'Capacity To Ship Packages Within D Days',
      url: 'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Binary search on ship capacity',
          explanation: `Minimum capacity = max(weights) (must fit heaviest). Maximum = sum(all weights) (one day). Binary search in this range. Check: can we ship all packages in ≤ d days with capacity c? Greedy: fill each day until next package would exceed capacity.`,
          code: `var shipWithinDays = function(weights, days) {
    let lo=Math.max(...weights), hi=weights.reduce((a,b)=>a+b,0);
    while(lo<hi){
        const mid=(lo+hi)>>1;
        let d=1, cur=0;
        for(const w of weights){if(cur+w>mid){d++;cur=0;} cur+=w;}
        d<=days?hi=mid:lo=mid+1;
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
      title: 'Minimum Number of Days to Make m Bouquets',
      url: 'https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Binary search on day number',
          explanation: `Answer: minimum day. Check: on day d, how many bouquets can we make? Flowers that bloomed (bloomDay ≤ d) form consecutive groups. Count groups of k consecutive bloomed flowers = number of bouquets. Need ≥ m.`,
          code: `var minDays = function(bloomDay, m, k) {
    if(bloomDay.length<m*k) return -1;
    let lo=1, hi=Math.max(...bloomDay);
    const check=(d)=>{
        let bouquets=0,consec=0;
        for(const b of bloomDay){b<=d?consec++:(bouquets+=Math.floor(consec/k),consec=0);}
        return bouquets+Math.floor(consec/k)>=m;
    };
    while(lo<hi){const mid=(lo+hi)>>1;check(mid)?hi=mid:lo=mid+1;}
    return lo;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Minimize Max Distance to Gas Station',
      url: 'https://leetcode.com/problems/minimize-max-distance-to-gas-station/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Binary search on maximum gap (floating point)',
          explanation: `Binary search on the answer D (maximum allowed gap). Check: given max gap D, how many stations do we need to insert? For each existing gap g, need ceil(g/D)-1 stations. If total ≤ k: feasible. Use floating point binary search.`,
          code: `var minmaxGasDist = function(stations, k) {
    const n=stations.length;
    const check=(D)=>{
        let cnt=0;
        for(let i=1;i<n;i++) cnt+=Math.ceil((stations[i]-stations[i-1])/D)-1;
        return cnt<=k;
    };
    let lo=0,hi=stations[n-1]-stations[0];
    for(let i=0;i<100;i++){
        const mid=(lo+hi)/2;
        check(mid)?hi=mid:lo=mid;
    }
    return lo;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Kth Smallest Number in Multiplication Table',
      url: 'https://leetcode.com/problems/kth-smallest-number-in-multiplication-table/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Binary search on value — count elements ≤ X',
          explanation: `Binary search on the answer X. Check: how many numbers in the m×n multiplication table are ≤ X? Row i has min(X/i, n) elements ≤ X. Sum over all rows. If count ≥ k, X might be the answer.`,
          code: `var findKthNumber = function(m, n, k) {
    let lo=1,hi=m*n;
    while(lo<hi){
        const mid=(lo+hi)>>1;
        let cnt=0;
        for(let i=1;i<=m;i++) cnt+=Math.min(Math.floor(mid/i),n);
        cnt>=k?hi=mid:lo=mid+1;
    }
    return lo;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🎯',
      color: 'blue',
      content: `**Recognition pattern:** "minimize the maximum" or "maximize the minimum" → binary search on the answer.\n\n**Check function design:**\n- For "minimize max": check(X) = "can we stay ≤ X?" → greedy\n- For "maximize min": check(X) = "can we achieve ≥ X everywhere?" → greedy\n- For "k-th element": check(X) = "how many elements ≤ X?" → count then compare to k\n\n**Boundary handling:**\n- Minimize: lo=min feasible, hi=max possible; if check(mid) → hi=mid else lo=mid+1\n- Maximize: use upper mid (lo+hi+1)>>1; if check(mid) → lo=mid else hi=mid-1\n- Floating point: 100 iterations of (lo+hi)/2 gives ~30 decimal digits of precision`,
    },
  ],
}
