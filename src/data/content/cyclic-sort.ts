import type { Article } from '../articles'

export const cyclicSortArticle: Article = {
  slug: 'cyclic-sort',
  title: 'Cyclic Sort & Missing Numbers',
  emoji: '🔃',
  tagline: 'Place each number at its correct index. Find missing/duplicate in O(n) O(1).',
  description: 'Cyclic sort places each number at its correct index in-place: if nums[i] != i+1, swap nums[i] with nums[nums[i]-1]. After sorting, any index where nums[i] != i+1 reveals a missing or duplicate number. Works when numbers are in range [1..n]. Variants: multiple missing numbers, first missing positive, find duplicate without modifying array.',
  gradient: 'from-amber-700 to-orange-800',
  topicSlug: 'dp',
  readTime: '11 min',
  sections: [
    {
      type: 'text',
      content: `Cyclic sort: iterate array; while nums[i] is not at its correct index (nums[i]-1 != i), swap it to its correct position. After one pass, scan for mismatches. O(n) time, O(1) space. Key insight: each element is swapped at most once, so total swaps ≤ n. Works for numbers in [1..n] range. For duplicates: nums[i] == nums[nums[i]-1] means nums[i] is the duplicate.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Cyclic sort and find all missing numbers',
      code: `// Place each number at index num-1
function cyclicSort(nums) {
    let i = 0;
    while (i < nums.length) {
        const correct = nums[i] - 1; // where nums[i] should go
        if (nums[i] !== nums[correct]) {
            [nums[i], nums[correct]] = [nums[correct], nums[i]]; // swap to correct position
        } else {
            i++; // already at correct position (or duplicate, skip)
        }
    }
    return nums;
}

// Find all missing numbers in [1..n]
function findAllMissing(nums) {
    cyclicSort(nums);
    const missing = [];
    for (let i = 0; i < nums.length; i++)
        if (nums[i] !== i + 1) missing.push(i + 1);
    return missing;
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
      title: 'Find All Numbers Disappeared in an Array',
      url: 'https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Mark visited positions by negating, then collect unvisited indices',
          explanation: `For each num, mark index (|num|-1) as negative. After pass, indices still positive are missing. O(n) O(1) extra space.`,
          code: `var findDisappearedNumbers = function(nums) {
    for(const n of nums){
        const idx=Math.abs(n)-1;
        if(nums[idx]>0) nums[idx]=-nums[idx];
    }
    const res=[];
    for(let i=0;i<nums.length;i++) if(nums[i]>0) res.push(i+1);
    return res;
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
          label: 'Intuition 1: Negate visited index — second visit finds already-negative = duplicate',
          explanation: `Same marking technique. When we try to mark index idx but it's already negative, we've seen this number before — it's a duplicate.`,
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
          label: 'Intuition 1: Cyclic sort — place nums[i] at index nums[i]-1, then scan',
          explanation: `Cyclic sort ignoring numbers outside [1..n]. After sorting, first index i where nums[i] != i+1 gives answer i+1. If all correct, answer is n+1.`,
          code: `var firstMissingPositive = function(nums) {
    const n=nums.length;
    let i=0;
    while(i<n){
        const j=nums[i]-1;
        if(nums[i]>0&&nums[i]<=n&&nums[i]!==nums[j])
            [nums[i],nums[j]]=[nums[j],nums[i]];
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
      title: 'Find the Duplicate Number',
      url: 'https://leetcode.com/problems/find-the-duplicate-number/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Floyd\'s cycle detection — treat array as linked list',
          explanation: `nums[i] gives the next node from i. Since there's a duplicate, there's a cycle. Use slow/fast pointers to find cycle entry = duplicate number. O(n) O(1).`,
          code: `var findDuplicate = function(nums) {
    let slow=nums[0], fast=nums[0];
    do{slow=nums[slow];fast=nums[nums[fast]];}while(slow!==fast);
    slow=nums[0];
    while(slow!==fast){slow=nums[slow];fast=nums[fast];}
    return slow;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🔃',
      color: 'amber',
      content: `**Cyclic sort pattern:** When numbers are in range [1..n], each number has a natural "home" index (value-1). Place everything at its home, then scan for mismatches.\n\n**Marking trick (no modification):** Negate nums[|num|-1] to mark index as visited. Works for finding missing/duplicate in O(n) O(1) without cyclic sort.\n\n**When cyclic sort doesn't apply:** Numbers not in [1..n] — use HashSet O(n) space, or Floyd's cycle detection if problem models a linked list (each value points to next index).`,
    },
  ],
}
