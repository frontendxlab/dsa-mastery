import json
import copy
import os

FILES = [
    "/home/rashid/projects/personal/dsa-inventory/public/data/geometry-book/introduction-to-shapes.json",
    "/home/rashid/projects/personal/dsa-inventory/public/data/geometry-book/basic-geometry.json",
    "/home/rashid/projects/personal/dsa-inventory/public/data/geometry-book/triangle-problems.json",
    "/home/rashid/projects/personal/dsa-inventory/public/data/geometry-book/right-triangle-problems.json",
    "/home/rashid/projects/personal/dsa-inventory/public/data/geometry-book/rectangle-and-square-problems.json",
]

LANG_ORDER = ["python", "cpp", "java", "javascript"]

# ──────────────────────────────────────────────
# TRANSLATION MAPS
# Each key is a (file_basename, lang_of_existing, concept_index_or_text_identifier) -> list of {lang, code}
# But that's too complex. Instead, we'll process the blocks programmatically.
# We handle each group by generating translations inline in the processing function.
# ──────────────────────────────────────────────

def find_code_groups(blocks):
    """Find groups of consecutive code blocks with truthy lang."""
    groups = []
    i = 0
    while i < len(blocks):
        if blocks[i]["type"] == "code" and blocks[i].get("lang"):
            group_start = i
            while i < len(blocks) and blocks[i]["type"] == "code" and blocks[i].get("lang"):
                i += 1
            groups.append((group_start, i))
        else:
            i += 1
    return groups


def translate_code(code_text, from_lang, to_lang, concept_hint=""):
    """Translate code from one language to another.
    
    For simple/trivial code, we can do regex-based translation.
    For complex code, we provide pre-written translations.
    This function returns None if it can't auto-translate, meaning
    we'll need to handle it in the main processing.
    """
    return None  # We'll handle everything manually


def make_block(lang, code, caption=None):
    return {"type": "code", "lang": lang, "code": code, "caption": caption}


def insert_after_group(blocks, group_end, new_blocks):
    """Insert new_blocks right after group_end (the end index of the group)."""
    for idx, nb in enumerate(new_blocks):
        blocks.insert(group_end + idx, nb)
    return len(new_blocks)  # number of blocks inserted


# ──────────────────────────────────────────────
# MAIN PROCESSING
# ──────────────────────────────────────────────

def process_file(filepath):
    with open(filepath) as f:
        data = json.load(f)
    
    blocks = data["blocks"]
    groups = find_code_groups(blocks)
    
    total_inserted = 0
    
    # Process groups from right to left to preserve indices
    for group_start, group_end in reversed(groups):
        group = blocks[group_start:group_end]
        existing_langs = {b["lang"] for b in group if b.get("lang")}
        missing_langs = [l for l in LANG_ORDER if l not in existing_langs]
        
        if not missing_langs:
            continue
        
        # Find what the group represents by looking at surrounding context
        # (heading before, etc.)
        context_text = ""
        for lookback in range(max(0, group_start - 5), group_start):
            b = blocks[lookback]
            if b["type"] == "heading":
                context_text = b.get("text", "")
                break
            elif b["type"] == "text":
                context_text = b.get("content", "")
        
        # Generate translations for missing languages
        new_blocks = []
        
        # Python is usually first. Find the python block or first block to base translations on.
        source_block = None
        for b in group:
            if b["lang"] == "python":
                source_block = b
                break
        if not source_block:
            source_block = group[0]
        
        source_code = source_block["code"]
        source_lang = source_block["lang"]
        
        for ml in missing_langs:
            translation = smart_translate(source_code, source_lang, ml, context_text, filepath)
            if translation:
                new_blocks.append(make_block(ml, translation))
        
        if new_blocks:
            insert_after_group(blocks, group_end, new_blocks)
            total_inserted += len(new_blocks)
    
    data["blocks"] = blocks
    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2)
    
    basename = os.path.basename(filepath)
    print(f"{basename}: inserted {total_inserted} new code blocks")
    return total_inserted


# ──────────────────────────────────────────────
# SMART TRANSLATION ENGINE
# ──────────────────────────────────────────────

def smart_translate(code, from_lang, to_lang, context, filepath):
    """Translate code from one language to another using hardcoded translations."""
    
    basename = os.path.basename(filepath)
    
    # A massive dictionary of hardcoded translations keyed by (basename, to_lang, source_code_hash)
    # We match by source code content.
    
    # Trim trailing whitespace for matching
    code_stripped = code.strip()
    
    # ── introduction-to-shapes.json ──
    if basename == "introduction-to-shapes.json":
        return translate_intro_shapes(code_stripped, from_lang, to_lang, context)
    
    # ── basic-geometry.json ──
    elif basename == "basic-geometry.json":
        return translate_basic_geom(code_stripped, from_lang, to_lang, context)
    
    # ── triangle-problems.json ──
    elif basename == "triangle-problems.json":
        return translate_triangle(code_stripped, from_lang, to_lang, context)
    
    # ── right-triangle-problems.json ──
    elif basename == "right-triangle-problems.json":
        return translate_right_triangle(code_stripped, from_lang, to_lang, context)
    
    # ── rectangle-and-square-problems.json ──
    elif basename == "rectangle-and-square-problems.json":
        return translate_rect_square(code_stripped, from_lang, to_lang, context)
    
    return None


# Each chapter's translations live in separate functions for maintainability

