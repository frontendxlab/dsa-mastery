import type { Article } from '../articles'

export const bitManipulationArticle: Article = {
  slug: 'bit-manipulation',
  title: 'Bit Manipulation',
  emoji: '⚡',
  tagline: 'XOR is your best friend. Masks are your toolkit.',
  description: 'Bit manipulation solves problems that look hard in O(1) or O(n) using only integer arithmetic. Learn XOR properties, bit masking, counting tricks, and bitmask DP for subset enumeration.',
  gradient: 'from-amber-400 to-orange-500',
  topicSlug: 'bit',
  readTime: '15 min',
  sections: [
    {
      type: 'text',
      content: `Bit manipulation is about exploiting binary representation directly. The key insight is that XOR, AND, OR, and shifts can express complex operations extremely efficiently. Once you internalize a handful of bit tricks, a large class of problems that look hard suddenly become O(n) or even O(1).`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Essential Bit Tricks',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Core operations reference',
      code: `// Check if bit k is set
(n >> k) & 1        // 1 if set, 0 if not

// Set bit k
n | (1 << k)

// Clear bit k
n & ~(1 << k)

// Toggle bit k
n ^ (1 << k)

// Lowest set bit (isolate rightmost 1)
n & (-n)            // = n & (~n + 1)

// Clear lowest set bit
n & (n - 1)         // also: check if n is power of 2 → n & (n-1) === 0

// Count set bits (Brian Kernighan)
let count = 0;
while (n) { n &= (n - 1); count++; }  // each step removes lowest set bit

// XOR properties:
// a ^ a = 0  (cancel)
// a ^ 0 = a  (identity)
// XOR is commutative and associative → order doesn't matter`,
    },
    {
      type: 'table',
      headers: ['See This', 'Think This'],
      rows: [
        ['"find the single number" among duplicates', 'XOR all — duplicates cancel, single remains'],
        ['"find missing number in [1..n]"', 'XOR all with 1..n — everything cancels except missing'],
        ['"subsets / enumerate all subsets"', 'Bitmask: 0..2^n-1, each bit = include/exclude element'],
        ['"is power of 2"', 'n > 0 && (n & (n-1)) === 0'],
        ['"count 1 bits"', 'Brian Kernighan: n &= (n-1) until 0, count steps'],
        ['"number of different bits"', 'Count set bits in a XOR b'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Single Number',
      url: 'https://leetcode.com/problems/single-number/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: XOR all elements — pairs cancel',
          explanation: `XOR all numbers together. Since a XOR a = 0 and a XOR 0 = a, every number that appears twice cancels out. The single number that appears once is left over.`,
          code: `var singleNumber = function(nums) {
    return nums.reduce((xor, n) => xor ^ n, 0);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Number of 1 Bits',
      url: 'https://leetcode.com/problems/number-of-1-bits/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Brian Kernighan — each step removes lowest set bit',
          explanation: `n & (n-1) removes the lowest set bit of n. Count how many steps until n = 0.`,
          code: `var hammingWeight = function(n) {
    let count = 0;
    while (n) { n &= (n - 1); count++; }
    return count;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Sum of Two Integers Without + or -',
      url: 'https://leetcode.com/problems/sum-of-two-integers/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: XOR for sum without carry, AND for carry',
          explanation: `a XOR b gives the sum of bits where EXACTLY ONE is set (no carry). (a AND b) << 1 gives the carry bits. Repeat until carry is 0.`,
          code: `var getSum = function(a, b) {
    while (b !== 0) {
        const carry = (a & b) << 1;
        a = a ^ b;   // sum without carry
        b = carry;   // carry to add next round
    }
    return a;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Subsets (bitmask enumeration)',
      url: 'https://leetcode.com/problems/subsets/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Each number 0..2^n-1 represents a subset',
          explanation: `For n elements, there are 2^n subsets. Each integer i from 0 to 2^n-1 is a bitmask: if bit k is set in i, include nums[k] in this subset. Enumerate all masks.`,
          code: `var subsets = function(nums) {
    const n = nums.length, result = [];
    for (let mask = 0; mask < (1 << n); mask++) {
        const subset = [];
        for (let k = 0; k < n; k++)
            if ((mask >> k) & 1) subset.push(nums[k]);
        result.push(subset);
    }
    return result;
};`,
          lang: 'javascript',
        },
      ],
    },
  ],
}
