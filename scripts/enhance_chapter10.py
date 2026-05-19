#!/usr/bin/env python3
"""Enhance polygon-problems.json: add interactive diagrams, hints, keyword badges."""

import json

PATH = 'public/data/geometry-book/polygon-problems.json'

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

# ── Phase 1: Insert keyword_badges (replace Common keywords list) ──

kw_heading_idx = find_heading_containing('PROBLEM RECOGNITION')
if kw_heading_idx != -1:
    # Find the "Common keywords" text block
    common_kw_idx = find_text_containing('Common keywords and phrases')
    if common_kw_idx != -1:
        # Insert keyword_badges after the text, before the list
        insert_blocks_after(common_kw_idx, [{
            "type": "keyword_badges",
            "groups": [
                {"label":"shoelace formula","color":"indigo"},
                {"label":"convex polygon","color":"emerald"},
                {"label":"concave polygon","color":"amber"},
                {"label":"point in polygon (PIP)","color":"rose"},
                {"label":"ray casting","color":"cyan"},
                {"label":"regular polygon","color":"violet"},
                {"label":"centroid / center of mass","color":"orange"},
                {"label":"polygon perimeter","color":"pink"},
                {"label":"convex hull","color":"sky"},
                {"label":"signed area / cross product","color":"red"},
            ]
        }])
        blocks = data['blocks']  # no-op, but keep pattern

# ── Phase 2: Insert interactive diagrams and hint cards (bottom-up) ──

# 2a: Shoelace explorer after the shoelace formula explanation
shoelace_text_idx = find_heading_containing('2.2 Shoelace Formula')
if shoelace_text_idx != -1:
    insert_blocks_after(shoelace_text_idx, [
        {"type":"interactive_diagram","diagram":"shoelace-explorer","caption":"Click to add vertices and see the shoelace area calculation step by step."},
        {"type":"hint_card","question":"Why does vertex ordering matter in the shoelace formula?","answer":"The shoelace formula computes signed area. If vertices are counterclockwise, the result is positive; clockwise gives negative. Always use absolute value. Joining vertices out of order produces a self-intersecting polygon with incorrect (or unpredictable) area."},
    ])
    blocks = data['blocks']

# 2b: Point-in-polygon diagram after ray casting explanation
pip_text_idx = find_text_containing('Ray casting algorithm')
if pip_text_idx != -1:
    insert_blocks_after(pip_text_idx, [
        {"type":"interactive_diagram","diagram":"point-in-polygon","caption":"Cast rays from a point to determine if it lies inside or outside a polygon."},
        {"type":"hint_card","question":"When a ray passes exactly through a vertex, does it count as 1 crossing or 2?","answer":"It should count as 1 or 2 depending on whether the two incident edges are on opposite sides of the ray. Standard implementations handle this by using a half-open interval — if the ray intersects an edge at its upper endpoint, count it; if at the lower endpoint, skip it. This avoids double-counting."},
    ])
    blocks = data['blocks']

# 2c: Hint card after convex polygon check text
convex_check_idx = find_text_containing('same sign (or zero')
if convex_check_idx != -1:
    insert_blocks_after(convex_check_idx, [
        {"type":"hint_card","question":"What if all cross products are zero?","answer":"That means every three consecutive vertices are collinear — your polygon is a straight line or single point (degenerate). You need at least one non-zero cross product to determine the expected orientation."},
    ])
    blocks = data['blocks']

# 2d: Hint card in the regular polygon section
regular_poly_idx = find_text_containing('Interior angle')
if regular_poly_idx != -1 and find_heading_containing('Regular Polygon') != -1:
    insert_blocks_after(regular_poly_idx, [
        {"type":"hint_card","question":"Interior vs exterior angle: which is the complement of the other?","answer":"For any polygon, interior + exterior = 180° (they are supplementary). Exterior angle = 360°/n is often simpler because it only depends on n, not on the polygon's shape."},
    ])
    blocks = data['blocks']


# ── Phase 3: Add problem URLs ──

data['problem_urls'] = {
    "Problem 1": "https://codeforces.com/problemset/problem/270/A",
    "Problem 2": "https://cses.fi/problemset/task/2191",
    "Problem 3": "https://leetcode.com/problems/convex-polygon/",
}

data['problemCount'] = 123

with open(PATH, 'w') as f:
    json.dump(data, f, indent=2)

print(f"Done. Total blocks: {len(data['blocks'])}")
