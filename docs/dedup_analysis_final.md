
# Deduplication & Cross-Reference Analysis — Final

**38,586 problems** across 23 topic CSVs, 50+ platforms.

_Earlier versions: `dedup_analysis.md`, `dedup_analysis_precise.md`_
---


## 1. Cross-Platform Duplicates (same problem on different OJs)

**1,041 problems** found on 2+ platforms (filtered for generic names).

| # | Problem | Platforms | Topics | Entry Count |
|---|---------|----------|--------|------------|
| 1 | Range Minimum Query | 13 | advanced_tree, sequences, tree | 16 |
| 2 | Convex Hull | 12 | geometry, shape | 13 |
| 3 | Point in Polygon | 11 | geometry, math, shape | 11 |
| 4 | Maximum Subarray Sum | 10 | binary_search, math, num_methods, scheduling | 19 |
| 5 | 231. Power of Two | 10 | bit, math | 12 |
| 6 | 7469. K-th Number | 9 | binary_search, math, sequences | 10 |
| 7 | Level Order Traversal | 9 | tree | 9 |
| 8 | 3. Longest Substring Without Repeating Characters | 8 | math, sliding_window, string | 13 |
| 9 | 5. Longest Palindromic Substring | 8 | binary_search, dp, math, string | 11 |
| 10 | 33. Search in Rotated Sorted Array | 8 | binary_search, math, num_methods | 10 |
| 11 | Range Sum Query | 8 | advanced_tree, sequences, tree | 9 |
| 12 | Polygon Area | 8 | geometry, shape | 8 |
| 13 | Fenwick Tree | 7 | advanced_tree, bit, math, sequences | 10 |
| 14 | Binary Search | 7 | binary_search, math, num_methods | 10 |
| 15 | 162. Find Peak Element | 7 | binary_search, num_methods | 9 |
| 16 | Subarray Sum | 7 | dp, math, sequences, sliding_window | 8 |
| 17 | 491. Palindrome Number | 7 | math | 7 |
| 18 | Sum of Digits | 7 | math | 7 |
| 19 | Josephus Problem | 6 | binary_search, linked_list, math, miscellaneous | 11 |
| 20 | 32. Minimum Window Substring | 6 | math, sequences, sliding_window, string | 10 |
| 21 | 14. Longest Common Prefix | 6 | math, string, trie | 9 |
| 22 | 260. Stone Game | 6 | bit, dp, game_theory, math | 9 |
| 23 | Fibonacci Numbers | 6 | backtrack, dp, linear_algebra, math | 9 |
| 24 | 223. Rectangle Area | 6 | geometry, math, shape | 8 |
| 25 | "Binomial Coefficients | 6 | combinatorics, math, num_methods | 8 |
| 26 | 292. Nim Game | 6 | bit, game_theory, math | 7 |
| 27 | Maximum Sum | 6 | advanced_tree, dp, math, sliding_window | 7 |
| 28 | Triangle Area | 6 | geometry, math | 7 |
| 29 | 24. Swap Nodes in Pairs | 6 | linked_list, math | 7 |
| 30 | 875. Koko Eating Bananas | 6 | binary_search, num_methods | 7 |

_Top duplicated: range minimum query on 13 platforms_


## ### Top 5 Most Cross-Listed Problems


**Range Minimum Query**
- Platforms (13): AOJ, AtCoder, DMOJ, E-Olymp, GeeksforGeeks, HackerEarth, HackerRank, InterviewBit, Kattis, SPOJ, TopCoder, Toph, USACO
- Topics (3): advanced_tree, sequences, tree

**Convex Hull**
- Platforms (12): Baekjoon, CSES, Codewars, DMOJ, E-Olymp, HackerEarth, InterviewBit, Kattis, LightOJ, LintCode, SPOJ, Toph
- Topics (2): geometry, shape

**Point in Polygon**
- Platforms (11): Baekjoon, CSES, CodeAbbey, Codewars, E-Olymp, HackerEarth, Kattis, LightOJ, LintCode, SPOJ, Toph
- Topics (3): geometry, math, shape

