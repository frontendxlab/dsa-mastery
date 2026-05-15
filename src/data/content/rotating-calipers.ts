import type { Article } from '../articles'

export const rotatingCalipersArticle: Article = {
  slug: 'rotating-calipers',
  title: 'Rotating Calipers & Convex Polygon Queries',
  emoji: '📏',
  tagline: 'Farthest pair, diameter, closest parallel edges in O(n) after O(n log n) hull.',
  description: 'Rotating calipers is an O(n) technique (after building the convex hull) for: farthest pair of points, diameter of convex polygon, width of convex polygon, closest bichromatic pair, and smallest enclosing rectangle. The idea: two parallel "calipers" rotate around the polygon, and antipodal pairs are visited efficiently. Named for the rotating measurement device.',
  gradient: 'from-amber-700 to-orange-800',
  topicSlug: 'math',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `Rotating calipers: after computing the convex hull, maintain two antipodal points (farthest pair in current caliper direction). As we advance along the hull, we advance the antipodal pointer when the next caliper direction would bring a closer result. For diameter: advance both pointers together, tracking maximum distance. For width: maintain the support line and its antipodal point.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Farthest pair via rotating calipers on convex hull',
      code: `function cross(O, A, B) {
    return (A[0]-O[0])*(B[1]-O[1]) - (A[1]-O[1])*(B[0]-O[0]);
}
function dist2(A, B) {
    return (A[0]-B[0])**2 + (A[1]-B[1])**2;
}

function convexHull(pts) {
    pts.sort((a,b) => a[0]-b[0] || a[1]-b[1]);
    const n = pts.length, hull = [];
    for (const p of pts) {
        while (hull.length >= 2 && cross(hull.at(-2), hull.at(-1), p) <= 0) hull.pop();
        hull.push(p);
    }
    const lower = hull.length + 1;
    for (let i = n-1; i >= 0; i--) {
        while (hull.length >= lower && cross(hull.at(-2), hull.at(-1), pts[i]) <= 0) hull.pop();
        hull.push(pts[i]);
    }
    return hull.slice(0, -1);
}

// Farthest pair of points (diameter of point set)
function farthestPair(points) {
    const hull = convexHull(points);
    const n = hull.length;
    if (n === 1) return 0;
    if (n === 2) return Math.sqrt(dist2(hull[0], hull[1]));
    let maxDist = 0;
    let j = 1;
    for (let i = 0; i < n; i++) {
        while (dist2(hull[i], hull[(j+1)%n]) > dist2(hull[i], hull[j])) j = (j+1) % n;
        maxDist = Math.max(maxDist, dist2(hull[i], hull[j]), dist2(hull[(i+1)%n], hull[j]));
    }
    return Math.sqrt(maxDist);
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
      title: 'Maximum Distance Between a Pair of Values',
      url: 'https://leetcode.com/problems/maximum-distance-between-a-pair-of-values/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Two pointers on sorted arrays',
          explanation: `For each i, find largest j ≥ i where nums2[j] ≥ nums1[i]. Both arrays are non-increasing, so two-pointer works: when nums2[j] < nums1[i], advance i.`,
          code: `var maxDistance = function(nums1, nums2) {
    let res=0,i=0,j=0;
    while(i<nums1.length&&j<nums2.length){
        if(nums2[j]>=nums1[i]) {res=Math.max(res,j-i);j++;}
        else i++;
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
      title: 'Minimum Area Rectangle II',
      url: 'https://leetcode.com/problems/minimum-area-rectangle-ii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Check all pairs as diagonals',
          explanation: `For each pair of points, check if they form a valid rectangle with two other points. Two diagonals of a rectangle bisect each other and have equal length. Group points by (midpoint, half-distance²), pairs sharing these values might form a rectangle.`,
          code: `var minAreaFreeRect = function(points) {
    const set=new Set(points.map(p=>p.join(',')));
    let res=Infinity;
    const n=points.length;
    for(let i=0;i<n;i++) for(let j=i+1;j<n;j++){
        const[x1,y1]=points[i],[x2,y2]=points[j];
        // Check for right angle at i: vector (x2-x1,y2-y1) and (dx,dy) perpendicular
        for(let k=j+1;k<n;k++){
            const[x3,y3]=points[k];
            const[dx1,dy1]=[x2-x1,y2-y1],[dx2,dy2]=[x3-x1,y3-y1];
            // dot product = 0 for right angle at point i
            if(dx1*dx2+dy1*dy2===0){
                const x4=x2+dx2,y4=y2+dy2;
                if(set.has(x4+','+y4)){
                    const area=Math.sqrt(dx1**2+dy1**2)*Math.sqrt(dx2**2+dy2**2);
                    res=Math.min(res,area);
                }
            }
        }
    }
    return res===Infinity?0:res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Check if Points Form a Valid Square',
      url: 'https://leetcode.com/problems/valid-square/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Exactly 2 distinct distances among all pairs',
          explanation: `Sort all 6 pairwise distances. Valid square: 4 equal smaller distances (sides) + 2 equal larger distances (diagonals). All must be > 0.`,
          code: `var validSquare = function(p1, p2, p3, p4) {
    const d=(a,b)=>(a[0]-b[0])**2+(a[1]-b[1])**2;
    const pts=[p1,p2,p3,p4];
    const dists=[];
    for(let i=0;i<4;i++) for(let j=i+1;j<4;j++) dists.push(d(pts[i],pts[j]));
    dists.sort((a,b)=>a-b);
    return dists[0]>0&&dists[0]===dists[3]&&dists[4]===dists[5]&&dists[3]!==dists[4];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '📏',
      color: 'amber',
      content: `**Rotating calipers applications:**\n- Diameter of convex polygon: O(n)\n- Width of convex polygon (minimum distance between parallel support lines): O(n)\n- Closest pair on convex polygon: O(n)\n- Minimum enclosing rectangle: O(n) (rotate calipers around hull)\n\n**Antipodal points:** Two hull points are antipodal if there exist parallel supporting lines through them. As we walk around the hull, the antipodal point advances monotonically.\n\n**Combined with convex hull:** Total complexity O(n log n) for hull + O(n) for rotating calipers = O(n log n) overall.`,
    },
  ],
}
