import type { Article } from '../articles'

export const bstOperationsArticle: Article = {
  slug: 'bst-operations',
  title: 'BST Operations & Properties',
  emoji: '🌳',
  tagline: 'BST insert, delete, validate, floor/ceiling, kth element, convert to/from sorted.',
  description: 'Binary Search Tree operations leverage the BST property: left < root < right. Key operations: search/insert O(h), delete O(h) (3 cases: leaf, one child, two children → replace with inorder successor), validate (pass min/max bounds down), floor/ceiling, kth smallest (inorder + counter), and convert sorted array to balanced BST. All degrade to O(n) for unbalanced trees.',
  gradient: 'from-emerald-600 to-green-700',
  topicSlug: 'tree',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `BST delete: (1) leaf → remove. (2) one child → replace with child. (3) two children → find inorder successor (leftmost of right subtree), copy its value, delete the successor. BST validation: pass (min, max) bounds to each node — node value must be strictly within bounds. Kth smallest: inorder traversal, stop at kth visited node.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'BST delete and validate templates',
      code: `// Delete node from BST
function deleteNode(root, key) {
    if (!root) return null;
    if (key < root.val) { root.left = deleteNode(root.left, key); }
    else if (key > root.val) { root.right = deleteNode(root.right, key); }
    else {
        if (!root.left) return root.right;  // 0 or 1 child
        if (!root.right) return root.left;
        // Two children: find inorder successor (min of right subtree)
        let succ = root.right;
        while (succ.left) succ = succ.left;
        root.val = succ.val;  // copy successor's value
        root.right = deleteNode(root.right, succ.val); // delete successor
    }
    return root;
}

// Validate BST with bounds
function isValidBST(node, min = -Infinity, max = Infinity) {
    if (!node) return true;
    if (node.val <= min || node.val >= max) return false;
    return isValidBST(node.left, min, node.val) &&
           isValidBST(node.right, node.val, max);
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
      title: 'Validate Binary Search Tree',
      url: 'https://leetcode.com/problems/validate-binary-search-tree/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Pass (min, max) bounds down recursively',
          explanation: `Every node must satisfy min < node.val < max. Root: no bounds. Left child: max = parent.val. Right child: min = parent.val.`,
          code: `var isValidBST = function(root,min=-Infinity,max=Infinity) {
    if(!root) return true;
    if(root.val<=min||root.val>=max) return false;
    return isValidBST(root.left,min,root.val)&&isValidBST(root.right,root.val,max);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Kth Smallest Element in a BST',
      url: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Inorder traversal with counter — kth visited node',
          explanation: `Inorder of BST gives sorted order. Count nodes visited; when count == k, record and stop. Use early termination to avoid full traversal.`,
          code: `var kthSmallest = function(root, k) {
    let count=0,res=0;
    const inorder=node=>{
        if(!node||count>=k) return;
        inorder(node.left);
        if(++count===k){res=node.val;return;}
        inorder(node.right);
    };
    inorder(root);
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Convert Sorted Array to Binary Search Tree',
      url: 'https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Recursively pick middle as root, recurse on halves',
          explanation: `Middle element becomes root (ensures balance). Left half → left subtree. Right half → right subtree. O(n) time, O(log n) space for recursion stack.`,
          code: `var sortedArrayToBST = function(nums) {
    if(!nums.length) return null;
    const m=nums.length>>1;
    const node={val:nums[m],left:null,right:null};
    node.left=sortedArrayToBST(nums.slice(0,m));
    node.right=sortedArrayToBST(nums.slice(m+1));
    return node;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Delete Node in a BST',
      url: 'https://leetcode.com/problems/delete-node-in-a-bst/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Recurse to find node, handle 3 deletion cases',
          explanation: `Find node: recurse left/right. On found: (1) leaf → null. (2) one child → return that child. (3) two children → find inorder successor (leftmost of right subtree), copy value, delete successor from right subtree.`,
          code: `var deleteNode = function(root, key) {
    if(!root) return null;
    if(key<root.val) root.left=deleteNode(root.left,key);
    else if(key>root.val) root.right=deleteNode(root.right,key);
    else{
        if(!root.left) return root.right;
        if(!root.right) return root.left;
        let succ=root.right;
        while(succ.left) succ=succ.left;
        root.val=succ.val;
        root.right=deleteNode(root.right,succ.val);
    }
    return root;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Trim a Binary Search Tree',
      url: 'https://leetcode.com/problems/trim-a-binary-search-tree/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Recurse — skip subtrees outside [low, high]',
          explanation: `If node.val < low: entire left subtree also too small → return trimmed right subtree. If node.val > high: return trimmed left subtree. Else: trim both children.`,
          code: `var trimBST = function(root, low, high) {
    if(!root) return null;
    if(root.val<low) return trimBST(root.right,low,high);
    if(root.val>high) return trimBST(root.left,low,high);
    root.left=trimBST(root.left,low,high);
    root.right=trimBST(root.right,low,high);
    return root;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🌳',
      color: 'green',
      content: `**BST property use cases:**\n- Search/insert: O(h) — go left if less, right if greater\n- Validation: pass min/max bounds, each node must be strictly between them\n- Kth smallest: inorder (O(h+k)) — don't need to traverse all n nodes\n- Floor: largest value ≤ target — recurse right when root < target\n- Ceiling: smallest value ≥ target — recurse left when root > target\n\n**Delete 3 cases:** Leaf, one child, two children. For two children: inorder successor = leftmost of right subtree. Copy value, recursively delete successor (which has at most one right child).`,
    },
  ],
}
