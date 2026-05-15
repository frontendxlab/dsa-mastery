import type { Article } from '../articles'

export const stringRotationsArticle: Article = {
  slug: 'string-rotations',
  title: 'String Rotations & Booth\'s Algorithm',
  emoji: '🔃',
  tagline: 'Lexicographically minimum rotation in O(n). Check rotation in O(n) via concatenation.',
  description: 'String rotation problems: (1) check if string A is a rotation of B — B is a rotation of A iff B is a substring of A+A; (2) find the lexicographically smallest rotation — Booth\'s algorithm in O(n); (3) generate all rotations. These techniques appear in circular buffer problems, DNA sequence analysis, and any problem asking about cyclic equivalence classes.',
  gradient: 'from-lime-700 to-green-800',
  topicSlug: 'dp',
  readTime: '12 min',
  sections: [
    {
      type: 'text',
      content: `Rotation check: A is a rotation of B iff len(A) = len(B) and A is a substring of B+B. O(n) with KMP/hashing. Booth's algorithm: find the starting index of the lexicographically smallest rotation in O(n) using a "canonical rotation" technique. Key insight: maintain a "current best" position and a comparison with a "challenge" position, advancing both along the doubled string.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: "Booth's algorithm for minimum rotation",
      code: `// Booth's algorithm: find start index of lexicographically smallest rotation
// Returns index i such that s[i..]+s[..i-1] is the smallest rotation
function boothMinRotation(s) {
    const n = s.length;
    const t = s + s; // doubled string
    const f = new Array(2 * n).fill(-1);
    let k = 0; // current best start position

    for (let j = 1; j < 2 * n; j++) {
        let i = f[j - k - 1];
        while (i !== -1 && t[j] !== t[k + i + 1]) {
            if (t[j] < t[k + i + 1]) k = j - i - 1;
            i = f[i];
        }
        if (t[j] !== t[k + i + 1]) {
            if (t[j] < t[k]) k = j;
            f[j - k] = -1;
        } else {
            f[j - k] = i + 1;
        }
    }
    return k;
}

// Simple check: is B a rotation of A?
function isRotation(A, B) {
    return A.length === B.length && (A + A).includes(B);
}

// All rotations of a string
function allRotations(s) {
    const doubled = s + s;
    return Array.from({length: s.length}, (_, i) => doubled.slice(i, i + s.length));
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
      title: 'Rotate String',
      url: 'https://leetcode.com/problems/rotate-string/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Check if goal is substring of s+s',
          explanation: `goal is a rotation of s iff goal appears in s+s and len(goal) = len(s).`,
          code: `var rotateString = function(s, goal) {
    return s.length===goal.length&&(s+s).includes(goal);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Orderly Queue',
      url: 'https://leetcode.com/problems/orderly-queue/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: k=1 → minimum rotation; k>=2 → sort characters',
          explanation: `k=1: can only rotate by 1 each time → try all rotations, pick smallest. k≥2: can achieve any permutation (bubble sort possible) → sort characters.`,
          code: `var orderlyQueue = function(s, k) {
    if(k===1){
        let best=s;
        for(let i=1;i<s.length;i++){
            const rot=s.slice(i)+s.slice(0,i);
            if(rot<best) best=rot;
        }
        return best;
    }
    return s.split('').sort().join('');
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Minimum Time Difference',
      url: 'https://leetcode.com/problems/minimum-time-difference/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Convert to minutes, sort, check adjacent + wraparound',
          explanation: `Convert all times to minutes. Sort. Check differences between consecutive pairs including the circular gap (24×60 + first - last).`,
          code: `var findMinDifference = function(timePoints) {
    const mins=timePoints.map(t=>{const[h,m]=t.split(':').map(Number);return h*60+m;}).sort((a,b)=>a-b);
    const n=mins.length; let res=24*60;
    for(let i=1;i<n;i++) res=Math.min(res,mins[i]-mins[i-1]);
    res=Math.min(res,24*60-mins[n-1]+mins[0]); // wraparound
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Check if Two String Arrays are Equivalent',
      url: 'https://leetcode.com/problems/check-if-two-string-arrays-are-equivalent/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Concatenate both arrays, compare',
          explanation: `Two string arrays represent same string iff their concatenations are equal.`,
          code: `var arrayStringsAreEqual = function(word1, word2) {
    return word1.join('')===word2.join('');
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🔃',
      color: 'green',
      content: `**String rotation techniques:**\n- Check rotation: B in A+A, O(n) with KMP\n- All rotations: doubled string approach, O(n) per rotation\n- Minimum rotation: Booth's algorithm O(n)\n- Equivalent circular strings: compare canonical (minimum) rotations\n\n**Booth's algorithm:** Uses a failure function similar to KMP to avoid comparing the same characters repeatedly. The key invariant: k is always the starting position of the current lexicographically smallest rotation candidate.\n\n**Applications:** Cyclic string equivalence, circular sequence alignment, rotating buffer problems, string period problems (smallest period = smallest rotation that is a rotation of itself).`,
    },
  ],
}
