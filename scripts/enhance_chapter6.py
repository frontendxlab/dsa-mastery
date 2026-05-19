#!/usr/bin/env python3
"""Enhance circle-problems.json: convert math code blocks, add interactive diagrams, hints, keyword badges."""

import json

PATH = 'public/data/geometry-book/circle-problems.json'

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

def make_text(content):
    return {'type': 'text', 'content': content}

def make_hint(title, body, hint_id=None):
    h = {'type': 'hint_card', 'title': title, 'body': body}
    if hint_id:
        h['id'] = hint_id
    return h

def make_diagram(name):
    return {'type': 'interactive_diagram', 'diagram': name}

def make_keyword_groups(groups):
    return {'type': 'keyword_badges', 'keyword_groups': groups}

# ── Phase 1: Convert empty-lang code blocks to LaTeX text blocks ──

for i, b in enumerate(blocks):
    if b.get('type') != 'code' or b.get('lang') != '':
        continue
    code = b.get('code', '')
    lines = [l.strip() for l in code.split('\n') if l.strip()]
    latex_lines = []
    for l in lines:
        l = l.replace('²', '^2').replace('×', '\\times ').replace('→', '\\to ')
        latex_lines.append(f'$$ {l} $$')
    blocks[i] = make_text('\n'.join(latex_lines))

# ── Phase 2: Find insertion points ──

# Locate key positions (all indices are 0-based after Phase 1 shifts)
# Re-find positions after phase 1
h_circle_eq = find_heading_containing('2.1 Circle Equation')
h_circle_int = find_heading_containing('2.2 Circle-Circle')
h_area_circ = find_heading_containing('2.3 Circle Area')
h_angular = find_heading_containing('2.4 Angular Coordinates')
h_welzl = find_heading_containing('2.6 Minimum Enclosing')
h_hidden = find_heading_containing('Hidden Circle Problems')
h_curated = find_heading_containing('CURATED REAL PROBLEMS')
h_solution = find_heading_containing('COMPLETE SOLUTION SECTION')

# Make keyword table is at index after "3. PROBLEM RECOGNITION"
h_problem_recog = find_heading_containing('PROBLEM RECOGNITION')
# The table follows after heading + potentially some text
table_idx = None
if h_problem_recog is not None:
    for j in range(h_problem_recog + 1, min(h_problem_recog + 5, len(blocks))):
        if blocks[j].get('type') == 'table':
            table_idx = j
            break

# ── Phase 3: Insert hint cards (bottom-up) ──

# Hint 4: Welzl randomization tip (after 2.6 Minimum Enclosing Circle list)
if h_welzl is not None:
    # find the list block after this heading
    list_idx = None
    for j in range(h_welzl + 1, len(blocks)):
        if blocks[j].get('type') == 'list':
            list_idx = j
            break
    if list_idx is not None:
        blocks.insert(list_idx + 1, make_hint(
            'Leave-One-Out Intuition',
            "Welzl's algorithm works because a point outside the current circle must be on the boundary of the minimal enclosing circle. The randomization ensures expected $$O(n)$$ runtime.",
            'geo-hint-welzl'
        ))

# Hint 3: atan2 vs atan tip (after 2.4 Angular Coordinates code block)
if h_angular is not None:
    # Find the text block after code block
    for j in range(h_angular + 1, len(blocks)):
        if blocks[j].get('type') == 'text' and 'angular sweep' in (blocks[j].get('content', '')).lower():
            blocks.insert(j + 1, make_hint(
                'Use atan2, Not atan',
                "Always use $$\\text{atan2}(y, x)$$ instead of $$\\text{atan}(y/x)$$. atan2 returns the correct quadrant, handles $$x=0$$ gracefully, and returns values in $$[-\\pi, \\pi]$$. For angular sweep, remember to add $$2\\pi$$ offset to handle circularity.",
                'geo-hint-atan2'
            ))
            break

