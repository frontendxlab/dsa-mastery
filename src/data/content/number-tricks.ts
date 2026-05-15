import type { Article } from '../articles'

export const numberTricksArticle: Article = {
  slug: 'number-tricks',
  title: 'Number Manipulation Tricks',
  emoji: '🔢',
  tagline: 'Reverse digits, Roman numerals, palindrome numbers, Excel column mapping.',
  description: 'Number manipulation problems involve converting between representations, reversing digits, checking palindromes, or mapping between number systems. Key techniques: extract digits with mod/div, build number with multiply-and-add, check palindrome by reversing half, convert between base-26 and integers, and Roman numeral parsing with subtraction rule handling.',
  gradient: 'from-yellow-700 to-amber-800',
  topicSlug: 'math',
  readTime: '11 min',
  sections: [
    {
      type: 'text',
      content: `Digit extraction: last digit = n % 10, remove last digit = Math.floor(n/10). Reverse a number: pop digits and push into result. Palindrome check: reverse second half and compare with first half (handles even/odd length). Base conversion: repeated division by base gives digits in reverse. Roman numerals: scan left to right, subtract when smaller value appears before larger.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Reverse integer and palindrome number patterns',
      code: `// Reverse integer — handle overflow
function reverseInt(x) {
    let rev = 0;
    while (x !== 0) {
        const digit = x % 10; // extracts last digit (negative for negative x)
        x = Math.trunc(x / 10);
        rev = rev * 10 + digit;
    }
    // Check 32-bit signed integer overflow
    if (rev < -(2**31) || rev > 2**31 - 1) return 0;
    return rev;
}

// Palindrome number — reverse second half
function isPalindrome(x) {
    if (x < 0 || (x % 10 === 0 && x !== 0)) return false;
    let rev = 0;
    while (x > rev) {
        rev = rev * 10 + x % 10;
        x = Math.floor(x / 10);
    }
    return x === rev || x === Math.floor(rev / 10); // even or odd length
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
      title: 'Integer to Roman',
      url: 'https://leetcode.com/problems/integer-to-roman/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Greedy — repeatedly subtract largest Roman value that fits',
          explanation: `Table of (value, symbol) pairs in descending order including subtraction cases (CM, CD, XC, XL, IX, IV). Greedily subtract the largest fitting value, appending its symbol.`,
          code: `var intToRoman = function(num) {
    const vals=[[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],
                [50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];
    let res='';
    for(const [v,s] of vals){while(num>=v){res+=s;num-=v;}}
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Roman to Integer',
      url: 'https://leetcode.com/problems/roman-to-integer/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Scan left to right — subtract if current < next, else add',
          explanation: `Map each Roman character to its value. Scan: if current symbol value < next symbol value, subtract it. Otherwise add it. (IV = -1 + 5 = 4).`,
          code: `var romanToInt = function(s) {
    const m={I:1,V:5,X:10,L:50,C:100,D:500,M:1000};
    let res=0;
    for(let i=0;i<s.length;i++)
        res+=m[s[i]]<(m[s[i+1]]||0)?-m[s[i]]:m[s[i]];
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Excel Sheet Column Title',
      url: 'https://leetcode.com/problems/excel-sheet-column-title/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Modified base-26 with 1-indexing',
          explanation: `Not standard base-26 (A=1 not 0). At each step: remainder = (n-1) % 26 gives the last character (0→A, 25→Z). Then n = Math.floor((n-1)/26). The -1 shifts from 1-indexed to 0-indexed.`,
          code: `var convertToTitle = function(columnNumber) {
    let res='';
    while(columnNumber>0){
        columnNumber--;
        res=String.fromCharCode(65+columnNumber%26)+res;
        columnNumber=Math.floor(columnNumber/26);
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
      title: 'Happy Number',
      url: 'https://leetcode.com/problems/happy-number/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Floyd\'s cycle detection on the digit-sum sequence',
          explanation: `Compute sum of squares of digits repeatedly. If reaches 1, it\'s happy. If enters a cycle not including 1, it\'s not happy. Use slow/fast pointers to detect cycle in O(1) space.`,
          code: `var isHappy = function(n) {
    const sumSq=n=>{let s=0;while(n){s+=(n%10)**2;n=Math.floor(n/10);}return s;};
    let slow=n,fast=sumSq(n);
    while(fast!==1&&slow!==fast){slow=sumSq(slow);fast=sumSq(sumSq(fast));}
    return fast===1;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Multiply Strings',
      url: 'https://leetcode.com/problems/multiply-strings/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Simulate grade-school multiplication digit by digit',
          explanation: `Result of multiplying m-digit and n-digit numbers has at most m+n digits. pos1 = i+j, pos2 = i+j+1 for digits at positions i and j. Accumulate products, then carry.`,
          code: `var multiply = function(num1, num2) {
    const m=num1.length,n=num2.length,pos=new Array(m+n).fill(0);
    for(let i=m-1;i>=0;i--) for(let j=n-1;j>=0;j--){
        const mul=(num1[i]-'0')*(num2[j]-'0');
        const p1=i+j,p2=i+j+1,sum=mul+pos[p2];
        pos[p2]=sum%10; pos[p1]+=Math.floor(sum/10);
    }
    return pos.join('').replace(/^0+/,'')||'0';
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🔢',
      color: 'amber',
      content: `**Digit extraction idioms:**\n- Last digit: \`n % 10\`\n- Remove last digit: \`Math.trunc(n / 10)\` (trunc for negatives!)\n- Palindrome check: reverse second half, compare (handles overflow)\n- Base-k encoding: repeated modulo with reversed-digit reconstruction\n\n**1-indexed base-26 (Excel columns):** Subtract 1 before modulo to convert from 1-indexed (A=1) to 0-indexed (A=0). Standard base conversion: subtract 0.\n\n**Overflow trick for palindrome:** Instead of reversing the full number (overflow risk), only reverse the second half and compare. Stop when reversed ≥ remaining.`,
    },
  ],
}
