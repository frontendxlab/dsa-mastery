import type { Article } from '../articles'

export const schedulingArticle: Article = {
  slug: 'scheduling',
  title: 'Scheduling & Interval Problems',
  emoji: '📅',
  tagline: 'Sort by deadline. Greedy + heap beats brute force every time.',
  description: 'Scheduling problems: job selection, weighted job scheduling, interval covering, course prerequisites. Master greedy deadline scheduling, DP with binary search, and topological sort for dependency chains.',
  gradient: 'from-orange-400 to-amber-500',
  topicSlug: 'scheduling',
  readTime: '15 min',
  sections: [
    {
      type: 'text',
      content: `Scheduling problems ask: given tasks with constraints (deadlines, durations, weights), which tasks to pick and in what order? The greedy insight almost always involves sorting — by deadline, end time, or weight ratio. When greedy alone isn't enough, add a heap for dynamic selection or DP + binary search for weighted variants.`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Pattern 1: Activity Selection (Max Tasks, No Overlap)',
    },
    {
      type: 'callout',
      icon: '🔑',
      color: 'teal',
      content: `**Greedy rule:** Sort by END time. Always pick the task that finishes earliest. Each pick eliminates as few future options as possible.\n\nProof: If any optimal solution doesn't pick the earliest-ending task, we can swap it in without making things worse.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Activity selection — max non-overlapping intervals',
      code: `function maxActivities(intervals) {
    // Sort by end time
    intervals.sort((a, b) => a[1] - b[1]);
    let count = 0, lastEnd = -Infinity;
    for (const [start, end] of intervals) {
        if (start >= lastEnd) {
            count++;
            lastEnd = end;
        }
    }
    return count;
}

// Variant: minimum rooms needed (= max overlapping at any point)
function minRooms(intervals) {
    const starts = intervals.map(i => i[0]).sort((a,b)=>a-b);
    const ends   = intervals.map(i => i[1]).sort((a,b)=>a-b);
    let rooms = 0, maxRooms = 0, j = 0;
    for (let i = 0; i < intervals.length; i++) {
        while (ends[j] <= starts[i]) { rooms--; j++; }
        rooms++;
        maxRooms = Math.max(maxRooms, rooms);
    }
    return maxRooms;
}`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Pattern 2: Deadline Scheduling (Max Profit Before Deadlines)',
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'amber',
      content: `**Greedy rule:** Sort jobs by PROFIT descending. For each job, try to schedule it as late as possible before its deadline (use a Union-Find to find the latest free slot). This maximizes high-value jobs while respecting deadlines.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Weighted deadline scheduling with Union-Find',
      code: `function maxProfit(jobs) {
    // jobs: [[deadline, profit], ...]
    jobs.sort((a, b) => b[1] - a[1]); // sort by profit desc
    const maxD = Math.max(...jobs.map(j => j[0]));
    const parent = Array.from({length: maxD + 2}, (_, i) => i);
    const find = (x) => parent[x] === x ? x : (parent[x] = find(parent[x]));

    let totalProfit = 0;
    for (const [deadline, profit] of jobs) {
        const slot = find(deadline); // latest free slot <= deadline
        if (slot > 0) {
            totalProfit += profit;
            parent[slot] = slot - 1; // mark slot as used, point to prev
        }
    }
    return totalProfit;
}`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Pattern 3: Weighted Job Scheduling (DP + Binary Search)',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Weighted job scheduling — O(n log n)',
      code: `function weightedJobScheduling(jobs) {
    // jobs: [[start, end, weight], ...]
    jobs.sort((a, b) => a[1] - b[1]); // sort by end time
    const n = jobs.length;
    const dp = new Array(n + 1).fill(0);

    for (let i = 0; i < n; i++) {
        const [start, , weight] = jobs[i];
        // binary search: latest job that ends <= start of jobs[i]
        let lo = 0, hi = i;
        while (lo < hi) {
            const mid = (lo + hi + 1) >> 1;
            if (jobs[mid - 1][1] <= start) lo = mid;
            else hi = mid - 1;
        }
        // either take job i (dp[lo] + weight) or skip it (dp[i])
        dp[i + 1] = Math.max(dp[i], dp[lo] + weight);
    }
    return dp[n];
}`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Pattern 4: Course Prerequisites (Topological Sort)',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Topological sort (Kahn\'s BFS) for dependency scheduling',
      code: `function canFinish(numCourses, prerequisites) {
    const graph = Array.from({length: numCourses}, () => []);
    const indegree = new Array(numCourses).fill(0);
    for (const [a, b] of prerequisites) {
        graph[b].push(a);
        indegree[a]++;
    }
    const queue = [];
    for (let i = 0; i < numCourses; i++)
        if (indegree[i] === 0) queue.push(i);

    let completed = 0;
    while (queue.length) {
        const node = queue.shift();
        completed++;
        for (const next of graph[node])
            if (--indegree[next] === 0) queue.push(next);
    }
    return completed === numCourses; // false = cycle exists
}

// Get order: same pattern, return the queue-appended order
function findOrder(numCourses, prerequisites) {
    // same setup as above, return order array
    // ... build graph + indegrees
    // return [...result] from queue processing
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
      title: 'Non-overlapping Intervals',
      url: 'https://leetcode.com/problems/non-overlapping-intervals/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Greedy — sort by end, count removals',
          explanation: 'Sort by end time. Greedily keep intervals that don\'t overlap. Removals = total - kept. Same as activity selection but return count of removed intervals.',
          code: `var eraseOverlapIntervals = function(intervals) {
    intervals.sort((a,b) => a[1]-b[1]);
    let keep = 0, lastEnd = -Infinity;
    for (const [s, e] of intervals)
        if (s >= lastEnd) { keep++; lastEnd = e; }
    return intervals.length - keep;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Course Schedule II',
      url: 'https://leetcode.com/problems/course-schedule-ii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Topological sort — Kahn\'s BFS',
          explanation: 'Build directed graph of prerequisites. Process in BFS order starting from nodes with indegree 0. If all nodes processed, return order; else cycle exists.',
          code: `var findOrder = function(n, prereqs) {
    const g = Array.from({length:n},()=>[]);
    const ind = new Array(n).fill(0);
    for (const [a,b] of prereqs) { g[b].push(a); ind[a]++; }
    const q = [], order = [];
    for (let i=0;i<n;i++) if (!ind[i]) q.push(i);
    while (q.length) {
        const u = q.shift(); order.push(u);
        for (const v of g[u]) if (--ind[v]===0) q.push(v);
    }
    return order.length===n ? order : [];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Minimum Number of Arrows to Burst Balloons',
      url: 'https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Greedy — sort by end, shoot at latest overlap',
          explanation: 'Sort by end. One arrow at position end[0] bursts all balloons overlapping with it. Move to the next non-overlapping balloon.',
          code: `var findMinArrowShots = function(points) {
    points.sort((a,b)=>a[1]-b[1]);
    let arrows=1, end=points[0][1];
    for (const [s,e] of points)
        if (s > end) { arrows++; end = e; }
    return arrows;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Task Scheduler',
      url: 'https://leetcode.com/problems/task-scheduler/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Math formula with max frequency task',
          explanation: 'The bottleneck is the most frequent task. Place it in slots of size n+1. Formula: max(tasks.length, (maxFreq-1)*(n+1) + countOfMaxFreq).',
          code: `var leastInterval = function(tasks, n) {
    const freq = new Array(26).fill(0);
    for (const t of tasks) freq[t.charCodeAt(0)-65]++;
    freq.sort((a,b)=>b-a);
    const maxFreq = freq[0];
    const maxCount = freq.filter(f=>f===maxFreq).length;
    return Math.max(tasks.length, (maxFreq-1)*(n+1)+maxCount);
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Greedy heap simulation',
          explanation: 'At each time step, pick the most frequent remaining task that\'s not in cooldown. Use a max-heap and a cooldown queue.',
          code: `var leastInterval = function(tasks, n) {
    const freq = {};
    for (const t of tasks) freq[t] = (freq[t]||0)+1;
    // max-heap by frequency, queue for cooldown
    // (simplified with sorted array for small alphabet)
    let time = 0;
    const counts = Object.values(freq).sort((a,b)=>b-a);
    while (counts.some(c=>c>0)) {
        let i = 0;
        for (let slot = 0; slot <= n; slot++) {
            time++;
            if (i < counts.length && counts[i] > 0) { counts[i]--; i++; }
            else if (!counts.some(c=>c>0)) break;
        }
        counts.sort((a,b)=>b-a);
    }
    return time;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Video Stitching',
      url: 'https://leetcode.com/problems/video-stitching/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Greedy interval cover',
          explanation: 'Sort clips by start. At each step, from all clips starting at or before current coverage, pick the one that extends coverage farthest. Increment clip count each extension.',
          code: `var videoStitching = function(clips, time) {
    clips.sort((a,b)=>a[0]-b[0]);
    let clips_used=0, covered=0, i=0;
    while (covered < time) {
        let maxReach = covered;
        while (i < clips.length && clips[i][0] <= covered)
            maxReach = Math.max(maxReach, clips[i++][1]);
        if (maxReach === covered) return -1; // can't extend
        covered = maxReach;
        clips_used++;
    }
    return clips_used;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧠',
      color: 'green',
      content: `**Scheduling decision tree:**\n1. "Max tasks, no overlap" → sort by END time, greedy\n2. "Min removals for non-overlapping" → same as above, count skips\n3. "Max profit before deadlines" → sort by PROFIT desc + Union-Find\n4. "Max weighted jobs, no overlap" → DP + binary search on end times\n5. "Task ordering with dependencies" → topological sort (Kahn's BFS)\n6. "Tasks with cooldowns" → heap simulation or math formula`,
    },
  ],
}
