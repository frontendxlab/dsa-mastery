"""
Final dedup analysis — focused on actionable findings, filtering false positives.
"""
import csv, os, re, json
from collections import defaultdict

BASE = '/home/rashid/projects/personal/dsa-inventory'

def load():
    rows = []
    for root, dirs, files in os.walk(BASE):
        for f in files:
            if not (f.startswith('all_') and f.endswith('_problems.csv')): continue
            if 'node_modules' in root: continue
            t = os.path.basename(root)
            with open(os.path.join(root, f), encoding='utf-8') as fh:
                for i, row in enumerate(csv.reader(fh)):
                    if i == 0 or len(row) < 6: continue
                    rows.append({'topic': t, 'platform': row[0].strip(), 'category': row[1].strip(),
                                 'name': row[2].strip(), 'url': row[3].strip(),
                                 'difficulty': row[4].strip(), 'key_concept': row[5].strip()})
    return rows

def norm(t):
    t = re.sub(r'^\d+\.\s*', '', t.strip())
    t = re.sub(r'^\w+\s+\d+[\s\-:–]+', '', t)
    t = re.sub(r'\s*\((Easy|Medium|Hard)\)\s*$', '', t, flags=re.I)
    t = re.sub(r'[^a-z0-9\s]', '', t.lower())
    return re.sub(r'\s+', ' ', t).strip()

# Generic names that produce false cross-platform matches
GENERIC = {'triangle', 'matrix', 'square', 'rectangle', 'stars', 'polygon', 'gcd', 'lcm',
           'factorial', 'permutations', 'combinations', 'binary', 'array', 'string',
           'number', 'numbers', 'sum', 'maximum', 'minimum', 'range', 'query', 'queries',
           'segment', 'tree', 'graph', 'sort', 'search', 'count', 'pair', 'pairs',
           'distance', 'area', 'angle', 'line', 'point', 'circle', 'grid'}

rows = load()
for r in rows: r['n'] = norm(r['name'])

# ── Aggregate ────────────────────────────────────────────────────────────────
by_n = defaultdict(list)
for r in rows: by_n[r['n']].append(r)

# 1. CROSS-PLATFORM (filtered: ignore generic single-word names)
cross = {}
for title, entries in by_n.items():
    plats = set(e['platform'] for e in entries)
    if len(plats) > 1 and title not in GENERIC and len(title) > 3:
        cross[title] = entries

# Sort: most platforms first, then highest total entries
def score(item):
    t, entries = item
    return (len(set(e['platform'] for e in entries)), len(entries))
cross_sorted = sorted(cross.items(), key=score, reverse=True)

# 2. MULTI-TOPIC (per-platform, not just normalized title)
multi_topic = {}
for title, entries in by_n.items():
    if title in GENERIC and len(title) <= 3: continue
    # Group by platform to find per-platform multi-topic
    by_plat = defaultdict(list)
    for e in entries: by_plat[e['platform']].append(e)
    for plat, pentries in by_plat.items():
        topics = set(e['topic'] for e in pentries)
        if len(topics) >= 2:
            key = (plat, title)
            if key not in multi_topic:
                multi_topic[key] = []
            multi_topic[key].extend(pentries)

# 3. LEETCODE ID MISMATCHES (same ID → different titles across CSVs)
lc_id = re.compile(r'^(\d+)\.\s*(.*)')
lc_by_id = defaultdict(list)
for r in rows:
    m = lc_id.match(r['name'])
    if m: lc_by_id[(m.group(1), r['platform'])].append((m.group(2), r['topic']))

lc_conflicts = defaultdict(lambda: {'titles': set(), 'topics': set(), 'platforms': set()})
for (pid, plat), entries in lc_by_id.items():
    titles = set(e[0] for e in entries)
    topics = set(e[1] for e in entries)
    if len(titles) > 1 or len(topics) > 1:
        lc_conflicts[pid]['titles'].update(titles)
        lc_conflicts[pid]['topics'].update(topics)
        lc_conflicts[pid]['platforms'].add(plat)

# 4. PROBLEMS THAT ARE COLLECTION ERRORS (same name in wildly different topics)
# A single problem filed under 5+ different categories on the same platform
collection_errors = []
for (plat, title), entries in multi_topic.items():
    if len(set(e['topic'] for e in entries)) >= 5:
        collection_errors.append((plat, title, list(set(e['topic'] for e in entries)),
                                   list(set(e['category'] for e in entries)),
                                   entries[0]['name']))
collection_errors.sort(key=lambda x: -len(x[2]))

