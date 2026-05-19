#!/usr/bin/env python3
"""Enhance coordinate-geometry.json: convert math code blocks, add interactive diagrams, hints, keyword badges."""

import json

PATH = 'public/data/geometry-book/coordinate-geometry.json'

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

    if 'Quadrants' in code and 'Q2' in code:
        blocks[i] = {"type":"text","content":"$$\\begin{array}{c|c}\n\\text{Q2 } (-x, +y) & \\text{Q1 } (+x, +y) \\\\\n\\hline\n\\text{Q3 } (-x, -y) & \\text{Q4 } (+x, -y)\n\\end{array}$$"}

    elif 'sqrt((x2 - x1)²' in code or 'sqrt((x2' in code:
        blocks[i] = {"type":"text","content":"$$d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$"}

    elif '|x2 - x1| + |y2 - y1|' in code:
        blocks[i] = {"type":"text","content":"$$d = |x_2 - x_1| + |y_2 - y_1|$$"}

    elif 'max(|x2 - x1|' in code:
        blocks[i] = {"type":"text","content":"$$d = \\max(|x_2 - x_1|, |y_2 - y_1|)$$"}

    elif 'Midpoint' in code and '(x1 + x2)/2' in code:
        blocks[i] = {"type":"text","content":"$$\\text{Midpoint} = \\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)$$"}

    elif 'Px =' in code and 'm*x2 + n*x1' in code:
        blocks[i] = {"type":"text","content":"$$P_x = \\frac{m \\cdot x_2 + n \\cdot x_1}{m + n}, \\quad P_y = \\frac{m \\cdot y_2 + n \\cdot y_1}{m + n}$$"}

    elif "x'" in code and 'x + dx' in code and "y'" in code:
        blocks[i] = {"type":"text","content":"$$x' = x + d_x, \\quad y' = y + d_y$$"}

    elif "x'" in code and 'x*cos' in code:
        blocks[i] = {"type":"text","content":"$$x' = x \\cos\\theta - y \\sin\\theta, \\quad y' = x \\sin\\theta + y \\cos\\theta$$"}

    elif "x'" in code and "y' = -y" in code:
        blocks[i] = {"type":"text","content":"$$x' = x, \\quad y' = -y$$"}

    elif 'Area of triangle ABC = 0' in code or 'x1(y2 - y3)' in code:
        blocks[i] = {"type":"text","content":"$$x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2) = 0$$"}

    elif 'gcd(|x2 - x1|' in code:
        blocks[i] = {"type":"text","content":"$$\\gcd(|x_2 - x_1|, |y_2 - y_1|) + 1$$"}


# ── Phase 2: Replace keyword table with keyword_badges ──

kw_table_idx = -1
for i, b in enumerate(blocks):
    if b.get('type') == 'table':
        # Check if this is the keyword table (contains "Keyword" as first header)
        headers = b.get('headers', [])
        if len(headers) > 0 and headers[0] == 'Keyword':
            kw_table_idx = i
            break

if kw_table_idx != -1:
    blocks[kw_table_idx] = {
        "type": "keyword_badges",
        "groups": [
            {"label":"euclidean distance","color":"indigo"},
            {"label":"manhattan distance","color":"emerald"},
            {"label":"chebyshev distance","color":"amber"},
            {"label":"collinearity / slope","color":"rose"},
            {"label":"midpoint formula","color":"cyan"},
            {"label":"coordinate transformation","color":"violet"},
            {"label":"quadrant classification","color":"orange"},
            {"label":"lattice points","color":"pink"},
            {"label":"point in polygon","color":"sky"},
            {"label":"manhattan median","color":"red"},
        ]
    }


# ── Phase 3: Insert hint_card and interactive_diagram blocks (bottom-up) ──

def insert_blocks_after(idx, new_blocks):
    for _ in range(len(new_blocks)):
        blocks.insert(idx + 1, None)
    for j, nb in enumerate(new_blocks):
        blocks[idx + 1 + j] = nb

# 3a: Distance explorer diagram + hint + LaTeX text after Distance Formulas section
dist_text_idx = find_text_containing('**Euclidean distance**')
if dist_text_idx != -1:
    insert_blocks_after(dist_text_idx, [
        {"type":"interactive_diagram","diagram":"distance-explorer","caption":"Explore how Euclidean, Manhattan, and Chebyshev distances differ for any two points."},
        {"type":"hint_card","question":"When should you compare squared distances instead of actual distances?","answer":"When you only need relative ordering (which point is closer), avoid the costly sqrt operation. Compare $d^2 = (x_2 - x_1)^2 + (y_2 - y_1)^2$ directly — it's monotonic with $d$."},
    ])
    # Reindex after insertion
    blocks = data['blocks']

# 3b: Collinearity checker diagram after Collinearity section heading
colli_heading_idx = find_heading_containing('2.6 Collinearity')
if colli_heading_idx != -1:
    insert_blocks_after(colli_heading_idx, [
        {"type":"interactive_diagram","diagram":"collinearity-checker","caption":"Drag three points to see whether they lie on a straight line using the cross-product test."},
    ])
    blocks = data['blocks']

# 3c: Hint card after Manhattan median pattern (Pattern 3)
pattern3_idx = find_heading_containing('Pattern 3: Manhattan Median')
if pattern3_idx != -1:
    insert_blocks_after(pattern3_idx + 1, [
        {"type":"hint_card","question":"Why does Manhattan distance separate into independent x and y problems?","answer":"Because $|x_1 - x_2| + |y_1 - y_2|$ contains no cross terms. The $x$ and $y$ contributions are purely additive, so the point that minimises sum of $x$-distances is simply the median $x$, and similarly for $y$."},
    ])
    blocks = data['blocks']

# 3d: Hint card near "Key Insight" in Closest Pair section
key_insight_idx = find_text_containing('Key Insight')
if key_insight_idx != -1:
    insert_blocks_after(key_insight_idx, [
        {"type":"hint_card","question":"Why only 6 points in the strip check for closest pair?","answer":"The $d \\times 2d$ rectangle (width = $d$, height = $2d$) can contain at most 6 points that are mutually at distance $\\ge d$. Since points in the same half are already $\\ge d$ apart, and the strip width is $d$, any closer cross-pair must lie in adjacent $d \\times d$ sub-squares — at most 6 per grid theorem."},
    ])
    blocks = data['blocks']

# 3e: Hint card for squared distance vs sqrt
sqrt_hint_idx = find_text_containing('sqrt is monotonic')
if sqrt_hint_idx != -1:
    insert_blocks_after(sqrt_hint_idx, [
        {"type":"hint_card","question":"Why does comparing squared distances work the same as comparing actual distances?","answer":"The square root function $f(x) = \\sqrt{x}$ is strictly increasing for $x \\ge 0$. So $d_1 < d_2$ if and only if $d_1^2 < d_2^2$. By comparing squared distances we avoid floating-point sqrt entirely."},
    ])
    blocks = data['blocks']


# ── Phase 4: Add problem URLs ──

data['problem_urls'] = {
    "Problem 1": "https://leetcode.com/problems/k-closest-points-to-origin/",
    "Problem 2": "https://leetcode.com/problems/best-meeting-point/",
    "Problem 3": "https://www.geeksforgeeks.org/closest-pair-of-points-using-divide-and-conquer-algorithm/",
}


# ── Phase 5: Update problem count ──

data['problemCount'] = 422


# ── Write ──

with open(PATH, 'w') as f:
    json.dump(data, f, indent=2)

print(f"Done. Total blocks: {len(data['blocks'])}")
