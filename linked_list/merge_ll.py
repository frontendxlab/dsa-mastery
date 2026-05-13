import csv, os, glob
from collections import Counter

existing_path = '/home/rashid/Project/dsa-mastery/linked_list/all_linked_list_problems.csv'

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

new_rows = []
seen = set()

for fpath in sorted(glob.glob('/home/rashid/Project/dsa-mastery/linked_list/round1_*.csv')):
    with open(fpath, 'r', newline='') as f:
        reader = csv.reader(f)
        for row in reader:
            if len(row) >= 6:
                url = row[3].strip()
                if url and url not in existing_urls and url not in seen:
                    if row[0] != 'Platform' and url != 'URL':
                        new_rows.append(row)
                        seen.add(url)
                        existing_urls.add(url)
    os.remove(fpath)
    print(f"Processed {fpath}")

print(f"New unique: {len(new_rows)}")

with open(existing_path, 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(header)
    for row in existing_rows:
        writer.writerow(row)
    for row in new_rows:
        writer.writerow(row)

all_rows = existing_rows + new_rows
total = len(all_rows)
print(f"Total: {total} problems")

platforms = Counter(row[0] for row in all_rows)
cats = Counter(row[1] for row in all_rows)
print(f"\nPlatforms ({len(platforms)}):")
for p, c in platforms.most_common():
    print(f"  {p}: {c}")
print(f"\nCategories ({len(cats)}):")
for c, n in cats.most_common():
    print(f"  {n:5d}  {c}")
