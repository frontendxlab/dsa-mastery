import type { Article } from '../articles'

export const twoDPrefixSumArticle: Article = {
  slug: 'two-d-prefix-sum',
  title: '2D Prefix Sums & Difference Arrays',
  emoji: '🔲',
  tagline: 'O(1) rectangle sum queries. 2D range updates with difference arrays.',
  description: '2D prefix sums extend the 1D concept to matrices: prefix[i][j] = sum of all elements in rectangle [0..i-1][0..j-1]. Rectangle sum query [r1,c1..r2,c2] in O(1) using inclusion-exclusion. 2D difference arrays enable O(1) range updates on a submatrix. Applications: counting elements in sub-rectangles, matrix maximum sum, number of subarrays with bounded sums.',
  gradient: 'from-sky-700 to-blue-800',
  topicSlug: 'dp',
  readTime: '12 min',
  sections: [
    {
      type: 'text',
      content: `2D prefix sum: pre[i][j] = pre[i-1][j] + pre[i][j-1] - pre[i-1][j-1] + grid[i-1][j-1]. Rectangle sum query: pre[r2+1][c2+1] - pre[r1][c2+1] - pre[r2+1][c1] + pre[r1][c1]. 2D difference array: to add v to rectangle [r1,c1..r2,c2], do d[r1][c1]+=v, d[r1][c2+1]-=v, d[r2+1][c1]-=v, d[r2+1][c2+1]+=v. Then take 2D prefix sum to recover the array.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: '2D prefix sum and rectangle query',
      code: `// Build 2D prefix sum
function build2DPrefix(grid) {
    const m = grid.length, n = grid[0].length;
    const pre = Array.from({length: m+1}, () => new Array(n+1).fill(0));
    for (let i = 1; i <= m; i++)
        for (let j = 1; j <= n; j++)
            pre[i][j] = grid[i-1][j-1] + pre[i-1][j] + pre[i][j-1] - pre[i-1][j-1];
    return pre;
}

// Rectangle sum: rows [r1..r2], cols [c1..c2] (0-indexed)
function rectSum(pre, r1, c1, r2, c2) {
    return pre[r2+1][c2+1] - pre[r1][c2+1] - pre[r2+1][c1] + pre[r1][c1];
}

// 2D difference array: add val to rectangle [r1..r2][c1..c2]
function addRect(diff, r1, c1, r2, c2, val) {
    diff[r1][c1] += val;
    diff[r1][c2+1] -= val;
    diff[r2+1][c1] -= val;
    diff[r2+1][c2+1] += val;
}

// Recover array from 2D difference array
function recover2D(diff) {
    const m = diff.length, n = diff[0].length;
    for (let i = 0; i < m; i++)
        for (let j = 1; j < n; j++) diff[i][j] += diff[i][j-1];
    for (let i = 1; i < m; i++)
        for (let j = 0; j < n; j++) diff[i][j] += diff[i-1][j];
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
      title: 'Range Sum Query 2D - Immutable',
      url: 'https://leetcode.com/problems/range-sum-query-2d-immutable/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: 2D prefix sum — O(mn) build, O(1) query',
          explanation: `Build prefix[i][j] = sum of rectangle [0..i-1][0..j-1]. Query [r1,c1..r2,c2] = pre[r2+1][c2+1] - pre[r1][c2+1] - pre[r2+1][c1] + pre[r1][c1].`,
          code: `var NumMatrix = function(matrix) {
    const m=matrix.length,n=matrix[0].length;
    this.pre=Array.from({length:m+1},()=>new Array(n+1).fill(0));
    for(let i=1;i<=m;i++) for(let j=1;j<=n;j++)
        this.pre[i][j]=matrix[i-1][j-1]+this.pre[i-1][j]+this.pre[i][j-1]-this.pre[i-1][j-1];
};
NumMatrix.prototype.sumRegion = function(r1,c1,r2,c2) {
    return this.pre[r2+1][c2+1]-this.pre[r1][c2+1]-this.pre[r2+1][c1]+this.pre[r1][c1];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Max Sum of Rectangle No Larger Than K',
      url: 'https://leetcode.com/problems/max-sum-of-rectangle-no-larger-than-k/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Fix column range, reduce to max subarray sum ≤ k in 1D',
          explanation: `Fix left and right columns. Compress each row in [left..right] to a 1D prefix sum. Then find max subarray sum ≤ k using a sorted set: for each prefix sum s, find the smallest value in the set ≥ s-k. O(n² m log m).`,
          code: `var maxSumSubmatrix = function(matrix, k) {
    const m=matrix.length,n=matrix[0].length;
    let ans=-Infinity;
    for(let l=0;l<n;l++){
        const rowSum=new Array(m).fill(0);
        for(let r=l;r<n;r++){
            for(let i=0;i<m;i++) rowSum[i]+=matrix[i][r];
            // Find max subarray sum <= k using sorted prefix sums
            const sums=[0]; let pre=0;
            for(const x of rowSum){
                pre+=x;
                // Find smallest sum >= pre-k
                const target=pre-k;
                let lo=0,hi=sums.length;
                while(lo<hi){const mid=(lo+hi)>>1;sums[mid]<target?lo=mid+1:hi=mid;}
                if(lo<sums.length) ans=Math.max(ans,pre-sums[lo]);
                // Insert pre into sorted position
                let ins=0;while(ins<sums.length&&sums[ins]<pre) ins++;
                sums.splice(ins,0,pre);
            }
        }
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
      title: 'Count Submatrices With All Ones',
      url: 'https://leetcode.com/problems/count-submatrices-with-all-ones/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: For each cell (i,j), count submatrices with bottom-right corner at (i,j)',
          explanation: `height[i][j] = consecutive 1s ending at row i in column j. For each row, process heights with a stack/linear scan: for each j, find how many valid bottom-right corners at (i, j) extend left. Sum equals count of valid widths.`,
          code: `var numSubmat = function(mat) {
    const m=mat.length,n=mat[0].length;
    let res=0;
    const height=new Array(n).fill(0);
    for(let i=0;i<m;i++){
        for(let j=0;j<n;j++) height[j]=mat[i][j]?height[j]+1:0;
        // For each j, count submatrices ending at column j
        const sum=new Array(n).fill(0);
        const stack=[];
        for(let j=0;j<n;j++){
            while(stack.length&&height[stack[stack.length-1]]>=height[j]) stack.pop();
            if(stack.length){
                const prev=stack[stack.length-1];
                sum[j]=sum[prev]+(j-prev)*height[j];
            } else {
                sum[j]=(j+1)*height[j];
            }
            stack.push(j);
            res+=sum[j];
        }
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Stamping The Grid',
      url: 'https://leetcode.com/problems/stamping-the-grid/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: 2D prefix sum + 2D difference array',
          explanation: `Count empty cells in each stamp-sized rectangle using 2D prefix sum. If count == 0 (all empty), stamp it using 2D difference array. After all stamps, check every empty cell is covered using another 2D prefix sum on the stamp coverage.`,
          code: `var possibleToStamp = function(grid, stampHeight, stampWidth) {
    const m=grid.length,n=grid[0].length;
    // Build 2D prefix of grid (1=occupied)
    const pre=Array.from({length:m+1},()=>new Array(n+1).fill(0));
    for(let i=1;i<=m;i++) for(let j=1;j<=n;j++)
        pre[i][j]=grid[i-1][j-1]+pre[i-1][j]+pre[i][j-1]-pre[i-1][j-1];
    const sum=(r1,c1,r2,c2)=>pre[r2+1][c2+1]-pre[r1][c2+1]-pre[r2+1][c1]+pre[r1][c1];
    // 2D difference array for stamp coverage
    const diff=Array.from({length:m+2},()=>new Array(n+2).fill(0));
    for(let i=0;i+stampHeight<=m;i++) for(let j=0;j+stampWidth<=n;j++){
        if(sum(i,j,i+stampHeight-1,j+stampWidth-1)===0){
            diff[i][j]++;diff[i][j+stampWidth]--;
            diff[i+stampHeight][j]--;diff[i+stampHeight][j+stampWidth]++;
        }
    }
    // Recover coverage and check
    for(let i=0;i<m;i++) for(let j=1;j<n;j++) diff[i][j]+=diff[i][j-1];
    for(let i=1;i<m;i++) for(let j=0;j<n;j++) diff[i][j]+=diff[i-1][j];
    for(let i=0;i<m;i++) for(let j=0;j<n;j++)
        if(grid[i][j]===0&&diff[i][j]===0) return false;
    return true;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🔲',
      color: 'blue',
      content: `**2D prefix sum formula (memorize):**\n- Build: \`pre[i][j] = grid[i-1][j-1] + pre[i-1][j] + pre[i][j-1] - pre[i-1][j-1]\`\n- Query [r1,c1..r2,c2]: \`pre[r2+1][c2+1] - pre[r1][c2+1] - pre[r2+1][c1] + pre[r1][c1]\`\n\n**2D difference array:** For adding v to rectangle, touch all 4 corners with ±v. Recover with row-then-column prefix sums.\n\n**Pattern: fix one dimension:** Many 2D problems reduce to 1D by fixing row range (left, right columns) and processing column sums. This gives O(n² × 1D_algo) complexity.`,
    },
  ],
}
