import type { Article } from '../articles'

export const suffixArrayArticle: Article = {
  slug: 'suffix-array',
  title: 'Suffix Array & LCP Array',
  emoji: '🔤',
  tagline: 'Sort all suffixes. Build LCP array. Enables O(n log n) solutions for hard string problems.',
  description: 'A suffix array stores all suffixes of a string in sorted lexicographic order. Combined with the LCP (Longest Common Prefix) array — which stores the length of the longest common prefix between consecutive suffixes — it enables O(n log n) solutions for: longest repeated substring, number of distinct substrings, pattern matching, and longest common substring of multiple strings.',
  gradient: 'from-purple-600 to-indigo-700',
  topicSlug: 'dp',
  readTime: '16 min',
  sections: [
    {
      type: 'text',
      content: `A suffix array SA[] is a sorted list of starting indices of all suffixes. For "banana": suffixes sorted = [a, ana, anana, banana, na, nana] → SA = [5,3,1,0,4,2]. The LCP array stores longest common prefix between SA[i] and SA[i-1] suffixes. Together they compress all substring information into two arrays, enabling many string operations in O(n) or O(n log n).`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Suffix array (O(n log²n)) + Kasai LCP algorithm',
      code: `// O(n log²n) suffix array construction
function buildSA(s) {
    const n = s.length;
    let sa = Array.from({length: n}, (_, i) => i);
    let rank = [...s].map(c => c.charCodeAt(0));
    let tmp = new Array(n);

    for (let gap = 1; gap < n; gap <<= 1) {
        const cmp = (a, b) => {
            if (rank[a] !== rank[b]) return rank[a] - rank[b];
            const ra = a + gap < n ? rank[a + gap] : -1;
            const rb = b + gap < n ? rank[b + gap] : -1;
            return ra - rb;
        };
        sa.sort(cmp);
        tmp[sa[0]] = 0;
        for (let i = 1; i < n; i++)
            tmp[sa[i]] = tmp[sa[i-1]] + (cmp(sa[i-1], sa[i]) < 0 ? 1 : 0);
        rank = [...tmp];
        if (rank[sa[n-1]] === n-1) break;
    }
    return sa;
}

// Kasai's algorithm: build LCP array in O(n)
function buildLCP(s, sa) {
    const n = s.length;
    const rank = new Array(n);
    for (let i = 0; i < n; i++) rank[sa[i]] = i;
    const lcp = new Array(n).fill(0);
    let h = 0;
    for (let i = 0; i < n; i++) {
        if (rank[i] > 0) {
            let j = sa[rank[i] - 1];
            while (i + h < n && j + h < n && s[i + h] === s[j + h]) h++;
            lcp[rank[i]] = h;
            if (h > 0) h--;
        }
    }
    return lcp; // lcp[i] = LCP(sa[i-1], sa[i])
}

// Count distinct substrings = total substrings - sum(lcp)
// = n*(n+1)/2 - sum(lcp array)`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Longest Duplicate Substring',
      url: 'https://leetcode.com/problems/longest-duplicate-substring/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Suffix array — maximum in LCP array',
          explanation: `Build suffix array and LCP array. The longest duplicate substring = maximum value in the LCP array. Its position in SA gives the starting index.`,
          code: `var longestDupSubstring = function(s) {
    const n=s.length;
    // Build suffix array (O(n log²n))
    let sa=Array.from({length:n},(_,i)=>i);
    let rank=[...s].map(c=>c.charCodeAt(0));
    for(let gap=1;gap<n;gap<<=1){
        const cmp=(a,b)=>{
            if(rank[a]!==rank[b]) return rank[a]-rank[b];
            const ra=a+gap<n?rank[a+gap]:-1, rb=b+gap<n?rank[b+gap]:-1;
            return ra-rb;
        };
        sa.sort(cmp);
        const tmp=new Array(n); tmp[sa[0]]=0;
        for(let i=1;i<n;i++) tmp[sa[i]]=tmp[sa[i-1]]+(cmp(sa[i-1],sa[i])<0?1:0);
        rank=[...tmp];
    }
    // Build LCP (Kasai's)
    const rnk=new Array(n);
    for(let i=0;i<n;i++) rnk[sa[i]]=i;
    const lcp=new Array(n).fill(0); let h=0;
    for(let i=0;i<n;i++) if(rnk[i]>0){
        let j=sa[rnk[i]-1];
        while(i+h<n&&j+h<n&&s[i+h]===s[j+h]) h++;
        lcp[rnk[i]]=h; if(h>0) h--;
    }
    // Max LCP gives longest repeated substring
    let maxLen=0,idx=0;
    for(let i=1;i<n;i++) if(lcp[i]>maxLen){maxLen=lcp[i];idx=sa[i];}
    return s.slice(idx,idx+maxLen);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Number of Distinct Substrings',
      url: 'https://leetcode.com/problems/number-of-distinct-substrings-in-a-string/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Suffix array — total minus LCP sum',
          explanation: `Total substrings = n*(n+1)/2. Each suffix of length (n-SA[i]) contributes (n-SA[i]) substrings, but the first LCP[i] are duplicates of the previous suffix's substrings. Distinct = total - sum(LCP).`,
          code: `var countDistinct = function(s) {
    const n=s.length;
    // Simplified: use suffix array and LCP
    // Build SA...
    let sa=Array.from({length:n},(_,i)=>i).sort((a,b)=>{
        // Simple O(n² log n) sort for demonstration
        const sa=s.slice(a), sb=s.slice(b);
        return sa<sb?-1:sa>sb?1:0;
    });
    // Kasai's LCP
    const rnk=new Array(n); for(let i=0;i<n;i++) rnk[sa[i]]=i;
    const lcp=new Array(n).fill(0); let h=0;
    for(let i=0;i<n;i++) if(rnk[i]>0){
        let j=sa[rnk[i]-1];
        while(i+h<n&&j+h<n&&s[i+h]===s[j+h]) h++;
        lcp[rnk[i]]=h; if(h>0) h--;
    }
    const total=n*(n+1)/2;
    return total-lcp.reduce((a,b)=>a+b,0);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Longest Common Substring (two strings)',
      url: 'https://leetcode.com/problems/maximum-length-of-repeated-subarray/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DP — classic O(mn)',
          explanation: `dp[i][j] = longest common substring ending at A[i-1] and B[j-1]. If A[i-1] = B[j-1]: dp[i][j] = dp[i-1][j-1] + 1. Answer = max dp value.`,
          code: `var findLength = function(nums1, nums2) {
    const m=nums1.length,n=nums2.length;
    const dp=Array.from({length:m+1},()=>new Array(n+1).fill(0));
    let res=0;
    for(let i=1;i<=m;i++) for(let j=1;j<=n;j++){
        if(nums1[i-1]===nums2[j-1]) dp[i][j]=dp[i-1][j-1]+1;
        res=Math.max(res,dp[i][j]);
    }
    return res;
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Concatenate + suffix array for O((m+n) log(m+n))',
          explanation: `Concatenate A + separator + B. Build suffix array and LCP. The longest common substring across A and B = max LCP value between two adjacent suffixes that come from different strings.`,
          code: `// Concatenate nums1 + [201] + nums2 (separator outside value range)
// Build suffix array on concatenated array
// Max LCP between SA entries from different halves = answer
// (Full implementation omitted for brevity — same SA/LCP code as above)`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Shortest Palindrome',
      url: 'https://leetcode.com/problems/shortest-palindrome/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: KMP failure function on s + "#" + reverse(s)',
          explanation: `Find longest palindrome prefix of s. Concatenate s + "#" + reverse(s), compute KMP failure function. The last value = length of longest palindromic prefix. Prepend the remainder.`,
          code: `var shortestPalindrome = function(s) {
    const t=s+'#'+s.split('').reverse().join('');
    const kmp=new Array(t.length).fill(0);
    for(let i=1;i<t.length;i++){
        let j=kmp[i-1];
        while(j>0&&t[i]!==t[j]) j=kmp[j-1];
        if(t[i]===t[j]) j++;
        kmp[i]=j;
    }
    const palLen=kmp.at(-1);
    return s.slice(palLen).split('').reverse().join('')+s;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🔤',
      color: 'blue',
      content: `**Suffix array key facts:**\n- SA[i] = starting index of the i-th smallest suffix\n- LCP[i] = length of longest common prefix between SA[i-1] and SA[i]\n- Distinct substrings = n*(n+1)/2 - sum(LCP)\n- Longest repeated substring = max(LCP)\n- Pattern search: binary search in SA for pattern match range\n\n**Construction complexity:**\n- Naive sort: O(n² log n)\n- O(n log²n): sort with doubled comparison\n- O(n log n): radix sort variant (SA-IS: O(n))\n\n**vs Rolling Hash:** Suffix array gives exact answers, no collision risk. Harder to code but more powerful for multi-query scenarios.`,
    },
  ],
}
