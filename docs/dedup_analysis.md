# Deduplication & Cross-Reference Analysis

Analyzing 38,586 problems across 23 topic CSVs, 50+ platforms.

Generated: 2026-05-14

---

## 1. Same Problem on Multiple Platforms

**7,809 URLs appear in multiple topics/categories** — many of these are the same problem being filed under different topics on the same platform, not cross-platform duplicates. Cross-platform duplicates (same problem URL pattern on different platforms) are rare since platforms use unique URL schemes.

### Notable Cross-Platform Duplicates (same numeric ID)

| Problem | Platforms | Topics |
|---------|-----------|--------|
| **1725** (CF + CSES + Baekjoon) | Codeforces, CSES, Baekjoon | dp, geometry, math, tree, bit, graph, combinatorics, binary_search, sequences, linear_algebra, advanced_tree, shape, num_methods |
| **2181** (CF + CSES) | Codeforces, CSES | geometry, dp, math, combinatorics, graph, string, binary_search |
| **2206** (CF + CSES + Baekjoon) | Codeforces, CSES, Baekjoon | dp, tree, graph, advanced_tree, math, geometry, combinatorics |
| **1730** (CF + CSES) | Codeforces, CSES | dp, game_theory, string, tree, bit, math, combinatorics, binary_search |
| **1045** (CF + LightOJ + Baekjoon) | Codeforces, LightOJ, Baekjoon | math, string, tree, geometry, greedy, trie, graph, binary_search |
| **1326** (CF + LightOJ) | Codeforces, LightOJ | dp, math, string, tree, geometry, backtrack, trie, bit |
| **1916** (CF + Baekjoon) | Codeforces, Baekjoon | dp, math, tree, geometry, combinatorics, graph, linear_algebra |

This happens because Codeforces uses problem IDs like `1725A`, `1725B` for individual problems, while CSES uses `1725` as a task ID for a different problem entirely — they share numeric IDs but are different problems. True cross-platform duplicates are uncommon.

---

## 2. Same Problem with Different Titles / Wording

### LeetCode duplicates across CSVs

| Title in CSV A | Title in CSV B | Topics |
|----------------|----------------|--------|
| 212. Word Search II | Word Search II | backtrack + trie + graph + string |
| 79. Word Search | Word Search | backtrack + graph + string + shape |
| 200. Number of Islands | Number of Islands | graph + shape |
| 42. Trapping Rain Water | Trapping Rain Water | dp + sliding_window + greedy |
| 10. Regular Expression Matching | Regular Expression Matching | dp + backtrack + string |

The CSV collectors used inconsistent title formats (some with LeetCode IDs like "212. Word Search II", some without). This is a normalization issue in the collection process.

### Codeforces problem name variants

Codeforces problems commonly appear as:
- `1730B - Meeting on the Line` (with contest prefix)
- `Meeting on the Line` (without prefix)

These are exact same problems with different title formatting across CSVs (stored in different topic directories).

---

## 3. Same Problem in Different Categories / Topics

**7,809 problem URLs are reused across multiple topic CSVs.** This is expected — many problems can be solved with multiple techniques.

### Top multi-topic problems

| Problem | Topics Filed Under |
|---------|-------------------|
| **Word Search II** (LeetCode) | backtrack, graph, string, trie, shape, math, linear_algebra |
| **Minimum Notation 1730C** (CF) | dp, linked_list, sliding_window, math, sequences, linear_algebra, miscellaneous |
| **Omkar and Akmar** (CF) | combinatorics, game_theory, math, geometry, backtrack, shape, string |
| **Fixed Prefix Permutations** (CF) | backtrack, binary_search, trie, string, bit, math, sequences |
| **XOR Matrix** (CF) | bit, combinatorics, dp, linear_algebra, math, shape, trie |
| **Kuro and GCD** (CF) | backtrack, binary_search, trie, string, bit, dp, tree, sequences, math |

### Platform-level cross-category pollution

Some platforms were imported with the same generic URL for all problems:
- **POJ**: `poj.org/problem?id=X` — all problems share the same base URL pattern, causing 23-topic cross-listing
- **Timus**: `acm.timus.ru/problem.aspx?space=1&num=X` — same issue
- **TopCoder**: `community.topcoder.com/stat?c=problem_statement&pm=X` — same issue

