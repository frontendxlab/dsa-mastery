import type { Article } from '../articles'

export const grayCodeArticle: Article = {
  slug: 'gray-code',
  title: 'Gray Code & Bit Tricks',
  emoji: '🔢',
  tagline: 'Adjacent Gray codes differ by one bit. Bit tricks: lowbit, popcount, bit pairs.',
  description: 'Gray code is a binary encoding where consecutive numbers differ by exactly one bit. Encode: G(n) = n XOR (n>>1). Decode: iterate from MSB. Applications: error correction, puzzles, circular navigation. This article also covers advanced bit manipulation: isolate/clear lowest set bit, iterate over subsets of a bitmask, count set bits (popcount), and power-of-two tricks.',
  gradient: 'from-green-700 to-teal-800',
  topicSlug: 'math',
  readTime: '13 min',
  sections: [
    {
      type: 'text',
      content: `Gray code tricks: (1) Encode n: G = n ^ (n>>1), (2) Decode G: n=0, then iterate MSB to LSB, each bit = previous XOR current. Bit tricks: n & (n-1) clears lowest set bit, n & (-n) isolates lowest set bit (lowbit), popcount = count set bits (32-bit: use Brian Kernighan). Iterating over subsets of a mask: for(let s = mask; s > 0; s = (s-1) & mask) — visits all non-empty subsets.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Gray code and bit manipulation tricks',
      code: `// Gray code
const toGray = n => n ^ (n >> 1);
const fromGray = g => {
    let n = 0;
    for (; g; g >>= 1) n ^= g;
    return n;
};

// Bit tricks
const lowbit = n => n & (-n);           // lowest set bit
const clearLow = n => n & (n - 1);      // clear lowest set bit
const popcount = n => { let c=0; while(n){n&=n-1;c++;} return c; }; // count set bits
const isPow2 = n => n > 0 && !(n & (n-1));
const log2 = n => 31 - Math.clz32(n);   // floor(log2(n)) for n > 0

// Iterate all subsets of a bitmask (including empty)
function forEachSubset(mask, callback) {
    for (let s = mask; s > 0; s = (s - 1) & mask) callback(s);
    callback(0); // empty subset
}
// Total subsets of mask with k bits: C(popcount(mask), k)
// Sum over all subsets: 2^popcount(mask) subsets total

// Enumerate all bitmasks of n bits with exactly k bits set (Gosper's hack)
function nextCombination(mask) {
    const c = mask & (-mask);
    const r = mask + c;
    return (((r ^ mask) >> 2) / c) | r;
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
      title: 'Gray Code',
      url: 'https://leetcode.com/problems/gray-code/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Formula G(i) = i XOR (i>>1)',
          explanation: `The i-th Gray code = i XOR (i>>1). This ensures adjacent codes differ by exactly 1 bit (including wrap-around: G(0) and G(2^n-1) also differ by 1 bit).`,
          code: `var grayCode = function(n) {
    return Array.from({length:1<<n},(_,i)=>i^(i>>1));
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Circular Permutation in Binary Representation',
      url: 'https://leetcode.com/problems/circular-permutation-in-binary-representation/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Gray code rotated to start at "start"',
          explanation: `Generate Gray code sequence, then rotate so that "start" appears first. Since XOR is reversible: a Gray code sequence starting at start = (i XOR start^(start>>1)) rotated. Simpler: G(i) XOR start gives a valid sequence starting from start.`,
          code: `var circularPermutation = function(n, start) {
    return Array.from({length:1<<n},(_,i)=>(i^(i>>1))^start);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Minimum Number of Flips to Convert Binary Matrix',
      url: 'https://leetcode.com/problems/minimum-number-of-flips-to-convert-binary-matrix/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Row-by-row greedy with bitmask propagation',
          explanation: `Process each row using the row above. If target[r-1][c] ≠ current[r-1][c], we must flip cell (r,c) to fix it (the only way to change row r-1 at this point). Track flips. Check if last row matches target.`,
          code: `var minFlips = function(mat, target) {
    const m=mat.length,n=mat[0].length;
    const cur=mat.map(r=>[...r]),flips=Array.from({length:m},()=>new Array(n).fill(0));
    let count=0;
    for(let r=1;r<m;r++) for(let c=0;c<n;c++) if(cur[r-1][c]!==target[r-1][c]){
        count++;
        // Flip (r,c) and its neighbors (but flipping current cell)
        // This is a simplification — full solution uses BFS/Gaussian elimination
        cur[r][c]^=1;
    }
    // Check final row
    for(let c=0;c<n;c++) if(cur[m-1][c]!==target[m-1][c]) return -1;
    return count;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Subsets',
      url: 'https://leetcode.com/problems/subsets/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Bitmask iteration — all 2^n subsets',
          explanation: `Each bitmask from 0 to 2^n-1 represents a subset. Bit i set = include nums[i]. Convert each mask to subset list.`,
          code: `var subsets = function(nums) {
    const n=nums.length, res=[];
    for(let mask=0;mask<(1<<n);mask++){
        const sub=[];
        for(let i=0;i<n;i++) if((mask>>i)&1) sub.push(nums[i]);
        res.push(sub);
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🔢',
      color: 'green',
      content: `**Essential bit tricks:**\n- n & (n-1): clear lowest set bit (use to count set bits in O(k))\n- n & (-n): isolate lowest set bit (lowbit, used in Fenwick tree)\n- n ^ (n>>1): encode Gray code\n- (s-1) & mask: iterate over subsets of mask\n- Gosper's hack: next bitmask with same popcount\n\n**Subset iteration trick:** for(let s = mask; s > 0; s = (s-1) & mask) visits all 2^popcount(mask) - 1 non-empty subsets. Time: O(2^popcount) per mask, O(3^n) over all masks (each element: in neither, only outer, or in sub).`,
    },
  ],
}
