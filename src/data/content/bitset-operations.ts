import type { Article } from '../articles'

export const bitsetOperationsArticle: Article = {
  slug: 'bitset-operations',
  title: 'Bitset & Bit-Parallel Algorithms',
  emoji: '🏁',
  tagline: 'Process 64 elements at once with uint64 bitmasks. DP optimized by 64x.',
  description: 'Bitset operations process 64 elements simultaneously using JavaScript\'s 32-bit integers (or BigInt for 64-bit). Core use: optimize O(n²/64) DP problems (reachability, subset intersection), store and query boolean arrays faster. Applications: boolean DP optimization, subset matching, string pattern matching, and matrix multiplication over GF(2).',
  gradient: 'from-zinc-700 to-stone-800',
  topicSlug: 'dp',
  readTime: '13 min',
  sections: [
    {
      type: 'text',
      content: `JavaScript processes 32 bits at a time with bitwise operations. Pack boolean arrays into integer arrays where each int holds 32 flags. AND/OR/XOR on integers processes 32 elements simultaneously. For a DP where dp[i] is a set of reachable values, OR with shifted dp gives "can reach previous value + new element." O(n²/32) instead of O(n²).`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Bitset class for subset DP optimization',
      code: `class Bitset {
    constructor(n) {
        this.n = n;
        this.words = new Int32Array(Math.ceil(n / 32));
    }
    set(i) { this.words[i >> 5] |= 1 << (i & 31); }
    get(i) { return (this.words[i >> 5] >> (i & 31)) & 1; }
    orWith(other) { for (let i = 0; i < this.words.length; i++) this.words[i] |= other.words[i]; }
    shiftOrWith(other, shift) {
        // this |= (other << shift)
        const wordShift = shift >> 5, bitShift = shift & 31;
        for (let i = this.words.length - 1; i >= wordShift; i--) {
            this.words[i] |= (other.words[i - wordShift] << bitShift);
            if (bitShift && i > wordShift) this.words[i] |= (other.words[i - wordShift - 1] >>> (32 - bitShift));
        }
    }
    count() { let c = 0; for (const w of this.words) c += popcount32(w); return c; }
    test(i) { return this.get(i) === 1; }
}

function popcount32(x) {
    x = x - ((x >> 1) & 0x55555555);
    x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
    x = (x + (x >> 4)) & 0x0f0f0f0f;
    return (x * 0x01010101) >>> 24;
}

// Subset-sum DP with bitset: "can we make sum exactly k?"
// Standard O(n*k), bitset O(n*k/32)
function subsetSumBitset(nums, target) {
    // dp = bitset where bit k is set if sum k is achievable
    let dp = new Int32Array(Math.ceil((target + 1) / 32));
    dp[0] = 1; // sum 0 is achievable
    for (const num of nums) {
        // dp |= (dp << num)
        const shift = num;
        const ws = shift >> 5, bs = shift & 31;
        for (let i = dp.length - 1; i >= ws; i--) {
            dp[i] |= dp[i - ws] << bs;
            if (bs && i > ws) dp[i] |= dp[i - ws - 1] >>> (32 - bs);
        }
    }
    return !!((dp[target >> 5] >> (target & 31)) & 1);
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
      title: 'Partition Equal Subset Sum',
      url: 'https://leetcode.com/problems/partition-equal-subset-sum/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DP with bitset — can we reach target sum?',
          explanation: `dp is a bitset where bit i means "sum i is achievable." For each num: dp |= (dp << num). Check if bit target/2 is set. Bitset makes this O(n × target/32).`,
          code: `var canPartition = function(nums) {
    const sum=nums.reduce((a,b)=>a+b,0);
    if(sum%2) return false;
    const target=sum>>1;
    let dp=BigInt(1); // bit 0 = sum 0 achievable
    for(const n of nums) dp|=(dp<<BigInt(n));
    return !!(dp>>BigInt(target)&1n);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Last Stone Weight II',
      url: 'https://leetcode.com/problems/last-stone-weight-ii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Subset sum — minimize |S1 - S2|',
          explanation: `Split stones into two groups. Minimize |sum1 - sum2| = |2*sum1 - total|. Find all achievable subset sums ≤ total/2. Answer = total - 2 * max achievable sum ≤ total/2.`,
          code: `var lastStoneWeightII = function(stones) {
    const total=stones.reduce((a,b)=>a+b,0);
    let dp=BigInt(1);
    for(const s of stones) dp|=dp<<BigInt(s);
    const half=total>>1;
    for(let i=half;i>=0;i--)
        if((dp>>BigInt(i))&1n) return total-2*i;
    return total;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Maximum AND Sum of Array',
      url: 'https://leetcode.com/problems/maximum-and-sum-of-array/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Bitmask DP — assign nums to slots',
          explanation: `numSlots slots, each can hold ≤2 numbers. dp[mask] = max AND sum using exactly the numbers corresponding to bits in mask. For each state: try assigning next unassigned number to each slot.`,
          code: `var maximumANDSum = function(nums, numSlots) {
    const n=nums.length;
    const dp=new Array(1<<(2*numSlots)).fill(0);
    for(let mask=0;mask<dp.length;mask++){
        const cnt=mask.toString(2).split('1').length-1; // popcount
        if(cnt>=n) continue;
        for(let s=0;s<numSlots;s++){
            const b1=2*s, b2=2*s+1;
            if(!((mask>>b1)&1)){
                const nm=mask|(1<<b1);
                dp[nm]=Math.max(dp[nm],dp[mask]+((nums[cnt])&(s+1)));
            }
            if(!((mask>>b2)&1)){
                const nm=mask|(1<<b2);
                dp[nm]=Math.max(dp[nm],dp[mask]+((nums[cnt])&(s+1)));
            }
        }
    }
    return Math.max(...dp);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🏁',
      color: 'gray',
      content: `**Bitset DP optimization:**\n- Classic: subset-sum dp[sum] = boolean, O(n × target)\n- Bitset: pack 32 dp states into one int, O(n × target/32)\n- BigInt in JS: 64-bit words, but slower than Int32Array\n- For competitive programming: use Int32Array for speed\n\n**Key operations:**\n- dp |= (dp << num): "can reach old sum + num"\n- dp & other: elements in both sets\n- popcount: count set bits (elements in set)\n\n**Matrix multiplication over GF(2):** C[i][j] = OR of (A[i][k] AND B[k][j]). Represent each row as a bitset. Row-by-column multiplication: C_row |= A_row & B_col for each set bit. O(n³/32) instead of O(n³).`,
    },
  ],
}
