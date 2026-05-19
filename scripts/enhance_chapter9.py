#!/usr/bin/env python3
"""Enhance distance-and-midpoint.json: add keyword badges, interactive diagrams, hints, problem URLs."""

import json

PATH = 'public/data/geometry-book/distance-and-midpoint.json'

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

# ── Phase 1: Replace "Common keywords and phrases" list with keyword_badges ──

kw_list_idx = find_text_containing('Common keywords and phrases')
if kw_list_idx != -1:
    # The list is at kw_list_idx + 1
    list_idx = kw_list_idx + 1
    if list_idx < len(blocks) and blocks[list_idx]['type'] == 'list':
        blocks[list_idx] = {
            "type": "keyword_badges",
            "groups": [
                {"label":"euclidean distance","color":"indigo"},
                {"label":"manhattan distance","color":"emerald"},
                {"label":"chebyshev distance","color":"amber"},
                {"label":"midpoint formula","color":"cyan"},
                {"label":"point-to-line distance","color":"rose"},
                {"label":"manhattan median / minimax","color":"violet"},
                {"label":"closest pair","color":"orange"},
                {"label":"tree distance / LCA","color":"pink"},
                {"label":"45-degree transform","color":"sky"},
                {"label":"hamming distance","color":"red"},
            ]
        }

# ── Phase 2: Insert interactive_diagram + hint blocks (bottom-up) ──

# 2a: Manhattan median explorer after Pattern 1 heading
p1_idx = find_heading_containing('Pattern 1: Manhattan Distance Separation')
if p1_idx != -1:
    insert_blocks_after(p1_idx, [
        {"type":"interactive_diagram","diagram":"manhattan-median","caption":"See why the median, not the mean, minimizes the sum of absolute distances."},
        {"type":"hint_card","question":"Why does Manhattan distance minimization use the median while squared distance uses the mean?","answer":"Manhattan distance uses $|x_i - c|$ — absolute deviation. The function $f(c) = \\sum |x_i - c|$ is piecewise linear with slope changing at each data point. The minimum occurs where the slope crosses zero, which is at the median. Squared distance $(x_i - c)^2$ is smooth and differentiable, giving the mean $(\\sum x_i)/n$."},
    ])
    blocks = data['blocks']

# 2b: Distance transform diagram after Pattern 2 heading
p2_idx = find_heading_containing('Pattern 2: 45-Degree Rotation')
if p2_idx != -1:
    insert_blocks_after(p2_idx, [
        {"type":"interactive_diagram","diagram":"distance-transform","caption":"Watch how the 45° rotation transforms Manhattan distance into Chebyshev distance."},
    ])
    blocks = data['blocks']

# 2c: Hint about Chebyshev ↔ Manhattan transform formula
p2_text_idx = find_text_containing('Let u = x + y, v = x - y')
if p2_text_idx != -1:
    insert_blocks_after(p2_text_idx, [
        {"type":"hint_card","question":"How do you transform Manhattan distance to Chebyshev (and back)?","answer":"Forward: $u = x + y,\\; v = x - y$. Then $\\text{Manhattan}((x_1,y_1), (x_2,y_2)) = \\text{Chebyshev}((u_1,v_1), (u_2,v_2))$. Inverse: $x = (u+v)/2,\\; y = (u-v)/2$. The 1/2 scaling is critical when transforming back!"},
    ])
    blocks = data['blocks']

# 2d: Hint about closest pair strip width
p4_idx = find_text_containing('strip check must be done carefully')
if p4_idx != -1:
    insert_blocks_after(p4_idx, [
        {"type":"hint_card","question":"Why does the strip width matter in the closest pair algorithm?","answer":"After finding minimum distance $d$ in left and right halves, candidates for a closer cross-pair must lie within $d$ of the dividing line (any point further away would already have distance $\\ge d$ to any point on the other side). Within this strip, sorting by $y$ and checking only 6-7 next points per point is sufficient because a $d \\times 2d$ rectangle can contain at most 6-7 points with mutual distance $\\ge d$."},
    ])
    blocks = data['blocks']

# ── Phase 3: Add problem URLs ──

data['problem_urls'] = {
    "Problem 1": "https://atcoder.jp/contests/abc186/tasks/abc186_d",
    "Problem 2": "https://leetcode.com/problems/minimize-manhattan-distances/",
    "Problem 3": "https://cses.fi/problemset/task/1133",
    "Problem 4": "https://codeforces.com/problemset/problem/1550/C",
    "Problem 5": "https://leetcode.com/problems/hamming-distance/",
}

# ── Phase 4: Update problem count ──

data['problemCount'] = 225


# ── Write ──

with open(PATH, 'w') as f:
    json.dump(data, f, indent=2)

print(f"Done. Total blocks: {len(data['blocks'])}")
