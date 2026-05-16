#!/usr/bin/env python3
"""
Filter and aggregate all geometry/shape/math-geometry problems from across the DSA inventory.
Reads from geometry/ and shape/ CSVs directly, plus scans other CSVs for geometry-related problems.
Deduplicates by URL and classifies into educational chapters.
"""

import csv
import re
import os
from collections import defaultdict

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Keywords for semantic geometry filtering
GEOMETRY_KEYWORDS = [
    'triangle', 'rectangle', 'square', 'circle', 'polygon', 'angle',
    'area', 'perimeter', 'convex hull', 'collinear', 'coordinate',
    'euclidean', 'manhattan', 'distance', 'midpoint', 'slope',
    'line intersect', 'line segment', 'ray', 'point in polygon',
    'point location', 'closest pair', 'sweep line', 'geometry',
    'geometric', 'shape', 'grid', 'rotation', 'reflection',
    'transformation', 'orientation', 'shoelace', 'heron',
    'circumference', 'radius', 'diameter', 'tangent', 'arc',
    'sector', 'quadrilateral', 'parallelogram', 'rhombus',
    'trapezoid', 'kite', 'hexagon', 'octagon', 'pentagon',
    '3d', 'sphere', 'cube', 'cuboid', 'cylinder', 'cone',
    'prism', 'pyramid', 'torus', 'ellipse', 'parabola',
    'hyperbola', 'frustum', 'trigonometry', 'sin', 'cos', 'tan',
    'pythagorean', 'vector', 'cross product', 'dot product',
    'normalize', 'orthogonal', 'parallel', 'perpendicular',
    'bisector', 'median', 'altitude', 'centroid', 'circumcenter',
    'incenter', 'orthocenter', 'incircle', 'circumcircle',
    'excircle', 'inscribed', 'circumscribed', 'tangent',
    'chord', 'secant', 'intersection', 'overlap', 'union',
    'difference', 'symmetry', 'translate', 'scaling',
    'shear', 'affine', 'projective', 'isometric', 'homothetic',
    'lattice', 'integer point', 'grid point', 'axis-aligned',
    'bounding box', 'minimum bounding', 'enclosing', 'inset',
    'offset', 'buffer', 'minkowski', 'voronoi', 'delaunay',
    'half-plane', 'halfplane', 'convex', 'concave', 'reflex',
    'simple polygon', 'monotone', 'star-shaped', 'planar',
    'map projection', 'geodesic', 'great circle', 'haversine',
    'spherical', 'azimuth', 'elevation', 'bearing',
    'compass', 'cardinal', 'latitude', 'longitude',
    'helix', 'spiral', 'fractal', 'sierpinski', 'mandelbrot',
    'menger', 'koch', 'dragon curve', 'space-filling',
    'hilbert curve', 'z-order', 'morton', 'quadtree',
    'r-tree', 'kd-tree', 'bsp tree', 'boundary',
    'face', 'edge', 'vertex', 'mesh', 'triangulation',
    'tessellation', 'subdivision', 'nurbs', 'bezier',
    'spline', 'b-spline', 'catmull', 'hermite',
]

# Load geometry keywords set for fast lookup
GEOMETRY_SET = set(k.lower() for k in GEOMETRY_KEYWORDS)

def is_geometry_problem(row):
    """Check if a row is geometry-related based on Category, Problem Name, Key Concept."""
    fields_to_check = []
    if 'Category' in row:
        fields_to_check.append(row['Category'])
    if 'Problem Name' in row:
        fields_to_check.append(row['Problem Name'])
    if 'Key Concept' in row:
        fields_to_check.append(row['Key Concept'])
    
    text = ' '.join(fields_to_check).lower()
    
    # Direct keyword match
    for kw in GEOMETRY_KEYWORDS:
        if kw in text:
            return True
    
    return False

def read_csv(filepath, rename_diff=False):
    """Read CSV and return list of dicts, optionally renaming difficulty column."""
    rows = []
    try:
        with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
            reader = csv.DictReader(f)
            for row in reader:
                if rename_diff and 'Difficulty/Rating' in row and 'Difficulty' not in row:
                    row['Difficulty'] = row['Difficulty/Rating']
                rows.append(row)
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
    return rows

def read_all_geometry_csvs():
    """Read geometry/shape CSVs (already filtered)."""
    all_rows = []
    
    # geometry CSV
    geo_path = os.path.join(BASE, 'geometry', 'all_geometry_problems.csv')
    all_rows.extend(read_csv(geo_path))
    
    # shape CSV (has Difficulty/Rating instead of Difficulty)
    shape_path = os.path.join(BASE, 'shape', 'all_shape_problems.csv')
    all_rows.extend(read_csv(shape_path, rename_diff=True))
    
    return all_rows

