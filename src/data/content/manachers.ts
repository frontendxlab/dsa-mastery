import type { Article } from '../articles'

export const manachersArticle: Article = {
  slug: 'manachers',
  title: "Manacher's Algorithm",
  emoji: '🪞',
  tagline: 'Find all palindromic substrings in O(n). Extends each palindrome using previous results.',
  description: "Manacher's algorithm finds the longest palindromic substring and the radius of every palindrome centered at each position in O(n) time. It cleverly reuses previously computed palindrome radii using a \"mirror\" observation within the rightmost palindrome seen so far. The standard trick of inserting separators (#) between characters unifies odd and even length palindromes.",
  gradient: 'from-pink-600 to-rose-700',
  topicSlug: 'dp',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `Manacher's works by maintaining the rightmost palindrome's right boundary R and center C. For each position i: if i < R, the mirror of i around C gives a starting estimate for p[i] (palindrome radius). Then expand manually. Update C and R when a longer palindrome is found. Transform string to insert '#' separators so all palindromes are odd-length in the transformed string.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: "Manacher's algorithm",
      code: `// Returns p[i] = radius of longest palindrome centered at transformed[i]
// Transformed: "#a#b#a#" — every palindrome becomes odd-length
function manacher(s) {
    // Transform: insert '#' between chars and at ends
    const t = '#' + s.split('').join('#') + '#';
    const n = t.length;
    const p = new Array(n).fill(0);
    let c = 0, r = 0; // center and right boundary of rightmost palindrome

    for (let i = 0; i < n; i++) {
        if (i < r) {
            const mirror = 2 * c - i;
            p[i] = Math.min(r - i, p[mirror]);
        }
        // Expand around center i
        while (i - p[i] - 1 >= 0 && i + p[i] + 1 < n && t[i - p[i] - 1] === t[i + p[i] + 1]) {
            p[i]++;
        }
        // Update rightmost palindrome
        if (i + p[i] > r) { c = i; r = i + p[i]; }
    }
    return p; // p[i] = radius in transformed string = length in original: p[i] counts '#' too
    // Actual palindrome length at transformed position i = p[i]
    // Corresponds to original substring of length p[i] centered at i/2 (approximately)
}

function longestPalindrome(s) {
    const p = manacher(s);
    const t = '#' + s.split('').join('#') + '#';
    let maxLen = 0, center = 0;
    for (let i = 0; i < t.length; i++) {
        if (p[i] > maxLen) { maxLen = p[i]; center = i; }
    }
    // Convert back: original start = (center - maxLen) / 2
    const start = (center - maxLen) / 2;
    return s.slice(start, start + maxLen);
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
          label: 'Intuition 1: Expand around center — O(n²)',
          explanation: `For each position, expand outward for both odd and even palindromes. Track maximum. O(n) centers × O(n) expansion = O(n²).`,
          code: `var longestPalindrome = function(s) {
    let res='';
    const expand=(l,r)=>{
        while(l>=0&&r<s.length&&s[l]===s[r]){l--;r++;}
        if(r-l-1>res.length) res=s.slice(l+1,r);
    };
    for(let i=0;i<s.length;i++){expand(i,i);expand(i,i+1);}
    return res;
};`,
          lang: 'javascript',
        },
        {
          label: "Intuition 2: Manacher's — O(n)",
          explanation: `Transform string with '#' separators, compute palindrome radius array using Manacher's. Extract longest palindrome from maximum radius.`,
          code: `var longestPalindrome = function(s) {
    const t='#'+s.split('').join('#')+'#';
    const n=t.length, p=new Array(n).fill(0);
    let c=0,r=0;
    for(let i=0;i<n;i++){
        if(i<r) p[i]=Math.min(r-i,p[2*c-i]);
        while(i-p[i]-1>=0&&i+p[i]+1<n&&t[i-p[i]-1]===t[i+p[i]+1]) p[i]++;
        if(i+p[i]>r){c=i;r=i+p[i];}
    }
    const maxIdx=p.indexOf(Math.max(...p));
    return s.slice((maxIdx-p[maxIdx])/2,(maxIdx+p[maxIdx])/2);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Palindromic Substrings',
      url: 'https://leetcode.com/problems/palindromic-substrings/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: "Intuition 1: Manacher's — count all palindromes in O(n)",
          explanation: `After computing Manacher's p[] array, each p[i] in the transformed string corresponds to (p[i]+1)/2 palindromes in the original (all palindromes of radius 0 to p[i] centered there). Sum (p[i]+1)/2 over all i. Wait — simpler: count = sum of ceil((p[i]+1)/2) / correction. Actually: number of palindromes centered at transformed position i = floor(p[i]/2) + 1.`,
          code: `var countSubstrings = function(s) {
    const t='#'+s.split('').join('#')+'#';
    const n=t.length, p=new Array(n).fill(0);
    let c=0,r=0,count=0;
    for(let i=0;i<n;i++){
        if(i<r) p[i]=Math.min(r-i,p[2*c-i]);
        while(i-p[i]-1>=0&&i+p[i]+1<n&&t[i-p[i]-1]===t[i+p[i]+1]) p[i]++;
        if(i+p[i]>r){c=i;r=i+p[i];}
        count+=Math.floor(p[i]/2)+1; // palindromes centered here
    }
    return count;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Count Different Palindromic Subsequences',
      url: 'https://leetcode.com/problems/count-different-palindromic-subsequences/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: DP on substrings',
          explanation: `dp[i][j] = count of distinct palindromic subsequences in s[i..j]. For each char c in {a,b,c,d}: find leftmost l and rightmost r positions of c in [i,j]. If no c: 0 contribution. If l==r: 1. If l+1==r: 2. Else: 2 + dp[l+1][r-1].`,
          code: `var countPalindromicSubsequences = function(s) {
    const MOD=1e9+7, n=s.length;
    const dp=Array.from({length:n},()=>new Array(n).fill(0));
    for(let i=0;i<n;i++) dp[i][i]=1;
    for(let len=2;len<=n;len++){
        for(let i=0;i+len-1<n;i++){
            const j=i+len-1;
            for(let c=0;c<4;c++){
                const ch='abcd'[c];
                let l=i,r=j;
                while(l<=j&&s[l]!==ch) l++;
                while(r>=i&&s[r]!==ch) r--;
                if(l>r) continue;
                if(l===r){dp[i][j]=(dp[i][j]+1)%MOD;}
                else if(l+1===r){dp[i][j]=(dp[i][j]+2)%MOD;}
                else dp[i][j]=(dp[i][j]+2+dp[l+1][r-1])%MOD;
            }
        }
    }
    return dp[0][n-1];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Minimum Cuts for Palindrome Partitioning',
      url: 'https://leetcode.com/problems/palindrome-partitioning-ii/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: "Intuition 1: Manacher's + DP for min cuts",
          explanation: `Precompute isPalin[i][j] using Manacher's (mark all palindromic centers). Then dp[i] = min cuts for s[0..i]. dp[i] = 0 if s[0..i] is palindrome. Else dp[i] = 1 + min(dp[j-1]) for all j where s[j..i] is palindrome.`,
          code: `var minCut = function(s) {
    const n=s.length;
    const isPalin=Array.from({length:n},()=>new Array(n).fill(false));
    // Expand around each center
    const expand=(l,r)=>{
        while(l>=0&&r<n&&s[l]===s[r]){isPalin[l][r]=true;l--;r++;}
    };
    for(let i=0;i<n;i++){expand(i,i);expand(i,i+1);}
    const dp=new Array(n).fill(Infinity);
    for(let i=0;i<n;i++){
        if(isPalin[0][i]){dp[i]=0;continue;}
        for(let j=1;j<=i;j++)
            if(isPalin[j][i]) dp[i]=Math.min(dp[i],dp[j-1]+1);
    }
    return dp[n-1];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🪞',
      color: 'red',
      content: `**Manacher's key insight:** If i < R (inside rightmost palindrome), mirror position 2C-i gives a starting estimate — we know p[i] ≥ min(R-i, p[mirror]). Can't go beyond R without checking, so we always expand from there.\n\n**Transformed string trick:** "#a#b#a#" makes all palindromes odd-length. p[i] in transformed = palindrome radius. Original palindrome length = p[i]. Original start = (i - p[i]) / 2.\n\n**vs expand around center:** Manacher's O(n) vs O(n²). Use Manacher's when you need all palindrome radii. For single longest palindrome, expand-around-center is simpler.`,
    },
  ],
}
