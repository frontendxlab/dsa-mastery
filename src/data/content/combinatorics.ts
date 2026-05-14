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
    {
      type: 'heading',
      level: 2,
      text: 'More Worked Problems',
    },
    {
      type: 'problem',
      num: 4,
      title: 'Number of Dice Rolls with Target Sum',
      url: 'https://leetcode.com/problems/number-of-dice-rolls-with-target-sum/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: O(n²) brute force — recurse over all dice combinations',
          explanation: `Try all possible face values for each die. 6^n combinations total — too slow for n=30.`,
        },
        {
          label: 'Intuition 2: DP counting — dp[i][j] = ways to get sum j using i dice',
          explanation: `dp[i][j] = number of ways to reach sum j using exactly i dice. Transition: for each face value f (1..k), dp[i][j] += dp[i-1][j-f]. Base: dp[0][0] = 1. Answer: dp[n][target].`,
          code: `var numRollsToTarget = function(n, k, target) {
    const MOD = 1e9 + 7;
    let dp = new Array(target + 1).fill(0);
    dp[0] = 1;
    for (let i = 0; i < n; i++) {
        const next = new Array(target + 1).fill(0);
        for (let j = 0; j <= target; j++) {
            if (!dp[j]) continue;
            for (let f = 1; f <= k && j + f <= target; f++)
                next[j + f] = (next[j + f] + dp[j]) % MOD;
        }
        dp = next;
    }
    return dp[target];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Count Numbers with Unique Digits',
      url: 'https://leetcode.com/problems/count-numbers-with-unique-digits/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Combinatorics — count per digit length',
          explanation: `For 1-digit: 10 numbers (0-9). For k-digit (k≥2): first digit has 9 choices (1-9), second has 9 (0-9 minus first), third has 8, etc. Multiply and sum for each length up to n.`,
          code: `var countNumbersWithUniqueDigits = function(n) {
    if (n === 0) return 1;
    let total = 10, choices = 9;
    for (let i = 2; i <= n; i++) {
        choices *= (11 - i); // 9, 8, 7, ...
        total += 9 * choices / 9; // first digit: 9 choices
    }
    // Cleaner version:
    let ans = 10, prod = 9;
    for (let i = 2, avail = 9; i <= n; i++, avail--) {
        prod *= avail;
        ans += prod;
    }
    return ans;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 6,
      title: 'Knight Probability in Chessboard',
      url: 'https://leetcode.com/problems/knight-probability-in-chessboard/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: O(n²·k) DP — probability at each cell after each move',
          explanation: `dp[i][r][c] = probability of being at (r,c) after i moves. Start: dp[0][row][col] = 1. Each step: spread probability to all 8 knight destinations, each with probability 1/8. Sum all cells after k moves = probability of staying on board.`,
          code: `var knightProbability = function(n, k, row, col) {
    const dirs = [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]];
    let dp = Array.from({length:n}, () => new Array(n).fill(0));
    dp[row][col] = 1;
    for (let m = 0; m < k; m++) {
        const next = Array.from({length:n}, () => new Array(n).fill(0));
        for (let r = 0; r < n; r++)
            for (let c = 0; c < n; c++) {
                if (!dp[r][c]) continue;
                for (const [dr,dc] of dirs) {
                    const nr = r+dr, nc = c+dc;
                    if (nr>=0 && nr<n && nc>=0 && nc<n)
                        next[nr][nc] += dp[r][c] / 8;
                }
            }
        dp = next;
    }
    return dp.reduce((s, row) => s + row.reduce((a,b) => a+b, 0), 0);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 7,
      title: 'Pascal\'s Triangle',
      url: 'https://leetcode.com/problems/pascals-triangle/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Build row by row — each element = sum of two above',
          explanation: `Each row starts and ends with 1. Interior: triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j]. This is the direct definition of Pascal's triangle (also nCr values).`,
          code: `var generate = function(numRows) {
    const t = [[1]];
    for (let i = 1; i < numRows; i++) {
        const row = [1];
        for (let j = 1; j < i; j++)
            row.push(t[i-1][j-1] + t[i-1][j]);
        row.push(1);
        t.push(row);
    }
    return t;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 8,
      title: 'Count All Valid Pickup and Delivery Options',
      url: 'https://leetcode.com/problems/count-all-valid-pickup-and-delivery-options/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Combinatorial — slots × insertion',
          explanation: `For n orders, think of placing them one by one. After placing i-1 orders (2i-2 slots filled), there are 2i-1 total slots for pickup_i (2i-1 choices). Delivery_i must come after, so it gets (2i-1 - placed_pos)/2 + ... Actually: (2i-1) choices for P_i, and once P_i is placed there are 2i-1 slots for D_i but D_i must come after P_i — on average half: so (2i-1) × i choices? Simpler: multiply (2i-1)×i for each i from 1..n, total mod 1e9+7.`,
          code: `var countOrders = function(n) {
    const MOD = 1_000_000_007n;
    let ans = 1n;
    for (let i = 2; i <= n; i++) {
        // 2i-1 positions for pickup, i positions for delivery (after pickup)
        ans = ans * BigInt(2*i - 1) % MOD * BigInt(i) % MOD;
    }
    return Number(ans);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 9,
      title: 'Minimum Number of Work Sessions to Finish the Tasks',
      url: 'https://leetcode.com/problems/minimum-number-of-work-sessions-to-finish-the-tasks/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Bitmask DP — dp[mask] = min sessions to complete task subset',
          explanation: `Since n ≤ 14, use bitmask DP. dp[mask] = {sessions, remaining time in current session} to finish exactly those tasks. For each mask, try adding one more task: if it fits in current session, extend; else start new session.`,
          code: `var minSessions = function(tasks, sessionTime) {
    const n = tasks.length;
    const dp = new Array(1 << n).fill(null).map(() => [Infinity, 0]);
    dp[0] = [1, sessionTime];
    for (let mask = 0; mask < (1 << n); mask++) {
        const [sessions, rem] = dp[mask];
        if (sessions === Infinity) continue;
        for (let i = 0; i < n; i++) {
            if (mask >> i & 1) continue;
            const next = mask | (1 << i);
            if (tasks[i] <= rem) {
                if (sessions < dp[next][0] || (sessions === dp[next][0] && rem - tasks[i] > dp[next][1]))
                    dp[next] = [sessions, rem - tasks[i]];
            } else {
                if (sessions + 1 < dp[next][0] || (sessions + 1 === dp[next][0] && sessionTime - tasks[i] > dp[next][1]))
                    dp[next] = [sessions + 1, sessionTime - tasks[i]];
            }
        }
    }
    return dp[(1<<n)-1][0];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧠',
      color: 'teal',
      content: `**Counting pattern recognition:**\n- "How many ways to arrange n distinct items?" → n!\n- "How many ways to choose k from n?" → nCr\n- "How many ways to fill k slots where each has n choices?" → n^k\n- "Distribute n identical items into k distinct bins?" → stars-and-bars: C(n+k-1, k-1)\n- "Count valid sequences of length n?" → often DP: dp[i] = ways to build prefix of length i\n- "Count by inclusion-exclusion?" → |A∪B| = |A|+|B|-|A∩B|, generalize with Möbius\n- Large n with mod? → precompute factorials and modular inverses`,
    },
  ],
}
