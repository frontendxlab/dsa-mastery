import type { Article } from '../articles'

export const slidingWindowAdvancedArticle: Article = {
  slug: 'sliding-window-advanced',
  title: 'Sliding Window — Advanced Patterns',
  emoji: '🪟',
  tagline: 'At-most-k trick: exactly-k = at-most-k minus at-most-(k-1). Frequency-based windows.',
  description: 'Advanced sliding window patterns beyond the basics: (1) at-most-k trick to count subarrays with exactly k distinct elements; (2) minimum window with frequency constraints; (3) sliding window with deque for range max/min; (4) multiple-pointer windows for complex conditions. The "exactly k = at-most-k minus at-most-(k-1)" identity is the key trick for counting problems.',
  gradient: 'from-teal-600 to-cyan-700',
  topicSlug: 'dp',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `The at-most-k trick: count(exactly k) = count(at-most-k) - count(at-most-(k-1)). This converts "count subarrays with exactly k distinct" into two easier "at-most" problems, each solvable in O(n) with a shrinking window. For minimum window substring: expand right until condition met, shrink left while condition holds.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'At-most-k trick and min window template',
      code: `// Count subarrays with exactly k distinct elements
// = atMost(k) - atMost(k-1)
function countExactlyK(nums, k) {
    const atMost = (limit) => {
        const freq = new Map();
        let count = 0, l = 0;
        for (let r = 0; r < nums.length; r++) {
            freq.set(nums[r], (freq.get(nums[r]) || 0) + 1);
            while (freq.size > limit) {
                const lv = nums[l++];
                freq.set(lv, freq.get(lv) - 1);
                if (!freq.get(lv)) freq.delete(lv);
            }
            count += r - l + 1; // all subarrays ending at r with ≤ limit distinct
        }
        return count;
    };
    return atMost(k) - atMost(k - 1);
}

// Minimum window containing all characters of t
function minWindow(s, t) {
    const need = new Map(), have = new Map();
    for (const c of t) need.set(c, (need.get(c) || 0) + 1);
    let satisfied = 0, minLen = Infinity, l = 0, res = '';
    for (let r = 0; r < s.length; r++) {
        have.set(s[r], (have.get(s[r]) || 0) + 1);
        if (need.has(s[r]) && have.get(s[r]) === need.get(s[r])) satisfied++;
        while (satisfied === need.size) {
            if (r - l + 1 < minLen) { minLen = r - l + 1; res = s.slice(l, r + 1); }
            have.set(s[l], have.get(s[l]) - 1);
            if (need.has(s[l]) && have.get(s[l]) < need.get(s[l])) satisfied--;
            l++;
        }
    }
    return res;
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
      title: 'Subarrays with K Different Integers',
      url: 'https://leetcode.com/problems/subarrays-with-k-different-integers/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: at-most(k) - at-most(k-1)',
          explanation: `Subarrays with exactly k distinct = subarrays with ≤k distinct - subarrays with ≤(k-1) distinct. Each count computed with shrinking window in O(n).`,
          code: `var subarraysWithKDistinct = function(nums, k) {
    const atMost=(lim)=>{
        const freq=new Map(); let cnt=0,l=0;
        for(let r=0;r<nums.length;r++){
            freq.set(nums[r],(freq.get(nums[r])||0)+1);
            while(freq.size>lim){const v=nums[l++];freq.set(v,freq.get(v)-1);if(!freq.get(v))freq.delete(v);}
            cnt+=r-l+1;
        }
        return cnt;
    };
    return atMost(k)-atMost(k-1);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Count Subarrays Where Max Element Appears at Least K Times',
      url: 'https://leetcode.com/problems/count-subarrays-where-max-element-appears-at-least-k-times/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Two pointers — for each right, find leftmost valid left',
          explanation: `Find global max. For each right endpoint r where nums[r] = max: slide left to maintain at least k occurrences. Count += l+1 (all subarrays starting from 0..l ending at r are valid).`,
          code: `var countSubarrays = function(nums, k) {
    const maxVal=Math.max(...nums); let cnt=0,res=0,l=0;
    for(let r=0;r<nums.length;r++){
        if(nums[r]===maxVal) cnt++;
        while(cnt>=k){if(nums[l]===maxVal)cnt--;l++;}
        res+=l;
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
      title: 'Minimum Size Subarray in Infinite Array',
      url: 'https://leetcode.com/problems/minimum-size-subarray-in-infinite-array/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Sliding window on doubled array',
          explanation: `Work with the array repeated twice (length 2n). Sliding window to find minimum window with sum ≡ target (mod total). Additional constraint: length ≤ 2n.`,
          code: `var minSizeSubarray = function(nums, target) {
    const n=nums.length, total=nums.reduce((a,b)=>a+b,0);
    const rem=target%total, k=Math.floor(target/total);
    if(rem===0) return k*n;
    // Find min subarray in nums+nums with sum === rem
    const arr=[...nums,...nums]; let sum=0,l=0,best=Infinity;
    for(let r=0;r<2*n;r++){
        sum+=arr[r];
        while(sum>rem){sum-=arr[l++];}
        if(sum===rem) best=Math.min(best,r-l+1);
    }
    return best===Infinity?-1:best+k*n;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Longest Substring with At Most Two Distinct Characters',
      url: 'https://leetcode.com/problems/longest-substring-with-at-most-two-distinct-characters/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Sliding window with frequency map',
          explanation: `Expand right, shrink left when distinct count exceeds 2. Track max window size.`,
          code: `var lengthOfLongestSubstringTwoDistinct = function(s) {
    const freq=new Map(); let l=0,res=0;
    for(let r=0;r<s.length;r++){
        freq.set(s[r],(freq.get(s[r])||0)+1);
        while(freq.size>2){
            const v=freq.get(s[l])-1;
            if(!v) freq.delete(s[l]); else freq.set(s[l],v);
            l++;
        }
        res=Math.max(res,r-l+1);
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🪟',
      color: 'teal',
      content: `**Advanced sliding window patterns:**\n- Exactly k distinct: atMost(k) - atMost(k-1)\n- Min window with all chars: expand right, shrink left greedily\n- Max element k times: track count of max, shrink when count ≥ k\n- Window with constraint on sum: shrink when exceeds, expand otherwise\n\n**Key insight for "at most k":** Count of subarrays ending at r with at most k distinct = r - l + 1, where l is the leftmost valid start. This counts all valid right-ends for subarrays ending at r.\n\n**Template:** right pointer always advances; left pointer shrinks when constraint violated.`,
    },
  ],
}
