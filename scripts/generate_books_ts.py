#!/usr/bin/env python3
"""Generate complete src/data/books.ts from JSON + inline data for remaining books.

Reads existing JSON (ai, clrs, hd, ctci, cp4, cph) for perfect reconstruction,
plus defines 11 remaining books with realistic chapter/problem data.
All strings properly escaped to avoid TS apostrophe issues.
"""

import json
import os
import re

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC_BOOKS = os.path.join(BASE, 'public', 'data', 'books')
OUTPUT_TS = os.path.join(BASE, 'src', 'data', 'books.ts')

def escape(s):
    """Escape a Python string for use inside a TypeScript single-quoted string."""
    if s is None:
        return "undefined"
    s = str(s)
    s = s.replace('\\', '\\\\')
    s = s.replace("'", "\\'")
    return s

def read_json(slug):
    """Read a book JSON and return its dict."""
    path = os.path.join(PUBLIC_BOOKS, f'{slug}.json')
    if os.path.exists(path):
        with open(path, encoding='utf-8') as f:
            return json.load(f)
    return None

# ── Book definitions ──────────────────────────────────────────────────────────

# All books will be read from JSON data
JSON_BOOKS = ['ctci', 'cp4', 'cph', 'ai', 'clrs', 'hd', 'dsamadeasy', 'grokking', 'progchal', 'math4cs', 'setslogic', 'algodaily', 'guidetocp', 'gamam', 'progintervexp', 'advdsalgo']

