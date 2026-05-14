import type { Article } from '../articles'

export const gameTheoryArticle: Article = {
  slug: 'game-theory',
  title: 'Game Theory — Nim & Sprague-Grundy',
  emoji: '♟️',
  tagline: 'XOR determines the winner. Grundy values generalize everything.',
  description: 'Combinatorial game theory solves "who wins with optimal play?" problems. Nim XOR theorem, Sprague-Grundy values (nimbers), and Grundy value computation via memoization handle almost every game problem in CP.',
  gradient: 'from-slate-400 to-gray-500',
  topicSlug: 'game_theory',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `Combinatorial game theory analyzes two-player zero-sum games where players alternate moves and the last to move wins (normal play convention). The breakthrough insight: any position's winning/losing status can be computed by XOR of "Grundy values." Once you can compute Grundy values, you can solve arbitrary game combinations.`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Nim Game — The Foundation',
    },
    {
      type: 'callout',
      icon: '🔑',
      color: 'teal',
      content: `**Nim theorem (Sprague-Grundy for Nim)**: Given piles of stones [n1, n2, ..., nk], the current player LOSES if and only if XOR(n1, n2, ..., nk) === 0.\n\nIf XOR ≠ 0, current player can always move to XOR = 0 (winning position for opponent becomes losing). If XOR = 0, every move creates XOR ≠ 0 (opponent now wins).`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Nim winner',
      code: `function nimWinner(piles) {
    // XOR all pile sizes
    // 0 → current player loses (all moves put opponent in winning position)
    // non-zero → current player wins
    return piles.reduce((xor, p) => xor ^ p, 0) !== 0;
}`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Sprague-Grundy Theorem',
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'blue',
      content: `**Grundy value (nimber) G(position)**:\n- G = 0: LOSING position (previous player wins, i.e., you lose)\n- G > 0: WINNING position\n\nG(pos) = mex({G(next) : next ∈ moves(pos)})\nwhere mex = minimum excludant = smallest non-negative integer NOT in the set.\n\n**For combined games**: G(game1 + game2) = G(game1) XOR G(game2).`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Sprague-Grundy values with memoization',
      code: `function computeGrundy(n, moves) {
    const memo = new Map();
    function grundy(pos) {
        if (memo.has(pos)) return memo.get(pos);
        const reachable = new Set();
        for (const move of moves) {
            if (pos - move >= 0) reachable.add(grundy(pos - move));
        }
        // mex: find smallest non-negative integer not in reachable
        let mex = 0;
        while (reachable.has(mex)) mex++;
        memo.set(pos, mex);
        return mex;
    }
    return grundy(n);
}

// Example: game where you can take 1, 2, or 3 stones
// grundy(0)=0 (lose), grundy(1)=1, grundy(2)=2, grundy(3)=3, grundy(4)=0 (pattern!)
// Pattern: Grundy(n) = n % 4 for moves {1,2,3}`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Nim Game',
      url: 'https://leetcode.com/problems/nim-game/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Win if n % 4 ≠ 0',
          explanation: `With moves {1,2,3}: Grundy pattern is n % 4. If n % 4 = 0, current player loses. This is because whatever you take (1,2,3), opponent takes 4-that to reach next multiple of 4.`,
          code: `var canWinNim = function(n) { return n % 4 !== 0; };`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Stone Game',
      url: 'https://leetcode.com/problems/stone-game/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Math — first player always wins',
          explanation: `With an even number of piles, first player always wins (can pick all even-indexed or all odd-indexed piles, whichever sums higher). So always return true.`,
          code: `var stoneGame = function(piles) { return true; };`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: General DP for arbitrary stone games',
          explanation: `dp[i][j] = max score difference (current_player - other_player) for piles[i..j]. If current player picks piles[i]: dp[i][j] = piles[i] - dp[i+1][j]. If picks piles[j]: dp[i][j] = piles[j] - dp[i][j-1]. Take max. Base: dp[i][i] = piles[i].`,
          code: `var stoneGame = function(piles) {
    const n = piles.length;
    const dp = Array.from({length: n}, (_, i) => [...piles]); // dp[i][i] = piles[i]
    for (let len = 2; len <= n; len++)
        for (let i = 0; i <= n - len; i++) {
            const j = i + len - 1;
            dp[i][j] = Math.max(piles[i] - dp[i+1][j], piles[j] - dp[i][j-1]);
        }
    return dp[0][n-1] > 0;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Flip Game II',
      url: 'https://leetcode.com/problems/flip-game-ii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Backtracking with memoization',
          explanation: `Flip any "++" to "--". Current player wins if any move leads to opponent losing. Use memoization on the board state string.`,
          code: `var canWin = function(currentState) {
    const memo = new Map();
    function wins(s) {
        if (memo.has(s)) return memo.get(s);
        for (let i = 0; i < s.length - 1; i++) {
            if (s[i] === '+' && s[i+1] === '+') {
                const next = s.slice(0, i) + '--' + s.slice(i+2);
                if (!wins(next)) { memo.set(s, true); return true; }
            }
        }
        memo.set(s, false);
        return false;
    }
    return wins(currentState);
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
      title: 'Stone Game VII',
      url: 'https://leetcode.com/problems/stone-game-vii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Minimax DP — dp[i][j] = max score diff for piles[i..j]',
          explanation: 'Alice removes a stone from either end. She earns the sum of REMAINING stones. Bob wants to minimize Alice\'s net advantage. dp[i][j] = max advantage for current player on piles[i..j]. When player picks left: earns sum(i+1..j), but opponent plays optimally on (i+1..j).',
          code: `var stoneGameVII = function(stones) {
    const n=stones.length;
    const prefix=[0,...stones.reduce((a,x,i)=>[...a,a[i]+x],[0])];
    const rangeSum=(i,j)=>prefix[j+1]-prefix[i];
    const dp=Array.from({length:n},()=>new Array(n).fill(0));
    for(let len=2;len<=n;len++)
        for(let i=0;i<=n-len;i++){
            const j=i+len-1;
            dp[i][j]=Math.max(
                rangeSum(i+1,j)-dp[i+1][j], // pick left (earn sum without left)
                rangeSum(i,j-1)-dp[i][j-1]  // pick right (earn sum without right)
            );
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
      title: 'Predict the Winner',
      url: 'https://leetcode.com/problems/predict-the-winner/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Minimax DP — score difference',
          explanation: 'dp[i][j] = score difference (current player - other) on nums[i..j]. If picks nums[i]: nums[i] - dp[i+1][j] (other player now has advantage). If picks nums[j]: nums[j] - dp[i][j-1].',
          code: `var predictTheWinner = function(nums) {
    const n=nums.length;
    const dp=Array.from({length:n},(_,i)=>[...nums]); // dp[i][i]=nums[i]
    for(let len=2;len<=n;len++)
        for(let i=0;i<=n-len;i++){
            const j=i+len-1;
            dp[i][j]=Math.max(nums[i]-dp[i+1][j], nums[j]-dp[i][j-1]);
        }
    return dp[0][n-1]>=0;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'green',
      content: `**Pattern recognition for game problems:**\n- "Take 1..k stones from pile" → Nim / Sprague-Grundy\n- "Last player to move wins" → normal play convention, compute Grundy\n- "Multiple independent games simultaneously" → XOR of Grundy values\n- "Optimal play both sides" → usually minimax DP or Grundy\n- "Score difference for current player" → dp[i][j] = score_diff on range [i..j]`,
    },
  ],
}
