import type { Article } from '../articles'

export const dpPalindromesArticle: Article = {
  slug: 'dp-palindromes',
  title: 'Palindrome DP Problems',
  emoji: '🪞',
  tagline: 'Minimum cuts, minimum insertions, count palindromic substrings. Interval DP.',
  description: 'Palindrome DP problems optimize over palindromic structure: minimum cuts to partition string into palindromes, minimum insertions to make string a palindrome, count palindromic substrings/subsequences. Core: isPalin[i][j] = (s[i]==s[j]) && isPalin[i+1][j-1]. Built in O(n²). Then use this table as building block for more complex DPs. Distinct from Manacher\'s (length finding) — these compute optimization or counting.',
  gradient: 'from-rose-700 to-pink-800',
  topicSlug: 'dp',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `Palindrome table: isPalin[i][j] precomputed in O(n²). Minimum palindrome cuts: dp[i] = min cuts for s[0..i]. For each j ≤ i, if isPalin[j][i], dp[i] = min(dp[i], dp[j-1]+1). Minimum insertions = minimum deletions = n - LPS where LPS = longest palindromic subsequence = LCS(s, reverse(s)). Count palindromic subsequences: dp[i][j] = number of distinct palindromic subsequences in s[i..j].`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Palindrome table and minimum cuts',
      code: `// Precompute palindrome table in O(n²)
function buildPalinTable(s) {
    const n = s.length;
    const isPalin = Array.from({length: n}, () => new Array(n).fill(false));
    for (let i = 0; i < n; i++) isPalin[i][i] = true;
    for (let i = 0; i < n - 1; i++) isPalin[i][i+1] = s[i] === s[i+1];
    for (let len = 3; len <= n; len++)
        for (let i = 0; i + len - 1 < n; i++) {
            const j = i + len - 1;
            isPalin[i][j] = s[i] === s[j] && isPalin[i+1][j-1];
        }
    return isPalin;
}

// Minimum palindrome cuts
function minCut(s) {
    const n = s.length;
    const isPalin = buildPalinTable(s);
    const dp = Array.from({length: n}, (_, i) => i); // worst case: i cuts
    for (let i = 1; i < n; i++) {
        if (isPalin[0][i]) { dp[i] = 0; continue; }
        for (let j = 1; j <= i; j++)
            if (isPalin[j][i]) dp[i] = Math.min(dp[i], dp[j-1] + 1);
    }
    return dp[n-1];
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
      title: 'Palindrome Partitioning II',
      url: 'https://leetcode.com/problems/palindrome-partitioning-ii/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: DP with palindrome table — dp[i] = min cuts for s[0..i]',
          explanation: `Precompute isPalin. dp[i] = min cuts so s[0..i] is split into palindromes. If s[0..i] itself is palindrome, dp[i]=0. Else for each j in 1..i, if isPalin[j][i], dp[i] = min(dp[i], dp[j-1]+1).`,
          code: `var minCut = function(s) {
    const n=s.length;
    const p=Array.from({length:n},()=>new Array(n).fill(false));
    for(let i=0;i<n;i++) p[i][i]=true;
    for(let i=0;i<n-1;i++) p[i][i+1]=s[i]===s[i+1];
    for(let l=3;l<=n;l++) for(let i=0;i+l-1<n;i++){const j=i+l-1;p[i][j]=s[i]===s[j]&&p[i+1][j-1];}
    const dp=Array.from({length:n},(_,i)=>i);
    for(let i=1;i<n;i++){
        if(p[0][i]){dp[i]=0;continue;}
        for(let j=1;j<=i;j++) if(p[j][i]) dp[i]=Math.min(dp[i],dp[j-1]+1);
    }
    return dp[n-1];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Minimum Insertion Steps to Make a String Palindrome',
      url: 'https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: n - LPS (longest palindromic subsequence = LCS with reverse)',
          explanation: `Minimum insertions = n - LPS. LPS = LCS(s, reverse(s)). To convert s to palindrome, we need to insert characters to "complete" the non-palindromic parts.`,
          code: `var minInsertions = function(s) {
    const t=s.split('').reverse().join('');
    const n=s.length;
    const dp=Array.from({length:n+1},()=>new Array(n+1).fill(0));
    for(let i=1;i<=n;i++) for(let j=1;j<=n;j++)
        dp[i][j]=s[i-1]===t[j-1]?dp[i-1][j-1]+1:Math.max(dp[i-1][j],dp[i][j-1]);
    return n-dp[n][n];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Count Different Palindromic Subsequences',
      url: 'https://leetcode.com/problems/count-different-palindromic-subsequences/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Interval DP — dp[i][j] = count distinct palindromic subsequences in s[i..j]',
          explanation: `dp[i][j] = 2*dp[i+1][j-1] if s[i]!=s[j] (new char pairs). If s[i]==s[j]: depends on whether s[i] appears inside. No occurrence: dp[i][j] = 2*dp[i+1][j-1]+2. One occurrence: +1. Multiple: -dp[l+1][r-1] where l,r are innermost same chars.`,
          code: `var countPalindromicSubsequences = function(s) {
    const n=s.length,MOD=1e9+7;
    const dp=Array.from({length:n},()=>new Array(n).fill(0));
    for(let i=0;i<n;i++) dp[i][i]=1;
    for(let len=2;len<=n;len++){
        for(let i=0;i<=n-len;i++){
            const j=i+len-1;
            if(s[i]!==s[j]) dp[i][j]=(2*dp[i+1][j-1]-dp[i+1][j]-dp[i][j-1]+2*MOD)%MOD;
            else{
                let l=i+1,r=j-1;
                while(l<=r&&s[l]!==s[i]) l++;
                while(l<=r&&s[r]!==s[j]) r--;
                if(l>r) dp[i][j]=(2*dp[i+1][j-1]+2)%MOD;
                else if(l===r) dp[i][j]=(2*dp[i+1][j-1]+1)%MOD;
                else dp[i][j]=(2*dp[i+1][j-1]-dp[l+1][r-1]+MOD)%MOD;
            }
        }
    }
    return dp[0][n-1];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Longest Palindromic Subsequence',
      url: 'https://leetcode.com/problems/longest-palindromic-subsequence/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: LCS with reverse, or interval DP',
          explanation: `LPS = LCS(s, reverse(s)). Or interval DP: dp[i][j] = LPS of s[i..j]. If s[i]==s[j]: dp[i-1][j-1]+2. Else: max(dp[i+1][j], dp[i][j-1]).`,
          code: `var longestPalindromeSubseq = function(s) {
    const n=s.length;
    const dp=Array.from({length:n},()=>new Array(n).fill(0));
    for(let i=0;i<n;i++) dp[i][i]=1;
    for(let len=2;len<=n;len++){
        for(let i=0;i<=n-len;i++){
            const j=i+len-1;
            dp[i][j]=s[i]===s[j]?(len===2?2:dp[i+1][j-1]+2):Math.max(dp[i+1][j],dp[i][j-1]);
        }
    }
    return dp[0][n-1];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🪞',
      color: 'red',
      content: `**Palindrome DP building blocks:**\n- isPalin table: O(n²), foundation for all other problems\n- LPS (longest palindromic subsequence) = LCS(s, rev(s))\n- Min cuts: O(n²) with isPalin table\n- Min insertions = n - LPS\n- Min deletions to make palindrome = n - LPS\n\n**Interval DP approach:** For dp[i][j]: base case when i==j (single char is palindrome). For len≥2: if s[i]==s[j], use inner dp[i+1][j-1]; else take max of excluding either end.`,
    },
  ],
}