**Maximum Subarray Sum**
- Platforms (10): CSES, CodeChef, Codeforces, Codewars, Coding Ninjas, CodingBlocks, HackerBlocks, HackerRank, Kattis, Scaler
- Topics (6): binary_search, math, num_methods, scheduling, sequences, sliding_window
- Name variants: "Maximum Subarray Sum", "Maximum subarray sum"

**231. Power of Two**
- Platforms (10): CSES, CodeChef, Codewars, Coding Ninjas, E-Olymp, GeeksforGeeks, HackerEarth, HackerRank, LeetCode, Toph
- Topics (2): bit, math
- Name variants: "231. Power of Two", "Power of Two", "Power of two"

## 2. Title & Naming Inconsistencies


## ### 2a. Same LeetCode ID → Different Titles (collection errors)

Problems where the same LeetCode problem ID maps to different title strings across CSVs — likely copy-paste errors during collection.

| LeetCode # | Title Variants | Filed In Topics |
|-----------|---------------|----------------|
| 212 | Word Search II | string, trie, graph, shape, linear_algebra |
| 3559 | Minimum Number of Valid Strings to Form  / Number of Ways to Assign Edge Weights II | string, trie, sequences, advanced_tree, dp |
| 1631 | Number of Sub-arrays With Odd Sum / Path With Minimum Effort | graph, sequences, greedy, math, linear_algebra |
| 1787 | Sum of Absolute Differences in a Sorted  / Make the XOR of All Segments Equal to Ze | sequences, bit, dp, math, linear_algebra |
| 2002 | Maximum Product of the Length of Two Pal / Stone Game VIII | sequences, bit, math, dp, backtrack |
| 2008 | Minimum Cost to Change the Final Value o / Maximum Earnings From Taxi | string, greedy, scheduling, math, dp |
| 2187 | Vowels of All Substrings / Minimum Time to Complete Trips | string, scheduling, math, combinatorics, num_methods |
| 2571 | Minimum Operations to Reduce an Integer  / Find the Pivot Integer | sequences, greedy, bit, math, dp |
| 79 | Word Search | string, graph, shape, linear_algebra, backtrack |
| 2375 | Construct Smallest Number From DI String / Minimum Obstacle Removal to Reach Corner | linked_list, shape, greedy, heap, backtrack |
| 140 | Word Break II | string, trie, dp, backtrack |
| 3238 | Find the Number of Winning Players / Minimum Cost to Convert String II | string, trie, greedy, bit |
| 89 | Gray Code | math, linear_algebra, bit, backtrack |
| 294 | Flip Game II | game_theory, math, dp, backtrack |
| 390 | Elimination Game | game_theory, linked_list, math, miscellaneous |
| 464 | Can I Win | game_theory, math, dp, bit |
| 873 | Guess the Word / Length of Longest Fibonacci Subsequence | string, math, linear_algebra, dp |
| 1014 | Best Sightseeing Pair / K Closest Points to Origin | heap, math, dp, geometry |
| 1349 | Check If It Is a Straight Line / Maximum Students Taking Exam | math, dp, bit, geometry |
| 1255 | Reverse Subarray To Maximize Array Value / Maximum Score Words Formed by Letters | math, dp, bit, backtrack |
| 1477 | Product of the Last K Numbers / Find Two Non-overlapping Sub-arrays Each | sequences, math, dp, sliding_window |
| 1461 | Check If a String Contains All Binary Co / Count All Valid Pickup and Delivery Opti | math, combinatorics, bit, sliding_window |
| 1345 | Jump Game IV / Perform String Shifts | string, math, graph, greedy |
| 1563 | Stone Game V / Maximum Number of Darts Inside of a Circ | game_theory, math, dp, geometry |
| 1728 | Cat and Mouse II / Fancy Sequence | sequences, math, advanced_tree, dp |

## ### 2b. Same Problem → Different LeetCode IDs

The same core problem appears with 2+ different LeetCode problem numbers — one is likely wrong.

