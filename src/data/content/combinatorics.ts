import type { Article } from '../articles'

export const combinatoricsArticle: Article = {
  slug: 'combinatorics',
  title: 'Combinatorics & Counting',
  emoji: '🎲',
  tagline: 'nCr, inclusion-exclusion, Catalan numbers — count without listing.',
  description: 'Combinatorics answers "how many ways?" without enumerating all possibilities. Master nCr with factorials mod p, inclusion-exclusion principle, stars-and-bars, and Catalan numbers.',
  gradient: 'from-violet-400 to-purple-500',
  topicSlug: 'combinatorics',
  readTime: '16 min',
  sections: [
    {
      type: 'text',
      content: `Combinatorics problems ask "how many ways to arrange/choose/partition?" The brute force (enumerate all possibilities) always works but is exponential. The key is finding the formula. Once you recognize the structure — permutation, combination, partition, or arrangement with constraints — the formula follows directly.`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Core Formulas',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'nPr and nCr',
      code: `// nPr = n! / (n-r)! — ordered selection
// nCr = n! / (r! * (n-r)!) — unordered selection

// Pascal's triangle (small n, no mod needed)
function nCr_pascal(n, r) {
    const C = Array.from({length: n+1}, () => new Array(n+1).fill(0));
    for (let i = 0; i <= n; i++) {
        C[i][0] = 1;
        for (let j = 1; j <= i; j++)
            C[i][j] = C[i-1][j-1] + C[i-1][j];
    }
    return C[n][r];
}

// nCr mod p — precomputed factorials (large n)
const MOD = 1_000_000_007n;
const MAX = 200001;
const fact = new Array(MAX), inv_fact = new Array(MAX);

function precompute() {
    fact[0] = 1n;
    for (let i = 1; i < MAX; i++) fact[i] = fact[i-1] * BigInt(i) % MOD;
    const powMod = (b, e) => { let r = 1n; b %= MOD; for (; e > 0n; e >>= 1n) { if (e & 1n) r = r * b % MOD; b = b * b % MOD; } return r; };
    inv_fact[MAX-1] = powMod(fact[MAX-1], MOD - 2n);
    for (let i = MAX-2; i >= 0; i--) inv_fact[i] = inv_fact[i+1] * BigInt(i+1) % MOD;
}

function C(n, r) {
    if (r < 0 || r > n) return 0n;
    return fact[n] * inv_fact[r] % MOD * inv_fact[n-r] % MOD;
}`,
    },
    {
      type: 'table',
      headers: ['Pattern', 'Formula', 'When'],
      rows: [
        ['Choose r from n (unordered)', 'nCr = n! / (r!(n-r)!)', 'Subsets, combinations'],
        ['Arrange r from n (ordered)', 'nPr = n! / (n-r)!', 'Permutations'],
        ['All arrangements of n', 'n!', 'Derangements, full permutations'],
        ['With repetition allowed', 'n^r', 'Each slot has n choices'],
        ['Distribute n identical into k boxes', '(n+k-1)Cr(k-1)', 'Stars and bars'],
        ['At least one in each box', '(n-1)Cr(k-1)', 'Stars and bars with constraint'],
        ['Binary strings with exactly k ones', 'nCr(k)', 'Grid paths, binary arrangements'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Catalan Numbers',
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'teal',
      content: `**Catalan number C(n)** = (2n choose n) / (n+1)\n\nAppears in: valid parentheses sequences, BST count, triangulations, mountain ranges, ballot problem.\n\nRecurrence: C(0)=1, C(n+1) = Σ C(i)×C(n-i) for i=0..n\nFormula: C(n) = (2n)! / ((n+1)! × n!)`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Catalan numbers (iterative)',
      code: `// C(n) = C(2n, n) / (n+1)
function catalan(n) {
    // Using the recurrence: C(n) = sum of C(i)*C(n-1-i)
    const dp = new Array(n+1).fill(0n);
    dp[0] = dp[1] = 1n;
    for (let i = 2; i <= n; i++)
        for (let j = 0; j < i; j++)
            dp[i] = (dp[i] + dp[j] * dp[i-1-j]) % MOD;
    return dp[n];
}

// Or using formula: C(2n,n) / (n+1)
function catalan_formula(n) {
    return C(2*n, n) * powMod(BigInt(n+1), MOD-2n, MOD) % MOD;
}`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Inclusion-Exclusion Principle',
    },
    {
      type: 'callout',
      icon: '🔑',
      color: 'amber',
      content: `|A ∪ B| = |A| + |B| - |A ∩ B|\n|A ∪ B ∪ C| = |A|+|B|+|C| - |A∩B| - |A∩C| - |B∩C| + |A∩B∩C|\n\nGeneral: alternately add/subtract intersections of size 1, 2, 3...`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Unique Paths',
      url: 'https://leetcode.com/problems/unique-paths/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DP grid',
          explanation: `dp[i][j] = paths to reach (i,j). Base: first row/col = 1. Fill: dp[i][j] = dp[i-1][j] + dp[i][j-1].`,
          code: `var uniquePaths = function(m, n) {
    const dp = Array.from({length: m}, () => new Array(n).fill(1));
    for (let i = 1; i < m; i++)
        for (let j = 1; j < n; j++)
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
    return dp[m-1][n-1];
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Combinatorics — C(m+n-2, m-1)',
          explanation: `Total steps = (m-1) down + (n-1) right = m+n-2 moves. Choose which m-1 of those are "down" steps. Answer = C(m+n-2, m-1).`,
          code: `var uniquePaths = function(m, n) {
    // C(m+n-2, m-1) — no mod needed for small inputs
    let result = 1;
    for (let i = 0; i < m - 1; i++) {
        result = result * (n + i) / (i + 1);
    }
    return Math.round(result);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Count Vowel Strings',
      url: 'https://leetcode.com/problems/count-vowel-strings-in-ranges/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Prefix sum on vowel-start-and-end flag',
          explanation: `A string "counts" if first and last char are vowels. Precompute prefix sums of qualifying strings. Each query = prefix[right+1] - prefix[left].`,
          code: `var vowelStrings = function(words, queries) {
    const v = new Set(['a','e','i','o','u']);
    const prefix = [0];
    for (const w of words)
        prefix.push(prefix.at(-1) + (v.has(w[0]) && v.has(w.at(-1)) ? 1 : 0));
    return queries.map(([l, r]) => prefix[r+1] - prefix[l]);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Count Ways to Build Good Strings',
      url: 'https://leetcode.com/problems/count-ways-to-build-good-strings/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DP counting — ways to reach each length',
          explanation: `dp[i] = number of ways to build string of length exactly i. At each length i: if i ≥ zero, dp[i] += dp[i-zero]; if i ≥ one, dp[i] += dp[i-one]. Answer = sum of dp[low..high].`,
          code: `var countGoodStrings = function(low, high, zero, one) {
    const MOD = 1e9 + 7;
    const dp = new Array(high + 1).fill(0);
    dp[0] = 1;
    let ans = 0;
    for (let i = 1; i <= high; i++) {
        if (i >= zero) dp[i] = (dp[i] + dp[i - zero]) % MOD;
        if (i >= one)  dp[i] = (dp[i] + dp[i - one])  % MOD;
        if (i >= low)  ans   = (ans   + dp[i])          % MOD;
    }
    return ans;
};`,
          lang: 'javascript',
        },
      ],
    },
  ],
}
