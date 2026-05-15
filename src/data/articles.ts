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
import { kthElementArticle } from './content/kth-element'
import { arrayTricksArticle } from './content/array-tricks'
import { treeConstructionArticle } from './content/tree-construction'
import { gridPatternsArticle } from './content/grid-patterns'
import { coordinateCompressionArticle } from './content/coordinate-compression'
import { simulationArticle } from './content/simulation'
import { monotonicQueueArticle } from './content/monotonic-queue'
import { topologicalSortArticle } from './content/topological-sort'
import { minimumSpanningTreeArticle } from './content/minimum-spanning-tree'
import { stringHashingArticle } from './content/string-hashing'
import { twoHeapsArticle } from './content/two-heaps'
import { networkFlowArticle } from './content/network-flow'
import { meetInMiddleArticle } from './content/meet-in-middle'
import { convexHullTrickArticle } from './content/convex-hull-trick'
import { fenwickTreeArticle } from './content/fenwick-tree'
import { suffixArrayArticle } from './content/suffix-array'
import { heavyLightDecompositionArticle } from './content/heavy-light-decomposition'
import { randomizedAlgorithmsArticle } from './content/randomized-algorithms'
import { eulerTourArticle } from './content/euler-tour'
import { moAlgorithmArticle } from './content/mo-algorithm'
import { xorBasisArticle } from './content/xor-basis'
import { eulerPathArticle } from './content/euler-path'
import { matrixExponentiationArticle } from './content/matrix-exponentiation'
import { ahoCorasickArticle } from './content/aho-corasick'
import { centroidDecompositionArticle } from './content/centroid-decomposition'
import { lineSweepArticle } from './content/line-sweep'
import { bracketSequencesArticle } from './content/bracket-sequences'
import { differenceArrayArticle } from './content/difference-array'
import { contributionTechniqueArticle } from './content/contribution-technique'
import { divideConquerDpArticle } from './content/divide-conquer-dp'
import { lcaArticle } from './content/lca'
import { dsuOnTreeArticle } from './content/dsu-on-tree'
import { sqrtDecompositionArticle } from './content/sqrt-decomposition'
import { persistentSegmentTreeArticle } from './content/persistent-segment-tree'
import { zFunctionArticle } from './content/z-function'
import { ternarySearchArticle } from './content/ternary-search'
import { treapArticle } from './content/treap'
import { fftArticle } from './content/fft'
import { manachersArticle } from './content/manachers'
import { convexHullArticle } from './content/convex-hull'
import { spragueGrundyArticle } from './content/sprague-grundy'
import { chineseRemainderArticle } from './content/chinese-remainder'
import { suffixAutomatonArticle } from './content/suffix-automaton'
import { twoSatArticle } from './content/two-sat'
import { inclusionExclusionArticle } from './content/inclusion-exclusion'
import { bridgesArticulationArticle } from './content/bridges-articulation'
import { binarySearchAnswerArticle } from './content/binary-search-answer'
import { catalanNumbersArticle } from './content/catalan-numbers'
import { josephusArticle } from './content/josephus'
import { sieveVariantsArticle } from './content/sieve-variants'
import { permutationPatternsArticle } from './content/permutation-patterns'
import { burnsideLemmaArticle } from './content/burnside-lemma'
import { grayCodeArticle } from './content/gray-code'
import { amortizedPatternsArticle } from './content/amortized-patterns'
import { expressionParsingArticle } from './content/expression-parsing'
import { treeDiameterArticle } from './content/tree-diameter'
import { offlineCdqArticle } from './content/offline-cdq'
import { bitsetOperationsArticle } from './content/bitset-operations'
import { minCostFlowArticle } from './content/min-cost-flow'
import { slopeTrickArticle } from './content/slope-trick'
import { palindromeAutomatonArticle } from './content/palindrome-automaton'
import { gaussianGf2Article } from './content/gaussian-gf2'
import { trieXorArticle } from './content/trie-xor'
import { lucasTheoremArticle } from './content/lucas-theorem'
import { offlineLcaArticle } from './content/offline-lca'
import { flowLowerBoundsArticle } from './content/flow-lower-bounds'
import { bidirectionalBfsArticle } from './content/bidirectional-bfs'
import { segmentTreeBeatsArticle } from './content/segment-tree-beats'
import { aStarSearchArticle } from './content/a-star-search'
import { stringRotationsArticle } from './content/string-rotations'
import { differenceConstraintsArticle } from './content/difference-constraints'
import { treeIsomorphismArticle } from './content/tree-isomorphism'
import { lyndonFactorizationArticle } from './content/lyndon-factorization'
import { balancedDpArticle } from './content/balanced-dp'
import { profileDpArticle } from './content/profile-dp'
import { latticePathsArticle } from './content/lattice-paths'
import { functionalGraphsArticle } from './content/functional-graphs'
import { advancedCountingDpArticle } from './content/advanced-counting-dp'
import { wordBreakVariantsArticle } from './content/word-break-variants'
import { rotatingCalipersArticle } from './content/rotating-calipers'
import { matchingFlowArticle } from './content/matching-flow'
import { shortestSupersequenceArticle } from './content/shortest-supersequence'
import { aliensTrickArticle } from './content/aliens-trick'
import { persistentUnionFindArticle } from './content/persistent-union-find'
import { graphColoringArticle } from './content/graph-coloring'
import { arithmeticDpArticle } from './content/arithmetic-dp'
import { kadaneVariantsArticle } from './content/kadane-variants'
import { subsequenceCountingArticle } from './content/subsequence-counting'
import { slidingWindowAdvancedArticle } from './content/sliding-window-advanced'
import { twoPointerAdvancedArticle } from './content/two-pointer-advanced'
import { carryDpArticle } from './content/carry-dp'
import { randomWalkArticle } from './content/random-walk'
import { stringConstructionArticle } from './content/string-construction'
import { topkStreamingArticle } from './content/topk-streaming'

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
  kthElementArticle,
  arrayTricksArticle,
  treeConstructionArticle,
  gridPatternsArticle,
  coordinateCompressionArticle,
  simulationArticle,
  monotonicQueueArticle,
  topologicalSortArticle,
  minimumSpanningTreeArticle,
  stringHashingArticle,
  twoHeapsArticle,
  networkFlowArticle,
  meetInMiddleArticle,
  convexHullTrickArticle,
  fenwickTreeArticle,
  suffixArrayArticle,
  heavyLightDecompositionArticle,
  randomizedAlgorithmsArticle,
  eulerTourArticle,
  moAlgorithmArticle,
  xorBasisArticle,
  eulerPathArticle,
  matrixExponentiationArticle,
  ahoCorasickArticle,
  centroidDecompositionArticle,
  lineSweepArticle,
  bracketSequencesArticle,
  differenceArrayArticle,
  contributionTechniqueArticle,
  divideConquerDpArticle,
  lcaArticle,
  dsuOnTreeArticle,
  sqrtDecompositionArticle,
  persistentSegmentTreeArticle,
  zFunctionArticle,
  ternarySearchArticle,
  treapArticle,
  fftArticle,
  manachersArticle,
  convexHullArticle,
  spragueGrundyArticle,
  chineseRemainderArticle,
  suffixAutomatonArticle,
  twoSatArticle,
  inclusionExclusionArticle,
  bridgesArticulationArticle,
  binarySearchAnswerArticle,
  catalanNumbersArticle,
  josephusArticle,
  sieveVariantsArticle,
  permutationPatternsArticle,
  burnsideLemmaArticle,
  grayCodeArticle,
  amortizedPatternsArticle,
  expressionParsingArticle,
  treeDiameterArticle,
  offlineCdqArticle,
  bitsetOperationsArticle,
  minCostFlowArticle,
  slopeTrickArticle,
  palindromeAutomatonArticle,
  gaussianGf2Article,
  trieXorArticle,
  lucasTheoremArticle,
  offlineLcaArticle,
  flowLowerBoundsArticle,
  bidirectionalBfsArticle,
  segmentTreeBeatsArticle,
  aStarSearchArticle,
  stringRotationsArticle,
  differenceConstraintsArticle,
  treeIsomorphismArticle,
  lyndonFactorizationArticle,
  balancedDpArticle,
  profileDpArticle,
  latticePathsArticle,
  functionalGraphsArticle,
  advancedCountingDpArticle,
  wordBreakVariantsArticle,
  rotatingCalipersArticle,
  matchingFlowArticle,
  shortestSupersequenceArticle,
  aliensTrickArticle,
  persistentUnionFindArticle,
  graphColoringArticle,
  arithmeticDpArticle,
  kadaneVariantsArticle,
  subsequenceCountingArticle,
  slidingWindowAdvancedArticle,
  twoPointerAdvancedArticle,
  carryDpArticle,
  randomWalkArticle,
  stringConstructionArticle,
  topkStreamingArticle,
]

export function getArticle(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug)
}