| Problem | LeetCode IDs | Filed In |
|---------|------------|----------|
| 0914. Random Point in Non-overlapping Rectangles | 497, 914, 0914 | math, num_methods, sequences |
| 912. Random Pick with Weight | 528, 0912, 912 | math, num_methods, sequences |
| 909. Stone Game | 260, 877, 909 | dp, game_theory, math |
| 550. Divisor Game | 550, 1025, 1086 | dp, game_theory, math |
| 1240. Stone Game II | 325, 1140, 1240 | dp, game_theory, math, sequences |
| 1406. Stone Game III | 366, 1406, 1522 | dp, game_theory, math |
| 1510. Stone Game IV | 870, 1510, 1617 | dp, game_theory, math |
| 762. Longest Common Subsequence | 762, 1143, 1250 | dp, math, string |
| 2711. Minimum Time to Visit a Cell In a Grid | 2577, 2711, 3386 | bit, graph, heap, shape |
| 3130. Find All Possible Stable Binary Arrays I | 3129, 3130, 3406 | dp, greedy, sequences, sliding_window |
| 3475. Minimum Operations to Make Binary Array Elem | 3191, 3192, 3475 | bit, greedy, sequences, sliding_window |
| 3117. Minimum Sum of Values by Dividing Array | 3117, 3132, 3364 | advanced_tree, dp, greedy, sequences |
| 862. Shortest Subarray with Sum at Least K | 862, 892, 0892 | heap, sequences, sliding_window |
| 903. Valid Permutations for DI Sequence | 903, 0939, 939 | dp, sequences, string |
| 1294. Range Frequency Queries | 1294, 2080 | advanced_tree, sequences, trie |
| 3329. Find the Length of the Longest Common Prefix | 3043, 3329 | string, trie |
| 2494. Sum of Prefix Scores of Strings | 2416, 2494 | string, trie |
| 3376. Longest Common Suffix Queries | 3093, 3376 | string, trie |
| 2185. Counting Words With a Given Prefix | 2185, 2292 | string, trie |
| 3045. Count Prefix and Suffix Pairs II | 3045, 3305 | string, trie |

## 3. Potential Collection Errors (one problem → many unrelated topics)

Problems that appear in 5+ different topic CSVs on the same platform — likely swept in by a broad tag.

| Platform | Problem | Topics Filed Under |
|----------|---------|-------------------|
| Baekjoon | 생태학 | string, trie, graph, shape, sequences, tree, bit, binary_search, linked_list, greedy, heap, math, dp, backtrack, num_methods |
| Baekjoon | 피보나치 수 2 | string, tree, shape, graph, sequences, binary_search, greedy, math, dp, backtrack, num_methods |
| Baekjoon | 숨바꼭질 3 | string, graph, shape, sequences, greedy, heap, dp, backtrack, num_methods |
| LeetCode | 212. Word Search II | string, trie, graph, shape, tree, linear_algebra, math, backtrack |
| Codeforces | Fixed Prefix Permutations | string, trie, sequences, bit, binary_search, math, backtrack |
| Baekjoon | 피보나치 수 5 | sequences, shape, greedy, math, dp, backtrack, num_methods |
| LeetCode | 3559. Minimum Number of Valid Strings to Form Target I | string, trie, sequences, advanced_tree, binary_search, dp |
| LeetCode | Word Search | string, graph, shape, linear_algebra, math, backtrack |
| Baekjoon | 팩토리얼 0의 개수 | sequences, binary_search, greedy, math, backtrack, num_methods |
| LeetCode | 1631. Path With Minimum Effort | graph, shape, linear_algebra, binary_search, greedy, heap |
| Baekjoon | 골목 대장 호석 - 효율성 1 | tree, sequences, graph, shape, dp, backtrack |
| LeetCode | 1268. Search Suggestions System | string, trie, tree, binary_search, heap |
| LeetCode | 1310. XOR Queries of a Subarray | trie, sequences, bit, linear_algebra, math |
| LeetCode | 2271. Maximum White Tiles Covered by a Carpet | trie, sequences, scheduling, binary_search, sliding_window |
| LeetCode | 2935. Maximum Strong Pair XOR II | trie, bit, linear_algebra, binary_search, sliding_window |
| Codeforces | Kuro and GCD and XOR and SUM | trie, sequences, bit, binary_search, math |
| Codeforces | XOR and Triangle | trie, shape, bit, math, geometry |
| LeetCode | 808. Number of Matching Subsequences | string, trie, binary_search, miscellaneous, dp |
| LeetCode | 3536. Find the Count of Monotonic Pairs II | sequences, greedy, math, dp, combinatorics |
| LeetCode | 3637. Count Number of Balanced Permutations | string, dp, linked_list, math, combinatorics |

