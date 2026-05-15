import type { Article } from '../articles'

export const carryDpArticle: Article = {
  slug: 'carry-dp',
  title: 'Carry & Digit Manipulation DP',
  emoji: '🔢',
  tagline: 'DP tracking carries in arithmetic operations. Count valid assignments with constraints.',
  description: 'Carry DP handles problems involving arithmetic column-by-column with carry state: count valid digit assignments where columns satisfy constraints, verify if a sum is achievable, or minimize operations involving carries. Also covers digit sum tricks, parity tracking, and number construction problems where you process digits from least significant to most significant.',
  gradient: 'from-amber-800 to-yellow-900',
  topicSlug: 'math',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `Carry DP processes arithmetic column by column. State: carry value (typically 0 or 1 for binary, 0..9 for decimal). Transition: for each column, sum of column digits + incoming carry = column result + 10 × outgoing carry. Count valid digit assignments or verify feasibility. Digit sum DP is a special case: digits must satisfy a target sum, optionally with the tight constraint from digit DP.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Carry DP template for digit addition',
      code: `// Count ways to assign k-digit values to n variables so their sum = target
// Each variable's digit can be 0-9 in each position
// Process position by position (from LSB), tracking carry

function countValidAssignments(n, target, numDigits) {
    // dp[carry] = number of ways to achieve this carry after processing current digit position
    let dp = new Map([[0, 1]]); // initial state: carry = 0

    // Process each digit position
    for (let pos = 0; pos < numDigits; pos++) {
        const targetDigit = Math.floor(target / Math.pow(10, pos)) % 10;
        const newDp = new Map();

        for (const [carry, ways] of dp) {
            // Try all possible sums for this column (0 to 9*n)
            // The n variables each contribute one digit
            for (let colSum = 0; colSum <= 9 * n; colSum++) {
                const total = colSum + carry;
                const outDigit = total % 10;
                const newCarry = Math.floor(total / 10);

                if (outDigit === targetDigit) {
                    // Count assignments giving colSum in n variables
                    const assignments = countDigitCombinations(n, colSum, 0, 9);
                    newDp.set(newCarry, (newDp.get(newCarry) || 0) + ways * assignments);
                }
            }
        }
        dp = newDp;
    }
    return dp.get(0) || 0; // must finish with carry = 0
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
      title: 'Check if Number Has Equal Digit Count and Digit Value',
      url: 'https://leetcode.com/problems/check-if-number-has-equal-digit-count-and-digit-value/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Verify each digit against its digit frequency',
          explanation: `num[i] should equal count of digit i in the string. Count all digit frequencies, then verify.`,
          code: `var digitCount = function(num) {
    const cnt=new Array(10).fill(0);
    for(const c of num) cnt[+c]++;
    for(let i=0;i<num.length;i++) if(cnt[i]!==+num[i]) return false;
    return true;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Numbers With Repeated Digits',
      url: 'https://leetcode.com/problems/numbers-with-repeated-digits/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Digit DP — count numbers without repeated digits, subtract',
          explanation: `Count numbers in [1, n] WITHOUT repeated digits, then subtract from n. Use digit DP with bitmask of used digits as state.`,
          code: `var numDupDigitsAtMostN = function(n) {
    const s=String(n+1), m=s.length;
    // Count numbers < n+1 without repeated digits
    const perm=(n,k)=>{let r=1;for(let i=0;i<k;i++){r*=(n-i);}return r;};
    let noRepeat=0;
    // All numbers with fewer digits
    for(let len=1;len<m;len++) noRepeat+=9*perm(9,len-1);
    // Numbers with same number of digits as n+1
    const usedMask=new Set();
    for(let i=0;i<m;i++){
        const start=i===0?1:0, end=+s[i];
        for(let d=start;d<end;d++){
            if(usedMask.has(d)) continue;
            noRepeat+=perm(9-i,m-i-1);
        }
        if(usedMask.has(+s[i])) break;
        usedMask.add(+s[i]);
    }
    return n-noRepeat;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Maximum Number After Digit Swaps',
      url: 'https://leetcode.com/problems/maximum-number-after-digit-swaps/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Swap odd-indexed with smallest larger digit',
          explanation: `For each digit at odd index: if there's a larger digit at an even index to the right, swap. Actually: only swap even-indexed digits with larger even-indexed digits, odd with odd. Use greedy: for each position, find the rightmost maximum to the right (same parity index) and swap.`,
          code: `var maximumSwap = function(num) {
    const d=[...String(num)];
    const last=new Array(10).fill(-1);
    for(let i=0;i<d.length;i++) last[+d[i]]=i;
    for(let i=0;i<d.length;i++){
        for(let dig=9;dig>+d[i];dig--){
            if(last[dig]>i){
                [d[i],d[last[dig]]]=[d[last[dig]],d[i]];
                return +d.join('');
            }
        }
    }
    return num;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🔢',
      color: 'amber',
      content: `**Carry DP key insight:** Arithmetic on digits works column by column. State = carry value from previous column. For addition of n numbers, carry ≤ n (for decimal: 0..n).\n\n**Digit sum DP:** More general — count numbers with specific digit sum, sum within range, etc. State = (position, current_sum, tight_bound, leading_zero).\n\n**Common patterns:**\n- Column verification: does a digit assignment satisfy arithmetic constraint?\n- Count valid n-tuples: n variables summing to target in each column\n- Number reconstruction: build number digit by digit satisfying constraints`,
    },
  ],
}
