import type { Article } from '../articles'

export const chineseRemainderArticle: Article = {
  slug: 'chinese-remainder',
  title: 'Chinese Remainder Theorem',
  emoji: '🔢',
  tagline: 'Solve x ≡ a1 (mod m1), x ≡ a2 (mod m2), ... in one shot. Extended Euclidean key.',
  description: 'Chinese Remainder Theorem (CRT) finds x such that x ≡ aᵢ (mod mᵢ) for all i, when mᵢ are pairwise coprime. Extended to non-coprime moduli using extended Euclidean algorithm. Applications: combining multiple modular constraints, computing large numbers modulo several primes, calendar problems, and number theory competition problems.',
  gradient: 'from-indigo-700 to-blue-800',
  topicSlug: 'math',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `CRT states: if m₁, m₂, ..., mₖ are pairwise coprime, then for any a₁, a₂, ..., aₖ there exists a unique x (mod M = m₁m₂...mₖ) satisfying all congruences. Construction: x = Σ aᵢ · Mᵢ · (Mᵢ⁻¹ mod mᵢ), where Mᵢ = M/mᵢ. For non-coprime moduli, use the "combine two at a time" method with extended Euclidean.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Extended Euclidean, modular inverse, and CRT',
      code: `// Extended Euclidean: returns [g, x, y] where ax + by = g = gcd(a, b)
function extGcd(a, b) {
    if (!b) return [a, 1, 0];
    const [g, x, y] = extGcd(b, a % b);
    return [g, y, x - Math.floor(a / b) * y];
}

// Modular inverse of a mod m (requires gcd(a,m) = 1)
function modInv(a, m) {
    const [g, x] = extGcd(a % m, m);
    if (g !== 1) return -1; // no inverse
    return ((x % m) + m) % m;
}

// CRT for coprime moduli: solve x ≡ a (mod m) and x ≡ b (mod n)
function crtCoprime(a, m, b, n) {
    // x = a + m * (b - a) * modInv(m, n) mod (m*n)
    const t = ((BigInt(b) - BigInt(a)) % BigInt(n) + BigInt(n)) % BigInt(n);
    const inv = BigInt(modInv(Number(BigInt(m) % BigInt(n)), Number(n)));
    const x = BigInt(a) + BigInt(m) * (t * inv % BigInt(n));
    return [Number(x % (BigInt(m) * BigInt(n))), m * n];
}

// General CRT (handles non-coprime moduli)
// Returns [x, lcm] or [-1, -1] if no solution
function crtGeneral(a, m, b, n) {
    // x ≡ a (mod m), x ≡ b (mod n)
    const [g, p] = extGcd(m, n);
    if ((b - a) % g !== 0) return [-1, -1]; // no solution
    const lcm = m / g * n;
    const x = ((a + m * ((b - a) / g * p % (n / g))) % lcm + lcm) % lcm;
    return [x, lcm];
}

// Solve system of congruences: x ≡ rems[i] (mod mods[i])
function solveCRT(rems, mods) {
    let [r, m] = [rems[0], mods[0]];
    for (let i = 1; i < rems.length; i++) {
        [r, m] = crtGeneral(r, m, rems[i], mods[i]);
        if (r === -1) return -1; // no solution
    }
    return r;
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
      title: 'X of a Kind in a Deck of Cards',
      url: 'https://leetcode.com/problems/x-of-a-kind-in-a-deck-of-cards/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: GCD of all group counts',
          explanation: `Count occurrences of each card value. The deck can be divided into groups of size x iff x divides all counts. The maximum such x = GCD of all counts. Answer: GCD ≥ 2.`,
          code: `var hasGroupsSizeX = function(deck) {
    const cnt=new Map();
    for(const c of deck) cnt.set(c,(cnt.get(c)||0)+1);
    const gcd=(a,b)=>b?gcd(b,a%b):a;
    const g=[...cnt.values()].reduce(gcd);
    return g>=2;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Find the Closest Number to Zero',
      url: 'https://leetcode.com/problems/find-the-closest-number-to-zero/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: One-pass min absolute value',
          explanation: `Track number closest to zero. Ties: prefer positive (larger). Scan all numbers.`,
          code: `var findClosestNumber = function(nums) {
    let res=nums[0];
    for(const n of nums){
        if(Math.abs(n)<Math.abs(res)||(Math.abs(n)===Math.abs(res)&&n>res)) res=n;
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Count Good Numbers',
      url: 'https://leetcode.com/problems/count-good-numbers/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Fast modular exponentiation',
          explanation: `Even positions (0-indexed) can be 0-9 (5 choices). Odd positions can be 2,3,5,7 (4 primes). Count = 5^ceil(n/2) × 4^floor(n/2). Use fast power mod 10^9+7.`,
          code: `var countGoodNumbers = function(n) {
    const MOD=1e9+7;
    const pow=(base,exp,mod)=>{
        let res=1n; base=BigInt(base); exp=BigInt(exp); mod=BigInt(mod);
        while(exp>0n){if(exp&1n) res=res*base%mod; base=base*base%mod; exp>>=1n;}
        return Number(res);
    };
    const even=Math.ceil(n/2), odd=Math.floor(n/2);
    return pow(5,even,MOD)*pow(4,odd,MOD)%MOD;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Minimum Operations to Make Array Equal II',
      url: 'https://leetcode.com/problems/minimum-operations-to-make-array-equal-ii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: GCD divides all differences',
          explanation: `Each step: arr[i] ± k. Need to make nums1[i] = nums2[i]. Difference d[i] = nums2[i] - nums1[i]. Must have sum(d) = 0 (else impossible). Each operation contributes +k to one and -k to another. Need g = gcd(all |d[i]|) divisible by k. Answer = sum(positive d[i]) / k.`,
          code: `var minOperations = function(nums1, nums2, k) {
    if(k===0) return nums1.every((v,i)=>v===nums2[i])?0:-1;
    const gcd=(a,b)=>b?gcd(b,a%b):a;
    let pos=0,neg=0;
    for(let i=0;i<nums1.length;i++){
        const d=nums2[i]-nums1[i];
        if(d%k!==0) return -1;
        d>0?pos+=d:neg-=d;
    }
    return pos===neg?pos/k:-1;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🔢',
      color: 'blue',
      content: `**CRT use cases:**\n- Multiple modular constraints: find x satisfying all at once\n- Large number reconstruction from remainders (secret sharing)\n- Counting problems where answer must be computed mod several primes for verification\n\n**Extended Euclidean:** Computes gcd(a,b) and coefficients x,y with ax+by=gcd. The modular inverse of a mod m is x from extGcd(a,m) when gcd=1.\n\n**General CRT (non-coprime mods):** Combine two constraints at a time using extGcd. If (b-a) % gcd(m,n) ≠ 0, no solution exists.\n\n**Fast modular exponentiation:** Always use BigInt in JavaScript for large exponents to avoid precision issues.`,
    },
  ],
}
