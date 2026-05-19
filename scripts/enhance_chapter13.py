#!/usr/bin/env python3
"""Enhance angles-and-rotation.json: convert math code blocks, add interactive diagrams, hints, keyword badges, problem URLs."""

import json

PATH = 'public/data/geometry-book/angles-and-rotation.json'

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


# ── Phase 1: Convert empty-lang code blocks to LaTeX text blocks ──

for i, b in enumerate(blocks):
    if b.get('type') != 'code' or b.get('lang') != '':
        continue
    code = b.get('code', '')

    if 'rotated_x = local_x' in code:
        blocks[i] = {"type":"text","content":"$$\\begin{aligned}\n\\text{local}_x &= P_x - C_x \\\\\n\\text{local}_y &= P_y - C_y \\\\\n\\text{rotated}_x &= \\text{local}_x \\cos \\theta - \\text{local}_y \\sin \\theta + C_x \\\\\n\\text{rotated}_y &= \\text{local}_x \\sin \\theta + \\text{local}_y \\cos \\theta + C_y\n\\end{aligned}$$"}

    elif 'cos(2θ)' in code:
        blocks[i] = {"type":"text","content":"$$x' = x \\cos(2\\theta) + y \\sin(2\\theta)$$ $$y' = x \\sin(2\\theta) - y \\cos(2\\theta)$$"}

    elif '[x\']' in code:
        blocks[i] = {"type":"text","content":"$$\\begin{bmatrix} x' \\\\ y' \\end{bmatrix} = \\begin{bmatrix} \\cos \\theta & -\\sin \\theta \\\\ \\sin \\theta & \\cos \\theta \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\end{bmatrix}$$"}

    elif 'cos θ = (a·b)' in code:
        blocks[i] = {"type":"text","content":"$$\\cos \\theta = \\frac{\\mathbf{a} \\cdot \\mathbf{b}}{|\\mathbf{a}| \\cdot |\\mathbf{b}|}$$ $$\\theta = \\arccos\\left(\\frac{\\mathbf{a} \\cdot \\mathbf{b}}{|\\mathbf{a}| \\cdot |\\mathbf{b}|}\\right)$$"}

    elif 'sin θ = (a × b)' in code:
        blocks[i] = {"type":"text","content":"$$\\sin \\theta = \\frac{|\\mathbf{a} \\times \\mathbf{b}|}{|\\mathbf{a}| \\cdot |\\mathbf{b}|}$$"}

    elif 'θ = atan2' in code:
        blocks[i] = {"type":"text","content":"$$\\theta = \\operatorname{atan2}(y, x)$$"}

    elif 'minute_angle = M × 6' in code:
        blocks[i] = {"type":"text","content":"$$\\text{minute angle} = M \\times 6^\\circ \\qquad (360^\\circ / 60 = 6^\\circ \\text{ per minute})$$ $$\\text{hour angle} = (H \\bmod 12) \\times 30^\\circ + M \\times 0.5^\\circ \\qquad (360^\\circ / 12 = 30^\\circ \\text{ per hour, } 0.5^\\circ \\text{ per minute})$$ $$\\text{angle} = \\min(|\\text{hour angle} - \\text{minute angle}|, 360^\\circ - |\\text{hour angle} - \\text{minute angle}|)$$"}

    elif 'cross = (B.x - A.x)' in code:
        blocks[i] = {"type":"text","content":"$$\\text{cross} = (B_x - A_x)(C_y - A_y) - (B_y - A_y)(C_x - A_x)$$\n\n**cross** > 0 \u2192 counterclockwise (left turn)\n\n**cross** < 0 \u2192 clockwise (right turn)\n\n**cross** = 0 \u2192 collinear"}

    elif "y' = -x·sin" in code:
        blocks[i] = {"type":"text","content":"$$x' = x \\cos \\theta + y \\sin \\theta$$ $$y' = -x \\sin \\theta + y \\cos \\theta$$"}

    elif "x' = x·cos" in code and "y' = x·sin" in code:
        blocks[i] = {"type":"text","content":"$$x' = x \\cos \\theta - y \\sin \\theta$$ $$y' = x \\sin \\theta + y \\cos \\theta$$"}


# ── Phase 2: Insert keyword_badges before "3. PROBLEM RECOGNITION" ──

pr_heading_idx = find_heading_containing('3. PROBLEM RECOGNITION')
if pr_heading_idx != -1:
    insert_blocks_after(pr_heading_idx - 1, [{
        "type": "keyword_badges",
        "groups": [
            {"label":"clock-angle","color":"rose"},
            {"label":"rotation-matrix","color":"indigo"},
            {"label":"radian","color":"sky"},
            {"label":"sum-of-angles","color":"amber"},
            {"label":"interior-angle","color":"emerald"},
            {"label":"exterior-angle","color":"cyan"},
            {"label":"polar-coordinates","color":"violet"},
            {"label":"trigonometric-ratios","color":"orange"},
            {"label":"atan2","color":"pink"},
            {"label":"complementary-angles","color":"red"},
        ]
    }])
    blocks = data['blocks']


# ── Phase 3: Insert hint_card and interactive_diagram blocks (bottom-up) ──

