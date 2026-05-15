import type { Article } from '../articles'

export const sqrtDecompositionArticle: Article = {
  slug: 'sqrt-decomposition',
  title: 'Sqrt Decomposition',
  emoji: '√',
  tagline: 'Divide array into √n blocks. O(√n) per query/update. No preprocessing needed.',
  description: 'Square root decomposition divides an array into blocks of size √n. Queries and updates touch at most O(√n) full blocks plus O(√n) elements at the boundaries. Total O(√n) per operation. Simpler than segment tree for mixed queries and updates. Extended by Mo\'s algorithm for offline queries. Useful when segment tree is too complex to implement or when offline processing isn\'t possible.',
  gradient: 'from-neutral-600 to-stone-700',
  topicSlug: 'dp',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `Split array into blocks of size B = √n. For each block, maintain a summary value (sum, min, max, etc.). Range query [l, r]: process partial left block, full middle blocks (O(n/B)), partial right block. Range update [l, r]: update partial blocks element-wise, full blocks via lazy tag. O(B + n/B) = O(√n) per operation when B = √n.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Sqrt decomposition for range sum query with range add update',
      code: `class SqrtDecomp {
    constructor(arr) {
        this.n = arr.length;
        this.B = Math.ceil(Math.sqrt(this.n));
        this.arr = [...arr];
        this.blocks = new Array(Math.ceil(this.n / this.B)).fill(0);
        this.lazy = new Array(this.blocks.length).fill(0); // lazy add for full blocks
        for (let i = 0; i < this.n; i++) this.blocks[Math.floor(i / this.B)] += arr[i];
    }

    update(l, r, v) { // add v to arr[l..r]
        const bL = Math.floor(l / this.B), bR = Math.floor(r / this.B);
        if (bL === bR) {
            for (let i = l; i <= r; i++) { this.arr[i] += v; this.blocks[bL] += v; }
            return;
        }
        for (let i = l; i < (bL + 1) * this.B; i++) { this.arr[i] += v; this.blocks[bL] += v; }
        for (let b = bL + 1; b < bR; b++) { this.lazy[b] += v; this.blocks[b] += v * this.B; }
        for (let i = bR * this.B; i <= r; i++) { this.arr[i] += v; this.blocks[bR] += v; }
    }

    query(l, r) { // sum arr[l..r]
        const bL = Math.floor(l / this.B), bR = Math.floor(r / this.B);
        let sum = 0;
        if (bL === bR) {
            for (let i = l; i <= r; i++) sum += this.arr[i] + this.lazy[bL];
            return sum;
        }
        for (let i = l; i < (bL + 1) * this.B; i++) sum += this.arr[i] + this.lazy[bL];
        for (let b = bL + 1; b < bR; b++) sum += this.blocks[b];
        for (let i = bR * this.B; i <= r; i++) sum += this.arr[i] + this.lazy[bR];
        return sum;
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
      title: 'Range Sum Query — Mutable',
      url: 'https://leetcode.com/problems/range-sum-query-mutable/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Sqrt decomposition — O(√n) update and query',
          explanation: `Divide into blocks. Block sum stores sum of each block. Point update: update element + update block sum. Range sum: partial left block, full middle blocks, partial right block.`,
          code: `class NumArray {
    constructor(nums) {
        this.n=nums.length; this.nums=[...nums];
        this.B=Math.ceil(Math.sqrt(this.n));
        this.blocks=new Array(Math.ceil(this.n/this.B)).fill(0);
        for(let i=0;i<this.n;i++) this.blocks[Math.floor(i/this.B)]+=nums[i];
    }
    update(i,v){this.blocks[Math.floor(i/this.B)]+=v-this.nums[i];this.nums[i]=v;}
    sumRange(l,r){
        const bL=Math.floor(l/this.B),bR=Math.floor(r/this.B);
        if(bL===bR) return this.nums.slice(l,r+1).reduce((a,b)=>a+b,0);
        let s=0;
        for(let i=l;i<(bL+1)*this.B;i++) s+=this.nums[i];
        for(let b=bL+1;b<bR;b++) s+=this.blocks[b];
        for(let i=bR*this.B;i<=r;i++) s+=this.nums[i];
        return s;
    }
}`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Count of Smaller Numbers After Self (Sqrt approach)',
      url: 'https://leetcode.com/problems/count-of-smaller-numbers-after-self/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Sqrt decomposition on sorted values',
          explanation: `Process right to left. Maintain a frequency array, divided into √MAX blocks. Insert: O(1). Query "how many values < x": sum blocks before x's block + count in x's block linearly. O(√MAX) per operation.`,
          code: `// For value range up to M, block size ~sqrt(M)
// Insert(v): freq[v]++, block[v/B]++
// Query(v): sum of block[0..v/B-1] + sum of freq[0..v-1 in current block]
// O(sqrt(M)) per op — simpler than BIT for non-compressed values`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Painting the Fence (range update query)',
      url: 'https://leetcode.com/problems/paint-house-ii/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: DP — O(nk) with optimized min tracking',
          explanation: `dp[i][c] = min cost to paint house i with color c. dp[i][c] = cost[i][c] + min(dp[i-1][c\'] for c\'≠c). Track global min and second min of previous row: if c equals global min's color, use second min, else use global min. O(nk).`,
          code: `var minCostII = function(costs) {
    const n=costs.length, k=costs[0].length;
    let min1=0,min2=0,minIdx=-1;
    for(let i=0;i<n;i++){
        let nm1=Infinity,nm2=Infinity,nmIdx=-1;
        for(let c=0;c<k;c++){
            const cost=costs[i][c]+(c===minIdx?min2:min1);
            if(cost<nm1){nm2=nm1;nm1=cost;nmIdx=c;}
            else if(cost<nm2) nm2=cost;
        }
        [min1,min2,minIdx]=[nm1,nm2,nmIdx];
    }
    return min1;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Frequency Queries',
      url: 'https://leetcode.com/problems/online-election/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Prefix votes + binary search',
          explanation: `Precompute who is leading at each timestamp. For each time t, binary search for the latest event ≤ t, return the leader at that time.`,
          code: `class TopVotedCandidate {
    constructor(persons, times) {
        this.times=times;
        this.leaders=[];
        const votes=new Map(); let leader=-1;
        for(let i=0;i<persons.length;i++){
            const p=persons[i];
            votes.set(p,(votes.get(p)||0)+1);
            if(leader===-1||votes.get(p)>=votes.get(leader)) leader=p;
            this.leaders.push(leader);
        }
    }
    q(t) {
        let lo=0,hi=this.times.length-1;
        while(lo<hi){const mid=(lo+hi+1)>>1;this.times[mid]<=t?lo=mid:hi=mid-1;}
        return this.leaders[lo];
    }
}`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '√',
      color: 'gray',
      content: `**Sqrt decomposition tradeoffs:**\n- Simpler than segment tree: no recursion, no lazy propagation complexity\n- Slower: O(√n) vs O(log n) per operation\n- Flexible: can handle any associative operation without careful implementation\n\n**Choose sqrt decomp when:**\n- Problem has mixed update/query that's hard to segment-tree\n- n ≤ 10^5 (√n ≈ 316, fits in time limit)\n- Offline queries: Mo's algorithm (specialized sqrt decomp)\n\n**Block size optimization:** B = √n minimizes O(B + n/B). For different query/update ratios, can tune B. For q queries and u updates: optimal B = √(n·u/q).`,
    },
  ],
}
