import type { Article } from '../articles'

export const centroidDecompositionArticle: Article = {
  slug: 'centroid-decomposition',
  title: 'Centroid Decomposition',
  emoji: '⚖️',
  tagline: 'Divide tree at centroid. Every path passes through O(log n) centroids.',
  description: 'Centroid decomposition recursively divides a tree at its centroid (node whose removal creates subtrees of size ≤ n/2). Any path between two nodes passes through O(log n) centroids in the decomposition tree. This enables O(n log n) or O(n log² n) solutions for: count pairs with path length k, nearest marked node on tree path, path queries that can\'t be handled by HLD.',
  gradient: 'from-amber-600 to-orange-700',
  topicSlug: 'graph',
  readTime: '16 min',
  sections: [
    {
      type: 'text',
      content: `The centroid of a tree is a node whose removal leaves all subtrees of size ≤ n/2. Every tree has at least one centroid (findable in O(n)). Centroid decomposition builds a hierarchical decomposition: find centroid, process all paths through it, remove it, recurse on remaining subtrees. Since subtrees are ≤ half, depth is O(log n), so total processing is O(n log n) if per-centroid work is O(n).`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Centroid decomposition template',
      code: `function centroidDecomposition(n, edges) {
    const adj = Array.from({length: n}, () => []);
    for (const [u, v] of edges) { adj[u].push(v); adj[v].push(u); }

    const subSize = new Array(n).fill(0);
    const removed = new Array(n).fill(false);
    const centParent = new Array(n).fill(-1); // parent in centroid tree

    function getSize(u, p) {
        subSize[u] = 1;
        for (const v of adj[u]) if (!removed[v] && v !== p) subSize[u] += getSize(v, u);
        return subSize[u];
    }

    function getCentroid(u, p, treeSize) {
        for (const v of adj[u]) {
            if (!removed[v] && v !== p && subSize[v] > treeSize / 2) return getCentroid(v, u, treeSize);
        }
        return u;
    }

    function decompose(u, parent) {
        const sz = getSize(u, -1);
        const c = getCentroid(u, -1, sz);
        centParent[c] = parent;
        removed[c] = true;

        // Process all paths through c here:
        // For each v in adj[c] (not removed), collect distances from c into subtree
        // Then combine: answer for paths through c = merge info from different subtrees

        for (const v of adj[c]) if (!removed[v]) decompose(v, c);
        removed[c] = false; // restore for other uses (optional)
        return c; // return centroid tree root
    }

    return decompose(0, -1);
}

// Pattern for "count pairs with distance = k":
// At each centroid c:
//   1. Collect all distances from c to nodes in its component
//   2. Count pairs using two-pointer or hashmap: pairs where dist(c,u) + dist(c,v) = k
//   3. Subtract pairs where u and v are in same subtree (counted twice)`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Count Pairs Of Nodes',
      url: 'https://leetcode.com/problems/count-pairs-of-nodes/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Degree sum + inclusion-exclusion',
          explanation: `cnt[i][j] = number of edges incident to node i OR node j = deg[i] + deg[j] - (edges between i and j). For queries: count pairs (i,j) where cnt[i][j] > queries[q]. Sort degrees, use two pointers to count pairs with deg[i]+deg[j] > threshold, then subtract pairs sharing edges.`,
          code: `var countPairs = function(n, edges, queries) {
    const deg=new Array(n+1).fill(0);
    const shared=new Map(); // edge count between pairs
    for(const[a,b] of edges){
        deg[a]++;deg[b]++;
        const key=Math.min(a,b)*100001+Math.max(a,b);
        shared.set(key,(shared.get(key)||0)+1);
    }
    const sorted=[...deg.slice(1)].sort((a,b)=>a-b); // 0-indexed sorted degrees
    return queries.map(q=>{
        // Count pairs with deg[i]+deg[j] > q
        let cnt=0,l=0,r=sorted.length-1;
        while(l<r){
            if(sorted[l]+sorted[r]>q){cnt+=r-l;r--;}
            else l++;
        }
        // Subtract pairs sharing edge that are erroneously counted/missed
        for(const[key,s] of shared){
            const u=Math.floor(key/100001),v=key%100001;
            if(deg[u]+deg[v]>q&&deg[u]+deg[v]-s<=q) cnt--;
        }
        return cnt;
    });
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Number of Good Paths',
      url: 'https://leetcode.com/problems/number-of-good-paths/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Sort nodes by value, Union-Find with component max tracking',
          explanation: `Sort edges so we only add edge (u,v) when max(vals[u],vals[v]) is the current value being processed. For each value, count nodes with that value in the same component (they form good paths). Answer += C(count, 2) + count (paths of length 0).`,
          code: `var numberOfGoodPaths = function(vals, edges) {
    const n=vals.length;
    const parent=Array.from({length:n},(_,i)=>i);
    const maxVal=new Array(n); for(let i=0;i<n;i++) maxVal[i]=vals[i];
    const find=x=>parent[x]===x?x:(parent[x]=find(parent[x]));
    const union=(x,y)=>{
        const[px,py]=[find(x),find(y)];
        if(px===py) return;
        if(maxVal[px]<maxVal[py]) parent[px]=py;
        else if(maxVal[px]>maxVal[py]) parent[py]=px;
        else{parent[py]=px;/* same max */}
    };
    // Sort edges by max endpoint value
    edges.sort((a,b)=>Math.max(vals[a[0]],vals[a[1]])-Math.max(vals[b[0]],vals[b[1]]));
    const nodesByVal=new Map();
    for(let i=0;i<n;i++) (nodesByVal.get(vals[i])||nodesByVal.set(vals[i],[]).get(vals[i])).push(i);
    let ans=n; // n self paths
    for(const[u,v] of edges){
        union(u,v);
        const val=Math.max(vals[u],vals[v]);
        // Count nodes with 'val' in same component
        if(vals[u]===val||vals[v]===val){
            // This approach needs refinement — simpler: process by value group
        }
    }
    // Simpler implementation using value groups:
    let res=n;
    const par2=Array.from({length:n},(_,i)=>i),cnt=new Array(n).fill(1);
    const sorted=[...Array(n).keys()].sort((a,b)=>vals[a]-vals[b]);
    const adj=Array.from({length:n},()=>[]);
    for(const[u,v] of edges){adj[u].push(v);adj[v].push(u);}
    const find2=x=>par2[x]===x?x:(par2[x]=find2(par2[x]));
    for(const u of sorted){
        for(const v of adj[u]) if(vals[v]<=vals[u]){
            const[pu,pv]=[find2(u),find2(v)];
            if(pu!==pv&&vals[pu]===vals[pv]){res+=cnt[pu]*cnt[pv];par2[pu]=pv;cnt[pv]+=cnt[pu];}
            else if(pu!==pv) par2[vals[pu]<vals[pv]?pu:pv]=vals[pu]<vals[pv]?pv:pu;
        }
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Distance Between Bus Stops (tree variant)',
      url: 'https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Floyd-Warshall for all-pairs shortest paths',
          explanation: `n ≤ 100 — Floyd-Warshall is fine. Find city with fewest cities reachable within distanceThreshold. Ties broken by largest city number.`,
          code: `var findTheCity = function(n, edges, distanceThreshold) {
    const dist=Array.from({length:n},(_,i)=>Array.from({length:n},(_, j)=>i===j?0:Infinity));
    for(const[u,v,w] of edges){dist[u][v]=w;dist[v][u]=w;}
    for(let k=0;k<n;k++) for(let i=0;i<n;i++) for(let j=0;j<n;j++)
        if(dist[i][k]+dist[k][j]<dist[i][j]) dist[i][j]=dist[i][k]+dist[k][j];
    let ans=-1,minCount=n;
    for(let i=0;i<n;i++){
        const cnt=dist[i].filter(d=>d<=distanceThreshold).length-1;
        if(cnt<=minCount){minCount=cnt;ans=i;}
    }
    return ans;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '⚖️',
      color: 'amber',
      content: `**Centroid decomposition invariant:** Any path u→v in the tree passes through exactly one of their common centroid ancestors. Process all paths through centroid c: gather distances to all nodes in c's component, count/answer paths, subtract over-counting from same subtree.\n\n**Finding centroid:** DFS to get subtree sizes. Centroid = node where max(subtree sizes, n - subtree size) ≤ n/2. Time: O(n).\n\n**vs HLD:**\n- HLD: path queries with segment tree, O(log²n) per query, supports updates\n- Centroid decomp: path counting/existence queries, O(n log n) preprocessing\n\n**Common pattern:** "Count pairs with path length = k" → at each centroid c, use a hashmap/sorted array to count pairs from different subtrees.`,
    },
  ],
}
