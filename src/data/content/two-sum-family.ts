import type { Article } from '../articles'

export const twoSumFamilyArticle: Article = {
  slug: 'two-sum-family',
  title: 'Two Sum Family',
  emoji: '➕',
  tagline: 'One element + its complement. HashMap stores what you\'ve seen. O(n) beats O(n²).',
  description: 'Two Sum spawned a whole family of problems: Three Sum, Four Sum, Two Sum with sorted array, Two Sum with unlimited pairs, subarray sum = k, find pair with given XOR. The core insight: instead of scanning all pairs O(n²), use a HashMap to look up the complement in O(1). Learn every variant.',
  gradient: 'from-yellow-500 to-amber-600',
  topicSlug: 'dp',
  readTime: '16 min',
  sections: [
    {
      type: 'text',
      content: `Two Sum is the gateway problem to the "complement lookup" pattern. For any "find pair with property P" problem: iterate through elements, and for each element check if its complement (the other element needed to satisfy P) has been seen before. Store what you've seen in a HashMap or Set. This reduces O(n²) to O(n).`,
    },
    {
      type: 'table',
      headers: ['Variant', 'Approach', 'Complexity'],
      rows: [
        ['Two Sum (indices)', 'HashMap: value → index', 'O(n)'],
        ['Two Sum sorted array', 'Two pointers from both ends', 'O(n)'],
        ['Two Sum pairs count (allow reuse)', 'HashMap freq, query before insert', 'O(n)'],
        ['Three Sum', 'Sort + fix one + two pointers', 'O(n²)'],
        ['Four Sum', 'Sort + fix two + two pointers', 'O(n³)'],
        ['Subarray sum = k', 'Prefix sum + HashMap', 'O(n)'],
        ['Pair with XOR = target', 'HashMap: value → count', 'O(n)'],
        ['Count pairs with difference = k', 'Sort + binary search or HashMap', 'O(n log n)'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'The Core Insight',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Two Sum and all key variants',
      code: `// ===== CLASSIC TWO SUM =====
// For each nums[i], check if (target - nums[i]) was seen before
var twoSum = function(nums, target) {
    const map = new Map(); // value → index
    for (let i = 0; i < nums.length; i++) {
        const comp = target - nums[i];
        if (map.has(comp)) return [map.get(comp), i];
        map.set(nums[i], i);
    }
};

// ===== COUNT PAIRS with sum = target (each element used once) =====
function countPairs(nums, target) {
    const freq = new Map();
    let count = 0;
    for (const n of nums) {
        count += freq.get(target - n) ?? 0; // query BEFORE insert
        freq.set(n, (freq.get(n) ?? 0) + 1);
    }
    return count;
}

// ===== SORTED ARRAY: two pointers =====
function twoSumSorted(arr, target) {
    let lo = 0, hi = arr.length - 1;
    while (lo < hi) {
        const s = arr[lo] + arr[hi];
        if (s === target) return [lo, hi];
        if (s < target) lo++;
        else hi--;
    }
    return [-1, -1];
}

// ===== THREE SUM: O(n²) =====
// Sort, fix nums[i], two pointers on rest
var threeSum = function(nums) {
    nums.sort((a,b)=>a-b);
    const res=[];
    for(let i=0;i<nums.length-2;i++){
        if(i>0&&nums[i]===nums[i-1]) continue; // skip dups for i
        let lo=i+1, hi=nums.length-1;
        while(lo<hi){
            const s=nums[i]+nums[lo]+nums[hi];
            if(s===0){
                res.push([nums[i],nums[lo],nums[hi]]);
                while(lo<hi&&nums[lo]===nums[lo+1]) lo++;
                while(lo<hi&&nums[hi]===nums[hi-1]) hi--;
                lo++;hi--;
            } else if(s<0) lo++; else hi--;
        }
    }
    return res;
};`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Two Sum II (sorted)',
      url: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Two pointers — O(n) O(1) space',
          explanation: `Array is sorted. Start lo=0, hi=end. Sum too small → move lo right. Sum too large → move hi left. Meets in the middle when sum = target.`,
          code: `var twoSum = function(numbers, target) {
    let lo=0, hi=numbers.length-1;
    while(lo<hi){
        const s=numbers[lo]+numbers[hi];
        if(s===target) return [lo+1, hi+1]; // 1-indexed
        if(s<target) lo++; else hi--;
    }
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: '4Sum',
      url: 'https://leetcode.com/problems/4sum/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: O(n³) — fix two, two-pointer for remaining pair',
          explanation: `Sort. Fix i and j (two nested loops). Two pointers on [j+1..n-1] for the remaining pair. Skip duplicates at each level. Prune: if 4×nums[i] > target or 4×nums[n-1] < target, break.`,
          code: `var fourSum = function(nums, target) {
    nums.sort((a,b)=>a-b);
    const n=nums.length, res=[];
    for(let i=0;i<n-3;i++){
        if(i>0&&nums[i]===nums[i-1]) continue;
        for(let j=i+1;j<n-2;j++){
            if(j>i+1&&nums[j]===nums[j-1]) continue;
            let lo=j+1,hi=n-1;
            while(lo<hi){
                const s=nums[i]+nums[j]+nums[lo]+nums[hi];
                if(s===target){
                    res.push([nums[i],nums[j],nums[lo],nums[hi]]);
                    while(lo<hi&&nums[lo]===nums[lo+1])lo++;
                    while(lo<hi&&nums[hi]===nums[hi-1])hi--;
                    lo++;hi--;
                } else if(s<target)lo++; else hi--;
            }
        }
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
      title: 'Number of Pairs with Sum less than target',
      url: 'https://leetcode.com/problems/number-of-pairs-of-strings-with-concatenation-equal-to-target/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Sort + two pointers, count all valid pairs at once',
          explanation: `Sort array. Two pointers lo=0, hi=n-1. If nums[lo]+nums[hi] < target: ALL pairs (lo,lo+1),..(lo,hi) are valid → add hi-lo to count, advance lo. Else advance hi.`,
          code: `var countPairs = function(nums, target) {
    nums.sort((a,b)=>a-b);
    let lo=0,hi=nums.length-1,count=0;
    while(lo<hi){
        if(nums[lo]+nums[hi]<target){ count+=hi-lo; lo++; }
        else hi--;
    }
    return count;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Max Number of K-Sum Pairs',
      url: 'https://leetcode.com/problems/max-number-of-k-sum-pairs/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: HashMap — count available complements',
          explanation: `For each num, if (k-num) is in the map, form a pair (decrement both counts). Else, add num to map. Count pairs formed.`,
          code: `var maxOperations = function(nums, k) {
    const map=new Map();
    let ops=0;
    for(const n of nums){
        const comp=k-n;
        if(map.get(comp)>0){ops++;map.set(comp,map.get(comp)-1);}
        else map.set(n,(map.get(n)??0)+1);
    }
    return ops;
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Sort + two pointers',
          explanation: `Sort. Two pointers. When sum = k, both pointers advance (pair formed, ops++). When sum < k, lo++. When sum > k, hi--. Count ops.`,
          code: `var maxOperations = function(nums, k) {
    nums.sort((a,b)=>a-b);
    let lo=0,hi=nums.length-1,ops=0;
    while(lo<hi){
        const s=nums[lo]+nums[hi];
        if(s===k){ops++;lo++;hi--;}
        else if(s<k)lo++; else hi--;
    }
    return ops;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Check if Pair with Sum Exists in BST',
      url: 'https://leetcode.com/problems/two-sum-iv-input-is-a-bst/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: In-order traversal → sorted array → two pointers',
          explanation: `BST in-order traversal gives sorted array. Then two-pointer two-sum on the sorted array. O(n) time, O(n) space.`,
          code: `var findTarget = function(root, k) {
    const vals=[];
    const inorder=node=>{if(!node)return;inorder(node.left);vals.push(node.val);inorder(node.right);};
    inorder(root);
    let lo=0,hi=vals.length-1;
    while(lo<hi){
        const s=vals[lo]+vals[hi];
        if(s===k) return true;
        if(s<k)lo++;else hi--;
    }
    return false;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 6,
      title: 'Count Good Triplets',
      url: 'https://leetcode.com/problems/count-good-triplets/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: O(n³) brute force — check all triples',
          explanation: `With n ≤ 100, O(n³) is fine. Check every triple (i,j,k) with i<j<k, verify all three pair conditions.`,
          code: `var countGoodTriplets = function(arr, a, b, c) {
    let count=0;
    const n=arr.length;
    for(let i=0;i<n;i++)
        for(let j=i+1;j<n;j++){
            if(Math.abs(arr[i]-arr[j])>a) continue;
            for(let k=j+1;k<n;k++)
                if(Math.abs(arr[j]-arr[k])<=b&&Math.abs(arr[i]-arr[k])<=c) count++;
        }
    return count;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧠',
      color: 'amber',
      content: `**Two Sum family decision guide:**\n- Unsorted, find indices → HashMap (value → index)\n- Sorted, find pair → Two pointers\n- Count all valid pairs (can reuse) → HashMap freq, query before insert\n- 3Sum → sort + fix i + two pointers (O(n²))\n- 4Sum → sort + fix i,j + two pointers (O(n³))\n- Count pairs in range → sort + two pointers, add range at once\n- Subarray sum = k → prefix sum + HashMap\n\n**Deduplication in kSum:** sort first, then skip duplicate values at each recursion level with \`if(i>start && nums[i]===nums[i-1]) continue\`.`,
    },
  ],
}
