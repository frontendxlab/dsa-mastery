import type { Article } from '../articles'

export const trieArticle: Article = {
  slug: 'trie',
  title: 'Trie (Prefix Tree)',
  emoji: '🌿',
  tagline: 'Fast prefix lookup. One character per level.',
  description: 'A Trie is a tree where each path from root to a leaf represents a string. It gives O(L) lookup/insert/delete for strings of length L, regardless of how many strings are stored. Master the standard Trie, compressed Trie, and XOR Trie.',
  gradient: 'from-sky-400 to-blue-500',
  topicSlug: 'trie',
  readTime: '12 min',
  sections: [
    {
      type: 'text',
      content: `A Trie stores strings by their characters, one character per level. Each node can have up to 26 children (for lowercase English). Tries answer prefix queries in O(L) time where L is the string length — independent of how many strings are stored. This makes them ideal for autocomplete, spell check, and problems involving common prefixes.`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Standard Trie Implementation',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Trie with insert, search, and startsWith',
      code: `class TrieNode {
    constructor() {
        this.children = {};  // or new Array(26).fill(null)
        this.isEnd = false;
    }
}

class Trie {
    constructor() { this.root = new TrieNode(); }

    insert(word) {
        let node = this.root;
        for (const ch of word) {
            if (!node.children[ch]) node.children[ch] = new TrieNode();
            node = node.children[ch];
        }
        node.isEnd = true;
    }

    search(word) {
        let node = this.root;
        for (const ch of word) {
            if (!node.children[ch]) return false;
            node = node.children[ch];
        }
        return node.isEnd;  // must reach a word-ending node
    }

    startsWith(prefix) {
        let node = this.root;
        for (const ch of prefix) {
            if (!node.children[ch]) return false;
            node = node.children[ch];
        }
        return true;  // just need the prefix path to exist
    }
}`,
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'blue',
      content: `**search vs startsWith**: Both traverse the trie character by character. The only difference is the final check: \`search\` requires \`node.isEnd === true\` (the string itself was inserted), while \`startsWith\` just needs the path to exist (any word with that prefix was inserted).`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Implement Trie (Prefix Tree)',
      url: 'https://leetcode.com/problems/implement-trie-prefix-tree/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Standard Trie — each node = one character',
          explanation: `Build the class above. Key insight: children can be a plain object {} (O(1) lookup by character) or an array of 26 (indexed by char code offset). Object is simpler for variable alphabets.`,
          code: `// See implementation above — this IS the solution.
// Time: O(L) for insert, search, startsWith where L = word length
// Space: O(total characters across all inserted words)`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Word Search II',
      url: 'https://leetcode.com/problems/word-search-ii/',
      difficulty: 'Hard',
      note: 'Trie + DFS backtracking on grid — the power combo.',
      intuitions: [
        {
          label: 'Intuition 1: Build Trie from words, DFS grid using Trie to prune',
          explanation: `Brute force: for each word, run DFS on the grid to find it. Too slow for many words.\n\nBetter: Insert all words into a Trie. DFS each cell of the grid. At each step, only continue if current path exists in Trie (prune any path not in Trie). When we reach a node with isEnd=true, we found a word. Mark it to avoid duplicate results.`,
          code: `var findWords = function(board, words) {
    const trie = new Trie();
    for (const w of words) trie.insert(w);

    const n = board.length, m = board[0].length;
    const result = [];
    const dr = [1,0,-1,0], dc = [0,1,0,-1];

    const dfs = (r, c, node, path) => {
        const ch = board[r][c];
        if (!node.children[ch]) return;
        const next = node.children[ch];
        path += ch;
        if (next.isEnd) { result.push(path); next.isEnd = false; }  // dedup

        board[r][c] = '#';  // mark visited
        for (let i = 0; i < 4; i++) {
            const nr = r + dr[i], nc = c + dc[i];
            if (nr >= 0 && nr < n && nc >= 0 && nc < m && board[nr][nc] !== '#')
                dfs(nr, nc, next, path);
        }
        board[r][c] = ch;  // restore
    };

    for (let i = 0; i < n; i++)
        for (let j = 0; j < m; j++)
            dfs(i, j, trie.root, '');
    return result;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Maximum XOR of Two Numbers in an Array',
      url: 'https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/',
      difficulty: 'Medium',
      note: 'XOR Trie — store bits instead of characters.',
      intuitions: [
        {
          label: 'Intuition 1: XOR Trie — insert bits, query for max XOR',
          explanation: `For each number, insert its bits (MSB first) into a binary trie. To maximize XOR with a query number: at each bit, try to go in the OPPOSITE direction (to get a 1 in XOR result). If opposite path exists, take it. Otherwise take the same path. Build answer bit by bit.`,
          code: `function maxXOR(nums) {
    // Build XOR Trie
    const root = {};
    for (const n of nums) {
        let node = root;
        for (let i = 31; i >= 0; i--) {
            const bit = (n >> i) & 1;
            if (!node[bit]) node[bit] = {};
            node = node[bit];
        }
    }
    // Query: maximize XOR
    let maxVal = 0;
    for (const n of nums) {
        let node = root, xorVal = 0;
        for (let i = 31; i >= 0; i--) {
            const bit = (n >> i) & 1;
            const want = 1 - bit;  // want opposite bit to maximize XOR
            if (node[want]) { xorVal |= (1 << i); node = node[want]; }
            else node = node[bit];
        }
        maxVal = Math.max(maxVal, xorVal);
    }
    return maxVal;
}`,
          lang: 'javascript',
        },
      ],
    },
  ],
}