# 3a: Clock angle hint after clock angle formula (highest-converted block)
idx = find_text_containing(r'\text{minute angle}')
if idx == -1:
    idx = find_text_containing(r'\\text{minute angle}')
if idx != -1:
    insert_blocks_after(idx, [
        {"type":"hint_card","question":"Why does the hour hand move 0.5\u00b0 per minute?","answer":"The hour hand completes a full 360\u00b0 rotation in 12 hours = 720 minutes. Its angular speed is 360\u00b0 / 720 min = 0.5\u00b0 per minute. The minute hand, completing 360\u00b0 in 60 minutes, moves at 6\u00b0 per minute \u2014 12 times faster. At 3:15 the hour hand has moved 15 \u00d7 0.5\u00b0 = 7.5\u00b0 past the 3-hour mark, giving 97.5\u00b0 total."},
    ])
    blocks = data['blocks']

# 3b: Rotation hint after CW rotation formula
idx = -1
for i, b in enumerate(blocks):
    if b.get('type') == 'text':
        c = b.get('content', '')
        if "x'" in c and "cos" in c and "sin" in c and "y'" in c and "-x" in c:
            idx = i
            break
if idx == -1:
    for i, b in enumerate(blocks):
        if b.get('type') == 'text' and 'clockwise' in (b.get('content','') or '').lower():
            idx = i
            if b.get('type') == 'text' and 'cos' in (b.get('content','') or ''):
                break
if idx != -1:
    insert_blocks_after(idx, [
        {"type":"hint_card","question":"Why do 2D rotation matrices use cos \u03b8 and sin \u03b8?","answer":"A rotation matrix comes from the unit circle: (cos \u03b8, sin \u03b8) is the point at angle \u03b8. When rotating a vector (x, y), the first column [cos \u03b8; sin \u03b8] is where (1, 0) lands after rotation. The second column [\u2212sin \u03b8; cos \u03b8] is where (0, 1) lands. Together they form the linear transformation that rotates any vector by \u03b8 counterclockwise."},
    ])
    blocks = data['blocks']

# 3c: rotation-visualizer diagram after heading "2.3 Rotation Matrix (2D)"
idx = find_heading_containing('2.3 Rotation Matrix')
if idx != -1:
    insert_blocks_after(idx, [
        {"type":"interactive_diagram","diagram":"rotation-visualizer","caption":"Drag the point and watch how the 2D rotation matrix transforms its coordinates step by step."},
    ])
    blocks = data['blocks']

# 3d: atan2 hint after the atan2 quadrant table
idx = -1
for i, b in enumerate(blocks):
    if b.get('type') == 'table':
        h = b.get('headers', [])
        if len(h) > 0 and h[0] == '(x, y)':
            idx = i
            break
if idx != -1:
    insert_blocks_after(idx, [
        {"type":"hint_card","question":"What\u2019s the difference between atan and atan2?","answer":"atan(y/x) returns values in [\u2212\u03c0/2, \u03c0/2] \u2014 it cannot distinguish quadrants because x\u2019s sign is lost in the division. atan2(y, x) uses both signs separately, returning the full range (\u2212\u03c0, \u03c0]. Use atan2 whenever direction matters: polar coordinates, vector angles, and navigation bearings."},
    ])
    blocks = data['blocks']

# 3e: Interior angle hint after the angle types list
idx = -1
for i, b in enumerate(blocks):
    if b.get('type') == 'list':
        items = b.get('items', [])
        if len(items) > 0 and 'Acute:' in items[0]:
            idx = i
            break
if idx != -1:
    insert_blocks_after(idx, [
        {"type":"hint_card","question":"How do you find the interior angle of a regular pentagon?","answer":"Sum of interior angles = (n \u2212 2) \u00d7 180\u00b0 = (5 \u2212 2) \u00d7 180\u00b0 = 540\u00b0. Each interior angle = 540\u00b0 / 5 = 108\u00b0. Each exterior angle = 360\u00b0 / 5 = 72\u00b0. Quick check: interior (108\u00b0) + exterior (72\u00b0) = 180\u00b0, confirming they are supplementary."},
    ])
    blocks = data['blocks']

# 3f: angle-explorer diagram after heading "2.1 Angle Basics"
idx = find_heading_containing('2.1 Angle Basics')
if idx != -1:
    insert_blocks_after(idx, [
        {"type":"interactive_diagram","diagram":"angle-explorer","caption":"Adjust the angle slider to explore acute, right, obtuse, and reflex angles with real-time degree and radian display."},
    ])
    blocks = data['blocks']


# ── Phase 4: Add problem URLs ──

data['problem_urls'] = {
    "Problem 1": "https://leetcode.com/problems/angle-between-hands-of-a-clock/",
    "Problem 2": "https://leetcode.com/problems/rotate-image/",
    "Problem 3": "https://leetcode.com/problems/minimum-time-difference/",
    "Problem 4": "https://codeforces.com/problemset/problem/231/A",
    "Problem 5": "https://www.codechef.com/problems/ANGLE",
}


# ── Phase 5: Update problem count ──

data['problemCount'] = 512


# ── Write ──

with open(PATH, 'w') as f:
    json.dump(data, f, indent=2)

print(f"Done. Total blocks: {len(data['blocks'])}")
