import type { Article } from '../articles'

export const stringConstructionArticle: Article = {
  slug: 'string-construction',
  title: 'String Construction & Transformation',
  emoji: '🏗️',
  tagline: 'Build target strings via DP. Edit distance, word ladder, minimum operations.',
  description: 'String construction problems ask: given a source, what is the minimum cost to build or transform into a target? Techniques: edit distance DP (insert/delete/replace), word ladder BFS, minimum operations to make string valid, constructing strings from dictionary, and rearrangement problems. Key insight: model valid states and transitions between them.',
  gradient: 'from-violet-700 to-purple-800',
  topicSlug: 'dp',
  readTime: '15 min',
  sections: [
    {
      type: 'text',
      content: `Edit distance: dp[i][j] = min ops to convert s[0..i] to t[0..j]. Base: dp[i][0]=i, dp[0][j]=j. Transition: if s[i]==t[j], dp[i][j]=dp[i-1][j-1]; else min(dp[i-1][j]+1, dp[i][j-1]+1, dp[i-1][j-1]+1). Word ladder: BFS where each step changes one character to get a valid word. String construction from pieces: dp[i] = can build s[0..i] using dictionary words.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Edit distance and word break templates',
      code: `// Edit distance — O(m*n)
function editDistance(s, t) {
    const m = s.length, n = t.length;
    const dp = Array.from({length: m+1}, (_, i) => Array(n+1).fill(0).map((_, j) => i||j));
    // dp[i][0]=i, dp[0][j]=j is implicit from the fill above; fix it:
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s[i-1] === t[j-1]) dp[i][j] = dp[i-1][j-1];
            else dp[i][j] = 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
        }
    }
    return dp[m][n];
}

// Word break — can s be segmented using wordDict?
function wordBreak(s, wordDict) {
    const set = new Set(wordDict);
    const dp = new Array(s.length + 1).fill(false);
    dp[0] = true;
    for (let i = 1; i <= s.length; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && set.has(s.slice(j, i))) { dp[i] = true; break; }
        }
    }
    return dp[s.length];
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
      title: 'Edit Distance',
      url: 'https://leetcode.com/problems/edit-distance/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Classic 2D DP',
          explanation: `dp[i][j] = min operations to convert word1[0..i-1] to word2[0..j-1]. If characters match: dp[i-1][j-1]. Else: 1 + min(delete=dp[i-1][j], insert=dp[i][j-1], replace=dp[i-1][j-1]).`,
          code: `var minDistance = function(word1, word2) {
    const m=word1.length, n=word2.length;
    const dp=Array.from({length:m+1},(_,i)=>Array.from({length:n+1},(_,j)=>i+j));
    for(let i=1;i<=m;i++) for(let j=1;j<=n;j++){
        if(word1[i-1]===word2[j-1]) dp[i][j]=dp[i-1][j-1];
        else dp[i][j]=1+Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]);
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
      title: 'Word Ladder',
      url: 'https://leetcode.com/problems/word-ladder/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: BFS — each node is a word, edges connect words differing by 1 char',
          explanation: `BFS from beginWord. At each step, try changing each character to a-z. If resulting word is in wordList and not visited, enqueue it. Return level count when endWord found. Use Set for O(1) lookup and deletion.`,
          code: `var ladderLength = function(beginWord, endWord, wordList) {
    const set=new Set(wordList);
    if(!set.has(endWord)) return 0;
    const q=[beginWord]; let steps=1;
    while(q.length){
        const len=q.length;
        for(let k=0;k<len;k++){
            const word=q.shift();
            if(word===endWord) return steps;
            for(let i=0;i<word.length;i++){
                for(let c=97;c<123;c++){
                    const next=word.slice(0,i)+String.fromCharCode(c)+word.slice(i+1);
                    if(set.has(next)){set.delete(next);q.push(next);}
                }
            }
        }
        steps++;
    }
    return 0;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Minimum Number of Steps to Make Two Strings Anagram',
      url: 'https://leetcode.com/problems/minimum-number-of-steps-to-make-two-strings-anagram/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Count frequency difference',
          explanation: `Count characters in s that are NOT in t (excess). Those are the characters to replace. Answer = number of characters in s that t has deficit of = max(0, freq[c] - t_freq[c]) summed over all c.`,
          code: `var minSteps = function(s, t) {
    const cnt=new Array(26).fill(0);
    for(const c of s) cnt[c.charCodeAt(0)-97]++;
    for(const c of t) cnt[c.charCodeAt(0)-97]--;
    return cnt.reduce((s,x)=>s+Math.max(0,x),0);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Minimum ASCII Delete Sum for Two Strings',
      url: 'https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Edit distance variant — cost = ASCII of deleted chars',
          explanation: `dp[i][j] = min ASCII cost to make s[0..i-1] and t[0..j-1] equal. Base: dp[i][0] = sum of ASCII of s[0..i-1], dp[0][j] = sum of ASCII of t[0..j-1]. If s[i-1]==t[j-1]: dp[i][j]=dp[i-1][j-1]. Else: min(dp[i-1][j]+s[i-1].charCodeAt(), dp[i][j-1]+t[j-1].charCodeAt()).`,
          code: `var minimumDeleteSum = function(s1, s2) {
    const m=s1.length, n=s2.length;
    const dp=Array.from({length:m+1},()=>new Array(n+1).fill(0));
    for(let i=1;i<=m;i++) dp[i][0]=dp[i-1][0]+s1.charCodeAt(i-1);
    for(let j=1;j<=n;j++) dp[0][j]=dp[0][j-1]+s2.charCodeAt(j-1);
    for(let i=1;i<=m;i++) for(let j=1;j<=n;j++){
        if(s1[i-1]===s2[j-1]) dp[i][j]=dp[i-1][j-1];
        else dp[i][j]=Math.min(dp[i-1][j]+s1.charCodeAt(i-1),dp[i][j-1]+s2.charCodeAt(j-1));
    }
    return dp[m][n];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Decode Ways',
      url: 'https://leetcode.com/problems/decode-ways/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DP — number of ways to decode prefix',
          explanation: `dp[i] = ways to decode s[0..i-1]. dp[0]=1 (empty). For each position i, check single digit (s[i-1] != '0') and two-digit (10..26). Add corresponding dp[i-1] or dp[i-2].`,
          code: `var numDecodings = function(s) {
    const n=s.length;
    const dp=new Array(n+1).fill(0); dp[0]=1;
    dp[1]=s[0]==='0'?0:1;
    for(let i=2;i<=n;i++){
        const one=+s[i-1], two=+(s[i-2]+s[i-1]);
        if(one>=1) dp[i]+=dp[i-1];
        if(two>=10&&two<=26) dp[i]+=dp[i-2];
    }
    return dp[n];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🏗️',
      color: 'blue',
      content: `**String construction patterns:**\n- Edit distance: 2D DP, transitions on match vs mismatch\n- Word ladder: BFS on word graph, change 1 char per step\n- Decode ways: 1D DP, try 1-digit and 2-digit decodings\n- Anagram steps: frequency difference sum\n\n**Edit distance variants:** Weighted costs (ASCII delete sum), only insertions/deletions (LCS-based: cost = m+n - 2*LCS), one string to empty (just delete all).\n\n**Key optimization:** For edit distance with only insert/delete, use LCS: min_ops = m + n - 2 * LCS(s, t).`,
    },
  ],
}
