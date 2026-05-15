import type { Article } from '../articles'

export const persistentSegmentTreeArticle: Article = {
  slug: 'persistent-segment-tree',
  title: 'Persistent Segment Tree',
  emoji: '📚',
  tagline: 'Keep all historical versions. Query any past state in O(log n). Share nodes across versions.',
  description: 'A persistent segment tree creates a new root for each update while sharing unchanged nodes with previous versions. Each update creates O(log n) new nodes. With n updates and O(n log n) space, all historical versions are queryable. Primary use: k-th smallest in range [l,r] using segment tree on sorted values (merge sort tree / wavelet tree alternative), offline range queries requiring past states.',
  gradient: 'from-violet-700 to-purple-800',
  topicSlug: 'dp',
  readTime: '16 min',
  sections: [
    {
      type: 'text',
      content: `Persistent segment tree (also called "merge sort tree" or "chairman tree") maintains all historical versions. When you update a node, instead of overwriting it, you create a new node and point to it. Unchanged children are shared. Each update creates exactly O(log n) new nodes. To query a range [l, r]: use version[r] - version[l-1] (like prefix sums on the segment tree versions).`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Persistent segment tree for k-th smallest in range',
      code: `// Persistent segment tree for k-th smallest in range [l, r]
// Build one version per prefix of the sorted-by-value array
class PersistentSegTree {
    constructor() {
        this.nodes = [{left: 0, right: 0, cnt: 0}]; // node 0 = null
        this.roots = [0]; // roots[i] = root of version i
    }

    update(prevRoot, lo, hi, pos) {
        const node = this.nodes.length;
        const prev = this.nodes[prevRoot];
        this.nodes.push({left: prev.left, right: prev.right, cnt: prev.cnt + 1});
        if (lo === hi) return node;
        const mid = (lo + hi) >> 1;
        if (pos <= mid) this.nodes[node].left = this.update(prev.left, lo, mid, pos);
        else this.nodes[node].right = this.update(prev.right, mid+1, hi, pos);
        return node;
    }

    // k-th smallest in range: query between two versions
    kth(vL, vR, lo, hi, k) {
        if (lo === hi) return lo;
        const mid = (lo + hi) >> 1;
        const leftCnt = this.nodes[this.nodes[vR].left].cnt - this.nodes[this.nodes[vL].left].cnt;
        if (k <= leftCnt) return this.kth(this.nodes[vL].left, this.nodes[vR].left, lo, mid, k);
        return this.kth(this.nodes[vL].right, this.nodes[vR].right, mid+1, hi, k - leftCnt);
    }
}

// Usage for k-th smallest in arr[l..r]:
// 1. Coordinate compress arr values to [0, n-1]
// 2. Build versions: for each i, version[i] = update(version[i-1], 0, n-1, rank[i])
// 3. Query: kth(version[l-1], version[r], 0, n-1, k)`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Kth Smallest Element in a Sorted Matrix',
      url: 'https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Binary search on value',
          explanation: `Binary search on the answer value. For a given value mid, count how many elements ≤ mid using a two-pointer walk: start at top-right corner, go left when value ≤ mid, go down when value > mid.`,
          code: `var kthSmallest = function(matrix, k) {
    const n=matrix.length;
    let lo=matrix[0][0], hi=matrix[n-1][n-1];
    const count=(mid)=>{
        let cnt=0,r=0,c=n-1;
        while(r<n){
            while(c>=0&&matrix[r][c]>mid) c--;
            cnt+=c+1; r++;
        }
        return cnt;
    };
    while(lo<hi){
        const mid=(lo+hi)>>1;
        count(mid)>=k?hi=mid:lo=mid+1;
    }
    return lo;
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
          label: 'Intuition 1: Merge sort on prefix sums',
          explanation: `Count pairs (i, j) where lower ≤ prefix[j] - prefix[i] ≤ upper. Use merge sort: during merge of two halves, count valid pairs where left[i] and right[j] satisfy the condition. Two-pointer within merge step.`,
          code: `var countRangeSum = function(nums, lower, upper) {
    const prefix=[0]; for(const n of nums) prefix.push(prefix.at(-1)+n);
    let count=0;
    const sort=(arr)=>{
        if(arr.length<=1) return arr;
        const mid=arr.length>>1;
        const L=sort(arr.slice(0,mid)), R=sort(arr.slice(mid));
        let j=0,k=0;
        for(const lv of L){
            while(j<R.length&&R[j]-lv<lower) j++;
            while(k<R.length&&R[k]-lv<=upper) k++;
            count+=k-j;
        }
        // Standard merge
        const res=[]; let a=0,b=0;
        while(a<L.length&&b<R.length) L[a]<=R[b]?res.push(L[a++]):res.push(R[b++]);
        return res.concat(L.slice(a),R.slice(b));
    };
    sort(prefix);
    return count;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Number of Longest Increasing Subsequence',
      url: 'https://leetcode.com/problems/number-of-longest-increasing-subsequence/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DP with length and count arrays',
          explanation: `dp[i] = length of LIS ending at i. cnt[i] = number of such subsequences. For each i: find all j < i where nums[j] < nums[i]. dp[i] = max(dp[j]) + 1. cnt[i] = sum of cnt[j] where dp[j] = dp[i] - 1.`,
          code: `var findNumberOfLIS = function(nums) {
    const n=nums.length;
    const dp=new Array(n).fill(1), cnt=new Array(n).fill(1);
    let maxLen=1;
    for(let i=1;i<n;i++){
        for(let j=0;j<i;j++) if(nums[j]<nums[i]){
            if(dp[j]+1>dp[i]){dp[i]=dp[j]+1;cnt[i]=cnt[j];}
            else if(dp[j]+1===dp[i]) cnt[i]+=cnt[j];
        }
        maxLen=Math.max(maxLen,dp[i]);
    }
    return dp.reduce((s,d,i)=>d===maxLen?s+cnt[i]:s,0);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Count Inversions (merge sort)',
      url: 'https://leetcode.com/problems/sort-an-array/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Merge sort counting inversions during merge',
          explanation: `An inversion is a pair (i,j) where i<j and arr[i]>arr[j]. During merge sort, when we pick an element from the right half over a remaining left half element, all remaining left elements form inversions with the picked right element. Count += remaining left elements.`,
          code: `// Sort array + count inversions
var sortArray = function(nums) {
    let inv=0;
    const merge=(arr)=>{
        if(arr.length<=1) return arr;
        const mid=arr.length>>1;
        const L=merge(arr.slice(0,mid)), R=merge(arr.slice(mid));
        const res=[]; let a=0,b=0;
        while(a<L.length&&b<R.length){
            if(L[a]<=R[b]) res.push(L[a++]);
            else{inv+=L.length-a; res.push(R[b++]);}
        }
        return res.concat(L.slice(a),R.slice(b));
    };
    return merge(nums);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '📚',
      color: 'blue',
      content: `**Persistent segment tree key properties:**\n- Space: O(n log n) total for n updates\n- Each version shares O(n log n - k·log n) nodes with other versions\n- Query: diff between two versions = range query on value distribution\n\n**Classic application — k-th smallest in range [l,r]:**\n1. Coordinate compress all values\n2. Build version[i] = version[i-1] + add rank of arr[i]\n3. query(version[l-1], version[r], k) = k-th smallest\n\n**vs Merge sort tree:** PST uses O(n log n) space vs O(n log n) for merge sort tree; PST supports persistent queries more naturally. Wavelet tree is an alternative with O(1) space factor improvement.`,
    },
  ],
}
