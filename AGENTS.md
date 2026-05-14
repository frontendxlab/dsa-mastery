@RTK.md

## Process & Port Management

- **Never** use `pkill`, `kill $(lsof -ti:port)`, or broad process-kill commands to free ports or stop servers
- If a port is busy, use `--port <different_port>` flag instead of killing the existing process
- To stop a specific process: use `ps aux | grep <process-name>` to find the PID, then `kill <pid>` for that specific pid
- These rules apply unless the user explicitly asks you to forcefully free a port or kill processes

# Fetch DSA Problems Agent Spec

Collect every problem for a given DSA topic from across the web into a deduplicated CSV,
matching the existing `dsa-inventory` repo format.

## CSV Format

```
Platform,Category,Problem Name,URL,Difficulty,Key Concept
```

- **Platform**: LeetCode, Codeforces, GeeksforGeeks, AtCoder, Baekjoon, CSES, SPOJ, UVa, ...
- **Category**: The topic name (e.g. `Sliding Window`, `Dynamic Programming`, `Binary Search`)
- **Difficulty**: Easy / Medium / Hard, or platform-specific (e.g. Gold 4, 1200)
- **Key Concept**: Brief technique descriptor

---

## Phase 1 — Initial Collection (Comprehensive Sweep)

### 0. Setup

```bash
mkdir -p /home/rashid/projects/personal/dsa-inventory/<topic>
```

Read 2–3 existing topic CSVs (e.g. `dp/all_dp_problems.csv`, `graph/all_graph_problems.csv`) to
confirm the exact column format and conventions used.

### 1. LeetCode GraphQL API (primary source)

LeetCode has a public GraphQL endpoint with tag-based problem filtering.

**Query all problems by tag:**

```
POST https://leetcode.com/graphql
Content-Type: application/json

{
  "query": "query getTopicTag($slug: String!) { topicTag(slug: $slug) { problems { questionId title titleSlug difficulty topicTags { name } } } }",
  "variables": { "slug": "<tag-slug>" }
}
```

**Common tag slugs by topic:**

| Topic | Tag Slug(s) |
|---|---|
| sliding_window | `sliding-window`, `two-pointers` |
| dynamic_programming | `dynamic-programming` |
| binary_search | `binary-search` |
| tree | `tree`, `binary-tree`, `binary-search-tree` |
| graph | `graph`, `depth-first-search`, `breadth-first-search` |
| linked_list | `linked-list` |
| backtracking | `backtracking` |
| bit_manipulation | `bit-manipulation` |
| greedy | `greedy` |
| stack | `stack`, `monotonic-stack` |
| heap | `heap-priority-queue` |
| math | `math`, `number-theory` |

**Transform each result:**

```python
question_link = f"https://leetcode.com/problems/{titleSlug}/"
```

**Pagination:** LeetCode returns all problems for a tag in one response (no pagination needed).

**Rate limiting:** Add 100–500ms delay between requests.

### 2. Codeforces

Codeforces organises problems by tags. Two approaches:

**Approach A — Tag page (HTML scrape):**

```
GET https://codeforces.com/problemset?tags=<tag>
```

The tag page lists 50 problems per page with rating, name, and tags. Paginate with `&page=N`.

**Approach B — Codeforces API (recommended):**

```
GET https://codeforces.com/api/problemset.problems?tags=<tag>
```

Returns JSON with all problems for the tag. No pagination. Extract:

```python
for problem in data['result']['problems']:
    if tag in problem['tags']:
        url = f"https://codeforces.com/problemset/problem/{problem['contestId']}/{problem['index']}"
        difficulty = problem.get('rating', 'N/A')
```

**Common tags by topic:**

| Topic | Tag(s) |
|---|---|
| sliding_window | `two-pointers` (no dedicated tag) |
| dynamic_programming | `dp` |
| binary_search | `binary-search` |
| graph | `graphs`, `dfs-and-similar`, `shortest-paths` |
| tree | `trees`, `dfs-and-similar` |
| linked_list | `two-pointers` (no dedicated tag) |
| backtracking | `brute-force`, `meet-in-the-middle` |
| bit_manipulation | `bitmasks` |

### 3. GeeksforGeeks

GFG has thousands of practice problems but no reliable API. Use web search:

```
site:geeksforgeeks.org "<topic>" problem
```

Or scrape GFG topic pages like:

```
https://www.geeksforgeeks.org/tag/<tag>/
https://www.geeksforgeeks.org/dsa/<topic>-problems/
```

**Alternate approach:** Fetch the GFG article that lists all problems for a technique
(e.g. "Top Problems on Sliding Window Technique for Interviews") and extract all linked
problems that match the GFG practice URL pattern `/problems/<slug>/`.

