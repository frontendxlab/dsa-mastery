import csv, os, glob

path = '/home/rashid/Project/dsa-mastery/tree/all_tree_problems.csv'

# Normalize categories
cat_map = {
    # Tree Traversal
    "Tree Traversal": "Tree Traversal",
    "Tree traversal": "Tree Traversal",
    "tree traversal": "Tree Traversal",
    "Binary Tree General": "Tree Traversal",
    "Binary Tree Traversal": "Tree Traversal",
    "BST Properties": "BST",
    "BST": "BST",
    "bst": "BST",
    "Construct Binary Tree": "Tree Construction",
    "Tree Construction": "Tree Construction",
    "Tree construction": "Tree Construction",
    "construct binary tree": "Tree Construction",
    "Path Sum / Path Problems": "Path Sum",
    "Path Sum": "Path Sum",
    "Special Trees": "Tree Construction",

    # Tree Properties
    "Tree Properties": "Tree Properties",
    "tree properties": "Tree Properties",
    "Properties": "Tree Properties",

    # LCA
    "LCA": "LCA",
    "lca": "LCA",
    "Lowest Common Ancestor": "LCA",

    # Serialize / Deserialize
    "Serialize / Deserialize": "Serialize / Deserialize",
    "Serialize/ Deserialize": "Serialize / Deserialize",
    "Serialize and Deserialize": "Serialize / Deserialize",

    # Tree DP
    "Tree DP": "Tree DP",
    "Tree dp": "Tree DP",
    "dp on trees": "Tree DP",
    "Rerooting DP": "Tree DP",
    "Reroot DP": "Tree DP",
    "Tree DP (rerooting)": "Tree DP",
    "Tree dp on tree": "Tree DP",
    "tree dp": "Tree DP",
    "DP on tree": "Tree DP",

    # N-ary Tree
    "N-ary Tree": "N-ary Tree",
    "N-Ary Tree": "N-ary Tree",
    "N-ary tree": "N-ary Tree",

    # Segment Tree / Fenwick Tree
    "Segment Tree / Fenwick Tree": "Segment Tree / Fenwick Tree",
    "Segment tree / Fenwick tree": "Segment Tree / Fenwick Tree",
    "segment tree / fenwick tree": "Segment Tree / Fenwick Tree",
    "Fenwick Tree": "Segment Tree / Fenwick Tree",
    "Segment Tree": "Segment Tree / Fenwick Tree",
    "SegTree / BIT": "Segment Tree / Fenwick Tree",

    # Trie
    "Trie": "Trie",
    "trie": "Trie",

    # Tree Queries
    "Tree Queries": "Tree Queries",
    "Tree queries": "Tree Queries",
    "Tree Queries/Tree Queries": "Tree Queries",
    "Tree Query": "Tree Queries",
    "HLD": "Tree Queries",
    "Heavy-Light Decomposition": "Tree Queries",

    # Tree Combinatorics
    "Tree Combinatorics": "Tree Combinatorics",
    "Tree combinatorics": "Tree Combinatorics",
    "combinatorics on tree": "Tree Combinatorics",
    "Combinatorics": "Tree Combinatorics",

    # DSU on Tree
    "DSU on Tree": "DSU on Tree",
    "dsu on tree": "DSU on Tree",
    "Small to Large": "DSU on Tree",
    "Sack (DSU on Tree)": "DSU on Tree",

    # Centroid Decomposition
    "Centroid Decomposition": "Centroid Decomposition",

    # Tree Isomorphism
    "Tree Isomorphism": "Tree Isomorphism",

    # Spanning Tree
    "Spanning Tree": "Spanning Tree",
    "MST": "Spanning Tree",

    # Tree Games
    "Tree Games": "Tree Games",
    "Game theory on tree": "Tree Games",
    "Tree Game": "Tree Games",

    # Tree Matching
    "Tree Matching": "Tree Matching",
    "tree matching": "Tree Matching",

    # Tree with Data Structures
    "Tree with Data Structures": "Tree with Data Structures",
    "Tree With Data Structures": "Tree with Data Structures",

    # Tree with Geometry
    "Tree with Geometry": "Tree with Geometry",
    "Tree Geometry": "Tree with Geometry",

    # Tree Parity / Bipartite
    "Tree Bipartite": "Tree Traversal",
    "Tree Parity": "Tree Traversal",

    # Binary Tree (generic)
    "Binary Tree": "Tree Traversal",

    # Functional Graphs (not trees but related)
    "Functional Graphs": "Tree Traversal",
}

all_rows = []
all_urls = set()
platforms_seen = set()

for fpath in sorted(glob.glob('/home/rashid/Project/dsa-mastery/tree/round1_*.csv')):
    count = 0
    added = 0
    with open(fpath, 'r', newline='') as f:
        reader = csv.reader(f)
        for row in reader:
            if len(row) < 6:
                continue
            if row[0] == 'Platform':
                continue  # skip headers
            count += 1
            url = row[3].strip()
            if url and url not in all_urls:
                # Normalize category
                cat = row[1].strip()
                row[1] = cat_map.get(cat, cat)
                all_rows.append(row)
                all_urls.add(url)
                added += 1
    print(f'{os.path.basename(fpath)}: {count} read, {added} new')
    os.remove(fpath)

all_rows.sort(key=lambda r: (r[0], r[2]))

with open(path, 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['Platform','Category','Problem Name','URL','Difficulty','Key Concept'])
    for row in all_rows:
        writer.writerow(row)

from collections import Counter
platforms = Counter(r[0] for r in all_rows)
cats = Counter(r[1] for r in all_rows)

print(f'\nTotal: {len(all_rows)} problems across {len(platforms)} platforms, {len(cats)} categories')
print(f'\nPlatforms:')
for p, c in platforms.most_common():
    print(f'  {p}: {c}')
print(f'\nCategories:')
for c, n in cats.most_common():
    print(f'  {n:5d}  {c}')
