import type { Article } from '../articles'

export const constructiveAlgorithmsArticle: Article = {
  slug: 'constructive-algorithms',
  title: 'Constructive Algorithms',
  emoji: '🏛️',
  tagline: 'Build a valid answer from constraints. Greedy construction, invariant maintenance.',
  description: 'Constructive algorithm problems ask you to produce an output (array, permutation, sequence) satisfying given constraints, rather than compute a value. Techniques: greedy construction (build left to right, always making the locally valid choice), invariant-based construction (maintain a property throughout), parity arguments, and reachability arguments. Often requires mathematical insight to see that a greedy construction always works.',
  gradient: 'from-violet-700 to-indigo-800',
  topicSlug: 'graph',
  readTime: '13 min',
  sections: [
    {
      type: 'text',
      content: `Constructive problems: "does there exist X satisfying Y, and if so, output it." Strategy: find invariant that must hold (necessary condition). If invariant satisfied, construct greedily. If construction always works when invariant holds, you've found necessary and sufficient conditions. Common invariants: parity (sum must be even), reachability (enough elements to fill positions), balance (equal counts of two types).`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Constructive pattern: build valid permutation',
      code: `// Construct a permutation where |perm[i] - perm[i+1]| is in {1, n-1}
// The "wiggle" between 1 and n: arrange as [1, n, 2, n-1, 3, n-2, ...]
function constructPermutation(n) {
    const result = [];
    let lo = 1, hi = n;
    while (lo <= hi) {
        if (lo === hi) { result.push(lo); break; }
        result.push(lo++, hi--); // alternate low and high
    }
    return result;
}

// Construct array with given prefix XOR — O(n)
function constructFromPrefixXor(pXor) {
    const arr = [pXor[0]];
    for (let i = 1; i < pXor.length; i++)
        arr.push(pXor[i-1] ^ pXor[i]);
    return arr;
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
      title: 'Wiggle Sort II',
      url: 'https://leetcode.com/problems/wiggle-sort-ii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Sort, split into halves, interleave from ends inward',
          explanation: `Sort the array. Place larger half at odd positions (1,3,5,...) and smaller half at even positions (0,2,4,...). Fill odd positions from the end of larger half and even positions from the end of smaller half to avoid equal neighbors.`,
          code: `var wiggleSort = function(nums) {
    const sorted=[...nums].sort((a,b)=>a-b);
    const n=nums.length;
    let hi=n-1, lo=Math.floor((n-1)/2);
    for(let i=0;i<n;i++){
        nums[i]=i%2===1?sorted[hi--]:sorted[lo--];
    }
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Rearrange Array Elements by Sign',
      url: 'https://leetcode.com/problems/rearrange-array-elements-by-sign/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Two pointers for positives and negatives, place alternately',
          explanation: `Maintain two indices: pos (next position for positive) and neg (next position for negative). Scan input: if positive, place at pos and advance by 2; if negative, place at neg and advance by 2.`,
          code: `var rearrangeArray = function(nums) {
    const res=new Array(nums.length);
    let pos=0,neg=1;
    for(const n of nums){
        if(n>0){res[pos]=n;pos+=2;}
        else{res[neg]=n;neg+=2;}
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
      title: 'Find the Closest Palindrome',
      url: 'https://leetcode.com/problems/find-the-closest-palindrome/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Generate candidates: mirror first half, ±1 to middle, edge cases',
          explanation: `Candidates: (1) Mirror the first half as-is. (2) Mirror first half + 1 (increment middle). (3) Mirror first half - 1 (decrement middle). (4) 10^(n-1) - 1 (all 9s with n-1 digits). (5) 10^n + 1 (10...01). Pick the closest, breaking ties by smaller.`,
          code: `var nearestPalindromic = function(n) {
    const len=n.length, num=BigInt(n);
    const candidates=new Set();
    // 10^(len-1)-1 and 10^len+1
    candidates.add(BigInt(10)**(BigInt(len-1))-1n);
    candidates.add(BigInt(10)**BigInt(len)+1n);
    // Mirror first half ±1, 0
    const half=BigInt(n.slice(0,Math.ceil(len/2)));
    for(const delta of [-1n,0n,1n]){
        const h=String(half+delta);
        const candidate=h+(len%2?h.slice(0,-1):h).split('').reverse().join('');
        candidates.add(BigInt(candidate));
    }
    candidates.delete(num);
    let res=null;
    for(const c of candidates){
        if(c<0n) continue;
        if(!res||
           (c-num<0n?num-c:c-num)<(res-num<0n?num-res:res-num)||
           ((c-num<0n?num-c:c-num)===(res-num<0n?num-res:res-num)&&c<res))
            res=c;
    }
    return String(res);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Minimum Moves to Make Array Complementary',
      url: 'https://leetcode.com/problems/minimum-moves-to-make-array-complementary/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Difference array on target sum values, find minimum',
          explanation: `For each pair (a, b) = (nums[i], nums[n-1-i]), track how many moves needed for each possible target sum T. Use difference array on T in [2..2*limit]. For each pair: T in [2, min+1): need 2 moves. T == min: 1 move. T in (min, max]: 1 move. T in (max, max+1]: 2 moves. Find minimum total.`,
          code: `var minMoves = function(nums, limit) {
    const n=nums.length, diff=new Array(2*limit+2).fill(0);
    for(let i=0;i<n/2;i++){
        const a=nums[i],b=nums[n-1-i];
        const mn=Math.min(a,b)+1, mx=Math.max(a,b)+limit;
        // [2, mn): +2, [mn, a+b]: +1, (a+b, mx]: +1, (mx, ...): +2 → use difference array
        diff[2]+=2; diff[mn]--; diff[mn]--;
        diff[a+b]--; diff[a+b+1]++;
        diff[mx+1]++; diff[mx+1]++;
    }
    let ans=Infinity, cur=0;
    for(let t=2;t<=2*limit;t++){cur+=diff[t];ans=Math.min(ans,cur);}
    return ans;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🏛️',
      color: 'blue',
      content: `**Constructive algorithm checklist:**\n1. Find necessary condition (invariant that must hold)\n2. Verify it's also sufficient (if condition holds, construction exists)\n3. Build greedily while maintaining invariant\n4. Prove greedy choice is safe (exchange argument or induction)\n\n**Common constructions:**\n- Interleave sorted halves for wiggle/alternating patterns\n- Mirror first half for palindromes\n- Place elements at parity-specific indices for sign-alternating\n- Assign greedily to "most needy" slot (greedy + priority queue)`,
    },
  ],
}
