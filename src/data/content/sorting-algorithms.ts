import type { Article } from '../articles'

export const sortingAlgorithmsArticle: Article = {
  slug: 'sorting-algorithms',
  title: 'Sorting Algorithms & Applications',
  emoji: '📊',
  tagline: 'Non-comparison sorts beat O(n log n). Sorting enables patterns: binary search, two pointers.',
  description: 'Sorting is the most-used preprocessing step. Comparison-based sorts (merge, heap) are O(n log n). Non-comparison sorts (counting, radix, bucket) can be O(n). But more important than the algorithms themselves: recognizing when sorting enables a more efficient approach to the actual problem.',
  gradient: 'from-indigo-500 to-violet-600',
  topicSlug: 'dp',
  readTime: '16 min',
  sections: [
    {
      type: 'text',
      content: `Every sorting interview question has two layers: (1) do you know the algorithm, and (2) can you use sorting as a preprocessing step to solve the real problem? Most interview sorting questions are really about the second layer. "Sort by X then use greedy/two-pointer/binary-search" is the actual pattern.`,
    },
    {
      type: 'table',
      headers: ['Algorithm', 'Time', 'Space', 'Stable?', 'When to use'],
      rows: [
        ['Merge Sort', 'O(n log n)', 'O(n)', 'Yes', 'Count inversions, external sort'],
        ['Quick Sort', 'O(n log n) avg', 'O(log n)', 'No', 'In-place, fast in practice'],
        ['Heap Sort', 'O(n log n)', 'O(1)', 'No', 'In-place, guaranteed O(n log n)'],
        ['Counting Sort', 'O(n + k)', 'O(k)', 'Yes', 'Small integer range [0, k]'],
        ['Radix Sort', 'O(d × (n + k))', 'O(n + k)', 'Yes', 'Multi-digit integers'],
        ['Bucket Sort', 'O(n) avg', 'O(n)', 'Yes', 'Uniformly distributed floats'],
        ['Topological Sort', 'O(V + E)', 'O(V)', 'N/A', 'DAG dependency ordering'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Non-Comparison Sort Templates',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Counting sort, radix sort, bucket sort',
      code: `// COUNTING SORT: O(n + k) for integers in [0, k-1]
function countingSort(arr, k) {
    const count = new Array(k).fill(0);
    for (const x of arr) count[x]++;
    // Build prefix sums for stable sort
    for (let i = 1; i < k; i++) count[i] += count[i-1];
    const result = new Array(arr.length);
    for (let i = arr.length-1; i >= 0; i--) result[--count[arr[i]]] = arr[i];
    return result;
}

// RADIX SORT: O(d × n) where d = number of digits
function radixSort(arr) {
    const max = Math.max(...arr);
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10)
        arr = countingSortByDigit(arr, exp);
    return arr;
}
function countingSortByDigit(arr, exp) {
    const count = new Array(10).fill(0);
    for (const x of arr) count[Math.floor(x/exp)%10]++;
    for (let i = 1; i < 10; i++) count[i] += count[i-1];
    const result = new Array(arr.length);
    for (let i = arr.length-1; i >= 0; i--) {
        const d = Math.floor(arr[i]/exp)%10;
        result[--count[d]] = arr[i];
    }
    return result;
}

// BUCKET SORT: O(n) average for uniform distribution
function bucketSort(arr, bucketSize = 5) {
    if (!arr.length) return arr;
    const [min, max] = [Math.min(...arr), Math.max(...arr)];
    const buckets = Array.from({length: Math.floor((max-min)/bucketSize)+1}, ()=>[]);
    for (const x of arr) buckets[Math.floor((x-min)/bucketSize)].push(x);
    return buckets.flatMap(b => b.sort((a,b) => a-b));
}`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Sorting as Preprocessing',
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'teal',
      content: `**When sorting enables a better algorithm:**\n- Sort → binary search: O(n log n) sort + O(log n) query vs O(n) scan\n- Sort → two pointers: find pairs/triples, remove duplicates\n- Sort by end time → greedy interval scheduling\n- Sort by weight → Kruskal's MST / Huffman coding\n- Sort + stack → next greater/smaller element in O(n)\n\nSorting costs O(n log n). If it enables O(n) or O(n log n) follow-up, it's worth it.`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Sort Colors (Dutch National Flag)',
      url: 'https://leetcode.com/problems/sort-colors/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Counting sort — count each color, rewrite',
          explanation: `Count 0s, 1s, 2s. Fill array with counts. O(n) but 2 passes.`,
          code: `var sortColors = function(nums) {
    const cnt=[0,0,0];
    for(const n of nums) cnt[n]++;
    let i=0;
    for(let c=0;c<3;c++) while(cnt[c]-->0) nums[i++]=c;
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Dutch National Flag — 1-pass 3-way partition',
          explanation: `Three pointers (lo, mid, hi). lo=start of unsorted region, mid=current, hi=end. 0→swap to lo side, 2→swap to hi side, 1→advance mid.`,
          code: `var sortColors = function(nums) {
    let lo=0,mid=0,hi=nums.length-1;
    while(mid<=hi){
        if(nums[mid]===0)[nums[lo],nums[mid]]=[nums[mid],nums[lo++]],mid++;
        else if(nums[mid]===2)[nums[mid],nums[hi]]=[nums[hi],nums[mid]],hi--;
        else mid++;
    }
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Largest Number',
      url: 'https://leetcode.com/problems/largest-number/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Custom comparator — sort by which concatenation is larger',
          explanation: `To decide the order of numbers a and b: compare the concatenation "ab" vs "ba" as strings. If "ab" > "ba", put a before b. This defines a total ordering for maximizing the result.`,
          code: `var largestNumber = function(nums) {
    const strs = nums.map(String);
    strs.sort((a,b) => (b+a).localeCompare(a+b));
    if(strs[0]==='0') return '0'; // edge case: all zeros
    return strs.join('');
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Maximum Gap',
      url: 'https://leetcode.com/problems/maximum-gap/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Pigeonhole + bucket sort — O(n) guaranteed',
          explanation: `n numbers in range [min, max]. The maximum gap ≥ ceil((max-min)/(n-1)) (pigeonhole). Create n-1 buckets of that minimum gap size. Each bucket stores only min and max. Max gap must occur BETWEEN consecutive non-empty buckets. O(n) time, O(n) space.`,
          code: `var maximumGap = function(nums) {
    const n=nums.length;
    if(n<2) return 0;
    const [min,max]=[Math.min(...nums),Math.max(...nums)];
    if(min===max) return 0;
    const gap=Math.ceil((max-min)/(n-1));
    const buckets=Array.from({length:n-1},()=>({min:Infinity,max:-Infinity}));
    for(const x of nums){
        if(x===min||x===max) continue;
        const i=Math.floor((x-min)/gap);
        buckets[i].min=Math.min(buckets[i].min,x);
        buckets[i].max=Math.max(buckets[i].max,x);
    }
    let maxGap=0, prev=min;
    for(const b of buckets){
        if(b.min===Infinity) continue; // empty bucket
        maxGap=Math.max(maxGap,b.min-prev);
        prev=b.max;
    }
    return Math.max(maxGap,max-prev);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'H-Index',
      url: 'https://leetcode.com/problems/h-index/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Sort descending, find where rank ≤ citations',
          explanation: `Sort citations descending. h-index = largest h where citations[h-1] ≥ h (i.e., at least h papers with ≥h citations). Scan until citations[i] < i+1.`,
          code: `var hIndex = function(citations) {
    citations.sort((a,b)=>b-a);
    let h=0;
    while(h<citations.length && citations[h]>=h+1) h++;
    return h;
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Counting sort on citations — O(n)',
          explanation: `Create count array where count[i] = papers with exactly i citations (cap at n). Then scan from high to low accumulating count until sum ≥ current index.`,
          code: `var hIndex = function(citations) {
    const n=citations.length;
    const count=new Array(n+1).fill(0);
    for(const c of citations) count[Math.min(c,n)]++;
    let total=0;
    for(let h=n;h>=0;h--){
        total+=count[h];
        if(total>=h) return h;
    }
    return 0;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Relative Sort Array',
      url: 'https://leetcode.com/problems/relative-sort-array/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Custom comparator using rank map',
          explanation: `Build a rank map from arr2 (index in arr2). Sort arr1 with comparator: elements in arr2 come first (by rank), elements not in arr2 come last (by value ascending).`,
          code: `var relativeSortArray = function(arr1, arr2) {
    const rank=new Map(arr2.map((v,i)=>[v,i]));
    return arr1.sort((a,b)=>{
        const ra=rank.has(a)?rank.get(a):Infinity+a;
        const rb=rank.has(b)?rank.get(b):Infinity+b;
        return ra-rb||(a-b);
    });
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧠',
      color: 'indigo',
      content: `**Sorting algorithm selection:**\n- General purpose → merge sort (stable) or Array.sort() (V8 uses TimSort)\n- Small integer range [0, k] → counting sort O(n+k)\n- Large integers, many passes → radix sort O(dn)\n- Uniformly distributed floats → bucket sort O(n) average\n- 3-way partition → Dutch National Flag (3 pointers)\n- Custom order → sort with comparator function\n\n**Sort as preprocessing trigger:**\n- "Largest/smallest after rearranging" → custom comparator\n- "Group/pair by property" → sort by property, scan for groups\n- "Maximum gap" → bucket sort enables O(n)\n- "Median/quantile" → quickselect or partial sort`,
    },
  ],
}
