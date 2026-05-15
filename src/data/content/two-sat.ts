import type { Article } from '../articles'

export const twoSatArticle: Article = {
  slug: 'two-sat',
  title: '2-SAT',
  emoji: '⚡',
  tagline: 'Solve boolean formulas with 2-literal clauses in O(V+E) via SCC.',
  description: '2-SAT solves boolean satisfiability problems where each clause has exactly 2 literals. Build an implication graph: (¬x → y) and (¬y → x) for clause (x ∨ y). A valid assignment exists iff no variable x is in the same SCC as ¬x. Find SCCs (Kosaraju/Tarjan), topological-order SCC index assigns truth values. Essential for scheduling, graph coloring, and constraint satisfaction problems.',
  gradient: 'from-yellow-600 to-orange-700',
  topicSlug: 'graph',
  readTime: '16 min',
  sections: [
    {
      type: 'text',
      content: `2-SAT encodes each clause (A ∨ B) as two implications: (¬A → B) and (¬B → A). Variable i has two nodes: i (true) and i+n (false/negated). Build directed implication graph. Find SCCs with Tarjan's or Kosaraju's. Satisfiable iff no variable i has scc[i] == scc[i+n]. Assign: if scc[i] > scc[i+n] in topological order, variable i is TRUE.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: '2-SAT with Kosaraju\'s SCC',
      code: `class TwoSAT {
    constructor(n) {
        this.n = n; // number of variables
        this.adj = Array.from({length: 2*n}, () => []);
        this.radj = Array.from({length: 2*n}, () => []);
    }

    // Add clause (x ∨ y) where literals: variable i = i, negation = i+n
    addClause(x, y) {
        // ¬x → y and ¬y → x
        const negX = x < this.n ? x + this.n : x - this.n;
        const negY = y < this.n ? y + this.n : y - this.n;
        this.adj[negX].push(y);  this.radj[y].push(negX);
        this.adj[negY].push(x);  this.radj[x].push(negY);
    }

    solve() {
        const n2 = 2 * this.n;
        const order = [], visited = new Array(n2).fill(false);
        const dfs1 = (v) => {
            visited[v] = true;
            for (const u of this.adj[v]) if (!visited[u]) dfs1(u);
            order.push(v);
        };
        for (let i = 0; i < n2; i++) if (!visited[i]) dfs1(i);
        const comp = new Array(n2).fill(-1);
        let numComp = 0;
        const dfs2 = (v, c) => {
            comp[v] = c;
            for (const u of this.radj[v]) if (comp[u] === -1) dfs2(u, c);
        };
        for (let i = n2 - 1; i >= 0; i--) {
            if (comp[order[i]] === -1) dfs2(order[i], numComp++);
        }
        // Check satisfiability and extract assignment
        const vals = new Array(this.n);
        for (let i = 0; i < this.n; i++) {
            if (comp[i] === comp[i + this.n]) return null; // unsatisfiable
            vals[i] = comp[i] > comp[i + this.n]; // higher comp = later in topo = TRUE
        }
        return vals;
    }
}

// Usage:
// const sat = new TwoSAT(n);
// sat.addClause(x, y)  -- (var_x OR var_y)
// sat.addClause(x, x+n) -- forces var_x to be TRUE (x OR NOT x is tautology, but: x AND ¬¬x = x)
// For "var x must be true": addClause(x, x) if using literal encoding
// const result = sat.solve(); // null = unsat, array = assignment`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Possible Bipartition',
      url: 'https://leetcode.com/problems/possible-bipartition/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: BFS/DFS 2-coloring',
          explanation: `2-coloring of a graph = bipartite check. BFS from each unvisited node, alternate colors. If we try to assign same color to two adjacent nodes, not bipartite.`,
          code: `var possibleBipartition = function(n, dislikes) {
    const adj=Array.from({length:n+1},()=>[]);
    for(const[a,b] of dislikes){adj[a].push(b);adj[b].push(a);}
    const color=new Array(n+1).fill(-1);
    for(let i=1;i<=n;i++){
        if(color[i]!==-1) continue;
        const q=[i]; color[i]=0;
        while(q.length){
            const u=q.shift();
            for(const v of adj[u]){
                if(color[v]===-1){color[v]=1-color[u];q.push(v);}
                else if(color[v]===color[u]) return false;
            }
        }
    }
    return true;
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: 2-SAT — each person can be in group 0 or 1',
          explanation: `Variable i = (person i in group 1). Dislike(i,j) → (i and j in different groups) → (i ∨ j) AND (¬i ∨ ¬j). Add both clauses. 2-SAT solve. Satisfiable iff bipartite.`,
          code: `// For each dislike (a, b): addClause(a, b) + addClause(a+n, b+n) in 2SAT
// This is equivalent to bipartite check but demonstrates 2-SAT encoding
// In practice, BFS coloring is simpler for bipartite check`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Maximum Employees to Be Invited to a Meeting',
      url: 'https://leetcode.com/problems/maximum-employees-to-be-invited-to-a-meeting/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Functional graph — find cycles and longest chains',
          explanation: `Each person has exactly one favorite (out-degree 1). Two cases: (1) cycles of length ≥ 3 → max cycle length; (2) mutual pairs (2-cycles) → sum each pair's longest incoming chains. Answer = max of both cases.`,
          code: `var maximumInvitations = function(favorite) {
    const n=favorite.length;
    const inDeg=new Array(n).fill(0);
    for(const f of favorite) inDeg[f]++;
    // Topological sort to find chain lengths (non-cycle nodes)
    const chainLen=new Array(n).fill(1);
    const q=[];
    for(let i=0;i<n;i++) if(inDeg[i]===0) q.push(i);
    let qi=0;
    while(qi<q.length){
        const u=q[qi++], v=favorite[u];
        chainLen[v]=Math.max(chainLen[v],chainLen[u]+1);
        if(--inDeg[v]===0) q.push(v);
    }
    let maxCycle=0, sumPairs=0;
    const visited=new Array(n).fill(false);
    for(let i=0;i<n;i++){
        if(visited[i]||inDeg[i]===0) continue;
        // Find cycle
        let len=0, cur=i;
        while(!visited[cur]){visited[cur]=true;cur=favorite[cur];len++;}
        if(len===2) sumPairs+=chainLen[i]+chainLen[favorite[i]];
        else maxCycle=Math.max(maxCycle,len);
    }
    return Math.max(maxCycle,sumPairs);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Is Graph Bipartite?',
      url: 'https://leetcode.com/problems/is-graph-bipartite/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: BFS 2-coloring',
          explanation: `Assign color 0 to first unvisited node, alternate colors during BFS. Conflict = same color on both sides of an edge = not bipartite.`,
          code: `var isBipartite = function(graph) {
    const n=graph.length, color=new Array(n).fill(-1);
    for(let i=0;i<n;i++){
        if(color[i]!==-1) continue;
        const q=[i]; color[i]=0;
        while(q.length){
            const u=q.shift();
            for(const v of graph[u]){
                if(color[v]===-1){color[v]=1-color[u];q.push(v);}
                else if(color[v]===color[u]) return false;
            }
        }
    }
    return true;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '⚡',
      color: 'amber',
      content: `**2-SAT encoding rules:**\n- Clause (x ∨ y): add (¬x → y) and (¬y → x)\n- Force x to be TRUE: add clause (x ∨ x), i.e., single implication (¬x → x)\n- Force x to be FALSE: add clause (¬x ∨ ¬x)\n- x implies y: add (x → y) and (¬y → ¬x)\n\n**Assignment rule:** After Kosaraju's, variable x is TRUE if SCC(x) appears later in topological order than SCC(¬x).\n\n**Applications:** Scheduling with conflicts, graph 2-coloring with constraints, circuit satisfiability, constraint satisfaction problems reducible to 2-literal form.`,
    },
  ],
}
