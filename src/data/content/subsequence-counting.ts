import type { Article } from '../articles'

export const subsequenceCountingArticle: Article = {
  slug: 'subsequence-counting',
  title: 'Subsequence Counting',
  emoji: '🔢',
  tagline: 'Count subsequences with constraints. DP on choices: include or exclude each element.',
  description: 'Subsequence counting uses DP where each element is either included or excluded. Core: count subsequences satisfying a property (sum, value, order). Key problems: count distinct subsequences equal to t, count subsequences with sum k, count increasing subsequences, count subsequences avoiding a pattern. The "include/exclude" choice at each step is the fundamental building block.',
  gradient: 'from-violet-600 to-purple-700',
  topicSlug: 'dp',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `Subsequence counting DP: at each element, we either skip it or include it. For counting subsequences matching string t in string s: dp[i][j] = count of ways to form t[0..j-1] from s[0..i-1]. For counting subsequences with sum k: dp[i][j] = ways to pick a subsequence from first i elements with sum j. Track total with modular arithmetic when counts are large.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Subsequence counting patterns',
      code: `// Count distinct subsequences of s equal to t
function countSubseq(s, t) {
    const m = s.length, n = t.length;
    const dp = Array.from({length: m + 1}, () => new Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = 1;
    for (let i = 1; i <= m; i++)
        for (let j = 1; j <= n; j++) {
            dp[i][j] = dp[i-1][j]; // skip s[i-1]
            if (s[i-1] === t[j-1]) dp[i][j] += dp[i-1][j-1]; // include
        }
    return dp[m][n];
}

// Count subsequences with sum exactly k
function countSubseqSum(arr, k, MOD = 1e9 + 7) {
    const dp = new Array(k + 1).fill(0); dp[0] = 1;
    for (const x of arr) {
        for (let j = k; j >= x; j--)
            dp[j] = (dp[j] + dp[j - x]) % MOD;
    }
    return dp[k];
}

// Count non-empty subsequences with min+max ≤ target
// Sort first, then for each right endpoint r, find leftmost l where arr[l]+arr[r] ≤ target
// Count = 2^(r-l) (any subset of elements between l and r)
function countSubseqMinMax(nums, target) {
    const MOD = 1e9 + 7;
    nums.sort((a, b) => a - b);
    const n = nums.length;
    const pow2 = new Array(n).fill(1n);
    for (let i = 1; i < n; i++) pow2[i] = pow2[i-1] * 2n % BigInt(MOD);
    let ans = 0n, l = 0;
    for (let r = 0; r < n; r++) {
        while (nums[l] + nums[r] > target) l++;
        ans = (ans + pow2[r - l]) % BigInt(MOD);
    }
    return Number(ans);
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
      title: 'Distinct Subsequences',
      url: 'https://leetcode.com/problems/distinct-subsequences/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: DP include/skip each character',
          explanation: `dp[i][j] = ways to form t[0..j-1] from s[0..i-1]. Skip s[i-1]: dp[i-1][j]. Include s[i-1] (if matches t[j-1]): dp[i-1][j-1].`,
          code: `var numDistinct = function(s, t) {
    const m=s.length,n=t.length;
    const dp=Array.from({length:m+1},()=>new Array(n+1).fill(0));
    for(let i=0;i<=m;i++) dp[i][0]=1;
    for(let i=1;i<=m;i++) for(let j=1;j<=n;j++){
        dp[i][j]=dp[i-1][j];
        if(s[i-1]===t[j-1]) dp[i][j]+=dp[i-1][j-1];
    }
    return dp[m][n];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Count Number of Texts',
      url: 'https://leetcode.com/problems/count-number-of-texts/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DP on runs of same digit',
          explanation: `Each press of the same key can be grouped into 1, 2, or 3 letters (4 for 7 and 9). For a run of k identical digits: dp[i] = dp[i-1] + dp[i-2] + dp[i-3] (or +dp[i-4] for 7/9). Count ways for each run, multiply across runs.`,
          code: `var countTexts = function(pressedKeys) {
    const MOD=1e9+7, n=pressedKeys.length;
    const dp=new Array(n+1).fill(0); dp[0]=1;
    for(let i=1;i<=n;i++){
        dp[i]=dp[i-1]; // 1 press
        const c=pressedKeys[i-1], max=c==='7'||c==='9'?4:3;
        if(i>=2&&pressedKeys[i-2]===c) dp[i]=(dp[i]+dp[i-2])%MOD;
        if(max>=3&&i>=3&&pressedKeys[i-3]===c) dp[i]=(dp[i]+dp[i-3])%MOD;
        if(max>=4&&i>=4&&pressedKeys[i-4]===c) dp[i]=(dp[i]+dp[i-4])%MOD;
    }
    return dp[n];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Count Sorted Vowel Strings',
      url: 'https://leetcode.com/problems/count-sorted-vowel-strings/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Stars and bars — C(n+4, 4)',
          explanation: `Count non-decreasing strings of length n from 5 vowels = multisets of size n from 5 elements = C(n+4, 4).`,
          code: `var countVowelStrings = function(n) {
    return (n+1)*(n+2)*(n+3)*(n+4)/24;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Number of Subsequences That Satisfy the Given Sum Condition',
      url: 'https://leetcode.com/problems/number-of-subsequences-that-satisfy-the-given-sum-condition/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Sort + two pointers + 2^(r-l) formula',
          explanation: `Sort. For each right pointer r, find leftmost l where nums[l] + nums[r] ≤ target. All 2^(r-l) non-empty subsets of nums[l..r] with nums[l] as minimum and nums[r] as maximum are valid. Count += 2^(r-l).`,
          code: `var numSubseq = function(nums, target) {
    const MOD=1e9+7,n=nums.length;
    nums.sort((a,b)=>a-b);
    const pow2=new Array(n).fill(1);
    for(let i=1;i<n;i++) pow2[i]=pow2[i-1]*2%MOD;
    let ans=0,l=0;
    for(let r=n-1;r>=0;r--){
        while(nums[l]+nums[r]>target) l++;
        if(l<=r) ans=(ans+pow2[r-l])%MOD;
    }
    return ans;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🔢',
      color: 'blue',
      content: `**Subsequence counting patterns:**\n- Count equal to t: dp[i][j] = ways to form t[0..j-1] from s[0..i-1]\n- Count with sum k: 0/1 knapsack variant, O(n × k)\n- Count with min+max ≤ target: sort + two pointers + 2^(r-l)\n- Count non-decreasing: stars and bars or DP by last element\n\n**Modular arithmetic tip:** When using 2^k mod p, precompute powers[0..n] for O(1) lookup.\n\n**Key identity:** 2^(r-l) counts all non-empty subsets of elements from index l to r (when sorted, these give all valid (min, max) pairs).`,
    },
  ],
}
