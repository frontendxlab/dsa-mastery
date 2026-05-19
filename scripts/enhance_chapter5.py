#!/usr/bin/env python3
"""Enhance rectangle-and-square-problems.json: convert math code blocks, add interactive diagrams, hints, keyword badges."""

import json

PATH = 'public/data/geometry-book/rectangle-and-square-problems.json'

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

    if 'Properties:' in code and 'Width' in code:
        blocks[i] = {"type":"text","content":"$$\\begin{aligned}\n\\text{Width} &= x_2 - x_1 \\\\\n\\text{Height} &= y_2 - y_1 \\\\\n\\text{Area} &= \\text{Width} \\times \\text{Height} = (x_2 - x_1)(y_2 - y_1) \\\\\n\\text{Perimeter} &= 2 \\times (\\text{Width} + \\text{Height})\n\\end{aligned}$$"}

    elif 'Form 1:' in code or 'Form 2:' in code:
        blocks[i] = {"type":"text","content":"$$\\begin{aligned}\n&\\text{Form 1: Two corners} &&(x_1, y_1) = \\text{bottom-left}, \\; (x_2, y_2) = \\text{top-right} \\\\\n&\\text{Form 2: Center + half-dimensions} &&(c_x, c_y, \\text{half}_w, \\text{half}_h) \\\\\n&\\text{Form 3: Bottom-left + dimensions} &&(x, y, \\text{width}, \\text{height})\n\\end{aligned}$$"}

    elif 'overlap_x' in code or 'overlap_y' in code:
        blocks[i] = {"type":"text","content":"$$\\text{overlap}_x = \\max(r_1.x_1, r_2.x_1) < \\min(r_1.x_2, r_2.x_2)$$\n$$\\text{overlap}_y = \\max(r_1.y_1, r_2.y_1) < \\min(r_1.y_2, r_2.y_2)$$"}

    elif 'ix1' in code and 'iy1' in code:
        blocks[i] = {"type":"text","content":"$$\\begin{aligned}\ni_{x1} &= \\max(r_1.x_1, r_2.x_1) \\\\\ni_{y1} &= \\max(r_1.y_1, r_2.y_1) \\\\\ni_{x2} &= \\min(r_1.x_2, r_2.x_2) \\\\\ni_{y2} &= \\min(r_1.y_2, r_2.y_2)\n\\end{aligned}$$"}

    elif 'x1 <= px' in code or ('px' in code and 'x1' in code and 'AND' in code):
        blocks[i] = {"type":"text","content":"$$x_1 \\le p_x \\le x_2 \\; \\text{AND} \\; y_1 \\le p_y \\le y_2$$"}

    elif 'Side = s' in code or 'Diagonal = s' in code:
        blocks[i] = {"type":"text","content":"$$\\begin{aligned}\n\\text{Side} &= s \\\\\n\\text{Diagonal} &= s\\sqrt{2} \\\\\n\\text{Area} &= s^2 \\\\\n\\text{Perimeter} &= 4s\n\\end{aligned}$$"}

    elif 'Total squares' in code or 'Σ' in code:
        blocks[i] = {"type":"text","content":"$$\\text{Total squares} = \\sum_{k=1}^{\\min(N, M)} (N - k + 1)(M - k + 1)$$"}


# ── Phase 2: Insert keyword_badges (replace Common Keywords table) ──

kw_heading_idx = find_heading_containing('Common Keywords')
if kw_heading_idx != -1:
    # Find the table after this heading
    table_idx = kw_heading_idx + 1
    if table_idx < len(blocks) and blocks[table_idx]['type'] == 'table':
        blocks[table_idx] = {
            "type": "keyword_badges",
            "groups": [
                {"label":"rectangle overlap / intersection","color":"red"},
                {"label":"largest rectangle","color":"indigo"},
                {"label":"containing rectangle / bounding box","color":"violet"},
                {"label":"rectangle area / union area","color":"sky"},
                {"label":"fitting rectangles / bin packing","color":"emerald"},
                {"label":"perfect square / square number","color":"amber"},
                {"label":"grid squares / counting squares","color":"rose"},
                {"label":"form a square / square detection","color":"cyan"},
                {"label":"rectangle cutting / GCD optimization","color":"orange"},
                {"label":"submatrix / subrectangle","color":"pink"},
            ]
        }

