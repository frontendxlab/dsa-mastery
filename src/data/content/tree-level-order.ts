import type { Article } from '../articles'

export const treeLevelOrderArticle: Article = {
  slug: 'tree-level-order',
  title: 'Tree Level-Order Variants',
  emoji: '🌊',
  tagline: 'BFS tree traversals: zigzag, right side view, level averages, cousins.',
  description: 'Level-order (BFS) traversal processes a tree level by level. Variants: zigzag (alternate left-right and right-left), right side view (last node of each level), level averages, level maximum, cousins check (same level, different parents), vertical order traversal, and boundary traversal. All share the same BFS template with slight modifications per level.',
  gradient: 'from-teal-600 to-green-700',
  topicSlug: 'tree',
  readTime: '12 min',
  sections: [
    {
      type: 'text',
      content: `BFS template: queue=[root], process level by level (snapshot queue size each level). Right side view: take last node of each level. Zigzag: alternate direction each level (reverse odd levels). Level averages: sum / count per level. Vertical order: group by column offset (left child = col-1, right child = col+1). All these variations touch the same BFS code with different collection logic.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Level-order BFS template and zigzag variant',
      code: `// Generic level-order BFS template
function levelOrder(root) {
    if (!root) return [];
    const result = [], queue = [root];
    while (queue.length) {
        const level = [];
        const size = queue.length; // snapshot size for this level
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            level.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        result.push(level);
    }
    return result;
}

// Zigzag: reverse alternate levels
function zigzagLevelOrder(root) {
    if (!root) return [];
    const result = [], queue = [root];
    let leftToRight = true;
    while (queue.length) {
        const size = queue.length, level = [];
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            leftToRight ? level.push(node.val) : level.unshift(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        result.push(level);
        leftToRight = !leftToRight;
    }
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
      title: 'Binary Tree Right Side View',
      url: 'https://leetcode.com/problems/binary-tree-right-side-view/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: BFS, take last node of each level',
          explanation: `Standard BFS. For each level, the last node processed is the rightmost visible node. Add it to result.`,
          code: `var rightSideView = function(root) {
    if(!root) return [];
    const res=[], q=[root];
    while(q.length){
        const sz=q.length;
        for(let i=0;i<sz;i++){
            const n=q.shift();
            if(i===sz-1) res.push(n.val);
            if(n.left) q.push(n.left);
            if(n.right) q.push(n.right);
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
      num: 2,
      title: 'Binary Tree Zigzag Level Order Traversal',
      url: 'https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: BFS with direction flag — alternate push vs unshift',
          explanation: `Standard BFS. Toggle direction each level. Left-to-right: push to level array. Right-to-left: unshift (prepend) to level array.`,
          code: `var zigzagLevelOrder = function(root) {
    if(!root) return [];
    const res=[], q=[root]; let ltr=true;
    while(q.length){
        const sz=q.length,lvl=[];
        for(let i=0;i<sz;i++){
            const n=q.shift();
            ltr?lvl.push(n.val):lvl.unshift(n.val);
            if(n.left) q.push(n.left);
            if(n.right) q.push(n.right);
        }
        res.push(lvl); ltr=!ltr;
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
      title: 'Average of Levels in Binary Tree',
      url: 'https://leetcode.com/problems/average-of-levels-in-binary-tree/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: BFS, compute average per level',
          explanation: `BFS. For each level, sum all values and divide by count. Push to result.`,
          code: `var averageOfLevels = function(root) {
    const res=[], q=[root];
    while(q.length){
        const sz=q.length; let sum=0;
        for(let i=0;i<sz;i++){
            const n=q.shift(); sum+=n.val;
            if(n.left) q.push(n.left);
            if(n.right) q.push(n.right);
        }
        res.push(sum/sz);
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Vertical Order Traversal of a Binary Tree',
      url: 'https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: BFS with (node, col, row), group by col, sort within col',
          explanation: `BFS carrying (node, col, row). Collect all (val, row, col). Group by col. Sort each col by (row, val). Output groups from min to max col.`,
          code: `var verticalTraversal = function(root) {
    const nodes=[];
    const bfs=(node,row,col)=>{
        if(!node) return;
        nodes.push([col,row,node.val]);
        bfs(node.left,row+1,col-1);
        bfs(node.right,row+1,col+1);
    };
    bfs(root,0,0);
    nodes.sort((a,b)=>a[0]-b[0]||a[1]-b[1]||a[2]-b[2]);
    const map=new Map();
    for(const [col,_,val] of nodes){
        if(!map.has(col)) map.set(col,[]);
        map.get(col).push(val);
    }
    return [...new Map([...map].sort((a,b)=>a[0]-b[0])).values()];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🌊',
      color: 'teal',
      content: `**BFS level template:** queue=[root]; while(queue.length) { const sz=queue.length; for i in 0..sz { process node, enqueue children } }\n\n**Level-order variations:**\n- Right side view: result.push(level[level.length-1])\n- Zigzag: toggle push vs unshift, or use direction flag\n- Averages: sum/count per level\n- Maximum: Math.max(...level)\n- Connect next right pointers: directly connect nodes within level loop\n\n**DFS alternative for right side view:** DFS tracking depth; if depth == result.length, add to result (first visit = leftmost). For right side view, process right before left.`,
    },
  ],
}
