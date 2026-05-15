import type { Article } from '../articles'

export const gaussianGf2Article: Article = {
  slug: 'gaussian-gf2',
  title: 'Gaussian Elimination over GF(2)',
  emoji: '⊕',
  tagline: 'Solve XOR linear systems. Find XOR basis rank. Determine reachability by XOR.',
  description: 'Gaussian elimination over GF(2) (the field with elements {0,1} and XOR as addition) solves systems of equations where variables and coefficients are bits and operations are XOR. Used for: finding the rank of a set of XOR equations, determining if a target is reachable by XOR combinations, and computing the solution space. More powerful than the greedy XOR basis when you need the full solution structure.',
  gradient: 'from-yellow-800 to-amber-900',
  topicSlug: 'math',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `Gaussian elimination over GF(2): represent each equation as a bitmask. Process pivots from highest bit to lowest. For each pivot column, find a row with that bit set (if none, that variable is free). XOR the pivot row into all other rows with that bit set. After elimination, the reduced row echelon form gives the solution structure. Rank = number of pivot rows. If a "0 = 1" equation exists: no solution.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Gaussian elimination over GF(2)',
      code: `// Gaussian elimination over GF(2)
// rows: array of bitmasks representing equations (augmented: last bit is RHS)
function gaussianGF2(rows, n) {
    // n = number of variables
    const basis = [];
    let rank = 0;
    for (let col = n - 1; col >= 0; col--) {
        // Find pivot row with this column bit set
        let pivot = -1;
        for (let r = rank; r < rows.length; r++) {
            if ((rows[r] >> col) & 1) { pivot = r; break; }
        }
        if (pivot === -1) continue; // free variable in this column
        [rows[rank], rows[pivot]] = [rows[pivot], rows[rank]];
        // XOR pivot into all other rows with this bit set
        for (let r = 0; r < rows.length; r++) {
            if (r !== rank && (rows[r] >> col) & 1) rows[r] ^= rows[rank];
        }
        basis[col] = rows[rank];
        rank++;
    }
    return { rank, rows: rows.slice(0, rank) };
}

// Check if target is XOR-reachable from basis vectors
function isReachable(vectors, target) {
    // Insert target into basis; if it reduces to 0, it was already in span
    let x = target;
    for (let i = 29; i >= 0; i--) {
        if (!((x >> i) & 1)) continue;
        const pivot = vectors.find(v => (v >> i) & 1);
        if (!pivot) { vectors.push(x); return false; } // x adds new dimension
        x ^= pivot;
    }
    return true; // x reduces to 0, was in span
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
      title: 'Maximum XOR With an Element From Array',
      url: 'https://leetcode.com/problems/maximum-xor-with-an-element-from-array/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Offline queries + sorted insertion into XOR basis',
          explanation: `Sort queries by limit. Sort nums. For each query (x, limit): insert all nums ≤ limit into XOR basis. Query max XOR of x with any basis element.`,
          code: `var maximizeXor = function(nums, queries) {
    nums.sort((a,b)=>a-b);
    const q=queries.map(([x,m],i)=>[x,m,i]).sort((a,b)=>a[1]-b[1]);
    const basis=new Array(30).fill(0);
    const res=new Array(queries.length);
    let ni=0;
    const insert=(v)=>{for(let b=29;b>=0;b--){if(!((v>>b)&1)) continue;if(!basis[b]){basis[b]=v;return;}v^=basis[b];}};
    const query=(v)=>{for(let b=29;b>=0;b--) v=Math.max(v,v^basis[b]);return v;};
    for(const[x,m,i] of q){
        while(ni<nums.length&&nums[ni]<=m) insert(nums[ni++]);
        res[i]=basis.some(Boolean)?query(x):-1;
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
      title: 'Count XOR Pairs in Range',
      url: 'https://leetcode.com/problems/find-maximum-xor-for-each-query/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Prefix XOR + find complement in (n-1) bits',
          explanation: `For each query after removing last element, maximize XOR with remaining prefix XOR. The answer is all 1s in (maximumBit) bits XOR prefix[i]. Since prefix XOR changes monotonically and we want max XOR: answer = (2^maximumBit - 1) XOR prefixXOR[i].`,
          code: `var getMaximumXor = function(nums, maximumBit) {
    const mask=(1<<maximumBit)-1;
    let prefix=0;
    const res=[];
    for(const n of nums) prefix^=n;
    for(let i=nums.length-1;i>=0;i--){
        res.push(prefix^mask);
        prefix^=nums[i];
    }
    return res;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Minimum Number of Operations to Make XOR Equal to K',
      url: 'https://leetcode.com/problems/minimum-number-of-operations-to-make-array-xor-equal-to-k/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Count differing bits between total XOR and k',
          explanation: `Each operation flips one bit of one element (changes XOR of array by flipping one bit). Total XOR changes one bit per operation. Answer = number of bits where (totalXOR XOR k) has a 1.`,
          code: `var minOperations = function(nums, k) {
    const xorAll=nums.reduce((a,b)=>a^b,0);
    return (xorAll^k).toString(2).split('').filter(b=>b==='1').length;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Maximum Rows Covered by Columns',
      url: 'https://leetcode.com/problems/maximum-rows-covered-by-columns/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Bitmask over columns — check if row is covered',
          explanation: `Enumerate all C(n,numSelect) subsets of columns. A row is "covered" if all 1s in the row are in the selected columns. Count covered rows for each selection.`,
          code: `var maximumRows = function(matrix, numSelect) {
    const m=matrix.length,n=matrix[0].length;
    const rows=matrix.map(r=>r.reduce((acc,v,i)=>acc|(v<<i),0));
    let res=0;
    for(let mask=0;mask<(1<<n);mask++){
        if(mask.toString(2).split('1').length-1!==numSelect) continue;
        const covered=rows.filter(r=>(r&mask)===r).length;
        res=Math.max(res,covered);
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
      color: 'amber',
      content: `**GF(2) Gaussian elimination vs XOR basis:**\n- XOR basis: greedy insertion, finds max XOR reachable — O(30n)\n- GF(2) Gaussian: full row reduction, finds solution space, checks solvability — O(n² or n×30)\n\n**When to use full Gaussian:**\n- System of XOR equations with multiple unknowns\n- "Can we XOR some subset to get target?" (same as XOR basis span check)\n- Counting solutions (2^(num_free_variables) solutions if consistent)\n- Linear independence over GF(2) (rank of matrix)\n\n**Key property:** GF(2) arithmetic: addition = XOR, multiplication = AND. All standard Gaussian elimination rules work, just with bitwise ops.`,
    },
  ],
}
