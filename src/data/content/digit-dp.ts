import type { Article } from '../articles'

export const digitDpArticle: Article = {
  slug: 'digit-dp',
  title: 'Digit DP',
  emoji: '🔟',
  tagline: 'Count integers in [0, N] satisfying a digit property.',
  description: 'Digit DP counts numbers in a range [lo, hi] whose digits satisfy some property (digit sum, no consecutive digits, count of specific digits). The technique: count f(hi) - f(lo-1) where f(n) counts valid numbers in [0, n]. Build digit by digit with a "tight" constraint flag.',
  gradient: 'from-cyan-500 to-blue-600',
  topicSlug: 'dp',
  readTime: '18 min',
  sections: [
    {
      type: 'text',
      content: `Digit DP answers questions like "how many integers in [1, N] have a digit sum divisible by k?" or "how many numbers have no two consecutive equal digits?" The key insight: build the number digit by digit from the most significant digit. At each step, track whether we're still "tight" (bounded by N's digits) or "free" (can pick any digit). Memoize on (position, tight_flag, accumulated_state).`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'The Universal Template',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Digit DP — count valid numbers in [0, N]',
      code: `// Count integers in [0, N] satisfying some property
// Template: count(N) - count(lo-1)

function digitDP(N) {
    const digits = String(N).split('').map(Number);
    const n = digits.length;
    const memo = new Map();

    // pos: current position (0 = most significant)
    // tight: are we still bounded by digits of N?
    // state: accumulated property state (depends on problem)
    function dp(pos, tight, state) {
        if (pos === n) return isValid(state) ? 1 : 0;

        const key = \`\${pos},\${tight},\${state}\`;
        if (memo.has(key)) return memo.get(key);

        const limit = tight ? digits[pos] : 9;
        let count = 0;
        for (let d = 0; d <= limit; d++) {
            const newTight = tight && (d === limit);
            const newState = transition(state, d, pos);
            count += dp(pos + 1, newTight, newState);
        }
        memo.set(key, count);
        return count;
    }

    return dp(0, true, initialState);
}

// For range [lo, hi]: digitDP(hi) - digitDP(lo - 1)
// Handle leading zeros: often pass a 'started' flag or treat them as 0s`,
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'teal',
      content: `**What goes in "state"?**\n- Digit sum problem: accumulated sum so far\n- Consecutive digits: last digit placed\n- Specific digit count: count of target digit seen\n- No two adjacent equal: last digit\n- Divisibility: accumulated value mod k\n\nThe state must be small enough for memoization. Usually ≤ a few thousand states × 2 (tight flag) × n positions.`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Count Numbers with Unique Digits',
      url: 'https://leetcode.com/problems/count-numbers-with-unique-digits/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Combinatorics — count per digit length',
          explanation: `For n=0: just 0 = 1. For k digits (k≥1): first digit 1-9 (9 choices), second 0-9 minus first (9 choices), third 8, ..., k-th is 10-(k-1) choices. Sum from k=1 to n.`,
          code: `var countNumbersWithUniqueDigits = function(n) {
    if (n === 0) return 1;
    let total = 10, prod = 9; // 1-digit: 10 numbers
    for (let i = 2, avail = 9; i <= n; i++, avail--) {
        prod *= avail;
        total += prod;
    }
    return total;
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Digit DP — track used-digit bitmask',
          explanation: `State = bitmask of digits used so far. Count numbers in [0, 10^n - 1] with all unique digits. dp(pos, tight, usedMask, started) where started = have we placed a non-zero digit yet.`,
          code: `var countNumbersWithUniqueDigits = function(n) {
    if (n === 0) return 1;
    const limit = Math.pow(10, n) - 1;
    const digits = String(limit).split('').map(Number);
    const memo = new Map();
    function dp(pos, tight, used, started) {
        if (pos === digits.length) return started ? 1 : 0;
        const key = \`\${pos},\${tight},\${used},\${started}\`;
        if (memo.has(key)) return memo.get(key);
        const lim = tight ? digits[pos] : 9;
        let count = 0;
        for (let d = 0; d <= lim; d++) {
            if (started && (used >> d & 1)) continue; // digit already used
            const newUsed = started || d > 0 ? used | (1<<d) : 0;
            count += dp(pos+1, tight && d===lim, newUsed, started || d>0);
        }
        memo.set(key, count);
        return count;
    }
    return dp(0, true, 0, false) + 1; // +1 for 0 itself
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Non-negative Integers without Consecutive Ones',
      url: 'https://leetcode.com/problems/non-negative-integers-without-consecutive-ones/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Digit DP on binary representation',
          explanation: `Count binary numbers in [0, n] with no two consecutive 1-bits. State: (bit position, tight, last_bit). Build from MSB. If last bit was 1, current must be 0.`,
          code: `var findIntegers = function(n) {
    const bits = n.toString(2).split('').map(Number);
    const len = bits.length;
    const memo = new Map();
    function dp(pos, tight, lastBit) {
        if (pos === len) return 1;
        const key = \`\${pos},\${tight},\${lastBit}\`;
        if (memo.has(key)) return memo.get(key);
        const lim = tight ? bits[pos] : 1;
        let count = 0;
        for (let b = 0; b <= lim; b++) {
            if (lastBit === 1 && b === 1) continue; // consecutive ones!
            count += dp(pos+1, tight && b===lim, b);
        }
        memo.set(key, count);
        return count;
    }
    return dp(0, true, 0);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Numbers At Most N Given Digit Set',
      url: 'https://leetcode.com/problems/numbers-at-most-n-given-digit-set/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Digit DP or direct math counting',
          explanation: `For numbers shorter than N: k digits where k < len(N), count = |D|^k (each digit freely chosen from D). For numbers of same length as N: digit DP with tight constraint — for each position, count digits in D less than current digit of N times |D|^(remaining positions), plus continue if current digit of N is in D.`,
          code: `var atMostNGivenDigitSet = function(digits, n) {
    const s = String(n);
    const k = s.length;
    let count = 0;
    const d = digits.length;
    // Numbers with fewer digits than n
    for (let len = 1; len < k; len++) count += Math.pow(d, len);
    // Numbers with same number of digits as n
    for (let i = 0; i < k; i++) {
        // Count digits in D strictly less than s[i]
        const smaller = digits.filter(c => c < s[i]).length;
        count += smaller * Math.pow(d, k - i - 1);
        // If s[i] itself is not in D, can't continue tight — stop
        if (!digits.includes(s[i])) break;
        // If we're at the last position and s[i] is in D, include n itself
        if (i === k - 1) count++;
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
      title: 'Digit Count in Range',
      url: 'https://leetcode.com/problems/digit-count-in-range/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Count occurrences of digit d in [1, N]',
          explanation: `Count how many times digit d appears in all numbers from 1 to n. For each position p (ones, tens, hundreds...), compute how many times d appears at that position. Split each number around position p into higher/current/lower parts.`,
          code: `var digitsCount = function(d, low, high) {
    const count = (n) => {
        if (n <= 0) return 0;
        let total = 0;
        for (let p = 1; p <= n; p *= 10) {
            const higher = Math.floor(n / (p * 10));
            const curr = Math.floor(n / p) % 10;
            const lower = n % p;
            if (d === 0) {
                total += (higher - 1) * p + (curr > d ? p : curr === d ? lower + 1 : 0);
            } else {
                total += higher * p + (curr > d ? p : curr === d ? lower + 1 : 0);
            }
        }
        return total;
    };
    return count(high) - count(low - 1);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧠',
      color: 'blue',
      content: `**Digit DP state design:**\n1. Always include: position, tight flag\n2. Add problem-specific state: last digit, digit sum mod k, digit count, used-mask\n3. Handle leading zeros: add a "started" boolean (avoids counting 007 as different from 7)\n4. Range query: count(hi) - count(lo-1)\n\n**Common state additions:**\n- No consecutive same digits → last_digit\n- Digit sum divisible by k → current_sum_mod_k\n- All digits unique → bitmask of used digits (only feasible for small digit sets)\n- Count occurrences of digit d → count_so_far`,
    },
  ],
}
