import type { Article } from '../articles'

export const permutationPatternsArticle: Article = {
  slug: 'permutation-patterns',
  title: 'Permutation Patterns',
  emoji: '🔀',
  tagline: 'Next permutation, cycle decomposition, inversions, k-th permutation in O(n).',
  description: 'Permutation problems cover: generating the next/previous permutation in O(n), finding the k-th permutation in factorial number system O(n²), decomposing a permutation into cycles, counting inversions, and detecting permutation parity. These techniques appear in scheduling, anagram problems, and combinatorics. The factorial number system converts a rank k to a specific permutation directly.',
  gradient: 'from-cyan-700 to-sky-800',
  topicSlug: 'dp',
  readTime: '15 min',
  sections: [
    {
      type: 'text',
      content: `Next permutation algorithm: (1) find rightmost position i where nums[i] < nums[i+1], (2) find rightmost j > i where nums[j] > nums[i], (3) swap nums[i] and nums[j], (4) reverse suffix starting at i+1. This gives the lexicographically next permutation in O(n). For k-th permutation: convert k to factorial number system — repeatedly extract digit by dividing by (n-1)!, (n-2)!, etc.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Permutation algorithms',
      code: `// Next permutation in O(n)
function nextPermutation(nums) {
    const n = nums.length;
    let i = n - 2;
    while (i >= 0 && nums[i] >= nums[i + 1]) i--;
    if (i >= 0) {
        let j = n - 1;
        while (nums[j] <= nums[i]) j--;
        [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    // Reverse suffix [i+1, n-1]
    let l = i + 1, r = n - 1;
    while (l < r) { [nums[l], nums[r]] = [nums[r], nums[l]]; l++; r--; }
}

// K-th permutation (1-indexed, 0-indexed internally) in O(n²)
function kthPermutation(n, k) {
    const digits = Array.from({length: n}, (_, i) => i + 1);
    const fact = new Array(n).fill(1);
    for (let i = 1; i < n; i++) fact[i] = fact[i - 1] * i;
    k--; // convert to 0-indexed
    const result = [];
    for (let i = n - 1; i >= 0; i--) {
        const idx = Math.floor(k / fact[i]);
        result.push(digits[idx]);
        digits.splice(idx, 1);
        k %= fact[i];
    }
    return result.join('');
}

// Cycle decomposition: permutation as product of disjoint cycles
function getCycles(perm) { // 0-indexed
    const visited = new Array(perm.length).fill(false), cycles = [];
    for (let i = 0; i < perm.length; i++) {
        if (visited[i]) continue;
        const cycle = [];
        let j = i;
        while (!visited[j]) { visited[j] = true; cycle.push(j); j = perm[j]; }
        cycles.push(cycle);
    }
    return cycles;
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
      title: 'Next Permutation',
      url: 'https://leetcode.com/problems/next-permutation/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Find rightmost dip, swap with next larger, reverse suffix',
          explanation: `Find rightmost i where nums[i] < nums[i+1]. Find rightmost j where nums[j] > nums[i]. Swap. Reverse everything after i. If no dip found (fully descending), reverse entire array.`,
          code: `var nextPermutation = function(nums) {
    const n=nums.length;
    let i=n-2;
    while(i>=0&&nums[i]>=nums[i+1]) i--;
    if(i>=0){
        let j=n-1;
        while(nums[j]<=nums[i]) j--;
        [nums[i],nums[j]]=[nums[j],nums[i]];
    }
    let l=i+1,r=n-1;
    while(l<r){[nums[l],nums[r]]=[nums[r],nums[l]];l++;r--;}
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Permutation Sequence',
      url: 'https://leetcode.com/problems/permutation-sequence/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Factorial number system',
          explanation: `For n numbers, first (n-1)! permutations start with 1, next (n-1)! start with 2, etc. For k-th permutation: first digit = (k-1) / (n-1)! from available digits. Reduce k and n, repeat.`,
          code: `var getPermutation = function(n, k) {
    const digits=Array.from({length:n},(_,i)=>i+1);
    const fact=new Array(n).fill(1);
    for(let i=1;i<n;i++) fact[i]=fact[i-1]*i;
    k--; let res='';
    for(let i=n-1;i>=0;i--){
        const idx=Math.floor(k/fact[i]);
        res+=digits[idx]; digits.splice(idx,1); k%=fact[i];
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
      title: 'Minimum Swaps to Sort',
      url: 'https://leetcode.com/problems/minimum-number-of-operations-to-sort-a-binary-string/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Cycle decomposition — swaps = n - number of cycles',
          explanation: `To sort permutation P using adjacent swaps: minimum swaps = n - (number of cycles). Each cycle of length k needs k-1 swaps to sort.`,
          code: `// Sort permutation via cycle decomposition
function minSwaps(perm) { // 0-indexed, perm[i] should go to position i
    const n=perm.length, vis=new Array(n).fill(false);
    let cycles=0;
    for(let i=0;i<n;i++){
        if(vis[i]) continue;
        cycles++; let j=i;
        while(!vis[j]){vis[j]=true;j=perm[j];}
    }
    return n-cycles; // minimum swaps to sort
}`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Reconstruct Permutation',
      url: 'https://leetcode.com/problems/reconstruct-original-digits-from-english/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Unique character fingerprinting',
          explanation: `Each digit has a unique character: "zero" has 'z', "two" has 'w', "four" has 'u', "six" has 'x', "eight" has 'g'. Count these to find counts of 0,2,4,6,8. Then find odd digits. Extract in order.`,
          code: `var originalDigits = function(s) {
    const cnt=new Array(26).fill(0);
    for(const c of s) cnt[c.charCodeAt(0)-97]++;
    const d=new Array(10).fill(0);
    d[0]=cnt[25]; // z in zero
    d[2]=cnt[22]; // w in two
    d[4]=cnt[20]; // u in four
    d[6]=cnt[23]; // x in six
    d[8]=cnt[6];  // g in eight
    d[1]=cnt[14]-d[0]-d[2]-d[4]; // o in one
    d[3]=cnt[17]-d[0]-d[4];      // r in three
    d[5]=cnt[5]-d[4];            // f in five
    d[7]=cnt[18]-d[6]-d[8];      // s in seven
    d[9]=cnt[8]-d[5]-d[6]-d[8];  // i in nine
    return d.map((c,i)=>String(i).repeat(c)).join('');
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Find All Anagrams in a String',
      url: 'https://leetcode.com/problems/find-all-anagrams-in-a-string/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Sliding window with character frequency match',
          explanation: `Fixed window of size len(p). Maintain character frequency difference. When all diffs = 0, window is an anagram. Slide: subtract outgoing, add incoming, update diff count.`,
          code: `var findAnagrams = function(s, p) {
    if(s.length<p.length) return [];
    const need=new Array(26).fill(0), have=new Array(26).fill(0);
    for(const c of p) need[c.charCodeAt(0)-97]++;
    const res=[], m=p.length; let matches=0;
    const total=need.filter(v=>v>0).length;
    for(let i=0;i<s.length;i++){
        const ci=s.charCodeAt(i)-97;
        have[ci]++; if(have[ci]===need[ci]) matches++;
        if(i>=m){const co=s.charCodeAt(i-m)-97; if(have[co]===need[co]) matches--; have[co]--;}
        if(matches===total) res.push(i-m+1);
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🔀',
      color: 'teal',
      content: `**Permutation key facts:**\n- Next permutation: O(n), in-place\n- K-th permutation: O(n²) using factorial number system\n- Permutation parity: even/odd based on number of inversions\n- Minimum swaps to sort: n - (number of cycles)\n- Cycle decomposition: each element visited exactly once\n\n**Factorial number system:** n digits represent a unique permutation. Digit i (0-indexed from right) ranges from 0 to i. Convert k to this system to find the k-th permutation directly without generating all previous ones.`,
    },
  ],
}
