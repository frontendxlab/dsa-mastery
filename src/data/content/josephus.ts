import type { Article } from '../articles'

export const josephusArticle: Article = {
  slug: 'josephus',
  title: 'Josephus Problem & Circular Elimination',
  emoji: '⭕',
  tagline: 'n people in a circle, every k-th eliminated. Find survivor\'s position in O(n).',
  description: 'The Josephus problem: n people in a circle, count k and eliminate every k-th person. Find the survivor\'s original position. O(n log n) using a balanced BST or Fenwick tree (simulate), O(n) using the mathematical recurrence J(n,k) = (J(n-1,k) + k) % n. Variations: find all elimination order, find position of multiple survivors, and circular queue simulations.',
  gradient: 'from-orange-700 to-amber-700',
  topicSlug: 'math',
  readTime: '12 min',
  sections: [
    {
      type: 'text',
      content: `Classic Josephus (k=2) has closed form J(n) = 2L + 1 where n = 2^m + L. General k: recurrence J(1,k) = 0 (0-indexed), J(n,k) = (J(n-1,k) + k) % n. This works because after eliminating the k-th person, we renumber the remaining n-1 people and solve the (n-1)-person problem. The offset +k maps from (n-1)-person numbering back to n-person numbering.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Josephus problem solutions',
      code: `// O(n) mathematical solution (0-indexed position)
function josephus(n, k) {
    let pos = 0; // survivor position in 1-person circle
    for (let i = 2; i <= n; i++) {
        pos = (pos + k) % i;
    }
    return pos; // 0-indexed: return pos+1 for 1-indexed
}

// O(n log n) simulation using order statistics (Fenwick tree)
// Returns full elimination order
function josephusOrder(n, k) {
    const bit = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) updateBIT(bit, i, 1, n);
    const order = [], alive = n;
    let cur = 0; // current 0-indexed rank among alive
    for (let i = 0; i < n; i++) {
        cur = (cur + k - 1) % (alive - i); // 0-indexed rank of next to remove
        const pos = findKth(bit, cur + 1, n); // 1-indexed actual position
        order.push(pos);
        updateBIT(bit, pos, -1, n);
        // cur stays at same 0-indexed rank (now pointing to next person)
    }
    return order;
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
      title: 'Find the Winner of the Circular Game',
      url: 'https://leetcode.com/problems/find-the-winner-of-the-circular-game/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Simulation with queue — O(nk)',
          explanation: `Use a queue. Rotate k-1 positions to the front, dequeue the k-th. Repeat. Last remaining = winner.`,
          code: `var findTheWinner = function(n, k) {
    const q=Array.from({length:n},(_,i)=>i+1);
    while(q.length>1)
        for(let i=0;i<k-1;i++) q.push(q.shift());
        q.shift();
    return q[0];
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Josephus formula — O(n)',
          explanation: `Apply recurrence: pos = 0; for i from 2 to n: pos = (pos + k) % i. Result is 0-indexed; add 1 for 1-indexed answer.`,
          code: `var findTheWinner = function(n, k) {
    let pos=0;
    for(let i=2;i<=n;i++) pos=(pos+k)%i;
    return pos+1;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Dota2 Senate',
      url: 'https://leetcode.com/problems/dota2-senate/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Greedy with two queues of indices',
          explanation: `Each senator bans the next senator of the opposing party. Use two queues (Radiant indices, Dire indices). Smaller index moves first — that senator eliminates the first of the other party. Winner re-joins at the back with index + n.`,
          code: `var predictPartyVictory = function(senate) {
    const r=[],d=[];
    for(let i=0;i<senate.length;i++)
        senate[i]==='R'?r.push(i):d.push(i);
    while(r.length&&d.length){
        const ri=r.shift(),di=d.shift();
        ri<di?r.push(ri+senate.length):d.push(di+senate.length);
    }
    return r.length?'Radiant':'Dire';
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Last Remaining Element',
      url: 'https://leetcode.com/problems/elimination-game/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Track left boundary, step, and direction',
          explanation: `Alternate left-to-right and right-to-left passes. Track: head (leftmost remaining), step (current gap), count (remaining numbers), direction. On left→right or right→left with odd count: head updates. Each round: step doubles, count halves.`,
          code: `var lastRemaining = function(n) {
    let head=1,step=1,left=true,remaining=n;
    while(remaining>1){
        if(left||remaining%2===1) head+=step;
        remaining>>=1; step<<=1; left=!left;
    }
    return head;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '⭕',
      color: 'amber',
      content: `**Josephus formula derivation:**\nAfter eliminating person at position k (0-indexed), renumber remaining: person k+1 → 0, k+2 → 1, ..., so new_pos = (old_pos - k - 1 + n) % (n-1). Inverse: old_pos = (new_pos + k) % n. Apply from n=1 up.\n\n**k=2 closed form:** Write n in binary as 2^m + L. Survivor = 2L + 1.\n\n**When to use O(n log n) simulation:** When you need the full elimination order, not just the winner. Use a Fenwick tree or balanced BST to find the k-th remaining element in O(log n).`,
    },
  ],
}
