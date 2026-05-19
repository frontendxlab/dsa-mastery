#!/usr/bin/env python3
"""Enhance computational-geometry.json: interactive diagrams, hints, keyword badges, URLs, LaTeX conversion."""

import json

PATH = 'public/data/geometry-book/computational-geometry.json'

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

def insert_blocks_before(idx, new_blocks):
    for _ in range(len(new_blocks)):
        blocks.insert(idx, None)
    for j, nb in enumerate(new_blocks):
        blocks[idx + j] = nb

# ── Phase 1: Convert empty-lang code block to LaTeX text ──

for i, b in enumerate(blocks):
    if b.get('type') == 'code' and b.get('lang') == '':
        blocks[i] = {
            "type": "text",
            "content": "Two segments $(p_1, q_1)$ and $(p_2, q_2)$ intersect iff "
                       "$\\text{orient}(p_1, q_1, p_2) \\times \\text{orient}(p_1, q_1, q_2) < 0$ "
                       "and $\\text{orient}(p_2, q_2, p_1) \\times \\text{orient}(p_2, q_2, q_1) < 0$."
        }
        break
blocks = data['blocks']

# ── Phase 2: Insert interactive diagrams and hint cards (bottom-up) ──

# 2a: Rotating calipers hint — after "Applications: diameter (farthest pair)"
rc_text_idx = find_text_containing("diameter (farthest pair)")
if rc_text_idx != -1:
    insert_blocks_after(rc_text_idx, [
        {"type": "hint_card",
         "question": "How do antipodal points help find the diameter of a convex polygon?",
         "answer": "Rotating calipers maintains a pair of parallel lines (antipodal points) that rotate around the hull. The farthest pair of points on a convex polygon must be a pair of antipodal points. The algorithm advances whichever line's next edge has a smaller angle, achieving O(N) total work after the convex hull is built."}
    ])
    blocks = data['blocks']

# 2b: Sweep line hint — after "Applications: rectangle union area"
sl_text_idx = find_text_containing("rectangle union area")
if sl_text_idx != -1:
    insert_blocks_after(sl_text_idx, [
        {"type": "hint_card",
         "question": "Why does event ordering matter in sweep line?",
         "answer": "When multiple events share the same x-coordinate, processing order determines correctness. For rectangle union, process start events before end events at the same x to avoid counting zero-width regions. For segment intersection, process endpoints before intersection points. Always define a strict total order for events."}
    ])
    blocks = data['blocks']

# 2c: Closest pair hint — after "2.4 Closest Pair" section, before next heading
cp_heading_idx = find_heading_containing("2.4 Closest Pair")
if cp_heading_idx != -1:
    for j in range(cp_heading_idx + 1, len(blocks)):
        if blocks[j].get('type') == 'heading':
            insert_blocks_before(j, [
                {"type": "hint_card",
                 "question": "Why does the strip check only need 7 points in closest pair?",
                 "answer": "The proof divides the strip into d/2 x d/2 squares (cells). Each cell can contain at most 1 point (otherwise those two would be closer than d). The 7-point bound comes from checking adjacent cells — at most 8 cells x 1 point, minus the point itself, giving 7. This constant is independent of N, so the strip check is O(N) total."}
            ])
            blocks = data['blocks']
            break

# 2d: Segment intersection interactive diagram — after heading "2.2 Line Segment Intersection"
si_heading_idx = find_heading_containing("Line Segment Intersection")
if si_heading_idx != -1:
    insert_blocks_after(si_heading_idx, [
        {"type": "interactive_diagram", "diagram": "segment-intersection",
         "caption": "Drag endpoints to test whether two line segments intersect."}
    ])
    blocks = data['blocks']

# 2e: Convex hull hint — after "Both: $O(N log N)$" (end of convex hull section)
ch_text_idx = find_text_containing("Both:")
if ch_text_idx != -1:
    insert_blocks_after(ch_text_idx, [
        {"type": "hint_card",
         "question": "Monotone Chain vs Graham Scan: which should you use?",
         "answer": "Monotone Chain (Andrew's algorithm) is generally preferred: it sorts by x then y (no trig or floating-point angles), uses only cross products, handles collinear points cleanly, and builds upper/lower hull separately. Graham Scan requires computing polar angles (atan2), which is slower and introduces floating-point error. Both are O(N log N), but Monotone Chain is simpler to implement correctly."}
    ])
    blocks = data['blocks']

# 2f: Convex hull interactive diagram — after heading "2.1 Convex Hull"
ch_heading_idx = find_heading_containing("2.1 Convex Hull")
if ch_heading_idx != -1:
    insert_blocks_after(ch_heading_idx, [
        {"type": "interactive_diagram", "diagram": "convex-hull",
         "caption": "Click to add points and visualize the convex hull being built using Monotone Chain."}
    ])
    blocks = data['blocks']


# ── Phase 3: Insert keyword_badges before "3. PROBLEM RECOGNITION" ──

kw_heading_idx = find_heading_containing('PROBLEM RECOGNITION')
if kw_heading_idx != -1:
    insert_blocks_before(kw_heading_idx, [{
        "type": "keyword_badges",
        "groups": [
            {"label": "convex-hull", "color": "sky"},
            {"label": "sweep-line", "color": "indigo"},
            {"label": "voronoi-diagram", "color": "violet"},
            {"label": "gift-wrapping", "color": "emerald"},
            {"label": "graham-scan", "color": "amber"},
            {"label": "monotone-chain", "color": "cyan"},
            {"label": "segment-intersection", "color": "rose"},
            {"label": "closest-pair", "color": "orange"},
            {"label": "rotating-calipers", "color": "pink"},
            {"label": "delaunay-triangulation", "color": "red"},
        ]
    }])
    blocks = data['blocks']


# ── Phase 4: Add problem URLs and update problemCount ──

data['problem_urls'] = {
    "Problem 1": "https://leetcode.com/problems/erect-the-fence/",
    "Problem 2": "https://codeforces.com/problemset/problem/166/B",
    "Problem 3": "https://www.spoj.com/problems/CONVEX/",
    "Problem 4": "https://codeforces.com/problemset/problem/245/H",
    "Problem 5": "https://www.geeksforgeeks.org/convex-hull-using-divide-and-conquer-algorithm/",
}

data['problemCount'] = 214

with open(PATH, 'w') as f:
    json.dump(data, f, indent=2)

print(f"Done. Total blocks: {len(data['blocks'])}")
