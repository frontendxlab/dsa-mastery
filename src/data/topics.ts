export interface TopicInfo {
  slug: string
  name: string
  description: string
  count: number
  platforms: number
  gradient: string
}

export const topics: TopicInfo[] = [
  {
    slug: 'math',
    name: 'Math',
    description: 'Number theory, combinatorics, geometry, probability',
    count: 9632,
    platforms: 31,
    gradient: 'from-blue-400 to-indigo-500',
  },
  {
    slug: 'dp',
    name: 'Dynamic Programming',
    description: 'Knapsack, LIS, LCS, tree DP, digit DP, DP on graphs',
    count: 4313,
    platforms: 30,
    gradient: 'from-violet-400 to-purple-500',
  },
  {
    slug: 'binary_search',
    name: 'Binary Search',
    description: 'Classic BS, BS on answer, ternary search, bitonic arrays',
    count: 3709,
    platforms: 26,
    gradient: 'from-emerald-400 to-teal-500',
  },
  {
    slug: 'string',
    name: 'String',
    description: 'KMP, Z-algo, suffix array, palindrome, pattern matching, LCS',
    count: 3426,
    platforms: 36,
    gradient: 'from-rose-400 to-pink-500',
  },
  {
    slug: 'bit',
    name: 'Bit Manipulation',
    description: 'XOR tricks, bitmask DP, subsets, bit hacks, gray code',
    count: 2868,
    platforms: 28,
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    slug: 'tree',
    name: 'Tree',
    description: 'Binary tree, BST, traversal, LCA, diameter, n-ary trees',
    count: 2714,
    platforms: 25,
    gradient: 'from-green-400 to-emerald-500',
  },
  {
    slug: 'graph',
    name: 'Graph',
    description: 'BFS, DFS, Dijkstra, MST, topological sort, SCC, flow',
    count: 1290,
    platforms: 24,
    gradient: 'from-cyan-400 to-sky-500',
  },
  {
    slug: 'linked_list',
    name: 'Linked List',
    description: 'Singly/doubly LL, cycle detection, merge, reverse, sort',
    count: 1135,
    platforms: 20,
    gradient: 'from-fuchsia-400 to-pink-500',
  },
  {
    slug: 'advanced_tree',
    name: 'Advanced Tree',
    description: 'Fenwick/BIT, segment tree, sqrt decomp, Mo\'s algo, treap',
    count: 924,
    platforms: 24,
    gradient: 'from-lime-400 to-green-500',
  },
  {
    slug: 'sliding_window',
    name: 'Sliding Window',
    description: 'Fixed/variable size windows, two pointers, deque optimization',
    count: 610,
    platforms: 37,
    gradient: 'from-yellow-400 to-amber-500',
  },
  {
    slug: 'heap',
    name: 'Heap / Priority Queue',
    description: 'Min/max heap, top K, median, merge K sorted, Huffman',
    count: 496,
    platforms: 29,
    gradient: 'from-red-400 to-rose-500',
  },
  {
    slug: 'shape',
    name: 'Shape / Matrix',
    description: 'Matrix traversal, rotation, spiral, 2D arrays, grid geometry',
    count: 331,
    platforms: 14,
    gradient: 'from-indigo-400 to-violet-500',
  },
  {
    slug: 'backtrack',
    name: 'Backtracking',
    description: 'Permutations, combinations, subsets, N-queens, constraint SAT',
    count: 325,
    platforms: 18,
    gradient: 'from-teal-400 to-cyan-500',
  },
  {
    slug: 'trie',
    name: 'Trie',
    description: 'Prefix tree, dictionary, auto-complete, XOR max pair',
    count: 158,
    platforms: 17,
    gradient: 'from-sky-400 to-blue-500',
  },
]

export const totalProblems = topics.reduce((s, t) => s + t.count, 0)
export const uniquePlatforms = Math.max(...topics.map(t => t.platforms))
