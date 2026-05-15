import type { Article } from '../articles'

export const expressionParsingArticle: Article = {
  slug: 'expression-parsing',
  title: 'Expression Parsing & Evaluation',
  emoji: '🧮',
  tagline: 'Stack-based evaluation. Shunting-Yard for precedence. Recursive descent parser.',
  description: 'Expression parsing covers: evaluating arithmetic expressions with precedence, parentheses, and unary operators. Two approaches: (1) Stack-based two-stack algorithm (values + operators); (2) Recursive descent parser (each precedence level is a function). Applications: calculator problems, expression trees, boolean expression evaluation, and serialization problems.',
  gradient: 'from-blue-800 to-indigo-900',
  topicSlug: 'dp',
  readTime: '15 min',
  sections: [
    {
      type: 'text',
      content: `The two-stack algorithm: maintain a values stack and an operators stack. When current operator has lower or equal precedence than stack top, pop and apply. This implements the Shunting-Yard algorithm inline. For complex grammars with multiple precedence levels, recursive descent is cleaner: expr() calls term() which calls factor(), mirroring the grammar rules.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Two-stack expression evaluator',
      code: `function evaluate(s) {
    const vals = [], ops = [];
    const prec = {'+': 1, '-': 1, '*': 2, '/': 2};
    const apply = () => {
        const b = vals.pop(), a = vals.pop(), op = ops.pop();
        if (op === '+') vals.push(a + b);
        else if (op === '-') vals.push(a - b);
        else if (op === '*') vals.push(a * b);
        else vals.push(Math.trunc(a / b));
    };
    let i = 0;
    while (i < s.length) {
        const c = s[i];
        if (c === ' ') { i++; continue; }
        if (c >= '0' && c <= '9') {
            let num = 0;
            while (i < s.length && s[i] >= '0' && s[i] <= '9') num = num * 10 + +s[i++];
            vals.push(num);
        } else if (c === '(') { ops.push(c); i++; }
        else if (c === ')') {
            while (ops.at(-1) !== '(') apply();
            ops.pop(); i++;
        } else { // operator
            while (ops.length && ops.at(-1) !== '(' && prec[ops.at(-1)] >= prec[c]) apply();
            ops.push(c); i++;
        }
    }
    while (ops.length) apply();
    return vals[0];
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
      title: 'Basic Calculator',
      url: 'https://leetcode.com/problems/basic-calculator/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Stack for parenthesized expressions',
          explanation: `Only + and - operators. Push current result and sign to stack when we see '('. Pop and combine when we see ')'. Maintain running sum and current sign.`,
          code: `var calculate = function(s) {
    const stack=[]; let res=0,sign=1,num=0;
    for(const c of s){
        if(c>='0'&&c<='9') num=num*10+(+c);
        else if(c==='+'){res+=sign*num;num=0;sign=1;}
        else if(c==='-'){res+=sign*num;num=0;sign=-1;}
        else if(c==='('){stack.push(res,sign);res=0;sign=1;}
        else if(c===')'){res+=sign*num;num=0;res=stack.pop()*res+stack.pop();}
    }
    return res+sign*num;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Basic Calculator II',
      url: 'https://leetcode.com/problems/basic-calculator-ii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Stack with sign application — apply * and / immediately',
          explanation: `Process each operator with its following number. +/-: push signed number. *//: pop, apply to current number, push result. Sum stack at end.`,
          code: `var calculate = function(s) {
    const stack=[]; let num=0, op='+';
    for(let i=0;i<=s.length;i++){
        const c=s[i];
        if(c>='0'&&c<='9') num=num*10+(+c);
        else if(c&&c!==' '||i===s.length){
            if(op==='+') stack.push(num);
            else if(op==='-') stack.push(-num);
            else if(op==='*') stack.push(stack.pop()*num);
            else stack.push(Math.trunc(stack.pop()/num));
            num=0; op=c;
        }
    }
    return stack.reduce((a,b)=>a+b,0);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Evaluate Reverse Polish Notation',
      url: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Stack — push numbers, pop and apply on operator',
          explanation: `Postfix (RPN) needs no precedence rules. Push numbers. On operator: pop two operands, apply, push result. Final stack has the answer.`,
          code: `var evalRPN = function(tokens) {
    const stack=[];
    for(const t of tokens){
        if('+-*/'.includes(t)){
            const[b,a]=[stack.pop(),stack.pop()];
            if(t==='+') stack.push(a+b);
            else if(t==='-') stack.push(a-b);
            else if(t==='*') stack.push(a*b);
            else stack.push(Math.trunc(a/b));
        } else stack.push(+t);
    }
    return stack[0];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Evaluate Boolean Expression',
      url: 'https://leetcode.com/problems/parsing-a-boolean-expression/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Recursive parsing or stack-based evaluation',
          explanation: `Recursive approach: read operator, then recursively evaluate each comma-separated sub-expression. Base cases: 't'/'f'. Operators: '!' (one arg), '&' (all), '|' (any).`,
          code: `var parseBoolExpr = function(expression) {
    let i=0;
    const parse=()=>{
        const c=expression[i++];
        if(c==='t') return true;
        if(c==='f') return false;
        i++; // '('
        const args=[];
        while(expression[i]!==')'){
            args.push(parse());
            if(expression[i]===',') i++;
        }
        i++; // ')'
        if(c==='!') return !args[0];
        if(c==='&') return args.every(Boolean);
        return args.some(Boolean);
    };
    return parse();
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧮',
      color: 'blue',
      content: `**Expression parsing approaches:**\n- Two-stack (Shunting-Yard inline): O(n), handles precedence via stack comparison\n- Recursive descent: each function = one grammar rule, easiest to extend\n- Postfix (RPN): no precedence needed, simple stack evaluation\n\n**Two-stack rules:**\n- Number: push to value stack\n- Operator: pop and apply while stack operator has higher/equal precedence\n- '(': push to op stack\n- ')': pop and apply until '(' found\n\n**When to use recursive descent:** Multiple operators, unary operators, or complex grammar. Structure: expr → term (('+'/'-') term)*; term → factor (('*'/'/') factor)*; factor → number | '(' expr ')'.`,
    },
  ],
}
