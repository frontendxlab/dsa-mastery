import type { Article } from '../articles'

export const ahoCorasickArticle: Article = {
  slug: 'aho-corasick',
  title: 'Aho-Corasick Automaton',
  emoji: '🤖',
  tagline: 'Multi-pattern string matching in O(n + m + k). KMP generalized to many patterns.',
  description: 'Aho-Corasick is a trie augmented with failure links and output links, enabling simultaneous search for all patterns in a text in O(n + m + k) where n is text length, m is total pattern length, and k is total matches. It generalizes KMP to multiple patterns. Used in intrusion detection, DNA matching, and word filter problems.',
  gradient: 'from-red-600 to-orange-600',
  topicSlug: 'dp',
  readTime: '16 min',
  sections: [
    {
      type: 'text',
      content: `Aho-Corasick works in two phases. Build phase: (1) Insert all patterns into a trie, (2) Compute failure links via BFS — fail[node] = longest proper suffix of the string at node that is also a prefix of some pattern. Search phase: process text character by character, following trie edges or failure links. Each state maintains output links to collect all patterns ending at this position.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Aho-Corasick automaton',
      code: `class AhoCorasick {
    constructor() {
        this.next = [new Array(26).fill(0)]; // node 0 = root
        this.fail = [0];
        this.output = [[]]; // patterns ending at this node
        this.nodeCount = 1;
    }

    insert(pattern, id) {
        let node = 0;
        for (const ch of pattern) {
            const c = ch.charCodeAt(0) - 97;
            if (!this.next[node][c]) {
                this.next.push(new Array(26).fill(0));
                this.fail.push(0);
                this.output.push([]);
                this.next[node][c] = this.nodeCount++;
            }
            node = this.next[node][c];
        }
        this.output[node].push(id);
    }

    build() {
        const queue = [];
        for (let c = 0; c < 26; c++) {
            if (this.next[0][c]) queue.push(this.next[0][c]);
            // Root's children with no edge loop back to root (already 0)
        }
        let i = 0;
        while (i < queue.length) {
            const u = queue[i++];
            this.output[u] = [...this.output[u], ...this.output[this.fail[u]]]; // inherit outputs
            for (let c = 0; c < 26; c++) {
                if (this.next[u][c]) {
                    this.fail[this.next[u][c]] = this.next[this.fail[u]][c];
                    queue.push(this.next[u][c]);
                } else {
                    this.next[u][c] = this.next[this.fail[u]][c]; // shortcut
                }
            }
        }
    }

    search(text) {
        const results = []; // [{pos, patternId}]
        let node = 0;
        for (let i = 0; i < text.length; i++) {
            const c = text.charCodeAt(i) - 97;
            node = this.next[node][c];
            for (const id of this.output[node]) results.push({pos: i, id});
        }
        return results;
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
      title: 'Multi Pattern Search (word filter)',
      url: 'https://leetcode.com/problems/word-filter/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Hash map of (prefix, suffix) pairs',
          explanation: `Precompute all valid (prefix, suffix) pairs for each word. Store max weight. Query in O(1).`,
          code: `class WordFilter {
    constructor(words) {
        this.map=new Map();
        for(let w=0;w<words.length;w++){
            const word=words[w];
            for(let i=0;i<=word.length;i++)
                for(let j=0;j<=word.length;j++){
                    const key=word.slice(0,i)+'#'+word.slice(j);
                    this.map.set(key,w);
                }
        }
    }
    f(pref,suff){ return this.map.get(pref+'#'+suff)??-1; }
}`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Find All Words in Board (Word Search II)',
      url: 'https://leetcode.com/problems/word-search-ii/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Trie + DFS backtracking',
          explanation: `Build a trie of all words. DFS from each cell: follow trie edges. When we reach an end-of-word node, add to results and mark that branch to avoid re-collecting. Prune trie branches when a subtree has all words found.`,
          code: `var findWords = function(board, words) {
    const trie={};
    for(const w of words){
        let node=trie;
        for(const c of w) node=node[c]||(node[c]={});
        node['$']=w;
    }
    const m=board.length,n=board[0].length,res=[];
    const dfs=(r,c,node)=>{
        if(r<0||r>=m||c<0||c>=n||board[r][c]==='#') return;
        const ch=board[r][c];
        if(!node[ch]) return;
        node=node[ch];
        if(node['$']){res.push(node['$']);delete node['$'];}
        board[r][c]='#';
        dfs(r+1,c,node);dfs(r-1,c,node);dfs(r,c+1,node);dfs(r,c-1,node);
        board[r][c]=ch;
    };
    for(let r=0;r<m;r++) for(let c=0;c<n;c++) dfs(r,c,trie);
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Stream of Characters',
      url: 'https://leetcode.com/problems/stream-of-characters/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Aho-Corasick — stream matching with failure links',
          explanation: `Build AC automaton from all words. For each new character in stream, advance the automaton state. If any output at current state, return true. The failure links ensure we check all pattern suffixes efficiently.`,
          code: `class StreamChecker {
    constructor(words) {
        // Simplified: use trie with reversed words + maintain suffixes
        this.trie={}; this.stream='';
        for(const w of words){
            let node=this.trie;
            for(const c of w.split('').reverse()){
                node=node[c]||(node[c]={});
            }
            node['$']=true;
        }
    }
    query(letter) {
        this.stream+=letter;
        let node=this.trie;
        // Check if any suffix of stream matches a word (reversed)
        for(let i=this.stream.length-1;i>=0;i--){
            const c=this.stream[i];
            if(!node[c]) return false;
            node=node[c];
            if(node['$']) return true;
        }
        return false;
    }
}`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Palindrome Pairs',
      url: 'https://leetcode.com/problems/palindrome-pairs/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: HashMap with palindrome suffix/prefix check',
          explanation: `For each word pair (i, j) where words[i]+words[j] forms a palindrome: either (A) reverse(words[j]) = prefix of words[i] and words[i][len(j)..] is palindrome, or (B) reverse(words[i]) = suffix of words[j] and words[j][..len(i)] is palindrome. Use a hashmap of reversed words.`,
          code: `var palindromePairs = function(words) {
    const revMap=new Map(words.map((w,i)=>[w.split('').reverse().join(''),i]));
    const isPalin=(s,l,r)=>{while(l<r) if(s[l++]!==s[r--]) return false; return true;};
    const res=[];
    for(let i=0;i<words.length;i++){
        const w=words[i];
        for(let k=0;k<=w.length;k++){
            // Case 1: words[i][0..k-1] + reverse is in map, words[i][k..] is palindrome
            if(isPalin(w,k,w.length-1)){
                const j=revMap.get(w.slice(0,k));
                if(j!==undefined&&j!==i) res.push([j,i]);
            }
            // Case 2: reverse of words[i][k..] is in map, words[i][0..k-1] is palindrome
            if(k>0&&isPalin(w,0,k-1)){
                const j=revMap.get(w.slice(k));
                if(j!==undefined&&j!==i) res.push([i,j]);
            }
        }
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🤖',
      color: 'red',
      content: `**Aho-Corasick vs alternatives:**\n- KMP: single pattern, O(n + m)\n- Rabin-Karp: multiple patterns, O(n + m) average with hashing\n- Aho-Corasick: multiple patterns, O(n + Σm + k) guaranteed\n\n**Failure link construction:** BFS level by level. For node u with parent p via character c: fail[u] = next[fail[p]][c] (follow parent's fail then same character).\n\n**Output propagation:** output[u] = patterns ending exactly at u PLUS output[fail[u]] (patterns that are proper suffixes of current string).\n\n**Applications:** spam/virus detection, DNA sequence matching, word censoring, competitive programming dictionary matching problems.`,
    },
  ],
}
