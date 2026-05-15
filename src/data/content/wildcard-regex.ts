import type { Article } from '../articles'

export const wildcardRegexArticle: Article = {
  slug: 'wildcard-regex',
  title: 'Wildcard & Regex Matching',
  emoji: '🎭',
  tagline: 'DP for pattern matching. Wildcard \'?\' and \'*\', regex \'.\' and \'*\'.',
  description: 'Pattern matching with special characters uses 2D DP: dp[i][j] = does pattern[0..i-1] match string[0..j-1]. Wildcard: \'?\' matches any single char; \'*\' matches any sequence (including empty). Regex: \'.\' matches any single char; \'*\' makes the preceding element occur 0+ times. Key difference: wildcard \'*\' is greedy (matches any sequence directly), regex \'*\' depends on the preceding character.',
  gradient: 'from-fuchsia-700 to-purple-800',
  topicSlug: 'dp',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `Wildcard dp[i][j]: p[i]='?' → dp[i-1][j-1] (match any char). p[i]='*' → dp[i-1][j] (use * for empty) OR dp[i][j-1] (use * to match one more char). Else: dp[i-1][j-1] && p[i]==s[j]. Regex dp[i][j]: p[i]='.' → dp[i-1][j-1]. p[i]='*' → dp[i-2][j] (0 occurrences) OR (dp[i][j-1] && (p[i-1]=='.' || p[i-1]==s[j])) (1+ occurrences). Else: dp[i-1][j-1] && p[i]==s[j].`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Wildcard and regex matching DP',
      code: `// Wildcard matching: ? matches any char, * matches any sequence
function wildcardMatch(s, p) {
    const m = p.length, n = s.length;
    const dp = Array.from({length: m+1}, () => new Array(n+1).fill(false));
    dp[0][0] = true;
    // p[0..i-1] of all '*' can match empty string
    for (let i = 1; i <= m; i++) dp[i][0] = dp[i-1][0] && p[i-1] === '*';

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (p[i-1] === '*')
                dp[i][j] = dp[i-1][j] || dp[i][j-1]; // skip* or consume char
            else if (p[i-1] === '?' || p[i-1] === s[j-1])
                dp[i][j] = dp[i-1][j-1];
        }
    }
    return dp[m][n];
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
      title: 'Regular Expression Matching',
      url: 'https://leetcode.com/problems/regular-expression-matching/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: 2D DP — dp[i][j] = pattern[0..i-1] matches s[0..j-1]',
          explanation: `p[i]='*': dp[i][j] = dp[i-2][j] (skip x*) OR (dp[i][j-1] AND p[i-1] matches s[j-1]). p[i]='.': dp[i-1][j-1]. Else: dp[i-1][j-1] AND p[i]==s[j].`,
          code: `var isMatch = function(s, p) {
    const m=p.length,n=s.length;
    const dp=Array.from({length:m+1},()=>new Array(n+1).fill(false));
    dp[0][0]=true;
    for(let i=2;i<=m;i++) if(p[i-1]==='*') dp[i][0]=dp[i-2][0];
    for(let i=1;i<=m;i++) for(let j=1;j<=n;j++){
        if(p[i-1]==='*')
            dp[i][j]=dp[i-2][j]||(dp[i][j-1]&&(p[i-2]==='.'||p[i-2]===s[j-1]));
        else if(p[i-1]==='.'||p[i-1]===s[j-1])
            dp[i][j]=dp[i-1][j-1];
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
      title: 'Wildcard Matching',
      url: 'https://leetcode.com/problems/wildcard-matching/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: 2D DP — \'*\' matches any sequence (including empty)',
          explanation: `p[i]='*': dp[i][j] = dp[i-1][j] (star matches empty, advance pattern) OR dp[i][j-1] (star consumes one more char of s). p[i]='?': dp[i-1][j-1]. Else: dp[i-1][j-1] AND p[i]==s[j].`,
          code: `var isMatch = function(s, p) {
    const m=p.length,n=s.length;
    const dp=Array.from({length:m+1},()=>new Array(n+1).fill(false));
    dp[0][0]=true;
    for(let i=1;i<=m;i++) dp[i][0]=dp[i-1][0]&&p[i-1]==='*';
    for(let i=1;i<=m;i++) for(let j=1;j<=n;j++){
        if(p[i-1]==='*') dp[i][j]=dp[i-1][j]||dp[i][j-1];
        else if(p[i-1]==='?'||p[i-1]===s[j-1]) dp[i][j]=dp[i-1][j-1];
    }
    return dp[m][n];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Longest Valid Parentheses',
      url: 'https://leetcode.com/problems/longest-valid-parentheses/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: DP — dp[i] = longest valid substring ending at i',
          explanation: `If s[i]='(': dp[i]=0. If s[i]=')' and s[i-1]='(': dp[i]=dp[i-2]+2. If s[i]=')' and s[i-1]=')' and dp[i-1]>0 and s[i-dp[i-1]-1]='(': dp[i]=dp[i-1]+2+dp[i-dp[i-1]-2].`,
          code: `var longestValidParentheses = function(s) {
    const n=s.length,dp=new Array(n).fill(0);
    let res=0;
    for(let i=1;i<n;i++){
        if(s[i]===')'){
            if(s[i-1]==='(') dp[i]=(dp[i-2]||0)+2;
            else if(dp[i-1]>0){
                const j=i-dp[i-1]-1;
                if(j>=0&&s[j]==='(') dp[i]=dp[i-1]+2+(dp[j-1]||0);
            }
            res=Math.max(res,dp[i]);
        }
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Word Pattern',
      url: 'https://leetcode.com/problems/word-pattern/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Bijection check — two HashMaps for bidirectional mapping',
          explanation: `Map each pattern char to a word and each word to a pattern char. If mapping conflicts (same char → different word, or different char → same word), return false.`,
          code: `var wordPattern = function(pattern, s) {
    const words=s.split(' ');
    if(pattern.length!==words.length) return false;
    const c2w=new Map(), w2c=new Map();
    for(let i=0;i<pattern.length;i++){
        const c=pattern[i],w=words[i];
        if(c2w.has(c)&&c2w.get(c)!==w) return false;
        if(w2c.has(w)&&w2c.get(w)!==c) return false;
        c2w.set(c,w); w2c.set(w,c);
    }
    return true;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🎭',
      color: 'blue',
      content: `**Wildcard vs Regex '*' difference:**\n- Wildcard '*': matches any sequence of characters directly\n- Regex '*': makes the PRECEDING element repeat 0+ times\n\n**Regex base cases:**\n- dp[0][0] = true (empty pattern matches empty string)\n- dp[i][0] = dp[i-2][0] if p[i-1]=='*' (x* can match empty)\n\n**Greedy alternative for wildcard:** Two pointers with backtracking — when '*' is encountered, record position; if mismatch, retreat to last '*' and try consuming one more char. O(n) average but O(mn) worst case.`,
    },
  ],
}
