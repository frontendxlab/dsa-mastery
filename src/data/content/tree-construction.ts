import type { Article } from '../articles'

export const treeConstructionArticle: Article = {
  slug: 'tree-construction',
  title: 'Tree Construction from Traversals',
  emoji: '🌳',
  tagline: 'Preorder[0] = root. Inorder splits left/right. Find the split, recurse.',
  description: 'Reconstructing a binary tree from its traversals requires understanding what each traversal tells you: preorder/postorder gives the root, inorder gives left/right split. With two compatible traversals, you can uniquely reconstruct the tree. Learn all variants and the BST case.',
  gradient: 'from-green-600 to-teal-700',
  topicSlug: 'tree',
  readTime: '16 min',
  sections: [
    {
      type: 'text',
      content: `Tree reconstruction works because different traversal types provide complementary information. Preorder/postorder identifies the root of every subtree. Inorder splits left and right subtrees. Combining two traversals uniquely determines the tree (for distinct values). The algorithm: find root in inorder, split into left/right sizes, recurse on each half.`,
    },
    {
      type: 'table',
      headers: ['Given', 'Unique tree?', 'Algorithm'],
      rows: [
        ['Preorder + Inorder', 'Yes (distinct values)', 'preorder[0] = root; find in inorder; split'],
        ['Postorder + Inorder', 'Yes (distinct values)', 'postorder[last] = root; find in inorder; split'],
        ['Preorder + Postorder', 'Not always (no inorder)', 'Works for full binary trees only'],
        ['Inorder only', 'No', 'Multiple trees have same inorder'],
        ['BST + Preorder', 'Yes', 'Use BST property to split without inorder'],
        ['BST + Postorder', 'Yes', 'Same — BST property determines left/right'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Core Algorithm: Preorder + Inorder',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Build tree from preorder and inorder traversals',
      code: `// preorder[0] = root
// inorder[rootIdx] splits: left = inorder[0..rootIdx-1], right = inorder[rootIdx+1..]
// preorder[1..rootIdx] = left subtree preorder (size = rootIdx)
// preorder[rootIdx+1..] = right subtree preorder

function buildTree(preorder, inorder) {
    const inorderMap = new Map(inorder.map((v,i)=>[v,i])); // O(1) lookup
    let preIdx = 0;

    function build(lo, hi) { // lo..hi = range in inorder array
        if (lo > hi) return null;
        const rootVal = preorder[preIdx++];
        const root = new TreeNode(rootVal);
        const inIdx = inorderMap.get(rootVal);
        root.left  = build(lo, inIdx - 1); // left subtree
        root.right = build(inIdx + 1, hi); // right subtree
        return root;
    }

    return build(0, inorder.length - 1);
}

// With postorder + inorder: same idea, but take from END of postorder
function buildTreePost(inorder, postorder) {
    const inorderMap = new Map(inorder.map((v,i)=>[v,i]));
    let postIdx = postorder.length - 1;

    function build(lo, hi) {
        if (lo > hi) return null;
        const rootVal = postorder[postIdx--]; // take from end
        const root = new TreeNode(rootVal);
        const inIdx = inorderMap.get(rootVal);
        root.right = build(inIdx + 1, hi); // RIGHT first (postorder is L-R-root, so reverse)
        root.left  = build(lo, inIdx - 1);
        return root;
    }

    return build(0, inorder.length - 1);
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
      title: 'Construct Binary Tree from Preorder and Inorder Traversal',
      url: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: preorder[0] = root, find in inorder, split recursively',
          explanation: `preorder[0] is the root. Find it in inorder — everything to the left is the left subtree, right is the right subtree. The left subtree has size = inorderIdx - lo. Recurse: left = build(preorder[1..size], inorder[0..inorderIdx-1]), right = build(preorder[size+1..], inorder[inorderIdx+1..]).`,
          code: `var buildTree = function(preorder, inorder) {
    const map=new Map(inorder.map((v,i)=>[v,i]));
    let pi=0;
    const build=(lo,hi)=>{
        if(lo>hi) return null;
        const root=new TreeNode(preorder[pi++]);
        const m=map.get(root.val);
        root.left=build(lo,m-1);
        root.right=build(m+1,hi);
        return root;
    };
    return build(0,inorder.length-1);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Construct Binary Tree from Inorder and Postorder Traversal',
      url: 'https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: postorder[last] = root, build RIGHT subtree first',
          explanation: `postorder is L-R-root. Take from the end (root-R-L in reverse). Build RIGHT subtree first when recursing, then left. HashMap for inorder lookup.`,
          code: `var buildTree = function(inorder, postorder) {
    const map=new Map(inorder.map((v,i)=>[v,i]));
    let pi=postorder.length-1;
    const build=(lo,hi)=>{
        if(lo>hi) return null;
        const root=new TreeNode(postorder[pi--]);
        const m=map.get(root.val);
        root.right=build(m+1,hi); // right FIRST (reverse of postorder)
        root.left=build(lo,m-1);
        return root;
    };
    return build(0,inorder.length-1);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Construct BST from Preorder Traversal',
      url: 'https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: BST property replaces inorder — O(n log n)',
          explanation: `In a BST, all left-subtree values < root < all right-subtree values. Given preorder[0] = root, find the first element > root — that's where right subtree starts. No inorder array needed.`,
          code: `var bstFromPreorder = function(preorder) {
    let i=0;
    const build=(bound)=>{
        if(i===preorder.length||preorder[i]>bound) return null;
        const root=new TreeNode(preorder[i++]);
        root.left=build(root.val);   // left: values < root
        root.right=build(bound);     // right: values < bound
        return root;
    };
    return build(Infinity);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Recover Binary Search Tree',
      url: 'https://leetcode.com/problems/recover-binary-search-tree/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Inorder should be sorted — find the two swapped nodes',
          explanation: `BST inorder is sorted. Two swapped nodes create at most 2 inversions in the inorder sequence. First inversion: prev.val > curr.val → first = prev, second = curr. Second inversion (if exists): first stays, second = curr. Swap their values at the end.`,
          code: `var recoverTree = function(root) {
    let first=null, second=null, prev=null;
    const inorder=(node)=>{
        if(!node) return;
        inorder(node.left);
        if(prev&&prev.val>node.val){
            if(!first) first=prev;
            second=node; // keep updating second
        }
        prev=node;
        inorder(node.right);
    };
    inorder(root);
    [first.val,second.val]=[second.val,first.val];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Construct String with Minimum Cost',
      url: 'https://leetcode.com/problems/construct-string-with-minimum-cost/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Trie + DP',
          explanation: `Build a trie of all words with their costs. dp[i] = min cost to construct s[0..i-1]. For each position i, try all words starting at i using the trie — O(L) per position where L is max word length. dp[i] = min over all matching words ending at i of dp[i-len] + cost.`,
          code: `var minimumCost = function(target, words, costs) {
    const n=target.length;
    const root={};
    for(let i=0;i<words.length;i++){
        let node=root;
        for(const c of words[i]){
            if(!node[c]) node[c]={};
            node=node[c];
        }
        node.cost=Math.min(node.cost??Infinity,costs[i]);
    }
    const dp=new Array(n+1).fill(Infinity);
    dp[0]=0;
    for(let i=0;i<n;i++){
        if(dp[i]===Infinity) continue;
        let node=root;
        for(let j=i;j<n;j++){
            node=node[target[j]];
            if(!node) break;
            if(node.cost!==undefined) dp[j+1]=Math.min(dp[j+1],dp[i]+node.cost);
        }
    }
    return dp[n]===Infinity?-1:dp[n];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🌳',
      color: 'green',
      content: `**Tree construction rules:**\n- Preorder[0] / Postorder[last] = ROOT of current subtree\n- Inorder position of root splits LEFT (before) and RIGHT (after)\n- Size of left subtree = inorderIdx - lo\n- Always use a HashMap for O(1) inorder lookups\n- For postorder: build RIGHT subtree first (reverse root-R-L order)\n- For BST: BST property replaces inorder (split at first value > root)\n\n**Uniqueness:** preorder+inorder or postorder+inorder uniquely determines any binary tree with distinct values. Preorder+postorder only works for full binary trees.`,
    },
  ],
}
