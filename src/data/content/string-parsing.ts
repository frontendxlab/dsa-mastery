import type { Article } from '../articles'

export const stringParsingArticle: Article = {
  slug: 'string-parsing',
  title: 'String Parsing & Integer Conversion',
  emoji: '📝',
  tagline: 'atoi, add binary/strings, multiply strings, number to/from base.',
  description: 'String parsing problems convert between string and numeric representations. Key patterns: atoi (handle leading whitespace, sign, overflow, non-digit stop), add binary/strings (digit-by-digit from end with carry), multiply strings (grade-school multiplication), number base conversion. These require careful handling of edge cases: empty string, overflow, leading zeros, negative numbers.',
  gradient: 'from-slate-600 to-zinc-700',
  topicSlug: 'dp',
  readTime: '11 min',
  sections: [
    {
      type: 'text',
      content: `atoi: (1) skip leading whitespace, (2) optional sign, (3) digits until non-digit, (4) clamp to 32-bit range. Add binary: process from right, maintain carry, prepend digits. Add strings: same pattern for decimal. Multiply strings: result[i+j] and result[i+j+1] positions for digits at i and j. Process from right to left.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'atoi and add binary templates',
      code: `// String to integer (atoi)
function myAtoi(s) {
    let i = 0, sign = 1, result = 0;
    const MAX = 2147483647, MIN = -2147483648;
    // Skip whitespace
    while (i < s.length && s[i] === ' ') i++;
    // Sign
    if (i < s.length && (s[i] === '+' || s[i] === '-'))
        sign = s[i++] === '-' ? -1 : 1;
    // Digits
    while (i < s.length && s[i] >= '0' && s[i] <= '9') {
        const digit = s[i++] - '0';
        if (result > Math.floor((MAX - digit) / 10)) // overflow check
            return sign === 1 ? MAX : MIN;
        result = result * 10 + digit;
    }
    return sign * result;
}

// Add two binary strings
function addBinary(a, b) {
    let i = a.length - 1, j = b.length - 1, carry = 0;
    const result = [];
    while (i >= 0 || j >= 0 || carry) {
        const sum = (i >= 0 ? +a[i--] : 0) + (j >= 0 ? +b[j--] : 0) + carry;
        result.push(sum % 2);
        carry = Math.floor(sum / 2);
    }
    return result.reverse().join('');
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
      title: 'String to Integer (atoi)',
      url: 'https://leetcode.com/problems/string-to-integer-atoi/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: State machine — whitespace → sign → digits → stop',
          explanation: `Skip leading spaces. Optional +/-. Parse digits until non-digit. Multiply result × 10 + digit each step. Clamp to [-2^31, 2^31-1] after each digit to avoid overflow.`,
          code: `var myAtoi = function(s) {
    let i=0,sign=1,res=0;
    const MAX=2147483647,MIN=-2147483648;
    while(s[i]===' ') i++;
    if(s[i]==='-'||s[i]==='+') sign=s[i++]==='-'?-1:1;
    while(i<s.length&&s[i]>='0'&&s[i]<='9'){
        const d=s[i++]-'0';
        if(res>(MAX-d)/10) return sign===1?MAX:MIN;
        res=res*10+d;
    }
    return sign*res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Add Binary',
      url: 'https://leetcode.com/problems/add-binary/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Process from right with carry',
          explanation: `Two pointers from end. At each step: sum = a[i] + b[j] + carry. Digit = sum % 2. Carry = sum >> 1. Continue while either pointer valid or carry > 0. Reverse result.`,
          code: `var addBinary = function(a, b) {
    let i=a.length-1,j=b.length-1,carry=0;
    const res=[];
    while(i>=0||j>=0||carry){
        const s=(i>=0?+a[i--]:0)+(j>=0?+b[j--]:0)+carry;
        res.push(s%2); carry=s>>1;
    }
    return res.reverse().join('');
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Add Strings',
      url: 'https://leetcode.com/problems/add-strings/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Same as add binary but base 10',
          explanation: `Two pointers from end. Sum digits and carry. Continue until both exhausted and no carry.`,
          code: `var addStrings = function(num1, num2) {
    let i=num1.length-1,j=num2.length-1,carry=0;
    const res=[];
    while(i>=0||j>=0||carry){
        const s=(i>=0?+num1[i--]:0)+(j>=0?+num2[j--]:0)+carry;
        res.push(s%10); carry=Math.floor(s/10);
    }
    return res.reverse().join('');
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Integer to English Words',
      url: 'https://leetcode.com/problems/integer-to-english-words/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Process 3 digits at a time, prepend thousand/million/billion',
          explanation: `Split number into groups of 3 from right. For each group (0-999), convert to words using helper. Append scale word (Thousand, Million, Billion). Combine groups from highest to lowest.`,
          code: `var numberToWords = function(num) {
    if(num===0) return 'Zero';
    const ones=['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen'];
    const tens=['','','Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety'];
    const helper=n=>{
        if(n===0) return '';
        if(n<20) return ones[n]+' ';
        if(n<100) return tens[Math.floor(n/10)]+' '+(n%10?ones[n%10]+' ':'');
        return ones[Math.floor(n/100)]+'Hundred '+helper(n%100);
    };
    const billions=['','Thousand ','Million ','Billion '];
    let res='', i=0;
    while(num>0){
        if(num%1000!==0) res=helper(num%1000)+billions[i]+res;
        num=Math.floor(num/1000); i++;
    }
    return res.trim();
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '📝',
      color: 'gray',
      content: `**atoi edge cases checklist:** Leading whitespace, optional sign, overflow (check before multiplying), stop at non-digit, return 0 for empty/no-digit input.\n\n**Add binary/strings trick:** Process from right with carry. Loop condition: i >= 0 OR j >= 0 OR carry. This handles different lengths and final carry automatically.\n\n**Multiply strings:** Result length ≤ m+n. For digits at positions i (from right in num1) and j (from right in num2): add to pos[i+j+1] and pos[i+j] for tens carry. Single pass over all digit pairs.`,
    },
  ],
}
