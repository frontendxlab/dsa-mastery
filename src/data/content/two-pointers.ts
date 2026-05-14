import type { Article } from '../articles'

export const twoPointersArticle: Article = {
  slug: 'two-pointers',
  title: 'Two Pointers',
  emoji: '👆👆',
  tagline: 'Prune half the search space at every step.',
  description: 'Two pointers is a prune-and-search strategy. At every step you eliminate a chunk of possibilities based on what you know. Learn the three pointer configurations and when each applies.',
  gradient: 'from-cyan-400 to-teal-500',
  topicSlug: 'sliding_window',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `Two pointers is fundamentally a prune-and-search strategy. You maintain two indices and at each step you move at least one of them, eliminating solutions that can't possibly be optimal. The key insight is that the structure of the problem (sorted array, or a monotonic relationship between the pointer positions and the answer) lets you safely discard large chunks of the search space with each move.`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Three Pointer Configurations',
    },
    {
      type: 'table',
      headers: ['Configuration', 'Start Positions', 'Classic Problems'],
      rows: [
        ['Opposite ends', 'i=0, j=n-1, move toward center', 'Two Sum (sorted), Container With Most Water, Reverse'],
        ['Same direction', 'i=0, j=0, j runs ahead', 'Remove duplicates, partition, slow/fast'],
        ['Slow + fast (LL)', 'slow=head, fast=head', 'Cycle detection, middle of LL, kth from end'],
      ],
    },
    {
      type: 'callout',
      icon: '⚠️',
      color: 'amber',
      content: `**When NOT to use two pointers**: if the input contains negative values, adding an element can both increase AND decrease the sum. The window no longer has monotonic behavior — shrinking from the left doesn't guarantee we get closer to the target. Use prefix sum + hashmap instead.`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Core Template',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Opposite-ends template (two sum on sorted array)',
      code: `let left = 0, right = arr.length - 1;
while (left < right) {
    const val = compute(arr[left], arr[right]);
    if (val === target) return [left, right];
    else if (val < target) left++;   // need bigger → move left forward
    else right--;                     // need smaller → move right back
}`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Same-direction template (remove/filter in-place)',
      code: `let slow = 0;
for (let fast = 0; fast < n; fast++) {
    if (shouldKeep(arr[fast])) {
        arr[slow] = arr[fast];
        slow++;
    }
}
return slow;  // new length`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Container With Most Water',
      url: 'https://leetcode.com/problems/container-with-most-water/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: O(n²) check every pair',
          explanation: `For each pair (i, j), compute area = min(height[i], height[j]) * (j - i). Track maximum. Works but TLEs.`,
          code: `for (let i = 0; i < n; i++)
    for (let j = i+1; j < n; j++)
        max = Math.max(max, Math.min(h[i], h[j]) * (j-i));`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: O(n) opposite-ends pruning',
          explanation: `Start with widest possible container (i=0, j=n-1). Width can only decrease as we move inward. The height is limited by the shorter wall. If we move the taller wall inward, we can't possibly increase height (still limited by shorter) AND we decrease width — strictly worse. So we always move the shorter wall. This is the prune step: moving the taller wall is always suboptimal, so we prune it.`,
          code: `var maxArea = function(height) {
    let l = 0, r = height.length - 1, max = 0;
    while (l < r) {
        max = Math.max(max, Math.min(height[l], height[r]) * (r - l));
        if (height[l] < height[r]) l++;  // shorter wall limits us, move it
        else r--;
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
      title: 'Sort Colors (Dutch National Flag)',
      url: 'https://leetcode.com/problems/sort-colors/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Count and fill',
          explanation: `Count 0s, 1s, 2s. Overwrite array with correct number of each. Two passes, O(n) time, O(1) space. Simple but doesn't work if we need single-pass.`,
        },
        {
          label: 'Intuition 2: Three-pointer Dutch National Flag — single pass',
          explanation: `Use three pointers: low (next 0 goes here), mid (current element under inspection), high (next 2 goes here). Invariant: [0..low-1] = 0s, [low..mid-1] = 1s, [high+1..n-1] = 2s.\n\nProcess mid:\n- If 0: swap with low, advance both low and mid (swapped value was a 1, now at mid, safe to move past)\n- If 1: nothing to do, just advance mid\n- If 2: swap with high, retreat high only. DON'T advance mid — the new value at mid came from high and could be anything, needs re-inspection.`,
          code: `var sortColors = function(nums) {
    let low = 0, mid = 0, high = nums.length - 1;
    while (mid <= high) {
        if (nums[mid] === 0) {
            [nums[mid], nums[low]] = [nums[low], nums[mid]];
            mid++; low++;
        } else if (nums[mid] === 1) {
            mid++;
        } else {
            [nums[mid], nums[high]] = [nums[high], nums[mid]];
            high--;
            // no mid++ — new nums[mid] needs inspection
        }
    }
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Find the Pivot Integer',
      url: 'https://leetcode.com/problems/find-the-pivot-integer/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: O(n²) literal implementation',
          explanation: `For each i, compute sum 1..i and sum i..n. If equal, return i. Exactly what the problem says.`,
          code: `for (let i = 1; i <= n; i++) {
    let left = 0, right = 0;
    for (let j = 1; j <= i; j++) left += j;
    for (let j = i; j <= n; j++) right += j;
    if (left === right) return i;
}`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: O(n) prefix trick',
          explanation: `Total sum = n*(n+1)/2. For pivot i: leftSum = i*(i+1)/2, rightSum = total - leftSum + i. Set leftSum = rightSum and solve: i*(i+1)/2 = total - i*(i+1)/2 + i → i*(i+1) = total + i → the pivot satisfies x² = total, so x = √total.`,
          code: `var pivotInteger = function(n) {
    const total = n * (n + 1) / 2;
    const x = Math.sqrt(total);
    return Number.isInteger(x) ? x : -1;
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 3: Two pointer left-right accumulation',
          explanation: `Start with left=1, right=n, leftSum=1, rightSum=n. Expand the smaller sum until they meet or cross.`,
          code: `var pivotInteger = function(n) {
    if (n === 1) return 1;
    let l = 1, lSum = 1, r = n, rSum = n;
    while (l < r) {
        if (lSum < rSum) { l++; lSum += l; }
        else { r--; rSum += r; }
        if (lSum === rSum && l === r) return l;
    }
    return -1;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Move Pieces to Obtain a String',
      url: 'https://leetcode.com/problems/move-pieces-to-obtain-a-string/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Two-pointer character matching with direction check',
          explanation: `Skip blanks in both strings simultaneously (L/R characters can't pass through each other so their relative order is fixed). When both pointers land on a non-blank:\n1. Characters must match\n2. If it's 'L': si must be ≥ ti (L can only move left, so source position must be ≥ target)\n3. If it's 'R': si must be ≤ ti (R can only move right)\n\nIf any condition breaks, return false.`,
          code: `var canChange = function(start, target) {
    let si = 0, ti = 0;
    const n = start.length;
    while (si < n || ti < n) {
        while (si < n && start[si] === '_') si++;
        while (ti < n && target[ti] === '_') ti++;
        if (si === n && ti === n) return true;
        if (si === n || ti === n) return false;
        if (start[si] !== target[ti]) return false;
        if (start[si] === 'L' && si < ti) return false;  // L can't move right
        if (start[si] === 'R' && si > ti) return false;  // R can't move left
        si++; ti++;
    }
    return true;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Intersection of Two Linked Lists',
      url: 'https://leetcode.com/problems/intersection-of-two-linked-lists/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: O(m+n) with Set',
          explanation: `Store all nodes of list A in a set. Traverse list B and return the first node found in the set. O(m+n) time, O(m) space.`,
        },
        {
          label: 'Intuition 2: O(m+n) constant space — two pointer path equalization',
          explanation: `If two pointers each travel both lists (A then B, B then A), they both traverse exactly m+n nodes total. If there's an intersection, they'll meet at it. If not, both reach null at the same time.\n\nThe insight: pointer hA travels |A| + |B| nodes, pointer hB travels |B| + |A| nodes — same total distance. If they intersect, the last |C| steps are identical, so they converge.`,
          code: `var getIntersectionNode = function(headA, headB) {
    let hA = headA, hB = headB;
    while (hA !== hB) {
        hA = hA ? hA.next : headB;  // when A ends, switch to B's head
        hB = hB ? hB.next : headA;  // when B ends, switch to A's head
    }
    return hA;  // either intersection node or null (both null = no intersection)
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'More Worked Problems',
    },
    {
      type: 'problem',
      num: 6,
      title: '3Sum',
      url: 'https://leetcode.com/problems/3sum/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: O(n³) brute force — check every triple',
          explanation: `Three nested loops, check all combinations. O(n³) — fails for n=3000.`,
        },
        {
          label: 'Intuition 2: Sort + fix one element + two pointers for the other two',
          explanation: `Sort the array. Fix nums[i] as the first element. Use two pointers (lo=i+1, hi=end) to find pairs summing to -nums[i]. Skip duplicates at each level to avoid duplicate triplets.`,
          code: `var threeSum = function(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i-1]) continue;  // skip dup for i
        let lo = i + 1, hi = nums.length - 1;
        while (lo < hi) {
            const sum = nums[i] + nums[lo] + nums[hi];
            if (sum === 0) {
                result.push([nums[i], nums[lo], nums[hi]]);
                while (lo < hi && nums[lo] === nums[lo+1]) lo++;  // skip dup lo
                while (lo < hi && nums[hi] === nums[hi-1]) hi--;  // skip dup hi
                lo++; hi--;
            } else if (sum < 0) lo++;
            else hi--;
        }
    }
    return result;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 7,
      title: 'Container With Most Water',
      url: 'https://leetcode.com/problems/container-with-most-water/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: O(n²) brute force — try every pair',
          explanation: `For every pair (i, j), area = min(height[i], height[j]) * (j-i). Track max. O(n²).`,
        },
        {
          label: 'Intuition 2: Two pointers — always move the shorter side',
          explanation: `Start with widest container (lo=0, hi=end). Area = min(heights) * width. If we move the taller side inward, min can only stay same or decrease while width decreases — guaranteed worse. So always move the shorter side inward: it's the only hope of finding a taller wall.`,
          code: `var maxArea = function(height) {
    let lo = 0, hi = height.length - 1, max = 0;
    while (lo < hi) {
        max = Math.max(max, Math.min(height[lo], height[hi]) * (hi - lo));
        if (height[lo] < height[hi]) lo++;  // move shorter side — taller side stays
        else hi--;
    }
    return max;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 8,
      title: 'Sort Colors (Dutch National Flag)',
      url: 'https://leetcode.com/problems/sort-colors/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Count each color, rewrite — two passes',
          explanation: `Count 0s, 1s, 2s. Rewrite array with correct counts. Simple but two passes.`,
        },
        {
          label: 'Intuition 2: Dutch National Flag — three-way partition in one pass',
          explanation: `Three pointers: lo (boundary of 0s), mid (current element), hi (boundary of 2s).\n- nums[mid]=0: swap with lo, both lo and mid advance\n- nums[mid]=1: just advance mid\n- nums[mid]=2: swap with hi, only hi retreats (don't advance mid since swapped value is unseen)`,
          code: `var sortColors = function(nums) {
    let lo = 0, mid = 0, hi = nums.length - 1;
    while (mid <= hi) {
        if (nums[mid] === 0) {
            [nums[lo], nums[mid]] = [nums[mid], nums[lo]];
            lo++; mid++;
        } else if (nums[mid] === 1) {
            mid++;
        } else {
            [nums[mid], nums[hi]] = [nums[hi], nums[mid]];
            hi--;  // DON'T advance mid — swapped element not yet examined
        }
    }
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 9,
      title: 'Valid Palindrome II',
      url: 'https://leetcode.com/problems/valid-palindrome-ii/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Two pointers — on mismatch, try skipping left OR right',
          explanation: `Walk from both ends. When characters match, continue. On first mismatch: try skipping the left character (check if s[lo+1..hi] is palindrome) OR the right character (check if s[lo..hi-1] is palindrome). If either works, return true.`,
          code: `var validPalindrome = function(s) {
    const isPalin = (l, r) => {
        while (l < r) if (s[l++] !== s[r--]) return false;
        return true;
    };
    let lo = 0, hi = s.length - 1;
    while (lo < hi) {
        if (s[lo] !== s[hi]) return isPalin(lo+1, hi) || isPalin(lo, hi-1);
        lo++; hi--;
    }
    return true;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 10,
      title: 'Boats to Save People',
      url: 'https://leetcode.com/problems/boats-to-save-people/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Sort + two pointers — pair heaviest with lightest if possible',
          explanation: `Sort by weight. Greedy: try to pair the heaviest person (hi) with the lightest (lo). If they fit together (sum ≤ limit), both get on a boat (lo++, hi--). If not, the heaviest goes alone (hi-- only). Count boats.`,
          code: `var numRescueBoats = function(people, limit) {
    people.sort((a, b) => a - b);
    let lo = 0, hi = people.length - 1, boats = 0;
    while (lo <= hi) {
        if (people[lo] + people[hi] <= limit) lo++;  // pair them
        hi--;   // heaviest always gets a boat (alone or paired)
        boats++;
    }
    return boats;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'green',
      content: `**Two pointer decision guide:**\n- "Find pair with sum = target in sorted array" → left/right converging pointers\n- "3Sum / 4Sum" → fix k-2 elements with loops, two pointers for final pair\n- "Partition array by condition" → slow/fast or lo/mid/hi (Dutch flag)\n- "Container / area maximization" → greedy: move the limiting (smaller) side inward\n- "Valid palindrome with one deletion" → two pointers + helper check on mismatch\n- "Linked list intersection" → equalize path lengths by switching lists\n\n**While loop condition rule**: access \`curr.next\` → \`while (curr)\`. Access \`curr.next.next\` → \`while (curr && curr.next)\`.`,
    },
  ],
}
