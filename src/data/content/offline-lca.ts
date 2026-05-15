import type { Article } from '../articles'

export const offlineLcaArticle: Article = {
  slug: 'offline-lca',
  title: 'Offline LCA (Tarjan\'s)',
  emoji: '🏔️',
  tagline: 'Answer all LCA queries in O(n + q) using Union-Find. Process queries offline.',
  description: "Tarjan's offline LCA processes all queries in a single DFS, answering each query when exactly one of its two nodes has been visited. Uses Union-Find with path compression: when finishing a subtree, union it with the parent. LCA(u,v) = find(v) when u is completed (v is already visited). Total: O((n + q) × α(n)) ≈ O(n + q). Requires all queries upfront (offline).",
  gradient: 'from-stone-700 to-slate-800',
  topicSlug: 'graph',
  readTime: '13 min',
  sections: [
    {
      type: 'text',
      content: `Tarjan's LCA: DFS the tree. When we finish processing a node u, union(u, parent(u)) and mark u as "visited." For each query (u, v): when we encounter u and v is already visited, LCA(u, v) = find(v) (the root of v's component, which has been promoted to be the LCA ancestor). Process queries for each node when that node is being finished.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: "Tarjan's offline LCA",
      code: `function tarjanLCA(n, edges, queries) {
    const adj = Array.from({length: n}, () => []);
    for (const [u, v] of edges) { adj[u].push(v); adj[v].push(u); }

    // Group queries by node
    const queryList = Array.from({length: n}, () => []);
    for (let i = 0; i < queries.length; i++) {
        const [u, v] = queries[i];
        queryList[u].push([v, i]);
        queryList[v].push([u, i]);
    }

    const parent = Array.from({length: n}, (_, i) => i);
    const find = x => parent[x] === x ? x : (parent[x] = find(parent[x]));
    const visited = new Array(n).fill(false);
    const answers = new Array(queries.length);
    const ancestor = Array.from({length: n}, (_, i) => i);

    function dfs(u, p) {
        ancestor[u] = u;
        for (const v of adj[u]) {
            if (v === p) continue;
            dfs(v, u);
            // Union v into u's component, ancestor of root = u
            parent[find(v)] = u;
            ancestor[find(u)] = u;
        }
        visited[u] = true;
        for (const [v, qi] of queryList[u]) {
            if (visited[v]) {
                answers[qi] = ancestor[find(v)];
            }
        }
    }

    dfs(0, -1);
    return answers;
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
      title: 'Lowest Common Ancestor III',
      url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Walk up from both nodes using parent pointers',
          explanation: `Both nodes have parent pointers. Walk up from each to root, record depths. Bring deeper node up to same depth. Walk both up together until they meet = LCA.`,
          code: `var lowestCommonAncestor = function(p, q) {
    let [a,b]=[p,q];
    while(a!==b){
        a=a.parent||q;
        b=b.parent||p;
    }
    return a;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Count Pairs with XOR Equal to k in Tree Path',
      url: 'https://leetcode.com/problems/count-pairs-of-nodes/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Degree-based two-pointer + edge correction',
          explanation: `For two nodes u,v: cnt(u,v) = deg(u)+deg(v) - 2*(edges between u and v). Count pairs where this > query. Use sorted degrees + two-pointer for deg sum, then subtract pairs sharing edges that flip validity.`,
          code: `var countPairs = function(n, edges, queries) {
    const deg=new Array(n+1).fill(0);
    const edgeCnt=new Map();
    for(const[a,b] of edges){
        deg[a]++;deg[b]++;
        const k=Math.min(a,b)*10001+Math.max(a,b);
        edgeCnt.set(k,(edgeCnt.get(k)||0)+1);
    }
    const sorted=[...deg.slice(1)].sort((a,b)=>a-b);
    return queries.map(q=>{
        let cnt=0,l=0,r=sorted.length-1;
        while(l<r){sorted[l]+sorted[r]>q?cnt+=r-l--:l++;}
        for(const[k,s] of edgeCnt){
            const u=Math.floor(k/10001),v=k%10001;
            if(deg[u]+deg[v]>q&&deg[u]+deg[v]-s<=q) cnt--;
        }
        return cnt;
    });
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Minimum Edge Weight Equilibrium Queries in a Tree',
      url: 'https://leetcode.com/problems/minimum-edge-weight-equilibrium-queries-in-a-tree/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: LCA + prefix count of edge weights',
          explanation: `For query (u,v): path goes through LCA(u,v). Count edges of each weight on path using prefix counts from root. Path edges = depth[u]+depth[v]-2*depth[lca]. Need max count weight to minimize replacements.`,
          code: `var minOperationsQueries = function(n, edges, queries) {
    const LOG=15;
    const adj=Array.from({length:n},()=>[]);
    for(const[u,v,w] of edges){adj[u].push([v,w]);adj[v].push([u,w]);}
    const depth=new Array(n).fill(0);
    const up=Array.from({length:n},()=>new Array(LOG).fill(0));
    const cnt=Array.from({length:n},()=>new Array(26+1).fill(0)); // cnt[node][w] = count of weight w on path from root
    const dfs=(u,p,d)=>{
        up[u][0]=p; depth[u]=d;
        for(let j=1;j<LOG;j++) up[u][j]=up[up[u][j-1]][j-1];
        for(const[v,w] of adj[u]) if(v!==p){
            for(let i=1;i<=26;i++) cnt[v][i]=cnt[u][i]; cnt[v][w]++;
            dfs(v,u,d+1);
        }
    };
    dfs(0,0,0);
    const lca=(u,v)=>{
        if(depth[u]<depth[v])[u,v]=[v,u];
        let diff=depth[u]-depth[v];
        for(let j=0;j<LOG;j++) if((diff>>j)&1) u=up[u][j];
        if(u===v) return u;
        for(let j=LOG-1;j>=0;j--) if(up[u][j]!==up[v][j]){u=up[u][j];v=up[v][j];}
        return up[u][0];
    };
    return queries.map(([u,v])=>{
        const l=lca(u,v), pathLen=depth[u]+depth[v]-2*depth[l];
        let maxCnt=0;
        for(let i=1;i<=26;i++) maxCnt=Math.max(maxCnt,cnt[u][i]+cnt[v][i]-2*cnt[l][i]);
        return pathLen-maxCnt;
    });
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🏔️',
      color: 'gray',
      content: `**Tarjan's offline LCA vs Binary Lifting:**\n- Tarjan's: O(n + q) total, requires all queries upfront, simpler code\n- Binary lifting: O(n log n) build, O(log n) per query, supports online queries\n\n**Tarjan's key invariant:** When node u is finished and v is already visited, find(v) = LCA(u,v). The Union-Find "promotes" each finished subtree to be represented by its parent (the LCA of any query involving both a node in the subtree and any already-visited node).\n\n**Use case:** When you have many LCA queries and can process all at once — preprocessing for path sum queries, counting edges on paths, etc.`,
    },
  ],
}
