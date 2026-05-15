import type { Article } from '../articles'

export const graphColoringBipartiteArticle: Article = {
  slug: 'graph-coloring-bipartite',
  title: 'Graph Coloring & Bipartite Checking',
  emoji: '🎨',
  tagline: 'Two-color graphs to find odd cycles. Divide into two groups satisfying constraints.',
  description: 'A graph is bipartite if and only if it has no odd-length cycles, equivalently if it\'s 2-colorable. BFS/DFS coloring: assign alternating colors. If a neighbor has the same color, graph is not bipartite. Applications: check if conflict graph is 2-colorable (exam scheduling, seating constraints), find maximum matching in bipartite graphs, detect odd cycles.',
  gradient: 'from-pink-600 to-rose-700',
  topicSlug: 'graph',
  readTime: '12 min',
  sections: [
    {
      type: 'text',
      content: `Bipartite check: BFS from each unvisited node, color it 0. For each neighbor: if uncolored, color it 1-current; if same color as current, not bipartite. The two color sets form the two partitions. Possible vs impossible bipartite partition: equivalent to checking if constraint graph is 2-colorable. If any "must-be-different" pair ends up in same group, impossible.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Bipartite check with BFS coloring',
      code: `function isBipartite(graph) {
    const n = graph.length;
    const color = new Array(n).fill(-1); // -1 = uncolored

    for (let start = 0; start < n; start++) {
        if (color[start] !== -1) continue; // already colored
        const queue = [start];
        color[start] = 0;

        while (queue.length) {
            const node = queue.shift();
            for (const neighbor of graph[node]) {
                if (color[neighbor] === -1) {
                    color[neighbor] = 1 - color[node]; // opposite color
                    queue.push(neighbor);
                } else if (color[neighbor] === color[node]) {
                    return false; // same color = odd cycle = not bipartite
                }
            }
        }
    }
    return true;
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
      title: 'Is Graph Bipartite?',
      url: 'https://leetcode.com/problems/is-graph-bipartite/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: BFS 2-coloring — alternating colors; conflict = not bipartite',
          explanation: `For each unvisited node, start BFS with color 0. Color neighbors with opposite color. If any neighbor has same color as current, return false.`,
          code: `var isBipartite = function(graph) {
    const color=new Array(graph.length).fill(-1);
    for(let s=0;s<graph.length;s++){
        if(color[s]!==-1) continue;
        const q=[s]; color[s]=0;
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
      type: 'problem',
      num: 2,
      title: 'Possible Bipartition',
      url: 'https://leetcode.com/problems/possible-bipartition/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Build conflict graph, check 2-colorability',
          explanation: `Each "dislikes" pair is an edge in a conflict graph. Check if this graph is bipartite — if so, partition into 2 groups where no two dislikers are in same group.`,
          code: `var possibleBipartition = function(n, dislikes) {
    const adj=Array.from({length:n+1},()=>[]);
    for(const [a,b] of dislikes){adj[a].push(b);adj[b].push(a);}
    const color=new Array(n+1).fill(-1);
    for(let s=1;s<=n;s++){
        if(color[s]!==-1) continue;
        const q=[s]; color[s]=0;
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
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Divide Nodes Into the Maximum Number of Groups',
      url: 'https://leetcode.com/problems/divide-nodes-into-the-maximum-number-of-groups/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: For each component, check bipartite; if bipartite, find max BFS diameter',
          explanation: `Non-bipartite component → impossible (-1). For bipartite component: try BFS from each node, find maximum number of BFS levels. This is the maximum groups for that component. Sum across all components.`,
          code: `var magnificentSets = function(n, edges) {
    const adj=Array.from({length:n+1},()=>[]);
    for(const [a,b] of edges){adj[a].push(b);adj[b].push(a);}
    const color=new Array(n+1).fill(-1);
    const comp=new Array(n+1).fill(-1);
    // Check bipartite and find components
    let numComp=0;
    for(let s=1;s<=n;s++){
        if(color[s]!==-1) continue;
        const q=[s]; color[s]=0; comp[s]=numComp;
        while(q.length){
            const u=q.shift();
            for(const v of adj[u]){
                if(color[v]===-1){color[v]=1-color[u];comp[v]=numComp;q.push(v);}
                else if(color[v]===color[u]) return -1;
            }
        }
        numComp++;
    }
    // For each component, find max BFS depth from any starting node
    const compNodes=Array.from({length:numComp},()=>[]);
    for(let i=1;i<=n;i++) compNodes[comp[i]].push(i);
    const bfsDepth=src=>{
        const dist=new Array(n+1).fill(-1); dist[src]=0;
        const q=[src]; let mx=0;
        while(q.length){const u=q.shift();for(const v of adj[u]) if(dist[v]===-1){dist[v]=dist[u]+1;mx=Math.max(mx,dist[v]);q.push(v);}}
        return mx+1;
    };
    let total=0;
    for(const nodes of compNodes) total+=Math.max(...nodes.map(bfsDepth));
    return total;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🎨',
      color: 'red',
      content: `**Bipartite ↔ 2-colorable ↔ no odd cycles:** All three are equivalent. BFS/DFS 2-coloring is the canonical check.\n\n**Applications:**\n- Conflict graph partition: "must be in different groups" → edges in conflict graph → bipartite check\n- Maximum bipartite matching: Hopcroft-Karp on bipartite graph\n- Hungarian algorithm: min-cost bipartite matching\n\n**Odd cycle detection:** If BFS finds same-color neighbor, the two paths from start to that neighbor form an odd cycle. The cycle length = dist[u] + dist[v] + 1.`,
    },
  ],
}
