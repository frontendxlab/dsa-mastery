#!/usr/bin/env python3
"""Enhance advanced-geometry-algorithms.json: add keyword badges, diagrams, hints, URLs."""

import json

PATH = 'public/data/geometry-book/advanced-geometry-algorithms.json'

with open(PATH) as f:
    data = json.load(f)
blocks = data['blocks']

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

# ── Collect all insertion points (bottom-up) ──

# Phase 1: keyword_badges before heading "3. PROBLEM RECOGNITION"
pr_heading = find_heading_containing('PROBLEM RECOGNITION')
kw_before_idx = pr_heading - 1  # the divider before it

# Phase 2: diagrams after key headings
bezier_heading = find_heading_containing('Bezier')
quadtree_heading = find_heading_containing('Quadtree')  # might not exist

# Phase 3: hint cards after content
voronoi_heading = find_heading_containing('Voronoi')
geo3d_heading = find_heading_containing('3D Geometry')

# ── Build new blocks ──

keyword_badges = {
    "type": "keyword_badges",
    "groups": [
        {"label":"3d-geometry","color":"indigo"},
        {"label":"fractal","color":"emerald"},
        {"label":"bezier-curve","color":"amber"},
        {"label":"quadtree","color":"rose"},
        {"label":"spatial-hashing","color":"cyan"},
        {"label":"kd-tree","color":"violet"},
        {"label":"minkowski-sum","color":"orange"},
        {"label":"half-plane-intersection","color":"sky"},
        {"label":"randomized-algorithm","color":"pink"},
        {"label":"bsp-tree","color":"red"},
    ]
}

bezier_diagram = {
    "type": "interactive_diagram",
    "diagram": "bezier-curve",
    "caption": "Drag control points to shape the Bézier curve. Observe how the curve stays within the convex hull of points."
}

bezier_hint = {
    "type": "hint_card",
    "question": "How does de Casteljau's algorithm evaluate a Bézier curve?",
    "answer": "It recursively interpolates between control points. For a degree-n curve with points P₀,...,Pₙ, at parameter t: linearly interpolate each adjacent pair (Pᵢ,Pᵢ₊₁) to get n-1 points, repeat until 1 point remains. That point is B(t). Numerically stable and works for any degree."
}

geo3d_hint = {
    "type": "hint_card",
    "question": "How do cross and dot products behave differently in 3D vs 2D?",
    "answer": "In 3D the cross product returns a vector (perpendicular to both inputs), not a scalar. Its magnitude equals the area of the parallelogram. The dot product is the same in any dimension: a·b = |a||b|cosθ. For 3D geometry: dot product tests alignment (parallel if |dot| = |a||b|), cross product magnitude tests perpendicularity and gives surface normals."
}

voronoi_hint = {
    "type": "hint_card",
    "question": "What makes Fortune's algorithm efficient for Voronoi diagrams?",
    "answer": "Fortune's algorithm uses a sweep line with a beach line state. As the sweep line moves top-to-bottom, the beach line (set of parabolic arcs) represents points equidistant from the sweep line and seed points. Events: site events (new arc) and circle events (arc removed). Implemented with a balanced BST for the beach line and a priority queue. O(N log N)."
}

quadtree_hint = {
    "type": "hint_card",
    "question": "What is the standard approach for point insertion in a quadtree?",
    "answer": "Start at the root. If the current node is a leaf and empty, store the point. If it already contains a point, subdivide into 4 children and re-insert both points into the appropriate quadrants. Recursively descend until each leaf contains at most one point. Splitting threshold can be tuned for performance."
}

quadtree_diagram = {
    "type": "interactive_diagram",
    "diagram": "quadtree-visualizer",
    "caption": "Click to add points and see the quadtree subdivide. Each region splits into 4 when it holds more than one point."
}

# ── Phase: Insert bottom-up (highest index first) ──

# 1: keyword_badges before PROBLEM RECOGNITION heading
if kw_before_idx >= 0:
    insert_blocks_after(kw_before_idx, [keyword_badges])

# 2: Voronoi hint after Voronoi heading
if voronoi_heading >= 0:
    insert_blocks_after(voronoi_heading, [voronoi_hint])

# 3: Bezier diagram + hint after Bezier heading
if bezier_heading >= 0:
    insert_blocks_after(bezier_heading, [bezier_diagram, bezier_hint])

# 4: 3D geometry hint after 3D heading
if geo3d_heading >= 0:
    insert_blocks_after(geo3d_heading, [geo3d_hint])

# 5: Quadtree diagram + hint (only if heading exists)
if quadtree_heading >= 0:
    insert_blocks_after(quadtree_heading, [quadtree_diagram, quadtree_hint])

# ── Phase: Add problem URLs ──

data['problem_urls'] = {
    "Problem 1": "https://leetcode.com/problems/k-closest-points-to-origin/",
    "Problem 2": "https://www.geeksforgeeks.org/quadtree-in-data-structure/",
    "Problem 3": "https://codeforces.com/problemset/problem/543/A",
    "Problem 4": "https://codeforces.com/problemset/problem/669/E",
    "Problem 5": "https://leetcode.com/problems/maximum-number-of-visible-points/",
}

data['problemCount'] = 198

with open(PATH, 'w') as f:
    json.dump(data, f, indent=2)

print(f"Done. Total blocks: {len(data['blocks'])}")