These are false positives: the URL normalization collapses them to the same base URL. The actual problem IDs differ, but the extractor only preserved the base URL, not the query parameters, for some entries.

---

## 4. Different Problems, Same Solution Pattern

By clustering the **Key Concept** column into canonical solution patterns:

| Solution Pattern | Problems | Example Pairs (different names, same algorithm) |
|-----------------|----------|--------------------------------------------------|
| **Segment Tree** | 3,668 | Range Sum Query, Range Minimum Query, Count Inversions, Order Statistics Tree |
| **Binary Search** | 1,308 | Capacity To Ship Packages, Split Array Largest Sum, Koko Eating Bananas, Find Peak Element |
| **DFS** | 1,305 | Number of Islands, Pacific Atlantic Water Flow, Clone Graph, All Paths From Source |
| **Tree DP** | 721 | Tree Diameter, Tree Height, Max Path Sum, House Robber III |
| **BFS** | 601 | Word Ladder, Rotting Oranges, Shortest Path, Minimum Knight Moves |
| **LIS** | 488 | Longest Increasing Subsequence, Russian Doll Envelopes, Box Stacking |
| **Two Pointers** | 436 | Two Sum II, 3Sum, Container With Most Water, Trapping Rain Water |
| **Sliding Window** | 373 | Longest Substring Without Repeating, Minimum Window Substring, Max Consecutive Ones |
| **Minimum Spanning Tree** | 324 | Kruskal MST, Prim MST, Connect Cities, Minimum Cost to Connect Points |
| **Trie** | 310 | Implement Trie, Word Search II, Palindrome Pairs, Prefix Suffix Search |
| **Union Find** | 237 | Number of Provinces, Accounts Merge, Redundant Connection, Satisfiability of Equations |
| **Topological Sort** | 196 | Course Schedule, Alien Dictionary, Build Order, Minimum Height Trees |
| **Knapsack** | 162 | 0/1 Knapsack, Coin Change, Partition Equal Subset Sum, Target Sum |
| **Fibonacci** | 112 | Fibonacci Number, Climbing Stairs, N-th Tribonacci, Min Cost Climbing Stairs |
| **Dijkstra** | 78 | Network Delay Time, Path With Minimum Effort, Cheapest Flights Within K Stops |
| **LCS** | 17 | Longest Common Subsequence, Edit Distance, Shortest Common Supersequence |

### Classic "Same Solution, Different Problem" Examples

| Algorithm | Problem A | Problem B |
|-----------|-----------|-----------|
| **Fibonacci DP** | 70. Climbing Stairs | 1137. N-th Tribonacci Number |
| **Knapsack DP** | 322. Coin Change | 416. Partition Equal Subset Sum |
| **Sliding Window** | 3. Longest Substring Without Repeating | 209. Minimum Size Subarray Sum |
| **Union Find** | 200. Number of Islands | 547. Number of Provinces |
| **Binary Search** | 875. Koko Eating Bananas | 1011. Capacity To Ship Packages |
| **Topological Sort** | 207. Course Schedule | 210. Course Schedule II |
| **Trie** | 208. Implement Trie | 211. Design Add and Search Words |
| **LIS** | 300. Longest Increasing Subsequence | 354. Russian Doll Envelopes |
| **Dijkstra** | 743. Network Delay Time | 1514. Path with Maximum Probability |
| **BFS/DFS** | 200. Number of Islands | 695. Max Area of Island |

---

## 5. Recommendations for Deduplication

1. **Title normalization**: Strip LeetCode IDs, platform prefixes, and difficulty suffixes from all titles to standardise across CSVs.
2. **URL query param preservation**: Some entries strip query params (`?id=X`), losing the problem distinction on POJ, Timus, and TopCoder.
3. **Cross-topic single problem**: Word Search II appears in 8 topic CSVs — it's accurate (uses backtracking, trie, graph, string) but consolidating into a primary + tags system would be cleaner.
4. **Key Concept canonicalisation**: Map free-text key concepts to a controlled vocabulary (the 18 patterns identified in section 4) for consistent cross-referencing.
