import type { Article } from '../articles'

export const burnsideLemmaArticle: Article = {
  slug: 'burnside-lemma',
  title: "Burnside's Lemma",
  emoji: '🔄',
  tagline: 'Count distinct objects under symmetry. Average fixed points over group actions.',
  description: "Burnside's lemma (or Cauchy-Frobenius): the number of distinct objects under a group G of symmetries = (1/|G|) × Σ_{g∈G} |Fix(g)|, where Fix(g) = set of objects fixed by symmetry g. Used for counting necklaces, bracelets, colored cubes, and any problem asking for \"distinct up to rotation/reflection.\" Pólya enumeration extends this to count by type.",
  gradient: 'from-violet-700 to-indigo-800',
  topicSlug: 'math',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `Burnside's lemma: distinct colorings = (1/|G|) × Σ(fixed points under each symmetry). For a necklace with n beads and k colors: the rotation group has n elements. Rotation by i positions fixes a coloring iff the coloring has period gcd(i,n). Fixed colorings under rotation-by-i = k^gcd(i,n). Sum over i=0..n-1 and divide by n.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: "Burnside's lemma for necklace counting",
      code: `// Count distinct necklaces with n beads and k colors (rotations only)
function countNecklaces(n, k) {
    const gcd = (a, b) => b ? gcd(b, a % b) : a;
    let total = 0;
    for (let i = 0; i < n; i++) {
        // Rotation by i: fixed colorings = k^gcd(i,n)
        total += Math.pow(k, gcd(i, n));
    }
    return total / n;
}

// Count distinct bracelets (rotations AND reflections)
function countBracelets(n, k) {
    const gcd = (a, b) => b ? gcd(b, a % b) : a;
    let total = 0;
    // Rotations (n symmetries)
    for (let i = 0; i < n; i++) total += Math.pow(k, gcd(i, n));
    // Reflections (n symmetries)
    if (n % 2 === 0) {
        // n/2 reflections through pairs of opposite beads: each fixes k^(n/2+1) colorings
        // n/2 reflections through midpoints of opposite edges: each fixes k^(n/2) colorings
        total += (n / 2) * Math.pow(k, n / 2 + 1);
        total += (n / 2) * Math.pow(k, n / 2);
    } else {
        // n reflections each through one bead and midpoint of opposite edge
        total += n * Math.pow(k, (n + 1) / 2);
    }
    return total / (2 * n);
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
      title: 'Distinct Sequences (rotation)',
      url: 'https://leetcode.com/problems/number-of-distinct-roll-sequences/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: DP on (last, second-last) state',
          explanation: `Count sequences of length n with die values 1-6 where no adjacent are equal and gcd(consecutive) = 1. dp[last][secondLast] = count. Transitions: try all values not equal to last with gcd(v, last) = 1.`,
          code: `var distinctSequences = function(n) {
    const MOD=1e9+7;
    if(n===1) return 6;
    const gcd=(a,b)=>b?gcd(b,a%b):a;
    // dp[i][j] = count of sequences of length k ending in ...i,j
    let dp=Array.from({length:7},()=>new Array(7).fill(0));
    for(let i=1;i<=6;i++) for(let j=1;j<=6;j++)
        if(i!==j&&gcd(i,j)===1) dp[i][j]=1;
    for(let k=2;k<n;k++){
        const ndp=Array.from({length:7},()=>new Array(7).fill(0));
        for(let i=1;i<=6;i++) for(let j=1;j<=6;j++){
            if(!dp[i][j]) continue;
            for(let v=1;v<=6;v++)
                if(v!==j&&gcd(v,j)===1&&v!==i)
                    ndp[j][v]=(ndp[j][v]+dp[i][j])%MOD;
        }
        dp=ndp;
    }
    let ans=0;
    for(let i=1;i<=6;i++) for(let j=1;j<=6;j++) ans=(ans+dp[i][j])%MOD;
    return ans;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Number of Ways to Paint N × 3 Grid',
      url: 'https://leetcode.com/problems/number-of-ways-to-paint-n-3-grid/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Count patterns — 3-color adjacent row pattern',
          explanation: `Each row pattern has either "aba" (3 choices × 2 choices × 1 = 6) or "abc" type (3 × 2 × 1 = 6) shapes. Track: how many "aba" patterns and "abc" patterns from the previous row lead to valid new rows. Pattern recurrence: aba → 3 aba + 2 abc, abc → 2 aba + 2 abc.`,
          code: `var numOfWays = function(n) {
    const MOD=1e9+7n;
    let [aba,abc]=[6n,6n];
    for(let i=1;i<n;i++){
        [aba,abc]=[
            (3n*aba+2n*abc)%MOD,
            (2n*aba+2n*abc)%MOD
        ];
    }
    return Number((aba+abc)%MOD);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Necklaces with k colors',
      url: 'https://leetcode.com/problems/count-anagrams/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Count permutations of each word independently, multiply',
          explanation: `For each word: count distinct anagrams = (word.length)! / product of (count of each char)!. Multiply across all words. Use modular arithmetic with precomputed factorials and inverse factorials.`,
          code: `var countAnagrams = function(s) {
    const MOD=BigInt(1e9+7);
    const words=s.split(' ');
    const pow=(b,e,m)=>{let r=1n;b%=m;while(e){if(e&1n)r=r*b%m;b=b*b%m;e>>=1n;}return r;};
    const maxN=100001;
    const fact=new Array(maxN).fill(1n);
    for(let i=1;i<maxN;i++) fact[i]=fact[i-1]*BigInt(i)%MOD;
    let ans=1n;
    for(const w of words){
        const freq=new Map();
        for(const c of w) freq.set(c,(freq.get(c)||0)+1);
        let ways=fact[w.length];
        for(const cnt of freq.values())
            ways=ways*pow(fact[cnt],MOD-2n,MOD)%MOD;
        ans=ans*ways%MOD;
    }
    return Number(ans);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🔄',
      color: 'blue',
      content: `**Burnside's formula:** distinct colorings = (1/|G|) × Σ_{g∈G} k^(cycles of g on objects)\n\n**Necklace vs bracelet:**\n- Necklace: rotations only (group of size n)\n- Bracelet: rotations + reflections (dihedral group of size 2n)\n\n**Necklaces with n beads, k colors:**\n(1/n) × Σᵢ₌₀ⁿ⁻¹ k^gcd(i,n)\n\n**Pólya enumeration theorem:** Extends Burnside's to count by type (how many with exactly r₁ of color 1, r₂ of color 2...). Uses the cycle index polynomial.\n\n**Application pattern:** Whenever problem says "distinct up to rotation" or "distinct up to symmetry" → Burnside's lemma.`,
    },
  ],
}
