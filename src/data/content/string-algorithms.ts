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
      type: 'heading',
      level: 2,
      text: 'More Worked Problems',
    },
    {
      type: 'problem',
      num: 5,
      title: 'Minimum Window Substring',
      url: 'https://leetcode.com/problems/minimum-window-substring/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: O(n²) brute force — check every substring',
          explanation: `Generate all substrings, check each if it contains all of t's characters. O(n² × |t|).`,
        },
        {
          label: 'Intuition 2: Sliding window with need/have counts — O(n)',
          explanation: `"need" = frequency of each char in t. "have" = how many t-chars are satisfied in current window. Window is valid when have === need size. Expand right, when valid shrink from left. Track minimum valid window.`,
          code: `var minWindow = function(s, t) {
    if (!t.length) return '';
    const need = new Map(), have = new Map();
    for (const c of t) need.set(c, (need.get(c) ?? 0) + 1);
    let satisfied = 0, lo = 0, minLen = Infinity, ans = '';
    for (let hi = 0; hi < s.length; hi++) {
        const c = s[hi];
        have.set(c, (have.get(c) ?? 0) + 1);
        if (need.has(c) && have.get(c) === need.get(c)) satisfied++;
        while (satisfied === need.size) {
            if (hi - lo + 1 < minLen) { minLen = hi - lo + 1; ans = s.slice(lo, hi+1); }
            const lc = s[lo++];
            have.set(lc, have.get(lc) - 1);
            if (need.has(lc) && have.get(lc) < need.get(lc)) satisfied--;
        }
    }
    return ans;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 6,
      title: 'Valid Anagram',
      url: 'https://leetcode.com/problems/valid-anagram/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Sort both strings and compare',
          explanation: `Sort both strings. If equal, they are anagrams. O(n log n).`,
          code: `var isAnagram = function(s, t) {
    return s.length === t.length && [...s].sort().join('') === [...t].sort().join('');
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Character frequency array — O(n)',
          explanation: `Count character frequencies. Increment for s, decrement for t. If all counts are 0, they're anagrams.`,
          code: `var isAnagram = function(s, t) {
    if (s.length !== t.length) return false;
    const cnt = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
        cnt[s.charCodeAt(i) - 97]++;
        cnt[t.charCodeAt(i) - 97]--;
    }
    return cnt.every(c => c === 0);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 7,
      title: 'Longest Common Prefix',
      url: 'https://leetcode.com/problems/longest-common-prefix/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Vertical scan — compare column by column',
          explanation: `Check character at position i across all strings. If any string ends or has a different char, return the prefix so far.`,
          code: `var longestCommonPrefix = function(strs) {
    for (let i = 0; i < strs[0].length; i++)
        for (let j = 1; j < strs.length; j++)
            if (strs[j][i] !== strs[0][i]) return strs[0].slice(0, i);
    return strs[0];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 8,
      title: 'Find All Anagrams in a String',
      url: 'https://leetcode.com/problems/find-all-anagrams-in-a-string/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Fixed sliding window with frequency comparison',
          explanation: `Maintain a window of size p.length. Track how many characters have matching frequencies (satisfied count). Slide window: add right char, remove left char, update satisfied count. When satisfied === 26 (all chars match), record start index.`,
          code: `var findAnagrams = function(s, p) {
    if (s.length < p.length) return [];
    const pFreq = new Array(26).fill(0), wFreq = new Array(26).fill(0);
    for (const c of p) pFreq[c.charCodeAt(0)-97]++;
    let satisfied = 0;
    const result = [];
    // Count initially satisfied characters
    const check = i => pFreq[i] === wFreq[i];
    for (let i = 0; i < p.length; i++) {
        const idx = s.charCodeAt(i)-97;
        wFreq[idx]++;
    }
    satisfied = pFreq.filter((v,i) => v === wFreq[i]).length;
    if (satisfied === 26) result.push(0);
    for (let i = p.length; i < s.length; i++) {
        const addIdx = s.charCodeAt(i)-97;
        const remIdx = s.charCodeAt(i-p.length)-97;
        // Remove left char
        if (pFreq[remIdx] === wFreq[remIdx]) satisfied--;
        wFreq[remIdx]--;
        if (pFreq[remIdx] === wFreq[remIdx]) satisfied++;
        // Add right char
        if (pFreq[addIdx] === wFreq[addIdx]) satisfied--;
        wFreq[addIdx]++;
        if (pFreq[addIdx] === wFreq[addIdx]) satisfied++;
        if (satisfied === 26) result.push(i - p.length + 1);
    }
    return result;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'green',
      content: `**KMP "buffer string" trick**: When building LPS of pattern on text, create "pattern + '#' + text". The '#' separator ensures the LPS of the combined string in the text portion never exceeds pattern.length. Access text positions at offset = pattern.length + 1.\n\n**String pattern signals:**\n- "Anagram / permutation in string" → fixed sliding window + frequency array\n- "Minimum window containing all chars" → variable sliding window + need/have count\n- "Pattern matching guaranteed linear" → KMP\n- "Palindrome substring" → expand around center (O(n²)) or Manacher (O(n))\n- "Repeated pattern" → KMP LPS: if s.length % (s.length - lps.last) === 0, yes`,
    },
  ],
}
