# AGENT.md

## Repository Navigation Tools

This repository uses specialized tools for efficient codebase navigation and context optimization.

### Recommended Tools

#### 1. Repowise
**Purpose:** Codebase intelligence for AI-assisted engineering teams

**Installation:**
```bash
pip install repowise
repowise init
repowise serve
```

**What it provides:**
- Four intelligence layers: dependency graph, git history, auto-generated documentation, architectural decisions
- Seven MCP tools for querying codebase
- Multi-repo workspace support
- Auto-sync hooks for keeping intelligence current
- 27× fewer tokens per query, 36% cheaper

**Key MCP Tools:**
- `get_overview()` - Architecture summary, module map, entry points
- `get_answer(question)` - One-call RAG over the wiki
- `get_context(targets, include?)` - Docs, symbols, ownership, freshness for targets
- `search_codebase(query)` - Semantic search over wiki
- `get_risk(targets?, changed_files?)` - Hotspot scores, dependents, blast radius
- `get_why(query?)` - Architectural decisions
- `get_dead_code(min_confidence?, include_internals?)` - Unused code detection

**Usage:**
```bash
# Initialize for this repo
cd /home/rashid/Project/dsa-mastery
repowise init

# Start MCP server
repowise serve

# Query from terminal
repowise query "How are the problem CSVs structured?"
```

#### 2. Code Review Graph
**Purpose:** Local knowledge graph for Claude Code

**Installation:**
```bash
pip install code-review-graph
code-review-graph install
code-review-graph build
```

**What it provides:**
- Persistent map of codebase with Tree-sitter parsing
- 6.8× fewer tokens on reviews, up to 49× on daily coding tasks
- Blast-radius analysis for change impact
- Incremental updates in < 2 seconds
- 24 languages + Jupyter notebooks
- 28 MCP tools

**Key MCP Tools:**
- `build_or_update_graph_tool` - Build or update graph
- `get_minimal_context_tool` - Ultra-compact context (~100 tokens)
- `get_impact_radius_tool` - Blast radius of changed files
- `get_review_context_tool` - Token-optimized review context
- `query_graph_tool` - Callers, callees, tests, imports
- `traverse_graph_tool` - BFS/DFS traversal with token budget
- `semantic_search_nodes_tool` - Search by name or meaning
- `detect_changes_tool` - Risk-scored change impact analysis

**Usage:**
```bash
# Build graph for this repo
code-review-graph build

# Update on changes (automatic via hooks)
code-review-graph update

# Visualize graph
code-review-graph visualize
```

#### 3. RTK (MCP-RTK)
**Purpose:** Token-optimizing MCP proxy

**Installation:**
```bash
# Install from source
git clone https://github.com/ThomasTartrau/mcp-rtk
cd mcp-rtk
cargo install --path .
```

**What it provides:**
- Compresses tool responses by 60-90%
- 8-stage filter pipeline
- RTK-style prompt injection prevention
- Sits between Claude and any MCP server

**Usage:**
Configure as MCP proxy in your Claude settings to compress responses from other MCP servers.

#### 4. Cavemen
**Note:** No specific tool found with this name. This may refer to:
- A context optimization technique (primitive/simple approach)
- A fictional tool name
- A tool under development

**Alternative for context optimization:**
- Use Repowise's incremental updates
- Use Code Review Graph's minimal context tool
- Use RTK for response compression

---

## Repository Structure

This repository contains DSA problem compilations organized by topic:

```
dsa-mastery/
├── graph/              # Graph algorithms (1290 problems)
├── dp/                  # Dynamic Programming (4041 problems)
├── bit/                 # Bit Manipulation (2868 problems)
├── linked_list/         # Linked List (1135 problems)
├── tree/                # Tree (2714 problems)
├── binary_search/       # Binary Search (3709 problems)
└── shape/               # Geometric problems
```

Each topic directory contains:
- `all_{topic}_problems.csv` - Master CSV with all problems
- Platform, Category, Problem Name, URL, Difficulty, Key Concept

---

## Recommended Workflow

### For AI Agents Working on This Repo

1. **Initial Setup:**
   ```bash
   # Install Repowise
   pip install repowise
   repowise init
   repowise serve
   
   # Install Code Review Graph
   pip install code-review-graph
   code-review-graph install
   code-review-graph build
   ```

2. **When Adding New Problems:**
   - Use Repowise's `get_context()` to understand existing CSV structure
   - Use Code Review Graph's `detect_changes_tool` to assess impact
   - Use `get_risk()` to identify dependencies

3. **When Reviewing Changes:**
   - Use Repowise's `get_overview()` for architecture summary
   - Use Code Review Graph's `get_review_context_tool` for minimal context
   - Use `get_why()` to understand architectural decisions

4. **Context Optimization:**
   - Use Repowise's incremental updates (sub-30s per commit)
   - Use Code Review Graph's `get_minimal_context_tool` for ultra-compact queries
   - Use RTK as MCP proxy to compress responses

---

## MCP Configuration

Both Repowise and Code Review Graph expose MCP servers. Configure them in your Claude settings:

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

## Quick Reference

| Task | Tool | Command |
|------|------|---------|
| Get repo overview | Repowise | `get_overview()` |
| Ask a question | Repowise | `get_answer("question")` |
| Get context for files | Repowise | `get_context(["file1", "file2"])` |
| Search codebase | Repowise | `search_codebase("query")` |
| Assess change risk | Repowise | `get_risk(["file"])` |
| Get architectural decisions | Repowise | `get_why("topic")` |
| Find dead code | Repowise | `get_dead_code()` |
| Build graph | Code Review Graph | `build_or_update_graph_tool` |
| Get minimal context | Code Review Graph | `get_minimal_context_tool` |
| Get impact radius | Code Review Graph | `get_impact_radius_tool` |
| Query graph | Code Review Graph | `query_graph_tool` |
| Detect changes | Code Review Graph | `detect_changes_tool` |
| Compress responses | RTK | Configure as MCP proxy |

---

## Notes

- Both Repowise and Code Review Graph are self-hosted and open source
- Repowise focuses on documentation and decision intelligence
- Code Review Graph focuses on structural analysis and blast radius
- Use both together for comprehensive codebase understanding
- RTK can be used as a proxy to compress responses from either tool