def scan_other_csvs():
    """Scan other CSVs for geometry problems."""
    all_rows = []
    
    other_csvs = [
        ('leetcode', 'all_leetcode_problems.csv'),
        ('codeforces', 'all_codeforces_problems.csv'),
        ('math', 'all_math_problems.csv'),
        ('dp', 'all_dp_problems.csv'),
        ('graph', 'all_graph_problems.csv'),
        ('binary_search', 'all_bs_problems.csv'),
        ('backtrack', 'all_backtracking_problems.csv'),
        ('bit', 'all_bit_problems.csv'),
        ('combinatorics', 'all_combinatorics_problems.csv'),
        ('greedy', 'all_greedy_problems.csv'),
        ('heap', 'all_heap_problems.csv'),
        ('linked_list', 'all_linked_list_problems.csv'),
        ('sliding_window', 'all_sliding_window_problems.csv'),
        ('string', 'all_string_problems.csv'),
        ('tree', 'all_tree_problems.csv'),
        ('trie', 'all_trie_problems.csv'),
        ('advanced_tree', 'all_advanced_tree_problems.csv'),
        ('game_theory', 'all_game_theory_problems.csv'),
        ('linear_algebra', 'all_linear_algebra_problems.csv'),
        ('num_methods', 'all_num_methods_problems.csv'),
        ('scheduling', 'all_scheduling_problems.csv'),
        ('sequences', 'all_sequences_problems.csv'),
        ('miscellaneous', 'all_miscellaneous_problems.csv'),
    ]
    
    for folder, fname in other_csvs:
        path = os.path.join(BASE, folder, fname)
        if os.path.exists(path):
            rows = read_csv(path)
            for r in rows:
                if is_geometry_problem(r):
                    all_rows.append(r)
    
    return all_rows

def normalize_url(url):
    """Normalize URL for dedup: strip trailing slashes, www, etc."""
    url = url.strip()
    url = re.sub(r'/+$', '', url)
    url = url.replace('www.', '')
    return url.lower()

def normalize_platform(name):
    """Normalize platform names."""
    norms = {
        'geeksforgeeks': 'GeeksforGeeks',
        'leetcode': 'LeetCode',
        'codeforces': 'Codeforces',
        'atcoder': 'AtCoder',
        'codechef': 'CodeChef',
        'hackerrank': 'HackerRank',
        'hackerearth': 'HackerEarth',
        'spoj': 'SPOJ',
        'uva': 'UVa',
        'timus': 'Timus',
        'kattis': 'Kattis',
        'toph': 'Toph',
        'usaco': 'USACO',
        'lightoj': 'LightOJ',
        'interviewbit': 'InterviewBit',
        'lintcode': 'LintCode',
        'binarysearch': 'BinarySearch',
        'dmoj': 'DMOJ',
        'poj': 'POJ',
        'e-olymp': 'E-Olymp',
        'aoj': 'AOJ',
        'codewars': 'Codewars',
        'codeabbey': 'CodeAbbey',
        'codesignal': 'CodeSignal',
        'pramp': 'Pramp',
        'topcoder': 'TopCoder',
        'cses': 'CSES',
        'baekjoon': 'Baekjoon',
        'codesignal': 'CodeSignal',
    }
    name = name.strip()
    lower = name.lower()
    if lower in norms:
        return norms[lower]
    return name

def classify_chapter(row):
    """Classify a problem into a chapter based on Category, Problem Name, Key Concept."""
    cat = (row.get('Category', '') + ' ' + row.get('Problem Name', '') + ' ' + row.get('Key Concept', '')).lower()
    
    # Chapter 1: Introduction to Shapes
    if any(k in cat for k in ['shape', 'basic shape', 'shape classification', 'identify shape']):
        return 1
    
    # Chapter 2: Basic Geometry
    if any(k in cat for k in ['basic geometry', 'geometry basics', 'fundamental geometry']):
        return 2
    
    # Chapter 3: Triangle Problems
    if any(k in cat for k in ['triangle', 'triang']):
        return 3
    
    # Chapter 4: Right Triangle Problems
    if any(k in cat for k in ['right triangle', 'right-angle', 'right angle', 'pythagorean']):
        return 4
    
    # Chapter 5: Rectangle and Square Problems
    if any(k in cat for k in ['rectangle', 'rectang', 'square']):
        return 5
    
    # Chapter 6: Circle Problems
    if any(k in cat for k in ['circle', 'circum', 'radius', 'diameter', 'tangent', 'arc']):
        return 6
    
    # Chapter 7: Coordinate Geometry
    if any(k in cat for k in ['coordinate', 'co-ordinate', 'cartesian', 'point', '2d point', 'grid point']):
        return 7
    
    # Chapter 8: Lines and Slopes
    if any(k in cat for k in ['line', 'slope', 'collinear', 'parallel', 'perpendicular', 'intersect']):
        return 8
    
    # Chapter 9: Distance and Midpoint
    if any(k in cat for k in ['distance', 'midpoint', 'manhattan', 'euclidean', 'chebyshev']):
        return 9
    
    # Chapter 10: Polygon Problems
    if any(k in cat for k in ['polygon', 'quadrilateral', 'pentagon', 'hexagon', 'octagon', 
                              'parallelogram', 'rhombus', 'trapezoid', 'kite']):
        return 10
    
    # Chapter 11: Grid-Based Geometry
    if any(k in cat for k in ['grid', 'matrix rotation', 'grid transformation', '2d array', 'grid path']):
        return 11
    
    # Chapter 12: Area and Perimeter
    if any(k in cat for k in ['area', 'perimeter', 'surface area', 'volume', 'region']):
        return 12
    
    # Chapter 13: Angles and Rotation
    if any(k in cat for k in ['angle', 'rotation', 'rotate', 'reflection', 'symmetry']):
        return 13
    
    # Chapter 14: Computational Geometry
    if any(k in cat for k in ['convex hull', 'voronoi', 'delaunay', 'sweep line', 'closest pair',
                              'point in polygon', 'half-plane', 'plane sweep', 'segment tree',
                              'intersection', 'boolean operation', 'bounding box']):
        return 14
    
    # Chapter 15: Advanced Geometry Algorithms
    if any(k in cat for k in ['3d', 'sphere', 'mesh', 'triangulation', 'subdivision', 
                              'fractal', 'bezier', 'spline', 'nurbs', 'geodesic',
                              'spherical', 'haversine', 'great circle', 'map projection']):
        return 15
    
    # Default: assign based on mathematical nature
    return 2  # Basic Geometry

