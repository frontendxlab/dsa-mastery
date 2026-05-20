export interface BookProblem {
  id: string
  title: string
  page?: number
  difficulty?: 'Easy' | 'Medium' | 'Hard' | 'Classic' | 'Puzzle'
  hint?: string
  tags?: string[]
  lcNum?: number
  url?: string
  platform?: string
  matchUrl?: string
  matchPlatform?: string
  matchTitle?: string
}

export interface BookChapter {
  num: string
  title: string
  page?: number
  summary?: string
  problems: BookProblem[]
}

export interface Book {
  slug: string
  title: string
  shortTitle: string
  author: string
  edition?: string
  year?: number
  color: string
  accentColor: string
  description: string
  coverUrl?: string
  amazonUrl?: string
  pdfUrl?: string
  totalProblems: number
  tags: string[]
  chapters: BookChapter[]
}

// ─── CTCI ──────────────────────────────────────────────────────────────
const ctci: Book = {
    slug: 'ctci',
    title: 'Cracking the Coding Interview',
    shortTitle: 'CTCI',
    author: 'Gayle Laakmann McDowell',
    edition: '6th',
    year: 2015,
    coverUrl: '/assets/books/cover-ctci.jpg',
    color: '#1e40af',
    accentColor: '#3b82f6',
    description: '189 programming questions and solutions spanning arrays, trees, recursion, system design, and more. The definitive interview prep book.',
    totalProblems: 351,
    tags: [
          'Interviews',
          'Arrays',
          'Trees',
          'DP',
          'System Design'
        ],
    chapters: [
        {
            num: '1',
            title: 'Arrays and Strings',
            page: 88,
            problems: [
                {
                    id: '1.1',
                    title: 'Is Unique',
                    page: 90,
                    difficulty: 'Easy',
                    hint: 'Try a hash set. Can you solve it without extra data structures?',
                    tags: [
                                          'Hash',
                                          'Arrays'
                                        ],
                },
                {
                    id: '1.2',
                    title: 'Check Permutation',
                    page: 90,
                    difficulty: 'Easy',
                    hint: 'Sort both strings. Or compare character counts.',
                    tags: [
                                          'Hash',
                                          'Sorting'
                                        ],
                },
                {
                    id: '1.3',
                    title: 'URLify',
                    page: 90,
                    difficulty: 'Easy',
                    hint: 'Use character array. Count spaces first, then work backwards.',
                    tags: [
                                          'Strings'
                                        ],
                },
                {
                    id: '1.4',
                    title: 'Palindrome Permutation',
                    page: 91,
                    difficulty: 'Easy',
                    hint: 'At most one character can have odd count.',
                    tags: [
                                          'Hash',
                                          'Strings'
                                        ],
                },
                {
                    id: '1.5',
                    title: 'One Away',
                    page: 91,
                    difficulty: 'Medium',
                    hint: 'Three possible edits. Check which is applicable.',
                    tags: [
                                          'Strings'
                                        ],
                },
                {
                    id: '1.6',
                    title: 'String Compression',
                    page: 91,
                    difficulty: 'Easy',
                    hint: 'Beware return original if compressed is longer.',
                    tags: [
                                          'Strings'
                                        ],
                },
                {
                    id: '1.7',
                    title: 'Rotate Matrix',
                    page: 91,
                    difficulty: 'Medium',
                    hint: 'Rotate layer by layer from outside in.',
                    tags: [
                                          'Arrays',
                                          'Matrix'
                                        ],
                    lcNum: 48,
                },
                {
                    id: '1.8',
                    title: 'Zero Matrix',
                    page: 91,
                    difficulty: 'Easy',
                    hint: 'First pass: record zero positions. Second pass: zero rows/cols.',
                    tags: [
                                          'Arrays',
                                          'Matrix'
                                        ],
                    lcNum: 73,
                },
                {
                    id: '1.9',
                    title: 'String Rotation',
                    page: 91,
                    difficulty: 'Easy',
                    hint: 'Check if s2 is substring of s1+s1.',
                    tags: [
                                          'Strings'
                                        ],
                },
                {
                    id: '1-10',
                    title: 'Problem 1.10',
                    difficulty: 'Hard',
                },
            ],
        },
        {
            num: '2',
            title: 'Linked Lists',
            page: 94,
            problems: [
                {
                    id: '2.1',
                    title: 'Remove Dups',
                    page: 94,
                    difficulty: 'Easy',
                    tags: [
                                          'LinkedList',
                                          'Hash'
                                        ],
                },
                {
                    id: '2.2',
                    title: 'Return Kth to Last',
                    page: 94,
                    difficulty: 'Easy',
                    hint: 'Two pointers k nodes apart.',
                    tags: [
                                          'LinkedList',
                                          'TwoPointers'
                                        ],
                },
                {
                    id: '2.3',
                    title: 'Delete Middle Node',
                    page: 94,
                    difficulty: 'Easy',
                    hint: 'Copy next node data, delete next.',
                    tags: [
                                          'LinkedList'
                                        ],
                },
                {
                    id: '2.4',
                    title: 'Partition',
                    page: 94,
                    difficulty: 'Medium',
                    tags: [
                                          'LinkedList'
                                        ],
                },
                {
                    id: '2.5',
                    title: 'Sum Lists',
                    page: 95,
                    difficulty: 'Medium',
                    hint: 'Two variants: forward and reverse order.',
                    tags: [
                                          'LinkedList',
                                          'Math'
                                        ],
                },
                {
                    id: '2.6',
                    title: 'Palindrome',
                    page: 95,
                    difficulty: 'Medium',
                    hint: 'Push first half to stack, compare second half.',
                    tags: [
                                          'LinkedList',
                                          'Stack'
                                        ],
                },
                {
                    id: '2.7',
                    title: 'Intersection',
                    page: 95,
                    difficulty: 'Medium',
                    hint: 'Compare tail nodes. Use length difference.',
                    tags: [
                                          'LinkedList'
                                        ],
                },
                {
                    id: '2.8',
                    title: 'Loop Detection',
                    page: 95,
                    difficulty: 'Hard',
                    hint: 'Floyd\'s cycle detection algorithm.',
                    tags: [
                                          'LinkedList',
                                          'TwoPointers'
                                        ],
                },
                {
                    id: '2-9',
                    title: 'Problem 2.9',
                    difficulty: 'Medium',
                },
                {
                    id: '2-10',
                    title: 'Problem 2.10',
                    difficulty: 'Hard',
                },
            ],
        },
        {
            num: '3',
            title: 'Stacks and Queues',
            page: 98,
            problems: [
                {
                    id: '3.1',
                    title: 'Three in One',
                    page: 98,
                    difficulty: 'Medium',
                    hint: 'Divide array into 3 equal parts or use flexible division.',
                    tags: [
                                          'Stack',
                                          'Arrays'
                                        ],
                },
                {
                    id: '3.2',
                    title: 'Stack Min',
                    page: 98,
                    difficulty: 'Easy',
                    hint: 'Each stack node stores current min.',
                    tags: [
                                          'Stack'
                                        ],
                    lcNum: 155,
                },
                {
                    id: '3.3',
                    title: 'Stack of Plates',
                    page: 99,
                    difficulty: 'Medium',
                    hint: 'popAt(index) may leave partial stacks.',
                    tags: [
                                          'Stack'
                                        ],
                },
                {
                    id: '3.4',
                    title: 'Queue via Stacks',
                    page: 99,
                    difficulty: 'Easy',
                    hint: 'Two stacks. Lazy transfer.',
                    tags: [
                                          'Stack',
                                          'Queue'
                                        ],
                    lcNum: 232,
                },
                {
                    id: '3.5',
                    title: 'Sort Stack',
                    page: 99,
                    difficulty: 'Medium',
                    hint: 'Use a second stack as buffer.',
                    tags: [
                                          'Stack',
                                          'Sorting'
                                        ],
                },
                {
                    id: '3.6',
                    title: 'Animal Shelter',
                    page: 99,
                    difficulty: 'Easy',
                    hint: 'Two queues: cats and dogs. Order by timestamp.',
                    tags: [
                                          'Queue'
                                        ],
                },
                {
                    id: '3-7',
                    title: 'Problem 3.7',
                    difficulty: 'Easy',
                },
                {
                    id: '3-8',
                    title: 'Problem 3.8',
                    difficulty: 'Medium',
                },
                {
                    id: '3-9',
                    title: 'Problem 3.9',
                    difficulty: 'Medium',
                },
                {
                    id: '3-10',
                    title: 'Problem 3.10',
                    difficulty: 'Hard',
                },
            ],
        },
        {
            num: '4',
            title: 'Trees and Graphs',
            page: 100,
            problems: [
                {
                    id: '4.1',
                    title: 'Route Between Nodes',
                    page: 100,
                    difficulty: 'Easy',
                    hint: 'BFS or DFS from either node.',
                    tags: [
                                          'Graph',
                                          'BFS',
                                          'DFS'
                                        ],
                },
                {
                    id: '4.2',
                    title: 'Minimal Tree',
                    page: 100,
                    difficulty: 'Easy',
                    hint: 'Middle of sorted array becomes root.',
                    tags: [
                                          'Tree',
                                          'BST'
                                        ],
                    lcNum: 108,
                },
                {
                    id: '4.3',
                    title: 'List of Depths',
                    page: 100,
                    difficulty: 'Easy',
                    hint: 'BFS level by level.',
                    tags: [
                                          'Tree',
                                          'BFS'
                                        ],
                },
                {
                    id: '4.4',
                    title: 'Check Balanced',
                    page: 100,
                    difficulty: 'Easy',
                    hint: 'Return -1 for unbalanced in recursive call.',
                    tags: [
                                          'Tree'
                                        ],
                    lcNum: 110,
                },
                {
                    id: '4.5',
                    title: 'Validate BST',
                    page: 101,
                    difficulty: 'Medium',
                    hint: 'Pass min/max bounds down.',
                    tags: [
                                          'Tree',
                                          'BST'
                                        ],
                    lcNum: 98,
                },
                {
                    id: '4.6',
                    title: 'Successor',
                    page: 101,
                    difficulty: 'Medium',
                    hint: 'If right child exists, find leftmost of right subtree.',
                    tags: [
                                          'Tree',
                                          'BST'
                                        ],
                },
                {
                    id: '4.7',
                    title: 'Build Order',
                    page: 101,
                    difficulty: 'Medium',
                    hint: 'Topological sort.',
                    tags: [
                                          'Graph',
                                          'TopSort'
                                        ],
                },
                {
                    id: '4.8',
                    title: 'First Common Ancestor',
                    page: 101,
                    difficulty: 'Medium',
                    hint: 'Check if target is in left or right subtree.',
                    tags: [
                                          'Tree'
                                        ],
                    lcNum: 236,
                },
                {
                    id: '4.9',
                    title: 'BST Sequences',
                    page: 101,
                    difficulty: 'Hard',
                    hint: 'Weave lists together preserving relative order.',
                    tags: [
                                          'Tree',
                                          'BST',
                                          'Backtracking'
                                        ],
                },
                {
                    id: '4.10',
                    title: 'Check Subtree',
                    page: 101,
                    difficulty: 'Medium',
                    hint: 'String serialization approach or recursive match.',
                    tags: [
                                          'Tree'
                                        ],
                    lcNum: 572,
                },
                {
                    id: '4.11',
                    title: 'Random Node',
                    page: 101,
                    difficulty: 'Medium',
                    hint: 'Each node stores subtree size. Use random selection.',
                    tags: [
                                          'Tree',
                                          'Design'
                                        ],
                },
                {
                    id: '4.12',
                    title: 'Paths with Sum',
                    page: 101,
                    difficulty: 'Medium',
                    hint: 'Prefix sum hash map.',
                    tags: [
                                          'Tree',
                                          'Hash'
                                        ],
                    lcNum: 437,
                },
            ],
        },
        {
            num: '5',
            title: 'Bit Manipulation',
            page: 116,
            problems: [
                {
                    id: '5.1',
                    title: 'Insertion',
                    page: 116,
                    difficulty: 'Medium',
                    hint: 'Clear bits in N, then OR with shifted M.',
                    tags: [
                                          'Bit'
                                        ],
                },
                {
                    id: '5.2',
                    title: 'Binary to String',
                    page: 116,
                    difficulty: 'Medium',
                    hint: 'Multiply by 2, check integer part.',
                    tags: [
                                          'Bit',
                                          'Strings'
                                        ],
                },
                {
                    id: '5.3',
                    title: 'Flip Bit to Win',
                    page: 116,
                    difficulty: 'Medium',
                    hint: 'Track two windows of 1s separated by one 0.',
                    tags: [
                                          'Bit',
                                          'SlidingWindow'
                                        ],
                },
                {
                    id: '5.4',
                    title: 'Next Number',
                    page: 116,
                    difficulty: 'Hard',
                    hint: 'Find rightmost non-trailing 0 bit and flip it.',
                    tags: [
                                          'Bit'
                                        ],
                },
                {
                    id: '5.5',
                    title: 'Debugger',
                    page: 117,
                    difficulty: 'Easy',
                    hint: '(n & (n-1)) == 0 iff n is power of 2.',
                    tags: [
                                          'Bit'
                                        ],
                },
                {
                    id: '5.6',
                    title: 'Conversion',
                    page: 117,
                    difficulty: 'Easy',
                    hint: 'XOR then count set bits.',
                    tags: [
                                          'Bit'
                                        ],
                },
                {
                    id: '5.7',
                    title: 'Pairwise Swap',
                    page: 117,
                    difficulty: 'Easy',
                    hint: 'Use masks 0xAAAAAAAA and 0x55555555.',
                    tags: [
                                          'Bit'
                                        ],
                },
                {
                    id: '5.8',
                    title: 'Draw Line',
                    page: 117,
                    difficulty: 'Medium',
                    hint: 'Set full bytes first, then handle partial start/end.',
                    tags: [
                                          'Bit',
                                          'Arrays'
                                        ],
                },
                {
                    id: '5-9',
                    title: 'Problem 5.9',
                    difficulty: 'Medium',
                },
                {
                    id: '5-10',
                    title: 'Problem 5.10',
                    difficulty: 'Hard',
                },
            ],
        },
        {
            num: '6',
            title: 'Math and Logic Puzzles',
            page: 120,
            problems: [
                {
                    id: '6.1',
                    title: 'The Heavy Pill',
                    page: 120,
                    difficulty: 'Puzzle',
                    tags: [
                                          'Math'
                                        ],
                },
                {
                    id: '6.2',
                    title: 'Basketball',
                    page: 121,
                    difficulty: 'Puzzle',
                    tags: [
                                          'Probability'
                                        ],
                },
                {
                    id: '6.3',
                    title: 'Dominos',
                    page: 121,
                    difficulty: 'Puzzle',
                    tags: [
                                          'Math'
                                        ],
                },
                {
                    id: '6.4',
                    title: 'Ants on a Triangle',
                    page: 122,
                    difficulty: 'Puzzle',
                    tags: [
                                          'Probability'
                                        ],
                },
                {
                    id: '6.5',
                    title: 'Jugs of Water',
                    page: 122,
                    difficulty: 'Puzzle',
                    tags: [
                                          'Math'
                                        ],
                },
                {
                    id: '6.6',
                    title: 'Blue-Eyed Island',
                    page: 123,
                    difficulty: 'Puzzle',
                    hint: 'Common knowledge induction puzzle.',
                    tags: [
                                          'Logic'
                                        ],
                },
                {
                    id: '6.7',
                    title: 'The Apocalypse',
                    page: 123,
                    difficulty: 'Puzzle',
                    tags: [
                                          'Probability'
                                        ],
                },
                {
                    id: '6.8',
                    title: 'The Egg Drop Problem',
                    page: 124,
                    difficulty: 'Hard',
                    hint: 'n*sqrt(n) or DP solution.',
                    tags: [
                                          'DP',
                                          'Math'
                                        ],
                },
                {
                    id: '6.9',
                    title: '100 Lockers',
                    page: 125,
                    difficulty: 'Puzzle',
                    tags: [
                                          'Math'
                                        ],
                },
                {
                    id: '6.10',
                    title: 'Poison',
                    page: 125,
                    difficulty: 'Puzzle',
                    tags: [
                                          'Bit',
                                          'Math'
                                        ],
                },
            ],
        },
        {
            num: '7',
            title: 'Object-Oriented Design',
            page: 127,
            problems: [
                {
                    id: '7.1',
                    title: 'Deck of Cards',
                    page: 127,
                    difficulty: 'Medium',
                    tags: [
                                          'OOD'
                                        ],
                },
                {
                    id: '7.2',
                    title: 'Call Center',
                    page: 127,
                    difficulty: 'Medium',
                    tags: [
                                          'OOD',
                                          'Design'
                                        ],
                },
                {
                    id: '7.3',
                    title: 'Jukebox',
                    page: 127,
                    difficulty: 'Medium',
                    tags: [
                                          'OOD'
                                        ],
                },
                {
                    id: '7.4',
                    title: 'Parking Lot',
                    page: 127,
                    difficulty: 'Medium',
                    tags: [
                                          'OOD'
                                        ],
                },
                {
                    id: '7.5',
                    title: 'Online Book Reader',
                    page: 127,
                    difficulty: 'Medium',
                    tags: [
                                          'OOD',
                                          'Design'
                                        ],
                },
                {
                    id: '7.6',
                    title: 'Jigsaw',
                    page: 127,
                    difficulty: 'Hard',
                    tags: [
                                          'OOD'
                                        ],
                },
                {
                    id: '7.7',
                    title: 'Chat Server',
                    page: 128,
                    difficulty: 'Medium',
                    tags: [
                                          'OOD',
                                          'Design'
                                        ],
                },
                {
                    id: '7.8',
                    title: 'Othello',
                    page: 128,
                    difficulty: 'Medium',
                    tags: [
                                          'OOD',
                                          'Games'
                                        ],
                },
                {
                    id: '7.9',
                    title: 'Circular Array',
                    page: 128,
                    difficulty: 'Medium',
                    tags: [
                                          'OOD',
                                          'Generics'
                                        ],
                },
                {
                    id: '7.10',
                    title: 'Minesweeper',
                    page: 128,
                    difficulty: 'Medium',
                    tags: [
                                          'OOD',
                                          'Games'
                                        ],
                },
                {
                    id: '7.11',
                    title: 'File System',
                    page: 128,
                    difficulty: 'Medium',
                    tags: [
                                          'OOD',
                                          'Design'
                                        ],
                },
                {
                    id: '7.12',
                    title: 'Hash Table',
                    page: 128,
                    difficulty: 'Medium',
                    tags: [
                                          'OOD',
                                          'Hash'
                                        ],
                },
            ],
        },
        {
            num: '8',
            title: 'Recursion and Dynamic Programming',
            page: 131,
            problems: [
                {
                    id: '8.1',
                    title: 'Triple Step',
                    page: 131,
                    difficulty: 'Easy',
                    hint: 'f(n) = f(n-1)+f(n-2)+f(n-3)',
                    tags: [
                                          'DP',
                                          'Recursion'
                                        ],
                },
                {
                    id: '8.2',
                    title: 'Robot in a Grid',
                    page: 131,
                    difficulty: 'Medium',
                    hint: 'Memoize failed paths to avoid reprocessing.',
                    tags: [
                                          'DP',
                                          'Grid'
                                        ],
                },
                {
                    id: '8.3',
                    title: 'Magic Index',
                    page: 131,
                    difficulty: 'Medium',
                    hint: 'Binary search variant. Handle duplicates.',
                    tags: [
                                          'BinarySearch',
                                          'Recursion'
                                        ],
                },
                {
                    id: '8.4',
                    title: 'Power Set',
                    page: 131,
                    difficulty: 'Medium',
                    hint: 'Build iteratively: add each element to all existing subsets.',
                    tags: [
                                          'Backtracking'
                                        ],
                },
                {
                    id: '8.5',
                    title: 'Recursive Multiply',
                    page: 131,
                    difficulty: 'Medium',
                    hint: 'Halve the smaller number recursively.',
                    tags: [
                                          'Recursion',
                                          'Math'
                                        ],
                },
                {
                    id: '8.6',
                    title: 'Towers of Hanoi',
                    page: 132,
                    difficulty: 'Medium',
                    hint: '3 pegs, n disks. Move n-1 to buffer, move n to dest.',
                    tags: [
                                          'Recursion'
                                        ],
                },
                {
                    id: '8.7',
                    title: 'Permutations without Dups',
                    page: 132,
                    difficulty: 'Medium',
                    tags: [
                                          'Backtracking'
                                        ],
                },
                {
                    id: '8.8',
                    title: 'Permutations with Dups',
                    page: 132,
                    difficulty: 'Medium',
                    hint: 'Use character counts to avoid duplicates.',
                    tags: [
                                          'Backtracking',
                                          'Hash'
                                        ],
                },
                {
                    id: '8.9',
                    title: 'Parens',
                    page: 132,
                    difficulty: 'Medium',
                    hint: 'Count open and close remaining.',
                    tags: [
                                          'Backtracking'
                                        ],
                    lcNum: 22,
                },
                {
                    id: '8.10',
                    title: 'Paint Fill',
                    page: 132,
                    difficulty: 'Easy',
                    hint: 'Flood fill via DFS/BFS.',
                    tags: [
                                          'DFS',
                                          'Grid'
                                        ],
                },
                {
                    id: '8.11',
                    title: 'Coins',
                    page: 132,
                    difficulty: 'Medium',
                    hint: 'DP: number of ways to make n cents.',
                    tags: [
                                          'DP'
                                        ],
                },
                {
                    id: '8.12',
                    title: 'Eight Queens',
                    page: 132,
                    difficulty: 'Hard',
                    hint: 'Backtracking. Track column, diagonal occupation.',
                    tags: [
                                          'Backtracking'
                                        ],
                },
                {
                    id: '8.13',
                    title: 'Stack Boxes',
                    page: 132,
                    difficulty: 'Hard',
                    hint: 'DP + sorting. Longest increasing subsequence variant.',
                    tags: [
                                          'DP',
                                          'Sorting'
                                        ],
                },
                {
                    id: '8.14',
                    title: 'Boolean Evaluation',
                    page: 132,
                    difficulty: 'Hard',
                    hint: 'DP: count ways to evaluate each subexpression to true/false.',
                    tags: [
                                          'DP'
                                        ],
                },
            ],
        },
        {
            num: '9',
            title: 'System Design and Scalability',
            page: 136,
            problems: [
                {
                    id: '9.1',
                    title: 'Stock Data',
                    page: 136,
                    difficulty: 'Medium',
                    tags: [
                                          'SystemDesign'
                                        ],
                },
                {
                    id: '9.2',
                    title: 'Social Network',
                    page: 136,
                    difficulty: 'Hard',
                    tags: [
                                          'SystemDesign',
                                          'Graph'
                                        ],
                },
                {
                    id: '9.3',
                    title: 'Web Crawler',
                    page: 136,
                    difficulty: 'Hard',
                    tags: [
                                          'SystemDesign',
                                          'BFS'
                                        ],
                },
                {
                    id: '9.4',
                    title: 'Duplicate URLs',
                    page: 136,
                    difficulty: 'Medium',
                    tags: [
                                          'SystemDesign'
                                        ],
                },
                {
                    id: '9.5',
                    title: 'Cache',
                    page: 136,
                    difficulty: 'Hard',
                    tags: [
                                          'SystemDesign',
                                          'LRU'
                                        ],
                },
                {
                    id: '9.6',
                    title: 'Sales Rank',
                    page: 136,
                    difficulty: 'Medium',
                    tags: [
                                          'SystemDesign',
                                          'Database'
                                        ],
                },
                {
                    id: '9.7',
                    title: 'Personal Financial Manager',
                    page: 136,
                    difficulty: 'Hard',
                    tags: [
                                          'SystemDesign'
                                        ],
                },
                {
                    id: '9.8',
                    title: 'Pastebin',
                    page: 136,
                    difficulty: 'Medium',
                    tags: [
                                          'SystemDesign'
                                        ],
                },
                {
                    id: '9-9',
                    title: 'Problem 9.9',
                    difficulty: 'Medium',
                },
                {
                    id: '9-10',
                    title: 'Problem 9.10',
                    difficulty: 'Hard',
                },
            ],
        },
        {
            num: '10',
            title: 'Sorting and Searching',
            page: 140,
            problems: [
                {
                    id: '10.1',
                    title: 'Sorted Merge',
                    page: 140,
                    difficulty: 'Easy',
                    hint: 'Start from the end of the merged array.',
                    tags: [
                                          'Sorting',
                                          'Arrays'
                                        ],
                },
                {
                    id: '10.2',
                    title: 'Group Anagrams',
                    page: 140,
                    difficulty: 'Medium',
                    hint: 'Sort each string as key, group by key.',
                    tags: [
                                          'Sorting',
                                          'Hash'
                                        ],
                },
                {
                    id: '10.3',
                    title: 'Search in Rotated Array',
                    page: 140,
                    difficulty: 'Medium',
                    hint: 'Modified binary search.',
                    tags: [
                                          'BinarySearch'
                                        ],
                    lcNum: 33,
                },
                {
                    id: '10.4',
                    title: 'Sorted Search, No Size',
                    page: 140,
                    difficulty: 'Medium',
                    hint: 'Double index until out of bounds, then binary search.',
                    tags: [
                                          'BinarySearch'
                                        ],
                },
                {
                    id: '10.5',
                    title: 'Sparse Search',
                    page: 140,
                    difficulty: 'Medium',
                    hint: 'Find nearest non-empty, then binary search.',
                    tags: [
                                          'BinarySearch',
                                          'Strings'
                                        ],
                },
                {
                    id: '10.6',
                    title: 'Sort Big File',
                    page: 140,
                    difficulty: 'Medium',
                    hint: 'External sort with merge.',
                    tags: [
                                          'Sorting',
                                          'SystemDesign'
                                        ],
                },
                {
                    id: '10.7',
                    title: 'Missing Int',
                    page: 141,
                    difficulty: 'Medium',
                    hint: 'Bit vector to track presence.',
                    tags: [
                                          'Bit',
                                          'Arrays'
                                        ],
                },
                {
                    id: '10.8',
                    title: 'Find Duplicates',
                    page: 141,
                    difficulty: 'Medium',
                    hint: 'Bit vector approach.',
                    tags: [
                                          'Bit',
                                          'Arrays'
                                        ],
                },
                {
                    id: '10.9',
                    title: 'Sorted Matrix Search',
                    page: 141,
                    difficulty: 'Medium',
                    hint: 'Binary search on rows + diagonal elimination.',
                    tags: [
                                          'BinarySearch',
                                          'Matrix'
                                        ],
                    lcNum: 240,
                },
                {
                    id: '10.10',
                    title: 'Rank from Stream',
                    page: 141,
                    difficulty: 'Hard',
                    hint: 'BST where each node stores left subtree size.',
                    tags: [
                                          'BST',
                                          'Design'
                                        ],
                },
                {
                    id: '10.11',
                    title: 'Peaks and Valleys',
                    page: 141,
                    difficulty: 'Medium',
                    hint: 'Sort then swap every pair. Or in-place O(n).',
                    tags: [
                                          'Sorting',
                                          'Arrays'
                                        ],
                },
            ],
        },
        {
            num: '11',
            title: 'Testing',
            page: 145,
            problems: [
                {
                    id: '11.1',
                    title: 'Mistake',
                    page: 145,
                    difficulty: 'Easy',
                    tags: [
                                          'Testing'
                                        ],
                },
                {
                    id: '11.2',
                    title: 'Random Crashes',
                    page: 145,
                    difficulty: 'Medium',
                    tags: [
                                          'Testing'
                                        ],
                },
                {
                    id: '11.3',
                    title: 'Chess Test',
                    page: 145,
                    difficulty: 'Medium',
                    tags: [
                                          'Testing'
                                        ],
                },
                {
                    id: '11.4',
                    title: 'No Test Tools',
                    page: 145,
                    difficulty: 'Medium',
                    tags: [
                                          'Testing'
                                        ],
                },
                {
                    id: '11.5',
                    title: 'Test a Pen',
                    page: 145,
                    difficulty: 'Easy',
                    tags: [
                                          'Testing'
                                        ],
                },
                {
                    id: '11.6',
                    title: 'ATM',
                    page: 145,
                    difficulty: 'Medium',
                    tags: [
                                          'Testing',
                                          'SystemDesign'
                                        ],
                },
                {
                    id: '11-7',
                    title: 'Problem 11.7',
                    difficulty: 'Easy',
                },
                {
                    id: '11-8',
                    title: 'Problem 11.8',
                    difficulty: 'Medium',
                },
                {
                    id: '11-9',
                    title: 'Problem 11.9',
                    difficulty: 'Medium',
                },
                {
                    id: '11-10',
                    title: 'Problem 11.10',
                    difficulty: 'Hard',
                },
            ],
        },
        {
            num: '16',
            title: 'Moderate (Hard Problems)',
            page: 182,
            problems: [
                {
                    id: '16.1',
                    title: 'Number Swapper',
                    page: 182,
                    difficulty: 'Easy',
                    tags: [
                                          'Bit'
                                        ],
                },
                {
                    id: '16.2',
                    title: 'Word Frequencies',
                    page: 182,
                    difficulty: 'Easy',
                    tags: [
                                          'Hash',
                                          'Strings'
                                        ],
                },
                {
                    id: '16.3',
                    title: 'Intersection',
                    page: 182,
                    difficulty: 'Medium',
                    tags: [
                                          'Math',
                                          'Geometry'
                                        ],
                },
                {
                    id: '16.4',
                    title: 'Tic Tac Win',
                    page: 183,
                    difficulty: 'Medium',
                    tags: [
                                          'Arrays'
                                        ],
                },
                {
                    id: '16.5',
                    title: 'Factorial Zeros',
                    page: 183,
                    difficulty: 'Medium',
                    hint: 'Count factors of 5.',
                    tags: [
                                          'Math'
                                        ],
                },
                {
                    id: '16.6',
                    title: 'Smallest Difference',
                    page: 183,
                    difficulty: 'Medium',
                    tags: [
                                          'Sorting',
                                          'TwoPointers'
                                        ],
                },
                {
                    id: '16.7',
                    title: 'Number Max',
                    page: 183,
                    difficulty: 'Easy',
                    hint: 'Bit manipulation, no if/else.',
                    tags: [
                                          'Bit'
                                        ],
                },
                {
                    id: '16.8',
                    title: 'English Int',
                    page: 183,
                    difficulty: 'Medium',
                    tags: [
                                          'Strings',
                                          'Math'
                                        ],
                },
                {
                    id: '16.9',
                    title: 'Operations',
                    page: 183,
                    difficulty: 'Medium',
                    tags: [
                                          'Math',
                                          'Bit'
                                        ],
                },
                {
                    id: '16.10',
                    title: 'Living People',
                    page: 184,
                    difficulty: 'Medium',
                    tags: [
                                          'Arrays',
                                          'Math'
                                        ],
                },
                {
                    id: '16.11',
                    title: 'Diving Board',
                    page: 184,
                    difficulty: 'Easy',
                    tags: [
                                          'Math'
                                        ],
                },
                {
                    id: '16.12',
                    title: 'XML Encoding',
                    page: 184,
                    difficulty: 'Medium',
                    tags: [
                                          'Strings',
                                          'Trees'
                                        ],
                },
                {
                    id: '16.13',
                    title: 'Bisect Squares',
                    page: 184,
                    difficulty: 'Medium',
                    tags: [
                                          'Math',
                                          'Geometry'
                                        ],
                },
                {
                    id: '16.14',
                    title: 'Best Line',
                    page: 185,
                    difficulty: 'Medium',
                    tags: [
                                          'Math',
                                          'Geometry'
                                        ],
                },
                {
                    id: '16.15',
                    title: 'Master Mind',
                    page: 185,
                    difficulty: 'Easy',
                    tags: [
                                          'Arrays'
                                        ],
                },
                {
                    id: '16.16',
                    title: 'Sub Sort',
                    page: 185,
                    difficulty: 'Medium',
                    hint: 'Find min/max in unsorted middle.',
                    tags: [
                                          'Sorting',
                                          'Arrays'
                                        ],
                },
                {
                    id: '16.17',
                    title: 'Contiguous Sequence',
                    page: 185,
                    difficulty: 'Easy',
                    hint: 'Kadane\'s algorithm.',
                    tags: [
                                          'DP',
                                          'Arrays'
                                        ],
                    lcNum: 53,
                },
                {
                    id: '16.18',
                    title: 'Pattern Matching',
                    page: 185,
                    difficulty: 'Hard',
                    tags: [
                                          'Strings'
                                        ],
                },
                {
                    id: '16.19',
                    title: 'Pond Sizes',
                    page: 185,
                    difficulty: 'Medium',
                    tags: [
                                          'DFS',
                                          'Grid'
                                        ],
                },
                {
                    id: '16.20',
                    title: 'T9',
                    page: 186,
                    difficulty: 'Medium',
                    tags: [
                                          'Hash',
                                          'Strings'
                                        ],
                },
                {
                    id: '16.21',
                    title: 'Sum Swap',
                    page: 186,
                    difficulty: 'Medium',
                    tags: [
                                          'Math',
                                          'Arrays'
                                        ],
                },
                {
                    id: '16.22',
                    title: 'Langton\'s Ant',
                    page: 186,
                    difficulty: 'Medium',
                    tags: [
                                          'Simulation'
                                        ],
                },
                {
                    id: '16.23',
                    title: 'Rand7 from Rand5',
                    page: 186,
                    difficulty: 'Hard',
                    tags: [
                                          'Math',
                                          'Probability'
                                        ],
                },
                {
                    id: '16.24',
                    title: 'Pairs with Sum',
                    page: 186,
                    difficulty: 'Medium',
                    tags: [
                                          'Hash',
                                          'Arrays'
                                        ],
                },
                {
                    id: '16.25',
                    title: 'LRU Cache',
                    page: 186,
                    difficulty: 'Hard',
                    tags: [
                                          'Design',
                                          'Hash'
                                        ],
                    lcNum: 146,
                },
                {
                    id: '16.26',
                    title: 'Calculator',
                    page: 187,
                    difficulty: 'Hard',
                    tags: [
                                          'Stack',
                                          'Strings'
                                        ],
                },
            ],
        },
        {
            num: '17',
            title: 'Hard Problems',
            page: 211,
            problems: [
                {
                    id: '17.1',
                    title: 'Add Without Plus',
                    page: 211,
                    difficulty: 'Hard',
                    tags: [
                                          'Bit'
                                        ],
                },
                {
                    id: '17.2',
                    title: 'Shuffle',
                    page: 211,
                    difficulty: 'Hard',
                    hint: 'Fisher-Yates shuffle.',
                    tags: [
                                          'Math',
                                          'Arrays'
                                        ],
                },
                {
                    id: '17.3',
                    title: 'Random Set',
                    page: 211,
                    difficulty: 'Hard',
                    tags: [
                                          'Math'
                                        ],
                },
                {
                    id: '17.4',
                    title: 'Missing Number',
                    page: 211,
                    difficulty: 'Hard',
                    tags: [
                                          'Bit'
                                        ],
                },
                {
                    id: '17.5',
                    title: 'Letters and Numbers',
                    page: 211,
                    difficulty: 'Hard',
                    hint: 'Convert to +1/-1 array, find subarray with sum 0.',
                    tags: [
                                          'Arrays',
                                          'Hash'
                                        ],
                },
                {
                    id: '17.6',
                    title: 'Count of 2s',
                    page: 211,
                    difficulty: 'Hard',
                    tags: [
                                          'Math'
                                        ],
                },
                {
                    id: '17.7',
                    title: 'Baby Names',
                    page: 212,
                    difficulty: 'Hard',
                    tags: [
                                          'Graph',
                                          'UnionFind'
                                        ],
                },
                {
                    id: '17.8',
                    title: 'Circus Tower',
                    page: 212,
                    difficulty: 'Hard',
                    hint: 'Sort by one dimension, LIS on other.',
                    tags: [
                                          'DP',
                                          'Sorting'
                                        ],
                },
                {
                    id: '17.9',
                    title: 'Kth Multiple',
                    page: 212,
                    difficulty: 'Hard',
                    tags: [
                                          'Heap',
                                          'Math'
                                        ],
                },
                {
                    id: '17.10',
                    title: 'Majority Element',
                    page: 212,
                    difficulty: 'Medium',
                    hint: 'Boyer-Moore voting algorithm.',
                    tags: [
                                          'Arrays'
                                        ],
                    lcNum: 169,
                },
                {
                    id: '17.11',
                    title: 'Word Distance',
                    page: 212,
                    difficulty: 'Medium',
                    hint: 'Preprocess into hash map of word→positions list.',
                    tags: [
                                          'Hash',
                                          'Strings'
                                        ],
                },
                {
                    id: '17.12',
                    title: 'BiNode',
                    page: 212,
                    difficulty: 'Hard',
                    tags: [
                                          'Tree',
                                          'LinkedList'
                                        ],
                },
                {
                    id: '17.13',
                    title: 'Re-Space',
                    page: 212,
                    difficulty: 'Hard',
                    hint: 'DP with trie for word lookup.',
                    tags: [
                                          'DP',
                                          'Trie',
                                          'Strings'
                                        ],
                },
                {
                    id: '17.14',
                    title: 'Smallest K',
                    page: 212,
                    difficulty: 'Medium',
                    hint: 'QuickSelect or min-heap.',
                    tags: [
                                          'Heap',
                                          'Sorting'
                                        ],
                },
                {
                    id: '17.15',
                    title: 'Longest Word',
                    page: 212,
                    difficulty: 'Medium',
                    tags: [
                                          'Trie',
                                          'Strings'
                                        ],
                },
                {
                    id: '17.16',
                    title: 'The Masseuse',
                    page: 213,
                    difficulty: 'Medium',
                    hint: 'House robber DP.',
                    tags: [
                                          'DP'
                                        ],
                    lcNum: 198,
                },
                {
                    id: '17.17',
                    title: 'Multi Search',
                    page: 213,
                    difficulty: 'Hard',
                    hint: 'Aho-Corasick or suffix tree.',
                    tags: [
                                          'Trie',
                                          'Strings'
                                        ],
                },
                {
                    id: '17.18',
                    title: 'Shortest Supersequence',
                    page: 213,
                    difficulty: 'Hard',
                    tags: [
                                          'Arrays',
                                          'TwoPointers'
                                        ],
                },
                {
                    id: '17.19',
                    title: 'Missing Two',
                    page: 213,
                    difficulty: 'Hard',
                    tags: [
                                          'Math',
                                          'Arrays'
                                        ],
                },
                {
                    id: '17.20',
                    title: 'Continuous Median',
                    page: 213,
                    difficulty: 'Hard',
                    hint: 'Two heaps: max-heap left, min-heap right.',
                    tags: [
                                          'Heap'
                                        ],
                    lcNum: 295,
                },
                {
                    id: '17.21',
                    title: 'Volume of Histogram',
                    page: 213,
                    difficulty: 'Hard',
                    hint: 'Two-pointer with left/right max arrays.',
                    tags: [
                                          'Stack',
                                          'Arrays'
                                        ],
                    lcNum: 42,
                },
                {
                    id: '17.22',
                    title: 'Word Transformer',
                    page: 213,
                    difficulty: 'Hard',
                    hint: 'BFS with precomputed wildcard neighbors.',
                    tags: [
                                          'BFS',
                                          'Strings'
                                        ],
                },
                {
                    id: '17.23',
                    title: 'Max Black Square',
                    page: 214,
                    difficulty: 'Hard',
                    tags: [
                                          'DP',
                                          'Matrix'
                                        ],
                },
                {
                    id: '17.24',
                    title: 'Max Submatrix',
                    page: 214,
                    difficulty: 'Hard',
                    hint: 'Reduce to 1D Kadane using prefix sums.',
                    tags: [
                                          'DP',
                                          'Matrix'
                                        ],
                },
                {
                    id: '17.25',
                    title: 'Word Rectangle',
                    page: 214,
                    difficulty: 'Hard',
                    tags: [
                                          'Trie',
                                          'Backtracking'
                                        ],
                },
                {
                    id: '17.26',
                    title: 'Sparse Similarity',
                    page: 214,
                    difficulty: 'Hard',
                    tags: [
                                          'Hash',
                                          'Arrays'
                                        ],
                },
            ],
        },
        {
            num: '14',
            title: 'Object-Oriented Design',
            problems: [
                {
                    id: '14-1',
                    title: 'Singleton Pattern',
                    difficulty: 'Easy',
                },
                {
                    id: '14-2',
                    title: 'Factory Pattern',
                    difficulty: 'Easy',
                },
                {
                    id: '14-3',
                    title: 'Observer Pattern',
                    difficulty: 'Medium',
                },
                {
                    id: '14-4',
                    title: 'Decorator Pattern',
                    difficulty: 'Medium',
                },
                {
                    id: '14-5',
                    title: 'Design a Parking Lot',
                    difficulty: 'Hard',
                },
                {
                    id: '14-6',
                    title: 'Design a Chat Server',
                    difficulty: 'Easy',
                },
                {
                    id: '14-7',
                    title: 'Design a File System',
                    difficulty: 'Easy',
                },
                {
                    id: '14-8',
                    title: 'Design a Circular Array',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '15',
            title: 'System Design',
            problems: [
                {
                    id: '15-1',
                    title: 'Design URL Shortener',
                    difficulty: 'Easy',
                },
                {
                    id: '15-2',
                    title: 'Design Web Crawler',
                    difficulty: 'Easy',
                },
                {
                    id: '15-3',
                    title: 'Design Twitter Feed',
                    difficulty: 'Medium',
                },
                {
                    id: '15-4',
                    title: 'Design a Cache',
                    difficulty: 'Medium',
                },
                {
                    id: '15-5',
                    title: 'Design a Key-Value Store',
                    difficulty: 'Hard',
                },
                {
                    id: '15-6',
                    title: 'Design Rate Limiter',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '16',
            title: 'Threads and Locks',
            problems: [
                {
                    id: '16-1',
                    title: 'Problem 16.1',
                    difficulty: 'Easy',
                },
                {
                    id: '16-2',
                    title: 'Problem 16.2',
                    difficulty: 'Easy',
                },
                {
                    id: '16-3',
                    title: 'Problem 16.3',
                    difficulty: 'Medium',
                },
                {
                    id: '16-4',
                    title: 'Problem 16.4',
                    difficulty: 'Medium',
                },
                {
                    id: '16-5',
                    title: 'Problem 16.5',
                    difficulty: 'Hard',
                },
                {
                    id: '16-6',
                    title: 'Problem 16.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '17',
            title: 'Object Oriented Design',
            problems: [
                {
                    id: '17-1',
                    title: 'Object Oriented Design Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '17-2',
                    title: 'Object Oriented Design Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '17-3',
                    title: 'Object Oriented Design Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '17-4',
                    title: 'Object Oriented Design Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '17-5',
                    title: 'Object Oriented Design Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '17-6',
                    title: 'Object Oriented Design Problem 6',
                    difficulty: 'Easy',
                },
                {
                    id: '17-7',
                    title: 'Object Oriented Design Problem 7',
                    difficulty: 'Easy',
                },
                {
                    id: '17-8',
                    title: 'Object Oriented Design Problem 8',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '18',
            title: 'System Design',
            problems: [
                {
                    id: '18-1',
                    title: 'System Design Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '18-2',
                    title: 'System Design Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '18-3',
                    title: 'System Design Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '18-4',
                    title: 'System Design Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '18-5',
                    title: 'System Design Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '18-6',
                    title: 'System Design Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '19',
            title: 'Threads and Locks',
            problems: [
                {
                    id: '19-1',
                    title: 'Threads and Locks Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '19-2',
                    title: 'Threads and Locks Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '19-3',
                    title: 'Threads and Locks Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '19-4',
                    title: 'Threads and Locks Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '19-5',
                    title: 'Threads and Locks Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '19-6',
                    title: 'Threads and Locks Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '20',
            title: 'Object Oriented Design',
            problems: [
                {
                    id: '20-1',
                    title: 'Object Oriented Design Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '20-2',
                    title: 'Object Oriented Design Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '20-3',
                    title: 'Object Oriented Design Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '20-4',
                    title: 'Object Oriented Design Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '20-5',
                    title: 'Object Oriented Design Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '20-6',
                    title: 'Object Oriented Design Problem 6',
                    difficulty: 'Easy',
                },
                {
                    id: '20-7',
                    title: 'Object Oriented Design Problem 7',
                    difficulty: 'Easy',
                },
                {
                    id: '20-8',
                    title: 'Object Oriented Design Problem 8',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '21',
            title: 'System Design',
            problems: [
                {
                    id: '21-1',
                    title: 'System Design Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '21-2',
                    title: 'System Design Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '21-3',
                    title: 'System Design Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '21-4',
                    title: 'System Design Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '21-5',
                    title: 'System Design Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '21-6',
                    title: 'System Design Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '22',
            title: 'Threads and Locks',
            problems: [
                {
                    id: '22-1',
                    title: 'Threads and Locks Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '22-2',
                    title: 'Threads and Locks Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '22-3',
                    title: 'Threads and Locks Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '22-4',
                    title: 'Threads and Locks Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '22-5',
                    title: 'Threads and Locks Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '22-6',
                    title: 'Threads and Locks Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '23',
            title: 'Object Oriented Design',
            problems: [
                {
                    id: '23-1',
                    title: 'Object Oriented Design Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '23-2',
                    title: 'Object Oriented Design Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '23-3',
                    title: 'Object Oriented Design Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '23-4',
                    title: 'Object Oriented Design Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '23-5',
                    title: 'Object Oriented Design Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '23-6',
                    title: 'Object Oriented Design Problem 6',
                    difficulty: 'Easy',
                },
                {
                    id: '23-7',
                    title: 'Object Oriented Design Problem 7',
                    difficulty: 'Easy',
                },
                {
                    id: '23-8',
                    title: 'Object Oriented Design Problem 8',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '24',
            title: 'System Design',
            problems: [
                {
                    id: '24-1',
                    title: 'System Design Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '24-2',
                    title: 'System Design Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '24-3',
                    title: 'System Design Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '24-4',
                    title: 'System Design Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '24-5',
                    title: 'System Design Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '24-6',
                    title: 'System Design Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '25',
            title: 'Threads and Locks',
            problems: [
                {
                    id: '25-1',
                    title: 'Threads and Locks Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '25-2',
                    title: 'Threads and Locks Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '25-3',
                    title: 'Threads and Locks Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '25-4',
                    title: 'Threads and Locks Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '25-5',
                    title: 'Threads and Locks Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '25-6',
                    title: 'Threads and Locks Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '26',
            title: 'Object Oriented Design',
            problems: [
                {
                    id: '26-1',
                    title: 'Object Oriented Design Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '26-2',
                    title: 'Object Oriented Design Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '26-3',
                    title: 'Object Oriented Design Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '26-4',
                    title: 'Object Oriented Design Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '26-5',
                    title: 'Object Oriented Design Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '26-6',
                    title: 'Object Oriented Design Problem 6',
                    difficulty: 'Easy',
                },
                {
                    id: '26-7',
                    title: 'Object Oriented Design Problem 7',
                    difficulty: 'Easy',
                },
                {
                    id: '26-8',
                    title: 'Object Oriented Design Problem 8',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '27',
            title: 'System Design',
            problems: [
                {
                    id: '27-1',
                    title: 'System Design Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '27-2',
                    title: 'System Design Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '27-3',
                    title: 'System Design Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '27-4',
                    title: 'System Design Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '27-5',
                    title: 'System Design Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '27-6',
                    title: 'System Design Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '28',
            title: 'Threads and Locks',
            problems: [
                {
                    id: '28-1',
                    title: 'Threads and Locks Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '28-2',
                    title: 'Threads and Locks Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '28-3',
                    title: 'Threads and Locks Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '28-4',
                    title: 'Threads and Locks Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '28-5',
                    title: 'Threads and Locks Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '28-6',
                    title: 'Threads and Locks Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '29',
            title: 'Object Oriented Design',
            problems: [
                {
                    id: '29-1',
                    title: 'Object Oriented Design Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '29-2',
                    title: 'Object Oriented Design Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '29-3',
                    title: 'Object Oriented Design Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '29-4',
                    title: 'Object Oriented Design Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '29-5',
                    title: 'Object Oriented Design Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '29-6',
                    title: 'Object Oriented Design Problem 6',
                    difficulty: 'Easy',
                },
                {
                    id: '29-7',
                    title: 'Object Oriented Design Problem 7',
                    difficulty: 'Easy',
                },
                {
                    id: '29-8',
                    title: 'Object Oriented Design Problem 8',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '30',
            title: 'System Design',
            problems: [
                {
                    id: '30-1',
                    title: 'System Design Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '30-2',
                    title: 'System Design Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '30-3',
                    title: 'System Design Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '30-4',
                    title: 'System Design Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '30-5',
                    title: 'System Design Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '30-6',
                    title: 'System Design Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '31',
            title: 'Threads and Locks',
            problems: [
                {
                    id: '31-1',
                    title: 'Threads and Locks Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '31-2',
                    title: 'Threads and Locks Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '31-3',
                    title: 'Threads and Locks Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '31-4',
                    title: 'Threads and Locks Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '31-5',
                    title: 'Threads and Locks Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '31-6',
                    title: 'Threads and Locks Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '32',
            title: 'Object Oriented Design',
            problems: [
                {
                    id: '32-1',
                    title: 'Object Oriented Design Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '32-2',
                    title: 'Object Oriented Design Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '32-3',
                    title: 'Object Oriented Design Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '32-4',
                    title: 'Object Oriented Design Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '32-5',
                    title: 'Object Oriented Design Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '32-6',
                    title: 'Object Oriented Design Problem 6',
                    difficulty: 'Easy',
                },
                {
                    id: '32-7',
                    title: 'Object Oriented Design Problem 7',
                    difficulty: 'Easy',
                },
                {
                    id: '32-8',
                    title: 'Object Oriented Design Problem 8',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '33',
            title: 'System Design',
            problems: [
                {
                    id: '33-1',
                    title: 'System Design Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '33-2',
                    title: 'System Design Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '33-3',
                    title: 'System Design Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '33-4',
                    title: 'System Design Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '33-5',
                    title: 'System Design Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '33-6',
                    title: 'System Design Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '34',
            title: 'Threads and Locks',
            problems: [
                {
                    id: '34-1',
                    title: 'Threads and Locks Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '34-2',
                    title: 'Threads and Locks Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '34-3',
                    title: 'Threads and Locks Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '34-4',
                    title: 'Threads and Locks Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '34-5',
                    title: 'Threads and Locks Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '34-6',
                    title: 'Threads and Locks Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '35',
            title: 'Object Oriented Design',
            problems: [
                {
                    id: '35-1',
                    title: 'Object Oriented Design Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '35-2',
                    title: 'Object Oriented Design Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '35-3',
                    title: 'Object Oriented Design Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '35-4',
                    title: 'Object Oriented Design Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '35-5',
                    title: 'Object Oriented Design Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '35-6',
                    title: 'Object Oriented Design Problem 6',
                    difficulty: 'Easy',
                },
                {
                    id: '35-7',
                    title: 'Object Oriented Design Problem 7',
                    difficulty: 'Easy',
                },
                {
                    id: '35-8',
                    title: 'Object Oriented Design Problem 8',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '36',
            title: 'System Design',
            problems: [
                {
                    id: '36-1',
                    title: 'System Design Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '36-2',
                    title: 'System Design Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '36-3',
                    title: 'System Design Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '36-4',
                    title: 'System Design Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '36-5',
                    title: 'System Design Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '36-6',
                    title: 'System Design Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '37',
            title: 'Threads and Locks',
            problems: [
                {
                    id: '37-1',
                    title: 'Threads and Locks Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '37-2',
                    title: 'Threads and Locks Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '37-3',
                    title: 'Threads and Locks Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '37-4',
                    title: 'Threads and Locks Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '37-5',
                    title: 'Threads and Locks Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '37-6',
                    title: 'Threads and Locks Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '38',
            title: 'Object Oriented Design',
            summary: 'Object Oriented Design concepts and practice',
            problems: [
                {
                    id: '38-1',
                    title: 'Object Oriented Design Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '38-2',
                    title: 'Object Oriented Design Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '38-3',
                    title: 'Object Oriented Design Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '38-4',
                    title: 'Object Oriented Design Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '38-5',
                    title: 'Object Oriented Design Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '38-6',
                    title: 'Object Oriented Design Problem 6',
                    difficulty: 'Easy',
                },
                {
                    id: '38-7',
                    title: 'Object Oriented Design Problem 7',
                    difficulty: 'Easy',
                },
                {
                    id: '38-8',
                    title: 'Object Oriented Design Problem 8',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '39',
            title: 'System Design',
            summary: 'System Design concepts and practice',
            problems: [
                {
                    id: '39-1',
                    title: 'System Design Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '39-2',
                    title: 'System Design Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '39-3',
                    title: 'System Design Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '39-4',
                    title: 'System Design Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '39-5',
                    title: 'System Design Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '39-6',
                    title: 'System Design Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '40',
            title: 'Threads and Locks',
            summary: 'Threads and Locks concepts and practice',
            problems: [
                {
                    id: '40-1',
                    title: 'Threads and Locks Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '40-2',
                    title: 'Threads and Locks Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '40-3',
                    title: 'Threads and Locks Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '40-4',
                    title: 'Threads and Locks Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '40-5',
                    title: 'Threads and Locks Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '40-6',
                    title: 'Threads and Locks Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
    ],
}

// ─── CP4 ──────────────────────────────────────────────────────────────
const cp4: Book = {
    slug: 'cp4',
    title: 'Competitive Programming 4',
    shortTitle: 'CP4',
    author: 'Steven & Felix Halim',
    edition: '4th',
    year: 2020,
    coverUrl: '/assets/books/cover-cp4.jpg',
    color: '#065f46',
    accentColor: '#10b981',
    description: 'The de-facto competitive programming textbook covering data structures, algorithms, and problem solving strategies with 5000+ referenced OJ problems.',
    totalProblems: 333,
    tags: [
          'Competitive',
          'Algorithms',
          'Data Structures',
          'Math',
          'Graphs'
        ],
    chapters: [
        {
            num: '1',
            title: 'Introduction',
            page: 1,
            problems: [
                {
                    id: '1-A',
                    title: 'Army Strength (Easy)',
                    difficulty: 'Easy',
                    tags: [
                                          'AdHoc'
                                        ],
                },
                {
                    id: '1-B',
                    title: 'Codeforces 439A — Devu and Dishes',
                    difficulty: 'Easy',
                    tags: [
                                          'AdHoc'
                                        ],
                },
                {
                    id: '1-C',
                    title: 'UVa 10055 — Hashmat the Brave Warrior',
                    difficulty: 'Easy',
                    tags: [
                                          'AdHoc',
                                          'Math'
                                        ],
                },
                {
                    id: '1-D',
                    title: 'UVa 11044 — Searching for Nessy',
                    difficulty: 'Easy',
                    tags: [
                                          'AdHoc'
                                        ],
                },
                {
                    id: '1-E',
                    title: 'UVa 11172 — Relational Operator',
                    difficulty: 'Easy',
                    tags: [
                                          'AdHoc'
                                        ],
                },
                {
                    id: '1-F',
                    title: 'Kattis 3nplus1 — 3n+1',
                    difficulty: 'Easy',
                    tags: [
                                          'AdHoc',
                                          'Math'
                                        ],
                },
                {
                    id: '1-G',
                    title: 'UVa 10424 — Love Calculator',
                    difficulty: 'Easy',
                    tags: [
                                          'AdHoc',
                                          'Strings'
                                        ],
                },
                {
                    id: '1-H',
                    title: 'UVa 10878 — Decode the Tape',
                    difficulty: 'Easy',
                    tags: [
                                          'AdHoc',
                                          'Bit'
                                        ],
                },
                {
                    id: '1-I',
                    title: 'UVa 12468 — Zapping',
                    difficulty: 'Easy',
                    tags: [
                                          'AdHoc'
                                        ],
                },
                {
                    id: '1-J',
                    title: 'Kattis stringmatching — String Matching',
                    difficulty: 'Easy',
                    tags: [
                                          'Strings'
                                        ],
                },
            ],
        },
        {
            num: '2',
            title: 'Data Structures and Libraries',
            page: 31,
            problems: [
                {
                    id: '2-A',
                    title: 'UVa 11988 — Broken Keyboard',
                    difficulty: 'Easy',
                    tags: [
                                          'LinkedList',
                                          'Strings'
                                        ],
                },
                {
                    id: '2-B',
                    title: 'UVa 10954 — Add All',
                    difficulty: 'Easy',
                    tags: [
                                          'Heap',
                                          'Greedy'
                                        ],
                },
                {
                    id: '2-C',
                    title: 'UVa 11572 — Unique Snowflakes',
                    difficulty: 'Medium',
                    tags: [
                                          'SlidingWindow',
                                          'Hash'
                                        ],
                },
                {
                    id: '2-D',
                    title: 'UVa 11235 — Frequent Values',
                    difficulty: 'Medium',
                    tags: [
                                          'SegTree',
                                          'RMQ'
                                        ],
                },
                {
                    id: '2-E',
                    title: 'UVa 11136 — Hoax or what',
                    difficulty: 'Easy',
                    tags: [
                                          'Heap',
                                          'MultiSet'
                                        ],
                },
                {
                    id: '2-F',
                    title: 'Kattis avoidingavoidance — Avoiding Avoidance',
                    difficulty: 'Medium',
                    tags: [
                                          'Graph',
                                          'BFS'
                                        ],
                },
                {
                    id: '2-G',
                    title: 'UVa 10158 — War',
                    difficulty: 'Medium',
                    tags: [
                                          'UnionFind'
                                        ],
                },
                {
                    id: '2-H',
                    title: 'UVa 11503 — Virtual Friends',
                    difficulty: 'Easy',
                    tags: [
                                          'UnionFind'
                                        ],
                },
                {
                    id: '2-I',
                    title: 'Kattis fenwick — Fenwick Tree',
                    difficulty: 'Medium',
                    tags: [
                                          'FenwickTree',
                                          'BIT'
                                        ],
                },
                {
                    id: '2-J',
                    title: 'UVa 11402 — Ahoy, Pirates!',
                    difficulty: 'Hard',
                    tags: [
                                          'SegTree',
                                          'LazyProp'
                                        ],
                },
                {
                    id: '2-K',
                    title: 'CF 380C — Sereja and Brackets',
                    difficulty: 'Medium',
                    tags: [
                                          'SegTree',
                                          'Stack'
                                        ],
                },
                {
                    id: '2-L',
                    title: 'Kattis stringmultimatching',
                    difficulty: 'Hard',
                    tags: [
                                          'Strings',
                                          'AhoCorasick'
                                        ],
                },
            ],
        },
        {
            num: '3',
            title: 'Problem Solving Paradigms',
            page: 91,
            problems: [
                {
                    id: '3-A',
                    title: 'UVa 725 — Division',
                    difficulty: 'Easy',
                    tags: [
                                          'BruteForce'
                                        ],
                },
                {
                    id: '3-B',
                    title: 'UVa 11565 — Simple Equations',
                    difficulty: 'Medium',
                    tags: [
                                          'BruteForce'
                                        ],
                },
                {
                    id: '3-C',
                    title: 'UVa 11553 — Grid Game',
                    difficulty: 'Medium',
                    tags: [
                                          'Backtracking',
                                          'Permutation'
                                        ],
                },
                {
                    id: '3-D',
                    title: 'UVa 10276 — Hanoi Tower Troubles Again!',
                    difficulty: 'Medium',
                    tags: [
                                          'Greedy'
                                        ],
                },
                {
                    id: '3-E',
                    title: 'UVa 10570 — Meeting with Aliens',
                    difficulty: 'Medium',
                    tags: [
                                          'Greedy',
                                          'Sorting'
                                        ],
                },
                {
                    id: '3-F',
                    title: 'UVa 11292 — Dragon of Loowater',
                    difficulty: 'Easy',
                    tags: [
                                          'Greedy',
                                          'Sorting'
                                        ],
                },
                {
                    id: '3-G',
                    title: 'UVa 10341 — Solve It',
                    difficulty: 'Easy',
                    tags: [
                                          'BinarySearch',
                                          'Math'
                                        ],
                },
                {
                    id: '3-H',
                    title: 'UVa 11057 — Exact Sum',
                    difficulty: 'Easy',
                    tags: [
                                          'BinarySearch',
                                          'TwoPointers'
                                        ],
                },
                {
                    id: '3-I',
                    title: 'UVa 10003 — Cutting Sticks',
                    difficulty: 'Medium',
                    tags: [
                                          'DP',
                                          'IntervalDP'
                                        ],
                },
                {
                    id: '3-J',
                    title: 'UVa 10943 — How do you Add?',
                    difficulty: 'Easy',
                    tags: [
                                          'DP',
                                          'Counting'
                                        ],
                },
                {
                    id: '3-K',
                    title: 'UVa 10131 — Is Bigger Smarter?',
                    difficulty: 'Medium',
                    tags: [
                                          'DP',
                                          'LIS'
                                        ],
                },
                {
                    id: '3-L',
                    title: 'UVa 10154 — Weights and Measures',
                    difficulty: 'Medium',
                    tags: [
                                          'DP',
                                          'Greedy'
                                        ],
                },
                {
                    id: '3-M',
                    title: 'UVa 10616 — Divisible Group Sums',
                    difficulty: 'Medium',
                    tags: [
                                          'DP',
                                          'Knapsack'
                                        ],
                },
                {
                    id: '3-N',
                    title: 'CF 67C — Pythagorean Triples',
                    difficulty: 'Medium',
                    tags: [
                                          'Math',
                                          'DP'
                                        ],
                },
                {
                    id: '3-O',
                    title: 'Kattis thehardway — The Hard Way',
                    difficulty: 'Hard',
                    tags: [
                                          'DP',
                                          'BitmaskDP'
                                        ],
                },
                {
                    id: '3-P',
                    title: 'UVa 10465 — Homer Simpson',
                    difficulty: 'Easy',
                    tags: [
                                          'DP',
                                          'Knapsack'
                                        ],
                },
            ],
        },
        {
            num: '4',
            title: 'Graph',
            page: 156,
            problems: [
                {
                    id: '4-A',
                    title: 'UVa 336 — A Node Too Far',
                    difficulty: 'Easy',
                    tags: [
                                          'BFS'
                                        ],
                },
                {
                    id: '4-B',
                    title: 'UVa 10004 — Bicoloring',
                    difficulty: 'Easy',
                    tags: [
                                          'BFS',
                                          'Bipartite'
                                        ],
                },
                {
                    id: '4-C',
                    title: 'UVa 11902 — Dominator',
                    difficulty: 'Medium',
                    tags: [
                                          'DFS',
                                          'Graph'
                                        ],
                },
                {
                    id: '4-D',
                    title: 'UVa 10305 — Ordering Tasks',
                    difficulty: 'Easy',
                    tags: [
                                          'TopSort',
                                          'DAG'
                                        ],
                },
                {
                    id: '4-E',
                    title: 'UVa 11504 — Dominos',
                    difficulty: 'Medium',
                    tags: [
                                          'SCC',
                                          'Kosaraju'
                                        ],
                },
                {
                    id: '4-F',
                    title: 'UVa 315 — Network',
                    difficulty: 'Medium',
                    tags: [
                                          'ArticulationPoint'
                                        ],
                },
                {
                    id: '4-G',
                    title: 'UVa 10099 — The Tourist Guide',
                    difficulty: 'Medium',
                    tags: [
                                          'Dijkstra',
                                          'MST'
                                        ],
                },
                {
                    id: '4-H',
                    title: 'UVa 10986 — Sending email',
                    difficulty: 'Easy',
                    tags: [
                                          'Dijkstra',
                                          'SSSP'
                                        ],
                },
                {
                    id: '4-I',
                    title: 'UVa 11280 — Flying to Fredericton',
                    difficulty: 'Medium',
                    tags: [
                                          'Dijkstra',
                                          'SSSP'
                                        ],
                },
                {
                    id: '4-J',
                    title: 'UVa 10048 — Audiophobia',
                    difficulty: 'Medium',
                    tags: [
                                          'FloydWarshall',
                                          'APSP'
                                        ],
                },
                {
                    id: '4-K',
                    title: 'UVa 1108 — Mining Your Own Business',
                    difficulty: 'Hard',
                    tags: [
                                          'Graph',
                                          'BridgesAP'
                                        ],
                },
                {
                    id: '4-L',
                    title: 'UVa 10369 — Arctic Network',
                    difficulty: 'Medium',
                    tags: [
                                          'MST',
                                          'Kruskal'
                                        ],
                },
                {
                    id: '4-M',
                    title: 'UVa 10034 — Freckles',
                    difficulty: 'Easy',
                    tags: [
                                          'MST',
                                          'Prim'
                                        ],
                },
                {
                    id: '4-N',
                    title: 'UVa 820 — Internet Bandwidth',
                    difficulty: 'Medium',
                    tags: [
                                          'MaxFlow'
                                        ],
                },
                {
                    id: '4-O',
                    title: 'UVa 10080 — Gopher II',
                    difficulty: 'Medium',
                    tags: [
                                          'BipartiteMatching'
                                        ],
                },
                {
                    id: '4-P',
                    title: 'CF 237E — Build a Graph',
                    difficulty: 'Hard',
                    tags: [
                                          'Graph',
                                          'Construction'
                                        ],
                },
            ],
        },
        {
            num: '5',
            title: 'Mathematics',
            page: 246,
            problems: [
                {
                    id: '5-A',
                    title: 'UVa 10050 — Hartals',
                    difficulty: 'Easy',
                    tags: [
                                          'Math',
                                          'Simulation'
                                        ],
                },
                {
                    id: '5-B',
                    title: 'UVa 10090 — Marbles',
                    difficulty: 'Medium',
                    tags: [
                                          'Math',
                                          'ExtendedGCD'
                                        ],
                },
                {
                    id: '5-C',
                    title: 'UVa 10139 — Factovisors',
                    difficulty: 'Easy',
                    tags: [
                                          'Math',
                                          'NumberTheory'
                                        ],
                },
                {
                    id: '5-D',
                    title: 'UVa 10168 — Summation of Four Primes',
                    difficulty: 'Medium',
                    tags: [
                                          'Math',
                                          'Sieve'
                                        ],
                },
                {
                    id: '5-E',
                    title: 'UVa 10717 — Mint',
                    difficulty: 'Medium',
                    tags: [
                                          'Math',
                                          'LCM'
                                        ],
                },
                {
                    id: '5-F',
                    title: 'UVa 10407 — Simple division',
                    difficulty: 'Easy',
                    tags: [
                                          'Math',
                                          'GCD'
                                        ],
                },
                {
                    id: '5-G',
                    title: 'UVa 11428 — Cubes',
                    difficulty: 'Medium',
                    tags: [
                                          'Math',
                                          'BinarySearch'
                                        ],
                },
                {
                    id: '5-H',
                    title: 'UVa 10925 — Krakovia',
                    difficulty: 'Easy',
                    tags: [
                                          'Math',
                                          'BigNum'
                                        ],
                },
                {
                    id: '5-I',
                    title: 'UVa 11169 — Nice Patterns Strike Back',
                    difficulty: 'Hard',
                    tags: [
                                          'MatrixExp',
                                          'DP'
                                        ],
                },
                {
                    id: '5-J',
                    title: 'UVa 10518 — How Many Calls?',
                    difficulty: 'Medium',
                    tags: [
                                          'MatrixExp',
                                          'Fibonacci'
                                        ],
                },
                {
                    id: '5-K',
                    title: 'CF 55D — Beautiful numbers',
                    difficulty: 'Hard',
                    tags: [
                                          'DP',
                                          'DigitDP'
                                        ],
                },
                {
                    id: '5-L',
                    title: 'UVa 10491 — Cows and Cars',
                    difficulty: 'Medium',
                    tags: [
                                          'Probability',
                                          'Math'
                                        ],
                },
                {
                    id: '5-M',
                    title: 'Kattis combinatoric — Combination',
                    difficulty: 'Medium',
                    tags: [
                                          'Combinatorics'
                                        ],
                },
                {
                    id: '5-N',
                    title: 'UVa 10519 — !! Really Strange!!',
                    difficulty: 'Hard',
                    tags: [
                                          'Combinatorics',
                                          'BigNum'
                                        ],
                },
                {
                    id: '5-O',
                    title: 'UVa 10228 — A Star not a Tree?',
                    difficulty: 'Medium',
                    tags: [
                                          'Geometry',
                                          'Math'
                                        ],
                },
            ],
        },
        {
            num: '6',
            title: 'String Processing',
            page: 1,
            problems: [
                {
                    id: '6-A',
                    title: 'UVa 10340 — All in All',
                    difficulty: 'Easy',
                    tags: [
                                          'Strings',
                                          'TwoPointers'
                                        ],
                },
                {
                    id: '6-B',
                    title: 'UVa 10298 — Power Strings',
                    difficulty: 'Medium',
                    hint: 'KMP failure function.',
                    tags: [
                                          'Strings',
                                          'KMP'
                                        ],
                },
                {
                    id: '6-C',
                    title: 'UVa 11475 — Extend to Palindrome',
                    difficulty: 'Medium',
                    tags: [
                                          'Strings',
                                          'KMP'
                                        ],
                },
                {
                    id: '6-D',
                    title: 'UVa 11826 — BBST',
                    difficulty: 'Medium',
                    tags: [
                                          'Strings',
                                          'SuffixArray'
                                        ],
                },
                {
                    id: '6-E',
                    title: 'UVa 12206 — Stammering Aliens',
                    difficulty: 'Hard',
                    tags: [
                                          'Strings',
                                          'SuffixArray'
                                        ],
                },
                {
                    id: '6-F',
                    title: 'Kattis ahocorasick — Aho-Corasick',
                    difficulty: 'Hard',
                    tags: [
                                          'Strings',
                                          'AhoCorasick'
                                        ],
                },
                {
                    id: '6-G',
                    title: 'UVa 11584 — Partitioning by Palindromes',
                    difficulty: 'Hard',
                    tags: [
                                          'Strings',
                                          'DP',
                                          'Palindrome'
                                        ],
                },
                {
                    id: '6-H',
                    title: 'UVa 10310 — Dog and Gopher',
                    difficulty: 'Easy',
                    tags: [
                                          'Strings',
                                          'Regex'
                                        ],
                },
                {
                    id: '6-I',
                    title: 'CF 31E — TV Game',
                    difficulty: 'Hard',
                    tags: [
                                          'Strings',
                                          'DP',
                                          'GameTheory'
                                        ],
                },
                {
                    id: '6-J',
                    title: 'UVa 10350 — Liftless EME',
                    difficulty: 'Medium',
                    tags: [
                                          'Strings',
                                          'Hashing'
                                        ],
                },
            ],
        },
        {
            num: '7',
            title: 'Computational Geometry',
            page: 61,
            problems: [
                {
                    id: '7-A',
                    title: 'UVa 587 — There\'s treasure everywhere!',
                    difficulty: 'Easy',
                    tags: [
                                          'Geometry',
                                          'Distance'
                                        ],
                },
                {
                    id: '7-B',
                    title: 'UVa 11624 — Fire!',
                    difficulty: 'Medium',
                    tags: [
                                          'BFS',
                                          'Geometry'
                                        ],
                },
                {
                    id: '7-C',
                    title: 'UVa 10084 — Hotter Colder',
                    difficulty: 'Medium',
                    tags: [
                                          'Geometry',
                                          'Polygon'
                                        ],
                },
                {
                    id: '7-D',
                    title: 'UVa 11265 — The Sultan\'s Problem',
                    difficulty: 'Hard',
                    tags: [
                                          'Geometry',
                                          'HalfPlane'
                                        ],
                },
                {
                    id: '7-E',
                    title: 'UVa 109 — Scud Busters',
                    difficulty: 'Medium',
                    tags: [
                                          'Geometry',
                                          'ConvexHull'
                                        ],
                },
                {
                    id: '7-F',
                    title: 'UVa 10652 — Board Wrapping',
                    difficulty: 'Medium',
                    tags: [
                                          'Geometry',
                                          'ConvexHull'
                                        ],
                },
                {
                    id: '7-G',
                    title: 'UVa 11447 — Reservoir Logs',
                    difficulty: 'Medium',
                    tags: [
                                          'Geometry',
                                          'Polygon'
                                        ],
                },
                {
                    id: '7-H',
                    title: 'UVa 11718 — Fantasy of a Summation',
                    difficulty: 'Hard',
                    tags: [
                                          'Math',
                                          'MatrixExp'
                                        ],
                },
                {
                    id: '7-I',
                    title: 'Kattis pointinpolygon — Point in Polygon',
                    difficulty: 'Easy',
                    tags: [
                                          'Geometry'
                                        ],
                },
                {
                    id: '7-J',
                    title: 'UVa 12578 — 10:6:2',
                    difficulty: 'Hard',
                    tags: [
                                          'Geometry',
                                          'SegTree'
                                        ],
                },
            ],
        },
        {
            num: '8',
            title: 'More Advanced Topics',
            page: 121,
            problems: [
                {
                    id: '8-A',
                    title: 'CF 340E — Xenia and Tree',
                    difficulty: 'Hard',
                    tags: [
                                          'HLD',
                                          'SegTree'
                                        ],
                },
                {
                    id: '8-B',
                    title: 'CF 343D — Water Tree',
                    difficulty: 'Hard',
                    tags: [
                                          'HLD',
                                          'DFS'
                                        ],
                },
                {
                    id: '8-C',
                    title: 'UVa 11380 — Down Went The Titanic',
                    difficulty: 'Hard',
                    tags: [
                                          'MaxFlow',
                                          'Graph'
                                        ],
                },
                {
                    id: '8-D',
                    title: 'UVa 11765 — Component Placement',
                    difficulty: 'Hard',
                    tags: [
                                          'MinCut',
                                          'MaxFlow'
                                        ],
                },
                {
                    id: '8-E',
                    title: 'CF 101B — Buses',
                    difficulty: 'Hard',
                    tags: [
                                          'DP',
                                          'SegTree'
                                        ],
                },
                {
                    id: '8-F',
                    title: 'UVa 10746 — Crime Wave — The Sequel',
                    difficulty: 'Hard',
                    tags: [
                                          'MinCostFlow'
                                        ],
                },
                {
                    id: '8-G',
                    title: 'CF 521E — Cycling City',
                    difficulty: 'Hard',
                    tags: [
                                          'Graph',
                                          'TwoSAT'
                                        ],
                },
                {
                    id: '8-H',
                    title: 'CF 228E — The Road to Berland is Paved With…',
                    difficulty: 'Hard',
                    tags: [
                                          'TwoSAT'
                                        ],
                },
                {
                    id: '8-I',
                    title: 'Kattis cdq — CDQ Divide and Conquer',
                    difficulty: 'Hard',
                    tags: [
                                          'DivideConquer',
                                          'CDQ'
                                        ],
                },
                {
                    id: '8-J',
                    title: 'CF 280C — Game on Tree',
                    difficulty: 'Hard',
                    tags: [
                                          'EulerTour',
                                          'Mo'
                                        ],
                },
            ],
        },
        {
            num: '9',
            title: 'Mathematics',
            problems: [
                {
                    id: '9-1',
                    title: 'Problem 9.1',
                    difficulty: 'Easy',
                },
                {
                    id: '9-2',
                    title: 'Problem 9.2',
                    difficulty: 'Easy',
                },
                {
                    id: '9-3',
                    title: 'Problem 9.3',
                    difficulty: 'Medium',
                },
                {
                    id: '9-4',
                    title: 'Problem 9.4',
                    difficulty: 'Medium',
                },
                {
                    id: '9-5',
                    title: 'Problem 9.5',
                    difficulty: 'Hard',
                },
                {
                    id: '9-6',
                    title: 'Problem 9.6',
                    difficulty: 'Easy',
                },
                {
                    id: '9-7',
                    title: 'Problem 9.7',
                    difficulty: 'Easy',
                },
                {
                    id: '9-8',
                    title: 'Problem 9.8',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '10',
            title: 'Game Theory',
            problems: [
                {
                    id: '10-1',
                    title: 'Problem 10.1',
                    difficulty: 'Easy',
                },
                {
                    id: '10-2',
                    title: 'Problem 10.2',
                    difficulty: 'Easy',
                },
                {
                    id: '10-3',
                    title: 'Problem 10.3',
                    difficulty: 'Medium',
                },
                {
                    id: '10-4',
                    title: 'Problem 10.4',
                    difficulty: 'Medium',
                },
                {
                    id: '10-5',
                    title: 'Problem 10.5',
                    difficulty: 'Hard',
                },
                {
                    id: '10-6',
                    title: 'Problem 10.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '11',
            title: 'Advanced Data Structures',
            problems: [
                {
                    id: '11-1',
                    title: 'Problem 11.1',
                    difficulty: 'Easy',
                },
                {
                    id: '11-2',
                    title: 'Problem 11.2',
                    difficulty: 'Easy',
                },
                {
                    id: '11-3',
                    title: 'Problem 11.3',
                    difficulty: 'Medium',
                },
                {
                    id: '11-4',
                    title: 'Problem 11.4',
                    difficulty: 'Medium',
                },
                {
                    id: '11-5',
                    title: 'Problem 11.5',
                    difficulty: 'Hard',
                },
                {
                    id: '11-6',
                    title: 'Problem 11.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '12',
            title: 'String Algorithms',
            problems: [
                {
                    id: '12-1',
                    title: 'Problem 12.1',
                    difficulty: 'Easy',
                },
                {
                    id: '12-2',
                    title: 'Problem 12.2',
                    difficulty: 'Easy',
                },
                {
                    id: '12-3',
                    title: 'Problem 12.3',
                    difficulty: 'Medium',
                },
                {
                    id: '12-4',
                    title: 'Problem 12.4',
                    difficulty: 'Medium',
                },
                {
                    id: '12-5',
                    title: 'Problem 12.5',
                    difficulty: 'Hard',
                },
                {
                    id: '12-6',
                    title: 'Problem 12.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '13',
            title: 'Mathematics',
            problems: [
                {
                    id: '13-1',
                    title: 'Mathematics Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '13-2',
                    title: 'Mathematics Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '13-3',
                    title: 'Mathematics Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '13-4',
                    title: 'Mathematics Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '13-5',
                    title: 'Mathematics Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '13-6',
                    title: 'Mathematics Problem 6',
                    difficulty: 'Easy',
                },
                {
                    id: '13-7',
                    title: 'Mathematics Problem 7',
                    difficulty: 'Easy',
                },
                {
                    id: '13-8',
                    title: 'Mathematics Problem 8',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '14',
            title: 'Game Theory',
            problems: [
                {
                    id: '14-1',
                    title: 'Game Theory Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '14-2',
                    title: 'Game Theory Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '14-3',
                    title: 'Game Theory Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '14-4',
                    title: 'Game Theory Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '14-5',
                    title: 'Game Theory Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '14-6',
                    title: 'Game Theory Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '15',
            title: 'Advanced Data Structures',
            problems: [
                {
                    id: '15-1',
                    title: 'Advanced Data Structures Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '15-2',
                    title: 'Advanced Data Structures Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '15-3',
                    title: 'Advanced Data Structures Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '15-4',
                    title: 'Advanced Data Structures Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '15-5',
                    title: 'Advanced Data Structures Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '15-6',
                    title: 'Advanced Data Structures Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '16',
            title: 'String Algorithms',
            problems: [
                {
                    id: '16-1',
                    title: 'String Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '16-2',
                    title: 'String Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '16-3',
                    title: 'String Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '16-4',
                    title: 'String Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '16-5',
                    title: 'String Algorithms Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '16-6',
                    title: 'String Algorithms Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '17',
            title: 'Mathematics',
            problems: [
                {
                    id: '17-1',
                    title: 'Mathematics Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '17-2',
                    title: 'Mathematics Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '17-3',
                    title: 'Mathematics Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '17-4',
                    title: 'Mathematics Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '17-5',
                    title: 'Mathematics Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '17-6',
                    title: 'Mathematics Problem 6',
                    difficulty: 'Easy',
                },
                {
                    id: '17-7',
                    title: 'Mathematics Problem 7',
                    difficulty: 'Easy',
                },
                {
                    id: '17-8',
                    title: 'Mathematics Problem 8',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '18',
            title: 'Game Theory',
            problems: [
                {
                    id: '18-1',
                    title: 'Game Theory Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '18-2',
                    title: 'Game Theory Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '18-3',
                    title: 'Game Theory Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '18-4',
                    title: 'Game Theory Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '18-5',
                    title: 'Game Theory Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '18-6',
                    title: 'Game Theory Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '19',
            title: 'Advanced Data Structures',
            problems: [
                {
                    id: '19-1',
                    title: 'Advanced Data Structures Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '19-2',
                    title: 'Advanced Data Structures Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '19-3',
                    title: 'Advanced Data Structures Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '19-4',
                    title: 'Advanced Data Structures Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '19-5',
                    title: 'Advanced Data Structures Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '19-6',
                    title: 'Advanced Data Structures Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '20',
            title: 'String Algorithms',
            problems: [
                {
                    id: '20-1',
                    title: 'String Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '20-2',
                    title: 'String Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '20-3',
                    title: 'String Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '20-4',
                    title: 'String Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '20-5',
                    title: 'String Algorithms Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '20-6',
                    title: 'String Algorithms Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '21',
            title: 'Mathematics',
            problems: [
                {
                    id: '21-1',
                    title: 'Mathematics Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '21-2',
                    title: 'Mathematics Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '21-3',
                    title: 'Mathematics Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '21-4',
                    title: 'Mathematics Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '21-5',
                    title: 'Mathematics Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '21-6',
                    title: 'Mathematics Problem 6',
                    difficulty: 'Easy',
                },
                {
                    id: '21-7',
                    title: 'Mathematics Problem 7',
                    difficulty: 'Easy',
                },
                {
                    id: '21-8',
                    title: 'Mathematics Problem 8',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '22',
            title: 'Game Theory',
            problems: [
                {
                    id: '22-1',
                    title: 'Game Theory Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '22-2',
                    title: 'Game Theory Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '22-3',
                    title: 'Game Theory Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '22-4',
                    title: 'Game Theory Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '22-5',
                    title: 'Game Theory Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '22-6',
                    title: 'Game Theory Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '23',
            title: 'Advanced Data Structures',
            problems: [
                {
                    id: '23-1',
                    title: 'Advanced Data Structures Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '23-2',
                    title: 'Advanced Data Structures Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '23-3',
                    title: 'Advanced Data Structures Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '23-4',
                    title: 'Advanced Data Structures Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '23-5',
                    title: 'Advanced Data Structures Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '23-6',
                    title: 'Advanced Data Structures Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '24',
            title: 'String Algorithms',
            problems: [
                {
                    id: '24-1',
                    title: 'String Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '24-2',
                    title: 'String Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '24-3',
                    title: 'String Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '24-4',
                    title: 'String Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '24-5',
                    title: 'String Algorithms Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '24-6',
                    title: 'String Algorithms Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '25',
            title: 'Mathematics',
            problems: [
                {
                    id: '25-1',
                    title: 'Mathematics Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '25-2',
                    title: 'Mathematics Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '25-3',
                    title: 'Mathematics Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '25-4',
                    title: 'Mathematics Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '25-5',
                    title: 'Mathematics Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '25-6',
                    title: 'Mathematics Problem 6',
                    difficulty: 'Easy',
                },
                {
                    id: '25-7',
                    title: 'Mathematics Problem 7',
                    difficulty: 'Easy',
                },
                {
                    id: '25-8',
                    title: 'Mathematics Problem 8',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '26',
            title: 'Game Theory',
            problems: [
                {
                    id: '26-1',
                    title: 'Game Theory Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '26-2',
                    title: 'Game Theory Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '26-3',
                    title: 'Game Theory Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '26-4',
                    title: 'Game Theory Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '26-5',
                    title: 'Game Theory Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '26-6',
                    title: 'Game Theory Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '27',
            title: 'Advanced Data Structures',
            problems: [
                {
                    id: '27-1',
                    title: 'Advanced Data Structures Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '27-2',
                    title: 'Advanced Data Structures Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '27-3',
                    title: 'Advanced Data Structures Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '27-4',
                    title: 'Advanced Data Structures Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '27-5',
                    title: 'Advanced Data Structures Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '27-6',
                    title: 'Advanced Data Structures Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '28',
            title: 'String Algorithms',
            problems: [
                {
                    id: '28-1',
                    title: 'String Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '28-2',
                    title: 'String Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '28-3',
                    title: 'String Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '28-4',
                    title: 'String Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '28-5',
                    title: 'String Algorithms Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '28-6',
                    title: 'String Algorithms Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '29',
            title: 'Mathematics',
            problems: [
                {
                    id: '29-1',
                    title: 'Mathematics Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '29-2',
                    title: 'Mathematics Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '29-3',
                    title: 'Mathematics Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '29-4',
                    title: 'Mathematics Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '29-5',
                    title: 'Mathematics Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '29-6',
                    title: 'Mathematics Problem 6',
                    difficulty: 'Easy',
                },
                {
                    id: '29-7',
                    title: 'Mathematics Problem 7',
                    difficulty: 'Easy',
                },
                {
                    id: '29-8',
                    title: 'Mathematics Problem 8',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '30',
            title: 'Game Theory',
            problems: [
                {
                    id: '30-1',
                    title: 'Game Theory Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '30-2',
                    title: 'Game Theory Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '30-3',
                    title: 'Game Theory Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '30-4',
                    title: 'Game Theory Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '30-5',
                    title: 'Game Theory Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '30-6',
                    title: 'Game Theory Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '31',
            title: 'Advanced Data Structures',
            problems: [
                {
                    id: '31-1',
                    title: 'Advanced Data Structures Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '31-2',
                    title: 'Advanced Data Structures Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '31-3',
                    title: 'Advanced Data Structures Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '31-4',
                    title: 'Advanced Data Structures Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '31-5',
                    title: 'Advanced Data Structures Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '31-6',
                    title: 'Advanced Data Structures Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '32',
            title: 'String Algorithms',
            problems: [
                {
                    id: '32-1',
                    title: 'String Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '32-2',
                    title: 'String Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '32-3',
                    title: 'String Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '32-4',
                    title: 'String Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '32-5',
                    title: 'String Algorithms Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '32-6',
                    title: 'String Algorithms Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '33',
            title: 'Mathematics',
            problems: [
                {
                    id: '33-1',
                    title: 'Mathematics Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '33-2',
                    title: 'Mathematics Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '33-3',
                    title: 'Mathematics Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '33-4',
                    title: 'Mathematics Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '33-5',
                    title: 'Mathematics Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '33-6',
                    title: 'Mathematics Problem 6',
                    difficulty: 'Easy',
                },
                {
                    id: '33-7',
                    title: 'Mathematics Problem 7',
                    difficulty: 'Easy',
                },
                {
                    id: '33-8',
                    title: 'Mathematics Problem 8',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '34',
            title: 'Game Theory',
            problems: [
                {
                    id: '34-1',
                    title: 'Game Theory Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '34-2',
                    title: 'Game Theory Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '34-3',
                    title: 'Game Theory Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '34-4',
                    title: 'Game Theory Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '34-5',
                    title: 'Game Theory Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '34-6',
                    title: 'Game Theory Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '35',
            title: 'Advanced Data Structures',
            problems: [
                {
                    id: '35-1',
                    title: 'Advanced Data Structures Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '35-2',
                    title: 'Advanced Data Structures Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '35-3',
                    title: 'Advanced Data Structures Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '35-4',
                    title: 'Advanced Data Structures Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '35-5',
                    title: 'Advanced Data Structures Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '35-6',
                    title: 'Advanced Data Structures Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '36',
            title: 'String Algorithms',
            problems: [
                {
                    id: '36-1',
                    title: 'String Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '36-2',
                    title: 'String Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '36-3',
                    title: 'String Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '36-4',
                    title: 'String Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '36-5',
                    title: 'String Algorithms Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '36-6',
                    title: 'String Algorithms Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '37',
            title: 'Mathematics',
            problems: [
                {
                    id: '37-1',
                    title: 'Mathematics Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '37-2',
                    title: 'Mathematics Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '37-3',
                    title: 'Mathematics Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '37-4',
                    title: 'Mathematics Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '37-5',
                    title: 'Mathematics Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '37-6',
                    title: 'Mathematics Problem 6',
                    difficulty: 'Easy',
                },
                {
                    id: '37-7',
                    title: 'Mathematics Problem 7',
                    difficulty: 'Easy',
                },
                {
                    id: '37-8',
                    title: 'Mathematics Problem 8',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '38',
            title: 'Game Theory',
            problems: [
                {
                    id: '38-1',
                    title: 'Game Theory Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '38-2',
                    title: 'Game Theory Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '38-3',
                    title: 'Game Theory Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '38-4',
                    title: 'Game Theory Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '38-5',
                    title: 'Game Theory Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '38-6',
                    title: 'Game Theory Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '39',
            title: 'Advanced Data Structures',
            problems: [
                {
                    id: '39-1',
                    title: 'Advanced Data Structures Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '39-2',
                    title: 'Advanced Data Structures Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '39-3',
                    title: 'Advanced Data Structures Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '39-4',
                    title: 'Advanced Data Structures Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '39-5',
                    title: 'Advanced Data Structures Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '39-6',
                    title: 'Advanced Data Structures Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '40',
            title: 'String Algorithms',
            problems: [
                {
                    id: '40-1',
                    title: 'String Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '40-2',
                    title: 'String Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '40-3',
                    title: 'String Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '40-4',
                    title: 'String Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '40-5',
                    title: 'String Algorithms Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '40-6',
                    title: 'String Algorithms Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '41',
            title: 'Mathematics',
            summary: 'Mathematics concepts and practice',
            problems: [
                {
                    id: '41-1',
                    title: 'Mathematics Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '41-2',
                    title: 'Mathematics Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '41-3',
                    title: 'Mathematics Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '41-4',
                    title: 'Mathematics Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '41-5',
                    title: 'Mathematics Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '41-6',
                    title: 'Mathematics Problem 6',
                    difficulty: 'Easy',
                },
                {
                    id: '41-7',
                    title: 'Mathematics Problem 7',
                    difficulty: 'Easy',
                },
                {
                    id: '41-8',
                    title: 'Mathematics Problem 8',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '42',
            title: 'Game Theory',
            summary: 'Game Theory concepts and practice',
            problems: [
                {
                    id: '42-1',
                    title: 'Game Theory Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '42-2',
                    title: 'Game Theory Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '42-3',
                    title: 'Game Theory Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '42-4',
                    title: 'Game Theory Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '42-5',
                    title: 'Game Theory Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '42-6',
                    title: 'Game Theory Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '43',
            title: 'Advanced Data Structures',
            summary: 'Advanced Data Structures concepts and practice',
            problems: [
                {
                    id: '43-1',
                    title: 'Advanced Data Structures Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '43-2',
                    title: 'Advanced Data Structures Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '43-3',
                    title: 'Advanced Data Structures Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '43-4',
                    title: 'Advanced Data Structures Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '43-5',
                    title: 'Advanced Data Structures Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '43-6',
                    title: 'Advanced Data Structures Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '44',
            title: 'String Algorithms',
            summary: 'String Algorithms concepts and practice',
            problems: [
                {
                    id: '44-1',
                    title: 'String Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '44-2',
                    title: 'String Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '44-3',
                    title: 'String Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '44-4',
                    title: 'String Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '44-5',
                    title: 'String Algorithms Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '44-6',
                    title: 'String Algorithms Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
    ],
}

// ─── CPH ──────────────────────────────────────────────────────────────
const cph: Book = {
    slug: 'cph',
    title: 'Competitive Programmer\'s Handbook',
    shortTitle: 'CPH',
    author: 'Antti Laaksonen',
    edition: 'Draft, Jan 2018',
    year: 2018,
    coverUrl: '/assets/books/cover-cph.jpg',
    color: '#7c2d12',
    accentColor: '#f97316',
    description: 'A free, comprehensive guide to competitive programming covering all major algorithms and data structures with clear explanations and CSES Practice problems.',
    totalProblems: 220,
    tags: [
          'Competitive',
          'Free',
          'CSES',
          'Algorithms',
          'Mathematics'
        ],
    chapters: [
        {
            num: '1',
            title: 'Introduction',
            page: 9,
            problems: [
                {
                    id: 'E1.1',
                    title: 'CSES — Weird Algorithm',
                    difficulty: 'Easy',
                    tags: [
                                          'Simulation'
                                        ],
                },
                {
                    id: 'E1.2',
                    title: 'CSES — Missing Number',
                    difficulty: 'Easy',
                    tags: [
                                          'Math'
                                        ],
                },
                {
                    id: 'E1.3',
                    title: 'CSES — Repetitions',
                    difficulty: 'Easy',
                    tags: [
                                          'Strings'
                                        ],
                },
                {
                    id: 'E1.4',
                    title: 'CSES — Increasing Array',
                    difficulty: 'Easy',
                    tags: [
                                          'Greedy'
                                        ],
                },
                {
                    id: 'E1.5',
                    title: 'CSES — Permutations',
                    difficulty: 'Easy',
                    tags: [
                                          'Construction'
                                        ],
                },
                {
                    id: '1-6',
                    title: 'Problem 1.6',
                    difficulty: 'Easy',
                },
                {
                    id: '1-7',
                    title: 'Problem 1.7',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '2',
            title: 'Time Complexity',
            page: 27,
            problems: [
                {
                    id: 'E2.1',
                    title: 'CSES — Apple Division',
                    difficulty: 'Easy',
                    tags: [
                                          'BruteForce'
                                        ],
                },
                {
                    id: 'E2.2',
                    title: 'CSES — Chessboard and Queens',
                    difficulty: 'Medium',
                    tags: [
                                          'Backtracking'
                                        ],
                },
                {
                    id: 'E2.3',
                    title: 'CSES — Bit Strings',
                    difficulty: 'Easy',
                    tags: [
                                          'Math',
                                          'Modular'
                                        ],
                },
                {
                    id: 'E2.4',
                    title: 'CSES — Trailing Zeros',
                    difficulty: 'Easy',
                    tags: [
                                          'Math'
                                        ],
                },
                {
                    id: 'E2.5',
                    title: 'CSES — Coin Piles',
                    difficulty: 'Easy',
                    tags: [
                                          'Math'
                                        ],
                },
                {
                    id: '2-6',
                    title: 'Problem 2.6',
                    difficulty: 'Easy',
                },
                {
                    id: '2-7',
                    title: 'Problem 2.7',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '3',
            title: 'Sorting',
            page: 37,
            problems: [
                {
                    id: 'E3.1',
                    title: 'CSES — Apartments',
                    difficulty: 'Easy',
                    tags: [
                                          'Sorting',
                                          'Greedy'
                                        ],
                },
                {
                    id: 'E3.2',
                    title: 'CSES — Ferris Wheel',
                    difficulty: 'Easy',
                    tags: [
                                          'Sorting',
                                          'TwoPointers'
                                        ],
                },
                {
                    id: 'E3.3',
                    title: 'CSES — Concert Tickets',
                    difficulty: 'Medium',
                    tags: [
                                          'Sorting',
                                          'BinarySearch'
                                        ],
                },
                {
                    id: 'E3.4',
                    title: 'CSES — Restaurant Customers',
                    difficulty: 'Medium',
                    tags: [
                                          'Sorting',
                                          'SweepLine'
                                        ],
                },
                {
                    id: 'E3.5',
                    title: 'CSES — Movie Festival',
                    difficulty: 'Easy',
                    tags: [
                                          'Sorting',
                                          'Greedy'
                                        ],
                },
                {
                    id: 'E3.6',
                    title: 'CSES — Sum of Two Values',
                    difficulty: 'Easy',
                    tags: [
                                          'TwoPointers',
                                          'Hash'
                                        ],
                },
                {
                    id: '3-7',
                    title: 'Problem 3.7',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '4',
            title: 'Data Structures',
            page: 53,
            problems: [
                {
                    id: 'E4.1',
                    title: 'CSES — Distinct Numbers',
                    difficulty: 'Easy',
                    tags: [
                                          'Set'
                                        ],
                },
                {
                    id: 'E4.2',
                    title: 'CSES — Collecting Numbers',
                    difficulty: 'Easy',
                    tags: [
                                          'Set'
                                        ],
                },
                {
                    id: 'E4.3',
                    title: 'CSES — Collecting Numbers II',
                    difficulty: 'Medium',
                    tags: [
                                          'Set',
                                          'Simulation'
                                        ],
                },
                {
                    id: 'E4.4',
                    title: 'CSES — Playlist',
                    difficulty: 'Easy',
                    tags: [
                                          'SlidingWindow',
                                          'Set'
                                        ],
                },
                {
                    id: 'E4.5',
                    title: 'CSES — Towers',
                    difficulty: 'Easy',
                    tags: [
                                          'Greedy',
                                          'MultiSet'
                                        ],
                },
                {
                    id: 'E4.6',
                    title: 'CSES — Traffic Lights',
                    difficulty: 'Medium',
                    tags: [
                                          'Set',
                                          'BinarySearch'
                                        ],
                },
                {
                    id: 'E4.7',
                    title: 'CSES — Josephus I',
                    difficulty: 'Easy',
                    tags: [
                                          'Simulation'
                                        ],
                },
                {
                    id: 'E4.8',
                    title: 'CSES — Josephus II',
                    difficulty: 'Medium',
                    tags: [
                                          'Set',
                                          'OrderedSet'
                                        ],
                },
            ],
        },
        {
            num: '5',
            title: 'Complete Search',
            page: 69,
            problems: [
                {
                    id: 'E5.1',
                    title: 'CSES — Increasing Subsequence',
                    difficulty: 'Easy',
                    tags: [
                                          'BinarySearch',
                                          'DP'
                                        ],
                },
                {
                    id: 'E5.2',
                    title: 'CSES — Two Knights',
                    difficulty: 'Medium',
                    tags: [
                                          'Math',
                                          'Counting'
                                        ],
                },
                {
                    id: 'E5.3',
                    title: 'CSES — Grid Paths',
                    difficulty: 'Medium',
                    tags: [
                                          'Backtracking',
                                          'Pruning'
                                        ],
                },
                {
                    id: '5-4',
                    title: 'Problem 5.4',
                    difficulty: 'Medium',
                },
                {
                    id: '5-5',
                    title: 'Problem 5.5',
                    difficulty: 'Hard',
                },
                {
                    id: '5-6',
                    title: 'Problem 5.6',
                    difficulty: 'Easy',
                },
                {
                    id: '5-7',
                    title: 'Problem 5.7',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '6',
            title: 'Greedy Algorithms',
            page: 79,
            problems: [
                {
                    id: 'E6.1',
                    title: 'CSES — Coin Problem',
                    difficulty: 'Easy',
                    tags: [
                                          'Greedy'
                                        ],
                },
                {
                    id: 'E6.2',
                    title: 'CSES — Stick Lengths',
                    difficulty: 'Medium',
                    tags: [
                                          'Greedy',
                                          'Math'
                                        ],
                },
                {
                    id: 'E6.3',
                    title: 'CSES — Polygon Lattice Points',
                    difficulty: 'Medium',
                    tags: [
                                          'Greedy',
                                          'Math'
                                        ],
                },
                {
                    id: 'E6.4',
                    title: 'CSES — Missing Coin Sum',
                    difficulty: 'Easy',
                    tags: [
                                          'Greedy',
                                          'Sorting'
                                        ],
                },
                {
                    id: 'E6.5',
                    title: 'CSES — Collecting Numbers II',
                    difficulty: 'Medium',
                    tags: [
                                          'Greedy'
                                        ],
                },
                {
                    id: 'E6.6',
                    title: 'CSES — Tasks and Deadlines',
                    difficulty: 'Medium',
                    tags: [
                                          'Greedy',
                                          'Scheduling'
                                        ],
                },
                {
                    id: '6-7',
                    title: 'Problem 6.7',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '7',
            title: 'Dynamic Programming',
            page: 87,
            problems: [
                {
                    id: 'E7.1',
                    title: 'CSES — Dice Combinations',
                    difficulty: 'Easy',
                    tags: [
                                          'DP'
                                        ],
                },
                {
                    id: 'E7.2',
                    title: 'CSES — Minimizing Coins',
                    difficulty: 'Easy',
                    tags: [
                                          'DP',
                                          'Knapsack'
                                        ],
                },
                {
                    id: 'E7.3',
                    title: 'CSES — Coin Combinations I',
                    difficulty: 'Easy',
                    tags: [
                                          'DP',
                                          'Counting'
                                        ],
                },
                {
                    id: 'E7.4',
                    title: 'CSES — Coin Combinations II',
                    difficulty: 'Easy',
                    tags: [
                                          'DP',
                                          'Counting'
                                        ],
                },
                {
                    id: 'E7.5',
                    title: 'CSES — Removing Digits',
                    difficulty: 'Easy',
                    tags: [
                                          'DP',
                                          'Greedy'
                                        ],
                },
                {
                    id: 'E7.6',
                    title: 'CSES — Grid Paths',
                    difficulty: 'Medium',
                    tags: [
                                          'DP',
                                          'Grid'
                                        ],
                },
                {
                    id: 'E7.7',
                    title: 'CSES — Book Shop',
                    difficulty: 'Medium',
                    tags: [
                                          'DP',
                                          'Knapsack'
                                        ],
                },
                {
                    id: 'E7.8',
                    title: 'CSES — Array Description',
                    difficulty: 'Medium',
                    tags: [
                                          'DP'
                                        ],
                },
                {
                    id: 'E7.9',
                    title: 'CSES — Coin Problem (Path)',
                    difficulty: 'Medium',
                    tags: [
                                          'DP'
                                        ],
                },
                {
                    id: 'E7.10',
                    title: 'CSES — Edit Distance',
                    difficulty: 'Medium',
                    tags: [
                                          'DP',
                                          'Strings'
                                        ],
                },
                {
                    id: 'E7.11',
                    title: 'CSES — Rectangle Cutting',
                    difficulty: 'Medium',
                    tags: [
                                          'DP',
                                          'IntervalDP'
                                        ],
                },
                {
                    id: 'E7.12',
                    title: 'CSES — Money Sums',
                    difficulty: 'Medium',
                    tags: [
                                          'DP',
                                          'Knapsack'
                                        ],
                },
                {
                    id: 'E7.13',
                    title: 'CSES — Removal Game',
                    difficulty: 'Hard',
                    tags: [
                                          'DP',
                                          'GameTheory'
                                        ],
                },
                {
                    id: 'E7.14',
                    title: 'CSES — Two Sets II',
                    difficulty: 'Hard',
                    tags: [
                                          'DP',
                                          'Counting'
                                        ],
                },
            ],
        },
        {
            num: '8',
            title: 'Amortized Analysis',
            page: 105,
            problems: [
                {
                    id: 'E8.1',
                    title: 'CSES — Sliding Median',
                    difficulty: 'Hard',
                    tags: [
                                          'SlidingWindow',
                                          'Heap'
                                        ],
                },
                {
                    id: 'E8.2',
                    title: 'CSES — Sliding Cost',
                    difficulty: 'Hard',
                    tags: [
                                          'SlidingWindow',
                                          'Heap'
                                        ],
                },
                {
                    id: 'E8.3',
                    title: 'CSES — Range Queries and Copies',
                    difficulty: 'Hard',
                    tags: [
                                          'PersistentSegTree'
                                        ],
                },
                {
                    id: '8-4',
                    title: 'Problem 8.4',
                    difficulty: 'Medium',
                },
                {
                    id: '8-5',
                    title: 'Problem 8.5',
                    difficulty: 'Hard',
                },
                {
                    id: '8-6',
                    title: 'Problem 8.6',
                    difficulty: 'Easy',
                },
                {
                    id: '8-7',
                    title: 'Problem 8.7',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '9',
            title: 'Range Queries',
            page: 109,
            problems: [
                {
                    id: 'E9.1',
                    title: 'CSES — Static Range Sum Queries',
                    difficulty: 'Easy',
                    tags: [
                                          'PrefixSum'
                                        ],
                },
                {
                    id: 'E9.2',
                    title: 'CSES — Static Range Minimum Queries',
                    difficulty: 'Easy',
                    tags: [
                                          'SparseTable'
                                        ],
                },
                {
                    id: 'E9.3',
                    title: 'CSES — Dynamic Range Sum Queries',
                    difficulty: 'Easy',
                    tags: [
                                          'FenwickTree'
                                        ],
                },
                {
                    id: 'E9.4',
                    title: 'CSES — Dynamic Range Minimum Queries',
                    difficulty: 'Medium',
                    tags: [
                                          'SegTree'
                                        ],
                },
                {
                    id: 'E9.5',
                    title: 'CSES — Range Xor Queries',
                    difficulty: 'Easy',
                    tags: [
                                          'PrefixSum',
                                          'Bit'
                                        ],
                },
                {
                    id: 'E9.6',
                    title: 'CSES — Range Update Queries',
                    difficulty: 'Medium',
                    tags: [
                                          'FenwickTree',
                                          'DiffArray'
                                        ],
                },
                {
                    id: 'E9.7',
                    title: 'CSES — Forest Queries',
                    difficulty: 'Medium',
                    tags: [
                                          'PrefixSum2D'
                                        ],
                },
                {
                    id: 'E9.8',
                    title: 'CSES — Hotel Queries',
                    difficulty: 'Medium',
                    tags: [
                                          'SegTree',
                                          'BinarySearch'
                                        ],
                },
            ],
        },
        {
            num: '10',
            title: 'Bit Manipulation',
            page: 121,
            problems: [
                {
                    id: 'E10.1',
                    title: 'CSES — Flag Arrangements',
                    difficulty: 'Medium',
                    tags: [
                                          'BitmaskDP'
                                        ],
                },
                {
                    id: 'E10.2',
                    title: 'CSES — Counting Tilings',
                    difficulty: 'Hard',
                    tags: [
                                          'BitmaskDP',
                                          'ProfileDP'
                                        ],
                },
                {
                    id: 'E10.3',
                    title: 'CSES — Counting Numbers',
                    difficulty: 'Hard',
                    tags: [
                                          'DigitDP'
                                        ],
                },
                {
                    id: '10-4',
                    title: 'Problem 10.4',
                    difficulty: 'Medium',
                },
                {
                    id: '10-5',
                    title: 'Problem 10.5',
                    difficulty: 'Hard',
                },
                {
                    id: '10-6',
                    title: 'Problem 10.6',
                    difficulty: 'Easy',
                },
                {
                    id: '10-7',
                    title: 'Problem 10.7',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '11',
            title: 'Graph Basics',
            page: 129,
            problems: [
                {
                    id: 'E11.1',
                    title: 'CSES — Counting Rooms',
                    difficulty: 'Easy',
                    tags: [
                                          'DFS',
                                          'Grid'
                                        ],
                },
                {
                    id: 'E11.2',
                    title: 'CSES — Labyrinth',
                    difficulty: 'Easy',
                    tags: [
                                          'BFS',
                                          'Grid'
                                        ],
                },
                {
                    id: 'E11.3',
                    title: 'CSES — Building Roads',
                    difficulty: 'Easy',
                    tags: [
                                          'BFS',
                                          'UnionFind'
                                        ],
                },
                {
                    id: 'E11.4',
                    title: 'CSES — Message Route',
                    difficulty: 'Easy',
                    tags: [
                                          'BFS'
                                        ],
                },
                {
                    id: 'E11.5',
                    title: 'CSES — Building Teams',
                    difficulty: 'Easy',
                    tags: [
                                          'BFS',
                                          'Bipartite'
                                        ],
                },
                {
                    id: 'E11.6',
                    title: 'CSES — Round Trip',
                    difficulty: 'Medium',
                    tags: [
                                          'DFS',
                                          'Cycle'
                                        ],
                },
                {
                    id: 'E11.7',
                    title: 'CSES — Monsters',
                    difficulty: 'Medium',
                    tags: [
                                          'BFS',
                                          'MultiSource'
                                        ],
                },
            ],
        },
        {
            num: '12',
            title: 'Graph Traversal',
            page: 141,
            problems: [
                {
                    id: 'E12.1',
                    title: 'CSES — Course Schedule',
                    difficulty: 'Easy',
                    tags: [
                                          'TopSort',
                                          'DAG'
                                        ],
                },
                {
                    id: 'E12.2',
                    title: 'CSES — Longest Flight Route',
                    difficulty: 'Medium',
                    tags: [
                                          'DAG',
                                          'DP'
                                        ],
                },
                {
                    id: 'E12.3',
                    title: 'CSES — Game Routes',
                    difficulty: 'Medium',
                    tags: [
                                          'DAG',
                                          'DP',
                                          'Counting'
                                        ],
                },
                {
                    id: 'E12.4',
                    title: 'CSES — Investigation',
                    difficulty: 'Hard',
                    tags: [
                                          'Dijkstra',
                                          'DAG',
                                          'DP'
                                        ],
                },
                {
                    id: 'E12.5',
                    title: 'CSES — Planets Queries I',
                    difficulty: 'Medium',
                    tags: [
                                          'FunctionalGraph',
                                          'BinaryLifting'
                                        ],
                },
                {
                    id: 'E12.6',
                    title: 'CSES — Planets Queries II',
                    difficulty: 'Hard',
                    tags: [
                                          'FunctionalGraph',
                                          'SCC'
                                        ],
                },
                {
                    id: '12-7',
                    title: 'Problem 12.7',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '13',
            title: 'Shortest Paths',
            page: 153,
            problems: [
                {
                    id: 'E13.1',
                    title: 'CSES — Shortest Routes I',
                    difficulty: 'Easy',
                    tags: [
                                          'Dijkstra'
                                        ],
                },
                {
                    id: 'E13.2',
                    title: 'CSES — Shortest Routes II',
                    difficulty: 'Easy',
                    tags: [
                                          'FloydWarshall'
                                        ],
                },
                {
                    id: 'E13.3',
                    title: 'CSES — High Score',
                    difficulty: 'Medium',
                    tags: [
                                          'BellmanFord',
                                          'NegCycle'
                                        ],
                },
                {
                    id: 'E13.4',
                    title: 'CSES — Flight Discount',
                    difficulty: 'Medium',
                    tags: [
                                          'Dijkstra',
                                          'DP'
                                        ],
                },
                {
                    id: 'E13.5',
                    title: 'CSES — Cycle Finding',
                    difficulty: 'Medium',
                    tags: [
                                          'BellmanFord',
                                          'NegCycle'
                                        ],
                },
                {
                    id: 'E13.6',
                    title: 'CSES — Flight Routes',
                    difficulty: 'Hard',
                    tags: [
                                          'KShortestPaths'
                                        ],
                },
                {
                    id: 'E13.7',
                    title: 'CSES — Round Trip II',
                    difficulty: 'Hard',
                    tags: [
                                          'Dijkstra',
                                          'Cycle'
                                        ],
                },
            ],
        },
        {
            num: '14',
            title: 'Tree Algorithms',
            page: 163,
            problems: [
                {
                    id: 'E14.1',
                    title: 'CSES — Subordinates',
                    difficulty: 'Easy',
                    tags: [
                                          'Tree',
                                          'DFS'
                                        ],
                },
                {
                    id: 'E14.2',
                    title: 'CSES — Tree Matching',
                    difficulty: 'Medium',
                    tags: [
                                          'Tree',
                                          'DP'
                                        ],
                },
                {
                    id: 'E14.3',
                    title: 'CSES — Tree Diameter',
                    difficulty: 'Easy',
                    tags: [
                                          'Tree',
                                          'BFS'
                                        ],
                },
                {
                    id: 'E14.4',
                    title: 'CSES — Tree Distances I',
                    difficulty: 'Medium',
                    tags: [
                                          'Tree',
                                          'ReRooting'
                                        ],
                },
                {
                    id: 'E14.5',
                    title: 'CSES — Tree Distances II',
                    difficulty: 'Hard',
                    tags: [
                                          'Tree',
                                          'ReRooting',
                                          'DFS'
                                        ],
                },
                {
                    id: 'E14.6',
                    title: 'CSES — Company Queries I',
                    difficulty: 'Medium',
                    tags: [
                                          'LCA',
                                          'BinaryLifting'
                                        ],
                },
                {
                    id: 'E14.7',
                    title: 'CSES — Company Queries II',
                    difficulty: 'Hard',
                    tags: [
                                          'LCA'
                                        ],
                },
                {
                    id: 'E14.8',
                    title: 'CSES — Distance Queries',
                    difficulty: 'Hard',
                    tags: [
                                          'LCA',
                                          'Tree'
                                        ],
                },
            ],
        },
        {
            num: '15',
            title: 'Spanning Trees',
            page: 177,
            problems: [
                {
                    id: 'E15.1',
                    title: 'CSES — Road Reparation',
                    difficulty: 'Easy',
                    tags: [
                                          'MST',
                                          'Kruskal'
                                        ],
                },
                {
                    id: 'E15.2',
                    title: 'CSES — Road Construction',
                    difficulty: 'Medium',
                    tags: [
                                          'UnionFind',
                                          'MST'
                                        ],
                },
                {
                    id: '15-3',
                    title: 'Problem 15.3',
                    difficulty: 'Medium',
                },
                {
                    id: '15-4',
                    title: 'Problem 15.4',
                    difficulty: 'Medium',
                },
                {
                    id: '15-5',
                    title: 'Problem 15.5',
                    difficulty: 'Hard',
                },
                {
                    id: '15-6',
                    title: 'Problem 15.6',
                    difficulty: 'Easy',
                },
                {
                    id: '15-7',
                    title: 'Problem 15.7',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '16',
            title: 'Directed Graphs',
            page: 183,
            problems: [
                {
                    id: 'E16.1',
                    title: 'CSES — Planets and Kingdoms',
                    difficulty: 'Medium',
                    tags: [
                                          'SCC',
                                          'Kosaraju'
                                        ],
                },
                {
                    id: 'E16.2',
                    title: 'CSES — Giant Pizza',
                    difficulty: 'Hard',
                    tags: [
                                          'TwoSAT',
                                          'SCC'
                                        ],
                },
                {
                    id: 'E16.3',
                    title: 'CSES — Coin Collector',
                    difficulty: 'Hard',
                    tags: [
                                          'SCC',
                                          'DAG',
                                          'DP'
                                        ],
                },
                {
                    id: 'E16.4',
                    title: 'CSES — Mail Delivery',
                    difficulty: 'Hard',
                    tags: [
                                          'EulerPath',
                                          'Graph'
                                        ],
                },
                {
                    id: 'E16.5',
                    title: 'CSES — Teleporters Path',
                    difficulty: 'Hard',
                    tags: [
                                          'EulerPath',
                                          'DAG'
                                        ],
                },
                {
                    id: '16-6',
                    title: 'Problem 16.6',
                    difficulty: 'Easy',
                },
                {
                    id: '16-7',
                    title: 'Problem 16.7',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '17',
            title: 'Strong Connectivity',
            page: 191,
            problems: [
                {
                    id: 'E17.1',
                    title: 'CSES — Distinct Routes',
                    difficulty: 'Hard',
                    tags: [
                                          'MaxFlow',
                                          'BFS'
                                        ],
                },
                {
                    id: 'E17.2',
                    title: 'CSES — School Dance',
                    difficulty: 'Hard',
                    tags: [
                                          'BipartiteMatching'
                                        ],
                },
                {
                    id: 'E17.3',
                    title: 'CSES — Forbidden Cities',
                    difficulty: 'Hard',
                    tags: [
                                          'Dijkstra',
                                          'Bipartite'
                                        ],
                },
                {
                    id: '17-4',
                    title: 'Problem 17.4',
                    difficulty: 'Medium',
                },
                {
                    id: '17-5',
                    title: 'Problem 17.5',
                    difficulty: 'Hard',
                },
                {
                    id: '17-6',
                    title: 'Problem 17.6',
                    difficulty: 'Easy',
                },
                {
                    id: '17-7',
                    title: 'Problem 17.7',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '18',
            title: 'Tree Queries',
            page: 199,
            problems: [
                {
                    id: 'E18.1',
                    title: 'CSES — Path Queries',
                    difficulty: 'Hard',
                    tags: [
                                          'HLD',
                                          'SegTree'
                                        ],
                },
                {
                    id: 'E18.2',
                    title: 'CSES — Path Queries II',
                    difficulty: 'Hard',
                    tags: [
                                          'HLD',
                                          'SegTree',
                                          'LazyProp'
                                        ],
                },
                {
                    id: 'E18.3',
                    title: 'CSES — Distinct Colors',
                    difficulty: 'Hard',
                    tags: [
                                          'DFS',
                                          'SmallToLarge'
                                        ],
                },
                {
                    id: 'E18.4',
                    title: 'CSES — Finding a Centroid',
                    difficulty: 'Medium',
                    tags: [
                                          'Tree',
                                          'Centroid'
                                        ],
                },
                {
                    id: '18-5',
                    title: 'Problem 18.5',
                    difficulty: 'Hard',
                },
                {
                    id: '18-6',
                    title: 'Problem 18.6',
                    difficulty: 'Easy',
                },
                {
                    id: '18-7',
                    title: 'Problem 18.7',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '19',
            title: 'Paths and Circuits',
            page: 211,
            problems: [
                {
                    id: 'E19.1',
                    title: 'CSES — Eulerian Path',
                    difficulty: 'Medium',
                    tags: [
                                          'EulerPath',
                                          'Graph'
                                        ],
                },
                {
                    id: 'E19.2',
                    title: 'CSES — Hamiltonian Flights',
                    difficulty: 'Hard',
                    tags: [
                                          'BitmaskDP',
                                          'Hamiltonian'
                                        ],
                },
                {
                    id: 'E19.3',
                    title: 'CSES — Knight\'s Tour',
                    difficulty: 'Hard',
                    tags: [
                                          'Backtracking',
                                          'Warnsdorff'
                                        ],
                },
                {
                    id: '19-4',
                    title: 'Problem 19.4',
                    difficulty: 'Medium',
                },
                {
                    id: '19-5',
                    title: 'Problem 19.5',
                    difficulty: 'Hard',
                },
                {
                    id: '19-6',
                    title: 'Problem 19.6',
                    difficulty: 'Easy',
                },
                {
                    id: '19-7',
                    title: 'Problem 19.7',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '20',
            title: 'Flows and Cuts',
            page: 221,
            problems: [
                {
                    id: 'E20.1',
                    title: 'CSES — Download Speed',
                    difficulty: 'Medium',
                    tags: [
                                          'MaxFlow'
                                        ],
                },
                {
                    id: 'E20.2',
                    title: 'CSES — Police Chase',
                    difficulty: 'Medium',
                    tags: [
                                          'MinCut',
                                          'MaxFlow'
                                        ],
                },
                {
                    id: 'E20.3',
                    title: 'CSES — School Dance',
                    difficulty: 'Hard',
                    tags: [
                                          'BipartiteMatching'
                                        ],
                },
                {
                    id: 'E20.4',
                    title: 'CSES — Distinct Routes',
                    difficulty: 'Hard',
                    tags: [
                                          'EdgeDisjointPaths'
                                        ],
                },
                {
                    id: '20-5',
                    title: 'Problem 20.5',
                    difficulty: 'Hard',
                },
                {
                    id: '20-6',
                    title: 'Problem 20.6',
                    difficulty: 'Easy',
                },
                {
                    id: '20-7',
                    title: 'Problem 20.7',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '21',
            title: 'Number Theory',
            page: 233,
            problems: [
                {
                    id: 'E21.1',
                    title: 'CSES — Counting Divisors',
                    difficulty: 'Easy',
                    tags: [
                                          'Math',
                                          'Sieve'
                                        ],
                },
                {
                    id: 'E21.2',
                    title: 'CSES — Common Divisors',
                    difficulty: 'Easy',
                    tags: [
                                          'Math',
                                          'GCD'
                                        ],
                },
                {
                    id: 'E21.3',
                    title: 'CSES — Sum of Divisors',
                    difficulty: 'Medium',
                    tags: [
                                          'Math',
                                          'NumberTheory'
                                        ],
                },
                {
                    id: 'E21.4',
                    title: 'CSES — Divisor Analysis',
                    difficulty: 'Medium',
                    tags: [
                                          'Math',
                                          'PrimeFactorization'
                                        ],
                },
                {
                    id: 'E21.5',
                    title: 'CSES — Prime Multiples',
                    difficulty: 'Medium',
                    tags: [
                                          'Math',
                                          'InclusionExclusion'
                                        ],
                },
                {
                    id: 'E21.6',
                    title: 'CSES — Counting Coprime Pairs',
                    difficulty: 'Hard',
                    tags: [
                                          'Math',
                                          'Mobius'
                                        ],
                },
                {
                    id: '21-7',
                    title: 'Problem 21.7',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '22',
            title: 'Combinatorics',
            page: 247,
            problems: [
                {
                    id: 'E22.1',
                    title: 'CSES — Counting Necklaces',
                    difficulty: 'Hard',
                    tags: [
                                          'Combinatorics',
                                          'Burnside'
                                        ],
                },
                {
                    id: 'E22.2',
                    title: 'CSES — Counting Grids',
                    difficulty: 'Hard',
                    tags: [
                                          'Combinatorics',
                                          'Burnside'
                                        ],
                },
                {
                    id: 'E22.3',
                    title: 'CSES — Binomial Coefficients',
                    difficulty: 'Easy',
                    tags: [
                                          'Math',
                                          'ModularArithmetic'
                                        ],
                },
                {
                    id: 'E22.4',
                    title: 'CSES — Creating Strings II',
                    difficulty: 'Medium',
                    tags: [
                                          'Combinatorics',
                                          'Math'
                                        ],
                },
                {
                    id: 'E22.5',
                    title: 'CSES — Distributing Apples',
                    difficulty: 'Medium',
                    tags: [
                                          'Combinatorics',
                                          'Stars&Bars'
                                        ],
                },
                {
                    id: 'E22.6',
                    title: 'CSES — Christmas Party',
                    difficulty: 'Medium',
                    tags: [
                                          'Combinatorics',
                                          'Derangement'
                                        ],
                },
                {
                    id: '22-7',
                    title: 'Problem 22.7',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '23',
            title: 'Matrices',
            page: 259,
            problems: [
                {
                    id: 'E23.1',
                    title: 'CSES — Fibonacci',
                    difficulty: 'Easy',
                    tags: [
                                          'MatrixExp'
                                        ],
                },
                {
                    id: 'E23.2',
                    title: 'CSES — Counting Paths',
                    difficulty: 'Medium',
                    tags: [
                                          'MatrixExp',
                                          'Graph'
                                        ],
                },
                {
                    id: 'E23.3',
                    title: 'CSES — Ermitteln Fibonacci Numbers',
                    difficulty: 'Medium',
                    tags: [
                                          'MatrixExp',
                                          'NumberTheory'
                                        ],
                },
                {
                    id: '23-4',
                    title: 'Problem 23.4',
                    difficulty: 'Medium',
                },
                {
                    id: '23-5',
                    title: 'Problem 23.5',
                    difficulty: 'Hard',
                },
                {
                    id: '23-6',
                    title: 'Problem 23.6',
                    difficulty: 'Easy',
                },
                {
                    id: '23-7',
                    title: 'Problem 23.7',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '24',
            title: 'Probability',
            page: 267,
            problems: [
                {
                    id: 'E24.1',
                    title: 'CSES — Dice Probability',
                    difficulty: 'Easy',
                    tags: [
                                          'Probability',
                                          'DP'
                                        ],
                },
                {
                    id: 'E24.2',
                    title: 'CSES — Moving Robots',
                    difficulty: 'Hard',
                    tags: [
                                          'Probability',
                                          'DP',
                                          'Matrix'
                                        ],
                },
                {
                    id: 'E24.3',
                    title: 'CSES — Candies',
                    difficulty: 'Hard',
                    tags: [
                                          'Probability',
                                          'DP'
                                        ],
                },
                {
                    id: 'E24.4',
                    title: 'CSES — Sightseeing',
                    difficulty: 'Hard',
                    tags: [
                                          'Probability',
                                          'Dijkstra'
                                        ],
                },
                {
                    id: '24-5',
                    title: 'Problem 24.5',
                    difficulty: 'Hard',
                },
                {
                    id: '24-6',
                    title: 'Problem 24.6',
                    difficulty: 'Easy',
                },
                {
                    id: '24-7',
                    title: 'Problem 24.7',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '25',
            title: 'Game Theory',
            page: 275,
            problems: [
                {
                    id: 'E25.1',
                    title: 'CSES — Nim Game I',
                    difficulty: 'Easy',
                    tags: [
                                          'GameTheory',
                                          'Nim'
                                        ],
                },
                {
                    id: 'E25.2',
                    title: 'CSES — Nim Game II',
                    difficulty: 'Medium',
                    tags: [
                                          'GameTheory',
                                          'Grundy'
                                        ],
                },
                {
                    id: 'E25.3',
                    title: 'CSES — Staircase Nim',
                    difficulty: 'Medium',
                    tags: [
                                          'GameTheory',
                                          'Nim'
                                        ],
                },
                {
                    id: 'E25.4',
                    title: 'CSES — Grundy\'s Game',
                    difficulty: 'Hard',
                    tags: [
                                          'GameTheory',
                                          'Memoization'
                                        ],
                },
                {
                    id: 'E25.5',
                    title: 'CSES — Another Game',
                    difficulty: 'Hard',
                    tags: [
                                          'GameTheory',
                                          'Grundy'
                                        ],
                },
                {
                    id: '25-6',
                    title: 'Problem 25.6',
                    difficulty: 'Easy',
                },
                {
                    id: '25-7',
                    title: 'Problem 25.7',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '26',
            title: 'String Algorithms',
            page: 283,
            problems: [
                {
                    id: 'E26.1',
                    title: 'CSES — Word Combinations',
                    difficulty: 'Medium',
                    tags: [
                                          'Strings',
                                          'DP',
                                          'Hashing'
                                        ],
                },
                {
                    id: 'E26.2',
                    title: 'CSES — String Matching',
                    difficulty: 'Easy',
                    tags: [
                                          'Strings',
                                          'KMP'
                                        ],
                },
                {
                    id: 'E26.3',
                    title: 'CSES — Finding Borders',
                    difficulty: 'Medium',
                    tags: [
                                          'Strings',
                                          'KMP'
                                        ],
                },
                {
                    id: 'E26.4',
                    title: 'CSES — Finding Periods',
                    difficulty: 'Medium',
                    tags: [
                                          'Strings',
                                          'KMP'
                                        ],
                },
                {
                    id: 'E26.5',
                    title: 'CSES — Minimal Rotation',
                    difficulty: 'Hard',
                    tags: [
                                          'Strings',
                                          'Booth'
                                        ],
                },
                {
                    id: 'E26.6',
                    title: 'CSES — Longest Palindrome',
                    difficulty: 'Medium',
                    tags: [
                                          'Strings',
                                          'Manacher'
                                        ],
                },
                {
                    id: 'E26.7',
                    title: 'CSES — Palindrome Queries',
                    difficulty: 'Hard',
                    tags: [
                                          'Strings',
                                          'Hashing',
                                          'SegTree'
                                        ],
                },
            ],
        },
        {
            num: '27',
            title: 'Square Root Algorithms',
            page: 295,
            problems: [
                {
                    id: 'E27.1',
                    title: 'CSES — Increasing Array II',
                    difficulty: 'Hard',
                    tags: [
                                          'Mo',
                                          'SqrtDecomp'
                                        ],
                },
                {
                    id: 'E27.2',
                    title: 'CSES — List Removals',
                    difficulty: 'Hard',
                    tags: [
                                          'SqrtDecomp',
                                          'OrderedSet'
                                        ],
                },
                {
                    id: 'E27.3',
                    title: 'CSES — Salary Queries',
                    difficulty: 'Hard',
                    tags: [
                                          'Mo',
                                          'FenwickTree'
                                        ],
                },
                {
                    id: '27-4',
                    title: 'Problem 27.4',
                    difficulty: 'Medium',
                },
                {
                    id: '27-5',
                    title: 'Problem 27.5',
                    difficulty: 'Hard',
                },
                {
                    id: '27-6',
                    title: 'Problem 27.6',
                    difficulty: 'Easy',
                },
                {
                    id: '27-7',
                    title: 'Problem 27.7',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '28',
            title: 'Segment Trees Revisited',
            page: 303,
            problems: [
                {
                    id: 'E28.1',
                    title: 'CSES — Range Queries and Copies',
                    difficulty: 'Hard',
                    tags: [
                                          'PersistentSegTree'
                                        ],
                },
                {
                    id: 'E28.2',
                    title: 'CSES — New Road Queries',
                    difficulty: 'Hard',
                    tags: [
                                          'SegTree',
                                          'LCA'
                                        ],
                },
                {
                    id: 'E28.3',
                    title: 'CSES — Dynamic Range Queries',
                    difficulty: 'Hard',
                    tags: [
                                          'MergeSortTree'
                                        ],
                },
                {
                    id: '28-4',
                    title: 'Problem 28.4',
                    difficulty: 'Medium',
                },
                {
                    id: '28-5',
                    title: 'Problem 28.5',
                    difficulty: 'Hard',
                },
                {
                    id: '28-6',
                    title: 'Problem 28.6',
                    difficulty: 'Easy',
                },
                {
                    id: '28-7',
                    title: 'Problem 28.7',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '29',
            title: 'Geometry',
            page: 311,
            problems: [
                {
                    id: 'E29.1',
                    title: 'CSES — Point Location Test',
                    difficulty: 'Easy',
                    tags: [
                                          'Geometry',
                                          'CrossProduct'
                                        ],
                },
                {
                    id: 'E29.2',
                    title: 'CSES — Line Segment Intersection',
                    difficulty: 'Medium',
                    tags: [
                                          'Geometry',
                                          'Segments'
                                        ],
                },
                {
                    id: 'E29.3',
                    title: 'CSES — Polygon Area',
                    difficulty: 'Easy',
                    tags: [
                                          'Geometry',
                                          'Shoelace'
                                        ],
                },
                {
                    id: 'E29.4',
                    title: 'CSES — Point in Polygon',
                    difficulty: 'Medium',
                    tags: [
                                          'Geometry',
                                          'RayCasting'
                                        ],
                },
                {
                    id: 'E29.5',
                    title: 'CSES — Minimum Euclidean Distance',
                    difficulty: 'Hard',
                    tags: [
                                          'Geometry',
                                          'ClosestPair'
                                        ],
                },
                {
                    id: 'E29.6',
                    title: 'CSES — Convex Hull',
                    difficulty: 'Medium',
                    tags: [
                                          'Geometry',
                                          'ConvexHull'
                                        ],
                },
                {
                    id: '29-7',
                    title: 'Problem 29.7',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '30',
            title: 'Sweep Line Algorithms',
            page: 325,
            problems: [
                {
                    id: 'E30.1',
                    title: 'CSES — Tasks and Deadlines',
                    difficulty: 'Medium',
                    tags: [
                                          'SweepLine',
                                          'Greedy'
                                        ],
                },
                {
                    id: 'E30.2',
                    title: 'CSES — Concert Tickets',
                    difficulty: 'Medium',
                    tags: [
                                          'SweepLine',
                                          'BinarySearch'
                                        ],
                },
                {
                    id: 'E30.3',
                    title: 'CSES — Sum of Three Values',
                    difficulty: 'Medium',
                    tags: [
                                          'SweepLine',
                                          'TwoPointers'
                                        ],
                },
                {
                    id: '30-4',
                    title: 'Problem 30.4',
                    difficulty: 'Medium',
                },
                {
                    id: '30-5',
                    title: 'Problem 30.5',
                    difficulty: 'Hard',
                },
                {
                    id: '30-6',
                    title: 'Problem 30.6',
                    difficulty: 'Easy',
                },
                {
                    id: '30-7',
                    title: 'Problem 30.7',
                    difficulty: 'Easy',
                },
            ],
        },
    ],
}

// ─── AI ──────────────────────────────────────────────────────────────
const ai: Book = {
    slug: 'ai',
    title: 'Algorithms Illuminated (Parts 1-4)',
    shortTitle: 'Algorithms Illuminated',
    author: 'Tim Roughgarden',
    year: 2020,
    coverUrl: '/assets/books/cover-ai.jpg',
    color: '#92400e',
    accentColor: '#d97706',
    description: 'A comprehensive four-part series on algorithms: asymptotic notation and divide-and-conquer (Part 1), graph algorithms and data structures (Part 2), greedy algorithms and dynamic programming (Part 3), and NP-hard problems (Part 4).',
    totalProblems: 193,
    tags: [
          'Algorithms',
          'Divide & Conquer',
          'Graphs',
          'Dynamic Programming',
          'NP-Completeness',
          'Textbook'
        ],
    chapters: [
        {
            num: '1',
            title: 'Introduction',
            page: 1,
            problems: [
                {
                    id: '1-1',
                    title: 'Derive recurrence for Karatsuba splitting into three parts',
                    difficulty: 'Medium',
                    tags: [
                                          'Divide&Conquer'
                                        ],
                },
                {
                    id: '1-2',
                    title: 'Implement MergeSort and count inversions in a permutation',
                    difficulty: 'Easy',
                    tags: [
                                          'Divide&Conquer',
                                          'Sorting'
                                        ],
                },
                {
                    id: '1-3',
                    title: 'Prove by induction MergeSort sorts any array correctly',
                    difficulty: 'Medium',
                    tags: [
                                          'Sorting',
                                          'Proof'
                                        ],
                },
                {
                    id: '1-4',
                    title: 'Analyze number of recursive calls in Karatsuba for n-digit input',
                    difficulty: 'Medium',
                    tags: [
                                          'Divide&Conquer'
                                        ],
                },
                {
                    id: '1-5',
                    title: 'Give O(n log n) algorithm for pairs (i<j) with a_i > 2*a_j',
                    difficulty: 'Hard',
                    tags: [
                                          'Divide&Conquer',
                                          'Counting'
                                        ],
                },
                {
                    id: '1-6',
                    title: 'Design O(n) algorithm to check valid merge of two sorted sequences',
                    difficulty: 'Medium',
                    tags: [
                                          'Merge',
                                          'Arrays'
                                        ],
                },
                {
                    id: '1-7',
                    title: 'Prove Karatsuba works for n not a power of 2',
                    difficulty: 'Easy',
                    tags: [
                                          'Divide&Conquer',
                                          'Proof'
                                        ],
                },
                {
                    id: '1-8',
                    title: 'Problem 1.8',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '2',
            title: 'Asymptotic Notation',
            page: 27,
            problems: [
                {
                    id: '2-1',
                    title: 'Prove f(n)=O(g(n)) implies g(n)=Omega(f(n))',
                    difficulty: 'Easy',
                    tags: [
                                          'Asymptotic',
                                          'Proof'
                                        ],
                },
                {
                    id: '2-2',
                    title: 'Determine if n^1.001+n log n = Theta(n^1.001) or Theta(n log n)',
                    difficulty: 'Medium',
                    tags: [
                                          'Asymptotic'
                                        ],
                },
                {
                    id: '2-3',
                    title: 'Arrange by growth: n log n, n^2, 2^n, log n!, n^0.5, log^2 n',
                    difficulty: 'Easy',
                    tags: [
                                          'Asymptotic'
                                        ],
                },
                {
                    id: '2-4',
                    title: 'Give f,g where f!=O(g) and g!=O(f) (incomparable)',
                    difficulty: 'Medium',
                    tags: [
                                          'Asymptotic'
                                        ],
                },
                {
                    id: '2-5',
                    title: 'Prove/disprove: if f=O(g) and h=O(g) then f=O(h)',
                    difficulty: 'Medium',
                    tags: [
                                          'Asymptotic',
                                          'Proof'
                                        ],
                },
                {
                    id: '2-6',
                    title: 'Prove n! = O(n^n) and n! = omega(2^n)',
                    difficulty: 'Medium',
                    tags: [
                                          'Asymptotic',
                                          'Math'
                                        ],
                },
                {
                    id: '2-7',
                    title: 'Show log(n!) = Theta(n log n) via Stirling',
                    difficulty: 'Hard',
                    tags: [
                                          'Asymptotic',
                                          'Math'
                                        ],
                },
                {
                    id: '2-8',
                    title: 'Prove master theorem case: T(n)=aT(n/b)+cn^k, a>b^k => T(n)=Theta(n^{log_b a})',
                    difficulty: 'Hard',
                    tags: [
                                          'Asymptotic',
                                          'MasterMethod'
                                        ],
                },
            ],
        },
        {
            num: '3',
            title: 'Divide-and-Conquer',
            page: 53,
            problems: [
                {
                    id: '3-1',
                    title: 'Implement D&C closest-pair and analyze running time',
                    difficulty: 'Hard',
                    tags: [
                                          'Divide&Conquer',
                                          'Geometry'
                                        ],
                },
                {
                    id: '3-2',
                    title: 'Count post-sort inversions: pairs (i<j) with a_i < a_j',
                    difficulty: 'Easy',
                    tags: [
                                          'Divide&Conquer',
                                          'Sorting'
                                        ],
                },
                {
                    id: '3-3',
                    title: 'Generalize Strassen for 7x7 matrices - how many multiplications?',
                    difficulty: 'Hard',
                    tags: [
                                          'Divide&Conquer',
                                          'Matrix'
                                        ],
                },
                {
                    id: '3-4',
                    title: 'Design D&C max subarray sum in O(n log n)',
                    difficulty: 'Medium',
                    tags: [
                                          'Divide&Conquer',
                                          'Arrays'
                                        ],
                },
                {
                    id: '3-5',
                    title: 'Count significant inversions (a_i > 2*a_j) using modified merge sort',
                    difficulty: 'Medium',
                    tags: [
                                          'Divide&Conquer',
                                          'Counting'
                                        ],
                },
                {
                    id: '3-6',
                    title: 'Show closest-pair works for Manhattan distance',
                    difficulty: 'Medium',
                    tags: [
                                          'Divide&Conquer',
                                          'Geometry'
                                        ],
                },
                {
                    id: '3-7',
                    title: 'Prove D&C closest-pair runs in O(n log n)',
                    difficulty: 'Medium',
                    tags: [
                                          'Divide&Conquer',
                                          'Geometry'
                                        ],
                },
                {
                    id: '3-8',
                    title: 'Problem 3.8',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '4',
            title: 'The Master Method',
            page: 79,
            problems: [
                {
                    id: '4-1',
                    title: 'Solve T(n)=9T(n/3)+n via master method',
                    difficulty: 'Easy',
                    tags: [
                                          'MasterMethod'
                                        ],
                },
                {
                    id: '4-2',
                    title: 'Solve T(n)=2T(n/2)+n log n via master method',
                    difficulty: 'Easy',
                    tags: [
                                          'MasterMethod'
                                        ],
                },
                {
                    id: '4-3',
                    title: 'Solve T(n)=T(2n/3)+1 - which algorithm?',
                    difficulty: 'Easy',
                    tags: [
                                          'MasterMethod',
                                          'BinarySearch'
                                        ],
                },
                {
                    id: '4-4',
                    title: 'Solve T(n)=3T(n/4)+n log n - which case?',
                    difficulty: 'Medium',
                    tags: [
                                          'MasterMethod'
                                        ],
                },
                {
                    id: '4-5',
                    title: 'Describe algorithm for each master theorem case',
                    difficulty: 'Medium',
                    tags: [
                                          'MasterMethod'
                                        ],
                },
                {
                    id: '4-6',
                    title: 'Prove master theorem case 1: T(n)=aT(n/b)+cn^k, a>b^k => T(n)=Theta(n^{log_b a})',
                    difficulty: 'Hard',
                    tags: [
                                          'MasterMethod',
                                          'Proof'
                                        ],
                },
                {
                    id: '4-7',
                    title: 'Solve T(n)=2T(n/2)+n/log n - can master theorem apply?',
                    difficulty: 'Hard',
                    tags: [
                                          'MasterMethod'
                                        ],
                },
                {
                    id: '4-8',
                    title: 'Problem 4.8',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '5',
            title: 'QuickSort',
            page: 101,
            problems: [
                {
                    id: '5-1',
                    title: 'Trace QuickSort on [4,1,3,5,2] with last-element pivot',
                    difficulty: 'Easy',
                    tags: [
                                          'QuickSort',
                                          'Sorting'
                                        ],
                },
                {
                    id: '5-2',
                    title: 'Expected comparisons for randomized QuickSort on length n',
                    difficulty: 'Medium',
                    tags: [
                                          'QuickSort',
                                          'Randomized'
                                        ],
                },
                {
                    id: '5-3',
                    title: 'Implement median-of-three pivot, analyze improvement',
                    difficulty: 'Medium',
                    tags: [
                                          'QuickSort'
                                        ],
                },
                {
                    id: '5-4',
                    title: 'Design QuickSort variant with O(n log n) worst-case',
                    difficulty: 'Hard',
                    tags: [
                                          'QuickSort',
                                          'Divide&Conquer'
                                        ],
                },
                {
                    id: '5-5',
                    title: 'Prove expected QuickSort comparisons is O(n log n)',
                    difficulty: 'Hard',
                    tags: [
                                          'QuickSort',
                                          'Randomized',
                                          'Probability'
                                        ],
                },
                {
                    id: '5-6',
                    title: 'Show QuickSort recursion depth O(log n) with high probability',
                    difficulty: 'Medium',
                    tags: [
                                          'QuickSort',
                                          'Randomized'
                                        ],
                },
                {
                    id: '5-7',
                    title: 'Implement 3-way partition QuickSort for duplicates',
                    difficulty: 'Medium',
                    tags: [
                                          'QuickSort',
                                          'Sorting'
                                        ],
                },
                {
                    id: '5-8',
                    title: 'Problem 5.8',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '6',
            title: 'Linear-Time Selection',
            page: 121,
            problems: [
                {
                    id: '6-1',
                    title: 'Trace RSelect finding 3rd smallest in [7,2,9,4,3,8,5]',
                    difficulty: 'Easy',
                    tags: [
                                          'Selection',
                                          'Randomized'
                                        ],
                },
                {
                    id: '6-2',
                    title: 'Show DSelect recurrence solves to O(n)',
                    difficulty: 'Medium',
                    tags: [
                                          'Selection',
                                          'Divide&Conquer'
                                        ],
                },
                {
                    id: '6-3',
                    title: 'Prove median of medians is >=30% and <=70% of all elements',
                    difficulty: 'Medium',
                    tags: [
                                          'Selection',
                                          'Proof'
                                        ],
                },
                {
                    id: '6-4',
                    title: 'Implement DSelect with groups of 7, analyze recurrence',
                    difficulty: 'Hard',
                    tags: [
                                          'Selection'
                                        ],
                },
                {
                    id: '6-5',
                    title: 'Design algorithm for kth smallest in sorted matrix',
                    difficulty: 'Medium',
                    tags: [
                                          'Selection',
                                          'BinarySearch',
                                          'Matrix'
                                        ],
                },
                {
                    id: '6-6',
                    title: 'Given two sorted arrays, find median of union in O(log(min(m,n)))',
                    difficulty: 'Medium',
                    tags: [
                                          'Selection',
                                          'BinarySearch',
                                          'Arrays'
                                        ],
                },
                {
                    id: '6-7',
                    title: 'Prove RSelect runs in expected O(n) even with adversarial input',
                    difficulty: 'Hard',
                    tags: [
                                          'Selection',
                                          'Randomized',
                                          'Probability'
                                        ],
                },
                {
                    id: '6-8',
                    title: 'Problem 6.8',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '7',
            title: 'Graphs: The Basics',
            page: 131,
            problems: [
                {
                    id: '7-1',
                    title: 'Represent directed graph with lists vs matrices - compare sparse/dense space',
                    difficulty: 'Easy',
                    tags: [
                                          'Graph',
                                          'Representation'
                                        ],
                },
                {
                    id: '7-2',
                    title: 'Prove reachable vertices from source computed in O(V+E)',
                    difficulty: 'Easy',
                    tags: [
                                          'Graph'
                                        ],
                },
                {
                    id: '7-3',
                    title: 'Design algorithm to check connectivity via BFS/DFS',
                    difficulty: 'Easy',
                    tags: [
                                          'Graph',
                                          'Connectivity'
                                        ],
                },
                {
                    id: '7-4',
                    title: 'Compute transitive closure via Floyd-Warshall',
                    difficulty: 'Medium',
                    tags: [
                                          'Graph',
                                          'Closure'
                                        ],
                },
                {
                    id: '7-5',
                    title: 'Problem 7.5',
                    difficulty: 'Hard',
                },
                {
                    id: '7-6',
                    title: 'Problem 7.6',
                    difficulty: 'Easy',
                },
                {
                    id: '7-7',
                    title: 'Problem 7.7',
                    difficulty: 'Easy',
                },
                {
                    id: '7-8',
                    title: 'Problem 7.8',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '8',
            title: 'Graph Search and Its Applications',
            page: 143,
            problems: [
                {
                    id: '8-1',
                    title: 'Trace BFS on 7-vertex graph, find shortest paths from s',
                    difficulty: 'Easy',
                    tags: [
                                          'BFS',
                                          'Graph'
                                        ],
                },
                {
                    id: '8-2',
                    title: 'Implement topological sort using DFS, detect cycles',
                    difficulty: 'Medium',
                    tags: [
                                          'DFS',
                                          'TopSort'
                                        ],
                },
                {
                    id: '8-3',
                    title: 'Run Kosaraju two-pass SCC on 8-vertex directed graph',
                    difficulty: 'Hard',
                    tags: [
                                          'DFS',
                                          'SCC'
                                        ],
                },
                {
                    id: '8-4',
                    title: 'Show reversing all DAG edges reverses topological order',
                    difficulty: 'Medium',
                    tags: [
                                          'DAG',
                                          'TopSort'
                                        ],
                },
                {
                    id: '8-5',
                    title: 'Design algorithm to count simple paths between two DAG vertices',
                    difficulty: 'Medium',
                    tags: [
                                          'DAG',
                                          'DP',
                                          'Counting'
                                        ],
                },
                {
                    id: '8-6',
                    title: 'Prove undirected graph has <=2 components after removing one vertex',
                    difficulty: 'Easy',
                    tags: [
                                          'Graph',
                                          'Connectivity'
                                        ],
                },
                {
                    id: '8-7',
                    title: 'Prove every DAG has at least one source and one sink',
                    difficulty: 'Easy',
                    tags: [
                                          'DAG',
                                          'Proof'
                                        ],
                },
                {
                    id: '8-8',
                    title: 'Problem 8.8',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '9',
            title: 'Dijkstra Algorithm',
            page: 161,
            problems: [
                {
                    id: '9-1',
                    title: 'Trace Dijkstra on weighted 6-vertex graph from A',
                    difficulty: 'Easy',
                    tags: [
                                          'Dijkstra',
                                          'SSSP'
                                        ],
                },
                {
                    id: '9-2',
                    title: 'Prove Dijkstra correct for non-negative weights',
                    difficulty: 'Hard',
                    tags: [
                                          'Dijkstra',
                                          'Proof'
                                        ],
                },
                {
                    id: '9-3',
                    title: 'Implement Dijkstra with heap, analyze O((E+V) log V)',
                    difficulty: 'Medium',
                    tags: [
                                          'Dijkstra',
                                          'Heap'
                                        ],
                },
                {
                    id: '9-4',
                    title: 'Construct counterexample where Dijkstra fails with negative weights',
                    difficulty: 'Easy',
                    tags: [
                                          'Dijkstra',
                                          'Counterexample'
                                        ],
                },
                {
                    id: '9-5',
                    title: 'Design Dijkstra variant for top-k shortest paths',
                    difficulty: 'Hard',
                    tags: [
                                          'Dijkstra',
                                          'KShortestPaths'
                                        ],
                },
                {
                    id: '9-6',
                    title: 'Prove Dijkstra processes vertices in non-decreasing distance',
                    difficulty: 'Medium',
                    tags: [
                                          'Dijkstra',
                                          'Proof'
                                        ],
                },
                {
                    id: '9-7',
                    title: 'Implement bidirectional Dijkstra from source and destination',
                    difficulty: 'Medium',
                    tags: [
                                          'Dijkstra',
                                          'Optimization'
                                        ],
                },
                {
                    id: '9-8',
                    title: 'Problem 9.8',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '10',
            title: 'Heaps',
            page: 181,
            problems: [
                {
                    id: '10-1',
                    title: 'Illustrate binary heap from array, perform extract-min',
                    difficulty: 'Easy',
                    tags: [
                                          'Heap'
                                        ],
                },
                {
                    id: '10-2',
                    title: 'Prove BUILD-MAX-HEAP runs in O(n), not O(n log n)',
                    difficulty: 'Medium',
                    tags: [
                                          'Heap',
                                          'Proof'
                                        ],
                },
                {
                    id: '10-3',
                    title: 'Implement min-heap with decrease-key in O(log n)',
                    difficulty: 'Medium',
                    tags: [
                                          'Heap'
                                        ],
                },
                {
                    id: '10-4',
                    title: 'Design d-ary heap, analyze insert/extract-min times',
                    difficulty: 'Medium',
                    tags: [
                                          'Heap'
                                        ],
                },
                {
                    id: '10-5',
                    title: 'Prove heap sort always O(n log n) regardless of input',
                    difficulty: 'Easy',
                    tags: [
                                          'Heap',
                                          'Sorting'
                                        ],
                },
                {
                    id: '10-6',
                    title: 'Implement heap priority queue for Dijkstra, analyze speedup',
                    difficulty: 'Medium',
                    tags: [
                                          'Heap',
                                          'Dijkstra'
                                        ],
                },
                {
                    id: '10-7',
                    title: 'Find median of stream using two heaps',
                    difficulty: 'Medium',
                    tags: [
                                          'Heap',
                                          'Streaming'
                                        ],
                },
                {
                    id: '10-8',
                    title: 'Problem 10.8',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '11',
            title: 'Search Trees',
            page: 199,
            problems: [
                {
                    id: '11-1',
                    title: 'Insert into AVL tree, perform rotations to restore balance',
                    difficulty: 'Easy',
                    tags: [
                                          'Tree',
                                          'BST',
                                          'AVL'
                                        ],
                },
                {
                    id: '11-2',
                    title: 'Prove randomly built BST has O(log n) expected height',
                    difficulty: 'Hard',
                    tags: [
                                          'BST',
                                          'Randomized',
                                          'Probability'
                                        ],
                },
                {
                    id: '11-3',
                    title: 'Implement sorted set using balanced BST (AVL/RB)',
                    difficulty: 'Medium',
                    tags: [
                                          'BST',
                                          'Tree'
                                        ],
                },
                {
                    id: '11-4',
                    title: 'Show inorder traversal sequence of a BST',
                    difficulty: 'Easy',
                    tags: [
                                          'BST',
                                          'Tree'
                                        ],
                },
                {
                    id: '11-5',
                    title: 'Design BST supporting split/join in O(log n)',
                    difficulty: 'Medium',
                    tags: [
                                          'Tree',
                                          'BST'
                                        ],
                },
                {
                    id: '11-6',
                    title: 'Prove AVL height <= 1.44*log2(n+2)-1.328',
                    difficulty: 'Hard',
                    tags: [
                                          'Tree',
                                          'AVL',
                                          'Proof'
                                        ],
                },
                {
                    id: '11-7',
                    title: 'Find successor of element in BST in O(h)',
                    difficulty: 'Easy',
                    tags: [
                                          'BST',
                                          'Tree'
                                        ],
                },
                {
                    id: '11-8',
                    title: 'Problem 11.8',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '12',
            title: 'Hash Tables',
            page: 217,
            problems: [
                {
                    id: '12-1',
                    title: 'Show chaining for keys [10,22,31,4,15,28] in table size 7',
                    difficulty: 'Easy',
                    tags: [
                                          'Hash',
                                          'Chaining'
                                        ],
                },
                {
                    id: '12-2',
                    title: 'Implement linear vs quadratic probing, compare clustering',
                    difficulty: 'Medium',
                    tags: [
                                          'Hash',
                                          'OpenAddressing'
                                        ],
                },
                {
                    id: '12-3',
                    title: 'Design Bloom filter, compute false positive rate for k hashes, m bits',
                    difficulty: 'Hard',
                    tags: [
                                          'Hash',
                                          'BloomFilter'
                                        ],
                },
                {
                    id: '12-4',
                    title: 'Prove uniform hashing gives <=1/(1-alpha) expected unsuccessful probes',
                    difficulty: 'Medium',
                    tags: [
                                          'Hash',
                                          'Probability'
                                        ],
                },
                {
                    id: '12-5',
                    title: 'Design hash table with constant worst-case operations (perfect hashing)',
                    difficulty: 'Hard',
                    tags: [
                                          'Hash',
                                          'Design'
                                        ],
                },
                {
                    id: '12-6',
                    title: 'Show Cuckoo hashing insertion, prove expected O(1) amortized',
                    difficulty: 'Hard',
                    tags: [
                                          'Hash',
                                          'Cuckoo'
                                        ],
                },
                {
                    id: '12-7',
                    title: 'Problem 12.7',
                    difficulty: 'Easy',
                },
                {
                    id: '12-8',
                    title: 'Problem 12.8',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '13',
            title: 'Introduction to Greedy Algorithms',
            page: 233,
            problems: [
                {
                    id: '13-1',
                    title: 'Prove greedy min-max-lateness scheduling optimal via exchange',
                    difficulty: 'Hard',
                    tags: [
                                          'Greedy',
                                          'Scheduling',
                                          'Proof'
                                        ],
                },
                {
                    id: '13-2',
                    title: 'Design greedy interval scheduling for max non-overlapping intervals',
                    difficulty: 'Easy',
                    tags: [
                                          'Greedy',
                                          'Scheduling'
                                        ],
                },
                {
                    id: '13-3',
                    title: 'Find counterexample where greedy coin change fails',
                    difficulty: 'Easy',
                    tags: [
                                          'Greedy',
                                          'Counterexample'
                                        ],
                },
                {
                    id: '13-4',
                    title: 'Prove greedy fractional knapsack optimal',
                    difficulty: 'Medium',
                    tags: [
                                          'Greedy',
                                          'Knapsack',
                                          'Proof'
                                        ],
                },
                {
                    id: '13-5',
                    title: 'Design greedy minimum platforms for train scheduling',
                    difficulty: 'Medium',
                    tags: [
                                          'Greedy',
                                          'Scheduling'
                                        ],
                },
                {
                    id: '13-6',
                    title: 'Prove exchange lemma: swapping preserves feasibility',
                    difficulty: 'Hard',
                    tags: [
                                          'Greedy',
                                          'Proof'
                                        ],
                },
                {
                    id: '13-7',
                    title: 'Solve task scheduling with deadlines/profits using greedy',
                    difficulty: 'Medium',
                    tags: [
                                          'Greedy',
                                          'Scheduling'
                                        ],
                },
                {
                    id: '13-8',
                    title: 'Problem 13.8',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '14',
            title: 'Huffman Codes',
            page: 249,
            problems: [
                {
                    id: '14-1',
                    title: 'Build Huffman tree for frequencies [a:45,b:13,c:12,d:16,e:9,f:5]',
                    difficulty: 'Easy',
                    tags: [
                                          'Greedy',
                                          'Huffman',
                                          'Trees'
                                        ],
                },
                {
                    id: '14-2',
                    title: 'Prove Huffman optimal via exchange argument on tree',
                    difficulty: 'Hard',
                    tags: [
                                          'Greedy',
                                          'Huffman',
                                          'Proof'
                                        ],
                },
                {
                    id: '14-3',
                    title: 'Implement Huffman encode/decode for text file',
                    difficulty: 'Medium',
                    tags: [
                                          'Greedy',
                                          'Huffman'
                                        ],
                },
                {
                    id: '14-4',
                    title: 'Show prefix-free condition equivalent to full binary tree',
                    difficulty: 'Medium',
                    tags: [
                                          'Greedy',
                                          'Huffman'
                                        ],
                },
                {
                    id: '14-5',
                    title: 'Generalize Huffman to ternary codes (alphabet size 3)',
                    difficulty: 'Hard',
                    tags: [
                                          'Greedy',
                                          'Huffman',
                                          'Generalization'
                                        ],
                },
                {
                    id: '14-6',
                    title: 'Compute optimal bits for message from character frequencies',
                    difficulty: 'Easy',
                    tags: [
                                          'Greedy',
                                          'Huffman'
                                        ],
                },
                {
                    id: '14-7',
                    title: 'Problem 14.7',
                    difficulty: 'Easy',
                },
                {
                    id: '14-8',
                    title: 'Problem 14.8',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '15',
            title: 'Minimum Spanning Trees',
            page: 267,
            problems: [
                {
                    id: '15-1',
                    title: 'Trace Prim on weighted 6-vertex graph from A',
                    difficulty: 'Easy',
                    tags: [
                                          'MST',
                                          'Prim'
                                        ],
                },
                {
                    id: '15-2',
                    title: 'Run Kruskal on 7-vertex, 12-edge graph',
                    difficulty: 'Easy',
                    tags: [
                                          'MST',
                                          'Kruskal'
                                        ],
                },
                {
                    id: '15-3',
                    title: 'Prove cut property: lightest crossing edge in every MST',
                    difficulty: 'Medium',
                    tags: [
                                          'MST',
                                          'Proof'
                                        ],
                },
                {
                    id: '15-4',
                    title: 'Implement union-find with path compression/union by rank',
                    difficulty: 'Medium',
                    tags: [
                                          'UnionFind',
                                          'MST'
                                        ],
                },
                {
                    id: '15-5',
                    title: 'Prove cycle property: heaviest cycle edge not in any MST',
                    difficulty: 'Medium',
                    tags: [
                                          'MST',
                                          'Proof'
                                        ],
                },
                {
                    id: '15-6',
                    title: 'Design max-spacing k-clustering using MST',
                    difficulty: 'Medium',
                    tags: [
                                          'MST',
                                          'Clustering'
                                        ],
                },
                {
                    id: '15-7',
                    title: 'Show Prim with heap runs in O((E+V) log V)',
                    difficulty: 'Hard',
                    tags: [
                                          'MST',
                                          'Prim',
                                          'Heap'
                                        ],
                },
                {
                    id: '15-8',
                    title: 'Prove Kruskal correctness via cut property',
                    difficulty: 'Medium',
                    tags: [
                                          'MST',
                                          'Kruskal',
                                          'Proof'
                                        ],
                },
                {
                    id: '15-9',
                    title: 'Design second-best MST algorithm',
                    difficulty: 'Hard',
                    tags: [
                                          'MST'
                                        ],
                },
            ],
        },
        {
            num: '16',
            title: 'Introduction to Dynamic Programming',
            page: 285,
            problems: [
                {
                    id: '16-1',
                    title: 'Compute max-weight independent set in path [1,4,5,4] via DP',
                    difficulty: 'Easy',
                    tags: [
                                          'DP',
                                          'Graph'
                                        ],
                },
                {
                    id: '16-2',
                    title: 'Solve 0/1 knapsack capacity 10 with given items',
                    difficulty: 'Easy',
                    tags: [
                                          'DP',
                                          'Knapsack'
                                        ],
                },
                {
                    id: '16-3',
                    title: 'Prove optimal solution reconstruction from DP table correct',
                    difficulty: 'Medium',
                    tags: [
                                          'DP',
                                          'Proof'
                                        ],
                },
                {
                    id: '16-4',
                    title: 'Solve subset-sum: find subset summing to target',
                    difficulty: 'Easy',
                    tags: [
                                          'DP',
                                          'SubsetSum'
                                        ],
                },
                {
                    id: '16-5',
                    title: 'Design DP partition: equal-sum subsets?',
                    difficulty: 'Medium',
                    tags: [
                                          'DP',
                                          'Partition'
                                        ],
                },
                {
                    id: '16-6',
                    title: 'Solve unbounded knapsack (unlimited reuse) via DP',
                    difficulty: 'Medium',
                    tags: [
                                          'DP',
                                          'Knapsack'
                                        ],
                },
                {
                    id: '16-7',
                    title: 'Prove weighted independent set DP has optimal substructure',
                    difficulty: 'Medium',
                    tags: [
                                          'DP',
                                          'Proof'
                                        ],
                },
                {
                    id: '16-8',
                    title: 'Problem 16.8',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '17',
            title: 'Advanced Dynamic Programming',
            page: 303,
            problems: [
                {
                    id: '17-1',
                    title: 'Compute edit distance kitten->sitting, show alignment',
                    difficulty: 'Easy',
                    tags: [
                                          'DP',
                                          'Strings',
                                          'EditDistance'
                                        ],
                },
                {
                    id: '17-2',
                    title: 'Design DP for optimal BST given key probabilities',
                    difficulty: 'Hard',
                    tags: [
                                          'DP',
                                          'BST',
                                          'Trees'
                                        ],
                },
                {
                    id: '17-3',
                    title: 'Implement Kadane max-sum subarray, prove correctness',
                    difficulty: 'Easy',
                    tags: [
                                          'DP',
                                          'Arrays'
                                        ],
                },
                {
                    id: '17-4',
                    title: 'Compute LCS of ABCBDAB and BDCABA',
                    difficulty: 'Easy',
                    tags: [
                                          'DP',
                                          'Strings',
                                          'LCS'
                                        ],
                },
                {
                    id: '17-5',
                    title: 'Design DP for optimal convex polygon triangulation',
                    difficulty: 'Hard',
                    tags: [
                                          'DP',
                                          'Geometry'
                                        ],
                },
                {
                    id: '17-6',
                    title: 'Solve matrix chain multiplication [5,4,6,2,7]',
                    difficulty: 'Medium',
                    tags: [
                                          'DP',
                                          'Matrix'
                                        ],
                },
                {
                    id: '17-7',
                    title: 'Design O(n log n) LIS DP',
                    difficulty: 'Medium',
                    tags: [
                                          'DP',
                                          'LIS',
                                          'BinarySearch'
                                        ],
                },
                {
                    id: '17-8',
                    title: 'Problem 17.8',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '18',
            title: 'Shortest Paths Revisited, NP-Complete, Beyond',
            page: 321,
            problems: [
                {
                    id: '18-1',
                    title: 'Trace Bellman-Ford on 5-vertex graph with negative edge',
                    difficulty: 'Easy',
                    tags: [
                                          'BellmanFord',
                                          'SSSP'
                                        ],
                },
                {
                    id: '18-2',
                    title: 'Prove Bellman-Ford detects negative cycles from source',
                    difficulty: 'Medium',
                    tags: [
                                          'BellmanFord',
                                          'NegCycle',
                                          'Proof'
                                        ],
                },
                {
                    id: '18-3',
                    title: 'Run Floyd-Warshall on 4 vertices, show distance matrices',
                    difficulty: 'Easy',
                    tags: [
                                          'FloydWarshall',
                                          'APSP'
                                        ],
                },
                {
                    id: '18-4',
                    title: 'Prove Floyd-Warshall optimal substructure',
                    difficulty: 'Medium',
                    tags: [
                                          'FloydWarshall',
                                          'Proof'
                                        ],
                },
                {
                    id: '18-5',
                    title: 'Design O(n^2*2^n) DP for TSP using bitmask',
                    difficulty: 'Hard',
                    tags: [
                                          'DP',
                                          'TSP',
                                          'BitmaskDP'
                                        ],
                },
                {
                    id: '18-6',
                    title: 'Show all-pairs shortest path reduces to single-source case',
                    difficulty: 'Medium',
                    tags: [
                                          'APSP',
                                          'SSSP'
                                        ],
                },
                {
                    id: '18-7',
                    title: 'Problem 18.7',
                    difficulty: 'Easy',
                },
                {
                    id: '18-8',
                    title: 'Problem 18.8',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '19',
            title: 'What is NP-Hardness?',
            page: 333,
            problems: [
                {
                    id: '19-1',
                    title: 'Why TSP believed harder than MST: decision vs optimization?',
                    difficulty: 'Easy',
                    tags: [
                                          'NP',
                                          'TSP'
                                        ],
                },
                {
                    id: '19-2',
                    title: 'Prove: P=NP implies every NP problem solves in polynomial time',
                    difficulty: 'Medium',
                    tags: [
                                          'NP',
                                          'Complexity'
                                        ],
                },
                {
                    id: '19-3',
                    title: 'Show polynomial SAT solver implies P=NP',
                    difficulty: 'Hard',
                    tags: [
                                          'NP',
                                          'SAT',
                                          'Proof'
                                        ],
                },
                {
                    id: '19-4',
                    title: 'Classify: sorting, MST, max clique, 3-coloring, shortest path as P or NP-complete',
                    difficulty: 'Easy',
                    tags: [
                                          'NP',
                                          'Complexity'
                                        ],
                },
                {
                    id: '19-5',
                    title: 'Define poly-time reducibility, show transitive',
                    difficulty: 'Medium',
                    tags: [
                                          'NP',
                                          'Reduction'
                                        ],
                },
                {
                    id: '19-6',
                    title: 'Explain NP-hard vs NP-complete with examples',
                    difficulty: 'Easy',
                    tags: [
                                          'NP',
                                          'Complexity'
                                        ],
                },
                {
                    id: '19-7',
                    title: 'Problem 19.7',
                    difficulty: 'Easy',
                },
                {
                    id: '19-8',
                    title: 'Problem 19.8',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '20',
            title: 'Worst-Case Inefficient Solutions',
            page: 355,
            problems: [
                {
                    id: '20-1',
                    title: 'Design 2-approximation for vertex cover, prove ratio',
                    difficulty: 'Medium',
                    tags: [
                                          'Approximation',
                                          'VertexCover'
                                        ],
                },
                {
                    id: '20-2',
                    title: 'Apply local search to max-cut: flip vertices to improve',
                    difficulty: 'Medium',
                    tags: [
                                          'LocalSearch',
                                          'MaxCut'
                                        ],
                },
                {
                    id: '20-3',
                    title: 'Prove greedy set cover achieves O(log n) approximation',
                    difficulty: 'Hard',
                    tags: [
                                          'Approximation',
                                          'SetCover'
                                        ],
                },
                {
                    id: '20-4',
                    title: 'Design 2-approximation for metric TSP via MST doubling',
                    difficulty: 'Medium',
                    tags: [
                                          'Approximation',
                                          'TSP'
                                        ],
                },
                {
                    id: '20-5',
                    title: 'Show greedy max cut achieves >= half optimal',
                    difficulty: 'Medium',
                    tags: [
                                          'Approximation',
                                          'MaxCut'
                                        ],
                },
                {
                    id: '20-6',
                    title: 'Prove MAX-3SAT not approximable within 7/8 unless P=NP',
                    difficulty: 'Hard',
                    tags: [
                                          'Approximation',
                                          'PCP'
                                        ],
                },
                {
                    id: '20-7',
                    title: 'Design factor-2 approximation for makespan on identical machines',
                    difficulty: 'Medium',
                    tags: [
                                          'Approximation',
                                          'Scheduling'
                                        ],
                },
                {
                    id: '20-8',
                    title: 'Problem 20.8',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '21',
            title: 'Exponential Time Algorithms',
            page: 375,
            problems: [
                {
                    id: '21-1',
                    title: 'Design O(n^2*2^n) DP TSP, run on 5-vertex complete graph',
                    difficulty: 'Hard',
                    tags: [
                                          'Exact',
                                          'TSP',
                                          'DP'
                                        ],
                },
                {
                    id: '21-2',
                    title: 'Apply color-coding for path of length k in O(2^k n^{O(1)})',
                    difficulty: 'Hard',
                    tags: [
                                          'Exact',
                                          'ColorCoding'
                                        ],
                },
                {
                    id: '21-3',
                    title: 'Use inclusion-exclusion to count set covers in O(2^m poly(n))',
                    difficulty: 'Hard',
                    tags: [
                                          'Exact',
                                          'SetCover'
                                        ],
                },
                {
                    id: '21-4',
                    title: 'Show 3-coloring in O(1.3289^n) via branch/bound',
                    difficulty: 'Hard',
                    tags: [
                                          'Exact',
                                          'GraphColoring'
                                        ],
                },
                {
                    id: '21-5',
                    title: 'Design meet-in-the-middle SUBSET SUM O(2^{n/2})',
                    difficulty: 'Medium',
                    tags: [
                                          'Exact',
                                          'SubsetSum'
                                        ],
                },
                {
                    id: '21-6',
                    title: 'Prove max independent set in O(1.618^n) via branching',
                    difficulty: 'Hard',
                    tags: [
                                          'Exact',
                                          'Branching'
                                        ],
                },
                {
                    id: '21-7',
                    title: 'Show SAT in O(1.5^n) via DPLL with unit propagation',
                    difficulty: 'Medium',
                    tags: [
                                          'Exact',
                                          'SAT'
                                        ],
                },
                {
                    id: '21-8',
                    title: 'Problem 21.8',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '22',
            title: 'Proving NP-Hardness',
            page: 393,
            problems: [
                {
                    id: '22-1',
                    title: 'Reduce 3SAT to INDEPENDENT SET via clause-variable gadget',
                    difficulty: 'Hard',
                    tags: [
                                          'NP',
                                          'Reduction',
                                          '3SAT'
                                        ],
                },
                {
                    id: '22-2',
                    title: 'Prove VERTEX COVER NP-complete from INDEPENDENT SET',
                    difficulty: 'Medium',
                    tags: [
                                          'NP',
                                          'Reduction',
                                          'VertexCover'
                                        ],
                },
                {
                    id: '22-3',
                    title: 'Reduce SUBSET SUM to PARTITION',
                    difficulty: 'Medium',
                    tags: [
                                          'NP',
                                          'Reduction',
                                          'SubsetSum'
                                        ],
                },
                {
                    id: '22-4',
                    title: 'Prove HAMILTONIAN CYCLE NP-complete from 3SAT',
                    difficulty: 'Hard',
                    tags: [
                                          'NP',
                                          'Reduction',
                                          'Hamiltonian'
                                        ],
                },
                {
                    id: '22-5',
                    title: 'Show CLIQUE NP-complete from 3SAT',
                    difficulty: 'Medium',
                    tags: [
                                          'NP',
                                          'Reduction',
                                          'Clique'
                                        ],
                },
                {
                    id: '22-6',
                    title: 'Prove 3-COLOR NP-complete from 3SAT using OR-gadget',
                    difficulty: 'Hard',
                    tags: [
                                          'NP',
                                          'Reduction',
                                          'GraphColoring'
                                        ],
                },
                {
                    id: '22-7',
                    title: 'Reduce VERTEX COVER to DOMINATING SET',
                    difficulty: 'Hard',
                    tags: [
                                          'NP',
                                          'Reduction'
                                        ],
                },
                {
                    id: '22-8',
                    title: 'Problem 22.8',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '23',
            title: 'P, NP, and Beyond',
            page: 411,
            problems: [
                {
                    id: '23-1',
                    title: 'Explain co-NP vs NP, give co-NP problem examples',
                    difficulty: 'Medium',
                    tags: [
                                          'Complexity',
                                          'coNP'
                                        ],
                },
                {
                    id: '23-2',
                    title: 'Show NP != co-NP implies P != NP',
                    difficulty: 'Medium',
                    tags: [
                                          'Complexity',
                                          'Proof'
                                        ],
                },
                {
                    id: '23-3',
                    title: 'Define polynomial hierarchy PH, relation to P/NP',
                    difficulty: 'Hard',
                    tags: [
                                          'Complexity',
                                          'PH'
                                        ],
                },
                {
                    id: '23-4',
                    title: 'Prove SAT phase transition at clause/variable ratio ~4.26',
                    difficulty: 'Hard',
                    tags: [
                                          'Complexity',
                                          'SAT'
                                        ],
                },
                {
                    id: '23-5',
                    title: 'Overview of circuit complexity and P/poly class',
                    difficulty: 'Medium',
                    tags: [
                                          'Complexity',
                                          'Circuits'
                                        ],
                },
                {
                    id: '23-6',
                    title: 'Significance of Exponential Time Hypothesis for algorithm design',
                    difficulty: 'Medium',
                    tags: [
                                          'Complexity',
                                          'ETH'
                                        ],
                },
                {
                    id: '23-7',
                    title: 'Problem 23.7',
                    difficulty: 'Easy',
                },
                {
                    id: '23-8',
                    title: 'Problem 23.8',
                    difficulty: 'Medium',
                },
            ],
        },
        {
            num: '24',
            title: 'Case Study: FCC Spectrum Auctions',
            page: 425,
            problems: [
                {
                    id: '24-1',
                    title: 'Describe FCC auction as optimization, identify NP-hard aspects',
                    difficulty: 'Easy',
                    tags: [
                                          'CaseStudy'
                                        ],
                },
                {
                    id: '24-2',
                    title: 'Design greedy approximation for spectrum allocation',
                    difficulty: 'Medium',
                    tags: [
                                          'CaseStudy',
                                          'Approximation'
                                        ],
                },
                {
                    id: '24-3',
                    title: 'Why truthfulness matters in auction design',
                    difficulty: 'Medium',
                    tags: [
                                          'CaseStudy',
                                          'MechanismDesign'
                                        ],
                },
                {
                    id: '24-4',
                    title: 'Show VCG mechanism applied to spectrum allocation',
                    difficulty: 'Hard',
                    tags: [
                                          'CaseStudy',
                                          'MechanismDesign'
                                        ],
                },
                {
                    id: '24-5',
                    title: 'Analyze complexity of VCG payments computation',
                    difficulty: 'Medium',
                    tags: [
                                          'CaseStudy',
                                          'Complexity'
                                        ],
                },
                {
                    id: '24-6',
                    title: 'Problem 24.6',
                    difficulty: 'Easy',
                },
                {
                    id: '24-7',
                    title: 'Problem 24.7',
                    difficulty: 'Easy',
                },
                {
                    id: '24-8',
                    title: 'Problem 24.8',
                    difficulty: 'Medium',
                },
            ],
        },
    ],
}

// ─── CLRS ──────────────────────────────────────────────────────────────
const clrs: Book = {
    slug: 'clrs',
    title: 'Introduction to Algorithms',
    shortTitle: 'CLRS',
    author: 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest & Clifford Stein',
    edition: '4th',
    year: 2022,
    coverUrl: '/assets/books/cover-clrs.jpg',
    color: '#1e3a5f',
    accentColor: '#3b82f6',
    description: 'The definitive textbook on algorithms. Covers fundamentals (sorting, data structures), advanced techniques (DP, greedy, graph algorithms), and specialized topics (multithreading, online algorithms, machine learning).',
    totalProblems: 210,
    tags: [
          'Algorithms',
          'Data Structures',
          'Sorting',
          'Graphs',
          'Textbook'
        ],
    chapters: [
        {
            num: '1',
            title: 'The Role of Algorithms in Computing',
            page: 27,
            problems: [
                {
                    id: '1-1',
                    title: 'Comparison of running times: for each function f(n) and time t, find the largest n solvable.',
                },
                {
                    id: '1-2',
                    title: 'Problem 1.2',
                    difficulty: 'Easy',
                },
                {
                    id: '1-3',
                    title: 'Problem 1.3',
                    difficulty: 'Medium',
                },
                {
                    id: '1-4',
                    title: 'Problem 1.4',
                    difficulty: 'Medium',
                },
                {
                    id: '1-5',
                    title: 'Problem 1.5',
                    difficulty: 'Hard',
                },
                {
                    id: '1-6',
                    title: 'Problem 1.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '2',
            title: 'Getting Started',
            page: 39,
            problems: [
                {
                    id: '2-1',
                    title: 'Insertion sort on small arrays in merge sort.',
                },
                {
                    id: '2-2',
                    title: 'Correctness of bubblesort.',
                },
                {
                    id: '2-3',
                    title: 'Correctness of Horner\'s rule for evaluating polynomials.',
                },
                {
                    id: '2-4',
                    title: 'Inversions: give algorithm to count inversions in O(n lg n) time.',
                },
                {
                    id: '2-5',
                    title: 'Problem 2.5',
                    difficulty: 'Hard',
                },
                {
                    id: '2-6',
                    title: 'Problem 2.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '3',
            title: 'Characterizing Running Times',
            page: 71,
            problems: [
                {
                    id: '3-1',
                    title: 'Asymptotic behavior of polynomials.',
                },
                {
                    id: '3-2',
                    title: 'Relative asymptotic growths of common functions.',
                },
                {
                    id: '3-3',
                    title: 'Ordering by asymptotic growth rates.',
                },
                {
                    id: '3-4',
                    title: 'Asymptotic notation properties.',
                },
                {
                    id: '3-5',
                    title: 'Problem 3.5',
                    difficulty: 'Hard',
                },
                {
                    id: '3-6',
                    title: 'Problem 3.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '4',
            title: 'Divide-and-Conquer',
            page: 98,
            problems: [
                {
                    id: '4-1',
                    title: 'Recurrence examples: solve recurrences with the master method.',
                },
                {
                    id: '4-2',
                    title: 'Parameter-passing costs in divide-and-conquer.',
                },
                {
                    id: '4-3',
                    title: 'More recurrence examples with various methods.',
                },
                {
                    id: '4-4',
                    title: 'Fibonacci numbers: recursion tree analysis.',
                },
                {
                    id: '4-5',
                    title: 'Chip testing: find a good chip using pairwise tests.',
                },
                {
                    id: '4-6',
                    title: 'Monge arrays: implement matrix operations on an array with the Monge property.',
                },
            ],
        },
        {
            num: '5',
            title: 'Probabilistic Analysis and Randomized Algorithms',
            page: 148,
            problems: [
                {
                    id: '5-1',
                    title: 'Probabilistic counting: count distinct elements with limited memory.',
                },
                {
                    id: '5-2',
                    title: 'Searching an unsorted array: analyze deterministic vs randomized search.',
                },
                {
                    id: '5-3',
                    title: 'Problem 5.3',
                    difficulty: 'Medium',
                },
                {
                    id: '5-4',
                    title: 'Problem 5.4',
                    difficulty: 'Medium',
                },
                {
                    id: '5-5',
                    title: 'Problem 5.5',
                    difficulty: 'Hard',
                },
                {
                    id: '5-6',
                    title: 'Problem 5.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '6',
            title: 'Heapsort',
            page: 183,
            problems: [
                {
                    id: '6-1',
                    title: 'Building a heap using insertion.',
                },
                {
                    id: '6-2',
                    title: 'Analysis of d-ary heaps.',
                },
                {
                    id: '6-3',
                    title: 'Young tableau: an m×n matrix with sorted rows and columns.',
                },
                {
                    id: '6-4',
                    title: 'Problem 6.4',
                    difficulty: 'Medium',
                },
                {
                    id: '6-5',
                    title: 'Problem 6.5',
                    difficulty: 'Hard',
                },
                {
                    id: '6-6',
                    title: 'Problem 6.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '7',
            title: 'Quicksort',
            page: 204,
            problems: [
                {
                    id: '7-1',
                    title: 'Hoare partition correctness.',
                },
                {
                    id: '7-2',
                    title: 'Quicksort with equal element values.',
                },
                {
                    id: '7-3',
                    title: 'Stooge sort: analyze this inefficient sorting algorithm.',
                },
                {
                    id: '7-4',
                    title: 'Stack depth for quicksort: tail recursion optimization.',
                },
                {
                    id: '7-5',
                    title: 'Median-of-3 partition: analysis of the improvement.',
                },
                {
                    id: '7-6',
                    title: 'Fuzzy sorting of intervals: sort overlapping intervals.',
                },
            ],
        },
        {
            num: '8',
            title: 'Sorting in Linear Time',
            page: 227,
            problems: [
                {
                    id: '8-1',
                    title: 'Lower bounds on comparison-based sorting: probabilistic lower bound.',
                },
                {
                    id: '8-2',
                    title: 'Sorting in place in linear time: counting sort with O(1) extra space.',
                },
                {
                    id: '8-3',
                    title: 'Sorting variable-length items: sort strings of different lengths in O(n) time.',
                },
                {
                    id: '8-4',
                    title: 'Water jugs: match red and blue jugs by capacity.',
                },
                {
                    id: '8-5',
                    title: 'Average sorting: sort by averages of k consecutive elements.',
                },
                {
                    id: '8-6',
                    title: 'Lower bound on merging sorted lists.',
                },
            ],
        },
        {
            num: '9',
            title: 'Medians and Order Statistics',
            page: 249,
            problems: [
                {
                    id: '9-1',
                    title: 'Largest i numbers in sorted order: find and sort the i largest numbers.',
                },
                {
                    id: '9-2',
                    title: 'Weighted median: compute the weighted median in O(n lg n) time.',
                },
                {
                    id: '9-3',
                    title: 'Small order statistics: find the kth smallest for small k in O(n) time.',
                },
                {
                    id: '9-4',
                    title: 'Alternative analysis of RANDOMIZED-SELECT using indicator variables.',
                },
                {
                    id: '9-5',
                    title: 'Problem 9.5',
                    difficulty: 'Hard',
                },
                {
                    id: '9-6',
                    title: 'Problem 9.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '10',
            title: 'Elementary Data Structures',
            page: 274,
            problems: [
                {
                    id: '10-1',
                    title: 'Comparisons among lists: sorted vs unsorted, singly vs doubly linked.',
                },
                {
                    id: '10-2',
                    title: 'Mergeable heaps using linked lists: implement mergeable heaps.',
                },
                {
                    id: '10-3',
                    title: 'Searching a sorted compact list: use binary search on an array with gaps.',
                },
                {
                    id: '10-4',
                    title: 'Problem 10.4',
                    difficulty: 'Medium',
                },
                {
                    id: '10-5',
                    title: 'Problem 10.5',
                    difficulty: 'Hard',
                },
                {
                    id: '10-6',
                    title: 'Problem 10.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '11',
            title: 'Hash Tables',
            page: 294,
            problems: [
                {
                    id: '11-1',
                    title: 'Longest-probe bound for hashing: longest probe sequence in open addressing.',
                },
                {
                    id: '11-2',
                    title: 'Slot-size bound for chaining: expected number of keys in a slot.',
                },
                {
                    id: '11-3',
                    title: 'Quadratic probing: show that (h(k)+c1i+c2i²) mod m covers all slots.',
                },
                {
                    id: '11-4',
                    title: 'Hashing and authentication: design a scheme resistant to adversarial keys.',
                },
                {
                    id: '11-5',
                    title: 'Problem 11.5',
                    difficulty: 'Hard',
                },
                {
                    id: '11-6',
                    title: 'Problem 11.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '12',
            title: 'Binary Search Trees',
            page: 334,
            problems: [
                {
                    id: '12-1',
                    title: 'Binary search trees with equal keys: handle duplicate keys efficiently.',
                },
                {
                    id: '12-2',
                    title: 'Radix trees: insert/search/delete strings in O(h) time.',
                },
                {
                    id: '12-3',
                    title: 'Average node depth in a randomly built BST.',
                },
                {
                    id: '12-4',
                    title: 'Number of different binary trees on n nodes (Catalan numbers).',
                },
                {
                    id: '12-5',
                    title: 'Problem 12.5',
                    difficulty: 'Hard',
                },
                {
                    id: '12-6',
                    title: 'Problem 12.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '13',
            title: 'Red-Black Trees',
            page: 353,
            problems: [
                {
                    id: '13-1',
                    title: 'Persistent dynamic sets: maintain all past versions of a BST.',
                },
                {
                    id: '13-2',
                    title: 'Join operation on red-black trees: merge two BSTs with all keys in one less than the other.',
                },
                {
                    id: '13-3',
                    title: 'AVL trees: compare height-balanced trees with red-black trees.',
                },
                {
                    id: '13-4',
                    title: 'Treaps: randomized search trees with BST and heap properties.',
                },
                {
                    id: '13-5',
                    title: 'Problem 13.5',
                    difficulty: 'Hard',
                },
                {
                    id: '13-6',
                    title: 'Problem 13.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '14',
            title: 'Dynamic Programming',
            page: 384,
            problems: [
                {
                    id: '14-1',
                    title: 'Longest simple path in a DAG: find the longest path in a DAG in O(V+E) time.',
                },
                {
                    id: '14-2',
                    title: 'Longest palindrome subsequence: find LPS in O(n²) time.',
                },
                {
                    id: '14-3',
                    title: 'Bitonic Euclidean traveling-salesman problem: find shortest bitonic TSP tour.',
                },
                {
                    id: '14-4',
                    title: 'Print neatly: word wrap with minimum cost.',
                },
                {
                    id: '14-5',
                    title: 'Edit distance: transform one string into another with insert/delete/replace.',
                },
                {
                    id: '14-6',
                    title: 'Maximum sum of nonadjacent elements: use O(n) DP without auxiliary storage.',
                },
            ],
        },
        {
            num: '15',
            title: 'Greedy Algorithms',
            page: 439,
            problems: [
                {
                    id: '15-1',
                    title: 'Coin changing: show greedy is optimal for US coins; find counterexample set.',
                },
                {
                    id: '15-2',
                    title: 'Scheduling to minimize average completion time: prove greedy is optimal.',
                },
                {
                    id: '15-3',
                    title: 'Huffman coding generalization: ternary Huffman codes.',
                },
                {
                    id: '15-4',
                    title: 'Minimum maximum spanning tree: find spanning tree that minimizes maximum edge weight.',
                },
                {
                    id: '15-5',
                    title: 'Scheduling with profits and deadlines: maximize profit using greedy or DP.',
                },
                {
                    id: '15-6',
                    title: 'Offline caching (paging): design LRU and LFD cache eviction policies.',
                },
            ],
        },
        {
            num: '16',
            title: 'Amortized Analysis',
            page: 470,
            problems: [
                {
                    id: '16-1',
                    title: 'Persistent dynamic sets: use potential method for persistent BSTs.',
                },
                {
                    id: '16-2',
                    title: 'Join operation on red-black trees: amortized analysis of RB-join.',
                },
                {
                    id: '16-3',
                    title: 'Amortized weight-balanced trees: analyze weight-balanced BST operations.',
                },
                {
                    id: '16-4',
                    title: 'Problem 16.4',
                    difficulty: 'Medium',
                },
                {
                    id: '16-5',
                    title: 'Problem 16.5',
                    difficulty: 'Hard',
                },
                {
                    id: '16-6',
                    title: 'Problem 16.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '17',
            title: 'Augmenting Data Structures',
            page: 502,
            problems: [
                {
                    id: '17-1',
                    title: 'Dynamic order statistics with binary search trees maintaining order-statistic fields.',
                },
                {
                    id: '17-2',
                    title: 'Minimum-gap: maintain the minimum difference between any two numbers in a set.',
                },
                {
                    id: '17-3',
                    title: 'Union of intervals: maintain a set of intervals supporting insert/delete/min-gap.',
                },
                {
                    id: '17-4',
                    title: 'Problem 17.4',
                    difficulty: 'Medium',
                },
                {
                    id: '17-5',
                    title: 'Problem 17.5',
                    difficulty: 'Hard',
                },
                {
                    id: '17-6',
                    title: 'Problem 17.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '18',
            title: 'B-Trees',
            page: 519,
            problems: [
                {
                    id: '18-1',
                    title: 'Stacks on secondary storage: implement stacks using B-tree pages.',
                },
                {
                    id: '18-2',
                    title: 'Joining and splitting B-trees: implement concat and split operations.',
                },
                {
                    id: '18-3',
                    title: 'Problem 18.3',
                    difficulty: 'Medium',
                },
                {
                    id: '18-4',
                    title: 'Problem 18.4',
                    difficulty: 'Medium',
                },
                {
                    id: '18-5',
                    title: 'Problem 18.5',
                    difficulty: 'Hard',
                },
                {
                    id: '18-6',
                    title: 'Problem 18.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '19',
            title: 'Data Structures for Disjoint Sets',
            page: 542,
            problems: [
                {
                    id: '19-1',
                    title: 'Offline minimum: find the min removed from each extraction using disjoint sets.',
                },
                {
                    id: '19-2',
                    title: 'Analysis of graph connectivity: use union-find offline.',
                },
                {
                    id: '19-3',
                    title: 'Tarjan\'s off-line least-common-ancestors algorithm.',
                },
                {
                    id: '19-4',
                    title: 'Problem 19.4',
                    difficulty: 'Medium',
                },
                {
                    id: '19-5',
                    title: 'Problem 19.5',
                    difficulty: 'Hard',
                },
                {
                    id: '19-6',
                    title: 'Problem 19.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '20',
            title: 'Elementary Graph Algorithms',
            page: 571,
            problems: [
                {
                    id: '20-1',
                    title: 'Longest simple path in a DAG: compute longest path using topological sort.',
                },
                {
                    id: '20-2',
                    title: 'Articulation points, bridges, biconnected components.',
                },
                {
                    id: '20-3',
                    title: 'Alternating paths and Euler trails: find Euler tour in a directed graph.',
                },
                {
                    id: '20-4',
                    title: 'Reachability in an undirected graph: O(V+E) algorithm using BFS/DFS.',
                },
                {
                    id: '20-5',
                    title: 'Problem 20.5',
                    difficulty: 'Hard',
                },
                {
                    id: '20-6',
                    title: 'Problem 20.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '21',
            title: 'Minimum Spanning Trees',
            page: 607,
            problems: [
                {
                    id: '21-1',
                    title: 'Unique MST: conditions for a unique minimum spanning tree.',
                },
                {
                    id: '21-2',
                    title: 'Minimum spanning tree with each edge weight constrained to 1 or 2.',
                },
                {
                    id: '21-3',
                    title: 'Second-best minimum spanning tree: find MST of second-minimum total weight.',
                },
                {
                    id: '21-4',
                    title: 'Problem 21.4',
                    difficulty: 'Medium',
                },
                {
                    id: '21-5',
                    title: 'Problem 21.5',
                    difficulty: 'Hard',
                },
                {
                    id: '21-6',
                    title: 'Problem 21.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '22',
            title: 'Single-Source Shortest Paths',
            page: 626,
            problems: [
                {
                    id: '22-1',
                    title: 'Parallel machine scheduling: formulate as difference constraints.',
                },
                {
                    id: '22-2',
                    title: 'Monotone shortest paths: shortest paths in which every path is monotonic in weight.',
                },
                {
                    id: '22-3',
                    title: 'Earliest meeting: compute the earliest meeting time in a DAG.',
                },
                {
                    id: '22-4',
                    title: 'Problem 22.4',
                    difficulty: 'Medium',
                },
                {
                    id: '22-5',
                    title: 'Problem 22.5',
                    difficulty: 'Hard',
                },
                {
                    id: '22-6',
                    title: 'Problem 22.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '23',
            title: 'All-Pairs Shortest Paths',
            page: 668,
            problems: [
                {
                    id: '23-1',
                    title: 'Transitive closure of a dynamic graph: maintain transitive closure under edge insertions.',
                },
                {
                    id: '23-2',
                    title: 'All-pairs shortest paths on a line: simple O(n²) algorithm for a line graph.',
                },
                {
                    id: '23-3',
                    title: 'All-pairs shortest paths with matrix multiplication: worst-case O(V³ lg V).',
                },
                {
                    id: '23-4',
                    title: 'Problem 23.4',
                    difficulty: 'Medium',
                },
                {
                    id: '23-5',
                    title: 'Problem 23.5',
                    difficulty: 'Hard',
                },
                {
                    id: '23-6',
                    title: 'Problem 23.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '24',
            title: 'Maximum Flow',
            page: 692,
            problems: [
                {
                    id: '24-1',
                    title: 'Ford-Fulkerson variations: analyze different augmenting-path choices.',
                },
                {
                    id: '24-2',
                    title: 'Escape problem: determine if there is a path for each unit to escape a grid.',
                },
                {
                    id: '24-3',
                    title: 'Maximum bipartite matching: show equivalence to max flow in unit-capacity networks.',
                },
                {
                    id: '24-4',
                    title: 'Problem 24.4',
                    difficulty: 'Medium',
                },
                {
                    id: '24-5',
                    title: 'Problem 24.5',
                    difficulty: 'Hard',
                },
                {
                    id: '24-6',
                    title: 'Problem 24.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '25',
            title: 'Matchings in Bipartite Graphs',
            page: 726,
            problems: [
                {
                    id: '25-1',
                    title: 'Edge-disjoint paths: find maximum number of edge-disjoint paths.',
                },
                {
                    id: '25-2',
                    title: 'Maximum bipartite matching via max flow: implement Hopcroft-Karp-like algorithm.',
                },
                {
                    id: '25-3',
                    title: 'Stable matching with ties and incomplete lists: Gale-Shapley variant.',
                },
                {
                    id: '25-4',
                    title: 'Problem 25.4',
                    difficulty: 'Medium',
                },
                {
                    id: '25-5',
                    title: 'Problem 25.5',
                    difficulty: 'Hard',
                },
                {
                    id: '25-6',
                    title: 'Problem 25.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '26',
            title: 'Parallel Algorithms',
            page: 770,
            problems: [
                {
                    id: '26-1',
                    title: 'Parallel matrix operations: analyze span and work of matrix addition/multiplication.',
                },
                {
                    id: '26-2',
                    title: 'Parallel merge sort: design a work-efficient parallel mergesort.',
                },
                {
                    id: '26-3',
                    title: 'Problem 26.3',
                    difficulty: 'Medium',
                },
                {
                    id: '26-4',
                    title: 'Problem 26.4',
                    difficulty: 'Medium',
                },
                {
                    id: '26-5',
                    title: 'Problem 26.5',
                    difficulty: 'Hard',
                },
                {
                    id: '26-6',
                    title: 'Problem 26.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '27',
            title: 'Online Algorithms',
            page: 813,
            problems: [
                {
                    id: '27-1',
                    title: 'Paging against a non-oblivious adversary: lower bound analysis.',
                },
                {
                    id: '27-2',
                    title: 'The k-server problem: analyze the work-function algorithm.',
                },
                {
                    id: '27-3',
                    title: 'Online minimum spanning tree: competitive ratio of greedy algorithm.',
                },
                {
                    id: '27-4',
                    title: 'Problem 27.4',
                    difficulty: 'Medium',
                },
                {
                    id: '27-5',
                    title: 'Problem 27.5',
                    difficulty: 'Hard',
                },
                {
                    id: '27-6',
                    title: 'Problem 27.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '28',
            title: 'Matrix Operations',
            page: 841,
            problems: [
                {
                    id: '28-1',
                    title: 'Triangular systems of equations: parallel algorithm for back-substitution.',
                },
                {
                    id: '28-2',
                    title: 'Inversion of band matrices: analyze Strassen-based inversion of band matrix.',
                },
                {
                    id: '28-3',
                    title: 'Problem 28.3',
                    difficulty: 'Medium',
                },
                {
                    id: '28-4',
                    title: 'Problem 28.4',
                    difficulty: 'Medium',
                },
                {
                    id: '28-5',
                    title: 'Problem 28.5',
                    difficulty: 'Hard',
                },
                {
                    id: '28-6',
                    title: 'Problem 28.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '29',
            title: 'Linear Programming',
            page: 872,
            problems: [
                {
                    id: '29-1',
                    title: 'Linear programming and maximum flow: formulate max flow as LP.',
                },
                {
                    id: '29-2',
                    title: 'Duality of minimum spanning tree and maximum spanning forest.',
                },
                {
                    id: '29-3',
                    title: 'The simplex algorithm: geometric interpretation and degenerate pivots.',
                },
                {
                    id: '29-4',
                    title: 'Problem 29.4',
                    difficulty: 'Medium',
                },
                {
                    id: '29-5',
                    title: 'Problem 29.5',
                    difficulty: 'Hard',
                },
                {
                    id: '29-6',
                    title: 'Problem 29.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '30',
            title: 'Polynomials and the FFT',
            page: 899,
            problems: [
                {
                    id: '30-1',
                    title: 'Divide-and-conquer multiplication of large integers: use FFT for O(n lg n).',
                },
                {
                    id: '30-2',
                    title: 'Toeplitz matrices: multiply a Toeplitz matrix by a vector using FFT.',
                },
                {
                    id: '30-3',
                    title: 'Problem 30.3',
                    difficulty: 'Medium',
                },
                {
                    id: '30-4',
                    title: 'Problem 30.4',
                    difficulty: 'Medium',
                },
                {
                    id: '30-5',
                    title: 'Problem 30.5',
                    difficulty: 'Hard',
                },
                {
                    id: '30-6',
                    title: 'Problem 30.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '31',
            title: 'Number-Theoretic Algorithms',
            page: 925,
            problems: [
                {
                    id: '31-1',
                    title: 'Binary gcd algorithm: analyze Stein\'s algorithm (binary GCD).',
                },
                {
                    id: '31-2',
                    title: 'Analysis of bit operations in the Euclidean algorithm.',
                },
                {
                    id: '31-3',
                    title: 'RSA attack: breaking RSA when d is small.',
                },
                {
                    id: '31-4',
                    title: 'Problem 31.4',
                    difficulty: 'Medium',
                },
                {
                    id: '31-5',
                    title: 'Problem 31.5',
                    difficulty: 'Hard',
                },
                {
                    id: '31-6',
                    title: 'Problem 31.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '32',
            title: 'String Matching',
            page: 979,
            problems: [
                {
                    id: '32-1',
                    title: 'String matching based on repetition factors: O(n) algorithm using border analysis.',
                },
                {
                    id: '32-2',
                    title: 'Suffix arrays: construct SA in O(n) and use for pattern matching.',
                },
                {
                    id: '32-3',
                    title: 'Problem 32.3',
                    difficulty: 'Medium',
                },
                {
                    id: '32-4',
                    title: 'Problem 32.4',
                    difficulty: 'Medium',
                },
                {
                    id: '32-5',
                    title: 'Problem 32.5',
                    difficulty: 'Hard',
                },
                {
                    id: '32-6',
                    title: 'Problem 32.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '33',
            title: 'Machine-Learning Algorithms',
            page: 1025,
            problems: [
                {
                    id: '33-1',
                    title: 'VC dimension of axis-aligned rectangles: compute VC dimension.',
                },
                {
                    id: '33-2',
                    title: 'Error bounds for bagging: analyze ensemble classification error.',
                },
                {
                    id: '33-3',
                    title: 'Problem 33.3',
                    difficulty: 'Medium',
                },
                {
                    id: '33-4',
                    title: 'Problem 33.4',
                    difficulty: 'Medium',
                },
                {
                    id: '33-5',
                    title: 'Problem 33.5',
                    difficulty: 'Hard',
                },
                {
                    id: '33-6',
                    title: 'Problem 33.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '34',
            title: 'NP-Completeness',
            page: 1064,
            problems: [
                {
                    id: '34-1',
                    title: 'Independent set: prove INDEPENDENT-SET is NP-complete.',
                },
                {
                    id: '34-2',
                    title: 'Vertex cover: prove VERTEX-COVER is NP-complete.',
                },
                {
                    id: '34-3',
                    title: 'Set packing: prove SET-PACKING is NP-complete.',
                },
                {
                    id: '34-4',
                    title: 'Subgraph isomorphism: prove SUBGRAPH-ISOMORPHISM is NP-complete.',
                },
                {
                    id: '34-5',
                    title: 'Longest simple cycle: prove LONGEST-CYCLE is NP-complete.',
                },
                {
                    id: '34-6',
                    title: 'Problem 34.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '35',
            title: 'Approximation Algorithms',
            page: 1126,
            problems: [
                {
                    id: '35-1',
                    title: 'Bin packing: analyze First-Fit and Best-Fit decreasing algorithms.',
                },
                {
                    id: '35-2',
                    title: 'Approximating the size of a maximum clique: semidefinite programming.',
                },
                {
                    id: '35-3',
                    title: 'Approximating MAX-CUT: analyze randomized and derandomized algorithms.',
                },
                {
                    id: '35-4',
                    title: 'Problem 35.4',
                    difficulty: 'Medium',
                },
                {
                    id: '35-5',
                    title: 'Problem 35.5',
                    difficulty: 'Hard',
                },
                {
                    id: '35-6',
                    title: 'Problem 35.6',
                    difficulty: 'Easy',
                },
            ],
        },
    ],
}

// ─── HD ──────────────────────────────────────────────────────────────
const hd: Book = {
    slug: 'hd',
    title: 'Hacker\'s Delight',
    shortTitle: 'Hacker\'s Delight',
    author: 'Henry S. Warren, Jr.',
    edition: '2nd',
    year: 2012,
    coverUrl: '/assets/books/cover-hd.jpg',
    color: '#6b21a8',
    accentColor: '#a855f7',
    description: 'A collection of bitwise tricks and optimizations for low-level programming. Covers bit manipulation, arithmetic bounds, integer division, Gray codes, CRC, error-correcting codes, and Hilbert curves.',
    totalProblems: 284,
    tags: [
          'Bit Manipulation',
          'Low-Level',
          'Arithmetic',
          'Performance',
          'Textbook'
        ],
    chapters: [
        {
            num: '1',
            title: 'Laying the Groundwork',
            page: 13,
            problems: [
                {
                    id: '1-1',
                    title: 'Express the for loop (e1; e2; e3) in terms of a while loop. Can it be expressed as a do loop?',
                },
                {
                    id: '1-2',
                    title: 'Code a loop in C where an unsigned int i takes all values from 0 to 0xFFFFFFFF on a 32-bit machine.',
                },
                {
                    id: '1-3',
                    title: 'The instructions of the basic and full RISCs can be executed with at most two register reads and one write. Show this.',
                },
                {
                    id: '1-4',
                    title: 'Problem 1.4',
                    difficulty: 'Medium',
                },
                {
                    id: '1-5',
                    title: 'Problem 1.5',
                    difficulty: 'Hard',
                },
                {
                    id: '1-6',
                    title: 'Problem 1.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '2',
            title: 'Basics',
            page: 23,
            problems: [
                {
                    id: '2-1',
                    title: 'For the snoob function, let n be the length of bit strings, k the number of 1-bits. On average, how many times is the while-loop body executed?',
                },
                {
                    id: '2-2',
                    title: 'The function x << (x & 1) is a left shift by a variable amount but is right-to-left computable. What is going on? Find another such function.',
                },
                {
                    id: '2-3',
                    title: 'Derive Dietz\'s formula for the average of two unsigned integers.',
                },
                {
                    id: '2-4',
                    title: 'Give an overflow-free method for computing the average of four unsigned integers, (a + b + c + d)/4.',
                },
                {
                    id: '2-5',
                    title: 'Simplify the seven-instruction expression for x ≤ y to three basic RISC instructions if y31 = 0.',
                },
                {
                    id: '2-6',
                    title: 'Show that if two numbers are added with end-around carry, the addition of the carry bit cannot generate another carry out of the high-order position.',
                },
                {
                    id: '2-7',
                    title: 'Show how end-around carry can be used for addition in one\'s-complement. What is the max propagation length?',
                },
                {
                    id: '2-8',
                    title: 'Show that (x & m) | (y & ~m) can be done in three instructions on the basic RISC.',
                },
                {
                    id: '2-9',
                    title: 'Show how to implement x ⊕ y in four instructions with and-or-not logic.',
                },
                {
                    id: '2-10',
                    title: 'Given a 32-bit word x and indices i, j, show code to copy the bit at position i to position j.',
                },
                {
                    id: '2-11',
                    title: 'How many binary Boolean instructions suffice to evaluate any n-variable Boolean function decomposed recursively?',
                },
                {
                    id: '2-12',
                    title: 'Show alternative decompositions of Boolean functions of three variables: (a) negative Davio, (b) z + h(x, y).',
                },
                {
                    id: '2-13',
                    title: 'Show how all 16 binary Boolean operations can be done with eight instruction types from Table 2-3.',
                },
                {
                    id: '2-14',
                    title: 'Can the ten non-constant binary Boolean functions be computed with fewer than eight opcodes?',
                },
                {
                    id: '2-15',
                    title: 'Show that six instruction types suffice for R-I (register-immediate) Boolean operations.',
                },
                {
                    id: '2-16',
                    title: 'Show that not all Boolean functions of three variables can be implemented with three binary logical instructions.',
                },
            ],
        },
        {
            num: '3',
            title: 'Power-of-2 Boundaries',
            page: 68,
            problems: [
                {
                    id: '3-1',
                    title: 'Round an unsigned integer to the nearest multiple of 8 with (a) rounding up, (b) down, (c) unbiased (make next bit zero).',
                },
                {
                    id: '3-2',
                    title: 'Round an unsigned integer to the nearest multiple of 10, with (a) rounding up, (b) down, (c) to even multiple of 10.',
                },
                {
                    id: '3-3',
                    title: 'Code an unaligned load in C: load 4 bytes from address a, branch-free, at most 2 loads, no read past aligned block.',
                },
                {
                    id: '3-4',
                    title: 'Problem 3.4',
                    difficulty: 'Medium',
                },
                {
                    id: '3-5',
                    title: 'Problem 3.5',
                    difficulty: 'Hard',
                },
                {
                    id: '3-6',
                    title: 'Problem 3.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '4',
            title: 'Arithmetic Bounds',
            page: 74,
            problems: [
                {
                    id: '4-1',
                    title: 'For unsigned integers, what are the bounds on x − y if ...?',
                },
                {
                    id: '4-2',
                    title: 'Simplify the maxOR function (Figure 4-4) when a = 0 or c = 0, on a machine with nlz instruction.',
                },
                {
                    id: '4-3',
                    title: 'Problem 4.3',
                    difficulty: 'Medium',
                },
                {
                    id: '4-4',
                    title: 'Problem 4.4',
                    difficulty: 'Medium',
                },
                {
                    id: '4-5',
                    title: 'Problem 4.5',
                    difficulty: 'Hard',
                },
                {
                    id: '4-6',
                    title: 'Problem 4.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '5',
            title: 'Counting Bits',
            page: 86,
            problems: [
                {
                    id: '5-1',
                    title: 'Code Dubé\'s algorithm for the ntz function, expanding the multiplication.',
                },
                {
                    id: '5-2',
                    title: 'Code the "right justify" function (x ≠ 0) in three basic RISC instructions.',
                },
                {
                    id: '5-3',
                    title: 'Are the parallel prefix and suffix (XOR) operations invertible? If so, how to compute the inverse?',
                },
                {
                    id: '5-4',
                    title: 'Problem 5.4',
                    difficulty: 'Medium',
                },
                {
                    id: '5-5',
                    title: 'Problem 5.5',
                    difficulty: 'Hard',
                },
                {
                    id: '5-6',
                    title: 'Problem 5.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '6',
            title: 'Searching Words',
            page: 118,
            problems: [
                {
                    id: '6-1',
                    title: 'Code an elaboration of Hsieh\'s algorithm for the longest string of 1\'s in a word x (use nlz).',
                },
                {
                    id: '6-2',
                    title: 'Code a function for the shortest string of 1\'s that is at least as long as a given n.',
                },
                {
                    id: '6-3',
                    title: 'Use the turning-off-rightmost-1s method to find the shortest string of 1\'s and its position.',
                },
                {
                    id: '6-4',
                    title: 'For random 32-bit words, what is the average number of strings of 1\'s in x?',
                },
                {
                    id: '6-5',
                    title: 'Again for random 32-bit words, what is the average length of the shortest contiguous string of 1\'s?',
                },
                {
                    id: '6-6',
                    title: 'Of the 2ⁿ binary words of length n, how many have shortest contained string of 1\'s of length 1?',
                },
                {
                    id: '6-7',
                    title: 'Similarly, how many n-bit words have shortest contained string of 1\'s of length 2?',
                },
            ],
        },
        {
            num: '7',
            title: 'Rearranging Bits and Bytes',
            page: 129,
            problems: [
                {
                    id: '7-1',
                    title: 'Explain the workings of the second Möbius formula (Equation 1, page 139).',
                },
                {
                    id: '7-2',
                    title: 'Find a formula for the general mask mk used in the perfect outer shuffle operation.',
                },
                {
                    id: '7-3',
                    title: 'Code a function similar to the compress function that does the expand operation.',
                },
                {
                    id: '7-4',
                    title: 'For an n-way set-associative cache, what is the theoretical min number of bits for LRU?',
                },
                {
                    id: '7-5',
                    title: 'Problem 7.5',
                    difficulty: 'Hard',
                },
                {
                    id: '7-6',
                    title: 'Problem 7.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '8',
            title: 'Multiplication',
            page: 166,
            problems: [
                {
                    id: '8-1',
                    title: 'Show that the low-order 32 bits of a 32×32→64 multiplication are the same for signed and unsigned operands.',
                },
                {
                    id: '8-2',
                    title: 'Modify the mulhs function to also calculate the low-order half of the 64-bit product.',
                },
                {
                    id: '8-3',
                    title: 'Complex multiplication (a+bi)(c+di) = ac−bd + (ad+bc)i can be done with only three multiplications. Show how.',
                },
                {
                    id: '8-4',
                    title: 'Problem 8.4',
                    difficulty: 'Medium',
                },
                {
                    id: '8-5',
                    title: 'Problem 8.5',
                    difficulty: 'Hard',
                },
                {
                    id: '8-6',
                    title: 'Problem 8.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '9',
            title: 'Integer Division',
            page: 174,
            problems: [
                {
                    id: '9-1',
                    title: 'Show that for real x, ⌈x⌉ = −⌊−x⌋.',
                },
                {
                    id: '9-2',
                    title: 'Find branch-free code for computing quotient and remainder of modulus division (truncating div available).',
                },
                {
                    id: '9-3',
                    title: 'Find branch-free code for computing quotient and remainder of floor division (truncating div available).',
                },
                {
                    id: '9-4',
                    title: 'How would you compute ⌊n / d⌋ for unsigned integers on a machine with unsigned divide?',
                },
                {
                    id: '9-5',
                    title: 'Prove: if f is continuous, monotonic, and integer-valued only at integer arguments, then ⌊f(⌊x⌋)⌋ = ⌊f(x)⌋.',
                },
                {
                    id: '9-6',
                    title: 'Problem 9.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '10',
            title: 'Integer Division By Constants',
            page: 194,
            problems: [
                {
                    id: '10-1',
                    title: 'Show how to avoid shrxi for unsigned division by an even number using two methods.',
                },
                {
                    id: '10-2',
                    title: 'Code a Python function similar to Figure 10-4 for computing the magic number for signed division.',
                },
                {
                    id: '10-3',
                    title: 'Use Newton\'s method to calculate the multiplicative inverse of d modulo 2⁸¹. Show for d = 146.',
                },
                {
                    id: '10-4',
                    title: 'Problem 10.4',
                    difficulty: 'Medium',
                },
                {
                    id: '10-5',
                    title: 'Problem 10.5',
                    difficulty: 'Hard',
                },
                {
                    id: '10-6',
                    title: 'Problem 10.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '11',
            title: 'Some Elementary Functions',
            page: 263,
            problems: [
                {
                    id: '11-1',
                    title: 'Is the integer fourth root of x equal to the integer square root of the integer square root of x?',
                },
                {
                    id: '11-2',
                    title: 'Code the 64-bit version of the cube root routine. Use the "long long" C data type.',
                },
                {
                    id: '11-3',
                    title: 'How many multiplications to compute x²³ modulo 2^W (W = word size)?',
                },
                {
                    id: '11-4',
                    title: 'Describe in simple terms the functions (a) 2^⌊ilog2(x)⌋ and (b) 2^⌈ilog2(x−1)⌉ + 1.',
                },
                {
                    id: '11-5',
                    title: 'Problem 11.5',
                    difficulty: 'Hard',
                },
                {
                    id: '11-6',
                    title: 'Problem 11.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '12',
            title: 'Unusual Bases for Number Systems',
            page: 281,
            problems: [
                {
                    id: '12-1',
                    title: 'Schroeppel\'s formula for base −2 to binary has a dual involving 0x5555555. Can you find it?',
                },
                {
                    id: '12-2',
                    title: 'Show how to add 1 to a base −2 number using arithmetic and logical operations.',
                },
                {
                    id: '12-3',
                    title: 'Show how to round a base −2 number down to a multiple of 16.',
                },
                {
                    id: '12-4',
                    title: 'Write a program to convert a base −1+i integer to the form a + bi.',
                },
                {
                    id: '12-5',
                    title: 'How to convert a number in base −1+i to its negative? Extract real/imaginary parts? Conjugate?',
                },
                {
                    id: '12-6',
                    title: 'Problem 12.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '13',
            title: 'Gray Code',
            page: 292,
            problems: [
                {
                    id: '13-1',
                    title: 'Show that if x is even, G(x) has an even number of 1-bits; if x is odd, G(x) has an odd number of 1-bits.',
                },
                {
                    id: '13-2',
                    title: '(a) Show that an STGC is necessarily balanced. (b) Find a balanced Gray code for n = 3.',
                },
                {
                    id: '13-3',
                    title: 'Devise a cyclic Gray code that encodes the integers 0 to 9.',
                },
                {
                    id: '13-4',
                    title: 'Given a number in prime decomposed form, list its divisors so each is derived from the previous by ×/÷ a prime.',
                },
                {
                    id: '13-5',
                    title: 'Problem 13.5',
                    difficulty: 'Hard',
                },
                {
                    id: '13-6',
                    title: 'Problem 13.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '14',
            title: 'Cyclic Redundancy Check',
            page: 299,
            problems: [
                {
                    id: '14-1',
                    title: 'Show that if a generator G has ≥2 terms, all single-bit errors are detected.',
                },
                {
                    id: '14-2',
                    title: 'Code the main CRC loop so message data is loaded one word at a time (assume aligned, full words).',
                },
                {
                    id: '14-3',
                    title: 'Problem 14.3',
                    difficulty: 'Medium',
                },
                {
                    id: '14-4',
                    title: 'Problem 14.4',
                    difficulty: 'Medium',
                },
                {
                    id: '14-5',
                    title: 'Problem 14.5',
                    difficulty: 'Hard',
                },
                {
                    id: '14-6',
                    title: 'Problem 14.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '15',
            title: 'Error-Correcting Codes',
            page: 309,
            problems: [
                {
                    id: '15-1',
                    title: 'Show a Hamming code for m = 3 (make a table similar to Table 15-1).',
                },
                {
                    id: '15-2',
                    title: 'For SEC without correcting check bits, the rule is 2^k ≥ m + 1. What is wrong with this reasoning?',
                },
                {
                    id: '15-3',
                    title: 'Given m, find the least k satisfying the Hamming inequality (brain teaser).',
                },
                {
                    id: '15-4',
                    title: 'Show that the Hamming distance function satisfies the triangle inequality.',
                },
                {
                    id: '15-5',
                    title: 'Prove: A(2n, 2d) ≥ A(n, d).',
                },
                {
                    id: '15-6',
                    title: 'Prove the Singleton bound: A(n, d) ≤ 2^(n−d+1).',
                },
                {
                    id: '15-7',
                    title: 'Show that the notion of a perfect code generalizes the Hamming rule.',
                },
                {
                    id: '15-8',
                    title: 'What is A(n, d) if n = d? Show that for odd n these codes are perfect.',
                },
                {
                    id: '15-9',
                    title: 'Show that if n is a multiple of 3 and d = 2n/3, then A(n, d) = 4.',
                },
                {
                    id: '15-10',
                    title: 'Show that if d > 2n/3, then A(n, d) = 2.',
                },
                {
                    id: '15-11',
                    title: 'A 2D parity check for 64 bits arranges them in an 8×8 array. Comment on SEC-DED capability.',
                },
            ],
        },
        {
            num: '16',
            title: 'Hilbert\'s Curve',
            page: 330,
            problems: [
                {
                    id: '16-1',
                    title: 'Investigate the locality of the interleaved-bits curve (perfect outer unshuffle). Sketch for n = 3.',
                },
                {
                    id: '16-2',
                    title: 'Apply Gray(s) before the interleaved-bits transformation. Sketch for n = 3. Is locality improved?',
                },
                {
                    id: '16-3',
                    title: 'How would you construct a three-dimensional analog of the interleaved-bits curve?',
                },
                {
                    id: '16-4',
                    title: 'Problem 16.4',
                    difficulty: 'Medium',
                },
                {
                    id: '16-5',
                    title: 'Problem 16.5',
                    difficulty: 'Hard',
                },
                {
                    id: '16-6',
                    title: 'Problem 16.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '17',
            title: 'Floating-Point',
            page: 348,
            problems: [
                {
                    id: '17-1',
                    title: 'What numbers have the same representation (apart from trailing 0\'s) in both single- and double-precision?',
                },
                {
                    id: '17-2',
                    title: 'Is there a program similar to the reciprocal sqrt routine for computing the approximate square root?',
                },
                {
                    id: '17-3',
                    title: 'Is there a similar program for the approximate cube root of a nonnegative normal number?',
                },
                {
                    id: '17-4',
                    title: 'Is there a similar program for the reciprocal sqrt of a double-precision float on a 64-bit machine?',
                },
                {
                    id: '17-5',
                    title: 'Problem 17.5',
                    difficulty: 'Hard',
                },
                {
                    id: '17-6',
                    title: 'Problem 17.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '18',
            title: 'Formulas For Primes',
            page: 363,
            problems: [
                {
                    id: '18-1',
                    title: 'Prove that for any non-constant integer polynomial f(x), |f(x)| is composite for infinitely many x.',
                },
                {
                    id: '18-2',
                    title: 'Prove Wilson\'s theorem: p > 1 is prime iff (p−1)! ≡ −1 (mod p).',
                },
                {
                    id: '18-3',
                    title: 'Show that if n > 4 is composite, then (n−1)! ≡ 0 (mod n).',
                },
                {
                    id: '18-4',
                    title: 'Estimate Mills\' constant θ and give an informal proof of Mills\' theorem.',
                },
                {
                    id: '18-5',
                    title: 'Show that 2 and 3 are prime in {a + b√−5}. Find a number with two distinct prime factorizations.',
                },
                {
                    id: '18-6',
                    title: 'Problem 18.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '19',
            title: 'Arithmetic',
            problems: [
                {
                    id: '19-1',
                    title: 'Problem 19.1',
                    difficulty: 'Easy',
                },
                {
                    id: '19-2',
                    title: 'Problem 19.2',
                    difficulty: 'Easy',
                },
                {
                    id: '19-3',
                    title: 'Problem 19.3',
                    difficulty: 'Medium',
                },
                {
                    id: '19-4',
                    title: 'Problem 19.4',
                    difficulty: 'Medium',
                },
                {
                    id: '19-5',
                    title: 'Problem 19.5',
                    difficulty: 'Hard',
                },
                {
                    id: '19-6',
                    title: 'Problem 19.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '20',
            title: 'Division',
            problems: [
                {
                    id: '20-1',
                    title: 'Problem 20.1',
                    difficulty: 'Easy',
                },
                {
                    id: '20-2',
                    title: 'Problem 20.2',
                    difficulty: 'Easy',
                },
                {
                    id: '20-3',
                    title: 'Problem 20.3',
                    difficulty: 'Medium',
                },
                {
                    id: '20-4',
                    title: 'Problem 20.4',
                    difficulty: 'Medium',
                },
                {
                    id: '20-5',
                    title: 'Problem 20.5',
                    difficulty: 'Hard',
                },
                {
                    id: '20-6',
                    title: 'Exercise 20.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '21',
            title: 'Double Precision',
            problems: [
                {
                    id: '21-1',
                    title: 'Problem 21.1',
                    difficulty: 'Easy',
                },
                {
                    id: '21-2',
                    title: 'Problem 21.2',
                    difficulty: 'Easy',
                },
                {
                    id: '21-3',
                    title: 'Problem 21.3',
                    difficulty: 'Medium',
                },
                {
                    id: '21-4',
                    title: 'Problem 21.4',
                    difficulty: 'Medium',
                },
                {
                    id: '21-5',
                    title: 'Problem 21.5',
                    difficulty: 'Hard',
                },
                {
                    id: '21-6',
                    title: 'Exercise 21.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '22',
            title: 'Arithmetic',
            problems: [
                {
                    id: '22-1',
                    title: 'Arithmetic Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '22-2',
                    title: 'Arithmetic Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '22-3',
                    title: 'Arithmetic Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '22-4',
                    title: 'Arithmetic Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '22-5',
                    title: 'Arithmetic Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '22-6',
                    title: 'Arithmetic Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '23',
            title: 'Division',
            problems: [
                {
                    id: '23-1',
                    title: 'Division Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '23-2',
                    title: 'Division Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '23-3',
                    title: 'Division Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '23-4',
                    title: 'Division Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '23-5',
                    title: 'Division Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '23-6',
                    title: 'Exercise 23.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '24',
            title: 'Double Precision',
            problems: [
                {
                    id: '24-1',
                    title: 'Double Precision Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '24-2',
                    title: 'Double Precision Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '24-3',
                    title: 'Double Precision Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '24-4',
                    title: 'Double Precision Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '24-5',
                    title: 'Double Precision Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '24-6',
                    title: 'Exercise 24.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '25',
            title: 'Arithmetic',
            problems: [
                {
                    id: '25-1',
                    title: 'Arithmetic Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '25-2',
                    title: 'Arithmetic Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '25-3',
                    title: 'Arithmetic Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '25-4',
                    title: 'Arithmetic Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '25-5',
                    title: 'Arithmetic Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '25-6',
                    title: 'Arithmetic Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '26',
            title: 'Division',
            problems: [
                {
                    id: '26-1',
                    title: 'Division Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '26-2',
                    title: 'Division Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '26-3',
                    title: 'Division Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '26-4',
                    title: 'Division Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '26-5',
                    title: 'Division Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '26-6',
                    title: 'Exercise 26.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '27',
            title: 'Double Precision',
            problems: [
                {
                    id: '27-1',
                    title: 'Double Precision Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '27-2',
                    title: 'Double Precision Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '27-3',
                    title: 'Double Precision Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '27-4',
                    title: 'Double Precision Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '27-5',
                    title: 'Double Precision Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '27-6',
                    title: 'Exercise 27.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '28',
            title: 'Arithmetic',
            problems: [
                {
                    id: '28-1',
                    title: 'Arithmetic Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '28-2',
                    title: 'Arithmetic Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '28-3',
                    title: 'Arithmetic Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '28-4',
                    title: 'Arithmetic Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '28-5',
                    title: 'Arithmetic Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '28-6',
                    title: 'Arithmetic Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '29',
            title: 'Division',
            problems: [
                {
                    id: '29-1',
                    title: 'Division Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '29-2',
                    title: 'Division Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '29-3',
                    title: 'Division Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '29-4',
                    title: 'Division Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '29-5',
                    title: 'Division Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '29-6',
                    title: 'Exercise 29.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '30',
            title: 'Double Precision',
            problems: [
                {
                    id: '30-1',
                    title: 'Double Precision Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '30-2',
                    title: 'Double Precision Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '30-3',
                    title: 'Double Precision Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '30-4',
                    title: 'Double Precision Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '30-5',
                    title: 'Double Precision Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '30-6',
                    title: 'Exercise 30.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '31',
            title: 'Arithmetic',
            problems: [
                {
                    id: '31-1',
                    title: 'Arithmetic Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '31-2',
                    title: 'Arithmetic Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '31-3',
                    title: 'Arithmetic Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '31-4',
                    title: 'Arithmetic Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '31-5',
                    title: 'Arithmetic Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '31-6',
                    title: 'Arithmetic Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '32',
            title: 'Division',
            problems: [
                {
                    id: '32-1',
                    title: 'Division Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '32-2',
                    title: 'Division Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '32-3',
                    title: 'Division Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '32-4',
                    title: 'Division Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '32-5',
                    title: 'Division Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '32-6',
                    title: 'Exercise 32.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '33',
            title: 'Double Precision',
            problems: [
                {
                    id: '33-1',
                    title: 'Double Precision Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '33-2',
                    title: 'Double Precision Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '33-3',
                    title: 'Double Precision Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '33-4',
                    title: 'Double Precision Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '33-5',
                    title: 'Double Precision Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '33-6',
                    title: 'Exercise 33.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '34',
            title: 'Arithmetic',
            problems: [
                {
                    id: '34-1',
                    title: 'Arithmetic Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '34-2',
                    title: 'Arithmetic Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '34-3',
                    title: 'Arithmetic Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '34-4',
                    title: 'Arithmetic Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '34-5',
                    title: 'Arithmetic Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '34-6',
                    title: 'Arithmetic Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '35',
            title: 'Division',
            problems: [
                {
                    id: '35-1',
                    title: 'Division Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '35-2',
                    title: 'Division Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '35-3',
                    title: 'Division Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '35-4',
                    title: 'Division Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '35-5',
                    title: 'Division Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '35-6',
                    title: 'Exercise 35.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '36',
            title: 'Double Precision',
            problems: [
                {
                    id: '36-1',
                    title: 'Double Precision Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '36-2',
                    title: 'Double Precision Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '36-3',
                    title: 'Double Precision Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '36-4',
                    title: 'Double Precision Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '36-5',
                    title: 'Double Precision Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '36-6',
                    title: 'Exercise 36.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '37',
            title: 'Arithmetic',
            problems: [
                {
                    id: '37-1',
                    title: 'Arithmetic Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '37-2',
                    title: 'Arithmetic Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '37-3',
                    title: 'Arithmetic Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '37-4',
                    title: 'Arithmetic Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '37-5',
                    title: 'Arithmetic Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '37-6',
                    title: 'Arithmetic Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '38',
            title: 'Division',
            problems: [
                {
                    id: '38-1',
                    title: 'Division Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '38-2',
                    title: 'Division Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '38-3',
                    title: 'Division Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '38-4',
                    title: 'Division Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '38-5',
                    title: 'Division Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '38-6',
                    title: 'Exercise 38.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '39',
            title: 'Double Precision',
            problems: [
                {
                    id: '39-1',
                    title: 'Double Precision Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '39-2',
                    title: 'Double Precision Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '39-3',
                    title: 'Double Precision Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '39-4',
                    title: 'Double Precision Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '39-5',
                    title: 'Double Precision Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '39-6',
                    title: 'Exercise 39.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '40',
            title: 'Arithmetic',
            problems: [
                {
                    id: '40-1',
                    title: 'Arithmetic Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '40-2',
                    title: 'Arithmetic Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '40-3',
                    title: 'Arithmetic Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '40-4',
                    title: 'Arithmetic Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '40-5',
                    title: 'Arithmetic Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '40-6',
                    title: 'Arithmetic Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '41',
            title: 'Division',
            problems: [
                {
                    id: '41-1',
                    title: 'Division Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '41-2',
                    title: 'Division Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '41-3',
                    title: 'Division Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '41-4',
                    title: 'Division Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '41-5',
                    title: 'Division Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '41-6',
                    title: 'Exercise 41.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '42',
            title: 'Double Precision',
            problems: [
                {
                    id: '42-1',
                    title: 'Double Precision Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '42-2',
                    title: 'Double Precision Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '42-3',
                    title: 'Double Precision Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '42-4',
                    title: 'Double Precision Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '42-5',
                    title: 'Double Precision Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '42-6',
                    title: 'Exercise 42.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '43',
            title: 'Arithmetic',
            summary: 'Arithmetic concepts and practice',
            problems: [
                {
                    id: '43-1',
                    title: 'Arithmetic Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '43-2',
                    title: 'Arithmetic Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '43-3',
                    title: 'Arithmetic Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '43-4',
                    title: 'Arithmetic Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '43-5',
                    title: 'Arithmetic Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '43-6',
                    title: 'Arithmetic Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '44',
            title: 'Division',
            summary: 'Division concepts and practice',
            problems: [
                {
                    id: '44-1',
                    title: 'Division Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '44-2',
                    title: 'Division Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '44-3',
                    title: 'Division Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '44-4',
                    title: 'Division Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '44-5',
                    title: 'Division Problem 5',
                    difficulty: 'Hard',
                },
            ],
        },
        {
            num: '45',
            title: 'Double Precision',
            summary: 'Double Precision concepts and practice',
            problems: [
                {
                    id: '45-1',
                    title: 'Double Precision Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '45-2',
                    title: 'Double Precision Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '45-3',
                    title: 'Double Precision Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '45-4',
                    title: 'Double Precision Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '45-5',
                    title: 'Double Precision Problem 5',
                    difficulty: 'Hard',
                },
            ],
        },
    ],
}

// ─── DSAMADEASY ──────────────────────────────────────────────────────────────
const dsamadeasy: Book = {
    slug: 'dsamadeasy',
    title: 'Data Structures and Algorithms Made Easy',
    shortTitle: 'DSA Made Easy',
    author: 'Narasimha Karumanchi',
    edition: '5th',
    year: 2016,
    coverUrl: '/assets/books/cover-dsamadeasy.jpg',
    color: '#0d9488',
    accentColor: '#14b8a6',
    description: 'A practical guide to data structures and algorithms with 700+ problems organized by topic. Great for interview preparation.',
    totalProblems: 239,
    tags: [
          'Interviews',
          'DSA',
          'Problems',
          'Practice'
        ],
    chapters: [
        {
            num: '1',
            title: 'Recursion and Backtracking',
            page: 57,
            problems: [
                {
                    id: '1.1',
                    title: 'Tower of Hanoi',
                    difficulty: 'Easy',
                    tags: [
                                          'Recursion'
                                        ],
                },
                {
                    id: '1.2',
                    title: 'Generate all strings of n bits',
                    difficulty: 'Easy',
                    tags: [
                                          'Backtracking'
                                        ],
                },
                {
                    id: '1.3',
                    title: 'Generate all subsets of a set',
                    difficulty: 'Medium',
                    tags: [
                                          'Backtracking'
                                        ],
                },
                {
                    id: '1.4',
                    title: 'Generate all permutations of a string',
                    difficulty: 'Medium',
                    tags: [
                                          'Backtracking'
                                        ],
                },
                {
                    id: '1.5',
                    title: 'Solve Sudoku',
                    difficulty: 'Hard',
                    tags: [
                                          'Backtracking'
                                        ],
                },
                {
                    id: '1-6',
                    title: 'Exercise 1.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '2',
            title: 'Linked Lists',
            page: 85,
            problems: [
                {
                    id: '2.1',
                    title: 'Reverse a linked list',
                    difficulty: 'Easy',
                    tags: [
                                          'LinkedList'
                                        ],
                },
                {
                    id: '2.2',
                    title: 'Find middle of linked list',
                    difficulty: 'Easy',
                    tags: [
                                          'LinkedList',
                                          'TwoPointers'
                                        ],
                },
                {
                    id: '2.3',
                    title: 'Detect cycle in linked list',
                    difficulty: 'Easy',
                    tags: [
                                          'LinkedList',
                                          'TwoPointers'
                                        ],
                },
                {
                    id: '2.4',
                    title: 'Remove duplicates from sorted list',
                    difficulty: 'Easy',
                    tags: [
                                          'LinkedList'
                                        ],
                },
                {
                    id: '2.5',
                    title: 'Add two numbers represented as lists',
                    difficulty: 'Medium',
                    tags: [
                                          'LinkedList'
                                        ],
                },
                {
                    id: '2.6',
                    title: 'Merge K sorted linked lists',
                    difficulty: 'Hard',
                    tags: [
                                          'LinkedList',
                                          'Heap'
                                        ],
                },
            ],
        },
        {
            num: '3',
            title: 'Stacks and Queues',
            page: 112,
            problems: [
                {
                    id: '3.1',
                    title: 'Implement stack using queues',
                    difficulty: 'Easy',
                    tags: [
                                          'Stack',
                                          'Queue'
                                        ],
                },
                {
                    id: '3.2',
                    title: 'Next greater element',
                    difficulty: 'Easy',
                    tags: [
                                          'Stack',
                                          'MonotonicStack'
                                        ],
                },
                {
                    id: '3.3',
                    title: 'Largest rectangle in histogram',
                    difficulty: 'Hard',
                    tags: [
                                          'Stack',
                                          'MonotonicStack'
                                        ],
                },
                {
                    id: '3.4',
                    title: 'Sliding window maximum',
                    difficulty: 'Hard',
                    tags: [
                                          'Queue',
                                          'SlidingWindow'
                                        ],
                },
                {
                    id: '3-5',
                    title: 'Exercise 3.5',
                    difficulty: 'Hard',
                },
                {
                    id: '3-6',
                    title: 'Exercise 3.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '4',
            title: 'Trees',
            page: 140,
            problems: [
                {
                    id: '4.1',
                    title: 'Binary tree inorder traversal',
                    difficulty: 'Easy',
                    tags: [
                                          'Tree'
                                        ],
                },
                {
                    id: '4.2',
                    title: 'Find max depth of binary tree',
                    difficulty: 'Easy',
                    tags: [
                                          'Tree'
                                        ],
                },
                {
                    id: '4.3',
                    title: 'Check if binary tree is BST',
                    difficulty: 'Medium',
                    tags: [
                                          'Tree',
                                          'BST'
                                        ],
                },
                {
                    id: '4.4',
                    title: 'Level order traversal',
                    difficulty: 'Easy',
                    tags: [
                                          'Tree',
                                          'BFS'
                                        ],
                },
                {
                    id: '4.5',
                    title: 'Lowest common ancestor',
                    difficulty: 'Medium',
                    tags: [
                                          'Tree'
                                        ],
                },
                {
                    id: '4.6',
                    title: 'Serialize and deserialize binary tree',
                    difficulty: 'Hard',
                    tags: [
                                          'Tree'
                                        ],
                },
            ],
        },
        {
            num: '5',
            title: 'Priority Queues and Heaps',
            page: 172,
            problems: [
                {
                    id: '5.1',
                    title: 'Kth largest element in array',
                    difficulty: 'Medium',
                    tags: [
                                          'Heap'
                                        ],
                },
                {
                    id: '5.2',
                    title: 'Merge K sorted arrays',
                    difficulty: 'Hard',
                    tags: [
                                          'Heap'
                                        ],
                },
                {
                    id: '5.3',
                    title: 'Find median from data stream',
                    difficulty: 'Hard',
                    tags: [
                                          'Heap',
                                          'TwoHeaps'
                                        ],
                },
                {
                    id: '5-4',
                    title: 'Exercise 5.4',
                    difficulty: 'Medium',
                },
                {
                    id: '5-5',
                    title: 'Exercise 5.5',
                    difficulty: 'Hard',
                },
                {
                    id: '5-6',
                    title: 'Exercise 5.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '6',
            title: 'Graph Algorithms',
            page: 200,
            problems: [
                {
                    id: '6.1',
                    title: 'Clone a graph',
                    difficulty: 'Medium',
                    tags: [
                                          'Graph',
                                          'BFS'
                                        ],
                },
                {
                    id: '6.2',
                    title: 'Course schedule (topological sort)',
                    difficulty: 'Medium',
                    tags: [
                                          'Graph',
                                          'TopSort'
                                        ],
                },
                {
                    id: '6.3',
                    title: 'Number of islands',
                    difficulty: 'Medium',
                    tags: [
                                          'Graph',
                                          'DFS',
                                          'Grid'
                                        ],
                },
                {
                    id: '6.4',
                    title: 'Word ladder',
                    difficulty: 'Hard',
                    tags: [
                                          'Graph',
                                          'BFS'
                                        ],
                },
                {
                    id: '6-5',
                    title: 'Exercise 6.5',
                    difficulty: 'Hard',
                },
                {
                    id: '6-6',
                    title: 'Exercise 6.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '7',
            title: 'Sorting and Searching',
            page: 235,
            problems: [
                {
                    id: '7.1',
                    title: 'Quick sort implementation',
                    difficulty: 'Medium',
                    tags: [
                                          'Sorting'
                                        ],
                },
                {
                    id: '7.2',
                    title: 'Merge sort implementation',
                    difficulty: 'Medium',
                    tags: [
                                          'Sorting'
                                        ],
                },
                {
                    id: '7.3',
                    title: 'Search in rotated sorted array',
                    difficulty: 'Medium',
                    tags: [
                                          'BinarySearch'
                                        ],
                },
                {
                    id: '7.4',
                    title: 'Find peak element',
                    difficulty: 'Medium',
                    tags: [
                                          'BinarySearch'
                                        ],
                },
                {
                    id: '7.5',
                    title: 'Kth smallest element in sorted matrix',
                    difficulty: 'Hard',
                    tags: [
                                          'BinarySearch',
                                          'Heap'
                                        ],
                },
                {
                    id: '7-6',
                    title: 'Exercise 7.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '8',
            title: 'Dynamic Programming',
            page: 270,
            problems: [
                {
                    id: '8.1',
                    title: 'Longest common subsequence',
                    difficulty: 'Medium',
                    tags: [
                                          'DP'
                                        ],
                },
                {
                    id: '8.2',
                    title: '0/1 Knapsack problem',
                    difficulty: 'Medium',
                    tags: [
                                          'DP',
                                          'Knapsack'
                                        ],
                },
                {
                    id: '8.3',
                    title: 'Edit distance',
                    difficulty: 'Medium',
                    tags: [
                                          'DP',
                                          'Strings'
                                        ],
                },
                {
                    id: '8.4',
                    title: 'Longest increasing subsequence',
                    difficulty: 'Medium',
                    tags: [
                                          'DP'
                                        ],
                },
                {
                    id: '8.5',
                    title: 'Coin change problem',
                    difficulty: 'Medium',
                    tags: [
                                          'DP'
                                        ],
                },
                {
                    id: '8-6',
                    title: 'Exercise 8.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '9',
            title: 'Hashing',
            problems: [
                {
                    id: '9-1',
                    title: 'Hashing Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '9-2',
                    title: 'Hashing Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '9-3',
                    title: 'Hashing Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '9-4',
                    title: 'Hashing Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '9-5',
                    title: 'Hashing Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '9-6',
                    title: 'Hashing Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '10',
            title: 'String Algorithms',
            problems: [
                {
                    id: '10-1',
                    title: 'String Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '10-2',
                    title: 'String Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '10-3',
                    title: 'String Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '10-4',
                    title: 'String Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '10-5',
                    title: 'String Algorithms Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '10-6',
                    title: 'String Algorithms Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '11',
            title: 'Divide and Conquer',
            problems: [
                {
                    id: '11-1',
                    title: 'Divide and Conquer Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '11-2',
                    title: 'Divide and Conquer Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '11-3',
                    title: 'Divide and Conquer Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '11-4',
                    title: 'Divide and Conquer Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '11-5',
                    title: 'Divide and Conquer Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '11-6',
                    title: 'Exercise 11.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '12',
            title: 'Greedy Algorithms',
            problems: [
                {
                    id: '12-1',
                    title: 'Greedy Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '12-2',
                    title: 'Greedy Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '12-3',
                    title: 'Greedy Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '12-4',
                    title: 'Greedy Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '12-5',
                    title: 'Greedy Algorithms Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '12-6',
                    title: 'Greedy Algorithms Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '13',
            title: 'Hashing',
            problems: [
                {
                    id: '13-1',
                    title: 'Hashing Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '13-2',
                    title: 'Hashing Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '13-3',
                    title: 'Hashing Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '13-4',
                    title: 'Hashing Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '13-5',
                    title: 'Hashing Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '13-6',
                    title: 'Hashing Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '14',
            title: 'String Algorithms',
            problems: [
                {
                    id: '14-1',
                    title: 'String Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '14-2',
                    title: 'String Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '14-3',
                    title: 'String Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '14-4',
                    title: 'String Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '14-5',
                    title: 'String Algorithms Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '14-6',
                    title: 'String Algorithms Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '15',
            title: 'Divide and Conquer',
            problems: [
                {
                    id: '15-1',
                    title: 'Divide and Conquer Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '15-2',
                    title: 'Divide and Conquer Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '15-3',
                    title: 'Divide and Conquer Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '15-4',
                    title: 'Divide and Conquer Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '15-5',
                    title: 'Divide and Conquer Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '15-6',
                    title: 'Exercise 15.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '16',
            title: 'Greedy Algorithms',
            problems: [
                {
                    id: '16-1',
                    title: 'Greedy Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '16-2',
                    title: 'Greedy Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '16-3',
                    title: 'Greedy Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '16-4',
                    title: 'Greedy Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '16-5',
                    title: 'Greedy Algorithms Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '16-6',
                    title: 'Greedy Algorithms Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '17',
            title: 'Hashing',
            problems: [
                {
                    id: '17-1',
                    title: 'Hashing Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '17-2',
                    title: 'Hashing Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '17-3',
                    title: 'Hashing Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '17-4',
                    title: 'Hashing Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '17-5',
                    title: 'Hashing Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '17-6',
                    title: 'Hashing Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '18',
            title: 'String Algorithms',
            problems: [
                {
                    id: '18-1',
                    title: 'String Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '18-2',
                    title: 'String Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '18-3',
                    title: 'String Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '18-4',
                    title: 'String Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '18-5',
                    title: 'String Algorithms Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '18-6',
                    title: 'String Algorithms Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '19',
            title: 'Divide and Conquer',
            problems: [
                {
                    id: '19-1',
                    title: 'Divide and Conquer Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '19-2',
                    title: 'Divide and Conquer Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '19-3',
                    title: 'Divide and Conquer Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '19-4',
                    title: 'Divide and Conquer Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '19-5',
                    title: 'Divide and Conquer Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '19-6',
                    title: 'Exercise 19.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '20',
            title: 'Greedy Algorithms',
            problems: [
                {
                    id: '20-1',
                    title: 'Greedy Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '20-2',
                    title: 'Greedy Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '20-3',
                    title: 'Greedy Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '20-4',
                    title: 'Greedy Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '20-5',
                    title: 'Greedy Algorithms Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '20-6',
                    title: 'Greedy Algorithms Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '21',
            title: 'Hashing',
            problems: [
                {
                    id: '21-1',
                    title: 'Hashing Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '21-2',
                    title: 'Hashing Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '21-3',
                    title: 'Hashing Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '21-4',
                    title: 'Hashing Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '21-5',
                    title: 'Hashing Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '21-6',
                    title: 'Hashing Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '22',
            title: 'String Algorithms',
            problems: [
                {
                    id: '22-1',
                    title: 'String Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '22-2',
                    title: 'String Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '22-3',
                    title: 'String Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '22-4',
                    title: 'String Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '22-5',
                    title: 'String Algorithms Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '22-6',
                    title: 'String Algorithms Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '23',
            title: 'Divide and Conquer',
            problems: [
                {
                    id: '23-1',
                    title: 'Divide and Conquer Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '23-2',
                    title: 'Divide and Conquer Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '23-3',
                    title: 'Divide and Conquer Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '23-4',
                    title: 'Divide and Conquer Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '23-5',
                    title: 'Divide and Conquer Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '23-6',
                    title: 'Exercise 23.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '24',
            title: 'Greedy Algorithms',
            problems: [
                {
                    id: '24-1',
                    title: 'Greedy Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '24-2',
                    title: 'Greedy Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '24-3',
                    title: 'Greedy Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '24-4',
                    title: 'Greedy Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '24-5',
                    title: 'Greedy Algorithms Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '24-6',
                    title: 'Greedy Algorithms Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '25',
            title: 'Hashing',
            problems: [
                {
                    id: '25-1',
                    title: 'Hashing Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '25-2',
                    title: 'Hashing Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '25-3',
                    title: 'Hashing Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '25-4',
                    title: 'Hashing Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '25-5',
                    title: 'Hashing Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '25-6',
                    title: 'Hashing Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '26',
            title: 'String Algorithms',
            problems: [
                {
                    id: '26-1',
                    title: 'String Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '26-2',
                    title: 'String Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '26-3',
                    title: 'String Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '26-4',
                    title: 'String Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '26-5',
                    title: 'String Algorithms Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '26-6',
                    title: 'String Algorithms Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '27',
            title: 'Divide and Conquer',
            problems: [
                {
                    id: '27-1',
                    title: 'Divide and Conquer Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '27-2',
                    title: 'Divide and Conquer Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '27-3',
                    title: 'Divide and Conquer Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '27-4',
                    title: 'Divide and Conquer Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '27-5',
                    title: 'Divide and Conquer Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '27-6',
                    title: 'Exercise 27.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '28',
            title: 'Greedy Algorithms',
            problems: [
                {
                    id: '28-1',
                    title: 'Greedy Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '28-2',
                    title: 'Greedy Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '28-3',
                    title: 'Greedy Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '28-4',
                    title: 'Greedy Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '28-5',
                    title: 'Greedy Algorithms Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '28-6',
                    title: 'Greedy Algorithms Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '29',
            title: 'Hashing',
            problems: [
                {
                    id: '29-1',
                    title: 'Hashing Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '29-2',
                    title: 'Hashing Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '29-3',
                    title: 'Hashing Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '29-4',
                    title: 'Hashing Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '29-5',
                    title: 'Hashing Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '29-6',
                    title: 'Hashing Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '30',
            title: 'String Algorithms',
            problems: [
                {
                    id: '30-1',
                    title: 'String Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '30-2',
                    title: 'String Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '30-3',
                    title: 'String Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '30-4',
                    title: 'String Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '30-5',
                    title: 'String Algorithms Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '30-6',
                    title: 'String Algorithms Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '31',
            title: 'Divide and Conquer',
            problems: [
                {
                    id: '31-1',
                    title: 'Divide and Conquer Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '31-2',
                    title: 'Divide and Conquer Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '31-3',
                    title: 'Divide and Conquer Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '31-4',
                    title: 'Divide and Conquer Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '31-5',
                    title: 'Divide and Conquer Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '31-6',
                    title: 'Exercise 31.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '32',
            title: 'Greedy Algorithms',
            problems: [
                {
                    id: '32-1',
                    title: 'Greedy Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '32-2',
                    title: 'Greedy Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '32-3',
                    title: 'Greedy Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '32-4',
                    title: 'Greedy Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '32-5',
                    title: 'Greedy Algorithms Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '32-6',
                    title: 'Greedy Algorithms Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '33',
            title: 'Hashing',
            problems: [
                {
                    id: '33-1',
                    title: 'Hashing Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '33-2',
                    title: 'Hashing Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '33-3',
                    title: 'Hashing Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '33-4',
                    title: 'Hashing Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '33-5',
                    title: 'Hashing Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '33-6',
                    title: 'Hashing Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '34',
            title: 'String Algorithms',
            problems: [
                {
                    id: '34-1',
                    title: 'String Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '34-2',
                    title: 'String Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '34-3',
                    title: 'String Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '34-4',
                    title: 'String Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '34-5',
                    title: 'String Algorithms Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '34-6',
                    title: 'String Algorithms Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '35',
            title: 'Divide and Conquer',
            problems: [
                {
                    id: '35-1',
                    title: 'Divide and Conquer Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '35-2',
                    title: 'Divide and Conquer Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '35-3',
                    title: 'Divide and Conquer Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '35-4',
                    title: 'Divide and Conquer Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '35-5',
                    title: 'Divide and Conquer Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '35-6',
                    title: 'Exercise 35.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '36',
            title: 'Greedy Algorithms',
            problems: [
                {
                    id: '36-1',
                    title: 'Greedy Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '36-2',
                    title: 'Greedy Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '36-3',
                    title: 'Greedy Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '36-4',
                    title: 'Greedy Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '36-5',
                    title: 'Greedy Algorithms Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '36-6',
                    title: 'Greedy Algorithms Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '37',
            title: 'Hashing',
            summary: 'Hashing concepts and practice',
            problems: [
                {
                    id: '37-1',
                    title: 'Hashing Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '37-2',
                    title: 'Hashing Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '37-3',
                    title: 'Hashing Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '37-4',
                    title: 'Hashing Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '37-5',
                    title: 'Hashing Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '37-6',
                    title: 'Hashing Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '38',
            title: 'String Algorithms',
            summary: 'String Algorithms concepts and practice',
            problems: [
                {
                    id: '38-1',
                    title: 'String Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '38-2',
                    title: 'String Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '38-3',
                    title: 'String Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '38-4',
                    title: 'String Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '38-5',
                    title: 'String Algorithms Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '38-6',
                    title: 'String Algorithms Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '39',
            title: 'Divide and Conquer',
            summary: 'Divide and Conquer concepts and practice',
            problems: [
                {
                    id: '39-1',
                    title: 'Divide and Conquer Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '39-2',
                    title: 'Divide and Conquer Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '39-3',
                    title: 'Divide and Conquer Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '39-4',
                    title: 'Divide and Conquer Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '39-5',
                    title: 'Divide and Conquer Problem 5',
                    difficulty: 'Hard',
                },
            ],
        },
        {
            num: '40',
            title: 'Greedy Algorithms',
            summary: 'Greedy Algorithms concepts and practice',
            problems: [
                {
                    id: '40-1',
                    title: 'Greedy Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '40-2',
                    title: 'Greedy Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '40-3',
                    title: 'Greedy Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '40-4',
                    title: 'Greedy Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '40-5',
                    title: 'Greedy Algorithms Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '40-6',
                    title: 'Greedy Algorithms Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
    ],
}

// ─── GROKKING ──────────────────────────────────────────────────────────────
const grokking: Book = {
    slug: 'grokking',
    title: 'Grokking Algorithms',
    shortTitle: 'Grokking',
    author: 'Aditya Bhargava',
    edition: '1st',
    year: 2016,
    coverUrl: '/assets/books/cover-grokking.jpg',
    color: '#059669',
    accentColor: '#34d399',
    description: 'A friendly, illustrated guide to algorithms that makes complex topics approachable with visual examples.',
    totalProblems: 250,
    tags: [
          'Algorithms',
          'Beginners',
          'Illustrated',
          'Visual'
        ],
    chapters: [
        {
            num: '1',
            title: 'Introduction to Algorithms',
            page: 1,
            problems: [
                {
                    id: '1.1',
                    title: 'Implement binary search',
                    difficulty: 'Easy',
                    tags: [
                                          'BinarySearch'
                                        ],
                },
                {
                    id: '1.2',
                    title: 'Determine running time of various operations on arrays',
                    difficulty: 'Easy',
                    tags: [
                                          'BigO'
                                        ],
                },
                {
                    id: '1-3',
                    title: 'Exercise 1.3',
                    difficulty: 'Medium',
                },
                {
                    id: '1-4',
                    title: 'Exercise 1.4',
                    difficulty: 'Medium',
                },
                {
                    id: '1-5',
                    title: 'Exercise 1.5',
                    difficulty: 'Hard',
                },
                {
                    id: '1-6',
                    title: 'Exercise 1.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '2',
            title: 'Selection Sort',
            page: 25,
            problems: [
                {
                    id: '2.1',
                    title: 'Implement selection sort',
                    difficulty: 'Easy',
                    tags: [
                                          'Sorting'
                                        ],
                },
                {
                    id: '2.2',
                    title: 'Compare array and linked list insertion performance',
                    difficulty: 'Easy',
                    tags: [
                                          'LinkedList'
                                        ],
                },
                {
                    id: '2-3',
                    title: 'Exercise 2.3',
                    difficulty: 'Medium',
                },
                {
                    id: '2-4',
                    title: 'Exercise 2.4',
                    difficulty: 'Medium',
                },
                {
                    id: '2-5',
                    title: 'Exercise 2.5',
                    difficulty: 'Hard',
                },
                {
                    id: '2-6',
                    title: 'Exercise 2.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '3',
            title: 'Recursion',
            page: 37,
            problems: [
                {
                    id: '3.1',
                    title: 'Write factorial recursively and iteratively',
                    difficulty: 'Easy',
                    tags: [
                                          'Recursion'
                                        ],
                },
                {
                    id: '3.2',
                    title: 'Find sum of array using D&C',
                    difficulty: 'Easy',
                    tags: [
                                          'Recursion',
                                          'D&C'
                                        ],
                },
                {
                    id: '3.3',
                    title: 'Count items in list using D&C',
                    difficulty: 'Easy',
                    tags: [
                                          'Recursion'
                                        ],
                },
                {
                    id: '3-4',
                    title: 'Exercise 3.4',
                    difficulty: 'Medium',
                },
                {
                    id: '3-5',
                    title: 'Exercise 3.5',
                    difficulty: 'Hard',
                },
                {
                    id: '3-6',
                    title: 'Exercise 3.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '4',
            title: 'Quicksort',
            page: 51,
            problems: [
                {
                    id: '4.1',
                    title: 'Implement quicksort',
                    difficulty: 'Medium',
                    tags: [
                                          'Sorting'
                                        ],
                },
                {
                    id: '4.2',
                    title: 'Find max element using D&C',
                    difficulty: 'Easy',
                    tags: [
                                          'D&C'
                                        ],
                },
                {
                    id: '4-3',
                    title: 'Exercise 4.3',
                    difficulty: 'Medium',
                },
                {
                    id: '4-4',
                    title: 'Exercise 4.4',
                    difficulty: 'Medium',
                },
                {
                    id: '4-5',
                    title: 'Exercise 4.5',
                    difficulty: 'Hard',
                },
                {
                    id: '4-6',
                    title: 'Exercise 4.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '5',
            title: 'Hash Tables',
            page: 67,
            problems: [
                {
                    id: '5.1',
                    title: 'Implement a hash table from scratch',
                    difficulty: 'Medium',
                    tags: [
                                          'HashTable'
                                        ],
                },
                {
                    id: '5.2',
                    title: 'Price of groceries (dict operations)',
                    difficulty: 'Easy',
                    tags: [
                                          'HashTable'
                                        ],
                },
                {
                    id: '5.3',
                    title: 'Vote checker using hash set',
                    difficulty: 'Easy',
                    tags: [
                                          'HashTable'
                                        ],
                },
                {
                    id: '5-4',
                    title: 'Exercise 5.4',
                    difficulty: 'Medium',
                },
                {
                    id: '5-5',
                    title: 'Exercise 5.5',
                    difficulty: 'Hard',
                },
                {
                    id: '5-6',
                    title: 'Exercise 5.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '6',
            title: 'Breadth-First Search',
            page: 87,
            problems: [
                {
                    id: '6.1',
                    title: 'Find shortest path in unweighted graph',
                    difficulty: 'Medium',
                    tags: [
                                          'Graph',
                                          'BFS'
                                        ],
                },
                {
                    id: '6.2',
                    title: 'Implement BFS on a social network graph',
                    difficulty: 'Medium',
                    tags: [
                                          'Graph',
                                          'BFS'
                                        ],
                },
                {
                    id: '6-3',
                    title: 'Exercise 6.3',
                    difficulty: 'Medium',
                },
                {
                    id: '6-4',
                    title: 'Exercise 6.4',
                    difficulty: 'Medium',
                },
                {
                    id: '6-5',
                    title: 'Exercise 6.5',
                    difficulty: 'Hard',
                },
                {
                    id: '6-6',
                    title: 'Exercise 6.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '7',
            title: 'Dijkstra\'s Algorithm',
            page: 105,
            problems: [
                {
                    id: '7.1',
                    title: 'Implement Dijkstra\'s algorithm',
                    difficulty: 'Medium',
                    tags: [
                                          'Graph',
                                          'Dijkstra'
                                        ],
                },
                {
                    id: '7.2',
                    title: 'Find shortest path with weighted edges',
                    difficulty: 'Medium',
                    tags: [
                                          'Graph',
                                          'Dijkstra'
                                        ],
                },
                {
                    id: '7.3',
                    title: 'Why does Dijkstra fail with negative edges?',
                    difficulty: 'Medium',
                    tags: [
                                          'Graph',
                                          'BellmanFord'
                                        ],
                },
                {
                    id: '7-4',
                    title: 'Exercise 7.4',
                    difficulty: 'Medium',
                },
                {
                    id: '7-5',
                    title: 'Exercise 7.5',
                    difficulty: 'Hard',
                },
                {
                    id: '7-6',
                    title: 'Exercise 7.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '8',
            title: 'Greedy Algorithms',
            page: 125,
            problems: [
                {
                    id: '8.1',
                    title: 'Approximate set covering',
                    difficulty: 'Medium',
                    tags: [
                                          'Greedy'
                                        ],
                },
                {
                    id: '8.2',
                    title: 'Identify NP-complete problems',
                    difficulty: 'Medium',
                    tags: [
                                          'NPComplete'
                                        ],
                },
                {
                    id: '8-3',
                    title: 'Exercise 8.3',
                    difficulty: 'Medium',
                },
                {
                    id: '8-4',
                    title: 'Exercise 8.4',
                    difficulty: 'Medium',
                },
                {
                    id: '8-5',
                    title: 'Exercise 8.5',
                    difficulty: 'Hard',
                },
                {
                    id: '8-6',
                    title: 'Exercise 8.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '9',
            title: 'Dynamic Programming',
            page: 139,
            problems: [
                {
                    id: '9.1',
                    title: 'Solve 0/1 knapsack with DP',
                    difficulty: 'Medium',
                    tags: [
                                          'DP',
                                          'Knapsack'
                                        ],
                },
                {
                    id: '9.2',
                    title: 'Longest common substring',
                    difficulty: 'Medium',
                    tags: [
                                          'DP',
                                          'Strings'
                                        ],
                },
                {
                    id: '9.3',
                    title: 'Longest common subsequence',
                    difficulty: 'Medium',
                    tags: [
                                          'DP',
                                          'Strings'
                                        ],
                },
                {
                    id: '9-4',
                    title: 'Exercise 9.4',
                    difficulty: 'Medium',
                },
                {
                    id: '9-5',
                    title: 'Exercise 9.5',
                    difficulty: 'Hard',
                },
                {
                    id: '9-6',
                    title: 'Exercise 9.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '10',
            title: 'K-Nearest Neighbors',
            page: 159,
            problems: [
                {
                    id: '10.1',
                    title: 'Implement KNN for classification',
                    difficulty: 'Medium',
                    tags: [
                                          'ML',
                                          'KNN'
                                        ],
                },
                {
                    id: '10.2',
                    title: 'Compute cosine similarity between documents',
                    difficulty: 'Easy',
                    tags: [
                                          'ML'
                                        ],
                },
                {
                    id: '10-3',
                    title: 'Exercise 10.3',
                    difficulty: 'Medium',
                },
                {
                    id: '10-4',
                    title: 'Exercise 10.4',
                    difficulty: 'Medium',
                },
                {
                    id: '10-5',
                    title: 'Exercise 10.5',
                    difficulty: 'Hard',
                },
                {
                    id: '10-6',
                    title: 'Exercise 10.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '11',
            title: 'Arrays',
            problems: [
                {
                    id: '11-1',
                    title: 'Arrays Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '11-2',
                    title: 'Arrays Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '11-3',
                    title: 'Arrays Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '11-4',
                    title: 'Arrays Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '11-5',
                    title: 'Arrays Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '11-6',
                    title: 'Arrays Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '12',
            title: 'Sorting and Searching',
            problems: [
                {
                    id: '12-1',
                    title: 'Sorting and Searching Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '12-2',
                    title: 'Sorting and Searching Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '12-3',
                    title: 'Sorting and Searching Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '12-4',
                    title: 'Sorting and Searching Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '12-5',
                    title: 'Sorting and Searching Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '12-6',
                    title: 'Sorting and Searching Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '13',
            title: 'Greedy Algorithms',
            problems: [
                {
                    id: '13-1',
                    title: 'Greedy Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '13-2',
                    title: 'Greedy Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '13-3',
                    title: 'Greedy Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '13-4',
                    title: 'Greedy Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '13-5',
                    title: 'Greedy Algorithms Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '13-6',
                    title: 'Exercise 13.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '14',
            title: 'NP Complete Problems',
            problems: [
                {
                    id: '14-1',
                    title: 'NP Complete Problems Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '14-2',
                    title: 'NP Complete Problems Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '14-3',
                    title: 'NP Complete Problems Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '14-4',
                    title: 'NP Complete Problems Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '14-5',
                    title: 'NP Complete Problems Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '14-6',
                    title: 'Exercise 14.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '15',
            title: 'Arrays',
            problems: [
                {
                    id: '15-1',
                    title: 'Arrays Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '15-2',
                    title: 'Arrays Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '15-3',
                    title: 'Arrays Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '15-4',
                    title: 'Arrays Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '15-5',
                    title: 'Arrays Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '15-6',
                    title: 'Arrays Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '16',
            title: 'Sorting and Searching',
            problems: [
                {
                    id: '16-1',
                    title: 'Sorting and Searching Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '16-2',
                    title: 'Sorting and Searching Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '16-3',
                    title: 'Sorting and Searching Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '16-4',
                    title: 'Sorting and Searching Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '16-5',
                    title: 'Sorting and Searching Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '16-6',
                    title: 'Sorting and Searching Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '17',
            title: 'Greedy Algorithms',
            problems: [
                {
                    id: '17-1',
                    title: 'Greedy Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '17-2',
                    title: 'Greedy Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '17-3',
                    title: 'Greedy Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '17-4',
                    title: 'Greedy Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '17-5',
                    title: 'Greedy Algorithms Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '17-6',
                    title: 'Exercise 17.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '18',
            title: 'NP Complete Problems',
            problems: [
                {
                    id: '18-1',
                    title: 'NP Complete Problems Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '18-2',
                    title: 'NP Complete Problems Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '18-3',
                    title: 'NP Complete Problems Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '18-4',
                    title: 'NP Complete Problems Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '18-5',
                    title: 'NP Complete Problems Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '18-6',
                    title: 'Exercise 18.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '19',
            title: 'Arrays',
            problems: [
                {
                    id: '19-1',
                    title: 'Arrays Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '19-2',
                    title: 'Arrays Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '19-3',
                    title: 'Arrays Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '19-4',
                    title: 'Arrays Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '19-5',
                    title: 'Arrays Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '19-6',
                    title: 'Arrays Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '20',
            title: 'Sorting and Searching',
            problems: [
                {
                    id: '20-1',
                    title: 'Sorting and Searching Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '20-2',
                    title: 'Sorting and Searching Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '20-3',
                    title: 'Sorting and Searching Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '20-4',
                    title: 'Sorting and Searching Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '20-5',
                    title: 'Sorting and Searching Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '20-6',
                    title: 'Sorting and Searching Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '21',
            title: 'Greedy Algorithms',
            problems: [
                {
                    id: '21-1',
                    title: 'Greedy Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '21-2',
                    title: 'Greedy Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '21-3',
                    title: 'Greedy Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '21-4',
                    title: 'Greedy Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '21-5',
                    title: 'Greedy Algorithms Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '21-6',
                    title: 'Exercise 21.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '22',
            title: 'NP Complete Problems',
            problems: [
                {
                    id: '22-1',
                    title: 'NP Complete Problems Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '22-2',
                    title: 'NP Complete Problems Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '22-3',
                    title: 'NP Complete Problems Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '22-4',
                    title: 'NP Complete Problems Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '22-5',
                    title: 'NP Complete Problems Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '22-6',
                    title: 'Exercise 22.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '23',
            title: 'Arrays',
            problems: [
                {
                    id: '23-1',
                    title: 'Arrays Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '23-2',
                    title: 'Arrays Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '23-3',
                    title: 'Arrays Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '23-4',
                    title: 'Arrays Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '23-5',
                    title: 'Arrays Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '23-6',
                    title: 'Arrays Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '24',
            title: 'Sorting and Searching',
            problems: [
                {
                    id: '24-1',
                    title: 'Sorting and Searching Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '24-2',
                    title: 'Sorting and Searching Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '24-3',
                    title: 'Sorting and Searching Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '24-4',
                    title: 'Sorting and Searching Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '24-5',
                    title: 'Sorting and Searching Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '24-6',
                    title: 'Sorting and Searching Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '25',
            title: 'Greedy Algorithms',
            problems: [
                {
                    id: '25-1',
                    title: 'Greedy Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '25-2',
                    title: 'Greedy Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '25-3',
                    title: 'Greedy Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '25-4',
                    title: 'Greedy Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '25-5',
                    title: 'Greedy Algorithms Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '25-6',
                    title: 'Exercise 25.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '26',
            title: 'NP Complete Problems',
            problems: [
                {
                    id: '26-1',
                    title: 'NP Complete Problems Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '26-2',
                    title: 'NP Complete Problems Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '26-3',
                    title: 'NP Complete Problems Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '26-4',
                    title: 'NP Complete Problems Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '26-5',
                    title: 'NP Complete Problems Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '26-6',
                    title: 'Exercise 26.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '27',
            title: 'Arrays',
            problems: [
                {
                    id: '27-1',
                    title: 'Arrays Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '27-2',
                    title: 'Arrays Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '27-3',
                    title: 'Arrays Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '27-4',
                    title: 'Arrays Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '27-5',
                    title: 'Arrays Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '27-6',
                    title: 'Arrays Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '28',
            title: 'Sorting and Searching',
            problems: [
                {
                    id: '28-1',
                    title: 'Sorting and Searching Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '28-2',
                    title: 'Sorting and Searching Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '28-3',
                    title: 'Sorting and Searching Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '28-4',
                    title: 'Sorting and Searching Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '28-5',
                    title: 'Sorting and Searching Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '28-6',
                    title: 'Sorting and Searching Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '29',
            title: 'Greedy Algorithms',
            problems: [
                {
                    id: '29-1',
                    title: 'Greedy Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '29-2',
                    title: 'Greedy Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '29-3',
                    title: 'Greedy Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '29-4',
                    title: 'Greedy Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '29-5',
                    title: 'Greedy Algorithms Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '29-6',
                    title: 'Exercise 29.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '30',
            title: 'NP Complete Problems',
            problems: [
                {
                    id: '30-1',
                    title: 'NP Complete Problems Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '30-2',
                    title: 'NP Complete Problems Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '30-3',
                    title: 'NP Complete Problems Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '30-4',
                    title: 'NP Complete Problems Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '30-5',
                    title: 'NP Complete Problems Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '30-6',
                    title: 'Exercise 30.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '31',
            title: 'Arrays',
            problems: [
                {
                    id: '31-1',
                    title: 'Arrays Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '31-2',
                    title: 'Arrays Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '31-3',
                    title: 'Arrays Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '31-4',
                    title: 'Arrays Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '31-5',
                    title: 'Arrays Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '31-6',
                    title: 'Arrays Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '32',
            title: 'Sorting and Searching',
            problems: [
                {
                    id: '32-1',
                    title: 'Sorting and Searching Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '32-2',
                    title: 'Sorting and Searching Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '32-3',
                    title: 'Sorting and Searching Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '32-4',
                    title: 'Sorting and Searching Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '32-5',
                    title: 'Sorting and Searching Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '32-6',
                    title: 'Sorting and Searching Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '33',
            title: 'Greedy Algorithms',
            problems: [
                {
                    id: '33-1',
                    title: 'Greedy Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '33-2',
                    title: 'Greedy Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '33-3',
                    title: 'Greedy Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '33-4',
                    title: 'Greedy Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '33-5',
                    title: 'Greedy Algorithms Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '33-6',
                    title: 'Exercise 33.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '34',
            title: 'NP Complete Problems',
            problems: [
                {
                    id: '34-1',
                    title: 'NP Complete Problems Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '34-2',
                    title: 'NP Complete Problems Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '34-3',
                    title: 'NP Complete Problems Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '34-4',
                    title: 'NP Complete Problems Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '34-5',
                    title: 'NP Complete Problems Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '34-6',
                    title: 'Exercise 34.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '35',
            title: 'Arrays',
            problems: [
                {
                    id: '35-1',
                    title: 'Arrays Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '35-2',
                    title: 'Arrays Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '35-3',
                    title: 'Arrays Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '35-4',
                    title: 'Arrays Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '35-5',
                    title: 'Arrays Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '35-6',
                    title: 'Arrays Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '36',
            title: 'Sorting and Searching',
            problems: [
                {
                    id: '36-1',
                    title: 'Sorting and Searching Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '36-2',
                    title: 'Sorting and Searching Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '36-3',
                    title: 'Sorting and Searching Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '36-4',
                    title: 'Sorting and Searching Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '36-5',
                    title: 'Sorting and Searching Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '36-6',
                    title: 'Sorting and Searching Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '37',
            title: 'Greedy Algorithms',
            problems: [
                {
                    id: '37-1',
                    title: 'Greedy Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '37-2',
                    title: 'Greedy Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '37-3',
                    title: 'Greedy Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '37-4',
                    title: 'Greedy Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '37-5',
                    title: 'Greedy Algorithms Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '37-6',
                    title: 'Exercise 37.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '38',
            title: 'NP Complete Problems',
            problems: [
                {
                    id: '38-1',
                    title: 'NP Complete Problems Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '38-2',
                    title: 'NP Complete Problems Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '38-3',
                    title: 'NP Complete Problems Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '38-4',
                    title: 'NP Complete Problems Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '38-5',
                    title: 'NP Complete Problems Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '38-6',
                    title: 'Exercise 38.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '39',
            title: 'Arrays',
            summary: 'Arrays concepts and practice',
            problems: [
                {
                    id: '39-1',
                    title: 'Arrays Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '39-2',
                    title: 'Arrays Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '39-3',
                    title: 'Arrays Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '39-4',
                    title: 'Arrays Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '39-5',
                    title: 'Arrays Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '39-6',
                    title: 'Arrays Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '40',
            title: 'Sorting and Searching',
            summary: 'Sorting and Searching concepts and practice',
            problems: [
                {
                    id: '40-1',
                    title: 'Sorting and Searching Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '40-2',
                    title: 'Sorting and Searching Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '40-3',
                    title: 'Sorting and Searching Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '40-4',
                    title: 'Sorting and Searching Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '40-5',
                    title: 'Sorting and Searching Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '40-6',
                    title: 'Sorting and Searching Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '41',
            title: 'Greedy Algorithms',
            summary: 'Greedy Algorithms concepts and practice',
            problems: [
                {
                    id: '41-1',
                    title: 'Greedy Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '41-2',
                    title: 'Greedy Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '41-3',
                    title: 'Greedy Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '41-4',
                    title: 'Greedy Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '41-5',
                    title: 'Greedy Algorithms Problem 5',
                    difficulty: 'Hard',
                },
            ],
        },
        {
            num: '42',
            title: 'NP Complete Problems',
            summary: 'NP Complete Problems concepts and practice',
            problems: [
                {
                    id: '42-1',
                    title: 'NP Complete Problems Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '42-2',
                    title: 'NP Complete Problems Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '42-3',
                    title: 'NP Complete Problems Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '42-4',
                    title: 'NP Complete Problems Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '42-5',
                    title: 'NP Complete Problems Problem 5',
                    difficulty: 'Hard',
                },
            ],
        },
    ],
}

// ─── PROGCHAL ──────────────────────────────────────────────────────────────
const progchal: Book = {
    slug: 'progchal',
    title: 'Programming Challenges',
    shortTitle: 'Prog Challenges',
    author: 'Steven S. Skiena and Miguel A. Revilla',
    edition: '1st',
    year: 2003,
    coverUrl: '/assets/books/cover-progchal.jpg',
    color: '#d97706',
    accentColor: '#fbbf24',
    description: 'A programming contest training book with 100+ problems from UVa and other OJs covering data structures, graph theory, geometry, and more.',
    totalProblems: 101,
    tags: [
          'Competitive',
          'UVa',
          'Contest',
          'Training'
        ],
    chapters: [
        {
            num: '1',
            title: 'Getting Started',
            page: 1,
            problems: [
                {
                    id: '1.1',
                    title: 'UVa 100 — The 3n+1 Problem',
                    difficulty: 'Easy',
                    tags: [
                                          'Simulation'
                                        ],
                },
                {
                    id: '1.2',
                    title: 'UVa 101 — The Blocks Problem',
                    difficulty: 'Easy',
                    tags: [
                                          'Simulation'
                                        ],
                },
                {
                    id: '1.3',
                    title: 'UVa 102 — Ecological Bin Packing',
                    difficulty: 'Easy',
                    tags: [
                                          'BruteForce'
                                        ],
                },
                {
                    id: '1-4',
                    title: 'Exercise 1.4',
                    difficulty: 'Medium',
                },
                {
                    id: '1-5',
                    title: 'Exercise 1.5',
                    difficulty: 'Hard',
                },
                {
                    id: '1-6',
                    title: 'Exercise 1.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '2',
            title: 'Data Structures',
            page: 35,
            problems: [
                {
                    id: '2.1',
                    title: 'UVa 10252 — Common Permutation',
                    difficulty: 'Easy',
                    tags: [
                                          'Sorting'
                                        ],
                },
                {
                    id: '2.2',
                    title: 'UVa 10038 — Jolly Jumpers',
                    difficulty: 'Easy',
                    tags: [
                                          'Set'
                                        ],
                },
                {
                    id: '2.3',
                    title: 'UVa 10194 — Football (aka Soccer)',
                    difficulty: 'Medium',
                    tags: [
                                          'Sorting'
                                        ],
                },
                {
                    id: '2-4',
                    title: 'Exercise 2.4',
                    difficulty: 'Medium',
                },
                {
                    id: '2-5',
                    title: 'Exercise 2.5',
                    difficulty: 'Hard',
                },
                {
                    id: '2-6',
                    title: 'Exercise 2.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '3',
            title: 'Strings',
            page: 65,
            problems: [
                {
                    id: '3.1',
                    title: 'UVa 537 — Artificial Intelligence?',
                    difficulty: 'Easy',
                    tags: [
                                          'Strings',
                                          'Parsing'
                                        ],
                },
                {
                    id: '3.2',
                    title: 'UVa 409 — Excuses, Excuses!',
                    difficulty: 'Easy',
                    tags: [
                                          'Strings'
                                        ],
                },
                {
                    id: '3.3',
                    title: 'UVa 10361 — Automatic Poetry',
                    difficulty: 'Medium',
                    tags: [
                                          'Strings',
                                          'Parsing'
                                        ],
                },
                {
                    id: '3-4',
                    title: 'Exercise 3.4',
                    difficulty: 'Medium',
                },
                {
                    id: '3-5',
                    title: 'Exercise 3.5',
                    difficulty: 'Hard',
                },
                {
                    id: '3-6',
                    title: 'Exercise 3.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '4',
            title: 'Sorting and Searching',
            page: 90,
            problems: [
                {
                    id: '4.1',
                    title: 'UVa 400 — Unix ls',
                    difficulty: 'Easy',
                    tags: [
                                          'Sorting'
                                        ],
                },
                {
                    id: '4.2',
                    title: 'UVa 10107 — What is the Median?',
                    difficulty: 'Easy',
                    tags: [
                                          'Sorting'
                                        ],
                },
                {
                    id: '4.3',
                    title: 'UVa 10041 — Vito\'s Family',
                    difficulty: 'Easy',
                    tags: [
                                          'Sorting',
                                          'Greedy'
                                        ],
                },
                {
                    id: '4-4',
                    title: 'Exercise 4.4',
                    difficulty: 'Medium',
                },
                {
                    id: '4-5',
                    title: 'Exercise 4.5',
                    difficulty: 'Hard',
                },
                {
                    id: '4-6',
                    title: 'Exercise 4.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '5',
            title: 'Graph Traversal',
            page: 120,
            problems: [
                {
                    id: '5.1',
                    title: 'UVa 439 — Knight Moves',
                    difficulty: 'Easy',
                    tags: [
                                          'Graph',
                                          'BFS'
                                        ],
                },
                {
                    id: '5.2',
                    title: 'UVa 352 — The Seasonal War',
                    difficulty: 'Easy',
                    tags: [
                                          'Graph',
                                          'DFS'
                                        ],
                },
                {
                    id: '5.3',
                    title: 'UVa 10305 — Ordering Tasks',
                    difficulty: 'Easy',
                    tags: [
                                          'Graph',
                                          'TopSort'
                                        ],
                },
                {
                    id: '5-4',
                    title: 'Exercise 5.4',
                    difficulty: 'Medium',
                },
                {
                    id: '5-5',
                    title: 'Exercise 5.5',
                    difficulty: 'Hard',
                },
                {
                    id: '5-6',
                    title: 'Exercise 5.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '6',
            title: 'Graph Algorithms',
            page: 150,
            problems: [
                {
                    id: '6.1',
                    title: 'UVa 10034 — Freckles',
                    difficulty: 'Medium',
                    tags: [
                                          'Graph',
                                          'MST'
                                        ],
                },
                {
                    id: '6.2',
                    title: 'UVa 10000 — Longest Paths',
                    difficulty: 'Medium',
                    tags: [
                                          'Graph',
                                          'BellmanFord'
                                        ],
                },
                {
                    id: '6.3',
                    title: 'UVa 565 — Pizza Anyone?',
                    difficulty: 'Hard',
                    tags: [
                                          'Graph',
                                          'SAT'
                                        ],
                },
                {
                    id: '6-4',
                    title: 'Exercise 6.4',
                    difficulty: 'Medium',
                },
                {
                    id: '6-5',
                    title: 'Exercise 6.5',
                    difficulty: 'Hard',
                },
                {
                    id: '6-6',
                    title: 'Exercise 6.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '7',
            title: 'Combinatorics',
            page: 180,
            problems: [
                {
                    id: '7.1',
                    title: 'UVa 369 — Combinations',
                    difficulty: 'Easy',
                    tags: [
                                          'Combinatorics'
                                        ],
                },
                {
                    id: '7.2',
                    title: 'UVa 10394 — Twin Primes',
                    difficulty: 'Medium',
                    tags: [
                                          'NumberTheory',
                                          'Sieve'
                                        ],
                },
                {
                    id: '7.3',
                    title: 'UVa 10346 — Peter\'s Smokes',
                    difficulty: 'Easy',
                    tags: [
                                          'Math'
                                        ],
                },
                {
                    id: '7-4',
                    title: 'Exercise 7.4',
                    difficulty: 'Medium',
                },
                {
                    id: '7-5',
                    title: 'Exercise 7.5',
                    difficulty: 'Hard',
                },
                {
                    id: '7-6',
                    title: 'Exercise 7.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '8',
            title: 'Number Theory',
            page: 210,
            problems: [
                {
                    id: '8.1',
                    title: 'UVa 10071 — Back to High School Physics',
                    difficulty: 'Easy',
                    tags: [
                                          'Math'
                                        ],
                },
                {
                    id: '8.2',
                    title: 'UVa 10104 — Euclid Problem',
                    difficulty: 'Medium',
                    tags: [
                                          'NumberTheory',
                                          'GCD'
                                        ],
                },
                {
                    id: '8.3',
                    title: 'UVa 10006 — Carmichael Numbers',
                    difficulty: 'Medium',
                    tags: [
                                          'NumberTheory',
                                          'FastExp'
                                        ],
                },
                {
                    id: '8-4',
                    title: 'Exercise 8.4',
                    difficulty: 'Medium',
                },
                {
                    id: '8-5',
                    title: 'Exercise 8.5',
                    difficulty: 'Hard',
                },
                {
                    id: '8-6',
                    title: 'Exercise 8.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '9',
            title: 'Computational Geometry',
            page: 240,
            problems: [
                {
                    id: '9.1',
                    title: 'UVa 10062 — Tell me the frequencies!',
                    difficulty: 'Easy',
                    tags: [
                                          'Sorting'
                                        ],
                },
                {
                    id: '9.2',
                    title: 'UVa 10050 — Hartals',
                    difficulty: 'Easy',
                    tags: [
                                          'Simulation'
                                        ],
                },
                {
                    id: '9-3',
                    title: 'Exercise 9.3',
                    difficulty: 'Medium',
                },
                {
                    id: '9-4',
                    title: 'Exercise 9.4',
                    difficulty: 'Medium',
                },
                {
                    id: '9-5',
                    title: 'Exercise 9.5',
                    difficulty: 'Hard',
                },
                {
                    id: '9-6',
                    title: 'Exercise 9.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '10',
            title: 'Sorting',
            problems: [
                {
                    id: '10-1',
                    title: 'Sorting Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '10-2',
                    title: 'Sorting Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '10-3',
                    title: 'Sorting Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '10-4',
                    title: 'Sorting Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '10-5',
                    title: 'Sorting Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '10-6',
                    title: 'Exercise 10.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '11',
            title: 'Sorting',
            problems: [
                {
                    id: '11-1',
                    title: 'Sorting Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '11-2',
                    title: 'Sorting Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '11-3',
                    title: 'Sorting Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '11-4',
                    title: 'Sorting Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '11-5',
                    title: 'Sorting Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '11-6',
                    title: 'Exercise 11.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '12',
            title: 'Sorting',
            problems: [
                {
                    id: '12-1',
                    title: 'Sorting Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '12-2',
                    title: 'Sorting Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '12-3',
                    title: 'Sorting Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '12-4',
                    title: 'Sorting Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '12-5',
                    title: 'Sorting Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '12-6',
                    title: 'Exercise 12.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '13',
            title: 'Sorting',
            problems: [
                {
                    id: '13-1',
                    title: 'Sorting Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '13-2',
                    title: 'Sorting Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '13-3',
                    title: 'Sorting Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '13-4',
                    title: 'Sorting Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '13-5',
                    title: 'Sorting Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '13-6',
                    title: 'Exercise 13.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '14',
            title: 'Sorting',
            problems: [
                {
                    id: '14-1',
                    title: 'Sorting Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '14-2',
                    title: 'Sorting Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '14-3',
                    title: 'Sorting Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '14-4',
                    title: 'Sorting Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '14-5',
                    title: 'Sorting Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '14-6',
                    title: 'Exercise 14.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '15',
            title: 'Sorting',
            problems: [
                {
                    id: '15-1',
                    title: 'Sorting Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '15-2',
                    title: 'Sorting Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '15-3',
                    title: 'Sorting Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '15-4',
                    title: 'Sorting Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '15-5',
                    title: 'Sorting Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '15-6',
                    title: 'Exercise 15.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '16',
            title: 'Sorting',
            problems: [
                {
                    id: '16-1',
                    title: 'Sorting Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '16-2',
                    title: 'Sorting Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '16-3',
                    title: 'Sorting Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '16-4',
                    title: 'Sorting Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '16-5',
                    title: 'Sorting Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '16-6',
                    title: 'Exercise 16.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '17',
            title: 'Sorting',
            summary: 'Sorting concepts and practice',
            problems: [
                {
                    id: '17-1',
                    title: 'Sorting Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '17-2',
                    title: 'Sorting Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '17-3',
                    title: 'Sorting Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '17-4',
                    title: 'Sorting Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '17-5',
                    title: 'Sorting Problem 5',
                    difficulty: 'Hard',
                },
            ],
        },
    ],
}

// ─── MATH4CS ──────────────────────────────────────────────────────────────
const math4cs: Book = {
    slug: 'math4cs',
    title: 'Mathematics for Computer Science',
    shortTitle: 'Math 4 CS',
    author: 'Eric Lehman, F. Thomson Leighton, and Albert R. Meyer',
    edition: '1st',
    year: 2017,
    coverUrl: '/assets/books/cover-math4cs.jpg',
    color: '#e11d48',
    accentColor: '#fb7185',
    description: 'A comprehensive introduction to discrete mathematics for computer science. Covers proofs, number theory, graph theory, counting, and probability.',
    totalProblems: 183,
    tags: [
          'Math',
          'Discrete Math',
          'Proofs',
          'Probability'
        ],
    chapters: [
        {
            num: '1',
            title: 'Proofs',
            page: 1,
            problems: [
                {
                    id: '1.1',
                    title: 'Prove sum of first n integers formula by induction',
                    difficulty: 'Easy',
                    tags: [
                                          'Proofs'
                                        ],
                },
                {
                    id: '1.2',
                    title: 'Prove geometric series formula',
                    difficulty: 'Easy',
                    tags: [
                                          'Proofs',
                                          'Induction'
                                        ],
                },
                {
                    id: '1.3',
                    title: 'Prove that sqrt(2) is irrational',
                    difficulty: 'Medium',
                    tags: [
                                          'Proofs'
                                        ],
                },
                {
                    id: '1-4',
                    title: 'Exercise 1.4',
                    difficulty: 'Medium',
                },
                {
                    id: '1-5',
                    title: 'Exercise 1.5',
                    difficulty: 'Hard',
                },
                {
                    id: '1-6',
                    title: 'Exercise 1.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '2',
            title: 'Number Theory',
            page: 45,
            problems: [
                {
                    id: '2.1',
                    title: 'Prove GCD is a linear combination',
                    difficulty: 'Medium',
                    tags: [
                                          'NumberTheory'
                                        ],
                },
                {
                    id: '2.2',
                    title: 'Find multiplicative inverse modulo n',
                    difficulty: 'Medium',
                    tags: [
                                          'NumberTheory'
                                        ],
                },
                {
                    id: '2.3',
                    title: 'Implement the Chinese Remainder Theorem',
                    difficulty: 'Medium',
                    tags: [
                                          'NumberTheory'
                                        ],
                },
                {
                    id: '2.4',
                    title: 'Prove Fermat\'s Little Theorem',
                    difficulty: 'Hard',
                    tags: [
                                          'NumberTheory'
                                        ],
                },
                {
                    id: '2-5',
                    title: 'Exercise 2.5',
                    difficulty: 'Hard',
                },
                {
                    id: '2-6',
                    title: 'Exercise 2.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '3',
            title: 'Graph Theory',
            page: 100,
            problems: [
                {
                    id: '3.1',
                    title: 'Prove that a tree with n vertices has n-1 edges',
                    difficulty: 'Easy',
                    tags: [
                                          'GraphTheory'
                                        ],
                },
                {
                    id: '3.2',
                    title: 'Find if a graph is bipartite',
                    difficulty: 'Medium',
                    tags: [
                                          'GraphTheory',
                                          'BFS'
                                        ],
                },
                {
                    id: '3.3',
                    title: 'Prove Hall\'s theorem',
                    difficulty: 'Hard',
                    tags: [
                                          'GraphTheory'
                                        ],
                },
                {
                    id: '3-4',
                    title: 'Exercise 3.4',
                    difficulty: 'Medium',
                },
                {
                    id: '3-5',
                    title: 'Exercise 3.5',
                    difficulty: 'Hard',
                },
                {
                    id: '3-6',
                    title: 'Exercise 3.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '4',
            title: 'Counting',
            page: 150,
            problems: [
                {
                    id: '4.1',
                    title: 'Count number of n-bit strings with no consecutive 1s',
                    difficulty: 'Medium',
                    tags: [
                                          'Counting'
                                        ],
                },
                {
                    id: '4.2',
                    title: 'Prove the pigeonhole principle',
                    difficulty: 'Easy',
                    tags: [
                                          'Counting'
                                        ],
                },
                {
                    id: '4.3',
                    title: 'Count derangements using inclusion-exclusion',
                    difficulty: 'Hard',
                    tags: [
                                          'Counting'
                                        ],
                },
                {
                    id: '4-4',
                    title: 'Exercise 4.4',
                    difficulty: 'Medium',
                },
                {
                    id: '4-5',
                    title: 'Exercise 4.5',
                    difficulty: 'Hard',
                },
                {
                    id: '4-6',
                    title: 'Exercise 4.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '5',
            title: 'Probability',
            page: 200,
            problems: [
                {
                    id: '5.1',
                    title: 'Birthday paradox: probability of shared birthday in group of n',
                    difficulty: 'Medium',
                    tags: [
                                          'Probability'
                                        ],
                },
                {
                    id: '5.2',
                    title: 'Expected number of coin flips to get two consecutive heads',
                    difficulty: 'Medium',
                    tags: [
                                          'Probability'
                                        ],
                },
                {
                    id: '5.3',
                    title: 'Prove Markov\'s inequality',
                    difficulty: 'Medium',
                    tags: [
                                          'Probability'
                                        ],
                },
                {
                    id: '5.4',
                    title: 'Gambler\'s ruin problem',
                    difficulty: 'Hard',
                    tags: [
                                          'Probability',
                                          'RandomWalk'
                                        ],
                },
                {
                    id: '5-5',
                    title: 'Exercise 5.5',
                    difficulty: 'Hard',
                },
                {
                    id: '5-6',
                    title: 'Exercise 5.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '6',
            title: 'Recurrences',
            page: 250,
            problems: [
                {
                    id: '6.1',
                    title: 'Solve Fibonacci recurrence',
                    difficulty: 'Medium',
                    tags: [
                                          'Recurrence'
                                        ],
                },
                {
                    id: '6.2',
                    title: 'Apply master theorem to divide-and-conquer recurrences',
                    difficulty: 'Medium',
                    tags: [
                                          'Recurrence'
                                        ],
                },
                {
                    id: '6.3',
                    title: 'Solve recurrence using generating functions',
                    difficulty: 'Hard',
                    tags: [
                                          'Recurrence'
                                        ],
                },
                {
                    id: '6-4',
                    title: 'Exercise 6.4',
                    difficulty: 'Medium',
                },
                {
                    id: '6-5',
                    title: 'Exercise 6.5',
                    difficulty: 'Hard',
                },
                {
                    id: '6-6',
                    title: 'Exercise 6.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '7',
            title: 'Asymptotics',
            page: 290,
            problems: [
                {
                    id: '7.1',
                    title: 'Order functions by growth rate',
                    difficulty: 'Easy',
                    tags: [
                                          'Asymptotics'
                                        ],
                },
                {
                    id: '7.2',
                    title: 'Prove that log n! = Theta(n log n)',
                    difficulty: 'Medium',
                    tags: [
                                          'Asymptotics'
                                        ],
                },
                {
                    id: '7-3',
                    title: 'Exercise 7.3',
                    difficulty: 'Medium',
                },
                {
                    id: '7-4',
                    title: 'Exercise 7.4',
                    difficulty: 'Medium',
                },
                {
                    id: '7-5',
                    title: 'Exercise 7.5',
                    difficulty: 'Hard',
                },
                {
                    id: '7-6',
                    title: 'Exercise 7.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '8',
            title: 'Counting',
            problems: [
                {
                    id: '8-1',
                    title: 'Counting Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '8-2',
                    title: 'Counting Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '8-3',
                    title: 'Counting Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '8-4',
                    title: 'Counting Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '8-5',
                    title: 'Counting Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '8-6',
                    title: 'Exercise 8.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '9',
            title: 'Discrete Probability',
            problems: [
                {
                    id: '9-1',
                    title: 'Discrete Probability Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '9-2',
                    title: 'Discrete Probability Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '9-3',
                    title: 'Discrete Probability Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '9-4',
                    title: 'Discrete Probability Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '9-5',
                    title: 'Discrete Probability Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '9-6',
                    title: 'Exercise 9.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '10',
            title: 'Number Theory',
            problems: [
                {
                    id: '10-1',
                    title: 'Number Theory Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '10-2',
                    title: 'Number Theory Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '10-3',
                    title: 'Number Theory Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '10-4',
                    title: 'Number Theory Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '10-5',
                    title: 'Number Theory Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '10-6',
                    title: 'Exercise 10.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '11',
            title: 'Counting',
            problems: [
                {
                    id: '11-1',
                    title: 'Counting Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '11-2',
                    title: 'Counting Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '11-3',
                    title: 'Counting Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '11-4',
                    title: 'Counting Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '11-5',
                    title: 'Counting Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '11-6',
                    title: 'Exercise 11.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '12',
            title: 'Discrete Probability',
            problems: [
                {
                    id: '12-1',
                    title: 'Discrete Probability Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '12-2',
                    title: 'Discrete Probability Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '12-3',
                    title: 'Discrete Probability Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '12-4',
                    title: 'Discrete Probability Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '12-5',
                    title: 'Discrete Probability Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '12-6',
                    title: 'Exercise 12.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '13',
            title: 'Number Theory',
            problems: [
                {
                    id: '13-1',
                    title: 'Number Theory Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '13-2',
                    title: 'Number Theory Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '13-3',
                    title: 'Number Theory Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '13-4',
                    title: 'Number Theory Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '13-5',
                    title: 'Number Theory Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '13-6',
                    title: 'Exercise 13.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '14',
            title: 'Counting',
            problems: [
                {
                    id: '14-1',
                    title: 'Counting Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '14-2',
                    title: 'Counting Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '14-3',
                    title: 'Counting Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '14-4',
                    title: 'Counting Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '14-5',
                    title: 'Counting Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '14-6',
                    title: 'Exercise 14.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '15',
            title: 'Discrete Probability',
            problems: [
                {
                    id: '15-1',
                    title: 'Discrete Probability Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '15-2',
                    title: 'Discrete Probability Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '15-3',
                    title: 'Discrete Probability Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '15-4',
                    title: 'Discrete Probability Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '15-5',
                    title: 'Discrete Probability Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '15-6',
                    title: 'Exercise 15.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '16',
            title: 'Number Theory',
            problems: [
                {
                    id: '16-1',
                    title: 'Number Theory Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '16-2',
                    title: 'Number Theory Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '16-3',
                    title: 'Number Theory Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '16-4',
                    title: 'Number Theory Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '16-5',
                    title: 'Number Theory Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '16-6',
                    title: 'Exercise 16.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '17',
            title: 'Counting',
            problems: [
                {
                    id: '17-1',
                    title: 'Counting Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '17-2',
                    title: 'Counting Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '17-3',
                    title: 'Counting Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '17-4',
                    title: 'Counting Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '17-5',
                    title: 'Counting Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '17-6',
                    title: 'Exercise 17.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '18',
            title: 'Discrete Probability',
            problems: [
                {
                    id: '18-1',
                    title: 'Discrete Probability Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '18-2',
                    title: 'Discrete Probability Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '18-3',
                    title: 'Discrete Probability Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '18-4',
                    title: 'Discrete Probability Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '18-5',
                    title: 'Discrete Probability Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '18-6',
                    title: 'Exercise 18.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '19',
            title: 'Number Theory',
            problems: [
                {
                    id: '19-1',
                    title: 'Number Theory Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '19-2',
                    title: 'Number Theory Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '19-3',
                    title: 'Number Theory Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '19-4',
                    title: 'Number Theory Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '19-5',
                    title: 'Number Theory Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '19-6',
                    title: 'Exercise 19.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '20',
            title: 'Counting',
            problems: [
                {
                    id: '20-1',
                    title: 'Counting Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '20-2',
                    title: 'Counting Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '20-3',
                    title: 'Counting Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '20-4',
                    title: 'Counting Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '20-5',
                    title: 'Counting Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '20-6',
                    title: 'Exercise 20.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '21',
            title: 'Discrete Probability',
            problems: [
                {
                    id: '21-1',
                    title: 'Discrete Probability Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '21-2',
                    title: 'Discrete Probability Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '21-3',
                    title: 'Discrete Probability Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '21-4',
                    title: 'Discrete Probability Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '21-5',
                    title: 'Discrete Probability Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '21-6',
                    title: 'Exercise 21.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '22',
            title: 'Number Theory',
            problems: [
                {
                    id: '22-1',
                    title: 'Number Theory Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '22-2',
                    title: 'Number Theory Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '22-3',
                    title: 'Number Theory Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '22-4',
                    title: 'Number Theory Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '22-5',
                    title: 'Number Theory Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '22-6',
                    title: 'Exercise 22.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '23',
            title: 'Counting',
            problems: [
                {
                    id: '23-1',
                    title: 'Counting Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '23-2',
                    title: 'Counting Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '23-3',
                    title: 'Counting Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '23-4',
                    title: 'Counting Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '23-5',
                    title: 'Counting Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '23-6',
                    title: 'Exercise 23.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '24',
            title: 'Discrete Probability',
            problems: [
                {
                    id: '24-1',
                    title: 'Discrete Probability Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '24-2',
                    title: 'Discrete Probability Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '24-3',
                    title: 'Discrete Probability Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '24-4',
                    title: 'Discrete Probability Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '24-5',
                    title: 'Discrete Probability Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '24-6',
                    title: 'Exercise 24.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '25',
            title: 'Number Theory',
            problems: [
                {
                    id: '25-1',
                    title: 'Number Theory Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '25-2',
                    title: 'Number Theory Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '25-3',
                    title: 'Number Theory Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '25-4',
                    title: 'Number Theory Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '25-5',
                    title: 'Number Theory Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '25-6',
                    title: 'Exercise 25.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '26',
            title: 'Counting',
            problems: [
                {
                    id: '26-1',
                    title: 'Counting Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '26-2',
                    title: 'Counting Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '26-3',
                    title: 'Counting Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '26-4',
                    title: 'Counting Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '26-5',
                    title: 'Counting Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '26-6',
                    title: 'Exercise 26.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '27',
            title: 'Discrete Probability',
            problems: [
                {
                    id: '27-1',
                    title: 'Discrete Probability Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '27-2',
                    title: 'Discrete Probability Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '27-3',
                    title: 'Discrete Probability Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '27-4',
                    title: 'Discrete Probability Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '27-5',
                    title: 'Discrete Probability Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '27-6',
                    title: 'Exercise 27.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '28',
            title: 'Number Theory',
            problems: [
                {
                    id: '28-1',
                    title: 'Number Theory Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '28-2',
                    title: 'Number Theory Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '28-3',
                    title: 'Number Theory Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '28-4',
                    title: 'Number Theory Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '28-5',
                    title: 'Number Theory Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '28-6',
                    title: 'Exercise 28.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '29',
            title: 'Counting',
            summary: 'Counting concepts and practice',
            problems: [
                {
                    id: '29-1',
                    title: 'Counting Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '29-2',
                    title: 'Counting Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '29-3',
                    title: 'Counting Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '29-4',
                    title: 'Counting Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '29-5',
                    title: 'Counting Problem 5',
                    difficulty: 'Hard',
                },
            ],
        },
        {
            num: '30',
            title: 'Discrete Probability',
            summary: 'Discrete Probability concepts and practice',
            problems: [
                {
                    id: '30-1',
                    title: 'Discrete Probability Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '30-2',
                    title: 'Discrete Probability Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '30-3',
                    title: 'Discrete Probability Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '30-4',
                    title: 'Discrete Probability Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '30-5',
                    title: 'Discrete Probability Problem 5',
                    difficulty: 'Hard',
                },
            ],
        },
        {
            num: '31',
            title: 'Number Theory',
            summary: 'Number Theory concepts and practice',
            problems: [
                {
                    id: '31-1',
                    title: 'Number Theory Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '31-2',
                    title: 'Number Theory Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '31-3',
                    title: 'Number Theory Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '31-4',
                    title: 'Number Theory Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '31-5',
                    title: 'Number Theory Problem 5',
                    difficulty: 'Hard',
                },
            ],
        },
    ],
}

// ─── SETSLOGIC ──────────────────────────────────────────────────────────────
const setslogic: Book = {
    slug: 'setslogic',
    title: 'Sets, Logic and Maths for Computing',
    shortTitle: 'Sets & Logic',
    author: 'John MacInnes',
    edition: '3rd',
    year: 2020,
    coverUrl: '/assets/books/cover-setslogic.jpg',
    color: '#0284c7',
    accentColor: '#38bdf8',
    description: 'An accessible introduction to the mathematical foundations of computing: set theory, logic, induction, relations, functions, and counting.',
    totalProblems: 130,
    tags: [
          'Math',
          'Logic',
          'Sets',
          'Foundations'
        ],
    chapters: [
        {
            num: '1',
            title: 'Sets',
            page: 1,
            problems: [
                {
                    id: '1.1',
                    title: 'Prove De Morgan\'s laws for sets',
                    difficulty: 'Easy',
                    tags: [
                                          'Sets'
                                        ],
                },
                {
                    id: '1.2',
                    title: 'Compute power set of a small set',
                    difficulty: 'Easy',
                    tags: [
                                          'Sets'
                                        ],
                },
                {
                    id: '1.3',
                    title: 'Prove that (A-B) union (B-A) = (A union B) - (A intersect B)',
                    difficulty: 'Medium',
                    tags: [
                                          'Sets'
                                        ],
                },
                {
                    id: '1-4',
                    title: 'Exercise 1.4',
                    difficulty: 'Medium',
                },
                {
                    id: '1-5',
                    title: 'Exercise 1.5',
                    difficulty: 'Hard',
                },
                {
                    id: '1-6',
                    title: 'Exercise 1.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '2',
            title: 'Logic',
            page: 35,
            problems: [
                {
                    id: '2.1',
                    title: 'Build truth tables for basic logical operators',
                    difficulty: 'Easy',
                    tags: [
                                          'Logic'
                                        ],
                },
                {
                    id: '2.2',
                    title: 'Prove De Morgan\'s laws for logic',
                    difficulty: 'Easy',
                    tags: [
                                          'Logic'
                                        ],
                },
                {
                    id: '2.3',
                    title: 'Convert English sentences to predicate logic',
                    difficulty: 'Medium',
                    tags: [
                                          'Logic'
                                        ],
                },
                {
                    id: '2-4',
                    title: 'Exercise 2.4',
                    difficulty: 'Medium',
                },
                {
                    id: '2-5',
                    title: 'Exercise 2.5',
                    difficulty: 'Hard',
                },
                {
                    id: '2-6',
                    title: 'Exercise 2.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '3',
            title: 'Relations',
            page: 65,
            problems: [
                {
                    id: '3.1',
                    title: 'Check if a relation is reflexive, symmetric, transitive',
                    difficulty: 'Easy',
                    tags: [
                                          'Relations'
                                        ],
                },
                {
                    id: '3.2',
                    title: 'Find equivalence classes of a given equivalence relation',
                    difficulty: 'Medium',
                    tags: [
                                          'Relations'
                                        ],
                },
                {
                    id: '3.3',
                    title: 'Draw a Hasse diagram for a partial order',
                    difficulty: 'Medium',
                    tags: [
                                          'Relations'
                                        ],
                },
                {
                    id: '3-4',
                    title: 'Exercise 3.4',
                    difficulty: 'Medium',
                },
                {
                    id: '3-5',
                    title: 'Exercise 3.5',
                    difficulty: 'Hard',
                },
                {
                    id: '3-6',
                    title: 'Exercise 3.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '4',
            title: 'Functions',
            page: 90,
            problems: [
                {
                    id: '4.1',
                    title: 'Determine if a function is injective/surjective/bijective',
                    difficulty: 'Easy',
                    tags: [
                                          'Functions'
                                        ],
                },
                {
                    id: '4.2',
                    title: 'Prove Cantor\'s diagonal argument',
                    difficulty: 'Hard',
                    tags: [
                                          'Functions',
                                          'Infinity'
                                        ],
                },
                {
                    id: '4.3',
                    title: 'Show bijection between natural and rational numbers',
                    difficulty: 'Hard',
                    tags: [
                                          'Functions',
                                          'Infinity'
                                        ],
                },
                {
                    id: '4-4',
                    title: 'Exercise 4.4',
                    difficulty: 'Medium',
                },
                {
                    id: '4-5',
                    title: 'Exercise 4.5',
                    difficulty: 'Hard',
                },
                {
                    id: '4-6',
                    title: 'Exercise 4.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '5',
            title: 'Induction',
            page: 115,
            problems: [
                {
                    id: '5.1',
                    title: 'Prove sum of squares formula by induction',
                    difficulty: 'Easy',
                    tags: [
                                          'Induction'
                                        ],
                },
                {
                    id: '5.2',
                    title: 'Prove that n^3 + 2n is divisible by 3 for all n',
                    difficulty: 'Medium',
                    tags: [
                                          'Induction'
                                        ],
                },
                {
                    id: '5.3',
                    title: 'Prove Fibonacci upper bound using strong induction',
                    difficulty: 'Medium',
                    tags: [
                                          'Induction'
                                        ],
                },
                {
                    id: '5-4',
                    title: 'Exercise 5.4',
                    difficulty: 'Medium',
                },
                {
                    id: '5-5',
                    title: 'Exercise 5.5',
                    difficulty: 'Hard',
                },
                {
                    id: '5-6',
                    title: 'Exercise 5.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '6',
            title: 'Counting',
            page: 140,
            problems: [
                {
                    id: '6.1',
                    title: 'Count ways to arrange distinct objects',
                    difficulty: 'Easy',
                    tags: [
                                          'Counting'
                                        ],
                },
                {
                    id: '6.2',
                    title: 'Prove binomial theorem',
                    difficulty: 'Medium',
                    tags: [
                                          'Counting'
                                        ],
                },
                {
                    id: '6.3',
                    title: 'Count number of subsets of various sizes',
                    difficulty: 'Easy',
                    tags: [
                                          'Counting'
                                        ],
                },
                {
                    id: '6-4',
                    title: 'Exercise 6.4',
                    difficulty: 'Medium',
                },
                {
                    id: '6-5',
                    title: 'Exercise 6.5',
                    difficulty: 'Hard',
                },
                {
                    id: '6-6',
                    title: 'Exercise 6.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '7',
            title: 'Functions',
            problems: [
                {
                    id: '7-1',
                    title: 'Functions Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '7-2',
                    title: 'Functions Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '7-3',
                    title: 'Functions Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '7-4',
                    title: 'Functions Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '7-5',
                    title: 'Functions Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '7-6',
                    title: 'Exercise 7.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '8',
            title: 'Mathematical Induction',
            problems: [
                {
                    id: '8-1',
                    title: 'Mathematical Induction Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '8-2',
                    title: 'Mathematical Induction Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '8-3',
                    title: 'Mathematical Induction Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '8-4',
                    title: 'Mathematical Induction Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '8-5',
                    title: 'Mathematical Induction Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '8-6',
                    title: 'Exercise 8.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '9',
            title: 'Functions',
            problems: [
                {
                    id: '9-1',
                    title: 'Functions Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '9-2',
                    title: 'Functions Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '9-3',
                    title: 'Functions Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '9-4',
                    title: 'Functions Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '9-5',
                    title: 'Functions Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '9-6',
                    title: 'Exercise 9.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '10',
            title: 'Mathematical Induction',
            problems: [
                {
                    id: '10-1',
                    title: 'Mathematical Induction Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '10-2',
                    title: 'Mathematical Induction Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '10-3',
                    title: 'Mathematical Induction Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '10-4',
                    title: 'Mathematical Induction Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '10-5',
                    title: 'Mathematical Induction Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '10-6',
                    title: 'Exercise 10.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '11',
            title: 'Functions',
            problems: [
                {
                    id: '11-1',
                    title: 'Functions Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '11-2',
                    title: 'Functions Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '11-3',
                    title: 'Functions Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '11-4',
                    title: 'Functions Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '11-5',
                    title: 'Functions Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '11-6',
                    title: 'Exercise 11.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '12',
            title: 'Mathematical Induction',
            problems: [
                {
                    id: '12-1',
                    title: 'Mathematical Induction Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '12-2',
                    title: 'Mathematical Induction Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '12-3',
                    title: 'Mathematical Induction Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '12-4',
                    title: 'Mathematical Induction Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '12-5',
                    title: 'Mathematical Induction Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '12-6',
                    title: 'Exercise 12.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '13',
            title: 'Functions',
            problems: [
                {
                    id: '13-1',
                    title: 'Functions Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '13-2',
                    title: 'Functions Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '13-3',
                    title: 'Functions Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '13-4',
                    title: 'Functions Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '13-5',
                    title: 'Functions Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '13-6',
                    title: 'Exercise 13.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '14',
            title: 'Mathematical Induction',
            problems: [
                {
                    id: '14-1',
                    title: 'Mathematical Induction Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '14-2',
                    title: 'Mathematical Induction Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '14-3',
                    title: 'Mathematical Induction Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '14-4',
                    title: 'Mathematical Induction Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '14-5',
                    title: 'Mathematical Induction Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '14-6',
                    title: 'Exercise 14.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '15',
            title: 'Functions',
            problems: [
                {
                    id: '15-1',
                    title: 'Functions Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '15-2',
                    title: 'Functions Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '15-3',
                    title: 'Functions Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '15-4',
                    title: 'Functions Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '15-5',
                    title: 'Functions Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '15-6',
                    title: 'Exercise 15.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '16',
            title: 'Mathematical Induction',
            problems: [
                {
                    id: '16-1',
                    title: 'Mathematical Induction Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '16-2',
                    title: 'Mathematical Induction Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '16-3',
                    title: 'Mathematical Induction Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '16-4',
                    title: 'Mathematical Induction Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '16-5',
                    title: 'Mathematical Induction Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '16-6',
                    title: 'Exercise 16.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '17',
            title: 'Functions',
            problems: [
                {
                    id: '17-1',
                    title: 'Functions Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '17-2',
                    title: 'Functions Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '17-3',
                    title: 'Functions Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '17-4',
                    title: 'Functions Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '17-5',
                    title: 'Functions Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '17-6',
                    title: 'Exercise 17.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '18',
            title: 'Mathematical Induction',
            problems: [
                {
                    id: '18-1',
                    title: 'Mathematical Induction Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '18-2',
                    title: 'Mathematical Induction Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '18-3',
                    title: 'Mathematical Induction Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '18-4',
                    title: 'Mathematical Induction Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '18-5',
                    title: 'Mathematical Induction Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '18-6',
                    title: 'Exercise 18.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '19',
            title: 'Functions',
            problems: [
                {
                    id: '19-1',
                    title: 'Functions Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '19-2',
                    title: 'Functions Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '19-3',
                    title: 'Functions Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '19-4',
                    title: 'Functions Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '19-5',
                    title: 'Functions Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '19-6',
                    title: 'Exercise 19.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '20',
            title: 'Mathematical Induction',
            problems: [
                {
                    id: '20-1',
                    title: 'Mathematical Induction Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '20-2',
                    title: 'Mathematical Induction Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '20-3',
                    title: 'Mathematical Induction Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '20-4',
                    title: 'Mathematical Induction Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '20-5',
                    title: 'Mathematical Induction Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '20-6',
                    title: 'Exercise 20.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '21',
            title: 'Functions',
            summary: 'Functions concepts and practice',
            problems: [
                {
                    id: '21-1',
                    title: 'Functions Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '21-2',
                    title: 'Functions Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '21-3',
                    title: 'Functions Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '21-4',
                    title: 'Functions Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '21-5',
                    title: 'Functions Problem 5',
                    difficulty: 'Hard',
                },
            ],
        },
        {
            num: '22',
            title: 'Mathematical Induction',
            summary: 'Mathematical Induction concepts and practice',
            problems: [
                {
                    id: '22-1',
                    title: 'Mathematical Induction Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '22-2',
                    title: 'Mathematical Induction Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '22-3',
                    title: 'Mathematical Induction Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '22-4',
                    title: 'Mathematical Induction Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '22-5',
                    title: 'Mathematical Induction Problem 5',
                    difficulty: 'Hard',
                },
            ],
        },
    ],
}

// ─── ALGODAILY ──────────────────────────────────────────────────────────────
const algodaily: Book = {
    slug: 'algodaily',
    title: 'The AlgoDaily Book — Core Essentials',
    shortTitle: 'AlgoDaily',
    author: 'Jacob Zhang',
    year: 2021,
    color: '#7c3aed',
    accentColor: '#a78bfa',
    description: 'A curated collection of algorithmic and data structure problems with comprehensive explanations. Covers arrays, strings, trees, dynamic programming, and more.',
    totalProblems: 143,
    tags: [
          'Interviews',
          'Algorithms',
          'Data Structures'
        ],
    chapters: [
        {
            num: '1',
            title: 'Arrays and Strings',
            page: 1,
            problems: [
                {
                    id: '1.1',
                    title: 'Two sum problem',
                    difficulty: 'Easy',
                    tags: [
                                          'Arrays',
                                          'Hash'
                                        ],
                },
                {
                    id: '1.2',
                    title: 'Reverse an integer',
                    difficulty: 'Easy',
                    tags: [
                                          'Math'
                                        ],
                },
                {
                    id: '1.3',
                    title: 'Valid anagram',
                    difficulty: 'Easy',
                    tags: [
                                          'Strings'
                                        ],
                },
                {
                    id: '1.4',
                    title: 'First non-repeating character',
                    difficulty: 'Easy',
                    tags: [
                                          'Strings',
                                          'Hash'
                                        ],
                },
                {
                    id: '1-5',
                    title: 'Exercise 1.5',
                    difficulty: 'Hard',
                },
                {
                    id: '1-6',
                    title: 'Exercise 1.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '2',
            title: 'Linked Lists',
            page: 35,
            problems: [
                {
                    id: '2.1',
                    title: 'Reverse a linked list (iterative + recursive)',
                    difficulty: 'Easy',
                    tags: [
                                          'LinkedList'
                                        ],
                },
                {
                    id: '2.2',
                    title: 'Remove nth node from end',
                    difficulty: 'Medium',
                    tags: [
                                          'LinkedList',
                                          'TwoPointers'
                                        ],
                },
                {
                    id: '2.3',
                    title: 'Reorder list',
                    difficulty: 'Medium',
                    tags: [
                                          'LinkedList'
                                        ],
                },
                {
                    id: '2-4',
                    title: 'Exercise 2.4',
                    difficulty: 'Medium',
                },
                {
                    id: '2-5',
                    title: 'Exercise 2.5',
                    difficulty: 'Hard',
                },
                {
                    id: '2-6',
                    title: 'Exercise 2.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '3',
            title: 'Trees and Graphs',
            page: 65,
            problems: [
                {
                    id: '3.1',
                    title: 'Maximum depth of binary tree',
                    difficulty: 'Easy',
                    tags: [
                                          'Tree'
                                        ],
                },
                {
                    id: '3.2',
                    title: 'Validate binary search tree',
                    difficulty: 'Medium',
                    tags: [
                                          'Tree',
                                          'BST'
                                        ],
                },
                {
                    id: '3.3',
                    title: 'Binary tree level order traversal',
                    difficulty: 'Medium',
                    tags: [
                                          'Tree',
                                          'BFS'
                                        ],
                },
                {
                    id: '3.4',
                    title: 'Number of connected components in graph',
                    difficulty: 'Medium',
                    tags: [
                                          'Graph',
                                          'DFS'
                                        ],
                },
                {
                    id: '3-5',
                    title: 'Exercise 3.5',
                    difficulty: 'Hard',
                },
                {
                    id: '3-6',
                    title: 'Exercise 3.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '4',
            title: 'Sorting and Searching',
            page: 95,
            problems: [
                {
                    id: '4.1',
                    title: 'Binary search implementation',
                    difficulty: 'Easy',
                    tags: [
                                          'BinarySearch'
                                        ],
                },
                {
                    id: '4.2',
                    title: 'Search in rotated sorted array',
                    difficulty: 'Medium',
                    tags: [
                                          'BinarySearch'
                                        ],
                },
                {
                    id: '4.3',
                    title: 'Merge intervals',
                    difficulty: 'Medium',
                    tags: [
                                          'Sorting'
                                        ],
                },
                {
                    id: '4.4',
                    title: 'Find K closest elements',
                    difficulty: 'Medium',
                    tags: [
                                          'BinarySearch'
                                        ],
                },
                {
                    id: '4-5',
                    title: 'Exercise 4.5',
                    difficulty: 'Hard',
                },
                {
                    id: '4-6',
                    title: 'Exercise 4.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '5',
            title: 'Dynamic Programming',
            page: 130,
            problems: [
                {
                    id: '5.1',
                    title: 'Climbing stairs',
                    difficulty: 'Easy',
                    tags: [
                                          'DP'
                                        ],
                },
                {
                    id: '5.2',
                    title: 'House robber',
                    difficulty: 'Medium',
                    tags: [
                                          'DP'
                                        ],
                },
                {
                    id: '5.3',
                    title: 'Coin change',
                    difficulty: 'Medium',
                    tags: [
                                          'DP'
                                        ],
                },
                {
                    id: '5.4',
                    title: 'Longest palindromic substring',
                    difficulty: 'Hard',
                    tags: [
                                          'DP',
                                          'Strings'
                                        ],
                },
                {
                    id: '5-5',
                    title: 'Exercise 5.5',
                    difficulty: 'Hard',
                },
                {
                    id: '5-6',
                    title: 'Exercise 5.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '6',
            title: 'Stacks and Queues',
            page: 160,
            problems: [
                {
                    id: '6.1',
                    title: 'Valid parentheses',
                    difficulty: 'Easy',
                    tags: [
                                          'Stack'
                                        ],
                },
                {
                    id: '6.2',
                    title: 'Min stack',
                    difficulty: 'Easy',
                    tags: [
                                          'Stack'
                                        ],
                },
                {
                    id: '6.3',
                    title: 'Implement queue using stacks',
                    difficulty: 'Easy',
                    tags: [
                                          'Stack',
                                          'Queue'
                                        ],
                },
                {
                    id: '6-4',
                    title: 'Exercise 6.4',
                    difficulty: 'Medium',
                },
                {
                    id: '6-5',
                    title: 'Exercise 6.5',
                    difficulty: 'Hard',
                },
                {
                    id: '6-6',
                    title: 'Exercise 6.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '7',
            title: 'Recursion and Backtracking',
            page: 185,
            problems: [
                {
                    id: '7.1',
                    title: 'Generate all subsets',
                    difficulty: 'Medium',
                    tags: [
                                          'Backtracking'
                                        ],
                },
                {
                    id: '7.2',
                    title: 'Generate all permutations',
                    difficulty: 'Medium',
                    tags: [
                                          'Backtracking'
                                        ],
                },
                {
                    id: '7.3',
                    title: 'N-Queens problem',
                    difficulty: 'Hard',
                    tags: [
                                          'Backtracking'
                                        ],
                },
                {
                    id: '7-4',
                    title: 'Exercise 7.4',
                    difficulty: 'Medium',
                },
                {
                    id: '7-5',
                    title: 'Exercise 7.5',
                    difficulty: 'Hard',
                },
                {
                    id: '7-6',
                    title: 'Exercise 7.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '8',
            title: 'Miscellaneous',
            page: 210,
            problems: [
                {
                    id: '8.1',
                    title: 'Count number of 1 bits',
                    difficulty: 'Easy',
                    tags: [
                                          'BitManipulation'
                                        ],
                },
                {
                    id: '8.2',
                    title: 'Missing number in array',
                    difficulty: 'Easy',
                    tags: [
                                          'BitManipulation'
                                        ],
                },
                {
                    id: '8.3',
                    title: 'Design a URL shortener',
                    difficulty: 'Medium',
                    tags: [
                                          'SystemDesign'
                                        ],
                },
                {
                    id: '8.4',
                    title: 'Implement a T9 autocomplete system',
                    difficulty: 'Hard',
                    tags: [
                                          'Trie'
                                        ],
                },
                {
                    id: '8-5',
                    title: 'Exercise 8.5',
                    difficulty: 'Hard',
                },
                {
                    id: '8-6',
                    title: 'Exercise 8.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '9',
            title: 'Advanced Sorting',
            problems: [
                {
                    id: '9-1',
                    title: 'Advanced Sorting Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '9-2',
                    title: 'Advanced Sorting Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '9-3',
                    title: 'Advanced Sorting Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '9-4',
                    title: 'Advanced Sorting Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '9-5',
                    title: 'Advanced Sorting Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '9-6',
                    title: 'Exercise 9.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '10',
            title: 'Dynamic Programming',
            problems: [
                {
                    id: '10-1',
                    title: 'Dynamic Programming Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '10-2',
                    title: 'Dynamic Programming Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '10-3',
                    title: 'Dynamic Programming Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '10-4',
                    title: 'Dynamic Programming Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '10-5',
                    title: 'Dynamic Programming Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '10-6',
                    title: 'Dynamic Programming Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '11',
            title: 'Advanced Sorting',
            problems: [
                {
                    id: '11-1',
                    title: 'Advanced Sorting Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '11-2',
                    title: 'Advanced Sorting Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '11-3',
                    title: 'Advanced Sorting Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '11-4',
                    title: 'Advanced Sorting Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '11-5',
                    title: 'Advanced Sorting Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '11-6',
                    title: 'Exercise 11.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '12',
            title: 'Dynamic Programming',
            problems: [
                {
                    id: '12-1',
                    title: 'Dynamic Programming Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '12-2',
                    title: 'Dynamic Programming Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '12-3',
                    title: 'Dynamic Programming Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '12-4',
                    title: 'Dynamic Programming Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '12-5',
                    title: 'Dynamic Programming Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '12-6',
                    title: 'Dynamic Programming Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '13',
            title: 'Advanced Sorting',
            problems: [
                {
                    id: '13-1',
                    title: 'Advanced Sorting Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '13-2',
                    title: 'Advanced Sorting Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '13-3',
                    title: 'Advanced Sorting Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '13-4',
                    title: 'Advanced Sorting Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '13-5',
                    title: 'Advanced Sorting Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '13-6',
                    title: 'Exercise 13.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '14',
            title: 'Dynamic Programming',
            problems: [
                {
                    id: '14-1',
                    title: 'Dynamic Programming Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '14-2',
                    title: 'Dynamic Programming Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '14-3',
                    title: 'Dynamic Programming Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '14-4',
                    title: 'Dynamic Programming Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '14-5',
                    title: 'Dynamic Programming Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '14-6',
                    title: 'Dynamic Programming Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '15',
            title: 'Advanced Sorting',
            problems: [
                {
                    id: '15-1',
                    title: 'Advanced Sorting Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '15-2',
                    title: 'Advanced Sorting Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '15-3',
                    title: 'Advanced Sorting Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '15-4',
                    title: 'Advanced Sorting Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '15-5',
                    title: 'Advanced Sorting Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '15-6',
                    title: 'Exercise 15.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '16',
            title: 'Dynamic Programming',
            problems: [
                {
                    id: '16-1',
                    title: 'Dynamic Programming Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '16-2',
                    title: 'Dynamic Programming Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '16-3',
                    title: 'Dynamic Programming Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '16-4',
                    title: 'Dynamic Programming Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '16-5',
                    title: 'Dynamic Programming Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '16-6',
                    title: 'Dynamic Programming Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '17',
            title: 'Advanced Sorting',
            problems: [
                {
                    id: '17-1',
                    title: 'Advanced Sorting Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '17-2',
                    title: 'Advanced Sorting Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '17-3',
                    title: 'Advanced Sorting Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '17-4',
                    title: 'Advanced Sorting Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '17-5',
                    title: 'Advanced Sorting Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '17-6',
                    title: 'Exercise 17.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '18',
            title: 'Dynamic Programming',
            problems: [
                {
                    id: '18-1',
                    title: 'Dynamic Programming Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '18-2',
                    title: 'Dynamic Programming Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '18-3',
                    title: 'Dynamic Programming Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '18-4',
                    title: 'Dynamic Programming Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '18-5',
                    title: 'Dynamic Programming Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '18-6',
                    title: 'Dynamic Programming Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '19',
            title: 'Advanced Sorting',
            problems: [
                {
                    id: '19-1',
                    title: 'Advanced Sorting Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '19-2',
                    title: 'Advanced Sorting Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '19-3',
                    title: 'Advanced Sorting Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '19-4',
                    title: 'Advanced Sorting Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '19-5',
                    title: 'Advanced Sorting Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '19-6',
                    title: 'Exercise 19.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '20',
            title: 'Dynamic Programming',
            problems: [
                {
                    id: '20-1',
                    title: 'Dynamic Programming Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '20-2',
                    title: 'Dynamic Programming Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '20-3',
                    title: 'Dynamic Programming Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '20-4',
                    title: 'Dynamic Programming Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '20-5',
                    title: 'Dynamic Programming Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '20-6',
                    title: 'Dynamic Programming Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '21',
            title: 'Advanced Sorting',
            problems: [
                {
                    id: '21-1',
                    title: 'Advanced Sorting Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '21-2',
                    title: 'Advanced Sorting Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '21-3',
                    title: 'Advanced Sorting Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '21-4',
                    title: 'Advanced Sorting Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '21-5',
                    title: 'Advanced Sorting Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '21-6',
                    title: 'Exercise 21.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '22',
            title: 'Dynamic Programming',
            problems: [
                {
                    id: '22-1',
                    title: 'Dynamic Programming Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '22-2',
                    title: 'Dynamic Programming Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '22-3',
                    title: 'Dynamic Programming Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '22-4',
                    title: 'Dynamic Programming Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '22-5',
                    title: 'Dynamic Programming Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '22-6',
                    title: 'Dynamic Programming Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '23',
            title: 'Advanced Sorting',
            summary: 'Advanced Sorting concepts and practice',
            problems: [
                {
                    id: '23-1',
                    title: 'Advanced Sorting Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '23-2',
                    title: 'Advanced Sorting Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '23-3',
                    title: 'Advanced Sorting Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '23-4',
                    title: 'Advanced Sorting Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '23-5',
                    title: 'Advanced Sorting Problem 5',
                    difficulty: 'Hard',
                },
            ],
        },
        {
            num: '24',
            title: 'Dynamic Programming',
            summary: 'Dynamic Programming concepts and practice',
            problems: [
                {
                    id: '24-1',
                    title: 'Dynamic Programming Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '24-2',
                    title: 'Dynamic Programming Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '24-3',
                    title: 'Dynamic Programming Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '24-4',
                    title: 'Dynamic Programming Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '24-5',
                    title: 'Dynamic Programming Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '24-6',
                    title: 'Dynamic Programming Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
    ],
}

// ─── GUIDETOCP ──────────────────────────────────────────────────────────────
const guidetocp: Book = {
    slug: 'guidetocp',
    title: 'Guide to Competitive Programming',
    shortTitle: 'Guide to CP',
    author: 'Antti Laaksonen',
    edition: '2nd',
    year: 2020,
    coverUrl: '/assets/books/cover-guidetocp.jpg',
    color: '#4d7c0f',
    accentColor: '#84cc16',
    description: 'A concise yet comprehensive guide to competitive programming. Covers essential algorithms, optimization techniques, and contest strategies.',
    totalProblems: 143,
    tags: [
          'Competitive',
          'Algorithms',
          'CSES',
          'Optimization'
        ],
    chapters: [
        {
            num: '1',
            title: 'Introduction',
            page: 1,
            problems: [
                {
                    id: '1.1',
                    title: 'Implement fast I/O for your language',
                    difficulty: 'Easy',
                    tags: [
                                          'IO'
                                        ],
                },
                {
                    id: '1.2',
                    title: 'Analyze time complexity of nested loops',
                    difficulty: 'Easy',
                    tags: [
                                          'BigO'
                                        ],
                },
                {
                    id: '1-3',
                    title: 'Exercise 1.3',
                    difficulty: 'Medium',
                },
                {
                    id: '1-4',
                    title: 'Exercise 1.4',
                    difficulty: 'Medium',
                },
                {
                    id: '1-5',
                    title: 'Exercise 1.5',
                    difficulty: 'Hard',
                },
                {
                    id: '1-6',
                    title: 'Exercise 1.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '2',
            title: 'Data Structures',
            page: 25,
            problems: [
                {
                    id: '2.1',
                    title: 'Implement range sum with Fenwick tree',
                    difficulty: 'Medium',
                    tags: [
                                          'FenwickTree'
                                        ],
                },
                {
                    id: '2.2',
                    title: 'Implement range minimum with segment tree',
                    difficulty: 'Medium',
                    tags: [
                                          'SegTree'
                                        ],
                },
                {
                    id: '2.3',
                    title: 'Implement union-find with path compression',
                    difficulty: 'Easy',
                    tags: [
                                          'UnionFind'
                                        ],
                },
                {
                    id: '2-4',
                    title: 'Exercise 2.4',
                    difficulty: 'Medium',
                },
                {
                    id: '2-5',
                    title: 'Exercise 2.5',
                    difficulty: 'Hard',
                },
                {
                    id: '2-6',
                    title: 'Exercise 2.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '3',
            title: 'Advanced Topics',
            page: 55,
            problems: [
                {
                    id: '3.1',
                    title: 'Implement Mo\'s algorithm for range queries',
                    difficulty: 'Hard',
                    tags: [
                                          'Mo'
                                        ],
                },
                {
                    id: '3.2',
                    title: 'SQRT decomposition on array',
                    difficulty: 'Medium',
                    tags: [
                                          'SqrtDecomp'
                                        ],
                },
                {
                    id: '3.3',
                    title: 'Implement implicit treap',
                    difficulty: 'Hard',
                    tags: [
                                          'Treap'
                                        ],
                },
                {
                    id: '3-4',
                    title: 'Exercise 3.4',
                    difficulty: 'Medium',
                },
                {
                    id: '3-5',
                    title: 'Exercise 3.5',
                    difficulty: 'Hard',
                },
                {
                    id: '3-6',
                    title: 'Exercise 3.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '4',
            title: 'Graph Algorithms',
            page: 85,
            problems: [
                {
                    id: '4.1',
                    title: 'Implement Dijkstra with priority queue',
                    difficulty: 'Medium',
                    tags: [
                                          'Graph',
                                          'Dijkstra'
                                        ],
                },
                {
                    id: '4.2',
                    title: 'Find strongly connected components with Kosaraju',
                    difficulty: 'Medium',
                    tags: [
                                          'Graph',
                                          'SCC'
                                        ],
                },
                {
                    id: '4.3',
                    title: 'Minimum spanning tree (Kruskal)',
                    difficulty: 'Medium',
                    tags: [
                                          'Graph',
                                          'MST'
                                        ],
                },
                {
                    id: '4-4',
                    title: 'Exercise 4.4',
                    difficulty: 'Medium',
                },
                {
                    id: '4-5',
                    title: 'Exercise 4.5',
                    difficulty: 'Hard',
                },
                {
                    id: '4-6',
                    title: 'Exercise 4.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '5',
            title: 'Range Queries',
            page: 115,
            problems: [
                {
                    id: '5.1',
                    title: 'Lazy propagation on segment tree',
                    difficulty: 'Hard',
                    tags: [
                                          'SegTree',
                                          'LazyProp'
                                        ],
                },
                {
                    id: '5.2',
                    title: 'Range kth smallest with merge sort tree',
                    difficulty: 'Hard',
                    tags: [
                                          'SegTree'
                                        ],
                },
                {
                    id: '5-3',
                    title: 'Exercise 5.3',
                    difficulty: 'Medium',
                },
                {
                    id: '5-4',
                    title: 'Exercise 5.4',
                    difficulty: 'Medium',
                },
                {
                    id: '5-5',
                    title: 'Exercise 5.5',
                    difficulty: 'Hard',
                },
                {
                    id: '5-6',
                    title: 'Exercise 5.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '6',
            title: 'Dynamic Programming',
            page: 140,
            problems: [
                {
                    id: '6.1',
                    title: 'Convex hull trick for DP optimization',
                    difficulty: 'Hard',
                    tags: [
                                          'DP',
                                          'CHT'
                                        ],
                },
                {
                    id: '6.2',
                    title: 'Divide-and-conquer DP optimization',
                    difficulty: 'Hard',
                    tags: [
                                          'DP',
                                          'D&C'
                                        ],
                },
                {
                    id: '6-3',
                    title: 'Exercise 6.3',
                    difficulty: 'Medium',
                },
                {
                    id: '6-4',
                    title: 'Exercise 6.4',
                    difficulty: 'Medium',
                },
                {
                    id: '6-5',
                    title: 'Exercise 6.5',
                    difficulty: 'Hard',
                },
                {
                    id: '6-6',
                    title: 'Exercise 6.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '7',
            title: 'Mathematics',
            page: 170,
            problems: [
                {
                    id: '7.1',
                    title: 'Modular exponentiation',
                    difficulty: 'Easy',
                    tags: [
                                          'Math'
                                        ],
                },
                {
                    id: '7.2',
                    title: 'Linear Diophantine equation with extended Euclid',
                    difficulty: 'Medium',
                    tags: [
                                          'NumberTheory'
                                        ],
                },
                {
                    id: '7.3',
                    title: 'Matrix exponentiation for linear recurrences',
                    difficulty: 'Medium',
                    tags: [
                                          'MatrixExp'
                                        ],
                },
                {
                    id: '7-4',
                    title: 'Exercise 7.4',
                    difficulty: 'Medium',
                },
                {
                    id: '7-5',
                    title: 'Exercise 7.5',
                    difficulty: 'Hard',
                },
                {
                    id: '7-6',
                    title: 'Exercise 7.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '8',
            title: 'String Algorithms',
            page: 200,
            problems: [
                {
                    id: '8.1',
                    title: 'Implement Z-algorithm for pattern matching',
                    difficulty: 'Medium',
                    tags: [
                                          'Strings'
                                        ],
                },
                {
                    id: '8.2',
                    title: 'Build and use suffix array',
                    difficulty: 'Hard',
                    tags: [
                                          'Strings',
                                          'SuffixArray'
                                        ],
                },
                {
                    id: '8-3',
                    title: 'Exercise 8.3',
                    difficulty: 'Medium',
                },
                {
                    id: '8-4',
                    title: 'Exercise 8.4',
                    difficulty: 'Medium',
                },
                {
                    id: '8-5',
                    title: 'Exercise 8.5',
                    difficulty: 'Hard',
                },
                {
                    id: '8-6',
                    title: 'Exercise 8.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '9',
            title: 'Number Theory',
            problems: [
                {
                    id: '9-1',
                    title: 'Number Theory Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '9-2',
                    title: 'Number Theory Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '9-3',
                    title: 'Number Theory Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '9-4',
                    title: 'Number Theory Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '9-5',
                    title: 'Number Theory Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '9-6',
                    title: 'Number Theory Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '10',
            title: 'Game Theory',
            problems: [
                {
                    id: '10-1',
                    title: 'Game Theory Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '10-2',
                    title: 'Game Theory Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '10-3',
                    title: 'Game Theory Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '10-4',
                    title: 'Game Theory Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '10-5',
                    title: 'Game Theory Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '10-6',
                    title: 'Exercise 10.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '11',
            title: 'Number Theory',
            problems: [
                {
                    id: '11-1',
                    title: 'Number Theory Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '11-2',
                    title: 'Number Theory Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '11-3',
                    title: 'Number Theory Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '11-4',
                    title: 'Number Theory Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '11-5',
                    title: 'Number Theory Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '11-6',
                    title: 'Number Theory Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '12',
            title: 'Game Theory',
            problems: [
                {
                    id: '12-1',
                    title: 'Game Theory Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '12-2',
                    title: 'Game Theory Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '12-3',
                    title: 'Game Theory Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '12-4',
                    title: 'Game Theory Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '12-5',
                    title: 'Game Theory Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '12-6',
                    title: 'Exercise 12.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '13',
            title: 'Number Theory',
            problems: [
                {
                    id: '13-1',
                    title: 'Number Theory Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '13-2',
                    title: 'Number Theory Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '13-3',
                    title: 'Number Theory Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '13-4',
                    title: 'Number Theory Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '13-5',
                    title: 'Number Theory Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '13-6',
                    title: 'Number Theory Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '14',
            title: 'Game Theory',
            problems: [
                {
                    id: '14-1',
                    title: 'Game Theory Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '14-2',
                    title: 'Game Theory Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '14-3',
                    title: 'Game Theory Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '14-4',
                    title: 'Game Theory Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '14-5',
                    title: 'Game Theory Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '14-6',
                    title: 'Exercise 14.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '15',
            title: 'Number Theory',
            problems: [
                {
                    id: '15-1',
                    title: 'Number Theory Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '15-2',
                    title: 'Number Theory Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '15-3',
                    title: 'Number Theory Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '15-4',
                    title: 'Number Theory Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '15-5',
                    title: 'Number Theory Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '15-6',
                    title: 'Number Theory Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '16',
            title: 'Game Theory',
            problems: [
                {
                    id: '16-1',
                    title: 'Game Theory Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '16-2',
                    title: 'Game Theory Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '16-3',
                    title: 'Game Theory Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '16-4',
                    title: 'Game Theory Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '16-5',
                    title: 'Game Theory Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '16-6',
                    title: 'Exercise 16.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '17',
            title: 'Number Theory',
            problems: [
                {
                    id: '17-1',
                    title: 'Number Theory Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '17-2',
                    title: 'Number Theory Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '17-3',
                    title: 'Number Theory Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '17-4',
                    title: 'Number Theory Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '17-5',
                    title: 'Number Theory Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '17-6',
                    title: 'Number Theory Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '18',
            title: 'Game Theory',
            problems: [
                {
                    id: '18-1',
                    title: 'Game Theory Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '18-2',
                    title: 'Game Theory Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '18-3',
                    title: 'Game Theory Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '18-4',
                    title: 'Game Theory Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '18-5',
                    title: 'Game Theory Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '18-6',
                    title: 'Exercise 18.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '19',
            title: 'Number Theory',
            problems: [
                {
                    id: '19-1',
                    title: 'Number Theory Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '19-2',
                    title: 'Number Theory Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '19-3',
                    title: 'Number Theory Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '19-4',
                    title: 'Number Theory Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '19-5',
                    title: 'Number Theory Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '19-6',
                    title: 'Number Theory Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '20',
            title: 'Game Theory',
            problems: [
                {
                    id: '20-1',
                    title: 'Game Theory Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '20-2',
                    title: 'Game Theory Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '20-3',
                    title: 'Game Theory Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '20-4',
                    title: 'Game Theory Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '20-5',
                    title: 'Game Theory Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '20-6',
                    title: 'Exercise 20.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '21',
            title: 'Number Theory',
            problems: [
                {
                    id: '21-1',
                    title: 'Number Theory Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '21-2',
                    title: 'Number Theory Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '21-3',
                    title: 'Number Theory Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '21-4',
                    title: 'Number Theory Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '21-5',
                    title: 'Number Theory Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '21-6',
                    title: 'Number Theory Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '22',
            title: 'Game Theory',
            problems: [
                {
                    id: '22-1',
                    title: 'Game Theory Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '22-2',
                    title: 'Game Theory Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '22-3',
                    title: 'Game Theory Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '22-4',
                    title: 'Game Theory Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '22-5',
                    title: 'Game Theory Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '22-6',
                    title: 'Exercise 22.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '23',
            title: 'Number Theory',
            summary: 'Number Theory concepts and practice',
            problems: [
                {
                    id: '23-1',
                    title: 'Number Theory Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '23-2',
                    title: 'Number Theory Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '23-3',
                    title: 'Number Theory Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '23-4',
                    title: 'Number Theory Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '23-5',
                    title: 'Number Theory Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '23-6',
                    title: 'Number Theory Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '24',
            title: 'Game Theory',
            summary: 'Game Theory concepts and practice',
            problems: [
                {
                    id: '24-1',
                    title: 'Game Theory Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '24-2',
                    title: 'Game Theory Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '24-3',
                    title: 'Game Theory Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '24-4',
                    title: 'Game Theory Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '24-5',
                    title: 'Game Theory Problem 5',
                    difficulty: 'Hard',
                },
            ],
        },
    ],
}

// ─── GAMAM ──────────────────────────────────────────────────────────────
const gamam: Book = {
    slug: 'gamam',
    title: 'Cracking the GAMAM Technical Interviews',
    shortTitle: 'GAMAM',
    author: 'Anonymous Publisher',
    year: 2023,
    color: '#be185d',
    accentColor: '#f43f5e',
    description: 'A focused preparation guide for technical interviews at Google, Apple, Meta, Amazon, and Microsoft. Features curated problems and problem-solving frameworks.',
    totalProblems: 90,
    tags: [
          'Interviews',
          'FAANG',
          'GAMAM',
          'Big Tech'
        ],
    chapters: [
        {
            num: '1',
            title: 'Problem Solving Framework',
            page: 1,
            problems: [
                {
                    id: '1.1',
                    title: 'Two sum (all variants)',
                    difficulty: 'Easy',
                    tags: [
                                          'Arrays'
                                        ],
                },
                {
                    id: '1.2',
                    title: 'Container with most water',
                    difficulty: 'Medium',
                    tags: [
                                          'Arrays',
                                          'TwoPointers'
                                        ],
                },
                {
                    id: '1-3',
                    title: 'Exercise 1.3',
                    difficulty: 'Medium',
                },
                {
                    id: '1-4',
                    title: 'Exercise 1.4',
                    difficulty: 'Medium',
                },
                {
                    id: '1-5',
                    title: 'Exercise 1.5',
                    difficulty: 'Hard',
                },
                {
                    id: '1-6',
                    title: 'Exercise 1.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '2',
            title: 'Arrays and Strings',
            page: 30,
            problems: [
                {
                    id: '2.1',
                    title: 'Longest substring without repeating characters',
                    difficulty: 'Medium',
                    tags: [
                                          'SlidingWindow',
                                          'Strings'
                                        ],
                },
                {
                    id: '2.2',
                    title: 'Product of array except self',
                    difficulty: 'Medium',
                    tags: [
                                          'Arrays'
                                        ],
                },
                {
                    id: '2.3',
                    title: 'Trapping rain water',
                    difficulty: 'Hard',
                    tags: [
                                          'Arrays',
                                          'TwoPointers'
                                        ],
                },
                {
                    id: '2-4',
                    title: 'Exercise 2.4',
                    difficulty: 'Medium',
                },
                {
                    id: '2-5',
                    title: 'Exercise 2.5',
                    difficulty: 'Hard',
                },
                {
                    id: '2-6',
                    title: 'Exercise 2.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '3',
            title: 'Trees and Graphs',
            page: 55,
            problems: [
                {
                    id: '3.1',
                    title: 'Invert a binary tree',
                    difficulty: 'Easy',
                    tags: [
                                          'Tree'
                                        ],
                },
                {
                    id: '3.2',
                    title: 'Binary tree maximum path sum',
                    difficulty: 'Hard',
                    tags: [
                                          'Tree',
                                          'DFS'
                                        ],
                },
                {
                    id: '3.3',
                    title: 'Clone graph',
                    difficulty: 'Medium',
                    tags: [
                                          'Graph'
                                        ],
                },
                {
                    id: '3-4',
                    title: 'Exercise 3.4',
                    difficulty: 'Medium',
                },
                {
                    id: '3-5',
                    title: 'Exercise 3.5',
                    difficulty: 'Hard',
                },
                {
                    id: '3-6',
                    title: 'Exercise 3.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '4',
            title: 'Dynamic Programming',
            page: 80,
            problems: [
                {
                    id: '4.1',
                    title: 'Word break',
                    difficulty: 'Medium',
                    tags: [
                                          'DP'
                                        ],
                },
                {
                    id: '4.2',
                    title: 'Decode ways',
                    difficulty: 'Medium',
                    tags: [
                                          'DP'
                                        ],
                },
                {
                    id: '4.3',
                    title: 'Edit distance',
                    difficulty: 'Hard',
                    tags: [
                                          'DP',
                                          'Strings'
                                        ],
                },
                {
                    id: '4-4',
                    title: 'Exercise 4.4',
                    difficulty: 'Medium',
                },
                {
                    id: '4-5',
                    title: 'Exercise 4.5',
                    difficulty: 'Hard',
                },
                {
                    id: '4-6',
                    title: 'Exercise 4.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '5',
            title: 'Design and System',
            page: 105,
            problems: [
                {
                    id: '5.1',
                    title: 'Design a parking lot',
                    difficulty: 'Medium',
                    tags: [
                                          'OO Design'
                                        ],
                },
                {
                    id: '5.2',
                    title: 'Design a key-value store',
                    difficulty: 'Hard',
                    tags: [
                                          'SystemDesign'
                                        ],
                },
                {
                    id: '5-3',
                    title: 'Exercise 5.3',
                    difficulty: 'Medium',
                },
                {
                    id: '5-4',
                    title: 'Exercise 5.4',
                    difficulty: 'Medium',
                },
                {
                    id: '5-5',
                    title: 'Exercise 5.5',
                    difficulty: 'Hard',
                },
                {
                    id: '5-6',
                    title: 'Exercise 5.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '6',
            title: 'Miscellaneous',
            page: 130,
            problems: [
                {
                    id: '6.1',
                    title: 'Find the single number (XOR)',
                    difficulty: 'Easy',
                    tags: [
                                          'BitManipulation'
                                        ],
                },
                {
                    id: '6.2',
                    title: 'Power of three',
                    difficulty: 'Easy',
                    tags: [
                                          'Math'
                                        ],
                },
                {
                    id: '6.3',
                    title: 'Happy number',
                    difficulty: 'Easy',
                    tags: [
                                          'Math'
                                        ],
                },
                {
                    id: '6-4',
                    title: 'Exercise 6.4',
                    difficulty: 'Medium',
                },
                {
                    id: '6-5',
                    title: 'Exercise 6.5',
                    difficulty: 'Hard',
                },
                {
                    id: '6-6',
                    title: 'Exercise 6.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '7',
            title: 'Behavioral Mastery',
            page: 150,
            problems: [
                {
                    id: '7.1',
                    title: 'Tell me about a time you led a team',
                    difficulty: 'Easy',
                    tags: [
                                          'Behavioral'
                                        ],
                },
                {
                    id: '7.2',
                    title: 'Tell me about a time you failed',
                    difficulty: 'Easy',
                    tags: [
                                          'Behavioral'
                                        ],
                },
                {
                    id: '7-3',
                    title: 'Exercise 7.3',
                    difficulty: 'Medium',
                },
                {
                    id: '7-4',
                    title: 'Exercise 7.4',
                    difficulty: 'Medium',
                },
                {
                    id: '7-5',
                    title: 'Exercise 7.5',
                    difficulty: 'Hard',
                },
                {
                    id: '7-6',
                    title: 'Exercise 7.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '8',
            title: 'Behavioral Questions',
            problems: [
                {
                    id: '8-1',
                    title: 'Behavioral Questions Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '8-2',
                    title: 'Behavioral Questions Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '8-3',
                    title: 'Behavioral Questions Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '8-4',
                    title: 'Behavioral Questions Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '8-5',
                    title: 'Behavioral Questions Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '8-6',
                    title: 'Behavioral Questions Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '9',
            title: 'Behavioral Questions',
            problems: [
                {
                    id: '9-1',
                    title: 'Behavioral Questions Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '9-2',
                    title: 'Behavioral Questions Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '9-3',
                    title: 'Behavioral Questions Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '9-4',
                    title: 'Behavioral Questions Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '9-5',
                    title: 'Behavioral Questions Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '9-6',
                    title: 'Behavioral Questions Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '10',
            title: 'Behavioral Questions',
            problems: [
                {
                    id: '10-1',
                    title: 'Behavioral Questions Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '10-2',
                    title: 'Behavioral Questions Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '10-3',
                    title: 'Behavioral Questions Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '10-4',
                    title: 'Behavioral Questions Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '10-5',
                    title: 'Behavioral Questions Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '10-6',
                    title: 'Behavioral Questions Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '11',
            title: 'Behavioral Questions',
            problems: [
                {
                    id: '11-1',
                    title: 'Behavioral Questions Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '11-2',
                    title: 'Behavioral Questions Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '11-3',
                    title: 'Behavioral Questions Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '11-4',
                    title: 'Behavioral Questions Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '11-5',
                    title: 'Behavioral Questions Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '11-6',
                    title: 'Behavioral Questions Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '12',
            title: 'Behavioral Questions',
            problems: [
                {
                    id: '12-1',
                    title: 'Behavioral Questions Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '12-2',
                    title: 'Behavioral Questions Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '12-3',
                    title: 'Behavioral Questions Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '12-4',
                    title: 'Behavioral Questions Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '12-5',
                    title: 'Behavioral Questions Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '12-6',
                    title: 'Behavioral Questions Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '13',
            title: 'Behavioral Questions',
            problems: [
                {
                    id: '13-1',
                    title: 'Behavioral Questions Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '13-2',
                    title: 'Behavioral Questions Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '13-3',
                    title: 'Behavioral Questions Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '13-4',
                    title: 'Behavioral Questions Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '13-5',
                    title: 'Behavioral Questions Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '13-6',
                    title: 'Behavioral Questions Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '14',
            title: 'Behavioral Questions',
            problems: [
                {
                    id: '14-1',
                    title: 'Behavioral Questions Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '14-2',
                    title: 'Behavioral Questions Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '14-3',
                    title: 'Behavioral Questions Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '14-4',
                    title: 'Behavioral Questions Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '14-5',
                    title: 'Behavioral Questions Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '14-6',
                    title: 'Behavioral Questions Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '15',
            title: 'Behavioral Questions',
            summary: 'Behavioral Questions concepts and practice',
            problems: [
                {
                    id: '15-1',
                    title: 'Behavioral Questions Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '15-2',
                    title: 'Behavioral Questions Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '15-3',
                    title: 'Behavioral Questions Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '15-4',
                    title: 'Behavioral Questions Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '15-5',
                    title: 'Behavioral Questions Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '15-6',
                    title: 'Behavioral Questions Problem 6',
                    difficulty: 'Easy',
                },
            ],
        },
    ],
}

// ─── PROGINTERVEXP ──────────────────────────────────────────────────────────────
const progintervexp: Book = {
    slug: 'progintervexp',
    title: 'Programming Interviews Exposed',
    shortTitle: 'Prog Int Exp',
    author: 'John Mongan, Noah Suojanen Kindler, and Eric Giguère',
    edition: '4th',
    year: 2018,
    coverUrl: '/assets/books/cover-progintervexp.jpg',
    color: '#4338ca',
    accentColor: '#818cf8',
    description: 'A classic guide to programming interviews covering preparation strategies, problem-solving techniques, and fundamental CS topics with realistic interview problems.',
    totalProblems: 142,
    tags: [
          'Interviews',
          'Fundamentals',
          'Problem Solving'
        ],
    chapters: [
        {
            num: '1',
            title: 'Before the Search',
            page: 1,
            problems: [
                {
                    id: '1.1',
                    title: 'Craft your elevator pitch',
                    difficulty: 'Easy',
                    tags: [
                                          'Career'
                                        ],
                },
                {
                    id: '1-2',
                    title: 'Exercise 1.2',
                    difficulty: 'Easy',
                },
                {
                    id: '1-3',
                    title: 'Exercise 1.3',
                    difficulty: 'Medium',
                },
                {
                    id: '1-4',
                    title: 'Exercise 1.4',
                    difficulty: 'Medium',
                },
                {
                    id: '1-5',
                    title: 'Exercise 1.5',
                    difficulty: 'Hard',
                },
                {
                    id: '1-6',
                    title: 'Exercise 1.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '2',
            title: 'The Job Application Process',
            page: 15,
            problems: [
                {
                    id: '2.1',
                    title: 'Write a compelling cover letter',
                    difficulty: 'Easy',
                    tags: [
                                          'Career'
                                        ],
                },
                {
                    id: '2-2',
                    title: 'Exercise 2.2',
                    difficulty: 'Easy',
                },
                {
                    id: '2-3',
                    title: 'Exercise 2.3',
                    difficulty: 'Medium',
                },
                {
                    id: '2-4',
                    title: 'Exercise 2.4',
                    difficulty: 'Medium',
                },
                {
                    id: '2-5',
                    title: 'Exercise 2.5',
                    difficulty: 'Hard',
                },
                {
                    id: '2-6',
                    title: 'Exercise 2.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '3',
            title: 'Programming Languages',
            page: 35,
            problems: [
                {
                    id: '3.1',
                    title: 'Implement strcmp',
                    difficulty: 'Easy',
                    tags: [
                                          'Strings'
                                        ],
                },
                {
                    id: '3.2',
                    title: 'Reverse words in a string',
                    difficulty: 'Easy',
                    tags: [
                                          'Strings'
                                        ],
                },
                {
                    id: '3-3',
                    title: 'Exercise 3.3',
                    difficulty: 'Medium',
                },
                {
                    id: '3-4',
                    title: 'Exercise 3.4',
                    difficulty: 'Medium',
                },
                {
                    id: '3-5',
                    title: 'Exercise 3.5',
                    difficulty: 'Hard',
                },
                {
                    id: '3-6',
                    title: 'Exercise 3.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '4',
            title: 'Data Structures',
            page: 55,
            problems: [
                {
                    id: '4.1',
                    title: 'Implement a linked list with insert and delete',
                    difficulty: 'Easy',
                    tags: [
                                          'LinkedList'
                                        ],
                },
                {
                    id: '4.2',
                    title: 'Implement a hash table with chaining',
                    difficulty: 'Medium',
                    tags: [
                                          'HashTable'
                                        ],
                },
                {
                    id: '4.3',
                    title: 'Implement a binary search tree with traversal',
                    difficulty: 'Medium',
                    tags: [
                                          'Tree',
                                          'BST'
                                        ],
                },
                {
                    id: '4.4',
                    title: 'Find nth largest element in BST',
                    difficulty: 'Medium',
                    tags: [
                                          'Tree',
                                          'BST'
                                        ],
                },
                {
                    id: '4-5',
                    title: 'Exercise 4.5',
                    difficulty: 'Hard',
                },
                {
                    id: '4-6',
                    title: 'Exercise 4.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '5',
            title: 'Recursion',
            page: 85,
            problems: [
                {
                    id: '5.1',
                    title: 'Implement binary search recursively',
                    difficulty: 'Easy',
                    tags: [
                                          'Recursion',
                                          'BinarySearch'
                                        ],
                },
                {
                    id: '5.2',
                    title: 'Permutations of a string',
                    difficulty: 'Medium',
                    tags: [
                                          'Recursion'
                                        ],
                },
                {
                    id: '5.3',
                    title: 'Tower of Hanoi',
                    difficulty: 'Medium',
                    tags: [
                                          'Recursion'
                                        ],
                },
                {
                    id: '5-4',
                    title: 'Exercise 5.4',
                    difficulty: 'Medium',
                },
                {
                    id: '5-5',
                    title: 'Exercise 5.5',
                    difficulty: 'Hard',
                },
                {
                    id: '5-6',
                    title: 'Exercise 5.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '6',
            title: 'Sorting and Searching',
            page: 110,
            problems: [
                {
                    id: '6.1',
                    title: 'Implement merge sort',
                    difficulty: 'Medium',
                    tags: [
                                          'Sorting'
                                        ],
                },
                {
                    id: '6.2',
                    title: 'Implement quicksort',
                    difficulty: 'Medium',
                    tags: [
                                          'Sorting'
                                        ],
                },
                {
                    id: '6.3',
                    title: 'Find the kth largest element',
                    difficulty: 'Medium',
                    tags: [
                                          'Sorting'
                                        ],
                },
                {
                    id: '6-4',
                    title: 'Exercise 6.4',
                    difficulty: 'Medium',
                },
                {
                    id: '6-5',
                    title: 'Exercise 6.5',
                    difficulty: 'Hard',
                },
                {
                    id: '6-6',
                    title: 'Exercise 6.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '7',
            title: 'Linked Lists',
            page: 135,
            problems: [
                {
                    id: '7.1',
                    title: 'Detect cycle in linked list',
                    difficulty: 'Easy',
                    tags: [
                                          'LinkedList',
                                          'TwoPointers'
                                        ],
                },
                {
                    id: '7.2',
                    title: 'Find intersection of two linked lists',
                    difficulty: 'Easy',
                    tags: [
                                          'LinkedList'
                                        ],
                },
                {
                    id: '7.3',
                    title: 'Add two numbers represented by linked lists',
                    difficulty: 'Medium',
                    tags: [
                                          'LinkedList'
                                        ],
                },
                {
                    id: '7-4',
                    title: 'Exercise 7.4',
                    difficulty: 'Medium',
                },
                {
                    id: '7-5',
                    title: 'Exercise 7.5',
                    difficulty: 'Hard',
                },
                {
                    id: '7-6',
                    title: 'Exercise 7.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '8',
            title: 'Trees and Graphs',
            page: 160,
            problems: [
                {
                    id: '8.1',
                    title: 'Find the lowest common ancestor in BST',
                    difficulty: 'Medium',
                    tags: [
                                          'Tree',
                                          'BST'
                                        ],
                },
                {
                    id: '8.2',
                    title: 'Check if binary tree is balanced',
                    difficulty: 'Easy',
                    tags: [
                                          'Tree'
                                        ],
                },
                {
                    id: '8.3',
                    title: 'Depth-first search on graph',
                    difficulty: 'Easy',
                    tags: [
                                          'Graph',
                                          'DFS'
                                        ],
                },
                {
                    id: '8.4',
                    title: 'Breadth-first search on graph',
                    difficulty: 'Easy',
                    tags: [
                                          'Graph',
                                          'BFS'
                                        ],
                },
                {
                    id: '8-5',
                    title: 'Exercise 8.5',
                    difficulty: 'Hard',
                },
                {
                    id: '8-6',
                    title: 'Exercise 8.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '9',
            title: 'Databases',
            problems: [
                {
                    id: '9-1',
                    title: 'Databases Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '9-2',
                    title: 'Databases Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '9-3',
                    title: 'Databases Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '9-4',
                    title: 'Databases Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '9-5',
                    title: 'Databases Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '9-6',
                    title: 'Exercise 9.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '10',
            title: 'Networking',
            problems: [
                {
                    id: '10-1',
                    title: 'Networking Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '10-2',
                    title: 'Networking Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '10-3',
                    title: 'Networking Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '10-4',
                    title: 'Networking Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '10-5',
                    title: 'Networking Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '10-6',
                    title: 'Exercise 10.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '11',
            title: 'Databases',
            problems: [
                {
                    id: '11-1',
                    title: 'Databases Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '11-2',
                    title: 'Databases Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '11-3',
                    title: 'Databases Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '11-4',
                    title: 'Databases Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '11-5',
                    title: 'Databases Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '11-6',
                    title: 'Exercise 11.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '12',
            title: 'Networking',
            problems: [
                {
                    id: '12-1',
                    title: 'Networking Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '12-2',
                    title: 'Networking Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '12-3',
                    title: 'Networking Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '12-4',
                    title: 'Networking Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '12-5',
                    title: 'Networking Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '12-6',
                    title: 'Exercise 12.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '13',
            title: 'Databases',
            problems: [
                {
                    id: '13-1',
                    title: 'Databases Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '13-2',
                    title: 'Databases Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '13-3',
                    title: 'Databases Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '13-4',
                    title: 'Databases Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '13-5',
                    title: 'Databases Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '13-6',
                    title: 'Exercise 13.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '14',
            title: 'Networking',
            problems: [
                {
                    id: '14-1',
                    title: 'Networking Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '14-2',
                    title: 'Networking Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '14-3',
                    title: 'Networking Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '14-4',
                    title: 'Networking Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '14-5',
                    title: 'Networking Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '14-6',
                    title: 'Exercise 14.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '15',
            title: 'Databases',
            problems: [
                {
                    id: '15-1',
                    title: 'Databases Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '15-2',
                    title: 'Databases Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '15-3',
                    title: 'Databases Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '15-4',
                    title: 'Databases Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '15-5',
                    title: 'Databases Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '15-6',
                    title: 'Exercise 15.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '16',
            title: 'Networking',
            problems: [
                {
                    id: '16-1',
                    title: 'Networking Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '16-2',
                    title: 'Networking Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '16-3',
                    title: 'Networking Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '16-4',
                    title: 'Networking Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '16-5',
                    title: 'Networking Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '16-6',
                    title: 'Exercise 16.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '17',
            title: 'Databases',
            problems: [
                {
                    id: '17-1',
                    title: 'Databases Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '17-2',
                    title: 'Databases Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '17-3',
                    title: 'Databases Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '17-4',
                    title: 'Databases Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '17-5',
                    title: 'Databases Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '17-6',
                    title: 'Exercise 17.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '18',
            title: 'Networking',
            problems: [
                {
                    id: '18-1',
                    title: 'Networking Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '18-2',
                    title: 'Networking Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '18-3',
                    title: 'Networking Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '18-4',
                    title: 'Networking Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '18-5',
                    title: 'Networking Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '18-6',
                    title: 'Exercise 18.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '19',
            title: 'Databases',
            problems: [
                {
                    id: '19-1',
                    title: 'Databases Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '19-2',
                    title: 'Databases Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '19-3',
                    title: 'Databases Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '19-4',
                    title: 'Databases Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '19-5',
                    title: 'Databases Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '19-6',
                    title: 'Exercise 19.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '20',
            title: 'Networking',
            problems: [
                {
                    id: '20-1',
                    title: 'Networking Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '20-2',
                    title: 'Networking Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '20-3',
                    title: 'Networking Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '20-4',
                    title: 'Networking Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '20-5',
                    title: 'Networking Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '20-6',
                    title: 'Exercise 20.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '21',
            title: 'Databases',
            problems: [
                {
                    id: '21-1',
                    title: 'Databases Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '21-2',
                    title: 'Databases Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '21-3',
                    title: 'Databases Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '21-4',
                    title: 'Databases Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '21-5',
                    title: 'Databases Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '21-6',
                    title: 'Exercise 21.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '22',
            title: 'Networking',
            problems: [
                {
                    id: '22-1',
                    title: 'Networking Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '22-2',
                    title: 'Networking Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '22-3',
                    title: 'Networking Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '22-4',
                    title: 'Networking Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '22-5',
                    title: 'Networking Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '22-6',
                    title: 'Exercise 22.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '23',
            title: 'Databases',
            summary: 'Databases concepts and practice',
            problems: [
                {
                    id: '23-1',
                    title: 'Databases Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '23-2',
                    title: 'Databases Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '23-3',
                    title: 'Databases Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '23-4',
                    title: 'Databases Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '23-5',
                    title: 'Databases Problem 5',
                    difficulty: 'Hard',
                },
            ],
        },
        {
            num: '24',
            title: 'Networking',
            summary: 'Networking concepts and practice',
            problems: [
                {
                    id: '24-1',
                    title: 'Networking Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '24-2',
                    title: 'Networking Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '24-3',
                    title: 'Networking Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '24-4',
                    title: 'Networking Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '24-5',
                    title: 'Networking Problem 5',
                    difficulty: 'Hard',
                },
            ],
        },
    ],
}

// ─── ADVDSALGO ──────────────────────────────────────────────────────────────
const advdsalgo: Book = {
    slug: 'advdsalgo',
    title: 'Advanced Algorithms and Data Structures',
    shortTitle: 'Adv DSA',
    author: 'Marcello La Rocca',
    edition: '1st',
    year: 2021,
    coverUrl: '/assets/books/cover-advdsalgo.jpg',
    color: '#ea580c',
    accentColor: '#fb923c',
    description: 'An in-depth exploration of advanced data structures and algorithms: spatial data structures, heuristics, optimization, and specialized DS.',
    totalProblems: 130,
    tags: [
          'Advanced',
          'Spatial',
          'Optimization',
          'DS'
        ],
    chapters: [
        {
            num: '1',
            title: 'Sorting and Searching',
            page: 1,
            problems: [
                {
                    id: '1.1',
                    title: 'Implement interpolation search',
                    difficulty: 'Medium',
                    tags: [
                                          'Search'
                                        ],
                },
                {
                    id: '1.2',
                    title: 'Implement ternary search',
                    difficulty: 'Easy',
                    tags: [
                                          'Search'
                                        ],
                },
                {
                    id: '1.3',
                    title: 'Sort numbers with limited range using counting sort',
                    difficulty: 'Medium',
                    tags: [
                                          'Sorting'
                                        ],
                },
                {
                    id: '1-4',
                    title: 'Exercise 1.4',
                    difficulty: 'Medium',
                },
                {
                    id: '1-5',
                    title: 'Exercise 1.5',
                    difficulty: 'Hard',
                },
                {
                    id: '1-6',
                    title: 'Exercise 1.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '2',
            title: 'Spatial Data Structures',
            page: 35,
            problems: [
                {
                    id: '2.1',
                    title: 'Build a k-d tree for k-nearest neighbor search',
                    difficulty: 'Hard',
                    tags: [
                                          'Spatial',
                                          'KDT'
                                        ],
                },
                {
                    id: '2.2',
                    title: 'Implement quadtree for 2D collision detection',
                    difficulty: 'Hard',
                    tags: [
                                          'Spatial'
                                        ],
                },
                {
                    id: '2.3',
                    title: 'Interval tree for overlapping intervals',
                    difficulty: 'Medium',
                    tags: [
                                          'Tree'
                                        ],
                },
                {
                    id: '2-4',
                    title: 'Exercise 2.4',
                    difficulty: 'Medium',
                },
                {
                    id: '2-5',
                    title: 'Exercise 2.5',
                    difficulty: 'Hard',
                },
                {
                    id: '2-6',
                    title: 'Exercise 2.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '3',
            title: 'Heuristics and Approximation',
            page: 85,
            problems: [
                {
                    id: '3.1',
                    title: 'Implement simulated annealing for TSP',
                    difficulty: 'Hard',
                    tags: [
                                          'Heuristics'
                                        ],
                },
                {
                    id: '3.2',
                    title: 'Genetic algorithm for knapsack problem',
                    difficulty: 'Hard',
                    tags: [
                                          'Heuristics',
                                          'GA'
                                        ],
                },
                {
                    id: '3.3',
                    title: 'Approximation algorithm for vertex cover',
                    difficulty: 'Medium',
                    tags: [
                                          'Approximation'
                                        ],
                },
                {
                    id: '3-4',
                    title: 'Exercise 3.4',
                    difficulty: 'Medium',
                },
                {
                    id: '3-5',
                    title: 'Exercise 3.5',
                    difficulty: 'Hard',
                },
                {
                    id: '3-6',
                    title: 'Exercise 3.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '4',
            title: 'Specialized Trees',
            page: 130,
            problems: [
                {
                    id: '4.1',
                    title: 'Implement B-tree with insert and search',
                    difficulty: 'Hard',
                    tags: [
                                          'Tree',
                                          'BTree'
                                        ],
                },
                {
                    id: '4.2',
                    title: 'Construct a suffix tree for a string',
                    difficulty: 'Hard',
                    tags: [
                                          'Strings',
                                          'SuffixTree'
                                        ],
                },
                {
                    id: '4.3',
                    title: 'Implement 2D BIT for range sum queries',
                    difficulty: 'Medium',
                    tags: [
                                          'FenwickTree'
                                        ],
                },
                {
                    id: '4-4',
                    title: 'Exercise 4.4',
                    difficulty: 'Medium',
                },
                {
                    id: '4-5',
                    title: 'Exercise 4.5',
                    difficulty: 'Hard',
                },
                {
                    id: '4-6',
                    title: 'Exercise 4.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '5',
            title: 'Specialized Graphs',
            page: 170,
            problems: [
                {
                    id: '5.1',
                    title: 'Dinic\'s algorithm for max flow',
                    difficulty: 'Hard',
                    tags: [
                                          'Graph',
                                          'MaxFlow'
                                        ],
                },
                {
                    id: '5.2',
                    title: 'Hopcroft-Karp for max bipartite matching',
                    difficulty: 'Hard',
                    tags: [
                                          'Graph',
                                          'Bipartite'
                                        ],
                },
                {
                    id: '5.3',
                    title: 'Implement min-cost max flow',
                    difficulty: 'Hard',
                    tags: [
                                          'Graph',
                                          'MinCostFlow'
                                        ],
                },
                {
                    id: '5-4',
                    title: 'Exercise 5.4',
                    difficulty: 'Medium',
                },
                {
                    id: '5-5',
                    title: 'Exercise 5.5',
                    difficulty: 'Hard',
                },
                {
                    id: '5-6',
                    title: 'Exercise 5.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '6',
            title: 'Advanced Optimization',
            page: 210,
            problems: [
                {
                    id: '6.1',
                    title: 'Branch and bound for TSP',
                    difficulty: 'Hard',
                    tags: [
                                          'Optimization'
                                        ],
                },
                {
                    id: '6.2',
                    title: 'Implement simple SAT solver with DPLL',
                    difficulty: 'Hard',
                    tags: [
                                          'SAT'
                                        ],
                },
                {
                    id: '6.3',
                    title: 'Constraint satisfaction for N-Queens',
                    difficulty: 'Medium',
                    tags: [
                                          'CSP'
                                        ],
                },
                {
                    id: '6-4',
                    title: 'Exercise 6.4',
                    difficulty: 'Medium',
                },
                {
                    id: '6-5',
                    title: 'Exercise 6.5',
                    difficulty: 'Hard',
                },
                {
                    id: '6-6',
                    title: 'Exercise 6.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '7',
            title: 'Approximation',
            problems: [
                {
                    id: '7-1',
                    title: 'Approximation Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '7-2',
                    title: 'Approximation Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '7-3',
                    title: 'Approximation Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '7-4',
                    title: 'Approximation Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '7-5',
                    title: 'Approximation Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '7-6',
                    title: 'Exercise 7.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '8',
            title: 'Randomized Algorithms',
            problems: [
                {
                    id: '8-1',
                    title: 'Randomized Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '8-2',
                    title: 'Randomized Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '8-3',
                    title: 'Randomized Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '8-4',
                    title: 'Randomized Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '8-5',
                    title: 'Randomized Algorithms Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '8-6',
                    title: 'Exercise 8.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '9',
            title: 'Approximation',
            problems: [
                {
                    id: '9-1',
                    title: 'Approximation Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '9-2',
                    title: 'Approximation Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '9-3',
                    title: 'Approximation Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '9-4',
                    title: 'Approximation Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '9-5',
                    title: 'Approximation Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '9-6',
                    title: 'Exercise 9.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '10',
            title: 'Randomized Algorithms',
            problems: [
                {
                    id: '10-1',
                    title: 'Randomized Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '10-2',
                    title: 'Randomized Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '10-3',
                    title: 'Randomized Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '10-4',
                    title: 'Randomized Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '10-5',
                    title: 'Randomized Algorithms Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '10-6',
                    title: 'Exercise 10.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '11',
            title: 'Approximation',
            problems: [
                {
                    id: '11-1',
                    title: 'Approximation Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '11-2',
                    title: 'Approximation Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '11-3',
                    title: 'Approximation Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '11-4',
                    title: 'Approximation Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '11-5',
                    title: 'Approximation Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '11-6',
                    title: 'Exercise 11.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '12',
            title: 'Randomized Algorithms',
            problems: [
                {
                    id: '12-1',
                    title: 'Randomized Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '12-2',
                    title: 'Randomized Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '12-3',
                    title: 'Randomized Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '12-4',
                    title: 'Randomized Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '12-5',
                    title: 'Randomized Algorithms Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '12-6',
                    title: 'Exercise 12.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '13',
            title: 'Approximation',
            problems: [
                {
                    id: '13-1',
                    title: 'Approximation Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '13-2',
                    title: 'Approximation Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '13-3',
                    title: 'Approximation Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '13-4',
                    title: 'Approximation Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '13-5',
                    title: 'Approximation Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '13-6',
                    title: 'Exercise 13.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '14',
            title: 'Randomized Algorithms',
            problems: [
                {
                    id: '14-1',
                    title: 'Randomized Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '14-2',
                    title: 'Randomized Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '14-3',
                    title: 'Randomized Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '14-4',
                    title: 'Randomized Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '14-5',
                    title: 'Randomized Algorithms Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '14-6',
                    title: 'Exercise 14.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '15',
            title: 'Approximation',
            problems: [
                {
                    id: '15-1',
                    title: 'Approximation Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '15-2',
                    title: 'Approximation Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '15-3',
                    title: 'Approximation Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '15-4',
                    title: 'Approximation Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '15-5',
                    title: 'Approximation Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '15-6',
                    title: 'Exercise 15.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '16',
            title: 'Randomized Algorithms',
            problems: [
                {
                    id: '16-1',
                    title: 'Randomized Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '16-2',
                    title: 'Randomized Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '16-3',
                    title: 'Randomized Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '16-4',
                    title: 'Randomized Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '16-5',
                    title: 'Randomized Algorithms Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '16-6',
                    title: 'Exercise 16.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '17',
            title: 'Approximation',
            problems: [
                {
                    id: '17-1',
                    title: 'Approximation Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '17-2',
                    title: 'Approximation Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '17-3',
                    title: 'Approximation Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '17-4',
                    title: 'Approximation Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '17-5',
                    title: 'Approximation Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '17-6',
                    title: 'Exercise 17.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '18',
            title: 'Randomized Algorithms',
            problems: [
                {
                    id: '18-1',
                    title: 'Randomized Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '18-2',
                    title: 'Randomized Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '18-3',
                    title: 'Randomized Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '18-4',
                    title: 'Randomized Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '18-5',
                    title: 'Randomized Algorithms Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '18-6',
                    title: 'Exercise 18.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '19',
            title: 'Approximation',
            problems: [
                {
                    id: '19-1',
                    title: 'Approximation Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '19-2',
                    title: 'Approximation Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '19-3',
                    title: 'Approximation Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '19-4',
                    title: 'Approximation Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '19-5',
                    title: 'Approximation Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '19-6',
                    title: 'Exercise 19.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '20',
            title: 'Randomized Algorithms',
            problems: [
                {
                    id: '20-1',
                    title: 'Randomized Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '20-2',
                    title: 'Randomized Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '20-3',
                    title: 'Randomized Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '20-4',
                    title: 'Randomized Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '20-5',
                    title: 'Randomized Algorithms Problem 5',
                    difficulty: 'Hard',
                },
                {
                    id: '20-6',
                    title: 'Exercise 20.6',
                    difficulty: 'Easy',
                },
            ],
        },
        {
            num: '21',
            title: 'Approximation',
            summary: 'Approximation concepts and practice',
            problems: [
                {
                    id: '21-1',
                    title: 'Approximation Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '21-2',
                    title: 'Approximation Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '21-3',
                    title: 'Approximation Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '21-4',
                    title: 'Approximation Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '21-5',
                    title: 'Approximation Problem 5',
                    difficulty: 'Hard',
                },
            ],
        },
        {
            num: '22',
            title: 'Randomized Algorithms',
            summary: 'Randomized Algorithms concepts and practice',
            problems: [
                {
                    id: '22-1',
                    title: 'Randomized Algorithms Problem 1',
                    difficulty: 'Easy',
                },
                {
                    id: '22-2',
                    title: 'Randomized Algorithms Problem 2',
                    difficulty: 'Easy',
                },
                {
                    id: '22-3',
                    title: 'Randomized Algorithms Problem 3',
                    difficulty: 'Medium',
                },
                {
                    id: '22-4',
                    title: 'Randomized Algorithms Problem 4',
                    difficulty: 'Medium',
                },
                {
                    id: '22-5',
                    title: 'Randomized Algorithms Problem 5',
                    difficulty: 'Hard',
                },
            ],
        },
    ],
}

export const BOOKS: Book[] = [ctci, cp4, cph, ai, clrs, hd, dsamadeasy, grokking, progchal, math4cs, setslogic, algodaily, guidetocp, gamam, progintervexp, advdsalgo]

export function getBook(slug: string): Book | undefined {
  return BOOKS.find(b => b.slug === slug)
}

export function getTotalProblems(book: Book): number {
  return book.chapters.reduce((sum, ch) => sum + ch.problems.length, 0)
}
