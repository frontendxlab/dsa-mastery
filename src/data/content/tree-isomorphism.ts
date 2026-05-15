import type { Article } from '../articles'

export const treeIsomorphismArticle: Article = {
  slug: 'tree-isomorphism',
  title: 'Tree Isomorphism & Canonical Forms',
  emoji: '🌲',
  tagline: 'Two trees are isomorphic iff they have the same canonical form. AHU in O(n log n).',
  description: 'Two rooted trees are isomorphic if one can be transformed to the other by relabeling nodes. The canonical form assigns each subtree a unique label based on its structure. AHU (Aho, Hopcroft, Ullman) algorithm: sort children\'s canonical forms, recursively assign labels. Two trees are isomorphic iff their roots have the same canonical label. For unrooted trees: check from both centers.',
  gradient: 'from-teal-800 to-green-900',
  topicSlug: 'graph',
  readTime: '13 min',
  sections: [
    {
      type: 'text',
      content: `Canonical form of a rooted tree: leaf = "()". Internal node = "(" + sorted concatenation of children's canonical forms + ")". Two rooted trees are isomorphic iff they have the same canonical string. For unrooted trees: find the center(s) of each tree (at most 2), root at center, compare canonical forms. O(n log n) to sort children's labels at each node.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Tree canonical form for isomorphism check',
      code: `function treeCanonical(n, edges, root = 0) {
    const adj = Array.from({length: n}, () => []);
    for (const [u, v] of edges) { adj[u].push(v); adj[v].push(u); }

    function canonical(u, parent) {
        const childLabels = [];
        for (const v of adj[u]) {
            if (v !== parent) childLabels.push(canonical(v, u));
        }
        childLabels.sort(); // sort for canonical order
        return '(' + childLabels.join('') + ')';
    }

    return canonical(root, -1);
}

function areIsomorphic(n1, edges1, n2, edges2) {
    if (n1 !== n2) return false;

    // Find centers of each tree
    const findCenters = (n, edges) => {
        const adj = Array.from({length: n}, () => []);
        const deg = new Array(n).fill(0);
        for (const [u, v] of edges) { adj[u].push(v); adj[v].push(u); deg[u]++; deg[v]++; }
        let leaves = deg.map((d, i) => d <= 1 ? i : -1).filter(i => i >= 0);
        let remaining = n;
        while (remaining > 2) {
            remaining -= leaves.length;
            const next = [];
            for (const l of leaves) for (const v of adj[l]) if (--deg[v] === 1) next.push(v);
            leaves = next;
        }
        return leaves;
    };

    const c1 = findCenters(n1, edges1), c2 = findCenters(n2, edges2);
    if (c1.length !== c2.length) return false;

    const forms1 = c1.map(c => treeCanonical(n1, edges1, c)).sort();
    const forms2 = c2.map(c => treeCanonical(n2, edges2, c)).sort();
    return forms1.every((f, i) => f === forms2[i]);
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
      title: 'Check Completeness of a Binary Tree',
      url: 'https://leetcode.com/problems/check-completeness-of-a-binary-tree/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: BFS — once we see a null, no more non-null allowed',
          explanation: `BFS level by level. Once we encounter a null node, all subsequent nodes must also be null. If any non-null follows a null, not complete.`,
          code: `var isCompleteTree = function(root) {
    const q=[root]; let seenNull=false;
    while(q.length){
        const node=q.shift();
        if(!node){seenNull=true;continue;}
        if(seenNull) return false;
        q.push(node.left,node.right);
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
      title: 'Same Tree',
      url: 'https://leetcode.com/problems/same-tree/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Recursive structural comparison',
          explanation: `Two trees are the same if: both null, or both non-null with same value AND same left AND same right subtrees.`,
          code: `var isSameTree = function(p, q) {
    if(!p&&!q) return true;
    if(!p||!q||p.val!==q.val) return false;
    return isSameTree(p.left,q.left)&&isSameTree(p.right,q.right);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Symmetric Tree',
      url: 'https://leetcode.com/problems/symmetric-tree/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Check mirror image — compare left.left with right.right',
          explanation: `A tree is symmetric iff left subtree is mirror of right. Compare pairs: (left.left, right.right) and (left.right, right.left).`,
          code: `var isSymmetric = function(root) {
    const mirror=(l,r)=>{
        if(!l&&!r) return true;
        if(!l||!r||l.val!==r.val) return false;
        return mirror(l.left,r.right)&&mirror(l.right,r.left);
    };
    return mirror(root.left,root.right);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Find All Duplicate Trees',
      url: 'https://leetcode.com/problems/find-duplicate-subtrees/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Serialize each subtree, group by serialization',
          explanation: `Post-order serialize each subtree to a string. Use a hashmap to group. When a serialization appears twice, the root of that subtree is a duplicate.`,
          code: `var findDuplicateSubtrees = function(root) {
    const map=new Map(), res=[];
    const serial=(node)=>{
        if(!node) return '#';
        const s=serial(node.left)+','+serial(node.right)+','+node.val;
        map.set(s,(map.get(s)||0)+1);
        if(map.get(s)===2) res.push(node);
        return s;
    };
    serial(root);
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🌲',
      color: 'green',
      content: `**Tree isomorphism approaches:**\n- Canonical string: "()" for leaf, "(sorted children forms)" for internal\n- Hashing: assign integer hash to each canonical form\n- AHU algorithm: O(n log n) using sort + relabeling\n\n**For unrooted trees:**\n1. Find center (1 or 2 nodes)\n2. Root at center\n3. Compare canonical forms\n\n**Applications:**\n- Chemical structure comparison\n- Parse tree equivalence\n- Network topology matching\n- Phylogenetic tree comparison\n\n**Subtree isomorphism:** Find if T₁ is isomorphic to any subtree of T₂. O(n₁ × n₂) brute force, O(n₁ × n₂ / log n) with hashing.`,
    },
  ],
}
