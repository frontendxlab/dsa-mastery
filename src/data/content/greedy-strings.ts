import type { Article } from '../articles'

export const greedyStringsArticle: Article = {
  slug: 'greedy-strings',
  title: 'Greedy String Problems',
  emoji: '✂️',
  tagline: 'Remove k digits, largest number, reorganize string. Monotone stack for ordering.',
  description: 'Greedy string problems construct optimal strings by local decisions. Key patterns: remove k digits to minimize result (monotone stack), arrange numbers to form largest concatenation (custom comparator), reorganize string so no two adjacent chars are same (greedy with max-heap), remove duplicate letters (stack with seen tracking), and create lexicographically smallest/largest string under constraints.',
  gradient: 'from-orange-700 to-red-800',
  topicSlug: 'graph',
  readTime: '13 min',
  sections: [
    {
      type: 'text',
      content: `Remove k digits: use monotone increasing stack. When current digit < stack top and k > 0, pop (that\'s a removal). After processing, if k remaining, remove from end (stack). Largest number: sort strings by comparing a+b vs b+a. Reorganize string: max-heap, alternate placing most frequent. Remove duplicate letters: maintain stack with seen set; pop stack when current char is smaller and more occurrences remain.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Remove k digits and largest number templates',
      code: `// Remove k digits to make smallest number
function removeKDigits(num, k) {
    const stack = [];
    for (const c of num) {
        while (k > 0 && stack.length && stack[stack.length-1] > c) {
            stack.pop(); k--;
        }
        stack.push(c);
    }
    // Remove remaining k digits from end
    while (k-- > 0) stack.pop();
    // Remove leading zeros
    const result = stack.join('').replace(/^0+/, '');
    return result || '0';
}

// Largest number from array of integers
function largestNumber(nums) {
    const strs = nums.map(String);
    strs.sort((a, b) => (b + a).localeCompare(a + b));
    const result = strs.join('');
    return result[0] === '0' ? '0' : result;
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
      title: 'Remove K Digits',
      url: 'https://leetcode.com/problems/remove-k-digits/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Monotone increasing stack — pop when digit decreases and k > 0',
          explanation: `Maintain stack of digits. When current digit < top and k > 0: pop (remove larger digit). After scan, remove remaining k from tail. Strip leading zeros.`,
          code: `var removeKdigits = function(num, k) {
    const st=[];
    for(const c of num){
        while(k&&st.length&&st[st.length-1]>c){st.pop();k--;}
        st.push(c);
    }
    while(k--) st.pop();
    return st.join('').replace(/^0+/,'')||'0';
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Largest Number',
      url: 'https://leetcode.com/problems/largest-number/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Custom comparator — compare a+b vs b+a as strings',
          explanation: `To decide order of two numbers a and b: compare str(a)+str(b) vs str(b)+str(a). If a+b > b+a, a should come first. Sort descending by this comparator.`,
          code: `var largestNumber = function(nums) {
    const s=nums.map(String).sort((a,b)=>(b+a>a+b?1:-1));
    return s[0]==='0'?'0':s.join('');
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Reorganize String',
      url: 'https://leetcode.com/problems/reorganize-string/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Greedy — always place most frequent character that\'s not the last placed',
          explanation: `Max-heap by frequency. At each step, take the most frequent char (if not same as previous), place it. If most frequent is same as previous, take second most frequent. If only one char left and it equals last placed, impossible.`,
          code: `var reorganizeString = function(s) {
    const freq=new Array(26).fill(0);
    for(const c of s) freq[c.charCodeAt(0)-97]++;
    // Check feasibility
    if(Math.max(...freq)>(s.length+1)>>1) return '';
    // Greedy: alternate placing sorted by frequency
    const sorted=[...freq.entries()].sort((a,b)=>b[1]-a[1]);
    const res=new Array(s.length);
    let idx=0;
    for(const [c,f] of sorted){
        for(let i=0;i<f;i++){
            if(idx>=s.length) idx=1;
            res[idx]=String.fromCharCode(97+c);
            idx+=2;
        }
    }
    return res.join('');
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Remove Duplicate Letters',
      url: 'https://leetcode.com/problems/remove-duplicate-letters/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Greedy stack — pop larger chars when they appear later',
          explanation: `Maintain stack of chosen chars. For each char c: if already in stack, skip. If c < stack top AND top char appears later (lastOccurrence[top] > i): pop. Push c. Track remaining occurrences to know if we can pop.`,
          code: `var removeDuplicateLetters = function(s) {
    const cnt=new Array(26).fill(0), inStack=new Array(26).fill(false);
    for(const c of s) cnt[c.charCodeAt(0)-97]++;
    const st=[];
    for(const c of s){
        const ci=c.charCodeAt(0)-97; cnt[ci]--;
        if(inStack[ci]) continue;
        while(st.length&&c<st[st.length-1]&&cnt[st[st.length-1].charCodeAt(0)-97]>0){
            inStack[st.pop().charCodeAt(0)-97]=false;
        }
        st.push(c); inStack[ci]=true;
    }
    return st.join('');
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '✂️',
      color: 'red',
      content: `**Greedy string toolkit:**\n- Smallest number after k removals: monotone increasing stack\n- Largest concatenation: custom comparator a+b vs b+a\n- No two adjacent same: max-heap interleaving (feasible if max_freq ≤ (n+1)/2)\n- Lexicographically smallest subsequence (no dups): stack + can-pop-later check\n\n**Monotone stack greedy principle:** Maintain invariant (increasing/decreasing) by popping violations when the budget (k removals, future occurrences) allows. The stack always represents the current best prefix.`,
    },
  ],
}
