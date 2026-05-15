import type { Article } from '../articles'

export const graphColoringArticle: Article = {
  slug: 'graph-coloring',
  title: 'Graph Coloring',
  emoji: '🎨',
  tagline: 'Assign colors so no adjacent vertices share a color. Greedy gives ≤ Δ+1 colors.',
  description: 'Graph coloring assigns colors to vertices so no adjacent pair shares a color. NP-hard in general (chromatic number), but: (1) bipartite graphs → 2-colorable (check with BFS); (2) greedy coloring → at most Δ+1 colors (Δ = max degree); (3) interval graphs → optimal greedy by endpoint; (4) planar graphs → 4-colorable (four color theorem). Useful for scheduling, register allocation, and map coloring.',
  gradient: 'from-rose-700 to-pink-800',
  topicSlug: 'graph',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `Greedy coloring: process vertices in some order, assign the smallest color not used by any neighbor. The result uses at most Δ+1 colors (Δ = maximum degree). For bipartite graphs: exactly 2 colors, detectable via BFS. For interval graphs (vertices = intervals, edges = overlapping intervals): sort by start time and color greedily — the chromatic number equals the maximum number of mutually overlapping intervals (=minimum rooms needed for meetings).`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Greedy graph coloring and bipartite check',
      code: `// Greedy coloring: at most Δ+1 colors
function greedyColoring(n, adjList) {
    const colors = new Array(n).fill(-1);
    for (let u = 0; u < n; u++) {
        const used = new Set(adjList[u].map(v => colors[v]).filter(c => c >= 0));
        let c = 0;
        while (used.has(c)) c++;
        colors[u] = c;
    }
    return { colors, numColors: Math.max(...colors) + 1 };
}

// Bipartite check (2-coloring)
function isBipartite(n, adjList) {
    const color = new Array(n).fill(-1);
    for (let start = 0; start < n; start++) {
        if (color[start] !== -1) continue;
        color[start] = 0;
        const q = [start]; let i = 0;
        while (i < q.length) {
            const u = q[i++];
            for (const v of adjList[u]) {
                if (color[v] === -1) { color[v] = 1 - color[u]; q.push(v); }
                else if (color[v] === color[u]) return false;
            }
        }
    }
    return true;
}

// Interval graph coloring (min colors = max overlapping intervals)
function intervalColoring(intervals) {
    const events = intervals.flatMap(([s, e], i) => [[s, 0, i], [e, 1, i]]);
    events.sort((a, b) => a[0] - b[0] || b[1] - a[1]); // ends before starts
    const available = [], colors = new Array(intervals.length);
    let maxColors = 0;
    for (const [, type, i] of events) {
        if (type === 0) { // start
            const c = available.length ? available.pop() : maxColors++;
            colors[i] = c;
        } else { // end
            available.push(colors[i]);
        }
    }
    return { colors, numColors: maxColors };
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
          label: 'Intuition 1: BFS 2-coloring',
          explanation: `Assign alternating colors (0 and 1) during BFS. If we ever need to assign the same color to two adjacent nodes: not bipartite.`,
          code: `var isBipartite = function(graph) {
    const n=graph.length,color=new Array(n).fill(-1);
    for(let s=0;s<n;s++){
        if(color[s]!==-1) continue;
        color[s]=0; const q=[s]; let i=0;
        while(i<q.length){
            const u=q[i++];
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
          label: 'Intuition 1: Build conflict graph, check bipartite',
          explanation: `Each person is a node. Dislikes are undirected edges. Can we split into two groups (no two dislikers in the same group)? = Is the graph 2-colorable = Is it bipartite?`,
          code: `var possibleBipartition = function(n, dislikes) {
    const adj=Array.from({length:n+1},()=>[]);
    for(const[a,b] of dislikes){adj[a].push(b);adj[b].push(a);}
    const color=new Array(n+1).fill(-1);
    for(let s=1;s<=n;s++){
        if(color[s]!==-1) continue;
        color[s]=0; const q=[s]; let i=0;
        while(i<q.length){
            const u=q[i++];
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
      title: 'Course Schedule (cycle detection)',
      url: 'https://leetcode.com/problems/course-schedule/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: 3-color DFS for directed graph cycle detection',
          explanation: `Colors: 0=unvisited, 1=in current path (gray), 2=fully processed (black). Cycle = we reach a gray node (ancestor in current DFS path).`,
          code: `var canFinish = function(numCourses, prerequisites) {
    const adj=Array.from({length:numCourses},()=>[]);
    for(const[a,b] of prerequisites) adj[b].push(a);
    const color=new Array(numCourses).fill(0);
    const dfs=(u)=>{
        if(color[u]===1) return false; // cycle
        if(color[u]===2) return true;
        color[u]=1;
        for(const v of adj[u]) if(!dfs(v)) return false;
        color[u]=2; return true;
    };
    for(let i=0;i<numCourses;i++) if(!dfs(i)) return false;
    return true;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🎨',
      color: 'red',
      content: `**Graph coloring complexity:**\n- General: NP-hard for chromatic number\n- 2-coloring (bipartite): O(V+E) with BFS\n- 3-coloring: NP-hard\n- Greedy (any order): O(V+E), uses ≤ Δ+1 colors\n- Interval graphs: optimal in O(n log n)\n\n**Special cases:**\n- Trees: always 2-colorable (bipartite)\n- Planar graphs: 4-colorable (Four Color Theorem)\n- Perfect graphs: chromatic number = clique number (polynomial)\n\n**Applications:** Register allocation (variables conflict if lifetimes overlap), scheduling (conflicting tasks need different time slots), map coloring (adjacent regions different colors).`,
    },
  ],
}
