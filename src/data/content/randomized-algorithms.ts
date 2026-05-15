import type { Article } from '../articles'

export const randomizedAlgorithmsArticle: Article = {
  slug: 'randomized-algorithms',
  title: 'Randomized Algorithms',
  emoji: '🎲',
  tagline: 'Random choices eliminate worst cases. Reservoir sampling, random pivot, shuffle.',
  description: 'Randomized algorithms use randomness to avoid adversarial worst cases, simplify implementation, or achieve expected O(n log n) where deterministic fails. Key techniques: reservoir sampling (uniform random sample from stream), Fisher-Yates shuffle (perfect permutation), randomized QuickSelect (O(n) expected), random pivot QuickSort, and skip lists. Essential for streaming problems and when input might be adversarial.',
  gradient: 'from-pink-500 to-rose-600',
  topicSlug: 'dp',
  readTime: '13 min',
  sections: [
    {
      type: 'text',
      content: `Randomized algorithms exchange deterministic guarantees for expected-case guarantees. The classic example: QuickSort with fixed pivot is O(n²) on sorted input — with random pivot, expected O(n log n) regardless of input. Reservoir sampling solves "pick k uniform random items from a stream of unknown length" elegantly: keep k items, each new item i replaces a random previous item with probability k/i.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Core randomized algorithm templates',
      code: `// Reservoir sampling — pick k items uniformly at random from stream
function reservoirSample(stream, k) {
    const reservoir = stream.slice(0, k);
    for (let i = k; i < stream.length; i++) {
        const j = Math.floor(Math.random() * (i + 1)); // random in [0, i]
        if (j < k) reservoir[j] = stream[i]; // replace with probability k/(i+1)
    }
    return reservoir;
}

// Fisher-Yates shuffle — O(n), uniform random permutation
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Randomized QuickSelect — O(n) expected k-th smallest
function quickSelect(arr, k) { // k is 1-indexed
    const pivot = arr[Math.floor(Math.random() * arr.length)];
    const lo = arr.filter(x => x < pivot);
    const mid = arr.filter(x => x === pivot);
    const hi = arr.filter(x => x > pivot);
    if (k <= lo.length) return quickSelect(lo, k);
    if (k <= lo.length + mid.length) return pivot;
    return quickSelect(hi, k - lo.length - mid.length);
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
      title: 'Shuffle an Array',
      url: 'https://leetcode.com/problems/shuffle-an-array/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Fisher-Yates shuffle',
          explanation: `For each position i from end to 0, swap with a random position in [0, i]. Each permutation is equally likely. O(n) time and space.`,
          code: `class Solution {
    constructor(nums) { this.original=[...nums]; this.nums=[...nums]; }
    reset() { this.nums=[...this.original]; return this.nums; }
    shuffle() {
        for(let i=this.nums.length-1;i>0;i--){
            const j=Math.floor(Math.random()*(i+1));
            [this.nums[i],this.nums[j]]=[this.nums[j],this.nums[i]];
        }
        return this.nums;
    }
}`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Random Pick with Weight',
      url: 'https://leetcode.com/problems/random-pick-with-weight/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Prefix sums + binary search',
          explanation: `Build prefix sums. Generate random float in [0, total). Binary search to find which bucket it falls into. Index with larger prefix sum = higher probability.`,
          code: `class Solution {
    constructor(w) {
        this.prefix=[]; let s=0;
        for(const x of w) this.prefix.push(s+=x);
        this.total=s;
    }
    pickIndex() {
        const r=Math.random()*this.total;
        let lo=0,hi=this.prefix.length-1;
        while(lo<hi){const mid=(lo+hi)>>1;this.prefix[mid]<=r?lo=mid+1:hi=mid;}
        return lo;
    }
}`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Linked List Random Node',
      url: 'https://leetcode.com/problems/linked-list-random-node/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Reservoir sampling — O(1) space, single pass',
          explanation: `Walk the list. For node at position i (1-indexed), replace current result with this node with probability 1/i. After processing all n nodes, each node has been selected with probability 1/n (uniform).`,
          code: `class Solution {
    constructor(head) { this.head=head; }
    getRandom() {
        let node=this.head, res=node.val, i=1;
        while(node=node.next){
            i++;
            // Replace with probability 1/i
            if(Math.floor(Math.random()*i)===0) res=node.val;
        }
        return res;
    }
}`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Random Pick Index',
      url: 'https://leetcode.com/problems/random-pick-index/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Reservoir sampling over matching indices',
          explanation: `Without preprocessing: scan array, apply reservoir sampling only to indices where nums[i] = target. Count matching positions, each new match replaces result with probability 1/count.`,
          code: `class Solution {
    constructor(nums) { this.nums=nums; }
    pick(target) {
        let res=-1, count=0;
        for(let i=0;i<this.nums.length;i++){
            if(this.nums[i]===target){
                count++;
                if(Math.floor(Math.random()*count)===0) res=i;
            }
        }
        return res;
    }
}`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Random Point in Non-overlapping Rectangles',
      url: 'https://leetcode.com/problems/random-point-in-non-overlapping-rectangles/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Weighted random rectangle + uniform point in it',
          explanation: `Weight each rectangle by its area. Use prefix sum + binary search to pick a rectangle proportional to area. Then pick a uniform random point within that rectangle.`,
          code: `class Solution {
    constructor(rects) {
        this.rects=rects;
        this.prefix=[]; let s=0;
        for(const[x1,y1,x2,y2] of rects)
            this.prefix.push(s+=(x2-x1+1)*(y2-y1+1));
        this.total=s;
    }
    pick() {
        const r=Math.floor(Math.random()*this.total);
        let lo=0,hi=this.prefix.length-1;
        while(lo<hi){const mid=(lo+hi)>>1;this.prefix[mid]<=r?lo=mid+1:hi=mid;}
        const[x1,y1,x2,y2]=this.rects[lo];
        return[x1+Math.floor(Math.random()*(x2-x1+1)),
               y1+Math.floor(Math.random()*(y2-y1+1))];
    }
}`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🎲',
      color: 'red',
      content: `**Reservoir sampling proof:** After processing n items with k=1, item at position i was kept iff it replaced the previous choice AND no subsequent item replaced it. Probability = (1/i) * (i/(i+1)) * ((i+1)/(i+2)) * ... * ((n-1)/n) = 1/n. ✓\n\n**When to randomize:**\n- QuickSort/QuickSelect on unknown input (avoid O(n²) worst case)\n- Sampling from stream without knowing length\n- Hashing (random hash functions avoid collisions)\n- Testing / approximation algorithms\n\n**Fisher-Yates correctness:** Each of n! permutations is equally likely. After k iterations, the last k elements form a uniform random k-permutation.`,
    },
  ],
}
