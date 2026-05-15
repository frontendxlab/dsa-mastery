import type { Article } from '../articles'

export const zFunctionArticle: Article = {
  slug: 'z-function',
  title: 'Z-Function & String Matching',
  emoji: 'Ζ',
  tagline: 'z[i] = length of longest string starting at i that matches a prefix. O(n) pattern matching.',
  description: 'The Z-function z[i] gives the length of the longest substring starting at position i that is also a prefix of the string. Z-function enables O(n + m) pattern matching (concatenate pattern + "$" + text, find z[i] = len(pattern)) and many string problems. Complements KMP: both solve the same problems but from different perspectives (Z uses explicit lengths, KMP uses failure links).',
  gradient: 'from-cyan-600 to-teal-700',
  topicSlug: 'dp',
  readTime: '13 min',
  sections: [
    {
      type: 'text',
      content: `Z-function is conceptually simpler than KMP. z[i] = length of longest string starting at i that matches a prefix of the whole string (z[0] = 0 by convention). Compute in O(n) using a window [l, r] that tracks the rightmost Z-box seen. If i < r, z[i] ≥ min(z[i-l], r-i+1), then extend manually. Pattern matching: form s = pattern + "$" + text. Any position where z[i] = len(pattern) is a match.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Z-function computation and pattern matching',
      code: `// Compute Z-function in O(n)
function zFunction(s) {
    const n = s.length, z = new Array(n).fill(0);
    let l = 0, r = 0;
    for (let i = 1; i < n; i++) {
        if (i < r) z[i] = Math.min(r - i, z[i - l]);
        while (i + z[i] < n && s[z[i]] === s[i + z[i]]) z[i]++;
        if (i + z[i] > r) { l = i; r = i + z[i]; }
    }
    return z; // z[0] = 0 by convention
}

// Pattern matching: find all occurrences of pattern in text
function findAll(text, pattern) {
    const s = pattern + '$' + text; // '$' must not appear in pattern/text
    const z = zFunction(s);
    const m = pattern.length, positions = [];
    for (let i = m + 1; i < s.length; i++) {
        if (z[i] === m) positions.push(i - m - 1); // position in text
    }
    return positions;
}

// Also useful:
// Number of times pattern appears as prefix of all suffixes = z values
// Minimum period of string: smallest p such that s[i] = s[i-p] for all i >= p
// Minimum period = n - z[n - z[n-1]] ... find with Z-function`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Find the Index of the First Occurrence in a String',
      url: 'https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Z-function pattern matching',
          explanation: `Concatenate needle + "#" + haystack. Compute Z-function. First index where z[i] = len(needle) gives the match position.`,
          code: `var strStr = function(haystack, needle) {
    if(!needle.length) return 0;
    const s=needle+'#'+haystack, m=needle.length;
    const z=new Array(s.length).fill(0);
    let l=0,r=0;
    for(let i=1;i<s.length;i++){
        if(i<r) z[i]=Math.min(r-i,z[i-l]);
        while(i+z[i]<s.length&&s[z[i]]===s[i+z[i]]) z[i]++;
        if(i+z[i]>r){l=i;r=i+z[i];}
        if(z[i]===m) return i-m-1;
    }
    return -1;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Shortest Palindrome',
      url: 'https://leetcode.com/problems/shortest-palindrome/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Z-function on s + "#" + reverse(s)',
          explanation: `Find longest palindromic prefix: the answer is how much of s from the start forms a palindrome. Concat s + "#" + reverse(s), compute Z-function. The Z value at position (n+1) in the combined string gives longest prefix of s that matches a prefix of reverse(s) = palindromic prefix length.`,
          code: `var shortestPalindrome = function(s) {
    const rev=s.split('').reverse().join('');
    const t=s+'#'+rev, n=s.length;
    const z=new Array(t.length).fill(0);
    let l=0,r=0;
    for(let i=1;i<t.length;i++){
        if(i<r) z[i]=Math.min(r-i,z[i-l]);
        while(i+z[i]<t.length&&t[z[i]]===t[i+z[i]]) z[i]++;
        if(i+z[i]>r){l=i;r=i+z[i];}
    }
    const palLen=z[2*n+1]; // longest palindromic prefix of s
    return rev.slice(0,n-palLen)+s;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Repeated Substring Pattern',
      url: 'https://leetcode.com/problems/repeated-substring-pattern/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: String doubling trick',
          explanation: `If s has a repeated pattern, (s+s).slice(1,-1) still contains s. One-liner.`,
          code: `var repeatedSubstringPattern = function(s) {
    return (s+s).slice(1,-1).includes(s);
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Z-function — find period',
          explanation: `Compute Z-function. For each position i, if z[i] = n - i (suffix is a prefix) AND n % i == 0, then i is a valid period length (s has period i).`,
          code: `var repeatedSubstringPattern = function(s) {
    const n=s.length;
    const z=new Array(n).fill(0); let l=0,r=0;
    for(let i=1;i<n;i++){
        if(i<r) z[i]=Math.min(r-i,z[i-l]);
        while(i+z[i]<n&&s[z[i]]===s[i+z[i]]) z[i]++;
        if(i+z[i]>r){l=i;r=i+z[i];}
    }
    for(let i=1;i<=n/2;i++) if(n%i===0&&z[i]===n-i) return true;
    return false;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Sum of Scores of Built Strings',
      url: 'https://leetcode.com/problems/sum-of-scores-of-built-strings/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Z-function — sum of Z values + n',
          explanation: `Score of s[i..n-1] = length of longest common prefix with s. This is exactly z[i] (for i > 0) and n (for i = 0). Answer = n + sum(z[1..n-1]).`,
          code: `var sumScores = function(s) {
    const n=s.length;
    const z=new Array(n).fill(0); let l=0,r=0;
    for(let i=1;i<n;i++){
        if(i<r) z[i]=Math.min(r-i,z[i-l]);
        while(i+z[i]<n&&s[z[i]]===s[i+z[i]]) z[i]++;
        if(i+z[i]>r){l=i;r=i+z[i];}
    }
    return n+z.reduce((a,b)=>a+b,0);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: 'Ζ',
      color: 'teal',
      content: `**Z-function vs KMP:**\n- Both solve the same problems in O(n)\n- Z: explicit "how far does this suffix match the prefix" — often more intuitive\n- KMP: failure function "what's the longest proper prefix-suffix" — better for streaming\n- Z is generally easier to implement and reason about\n\n**Key applications:**\n- Pattern matching in O(n + m): concat pattern + "#" + text, find z[i] = m\n- Minimum string period: first i where z[i] = n-i and n%i = 0\n- Palindrome queries: concat s + "#" + reverse(s)\n- Count prefix occurrences: z[i] > 0 means position i extends a prefix match`,
    },
  ],
}
