import type { Article } from '../articles'

export const meetInMiddleArticle: Article = {
  slug: 'meet-in-middle',
  title: 'Meet in the Middle',
  emoji: '🤝',
  tagline: 'Split problem in half. Enumerate each half independently. Combine in O(n log n).',
  description: 'Meet in the middle (MITM) reduces O(2^n) to O(2^(n/2)) by splitting the problem into two halves, enumerating all possibilities for each half, sorting one half, then binary-searching for complements. Solves subset sum, 4-sum, birthday paradox exploits, and cryptographic meet-in-the-middle attacks. Essential when n ≈ 40 (too large for brute force, too small for DP).',
  gradient: 'from-emerald-500 to-teal-600',
  topicSlug: 'dp',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `When n ≈ 40, brute-force 2^40 is too slow but DP is hard or doesn't apply. Meet in the middle: split into two halves of ~20 elements each. Enumerate all 2^20 subsets of each half, generating their sums/states. Sort one half's results. For each element in the other half's results, binary search for the complement. Total: O(2^(n/2) · n) instead of O(2^n).`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Meet in the middle template — subset sum',
      code: `// Count subsets with sum = target
// n up to 40: too slow for 2^40, but 2*2^20 is fine
function countSubsets(nums, target) {
    const n = nums.length;
    const half = n >> 1;
    const left = nums.slice(0, half);
    const right = nums.slice(half);

    // Enumerate all subset sums for left half
    const leftSums = [];
    for (let mask = 0; mask < (1 << left.length); mask++) {
        let sum = 0;
        for (let i = 0; i < left.length; i++) if ((mask >> i) & 1) sum += left[i];
        leftSums.push(sum);
    }
    leftSums.sort((a, b) => a - b);

    // For each right half subset, binary search for complement in left
    let count = 0;
    for (let mask = 0; mask < (1 << right.length); mask++) {
        let sum = 0;
        for (let i = 0; i < right.length; i++) if ((mask >> i) & 1) sum += right[i];
        const need = target - sum;
        // Count leftSums entries equal to need
        const lo = lowerBound(leftSums, need);
        const hi = upperBound(leftSums, need);
        count += hi - lo;
    }
    return count;
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
      title: 'Partition Array Into Two Arrays to Minimize Sum Difference',
      url: 'https://leetcode.com/problems/partition-array-into-two-arrays-to-minimize-sum-difference/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Meet in the middle — split, enumerate, binary search',
          explanation: `n up to 30. Split into two halves. For each half, enumerate all possible subset sums (indexed by how many elements taken). Total sum = S. We want to take n/2 elements with sum as close to S/2 as possible. For each k in left half, binary search right half sums[n/2 - k] for complement of S/2.`,
          code: `var minimumDifference = function(nums) {
    const n=nums.length,half=n>>1;
    const total=nums.reduce((a,b)=>a+b,0);
    const target=total/2;
    // Enumerate all subsets for each half, grouped by count
    const subsetSums=(arr)=>{
        const m=arr.length, groups=Array.from({length:m+1},()=>[]);
        for(let mask=0;mask<(1<<m);mask++){
            let s=0,cnt=0;
            for(let i=0;i<m;i++) if((mask>>i)&1){s+=arr[i];cnt++;}
            groups[cnt].push(s);
        }
        return groups.map(g=>g.sort((a,b)=>a-b));
    };
    const leftG=subsetSums(nums.slice(0,half));
    const rightG=subsetSums(nums.slice(half));
    let ans=Infinity;
    for(let k=0;k<=half;k++){
        const rg=rightG[half-k];
        for(const ls of leftG[k]){
            // Find rs in rg closest to (target - ls)
            const need=target-ls;
            let lo=0,hi=rg.length-1;
            while(lo<hi){const mid=(lo+hi)>>1;rg[mid]<need?lo=mid+1:hi=mid;}
            for(const idx of [lo,lo-1]) if(idx>=0&&idx<rg.length){
                const sum2=(ls+rg[idx]);
                ans=Math.min(ans,Math.abs(total-2*sum2));
            }
        }
    }
    return ans;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Four Sum II',
      url: 'https://leetcode.com/problems/4sum-ii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: MITM — hash all A+B sums, count -(C+D) matches',
          explanation: `Split 4 arrays into 2 groups: (A, B) and (C, D). Enumerate all n² sums A[i]+B[j], store in hashmap with counts. Then for each C[k]+D[l], count how many -(C[k]+D[l]) exist in the map.`,
          code: `var fourSumCount = function(nums1, nums2, nums3, nums4) {
    const map=new Map();
    for(const a of nums1) for(const b of nums2){
        const s=a+b;
        map.set(s,(map.get(s)||0)+1);
    }
    let count=0;
    for(const c of nums3) for(const d of nums4)
        count+=(map.get(-(c+d))||0);
    return count;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Closest Subsequence Sum',
      url: 'https://leetcode.com/problems/closest-subsequence-sum/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: MITM — enumerate half sums, sort, binary search complement',
          explanation: `n up to 40. Split nums into two halves. Enumerate all 2^20 subset sums for each. Sort right half sums. For each left sum L, binary search right sums for (goal - L). Best answer = min |L + R - goal| over all pairs.`,
          code: `var minAbsDifference = function(nums, goal) {
    const n=nums.length, half=n>>1;
    const getSums=(arr)=>{
        const sums=[];
        for(let mask=0;mask<(1<<arr.length);mask++){
            let s=0;
            for(let i=0;i<arr.length;i++) if((mask>>i)&1) s+=arr[i];
            sums.push(s);
        }
        return sums;
    };
    const left=getSums(nums.slice(0,half));
    const right=getSums(nums.slice(half)).sort((a,b)=>a-b);
    let ans=Infinity;
    for(const l of left){
        const need=goal-l;
        // Binary search for need in right
        let lo=0,hi=right.length-1;
        while(lo<hi){const mid=(lo+hi)>>1;right[mid]<need?lo=mid+1:hi=mid;}
        for(const idx of [lo,lo-1]) if(idx>=0&&idx<right.length)
            ans=Math.min(ans,Math.abs(l+right[idx]-goal));
    }
    return ans;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Shopping Offers',
      url: 'https://leetcode.com/problems/shopping-offers/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DFS with memoization on remaining needs',
          explanation: `State = remaining quantities needed. Try each offer if affordable, or pay full price for each item. Memoize by state vector. Not pure MITM but related "enumerate valid combinations" pattern.`,
          code: `var shoppingOffers = function(price, special, needs) {
    const memo=new Map();
    const dfs=(needs)=>{
        const key=needs.join(',');
        if(memo.has(key)) return memo.get(key);
        // Buy each item at full price
        let res=needs.reduce((sum,n,i)=>sum+n*price[i],0);
        for(const offer of special){
            const next=needs.map((n,i)=>n-offer[i]);
            if(next.every(n=>n>=0)){
                res=Math.min(res,offer.at(-1)+dfs(next));
            }
        }
        memo.set(key,res);
        return res;
    };
    return dfs(needs);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🤝',
      color: 'green',
      content: `**When to use MITM:**\n- n ≈ 40 (2^40 too slow, 2^20 fine)\n- Subset sum, counting subsets with property\n- Optimization over all subsets\n\n**Template:**\n1. Split input in half\n2. Enumerate all 2^(n/2) subsets of each half\n3. Sort one half's results\n4. For each result in other half: binary search for complement\n\n**Complexity:** O(2^(n/2) · n) instead of O(2^n)\n\n**Grouping trick:** For problems needing "take exactly k elements," group subset sums by count k. Then for each k in left half, look at right half sums[target_count - k] — avoids invalid pairings.`,
    },
  ],
}
