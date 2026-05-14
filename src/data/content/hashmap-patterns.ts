import type { Article } from '../articles'

export const hashmapPatternsArticle: Article = {
  slug: 'hashmap-patterns',
  title: 'HashMap & Counting Patterns',
  emoji: '#️⃣',
  tagline: 'Trading time for space. One pass with a map beats two nested loops.',
  description: 'Hash maps reduce O(n²) lookup problems to O(n) by storing "what we\'ve seen." Master frequency counting, two-sum complement pattern, group-by-key, running state tracking. Appears in ~30% of all coding problems.',
  gradient: 'from-yellow-400 to-orange-500',
  topicSlug: 'dp',
  readTime: '16 min',
  sections: [
    {
      type: 'text',
      content: `A hash map gives O(1) average lookup. Most O(n²) problems — "find a pair," "count occurrences," "group by property" — become O(n) when you store the result of the first pass in a map and query it in the second pass (or combine both passes into one). The key is recognizing WHAT to store.`,
    },
    {
      type: 'table',
      headers: ['Problem Signal', 'What to Store', 'Pattern'],
      rows: [
        ['"find pair with sum = target"', 'complement (target - x)', 'Two-sum: store x, query target-x'],
        ['"count occurrences"', 'frequency of each element', 'freq[x]++ for every x'],
        ['"group by property"', 'sorted form / canonical key', 'map[canonical].push(item)'],
        ['"longest subarray with sum k"', 'first index of each prefix sum', 'prefix + map[sum-k]'],
        ['"check all chars in window"', 'need/have count', 'two-pointer + freq map'],
        ['"find duplicate"', 'seen elements', 'if set.has(x) → duplicate'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'The Two-Sum Template',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Two-sum and its variants',
      code: `// Classic two-sum: find indices i,j where nums[i]+nums[j]=target
var twoSum = function(nums, target) {
    const map = new Map(); // value → index
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) return [map.get(complement), i];
        map.set(nums[i], i);
    }
};

// Variant: count pairs with sum = target (allow reuse)
const countPairs = (nums, target) => {
    const freq = new Map();
    let count = 0;
    for (const n of nums) {
        count += freq.get(target - n) ?? 0; // query BEFORE adding
        freq.set(n, (freq.get(n) ?? 0) + 1);
    }
    return count;
};

// Variant: two-sum with sorted array (two pointers — O(1) space)
const twoSumSorted = (arr, target) => {
    let lo = 0, hi = arr.length - 1;
    while (lo < hi) {
        const s = arr[lo] + arr[hi];
        if (s === target) return [lo, hi];
        if (s < target) lo++; else hi--;
    }
    return [-1, -1];
};`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Frequency Counting Template',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Build frequency map, query it',
      code: `// Build frequency map
const freq = new Map();
for (const c of s) freq.set(c, (freq.get(c) ?? 0) + 1);

// Check if two strings are anagrams
const isAnagram = (s, t) => {
    if (s.length !== t.length) return false;
    const freq = new Map();
    for (const c of s) freq.set(c, (freq.get(c) ?? 0) + 1);
    for (const c of t) {
        if (!freq.get(c)) return false;
        freq.set(c, freq.get(c) - 1);
    }
    return true;
};

// Group by canonical form (anagram groups)
const groupAnagrams = (strs) => {
    const map = new Map();
    for (const s of strs) {
        const key = s.split('').sort().join(''); // canonical key
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(s);
    }
    return [...map.values()];
};`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Prefix Sum + HashMap (Running State)',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Longest subarray with sum k using prefix map',
      code: `// Find longest subarray with sum exactly k
// Works with NEGATIVES (sliding window doesn't)
var maxSubArrayLen = function(nums, k) {
    const firstSeen = new Map([[0, -1]]); // prefix sum 0 at index -1
    let sum = 0, maxLen = 0;
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
        if (firstSeen.has(sum - k)) maxLen = Math.max(maxLen, i - firstSeen.get(sum - k));
        if (!firstSeen.has(sum)) firstSeen.set(sum, i); // store FIRST occurrence only
    }
    return maxLen;
};

// Note: store FIRST occurrence (for longest subarray)
// For COUNT: store count of occurrences`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Two Sum',
      url: 'https://leetcode.com/problems/two-sum/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: O(n²) brute force — check every pair',
          explanation: 'Two nested loops, check if nums[i] + nums[j] = target. O(n²).',
        },
        {
          label: 'Intuition 2: O(n) one-pass hashmap',
          explanation: 'For each element, check if complement (target - current) was seen before. Store index as we go.',
          code: `var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const comp = target - nums[i];
        if (map.has(comp)) return [map.get(comp), i];
        map.set(nums[i], i);
    }
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Group Anagrams',
      url: 'https://leetcode.com/problems/group-anagrams/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Sort each string as canonical key',
          explanation: 'Anagrams sort to the same string. Group by sorted key using a hashmap.',
          code: `var groupAnagrams = function(strs) {
    const map = new Map();
    for (const s of strs) {
        const key = [...s].sort().join('');
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(s);
    }
    return [...map.values()];
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Character frequency as key (no sort needed)',
          explanation: 'Instead of sorting, count char frequencies and stringify as key. Avoids O(k log k) sort per string — O(k) per string instead.',
          code: `var groupAnagrams = function(strs) {
    const map = new Map();
    for (const s of strs) {
        const cnt = new Array(26).fill(0);
        for (const c of s) cnt[c.charCodeAt(0)-97]++;
        const key = cnt.join(',');
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(s);
    }
    return [...map.values()];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Longest Consecutive Sequence',
      url: 'https://leetcode.com/problems/longest-consecutive-sequence/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Sort then scan — O(n log n)',
          explanation: 'Sort array. Scan for consecutive runs. Handle duplicates.',
        },
        {
          label: 'Intuition 2: HashSet — O(n)',
          explanation: 'Put all numbers in a set. For each number, only START counting if (num-1) is NOT in set (i.e., num is the start of a sequence). Count upward.',
          code: `var longestConsecutive = function(nums) {
    const set = new Set(nums);
    let best = 0;
    for (const n of set) {
        if (!set.has(n - 1)) { // start of sequence
            let len = 1;
            while (set.has(n + len)) len++;
            best = Math.max(best, len);
        }
    }
    return best;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Top K Frequent Words',
      url: 'https://leetcode.com/problems/top-k-frequent-words/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Frequency map + sort',
          explanation: 'Count word frequencies. Sort by: frequency descending, then alphabetically. Return first k.',
          code: `var topKFrequent = function(words, k) {
    const freq = new Map();
    for (const w of words) freq.set(w, (freq.get(w) ?? 0) + 1);
    return [...freq.entries()]
        .sort(([w1,f1],[w2,f2]) => f2-f1 || w1.localeCompare(w2))
        .slice(0, k)
        .map(([w]) => w);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧠',
      color: 'teal',
      content: `**HashMap decision guide:**\n- "Find pair" → store complement, query on next element\n- "Count/group by property" → map[canonical_key] += 1 or push\n- "Longest subarray with sum k" → prefix sum map (works with negatives)\n- "Running state" (valid chars, balance) → track in map as window moves\n- "First/last occurrence" → map stores index; for longest, store first; for count, store count`,
    },
  ],
}
