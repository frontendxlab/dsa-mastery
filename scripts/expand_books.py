#!/usr/bin/env python3
"""Expands all book JSON files with more chapters and problems.
Run after build to add more realistic content to each book."""

import json, os, sys

BOOKS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'public', 'data', 'books')

DIFFICULTIES = ['Easy', 'Easy', 'Medium', 'Medium', 'Hard']

EXPANSIONS = {
    'dsamadeasy': [
        ('Hashing', 6),
        ('String Algorithms', 6),
        ('Divide and Conquer', 5),
        ('Greedy Algorithms', 6),
    ],
    'grokking': [
        ('Arrays', 6),
        ('Sorting and Searching', 6),
        ('Greedy Algorithms', 5),
        ('NP Complete Problems', 5),
    ],
    'progchal': [('Sorting', 5)],
    'math4cs': [
        ('Counting', 5),
        ('Discrete Probability', 5),
        ('Number Theory', 5),
    ],
    'setslogic': [
        ('Functions', 5),
        ('Mathematical Induction', 5),
    ],
    'algodaily': [
        ('Advanced Sorting', 5),
        ('Dynamic Programming', 6),
    ],
    'guidetocp': [
        ('Number Theory', 6),
        ('Game Theory', 5),
    ],
    'gamam': [('Behavioral Questions', 6)],
    'progintervexp': [
        ('Databases', 5),
        ('Networking', 5),
    ],
    'advdsalgo': [
        ('Approximation', 5),
        ('Randomized Algorithms', 5),
    ],
    'ctci': [
        ('Object Oriented Design', 8),
        ('System Design', 6),
        ('Threads and Locks', 6),
    ],
    'cp4': [
        ('Mathematics', 8),
        ('Game Theory', 6),
        ('Advanced Data Structures', 6),
        ('String Algorithms', 6),
    ],
    'hd': [
        ('Arithmetic', 6),
        ('Division', 5),
        ('Double Precision', 5),
    ],
}

for slug, chapters in EXPANSIONS.items():
    path = os.path.join(BOOKS_DIR, f'{slug}.json')
    if not os.path.exists(path):
        print(f'  ⚠ Missing: {slug}.json')
        continue
    
    with open(path) as f:
        data = json.load(f)
    
    # Add more problems to existing chapters
    for ch in data.get('chapters', []):
        existing = len(ch.get('problems', []))
        target = 6 if existing < 6 else existing
        if existing < target:
            for i in range(existing + 1, target + 1):
                pid = f"{ch['num']}-{i}"
                if not any(p['id'] == pid for p in ch['problems']):
                    ch['problems'].append({
                        'id': pid,
                        'title': f"Exercise {ch['num']}.{i}",
                        'difficulty': DIFFICULTIES[(i - 1) % len(DIFFICULTIES)],
                        'tags': [],
                    })
    
    # Add extra chapters
    next_num = len(data['chapters']) + 1
    for title, count in chapters:
        ch = {'num': str(next_num), 'title': title, 'summary': f'{title} concepts and practice', 'problems': []}
        for i in range(1, count + 1):
            ch['problems'].append({
                'id': f"{next_num}-{i}",
                'title': f"{title} Problem {i}",
                'difficulty': DIFFICULTIES[(i - 1) % len(DIFFICULTIES)],
                'tags': [],
            })
        data['chapters'].append(ch)
        next_num += 1
    
    data['totalProblems'] = sum(len(ch.get('problems', [])) for ch in data['chapters'])
    
    with open(path, 'w') as f:
        json.dump(data, f, indent=2)
    
    print(f'  {slug}: → {data["totalProblems"]} problems')
