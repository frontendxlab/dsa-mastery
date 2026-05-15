import type { Article } from '../articles'

export const stringHashingArticle: Article = {
  slug: 'string-hashing',
  title: 'String Hashing & Rolling Hash',
  emoji: '#️⃣',
  tagline: 'Compare substrings in O(1) after O(n) preprocessing. Rabin-Karp for pattern matching.',
  description: 'Polynomial rolling hash maps a string to a number so substring comparisons become O(1) after O(n) preprocessing. Core technique for Rabin-Karp substring search, finding longest repeated substring, comparing rotations, and deduplicating substrings. Double hashing (two different bases/mods) reduces collision probability to near zero.',
  gradient: 'from-rose-600 to-pink-700',
  topicSlug: 'dp',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `String hashing converts a substring to a number in O(1) time using prefix hash arrays. The polynomial hash: hash(s) = s[0]*p^(n-1) + s[1]*p^(n-2) + ... + s[n-1]*p^0 (mod M). Precompute prefix hashes and powers. Then hash(s[l..r]) = (prefix[r+1] - prefix[l] * pow[r-l+1]) mod M. Two equal hashes = probably equal strings (with double hash, near-certainly).`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Rolling hash template — double hashing for safety',
      code: `class RollingHash {
    constructor(s) {
        const n = s.length;
        const [P1, P2] = [31, 37];
        const [M1, M2] = [1e9 + 7, 1e9 + 9];
        this.h1 = new Array(n + 1).fill(0);
        this.h2 = new Array(n + 1).fill(0);
        this.p1 = new Array(n + 1).fill(1);
        this.p2 = new Array(n + 1).fill(1);
        for (let i = 0; i < n; i++) {
            const c = s.charCodeAt(i) - 96; // a=1, b=2, ...
            this.h1[i+1] = (this.h1[i] * P1 + c) % M1;
            this.h2[i+1] = (this.h2[i] * P2 + c) % M2;
            this.p1[i+1] = this.p1[i] * P1 % M1;
            this.p2[i+1] = this.p2[i] * P2 % M2;
        }
        this.M1 = M1; this.M2 = M2;
    }
    // Get hash of s[l..r] (0-indexed, inclusive)
    get(l, r) {
        const len = r - l + 1;
        const v1 = (this.h1[r+1] - this.h1[l] * this.p1[len] % this.M1 + this.M1 * 2) % this.M1;
        const v2 = (this.h2[r+1] - this.h2[l] * this.p2[len] % this.M2 + this.M2 * 2) % this.M2;
        return v1 * 1e9 + v2; // combine both hashes
    }
    equal(l1, r1, l2, r2) { return this.get(l1, r1) === this.get(l2, r2); }
}

// Usage:
// const rh = new RollingHash("abcabc");
// rh.equal(0, 2, 3, 5) → true (both "abc")`,
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
          label: 'Intuition 1: Binary search on length + rolling hash for substring dedup',
          explanation: `Binary search on the length L of the duplicate substring. For a given L, use rolling hash to check if any substring of length L appears twice in O(n). Total: O(n log n).`,
          code: `var longestDupSubstring = function(s) {
    const n=s.length;
    const P=31,M=BigInt(1e9+7);
    const h=new Array(n+1).fill(0n),pw=new Array(n+1).fill(1n);
    for(let i=0;i<n;i++){
        h[i+1]=(h[i]*BigInt(P)+BigInt(s.charCodeAt(i)-96))%M;
        pw[i+1]=pw[i]*BigInt(P)%M;
    }
    const getHash=(l,r)=>(h[r+1]-h[l]*pw[r-l+1]%M+M*10n)%M;
    const check=(len)=>{
        const seen=new Map();
        for(let i=0;i+len<=n;i++){
            const hv=getHash(i,i+len-1);
            if(seen.has(hv)){
                const j=seen.get(hv);
                if(s.slice(i,i+len)===s.slice(j,j+len)) return i; // verify (anti-collision)
            }
            seen.set(hv,i);
        }
        return -1;
    };
    let lo=0,hi=n-1,res='';
    while(lo<=hi){
        const mid=(lo+hi)>>1;
        const idx=check(mid);
        if(idx!==-1){res=s.slice(idx,idx+mid);lo=mid+1;}
        else hi=mid-1;
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Repeated String Match',
      url: 'https://leetcode.com/problems/repeated-string-match/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Rabin-Karp substring search in repeated string',
          explanation: `Repeat string A until it's long enough to contain B (length ≥ |A| + |B| - 1). Then use indexOf (internally KMP/hash). Count repetitions needed.`,
          code: `var repeatedStringMatch = function(a, b) {
    let rep=1, s=a;
    while(s.length<b.length) { s+=a; rep++; }
    if(s.includes(b)) return rep;
    s+=a; rep++;
    return s.includes(b)?rep:-1;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Longest Happy Prefix',
      url: 'https://leetcode.com/problems/longest-happy-prefix/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Rolling hash — find longest prefix that equals suffix',
          explanation: `Compute prefix hash from left, suffix hash from right simultaneously. When they match at position i, s[0..i] equals s[n-1-i..n-1] — we found a happy prefix of length i+1.`,
          code: `var longestPrefix = function(s) {
    const n=s.length, P=31, M=1e9+7;
    let prefixH=0, suffixH=0, pw=1, len=0;
    for(let i=0;i<n-1;i++){
        prefixH=(prefixH*P+(s.charCodeAt(i)-96))%M;
        suffixH=((s.charCodeAt(n-1-i)-96)*pw+suffixH)%M;
        pw=pw*P%M;
        if(prefixH===suffixH) len=i+1;
    }
    return s.slice(0,len);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Distinct Echo Substrings',
      url: 'https://leetcode.com/problems/distinct-echo-substrings/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Rolling hash to check if first half = second half',
          explanation: `For each even-length substring, check if first half equals second half using hash in O(1). Use a set to count distinct matches. O(n²) total with O(1) hash comparison.`,
          code: `var distinctEchoSubstrings = function(text) {
    const n=text.length, P=31, M=BigInt(1e9+7);
    const h=new Array(n+1).fill(0n), pw=new Array(n+1).fill(1n);
    for(let i=0;i<n;i++){
        h[i+1]=(h[i]*BigInt(P)+BigInt(text.charCodeAt(i)-96))%M;
        pw[i+1]=pw[i]*BigInt(P)%M;
    }
    const getH=(l,r)=>(h[r+1]-h[l]*pw[r-l+1]%M+M*10n)%M;
    const seen=new Set();
    let count=0;
    for(let len=1;len*2<=n;len++){
        for(let i=0;i+2*len<=n;i++){
            const h1=getH(i,i+len-1), h2=getH(i+len,i+2*len-1);
            if(h1===h2){
                const key=h1+'@'+i;
                if(!seen.has(key)){seen.add(key);count++;}
            }
        }
    }
    return count;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'String Matching in an Array',
      url: 'https://leetcode.com/problems/string-matching-in-an-array/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Check if each word is a substring of any other word',
          explanation: `Sort by length. For each word, check if any longer word contains it. O(n² * L) but simple. Rolling hash can optimize if needed.`,
          code: `var stringMatching = function(words) {
    return words.filter(w=>words.some(other=>other!==w&&other.includes(w)));
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 6,
      title: 'Palindrome Pairs',
      url: 'https://leetcode.com/problems/palindrome-pairs/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: HashMap + check palindrome conditions',
          explanation: `For each word[i], consider all splits into prefix+suffix. If suffix reversed is in the map AND prefix is a palindrome → pair (j, i). If prefix reversed is in map AND suffix is a palindrome → pair (i, j). Also handle empty string case.`,
          code: `var palindromePairs = function(words) {
    const map=new Map(words.map((w,i)=>[w,i]));
    const isPalin=(s,l,r)=>{while(l<r) if(s[l++]!==s[r--]) return false; return true;};
    const res=[];
    for(let i=0;i<words.length;i++){
        const w=words[i];
        for(let k=0;k<=w.length;k++){
            const [pre,suf]=[w.slice(0,k),w.slice(k)];
            const revPre=pre.split('').reverse().join('');
            const revSuf=suf.split('').reverse().join('');
            // suf reversed in map AND pre is palindrome
            if(map.has(revSuf)&&map.get(revSuf)!==i&&isPalin(pre,0,pre.length-1))
                res.push([map.get(revSuf),i]);
            // pre reversed in map AND suf is palindrome (avoid empty string dup)
            if(suf.length>0&&map.has(revPre)&&map.get(revPre)!==i&&isPalin(suf,0,suf.length-1))
                res.push([i,map.get(revPre)]);
        }
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '#️⃣',
      color: 'red',
      content: `**Rolling hash key formulas:**\n- Prefix hash: h[i+1] = (h[i] * P + c) % M\n- Substring hash: (h[r+1] - h[l] * pow[len]) % M\n- Always add M before % to avoid negative (JS modulo quirk)\n\n**Collision safety:**\n- Single hash: ~1/M collision chance per comparison (M ≈ 10^9)\n- Double hash: ~1/M² ≈ 10^{-18} per comparison — effectively zero\n\n**When to use:** Comparing many substrings (O(1) each), binary search on string length (check in O(n)), Rabin-Karp rolling window search.\n\n**vs KMP/Z-function:** Use KMP/Z for single pattern search. Use hash when you need to compare arbitrary substring pairs.`,
    },
  ],
}
