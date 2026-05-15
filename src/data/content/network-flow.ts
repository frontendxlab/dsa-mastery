import type { Article } from '../articles'

export const networkFlowArticle: Article = {
  slug: 'network-flow',
  title: 'Network Flow',
  emoji: '🌊',
  tagline: 'Max flow = min cut. Dinic\'s runs in O(V²E). Models matching, assignment, feasibility.',
  description: 'Network flow finds the maximum amount of "flow" from source to sink respecting edge capacities. The max-flow min-cut theorem: max flow equals min cut capacity. Algorithms: Ford-Fulkerson (DFS, slow), Edmonds-Karp (BFS augmenting paths, O(VE²)), Dinic\'s (level graph + blocking flow, O(V²E), O(E√V) for unit graphs). Applications: bipartite matching, assignment problems, project selection.',
  gradient: 'from-cyan-600 to-blue-700',
  topicSlug: 'graph',
  readTime: '18 min',
  sections: [
    {
      type: 'text',
      content: `Network flow models problems where you want to route maximum "stuff" (data, goods, people) through a network with capacities. The key insight: max-flow equals min-cut — the bottleneck is always some set of edges whose total capacity limits all paths from source to sink. Dinic's algorithm uses BFS to build a "level graph" then finds blocking flows layer by layer — much faster than naive augmenting paths.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: "Dinic's max-flow algorithm",
      code: `class MaxFlow {
    constructor(n) {
        this.n = n;
        this.graph = Array.from({length: n}, () => []);
    }
    addEdge(u, v, cap) {
        this.graph[u].push({to: v, cap, rev: this.graph[v].length});
        this.graph[v].push({to: u, cap: 0, rev: this.graph[u].length - 1});
    }
    bfs(s, t, level) {
        level.fill(-1); level[s] = 0;
        const queue = [s]; let i = 0;
        while (i < queue.length) {
            const u = queue[i++];
            for (const e of this.graph[u]) {
                if (e.cap > 0 && level[e.to] < 0) {
                    level[e.to] = level[u] + 1;
                    queue.push(e.to);
                }
            }
        }
        return level[t] >= 0;
    }
    dfs(u, t, f, level, iter) {
        if (u === t) return f;
        for (; iter[u] < this.graph[u].length; iter[u]++) {
            const e = this.graph[u][iter[u]];
            if (e.cap > 0 && level[e.to] === level[u] + 1) {
                const d = this.dfs(e.to, t, Math.min(f, e.cap), level, iter);
                if (d > 0) {
                    e.cap -= d;
                    this.graph[e.to][e.rev].cap += d;
                    return d;
                }
            }
        }
        return 0;
    }
    maxflow(s, t) {
        const level = new Array(this.n), iter = new Array(this.n);
        let flow = 0;
        while (this.bfs(s, t, level)) {
            iter.fill(0);
            let f;
            while ((f = this.dfs(s, t, Infinity, level, iter)) > 0) flow += f;
        }
        return flow;
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
      title: 'Max Flow / Min Cut (Network Flow)',
      url: 'https://leetcode.com/problems/minimum-number-of-days-to-disconnect-island/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: 4-connectivity — at most 2 cells need removal',
          explanation: `If already disconnected: 0 days. If removing 1 cell disconnects: 1 day (check all cells). Otherwise: always 2 days (remove corner of any land cell). This avoids flow entirely — the specific grid structure bounds the answer.`,
          code: `var minDays = function(grid) {
    const m=grid.length,n=grid[0].length;
    const dirs=[[0,1],[0,-1],[1,0],[-1,0]];
    const countIslands=()=>{
        const vis=Array.from({length:m},()=>new Array(n).fill(false));
        let count=0;
        const dfs=(r,c)=>{
            if(r<0||r>=m||c<0||c>=n||vis[r][c]||!grid[r][c]) return;
            vis[r][c]=true;
            dirs.forEach(([dr,dc])=>dfs(r+dr,c+dc));
        };
        for(let r=0;r<m;r++) for(let c=0;c<n;c++)
            if(grid[r][c]&&!vis[r][c]){dfs(r,c);count++;}
        return count;
    };
    if(countIslands()!==1) return 0;
    for(let r=0;r<m;r++) for(let c=0;c<n;c++) if(grid[r][c]){
        grid[r][c]=0;
        if(countIslands()!==1) return 1;
        grid[r][c]=1;
    }
    return 2;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Maximum Students Taking Exam',
      url: 'https://leetcode.com/problems/maximum-students-taking-exam/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Bipartite matching via max flow',
          explanation: `Seat grid is bipartite: even-column seats on left, odd-column seats on right. Cheating occurs across adjacent same-row and diagonal seats between left and right. Add source→left seat edges, right seat→sink edges (cap 1 each). Add edges between seats that could cheat. Max students = total seats - max matching (König's theorem).`,
          code: `var maxStudents = function(seats) {
    const m=seats.length,n=seats[0].length;
    const good=(r,c)=>r>=0&&r<m&&c>=0&&c<n&&seats[r][c]==='.',
    // Bitmask DP approach (simpler for this problem):
    // dp[row][mask] = max students in rows 0..row with mask for current row
    dp=Array.from({length:m},()=>new Array(1<<n).fill(-1));
    const validMask=(row,mask)=>{
        // No two adjacent in same row
        if(mask&(mask>>1)) return false;
        // Only seat in '.' positions
        for(let c=0;c<n;c++) if((mask>>c)&1&&seats[row][c]==='#') return false;
        return true;
    };
    dp[0]=new Array(1<<n).fill(-1);
    for(let mask=0;mask<(1<<n);mask++)
        if(validMask(0,mask)) dp[0][mask]=mask.toString(2).split('1').length-1;
    for(let r=1;r<m;r++){
        dp[r]=new Array(1<<n).fill(-1);
        for(let cur=0;cur<(1<<n);cur++){
            if(!validMask(r,cur)) continue;
            const curCnt=cur.toString(2).split('1').length-1;
            for(let prev=0;prev<(1<<n);prev++){
                if(dp[r-1][prev]===-1) continue;
                // No cheating diagonals: cur should not have 1 at c where prev has 1 at c-1 or c+1
                if(cur&(prev<<1)||cur&(prev>>1)) continue;
                dp[r][cur]=Math.max(dp[r][cur],dp[r-1][prev]+curCnt);
            }
        }
    }
    return Math.max(...dp[m-1]);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Swim in Rising Water',
      url: 'https://leetcode.com/problems/swim-in-rising-water/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Binary search + BFS/Dijkstra',
          explanation: `Find minimum T such that a path exists from (0,0) to (n-1,n-1) using only cells with elevation ≤ T. Binary search on T (0 to n²-1). For each T, BFS/DFS to check connectivity.`,
          code: `var swimInWater = function(grid) {
    const n=grid.length;
    const canReach=(t)=>{
        if(grid[0][0]>t) return false;
        const vis=Array.from({length:n},()=>new Array(n).fill(false));
        vis[0][0]=true;
        const q=[[0,0]]; let i=0;
        while(i<q.length){
            const[r,c]=q[i++];
            if(r===n-1&&c===n-1) return true;
            for(const[dr,dc] of [[0,1],[0,-1],[1,0],[-1,0]]){
                const[nr,nc]=[r+dr,c+dc];
                if(nr>=0&&nr<n&&nc>=0&&nc<n&&!vis[nr][nc]&&grid[nr][nc]<=t){
                    vis[nr][nc]=true; q.push([nr,nc]);
                }
            }
        }
        return false;
    };
    let lo=0,hi=n*n-1;
    while(lo<hi){const mid=(lo+hi)>>1;canReach(mid)?hi=mid:lo=mid+1;}
    return lo;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Minimum Cost to Make at Least One Valid Path in a Grid',
      url: 'https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: 0-1 BFS (Dijkstra with 0/1 edge weights)',
          explanation: `Following the existing direction costs 0, changing direction costs 1. 0-1 BFS: use a deque. Add cost-0 edges to front, cost-1 edges to back. This gives shortest path (min cost) without full Dijkstra.`,
          code: `var minCost = function(grid) {
    const m=grid.length,n=grid[0].length;
    const dirs=[[0,1],[0,-1],[1,0],[-1,0]]; // right=1,left=2,down=3,up=4
    const dist=Array.from({length:m},()=>new Array(n).fill(Infinity));
    dist[0][0]=0;
    const dq=[[0,0]]; // deque: [r,c]
    while(dq.length){
        const[r,c]=dq.shift();
        for(let d=0;d<4;d++){
            const[nr,nc]=[r+dirs[d][0],c+dirs[d][1]];
            if(nr<0||nr>=m||nc<0||nc>=n) continue;
            const cost=grid[r][c]-1===d?0:1; // 0 if following arrow
            const nd=dist[r][c]+cost;
            if(nd<dist[nr][nc]){
                dist[nr][nc]=nd;
                cost===0?dq.unshift([nr,nc]):dq.push([nr,nc]);
            }
        }
    }
    return dist[m-1][n-1];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🌊',
      color: 'blue',
      content: `**Max-flow min-cut theorem:** max flow from s to t = min capacity of any s-t cut.\n\n**Algorithm selection:**\n- Edmonds-Karp (BFS augmenting): O(VE²) — simple to implement\n- Dinic's: O(V²E), O(E√V) for unit capacity — fast in practice\n- For bipartite matching: any max-flow works; O(E√V) with Hopcroft-Karp\n\n**Modeling tricks:**\n- Node capacity: split node v into v_in → v_out with edge capacity = node limit\n- Bidirectional edge: add both directions with their capacities\n- Lower bounds on flow: shift using supply/demand at nodes\n\n**Applications:** bipartite matching (König's: max matching = total - max flow complement), project selection (each project profits/costs modeled as source/sink edges), circulation with demands.`,
    },
  ],
}
