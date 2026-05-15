import type { Article } from '../articles'

export const matchingFlowArticle: Article = {
  slug: 'matching-flow',
  title: 'Matching via Maximum Flow',
  emoji: '🔗',
  tagline: 'Bipartite matching = max flow in O(E√V). General matching = Blossom algorithm.',
  description: 'Bipartite maximum matching finds the largest set of edges with no shared endpoints. Reduces to max-flow: source → left nodes → right nodes → sink, all edges capacity 1. Hopcroft-Karp finds augmenting paths in batches (BFS layers + DFS), achieving O(E√V). König\'s theorem: max matching = min vertex cover in bipartite graphs. Covers: assignment problems, independent set, and edge coloring.',
  gradient: 'from-green-900 to-emerald-950',
  topicSlug: 'graph',
  readTime: '16 min',
  sections: [
    {
      type: 'text',
      content: `Bipartite matching: find max set of edges with no shared endpoint. Flow model: all edges capacity 1. Augmenting path: path from unmatched left to unmatched right through alternating matched/unmatched edges. Hopcroft-Karp: BFS to find shortest augmenting paths (all same length), DFS to find vertex-disjoint augmenting paths simultaneously. Each phase increases matching by at least 1, and there are O(√V) phases.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Hopcroft-Karp bipartite matching',
      code: `class BipartiteMatching {
    constructor(L, R) {
        this.L = L; this.R = R;
        this.adj = Array.from({length: L}, () => []);
        this.matchL = new Array(L).fill(-1);
        this.matchR = new Array(R).fill(-1);
    }
    addEdge(u, v) { this.adj[u].push(v); }

    // Hopcroft-Karp: O(E√V)
    maxMatching() {
        let matching = 0;
        while (this._bfs()) {
            for (let u = 0; u < this.L; u++)
                if (this.matchL[u] === -1 && this._dfs(u)) matching++;
        }
        return matching;
    }

    _bfs() {
        this.dist = new Array(this.L).fill(Infinity);
        const queue = [];
        for (let u = 0; u < this.L; u++) {
            if (this.matchL[u] === -1) { this.dist[u] = 0; queue.push(u); }
        }
        let found = false;
        let i = 0;
        while (i < queue.length) {
            const u = queue[i++];
            for (const v of this.adj[u]) {
                const w = this.matchR[v];
                if (w === -1) found = true;
                else if (this.dist[w] === Infinity) {
                    this.dist[w] = this.dist[u] + 1;
                    queue.push(w);
                }
            }
        }
        return found;
    }

    _dfs(u) {
        for (const v of this.adj[u]) {
            const w = this.matchR[v];
            if (w === -1 || (this.dist[w] === this.dist[u] + 1 && this._dfs(w))) {
                this.matchL[u] = v; this.matchR[v] = u;
                return true;
            }
        }
        this.dist[u] = Infinity;
        return false;
    }
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
      title: 'Maximum Number of Accepted Invitations',
      url: 'https://leetcode.com/problems/maximum-number-of-accepted-invitations/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Bipartite matching — boys left, girls right',
          explanation: `grid[i][j]=1 means boy i can invite girl j. Maximum matching = maximum number of accepted invitations. Hungarian algorithm for bipartite matching.`,
          code: `var maximumInvitations = function(grid) {
    const m=grid.length,n=grid[0].length;
    const matchR=new Array(n).fill(-1);
    const dfs=(u,vis)=>{
        for(let v=0;v<n;v++) if(grid[u][v]&&!vis[v]){
            vis[v]=true;
            if(matchR[v]===-1||dfs(matchR[v],vis)){matchR[v]=u;return true;}
        }
        return false;
    };
    let res=0;
    for(let u=0;u<m;u++){
        const vis=new Array(n).fill(false);
        if(dfs(u,vis)) res++;
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
      title: 'Job Scheduling in One Machine',
      url: 'https://leetcode.com/problems/task-scheduler/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Greedy — most frequent task first',
          explanation: `Arrange tasks with cooldown n. Most frequent task determines structure: frames of (maxFreq-1) × (n+1) + (count of tasks with max frequency). Result = max(total tasks, this frame count).`,
          code: `var leastInterval = function(tasks, n) {
    const cnt=new Array(26).fill(0);
    for(const t of tasks) cnt[t.charCodeAt(0)-65]++;
    cnt.sort((a,b)=>b-a);
    const maxFreq=cnt[0];
    const maxCount=cnt.filter(c=>c===maxFreq).length;
    return Math.max(tasks.length,(maxFreq-1)*(n+1)+maxCount);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Min Cost to Connect All Points (via bipartite structure)',
      url: 'https://leetcode.com/problems/find-if-path-exists-in-graph/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: BFS/DFS or Union-Find for path existence',
          explanation: `Simple graph reachability. Union-Find: union all edges, check if source and destination are in same component.`,
          code: `var validPath = function(n, edges, source, destination) {
    const par=Array.from({length:n},(_,i)=>i);
    const find=x=>par[x]===x?x:(par[x]=find(par[x]));
    for(const[a,b] of edges) par[find(a)]=find(b);
    return find(source)===find(destination);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Minimum Vertex Cover',
      url: 'https://leetcode.com/problems/minimum-number-of-vertices-to-reach-all-nodes/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: All nodes with zero in-degree (no incoming edges)',
          explanation: `In a DAG: nodes with in-degree 0 cannot be reached from any other node — they must be in the source set. König's theorem: in bipartite graphs, min vertex cover = max matching. For DAG: all nodes with in-degree = 0.`,
          code: `var findSmallestSetOfVertices = function(n, edges) {
    const hasIncoming=new Set(edges.map(e=>e[1]));
    return Array.from({length:n},(_,i)=>i).filter(i=>!hasIncoming.has(i));
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🔗',
      color: 'green',
      content: `**König's theorem:** In bipartite graphs:\n- Max matching = min vertex cover\n- Max independent set = n - max matching\n\n**Algorithm selection:**\n- Simple bipartite matching (n ≤ 500): Hungarian/Augmenting paths O(V × E)\n- Faster matching (large n): Hopcroft-Karp O(E√V)\n- General (non-bipartite) matching: Blossom algorithm O(V³)\n\n**Flow reduction:** Source → left nodes (cap 1) → right nodes (cap 1) → sink (cap 1). Max flow = max matching. Min cut = min vertex cover (by König's).`,
    },
  ],
}
