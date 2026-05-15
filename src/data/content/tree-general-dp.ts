import type { Article } from '../articles'

export const treeGeneralDpArticle: Article = {
  slug: 'tree-general-dp',
  title: 'Tree DP on General Trees',
  emoji: '🌳',
  tagline: 'DP on trees with arbitrary number of children. Subtree properties, rerooting.',
  description: 'Tree DP on general (non-binary) trees uses DFS post-order: compute dp[node] from dp[children]. Common patterns: max independent set on tree (include/exclude each node), minimum vertex cover, maximum matching, sum of distances in tree (rerooting trick). Rerooting: compute dp[root] first, then re-root at each node using the parent\'s value to avoid O(n²) recomputation.',
  gradient: 'from-lime-700 to-green-800',
  topicSlug: 'tree',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `Tree DP post-order: solve children first, combine for parent. Max independent set: dp[v][0] = sum(max(dp[c][0], dp[c][1]) for children c), dp[v][1] = 1 + sum(dp[c][0] for children c). Rerooting: first pass computes dp[v][down] (contribution from subtree below). Second pass computes dp[v][full] using parent's contribution. Avoids repeating subtree computations.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Tree DP: max independent set and sum of distances',
      code: `// Maximum independent set on tree
// dp[v][0] = max set size if v NOT included
// dp[v][1] = max set size if v IS included
function maxIndependentSet(n, adj, root = 0) {
    const dp = Array.from({length: n}, () => [0, 1]); // [not_taken, taken]

    function dfs(v, parent) {
        for (const u of adj[v]) {
            if (u === parent) continue;
            dfs(u, v);
            dp[v][0] += Math.max(dp[u][0], dp[u][1]); // v not taken: take best of child
            dp[v][1] += dp[u][0]; // v taken: child must not be taken
        }
    }
    dfs(root, -1);
    return Math.max(dp[root][0], dp[root][1]);
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
      title: 'House Robber III',
      url: 'https://leetcode.com/problems/house-robber-iii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Tree DP — include/exclude each node',
          explanation: `dp(node) returns [max_if_not_rob, max_if_rob]. If node not robbed: can rob or not rob children (take max). If node robbed: children cannot be robbed.`,
          code: `var rob = function(root) {
    const dp=node=>{
        if(!node) return [0,0];
        const [l0,l1]=dp(node.left), [r0,r1]=dp(node.right);
        const notRob=Math.max(l0,l1)+Math.max(r0,r1);
        const rob=node.val+l0+r0;
        return [notRob,rob];
    };
    return Math.max(...dp(root));
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Sum of Distances in Tree',
      url: 'https://leetcode.com/problems/sum-of-distances-in-tree/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Two DFS passes — compute subtree sums, then rerooting',
          explanation: `Pass 1: For each node, count[v] = subtree size, dist[v] = sum of distances in subtree. Pass 2: Rerooting: dist[child] = dist[parent] + (n - count[child]) - count[child] = dist[parent] + n - 2*count[child]. Moving root from parent to child: distances to (n - count[child]) nodes increase by 1, distances to count[child] nodes decrease by 1.`,
          code: `var sumOfDistancesInTree = function(n, edges) {
    const adj=Array.from({length:n},()=>[]);
    for(const [u,v] of edges){adj[u].push(v);adj[v].push(u);}
    const count=new Array(n).fill(1), dist=new Array(n).fill(0);
    // Pass 1: post-order
    const dfs1=(v,p)=>{
        for(const u of adj[v]) if(u!==p){
            dfs1(u,v); count[v]+=count[u]; dist[v]+=dist[u]+count[u];
        }
    };
    // Pass 2: rerooting
    const dfs2=(v,p)=>{
        for(const u of adj[v]) if(u!==p){
            dist[u]=dist[v]+n-2*count[u];
            dfs2(u,v);
        }
    };
    dfs1(0,-1); dfs2(0,-1);
    return dist;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Binary Tree Cameras',
      url: 'https://leetcode.com/problems/binary-tree-cameras/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Tree DP — three states: covered, has camera, not covered',
          explanation: `States: 0 = not covered, 1 = covered no camera, 2 = has camera. DFS: if any child not covered → place camera (return 2). If any child has camera → covered (return 1). Else → not covered (return 0, parent must cover).`,
          code: `var minCameraCover = function(root) {
    let cameras=0;
    const dfs=node=>{
        if(!node) return 1; // null nodes are "covered"
        const l=dfs(node.left), r=dfs(node.right);
        if(l===0||r===0){cameras++;return 2;} // child uncovered: place camera
        if(l===2||r===2) return 1; // child has camera: this node covered
        return 0; // no camera nearby: tell parent to cover
    };
    if(dfs(root)===0) cameras++;
    return cameras;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🌳',
      color: 'green',
      content: `**Tree DP post-order pattern:** DFS returns computed values for subtrees. Parent combines children's values. O(n) — each node visited once.\n\n**Rerooting technique:** When the answer for every node as root is needed, avoid O(n²) by:\n1. First DFS: compute answer for root 0 (subtree-only)\n2. Second DFS: when re-rooting to child c from parent p, update: ans[c] = ans[p] + (contribution change)\n\nThe contribution change is typically ±1 per node that's "above" vs "below" after the re-root.\n\n**3-state DP trick:** For coverage/domination problems on trees, states are: uncovered (needs parent to cover), covered by child, has placed element (covers parent).`,
    },
  ],
}
