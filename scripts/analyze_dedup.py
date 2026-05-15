"""
Analyze 38k+ problems for:
1. Same problem across multiple platforms (URL matching)
2. Same problem with different titles (title similarity)
3. Same problem in different categories
4. Different problems with same solution pattern (by Key Concept clustering)
"""

import csv
import os
import re
import json
from collections import defaultdict

BASE = '/home/rashid/projects/personal/dsa-inventory'
CSV_FILES = []
for root, dirs, files in os.walk(BASE):
    for f in files:
        if f.endswith('.csv') and f.startswith('all_') and 'node_modules' not in root:
            CSV_FILES.append(os.path.join(root, f))

def normalize_url(url):
    url = url.strip().rstrip('/')
    url = re.sub(r'^https?://', '', url, flags=re.IGNORECASE)
    url = re.sub(r'^www\.', '', url, flags=re.IGNORECASE)
    url = url.lower()
    url = re.sub(r'\?.*$', '', url)
    url = re.sub(r'#.*$', '', url)
    return url

def normalize_title(title):
    """Normalize problem title for cross-platform matching"""
    t = title.strip()
    # Remove leading numbers like "123. " or "1234. "
    t = re.sub(r'^\d+\.\s*', '', t)
    # Remove parenthetical suffixes like "(Easy)", "(Medium)", "(Hard)"
    t = re.sub(r'\s*\((Easy|Medium|Hard)\)\s*$', '', t, flags=re.IGNORECASE)
    # Remove leading ID patterns like "LeetCode 123: "
    t = re.sub(r'^(LeetCode|LC|CF|CSES|SPOJ|UVa)\s*\d+\s*[:\-–]\s*', '', t, flags=re.IGNORECASE)
    # Lowercase and collapse whitespace
    t = t.lower().strip()
    t = re.sub(r'\s+', ' ', t)
    # Remove common prefixes
    t = re.sub(r'^(problem|task|challenge)\s+', '', t)
    return t

def extract_numeric_id(url):
    """Extract numeric ID from known OJ URLs"""
    m = re.search(r'/problem/(\d+)', url)
    if m: return m.group(1)
    m = re.search(r'space=1&num=(\d+)', url)
    if m: return m.group(1)
    m = re.search(r'/problemset/task/(\d+)', url)
    if m: return m.group(1)
    m = re.search(r'problem\?id=(\d+)', url)
    if m: return m.group(1)
    m = re.search(r'/problem/([A-Z0-9]+)', url)
    if m: return m.group(1)
    m = re.search(r'/problems/([a-z0-9-]+)', url)
    if m: return m.group(1)
    return None

def key_concept_to_canonical(kc):
    """Normalize key concept / solution pattern"""
    kc = kc.lower().strip()
    kc = re.sub(r'\s+', ' ', kc)
    kc = re.sub(r'[^a-z0-9\s]', '', kc)
    
    # Map to canonical solution patterns
    patterns = {
        'fibonacci': ['fibonacci', 'fib', 'climbing stairs', 'climb stairs', 'nth step', 'tribonacci'],
        'knapsack': ['knapsack', '0/1 knapsack', 'unbounded knapsack', 'coin change', 'subset sum'],
        'lcs': ['longest common subsequence', 'edit distance', 'levenshtein', 'shortest common supersequence'],
        'lis': ['longest increasing subsequence', 'lis', 'patience sorting'],
        'two_sum': ['two sum', 'two pointer', '2sum', 'pair sum'],
        'bfs': ['bfs', 'breadth first', 'shortest path', 'level order'],
        'dfs': ['dfs', 'depth first', 'backtracking', 'recursive'],
        'dijkstra': ['dijkstra', 'shortest path weighted', 'single source shortest'],
        'union_find': ['union find', 'dsu', 'disjoint set', 'find union'],
        'segment_tree': ['segment tree', 'range query', 'fenwick', 'bit', 'binary indexed'],
        'binary_search': ['binary search', 'bisect', 'binary search on answer'],
        'sliding_window': ['sliding window', 'two pointer window', 'variable window', 'fixed window'],
        'trie': ['trie', 'prefix tree', 'digital tree'],
        'topological_sort': ['topological', 'topo sort', 'kahn', 'dag'],
        'mst': ['mst', 'minimum spanning', 'kruskal', 'prim'],
        'gcd': ['gcd', 'euclidean', 'hcf', 'greatest common divisor'],
        'dp_1d': ['1d dp', 'linear dp', 'simple dp', 'iterative dp'],
        'tree_dp': ['tree dp', 'dp on tree', 'tree dynamic'],
        'bitmask': ['bitmask', 'bitmask dp', 'bit dp', 'subset dp'],
    }
    
    for canonical, keywords in patterns.items():
        for kw in keywords:
            if kw in kc:
                return canonical
    return None

# ─── Load all data ───────────────────────────────────────────────────────────
all_rows = []  # (topic, platform, category, name, url, difficulty, key_concept)
url_to_rows = defaultdict(list)
title_to_rows = defaultdict(list)
numeric_id_to_rows = defaultdict(list)

