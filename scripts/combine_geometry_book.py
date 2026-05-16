#!/usr/bin/env python3
"""
Combine all geometry book chapter files into a single comprehensive markdown book.
Normalizes heading levels and removes duplicate title headers.
"""

import re
import os

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_DIR = os.path.join(BASE, 'geometry')

TITLE_PAGE = r'''# Geometry and Shape Problems in Data Structures and Algorithms

### From Beginner to Advanced

---

**Generated from 10,692 curated DSA problems across 45+ coding platforms**
**15 chapters covering the complete geometry problem-solving spectrum**

---

*dsa-inventory — Geometry Collection*
*Based on the DSA Inventory problem dataset*

---

'''

CHAPTER_TOC_ITEMS = [
    (1, "Introduction to Shapes", 225),
    (2, "Basic Geometry", 3856),
    (3, "Triangle Problems", 269),
    (4, "Right Triangle Problems", 20),
    (5, "Rectangle and Square Problems", 450),
    (6, "Circle Problems", 4116),
    (7, "Coordinate Geometry", 422),
    (8, "Lines and Slopes", 204),
    (9, "Distance and Midpoint", 217),
    (10, "Polygon Problems", 123),
    (11, "Grid-Based Geometry", 402),
    (12, "Area and Perimeter", 37),
    (13, "Angles and Rotation", 72),
    (14, "Computational Geometry", 107),
    (15, "Advanced Geometry Algorithms", 172),
]

def build_toc():
    lines = []
    lines.append("## Table of Contents\n")
    lines.append("| # | Chapter | Problems |")
    lines.append("|---|---------|----------|")
    for num, name, count in CHAPTER_TOC_ITEMS:
        slug = name.lower().replace(' ', '-').replace('--', '-')
        lines.append(f"| {num:2d} | [{name}](#chapter-{num}-{slug}) | {count:,d} |")
    lines.append("")
    lines.append("---\n")
    return "\n".join(lines)

def clean_chapter_file(content, chapter_start, chapter_end):
    """
    Clean a chapter file:
    1. Remove leading title header (like '# Geometry and Shape Problems...')
    2. Fix heading level for chapter headings
    3. Only keep lines from the first chapter heading onward
    """
    lines = content.split('\n')
    
    # Find where the first chapter heading appears
    first_ch_idx = -1
    for i, line in enumerate(lines):
        if re.match(r'^#+ Chapter \d+:', line):
            first_ch_idx = i
            break
    
    if first_ch_idx > 0:
        lines = lines[first_ch_idx:]
    
    # Normalize chapter headings to ## level
    cleaned = []
    for line in lines:
        # Change '# Chapter X:' to '## Chapter X:' if needed
        if re.match(r'^# Chapter \d+:', line):
            line = '#' + line  # Make it ##
        cleaned.append(line)
    
    return '\n'.join(cleaned)

