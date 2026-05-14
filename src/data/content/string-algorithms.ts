import type { Article } from '../articles'

export const stringArticle: Article = {
  slug: 'string-algorithms',
  title: 'String Algorithms',
  emoji: '📝',
  tagline: 'KMP, Z-algo, rolling hash — pattern matching in O(n).',
  description: 'String problems range from simple two-pointer palindrome checks to heavy KMP pattern matching and suffix arrays. Master the LPS array, Z-function, and Rabin-Karp rolling hash to handle any string pattern problem.',
  gradient: 'from-rose-400 to-pink-500',
  topicSlug: 'string',
  readTime: '20 min',
  sections: [
    {
      type: 'text',
      content: `String algorithms solve the "find pattern P in text T" problem faster than the naive O(n×m). The key insight in KMP: when a mismatch happens, the prefix already matched tells us how far we can skip. The key insight in Z-algorithm: Z[i] = length of longest match starting at i and the start of the string. Both run in O(n+m).`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'KMP — Knuth-Morris-Pratt',
    },
    {
      type: 'callout',
      icon: '🔑',
      color: 'teal',
      content: `**LPS array** (Longest Proper Prefix that is also a Suffix): lps[i] = length of longest prefix of pattern[0..i] that is also a suffix.\n\nKMP uses lps to avoid re-examining characters after a mismatch. When mismatch at pattern[j] and text[i], we jump j back to lps[j-1] instead of starting over.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Build LPS array + KMP search',
      code: `function buildLPS(pattern) {
    const lps = new Array(pattern.length).fill(0);
    let len = 0, i = 1;
    while (i < pattern.length) {
        if (pattern[i] === pattern[len]) {
            lps[i++] = ++len;
        } else if (len > 0) {
            len = lps[len - 1];   // fall back using LPS (don't increment i)
        } else {
            lps[i++] = 0;
        }
    }
    return lps;
}

function kmpSearch(text, pattern) {
    const lps = buildLPS(pattern);
    const matches = [];
    let i = 0, j = 0;
    while (i < text.length) {
        if (text[i] === pattern[j]) { i++; j++; }
        if (j === pattern.length) {
            matches.push(i - j);   // found at index i-j
            j = lps[j - 1];
        } else if (i < text.length && text[i] !== pattern[j]) {
            j > 0 ? j = lps[j - 1] : i++;
        }
    }
    return matches;
}

// LPS trick: check if s is rotation of t
// s + s contains t iff s is rotation of t → KMP(s+s, t)`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Z-Algorithm',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Z-function — Z[i] = longest match starting at i',
      code: `function buildZ(s) {
    const n = s.length, z = new Array(n).fill(0);
    z[0] = n;
    let l = 0, r = 0;
    for (let i = 1; i < n; i++) {
        if (i < r) z[i] = Math.min(r - i, z[i - l]);
        while (i + z[i] < n && s[z[i]] === s[i + z[i]]) z[i]++;
        if (i + z[i] > r) { l = i; r = i + z[i]; }
    }
    return z;
}

// Pattern search with Z: build Z(pattern + '#' + text)
// Any Z[i] (in the text part) === pattern.length → match at i
function zSearch(text, pattern) {
    const combined = pattern + '#' + text;
    const z = buildZ(combined);
    const matches = [];
    for (let i = pattern.length + 1; i < combined.length; i++)
        if (z[i] === pattern.length) matches.push(i - pattern.length - 1);
    return matches;
}`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Rabin-Karp Rolling Hash',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Rolling hash for substring matching',
      code: `// Hash of window moves in O(1): subtract outgoing char, add incoming char
function rabinKarp(text, pattern) {
    const BASE = 31, MOD = 1_000_000_007;
    const n = text.length, m = pattern.length;
    const matches = [];

    // Precompute powers
    const power = new Array(m + 1).fill(1);
    for (let i = 1; i <= m; i++) power[i] = power[i-1] * BASE % MOD;

    // Hash pattern
    let pHash = 0;
    for (let i = 0; i < m; i++)
        pHash = (pHash * BASE + (pattern.charCodeAt(i) - 96)) % MOD;

    // Rolling hash on text
    let wHash = 0;
    for (let i = 0; i < n; i++) {
        wHash = (wHash * BASE + (text.charCodeAt(i) - 96)) % MOD;
        if (i >= m) {
            wHash = (wHash - (text.charCodeAt(i - m) - 96) * power[m] % MOD + MOD) % MOD;
        }
        if (i >= m - 1 && wHash === pHash) {
            // Verify to avoid collision (O(m) but rare)
            if (text.slice(i - m + 1, i + 1) === pattern) matches.push(i - m + 1);
        }
    }
    return matches;
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
      title: 'Find the Index of the First Occurrence in a String',
      url: 'https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Built-in — indexOf()',
          explanation: `In an interview context, str.indexOf(needle) is O(n*m) worst case but O(n) average. Fine for most practical inputs.`,
          code: `var strStr = function(haystack, needle) { return haystack.indexOf(needle); };`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: KMP — guaranteed O(n+m)',
          explanation: `Build LPS for needle. Then match through haystack using KMP. Return first match position. This is the "correct" algorithm-theory answer.`,
          code: `var strStr = function(haystack, needle) {
    const lps = buildLPS(needle);
    let i = 0, j = 0;
    while (i < haystack.length) {
        if (haystack[i] === needle[j]) { i++; j++; }
        if (j === needle.length) return i - j;
        else if (i < haystack.length && haystack[i] !== needle[j]) {
            j > 0 ? j = lps[j-1] : i++;
        }
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
      title: 'Longest Palindromic Substring',
      url: 'https://leetcode.com/problems/longest-palindromic-substring/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Expand around center — O(n²)',
          explanation: `For each position (and each gap between positions), expand outward as long as characters match. Track the longest palindrome found. O(n²) time, O(1) space.`,
          code: `var longestPalindrome = function(s) {
    let start = 0, maxLen = 1;
    const expand = (l, r) => {
        while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }
        if (r - l - 1 > maxLen) { maxLen = r - l - 1; start = l + 1; }
    };
    for (let i = 0; i < s.length; i++) {
        expand(i, i);      // odd length centers
        expand(i, i + 1);  // even length centers
    }
    return s.slice(start, start + maxLen);
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Manacher\'s algorithm — O(n)',
          explanation: `Transform string with separators: "abc" → "#a#b#c#". Run Manacher to find palindrome radius at every center in O(n). The Z-function trick makes this linear.`,
          codeCaption: 'The O(n) approach — useful for very large strings',
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
          label: 'Intuition 1: KMP trick — check if s is rotation of itself with period',
          explanation: `If s has a repeated pattern of length k, then s is a rotation of itself with shift k. The trick: (s + s).slice(1, -1).includes(s) — if true, s has a repeated pattern. This works because KMP's LPS tells us the longest proper prefix that's also a suffix; if that divides the full length evenly, it's the pattern.`,
          code: `var repeatedSubstringPattern = function(s) {
    return (s + s).slice(1, -1).includes(s);
    // or with KMP LPS:
    // const lps = buildLPS(s);
    // const period = s.length - lps[s.length - 1];
    // return s.length % period === 0 && period !== s.length;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Shortest Matching Substring (KMP with 3 patterns)',
      url: 'https://leetcode.com/problems/shortest-matching-substring/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: KMP on each segment of pattern split by *',
          explanation: `Pattern = p*m*s (split by wildcards). Build LPS for each of p, m, s on text: "p#text", "m#text", "s#text". Search for minimum window [i..k] where prefix p ends at i, mid m appears after i, suffix s ends at k. Slide three pointers i, j, k ensuring proper ordering.`,
          code: `// See: build LPS for (segment + '#' + text), slice off segment.length+1
// Then iterate i,j,k with while loops ensuring j > i and k > j
// ans = Math.min(ans, k - i + prefix.length)`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'green',
      content: `**KMP "buffer string" trick**: When building LPS of pattern on text, create "pattern + '#' + text". The '#' separator ensures the LPS of the combined string in the text portion never exceeds pattern.length. Access text positions at offset = pattern.length + 1.`,
    },
  ],
}
