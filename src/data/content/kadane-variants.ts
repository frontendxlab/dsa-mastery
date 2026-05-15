import type { Article } from '../articles'

export const kadaneVariantsArticle: Article = {
  slug: 'kadane-variants',
  title: 'Kadane\'s Algorithm & Subarray Variants',
  emoji: '📊',
  tagline: 'Max subarray sum in O(n). Circular variant, k disjoint subarrays, submatrix.',
  description: 'Kadane\'s algorithm finds the maximum subarray sum in O(n). Key variants: (1) circular array — subtract min subarray from total; (2) at most k elements; (3) k disjoint non-overlapping subarrays; (4) maximum sum submatrix. All share the core insight of maintaining a running "best" and "current" state as we scan.',
  gradient: 'from-orange-600 to-red-700',
  topicSlug: 'dp',
  readTime: '15 min',
  sections: [
    {
      type: 'text',
      content: `Kadane's classic: scan left to right, maintaining current_sum (extend or restart) and max_sum. For circular arrays: max of (max linear subarray) and (total sum - min linear subarray). The min subarray covers elements NOT in the circular maximum subarray. For k disjoint subarrays: DP with k states. For submatrix: fix top and bottom rows, apply Kadane to column sums.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Kadane\'s variants',
      code: `// Classic Kadane's
function maxSubarray(nums) {
    let maxSum = -Infinity, cur = 0;
    for (const n of nums) {
        cur = Math.max(n, cur + n);
        maxSum = Math.max(maxSum, cur);
    }
    return maxSum;
}

// Circular variant: total - minSubarray OR maxSubarray (handle all-negative)
function maxCircular(nums) {
    const total = nums.reduce((a, b) => a + b, 0);
    let maxSum = -Infinity, minSum = Infinity, curMax = 0, curMin = 0;
    for (const n of nums) {
        curMax = Math.max(n, curMax + n); maxSum = Math.max(maxSum, curMax);
        curMin = Math.min(n, curMin + n); minSum = Math.min(minSum, curMin);
    }
    return maxSum > 0 ? Math.max(maxSum, total - minSum) : maxSum;
}

// Maximum submatrix sum: fix top row r1, extend to bottom r2, apply Kadane to column sums
function maxSubmatrix(matrix) {
    const m = matrix.length, n = matrix[0].length;
    let ans = -Infinity;
    for (let r1 = 0; r1 < m; r1++) {
        const colSum = new Array(n).fill(0);
        for (let r2 = r1; r2 < m; r2++) {
            for (let c = 0; c < n; c++) colSum[c] += matrix[r2][c];
            ans = Math.max(ans, maxSubarray(colSum));
        }
    }
    return ans;
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
      title: 'Maximum Subarray',
      url: 'https://leetcode.com/problems/maximum-subarray/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Kadane\'s — restart at each element if running sum goes negative',
          explanation: `Maintain current_sum = max(current + n, n). If extending is worse than starting fresh, restart. Track global maximum.`,
          code: `var maxSubArray = function(nums) {
    let cur=nums[0],max=nums[0];
    for(let i=1;i<nums.length;i++){cur=Math.max(nums[i],cur+nums[i]);max=Math.max(max,cur);}
    return max;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Maximum Sum Circular Subarray',
      url: 'https://leetcode.com/problems/maximum-sum-circular-subarray/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: max(linear_max, total - linear_min)',
          explanation: `Either the max subarray doesn't wrap (= linear max), or it does (= total - min non-wrapping subarray). Special case: if all elements are negative, linear max = the single max element (can't use circular formula as it would give 0).`,
          code: `var maxSubarraySumCircular = function(nums) {
    const total=nums.reduce((a,b)=>a+b,0);
    let maxS=-Infinity,minS=Infinity,curMax=0,curMin=0;
    for(const n of nums){
        curMax=Math.max(n,curMax+n); maxS=Math.max(maxS,curMax);
        curMin=Math.min(n,curMin+n); minS=Math.min(minS,curMin);
    }
    return maxS>0?Math.max(maxS,total-minS):maxS;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Maximum Sum of Two Non-Overlapping Subarrays',
      url: 'https://leetcode.com/problems/maximum-sum-of-two-non-overlapping-subarrays/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Prefix sums + track best L-sum ending before each R-subarray',
          explanation: `For each position i, consider: best L-length subarray ending at or before i, plus best M-length subarray starting at or after i+1. Scan twice (L first or M first). Also scan in reverse for symmetry.`,
          code: `var maxSumTwoNoOverlap = function(nums, firstLen, secondLen) {
    const n=nums.length, pre=new Array(n+1).fill(0);
    for(let i=0;i<n;i++) pre[i+1]=pre[i]+nums[i];
    const sum=(l,r)=>pre[r]-pre[l];
    const solve=(L,M)=>{
        let maxL=0,res=0;
        for(let i=L+M;i<=n;i++){
            maxL=Math.max(maxL,sum(i-L-M,i-M));
            res=Math.max(res,maxL+sum(i-M,i));
        }
        return res;
    };
    return Math.max(solve(firstLen,secondLen),solve(secondLen,firstLen));
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Max Sum of Rectangle No Larger Than K',
      url: 'https://leetcode.com/problems/max-sum-of-rectangle-no-larger-than-k/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Fix rows, Kadane for columns with sorted set for constraint',
          explanation: `Fix top row r1, extend to bottom row r2. Maintain column prefix sums. For the "no larger than k" constraint: use a sorted set of prefix sums — for current sum S, find the smallest prevS in the set where S - prevS ≤ k → prevS ≥ S - k (lower_bound query).`,
          code: `var maxSumSubmatrix = function(matrix, k) {
    const m=matrix.length,n=matrix[0].length; let ans=-Infinity;
    for(let c1=0;c1<n;c1++){
        const row=new Array(m).fill(0);
        for(let c2=c1;c2<n;c2++){
            for(let r=0;r<m;r++) row[r]+=matrix[r][c2];
            // Find max subarray sum ≤ k in row[]
            const sorted=[0]; let preSum=0;
            for(const v of row){
                preSum+=v;
                // Find smallest x in sorted where preSum-x ≤ k → x ≥ preSum-k
                let lo=0,hi=sorted.length-1,best=sorted.length;
                while(lo<=hi){const mid=(lo+hi)>>1;sorted[mid]>=preSum-k?(best=mid,hi=mid-1):lo=mid+1;}
                if(best<sorted.length) ans=Math.max(ans,preSum-sorted[best]);
                // Insert preSum into sorted
                let p=sorted.findIndex(x=>x>preSum);
                if(p===-1) sorted.push(preSum); else sorted.splice(p,0,preSum);
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
      type: 'callout',
      icon: '📊',
      color: 'orange',
      content: `**Kadane variants cheat sheet:**\n- Classic max subarray: O(n) with restart-or-extend\n- Circular: max(linear, total - linear_min), exclude all-negative case\n- Submatrix max sum: fix two rows, Kadane on column prefix sums, O(m²n)\n- Max ≤ k: sorted set of prefix sums, O(mn² log m)\n- k disjoint subarrays: DP with k states, O(nk)\n\n**Classic pitfall:** Circular formula gives 0 when all elements negative (total - total = 0 is wrong). Check if maxSum > 0 first.`,
    },
  ],
}
