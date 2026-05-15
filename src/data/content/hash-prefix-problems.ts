import type { Article } from '../articles'

export const hashPrefixProblemsArticle: Article = {
  slug: 'hash-prefix-problems',
  title: 'HashMap + Prefix Sum Patterns',
  emoji: '🗂️',
  tagline: 'Count subarrays with target sum, equal 0s and 1s, balanced strings.',
  description: 'Combining prefix sums with HashMaps enables O(n) solutions for subarray counting problems that would be O(n²) with naive approaches. Pattern: for each index i, look up whether (prefix[i] - target) has been seen before. Applications: count subarrays with sum k, find longest subarray with equal 0s and 1s, count balanced substrings, subarray XOR equals target.',
  gradient: 'from-indigo-600 to-blue-700',
  topicSlug: 'dp',
  readTime: '12 min',
  sections: [
    {
      type: 'text',
      content: `HashMap prefix pattern: maintain prefix sum and a map of {prefix_sum → earliest_index} or {prefix_sum → count}. For "longest subarray with sum = k": store earliest index for each prefix. For "count subarrays with sum = k": store count of each prefix. XOR variant: XOR has inverse of itself, so XOR prefix works identically. Transform 0→-1 to turn "equal count" problems into "sum = 0" problems.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Prefix HashMap for subarray counting and longest subarray',
      code: `// Count subarrays with sum = k
function subarraySum(nums, k) {
    const map = new Map([[0, 1]]);
    let sum = 0, count = 0;
    for (const n of nums) {
        sum += n;
        count += (map.get(sum - k) || 0);
        map.set(sum, (map.get(sum) || 0) + 1);
    }
    return count;
}

// Longest subarray with equal 0s and 1s (transform 0→-1, find longest sum=0 subarray)
function longestEqualBinary(nums) {
    const map = new Map([[0, -1]]); // prefix sum → first occurrence index
    let sum = 0, maxLen = 0;
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i] === 0 ? -1 : 1;
        if (map.has(sum)) maxLen = Math.max(maxLen, i - map.get(sum));
        else map.set(sum, i);
    }
    return maxLen;
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
      title: 'Contiguous Array',
      url: 'https://leetcode.com/problems/contiguous-array/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Transform 0→-1, find longest subarray with sum 0',
          explanation: `Equal 0s and 1s means their count difference = 0. Map 0→-1 so sum = 0 means equal counts. Use HashMap of {prefix_sum → first_index}. Longest subarray with same prefix = i - map.get(sum).`,
          code: `var findMaxLength = function(nums) {
    const map=new Map([[0,-1]]); let sum=0,max=0;
    for(let i=0;i<nums.length;i++){
        sum+=nums[i]?1:-1;
        if(map.has(sum)) max=Math.max(max,i-map.get(sum));
        else map.set(sum,i);
    }
    return max;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Subarray Sum Divisible by K',
      url: 'https://leetcode.com/problems/subarray-sum-divisible-by-k/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Count subarrays where (prefix[j] - prefix[i]) % k == 0',
          explanation: `prefix[j] % k == prefix[i] % k means sum[i+1..j] divisible by k. Count pairs of equal remainders using HashMap. Watch for negative remainders: use ((sum % k) + k) % k.`,
          code: `var subarraysDivByK = function(nums, k) {
    const map=new Map([[0,1]]); let sum=0,cnt=0;
    for(const n of nums){
        sum+=n;
        const rem=((sum%k)+k)%k;
        cnt+=(map.get(rem)||0);
        map.set(rem,(map.get(rem)||0)+1);
    }
    return cnt;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Count Number of Bad Pairs',
      url: 'https://leetcode.com/problems/count-number-of-bad-pairs/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Count good pairs (j-i == nums[j]-nums[i]) using transformed key',
          explanation: `j - i == nums[j] - nums[i] ↔ nums[j] - j == nums[i] - i. Count pairs with equal (nums[i] - i). Total pairs - good pairs = bad pairs.`,
          code: `var countBadPairs = function(nums) {
    const n=nums.length, map=new Map();
    let good=0;
    for(let i=0;i<n;i++){
        const key=nums[i]-i;
        good+=(map.get(key)||0);
        map.set(key,(map.get(key)||0)+1);
    }
    return n*(n-1)/2-good;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Make Sum Divisible by P',
      url: 'https://leetcode.com/problems/make-sum-divisible-by-p/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Find shortest subarray whose sum has same remainder as total',
          explanation: `Total sum % p = target. Remove shortest subarray with sum % p = target. Use HashMap of {prefix % p → last_index}. For each i, find last j where (prefix[i] - prefix[j]) % p = target.`,
          code: `var minSubarray = function(nums, p) {
    const total=nums.reduce((a,b)=>a+b,0)%p;
    if(total===0) return 0;
    const map=new Map([[0,-1]]); let sum=0,minLen=nums.length;
    for(let i=0;i<nums.length;i++){
        sum=(sum+nums[i])%p;
        const need=(sum-total+p)%p;
        if(map.has(need)) minLen=Math.min(minLen,i-map.get(need));
        map.set(sum,i);
    }
    return minLen===nums.length?-1:minLen;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🗂️',
      color: 'blue',
      content: `**HashMap prefix pattern:**\n- Count subarrays with sum = k: map stores {prefix → count}, look up (prefix - k)\n- Longest subarray with sum = k: map stores {prefix → first_index}, look up (prefix - k)\n- Divisibility: store remainders; two same remainders → divisible subarray between them\n\n**Transform tricks:**\n- Equal 0s and 1s: map 0→-1, find sum=0 subarray\n- At most k distinct: convert to "exactly k" via atMost(k) - atMost(k-1)\n- Divisible by k: use modular arithmetic on prefix sums\n\n**Handle negatives in mod:** Always use ((x % k) + k) % k to get non-negative remainder.`,
    },
  ],
}
