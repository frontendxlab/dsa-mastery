#!/usr/bin/env python3
"""Enhance grid-based-geometry.json: add interactive diagrams, hints, keyword badges, problem URLs."""

import json

PATH = 'public/data/geometry-book/grid-based-geometry.json'

with open(PATH) as f:
    data = json.load(f)
blocks = data['blocks']

def find_text_containing(sub):
    for i, b in enumerate(blocks):
        if b.get('type') == 'text' and sub in (b.get('content') or ''):
            return i
    return -1

def find_heading_containing(sub):
    for i, b in enumerate(blocks):
        if b.get('type') == 'heading' and sub in (b.get('text') or ''):
            return i
    return -1

def insert_blocks_after(idx, new_blocks):
    for _ in range(len(new_blocks)):
        blocks.insert(idx + 1, None)
    for j, nb in enumerate(new_blocks):
        blocks[idx + 1 + j] = nb

# ── Phase 1: Replace common keywords list with keyword_badges ──

# The keywords are "Common keywords and phrases" list + "Hidden geometry indicators" list
# Find the "Common keywords" text and the list after it
kw_text_idx = find_text_containing('Common keywords and phrases')
if kw_text_idx != -1:
    # The next block should be a list. Replace that list with keyword badges.
    list_idx = kw_text_idx + 1
    if list_idx < len(blocks) and blocks[list_idx]['type'] == 'list':
        blocks[list_idx] = {
            "type": "keyword_badges",
            "groups": [
                {"label":"grid / matrix","color":"indigo"},
                {"label":"BFS shortest path","color":"emerald"},
                {"label":"DFS connected components","color":"rose"},
                {"label":"flood fill","color":"cyan"},
                {"label":"multi-source BFS","color":"violet"},
                {"label":"grid DP / path counting","color":"amber"},
                {"label":"grid rotation / transformation","color":"orange"},
                {"label":"2D prefix sum","color":"sky"},
                {"label":"island counting","color":"pink"},
                {"label":"spiral traversal","color":"red"},
            ]
        }

# ── Phase 2: Insert interactive diagrams + hint cards (bottom-up) ──

# 2a: BFS Visualizer diagram after "Grid BFS and DFS" section
bfs_heading_idx = find_heading_containing('2.3 Grid BFS and DFS')
if bfs_heading_idx != -1:
    insert_blocks_after(bfs_heading_idx, [
        {"type":"interactive_diagram","diagram":"grid-bfs-explorer","caption":"Visualise BFS and DFS traversal on a grid. Click cells to toggle obstacles, then step through the search."},
    ])
    blocks = data['blocks']

# 2b: Multi-source BFS hint card + diagram after "2.7 Multi-source BFS" heading
msbfs_heading_idx = find_heading_containing('2.7 Multi-source BFS')
if msbfs_heading_idx != -1:
    insert_blocks_after(msbfs_heading_idx, [
        {"type":"interactive_diagram","diagram":"multi-source-bfs","caption":"Watch how multiple sources expand simultaneously in a multi-source BFS flood fill."},
        {"type":"hint_card","question":"When should I use multi-source BFS instead of running BFS from each source?","answer":"Multi-source BFS guarantees each cell gets its distance to the nearest source in a single O(R×C) pass. Running BFS from each source separately would take O(K×R×C). The trick: initialise the queue with all sources at distance 0 — the BFS frontier naturally expands from all of them at once, like ripples from multiple stones dropped into a pond."},
    ])
    blocks = data['blocks']

# 2c: Hint card for grid DP after Pattern 2
dp_pattern_idx = find_heading_containing('Pattern 2: Grid DP for Counting Paths')
if dp_pattern_idx != -1:
    insert_blocks_after(dp_pattern_idx + 1, [
        {"type":"hint_card","question":"Why does the DP formula dp[r][c] = dp[r-1][c] + dp[r][c-1] work for counting grid paths?","answer":"You can only reach cell (r,c) from above (r-1,c) or from the left (r,c-1). So the number of ways to reach (r,c) is the sum of ways to reach those two predecessors. Base case: dp[0][0] = 1 (one way to start). Obstacles reset dp to 0 — no path can go through a blocked cell."},
    ])
    blocks = data['blocks']

# 2d: Hint card about BFS vs DFS for grid problems
pattern4_idx = find_heading_containing('Pattern 4: Island Counting')
if pattern4_idx != -1:
    insert_blocks_after(pattern4_idx + 1, [
        {"type":"hint_card","question":"Should I use BFS or DFS for grid problems?","answer":"DFS is simpler for connectivity/island counting (just recurse). BFS is better for shortest path (queue guarantees minimum steps). For large grids, BFS uses more memory (queue can grow) but avoids recursion depth limits. In practice: use BFS for distance, DFS for connectivity. Both are O(R×C)."},
    ])
    blocks = data['blocks']


# ── Phase 3: Add problem URLs ──

data['problem_urls'] = {
    "Problem 1": "https://leetcode.com/problems/number-of-islands/",
    "Problem 2": "https://leetcode.com/problems/01-matrix/",
    "Problem 3": "https://leetcode.com/problems/minimum-path-sum/",
    "Problem 4": "https://leetcode.com/problems/flood-fill/",
    "Problem 5": "https://leetcode.com/problems/minimum-cost-homecoming-of-a-robot-in-a-grid/",
    "Problem 6": "https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/",
}


# ── Phase 4: Update problem count ──

data['problemCount'] = 402


# ── Write ──

with open(PATH, 'w') as f:
    json.dump(data, f, indent=2)

print(f"Done. Total blocks: {len(data['blocks'])}")
