import type { Article } from '../articles'

export const lineSweepArticle: Article = {
  slug: 'line-sweep',
  title: 'Line Sweep',
  emoji: '📏',
  tagline: 'Sweep a line across events. Sort by x, process events with a sorted structure.',
  description: 'Line sweep processes geometric or interval problems by sweeping a vertical (or horizontal) line across sorted events. At each event, update a data structure that tracks the current state. Applications: rectangle area union, sky line problem, count overlapping intervals at each point, closest pair of points, and computational geometry. The sweep converts 2D problems into 1D by processing one dimension at a time.',
  gradient: 'from-teal-600 to-cyan-700',
  topicSlug: 'graph',
  readTime: '16 min',
  sections: [
    {
      type: 'text',
      content: `Line sweep: sort all "events" (interval starts, ends, points) by their x-coordinate. Sweep left to right, maintaining an active set. When an interval starts, add to active set. When it ends, remove. Between events, compute what's needed (count active intervals, find gaps, merge ranges). The key: what data structure does the active set need? Often a sorted multiset or segment tree.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Line sweep template — interval coverage',
      code: `// Line sweep for interval coverage / overlap counting
function sweepIntervals(intervals) {
    const events = [];
    for (const [l, r] of intervals) {
        events.push([l, 1]);  // start event
        events.push([r, -1]); // end event
    }
    events.sort((a, b) => a[0] - b[0] || a[1] - b[1]); // sort by x, ends before starts at same x

    let active = 0, maxOverlap = 0;
    for (const [x, type] of events) {
        active += type;
        maxOverlap = Math.max(maxOverlap, active);
    }
    return maxOverlap;
}

// For computing total covered length:
function coveredLength(intervals) {
    // Sort by start, merge overlapping
    intervals.sort((a, b) => a[0] - b[0]);
    let total = 0, curEnd = -Infinity;
    for (const [l, r] of intervals) {
        if (l > curEnd) { total += r - l; curEnd = r; }
        else if (r > curEnd) { total += r - curEnd; curEnd = r; }
    }
    return total;
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
      title: 'The Skyline Problem',
      url: 'https://leetcode.com/problems/the-skyline-problem/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Line sweep with max-heap of active building heights',
          explanation: `Events: building start (add height to heap) and end (mark height as removed). Sweep left to right. Active max height = top of heap. Record a keypoint whenever max height changes. Use lazy deletion: only remove heights when they reach the heap top.`,
          code: `var getSkyline = function(buildings) {
    const events=[];
    for(const[l,r,h] of buildings){events.push([l,-h,r]);events.push([r,0,0]);}
    events.sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
    const res=[[0,0]]; // sentinel
    // Max-heap: use sorted array for simplicity
    const heap=[[0,Infinity]]; // [height, end]
    for(const[x,negH,end] of events){
        if(negH!==0) heap.push([-negH,end]); // add building
        // Remove expired buildings
        while(heap.length>1&&heap[0][1]<=x) heap.shift();
        heap.sort((a,b)=>b[0]-a[0]||a[1]-b[1]);
        while(heap.length&&heap[0][1]<=x) heap.shift();
        const maxH=(heap[0]||[0])[0];
        if(res.at(-1)[1]!==maxH) res.push([x,maxH]);
    }
    return res.slice(1);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Rectangle Area II',
      url: 'https://leetcode.com/problems/rectangle-area-ii/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Coordinate compression + sweep line with segment tree',
          explanation: `Compress y-coordinates. Sweep vertical line from left to right. Events: rectangle left edge (add y-interval), right edge (remove y-interval). Track total covered y-length at each x-step. Total area = sum over x-slices of (Δx × covered y-length).`,
          code: `var rectangleArea = function(rectangles) {
    const MOD=1e9+7;
    // Compress y coords
    const ys=[...new Set(rectangles.flatMap(r=>[r[1],r[3]]))].sort((a,b)=>a-b);
    const yIdx=new Map(ys.map((y,i)=>[y,i]));
    // Events: [x, type (+1 start / -1 end), y1, y2]
    const events=[];
    for(const[x1,y1,x2,y2] of rectangles){
        events.push([x1,1,y1,y2]);
        events.push([x2,-1,y1,y2]);
    }
    events.sort((a,b)=>a[0]-b[0]);
    // Count array: cnt[i] = how many rectangles cover y-segment [ys[i], ys[i+1]]
    const cnt=new Array(ys.length).fill(0);
    const coveredY=()=>{
        let s=0;
        for(let i=0;i<ys.length-1;i++) if(cnt[i]>0) s+=ys[i+1]-ys[i];
        return s;
    };
    let area=0, prevX=0;
    for(let i=0;i<events.length;){
        const x=events[i][0];
        area=(area+(x-prevX)*coveredY())%MOD;
        prevX=x;
        while(i<events.length&&events[i][0]===x){
            const[,t,y1,y2]=events[i++];
            for(let j=yIdx.get(y1);j<yIdx.get(y2);j++) cnt[j]+=t;
        }
    }
    return area;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Meeting Rooms II',
      url: 'https://leetcode.com/problems/meeting-rooms-ii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Line sweep — max concurrent intervals',
          explanation: `Create events for each meeting start (+1) and end (-1). Sort by time (ends before starts at same time). Sweep: track running count of active meetings. Max count = rooms needed.`,
          code: `var minMeetingRooms = function(intervals) {
    const events=[];
    for(const[s,e] of intervals){events.push([s,1]);events.push([e,-1]);}
    events.sort((a,b)=>a[0]-b[0]||a[1]-b[1]); // ends before starts
    let rooms=0,max=0;
    for(const[,t] of events){rooms+=t;max=Math.max(max,rooms);}
    return max;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Count the Number of Incremovable Subarrays II',
      url: 'https://leetcode.com/problems/count-the-number-of-incremovable-subarrays-ii/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Two pointers from ends',
          explanation: `Find the longest non-decreasing prefix (end = L). Find the longest non-decreasing suffix (start = R). For each prefix length p (0 to L+1), find the smallest suffix start r such that prefix[p-1] < suffix[r] (if p > 0). Count of valid subarrays for this prefix = n - r + 1.`,
          code: `var incremovableSubarrayCount = function(nums) {
    const n=nums.length;
    let l=0;
    while(l<n-1&&nums[l]<nums[l+1]) l++;
    if(l===n-1) return n*(n+1)/2; // whole array is strictly increasing
    let r=n-1;
    while(r>0&&nums[r-1]<nums[r]) r--;
    let ans=n-r+1; // only right suffix removed, prefix = empty
    let j=r;
    for(let i=0;i<=l;i++){
        while(j<n&&nums[i]>=nums[j]) j++;
        ans+=n-j+1;
    }
    return ans;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '📏',
      color: 'teal',
      content: `**Line sweep pattern:**\n1. Convert problem into events (start/end of intervals or objects)\n2. Sort events by position (x or time)\n3. Process events left to right, maintaining an active set\n4. Query/update active set at each event\n\n**Active set choices:**\n- Count of active intervals: simple counter\n- Max active value: max-heap\n- Covered length on 1D axis: segment tree with lazy count\n- Set of active segments: balanced BST (sorted set)\n\n**Sorting trick:** When start and end events occur at same x, process ENDS before STARTS (for non-overlapping intervals) or STARTS before ENDS (for strict overlap counting) — depends on problem definition.`,
    },
  ],
}
