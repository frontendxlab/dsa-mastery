import type { Article } from '../articles'

export const iterativeTraversalArticle: Article = {
  slug: 'iterative-traversal',
  title: 'Iterative Tree & Graph Traversal',
  emoji: '🔁',
  tagline: 'DFS without recursion. Explicit stack for inorder, preorder, postorder, Morris.',
  description: 'Recursive tree traversal can cause stack overflow for deep trees (n > 10^4). Iterative versions use an explicit stack. Preorder: push right then left. Inorder: go left until null, process, go right. Postorder: reverse of modified preorder. Morris traversal: inorder in O(1) space by threading the tree. Iterative DFS on graphs: same stack-based approach.',
  gradient: 'from-slate-600 to-gray-700',
  topicSlug: 'tree',
  readTime: '13 min',
  sections: [
    {
      type: 'text',
      content: `Iterative inorder (left-root-right): push nodes while going left; when null, pop, process, go right. Iterative preorder (root-left-right): push root; pop and process; push right then left child. Postorder: preorder but push left before right, reverse result. Morris inorder: use null right pointers as threads back to ancestor, no extra space.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Iterative inorder, preorder, and postorder',
      code: `// Iterative inorder (left-root-right)
function inorderIterative(root) {
    const result = [], stack = [];
    let curr = root;
    while (curr || stack.length) {
        while (curr) { stack.push(curr); curr = curr.left; }
        curr = stack.pop();
        result.push(curr.val);
        curr = curr.right;
    }
    return result;
}

// Iterative preorder (root-left-right)
function preorderIterative(root) {
    if (!root) return [];
    const result = [], stack = [root];
    while (stack.length) {
        const node = stack.pop();
        result.push(node.val);
        if (node.right) stack.push(node.right); // push right first (processed last)
        if (node.left) stack.push(node.left);
    }
    return result;
}

// Iterative postorder (left-right-root)
function postorderIterative(root) {
    if (!root) return [];
    const result = [], stack = [root];
    while (stack.length) {
        const node = stack.pop();
        result.unshift(node.val); // add to front
        if (node.left) stack.push(node.left);
        if (node.right) stack.push(node.right);
    }
    return result; // reverse preorder (root-right-left) → postorder
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
      title: 'Binary Tree Inorder Traversal',
      url: 'https://leetcode.com/problems/binary-tree-inorder-traversal/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Iterative with explicit stack',
          explanation: `Maintain curr pointer and stack. Push curr while going left. When curr is null, pop from stack (that\'s the next inorder node), add to result, move to its right child.`,
          code: `var inorderTraversal = function(root) {
    const res=[], stack=[];
    let curr=root;
    while(curr||stack.length){
        while(curr){stack.push(curr);curr=curr.left;}
        curr=stack.pop();
        res.push(curr.val);
        curr=curr.right;
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Binary Search Tree Iterator',
      url: 'https://leetcode.com/problems/binary-search-tree-iterator/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Controlled inorder traversal — advance only when next() called',
          explanation: `Same as iterative inorder but paused. Constructor: push all left spine. next(): pop from stack, push all left spine of right child. hasNext(): stack not empty.`,
          code: `var BSTIterator = function(root) {
    this.stack=[];
    this._push(root);
};
BSTIterator.prototype._push = function(node) {
    while(node){this.stack.push(node);node=node.left;}
};
BSTIterator.prototype.next = function() {
    const node=this.stack.pop();
    this._push(node.right);
    return node.val;
};
BSTIterator.prototype.hasNext = function() {
    return this.stack.length>0;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Flatten Binary Tree to Linked List',
      url: 'https://leetcode.com/problems/flatten-binary-tree-to-linked-list/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Morris traversal idea — find rightmost of left, point it to right',
          explanation: `For each node with a left child: find rightmost node of left subtree. Point its right to current's right. Move current's left to current's right. Set left to null. Advance to right child.`,
          code: `var flatten = function(root) {
    let curr=root;
    while(curr){
        if(curr.left){
            let rightmost=curr.left;
            while(rightmost.right) rightmost=rightmost.right;
            rightmost.right=curr.right;
            curr.right=curr.left;
            curr.left=null;
        }
        curr=curr.right;
    }
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
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Inorder traversal — find two nodes out of order',
          explanation: `Inorder traversal of a BST should be sorted. Two swapped nodes create (at most) two places where prev > curr. First violation: first = prev, second = curr. Second violation: second = curr. Swap first and second values.`,
          code: `var recoverTree = function(root) {
    let first=null,second=null,prev=null;
    const inorder=(node)=>{
        if(!node) return;
        inorder(node.left);
        if(prev&&prev.val>node.val){
            if(!first) first=prev;
            second=node;
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
      type: 'callout',
      icon: '🔁',
      color: 'gray',
      content: `**Iterative traversal patterns:**\n- Preorder: push right then left (so left processed first)\n- Inorder: go left until null, pop+process, go right\n- Postorder: reverse modified preorder (push left then right, add to front)\n- Level-order: use queue, process all nodes at each level\n\n**Morris traversal (O(1) space):** Thread right pointers of inorder predecessors back to current node. Two passes per node — first visit sets thread, second visit uses it. Restores tree structure after traversal.\n\n**BST Iterator pattern:** Lazy inorder traversal — only advance when next() called. Push left spine of right child after popping. Amortized O(1) per call.`,
    },
  ],
}
