import type { Article } from '../articles'

export const suffixAutomatonArticle: Article = {
  slug: 'suffix-automaton',
  title: 'Suffix Automaton (SAM)',
  emoji: '🤖',
  tagline: 'Compact structure for all substrings. O(n) build. All substring queries in O(n).',
  description: 'A Suffix Automaton (SAM) is the smallest DFA that accepts all suffixes of a string. It represents all 2^n substrings using O(n) states. Build in O(n) online. Applications: count distinct substrings, find all occurrences of a pattern, longest common substring of two strings, and any query about substrings that would otherwise require O(n²) space (like suffix arrays).',
  gradient: 'from-violet-800 to-purple-900',
  topicSlug: 'dp',
  readTime: '18 min',
  sections: [
    {
      type: 'text',
      content: `A SAM state represents an equivalence class of substrings that all end at the same set of positions in the original string. The link tree (suffix links) forms a tree where each state's link points to the longest proper suffix of any string in that state's class. Build online: for each new character, create a new state, extend links, and handle possible cloning when a state needs to be split.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Suffix Automaton construction',
      code: `class SAM {
    constructor() {
        this.states = [{len: 0, link: -1, next: {}}]; // state 0 = initial
        this.last = 0;
        this.size = 1;
    }

    extend(c) {
        const cur = this.size++;
        this.states.push({len: this.states[this.last].len + 1, link: -1, next: {}});
        let p = this.last;
        while (p !== -1 && !this.states[p].next[c]) {
            this.states[p].next[c] = cur;
            p = this.states[p].link;
        }
        if (p === -1) {
            this.states[cur].link = 0;
        } else {
            const q = this.states[p].next[c];
            if (this.states[p].len + 1 === this.states[q].len) {
                this.states[cur].link = q;
            } else {
                // Clone q
                const clone = this.size++;
                this.states.push({
                    len: this.states[p].len + 1,
                    link: this.states[q].link,
                    next: {...this.states[q].next}
                });
                while (p !== -1 && this.states[p].next[c] === q) {
                    this.states[p].next[c] = clone;
                    p = this.states[p].link;
                }
                this.states[q].link = this.states[cur].link = clone;
            }
        }
        this.last = cur;
    }

    build(s) { for (const c of s) this.extend(c); }

    // Count distinct substrings = sum of (len[v] - len[link[v]]) over all states
    countDistinct() {
        return this.states.slice(1).reduce((s, st) =>
            s + st.len - this.states[st.link].len, 0);
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
      title: 'Longest Common Substring of Two Strings',
      url: 'https://leetcode.com/problems/maximum-length-of-repeated-subarray/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: SAM of first string, match second string',
          explanation: `Build SAM of s1. Walk SAM with s2: maintain current state and current match length. On match: advance state, increment length. On mismatch: follow suffix links until match or reach root. Track max match length seen.`,
          code: `function longestCommonSubstring(s1, s2) {
    const sam = new SAM(); sam.build(s1);
    let cur = 0, len = 0, ans = 0;
    for (const c of s2) {
        while (cur !== 0 && !sam.states[cur].next[c]) {
            cur = sam.states[cur].link;
            len = sam.states[cur].len;
        }
        if (sam.states[cur].next[c]) {
            cur = sam.states[cur].next[c];
            len++;
        }
        ans = Math.max(ans, len);
    }
    return ans;
}`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Number of Distinct Substrings',
      url: 'https://leetcode.com/problems/number-of-distinct-substrings-in-a-string/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: SAM — sum of (len - link.len) over all states',
          explanation: `Each SAM state represents substrings of lengths (link.len+1) to state.len, all ending at the same set of positions. Count of distinct substrings = sum over all non-initial states of (len[v] - len[link[v]]).`,
          code: `var countDistinct = function(s) {
    // Build SAM
    const states=[{len:0,link:-1,next:{}}]; let last=0,size=1;
    const ext=(c)=>{
        const cur=size++; states.push({len:states[last].len+1,link:-1,next:{}});
        let p=last;
        while(p!==-1&&!states[p].next[c]){states[p].next[c]=cur;p=states[p].link;}
        if(p===-1) states[cur].link=0;
        else{
            const q=states[p].next[c];
            if(states[p].len+1===states[q].len) states[cur].link=q;
            else{
                const cl=size++; states.push({len:states[p].len+1,link:states[q].link,next:{...states[q].next}});
                while(p!==-1&&states[p].next[c]===q){states[p].next[c]=cl;p=states[p].link;}
                states[q].link=states[cur].link=cl;
            }
        }
        last=cur;
    };
    for(const c of s) ext(c);
    return states.slice(1).reduce((s,st)=>s+st.len-states[st.link].len,0);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Shortest Superstring',
      url: 'https://leetcode.com/problems/find-the-shortest-superstring/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Bitmask DP with overlap precomputation',
          explanation: `Precompute overlap[i][j] = max overlap where words[i] ends and words[j] starts. Then bitmask DP: dp[mask][i] = min superstring length when words in mask are used, ending with word i. O(n² × 2ⁿ).`,
          code: `var shortestSuperstring = function(words) {
    const n=words.length;
    // Precompute: how much of words[j] is covered by words[i]'s suffix
    const over=Array.from({length:n},()=>new Array(n).fill(0));
    for(let i=0;i<n;i++) for(let j=0;j<n;j++) if(i!==j){
        const maxK=Math.min(words[i].length,words[j].length);
        for(let k=maxK;k>=1;k--)
            if(words[i].endsWith(words[j].slice(0,k))){over[i][j]=k;break;}
    }
    const dp=Array.from({length:1<<n},()=>new Array(n).fill(Infinity));
    const par=Array.from({length:1<<n},()=>new Array(n).fill(-1));
    for(let i=0;i<n;i++) dp[1<<i][i]=words[i].length;
    for(let mask=1;mask<(1<<n);mask++)
        for(let i=0;i<n;i++) if((mask>>i)&1&&dp[mask][i]<Infinity)
            for(let j=0;j<n;j++) if(!((mask>>j)&1)){
                const newLen=dp[mask][i]+words[j].length-over[i][j];
                if(newLen<dp[mask|(1<<j)][j]){
                    dp[mask|(1<<j)][j]=newLen;
                    par[mask|(1<<j)][j]=i;
                }
            }
    const full=(1<<n)-1;
    let last=0;
    for(let i=1;i<n;i++) if(dp[full][i]<dp[full][last]) last=i;
    // Reconstruct
    let mask=full, res='';
    while(mask){
        const prev=par[mask][last];
        if(prev===-1){res=words[last]+res;}
        else{res=words[last].slice(over[prev][last])+res;}
        mask^=(1<<last); last=prev;
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
      color: 'blue',
      content: `**SAM key facts:**\n- At most 2n states, 3n transitions\n- Each state = set of substrings with identical endpos sets\n- Suffix link tree = crucial for counting and tree DP\n- Build online in O(n) time and space\n\n**Common SAM applications:**\n- Count distinct substrings: Σ(len[v] - len[link[v]])\n- LCS of two strings: run second string through SAM of first, track max match\n- Count occurrences of each substring: propagate size up suffix link tree\n- Lexicographically k-th substring: DFS on DAG structure\n\n**vs Suffix Array:** SA+LCP is more cache-friendly and often easier. SAM is better when you need to process characters online or need the DAG structure for traversal.`,
    },
  ],
}
