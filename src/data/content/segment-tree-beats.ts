import type { Article } from '../articles'

export const segmentTreeBeatsArticle: Article = {
  slug: 'segment-tree-beats',
  title: 'Segment Tree Beats (Ji Driver)',
  emoji: '💥',
  tagline: 'Range chmin/chmax in O(n log²n). Tags break only when strictly better value exists.',
  description: 'Segment Tree Beats (Ji Driver Segmentation) handles range operations like "set all elements > x to x" (range chmin) in O(n log²n). The key insight: only apply the operation to a subtree when the maximum changes; skip if it already satisfies the condition. Each node stores first and second maximum values. The tag propagates only when the new limit is strictly between them, ensuring each "break" is amortized efficiently.',
  gradient: 'from-red-900 to-orange-900',
  topicSlug: 'dp',
  readTime: '17 min',
  sections: [
    {
      type: 'text',
      content: `Standard lazy segment tree can't handle chmin/chmax (range "clamp") efficiently. Segment Tree Beats: each node stores max1 (largest), max2 (second largest), maxCnt (count of max elements). For chmin(l, r, v): if v >= max1, skip (nothing changes). If max2 < v < max1, apply: subtract the excess from max1 elements. If v <= max2, recurse into children. The "beats" condition: operation applies only if it strictly improves — preventing O(n) worst case per operation.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Segment Tree Beats for range chmin',
      code: `class SegTreeBeats {
    constructor(arr) {
        const n = arr.length;
        this.n = n;
        this.max1 = new Array(4 * n).fill(-Infinity);
        this.max2 = new Array(4 * n).fill(-Infinity);
        this.maxCnt = new Array(4 * n).fill(0);
        this.sum = new Array(4 * n).fill(0);
        this.lazyMax = new Array(4 * n).fill(Infinity); // pending chmin
        this.build(arr, 1, 0, n - 1);
    }

    pushUp(t) {
        this.sum[t] = this.sum[2*t] + this.sum[2*t+1];
        if (this.max1[2*t] === this.max1[2*t+1]) {
            this.max1[t] = this.max1[2*t];
            this.maxCnt[t] = this.maxCnt[2*t] + this.maxCnt[2*t+1];
            this.max2[t] = Math.max(this.max2[2*t], this.max2[2*t+1]);
        } else if (this.max1[2*t] > this.max1[2*t+1]) {
            this.max1[t] = this.max1[2*t];
            this.maxCnt[t] = this.maxCnt[2*t];
            this.max2[t] = Math.max(this.max2[2*t], this.max1[2*t+1]);
        } else {
            this.max1[t] = this.max1[2*t+1];
            this.maxCnt[t] = this.maxCnt[2*t+1];
            this.max2[t] = Math.max(this.max1[2*t], this.max2[2*t+1]);
        }
    }

    applyMax(t, v) { // apply chmin(v): set max to min(max, v)
        if (v >= this.max1[t]) return;
        this.sum[t] -= (this.max1[t] - v) * this.maxCnt[t];
        this.max1[t] = v;
        this.lazyMax[t] = v;
    }

    pushDown(t) {
        if (this.lazyMax[t] < Infinity) {
            this.applyMax(2*t, this.lazyMax[t]);
            this.applyMax(2*t+1, this.lazyMax[t]);
            this.lazyMax[t] = Infinity;
        }
    }

    chmin(l, r, v, t = 1, tl = 0, tr = this.n - 1) {
        if (l > tr || r < tl || v >= this.max1[t]) return;
        if (l <= tl && tr <= r && v > this.max2[t]) { this.applyMax(t, v); return; }
        this.pushDown(t);
        const mid = (tl + tr) >> 1;
        this.chmin(l, r, v, 2*t, tl, mid);
        this.chmin(l, r, v, 2*t+1, mid+1, tr);
        this.pushUp(t);
    }

    query(l, r, t = 1, tl = 0, tr = this.n - 1) {
        if (l > tr || r < tl) return 0;
        if (l <= tl && tr <= r) return this.sum[t];
        this.pushDown(t);
        const mid = (tl + tr) >> 1;
        return this.query(l, r, 2*t, tl, mid) + this.query(l, r, 2*t+1, mid+1, tr);
    }
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
      title: 'Range Chmin/Chmax Sum Query',
      url: 'https://leetcode.com/problems/falling-squares/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Coordinate compression + segment tree',
          explanation: `Each falling square occupies a range [left, left+side-1]. Query: max height after dropping. Use coordinate-compressed segment tree with range max update and point/range max query.`,
          code: `var fallingSquares = function(positions) {
    // Compress coordinates
    const coords=[...new Set(positions.flatMap(([l,s])=>[l,l+s]))].sort((a,b)=>a-b);
    const rank=new Map(coords.map((v,i)=>[v,i]));
    const n=coords.length;
    const seg=new Array(4*n).fill(0), lazy=new Array(4*n).fill(0);
    const push=(t)=>{if(lazy[t]){seg[2*t]=seg[2*t+1]=lazy[2*t]=lazy[2*t+1]=Math.max(seg[2*t],lazy[t]);lazy[t]=0;}};
    const upd=(l,r,v,t=1,tl=0,tr=n-1)=>{
        if(l>tr||r<tl) return;
        if(l<=tl&&tr<=r){seg[t]=lazy[t]=Math.max(seg[t],v);return;}
        push(t); const m=(tl+tr)>>1;
        upd(l,r,v,2*t,tl,m);upd(l,r,v,2*t+1,m+1,tr);
        seg[t]=Math.max(seg[2*t],seg[2*t+1]);
    };
    const qry=(l,r,t=1,tl=0,tr=n-1)=>{
        if(l>tr||r<tl) return 0;
        if(l<=tl&&tr<=r) return seg[t];
        push(t); const m=(tl+tr)>>1;
        return Math.max(qry(l,r,2*t,tl,m),qry(l,r,2*t+1,m+1,tr));
    };
    const res=[];
    for(const[l,s] of positions){
        const[rl,rr]=[rank.get(l),rank.get(l+s)-1];
        const h=qry(rl,rr)+s;
        upd(rl,rr,h);
        res.push(seg[1]);
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
      title: 'The Number of Weak Characters in the Game',
      url: 'https://leetcode.com/problems/the-number-of-weak-characters-in-the-game/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Sort by attack desc, track max defense seen',
          explanation: `Sort by attack descending (ties: defense ascending). For each character, if its defense < max defense seen so far: it's weak (some character has strictly greater attack AND strictly greater defense). Track max defense from left, count weak.`,
          code: `var numberOfWeakCharacters = function(properties) {
    properties.sort((a,b)=>b[0]-a[0]||a[1]-b[1]);
    let maxDef=0, count=0;
    for(const[,def] of properties){
        if(def<maxDef) count++;
        maxDef=Math.max(maxDef,def);
    }
    return count;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '💥',
      color: 'red',
      content: `**Segment Tree Beats key invariant:**\nEach node stores: max1 (max value), max2 (strict 2nd max), maxCnt (count of max elements).\n\n**chmin(v) rule:**\n- v >= max1: no change, skip\n- max2 < v < max1: apply to this node (only max elements change)\n- v <= max2: recurse into children\n\n**Amortized analysis:** Each "break" (where we recurse past the check) eliminates a potential (reduces the number of distinct maximums). Total breaks = O(n log²n).\n\n**Operations supported:**\n- Range chmin: assign min(arr[i], v) for i in [l,r]\n- Range chmax: symmetric\n- Range sum query\n- Range max/min query`,
    },
  ],
}