def translate_intro_shapes(code, from_lang, to_lang, context):
    
    # ── Template 1: Grid BFS/DFS (python exists, need javascript) ──
    if "get_cells" in code and "find_shapes" in code and "stack" in code and "grid" in code:
        if to_lang == "javascript":
            return """function getCells(grid, r, c, visited) {
    const m = grid.length, n = grid[0].length;
    const stack = [[r, c]];
    visited[r][c] = true;
    const cells = [];
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    while (stack.length) {
        const [cr, cc] = stack.pop();
        cells.push([cr, cc]);
        for (const [dr, dc] of dirs) {
            const nr = cr + dr, nc = cc + dc;
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc] && grid[nr][nc] === 1) {
                visited[nr][nc] = true;
                stack.push([nr, nc]);
            }
        }
    }
    return cells;
}

function findShapes(grid) {
    const m = grid.length, n = grid[0].length;
    const visited = Array.from({ length: m }, () => Array(n).fill(false));
    const shapes = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1 && !visited[i][j]) {
                shapes.push(getCells(grid, i, j, visited));
            }
        }
    }
    return shapes;
}"""
    
    # ── Template 2: Shape Normalization ──
    if "def normalize(cells)" in code and "rotate_90" in code:
        if to_lang == "cpp":
            return """#include <vector>
#include <algorithm>
#include <set>
using namespace std;

vector<pair<int,int>> normalize(vector<pair<int,int>>& cells) {
    if (cells.empty()) return {};
    int min_r = cells[0].first, min_c = cells[0].second;
    for (auto& p : cells) {
        min_r = min(min_r, p.first);
        min_c = min(min_c, p.second);
    }
    vector<pair<int,int>> res;
    for (auto& p : cells)
        res.push_back({p.first - min_r, p.second - min_c});
    sort(res.begin(), res.end());
    return res;
}

vector<pair<int,int>> rotate_90(vector<pair<int,int>>& cells, int max_r = -1, int max_c = -1) {
    if (cells.empty()) return {};
    if (max_r < 0) for (auto& p : cells) max_r = max(max_r, p.first);
    if (max_c < 0) for (auto& p : cells) max_c = max(max_c, p.second);
    vector<pair<int,int>> rotated;
    for (auto& p : cells)
        rotated.push_back({p.second, max_r - p.first});
    return normalize(rotated);
}"""
        elif to_lang == "java":
            return """import java.util.*;

class ShapeUtils {
    static List<int[]> normalize(List<int[]> cells) {
        if (cells.isEmpty()) return new ArrayList<>();
        int minR = Integer.MAX_VALUE, minC = Integer.MAX_VALUE;
        for (int[] p : cells) {
            minR = Math.min(minR, p[0]);
            minC = Math.min(minC, p[1]);
        }
        List<int[]> res = new ArrayList<>();
        for (int[] p : cells)
            res.add(new int[]{p[0] - minR, p[1] - minC});
        res.sort((a, b) -> a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]);
        return res;
    }
    
    static List<int[]> rotate90(List<int[]> cells, int maxR, int maxC) {
        if (cells.isEmpty()) return new ArrayList<>();
        List<int[]> rotated = new ArrayList<>();
        for (int[] p : cells)
            rotated.add(new int[]{p[1], maxR - p[0]});
        return normalize(rotated);
    }
    
    static List<int[]> rotate90(List<int[]> cells) {
        int maxR = 0, maxC = 0;
        for (int[] p : cells) {
            maxR = Math.max(maxR, p[0]);
            maxC = Math.max(maxC, p[1]);
        }
        return rotate90(cells, maxR, maxC);
    }
}"""
        elif to_lang == "javascript":
            return """function normalize(cells) {
    if (!cells.length) return [];
    const minR = Math.min(...cells.map(p => p[0]));
    const minC = Math.min(...cells.map(p => p[1]));
    return cells.map(p => [p[0] - minR, p[1] - minC]).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
}

function rotate90(cells, maxR, maxC) {
    if (!cells.length) return [];
    if (maxR === undefined) maxR = Math.max(...cells.map(p => p[0]));
    if (maxC === undefined) maxC = Math.max(...cells.map(p => p[1]));
    return normalize(cells.map(p => [p[1], maxR - p[0]]));
}"""
    
    # ── Template 3: Perimeter ──
    if "def perimeter(grid)" in code and "total += 4" in code:
        if to_lang == "cpp":
            return """int perimeter(vector<vector<int>>& grid) {
    int m = grid.size(), n = grid[0].size(), total = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == 1) {
                total += 4;
                if (i > 0 && grid[i-1][j] == 1) total -= 2;
                if (j > 0 && grid[i][j-1] == 1) total -= 2;
            }
        }
    }
    return total;
}"""
        elif to_lang == "java":
            return """public int perimeter(int[][] grid) {
    int m = grid.length, n = grid[0].length, total = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == 1) {
                total += 4;
                if (i > 0 && grid[i-1][j] == 1) total -= 2;
                if (j > 0 && grid[i][j-1] == 1) total -= 2;
            }
        }
    }
    return total;
}"""
        elif to_lang == "javascript":
            return """function perimeter(grid) {
    const m = grid.length, n = grid[0].length;
    let total = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                total += 4;
                if (i > 0 && grid[i-1][j] === 1) total -= 2;
                if (j > 0 && grid[i][j-1] === 1) total -= 2;
            }
        }
    }
    return total;
}"""
    
    # ── Template 4: Bounding Box ──
    if "def bounding_box(cells)" in code:
        if to_lang == "cpp":
            return """#include <vector>
#include <algorithm>
using namespace std;

vector<int> bounding_box(vector<pair<int,int>>& cells) {
    if (cells.empty()) return {};
    int min_r = cells[0].first, max_r = cells[0].first;
    int min_c = cells[0].second, max_c = cells[0].second;
    for (auto& p : cells) {
        min_r = min(min_r, p.first);
        max_r = max(max_r, p.first);
        min_c = min(min_c, p.second);
        max_c = max(max_c, p.second);
    }
    return {min_r, min_c, max_r, max_c};
}"""
        elif to_lang == "java":
            return """import java.util.*;

class BoundingBox {
    static int[] boundingBox(List<int[]> cells) {
        if (cells.isEmpty()) return null;
        int minR = Integer.MAX_VALUE, maxR = Integer.MIN_VALUE;
        int minC = Integer.MAX_VALUE, maxC = Integer.MIN_VALUE;
        for (int[] p : cells) {
            minR = Math.min(minR, p[0]);
            maxR = Math.max(maxR, p[0]);
            minC = Math.min(minC, p[1]);
            maxC = Math.max(maxC, p[1]);
        }
        return new int[]{minR, minC, maxR, maxC};
    }
}"""
        elif to_lang == "javascript":
            return """function boundingBox(cells) {
    if (!cells.length) return null;
    let minR = Infinity, maxR = -Infinity, minC = Infinity, maxC = -Infinity;
    for (const [r, c] of cells) {
        minR = Math.min(minR, r);
        maxR = Math.max(maxR, r);
        minC = Math.min(minC, c);
        maxC = Math.max(maxC, c);
    }
    return [minR, minC, maxR, maxC];
}"""
    
    # ── Template 5: Projection Area ──
    if "def projection_area(grid)" in code and "top + sum(front) + sum(side)" in code:
        if to_lang == "cpp":
            return """int projectionArea(vector<vector<int>>& grid) {
    int m = grid.size(), n = grid[0].size();
    int top = 0;
    vector<int> front(n, 0), side(m, 0);
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            int h = grid[i][j];
            if (h) top++;
            side[i] = max(side[i], h);
            front[j] = max(front[j], h);
        }
    }
    int total = top;
    for (int x : front) total += x;
    for (int x : side) total += x;
    return total;
}"""
        elif to_lang == "java":
            return """public int projectionArea(int[][] grid) {
    int m = grid.length, n = grid[0].length;
    int top = 0;
    int[] front = new int[n], side = new int[m];
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            int h = grid[i][j];
            if (h > 0) top++;
            side[i] = Math.max(side[i], h);
            front[j] = Math.max(front[j], h);
        }
    }
    int total = top;
    for (int x : front) total += x;
    for (int x : side) total += x;
    return total;
}"""
        elif to_lang == "javascript":
            return """function projectionArea(grid) {
    const m = grid.length, n = grid[0].length;
    let top = 0;
    const front = Array(n).fill(0), side = Array(m).fill(0);
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const h = grid[i][j];
            if (h) top++;
            side[i] = Math.max(side[i], h);
            front[j] = Math.max(front[j], h);
        }
    }
    return top + front.reduce((a, b) => a + b, 0) + side.reduce((a, b) => a + b, 0);
}"""
    
    # ── Template 6: Surface Area ──
    if "def surface_area(grid)" in code:
        if to_lang == "cpp":
            return """int surfaceArea(vector<vector<int>>& grid) {
    int m = grid.size(), n = grid[0].size(), area = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (grid[i][j]) {
                area += 4 * grid[i][j] + 2;
                if (i > 0) area -= 2 * min(grid[i][j], grid[i-1][j]);
                if (j > 0) area -= 2 * min(grid[i][j], grid[i][j-1]);
            }
        }
    }
    return area;
}"""
        elif to_lang == "java":
            return """public int surfaceArea(int[][] grid) {
    int m = grid.length, n = grid[0].length, area = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (grid[i][j] > 0) {
                area += 4 * grid[i][j] + 2;
                if (i > 0) area -= 2 * Math.min(grid[i][j], grid[i-1][j]);
                if (j > 0) area -= 2 * Math.min(grid[i][j], grid[i][j-1]);
            }
        }
    }
    return area;
}"""
        elif to_lang == "javascript":
            return """function surfaceArea(grid) {
    const m = grid.length, n = grid[0].length;
    let area = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j]) {
                area += 4 * grid[i][j] + 2;
                if (i > 0) area -= 2 * Math.min(grid[i][j], grid[i-1][j]);
                if (j > 0) area -= 2 * Math.min(grid[i][j], grid[i][j-1]);
            }
        }
    }
    return area;
}"""
    
    # ── Problem 1: Vlad and Shapes ──
    if "def solve()" in code and "Vlad" in context and "SQUARE" in code:
        if to_lang == "javascript":
            return """function solve(input) {
    const lines = input.trim().split('\\n');
    let idx = 0;
    const t = parseInt(lines[idx++]);
    for (let _ = 0; _ < t; _++) {
        const n = parseInt(lines[idx++]);
        const grid = [];
        for (let i = 0; i < n; i++) grid.push(lines[idx++]);
        
        let minR = n, maxR = -1, minC = n, maxC = -1, cnt = 0;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (grid[i][j] === '1') {
                    cnt++;
                    minR = Math.min(minR, i);
                    maxR = Math.max(maxR, i);
                    minC = Math.min(minC, j);
                    maxC = Math.max(maxC, j);
                }
            }
        }
        const w = maxC - minC + 1, h = maxR - minR + 1;
        console.log(cnt === w * h ? "SQUARE" : "TRIANGLE");
    }
}"""
    
    # ── Problem 2: Projection Area LeetCode ──
    if "def projection_area(grid)" in code and "top + sum(front) + sum(side)" not in code and "top" in code:
        # This is the Problem 2 version
        if to_lang == "javascript":
            return """function projectionArea(grid) {
    const m = grid.length, n = grid[0].length;
    let top = 0;
    const front = Array(n).fill(0), side = Array(m).fill(0);
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const h = grid[i][j];
            if (h) top++;
            side[i] = Math.max(side[i], h);
            front[j] = Math.max(front[j], h);
        }
    }
    return top + front.reduce((a, b) => a + b, 0) + side.reduce((a, b) => a + b, 0);
}"""
    
    # ── Problem 3: ABC218C - Shapes ──
    if "def normalize(cells)" in code and "frozenset" in code and "def rotate(cells, n)" in code:
        if to_lang == "cpp":
            return """#include <iostream>
#include <vector>
#include <set>
#include <string>
#include <algorithm>
using namespace std;

set<pair<int,int>> normalize(vector<pair<int,int>>& cells) {
    int min_r = cells[0].first, min_c = cells[0].second;
    for (auto& p : cells) {
        min_r = min(min_r, p.first);
        min_c = min(min_c, p.second);
    }
    set<pair<int,int>> norm;
    for (auto& p : cells)
        norm.insert({p.first - min_r, p.second - min_c});
    return norm;
}

vector<pair<int,int>> rotate(vector<pair<int,int>>& cells, int n) {
    vector<pair<int,int>> res;
    for (auto& p : cells)
        res.push_back({p.second, n - 1 - p.first});
    return res;
}

int main() {
    int n; cin >> n;
    vector<string> s(n), t(n);
    for (int i = 0; i < n; i++) cin >> s[i];
    for (int i = 0; i < n; i++) cin >> t[i];
    
    vector<pair<int,int>> s_cells, t_cells;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++) {
            if (s[i][j] == '#') s_cells.push_back({i, j});
            if (t[i][j] == '#') t_cells.push_back({i, j});
        }
    
    if (s_cells.size() != t_cells.size()) {
        cout << "No" << endl;
        return 0;
    }
    
    auto t_norm = normalize(t_cells);
    for (int rot = 0; rot < 4; rot++) {
        if (normalize(s_cells) == t_norm) {
            cout << "Yes" << endl;
            return 0;
        }
        s_cells = rotate(s_cells, n);
    }
    cout << "No" << endl;
    return 0;
}"""
        elif to_lang == "java":
            return """import java.util.*;

public class Main {
    static Set<List<Integer>> normalize(List<int[]> cells) {
        int minR = Integer.MAX_VALUE, minC = Integer.MAX_VALUE;
        for (int[] p : cells) {
            minR = Math.min(minR, p[0]);
            minC = Math.min(minC, p[1]);
        }
        Set<List<Integer>> norm = new HashSet<>();
        for (int[] p : cells)
            norm.add(Arrays.asList(p[0] - minR, p[1] - minC));
        return norm;
    }
    
    static List<int[]> rotate(List<int[]> cells, int n) {
        List<int[]> res = new ArrayList<>();
        for (int[] p : cells)
            res.add(new int[]{p[1], n - 1 - p[0]});
        return res;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        char[][] s = new char[n][n], t = new char[n][n];
        for (int i = 0; i < n; i++) s[i] = sc.next().toCharArray();
        for (int i = 0; i < n; i++) t[i] = sc.next().toCharArray();
        
        List<int[]> sCells = new ArrayList<>(), tCells = new ArrayList<>();
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++) {
                if (s[i][j] == '#') sCells.add(new int[]{i, j});
                if (t[i][j] == '#') tCells.add(new int[]{i, j});
            }
        
        if (sCells.size() != tCells.size()) {
            System.out.println("No");
            return;
        }
        
        Set<List<Integer>> tNorm = normalize(tCells);
        for (int rot = 0; rot < 4; rot++) {
            if (normalize(sCells).equals(tNorm)) {
                System.out.println("Yes");
                return;
            }
            sCells = rotate(sCells, n);
        }
        System.out.println("No");
    }
}"""
        elif to_lang == "javascript":
            return """function normalize(cells) {
    const minR = Math.min(...cells.map(p => p[0]));
    const minC = Math.min(...cells.map(p => p[1]));
    return new Set(cells.map(p => `${p[0] - minR},${p[1] - minC}`));
}

function rotate(cells, n) {
    return cells.map(p => [p[1], n - 1 - p[0]]);
}

function solve(input) {
    const lines = input.trim().split('\\n');
    let idx = 0;
    const n = parseInt(lines[idx++]);
    const s = lines.slice(idx, idx + n); idx += n;
    const t = lines.slice(idx, idx + n);
    
    const sCells = [], tCells = [];
    for (let i = 0; i < n; i++)
        for (let j = 0; j < n; j++) {
            if (s[i][j] === '#') sCells.push([i, j]);
            if (t[i][j] === '#') tCells.push([i, j]);
        }
    
    if (sCells.length !== tCells.length) {
        console.log("No");
        return;
    }
    
    const tNorm = normalize(tCells);
    let cur = [...sCells];
    for (let rot = 0; rot < 4; rot++) {
        if (normalize(cur).size === tNorm.size && [...normalize(cur)].every(v => tNorm.has(v))) {
            console.log("Yes");
            return;
        }
        cur = rotate(cur, n);
    }
    console.log("No");
}"""
    
    # ── Problem 4: Largest Triangle Area ──
    if "def largest_triangle_area(points)" in code:
        if to_lang == "cpp":
            return """double largestTriangleArea(vector<vector<int>>& points) {
    int n = points.size();
    double maxArea = 0.0;
    for (int i = 0; i < n; i++) {
        int x1 = points[i][0], y1 = points[i][1];
        for (int j = i + 1; j < n; j++) {
            int x2 = points[j][0], y2 = points[j][1];
            for (int k = j + 1; k < n; k++) {
                int x3 = points[k][0], y3 = points[k][1];
                double area = 0.5 * abs(x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2));
                maxArea = max(maxArea, area);
            }
        }
    }
    return maxArea;
}"""
        elif to_lang == "java":
            return """public double largestTriangleArea(int[][] points) {
    int n = points.length;
    double maxArea = 0.0;
    for (int i = 0; i < n; i++) {
        int x1 = points[i][0], y1 = points[i][1];
        for (int j = i + 1; j < n; j++) {
            int x2 = points[j][0], y2 = points[j][1];
            for (int k = j + 1; k < n; k++) {
                int x3 = points[k][0], y3 = points[k][1];
                double area = 0.5 * Math.abs(x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2));
                maxArea = Math.max(maxArea, area);
            }
        }
    }
    return maxArea;
}"""
        elif to_lang == "javascript":
            return """function largestTriangleArea(points) {
    const n = points.length;
    let maxArea = 0.0;
    for (let i = 0; i < n; i++) {
        const [x1, y1] = points[i];
        for (let j = i + 1; j < n; j++) {
            const [x2, y2] = points[j];
            for (let k = j + 1; k < n; k++) {
                const [x3, y3] = points[k];
                const area = 0.5 * Math.abs(x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2));
                maxArea = Math.max(maxArea, area);
            }
        }
    }
    return maxArea;
}"""
    
    # ── Problem 5: Almost Rectangle ──
    if "def solve()" in code and "pts.append((i, j))" in code:
        if to_lang == "cpp":
            return """#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    int t; cin >> t;
    while (t--) {
        int n; cin >> n;
        vector<string> grid(n);
        for (int i = 0; i < n; i++) cin >> grid[i];
        
        vector<pair<int,int>> pts;
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] == '*')
                    pts.push_back({i, j});
        
        int r1 = pts[0].first, c1 = pts[0].second;
        int r2 = pts[1].first, c2 = pts[1].second;
        
        int r3, c3, r4, c4;
        if (r1 == r2) {
            r3 = (r1 + 1) % n;
            r4 = r3;
            c3 = c1; c4 = c2;
        } else if (c1 == c2) {
            c3 = (c1 + 1) % n;
            c4 = c3;
            r3 = r1; r4 = r2;
        } else {
            r3 = r1; c3 = c2;
            r4 = r2; c4 = c1;
        }
        
        grid[r3][c3] = '*';
        grid[r4][c4] = '*';
        
        for (auto& row : grid)
            cout << row << '\\n';
    }
    return 0;
}"""
        elif to_lang == "java":
            return """import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        while (t-- > 0) {
            int n = sc.nextInt();
            char[][] grid = new char[n][n];
            for (int i = 0; i < n; i++)
                grid[i] = sc.next().toCharArray();
            
            List<int[]> pts = new ArrayList<>();
            for (int i = 0; i < n; i++)
                for (int j = 0; j < n; j++)
                    if (grid[i][j] == '*')
                        pts.add(new int[]{i, j});
            
            int r1 = pts.get(0)[0], c1 = pts.get(0)[1];
            int r2 = pts.get(1)[0], c2 = pts.get(1)[1];
            int r3, c3, r4, c4;
            
            if (r1 == r2) {
                r3 = (r1 + 1) % n;
                r4 = r3;
                c3 = c1; c4 = c2;
            } else if (c1 == c2) {
                c3 = (c1 + 1) % n;
                c4 = c3;
                r3 = r1; r4 = r2;
            } else {
                r3 = r1; c3 = c2;
                r4 = r2; c4 = c1;
            }
            
            grid[r3][c3] = '*';
            grid[r4][c4] = '*';
            
            for (char[] row : grid)
                System.out.println(new String(row));
        }
    }
}"""
        elif to_lang == "javascript":
            return """function solve(input) {
    const lines = input.trim().split('\\n');
    let idx = 0;
    const t = parseInt(lines[idx++]);
    for (let _ = 0; _ < t; _++) {
        const n = parseInt(lines[idx++]);
        const grid = [];
        for (let i = 0; i < n; i++) grid.push(lines[idx++].split(''));
        
        const pts = [];
        for (let i = 0; i < n; i++)
            for (let j = 0; j < n; j++)
                if (grid[i][j] === '*') pts.push([i, j]);
        
        let [r1, c1] = pts[0], [r2, c2] = pts[1];
        let r3, c3, r4, c4;
        
        if (r1 === r2) {
            r3 = (r1 + 1) % n;
            r4 = r3;
            c3 = c1; c4 = c2;
        } else if (c1 === c2) {
            c3 = (c1 + 1) % n;
            c4 = c3;
            r3 = r1; r4 = r2;
        } else {
            r3 = r1; c3 = c2;
            r4 = r2; c4 = c1;
        }
        
        grid[r3][c3] = '*';
        grid[r4][c4] = '*';
        
        for (const row of grid) console.log(row.join(''));
    }
}"""
    
    return None