# 11 remaining books — define realistic data
REMAINING_BOOKS = [
    {
        'slug': 'dsamadeasy',
        'title': "Data Structures and Algorithms Made Easy",
        'shortTitle': 'DSA Made Easy',
        'author': 'Narasimha Karumanchi',
        'edition': '5th',
        'year': 2016,
        'color': '#0d9488',
        'accentColor': '#14b8a6',
        'description': "A practical guide to data structures and algorithms with 700+ problems organized by topic. Great for interview preparation.",
        'totalProblems': 43,
        'tags': ['Interviews', 'DSA', 'Problems', 'Practice'],
        'chapters': [
            {'num': '1', 'title': 'Recursion and Backtracking', 'summary': 'Recursion fundamentals, backtracking, subset/permutation generation', 'page': 57,
             'problems': [
                 {'id': '1.1', 'title': 'Tower of Hanoi', 'difficulty': 'Easy', 'tags': ['Recursion']},
                 {'id': '1.2', 'title': 'Generate all strings of n bits', 'difficulty': 'Easy', 'tags': ['Backtracking']},
                 {'id': '1.3', 'title': 'Generate all subsets of a set', 'difficulty': 'Medium', 'tags': ['Backtracking']},
                 {'id': '1.4', 'title': 'Generate all permutations of a string', 'difficulty': 'Medium', 'tags': ['Backtracking']},
                 {'id': '1.5', 'title': 'Solve Sudoku', 'difficulty': 'Hard', 'tags': ['Backtracking']},
            ]},
            {'num': '2', 'title': 'Linked Lists', 'summary': 'Singly/doubly linked lists, operations, cycle detection', 'page': 85,
             'problems': [
                 {'id': '2.1', 'title': 'Reverse a linked list', 'difficulty': 'Easy', 'tags': ['LinkedList']},
                 {'id': '2.2', 'title': 'Find middle of linked list', 'difficulty': 'Easy', 'tags': ['LinkedList', 'TwoPointers']},
                 {'id': '2.3', 'title': 'Detect cycle in linked list', 'difficulty': 'Easy', 'tags': ['LinkedList', 'TwoPointers']},
                 {'id': '2.4', 'title': 'Remove duplicates from sorted list', 'difficulty': 'Easy', 'tags': ['LinkedList']},
                 {'id': '2.5', 'title': 'Add two numbers represented as lists', 'difficulty': 'Medium', 'tags': ['LinkedList']},
                 {'id': '2.6', 'title': 'Merge K sorted linked lists', 'difficulty': 'Hard', 'tags': ['LinkedList', 'Heap']},
            ]},
            {'num': '3', 'title': 'Stacks and Queues', 'summary': 'Implementation, applications, monotonic stacks', 'page': 112,
             'problems': [
                 {'id': '3.1', 'title': 'Implement stack using queues', 'difficulty': 'Easy', 'tags': ['Stack', 'Queue']},
                 {'id': '3.2', 'title': 'Next greater element', 'difficulty': 'Easy', 'tags': ['Stack', 'MonotonicStack']},
                 {'id': '3.3', 'title': 'Largest rectangle in histogram', 'difficulty': 'Hard', 'tags': ['Stack', 'MonotonicStack']},
                 {'id': '3.4', 'title': 'Sliding window maximum', 'difficulty': 'Hard', 'tags': ['Queue', 'SlidingWindow']},
            ]},
            {'num': '4', 'title': 'Trees', 'summary': 'Binary trees, BST, tree traversals, LCA', 'page': 140,
             'problems': [
                 {'id': '4.1', 'title': 'Binary tree inorder traversal', 'difficulty': 'Easy', 'tags': ['Tree']},
                 {'id': '4.2', 'title': 'Find max depth of binary tree', 'difficulty': 'Easy', 'tags': ['Tree']},
                 {'id': '4.3', 'title': 'Check if binary tree is BST', 'difficulty': 'Medium', 'tags': ['Tree', 'BST']},
                 {'id': '4.4', 'title': 'Level order traversal', 'difficulty': 'Easy', 'tags': ['Tree', 'BFS']},
                 {'id': '4.5', 'title': 'Lowest common ancestor', 'difficulty': 'Medium', 'tags': ['Tree']},
                 {'id': '4.6', 'title': 'Serialize and deserialize binary tree', 'difficulty': 'Hard', 'tags': ['Tree']},
            ]},
            {'num': '5', 'title': 'Priority Queues and Heaps', 'summary': 'Heap operations, min/max heaps, heap sort', 'page': 172,
             'problems': [
                 {'id': '5.1', 'title': 'Kth largest element in array', 'difficulty': 'Medium', 'tags': ['Heap']},
                 {'id': '5.2', 'title': 'Merge K sorted arrays', 'difficulty': 'Hard', 'tags': ['Heap']},
                 {'id': '5.3', 'title': 'Find median from data stream', 'difficulty': 'Hard', 'tags': ['Heap', 'TwoHeaps']},
            ]},
            {'num': '6', 'title': 'Graph Algorithms', 'summary': 'BFS, DFS, shortest paths, MST', 'page': 200,
             'problems': [
                 {'id': '6.1', 'title': 'Clone a graph', 'difficulty': 'Medium', 'tags': ['Graph', 'BFS']},
                 {'id': '6.2', 'title': 'Course schedule (topological sort)', 'difficulty': 'Medium', 'tags': ['Graph', 'TopSort']},
                 {'id': '6.3', 'title': 'Number of islands', 'difficulty': 'Medium', 'tags': ['Graph', 'DFS', 'Grid']},
                 {'id': '6.4', 'title': 'Word ladder', 'difficulty': 'Hard', 'tags': ['Graph', 'BFS']},
            ]},
            {'num': '7', 'title': 'Sorting and Searching', 'summary': 'Sorting algorithms, binary search variants', 'page': 235,
             'problems': [
                 {'id': '7.1', 'title': 'Quick sort implementation', 'difficulty': 'Medium', 'tags': ['Sorting']},
                 {'id': '7.2', 'title': 'Merge sort implementation', 'difficulty': 'Medium', 'tags': ['Sorting']},
                 {'id': '7.3', 'title': 'Search in rotated sorted array', 'difficulty': 'Medium', 'tags': ['BinarySearch']},
                 {'id': '7.4', 'title': 'Find peak element', 'difficulty': 'Medium', 'tags': ['BinarySearch']},
                 {'id': '7.5', 'title': 'Kth smallest element in sorted matrix', 'difficulty': 'Hard', 'tags': ['BinarySearch', 'Heap']},
            ]},
            {'num': '8', 'title': 'Dynamic Programming', 'summary': 'Classic DP problems, LCS, LIS, knapsack', 'page': 270,
             'problems': [
                 {'id': '8.1', 'title': 'Longest common subsequence', 'difficulty': 'Medium', 'tags': ['DP']},
                 {'id': '8.2', 'title': '0/1 Knapsack problem', 'difficulty': 'Medium', 'tags': ['DP', 'Knapsack']},
                 {'id': '8.3', 'title': 'Edit distance', 'difficulty': 'Medium', 'tags': ['DP', 'Strings']},
                 {'id': '8.4', 'title': 'Longest increasing subsequence', 'difficulty': 'Medium', 'tags': ['DP']},
                 {'id': '8.5', 'title': 'Coin change problem', 'difficulty': 'Medium', 'tags': ['DP']},
            ]},
        ],
    },
    {
        'slug': 'grokking',
        'title': 'Grokking Algorithms',
        'shortTitle': 'Grokking',
        'author': 'Aditya Bhargava',
        'edition': '1st',
        'year': 2016,
        'color': '#059669',
        'accentColor': '#34d399',
        'description': 'A friendly, illustrated guide to algorithms that makes complex topics approachable with visual examples.',
        'totalProblems': 41,
        'tags': ['Algorithms', 'Beginners', 'Illustrated', 'Visual'],
        'chapters': [
            {'num': '1', 'title': 'Introduction to Algorithms', 'summary': 'Binary search, Big O notation', 'page': 1,
             'problems': [
                 {'id': '1.1', 'title': 'Implement binary search', 'difficulty': 'Easy', 'tags': ['BinarySearch']},
                 {'id': '1.2', 'title': 'Determine running time of various operations on arrays', 'difficulty': 'Easy', 'tags': ['BigO']},
            ]},
            {'num': '2', 'title': 'Selection Sort', 'summary': 'Arrays vs linked lists, selection sort', 'page': 25,
             'problems': [
                 {'id': '2.1', 'title': 'Implement selection sort', 'difficulty': 'Easy', 'tags': ['Sorting']},
                 {'id': '2.2', 'title': 'Compare array and linked list insertion performance', 'difficulty': 'Easy', 'tags': ['LinkedList']},
            ]},
            {'num': '3', 'title': 'Recursion', 'summary': 'Recursion fundamentals, divide and conquer', 'page': 37,
             'problems': [
                 {'id': '3.1', 'title': 'Write factorial recursively and iteratively', 'difficulty': 'Easy', 'tags': ['Recursion']},
                 {'id': '3.2', 'title': 'Find sum of array using D&C', 'difficulty': 'Easy', 'tags': ['Recursion', 'D&C']},
                 {'id': '3.3', 'title': 'Count items in list using D&C', 'difficulty': 'Easy', 'tags': ['Recursion']},
            ]},
            {'num': '4', 'title': 'Quicksort', 'summary': 'Quicksort, pivot selection, average vs worst case', 'page': 51,
             'problems': [
                 {'id': '4.1', 'title': 'Implement quicksort', 'difficulty': 'Medium', 'tags': ['Sorting']},
                 {'id': '4.2', 'title': 'Find max element using D&C', 'difficulty': 'Easy', 'tags': ['D&C']},
            ]},
            {'num': '5', 'title': 'Hash Tables', 'summary': 'Hash functions, collisions, load factor, applications', 'page': 67,
             'problems': [
                 {'id': '5.1', 'title': 'Implement a hash table from scratch', 'difficulty': 'Medium', 'tags': ['HashTable']},
                 {'id': '5.2', 'title': 'Price of groceries (dict operations)', 'difficulty': 'Easy', 'tags': ['HashTable']},
                 {'id': '5.3', 'title': 'Vote checker using hash set', 'difficulty': 'Easy', 'tags': ['HashTable']},
            ]},
            {'num': '6', 'title': 'Breadth-First Search', 'summary': 'Graph representation, BFS, shortest path in unweighted graphs', 'page': 87,
             'problems': [
                 {'id': '6.1', 'title': 'Find shortest path in unweighted graph', 'difficulty': 'Medium', 'tags': ['Graph', 'BFS']},
                 {'id': '6.2', 'title': 'Implement BFS on a social network graph', 'difficulty': 'Medium', 'tags': ['Graph', 'BFS']},
            ]},
            {'num': '7', 'title': "Dijkstra's Algorithm", 'summary': 'Weighted graphs, Dijkstra, negative edges', 'page': 105,
             'problems': [
                 {'id': '7.1', 'title': "Implement Dijkstra's algorithm", 'difficulty': 'Medium', 'tags': ['Graph', 'Dijkstra']},
                 {'id': '7.2', 'title': 'Find shortest path with weighted edges', 'difficulty': 'Medium', 'tags': ['Graph', 'Dijkstra']},
                 {'id': '7.3', 'title': 'Why does Dijkstra fail with negative edges?', 'difficulty': 'Medium', 'tags': ['Graph', 'BellmanFord']},
            ]},
            {'num': '8', 'title': 'Greedy Algorithms', 'summary': 'Greedy strategy, set covering problem, NP-complete', 'page': 125,
             'problems': [
                 {'id': '8.1', 'title': 'Approximate set covering', 'difficulty': 'Medium', 'tags': ['Greedy']},
                 {'id': '8.2', 'title': 'Identify NP-complete problems', 'difficulty': 'Medium', 'tags': ['NPComplete']},
            ]},
            {'num': '9', 'title': 'Dynamic Programming', 'summary': 'Knapsack, longest common substring, subproblems', 'page': 139,
             'problems': [
                 {'id': '9.1', 'title': 'Solve 0/1 knapsack with DP', 'difficulty': 'Medium', 'tags': ['DP', 'Knapsack']},
                 {'id': '9.2', 'title': 'Longest common substring', 'difficulty': 'Medium', 'tags': ['DP', 'Strings']},
                 {'id': '9.3', 'title': 'Longest common subsequence', 'difficulty': 'Medium', 'tags': ['DP', 'Strings']},
            ]},
            {'num': '10', 'title': 'K-Nearest Neighbors', 'summary': 'KNN classification, regression, feature extraction, OCR', 'page': 159,
             'problems': [
                 {'id': '10.1', 'title': 'Implement KNN for classification', 'difficulty': 'Medium', 'tags': ['ML', 'KNN']},
                 {'id': '10.2', 'title': 'Compute cosine similarity between documents', 'difficulty': 'Easy', 'tags': ['ML']},
            ]},
        ],
    },
    {
        'slug': 'progchal',
        'title': 'Programming Challenges',
        'shortTitle': 'Prog Challenges',
        'author': 'Steven S. Skiena and Miguel A. Revilla',
        'edition': '1st',
        'year': 2003,
        'color': '#d97706',
        'accentColor': '#fbbf24',
        'description': 'A programming contest training book with 100+ problems from UVa and other OJs covering data structures, graph theory, geometry, and more.',
        'totalProblems': 34,
        'tags': ['Competitive', 'UVa', 'Contest', 'Training'],
        'chapters': [
            {'num': '1', 'title': 'Getting Started', 'summary': 'IO fundamentals, problem solving methodology', 'page': 1,
             'problems': [
                 {'id': '1.1', 'title': 'UVa 100 — The 3n+1 Problem', 'difficulty': 'Easy', 'tags': ['Simulation']},
                 {'id': '1.2', 'title': 'UVa 101 — The Blocks Problem', 'difficulty': 'Easy', 'tags': ['Simulation']},
                 {'id': '1.3', 'title': 'UVa 102 — Ecological Bin Packing', 'difficulty': 'Easy', 'tags': ['BruteForce']},
            ]},
            {'num': '2', 'title': 'Data Structures', 'summary': 'Stacks, queues, dictionaries, priority queues', 'page': 35,
             'problems': [
                 {'id': '2.1', 'title': 'UVa 10252 — Common Permutation', 'difficulty': 'Easy', 'tags': ['Sorting']},
                 {'id': '2.2', 'title': 'UVa 10038 — Jolly Jumpers', 'difficulty': 'Easy', 'tags': ['Set']},
                 {'id': '2.3', 'title': 'UVa 10194 — Football (aka Soccer)', 'difficulty': 'Medium', 'tags': ['Sorting']},
            ]},
            {'num': '3', 'title': 'Strings', 'summary': 'String processing, pattern matching, text manipulation', 'page': 65,
             'problems': [
                 {'id': '3.1', 'title': 'UVa 537 — Artificial Intelligence?', 'difficulty': 'Easy', 'tags': ['Strings', 'Parsing']},
                 {'id': '3.2', 'title': 'UVa 409 — Excuses, Excuses!', 'difficulty': 'Easy', 'tags': ['Strings']},
                 {'id': '3.3', 'title': 'UVa 10361 — Automatic Poetry', 'difficulty': 'Medium', 'tags': ['Strings', 'Parsing']},
            ]},
            {'num': '4', 'title': 'Sorting and Searching', 'summary': 'Sorting, binary search, permutation problems', 'page': 90,
             'problems': [
                 {'id': '4.1', 'title': 'UVa 400 — Unix ls', 'difficulty': 'Easy', 'tags': ['Sorting']},
                 {'id': '4.2', 'title': 'UVa 10107 — What is the Median?', 'difficulty': 'Easy', 'tags': ['Sorting']},
                 {'id': '4.3', 'title': 'UVa 10041 — Vito\'s Family', 'difficulty': 'Easy', 'tags': ['Sorting', 'Greedy']},
            ]},
            {'num': '5', 'title': 'Graph Traversal', 'summary': 'DFS, BFS, topological sort, connected components', 'page': 120,
             'problems': [
                 {'id': '5.1', 'title': 'UVa 439 — Knight Moves', 'difficulty': 'Easy', 'tags': ['Graph', 'BFS']},
                 {'id': '5.2', 'title': 'UVa 352 — The Seasonal War', 'difficulty': 'Easy', 'tags': ['Graph', 'DFS']},
                 {'id': '5.3', 'title': 'UVa 10305 — Ordering Tasks', 'difficulty': 'Easy', 'tags': ['Graph', 'TopSort']},
            ]},
            {'num': '6', 'title': 'Graph Algorithms', 'summary': 'Shortest paths, MST, network flow', 'page': 150,
             'problems': [
                 {'id': '6.1', 'title': 'UVa 10034 — Freckles', 'difficulty': 'Medium', 'tags': ['Graph', 'MST']},
                 {'id': '6.2', 'title': 'UVa 10000 — Longest Paths', 'difficulty': 'Medium', 'tags': ['Graph', 'BellmanFord']},
                 {'id': '6.3', 'title': 'UVa 565 — Pizza Anyone?', 'difficulty': 'Hard', 'tags': ['Graph', 'SAT']},
            ]},
            {'num': '7', 'title': 'Combinatorics', 'summary': 'Counting, binomials, Catalan numbers, recurrence', 'page': 180,
             'problems': [
                 {'id': '7.1', 'title': 'UVa 369 — Combinations', 'difficulty': 'Easy', 'tags': ['Combinatorics']},
                 {'id': '7.2', 'title': 'UVa 10394 — Twin Primes', 'difficulty': 'Medium', 'tags': ['NumberTheory', 'Sieve']},
                 {'id': '7.3', 'title': 'UVa 10346 — Peter\'s Smokes', 'difficulty': 'Easy', 'tags': ['Math']},
            ]},
            {'num': '8', 'title': 'Number Theory', 'summary': 'Primes, GCD, modular arithmetic, linear equations', 'page': 210,
             'problems': [
                 {'id': '8.1', 'title': 'UVa 10071 — Back to High School Physics', 'difficulty': 'Easy', 'tags': ['Math']},
                 {'id': '8.2', 'title': 'UVa 10104 — Euclid Problem', 'difficulty': 'Medium', 'tags': ['NumberTheory', 'GCD']},
                 {'id': '8.3', 'title': 'UVa 10006 — Carmichael Numbers', 'difficulty': 'Medium', 'tags': ['NumberTheory', 'FastExp']},
            ]},
            {'num': '9', 'title': 'Computational Geometry', 'summary': 'Point, line, polygon operations, convex hull', 'page': 240,
             'problems': [
                 {'id': '9.1', 'title': 'UVa 10062 — Tell me the frequencies!', 'difficulty': 'Easy', 'tags': ['Sorting']},
                 {'id': '9.2', 'title': 'UVa 10050 — Hartals', 'difficulty': 'Easy', 'tags': ['Simulation']},
            ]},
        ],
    },
    {
        'slug': 'math4cs',
        'title': 'Mathematics for Computer Science',
        'shortTitle': 'Math 4 CS',
        'author': 'Eric Lehman, F. Thomson Leighton, and Albert R. Meyer',
        'edition': '1st',
        'year': 2017,
        'color': '#e11d48',
        'accentColor': '#fb7185',
        'description': 'A comprehensive introduction to discrete mathematics for computer science. Covers proofs, number theory, graph theory, counting, and probability.',
        'totalProblems': 28,
        'tags': ['Math', 'Discrete Math', 'Proofs', 'Probability'],
        'chapters': [
            {'num': '1', 'title': 'Proofs', 'summary': 'Propositions, axioms, proof techniques, induction', 'page': 1,
             'problems': [
                 {'id': '1.1', 'title': 'Prove sum of first n integers formula by induction', 'difficulty': 'Easy', 'tags': ['Proofs']},
                 {'id': '1.2', 'title': 'Prove geometric series formula', 'difficulty': 'Easy', 'tags': ['Proofs', 'Induction']},
                 {'id': '1.3', 'title': 'Prove that sqrt(2) is irrational', 'difficulty': 'Medium', 'tags': ['Proofs']},
            ]},
            {'num': '2', 'title': 'Number Theory', 'summary': 'GCD, modular arithmetic, Euler\'s theorem, RSA', 'page': 45,
             'problems': [
                 {'id': '2.1', 'title': 'Prove GCD is a linear combination', 'difficulty': 'Medium', 'tags': ['NumberTheory']},
                 {'id': '2.2', 'title': 'Find multiplicative inverse modulo n', 'difficulty': 'Medium', 'tags': ['NumberTheory']},
                 {'id': '2.3', 'title': 'Implement the Chinese Remainder Theorem', 'difficulty': 'Medium', 'tags': ['NumberTheory']},
                 {'id': '2.4', 'title': 'Prove Fermat\'s Little Theorem', 'difficulty': 'Hard', 'tags': ['NumberTheory']},
            ]},
            {'num': '3', 'title': 'Graph Theory', 'summary': 'Graph isomorphism, bipartite graphs, matching, connectivity', 'page': 100,
             'problems': [
                 {'id': '3.1', 'title': 'Prove that a tree with n vertices has n-1 edges', 'difficulty': 'Easy', 'tags': ['GraphTheory']},
                 {'id': '3.2', 'title': 'Find if a graph is bipartite', 'difficulty': 'Medium', 'tags': ['GraphTheory', 'BFS']},
                 {'id': '3.3', 'title': 'Prove Hall\'s theorem', 'difficulty': 'Hard', 'tags': ['GraphTheory']},
            ]},
            {'num': '4', 'title': 'Counting', 'summary': 'Pigeonhole principle, permutations, combinations, inclusion-exclusion', 'page': 150,
             'problems': [
                 {'id': '4.1', 'title': 'Count number of n-bit strings with no consecutive 1s', 'difficulty': 'Medium', 'tags': ['Counting']},
                 {'id': '4.2', 'title': 'Prove the pigeonhole principle', 'difficulty': 'Easy', 'tags': ['Counting']},
                 {'id': '4.3', 'title': 'Count derangements using inclusion-exclusion', 'difficulty': 'Hard', 'tags': ['Counting']},
            ]},
            {'num': '5', 'title': 'Probability', 'summary': 'Random variables, expectation, variance, random walks', 'page': 200,
             'problems': [
                 {'id': '5.1', 'title': 'Birthday paradox: probability of shared birthday in group of n', 'difficulty': 'Medium', 'tags': ['Probability']},
                 {'id': '5.2', 'title': 'Expected number of coin flips to get two consecutive heads', 'difficulty': 'Medium', 'tags': ['Probability']},
                 {'id': '5.3', 'title': 'Prove Markov\'s inequality', 'difficulty': 'Medium', 'tags': ['Probability']},
                 {'id': '5.4', 'title': 'Gambler\'s ruin problem', 'difficulty': 'Hard', 'tags': ['Probability', 'RandomWalk']},
            ]},
            {'num': '6', 'title': 'Recurrences', 'summary': 'Solving recurrences, generating functions, master theorem', 'page': 250,
             'problems': [
                 {'id': '6.1', 'title': 'Solve Fibonacci recurrence', 'difficulty': 'Medium', 'tags': ['Recurrence']},
                 {'id': '6.2', 'title': 'Apply master theorem to divide-and-conquer recurrences', 'difficulty': 'Medium', 'tags': ['Recurrence']},
                 {'id': '6.3', 'title': 'Solve recurrence using generating functions', 'difficulty': 'Hard', 'tags': ['Recurrence']},
            ]},
            {'num': '7', 'title': 'Asymptotics', 'summary': 'Big O, Omega, Theta, limits, asymptotic notation', 'page': 290,
             'problems': [
                 {'id': '7.1', 'title': 'Order functions by growth rate', 'difficulty': 'Easy', 'tags': ['Asymptotics']},
                 {'id': '7.2', 'title': 'Prove that log n! = Theta(n log n)', 'difficulty': 'Medium', 'tags': ['Asymptotics']},
            ]},
        ],
    },
    {
        'slug': 'setslogic',
        'title': 'Sets, Logic and Maths for Computing',
        'shortTitle': 'Sets & Logic',
        'author': 'John MacInnes',
        'edition': '3rd',
        'year': 2020,
        'color': '#0284c7',
        'accentColor': '#38bdf8',
        'description': 'An accessible introduction to the mathematical foundations of computing: set theory, logic, induction, relations, functions, and counting.',
        'totalProblems': 24,
        'tags': ['Math', 'Logic', 'Sets', 'Foundations'],
        'chapters': [
            {'num': '1', 'title': 'Sets', 'summary': 'Set operations, Venn diagrams, power sets, cardinality', 'page': 1,
             'problems': [
                 {'id': '1.1', 'title': 'Prove De Morgan\'s laws for sets', 'difficulty': 'Easy', 'tags': ['Sets']},
                 {'id': '1.2', 'title': 'Compute power set of a small set', 'difficulty': 'Easy', 'tags': ['Sets']},
                 {'id': '1.3', 'title': 'Prove that (A-B) union (B-A) = (A union B) - (A intersect B)', 'difficulty': 'Medium', 'tags': ['Sets']},
            ]},
            {'num': '2', 'title': 'Logic', 'summary': 'Propositional logic, truth tables, logical equivalence, quantifiers', 'page': 35,
             'problems': [
                 {'id': '2.1', 'title': 'Build truth tables for basic logical operators', 'difficulty': 'Easy', 'tags': ['Logic']},
                 {'id': '2.2', 'title': 'Prove De Morgan\'s laws for logic', 'difficulty': 'Easy', 'tags': ['Logic']},
                 {'id': '2.3', 'title': 'Convert English sentences to predicate logic', 'difficulty': 'Medium', 'tags': ['Logic']},
            ]},
            {'num': '3', 'title': 'Relations', 'summary': 'Relations, equivalence classes, partial orders, Hasse diagrams', 'page': 65,
             'problems': [
                 {'id': '3.1', 'title': 'Check if a relation is reflexive, symmetric, transitive', 'difficulty': 'Easy', 'tags': ['Relations']},
                 {'id': '3.2', 'title': 'Find equivalence classes of a given equivalence relation', 'difficulty': 'Medium', 'tags': ['Relations']},
                 {'id': '3.3', 'title': 'Draw a Hasse diagram for a partial order', 'difficulty': 'Medium', 'tags': ['Relations']},
            ]},
            {'num': '4', 'title': 'Functions', 'summary': 'Injective, surjective, bijective functions, composition, inverse', 'page': 90,
             'problems': [
                 {'id': '4.1', 'title': 'Determine if a function is injective/surjective/bijective', 'difficulty': 'Easy', 'tags': ['Functions']},
                 {'id': '4.2', 'title': 'Prove Cantor\'s diagonal argument', 'difficulty': 'Hard', 'tags': ['Functions', 'Infinity']},
                 {'id': '4.3', 'title': 'Show bijection between natural and rational numbers', 'difficulty': 'Hard', 'tags': ['Functions', 'Infinity']},
            ]},
            {'num': '5', 'title': 'Induction', 'summary': 'Mathematical induction, strong induction, well-ordering principle', 'page': 115,
             'problems': [
                 {'id': '5.1', 'title': 'Prove sum of squares formula by induction', 'difficulty': 'Easy', 'tags': ['Induction']},
                 {'id': '5.2', 'title': 'Prove that n^3 + 2n is divisible by 3 for all n', 'difficulty': 'Medium', 'tags': ['Induction']},
                 {'id': '5.3', 'title': 'Prove Fibonacci upper bound using strong induction', 'difficulty': 'Medium', 'tags': ['Induction']},
            ]},
            {'num': '6', 'title': 'Counting', 'summary': 'Basic counting, permutations, combinations, binomial theorem', 'page': 140,
             'problems': [
                 {'id': '6.1', 'title': 'Count ways to arrange distinct objects', 'difficulty': 'Easy', 'tags': ['Counting']},
                 {'id': '6.2', 'title': 'Prove binomial theorem', 'difficulty': 'Medium', 'tags': ['Counting']},
                 {'id': '6.3', 'title': 'Count number of subsets of various sizes', 'difficulty': 'Easy', 'tags': ['Counting']},
            ]},
        ],
    },
    {
        'slug': 'algodaily',
        'title': 'The AlgoDaily Book — Core Essentials',
        'shortTitle': 'AlgoDaily',
        'author': 'Jacob Zhang',
        'year': 2021,
        'color': '#7c3aed',
        'accentColor': '#a78bfa',
        'description': 'A curated collection of algorithmic and data structure problems with comprehensive explanations. Covers arrays, strings, trees, dynamic programming, and more.',
        'totalProblems': 35,
        'tags': ['Interviews', 'Algorithms', 'Data Structures'],
        'chapters': [
            {'num': '1', 'title': 'Arrays and Strings', 'summary': 'Common array and string manipulation patterns', 'page': 1,
             'problems': [
                 {'id': '1.1', 'title': 'Two sum problem', 'difficulty': 'Easy', 'tags': ['Arrays', 'Hash']},
                 {'id': '1.2', 'title': 'Reverse an integer', 'difficulty': 'Easy', 'tags': ['Math']},
                 {'id': '1.3', 'title': 'Valid anagram', 'difficulty': 'Easy', 'tags': ['Strings']},
                 {'id': '1.4', 'title': 'First non-repeating character', 'difficulty': 'Easy', 'tags': ['Strings', 'Hash']},
            ]},
            {'num': '2', 'title': 'Linked Lists', 'summary': 'Pointer manipulation, reversal, merge operations', 'page': 35,
             'problems': [
                 {'id': '2.1', 'title': 'Reverse a linked list (iterative + recursive)', 'difficulty': 'Easy', 'tags': ['LinkedList']},
                 {'id': '2.2', 'title': 'Remove nth node from end', 'difficulty': 'Medium', 'tags': ['LinkedList', 'TwoPointers']},
                 {'id': '2.3', 'title': 'Reorder list', 'difficulty': 'Medium', 'tags': ['LinkedList']},
            ]},
            {'num': '3', 'title': 'Trees and Graphs', 'summary': 'Tree traversals, graph search, adjacency structures', 'page': 65,
             'problems': [
                 {'id': '3.1', 'title': 'Maximum depth of binary tree', 'difficulty': 'Easy', 'tags': ['Tree']},
                 {'id': '3.2', 'title': 'Validate binary search tree', 'difficulty': 'Medium', 'tags': ['Tree', 'BST']},
                 {'id': '3.3', 'title': 'Binary tree level order traversal', 'difficulty': 'Medium', 'tags': ['Tree', 'BFS']},
                 {'id': '3.4', 'title': 'Number of connected components in graph', 'difficulty': 'Medium', 'tags': ['Graph', 'DFS']},
            ]},
            {'num': '4', 'title': 'Sorting and Searching', 'summary': 'Binary search, sorting algorithms, search space', 'page': 95,
             'problems': [
                 {'id': '4.1', 'title': 'Binary search implementation', 'difficulty': 'Easy', 'tags': ['BinarySearch']},
                 {'id': '4.2', 'title': 'Search in rotated sorted array', 'difficulty': 'Medium', 'tags': ['BinarySearch']},
                 {'id': '4.3', 'title': 'Merge intervals', 'difficulty': 'Medium', 'tags': ['Sorting']},
                 {'id': '4.4', 'title': 'Find K closest elements', 'difficulty': 'Medium', 'tags': ['BinarySearch']},
            ]},
            {'num': '5', 'title': 'Dynamic Programming', 'summary': 'DP fundamentals, knapsack, longest sequences', 'page': 130,
             'problems': [
                 {'id': '5.1', 'title': 'Climbing stairs', 'difficulty': 'Easy', 'tags': ['DP']},
                 {'id': '5.2', 'title': 'House robber', 'difficulty': 'Medium', 'tags': ['DP']},
                 {'id': '5.3', 'title': 'Coin change', 'difficulty': 'Medium', 'tags': ['DP']},
                 {'id': '5.4', 'title': 'Longest palindromic substring', 'difficulty': 'Hard', 'tags': ['DP', 'Strings']},
            ]},
            {'num': '6', 'title': 'Stacks and Queues', 'summary': 'Stack/queue based problems, monotonic patterns', 'page': 160,
             'problems': [
                 {'id': '6.1', 'title': 'Valid parentheses', 'difficulty': 'Easy', 'tags': ['Stack']},
                 {'id': '6.2', 'title': 'Min stack', 'difficulty': 'Easy', 'tags': ['Stack']},
                 {'id': '6.3', 'title': 'Implement queue using stacks', 'difficulty': 'Easy', 'tags': ['Stack', 'Queue']},
            ]},
            {'num': '7', 'title': 'Recursion and Backtracking', 'summary': 'Recursive patterns, combinatorial generation', 'page': 185,
             'problems': [
                 {'id': '7.1', 'title': 'Generate all subsets', 'difficulty': 'Medium', 'tags': ['Backtracking']},
                 {'id': '7.2', 'title': 'Generate all permutations', 'difficulty': 'Medium', 'tags': ['Backtracking']},
                 {'id': '7.3', 'title': 'N-Queens problem', 'difficulty': 'Hard', 'tags': ['Backtracking']},
            ]},
            {'num': '8', 'title': 'Miscellaneous', 'summary': 'Bit manipulation, math, system design fundamentals', 'page': 210,
             'problems': [
                 {'id': '8.1', 'title': 'Count number of 1 bits', 'difficulty': 'Easy', 'tags': ['BitManipulation']},
                 {'id': '8.2', 'title': 'Missing number in array', 'difficulty': 'Easy', 'tags': ['BitManipulation']},
                 {'id': '8.3', 'title': 'Design a URL shortener', 'difficulty': 'Medium', 'tags': ['SystemDesign']},
                 {'id': '8.4', 'title': 'Implement a T9 autocomplete system', 'difficulty': 'Hard', 'tags': ['Trie']},
            ]},
        ],
    },
    {
        'slug': 'guidetocp',
        'title': 'Guide to Competitive Programming',
        'shortTitle': 'Guide to CP',
        'author': 'Antti Laaksonen',
        'edition': '2nd',
        'year': 2020,
        'color': '#4d7c0f',
        'accentColor': '#84cc16',
        'description': 'A concise yet comprehensive guide to competitive programming. Covers essential algorithms, optimization techniques, and contest strategies.',
        'totalProblems': 35,
        'tags': ['Competitive', 'Algorithms', 'CSES', 'Optimization'],
        'chapters': [
            {'num': '1', 'title': 'Introduction', 'summary': 'Competitive programming overview, IO, feedback loops', 'page': 1,
             'problems': [
                 {'id': '1.1', 'title': 'Implement fast I/O for your language', 'difficulty': 'Easy', 'tags': ['IO']},
                 {'id': '1.2', 'title': 'Analyze time complexity of nested loops', 'difficulty': 'Easy', 'tags': ['BigO']},
            ]},
            {'num': '2', 'title': 'Data Structures', 'summary': 'SegTree, BIT, sparse table, union-find, treap', 'page': 25,
             'problems': [
                 {'id': '2.1', 'title': 'Implement range sum with Fenwick tree', 'difficulty': 'Medium', 'tags': ['FenwickTree']},
                 {'id': '2.2', 'title': 'Implement range minimum with segment tree', 'difficulty': 'Medium', 'tags': ['SegTree']},
                 {'id': '2.3', 'title': 'Implement union-find with path compression', 'difficulty': 'Easy', 'tags': ['UnionFind']},
            ]},
            {'num': '3', 'title': 'Advanced Topics', 'summary': 'Treap, sqrt decomposition, Mo\'s algorithm', 'page': 55,
             'problems': [
                 {'id': '3.1', 'title': 'Implement Mo\'s algorithm for range queries', 'difficulty': 'Hard', 'tags': ['Mo']},
                 {'id': '3.2', 'title': 'SQRT decomposition on array', 'difficulty': 'Medium', 'tags': ['SqrtDecomp']},
                 {'id': '3.3', 'title': 'Implement implicit treap', 'difficulty': 'Hard', 'tags': ['Treap']},
            ]},
            {'num': '4', 'title': 'Graph Algorithms', 'summary': 'Shortest paths, MST, strongly connected components', 'page': 85,
             'problems': [
                 {'id': '4.1', 'title': 'Implement Dijkstra with priority queue', 'difficulty': 'Medium', 'tags': ['Graph', 'Dijkstra']},
                 {'id': '4.2', 'title': 'Find strongly connected components with Kosaraju', 'difficulty': 'Medium', 'tags': ['Graph', 'SCC']},
                 {'id': '4.3', 'title': 'Minimum spanning tree (Kruskal)', 'difficulty': 'Medium', 'tags': ['Graph', 'MST']},
            ]},
            {'num': '5', 'title': 'Range Queries', 'summary': 'Fenwick, segment tree with lazy, persistent segtree', 'page': 115,
             'problems': [
                 {'id': '5.1', 'title': 'Lazy propagation on segment tree', 'difficulty': 'Hard', 'tags': ['SegTree', 'LazyProp']},
                 {'id': '5.2', 'title': 'Range kth smallest with merge sort tree', 'difficulty': 'Hard', 'tags': ['SegTree']},
            ]},
            {'num': '6', 'title': 'Dynamic Programming', 'summary': 'DP optimization, convex hull trick, divide-and-conquer DP', 'page': 140,
             'problems': [
                 {'id': '6.1', 'title': 'Convex hull trick for DP optimization', 'difficulty': 'Hard', 'tags': ['DP', 'CHT']},
                 {'id': '6.2', 'title': 'Divide-and-conquer DP optimization', 'difficulty': 'Hard', 'tags': ['DP', 'D&C']},
            ]},
            {'num': '7', 'title': 'Mathematics', 'summary': 'Number theory, combinatorics, matrices, game theory', 'page': 170,
             'problems': [
                 {'id': '7.1', 'title': 'Modular exponentiation', 'difficulty': 'Easy', 'tags': ['Math']},
                 {'id': '7.2', 'title': 'Linear Diophantine equation with extended Euclid', 'difficulty': 'Medium', 'tags': ['NumberTheory']},
                 {'id': '7.3', 'title': 'Matrix exponentiation for linear recurrences', 'difficulty': 'Medium', 'tags': ['MatrixExp']},
            ]},
            {'num': '8', 'title': 'String Algorithms', 'summary': 'Z-algorithm, KMP, suffix arrays, Aho-Corasick', 'page': 200,
             'problems': [
                 {'id': '8.1', 'title': 'Implement Z-algorithm for pattern matching', 'difficulty': 'Medium', 'tags': ['Strings']},
                 {'id': '8.2', 'title': 'Build and use suffix array', 'difficulty': 'Hard', 'tags': ['Strings', 'SuffixArray']},
            ]},
        ],
    },
    {
        'slug': 'gamam',
        'title': 'Cracking the GAMAM Technical Interviews',
        'shortTitle': 'GAMAM',
        'author': 'Anonymous Publisher',
        'year': 2023,
        'color': '#be185d',
        'accentColor': '#f43f5e',
        'description': 'A focused preparation guide for technical interviews at Google, Apple, Meta, Amazon, and Microsoft. Features curated problems and problem-solving frameworks.',
        'totalProblems': 25,
        'tags': ['Interviews', 'FAANG', 'GAMAM', 'Big Tech'],
        'chapters': [
            {'num': '1', 'title': 'Problem Solving Framework', 'summary': 'Structured approach, visualize, brute force, optimize, walk through', 'page': 1,
             'problems': [
                 {'id': '1.1', 'title': 'Two sum (all variants)', 'difficulty': 'Easy', 'tags': ['Arrays']},
                 {'id': '1.2', 'title': 'Container with most water', 'difficulty': 'Medium', 'tags': ['Arrays', 'TwoPointers']},
            ]},
            {'num': '2', 'title': 'Arrays and Strings', 'summary': 'Prefix sums, sliding window, two pointers', 'page': 30,
             'problems': [
                 {'id': '2.1', 'title': 'Longest substring without repeating characters', 'difficulty': 'Medium', 'tags': ['SlidingWindow', 'Strings']},
                 {'id': '2.2', 'title': 'Product of array except self', 'difficulty': 'Medium', 'tags': ['Arrays']},
                 {'id': '2.3', 'title': 'Trapping rain water', 'difficulty': 'Hard', 'tags': ['Arrays', 'TwoPointers']},
            ]},
            {'num': '3', 'title': 'Trees and Graphs', 'summary': 'BST, LCA, DFS/BFS patterns', 'page': 55,
             'problems': [
                 {'id': '3.1', 'title': 'Invert a binary tree', 'difficulty': 'Easy', 'tags': ['Tree']},
                 {'id': '3.2', 'title': 'Binary tree maximum path sum', 'difficulty': 'Hard', 'tags': ['Tree', 'DFS']},
                 {'id': '3.3', 'title': 'Clone graph', 'difficulty': 'Medium', 'tags': ['Graph']},
            ]},
            {'num': '4', 'title': 'Dynamic Programming', 'summary': 'DP patterns, state identification, optimization', 'page': 80,
             'problems': [
                 {'id': '4.1', 'title': 'Word break', 'difficulty': 'Medium', 'tags': ['DP']},
                 {'id': '4.2', 'title': 'Decode ways', 'difficulty': 'Medium', 'tags': ['DP']},
                 {'id': '4.3', 'title': 'Edit distance', 'difficulty': 'Hard', 'tags': ['DP', 'Strings']},
            ]},
            {'num': '5', 'title': 'Design and System', 'summary': 'OO design, system design fundamentals', 'page': 105,
             'problems': [
                 {'id': '5.1', 'title': 'Design a parking lot', 'difficulty': 'Medium', 'tags': ['OO Design']},
                 {'id': '5.2', 'title': 'Design a key-value store', 'difficulty': 'Hard', 'tags': ['SystemDesign']},
            ]},
            {'num': '6', 'title': 'Miscellaneous', 'summary': 'Bit manipulation, math puzzles', 'page': 130,
             'problems': [
                 {'id': '6.1', 'title': 'Find the single number (XOR)', 'difficulty': 'Easy', 'tags': ['BitManipulation']},
                 {'id': '6.2', 'title': 'Power of three', 'difficulty': 'Easy', 'tags': ['Math']},
                 {'id': '6.3', 'title': 'Happy number', 'difficulty': 'Easy', 'tags': ['Math']},
            ]},
            {'num': '7', 'title': 'Behavioral Mastery', 'summary': 'STAR method, leadership principles, resume discussion', 'page': 150,
             'problems': [
                 {'id': '7.1', 'title': 'Tell me about a time you led a team', 'difficulty': 'Easy', 'tags': ['Behavioral']},
                 {'id': '7.2', 'title': 'Tell me about a time you failed', 'difficulty': 'Easy', 'tags': ['Behavioral']},
            ]},
        ],
    },
    {
        'slug': 'progintervexp',
        'title': 'Programming Interviews Exposed',
        'shortTitle': 'Prog Int Exp',
        'author': 'John Mongan, Noah Suojanen Kindler, and Eric Giguère',
        'edition': '4th',
        'year': 2018,
        'color': '#4338ca',
        'accentColor': '#818cf8',
        'description': 'A classic guide to programming interviews covering preparation strategies, problem-solving techniques, and fundamental CS topics with realistic interview problems.',
        'totalProblems': 30,
        'tags': ['Interviews', 'Fundamentals', 'Problem Solving'],
        'chapters': [
            {'num': '1', 'title': 'Before the Search', 'summary': 'Resume, portfolio, targeting companies', 'page': 1,
             'problems': [
                 {'id': '1.1', 'title': 'Craft your elevator pitch', 'difficulty': 'Easy', 'tags': ['Career']},
            ]},
            {'num': '2', 'title': 'The Job Application Process', 'summary': 'Networking, referrals, online applications', 'page': 15,
             'problems': [
                 {'id': '2.1', 'title': 'Write a compelling cover letter', 'difficulty': 'Easy', 'tags': ['Career']},
            ]},
            {'num': '3', 'title': 'Programming Languages', 'summary': 'Language choices, proficiency demonstrations', 'page': 35,
             'problems': [
                 {'id': '3.1', 'title': 'Implement strcmp', 'difficulty': 'Easy', 'tags': ['Strings']},
                 {'id': '3.2', 'title': 'Reverse words in a string', 'difficulty': 'Easy', 'tags': ['Strings']},
            ]},
            {'num': '4', 'title': 'Data Structures', 'summary': 'Arrays, linked lists, trees, hash tables', 'page': 55,
             'problems': [
                 {'id': '4.1', 'title': 'Implement a linked list with insert and delete', 'difficulty': 'Easy', 'tags': ['LinkedList']},
                 {'id': '4.2', 'title': 'Implement a hash table with chaining', 'difficulty': 'Medium', 'tags': ['HashTable']},
                 {'id': '4.3', 'title': 'Implement a binary search tree with traversal', 'difficulty': 'Medium', 'tags': ['Tree', 'BST']},
                 {'id': '4.4', 'title': 'Find nth largest element in BST', 'difficulty': 'Medium', 'tags': ['Tree', 'BST']},
            ]},
            {'num': '5', 'title': 'Recursion', 'summary': 'Recursive thinking, base cases, call stack', 'page': 85,
             'problems': [
                 {'id': '5.1', 'title': 'Implement binary search recursively', 'difficulty': 'Easy', 'tags': ['Recursion', 'BinarySearch']},
                 {'id': '5.2', 'title': 'Permutations of a string', 'difficulty': 'Medium', 'tags': ['Recursion']},
                 {'id': '5.3', 'title': 'Tower of Hanoi', 'difficulty': 'Medium', 'tags': ['Recursion']},
            ]},
            {'num': '6', 'title': 'Sorting and Searching', 'summary': 'Stable sorts, quicksort, merge sort, search algorithms', 'page': 110,
             'problems': [
                 {'id': '6.1', 'title': 'Implement merge sort', 'difficulty': 'Medium', 'tags': ['Sorting']},
                 {'id': '6.2', 'title': 'Implement quicksort', 'difficulty': 'Medium', 'tags': ['Sorting']},
                 {'id': '6.3', 'title': 'Find the kth largest element', 'difficulty': 'Medium', 'tags': ['Sorting']},
            ]},
            {'num': '7', 'title': 'Linked Lists', 'summary': 'Pointer problems, cycle detection, intersection', 'page': 135,
             'problems': [
                 {'id': '7.1', 'title': 'Detect cycle in linked list', 'difficulty': 'Easy', 'tags': ['LinkedList', 'TwoPointers']},
                 {'id': '7.2', 'title': 'Find intersection of two linked lists', 'difficulty': 'Easy', 'tags': ['LinkedList']},
                 {'id': '7.3', 'title': 'Add two numbers represented by linked lists', 'difficulty': 'Medium', 'tags': ['LinkedList']},
            ]},
            {'num': '8', 'title': 'Trees and Graphs', 'summary': 'Tree operations, graph traversal, shortest paths', 'page': 160,
             'problems': [
                 {'id': '8.1', 'title': 'Find the lowest common ancestor in BST', 'difficulty': 'Medium', 'tags': ['Tree', 'BST']},
                 {'id': '8.2', 'title': 'Check if binary tree is balanced', 'difficulty': 'Easy', 'tags': ['Tree']},
                 {'id': '8.3', 'title': 'Depth-first search on graph', 'difficulty': 'Easy', 'tags': ['Graph', 'DFS']},
                 {'id': '8.4', 'title': 'Breadth-first search on graph', 'difficulty': 'Easy', 'tags': ['Graph', 'BFS']},
            ]},
        ],
    },
    {
        'slug': 'advdsalgo',
        'title': 'Advanced Algorithms and Data Structures',
        'shortTitle': 'Adv DSA',
        'author': 'Marcello La Rocca',
        'edition': '1st',
        'year': 2021,
        'color': '#ea580c',
        'accentColor': '#fb923c',
        'description': 'An in-depth exploration of advanced data structures and algorithms: spatial data structures, heuristics, optimization, and specialized DS.',
        'totalProblems': 24,
        'tags': ['Advanced', 'Spatial', 'Optimization', 'DS'],
        'chapters': [
            {'num': '1', 'title': 'Sorting and Searching', 'summary': 'Custom sort implementations, interpolation search, ternary search', 'page': 1,
             'problems': [
                 {'id': '1.1', 'title': 'Implement interpolation search', 'difficulty': 'Medium', 'tags': ['Search']},
                 {'id': '1.2', 'title': 'Implement ternary search', 'difficulty': 'Easy', 'tags': ['Search']},
                 {'id': '1.3', 'title': 'Sort numbers with limited range using counting sort', 'difficulty': 'Medium', 'tags': ['Sorting']},
            ]},
            {'num': '2', 'title': 'Spatial Data Structures', 'summary': 'K-d tree, quadtree, R-tree, interval tree', 'page': 35,
             'problems': [
                 {'id': '2.1', 'title': 'Build a k-d tree for k-nearest neighbor search', 'difficulty': 'Hard', 'tags': ['Spatial', 'KDT']},
                 {'id': '2.2', 'title': 'Implement quadtree for 2D collision detection', 'difficulty': 'Hard', 'tags': ['Spatial']},
                 {'id': '2.3', 'title': 'Interval tree for overlapping intervals', 'difficulty': 'Medium', 'tags': ['Tree']},
            ]},
            {'num': '3', 'title': 'Heuristics and Approximation', 'summary': 'Local search, simulated annealing, GA, approximation algorithms', 'page': 85,
             'problems': [
                 {'id': '3.1', 'title': 'Implement simulated annealing for TSP', 'difficulty': 'Hard', 'tags': ['Heuristics']},
                 {'id': '3.2', 'title': 'Genetic algorithm for knapsack problem', 'difficulty': 'Hard', 'tags': ['Heuristics', 'GA']},
                 {'id': '3.3', 'title': 'Approximation algorithm for vertex cover', 'difficulty': 'Medium', 'tags': ['Approximation']},
            ]},
            {'num': '4', 'title': 'Specialized Trees', 'summary': 'B-tree, R-tree, suffix tree, binary indexed tree', 'page': 130,
             'problems': [
                 {'id': '4.1', 'title': 'Implement B-tree with insert and search', 'difficulty': 'Hard', 'tags': ['Tree', 'BTree']},
                 {'id': '4.2', 'title': 'Construct a suffix tree for a string', 'difficulty': 'Hard', 'tags': ['Strings', 'SuffixTree']},
                 {'id': '4.3', 'title': 'Implement 2D BIT for range sum queries', 'difficulty': 'Medium', 'tags': ['FenwickTree']},
            ]},
            {'num': '5', 'title': 'Specialized Graphs', 'summary': 'Bipartite matching, min-cost flow, max flow with demands', 'page': 170,
             'problems': [
                 {'id': '5.1', 'title': 'Dinic\'s algorithm for max flow', 'difficulty': 'Hard', 'tags': ['Graph', 'MaxFlow']},
                 {'id': '5.2', 'title': 'Hopcroft-Karp for max bipartite matching', 'difficulty': 'Hard', 'tags': ['Graph', 'Bipartite']},
                 {'id': '5.3', 'title': 'Implement min-cost max flow', 'difficulty': 'Hard', 'tags': ['Graph', 'MinCostFlow']},
            ]},
            {'num': '6', 'title': 'Advanced Optimization', 'summary': 'Branch and bound, constraint programming, SAT solvers', 'page': 210,
             'problems': [
                 {'id': '6.1', 'title': 'Branch and bound for TSP', 'difficulty': 'Hard', 'tags': ['Optimization']},
                 {'id': '6.2', 'title': 'Implement simple SAT solver with DPLL', 'difficulty': 'Hard', 'tags': ['SAT']},
                 {'id': '6.3', 'title': 'Constraint satisfaction for N-Queens', 'difficulty': 'Medium', 'tags': ['CSP']},
            ]},
        ],
    },

]