### 4. AtCoder

AtCoder does not have a "sliding window" tag. Use the kenkoooo.com API:

```
GET https://kenkoooo.com/atcoder/resources/problems.json
GET https://kenkoooo.com/atcoder/resources/problem-models.json
```

Search problem titles for keywords: `Subarray`, `Substring`, `Consecutive`, `Window`, `Segment`,
`Contiguous`, `Range`, `Partial`.

Apply additional filtering: problems with difficulty rating that match the topic.

Check if the dedicated category page exists:

```
https://kenkoooo.com/atcoder/#/category/<Topic>
```

### 5. CSES

CSES organises problems by section. Check:

```
https://cses.fi/problemset/
```

Scrape the problem set page, look for sections with matching names. Each problem has a URL like:

```
https://cses.fi/problemset/task/<id>
```

### 6. Baekjoon (acmicpc.net)

Baekjoon is a Korean OJ with a large problem set. Use web search:

```
site:acmicpc.net "<topic keyword>" 문제
```

For sliding window specifically, search `슬라이딩 윈도우` (Korean for sliding window).

Tag search is available at:

```
https://www.acmicpc.net/problemset?sort=ac_desc&tag=<tag_id>
```

Find the tag ID by searching the tag name on Baekjoon.

URL format: `https://www.acmicpc.net/problem/<id>`

### 7. Other Platforms — Web Search

For every remaining platform, use:

```
site:<platform-url> "<topic>" problem
```

**Platform URL patterns:**

| Platform | URL Pattern |
|---|---|
| SPOJ | `https://www.spoj.com/problems/<code>/` |
| UVa / Online Judge | `https://onlinejudge.org/...` |
| Timus | `https://acm.timus.ru/problem.aspx?...` |
| HackerRank | `https://www.hackerrank.com/challenges/<slug>/problem` |
| HackerEarth | `https://www.hackerearth.com/practice/.../<slug>/` |
| CodeChef | `https://www.codechef.com/problems/<code>` |
| Kattis | `https://open.kattis.com/problems/<slug>` |
| TopCoder | `https://community.topcoder.com/stat?c=problem_statement&pm=<id>` |
| Toph | `https://toph.co/p/<slug>` |
| USACO | `http://www.usaco.org/...` |
| LightOJ | `https://lightoj.com/problem/<id>` |
| InterviewBit | `https://www.interviewbit.com/problems/<slug>/` |
| LintCode | `https://www.lintcode.com/problem/<id>/` |
| BinarySearch | `https://binarysearch.com/problems/<slug>` |
| DMOJ | `https://dmoj.ca/problem/<slug>` |
| POJ | `http://poj.org/problem?id=<id>` |
| E-Olymp | `https://www.e-olymp.com/en/problems/<id>` |
| AOJ | `https://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=<id>` |
| Codewars | `https://www.codewars.com/kata/<slug>` |
| CodeAbbey | `https://www.codeabbey.com/index/task_view/<slug>` |

Search for each platform and extract matching problems.

### 8. Curated Problem Lists

Search for curated lists that compile problems for a specific technique:

```
"<topic>" problems list github
"<topic>" interview questions curated
site:github.com "<topic>" problem
```

Check well-known resources:
- NeetCode 150 / Blind 75
- Striver's SDE Sheet (takeUforward)
- Love Babbar DSA Sheet
- Grokking the Coding Interview (Educative)
- AlgoExpert
- Tech Interview Handbook
- GitHub awesome lists (github.com/topics/<topic>)

Extract all linked problems with their URLs, platforms, and difficulties. Reconstruct the full
URL from any relative links.

### 9. Parallel Agent Strategy

Split the work across parallel agents for speed:

```
Agent A: LeetCode (GraphQL) + HackerRank + CodeChef + InterviewBit + LintCode
Agent B: Codeforces + AtCoder + CSES + BinarySearch + TopCoder
Agent C: GeeksforGeeks + Educative + AlgoExpert + Scaler + PrepBytes + Coding Ninjas
Agent D: Baekjoon + POJ + AOJ + DMOJ + E-Olymp + Library Checker
Agent E: SPOJ + UVa + Timus + Kattis + Toph + USACO + LightOJ
Agent F: Project Euler + Codewars + CodeAbbey + CodeSignal + HackerEarth + Pramp + Interview Cake
Agent G: Curated lists (NeetCode, Blind 75, Striver, Grokking, GitHub awesome)
```

Each agent receives:
- The topic name and search keywords
- The CSV column format
- A list of existing URLs (initially empty for phase 1)
- Instructions to output CSV rows (no header)

Run all 7 agents concurrently.

---

## Phase 2 — Gap Analysis & Research Rounds

