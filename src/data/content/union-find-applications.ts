import type { Article } from '../articles'

export const unionFindApplicationsArticle: Article = {
  slug: 'union-find-applications',
  title: 'Union-Find Applications',
  emoji: '🔗',
  tagline: 'Connect components dynamically. Detect cycles, count components, earliest connection.',
  description: 'Union-Find (Disjoint Set Union) efficiently answers: are two elements in the same component? It supports union (merge components) and find (get component representative) in near-O(1) amortized with path compression and union by rank. Applications: count connected components, detect cycles in undirected graphs, Kruskal\'s MST, earliest time when all connected, account merging.',
  gradient: 'from-violet-700 to-purple-800',
  topicSlug: 'graph',
  readTime: '13 min',
  sections: [
    {
      type: 'text',
      content: `Union-Find with path compression and union by rank: find(x) = parent[x] == x ? x : parent[x] = find(parent[x]). Union(x, y): link smaller rank to larger. Track component count: decrement on each successful union. Cycle detection: union returns false if both already in same component. Weighted union-find: store weight (ratio, difference) at each edge for path queries.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Union-Find with path compression and rank',
      code: `class UnionFind {
    constructor(n) {
        this.parent = Array.from({length: n}, (_, i) => i);
        this.rank = new Array(n).fill(0);
        this.count = n; // number of components
    }

    find(x) {
        if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]); // path compression
        return this.parent[x];
    }

    union(x, y) {
        const px = this.find(x), py = this.find(y);
        if (px === py) return false; // already connected
        // Union by rank
        if (this.rank[px] < this.rank[py]) this.parent[px] = py;
        else if (this.rank[px] > this.rank[py]) this.parent[py] = px;
        else { this.parent[py] = px; this.rank[px]++; }
        this.count--;
        return true;
    }

    connected(x, y) { return this.find(x) === this.find(y); }
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
      title: 'Number of Provinces',
      url: 'https://leetcode.com/problems/number-of-provinces/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Union-Find — union connected cities, count remaining components',
          explanation: `Initialize n components. For each connection isConnected[i][j]==1, union i and j. Final count of components = number of provinces.`,
          code: `var findCircleNum = function(isConnected) {
    const n=isConnected.length;
    const par=Array.from({length:n},(_,i)=>i), rnk=new Array(n).fill(0);
    let cnt=n;
    const find=x=>par[x]===x?x:par[x]=find(par[x]);
    const union=(x,y)=>{
        const px=find(x),py=find(y);
        if(px===py) return;
        rnk[px]>=rnk[py]?par[py]=px:par[px]=py;
        if(rnk[px]===rnk[py]) rnk[px]++;
        cnt--;
    };
    for(let i=0;i<n;i++) for(let j=i+1;j<n;j++) if(isConnected[i][j]) union(i,j);
    return cnt;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Accounts Merge',
      url: 'https://leetcode.com/problems/accounts-merge/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Union-Find on emails — union all emails in same account',
          explanation: `Map each email to an index. For each account, union all emails together (to the first email). Then group emails by their root representative. Attach account name to each group.`,
          code: `var accountsMerge = function(accounts) {
    const emailToIdx=new Map(), emailToName=new Map();
    let idx=0;
    const par=[], rnk=[];
    const find=x=>{if(par[x]!==x) par[x]=find(par[x]);return par[x];};
    const union=(x,y)=>{
        const px=find(x),py=find(y);
        if(px===py) return;
        rnk[px]>=rnk[py]?par[py]=px:par[px]=py;
        if(rnk[px]===rnk[py]) rnk[px]++;
    };
    for(const [name,...emails] of accounts){
        for(const email of emails){
            if(!emailToIdx.has(email)){emailToIdx.set(email,idx);par.push(idx);rnk.push(0);idx++;}
            emailToName.set(email,name);
            union(emailToIdx.get(emails[0]),emailToIdx.get(email));
        }
    }
    const groups=new Map();
    for(const [email,i] of emailToIdx){
        const root=find(i);
        if(!groups.has(root)) groups.set(root,[]);
        groups.get(root).push(email);
    }
    return [...groups.values()].map(emails=>[emailToName.get(emails[0]),...emails.sort()]);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Earliest Moment When Everyone Become Friends',
      url: 'https://leetcode.com/problems/the-earliest-moment-when-everyone-become-friends/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Sort logs by timestamp, union friends, check when count reaches 1',
          explanation: `Sort friendship logs by timestamp. Union friends one by one. When component count drops to 1, return current timestamp. If never reaches 1, return -1.`,
          code: `var earliestAcq = function(logs, n) {
    logs.sort((a,b)=>a[0]-b[0]);
    const par=Array.from({length:n},(_,i)=>i),rnk=new Array(n).fill(0);
    let cnt=n;
    const find=x=>par[x]===x?x:par[x]=find(par[x]);
    for(const [t,x,y] of logs){
        const px=find(x),py=find(y);
        if(px!==py){
            rnk[px]>=rnk[py]?par[py]=px:par[px]=py;
            if(rnk[px]===rnk[py]) rnk[px]++;
            if(--cnt===1) return t;
        }
    }
    return -1;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Satisfiability of Equality Equations',
      url: 'https://leetcode.com/problems/satisfiability-of-equality-equations/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Union all "==" pairs, then check "!=" pairs for contradiction',
          explanation: `First pass: union all variables connected by "==". Second pass: for each "!=" equation, check if the two variables are in the same component — contradiction.`,
          code: `var equationsPossible = function(equations) {
    const par=Array.from({length:26},(_,i)=>i);
    const find=x=>par[x]===x?x:par[x]=find(par[x]);
    for(const eq of equations)
        if(eq[1]==='=') par[find(eq.charCodeAt(0)-97)]=find(eq.charCodeAt(3)-97);
    for(const eq of equations)
        if(eq[1]==='!'&&find(eq.charCodeAt(0)-97)===find(eq.charCodeAt(3)-97)) return false;
    return true;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🔗',
      color: 'blue',
      content: `**Union-Find amortized complexity:** With both path compression and union by rank, each operation is O(α(n)) where α is the inverse Ackermann function — effectively O(1) for any practical n.\n\n**When to use Union-Find vs BFS/DFS:**\n- Dynamic connectivity (edges added over time): Union-Find\n- Static graph, one-time query: BFS/DFS fine\n- Need path between nodes: BFS/DFS\n- Just need same-component check: Union-Find\n\n**Rollback Union-Find:** Without path compression, use union by rank only — then union/undo is O(log n). Used in offline algorithms.`,
    },
  ],
}
