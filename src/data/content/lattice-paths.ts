import type { Article } from '../articles'

export const latticePathsArticle: Article = {
  slug: 'lattice-paths',
  title: 'Lattice Paths & Ballot Problems',
  emoji: '📈',
  tagline: 'Count paths on a grid with constraints. Reflection principle. Catalan structures.',
  description: 'Lattice path problems count paths from (0,0) to (m,n) using unit steps right (+1,0) and up (0,+1). Total paths = C(m+n,m). With constraints (never go above y=x): Catalan numbers. Reflection principle: count invalid paths by reflecting at the constraint boundary. Applications: random walk analysis, ballot problems, parking functions, and constrained DP optimization.',
  gradient: 'from-sky-800 to-cyan-900',
  topicSlug: 'math',
  readTime: '13 min',
  sections: [
    {
      type: 'text',
      content: `Basic lattice path: (0,0) to (m,n) with only right/up steps = C(m+n, m). With constraint "never touch y=k": reflection principle counts invalid paths by reflecting the starting point across the constraint line. Lindström-Gessel-Viennot (LGV) lemma: non-intersecting paths from sources to sinks = determinant of path count matrix. Ballot problem: candidate A gets a votes, B gets b votes with a > b; probability A is always ahead = (a-b)/(a+b).`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Lattice path counting formulas',
      code: `// Count paths from (0,0) to (m,n) never going above y=x (Catalan)
// = C(m+n, m) - C(m+n, m+1) = C(m+n, m) / (m-n+1) * (m-n+1)
// = C(m+n, m) * (m-n+1) / (m+1) for m >= n

// Reflection principle: paths from A to B that touch a "bad" line
// = paths from A' (reflection of A across bad line) to B
function pathsBelowDiagonal(m, n) { // paths (0,0)→(m,n) not going above y=x
    // Requires n <= m (otherwise 0 paths)
    if (n > m) return 0;
    // = C(m+n, n) - C(m+n, n-1) using reflection
    const comb = (a, b) => {
        if (b > a || b < 0) return 0;
        let r = 1;
        for (let i = 0; i < b; i++) r = r * (a - i) / (i + 1);
        return Math.round(r);
    };
    return comb(m + n, n) - comb(m + n, n - 1);
}

// Count monotone lattice paths from (r1,c1) to (r2,c2) (r steps down, c steps right)
// Without constraint: C(r2-r1 + c2-c1, r2-r1)
// With constraint "stay below y=x": use reflection principle

// Ballot problem: P(A always strictly ahead of B | A gets a votes, B gets b)
// = (a - b) / (a + b) for a > b

// LGV lemma for non-intersecting paths: determinant of C(aᵢ→bⱼ)
function lgvDeterminant(sources, sinks, pathCount) {
    const n = sources.length;
    const mat = sources.map(s => sinks.map(t => pathCount(s, t)));
    // Compute determinant
    // For 2×2: ad - bc
    if (n === 2) return mat[0][0]*mat[1][1] - mat[0][1]*mat[1][0];
    // For general n: use standard det algorithm
    // ...
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
      title: 'Unique Paths II (with obstacles)',
      url: 'https://leetcode.com/problems/unique-paths-ii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DP with obstacle check',
          explanation: `dp[i][j] = paths to (i,j). If obstacle: 0. Else: dp[i-1][j] + dp[i][j-1]. Base case: dp[0][0] = 1 if no obstacle.`,
          code: `var uniquePathsWithObstacles = function(grid) {
    const m=grid.length,n=grid[0].length;
    const dp=Array.from({length:m},()=>new Array(n).fill(0));
    dp[0][0]=grid[0][0]?0:1;
    for(let i=1;i<m;i++) dp[i][0]=grid[i][0]?0:dp[i-1][0];
    for(let j=1;j<n;j++) dp[0][j]=grid[0][j]?0:dp[0][j-1];
    for(let i=1;i<m;i++) for(let j=1;j<n;j++)
        dp[i][j]=grid[i][j]?0:dp[i-1][j]+dp[i][j-1];
    return dp[m-1][n-1];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Number of Ways to Stay in the Same Place After Some Steps',
      url: 'https://leetcode.com/problems/number-of-ways-to-stay-in-the-same-place-after-some-steps/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: DP on (position, steps remaining)',
          explanation: `dp[pos][steps] = ways to be at pos after steps total steps and return to 0. Transitions: move left, right, or stay. Bound: position ≤ min(arrLen, steps/2).`,
          code: `var numWays = function(steps, arrLen) {
    const MOD=1e9+7;
    const maxPos=Math.min(arrLen-1,Math.floor(steps/2));
    let dp=new Array(maxPos+1).fill(0); dp[0]=1;
    for(let s=0;s<steps;s++){
        const ndp=new Array(maxPos+1).fill(0);
        for(let p=0;p<=maxPos;p++){
            if(!dp[p]) continue;
            ndp[p]=(ndp[p]+dp[p])%MOD;
            if(p>0) ndp[p-1]=(ndp[p-1]+dp[p])%MOD;
            if(p<maxPos) ndp[p+1]=(ndp[p+1]+dp[p])%MOD;
        }
        dp=ndp;
    }
    return dp[0];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Champagne Tower',
      url: 'https://leetcode.com/problems/champagne-tower/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Simulate flow down the pyramid',
          explanation: `dp[i][j] = total poured into glass (i,j). Process top to bottom. Overflow = max(0, dp[i][j]-1) splits equally between dp[i+1][j] and dp[i+1][j+1].`,
          code: `var champagneTower = function(poured, queryRow, queryGlass) {
    const dp=Array.from({length:101},()=>new Array(101).fill(0));
    dp[0][0]=poured;
    for(let i=0;i<queryRow;i++) for(let j=0;j<=i;j++){
        const over=Math.max(0,dp[i][j]-1);
        dp[i+1][j]+=over/2;
        dp[i+1][j+1]+=over/2;
    }
    return Math.min(1,dp[queryRow][queryGlass]);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '📈',
      color: 'sky',
      content: `**Key lattice path formulas:**\n- (0,0) → (m,n): C(m+n, n)\n- Never above y=x (m ≥ n): C(m+n,n) - C(m+n,n-1)\n- Catalan number Cₙ: paths (0,0)→(n,n) below y=x = Cₙ\n\n**Reflection principle:** To count paths A→B that cross a line L, reflect A across L to get A'. Count(valid paths) = Count(all A→B) - Count(A'→B).\n\n**Ballot problem:** In an election with a>b votes for A and B, the probability that A is strictly ahead throughout the count = (a-b)/(a+b). This is the same as Catalan/ballot sequence structure.`,
    },
  ],
}