APPENDIX = r'''---

# Appendices

## Appendix A: Quick Reference — Geometry Formulas

### Distance Metrics
| Type | Formula | Use Case |
|------|---------|----------|
| Euclidean | $\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$ | Standard distance |
| Manhattan | $\|x_2-x_1\| + \|y_2-y_1\|$ | Grid movement |
| Chebyshev | $\max(\|x_2-x_1\|, \|y_2-y_1\|)$ | King moves in chess |
| Minkowski | $(\sum\|x_i-y_i\|^p)^{1/p}$ | Generalized metric |

### Triangle Formulas
| Concept | Formula |
|---------|---------|
| Area (base×height) | $A = \frac{1}{2} \times b \times h$ |
| Heron's Formula | $A = \sqrt{s(s-a)(s-b)(s-c)}$, $s = \frac{a+b+c}{2}$ |
| Shoelace (coordinates) | $A = \frac{1}{2}\|\sum_{i=1}^{n}(x_i y_{i+1} - x_{i+1} y_i)\|$ |
| Pythagorean Theorem | $c^2 = a^2 + b^2$ |
| Triangle Inequality | $a + b > c$, $b + c > a$, $a + c > b$ |

### Circle Formulas
| Concept | Formula |
|---------|---------|
| Circumference | $C = 2\pi r$ |
| Area | $A = \pi r^2$ |
| Equation | $(x-h)^2 + (y-k)^2 = r^2$ |
| Arc Length | $s = r\theta$ |
| Sector Area | $A = \frac{1}{2}r^2\theta$ |

### Line Formulas
| Concept | Formula |
|---------|---------|
| Slope | $m = \frac{y_2-y_1}{x_2-x_1}$ |
| Slope-Intercept | $y = mx + b$ |
| Point-Slope | $y - y_1 = m(x - x_1)$ |
| Two-Point | $\frac{y-y_1}{y_2-y_1} = \frac{x-x_1}{x_2-x_1}$ |
| Distance from point to line | $d = \frac{\|Ax_0 + By_0 + C\|}{\sqrt{A^2 + B^2}}$ |
| Perpendicular Slope Condition | $m_1 \cdot m_2 = -1$ |
| Cross Product (orientation) | $(p_2-p_1) \times (p_3-p_1)$ |

### Polygon Formulas
| Concept | Formula |
|---------|---------|
| Interior Angle Sum | $(n-2) \times 180^\circ$ |
| Regular Polygon Interior Angle | $\frac{(n-2) \times 180^\circ}{n}$ |
| Area (shoelace) | $A = \frac{1}{2}\|\sum_{i=1}^{n}(x_i y_{i+1} - x_{i+1} y_i)\|$ |

### Transformation Matrices
| Transformation | 2D Matrix |
|----------------|-----------|
| Rotation (θ) | $\begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}$ |
| Reflection (x-axis) | $\begin{bmatrix} 1 & 0 \\ 0 & -1 \end{bmatrix}$ |
| Reflection (y-axis) | $\begin{bmatrix} -1 & 0 \\ 0 & 1 \end{bmatrix}$ |
| Scaling (sx, sy) | $\begin{bmatrix} s_x & 0 \\ 0 & s_y \end{bmatrix}$ |

## Appendix B: Platform Distribution

| Platform | Problems |
|----------|---------|
| Codeforces | 3,194 |
| LeetCode | 2,779 |
| AtCoder | 1,158 |
| GeeksforGeeks | 610 |
| HackerEarth | 292 |
| SPOJ | 267 |
| Project Euler | 266 |
| CodeChef | 198 |
| HackerRank | 185 |
| UVa | 184 |
| CSES | 178 |
| Kattis | 139 |
| LightOJ | 137 |
| LintCode | 117 |
| Toph | 104 |
| Others | 584 |

## Appendix C: Suggested Study Path

### Beginner Path (2-3 weeks)
1. Chapter 1: Introduction to Shapes
2. Chapter 2: Basic Geometry
3. Chapter 7: Coordinate Geometry
4. Chapter 9: Distance and Midpoint

### Intermediate Path (3-4 weeks)
5. Chapter 3: Triangle Problems
6. Chapter 5: Rectangle and Square Problems
7. Chapter 8: Lines and Slopes
8. Chapter 11: Grid-Based Geometry

### Advanced Path (3-4 weeks)
9. Chapter 6: Circle Problems
10. Chapter 10: Polygon Problems
11. Chapter 12: Area and Perimeter
12. Chapter 13: Angles and Rotation

### Expert Path (4-6 weeks)
13. Chapter 4: Right Triangle Problems
14. Chapter 14: Computational Geometry
15. Chapter 15: Advanced Geometry Algorithms

## Appendix D: Key Patterns Cheat Sheet

| Pattern | When to Use | Complexity |
|---------|-------------|------------|
| Distance Formula | Any problem with points/coordinates | O(1) |
| Shoelace Formula | Polygon area from vertices | O(n) |
| Orientation Check | Collinearity, segment intersection | O(1) |
| Convex Hull | Enclosing polygon, extreme points | O(n log n) |
| Sweep Line | Segment intersections, union area | O((n+k) log n) |
| Point-in-Polygon | Is point inside shape | O(n) |
| BFS/DFS on Grid | Shortest path, connected components | O(mn) |
| 2D Prefix Sum | Sub-rectangle sum queries | O(1) query |
| Rotating Calipers | Width, diameter of convex polygon | O(n) |
| Closest Pair D&C | Minimum distance among points | O(n log n) |

---

*Generated by dsa-inventory — Geometry Collection*
*Dataset: 10,692 problems from 45+ platforms*
*15 educational chapters with complete solutions in Python, C++, and Java*
'''

def main():
    print("Combining book chapters...")
    
    # Read all chapter files
    with open(os.path.join(OUTPUT_DIR, 'book_chapters_1_4.md'), 'r') as f:
        ch1_4 = f.read()
    with open(os.path.join(OUTPUT_DIR, 'book_chapters_5_8.md'), 'r') as f:
        ch5_8 = f.read()
    with open(os.path.join(OUTPUT_DIR, 'book_chapters_9_11.md'), 'r') as f:
        ch9_11 = f.read()
    with open(os.path.join(OUTPUT_DIR, 'book_chapters_12_15.md'), 'r') as f:
        ch12_15 = f.read()
    
    # Clean each file - strip duplicate headers, normalize headings
    # Chapters 1-4: keep as-is (already has proper ## Chapter format)
    # But strip any leading content before first chapter heading
    ch1_4 = clean_chapter_file(ch1_4, 1, 4)
    ch5_8 = clean_chapter_file(ch5_8, 5, 8)
    ch9_11 = clean_chapter_file(ch9_11, 9, 11)
    ch12_15 = clean_chapter_file(ch12_15, 12, 15)
    
    # Build book
    book_parts = []
    book_parts.append(TITLE_PAGE)
    book_parts.append(build_toc())
    book_parts.append(ch1_4)
    book_parts.append(ch5_8)
    book_parts.append(ch9_11)
    book_parts.append(ch12_15)
    book_parts.append(APPENDIX)
    
    full_book = "\n\n".join(book_parts)
    
    # Clean up: remove excessive blank lines (more than 3 consecutive)
    full_book = re.sub(r'\n{4,}', '\n\n\n', full_book)
    
    output_path = os.path.join(OUTPUT_DIR, 'GEOMETRY_AND_SHAPE_BOOK.md')
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(full_book)
    
    total_lines = full_book.count('\n')
    print(f"\nBook written: {output_path}")
    print(f"Total lines: {total_lines:,}")
    print(f"File size: {os.path.getsize(output_path):,} bytes")

if __name__ == '__main__':
    main()
