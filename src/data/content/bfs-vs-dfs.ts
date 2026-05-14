import type { Article } from '../articles'

export const bfsVsDfsArticle: Article = {
  slug: 'bfs-vs-dfs',
  title: 'BFS vs DFS — When to Use Each',
  emoji: '🔀',
  tagline: 'Shortest path → BFS. Connected components → DFS. Know which in 10 seconds.',
  description: 'BFS and DFS are the two fundamental traversal strategies. Learn precisely when each applies, the key code templates, and how to recognize which one a problem needs from its constraints and output type.',
  gradient: 'from-blue-400 to-indigo-500',
  topicSlug: 'graph',
  readTime: '20 min',
  sections: [
    {
      type: 'text',
      content: `BFS and DFS both visit every node in a graph/tree, but they answer different questions. BFS finds the shortest path in unweighted graphs. DFS finds connected components, detects cycles, computes topological order, and enables backtracking. Choosing the wrong one either gives a wrong answer or TLEs.`,
    },
    {
      type: 'table',
      headers: ['Question', 'Use', 'Why'],
      rows: [
        ['Shortest path (unweighted)', 'BFS', 'Explores level-by-level — first time you reach a node is the shortest'],
        ['Connected components', 'DFS', 'Flood-fill: mark all reachable nodes from a starting point'],
        ['Cycle detection', 'DFS', 'Track state: unvisited → visiting → visited (3-color)'],
        ['Topological sort', 'DFS (Kahn\'s BFS)', 'DFS finish time ordering; or BFS on indegree-0 nodes'],
        ['Level-order output', 'BFS', 'Each queue flush = one level'],
        ['Backtracking / all paths', 'DFS', 'Recursion with undo naturally models path exploration'],
        ['Grid: min steps to reach target', 'BFS', 'Each step costs 1 — BFS gives shortest automatically'],
        ['Grid: flood fill / connected region size', 'DFS', 'Simpler recursive mark-and-expand'],
        ['SCC (strongly connected)', 'DFS × 2', 'Kosaraju: DFS finish order + DFS on reverse graph'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'BFS Template (Level-Aware)',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'BFS — shortest path, level-order, multi-source',
      code: `// Single-source BFS
function bfs(graph, start) {
    const visited = new Set([start]);
    let queue = [start];
    let level = 0;
    while (queue.length) {
        const nextQueue = [];
        for (const node of queue) {
            // process node at distance 'level'
            for (const neighbor of graph[node]) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    nextQueue.push(neighbor);
                }
            }
        }
        queue = nextQueue;
        level++;
    }
}

// Multi-source BFS (start from multiple nodes simultaneously)
// Used for: 01 Matrix, Rotting Oranges, walls-and-gates
function multiSourceBFS(grid, sources) {
    const dist = Array.from(grid, r => new Array(r.length).fill(Infinity));
    let queue = [];
    for (const [r, c] of sources) { dist[r][c] = 0; queue.push([r, c]); }
    const dirs = [[0,1],[0,-1],[1,0],[-1,0]];
    while (queue.length) {
        const [r, c] = queue.shift();
        for (const [dr, dc] of dirs) {
            const nr = r+dr, nc = c+dc;
            if (nr>=0 && nr<grid.length && nc>=0 && nc<grid[0].length
                && dist[nr][nc]===Infinity) {
                dist[nr][nc] = dist[r][c] + 1;
                queue.push([nr, nc]);
            }
        }
    }
    return dist;
}`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'DFS Template (With State)',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'DFS — cycle detection, components, topo sort',
      code: `// Iterative DFS (avoids stack overflow on large graphs)
function dfsIterative(graph, start) {
    const visited = new Set();
    const stack = [start];
    while (stack.length) {
        const node = stack.pop();
        if (visited.has(node)) continue;
        visited.add(node);
        for (const neighbor of graph[node])
            if (!visited.has(neighbor)) stack.push(neighbor);
    }
}

// Recursive DFS with 3-color cycle detection
// WHITE=0 (unvisited), GRAY=1 (in current path), BLACK=2 (done)
function hasCycle(graph, n) {
    const color = new Array(n).fill(0);
    const dfs = (node) => {
        color[node] = 1; // GRAY — currently visiting
        for (const neighbor of graph[node]) {
            if (color[neighbor] === 1) return true;  // back edge = cycle
            if (color[neighbor] === 0 && dfs(neighbor)) return true;
        }
        color[node] = 2; // BLACK — fully processed
        return false;
    };
    for (let i = 0; i < n; i++)
        if (color[i] === 0 && dfs(i)) return true;
    return false;
}

// DFS postorder = reverse topological sort
function topoSort(graph, n) {
    const visited = new Set(), order = [];
    const dfs = (node) => {
        visited.add(node);
        for (const nb of graph[node]) if (!visited.has(nb)) dfs(nb);
        order.push(node); // push AFTER all descendants
    };
    for (let i = 0; i < n; i++) if (!visited.has(i)) dfs(i);
    return order.reverse();
}`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Key Pattern: 0-1 BFS (Two-Queue / Deque)',
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'amber',
      content: `**0-1 BFS:** Edge weights are only 0 or 1. Use a deque: push weight-0 edges to the front, weight-1 edges to the back. Gives O(V+E) shortest path — faster than Dijkstra's O((V+E) log V) for this case.\n\nUsed when: moving in a direction costs 0 (free move, teleport) or 1 (step), and you want minimum cost.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: '0-1 BFS with deque',
      code: `function zerOneBFS(graph, start, n) {
    const dist = new Array(n).fill(Infinity);
    dist[start] = 0;
    const deque = [start]; // front = cost 0, back = cost 1
    while (deque.length) {
        const u = deque.shift();
        for (const [v, w] of graph[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                if (w === 0) deque.unshift(v); // free edge → front
                else deque.push(v);             // cost-1 edge → back
            }
        }
    }
    return dist;
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
      title: 'Rotting Oranges',
      url: 'https://leetcode.com/problems/rotting-oranges/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Multi-source BFS — all rotten oranges at time 0',
          explanation: 'Start BFS from ALL rotten oranges simultaneously (multi-source). Each level = 1 minute. Track remaining fresh count. If any fresh remains after BFS, return -1.',
          code: `var orangesRotting = function(grid) {
    const m=grid.length, n=grid[0].length;
    const q=[], dirs=[[0,1],[0,-1],[1,0],[-1,0]];
    let fresh=0;
    for(let r=0;r<m;r++) for(let c=0;c<n;c++){
        if(grid[r][c]===2) q.push([r,c,0]);
        if(grid[r][c]===1) fresh++;
    }
    let time=0;
    while(q.length){
        const [r,c,t]=q.shift();
        for(const [dr,dc] of dirs){
            const nr=r+dr, nc=c+dc;
            if(nr>=0&&nr<m&&nc>=0&&nc<n&&grid[nr][nc]===1){
                grid[nr][nc]=2; fresh--; time=t+1; q.push([nr,nc,t+1]);
            }
        }
    }
    return fresh?-1:time;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Number of Islands',
      url: 'https://leetcode.com/problems/number-of-islands/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DFS flood-fill — each component = one island',
          explanation: 'For each unvisited "1", DFS-flood all connected land to "0". Each DFS invocation = one island. DFS is simpler here since we just need component count, not distances.',
          code: `var numIslands = function(grid) {
    let count=0;
    const dfs=(r,c)=>{
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
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Pacific Atlantic Water Flow',
      url: 'https://leetcode.com/problems/pacific-atlantic-water-flow/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Reverse BFS from ocean borders inward',
          explanation: 'Instead of forward (find where each cell flows), reverse: BFS from Pacific borders and Atlantic borders separately, mark reachable cells. Answer = intersection. Reverse means: add neighbor if neighbor >= current (water flows from high to low, so backwards from high).',
          code: `var pacificAtlantic = function(heights) {
    const m=heights.length, n=heights[0].length;
    const bfs=(starts)=>{
        const reach=Array.from({length:m},()=>new Array(n).fill(false));
        const q=[...starts];
        for(const [r,c] of starts) reach[r][c]=true;
        const dirs=[[0,1],[0,-1],[1,0],[-1,0]];
        while(q.length){
            const [r,c]=q.shift();
            for(const [dr,dc] of dirs){
                const nr=r+dr,nc=c+dc;
                if(nr>=0&&nr<m&&nc>=0&&nc<n&&!reach[nr][nc]&&heights[nr][nc]>=heights[r][c]){
                    reach[nr][nc]=true; q.push([nr,nc]);
                }
            }
        }
        return reach;
    };
    const pac=[], atl=[];
    for(let r=0;r<m;r++){ pac.push([r,0]); atl.push([r,n-1]); }
    for(let c=0;c<n;c++){ pac.push([0,c]); atl.push([m-1,c]); }
    const pR=bfs(pac), aR=bfs(atl), res=[];
    for(let r=0;r<m;r++) for(let c=0;c<n;c++) if(pR[r][c]&&aR[r][c]) res.push([r,c]);
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Course Schedule (Topological Sort)',
      url: 'https://leetcode.com/problems/course-schedule/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DFS cycle detection (3-color)',
          explanation: 'Directed graph: prerequisites = edges. If any cycle exists, impossible. Use DFS with 3 colors: unvisited (0), in-progress (1), done (2). A back edge (reaches color=1) = cycle.',
          code: `var canFinish = function(n, prereqs) {
    const g=Array.from({length:n},()=>[]);
    for(const [a,b] of prereqs) g[b].push(a);
    const color=new Array(n).fill(0);
    const dfs=u=>{
        if(color[u]===1) return false; // cycle
        if(color[u]===2) return true;
        color[u]=1;
        for(const v of g[u]) if(!dfs(v)) return false;
        color[u]=2;
        return true;
    };
    for(let i=0;i<n;i++) if(!dfs(i)) return false;
    return true;
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: BFS — Kahn\'s topological sort',
          explanation: 'Process nodes with indegree 0 first. If all nodes processed = no cycle. This directly gives a valid course order.',
          code: `var canFinish = function(n, prereqs) {
    const g=Array.from({length:n},()=>[]);
    const ind=new Array(n).fill(0);
    for(const [a,b] of prereqs){g[b].push(a);ind[a]++;}
    const q=[];
    for(let i=0;i<n;i++) if(!ind[i]) q.push(i);
    let done=0;
    while(q.length){
        const u=q.shift(); done++;
        for(const v of g[u]) if(--ind[v]===0) q.push(v);
    }
    return done===n;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'More Worked Problems',
    },
    {
      type: 'problem',
      num: 5,
      title: 'Word Ladder',
      url: 'https://leetcode.com/problems/word-ladder/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: BFS on word graph — each edge = one letter change',
          explanation: `BFS where each "node" is a word and edges connect words that differ by exactly one letter. Shortest path = fewest transformations. Key optimization: for each word, try all 26 letters at each position and check if result is in the word set — O(26 × L) neighbors per word instead of O(wordList²).`,
          code: `var ladderLength = function(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;
    let queue = [beginWord], steps = 1;
    while (queue.length) {
        const next = [];
        for (const word of queue) {
            if (word === endWord) return steps;
            for (let i = 0; i < word.length; i++) {
                for (let c = 97; c <= 122; c++) {
                    const newWord = word.slice(0, i) + String.fromCharCode(c) + word.slice(i+1);
                    if (wordSet.has(newWord)) {
                        wordSet.delete(newWord);  // mark visited by removing
                        next.push(newWord);
                    }
                }
            }
        }
        queue = next;
        steps++;
    }
    return 0;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 6,
      title: 'Open the Lock',
      url: 'https://leetcode.com/problems/open-the-lock/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: BFS on state space — each state is a 4-digit combo',
          explanation: `State = current lock combination (string of 4 digits). Each state has 8 neighbors (turn each of 4 wheels up or down). BFS finds shortest path from "0000" to target avoiding deadends. Classic BFS on state graph where the "graph" is implicit.`,
          code: `var openLock = function(deadends, target) {
    const dead = new Set(deadends);
    if (dead.has('0000')) return -1;
    if (target === '0000') return 0;
    const visited = new Set(['0000']);
    let queue = ['0000'], steps = 0;
    const turn = (d, dir) => String((Number(d) + dir + 10) % 10);
    while (queue.length) {
        const next = [];
        steps++;
        for (const state of queue) {
            for (let i = 0; i < 4; i++) {
                for (const dir of [1, -1]) {
                    const ns = state.slice(0,i) + turn(state[i], dir) + state.slice(i+1);
                    if (ns === target) return steps;
                    if (!visited.has(ns) && !dead.has(ns)) {
                        visited.add(ns);
                        next.push(ns);
                    }
                }
            }
        }
        queue = next;
    }
    return -1;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 7,
      title: 'Walls and Gates (Multi-source BFS)',
      url: 'https://leetcode.com/problems/walls-and-gates/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Multi-source BFS from all gates simultaneously',
          explanation: `If you BFS from each gate separately it's O(n² × m²). Instead, start BFS from ALL gates at once (multi-source). Each cell gets the distance to its nearest gate in one pass. Cells reachable from a closer gate get filled before farther ones.`,
          code: `var wallsAndGates = function(rooms) {
    const m = rooms.length, n = rooms[0].length;
    const INF = 2147483647, q = [];
    for (let r = 0; r < m; r++)
        for (let c = 0; c < n; c++)
            if (rooms[r][c] === 0) q.push([r, c]);
    const dirs = [[0,1],[0,-1],[1,0],[-1,0]];
    let i = 0;
    while (i < q.length) {
        const [r, c] = q[i++];
        for (const [dr, dc] of dirs) {
            const nr = r+dr, nc = c+dc;
            if (nr>=0 && nr<m && nc>=0 && nc<n && rooms[nr][nc] === INF) {
                rooms[nr][nc] = rooms[r][c] + 1;
                q.push([nr, nc]);
            }
        }
    }
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 8,
      title: 'Clone Graph',
      url: 'https://leetcode.com/problems/clone-graph/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: BFS with a clone map',
          explanation: `BFS traversal. For each node encountered, create its clone if not already created. For each edge in original, add the corresponding edge to the clone. Use a Map from original node → clone node to avoid re-creating.`,
          code: `var cloneGraph = function(node) {
    if (!node) return null;
    const clones = new Map();
    const queue = [node];
    clones.set(node, new Node(node.val));
    while (queue.length) {
        const curr = queue.shift();
        for (const nb of curr.neighbors) {
            if (!clones.has(nb)) {
                clones.set(nb, new Node(nb.val));
                queue.push(nb);
            }
            clones.get(curr).neighbors.push(clones.get(nb));
        }
    }
    return clones.get(node);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧠',
      color: 'green',
      content: `**The 30-second BFS vs DFS decision:**\n1. "Minimum steps / shortest path" → **BFS** (never DFS for shortest path in unweighted graph)\n2. "Can reach / connected / flood fill" → **DFS** (simpler code)\n3. "All cells within distance k" → **BFS** level-by-level\n4. "Cycle detection / dependency order" → **DFS** with colors\n5. "Start from multiple sources" → **Multi-source BFS**\n6. "Binary edge weights (0 or 1)" → **0-1 BFS** (deque)\n7. "State space search (lock, word ladder)" → **BFS** (states as nodes, transitions as edges)`,
    },
  ],
}
