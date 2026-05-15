import type { Article } from '../articles'

export const matrixExponentiationArticle: Article = {
  slug: 'matrix-exponentiation',
  title: 'Matrix Exponentiation',
  emoji: '🧮',
  tagline: 'Compute linear recurrences in O(k³ log n). Fibonacci in O(log n).',
  description: 'Matrix exponentiation computes the n-th term of a linear recurrence in O(k³ log n) where k is the recurrence order. Write the recurrence as a matrix multiplication T·v = v\', then T^n·v₀ = vₙ. Uses fast matrix power (repeated squaring). Solves: Fibonacci, tribonacci, counting paths of length n in a graph, tiling problems, and any k-th order linear recurrence.',
  gradient: 'from-indigo-500 to-violet-600',
  topicSlug: 'math',
  readTime: '15 min',
  sections: [
    {
      type: 'text',
      content: `Any k-th order linear recurrence f(n) = a₁f(n-1) + a₂f(n-2) + ... + aₖf(n-k) can be written as a matrix multiplication: [[a₁,a₂,...,aₖ],[1,0,...,0],...,[0,...,1,0]] × [f(n-1),f(n-2),...,f(n-k)]ᵀ = [f(n),...,f(n-k+1)]ᵀ. Raise this matrix to the n-th power using fast exponentiation (repeated squaring) to get f(n) in O(k³ log n) multiplications.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Matrix exponentiation template',
      code: `const MOD = BigInt(1e9 + 7);

function matMul(A, B) {
    const n = A.length, m = B[0].length, k = B.length;
    const C = Array.from({length: n}, () => new Array(m).fill(0n));
    for (let i = 0; i < n; i++)
        for (let l = 0; l < k; l++) if (A[i][l])
            for (let j = 0; j < m; j++)
                C[i][j] = (C[i][j] + A[i][l] * B[l][j]) % MOD;
    return C;
}

function matPow(M, p) {
    let n = M.length;
    // Identity matrix
    let result = Array.from({length: n}, (_, i) => Array.from({length: n}, (_, j) => i === j ? 1n : 0n));
    while (p > 0n) {
        if (p & 1n) result = matMul(result, M);
        M = matMul(M, M);
        p >>= 1n;
    }
    return result;
}

// Fibonacci: T = [[1,1],[1,0]], T^n * [1,0]^T = [F(n+1), F(n)]^T
function fibonacci(n) {
    if (n <= 1) return BigInt(n);
    const T = [[1n, 1n], [1n, 0n]];
    const Tn = matPow(T, BigInt(n - 1));
    return Tn[0][0]; // F(n)
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
          label: 'Intuition 1: Simple DP — O(n)',
          explanation: `Bottom-up DP: f(n) = f(n-1) + f(n-2) with constant space rolling variables. Sufficient for small n.`,
          code: `var fib = function(n) {
    if(n<=1) return n;
    let [a,b]=[0,1];
    for(let i=2;i<=n;i++) [a,b]=[b,a+b];
    return b;
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Matrix exponentiation — O(log n)',
          explanation: `For huge n (mod required), matrix exponentiation computes F(n) in O(log n) matrix multiplications. T = [[1,1],[1,0]], T^n = [[F(n+1),F(n)],[F(n),F(n-1)]].`,
          code: `var fib = function(n) {
    if(n<=1) return n;
    const mul=(A,B)=>{
        const C=[[0,0],[0,0]];
        for(let i=0;i<2;i++) for(let k=0;k<2;k++) if(A[i][k])
            for(let j=0;j<2;j++) C[i][j]+=A[i][k]*B[k][j];
        return C;
    };
    let M=[[1,1],[1,0]], res=[[1,0],[0,1]]; let p=n-1;
    while(p){if(p&1) res=mul(res,M); M=mul(M,M); p>>=1;}
    return res[0][0];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Climbing Stairs (generalized — k steps)',
      url: 'https://leetcode.com/problems/climbing-stairs/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Standard DP',
          explanation: `f(n) = f(n-1) + f(n-2). Same as Fibonacci. For k allowed step sizes: f(n) = f(n-1) + f(n-2) + ... + f(n-k).`,
          code: `var climbStairs = function(n) {
    let [a,b]=[1,1];
    for(let i=2;i<=n;i++) [a,b]=[b,a+b];
    return b;
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Matrix exponentiation for k-step generalization',
          explanation: `For k allowed steps (1 to k), the transition matrix is k×k. T[0] = all 1s (sum of last k), T[i][i-1] = 1 (shift). T^n × initial vector gives f(n) in O(k³ log n).`,
          code: `// For k=3 (tribonacci-like):
// T = [[1,1,1],[1,0,0],[0,1,0]]
// For very large n, this approach is O(k^3 * log n) vs O(k*n) DP
// Matrix exponentiation shines when n ~ 10^18 and k is small`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Knight Dialer',
      url: 'https://leetcode.com/problems/knight-dialer/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Matrix exponentiation — state = current digit',
          explanation: `State: which digit knight is on. Transition: knight can move from digit d to all reachable digits. Build 10×10 transition matrix T. T^n[i][j] = number of n-step paths from digit i to digit j. Answer = sum of T^(n-1) starting from each digit.`,
          code: `var knightDialer = function(n) {
    const MOD=1e9+7;
    const moves=[[4,6],[6,8],[7,9],[4,8],[3,9,0],[],[1,7,0],[2,6],[1,3],[2,4]];
    // Build transition matrix
    const T=Array.from({length:10},()=>new Array(10).fill(0));
    for(let d=0;d<10;d++) for(const nd of moves[d]) T[d][nd]++;
    // Matrix multiply mod
    const mul=(A,B)=>{
        const n=A.length;
        const C=Array.from({length:n},()=>new Array(n).fill(0));
        for(let i=0;i<n;i++) for(let k=0;k<n;k++) if(A[i][k])
            for(let j=0;j<n;j++) C[i][j]=(C[i][j]+A[i][k]*B[k][j])%MOD;
        return C;
    };
    let M=T, res=Array.from({length:10},(_,i)=>Array.from({length:10},(_,j)=>i===j?1:0));
    let p=n-1;
    while(p){if(p&1) res=mul(res,M); M=mul(M,M); p>>=1;}
    let ans=0;
    for(let d=0;d<10;d++) for(let nd=0;nd<10;nd++) ans=(ans+res[d][nd])%MOD;
    return ans;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Count Vowels Permutation',
      url: 'https://leetcode.com/problems/count-vowels-permutation/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: DP with vowel transition rules',
          explanation: `State: last vowel placed. Transitions: a→e, e→a/i, i→a/e/o/u, o→i/u, u→a. dp[n][v] = count of n-length strings ending in vowel v. Can use matrix exponentiation for very large n.`,
          code: `var countVowelPermutation = function(n) {
    const MOD=1e9+7;
    // a=0,e=1,i=2,o=3,u=4
    // who can come BEFORE each vowel:
    // a←e,i,u; e←a,i; i←e,o; o←i; u←i,o
    let [a,e,i,o,u]=[1,1,1,1,1];
    for(let k=1;k<n;k++){
        [a,e,i,o,u]=[
            (e+i+u)%MOD,
            (a+i)%MOD,
            (e+o)%MOD,
            i,
            (i+o)%MOD
        ];
    }
    return (a+e+i+o+u)%MOD;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧮',
      color: 'blue',
      content: `**When to use matrix exponentiation:**\n- n-th term of a linear recurrence with n up to 10^18\n- Count paths of exactly length k in a graph (adjacency matrix ^ k)\n- Any DP where state transitions are fixed and independent of position\n\n**Template:** Write recurrence as T·v = v'. Compute T^n via repeated squaring. O(k³ log n).\n\n**Common recurrences:**\n- Fibonacci: T = [[1,1],[1,0]]\n- Tribonacci: T = [[1,1,1],[1,0,0],[0,1,0]]\n- String DP (e.g. vowel permutation): each character = one matrix multiply\n\n**Modular arithmetic:** Use BigInt or handle overflow carefully in JavaScript for large mod values.`,
    },
  ],
}
