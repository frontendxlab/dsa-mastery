# CLAUDE.md

## Claude AI Assistant Instructions for DSA Mastery Repository

### Repository Overview

This is a DSA (Data Structures and Algorithms) problem compilation repository containing **15,757 problems** across 6 major topics:

| Topic | Problems | File |
|-------|----------|------|
| Graph | 1,290 | `graph/all_graph_problems.csv` |
| Dynamic Programming | 4,041 | `dp/all_dp_problems.csv` |
| Bit Manipulation | 2,868 | `bit/all_bit_problems.csv` |
| Linked List | 1,135 | `linked_list/all_linked_list_problems.csv` |
| Tree | 2,714 | `tree/all_tree_problems.csv` |
| Binary Search | 3,709 | `binary_search/all_bs_problems.csv` |

### CSV Format

Each CSV file has the following columns:
- **Platform** - Source platform (LeetCode, Codeforces, AtCoder, etc.)
- **Category** - Problem category/subcategory
- **Problem Name** - Problem title with ID
- **URL** - Direct link to problem statement
- **Difficulty** - Difficulty rating
- **Key Concept** - Brief description of the technique

### Recommended Tools for Navigation

#### 1. Repowise
**Use for:** Understanding repository structure, documentation, and architectural decisions

**Quick Start:**
```bash
pip install repowise
repowise init
repowise serve
```

**Key MCP Tools:**
- `get_overview()` - Get architecture summary and module map
- `get_answer(question)` - Ask questions about the repo
- `get_context(targets)` - Get context for specific files/directories
- `search_codebase(query)` - Semantic search
- `get_risk(targets)` - Assess change impact
- `get_why(query)` - Get architectural decisions

**Example Queries:**
```
"How are the problem CSVs structured?"
"What platforms are included in the graph compilation?"
"Which categories have the most problems in DP?"
```

#### 2. Code Review Graph
**Use for:** Structural analysis, blast radius, minimal context queries

**Quick Start:**
```bash
pip install code-review-graph
code-review-graph install
code-review-graph build
```

**Key MCP Tools:**
- `get_minimal_context_tool()` - Ultra-compact context (~100 tokens)
- `get_impact_radius_tool()` - See what's affected by changes
- `get_review_context_tool()` - Token-optimized review context
- `query_graph_tool()` - Query relationships between files
- `detect_changes_tool()` - Risk-scored change analysis

**Example Usage:**
```
# When modifying a CSV file
detect_changes_tool(["dp/all_dp_problems.csv"])

# Get minimal context for a topic
get_minimal_context_tool(["graph/", "dp/"])

# Query graph structure
query_graph_tool("find callers of merge_dp.py")
```

#### 3. RTK (MCP-RTK)
**Use for:** Compressing MCP tool responses by 60-90%

**Installation:**
```bash
git clone https://github.com/ThomasTartrau/mcp-rtk
cd mcp-rtk
cargo install --path .
```

**Usage:** Configure as MCP proxy in Claude settings to compress responses from other MCP servers.

---

## Working with Problem CSVs

### Reading CSV Files

When you need to read a CSV file, use the `Read` tool:

```python
# Example: Read DP problems
read("/home/rashid/Project/dsa-mastery/dp/all_dp_problems.csv")
```

### Searching for Problems

Use `Grep` to search across CSV files:

```bash
# Find all Codeforces problems
grep "Codeforces" /home/rashid/Project/dsa-mastery/dp/all_dp_problems.csv

# Find specific categories
grep "Tree DP" /home/rashid/Project/dsa-mastery/tree/all_tree_problems.csv
```

### Analyzing Problem Distribution

Use Python to analyze CSV data:

```python
import csv
from collections import Counter

with open('/home/rashid/Project/dsa-mastery/dp/all_dp_problems.csv') as f:
    reader = csv.reader(f)
    next(reader)  # skip header
    categories = Counter(row[1] for row in reader)
    
for cat, count in categories.most_common():
    print(f"{cat}: {count}")
```

---

## Adding New Problems

### Guidelines

1. **Maintain CSV Format:** Ensure all 6 columns are present
2. **Avoid Duplicates:** Check URL uniqueness before adding
3. **Use Canonical Categories:** Use consistent category names
4. **Include Difficulty:** Add difficulty ratings when available
5. **Verify URLs:** Ensure all problem URLs are accessible

### Process

1. Use Repowise to understand existing structure:
   ```
   get_context(["dp/", "graph/"])
   ```

