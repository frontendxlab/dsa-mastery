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
    {
      type: 'heading',
      level: 2,
      text: 'More Worked Problems',
    },
    {
      type: 'problem',
      num: 5,
      title: 'Counting Bits',
      url: 'https://leetcode.com/problems/counting-bits/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: O(n log n) brute force — count bits per number',
          explanation: 'For each number i, use Brian Kernighan\'s trick: count set bits by repeatedly doing i &= i-1 (clears lowest bit). O(log n) per number.',
        },
        {
          label: 'Intuition 2: O(n) DP — use the bit relation',
          explanation: 'Key insight: dp[i] = dp[i >> 1] + (i & 1). Right-shifting removes one bit. If i is odd, it has one more bit than i>>1. If even, same count.',
          code: `var countBits = function(n) {
    const dp = new Array(n+1).fill(0);
    for (let i = 1; i <= n; i++)
        dp[i] = dp[i >> 1] + (i & 1);  // dp[i/2] + last bit
    return dp;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 6,
      title: 'Reverse Bits',
      url: 'https://leetcode.com/problems/reverse-bits/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Shift and build result bit by bit',
          explanation: 'Take each bit from the right of n (n & 1) and place it in the result from the left. Shift n right and result left 32 times.',
          code: `var reverseBits = function(n) {
    let result = 0;
    for (let i = 0; i < 32; i++) {
        result = (result << 1) | (n & 1);  // place rightmost bit of n into result
        n >>>= 1;                           // unsigned right shift
    }
    return result >>> 0;  // ensure unsigned 32-bit
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 7,
      title: 'Single Number II (appears 3 times)',
      url: 'https://leetcode.com/problems/single-number-ii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: O(32n) — count bits per position mod 3',
          explanation: `For each bit position (0..31), count how many numbers have that bit set. If count % 3 ≠ 0, the single number has that bit set. Works because every number appearing 3 times contributes 3 to each bit position count.`,
          code: `var singleNumber = function(nums) {
    let result = 0;
    for (let bit = 0; bit < 32; bit++) {
        let count = 0;
        for (const n of nums) count += (n >> bit) & 1;
        if (count % 3 !== 0) result |= (1 << bit);
    }
    return result;
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Bit circuit — ones and twos registers',
          explanation: `Maintain two bitmasks: ones = bits seen once so far, twos = bits seen twice. On each number: twos |= ones & n; ones ^= n; then clear bits seen 3 times: mask = ~(ones & twos); ones &= mask; twos &= mask.`,
          code: `var singleNumber = function(nums) {
    let ones = 0, twos = 0;
    for (const n of nums) {
        ones = (ones ^ n) & ~twos;
        twos = (twos ^ n) & ~ones;
    }
    return ones;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 8,
      title: 'Find the Duplicate Number',
      url: 'https://leetcode.com/problems/find-the-duplicate-number/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Bit count comparison — O(n log n)',
          explanation: `For each bit position, count how many numbers in nums have that bit set vs. how many numbers in 1..n have that bit set. If nums has MORE, the duplicate contributes that bit. Build the duplicate number bit by bit.`,
          code: `var findDuplicate = function(nums) {
    const n = nums.length - 1;
    let dup = 0;
    for (let bit = 0; bit < 32; bit++) {
        let countNums = 0, countRange = 0;
        for (let i = 0; i <= n; i++) {
            if ((nums[i] >> bit) & 1) countNums++;
            if ((i >> bit) & 1) countRange++;  // i represents 1..n range
        }
        if (countNums > countRange) dup |= (1 << bit);
    }
    return dup;
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Floyd\'s cycle detection — O(n) time, O(1) space',
          explanation: `Treat array as a linked list where nums[i] is the "next" pointer from i. Since there's a duplicate, two indices point to the same next node → cycle. Find cycle entry with slow/fast pointers.`,
          code: `var findDuplicate = function(nums) {
    let slow = nums[0], fast = nums[0];
    do { slow = nums[slow]; fast = nums[nums[fast]]; } while (slow !== fast);
    slow = nums[0];
    while (slow !== fast) { slow = nums[slow]; fast = nums[fast]; }
    return slow;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 9,
      title: 'Maximum XOR of Two Numbers in an Array',
      url: 'https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: O(n²) brute force — try all pairs',
          explanation: `XOR every pair, track maximum. O(n²) — too slow for n=3×10^4.`,
        },
        {
          label: 'Intuition 2: Greedy bit-by-bit with prefix set — O(32n)',
          explanation: `Build the answer greedily from MSB to LSB. At bit i, we want the current bit of XOR to be 1. Compute all prefixes (upper i bits) of array numbers. For each prefix p, check if p XOR (answer_so_far | (1<<i)) exists in the prefix set. If yes, we can set this bit.`,
          code: `var findMaximumXOR = function(nums) {
    let max = 0, mask = 0;
    for (let i = 31; i >= 0; i--) {
        mask |= (1 << i);
        const prefixes = new Set(nums.map(n => n & mask));
        const candidate = max | (1 << i);
        for (const p of prefixes) {
            if (prefixes.has(p ^ candidate)) { max = candidate; break; }
        }
    }
    return max;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧠',
      color: 'teal',
      content: `**Bit trick cheat sheet:**\n- Clear lowest set bit: \`x & (x-1)\`\n- Isolate lowest set bit: \`x & (-x)\`\n- Check power of 2: \`x > 0 && (x & (x-1)) === 0\`\n- Count set bits: Brian Kernighan's loop — \`while(x) { count++; x &= x-1; }\`\n- XOR cancelation: \`a ^ a = 0\` and \`a ^ 0 = a\`\n- Swap without temp: \`a ^= b; b ^= a; a ^= b;\`\n- Bitmask DP: enumerate subsets of mask with \`for(sub=mask; sub>0; sub=(sub-1)&mask)\``,
    },
  ],
}
