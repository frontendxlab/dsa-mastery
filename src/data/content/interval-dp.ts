import type { Article } from '../articles'

export const intervalDpArticle: Article = {
  slug: 'interval-dp',
  title: 'Interval DP',
  emoji: '📏',
  tagline: 'dp[i][j] = best answer for subproblem on range [i..j].',
  description: 'Interval DP solves problems over contiguous ranges by building up from small intervals to large ones. Burst Balloons, Matrix Chain Multiplication, Palindrome Partitioning, Strange Printer, and Minimum Cost to Merge Stones all follow the same template: dp[i][j] = best over all split points k in [i,j].',
  gradient: 'from-teal-500 to-cyan-600',
  topicSlug: 'dp',
  readTime: '18 min',
  sections: [
    {
      type: 'text',
      content: `Interval DP problems have a recursive structure: the answer for range [i,j] depends on answers for smaller ranges within [i,j]. The key insight is the "last operation" trick: instead of thinking about what to do first, think about what to do LAST. The last operation divides [i,j] into independent subproblems.`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'The Universal Template',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Interval DP template — O(n³)',
      code: `// dp[i][j] = best answer for subproblem on arr[i..j]
// Fill by increasing interval length

const n = arr.length;
const dp = Array.from({length: n}, () => new Array(n).fill(0));

// Base case: length-1 intervals (single elements)
for (let i = 0; i < n; i++) dp[i][i] = baseCaseValue(i);

// Build up from length 2 to n
for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
        const j = i + len - 1;
        dp[i][j] = WORST_VALUE; // -Infinity or +Infinity
        // Try every split point k
        for (let k = i; k < j; k++) {
            // k is the "last operation" split point
            const candidate = combine(dp[i][k], dp[k+1][j], k);
            dp[i][j] = bestOf(dp[i][j], candidate);
        }
    }
}

return dp[0][n-1];

// The "last operation" variants:
// k is the last balloon burst in [i,j] → dp[i][k] + value(k) + dp[k][j]
// k is where we split the matrix chain → dp[i][k] + dp[k+1][j] + cost(i,k,j)
// k is the partition point → dp[i][k] + dp[k+1][j] + cost(i,j)`,
    },
    {
      type: 'table',
      headers: ['Problem', 'What k represents', 'Combine formula'],
      rows: [
        ['Burst Balloons', 'Last balloon to burst in [i,j]', 'dp[i][k] + nums[i]*nums[k]*nums[j] + dp[k][j]'],
        ['Matrix Chain Mult.', 'Where to split the chain', 'dp[i][k] + dp[k+1][j] + dims[i]*dims[k+1]*dims[j+1]'],
        ['Palindrome Partition', 'Length of last palindrome piece', 'dp[i][k-1] + 1 if s[k..j] is palindrome'],
        ['Min Cost Merge Stones', 'Where to merge last two groups', 'dp[i][k] + dp[k+1][j] + sum(i,j)'],
        ['Strange Printer', 'Last character group printed', 'dp[i][k] + dp[k+1][j] - (s[k]===s[j] ? 1 : 0)'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Burst Balloons',
      url: 'https://leetcode.com/problems/burst-balloons/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: "Last to burst" reversal — O(n³)',
          explanation: `Instead of "first balloon to burst" (dependencies everywhere), think "last balloon k to burst in [i,j]." When k is last, its left and right boundaries are still the sentinel 1s (or the boundaries of the interval). So: dp[i][j] = max over k of dp[i][k] + nums[i]*nums[k]*nums[j] + dp[k][j]. Add sentinel 1s at both ends.`,
          code: `var maxCoins = function(nums) {
    nums = [1, ...nums, 1];
    const n = nums.length;
    const dp = Array.from({length:n},()=>new Array(n).fill(0));
    // dp[i][j] = max coins from bursting all balloons STRICTLY between i and j
    for (let len = 2; len < n; len++)
        for (let i = 0; i < n-len; i++) {
            const j = i+len;
            for (let k=i+1; k<j; k++)
                dp[i][j] = Math.max(dp[i][j],
                    dp[i][k] + nums[i]*nums[k]*nums[j] + dp[k][j]);
        }
    return dp[0][n-1];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Minimum Cost Tree From Leaf Values',
      url: 'https://leetcode.com/problems/minimum-cost-tree-from-leaf-values/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Interval DP — dp[i][j] = min cost for leaves[i..j]',
          explanation: `Split leaves[i..j] at position k: left subtree uses leaves[i..k], right uses leaves[k+1..j]. The root of this split = max(left leaves) × max(right leaves). dp[i][j] = min over k of dp[i][k] + dp[k+1][j] + maxLeaf(i,k) × maxLeaf(k+1,j).`,
          code: `var mctFromLeafValues = function(arr) {
    const n = arr.length;
    // Precompute range max
    const maxVal = Array.from({length:n},()=>new Array(n).fill(0));
    for(let i=0;i<n;i++){
        maxVal[i][i]=arr[i];
        for(let j=i+1;j<n;j++) maxVal[i][j]=Math.max(maxVal[i][j-1],arr[j]);
    }
    const dp = Array.from({length:n},()=>new Array(n).fill(0));
    for(let len=2;len<=n;len++)
        for(let i=0;i<=n-len;i++){
            const j=i+len-1;
            dp[i][j]=Infinity;
            for(let k=i;k<j;k++)
                dp[i][j]=Math.min(dp[i][j], dp[i][k]+dp[k+1][j]+maxVal[i][k]*maxVal[k+1][j]);
        }
    return dp[0][n-1];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Strange Printer',
      url: 'https://leetcode.com/problems/strange-printer/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Interval DP — dp[i][j] = min turns to print s[i..j]',
          explanation: `dp[i][j] = min turns to print s[i..j]. Base: dp[i][i] = 1. Transition: dp[i][j] = dp[i][j-1] + 1 (print j separately). But if s[k] === s[j] for some k in [i,j-1], we can extend the turn that prints s[k] to also cover s[j], saving one turn: dp[i][j] = min(dp[i][j], dp[i][k] + dp[k+1][j-1] or dp[k][j-1]).`,
          code: `var strangePrinter = function(s) {
    const n = s.length;
    const dp = Array.from({length:n},()=>new Array(n).fill(0));
    for(let i=n-1;i>=0;i--){
        dp[i][i]=1;
        for(let j=i+1;j<n;j++){
            dp[i][j]=dp[i][j-1]+1; // print s[j] alone
            for(let k=i;k<j;k++){
                if(s[k]===s[j])
                    dp[i][j]=Math.min(dp[i][j],
                        dp[i][k]+(k+1<=j-1?dp[k+1][j-1]:0));
            }
        }
    }
    return dp[0][n-1];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Minimum Score Triangulation of Polygon',
      url: 'https://leetcode.com/problems/minimum-score-triangulation-of-polygon/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Interval DP — pick the triangle containing the edge i..j',
          explanation: `dp[i][j] = min score to triangulate polygon vertices[i..j]. For each third vertex k between i and j: triangle (i,k,j) + triangulate remaining sub-polygons. dp[i][j] = min over k of dp[i][k] + values[i]*values[k]*values[j] + dp[k][j].`,
          code: `var minScoreTriangulation = function(values) {
    const n = values.length;
    const dp = Array.from({length:n},()=>new Array(n).fill(0));
    for(let len=2;len<n;len++)
        for(let i=0;i<=n-len-1;i++){
            const j=i+len;
            dp[i][j]=Infinity;
            for(let k=i+1;k<j;k++)
                dp[i][j]=Math.min(dp[i][j],
                    dp[i][k]+values[i]*values[k]*values[j]+dp[k][j]);
        }
    return dp[0][n-1];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Zuma Game',
      url: 'https://leetcode.com/problems/zuma-game/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Interval DP with grouping',
          explanation: `dp[i][j] = min shots to clear board[i..j]. Group consecutive identical colors. Try inserting j-range clearing before clearing the group containing j — if colors match, clear them together. This is a complex interval DP with preprocessing of runs.`,
          code: `var findMinStep = function(board, hand) {
    const freq = new Map();
    for (const c of hand) freq.set(c, (freq.get(c)??0)+1);
    const memo = new Map();
    function dp(s, h) {
        if(!s) return 0;
        const key=s+JSON.stringify([...h]);
        if(memo.has(key)) return memo.get(key);
        // Remove leading group
        let i=0,j=0;
        while(j<s.length && s[j]===s[0]) j++;
        const cnt=j; // number of leading same chars
        const need=Math.max(0, 3-cnt);
        let res=Infinity;
        if((h.get(s[0])??0)>=need){
            const nh=new Map(h);
            nh.set(s[0],(nh.get(s[0])??0)-need);
            const sub=dp(s.slice(j),nh);
            if(sub!==Infinity) res=Math.min(res,need+sub);
        }
        // Also try matching s[0] with later same-color groups
        for(let k=j+1;k<s.length;k++){
            if(s[k]===s[0]){
                const nh=new Map(h);
                nh.set(s[0],(nh.get(s[0])??0)-1);
                if((nh.get(s[0])??0)>=0){
                    const sub=dp(s.slice(j,k)+s.slice(k),nh); // messy — see full solution
                    if(sub!==Infinity) res=Math.min(res,1+sub);
                }
            }
        }
        memo.set(key,res);
        return res;
    }
    const res=dp(board,freq);
    return res===Infinity?-1:res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧠',
      color: 'cyan',
      content: `**Interval DP checklist:**\n1. Can the problem be expressed as "best answer for range [i..j]"?\n2. Can it be split at a point k into independent subproblems?\n3. Does "last operation" reversal simplify dependencies?\n\n**Fill order is critical:** always fill by INCREASING interval length. Length 1 first (base), then 2, then 3, ..., up to n. This ensures dp[i][k] and dp[k+1][j] are ready when needed.\n\n**Complexity:** O(n³) — n² intervals × O(n) split points. Acceptable for n ≤ 500.`,
    },
  ],
}
