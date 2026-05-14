import type { Article } from '../articles'

export const dpOnTreesArticle: Article = {
  slug: 'dp-on-trees',
  title: 'DP on Trees',
  emoji: '🌳',
  tagline: 'Postorder + return value = tree DP. Same template solves diameter, max path, subtree counts.',
  description: 'Tree DP combines dynamic programming with postorder DFS. The child subtrees are subproblems. Learn the postorder-return template, rerooting technique, and how diameter, max path sum, and subtree problems all share the same skeleton.',
  gradient: 'from-green-400 to-emerald-500',
  topicSlug: 'tree',
  readTime: '18 min',
  sections: [
    {
      type: 'text',
      content: `Tree DP is the natural marriage of DFS and dynamic programming. The key insight: after processing all children of a node, you have exactly the information you need to compute the node's own answer. This is postorder DFS. The hard part is figuring out what each recursive call should return.`,
    },
    {
      type: 'callout',
      icon: '🔑',
      color: 'teal',
      content: `**Tree DP framework:**\n1. Identify what each recursive call should RETURN (usually: best value in subtree rooted at this node)\n2. Identify what GLOBAL state to update (often: best answer that goes THROUGH this node = left + node + right)\n3. The return value goes UP to parent. The global update captures paths that use this node as the "turning point".\n\nKey distinction: **return value** (goes up, must be a single branch) vs **global update** (can be the full path through this node).`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Template — Postorder Return',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Tree DP — the universal template',
      code: `// Template: DFS returns the "best single-branch contribution" from this subtree
// Global variable tracks the answer that goes THROUGH any node (uses both children)
let globalAns = -Infinity;

function dfs(node) {
    if (!node) return 0; // base case: null contributes 0

    const leftVal  = dfs(node.left);   // best from left subtree
    const rightVal = dfs(node.right);  // best from right subtree

    // === Update global answer (path going through this node) ===
    // This path can use BOTH left and right — the "bridge" at this node
    globalAns = Math.max(globalAns, leftVal + node.val + rightVal);

    // === Return to parent: only ONE branch (left OR right, not both) ===
    return node.val + Math.max(leftVal, rightVal);
}

// For diameter (length, not sum):
// leftVal = depth of left subtree, rightVal = depth of right subtree
// globalAns = max(leftVal + rightVal) — longest path through this node
// return 1 + max(leftVal, rightVal)  — depth including this node`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Rerooting Technique',
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'amber',
      content: `**Rerooting:** Sometimes the answer at each node depends on the rest of the tree ABOVE it, not just below. Two-pass DFS:\n1. First DFS (bottom-up): compute subtree answers (sizes, sums, depths)\n2. Second DFS (top-down): propagate parent's contribution down\n\nUsed for: "sum of distances to all nodes", "find the node that minimizes total distance", problems where each node needs FULL tree info.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Rerooting — sum of distances from every node',
      code: `function sumOfDistancesInTree(n, edges) {
    const graph = Array.from({length:n}, ()=>[]);
    for(const [u,v] of edges){ graph[u].push(v); graph[v].push(u); }

    const count = new Array(n).fill(1); // subtree sizes
    const dist  = new Array(n).fill(0); // dist[i] = sum of distances from node i in its subtree

    // Pass 1: DFS from node 0 (bottom-up)
    const dfs1 = (node, parent) => {
        for(const nb of graph[node]){
            if(nb===parent) continue;
            dfs1(nb, node);
            count[node] += count[nb];
            dist[node]  += dist[nb] + count[nb]; // each node in nb's subtree is 1 further
        }
    };

    // Pass 2: Reroot — propagate from parent to children (top-down)
    const dfs2 = (node, parent) => {
        for(const nb of graph[node]){
            if(nb===parent) continue;
            // When we reroot from node to nb:
            // - nb's subtree (count[nb] nodes) gets 1 closer
            // - rest of tree (n - count[nb] nodes) gets 1 further
            dist[nb] = dist[node] - count[nb] + (n - count[nb]);
            dfs2(nb, node);
        }
    };

    dfs1(0, -1);
    dfs2(0, -1);
    return dist;
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
      title: 'Diameter of Binary Tree',
      url: 'https://leetcode.com/problems/diameter-of-binary-tree/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Postorder — diameter at each node = left depth + right depth',
          explanation: 'For each node, the longest path through it = left_depth + right_depth. Track global max. Return max(left, right) + 1 as depth to parent.',
          code: `var diameterOfBinaryTree = function(root) {
    let ans=0;
    const dfs=node=>{
        if(!node) return 0;
        const l=dfs(node.left), r=dfs(node.right);
        ans=Math.max(ans,l+r);  // path through this node
        return Math.max(l,r)+1; // depth returned to parent
    };
    dfs(root);
    return ans;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Binary Tree Maximum Path Sum',
      url: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Postorder — same template as diameter but with values',
          explanation: 'Clamp negative gains to 0 (never extend path with negative subtree). Global max = left_gain + node.val + right_gain. Return node.val + max(left, right) gain.',
          code: `var maxPathSum = function(root) {
    let ans=-Infinity;
    const dfs=node=>{
        if(!node) return 0;
        const l=Math.max(0,dfs(node.left));
        const r=Math.max(0,dfs(node.right));
        ans=Math.max(ans, l+node.val+r);
        return node.val+Math.max(l,r);
    };
    dfs(root);
    return ans;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'House Robber III',
      url: 'https://leetcode.com/problems/house-robber-iii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Each node returns [rob_this, skip_this]',
          explanation: 'If you rob this node: must skip children. If you skip: take max of (rob/skip) for each child independently. Return pair [rob, skip] up the tree.',
          code: `var rob = function(root) {
    const dfs = node => {
        if(!node) return [0,0]; // [rob_this, skip_this]
        const [lRob,lSkip] = dfs(node.left);
        const [rRob,rSkip] = dfs(node.right);
        const rob  = node.val + lSkip + rSkip;          // rob this, must skip children
        const skip = Math.max(lRob,lSkip) + Math.max(rRob,rSkip); // skip this, choose best for each child
        return [rob, skip];
    };
    return Math.max(...dfs(root));
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Sum of Distances in Tree',
      url: 'https://leetcode.com/problems/sum-of-distances-in-tree/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Rerooting — two-pass DFS',
          explanation: 'Pass 1: compute subtree sizes and sum of distances from node 0. Pass 2: reroot from parent to child using formula dist[child] = dist[parent] - count[child] + (n - count[child]).',
          code: `var sumOfDistancesInTree = function(n, edges) {
    const g=Array.from({length:n},()=>[]);
    for(const [u,v] of edges){g[u].push(v);g[v].push(u);}
    const cnt=new Array(n).fill(1), d=new Array(n).fill(0);
    const dfs1=(u,p)=>{
        for(const v of g[u]) if(v!==p){dfs1(v,u);cnt[u]+=cnt[v];d[u]+=d[v]+cnt[v];}
    };
    const dfs2=(u,p)=>{
        for(const v of g[u]) if(v!==p){d[v]=d[u]-cnt[v]+(n-cnt[v]);dfs2(v,u);}
    };
    dfs1(0,-1); dfs2(0,-1);
    return d;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Longest ZigZag Path in a Binary Tree',
      url: 'https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DFS passing direction and current length',
          explanation: 'DFS(node, goLeft, length): if we go left and the last direction was right (or vice versa), extend length. Otherwise reset to 1. Track global max.',
          code: `var longestZigZag = function(root) {
    let ans=0;
    // goLeft: should we go left at this node to continue zigzag?
    const dfs=(node,goLeft,len)=>{
        if(!node) return;
        ans=Math.max(ans,len);
        if(goLeft){
            dfs(node.left, false, len+1); // continue zigzag
            dfs(node.right, true,  1);    // reset, new zigzag
        } else {
            dfs(node.right, true,  len+1);
            dfs(node.left,  false, 1);
        }
    };
    dfs(root, true, 0);
    dfs(root, false, 0);
    return ans;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧠',
      color: 'green',
      content: `**Tree DP checklist:**\n- What does the DFS function RETURN? (usually: best value in subtree, reachable from root of subtree via single path)\n- What GLOBAL variable tracks the actual answer? (usually: best path using this node as the "bend")\n- Do you need info from ABOVE the node? → rerooting (two passes)\n- Do you need to make a binary choice at each node? → return a tuple [choice_a, choice_b]\n- Standard template: clamp negative contributions to 0 for max-sum problems`,
    },
  ],
}