# Hint 2: Tangent vs intersection differentiation (after 2.2 Circle-Circle Intersection)
if h_circle_int is not None:
    for j in range(h_circle_int + 1, len(blocks)):
        if blocks[j].get('type') == 'text' and 'intersect if' in (blocks[j].get('content', '')).lower():
            blocks.insert(j + 1, make_hint(
                'Tangent vs Intersection',
                "Two circles that just touch (tangent) have exactly one point in common. In integer problems, tangent circles are often considered 'not overlapping' (no area overlap). Read the problem statement carefully — some count tangent as intersection, others don't.",
                'geo-hint-tangent'
            ))
            break

# Hint 1: Squared distance tip (after 2.1 Circle Equation)
if h_circle_eq is not None:
    for j in range(h_circle_eq + 1, len(blocks)):
        if blocks[j].get('type') == 'code' or (blocks[j].get('type') == 'text' and 'point' in (blocks[j].get('content', '')).lower() and 'lies' in (blocks[j].get('content', '')).lower()):
            blocks.insert(j + 1, make_hint(
                'Avoid Square Roots',
                'Always compare squared distances: $$\\text{dist}^2 = (x_1 - x_2)^2 + (y_1 - y_2)^2$$ vs $$r^2$$. This avoids floating-point sqrt entirely and works flawlessly with integers. Only take sqrt when you absolutely need the actual distance value.',
                'geo-hint-precision'
            ))
            break

# ── Phase 4: Insert interactive diagrams (bottom-up) ──

# Diagram 2: Circle Intersection (after 2.2 Circle-Circle)
find_ci = find_heading_containing('2.2 Circle-Circle')
if find_ci is not None:
    # Find text explaining conditions
    for j in range(find_ci + 1, len(blocks)):
        if blocks[j].get('type') == 'text' and 'intersect if' in (blocks[j].get('content', '')).lower():
            blocks.insert(j + 1, make_diagram('circle-intersection'))
            break

# Diagram 1: Circle Point Test (after 2.1 Circle Equation)
find_ce = find_heading_containing('2.1 Circle Equation')
if find_ce is not None:
    # Insert right before the list of inside/on/outside conditions
    for j in range(find_ce + 1, len(blocks)):
        if blocks[j].get('type') == 'list':
            blocks.insert(j, make_diagram('circle-point-test'))
            break

# ── Phase 5: Keyword badges (after Hidden Circle Problems list) ──

if h_hidden is not None:
    # Find the list block after heading
    for j in range(h_hidden + 1, len(blocks)):
        if blocks[j].get('type') == 'list':
            blocks.insert(j + 1, make_keyword_groups([
                {'label': 'point in circle / within radius', 'color': 'blue'},
                {'label': 'circle intersection / overlap', 'color': 'red'},
                {'label': 'minimum enclosing circle', 'color': 'green'},
                {'label': 'circle union area', 'color': 'purple'},
                {'label': 'angular sweep / max points', 'color': 'amber'},
                {'label': 'lattice points / integer points', 'color': 'pink'},
                {'label': 'tangent / circle-line', 'color': 'teal'},
                {'label': 'circumcircle / three points', 'color': 'indigo'},
                {'label': 'sector / arc / ring', 'color': 'orange'},
                {'label': 'circle packing / covering', 'color': 'cyan'},
            ]))
            break

# ── Phase 6: Add problem URLs ──

data['problem_urls'] = {
    'Problem 1': 'https://codeforces.com/problemset/problem/1199/B',
    'Problem 2': 'https://atcoder.jp/contests/abc191/tasks/abc191_d',
    'Problem 3': 'https://leetcode.com/problems/maximum-number-of-darts-inside-of-a-circular-dartboard/',
}

# ── Write ──

with open(PATH, 'w') as f:
    json.dump(data, f, indent=2)

print(f"Done. {len(blocks)} blocks total.")
