import type { Article } from '../articles'

export const bipartiteArticle: Article = {
  slug: 'bipartite',
  title: 'Bipartite Graphs & Matching',
  emoji: '⚖️',
  tagline: '2-colorable = bipartite. BFS/DFS detects it. Matching pairs them up optimally.',
  description: 'A bipartite graph divides vertices into two groups with edges only between groups (no edges within a group). Check with 2-coloring (BFS/DFS). Maximum bipartite matching finds the most pairs. Many scheduling, assignment, and conflict-detection problems reduce to bipartite checking or matching.',
  gradient: 'from-teal-600 to-cyan-700',
  topicSlug: 'graph',
  readTime: '16 min',
  sections: [
    {
      type: 'text',
      content: `A graph is bipartite if its vertices can be split into two groups such that every edge goes between the groups (no edge within a group). Equivalently: the graph has no odd-length cycle. Equivalently: it's 2-colorable (can be 2-colored with no two adjacent vertices sharing a color). Check in O(V+E) with BFS/DFS.`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Bipartite Check — 2-Coloring',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Check if graph is bipartite using BFS 2-coloring',
      code: `function isBipartite(graph) {
    const n = graph.length;
    const color = new Array(n).fill(-1); // -1=uncolored, 0=left, 1=right

    for (let start = 0; start < n; start++) {
        if (color[start] !== -1) continue; // already colored
        color[start] = 0;
        const queue = [start];
        while (queue.length) {
            const u = queue.shift();
            for (const v of graph[u]) {
                if (color[v] === -1) {
                    color[v] = 1 - color[u]; // opposite color
                    queue.push(v);
                } else if (color[v] === color[u]) {
                    return false; // same color = odd cycle = not bipartite
                }
            }
        }
    }
    return true;
}

// DFS version:
function isBipartiteDFS(graph) {
    const color = new Array(graph.length).fill(-1);
    const dfs = (u, c) => {
        color[u] = c;
        for (const v of graph[u]) {
            if (color[v] === c) return false;
            if (color[v] === -1 && !dfs(v, 1-c)) return false;
        }
        return true;
    };
    for (let i = 0; i < graph.length; i++)
        if (color[i] === -1 && !dfs(i, 0)) return false;
    return true;
}`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Maximum Bipartite Matching (Hungarian / Augmenting Path)',
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'teal',
      content: `**Maximum bipartite matching**: Find the maximum set of edges where no vertex appears twice.\n\nAugmenting path algorithm (O(V×E)):\n1. For each left vertex, try to match it to an unmatched right vertex\n2. If right vertex is already matched, try to re-match its current left partner to another right vertex (augmenting path)\n3. If successful, increase matching count\n\nKönig's theorem: min vertex cover = max matching in bipartite graph.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Hungarian algorithm for maximum bipartite matching',
      code: `function maxBipartiteMatching(graph, leftSize, rightSize) {
    const matchL = new Array(leftSize).fill(-1);  // matchL[i] = right node matched to left i
    const matchR = new Array(rightSize).fill(-1); // matchR[j] = left node matched to right j

    function dfs(u, visited) {
        for (const v of graph[u]) {
            if (visited[v]) continue;
            visited[v] = true;
            if (matchR[v] === -1 || dfs(matchR[v], visited)) {
                matchL[u] = v;
                matchR[v] = u;
                return true;
            }
        }
        return false;
    }

    let matching = 0;
    for (let u = 0; u < leftSize; u++) {
        const visited = new Array(rightSize).fill(false);
        if (dfs(u, visited)) matching++;
    }
    return { matching, matchL, matchR };
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
          label: 'Intuition 1: BFS 2-coloring — check for odd cycles',
          explanation: `Try to color the graph with 2 colors such that no adjacent vertices share a color. Use BFS: assign color 0 to start, alternate colors for neighbors. If any neighbor has the same color as current vertex, graph is NOT bipartite (odd cycle found).`,
          code: `var isBipartite = function(graph) {
    const n=graph.length, color=new Array(n).fill(-1);
    for(let s=0;s<n;s++){
        if(color[s]!==-1) continue;
        color[s]=0;
        const q=[s];
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
          label: 'Intuition 1: Build conflict graph, check bipartite',
          explanation: `Build graph where dislikes[i] = [a,b] creates edge a↔b. If the conflict graph is bipartite, we can split into two groups where no two people in the same group dislike each other.`,
          code: `var possibleBipartition = function(n, dislikes) {
    const adj=Array.from({length:n+1},()=>[]);
    for(const [a,b] of dislikes){adj[a].push(b);adj[b].push(a);}
    const color=new Array(n+1).fill(-1);
    for(let s=1;s<=n;s++){
        if(color[s]!==-1) continue;
        color[s]=0;
        const q=[s];
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
      title: 'Find if Path Exists in Graph',
      url: 'https://leetcode.com/problems/find-if-path-exists-in-graph/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: BFS/DFS or Union-Find',
          explanation: `Simple path existence: BFS from source, check if destination is reachable. Or Union-Find: union all edges, check if source and destination have same root.`,
          code: `var validPath = function(n, edges, source, destination) {
    const parent=Array.from({length:n},(_,i)=>i);
    const find=x=>parent[x]===x?x:(parent[x]=find(parent[x]));
    for(const [u,v] of edges) parent[find(u)]=find(v);
    return find(source)===find(destination);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Maximum Students Taking Exam (Bipartite Matching)',
      url: 'https://leetcode.com/problems/maximum-students-taking-exam/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Bipartite matching — min vertex cover = n - max matching',
          explanation: `Seats form a bipartite graph (odd columns = left, even columns = right). Two adjacent seats create an edge (cheating pair). Maximum independent set = total valid seats - min vertex cover = n - max matching (König's theorem).`,
          code: `var maxStudents = function(seats) {
    const m=seats.length, n=seats[0].length;
    // Build bipartite graph between even and odd columns
    const adj=Array.from({length:m*n},()=>[]);
    let available=0;
    for(let r=0;r<m;r++) for(let c=0;c<n;c++){
        if(seats[r][c]==='.'){
            available++;
            // Connect to seats that can cheat: upper-left, upper-right
            if(r>0&&c>0&&seats[r-1][c-1]==='.') adj[(r-1)*n+c-1].push(r*n+c);
            if(r>0&&c<n-1&&seats[r-1][c+1]==='.') adj[(r-1)*n+c+1].push(r*n+c);
        }
    }
    // Max matching via augmenting paths
    const match=new Array(m*n).fill(-1);
    let matching=0;
    const dfs=(u,vis)=>{
        for(const v of adj[u]){
            if(vis[v]) continue; vis[v]=true;
            if(match[v]===-1||dfs(match[v],vis)){match[v]=u;return true;}
        }
        return false;
    };
    for(let r=0;r<m;r++) for(let c=0;c<n;c+=2){ // left side: even columns
        if(seats[r][c]==='.'){
            const vis=new Array(m*n).fill(false);
            if(dfs(r*n+c,vis)) matching++;
        }
    }
    return available-matching;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧠',
      color: 'teal',
      content: `**Bipartite problem signals:**\n- "Can we divide into two groups with no conflict within a group?" → bipartite check\n- "Two-color problem / enemy-of-enemy-is-friend" → bipartite check\n- "Max pairs / assignments between two sets" → bipartite matching\n- "Min vertex cover of bipartite graph" = max matching (König's theorem)\n- "Max independent set of bipartite graph" = n - max matching\n\n**Bipartite check = no odd cycle:**\n- BFS 2-coloring: O(V+E), works for disconnected graphs\n- Union-Find: doesn't directly detect odd cycles (need special handling)`,
    },
  ],
}
