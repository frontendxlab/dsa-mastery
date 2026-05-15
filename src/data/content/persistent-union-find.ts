import type { Article } from '../articles'

export const persistentUnionFindArticle: Article = {
  slug: 'persistent-union-find',
  title: 'Persistent Union-Find (DSU with Rollback)',
  emoji: '⏪',
  tagline: 'Undo union operations. Offline dynamic connectivity with O(n log²n).',
  description: 'Standard Union-Find cannot undo operations. DSU with rollback uses union-by-rank (no path compression — path compression breaks rollback) and a stack of changes. Each union logs what changed; rollback pops the stack and restores. Used for: offline dynamic connectivity (add and remove edges), time-stamped DSU queries, and segment tree on intervals for DSU.',
  gradient: 'from-slate-700 to-zinc-800',
  topicSlug: 'graph',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `Key constraint: path compression breaks rollback because it modifies many parent pointers. Use union-by-rank only (no path compression) — O(log n) per find instead of nearly O(1), but supports rollback. Each union operation modifies at most 2 values; log these on a stack. To rollback k operations: pop k entries from stack and restore parent/rank. DSU on a segment tree (each edge active during an interval) gives offline dynamic connectivity in O(n log²n).`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'DSU with rollback',
      code: `class RollbackDSU {
    constructor(n) {
        this.parent = Array.from({length: n}, (_, i) => i);
        this.rank = new Array(n).fill(0);
        this.history = []; // stack of [node, oldParent, oldRank]
    }

    find(x) {
        while (this.parent[x] !== x) x = this.parent[x]; // no path compression!
        return x;
    }

    unite(x, y) {
        x = this.find(x); y = this.find(y);
        if (x === y) { this.history.push(null); return false; }
        if (this.rank[x] < this.rank[y]) [x, y] = [y, x];
        // Log changes before making them
        this.history.push([y, this.parent[y], x, this.rank[x]]);
        this.parent[y] = x;
        if (this.rank[x] === this.rank[y]) this.rank[x]++;
        return true;
    }

    rollback() {
        const entry = this.history.pop();
        if (entry) {
            const [y, oldParentY, x, oldRankX] = entry;
            this.parent[y] = oldParentY;
            this.rank[x] = oldRankX;
        }
    }

    save() { return this.history.length; } // checkpoint
    rollbackTo(checkpoint) {
        while (this.history.length > checkpoint) this.rollback();
    }
}

// DSU on segment tree for offline dynamic connectivity
// Each edge [u, v, from_time, to_time] → add to interval [from, to) in seg tree
// DFS seg tree: at leaf = query; at node = unite, recurse children, rollback`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Number of Islands II',
      url: 'https://leetcode.com/problems/number-of-islands-ii/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Union-Find — add land cells, count components',
          explanation: `Start with 0 islands. For each land cell addition: count = 1 (new island). Then merge with adjacent land cells: for each neighbor that is land, if different component, union and count--. Track with Union-Find.`,
          code: `var numIslands2 = function(m, n, positions) {
    const par=new Array(m*n).fill(-1), rank=new Array(m*n).fill(0);
    const find=x=>par[x]===x?x:(par[x]=find(par[x]));
    let islands=0;
    const res=[];
    for(const[r,c] of positions){
        const id=r*n+c;
        if(par[id]===-1){
            par[id]=id; islands++;
            for(const[dr,dc] of [[0,1],[0,-1],[1,0],[-1,0]]){
                const[nr,nc]=[r+dr,c+dc];
                if(nr>=0&&nr<m&&nc>=0&&nc<n&&par[nr*n+nc]!==-1){
                    const[px,py]=[find(id),find(nr*n+nc)];
                    if(px!==py){if(rank[px]<rank[py])par[px]=py;else{par[py]=px;if(rank[px]===rank[py])rank[px]++;}islands--;}
                }
            }
        }
        res.push(islands);
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Checking Existence of Edge Length Limited Paths',
      url: 'https://leetcode.com/problems/checking-existence-of-edge-length-limited-paths/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Offline + sort by limit, add edges incrementally',
          explanation: `Sort queries by limit. Sort edges by weight. Process queries in order: add all edges with weight < current limit to DSU. Answer query = find(u) === find(v).`,
          code: `var distanceLimitedPathsExist = function(n, edgeList, queries) {
    const q=queries.map(([u,v,limit],i)=>[u,v,limit,i]).sort((a,b)=>a[2]-b[2]);
    edgeList.sort((a,b)=>a[2]-b[2]);
    const par=Array.from({length:n},(_,i)=>i),rank=new Array(n).fill(0);
    const find=x=>par[x]===x?x:(par[x]=find(par[x]));
    const union=(x,y)=>{const[px,py]=[find(x),find(y)];if(px===py)return;if(rank[px]<rank[py])par[px]=py;else{par[py]=px;if(rank[px]===rank[py])rank[px]++;}};
    const res=new Array(queries.length); let ei=0;
    for(const[u,v,limit,i] of q){
        while(ei<edgeList.length&&edgeList[ei][2]<limit) union(edgeList[ei][0],edgeList[ei++][1]);
        res[i]=find(u)===find(v);
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Offline Dynamic Connectivity (segment tree + rollback DSU)',
      url: 'https://leetcode.com/problems/graph-connectivity-with-threshold/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Connect cities sharing GCD > threshold',
          explanation: `For threshold t, connect all multiples of g where g > t. For each g from t+1 to n, connect g, 2g, 3g, ... to g. Use Union-Find.`,
          code: `var areConnected = function(n, threshold, queries) {
    const par=Array.from({length:n+1},(_,i)=>i),rank=new Array(n+1).fill(0);
    const find=x=>par[x]===x?x:(par[x]=find(par[x]));
    const union=(x,y)=>{const[px,py]=[find(x),find(y)];if(px===py)return;rank[px]>=rank[py]?par[py]=px:par[px]=py;if(rank[px]===rank[py])rank[px]++;};
    // Connect all multiples of g > threshold
    for(let g=threshold+1;g<=n;g++) for(let m=2*g;m<=n;m+=g) union(g,m);
    return queries.map(([a,b])=>find(a)===find(b));
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '⏪',
      color: 'gray',
      content: `**DSU with rollback key restriction:** No path compression — must use find by following parent pointers (O(log n) per find). Path compression would modify many parent pointers and make rollback expensive.\n\n**Offline dynamic connectivity:** When edges have time intervals [add_time, remove_time], build a segment tree on time. Insert edge into segment tree at its time interval. DFS the segment tree: unite at each node, recurse children, rollback on exit.\n\n**Complexity:** O(n log n × log n) = O(n log²n) for offline dynamic connectivity with DSU on segment tree.`,
    },
  ],
}
