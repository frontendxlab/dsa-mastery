import type { Article } from '../articles'

export const convexHullArticle: Article = {
  slug: 'convex-hull',
  title: 'Convex Hull',
  emoji: '📐',
  tagline: 'Smallest convex polygon enclosing all points. Graham scan O(n log n). Andrew\'s monotone chain.',
  description: "A convex hull is the smallest convex polygon containing all given points. Two O(n log n) algorithms: Graham scan (sort by polar angle, stack-based) and Andrew's monotone chain (sort by x then y, build upper and lower hulls). Applications: largest triangle/polygon area, farthest pair of points, computational geometry queries, convex hull trick for DP.",
  gradient: 'from-amber-500 to-yellow-600',
  topicSlug: 'math',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `Andrew's monotone chain: sort points by x (tie-break by y). Build lower hull left to right: maintain a stack where each new point makes a left turn — if it would make a right turn (or be collinear), pop the stack. Build upper hull right to left same way. Concatenate. Cross product of vectors AB and AC: (B-A) × (C-A) > 0 means left turn, < 0 means right turn, = 0 means collinear.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: "Andrew's monotone chain convex hull",
      code: `// Cross product of vectors OA and OB
function cross(O, A, B) {
    return (A[0] - O[0]) * (B[1] - O[1]) - (A[1] - O[1]) * (B[0] - O[0]);
}

// Returns convex hull in counter-clockwise order
// Include collinear: use cross(...) < 0, Exclude: use cross(...) <= 0
function convexHull(points) {
    points.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]);
    const n = points.length;
    if (n < 3) return points;

    const hull = [];
    // Build lower hull
    for (const p of points) {
        while (hull.length >= 2 && cross(hull.at(-2), hull.at(-1), p) <= 0) hull.pop();
        hull.push(p);
    }
    // Build upper hull
    const lower = hull.length + 1;
    for (let i = n - 1; i >= 0; i--) {
        while (hull.length >= lower && cross(hull.at(-2), hull.at(-1), points[i]) <= 0) hull.pop();
        hull.push(points[i]);
    }
    hull.pop(); // Remove last point (same as first)
    return hull;
}

// Area of convex hull using shoelace formula
function polygonArea(hull) {
    let area = 0;
    for (let i = 0; i < hull.length; i++) {
        const [x1, y1] = hull[i];
        const [x2, y2] = hull[(i + 1) % hull.length];
        area += x1 * y2 - x2 * y1;
    }
    return Math.abs(area) / 2;
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
      title: 'Erect the Fence',
      url: 'https://leetcode.com/problems/erect-the-fence/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: "Intuition 1: Convex hull (Andrew's monotone chain, include boundary)",
          explanation: `Find all points on the convex hull boundary (including collinear points on edges). Use monotone chain with strict inequality for the turn check so collinear points are kept.`,
          code: `var outerTrees = function(trees) {
    if(trees.length<=3) return trees;
    trees.sort((a,b)=>a[0]!==b[0]?a[0]-b[0]:a[1]-b[1]);
    const cross=(o,a,b)=>(a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0]);
    const hull=[];
    // Lower
    for(const p of trees){
        while(hull.length>=2&&cross(hull.at(-2),hull.at(-1),p)<0) hull.pop();
        hull.push(p);
    }
    // Upper
    const lo=hull.length+1;
    for(let i=trees.length-1;i>=0;i--){
        while(hull.length>=lo&&cross(hull.at(-2),hull.at(-1),trees[i])<0) hull.pop();
        hull.push(trees[i]);
    }
    hull.pop();
    return [...new Set(hull.map(p=>p.join(',')))].map(s=>s.split(',').map(Number));
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Max Points on a Line',
      url: 'https://leetcode.com/problems/max-points-on-a-line/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: For each point, count collinear points by slope',
          explanation: `For each point p, group other points by slope to p. Most points on same slope = max on one line through p. Use GCD-reduced fractions as slope keys to avoid floating point.`,
          code: `var maxPoints = function(points) {
    const n=points.length; if(n<=2) return n;
    let res=2;
    for(let i=0;i<n;i++){
        const map=new Map();
        for(let j=i+1;j<n;j++){
            let dy=points[j][1]-points[i][1], dx=points[j][0]-points[i][0];
            const g=(a,b)=>b?g(b,a%b):a;
            const d=g(Math.abs(dy),Math.abs(dx));
            dy/=d; dx/=d;
            if(dx<0||(dx===0&&dy<0)){dy=-dy;dx=-dx;}
            const key=dy+','+dx;
            map.set(key,(map.get(key)||1)+1);
            res=Math.max(res,map.get(key));
        }
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Minimum Area Rectangle',
      url: 'https://leetcode.com/problems/minimum-area-rectangle/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Hash set + check diagonal pairs',
          explanation: `Store all points in a hash set. For each pair of points (p1, p2) that could be a diagonal (not sharing x or y), check if the other two corners exist. Area = |dx| * |dy|.`,
          code: `var minAreaRect = function(points) {
    const set=new Set(points.map(p=>p.join(',')));
    let res=Infinity;
    for(let i=0;i<points.length;i++) for(let j=i+1;j<points.length;j++){
        const[x1,y1]=points[i],[x2,y2]=points[j];
        if(x1===x2||y1===y2) continue;
        if(set.has(x1+','+y2)&&set.has(x2+','+y1))
            res=Math.min(res,Math.abs(x2-x1)*Math.abs(y2-y1));
    }
    return res===Infinity?0:res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Largest Triangle Area',
      url: 'https://leetcode.com/problems/largest-triangle-area/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Convex hull + rotating calipers or brute force on hull',
          explanation: `For n ≤ 50 (LeetCode): brute force all triples O(n³). For large n: compute convex hull (O(n log n)) then check all triples on hull (hull size typically much smaller). Largest triangle must have all 3 vertices on the convex hull.`,
          code: `var largestTriangleArea = function(points) {
    const area=(p1,p2,p3)=>Math.abs(
        (p2[0]-p1[0])*(p3[1]-p1[1])-(p3[0]-p1[0])*(p2[1]-p1[1])
    )/2;
    let res=0;
    for(let i=0;i<points.length;i++)
        for(let j=i+1;j<points.length;j++)
            for(let k=j+1;k<points.length;k++)
                res=Math.max(res,area(points[i],points[j],points[k]));
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '📐',
      color: 'amber',
      content: `**Cross product for geometry:**\n- cross(O, A, B) = (A-O) × (B-O)\n- Positive: left turn (counter-clockwise)\n- Negative: right turn (clockwise)\n- Zero: collinear\n\n**Convex hull algorithms:**\n- Andrew's monotone chain: sort + two-pass O(n log n), simplest to code\n- Graham scan: sort by polar angle, O(n log n)\n- Jarvis march (gift wrapping): O(nh) where h = hull size — good when h << n\n\n**Key property:** Largest triangle must have all 3 vertices on convex hull. Rotating calipers finds it in O(h²) after O(n log n) hull computation.`,
    },
  ],
}
