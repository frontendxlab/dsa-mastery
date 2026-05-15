import type { Article } from '../articles'

export const bitmaskDpArticle: Article = {
  slug: 'bitmask-dp',
  title: 'Bitmask DP',
  emoji: '🔢',
  tagline: 'Subsets as integers. 2^n states where n ≤ 20.',
  description: 'Bitmask DP solves problems involving subsets of a small set (n ≤ 20). Each integer 0..2^n-1 represents a subset. Classic problems: TSP, minimum cost to visit all nodes, assignment problems. Learn the subset enumeration tricks and transition patterns.',
  gradient: 'from-violet-500 to-purple-600',
  topicSlug: 'dp',
  readTime: '18 min',
  sections: [
    {
      type: 'text',
      content: `Bitmask DP represents a subset of n elements as a single integer where bit k = 1 means element k is included. With n ≤ 20, there are 2^n ≈ 1M subsets — manageable with DP. The key insight: transitions between subsets are fast bitwise operations. Classic signals: "visit all cities exactly once," "assign tasks to workers," "cover all requirements."`,
    },
    {
      type: 'table',
      headers: ['Operation', 'Code', 'Meaning'],
      rows: [
        ['Check if bit k set', '(mask >> k) & 1', 'Is element k in subset?'],
        ['Add element k', 'mask | (1 << k)', 'Include k in subset'],
        ['Remove element k', 'mask & ~(1 << k)', 'Exclude k from subset'],
        ['All n elements', '(1 << n) - 1', 'Full set bitmask'],
        ['Enumerate subsets of mask', 'for(s=mask; s>0; s=(s-1)&mask)', 'All non-empty subsets'],
        ['Count set bits', 'Integer.bitCount or loop n&(n-1)', 'Size of subset'],
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Core Template: dp[mask] = best for subset "mask"',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Bitmask DP template — visiting all nodes',
      code: `// dp[mask][i] = best cost to have visited exactly the nodes in mask,
//               ending at node i
// mask has bit i set iff we've visited node i

const n = /* number of nodes */;
const INF = Infinity;
const dp = Array.from({length: 1<<n}, () => new Array(n).fill(INF));

// Base: start at node 0, only node 0 visited
dp[1][0] = 0; // mask = 0001 (only bit 0 set), at node 0, cost 0

for (let mask = 1; mask < (1<<n); mask++) {
    for (let u = 0; u < n; u++) {
        if (!(mask >> u & 1)) continue;  // u not in this mask
        if (dp[mask][u] === INF) continue;
        for (let v = 0; v < n; v++) {
            if (mask >> v & 1) continue;  // v already visited
            const newMask = mask | (1 << v);
            dp[newMask][v] = Math.min(dp[newMask][v], dp[mask][u] + cost[u][v]);
        }
    }
}

// Answer: visit all nodes (full mask), end anywhere
const fullMask = (1<<n) - 1;
return Math.min(...dp[fullMask]);`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Subset Enumeration Trick',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Enumerate all subsets of a bitmask',
      code: `// Enumerate all non-empty subsets of 'mask' in O(3^n) total
for (let s = mask; s > 0; s = (s - 1) & mask) {
    // process subset s of mask
    // (s-1) & mask clears the lowest set bit of s and
    // removes all bits not in mask
}

// Example: split mask into two complementary parts
for (let s = mask; s > 0; s = (s-1) & mask) {
    const complement = mask ^ s; // mask XOR s = bits in mask but not in s
    dp[mask] = Math.min(dp[mask], f(s) + f(complement));
    if (s === 0) break; // handle s=0 separately if needed
}

// Why O(3^n)? Each element is in: mask but not s, mask and s, or not in mask
// → 3 choices per element → 3^n total work across all masks`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Shortest Path Visiting All Nodes',
      url: 'https://leetcode.com/problems/shortest-path-visiting-all-nodes/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: BFS with (node, visited_mask) state',
          explanation: `State = (current node, bitmask of visited nodes). BFS finds shortest path. Start by enqueuing all nodes (can start anywhere). Goal: any state where visited_mask = (1<<n)-1 (all visited). This works because the graph is undirected and we can revisit nodes.`,
          code: `var shortestPathLength = function(graph) {
    const n = graph.length;
    const full = (1 << n) - 1;
    if (full === 0) return 0;
    // [node, mask] → visited
    const visited = Array.from({length:n}, () => new Array(1<<n).fill(false));
    let q = [];
    for (let i = 0; i < n; i++) {
        visited[i][1<<i] = true;
        q.push([i, 1<<i, 0]);
    }
    while (q.length) {
        const next = [];
        for (const [node, mask, dist] of q) {
            if (mask === full) return dist;
            for (const nb of graph[node]) {
                const newMask = mask | (1<<nb);
                if (!visited[nb][newMask]) {
                    visited[nb][newMask] = true;
                    next.push([nb, newMask, dist+1]);
                }
            }
        }
        q = next;
    }
    return -1;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Minimum Cost to Connect Two Groups of Points',
      url: 'https://leetcode.com/problems/minimum-cost-to-connect-two-groups-of-points/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Bitmask DP on right group coverage',
          explanation: `dp[mask] = min cost to connect all points in group1 and exactly the points in mask from group2, processed row by row. For each row i, try connecting point i to each point j in group2 (add cost[i][j], add j to mask). After processing all rows, fill remaining uncovered group2 points using their minimum connection cost.`,
          code: `var connectTwoGroups = function(cost) {
    const m = cost.length, n = cost[0].length;
    // minCost[j] = min cost to connect j to any point in group1
    const minCost = new Array(n).fill(Infinity);
    for (let i = 0; i < m; i++)
        for (let j = 0; j < n; j++)
            minCost[j] = Math.min(minCost[j], cost[i][j]);

    const full = (1<<n)-1;
    let dp = new Array(1<<n).fill(Infinity);
    dp[0] = 0;

    for (let i = 0; i < m; i++) {
        const next = new Array(1<<n).fill(Infinity);
        for (let mask = 0; mask <= full; mask++) {
            if (dp[mask] === Infinity) continue;
            for (let j = 0; j < n; j++) {
                const newMask = mask | (1<<j);
                next[newMask] = Math.min(next[newMask], dp[mask] + cost[i][j]);
            }
        }
        dp = next;
    }
    // Cover remaining unmatched group2 points
    for (let mask = 0; mask <= full; mask++) {
        for (let j = 0; j < n; j++)
            if (!(mask>>j&1)) dp[mask|(1<<j)] = Math.min(dp[mask|(1<<j)], dp[mask]+minCost[j]);
    }
    return dp[full];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Number of Ways to Wear Different Hats to Each Other',
      url: 'https://leetcode.com/problems/number-of-ways-to-wear-different-hats-to-each-other/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Bitmask DP on people assigned (n ≤ 10 people, 40 hats)',
          explanation: `dp[mask] = ways to assign hats to exactly the people in mask, iterating hats 1..40. For each hat h and each mask: for each person p in mask who likes hat h — dp[mask] += dp[mask without p] (assign hat h to person p). This avoids the larger space of hat states.`,
          code: `var numberWays = function(hats) {
    const MOD = 1e9 + 7;
    const n = hats.length;
    // hatPeople[h] = list of people who like hat h
    const hatPeople = Array.from({length:41},()=>[]);
    for (let p=0;p<n;p++) for (const h of hats[p]) hatPeople[h].push(p);

    const full = (1<<n)-1;
    const dp = new Array(full+1).fill(0);
    dp[0] = 1; // 0 people assigned = 1 way

    for (let h=1;h<=40;h++) {
        // process hat h — iterate masks in reverse to avoid reuse
        for (let mask=full;mask>=0;mask--) {
            if (!dp[mask]) continue;
            for (const p of hatPeople[h]) {
                if (mask>>p&1) continue; // p already has a hat
                dp[mask|(1<<p)] = (dp[mask|(1<<p)] + dp[mask]) % MOD;
            }
        }
    }
    return dp[full];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Minimum XOR Sum of Two Arrays',
      url: 'https://leetcode.com/problems/minimum-xor-sum-of-two-arrays/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Bitmask DP — dp[mask] = min XOR using assignment in mask',
          explanation: `dp[mask] = minimum XOR sum when we've assigned nums2 elements in mask to the first popcount(mask) elements of nums1. Transition: dp[mask] = min over all j in mask of dp[mask without j] + (nums1[popcount(mask)-1] XOR nums2[j]).`,
          code: `var minimumXORSum = function(nums1, nums2) {
    const n = nums1.length;
    const dp = new Array(1<<n).fill(Infinity);
    dp[0] = 0;
    for (let mask=1;mask<(1<<n);mask++) {
        const i = Integer_bitCount(mask) - 1; // which nums1 element we're assigning
        for (let j=0;j<n;j++) {
            if (!(mask>>j&1)) continue;
            const prev = mask ^ (1<<j);
            dp[mask] = Math.min(dp[mask], dp[prev] + (nums1[i] ^ nums2[j]));
        }
    }
    return dp[(1<<n)-1];
};
// Integer_bitCount: count set bits
const Integer_bitCount = n => { let c=0; while(n){n&=n-1;c++;} return c; };`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧠',
      color: 'purple',
      content: `**Bitmask DP signals:**\n- "Visit/cover all n elements" where n ≤ 20 → bitmask DP\n- "Assign each item from set A to one from set B" → bitmask on one set\n- "Minimum cost partition into subsets" → dp[mask] = min over splits\n- "State includes which elements chosen" → encode as bitmask\n\n**Subset enumeration:** \`for(s=mask; s>0; s=(s-1)&mask)\` — O(2^popcount(mask)) per mask, O(3^n) total.\n\n**Space optimization:** if only previous-mask states needed, use 1D dp[mask] iterated in correct order.`,
    },
  ],
}
