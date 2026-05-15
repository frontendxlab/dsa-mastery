import type { Article } from '../articles'

export const coordinateCompressionArticle: Article = {
  slug: 'coordinate-compression',
  title: 'Coordinate Compression',
  emoji: '🗜️',
  tagline: 'Map large values to small ranks. Enables Fenwick/SegTree on value-based problems.',
  description: 'Coordinate compression maps a set of large values (up to 10^9) to small ranks (1..n) without changing relative order. This allows using data structures like Fenwick Trees and Segment Trees on problems where values span a huge range. Prerequisite for many hard problems involving counting inversions, LIS with Fenwick, and 2D range queries.',
  gradient: 'from-cyan-600 to-blue-700',
  topicSlug: 'dp',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `Coordinate compression solves the "values are too large for array indexing" problem. If you need a Fenwick tree on values up to 10^9, you can't allocate 10^9 slots. Instead: collect all values that appear, sort them, and replace each value with its rank (1..n). The relative order is preserved — that's all you need for count-based queries.`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'The Technique',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Coordinate compression template',
      code: `// Given values that can be up to 10^9, compress to ranks 1..n
function compress(values) {
    // Step 1: collect all unique values
    const unique = [...new Set(values)].sort((a,b) => a-b);
    // Step 2: build rank map
    const rank = new Map(unique.map((v,i) => [v, i+1])); // 1-indexed
    // Step 3: replace values with ranks
    return { ranks: values.map(v => rank.get(v)), n: unique.length, rank, unique };
}

// Lower bound: rank of x = first rank with unique[rank-1] >= x
// Used for: "count elements less than x" = query(lowerBound(x) - 1)

// Example: values = [100, 50, 200, 50, 100]
// unique = [50, 100, 200] → ranks: [2, 1, 3, 1, 2]
// Fenwick tree of size 3 instead of 200!

// Combined with Fenwick tree for counting/inversions:
function countInversions(nums) {
    const unique = [...new Set(nums)].sort((a,b)=>a-b);
    const rank = new Map(unique.map((v,i)=>[v,i+1]));
    const n = unique.length;
    const bit = new Array(n+1).fill(0);
    const update = i => { for(;i<=n;i+=i&(-i)) bit[i]++; };
    const query = i => { let s=0; for(;i>0;i-=i&(-i)) s+=bit[i]; return s; };
    let inversions = 0;
    for(const x of nums) {
        const r = rank.get(x);
        inversions += query(n) - query(r); // count elements already inserted that are > x
        update(r);
    }
    return inversions;
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
      title: 'Count of Smaller Numbers After Self',
      url: 'https://leetcode.com/problems/count-of-smaller-numbers-after-self/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Coordinate compression + Fenwick tree',
          explanation: `Compress values to ranks. Process from RIGHT to LEFT. For each element, query Fenwick tree for count of elements with rank < current rank (= smaller elements already inserted = smaller elements to the right). Then insert current rank.`,
          code: `var countSmaller = function(nums) {
    // Coordinate compression
    const sorted=[...new Set(nums)].sort((a,b)=>a-b);
    const rank=new Map(sorted.map((v,i)=>[v,i+1]));
    const n=sorted.length;
    const bit=new Array(n+1).fill(0);
    const upd=i=>{for(;i<=n;i+=i&(-i))bit[i]++;};
    const qry=i=>{let s=0;for(;i>0;i-=i&(-i))s+=bit[i];return s;};
    const res=new Array(nums.length);
    for(let i=nums.length-1;i>=0;i--){
        const r=rank.get(nums[i]);
        res[i]=qry(r-1); // count elements with smaller rank already inserted
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
      num: 2,
      title: 'Count of Range Sum',
      url: 'https://leetcode.com/problems/count-of-range-sum/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Compress prefix sums + Fenwick tree with binary search',
          explanation: `Compress all prefix sums. For each new prefix sum P, count previously inserted prefix sums in [P-upper, P-lower]. Compress all prefix sums first (offline), then process in order using Fenwick tree with rank-based queries.`,
          code: `var countRangeSum = function(nums, lower, upper) {
    // Compute all prefix sums first (offline)
    const prefix=[0];
    for(const n of nums) prefix.push(prefix.at(-1)+n);
    // Collect all values that will be queried
    const allVals=new Set(prefix);
    for(const p of prefix){allVals.add(p-lower);allVals.add(p-upper-1);}
    const sorted=[...allVals].sort((a,b)=>a-b);
    const rank=new Map(sorted.map((v,i)=>[v,i+1]));
    const m=sorted.length;
    const bit=new Array(m+2).fill(0);
    const upd=i=>{for(;i<=m;i+=i&(-i))bit[i]++;};
    const qry=i=>{if(i<=0)return 0;let s=0;for(;i>0;i-=i&(-i))s+=bit[i];return s;};
    let count=0;
    for(const p of prefix){
        // Count prefix sums in [p-upper, p-lower] = qry(rank(p-lower)) - qry(rank(p-upper-1))
        count+=qry(rank.get(p-lower))-qry(rank.get(p-upper-1));
        upd(rank.get(p));
    }
    return count;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Longest Increasing Subsequence (O(n log n) with compression)',
      url: 'https://leetcode.com/problems/longest-increasing-subsequence/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Patience sorting (binary search on tails) — O(n log n)',
          explanation: `Maintain "tails" array where tails[i] = smallest tail of all increasing subsequences of length i+1. For each num, binary search for insertion position. Length of tails = LIS length. No compression needed here.`,
          code: `var lengthOfLIS = function(nums) {
    const tails=[];
    for(const n of nums){
        let lo=0,hi=tails.length;
        while(lo<hi){const mid=(lo+hi)>>1;tails[mid]<n?lo=mid+1:hi=mid;}
        tails[lo]=n;
    }
    return tails.length;
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Compression + Fenwick tree for count variant',
          explanation: `If you need "longest increasing subsequence" but also need to count the number of such subsequences, use Fenwick tree with coordinate compression. dp[rank] = (length, count) pairs.`,
          code: `// LIS count via Fenwick: for each num, query max(length) for all ranks < rank(num)
// Then update: dp[rank(num)] = (best_length+1, sum_of_counts)
// Full implementation uses Fenwick tree with (maxLen, count) values`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Number of Longest Increasing Subsequence',
      url: 'https://leetcode.com/problems/number-of-longest-increasing-subsequence/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: O(n²) DP — track length and count at each position',
          explanation: `dp[i] = (length, count). For each i, scan all j < i where nums[j] < nums[i]. If dp[j].length+1 > dp[i].length: new best, reset count. If dp[j].length+1 = dp[i].length: same best, add count. Answer = sum of counts where length = maxLength.`,
          code: `var findNumberOfLIS = function(nums) {
    const n=nums.length;
    const dp=new Array(n).fill(1),cnt=new Array(n).fill(1);
    for(let i=1;i<n;i++)
        for(let j=0;j<i;j++)
            if(nums[j]<nums[i]){
                if(dp[j]+1>dp[i]){dp[i]=dp[j]+1;cnt[i]=cnt[j];}
                else if(dp[j]+1===dp[i]) cnt[i]+=cnt[j];
            }
    const maxLen=Math.max(...dp);
    return dp.reduce((s,d,i)=>d===maxLen?s+cnt[i]:s,0);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🗜️',
      color: 'cyan',
      content: `**When to use coordinate compression:**\n- Values up to 10^9 but only n ≤ 10^5 distinct values appear\n- Need a Fenwick/Segment tree indexed by VALUE (not position)\n- Counting/querying by value range: how many elements ≤ x\n\n**Template:** collect all values, sort, deduplicate, map each → rank. Then use ranks as array indices.\n\n**Offline vs online:** Coordinate compression requires knowing all values upfront (offline). For online queries (values arrive one by one), use a balanced BST or dynamic segment tree instead.`,
    },
  ],
}
