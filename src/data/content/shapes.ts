import type { Article } from '../articles'

export const shapesArticle: Article = {
  slug: 'shapes',
  title: 'Shapes & 2D Geometry',
  emoji: '🔷',
  tagline: 'Triangles, rectangles, circles — every shape reduces to distance + area math.',
  description: 'Shape problems: triangle validity/area, rectangle overlap/union, circle intersection, polygon area (shoelace). All reduce to a handful of geometric primitives. Learn the formulas and when to apply them.',
  gradient: 'from-sky-400 to-cyan-500',
  topicSlug: 'shape',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `Shape problems seem diverse but use the same small set of geometric primitives: distance between points, triangle area via cross product, overlap detection via axis separation, and polygon area via shoelace. Once you see which primitive applies, the code is mechanical.`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Geometric Primitives',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Core geometry formulas',
      code: `// Distance between two points
const dist = (a, b) => Math.sqrt((b[0]-a[0])**2 + (b[1]-a[1])**2);
const dist2 = (a, b) => (b[0]-a[0])**2 + (b[1]-a[1])**2; // squared (avoids sqrt)

// Cross product of vectors (b-a) × (c-a)
// > 0: counterclockwise, < 0: clockwise, = 0: collinear
const cross = (a, b, c) =>
    (b[0]-a[0]) * (c[1]-a[1]) - (b[1]-a[1]) * (c[0]-a[0]);

// Triangle area from 3 points (shoelace / half cross product)
const triArea = (a, b, c) => Math.abs(cross(a, b, c)) / 2;

// Polygon area (shoelace formula)
function polyArea(pts) {
    let area = 0;
    const n = pts.length;
    for (let i = 0; i < n; i++) {
        const j = (i + 1) % n;
        area += pts[i][0] * pts[j][1] - pts[j][0] * pts[i][1];
    }
    return Math.abs(area) / 2;
}

// Triangle inequality (valid triangle)
const validTriangle = (a, b, c) => a+b>c && b+c>a && a+c>b;

// Point inside axis-aligned rectangle
const inRect = (p, x1, y1, x2, y2) =>
    p[0]>=x1 && p[0]<=x2 && p[1]>=y1 && p[1]<=y2;

// Two axis-aligned rectangles overlap (NOT just touch)
const rectsOverlap = (ax1,ay1,ax2,ay2, bx1,by1,bx2,by2) =>
    ax1 < bx2 && bx1 < ax2 && ay1 < by2 && by1 < ay2;`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Triangle Problems',
    },
    {
      type: 'table',
      headers: ['Problem type', 'Key check', 'Formula'],
      rows: [
        ['Valid triangle', 'Triangle inequality', 'a+b>c && b+c>a && a+c>b'],
        ['Max perimeter triangle', 'Sort, check last 3', 'If a[n-3]+a[n-2]>a[n-1], answer is sum'],
        ['Collinear points', 'Cross product = 0', 'cross(a,b,c) === 0'],
        ['Triangle area', 'Shoelace/cross', '|cross(a,b,c)| / 2'],
        ['Triangle type', 'Compare squared sides', 'a²+b²=c² (right), a²+b²<c² (obtuse)'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Rectangle Problems',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Rectangle union area (two rectangles)',
      code: `// Area of union of two rectangles (inclusion-exclusion)
function rectangleArea(rec1, rec2) {
    const MOD = 1_000_000_007n;
    const area = (r) => BigInt(r[2]-r[0]) * BigInt(r[3]-r[1]);
    const intersectX1 = Math.max(rec1[0], rec2[0]);
    const intersectY1 = Math.max(rec1[1], rec2[1]);
    const intersectX2 = Math.min(rec1[2], rec2[2]);
    const intersectY2 = Math.min(rec1[3], rec2[3]);
    const intersect =
        intersectX1 < intersectX2 && intersectY1 < intersectY2
        ? BigInt(intersectX2-intersectX1) * BigInt(intersectY2-intersectY1)
        : 0n;
    return Number((area(rec1) + area(rec2) - intersect) % MOD);
}`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Circle Problems',
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'blue',
      content: `**Two circles intersect/overlap if:** dist(c1, c2) < r1 + r2\n**One inside other if:** dist(c1, c2) < |r1 - r2|\n**Circle contains point:** dist(center, point) <= radius\n\nAlways compare **squared distances** to avoid floating point: dist² < (r1+r2)²`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Circle chain explosion — BFS on circle intersections',
      code: `// Given circles, if you detonate one, all intersecting circles also detonate
// Find: max circles detonated by detonating one
function maximumDetonation(bombs) {
    const n = bombs.length;
    // Build directed graph: a can trigger b if dist(a,b) <= r_a
    const graph = Array.from({length:n}, ()=>[]);
    for (let i = 0; i < n; i++)
        for (let j = 0; j < n; j++) {
            if (i===j) continue;
            const [x1,y1,r1] = bombs[i], [x2,y2] = bombs[j];
            const d2 = (x2-x1)**2 + (y2-y1)**2;
            if (d2 <= r1*r1) graph[i].push(j); // i triggers j
        }
    // BFS from each bomb
    let ans = 0;
    for (let start = 0; start < n; start++) {
        const visited = new Set([start]);
        const q = [start];
        while (q.length) {
            const u = q.shift();
            for (const v of graph[u])
                if (!visited.has(v)) { visited.add(v); q.push(v); }
        }
        ans = Math.max(ans, visited.size);
    }
    return ans;
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
      title: 'Valid Triangle Number',
      url: 'https://leetcode.com/problems/valid-triangle-number/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Sort + two pointers',
          explanation: 'Sort. For each largest side c, find pairs (a,b) where a+b > c using two pointers. All pairs from lo to hi-1 with fixed hi are valid.',
          code: `var triangleNumber = function(nums) {
    nums.sort((a,b)=>a-b);
    let count = 0;
    for (let k = nums.length-1; k >= 2; k--) {
        let lo=0, hi=k-1;
        while (lo < hi) {
            if (nums[lo]+nums[hi] > nums[k]) { count+=hi-lo; hi--; }
            else lo++;
        }
    }
    return count;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Rectangle Overlap',
      url: 'https://leetcode.com/problems/rectangle-overlap/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Check non-overlap conditions',
          explanation: 'Two rectangles DON\'T overlap if one is fully left, right, above, or below the other. Negate that for overlap.',
          code: `var isRectangleOverlap = function(rec1, rec2) {
    // rec = [x1,y1,x2,y2] where (x1,y1)=bottom-left, (x2,y2)=top-right
    return rec1[0] < rec2[2] && rec2[0] < rec1[2] &&
           rec1[1] < rec2[3] && rec2[1] < rec1[3];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Largest Triangle Area',
      url: 'https://leetcode.com/problems/largest-triangle-area/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Brute force all triples — O(n³)',
          explanation: 'With n ≤ 50, try all triples. Area of triangle = |cross product| / 2 from the shoelace formula.',
          code: `var largestTriangleArea = function(points) {
    let max = 0;
    const n = points.length;
    for (let i=0;i<n;i++)
        for (let j=i+1;j<n;j++)
            for (let k=j+1;k<n;k++) {
                const [ax,ay]=points[i],[bx,by]=points[j],[cx,cy]=points[k];
                const area = Math.abs((bx-ax)*(cy-ay)-(cx-ax)*(by-ay))/2;
                max = Math.max(max, area);
            }
    return max;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Valid Square',
      url: 'https://leetcode.com/problems/valid-square/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: 4 equal sides + 2 equal diagonals',
          explanation: 'Compute all 6 pairwise distances squared. A square has exactly 2 distinct values: 4 equal sides and 2 equal longer diagonals. All must be > 0.',
          code: `var validSquare = function(p1, p2, p3, p4) {
    const d2 = (a,b) => (a[0]-b[0])**2 + (a[1]-b[1])**2;
    const pts = [p1,p2,p3,p4];
    const dists = [];
    for (let i=0;i<4;i++)
        for (let j=i+1;j<4;j++)
            dists.push(d2(pts[i],pts[j]));
    dists.sort((a,b)=>a-b);
    // [d,d,d,d, D,D] where D = d*sqrt(2) squared = 2d
    return dists[0] > 0 &&
           dists[0]===dists[1] && dists[1]===dists[2] && dists[2]===dists[3] &&
           dists[4]===dists[5];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Minimum Time Visiting All Points',
      url: 'https://leetcode.com/problems/minimum-time-visiting-all-points/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Chebyshev distance between consecutive points',
          explanation: 'Moving diagonally counts as 1 step. Time from point A to B = max(|dx|, |dy|) — the Chebyshev distance. Sum these for all consecutive pairs.',
          code: `var minTimeToVisitAllPoints = function(points) {
    let time = 0;
    for (let i = 1; i < points.length; i++) {
        const dx = Math.abs(points[i][0] - points[i-1][0]);
        const dy = Math.abs(points[i][1] - points[i-1][1]);
        time += Math.max(dx, dy); // Chebyshev distance
    }
    return time;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '⚠️',
      color: 'red',
      content: `**Floating point traps:**\n- Use squared distances when comparing (avoids sqrt and floating point)\n- For area comparisons, multiply by 2 and compare integers\n- When checking collinearity: cross product === 0 (exact with integers)\n- Triangle classification: use squared side lengths (a²+b² vs c²), not actual sides`,
    },
  ],
}
