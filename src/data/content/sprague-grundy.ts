import type { Article } from '../articles'

export const spragueGrundyArticle: Article = {
  slug: 'sprague-grundy',
  title: 'Sprague-Grundy Theorem',
  emoji: '♟️',
  tagline: 'Every impartial game = Nim pile. Grundy value = mex of reachable states.',
  description: 'The Sprague-Grundy theorem states every impartial game (players have same moves, last to move wins) is equivalent to a single Nim pile of a certain size (the Grundy value / nimber). Compute G(state) = mex{G(next states)} (minimum excludant = smallest non-negative integer not in the set). Combined games: XOR all Grundy values. If XOR ≠ 0, first player wins.',
  gradient: 'from-slate-700 to-zinc-800',
  topicSlug: 'math',
  readTime: '15 min',
  sections: [
    {
      type: 'text',
      content: `Grundy value (nimber) of a position = mex of Grundy values of all positions reachable in one move. mex = minimum excludant = smallest non-negative integer not in the set {0, 1, 2} → mex = 3; {0, 2} → mex = 1. A position is a losing position (P-position) iff its Grundy value is 0. Combined games (play multiple independent games, choose one to move in): XOR all Grundy values — non-zero means first player wins.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Grundy value computation',
      code: `// Compute Grundy values for all states via memoization
function grundy(state, getNextStates, memo = new Map()) {
    if (memo.has(state)) return memo.get(state);
    const nextGrundy = new Set(getNextStates(state).map(s => grundy(s, getNextStates, memo)));
    // Compute mex: smallest non-negative integer not in nextGrundy
    let mex = 0;
    while (nextGrundy.has(mex)) mex++;
    memo.set(state, mex);
    return mex;
}

// Standard Nim: n piles of stones, can remove any amount from one pile
// G(pile of k stones) = k (take k-j stones → pile of j, G = j)
// Combined game: XOR all pile sizes. XOR ≠ 0 → first player wins

// Nim with restricted moves (can only take 1-k stones):
// G(n) = n % (k+1) — this is "subtraction game" with set {1,...,k}

// Example: Wythoff's game (two piles, can remove from one or equal from both)
// Uses golden ratio, complex Grundy values`,
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
          label: 'Intuition 1: Math pattern — lose iff n % 4 == 0',
          explanation: `If n % 4 == 0: whatever you take (1-3), opponent can take (3-1) to leave you with another multiple of 4. Eventually you face 0. Otherwise: take (n % 4) to leave opponent with multiple of 4.`,
          code: `var canWinNim = function(n) { return n%4!==0; };`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Grundy values — G(n) = n % 4',
          explanation: `G(0) = 0 (lose). G(1) = mex{G(0)} = mex{0} = 1. G(2) = mex{G(1),G(0)} = mex{1,0} = 2. G(3) = mex{G(2),G(1),G(0)} = mex{2,1,0} = 3. G(4) = mex{G(3),G(2),G(1)} = mex{3,2,1} = 0 (lose). Pattern repeats with period 4.`,
          code: `var canWinNim = function(n) {
    // G(n) = n % 4. Win iff Grundy != 0.
    return n%4!==0;
};`,
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
          label: 'Intuition 1: First player always wins (math insight)',
          explanation: `With even number of piles, first player can always choose to take all odd-indexed or all even-indexed piles. One of those sums > half the total. So first player always wins.`,
          code: `var stoneGame = function(piles) { return true; };`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: DP — interval game',
          explanation: `dp[i][j] = max score advantage (current player - other player) over piles[i..j]. If current picks piles[i]: advantage = piles[i] - dp[i+1][j]. If picks piles[j]: piles[j] - dp[i][j-1]. Win if dp[0][n-1] > 0.`,
          code: `var stoneGame = function(piles) {
    const n=piles.length;
    const dp=Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>piles[i]*(i===j?1:0)));
    for(let len=2;len<=n;len++)
        for(let i=0;i+len-1<n;i++){
            const j=i+len-1;
            dp[i][j]=Math.max(piles[i]-dp[i+1][j],piles[j]-dp[i][j-1]);
        }
    return dp[0][n-1]>0;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Stone Game III',
      url: 'https://leetcode.com/problems/stone-game-iii/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: DP — current player picks 1-3 stones from front',
          explanation: `dp[i] = max score advantage (current - other) for suffix starting at i. dp[i] = max over k∈{1,2,3} of (sum(piles[i..i+k-1]) - dp[i+k]). Win if dp[0] > 0.`,
          code: `var stoneGameIII = function(stoneValue) {
    const n=stoneValue.length;
    const dp=new Array(n+1).fill(-Infinity); dp[n]=0;
    const suf=new Array(n+1).fill(0);
    for(let i=n-1;i>=0;i--) suf[i]=suf[i+1]+stoneValue[i];
    for(let i=n-1;i>=0;i--){
        for(let k=1;k<=3&&i+k<=n;k++){
            const take=suf[i]-suf[i+k];
            dp[i]=Math.max(dp[i],take-dp[i+k]);
        }
    }
    return dp[0]>0?'Alice':dp[0]<0?'Bob':'Tie';
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Cat and Mouse',
      url: 'https://leetcode.com/problems/cat-and-mouse/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Game state BFS with color propagation',
          explanation: `State = (mouse_pos, cat_pos, turn). Color each state MOUSE_WIN, CAT_WIN, or DRAW. Base cases: mouse at 0 → mouse wins; cat = mouse → cat wins. Propagate backwards: if any move leads to a win for current player → current state is win. If all moves are losses for current player → current state is loss.`,
          code: `var catAndMouse = function(graph) {
    const n=graph.length;
    // State: (mouse, cat, turn=0 mouse/1 cat)
    // BFS from terminal states backwards
    const deg=Array.from({length:n},()=>[new Array(n).fill(0),new Array(n).fill(0)]);
    const color=Array.from({length:n},()=>Array.from({length:n},()=>[0,0]));
    // Count degrees
    for(let m=0;m<n;m++) for(let c=0;c<n;c++){
        deg[m][c][0]=graph[m].length;
        deg[m][c][1]=graph[c].filter(x=>x!==0).length; // cat can't go to hole
    }
    const MOUSE=1,CAT=2;
    const q=[];
    for(let i=0;i<n;i++) for(let t=0;t<2;t++){
        color[0][i][t]=MOUSE; q.push([0,i,t,MOUSE]);
        if(i>0){color[i][i][t]=CAT; q.push([i,i,t,CAT]);}
    }
    let qi=0;
    while(qi<q.length){
        const[m,c,t,res]=q[qi++];
        // Find parent states (previous moves that could lead here)
        const pt=1-t; // previous turn
        const parents=pt===0?graph[m].map(pm=>[pm,c]):graph[c].filter(x=>x!==0).map(pc=>[m,pc]);
        for(const[pm,pc] of parents){
            if(color[pm][pc][pt]) continue;
            if((pt===0&&res===MOUSE)||(pt===1&&res===CAT)){
                color[pm][pc][pt]=res; q.push([pm,pc,pt,res]);
            } else {
                deg[pm][pc][pt]--;
                if(!deg[pm][pc][pt]){color[pm][pc][pt]=res;q.push([pm,pc,pt,res]);}
            }
        }
    }
    return color[1][2][0]||0;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '♟️',
      color: 'gray',
      content: `**Sprague-Grundy key facts:**\n- G(state) = mex{G(reachable states)}\n- G = 0 → losing position (P-position, previous player wins)\n- G > 0 → winning position (N-position, next/current player wins)\n- Combined independent games: XOR all Grundy values\n\n**Common patterns:**\n- Nim (remove 1..k from pile of n): G(n) = n % (k+1)\n- Standard Nim (remove any): G(n) = n\n- Wythoff (two piles, equal removal): uses floor(n * φ) where φ = golden ratio\n\n**When SG doesn't apply:** Partizan games (different moves for each player) — use Combinatorial Game Theory instead.`,
    },
  ],
}
