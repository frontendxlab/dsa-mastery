import type { Article } from '../articles'

export const countingPatternsArticle: Article = {
  slug: 'counting-patterns',
  title: 'Counting Patterns',
  emoji: '🔢',
  tagline: 'Count pairs, subarrays, paths. Always ask: what structure enables efficient counting?',
  description: 'Counting problems ask "how many X satisfy condition Y?" The brute force is O(n²) or O(2^n). Efficient counting exploits structure: prefix sums for subarrays, hashmaps for pair conditions, bit manipulation for subsets, DP for sequences. Learn to recognize which technique each signal requires.',
  gradient: 'from-rose-500 to-pink-600',
  topicSlug: 'dp',
  readTime: '18 min',
  sections: [
    {
      type: 'text',
      content: `Counting problems have a deceptive pattern: they look like search problems but actually need mathematical insight. "Count subarrays with sum k" seems to need nested loops but is O(n) with prefix sums. "Count pairs with XOR = target" seems O(n²) but is O(n) with a hashmap. The key: identify what property you're counting, find the right structure that compresses the redundancy.`,
    },
    {
      type: 'table',
      headers: ['Count what?', 'Technique', 'Complexity'],
      rows: [
        ['Subarrays with sum = k', 'Prefix sum + HashMap', 'O(n)'],
        ['Pairs (i,j) with nums[i]+nums[j]=target', 'HashMap (complement lookup)', 'O(n)'],
        ['Inversions in array', 'Merge sort or BIT', 'O(n log n)'],
        ['Subarrays with at most k distinct', 'Sliding window', 'O(n)'],
        ['Subsets with property', 'Bitmask DP', 'O(2^n)'],
        ['Numbers in [lo, hi] satisfying digit property', 'Digit DP', 'O(log n × state)'],
        ['Sequences satisfying recurrence', 'DP', 'O(n²) or O(n)'],
        ['Points in convex hull', 'Andrew\'s monotone chain', 'O(n log n)'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Key Templates',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Counting subarrays — prefix sum hashmap',
      code: `// Count subarrays with sum EXACTLY k
// O(n) with prefix sum + hashmap
function countSubarraysSum(nums, k) {
    const map = new Map([[0, 1]]); // prefix sum 0 seen once
    let count = 0, sum = 0;
    for (const n of nums) {
        sum += n;
        count += map.get(sum - k) ?? 0; // subarrays ending here with sum k
        map.set(sum, (map.get(sum) ?? 0) + 1);
    }
    return count;
}

// Count subarrays with sum AT MOST k (all positive):
function atMost(nums, k) {
    let lo=0, sum=0, count=0;
    for (let hi=0; hi<nums.length; hi++) {
        sum += nums[hi];
        while (sum > k) sum -= nums[lo++];
        count += hi - lo + 1; // all subarrays ending at hi with valid sum
    }
    return count;
}

// Count subarrays with sum EXACTLY k using atMost:
// f(exactly k) = f(atMost k) - f(atMost k-1)

// Count pairs with sum = target
function countPairs(nums, target) {
    const map = new Map();
    let count = 0;
    for (const n of nums) {
        count += map.get(target - n) ?? 0;
        map.set(n, (map.get(n) ?? 0) + 1);
    }
    return count;
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
      title: 'Subarray Sum Equals K',
      url: 'https://leetcode.com/problems/subarray-sum-equals-k/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: O(n²) brute — check all subarrays',
          explanation: `For each pair (i,j), compute sum. O(n²) with prefix sums, O(n³) naively.`,
        },
        {
          label: 'Intuition 2: O(n) prefix sum + hashmap',
          explanation: `For each position i, count previous prefix sums equal to (currentSum - k). If prefix[j] = prefix[i] - k, then subarray [j+1..i] sums to k. Use a map from prefix sum → count.`,
          code: `var subarraySum = function(nums, k) {
    const map=new Map([[0,1]]);
    let count=0, sum=0;
    for(const n of nums){
        sum+=n;
        count+=(map.get(sum-k)??0);
        map.set(sum,(map.get(sum)??0)+1);
    }
    return count;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Count Number of Nice Subarrays',
      url: 'https://leetcode.com/problems/count-number-of-nice-subarrays/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Transform odd→1, even→0, then subarray sum = k',
          explanation: `A "nice" subarray has exactly k odd numbers. Map: odd → 1, even → 0. Now count subarrays with sum exactly k = use prefix sum + hashmap.`,
          code: `var numberOfSubarrays = function(nums, k) {
    const map=new Map([[0,1]]);
    let count=0, odd=0;
    for(const n of nums){
        odd+=n%2;
        count+=(map.get(odd-k)??0);
        map.set(odd,(map.get(odd)??0)+1);
    }
    return count;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Count of Range Sum',
      url: 'https://leetcode.com/problems/count-of-range-sum/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Merge sort on prefix sums',
          explanation: `Count pairs (i,j) where lower ≤ prefix[j] - prefix[i] ≤ upper (j > i). During merge sort on prefix sums, for each left half element, count right half elements in range [prefix[i]+lower, prefix[i]+upper] using two pointers. O(n log n).`,
          code: `var countRangeSum = function(nums, lower, upper) {
    const prefix=[0];
    for(const n of nums) prefix.push(prefix.at(-1)+n);
    let count=0;
    const mergeSort=(arr)=>{
        if(arr.length<=1) return arr;
        const mid=arr.length>>1;
        const L=mergeSort(arr.slice(0,mid)), R=mergeSort(arr.slice(mid));
        let j=0,k=0;
        for(const x of L){
            while(j<R.length && R[j]-x<lower) j++;
            while(k<R.length && R[k]-x<=upper) k++;
            count+=k-j;
        }
        return merge(L,R);
    };
    const merge=(L,R)=>{const res=[];let i=0,j=0;while(i<L.length&&j<R.length)res.push(L[i]<=R[j]?L[i++]:R[j++]);return res.concat(L.slice(i),R.slice(j));};
    mergeSort(prefix);
    return count;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Count Subarrays with Median K',
      url: 'https://leetcode.com/problems/count-subarrays-with-median-equal-to-k/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Transform to +1/-1, count prefix balance with HashMap',
          explanation: `k is median of [l,r] iff: (1) k is in [l,r], and (2) count(>k) - count(<k) ∈ {0, 1} in [l,r]. Transform: nums[i] = +1 if > k, -1 if < k, 0 if = k. For subarrays containing k's index, count those with prefix balance in {0, 1}. Use hashmap on balance values left and right of k.`,
          code: `var countSubarrays = function(nums, k) {
    const kIdx=nums.indexOf(k);
    // Transform: >k → +1, <k → -1, k → 0
    const vals=nums.map(x=>x>k?1:x<k?-1:0);
    // Left: count prefix balances from kIdx going left
    const left=new Map([[0,1]]);
    let bal=0;
    for(let i=kIdx-1;i>=0;i--){bal+=vals[i];left.set(bal,(left.get(bal)??0)+1);}
    // Right: for each prefix going right from kIdx, count matching left balances
    let count=0; bal=0;
    for(let i=kIdx;i<nums.length;i++){
        bal+=vals[i];
        count+=(left.get(bal)??0)+(left.get(bal-1)??0); // balance in {0,1}
    }
    return count;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Count Pairs with XOR in a Range',
      url: 'https://leetcode.com/problems/count-pairs-with-xor-in-a-range/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: XOR Trie — count pairs with XOR ≤ high',
          explanation: `Count pairs (i,j) with low ≤ nums[i] XOR nums[j] ≤ high = f(high) - f(low-1) where f(x) counts pairs with XOR ≤ x. Build XOR trie. For each nums[i], query trie for count of previously inserted numbers with XOR ≤ x, then insert nums[i].`,
          code: `var countPairs = function(nums, low, high) {
    // Count pairs with XOR <= limit using XOR trie
    class XorTrie {
        constructor() { this.ch=[[0,0]]; this.cnt=[0]; }
        insert(n) {
            let node=0;
            for(let b=14;b>=0;b--){
                const bit=(n>>b)&1;
                if(!this.ch[node][bit]){ this.ch.push([0,0]); this.cnt.push(0); this.ch[node][bit]=this.ch.length-1; }
                node=this.ch[node][bit];
                this.cnt[node]++;
            }
        }
        countLEQ(n, limit) {
            let node=0, count=0;
            for(let b=14;b>=0;b--){
                const nb=(n>>b)&1, lb=(limit>>b)&1;
                if(lb===1){
                    // Taking same bit as nb gives XOR bit=0 (<= limit so far)
                    if(this.ch[node][nb]) count+=this.cnt[this.ch[node][nb]];
                    // Must go toward XOR bit=1 (equals limit so far)
                    if(!this.ch[node][1-nb]) return count;
                    node=this.ch[node][1-nb];
                } else {
                    // Must match to keep XOR bit=0
                    if(!this.ch[node][nb]) return count;
                    node=this.ch[node][nb];
                }
            }
            return count+this.cnt[node];
        }
    }
    const trie=new XorTrie();
    let count=0;
    for(const n of nums){
        count+=trie.countLEQ(n,high)-trie.countLEQ(n,low-1);
        trie.insert(n);
    }
    return count;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧠',
      color: 'rose',
      content: `**Counting problem cheat sheet:**\n- "Count subarrays with sum = k" → prefix sum + hashmap O(n)\n- "Count subarrays with exactly k odd/distinct" → atMost(k) - atMost(k-1)\n- "Count pairs with XOR condition" → XOR trie\n- "Count inversions" → merge sort or BIT\n- "Count paths in grid" → DP (unique paths pattern)\n- "Count numbers with digit property" → digit DP\n- "Count subsets with property" → bitmask DP (n ≤ 20)\n- "Count with range [lo, hi]" → f(hi) - f(lo-1) (difference trick)`,
    },
  ],
}
