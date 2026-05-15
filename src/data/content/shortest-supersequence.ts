import type { Article } from '../articles'

export const shortestSupersequenceArticle: Article = {
  slug: 'shortest-supersequence',
  title: 'Shortest Supersequence & LCS Duality',
  emoji: '🧵',
  tagline: 'SCS(s,t) = |s| + |t| - LCS(s,t). Find minimum string containing both as subsequences.',
  description: 'The Shortest Common Supersequence (SCS) is the shortest string that contains both s and t as subsequences. Key formula: |SCS(s,t)| = |s| + |t| - |LCS(s,t)|. To reconstruct SCS: compute LCS, then merge both strings by interleaving. Applications: diff/merge tools, DNA sequence alignment, and string reconstruction problems.',
  gradient: 'from-fuchsia-700 to-pink-800',
  topicSlug: 'dp',
  readTime: '13 min',
  sections: [
    {
      type: 'text',
      content: `SCS of s and t: shortest string containing both as subsequences. |SCS| = |s| + |t| - |LCS|, since the LCS characters are shared. To reconstruct: build LCS table, then trace back — when characters match, include once; when they don't, include the character from whichever string DP came from. The result interleaves both strings in minimal fashion.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Shortest common supersequence',
      code: `// Shortest common supersequence length and reconstruction
function scs(s, t) {
    const m = s.length, n = t.length;
    const dp = Array.from({length: m+1}, () => new Array(n+1).fill(0));
    // dp[i][j] = length of SCS of s[0..i-1] and t[0..j-1]
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++)
        for (let j = 1; j <= n; j++)
            dp[i][j] = s[i-1] === t[j-1] ? dp[i-1][j-1] + 1
                       : Math.min(dp[i-1][j], dp[i][j-1]) + 1;

    // Reconstruct SCS by tracing back
    let i = m, j = n, result = '';
    while (i > 0 && j > 0) {
        if (s[i-1] === t[j-1]) { result = s[i-1] + result; i--; j--; }
        else if (dp[i-1][j] < dp[i][j-1]) { result = s[i-1] + result; i--; }
        else { result = t[j-1] + result; j--; }
    }
    while (i > 0) { result = s[i-1] + result; i--; }
    while (j > 0) { result = t[j-1] + result; j--; }
    return { length: dp[m][n], scs: result };
}

// Key formula: |SCS(s,t)| = |s| + |t| - |LCS(s,t)|
// This works because LCS characters are shared — they appear once in SCS`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Shortest Common Supersequence',
      url: 'https://leetcode.com/problems/shortest-common-supersequence/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Build SCS by merging LCS traceback',
          explanation: `Compute LCS dp table. Trace back from dp[m][n]: if characters match, include once and advance both. If not, include from the direction that had smaller dp value.`,
          code: `var shortestCommonSupersequence = function(str1, str2) {
    const m=str1.length,n=str2.length;
    const dp=Array.from({length:m+1},()=>new Array(n+1).fill(0));
    for(let i=0;i<=m;i++) dp[i][0]=i;
    for(let j=0;j<=n;j++) dp[0][j]=j;
    for(let i=1;i<=m;i++) for(let j=1;j<=n;j++)
        dp[i][j]=str1[i-1]===str2[j-1]?dp[i-1][j-1]+1:Math.min(dp[i-1][j],dp[i][j-1])+1;
    let i=m,j=n,res='';
    while(i>0&&j>0){
        if(str1[i-1]===str2[j-1]){res=str1[i-1]+res;i--;j--;}
        else if(dp[i-1][j]<dp[i][j-1]){res=str1[i-1]+res;i--;}
        else{res=str2[j-1]+res;j--;}
    }
    while(i>0){res=str1[i-1]+res;i--;}
    while(j>0){res=str2[j-1]+res;j--;}
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Delete Operation for Two Strings',
      url: 'https://leetcode.com/problems/delete-operation-for-two-strings/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: m + n - 2*LCS',
          explanation: `Minimum deletions = total characters not in LCS. From s: m - LCS. From t: n - LCS. Total = m + n - 2*LCS.`,
          code: `var minDistance = function(word1, word2) {
    const m=word1.length,n=word2.length;
    const dp=Array.from({length:m+1},()=>new Array(n+1).fill(0));
    for(let i=1;i<=m;i++) for(let j=1;j<=n;j++)
        dp[i][j]=word1[i-1]===word2[j-1]?dp[i-1][j-1]+1:Math.max(dp[i-1][j],dp[i][j-1]);
    const lcs=dp[m][n];
    return m+n-2*lcs;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Uncrossed Lines',
      url: 'https://leetcode.com/problems/uncrossed-lines/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: This is exactly LCS',
          explanation: `Drawing lines that don't cross = choosing elements in order from both arrays = LCS. Maximum uncrossed lines = LCS(nums1, nums2).`,
          code: `var maxUncrossedLines = function(nums1, nums2) {
    const m=nums1.length,n=nums2.length;
    const dp=Array.from({length:m+1},()=>new Array(n+1).fill(0));
    for(let i=1;i<=m;i++) for(let j=1;j<=n;j++)
        dp[i][j]=nums1[i-1]===nums2[j-1]?dp[i-1][j-1]+1:Math.max(dp[i-1][j],dp[i][j-1]);
    return dp[m][n];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧵',
      color: 'red',
      content: `**SCS/LCS duality:**\n- |SCS| = |s| + |t| - |LCS|\n- Min deletions to make s = t: |s| + |t| - 2×|LCS|\n- Min edit distance (insert/delete): |s| + |t| - 2×|LCS|\n- LCS = longest common subsequence\n- SCS = shortest string containing both as subsequences\n\n**Reconstruction:** Trace back dp table:\n- Characters match: include once, advance both pointers\n- Characters differ: include from the direction with smaller dp, advance that pointer\n\n**Applications:** Version control (git merge/diff), bioinformatics (sequence alignment), patch generation.`,
    },
  ],
}
