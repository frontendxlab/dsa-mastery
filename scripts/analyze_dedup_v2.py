"""
Precise dedup analysis of 38k+ DSA problems.

Finds:
1. Same problem on different platforms (by normalized title + fuzzy match)
2. Same solution pattern (algorithmic equivalence, not just key concept text)
3. Problems that appear in multiple topic CSVs (legitimate cross-topic)
4. Title/URL normalization inconsistencies
"""

import csv, os, re, json, math
from collections import defaultdict
from difflib import SequenceMatcher

BASE = '/home/rashid/projects/personal/dsa-inventory'

def load_all():
    rows = []
    for root, dirs, files in os.walk(BASE):
        for f in files:
            if not (f.startswith('all_') and f.endswith('_problems.csv')): continue
            if 'node_modules' in root: continue
            topic = os.path.basename(root)
            with open(os.path.join(root, f), encoding='utf-8') as fh:
                reader = csv.reader(fh)
                for i, row in enumerate(reader):
                    if i == 0: continue
                    if len(row) < 6: continue
                    rows.append({
                        'topic': topic,
                        'platform': row[0].strip(),
                        'category': row[1].strip(),
                        'name': row[2].strip(),
                        'url': row[3].strip(),
                        'difficulty': row[4].strip(),
                        'key_concept': row[5].strip(),
                    })
    return rows

def norm_title(t):
    """Normalize title for cross-platform matching"""
    t = t.strip()
    t = re.sub(r'^\d+\.\s*', '', t)  # "123. Title"
    t = re.sub(r'\s*\((Easy|Medium|Hard)\)\s*$', '', t, flags=re.I)
    t = re.sub(r'^\w+\s+\d+[\s\-:–]+', '', t)  # "LC 123:" or "CF 123 -"
    t = re.sub(r'\s+', ' ', t).lower().strip()
    t = re.sub(r'[^a-z0-9\s]', '', t)
    t = re.sub(r'\b(easy|medium|hard)\b', '', t)
    t = re.sub(r'\s+', ' ', t).strip()
    return t

def fuzzy_match(t1, t2):
    """Returns similarity ratio between two titles"""
    return SequenceMatcher(None, t1, t2).ratio()

def extract_platform_id(url, platform):
    """Extract the problem ID from a platform URL"""
    patterns = {
        'LeetCode': r'/problems/([\w-]+)',
        'Codeforces': r'/problem/(\d+[a-zA-Z]?)',
        'AtCoder': r'/tasks/([\w_]+)',
        'CSES': r'/task/(\d+)',
        'SPOJ': r'/problems/(\w+)',
        'UVa': r'[?&]num=(\d+)',
        'Timus': r'[?&]num=(\d+)',
        'HackerRank': r'/challenges/([\w-]+)',
        'CodeChef': r'/problems/(\w+)',
        'Kattis': r'/problems/([\w-]+)',
        'LightOJ': r'/problem/(\d+)',
        'Baekjoon': r'/problem/(\d+)',
        'GeeksforGeeks': r'/problems/([\w-]+)',
        'POJ': r'[?&]id=(\d+)',
        'E-Olymp': r'/problems/(\d+)',
        'AOJ': r'[?&]id=(\w+)',
        'DMOJ': r'/problem/([\w-]+)',
        'USACO': r'[?&]cpid=(\d+)',
    }
    for p, pat in patterns.items():
        if platform == p or url.startswith(p.lower()):
            m = re.search(pat, url)
            if m: return m.group(1)

# ── Load ────────────────────────────────────────────────────────────────────
all_rows = load_all()
print(f"Loaded {len(all_rows)} problems")

# Normalize once
for r in all_rows:
    r['norm'] = norm_title(r['name'])

# ── 1. CROSS-PLATFORM DUPLICATES (same title on different platforms) ────────
print("\n" + "="*80)
print("SECTION 1: SAME PROBLEM ON DIFFERENT PLATFORMS")
print("="*80)

# Group by normalized title
by_title = defaultdict(list)
for r in all_rows:
    by_title[r['norm']].append(r)

# Find true cross-platform (different platforms, same normalized title)
cross_platform = {}
for title, entries in by_title.items():
    platforms = set(e['platform'] for e in entries)
    if len(platforms) > 1:
        cross_platform[title] = list(platforms)

print(f"\nFound {len(cross_platform)} problems appearing on multiple platforms")
print()

# Show the most duplicated problems
for title, platforms in sorted(cross_platform.items(), key=lambda x: -len(x[1]))[:40]:
    names = list(set(e['name'] for e in by_title[title]))
    topics = list(set(e['topic'] for e in by_title[title]))
    print(f"  {names[0][:80]}")
    print(f"  Platforms: {', '.join(sorted(platforms))}")
    print(f"  Topics: {', '.join(sorted(topics))}")
    for n in sorted(set(names))[:3]:
        if n != names[0]:
            print(f"    aka: {n}")
    print()

