import type { Article } from '../articles'

export const lucasTheoremArticle: Article = {
  slug: 'lucas-theorem',
  title: 'Lucas Theorem & Combinatorics Mod p',
  emoji: '📊',
  tagline: 'C(n,k) mod prime p in O(log_p n). Pascal mod p has fractal structure.',
  description: 'Lucas theorem computes C(n,k) mod prime p in O(log_p n) by decomposing n and k in base p. Combined with precomputed factorials mod p, this solves: C(n,k) mod prime for huge n,k; counting lattice paths with prime modulus; and binomial sums. For prime powers (not just primes), use Andrew Granville\'s generalization or Lucas-Granville. Essential for counting problems in competitive programming.',
  gradient: 'from-indigo-900 to-violet-950',
  topicSlug: 'math',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `Lucas theorem: C(n,k) mod p = Π C(nᵢ, kᵢ) mod p, where nᵢ, kᵢ are digits of n, k in base p. If any kᵢ > nᵢ, result is 0. Precompute factorials and inverse factorials up to p using Fermat's little theorem (a^(p-2) ≡ a^(-1) mod p). For large n (up to 10^18) and prime p (up to 10^6): Lucas gives O(p + log_p(n)) complexity.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Lucas theorem + modular combinations',
      code: `// Modular arithmetic setup
function modCombinatorics(MOD) { // MOD must be prime
    const fact = new Array(MOD).fill(1n);
    const inv = new Array(MOD).fill(1n);
    const M = BigInt(MOD);
    for (let i = 1; i < MOD; i++) fact[i] = fact[i-1] * BigInt(i) % M;
    // Fermat's little theorem: a^(-1) ≡ a^(p-2) mod p
    const pow = (b, e, m) => { let r = 1n; b %= m; while (e > 0n) { if (e & 1n) r = r*b%m; b = b*b%m; e >>= 1n; } return r; };
    inv[MOD - 1] = pow(fact[MOD - 1], M - 2n, M);
    for (let i = MOD - 2; i >= 1; i--) inv[i] = inv[i + 1] * BigInt(i + 1) % M;

    const C = (n, k) => {
        if (k < 0 || k > n) return 0n;
        return fact[n] * inv[k] % M * inv[n - k] % M;
    };

    // Lucas theorem: C(n, k) mod p for large n, k
    const lucas = (n, k) => {
        if (k === 0n) return 1n;
        const [ni, ki] = [n % M, k % M];
        return C(Number(ni), Number(ki)) * lucas(n / M, k / M) % M;
    };

    return { C, lucas, fact, inv };
}

// Example: C(10^18, 10^9) mod 1000000007
// const { lucas } = modCombinatorics(1e9 + 7);
// lucas(BigInt(1e18), BigInt(1e9))

// Wilson's theorem: (p-1)! ≡ -1 (mod p) for prime p
// Fermat's little theorem: a^p ≡ a (mod p) for prime p
// a^(p-1) ≡ 1 (mod p) for a not divisible by p`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Pascal\'s Triangle',
      url: 'https://leetcode.com/problems/pascals-triangle/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Direct construction',
          explanation: `Each row: first and last are 1, middle elements = sum of two above. Build iteratively.`,
          code: `var generate = function(numRows) {
    const res=[[1]];
    for(let i=1;i<numRows;i++){
        const prev=res[i-1];
        const row=[1,...Array.from({length:i-1},(_,j)=>prev[j]+prev[j+1]),1];
        res.push(row);
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Count Anagram Substrings',
      url: 'https://leetcode.com/problems/count-anagrams/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Factorial division with mod inverse',
          explanation: `For each word of length L with char frequencies f₁, f₂, ...: anagram count = L! / (f₁! × f₂! × ...) mod p. Use Fermat's little theorem to compute modular inverse of each factorial.`,
          code: `var countAnagrams = function(s) {
    const MOD=BigInt(1e9+7);
    const n=200001;
    const fact=new Array(n).fill(1n);
    for(let i=1;i<n;i++) fact[i]=fact[i-1]*BigInt(i)%MOD;
    const pow=(b,e)=>{let r=1n;b%=MOD;while(e){if(e&1n)r=r*b%MOD;b=b*b%MOD;e>>=1n;}return r;};
    const inv=(x)=>pow(x,MOD-2n);
    let ans=1n;
    for(const word of s.split(' ')){
        const freq=new Map();
        for(const c of word) freq.set(c,(freq.get(c)||0)+1);
        let ways=fact[word.length];
        for(const cnt of freq.values()) ways=ways*inv(fact[cnt])%MOD;
        ans=ans*ways%MOD;
    }
    return Number(ans);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Unique Paths',
      url: 'https://leetcode.com/problems/unique-paths/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: C(m+n-2, m-1) — choose when to go right',
          explanation: `Total steps = m+n-2. Must choose m-1 of them to go right. Answer = C(m+n-2, m-1). Compute with modular inverse if modulo needed.`,
          code: `var uniquePaths = function(m, n) {
    // C(m+n-2, m-1) = (m+n-2)! / ((m-1)! * (n-1)!)
    // Direct computation for small m,n:
    let res=1;
    for(let i=0;i<Math.min(m-1,n-1);i++){
        res=res*(m+n-2-i)/(i+1);
    }
    return Math.round(res);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Number of Dice Rolls With Target Sum',
      url: 'https://leetcode.com/problems/number-of-dice-rolls-with-target-sum/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DP with sliding window optimization',
          explanation: `dp[i][j] = ways to get sum j using i dice. dp[i][j] = Σ dp[i-1][j-k] for k = 1..f. Use prefix sums to compute this sliding window sum in O(n) per row.`,
          code: `var numRollsToTarget = function(n, k, target) {
    const MOD=1e9+7;
    let dp=new Array(target+1).fill(0); dp[0]=1;
    for(let i=0;i<n;i++){
        const ndp=new Array(target+1).fill(0);
        const pre=new Array(target+2).fill(0);
        for(let j=0;j<=target;j++) pre[j+1]=(pre[j]+dp[j])%MOD;
        for(let j=1;j<=target;j++){
            const lo=Math.max(0,j-k), hi=j-1;
            ndp[j]=(pre[hi+1]-pre[lo]+MOD)%MOD;
        }
        dp=ndp;
    }
    return dp[target];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '📊',
      color: 'blue',
      content: `**Lucas theorem formula:**\nC(n, k) ≡ Π C(nᵢ, kᵢ) (mod p), where n = Σ nᵢpⁱ, k = Σ kᵢpⁱ in base p.\n\n**Applications:**\n- C(n, k) mod prime for n,k up to 10^18\n- Counting lattice paths modulo prime\n- Binomial coefficient parity (p=2 version is just digit-AND check)\n\n**Kummer's theorem:** The highest power of prime p dividing C(n,k) = number of carries when adding k and n-k in base p.\n\n**Vandermonde's identity:** C(m+n, r) = Σ C(m,i)×C(n,r-i). Useful for proving counting identities.\n\n**Fermat's little theorem:** a^(p-1) ≡ 1 mod p → modular inverse of a = a^(p-2) mod p.`,
    },
  ],
}
