import type { Article } from '../articles'

export const slidingWindowArticle: Article = {
  slug: 'sliding-window',
  title: 'Sliding Window',
  emoji: '🪟',
  tagline: 'Turn O(n²) subarray loops into O(n) with a moving window.',
  description: 'Master fixed-size windows, dynamic windows, and the exact-count formula. The pattern that shows up in 80% of subarray/substring problems.',
  gradient: 'from-yellow-400 to-amber-500',
  topicSlug: 'sliding_window',
  readTime: '18 min',
  sections: [
    {
      type: 'text',
      content: `Every subarray problem at its core asks: "find a contiguous part of the array that satisfies some condition." The brute force is always two nested loops — O(n²). Sliding window is the observation that you don't need to recompute from scratch for each starting point. You can maintain a running state and slide a window across the array, adding from the right and removing from the left.`,
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'teal',
      content: `Two window types exist:\n**Fixed window** — the size k is given upfront, window is always exactly k wide.\n**Dynamic window** — the window grows and shrinks based on a condition (longest valid / shortest valid).`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'When to Reach for Sliding Window',
    },
    {
      type: 'table',
      headers: ['See This in the Problem', 'Think This'],
      rows: [
        ['subarray / substring', 'Sliding window candidate'],
        ['"longest ... with condition"', 'Dynamic window, expand until broken, shrink from left'],
        ['"shortest ... with condition"', 'Dynamic window, shrink greedily once valid'],
        ['"fixed length k"', 'Fixed window, slide one step at a time'],
        ['"count of subarrays with exactly k"', 'atMost(k) − atMost(k−1) formula'],
        ['input is ALL positive', 'Two pointer / dynamic window is safe'],
        ['input has zeros', 'Use exact-count formula instead of direct window'],
        ['input has negatives', 'Avoid sliding window, use prefix sum + hashmap'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'The Core Templates',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Fixed window (size k)',
      code: `// Build first window, then slide
let sum = 0;
for (let i = 0; i < k; i++) sum += nums[i];
let maxSum = sum;

for (let i = k; i < n; i++) {
    sum += nums[i];       // add incoming right element
    sum -= nums[i - k];   // remove outgoing left element
    maxSum = Math.max(maxSum, sum);
}`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Dynamic window — longest valid subarray',
      code: `let i = 0, j = 0, ans = 0;
while (j < n) {
    // 1. Expand: add nums[j] to window state
    state.add(nums[j]);

    // 2. Shrink: while window is invalid, remove from left
    while (!isValid(state)) {
        state.remove(nums[i]);
        i++;
    }

    // 3. Update answer with current valid window size
    ans = Math.max(ans, j - i + 1);
    j++;
}`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Count subarrays with EXACTLY k (the ans += n−j trick)',
      code: `// When input has zeros, exact count can't be done by direct shrink.
// Use: count(exactly k) = count(at most k) − count(at most k−1)

const atMost = (goal) => {
    if (goal < 0) return 0;
    let i = j = ans = sum = 0;
    while (j < n) {
        sum += nums[j];
        while (sum > goal) { sum -= nums[i]; i++; }
        ans += j - i + 1;  // all subarrays ending at j with sum ≤ goal
        j++;
    }
    return ans;
};

return atMost(k) - atMost(k - 1);`,
    },
    {
      type: 'callout',
      icon: '🔑',
      color: 'amber',
      content: `**ans += n − j** vs **ans += j − i + 1**\n\nWhen the window [i..j] first becomes valid, ALL extensions to the right are also valid. Use \`ans += n − j\` to count "this window + every longer window ending at or after j".\n\nDON'T use \`ans += j − i + 1\` in that scenario — that counts left-shrinking prefixes, a completely different set.`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Longest Substring Without Repeating Characters',
      url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: O(n³) brute force',
          explanation: `Check every possible substring. For each (i, j) pair, scan that window for duplicates using a nested loop or set. Works but TLEs on large input.`,
          code: `for (let i = 0; i < n; i++)
    for (let j = i; j < n; j++)
        if (allUnique(s, i, j)) max = Math.max(max, j - i + 1);`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: O(n) dynamic window with hashmap',
          explanation: `Key insight: when we hit a duplicate at position j, we don't need to restart from i+1. We can jump the left pointer directly to (last seen position of s[j]) + 1, skipping everything before the previous occurrence of that character.\n\nStore each character's NEXT valid start position in the map (map[char] = j + 1, one past its index). When we see a duplicate, set i = Math.max(i, map[s[j]]) — the max ensures we never move i backwards if i has already passed the old position.`,
          code: `var lengthOfLongestSubstring = function(s) {
    const map = {};
    let i = 0, max = 0;
    for (let j = 0; j < s.length; j++) {
        if (map[s[j]] > 0) {
            // jump left pointer past previous occurrence
            i = Math.max(i, map[s[j]]);
        }
        max = Math.max(j - i + 1, max);
        map[s[j]] = j + 1;  // store next valid start position
    }
    return max;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Maximum Number of Vowels in a Substring of Given Length',
      url: 'https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: O(n·k) brute force',
          explanation: `For each starting position, count vowels in the next k characters. Recalculates the entire window from scratch each time.`,
          code: `for (let i = 0; i < s.length - k; i++) {
    let count = 0;
    for (let j = i; j < i + k; j++)
        if (vowels.has(s[j])) count++;
    ans = Math.max(ans, count);
}`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: O(n) fixed window',
          explanation: `Build the first k-window, then slide. When the window moves right by 1: add s[i] to count if it's a vowel, remove s[i-k] from count if it was a vowel. Classic "add right, remove left" slide.`,
          code: `var maxVowels = function(s, k) {
    const v = new Set(['a','e','i','o','u']);
    let c = 0, ans = 0;
    for (let i = 0; i < s.length; i++) {
        if (v.has(s[i])) c++;           // incoming right element
        if (i >= k && v.has(s[i - k])) c--;  // outgoing left element
        ans = Math.max(ans, c);
    }
    return ans;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Binary Subarrays With Sum',
      url: 'https://leetcode.com/problems/binary-subarrays-with-sum/',
      difficulty: 'Medium',
      note: 'Input has 0s — can\'t direct-shrink to exact count. Use the formula.',
      intuitions: [
        {
          label: 'Intuition 1: Why direct sliding window fails here',
          explanation: `If input had only positive values, when sum > goal we'd shrink left and the window would be deterministic. But zeros mean both [0,1] and [0,0,1] have the same sum — there's no single "minimum" window for a given sum. Shrinking to exact k is ambiguous.`,
        },
        {
          label: 'Intuition 2: O(n) exact-count formula',
          explanation: `count(exactly goal) = count(at most goal) − count(at most goal−1)\n\nWrite an atMost(goal) function using a normal shrink window. The difference of the two calls gives exactly the count we need.`,
          code: `var numSubarraysWithSum = function(nums, goal) {
    const atMost = (g) => {
        if (g < 0) return 0;
        let i = j = ans = sum = 0;
        while (j < nums.length) {
            sum += nums[j];
            while (sum > g) { sum -= nums[i]; i++; }
            ans += j - i + 1;
            j++;
        }
        return ans;
    };
    return atMost(goal) - atMost(goal - 1);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Count Number of Nice Subarrays',
      url: 'https://leetcode.com/problems/count-number-of-nice-subarrays/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Same pattern as Binary Subarrays With Sum',
          explanation: `"Nice subarray" = subarray with exactly k odd numbers. This is the same atMost formula — we just transform the input first: map each element to 1 if odd, 0 if even. After that, it's identical to the previous problem.`,
          code: `var numberOfSubarrays = function(nums, k) {
    const atMost = (goal) => {
        let i = j = ans = sum = 0;
        while (j < nums.length) {
            sum += nums[j] % 2;        // 1 if odd, 0 if even — transform inline
            while (sum > goal) { sum -= nums[i] % 2; i++; }
            ans += j - i + 1;
            j++;
        }
        return ans;
    };
    return atMost(k) - atMost(k - 1);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Rotting Oranges',
      url: 'https://leetcode.com/problems/rotting-oranges/',
      difficulty: 'Medium',
      note: 'Multi-source BFS — not sliding window, but same "enqueue all sources first" insight.',
      intuitions: [
        {
          label: 'Intuition 1: Level-by-level BFS from all rotten oranges simultaneously',
          explanation: `Standard BFS finds shortest distance from ONE source. Here we need shortest time from ALL initial rotten oranges simultaneously. Solution: enqueue ALL starting rotten oranges at time=0 before beginning BFS. Each level of BFS = one minute. Track fresh orange count; decrement each time we rot one. If fresh > 0 after BFS completes, return -1.`,
          code: `var orangesRotting = function(grid) {
    const n = grid.length, m = grid[0].length;
    const q = new Queue();
    let fresh = 0;

    // enqueue ALL rotten oranges as level-0 sources
    grid.forEach((row, r) => row.forEach((o, c) => {
        if (o === 2) q.enqueue([r, c, 0]);
        if (o === 1) fresh++;
    }));

    const dr = [-1, 0, 1, 0], dc = [0, 1, 0, -1];
    let maxTime = 0;

    while (!q.isEmpty()) {
        const [r, c, t] = q.dequeue();
        maxTime = Math.max(maxTime, t);
        for (let i = 0; i < 4; i++) {
            const nr = r + dr[i], nc = c + dc[i];
            if (nr >= 0 && nr < n && nc >= 0 && nc < m && grid[nr][nc] === 1) {
                grid[nr][nc] = 2;  // mark rotten (avoids visited array)
                fresh--;
                q.enqueue([nr, nc, t + 1]);
            }
        }
    }
    return fresh > 0 ? -1 : maxTime;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'variation',
      title: 'The One-Line Variation Trick',
      baseCode: `// Base: count subarrays with sum exactly k
const atMost = (goal) => {
    let i = j = ans = sum = 0;
    while (j < n) {
        sum += nums[j];               // ← THIS LINE controls what we're tracking
        while (sum > goal) { sum -= nums[i]; i++; }
        ans += j - i + 1;
        j++;
    }
    return ans;
};
return atMost(k) - atMost(k - 1);`,
      variants: [
        {
          problem: 'Count subarrays with exactly k ODD numbers',
          url: 'https://leetcode.com/problems/count-number-of-nice-subarrays/',
          change: 'sum += nums[j] % 2  // map: odd→1, even→0',
          why: 'Transform values to 0/1 parity, same formula applies',
        },
        {
          problem: 'Longest substring with at most k distinct characters',
          url: 'https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/',
          change: 'freq[s[j]]++; if new → distinct++  // track distinct count',
          why: 'Change sum to distinct-character count, return max window not count',
        },
        {
          problem: 'Count subarrays where max appears at least k times',
          url: 'https://leetcode.com/problems/count-subarrays-where-max-element-appears-at-least-k-times/',
          change: 'freq += nums[j] === max ? 1 : 0  // count max occurrences',
          why: 'Once freq >= k, all right-extending windows are valid: ans += n - j',
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
      num: 7,
      title: 'Minimum Window Substring',
      url: 'https://leetcode.com/problems/minimum-window-substring/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Sliding window with character frequency tracking',
          explanation: 'Expand right to include all required chars, then shrink left while window still valid. Track "formed" count = how many distinct chars are at required frequency. Update answer when formed === required.',
          code: `var minWindow = function(s, t) {
    const need={}, have={};
    for(const c of t) need[c]=(need[c]||0)+1;
    let formed=0, required=Object.keys(need).length;
    let lo=0, ans=[Infinity,0,0];
    for(let hi=0;hi<s.length;hi++){
        const c=s[hi]; have[c]=(have[c]||0)+1;
        if(need[c] && have[c]===need[c]) formed++;
        while(formed===required){
            if(hi-lo+1<ans[0]) ans=[hi-lo+1,lo,hi];
            have[s[lo]]--;
            if(need[s[lo]] && have[s[lo]]<need[s[lo]]) formed--;
            lo++;
        }
    }
    return ans[0]===Infinity?'':s.slice(ans[1],ans[2]+1);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 8,
      title: 'Sliding Window Maximum',
      url: 'https://leetcode.com/problems/sliding-window-maximum/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Monotonic deque — O(n)',
          explanation: 'Maintain a deque of indices in decreasing order of value. Front = current window maximum. Before adding new element, pop from back all elements smaller than it (they can never be future maximums).',
          code: `var maxSlidingWindow = function(nums, k) {
    const dq=[], res=[];
    for(let i=0;i<nums.length;i++){
        // remove elements outside window
        while(dq.length && dq[0]<i-k+1) dq.shift();
        // maintain decreasing order: remove smaller elements from back
        while(dq.length && nums[dq.at(-1)]<nums[i]) dq.pop();
        dq.push(i);
        if(i>=k-1) res.push(nums[dq[0]]);
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '📌',
      color: 'gray',
      content: `**Sliding window checklist:**\n1. Can I define a window [lo, hi] with a valid/invalid state?\n2. Is the state monotone — if [lo, hi] is invalid, is [lo, hi+1] also invalid? → shrink window\n3. For COUNT problems: use atMost(k) - atMost(k-1) trick\n4. Need max in window? → monotonic deque\n5. Need sum/count in window? → simple two-pointer with running total`,
    },
  ],
}