# ── 2. MULTI-TOPIC PROBLEMS (legitimate cross-topic) ────────────────────────
print("="*80)
print("SECTION 2: SAME PROBLEM ACROSS DIFFERENT TOPIC CSVS")
print("="*80)

cross_topic = {}
for title, entries in by_title.items():
    topics = set(e['topic'] for e in entries)
    if len(topics) >= 2:
        platforms = set(e['platform'] for e in entries)
        cross_topic[title] = {
            'topics': list(topics),
            'platforms': list(platforms),
            'entries': entries
        }

print(f"\nFound {len(cross_topic)} problems appearing in 2+ topic CSVs")
print()

for title, info in sorted(cross_topic.items(), key=lambda x: -len(x[1]['topics']))[:30]:
    entries = info['entries']
    print(f"  {entries[0]['name'][:70]}")
    print(f"  Topics ({len(info['topics'])}): {', '.join(sorted(info['topics']))}")
    print(f"  Platforms: {', '.join(sorted(info['platforms']))}")
    # Show which topics each platform filed it under
    by_plat = defaultdict(list)
    for e in entries:
        by_plat[e['platform']].append(e['topic'])
    for plat, t in sorted(by_plat.items()):
        print(f"    [{plat}] → {', '.join(sorted(set(t)))}")
    print()

# ── 3. TITLE NORMALIZATION INCONSISTENCIES ──────────────────────────────────
print("="*80)
print("SECTION 3: TITLE / NAMING INCONSISTENCIES")
print("="*80)

# Group by non-normalized name to find variants of the same title
raw_names = defaultdict(list)
for r in all_rows:
    raw_names[r['name']].append(r)

# Find problems where the same title appears with/without platform prefix
title_variants = defaultdict(set)
for r in all_rows:
    # Extract just the core title
    core = re.sub(r'^\d+\.\s*', '', r['name'])
    core = re.sub(r'^[A-Z]+\s+\d+[\s\-:–]+', '', core).strip()
    title_variants[core.lower()].add(r['name'])

inconsistent = {k: v for k, v in title_variants.items() if len(v) > 1}
print(f"\nFound {len(inconsistent)} problems with inconsistent naming")
print()

for core, variants in sorted(inconsistent.items(), key=lambda x: -len(x[1]))[:30]:
    print(f"  Core: {core[:60]}")
    for v in sorted(variants)[:5]:
        print(f"    - {v}")
    print()

# ── 4. SAME SOLUTION PATTERN (algorithmic equivalence) ──────────────────────
print("="*80)
print("SECTION 4: DIFFERENT PROBLEMS, SAME ALGORITHMIC PATTERN")
print("="*80)

# Build pattern groups from Key Concept field
PATTERN_RULES = [
    # (pattern_name, keywords)
    ('Fibonacci-style DP', ['fibonacci', 'tribonacci', 'climbing stairs', 'nth step', 'n-th tribonacci', 'hex-a-bonacci']),
    ('Knapsack DP', ['knapsack', '0/1 knapsack', 'unbounded knapsack', 'coin change', 'subset sum', 'target sum', 'partition equal']),
    ('LCS / Edit Distance', ['longest common subsequence', 'edit distance', 'levenshtein', 'shortest common supersequence', 'lcs']),
    ('LIS (Longest Inc Subseq)', ['longest increasing subsequence', 'lis', 'patience sorting', 'russian doll']),
    ('Two Pointers', ['two pointer', 'two sum', '2sum', 'pair sum', '3sum', '4sum', 'container with most water']),
    ('Sliding Window', ['sliding window', 'fixed-size window', 'variable-size window', 'fixed window', 'variable window', 'distinct characters window']),
    ('BFS (unweighted shortest)', ['bfs', 'breadth first', 'breadth-first', 'level order traversal', 'shortest path unweighted']),
    ('DFS / Backtracking', ['dfs', 'depth first', 'depth-first', 'backtracking', 'recursive search', 'recursion tree']),
    ('Dijkstra / Shortest Path', ['dijkstra', 'shortest path weighted', 'single source shortest', 'network delay']),
    ('Union Find / DSU', ['union find', 'dsu', 'disjoint set', 'find union', 'connected components graph']),
    ('Segment Tree / Fenwick', ['segment tree', 'fenwick', 'binary indexed', 'range query', 'range update', 'range sum', 'range minimum query', 'rmq']),
    ('Binary Search (on answer)', ['binary search on answer', 'bs on answer', 'bs answer', 'capacity to ship', 'koko eating']),
    ('Trie / Prefix Tree', ['trie', 'prefix tree', 'prefix search', 'digital tree', 'autocomplete', 'word dictionary']),
    ('Topological Sort', ['topological', 'topo sort', 'kahn', 'dag sort', 'course schedule']),
    ('MST (Kruskal/Prim)', ['mst', 'minimum spanning', 'kruskal', 'prim', 'connect cities']),
    ('Bitmask DP', ['bitmask dp', 'bitmask dynamic', 'bit dp', 'subset dp', 'dp with bitmask']),
    ('Tree DP', ['tree dp', 'dp on tree', 'tree dynamic', 'tree diameter', 'tree height']),
    ('GCD / Euclidean', ['gcd', 'euclidean', 'hcf', 'greatest common divisor']),
    ('Matrix Exponentiation', ['matrix exponentiation', 'matrix power', 'linear recurrence matrix']),
    ('Greedy (sorting)', ['greedy sorting', 'greedy sort', 'greedy + sorting', 'activity selection', 'interval scheduling']),
]