def translate_basic_geom(code, from_lang, to_lang, context):
    
    # ── Template 1: Point Class ──
    if "class Point" in code and "cross" in code and "dist" in code:
        if to_lang == "javascript":
            return """class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    static cross(o, a, b) {
        return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
    }
    
    static dist(a, b) {
        const dx = a.x - b.x, dy = a.y - b.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}"""
    
    # ── Templates 2-6: various single-python blocks ──
    
    # Template 2: Segment Intersection
    if "def on_segment(p, q, r)" in code:
        if to_lang == "cpp":
            return """#include <vector>
#include <algorithm>
using namespace std;

using Point = pair<int,int>;

bool on_segment(Point p, Point q, Point r) {
    return q.first <= max(p.first, r.first) && q.first >= min(p.first, r.first) &&
           q.second <= max(p.second, r.second) && q.second >= min(p.second, r.second);
}

double cross(Point o, Point a, Point b) {
    return (a.first - o.first) * (b.second - o.second) - (a.second - o.second) * (b.first - o.first);
}

bool segments_intersect(Point p1, Point p2, Point p3, Point p4) {
    double o1 = cross(p1, p2, p3), o2 = cross(p1, p2, p4);
    double o3 = cross(p3, p4, p1), o4 = cross(p3, p4, p2);
    
    if (o1 * o2 < 0 && o3 * o4 < 0) return true;
    if (o1 == 0 && on_segment(p1, p3, p2)) return true;
    if (o2 == 0 && on_segment(p1, p4, p2)) return true;
    if (o3 == 0 && on_segment(p3, p1, p4)) return true;
    if (o4 == 0 && on_segment(p3, p2, p4)) return true;
    return false;
}"""
        elif to_lang == "java":
            return """import java.util.*;

class SegmentUtils {
    static boolean onSegment(int[] p, int[] q, int[] r) {
        return q[0] <= Math.max(p[0], r[0]) && q[0] >= Math.min(p[0], r[0]) &&
               q[1] <= Math.max(p[1], r[1]) && q[1] >= Math.min(p[1], r[1]);
    }
    
    static double cross(int[] o, int[] a, int[] b) {
        return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    }
    
    static boolean segmentsIntersect(int[] p1, int[] p2, int[] p3, int[] p4) {
        double o1 = cross(p1, p2, p3), o2 = cross(p1, p2, p4);
        double o3 = cross(p3, p4, p1), o4 = cross(p3, p4, p2);
        
        if (o1 * o2 < 0 && o3 * o4 < 0) return true;
        if (o1 == 0 && onSegment(p1, p3, p2)) return true;
        if (o2 == 0 && onSegment(p1, p4, p2)) return true;
        if (o3 == 0 && onSegment(p3, p1, p4)) return true;
        if (o4 == 0 && onSegment(p3, p2, p4)) return true;
        return false;
    }
}"""
        elif to_lang == "javascript":
            return """function onSegment(p, q, r) {
    return q[0] <= Math.max(p[0], r[0]) && q[0] >= Math.min(p[0], r[0]) &&
           q[1] <= Math.max(p[1], r[1]) && q[1] >= Math.min(p[1], r[1]);
}

function cross(o, a, b) {
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
}

function segmentsIntersect(p1, p2, p3, p4) {
    const o1 = cross(p1, p2, p3), o2 = cross(p1, p2, p4);
    const o3 = cross(p3, p4, p1), o4 = cross(p3, p4, p2);
    
    if (o1 * o2 < 0 && o3 * o4 < 0) return true;
    if (o1 === 0 && onSegment(p1, p3, p2)) return true;
    if (o2 === 0 && onSegment(p1, p4, p2)) return true;
    if (o3 === 0 && onSegment(p3, p1, p4)) return true;
    if (o4 === 0 && onSegment(p3, p2, p4)) return true;
    return false;
}"""
    
    # Template 3: Shoelace
    if "def polygon_area(vertices)" in code and "shoelace" in code.lower():
        if to_lang == "cpp":
            return """double polygonArea(vector<pair<double,double>>& vertices) {
    int n = vertices.size();
    double area = 0.0;
    for (int i = 0; i < n; i++) {
        int j = (i + 1) % n;
        area += vertices[i].first * vertices[j].second;
        area -= vertices[j].first * vertices[i].second;
    }
    return abs(area) / 2.0;
}"""
        elif to_lang == "java":
            return """public double polygonArea(List<double[]> vertices) {
    int n = vertices.size();
    double area = 0.0;
    for (int i = 0; i < n; i++) {
        int j = (i + 1) % n;
        area += vertices.get(i)[0] * vertices.get(j)[1];
        area -= vertices.get(j)[0] * vertices.get(i)[1];
    }
    return Math.abs(area) / 2.0;
}"""
        elif to_lang == "javascript":
            return """function polygonArea(vertices) {
    const n = vertices.length;
    let area = 0.0;
    for (let i = 0; i < n; i++) {
        const j = (i + 1) % n;
        area += vertices[i][0] * vertices[j][1];
        area -= vertices[j][0] * vertices[i][1];
    }
    return Math.abs(area) / 2.0;
}"""
    
    # Template 4: Point in Convex Polygon
    if "def point_in_convex_polygon(pt, polygon)" in code:
        if to_lang == "cpp":
            return """#include <vector>
using namespace std;

using Point = pair<double,double>;

double cross(Point o, Point a, Point b) {
    return (a.first - o.first) * (b.second - o.second) - (a.second - o.second) * (b.first - o.first);
}

bool pointInConvexPolygon(Point pt, vector<Point>& polygon) {
    int n = polygon.size();
    for (int i = 0; i < n; i++) {
        if (cross(polygon[i], polygon[(i+1)%n], pt) < 0)
            return false;
    }
    return true;
}"""
        elif to_lang == "java":
            return """import java.util.*;

class ConvexUtils {
    static double cross(double[] o, double[] a, double[] b) {
        return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    }
    
    static boolean pointInConvexPolygon(double[] pt, List<double[]> polygon) {
        int n = polygon.size();
        for (int i = 0; i < n; i++) {
            if (cross(polygon.get(i), polygon.get((i+1)%n), pt) < 0)
                return false;
        }
        return true;
    }
}"""
        elif to_lang == "javascript":
            return """function cross(o, a, b) {
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
}

function pointInConvexPolygon(pt, polygon) {
    const n = polygon.length;
    for (let i = 0; i < n; i++) {
        if (cross(polygon[i], polygon[(i + 1) % n], pt) < 0)
            return false;
    }
    return true;
}"""
    
    # Template 5: Rectangle Overlap
    if "def rect_overlap(r1, r2)" in code:
        if to_lang == "cpp":
            return """#include <vector>
#include <algorithm>
using namespace std;

bool rectOverlap(vector<int>& r1, vector<int>& r2) {
    return !(r1[2] <= r2[0] || r1[0] >= r2[2] || r1[3] <= r2[1] || r1[1] >= r2[3]);
}"""
        elif to_lang == "java":
            return """public boolean rectOverlap(int[] r1, int[] r2) {
    return !(r1[2] <= r2[0] || r1[0] >= r2[2] || r1[3] <= r2[1] || r1[1] >= r2[3]);
}"""
        elif to_lang == "javascript":
            return """function rectOverlap(r1, r2) {
    return !(r1[2] <= r2[0] || r1[0] >= r2[2] || r1[3] <= r2[1] || r1[1] >= r2[3]);
}"""
    
    # Template 6: Triangle Angles
    if "def triangle_angles(a, b, c)" in code:
        if to_lang == "cpp":
            return """#include <vector>
#include <cmath>
using namespace std;

vector<double> triangleAngles(double a, double b, double c) {
    return {
        acos((b*b + c*c - a*a) / (2*b*c)),
        acos((a*a + c*c - b*b) / (2*a*c)),
        acos((a*a + b*b - c*c) / (2*a*b))
    };
}"""
        elif to_lang == "java":
            return """import java.util.*;

class TriangleUtils {
    static List<Double> triangleAngles(double a, double b, double c) {
        return Arrays.asList(
            Math.acos((b*b + c*c - a*a) / (2*b*c)),
            Math.acos((a*a + c*c - b*b) / (2*a*c)),
            Math.acos((a*a + b*b - c*c) / (2*a*b))
        );
    }
}"""
        elif to_lang == "javascript":
            return """function triangleAngles(a, b, c) {
    return [
        Math.acos((b*b + c*c - a*a) / (2*b*c)),
        Math.acos((a*a + c*c - b*b) / (2*a*c)),
        Math.acos((a*a + b*b - c*c) / (2*a*b))
    ];
}"""
    
    # ── Problem 1: Valid Boomerang ──
    if "def is_boomerang(points)" in code:
        if to_lang == "javascript":
            return """function isBoomerang(points) {
    const [[x1, y1], [x2, y2], [x3, y3]] = points;
    return (x2 - x1) * (y3 - y1) !== (x3 - x1) * (y2 - y1);
}"""
    
    # ── Problem 2: Crazy Town ──
    if "def solve()" in code and "f1 = a * x1 + b * y1 + c" in code:
        if to_lang == "cpp":
            return """#include <iostream>
using namespace std;

int main() {
    long long x1, y1, x2, y2;
    cin >> x1 >> y1 >> x2 >> y2;
    int n, count = 0;
    cin >> n;
    for (int i = 0; i < n; i++) {
        long long a, b, c;
        cin >> a >> b >> c;
        long long f1 = a * x1 + b * y1 + c;
        long long f2 = a * x2 + b * y2 + c;
        if (f1 * f2 < 0) count++;
    }
    cout << count << endl;
    return 0;
}"""
        elif to_lang == "java":
            return """import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long x1 = sc.nextLong(), y1 = sc.nextLong();
        long x2 = sc.nextLong(), y2 = sc.nextLong();
        int n = sc.nextInt(), count = 0;
        for (int i = 0; i < n; i++) {
            long a = sc.nextLong(), b = sc.nextLong(), c = sc.nextLong();
            long f1 = a * x1 + b * y1 + c;
            long f2 = a * x2 + b * y2 + c;
            if (f1 * f2 < 0) count++;
        }
        System.out.println(count);
    }
}"""
        elif to_lang == "javascript":
            return """function solve(input) {
    const lines = input.trim().split('\\n').map(l => l.split(' ').map(Number));
    let idx = 0;
    const [x1, y1] = lines[idx++];
    const [x2, y2] = lines[idx++];
    const n = lines[idx++][0];
    let count = 0;
    for (let i = 0; i < n; i++) {
        const [a, b, c] = lines[idx++];
        const f1 = a * x1 + b * y1 + c;
        const f2 = a * x2 + b * y2 + c;
        if (f1 * f2 < 0) count++;
    }
    console.log(count);
}"""
    
    # ── Problem 3: Bovine Dilemma ──
    if "def solve()" in code and "areas = set()" in code and "abs(xs[i] - xs[j])" in code:
        if to_lang == "cpp":
            return """#include <iostream>
#include <vector>
#include <set>
#include <algorithm>
using namespace std;

int main() {
    int t; cin >> t;
    while (t--) {
        int n; cin >> n;
        vector<int> xs(n);
        for (int i = 0; i < n; i++) cin >> xs[i];
        set<int> areas;
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++)
                areas.insert(abs(xs[i] - xs[j]));
        cout << areas.size() << '\\n';
    }
    return 0;
}"""
        elif to_lang == "java":
            return """import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        while (t-- > 0) {
            int n = sc.nextInt();
            int[] xs = new int[n];
            for (int i = 0; i < n; i++) xs[i] = sc.nextInt();
            Set<Integer> areas = new HashSet<>();
            for (int i = 0; i < n; i++)
                for (int j = i + 1; j < n; j++)
                    areas.add(Math.abs(xs[i] - xs[j]));
            System.out.println(areas.size());
        }
    }
}"""
        elif to_lang == "javascript":
            return """function solve(input) {
    const lines = input.trim().split('\\n').map(l => l.split(' ').map(Number));
    let idx = 0;
    const t = lines[idx++][0];
    for (let _ = 0; _ < t; _++) {
        const n = lines[idx++][0];
        const xs = lines[idx++];
        const areas = new Set();
        for (let i = 0; i < n; i++)
            for (let j = i + 1; j < n; j++)
                areas.add(Math.abs(xs[i] - xs[j]));
        console.log(areas.size);
    }
}"""
    
    # ── Problem 4: Where do I Turn? ──
    if "cross = (bx - ax)*(cy - by) - (by - ay)*(cx - bx)" in code:
        if to_lang == "cpp":
            return """#include <iostream>
using namespace std;

int main() {
    long long ax, ay, bx, by, cx, cy;
    cin >> ax >> ay >> bx >> by >> cx >> cy;
    long long cross = (bx - ax) * (cy - by) - (by - ay) * (cx - bx);
    if (cross > 0) cout << "LEFT" << endl;
    else if (cross < 0) cout << "RIGHT" << endl;
    else cout << "TOWARDS" << endl;
    return 0;
}"""
        elif to_lang == "java":
            return """import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long ax = sc.nextLong(), ay = sc.nextLong();
        long bx = sc.nextLong(), by = sc.nextLong();
        long cx = sc.nextLong(), cy = sc.nextLong();
        long cross = (bx - ax) * (cy - by) - (by - ay) * (cx - bx);
        if (cross > 0) System.out.println("LEFT");
        else if (cross < 0) System.out.println("RIGHT");
        else System.out.println("TOWARDS");
    }
}"""
        elif to_lang == "javascript":
            return """function solve(input) {
    const [ax, ay, bx, by, cx, cy] = input.trim().split(/\\s+/).map(Number);
    const cross = (bx - ax) * (cy - by) - (by - ay) * (cx - bx);
    if (cross > 0) console.log("LEFT");
    else if (cross < 0) console.log("RIGHT");
    else console.log("TOWARDS");
}"""
    
    # ── Problem 5: White Sheet ──
    if "def intersect(r1, r2)" in code and "def area(r)" in code and "white = tuple(map(int, input().split()))" in code:
        if to_lang == "cpp":
            return """#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

using Rect = vector<long long>;

Rect intersect(Rect& r1, Rect& r2) {
    long long x1 = max(r1[0], r2[0]), y1 = max(r1[1], r2[1]);
    long long x2 = min(r1[2], r2[2]), y2 = min(r1[3], r2[3]);
    if (x1 < x2 && y1 < y2) return {x1, y1, x2, y2};
    return {};
}

long long area(Rect& r) {
    return (r[2] - r[0]) * (r[3] - r[1]);
}

int main() {
    Rect white(4), black1(4), black2(4);
    for (int i = 0; i < 4; i++) cin >> white[i];
    for (int i = 0; i < 4; i++) cin >> black1[i];
    for (int i = 0; i < 4; i++) cin >> black2[i];
    
    Rect iw1 = intersect(white, black1);
    Rect iw2 = intersect(white, black2);
    Rect iw12;
    bool has_iw12 = !iw1.empty() && !iw2.empty();
    if (has_iw12) iw12 = intersect(iw1, iw2);
    
    long long covered = 0;
    if (!iw1.empty()) covered += area(iw1);
    if (!iw2.empty()) covered += area(iw2);
    if (has_iw12 && !iw12.empty()) covered -= area(iw12);
    
    cout << (covered >= area(white) ? "NO" : "YES") << endl;
    return 0;
}"""
        elif to_lang == "java":
            return """import java.util.*;

public class Main {
    static long[] intersect(long[] r1, long[] r2) {
        long x1 = Math.max(r1[0], r2[0]), y1 = Math.max(r1[1], r2[1]);
        long x2 = Math.min(r1[2], r2[2]), y2 = Math.min(r1[3], r2[3]);
        if (x1 < x2 && y1 < y2) return new long[]{x1, y1, x2, y2};
        return null;
    }
    
    static long area(long[] r) {
        return (r[2] - r[0]) * (r[3] - r[1]);
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long[] white = new long[4], black1 = new long[4], black2 = new long[4];
        for (int i = 0; i < 4; i++) white[i] = sc.nextLong();
        for (int i = 0; i < 4; i++) black1[i] = sc.nextLong();
        for (int i = 0; i < 4; i++) black2[i] = sc.nextLong();
        
        long[] iw1 = intersect(white, black1);
        long[] iw2 = intersect(white, black2);
        long[] iw12 = (iw1 != null && iw2 != null) ? intersect(iw1, iw2) : null;
        
        long covered = 0;
        if (iw1 != null) covered += area(iw1);
        if (iw2 != null) covered += area(iw2);
        if (iw12 != null) covered -= area(iw12);
        
        System.out.println(covered >= area(white) ? "NO" : "YES");
    }
}"""
        elif to_lang == "javascript":
            return """function intersect(r1, r2) {
    const x1 = Math.max(r1[0], r2[0]), y1 = Math.max(r1[1], r2[1]);
    const x2 = Math.min(r1[2], r2[2]), y2 = Math.min(r1[3], r2[3]);
    if (x1 < x2 && y1 < y2) return [x1, y1, x2, y2];
    return null;
}

function area(r) {
    return (r[2] - r[0]) * (r[3] - r[1]);
}

function solve(input) {
    const nums = input.trim().split(/\\s+/).map(Number);
    const white = nums.slice(0, 4);
    const black1 = nums.slice(4, 8);
    const black2 = nums.slice(8, 12);
    
    const iw1 = intersect(white, black1);
    const iw2 = intersect(white, black2);
    const iw12 = iw1 && iw2 ? intersect(iw1, iw2) : null;
    
    let covered = 0;
    if (iw1) covered += area(iw1);
    if (iw2) covered += area(iw2);
    if (iw12) covered -= area(iw12);
    
    console.log(covered >= area(white) ? "NO" : "YES");
}"""
    
    # ── Problem 6: Tell Your World ──
    if "def solve()" in code and "def slope(i, j)" in code and "def check_with_slope(s)" in code:
        if to_lang == "cpp":
            return """#include <iostream>
#include <vector>
#include <set>
#include <cmath>
using namespace std;

int main() {
    int n; cin >> n;
    vector<int> pts(n);
    for (int i = 0; i < n; i++) cin >> pts[i];
    
    auto slope = [&](int i, int j) -> double {
        return (double)(pts[j] - pts[i]) / (j - i);
    };
    
    auto check = [&](double s) -> bool {
        set<int> line1;
        for (int i = 0; i < n; i++)
            if (abs(pts[i] - pts[0] - s * i) < 1e-9)
                line1.insert(i);
        if (line1.size() == n) return false;
        vector<int> line2;
        for (int i = 0; i < n; i++)
            if (!line1.count(i)) line2.push_back(i);
        if (line2.size() <= 1) return true;
        double s2 = (double)(pts[line2[1]] - pts[line2[0]]) / (line2[1] - line2[0]);
        if (abs(s2 - s) > 1e-9) return false;
        for (int k = 2; k < line2.size(); k++)
            if (abs((pts[line2[k]] - pts[line2[0]]) - s2 * (line2[k] - line2[0])) > 1e-9)
                return false;
        return true;
    };
    
    if (check(slope(0, 1)) || check(slope(0, 2))) {
        cout << "Yes" << endl;
        return 0;
    }
    
    double s = slope(1, 2);
    for (int i = 3; i < n; i++) {
        if (abs((pts[i] - pts[1]) - s * (i - 1)) > 1e-9) {
            cout << "No" << endl;
            return 0;
        }
    }
    cout << "Yes" << endl;
    return 0;
}"""
        elif to_lang == "java":
            return """import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] pts = new int[n];
        for (int i = 0; i < n; i++) pts[i] = sc.nextInt();
        
        if (check(pts, slope(pts, 0, 1)) || check(pts, slope(pts, 0, 2))) {
            System.out.println("Yes");
            return;
        }
        
        double s = slope(pts, 1, 2);
        for (int i = 3; i < n; i++) {
            if (Math.abs((pts[i] - pts[1]) - s * (i - 1)) > 1e-9) {
                System.out.println("No");
                return;
            }
        }
        System.out.println("Yes");
    }
    
    static double slope(int[] pts, int i, int j) {
        return (double)(pts[j] - pts[i]) / (j - i);
    }
    
    static boolean check(int[] pts, double s) {
        int n = pts.length;
        Set<Integer> line1 = new HashSet<>();
        for (int i = 0; i < n; i++)
            if (Math.abs(pts[i] - pts[0] - s * i) < 1e-9)
                line1.add(i);
        if (line1.size() == n) return false;
        List<Integer> line2 = new ArrayList<>();
        for (int i = 0; i < n; i++)
            if (!line1.contains(i)) line2.add(i);
        if (line2.size() <= 1) return true;
        double s2 = (double)(pts[line2.get(1)] - pts[line2.get(0)]) / (line2.get(1) - line2.get(0));
        if (Math.abs(s2 - s) > 1e-9) return false;
        for (int k = 2; k < line2.size(); k++)
            if (Math.abs((pts[line2.get(k)] - pts[line2.get(0)]) - s2 * (line2.get(k) - line2.get(0))) > 1e-9)
                return false;
        return true;
    }
}"""
        elif to_lang == "javascript":
            return """function solve(input) {
    const lines = input.trim().split('\\n');
    const n = parseInt(lines[0]);
    const pts = lines[1].split(' ').map(Number);
    
    const slope = (i, j) => (pts[j] - pts[i]) / (j - i);
    
    const check = (s) => {
        const line1 = new Set();
        for (let i = 0; i < n; i++)
            if (Math.abs(pts[i] - pts[0] - s * i) < 1e-9)
                line1.add(i);
        if (line1.size === n) return false;
        const line2 = [];
        for (let i = 0; i < n; i++)
            if (!line1.has(i)) line2.push(i);
        if (line2.length <= 1) return true;
        const s2 = (pts[line2[1]] - pts[line2[0]]) / (line2[1] - line2[0]);
        if (Math.abs(s2 - s) > 1e-9) return false;
        for (let k = 2; k < line2.length; k++)
            if (Math.abs((pts[line2[k]] - pts[line2[0]]) - s2 * (line2[k] - line2[0])) > 1e-9)
                return false;
        return true;
    };
    
    if (check(slope(0, 1)) || check(slope(0, 2))) {
        console.log("Yes");
        return;
    }
    
    const s = slope(1, 2);
    for (let i = 3; i < n; i++) {
        if (Math.abs((pts[i] - pts[1]) - s * (i - 1)) > 1e-9) {
            console.log("No");
            return;
        }
    }
    console.log("Yes");
}"""
    
    return None


