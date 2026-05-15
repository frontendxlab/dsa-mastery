import type { Article } from '../articles'

export const backtrackingPruningArticle: Article = {
  slug: 'backtracking-pruning',
  title: 'Backtracking with Pruning',
  emoji: '✂️',
  tagline: 'Prune search space early. Bound functions, symmetry breaking, feasibility checks.',
  description: 'Backtracking explores all possibilities by building candidates incrementally and abandoning (pruning) those that cannot lead to valid solutions. Effective pruning transforms exponential worst-case into practical efficiency. Key pruning strategies: feasibility check (can current partial solution extend to a valid one?), bounding function (can current path beat the best found?), symmetry breaking (avoid redundant symmetric branches), and constraint propagation.',
  gradient: 'from-red-700 to-orange-800',
  topicSlug: 'graph',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `Backtracking template: choose → explore → unchoose. Pruning: before recursing, check if the partial solution can possibly lead to a valid answer. For optimization: prune if current path cannot beat best answer found so far (branch and bound). For combinatorial: sort first and skip duplicates. For constraint satisfaction: after each assignment, check all constraints are still satisfiable.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Backtracking with duplicate pruning and feasibility check',
      code: `// Subsets with duplicates — sort + skip duplicates at same level
function subsetsWithDup(nums) {
    nums.sort((a, b) => a - b);
    const result = [], current = [];

    function backtrack(start) {
        result.push([...current]);
        for (let i = start; i < nums.length; i++) {
            // Pruning: skip duplicate values at the same recursion level
            if (i > start && nums[i] === nums[i-1]) continue;
            current.push(nums[i]);
            backtrack(i + 1);
            current.pop();
        }
    }
    backtrack(0);
    return result;
}

// N-Queens — prune by checking column and diagonal conflicts
function solveNQueens(n) {
    const result = [], board = Array(n).fill().map(() => Array(n).fill('.'));
    const cols = new Set(), diag1 = new Set(), diag2 = new Set();

    function backtrack(row) {
        if (row === n) { result.push(board.map(r => r.join(''))); return; }
        for (let col = 0; col < n; col++) {
            if (cols.has(col) || diag1.has(row-col) || diag2.has(row+col)) continue;
            cols.add(col); diag1.add(row-col); diag2.add(row+col);
            board[row][col] = 'Q';
            backtrack(row + 1);
            board[row][col] = '.';
            cols.delete(col); diag1.delete(row-col); diag2.delete(row+col);
        }
    }
    backtrack(0);
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
      title: 'Sudoku Solver',
      url: 'https://leetcode.com/problems/sudoku-solver/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Backtracking with constraint sets for row/col/box',
          explanation: `Track used digits per row, column, and 3x3 box. Find the next empty cell. Try digits 1-9; if valid (not in row/col/box), place it and recurse. If recursion fails, undo and try next digit. Return true when all cells filled.`,
          code: `var solveSudoku = function(board) {
    const rows=Array.from({length:9},()=>new Set());
    const cols=Array.from({length:9},()=>new Set());
    const boxes=Array.from({length:9},()=>new Set());
    for(let i=0;i<9;i++) for(let j=0;j<9;j++) if(board[i][j]!=='.'){
        const v=board[i][j],b=Math.floor(i/3)*3+Math.floor(j/3);
        rows[i].add(v);cols[j].add(v);boxes[b].add(v);
    }
    const solve=()=>{
        for(let i=0;i<9;i++) for(let j=0;j<9;j++) if(board[i][j]==='.'){
            const b=Math.floor(i/3)*3+Math.floor(j/3);
            for(let d=1;d<=9;d++){
                const v=String(d);
                if(rows[i].has(v)||cols[j].has(v)||boxes[b].has(v)) continue;
                board[i][j]=v;rows[i].add(v);cols[j].add(v);boxes[b].add(v);
                if(solve()) return true;
                board[i][j]='.';rows[i].delete(v);cols[j].delete(v);boxes[b].delete(v);
            }
            return false;
        }
        return true;
    };
    solve();
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Combination Sum II',
      url: 'https://leetcode.com/problems/combination-sum-ii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Sort + skip duplicates at same level of recursion',
          explanation: `Sort candidates. Skip candidates[i] if i > start and candidates[i] == candidates[i-1] (would create duplicate combination). Prune if candidates[i] > remaining.`,
          code: `var combinationSum2 = function(candidates, target) {
    candidates.sort((a,b)=>a-b);
    const res=[], cur=[];
    const bt=(start,rem)=>{
        if(rem===0){res.push([...cur]);return;}
        for(let i=start;i<candidates.length;i++){
            if(candidates[i]>rem) break; // pruning
            if(i>start&&candidates[i]===candidates[i-1]) continue; // skip dups
            cur.push(candidates[i]);
            bt(i+1,rem-candidates[i]);
            cur.pop();
        }
    };
    bt(0,target);
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Palindrome Partitioning',
      url: 'https://leetcode.com/problems/palindrome-partitioning/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Backtracking — at each position, try all palindromic prefixes',
          explanation: `From current position, try all substrings starting here. If substring is a palindrome, add to current partition and recurse. Prune: skip non-palindromic substrings immediately. Precompute palindrome table with DP to check in O(1).`,
          code: `var partition = function(s) {
    const n=s.length, res=[], cur=[];
    // Precompute isPalin[i][j]
    const pal=Array.from({length:n},()=>new Array(n).fill(false));
    for(let i=0;i<n;i++) pal[i][i]=true;
    for(let i=0;i<n-1;i++) pal[i][i+1]=s[i]===s[i+1];
    for(let len=3;len<=n;len++) for(let i=0;i+len-1<n;i++){
        const j=i+len-1; pal[i][j]=s[i]===s[j]&&pal[i+1][j-1];
    }
    const bt=(start)=>{
        if(start===n){res.push([...cur]);return;}
        for(let end=start;end<n;end++){
            if(!pal[start][end]) continue; // prune
            cur.push(s.slice(start,end+1));
            bt(end+1);
            cur.pop();
        }
    };
    bt(0);
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Word Search II',
      url: 'https://leetcode.com/problems/word-search-ii/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Trie + DFS backtracking — prune branches not in trie',
          explanation: `Build a trie of all words. DFS on grid using the trie: at each cell, if current character leads nowhere in trie, prune. Mark cell visited during DFS, unmark after. When trie node has a word, add to result.`,
          code: `var findWords = function(board, words) {
    const trie={};
    for(const w of words){let t=trie;for(const c of w){t[c]=t[c]||{};t=t[c];}t['#']=w;}
    const m=board.length,n=board[0].length,res=[];
    const dfs=(i,j,node)=>{
        const c=board[i][j];
        if(!node[c]) return;
        const next=node[c];
        if(next['#']){res.push(next['#']);delete next['#'];}
        board[i][j]='#';
        for(const [di,dj] of [[-1,0],[1,0],[0,-1],[0,1]]){
            const ni=i+di,nj=j+dj;
            if(ni>=0&&ni<m&&nj>=0&&nj<n&&board[ni][nj]!=='#') dfs(ni,nj,next);
        }
        board[i][j]=c;
        if(!Object.keys(next).length) delete node[c]; // trie pruning
    };
    for(let i=0;i<m;i++) for(let j=0;j<n;j++) dfs(i,j,trie);
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '✂️',
      color: 'red',
      content: `**Pruning strategies:**\n- **Feasibility:** Can current partial solution be extended? (remaining target < min available)\n- **Bound:** Can current path beat best answer? (branch and bound)\n- **Duplicate skipping:** Sort + skip when nums[i] == nums[i-1] at same recursion level\n- **Constraint propagation:** After each choice, check remaining constraints\n- **Trie pruning:** Stop DFS when current prefix matches no word\n\n**Key insight for duplicate skipping:** The condition is i > start, not i > 0. This allows the same value at different recursion depths but skips duplicates within the same level.`,
    },
  ],
}