# 5. SAME PLATFORM + SAME NAME → DIFFERENT URLs (should be same problem)
url_mismatches = []
for title, entries in by_n.items():
    url_groups = defaultdict(list)
    for e in entries:
        url_groups[(e['platform'], e['name'])].append(e['url'])
    for (plat, name), urls in url_groups.items():
        if len(set(urls)) > 1:
            url_mismatches.append((plat, name, list(set(urls))))
url_mismatches.sort(key=lambda x: -len(x[2]))

# 6. SOLUTION PATTERNS
PATTERNS = [
    ('Fibonacci DP', ['fibonacci', 'tribonacci', 'climbing stairs', 'nth step']),
    ('Knapsack DP', ['knapsack', 'coin change', 'subset sum', 'target sum', 'partition equal']),
    ('LCS / Edit Distance', ['longest common subsequence', 'edit distance', 'levenshtein', 'lcs']),
    ('LIS', ['longest increasing subsequence', 'lis', 'russian doll']),
    ('Two Pointers', ['two pointer', 'two sum', '3sum', 'container with most water']),
    ('Sliding Window', ['sliding window', 'fixed-size window', 'variable-size window']),
    ('BFS', ['bfs', 'breadth first', 'breadth-first', 'level order traversal']),
    ('DFS / Backtracking', ['dfs', 'depth first', 'depth-first', 'backtracking']),
    ('Dijkstra', ['dijkstra', 'shortest path weighted', 'network delay']),
    ('Union Find / DSU', ['union find', 'dsu', 'disjoint set']),
    ('Segment Tree / Fenwick', ['segment tree', 'fenwick', 'binary indexed', 'range query', 'rmq']),
    ('Binary Search (on answer)', ['binary search on answer', 'bs on answer', 'capacity to ship', 'koko eating']),
    ('Trie', ['trie', 'prefix tree', 'autocomplete', 'word dictionary']),
    ('Topological Sort', ['topological', 'topo sort', 'kahn', 'course schedule']),
    ('MST', ['mst', 'minimum spanning', 'kruskal', 'prim']),
    ('Bitmask DP', ['bitmask dp', 'bit dp', 'subset dp', 'dp with bitmask']),
    ('Tree DP', ['tree dp', 'dp on tree', 'tree diameter']),
    ('GCD / Euclidean', ['gcd', 'euclidean', 'hcf']),
    ('Matrix Exponentiation', ['matrix exponentiation', 'matrix power', 'linear recurrence matrix']),
]
patterns = defaultdict(list)
for r in rows:
    kc = r['key_concept'].lower()
    for pn, kw_list in PATTERNS:
        for kw in kw_list:
            if kw in kc: patterns[pn].append(r); break

# ── BUILD DOCUMENT ───────────────────────────────────────────────────────────
L = []
def w(s=""): L.append(s)
def h1(s): w(f"\n# {s}\n")
def h2(s): w(f"\n## {s}\n")

h1("Deduplication & Cross-Reference Analysis — Final")
w(f"**{len(rows):,} problems** across 23 topic CSVs, 50+ platforms.\n")
w("_Earlier versions: `dedup_analysis.md`, `dedup_analysis_precise.md`_\n---\n")

# ────── 1. CROSS-PLATFORM DUPLICATES ─────────────────────────────────────────
h2("1. Cross-Platform Duplicates (same problem on different OJs)")
w(f"**{len(cross):,} problems** found on 2+ platforms (filtered for generic names).\n")

w("| # | Problem | Platforms | Topics | Entry Count |")
w("|---|---------|----------|--------|------------|")
for i, (title, entries) in enumerate(cross_sorted[:30], 1):
    plats = sorted(set(e['platform'] for e in entries))
    tops = sorted(set(e['topic'] for e in entries))
    names = sorted(set(e['name'] for e in entries))
    primary = names[0][:60]
    w(f"| {i} | {primary} | {len(plats)} | {', '.join(tops[:4])} | {len(entries)} |")
w(f"\n_Top duplicated: {cross_sorted[0][0][:60]} on {len(set(e['platform'] for e in cross_sorted[0][1]))} platforms_\n")

# Most duplicated top 5 detail
h2("### Top 5 Most Cross-Listed Problems")
for title, entries in cross_sorted[:5]:
    plats = sorted(set(e['platform'] for e in entries))
    tops = sorted(set(e['topic'] for e in entries))
    names = sorted(set(e['name'] for e in entries))
    w(f"\n**{names[0]}**")
    w(f"- Platforms ({len(plats)}): {', '.join(plats)}")
    w(f"- Topics ({len(tops)}): {', '.join(tops)}")
    if len(names) > 1:
        w("- Name variants: " + ', '.join('"' + n + '"' for n in names[:4]))

# ────── 2. TITLE INCONSISTENCIES ─────────────────────────────────────────────
h2("2. Title & Naming Inconsistencies")

