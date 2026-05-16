import csv
import json
import os
import sys
import time
import urllib.request
import urllib.error

LEETCODE_DIR = "/home/rashid/projects/personal/dsa-inventory/leetcode"
CODEFORCES_DIR = "/home/rashid/projects/personal/dsa-inventory/codeforces"
LEETCODE_FILE = os.path.join(LEETCODE_DIR, "all_leetcode_problems.csv")
CODEFORCES_FILE = os.path.join(CODEFORCES_DIR, "all_codeforces_problems.csv")

HEADER = ["Platform", "Category", "Problem Name", "URL", "Difficulty", "Key Concept"]

def ensure_dir(d):
    os.makedirs(d, exist_ok=True)

def write_csv(filepath, rows):
    with open(filepath, 'w', newline='', encoding='utf-8') as f:
        w = csv.writer(f)
        w.writerow(HEADER)
        for r in rows:
            w.writerow(r)
    print(f"  Wrote {len(rows)} rows to {filepath}")

def cf_rating_to_level(rating):
    if rating <= 1200:
        return "Easy"
    elif rating <= 1900:
        return "Medium"
    else:
        return "Hard"

# ========== LEETCODE ==========
def fetch_leetcode():
    print("Fetching LeetCode problems...")
    all_problems = []
    limit = 100
    skip = 0
    total = None
    retries = 0
    max_retries = 3

    query_template = {
        "query": """
        query problemsetQuestionListV2($categorySlug: String, $limit: Int, $skip: Int) {
          problemsetQuestionListV2(
            categorySlug: $categorySlug
            limit: $limit
            skip: $skip
          ) {
            totalLength
            hasMore
            questions {
              questionFrontendId
              title
              titleSlug
              difficulty
              topicTags { name }
            }
          }
        }
        """,
        "variables": {
            "categorySlug": "",
            "limit": limit,
            "skip": skip,
        }
    }

    while True:
        query_template["variables"]["skip"] = skip
        data = json.dumps(query_template).encode()

        req = urllib.request.Request(
            "https://leetcode.com/graphql",
            data=data,
            headers={
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
                "Referer": "https://leetcode.com/problemset/",
            },
        )

        try:
            resp = urllib.request.urlopen(req, timeout=30)
            result = json.loads(resp.read().decode())
            questions_data = result["data"]["problemsetQuestionListV2"]

            if total is None:
                total = questions_data["totalLength"]
                print(f"  Total LeetCode problems: {total}")

            questions = questions_data["questions"]
            has_more = questions_data["hasMore"]
            if not has_more or not questions:
                for q in (questions or []):
                    qid = q["questionFrontendId"]
                    title = q["title"]
                    slug = q["titleSlug"]
                    difficulty = q["difficulty"]
                    tags = [t["name"] for t in q["topicTags"]]
                    url = f"https://leetcode.com/problems/{slug}/"
                    category = tags[0] if tags else "General"
                    key_concept = ", ".join(tags) if tags else "N/A"
                    all_problems.append([
                        "LeetCode", category, f"{qid}. {title}", url, difficulty.capitalize(), key_concept
                    ])
                break

            for q in questions:
                qid = q["questionFrontendId"]
                title = q["title"]
                slug = q["titleSlug"]
                difficulty = q["difficulty"]
                tags = [t["name"] for t in q["topicTags"]]
                url = f"https://leetcode.com/problems/{slug}/"
                category = tags[0] if tags else "General"
                key_concept = ", ".join(tags) if tags else "N/A"
                all_problems.append([
                        "LeetCode", category, f"{qid}. {title}", url, difficulty.capitalize(), key_concept
                    ])
                break
            wait = retries * 2
            print(f"  Error at skip={skip}, retry {retries}/{max_retries} in {wait}s: {e}")
            time.sleep(wait)

    write_csv(LEETCODE_FILE, all_problems)
    return len(all_problems)

# ========== CODEFORCES ==========
def fetch_codeforces():
    print("\nFetching Codeforces problems...")

    url = "https://codeforces.com/api/problemset.problems"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})

    try:
        resp = urllib.request.urlopen(req, timeout=60)
        data = json.loads(resp.read().decode())
    except Exception as e:
        print(f"  Error fetching Codeforces: {e}")
        return 0

    problems = data["result"]["problems"]
    print(f"  Total Codeforces problems: {len(problems)}")

    rows = []
    skipped = 0
    for p in problems:
        contest_id = p.get("contestId")
        index = p.get("index")
        if contest_id is None or index is None:
            skipped += 1
            continue

        name = p["name"]
        tags = p.get("tags", [])
        url = f"https://codeforces.com/problemset/problem/{contest_id}/{index}"
        rating = p.get("rating")

        if rating is not None:
            level = cf_rating_to_level(rating)
            difficulty = f"{level} ({rating})"
        else:
            difficulty = "N/A"

        category = tags[0] if tags else "General"
        key_concept = ", ".join(tags) if tags else "N/A"
        rows.append([
            "Codeforces", category, f"{contest_id}{index}. {name}", url, difficulty, key_concept
        ])

    if skipped:
        print(f"  Skipped {skipped} problems (missing contestId/index)")

    write_csv(CODEFORCES_FILE, rows)
    return len(rows)

if __name__ == "__main__":
    ensure_dir(LEETCODE_DIR)
    ensure_dir(CODEFORCES_DIR)

    lc_count = fetch_leetcode()
    time.sleep(1)
    cf_count = fetch_codeforces()

    print(f"\n=== DONE ===")
    print(f"LeetCode:   {lc_count} problems -> {LEETCODE_FILE}")
    print(f"Codeforces: {cf_count} problems -> {CODEFORCES_FILE}")
    print(f"Total:      {lc_count + cf_count}")