for filepath in sorted(CSV_FILES):
    topic = os.path.basename(os.path.dirname(filepath))
    with open(filepath, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        for i, row in enumerate(reader):
            if i == 0: continue  # header
            if len(row) < 6: continue
            platform = row[0].strip()
            category = row[1].strip()
            name = row[2].strip()
            url = row[3].strip()
            difficulty = row[4].strip()
            kc = row[5].strip()
            if not url: continue
            
            norm_url = normalize_url(url)
            norm_title = normalize_title(name)
            numeric_id = extract_numeric_id(url)
            
            entry = (topic, platform, category, name, url, difficulty, kc)
            all_rows.append(entry)
            url_to_rows[norm_url].append(entry)
            title_to_rows[norm_title].append(entry)
            if numeric_id:
                numeric_id_to_rows[numeric_id].append(entry)

print(f"Loaded {len(all_rows)} problems from {len(CSV_FILES)} CSVs")
print(f"Unique URLs: {len(url_to_rows)}")
print(f"Unique normalized titles: {len(title_to_rows)}")
print(f"Unique numeric IDs: {len(numeric_id_to_rows)}")
print()

# ─── 1. Same problem on multiple platforms (by URL) ──────────────────────────
print("=" * 80)
print("SECTION 1: SAME PROBLEM ON MULTIPLE PLATFORMS (by URL match)")
print("=" * 80)
multi_url = {u: r for u, r in url_to_rows.items() if len(r) > 1 and len(set(x[1] for x in r)) > 1}
print(f"Found {len(multi_url)} URLs that appear across multiple platforms")
print()

same_across_platforms = []
for url, entries in sorted(multi_url.items(), key=lambda x: -len(x[1])):
    topics = set(e[0] for e in entries)
    platforms = set(e[1] for e in entries)
    names = set(e[3] for e in entries)
    same_across_platforms.append({
        'url': url,
        'topics': list(topics),
        'platforms': list(platforms),
        'names': list(names),
        'entries': entries
    })

print(f"Top cross-platform matches:")
for item in same_across_platforms[:20]:
    print(f"  URL: {item['url']}")
    print(f"  Name(s): {item['names']}")
    print(f"  Topics: {item['topics']}")
    print(f"  Platforms: {item['platforms']}")
    print()

# ─── 2. Same problem with different titles (by numeric ID) ──────────────────
print("=" * 80)
print("SECTION 2: SAME PROBLEM WITH DIFFERENT TITLES / WORDING")
print("=" * 80)
id_multi = {i: r for i, r in numeric_id_to_rows.items() if len(r) > 1}
print(f"Found {len(id_multi)} numeric IDs shared across entries")
print()

for nid, entries in sorted(id_multi.items(), key=lambda x: -len(x[1]))[:30]:
    names = set(e[3] for e in entries)
    platforms = set(e[1] for e in entries)
    topics = set(e[0] for e in entries)
    if len(names) > 1:
        print(f"  ID: {nid}")
        print(f"  Platforms: {platforms}")
        print(f"  Topics: {topics}")
        for n in sorted(names):
            plat = next(e[1] for e in entries if e[3] == n)
            print(f"    - [{plat}] {n}")
        print()

# ─── 3. Same problem in different categories / topics ────────────────────────
print("=" * 80)
print("SECTION 3: SAME PROBLEM IN DIFFERENT CATEGORIES / TOPICS")
print("=" * 80)
cross_topic = {}
for url, entries in url_to_rows.items():
    if len(entries) > 1:
        topics = set(e[0] for e in entries)
        cats = set(e[2] for e in entries)
        if len(topics) > 1 or len(cats) > 1:
            cross_topic[url] = entries

print(f"Found {len(cross_topic)} URLs that appear in multiple topics/categories")
print()
for url, entries in sorted(cross_topic.items(), key=lambda x: -len(x[1]))[:25]:
    topics_cats = [(e[0], e[2], e[1]) for e in entries]
    print(f"  {entries[0][3]}")
    print(f"  URL: {url}")
    for tc in topics_cats:
        print(f"    → Topic: {tc[0]}, Category: {tc[1]}, Platform: {tc[2]}")
    print()

# ─── 4. Same solution pattern (by Key Concept clustering) ────────────────────
print("=" * 80)
print("SECTION 4: DIFFERENT PROBLEMS WITH SAME SOLUTION PATTERN")
print("=" * 80)

# Group by canonical key concept
concept_groups = defaultdict(list)
for entry in all_rows:
    kc = entry[6]
    canonical = key_concept_to_canonical(kc)
    if canonical:
        concept_groups[canonical].append(entry)

for pattern, entries in sorted(concept_groups.items(), key=lambda x: -len(x[1])):
    if len(entries) < 5: continue
    unique_problems = list(set((e[3].replace(' ',' '), e[4]) for e in entries))
    print(f"Pattern: {pattern}")
    print(f"  Total entries: {len(entries)}, Unique problems: {len(unique_problems)}")
    # Show a few examples with DIFFERENT problem names that share this pattern
    examples = sorted(unique_problems, key=lambda x: x[0])[:6]
    for name, url in examples:
        plat = next((e[1] for e in entries if e[3] == name and e[4] == url), '?')
        print(f"    [{plat}] {name}")
    print()

# ─── 5. Generate document ────────────────────────────────────────────────────
output = {
    'total_problems': len(all_rows),
    'total_csvs': len(CSV_FILES),
    'cross_platform_by_url': len(multi_url),
    'same_problem_different_name': len(id_multi),
    'cross_topic_entries': len(cross_topic),
    'solution_pattern_groups': {k: len(v) for k, v in sorted(concept_groups.items(), key=lambda x: -len(x[1]))},
    'cross_platform_details': [
        {
            'url': item['url'],
            'names': item['names'],
            'platforms': item['platforms'],
            'topics': item['topics']
        }
        for item in same_across_platforms[:50]
    ],
    'different_name_details': list(id_multi.items())[:50],
    'cross_topic_details': [
        {
            'name': entries[0][3],
            'url': url,
            'entries': [(e[0], e[2], e[1]) for e in entries]
        }
        for url, entries in sorted(cross_topic.items(), key=lambda x: -len(x[1]))[:50]
    ],
}

with open('/home/rashid/projects/personal/dsa-inventory/docs/dedup_analysis.json', 'w') as f:
    json.dump(output, f, indent=2, default=str)

print(f"\nFull analysis saved to docs/dedup_analysis.json")
