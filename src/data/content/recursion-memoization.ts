import type { Article } from '../articles'

export const recursionMemoizationArticle: Article = {
  slug: 'recursion-memoization',
  title: 'Recursion & Memoization',
  emoji: '🔁',
  tagline: 'Top-down DP. Cache the result of each subproblem. Never recompute.',
  description: 'Memoization converts exponential recursion to polynomial DP by caching results. It\'s "top-down DP" — write the recursive solution first, then add a cache. Learn when memoization is applicable, how to choose the cache key, handle cycles, and when to prefer bottom-up DP instead.',
  gradient: 'from-blue-500 to-cyan-600',
  topicSlug: 'dp',
  readTime: '16 min',
  sections: [
    {
      type: 'text',
      content: `Memoization is the simplest way to add DP to a recursive solution. Write the brute-force recursion first, identify what arguments uniquely determine the output, use those as the cache key, and add a lookup at the start. The only requirement: the function must be pure (no side effects — same inputs always produce same output).`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'The Memoization Template',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Converting brute-force recursion to memoized DP',
      code: `// STEP 1: Write brute-force recursion
function fibSlow(n) {
    if (n <= 1) return n;
    return fibSlow(n-1) + fibSlow(n-2); // O(2^n)
}

// STEP 2: Add a memo map (or object)
function fibMemo(n, memo = new Map()) {
    if (n <= 1) return n;
    if (memo.has(n)) return memo.get(n); // cache hit
    const result = fibMemo(n-1, memo) + fibMemo(n-2, memo);
    memo.set(n, result); // cache miss: compute and store
    return result;
}
// Now O(n) — each unique n computed exactly once

// STEP 3 (optional): Convert to bottom-up DP
function fibDP(n) {
    if (n <= 1) return n;
    let prev = 0, curr = 1;
    for (let i = 2; i <= n; i++) [prev, curr] = [curr, prev + curr];
    return curr;
}

// Top-down (memoization): natural recursion order, only compute needed subproblems
// Bottom-up (tabulation): explicit fill order, typically slightly faster (no call stack)`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Choosing the Cache Key',
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'teal',
      content: `**Cache key = all parameters that affect the output.**\n\nIf your function is \`dfs(node, remaining, visited)\`:\n- node + remaining → key (if visited can be derived)\n- node + remaining + JSON.stringify(visited) → key (if visited must be tracked)\n\n**Warning**: Large or complex keys make caching slow. For bitmask states, the mask IS the key. For string states, stringify carefully.\n\n**The cache key determines complexity**: O(unique states × work per state).`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Climbing Stairs',
      url: 'https://leetcode.com/problems/climbing-stairs/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Recursion → memoization → DP',
          explanation: `To reach step n: come from n-1 (took 1 step) or n-2 (took 2 steps). f(n) = f(n-1) + f(n-2). Brute force O(2^n), with memoization O(n).`,
          code: `// Memoized recursion
var climbStairs = function(n, memo={}) {
    if(n<=2) return n;
    if(memo[n]) return memo[n];
    return memo[n]=climbStairs(n-1,memo)+climbStairs(n-2,memo);
};

// Bottom-up DP (same recurrence, more efficient)
var climbStairs = function(n) {
    if(n<=2) return n;
    let a=1,b=2;
    for(let i=3;i<=n;i++) [a,b]=[b,a+b];
    return b;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Word Break (memoized DFS)',
      url: 'https://leetcode.com/problems/word-break/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Memoize on start position',
          explanation: `dfs(start) = can we break s[start..end] using wordDict? Try every word starting at 'start'. If word matches, recurse on the rest. Memoize: cache[start] = can we segment from this position. Each position computed once → O(n² × m) where n=len, m=avg word length.`,
          code: `var wordBreak = function(s, wordDict) {
    const words=new Set(wordDict);
    const memo=new Map();
    const dfs=(start)=>{
        if(start===s.length) return true;
        if(memo.has(start)) return memo.get(start);
        for(let end=start+1;end<=s.length;end++){
            if(words.has(s.slice(start,end))&&dfs(end)){
                memo.set(start,true); return true;
            }
        }
        memo.set(start,false); return false;
    };
    return dfs(0);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Decode Ways',
      url: 'https://leetcode.com/problems/decode-ways/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Memoized recursion on index',
          explanation: `dfs(i) = ways to decode s[i..end]. At each position, try 1-char decode (if s[i] != '0') and 2-char decode (if s[i..i+1] is valid 10-26). Memoize on index i.`,
          code: `var numDecodings = function(s) {
    const memo=new Map();
    const dfs=(i)=>{
        if(i===s.length) return 1;
        if(s[i]==='0') return 0;
        if(memo.has(i)) return memo.get(i);
        let ways=dfs(i+1); // 1-char decode
        if(i+1<s.length){
            const two=parseInt(s.slice(i,i+2));
            if(two>=10&&two<=26) ways+=dfs(i+2); // 2-char decode
        }
        memo.set(i,ways);
        return ways;
    };
    return dfs(0);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Minimum Cost to Cut a Stick',
      url: 'https://leetcode.com/problems/minimum-cost-to-cut-a-stick/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Interval DP with memoization',
          explanation: `Add 0 and n as sentinel cuts. dfs(l, r) = min cost to make all cuts between positions cuts[l] and cuts[r]. Try each cut k between l and r as the "first cut" in this segment. Cost = cuts[r]-cuts[l] + dfs(l,k) + dfs(k,r). Memoize on (l,r).`,
          code: `var minCost = function(n, cuts) {
    cuts = [0, ...cuts.sort((a,b)=>a-b), n];
    const m=cuts.length;
    const memo=new Map();
    const dfs=(l,r)=>{
        if(r-l===1) return 0; // no cuts possible
        const key=l+','+r;
        if(memo.has(key)) return memo.get(key);
        let min=Infinity;
        for(let k=l+1;k<r;k++)
            min=Math.min(min, cuts[r]-cuts[l]+dfs(l,k)+dfs(k,r));
        memo.set(key,min);
        return min;
    };
    return dfs(0,m-1);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Cherry Pickup (single pass, go and return)',
      url: 'https://leetcode.com/problems/cherry-pickup/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Two simultaneous paths from (0,0) to (n-1,n-1)',
          explanation: `One path forward + one path backward = two paths from (0,0) to (n-1,n-1) simultaneously. 3D state: dp[r1][c1][c2] where r2=r1+c1-c2 (both have same total steps). Memoize on (r1, c1, c2).`,
          code: `var cherryPickup = function(grid) {
    const n=grid.length;
    const memo=new Array(n).fill(0).map(()=>new Array(n).fill(0).map(()=>new Array(n).fill(-Infinity)));
    const dfs=(r1,c1,c2)=>{
        const r2=r1+c1-c2;
        if(r1>=n||c1>=n||r2>=n||c2>=n||grid[r1][c1]===-1||grid[r2][c2]===-1) return -Infinity;
        if(r1===n-1&&c1===n-1) return grid[n-1][n-1];
        if(memo[r1][c1][c2]!==-Infinity) return memo[r1][c1][c2];
        let cherries=grid[r1][c1]+(c1!==c2?grid[r2][c2]:0);
        const best=Math.max(
            dfs(r1+1,c1,c2), dfs(r1+1,c1,c2+1),
            dfs(r1,c1+1,c2), dfs(r1,c1+1,c2+1)
        );
        if(best===-Infinity){memo[r1][c1][c2]=-Infinity;return -Infinity;}
        memo[r1][c1][c2]=cherries+best;
        return memo[r1][c1][c2];
    };
    return Math.max(0,dfs(0,0,0));
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧠',
      color: 'blue',
      content: `**Memoization vs bottom-up DP:**\n- **Memoization (top-down)**: write recursion first, add cache. Natural order. Only computes needed subproblems. Easy to implement. Risk: stack overflow for large n.\n- **Bottom-up (tabulation)**: fill DP table iteratively. No stack overflow. Often faster (no function call overhead). Requires knowing fill order.\n\n**When memoization is preferred:**\n- Complex dependency order (interval DP, graph DP)\n- Only a subset of states are needed\n- Problem naturally expresses as "from state A, what's the best?"\n\n**When bottom-up is preferred:**\n- All states needed (full table)\n- Simple 1D/2D fill order\n- n is very large (stack overflow risk)`,
    },
  ],
}
