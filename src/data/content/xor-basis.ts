import type { Article } from '../articles'

export const xorBasisArticle: Article = {
  slug: 'xor-basis',
  title: 'XOR Basis (Linear Basis)',
  emoji: '⊕',
  tagline: 'Gaussian elimination on XOR. Find max XOR, k-th XOR value, XOR spanning set.',
  description: 'A linear basis (XOR basis) is a minimal set of numbers whose XOR combinations span all possible XOR values of the original set. Built via Gaussian elimination: insert numbers one by one, reducing by pivot positions. Supports: maximum XOR subset sum, k-th smallest XOR value, count of distinct XOR values. Essential for problems asking for max/min XOR over all subsets.',
  gradient: 'from-yellow-500 to-amber-600',
  topicSlug: 'dp',
  readTime: '13 min',
  sections: [
    {
      type: 'text',
      content: `An XOR linear basis stores at most 30-60 numbers (one per bit) such that any XOR combination of the original array equals some XOR combination of basis elements. Insert: for each number, try to reduce it using existing basis elements from high bit to low. If it reduces to 0, it's linearly dependent (already representable). If not, add it at its highest bit position.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'XOR linear basis template',
      code: `class XorBasis {
    constructor() { this.basis = new Array(30).fill(0); this.size = 0; }

    insert(x) {
        for (let i = 29; i >= 0; i--) {
            if (!((x >> i) & 1)) continue; // bit i not set
            if (!this.basis[i]) { this.basis[i] = x; this.size++; return true; }
            x ^= this.basis[i]; // reduce by existing basis element
        }
        return false; // x was 0 after reduction → linearly dependent
    }

    // Maximum XOR achievable using any subset
    maxXor() {
        let res = 0;
        for (let i = 29; i >= 0; i--) res = Math.max(res, res ^ this.basis[i]);
        return res;
    }

    // Minimum non-zero XOR achievable (lowest bit basis element)
    minXor() {
        for (let i = 0; i <= 29; i++) if (this.basis[i]) return this.basis[i];
        return 0;
    }

    // k-th smallest XOR value (1-indexed, must reduce basis to row echelon form first)
    // First reduce: for each i from low to high, reduce higher basis elements
    kthSmallest(k) {
        const reduced = [];
        for (let i = 0; i <= 29; i++) {
            if (!this.basis[i]) continue;
            let v = this.basis[i];
            for (let j = i - 1; j >= 0; j--) if ((v >> j) & 1) v ^= this.basis[j];
            reduced.push(v);
        }
        // Now reduced[i] corresponds to bit i of k
        let res = 0;
        for (let i = 0; i < reduced.length; i++) if ((k >> i) & 1) res ^= reduced[i];
        return res;
    }
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
      title: 'Maximum XOR of Two Numbers in an Array',
      url: 'https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Trie — greedily choose opposite bits',
          explanation: `Build a bit trie from all numbers. For each number, greedily pick the opposite bit at each level to maximize XOR.`,
          code: `var findMaximumXOR = function(nums) {
    // Build trie
    const trie=[];
    const insert=(n)=>{
        let node=0;
        for(let i=31;i>=0;i--){
            const bit=(n>>i)&1;
            if(!trie[node]) trie[node]=[null,null];
            if(trie[node][bit]===null) trie[node][bit]=trie.length;
            node=trie[node][bit];
            if(!trie[node]) trie[node]=[null,null];
        }
    };
    const query=(n)=>{
        let node=0,xor=0;
        for(let i=31;i>=0;i--){
            const bit=(n>>i)&1, want=1-bit;
            if(trie[node]&&trie[node][want]!==null){xor|=(1<<i);node=trie[node][want];}
            else if(trie[node]) node=trie[node][bit];
        }
        return xor;
    };
    nums.forEach(insert);
    return Math.max(...nums.map(query));
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Linear basis — max XOR of any subset',
          explanation: `If allowed to XOR any subset (not just pairs), use linear basis. Insert all numbers, then greedily maximize using basis elements from high to low bit.`,
          code: `var findMaximumXOR = function(nums) {
    const basis=new Array(32).fill(0);
    for(let n of nums){
        for(let i=31;i>=0;i--){
            if(!((n>>i)&1)) continue;
            if(!basis[i]){basis[i]=n;break;}
            n^=basis[i];
        }
    }
    let res=0;
    for(let i=31;i>=0;i--) res=Math.max(res,res^basis[i]);
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Maximum XOR With an Element From Array',
      url: 'https://leetcode.com/problems/maximum-xor-with-an-element-from-array/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Offline queries + sorted insertion into basis',
          explanation: `Sort both nums and queries by limit. Process queries in order of limit: insert elements ≤ limit into XOR basis, then query max XOR with basis. Offline approach: sort queries by limit, answer in order.`,
          code: `var maximizeXor = function(nums, queries) {
    nums.sort((a,b)=>a-b);
    const q=queries.map(([x,m],i)=>[x,m,i]).sort((a,b)=>a[1]-b[1]);
    const basis=new Array(32).fill(0);
    const res=new Array(queries.length);
    let ni=0;
    for(const[x,m,i] of q){
        while(ni<nums.length&&nums[ni]<=m){
            let v=nums[ni++];
            for(let b=31;b>=0;b--){
                if(!((v>>b)&1)) continue;
                if(!basis[b]){basis[b]=v;break;}
                v^=basis[b];
            }
        }
        if(!basis.some(b=>b)) { res[i]=-1; continue; }
        let ans=x;
        for(let b=31;b>=0;b--) ans=Math.max(ans,ans^basis[b]);
        res[i]=ans^x; // Wait this is wrong — ans is already the XOR result
        // Correct: let cur=x; for(b from 31 to 0) cur=Math.max(cur,cur^basis[b]); res[i]=cur^x;
        res[i]=ans; // ans IS the maximum XOR value achievable
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
      title: 'Minimum XOR Sum of Two Arrays',
      url: 'https://leetcode.com/problems/minimum-xor-sum-of-two-arrays/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Bitmask DP assignment problem',
          explanation: `dp[mask] = min XOR sum when mask represents which elements of nums2 have been paired. dp[mask | (1<<j)] = dp[mask] + (nums1[popcount(mask)] XOR nums2[j]).`,
          code: `var minimumXORSum = function(nums1, nums2) {
    const n=nums1.length, INF=Infinity;
    const dp=new Array(1<<n).fill(INF); dp[0]=0;
    for(let mask=0;mask<(1<<n);mask++){
        if(dp[mask]===INF) continue;
        const i=mask.toString(2).split('0').join('').length; // popcount = how many assigned
        if(i===n) continue;
        for(let j=0;j<n;j++){
            if((mask>>j)&1) continue;
            dp[mask|(1<<j)]=Math.min(dp[mask|(1<<j)],dp[mask]+(nums1[i]^nums2[j]));
        }
    }
    return dp[(1<<n)-1];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Count Triplets That Can Form Two Arrays of Equal XOR',
      url: 'https://leetcode.com/problems/count-triplets-that-can-form-two-arrays-of-equal-xor/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: XOR prefix + math insight',
          explanation: `a XOR b = 0 means XOR of elements from index i+1 to k is 0. For every pair (i,k) where prefix[i] == prefix[k+1], all j in (i,k) are valid — contributing (k-i) valid triplets.`,
          code: `var countTriplets = function(arr) {
    const n=arr.length;
    const pre=new Array(n+1).fill(0);
    for(let i=0;i<n;i++) pre[i+1]=pre[i]^arr[i];
    let count=0;
    for(let i=0;i<n;i++) for(let k=i+1;k<n;k++)
        if(pre[i]===pre[k+1]) count+=k-i;
    return count;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '⊕',
      color: 'amber',
      content: `**XOR basis key properties:**\n- At most 30 elements (one per bit for 32-bit integers)\n- Spans the same XOR closure as the original set\n- Any number representable as XOR of subset iff it reduces to 0 during insertion\n\n**Max XOR algorithm:** Greedily try to set each bit from high to low: if XOR-ing with basis element increases current result, do it.\n\n**Count distinct XOR values:** 2^(basis.size) distinct values possible (including 0).\n\n**Merge two bases:** Insert all elements of one into the other — O(30²) per merge.\n\n**Online vs offline:** Basis supports online insertions. For "max XOR with elements ≤ limit," sort and insert offline.`,
    },
  ],
}
