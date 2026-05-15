import type { Article } from '../articles'

export const trieXorArticle: Article = {
  slug: 'trie-xor',
  title: 'Bitwise Trie (XOR Trie)',
  emoji: '⊕',
  tagline: 'Binary trie on bit representation. Find max XOR pair in O(n log MAX).',
  description: 'A bitwise (XOR) trie stores integers bit by bit from MSB to LSB. For each number, insert its bits as a path from the root. To find the maximum XOR with a query value x: at each bit, try to take the opposite bit (maximizing XOR); if not available, take the same bit. O(n log MAX) total. Supports: max XOR pair, count integers with XOR ≤ k, online XOR queries.',
  gradient: 'from-blue-900 to-indigo-950',
  topicSlug: 'dp',
  readTime: '13 min',
  sections: [
    {
      type: 'text',
      content: `Bitwise trie: each node has two children (bit=0, bit=1). Insert number by following its bit representation from MSB. Query max XOR with x: at each level, prefer the bit opposite to x's bit at that position (to maximize XOR). If not available, take the same bit. Maintain count at each node for "how many numbers have this prefix" — enables range XOR queries.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'XOR trie with max query',
      code: `class XORTrie {
    constructor(maxBit = 29) {
        this.maxBit = maxBit;
        this.trie = [[0, 0]]; // [left(0), right(1)] children (node indices)
        this.cnt = [0]; // count of numbers in subtree
    }

    insert(x) {
        let node = 0;
        for (let b = this.maxBit; b >= 0; b--) {
            const bit = (x >> b) & 1;
            if (!this.trie[node][bit]) {
                this.trie.push([0, 0]);
                this.cnt.push(0);
                this.trie[node][bit] = this.trie.length - 1;
            }
            node = this.trie[node][bit];
            this.cnt[node]++;
        }
    }

    // Maximum XOR achievable with query x
    queryMax(x) {
        let node = 0, result = 0;
        for (let b = this.maxBit; b >= 0; b--) {
            const bit = (x >> b) & 1;
            const want = 1 - bit; // opposite bit maximizes XOR
            if (this.trie[node][want]) {
                result |= 1 << b;
                node = this.trie[node][want];
            } else {
                node = this.trie[node][bit];
            }
        }
        return result;
    }

    // Count numbers with XOR ≤ k (range query)
    countXorAtMost(x, k) {
        let node = 0, count = 0;
        for (let b = this.maxBit; b >= 0; b--) {
            const xb = (x >> b) & 1, kb = (k >> b) & 1;
            if (kb === 1) {
                // All paths with xb⊕bit = 0 have XOR < current prefix, all valid
                const same = this.trie[node][xb];
                if (same) count += this.cnt[same];
                if (!this.trie[node][1 - xb]) return count;
                node = this.trie[node][1 - xb];
            } else {
                if (!this.trie[node][xb]) return count;
                node = this.trie[node][xb];
            }
        }
        return count + this.cnt[node];
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
      title: 'Maximum XOR of Two Numbers in an Array',
      url: 'https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Bitwise trie — insert all, query max for each',
          explanation: `Insert all numbers into XOR trie. For each number, query the max XOR achievable. Answer = max over all queries.`,
          code: `var findMaximumXOR = function(nums) {
    const trie=[[0,0]], cnt=[0];
    const insert=(x)=>{
        let n=0;
        for(let b=31;b>=0;b--){
            const bit=(x>>b)&1;
            if(!trie[n][bit]){trie.push([0,0]);cnt.push(0);trie[n][bit]=trie.length-1;}
            n=trie[n][bit]; cnt[n]++;
        }
    };
    const query=(x)=>{
        let n=0,res=0;
        for(let b=31;b>=0;b--){
            const bit=(x>>b)&1,want=1-bit;
            if(trie[n][want]){res|=1<<b;n=trie[n][want];}
            else if(trie[n][bit]) n=trie[n][bit];
            else break;
        }
        return res;
    };
    for(const x of nums) insert(x);
    return Math.max(...nums.map(query));
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Maximum XOR of Two Numbers in a Subarray',
      url: 'https://leetcode.com/problems/maximum-xor-in-an-array-after-operations/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: XOR is monotone — max XOR only increases',
          explanation: `Each operation can only OR bits in — never clear bits. The maximum XOR of any pair can only increase. After all operations: max XOR = max over all pairs in the final array. Use XOR trie or sort by prefix bits.`,
          code: `var maximumXOR = function(nums) {
    // After operations, arr[i] can OR with any value
    // OR is superset of original, so max XOR of any pair in final array
    // = find pair with max XOR in original array (greedy bit by bit)
    let ans=0;
    for(let bit=31;bit>=0;ans|=1<<bit,bit--){
        const prefix=new Set(nums.map(x=>x>>(bit+1)));
        // Check if any two prefixes XOR to give 1 at this bit with ans at higher bits
        // Simple: just OR all prefix XOR possibilities
    }
    // Simpler: trie approach
    const trie=[[0,0]];
    const ins=(x)=>{let n=0;for(let b=31;b>=0;b--){const bit=(x>>b)&1;if(!trie[n][bit]){trie.push([0,0]);trie[n][bit]=trie.length-1;}n=trie[n][bit];}};
    const qry=(x)=>{let n=0,r=0;for(let b=31;b>=0;b--){const bit=(x>>b)&1,w=1-bit;trie[n][w]?(r|=1<<b,n=trie[n][w]):n=trie[n][bit]||n;}return r;};
    for(const x of nums) ins(x);
    return Math.max(...nums.map(qry));
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Count Pairs With XOR in a Range',
      url: 'https://leetcode.com/problems/count-pairs-with-xor-in-a-range/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Trie with count — query XOR ≤ high minus XOR ≤ low-1',
          explanation: `For each number x, count previous numbers y with low ≤ x^y ≤ high = count(x^y ≤ high) - count(x^y ≤ low-1). Use XOR trie with counts at nodes to answer "how many inserted numbers have XOR with x ≤ k."`,
          code: `var countPairs = function(nums, low, high) {
    const trie=[[0,0]], cnt=[0];
    const ins=(x)=>{let n=0;for(let b=14;b>=0;b--){const bit=(x>>b)&1;if(!trie[n][bit]){trie.push([0,0]);cnt.push(0);trie[n][bit]=trie.length-1;}n=trie[n][bit];cnt[n]++;}};
    const qry=(x,k)=>{
        let n=0,c=0;
        for(let b=14;b>=0;b--){
            const xb=(x>>b)&1,kb=(k>>b)&1;
            if(kb){const s=trie[n][xb];if(s) c+=cnt[s];const nxt=trie[n][1-xb];if(!nxt) return c;n=nxt;}
            else{const nxt=trie[n][xb];if(!nxt) return c;n=nxt;}
        }
        return c+cnt[n];
    };
    let res=0;
    for(const x of nums){
        res+=qry(x,high)-qry(x,low-1);
        ins(x);
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '⊕',
      color: 'blue',
      content: `**Bitwise trie vs XOR basis:**\n- XOR basis: max XOR of any subset → O(30n), doesn't store individual numbers\n- Bitwise trie: max XOR with one specific number, range XOR queries → O(30) per query\n\n**Key queries:**\n- Max XOR with x: greedily take opposite bit at each level\n- Count XOR ≤ k: bit by bit, when k-bit=1, count all paths with XOR-bit=0 (those are smaller), then follow XOR-bit=1 path\n- k-th smallest XOR: similar to count but find threshold\n\n**Persistent XOR trie:** Store one version per prefix → answer "max XOR in subarray [l,r]" in O(30).`,
    },
  ],
}
