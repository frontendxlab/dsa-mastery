import type { Article } from '../articles'

export const palindromePatternsArticle: Article = {
  slug: 'palindrome-patterns',
  title: 'Palindrome Patterns',
  emoji: '🪞',
  tagline: 'Expand from center, or DP on intervals. Two approaches cover every palindrome problem.',
  description: 'Palindrome problems ask about strings that read the same forwards and backwards. The expand-around-center technique solves longest palindromic substring in O(n²). DP on intervals solves minimum cuts and counts. Manacher\'s solves longest in O(n). Learn when each approach applies.',
  gradient: 'from-pink-500 to-rose-600',
  topicSlug: 'dp',
  readTime: '16 min',
  sections: [
    {
      type: 'text',
      content: `Palindrome problems divide into two families: (1) substring problems ("find/count/longest palindromic substring") which use expand-around-center or Manacher's algorithm, and (2) subsequence/partition problems ("longest palindromic subsequence," "minimum cuts") which use DP on intervals. The first is simpler; the second requires the interval DP pattern.`,
    },
    {
      type: 'table',
      headers: ['Problem', 'Approach', 'Complexity'],
      rows: [
        ['Check if string is palindrome', 'Two pointers from ends', 'O(n)'],
        ['Longest palindromic substring', 'Expand around center (O(n²)) or Manacher\'s (O(n))', 'O(n²) or O(n)'],
        ['Count palindromic substrings', 'Expand around center', 'O(n²)'],
        ['Longest palindromic subsequence', 'LCS(s, reverse(s)) or interval DP', 'O(n²)'],
        ['Minimum cuts for palindrome partition', 'DP with isPalin precomputed', 'O(n²)'],
        ['All palindrome partitions', 'Backtracking + isPalin pruning', 'O(2^n × n)'],
        ['Shortest palindrome (prefix)', 'KMP trick', 'O(n)'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Expand Around Center Template',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Expand around center — counts and finds palindromes',
      code: `// For each center (2n-1 possible centers), expand outward
// Odd length: center at i. Even length: center between i and i+1

function expandAroundCenter(s) {
    let longest = '';
    let count = 0;
    const expand = (l, r) => {
        while (l >= 0 && r < s.length && s[l] === s[r]) {
            count++; // every valid [l,r] is a palindrome
            if (r - l + 1 > longest.length) longest = s.slice(l, r+1);
            l--; r++;
        }
    };
    for (let i = 0; i < s.length; i++) {
        expand(i, i);      // odd length (single center)
        expand(i, i + 1);  // even length (between two chars)
    }
    return { longest, count };
}

// Manacher's O(n) — transforms string with separators
// "#a#b#a#" → finds all palindrome radii in O(n) using mirror property
function manacher(s) {
    const t = '#' + s.split('').join('#') + '#';
    const n = t.length;
    const p = new Array(n).fill(0); // p[i] = radius of palindrome centered at i
    let center = 0, right = 0;
    for (let i = 0; i < n; i++) {
        const mirror = 2 * center - i;
        if (i < right) p[i] = Math.min(right - i, p[mirror]);
        // Expand beyond known palindrome
        while (i-p[i]-1>=0 && i+p[i]+1<n && t[i-p[i]-1]===t[i+p[i]+1]) p[i]++;
        if (i+p[i] > right) { center=i; right=i+p[i]; }
    }
    return p; // p[i]/2 = radius in original string, skip '#' positions
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
      title: 'Longest Palindromic Substring',
      url: 'https://leetcode.com/problems/longest-palindromic-substring/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: O(n²) expand around center',
          explanation: `For each of 2n-1 centers (n single chars + n-1 gaps), expand outward. Track the longest palindrome found. O(n²) time, O(1) space.`,
          code: `var longestPalindrome = function(s) {
    let start=0,maxLen=1;
    const expand=(l,r)=>{
        while(l>=0&&r<s.length&&s[l]===s[r]){l--;r++;}
        if(r-l-1>maxLen){maxLen=r-l-1;start=l+1;}
    };
    for(let i=0;i<s.length;i++){expand(i,i);expand(i,i+1);}
    return s.slice(start,start+maxLen);
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: O(n) Manacher\'s algorithm',
          explanation: `Transform s to "#a#b#a#..." (separators). Mirror property: if we know the palindrome centered at 'center', points inside it have palindrome radius ≥ their mirror. Expand only where needed. O(n) amortized.`,
          code: `var longestPalindrome = function(s) {
    // Using the expand approach for cleanliness; Manacher's for O(n)
    const t='#'+s.split('').join('#')+'#';
    const n=t.length, p=new Array(n).fill(0);
    let c=0,r=0,bestLen=1,bestCenter=0;
    for(let i=0;i<n;i++){
        if(i<r) p[i]=Math.min(r-i,p[2*c-i]);
        while(i-p[i]-1>=0&&i+p[i]+1<n&&t[i-p[i]-1]===t[i+p[i]+1]) p[i]++;
        if(i+p[i]>r){c=i;r=i+p[i];}
        if(p[i]>bestLen){bestLen=p[i];bestCenter=i;}
    }
    const start=(bestCenter-bestLen)/2;
    return s.slice(start,start+bestLen);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Palindromic Substrings (count)',
      url: 'https://leetcode.com/problems/palindromic-substrings/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Expand around center — count on each expansion',
          explanation: `Same expand template but count every valid (l,r) pair instead of tracking max. Each expansion that succeeds = one more palindrome.`,
          code: `var countSubstrings = function(s) {
    let count=0;
    const expand=(l,r)=>{while(l>=0&&r<s.length&&s[l]===s[r]){count++;l--;r++;}};
    for(let i=0;i<s.length;i++){expand(i,i);expand(i,i+1);}
    return count;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Minimum Cut Palindrome Partition',
      url: 'https://leetcode.com/problems/palindrome-partitioning-ii/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: O(n²) DP with isPalin precomputation',
          explanation: `dp[i] = min cuts to partition s[0..i]. Precompute isPalin[i][j] using expand-around-center. Then dp[i] = min over all j ≤ i where s[j..i] is palindrome of (dp[j-1] + 1).`,
          code: `var minCut = function(s) {
    const n=s.length;
    const isPalin=Array.from({length:n},()=>new Array(n).fill(false));
    // Precompute palindromes with expand
    const expand=(l,r)=>{while(l>=0&&r<n&&s[l]===s[r]){isPalin[l][r]=true;l--;r++;}};
    for(let i=0;i<n;i++){expand(i,i);expand(i,i+1);}
    // DP
    const dp=Array.from({length:n},(_,i)=>i); // worst case: cut every char
    for(let i=1;i<n;i++)
        for(let j=0;j<=i;j++)
            if(isPalin[j][i])
                dp[i]=j===0?0:Math.min(dp[i],dp[j-1]+1);
    return dp[n-1];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Minimum Insertions to Make String Palindrome',
      url: 'https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: LPS → min insertions = n - LPS',
          explanation: `Minimum insertions = n - LPS(s). The longest palindromic subsequence is the "core" we keep; we insert one character for each character NOT in the LPS.`,
          code: `var minInsertions = function(s) {
    const n=s.length;
    // LPS via interval DP
    const dp=Array.from({length:n},()=>new Array(n).fill(1));
    for(let len=2;len<=n;len++)
        for(let i=0;i<=n-len;i++){
            const j=i+len-1;
            if(s[i]===s[j]) dp[i][j]=(len===2?2:dp[i+1][j-1]+2);
            else dp[i][j]=Math.max(dp[i+1][j],dp[i][j-1]);
        }
    return n-dp[0][n-1];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Valid Palindrome III (at most k deletions)',
      url: 'https://leetcode.com/problems/valid-palindrome-iii/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: LPS — valid if n - LPS ≤ k',
          explanation: `With k deletions, we can keep the longest palindromic subsequence intact. So s can be made palindrome with at most k deletions iff n - LPS(s) ≤ k.`,
          code: `var isValidPalindrome = function(s, k) {
    const n=s.length;
    // Compute LPS via LCS(s, reverse(s))
    const rev=s.split('').reverse().join('');
    const dp=Array.from({length:n+1},()=>new Array(n+1).fill(0));
    for(let i=1;i<=n;i++)
        for(let j=1;j<=n;j++)
            dp[i][j]=s[i-1]===rev[j-1]?dp[i-1][j-1]+1:Math.max(dp[i-1][j],dp[i][j-1]);
    return n-dp[n][n]<=k;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🪞',
      color: 'pink',
      content: `**Palindrome algorithm selector:**\n- "Is this a palindrome?" → two pointers, O(n)\n- "Longest palindromic substring" → expand around center O(n²) or Manacher's O(n)\n- "Count palindromic substrings" → expand around center, count on each step\n- "Longest palindromic subsequence" → LCS(s, reverse(s)) = O(n²)\n- "Min cuts / min insertions" → LPS relationship: \n  - min cuts = n - LPS would be wrong; use separate DP\n  - min insertions = n - LPS(s)\n- "Can become palindrome with k deletions?" → n - LPS ≤ k\n- "Palindrome prefix" → KMP LPS last value`,
    },
  ],
}