### Notable over-classified examples:

- **생태학** (on Baekjoon): filed under **15 topics** — string, trie, graph, shape, sequences, tree, bit, binary_search, linked_list, greedy, heap, math, dp, backtrack, num_methods
- **피보나치 수 2** (on Baekjoon): filed under **11 topics** — string, tree, shape, graph, sequences, binary_search, greedy, math, dp, backtrack, num_methods

## 4. Same Solution Pattern — Different Problems

Problems grouped by shared algorithmic technique:

- **DFS / Backtracking**: 1321 unique problems
  - [LeetCode] 720. Longest Word in Dictionary, [LeetCode] 472. Concatenated Words, [LeetCode] 140. Word Break II, [LeetCode] 212. Word Search II, [LeetCode] 1938. Maximum Genetic Difference Query, [GeeksforGeeks] Phone Directory (Contacts Search)
- **Segment Tree / Fenwick**: 1020 unique problems
  - [LeetCode] Find a Value of a Mysterious Function Closest, [LeetCode] Range Sum Query 2D - Mutable, [LeetCode] Queries on a Permutation With Key, [LeetCode] 3315. Maximum Number of Intersections on the , [LeetCode] 3681. Maximum Area Rectangle With Point Const, [LeetCode] 3689. Maximum Area Rectangle With Point Const
- **Binary Search (on answer)**: 894 unique problems
  - [AtCoder] Three Days Ago, [AtCoder] (K+1)-th Largest Number, [AtCoder] (∀x∀), [AtCoder] *3 or /2, [AtCoder] -- - B, [AtCoder] . (Single Dot)
- **Tree DP**: 828 unique problems
  - [LintCode] 535. House Robber III, [LintCode] 717. Tree Longest Path With Same Value, [CSES] Tree Distances I, [CSES] Tree Distances II, [LightOJ] 1094 - Farthest Nodes in a Tree, [LeetCode] 2246. Longest Path With Different Adjacent Ch
- **Bitmask DP**: 494 unique problems
  - [AtCoder] ABC 318 D - General Weighted Max Matching, [LightOJ] 1406 - Assassin's Creed, [AtCoder] ABC278 F - Shiritori, [LeetCode] 3276. Select Cells in Grid With Maximum Score, [AtCoder] DP O - Matching, [AtCoder] DP U - Grouping
- **BFS**: 481 unique problems
  - [GeeksforGeeks] Jumping Numbers, [Kattis] Primepath, [SPOJ] Prime Path, [LintCode] 611. Knight Shortest Path, [LintCode] 663. Walls and Gates, [LeetCode] Shortest Path Visiting All Nodes
- **LIS**: 482 unique problems
  - [LintCode] 450. Reverse Nodes in k-Group, [LintCode] 451. Swap Nodes in Pairs, [LintCode] 452. Remove Linked List Elements, [LeetCode] Design Most Recently Used Queue, [LeetCode] Merge Nodes in Between Zeros, [LeetCode] Remove Nth Node From End of List
- **Two Pointers**: 414 unique problems
  - [GeeksforGeeks] Container With Most Water, [Interview Cake] Merge Sorted Arrays, [Pramp] Time Planner, [SPOJ] Hotels, [LintCode] 608. Two Sum II, [LintCode] 609. Two Sum - Less than or equal to target
