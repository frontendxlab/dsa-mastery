import type { Article } from '../articles'

export const greedyArticle: Article = {
  slug: 'greedy',
  title: 'Greedy Algorithms',
  emoji: '🤑',
  tagline: 'Make the locally optimal choice. Hope it\'s globally optimal.',
  description: 'Greedy works when the locally optimal choice never needs to be revised. Learn how to prove greedy correctness with exchange arguments, and master the interval scheduling, activity selection, and jump game patterns.',
  gradient: 'from-amber-400 to-orange-500',
  topicSlug: 'greedy',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `Greedy algorithms make the locally optimal decision at each step without reconsidering past choices. The hard part isn't implementation — it's proving the greedy choice is safe. The most common proof technique is the "exchange argument": assume the optimal solution doesn't make our greedy choice, then show that swapping to our choice doesn't make things worse. If you can prove that, greedy is correct.`,
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'amber',
      content: `**Greedy works when**: there's a greedy-choice property (local optimal → global optimal) AND optimal substructure. Greedy fails when the best local choice at step k prevents a better global solution — that's when you need DP instead.`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Pattern Recognition',
    },
    {
      type: 'table',
      headers: ['Problem Signal', 'Greedy Strategy'],
      rows: [
        ['Interval scheduling (max non-overlapping)', 'Sort by END time, greedily pick earliest-ending'],
        ['Interval merging', 'Sort by start time, merge overlapping'],
        ['Jump game', 'Track max reachable index, check if target reachable'],
        ['Meeting rooms (min rooms needed)', 'Two separate sorted arrays: sort starts + ends'],
        ['Task with deadlines', 'Sort by deadline, use max-heap for scheduling'],
        ['"Minimum operations to achieve X"', 'Often greedy — pick largest/smallest available each time'],
      ],
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
          label: 'Intuition 1: Track maximum reachable index',
          explanation: `We don't need to simulate every path. Track the furthest index we can reach at any point. For each index i, if i > maxReach, we're stuck — return false. Otherwise update maxReach = max(maxReach, i + nums[i]). If we reach the last index, return true.`,
          code: `var canJump = function(nums) {
    let maxReach = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i > maxReach) return false;   // can't reach this index
        maxReach = Math.max(maxReach, i + nums[i]);
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
      title: 'Jump Game II (minimum jumps)',
      url: 'https://leetcode.com/problems/jump-game-ii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Level-by-level BFS thinking',
          explanation: `Think of it as BFS levels: from current "level" of reachable positions, find the furthest we can reach in one more jump — that's the next level. When we step out of the current level boundary, we must have jumped, so increment count.`,
          code: `var jump = function(nums) {
    let jumps = 0, curEnd = 0, farthest = 0;
    for (let i = 0; i < nums.length - 1; i++) {
        farthest = Math.max(farthest, i + nums[i]);
        if (i === curEnd) {      // we've exhausted current level
            jumps++;
            curEnd = farthest;   // next level = farthest reachable
        }
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
      title: 'Merge Intervals',
      url: 'https://leetcode.com/problems/merge-intervals/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Sort by start, merge overlapping neighbors',
          explanation: `Sort intervals by start time. Then scan: if current interval overlaps with last merged (current.start ≤ last.end), merge by extending end. Otherwise add current as new interval. Two intervals overlap when start of later ≤ end of earlier.`,
          code: `var merge = function(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    const result = [intervals[0]];
    for (let i = 1; i < intervals.length; i++) {
        const last = result[result.length - 1];
        if (intervals[i][0] <= last[1]) {
            last[1] = Math.max(last[1], intervals[i][1]);  // merge
        } else {
            result.push(intervals[i]);
        }
    }
    return result;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Non-overlapping Intervals (min removals)',
      url: 'https://leetcode.com/problems/non-overlapping-intervals/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Maximize kept intervals = minimize removed',
          explanation: `Sort by END time. Greedily keep intervals with earliest end time (they leave most room for future intervals). When two intervals overlap, remove the one with the later end (greedy: keep earlier-ending). Count how many we remove.`,
          code: `var eraseOverlapIntervals = function(intervals) {
    intervals.sort((a, b) => a[1] - b[1]);  // sort by end time
    let removed = 0, prevEnd = -Infinity;
    for (const [start, end] of intervals) {
        if (start < prevEnd) {
            removed++;  // overlaps with previous kept — remove current (later end)
        } else {
            prevEnd = end;  // keep this interval
        }
    }
    return removed;
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
      title: 'Gas Station',
      url: 'https://leetcode.com/problems/gas-station/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: O(n²) brute force — try each starting station',
          explanation: 'For each station as start, simulate the full circuit. Track cumulative gas. If tank goes negative, this start fails. O(n²).',
        },
        {
          label: 'Intuition 2: O(n) greedy — one pass with two observations',
          explanation: 'Observation 1: if total gas >= total cost, a solution ALWAYS exists. Observation 2: if tank goes negative at station i, any start from the current start to i cannot work (they would hit the same deficit). So reset start to i+1 and continue.',
          code: `var canCompleteCircuit = function(gas, cost) {
    let totalTank = 0, currTank = 0, start = 0;
    for (let i = 0; i < gas.length; i++) {
        const diff = gas[i] - cost[i];
        totalTank += diff;
        currTank  += diff;
        if (currTank < 0) {
            start = i + 1;  // can't start before i+1 — all would fail here
            currTank = 0;
        }
    }
    return totalTank >= 0 ? start : -1;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Jump Game',
      url: 'https://leetcode.com/problems/jump-game/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: O(n) greedy — track farthest reachable index',
          explanation: 'Track the maximum index reachable so far. At each position i, if i > maxReach, we can never reach here — return false. Otherwise extend maxReach.',
          code: `var canJump = function(nums) {
    let maxReach = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i > maxReach) return false;      // can't reach this position
        maxReach = Math.max(maxReach, i + nums[i]);
    }
    return true;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 6,
      title: 'Candy',
      url: 'https://leetcode.com/problems/candy/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Two-pass greedy — left→right then right→left',
          explanation: 'Pass 1 (left→right): give each child 1 candy. If ratings[i] > ratings[i-1], child i gets one more than child i-1. Pass 2 (right→left): if ratings[i] > ratings[i+1], child i must have more than child i+1 — take the max of current and right+1. Sum everything.',
          code: `var candy = function(ratings) {
    const n = ratings.length;
    const candies = new Array(n).fill(1);
    // Pass 1: left to right
    for (let i = 1; i < n; i++)
        if (ratings[i] > ratings[i-1]) candies[i] = candies[i-1] + 1;
    // Pass 2: right to left
    for (let i = n-2; i >= 0; i--)
        if (ratings[i] > ratings[i+1]) candies[i] = Math.max(candies[i], candies[i+1]+1);
    return candies.reduce((a,b) => a+b, 0);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧠',
      color: 'green',
      content: `**Proving greedy correctness — exchange argument:**\nAssume optimal solution picks X. Show you can swap X for the greedy choice without making things worse. If every swap preserves or improves the solution, greedy is optimal.\n\n**Greedy fails when:** future consequences of a local choice can't be captured locally. Use DP instead.`,
    },
  ],
}
