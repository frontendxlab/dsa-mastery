import type { Article } from '../articles'

export const fenwickTreeArticle: Article = {
  slug: 'fenwick-tree',
  title: 'Fenwick Tree (BIT)',
  emoji: '🌳',
  tagline: 'Range sum and point update in O(log n). Simpler than segment tree for prefix queries.',
  description: 'A Fenwick Tree (Binary Indexed Tree / BIT) supports prefix sum queries and point updates in O(log n) using a flat array. Each index stores the sum of a specific range of elements determined by the lowest set bit. Simpler to code than a segment tree, but limited to commutative/invertible operations (sum, XOR, product mod p). Extends to 2D BIT for matrix queries.',
  gradient: 'from-teal-500 to-cyan-600',
  topicSlug: 'dp',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `A BIT stores partial sums where bit[i] covers the range [i - lowbit(i) + 1, i], where lowbit(i) = i & (-i). Update: propagate change upward by repeatedly adding lowbit. Query: sum prefix [1..i] by walking down, subtracting lowbit. Both operations touch O(log n) nodes. Key advantage over segment tree: 4x simpler code, better cache performance.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Fenwick tree template — 1D and 2D',
      code: `// 1D Fenwick Tree (1-indexed)
class BIT {
    constructor(n) { this.n = n; this.tree = new Array(n + 1).fill(0); }
    update(i, delta) {
        for (; i <= this.n; i += i & (-i)) this.tree[i] += delta;
    }
    query(i) { // prefix sum [1..i]
        let s = 0;
        for (; i > 0; i -= i & (-i)) s += this.tree[i];
        return s;
    }
    rangeQuery(l, r) { return this.query(r) - this.query(l - 1); }
    // Point query (when using BIT as difference array):
    // update(l, +1), update(r+1, -1) → query(i) gives range add value at i
}

// 2D Fenwick Tree
class BIT2D {
    constructor(m, n) { this.m = m; this.n = n; this.t = Array.from({length:m+1},()=>new Array(n+1).fill(0)); }
    update(r, c, v) {
        for (let i = r; i <= this.m; i += i & (-i))
            for (let j = c; j <= this.n; j += j & (-j))
                this.t[i][j] += v;
    }
    query(r, c) {
        let s = 0;
        for (let i = r; i > 0; i -= i & (-i))
            for (let j = c; j > 0; j -= j & (-j))
                s += this.t[i][j];
        return s;
    }
    rangeQuery(r1, c1, r2, c2) {
        return this.query(r2,c2) - this.query(r1-1,c2) - this.query(r2,c1-1) + this.query(r1-1,c1-1);
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
          label: 'Intuition 1: Brute force — O(n) per query/update',
          explanation: `Store array directly. Update = O(1), sum query = O(n). Too slow for many queries.`,
          code: `class NumArray {
    constructor(nums) { this.nums=[...nums]; }
    update(i,v) { this.nums[i]=v; }
    sumRange(l,r) { return this.nums.slice(l,r+1).reduce((a,b)=>a+b,0); }
}`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Fenwick tree — O(log n) both',
          explanation: `Build BIT from initial array. Update: find delta (new - old), propagate. Query: prefix sum difference.`,
          code: `class NumArray {
    constructor(nums) {
        this.n=nums.length; this.nums=[...nums];
        this.bit=new Array(this.n+1).fill(0);
        for(let i=0;i<this.n;i++) this._upd(i+1,nums[i]);
    }
    _upd(i,v){ for(;i<=this.n;i+=i&(-i)) this.bit[i]+=v; }
    _qry(i){ let s=0; for(;i>0;i-=i&(-i)) s+=this.bit[i]; return s; }
    update(i,v){ this._upd(i+1,v-this.nums[i]); this.nums[i]=v; }
    sumRange(l,r){ return this._qry(r+1)-this._qry(l); }
}`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Count of Smaller Numbers After Self',
      url: 'https://leetcode.com/problems/count-of-smaller-numbers-after-self/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Coordinate compression + BIT',
          explanation: `Compress values to ranks. Process right to left. For each element, query BIT for count of ranks < current (= smaller elements already seen to the right). Then update BIT at current rank.`,
          code: `var countSmaller = function(nums) {
    const sorted=[...new Set(nums)].sort((a,b)=>a-b);
    const rank=new Map(sorted.map((v,i)=>[v,i+1]));
    const n=sorted.length, bit=new Array(n+1).fill(0);
    const upd=i=>{for(;i<=n;i+=i&(-i))bit[i]++;};
    const qry=i=>{let s=0;for(;i>0;i-=i&(-i))s+=bit[i];return s;};
    const res=new Array(nums.length);
    for(let i=nums.length-1;i>=0;i--){
        const r=rank.get(nums[i]);
        res[i]=qry(r-1);
        upd(r);
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
      title: 'Create Sorted Array through Instructions',
      url: 'https://leetcode.com/problems/create-sorted-array-through-instructions/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: BIT to count elements smaller and larger',
          explanation: `For each instruction value v, cost = min(elements already inserted < v, elements already inserted > v). Use BIT to count prefix sums (elements ≤ v-1 = smaller, total inserted - elements ≤ v = greater or equal).`,
          code: `var createSortedArray = function(instructions) {
    const MOD=1e9+7, MAX=100001;
    const bit=new Array(MAX+1).fill(0);
    const upd=i=>{for(;i<=MAX;i+=i&(-i))bit[i]++;};
    const qry=i=>{let s=0;for(;i>0;i-=i&(-i))s+=bit[i];return s;};
    let cost=0;
    for(let idx=0;idx<instructions.length;idx++){
        const v=instructions[idx];
        const less=qry(v-1), greater=idx-qry(v);
        cost=(cost+Math.min(less,greater))%MOD;
        upd(v);
    }
    return cost;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Number of Inversions (Count Inversions)',
      url: 'https://leetcode.com/problems/global-and-local-inversions/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: BIT inversion count',
          explanation: `Global inversions = pairs (i,j) where i<j and nums[i]>nums[j]. Local inversions = pairs (i,i+1) where nums[i]>nums[i+1]. Observation: every local inversion is also global. Global inversions = local iff no non-adjacent inversion exists. Check: for each i, if any nums[j] > nums[i] for j ≤ i-2.`,
          code: `var isIdealPermutation = function(nums) {
    // If global == local, no non-adjacent inversions
    // Check: running max of nums[0..i-2] must be < nums[i] for all i >= 2
    let maxSoFar=-1;
    for(let i=0;i<nums.length-1;i++){
        if(i>=1&&maxSoFar>nums[i+1]) return false;
        maxSoFar=Math.max(maxSoFar,nums[i]);
    }
    return true;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Range Sum Query 2D — Mutable',
      url: 'https://leetcode.com/problems/range-sum-query-2d-mutable/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: 2D Fenwick tree',
          explanation: `2D BIT extends 1D: update propagates in both row and column dimensions. Query gives rectangle sum [1,1] to [r,c]. Range query uses inclusion-exclusion on 4 corner queries.`,
          code: `class NumMatrix {
    constructor(matrix) {
        this.m=matrix.length; this.n=matrix[0].length;
        this.mat=matrix.map(r=>[...r]);
        this.bit=Array.from({length:this.m+1},()=>new Array(this.n+1).fill(0));
        for(let i=0;i<this.m;i++) for(let j=0;j<this.n;j++) this._upd(i+1,j+1,matrix[i][j]);
    }
    _upd(r,c,v){
        for(let i=r;i<=this.m;i+=i&(-i))
            for(let j=c;j<=this.n;j+=j&(-j)) this.bit[i][j]+=v;
    }
    _qry(r,c){
        let s=0;
        for(let i=r;i>0;i-=i&(-i))
            for(let j=c;j>0;j-=j&(-j)) s+=this.bit[i][j];
        return s;
    }
    update(r,c,v){ this._upd(r+1,c+1,v-this.mat[r][c]); this.mat[r][c]=v; }
    sumRegion(r1,c1,r2,c2){
        return this._qry(r2+1,c2+1)-this._qry(r1,c2+1)-this._qry(r2+1,c1)+this._qry(r1,c1);
    }
}`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🌳',
      color: 'teal',
      content: `**BIT vs Segment Tree:**\n- BIT: simpler code (5 lines each), prefix queries only, requires invertible ops (sum/XOR, not max/min without modification)\n- Segment Tree: any range query, range update, arbitrary merge functions\n- For prefix sum + point update: always BIT\n- For range max/min or range update: segment tree\n\n**Lowbit trick:** i & (-i) isolates the lowest set bit. This is the key to BIT's structure.\n\n**Order-statistic BIT:** combine coordinate compression + BIT to count elements in value ranges in O(log n) — core technique for merge sort order statistics and inversions.`,
    },
  ],
}
