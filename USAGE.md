# Usage

All problem compilations are stored as CSV files under each topic directory.

## View a CSV
```
read "/home/rashid/Project/dsa-mastery/<topic>/all_<topic>_problems.csv"
```
Replace `<topic>` with `dp`, `bit`, `linked_list`, `tree`, `binary_search`, or `graph`.

## Search across CSVs
```
grep "<pattern>" /home/rashid/Project/dsa-mastery/*/all_*_problems.csv
```
Use any regular expression to find problems by platform, category, etc.

## Add new problems
1. Append a new line to the appropriate `all_<topic>_problems.csv` file.
2. Keep the six columns: **Platform**, **Category**, **Problem Name**, **URL**, **Difficulty**, **Key Concept**.
3. Run the topic’s merge script (e.g., `python3 dp/merge_dp.py`) to deduplicate and re‑generate the master CSV.

## Tools
The repository already includes tool documentation:
- **AGENT.md** – Overview of Repowise, Code Review Graph, RTK.
- **CLAUDE.md** – Detailed usage examples for reading, grepping, and managing CSVs.

These tools are pre‑installed; simply follow the quick‑start commands there.
