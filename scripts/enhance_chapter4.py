#!/usr/bin/env python3
"""Enhance right-triangle-problems.json: convert math code blocks, add interactive diagrams, hints, keyword badges."""

import json, sys

PATH = 'public/data/geometry-book/right-triangle-problems.json'

with open(PATH) as f:
    data = json.load(f)
blocks = data['blocks']

def find_block(**kw):
    for i, b in enumerate(blocks):
        for k, v in kw.items():
            if b.get(k) != v:
                break
        else:
            return i
    return -1

def find_text_containing(sub):
    for i, b in enumerate(blocks):
        if b.get('type') == 'text' and sub in (b.get('content') or ''):
            return i
    return -1

# ── Phase 1: Convert empty-lang code blocks to LaTeX text blocks ──

idx = find_block(type='code', lang='')
while idx != -1:
    code = blocks[idx].get('code', '')
    if 'a^2 + b^2 = c^2' in code and len(code) < 30:
        blocks[idx] = {"type":"text","content":"$$a^2 + b^2 = c^2$$"}
    elif code.startswith('c = sqrt(a^2 + b^2)'):
        blocks[idx] = {"type":"text","content":"$$c = \\sqrt{a^2 + b^2} \\quad \\text{(hypotenuse from legs)}$$\n$$a = \\sqrt{c^2 - b^2} \\quad \\text{(leg from hypotenuse and other leg)}$$"}
    elif code.startswith('a = m^2 - n^2'):
        blocks[idx] = {"type":"text","content":"$$a = m^2 - n^2$$\n$$b = 2 \\cdot m \\cdot n$$\n$$c = m^2 + n^2$$"}
    elif '(3, 4, 5)' in code:
        blocks[idx] = {"type":"text","content":"$$(3, 4, 5) \\quad (5, 12, 13) \\quad (8, 15, 17)$$\n$$(7, 24, 25) \\quad (9, 40, 41) \\quad (20, 21, 29)$$\n$$(6, 8, 10) \\; \\text{[multiple of 3-4-5]}$$"}
    elif code.startswith('legs: a = b'):
        blocks[idx] = {"type":"text","content":"$$\\text{legs: } a = b$$\n$$\\text{hypotenuse: } c = a\\sqrt{2}$$\n$$\\text{Area} = \\frac{a^2}{2}$$"}
    elif code.startswith('short leg = a'):
        blocks[idx] = {"type":"text","content":"$$\\text{short leg} = a$$\n$$\\text{long leg} = a\\sqrt{3}$$\n$$\\text{hypotenuse} = 2a$$\n$$\\text{Area} = \\frac{\\sqrt{3}}{2}a^2$$"}
    idx = find_block(type='code', lang='')

# ── Phase 2: Insert keyword_badges (after keyword list) ──
# Find the "Keywords for right triangle problems:" text block
kw_text_idx = find_text_containing('Keywords for right triangle problems')
if kw_text_idx != -1:
    kw_block = blocks[kw_text_idx]
    blocks[kw_text_idx] = {
        "type": "text",
        "content": kw_block['content']
    }
    # Insert keyword_badges right after
    kw_list_idx = kw_text_idx + 1
    if kw_list_idx < len(blocks) and blocks[kw_list_idx]['type'] == 'list':
        # Replace the list with keyword_badges
        blocks[kw_list_idx] = {
            "type": "keyword_badges",
            "groups": [
                {"label":"right triangle / right-angled triangle","color":"red"},
                {"label":"Pythagorean / Pythagoras","color":"indigo"},
                {"label":"hypotenuse / leg","color":"violet"},
                {"label":"90 degrees / perpendicular","color":"sky"},
                {"label":"integer sides / integer right triangle","color":"emerald"},
                {"label":"Pythagorean triple / triplet","color":"amber"},
                {"label":"distance formula","color":"rose"},
                {"label":"right angle detection","color":"cyan"},
                {"label":"count right triangles","color":"orange"},
            ]
        }

# ── Phase 3: Insert hint_card and interactive_diagram (bottom-up to preserve indices) ──

