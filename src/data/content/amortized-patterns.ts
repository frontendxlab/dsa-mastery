import type { Article } from '../articles'

export const amortizedPatternsArticle: Article = {
  slug: 'amortized-patterns',
  title: 'Amortized O(1) Patterns',
  emoji: '⚡',
  tagline: 'O(1) average via "charge" analysis. Two stacks, stack with min, queue from stacks.',
  description: 'Amortized analysis proves that a sequence of n operations costs O(n) total even if individual operations can be expensive. Key patterns: (1) stack with min/max in O(1) using an auxiliary stack; (2) queue from two stacks with O(1) amortized dequeue; (3) lazy deletion (mark deleted, clean on access); (4) Union-Find path compression; (5) sliding window with deque. Each element is processed O(1) times total.',
  gradient: 'from-yellow-700 to-orange-700',
  topicSlug: 'dp',
  readTime: '13 min',
  sections: [
    {
      type: 'text',
      content: `Amortized O(1): even though a single operation may be expensive, we "charge" the cost to cheaper previous operations. Example: queue from two stacks — dequeue from "out" stack; if empty, pour all from "in" into "out" (O(n)). But each element crosses from "in" to "out" exactly once, so total over n operations = O(n), amortized O(1). Union-Find: each path compression does O(log n) work, but "charges" nodes on the path, each charged only O(log n) times total.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Amortized data structure patterns',
      code: `// Stack with O(1) min/max
class MinStack {
    constructor() { this.stack = []; this.minStack = []; }
    push(v) {
        this.stack.push(v);
        this.minStack.push(Math.min(v, this.minStack.length ? this.minStack.at(-1) : v));
    }
    pop() { this.stack.pop(); this.minStack.pop(); }
    top() { return this.stack.at(-1); }
    getMin() { return this.minStack.at(-1); }
}

// Queue from two stacks — O(1) amortized enqueue and dequeue
class TwoStackQueue {
    constructor() { this.inStack = []; this.outStack = []; }
    push(v) { this.inStack.push(v); }
    pop() {
        if (!this.outStack.length) {
            while (this.inStack.length) this.outStack.push(this.inStack.pop());
        }
        return this.outStack.pop();
    }
    peek() {
        if (!this.outStack.length) {
            while (this.inStack.length) this.outStack.push(this.inStack.pop());
        }
        return this.outStack.at(-1);
    }
}

// Lazy deletion: mark items as deleted, skip on access
// Use when removing from middle of a priority queue
class LazyHeap {
    constructor() { this.heap = []; this.deleted = new Map(); }
    push(v) { /* add to heap */ }
    delete(v) { this.deleted.set(v, (this.deleted.get(v) || 0) + 1); }
    top() {
        // Skip deleted elements
        while (this.heap.length && this.deleted.get(this.heap[0])) {
            this.deleted.set(this.heap[0], this.deleted.get(this.heap[0]) - 1);
            this.heap.shift(); // pop from heap
        }
        return this.heap[0];
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
      title: 'Min Stack',
      url: 'https://leetcode.com/problems/min-stack/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Auxiliary min-stack tracking current minimum',
          explanation: `Maintain two stacks: main stack and minStack. minStack[i] = minimum of main stack at height i. Push: push to both, minStack gets min(val, minStack.top). Pop: pop both. GetMin: minStack.top.`,
          code: `class MinStack {
    constructor() { this.s=[]; this.m=[]; }
    push(v) { this.s.push(v); this.m.push(Math.min(v,this.m.length?this.m.at(-1):v)); }
    pop() { this.s.pop(); this.m.pop(); }
    top() { return this.s.at(-1); }
    getMin() { return this.m.at(-1); }
}`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Implement Queue using Stacks',
      url: 'https://leetcode.com/problems/implement-queue-using-stacks/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Two stacks — pour from in to out lazily',
          explanation: `Push to "in" stack. Pop/peek from "out" stack; if empty, pour all from "in" (reversing order). Each element moves from in to out at most once → O(1) amortized.`,
          code: `class MyQueue {
    constructor() { this.in=[]; this.out=[]; }
    push(v) { this.in.push(v); }
    _pour() { if(!this.out.length) while(this.in.length) this.out.push(this.in.pop()); }
    pop() { this._pour(); return this.out.pop(); }
    peek() { this._pour(); return this.out.at(-1); }
    empty() { return !this.in.length&&!this.out.length; }
}`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'LRU Cache',
      url: 'https://leetcode.com/problems/lru-cache/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: HashMap + doubly linked list',
          explanation: `HashMap for O(1) lookup. Doubly linked list for O(1) move-to-front and remove-last. Most recently used at head, least recently at tail. On get/put: move to head. On eviction: remove tail.`,
          code: `class LRUCache {
    constructor(capacity) {
        this.cap=capacity; this.map=new Map();
        this.head={key:0,val:0,prev:null,next:null};
        this.tail={key:0,val:0,prev:null,next:null};
        this.head.next=this.tail; this.tail.prev=this.head;
    }
    _remove(node) { node.prev.next=node.next; node.next.prev=node.prev; }
    _addFront(node) { node.next=this.head.next; node.prev=this.head; this.head.next.prev=node; this.head.next=node; }
    get(key) {
        if(!this.map.has(key)) return -1;
        const node=this.map.get(key); this._remove(node); this._addFront(node);
        return node.val;
    }
    put(key,val) {
        if(this.map.has(key)){const n=this.map.get(key);n.val=val;this._remove(n);this._addFront(n);return;}
        if(this.map.size===this.cap){const lru=this.tail.prev;this._remove(lru);this.map.delete(lru.key);}
        const node={key,val,prev:null,next:null};
        this.map.set(key,node); this._addFront(node);
    }
}`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Find Median from Data Stream (revisited — lazy deletion)',
      url: 'https://leetcode.com/problems/sliding-window-median/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Two heaps with lazy deletion',
          explanation: `Maintain two heaps (max-heap for lower half, min-heap for upper half). When removing an element, mark it as "deleted" and skip when it reaches the top. Adjust size balance lazily. O(log n) amortized since each element is inserted and deleted at most once.`,
          code: `var medianSlidingWindow = function(nums, k) {
    // Simplified: use sorted array (O(k) per window position = O(nk) total)
    const window=[...nums.slice(0,k)].sort((a,b)=>a-b);
    const med=()=>k%2?window[k>>1]:(window[k/2-1]+window[k/2])/2;
    const res=[med()];
    for(let i=k;i<nums.length;i++){
        window.splice(window.indexOf(nums[i-k]),1);
        let lo=0,hi=window.length;
        while(lo<hi){const mid=(lo+hi)>>1;window[mid]<nums[i]?lo=mid+1:hi=mid;}
        window.splice(lo,0,nums[i]);
        res.push(med());
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '⚡',
      color: 'amber',
      content: `**Amortized analysis methods:**\n- Aggregate: total cost / n operations = amortized cost\n- Accounting: assign "credits" to cheap ops, spend on expensive ops\n- Potential method: Φ = potential energy of state; amortized cost = actual + ΔΦ\n\n**Key patterns:**\n- Two-stack queue: each element enqueued/dequeued once → O(1) amortized\n- Stack min: each element pushed/popped from minStack once → O(1) amortized\n- Union-Find path compression: O(α(n)) amortized per operation\n- Fenwick tree update: O(log n), but aggregate query is O(n)\n\n**Lazy deletion:** When removing from middle of heap is O(n), mark deleted and skip on top access. Total work = O(n log n) for n deletions.`,
    },
  ],
}