def translate_triangle(code, from_lang, to_lang, context):
    
    # Template 1: Triangle Validity
    if "def is_valid_triangle(a: float, b: float, c: float)" in code:
        if to_lang == "cpp":
            return """#include <algorithm>
using namespace std;

bool isValidTriangle(double a, double b, double c) {
    double sides[] = {a, b, c};
    sort(sides, sides + 3);
    return sides[0] + sides[1] > sides[2];
}"""
        elif to_lang == "java":
            return """import java.util.Arrays;

public class TriangleUtils {
    public static boolean isValidTriangle(double a, double b, double c) {
        double[] sides = {a, b, c};
        Arrays.sort(sides);
        return sides[0] + sides[1] > sides[2];
    }
}"""
        elif to_lang == "javascript":
            return """function isValidTriangle(a, b, c) {
    const sides = [a, b, c].sort((x, y) => x - y);
    return sides[0] + sides[1] > sides[2];
}"""
    
    # Template 2: Count Possible Triangles - need javascript
    if "def count_triangles(arr)" in code and "arr.sort()" in code:
        if to_lang == "javascript":
            return """function countTriangles(arr) {
    arr.sort((a, b) => a - b);
    const n = arr.length;
    let count = 0;
    for (let i = 0; i < n - 2; i++) {
        let k = i + 2;
        for (let j = i + 1; j < n - 1; j++) {
            while (k < n && arr[i] + arr[j] > arr[k]) k++;
            count += k - j - 1;
        }
    }
    return count;
}"""
    
    # Template 3: Triangle Area from Coordinates
    if "def triangle_area(p1, p2, p3)" in code:
        if to_lang == "cpp":
            return """double triangleArea(vector<int>& p1, vector<int>& p2, vector<int>& p3) {
    return 0.5 * abs(p1[0]*(p2[1]-p3[1]) + p2[0]*(p3[1]-p1[1]) + p3[0]*(p1[1]-p2[1]));
}"""
        elif to_lang == "java":
            return """public double triangleArea(int[] p1, int[] p2, int[] p3) {
    return 0.5 * Math.abs(p1[0]*(p2[1]-p3[1]) + p2[0]*(p3[1]-p1[1]) + p3[0]*(p1[1]-p2[1]));
}"""
        elif to_lang == "javascript":
            return """function triangleArea(p1, p2, p3) {
    return 0.5 * Math.abs(p1[0]*(p2[1]-p3[1]) + p2[0]*(p3[1]-p1[1]) + p3[0]*(p1[1]-p2[1]));
}"""
    
    # Template 4: Triangle Classification
    if "def classify_triangle(a, b, c)" in code:
        if to_lang == "cpp":
            return """#include <string>
#include <algorithm>
using namespace std;

string classifyTriangle(double a, double b, double c) {
    double sides[] = {a, b, c};
    sort(sides, sides + 3);
    a = sides[0]; b = sides[1]; c = sides[2];
    
    if (!(a + b > c)) return "Invalid";
    
    string sideType;
    if (a == b && b == c) sideType = "Equilateral";
    else if (a == b || b == c || a == c) sideType = "Isosceles";
    else sideType = "Scalene";
    
    string angleType;
    if (c*c < a*a + b*b) angleType = "Acute";
    else if (c*c == a*a + b*b) angleType = "Right";
    else angleType = "Obtuse";
    
    return sideType + " " + angleType;
}"""
        elif to_lang == "java":
            return """import java.util.Arrays;

public class TriangleUtils {
    public static String classifyTriangle(double a, double b, double c) {
        double[] sides = {a, b, c};
        Arrays.sort(sides);
        a = sides[0]; b = sides[1]; c = sides[2];
        
        if (!(a + b > c)) return "Invalid";
        
        String sideType;
        if (a == b && b == c) sideType = "Equilateral";
        else if (a == b || b == c || a == c) sideType = "Isosceles";
        else sideType = "Scalene";
        
        String angleType;
        if (c*c < a*a + b*b) angleType = "Acute";
        else if (c*c == a*a + b*b) angleType = "Right";
        else angleType = "Obtuse";
        
        return sideType + " " + angleType;
    }
}"""
        elif to_lang == "javascript":
            return """function classifyTriangle(a, b, c) {
    const sides = [a, b, c].sort((x, y) => x - y);
    a = sides[0]; b = sides[1]; c = sides[2];
    
    if (!(a + b > c)) return "Invalid";
    
    let sideType;
    if (a === b && b === c) sideType = "Equilateral";
    else if (a === b || b === c || a === c) sideType = "Isosceles";
    else sideType = "Scalene";
    
    let angleType;
    if (c*c < a*a + b*b) angleType = "Acute";
    else if (c*c === a*a + b*b) angleType = "Right";
    else angleType = "Obtuse";
    
    return sideType + " " + angleType;
}"""
    
    # Template 5: Triangle Path Sum DP
    if "def minimum_total(triangle)" in code:
        if to_lang == "cpp":
            return """#include <vector>
#include <algorithm>
using namespace std;

int minimumTotal(vector<vector<int>>& triangle) {
    int n = triangle.size();
    vector<int> dp = triangle[n-1];
    for (int i = n - 2; i >= 0; i--) {
        for (int j = 0; j < triangle[i].size(); j++) {
            dp[j] = triangle[i][j] + min(dp[j], dp[j+1]);
        }
    }
    return dp[0];
}"""
        elif to_lang == "java":
            return """import java.util.*;

public class TriangleUtils {
    public int minimumTotal(List<List<Integer>> triangle) {
        int n = triangle.size();
        int[] dp = new int[triangle.get(n-1).size()];
        for (int i = 0; i < triangle.get(n-1).size(); i++)
            dp[i] = triangle.get(n-1).get(i);
        for (int i = n - 2; i >= 0; i--) {
            for (int j = 0; j < triangle.get(i).size(); j++) {
                dp[j] = triangle.get(i).get(j) + Math.min(dp[j], dp[j+1]);
            }
        }
        return dp[0];
    }
}"""
        elif to_lang == "javascript":
            return """function minimumTotal(triangle) {
    const n = triangle.length;
    const dp = [...triangle[n - 1]];
    for (let i = n - 2; i >= 0; i--) {
        for (let j = 0; j < triangle[i].length; j++) {
            dp[j] = triangle[i][j] + Math.min(dp[j], dp[j + 1]);
        }
    }
    return dp[0];
}"""
    
    # Template 6: Maximum Perimeter Triangle
    if "def largest_perimeter(nums)" in code and "sort(reverse=True)" in code:
        if to_lang == "cpp":
            return """int largestPerimeter(vector<int>& nums) {
    sort(nums.begin(), nums.end(), greater<int>());
    for (int i = 0; i < (int)nums.size() - 2; i++) {
        if (nums[i] < nums[i+1] + nums[i+2])
            return nums[i] + nums[i+1] + nums[i+2];
    }
    return 0;
}"""
        elif to_lang == "java":
            return """import java.util.*;

public int largestPerimeter(int[] nums) {
    Arrays.sort(nums);
    for (int i = nums.length - 1; i >= 2; i--) {
        if (nums[i] < nums[i-1] + nums[i-2])
            return nums[i] + nums[i-1] + nums[i-2];
    }
    return 0;
}"""
        elif to_lang == "javascript":
            return """function largestPerimeter(nums) {
    nums.sort((a, b) => b - a);
    for (let i = 0; i < nums.length - 2; i++) {
        if (nums[i] < nums[i+1] + nums[i+2])
            return nums[i] + nums[i+1] + nums[i+2];
    }
    return 0;
}"""
    
    # Problem 1: Largest Perimeter Triangle (need javascript)
    if "def largest_perimeter(nums)" in code and "sort(reverse=True)" in code:
        if to_lang == "javascript":
            return """function largestPerimeter(nums) {
    nums.sort((a, b) => b - a);
    for (let i = 0; i < nums.length - 2; i++) {
        if (nums[i] < nums[i+1] + nums[i+2])
            return nums[i] + nums[i+1] + nums[i+2];
    }
    return 0;
}"""
    
    # Problem 2: Valid Triangle Number
    if "def triangle_number(nums)" in code:
        if to_lang == "cpp":
            return """int triangleNumber(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    int n = nums.size(), count = 0;
    for (int i = 0; i < n - 2; i++) {
        int k = i + 2;
        for (int j = i + 1; j < n - 1; j++) {
            while (k < n && nums[i] + nums[j] > nums[k]) k++;
            count += k - j - 1;
        }
    }
    return count;
}"""
        elif to_lang == "java":
            return """public int triangleNumber(int[] nums) {
    Arrays.sort(nums);
    int n = nums.length, count = 0;
    for (int i = 0; i < n - 2; i++) {
        int k = i + 2;
        for (int j = i + 1; j < n - 1; j++) {
            while (k < n && nums[i] + nums[j] > nums[k]) k++;
            count += k - j - 1;
        }
    }
    return count;
}"""
        elif to_lang == "javascript":
            return """function triangleNumber(nums) {
    nums.sort((a, b) => a - b);
    const n = nums.length;
    let count = 0;
    for (let i = 0; i < n - 2; i++) {
        let k = i + 2;
        for (let j = i + 1; j < n - 1; j++) {
            while (k < n && nums[i] + nums[j] > nums[k]) k++;
            count += k - j - 1;
        }
    }
    return count;
}"""
    
    # Problem 3: Make a triangle!
    if "a, b, c = map(int, input().split())" in code and "sides = sorted([a, b, c])" in code:
        if to_lang == "cpp":
            return """#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    int sides[] = {a, b, c};
    sort(sides, sides + 3);
    a = sides[0]; b = sides[1]; c = sides[2];
    if (a + b > c) cout << 0 << endl;
    else cout << c - (a + b) + 1 << endl;
    return 0;
}"""
        elif to_lang == "java":
            return """import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] sides = {sc.nextInt(), sc.nextInt(), sc.nextInt()};
        Arrays.sort(sides);
        int a = sides[0], b = sides[1], c = sides[2];
        if (a + b > c) System.out.println(0);
        else System.out.println(c - (a + b) + 1);
    }
}"""
        elif to_lang == "javascript":
            return """function solve(input) {
    const [a, b, c] = input.trim().split(' ').map(Number);
    const sides = [a, b, c].sort((x, y) => x - y);
    if (sides[0] + sides[1] > sides[2]) console.log(0);
    else console.log(sides[2] - (sides[0] + sides[1]) + 1);
}"""
    
    # Problem 4: Triangle Path Sum
    if "def minimum_total(triangle)" in code and "dp = triangle[-1][:]" in code:
        if to_lang == "cpp":
            return """#include <vector>
#include <algorithm>
using namespace std;

int minimumTotal(vector<vector<int>>& triangle) {
    int n = triangle.size();
    vector<int> dp = triangle[n-1];
    for (int i = n - 2; i >= 0; i--) {
        for (int j = 0; j < triangle[i].size(); j++) {
            dp[j] = triangle[i][j] + min(dp[j], dp[j+1]);
        }
    }
    return dp[0];
}"""
        elif to_lang == "java":
            return """import java.util.*;

public int minimumTotal(List<List<Integer>> triangle) {
    int n = triangle.size();
    int[] dp = new int[triangle.get(n-1).size()];
    for (int i = 0; i < triangle.get(n-1).size(); i++)
        dp[i] = triangle.get(n-1).get(i);
    for (int i = n - 2; i >= 0; i--) {
        for (int j = 0; j < triangle.get(i).size(); j++) {
            dp[j] = triangle.get(i).get(j) + Math.min(dp[j], dp[j+1]);
        }
    }
    return dp[0];
}"""
        elif to_lang == "javascript":
            return """function minimumTotal(triangle) {
    const n = triangle.length;
    const dp = [...triangle[n - 1]];
    for (let i = n - 2; i >= 0; i--) {
        for (let j = 0; j < triangle[i].length; j++) {
            dp[j] = triangle[i][j] + Math.min(dp[j], dp[j + 1]);
        }
    }
    return dp[0];
}"""
    
    # Problem 5: Min Score Triangulation
    if "def min_score_triangulation(values)" in code:
        if to_lang == "cpp":
            return """#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

int minScoreTriangulation(vector<int>& values) {
    int n = values.size();
    vector<vector<int>> dp(n, vector<int>(n, 0));
    for (int len = 3; len <= n; len++) {
        for (int i = 0; i + len - 1 < n; i++) {
            int j = i + len - 1;
            dp[i][j] = INT_MAX;
            for (int k = i + 1; k < j; k++) {
                int score = dp[i][k] + dp[k][j] + values[i] * values[j] * values[k];
                dp[i][j] = min(dp[i][j], score);
            }
        }
    }
    return dp[0][n-1];
}"""
        elif to_lang == "java":
            return """public int minScoreTriangulation(int[] values) {
    int n = values.length;
    int[][] dp = new int[n][n];
    for (int len = 3; len <= n; len++) {
        for (int i = 0; i + len - 1 < n; i++) {
            int j = i + len - 1;
            dp[i][j] = Integer.MAX_VALUE;
            for (int k = i + 1; k < j; k++) {
                int score = dp[i][k] + dp[k][j] + values[i] * values[j] * values[k];
                dp[i][j] = Math.min(dp[i][j], score);
            }
        }
    }
    return dp[0][n-1];
}"""
        elif to_lang == "javascript":
            return """function minScoreTriangulation(values) {
    const n = values.length;
    const dp = Array.from({ length: n }, () => Array(n).fill(0));
    for (let len = 3; len <= n; len++) {
        for (let i = 0; i + len - 1 < n; i++) {
            const j = i + len - 1;
            dp[i][j] = Infinity;
            for (let k = i + 1; k < j; k++) {
                const score = dp[i][k] + dp[k][j] + values[i] * values[j] * values[k];
                dp[i][j] = Math.min(dp[i][j], score);
            }
        }
    }
    return dp[0][n - 1];
}"""
    
    # Problem 6: Cut the Triangle
    if "def solve()" in code and "input()  # blank line" in code:
        if to_lang == "cpp":
            return """#include <iostream>
#include <set>
#include <vector>
using namespace std;

int main() {
    int t; cin >> t;
    while (t--) {
        cin.ignore();
        vector<pair<int,int>> pts(3);
        for (int i = 0; i < 3; i++)
            cin >> pts[i].first >> pts[i].second;
        
        set<int> xs, ys;
        for (auto& p : pts) {
            xs.insert(p.first);
            ys.insert(p.second);
        }
        
        if (xs.size() < 3 && ys.size() < 3)
            cout << "NO" << endl;
        else
            cout << "YES" << endl;
    }
    return 0;
}"""
        elif to_lang == "java":
            return """import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        while (t-- > 0) {
            int[] xs = new int[3], ys = new int[3];
            for (int i = 0; i < 3; i++) {
                xs[i] = sc.nextInt();
                ys[i] = sc.nextInt();
            }
            Set<Integer> xSet = new HashSet<>(), ySet = new HashSet<>();
            for (int x : xs) xSet.add(x);
            for (int y : ys) ySet.add(y);
            System.out.println(xSet.size() < 3 && ySet.size() < 3 ? "NO" : "YES");
        }
    }
}"""
        elif to_lang == "javascript":
            return """function solve(input) {
    const lines = input.trim().split('\\n');
    let idx = 0;
    const t = parseInt(lines[idx++]);
    for (let _ = 0; _ < t; _++) {
        if (lines[idx] === '') idx++;
        const pts = [];
        for (let i = 0; i < 3; i++)
            pts.push(lines[idx++].split(' ').map(Number));
        const xs = new Set(pts.map(p => p[0]));
        const ys = new Set(pts.map(p => p[1]));
        console.log(xs.size < 3 && ys.size < 3 ? "NO" : "YES");
    }
}"""
    
    return None