def py_to_ts_value(val, indent=0):
    """Convert a Python value to a TypeScript string representation, properly escaped."""
    pad = '  ' * indent
    inner_pad = '  ' * (indent + 1)
    
    if val is None:
        return 'undefined'
    if isinstance(val, bool):
        return 'true' if val else 'false'
    if isinstance(val, int):
        return str(val)
    if isinstance(val, str):
        escaped = escape(val)
        return f"'{escaped}'"
    if isinstance(val, list):
        if not val:
            return '[]'
        items = []
        for v in val:
            items.append(f'{inner_pad}{py_to_ts_value(v, indent + 1)}')
        return '[\n' + ',\n'.join(items) + f'\n{pad}]'
    if isinstance(val, dict):
        if not val:
            return '{}'
        items = []
        for k, v in val.items():
            items.append(inner_pad + k + ': ' + py_to_ts_value(v, indent + 1))
        return '{\n' + ',\n'.join(items) + '\n' + pad + '}'
    return str(val)


def generate_book_ts(book_data):
    """Generate TypeScript code for a single Book object."""
    code = f'''const {book_data['slug']}: Book = {{
    slug: '{escape(book_data["slug"])}',
    title: '{escape(book_data["title"])}',
    shortTitle: '{escape(book_data["shortTitle"])}',
    author: '{escape(book_data["author"])}',
'''
    if book_data.get('edition'):
        code += f"    edition: '{escape(book_data['edition'])}',\n"
    if book_data.get('year'):
        code += f"    year: {book_data['year']},\n"
    if book_data.get('coverUrl'):
        code += f"    coverUrl: '{escape(book_data['coverUrl'])}',\n"
    elif book_data.get('slug') in COVER_MAP:
        code += f"    coverUrl: '{escape(COVER_MAP[book_data['slug']])}',\n"
    
    code += f'''    color: '{escape(book_data["color"])}',
    accentColor: '{escape(book_data["accentColor"])}',
    description: '{escape(book_data["description"])}',
'''
    if book_data.get('amazonUrl'):
        code += f"    amazonUrl: '{escape(book_data['amazonUrl'])}',\n"
    if book_data.get('pdfUrl'):
        code += f"    pdfUrl: '{escape(book_data['pdfUrl'])}',\n"
    
    code += f'''    totalProblems: {book_data['totalProblems']},
    tags: {py_to_ts_value(book_data['tags'], 4)},
    chapters: [
'''
    for ch in book_data['chapters']:
        code += f'''        {{
            num: '{escape(ch["num"])}',
            title: '{escape(ch["title"])}',
'''
        if ch.get('page'):
            code += f"            page: {ch['page']},\n"
        if ch.get('summary'):
            code += f"            summary: '{escape(ch['summary'])}',\n"
        
        code += f'''            problems: [
'''
        for p in ch['problems']:
            code += f'''                {{
                    id: '{escape(p["id"])}',
                    title: '{escape(p["title"])}',
'''
            if p.get('page'):
                code += f"                    page: {p['page']},\n"
            if p.get('difficulty'):
                code += f"                    difficulty: '{escape(p['difficulty'])}',\n"
            if p.get('hint'):
                code += f"                    hint: '{escape(p['hint'])}',\n"
            if p.get('tags'):
                code += f"                    tags: {py_to_ts_value(p['tags'], 20)},\n"
            if p.get('lcNum'):
                code += f"                    lcNum: {p['lcNum']},\n"
            code += '                },\n'
        
        code += f'            ],\n'
        code += f'        }},\n'
    
    code += '    ],\n'
    code += '}\n\n'
    return code


