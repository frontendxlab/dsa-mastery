import type { Article } from '../articles'

export const stringDpArticle: Article = {
  slug: 'string-dp',
  title: 'String DP',
  emoji: '📝',
  tagline: 'dp[i][j] = answer for s1[0..i-1] and s2[0..j-1]. Match or skip.',
  description: 'String DP builds a 2D table where dp[i][j] represents the best answer for substrings ending at positions i and j. Edit distance, LCS, shortest common supersequence, wildcard/regex matching, palindrome DP — all follow the same 2D table structure with 3-4 transition cases.',
  gradient: 'from-violet-500 to-indigo-600',
  topicSlug: 'dp',
  readTime: '20 min',
  sections: [
    {
      type: 'text',
      content: `String DP problems compare or transform two strings (or a string with itself). The key structure: dp[i][j] = answer for s1[0..i-1] vs s2[0..j-1]. At each cell, you either match the current characters (use dp[i-1][j-1]) or skip from one side (use dp[i-1][j] or dp[i][j-1]). The exact formula depends on what you're optimizing.`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'The Three Fundamental Transitions',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'LCS, Edit Distance, and Shortest Common Supersequence templates',
      code: `// All three use the same 2D dp structure:
// dp[i][j] = answer for s1[0..i-1] and s2[0..j-1]

// LCS (Longest Common Subsequence):
if (s1[i-1] === s2[j-1])
    dp[i][j] = dp[i-1][j-1] + 1;        // match: extend LCS
else
    dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);  // skip one char from either

// Edit Distance (Levenshtein):
if (s1[i-1] === s2[j-1])
    dp[i][j] = dp[i-1][j-1];             // match: no operation needed
else
    dp[i][j] = 1 + Math.min(
        dp[i-1][j-1],   // replace s1[i-1] with s2[j-1]
        dp[i-1][j],     // delete s1[i-1]
        dp[i][j-1]      // insert s2[j-1] into s1
    );

// Shortest Common Supersequence length:
if (s1[i-1] === s2[j-1])
    dp[i][j] = dp[i-1][j-1] + 1;         // use one char from both
else
    dp[i][j] = 1 + Math.min(dp[i-1][j], dp[i][j-1]);  // take one char from the shorter option`,
    },
    {
      type: 'table',
      headers: ['Problem', 'dp[i][j] meaning', 'Match case', 'Skip case'],
      rows: [
        ['LCS', 'length of LCS of s1[0..i-1] and s2[0..j-1]', 'dp[i-1][j-1] + 1', 'max(dp[i-1][j], dp[i][j-1])'],
        ['Edit Distance', 'min edits to convert s1[0..i-1] to s2[0..j-1]', 'dp[i-1][j-1]', 'min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1]) + 1'],
        ['SCS length', 'length of shortest supersequence', 'dp[i-1][j-1] + 1', 'min(dp[i-1][j], dp[i][j-1]) + 1'],
        ['Distinct subseqs', 'count of ways s2[0..j-1] appears in s1[0..i-1]', 'dp[i-1][j-1] + dp[i-1][j]', 'dp[i-1][j]'],
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
      title: 'Longest Common Subsequence',
      url: 'https://leetcode.com/problems/longest-common-subsequence/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: O(n²) DP — match or skip',
          explanation: `dp[i][j] = LCS length for text1[0..i-1] and text2[0..j-1]. If chars match, extend LCS. Otherwise, the LCS of one pair is the max of skipping from either string.`,
          code: `var longestCommonSubsequence = function(text1, text2) {
    const m=text1.length, n=text2.length;
    const dp=Array.from({length:m+1},()=>new Array(n+1).fill(0));
    for(let i=1;i<=m;i++)
        for(let j=1;j<=n;j++)
            dp[i][j]=text1[i-1]===text2[j-1]
                ? dp[i-1][j-1]+1
                : Math.max(dp[i-1][j],dp[i][j-1]);
    return dp[m][n];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Edit Distance',
      url: 'https://leetcode.com/problems/edit-distance/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: O(n²) DP — 3 operations as transitions',
          explanation: `dp[i][j] = min edits to convert word1[0..i-1] to word2[0..j-1]. Three operations:\n- Insert: dp[i][j-1] + 1 (insert word2[j-1] into word1)\n- Delete: dp[i-1][j] + 1 (delete word1[i-1])\n- Replace: dp[i-1][j-1] + 1 (replace word1[i-1] with word2[j-1])\nIf chars match: dp[i-1][j-1] (no operation needed).`,
          code: `var minDistance = function(word1, word2) {
    const m=word1.length, n=word2.length;
    const dp=Array.from({length:m+1},(_,i)=>Array.from({length:n+1},(_,j)=>i||j?i+j:0));
    // dp[i][0]=i (delete all), dp[0][j]=j (insert all)
    for(let i=1;i<=m;i++)
        for(let j=1;j<=n;j++)
            dp[i][j]=word1[i-1]===word2[j-1]
                ? dp[i-1][j-1]
                : 1+Math.min(dp[i-1][j-1],dp[i-1][j],dp[i][j-1]);
    return dp[m][n];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Shortest Common Supersequence',
      url: 'https://leetcode.com/problems/shortest-common-supersequence/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Find LCS, then reconstruct SCS',
          explanation: `SCS length = m + n - LCS(m,n). To reconstruct: trace back through LCS dp table. When characters match (part of LCS), include once. When skipping from str1, include str1's char. When skipping from str2, include str2's char.`,
          code: `var shortestCommonSupersequence = function(str1, str2) {
    const m=str1.length, n=str2.length;
    const dp=Array.from({length:m+1},()=>new Array(n+1).fill(0));
    for(let i=1;i<=m;i++)
        for(let j=1;j<=n;j++)
            dp[i][j]=str1[i-1]===str2[j-1]?dp[i-1][j-1]+1:Math.max(dp[i-1][j],dp[i][j-1]);
    // Reconstruct
    let i=m,j=n,result='';
    while(i>0&&j>0){
        if(str1[i-1]===str2[j-1]){result=str1[i-1]+result;i--;j--;}
        else if(dp[i-1][j]>dp[i][j-1]){result=str1[i-1]+result;i--;}
        else{result=str2[j-1]+result;j--;}
    }
    while(i>0){result=str1[--i]+result;}
    while(j>0){result=str2[--j]+result;}
    return result;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Interleaving String',
      url: 'https://leetcode.com/problems/interleaving-string/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DP — dp[i][j] = can s1[0..i-1] and s2[0..j-1] interleave to form s3[0..i+j-1]',
          explanation: `dp[i][j] = true if s1[0..i-1] and s2[0..j-1] can interleave to form s3[0..i+j-1]. Transition: dp[i][j] is true if either: (s1[i-1] === s3[i+j-1] AND dp[i-1][j]) or (s2[j-1] === s3[i+j-1] AND dp[i][j-1]).`,
          code: `var isInterleave = function(s1, s2, s3) {
    const m=s1.length, n=s2.length;
    if(m+n!==s3.length) return false;
    const dp=Array.from({length:m+1},()=>new Array(n+1).fill(false));
    dp[0][0]=true;
    for(let i=1;i<=m;i++) dp[i][0]=dp[i-1][0]&&s1[i-1]===s3[i-1];
    for(let j=1;j<=n;j++) dp[0][j]=dp[0][j-1]&&s2[j-1]===s3[j-1];
    for(let i=1;i<=m;i++)
        for(let j=1;j<=n;j++)
            dp[i][j]=(dp[i-1][j]&&s1[i-1]===s3[i+j-1])||(dp[i][j-1]&&s2[j-1]===s3[i+j-1]);
    return dp[m][n];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Longest Palindromic Subsequence',
      url: 'https://leetcode.com/problems/longest-palindromic-subsequence/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: LCS of s and reverse(s)',
          explanation: `A palindromic subsequence of s is a common subsequence of s and reverse(s). So LPS = LCS(s, s.reversed). Simple one-liner using existing LCS code.`,
          code: `var longestPalindromeSubseq = function(s) {
    const rev = s.split('').reverse().join('');
    // LCS(s, rev)
    const n=s.length;
    const dp=Array.from({length:n+1},()=>new Array(n+1).fill(0));
    for(let i=1;i<=n;i++)
        for(let j=1;j<=n;j++)
            dp[i][j]=s[i-1]===rev[j-1]?dp[i-1][j-1]+1:Math.max(dp[i-1][j],dp[i][j-1]);
    return dp[n][n];
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Interval DP on s itself',
          explanation: `dp[i][j] = longest palindromic subsequence in s[i..j]. If s[i]===s[j]: dp[i][j] = dp[i+1][j-1] + 2. Else: dp[i][j] = max(dp[i+1][j], dp[i][j-1]).`,
          code: `var longestPalindromeSubseq = function(s) {
    const n=s.length;
    const dp=Array.from({length:n},()=>new Array(n).fill(1));
    for(let len=2;len<=n;len++)
        for(let i=0;i<=n-len;i++){
            const j=i+len-1;
            if(s[i]===s[j]) dp[i][j]=(len===2?2:dp[i+1][j-1]+2);
            else dp[i][j]=Math.max(dp[i+1][j],dp[i][j-1]);
        }
    return dp[0][n-1];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 6,
      title: 'Wildcard Matching',
      url: 'https://leetcode.com/problems/wildcard-matching/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: DP with special handling for "*"',
          explanation: `dp[i][j] = does s[0..i-1] match p[0..j-1]?\n- If p[j-1] is a letter or '?': dp[i][j] = dp[i-1][j-1] && (s[i-1]===p[j-1] || p[j-1]==='?')\n- If p[j-1] is '*': dp[i][j] = dp[i-1][j] (star matches one char) OR dp[i][j-1] (star matches empty)`,
          code: `var isMatch = function(s, p) {
    const m=s.length, n=p.length;
    const dp=Array.from({length:m+1},()=>new Array(n+1).fill(false));
    dp[0][0]=true;
    for(let j=1;j<=n;j++) dp[0][j]=dp[0][j-1]&&p[j-1]==='*';
    for(let i=1;i<=m;i++)
        for(let j=1;j<=n;j++)
            if(p[j-1]==='*') dp[i][j]=dp[i-1][j]||dp[i][j-1]; // match 1 or match empty
            else dp[i][j]=dp[i-1][j-1]&&(s[i-1]===p[j-1]||p[j-1]==='?');
    return dp[m][n];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧠',
      color: 'violet',
      content: `**String DP pattern guide:**\n- "Longest common subsequence" → LCS template (match or max-skip)\n- "Min edits/operations" → Edit distance (match=free, otherwise min of 3 ops + 1)\n- "Build supersequence" → LCS then reconstruct (merge two strings via LCS path)\n- "Can s interleave s1 and s2?" → 2D boolean DP, one source at a time\n- "Longest palindrome subsequence" → LCS(s, reverse(s)) or interval DP\n- "Wildcard/regex matching" → 2D DP with special * handling\n\n**Space optimization:** string DP only needs previous row → optimize from O(mn) to O(n).`,
    },
  ],
}
