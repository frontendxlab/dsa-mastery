#!/usr/bin/env python3
"""Enhance area-and-perimeter.json: convert math code blocks, add interactive diagrams, hints, keyword badges."""

import json

PATH = 'public/data/geometry-book/area-and-perimeter.json'

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

# ── Phase 1: Convert empty-lang code blocks to LaTeX text blocks ──

for i, b in enumerate(blocks):
    if b.get('type') != 'code' or b.get('lang') != '':
        continue
    code = b.get('code', '')

    if 'Area = ½' in code:
        blocks[i] = {"type":"text","content":"$$\\text{Area} = \\frac{1}{2} \\left| \\sum (x_i y_{i+1} - x_{i+1} y_i) \\right|$$"}

    elif 's = (a + b + c) / 2' in code:
        blocks[i] = {"type":"text","content":"$$\\begin{aligned}\ns &= \\frac{a + b + c}{2} \\\\\n\\text{Area} &= \\sqrt{s(s - a)(s - b)(s - c)}\n\\end{aligned}$$"}

    elif 'overlap_x' in code:
        blocks[i] = {"type":"text","content":"$$\\begin{aligned}\n\\text{overlap}_x &= \\max(0, \\min(x_2, x_4) - \\max(x_1, x_3)) \\\\\n\\text{overlap}_y &= \\max(0, \\min(y_2, y_4) - \\max(y_1, y_3)) \\\\\n\\text{overlap\\_area} &= \\text{overlap}_x \\times \\text{overlap}_y\n\\end{aligned}$$"}

    elif 'perimeter = Σ' in code or 'adjacent_land_count' in code:
        blocks[i] = {"type":"text","content":"$$\\text{perimeter} = \\sum_{\\text{each land cell}} \\big(4 - \\text{adjacent\\_land\\_count}\\big)$$"}


# ── Phase 2: Replace keyword table with keyword_badges ──

kw_table_idx = -1
for i, b in enumerate(blocks):
    if b.get('type') == 'table':
        headers = b.get('headers', [])
        if len(headers) > 0 and headers[0] == '#':
            kw_table_idx = i
            break

if kw_table_idx != -1:
    blocks[kw_table_idx] = {
        "type": "keyword_badges",
        "groups": [
            {"label":"polygon-area","color":"indigo"},
            {"label":"shoelace-formula","color":"emerald"},
            {"label":"perimeter","color":"amber"},
            {"label":"grid-island","color":"rose"},
            {"label":"rectangle-overlap","color":"cyan"},
            {"label":"union-area","color":"violet"},
            {"label":"surface-area","color":"orange"},
            {"label":"maximum-area","color":"sky"},
            {"label":"heron-formula","color":"pink"},
            {"label":"cake-cutting","color":"red"},
        ]
    }


# ── Phase 3: Insert hint_card and interactive_diagram blocks (bottom-up) ──

def insert_blocks_after(idx, new_blocks):
    for _ in range(len(new_blocks)):
        blocks.insert(idx + 1, None)
    for j, nb in enumerate(new_blocks):
        blocks[idx + 1 + j] = nb

# 3a: Hint card after Template 4 heading (block 95 — highest index)
template4_heading = find_heading_containing('Template 4: Max Area of Island')
if template4_heading != -1:
    insert_blocks_after(template4_heading, [
        {"type":"hint_card","question":"How does DFS find connected components in a grid?","answer":"DFS treats each land cell as a graph node. From any unvisited land cell, DFS visits all 4-directionally connected cells, marking them visited and counting area. The max area across all connected components is the answer."},
    ])
    blocks = data['blocks']

# 3b: Hint card after Pattern 1 heading (block 53)
pattern1_heading = find_heading_containing('Pattern 1: Grid-Based Perimeter/Area')
if pattern1_heading != -1:
    insert_blocks_after(pattern1_heading, [
        {"type":"hint_card","question":"Why does each land cell contribute 4 minus adjacent land cells?","answer":"A cell has 4 edges. Each edge shared with a neighbor is interior and doesn't count toward perimeter. Subtract shared edges (counted twice in grid adjacency). Formula: each cell contributes 4 - (land neighbors)."},
    ])
    blocks = data['blocks']

# 3c: Island explorer diagram after heading "2.6 Island Perimeter in Grids" (block 36)
island_heading = find_heading_containing('2.6 Island Perimeter in Grids')
if island_heading != -1:
    insert_blocks_after(island_heading, [
        {"type":"interactive_diagram","diagram":"island-explorer","caption":"Explore island perimeter calculation on a grid. Each land cell contributes 4 edges minus shared edges with neighbors."},
    ])
    blocks = data['blocks']

# 3d: Hint card after heading "2.5 Area of Intersecting Rectangles" (block 32)
overlap_heading = find_heading_containing('2.5 Area of Intersecting Rectangles')
if overlap_heading != -1:
    insert_blocks_after(overlap_heading, [
        {"type":"hint_card","question":"What if rectangles don't overlap?","answer":"The overlap formula naturally returns 0. If max(x₁,x₃) >= min(x₂,x₄), then overlap_x will be negative and max(0, ...) gives 0. No special case needed."},
    ])
    blocks = data['blocks']

# 3e: Hint card after shoelace explanatory text (block 27)
shoelace_text = find_text_containing('Why it works')
if shoelace_text != -1:
    insert_blocks_after(shoelace_text, [
        {"type":"hint_card","question":"Why does the shoelace formula use absolute value?","answer":"The shoelace formula computes signed area. A clockwise vertex order gives a negative result. The absolute value makes the area positive regardless of vertex order."},
    ])
    blocks = data['blocks']

# 3f: Shoelace visualizer diagram after heading "2.3 The Shoelace Formula" (block 23 — lowest)
shoelace_heading = find_heading_containing('2.3 The Shoelace Formula')
if shoelace_heading != -1:
    insert_blocks_after(shoelace_heading, [
        {"type":"interactive_diagram","diagram":"shoelace-visualizer","caption":"Drag polygon vertices and watch the shoelace formula compute the area in real time."},
    ])
    blocks = data['blocks']


# ── Phase 4: Add problem URLs ──

data['problem_urls'] = {
    "Problem 1": "https://leetcode.com/problems/island-perimeter/",
    "Problem 2": "https://leetcode.com/problems/max-area-of-island/",
    "Problem 3": "https://leetcode.com/problems/maximum-area-of-a-piece-of-cake-after-horizontal-and-vertical-cuts/",
    "Problem 4": "https://leetcode.com/problems/surrounded-regions/",
    "Problem 5": "https://leetcode.com/problems/regions-cut-by-slashes/",
}


# ── Phase 5: Update problem count ──

data['problemCount'] = 483


# ── Write ──

with open(PATH, 'w') as f:
    json.dump(data, f, indent=2)

print(f"Done. Total blocks: {len(data['blocks'])}")
