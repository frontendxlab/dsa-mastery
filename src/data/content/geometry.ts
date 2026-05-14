import type { Article } from '../articles'

export const geometryArticle: Article = {
  slug: 'geometry',
  title: 'Computational Geometry',
  emoji: '📐',
  tagline: 'Cross products determine orientation. Convex hull wraps everything.',
  description: 'Computational geometry uses cross products for orientation tests, polygon area, and convex hull. Learn the cross product trick, gift wrapping, and Andrew\'s monotone chain algorithm.',
  gradient: 'from-cyan-400 to-sky-500',
  topicSlug: 'geometry',
  readTime: '16 min',
  sections: [
    {
      type: 'text',
      content: `Computational geometry problems involve points, lines, and polygons. The fundamental operation is the cross product — it tells you the orientation of three points (clockwise, counterclockwise, or collinear) and computes areas. Everything else (convex hull, line intersection, point-in-polygon) builds on top of cross products.`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'The Cross Product',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Cross product and orientation',
      code: `// 2D cross product of vectors (b-a) and (c-a)
// = (b.x-a.x)*(c.y-a.y) - (b.y-a.y)*(c.x-a.x)
function cross(a, b, c) {
    return (b[0]-a[0]) * (c[1]-a[1]) - (b[1]-a[1]) * (c[0]-a[0]);
}

// Interpretation:
// > 0: counterclockwise (left turn)
// < 0: clockwise (right turn)
// = 0: collinear

// Distance between two points
function dist(a, b) {
    return Math.sqrt((b[0]-a[0])**2 + (b[1]-a[1])**2);
}

// Area of polygon (shoelace formula)
function polygonArea(points) {
    let area = 0;
    const n = points.length;
    for (let i = 0; i < n; i++) {
        const j = (i + 1) % n;
        area += points[i][0] * points[j][1];
        area -= points[j][0] * points[i][1];
    }
    return Math.abs(area) / 2;
}`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Convex Hull — Andrew\'s Monotone Chain',
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'teal',
      content: `**Convex hull** = smallest convex polygon containing all points.\n\nAndrew's monotone chain builds lower and upper hulls separately:\n1. Sort points by (x, then y)\n2. Build lower hull left→right: while last turn is clockwise, pop the last point\n3. Build upper hull right→left: same logic\n4. Combine (drop duplicate endpoints)`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Convex Hull — O(n log n)',
      code: `function convexHull(points) {
    points.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const n = points.length;
    if (n < 3) return points;

    const lower = [];
    for (const p of points) {
        while (lower.length >= 2 &&
               cross(lower.at(-2), lower.at(-1), p) <= 0)
            lower.pop();
        lower.push(p);
    }

    const upper = [];
    for (let i = n - 1; i >= 0; i--) {
        const p = points[i];
        while (upper.length >= 2 &&
               cross(upper.at(-2), upper.at(-1), p) <= 0)
            upper.pop();
        upper.push(p);
    }

    // Remove last point of each half (duplicates of first/last)
    lower.pop(); upper.pop();
    return [...lower, ...upper];
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
      title: 'Max Points on a Line',
      url: 'https://leetcode.com/problems/max-points-on-a-line/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: For each point, count collinear points by slope',
          explanation: `For each anchor point i, count points with the same slope relative to i. Use a hashmap from (dy/dx reduced by GCD) → count. The max for any anchor = answer.`,
          code: `var maxPoints = function(points) {
    if (points.length <= 2) return points.length;
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    let max = 2;
    for (let i = 0; i < points.length; i++) {
        const map = new Map();
        for (let j = i + 1; j < points.length; j++) {
            let dy = points[j][1] - points[i][1];
            let dx = points[j][0] - points[i][0];
            const g = gcd(Math.abs(dy), Math.abs(dx));
            if (g !== 0) { dy /= g; dx /= g; }
            if (dx < 0 || (dx === 0 && dy < 0)) { dy = -dy; dx = -dx; }
            const key = \`\${dy}/\${dx}\`;
            map.set(key, (map.get(key) ?? 1) + 1);
            max = Math.max(max, map.get(key));
        }
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
      title: 'Min Area Rectangle',
      url: 'https://leetcode.com/problems/minimum-area-rectangle/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Fix two diagonal points, check other two corners exist',
          explanation: `For every pair of points (p1, p2) that could be diagonals of a rectangle (not same x or y), check if (p1.x, p2.y) and (p2.x, p1.y) exist in the set. Compute area = |dx * dy|.`,
          code: `var minAreaRect = function(points) {
    const set = new Set(points.map(([x,y]) => \`\${x},\${y}\`));
    let min = Infinity;
    for (let i = 0; i < points.length; i++)
        for (let j = i + 1; j < points.length; j++) {
            const [x1,y1] = points[i], [x2,y2] = points[j];
            if (x1 !== x2 && y1 !== y2) {
                if (set.has(\`\${x1},\${y2}\`) && set.has(\`\${x2},\${y1}\`))
                    min = Math.min(min, Math.abs(x2-x1) * Math.abs(y2-y1));
            }
        }
    return min === Infinity ? 0 : min;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Erect the Fence (Convex Hull)',
      url: 'https://leetcode.com/problems/erect-the-fence/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Andrew\'s monotone chain convex hull',
          explanation: 'Build convex hull \u2014 the minimum perimeter fence that encloses all trees. Use <= 0 (not < 0) in cross product check to keep collinear points on hull edges.',
          code: `var outerTrees = function(trees) {
    trees.sort((a,b) => a[0]-b[0] || a[1]-b[1]);
    const cross = (o, a, b) => (a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0]);
    const lower = [], upper = [];
    for (const p of trees) {
        while (lower.length >= 2 && cross(lower.at(-2), lower.at(-1), p) < 0) lower.pop();
        lower.push(p);
    }
    for (let i = trees.length-1; i >= 0; i--) {
        const p = trees[i];
        while (upper.length >= 2 && cross(upper.at(-2), upper.at(-1), p) < 0) upper.pop();
        upper.push(p);
    }
    return [...new Set([...lower, ...upper].map(p => JSON.stringify(p)))].map(s => JSON.parse(s));
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'amber',
      content: `**Floating point pitfalls**: Geometry problems with floating point coordinates often fail due to precision. Strategies:\n1. Use integer arithmetic where possible (scale and avoid division)\n2. Use ε comparisons: \`Math.abs(a - b) < 1e-9\` instead of \`a === b\`\n3. GCD normalization for slopes eliminates float issues entirely`,
    },
  ],
}
