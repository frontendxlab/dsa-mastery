import type { Article } from '../articles'

export const wordBreakVariantsArticle: Article = {
  slug: 'word-break-variants',
  title: 'Word Break & String Segmentation',
  emoji: '📝',
  tagline: 'Can we split a string into valid words? DP with trie or set lookup.',
  description: 'Word break problems split a string into words from a dictionary. Variants: (1) can we split at all? (DP + set); (2) count ways to split; (3) return all valid splits (backtracking + memoization); (4) minimum cuts to make all parts valid; (5) decode ways (numeric strings). Core DP: dp[i] = can we split s[0..i-1] where dp[j] = true and s[j..i-1] is in dictionary.',
  gradient: 'from-blue-700 to-indigo-800',
  topicSlug: 'dp',
  readTime: '15 min',
  sections: [
    {
      type: 'text',
      content: `Word break DP: dp[i] = true if s[0..i-1] can be segmented. Transition: dp[i] = true if ∃ j<i where dp[j]=true and s[j..i-1] is in the word set. O(n²) per lookup. Optimization: use a trie to match backward from position i — only check lengths that are valid word lengths. For count and all solutions: replace boolean dp with count/list.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Word break DP templates',
      code: `// Can we segment? O(n²) with set, O(n × maxWordLen) with trie
function canSegment(s, wordSet) {
    const n = s.length;
    const dp = new Array(n + 1).fill(false); dp[0] = true;
    for (let i = 1; i <= n; i++)
        for (let j = 0; j < i; j++)
            if (dp[j] && wordSet.has(s.slice(j, i))) { dp[i] = true; break; }
    return dp[n];
}

// Count ways to segment
function countSegments(s, wordSet) {
    const n = s.length;
    const dp = new Array(n + 1).fill(0); dp[0] = 1;
    for (let i = 1; i <= n; i++)
        for (let j = 0; j < i; j++)
            if (dp[j] && wordSet.has(s.slice(j, i))) dp[i] += dp[j];
    return dp[n];
}

// All valid segments (backtracking + memoization)
function allSegments(s, wordSet) {
    const memo = new Map();
    function dfs(start) {
        if (memo.has(start)) return memo.get(start);
        if (start === s.length) return [''];
        const result = [];
        for (let end = start + 1; end <= s.length; end++) {
            const word = s.slice(start, end);
            if (wordSet.has(word)) {
                const rest = dfs(end);
                for (const r of rest) result.push(r ? word + ' ' + r : word);
            }
        }
        memo.set(start, result);
        return result;
    }
    return dfs(0);
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
      title: 'Word Break',
      url: 'https://leetcode.com/problems/word-break/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DP with set lookup',
          explanation: `dp[i] = can we segment s[0..i-1]. For each position, check all possible last words ending at i.`,
          code: `var wordBreak = function(s, wordDict) {
    const set=new Set(wordDict), n=s.length;
    const dp=new Array(n+1).fill(false); dp[0]=true;
    for(let i=1;i<=n;i++)
        for(let j=0;j<i&&!dp[i];j++)
            if(dp[j]&&set.has(s.slice(j,i))) dp[i]=true;
    return dp[n];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Word Break II',
      url: 'https://leetcode.com/problems/word-break-ii/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Backtracking + memoization',
          explanation: `From each position, try all words that match the prefix. Recurse on the remaining string. Cache results by position to avoid recomputation.`,
          code: `var wordBreak = function(s, wordDict) {
    const set=new Set(wordDict), memo=new Map();
    const dfs=(i)=>{
        if(memo.has(i)) return memo.get(i);
        if(i===s.length) return [''];
        const res=[];
        for(let j=i+1;j<=s.length;j++){
            const w=s.slice(i,j);
            if(set.has(w)) for(const r of dfs(j)) res.push(r?w+' '+r:w);
        }
        memo.set(i,res); return res;
    };
    return dfs(0);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Decode Ways',
      url: 'https://leetcode.com/problems/decode-ways/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DP — single digit or double digit decode',
          explanation: `dp[i] = ways to decode s[0..i-1]. Each digit can be decoded alone (if non-zero) or with previous digit (if 10-26). dp[i] = dp[i-1] (if s[i-1]!='0') + dp[i-2] (if s[i-2..i-1] in [10,26]).`,
          code: `var numDecodings = function(s) {
    const n=s.length;
    const dp=new Array(n+1).fill(0); dp[0]=1;
    dp[1]=s[0]!=='0'?1:0;
    for(let i=2;i<=n;i++){
        if(s[i-1]!=='0') dp[i]+=dp[i-1];
        const two=+s.slice(i-2,i);
        if(two>=10&&two<=26) dp[i]+=dp[i-2];
    }
    return dp[n];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Extra Characters in a String',
      url: 'https://leetcode.com/problems/extra-characters-in-a-string/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DP — minimum characters left over',
          explanation: `dp[i] = min extra chars in s[0..i-1]. For each position, try all words from the dictionary ending here. dp[i] = min(dp[i-1]+1, dp[i-len] if s[i-len..i-1] is in dict).`,
          code: `var minExtraChar = function(s, dictionary) {
    const set=new Set(dictionary), n=s.length;
    const dp=new Array(n+1).fill(0);
    for(let i=1;i<=n;i++){
        dp[i]=dp[i-1]+1; // skip this char
        for(const w of set){
            if(i>=w.length&&s.slice(i-w.length,i)===w)
                dp[i]=Math.min(dp[i],dp[i-w.length]);
        }
    }
    return dp[n];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Minimum Cost to Separate Sentence Into Rows',
      url: 'https://leetcode.com/problems/minimum-cost-to-separate-sentence-into-rows/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DP — minimize penalty for each line split',
          explanation: `dp[i] = minimum total cost using first i words. For each line ending at word j: cost = (k - length)² where length = sum of word lengths + spaces. dp[j] = min(dp[i] + cost(i+1..j)) for all valid i.`,
          code: `var minimumCost = function(sentence, k) {
    const words=sentence.split(' '), n=words.length;
    const dp=new Array(n+1).fill(Infinity); dp[0]=0;
    for(let i=1;i<=n;i++){
        let len=0;
        for(let j=i;j>=1;j--){
            len+=words[j-1].length+(j<i?1:0);
            if(len>k) break;
            const cost=i<n?(k-len)**2:0; // no penalty for last line
            dp[i]=Math.min(dp[i],dp[j-1]+cost);
        }
    }
    return dp[n];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '📝',
      color: 'blue',
      content: `**Word break DP pattern:**\n- Can segment: dp[i] = OR over valid splits ending at i\n- Count ways: dp[i] = SUM over valid splits\n- Min cost: dp[i] = MIN over valid splits + cost\n- All solutions: backtracking + memoize by position\n\n**Optimization for large dictionaries:**\n- Trie lookup: match backward from position i, stop when no prefix exists\n- Max word length: only check j in [i-maxLen, i)\n\n**Decode ways variants:**\n- Numeric: digits decode to 1-26\n- With wildcard '*': count possible decodings\n- With forbidden sequences: add extra DP states`,
    },
  ],
}
