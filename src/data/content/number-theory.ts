import type { Article } from '../articles'

export const numberTheoryArticle: Article = {
  slug: 'number-theory',
  title: 'Number Theory',
  emoji: '🔢',
  tagline: 'GCD, primes, modular arithmetic — the math behind the tricks.',
  description: 'Number theory underlies problems involving divisibility, primes, modular arithmetic, and counting. Master GCD/LCM, Euclidean algorithm, sieve, modular inverse, Euler\'s totient, and fast exponentiation. These patterns appear in ~15% of competitive programming problems.',
  gradient: 'from-indigo-500 to-blue-600',
  topicSlug: 'math',
  readTime: '20 min',
  sections: [
    {
      type: 'text',
      content: `Number theory problems have a distinct flavor: they involve divisibility properties, prime numbers, and modular arithmetic rather than data structures. The algorithms are short but the reasoning requires understanding the underlying math. This article covers the essential toolkit: GCD/LCM, prime sieve, factorization, modular inverse, and totient.`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'GCD, LCM, and Euclidean Algorithm',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'GCD and LCM — O(log min(a,b))',
      code: `// GCD: Euclidean algorithm
// gcd(a, b) = gcd(b, a % b) — reduces faster than subtraction
const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

// LCM: use gcd to avoid overflow
const lcm = (a, b) => (a / gcd(a, b)) * b;

// Extended Euclidean: finds x, y such that ax + by = gcd(a, b)
// Used for modular inverse when gcd = 1
function extGcd(a, b) {
    if (b === 0) return [a, 1, 0];
    const [g, x1, y1] = extGcd(b, a % b);
    return [g, y1, x1 - Math.floor(a/b) * y1];
}
// modular inverse of a mod m (when gcd(a,m) = 1):
// extGcd(a, m)[1] mod m

// GCD of array: reduce pairwise
const gcdArray = (arr) => arr.reduce((a, b) => gcd(a, b));

// Key properties:
// gcd(a, b) = gcd(b, a % b)
// gcd(a, 0) = a
// lcm(a, b) = a * b / gcd(a, b)
// gcd divides both a and b, and is the LARGEST such number`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Prime Sieve and Factorization',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Sieve of Eratosthenes + smallest prime factor',
      code: `// Sieve: O(n log log n)
function sieve(n) {
    const isPrime = new Uint8Array(n+1).fill(1);
    isPrime[0] = isPrime[1] = 0;
    for (let p = 2; p*p <= n; p++)
        if (isPrime[p])
            for (let m = p*p; m <= n; m += p) isPrime[m] = 0;
    return isPrime;
}

// Smallest Prime Factor sieve — enables O(log n) factorization
function spfSieve(n) {
    const spf = Array.from({length:n+1}, (_, i) => i);
    for (let p = 2; p*p <= n; p++)
        if (spf[p] === p) // p is prime
            for (let m = p*p; m <= n; m += p)
                if (spf[m] === m) spf[m] = p;
    return spf;
}

// Factorize using SPF: O(log n) per number
function factorize(n, spf) {
    const factors = [];
    while (n > 1) { factors.push(spf[n]); n = Math.floor(n / spf[n]); }
    return factors;
}

// Factorize single number: O(sqrt n)
function primeFactors(n) {
    const factors = [];
    for (let p = 2; p*p <= n; p++)
        while (n % p === 0) { factors.push(p); n = Math.floor(n/p); }
    if (n > 1) factors.push(n);
    return factors;
}`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Modular Arithmetic',
    },
    {
      type: 'callout',
      icon: '🔑',
      color: 'teal',
      content: `**Modular arithmetic rules:**\n- (a + b) % m = ((a % m) + (b % m)) % m\n- (a * b) % m = ((a % m) * (b % m)) % m\n- (a - b) % m = ((a % m) - (b % m) + m) % m  ← add m to prevent negative\n- Division: a/b mod m = a * (b^{-1}) mod m, where b^{-1} = modular inverse of b\n- Modular inverse exists iff gcd(b, m) = 1 (required for nCr mod prime)`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Modular inverse and fast power',
      code: `const MOD = 1_000_000_007n;

// Fast power mod: a^b mod m in O(log b)
function powMod(base, exp, mod) {
    base = BigInt(base) % mod;
    let result = 1n;
    exp = BigInt(exp);
    while (exp > 0n) {
        if (exp & 1n) result = result * base % mod;
        base = base * base % mod;
        exp >>= 1n;
    }
    return result;
}

// Modular inverse using Fermat's little theorem (mod must be prime):
// inv(a) = a^(mod-2) mod mod
const modInverse = (a) => powMod(a, MOD - 2n, MOD);

// Precompute factorials + inverse factorials for nCr mod p
const MAX = 200001;
const fact = new Array(MAX);
const inv_fact = new Array(MAX);
fact[0] = 1n;
for (let i=1;i<MAX;i++) fact[i] = fact[i-1] * BigInt(i) % MOD;
inv_fact[MAX-1] = powMod(fact[MAX-1], MOD-2n, MOD);
for (let i=MAX-2;i>=0;i--) inv_fact[i] = inv_fact[i+1] * BigInt(i+1) % MOD;

const nCr = (n, r) => {
    if (r < 0 || r > n) return 0n;
    return fact[n] * inv_fact[r] % MOD * inv_fact[n-r] % MOD;
};`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Euler\'s Totient Function',
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'blue',
      content: `**Euler's totient φ(n)** = count of integers in [1,n] coprime to n.\n\nφ(n) = n × Π(1 - 1/p) for each prime p dividing n.\n\n**Fermat's little theorem**: a^(p-1) ≡ 1 (mod p) for prime p and gcd(a,p)=1.\nImplication: a^(-1) ≡ a^(p-2) mod p — the modular inverse formula.\n\n**Euler's theorem**: a^φ(m) ≡ 1 (mod m) when gcd(a,m)=1.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: "Euler's totient — single and sieve",
      code: `// Totient of a single number: O(sqrt n)
function totient(n) {
    let result = n;
    for (let p = 2; p*p <= n; p++) {
        if (n % p === 0) {
            while (n % p === 0) n = Math.floor(n/p);
            result -= Math.floor(result / p); // result *= (1 - 1/p)
        }
    }
    if (n > 1) result -= Math.floor(result / n); // n is a prime factor
    return result;
}

// Totient sieve: compute φ(i) for all i in [1, n] — O(n log log n)
function totientSieve(n) {
    const phi = Array.from({length:n+1}, (_, i) => i);
    for (let p = 2; p <= n; p++) {
        if (phi[p] === p) { // p is prime
            for (let m = p; m <= n; m += p)
                phi[m] -= Math.floor(phi[m] / p);
        }
    }
    return phi;
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
      title: 'GCD of Array',
      url: 'https://leetcode.com/problems/find-greatest-common-divisor-of-array/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: GCD of min and max',
          explanation: `GCD of an entire array equals GCD of any subset that spans the range. Key insight: GCD of min and max is the answer — because if any element divides both the min and max, it divides all elements in between (not strictly true in general, but for this problem we want GCD of just min and max).`,
          code: `var findGCD = function(nums) {
    const min = Math.min(...nums), max = Math.max(...nums);
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    return gcd(min, max);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Number of Common Factors',
      url: 'https://leetcode.com/problems/number-of-common-factors/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Divisors of GCD(a, b)',
          explanation: `Common factors of a and b are exactly the divisors of gcd(a, b). Count divisors of gcd by trial division up to sqrt(gcd).`,
          code: `var commonFactors = function(a, b) {
    const gcd = (x, y) => y === 0 ? x : gcd(y, x % y);
    const g = gcd(a, b);
    let count = 0;
    for (let i = 1; i*i <= g; i++) {
        if (g % i === 0) {
            count++;
            if (i !== g/i) count++;
        }
    }
    return count;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Smallest Even Multiple',
      url: 'https://leetcode.com/problems/smallest-even-multiple/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: LCM(n, 2)',
          explanation: `LCM(n, 2) is either n (if n is even) or 2n (if n is odd). Equivalently: n % 2 === 0 ? n : 2*n.`,
          code: `var smallestEvenMultiple = function(n) {
    return n % 2 === 0 ? n : 2 * n;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Ugly Number (only prime factors 2, 3, 5)',
      url: 'https://leetcode.com/problems/ugly-number/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Divide out 2, 3, 5 — if result is 1, it\'s ugly',
          explanation: `Keep dividing n by 2, 3, 5 as long as divisible. If we end up with 1, no other prime factors exist.`,
          code: `var isUgly = function(n) {
    if (n <= 0) return false;
    for (const p of [2, 3, 5])
        while (n % p === 0) n = Math.floor(n / p);
    return n === 1;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Nth Digit',
      url: 'https://leetcode.com/problems/nth-digit/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Narrow down digit group, then extract',
          explanation: `1-digit: 1-9 (9 numbers × 1 digit = 9 digits). 2-digit: 10-99 (90 × 2 = 180 digits). k-digit: start=10^(k-1), count=9×start, digits=k×count. Find which group contains nth digit, then which number, then which digit within that number.`,
          code: `var findNthDigit = function(n) {
    let digits = 1, start = 1, count = 9;
    while (n > digits * count) {
        n -= digits * count;
        digits++;
        start *= 10;
        count *= 10;
    }
    // n-th digit is in a 'digits'-digit number
    const num = start + Math.floor((n - 1) / digits);
    const digitIndex = (n - 1) % digits;
    return Number(String(num)[digitIndex]);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 6,
      title: 'Factorial Trailing Zeroes',
      url: 'https://leetcode.com/problems/factorial-trailing-zeroes/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Count factors of 5 (there are always more 2s than 5s)',
          explanation: `Trailing zeros = factors of 10 = min(factors of 2, factors of 5) in n!. Factors of 2 always exceed factors of 5, so count only 5s. floor(n/5) multiples have at least one factor of 5, floor(n/25) have at least two, etc.`,
          code: `var trailingZeroes = function(n) {
    let count = 0;
    while (n >= 5) { n = Math.floor(n/5); count += n; }
    return count;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧠',
      color: 'indigo',
      content: `**Number theory pattern recognition:**\n- "Divisibility / common factors" → GCD (Euclidean)\n- "Count primes up to n" → Sieve of Eratosthenes O(n log log n)\n- "Factorize many numbers" → SPF sieve + O(log n) per query\n- "a/b mod prime" → modular inverse via Fermat: a × b^(p-2) mod p\n- "nCr mod prime" → precompute factorials + modular inverses\n- "Trailing zeros in n!" → count factors of 5: Σ floor(n/5^k)\n- "Digit problems" → group by digit length (1-digit, 2-digit, ...)\n- "Count integers coprime to n" → Euler's totient φ(n)`,
    },
  ],
}
