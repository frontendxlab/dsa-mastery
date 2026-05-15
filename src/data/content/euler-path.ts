import type { Article } from '../articles'

export const eulerPathArticle: Article = {
  slug: 'euler-path',
  title: 'Euler Path & Circuit',
  emoji: '🔁',
  tagline: 'Visit every EDGE exactly once. Hierholzer\'s algorithm. Degree condition check.',
  description: "An Euler path visits every edge exactly once. An Euler circuit does so and returns to the start. Condition for undirected: connected + 0 or 2 odd-degree nodes (0 for circuit, 2 for path). For directed: connected + each node has in-degree = out-degree (circuit), or exactly one node has out-degree - in-degree = 1 (start) and one has in-degree - out-degree = 1 (end). Hierholzer's algorithm constructs the path in O(E).",
  gradient: 'from-sky-500 to-blue-600',
  topicSlug: 'graph',
  readTime: '13 min',
  sections: [
    {
      type: 'text',
      content: `Hierholzer's algorithm: start at a valid start node. Follow edges greedily (DFS), marking edges as used. When stuck (no more edges), backtrack and insert current node into the result. This builds the Euler path in reverse — the recursive DFS post-order naturally handles dead-ends before continuing the main path. Key: use adjacency list with efficient edge removal (splice or pointer).`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: "Hierholzer's algorithm for directed graph",
      code: `// Directed Euler path (Hierholzer's)
function eulerPath(n, edges) {
    const adj = Array.from({length: n}, () => []);
    const inDeg = new Array(n).fill(0);
    const outDeg = new Array(n).fill(0);
    for (const [u, v] of edges) {
        adj[u].push(v);
        outDeg[u]++;
        inDeg[v]++;
    }

    // Find start node: prefer node with outDeg - inDeg = 1, else any node with outDeg > 0
    let start = 0;
    for (let i = 0; i < n; i++) if (outDeg[i] - inDeg[i] === 1) { start = i; break; }

    // Hierholzer's: iterative post-order
    const stack = [start], path = [];
    while (stack.length) {
        const u = stack.at(-1);
        if (adj[u].length) {
            stack.push(adj[u].pop()); // use next edge
        } else {
            path.push(stack.pop()); // dead end → add to path
        }
    }
    return path.reverse(); // O(E) total
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
      title: 'Reconstruct Itinerary',
      url: 'https://leetcode.com/problems/reconstruct-itinerary/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Hierholzer\'s on directed graph (lexicographically smallest)',
          explanation: `Sort adjacency lists so we always try lexicographically smallest airport first. Then run Hierholzer's: DFS from "JFK", push to result when no more edges. Reverse result.`,
          code: `var findItinerary = function(tickets) {
    const adj={};
    for(const[src,dst] of tickets){
        (adj[src]=adj[src]||[]).push(dst);
    }
    for(const k in adj) adj[k].sort(); // sort for lex order
    const res=[];
    const dfs=(airport)=>{
        while(adj[airport]&&adj[airport].length)
            dfs(adj[airport].shift()); // pop front for lex order
        res.push(airport);
    };
    dfs('JFK');
    return res.reverse();
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Valid Arrangement of Pairs',
      url: 'https://leetcode.com/problems/valid-arrangement-of-pairs/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Directed Euler path — find start, run Hierholzer\'s',
          explanation: `Each pair [a, b] is an edge a→b. We need to arrange pairs so end of one = start of next = Euler path on the directed graph. Find start node (outDeg - inDeg = 1), run Hierholzer's, reconstruct pairs from consecutive nodes.`,
          code: `var validArrangement = function(pairs) {
    const adj=new Map(), outDeg=new Map(), inDeg=new Map();
    for(const[a,b] of pairs){
        (adj.get(a)||adj.set(a,[]).get(a)).push(b);
        outDeg.set(a,(outDeg.get(a)||0)+1);
        inDeg.set(b,(inDeg.get(b)||0)+1);
    }
    let start=pairs[0][0];
    for(const[node] of adj)
        if((outDeg.get(node)||0)-(inDeg.get(node)||0)===1){start=node;break;}
    const path=[], stack=[start];
    while(stack.length){
        const u=stack.at(-1);
        const neighbors=adj.get(u);
        if(neighbors&&neighbors.length) stack.push(neighbors.pop());
        else path.push(stack.pop());
    }
    path.reverse();
    return path.slice(0,-1).map((v,i)=>[v,path[i+1]]);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Cracking the Safe',
      url: 'https://leetcode.com/problems/cracking-the-safe/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: De Bruijn sequence via Euler circuit on overlap graph',
          explanation: `Model as De Bruijn graph: nodes are (n-1)-digit strings, edges are n-digit strings. Euler circuit on this graph = De Bruijn sequence that contains every n-digit combination. Run Hierholzer's on the overlap graph.`,
          code: `var crackSafe = function(n, k) {
    if(n===1) return Array.from({length:k},(_,i)=>i).join('');
    const adj=new Map();
    const addEdge=(u,v)=>(adj.get(u)||adj.set(u,[]).get(u)).push(v);
    // Add all k^n edges
    const start='0'.repeat(n-1);
    const allNodes=new Set();
    const build=(node)=>{
        for(let d=0;d<k;d++){
            const next=node.slice(1)+d;
            addEdge(node,next);
            if(!allNodes.has(next)){allNodes.add(next);build(next);}
        }
    };
    // Simpler: iterate all (n-1)-length prefixes
    for(let mask=0;mask<Math.pow(k,n-1);mask++){
        let node='',m=mask;
        for(let i=0;i<n-1;i++){node=String(m%k)+node;m=Math.floor(m/k);}
        for(let d=0;d<k;d++) addEdge(node,node.slice(1)+d);
    }
    const path=[],stack=[start];
    while(stack.length){
        const u=stack.at(-1);
        const nei=adj.get(u);
        if(nei&&nei.length) stack.push(nei.pop());
        else path.push(stack.pop());
    }
    path.reverse();
    return path[0]+path.slice(1).map(p=>p.at(-1)).join('');
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Find the Closest Palindrome',
      url: 'https://leetcode.com/problems/find-the-closest-palindrome/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Generate 5 candidates, pick closest',
          explanation: `Candidates: (1) mirror first half to second half, (2) mirror first half - 1 to second, (3) mirror first half + 1 to second, (4) 10^(len-1) - 1 (all 9s with fewer digits), (5) 10^len + 1 (round up with more digits). Pick the one closest to n (not equal to n).`,
          code: `var nearestPalindromic = function(n) {
    const len=n.length, nNum=BigInt(n);
    const candidates=new Set();
    // Candidates 4 and 5
    candidates.add(BigInt(10)**(BigInt(len)-1n)-1n); // e.g. 999
    candidates.add(BigInt(10)**BigInt(len)+1n);         // e.g. 10001
    // Candidates 1, 2, 3: mirror first half
    const half=Math.ceil(len/2);
    for(const diff of [-1n,0n,1n]){
        const prefix=BigInt(n.slice(0,half))+diff;
        let cand=String(prefix);
        if(len%2===0) cand+=cand.split('').reverse().join('');
        else cand+=cand.slice(0,-1).split('').reverse().join('');
        candidates.add(BigInt(cand));
    }
    candidates.delete(nNum);
    let res=null;
    for(const c of candidates){
        const diff=c>nNum?c-nNum:nNum-c;
        if(res===null){res=c;continue;}
        const rd=res>nNum?res-nNum:nNum-res;
        if(diff<rd||(diff===rd&&c<res)) res=c;
    }
    return String(res);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🔁',
      color: 'teal',
      content: `**Euler conditions:**\n- Undirected circuit: all vertices have even degree\n- Undirected path: exactly 2 vertices have odd degree (they are start/end)\n- Directed circuit: in-degree = out-degree for every vertex\n- Directed path: one vertex has out - in = 1 (start), one has in - out = 1 (end)\n\n**Hierholzer's key:** When stuck (no outgoing edges), pop current node to the result path, backtrack. Post-order insertion naturally handles "bridge" edges.\n\n**Complexity:** O(E) with adjacency list + pointer to next unvisited edge.\n\n**Applications:** Itinerary reconstruction, De Bruijn sequences, word chains (each word's last char = next word's first char).`,
    },
  ],
}
