import type { Article } from '../articles'

export const linearAlgebraArticle: Article = {
  slug: 'linear-algebra',
  title: 'Linear Algebra & Matrix Exponentiation',
  emoji: '🔢',
  tagline: 'Speed up any linear recurrence from O(n) to O(log n) with matrix power.',
  description: 'Matrix exponentiation accelerates linear recurrences, counts graph paths, and solves state-transition problems in O(k³ log n). Learn the matrix construction trick, fast power, and Gaussian elimination.',
  gradient: 'from-indigo-400 to-blue-500',
  topicSlug: 'linear_algebra',
  readTime: '18 min',
  sections: [
    {
      type: 'text',
      content: `Matrix exponentiation is a single powerful trick: if a system's next state is a linear function of its current state, you can represent that function as a matrix and compute the nth state in O(k³ log n) instead of O(kn). This unlocks Fibonacci in log n, counts paths of length n in a graph, and accelerates any DP with a fixed transition.`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Core Idea — State × Transition Matrix',
    },
    {
      type: 'callout',
      icon: '🔑',
      color: 'teal',
      content: `**Pattern recognition:**\n- "Find f(n) where f(n) = a·f(n-1) + b·f(n-2) + ..." → matrix exponentiation\n- "Count paths of length exactly k in a graph" → raise adjacency matrix to kth power\n- "DP transition is the same at every step" → encode in a matrix\n\n**Key formula:** If state_n = M × state_{n-1}, then state_n = M^n × state_0`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Matrix multiply + fast power — O(k³ log n)',
      code: `const MOD = 1_000_000_007n;

function matMul(A, B) {
    const n = A.length, m = B[0].length, k = B.length;
    const C = Array.from({length: n}, () => new Array(m).fill(0n));
    for (let i = 0; i < n; i++)
        for (let j = 0; j < m; j++)
            for (let p = 0; p < k; p++)
                C[i][j] = (C[i][j] + A[i][p] * B[p][j]) % MOD;
    return C;
}

function matPow(M, n) {
    let result = M.map((r, i) => r.map((_, j) => i === j ? 1n : 0n)); // identity
    while (n > 0n) {
        if (n & 1n) result = matMul(result, M);
        M = matMul(M, M);
        n >>= 1n;
    }
    return result;
}

// Fibonacci in O(log n)
// [F(n+1)]   [1 1]^n   [1]
// [F(n)  ] = [1 0]   × [0]
function fibonacci(n) {
    if (n <= 1) return n;
    const M = [[1n, 1n], [1n, 0n]];
    const R = matPow(M, BigInt(n - 1));
    return R[0][0]; // F(n)
}`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Building the Transition Matrix',
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'blue',
      content: `**Recipe for any linear recurrence f(n) = c1·f(n-1) + c2·f(n-2) + ... + ck·f(n-k):**\n\nState vector: [f(n), f(n-1), ..., f(n-k+1)]\n\nTransition matrix (k×k):\n\`\`\`\n[c1  c2  c3 ... ck ]\n[1   0   0  ... 0  ]\n[0   1   0  ... 0  ]\n...                 \n[0   0  ... 1   0  ]\n\`\`\`\n\nFor "count paths of length n in graph": raise adjacency matrix to nth power. Entry [i][j] = number of paths from i to j of length n.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Count paths of length exactly k in a graph',
      code: `// adj[i][j] = 1 if edge exists
// After matPow(adj, k): result[i][j] = paths from i to j of length k
function countPaths(n, edges, k, src, dst) {
    const adj = Array.from({length: n}, () => new Array(n).fill(0n));
    for (const [u, v] of edges) {
        adj[u][v] = 1n;
        adj[v][u] = 1n; // undirected
    }
    const R = matPow(adj, BigInt(k));
    return R[src][dst];
}`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Gaussian Elimination',
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'amber',
      content: `**Gaussian elimination** solves Ax = b or finds matrix rank. Over GF(2) (bits), it solves systems of XOR equations — used for XOR basis / linear independence problems.\n\nTime: O(n² × cols/64) with bitset optimization.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'XOR basis — linear independence over GF(2)',
      code: `// Insert numbers into XOR basis
// Basis can represent any XOR of inserted numbers
function buildXorBasis(nums) {
    const basis = new Array(30).fill(0);
    for (const x of nums) {
        let cur = x;
        for (let i = 29; i >= 0; i--) {
            if (!(cur >> i & 1)) continue;
            if (!basis[i]) { basis[i] = cur; break; }
            cur ^= basis[i];
        }
    }
    return basis;
}

// Max XOR of any subset
function maxXor(nums) {
    const basis = buildXorBasis(nums);
    let res = 0;
    for (let i = 29; i >= 0; i--)
        res = Math.max(res, res ^ basis[i]);
    return res;
}

// Check if x can be formed by XOR of subset
function canForm(basis, x) {
    for (let i = 29; i >= 0; i--) {
        if (!(x >> i & 1)) continue;
        if (!basis[i]) return false;
        x ^= basis[i];
    }
    return x === 0;
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
      title: 'Fibonacci Number',
      url: 'https://leetcode.com/problems/fibonacci-number/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Matrix exponentiation O(log n)',
          explanation: 'F(n) = F(n-1) + F(n-2). State [F(n+1), F(n)]ᵀ = [[1,1],[1,0]] × [F(n), F(n-1)]ᵀ. Raise matrix to nth power.',
          code: `var fib = function(n) {
    if (n <= 1) return n;
    const matMul = (A, B) => [
        [A[0][0]*B[0][0]+A[0][1]*B[1][0], A[0][0]*B[0][1]+A[0][1]*B[1][1]],
        [A[1][0]*B[0][0]+A[1][1]*B[1][0], A[1][0]*B[0][1]+A[1][1]*B[1][1]],
    ];
    let M = [[1,1],[1,0]], R = [[1,0],[0,1]];
    let p = n - 1;
    while (p > 0) {
        if (p & 1) R = matMul(R, M);
        M = matMul(M, M);
        p >>= 1;
    }
    return R[0][0];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Maximum XOR of Two Numbers in an Array',
      url: 'https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Trie for max XOR',
          explanation: 'For each number, greedily pick the opposite bit at each level of a binary trie. Build trie from all numbers, then query each.',
          code: `var findMaximumXOR = function(nums) {
    let max = 0;
    let mask = 0;
    for (let i = 31; i >= 0; i--) {
        mask |= (1 << i);
        const prefixes = new Set(nums.map(n => n & mask));
        const candidate = max | (1 << i);
        for (const prefix of prefixes)
            if (prefixes.has(candidate ^ prefix)) { max = candidate; break; }
    }
    return max;
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: XOR basis (linear algebra)',
          explanation: 'Build XOR basis from all numbers. Greedily maximize by XORing result with each basis vector if it increases the value.',
          code: `var findMaximumXOR = function(nums) {
    const basis = new Array(32).fill(0);
    for (let x of nums)
        for (let i = 31; i >= 0; i--) {
            if (!(x >> i & 1)) continue;
            if (!basis[i]) { basis[i] = x; break; }
            x ^= basis[i];
        }
    let res = 0;
    for (let i = 31; i >= 0; i--) res = Math.max(res, res ^ basis[i]);
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Decode Ways II',
      url: 'https://leetcode.com/problems/decode-ways-ii/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: DP with state transitions',
          explanation: 'dp[i] = ways to decode s[0..i]. Each step: try 1-char decode and 2-char decode. For stars (*), multiply by number of valid expansions (1-9 or 1-26 etc.).',
          code: `var numDecodings = function(s) {
    const MOD = 1_000_000_007n;
    const n = s.length;
    let prev2 = 1n, prev1 = s[0] === '*' ? 9n : s[0] === '0' ? 0n : 1n;
    for (let i = 1; i < n; i++) {
        let cur = 0n;
        const c = s[i], p = s[i-1];
        // 1-char decode
        if (c === '*') cur = 9n * prev1;
        else if (c !== '0') cur = prev1;
        // 2-char decode
        if (p === '*' && c === '*') cur = (cur + 15n * prev2) % MOD;
        else if (p === '*') cur = (cur + (c <= '6' ? 2n : 1n) * prev2) % MOD;
        else if (c === '*') cur = (cur + (p === '1' ? 9n : p === '2' ? 6n : 0n) * prev2) % MOD;
        else {
            const two = parseInt(p + c);
            if (two >= 10 && two <= 26) cur = (cur + prev2) % MOD;
        }
        prev2 = prev1; prev1 = cur % MOD;
    }
    return Number(prev1);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Maximum XOR With an Element From Array',
      url: 'https://leetcode.com/problems/maximum-xor-with-an-element-from-array/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Offline sort + XOR trie',
          explanation: 'Sort queries by limit m. Sort array. For each query (x, m), add all nums <= m into XOR trie first, then query max XOR with x.',
          code: `var maximizeXor = function(nums, queries) {
    nums.sort((a,b)=>a-b);
    const n = queries.length;
    const idx = Array.from({length:n},(_,i)=>i).sort((a,b)=>queries[a][1]-queries[b][1]);
    const ans = new Array(n).fill(-1);
    const trie = new Array(2e6).fill(0).map(()=>[0,0]);
    let sz = 1;
    let j = 0;
    const insert = x => {
        let node = 0;
        for (let i=29;i>=0;i--) {
            const b=(x>>i)&1;
            if (!trie[node][b]) trie[node][b]=sz++;
            node=trie[node][b];
        }
    };
    const query = x => {
        let node=0,res=0;
        for (let i=29;i>=0;i--) {
            const b=(x>>i)&1, want=1-b;
            if (trie[node][want]) { res|=(1<<i); node=trie[node][want]; }
            else node=trie[node][b];
        }
        return res;
    };
    for (const qi of idx) {
        const [x,m]=queries[qi];
        while (j<nums.length && nums[j]<=m) insert(nums[j++]);
        if (j>0 && nums[j-1]<=m) ans[qi]=query(x);
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
      num: 5,
      title: 'Fibonacci Number (Matrix Exponentiation O(log n))',
      url: 'https://leetcode.com/problems/fibonacci-number/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: O(n) DP — standard',
          explanation: `fib(0)=0, fib(1)=1, fib(n) = fib(n-1) + fib(n-2). Iterate with two variables. O(n).`,
          code: `var fib = function(n) {
    if (n <= 1) return n;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) [a, b] = [b, a+b];
    return b;
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: O(log n) matrix exponentiation',
          explanation: `[fib(n+1), fib(n)] = [[1,1],[1,0]]^n × [1, 0]. Matrix exponentiation computes the n-th power in O(log n) matrix multiplications, each O(2³) = O(1). Total: O(log n).`,
          code: `var fib = function(n) {
    if (n <= 1) return n;
    const matMul = (A, B) => [
        [A[0][0]*B[0][0]+A[0][1]*B[1][0], A[0][0]*B[0][1]+A[0][1]*B[1][1]],
        [A[1][0]*B[0][0]+A[1][1]*B[1][0], A[1][0]*B[0][1]+A[1][1]*B[1][1]],
    ];
    const matPow = (M, p) => {
        if (p === 1) return M;
        const half = matPow(M, p>>1);
        const sq = matMul(half, half);
        return p & 1 ? matMul(sq, M) : sq;
    };
    return matPow([[1,1],[1,0]], n)[0][1];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 6,
      title: 'Staircase (k steps) — Matrix Recurrence',
      url: 'https://leetcode.com/problems/climbing-stairs/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: DP — climbing stairs is Fibonacci',
          explanation: `ways(n) = ways(n-1) + ways(n-2). Same as Fibonacci with ways(1)=1, ways(2)=2.`,
          code: `var climbStairs = function(n) {
    if (n <= 2) return n;
    let a = 1, b = 2;
    for (let i = 3; i <= n; i++) [a, b] = [b, a+b];
    return b;
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Matrix exponentiation for n up to 10^18',
          explanation: `For very large n (up to 10^18), O(n) DP is impossible. Matrix exponentiation: [[f(n+1)],[f(n)]] = [[1,1],[1,0]]^n × [[1],[0]]. Compute in O(log n).`,
          code: `// Same matrix power approach as Fibonacci — just change base case
// [[1,1],[1,0]]^n gives F(n+1) at position [0][0]
// For k-step staircase (up to k steps at a time), use k×k matrix`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '⚡',
      color: 'teal',
      content: `**When to use matrix exponentiation:**\n- Recurrence of fixed order k: O(k³ log n) vs O(kn)\n- n can be up to 10¹⁸ — impossible to iterate\n- Counting paths of exact length in small graph\n- Tiling, staircase, domino problems with periodic structure\n\n**Matrix size rule of thumb:** k×k matrix where k = number of terms in recurrence. Keep k small (≤ 4) for competitive programming.\n\n**XOR basis:**\n- Maintain basis of O(32) independent XOR vectors\n- Maximize XOR: greedily try adding each basis vector if it increases result\n- Add number to basis: Gaussian elimination on bits (highest bit first)`,
    },
  ],
}
