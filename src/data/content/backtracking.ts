import type { Article } from '../articles'

export const backtrackingArticle: Article = {
  slug: 'backtracking',
  title: 'Backtracking',
  emoji: '🔄',
  tagline: 'Try every option. Undo. Move on.',
  description: 'Backtracking is systematic brute-force with pruning. One universal template handles permutations, combinations, subsets, N-queens, and Sudoku. The power is in the pruning conditions.',
  gradient: 'from-teal-400 to-cyan-500',
  topicSlug: 'backtrack',
  readTime: '16 min',
  sections: [
    {
      type: 'text',
      content: `Backtracking is the most important pattern to understand before trying to "optimize" it. It's brute force exploration of a decision tree where you build a solution incrementally, and when a partial solution can't possibly lead to a valid complete solution, you prune that branch early and backtrack. The universal template is the same for almost every backtracking problem — only the pruning condition and what constitutes a "valid complete solution" changes.`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'The Universal Template',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Universal backtracking template',
      code: `const result = [];

const backtrack = (start, current) => {
    // Base case: is this a valid complete solution?
    if (isComplete(current)) {
        result.push([...current]);  // ALWAYS push a copy, not a reference
        return;
    }

    for (let i = start; i < choices.length; i++) {
        // Pruning: skip this choice if it can't lead to valid solution
        if (!isValid(current, choices[i])) continue;

        current.push(choices[i]);           // Choose
        backtrack(i + 1, current);          // Explore (i+1 to avoid reuse)
        // or backtrack(i, current)         // if reuse allowed (unbounded)
        current.pop();                      // Unchoose (backtrack)
    }
};

backtrack(0, []);
return result;`,
    },
    {
      type: 'callout',
      icon: '⚠️',
      color: 'amber',
      content: `**Always push a copy**: \`result.push([...current])\` not \`result.push(current)\`. Since current is mutated throughout, if you push a reference you'll end up with all result entries pointing to the same (empty) array when the recursion completes.`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'The Three Variants',
    },
    {
      type: 'table',
      headers: ['Problem Type', 'Loop Start', 'Avoid Duplicates?'],
      rows: [
        ['Permutations (order matters)', 'Always 0, use used[] or swap', 'used[] to skip already-chosen indices'],
        ['Combinations (order doesn\'t matter)', 'start = i+1 each level', 'Sort + skip same value at same level'],
        ['Subsets', 'start = i+1 each level', 'Sort + skip same at same level for subset II'],
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
      title: 'Permutations',
      url: 'https://leetcode.com/problems/permutations/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Use a used[] array to track what\'s in current path',
          explanation: `For permutations, at each recursive call we can choose ANY element we haven't used yet (unlike combinations where we only move forward). So the loop always starts at 0, but we skip elements already in the current permutation using a visited array.`,
          code: `var permute = function(nums) {
    const result = [];
    const used = new Array(nums.length).fill(false);

    const backtrack = (current) => {
        if (current.length === nums.length) {
            result.push([...current]);
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            used[i] = true;
            current.push(nums[i]);
            backtrack(current);
            current.pop();
            used[i] = false;
        }
    };
    backtrack([]);
    return result;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Combination Sum (unlimited reuse)',
      url: 'https://leetcode.com/problems/combination-sum/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Same start index to allow reuse',
          explanation: `Each number can be reused unlimited times. Trick: pass the SAME i (not i+1) when recursing, allowing reuse. Prune when remaining sum < 0. Base case: remaining === 0.`,
          code: `var combinationSum = function(candidates, target) {
    const result = [];
    const backtrack = (start, current, remaining) => {
        if (remaining === 0) { result.push([...current]); return; }
        if (remaining < 0) return;
        for (let i = start; i < candidates.length; i++) {
            current.push(candidates[i]);
            backtrack(i, current, remaining - candidates[i]);  // i not i+1 → reuse
            current.pop();
        }
    };
    backtrack(0, [], target);
    return result;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Combination Sum II (no reuse, no duplicate results)',
      url: 'https://leetcode.com/problems/combination-sum-ii/',
      difficulty: 'Medium',
      note: 'Sort first. Skip same value at the same recursion level.',
      intuitions: [
        {
          label: 'Intuition 1: Sort + skip duplicate at same depth',
          explanation: `If candidates has duplicates, we'll generate duplicate combinations. Fix: sort the array. In the loop, if candidates[i] === candidates[i-1] AND i > start (meaning we're not at the beginning of this level), skip — we already explored that value at this depth. Use i+1 (not i) when recursing to prevent reuse.`,
          code: `var combinationSum2 = function(candidates, target) {
    candidates.sort((a, b) => a - b);
    const result = [];
    const backtrack = (start, current, remaining) => {
        if (remaining === 0) { result.push([...current]); return; }
        for (let i = start; i < candidates.length; i++) {
            if (candidates[i] > remaining) break;  // sorted, no point continuing
            if (i > start && candidates[i] === candidates[i-1]) continue;  // skip dup
            current.push(candidates[i]);
            backtrack(i + 1, current, remaining - candidates[i]);
            current.pop();
        }
    };
    backtrack(0, [], target);
    return result;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'N-Queens',
      url: 'https://leetcode.com/problems/n-queens/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Place one queen per row, track column + diagonal conflicts',
          explanation: `Place queens one row at a time. For each row, try each column. A column is invalid if:\n1. Same column already used (cols set)\n2. Same main diagonal (row - col) already used — this value is constant along a diagonal\n3. Same anti-diagonal (row + col) already used — this value is constant along an anti-diagonal\n\nIf none blocked, place and recurse. When all n rows filled, save solution.`,
          code: `var solveNQueens = function(n) {
    const result = [];
    const cols = new Set(), diag1 = new Set(), diag2 = new Set();
    const board = Array.from({length: n}, () => new Array(n).fill('.'));

    const backtrack = (row) => {
        if (row === n) {
            result.push(board.map(r => r.join('')));
            return;
        }
        for (let col = 0; col < n; col++) {
            if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) continue;
            board[row][col] = 'Q';
            cols.add(col); diag1.add(row - col); diag2.add(row + col);
            backtrack(row + 1);
            board[row][col] = '.';
            cols.delete(col); diag1.delete(row - col); diag2.delete(row + col);
        }
    };
    backtrack(0);
    return result;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'variation',
      title: 'Same Template, Different Pruning',
      baseCode: `const backtrack = (start, current) => {
    if (isComplete(current)) { result.push([...current]); return; }
    for (let i = start; i < n; i++) {
        if (/* PRUNING */ canSkip(i, current)) continue;  // ← just change this
        current.push(nums[i]);
        backtrack(/* NEXT START */, current);              // ← and this
        current.pop();
    }
};`,
      variants: [
        {
          problem: 'Subsets',
          url: 'https://leetcode.com/problems/subsets/',
          change: 'No pruning. isComplete = always true (push on every call). next start = i+1.',
          why: 'Every node in the decision tree is a valid subset',
        },
        {
          problem: 'Word Search',
          url: 'https://leetcode.com/problems/word-search/',
          change: 'Pruning = out of bounds OR visited OR wrong char. No "start" — 4-directional DFS on grid.',
          why: 'Grid backtracking: mark visited, explore 4 directions, unmark on backtrack',
        },
        {
          problem: 'Palindrome Partitioning',
          url: 'https://leetcode.com/problems/palindrome-partitioning/',
          change: 'Pruning = substring s[start..i] is not palindrome. isComplete = start === s.length.',
          why: 'Same combination template, different validity check',
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
      num: 5,
      title: 'Subsets',
      url: 'https://leetcode.com/problems/subsets/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Every call is a valid result — collect on every node',
          explanation: `Unlike combinations where we collect only at leaves (target reached), for subsets every partial state is a valid result. So push current at the start of each call before looping. Use start index to avoid going backward (no duplicates).`,
          code: `var subsets = function(nums) {
    const result = [];
    const backtrack = (start, current) => {
        result.push([...current]);  // every node = valid subset
        for (let i = start; i < nums.length; i++) {
            current.push(nums[i]);
            backtrack(i + 1, current);
            current.pop();
        }
    };
    backtrack(0, []);
    return result;
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Bit manipulation — each subset = a bitmask',
          explanation: `n elements → 2^n subsets. Iterate all 2^n bitmasks. For mask i, bit j set = include nums[j]. Clean O(n·2^n) iterative solution.`,
          code: `var subsets = function(nums) {
    const n = nums.length, result = [];
    for (let mask = 0; mask < (1 << n); mask++) {
        const sub = [];
        for (let j = 0; j < n; j++)
            if (mask >> j & 1) sub.push(nums[j]);
        result.push(sub);
    }
    return result;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 6,
      title: 'Subsets II (contains duplicates)',
      url: 'https://leetcode.com/problems/subsets-ii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Sort + skip same value at same recursion level',
          explanation: `Same as Subsets but with duplicate elements → duplicate subsets. Fix: sort, then in the loop skip candidates[i] if it equals candidates[i-1] AND i > start (meaning we're at the same recursion depth, not first pick).`,
          code: `var subsetsWithDup = function(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    const backtrack = (start, current) => {
        result.push([...current]);
        for (let i = start; i < nums.length; i++) {
            if (i > start && nums[i] === nums[i-1]) continue;  // skip dup at same level
            current.push(nums[i]);
            backtrack(i + 1, current);
            current.pop();
        }
    };
    backtrack(0, []);
    return result;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 7,
      title: 'Word Search',
      url: 'https://leetcode.com/problems/word-search/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DFS from each cell, mark visited in-place',
          explanation: `For each cell matching word[0], do DFS. At each step, check bounds + visited + correct character. Mark cell as visited by temporarily mutating (set to '#'), then restore on backtrack. This avoids a separate visited array.`,
          code: `var exist = function(board, word) {
    const m = board.length, n = board[0].length;
    const dfs = (r, c, idx) => {
        if (idx === word.length) return true;
        if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== word[idx]) return false;
        const tmp = board[r][c];
        board[r][c] = '#';  // mark visited
        const found = dfs(r+1,c,idx+1) || dfs(r-1,c,idx+1) || dfs(r,c+1,idx+1) || dfs(r,c-1,idx+1);
        board[r][c] = tmp;  // restore (backtrack)
        return found;
    };
    for (let r = 0; r < m; r++)
        for (let c = 0; c < n; c++)
            if (dfs(r, c, 0)) return true;
    return false;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 8,
      title: 'Palindrome Partitioning',
      url: 'https://leetcode.com/problems/palindrome-partitioning/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Backtrack with isPalindrome check as pruning',
          explanation: `At each position, try every possible end index for the next substring. If s[start..i] is a palindrome, take it and recurse from i+1. If start reaches end of string, we have a complete valid partition. The pruning: skip any substring that isn't a palindrome.`,
          code: `var partition = function(s) {
    const result = [];
    const isPalin = (l, r) => {
        while (l < r) if (s[l++] !== s[r--]) return false;
        return true;
    };
    const backtrack = (start, current) => {
        if (start === s.length) { result.push([...current]); return; }
        for (let end = start; end < s.length; end++) {
            if (!isPalin(start, end)) continue;  // pruning: skip non-palindromes
            current.push(s.slice(start, end + 1));
            backtrack(end + 1, current);
            current.pop();
        }
    };
    backtrack(0, []);
    return result;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 9,
      title: 'Sudoku Solver',
      url: 'https://leetcode.com/problems/sudoku-solver/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Fill empty cells one by one, check 3 constraints',
          explanation: `Find next empty cell. Try digits 1-9. Valid if digit not in: same row, same column, same 3x3 box. If valid, place and recurse. If recursion returns true, done. If all 9 digits fail, backtrack (set cell back to '.'). 3x3 box index = Math.floor(r/3)*3 + Math.floor(c/3).`,
          code: `var solveSudoku = function(board) {
    const isValid = (r, c, ch) => {
        const box = Math.floor(r/3)*3 + Math.floor(c/3);
        for (let i = 0; i < 9; i++) {
            if (board[r][i] === ch) return false;          // row
            if (board[i][c] === ch) return false;          // col
            const br = Math.floor(box/3)*3 + Math.floor(i/3);
            const bc = (box%3)*3 + (i%3);
            if (board[br][bc] === ch) return false;        // box
        }
        return true;
    };
    const solve = () => {
        for (let r = 0; r < 9; r++)
            for (let c = 0; c < 9; c++) {
                if (board[r][c] !== '.') continue;
                for (let d = 1; d <= 9; d++) {
                    const ch = String(d);
                    if (!isValid(r, c, ch)) continue;
                    board[r][c] = ch;
                    if (solve()) return true;
                    board[r][c] = '.';
                }
                return false;  // no digit worked → backtrack
            }
        return true;  // all cells filled
    };
    solve();
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 10,
      title: 'Letter Combinations of a Phone Number',
      url: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Backtrack through digits, pick letter at each level',
          explanation: `Classic backtracking on a fixed-depth decision tree. At level i (processing digit i), try every letter mapped to that digit. When current.length === digits.length, we have a complete combination. No pruning needed — all paths are valid.`,
          code: `var letterCombinations = function(digits) {
    if (!digits.length) return [];
    const map = {'2':'abc','3':'def','4':'ghi','5':'jkl','6':'mno','7':'pqrs','8':'tuv','9':'wxyz'};
    const result = [];
    const backtrack = (idx, current) => {
        if (idx === digits.length) { result.push(current.join('')); return; }
        for (const ch of map[digits[idx]]) {
            current.push(ch);
            backtrack(idx + 1, current);
            current.pop();
        }
    };
    backtrack(0, []);
    return result;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧠',
      color: 'green',
      content: `**Backtracking pruning cheat sheet:**\n- **Combinations**: sort first, then \`if (i > start && nums[i] === nums[i-1]) continue\` to skip dups\n- **Permutations with dups**: sort first, then \`if (i > 0 && nums[i] === nums[i-1] && !used[i-1]) continue\`\n- **Combination sum**: \`if (candidates[i] > remaining) break\` (sorted input)\n- **N-Queens**: 3 sets (col, diag1, diag2) for O(1) conflict check\n- **Grid DFS**: mutate board in place (set to '#') instead of a visited array\n- **Palindrome partition**: precompute isPalin[i][j] DP to make pruning O(1)`,
    },
  ],
}
