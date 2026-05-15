import type { Article } from '../articles'

export const simulationArticle: Article = {
  slug: 'simulation',
  title: 'Simulation & Implementation',
  emoji: '🎮',
  tagline: 'Do exactly what the problem says. Edge cases are the challenge.',
  description: 'Simulation problems ask you to faithfully implement a described process. No clever algorithm needed — just careful implementation. The hard part: edge cases, boundary conditions, and off-by-one errors. Master direction tracking, state machines, and boundary checks.',
  gradient: 'from-violet-600 to-purple-700',
  topicSlug: 'miscellaneous',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `Simulation problems are deceptively "easy" — the algorithm is just "do what the problem says." The real challenge is getting every edge case right: what happens at boundaries, when states change, when conditions overlap. The key: read the problem carefully, code the process step by step, and test edge cases methodically.`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Common Simulation Patterns',
    },
    {
      type: 'table',
      headers: ['Pattern', 'Key Challenge', 'Example'],
      rows: [
        ['Direction tracking', 'Rotation, turning at boundaries', 'Spiral matrix, robot moves'],
        ['State machine', 'Valid state transitions', 'LRU, game states, parsers'],
        ['Event simulation', 'Process events in order', 'Meeting rooms, task scheduler'],
        ['String manipulation', 'Boundary conditions, indices', 'Reverse words, zigzag'],
        ['Number manipulation', 'Overflow, digit extraction', 'Happy number, digit reversal'],
        ['Grid simulation', 'Out-of-bounds, visited tracking', 'Game of Life, robot paths'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Spiral Matrix',
      url: 'https://leetcode.com/problems/spiral-matrix/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Boundary shrink simulation',
          explanation: `Track four boundaries (top, bottom, left, right). Traverse: right along top row (top++), down along right column (right--), left along bottom row if valid (bottom--), up along left column if valid (left++). Repeat until boundaries cross.`,
          code: `var spiralOrder = function(matrix) {
    const res=[];
    let top=0,bot=matrix.length-1,left=0,right=matrix[0].length-1;
    while(top<=bot&&left<=right){
        for(let c=left;c<=right;c++) res.push(matrix[top][c]); top++;
        for(let r=top;r<=bot;r++) res.push(matrix[r][right]); right--;
        if(top<=bot){for(let c=right;c>=left;c--) res.push(matrix[bot][c]); bot--;}
        if(left<=right){for(let r=bot;r>=top;r--) res.push(matrix[r][left]); left++;}
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
      title: 'Game of Life',
      url: 'https://leetcode.com/problems/game-of-life/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: In-place simulation with encoded states',
          explanation: `We need to update simultaneously, but if we update in place we can't see the original. Encode: cell that was 1 and dies = 2, cell that was 0 and lives = 3. After updating all cells, decode: 2→0, 3→1.`,
          code: `var gameOfLife = function(board) {
    const m=board.length,n=board[0].length;
    const dirs=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    const count=(r,c)=>dirs.reduce((s,[dr,dc])=>{
        const nr=r+dr,nc=c+dc;
        return nr>=0&&nr<m&&nc>=0&&nc<n&&(board[nr][nc]===1||board[nr][nc]===2)?s+1:s;
    },0);
    for(let r=0;r<m;r++) for(let c=0;c<n;c++){
        const live=count(r,c);
        if(board[r][c]===1&&(live<2||live>3)) board[r][c]=2; // was alive, now dead
        if(board[r][c]===0&&live===3) board[r][c]=3; // was dead, now alive
    }
    for(let r=0;r<m;r++) for(let c=0;c<n;c++)
        board[r][c]=board[r][c]===2?0:board[r][c]===3?1:board[r][c];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Robot Bounded In Circle',
      url: 'https://leetcode.com/problems/robot-bounded-in-circle/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Simulate one cycle — bounded if back at origin OR not facing north',
          explanation: `After one instruction cycle: the robot is bounded iff (1) it's back at origin, OR (2) it's not facing north. If not facing north, repeated cycles rotate the robot: 2 cycles (facing south), 4 cycles (facing east/west) always bring it back.`,
          code: `var isRobotBounded = function(instructions) {
    const dirs=[[0,1],[1,0],[0,-1],[-1,0]]; // N,E,S,W
    let x=0,y=0,d=0; // face north initially
    for(const c of instructions){
        if(c==='G'){x+=dirs[d][0];y+=dirs[d][1];}
        else if(c==='L') d=(d+3)%4;
        else d=(d+1)%4;
    }
    return (x===0&&y===0)||(d!==0); // at origin OR not facing north
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Zigzag Conversion',
      url: 'https://leetcode.com/problems/zigzag-conversion/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Simulate zigzag, distribute characters to rows',
          explanation: `Characters alternate between going down (row 0→n-1) and going up (row n-1→0). Use a direction flag. Each character goes to the current row. Final answer = concatenate all rows.`,
          code: `var convert = function(s, numRows) {
    if(numRows===1) return s;
    const rows=Array.from({length:numRows},()=>'');
    let row=0,dir=-1;
    for(const c of s){
        rows[row]+=c;
        if(row===0||row===numRows-1) dir=-dir;
        row+=dir;
    }
    return rows.join('');
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Integer to Roman',
      url: 'https://leetcode.com/problems/integer-to-roman/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Greedy — subtract largest possible symbol',
          explanation: `Precompute all symbols from largest to smallest (including subtractive cases: IV=4, IX=9, etc.). Repeatedly subtract the largest symbol that fits, appending it to result.`,
          code: `var intToRoman = function(num) {
    const vals=[1000,900,500,400,100,90,50,40,10,9,5,4,1];
    const syms=['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];
    let res='';
    for(let i=0;i<vals.length;i++)
        while(num>=vals[i]){res+=syms[i];num-=vals[i];}
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 6,
      title: 'Text Justification',
      url: 'https://leetcode.com/problems/text-justification/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Group words into lines, then format each line',
          explanation: `Step 1: Greedily pack words into lines (add words while they fit). Step 2: For each line except last: distribute extra spaces evenly between words (left-biased for uneven). Last line: left-justified (single space between words, pad right with spaces).`,
          code: `var fullJustify = function(words, maxWidth) {
    const res=[];
    let i=0;
    while(i<words.length){
        let j=i,len=0;
        while(j<words.length&&len+words[j].length+(j-i)<=maxWidth) len+=words[j++].length;
        const numWords=j-i, numSpaces=maxWidth-len;
        let line='';
        if(j===words.length||numWords===1){ // last line or single word
            line=words.slice(i,j).join(' ');
            line+=(' ').repeat(maxWidth-line.length);
        } else {
            const gaps=numWords-1, base=Math.floor(numSpaces/gaps), extra=numSpaces%gaps;
            for(let k=i;k<j;k++){
                line+=words[k];
                if(k<j-1) line+=(' ').repeat(base+(k-i<extra?1:0));
            }
        }
        res.push(line); i=j;
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🎮',
      color: 'violet',
      content: `**Simulation checklist:**\n1. Read the problem statement word by word — every sentence may be a constraint\n2. Identify the state: what needs to be tracked at each step?\n3. Code the transitions: what changes on each event/step?\n4. Boundary conditions: what happens at edges, start, end?\n5. Test with simple cases first, then edge cases\n\n**In-place update trick:** When you need to update a grid "simultaneously," encode old/new states as different numbers. First pass: set encoded values. Second pass: decode. Avoids reading your own updates.`,
    },
  ],
}
