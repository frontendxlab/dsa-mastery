import type { Article } from '../articles'

export const topologicalSortArticle: Article = {
  slug: 'topological-sort',
  title: 'Topological Sort',
  emoji: '📐',
  tagline: 'Order nodes so all edges point forward. BFS (Kahn\'s) or DFS post-order.',
  description: 'Topological sort orders nodes in a DAG such that for every directed edge u→v, u comes before v. Two algorithms: Kahn\'s (BFS, process nodes with in-degree 0) and DFS post-order (reverse finish time). Core applications: course scheduling, build systems, dependency resolution, detecting cycles.',
  gradient: 'from-indigo-600 to-blue-700',
  topicSlug: 'graph',
  readTime: '16 min',
  sections: [
    {
      type: 'text',
      content: `Topological sort only works on DAGs (directed acyclic graphs). The key insight: a node can be processed once all its prerequisites are done. Kahn's algorithm uses in-degree counting — start with all nodes that have no dependencies, process them, reduce neighbors' in-degrees, add new zero-in-degree nodes. If any nodes remain after BFS, there's a cycle.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Both topological sort algorithms',
      code: `// Kahn's Algorithm (BFS) — detects cycles, gives one valid order
function topoSortKahn(n, edges) {
    const graph = Array.from({length: n}, () => []);
    const inDegree = new Array(n).fill(0);
    for (const [u, v] of edges) {
        graph[u].push(v);
        inDegree[v]++;
    }
    const queue = [];
    for (let i = 0; i < n; i++) if (inDegree[i] === 0) queue.push(i);
    const order = [];
    let i = 0;
    while (i < queue.length) {
        const node = queue[i++];
        order.push(node);
        for (const nei of graph[node]) {
            if (--inDegree[nei] === 0) queue.push(nei);
        }
    }
    return order.length === n ? order : []; // empty = cycle detected
}

// DFS Post-order — append to stack after visiting all descendants
function topoSortDFS(n, edges) {
    const graph = Array.from({length: n}, () => []);
    for (const [u, v] of edges) graph[u].push(v);
    const visited = new Array(n).fill(0); // 0=unvisited, 1=in-stack, 2=done
    const stack = [];
    let hasCycle = false;
    function dfs(node) {
        if (visited[node] === 1) { hasCycle = true; return; }
        if (visited[node] === 2) return;
        visited[node] = 1;
        for (const nei of graph[node]) dfs(nei);
        visited[node] = 2;
        stack.push(node);
    }
    for (let i = 0; i < n; i++) dfs(i);
    return hasCycle ? [] : stack.reverse();
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
      title: 'Course Schedule',
      url: 'https://leetcode.com/problems/course-schedule/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Detect cycle in directed graph',
          explanation: `If there's a cycle in prerequisites, some courses can never be finished. Model as directed graph, run DFS with 3-color visited array (unvisited/in-progress/done). If we visit an in-progress node, cycle found.`,
          code: `var canFinish = function(numCourses, prerequisites) {
    const graph=Array.from({length:numCourses},()=>[]);
    for(const [a,b] of prerequisites) graph[b].push(a);
    const vis=new Array(numCourses).fill(0);
    const dfs=(node)=>{
        if(vis[node]===1) return false; // cycle
        if(vis[node]===2) return true;  // already processed
        vis[node]=1;
        for(const nei of graph[node]) if(!dfs(nei)) return false;
        vis[node]=2;
        return true;
    };
    for(let i=0;i<numCourses;i++) if(!dfs(i)) return false;
    return true;
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Kahn\'s BFS — in-degree counting',
          explanation: `Build in-degree array. Start BFS from all nodes with in-degree 0. If we process all n nodes, no cycle. Count processed nodes — if count < n, cycle exists.`,
          code: `var canFinish = function(numCourses, prerequisites) {
    const graph=Array.from({length:numCourses},()=>[]);
    const inDeg=new Array(numCourses).fill(0);
    for(const [a,b] of prerequisites){graph[b].push(a);inDeg[a]++;}
    const q=[];
    for(let i=0;i<numCourses;i++) if(inDeg[i]===0) q.push(i);
    let count=0,i=0;
    while(i<q.length){
        const node=q[i++]; count++;
        for(const nei of graph[node]) if(--inDeg[nei]===0) q.push(nei);
    }
    return count===numCourses;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Course Schedule II',
      url: 'https://leetcode.com/problems/course-schedule-ii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Return actual topological order via Kahn\'s',
          explanation: `Same as Course Schedule I but record the processing order. Kahn's naturally gives a valid topological order.`,
          code: `var findOrder = function(numCourses, prerequisites) {
    const graph=Array.from({length:numCourses},()=>[]);
    const inDeg=new Array(numCourses).fill(0);
    for(const [a,b] of prerequisites){graph[b].push(a);inDeg[a]++;}
    const q=[];
    for(let i=0;i<numCourses;i++) if(inDeg[i]===0) q.push(i);
    const order=[];
    let i=0;
    while(i<q.length){
        const node=q[i++]; order.push(node);
        for(const nei of graph[node]) if(--inDeg[nei]===0) q.push(nei);
    }
    return order.length===numCourses?order:[];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Alien Dictionary',
      url: 'https://leetcode.com/problems/alien-dictionary/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Build DAG from adjacent word pairs, then topo sort',
          explanation: `Compare adjacent words letter by letter to extract ordering constraints. If word[i] is a prefix of word[i+1] but longer, invalid. Build directed graph of constraints, run Kahn's. If result doesn't include all unique chars, cycle (invalid).`,
          code: `var alienOrder = function(words) {
    const chars=new Set(words.join(''));
    const graph=new Map([...chars].map(c=>[c,[]]));
    const inDeg=new Map([...chars].map(c=>[c,0]));
    for(let i=0;i<words.length-1;i++){
        const [a,b]=words.slice(i,i+2);
        const len=Math.min(a.length,b.length);
        let found=false;
        for(let j=0;j<len;j++){
            if(a[j]!==b[j]){
                graph.get(a[j]).push(b[j]);
                inDeg.set(b[j],inDeg.get(b[j])+1);
                found=true; break;
            }
        }
        if(!found&&a.length>b.length) return '';
    }
    const q=[...[...inDeg].filter(([,v])=>v===0).map(([k])=>k)];
    let res=''; let i=0;
    while(i<q.length){
        const c=q[i++]; res+=c;
        for(const nei of graph.get(c)){
            inDeg.set(nei,inDeg.get(nei)-1);
            if(inDeg.get(nei)===0) q.push(nei);
        }
    }
    return res.length===chars.size?res:'';
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Minimum Height Trees',
      url: 'https://leetcode.com/problems/minimum-height-trees/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Trim leaves iteratively — topological approach on undirected tree',
          explanation: `Root(s) of MHT are the tree\'s center(s) — at most 2. Peel leaves layer by layer (like topo sort from degree-1 nodes). Remaining nodes after all leaves stripped = answer.`,
          code: `var findMinHeightTrees = function(n, edges) {
    if(n===1) return [0];
    const adj=Array.from({length:n},()=>new Set());
    for(const [a,b] of edges){adj[a].add(b);adj[b].add(a);}
    let leaves=[];
    for(let i=0;i<n;i++) if(adj[i].size===1) leaves.push(i);
    let remaining=n;
    while(remaining>2){
        remaining-=leaves.length;
        const newLeaves=[];
        for(const leaf of leaves){
            const nei=[...adj[leaf]][0];
            adj[nei].delete(leaf);
            if(adj[nei].size===1) newLeaves.push(nei);
        }
        leaves=newLeaves;
    }
    return leaves;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Parallel Courses',
      url: 'https://leetcode.com/problems/parallel-courses/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Kahn\'s BFS — count layers (semesters)',
          explanation: `Each BFS layer = one semester (all courses whose prerequisites are already taken). Count the number of layers. If any course remains unprocessed, cycle = -1.`,
          code: `var minimumSemesters = function(n, relations) {
    const graph=Array.from({length:n+1},()=>[]);
    const inDeg=new Array(n+1).fill(0);
    for(const [prev,next] of relations){graph[prev].push(next);inDeg[next]++;}
    let q=[];
    for(let i=1;i<=n;i++) if(inDeg[i]===0) q.push(i);
    let semesters=0,count=0;
    while(q.length){
        const next=[];
        semesters++;
        for(const node of q){
            count++;
            for(const nei of graph[node]) if(--inDeg[nei]===0) next.push(nei);
        }
        q=next;
    }
    return count===n?semesters:-1;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 6,
      title: 'Longest Increasing Path in a Matrix',
      url: 'https://leetcode.com/problems/longest-increasing-path-in-a-matrix/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Topological sort on implicit DAG',
          explanation: `Grid cells form a DAG: edges go from smaller to larger neighbors. Topo sort by value (Kahn's with in-degree = count of smaller neighbors). Process layer by layer — LIP length = number of layers.`,
          code: `var longestIncreasingPath = function(matrix) {
    const m=matrix.length,n=matrix[0].length;
    const dirs=[[0,1],[0,-1],[1,0],[-1,0]];
    const inDeg=Array.from({length:m},()=>new Array(n).fill(0));
    for(let r=0;r<m;r++) for(let c=0;c<n;c++)
        for(const [dr,dc] of dirs){
            const nr=r+dr,nc=c+dc;
            if(nr>=0&&nr<m&&nc>=0&&nc<n&&matrix[nr][nc]<matrix[r][c]) inDeg[r][c]++;
        }
    let q=[];
    for(let r=0;r<m;r++) for(let c=0;c<n;c++) if(inDeg[r][c]===0) q.push([r,c]);
    let len=0;
    while(q.length){
        const next=[];
        len++;
        for(const [r,c] of q)
            for(const [dr,dc] of dirs){
                const nr=r+dr,nc=c+dc;
                if(nr>=0&&nr<m&&nc>=0&&nc<n&&matrix[nr][nc]>matrix[r][c])
                    if(--inDeg[nr][nc]===0) next.push([nr,nc]);
            }
        q=next;
    }
    return len;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '📐',
      color: 'blue',
      content: `**Kahn's vs DFS topo sort:**\n- Kahn's: iterative, naturally counts "layers" (parallel courses, levels), easier cycle detection (count processed = n?)\n- DFS post-order: recursive, good when you also need DFS tree info\n\n**Cycle detection:** Kahn's — if processed count < n, cycle. DFS — if you revisit an in-progress node.\n\n**Applications pattern:**\n- "Can all tasks complete?" → topo sort, check for cycle\n- "In what order?" → return topo order\n- "How many steps/levels?" → count BFS layers in Kahn's\n- "Longest chain?" → DP on topo order: dp[node] = 1 + max(dp[prerequisites])`,
    },
  ],
}
