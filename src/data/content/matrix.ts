import type { Article } from '../articles'

export const matrixArticle: Article = {
  slug: 'matrix',
  title: 'Matrix & Shape Problems',
  emoji: '🔲',
  tagline: 'Spiral traversal, rotation, 2D prefix sums — grids have patterns.',
  description: 'Matrix problems form their own family. Spiral traversal, 90° rotation, diagonal traversal, 2D prefix sums, and binary search in sorted matrices all have elegant O(n) or O(n²) solutions once you see the pattern.',
  gradient: 'from-indigo-400 to-violet-500',
  topicSlug: 'shape',
  readTime: '16 min',
  sections: [
    {
      type: 'text',
      content: `Matrix problems look intimidating because 2D indexing is fiddly. The secret is that almost every matrix problem reduces to one of 5-6 core techniques. Once you see which technique applies, the implementation is mostly mechanical.`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Core Techniques',
    },
    {
      type: 'table',
      headers: ['Problem Type', 'Technique'],
      rows: [
        ['Traverse all cells in spiral order', 'Direction array + boundary shrink'],
        ['Rotate matrix 90° clockwise', 'Transpose then reverse each row'],
        ['Rotate 90° counter-clockwise', 'Reverse each row then transpose'],
        ['Diagonal traversal', 'Sum of indices is constant on each diagonal'],
        ['Count valid submatrix sums', '2D prefix sum in O(1) query'],
        ['Search in row+col sorted matrix', 'Start top-right: go left if too big, down if too small'],
        ['Count cells equal to target sum', '2D prefix sum + column compression'],
      ],
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Rotate matrix 90° clockwise in-place',
      code: `// Step 1: Transpose (swap arr[i][j] with arr[j][i])
// Step 2: Reverse each row
var rotate = function(matrix) {
    const n = matrix.length;
    // Transpose
    for (let i = 0; i < n; i++)
        for (let j = i + 1; j < n; j++)
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    // Reverse each row
    for (const row of matrix) row.reverse();
};`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: '2D Prefix Sum — build in O(n²), query any rectangle in O(1)',
      code: `// prefix[i][j] = sum of all cells in rectangle (0,0) to (i-1, j-1)
function build2DPrefix(matrix) {
    const n = matrix.length, m = matrix[0].length;
    const prefix = Array.from({length: n+1}, () => new Array(m+1).fill(0));
    for (let i = 1; i <= n; i++)
        for (let j = 1; j <= m; j++)
            prefix[i][j] = matrix[i-1][j-1]
                + prefix[i-1][j] + prefix[i][j-1] - prefix[i-1][j-1];
    return prefix;
}
// Query rectangle (r1,c1) to (r2,c2) (0-indexed):
const query = (p, r1, c1, r2, c2) =>
    p[r2+1][c2+1] - p[r1][c2+1] - p[r2+1][c1] + p[r1][c1];`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Search in 2D matrix sorted by rows and columns',
      code: `// Start at top-right corner.
// If target < current: move left (current column too big)
// If target > current: move down (current row too small)
// Each step eliminates an entire row or column → O(n+m)
var searchMatrix = function(matrix, target) {
    let r = 0, c = matrix[0].length - 1;
    while (r < matrix.length && c >= 0) {
        if (matrix[r][c] === target) return true;
        else if (matrix[r][c] > target) c--;
        else r++;
    }
    return false;
};`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Spiral Matrix',
      url: 'https://leetcode.com/problems/spiral-matrix/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Direction array + boundary shrink',
          explanation: `Use a direction array [(0,1), (1,0), (0,-1), (-1,0)] = right, down, left, up. Move in current direction until hitting a visited cell or boundary, then rotate direction. Shrink boundaries (top, bottom, left, right) as each side is fully traversed.`,
          code: `var spiralOrder = function(matrix) {
    const result = [];
    let top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1;
    while (top <= bottom && left <= right) {
        for (let c = left; c <= right; c++) result.push(matrix[top][c]);
        top++;
        for (let r = top; r <= bottom; r++) result.push(matrix[r][right]);
        right--;
        if (top <= bottom) {
            for (let c = right; c >= left; c--) result.push(matrix[bottom][c]);
            bottom--;
        }
        if (left <= right) {
            for (let r = bottom; r >= top; r--) result.push(matrix[r][left]);
            left++;
        }
    }
    return result;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Number of Submatrices That Sum to Target',
      url: 'https://leetcode.com/problems/number-of-submatrices-that-sum-to-target/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Compress columns + subarray sum equals k',
          explanation: `For each pair of rows (r1, r2), compute column prefix sums to compress those rows into a 1D array. Then run "subarray sum equals k" (using hashmap) on that 1D array. O(n² × m) total.`,
          code: `var numSubmatrixSumTarget = function(matrix, target) {
    const m = matrix.length, n = matrix[0].length;
    let count = 0;
    // Build row prefix sums
    for (const row of matrix)
        for (let j = 1; j < n; j++) row[j] += row[j-1];

    for (let c1 = 0; c1 < n; c1++) {
        for (let c2 = c1; c2 < n; c2++) {
            const map = new Map([[0, 1]]);
            let sum = 0;
            for (let r = 0; r < m; r++) {
                sum += matrix[r][c2] - (c1 > 0 ? matrix[r][c1-1] : 0);
                count += (map.get(sum - target) ?? 0);
                map.set(sum, (map.get(sum) ?? 0) + 1);
            }
        }
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
      title: 'Maximal Square',
      url: 'https://leetcode.com/problems/maximal-square/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DP — dp[i][j] = side length of largest square ending at (i,j)',
          explanation: `If matrix[i][j] = '1': dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1. The min of three neighbors limits how large a square can end here. If any neighbor has a small square, we can't extend beyond it.`,
          code: `var maximalSquare = function(matrix) {
    const m = matrix.length, n = matrix[0].length;
    const dp = Array.from({length: m+1}, () => new Array(n+1).fill(0));
    let maxSide = 0;
    for (let i = 1; i <= m; i++)
        for (let j = 1; j <= n; j++) {
            if (matrix[i-1][j-1] === '1') {
                dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1;
                maxSide = Math.max(maxSide, dp[i][j]);
            }
        }
    return maxSide * maxSide;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'More Worked Problems',
    },
    {
      type: 'problem',
      num: 4,
      title: 'Spiral Matrix',
      url: 'https://leetcode.com/problems/spiral-matrix/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Boundary shrink — track top/bottom/left/right',
          explanation: 'Maintain four boundaries. Traverse: right along top, down along right, left along bottom, up along left. After each direction, shrink that boundary inward. Stop when boundaries cross.',
          code: `var spiralOrder = function(matrix) {
    const res = [];
    let top=0, bot=matrix.length-1, left=0, right=matrix[0].length-1;
    while (top<=bot && left<=right) {
        for(let c=left;c<=right;c++) res.push(matrix[top][c]); top++;
        for(let r=top;r<=bot;r++) res.push(matrix[r][right]); right--;
        if(top<=bot) { for(let c=right;c>=left;c--) res.push(matrix[bot][c]); bot--; }
        if(left<=right) { for(let r=bot;r>=top;r--) res.push(matrix[r][left]); left++; }
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Set Matrix Zeroes',
      url: 'https://leetcode.com/problems/set-matrix-zeroes/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: O(m+n) extra space — track which rows/cols have zeros',
          explanation: 'First pass: collect rows and cols containing zeros. Second pass: set entire row/col to zero.',
        },
        {
          label: 'Intuition 2: O(1) space — use first row/col as markers',
          explanation: 'Use matrix[0][j] to mark "column j needs zeroing" and matrix[i][0] to mark "row i needs zeroing". Handle first row/col separately (check if they originally had zeros).',
          code: `var setZeroes = function(matrix) {
    const m=matrix.length, n=matrix[0].length;
    let firstRowZero=matrix[0].includes(0), firstColZero=matrix.some(r=>r[0]===0);
    // mark in first row/col
    for(let i=1;i<m;i++) for(let j=1;j<n;j++)
        if(matrix[i][j]===0){ matrix[i][0]=0; matrix[0][j]=0; }
    // zero using marks
    for(let i=1;i<m;i++) for(let j=1;j<n;j++)
        if(matrix[i][0]===0||matrix[0][j]===0) matrix[i][j]=0;
    if(firstRowZero) matrix[0].fill(0);
    if(firstColZero) for(let i=0;i<m;i++) matrix[i][0]=0;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'amber',
      content: `**2D prefix sum formula** (memorize this):\nprefix[i][j] = matrix[i-1][j-1] + prefix[i-1][j] + prefix[i][j-1] - prefix[i-1][j-1]\n\nQuery rectangle (r1,c1)→(r2,c2):\nsum = prefix[r2+1][c2+1] - prefix[r1][c2+1] - prefix[r2+1][c1] + prefix[r1][c1]\n\nThe +1 offset keeps the prefix 1-indexed so you can safely access prefix[i-1] without bounds checks.`,
    },
  ],
}
