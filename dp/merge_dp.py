import csv
import sys
import os

existing_path = '/home/rashid/Project/dsa-mastery/dp/all_dp_problems.csv'

# If file exists, read it
existing_urls = set()
existing_rows = []
if os.path.exists(existing_path):
    with open(existing_path, 'r', newline='') as f:
        reader = csv.reader(f)
        header = next(reader)
        for row in reader:
            if len(row) >= 4:
                existing_urls.add(row[3].strip())
                existing_rows.append(row)
    print(f"Existing: {len(existing_rows)} problems")
else:
    header = ['Platform', 'Category', 'Problem Name', 'URL', 'Difficulty', 'Key Concept']
    print("No existing file, creating new")

# Collect all new entries
new_rows = []
seen_urls_in_batch = set()

# Read from stdin or file - read line by line
def process_csv_text(text):
    global new_rows, seen_urls_in_batch
    lines = text.strip().split('\n')
    for line in lines:
        if not line.strip():
            continue
        # Parse CSV line (simple parser - handles quoted fields)
        parts = []
        current = ''
        in_quotes = False
        for ch in line:
            if ch == '"':
                in_quotes = not in_quotes
            elif ch == ',' and not in_quotes:
                parts.append(current)
                current = ''
            else:
                current += ch
        parts.append(current)
        
        if len(parts) >= 6:
            url = parts[3].strip()
            if url and url not in existing_urls and url not in seen_urls_in_batch:
                # Skip header rows
                if url != 'URL' and parts[0] != 'Platform':
                    new_rows.append(parts)
                    seen_urls_in_batch.add(url)
                    existing_urls.add(url)  # prevent future dups in same batch

# Read all CSV files from dp directory
import glob
for fpath in sorted(glob.glob('/home/rashid/Project/dsa-mastery/dp/round1_*.csv')):
    with open(fpath, 'r') as f:
        process_csv_text(f.read())
    os.remove(fpath)
    print(f"Processed {fpath}")

print(f"New unique: {len(new_rows)}")

# Write merged CSV
with open(existing_path, 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(header)
    for row in existing_rows:
        writer.writerow(row)
    for row in new_rows:
        writer.writerow(row)

total = len(existing_rows) + len(new_rows)
print(f"Total: {total} problems")

# Count by platform
from collections import Counter
all_rows = existing_rows + new_rows
platforms = Counter(row[0] for row in all_rows)
print(f"\nPlatforms ({len(platforms)}):")
for p, c in platforms.most_common():
    print(f"  {p}: {c}")
