// ─── Article content type system ──────────────────────────────────────────────

export type Intuition = {
  label: string
  explanation: string
  code?: string
  lang?: string
  codeCaption?: string
}

export type Section =
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'text'; content: string }
  | { type: 'callout'; icon: string; color: 'teal' | 'green' | 'amber' | 'red' | 'blue' | 'gray'; content: string }
  | { type: 'code'; lang: string; code: string; caption?: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'problem'; num: number; title: string; url: string; difficulty: 'Easy' | 'Medium' | 'Hard' | 'N/A'; intuitions: Intuition[]; note?: string }
  | { type: 'variation'; title: string; baseCode: string; variants: { problem: string; url: string; change: string; why: string }[] }
  | { type: 'divider' }
  | { type: 'list'; items: string[] }

export interface Article {
  slug: string
  title: string
  emoji: string
  tagline: string
  description: string
  gradient: string
  topicSlug: string
  readTime: string
  sections: Section[]
}

// ─── Article registry ──────────────────────────────────────────────────────────

import { slidingWindowArticle } from './content/sliding-window'
import { twoPointersArticle } from './content/two-pointers'
import { binarySearchArticle } from './content/binary-search'
import { graphArticle } from './content/graph'
import { dpArticle } from './content/dynamic-programming'
import { treesArticle } from './content/trees'
import { linkedListArticle } from './content/linked-list'
import { backtrackingArticle } from './content/backtracking'
import { greedyArticle } from './content/greedy'
import { bitManipulationArticle } from './content/bit-manipulation'
import { heapArticle } from './content/heap'
import { trieArticle } from './content/trie'
import { mathArticle } from './content/math'
import { stringArticle } from './content/string-algorithms'
import { sequencesArticle } from './content/sequences'
import { matrixArticle } from './content/matrix'
import { monotonicStackArticle } from './content/monotonic-stack'
import { advancedTreesArticle } from './content/advanced-trees'
import { combinatoricsArticle } from './content/combinatorics'
import { gameTheoryArticle } from './content/game-theory'
import { geometryArticle } from './content/geometry'
import { linearAlgebraArticle } from './content/linear-algebra'
import { schedulingArticle } from './content/scheduling'
import { shapesArticle } from './content/shapes'
import { miscellaneousArticle } from './content/miscellaneous'
import { numericalMethodsArticle } from './content/numerical-methods'
import { bfsVsDfsArticle } from './content/bfs-vs-dfs'
import { intervalProblemsArticle } from './content/interval-problems'
import { dpOnTreesArticle } from './content/dp-on-trees'
import { unionFindArticle } from './content/union-find'
import { prefixSumArticle } from './content/prefix-sum'
import { stringMatchingArticle } from './content/string-matching'
import { hashmapPatternsArticle } from './content/hashmap-patterns'
import { stackQueueArticle } from './content/stack-queue'
import { shortestPathArticle } from './content/shortest-path'
import { bitmaskDpArticle } from './content/bitmask-dp'
import { numberTheoryArticle } from './content/number-theory'
import { digitDpArticle } from './content/digit-dp'
import { divideConquerArticle } from './content/divide-conquer'
import { designPatternsArticle } from './content/design-patterns'
import { intervalDpArticle } from './content/interval-dp'
import { gridDpArticle } from './content/grid-dp'
import { stringDpArticle } from './content/string-dp'
import { knapsackDpArticle } from './content/knapsack-dp'
import { stateMachineDpArticle } from './content/state-machine-dp'
import { probabilityDpArticle } from './content/probability-dp'
import { sparseTableArticle } from './content/sparse-table'
import { countingPatternsArticle } from './content/counting-patterns'
import { graphAdvancedArticle } from './content/graph-advanced'
import { twoSumFamilyArticle } from './content/two-sum-family'
import { palindromePatternsArticle } from './content/palindrome-patterns'
import { sortingAlgorithmsArticle } from './content/sorting-algorithms'
import { bipartiteArticle } from './content/bipartite'
import { segmentTreeLazyArticle } from './content/segment-tree-lazy'
import { recursionMemoizationArticle } from './content/recursion-memoization'
import { cycleDetectionArticle } from './content/cycle-detection'

export const articles: Article[] = [
  slidingWindowArticle,
  twoPointersArticle,
  binarySearchArticle,
  graphArticle,
  dpArticle,
  treesArticle,
  linkedListArticle,
  backtrackingArticle,
  greedyArticle,
  bitManipulationArticle,
  heapArticle,
  trieArticle,
  mathArticle,
  stringArticle,
  sequencesArticle,
  matrixArticle,
  monotonicStackArticle,
  advancedTreesArticle,
  combinatoricsArticle,
  gameTheoryArticle,
  geometryArticle,
  linearAlgebraArticle,
  schedulingArticle,
  shapesArticle,
  miscellaneousArticle,
  numericalMethodsArticle,
  bfsVsDfsArticle,
  intervalProblemsArticle,
  dpOnTreesArticle,
  unionFindArticle,
  prefixSumArticle,
  stringMatchingArticle,
  hashmapPatternsArticle,
  stackQueueArticle,
  shortestPathArticle,
  bitmaskDpArticle,
  numberTheoryArticle,
  digitDpArticle,
  divideConquerArticle,
  designPatternsArticle,
  intervalDpArticle,
  gridDpArticle,
  stringDpArticle,
  knapsackDpArticle,
  stateMachineDpArticle,
  probabilityDpArticle,
  sparseTableArticle,
  countingPatternsArticle,
  graphAdvancedArticle,
  twoSumFamilyArticle,
  palindromePatternsArticle,
  sortingAlgorithmsArticle,
  bipartiteArticle,
  segmentTreeLazyArticle,
  recursionMemoizationArticle,
  cycleDetectionArticle,
]

export function getArticle(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug)
}