### 10. Analyse Platform Coverage

After Phase 1, compute platform distribution:

```bash
cut -d',' -f1 <topic>/all_<topic>_problems.csv | sort | uniq -c | sort -rn
```

Identify gaps: platforms with 0–5 problems.

### 11. Round 1 — Target Lightly-Covered Platforms

For each platform with 0–5 problems, launch targeted searches.

**Priority order:** Platforms with 0 problems first, then 1–3, then 4–5.

For Baekjoon (often adds the most), search the Korean tag name.

For each search, use platform-native tags first. If no tag exists, search problem titles
for keywords relevant to the topic (e.g. `Subarray`, `Substring`, `Window`, `Segment`,
`Contiguous`, `Range`, `Partial` for sliding window).

### 12. Round 2 — Deepen Coverage on Major Platforms

For platforms already well-covered but likely holding more:
- **LeetCode**: Re-query with broader related tags. Check recent additions.
- **Codeforces**: Query all problems with the tag, not just the first page.
- **GeeksforGeeks**: Search for additional GFG practice pages.

Also check completely new sources:
- Google KickStart / Code Jam archive
- Facebook Hacker Cup
- ICPC Live Archive
- CodeRun problems
- Interview-specific compilations

### 13. Deduplication

After each phase, deduplicate:

```python
existing_urls = set()
with open(master_csv) as f:
    for row in csv.reader(f):
        existing_urls.add(row[3].strip())

new_urls = set()
unique = []
for row in new_rows:
    url = row[3].strip()
    if url in existing_urls or url in new_urls:
        continue
    new_urls.add(url)
    unique.append(row)
```

**URL normalisation:**
- Strip trailing slashes
- Remove `www.` prefix
- Lowercase the path segment
- Remove tracking parameters (`?`, `#` fragments)

### 14. Platform Name Normalisation

After all rounds, normalise platform names:

```python
normalisations = {
    'CodeWars': 'Codewars',
    'UVA': 'UVa',
    'Platform': None,  # drop
    '': None,  # drop
    'geeksforgeeks': 'GeeksforGeeks',
    'Leetcode': 'LeetCode',
}
```

---

## Single-Shot Recipe (Both Phases Combined)

When you want to do everything in one go:

### Step 1: Setup

```bash
TOPIC="<topic>"
DIR="/home/rashid/projects/personal/dsa-inventory/$TOPIC"
mkdir -p "$DIR"
```

### Step 2: Understand existing conventions

Read 2 existing topic CSVs to understand conventions. Extract the category name used
for the problem category column.

### Step 3: Launch all 7 parallel agents (Phase 1)

Run 7 `general` agents concurrently, each searching different platform groups. Each
writes results to a unique temp file: `/tmp/phase1_{agent}.csv`.

### Step 4: Merge Phase 1 results

Combine all 7 files, deduplicate by URL, append to master CSV.

### Step 5: Read current state

```bash
cut -d',' -f1 "$DIR/all_${TOPIC}_problems.csv" | sort | uniq -c | sort -rn
```

### Step 6: Launch 2 gap-filling agents (Phase 2)

- **Agent A** (Round 1): Target platforms with 0–5 problems
- **Agent B** (Round 2): Deepen coverage on major platforms

Both agents must read the current master CSV and check every URL against it.

### Step 7: Merge Phase 2 results

Combine, deduplicate, normalise, append.

### Step 8: Final normalisation & dedup pass

Read the full master CSV, normalise all platform names, remove any remaining
duplicates by URL, rewrite.

### Step 9: Verify

```bash
wc -l "$DIR/all_${TOPIC}_problems.csv"
cut -d',' -f1 "$DIR/all_${TOPIC}_problems.csv" | sort | uniq -c | sort -rn
```

---

## Tools & Techniques Summary

| Technique | When to Use |
|---|---|
| **GraphQL API** | LeetCode (primary source for any topic) |
| **JSON API** | Codeforces, AtCoder (kenkoooo), CodeChef |
| **HTML scrape** | CSES, Baekjoon, Spoj, Timus, UVa, POJ, TopCoder |
| **Web search** | GeeksforGeeks, HackerRank, HackerEarth, Kattis, Toph, USACO, DMOJ, E-Olymp, AOJ, Codewars |
| **Curated list scrape** | NeetCode, Striver, Grokking, AlgoExpert, GitHub awesome lists |
| **Parallel agents** | Any group of independent platform searches |
| **Topic-specific keywords** | `Subarray`, `Substring`, `Window`, `Consecutive`, `Segment`, `Contiguous`, `Range`, `Partial` for sliding window / subarray topics |

### Per-Platform Tag Mappings

