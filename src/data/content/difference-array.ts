import type { Article } from '../articles'

export const differenceArrayArticle: Article = {
  slug: 'difference-array',
  title: 'Difference Array & Range Updates',
  emoji: '🔧',
  tagline: 'Add delta to range [l,r] in O(1). Prefix sum to recover. Sweep line in 1D.',
  description: 'A difference array enables O(1) range updates: to add delta to all elements in [l, r], write diff[l] += delta and diff[r+1] -= delta. After all updates, prefix sum the diff array to get the final values. This technique also models "events at endpoints" for sweep-line problems. 2D difference arrays extend this to rectangles.',
  gradient: 'from-cyan-500 to-sky-600',
  topicSlug: 'dp',
  readTime: '12 min',
  sections: [
    {
      type: 'text',
      content: `Difference array converts "range update, point query" into "point update, prefix query." The diff array stores delta changes: diff[i] = arr[i] - arr[i-1]. To add v to arr[l..r]: diff[l] += v and diff[r+1] -= v. After all updates, prefix sum diff to recover arr. When combined with coordinate compression, this handles sparse ranges up to 10^9.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Difference array templates — 1D and 2D',
      code: `// 1D difference array
class DifferenceArray {
    constructor(n) { this.diff = new Array(n + 2).fill(0); }
    add(l, r, v) { this.diff[l] += v; this.diff[r + 1] -= v; }
    build() {
        const arr = [...this.diff];
        for (let i = 1; i < arr.length; i++) arr[i] += arr[i - 1];
        return arr;
    }
}

// 2D difference array for rectangle range updates
class DiffArray2D {
    constructor(m, n) { this.d = Array.from({length:m+2},()=>new Array(n+2).fill(0)); }
    add(r1, c1, r2, c2, v) {
        this.d[r1][c1] += v;
        this.d[r1][c2+1] -= v;
        this.d[r2+1][c1] -= v;
        this.d[r2+1][c2+1] += v;
    }
    build() {
        const m = this.d.length, n = this.d[0].length;
        for (let i = 0; i < m; i++) for (let j = 1; j < n; j++) this.d[i][j] += this.d[i][j-1];
        for (let j = 0; j < n; j++) for (let i = 1; i < m; i++) this.d[i][j] += this.d[i-1][j];
        return this.d;
    }
}

// Event-based sweep (coordinate-compressed difference array)
// For ranges [l1,r1], [l2,r2], ... with values v1, v2:
// events = [{pos: l, +v}, {pos: r+1, -v}]
// Sort events by pos, sweep to get value at each point`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Range Addition',
      url: 'https://leetcode.com/problems/range-addition/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Difference array — O(k + n)',
          explanation: `For each update [l, r, v]: diff[l] += v, diff[r+1] -= v. After all updates, take prefix sum of diff to get final array.`,
          code: `var getModifiedArray = function(length, updates) {
    const diff=new Array(length+1).fill(0);
    for(const[l,r,v] of updates){diff[l]+=v;diff[r+1]-=v;}
    for(let i=1;i<length;i++) diff[i]+=diff[i-1];
    return diff.slice(0,length);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Corporate Flight Bookings',
      url: 'https://leetcode.com/problems/corporate-flight-bookings/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Difference array on flight indices',
          explanation: `For each booking [first, last, seats]: diff[first-1] += seats, diff[last] -= seats. Prefix sum gives total seats booked on each flight.`,
          code: `var corpFlightBookings = function(bookings, n) {
    const diff=new Array(n+1).fill(0);
    for(const[f,l,s] of bookings){diff[f-1]+=s;diff[l]-=s;}
    for(let i=1;i<n;i++) diff[i]+=diff[i-1];
    return diff.slice(0,n);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Car Pooling',
      url: 'https://leetcode.com/problems/car-pooling/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Difference array on stops',
          explanation: `For each trip [num, from, to]: passengers board at from and leave at to. diff[from] += num, diff[to] -= num. Take prefix sum, check no point exceeds capacity.`,
          code: `var carPooling = function(trips, capacity) {
    const diff=new Array(1001).fill(0);
    for(const[num,from,to] of trips){diff[from]+=num;diff[to]-=num;}
    let cur=0;
    for(const v of diff){cur+=v;if(cur>capacity) return false;}
    return true;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Stamping the Grid',
      url: 'https://leetcode.com/problems/stamping-the-grid/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: 2D difference array + prefix sums',
          explanation: `Find all valid stamp positions (no blocked cell in stampH×stampW rectangle). Use 2D prefix sum to check validity in O(1). Mark each valid stamp position in a 2D diff array. Then prefix sum the diff array — any empty (0) cell with a nonzero "stamp coverage count" gets covered.`,
          code: `var possibleToStamp = function(grid, stampHeight, stampWidth) {
    const m=grid.length,n=grid[0].length;
    // 2D prefix sum of grid (blocked cells)
    const pre=Array.from({length:m+1},()=>new Array(n+1).fill(0));
    for(let i=1;i<=m;i++) for(let j=1;j<=n;j++)
        pre[i][j]=grid[i-1][j-1]+pre[i-1][j]+pre[i][j-1]-pre[i-1][j-1];
    const rectSum=(r1,c1,r2,c2)=>pre[r2+1][c2+1]-pre[r1][c2+1]-pre[r2+1][c1]+pre[r1][c1];
    // 2D difference array for stamp coverage
    const diff=Array.from({length:m+2},()=>new Array(n+2).fill(0));
    for(let r=0;r+stampHeight<=m;r++) for(let c=0;c+stampWidth<=n;c++){
        if(rectSum(r,c,r+stampHeight-1,c+stampWidth-1)>0) continue; // blocked cell in range
        diff[r][c]++;diff[r][c+stampWidth]--;diff[r+stampHeight][c]--;diff[r+stampHeight][c+stampWidth]++;
    }
    // Prefix sum diff, check every empty cell is covered
    const cov=Array.from({length:m+1},()=>new Array(n+1).fill(0));
    for(let i=0;i<m;i++) for(let j=0;j<n;j++){
        cov[i+1][j+1]=diff[i][j]+(i>0?cov[i][j+1]:0)+(j>0?cov[i+1][j]:0)-(i>0&&j>0?cov[i][j]:0);
        if(!grid[i][j]&&cov[i+1][j+1]<=0) return false;
    }
    return true;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'My Calendar III',
      url: 'https://leetcode.com/problems/my-calendar-iii/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Sorted map as difference array',
          explanation: `Use a sorted map (TreeMap equivalent). For each booking [start, end]: map[start]++, map[end]--. After update, sweep the map values as prefix sums to find max concurrency.`,
          code: `class MyCalendarThree {
    constructor() { this.events=new Map(); }
    book(start, end) {
        this.events.set(start,(this.events.get(start)||0)+1);
        this.events.set(end,(this.events.get(end)||0)-1);
        let cur=0,max=0;
        for(const k of [...this.events.keys()].sort((a,b)=>a-b)){
            cur+=this.events.get(k);
            max=Math.max(max,cur);
        }
        return max;
    }
}`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🔧',
      color: 'teal',
      content: `**When difference array beats segment tree:**\n- All updates first, then one final read → diff array O(n+k)\n- Segment tree: O(k log n) updates + O(n) read — more overhead\n\n**2D difference array:** add v to rectangle [r1,c1]→[r2,c2]:\n- diff[r1][c1] += v\n- diff[r1][c2+1] -= v\n- diff[r2+1][c1] -= v\n- diff[r2+1][c2+1] += v\nThen double prefix sum to recover.\n\n**Coordinate-compressed event sweep:** when positions are huge (up to 10^9) but few (≤ 10^5), sort events, use a map as the diff array.`,
    },
  ],
}