# ── Phase 3: Insert hint_card and interactive_diagram (bottom-up) ──

# 3a: Hint card for rectangle overlap (after overlap condition text)
overlap_idx = find_text_containing('Two axis-aligned rectangles overlap if and only if')
if overlap_idx != -1:
    blocks.insert(overlap_idx + 1, {
        "type": "hint_card",
        "question": "What if rectangles can be rotated?",
        "answer": "Rotated rectangle overlap is much harder. For axis-aligned rectangles, the projection trick works perfectly. For rotated ones, use the Separating Axis Theorem (SAT): if there exists a line separating the two rectangles, they do not overlap. Check all 4 edge normals as potential separating axes."
    })

# 3b: Hint card for square detection (after Square-Specific Properties)
square_prop_idx = find_text_containing('A square has all four sides equal')
if square_prop_idx != -1:
    blocks.insert(square_prop_idx + 1, {
        "type": "hint_card",
        "question": "How do I check if 4 points form a square?",
        "answer": "Compute all 6 pairwise squared distances. Sort them. The 4 smallest must be equal (sides) and the 2 largest must be equal (diagonals). Also verify the smallest > 0 and the diagonal > side. This works because a square has equal sides and equal diagonals regardless of rotation."
    })

# 3c: Hint card for histogram (after Largest Rectangle in Histogram heading)
hist_heading_idx = find_heading_containing('Largest Rectangle in Histogram')
if hist_heading_idx != -1:
    blocks.insert(hist_heading_idx + 1, {
        "type": "hint_card",
        "question": "Why does the monotonic stack work for histogram?",
        "answer": "The key insight is that for each bar at height h, the largest rectangle using that bar extends left until a shorter bar, and right until a shorter bar. A monotonic stack tracks bars in increasing height order. When we pop a bar, we know its right bound is the current index (first shorter bar to the right) and its left bound is the new stack top (first shorter bar to the left). This gives O(1) width calculation per bar."
    })

# 3d: Rectangle overlap interactive diagram (after overlap formula)
overlap_formula_idx = find_text_containing('The **intersection rectangle**')
if overlap_formula_idx != -1:
    blocks.insert(overlap_formula_idx + 1, {
        "type": "interactive_diagram",
        "diagram": "rectangle-overlap"
    })

# 3e: Square counting interactive diagram (after "Number of Squares in a Grid")
squares_heading_idx = find_heading_containing('Number of Squares in a Grid')
if squares_heading_idx != -1:
    # Insert after the formula block that follows
    formula_idx = squares_heading_idx + 1
    while formula_idx < len(blocks) and blocks[formula_idx]['type'] != 'text':
        formula_idx += 1
    if formula_idx < len(blocks):
        blocks.insert(formula_idx + 1, {
            "type": "interactive_diagram",
            "diagram": "square-counter"
        })


# ── Phase 4: Add hint for maximal square DP ──
max_square_idx = find_heading_containing('Maximal Square')
if max_square_idx != -1:
    blocks.insert(max_square_idx + 1, {
        "type": "hint_card",
        "question": "Why does dp[i][j] = 1 + min(above, left, diag)?",
        "answer": "A square of side k at (i, j) requires a square of side k-1 ending at (i-1, j), (i, j-1), AND (i-1, j-1). The limiting factor is the smallest of these three — if any one only supports a square of side 2, you cannot have side 3. Taking the min ensures all three regions are large enough to support the larger square."
    })


# ── Write result ──
data['blocks'] = blocks
with open(PATH, 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f'Enhanced Chapter 5: {len(blocks)} blocks')
print('Done!')