| Topic | LeetCode slug | Codeforces tag | AtCoder keywords | Baekjoon tag (Korean) |
|---|---|---|---|---|
| sliding_window | `sliding-window`, `two-pointers` | `two-pointers` | Subarray, Substring, Window, Consecutive | 슬라이딩 윈도우 |
| dp | `dynamic-programming` | `dp` | DP, Knapsack, Edit | 다이나믹 프로그래밍 |
| binary_search | `binary-search` | `binary-search` | Binary, Search | 이분 탐색 |
| graph | `graph`, `bfs`, `dfs` | `graphs` | Graph, Shortest, MST | 그래프 |
| tree | `tree` | `trees` | Tree, BST, Segment | 트리 |
| linked_list | `linked-list` | N/A | List, Linked | 연결 리스트 |
| backtracking | `backtracking` | `brute-force` | Backtrack, Permutation | 백트래킹 |
| bit_manipulation | `bit-manipulation` | `bitmasks` | Bit, XOR | 비트마스킹 |

### Rate Limiting

- **LeetCode**: 500ms between requests; use `time.sleep(0.5)`
- **Codeforces API**: 200ms between requests (2s minimum if many calls)
- **GFG scrapes**: 1s between requests
- **All web fetches**: 500ms–1s between requests
- **Parallel agents**: No rate limiting between agents (they hit different domains)

### CSV Append (safe pattern)

```python
import csv

# Always read existing first to check for duplicates
existing_urls = set()
with open(master_csv) as f:
    for row in csv.reader(f):
        existing_urls.add(row[3].strip())

# Only append truly new rows
with open(master_csv, 'a', newline='') as f:
    writer = csv.writer(f)
    for row in new_unique_rows:
        writer.writerow(row)
```

---

## Key Lessons from 610 Problem Collection

1. **Always dedup by URL, not by name** — same problem can have different names on different
   platforms, but URLs are unique.

2. **Baekjoon is a goldmine** — Korean OJ with ~25k problems. Search the Korean translation
   of the topic name for best results. Expect 50–100+ additional problems.

3. **LeetCode tag system is best** — GraphQL returns structured data. Query multiple related
   tags to catch problems that use the technique but aren't primarily tagged.

4. **Codeforces uses "two pointers" for sliding window** — No dedicated sliding window tag.
   Filter manually by reading problem names and key concepts.

5. **AtCoder has no tag system** — Use kenkoooo.com API and keyword-filter problem titles.
   Expect ~20–40 problems for most topics.

6. **Platform name inconsistencies** — Normalise at the end: `CodeWars→Codewars`, `UVA→UVa`,
   `Platform→(drop)`, `geeksforgeeks→GeeksforGeeks`.

7. **Phase 2 typically adds 30–50% more problems** — The first sweep misses many problems
   from smaller platforms and Baekjoon. Two dedicated research rounds fill the gaps.

8. **Save temp files to uniquely named paths** — Using the same filename across parallel
   agents causes overwrites. Use `/tmp/phase1_{agent_name}.csv` patterns.

<!-- code-review-graph MCP tools -->
## MCP Tools: code-review-graph

**IMPORTANT: This project has a knowledge graph. ALWAYS use the
code-review-graph MCP tools BEFORE using Grep/Glob/Read to explore
the codebase.** The graph is faster, cheaper (fewer tokens), and gives
you structural context (callers, dependents, test coverage) that file
scanning cannot.

### When to use graph tools FIRST

- **Exploring code**: `semantic_search_nodes` or `query_graph` instead of Grep
- **Understanding impact**: `get_impact_radius` instead of manually tracing imports
- **Code review**: `detect_changes` + `get_review_context` instead of reading entire files
- **Finding relationships**: `query_graph` with callers_of/callees_of/imports_of/tests_for
- **Architecture questions**: `get_architecture_overview` + `list_communities`

Fall back to Grep/Glob/Read **only** when the graph doesn't cover what you need.

### Key Tools

| Tool | Use when |
|------|----------|
| `detect_changes` | Reviewing code changes — gives risk-scored analysis |
| `get_review_context` | Need source snippets for review — token-efficient |
| `get_impact_radius` | Understanding blast radius of a change |
| `get_affected_flows` | Finding which execution paths are impacted |
| `query_graph` | Tracing callers, callees, imports, tests, dependencies |
| `semantic_search_nodes` | Finding functions/classes by name or keyword |
| `get_architecture_overview` | Understanding high-level codebase structure |
| `refactor_tool` | Planning renames, finding dead code |

### Workflow

1. The graph auto-updates on file changes (via hooks).
2. Use `detect_changes` for code review.
3. Use `get_affected_flows` to understand impact.
4. Use `query_graph` pattern="tests_for" to check coverage.
