import type { Article } from '../articles'

export const greedyIntervalsArticle: Article = {
  slug: 'greedy-intervals',
  title: 'Greedy Interval Problems',
  emoji: '📅',
  tagline: 'Activity selection, meeting rooms, interval scheduling. Sort + greedy sweep.',
  description: 'Interval scheduling problems ask for optimal selection or coverage of time intervals. Core greedy patterns: activity selection (maximize non-overlapping intervals — sort by end time), interval covering (minimum intervals to cover a range — sort by start, greedily pick farthest reach), meeting rooms (minimum rooms needed — count overlapping at any moment), and task scheduling with deadlines.',
  gradient: 'from-teal-700 to-cyan-800',
  topicSlug: 'graph',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `Activity selection greedy: sort by end time. Always pick the interval with the earliest end time that doesn't conflict with the last picked. This is optimal. Meeting rooms: sweep events (start: +1, end: -1), track running max of concurrent events. Interval covering: sort by start, greedily extend reach. Jump Game variant: how far can you reach from current position?`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Activity selection and meeting rooms templates',
      code: `// Maximum non-overlapping intervals (activity selection)
function maxNonOverlapping(intervals) {
    intervals.sort((a, b) => a[1] - b[1]); // sort by end time
    let count = 0, lastEnd = -Infinity;
    for (const [start, end] of intervals) {
        if (start >= lastEnd) { // no overlap with last selected
            count++;
            lastEnd = end;
        }
    }
    return count;
}

// Minimum meeting rooms needed
function minMeetingRooms(intervals) {
    const events = [];
    for (const [s, e] of intervals) {
        events.push([s, 1]);  // start
        events.push([e, -1]); // end (end first if tie, so use -1 in sort)
    }
    events.sort((a, b) => a[0] - b[0] || a[1] - b[1]); // end before start at same time
    let rooms = 0, maxRooms = 0;
    for (const [, type] of events) {
        rooms += type;
        maxRooms = Math.max(maxRooms, rooms);
    }
    return maxRooms;
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
          label: 'Intuition 1: Sort by end, greedily keep earliest-ending non-overlapping intervals',
          explanation: `Sort by end time. Keep an interval if its start ≥ last kept end. Count removed intervals = total - kept. Equivalently: count maximum non-overlapping, subtract from total.`,
          code: `var eraseOverlapIntervals = function(intervals) {
    intervals.sort((a,b)=>a[1]-b[1]);
    let keep=0, end=-Infinity;
    for(const [s,e] of intervals) if(s>=end){keep++;end=e;}
    return intervals.length-keep;
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
          label: 'Intuition 1: Sort start and end times separately, two-pointer count peak',
          explanation: `Sort starts and ends separately. Use pointer i (starts) and j (ends). Whenever a meeting starts before the earliest end, need a new room. When start >= earliest end, reuse a room.`,
          code: `var minMeetingRooms = function(intervals) {
    const starts=intervals.map(i=>i[0]).sort((a,b)=>a-b);
    const ends=intervals.map(i=>i[1]).sort((a,b)=>a-b);
    let rooms=0,j=0;
    for(let i=0;i<starts.length;i++){
        if(starts[i]<ends[j]) rooms++;
        else j++;
    }
    return rooms;
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
          label: 'Intuition 1: Sort by end, shoot each arrow at earliest end, skip all overlapping balloons',
          explanation: `Same as activity selection. Sort by end. Shoot arrow at current balloon's end — bursts all overlapping balloons (those whose start ≤ current end). Count how many arrows needed.`,
          code: `var findMinArrowShots = function(points) {
    points.sort((a,b)=>a[1]-b[1]);
    let arrows=1, end=points[0][1];
    for(let i=1;i<points.length;i++){
        if(points[i][0]>end){arrows++;end=points[i][1];}
    }
    return arrows;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Video Stitching',
      url: 'https://leetcode.com/problems/video-stitching/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Greedy interval covering — sort by start, extend reach greedily',
          explanation: `Sort by start time. At each step, from current coverage end, find the clip that starts ≤ current end with the farthest reach (maxEnd). Advance current end to maxEnd. Count advances = number of clips used.`,
          code: `var videoStitching = function(clips, time) {
    clips.sort((a,b)=>a[0]-b[0]);
    let clips_used=0, curEnd=0, farthest=0, i=0;
    while(curEnd<time){
        while(i<clips.length&&clips[i][0]<=curEnd)
            farthest=Math.max(farthest,clips[i++][1]);
        if(farthest===curEnd) return -1; // stuck
        curEnd=farthest; clips_used++;
    }
    return clips_used;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Task Scheduler',
      url: 'https://leetcode.com/problems/task-scheduler/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Math — most frequent task determines idle slots',
          explanation: `Let f = max frequency. There are f-1 "chunks" of size n+1 (n = cooldown). Fill each chunk with other tasks. Answer = max(tasks.length, (f-1)*(n+1) + count_of_tasks_with_max_freq).`,
          code: `var leastInterval = function(tasks, n) {
    const freq=new Array(26).fill(0);
    for(const t of tasks) freq[t.charCodeAt(0)-65]++;
    const maxF=Math.max(...freq);
    const countMax=freq.filter(f=>f===maxF).length;
    return Math.max(tasks.length,(maxF-1)*(n+1)+countMax);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '📅',
      color: 'teal',
      content: `**Interval sorting strategies:**\n- By end time: maximize non-overlapping (activity selection)\n- By start time: covering problems (Jump Game, Video Stitching)\n- Both sorted: two-pointer meeting rooms trick\n\n**Proof of optimality for activity selection:** Exchange argument — if any optimal solution doesn't pick the earliest-ending interval, we can swap it in without reducing the count.\n\n**Common trap:** Intervals that touch (end == start) — define as overlapping or not? Always clarify. For meeting rooms: [1,2] and [2,3] — if end is exclusive, no overlap; if inclusive, they share time 2.`,
    },
  ],
}
