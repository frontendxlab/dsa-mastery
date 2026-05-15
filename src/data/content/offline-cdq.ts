import type { Article } from '../articles'

export const offlineCdqArticle: Article = {
  slug: 'offline-cdq',
  title: 'CDQ Divide and Conquer',
  emoji: '🔪',
  tagline: 'Solve 3D partial order problems offline. Process left half, measure cross contributions.',
  description: 'CDQ (陈丹琦) divide and conquer solves offline problems where answer for query q depends on all operations before q. Recursively: (1) solve left half, (2) compute contribution of left half on right half, (3) solve right half. This reduces a 3D problem (time, x, y) to 2D by sorting time, then processing cross-contributions with merge sort + Fenwick tree. O(n log²n) for 3D partial order.',
  gradient: 'from-slate-800 to-neutral-900',
  topicSlug: 'dp',
  readTime: '16 min',
  sections: [
    {
      type: 'text',
      content: `CDQ D&C solves problems of the form: "for each query point, count preceding points that dominate it in multiple dimensions." The time dimension is free (guaranteed: left half precedes right half). CDQ recursively processes: left half → compute left-on-right contributions → right half. The cross contribution step: sort both halves by x, use two pointers + Fenwick tree on y to count 2D domination. Result: O(n log²n).`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'CDQ D&C for 3D partial order',
      code: `// 3D partial order: for each point (t,x,y), count points with t'<t, x'<=x, y'<=y
// CDQ: time dimension handled by divide (left half has smaller t)
// x dimension: sort + two-pointer
// y dimension: Fenwick tree

function cdq3D(points) { // points = [{t, x, y, idx}] sorted by t
    const ans = new Array(points.length).fill(0);
    const n = points.length;
    const bit = new Array(n + 1).fill(0);
    const upd = i => { for (; i <= n; i += i & (-i)) bit[i]++; };
    const qry = i => { let s = 0; for (; i > 0; i -= i & (-i)) s += bit[i]; return s; };
    const undo = [];

    function solve(l, r) {
        if (l === r) return;
        const mid = (l + r) >> 1;
        solve(l, mid); // process left half
        // Compute contribution of left half on right half
        const left = points.slice(l, mid + 1).sort((a, b) => a.x - b.x);
        const right = points.slice(mid + 1, r + 1).sort((a, b) => a.x - b.x);
        let li = 0;
        for (const rp of right) {
            while (li < left.length && left[li].x <= rp.x) {
                upd(left[li].y); undo.push(left[li].y); li++;
            }
            ans[rp.idx] += qry(rp.y);
        }
        // Undo BIT updates
        while (undo.length) { const y = undo.pop(); for (let i = y; i <= n; i += i & (-i)) bit[i]--; }
        solve(mid + 1, r); // process right half
    }

    solve(0, n - 1);
    return ans;
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
      title: 'Count Inversions (offline range inversion count)',
      url: 'https://leetcode.com/problems/count-of-smaller-numbers-after-self/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Merge sort counting — classic CDQ application',
          explanation: `CDQ: split array in half. Count cross inversions: elements from right half smaller than elements from left half. Sort both halves, count using two pointers. O(n log n) total.`,
          code: `var countSmaller = function(nums) {
    const n=nums.length, res=new Array(n).fill(0);
    const arr=nums.map((v,i)=>({v,i}));
    const mergeSort=(arr)=>{
        if(arr.length<=1) return arr;
        const mid=arr.length>>1;
        const L=mergeSort(arr.slice(0,mid)), R=mergeSort(arr.slice(mid));
        let j=0;
        for(const l of L){while(j<R.length&&R[j].v<l.v) j++; res[l.i]+=j;}
        // Standard merge
        let a=0,b=0; const out=[];
        while(a<L.length&&b<R.length) L[a].v<=R[b].v?out.push(L[a++]):out.push(R[b++]);
        return out.concat(L.slice(a),R.slice(b));
    };
    mergeSort(arr);
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Count Good Triplets in an Array',
      url: 'https://leetcode.com/problems/count-good-triplets-in-an-array/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Map to positions, count inversions-like via Fenwick tree',
          explanation: `For each element in nums2, count elements that appear before it in both nums1 and nums2. Map nums1 positions, then process nums2 order. For each element x at nums2 position i: count elements with smaller nums1 position AND smaller nums2 position = prefix query on a Fenwick tree.`,
          code: `var goodTriplets = function(nums1, nums2) {
    const n=nums1.length;
    const pos=new Array(n); // pos[v] = position of v in nums1
    nums1.forEach((v,i)=>pos[v]=i);
    // For each element in nums2 order, count how many previous elements have smaller pos[]
    const bit=new Array(n+1).fill(0);
    const upd=i=>{for(;i<=n;i+=i&(-i))bit[i]++;};
    const qry=i=>{let s=0;for(;i>0;i-=i&(-i))s+=bit[i];return s;};
    let ans=0;
    for(const v of nums2){
        const p=pos[v]+1; // 1-indexed
        const left=qry(p-1);     // elements before in both nums1 and nums2
        const right=(n-p)-(qry(n)-qry(p)); // elements after in both
        ans+=left*right;
        upd(p);
    }
    return ans;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Count Pairs With Absolute Difference Less Than K',
      url: 'https://leetcode.com/problems/count-pairs-whose-sum-is-less-than-target/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Sort + two pointers',
          explanation: `Sort. Two pointers l,r. If nums[l]+nums[r] < target, all pairs (l, l+1..r) are valid. Add r-l, advance l. Else decrease r.`,
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
      ],
    },
    {
      type: 'callout',
      icon: '🔪',
      color: 'gray',
      content: `**CDQ D&C template:**\n1. If base case, return\n2. cdq(left half)\n3. Compute left→right cross contributions (sorted by 2nd dim, BIT on 3rd dim)\n4. Undo BIT changes\n5. cdq(right half)\n\n**Key insight:** The 1st dimension (time) is handled by divide — left half always precedes right. Reduce 3D to 2D using sort + BIT.\n\n**Applications:**\n- 3D partial order: O(n log²n)\n- Dynamic inversion counting: O(n log²n)\n- Offline range k-th smallest: O(n log²n)\n- Any problem reducible to "count preceding points satisfying multi-dim constraints"\n\n**vs Persistent Segment Tree:** Both solve offline range queries but with different constant factors. CDQ is cache-friendlier; PST uses O(n log n) extra space.`,
    },
  ],
}
