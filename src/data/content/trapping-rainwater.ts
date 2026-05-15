import type { Article } from '../articles'

export const trappingRainwaterArticle: Article = {
  slug: 'trapping-rainwater',
  title: 'Trapping Rain Water',
  emoji: '🌧️',
  tagline: 'Water trapped between heights. Two pointers, stack, 2D BFS variants.',
  description: 'Trapping rain water: given heights, compute water trapped above each bar. 1D: water at position i = min(maxLeft[i], maxRight[i]) - height[i]. O(n) two-pointer: maintain l_max and r_max, process from the lower side. Stack-based: process bars as right boundaries, pop when taller bar found, compute trapped water. 2D variant: BFS from border, use min-heap to find lowest boundary.',
  gradient: 'from-blue-600 to-cyan-700',
  topicSlug: 'dp',
  readTime: '13 min',
  sections: [
    {
      type: 'text',
      content: `1D two-pointer: l=0, r=n-1, l_max=0, r_max=0. If height[l] < height[r]: if height[l] >= l_max → l_max = height[l]; else add l_max - height[l] to result; advance l. Symmetric for right. Logic: the lower side determines water level at that position. 2D variant: BFS with min-heap from all border cells, process lowest cell first, water = max(0, current_boundary - height[cell]).`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Two-pointer rain water O(n) O(1)',
      code: `function trap(height) {
    let l = 0, r = height.length - 1;
    let l_max = 0, r_max = 0, water = 0;

    while (l < r) {
        if (height[l] < height[r]) {
            if (height[l] >= l_max) l_max = height[l];
            else water += l_max - height[l];
            l++;
        } else {
            if (height[r] >= r_max) r_max = height[r];
            else water += r_max - height[r];
            r--;
        }
    }
    return water;
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
      title: 'Trapping Rain Water',
      url: 'https://leetcode.com/problems/trapping-rain-water/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Two pointers — process from the lower boundary side',
          explanation: `l and r pointers from ends. l_max and r_max track max height seen from each side. Process whichever side has smaller height — we know the boundary from that side. Water = l_max - height[l] or r_max - height[r].`,
          code: `var trap = function(height) {
    let l=0,r=height.length-1,lm=0,rm=0,water=0;
    while(l<r){
        if(height[l]<height[r]){
            height[l]>=lm?lm=height[l]:water+=lm-height[l]; l++;
        } else {
            height[r]>=rm?rm=height[r]:water+=rm-height[r]; r--;
        }
    }
    return water;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Container With Most Water',
      url: 'https://leetcode.com/problems/container-with-most-water/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Two pointers — always advance the shorter side',
          explanation: `Area = min(height[l], height[r]) × (r-l). Moving the taller side can only decrease width while height stays same or decreases — can't improve. So always advance shorter side to potentially find taller bar.`,
          code: `var maxArea = function(height) {
    let l=0,r=height.length-1,max=0;
    while(l<r){
        max=Math.max(max,Math.min(height[l],height[r])*(r-l));
        height[l]<height[r]?l++:r--;
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
      title: 'Largest Rectangle in Histogram',
      url: 'https://leetcode.com/problems/largest-rectangle-in-histogram/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Monotone increasing stack — pop on shorter bar, compute area',
          explanation: `Stack stores indices of increasing heights. When current height < stack top: pop top, compute area: height = heights[top], width = i - stack[-1] - 1 (or i if stack empty). Current bar is the right boundary, stack[-1] is the left boundary.`,
          code: `var largestRectangleArea = function(heights) {
    const st=[], h=[...heights,0]; // sentinel 0 to flush stack
    let max=0;
    for(let i=0;i<h.length;i++){
        while(st.length&&h[st[st.length-1]]>h[i]){
            const top=st.pop();
            const width=st.length?i-st[st.length-1]-1:i;
            max=Math.max(max,h[top]*width);
        }
        st.push(i);
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
      title: 'Trapping Rain Water II',
      url: 'https://leetcode.com/problems/trapping-rain-water-ii/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: BFS with min-heap from border — water level = max height seen on path',
          explanation: `Initialize heap with all border cells. BFS inward: pop minimum boundary cell. For each unvisited neighbor: water = max(0, boundary - height[neighbor]). Push neighbor with boundary = max(boundary, height[neighbor]).`,
          code: `var trapRainWater = function(heightMap) {
    const m=heightMap.length,n=heightMap[0].length;
    if(m<3||n<3) return 0;
    const vis=Array.from({length:m},()=>new Array(n).fill(false));
    const heap=[]; // [height, r, c]
    for(let r=0;r<m;r++) for(let c=0;c<n;c++) if(r===0||r===m-1||c===0||c===n-1){heap.push([heightMap[r][c],r,c]);vis[r][c]=true;}
    heap.sort((a,b)=>a[0]-b[0]);
    let water=0;
    const dirs=[[0,1],[0,-1],[1,0],[-1,0]];
    while(heap.length){
        heap.sort((a,b)=>a[0]-b[0]);
        const [h,r,c]=heap.shift();
        for(const [dr,dc] of dirs){
            const [nr,nc]=[r+dr,c+dc];
            if(nr<0||nr>=m||nc<0||nc>=n||vis[nr][nc]) continue;
            vis[nr][nc]=true;
            water+=Math.max(0,h-heightMap[nr][nc]);
            heap.push([Math.max(h,heightMap[nr][nc]),nr,nc]);
        }
    }
    return water;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🌧️',
      color: 'blue',
      content: `**1D rain water patterns:**\n- Two-pointer: O(n) O(1) — process from lower boundary\n- Stack: O(n) O(n) — useful for variations (like how many units per level)\n- Prefix arrays: O(n) O(n) — precompute leftMax[i] and rightMax[i]\n\n**Key insight for two-pointer:** When height[l] < height[r], the water at l is determined by l_max (the left boundary limits, not the right). We don't need to know the actual right boundary — we know it's at least height[r] > height[l].\n\n**2D rain water:** BFS from border using min-heap ensures we always process the lowest boundary first. Water can only be as high as the lowest point on its "wall" to the outside.`,
    },
  ],
}
