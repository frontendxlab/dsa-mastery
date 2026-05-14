import csv
import os
import re

BASE = '/home/rashid/projects/personal/dsa-inventory'

NORMALIZATIONS = {
    'CodeWars': 'Codewars',
    'Codeforces': 'Codeforces',
    'Leetcode': 'LeetCode',
    'Leet Code': 'LeetCode',
    'UVA': 'UVa',
    'Uva': 'UVa',
    'Spoj': 'SPOJ',
    'GeeksforGeeks': 'GeeksforGeeks',
    'geeksforgeeks': 'GeeksforGeeks',
    'GfG': 'GeeksforGeeks',
    'Hackerrank': 'HackerRank',
    'Hackerearth': 'HackerEarth',
    'Topcoder': 'TopCoder',
    'TopCoder': 'TopCoder',
    'Codechef': 'CodeChef',
    'Kattis': 'Kattis',
    'Timus': 'Timus',
    'LightOJ': 'LightOJ',
    'Lightoj': 'LightOJ',
    'CodingNinjas': 'Coding Ninjas',
    'Coding Ninjas': 'Coding Ninjas',
    'AlgoExpert': 'AlgoExpert',
    'Interviewbit': 'InterviewBit',
    'LintCode': 'LintCode',
    'Lintcode': 'LintCode',
    'ProjectEuler': 'Project Euler',
    'Project Euler': 'Project Euler',
    'Baeldung': 'Baeldung',
    'PrepBytes': 'PrepBytes',
    'Scaler': 'Scaler',
    'Educative': 'Educative',
    'Pramp': 'Pramp',
    'InterviewCake': 'Interview Cake',
    'Interview Cake': 'Interview Cake',
    'LeetCode Discuss': 'LeetCode Discuss',
    'Techie Delight': 'Techie Delight',
    'HackerBlocks': 'HackerBlocks',
    'CodingBlocks': 'CodingBlocks',
    'CodeSignal': 'CodeSignal',
    'BinarySearch': 'BinarySearch',
    'binarysearch': 'BinarySearch',
    'CodeAbbey': 'CodeAbbey',
    'CP-Algorithms': 'CP-Algorithms',
    'CP Algorithms': 'CP-Algorithms',
    'Toph': 'Toph',
    'DMOJ': 'DMOJ',
    'E-Olymp': 'E-Olymp',
    'Aizu': 'AOJ',
    'AOJ': 'AOJ',
    'POJ': 'POJ',
    'Library Checker': 'Library Checker',
    'Google Kickstart': 'Google Kickstart',
    'TCS CodeVita': 'TCS CodeVita',
    'COCI': 'COCI',
    'CCC': 'CCC',
    'IOI': 'IOI',
    'Olympiad': 'Olympiad',
    'Exercism': 'Exercism',
    'Coding Ninjas': 'Coding Ninjas',
}

INVALID_PLATFORMS = {'', 'Platform', 'N/A'}

def normalize_url(url):
    url = url.strip().rstrip('/')
    url = re.sub(r'^https?://', '', url, flags=re.IGNORECASE)
    url = re.sub(r'^www\.', '', url, flags=re.IGNORECASE)
    url = url.lower()
    url = re.sub(r'\?.*$', '', url)
    url = re.sub(r'#.*$', '', url)
    return url

def clean_file(filepath):
    if not os.path.exists(filepath):
        return 0, 0, 0
    
    rows = []
    seen_urls = set()
    removed_invalid = 0
    removed_dup = 0

    with open(filepath, 'r', newline='') as f:
        reader = csv.reader(f)
        header = None
        for i, row in enumerate(reader):
            if i == 0:
                header = row
                continue
            if len(row) < 4:
                removed_invalid += 1
                continue
            
            platform = row[0].strip()
            name = row[2].strip()
            url = row[3].strip()
            
            if platform in INVALID_PLATFORMS or not url or not name:
                removed_invalid += 1
                continue
            
            if platform in NORMALIZATIONS:
                row[0] = NORMALIZATIONS[platform]
            
            norm_url = normalize_url(url)
            if norm_url in seen_urls:
                removed_dup += 1
                continue
            seen_urls.add(norm_url)
            rows.append(row)

    with open(filepath, 'w', newline='') as f:
        writer = csv.writer(f)
        if header:
            writer.writerow(header)
        for row in rows:
            writer.writerow(row)
    
    return len(rows), removed_invalid, removed_dup

# Find all CSV files
csv_files = []
for root, dirs, files in os.walk(BASE):
    for f in files:
        if f.endswith('.csv') and 'node_modules' not in root:
            csv_files.append(os.path.join(root, f))

total_before = 0
total_after = 0
total_invalid = 0
total_dup = 0

for fp in sorted(csv_files):
    before = sum(1 for _ in open(fp)) - 1  # minus header
    after, inv, dup = clean_file(fp)
    total_before += before
    total_after += after
    total_invalid += inv
    total_dup += dup
    rel = os.path.relpath(fp, BASE)
    if inv or dup:
        print(f"{rel}: {before} -> {after} lines (-{inv} invalid, -{dup} dup)")
    else:
        print(f"{rel}: {after} lines (clean)")

print(f"\n=== FINAL SUMMARY ===")
print(f"Total CSV files: {len(csv_files)}")
print(f"Total rows (before): {total_before}")
print(f"Total rows (after):  {total_after}")
print(f"Invalid removed:     {total_invalid}")
print(f"Duplicates removed:  {total_dup}")
