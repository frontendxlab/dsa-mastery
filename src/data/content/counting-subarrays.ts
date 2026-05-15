import type { Article } from '../articles'

export const countingSubarraysArticle: Article = {
  slug: 'counting-subarrays',
  title: 'Counting Subarrays & Substrings',
  emoji: '🔢',
  tagline: 'Count subarrays satisfying constraints. Prefix sums, two pointers, "at most K" trick.',
  description: 'Count subarrays problems require counting contiguous segments satisfying a property: sum ≤ k, exactly k distinct elements, at most one zero, XOR = target. Key techniques: prefix sum counting (hashmap of prefix sums), "at most k" trick (exact k = atMost(k) - atMost(k-1)), two-pointer for monotone conditions, contribution technique (how many subarrays contain this element as min/max).',
  gradient: 'from-sky-700 to-blue-800',
  topicSlug: 'dp',
  readTime: '13 min',
  sections: [
    {
      type: 'text',
      content: `"Exactly k" = atMost(k) - atMost(k-1): convert exact-count problem to at-most, solved with two pointers. Prefix sum trick: count subarrays with sum = target using HashMap of prefix sum frequencies. XOR subarrays: same as sum but with XOR, HashMap of prefix XOR. Contribution: for each element as min/max, count subarrays where it's the min/max using next smaller/greater element.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Count subarrays with sum = k and "atMost k" trick',
      code: `// Count subarrays with sum = k using prefix sum HashMap
function subarraySum(nums, k) {
    const map = new Map([[0, 1]]); // prefix sum → count
    let sum = 0, count = 0;
    for (const n of nums) {
        sum += n;
        count += (map.get(sum - k) || 0); // subarrays ending here with sum = k
        map.set(sum, (map.get(sum) || 0) + 1);
    }
    return count;
}

// Count subarrays with exactly k distinct elements
// exactlyK(k) = atMost(k) - atMost(k-1)
function subarraysWithKDistinct(nums, k) {
    function atMost(limit) {
        const count = new Map();
        let l = 0, result = 0;
        for (let r = 0; r < nums.length; r++) {
            count.set(nums[r], (count.get(nums[r]) || 0) + 1);
            while (count.size > limit) {
                const lv = nums[l++];
                count.set(lv, count.get(lv) - 1);
                if (!count.get(lv)) count.delete(lv);
            }
            result += r - l + 1; // all subarrays ending at r with ≤ limit distinct
        }
        return result;
    }
    return atMost(k) - atMost(k - 1);
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
      title: 'Subarray Sum Equals K',
      url: 'https://leetcode.com/problems/subarray-sum-equals-k/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Prefix sum HashMap — count times (prefix - k) was seen',
          explanation: `sum[l..r] = k ↔ prefix[r] - prefix[l-1] = k ↔ prefix[l-1] = prefix[r] - k. For each r, count how many previous prefixes equal prefix[r] - k.`,
          code: `var subarraySum = function(nums, k) {
    const map=new Map([[0,1]]); let sum=0,cnt=0;
    for(const n of nums){
        sum+=n; cnt+=(map.get(sum-k)||0);
        map.set(sum,(map.get(sum)||0)+1);
    }
    return cnt;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Subarrays with K Different Integers',
      url: 'https://leetcode.com/problems/subarrays-with-k-different-integers/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: exactlyK = atMost(k) - atMost(k-1)',
          explanation: `atMost(k): two-pointer counting subarrays with ≤ k distinct. Each valid window ending at r contributes r-l+1 subarrays. Exact k = difference of two atMost calls.`,
          code: `var subarraysWithKDistinct = function(nums, k) {
    const atMost=lim=>{
        const cnt=new Map(); let l=0,res=0;
        for(let r=0;r<nums.length;r++){
            cnt.set(nums[r],(cnt.get(nums[r])||0)+1);
            while(cnt.size>lim){
                const v=nums[l++]; cnt.set(v,cnt.get(v)-1);
                if(!cnt.get(v)) cnt.delete(v);
            }
            res+=r-l+1;
        }
        return res;
    };
    return atMost(k)-atMost(k-1);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Count Number of Nice Subarrays',
      url: 'https://leetcode.com/problems/count-number-of-nice-subarrays/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Treat odd=1, even=0, then subarray sum = k (prefix sum HashMap)',
          explanation: `Map each number to 1 (odd) or 0 (even). Count subarrays with sum exactly k — same as subarray sum equals k problem.`,
          code: `var numberOfSubarrays = function(nums, k) {
    const map=new Map([[0,1]]); let sum=0,cnt=0;
    for(const n of nums){
        sum+=n%2; cnt+=(map.get(sum-k)||0);
        map.set(sum,(map.get(sum)||0)+1);
    }
    return cnt;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Number of Substrings Containing All Three Characters',
      url: 'https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Track last occurrence — for each r, count valid starting points',
          explanation: `Track lastSeen[a/b/c]. For each r, the minimum of lastSeen gives the leftmost position where all 3 are present. All windows [0..minLast] to [r] are valid: add (minLast + 1) to answer.`,
          code: `var numberOfSubstrings = function(s) {
    const last=[-1,-1,-1]; let cnt=0;
    for(let r=0;r<s.length;r++){
        last[s.charCodeAt(r)-97]=r;
        cnt+=Math.min(...last)+1;
    }
    return cnt;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🔢',
      color: 'blue',
      content: `**Counting subarrays toolkit:**\n- Sum = k: prefix sum HashMap, count(prefix[i] - k)\n- XOR = k: same but with XOR prefix array\n- Exactly k distinct: atMost(k) - atMost(k-1)\n- Contains all of set: last-seen positions, min(last_seen) + 1 per right pointer\n\n**atMost trick works when:** "exactly k" = "at most k" - "at most k-1". This requires the property to be monotone: if subarray satisfies the property, any subarray containing it also satisfies it (or a related condition). Works for distinct counts, sum constraints with positive numbers.`,
    },
  ],
}