def translate_right_triangle(code, from_lang, to_lang, context):
    
    # Section 2.3: is_right = (a*a + b*b) == c*c  (simple one-liner)
    if "is_right = (a*a + b*b) == c*c" in code and len(code) < 80:
        if to_lang == "cpp":
            return """bool isRight = (a*a + b*b) == c*c;"""
        elif to_lang == "java":
            return """boolean isRight = (a*a + b*b) == c*c;"""
        elif to_lang == "javascript":
            return """const isRight = (a*a + b*b) === c*c;"""
    
    # Section 2.3: From coordinates multi-line check
    if "# Check each vertex for right angle" in code:
        if to_lang == "cpp":
            return """// Check each vertex for right angle
long long d2_AB = dist2(A, B);
long long d2_BC = dist2(B, C);
long long d2_CA = dist2(C, A);
bool isRight = (d2_AB + d2_BC == d2_CA) || (d2_BC + d2_CA == d2_AB) || (d2_CA + d2_AB == d2_BC);"""
        elif to_lang == "java":
            return """// Check each vertex for right angle
long d2_AB = dist2(A, B);
long d2_BC = dist2(B, C);
long d2_CA = dist2(C, A);
boolean isRight = (d2_AB + d2_BC == d2_CA) || (d2_BC + d2_CA == d2_AB) || (d2_CA + d2_AB == d2_BC);"""
        elif to_lang == "javascript":
            return """// Check each vertex for right angle
const d2_AB = dist2(A, B);
const d2_BC = dist2(B, C);
const d2_CA = dist2(C, A);
const isRight = (d2_AB + d2_BC === d2_CA) || (d2_BC + d2_CA === d2_AB) || (d2_CA + d2_AB === d2_BC);"""
    
    # Section 2.3: Dot product checks
    if "dot(AB, AC) == 0  # right angle at A" in code:
        if to_lang == "cpp":
            return """dot(AB, AC) == 0;  // right angle at A
dot(BA, BC) == 0;  // right angle at B
dot(CA, CB) == 0;  // right angle at C"""
        elif to_lang == "java":
            return """dot(AB, AC) == 0;  // right angle at A
dot(BA, BC) == 0;  // right angle at B
dot(CA, CB) == 0;  // right angle at C"""
        elif to_lang == "javascript":
            return """dot(AB, AC) === 0;  // right angle at A
dot(BA, BC) === 0;  // right angle at B
dot(CA, CB) === 0;  // right angle at C"""
    
    # Section 2.5: Generate triples
    if "def generate_triples(limit)" in code:
        if to_lang == "cpp":
            return """#include <vector>
#include <algorithm>
#include <numeric>
#include <cmath>
using namespace std;

vector<vector<int>> generateTriples(int limit) {
    vector<vector<int>> triples;
    for (int m = 2; m <= (int)sqrt(limit); m++) {
        for (int n = 1; n < m; n++) {
            if ((m - n) % 2 == 1 && gcd(m, n) == 1) {
                int a = m*m - n*n;
                int b = 2*m*n;
                int c = m*m + n*n;
                if (c <= limit) {
                    vector<int> triple = {a, b, c};
                    sort(triple.begin(), triple.end());
                    triples.push_back(triple);
                }
            }
        }
    }
    return triples;
}"""
        elif to_lang == "java":
            return """import java.util.*;

public class TripleUtils {
    static List<int[]> generateTriples(int limit) {
        List<int[]> triples = new ArrayList<>();
        for (int m = 2; m <= (int)Math.sqrt(limit); m++) {
            for (int n = 1; n < m; n++) {
                if ((m - n) % 2 == 1 && gcd(m, n) == 1) {
                    int a = m*m - n*n;
                    int b = 2*m*n;
                    int c = m*m + n*n;
                    if (c <= limit) {
                        int[] triple = {a, b, c};
                        Arrays.sort(triple);
                        triples.add(triple);
                    }
                }
            }
        }
        return triples;
    }
    
    static int gcd(int a, int b) {
        return b == 0 ? a : gcd(b, a % b);
    }
}"""
        elif to_lang == "javascript":
            return """function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function generateTriples(limit) {
    const triples = [];
    for (let m = 2; m <= Math.sqrt(limit); m++) {
        for (let n = 1; n < m; n++) {
            if ((m - n) % 2 === 1 && gcd(m, n) === 1) {
                const a = m*m - n*n;
                const b = 2*m*n;
                const c = m*m + n*n;
                if (c <= limit) {
                    triples.push([a, b, c].sort((x, y) => x - y));
                }
            }
        }
    }
    return triples;
}"""
    
    # Template 1: Right Triangle Detection
    if "def is_right_triangle(p1, p2, p3)" in code:
        if to_lang == "cpp":
            return """#include <vector>
#include <algorithm>
using namespace std;

int dist2(vector<int>& a, vector<int>& b) {
    int dx = a[0] - b[0], dy = a[1] - b[1];
    return dx*dx + dy*dy;
}

bool isRightTriangle(vector<int>& p1, vector<int>& p2, vector<int>& p3) {
    int d2[] = {dist2(p1, p2), dist2(p2, p3), dist2(p3, p1)};
    sort(d2, d2 + 3);
    return d2[0] + d2[1] == d2[2];
}"""
        elif to_lang == "java":
            return """import java.util.*;

class TriangleUtils {
    static int dist2(int[] a, int[] b) {
        int dx = a[0] - b[0], dy = a[1] - b[1];
        return dx*dx + dy*dy;
    }
    
    static boolean isRightTriangle(int[] p1, int[] p2, int[] p3) {
        int[] d2 = {dist2(p1, p2), dist2(p2, p3), dist2(p3, p1)};
        Arrays.sort(d2);
        return d2[0] + d2[1] == d2[2];
    }
}"""
        elif to_lang == "javascript":
            return """function dist2(a, b) {
    const dx = a[0] - b[0], dy = a[1] - b[1];
    return dx*dx + dy*dy;
}

function isRightTriangle(p1, p2, p3) {
    const d2 = [dist2(p1, p2), dist2(p2, p3), dist2(p3, p1)].sort((x, y) => x - y);
    return d2[0] + d2[1] === d2[2];
}"""
    
    # Template 2: Pythagorean Triples (Euclid's Formula)
    if "def pythagorean_triples(max_c)" in code and "math.gcd" in code:
        if to_lang == "cpp":
            return """#include <vector>
#include <algorithm>
#include <cmath>
#include <numeric>
using namespace std;

vector<vector<int>> pythagoreanTriples(int max_c) {
    vector<vector<int>> triples;
    int limit = sqrt(max_c);
    for (int m = 2; m <= limit; m++) {
        for (int n = 1; n < m; n++) {
            if ((m - n) % 2 == 1 && gcd(m, n) == 1) {
                int a = m*m - n*n;
                int b = 2*m*n;
                int c = m*m + n*n;
                if (c <= max_c) {
                    triples.push_back({a, b, c});
                    int k = 2;
                    while (k * c <= max_c) {
                        triples.push_back({k*a, k*b, k*c});
                        k++;
                    }
                }
            }
        }
    }
    sort(triples.begin(), triples.end());
    return triples;
}"""
        elif to_lang == "java":
            return """import java.util.*;

public class TripleUtils {
    static List<int[]> pythagoreanTriples(int maxC) {
        List<int[]> triples = new ArrayList<>();
        int limit = (int)Math.sqrt(maxC);
        for (int m = 2; m <= limit; m++) {
            for (int n = 1; n < m; n++) {
                if ((m - n) % 2 == 1 && gcd(m, n) == 1) {
                    int a = m*m - n*n;
                    int b = 2*m*n;
                    int c = m*m + n*n;
                    if (c <= maxC) {
                        triples.add(new int[]{a, b, c});
                        int k = 2;
                        while (k * c <= maxC) {
                            triples.add(new int[]{k*a, k*b, k*c});
                            k++;
                        }
                    }
                }
            }
        }
        triples.sort((x, y) -> {
            for (int i = 0; i < 3; i++) if (x[i] != y[i]) return x[i] - y[i];
            return 0;
        });
        return triples;
    }
    
    static int gcd(int a, int b) {
        return b == 0 ? a : gcd(b, a % b);
    }
}"""
        elif to_lang == "javascript":
            return """function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function pythagoreanTriples(maxC) {
    const triples = [];
    const limit = Math.floor(Math.sqrt(maxC));
    for (let m = 2; m <= limit; m++) {
        for (let n = 1; n < m; n++) {
            if ((m - n) % 2 === 1 && gcd(m, n) === 1) {
                let a = m*m - n*n;
                let b = 2*m*n;
                let c = m*m + n*n;
                if (c <= maxC) {
                    triples.push([a, b, c]);
                    let k = 2;
                    while (k * c <= maxC) {
                        triples.push([k*a, k*b, k*c]);
                        k++;
                    }
                }
            }
        }
    }
    return triples.sort((x, y) => x[0] - y[0] || x[1] - y[1] || x[2] - y[2]);
}"""
    
    # Template 3: Count Right Triangles from Points
    if "def count_right_triangles(points)" in code:
        if to_lang == "cpp":
            return """#include <vector>
#include <map>
#include <numeric>
#include <algorithm>
using namespace std;

int countRightTriangles(vector<pair<int,int>>& points) {
    int n = points.size(), count = 0;
    for (int i = 0; i < n; i++) {
        map<pair<int,int>, int> slopes;
        for (int j = 0; j < n; j++) {
            if (i == j) continue;
            int dx = points[j].first - points[i].first;
            int dy = points[j].second - points[i].second;
            int g = gcd(dx, dy);
            dx /= g; dy /= g;
            if (dx < 0 || (dx == 0 && dy < 0)) { dx = -dx; dy = -dy; }
            slopes[{dx, dy}]++;
        }
        for (auto& [vec, c] : slopes) {
            auto [dx, dy] = vec;
            int px = -dy, py = dx;
            if (px < 0 || (px == 0 && py < 0)) { px = -px; py = -py; }
            if (slopes.count({px, py}))
                count += c * slopes[{px, py}];
        }
    }
    return count / 2;
}"""
        elif to_lang == "java":
            return """import java.util.*;

public class TriangleUtils {
    static int countRightTriangles(int[][] points) {
        int n = points.length, count = 0;
        for (int i = 0; i < n; i++) {
            Map<String, Integer> slopes = new HashMap<>();
            for (int j = 0; j < n; j++) {
                if (i == j) continue;
                int dx = points[j][0] - points[i][0];
                int dy = points[j][1] - points[i][1];
                int g = gcd(dx, dy);
                dx /= g; dy /= g;
                if (dx < 0 || (dx == 0 && dy < 0)) { dx = -dx; dy = -dy; }
                String key = dx + "," + dy;
                slopes.put(key, slopes.getOrDefault(key, 0) + 1);
            }
            for (Map.Entry<String, Integer> e : slopes.entrySet()) {
                String[] parts = e.getKey().split(",");
                int dx = Integer.parseInt(parts[0]);
                int dy = Integer.parseInt(parts[1]);
                int px = -dy, py = dx;
                if (px < 0 || (px == 0 && py < 0)) { px = -px; py = -py; }
                String perpKey = px + "," + py;
                if (slopes.containsKey(perpKey))
                    count += e.getValue() * slopes.get(perpKey);
            }
        }
        return count / 2;
    }
    
    static int gcd(int a, int b) {
        return b == 0 ? a : gcd(b, a % b);
    }
}"""
        elif to_lang == "javascript":
            return """function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function countRightTriangles(points) {
    const n = points.length;
    let count = 0;
    for (let i = 0; i < n; i++) {
        const slopes = new Map();
        for (let j = 0; j < n; j++) {
            if (i === j) continue;
            let dx = points[j][0] - points[i][0];
            let dy = points[j][1] - points[i][1];
            const g = gcd(dx, dy);
            dx /= g; dy /= g;
            if (dx < 0 || (dx === 0 && dy < 0)) { dx = -dx; dy = -dy; }
            const key = dx + ',' + dy;
            slopes.set(key, (slopes.get(key) || 0) + 1);
        }
        for (const [key, c] of slopes) {
            const [dx, dy] = key.split(',').map(Number);
            let px = -dy, py = dx;
            if (px < 0 || (px === 0 && py < 0)) { px = -px; py = -py; }
            const perpKey = px + ',' + py;
            if (slopes.has(perpKey))
                count += c * slopes.get(perpKey);
        }
    }
    return count / 2;
}"""
    
    # Template 4: Find Pythagorean Triples with Given Sum
    if "def find_triple_with_sum(target)" in code:
        if to_lang == "cpp":
            return """#include <tuple>
#include <optional>
using namespace std;

optional<tuple<int,int,int>> findTripleWithSum(int target) {
    for (int a = 1; a < target / 3; a++) {
        for (int b = a + 1; b < target / 2; b++) {
            int c = target - a - b;
            if (a*a + b*b == c*c)
                return make_tuple(a, b, c);
        }
    }
    return nullopt;
}"""
        elif to_lang == "java":
            return """import java.util.*;

public class TripleUtils {
    static int[] findTripleWithSum(int target) {
        for (int a = 1; a < target / 3; a++) {
            for (int b = a + 1; b < target / 2; b++) {
                int c = target - a - b;
                if (a*a + b*b == c*c)
                    return new int[]{a, b, c};
            }
        }
        return null;
    }
}"""
        elif to_lang == "javascript":
            return """function findTripleWithSum(target) {
    for (let a = 1; a < target / 3; a++) {
        for (let b = a + 1; b < target / 2; b++) {
            const c = target - a - b;
            if (a*a + b*b === c*c) return [a, b, c];
        }
    }
    return null;
}"""
    
    # Problem 1: Pythagorean Theorem (CodeAbbey)
    if "def solve()" in code and "result.append(f\"{c:.10f}\")" in code:
        if to_lang == "cpp":
            return """#include <iostream>
#include <vector>
#include <cmath>
#include <iomanip>
using namespace std;

int main() {
    int n; cin >> n;
    vector<double> results;
    for (int i = 0; i < n; i++) {
        int a, b; cin >> a >> b;
        double c = sqrt(a*a + b*b);
        results.push_back(c);
    }
    for (double r : results)
        cout << fixed << setprecision(10) << r << " ";
    cout << endl;
    return 0;
}"""
        elif to_lang == "java":
            return """import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        List<Double> results = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            int a = sc.nextInt(), b = sc.nextInt();
            results.add(Math.sqrt(a*a + b*b));
        }
        for (double r : results)
            System.out.printf("%.10f ", r);
        System.out.println();
    }
}"""
        elif to_lang == "javascript":
            return """function solve(input) {
    const nums = input.trim().split(/\\s+/).map(Number);
    const n = nums[0];
    const results = [];
    for (let i = 0; i < n; i++) {
        const a = nums[1 + 2*i], b = nums[2 + 2*i];
        results.push(Math.sqrt(a*a + b*b).toFixed(10));
    }
    console.log(results.join(' '));
}"""
    
    # Problem 2: Special Pythagorean Triplet
    if "def solve()" in code and "for a in range(1, 334)" in code:
        if to_lang == "cpp":
            return """#include <iostream>
using namespace std;

int solve() {
    for (int a = 1; a < 334; a++) {
        for (int b = a + 1; b < 500; b++) {
            int c = 1000 - a - b;
            if (c <= b) continue;
            if (a*a + b*b == c*c) return a * b * c;
        }
    }
    return -1;
}

int main() {
    cout << solve() << endl;
    return 0;
}"""
        elif to_lang == "java":
            return """public class Main {
    public static void main(String[] args) {
        System.out.println(solve());
    }
    
    static int solve() {
        for (int a = 1; a < 334; a++) {
            for (int b = a + 1; b < 500; b++) {
                int c = 1000 - a - b;
                if (c <= b) continue;
                if (a*a + b*b == c*c) return a * b * c;
            }
        }
        return -1;
    }
}"""
        elif to_lang == "javascript":
            return """function solve() {
    for (let a = 1; a < 334; a++) {
        for (let b = a + 1; b < 500; b++) {
            const c = 1000 - a - b;
            if (c <= b) continue;
            if (a*a + b*b === c*c) return a * b * c;
        }
    }
    return -1;
}
console.log(solve());"""
    
    # Problem 3: CF 707C
    if "n = int(input())" in code and "if n <= 2:" in code and "elif n % 2 == 0:" in code:
        if to_lang == "cpp":
            return """#include <iostream>
using namespace std;

int main() {
    long long n; cin >> n;
    if (n <= 2) cout << -1 << endl;
    else if (n % 2 == 0) {
        long long k = n / 2;
        cout << k*k - 1 << " " << k*k + 1 << endl;
    } else {
        long long m = (n*n - 1) / 2;
        cout << m << " " << m + 1 << endl;
    }
    return 0;
}"""
        elif to_lang == "java":
            return """import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long n = sc.nextLong();
        if (n <= 2) System.out.println(-1);
        else if (n % 2 == 0) {
            long k = n / 2;
            System.out.println((k*k - 1) + " " + (k*k + 1));
        } else {
            long m = (n*n - 1) / 2;
            System.out.println(m + " " + (m + 1));
        }
    }
}"""
        elif to_lang == "javascript":
            return """function solve(input) {
    const n = BigInt(input.trim());
    if (n <= 2n) console.log(-1);
    else if (n % 2n === 0n) {
        const k = n / 2n;
        console.log((k*k - 1n) + ' ' + (k*k + 1n));
    } else {
        const m = (n*n - 1n) / 2n;
        console.log(m + ' ' + (m + 1n));
    }
}"""
    
    # Problem 4: CF 304A - need javascript (cpp/java already exist)
    if "import math" in code and "n = int(input())" in code and "count = 0" in code:
        if to_lang == "javascript":
            return """const n = parseInt(require('fs').readFileSync('/dev/stdin', 'utf8').trim());
let count = 0;
for (let a = 1; a <= n; a++) {
    for (let b = a; b <= n; b++) {
        const c2 = a*a + b*b;
        const c = Math.floor(Math.sqrt(c2));
        if (c*c === c2 && c <= n) count++;
    }
}
console.log(count);"""
    
    # Problem 5: Project Euler #91
    if "def solve()" in code and "count = N * N" in code:
        if to_lang == "cpp":
            return """#include <iostream>
#include <cmath>
#include <algorithm>
using namespace std;

int main() {
    int N; cin >> N;
    long long count = 1LL * N * N;
    
    for (int px = 0; px <= N; px++) {
        for (int py = 0; py <= N; py++) {
            if (px == 0 && py == 0) continue;
            int g = __gcd(px, py);
            int dx = -py / g, dy = px / g;
            
            double min_t = -1e18, max_t = 1e18;
            if (dx > 0) {
                min_t = max(min_t, (double)-px / dx);
                max_t = min(max_t, (double)(N - px) / dx);
            } else if (dx < 0) {
                min_t = max(min_t, (double)(N - px) / dx);
                max_t = min(max_t, (double)-px / dx);
            } else {
                if (dy > 0) {
                    min_t = max(min_t, (double)-py / dy);
                    max_t = min(max_t, (double)(N - py) / dy);
                } else {
                    min_t = max(min_t, (double)(N - py) / dy);
                    max_t = min(max_t, (double)-py / dy);
                }
            }
            
            int t_start = ceil(min_t);
            int t_end = floor(max_t);
            if (t_start < 0) t_start = 0;
            int t_vals = max(0, t_end - t_start + 1);
            if (t_start == 0) t_vals--;  // exclude Q = O
            count += max(0, t_vals);
        }
    }
    cout << count / 2 << endl;
    return 0;
}"""
        elif to_lang == "java":
            return """import java.util.*;

public class Main {
    static int gcd(int a, int b) {
        return b == 0 ? a : gcd(b, a % b);
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt();
        long count = 1L * N * N;
        
        for (int px = 0; px <= N; px++) {
            for (int py = 0; py <= N; py++) {
                if (px == 0 && py == 0) continue;
                int g = gcd(px, py);
                int dx = -py / g, dy = px / g;
                
                double minT = -1e18, maxT = 1e18;
                if (dx > 0) {
                    minT = Math.max(minT, (double)-px / dx);
                    maxT = Math.min(maxT, (double)(N - px) / dx);
                } else if (dx < 0) {
                    minT = Math.max(minT, (double)(N - px) / dx);
                    maxT = Math.min(maxT, (double)-px / dx);
                } else {
                    if (dy > 0) {
                        minT = Math.max(minT, (double)-py / dy);
                        maxT = Math.min(maxT, (double)(N - py) / dy);
                    } else {
                        minT = Math.max(minT, (double)(N - py) / dy);
                        maxT = Math.min(maxT, (double)-py / dy);
                    }
                }
                
                int tStart = (int)Math.ceil(minT);
                int tEnd = (int)Math.floor(maxT);
                int tVals = Math.max(0, tEnd - tStart + 1);
                if (tStart <= 0 && 0 <= tEnd) tVals--;  // exclude Q = O
                count += Math.max(0, tVals);
            }
        }
        System.out.println(count / 2);
    }
}"""
        elif to_lang == "javascript":
            return """function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function solve(input) {
    const N = parseInt(input.trim());
    let count = N * N;
    
    for (let px = 0; px <= N; px++) {
        for (let py = 0; py <= N; py++) {
            if (px === 0 && py === 0) continue;
            const g = gcd(px, py);
            const dx = -py / g, dy = px / g;
            
            let minT = -Infinity, maxT = Infinity;
            if (dx > 0) {
                minT = Math.max(minT, -px / dx);
                maxT = Math.min(maxT, (N - px) / dx);
            } else if (dx < 0) {
                minT = Math.max(minT, (N - px) / dx);
                maxT = Math.min(maxT, -px / dx);
            } else {
                if (dy > 0) {
                    minT = Math.max(minT, -py / dy);
                    maxT = Math.min(maxT, (N - py) / dy);
                } else {
                    minT = Math.max(minT, (N - py) / dy);
                    maxT = Math.min(maxT, -py / dy);
                }
            }
            
            const tStart = Math.ceil(minT);
            const tEnd = Math.floor(maxT);
            let tVals = Math.max(0, tEnd - tStart + 1);
            if (tStart <= 0 && 0 <= tEnd) tVals--;
            count += Math.max(0, tVals);
        }
    }
    console.log(Math.floor(count / 2));
}"""
    
    # Problem 6: LeetCode 3128
    if "def number_of_right_triangles(grid)" in code:
        if to_lang == "cpp":
            return """long long numberOfRightTriangles(vector<vector<int>>& grid) {
    int m = grid.size(), n = grid[0].size();
    vector<int> rowCnt(m, 0), colCnt(n, 0);
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            if (grid[i][j]) { rowCnt[i]++; colCnt[j]++; }
    
    long long ans = 0;
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            if (grid[i][j])
                ans += (rowCnt[i] - 1) * (colCnt[j] - 1);
    return ans;
}"""
        elif to_lang == "java":
            return """public long numberOfRightTriangles(int[][] grid) {
    int m = grid.length, n = grid[0].length;
    int[] rowCnt = new int[m], colCnt = new int[n];
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            if (grid[i][j] == 1) { rowCnt[i]++; colCnt[j]++; }
    
    long ans = 0;
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            if (grid[i][j] == 1)
                ans += (rowCnt[i] - 1) * (colCnt[j] - 1);
    return ans;
}"""
        elif to_lang == "javascript":
            return """function numberOfRightTriangles(grid) {
    const m = grid.length, n = grid[0].length;
    const rowCnt = Array(m).fill(0), colCnt = Array(n).fill(0);
    for (let i = 0; i < m; i++)
        for (let j = 0; j < n; j++)
            if (grid[i][j]) { rowCnt[i]++; colCnt[j]++; }
    
    let ans = 0;
    for (let i = 0; i < m; i++)
        for (let j = 0; j < n; j++)
            if (grid[i][j])
                ans += (rowCnt[i] - 1) * (colCnt[j] - 1);
    return ans;
}"""
    
    return None


