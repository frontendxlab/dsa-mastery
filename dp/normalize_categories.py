import csv
from collections import Counter

path = '/home/rashid/Project/dsa-mastery/dp/all_dp_problems.csv'

canonical_map = {
    # 1D DP
    "1D DP": "1D DP",
    "DP": "1D DP",
    "Memoization": "1D DP",
    "DP with Mod": "1D DP",
    "DP with Constraints": "1D DP",
    "Greedy DP": "1D DP",
    "Greedy + DP": "1D DP",
    "Cumulative Sum DP": "1D DP",
    "Construction DP": "1D DP",
    "Counting DP": "1D DP",
    "DP with Math": "1D DP",

    # 2D DP / Grid DP
    "2D DP / Grid DP": "2D DP / Grid DP",
    "2D DP": "2D DP / Grid DP",
    "Grid DP": "2D DP / Grid DP",
    "2D Grid DP": "2D DP / Grid DP",

    # DP on Strings
    "DP on Strings": "DP on Strings",
    "String DP": "DP on Strings",

    # DP on Trees
    "DP on Trees": "DP on Trees",
    "Tree DP": "DP on Trees",
    "DP on Tree": "DP on Trees",
    "DP with Bitmask / Tree DP": "DP on Trees",
    "Rerooting DP": "DP on Trees",

    # DP with Bitmask
    "DP with Bitmask / SOS DP": "DP with Bitmask",
    "DP with Bitmask": "DP with Bitmask",
    "Bitmask DP": "DP with Bitmask",
    "SOS DP": "DP with Bitmask",

    # DP on Intervals
    "DP on Intervals": "DP on Intervals",
    "Interval DP": "DP on Intervals",
    "Range DP": "DP on Intervals",
    "DP on Subarrays": "DP on Intervals",
    "Partition DP": "DP on Intervals",

    # DP with State Machine
    "DP with State Machine": "DP with State Machine",
    "Stock DP": "DP with State Machine",

    # Digit DP
    "Digit DP": "Digit DP",
    "Digi DP": "Digit DP",

    # DP with Probability / Expected Value
    "Probability / Expected Value DP": "DP with Probability / Expected Value",
    "Probability DP": "DP with Probability / Expected Value",
    "Expected Value DP": "DP with Probability / Expected Value",
    "DP with Probability": "DP with Probability / Expected Value",
    "DP": "DP with Probability / Expected Value",

    # DP on Graphs / DAG DP
    "DP on Graphs / DAG DP": "DP on Graphs / DAG DP",
    "DP on Graphs": "DP on Graphs / DAG DP",
    "DP on Graphs/DAG": "DP on Graphs / DAG DP",
    "DP on Graph": "DP on Graphs / DAG DP",
    "DP on DAG": "DP on Graphs / DAG DP",
    "Graph DP": "DP on Graphs / DAG DP",
    "BFS DP": "DP on Graphs / DAG DP",
    "BS + BFS DP": "DP on Graphs / DAG DP",

    # Knapsack
    "Knapsack": "Knapsack",

    # LIS / LCS
    "LIS/LCS": "LIS / LCS",
    "LIS / LCS": "LIS / LCS",
    "LIS": "LIS / LCS",
    "LCS": "LIS / LCS",
    "Subsequence DP": "LIS / LCS",
    "LIS / Fenwick": "LIS / LCS",

    # Game Theory DP
    "Game Theory DP": "Game Theory DP",
    "Game DP": "Game Theory DP",

    # DP with Combinatorics
    "DP with Combinatorics": "DP with Combinatorics",
    "DP with Combinatorics / Advanced": "DP with Combinatorics",
    "Combinatorics DP": "DP with Combinatorics",
    "Inclusion-Exclusion DP": "DP with Combinatorics",
    "Permutation DP": "DP with Combinatorics",
    "DP on Permutations": "DP with Combinatorics",
    "Insertion DP": "DP with Combinatorics",
    "Inversion DP": "DP with Combinatorics",
    "Affine DP": "DP with Combinatorics",
    "Hash DP": "DP with Combinatorics",
    "Vector DP": "DP with Combinatorics",

    # DP with Matrix Exponentiation
    "DP with Matrix Exponentiation": "DP with Matrix Exponentiation",
    "Matrix Exponentiation": "DP with Matrix Exponentiation",

    # DP with Divide and Conquer
    "DP with Divide and Conquer": "DP with Divide and Conquer",
    "D&C DP": "DP with Divide and Conquer",
    "DP with Binary Search": "DP with Divide and Conquer",
    "BS + DP": "DP with Divide and Conquer",

    # DP with Convex Hull Trick
    "DP with Convex Hull": "DP with Convex Hull Trick",
    "Convex Hull Trick": "DP with Convex Hull Trick",

    # DP with Data Structures
    "DP with Data Structures": "DP with Data Structures",
    "Fenwick DP": "DP with Data Structures",
    "SegTree DP": "DP with Data Structures",
    "Segment Tree DP": "DP with Data Structures",
    "Prefix DP": "DP with Data Structures",
    "Sweep Line DP": "DP with Data Structures",

    # Meet in the Middle
    "Meet-in-the-Middle DP": "Meet in the Middle",
    "Meet in the Middle": "Meet in the Middle",

    # Other specific categories - keep as-is if no good mapping
    "DP with Geometry": "DP on Graphs / DAG DP",
    "Geometry DP": "DP on Graphs / DAG DP",
    "Linear Basis DP": "DP with Bitmask",
    "Binary Trie DP": "DP with Data Structures",
    "DSU DP": "DP on Graphs / DAG DP",
    "DSU + DP": "DP on Graphs / DAG DP",
    "MST DP": "DP on Graphs / DAG DP",
    "Tournament DP": "1D DP",
    "Lazy DP": "DP with Data Structures",
    "Merge DP": "DP on Trees",
    "DP with Cycle": "DP on Graphs / DAG DP",
}

rows = []
old_cats = Counter()
new_cats = Counter()
changes = 0

with open(path, 'r', newline='') as f:
    reader = csv.reader(f)
    header = next(reader)
    for row in reader:
        old_cat = row[1].strip()
        old_cats[old_cat] += 1
        new_cat = canonical_map.get(old_cat, old_cat)
        if new_cat != old_cat:
            changes += 1
        row[1] = new_cat
        new_cats[new_cat] += 1
        rows.append(row)

with open(path, 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(header)
    for row in rows:
        writer.writerow(row)

print(f"Before: {len(old_cats)} categories")
print(f"After:  {len(new_cats)} categories")
print(f"Rows remapped: {changes}")
print()
print("New category distribution:")
for c, n in new_cats.most_common():
    print(f"  {n:5d}  {c}")