2. Use Code Review Graph to assess impact:
   ```
   detect_changes_tool(["dp/all_dp_problems.csv"])
   ```

3. Add problems using the `Write` tool

4. Update the file and verify no duplicates

---

## Context Optimization

### When Working with Large CSVs

1. **Use Minimal Context:**
   ```
   get_minimal_context_tool(["dp/all_dp_problems.csv"])
   ```

2. **Search Instead of Read:**
   ```
   search_codebase("DP problems with bitmask")
   ```

3. **Use RTK Proxy:** Configure RTK to compress responses

### When Making Changes

1. **Assess Impact First:**
   ```
   get_risk(["dp/all_dp_problems.csv"])
   ```

2. **Check Dependencies:**
   ```
   query_graph_tool("find files that import dp_problems")
   ```

3. **Review Architectural Decisions:**
   ```
   get_why("CSV format")
   ```

---

## Common Tasks

### Task: Find All Problems from a Platform

```bash
grep "Codeforces" /home/rashid/Project/dsa-mastery/*/all_*_problems.csv
```

### Task: Count Problems by Category

```python
import csv
import glob

for csv_file in glob.glob("/home/rashid/Project/dsa-mastery/*/all_*_problems.csv"):
    with open(csv_file) as f:
        reader = csv.reader(f)
        next(reader)
        categories = Counter(row[1] for row in reader)
        print(f"\n{csv_file}:")
        for cat, count in categories.most_common(10):
            print(f"  {cat}: {count}")
```

### Task: Merge Multiple CSVs

Use the merge scripts in each topic directory:
```bash
python3 /home/rashid/Project/dsa-mastery/dp/merge_dp.py
python3 /home/rashid/Project/dsa-mastery/graph/merge_graph.py
```

### Task: Check for Duplicates

```python
import csv

with open('/home/rashid/Project/dsa-mastery/dp/all_dp_problems.csv') as f:
    reader = csv.reader(f)
    next(reader)
    urls = [row[3] for row in reader]
    
duplicates = [url for url, count in Counter(urls).items() if count > 1]
print(f"Found {len(duplicates)} duplicate URLs")
```

---

## MCP Server Configuration

Configure both Repowise and Code Review Graph in your Claude settings:

```json
{
  "mcpServers": {
    "repowise": {
      "command": "repowise",
      "args": ["mcp", "/home/rashid/Project/dsa-mastery"]
    },
    "code-review-graph": {
      "command": "code-review-graph",
      "args": ["serve"]
    }
  }
}
```

---

## Best Practices

1. **Always use context tools first** - `get_overview()`, `get_minimal_context_tool()`
2. **Assess impact before making changes** - `get_risk()`, `detect_changes_tool()`
3. **Search instead of reading entire files** - `search_codebase()`, `query_graph_tool()`
4. **Use RTK for response compression** - Configure as MCP proxy
5. **Keep CSVs updated** - Use incremental updates from Repowise/Code Review Graph
6. **Verify no duplicates** - Check URL uniqueness before adding problems
7. **Maintain consistent categories** - Use canonical category names across all CSVs

---

## Troubleshooting

### Issue: MCP server not responding

**Solution:** Check if the server is running:
```bash
# Repowise
repowise status

# Code Review Graph
code-review-graph status
```

### Issue: Context too large

**Solution:** Use minimal context tools:
```bash
# Repowise
get_context(["file"], include=["source"])

# Code Review Graph
get_minimal_context_tool()
```

### Issue: Slow queries

**Solution:** Use RTK proxy to compress responses, or use semantic search instead of full reads

---

## Additional Resources

- **Repowise Docs:** https://docs.repowise.dev
- **Code Review Graph Docs:** https://github.com/tirth8205/code-review-graph
- **RTK:** https://github.com/ThomasTartrau/mcp-rtk
- **MCP Protocol:** https://modelcontextprotocol.io

<!-- rtk-instructions v2 -->
# RTK (Rust Token Killer) - Token-Optimized Commands

## Golden Rule

**Always prefix commands with `rtk`**. If RTK has a dedicated filter, it uses it. If not, it passes through unchanged. This means RTK is always safe to use.

**Important**: Even in command chains with `&&`, use `rtk`:
```bash
# ❌ Wrong
git add . && git commit -m "msg" && git push

# ✅ Correct
rtk git add . && rtk git commit -m "msg" && rtk git push
```

## RTK Commands by Workflow

