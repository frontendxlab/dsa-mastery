import type { Article } from '../articles'

export const stringWindowPatternsArticle: Article = {
  slug: 'string-window-patterns',
  title: 'String Window Patterns',
  emoji: '🪟',
  tagline: 'Minimum window substring, anagram in string, longest with K distinct chars.',
  description: 'String sliding window problems maintain a window [l, r] over a string satisfying some character-frequency constraint. Core pattern: expand right to include new characters, shrink left when constraint violated. Key: track "satisfied" characters separately from total character counts to know when window is valid. Applications: minimum window containing all target chars, find all anagrams, longest substring with K distinct, max vowels in window.',
  gradient: 'from-orange-600 to-red-700',
  topicSlug: 'dp',
  readTime: '13 min',
  sections: [
    {
      type: 'text',
      content: `Minimum window substring pattern: maintain freq maps for target and current window. Track "formed" = count of characters meeting target frequency. When formed == required (all chars satisfied), try shrinking left. Anagram finding: fixed-size window, compare char counts. Longest with K distinct: shrink when distinct count exceeds K. At most K distinct chars: shrink when window has > K unique chars.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Minimum window substring template',
      code: `function minWindow(s, t) {
    const need = new Map();
    for (const c of t) need.set(c, (need.get(c) || 0) + 1);

    let have = 0, required = need.size; // need.size = distinct chars needed
    const window = new Map();
    let [l, minLen, minStart] = [0, Infinity, 0];

    for (let r = 0; r < s.length; r++) {
        const c = s[r];
        window.set(c, (window.get(c) || 0) + 1);
        if (need.has(c) && window.get(c) === need.get(c)) have++; // met this char's need

        while (have === required) { // valid window — try to shrink
            if (r - l + 1 < minLen) { minLen = r - l + 1; minStart = l; }
            const lc = s[l++];
            window.set(lc, window.get(lc) - 1);
            if (need.has(lc) && window.get(lc) < need.get(lc)) have--;
        }
    }
    return minLen === Infinity ? '' : s.slice(minStart, minStart + minLen);
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
      title: 'Minimum Window Substring',
      url: 'https://leetcode.com/problems/minimum-window-substring/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Sliding window with "formed" counter',
          explanation: `Track need (target freq), window (current freq), have (chars meeting need). Expand right, shrink left when window is valid. Track minimum valid window.`,
          code: `var minWindow = function(s, t) {
    const need=new Map(), win=new Map();
    for(const c of t) need.set(c,(need.get(c)||0)+1);
    let have=0,req=need.size,l=0,minLen=Infinity,minStart=0;
    for(let r=0;r<s.length;r++){
        const c=s[r]; win.set(c,(win.get(c)||0)+1);
        if(need.has(c)&&win.get(c)===need.get(c)) have++;
        while(have===req){
            if(r-l+1<minLen){minLen=r-l+1;minStart=l;}
            const lc=s[l++]; win.set(lc,win.get(lc)-1);
            if(need.has(lc)&&win.get(lc)<need.get(lc)) have--;
        }
    }
    return minLen===Infinity?'':s.slice(minStart,minStart+minLen);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Find All Anagrams in a String',
      url: 'https://leetcode.com/problems/find-all-anagrams-in-a-string/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Fixed-size window, compare char frequency arrays',
          explanation: `Sliding window of size p.length. Maintain character count arrays for current window and pattern. When they match, record starting index. Slide by removing leftmost char and adding next char.`,
          code: `var findAnagrams = function(s, p) {
    if(s.length<p.length) return [];
    const pc=new Array(26).fill(0), wc=new Array(26).fill(0);
    const a='a'.charCodeAt(0);
    for(const c of p) pc[c.charCodeAt(0)-a]++;
    const k=p.length;
    for(let i=0;i<k;i++) wc[s.charCodeAt(i)-a]++;
    const res=[];
    if(pc.join()===wc.join()) res.push(0);
    for(let i=k;i<s.length;i++){
        wc[s.charCodeAt(i)-a]++;
        wc[s.charCodeAt(i-k)-a]--;
        if(pc.join()===wc.join()) res.push(i-k+1);
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Longest Substring with At Most K Distinct Characters',
      url: 'https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Sliding window — shrink left when distinct chars exceed k',
          explanation: `Maintain char count map. When map.size > k, shrink from left by decrementing count and removing zero-count chars. Track max window size.`,
          code: `var lengthOfLongestSubstringKDistinct = function(s, k) {
    const map=new Map(); let l=0,res=0;
    for(let r=0;r<s.length;r++){
        map.set(s[r],(map.get(s[r])||0)+1);
        while(map.size>k){
            const lc=s[l++]; map.set(lc,map.get(lc)-1);
            if(!map.get(lc)) map.delete(lc);
        }
        res=Math.max(res,r-l+1);
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Fruit Into Baskets',
      url: 'https://leetcode.com/problems/fruit-into-baskets/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Longest subarray with at most 2 distinct values',
          explanation: `Same as "longest substring with at most K distinct" with k=2. Maintain fruit type counts. When distinct > 2, shrink from left.`,
          code: `var totalFruit = function(fruits) {
    const cnt=new Map(); let l=0,res=0;
    for(let r=0;r<fruits.length;r++){
        cnt.set(fruits[r],(cnt.get(fruits[r])||0)+1);
        while(cnt.size>2){
            const lf=fruits[l++]; cnt.set(lf,cnt.get(lf)-1);
            if(!cnt.get(lf)) cnt.delete(lf);
        }
        res=Math.max(res,r-l+1);
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🪟',
      color: 'red',
      content: `**String window template (memorize):**\n1. Build need map from target\n2. Expand right: add char to window, increment \`have\` if meets need\n3. When \`have == required\`: record answer, shrink left, decrement \`have\` if drops below need\n\n**"Formed" counter trick:** Instead of comparing entire frequency maps each step (O(26)), track a single integer \`have\` = number of distinct chars meeting their required count. When \`have == required\`, window is valid. O(1) check.\n\n**Fixed-size window for anagrams:** When window size is fixed (= pattern length), just slide without inner while loop. Compare frequency signatures at each step.`,
    },
  ],
}
