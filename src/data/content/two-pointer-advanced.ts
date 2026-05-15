import type { Article } from '../articles'

export const twoPointerAdvancedArticle: Article = {
  slug: 'two-pointer-advanced',
  title: 'Two Pointer — Advanced Patterns',
  emoji: '👆',
  tagline: '3Sum, 4Sum, remove duplicates, partition. Multiple pointer coordination.',
  description: 'Advanced two-pointer problems beyond the basic "find pair with sum k": 3Sum/4Sum via reduction, removing duplicates with write pointer, Dutch National Flag 3-way partition, partitioning by predicate, and merging sorted arrays in-place. Key insight: combining sort + two pointers reduces many O(n²) problems to O(n log n), and multiple coordinated pointers handle more complex conditions.',
  gradient: 'from-sky-600 to-blue-700',
  topicSlug: 'dp',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `3Sum: sort, fix first element, then two-pointer for remaining pair. Skip duplicates carefully. 4Sum: fix two elements (two nested loops), then two-pointer. Dutch National Flag: three pointers (lo, mid, hi) for 3-way partition. "Write pointer" pattern: read pointer scans all elements, write pointer marks where next valid element goes. O(n) in-place without extra space.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Three-sum and Dutch national flag templates',
      code: `// 3Sum — sorted + two pointers, O(n²)
function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i-1]) continue; // skip duplicates
        let l = i + 1, r = nums.length - 1;
        while (l < r) {
            const sum = nums[i] + nums[l] + nums[r];
            if (sum === 0) {
                result.push([nums[i], nums[l], nums[r]]);
                while (l < r && nums[l] === nums[l+1]) l++;
                while (l < r && nums[r] === nums[r-1]) r--;
                l++; r--;
            } else if (sum < 0) l++;
            else r--;
        }
    }
    return result;
}

// Dutch National Flag — 3-way partition in O(n)
function dutchNationalFlag(arr, pivot) {
    let lo = 0, mid = 0, hi = arr.length - 1;
    while (mid <= hi) {
        if (arr[mid] < pivot) [arr[lo++], arr[mid++]] = [arr[mid], arr[lo]];
        else if (arr[mid] > pivot) [arr[mid], arr[hi--]] = [arr[hi], arr[mid]];
        else mid++;
    }
}

// Write pointer — in-place deduplication
function removeDuplicates(arr) {
    let write = 0;
    for (const x of arr) {
        if (write === 0 || arr[write-1] !== x) arr[write++] = x;
    }
    return write; // new length
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
      title: '3Sum',
      url: 'https://leetcode.com/problems/3sum/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Sort + fix first + two pointers',
          explanation: `Sort. Fix first element at index i. Two pointers l,r on remaining. Skip duplicate firsts and duplicate pairs.`,
          code: `var threeSum = function(nums) {
    nums.sort((a,b)=>a-b);
    const res=[];
    for(let i=0;i<nums.length-2;i++){
        if(i>0&&nums[i]===nums[i-1]) continue;
        let l=i+1,r=nums.length-1;
        while(l<r){
            const s=nums[i]+nums[l]+nums[r];
            if(s===0){
                res.push([nums[i],nums[l],nums[r]]);
                while(l<r&&nums[l]===nums[l+1]) l++;
                while(l<r&&nums[r]===nums[r-1]) r--;
                l++;r--;
            } else s<0?l++:r--;
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
      num: 2,
      title: 'Sort Colors (Dutch National Flag)',
      url: 'https://leetcode.com/problems/sort-colors/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Three pointers — lo (end of 0s), mid (current), hi (start of 2s)',
          explanation: `Invariant: [0..lo-1]=0, [lo..mid-1]=1, [hi+1..n-1]=2. Process mid: if 0→swap with lo; if 1→advance; if 2→swap with hi (don't advance mid).`,
          code: `var sortColors = function(nums) {
    let lo=0,mid=0,hi=nums.length-1;
    while(mid<=hi){
        if(nums[mid]===0){[nums[lo],nums[mid]]=[nums[mid],nums[lo]];lo++;mid++;}
        else if(nums[mid]===2){[nums[mid],nums[hi]]=[nums[hi],nums[mid]];hi--;}
        else mid++;
    }
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: '4Sum',
      url: 'https://leetcode.com/problems/4sum/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Two fixed pointers + two-pointer inner loop',
          explanation: `Sort. Fix i and j (two outer loops), then two pointers l,r on remaining. Skip all levels of duplicates (at i, j, l, r).`,
          code: `var fourSum = function(nums, target) {
    nums.sort((a,b)=>a-b);
    const res=[], n=nums.length;
    for(let i=0;i<n-3;i++){
        if(i>0&&nums[i]===nums[i-1]) continue;
        for(let j=i+1;j<n-2;j++){
            if(j>i+1&&nums[j]===nums[j-1]) continue;
            let l=j+1,r=n-1;
            while(l<r){
                const s=nums[i]+nums[j]+nums[l]+nums[r];
                if(s===target){
                    res.push([nums[i],nums[j],nums[l],nums[r]]);
                    while(l<r&&nums[l]===nums[l+1]) l++;
                    while(l<r&&nums[r]===nums[r-1]) r--;
                    l++;r--;
                } else s<target?l++:r--;
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
      num: 4,
      title: 'Remove Duplicates from Sorted Array II',
      url: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Write pointer with "allow at most 2" logic',
          explanation: `Write pointer k: include element if k < 2 (first two) OR nums[i] != nums[k-2] (this number won't create triple).`,
          code: `var removeDuplicates = function(nums) {
    let k=0;
    for(const n of nums)
        if(k<2||nums[k-2]!==n) nums[k++]=n;
    return k;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '👆',
      color: 'sky',
      content: `**Multi-pointer patterns:**\n- 2-pointer: O(n) after sorting for pair sum\n- 3Sum: O(n²) — fix one + 2-pointer on rest\n- kSum: O(n^(k-1)) — fix k-2 elements + 2-pointer\n- Dutch flag: 3 pointers (lo, mid, hi) for 3-way partition\n- Write pointer: 1 read, 1 write — in-place filtering/dedup\n\n**Duplicate skipping in kSum:** After placing a triplet/quadruplet in results, advance all pointers and skip duplicates at each level. Order matters: skip outer duplicates before outer loop body, skip inner duplicates after placing a result.`,
    },
  ],
}
