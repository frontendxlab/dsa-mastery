import type { Article } from '../articles'

export const advancedCountingDpArticle: Article = {
  slug: 'advanced-counting-dp',
  title: 'Advanced Counting DP',
  emoji: '🔢',
  tagline: 'Partition numbers, Bell numbers, Stirling numbers. DP on combinatorial structures.',
  description: 'Advanced counting DP computes partition numbers (ways to write n as sum of positive integers), Bell numbers (ways to partition a set), and Stirling numbers (partitions into k non-empty subsets). Also covers: counting sequences with forbidden patterns, DP on generating functions, and transfer matrix method. Essential for combinatorics competition problems.',
  gradient: 'from-rose-800 to-red-900',
  topicSlug: 'math',
  readTime: '15 min',
  sections: [
    {
      type: 'text',
      content: `Partition numbers p(n): ways to write n as an ordered sum (compositions) or unordered sum (partitions). Compositions of n: 2^(n-1). Integer partitions: recurrence p(n,k) = p(n-k,k) + p(n,k-1) (use k or don't use k). Bell numbers B(n) = total ways to partition a set of n elements = Σ S(n,k) for all k. Stirling numbers S(n,k) = ways to partition n-set into exactly k non-empty subsets. Recurrence: S(n,k) = k×S(n-1,k) + S(n-1,k-1).`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Partition numbers, Bell numbers, Stirling numbers',
      code: `// Integer partition: ways to write n as sum of positive integers, largest part ≤ k
function partition(n, k = n) {
    // dp[i][j] = ways to partition i using parts ≤ j
    const dp = Array.from({length: n+1}, () => new Array(n+1).fill(0));
    for (let j = 0; j <= n; j++) dp[0][j] = 1;
    for (let i = 1; i <= n; i++)
        for (let j = 1; j <= n; j++)
            dp[i][j] = dp[i][j-1] + (i >= j ? dp[i-j][j] : 0);
    return dp[n][k];
}

// Stirling numbers of the second kind: S(n,k) = ways to partition n elements into k subsets
function stirling2(maxN) {
    const S = Array.from({length: maxN+1}, () => new Array(maxN+1).fill(0));
    S[0][0] = 1;
    for (let n = 1; n <= maxN; n++)
        for (let k = 1; k <= n; k++)
            S[n][k] = k * S[n-1][k] + S[n-1][k-1];
    return S;
}

// Bell numbers: B(n) = Σ S(n,k) for k=0..n = total set partitions
function bell(maxN) {
    const S = stirling2(maxN);
    return Array.from({length: maxN+1}, (_, n) =>
        S[n].reduce((a, b) => a + b, 0));
}

// Bell triangle: efficient O(n²) Bell number computation
function bellTriangle(n) {
    const row = [1];
    const bells = [1];
    for (let i = 1; i <= n; i++) {
        const next = [row[row.length - 1]];
        for (let j = 1; j <= i; j++)
            next.push(next[j-1] + row[j-1]);
        bells.push(next[i]);
        row.length = 0; row.push(...next);
    }
    return bells;
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
      title: 'Integer Break',
      url: 'https://leetcode.com/problems/integer-break/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Math observation — use as many 3s as possible',
          explanation: `Split n into parts to maximize product. 1 is useless. 4 = 2+2, same product. For n ≥ 5: 3*(n-3) > 2*(n-2) > n. So use 3s until remainder is 2 or 4.`,
          code: `var integerBreak = function(n) {
    if(n<=3) return n-1;
    if(n%3===0) return 3**(n/3);
    if(n%3===1) return 4*3**((n-4)/3);
    return 2*3**((n-2)/3);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Count Ways to Build Good Strings',
      url: 'https://leetcode.com/problems/count-ways-to-build-good-strings/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DP on string length',
          explanation: `dp[i] = number of good strings of length exactly i. Transition: dp[i] += dp[i-zero] + dp[i-one]. Sum dp[low..high].`,
          code: `var countGoodStrings = function(low, high, zero, one) {
    const MOD=1e9+7;
    const dp=new Array(high+1).fill(0); dp[0]=1;
    for(let i=1;i<=high;i++){
        if(i>=zero) dp[i]=(dp[i]+dp[i-zero])%MOD;
        if(i>=one) dp[i]=(dp[i]+dp[i-one])%MOD;
    }
    let ans=0;
    for(let i=low;i<=high;i++) ans=(ans+dp[i])%MOD;
    return ans;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Count Beautiful Subsets',
      url: 'https://leetcode.com/problems/count-beautiful-subsets/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Group by residue mod k, DP within each group',
          explanation: `Two elements conflict if their difference = k. Group elements by value mod k. Within each group, elements are linearly ordered; adjacent ones in sorted order potentially conflict. DP within each group: choose subsets with no two adjacent values differing by k.`,
          code: `var beautifulSubsets = function(nums, k) {
    const groups=new Map();
    for(const n of nums) groups.set(n%k,(groups.get(n%k)||[]).concat(n));
    let total=1;
    for(const g of groups.values()){
        g.sort((a,b)=>a-b);
        const cnt=new Map();
        for(const v of g) cnt.set(v,(cnt.get(v)||0)+1);
        const vals=[...new Set(g)].sort((a,b)=>a-b);
        let [skip,take]=[1,0];
        let prev=-1;
        for(const v of vals){
            const c=cnt.get(v), ways=2**c-1; // non-empty subsets of this value
            const [ns, nt]=prev+k===v?[skip+take,skip*ways]:[skip+take,(skip+take)*ways];
            [skip,take]=[ns,nt]; prev=v;
        }
        total*=(skip+take);
    }
    return total-1; // subtract empty set
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Count Ways to Make Array With Product',
      url: 'https://leetcode.com/problems/count-ways-to-make-array-with-product/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Factorize k, distribute prime factors among n slots',
          explanation: `For each query (n, k): factorize k as p₁^e₁ × p₂^e₂ × ... For each prime pᵢ with exponent eᵢ: distribute eᵢ "balls" into n "boxes" (each ≥ 0) = C(eᵢ+n-1, n-1) (stars and bars). Multiply across all primes.`,
          code: `var waysToFillArray = function(queries) {
    const MOD=1e9+7n;
    const MAX=10001+13+1;
    const fact=new Array(MAX).fill(1n);
    for(let i=1;i<MAX;i++) fact[i]=fact[i-1]*BigInt(i)%MOD;
    const pow=(b,e,m)=>{let r=1n;b%=m;while(e){if(e&1n)r=r*b%m;b=b*b%m;e>>=1n;}return r;};
    const inv=x=>pow(x,MOD-2n,MOD);
    const comb=(n,k)=>n<k?0n:fact[n]*inv(fact[k])%MOD*inv(fact[n-k])%MOD;
    return queries.map(([n,k])=>{
        let res=1n;
        for(let p=2;p*p<=k;p++) if(k%p===0){
            let e=0; while(k%p===0){e++;k/=p;}
            res=res*comb(e+n-1,n-1)%MOD;
        }
        if(k>1) res=res*comb(n,n-1)%MOD; // k is prime (e=1)
        return Number(res);
    });
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🔢',
      color: 'red',
      content: `**Key counting formulas:**\n- Integer compositions of n: 2^(n-1)\n- Integer partitions: recurrence dp[n][k] = dp[n-k][k] + dp[n][k-1]\n- Distribute n identical balls into k distinct boxes (≥0 each): C(n+k-1,k-1) — stars and bars\n- Distribute n into k boxes (≥1 each): C(n-1,k-1)\n- Stirling second kind: S(n,k) = k×S(n-1,k) + S(n-1,k-1)\n- Bell number: B(n) = Σₖ S(n,k) = total set partitions`,
    },
  ],
}
