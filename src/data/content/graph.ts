import type { Article } from '../articles'

export const graphArticle: Article = {
  slug: 'graph-traversal',
  title: 'BFS & DFS — Graph Traversal',
  emoji: '🕸️',
  tagline: 'BFS for shortest paths. DFS for everything else.',
  description: 'Master BFS (level-order, shortest path, multi-source) and DFS (components, cycles, flood fill, topological sort). These two primitives underpin almost every graph algorithm.',
  gradient: 'from-cyan-400 to-sky-500',
  topicSlug: 'graph',
  readTime: '22 min',
  sections: [
    {
      type: 'text',
      content: `Every graph problem reduces to one of two primitives: BFS or DFS. BFS explores level by level (all nodes at distance 1, then distance 2...) making it perfect for shortest paths. DFS goes deep before wide, making it ideal for connectivity, cycles, and topological ordering. Once you internalize when to use each and their templates, you can solve almost any graph problem.`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'BFS vs DFS — When to Use Which',
    },
    {
      type: 'table',
      headers: ['Use BFS When...', 'Use DFS When...'],
      rows: [
        ['Need shortest path (unweighted)', 'Need to find all connected components'],
        ['Need level-by-level processing', 'Cycle detection'],
        ['Multi-source simultaneous spread', 'Topological sort (Kahn\'s or DFS-based)'],
        ['Word ladder / state-space minimum steps', 'Finding SCCs (Kosaraju\'s)'],
        ['Flood fill with minimum expansion', 'Tree traversal (preorder/inorder/postorder)'],
      ],
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'teal',
      content: `**For shortest path**: always BFS. With BFS, all nodes at distance x are visited before any node at distance x+1. The first time we reach the target, we're guaranteed it's the shortest path. DFS can find A path but not guaranteed shortest.`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Core Templates',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'BFS on grid (4-directional)',
      code: `const dr = [1, 0, -1, 0];
const dc = [0, 1, 0, -1];
const vis = Array.from({length: n}, () => new Array(m).fill(false));

const bfs = (startR, startC) => {
    const q = new Queue([[startR, startC]]);
    vis[startR][startC] = true;
    while (!q.isEmpty()) {
        const [r, c] = q.dequeue();
        for (let i = 0; i < 4; i++) {
            const nr = r + dr[i], nc = c + dc[i];
            if (nr >= 0 && nr < n && nc >= 0 && nc < m && !vis[nr][nc]) {
                vis[nr][nc] = true;
                q.enqueue([nr, nc]);
            }
        }
    }
};`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'DFS on graph (adjacency list)',
      code: `const vis = new Array(n).fill(false);

const dfs = (src) => {
    vis[src] = true;
    for (const neighbor of adj[src]) {
        if (!vis[neighbor]) dfs(neighbor);
    }
};

// Count connected components
let components = 0;
for (let i = 0; i < n; i++) {
    if (!vis[i]) { dfs(i); components++; }
}`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Cycle detection in directed graph (vis + path arrays)',
      code: `const vis = new Array(n).fill(false);
const path = new Array(n).fill(false);  // currently in DFS stack

const hasCycle = (src) => {
    vis[src] = true;
    path[src] = true;
    for (const node of adj[src]) {
        if (!vis[node]) { if (hasCycle(node)) return true; }
        else if (path[node]) return true;  // back edge = cycle
    }
    path[src] = false;  // leaving this path
    return false;
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
          label: 'Intuition 1: DFS flood fill — sink visited land',
          explanation: `Scan the grid. When we find unvisited land ('1'), increment count and DFS from that cell, marking all connected land as visited. The DFS "sinks" each island. Count = number of times we triggered DFS.`,
          code: `var numIslands = function(grid) {
    const n = grid.length, m = grid[0].length;
    const vis = Array.from({length: n}, () => new Array(m).fill(false));
    const dr = [1, 0, -1, 0], dc = [0, 1, 0, -1];

    const dfs = (r, c) => {
        vis[r][c] = true;
        for (let i = 0; i < 4; i++) {
            const nr = r + dr[i], nc = c + dc[i];
            if (nr >= 0 && nr < n && nc >= 0 && nc < m
                && !vis[nr][nc] && grid[nr][nc] === '1')
                dfs(nr, nc);
        }
    };

    let count = 0;
    for (let i = 0; i < n; i++)
        for (let j = 0; j < m; j++)
            if (!vis[i][j] && grid[i][j] === '1') { count++; dfs(i, j); }
    return count;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Surrounded Regions',
      url: 'https://leetcode.com/problems/surrounded-regions/',
      difficulty: 'Medium',
      note: 'Flood fill from boundary — invert the problem.',
      intuitions: [
        {
          label: 'Intuition 1: Wrong approach — try to find surrounded regions directly',
          explanation: `If we try to find 'O' regions that are completely surrounded, we need to check every 'O' and see if it touches the boundary. This gets complicated when 'O' regions are connected.`,
        },
        {
          label: 'Intuition 2: Flood fill from boundary first',
          explanation: `Invert the problem: instead of finding surrounded 'O's, find SAFE 'O's (connected to the boundary). DFS/BFS from every 'O' on the boundary, marking all connected 'O's as safe (temporarily 'S'). After processing all boundaries, anything still 'O' is surrounded → flip to 'X'. Then restore 'S' back to 'O'.`,
          code: `var solve = function(board) {
    const n = board.length, m = board[0].length;
    const dr = [1, 0, -1, 0], dc = [0, 1, 0, -1];

    const dfs = (r, c) => {
        if (r < 0 || r >= n || c < 0 || c >= m || board[r][c] !== 'O') return;
        board[r][c] = 'S';  // mark as safe
        for (let i = 0; i < 4; i++) dfs(r + dr[i], c + dc[i]);
    };

    // flood fill from all boundary 'O's
    for (let i = 0; i < m; i++) { dfs(0, i); dfs(n-1, i); }
    for (let i = 0; i < n; i++) { dfs(i, 0); dfs(i, m-1); }

    // flip: 'O' → surrounded → 'X', 'S' → safe → restore 'O'
    for (let i = 0; i < n; i++)
        for (let j = 0; j < m; j++) {
            if (board[i][j] === 'O') board[i][j] = 'X';
            else if (board[i][j] === 'S') board[i][j] = 'O';
        }
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Word Ladder',
      url: 'https://leetcode.com/problems/word-ladder/',
      difficulty: 'Hard',
      note: 'BFS on implicit graph — minimum transformation steps.',
      intuitions: [
        {
          label: 'Intuition 1: BFS state-space search',
          explanation: `Each word is a node. Two nodes are connected if words differ by exactly one character. We need minimum steps from beginWord to endWord → BFS.\n\nInstead of building the full graph (expensive), generate neighbors on the fly: for each position in the word, try all 26 letters. If the new word is in the wordList set, it's a valid neighbor. Remove from set once enqueued to avoid revisiting.`,
          code: `var ladderLength = function(beginWord, endWord, wordList) {
    const set = new Set(wordList);
    if (!set.has(endWord)) return 0;

    const q = new Queue([[beginWord, 1]]);
    set.delete(beginWord);

    while (!q.isEmpty()) {
        const [word, dist] = q.dequeue();
        if (word === endWord) return dist;

        for (let i = 0; i < word.length; i++) {
            for (let ch = 97; ch <= 122; ch++) {  // 'a' to 'z'
                const newWord = word.slice(0, i) + String.fromCharCode(ch) + word.slice(i+1);
                if (set.has(newWord)) {
                    q.enqueue([newWord, dist + 1]);
                    set.delete(newWord);
                }
            }
        }
    }
    return 0;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Course Schedule (Cycle in Directed Graph)',
      url: 'https://leetcode.com/problems/course-schedule/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DFS cycle detection (vis + path arrays)',
          explanation: `Build adjacency list from prerequisites. Run DFS for every unvisited node. Use two arrays: vis (ever visited) and path (currently in DFS call stack). If we reach a node that's in path, there's a cycle → return false.`,
          code: `var canFinish = function(numCourses, prerequisites) {
    const adj = Array.from({length: numCourses}, () => []);
    for (const [a, b] of prerequisites) adj[b].push(a);

    const vis = new Array(numCourses).fill(false);
    const path = new Array(numCourses).fill(false);

    const dfs = (node) => {
        vis[node] = true; path[node] = true;
        for (const nbr of adj[node]) {
            if (!vis[nbr]) { if (dfs(nbr)) return true; }
            else if (path[nbr]) return true;
        }
        path[node] = false;
        return false;
    };

    for (let i = 0; i < numCourses; i++)
        if (!vis[i] && dfs(i)) return false;
    return true;
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Kahn\'s algorithm (BFS topological sort)',
          explanation: `Compute indegree for every node. Enqueue all zero-indegree nodes. Process: dequeue a node, decrement indegree of neighbors, enqueue any that reach 0. If result array contains all n nodes at the end, no cycle. Otherwise cycle exists (some nodes never reached indegree 0).`,
          code: `var canFinish = function(numCourses, prerequisites) {
    const adj = Array.from({length: numCourses}, () => []);
    const indegree = new Array(numCourses).fill(0);
    for (const [a, b] of prerequisites) { adj[b].push(a); indegree[a]++; }

    const q = new Queue();
    for (let i = 0; i < numCourses; i++)
        if (indegree[i] === 0) q.enqueue(i);

    let processed = 0;
    while (!q.isEmpty()) {
        const node = q.dequeue();
        processed++;
        for (const nbr of adj[node]) {
            if (--indegree[nbr] === 0) q.enqueue(nbr);
        }
    }
    return processed === numCourses;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Number of Provinces (Connected Components)',
      url: 'https://leetcode.com/problems/number-of-provinces/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DFS/BFS — count components',
          explanation: `Input is adjacency MATRIX (not list). Convert to adj list first, or traverse directly. DFS from each unvisited city, marking all reachable cities as visited. Count = number of DFS calls.`,
          code: `var findCircleNum = function(isConnected) {
    const n = isConnected.length;
    const vis = new Array(n).fill(false);

    const dfs = (src) => {
        vis[src] = true;
        for (let j = 0; j < n; j++)
            if (isConnected[src][j] === 1 && !vis[j]) dfs(j);
    };

    let count = 0;
    for (let i = 0; i < n; i++)
        if (!vis[i]) { count++; dfs(i); }
    return count;
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Union-Find',
          explanation: `For each edge (i, j) in the matrix, union i and j. At the end, count distinct parent roots — each is one component.`,
          code: `var findCircleNum = function(isConnected) {
    const n = isConnected[0].length;
    const parent = Array.from({length: n}, (_, i) => i);
    const find = (x) => {
        while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; }
        return x;
    };
    const union = (x, y) => {
        const px = find(x), py = find(y);
        if (px !== py) parent[px] = py;
    };

    for (let i = 0; i < n; i++)
        for (let j = 0; j < n; j++)
            if (isConnected[i][j] === 1) union(i, j);

    let count = 0;
    for (let i = 0; i < n; i++) if (parent[i] === i) count++;
    return count;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'blue',
      content: `**Undirected graph adjacency matrix trick**: For adj[i][j] symmetric matrix, to avoid processing each edge twice, iterate only the top-right triangle:\n\`for (let i = 0; i < n; i++) for (let j = i+1; j < n; j++)\`\n\nTop-right is more common in practice.`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Kosaraju\'s SCC Algorithm',
    },
    {
      type: 'callout',
      icon: '🔑',
      color: 'gray',
      content: `SCC exists only in directed graphs. A strongly connected component is a maximal set where every node is reachable from every other node. Kosaraju's algorithm:\n1. Run DFS on original graph, record finish times (push to stack when done)\n2. Reverse all edges\n3. Process nodes by decreasing finish time (pop from stack). Each DFS on reversed graph = one SCC.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Kosaraju\'s SCC',
      code: `function kosaraju(adj) {
    const n = adj.length;
    const vis = new Array(n).fill(false);
    const stack = [];
    const adjRev = Array.from({length: n}, () => []);

    // Step 1: DFS, record finish order
    const dfs1 = (src) => {
        vis[src] = true;
        for (const node of adj[src]) if (!vis[node]) dfs1(node);
        stack.push(src);  // push when fully done
    };
    for (let i = 0; i < n; i++) if (!vis[i]) dfs1(i);

    // Build reversed graph
    vis.fill(false);
    for (let i = 0; i < n; i++)
        for (const node of adj[i]) adjRev[node].push(i);

    // Step 2: DFS on reversed graph in finish-time order
    const dfs2 = (src) => {
        vis[src] = true;
        for (const node of adjRev[src]) if (!vis[node]) dfs2(node);
    };

    let scc = 0;
    while (stack.length) {
        const src = stack.pop();
        if (!vis[src]) { scc++; dfs2(src); }
    }
    return scc;
}`,
    },
  ],
}
