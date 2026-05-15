import type { Article } from '../articles'

export const bidirectionalBfsArticle: Article = {
  slug: 'bidirectional-bfs',
  title: 'Bidirectional BFS',
  emoji: '↔️',
  tagline: 'BFS from both source and target. Meet in the middle. Reduces O(b^d) to O(b^(d/2)).',
  description: 'Bidirectional BFS runs two simultaneous BFS expansions: one from the source, one from the target. When the two frontiers overlap, the shortest path is found. Reduces the search space from O(b^d) to O(b^(d/2)) where b is the branching factor and d is the distance. Essential for word ladder problems, maze shortest paths, and any unweighted graph where both endpoints are known.',
  gradient: 'from-sky-700 to-blue-800',
  topicSlug: 'graph',
  readTime: '13 min',
  sections: [
    {
      type: 'text',
      content: `Standard BFS expands O(b^d) nodes. Bidirectional BFS expands 2×O(b^(d/2)) = O(b^(d/2)) nodes — exponentially fewer when b is large. Key challenge: detecting when the two frontiers meet. Strategy: always expand the smaller frontier first (balanced expansion). When a node appears in both visited sets, check if the total path length improves the best known answer.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Bidirectional BFS template',
      code: `function bidirBFS(start, end, getNeighbors) {
    if (start === end) return 0;

    let frontA = new Set([start]), frontB = new Set([end]);
    let visitedA = new Map([[start, 0]]), visitedB = new Map([[end, 0]]);
    let dist = 1;

    while (frontA.size && frontB.size) {
        // Always expand the smaller frontier
        if (frontA.size > frontB.size) {
            [frontA, frontB] = [frontB, frontA];
            [visitedA, visitedB] = [visitedB, visitedA];
        }
        const nextA = new Set();
        for (const node of frontA) {
            for (const nei of getNeighbors(node)) {
                if (visitedA.has(nei)) continue;
                if (visitedB.has(nei)) return dist + visitedB.get(nei); // found!
                visitedA.set(nei, dist);
                nextA.add(nei);
            }
        }
        frontA = nextA;
        dist++;
    }
    return -1; // no path
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
      title: 'Word Ladder',
      url: 'https://leetcode.com/problems/word-ladder/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Standard BFS',
          explanation: `BFS from beginWord. At each step, generate all words differing by one letter and check if in wordList. Return steps when endWord reached.`,
          code: `var ladderLength = function(beginWord, endWord, wordList) {
    const set=new Set(wordList);
    if(!set.has(endWord)) return 0;
    const q=[[beginWord,1]];
    while(q.length){
        const[word,steps]=q.shift();
        for(let i=0;i<word.length;i++)
            for(let c=97;c<=122;c++){
                const next=word.slice(0,i)+String.fromCharCode(c)+word.slice(i+1);
                if(next===endWord) return steps+1;
                if(set.has(next)){set.delete(next);q.push([next,steps+1]);}
            }
    }
    return 0;
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Bidirectional BFS — faster in practice',
          explanation: `BFS from both beginWord and endWord simultaneously. When a word appears in the other frontier, we found the shortest path. Always expand the smaller frontier.`,
          code: `var ladderLength = function(beginWord, endWord, wordList) {
    const set=new Set(wordList);
    if(!set.has(endWord)) return 0;
    let [fa,fb]=[new Set([beginWord]),new Set([endWord])];
    let steps=1;
    while(fa.size&&fb.size){
        if(fa.size>fb.size)[fa,fb]=[fb,fa];
        const next=new Set();
        for(const word of fa){
            for(let i=0;i<word.length;i++)
                for(let c=97;c<=122;c++){
                    const w=word.slice(0,i)+String.fromCharCode(c)+word.slice(i+1);
                    if(fb.has(w)) return steps+1;
                    if(set.has(w)){set.delete(w);next.add(w);}
                }
        }
        fa=next; steps++;
    }
    return 0;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Minimum Genetic Mutation',
      url: 'https://leetcode.com/problems/minimum-genetic-mutation/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: BFS on gene strings',
          explanation: `BFS from start gene. At each step, generate all valid mutations (one char change from bank). Return min steps to reach end.`,
          code: `var minMutation = function(startGene, endGene, bank) {
    const bankSet=new Set(bank);
    if(!bankSet.has(endGene)) return -1;
    const chars='ACGT';
    let q=[startGene], steps=0, vis=new Set([startGene]);
    while(q.length){
        const next=[];
        steps++;
        for(const gene of q)
            for(let i=0;i<8;i++) for(const c of chars){
                const mut=gene.slice(0,i)+c+gene.slice(i+1);
                if(mut===endGene) return steps;
                if(bankSet.has(mut)&&!vis.has(mut)){vis.add(mut);next.push(mut);}
            }
        q=next;
    }
    return -1;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Open the Lock',
      url: 'https://leetcode.com/problems/open-the-lock/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Bidirectional BFS on 4-digit combinations',
          explanation: `State = 4-digit combination. Each step rotates one digit up or down. BFS from "0000" to target. Deadends are blocked. Bidirectional BFS halves the search depth.`,
          code: `var openLock = function(deadends, target) {
    const dead=new Set(deadends);
    if(dead.has('0000')) return -1;
    if(target==='0000') return 0;
    let [fa,fb]=[new Set(['0000']),new Set([target])];
    const vis=new Set(['0000',target]);
    let steps=0;
    while(fa.size&&fb.size){
        if(fa.size>fb.size)[fa,fb]=[fb,fa];
        const next=new Set();
        for(const combo of fa){
            const digits=combo.split('');
            for(let i=0;i<4;i++) for(const d of[-1,1]){
                const nd=((+digits[i]+d+10)%10).toString();
                const newCombo=combo.slice(0,i)+nd+combo.slice(i+1);
                if(fb.has(newCombo)) return steps+1;
                if(!vis.has(newCombo)&&!dead.has(newCombo)){vis.add(newCombo);next.add(newCombo);}
            }
        }
        fa=next; steps++;
    }
    return -1;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '↔️',
      color: 'sky',
      content: `**Bidirectional BFS vs standard BFS:**\n- Standard: O(b^d) nodes explored\n- Bidirectional: O(b^(d/2)) nodes — exponentially better\n- Best when: both start and end are known, branching factor b is large\n\n**Implementation tips:**\n- Always expand the smaller frontier (balances the two BFS trees)\n- When a node appears in the opposite visited set: current_dist + opposite_dist = total path\n- For unweighted graphs: can just check if next node is in the other frontier\n\n**Caution:** Bidirectional Dijkstra (weighted) is more complex — simply finding a node in both sets isn't enough; must also check that all paths through that node are explored.`,
    },
  ],
}
