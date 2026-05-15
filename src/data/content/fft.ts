import type { Article } from '../articles'

export const fftArticle: Article = {
  slug: 'fft',
  title: 'FFT & Polynomial Multiplication',
  emoji: '〰️',
  tagline: 'Multiply polynomials in O(n log n). Convolution. Count pairs summing to k.',
  description: 'Fast Fourier Transform (FFT) multiplies two polynomials of degree n in O(n log n) instead of O(n²). Convert coefficients to point-value form at roots of unity, multiply pointwise, convert back (IFFT). Applications: polynomial multiplication, large number multiplication, counting pairs/triplets with target sum, string pattern matching with wildcards, convolutions in signal processing. NTT (Number Theoretic Transform) is the modular arithmetic version.',
  gradient: 'from-blue-700 to-indigo-800',
  topicSlug: 'math',
  readTime: '18 min',
  sections: [
    {
      type: 'text',
      content: `FFT uses divide and conquer: split polynomial into even/odd-indexed coefficients, evaluate recursively at paired roots of unity (ω and -ω cancel nicely), combine in O(n). Iterative butterfly FFT avoids recursion overhead. For competitive programming: (1) use long double precision for large n, (2) prefer NTT (mod p) to avoid floating point errors, (3) "convolution trick" maps counting problems to polynomial multiplication.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Iterative FFT and polynomial multiplication',
      code: `// Complex FFT using JS complex arithmetic
function fft(a, invert) {
    const n = a.length;
    // Bit-reversal permutation
    for (let i = 1, j = 0; i < n; i++) {
        let bit = n >> 1;
        for (; j & bit; bit >>= 1) j ^= bit;
        j ^= bit;
        if (i < j) [a[i], a[j]] = [a[j], a[i]];
    }
    // Butterfly
    for (let len = 2; len <= n; len <<= 1) {
        const ang = 2 * Math.PI / len * (invert ? -1 : 1);
        const [wr, wi] = [Math.cos(ang), Math.sin(ang)];
        for (let i = 0; i < n; i += len) {
            let [cr, ci] = [1, 0];
            for (let j = 0; j < len / 2; j++) {
                const [ur, ui] = a[i + j];
                const [vr, vi] = a[i + j + len / 2];
                const tr = cr * vr - ci * vi, ti = cr * vi + ci * vr;
                a[i + j] = [ur + tr, ui + ti];
                a[i + j + len / 2] = [ur - tr, ui - ti];
                [cr, ci] = [cr * wr - ci * wi, cr * wi + ci * wr];
            }
        }
    }
    if (invert) for (let i = 0; i < n; i++) a[i] = [a[i][0] / n, a[i][1] / n];
}

function polyMul(a, b) {
    const result = new Array(a.length + b.length - 1).fill(0);
    let n = 1;
    while (n < a.length + b.length) n <<= 1;
    const fa = Array.from({length: n}, (_, i) => [a[i] || 0, 0]);
    const fb = Array.from({length: n}, (_, i) => [b[i] || 0, 0]);
    fft(fa, false); fft(fb, false);
    for (let i = 0; i < n; i++) {
        const [ar, ai] = fa[i], [br, bi] = fb[i];
        fa[i] = [ar * br - ai * bi, ar * bi + ai * br];
    }
    fft(fa, true);
    for (let i = 0; i < result.length; i++) result[i] = Math.round(fa[i][0]);
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
      title: 'Multiply Strings',
      url: 'https://leetcode.com/problems/multiply-strings/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Grade-school multiplication O(n²)',
          explanation: `Simulate grade-school multiplication: for each digit of num1, multiply by each digit of num2, accumulate into result array at the right position. Result[i+j] and result[i+j+1] get contributions.`,
          code: `var multiply = function(num1, num2) {
    if(num1==='0'||num2==='0') return '0';
    const m=num1.length,n=num2.length,pos=new Array(m+n).fill(0);
    for(let i=m-1;i>=0;i--) for(let j=n-1;j>=0;j--){
        const mul=(num1[i]-'0')*(num2[j]-'0');
        const [p1,p2]=[i+j,i+j+1];
        const sum=mul+pos[p2];
        pos[p2]=sum%10; pos[p1]+=Math.floor(sum/10);
    }
    return pos.join('').replace(/^0+/,'');
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: FFT-based polynomial multiplication O(n log n)',
          explanation: `Treat digits as polynomial coefficients. Multiply the polynomials using FFT in O(n log n), then handle carries. For n ≤ 200 (LeetCode constraint), O(n²) is fine, but FFT is needed for n ≥ 10^5.`,
          code: `// Using polyMul from template above:
// num1 digits as coefficient array (reversed so index = power)
// Same for num2. Multiply polynomials. Handle carries in result.
// For competitive programming with n up to 10^5 or 10^6 digit numbers.`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Count Pairs With Target Sum (convolution)',
      url: 'https://leetcode.com/problems/count-pairs-whose-sum-is-less-than-target/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Sort + two pointers',
          explanation: `Sort array. Two pointers: if nums[l] + nums[r] < target, all nums[l]+nums[l+1..r] pairs qualify — add (r-l) to count. Else r--.`,
          code: `var countPairs = function(nums, target) {
    nums.sort((a,b)=>a-b);
    let count=0,l=0,r=nums.length-1;
    while(l<r){
        if(nums[l]+nums[r]<target){count+=r-l;l++;}
        else r--;
    }
    return count;
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: FFT for exact count at each sum',
          explanation: `Build frequency polynomial A where A[v] = count of v in nums. Convolve A with itself using FFT. Result[k] = number of (ordered) pairs summing to k. Divide by 2 and subtract self-pairs for unordered. Useful when you need ALL pair sum counts at once.`,
          code: `// A[i] = frequency of value i in nums
// C = polyMul(A, A) -- C[k] = sum of A[i]*A[k-i] = ordered pairs summing to k
// For unordered: (C[k] - count of elements equal to k/2) / 2
// This solves "count pairs for ALL targets simultaneously" in O(MAX * log MAX)`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Largest Component Size by Common Factor',
      url: 'https://leetcode.com/problems/largest-component-size-by-common-factor/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Union-Find via factor factorization',
          explanation: `For each number, factorize it. Union all its prime factors with the number itself. Two numbers connected if they share a prime factor. Count largest component.`,
          code: `var largestComponentSize = function(nums) {
    const parent=new Array(100001).fill(0).map((_,i)=>i);
    const find=x=>parent[x]===x?x:(parent[x]=find(parent[x]));
    const union=(x,y)=>parent[find(x)]=find(y);
    for(const n of nums){
        let x=n;
        for(let f=2;f*f<=x;f++) if(x%f===0){union(n,f);while(x%f===0) x=Math.floor(x/f);}
        if(x>1) union(n,x);
    }
    const cnt=new Map(); let res=0;
    for(const n of nums){
        const c=find(n);
        cnt.set(c,(cnt.get(c)||0)+1);
        res=Math.max(res,cnt.get(c));
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '〰️',
      color: 'blue',
      content: `**FFT applications in competitive programming:**\n- Polynomial multiplication: O(n log n) vs O(n²)\n- Large number multiplication: treat digits as coefficients\n- Counting pairs summing to k: convolve frequency arrays\n- String matching with wildcards: model * as 0 frequency\n\n**NTT (Number Theoretic Transform):** Modular FFT using a prime p where primitive root exists. Avoids floating-point precision errors. Use p = 998244353 (NTT-friendly prime).\n\n**JavaScript gotcha:** No native complex number support — must implement or use Float64Array for performance. For competitive programming in JS, FFT with plain arrays suffices for n ≤ 10^6.`,
    },
  ],
}
