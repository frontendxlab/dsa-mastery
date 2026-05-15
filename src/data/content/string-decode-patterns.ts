import type { Article } from '../articles'

export const stringDecodePattersArticle: Article = {
  slug: 'string-decode-patterns',
  title: 'String Decode & Transform Patterns',
  emoji: '🔓',
  tagline: 'Decode encoded strings, run-length encoding, parenthesis-based nesting.',
  description: 'String decode problems parse encoded formats: "3[ab]" → "ababab", run-length encoding/decoding, nested bracket expansion, and custom encodings. Core tool: stack-based parsing — push current string and repeat count on "[", pop and repeat on "]". Variants: multiple nesting levels, nested multipliers, recursive descent for complex grammars.',
  gradient: 'from-pink-700 to-rose-800',
  topicSlug: 'dp',
  readTime: '12 min',
  sections: [
    {
      type: 'text',
      content: `Decode string with nested brackets: iterate characters. On digit: parse full number. On "[": push (current_string, current_count) to stack, reset. On "]": pop (prev_string, count), current_string = prev_string + current_string.repeat(count). On letter: append to current_string. Stack maintains the "context" at each nesting level.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Decode string with stack template',
      code: `// Decode "3[ab2[c]]" → "ababcc"
function decodeString(s) {
    const stack = []; // [{str, k}]
    let current = '', k = 0;

    for (const c of s) {
        if (c >= '0' && c <= '9') {
            k = k * 10 + parseInt(c); // handle multi-digit numbers
        } else if (c === '[') {
            stack.push({str: current, k}); // save context
            current = ''; k = 0;          // reset for inner string
        } else if (c === ']') {
            const {str, k: times} = stack.pop();
            current = str + current.repeat(times); // expand inner
        } else {
            current += c;
        }
    }
    return current;
}

// Run-length encoding
function encode(s) {
    let result = '', count = 1;
    for (let i = 1; i <= s.length; i++) {
        if (i < s.length && s[i] === s[i-1]) count++;
        else { result += (count > 1 ? count : '') + s[i-1]; count = 1; }
    }
    return result;
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
      title: 'Decode String',
      url: 'https://leetcode.com/problems/decode-string/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Stack — push context at "[", restore and repeat at "]"',
          explanation: `Stack stores (current_string, current_k). On "[": push and reset. On "]": pop prev context, current = prev + current * k. On digit: build k. On letter: append.`,
          code: `var decodeString = function(s) {
    const stack=[]; let cur='',k=0;
    for(const c of s){
        if(c>='0'&&c<='9') k=k*10+Number(c);
        else if(c==='['){stack.push([cur,k]);cur='';k=0;}
        else if(c===']'){const [prev,t]=stack.pop();cur=prev+cur.repeat(t);}
        else cur+=c;
    }
    return cur;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'String Compression',
      url: 'https://leetcode.com/problems/string-compression/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Two pointers — read pointer scans, write pointer writes compressed',
          explanation: `Read pointer advances through runs of same character. Write pointer writes char and then count digits (if count > 1). Return write pointer position.`,
          code: `var compress = function(chars) {
    let write=0,i=0;
    while(i<chars.length){
        const c=chars[i]; let cnt=0;
        while(i<chars.length&&chars[i]===c){i++;cnt++;}
        chars[write++]=c;
        if(cnt>1) for(const d of String(cnt)) chars[write++]=d;
    }
    return write;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Count and Say',
      url: 'https://leetcode.com/problems/count-and-say/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Iteratively build each sequence from previous',
          explanation: `Start from "1". For each step, read the previous string and describe it: count consecutive same digits, write (count)(digit). Repeat n-1 times.`,
          code: `var countAndSay = function(n) {
    let s='1';
    for(let i=1;i<n;i++){
        let next='', j=0;
        while(j<s.length){
            let cnt=1;
            while(j+cnt<s.length&&s[j+cnt]===s[j]) cnt++;
            next+=cnt+s[j]; j+=cnt;
        }
        s=next;
    }
    return s;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Encode and Decode Strings',
      url: 'https://leetcode.com/problems/encode-and-decode-strings/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Length-prefix encoding — "4#word" format',
          explanation: `Encode each string as "length#string". Decode: read until "#" for length, then read that many characters. Handles any character including special chars, because we use length not delimiters.`,
          code: `var encode = function(strs) {
    return strs.map(s=>s.length+'#'+s).join('');
};
var decode = function(s) {
    const res=[]; let i=0;
    while(i<s.length){
        let j=i;
        while(s[j]!=='#') j++;
        const len=Number(s.slice(i,j));
        res.push(s.slice(j+1,j+1+len));
        i=j+1+len;
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🔓',
      color: 'pink',
      content: `**Nested decode stack pattern:**\n1. On "[": push (current_string, current_multiplier) to stack; reset current\n2. On "]": pop (prev, k); current = prev + current.repeat(k)\n3. On digit: build multiplier (k = k*10 + digit) for multi-digit numbers\n4. On letter: append to current\n\n**Encoding schemes:**\n- Run-length: "aabbbcc" → "a2b3c2" (or "2a3b2c" depending on format)\n- Length-prefix: "length#string" — safe for any content\n- Delimiter: works only if delimiter doesn't appear in content\n\n**Recursive descent:** For complex grammars, implement explicit recursive functions for each grammar rule instead of a single-pass stack.`,
    },
  ],
}