- **Sliding Window**: 428 unique problems
  - [LeetCode] 2271. Maximum White Tiles Covered by a Carpet, [LeetCode] 2935. Maximum Strong Pair XOR II, [Pramp] Smallest Substring of All Characters, [LeetCode] Repeated DNA Sequences, [LeetCode] Minimum Number of K Consecutive Bit Flips, [LeetCode] Binary String With Substrings Representing 1 
- **MST**: 358 unique problems
  - [HackerRank] Leonardo's Prime Factors, [HackerRank] Primitive Problem, [HackerRank] Identify Smith Numbers, [HackerRank] Twins, [CodeChef] Hackerman, [CodeChef] Add Smallest Prime Factor
- **Trie**: 340 unique problems
  - [LeetCode] 208. Implement Trie (Prefix Tree), [LeetCode] 1804. Implement Trie II (Prefix Tree) (Premiu, [LeetCode] 211. Design Add and Search Words Data Structu, [LeetCode] 676. Implement Magic Dictionary, [LeetCode] 677. Map Sum Pairs, [LeetCode] 1166. Design File System (Premium)
- **Union Find / DSU**: 306 unique problems
  - [Codeforces] Sakurako  Kosuke  and the Permutation, [Codeforces] Prufer Vertex, [Codeforces] Large Graph, [Codeforces] GCD and MST, [Codeforces] GCD Counting, [Codeforces] SUM and REPLACE
- **Matrix Exponentiation**: 190 unique problems
  - [CSES] Fibonacci Numbers, [CSES] Graph Paths I, [CSES] Graph Paths II, [GeeksforGeeks] Generalised Fibonacci numbers, [SPOJ] FIBOSUM - Fibonacci Sum, [Codeforces] 1182E - Product Oriented Recurrence
- **Knapsack DP**: 177 unique problems
  - [LightOJ] Just another Robbery, [SPOJ] PIGBANK - Piggy Bank, [Kattis] Patuljci, [Codewars] Counting Change Combinations, [SPOJ] Party, [LintCode] 730. Sum of All Subsets
- **GCD / Euclidean**: 123 unique problems
  - [HackerRank] Sherlock and GCD, [CodeChef] Apples and Oranges, [CodeChef] Cutting Recipes, [CodeChef] Dazzling GCD Pair, [CodeChef] Luigi and Uniformity, [CodeChef] The Hardest GCD Problem
- **Fibonacci DP**: 105 unique problems
  - [AtCoder] Fibonacci: Revisited, [AtCoder] Fibonacci Product, [AtCoder] Fibonacci Reversed, [AtCoder] Fibonacci String, [GeeksforGeeks] Nth Fibonacci Number, [GeeksforGeeks] Ways to Reach the n'th Stair
- **Dijkstra**: 96 unique problems
  - [LeetCode] 1631. Path With Minimum Effort, [CSES] Shortest Routes I, [LeetCode] Minimum Cost of a Path With Special Roads, [LeetCode] Path With Minimum Effort, [SPOJ] SHPATH - The Shortest Path, [LeetCode] Minimum Time to Visit a Cell in a Grid
- **Topological Sort**: 66 unique problems
  - [LeetCode] 2115. Find All Possible Recipes from Given Su, [LeetCode] Longest Increasing Path in a Matrix, [LeetCode] Design Excel Sum Formula, [LeetCode] 207. Course Schedule, [LeetCode] 210. Course Schedule II, [LeetCode] 269. Alien Dictionary
- **LCS / Edit Distance**: 56 unique problems
  - [SPOJ] CRSCNTRY - Cross Country, [HackerRank] Common Child, [AtCoder] Tessoku B21 - Longest Subpalindrome, [Baekjoon] 문자열 비교하기, [Baekjoon] LCS 3, [AOJ] Longest Common Subsequence

## ### Classic Algorithmic Equivalence Pairs


- **70. Climbing Stairs** ≈ **1137. N-th Tribonacci Number**
  - Pattern: Fibonacci DP
  - Why: Same 1D DP recurrence fib(n) = fib(n-1) + fib(n-2). Just different base cases and number of terms.

- **322. Coin Change** ≈ **416. Partition Equal Subset Sum**
  - Pattern: Knapsack DP
  - Why: Both ask: can we reach a target sum using given numbers? One minimizes count, other checks feasibility.

- **300. Longest Increasing Subsequence** ≈ **354. Russian Doll Envelopes**
  - Pattern: LIS
  - Why: Russian Doll is LIS in 2D — sort by width, then find LIS on height.

- **875. Koko Eating Bananas** ≈ **1011. Capacity To Ship Packages Within D Days**
  - Pattern: Binary Search on Answer
  - Why: Same feasibility-check pattern: binary search the rate/capacity, greedily verify.

- **207. Course Schedule** ≈ **210. Course Schedule II**
  - Pattern: Topological Sort
  - Why: Same dependency graph. One just checks if acyclic, the other builds the order.

- **1. Two Sum** ≈ **15. 3Sum**
  - Pattern: Two Pointers
  - Why: 3Sum = Two Sum + one more loop. Sorting + two-pointer reduces O(n³) to O(n²).

- **208. Implement Trie** ≈ **211. Design Add and Search Words**
  - Pattern: Trie
  - Why: Same prefix tree — second adds wildcard '.' matching on search.

- **200. Number of Islands** ≈ **695. Max Area of Island**
  - Pattern: BFS/DFS
  - Why: Same grid traversal. One counts components, other tracks component size.

- **743. Network Delay Time** ≈ **1514. Path with Maximum Probability**
  - Pattern: Dijkstra
  - Why: Both Dijkstra on directed graph. One minimizes sum, other maximizes product (log transform).

- **307. Range Sum Query** ≈ **315. Count of Smaller Numbers After Self**
  - Pattern: Fenwick Tree
  - Why: Same BIT structure. Range query vs inversion count — just different traversal order.

- **46. Permutations** ≈ **51. N-Queens**
  - Pattern: DFS / Backtracking
  - Why: Same backtracking template: place, recurse, un-place. Different pruning logic.

- **3. Longest Substring Without Repeating** ≈ **209. Minimum Size Subarray Sum**
  - Pattern: Sliding Window
  - Why: Variable window expanding right, shrinking left. Different shrink conditions.

## 5. Data Quality Statistics

### Platforms with highest multi-topic rate (same problem → many topic CSVs)

| Platform | Total Problems | Multi-Topic Entries | % Overlap |
|----------|---------------|-------------------|-----------|
| Codeforces | 15,615 | 8,085 | 52% |
| LeetCode | 5,558 | 4,027 | 72% |
| Baekjoon | 1,520 | 1,048 | 69% |
| AtCoder | 3,645 | 1,006 | 28% |
| CSES | 741 | 466 | 63% |
| LightOJ | 668 | 237 | 35% |
| HackerRank | 802 | 190 | 24% |
| Project Euler | 1,205 | 148 | 12% |
| GeeksforGeeks | 2,131 | 133 | 6% |
| SPOJ | 829 | 132 | 16% |

### Cross-platform summary

- **1,041** problems on 2+ different platforms (after filtering noise)
- **6,278** records are the same problem filed under multiple topic CSVs
- **1,168** LeetCode IDs have title conflicts across CSVs
- **719** problems have 2+ different LeetCode ID numbers assigned
- **56** problem+topic groups are likely over-classified (5+ topics)
- **19** algorithmic patterns identified covering key concepts

### Top platforms by duplicate/internal overlap:

- Codeforces: 15,615 entries → 11,427 unique (27% duplicate)
- LeetCode: 5,558 entries → 4,464 unique (20% duplicate)
- AtCoder: 3,645 entries → 3,166 unique (13% duplicate)
- GeeksforGeeks: 2,131 entries → 2,021 unique (5% duplicate)
- Baekjoon: 1,520 entries → 1,267 unique (17% duplicate)
- Project Euler: 1,205 entries → 1,199 unique (0% duplicate)
- SPOJ: 829 entries → 763 unique (8% duplicate)
- HackerRank: 802 entries → 642 unique (20% duplicate)
- HackerEarth: 801 entries → 766 unique (4% duplicate)
- CSES: 741 entries → 461 unique (38% duplicate)
