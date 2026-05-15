import type { Article } from '../articles'

export const functionalGraphsArticle: Article = {
  slug: 'functional-graphs',
  title: 'Functional Graphs',
  emoji: '🔁',
  tagline: 'Every node has exactly one outgoing edge. Each component = rho (ρ) shape: tail + cycle.',
  description: 'A functional graph has exactly one outgoing edge per node (each node maps to exactly one other node). Every connected component has a unique structure: a "rho" shape — a tail leading into a cycle. Applications: cycle detection in single-linked structures, finding k-th element in an iterated function sequence, counting cycles in permutations, and periodic sequence analysis.',
  gradient: 'from-violet-800 to-purple-950',
  topicSlug: 'graph',
  readTime: '13 min',
  sections: [
    {
      type: 'text',
      content: `In a functional graph f: [n]→[n], each connected component has exactly one cycle (the "loop" of the rho). Detect cycles: DFS coloring (unvisited/in-stack/done) or Floyd's algorithm. Find k-th iterate f^k(x): binary lifting — precompute f^(2^j)(x) for j = 0..log(k), then compose to get f^k(x) in O(log k). Count element types: nodes on cycles vs nodes on tails.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Functional graph analysis',
      code: `// Analyze functional graph f: each f[i] = successor of node i
function analyzeFunctionalGraph(n, f) {
    const onCycle = new Array(n).fill(false);
    const visited = new Array(n).fill(0); // 0=unvisited, 1=in progress, 2=done
    const cycleId = new Array(n).fill(-1);
    const cycles = [];

    function dfs(start) {
        const path = [];
        let u = start;
        while (visited[u] === 0) {
            visited[u] = 1;
            path.push(u);
            u = f[u];
        }
        if (visited[u] === 1) {
            // Found a cycle — extract it from path
            const cycleStart = path.indexOf(u);
            const cycle = path.slice(cycleStart);
            const cid = cycles.length;
            cycles.push(cycle);
            for (const v of cycle) { onCycle[v] = true; cycleId[v] = cid; }
        }
        for (const v of path) visited[v] = 2;
    }

    for (let i = 0; i < n; i++) if (!visited[i]) dfs(i);
    return { onCycle, cycleId, cycles };
}

// Binary lifting: compute f^k(x) in O(log k) after O(n log MAX_K) preprocessing
function buildLifting(n, f, maxK) {
    const LOG = Math.ceil(Math.log2(maxK + 1)) + 1;
    const anc = Array.from({length: n}, (_, i) => [f[i]]);
    for (let j = 1; j < LOG; j++)
        for (let i = 0; i < n; i++)
            anc[i].push(anc[anc[i][j-1]][j-1]);
    return {
        kthIterate: (x, k) => {
            for (let j = 0; k > 0; j++, k >>= 1)
                if (k & 1) x = anc[x][j];
            return x;
        }
    };
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
      title: 'Linked List Cycle II (find cycle entry)',
      url: 'https://leetcode.com/problems/linked-list-cycle-ii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Floyd\'s — find meeting point, then find cycle entry',
          explanation: `Phase 1: fast/slow pointers meet inside cycle. Phase 2: reset slow to head, keep fast at meeting point, advance both at speed 1 — they meet at cycle entry. Why: if head-to-entry = h, meeting point = h mod cycle length from entry. Second phase brings them to entry simultaneously.`,
          code: `var detectCycle = function(head) {
    let [slow,fast]=[head,head];
    while(fast&&fast.next){
        slow=slow.next; fast=fast.next.next;
        if(slow===fast){
            slow=head;
            while(slow!==fast){slow=slow.next;fast=fast.next;}
            return slow;
        }
    }
    return null;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Maximum Employees to Be Invited to a Meeting',
      url: 'https://leetcode.com/problems/maximum-employees-to-be-invited-to-a-meeting/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Functional graph — find cycles and chain lengths',
          explanation: `Each employee has one favorite = functional graph. Components: rho-shaped. Case 1: cycles of length ≥ 3 → max cycle length. Case 2: 2-cycles (mutual favorites) → each pair can invite chains hanging off them. Sum 2-cycle contributions.`,
          code: `var maximumInvitations = function(favorite) {
    const n=favorite.length;
    const inDeg=new Array(n).fill(0);
    for(const f of favorite) inDeg[f]++;
    // Topological sort to find non-cycle nodes (tails)
    const chainLen=new Array(n).fill(1);
    const q=[]; for(let i=0;i<n;i++) if(inDeg[i]===0) q.push(i);
    let qi=0;
    while(qi<q.length){
        const u=q[qi++], v=favorite[u];
        chainLen[v]=Math.max(chainLen[v],chainLen[u]+1);
        if(--inDeg[v]===0) q.push(v);
    }
    // Find cycles
    let maxCycle=0, sumPairs=0;
    const vis=new Array(n).fill(false);
    for(let i=0;i<n;i++){
        if(vis[i]||inDeg[i]===0) continue;
        let len=0, cur=i;
        while(!vis[cur]){vis[cur]=true;cur=favorite[cur];len++;}
        if(len===2) sumPairs+=chainLen[i]+chainLen[favorite[i]];
        else maxCycle=Math.max(maxCycle,len);
    }
    return Math.max(maxCycle,sumPairs);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Happy Number',
      url: 'https://leetcode.com/problems/happy-number/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Detect cycle with Floyd\'s',
          explanation: `"Next" function: sum of squares of digits. If we reach 1: happy. If we enter a cycle not involving 1: not happy. Floyd's cycle detection determines which case.`,
          code: `var isHappy = function(n) {
    const next=x=>{let s=0;while(x){s+=(x%10)**2;x=Math.floor(x/10);}return s;};
    let [slow,fast]=[n,next(n)];
    while(fast!==1&&slow!==fast){slow=next(slow);fast=next(next(fast));}
    return fast===1;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🔁',
      color: 'blue',
      content: `**Functional graph structure:** Every component = one cycle + trees hanging off the cycle nodes. Total: n nodes, n edges (functional graph is a graph where out-degree = 1).\n\n**Rho (ρ) shape:** Named after the Greek letter — a tail leading into a cycle.\n\n**Key operations:**\n- Cycle detection: Floyd's (O(n)) or DFS coloring (O(n))\n- Find cycle entry: Floyd's phase 2\n- k-th iterate: binary lifting O(n log k) preprocessing, O(log k) per query\n- Count nodes on cycles vs tails: topological sort (tails have zero in-degree in functional graph)\n\n**Applications:** Permutation cycle structure, birthday paradox, Pollard's rho factorization, iterated hash functions.`,
    },
  ],
}
