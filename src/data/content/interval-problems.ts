import type { Article } from '../articles'

export const intervalProblemsArticle: Article = {
  slug: 'interval-problems',
  title: 'Interval Problems — The Complete Guide',
  emoji: '📏',
  tagline: 'Sort by start. Merge overlaps. Sweep with a heap. All interval problems reduce to three patterns.',
  description: 'Interval problems cover merging, inserting, covering, scheduling, and sweep-line problems. Learn the three core patterns — sort+merge, sweep line, and DP+binary search — that solve 95% of interval problems.',
  gradient: 'from-teal-400 to-cyan-500',
  topicSlug: 'scheduling',
  readTime: '22 min',
  sections: [
    {
      type: 'text',
      content: `Interval problems appear in scheduling, calendar apps, genomics, and almost every system design interview. They share a core structure: overlapping vs non-overlapping ranges. Once you sort by start time, almost all interval problems reduce to three patterns: merge, sweep, or DP. The hardest part is recognizing which pattern applies.`,
    },
    {
      type: 'table',
      headers: ['Problem type', 'Pattern', 'Time'],
      rows: [
        ['Merge all overlapping intervals', 'Sort by start, merge greedily', 'O(n log n)'],
        ['Insert interval into sorted list', 'Find overlap range, merge', 'O(n)'],
        ['Minimum intervals to cover range', 'Greedy: sort by start, pick max reach', 'O(n log n)'],
        ['Maximum non-overlapping intervals', 'Sort by END, greedy pick', 'O(n log n)'],
        ['Minimum rooms / platforms needed', 'Sort starts+ends separately, sweep', 'O(n log n)'],
        ['Maximum sum of non-overlapping', 'Sort by end + DP + binary search', 'O(n log n)'],
        ['Count overlapping pairs', 'Coordinate compression + sweep', 'O(n log n)'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Pattern 1: Merge Overlapping Intervals',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Merge intervals — O(n log n)',
      code: `// Sort by start. Merge current into last if they overlap.
function merge(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    const merged = [intervals[0]];
    for (const [start, end] of intervals.slice(1)) {
        const last = merged.at(-1);
        if (start <= last[1]) last[1] = Math.max(last[1], end); // overlap: extend
        else merged.push([start, end]);                          // gap: new interval
    }
    return merged;
}

// Insert a new interval into a non-overlapping sorted list
function insert(intervals, newInterval) {
    const res = [];
    let i = 0, [ns, ne] = newInterval;
    // Add all intervals that end before new starts
    while (i < intervals.length && intervals[i][1] < ns) res.push(intervals[i++]);
    // Merge all overlapping
    while (i < intervals.length && intervals[i][0] <= ne) {
        ns = Math.min(ns, intervals[i][0]);
        ne = Math.max(ne, intervals[i][1]);
        i++;
    }
    res.push([ns, ne]);
    // Add remaining
    while (i < intervals.length) res.push(intervals[i++]);
    return res;
}`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Pattern 2: Sweep Line (Count Overlaps)',
    },
    {
      type: 'callout',
      icon: '🔑',
      color: 'teal',
      content: `**Sweep line trick:** Split each interval into two events: +1 at start, -1 at end. Sort events by time. Running sum = number of active intervals at any point.\n\nMax running sum = maximum overlap at any point.\nWhen running sum drops to 0 = gap between groups of intervals.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Sweep line — max simultaneous overlaps, min meeting rooms',
      code: `// Minimum meeting rooms = max simultaneous meetings
function minMeetingRooms(intervals) {
    const events = [];
    for (const [s, e] of intervals) {
        events.push([s, 1]);   // meeting starts: +1 room
        events.push([e, -1]);  // meeting ends:   -1 room
    }
    events.sort((a, b) => a[0] - b[0] || a[1] - b[1]); // tie: end before start

    let rooms = 0, maxRooms = 0;
    for (const [, delta] of events) {
        rooms += delta;
        maxRooms = Math.max(maxRooms, rooms);
    }
    return maxRooms;
}

// Alternative: two sorted arrays (cleaner for equal times)
function minMeetingRoomsAlt(intervals) {
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
      text: 'Pattern 3: Interval DP + Binary Search',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Weighted job scheduling — O(n log n)',
      code: `// Find max weight of non-overlapping intervals
function maxNonOverlapWeight(jobs) {
    jobs.sort((a, b) => a[1] - b[1]); // sort by end time
    const n = jobs.length;
    const dp = new Array(n + 1).fill(0);

    for (let i = 0; i < n; i++) {
        const [start, , weight] = jobs[i];
        // Binary search: last job ending <= start of jobs[i]
        let lo = 0, hi = i;
        while (lo < hi) {
            const mid = (lo + hi + 1) >> 1;
            if (jobs[mid - 1][1] <= start) lo = mid;
            else hi = mid - 1;
        }
        dp[i + 1] = Math.max(dp[i], dp[lo] + weight);
    }
    return dp[n];
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
      title: 'Merge Intervals',
      url: 'https://leetcode.com/problems/merge-intervals/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Sort by start, merge adjacent overlaps',
          explanation: 'Two intervals overlap if and only if next.start <= current.end. Extend current if overlap, otherwise push as new interval.',
          code: `var merge = function(intervals) {
    intervals.sort((a,b)=>a[0]-b[0]);
    const res=[intervals[0]];
    for(const [s,e] of intervals.slice(1)){
        const last=res.at(-1);
        if(s<=last[1]) last[1]=Math.max(last[1],e);
        else res.push([s,e]);
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
      title: 'Meeting Rooms II',
      url: 'https://leetcode.com/problems/meeting-rooms-ii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Min-heap of end times',
          explanation: 'Sort by start. For each meeting, if the earliest-ending ongoing meeting has ended, reuse that room (pop + push). Otherwise open new room (push).',
          code: `var minMeetingRooms = function(intervals) {
    intervals.sort((a,b)=>a[0]-b[0]);
    // Min-heap of end times (simulate with sorted array for small n)
    const heap=[];
    for(const [s,e] of intervals){
        heap.sort((a,b)=>a-b);
        if(heap.length && heap[0]<=s) heap.shift(); // reuse room
        heap.push(e); // add new/reused room with current end time
    }
    return heap.length;
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Sweep line events',
          explanation: 'Separate starts and ends arrays, sort both. Two pointers sweep: if next start < next end, need new room; else free one. Max rooms at any point = answer.',
          code: `var minMeetingRooms = function(intervals) {
    const s=intervals.map(i=>i[0]).sort((a,b)=>a-b);
    const e=intervals.map(i=>i[1]).sort((a,b)=>a-b);
    let rooms=0,max=0,j=0;
    for(let i=0;i<s.length;i++){
        while(e[j]<=s[i]){rooms--;j++;}
        max=Math.max(max,++rooms);
    }
    return max;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Non-overlapping Intervals',
      url: 'https://leetcode.com/problems/non-overlapping-intervals/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Greedy — sort by end, count kept intervals',
          explanation: 'Sort by end time. Always keep the interval with the earliest end (leaves most room for future). Count intervals that must be removed = total - kept.',
          code: `var eraseOverlapIntervals = function(intervals) {
    intervals.sort((a,b)=>a[1]-b[1]);
    let keep=0, lastEnd=-Infinity;
    for(const [s,e] of intervals)
        if(s>=lastEnd){keep++;lastEnd=e;}
    return intervals.length-keep;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Jump Game II',
      url: 'https://leetcode.com/problems/jump-game-ii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Greedy interval covering',
          explanation: 'Think of each position as an interval [i, i+nums[i]]. Find minimum intervals to cover [0, n-1]. At each step, from current range, pick the jump that reaches farthest.',
          code: `var jump = function(nums) {
    let jumps=0, curEnd=0, farthest=0;
    for(let i=0;i<nums.length-1;i++){
        farthest=Math.max(farthest, i+nums[i]);
        if(i===curEnd){ // end of current jump range
            jumps++;
            curEnd=farthest;
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
      num: 5,
      title: 'My Calendar I',
      url: 'https://leetcode.com/problems/my-calendar-i/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Sorted insert + overlap check',
          explanation: 'Keep events sorted by start. For each new event, binary search to find insertion position. Check if it overlaps with previous event (new.start < prev.end) or next event (next.start < new.end).',
          code: `class MyCalendar {
    constructor() { this.events = []; }
    book(start, end) {
        let lo=0, hi=this.events.length;
        while(lo<hi){
            const mid=(lo+hi)>>1;
            if(this.events[mid][0]<start) lo=mid+1; else hi=mid;
        }
        const prev=this.events[lo-1], next=this.events[lo];
        if((prev&&prev[1]>start)||(next&&start<next[0]&&end>next[0])) return false;
        // simplified: check prev.end <= start && end <= next.start
        if((prev&&prev[1]>start)||(next&&end>next[0])) return false;
        this.events.splice(lo,0,[start,end]);
        return true;
    }
}`,
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
      num: 6,
      title: 'Insert Interval',
      url: 'https://leetcode.com/problems/insert-interval/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Three phases — before, overlap, after',
          explanation: `Walk through sorted intervals in three phases:\n1. Add all intervals that END before newInterval starts (no overlap)\n2. Merge all intervals that OVERLAP with newInterval (update newInterval's boundaries)\n3. Add all remaining intervals (start after newInterval ends)`,
          code: `var insert = function(intervals, newInterval) {
    const result = [];
    let i = 0, [newStart, newEnd] = newInterval;
    // Phase 1: before new interval
    while (i < intervals.length && intervals[i][1] < newStart)
        result.push(intervals[i++]);
    // Phase 2: merge overlapping
    while (i < intervals.length && intervals[i][0] <= newEnd) {
        newStart = Math.min(newStart, intervals[i][0]);
        newEnd   = Math.max(newEnd,   intervals[i][1]);
        i++;
    }
    result.push([newStart, newEnd]);
    // Phase 3: after new interval
    while (i < intervals.length) result.push(intervals[i++]);
    return result;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 7,
      title: 'Minimum Interval to Include Each Query',
      url: 'https://leetcode.com/problems/minimum-interval-to-include-each-query/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Sort queries + intervals, min-heap by interval size',
          explanation: `Sort both intervals and queries. Process queries in sorted order. For each query q: add all intervals with start ≤ q to a min-heap (keyed by size = end-start+1). Remove intervals from heap that have ended (end < q). Heap top = smallest active interval containing q.`,
          code: `var minInterval = function(intervals, queries) {
    intervals.sort((a,b)=>a[0]-b[0]);
    const sortedQ = queries.map((q,i)=>[q,i]).sort((a,b)=>a[0]-b[0]);
    // Min-heap: [size, end] — smallest interval first
    const heap = []; // simulate with array for clarity
    const ans = new Array(queries.length).fill(-1);
    let j = 0;
    for (const [q, idx] of sortedQ) {
        // Add intervals starting <= q
        while (j < intervals.length && intervals[j][0] <= q) {
            const [s,e] = intervals[j++];
            heap.push([e-s+1, e]);
            heap.sort((a,b)=>a[0]-b[0]);
        }
        // Remove expired intervals
        while (heap.length && heap[0][1] < q) heap.shift();
        if (heap.length) ans[idx] = heap[0][0];
    }
    return ans;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 8,
      title: 'Maximum Profit in Job Scheduling',
      url: 'https://leetcode.com/problems/maximum-profit-in-job-scheduling/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Sort by end time + DP + binary search',
          explanation: `Sort jobs by end time. dp[i] = max profit considering first i jobs. For each job: option A = skip it (dp[i-1]), option B = take it (profit[i] + dp[j] where j = last job ending ≤ startTime[i]). Use binary search to find j. O(n log n).`,
          code: `var jobScheduling = function(startTime, endTime, profit) {
    const n = startTime.length;
    const jobs = Array.from({length:n}, (_,i)=>[endTime[i], startTime[i], profit[i]])
                      .sort((a,b)=>a[0]-b[0]);
    const dp = [0]; // dp[i] = max profit from first i jobs
    const ends = [0]; // end times for binary search
    for (const [e, s, p] of jobs) {
        // Binary search: rightmost end time <= s
        let lo=0, hi=ends.length-1;
        while(lo<hi){ const mid=(lo+hi+1)>>1; ends[mid]<=s?lo=mid:hi=mid-1; }
        const take = dp[lo] + p;
        dp.push(Math.max(dp[dp.length-1], take));
        ends.push(e);
    }
    return dp[dp.length-1];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧠',
      color: 'green',
      content: `**Interval problem decision tree:**\n1. Need to combine overlapping → sort by START, merge\n2. Min rooms / max overlap count → sweep line (events) or two sorted arrays\n3. Max non-overlapping count → sort by END, greedy\n4. Max weighted non-overlapping → sort by END + DP + binary search\n5. Cover a range with min intervals → sort by START, greedy max reach\n6. Insert new interval → 3 phases: before / merge overlap / after\n7. Queries on intervals → sort both, slide pointer + heap for active intervals`,
    },
  ],
}
