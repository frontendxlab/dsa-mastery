import type { Article } from '../articles'

export const mathArticle: Article = {
  slug: 'math',
  title: 'Math & Number Theory',
  emoji: '🔢',
  tagline: 'GCD, primes, modular arithmetic — the engine behind CP.',
  description: 'Number theory is the foundation of competitive programming. Sieve of Eratosthenes, GCD/LCM, modular arithmetic, fast exponentiation, and combinatorics — these tools turn impossible problems into one-liners.',
  gradient: 'from-blue-400 to-indigo-500',
  topicSlug: 'math',
  readTime: '20 min',
  sections: [
    {
      type: 'text',
      content: `Math problems in competitive programming are about recognizing which mathematical structure underlies the problem, then applying the right algorithm. The same 10-15 techniques appear over and over. Once you internalize GCD/LCM, the Sieve, modular arithmetic, and fast exponentiation, the vast majority of math problems become mechanical.`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Essential Algorithms',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'GCD (Euclidean) and LCM',
      code: `// GCD: gcd(a, b) = gcd(b, a % b), base case gcd(a, 0) = a
function gcd(a, b) {
    while (b) [a, b] = [b, a % b];
    return a;
}

// LCM: lcm(a, b) = a * b / gcd(a, b)
// Divide BEFORE multiplying to avoid overflow
function lcm(a, b) {
    return (a / gcd(a, b)) * b;
}

// GCD of array: reduce with gcd
const gcdArray = (arr) => arr.reduce(gcd);`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Sieve of Eratosthenes — find all primes ≤ n in O(n log log n)',
      code: `function sieve(n) {
    const isPrime = new Array(n + 1).fill(true);
    isPrime[0] = isPrime[1] = false;
    for (let i = 2; i * i <= n; i++) {
        if (isPrime[i]) {
            for (let j = i * i; j <= n; j += i)
                isPrime[j] = false;
        }
    }
    return isPrime;
}
// isPrime[x] = true iff x is prime
// All primes: Array.from({length: n+1}, (_, i) => i).filter(i => isPrime[i])`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Fast exponentiation — a^b mod m in O(log b)',
      code: `function powMod(base, exp, mod) {
    let result = 1n;
    base = BigInt(base) % BigInt(mod);
    exp = BigInt(exp);
    mod = BigInt(mod);
    while (exp > 0n) {
        if (exp % 2n === 1n) result = result * base % mod;
        exp >>= 1n;
        base = base * base % mod;
    }
    return Number(result);
}
// Standard trick: if exp is odd, multiply result by base
// Then square base and halve exp each iteration`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Modular inverse (Fermat\'s little theorem — mod must be prime)',
      code: `// a^(-1) mod p = a^(p-2) mod p  (only works when p is prime)
function modInverse(a, p) {
    return powMod(a, p - 2, p);
}

// Usage: a/b mod p = a * modInverse(b, p) mod p
// Never do (a / b) % p directly — division doesn't distribute over mod`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'nCr mod p — precompute factorials',
      code: `const MOD = 1_000_000_007n;
const MAX = 200001;
const fact = new Array(MAX).fill(0n);
const inv_fact = new Array(MAX).fill(0n);

function precompute() {
    fact[0] = 1n;
    for (let i = 1; i < MAX; i++) fact[i] = fact[i-1] * BigInt(i) % MOD;
    inv_fact[MAX-1] = powModBig(fact[MAX-1], MOD - 2n, MOD);
    for (let i = MAX - 2; i >= 0; i--) inv_fact[i] = inv_fact[i+1] * BigInt(i+1) % MOD;
}

function nCr(n, r) {
    if (r < 0 || r > n) return 0n;
    return fact[n] * inv_fact[r] % MOD * inv_fact[n-r] % MOD;
}`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Pattern Recognition Table',
    },
    {
      type: 'table',
      headers: ['See This', 'Algorithm'],
      rows: [
        ['"divisible by / GCD of"', 'Euclidean GCD'],
        ['"count primes up to n"', 'Sieve of Eratosthenes'],
        ['"a^b mod p" or large exponents', 'Fast exponentiation'],
        ['"number of ways" with large n', 'nCr mod p with precomputed factorials'],
        ['"sum of divisors / number of divisors"', 'Factorize using sqrt, use formula'],
        ['Fibonacci n-th term for large n', 'Matrix exponentiation or Binet\'s formula'],
        ['Linear recurrence for large n', 'Matrix exponentiation in O(k³ log n)'],
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
      title: 'Count Primes',
      url: 'https://leetcode.com/problems/count-primes/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Sieve of Eratosthenes',
          explanation: `Mark all composites starting from 2². For each prime p, mark p², p²+p, p²+2p... as composite. Count remaining unmarked positions. Key: only need to sieve up to √n because any composite has a prime factor ≤ √n.`,
          code: `var countPrimes = function(n) {
    if (n < 2) return 0;
    const notPrime = new Array(n).fill(false);
    notPrime[0] = notPrime[1] = true;
    for (let i = 2; i * i < n; i++) {
        if (!notPrime[i]) {
            for (let j = i * i; j < n; j += i)
                notPrime[j] = true;
        }
    }
    return notPrime.filter(x => !x).length;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Ugly Number II (find nth number whose only prime factors are 2, 3, 5)',
      url: 'https://leetcode.com/problems/ugly-number-ii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Three-pointer DP — generate ugly numbers in order',
          explanation: `Every ugly number is previous ugly × 2, × 3, or × 5. Maintain three pointers i2, i3, i5 each tracking which ugly number to multiply next. Always take the minimum of (ugly[i2]×2, ugly[i3]×3, ugly[i5]×5) as the next ugly. Advance all pointers that produced the minimum (to handle duplicates like 6 = 2×3 = 3×2).`,
          code: `var nthUglyNumber = function(n) {
    const ugly = [1];
    let i2 = 0, i3 = 0, i5 = 0;
    for (let i = 1; i < n; i++) {
        const next = Math.min(ugly[i2]*2, ugly[i3]*3, ugly[i5]*5);
        ugly.push(next);
        if (next === ugly[i2]*2) i2++;
        if (next === ugly[i3]*3) i3++;
        if (next === ugly[i5]*5) i5++;
    }
    return ugly[n-1];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Super Pow (a^b mod 1337, b is given as array)',
      url: 'https://leetcode.com/problems/super-pow/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Fast exponentiation + Euler\'s theorem',
          explanation: `Process b digit by digit. Key property: a^(10k+d) = (a^k)^10 × a^d. Use fast power mod at each step. The modulus 1337 = 7 × 191.`,
          code: `var superPow = function(a, b) {
    const MOD = 1337;
    const powMod = (base, exp) => {
        base %= MOD; let result = 1;
        while (exp > 0) {
            if (exp & 1) result = result * base % MOD;
            base = base * base % MOD;
            exp >>= 1;
        }
        return result;
    };
    let result = 1;
    for (const digit of b) {
        result = powMod(result, 10) * powMod(a, digit) % MOD;
    }
    return result;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Minimum Moves to Equal Array Elements II',
      url: 'https://leetcode.com/problems/minimum-moves-to-equal-array-elements-ii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Median minimizes sum of absolute deviations',
          explanation: `We want to minimize Σ|nums[i] - target|. This is the L1 norm — minimized at the median (not the mean). Sort, pick median, sum absolute differences.`,
          code: `var minMoves2 = function(nums) {
    nums.sort((a, b) => a - b);
    const median = nums[nums.length >> 1];
    return nums.reduce((sum, n) => sum + Math.abs(n - median), 0);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'blue',
      content: `**Modular arithmetic rule of thumb**: Whenever a problem involves factorials, combinations, or counting paths mod 10^9+7 (a prime), you need:\n1. Precomputed factorials up to MAX\n2. Precomputed modular inverses of factorials\n3. nCr(n, r) = fact[n] * inv_fact[r] * inv_fact[n-r] mod p`,
    },
  ],
}
