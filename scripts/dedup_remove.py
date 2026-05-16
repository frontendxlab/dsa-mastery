"""
Remove duplicate rows from all topic CSVs.
Deduplication strategy (within each CSV file):
  1. Exact URL duplicates — keep first occurrence
  2. Same (platform, normalized_name) — keep first occurrence
Cross-CSV duplicates are intentional (same problem can be in multiple topics).
"""
import csv, os, re
from collections import defaultdict

BASE = '/home/rashid/projects/personal/dsa-inventory'

def norm(t):
    t = re.sub(r'^\d+\.\s*', '', t.strip())
    t = re.sub(r'\s*\((Easy|Medium|Hard)\)\s*$', '', t, flags=re.I)
    t = re.sub(r'[^a-z0-9\s]', '', t.lower())
    return re.sub(r'\s+', ' ', t).strip()

total_removed = 0
total_kept = 0

for root, dirs, files in os.walk(BASE):
    dirs[:] = [d for d in dirs if 'node_modules' not in d and d != '.git']
    for f in files:
        if not (f.startswith('all_') and f.endswith('_problems.csv')):
            continue
        path = os.path.join(root, f)
        with open(path, encoding='utf-8') as fh:
            reader = csv.reader(fh)
            rows = list(reader)

        if not rows:
            continue

        header = rows[0]
        data = rows[1:]

        seen_url = set()
        seen_name = set()
        kept = []
        removed = []

        for row in data:
            if len(row) < 4:
                kept.append(row)
                continue

            url = row[3].strip()
            platform = row[0].strip()
            name_key = (platform, norm(row[2]))

            # Skip empty/placeholder URLs
            if not url or url in ('#', '-', 'N/A', 'n/a'):
                if name_key not in seen_name:
                    seen_name.add(name_key)
                    kept.append(row)
                else:
                    removed.append(row)
                continue

            # Deduplicate by URL first
            if url in seen_url:
                removed.append(row)
                continue

            # Deduplicate by (platform, normalized name)
            if name_key in seen_name:
                removed.append(row)
                continue

            seen_url.add(url)
            seen_name.add(name_key)
            kept.append(row)

        if removed:
            topic = os.path.basename(root)
            print(f"[{topic}/{f}] removed {len(removed)}, kept {len(kept)}")
            for r in removed[:3]:
                print(f"  - [{r[0]}] {r[2][:60]}")
            if len(removed) > 3:
                print(f"  ... and {len(removed)-3} more")

            with open(path, 'w', newline='', encoding='utf-8') as fh:
                writer = csv.writer(fh)
                writer.writerow(header)
                writer.writerows(kept)

        total_removed += len(removed)
        total_kept += len(kept)

print(f"\nTotal: removed {total_removed:,} duplicates, kept {total_kept:,} problems")