### Build & Compile (80-90% savings)
```bash
rtk cargo build         # Cargo build output
rtk cargo check         # Cargo check output
rtk cargo clippy        # Clippy warnings grouped by file (80%)
rtk tsc                 # TypeScript errors grouped by file/code (83%)
rtk lint                # ESLint/Biome violations grouped (84%)
rtk prettier --check    # Files needing format only (70%)
rtk next build          # Next.js build with route metrics (87%)
```

### Test (60-99% savings)
```bash
rtk cargo test          # Cargo test failures only (90%)
rtk go test             # Go test failures only (90%)
rtk jest                # Jest failures only (99.5%)
rtk vitest              # Vitest failures only (99.5%)
rtk playwright test     # Playwright failures only (94%)
rtk pytest              # Python test failures only (90%)
rtk rake test           # Ruby test failures only (90%)
rtk rspec               # RSpec test failures only (60%)
rtk test <cmd>          # Generic test wrapper - failures only
```

### Git (59-80% savings)
```bash
rtk git status          # Compact status
rtk git log             # Compact log (works with all git flags)
rtk git diff            # Compact diff (80%)
rtk git show            # Compact show (80%)
rtk git add             # Ultra-compact confirmations (59%)
rtk git commit          # Ultra-compact confirmations (59%)
rtk git push            # Ultra-compact confirmations
rtk git pull            # Ultra-compact confirmations
rtk git branch          # Compact branch list
rtk git fetch           # Compact fetch
rtk git stash           # Compact stash
rtk git worktree        # Compact worktree
```

Note: Git passthrough works for ALL subcommands, even those not explicitly listed.

### GitHub (26-87% savings)
```bash
rtk gh pr view <num>    # Compact PR view (87%)
rtk gh pr checks        # Compact PR checks (79%)
rtk gh run list         # Compact workflow runs (82%)
rtk gh issue list       # Compact issue list (80%)
rtk gh api              # Compact API responses (26%)
```

### JavaScript/TypeScript Tooling (70-90% savings)
```bash
rtk pnpm list           # Compact dependency tree (70%)
rtk pnpm outdated       # Compact outdated packages (80%)
rtk pnpm install        # Compact install output (90%)
rtk npm run <script>    # Compact npm script output
rtk npx <cmd>           # Compact npx command output
rtk prisma              # Prisma without ASCII art (88%)
```

### Files & Search (60-75% savings)
```bash
rtk ls <path>           # Tree format, compact (65%)
rtk read <file>         # Code reading with filtering (60%)
rtk grep <pattern>      # Search grouped by file (75%)
rtk find <pattern>      # Find grouped by directory (70%)
```

### Analysis & Debug (70-90% savings)
```bash
rtk err <cmd>           # Filter errors only from any command
rtk log <file>          # Deduplicated logs with counts
rtk json <file>         # JSON structure without values
rtk deps                # Dependency overview
rtk env                 # Environment variables compact
rtk summary <cmd>       # Smart summary of command output
rtk diff                # Ultra-compact diffs
```

### Infrastructure (85% savings)
```bash
rtk docker ps           # Compact container list
rtk docker images       # Compact image list
rtk docker logs <c>     # Deduplicated logs
rtk kubectl get         # Compact resource list
rtk kubectl logs        # Deduplicated pod logs
```

### Network (65-70% savings)
```bash
rtk curl <url>          # Compact HTTP responses (70%)
rtk wget <url>          # Compact download output (65%)
```

### Meta Commands
```bash
rtk gain                # View token savings statistics
rtk gain --history      # View command history with savings
rtk discover            # Analyze Claude Code sessions for missed RTK usage
rtk proxy <cmd>         # Run command without filtering (for debugging)
rtk init                # Add RTK instructions to CLAUDE.md
rtk init --global       # Add RTK to ~/.claude/CLAUDE.md
```

## Token Savings Overview

| Category | Commands | Typical Savings |
|----------|----------|-----------------|
| Tests | vitest, playwright, cargo test | 90-99% |
| Build | next, tsc, lint, prettier | 70-87% |
| Git | status, log, diff, add, commit | 59-80% |
| GitHub | gh pr, gh run, gh issue | 26-87% |
| Package Managers | pnpm, npm, npx | 70-90% |
| Files | ls, read, grep, find | 60-75% |
| Infrastructure | docker, kubectl | 85% |
| Network | curl, wget | 65-70% |

Overall average: **60-90% token reduction** on common development operations.
<!-- /rtk-instructions -->

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