def translate_rect_square(code, from_lang, to_lang, context):
    
    # Template 5.1: Rectangle Intersection - need javascript
    if "def intersect_rect(r1, r2)" in code:
        if to_lang == "javascript":
            return """function intersectRect(r1, r2) {
    const x1 = Math.max(r1[0], r2[0]), y1 = Math.max(r1[1], r2[1]);
    const x2 = Math.min(r1[2], r2[2]), y2 = Math.min(r1[3], r2[3]);
    if (x1 < x2 && y1 < y2) return [x1, y1, x2, y2];
    return null;
}"""
    
    # Template 5.2: Point-in-Rectangle Test
    if "def point_in_rect(px, py, r)" in code:
        if to_lang == "cpp":
            return """bool pointInRect(int px, int py, vector<int>& r) {
    return r[0] <= px && px <= r[2] && r[1] <= py && py <= r[3];
}"""
        elif to_lang == "java":
            return """public boolean pointInRect(int px, int py, int[] r) {
    return r[0] <= px && px <= r[2] && r[1] <= py && py <= r[3];
}"""
        elif to_lang == "javascript":
            return """function pointInRect(px, py, r) {
    return r[0] <= px && px <= r[2] && r[1] <= py && py <= r[3];
}"""
    
    # Template 5.3: Union Area
    if "def rect_union_area(rects)" in code:
        if to_lang == "cpp":
            return """#include <vector>
#include <algorithm>
#include <set>
using namespace std;

long long rectUnionArea(vector<vector<int>>& rects) {
    vector<tuple<int,int,int,int>> events;
    for (auto& r : rects) {
        events.push_back({r[0], r[1], r[2], 1});
        events.push_back({r[2], r[1], r[3], -1});
    }
    sort(events.begin(), events.end());
    
    vector<pair<int,int>> active;
    int prev_x = get<0>(events[0]);
    long long area = 0;
    
    for (auto& [x, y1, y2, typ] : events) {
        long long covered = 0;
        sort(active.begin(), active.end());
        int cur = -1e9;
        for (auto& [ly, ry] : active) {
            if (ly > cur) {
                covered += ry - ly;
                cur = ry;
            } else {
                covered += max(0, ry - cur);
                cur = max(cur, ry);
            }
        }
        area += covered * (x - prev_x);
        
        if (typ == 1) active.push_back({y1, y2});
        else active.erase(find(active.begin(), active.end(), make_pair(y1, y2)));
        prev_x = x;
    }
    return area;
}"""
        elif to_lang == "java":
            return """import java.util.*;

public class RectUtils {
    static long rectUnionArea(int[][] rects) {
        List<int[]> events = new ArrayList<>();
        for (int[] r : rects) {
            events.add(new int[]{r[0], r[1], r[2], 1});
            events.add(new int[]{r[2], r[1], r[3], -1});
        }
        events.sort((a, b) -> a[0] - b[0]);
        
        List<int[]> active = new ArrayList<>();
        int prevX = events.get(0)[0];
        long area = 0;
        
        for (int[] e : events) {
            int x = e[0], y1 = e[1], y2 = e[2], typ = e[3];
            long covered = 0;
            active.sort((a, b) -> a[0] - b[0]);
            int cur = Integer.MIN_VALUE;
            for (int[] seg : active) {
                if (seg[0] > cur) {
                    covered += seg[1] - seg[0];
                    cur = seg[1];
                } else {
                    covered += Math.max(0, seg[1] - cur);
                    cur = Math.max(cur, seg[1]);
                }
            }
            area += covered * (x - prevX);
            
            if (typ == 1) active.add(new int[]{y1, y2});
            else active.removeIf(a -> a[0] == y1 && a[1] == y2);
            prevX = x;
        }
        return area;
    }
}"""
        elif to_lang == "javascript":
            return """function rectUnionArea(rects) {
    const events = [];
    for (const [x1, y1, x2, y2] of rects) {
        events.push([x1, y1, y2, 1]);
        events.push([x2, y1, y2, -1]);
    }
    events.sort((a, b) => a[0] - b[0]);
    
    let active = [];
    let prevX = events[0][0];
    let area = 0;
    
    for (const [x, y1, y2, typ] of events) {
        active.sort((a, b) => a[0] - b[0]);
        let covered = 0;
        let cur = -Infinity;
        for (const [ly, ry] of active) {
            if (ly > cur) {
                covered += ry - ly;
                cur = ry;
            } else {
                covered += Math.max(0, ry - cur);
                cur = Math.max(cur, ry);
            }
        }
        area += covered * (x - prevX);
        
        if (typ === 1) active.push([y1, y2]);
        else {
            const idx = active.findIndex(a => a[0] === y1 && a[1] === y2);
            if (idx >= 0) active.splice(idx, 1);
        }
        prevX = x;
    }
    return area;
}"""
    
    # Template 5.4: Largest Rectangle in Binary Matrix
    if "def largest_rectangle(matrix)" in code and "heights" in code:
        if to_lang == "cpp":
            return """#include <vector>
#include <stack>
#include <algorithm>
using namespace std;

int largestRectangle(vector<vector<int>>& matrix) {
    if (matrix.empty() || matrix[0].empty()) return 0;
    int n = matrix[0].size();
    vector<int> heights(n, 0);
    int maxArea = 0;
    
    for (auto& row : matrix) {
        for (int i = 0; i < n; i++)
            heights[i] = row[i] == 1 ? heights[i] + 1 : 0;
        
        stack<int> st;
        for (int i = 0; i <= n; i++) {
            int h = (i < n) ? heights[i] : 0;
            while (!st.empty() && heights[st.top()] > h) {
                int height = heights[st.top()]; st.pop();
                int left = st.empty() ? -1 : st.top();
                maxArea = max(maxArea, height * (i - left - 1));
            }
            st.push(i);
        }
    }
    return maxArea;
}"""
        elif to_lang == "java":
            return """import java.util.*;

public class RectUtils {
    public int largestRectangle(int[][] matrix) {
        if (matrix.length == 0 || matrix[0].length == 0) return 0;
        int n = matrix[0].length;
        int[] heights = new int[n];
        int maxArea = 0;
        
        for (int[] row : matrix) {
            for (int i = 0; i < n; i++)
                heights[i] = row[i] == 1 ? heights[i] + 1 : 0;
            
            Stack<Integer> st = new Stack<>();
            for (int i = 0; i <= n; i++) {
                int h = (i < n) ? heights[i] : 0;
                while (!st.isEmpty() && heights[st.peek()] > h) {
                    int height = heights[st.pop()];
                    int left = st.isEmpty() ? -1 : st.peek();
                    maxArea = Math.max(maxArea, height * (i - left - 1));
                }
                st.push(i);
            }
        }
        return maxArea;
    }
}"""
        elif to_lang == "javascript":
            return """function largestRectangle(matrix) {
    if (!matrix.length || !matrix[0].length) return 0;
    const n = matrix[0].length;
    const heights = Array(n).fill(0);
    let maxArea = 0;
    
    for (const row of matrix) {
        for (let i = 0; i < n; i++)
            heights[i] = row[i] === 1 ? heights[i] + 1 : 0;
        
        const stack = [];
        for (let i = 0; i <= n; i++) {
            const h = i < n ? heights[i] : 0;
            while (stack.length && heights[stack[stack.length - 1]] > h) {
                const height = heights[stack.pop()];
                const left = stack.length ? stack[stack.length - 1] : -1;
                maxArea = Math.max(maxArea, height * (i - left - 1));
            }
            stack.push(i);
        }
    }
    return maxArea;
}"""
    
    # Template 5.5: Square Detection
    if "def is_square(p1, p2, p3, p4)" in code:
        if to_lang == "cpp":
            return """#include <vector>
#include <algorithm>
using namespace std;

int dist2(vector<int>& a, vector<int>& b) {
    int dx = a[0] - b[0], dy = a[1] - b[1];
    return dx*dx + dy*dy;
}

bool isSquare(vector<int>& p1, vector<int>& p2, vector<int>& p3, vector<int>& p4) {
    int d[] = {
        dist2(p1, p2), dist2(p1, p3), dist2(p1, p4),
        dist2(p2, p3), dist2(p2, p4), dist2(p3, p4)
    };
    sort(d, d + 6);
    return d[0] == d[1] && d[1] == d[2] && d[2] == d[3] && d[4] == d[5]
           && d[0] > 0 && d[4] > d[0];
}"""
        elif to_lang == "java":
            return """import java.util.*;

class SquareUtils {
    static int dist2(int[] a, int[] b) {
        int dx = a[0] - b[0], dy = a[1] - b[1];
        return dx*dx + dy*dy;
    }
    
    static boolean isSquare(int[] p1, int[] p2, int[] p3, int[] p4) {
        int[] d = {
            dist2(p1, p2), dist2(p1, p3), dist2(p1, p4),
            dist2(p2, p3), dist2(p2, p4), dist2(p3, p4)
        };
        Arrays.sort(d);
        return d[0] == d[1] && d[1] == d[2] && d[2] == d[3] && d[4] == d[5]
               && d[0] > 0 && d[4] > d[0];
    }
}"""
        elif to_lang == "javascript":
            return """function dist2(a, b) {
    const dx = a[0] - b[0], dy = a[1] - b[1];
    return dx*dx + dy*dy;
}

function isSquare(p1, p2, p3, p4) {
    const d = [
        dist2(p1, p2), dist2(p1, p3), dist2(p1, p4),
        dist2(p2, p3), dist2(p2, p4), dist2(p3, p4)
    ].sort((a, b) => a - b);
    return d[0] === d[1] && d[1] === d[2] && d[2] === d[3] && d[4] === d[5]
           && d[0] > 0 && d[4] > d[0];
}"""
    
    # Problem 1: Rectangle Overlap - need javascript
    if "def is_rectangle_overlap(rec1, rec2)" in code:
        if to_lang == "javascript":
            return """function isRectangleOverlap(rec1, rec2) {
    return (rec1[0] < rec2[2] && rec2[0] < rec1[2] &&
            rec1[1] < rec2[3] && rec2[1] < rec1[3]);
}"""
    
    # Problem 2: Largest Rectangle in Histogram - need javascript
    if "def largest_rectangle_area(heights)" in code and "sentinel" in code:
        if to_lang == "javascript":
            return """function largestRectangleArea(heights) {
    heights.push(0);
    const stack = [];
    let maxArea = 0;
    
    for (let i = 0; i < heights.length; i++) {
        while (stack.length && heights[stack[stack.length - 1]] > heights[i]) {
            const height = heights[stack.pop()];
            const left = stack.length ? stack[stack.length - 1] : -1;
            maxArea = Math.max(maxArea, height * (i - left - 1));
        }
        stack.push(i);
    }
    
    return maxArea;
}"""
    
    # Problem 3: Maximal Square
    if "def maximal_square(matrix)" in code:
        if to_lang == "cpp":
            return """#include <vector>
#include <algorithm>
using namespace std;

int maximalSquare(vector<vector<int>>& matrix) {
    if (matrix.empty() || matrix[0].empty()) return 0;
    int m = matrix.size(), n = matrix[0].size();
    vector<vector<int>> dp(m, vector<int>(n, 0));
    int maxSide = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (matrix[i][j] == 1) {
                if (i == 0 || j == 0) dp[i][j] = 1;
                else {
                    dp[i][j] = 1 + min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]});
                }
                maxSide = max(maxSide, dp[i][j]);
            }
        }
    }
    return maxSide * maxSide;
}"""
        elif to_lang == "java":
            return """public int maximalSquare(int[][] matrix) {
    if (matrix.length == 0 || matrix[0].length == 0) return 0;
    int m = matrix.length, n = matrix[0].length;
    int[][] dp = new int[m][n];
    int maxSide = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (matrix[i][j] == 1) {
                if (i == 0 || j == 0) dp[i][j] = 1;
                else {
                    dp[i][j] = 1 + Math.min(dp[i-1][j], Math.min(dp[i][j-1], dp[i-1][j-1]));
                }
                maxSide = Math.max(maxSide, dp[i][j]);
            }
        }
    }
    return maxSide * maxSide;
}"""
        elif to_lang == "javascript":
            return """function maximalSquare(matrix) {
    if (!matrix.length || !matrix[0].length) return 0;
    const m = matrix.length, n = matrix[0].length;
    const dp = Array.from({ length: m }, () => Array(n).fill(0));
    let maxSide = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 1) {
                if (i === 0 || j === 0) dp[i][j] = 1;
                else {
                    dp[i][j] = 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
                }
                maxSide = Math.max(maxSide, dp[i][j]);
            }
        }
    }
    return maxSide * maxSide;
}"""
    
    return None


# ──────────────────────────────────────────────
# RUN
# ──────────────────────────────────────────────

if __name__ == "__main__":
    total_all = 0
    for fp in FILES:
        total_all += process_file(fp)
    print(f"\nTotal new code blocks inserted across all files: {total_all}")
