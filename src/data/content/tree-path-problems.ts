import type { Article } from '../articles'

export const treePathProblemsArticle: Article = {
  slug: 'tree-path-problems',
  title: 'Tree Path Problems',
  emoji: '🌿',
  tagline: 'Root-to-leaf paths, path sums, max path through any nodes.',
  description: 'Tree path problems track information along paths from root to leaves or between any two nodes. Key patterns: root-to-leaf path sum (DFS carrying accumulated sum), find all paths equaling target (backtracking DFS), maximum path sum through any node (post-order: max contribution from left/right subtrees), path XOR queries (prefix XOR from root), and diameter of a tree (longest path through any node).',
  gradient: 'from-green-600 to-teal-700',
  topicSlug: 'tree',
  readTime: '13 min',
  sections: [
    {
      type: 'text',
      content: `Root-to-leaf path sum: DFS carrying remaining target. At leaf, check if remaining == 0. Backtracking path finding: add node to path, recurse, remove node. Max path sum: at each node, best path through it = node.val + max(0, left_contribution) + max(0, right_contribution). Update global max. Return node.val + max(0, max(left, right)) to parent (can only extend one side upward).`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Max path sum and all paths templates',
      code: `// Maximum path sum through any node
function maxPathSum(root) {
    let maxSum = -Infinity;
    function dfs(node) {
        if (!node) return 0;
        const left = Math.max(0, dfs(node.left));   // don't take negative subtrees
        const right = Math.max(0, dfs(node.right));
        maxSum = Math.max(maxSum, node.val + left + right); // path through this node
        return node.val + Math.max(left, right); // extend only one side upward
    }
    dfs(root);
    return maxSum;
}

// Find all root-to-leaf paths summing to target
function pathSum(root, target) {
    const result = [], path = [];
    function dfs(node, remaining) {
        if (!node) return;
        path.push(node.val);
        if (!node.left && !node.right && remaining === node.val)
            result.push([...path]);
        dfs(node.left, remaining - node.val);
        dfs(node.right, remaining - node.val);
        path.pop(); // backtrack
    }
    dfs(root, target);
    return result;
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
          label: 'Intuition 1: Post-order — max contribution from each subtree',
          explanation: `DFS returns max gain from this node going down (one direction). At each node, update global max with left_gain + node.val + right_gain. Return node.val + max(left_gain, right_gain, 0) to parent.`,
          code: `var maxPathSum = function(root) {
    let max=-Infinity;
    const dfs=node=>{
        if(!node) return 0;
        const l=Math.max(0,dfs(node.left)), r=Math.max(0,dfs(node.right));
        max=Math.max(max,node.val+l+r);
        return node.val+Math.max(l,r);
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
      title: 'Path Sum II',
      url: 'https://leetcode.com/problems/path-sum-ii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DFS with backtracking — build path, check at leaves',
          explanation: `DFS carries current path and remaining sum. At each node: add to path, if leaf and remaining==node.val → found path. Recurse children. Remove from path (backtrack).`,
          code: `var pathSum = function(root, targetSum) {
    const res=[], path=[];
    const dfs=(node,rem)=>{
        if(!node) return;
        path.push(node.val);
        if(!node.left&&!node.right&&rem===node.val) res.push([...path]);
        dfs(node.left,rem-node.val);
        dfs(node.right,rem-node.val);
        path.pop();
    };
    dfs(root,targetSum);
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Path Sum III',
      url: 'https://leetcode.com/problems/path-sum-iii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Prefix sum on root-to-current path — count how many prefix sums = curr - target',
          explanation: `Track prefix sum from root to current node. If (prefixSum - target) exists in map, that many paths end here with sum = target. Use HashMap of {prefixSum: count}. Add current sum before recursing, remove after (backtrack).`,
          code: `var pathSum = function(root, targetSum) {
    let count=0;
    const map=new Map([[0,1]]);
    const dfs=(node,curr)=>{
        if(!node) return;
        curr+=node.val;
        count+=(map.get(curr-targetSum)||0);
        map.set(curr,(map.get(curr)||0)+1);
        dfs(node.left,curr); dfs(node.right,curr);
        map.set(curr,map.get(curr)-1);
    };
    dfs(root,0);
    return count;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Sum Root to Leaf Numbers',
      url: 'https://leetcode.com/problems/sum-root-to-leaf-numbers/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DFS carrying current number, add at leaves',
          explanation: `DFS carries the number formed so far: curr = curr * 10 + node.val. At leaves, add curr to total. Non-leaves: recurse left and right.`,
          code: `var sumNumbers = function(root) {
    const dfs=(node,curr)=>{
        if(!node) return 0;
        curr=curr*10+node.val;
        if(!node.left&&!node.right) return curr;
        return dfs(node.left,curr)+dfs(node.right,curr);
    };
    return dfs(root,0);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Count Good Nodes in Binary Tree',
      url: 'https://leetcode.com/problems/count-good-nodes-in-binary-tree/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DFS carrying max value on path from root',
          explanation: `A node is "good" if no node on the path from root to it has a greater value. DFS carries maxSoFar. If node.val >= maxSoFar, it's good. Update maxSoFar = max(maxSoFar, node.val) for children.`,
          code: `var goodNodes = function(root) {
    const dfs=(node,mx)=>{
        if(!node) return 0;
        const good=node.val>=mx?1:0;
        const nm=Math.max(mx,node.val);
        return good+dfs(node.left,nm)+dfs(node.right,nm);
    };
    return dfs(root,-Infinity);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🌿',
      color: 'green',
      content: `**Tree path DFS patterns:**\n- Root-to-leaf: carry accumulated value down (sum, number formed, XOR)\n- Any-path max: post-order, compute contribution at each node, update global\n- Count paths = target: prefix sum + HashMap (Path Sum III pattern)\n- Backtracking paths: add to path before recurse, pop after\n\n**Max path sum trick:** At each node, you can take the path through it (left + node + right). But you can only extend one side to parent. So return node + max(left, right, 0) upward.`,
    },
  ],
}
