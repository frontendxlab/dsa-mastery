import type { Article } from '../articles'

export const catalanNumbersArticle: Article = {
  slug: 'catalan-numbers',
  title: 'Catalan Numbers',
  emoji: '🌀',
  tagline: 'C(n) counts balanced parentheses, BST shapes, polygon triangulations, and more.',
  description: 'Catalan numbers Cₙ = C(2n,n)/(n+1) count many combinatorial structures: valid parenthesizations of n+1 factors, binary trees with n+1 leaves, triangulations of (n+2)-gon, non-crossing partitions, monotone paths below diagonal. Recurrence: Cₙ = Σ Cᵢ × Cₙ₋₁₋ᵢ. Appear in DP problems where you split into two independent subproblems.',
  gradient: 'from-fuchsia-600 to-violet-700',
  topicSlug: 'math',
  readTime: '13 min',
  sections: [
    {
      type: 'text',
      content: `Catalan numbers: C₀=1, C₁=1, C₂=2, C₃=5, C₄=14, C₅=42, ... Formula: Cₙ = C(2n,n)/(n+1). The key recurrence: Cₙ = Σᵢ₌₀ⁿ⁻¹ Cᵢ × Cₙ₋₁₋ᵢ (split any Catalan structure at its "root"). This recurrence appears in DP for: number of valid BSTs with n nodes, number of full binary trees, number of ways to triangulate a polygon, and many others.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Catalan number computation',
      code: `// Method 1: DP recurrence — O(n²)
function catalanDP(n) {
    const C = new Array(n + 1).fill(0);
    C[0] = C[1] = 1;
    for (let i = 2; i <= n; i++)
        for (let j = 0; j < i; j++)
            C[i] += C[j] * C[i - 1 - j];
    return C[n];
}

// Method 2: Binomial coefficient formula — O(n)
function catalan(n) {
    // C(n) = C(2n, n) / (n + 1)
    let result = 1;
    for (let i = 0; i < n; i++) {
        result = result * (2 * n - i) / (i + 1);
    }
    return Math.round(result / (n + 1));
}

// Method 3: Recurrence C(n) = C(n-1) * 2*(2n-1) / (n+1)
function catalanSeq(maxN) {
    const C = [1n];
    for (let n = 1; n <= maxN; n++)
        C.push(C[n-1] * BigInt(2*(2*n-1)) / BigInt(n+1));
    return C;
}

// Common Catalan appearances:
// - Valid parenthesizations of n+1 factors: C(n)
// - Binary trees with n nodes: C(n)
// - Non-decreasing paths from (0,0) to (n,n) not crossing diagonal: C(n)
// - Ways to triangulate (n+2)-gon: C(n)`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Unique Binary Search Trees',
      url: 'https://leetcode.com/problems/unique-binary-search-trees/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Catalan number — G(n) = Σ G(i-1)*G(n-i)',
          explanation: `Number of structurally unique BSTs with nodes 1..n. Pick root k (1..n): left subtree has k-1 nodes, right has n-k nodes. G(n) = Σᵢ G(i-1) × G(n-i). This is the Catalan recurrence. G(0)=1 (empty tree), G(1)=1. Answer = G(n) = Cₙ₋₁.`,
          code: `var numTrees = function(n) {
    const dp=new Array(n+1).fill(0); dp[0]=dp[1]=1;
    for(let i=2;i<=n;i++)
        for(let j=1;j<=i;j++) dp[i]+=dp[j-1]*dp[i-j];
    return dp[n];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Generate Parentheses (count only)',
      url: 'https://leetcode.com/problems/generate-parentheses/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Count = Catalan number C(n)',
          explanation: `Number of valid parenthesizations with n pairs = C(n) = Catalan number. C(1)=1, C(2)=2, C(3)=5, C(4)=14...`,
          code: `// Count only (not generate)
// numParentheses(n) = C(n) = (2n choose n) / (n+1)
// e.g., n=3: C(3) = 5 (the 5 valid strings)
function numParentheses(n) {
    // Use Catalan DP
    const C=new Array(n+1).fill(0); C[0]=C[1]=1;
    for(let i=2;i<=n;i++) for(let j=0;j<i;j++) C[i]+=C[j]*C[i-1-j];
    return C[n];
}`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Count Ways to Build Rooms in an Ant Colony',
      url: 'https://leetcode.com/problems/count-ways-to-build-rooms-in-an-ant-colony/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Tree DP with multinomial coefficients',
          explanation: `Each node's children can be interleaved in any order respecting their subtree ordering. For node u with children c₁...cₖ and subtree sizes s₁...sₖ: ways = (s₁+s₂+...+sₖ choose s₁,s₂,...,sₖ) × Π ways(cᵢ). Use modular arithmetic with precomputed factorials.`,
          code: `var waysToBuildRooms = function(prevRoom) {
    const MOD=1n<<31n-1n, // wrong — use 10^9+7
    MODN=BigInt(1e9+7), n=prevRoom.length;
    const fact=new Array(n+1), inv=new Array(n+1);
    fact[0]=fact[1]=1n;
    for(let i=2;i<=n;i++) fact[i]=fact[i-1]*BigInt(i)%MODN;
    const pow=(b,e,m)=>{let r=1n;b%=m;while(e){if(e&1n)r=r*b%m;b=b*b%m;e>>=1n;}return r;};
    inv[n]=pow(fact[n],MODN-2n,MODN);
    for(let i=n-1;i>=0;i--) inv[i]=inv[i+1]*BigInt(i+1)%MODN;
    const adj=Array.from({length:n},()=>[]);
    for(let i=1;i<n;i++) adj[prevRoom[i]].push(i);
    const sz=new Array(n).fill(1);
    const ans=new Array(n).fill(1n);
    const order=[]; const vis=new Array(n).fill(false);
    // Topological order via BFS
    const inDeg=new Array(n).fill(0);
    for(let i=1;i<n;i++) inDeg[prevRoom[i]]++;
    const q=[]; for(let i=0;i<n;i++) if(!inDeg[i]) q.push(i);
    let qi=0;
    while(qi<q.length){const u=q[qi++];order.push(u);for(const v of adj[u]) if(--inDeg[v]===0) q.push(v);}
    for(let i=order.length-1;i>=0;i--){
        const u=order[i];
        for(const v of adj[u]){
            ans[u]=ans[u]*ans[v]%MODN*inv[sz[v]]%MODN;
            sz[u]+=sz[v];
        }
        ans[u]=ans[u]*fact[sz[u]-1]%MODN;
    }
    return Number(ans[0]);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Number of Ways to Reorder Array to Get Same BST',
      url: 'https://leetcode.com/problems/number-of-ways-to-reorder-array-to-get-same-bst/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Recursive BST structure — interleave left/right subtrees',
          explanation: `Root is always nums[0]. Left subtree = elements < root, right = elements > root. Number of orderings = C(|left|+|right|, |left|) × ways(left) × ways(right). The binomial coefficient counts how to interleave left and right elements while preserving their relative orders.`,
          code: `var numOfWays = function(nums) {
    const MOD=BigInt(1e9+7), n=nums.length;
    const fact=new Array(n+1); fact[0]=1n;
    for(let i=1;i<=n;i++) fact[i]=fact[i-1]*BigInt(i)%MOD;
    const pow=(b,e)=>{let r=1n;b%=MOD;while(e){if(e&1n)r=r*b%MOD;b=b*b%MOD;e>>=1n;}return r;};
    const comb=(n,k)=>n<k?0n:fact[n]*pow(fact[k],MOD-2n)%MOD*pow(fact[n-k],MOD-2n)%MOD;
    const count=(arr)=>{
        if(arr.length<=1) return 1n;
        const root=arr[0];
        const left=arr.filter(x=>x<root), right=arr.filter(x=>x>root);
        return comb(left.length+right.length,left.length)*count(left)%MOD*count(right)%MOD;
    };
    return Number((count(nums)-1n+MOD)%MOD);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🌀',
      color: 'blue',
      content: `**Catalan number appearances:**\n- n pairs of balanced parentheses: C(n)\n- Binary trees with n+1 leaves: C(n)\n- Triangulations of (n+2)-gon: C(n)\n- Monotone paths from (0,0) to (n,n) not crossing y=x: C(n)\n- Stack-sortable permutations of 1..n: C(n)\n\n**Recognition tip:** If your DP recurrence looks like dp[n] = Σᵢ dp[i] × dp[n-1-i], you're computing Catalan numbers.\n\n**Key formula:** Cₙ = C(2n,n) / (n+1). First few: 1, 1, 2, 5, 14, 42, 132, 429, 1430...`,
    },
  ],
}
