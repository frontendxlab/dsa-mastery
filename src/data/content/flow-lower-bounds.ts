import type { Article } from '../articles'

export const flowLowerBoundsArticle: Article = {
  slug: 'flow-lower-bounds',
  title: 'Circulation & Flow with Lower Bounds',
  emoji: '🔄',
  tagline: 'Edge has both minimum and maximum flow. Reduce to standard max-flow via supply/demand.',
  description: 'Circulation with lower bounds extends max-flow where each edge has both a minimum (l) and maximum (u) flow. Transform: subtract lower bounds to get a standard flow problem with a modified source/sink. Applications: feasibility flow (can we satisfy all minimums?), minimum cost feasible flow, and scheduling with mandatory and optional tasks. Uses the "demand-supply" transformation.',
  gradient: 'from-violet-900 to-purple-950',
  topicSlug: 'graph',
  readTime: '16 min',
  sections: [
    {
      type: 'text',
      content: `Transformation for lower bounds: for edge (u,v) with bounds [l,u], subtract l from both bounds to get [0, u-l]. This forces l units through the edge, creating excess at v and deficit at u. Add a super-source S' and super-sink T': for each node with excess d > 0, add edge S'→node with capacity d; for deficit d < 0, add edge node→T' with capacity |d|. Find max-flow S'→T'. If it saturates all S'-edges: feasible.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Feasibility flow with lower bounds',
      code: `function feasibleFlow(n, edges, s, t) {
    // edges: [{u, v, lo, hi}]
    // Returns {feasible: bool, flow: f} if feasible
    const N = n + 2;
    const S2 = n, T2 = n + 1; // super source/sink

    // Build flow network
    const adj = Array.from({length: N}, () => []);
    const addEdge = (u, v, cap) => {
        adj[u].push({to: v, cap, rev: adj[v].length});
        adj[v].push({to: u, cap: 0, rev: adj[u].length - 1});
    };

    const demand = new Array(n).fill(0);
    for (const {u, v, lo, hi} of edges) {
        addEdge(u, v, hi - lo); // reduced capacity
        demand[v] += lo; // v gains lo units
        demand[u] -= lo; // u loses lo units
    }

    // Add S' → v for positive demand, u → T' for negative demand
    let sumSupply = 0;
    for (let i = 0; i < n; i++) {
        if (demand[i] > 0) { addEdge(S2, i, demand[i]); sumSupply += demand[i]; }
        else if (demand[i] < 0) { addEdge(i, T2, -demand[i]); }
    }
    // Add t → s with infinite capacity (to allow circulation)
    addEdge(t, s, Infinity);

    // Run max-flow from S2 to T2
    const flow = maxflow(adj, S2, T2, N); // use Dinic's from template
    return { feasible: flow === sumSupply };
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
      title: 'Minimum Flow',
      url: 'https://leetcode.com/problems/maximum-flow/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Standard max-flow (Dinic\'s)',
          explanation: `Build flow network. Dinic's algorithm: BFS level graph, DFS blocking flow, repeat. O(V²E) for general graphs.`,
          code: `// See network-flow article for full Dinic's implementation
// Minimum flow = max flow with capacity inversion on an edge
// Or: min flow from s to t = total supply - max flow in reversed graph`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Scheduling with Dependencies (Project Selection)',
      url: 'https://leetcode.com/problems/course-schedule-iii/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Greedy with priority queue — always pick earliest deadline',
          explanation: `Sort by deadline. Greedily take each course if it fits (cumulative time ≤ deadline). If it doesn't fit: if it's cheaper than the most expensive course taken so far, swap it in (we stay within deadline by removing the most expensive).`,
          code: `var scheduleCourse = function(courses) {
    courses.sort((a,b)=>a[1]-b[1]); // sort by deadline
    const maxPQ=[]; let time=0;
    for(const[dur,dead] of courses){
        time+=dur;
        maxPQ.push(-dur); maxPQ.sort((a,b)=>a-b); // max-heap
        if(time>dead){time+=maxPQ.shift(); /* remove most expensive = add back its negative */}
    }
    return maxPQ.length;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Minimum Cost Flow (via MCMF)',
      url: 'https://leetcode.com/problems/minimum-cost-to-supply-water/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Model as MST with virtual water source',
          explanation: `Building a well in house i = edge from virtual node 0 to i with cost wells[i-1]. Pipes = edges between houses with their costs. MST of this augmented graph = minimum cost.`,
          code: `var minCostToSupplyWater = function(n, wells, pipes) {
    const edges=wells.map((w,i)=>[w,0,i+1]);
    for(const[h1,h2,c] of pipes) edges.push([c,h1,h2]);
    edges.sort((a,b)=>a[0]-b[0]);
    const par=Array.from({length:n+1},(_,i)=>i);
    const find=x=>par[x]===x?x:(par[x]=find(par[x]));
    let cost=0;
    for(const[w,u,v] of edges) if(find(u)!==find(v)){par[find(u)]=find(v);cost+=w;}
    return cost;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🔄',
      color: 'blue',
      content: `**Feasibility flow transformation:**\nEdge (u,v) with bounds [l,u]: subtract l → capacity (u-l), adjust demand at endpoints.\n- Node v: demand += l (needs l more units)\n- Node u: demand -= l (provides l more units)\n\nFor each node with demand d:\n- d > 0: add S' → node with capacity d\n- d < 0: add node → T' with capacity |d|\n\nFeasible iff max-flow(S'→T') = sum of all positive demands.\n\n**Applications:**\n- "Each pipe must carry at least l units": feasibility check\n- Minimum flow in network: feasibility + binary search\n- Circular scheduling with quotas: each time slot must serve a minimum number of requests`,
    },
  ],
}
