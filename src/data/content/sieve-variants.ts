import type { Article } from '../articles'

export const sieveVariantsArticle: Article = {
  slug: 'sieve-variants',
  title: 'Sieve Variants & Multiplicative Functions',
  emoji: '🧮',
  tagline: 'Linear sieve, Euler\'s totient sieve, Möbius function. Each number factored once.',
  description: 'Beyond the basic Sieve of Eratosthenes: (1) Linear sieve factors each composite exactly once using smallest prime factors — O(n) and gives smallest prime factors for fast factorization. (2) Multiplicative function sieves compute Euler\'s totient φ(n), Möbius function μ(n), and divisor counts simultaneously. (3) Segmented sieve for ranges [L,R] with large L. Essential for number theory in competitive programming.',
  gradient: 'from-teal-700 to-cyan-800',
  topicSlug: 'math',
  readTime: '15 min',
  sections: [
    {
      type: 'text',
      content: `The linear sieve (smallest prime factor sieve) stores spf[n] = smallest prime factor of n. To factor any n: repeatedly divide by spf[n] until 1. O(log n) factorization after O(n) preprocessing. Euler's totient: φ(p) = p-1, φ(p^k) = p^(k-1)(p-1), φ(mn) = φ(m)φ(n) if gcd(m,n)=1. Möbius: μ(n) = 0 if p² | n, else (-1)^(number of prime factors).`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Linear sieve with multiplicative functions',
      code: `// Linear sieve: O(n), computes spf[], primes[], phi[], mu[]
function linearSieve(n) {
    const spf = new Array(n + 1).fill(0); // smallest prime factor
    const primes = [];
    const phi = new Array(n + 1).fill(0); // Euler's totient
    const mu = new Array(n + 1).fill(0);  // Möbius function
    phi[1] = 1; mu[1] = 1;

    for (let i = 2; i <= n; i++) {
        if (!spf[i]) { // i is prime
            spf[i] = i;
            primes.push(i);
            phi[i] = i - 1;
            mu[i] = -1;
        }
        for (const p of primes) {
            if (p > spf[i] || i * p > n) break;
            spf[i * p] = p;
            if (i % p === 0) {
                phi[i * p] = phi[i] * p; // p | i, so p^2 | ip
                mu[i * p] = 0;           // p^2 divides i*p
            } else {
                phi[i * p] = phi[i] * (p - 1); // gcd(i,p)=1
                mu[i * p] = -mu[i];
            }
        }
    }
    return { spf, primes, phi, mu };
}

// Factorize n using spf in O(log n)
function factorize(n, spf) {
    const factors = {};
    while (n > 1) {
        const p = spf[n];
        factors[p] = (factors[p] || 0) + 1;
        n /= p;
    }
    return factors;
}

// Segmented sieve for primes in [L, R]
function segmentedSieve(L, R) {
    const limit = Math.ceil(Math.sqrt(R));
    const smallPrimes = linearSieve(limit).primes;
    const sieve = new Array(R - L + 1).fill(true);
    if (L === 1) sieve[0] = false; // 1 is not prime
    for (const p of smallPrimes) {
        let start = Math.ceil(L / p) * p;
        if (start === p) start += p; // don't mark p itself
        for (let i = start; i <= R; i += p) sieve[i - L] = false;
    }
    return sieve.map((isPrime, i) => isPrime ? L + i : 0).filter(Boolean);
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
      title: 'Count Primes',
      url: 'https://leetcode.com/problems/count-primes/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Sieve of Eratosthenes',
          explanation: `Classic sieve: mark composites starting from p². For each unmarked p ≥ 2, mark p², p*3, p*4... as composite. Count unmarked numbers.`,
          code: `var countPrimes = function(n) {
    const sieve=new Uint8Array(n).fill(1);
    sieve[0]=sieve[1]=0;
    for(let p=2;p*p<n;p++) if(sieve[p]) for(let i=p*p;i<n;i+=p) sieve[i]=0;
    return sieve.reduce((s,v)=>s+v,0);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Smallest Value After Replacing With Sum of Prime Factors',
      url: 'https://leetcode.com/problems/smallest-value-after-replacing-with-sum-of-prime-factors/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Factorize, sum factors, repeat until stable',
          explanation: `Repeatedly replace n with sum of its prime factors (with repetition) until value stops changing. Use trial division for factorization.`,
          code: `var smallestValue = function(n) {
    const primeSum=(x)=>{
        let s=0;
        for(let p=2;p*p<=x;p++) while(x%p===0){s+=p;x/=p;}
        return s+(x>1?x:0);
    };
    while(true){const next=primeSum(n);if(next===n) return n;n=next;}
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Sum of All Subset XOR Totals',
      url: 'https://leetcode.com/problems/sum-of-all-subset-xor-totals/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Each bit contributes independently',
          explanation: `For each bit position, count subsets where XOR is 1 at that bit. If any element has bit b set: exactly 2^(n-1) subsets have XOR=1 at bit b. Total = OR of all elements × 2^(n-1).`,
          code: `var subsetXORSum = function(nums) {
    const orAll=nums.reduce((a,b)=>a|b,0);
    return orAll*(1<<(nums.length-1));
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Almost Prime',
      url: 'https://leetcode.com/problems/almost-prime/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Count numbers with exactly k prime factors (with multiplicity)',
          explanation: `For each number, count its prime factors with multiplicity using SPF sieve. O(n log log n) factorization.`,
          code: `// Count integers in [1,n] with exactly k prime factors (Omega function = k)
// Use linear sieve + SPF for fast factorization
// primeFactorCount[i] = total prime factors with multiplicity
function countAlmostPrime(n, k) {
    const spf=new Array(n+1).fill(0);
    for(let i=2;i<=n;i++) if(!spf[i]) for(let j=i;j<=n;j+=i) if(!spf[j]) spf[j]=i;
    let count=0;
    for(let i=2;i<=n;i++){
        let x=i, omega=0;
        while(x>1){omega++;x/=spf[x];}
        if(omega===k) count++;
    }
    return count;
}`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧮',
      color: 'teal',
      content: `**Linear sieve advantages over Eratosthenes:**\n- Exactly O(n) operations (vs O(n log log n))\n- Computes SPF for O(log n) factorization\n- Easily extended to compute φ(n), μ(n), Ω(n), σ(n) simultaneously\n\n**Multiplicative function sieve pattern:** If f is multiplicative (f(mn)=f(m)f(n) when gcd(m,n)=1), compute during the linear sieve:\n- f(p) = f at prime (base case)\n- f(p^k) = formula for prime powers\n- f(i*p) = f(i) * f(p) if gcd(i,p)=1, else special prime power formula\n\n**Möbius function use:** Möbius inversion converts sum over divisors to sum over multiples. Core for "counting integers coprime to n" and inclusion-exclusion on divisors.`,
    },
  ],
}
