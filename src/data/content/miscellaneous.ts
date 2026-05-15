import type { Article } from '../articles'

export const miscellaneousArticle: Article = {
  slug: 'miscellaneous',
  title: 'Miscellaneous Algorithms',
  emoji: '🧩',
  tagline: 'BFS on state space, majority vote, puzzle inversions — the patterns that don\'t fit elsewhere.',
  description: 'A collection of elegant standalone algorithms: Boyer-Moore majority vote, puzzle solvability via inversions, BFS on encoded state spaces, Reservoir sampling. Each solves its class of problems in optimal time.',
  gradient: 'from-violet-400 to-fuchsia-500',
  topicSlug: 'miscellaneous',
  readTime: '12 min',
  sections: [
    {
      type: 'text',
      content: `Some algorithms are too specific to belong to a broad category but important enough to know cold. Boyer-Moore majority vote is linear and constant space. Puzzle solvability is a parity check on inversions. BFS on encoded board state handles small state-space puzzles. These appear in interviews and contests; knowing the pattern instantly makes them trivial.`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Boyer-Moore Majority Vote',
    },
    {
      type: 'callout',
      icon: '🔑',
      color: 'teal',
      content: `**Majority element** appears > n/2 times. Boyer-Moore finds it in O(n) time, O(1) space.\n\n**Intuition:** Pair each non-majority element with a majority element and cancel them. The majority element survives because it has more than half the votes.\n\nFor n/3 majority: maintain 2 candidates simultaneously.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Boyer-Moore majority vote — O(n) time, O(1) space',
      code: `// Find element appearing > n/2 times (guaranteed to exist)
function majorityElement(nums) {
    let candidate = nums[0], count = 1;
    for (let i = 1; i < nums.length; i++) {
        if (count === 0) { candidate = nums[i]; count = 1; }
        else if (nums[i] === candidate) count++;
        else count--;
    }
    return candidate; // guaranteed majority exists
}

// Find all elements appearing > n/3 times
function majorityElementII(nums) {
    let cand1 = 0, cand2 = 1, cnt1 = 0, cnt2 = 0;
    for (const n of nums) {
        if (n === cand1) cnt1++;
        else if (n === cand2) cnt2++;
        else if (cnt1 === 0) { cand1 = n; cnt1 = 1; }
        else if (cnt2 === 0) { cand2 = n; cnt2 = 1; }
        else { cnt1--; cnt2--; }
    }
    // Verify (candidates aren't guaranteed to be majority)
    cnt1 = cnt2 = 0;
    for (const n of nums) {
        if (n === cand1) cnt1++;
        else if (n === cand2) cnt2++;
    }
    const res = [];
    if (cnt1 > nums.length / 3) res.push(cand1);
    if (cnt2 > nums.length / 3) res.push(cand2);
    return res;
}`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'BFS on State Space (Sliding Puzzles)',
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'blue',
      content: `**Sliding puzzle pattern:** Encode board as string. BFS from start state, target = goal string. Each state = one BFS level. Answer = levels to reach goal.\n\n**Key trick:** Find the blank position in the string, swap it with valid neighbors (accounting for 2D adjacency in flattened index).`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Sliding puzzle BFS — encoded state space',
      code: `// 2×3 board: find min moves to reach [[1,2,3],[4,5,0]]
function slidingPuzzle(board) {
    const target = '123450';
    const start = board.flat().join('');
    if (start === target) return 0;

    // 2D neighbors in flattened index for a 2×3 grid
    const neighbors = [[1,3],[0,2,4],[1,5],[0,4],[1,3,5],[2,4]];

    const visited = new Set([start]);
    const queue = [[start, 0]];

    while (queue.length) {
        const [state, steps] = queue.shift();
        const zero = state.indexOf('0');
        for (const neighbor of neighbors[zero]) {
            const arr = state.split('');
            [arr[zero], arr[neighbor]] = [arr[neighbor], arr[zero]];
            const next = arr.join('');
            if (next === target) return steps + 1;
            if (!visited.has(next)) { visited.add(next); queue.push([next, steps+1]); }
        }
    }
    return -1;
}

// General pattern for small state-space BFS:
// 1. Encode state as string/number
// 2. BFS with visited set
// 3. Generate all valid next states`,
    },
    {
      type: 'heading',
      level: 2,
      text: '15-Puzzle Solvability (Inversion Count)',
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'amber',
      content: `**A 15-puzzle is solvable if and only if:**\n- Width is ODD: inversions count is even\n- Width is EVEN: inversions count + row of blank from bottom is odd\n\n**Inversion:** pair (i,j) where i < j but tile[i] > tile[j] (ignoring 0).\n\nThis is a parity argument — every legal move preserves parity mod 2.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: '15-Puzzle solvability check',
      code: `function isSolvable(board) {
    const n = board.length;
    const flat = board.flat();
    let inversions = 0;
    let blankRow = 0;

    // Count inversions
    for (let i = 0; i < flat.length; i++) {
        if (flat[i] === 0) { blankRow = Math.floor(i / n); continue; }
        for (let j = i + 1; j < flat.length; j++) {
            if (flat[j] !== 0 && flat[i] > flat[j]) inversions++;
        }
    }

    if (n % 2 === 1) {
        return inversions % 2 === 0; // odd width: inversions must be even
    } else {
        // even width: inversions + blank row from bottom must be odd
        const blankFromBottom = n - 1 - blankRow;
        return (inversions + blankFromBottom) % 2 === 1;
    }
}`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Reservoir Sampling',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Reservoir sampling — pick k random items from stream',
      code: `// Pick 1 random item from stream of unknown length
// Each item has equal 1/n probability
class ReservoirSampler {
    constructor() { this.reservoir = null; this.count = 0; }
    add(item) {
        this.count++;
        // Accept with probability 1/count
        if (Math.random() * this.count < 1) this.reservoir = item;
    }
}

// Pick k items: maintain reservoir of size k
// For each new item i (0-indexed): replace random position in reservoir
// with probability k/(i+1)
function reservoirSample(stream, k) {
    const res = stream.slice(0, k);
    for (let i = k; i < stream.length; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        if (j < k) res[j] = stream[i];
    }
    return res;
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
      title: 'Majority Element',
      url: 'https://leetcode.com/problems/majority-element/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Boyer-Moore voting — O(n) O(1)',
          explanation: 'Keep a candidate and a count. When count hits 0, switch candidate. The majority element always survives.',
          code: `var majorityElement = function(nums) {
    let cand = nums[0], cnt = 1;
    for (let i=1;i<nums.length;i++) {
        if (!cnt) { cand=nums[i]; cnt=1; }
        else nums[i]===cand ? cnt++ : cnt--;
    }
    return cand;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Sliding Puzzle',
      url: 'https://leetcode.com/problems/sliding-puzzle/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: BFS on encoded board state',
          explanation: 'Encode 2×3 board as 6-char string. BFS: swap 0 with valid neighbors. Each step = 1 move. Return steps to reach "123450".',
          code: `var slidingPuzzle = function(board) {
    const target='123450', start=board.flat().join('');
    if(start===target) return 0;
    const nb=[[1,3],[0,2,4],[1,5],[0,4],[1,3,5],[2,4]];
    const vis=new Set([start]);
    const q=[[start,0]];
    while(q.length){
        const [s,d]=q.shift();
        const z=s.indexOf('0');
        for(const n of nb[z]){
            const a=s.split('');
            [a[z],a[n]]=[a[n],a[z]];
            const nx=a.join('');
            if(nx===target) return d+1;
            if(!vis.has(nx)){vis.add(nx);q.push([nx,d+1]);}
        }
    }
    return -1;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Random Pick with Weight',
      url: 'https://leetcode.com/problems/random-pick-with-weight/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Prefix sums + binary search',
          explanation: 'Build prefix sum array. Generate random float in [0, total). Binary search for first prefix sum > random value. That index is the pick.',
          code: `var Solution = function(w) {
    this.prefix = [];
    let sum = 0;
    for (const wi of w) this.prefix.push(sum += wi);
};
Solution.prototype.pickIndex = function() {
    const target = Math.random() * this.prefix.at(-1);
    let lo=0, hi=this.prefix.length-1;
    while(lo<hi){
        const mid=(lo+hi)>>1;
        if(this.prefix[mid]<=target) lo=mid+1; else hi=mid;
    }
    return lo;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'More Worked Problems',
    },
    {
      type: 'problem',
      num: 4,
      title: 'Design Twitter',
      url: 'https://leetcode.com/problems/design-twitter/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: HashMap for follows/tweets + min-heap for feed',
          explanation: `Store: tweets per user (with timestamp), follows per user. For getNewsFeed: collect most recent 10 tweets from all followed users. Use a min-heap to merge k sorted tweet lists (each user's tweet list is sorted newest-first). O(F log F) where F = number of followees.`,
          code: `var Twitter = function() {
    this.time = 0;
    this.tweets = new Map();   // userId → [[time, tweetId], ...]
    this.follows = new Map();  // userId → Set of followeeIds
};
Twitter.prototype.postTweet = function(userId, tweetId) {
    if (!this.tweets.has(userId)) this.tweets.set(userId, []);
    this.tweets.get(userId).push([this.time++, tweetId]);
};
Twitter.prototype.getNewsFeed = function(userId) {
    const users = [...(this.follows.get(userId) ?? new Set()), userId];
    const candidates = [];
    for (const u of users)
        if (this.tweets.has(u)) {
            const tw = this.tweets.get(u);
            candidates.push(...tw.slice(-10));
        }
    return candidates.sort((a,b) => b[0]-a[0]).slice(0,10).map(x=>x[1]);
};
Twitter.prototype.follow = function(f, e) {
    if (!this.follows.has(f)) this.follows.set(f, new Set());
    this.follows.get(f).add(e);
};
Twitter.prototype.unfollow = function(f, e) {
    this.follows.get(f)?.delete(e);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Insert Delete GetRandom O(1)',
      url: 'https://leetcode.com/problems/insert-delete-getrandom-o1/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: HashMap + array — swap-with-last for O(1) delete',
          explanation: `Array supports O(1) random access. HashMap (val→index) supports O(1) lookup. The trick for O(1) delete: swap the element to delete with the last element, then pop the tail. Update the swapped element's index in the map.`,
          code: `var RandomizedSet = function() {
    this.map = new Map();  // val → index in arr
    this.arr = [];
};
RandomizedSet.prototype.insert = function(val) {
    if (this.map.has(val)) return false;
    this.map.set(val, this.arr.length);
    this.arr.push(val);
    return true;
};
RandomizedSet.prototype.remove = function(val) {
    if (!this.map.has(val)) return false;
    const idx = this.map.get(val);
    const last = this.arr[this.arr.length - 1];
    this.arr[idx] = last;           // swap with last
    this.map.set(last, idx);        // update last's index
    this.arr.pop();
    this.map.delete(val);
    return true;
};
RandomizedSet.prototype.getRandom = function() {
    return this.arr[Math.floor(Math.random() * this.arr.length)];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 6,
      title: 'Find Duplicate File in System',
      url: 'https://leetcode.com/problems/find-duplicate-file-in-system/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Parse path+filename, group by content',
          explanation: `Parse each entry: split by space (first = directory, rest = file(content) pairs). Extract content between parens. Group (directory/filename) by content using a hashmap. Return groups with more than 1 file.`,
          code: `var findDuplicate = function(paths) {
    const map = new Map();
    for (const path of paths) {
        const parts = path.split(' ');
        const dir = parts[0];
        for (let i = 1; i < parts.length; i++) {
            const p = parts[i].indexOf('(');
            const fname = parts[i].slice(0, p);
            const content = parts[i].slice(p+1, -1);
            if (!map.has(content)) map.set(content, []);
            map.get(content).push(dir + '/' + fname);
        }
    }
    return [...map.values()].filter(v => v.length > 1);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧠',
      color: 'green',
      content: `**Pattern recognition:**\n- "Find majority without extra space" → Boyer-Moore (single pass!)\n- "Random pick proportional to weights" → prefix sums + binary search\n- "Is this puzzle solvable?" → count inversions + parity check\n- "Minimum moves on small board" → BFS with string-encoded state\n- "Pick k random from unknown-length stream" → reservoir sampling\n- "O(1) insert + delete + random" → array + hashmap (swap-with-last trick)\n- "News feed / top k from multiple sorted sources" → min-heap merge`,
    },
  ],
}
