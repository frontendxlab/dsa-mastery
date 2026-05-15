import type { Article } from '../articles'

export const designPatternsArticle: Article = {
  slug: 'design-patterns',
  title: 'Design Data Structures',
  emoji: '🏗️',
  tagline: 'LRU, LFU, iterators — combine primitives for O(1) every operation.',
  description: 'Design problems ask you to implement a data structure with specific O(1) or O(log n) operations. The pattern: identify which primitive structures (HashMap, DLL, heap, set) give you each operation you need, then combine them. LRU, LFU, Randomized Set, Twitter, and Iterator patterns all follow this blueprint.',
  gradient: 'from-slate-500 to-gray-600',
  topicSlug: 'miscellaneous',
  readTime: '20 min',
  sections: [
    {
      type: 'text',
      content: `Design problems have a consistent pattern: you need multiple O(1) operations that no single structure supports alone. The solution is always to combine structures, each handling what the others can't. HashMap gives O(1) lookup. Doubly linked list gives O(1) insert/delete at any position. Array gives O(1) random access. Know what each primitive does in O(1) and you can compose anything.`,
    },
    {
      type: 'table',
      headers: ['Need O(1)...', 'Use', 'Why'],
      rows: [
        ['Lookup by key', 'HashMap', 'O(1) average access by key'],
        ['Insert/delete anywhere', 'Doubly Linked List', 'O(1) with pointer to node'],
        ['Random access by index', 'Array', 'O(1) index access'],
        ['Min/max of sliding window', 'Monotonic Deque', 'Front always = current extreme'],
        ['Min/max with insertions', 'Heap', 'O(log n) insert, O(1) peek'],
        ['Delete arbitrary + random', 'Array + HashMap', 'Swap-with-last trick for delete'],
        ['Order by recency', 'DLL + HashMap (LRU)', 'Move-to-front in O(1) via pointers'],
        ['Order by frequency+recency', 'Multi-DLL + 2 HashMaps (LFU)', 'Per-freq buckets'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'LRU Cache — HashMap + DLL',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'LRU Cache — O(1) get and put',
      code: `// Doubly linked list + HashMap
// Head (dummy) = Most Recently Used end
// Tail (dummy) = Least Recently Used end
class Node { constructor(k,v){this.key=k;this.val=v;this.prev=this.next=null;} }
class LRUCache {
    constructor(cap) {
        this.cap=cap; this.map=new Map();
        this.head=new Node(0,0); this.tail=new Node(0,0);
        this.head.next=this.tail; this.tail.prev=this.head;
    }
    _remove(n){n.prev.next=n.next;n.next.prev=n.prev;}
    _addFront(n){n.next=this.head.next;n.prev=this.head;this.head.next.prev=n;this.head.next=n;}
    get(k){
        if(!this.map.has(k)) return -1;
        const n=this.map.get(k);
        this._remove(n); this._addFront(n);
        return n.val;
    }
    put(k,v){
        if(this.map.has(k)){const n=this.map.get(k);n.val=v;this._remove(n);this._addFront(n);return;}
        const n=new Node(k,v); this.map.set(k,n); this._addFront(n);
        if(this.map.size>this.cap){const lru=this.tail.prev;this._remove(lru);this.map.delete(lru.key);}
    }
}`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'LFU Cache — Frequency Buckets',
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'blue',
      content: `**LFU structure**: Three maps:\n1. **keyMap**: key → {val, freq} — for O(1) value+frequency lookup\n2. **freqMap**: freq → DoublyLinkedList of keys at that frequency (MRU order)\n3. **minFreq**: track the minimum frequency currently in the cache\n\nOn access: increment freq, move key from freqMap[old] to freqMap[new]. On evict: evict LRU from freqMap[minFreq] (tail of that list).`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'LFU Cache — O(1) all operations',
      code: `class LFUCache {
    constructor(cap) {
        this.cap=cap; this.minFreq=0; this.size=0;
        this.keyMap=new Map();    // key → {val, freq}
        this.freqMap=new Map();   // freq → Set of keys (insertion-ordered)
    }
    _increment(key) {
        const {val,freq}=this.keyMap.get(key);
        this.freqMap.get(freq).delete(key);
        if(this.freqMap.get(freq).size===0){
            this.freqMap.delete(freq);
            if(this.minFreq===freq) this.minFreq++;
        }
        const newFreq=freq+1;
        if(!this.freqMap.has(newFreq)) this.freqMap.set(newFreq,new Set());
        this.freqMap.get(newFreq).add(key);
        this.keyMap.set(key,{val,freq:newFreq});
    }
    get(key) {
        if(!this.keyMap.has(key)) return -1;
        this._increment(key);
        return this.keyMap.get(key).val;
    }
    put(key,val) {
        if(this.cap===0) return;
        if(this.keyMap.has(key)){this.keyMap.get(key).val=val;this._increment(key);return;}
        if(this.size===this.cap){
            // Evict LRU from minFreq bucket
            const evictSet=this.freqMap.get(this.minFreq);
            const evictKey=evictSet.keys().next().value;
            evictSet.delete(evictKey); if(evictSet.size===0) this.freqMap.delete(this.minFreq);
            this.keyMap.delete(evictKey); this.size--;
        }
        this.keyMap.set(key,{val,freq:1});
        if(!this.freqMap.has(1)) this.freqMap.set(1,new Set());
        this.freqMap.get(1).add(key);
        this.minFreq=1; this.size++;
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
      title: 'LRU Cache',
      url: 'https://leetcode.com/problems/lru-cache/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: HashMap + Doubly Linked List — all O(1)',
          explanation: `HashMap maps key→node for O(1) lookup. DLL maintains recency order — head=MRU, tail=LRU. get: move node to head. put: insert at head; if over capacity, remove tail. Both O(1) because DLL deletions require only pointer manipulation (no scan needed — we have the node directly from the HashMap).`,
          code: `// See the template above — full implementation`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: JS Map insertion order trick',
          explanation: `JavaScript Map maintains insertion order. Delete + re-insert = move to end (most recent). First key = oldest. This JS-specific trick gives O(1) amortized.`,
          code: `class LRUCache {
    constructor(cap) { this.cap=cap; this.map=new Map(); }
    get(k) {
        if(!this.map.has(k)) return -1;
        const v=this.map.get(k); this.map.delete(k); this.map.set(k,v);
        return v;
    }
    put(k,v) {
        if(this.map.has(k)) this.map.delete(k);
        this.map.set(k,v);
        if(this.map.size>this.cap) this.map.delete(this.map.keys().next().value);
    }
}`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'LFU Cache',
      url: 'https://leetcode.com/problems/lfu-cache/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Three-map structure — O(1) all ops',
          explanation: `See template above. Key insight: maintain minFreq so we know which bucket to evict from without scanning all frequencies. When a key's frequency increases, move it from freqMap[old] to freqMap[new]. If freqMap[old] becomes empty and old === minFreq, increment minFreq.`,
          code: `// See the LFU template above — full implementation`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'All O(1) Data Structure',
      url: 'https://leetcode.com/problems/all-oone-data-structure/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: DLL of buckets + HashMap of key→bucket',
          explanation: `Similar to LFU but for a dictionary. Each bucket holds a count and a set of keys at that count. DLL maintains buckets in sorted count order. HashMap maps key → bucket node for O(1) access. inc: move key to next bucket (count+1). dec: move key to prev bucket (count-1). getMax/getMin: head/tail of DLL.`,
          code: `class AllOne {
    constructor() {
        this.map = new Map();   // key → bucket node
        // DLL of buckets: {count, keys: Set}
        this.head = {count:0, keys:new Set()}; // dummy min sentinel
        this.tail = {count:0, keys:new Set()}; // dummy max sentinel
        this.head.next=this.tail; this.tail.prev=this.head;
    }
    _addAfter(node, count, key) {
        // Reuse existing next bucket if same count, else create new
        let bucket = node.next;
        if(bucket===this.tail || bucket.count!==count) {
            bucket={count,keys:new Set(),prev:node,next:node.next};
            node.next.prev=bucket; node.next=bucket;
        }
        bucket.keys.add(key);
        return bucket;
    }
    _removeBucket(bucket) {
        if(bucket.keys.size===0 && bucket!==this.head && bucket!==this.tail) {
            bucket.prev.next=bucket.next; bucket.next.prev=bucket.prev;
        }
    }
    inc(key) {
        if(!this.map.has(key)) {
            this.map.set(key, this._addAfter(this.head, 1, key));
        } else {
            const b=this.map.get(key);
            b.keys.delete(key);
            this.map.set(key, this._addAfter(b, b.count+1, key));
            this._removeBucket(b);
        }
    }
    dec(key) {
        const b=this.map.get(key); b.keys.delete(key);
        if(b.count===1) this.map.delete(key);
        else { this.map.set(key, this._addAfter(b.prev, b.count-1, key)); }
        this._removeBucket(b);
    }
    getMaxKey() { return this.tail.prev===this.head ? '' : [...this.tail.prev.keys][0]; }
    getMinKey() { return this.head.next===this.tail ? '' : [...this.head.next.keys][0]; }
}`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Design a Number Container System',
      url: 'https://leetcode.com/problems/design-a-number-container-system/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: HashMap for index→number + HashMap for number→sorted set of indices',
          explanation: `Two maps: indexMap (index→number) and numMap (number→sorted set of indices). change(index, number): update indexMap, remove old index from numMap[old number], add to numMap[new number]. find(number): return min of numMap[number] set (or -1 if empty).`,
          code: `class NumberContainers {
    constructor() { this.indexMap=new Map(); this.numMap=new Map(); }
    change(index, number) {
        if(this.indexMap.has(index)) {
            const old=this.indexMap.get(index);
            this.numMap.get(old).delete(index);
        }
        this.indexMap.set(index, number);
        if(!this.numMap.has(number)) this.numMap.set(number,new Set());
        this.numMap.get(number).add(index);
    }
    find(number) {
        if(!this.numMap.has(number)||!this.numMap.get(number).size) return -1;
        return Math.min(...this.numMap.get(number));
    }
}`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧠',
      color: 'teal',
      content: `**Design problem blueprint:**\n1. List all operations and their required complexity\n2. For each operation, identify what primitive gives O(1) or O(log n)\n3. Combine: usually HashMap for lookup + another structure for ordering\n4. Handle the edge cases: empty structure, single element, capacity exactly full\n\n**Common combinations:**\n- O(1) lookup + O(1) recency order → HashMap + DLL (LRU)\n- O(1) lookup + O(1) frequency order → HashMap + per-freq DLL (LFU)\n- O(1) insert/delete + O(1) random → Array + HashMap (swap-with-last)\n- O(1) min/max + O(1) insert → Heap (O(log n) insert but O(1) peek)`,
    },
  ],
}
