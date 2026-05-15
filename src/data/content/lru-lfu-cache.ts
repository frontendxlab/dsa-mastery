import type { Article } from '../articles'

export const lruLfuCacheArticle: Article = {
  slug: 'lru-lfu-cache',
  title: 'LRU & LFU Cache Design',
  emoji: '🗄️',
  tagline: 'O(1) get/put with HashMap + doubly linked list. LFU with frequency buckets.',
  description: 'LRU (Least Recently Used) cache evicts the least recently used item when full. Implementation: HashMap (O(1) lookup) + doubly linked list (O(1) move-to-front and evict-tail). LFU (Least Frequently Used) evicts the least frequently accessed item, with LRU as tiebreaker. Implementation: HashMap of key→(value, freq), HashMap of freq→doubly linked list, track minimum frequency.',
  gradient: 'from-slate-700 to-gray-800',
  topicSlug: 'dp',
  readTime: '15 min',
  sections: [
    {
      type: 'text',
      content: `LRU cache: doubly linked list with dummy head and tail. head.next = most recently used, tail.prev = least recently used. On get: remove node, insert after head. On put: if exists, update and move to front; if full, remove tail.prev; insert new at front. HashMap stores key→node for O(1) access. LFU: additionally maintain freq→DLL map and minFreq to know which frequency to evict from.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'LRU Cache with doubly linked list',
      code: `class LRUCache {
    constructor(capacity) {
        this.cap = capacity;
        this.map = new Map(); // key → node
        // Dummy head and tail
        this.head = {key: 0, val: 0, prev: null, next: null};
        this.tail = {key: 0, val: 0, prev: null, next: null};
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    _remove(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    _insertFront(node) {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next.prev = node;
        this.head.next = node;
    }

    get(key) {
        if (!this.map.has(key)) return -1;
        const node = this.map.get(key);
        this._remove(node);
        this._insertFront(node);
        return node.val;
    }

    put(key, value) {
        if (this.map.has(key)) this._remove(this.map.get(key));
        else if (this.map.size === this.cap) {
            const lru = this.tail.prev;
            this._remove(lru);
            this.map.delete(lru.key);
        }
        const node = {key, val: value, prev: null, next: null};
        this._insertFront(node);
        this.map.set(key, node);
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
          label: 'Intuition 1: HashMap + doubly linked list, dummy head/tail',
          explanation: `Map stores key→node for O(1) lookup. DLL maintains access order — front = most recent, back = least recent. On access: move to front. On evict: remove from back. Dummy sentinels simplify edge cases.`,
          code: `var LRUCache = function(capacity) {
    this.cap=capacity; this.map=new Map();
    this.H={v:0,p:null,n:null}; this.T={v:0,p:null,n:null};
    this.H.n=this.T; this.T.p=this.H;
};
LRUCache.prototype.get = function(key) {
    if(!this.map.has(key)) return -1;
    const nd=this.map.get(key);
    this._rm(nd); this._ins(nd);
    return nd.v;
};
LRUCache.prototype.put = function(key,value) {
    if(this.map.has(key)) this._rm(this.map.get(key));
    else if(this.map.size===this.cap){
        const lru=this.T.p; this._rm(lru); this.map.delete(lru.k);
    }
    const nd={k:key,v:value,p:null,n:null};
    this._ins(nd); this.map.set(key,nd);
};
LRUCache.prototype._rm = function(nd) {
    nd.p.n=nd.n; nd.n.p=nd.p;
};
LRUCache.prototype._ins = function(nd) {
    nd.n=this.H.n; nd.p=this.H; this.H.n.p=nd; this.H.n=nd;
};`,
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
          label: 'Intuition 1: Three maps — key→(val,freq), freq→DLL, track minFreq',
          explanation: `keyMap: key→{val, freq}. freqMap: freq→doubly linked list (most recent at front). minFreq: current minimum frequency. On get/put: increment freq, move from freqMap[old_freq] to freqMap[old_freq+1]. On evict: remove LRU from freqMap[minFreq]. minFreq=1 after new insertion.`,
          code: `var LFUCache = function(capacity) {
    this.cap=capacity; this.minFreq=0; this.size=0;
    this.keyMap=new Map(); // key→{val,freq}
    this.freqMap=new Map(); // freq→OrderedSet (Map insertion-order = LRU)
};
LFUCache.prototype._bump = function(key) {
    const {val,freq}=this.keyMap.get(key);
    this.freqMap.get(freq).delete(key);
    if(!this.freqMap.get(freq).size){
        this.freqMap.delete(freq);
        if(this.minFreq===freq) this.minFreq++;
    }
    const nf=freq+1;
    if(!this.freqMap.has(nf)) this.freqMap.set(nf,new Map());
    this.freqMap.get(nf).set(key,1);
    this.keyMap.set(key,{val,freq:nf});
};
LFUCache.prototype.get = function(key) {
    if(!this.keyMap.has(key)) return -1;
    this._bump(key);
    return this.keyMap.get(key).val;
};
LFUCache.prototype.put = function(key,value) {
    if(!this.cap) return;
    if(this.keyMap.has(key)){
        this._bump(key);
        this.keyMap.get(key).val=value;
    } else {
        if(this.size===this.cap){
            const lfu=this.freqMap.get(this.minFreq);
            const evict=lfu.keys().next().value;
            lfu.delete(evict); if(!lfu.size) this.freqMap.delete(this.minFreq);
            this.keyMap.delete(evict); this.size--;
        }
        this.keyMap.set(key,{val:value,freq:1});
        if(!this.freqMap.has(1)) this.freqMap.set(1,new Map());
        this.freqMap.get(1).set(key,1);
        this.minFreq=1; this.size++;
    }
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Design Twitter',
      url: 'https://leetcode.com/problems/design-twitter/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: HashMap of user→tweets, HashMap of user→followees, k-way merge for feed',
          explanation: `Store tweets per user as arrays (timestamp, tweetId). For getNewsFeed: collect recent tweets from self and all followees, merge and return top 10. Simple O(n) sort is fine given small constraints.`,
          code: `var Twitter = function() {
    this.tweets=new Map(); // userId→[[time,tid]]
    this.following=new Map(); // userId→Set
    this.time=0;
};
Twitter.prototype.postTweet = function(userId,tweetId) {
    if(!this.tweets.has(userId)) this.tweets.set(userId,[]);
    this.tweets.get(userId).push([this.time++,tweetId]);
};
Twitter.prototype.getNewsFeed = function(userId) {
    const users=new Set([userId,...(this.following.get(userId)||[])]);
    const all=[];
    for(const u of users) if(this.tweets.has(u)) all.push(...this.tweets.get(u));
    return all.sort((a,b)=>b[0]-a[0]).slice(0,10).map(t=>t[1]);
};
Twitter.prototype.follow = function(followerId,followeeId) {
    if(!this.following.has(followerId)) this.following.set(followerId,new Set());
    this.following.get(followerId).add(followeeId);
};
Twitter.prototype.unfollow = function(followerId,followeeId) {
    if(this.following.has(followerId)) this.following.get(followerId).delete(followeeId);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🗄️',
      color: 'gray',
      content: `**LRU design pattern:** HashMap for O(1) key access + DLL for O(1) insertion/deletion. Dummy head and tail eliminate null checks. Always insert at head, evict from tail.\n\n**LFU key insight:** JavaScript Map preserves insertion order — use Map as an ordered set (LRU within same frequency). freqMap[f] is a Map where iteration order = insertion order = LRU order.\n\n**minFreq tracking:** After put(new key), minFreq=1. After get/put(existing key), only increment minFreq if the old frequency's bucket is empty AND was minFreq.`,
    },
  ],
}
