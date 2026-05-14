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
  ],
}
