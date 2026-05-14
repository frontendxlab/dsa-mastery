import type { Article } from '../articles'

export const unionFindArticle: Article = {
  slug: 'union-find',
  title: 'Union-Find (Disjoint Set Union)',
  emoji: '🔗',
  tagline: 'Find the root. Union the sets. Near-constant time with path compression.',
  description: 'Union-Find (DSU) answers two questions in near-O(1): "are two elements in the same group?" and "merge two groups." With path compression and union by rank, both operations are amortized O(α(n)) — effectively constant. Solves connectivity, cycle detection, and MST problems.',
  gradient: 'from-cyan-400 to-blue-500',
  topicSlug: 'graph',
  readTime: '16 min',
  sections: [
    {
      type: 'text',
      content: `Union-Find (also called Disjoint Set Union) maintains a partition of elements into groups. Two operations: Find (which group does this element belong to?) and Union (merge two groups). With two optimizations — path compression and union by rank — both operations run in effectively constant amortized time. No graph traversal needed for connectivity.`,
    },
    {
      type: 'callout',
      icon: '🔑',
      color: 'teal',
      content: `**When Union-Find beats BFS/DFS:**\n- Dynamic connectivity: edges added over time, need to check connectivity after each\n- Kruskal's MST: process edges sorted by weight, union endpoints if not already connected\n- Detect cycle in undirected graph: if Find(u) === Find(v) before Union(u,v), it's a cycle\n- Online vs offline: Union-Find handles streaming edges; BFS/DFS requires the full graph upfront`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'The Two Optimizations',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Union-Find with path compression + union by rank',
      code: `class UnionFind {
    constructor(n) {
        this.parent = Array.from({length: n}, (_, i) => i);
        this.rank   = new Array(n).fill(0);
        this.count  = n; // number of connected components
    }

    find(x) {
        // Path compression: flatten tree — every node points directly to root
        if (this.parent[x] !== x)
            this.parent[x] = this.find(this.parent[x]);
        return this.parent[x];
    }

    union(x, y) {
        const px = this.find(x), py = this.find(y);
        if (px === py) return false; // already connected
        // Union by rank: attach smaller tree under larger
        if (this.rank[px] < this.rank[py]) this.parent[px] = py;
        else if (this.rank[px] > this.rank[py]) this.parent[py] = px;
        else { this.parent[py] = px; this.rank[px]++; }
        this.count--;
        return true;
    }

    connected(x, y) { return this.find(x) === this.find(y); }
}

// Simpler functional version (when rank not needed):
const parent = Array.from({length: n}, (_, i) => i);
const find = (x) => {
    while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; }
    return x;
};
const union = (x, y) => {
    const px = find(x), py = find(y);
    if (px !== py) parent[px] = py;
};`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Number of Islands',
      url: 'https://leetcode.com/problems/number-of-islands/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DFS flood-fill — O(m·n)',
          explanation: 'For each unvisited land cell, DFS flood-fill to mark all connected cells. Each DFS invocation = one island. Classic and simple.',
          code: `var numIslands = function(grid) {
    let count = 0;
    const dfs = (r, c) => {
        if(r<0||r>=grid.length||c<0||c>=grid[0].length||grid[r][c]!=='1') return;
        grid[r][c]='0';
        dfs(r+1,c);dfs(r-1,c);dfs(r,c+1);dfs(r,c-1);
    };
    for(let r=0;r<grid.length;r++)
        for(let c=0;c<grid[0].length;c++)
            if(grid[r][c]==='1'){dfs(r,c);count++;}
    return count;
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Union-Find — useful for dynamic islands',
          explanation: 'Union all adjacent land cells. Answer = number of components. Same result, but Union-Find allows answering "how many islands if we add cell X?" efficiently.',
          code: `var numIslands = function(grid) {
    const m=grid.length, n=grid[0].length;
    const parent=Array.from({length:m*n},(_,i)=>i);
    const find=x=>{ while(parent[x]!==x){parent[x]=parent[parent[x]];x=parent[x];}return x;};
    const union=(x,y)=>{ const px=find(x),py=find(y); if(px!==py){parent[px]=py;return true;}return false;};
    let water=0;
    for(let r=0;r<m;r++) for(let c=0;c<n;c++) if(grid[r][c]==='0') water++;
    let components=m*n-water;
    for(let r=0;r<m;r++) for(let c=0;c<n;c++){
        if(grid[r][c]!=='1') continue;
        if(r+1<m&&grid[r+1][c]==='1'&&union(r*n+c,(r+1)*n+c)) components--;
        if(c+1<n&&grid[r][c+1]==='1'&&union(r*n+c,r*n+c+1)) components--;
    }
    return components;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Redundant Connection',
      url: 'https://leetcode.com/problems/redundant-connection/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Union-Find — first edge that creates a cycle',
          explanation: 'Process edges one by one. Before unioning nodes u and v: if find(u) === find(v), they are already connected — this edge creates a cycle, return it. Otherwise union them.',
          code: `var findRedundantConnection = function(edges) {
    const n = edges.length;
    const parent = Array.from({length: n+1}, (_, i) => i);
    const find = x => parent[x] === x ? x : (parent[x] = find(parent[x]));
    for (const [u, v] of edges) {
        const pu = find(u), pv = find(v);
        if (pu === pv) return [u, v]; // already connected = this edge is redundant
        parent[pu] = pv;
    }
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Accounts Merge',
      url: 'https://leetcode.com/problems/accounts-merge/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Union-Find on email addresses',
          explanation: 'Key insight: same email → same person. Union all emails of each account together. Map each email to one canonical owner. After unioning, group emails by their root representative.',
          code: `var accountsMerge = function(accounts) {
    const parent = {}, owner = {};
    const find = x => {
        if(parent[x]!==x) parent[x]=find(parent[x]);
        return parent[x];
    };
    const union = (x,y) => parent[find(x)] = find(y);

    for (const [name, ...emails] of accounts) {
        for (const email of emails) {
            if(!parent[email]) { parent[email]=email; owner[email]=name; }
            union(emails[0], email); // union all emails with first email
        }
    }

    const groups = new Map();
    for (const email of Object.keys(parent)) {
        const root = find(email);
        if(!groups.has(root)) groups.set(root, []);
        groups.get(root).push(email);
    }

    return [...groups.values()].map(emails =>
        [owner[find(emails[0])], ...emails.sort()]
    );
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Number of Connected Components in an Undirected Graph',
      url: 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Union-Find — count remaining components',
          explanation: 'Start with n components. For each edge, if endpoints not connected, union them and decrement component count. Answer = final count.',
          code: `var countComponents = function(n, edges) {
    const parent = Array.from({length:n}, (_,i)=>i);
    let comps = n;
    const find = x => parent[x]===x ? x : (parent[x]=find(parent[x]));
    for(const [u,v] of edges){
        const pu=find(u), pv=find(v);
        if(pu!==pv){ parent[pu]=pv; comps--; }
    }
    return comps;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧠',
      color: 'green',
      content: `**Union-Find vs BFS/DFS:**\n- Static graph, one-time query → BFS/DFS is simpler\n- Dynamic graph (edges added online) → Union-Find handles streaming\n- Cycle detection in undirected → Union-Find is cleaner\n- Strongly connected components → Need Tarjan/Kosaraju (DFS), not Union-Find\n- Minimum spanning tree → Kruskal = sort edges + Union-Find`,
    },
  ],
}
