import type { Article } from '../articles'

export const lyndonFactorizationArticle: Article = {
  slug: 'lyndon-factorization',
  title: 'Lyndon Factorization',
  emoji: '🔤',
  tagline: 'Every string = unique product of decreasing Lyndon words. Duval\'s algorithm O(n).',
  description: 'A Lyndon word is a string strictly smaller than all its proper rotations. Every string has a unique Lyndon factorization: s = w₁w₂...wₖ where w₁ ≥ w₂ ≥ ... ≥ wₖ lexicographically and each wᵢ is a Lyndon word. Duval\'s algorithm computes this in O(n) time and O(1) space. Applications: finding the lexicographically smallest rotation, string decomposition, and combinatorics on words.',
  gradient: 'from-purple-800 to-violet-900',
  topicSlug: 'dp',
  readTime: '12 min',
  sections: [
    {
      type: 'text',
      content: `A Lyndon word is the lexicographically smallest string in its equivalence class of rotations. Examples: "a", "ab", "aab", "abb". Duval's algorithm: maintain current position i and "current Lyndon word" starting at some position. Compare s[i] with the next character expected by repeating the current Lyndon word. Build the factorization in-place in O(n) total comparisons.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: "Duval's Lyndon factorization algorithm",
      code: `// Returns array of [start, end) positions for each Lyndon word in s
function lyndonFactorization(s) {
    const n = s.length;
    const result = [];
    let i = 0;
    while (i < n) {
        let j = i, k = i + 1;
        while (k < n && s[j] <= s[k]) {
            if (s[j] < s[k]) j = i; // restart comparison
            else j++;
            k++;
        }
        // s[i..k-1] can be extended; s[i..i+(k-j-1)] is a Lyndon word
        while (i <= j) {
            result.push([i, i + (k - j)]); // Lyndon word is s[i..i+(k-j)-1]
            i += k - j;
        }
    }
    return result;
}

// Lexicographically smallest rotation = starting point of the last Lyndon word
// in the factorization of s+s (Booth's algorithm via Lyndon)
function minRotation(s) {
    const factors = lyndonFactorization(s + s);
    // The last Lyndon word that starts in the first half
    let best = 0;
    for (const [start] of factors) {
        if (start < s.length) best = start;
        else break;
    }
    return best;
}

// Check if string is a Lyndon word
function isLyndon(s) {
    const n = s.length;
    // A Lyndon word is strictly less than all its non-trivial rotations
    for (let r = 1; r < n; r++) {
        if (s.slice(r) + s.slice(0, r) <= s) return false;
    }
    return true;
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
      title: 'Lexicographically Smallest Rotation',
      url: 'https://leetcode.com/problems/orderly-queue/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: k=1 → find min rotation; k≥2 → sort',
          explanation: `With k=1: only rotations are possible. Find lexicographically smallest. With k≥2: can achieve any permutation (like bubble sort) → sort characters.`,
          code: `var orderlyQueue = function(s, k) {
    if(k>=2) return s.split('').sort().join('');
    // Find minimum rotation using Booth's / Lyndon
    let best=s;
    for(let i=1;i<s.length;i++){
        const r=s.slice(i)+s.slice(0,i);
        if(r<best) best=r;
    }
    return best;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Concatenated Words',
      url: 'https://leetcode.com/problems/concatenated-words/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: DP for each word — can it be formed from shorter words?',
          explanation: `Sort words by length. For each word, check if it can be split into ≥2 words from the set. DP: dp[i] = can s[0..i-1] be formed from words. Answer = words where dp[len] = true and we used ≥2 words.`,
          code: `var findAllConcatenatedWordsInADict = function(words) {
    const set=new Set(words);
    const canForm=(w)=>{
        if(!w) return true;
        const n=w.length;
        const dp=new Array(n+1).fill(false); dp[0]=true;
        for(let i=1;i<=n;i++) for(let j=0;j<i;j++)
            if(dp[j]&&(j>0||i<n)&&set.has(w.slice(j,i))){dp[i]=true;break;}
        return dp[n];
    };
    return words.filter(canForm);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Distinct Subsequences',
      url: 'https://leetcode.com/problems/distinct-subsequences/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: DP — count ways to match t as subsequence of s',
          explanation: `dp[i][j] = number of ways to form t[0..j-1] from s[0..i-1] as subsequence. If s[i-1] = t[j-1]: dp[i][j] = dp[i-1][j-1] + dp[i-1][j]. Else: dp[i][j] = dp[i-1][j].`,
          code: `var numDistinct = function(s, t) {
    const m=s.length,n=t.length;
    const dp=new Array(m+1).fill(0).map(()=>new Array(n+1).fill(0));
    for(let i=0;i<=m;i++) dp[i][0]=1;
    for(let i=1;i<=m;i++) for(let j=1;j<=n;j++){
        dp[i][j]=dp[i-1][j];
        if(s[i-1]===t[j-1]) dp[i][j]+=dp[i-1][j-1];
    }
    return dp[m][n];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🔤',
      color: 'blue',
      content: `**Lyndon word properties:**\n- Strictly smallest among all rotations (not just ≤, but <)\n- Any string can be uniquely factored into decreasing Lyndon words\n- The factorization is computable in O(n) time, O(1) extra space\n\n**Duval's algorithm intuition:** Maintain a "window" that is a power of the current candidate Lyndon word. When extending fails, extract complete Lyndon word copies from the window.\n\n**Applications:**\n- Lexicographically smallest rotation: the starting index of the first Lyndon word in the factorization of s+s\n- String combinatorics: free Lie algebra basis elements are Lyndon words\n- Generating necklace representatives for equivalence classes`,
    },
  ],
}
