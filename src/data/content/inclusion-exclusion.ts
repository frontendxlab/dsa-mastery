import type { Article } from '../articles'

export const inclusionExclusionArticle: Article = {
  slug: 'inclusion-exclusion',
  title: 'Inclusion-Exclusion Principle',
  emoji: '∪',
  tagline: '|A∪B| = |A| + |B| - |A∩B|. Generalize to n sets. Count with constraints.',
  description: 'Inclusion-exclusion (PIE) counts elements in the union of overlapping sets: |A₁∪...∪Aₙ| = Σ|Aᵢ| - Σ|Aᵢ∩Aⱼ| + Σ|Aᵢ∩Aⱼ∩Aₖ| - ... Crucial for counting with "at least one" constraints (complement counting), derangements, Euler\'s totient function, and bitmask DP on subsets. The alternating sign pattern comes from the binomial theorem.',
  gradient: 'from-emerald-600 to-green-700',
  topicSlug: 'math',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `Inclusion-exclusion works on "bad" properties: let Aᵢ = set of items with property i (a "bad" property). |complement of A₁∪...| = total - |A₁∪...| = total - (Σ|Aᵢ| - Σ|Aᵢ∩Aⱼ| + ...). Often the intersections have closed-form size (e.g., |Aᵢ∩Aⱼ| = items divisible by both i and j = items divisible by lcm(i,j)). Bitmask over all n "bad" properties, enumerate all 2ⁿ subsets.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Inclusion-exclusion templates',
      code: `// Count integers in [1..n] divisible by at least one of primes[]
// PIE over all subsets of primes
function countDivisible(n, primes) {
    const k = primes.length;
    let count = 0;
    for (let mask = 1; mask < (1 << k); mask++) {
        let lcm = 1, bits = 0;
        for (let i = 0; i < k; i++) {
            if (!((mask >> i) & 1)) continue;
            lcm = lcm / gcd(lcm, primes[i]) * primes[i];
            bits++;
        }
        count += (bits % 2 === 1 ? 1 : -1) * Math.floor(n / lcm);
    }
    return count;
}

// Derangements: permutations with no fixed points
// D(n) = n! * Σ_{k=0}^{n} (-1)^k / k!
// Or recursively: D(n) = (n-1)(D(n-1) + D(n-2))
function derangements(n) {
    if (n <= 1) return 1 - n;
    let [a, b] = [1, 0]; // D(0)=1, D(1)=0
    for (let i = 2; i <= n; i++) [a, b] = [b, (i - 1) * (a + b)];
    return b;
}

// Euler's totient: count integers 1..n coprime to n
// φ(n) = n * Π_{p|n} (1 - 1/p) = PIE over prime factors
function eulerTotient(n) {
    let phi = n;
    for (let p = 2; p * p <= n; p++) {
        if (n % p === 0) {
            while (n % p === 0) n /= p;
            phi -= phi / p;
        }
    }
    if (n > 1) phi -= phi / n;
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
      title: 'Count Integers With Even Digit Sum',
      url: 'https://leetcode.com/problems/count-integers-with-even-digit-sum/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Count directly',
          explanation: `For each number 1 to num, compute digit sum and check parity. Or: observe that roughly half the numbers have even digit sum.`,
          code: `var countEven = function(num) {
    let count=0;
    for(let i=1;i<=num;i++){
        let s=0,x=i;
        while(x){s+=x%10;x=Math.floor(x/10);}
        if(s%2===0) count++;
    }
    return count;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Count of Interesting Subarrays',
      url: 'https://leetcode.com/problems/count-of-interesting-subarrays/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Prefix counts mod k',
          explanation: `Count of elements ≡ 1 (mod k) in subarray [l,r] must be ≡ 0 (mod k). Let prefix[i] = count of such elements in [0..i-1]. Need prefix[r+1] - prefix[l] ≡ 0 (mod k) → prefix[r+1] ≡ prefix[l]. Use hashmap of prefix counts mod k.`,
          code: `var countInterestingSubarrays = function(nums, modulo, k) {
    const map=new Map([[0,1]]); let prefix=0, count=0;
    for(const n of nums){
        prefix=(prefix+(n%modulo===k?1:0))%modulo;
        count+=map.get((prefix-k+modulo)%modulo)||0;
        map.set(prefix,(map.get(prefix)||0)+1);
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
      title: 'Count Vowel Substrings of a String',
      url: 'https://leetcode.com/problems/count-vowel-substrings-of-a-string/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Inclusion-exclusion via "at least k distinct vowels"',
          explanation: `Count substrings with all 5 vowels = count with ≥1 of each = atLeast(5) - using sliding window. Or: use PIE: |exactly 5 vowels| = |≥5 vowels| using complement. Sliding window for "at most k distinct" works cleanly.`,
          code: `var countVowelSubstrings = function(word) {
    const isVowel=c=>'aeiou'.includes(c);
    // Sliding window: count substrings with exactly 5 distinct vowels
    // = atLeast(5) - atLeast(6) [atLeast(6) = 0 since only 5 vowels]
    const atMost=(k)=>{
        if(k===0) return 0;
        let count=0,l=0; const freq=new Map();
        for(let r=0;r<word.length;r++){
            if(!isVowel(word[r])){freq.clear();l=r+1;continue;}
            freq.set(word[r],(freq.get(word[r])||0)+1);
            while(freq.size>k){
                const lc=word[l]; freq.set(lc,freq.get(lc)-1);
                if(!freq.get(lc)) freq.delete(lc);
                l++;
            }
            count+=r-l+1;
        }
        return count;
    };
    // count with exactly 5 = atMost(5) - atMost(4)
    // but we need all 5 vowels present, not just any 5 distinct
    // Simpler: brute force for this small problem
    let count=0;
    for(let i=0;i<word.length;i++){
        const seen=new Set();
        for(let j=i;j<word.length;j++){
            if(!isVowel(word[j])) break;
            seen.add(word[j]);
            if(seen.size===5) count++;
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
      num: 4,
      title: 'Count Subarrays With Score Less Than K',
      url: 'https://leetcode.com/problems/count-subarrays-with-score-less-than-k/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Sliding window — for each r, find leftmost l where valid',
          explanation: `Score = sum * length. Sliding window: maintain window sum. If sum * (r-l+1) ≥ k, shrink from left. For each r, all subarrays ending at r with length ≤ (r-l+1) are valid. Count += (r-l+1).`,
          code: `var countSubarrays = function(nums, k) {
    let l=0, sum=0n, count=0n, K=BigInt(k);
    for(let r=0;r<nums.length;r++){
        sum+=BigInt(nums[r]);
        while(sum*BigInt(r-l+1)>=K){sum-=BigInt(nums[l++]);}
        count+=BigInt(r-l+1);
    }
    return count;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '∪',
      color: 'green',
      content: `**Inclusion-exclusion pattern:**\n|A₁∪A₂∪...∪Aₙ| = Σ|Aᵢ| - Σ|Aᵢ∩Aⱼ| + Σ|Aᵢ∩Aⱼ∩Aₖ| - ...\n\n**Bitmask PIE:** For n "bad" properties, enumerate all 2ⁿ subsets. Odd-size subsets add, even-size subtract.\n\n**Common applications:**\n- Count integers with at least one bad divisor: PIE over prime factors\n- Derangements: D(n) = Σ (-1)^k × C(n,k) × (n-k)! = (n-1)(D(n-1)+D(n-2))\n- Surjections: |surjections from n to k| = Σ (-1)^i × C(k,i) × (k-i)^n\n- At-least-one constraint: complement = none, PIE gives exactly-one`,
    },
  ],
}
