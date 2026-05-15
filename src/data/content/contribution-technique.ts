import type { Article } from '../articles'

export const contributionTechniqueArticle: Article = {
  slug: 'contribution-technique',
  title: 'Contribution Technique',
  emoji: '🧩',
  tagline: 'Count how many times each element contributes to the answer. Reverse the summation.',
  description: 'The contribution technique (also called "counting contribution of each element") reverses the order of summation: instead of summing over all subsets/pairs and computing element value, sum over all elements and count how many subsets/pairs include them. This converts O(n²) enumeration into O(n log n) or O(n) by exploiting structure. Core pattern for sum over all subarrays/subsets, XOR sum, max/min contribution.',
  gradient: 'from-rose-500 to-pink-600',
  topicSlug: 'dp',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `The key insight: instead of "for each pair (i,j), add f(arr[i..j])," rewrite as "for each element arr[k], in how many pairs (i,j) with i≤k≤j does arr[k] contribute?" Often the count has a closed form based on distances to boundaries or using monotonic stack to find "reach" of each element. This converts O(n²) sums into O(n) or O(n log n).`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Contribution of each element to subarray sums',
      code: `// Sum of all subarray sums = Σ arr[i] * (i+1) * (n-i)
// Reasoning: element arr[i] appears in subarrays [l,r] where l∈[0,i] and r∈[i,n-1]
// Count = (i+1) choices for l × (n-i) choices for r
function sumOfSubarraySums(arr) {
    const n = arr.length;
    let total = 0;
    for (let i = 0; i < n; i++) {
        total += arr[i] * (i + 1) * (n - i);
    }
    return total;
}

// Sum of subarray minimums = Σ arr[i] * (left_reach[i]+1) * (right_reach[i]+1)
// left_reach[i] = how far left can arr[i] be minimum (until a smaller element)
// right_reach[i] = how far right can arr[i] be minimum
// Use monotonic stack to compute both in O(n)
function sumSubarrayMins(arr) {
    const n = arr.length, MOD = 1e9 + 7;
    const left = new Array(n), right = new Array(n);
    const stack = [];
    // Left: distance to previous smaller element
    for (let i = 0; i < n; i++) {
        while (stack.length && arr[stack.at(-1)] >= arr[i]) stack.pop();
        left[i] = stack.length ? i - stack.at(-1) - 1 : i;
        stack.push(i);
    }
    stack.length = 0;
    // Right: distance to next smaller or equal element
    for (let i = n - 1; i >= 0; i--) {
        while (stack.length && arr[stack.at(-1)] > arr[i]) stack.pop();
        right[i] = stack.length ? stack.at(-1) - i - 1 : n - 1 - i;
        stack.push(i);
    }
    let ans = 0;
    for (let i = 0; i < n; i++) ans = (ans + arr[i] * (left[i]+1) * (right[i]+1)) % MOD;
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
      title: 'Sum of Subarray Minimums',
      url: 'https://leetcode.com/problems/sum-of-subarray-minimums/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: O(n²) brute force',
          explanation: `For each (l,r) pair, find minimum. O(n²) time, O(n²) subarrays.`,
          code: `var sumSubarrayMins = function(arr) {
    const MOD=1e9+7; let ans=0;
    for(let l=0;l<arr.length;l++){
        let min=arr[l];
        for(let r=l;r<arr.length;r++){
            min=Math.min(min,arr[r]);
            ans=(ans+min)%MOD;
        }
    }
    return ans;
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Contribution + monotonic stack — O(n)',
          explanation: `For each element arr[i], count subarrays where arr[i] is the minimum. Use monotonic stack to find: left[i] = number of elements to the left ≥ arr[i] (including i itself), right[i] = number of elements to the right > arr[i]. Contribution = arr[i] * left[i] * right[i].`,
          code: `var sumSubarrayMins = function(arr) {
    const n=arr.length, MOD=1e9+7;
    const left=new Array(n), right=new Array(n);
    const st=[];
    for(let i=0;i<n;i++){
        while(st.length&&arr[st.at(-1)]>=arr[i]) st.pop();
        left[i]=st.length?i-st.at(-1):i+1;
        st.push(i);
    }
    st.length=0;
    for(let i=n-1;i>=0;i--){
        while(st.length&&arr[st.at(-1)]>arr[i]) st.pop();
        right[i]=st.length?st.at(-1)-i:n-i;
        st.push(i);
    }
    let ans=0;
    for(let i=0;i<n;i++) ans=(ans+arr[i]*left[i]*right[i])%MOD;
    return ans;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Sum of Subarray Ranges',
      url: 'https://leetcode.com/problems/sum-of-subarray-ranges/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Sum of maximums minus sum of minimums',
          explanation: `range(subarray) = max - min. Sum of ranges = sum of all subarray maxes - sum of all subarray mins. Apply contribution technique twice: once for min (strictly less on right), once for max (strictly greater on right).`,
          code: `var subArrayRanges = function(nums) {
    const n=nums.length;
    const monoSum=(getMin)=>{
        const left=new Array(n),right=new Array(n),st=[];
        for(let i=0;i<n;i++){
            while(st.length&&(getMin?nums[st.at(-1)]>=nums[i]:nums[st.at(-1)]<=nums[i])) st.pop();
            left[i]=st.length?i-st.at(-1):i+1; st.push(i);
        }
        st.length=0;
        for(let i=n-1;i>=0;i--){
            while(st.length&&(getMin?nums[st.at(-1)]>nums[i]:nums[st.at(-1)]<nums[i])) st.pop();
            right[i]=st.length?st.at(-1)-i:n-i; st.push(i);
        }
        return nums.reduce((s,v,i)=>s+v*left[i]*right[i],0);
    };
    return monoSum(false)-monoSum(true);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Count Number of Texts',
      url: 'https://leetcode.com/problems/count-number-of-texts/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DP on consecutive same-digit runs',
          explanation: `For each run of k consecutive same digits, count ways to split. Digits 2,3,4,5,6,8,9 → max 3 consecutive per letter (abc, def...). Digits 7,9 → max 4. dp[i] = ways to decode prefix of length i. Contribution: dp[i] += dp[i-1] (single letter) + dp[i-2] if same (two letters) + dp[i-3] if same (three letters).`,
          code: `var countTexts = function(pressedKeys) {
    const MOD=1e9+7, n=pressedKeys.length;
    const dp=new Array(n+1).fill(0); dp[0]=1;
    for(let i=1;i<=n;i++){
        dp[i]=dp[i-1]; // single press
        const c=pressedKeys[i-1];
        const maxLen=c==='7'||c==='9'?4:3;
        if(i>=2&&pressedKeys[i-2]===c) dp[i]=(dp[i]+dp[i-2])%MOD;
        if(maxLen>=3&&i>=3&&pressedKeys[i-3]===c) dp[i]=(dp[i]+dp[i-3])%MOD;
        if(maxLen>=4&&i>=4&&pressedKeys[i-4]===c) dp[i]=(dp[i]+dp[i-4])%MOD;
    }
    return dp[n];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Total Appeal of All Substrings',
      url: 'https://leetcode.com/problems/total-appeal-of-all-substrings/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Contribution of each character position',
          explanation: `Appeal of substring = count of distinct chars. Instead of summing over all substrings, track how each new character contributes. For character at position i: it adds to the appeal of all substrings [l, r] where l ≤ i ≤ r AND no previous occurrence of this character in [l, i-1]. That means l must be > last occurrence of s[i]. Contribution = (i - last[s[i]]) × (n - i).`,
          code: `var appealSum = function(s) {
    const last=new Array(26).fill(-1);
    let ans=0, n=s.length;
    for(let i=0;i<n;i++){
        const c=s.charCodeAt(i)-97;
        ans+=(i-last[c])*(n-i); // new distinct char in (i-last[c]) subarrays ending at i
        last[c]=i;
    }
    return ans;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'XOR of All Pairings',
      url: 'https://leetcode.com/problems/bitwise-xor-of-all-pairings/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Each element\'s contribution by parity',
          explanation: `XOR all pairs (nums1[i] XOR nums2[j]). Each nums1[i] appears in n2 pairs → contributes XOR if n2 is odd. Each nums2[j] appears in n1 pairs → contributes XOR if n1 is odd. XOR is zero if even count. Final = (n2 odd ? XOR(nums1) : 0) XOR (n1 odd ? XOR(nums2) : 0).`,
          code: `var xorAllNums = function(nums1, nums2) {
    let ans=0;
    if(nums2.length%2) for(const v of nums1) ans^=v;
    if(nums1.length%2) for(const v of nums2) ans^=v;
    return ans;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧩',
      color: 'red',
      content: `**Contribution technique template:**\n1. Identify what each element contributes to the final answer\n2. Count in how many subsets/subarrays/pairs that element "dominates" or "appears"\n3. Multiply element × count, sum over all elements\n\n**Finding count (common helpers):**\n- For each element being subarray min/max: monotonic stack → O(n)\n- For each element being first occurrence of char: last-occurrence array → O(n)\n- For each element in all subarrays: element at index i → (i+1) × (n-i) subarrays\n\n**Key insight:** Σ over subarrays of f(subarray) = Σ over elements of contribution(element). Swapping the order of summation often reveals a simpler structure.`,
    },
  ],
}
