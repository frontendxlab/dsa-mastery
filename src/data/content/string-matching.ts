import type { Article } from '../articles'

export const stringMatchingArticle: Article = {
  slug: 'string-matching',
  title: 'String Matching Algorithms',
  emoji: '🔎',
  tagline: 'KMP: O(n+m) search using failure function. Rabin-Karp: hash-based. Z-algorithm: substring in O(n).',
  description: 'String pattern matching goes from O(n·m) brute force to O(n+m) with KMP. Learn the KMP failure function (LPS array), Z-algorithm for all prefix-suffix matches, and Rabin-Karp for multi-pattern hashing. Used in autocomplete, plagiarism detection, DNA matching.',
  gradient: 'from-pink-400 to-rose-500',
  topicSlug: 'string',
  readTime: '20 min',
  sections: [
    {
      type: 'text',
      content: `String matching asks: does pattern P appear in text T? The brute force tries every position in T and checks character by character — O(n·m). The key insight behind KMP: when a mismatch occurs, we've already matched some prefix of P. That prefix tells us how far we can skip without missing a match. This "partial match" information is precomputed into the LPS (Longest Proper Prefix which is also Suffix) array.`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'KMP Algorithm',
    },
    {
      type: 'callout',
      icon: '🔑',
      color: 'teal',
      content: `**LPS array (failure function):** lps[i] = length of longest proper prefix of pattern[0..i] that is also a suffix.\n\nExample: pattern = "AAACAAAA"\nlps = [0, 1, 2, 0, 1, 2, 3, 3]\n\nDuring matching: on mismatch at pattern[j], DON'T reset j to 0. Instead j = lps[j-1]. This skips positions we already know match.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'KMP — O(n + m) pattern search',
      code: `// Build LPS (Longest Proper Prefix = Suffix) array for pattern
function buildLPS(pattern) {
    const lps = new Array(pattern.length).fill(0);
    let len = 0, i = 1;
    while (i < pattern.length) {
        if (pattern[i] === pattern[len]) {
            lps[i++] = ++len;
        } else if (len > 0) {
            len = lps[len - 1]; // backtrack using LPS (don't reset i)
        } else {
            lps[i++] = 0;
        }
    }
    return lps;
}

// Search for all occurrences of pattern in text
function kmpSearch(text, pattern) {
    const lps = buildLPS(pattern);
    const positions = [];
    let i = 0, j = 0; // i = text index, j = pattern index
    while (i < text.length) {
        if (text[i] === pattern[j]) {
            i++; j++;
        }
        if (j === pattern.length) {
            positions.push(i - j); // found match at position i-j
            j = lps[j - 1];        // continue searching
        } else if (i < text.length && text[i] !== pattern[j]) {
            if (j > 0) j = lps[j - 1]; // skip using LPS
            else i++;
        }
    }
    return positions;
}`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Z-Algorithm',
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'blue',
      content: `**Z-array:** z[i] = length of the longest substring starting at position i that is also a prefix of the string.\n\nz[0] is undefined (or set to n by convention).\nz[1] = length of longest prefix of s that matches s[1..]\n\n**Pattern matching with Z:** Concatenate pattern + '$' + text. Build Z-array. Any Z[i] >= len(pattern) means pattern found at position i - len(pattern) - 1 in text.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Z-algorithm — O(n)',
      code: `function buildZ(s) {
    const n = s.length, z = new Array(n).fill(0);
    let l = 0, r = 0;
    for (let i = 1; i < n; i++) {
        if (i < r) z[i] = Math.min(r - i, z[i - l]);
        while (i + z[i] < n && s[z[i]] === s[i + z[i]]) z[i]++;
        if (i + z[i] > r) { l = i; r = i + z[i]; }
    }
    return z;
}

// Find all pattern occurrences using Z-algorithm
function zSearch(text, pattern) {
    const s = pattern + '$' + text; // separator prevents match across boundary
    const z = buildZ(s);
    const positions = [], m = pattern.length;
    for (let i = m + 1; i < s.length; i++)
        if (z[i] >= m) positions.push(i - m - 1); // found at text position i-m-1
    return positions;
}`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Rabin-Karp (Rolling Hash)',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Rabin-Karp — O(n) average, O(nm) worst case',
      code: `// Rolling hash for substring search
function rabinKarp(text, pattern) {
    const BASE = 31, MOD = 1_000_000_007;
    const n = text.length, m = pattern.length;

    // Hash of pattern
    let patHash = 0, pow = 1;
    for (let i = 0; i < m; i++) {
        patHash = (patHash + (pattern.charCodeAt(i) - 96) * pow) % MOD;
        if (i < m - 1) pow = pow * BASE % MOD;
    }

    // Hash of first window, then slide
    let winHash = 0, positions = [];
    for (let i = 0; i < n; i++) {
        winHash = (winHash + (text.charCodeAt(i) - 96) * (i < m ? pow : 1)) % MOD;
        if (i >= m) {
            // Remove leftmost character
            winHash = (winHash - (text.charCodeAt(i-m) - 96) + MOD) % MOD;
            winHash = winHash * modInverse(BASE, MOD) % MOD; // divide by BASE
        }
        if (i >= m - 1 && winHash === patHash) {
            // Hash match: verify (handles collisions)
            if (text.slice(i - m + 1, i + 1) === pattern)
                positions.push(i - m + 1);
        }
    }
    return positions;
}

// Easier rolling hash: add new char, remove old char
// Rabin-Karp shines for MULTIPLE patterns: hash all patterns, single pass over text`,
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
          label: 'Intuition 1: O(n·m) brute force — try every starting position',
          explanation: 'For each position i in haystack, try matching needle starting at i. O((n-m+1)·m) in worst case.',
        },
        {
          label: 'Intuition 2: KMP — O(n + m)',
          explanation: 'Build LPS array for needle. Scan haystack using KMP. First match returns the position.',
          code: `var strStr = function(haystack, needle) {
    if (!needle.length) return 0;
    const lps = buildLPS(needle);
    let i = 0, j = 0;
    while (i < haystack.length) {
        if (haystack[i] === needle[j]) { i++; j++; }
        if (j === needle.length) return i - j; // first match
        else if (i < haystack.length && haystack[i] !== needle[j]) {
            if (j) j = lps[j-1];
            else i++;
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
      title: 'Repeated Substring Pattern',
      url: 'https://leetcode.com/problems/repeated-substring-pattern/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: KMP trick — if s is built from a repeated unit, lps[n-1] tells us',
          explanation: 'Build LPS for s. The last LPS value = length of longest proper prefix = suffix. If lps[n-1] > 0 and n % (n - lps[n-1]) === 0, then s is a repetition of s[0..n-lps[n-1]-1].',
          code: `var repeatedSubstringPattern = function(s) {
    const n = s.length;
    const lps = buildLPS(s);
    const period = n - lps[n - 1]; // length of the repeating unit
    return period !== n && n % period === 0;
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Rotation trick — if s + s contains s at position other than 0 and n',
          explanation: 's is a repeated pattern iff s appears in (s+s) at some index other than 0 and n. Just remove first and last char to prevent trivial matches.',
          code: `var repeatedSubstringPattern = function(s) {
    return (s + s).slice(1, -1).includes(s);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Shortest Palindrome',
      url: 'https://leetcode.com/problems/shortest-palindrome/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: KMP on s + "#" + reverse(s)',
          explanation: 'Find longest palindrome prefix of s. Use KMP: concatenate s + "#" + reverse(s). The LPS of the last character gives the length of the longest palindromic prefix. Prepend the remaining suffix (reversed) to s.',
          code: `var shortestPalindrome = function(s) {
    const rev = s.split('').reverse().join('');
    const combined = s + '#' + rev;
    const lps = buildLPS(combined);
    const palindromeLen = lps[combined.length - 1]; // longest palindrome prefix
    return rev.slice(0, s.length - palindromeLen) + s;
};`,
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
      num: 4,
      title: 'Count Occurrences of Anagram',
      url: 'https://leetcode.com/problems/find-all-anagrams-in-a-string/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Rolling hash — Rabin-Karp on sorted character multisets',
          explanation: `Hash each window as the product of prime(char) for each char. This is order-independent. Window of size p.length: slide by removing leftmost char hash and adding rightmost. If window hash === pattern hash, it's an anagram.`,
          code: `var findAnagrams = function(s, p) {
    // Use character frequency instead of hash for correctness
    const pMap = new Array(26).fill(0);
    const wMap = new Array(26).fill(0);
    for (const c of p) pMap[c.charCodeAt(0)-97]++;
    const result = [], k = p.length;
    for (let i = 0; i < s.length; i++) {
        wMap[s.charCodeAt(i)-97]++;
        if (i >= k) wMap[s.charCodeAt(i-k)-97]--;
        if (i >= k-1 && pMap.join(',') === wMap.join(',')) result.push(i-k+1);
    }
    return result;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Longest Happy Prefix (KMP LPS application)',
      url: 'https://leetcode.com/problems/longest-happy-prefix/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Build KMP LPS — last value is the answer',
          explanation: `A "happy prefix" is a prefix that is also a suffix (non-trivial). This is exactly what KMP's LPS array computes. Build LPS for s, return s.slice(0, lps[n-1]).`,
          code: `var longestPrefix = function(s) {
    const n = s.length;
    const lps = new Array(n).fill(0);
    let len = 0, i = 1;
    while (i < n) {
        if (s[i] === s[len]) { lps[i++] = ++len; }
        else if (len) len = lps[len-1];
        else lps[i++] = 0;
    }
    return s.slice(0, lps[n-1]); // longest proper prefix = suffix
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 6,
      title: 'Implement strStr (Rabin-Karp variant)',
      url: 'https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Rabin-Karp rolling hash — O(n+m) average',
          explanation: `Hash the needle. Slide a window of size m over haystack, maintaining rolling hash. On hash match, verify character by character (avoid false positives). Rolling hash: remove leftmost char, add new rightmost char using modular arithmetic.`,
          code: `var strStr = function(haystack, needle) {
    const n=haystack.length, m=needle.length;
    if(m>n) return -1;
    const BASE=31, MOD=1e9+7;
    let nHash=0, hHash=0, power=1;
    for(let i=0;i<m;i++){
        nHash=(nHash*BASE+(needle.charCodeAt(i)-96))%MOD;
        hHash=(hHash*BASE+(haystack.charCodeAt(i)-96))%MOD;
        if(i>0) power=power*BASE%MOD;
    }
    if(nHash===hHash && haystack.slice(0,m)===needle) return 0;
    for(let i=1;i<=n-m;i++){
        hHash=(hHash-(haystack.charCodeAt(i-1)-96)*power%MOD+MOD)%MOD;
        hHash=(hHash*BASE+(haystack.charCodeAt(i+m-1)-96))%MOD;
        if(hHash===nHash && haystack.slice(i,i+m)===needle) return i;
    }
    return -1;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧠',
      color: 'green',
      content: `**String matching algorithm selector:**\n- Single pattern in text → KMP (O(n+m), deterministic)\n- Multiple patterns in text → Aho-Corasick (build trie of all patterns, single pass)\n- Substring comparison / all prefix-suffix matches → Z-algorithm\n- Rolling hash / multiple patterns / competitive → Rabin-Karp\n- "Repeated substring" / "palindrome prefix" → LPS/KMP tricks\n- "Longest prefix = suffix" → lps[n-1] (KMP LPS last value)`,
    },
  ],
}
