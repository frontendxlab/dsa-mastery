import type { Article } from '../articles'

export const palindromeAutomatonArticle: Article = {
  slug: 'palindrome-automaton',
  title: 'Palindrome Automaton (Eertree)',
  emoji: '🌳',
  tagline: 'Build all distinct palindromic substrings in O(n). Count occurrences in O(n).',
  description: 'The palindrome automaton (Eertree) stores all distinct palindromic substrings of a string. It has at most n+2 nodes (one node per distinct palindrome, plus two root nodes). Builds incrementally in O(n) online. Each node represents a unique palindrome; suffix links connect to the longest proper palindromic suffix. Answers: count distinct palindromic substrings, count occurrences of each, solve string problems involving palindrome structure.',
  gradient: 'from-rose-800 to-pink-900',
  topicSlug: 'dp',
  readTime: '16 min',
  sections: [
    {
      type: 'text',
      content: `Eertree has two root nodes: "-1 root" (imaginary palindrome of length -1, parent of all odd palindromes) and "0 root" (empty palindrome of length 0, parent of all even palindromes). Each node stores: length of palindrome, suffix link (longest proper palindromic suffix), and children (by extending character). Build online: for each new character s[i], find the longest palindromic suffix of s[0..i] that can be extended to include s[i].`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Palindrome automaton (Eertree)',
      code: `class PalindromAutomaton {
    constructor() {
        // Node: {len, link, children, cnt}
        this.nodes = [
            {len: -1, link: 0, children: {}, cnt: 0}, // root -1
            {len: 0,  link: 0, children: {}, cnt: 0}  // root 0 (empty palindrome)
        ];
        this.last = 1; // last added palindrome's node index
        this.s = '#'; // padding to handle index -1
    }

    getLink(v) {
        // Traverse suffix links to find longest palindromic suffix that can be extended
        while (this.s[this.s.length - 1 - this.nodes[v].len - 1] !== this.s[this.s.length - 1]) {
            v = this.nodes[v].link;
        }
        return v;
    }

    extend(c) {
        this.s += c;
        let cur = this.getLink(this.last);
        if (!this.nodes[cur].children[c]) {
            const newNode = {len: this.nodes[cur].len + 2, children: {}, cnt: 1};
            const link = this.nodes[cur].len === -1 ? 1 : this.nodes[this.getLink(this.nodes[cur].link)].children[c];
            newNode.link = link || 1;
            this.nodes.push(newNode);
            this.nodes[cur].children[c] = this.nodes.length - 1;
        } else {
            this.nodes[this.nodes[cur].children[c]].cnt++;
        }
        this.last = this.nodes[cur].children[c];
        return this.last;
    }

    // Propagate counts from children to suffix links (total occurrences)
    build() {
        for (let i = this.nodes.length - 1; i >= 2; i--) {
            this.nodes[this.nodes[i].link].cnt += this.nodes[i].cnt;
        }
    }

    countDistinct() { return this.nodes.length - 2; }
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
      title: 'Count Distinct Palindromic Substrings',
      url: 'https://leetcode.com/problems/palindrome-partitioning-iv/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Precompute isPalin[i][j] then count valid splits',
          explanation: `For 3-part partition: check all pairs (i,j) if s[0..i], s[i+1..j], s[j+1..n-1] are all palindromes. Use DP to precompute isPalin[l][r].`,
          code: `var checkPartitioning = function(s) {
    const n=s.length;
    const isPalin=Array.from({length:n},()=>new Array(n).fill(false));
    for(let i=0;i<n;i++) isPalin[i][i]=true;
    for(let i=0;i<n-1;i++) isPalin[i][i+1]=(s[i]===s[i+1]);
    for(let len=3;len<=n;len++)
        for(let i=0;i+len-1<n;i++){
            const j=i+len-1;
            isPalin[i][j]=isPalin[i+1][j-1]&&s[i]===s[j];
        }
    for(let i=0;i<n-2;i++) for(let j=i+1;j<n-1;j++)
        if(isPalin[0][i]&&isPalin[i+1][j]&&isPalin[j+1][n-1]) return true;
    return false;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Maximum Number of Non-Overlapping Palindrome Substrings',
      url: 'https://leetcode.com/problems/maximum-number-of-non-overlapping-palindrome-substrings/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Greedy DP — pick earliest ending palindrome of length ≥ k',
          explanation: `dp[i] = max palindromes using first i characters. For each position j: find the leftmost l such that s[l..j] is a palindrome of length ≥ k. If found: dp[j+1] = max(dp[j], dp[l] + 1).`,
          code: `var maxPalindromes = function(s, k) {
    const n=s.length;
    const dp=new Array(n+1).fill(0);
    for(let i=0;i<n;i++) dp[i+1]=dp[i]; // skip this char
    // Check each center
    for(let c=0;c<n;c++){
        // Odd palindromes
        for(let r=0;2*r+1>=k;r++){
            const [l,ri]=[c-r,c+r];
            if(l<0||ri>=n||s[l]!==s[ri]) break;
            if(2*r+1>=k) dp[ri+1]=Math.max(dp[ri+1],dp[l]+1);
        }
        // Even palindromes
        for(let r=0;2*r+2>=k&&r+1<n;r++){
            const [l,ri]=[c-r,c+r+1];
            if(l<0||ri>=n||s[l]!==s[ri]) break;
            if(2*r+2>=k) dp[ri+1]=Math.max(dp[ri+1],dp[l]+1);
        }
    }
    return dp[n];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Palindrome Permutation II',
      url: 'https://leetcode.com/problems/palindrome-permutation-ii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Build half + odd middle, backtrack',
          explanation: `Count char frequencies. If >1 odd-frequency chars: impossible. Build half from chars with freq/2. Backtrack to generate all permutations of the half. Mirror each to get full palindrome.`,
          code: `var generatePalindromes = function(s) {
    const freq=new Map();
    for(const c of s) freq.set(c,(freq.get(c)||0)+1);
    let odd='', half='';
    for(const[c,cnt] of freq){
        if(cnt%2) {if(odd) return []; odd=c;}
        half+=c.repeat(Math.floor(cnt/2));
    }
    const halves=new Set();
    const chars=[...half];
    const bt=(path,used)=>{
        if(path.length===half.length){halves.add(path);return;}
        for(let i=0;i<chars.length;i++){
            if(used[i]||(i>0&&chars[i]===chars[i-1]&&!used[i-1])) continue;
            used[i]=true; bt(path+chars[i],used); used[i]=false;
        }
    };
    chars.sort(); bt('',new Array(chars.length).fill(false));
    return [...halves].map(h=>h+odd+h.split('').reverse().join(''));
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🌳',
      color: 'red',
      content: `**Eertree/Palindrome Automaton facts:**\n- At most n+2 nodes for string of length n\n- Each node = one distinct palindromic substring\n- Suffix link of node P = longest proper palindromic suffix of P\n- Build online in O(n) — each character extension is amortized O(1)\n\n**Key operations:**\n- Count distinct palindromic substrings: #nodes - 2\n- Count occurrences: propagate cnt through suffix links\n- Palindromic suffix decomposition: at each position, suffix links form the decomposition\n\n**vs Manacher's:** Manacher's finds all palindrome radii but doesn't deduplicate or count occurrences. Eertree deduplicates but is more complex to implement.`,
    },
  ],
}