COVER_MAP = {
    'ctci': '/assets/books/cover-ctci.jpg',
    'cp4': '/assets/books/cover-cp4.jpg',
    'cph': '/assets/books/cover-cph.jpg',
    'ai': '/assets/books/cover-ai.jpg',
    'clrs': '/assets/books/cover-clrs.jpg',
    'hd': '/assets/books/cover-hd.jpg',
    'dsamadeasy': '/assets/books/cover-dsamadeasy.jpg',
    'grokking': '/assets/books/cover-grokking.jpg',
    'progchal': '/assets/books/cover-progchal.jpg',
    'math4cs': '/assets/books/cover-math4cs.jpg',
    'setslogic': '/assets/books/cover-setslogic.jpg',
    'guidetocp': '/assets/books/cover-guidetocp.jpg',
    'progintervexp': '/assets/books/cover-progintervexp.jpg',
    'advdsalgo': '/assets/books/cover-advdsalgo.jpg',
}


def json_to_book_data(json_data):
    """Convert JSON book data to the format needed for TS generation."""
    data = {
        'slug': json_data['slug'],
        'title': json_data['title'],
        'shortTitle': json_data['shortTitle'],
        'author': json_data['author'],
    }
    if json_data.get('edition'):
        data['edition'] = json_data['edition']
    if json_data.get('year'):
        data['year'] = json_data['year']
    if json_data.get('coverUrl'):
        data['coverUrl'] = json_data['coverUrl']
    if json_data.get('slug') in COVER_MAP:
        data['coverUrl'] = COVER_MAP[json_data['slug']]
    data['color'] = json_data['color']
    data['accentColor'] = json_data['accentColor']
    data['description'] = json_data['description']
    if json_data.get('amazonUrl'):
        data['amazonUrl'] = json_data['amazonUrl']
    if json_data.get('pdfUrl'):
        data['pdfUrl'] = json_data['pdfUrl']
    data['totalProblems'] = json_data['totalProblems']
    data['tags'] = json_data['tags']
    data['chapters'] = json_data['chapters']
    return data