# 3a: Insert special-right-triangles diagram after 30-60-90 formulas block (was empty-lang code)
sr_idx = find_text_containing('30-60-90 triangle')
if sr_idx != -1:
    sr_diagram_idx = sr_idx + 1
    # The next block after "30-60-90 triangle" text is the converted LaTeX block
    if sr_diagram_idx < len(blocks) and blocks[sr_diagram_idx]['type'] == 'text' and '\\text{short leg}' in blocks[sr_diagram_idx]['content']:
        blocks.insert(sr_diagram_idx + 1, {
            "type": "interactive_diagram",
            "diagram": "special-right-triangles"
        })

# 3b: Insert hint_card for special right triangles near "Common triples to remember"
trip_idx = find_text_containing('Common triples to remember')
if trip_idx != -1:
    blocks.insert(trip_idx + 1, {
        "type": "hint_card",
        "question": "Should I memorize the common Pythagorean triples?",
        "answer": "Yes. The six primitive triples (3-4-5, 5-12-13, 8-15-17, 7-24-25, 9-40-41, 20-21-29) appear constantly in competitive programming. Spotting them instantly saves you from recomputing. If you see side lengths in a problem that match any of these (or their multiples), you immediately know it is a right triangle."
    })

# 3c: Insert pythagorean-explorer diagram after "where c is the hypotenuse" text
hyp_text_idx = find_text_containing('where `c` is the hypotenuse')
if hyp_text_idx != -1:
    blocks.insert(hyp_text_idx + 1, {
        "type": "interactive_diagram",
        "diagram": "pythagorean-explorer"
    })

# 3d: Insert hint_card for Pythagorean theorem after "The Pythagorean theorem states:"
pyth_text_idx = find_text_containing('The Pythagorean theorem states')
if pyth_text_idx != -1:
    blocks.insert(pyth_text_idx + 1, {
        "type": "hint_card",
        "question": "Should I use sqrt or squared distances?",
        "answer": "Always prefer squared distances for comparisons. Computing sqrt is expensive and introduces floating-point errors. For right triangle detection, `a^2 + b^2 == c^2` is exact, while `sqrt(a^2 + b^2) == c` can fail due to precision. The only time you need sqrt is when you need the actual distance value for display."
    })

# 3e: Insert hint for right triangle detection (using dot product)
dot_idx = find_text_containing('Using dot product')
if dot_idx != -1:
    blocks.insert(dot_idx + 1, {
        "type": "hint_card",
        "question": "How is the dot product trick faster?",
        "answer": "The dot product detects perpendicular vectors without computing side lengths at all. Given three points A, B, C, compute dot(AB, AC). If it is zero, angle A is 90 degrees. This is O(1) with just subtraction and multiplication — no square roots, no sorting of sides. It is the preferred method in competitive programming."
    })


# ── Phase 4: Add hint_card for Pattern 2 (Euclid's formula) ──
pattern2_idx = find_text_containing('Pattern 2: Euclid\'s Formula')
if pattern2_idx != -1:
    blocks.insert(pattern2_idx + 1, {
        "type": "hint_card",
        "question": "What if I forget the Euclid constraints?",
        "answer": "The two constraints are: (1) m and n must have opposite parity (one even, one odd — so m-n is odd). (2) m and n must be coprime (gcd = 1). If you omit these, you get duplicates and non-primitive triples mixed in. For most problems, generating ALL triples (including non-primitive) and deduplicating is simpler than enforcing the constraints."
    })


# ── Phase 5: Add hint_card for Pattern 3 (Right triangle counting) ──
pattern3_idx = find_text_containing('Pattern 3: Right Triangle Counting from Points')
if pattern3_idx != -1:
    blocks.insert(pattern3_idx + 1, {
        "type": "hint_card",
        "question": "Why do we divide by 2 in the counting approach?",
        "answer": "Each right triangle has two acute vertices, and our loop treats each point as a potential right-angle vertex. So every right triangle is counted exactly twice — once for each acute vertex where the perpendicular sides meet. Dividing by 2 corrects this overcount. The right-angle vertex always has the perpendicular slopes, but our loop counts from the other two vertices."
    })


# ── Write result ──
data['blocks'] = blocks
with open(PATH, 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f'Enhanced Chapter 4: {len(blocks)} blocks, 0 errors expected')
print('Done!')
