import type { Article } from '../articles'

export const nextPermutationArticle: Article = {
  slug: 'next-permutation',
  title: 'Next Permutation & Lexicographic Order',
  emoji: '🔢',
  tagline: 'Find next/previous permutation in-place. Kth permutation, all permutations in order.',
  description: 'Next permutation: find the next arrangement in lexicographic order. Algorithm: (1) find rightmost i where nums[i] < nums[i+1], (2) find rightmost j > i where nums[j] > nums[i], (3) swap, (4) reverse [i+1..end]. If no such i (descending order), reverse all. This is an O(n) in-place algorithm. Applications: enumerate permutations in order, kth permutation using factoradic number system.',
  gradient: 'from-purple-700 to-violet-800',
  topicSlug: 'dp',
  readTime: '12 min',
  sections: [
    {
      type: 'text',
      content: `Next permutation algorithm: scan from right to find first descent (nums[i] < nums[i+1]). Then from right, find first element greater than nums[i]. Swap them. Reverse the suffix after i (it was descending, becomes ascending = smallest arrangement). Kth permutation: at each position, k determines which digit to place using factorial counting: digit_index = (k-1) / (n-1)!, remainder for next position.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Next permutation in-place',
      code: `function nextPermutation(nums) {
    const n = nums.length;
    let i = n - 2;

    // Step 1: find rightmost i where nums[i] < nums[i+1]
    while (i >= 0 && nums[i] >= nums[i+1]) i--;

    if (i >= 0) {
        // Step 2: find rightmost j > i where nums[j] > nums[i]
        let j = n - 1;
        while (nums[j] <= nums[i]) j--;
        // Step 3: swap
        [nums[i], nums[j]] = [nums[j], nums[i]];
    }

    // Step 4: reverse suffix [i+1..n-1]
    let l = i + 1, r = n - 1;
    while (l < r) { [nums[l], nums[r]] = [nums[r], nums[l]]; l++; r--; }
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
      title: 'Next Permutation',
      url: 'https://leetcode.com/problems/next-permutation/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Find rightmost descent, swap with just-larger element, reverse suffix',
          explanation: `Find last i where nums[i] < nums[i+1]. If none, fully reversed (last permutation) → reverse all. Else find last j where nums[j] > nums[i], swap, reverse suffix.`,
          code: `var nextPermutation = function(nums) {
    const n=nums.length; let i=n-2;
    while(i>=0&&nums[i]>=nums[i+1]) i--;
    if(i>=0){
        let j=n-1; while(nums[j]<=nums[i]) j--;
        [nums[i],nums[j]]=[nums[j],nums[i]];
    }
    let l=i+1,r=n-1;
    while(l<r){[nums[l],nums[r]]=[nums[r],nums[l]];l++;r--;}
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Permutation Sequence',
      url: 'https://leetcode.com/problems/permutation-sequence/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Factoradic number system — each digit determined by (k-1) / (n-1)!',
          explanation: `n digits, (n-1)! permutations start with each digit. Index of first digit = (k-1) / (n-1)!. Remainder k = (k-1) % (n-1)! + 1. Repeat for remaining digits with decreasing factorial.`,
          code: `var getPermutation = function(n, k) {
    const fact=[1]; for(let i=1;i<=n;i++) fact[i]=fact[i-1]*i;
    const digits=Array.from({length:n},(_,i)=>i+1);
    k--; let res='';
    for(let i=n;i>=1;i--){
        const idx=Math.floor(k/fact[i-1]);
        res+=digits[idx]; digits.splice(idx,1); k%=fact[i-1];
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
      title: 'Find the Closest Palindrome',
      url: 'https://leetcode.com/problems/minimum-number-of-moves-to-seat-everyone/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Sort both arrays, pair them up (optimal by rearrangement inequality)',
          explanation: `Sort seats and students. Pair seat[i] with student[i]. The sum of |seat[i] - student[i]| is minimized when both arrays are sorted the same way (rearrangement inequality).`,
          code: `var minMovesToSeat = function(seats, students) {
    seats.sort((a,b)=>a-b); students.sort((a,b)=>a-b);
    return seats.reduce((s,v,i)=>s+Math.abs(v-students[i]),0);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Rank Transform of an Array',
      url: 'https://leetcode.com/problems/rank-transform-of-an-array/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Sort unique values, assign ranks, replace in original',
          explanation: `Sort unique values to get their rank order. Create value→rank map. Replace each element with its rank.`,
          code: `var arrayRankTransform = function(arr) {
    const sorted=[...new Set(arr)].sort((a,b)=>a-b);
    const rank=new Map(sorted.map((v,i)=>[v,i+1]));
    return arr.map(v=>rank.get(v)||0);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🔢',
      color: 'blue',
      content: `**Next permutation in 4 steps:**\n1. Find rightmost i where nums[i] < nums[i+1] (rightmost ascending pair)\n2. Find rightmost j where nums[j] > nums[i]\n3. Swap nums[i] and nums[j]\n4. Reverse suffix from i+1 to end\n\n**Why it works:** The suffix after i was descending (otherwise i would be higher). After swapping, suffix is still descending. Reversing makes it ascending = smallest arrangement with the new nums[i].\n\n**Kth permutation:** Factoradic representation. Group permutations by first digit in blocks of (n-1)!. Which block k falls in determines first digit. Recurse on remainder.`,
    },
  ],
}