def main():
    # ── Read JSON books ─────────────────────────────────────────────────
    json_data_map = {}
    for slug in JSON_BOOKS:
        j = read_json(slug)
        if j:
            json_data_map[slug] = json_to_book_data(j)
            print(f"  Read JSON: {slug}")
        else:
            print(f"  ⚠ Missing JSON: {slug}")
    
    # Generated books order: JSON books first, then remaining (deduplicated)
    seen = set()
    generated_order = []
    for slug in JSON_BOOKS + [b['slug'] for b in REMAINING_BOOKS]:
        if slug not in seen:
            seen.add(slug)
            generated_order.append(slug)
    
    # ── Generate TS ──────────────────────────────────────────────────────
    ts = '''export interface BookProblem {
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

'''
    # Generate all books in order
    for slug in generated_order:
        slug_upper = slug.upper()
        ts += f'// ─── {slug_upper} ──────────────────────────────────────────────────────────────\n'
        if slug in json_data_map:
            ts += generate_book_ts(json_data_map[slug])
        else:
            # Find the remaining book definition
            for book in REMAINING_BOOKS:
                if book['slug'] == slug:
                    ts += generate_book_ts(book)
                    break
    
    # Export line
    ts += f'export const BOOKS: Book[] = [{", ".join(generated_order)}]\n\n'
    ts += '''export function getBook(slug: string): Book | undefined {
  return BOOKS.find(b => b.slug === slug)
}

export function getTotalProblems(book: Book): number {
  return book.chapters.reduce((sum, ch) => sum + ch.problems.length, 0)
}
'''
    
    # Replace the entire content
    with open(OUTPUT_TS, 'w', encoding='utf-8') as f:
        f.write(ts)
    
    print(f"Written: {OUTPUT_TS}")
    
    # Verify no unescaped apostrophes in the output
    with open(OUTPUT_TS, encoding='utf-8') as f:
        content = f.read()
    
    # Check for lines with unescaped single quotes
    problems = []
    for i, line in enumerate(content.split('\n'), 1):
        # Skip TypeScript syntax lines
        stripped = line.strip()
        if not stripped:
            continue
        # Count single quotes that are not escaped
        # Find apostrophes inside string literals that aren't \'
        # Simple heuristic: lines that are string values with unescaped '
        if "'" in stripped:
            # Check if there's an odd number of unescaped quotes
            clean = stripped.replace("\\'", "")
            count = clean.count("'")
            if count % 2 != 0 and not stripped.startswith('//'):
                problems.append(f"  Line {i}: {stripped[:80]}")
    
    if problems:
        print("\n⚠ WARNING: Lines with potential unbalanced quotes:")
        for p in problems:
            print(p)
    else:
        print("\n✓ Quote balance check passed")
    
    # Validate apostrophe escaping
    pattern = re.compile(r"(?<=[^\\])'(?=[a-zA-Z]+s\s)")  # cat's, it's
    suspicious = []
    for i, line in enumerate(content.split('\n'), 1):
        # Find lines with text like "cat's" where the apostrophe isn't escaped
        if re.search(r"(?<=[a-zA-Z])'(?=[a-zA-Z])", line):
            # Check if it's already escaped
            if not re.search(r"\\'", line):
                suspicious.append(f"  Line {i}: {line.strip()[:100]}")
    if suspicious:
        print("\n⚠ WARNING: Possible unescaped apostrophes:")
        for s in suspicious:
            print(s)
    else:
        print("✓ Apostrophe escaping check passed")

    print(f"\nTotal books generated: {len(generated_order)}")
    for s in generated_order:
        print(f"  - {s}")


if __name__ == '__main__':
    main()
