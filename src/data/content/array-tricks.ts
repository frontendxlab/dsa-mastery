import type { Article } from '../articles'

export const arrayTricksArticle: Article = {
  slug: 'array-tricks',
  title: 'Array Manipulation Tricks',
  emoji: '🔧',
  tagline: 'Rotate with 3 reverses. Mark visited in-place. Rearrange with index encoding.',
  description: 'Array manipulation problems often require O(1) extra space. Key tricks: rotate k positions with 3 reverses, mark visited by negating values, rearrange using index encoding (val-1 → index), cyclic sort for 1..n arrays. These patterns appear constantly but easy to miss.',
  gradient: 'from-slate-500 to-zinc-600',
  topicSlug: 'dp',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `Array in-place manipulation problems have a deceptive pattern: the O(n) extra space solution is obvious, but the O(1) space version requires a non-trivial trick. Learn the three canonical tricks — 3-reversal rotation, negation marking, and index encoding — and you'll be able to solve a whole class of problems that seem impossible at O(1) space.`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'The Three Canonical Tricks',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Rotate array, mark visited, index encoding',
      code: `// TRICK 1: ROTATE ARRAY k positions (right) using 3 reverses
function rotate(nums, k) {
    k = k % nums.length;
    const rev = (lo, hi) => { while(lo<hi) [nums[lo++],nums[hi--]]=[nums[hi],nums[lo-1]]; };
    rev(0, nums.length-1);  // reverse all
    rev(0, k-1);             // reverse first k
    rev(k, nums.length-1);   // reverse remaining
}
// Why it works: [1,2,3,4,5], k=2
// reverse all: [5,4,3,2,1]
// reverse 0..k-1: [4,5,3,2,1]
// reverse k..n-1: [4,5,1,2,3] ✓

// TRICK 2: MARK VISITED by negating (array values 1..n)
// Visit index i → nums[nums[i]-1] = -|nums[nums[i]-1]|
// Check if value v is visited: nums[v-1] < 0
function findDuplicates(nums) {
    const result = [];
    for (const n of nums) {
        const idx = Math.abs(n) - 1;
        if (nums[idx] < 0) result.push(Math.abs(n)); // visited twice = duplicate
        else nums[idx] = -nums[idx]; // mark visited
    }
    return result;
}

// TRICK 3: CYCLIC SORT (array with values 1..n)
// Place each number at index (value-1) by swapping
function cyclicSort(nums) {
    let i = 0;
    while (i < nums.length) {
        const j = nums[i] - 1; // correct index for nums[i]
        if (nums[i] !== nums[j]) [nums[i], nums[j]] = [nums[j], nums[i]]; // swap to correct pos
        else i++;                // already in place, move on
    }
}
// After cyclic sort: nums[i] = i+1 iff no duplicate/missing`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Rotate Array',
      url: 'https://leetcode.com/problems/rotate-array/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Extra array — copy to shifted positions',
          explanation: `new[( i + k) % n] = nums[i]. O(n) space.`,
        },
        {
          label: 'Intuition 2: 3 reverses — O(1) space',
          explanation: `Reverse whole array. Reverse first k elements. Reverse remaining elements. Three simple in-place reverses = one rotation.`,
          code: `var rotate = function(nums, k) {
    k=k%nums.length;
    const rev=(l,r)=>{while(l<r)[nums[l++],nums[r--]]=[nums[r],nums[l-1]];};
    rev(0,nums.length-1); rev(0,k-1); rev(k,nums.length-1);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Find All Duplicates in an Array',
      url: 'https://leetcode.com/problems/find-all-duplicates-in-an-array/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Negation trick — use array as visited marker',
          explanation: `Values are 1..n. For each value v, negate nums[v-1]. If it's already negative, v appeared before → duplicate.`,
          code: `var findDuplicates = function(nums) {
    const res=[];
    for(const n of nums){
        const idx=Math.abs(n)-1;
        if(nums[idx]<0) res.push(Math.abs(n));
        else nums[idx]=-nums[idx];
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
      title: 'First Missing Positive',
      url: 'https://leetcode.com/problems/first-missing-positive/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Cyclic sort — place values 1..n at index 0..n-1',
          explanation: `Sort values 1..n into their correct positions (v at index v-1). Then scan for the first index where nums[i] ≠ i+1. That i+1 is the answer. Values outside [1,n] are ignored.`,
          code: `var firstMissingPositive = function(nums) {
    const n=nums.length;
    let i=0;
    while(i<n){
        const j=nums[i]-1;
        if(nums[i]>0&&nums[i]<=n&&nums[i]!==nums[j])[nums[i],nums[j]]=[nums[j],nums[i]];
        else i++;
    }
    for(let i=0;i<n;i++) if(nums[i]!==i+1) return i+1;
    return n+1;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Find All Numbers Disappeared in an Array',
      url: 'https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Negation trick — mark present values',
          explanation: `For each value v, negate nums[v-1] to mark v as "seen." After processing, indices with positive values → those indices+1 are missing.`,
          code: `var findDisappearedNumbers = function(nums) {
    for(const n of nums){
        const idx=Math.abs(n)-1;
        if(nums[idx]>0) nums[idx]=-nums[idx]; // mark as seen
    }
    const res=[];
    for(let i=0;i<nums.length;i++) if(nums[i]>0) res.push(i+1); // not seen
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Next Permutation',
      url: 'https://leetcode.com/problems/next-permutation/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Find rightmost dip, swap, reverse suffix',
          explanation: `1. Find rightmost i where nums[i] < nums[i+1] (last "dip"). 2. Find rightmost j > i where nums[j] > nums[i]. 3. Swap nums[i] and nums[j]. 4. Reverse nums[i+1..end]. If no dip found (descending), just reverse all.`,
          code: `var nextPermutation = function(nums) {
    const n=nums.length;
    let i=n-2;
    while(i>=0&&nums[i]>=nums[i+1]) i--;
    if(i>=0){
        let j=n-1;
        while(nums[j]<=nums[i]) j--;
        [nums[i],nums[j]]=[nums[j],nums[i]];
    }
    // Reverse suffix
    let lo=i+1,hi=n-1;
    while(lo<hi)[nums[lo++],nums[hi--]]=[nums[hi],nums[lo-1]];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 6,
      title: 'Rearrange Array Elements by Sign',
      url: 'https://leetcode.com/problems/rearrange-array-elements-by-sign/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Two pointers — one for positive slot, one for negative slot',
          explanation: `Result alternates positive/negative. Use two index pointers: posIdx=0, negIdx=1. Scan through array, placing positives at even indices and negatives at odd indices.`,
          code: `var rearrangeArray = function(nums) {
    const res=new Array(nums.length);
    let pos=0,neg=1;
    for(const n of nums){
        if(n>0){res[pos]=n;pos+=2;}
        else{res[neg]=n;neg+=2;}
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🔧',
      color: 'slate',
      content: `**Array manipulation trick selector:**\n- "Rotate k positions in O(1) space" → 3 reverses\n- "Mark visited without extra space (values 1..n)" → negate at index value-1\n- "Place each value at correct index (1..n)" → cyclic sort\n- "Find missing/duplicate in 1..n array" → cyclic sort, then scan for mismatch\n- "Next permutation" → find rightmost dip, swap with just-larger, reverse suffix\n- "Rearrange by condition" → two pointers with step 2 for alternating pattern`,
    },
  ],
}
