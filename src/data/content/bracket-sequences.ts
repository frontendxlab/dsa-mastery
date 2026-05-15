import type { Article } from '../articles'

export const bracketSequencesArticle: Article = {
  slug: 'bracket-sequences',
  title: 'Bracket Sequences',
  emoji: '🔗',
  tagline: 'Stack for matching. Count valid sequences. DP for generation. Min removals.',
  description: 'Bracket sequence problems cover: validating balanced parentheses, counting minimum removals to make valid, longest valid substring, generating all valid sequences, and scoring nested structures. The stack is the core tool — push open brackets, pop on close, check match. DP generates/counts valid sequences. Two-pass or stack-based approaches find longest valid substrings.',
  gradient: 'from-purple-500 to-indigo-600',
  topicSlug: 'dp',
  readTime: '15 min',
  sections: [
    {
      type: 'text',
      content: `Bracket problems share a core insight: a valid bracket sequence has, at every prefix, at least as many opens as closes. A stack tracks unmatched opens. For multiple bracket types, the stack must verify that the top matches each closing bracket. For counting problems, think of opens as +1 and closes as -1 — valid sequences are those where the running sum never goes negative and ends at 0.`,
    },
    {
      type: 'table',
      headers: ['Problem Type', 'Technique', 'Complexity'],
      rows: [
        ['Validate balanced brackets', 'Stack matching', 'O(n)'],
        ['Minimum removals to validate', 'Count unmatched opens + closes', 'O(n)'],
        ['Longest valid substring', 'Stack with indices or two-pass', 'O(n)'],
        ['Generate all valid sequences', 'Backtracking with open/close counts', 'O(C_n * n)'],
        ['Score nested brackets', 'Stack + push/pop layer values', 'O(n)'],
        ['Count valid subsequences', 'DP: dp[i][j] = count with i opens unmatched', 'O(n²)'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Valid Parentheses',
      url: 'https://leetcode.com/problems/valid-parentheses/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Stack — push opens, pop and match on close',
          explanation: `For every opening bracket, push it. For every closing bracket, check if top of stack matches. If mismatch or stack empty: invalid. Final state: stack must be empty.`,
          code: `var isValid = function(s) {
    const stack=[], match={'(':')','[':']','{':'}'};
    for(const c of s){
        if(match[c]) stack.push(c);
        else if(match[stack.pop()]!==c) return false;
    }
    return stack.length===0;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Longest Valid Parentheses',
      url: 'https://leetcode.com/problems/longest-valid-parentheses/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Stack of indices — track last unmatched position',
          explanation: `Push index -1 as base. For each '(', push its index. For each ')', pop: if stack empty, push current index as new base; else length = i - stack top.`,
          code: `var longestValidParentheses = function(s) {
    const stack=[-1]; let res=0;
    for(let i=0;i<s.length;i++){
        if(s[i]==='(') stack.push(i);
        else {
            stack.pop();
            if(!stack.length) stack.push(i);
            else res=Math.max(res,i-stack.at(-1));
        }
    }
    return res;
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Two-pass left/right counters',
          explanation: `Left to right: count opens and closes. When equal: update max. When closes > opens: reset both. Right to left: same with swapped roles. Handles all cases without stack.`,
          code: `var longestValidParentheses = function(s) {
    let res=0;
    // Left to right
    let [open,close]=[0,0];
    for(const c of s){
        c==='('?open++:close++;
        if(open===close) res=Math.max(res,2*close);
        else if(close>open) open=close=0;
    }
    [open,close]=[0,0];
    // Right to left
    for(let i=s.length-1;i>=0;i--){
        s[i]==='('?open++:close++;
        if(open===close) res=Math.max(res,2*open);
        else if(open>close) open=close=0;
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
      title: 'Minimum Remove to Make Valid Parentheses',
      url: 'https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Stack of unmatched open indices, mark for removal',
          explanation: `Stack holds indices of unmatched '('. For each ')': if stack has unmatched '(', pop it (matched). Otherwise, mark ')' for removal. After pass, all remaining indices in stack are unmatched '(' — mark them too. Build result skipping marked.`,
          code: `var minRemoveToMakeValid = function(s) {
    const arr=[...s], stack=[], remove=new Set();
    for(let i=0;i<arr.length;i++){
        if(arr[i]==='(') stack.push(i);
        else if(arr[i]===')'){
            if(stack.length) stack.pop();
            else remove.add(i);
        }
    }
    for(const i of stack) remove.add(i);
    return arr.filter((_,i)=>!remove.has(i)).join('');
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Generate Parentheses',
      url: 'https://leetcode.com/problems/generate-parentheses/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Backtracking — track open and close counts',
          explanation: `Build string recursively. At each position: can add '(' if open < n; can add ')' if close < open. Valid sequence formed when both reach n.`,
          code: `var generateParenthesis = function(n) {
    const res=[];
    const bt=(s,open,close)=>{
        if(s.length===2*n){res.push(s);return;}
        if(open<n) bt(s+'(',open+1,close);
        if(close<open) bt(s+')',open,close+1);
    };
    bt('',0,0);
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Score of Parentheses',
      url: 'https://leetcode.com/problems/score-of-parentheses/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Stack — push 0 on open, merge on close',
          explanation: `Push 0 when seeing '('. On ')': pop top value v. If v=0, push 1 (empty pair "()"). If v>0, push 2*v (nested). Add pairs at same level.`,
          code: `var scoreOfParentheses = function(s) {
    const stack=[0]; // base score
    for(const c of s){
        if(c==='(') stack.push(0);
        else {
            const v=stack.pop();
            stack[stack.length-1]+=Math.max(2*v,1);
        }
    }
    return stack[0];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 6,
      title: 'Check if a Parentheses String Can Be Valid',
      url: 'https://leetcode.com/problems/check-if-a-parentheses-string-can-be-valid/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Track range of possible open counts',
          explanation: `Maintain [lo, hi] = range of possible unmatched open counts. '*' expands range: lo-1..hi+1 (clamped to 0). '(' shifts up: lo+1, hi+1. ')' shifts down: lo-1, hi-1. If hi < 0 at any point: impossible. Final lo must be 0.`,
          code: `var canBeValid = function(s, locked) {
    if(s.length%2) return false;
    let lo=0,hi=0;
    for(let i=0;i<s.length;i++){
        if(locked[i]==='0'){ lo=Math.max(lo-1,0); hi++; }
        else if(s[i]==='('){ lo++;hi++; }
        else { lo=Math.max(lo-1,0); hi--; }
        if(hi<0) return false;
    }
    return lo===0;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🔗',
      color: 'blue',
      content: `**Bracket sequence mental models:**\n- Validation: stack match, O(n)\n- Min removals: count unmatched open + unmatched close in two passes\n- Longest valid: stack of indices, track "last invalid" position\n- Generation: backtracking with (open < n) and (close < open) constraints\n- Counting valid: dp[opens_so_far], transitions +1 or -1\n\n**Multiple bracket types:** Stack must verify each close matches the top. If top is wrong type OR stack empty → invalid.\n\n**Nested score / sum:** Push layer value on open, merge and multiply on close.`,
    },
  ],
}