CHAPTER_NAMES = {
    1: 'Introduction to Shapes',
    2: 'Basic Geometry',
    3: 'Triangle Problems',
    4: 'Right Triangle Problems',
    5: 'Rectangle and Square Problems',
    6: 'Circle Problems',
    7: 'Coordinate Geometry',
    8: 'Lines and Slopes',
    9: 'Distance and Midpoint',
    10: 'Polygon Problems',
    11: 'Grid-Based Geometry',
    12: 'Area and Perimeter',
    13: 'Angles and Rotation',
    14: 'Computational Geometry',
    15: 'Advanced Geometry Algorithms',
}

def main():
    print("=" * 60)
    print("DSA INVENTORY - GEOMETRY PROBLEM COLLECTOR")
    print("=" * 60)
    
    # Phase 1: Read existing geometry/shape CSVs
    print("\n[Phase 1] Reading existing geometry/shape CSVs...")
    base_rows = read_all_geometry_csvs()
    print(f"  Found {len(base_rows)} problems in geometry/shape CSVs")
    
    # Phase 2: Scan other CSVs
    print("\n[Phase 2] Scanning other CSVs for geometry problems...")
    extra_rows = scan_other_csvs()
    print(f"  Found {len(extra_rows)} extra geometry problems in other CSVs")
    
    # Combine
    all_rows = base_rows + extra_rows
    print(f"\n  Total raw problems: {len(all_rows)}")
    
    # Phase 3: Deduplicate by URL
    print("\n[Phase 3] Deduplicating by URL...")
    seen_urls = set()
    unique_rows = []
    for row in all_rows:
        url = normalize_url(row.get('URL', ''))
        if url and url not in seen_urls:
            seen_urls.add(url)
            unique_rows.append(row)
    
    print(f"  Unique problems: {len(unique_rows)}")
    
    # Phase 4: Normalize platform names
    print("\n[Phase 4] Normalizing platform names...")
    for row in unique_rows:
        if 'Platform' in row:
            row['Platform'] = normalize_platform(row['Platform'])
    
    # Phase 5: Classify into chapters
    print("\n[Phase 5] Classifying into chapters...")
    chapters = defaultdict(list)
    for row in unique_rows:
        ch = classify_chapter(row)
        chapters[ch].append(row)
    
    for ch_num in sorted(chapters.keys()):
        print(f"  Chapter {ch_num:2d} ({CHAPTER_NAMES[ch_num]:35s}): {len(chapters[ch_num]):4d} problems")
    
    # Phase 6: Write output CSV
    print("\n[Phase 6] Writing output CSV...")
    output_path = os.path.join(BASE, 'geometry', 'geometry_book_dataset.csv')
    
    fieldnames = ['Platform', 'Category', 'Problem Name', 'URL', 'Difficulty', 'Key Concept', 'Chapter']
    
    with open(output_path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for ch_num in sorted(chapters.keys()):
            for row in chapters[ch_num]:
                out = {
                    'Platform': row.get('Platform', ''),
                    'Category': row.get('Category', ''),
                    'Problem Name': row.get('Problem Name', ''),
                    'URL': row.get('URL', ''),
                    'Difficulty': row.get('Difficulty', row.get('Difficulty/Rating', '')),
                    'Key Concept': row.get('Key Concept', ''),
                    'Chapter': str(ch_num) + '. ' + CHAPTER_NAMES[ch_num],
                }
                writer.writerow(out)
    
    print(f"\n  Output written to: {output_path}")
    print(f"  Total unique geometry problems: {len(unique_rows)}")
    
    # Platform distribution
    print("\n[Platform Distribution]")
    platform_count = defaultdict(int)
    for row in unique_rows:
        platform_count[row.get('Platform', 'Unknown')] += 1
    for plat, count in sorted(platform_count.items(), key=lambda x: -x[1]):
        print(f"  {plat:20s}: {count}")
    
    print("\n" + "=" * 60)
    print("DONE!")
    print("=" * 60)

if __name__ == '__main__':
    main()
