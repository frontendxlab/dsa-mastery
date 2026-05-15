import type { Article } from '../articles'

export const bitCountingArticle: Article = {
  slug: 'bit-counting',
  title: 'Bit Counting & Manipulation Tricks',
  emoji: '💡',
  tagline: 'Count set bits, Hamming distance, Brian Kernighan\'s trick, DP counting bits.',
  description: 'Bit counting problems count set bits (1s) in numbers or ranges, compute Hamming distances, or use bit properties for optimization. Key tricks: n & (n-1) clears the lowest set bit (Brian Kernighan\'s), n & (-n) isolates the lowest set bit, x ^ (x-1) creates a mask of lowest bit and all below. DP for counting bits in [0..n]: dp[i] = dp[i >> 1] + (i & 1).',
  gradient: 'from-yellow-600 to-orange-700',
  topicSlug: 'math',
  readTime: '11 min',
  sections: [
    {
      type: 'text',
      content: `Brian Kernighan: n & (n-1) removes the lowest set bit. Count set bits by repeated application until n=0. DP counting bits: for i in [1..n], dp[i] = dp[i>>1] + (i&1). Lowest set bit: n & (-n). Check power of 2: n & (n-1) == 0. XOR trick: a ^ a = 0, so XOR of array with duplicates cancels pairs, leaving the single element.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Bit counting tricks and popcount',
      code: `// Count set bits using Brian Kernighan's algorithm
function countBits(n) {
    let count = 0;
    while (n) { n &= n - 1; count++; } // clear lowest set bit each iteration
    return count;
}

// Count bits for all numbers 0..n using DP
function countBitsDP(n) {
    const dp = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++)
        dp[i] = dp[i >> 1] + (i & 1); // dp[i] = dp[i/2] + last_bit
    return dp;
}

// Isolate lowest set bit
const lowestBit = n => n & (-n);  // e.g., 6 (110) → 2 (010)

// Check if power of 2
const isPow2 = n => n > 0 && (n & (n-1)) === 0;

// Hamming distance between x and y
const hammingDist = (x, y) => countBits(x ^ y);`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Counting Bits',
      url: 'https://leetcode.com/problems/counting-bits/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: DP — dp[i] = dp[i>>1] + (i & 1)',
          explanation: `Shifting right divides by 2, removing LSB. dp[i] = number of 1s in i = number of 1s in (i with last bit dropped) + last bit value.`,
          code: `var countBits = function(n) {
    const dp=new Array(n+1).fill(0);
    for(let i=1;i<=n;i++) dp[i]=dp[i>>1]+(i&1);
    return dp;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Total Hamming Distance',
      url: 'https://leetcode.com/problems/total-hamming-distance/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: For each bit position, count 0s and 1s — contribution = ones × zeros',
          explanation: `For each of 32 bit positions, count how many numbers have bit set (ones) and not set (zeros = n - ones). Hamming contribution for this bit = ones × zeros. Sum over all positions.`,
          code: `var totalHammingDistance = function(nums) {
    let total=0;
    for(let bit=0;bit<32;bit++){
        const ones=nums.reduce((s,n)=>s+(n>>bit&1),0);
        total+=ones*(nums.length-ones);
    }
    return total;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Single Number II',
      url: 'https://leetcode.com/problems/single-number-ii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Count bits mod 3 — the element appearing once has mod-3 residue',
          explanation: `For each bit position, sum all values modulo 3. If a number appears 3 times, its contribution cancels. The single element's bit survives.`,
          code: `var singleNumber = function(nums) {
    let ones=0,twos=0;
    for(const n of nums){
        ones=(ones^n)&~twos;
        twos=(twos^n)&~ones;
    }
    return ones;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Bitwise AND of Numbers Range',
      url: 'https://leetcode.com/problems/bitwise-and-of-numbers-range/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Find common prefix of left and right in binary',
          explanation: `AND of a range keeps only the common prefix bits. Repeatedly right-shift both left and right until equal (removing differing bits). Left-shift back by the number of shifts.`,
          code: `var rangeBitwiseAnd = function(left, right) {
    let shift=0;
    while(left!==right){left>>=1;right>>=1;shift++;}
    return left<<shift;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'amber',
      content: `**Essential bit tricks:**\n- \`n & (n-1)\` — clear lowest set bit (Brian Kernighan, count bits in O(k))\n- \`n & (-n)\` — isolate lowest set bit (used in Fenwick tree)\n- \`n & (n-1) == 0\` — power of 2 check\n- \`a ^ a = 0\` — XOR cancellation (find single element)\n- \`dp[i] = dp[i>>1] + (i&1)\` — count bits for all 0..n in O(n)\n\n**Hamming distance at scale:** For n numbers across 32 bits, O(32n) instead of O(n²) pairwise. For each bit: contribution = (count of 1s) × (count of 0s).`,
    },
  ],
}