# LeetCode ID mismatches
h2("### 2a. Same LeetCode ID → Different Titles (collection errors)")
w("Problems where the same LeetCode problem ID maps to different title strings across CSVs — likely copy-paste errors during collection.\n")

lc_list = sorted(lc_conflicts.items(), key=lambda x: -len(x[1]['topics']))
w(f"| LeetCode # | Title Variants | Filed In Topics |")
w(f"|-----------|---------------|----------------|")
for pid, info in lc_list[:25]:
    titles = list(info['titles'])[:3]
    topics = ', '.join(list(info['topics'])[:5])
    w(f"| {pid} | {' / '.join(t[:40] for t in titles)} | {topics} |")

# Same core title with different LeetCode IDs
h2("### 2b. Same Problem → Different LeetCode IDs")
w("The same core problem appears with 2+ different LeetCode problem numbers — one is likely wrong.\n")

# Find by core title  
core_lc = defaultdict(lambda: {'ids': set(), 'names': set(), 'topics': set()})
for r in rows:
    m = lc_id.match(r['name'])
    if not m: continue
    core = norm(m.group(2))
    core_lc[core]['ids'].add(m.group(1))
    core_lc[core]['names'].add(r['name'])
    core_lc[core]['topics'].update([r['topic']])

id_mismatches = {k: v for k, v in core_lc.items() if len(v['ids']) >= 2 and len(k) > 3}
w(f"| Problem | LeetCode IDs | Filed In |")
w(f"|---------|------------|----------|")
for core, info in sorted(id_mismatches.items(), key=lambda x: -len(x[1]['ids']))[:20]:
    ids = ', '.join(sorted(info['ids'], key=int))
    ts = ', '.join(sorted(info['topics'])[:4])
    name = list(info['names'])[0][:50]
    w(f"| {name} | {ids} | {ts} |")

# ────── 3. COLLECTION ERRORS ────────────────────────────────────────────────
h2("3. Potential Collection Errors (one problem → many unrelated topics)")
w(f"Problems that appear in 5+ different topic CSVs on the same platform — likely swept in by a broad tag.\n")

w(f"| Platform | Problem | Topics Filed Under |")
w(f"|----------|---------|-------------------|")
for plat, title, topics, cats, name in collection_errors[:20]:
    w(f"| {plat} | {name[:55]} | {', '.join(topics)} |")

w("\n### Notable over-classified examples:\n")
big_errors = [x for x in collection_errors if len(x[2]) >= 10]
for plat, title, topics, cats, name in big_errors[:5]:
    w(f"- **{name[:60]}** (on {plat}): filed under **{len(topics)} topics** — {', '.join(topics)}")

# ────── 4. SOLUTION PATTERNS ─────────────────────────────────────────────────
h2("4. Same Solution Pattern — Different Problems")
w("Problems grouped by shared algorithmic technique:\n")
for pn, entries in sorted(patterns.items(), key=lambda x: -len(x[1])):
    if len(entries) < 3: continue
    unique = {}
    for e in entries: unique[(e['platform'], e['name'])] = e
    names_list = list(unique.keys())[:6]
    examples = ', '.join(f'[{p}] {n[:45]}' for p, n in names_list)
    w(f"- **{pn}**: {len(unique)} unique problems")
    w(f"  - {examples}")

# Classic equivalence pairs
h2("### Classic Algorithmic Equivalence Pairs")
pairs = [
    ("70. Climbing Stairs", "1137. N-th Tribonacci Number", "Fibonacci DP",
     "Same 1D DP recurrence fib(n) = fib(n-1) + fib(n-2). Just different base cases and number of terms."),
    ("322. Coin Change", "416. Partition Equal Subset Sum", "Knapsack DP",
     "Both ask: can we reach a target sum using given numbers? One minimizes count, other checks feasibility."),
    ("300. Longest Increasing Subsequence", "354. Russian Doll Envelopes", "LIS",
     "Russian Doll is LIS in 2D — sort by width, then find LIS on height."),
    ("875. Koko Eating Bananas", "1011. Capacity To Ship Packages Within D Days", "Binary Search on Answer",
     "Same feasibility-check pattern: binary search the rate/capacity, greedily verify."),
    ("207. Course Schedule", "210. Course Schedule II", "Topological Sort",
     "Same dependency graph. One just checks if acyclic, the other builds the order."),
    ("1. Two Sum", "15. 3Sum", "Two Pointers",
     "3Sum = Two Sum + one more loop. Sorting + two-pointer reduces O(n³) to O(n²)."),
    ("208. Implement Trie", "211. Design Add and Search Words", "Trie",
     "Same prefix tree — second adds wildcard '.' matching on search."),
    ("200. Number of Islands", "695. Max Area of Island", "BFS/DFS",
     "Same grid traversal. One counts components, other tracks component size."),
    ("743. Network Delay Time", "1514. Path with Maximum Probability", "Dijkstra",
     "Both Dijkstra on directed graph. One minimizes sum, other maximizes product (log transform)."),
    ("307. Range Sum Query", "315. Count of Smaller Numbers After Self", "Fenwick Tree",
     "Same BIT structure. Range query vs inversion count — just different traversal order."),
    ("46. Permutations", "51. N-Queens", "DFS / Backtracking",
     "Same backtracking template: place, recurse, un-place. Different pruning logic."),
    ("3. Longest Substring Without Repeating", "209. Minimum Size Subarray Sum", "Sliding Window",
     "Variable window expanding right, shrinking left. Different shrink conditions."),
]
for p1, p2, pattern, why in pairs:
    w(f"\n- **{p1}** ≈ **{p2}**")
    w(f"  - Pattern: {pattern}")
    w(f"  - Why: {why}")

