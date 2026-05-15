import type { Article } from '../articles'

export const jumpGameVariantsArticle: Article = {
  slug: 'jump-game-variants',
  title: 'Jump Game Variants',
  emoji: '🦘',
  tagline: 'Reachability and minimum jumps. BFS, greedy, DP on jump range problems.',
  description: 'Jump game problems ask whether a position is reachable or the minimum jumps to reach it. Jump Game I/II: greedy with max-reach tracking. Jump Game III: BFS/DFS for reachability with arbitrary jump directions. Jump Game IV: BFS with grouping by value. Jump Game VI: DP with sliding window deque. The family tests multiple algorithmic approaches on similar problem structures.',
  gradient: 'from-green-600 to-lime-700',
  topicSlug: 'graph',
  readTime: '13 min',
  sections: [
    {
      type: 'text',
      content: `Jump Game I (can reach end?): track maxReach greedily. If current index > maxReach, stuck. Jump Game II (min jumps): greedy with current reach and next reach. When current reach exhausted, take another jump. Jump Game III (reach 0?): BFS, enqueue index ± jump[index]. Jump Game IV (min jumps, value-grouped): BFS grouping same-value indices, jump to all in same group in one step.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Jump Game I and II greedy templates',
      code: `// Jump Game I — can reach end?
function canJump(nums) {
    let maxReach = 0;
    for (let i = 0; i <= maxReach && i < nums.length; i++)
        maxReach = Math.max(maxReach, i + nums[i]);
    return maxReach >= nums.length - 1;
}

// Jump Game II — minimum jumps to reach end
function jump(nums) {
    let jumps = 0, curEnd = 0, farthest = 0;
    for (let i = 0; i < nums.length - 1; i++) {
        farthest = Math.max(farthest, i + nums[i]);
        if (i === curEnd) { // reached end of current jump range
            jumps++;
            curEnd = farthest;
        }
    }
    return jumps;
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
      title: 'Jump Game',
      url: 'https://leetcode.com/problems/jump-game/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Greedy — track maximum reachable index',
          explanation: `Iterate from left to right. Maintain maxReach = farthest index reachable so far. If current index i > maxReach, we\'re stuck. Update maxReach = max(maxReach, i + nums[i]).`,
          code: `var canJump = function(nums) {
    let max=0;
    for(let i=0;i<nums.length;i++){
        if(i>max) return false;
        max=Math.max(max,i+nums[i]);
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
      title: 'Jump Game II',
      url: 'https://leetcode.com/problems/jump-game-ii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Greedy BFS levels — jump count = number of BFS levels',
          explanation: `Think of it as BFS: current "level" = [curStart, curEnd]. When we exhaust current level (i reaches curEnd), increment jump count, new level starts at curEnd+1 with new farthest reach.`,
          code: `var jump = function(nums) {
    let jumps=0,curEnd=0,farthest=0;
    for(let i=0;i<nums.length-1;i++){
        farthest=Math.max(farthest,i+nums[i]);
        if(i===curEnd){jumps++;curEnd=farthest;}
    }
    return jumps;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Jump Game III',
      url: 'https://leetcode.com/problems/jump-game-iii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: BFS/DFS — from index i, can jump to i+arr[i] or i-arr[i]',
          explanation: `BFS from start index. At each index i, explore i+arr[i] and i-arr[i] if in bounds and not visited. Return true if we reach index with arr[index] == 0.`,
          code: `var canReach = function(arr, start) {
    const n=arr.length, vis=new Array(n).fill(false);
    const q=[start]; vis[start]=true;
    while(q.length){
        const i=q.shift();
        if(arr[i]===0) return true;
        for(const ni of [i+arr[i],i-arr[i]])
            if(ni>=0&&ni<n&&!vis[ni]){vis[ni]=true;q.push(ni);}
    }
    return false;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Jump Game IV',
      url: 'https://leetcode.com/problems/jump-game-iv/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: BFS with value groups — visit all same-value indices in one step',
          explanation: `Group indices by value. BFS from index 0. At each index i: enqueue i-1, i+1, and all indices with same value as arr[i]. After processing a group, delete it to avoid revisiting. Track minimum steps.`,
          code: `var minJumps = function(arr) {
    const n=arr.length;
    if(n===1) return 0;
    const groups=new Map();
    for(let i=0;i<n;i++){
        if(!groups.has(arr[i])) groups.set(arr[i],[]);
        groups.get(arr[i]).push(i);
    }
    const vis=new Array(n).fill(false); vis[0]=true;
    let q=[0], steps=0;
    while(q.length){
        steps++;
        const next=[];
        for(const i of q){
            const neighbors=[i-1,i+1,...(groups.get(arr[i])||[])];
            groups.delete(arr[i]); // avoid revisiting same group
            for(const ni of neighbors){
                if(ni===n-1) return steps;
                if(ni>=0&&ni<n&&!vis[ni]){vis[ni]=true;next.push(ni);}
            }
        }
        q=next;
    }
    return -1;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🦘',
      color: 'green',
      content: `**Jump Game family decision tree:**\n- Can reach end? → Greedy maxReach (I)\n- Min jumps, forward only? → Greedy BFS levels (II)\n- Bidirectional jumps, reach 0? → BFS/DFS (III)\n- Teleport to same-value indices? → BFS with value groups (IV)\n- Max score with window constraint? → DP + monotonic deque (VI)\n- Reach index = 0 in string? → Sliding window reachability (VII)\n\n**Greedy vs BFS:** Greedy works when jumps are monotone (longer = better). BFS needed when jumps go in different directions or teleport between non-adjacent indices.`,
    },
  ],
}