pattern_groups = defaultdict(list)
for r in all_rows:
    kc = r['key_concept'].lower()
    for pattern_name, keywords in PATTERN_RULES:
        for kw in keywords:
            if kw in kc:
                pattern_groups[pattern_name].append(r)
                break

# Show unique problem names per pattern
for pattern, entries in sorted(pattern_groups.items(), key=lambda x: -len(x[1])):
    if len(entries) < 3: continue
    unique = []
    seen = set()
    for e in entries:
        key = (e['platform'], e['name'])
        if key not in seen:
            seen.add(key)
            unique.append(e)
    
    print(f"Pattern: {pattern}")
    print(f"  Occurrences: {len(entries)}, Unique: {len(unique)}")
    print(f"  Platforms: {', '.join(sorted(set(e['platform'] for e in unique)))}")
    print(f"  Examples:")
    for e in unique[:6]:
        print(f"    [{e['platform']}] {e['name'][:70]}")
    print()

# ── 5. FUZZY MATCHING (similar but non-identical titles) ────────────────────
print("="*80)
print("SECTION 5: FUZZY-MATCHED DUPLICATES (similar titles)")
print("="*80)

all_titles = list(set((r['norm'], r['platform'], r['name'], r['url']) for r in all_rows))
fuzzy_pairs = []
for i in range(len(all_titles)):
    for j in range(i+1, len(all_titles)):
        t1 = all_titles[i][0]
        t2 = all_titles[j][0]
        if t1 == t2: continue  # already covered in section 1
        if all_titles[i][1] == all_titles[j][1]: continue  # same platform
        ratio = fuzzy_match(t1, t2)
        if ratio >= 0.85:
            fuzzy_pairs.append((ratio, all_titles[i], all_titles[j]))

fuzzy_pairs.sort(key=lambda x: -x[0])
seen_fuzzy = set()
for ratio, a, b in fuzzy_pairs:
    key = tuple(sorted([a[2], b[2]]))
    if key in seen_fuzzy: continue
    seen_fuzzy.add(key)

print(f"Found {len(fuzzy_pairs)} fuzzy-matched pairs (≥85% similarity)")
print(f"Unique pairs: {len(seen_fuzzy)}")
print()

count = 0
for ratio, a, b in fuzzy_pairs[:40]:
    key = tuple(sorted([a[2], b[2]]))
    if key not in seen_fuzzy: continue
    seen_fuzzy.discard(key)
    print(f"  {ratio:.0%} match")
    print(f"    [{a[1]}] {a[2][:70]}")
    print(f"    [{b[1]}] {b[2][:70]}")
    print()
    count += 1
    if count >= 20: break

# ── SUMMARY ──────────────────────────────────────────────────────────────────
print("="*80)
print("SUMMARY")
print("="*80)
print(f"Total problems analyzed: {len(all_rows)}")
print(f"Cross-platform duplicates: {len(cross_platform)}")
print(f"Multi-topic problems: {len(cross_topic)}")
print(f"Title inconsistencies: {len(inconsistent)}")
print(f"Algorithmic patterns identified: {len(pattern_groups)}")
print(f"Fuzzy-matched pairs (≥85%): {len(fuzzy_pairs)}")

# Save detailed data for the markdown writer
import json
output = {
    'total_problems': len(all_rows),
    'cross_platform': {
        title: list(platforms)
        for title, platforms in sorted(cross_platform.items(), key=lambda x: -len(x[1]))
    },
    'cross_topic': {
        title: info['topics']
        for title, info in sorted(cross_topic.items(), key=lambda x: -len(x[1]['topics']))
    },
    'title_variants': {
        core: list(variants)
        for core, variants in sorted(inconsistent.items(), key=lambda x: -len(x[1]))
    },
    'pattern_groups': {
        p: len(entries)
        for p, entries in sorted(pattern_groups.items(), key=lambda x: -len(x[1]))
    },
    'fuzzy_matches': [
        {'ratio': r, 'a': a[2], 'b': b[2], 'plat_a': a[1], 'plat_b': b[1]}
        for r, a, b in fuzzy_pairs[:100]
    ],
}

os.makedirs(os.path.join(BASE, 'docs'), exist_ok=True)
with open(os.path.join(BASE, 'docs', 'dedup_analysis_data.json'), 'w') as f:
    json.dump(output, f, indent=2, default=str)
print(f"\nData saved to docs/dedup_analysis_data.json")