# ────── 5. STATISTICS ───────────────────────────────────────────────────────
h2("5. Data Quality Statistics")

# Per-platform multi-topic rate
w("### Platforms with highest multi-topic rate (same problem → many topic CSVs)\n")
plat_mt = defaultdict(lambda: {'total': 0, 'multi': 0})
for title, entries in by_n.items():
    for e in entries:
        plat_mt[e['platform']]['total'] += 1
for (plat, title), entries in multi_topic.items():
    plat_mt[plat]['multi'] += len(entries)

w("| Platform | Total Problems | Multi-Topic Entries | % Overlap |")
w("|----------|---------------|-------------------|-----------|")
for plat, info in sorted(plat_mt.items(), key=lambda x: -x[1]['multi']):
    pct = info['multi'] / info['total'] * 100 if info['total'] > 0 else 0
    if info['multi'] > 100:
        w(f"| {plat} | {info['total']:,} | {info['multi']:,} | {pct:.0f}% |")

w("\n### Cross-platform summary\n")
w(f"- **{len(cross):,}** problems on 2+ different platforms (after filtering noise)")
w(f"- **{len(multi_topic):,}** records are the same problem filed under multiple topic CSVs")
w(f"- **{len(lc_conflicts):,}** LeetCode IDs have title conflicts across CSVs")
w(f"- **{len(id_mismatches):,}** problems have 2+ different LeetCode ID numbers assigned")
w(f"- **{len(collection_errors):,}** problem+topic groups are likely over-classified (5+ topics)")
w(f"- **{len(patterns):}** algorithmic patterns identified covering key concepts\n")

w("### Top platforms by duplicate/internal overlap:\n")
total_unique = defaultdict(lambda: {'problems': set(), 'records': 0})
for r in rows:
    total_unique[r['platform']]['problems'].add((r['platform'], r['name']))
    total_unique[r['platform']]['records'] += 1
for plat, info in sorted(total_unique.items(), key=lambda x: -x[1]['records'])[:10]:
    w(f"- {plat}: {info['records']:,} entries → {len(info['problems']):,} unique ({(1-len(info['problems'])/info['records'])*100:.0f}% duplicate)")
w()

# ── Write files ─────────────────────────────────────────────────────────────
out = os.path.join(BASE, 'docs', 'dedup_analysis_final.md')
with open(out, 'w') as f: f.write('\n'.join(L))
print(f"Written: {out}")

# Also update the old reference with a redirect note + save data
data = {
    'total': len(rows), 'cross_platform': len(cross), 'multi_topic': len(multi_topic),
    'lc_conflicts': len(lc_conflicts), 'id_mismatches': len(id_mismatches),
    'collection_errors': len(collection_errors), 'patterns': len(patterns),
    'cross_platform_top': [
        {'name': sorted(set(e['name'] for e in entries))[0][:60],
         'platforms': sorted(set(e['platform'] for e in entries)),
         'topics': sorted(set(e['topic'] for e in entries)),
         'count': len(entries)}
        for title, entries in cross_sorted[:50]
    ],
    'lc_id_conflicts': [
        {'id': pid, 'titles': list(info['titles'])[:5], 'topics': list(info['topics'])}
        for pid, info in lc_list[:50]
    ],
    'collection_errors': [
        {'platform': x[0], 'name': x[4][:60], 'topics': x[2]}
        for x in collection_errors[:50]
    ],
}
with open(os.path.join(BASE, 'docs', 'dedup_analysis_final.json'), 'w') as f:
    json.dump(data, f, indent=2, default=str)
print(f"Data: docs/dedup_analysis_final.json")
