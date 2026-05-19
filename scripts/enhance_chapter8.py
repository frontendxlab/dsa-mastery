#!/usr/bin/env python3
"""Enhance lines-and-slopes.json: convert math code blocks, add interactive diagrams, hints, keyword badges."""

import json

PATH = 'public/data/geometry-book/lines-and-slopes.json'

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

    if 'y = mx + b' in code and 'slope' in code:
        blocks[i] = {"type":"text","content":"$$y = mx + b \\quad \\text{where} \\quad m = \\frac{\\Delta y}{\\Delta x} = \\frac{y_2 - y_1}{x_2 - x_1}, \\quad b = y\\text{-intercept}$$"}

    elif 'Ax + By + C = 0' in code:
        blocks[i] = {"type":"text","content":"$$Ax + By + C = 0 \\quad \\text{where} \\quad A = y_1 - y_2, \\; B = x_2 - x_1, \\; C = x_1 y_2 - x_2 y_1$$"}

    elif '(y - y1) / (x - x1)' in code:
        blocks[i] = {"type":"text","content":"$$\\frac{y - y_1}{x - x_1} = \\frac{y_2 - y_1}{x_2 - x_1}$$"}

    elif 'm = (y2 - y1)' in code and 'm = (y2' in code:
        blocks[i] = {"type":"text","content":"$$m = \\frac{y_2 - y_1}{x_2 - x_1}$$"}

    elif 'denom = A' in code and 'B' in code and 'denom' in code:
        blocks[i] = {"type":"text","content":"$$\\text{denom} = A_1 B_2 - A_2 B_1 \\\\\n\\text{If denom} = 0: \\text{parallel or coincident} \\\\\nx = \\frac{B_1 C_2 - B_2 C_1}{\\text{denom}}, \\quad y = \\frac{C_1 A_2 - C_2 A_1}{\\text{denom}}$$"}

    elif 'cross' in code and 'bx - ax' in code:
        blocks[i] = {"type":"text","content":"$$\\text{cross} = (b_x - a_x)(c_y - a_y) - (b_y - a_y)(c_x - a_x)$$"}

    elif 'distance = |Ax' in code or '|Ax' in code:
        blocks[i] = {"type":"text","content":"$$\\text{distance} = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}$$"}


# ── Phase 2: Replace keyword table with keyword_badges ──

kw_table_idx = -1
for i, b in enumerate(blocks):
    if b.get('type') == 'table':
        headers = b.get('headers', [])
        if len(headers) > 0 and headers[0] == 'Keyword':
            kw_table_idx = i
            break

if kw_table_idx != -1:
    blocks[kw_table_idx] = {
        "type": "keyword_badges",
        "groups": [
            {"label":"slope / gradient","color":"indigo"},
            {"label":"line equation","color":"emerald"},
            {"label":"parallel / perpendicular","color":"amber"},
            {"label":"line intersection","color":"rose"},
            {"label":"segment intersection","color":"cyan"},
            {"label":"orientation / cross product","color":"violet"},
            {"label":"sweep line","color":"orange"},
            {"label":"collinearity","color":"sky"},
            {"label":"point to line distance","color":"pink"},
            {"label":"Li Chao tree","color":"red"},
        ]
    }


# ── Phase 3: Insert hint_card and interactive_diagram blocks (bottom-up) ──

def insert_blocks_after(idx, new_blocks):
    for _ in range(len(new_blocks)):
        blocks.insert(idx + 1, None)
    for j, nb in enumerate(new_blocks):
        blocks[idx + 1 + j] = nb

# 3a: Line intersection explorer after line-line intersection heading
line_inter_heading = find_heading_containing('2.4 Line-Line Intersection')
if line_inter_heading != -1:
    insert_blocks_after(line_inter_heading, [
        {"type":"interactive_diagram","diagram":"line-intersection-explorer","caption":"Drag the sliders to adjust two lines and see where they intersect."},
    ])
    blocks = data['blocks']

# 3b: Hint for parallel/perpendicular after that section
parallel_heading = find_heading_containing('2.3 Parallel and Perpendicular')
if parallel_heading != -1:
    insert_blocks_after(parallel_heading, [
        {"type":"hint_card","question":"How do you remember the parallel and perpendicular slope relationships?","answer":"Parallel: $m_1 = m_2$ (same slope, different intercept). Perpendicular: $m_1 \\cdot m_2 = -1$ (negative reciprocal). A vertical line ($x = c$) has undefined slope — its perpendicular is horizontal ($y = c$)."},
    ])
    blocks = data['blocks']

# 3c: Hint for orientation test near Pattern 1
orientation_pattern = find_heading_containing('Pattern 1: Orientation')
if orientation_pattern != -1:
    insert_blocks_after(orientation_pattern, [
        {"type":"hint_card","question":"What do positive, negative, and zero cross products mean for orientation?","answer":"Given three points A, B, C in order: cross $> 0$ means counter-clockwise (left turn), cross $< 0$ means clockwise (right turn), cross $= 0$ means collinear. The cross product of $\\overrightarrow{AB}$ and $\\overrightarrow{BC}$ gives twice the signed area of triangle ABC."},
    ])
    blocks = data['blocks']

# 3d: Hint for sweepline near Pattern 3
sweepline_pattern = find_heading_containing('Pattern 3: Sweep Line')
if sweepline_pattern != -1:
    insert_blocks_after(sweepline_pattern, [
        {"type":"hint_card","question":"What's the trickiest part of sweep line algorithms?","answer":"Event ordering. When two events share the same x-coordinate, process all \"start\" events before \"query\" before \"end\" events. For line segment intersection, use a balanced BST (like `set` in C++) to maintain active segments sorted by current y, and only check neighbors for intersections when a segment is added or removed."},
    ])
    blocks = data['blocks']

# 3e: Hint for cross product trick near orientation section
orient_heading = find_heading_containing('2.6 Orientation Test')
if orient_heading != -1:
    insert_blocks_after(orient_heading, [
        {"type":"hint_card","question":"Why does cross product tell us orientation?","answer":"The cross product $\\overrightarrow{AB} \\times \\overrightarrow{BC}$ equals $|AB| \\cdot |BC| \\cdot \\sin\\theta$. The sign of $\\sin\\theta$ tells us whether B is to the left ($+$) or right ($-$) of the line AC. This is the foundation of all line segment intersection tests — two segments intersect if their orientations test \"straddles\" each other."},
    ])
    blocks = data['blocks']


# ── Phase 4: Add problem URLs ──

data['problem_urls'] = {
    "Problem 1": "https://leetcode.com/problems/check-if-it-is-a-straight-line/",
    "Problem 2": "https://www.acmicpc.net/problem/17387",
    "Problem 3": "https://leetcode.com/problems/the-skyline-problem/",
    "Problem 4": "https://leetcode.com/problems/minimum-lines-to-represent-a-line-chart/",
    "Problem 5": "https://codeforces.com/problemset/problem/660/D",
    "Problem 6": "https://codeforces.com/problemset/problem/961/D",
}


# ── Phase 5: Update problem count ──

data['problemCount'] = 456


# ── Write ──

with open(PATH, 'w') as f:
    json.dump(data, f, indent=2)

print(f"Done. Total blocks: {len(data['blocks'])}")
