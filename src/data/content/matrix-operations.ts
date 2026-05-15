import type { Article } from '../articles'

export const matrixOperationsArticle: Article = {
  slug: 'matrix-operations',
  title: 'Matrix Operations & Transformations',
  emoji: '🔄',
  tagline: 'Rotate 90°, transpose, spiral traversal, search in sorted matrix.',
  description: 'Matrix transformation problems require understanding coordinate mappings: rotating 90° clockwise maps (r,c) → (c, n-1-r); transposing maps (r,c) → (c,r). Spiral traversal uses four shrinking boundaries. Searching in a row-and-column sorted matrix exploits monotone structure by starting at top-right corner. These operations appear frequently in simulations and geometric problems.',
  gradient: 'from-indigo-600 to-purple-700',
  topicSlug: 'graph',
  readTime: '13 min',
  sections: [
    {
      type: 'text',
      content: `Rotate matrix 90° clockwise in-place: transpose then reverse each row. Transpose: swap matrix[i][j] with matrix[j][i] for j > i. Reverse rows: reverse each row in place. Spiral traversal: maintain top, bottom, left, right boundaries. Shrink boundaries as each layer is traversed. Search sorted matrix: start at top-right; go left if current > target, down if current < target.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Rotate matrix and spiral order templates',
      code: `// Rotate 90° clockwise in-place: transpose + reverse each row
function rotate(matrix) {
    const n = matrix.length;
    // Transpose
    for (let i = 0; i < n; i++)
        for (let j = i + 1; j < n; j++)
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    // Reverse each row
    for (let i = 0; i < n; i++) matrix[i].reverse();
}

// Spiral order traversal
function spiralOrder(matrix) {
    const result = [];
    let [top, bottom, left, right] = [0, matrix.length-1, 0, matrix[0].length-1];
    while (top <= bottom && left <= right) {
        for (let c = left; c <= right; c++) result.push(matrix[top][c]); top++;
        for (let r = top; r <= bottom; r++) result.push(matrix[r][right]); right--;
        if (top <= bottom) {
            for (let c = right; c >= left; c--) result.push(matrix[bottom][c]); bottom--;
        }
        if (left <= right) {
            for (let r = bottom; r >= top; r--) result.push(matrix[r][left]); left++;
        }
    }
    return result;
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
      title: 'Rotate Image',
      url: 'https://leetcode.com/problems/rotate-image/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Transpose then reverse each row',
          explanation: `90° clockwise rotation = transpose + reverse rows. Transpose: swap (i,j) with (j,i) for j > i. Reverse: each row reversed in-place.`,
          code: `var rotate = function(matrix) {
    const n=matrix.length;
    for(let i=0;i<n;i++) for(let j=i+1;j<n;j++)
        [matrix[i][j],matrix[j][i]]=[matrix[j][i],matrix[i][j]];
    for(const row of matrix) row.reverse();
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Spiral Matrix',
      url: 'https://leetcode.com/problems/spiral-matrix/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Shrinking boundaries — peel outer layer each iteration',
          explanation: `Four boundaries (top, bottom, left, right). Traverse: left→right along top, top→bottom along right, right→left along bottom, bottom→top along left. Shrink each boundary after traversing. Guard against single row/column mid-traversal.`,
          code: `var spiralOrder = function(matrix) {
    const res=[]; let t=0,b=matrix.length-1,l=0,r=matrix[0].length-1;
    while(t<=b&&l<=r){
        for(let c=l;c<=r;c++) res.push(matrix[t][c]); t++;
        for(let row=t;row<=b;row++) res.push(matrix[row][r]); r--;
        if(t<=b){for(let c=r;c>=l;c--) res.push(matrix[b][c]); b--;}
        if(l<=r){for(let row=b;row>=t;row--) res.push(matrix[row][l]); l++;}
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
      title: 'Search a 2D Matrix II',
      url: 'https://leetcode.com/problems/search-a-2d-matrix-ii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Start at top-right — move left if too big, down if too small',
          explanation: `Top-right corner: larger than all in same row, smaller than all in same column. If matrix[r][c] == target: found. If > target: go left (c--). If < target: go down (r++). O(m+n).`,
          code: `var searchMatrix = function(matrix, target) {
    let r=0, c=matrix[0].length-1;
    while(r<matrix.length&&c>=0){
        if(matrix[r][c]===target) return true;
        matrix[r][c]>target?c--:r++;
    }
    return false;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Game of Life',
      url: 'https://leetcode.com/problems/game-of-life/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: In-place with extra encoding: 2 = was 1, becomes 0; 3 = was 0, becomes 1',
          explanation: `To update in-place without extra space: use state 2 to mark "was alive, now dead" and state 3 for "was dead, now alive". Count neighbors using original states: count cells with value 1 or 2 (were originally alive). Then convert: 2→0, 3→1.`,
          code: `var gameOfLife = function(board) {
    const m=board.length,n=board[0].length;
    const dirs=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    const live=(r,c)=>r>=0&&r<m&&c>=0&&c<n&&(board[r][c]&1);
    for(let r=0;r<m;r++) for(let c=0;c<n;c++){
        let cnt=0;
        for(const [dr,dc] of dirs) if(live(r+dr,c+dc)) cnt++;
        if(board[r][c]&&(cnt<2||cnt>3)) board[r][c]=0b01; // die
        else if(!board[r][c]&&cnt===3) board[r][c]=0b10; // born
        else if(board[r][c]&&cnt>=2&&cnt<=3) board[r][c]=0b11; // survive
    }
    for(let r=0;r<m;r++) for(let c=0;c<n;c++) board[r][c]>>=1;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🔄',
      color: 'blue',
      content: `**Matrix rotation formulas:**\n- 90° clockwise: (r,c) → (c, n-1-r) = transpose + reverse rows\n- 90° counter-clockwise: (r,c) → (n-1-c, r) = transpose + reverse columns\n- 180°: (r,c) → (n-1-r, n-1-c) = reverse rows + reverse columns\n\n**Sorted matrix search:** Top-right corner is the "pivot" — it's larger than everything to its left and smaller than everything below. Each comparison eliminates one row or column.\n\n**In-place tricks:** Use bit encoding to store old and new state simultaneously. LSB = current state, MSB = next state. Read LSB for neighbor counting, right-shift at end.`,
    },
  ],
}
