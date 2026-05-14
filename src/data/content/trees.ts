import type { Article } from '../articles'

export const treesArticle: Article = {
  slug: 'binary-trees',
  title: 'Binary Trees',
  emoji: '🌳',
  tagline: 'Postorder when children decide. Level-order when levels matter.',
  description: 'Master tree traversals (recursive + iterative), level-order with size freeze, tree reconstruction, BST properties, and the "return pair" trick for problems that need both up and down information.',
  gradient: 'from-green-400 to-emerald-500',
  topicSlug: 'tree',
  readTime: '20 min',
  sections: [
    {
      type: 'text',
      content: `Binary tree problems look diverse but the core patterns are just 3-4 traversal strategies. The key skill is recognizing which traversal to use. Preorder when you need to make decisions top-down. Postorder when the parent's decision depends on what the children found. Level-order when problems involve depth or comparing nodes at the same level.`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Traversal Decision Matrix',
    },
    {
      type: 'table',
      headers: ['Use This', 'When', 'Why'],
      rows: [
        ['Preorder', 'Build/serialize tree, path problems', 'Root before children — know the path so far'],
        ['Inorder', 'BST problems, sorted output', 'Inorder of BST = sorted sequence'],
        ['Postorder', 'Delete/modify nodes, size/height, decisions depending on children', 'Know children\'s results before deciding for parent'],
        ['Level-order (BFS)', 'Depth-related, zigzag, right side view', '"Freeze" queue size at each level to group nodes'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Core Templates',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Recursive traversals',
      code: `// Inorder: Left → Root → Right
const inorder = (node) => {
    if (!node) return;
    inorder(node.left);
    process(node.val);    // root processed between children
    inorder(node.right);
};

// Preorder: Root → Left → Right
const preorder = (node) => {
    if (!node) return;
    process(node.val);    // root first
    preorder(node.left);
    preorder(node.right);
};

// Postorder: Left → Right → Root
const postorder = (node) => {
    if (!node) return;
    postorder(node.left);
    postorder(node.right);
    process(node.val);    // root last — children already processed
};`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Level-order with size freeze (group by level)',
      code: `const q = [root];
while (q.length > 0) {
    const size = q.length;   // FREEZE: this level's node count
    const level = [];
    for (let i = 0; i < size; i++) {
        const node = q.shift();
        level.push(node.val);
        if (node.left) q.push(node.left);
        if (node.right) q.push(node.right);
        // Use i === size-1 to detect last node in level
    }
    result.push(level);
}`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Iterative inorder (simulate recursion stack)',
      code: `const stack = [], result = [];
let node = root;
while (node || stack.length > 0) {
    while (node) {           // go as far left as possible
        stack.push(node);
        node = node.left;
    }
    node = stack.pop();      // process leftmost unprocessed
    result.push(node.val);
    node = node.right;       // now explore right subtree
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
      title: 'Binary Tree Maximum Path Sum',
      url: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Postorder DFS — return max single-arm path, track global max',
          explanation: `A path can go left→root→right, but when we RETURN to the parent, we can only extend in one direction (can't turn a corner twice). So:\n- Global max updated with: left contribution + right contribution + node.val\n- Returned value to parent: node.val + max(left, right) — single best arm\n- Clip negative contributions to 0 (never makes sense to include a negative path)`,
          code: `var maxPathSum = function(root) {
    let max = -Infinity;
    const dfs = (node) => {
        if (!node) return 0;
        const left = Math.max(dfs(node.left), 0);   // clip negatives
        const right = Math.max(dfs(node.right), 0);
        max = Math.max(max, node.val + left + right); // path through this node
        return node.val + Math.max(left, right);       // best single arm upward
    };
    dfs(root);
    return max;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Construct Binary Tree from Preorder and Inorder',
      url: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Preorder gives root, inorder gives boundaries',
          explanation: `preorder[0] is always the root of the current subtree. Find that value in inorder — everything to its left is the left subtree, everything to its right is the right subtree. Recurse with those bounds.\n\nUse a Map for O(1) inorder lookup. Use a shared preIdx pointer (closure/outer variable) that increments as we build nodes left-to-right.`,
          code: `var buildTree = function(preorder, inorder) {
    const indexMap = new Map();
    inorder.forEach((val, i) => indexMap.set(val, i));

    let preIdx = 0;
    const build = (inL, inR) => {
        if (inL > inR) return null;
        const rootVal = preorder[preIdx++];
        const root = new TreeNode(rootVal);
        const rootIdx = indexMap.get(rootVal);
        root.left = build(inL, rootIdx - 1);   // left subtree
        root.right = build(rootIdx + 1, inR);  // right subtree
        return root;
    };
    return build(0, inorder.length - 1);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Lowest Common Ancestor of a Binary Tree',
      url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Postorder — if both children return a node, current is LCA',
          explanation: `Three base cases:\n1. node is null → return null\n2. node is p or q → return node (found one of them)\n3. Otherwise: recurse left and right\n\nIf both left and right return non-null → p and q are in different subtrees → current node is LCA.\nIf only one returns non-null → both p and q are in that subtree → return the non-null one.`,
          code: `var lowestCommonAncestor = function(root, p, q) {
    if (!root || root === p || root === q) return root;
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    if (left && right) return root;  // p in one side, q in other
    return left || right;             // both in same subtree
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Binary Tree Right Side View',
      url: 'https://leetcode.com/problems/binary-tree-right-side-view/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Level-order — take last node at each level',
          explanation: `Level-order traversal with size freeze. At each level, the last node (i === size-1) is visible from the right. Push that node's value to result.`,
          code: `var rightSideView = function(root) {
    if (!root) return [];
    const result = [];
    const q = [root];
    while (q.length > 0) {
        const size = q.length;
        for (let i = 0; i < size; i++) {
            const node = q.shift();
            if (i === size - 1) result.push(node.val);
            if (node.left) q.push(node.left);
            if (node.right) q.push(node.right);
        }
    }
    return result;
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: DFS right-first — insert when depth matches result length',
          explanation: `DFS with right child before left. Keep depth parameter. When depth === result.length, this is the first node we're seeing at this depth going right-first → it's the rightmost one. Push to result.`,
          code: `var rightSideView = function(root, depth = 0, result = []) {
    if (!root) return result;
    if (depth === result.length) result.push(root.val);
    rightSideView(root.right, depth + 1, result);  // right first
    rightSideView(root.left, depth + 1, result);
    return result;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Delete Nodes And Return Forest',
      url: 'https://leetcode.com/problems/delete-nodes-and-return-forest/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Postorder DFS — let recursion handle relinking',
          explanation: `Postorder is mandatory here because deleting a node can expose its children as new roots — we need to handle children BEFORE the parent. Clean approach: each DFS call returns either the node (if kept) or null (if deleted). Parent simply assigns left/right to whatever child returns. If a node is deleted, push its non-null children to result (they become new roots).`,
          code: `var delNodes = function(root, to_delete) {
    const deleteSet = new Set(to_delete);
    const result = [];

    const dfs = (node) => {
        if (!node) return null;
        node.left = dfs(node.left);    // process children first (postorder)
        node.right = dfs(node.right);
        if (deleteSet.has(node.val)) {
            // node deleted — children become new roots
            if (node.left) result.push(node.left);
            if (node.right) result.push(node.right);
            return null;
        }
        return node;  // keep this node
    };

    const updatedRoot = dfs(root);
    if (updatedRoot) result.push(updatedRoot);  // root survived
    return result;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 6,
      title: 'BST Iterator',
      url: 'https://leetcode.com/problems/binary-search-tree-iterator/',
      difficulty: 'Medium',
      note: 'Simulate inorder recursion with a stack — O(1) amortized next(), O(h) space.',
      intuitions: [
        {
          label: 'Intuition 1: Preprocess — store full inorder in array',
          explanation: `Run inorder traversal once, store all values in array. next() returns arr[idx++], hasNext() returns idx < arr.length. O(n) space.`,
        },
        {
          label: 'Intuition 2: Lazy simulation — controlled inorder with stack',
          explanation: `The trick: push all left-spine nodes to a stack. next() pops the top, then pushes the right child's left spine. This simulates exactly how recursion would process inorder, but lazily — we only process nodes when next() is called.`,
          code: `class BSTIterator {
    constructor(root) {
        this.stack = [];
        this.pushLeft(root);
    }
    pushLeft(node) {
        while (node) {
            this.stack.push(node);
            node = node.left;
        }
    }
    next() {
        const node = this.stack.pop();
        if (node.right) this.pushLeft(node.right);  // explore right subtree lazily
        return node.val;
    }
    hasNext() { return this.stack.length > 0; }
}`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'green',
      content: `**BST key property**: inorder traversal gives sorted ascending sequence. Use this for:\n- kth smallest element (inorder, stop at k)\n- Validate BST (check prev < curr in inorder)\n- Convert BST to greater tree (REVERSE inorder — right→root→left — accumulate suffix sum)`,
    },
  ],
}
