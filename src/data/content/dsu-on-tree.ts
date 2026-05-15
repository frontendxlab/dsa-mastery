import type { Article } from '../articles'

export const dsuOnTreeArticle: Article = {
  slug: 'dsu-on-tree',
  title: 'DSU on Tree (Small-to-Large)',
  emoji: '🌳',
  tagline: 'Heavy child inherits parent\'s data. Light children merged small-to-large. O(n log n).',
  description: 'DSU on Tree (also called "small-to-large merging" or "Sack") efficiently answers subtree queries by merging smaller sets into larger ones. The heavy child inherits the parent\'s data structure; light children are processed and merged in. Each element is merged O(log n) times total, giving O(n log n) overall. Classic applications: count distinct values in subtree, most frequent element in subtree, frequency queries.',
  gradient: 'from-lime-600 to-green-700',
  topicSlug: 'graph',
  readTime: '15 min',
  sections: [
    {
      type: 'text',
      content: `DSU on Tree works as follows: for each node, process all light children (adding their subtree nodes, answering queries, then erasing them), then process the heavy child WITHOUT erasing, and finally add the current node. The heavy child's data persists, so you only pay the cost for light subtree nodes. Since each node is a "light child" O(log n) times, total work is O(n log n).`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'DSU on Tree template',
      code: `// DSU on Tree (Sack algorithm)
// Counts distinct values in subtrees
function dsuOnTree(n, edges, vals) {
    const adj = Array.from({length: n}, () => []);
    for (const [u, v] of edges) { adj[u].push(v); adj[v].push(u); }

    const sz = new Array(n).fill(1), heavy = new Array(n).fill(-1);

    // DFS1: compute subtree sizes and heavy children
    function dfs1(u, p) {
        for (const v of adj[u]) {
            if (v === p) continue;
            dfs1(v, u);
            sz[u] += sz[v];
            if (heavy[u] === -1 || sz[v] > sz[heavy[u]]) heavy[u] = v;
        }
    }

    const freq = new Map(); // current multiset
    let distinct = 0;
    const answers = new Array(n);

    function add(val) {
        const c = (freq.get(val) || 0) + 1;
        freq.set(val, c);
        if (c === 1) distinct++;
    }
    function del(val) {
        const c = freq.get(val) - 1;
        freq.set(val, c);
        if (c === 0) { freq.delete(val); distinct--; }
    }
    function addSubtree(u, p) { add(vals[u]); for (const v of adj[u]) if (v !== p) addSubtree(v, u); }
    function delSubtree(u, p) { del(vals[u]); for (const v of adj[u]) if (v !== p) delSubtree(v, u); }

    function dfs2(u, p, keepData) {
        // Process light children (erase after)
        for (const v of adj[u]) {
            if (v === p || v === heavy[u]) continue;
            dfs2(v, u, false);
        }
        // Process heavy child (keep data)
        if (heavy[u] !== -1) dfs2(heavy[u], u, true);
        // Add light subtrees + current node
        for (const v of adj[u]) {
            if (v === p || v === heavy[u]) continue;
            addSubtree(v, u);
        }
        add(vals[u]);
        answers[u] = distinct; // answer query for node u's subtree
        if (!keepData) delSubtree(u, p);
    }

    dfs1(0, -1);
    dfs2(0, -1, false);
    return answers;
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
      title: 'Most Frequent Subtree Sum',
      url: 'https://leetcode.com/problems/most-frequent-subtree-sum/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Post-order DFS + frequency map',
          explanation: `Compute subtree sum for each node via post-order DFS. Track frequency of each sum in a map. Return all sums with maximum frequency.`,
          code: `var findFrequentTreeSum = function(root) {
    const freq=new Map(); let maxFreq=0;
    const dfs=(node)=>{
        if(!node) return 0;
        const sum=node.val+dfs(node.left)+dfs(node.right);
        const c=(freq.get(sum)||0)+1; freq.set(sum,c);
        maxFreq=Math.max(maxFreq,c);
        return sum;
    };
    dfs(root);
    return [...freq].filter(([,c])=>c===maxFreq).map(([s])=>s);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Count Good Nodes in Binary Tree',
      url: 'https://leetcode.com/problems/count-good-nodes-in-binary-tree/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DFS tracking max value on path from root',
          explanation: `Node is "good" if its value ≥ max value of all ancestors. DFS passing current max. Count nodes where node.val ≥ maxSoFar.`,
          code: `var goodNodes = function(root) {
    let count=0;
    const dfs=(node,maxSoFar)=>{
        if(!node) return;
        if(node.val>=maxSoFar){count++;maxSoFar=node.val;}
        dfs(node.left,maxSoFar); dfs(node.right,maxSoFar);
    };
    dfs(root,-Infinity);
    return count;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Distribute Coins in Binary Tree',
      url: 'https://leetcode.com/problems/distribute-coins-in-binary-tree/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DFS returns excess coins — moves = |excess| per edge',
          explanation: `Each subtree has some coins. Excess = total coins in subtree - nodes in subtree. To balance a subtree, |excess| coins must cross the edge to the parent. Sum all |excess| over all edges.`,
          code: `var distributeCoins = function(root) {
    let moves=0;
    const dfs=(node)=>{
        if(!node) return 0;
        const l=dfs(node.left), r=dfs(node.right);
        moves+=Math.abs(l)+Math.abs(r);
        return node.val+l+r-1; // excess coins in this subtree
    };
    dfs(root);
    return moves;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Small-to-Large Merging: Count Distinct Colors in Subtrees',
      url: 'https://leetcode.com/problems/number-of-good-paths/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Small-to-large Set merging',
          explanation: `For each node maintain a set of values in its subtree. Merge smaller set into larger. Each element moves to a larger set each time it's merged, so each element is moved O(log n) times → O(n log n) total.`,
          code: `// Small-to-large merging template on tree
// For each node u: maintain a data structure (set/map)
// Merge children's structures into u's (always merge smaller into larger)
function smallToLarge(n, adj, vals) {
    const sets = Array.from({length: n}, (_, i) => new Set([vals[i]]));
    const answers = new Array(n);
    function dfs(u, p) {
        for (const v of adj[u]) {
            if (v === p) continue;
            dfs(v, u);
            // Merge smaller into larger
            let [large, small] = sets[u].size >= sets[v].size ? [sets[u], sets[v]] : [sets[v], sets[u]];
            for (const x of small) large.add(x);
            sets[u] = large;
        }
        answers[u] = sets[u].size; // distinct values in subtree
    }
    dfs(0, -1);
    return answers;
}`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🌳',
      color: 'green',
      content: `**Small-to-large merging key insight:** Each element is the "small" one O(log n) times, because each merge at least doubles the size of the set it's in. Total operations = O(n log n).\n\n**DSU on Tree vs Small-to-Large:**\n- DSU on Tree (Sack): explicit heavy-light decomposition, O(n log n)\n- Small-to-large: merge data structures explicitly, O(n log²n) if data structure ops are O(log n)\n\n**What structures can be merged small-to-large:**\n- Sets, multisets, sorted arrays\n- Frequency maps\n- Segment trees (merging = O(n log n) total)\n\n**When to use:** Subtree aggregate queries where merging is the bottleneck. Particularly when query = "count distinct values in subtree."`,
    },
  ],
}
