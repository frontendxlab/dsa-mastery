# Geometry and Shape Problems in Data Structures and Algorithms

## Chapter 12: Area and Perimeter

---

### 1. INTRODUCTION

Area and perimeter are the most fundamental measurements of any geometric shape. Area tells you how much space a shape covers (think: how much paint you need to cover a wall). Perimeter tells you the length of the boundary around a shape (think: how much fencing you need to enclose a garden).

In the real world, area and perimeter problems show up everywhere:
- **Graphics engines** calculate pixel coverage
- **Robotics** computes obstacle footprints
- **Urban planning** measures land lots
- **Game development** detects region overlaps
- **Computer vision** segments object boundaries

At its core, every area/perimeter problem boils down to: **given points and edges defining a shape (or shapes), what space do they occupy, and what is the length of their boundary?**

In DSA interviews and competitive programming, these problems appear as:
- Grid-based shapes (islands in binary matrices)
- Polygon area via coordinate formulas
- Region merging and overlap
- Surface area of 3D shapes projected onto 2D
- Cutting shapes and computing remaining area

The beautiful thing about area and perimeter problems: they are visual. You can draw them. And once you understand the formulas, the code is often surprisingly short.

---

### 2. CORE CONCEPTS

#### 2.1 Area of Basic Shapes

**Rectangle:** `A = width × height`

**Triangle:** `A = ½ × base × height`
- For triangles given by coordinates: Shoelace formula (see below)

**Circle:** `A = π × r²`

**Trapezoid:** `A = ½ × (a + b) × h` where a, b are parallel sides

#### 2.2 Perimeter of Basic Shapes

**Rectangle:** `P = 2 × (width + height)`

**Triangle:** `P = side1 + side2 + side3`

**Circle (Circumference):** `C = 2πr`

**General Polygon:** Sum of Euclidean distances between consecutive vertices

#### 2.3 The Shoelace Formula (Surveyor's Formula)

Given a polygon with vertices `(x₁, y₁), (x₂, y₂), ..., (xₙ, yₙ)` in order:

```
Area = ½ × | Σ(xᵢ × yᵢ₊₁ - xᵢ₊₁ × yᵢ) |
```

where indices wrap around (vertex n+1 = vertex 1).

**Why it works:** The formula computes the sum of cross products of consecutive edge vectors. Geometrically, each term `xᵢ·yᵢ₊₁ - xᵢ₊₁·yᵢ` represents twice the signed area of the triangle formed by the origin and the edge from vertex i to vertex i+1. When summed around the polygon, interior contributions cancel, leaving exactly twice the polygon's area.

**Key insight:** The sign tells you vertex orientation. Positive = counterclockwise, negative = clockwise. Take absolute value for area.

#### 2.4 Heron's Formula for Triangle Area

Given three side lengths a, b, c:

```
s = (a + b + c) / 2
Area = √(s × (s - a) × (s - b) × (s - c))
```

#### 2.5 Area of Intersecting Rectangles

Given two axis-aligned rectangles `(x₁, y₁, x₂, y₂)` and `(x₃, y₃, x₄, y₄)`:

```
overlap_x = max(0, min(x₂, x₄) - max(x₁, x₃))
overlap_y = max(0, min(y₂, y₄) - max(y₁, y₃))
overlap_area = overlap_x × overlap_y
```

**Intuition:** The overlap rectangle's left edge is the rightmost of the two left edges. Its right edge is the leftmost of the two right edges. If the result is negative, they don't overlap.

#### 2.6 Island Perimeter in Grids

For a grid of 1s (land) and 0s (water), the perimeter of each land cell starts at 4 and loses 1 for each adjacent land cell (up, down, left, right).

```
perimeter = Σ(4 - adjacent_land_count) for each land cell
```

#### 2.7 Union Area of Rectangles (Sweep Line)

When multiple rectangles overlap, computing the union area requires:
1. **Sweep line** approach: sort events by x-coordinate
2. Maintain active y-intervals using a segment tree
3. At each x-step: `area += (x_next - x_current) × total_active_y_length`

This is a classic application of line sweep + interval union tracking, typically O(N log N).

---

### 3. PROBLEM RECOGNITION

**Keywords that signal area/perimeter problems:**
- "area", "perimeter", "surface area", "volume"
- "maximize area", "minimum area", "enclosing"
- "overlap", "intersection", "union"
- "island", "region", "enclosure"
- "cover", "fill", "occupied"
- "cut", "split", "partition"
- "fence", "boundary", "border"

**Hidden indicators:**
- Binary matrices where 1s represent shapes
- Grid problems asking for "number of boundary cells"
- Problems about "maximizing land" or "minimum bounding box"
- Coordinate pairs where you need the shape they define
- Problems about "painting" or "covering" regions

**How interviewers frame these:**
- "Given N rectangles, find the total area covered by at least one of them"
- "Find the perimeter of the shape formed by 1s in a binary matrix"
- "Given points, find the largest triangle area"
- "What is the minimum area rectangle that encloses all points?"
- "How much surface area do stacked cubes have?"

---

### 4. PATTERN ANALYSIS

#### Pattern 1: Grid-Based Perimeter/Area

**When to use:** Binary matrix with connected components or isolated 1s.

**Why it works:** Grid cells have a natural coordinate system. Each cell contributes 4 to perimeter minus 1 for each neighbor. Area is just counting 1s or running DFS/BFS on connected components.

**Complexity:** O(R×C) for the grid, O(R×C) for BFS/DFS flood fill.

**Common mistake:** Forgetting diagonal adjacency doesn't count as touching for perimeter reduction.

#### Pattern 2: Polygon Area from Coordinates

**When to use:** Problems that give you vertices of a polygon (possibly self-intersecting, but usually simple).

**Why it works:** The shoelace formula works for ANY simple polygon, convex or concave.

**Complexity:** O(N) for N vertices.

**Common mistake:** Vertices must be in order (clockwise or counterclockwise). Out-of-order vertices produce garbage.

#### Pattern 3: Rectangle Overlap / Union

**When to use:** Multiple axis-aligned rectangles, need total covered area or overlap detection.

**Why it works:** Axis-aligned rectangles decompose naturally into x-events (start/end). The active y-intervals can be managed with a segment tree or interval merging.

**Complexity:** O(N log N) with segment tree.

**Common mistake:** Integer overflow with coordinate multiplication. Use 64-bit integers.

#### Pattern 4: Surface Area of Stacked Shapes

**When to use:** 3D shapes described by a 2D grid of heights (like LeetCode 928).

**Why it works:** Each column contributes `4 × height + 2` (top and bottom) minus `2 × min(h1, h2)` for each shared face with a neighbor.

**Complexity:** O(R×C) to compute.

**Common mistake:** Forgetting the bottom face or double-counting hidden faces.

#### Pattern 5: Maximum Area After Cuts

**When to use:** "Cut a cake/rectangle along given lines, find largest piece area."

**Why it works:** The largest piece after cuts is determined by the largest gap between consecutive horizontal cuts × largest gap between consecutive vertical cuts.

**Complexity:** O(H log H + V log V) sorting + O(H + V) scanning.

**Common mistake:** Not including the edges (0 and max dimension) as implicit cut positions.

---

### 5. REUSABLE CODING TEMPLATES

#### Template 1: Shoelace Formula (Polygon Area)

```python
def polygon_area(vertices):
    """Area of a simple polygon given as list of (x, y) points in order."""
    n = len(vertices)
    area = 0
    for i in range(n):
        x1, y1 = vertices[i]
        x2, y2 = vertices[(i + 1) % n]
        area += x1 * y2 - x2 * y1
    return abs(area) / 2.0
```

```cpp
double polygon_area(vector<pair<double, double>>& vertices) {
    int n = vertices.size();
    double area = 0;
    for (int i = 0; i < n; i++) {
        auto [x1, y1] = vertices[i];
        auto [x2, y2] = vertices[(i + 1) % n];
        area += x1 * y2 - x2 * y1;
    }
    return abs(area) / 2.0;
}
```

```java
public static double polygonArea(int[][] vertices) {
    int n = vertices.length;
    long area = 0;
    for (int i = 0; i < n; i++) {
        int x1 = vertices[i][0], y1 = vertices[i][1];
        int x2 = vertices[(i + 1) % n][0], y2 = vertices[(i + 1) % n][1];
        area += (long) x1 * y2 - (long) x2 * y1;
    }
    return Math.abs(area) / 2.0;
}
```

#### Template 2: Rectangle Overlap Area

```python
def overlap_area(r1, r2):
    """Rectangles as (x1, y1, x2, y2) where (x1,y1) is bottom-left and (x2,y2) is top-right."""
    x_overlap = max(0, min(r1[2], r2[2]) - max(r1[0], r2[0]))
    y_overlap = max(0, min(r1[3], r2[3]) - max(r1[1], r2[1]))
    return x_overlap * y_overlap
```

```cpp
long long overlap_area(vector<int>& r1, vector<int>& r2) {
    long long x = max(0, min(r1[2], r2[2]) - max(r1[0], r2[0]));
    long long y = max(0, min(r1[3], r2[3]) - max(r1[1], r2[1]));
    return x * y;
}
```

```java
public static long overlapArea(int[] r1, int[] r2) {
    long x = Math.max(0, Math.min(r1[2], r2[2]) - Math.max(r1[0], r2[0]));
    long y = Math.max(0, Math.min(r1[3], r2[3]) - Math.max(r1[1], r2[1]));
    return x * y;
}
```

#### Template 3: Island Perimeter (Grid)

```python
def island_perimeter(grid):
    rows, cols = len(grid), len(grid[0])
    perimeter = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1:
                perimeter += 4
                if r > 0 and grid[r-1][c] == 1:
                    perimeter -= 2
                if c > 0 and grid[r][c-1] == 1:
                    perimeter -= 2
    return perimeter
```

```cpp
int islandPerimeter(vector<vector<int>>& grid) {
    int m = grid.size(), n = grid[0].size(), perim = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == 1) {
                perim += 4;
                if (i > 0 && grid[i-1][j] == 1) perim -= 2;
                if (j > 0 && grid[i][j-1] == 1) perim -= 2;
            }
        }
    }
    return perim;
}
```

```java
public int islandPerimeter(int[][] grid) {
    int m = grid.length, n = grid[0].length, perim = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == 1) {
                perim += 4;
                if (i > 0 && grid[i-1][j] == 1) perim -= 2;
                if (j > 0 && grid[i][j-1] == 1) perim -= 2;
            }
        }
    }
    return perim;
}
```

#### Template 4: Max Area of Island (Grid DFS)

```python
def max_area_of_island(grid):
    rows, cols = len(grid), len(grid[0])
    
    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == 0:
            return 0
        grid[r][c] = 0  # mark visited
        return 1 + dfs(r+1, c) + dfs(r-1, c) + dfs(r, c+1) + dfs(r, c-1)
    
    max_area = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1:
                max_area = max(max_area, dfs(r, c))
    return max_area
```

#### Template 5: Union Area of Rectangles (Line Sweep)

```python
def rectangle_union_area(rects):
    """rects: list of (x1, y1, x2, y2). Returns total area covered."""
    events = []
    for x1, y1, x2, y2 in rects:
        events.append((x1, 1, y1, y2))  # 1 = start
        events.append((x2, -1, y1, y2)) # -1 = end
    events.sort()
    
    active = []  # list of (y1, y2) for active rectangles
    prev_x = events[0][0]
    total = 0
    
    def active_y_length():
        if not active:
            return 0
        active.sort()
        length = 0
        cur_start, cur_end = active[0]
        for s, e in active[1:]:
            if s <= cur_end:
                cur_end = max(cur_end, e)
            else:
                length += cur_end - cur_start
                cur_start, cur_end = s, e
        length += cur_end - cur_start
        return length
    
    for x, typ, y1, y2 in events:
        total += (x - prev_x) * active_y_length()
        if typ == 1:
            active.append((y1, y2))
        else:
            active.remove((y1, y2))
        prev_x = x
    
    return total
```

---

### 6. CURATED REAL PROBLEMS

| # | Problem | Platform | Difficulty | Concepts | Pattern |
|---|---------|----------|------------|----------|---------|
| 1 | 463. Island Perimeter | LeetCode | Easy | Grid, Adjacency | Grid Perimeter |
| 2 | 695. Max Area of Island | LeetCode | Medium | DFS, Connected Components | Grid Area |
| 3 | 130. Surrounded Regions | LeetCode | Medium | BFS/DFS, Boundary | Region Fill |
| 4 | 1465. Max Area of Piece of Cake | LeetCode | Medium | Sorting, Max Gap | Cut-Based Area |
| 5 | 999. Regions Cut By Slashes | LeetCode | Medium | Union-Find, Grid Upscaling | Connected Area |
| 6 | Grass Seed Inc | Kattis | Easy | Basic Arithmetic | Simple Area |
| 7 | 3461. Min Area to Cover All Ones I | LeetCode | Medium | Bounding Box | Enclosing Area |
| 8 | BSHEEP | SPOJ | Medium | Convex Hull, Perimeter | Hull Perimeter |
| 9 | PIR - Tetrahedron Volume | SPOJ | Medium | Heron's 3D, Volume | 3D Volume |
| 10 | Area of a Star | Codeforces | Hard (2100) | Polygon, Shoelace | Complex Area |
| 11 | 3459. Min Area to Cover All Ones II | LeetCode | Hard | Enumeration, Partition | Min Enclosing |
| 12 | Visible Black Areas | Codeforces | Hard (2800) | Sweep Line, DSU | Union Area |
| 13 | 2158. Amount of New Area Painted Each Day | LeetCode | Hard | Segment Tree, Lazy | Union Area |
| 14 | Combined Volume of Cuboids | Project Euler | Very Hard | Inclusion-Exclusion | 3D Union |
| 15 | MMAXPER - Maximum Perimeter | SPOJ | Easy | DP, Interval | Max Perimeter |

---

### 7. GENERATED PRACTICE PROBLEMS

**Easy 1: Garden Fence**
You have a rectangular garden of size M×N. You place a fence that goes around the garden but leaves a gap of width `g` at the bottom for a gate. What is the total length of the fence?

**Easy 2: Paint the Wall**
You have a wall of size W×H. You paint K rectangles on it (axis-aligned). Some may overlap. What is the total painted area?

**Medium 1: Lake Area**
Given a 2D grid where 0 = water and 1 = land, find the largest connected water body (lake) that is completely surrounded by land (not touching the grid boundary). Return its area.

**Medium 2: Minimum Perimeter Enclosure**
Given N points in a 2D plane, find the perimeter of the smallest axis-aligned rectangle that encloses at least K of them.

**Hard 1: City Blocks**
You are given N rectangles representing buildings in a city (viewed from above). Compute the total ground area covered by buildings, accounting for overlaps. If a building completely covers another, the smaller one doesn't count. But if they partially overlap, the union counts once. N ≤ 10⁵.

**Hard 2: Irregular Field**
A field is defined by an irregular polygon given by N vertices in order. A river defined by a line segment passes through the field. Compute the area of the field on each side of the river.

**Interview-Style: Max Island After One Flip**
Given a binary matrix, you can flip at most one 0 to 1. What's the maximum possible area of the largest connected component of 1s after the flip?

**Contest-Style: Area of Union of Rotated Rectangles**
Given N rectangles (axis-aligned), randomly rotate each by a small angle θ (same for all). Compute the union area with 10⁻⁶ precision.

---

### 8. COMPLETE SOLUTION SECTION

---

#### Problem 1: 463. Island Perimeter (LeetCode Easy)

**A. Intuition**
Each land cell has 4 sides. When two land cells touch, they share a side that is NOT part of the perimeter. So: total perimeter = sum over all land cells of (4 - number of land neighbors).

**B. Brute Force**
For each cell, check all 4 neighbors. This is already optimal since we must examine every cell.

**C. Optimized Approach**
Iterate once. Count each cell's contribution, subtracting 2 for each top/left neighbor (we count each shared side once, and subtracting 2 accounts for both cells losing that side).

**D. Step-by-Step**
1. Initialize perimeter = 0
2. For each cell (r, c) in the grid:
   - If land: add 4
   - If neighbor above is land: subtract 2
   - If neighbor to left is land: subtract 2
3. Return perimeter

**E. Complexity** O(R×C) time, O(1) space.

**F. Edge Cases**
- Single cell: perimeter = 4
- No land: perimeter = 0
- Full grid of land: perimeter = 2×(R+C) (if no holes)

**G. Code**

```python
def islandPerimeter(self, grid):
    m, n = len(grid), len(grid[0])
    perim = 0
    for i in range(m):
        for j in range(n):
            if grid[i][j] == 1:
                perim += 4
                if i > 0 and grid[i-1][j] == 1: perim -= 2
                if j > 0 and grid[i][j-1] == 1: perim -= 2
    return perim
```

```cpp
int islandPerimeter(vector<vector<int>>& grid) {
    int m = grid.size(), n = grid[0].size(), p = 0;
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            if (grid[i][j]) {
                p += 4;
                if (i && grid[i-1][j]) p -= 2;
                if (j && grid[i][j-1]) p -= 2;
            }
    return p;
}
```

```java
public int islandPerimeter(int[][] grid) {
    int m = grid.length, n = grid[0].length, p = 0;
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            if (grid[i][j] == 1) {
                p += 4;
                if (i > 0 && grid[i-1][j] == 1) p -= 2;
                if (j > 0 && grid[i][j-1] == 1) p -= 2;
            }
    return p;
}
```

---

#### Problem 2: 695. Max Area of Island (LeetCode Medium)

**A. Intuition**
This is a connected components problem on a grid. Each island is a connected component of 1s. We need the largest one. Use DFS to explore each island, counting cells as we go. Mark visited cells as 0 (sink the island) to avoid revisiting.

**B. Brute Force**
For each cell that is land, run BFS/DFS to find the full island. This is the standard approach and is optimal.

**C. Optimized Approach**
Same as brute force — this is already O(R×C). The key optimization is in-place marking: set `grid[r][c] = 0` when visiting to avoid using a separate visited array.

**D. Step-by-Step**
1. Initialize max_area = 0
2. For each cell in the grid:
   - If land: start DFS, count all connected 1s (sink as you go)
   - Update max_area
3. Return max_area

**E. Complexity** O(R×C) time, O(R×C) worst-case recursion stack.

**F. Edge Cases**
- Empty grid: area = 0
- All water: area = 0
- Single cell: area = 1
- Islands that touch diagonally: NOT connected (only 4-directional)

**G. Code**

```python
def maxAreaOfIsland(self, grid):
    m, n = len(grid), len(grid[0])
    
    def dfs(r, c):
        if r < 0 or r >= m or c < 0 or c >= n or grid[r][c] == 0:
            return 0
        grid[r][c] = 0
        return 1 + dfs(r-1, c) + dfs(r+1, c) + dfs(r, c-1) + dfs(r, c+1)
    
    max_area = 0
    for r in range(m):
        for c in range(n):
            if grid[r][c] == 1:
                max_area = max(max_area, dfs(r, c))
    return max_area
```

```cpp
class Solution {
public:
    int maxAreaOfIsland(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size(), best = 0;
        function<int(int,int)> dfs = [&](int r, int c) -> int {
            if (r < 0 || r >= m || c < 0 || c >= n || !grid[r][c]) return 0;
            grid[r][c] = 0;
            return 1 + dfs(r-1,c) + dfs(r+1,c) + dfs(r,c-1) + dfs(r,c+1);
        };
        for (int r = 0; r < m; r++)
            for (int c = 0; c < n; c++)
                if (grid[r][c]) best = max(best, dfs(r, c));
        return best;
    }
};
```

```java
class Solution {
    int m, n;
    public int maxAreaOfIsland(int[][] grid) {
        m = grid.length; n = grid[0].length;
        int best = 0;
        for (int r = 0; r < m; r++)
            for (int c = 0; c < n; c++)
                if (grid[r][c] == 1) best = Math.max(best, dfs(grid, r, c));
        return best;
    }
    int dfs(int[][] g, int r, int c) {
        if (r < 0 || r >= m || c < 0 || c >= n || g[r][c] == 0) return 0;
        g[r][c] = 0;
        return 1 + dfs(g, r+1, c) + dfs(g, r-1, c) + dfs(g, r, c+1) + dfs(g, r, c-1);
    }
}
```

---

#### Problem 3: 1465. Maximum Area of a Piece of Cake (LeetCode Medium)

**A. Intuition**
When you cut a rectangle horizontally and vertically, the area of each piece is (horizontal gap) × (vertical gap). The largest piece will use the largest horizontal gap and the largest vertical gap.

**B. Brute Force**
Generate all possible piece dimensions: O(H×V) — too slow.

**C. Optimized Approach**
Sort the cuts. Compute max gap between consecutive horizontal cuts (including edges 0 and h). Same for vertical cuts. Multiply the two max gaps.

**D. Step-by-Step**
1. Add boundary cuts: 0 to horizontalCuts, h to horizontalCuts; 0 to verticalCuts, w to verticalCuts
2. Sort both arrays
3. Find max gap in horizontalCuts: max(horizontalCuts[i+1] - horizontalCuts[i])
4. Find max gap in verticalCuts: max(verticalCuts[i+1] - verticalCuts[i])
5. Return (max_h_gap × max_v_gap) % (10⁹ + 7)

**E. Complexity** O(H log H + V log V) for sorting, O(H + V) for scanning.

**F. Edge Cases**
- No cuts: area = h × w
- Single horizontal cut: max horizontal gap = max(cut, h - cut)
- Large numbers: use modulo and 64-bit integers

**G. Code**

```python
def maxArea(self, h, w, horizontalCuts, verticalCuts):
    horizontalCuts.extend([0, h])
    verticalCuts.extend([0, w])
    horizontalCuts.sort()
    verticalCuts.sort()
    
    max_h = max(horizontalCuts[i+1] - horizontalCuts[i] for i in range(len(horizontalCuts)-1))
    max_v = max(verticalCuts[i+1] - verticalCuts[i] for i in range(len(verticalCuts)-1))
    
    return (max_h * max_v) % (10**9 + 7)
```

```cpp
int maxArea(int h, int w, vector<int>& hc, vector<int>& vc) {
    hc.push_back(0); hc.push_back(h);
    vc.push_back(0); vc.push_back(w);
    sort(hc.begin(), hc.end());
    sort(vc.begin(), vc.end());
    long mh = 0, mv = 0;
    for (int i = 0; i + 1 < hc.size(); i++) mh = max(mh, (long)hc[i+1] - hc[i]);
    for (int i = 0; i + 1 < vc.size(); i++) mv = max(mv, (long)vc[i+1] - vc[i]);
    return (int)((mh * mv) % 1000000007);
}
```

```java
public int maxArea(int h, int w, int[] hc, int[] vc) {
    List<Integer> hList = new ArrayList<>();
    List<Integer> vList = new ArrayList<>();
    for (int x : hc) hList.add(x);
    for (int x : vc) vList.add(x);
    hList.add(0); hList.add(h);
    vList.add(0); vList.add(w);
    Collections.sort(hList);
    Collections.sort(vList);
    long mh = 0, mv = 0;
    for (int i = 0; i + 1 < hList.size(); i++)
        mh = Math.max(mh, (long)hList.get(i+1) - hList.get(i));
    for (int i = 0; i + 1 < vList.size(); i++)
        mv = Math.max(mv, (long)vList.get(i+1) - vList.get(i));
    return (int)((mh * mv) % 1000000007);
}
```

---

#### Problem 4: 130. Surrounded Regions (LeetCode Medium)

**A. Intuition**
Any 'O' connected to the border cannot be captured. All other 'O' regions are surrounded by 'X' and should be flipped to 'X'. So: find all border-connected 'O's, mark them, flip everything else.

**B. Brute Force**
For each 'O', BFS to see if it reaches the border. Extremely slow: O((R×C)²).

**C. Optimized Approach**
Start BFS/DFS from all border 'O's. These are the safe regions. Then flip all remaining 'O's to 'X'.

**D. Step-by-Step**
1. Find all 'O's on the border (row 0, row m-1, col 0, col n-1)
2. Run DFS from each, marking connected 'O's as 'S' (safe)
3. Iterate through the entire board:
   - 'S' → 'O' (border-connected, keep)
   - 'O' → 'X' (surrounded, flip)
4. Return board

**E. Complexity** O(R×C) time, O(R×C) worst-case recursion.

**F. Edge Cases**
- No 'O's: nothing to do
- All 'O's on border: nothing flips
- Single row or column: all 'O's are border-connected

**G. Code**

```python
def solve(self, board):
    if not board or not board[0]: return
    m, n = len(board), len(board[0])
    
    def dfs(r, c):
        if r < 0 or r >= m or c < 0 or c >= n or board[r][c] != 'O':
            return
        board[r][c] = 'S'
        dfs(r-1, c); dfs(r+1, c); dfs(r, c-1); dfs(r, c+1)
    
    for r in range(m):
        dfs(r, 0); dfs(r, n-1)
    for c in range(n):
        dfs(0, c); dfs(m-1, c)
    
    for r in range(m):
        for c in range(n):
            if board[r][c] == 'S': board[r][c] = 'O'
            elif board[r][c] == 'O': board[r][c] = 'X'
```

```cpp
class Solution {
public:
    void solve(vector<vector<char>>& board) {
        if (board.empty()) return;
        int m = board.size(), n = board[0].size();
        function<void(int,int)> dfs = [&](int r, int c) {
            if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] != 'O') return;
            board[r][c] = 'S';
            dfs(r-1,c); dfs(r+1,c); dfs(r,c-1); dfs(r,c+1);
        };
        for (int r = 0; r < m; r++) { dfs(r, 0); dfs(r, n-1); }
        for (int c = 0; c < n; c++) { dfs(0, c); dfs(m-1, c); }
        for (int r = 0; r < m; r++)
            for (int c = 0; c < n; c++)
                board[r][c] = (board[r][c] == 'S') ? 'O' : 'X';
    }
};
```

```java
class Solution {
    int m, n;
    public void solve(char[][] board) {
        if (board.length == 0) return;
        m = board.length; n = board[0].length;
        for (int r = 0; r < m; r++) { dfs(board, r, 0); dfs(board, r, n-1); }
        for (int c = 0; c < n; c++) { dfs(board, 0, c); dfs(board, m-1, c); }
        for (int r = 0; r < m; r++)
            for (int c = 0; c < n; c++)
                board[r][c] = board[r][c] == 'S' ? 'O' : 'X';
    }
    void dfs(char[][] b, int r, int c) {
        if (r < 0 || r >= m || c < 0 || c >= n || b[r][c] != 'O') return;
        b[r][c] = 'S';
        dfs(b, r-1, c); dfs(b, r+1, c); dfs(b, r, c-1); dfs(b, r, c+1);
    }
}
```

---

#### Problem 5: 999. Regions Cut By Slashes (LeetCode Medium)

**A. Intuition**
This is a connected-components problem on a grid where slashes act as walls. Upscale each cell to a 3×3 sub-grid so that a `/` or `\\` becomes a diagonal wall of 1s. Then flood-fill the upscaled grid to count connected regions of 0s.

**B. Brute Force**
Treating slashes as edges between grid cells requires complex geometry. Upscaling makes it a standard grid problem.

**C. Optimized Approach**
Scale each cell to 3×3. Draw `/` as a diagonal (top-right to bottom-left) of 1s. Draw `\\` as the other diagonal. Then count connected components of 0s in the upscaled grid.

**D. Step-by-Step**
1. Create a 3N × 3N grid of 0s
2. For each cell (r, c) in original grid:
   - If `/` : set cells [r*3][c*3+2], [r*3+1][c*3+1], [r*3+2][c*3] to 1
   - If `\\` : set cells [r*3][c*3], [r*3+1][c*3+1], [r*3+2][c*3+2] to 1
3. Flood-fill all 0-cells, counting connected components
4. Return count

**E. Complexity** O(N²) for upscaling. O(9N²) for flood fill. Overall O(N²).

**F. Edge Cases**
- All slashes: regions depend on slash pattern
- No slashes: exactly 1 region
- Checkerboard pattern: maximum regions

**G. Code**

```python
def regionsBySlashes(self, grid):
    n = len(grid)
    upscaled = [[0] * (3 * n) for _ in range(3 * n)]
    
    for r in range(n):
        for c in range(n):
            if grid[r][c] == '/':
                upscaled[r*3][c*3+2] = 1
                upscaled[r*3+1][c*3+1] = 1
                upscaled[r*3+2][c*3] = 1
            elif grid[r][c] == '\\\\':
                upscaled[r*3][c*3] = 1
                upscaled[r*3+1][c*3+1] = 1
                upscaled[r*3+2][c*3+2] = 1
    
    def dfs(r, c):
        if r < 0 or r >= 3*n or c < 0 or c >= 3*n or upscaled[r][c] != 0:
            return
        upscaled[r][c] = 1
        dfs(r-1, c); dfs(r+1, c); dfs(r, c-1); dfs(r, c+1)
    
    regions = 0
    for r in range(3*n):
        for c in range(3*n):
            if upscaled[r][c] == 0:
                regions += 1
                dfs(r, c)
    return regions
```

```cpp
class Solution {
public:
    int regionsBySlashes(vector<string>& grid) {
        int n = grid.size();
        vector<vector<int>> g(3*n, vector<int>(3*n, 0));
        for (int r = 0; r < n; r++)
            for (int c = 0; c < n; c++)
                if (grid[r][c] == '/') {
                    g[r*3][c*3+2] = 1;
                    g[r*3+1][c*3+1] = 1;
                    g[r*3+2][c*3] = 1;
                } else if (grid[r][c] == '\\\\') {
                    g[r*3][c*3] = 1;
                    g[r*3+1][c*3+1] = 1;
                    g[r*3+2][c*3+2] = 1;
                }
        int regions = 0, sz = 3*n;
        function<void(int,int)> dfs = [&](int r, int c) {
            if (r < 0 || r >= sz || c < 0 || c >= sz || g[r][c]) return;
            g[r][c] = 1;
            dfs(r-1,c); dfs(r+1,c); dfs(r,c-1); dfs(r,c+1);
        };
        for (int r = 0; r < sz; r++)
            for (int c = 0; c < sz; c++)
                if (!g[r][c]) { regions++; dfs(r, c); }
        return regions;
    }
};
```

```java
class Solution {
    public int regionsBySlashes(String[] grid) {
        int n = grid.length;
        int[][] g = new int[3*n][3*n];
        for (int r = 0; r < n; r++)
            for (int c = 0; c < n; c++) {
                char ch = grid[r].charAt(c);
                if (ch == '/') {
                    g[r*3][c*3+2] = 1;
                    g[r*3+1][c*3+1] = 1;
                    g[r*3+2][c*3] = 1;
                } else if (ch == '\\\\') {
                    g[r*3][c*3] = 1;
                    g[r*3+1][c*3+1] = 1;
                    g[r*3+2][c*3+2] = 1;
                }
            }
        int sz = 3*n, regions = 0;
        for (int r = 0; r < sz; r++)
            for (int c = 0; c < sz; c++)
                if (g[r][c] == 0) { regions++; dfs(g, r, c, sz); }
        return regions;
    }
    void dfs(int[][] g, int r, int c, int sz) {
        if (r < 0 || r >= sz || c < 0 || c >= sz || g[r][c] != 0) return;
        g[r][c] = 1;
        dfs(g, r-1, c, sz); dfs(g, r+1, c, sz);
        dfs(g, r, c-1, sz); dfs(g, r, c+1, sz);
    }
}
```

---

## Chapter 13: Angles and Rotation

---

### 1. INTRODUCTION

Angles measure the turn between two lines meeting at a point. Rotation is the circular movement of an object around a center point.

Think of:
- A clock's hands: the minute hand rotates 360° in 60 minutes
- A figure skater spinning: rotation around a central axis
- A door swinging open: the hinge is the center of rotation
- A steering wheel: turning changes the direction of the car

In DSA and programming:
- **Computer graphics** rotates objects and cameras
- **Robotics** computes joint angles for arm movement
- **Navigation** calculates bearings between waypoints
- **Game physics** handles collision angles and reflections
- **Image processing** rotates and aligns images

The key insight: angles and rotations are fundamentally about **transformations** — taking a point and moving it to a new position based on angular displacement.

---

### 2. CORE CONCEPTS

#### 2.1 Angle Basics

**Units:** degrees (0-360) or radians (0 to 2π). Radians are standard in programming.

**Conversion:** `radians = degrees × π / 180`, `degrees = radians × 180 / π`

**Types of angles:**
- Acute: 0° < θ < 90°
- Right: θ = 90°
- Obtuse: 90° < θ < 180°
- Straight: θ = 180°
- Reflex: 180° < θ < 360°

#### 2.2 Angle Between Two Vectors

Given vectors **a** and **b**:

```
cos θ = (a·b) / (|a| × |b|)
θ = arccos((a·b) / (|a| × |b|))
```

This always gives the smaller angle (0 to π). For signed angle (direction matters):

```
sin θ = (a × b) / (|a| × |b|)
```

where `a × b = a.x·b.y - a.y·b.x` is the 2D cross product.

#### 2.2.1 Polar Angle (atan2)

The function `atan2(y, x)` returns the angle from the positive x-axis to the point (x, y), in the range (-π, π].

```
θ = atan2(y, x)
```

**Quadrant mapping:**
| (x, y) | atan2(y, x) |
|--------|-------------|
| (+, +) | 0 to π/2 |
| (-, +) | π/2 to π |
| (-, -) | -π to -π/2 |
| (+, -) | -π/2 to 0 |

#### 2.3 Rotation Matrix (2D)

To rotate a point (x, y) by angle θ counterclockwise around the origin:

```
x' = x·cos θ - y·sin θ
y' = x·sin θ + y·cos θ
```

In matrix form:

```
[x']   [cos θ  -sin θ] [x]
[y'] = [sin θ   cos θ] [y]
```

**Clockwise rotation** (by θ):

```
x' = x·cos θ + y·sin θ
y' = -x·sin θ + y·cos θ
```

#### 2.4 Rotation Around an Arbitrary Point

To rotate point P around point C by angle θ:
1. Translate: subtract C from P → local coordinates
2. Rotate: apply rotation matrix
3. Translate back: add C

```
local_x = P.x - C.x
local_y = P.y - C.y
rotated_x = local_x·cos θ - local_y·sin θ + C.x
rotated_y = local_x·sin θ + local_y·cos θ + C.y
```

#### 2.5 Reflection (Mirror)

Reflection across a line through the origin with direction angle θ:

```
x' = x·cos(2θ) + y·sin(2θ)
y' = x·sin(2θ) - y·cos(2θ)
```

Reflection across the x-axis: (x, -y)
Reflection across the y-axis: (-x, y)
Reflection across y = x: (y, x)

#### 2.6 Clock Angle Problem

Given time H:M, the angle between hour and minute hands:

```
minute_angle = M × 6          (360° / 60 = 6° per minute)
hour_angle = (H % 12) × 30 + M × 0.5   (360° / 12 = 30° per hour, 0.5° per minute)
angle = |hour_angle - minute_angle|
result = min(angle, 360 - angle)
```

#### 2.7 Orientation of Three Points (Cross Product)

Given three points A, B, C, the orientation tells us if the turn from A→B to B→C is counterclockwise, clockwise, or collinear:

```
cross = (B.x - A.x) × (C.y - A.y) - (B.y - A.y) × (C.x - A.x)

cross > 0 → counterclockwise (left turn)
cross < 0 → clockwise (right turn)
cross = 0 → collinear
```

---

### 3. PROBLEM RECOGNITION

**Keywords for angle problems:**
- "angle", "bearing", "direction"
- "rotation", "rotate", "spin", "turn"
- "mirror", "reflect", "symmetry"
- "clockwise", "counterclockwise"
- "orientation", "polar"
- "clock", "hour/minute hand"
- "atan2", "arctan"

**Keywords for rotation problems:**
- "rotate matrix", "rotate image"
- "rotate array", "rotate list"
- "circular shift", "cyclic shift"
- "90 degrees", "180 degrees"

**Hidden indicators:**
- Problems about "deflection", "reflection" of light/laser
- Problems about "aiming" or "targeting"
- "View angle" or "field of view"
- "Turn left/right" in grid navigation
- "Rotate to match"

---

### 4. PATTERN ANALYSIS

#### Pattern 1: Clock Angle

**When to use:** Given a time, find the angle between clock hands.

**Why it works:** The minute hand moves 6°/min, hour hand moves 0.5°/min. Track each and compute the absolute difference, taking the smaller angle.

**Complexity:** O(1).

**Common mistake:** Forgetting that hour hand also moves with minutes. For 3:15, the hour hand is not at 90° but at 97.5°.

#### Pattern 2: Matrix Rotation

**When to use:** "Rotate image by 90 degrees."

**Why it works:** For 90° clockwise: `new[j][n-1-i] = old[i][j]`. In-place: reverse rows then transpose (or transpose then reverse columns).

**Complexity:** O(N²).

**Common mistake:** Confusing clockwise vs counterclockwise. Remember: clockwise = reverse rows then transpose.

#### Pattern 3: Array/List Rotation

**When to use:** "Rotate array by K positions."

**Why it works:** Triple reverse: reverse entire array, reverse first K, reverse last N-K. Or use rotation: effective rotation = K % N.

**Complexity:** O(N).

**Common mistake:** K can be larger than N. Always take modulo first.

#### Pattern 4: Line of Sight / Reflection

**When to use:** Mirrors, laser beams, billiard ball problems.

**Why it works:** Reflection across a wall flips the normal component. The angle of incidence equals angle of reflection. Can sometimes be solved by reflecting the target across the wall.

**Complexity:** Varies. Some are O(1), others need simulation.

#### Pattern 5: Orientation Testing (Cross Product)

**When to use:** "Is point to left or right of line?" "Is polygon convex?" Line intersection. Point-in-polygon.

**Why it works:** The cross product of (B-A) and (C-A) tells you orientation. It's the fundamental building block of almost all computational geometry.

**Complexity:** O(1) per test.

---

### 5. REUSABLE CODING TEMPLATES

#### Template 1: Angle Between Two Vectors

```python
import math

def angle_between(v1, v2):
    """v1, v2 are (x, y) tuples. Returns angle in radians [0, π]."""
    dot = v1[0] * v2[0] + v1[1] * v2[1]
    mag1 = math.hypot(v1[0], v1[1])
    mag2 = math.hypot(v2[0], v2[1])
    cos_angle = max(-1, min(1, dot / (mag1 * mag2)))
    return math.acos(cos_angle)

def signed_angle(v1, v2):
    """Returns signed angle from v1 to v2 in radians [-π, π]."""
    dot = v1[0] * v2[0] + v1[1] * v2[1]
    cross = v1[0] * v2[1] - v1[1] * v2[0]
    mag1 = math.hypot(v1[0], v1[1])
    mag2 = math.hypot(v2[0], v2[1])
    cos_angle = max(-1, min(1, dot / (mag1 * mag2)))
    angle = math.acos(cos_angle)
    return angle if cross >= 0 else -angle
```

```cpp
#include <cmath>
double angle_between(pair<double,double> v1, pair<double,double> v2) {
    double dot = v1.first*v2.first + v1.second*v2.second;
    double m1 = hypot(v1.first, v1.second);
    double m2 = hypot(v2.first, v2.second);
    return acos(max(-1.0, min(1.0, dot / (m1 * m2))));
}
```

```java
public static double angleBetween(int[] v1, int[] v2) {
    double dot = v1[0]*v2[0] + v1[1]*v2[1];
    double m1 = Math.hypot(v1[0], v1[1]);
    double m2 = Math.hypot(v2[0], v2[1]);
    return Math.acos(Math.max(-1, Math.min(1, dot / (m1 * m2))));
}
```

#### Template 2: 2D Rotation

```python
import math

def rotate_point(px, py, cx, cy, angle_deg):
    """Rotate point (px, py) around center (cx, cy) by angle in degrees."""
    angle_rad = math.radians(angle_deg)
    cos_a = math.cos(angle_rad)
    sin_a = math.sin(angle_rad)
    dx = px - cx
    dy = py - cy
    rx = dx * cos_a - dy * sin_a + cx
    ry = dx * sin_a + dy * cos_a + cy
    return (rx, ry)
```

```cpp
pair<double,double> rotate_point(double px, double py, double cx, double cy, double deg) {
    double rad = deg * M_PI / 180.0;
    double c = cos(rad), s = sin(rad);
    double dx = px - cx, dy = py - cy;
    return {dx * c - dy * s + cx, dx * s + dy * c + cy};
}
```

```java
public static double[] rotatePoint(int px, int py, int cx, int cy, double deg) {
    double rad = Math.toRadians(deg);
    double c = Math.cos(rad), s = Math.sin(rad);
    double dx = px - cx, dy = py - cy;
    return new double[]{dx * c - dy * s + cx, dx * s + dy * c + cy};
}
```

#### Template 3: Rotate Matrix 90 Degrees Clockwise

```python
def rotate_matrix(matrix):
    """Rotate N×N matrix 90° clockwise in-place."""
    n = len(matrix)
    matrix.reverse()
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
```

```cpp
void rotate(vector<vector<int>>& matrix) {
    int n = matrix.size();
    reverse(matrix.begin(), matrix.end());
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++)
            swap(matrix[i][j], matrix[j][i]);
}
```

```java
public void rotate(int[][] matrix) {
    int n = matrix.length;
    for (int i = 0; i < n / 2; i++) {
        int[] tmp = matrix[i];
        matrix[i] = matrix[n-1-i];
        matrix[n-1-i] = tmp;
    }
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++) {
            int tmp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = tmp;
        }
}
```

#### Template 4: Orientation (Cross Product)

```python
def orientation(p, q, r):
    """Cross product of (q-p) and (r-p). Returns >0: CCW, <0: CW, =0: collinear."""
    return (q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0])
```

```cpp
long long orientation(pair<long long, long long> p,
                      pair<long long, long long> q,
                      pair<long long, long long> r) {
    return (q.first - p.first) * (r.second - p.second)
         - (q.second - p.second) * (r.first - p.first);
}
```

```java
public static long orientation(int[] p, int[] q, int[] r) {
    return (long)(q[0] - p[0]) * (r[1] - p[1])
         - (long)(q[1] - p[1]) * (r[0] - p[0]);
}
```

#### Template 5: Clock Angle

```python
def clock_angle(hours, minutes):
    """Return the smaller angle between hour and minute hands."""
    minute_angle = minutes * 6
    hour_angle = (hours % 12) * 30 + minutes * 0.5
    angle = abs(hour_angle - minute_angle)
    return min(angle, 360 - angle)
```

```cpp
double clockAngle(int h, int m) {
    double ma = m * 6.0;
    double ha = (h % 12) * 30.0 + m * 0.5;
    double ang = fabs(ha - ma);
    return min(ang, 360 - ang);
}
```

```java
public static double clockAngle(int h, int m) {
    double ma = m * 6.0;
    double ha = (h % 12) * 30.0 + m * 0.5;
    double ang = Math.abs(ha - ma);
    return Math.min(ang, 360 - ang);
}
```

#### Template 6: Polar Angle Sorting

```python
import math

def polar_angle_sort(points):
    """Sort points by polar angle around origin, then by distance."""
    def key_func(p):
        angle = math.atan2(p[1], p[0])
        dist = p[0]**2 + p[1]**2
        return (angle, dist)
    return sorted(points, key=key_func)
```

```cpp
vector<pair<double,double>> polarSort(vector<pair<double,double>>& pts) {
    sort(pts.begin(), pts.end(), [](auto& a, auto& b) {
        double aa = atan2(a.second, a.first);
        double ab = atan2(b.second, b.first);
        if (aa != ab) return aa < ab;
        return a.first*a.first + a.second*a.second <
               b.first*b.first + b.second*b.second;
    });
    return pts;
}
```

```java
public static int[][] polarSort(int[][] points) {
    Arrays.sort(points, (a, b) -> {
        double aa = Math.atan2(a[1], a[0]);
        double ab = Math.atan2(b[1], b[0]);
        if (aa != ab) return Double.compare(aa, ab);
        return Integer.compare(a[0]*a[0]+a[1]*a[1], b[0]*b[0]+b[1]*b[1]);
    });
    return points;
}
```

---

### 6. CURATED REAL PROBLEMS

| # | Problem | Platform | Difficulty | Concepts | Pattern |
|---|---------|----------|------------|----------|---------|
| 1 | 1344. Angle Between Hands of a Clock | LeetCode | Medium | Clock Math | Clock Angle |
| 2 | 48. Rotate Image | LeetCode | Medium | Matrix, In-Place | Matrix Rotation |
| 3 | 1752. Check if Array Is Sorted and Rotated | LeetCode | Easy | Array | Array Rotation |
| 4 | 2015. Determine Whether Matrix Can Be Obtained By Rotation | LeetCode | Easy | Matrix Comparison | Rotation Check |
| 5 | 1322. Minimum Moves to Reach Target with Rotations | LeetCode | Hard | BFS, Bitmask | Rotation Movement |
| 6 | View Angle | Codeforces (1800) | Medium | Atan2, Sort | Polar Angle |
| 7 | Rotation | Codeforces (1500) | Medium | Geometry, Math | Angle Computations |
| 8 | ABC 326 F - Robot Rotation | AtCoder | Hard | Meet-in-the-Middle | Direction Rotation |
| 9 | ABC 336 F - Rotation Puzzle | AtCoder | Hard | BFS, Bitmask | Rotation State |
| 10 | 888. Mirror Reflection | LeetCode | Medium | GCD, Number Theory | Reflection |
| 11 | Matrix Layer Rotation | HackerRank | Medium | Matrix | Layer Rotation |
| 12 | 86A. Reflection | Codeforces (1600) | Medium | Math | Reflection |
| 13 | Laser Beam Reflections | Project Euler 144 | Very Hard | Geometry, Simulation | Reflection/Rotation |
| 14 | Box Stacking Problem | GeeksforGeeks | Hard | DP, Rotation | 3D Rotation Permutations |
| 15 | ROT N (ABC 146 B) | AtCoder (200) | Easy | String | String Rotation |

---

### 7. GENERATED PRACTICE PROBLEMS

**Easy 1: Sun Position**
Given the time (H:M) and knowing the sun rises at 6:00 AM (0°) and sets at 6:00 PM (180°), compute the sun's angular position above the horizon. Assume linear movement.

**Easy 2: Arrow Direction**
A character is at (x₁, y₁) and points toward (x₂, y₂). Compute the angle from the positive x-axis, in degrees [0, 360).

**Medium 1: Turret Defense**
A turret at (0,0) can rotate 360°. Given N enemy positions, find the minimum rotation angle (in degrees) the turret must sweep to hit all enemies if it must fire in order of increasing distance.

**Medium 2: Polygon Orientation**
Given a convex polygon's vertices in either clockwise or counterclockwise order, determine which orientation they follow. If counterclockwise, reorder to clockwise.

**Hard 1: Reflected Laser**
A laser starts at (x₁, y₁) heading at angle θ. A circular mirror of radius R is centered at (0,0). Does the laser hit the mirror? If so, at what point does it reflect, and in what direction does it leave?

**Hard 2: Minimal Rotation for Overlap**
You have two shapes, each defined by a set of points. Find the minimum rotation of shape B around its centroid to maximize the number of points that overlap with shape A (within epsilon distance).

**Interview-Style: Spiral Matrix Rotation**
Given an M×N matrix, rotate the matrix by 180 degrees in-place (minimum extra space O(1)).

**Contest-Style: 3D Cube Rotation**
A unit cube at the origin is rotated by angles α, β, γ around the x, y, and z axes respectively. Project the cube onto the 2D plane z=0. Compute the area of the projection.

---

### 8. COMPLETE SOLUTION SECTION

---

#### Problem 1: 48. Rotate Image (LeetCode Medium)

**A. Intuition**
Rotating a matrix 90° clockwise can be done in two steps: reverse the rows (mirror horizontally), then transpose (swap symmetry). Alternatively: transpose then reverse columns.

**B. Brute Force**
Create a new matrix: `new[j][n-1-i] = old[i][j]`. O(N²) time, O(N²) space.

**C. Optimized Approach**
Rotate in-place: reverse rows then transpose.

**D. Step-by-Step**
1. Reverse all rows
2. Transpose: swap matrix[i][j] with matrix[j][i] for i < j
3. Done

**E. Complexity** O(N²) time, O(1) extra space.

**F. Edge Cases**
- 1×1 matrix: nothing to do
- Must be square (N×N) per problem statement

**G. Code**

```python
def rotate(self, matrix):
    n = len(matrix)
    matrix.reverse()
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
```

```cpp
class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        reverse(matrix.begin(), matrix.end());
        for (int i = 0; i < matrix.size(); i++)
            for (int j = i + 1; j < matrix.size(); j++)
                swap(matrix[i][j], matrix[j][i]);
    }
};
```

```java
class Solution {
    public void rotate(int[][] matrix) {
        int n = matrix.length;
        for (int i = 0; i < n / 2; i++) {
            int[] tmp = matrix[i];
            matrix[i] = matrix[n-1-i];
            matrix[n-1-i] = tmp;
        }
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++) {
                int tmp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = tmp;
            }
    }
}
```

---

#### Problem 2: 1344. Angle Between Hands of a Clock (LeetCode Medium)

**A. Intuition**
The clock is a circle of 360°. Minute hand: 6°/min. Hour hand: 30°/hour + 0.5°/min. Compute both and diff.

**B. Brute Force**
Direct formula — no alternative needed.

**C. Optimized Approach**
Compute directly with formulas.

**D. Step-by-Step**
1. Hour = hour % 12 (convert 12 to 0)
2. `minute_angle = minutes * 6`
3. `hour_angle = hour * 30 + minutes * 0.5`
4. `diff = |hour_angle - minute_angle|`
5. Return `min(diff, 360 - diff)`

**E. Complexity** O(1) time, O(1) space.

**F. Edge Cases**
- 12:00 → 0°
- 3:00 → 90°
- 6:00 → 180°

**G. Code**

```python
def angleClock(self, hour, minutes):
    hour %= 12
    minute_angle = minutes * 6
    hour_angle = hour * 30 + minutes * 0.5
    diff = abs(hour_angle - minute_angle)
    return min(diff, 360 - diff)
```

```cpp
class Solution {
public:
    double angleClock(int hour, int minutes) {
        hour %= 12;
        double ma = minutes * 6.0;
        double ha = hour * 30.0 + minutes * 0.5;
        double diff = fabs(ha - ma);
        return min(diff, 360 - diff);
    }
};
```

```java
class Solution {
    public double angleClock(int hour, int minutes) {
        hour %= 12;
        double ma = minutes * 6.0;
        double ha = hour * 30.0 + minutes * 0.5;
        double diff = Math.abs(ha - ma);
        return Math.min(diff, 360 - diff);
    }
}
```

---

#### Problem 3: 2015. Determine Whether Matrix Can Be Obtained By Rotation (LeetCode Easy)

**A. Intuition**
A matrix can be rotated 0°, 90°, 180°, or 270° to match a target. Check all 4.

**B. Brute Force**
Generate all 4 rotations and compare.

**C. Optimized Approach**
Rotate in-place 4 times, compare each time.

**D. Step-by-Step**
1. For each of 4 rotations:
   - If mat == target: return True
   - Rotate mat by 90° clockwise
2. Return False

**E. Complexity** O(N²) time, O(1) space.

**F. Edge Cases**
- 1×1: always true
- Already matching: works

**G. Code**

```python
def findRotation(self, mat, target):
    n = len(mat)
    for _ in range(4):
        if mat == target:
            return True
        mat = [list(row) for row in zip(*mat[::-1])]
    return False
```

```cpp
class Solution {
public:
    bool findRotation(vector<vector<int>>& mat, vector<vector<int>>& target) {
        int n = mat.size();
        for (int r = 0; r < 4; r++) {
            if (mat == target) return true;
            vector<vector<int>> rot(n, vector<int>(n));
            for (int i = 0; i < n; i++)
                for (int j = 0; j < n; j++)
                    rot[j][n-1-i] = mat[i][j];
            mat = rot;
        }
        return false;
    }
};
```

```java
class Solution {
    public boolean findRotation(int[][] mat, int[][] target) {
        int n = mat.length;
        for (int r = 0; r < 4; r++) {
            if (Arrays.deepEquals(mat, target)) return true;
            int[][] rot = new int[n][n];
            for (int i = 0; i < n; i++)
                for (int j = 0; j < n; j++)
                    rot[j][n-1-i] = mat[i][j];
            mat = rot;
        }
        return false;
    }
}
```

---

#### Problem 4: 888. Mirror Reflection (LeetCode Medium)

**A. Intuition**
Instead of reflecting the laser, reflect the room. The laser travels straight through "virtual rooms." The sensor hit depends on parity of reflections.

**B. Brute Force**
Simulate step by step. Slow and imprecise.

**C. Optimized Approach**
Use GCD. The first corner hit is at (k·p/q·q) reduced by gcd.

Let g = gcd(p, q). Let k = q/g, m = p/g.
- If both k and m are odd: returns 1 (top-right)
- If k is odd, m is even: returns 0 (bottom-right)
- If k is even, m is odd: returns 2 (top-left)

**D. Step-by-Step**
1. g = gcd(p, q), k = q/g, m = p/g
2. Apply parity rules above

**E. Complexity** O(log min(p, q)).

**F. Edge Cases**
- q = 0: horizontal line → sensor 0
- p = q: hits sensor 1 (top-right)

**G. Code**

```python
def mirrorReflection(self, p, q):
    from math import gcd
    g = gcd(p, q)
    k = q // g
    m = p // g
    if k % 2 == 0:
        return 2
    if m % 2 == 0:
        return 0
    return 1
```

```cpp
class Solution {
public:
    int mirrorReflection(int p, int q) {
        int g = gcd(p, q);
        int k = q / g, m = p / g;
        if (k % 2 == 0) return 2;
        if (m % 2 == 0) return 0;
        return 1;
    }
};
```

```java
class Solution {
    public int mirrorReflection(int p, int q) {
        int g = gcd(p, q);
        int k = q / g, m = p / g;
        if (k % 2 == 0) return 2;
        if (m % 2 == 0) return 0;
        return 1;
    }
    int gcd(int a, int b) {
        return b == 0 ? a : gcd(b, a % b);
    }
}
```

---

#### Problem 5: View Angle (Codeforces 1800)

**A. Intuition**
Sort points by polar angle. Find max gap between consecutive angles. Minimum covering angle = 360° - max_gap.

**B. Brute Force**
Try all pairs as boundaries. O(N²).

**C. Optimized Approach**
Use atan2, sort, duplicate with +2π, find max gap.

**D. Step-by-Step**
1. Compute angle = atan2(y, x) in degrees for each point
2. Sort angles
3. Find max gap (handling wrap-around)
4. Answer = 360 - max_gap

**E. Complexity** O(N log N).

**F. Edge Cases**
- Single point: 0
- Points in all quadrants: handle wrapping

**G. Code**

```python
import math

def min_view_angle(points):
    angles = [math.degrees(math.atan2(y, x)) for x, y in points]
    angles.sort()
    max_gap = 0
    n = len(angles)
    for i in range(n):
        gap = angles[(i + 1) % n] - angles[i]
        if i == n - 1:
            gap += 360
        max_gap = max(max_gap, gap)
    return 360 - max_gap
```

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n; cin >> n;
    vector<double> ang(n);
    for (int i = 0; i < n; i++) {
        double x, y; cin >> x >> y;
        ang[i] = atan2(y, x) * 180 / M_PI;
    }
    sort(ang.begin(), ang.end());
    double max_gap = 0;
    for (int i = 0; i < n; i++) {
        double gap = ang[(i+1)%n] - ang[i];
        if (i == n-1) gap += 360;
        max_gap = max(max_gap, gap);
    }
    cout << fixed << setprecision(10) << 360 - max_gap << "\n";
}
```

```java
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        double[] ang = new double[n];
        for (int i = 0; i < n; i++) {
            double x = sc.nextDouble(), y = sc.nextDouble();
            ang[i] = Math.toDegrees(Math.atan2(y, x));
        }
        Arrays.sort(ang);
        double maxGap = 0;
        for (int i = 0; i < n; i++) {
            double gap = ang[(i+1)%n] - ang[i];
            if (i == n-1) gap += 360;
            maxGap = Math.max(maxGap, gap);
        }
        System.out.printf("%.10f%n", 360 - maxGap);
    }
}
```

---

## Chapter 14: Computational Geometry

---

### 1. INTRODUCTION

Computational geometry is the branch of computer science that deals with algorithms for geometric problems. It powers:

- **GPS navigation:** shortest routes around geographic features
- **Computer graphics:** rendering, collision detection
- **CAD software:** precise object design
- **Robotics:** path planning around obstacles
- **Game development:** hit detection, visibility checks

The unifying theme: **we solve geometric problems efficiently by exploiting mathematical structure** rather than brute force.

---

### 2. CORE CONCEPTS

#### 2.1 Convex Hull

The convex hull of a set of points is the smallest convex polygon containing all points — the shape of a rubber band stretched around the outermost points.

**Graham Scan:**
1. Find the point with lowest y (leftmost if tie) — the pivot
2. Sort other points by polar angle around pivot
3. Maintain stack; pop while last two points + new point make a clockwise turn
4. Stack = convex hull

**Monotone Chain (Andrew's Algorithm):**
1. Sort points by x, then y
2. Build lower hull: iterate, maintain convexity with cross product
3. Build upper hull: iterate reversed
4. Merge (remove duplicates at ends)

Both: O(N log N)

#### 2.2 Line Segment Intersection

Two segments (p₁, q₁) and (p₂, q₂) intersect if orientations differ AND the same for the other pair, or if collinear and overlapping.

```
orient(p₁, q₁, p₂) × orient(p₁, q₁, q₂) < 0  AND
orient(p₂, q₂, p₁) × orient(p₂, q₂, q₁) < 0
```

#### 2.3 Point in Polygon (Ray Casting)

Shoot a horizontal ray to the right. Count edge intersections. Odd = inside, even = outside.

#### 2.4 Closest Pair of Points (Divide and Conquer)

1. Sort by x; divide into left/right halves
2. Recurse on each half (min distance d)
3. Strip: points within d of dividing line, sorted by y
4. Check each point against next 7 in strip
5. Return minimum

O(N log N)

#### 2.5 Line Sweep

Process elements sorted by one coordinate, maintain "active" elements in a BST/segment tree. Reduces 2D problems to 1D.

Applications: rectangle union area, segment intersection, closest pair.

#### 2.6 Rotating Calipers

Two parallel lines "rotate" around a convex polygon, maintaining contact. O(N) after hull construction.

Applications: diameter (farthest pair), minimum width, max distance between polygons.

#### 2.7 Convex Hull Trick (CHT)

DP optimization for `dp[i] = min/max(dp[j] + cost(j,i))` where cost involves a product of prefix[i] and prefix[j]. Maintain lines y = m·x + c in a deque or Li Chao tree.

---

### 3. PROBLEM RECOGNITION

**Keywords:**
- "convex hull", "convex polygon"
- "intersection", "collision"
- "closest pair", "nearest neighbor"
- "point in polygon", "inside/outside"
- "sweep line", "line sweep"
- "minimum distance", "maximum distance"
- "diameter", "width", "calipers"
- "visibility", "line of sight"
- "union" / "intersection" of shapes

---

### 4. PATTERN ANALYSIS

#### Pattern 1: Convex Hull

**When to use:** "Smallest polygon containing all points," "outer boundary."

**Complexity:** O(N log N) for Monotone Chain.

**Common mistakes:** Not handling collinear points; forgetting last point connects to first; integer overflow in cross product.

#### Pattern 2: Segment Intersection

**When to use:** "Do these segments cross?"

**Complexity:** O(1) per pair; O((N+K) log N) sweep for all intersections.

**Common mistakes:** Collinear overlapping segments; endpoint handling.

#### Pattern 3: Closest Pair

**When to use:** "Minimum distance between any two points."

**Complexity:** O(N log N).

**Common mistakes:** Not checking enough points in strip (need at least 7); sorting strip by y each recursion adds log factor.

#### Pattern 4: Line Sweep

**When to use:** Intervals, overlapping shapes, event-based geometry.

**Complexity:** O(N log N).

**Common mistakes:** Events at same x — start vs end order matters.

#### Pattern 5: Convex Hull Trick

**When to use:** DP with quadratic time that involves prefix products.

**Complexity:** O(N) (monotonic slopes) or O(N log N) (Li Chao tree).

---

### 5. REUSABLE CODING TEMPLATES

#### Template 1: Convex Hull — Monotone Chain

```python
def convex_hull(points):
    points = sorted(set(points))
    if len(points) <= 1:
        return points
    
    def cross(o, a, b):
        return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
    
    lower = []
    for p in points:
        while len(lower) >= 2 and cross(lower[-2], lower[-1], p) <= 0:
            lower.pop()
        lower.append(p)
    
    upper = []
    for p in reversed(points):
        while len(upper) >= 2 and cross(upper[-2], upper[-1], p) <= 0:
            upper.pop()
        upper.append(p)
    
    return lower[:-1] + upper[:-1]
```

```cpp
using Point = pair<long long, long long>;

long long cross(Point o, Point a, Point b) {
    return (a.first - o.first) * (b.second - o.second)
         - (a.second - o.second) * (b.first - o.first);
}

vector<Point> convex_hull(vector<Point> points) {
    sort(points.begin(), points.end());
    points.erase(unique(points.begin(), points.end()), points.end());
    if (points.size() <= 1) return points;
    
    vector<Point> lower, upper;
    for (auto& p : points) {
        while (lower.size() >= 2 && cross(lower[lower.size()-2], lower.back(), p) <= 0)
            lower.pop_back();
        lower.push_back(p);
    }
    for (int i = points.size()-1; i >= 0; i--) {
        auto& p = points[i];
        while (upper.size() >= 2 && cross(upper[upper.size()-2], upper.back(), p) <= 0)
            upper.pop_back();
        upper.push_back(p);
    }
    lower.pop_back(); upper.pop_back();
    lower.insert(lower.end(), upper.begin(), upper.end());
    return lower;
}
```

```java
public static List<int[]> convexHull(int[][] points) {
    Arrays.sort(points, (a,b) -> a[0]!=b[0] ? a[0]-b[0] : a[1]-b[1]);
    int n = points.length;
    if (n <= 1) return Arrays.asList(points);
    
    List<int[]> lower = new ArrayList<>();
    for (int[] p : points) {
        while (lower.size() >= 2 && cross(lower.get(lower.size()-2), lower.get(lower.size()-1), p) <= 0)
            lower.remove(lower.size()-1);
        lower.add(p);
    }
    List<int[]> upper = new ArrayList<>();
    for (int i = n-1; i >= 0; i--) {
        int[] p = points[i];
        while (upper.size() >= 2 && cross(upper.get(upper.size()-2), upper.get(upper.size()-1), p) <= 0)
            upper.remove(upper.size()-1);
        upper.add(p);
    }
    lower.remove(lower.size()-1);
    upper.remove(upper.size()-1);
    lower.addAll(upper);
    return lower;
}

static long cross(int[] o, int[] a, int[] b) {
    return (long)(a[0]-o[0]) * (b[1]-o[1]) - (long)(a[1]-o[1]) * (b[0]-o[0]);
}
```

#### Template 2: Segment Intersection Test

```python
def on_segment(p, q, r):
    return (min(p[0], r[0]) <= q[0] <= max(p[0], r[0]) and
            min(p[1], r[1]) <= q[1] <= max(p[1], r[1]))

def segments_intersect(p1, q1, p2, q2):
    o1 = orientation(p1, q1, p2)
    o2 = orientation(p1, q1, q2)
    o3 = orientation(p2, q2, p1)
    o4 = orientation(p2, q2, q1)
    
    if o1 * o2 < 0 and o3 * o4 < 0:
        return True
    if o1 == 0 and on_segment(p1, p2, q1): return True
    if o2 == 0 and on_segment(p1, q2, q1): return True
    if o3 == 0 and on_segment(p2, p1, q2): return True
    if o4 == 0 and on_segment(p2, q1, q2): return True
    return False
```

#### Template 3: Point in Polygon (Ray Casting)

```python
def point_in_polygon(point, polygon):
    x, y = point
    inside = False
    n = len(polygon)
    
    for i in range(n):
        x1, y1 = polygon[i]
        x2, y2 = polygon[(i + 1) % n]
        
        if orientation((x1, y1), (x2, y2), point) == 0 and \
           on_segment((x1, y1), point, (x2, y2)):
            return -1  # on boundary
        
        if (y1 > y) != (y2 > y):
            x_intersect = x1 + (x2 - x1) * (y - y1) / (y2 - y1)
            if x < x_intersect:
                inside = not inside
    
    return 1 if inside else 0
```

#### Template 4: Closest Pair of Points (Divide and Conquer)

```python
import math

def closest_pair(points):
    points.sort()
    
    def dist2(p, q):
        return (p[0]-q[0])**2 + (p[1]-q[1])**2
    
    def solve(pts):
        n = len(pts)
        if n <= 3:
            md = float('inf')
            pair = None
            for i in range(n):
                for j in range(i+1, n):
                    d = dist2(pts[i], pts[j])
                    if d < md:
                        md, pair = d, (pts[i], pts[j])
            return md, pair, sorted(pts, key=lambda p: p[1])
        
        mid = n // 2
        mid_x = pts[mid][0]
        dl, pair_l, y_left = solve(pts[:mid])
        dr, pair_r, y_right = solve(pts[mid:])
        
        d = min(dl, dr)
        best_pair = pair_l if dl <= dr else pair_r
        
        i = j = 0
        y_merged = []
        while i < len(y_left) and j < len(y_right):
            if y_left[i][1] <= y_right[j][1]:
                y_merged.append(y_left[i]); i += 1
            else:
                y_merged.append(y_right[j]); j += 1
        y_merged.extend(y_left[i:])
        y_merged.extend(y_right[j:])
        
        strip = [p for p in y_merged if abs(p[0] - mid_x) < math.sqrt(d)]
        for i in range(len(strip)):
            for j in range(i+1, min(i+7, len(strip))):
                if (strip[j][1] - strip[i][1])**2 >= d:
                    break
                dd = dist2(strip[i], strip[j])
                if dd < d:
                    d = dd
                    best_pair = (strip[i], strip[j])
        
        return d, best_pair, y_merged
    
    _, pair, _ = solve(points)
    return pair
```

#### Template 5: Rotating Calipers (Diameter)

```python
def polygon_diameter(hull):
    n = len(hull)
    if n <= 2:
        return 0 if n <= 1 else math.hypot(hull[0][0]-hull[1][0], hull[0][1]-hull[1][1])
    
    def dist2(p, q):
        return (p[0]-q[0])**2 + (p[1]-q[1])**2
    
    k = 1
    max_d = 0
    for i in range(n):
        while True:
            x1 = hull[(i+1)%n][0] - hull[i][0]
            y1 = hull[(i+1)%n][1] - hull[i][1]
            x2 = hull[(k+1)%n][0] - hull[k][0]
            y2 = hull[(k+1)%n][1] - hull[k][1]
            if x1 * y2 - y1 * x2 <= 0:
                break
            k = (k + 1) % n
        max_d = max(max_d, dist2(hull[i], hull[k]))
    
    return math.sqrt(max_d)
```

---

### 6. CURATED REAL PROBLEMS

| # | Problem | Platform | Difficulty | Concepts | Pattern |
|---|---------|----------|------------|----------|---------|
| 1 | Convex Hull (1708) | Baekjoon | Gold 1 | Graham Scan | Convex Hull |
| 2 | Convex Hull | GeeksforGeeks | Medium | Monotone Chain | Convex Hull |
| 3 | Convex Hull Trick | HackerRank | Hard | CHT DP Optimization | DP + Hull |
| 4 | Convex Hull | Kattis | Medium | Convex Hull Algorithm | Hull |
| 5 | DP Z - Frog 3 | AtCoder (2000) | Hard | Li Chao / CHT | DP Optimization |
| 6 | APIO_10_COMMANDO | SPOJ | APIO 2010 | Classic CHT | DP Optimization |
| 7 | Robot protection | Kattis | Medium | Convex Hull | Enclosure |
| 8 | Cow Steeplechase | USACO Gold | Gold | Convex Hull | Hull Intersection |
| 9 | Minimum Bounding Box | AtCoder (2240) | Very Hard | Geometry | Bounding Box |
| 10 | 2087 - Houses and Schools | CSES (1900) | Hard | CHT, DP | DP + Hull |
| 11 | Convex Hull and Farmers | CodeAbbey | Hard | Geometry | Hull Perimeter |
| 12 | Box in Box (ABC 309 F) | AtCoder | Hard | 3D BIT, Segment Tree | 3D Geometry |
| 13 | Integer Convex Hull | AtCoder | Very Hard | Integer Points | Advanced Hull |
| 14 | 1437G - Death DBMS | Codeforces (2200) | Hard | CHT on Tree | DP + Hull |
| 15 | Nearest Convex Hull | Baekjoon | Gold 1 | Closest Pair | Hull + Distance |

---

### 7. GENERATED PRACTICE PROBLEMS

**Easy 1: Simple Hull**
Given N ≤ 100 points, compute the perimeter of their convex hull.

**Easy 2: Line Crossing**
Given two line segments AB and CD, determine if they intersect.

**Medium 1: Parking Lot**
An irregular polygon parking lot has N vertices. A car at point P — is it inside? Answer Q queries.

**Medium 2: Rectangle Union**
Given N axis-aligned rectangles, compute the union area using sweep line. N ≤ 10⁵.

**Hard 1: Farthest Pair in a Forest**
You have K convex polygons. Find the maximum Euclidean distance between any point in one polygon and any point in another. HINT: farthest pair lies on hull vertices.

**Hard 2: Minimum Enclosing Circle**
Given N points, find the smallest circle that encloses all points. Use Welzl's algorithm (expected O(N)).

**Interview-Style: Max Points on a Line**
Given N points, find the max number of points on the same line. (LeetCode 149)

**Contest-Style: Voronoi Neighbors**
Given N points, for each find its nearest neighbor. N ≤ 2×10⁵. Must be faster than O(N²).

---

### 8. COMPLETE SOLUTION SECTION

---

#### Problem 1: Convex Hull — Monotone Chain

**A. Intuition**
Build hull in two parts: lower (left→right, keep left turns) and upper (right→left, same rule).

**B. Brute Force**
Jarvis March (Gift Wrapping): O(N²). Start from leftmost, repeatedly find point with smallest polar angle.

**C. Optimized Approach**
Monotone Chain. Sort once, build in O(N).

**D. Step-by-Step**
1. Sort by x then y, remove duplicates
2. Lower hull: iterate; while last 2 + new make CW/collinear turn, pop; add new
3. Upper hull: iterate reversed; same logic
4. Remove endpoint duplicates, merge

**E. Complexity** O(N log N).

**F. Edge Cases**
- 1 point: hull = that point
- All collinear: hull = two extremes
- Integer overflow: use 64-bit cross product

**G. Code**

```python
def convex_hull(points):
    points = sorted(set(points))
    if len(points) <= 1:
        return points
    
    def cross(o, a, b):
        return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
    
    lower = []
    for p in points:
        while len(lower) >= 2 and cross(lower[-2], lower[-1], p) <= 0:
            lower.pop()
        lower.append(p)
    
    upper = []
    for p in reversed(points):
        while len(upper) >= 2 and cross(upper[-2], upper[-1], p) <= 0:
            upper.pop()
        upper.append(p)
    
    return lower[:-1] + upper[:-1]
```

```cpp
vector<Point> convex_hull(vector<Point> points) {
    sort(points.begin(), points.end());
    points.erase(unique(points.begin(), points.end()), points.end());
    if (points.size() <= 1) return points;
    
    vector<Point> lower, upper;
    for (auto& p : points) {
        while (lower.size() >= 2 && cross(lower[lower.size()-2], lower.back(), p) <= 0)
            lower.pop_back();
        lower.push_back(p);
    }
    for (int i = points.size()-1; i >= 0; i--) {
        auto& p = points[i];
        while (upper.size() >= 2 && cross(upper[upper.size()-2], upper.back(), p) <= 0)
            upper.pop_back();
        upper.push_back(p);
    }
    lower.pop_back(); upper.pop_back();
    lower.insert(lower.end(), upper.begin(), upper.end());
    return lower;
}
```

```java
public static List<int[]> convexHull(int[][] points) {
    Arrays.sort(points, (a,b) -> a[0]!=b[0] ? a[0]-b[0] : a[1]-b[1]);
    int n = points.length;
    if (n <= 1) return Arrays.asList(points);
    
    List<int[]> lower = new ArrayList<>();
    for (int[] p : points) {
        while (lower.size() >= 2 && cross(lower.get(lower.size()-2), lower.get(lower.size()-1), p) <= 0)
            lower.remove(lower.size()-1);
        lower.add(p);
    }
    List<int[]> upper = new ArrayList<>();
    for (int i = n-1; i >= 0; i--) {
        int[] p = points[i];
        while (upper.size() >= 2 && cross(upper.get(upper.size()-2), upper.get(upper.size()-1), p) <= 0)
            upper.remove(upper.size()-1);
        upper.add(p);
    }
    lower.remove(lower.size()-1);
    upper.remove(upper.size()-1);
    lower.addAll(upper);
    return lower;
}
```

---

#### Problem 2: Point in Polygon (Ray Casting)

**A. Intuition**
Shoot a ray to the right. Count edge crossings. Odd = inside.

For convex polygons: binary search over fan of triangles from first vertex, O(log N).

**B. Brute Force**
Sum of signed angles method: O(N) with expensive trig.

**C. Optimized Approach**
Ray casting with orientation tests. O(N) per query, no trig.

**D. Step-by-Step (Ray Casting)**
1. For each edge:
   - Check if point is on edge → boundary
   - If edge's y-range straddles point's y, compute x-intersection
   - If x_intersect > point's x, toggle inside
2. Return inside flag

**E. Complexity** O(N) per query (general). O(log N) (convex with preprocessing).

**F. Edge Cases**
- Point on vertex → boundary
- Ray through vertex: count only if other endpoint is above
- Degenerate polygon

**G. Code (Convex Polygon, O(log N))**

```python
def point_in_convex_polygon(point, hull):
    """hull in CCW order. O(log N)."""
    n = len(hull)
    if n < 3: return False
    
    o = orientation(hull[0], hull[1], point)
    if o < 0: return False
    if o == 0: return on_segment(hull[0], point, hull[1])
    
    lo, hi = 1, n
    while hi - lo > 1:
        mid = (lo + hi) // 2
        if orientation(hull[0], hull[mid], point) >= 0:
            lo = mid
        else:
            hi = mid
    
    if lo == n - 1:
        return on_segment(hull[0], point, hull[n-1])
    
    return orientation(hull[lo], hull[lo+1], point) >= 0
```

---

#### Problem 3: Closest Pair of Points (Divide and Conquer)

**A. Intuition**
Divide by x, solve halves, check strip. Key insight: only need to check 7 next points in strip sorted by y.

**B. Brute Force**
O(N²). Too slow for N > 10⁴.

**C. Optimized Approach**
Divide and conquer, O(N log N). Pre-sort all points by y to avoid repeated sorting.

**D. Step-by-Step**
1. Sort by x
2. Recursively find closest in left/right halves → d
3. Build strip within d of dividing line
4. Check each point vs next 7
5. Return closest pair

**E. Complexity** O(N log N).

**F. Edge Cases**
- N < 2: no pair
- Duplicate points: distance 0
- Use squared distance to avoid sqrt

**G. Code** (See Template 4 above for full implementation)

---

#### Problem 4: APIO_10_COMMANDO — Convex Hull Trick

**A. Intuition**
DP recurrence: dp[i] = max(dp[j] + a·(sum[i]-sum[j])² + b·(sum[i]-sum[j]) + c). Expand to: dp[i] = max(intercept[j] + slope[j]·sum[i]). This is the classic CHT form.

**B. Brute Force**
O(N²) — check all j for each i.

**C. Optimized Approach**
Maintain lines (slope, intercept) in a deque. Since slopes are monotonic (increasing prefix sums), pop from front when line is no longer optimal; pop from back when new line makes previous redundant.

**D. Complexity** O(N).

**E. Code**

```python
def commando(N, a, b, c, xs):
    prefix = [0] * (N + 1)
    for i in range(N):
        prefix[i+1] = prefix[i] + xs[i]
    
    dp = [0] * (N + 1)
    from collections import deque
    dq = deque([0])
    
    def value(j, x):
        return (-2*a*prefix[j]) * x + (a*prefix[j]**2 - b*prefix[j] + dp[j])
    
    def cross(l1, l2, l3):
        a1 = -2*a*prefix[l1]; b1 = a*prefix[l1]**2 - b*prefix[l1] + dp[l1]
        a2 = -2*a*prefix[l2]; b2 = a*prefix[l2]**2 - b*prefix[l2] + dp[l2]
        a3 = -2*a*prefix[l3]; b3 = a*prefix[l3]**2 - b*prefix[l3] + dp[l3]
        return (b2 - b1) * (a3 - a2) >= (b3 - b2) * (a2 - a1)
    
    for i in range(1, N + 1):
        while len(dq) >= 2 and value(dq[0], prefix[i]) <= value(dq[1], prefix[i]):
            dq.popleft()
        j = dq[0]
        x = prefix[i] - prefix[j]
        dp[i] = dp[j] + a*x*x + b*x + c
        
        while len(dq) >= 2 and cross(dq[-2], dq[-1], i):
            dq.pop()
        dq.append(i)
    
    return dp[N]
```

---

## Chapter 15: Advanced Geometry Algorithms

---

### 1. INTRODUCTION

Advanced geometry algorithms push beyond foundational techniques into specialized domains:

- **Fractal geometry:** self-similar patterns at different scales
- **3D geometry:** objects with depth, volume, spatial intersections
- **Sphere packing:** optimal arrangement in space
- **Bezier curves:** smooth curves from control points (fonts, vector graphics)
- **Geodesics:** shortest paths on curved surfaces
- **Voronoi diagrams:** nearest-neighbor region partitioning
- **Delaunay triangulation:** angle-optimized triangulation

These are staples of advanced competitive programming, graphics, and engineering.

---

### 2. CORE CONCEPTS

#### 2.1 Fractals

Self-similar shapes at all scales.

**Mandelbrot Set:** For each complex number c, iterate `z = z² + c` from z = 0. If bounded, c is in the set.

**H-Tree:** Each branch splits into two perpendicular branches of half length.

**Sierpinski Triangle:** Triangle recursively subdivided into 4, middle removed.

#### 2.2 3D Geometry

**Distance:** `d = √((x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²)`

**Point-plane distance:** `dist = |ax₀+by₀+cz₀+d| / √(a²+b²+c²)`

**Tetrahedron volume:** `V = |AB · (AC × AD)| / 6`

#### 2.3 Bezier Curves

**Cubic:** `B(t) = (1-t)³P₀ + 3(1-t)²tP₁ + 3(1-t)t²P₂ + t³P₃`

Properties: passes through P₀, P₃; tangent at ends points to P₁, P₂; lies in convex hull of control points.

#### 2.4 Voronoi / Delaunay

**Voronoi:** Partition by nearest seed point.
**Delaunay:** Dual graph — connects seeds whose Voronoi cells touch. Maximizes minimum angle. O(N log N) via Fortune's algorithm.

---

### 3. PROBLEM RECOGNITION

**Keywords:** fractal, 3D, volume, packing, Bezier, curve, Voronoi, Delaunay, Mandelbrot, complex, geodesic, sphere, cube, tetrahedron.

---

### 4. PATTERN ANALYSIS

#### Pattern 1: Fractal Recursion

**When to use:** Self-similar recursive shapes.

**Complexity:** O(branching^depth).

#### Pattern 2: 3D Geometry

**When to use:** Problems involving cubes, spheres, 3D points.

**Complexity:** O(1) for formulas, O(N) for multiple objects.

#### Pattern 3: Bezier Curves

**When to use:** Smooth interpolation, path design.

**Algorithm:** De Casteljau's recursive evaluation.

**Complexity:** O(1) per evaluation.

---

### 5. REUSABLE CODING TEMPLATES

#### Template 1: Mandelbrot Set

```python
def mandelbrot(cx, cy, max_iter=100):
    x = y = 0
    for i in range(max_iter):
        x2, y2 = x*x - y*y + cx, 2*x*y + cy
        x, y = x2, y2
        if x*x + y*y > 4:
            return i
    return max_iter
```

#### Template 2: H-Tree

```python
def h_tree(x, y, length, depth):
    if depth == 0:
        return
    draw_line(x-length/2, y, x+length/2, y)
    draw_line(x-length/2, y-length/2, x-length/2, y+length/2)
    draw_line(x+length/2, y-length/2, x+length/2, y+length/2)
    new_len = length / math.sqrt(2)
    h_tree(x-length/2, y-length/2, new_len, depth-1)
    h_tree(x-length/2, y+length/2, new_len, depth-1)
    h_tree(x+length/2, y-length/2, new_len, depth-1)
    h_tree(x+length/2, y+length/2, new_len, depth-1)
```

#### Template 3: 3D Vector Math

```python
import math

class Vec3:
    def __init__(self, x=0, y=0, z=0):
        self.x, self.y, self.z = x, y, z
    
    def dot(self, other):
        return self.x*other.x + self.y*other.y + self.z*other.z
    
    def cross(self, other):
        return Vec3(
            self.y*other.z - self.z*other.y,
            self.z*other.x - self.x*other.z,
            self.x*other.y - self.y*other.x
        )
    
    def length(self):
        return math.sqrt(self.x**2 + self.y**2 + self.z**2)
    
    def dist_to(self, other):
        return math.sqrt((self.x-other.x)**2 + (self.y-other.y)**2 + (self.z-other.z)**2)
```

#### Template 4: Bezier Curve (De Casteljau)

```python
def bezier_point(points, t):
    pts = points[:]
    n = len(pts)
    while n > 1:
        for i in range(n - 1):
            x = (1 - t) * pts[i][0] + t * pts[i+1][0]
            y = (1 - t) * pts[i][1] + t * pts[i+1][1]
            pts[i] = (x, y)
        n -= 1
    return pts[0]
```

```cpp
pair<double,double> bezierPoint(vector<pair<double,double>>& pts, double t) {
    int n = pts.size();
    vector<pair<double,double>> cur = pts;
    while (n > 1) {
        for (int i = 0; i < n-1; i++) {
            cur[i].first = (1-t) * cur[i].first + t * cur[i+1].first;
            cur[i].second = (1-t) * cur[i].second + t * cur[i+1].second;
        }
        n--;
    }
    return cur[0];
}
```

#### Template 5: 3D Rotation Matrices

```python
def rotate_x(point, angle_rad):
    x, y, z = point
    return (x, y*math.cos(angle_rad) - z*math.sin(angle_rad),
            y*math.sin(angle_rad) + z*math.cos(angle_rad))

def rotate_y(point, angle_rad):
    x, y, z = point
    return (x*math.cos(angle_rad) + z*math.sin(angle_rad), y,
            -x*math.sin(angle_rad) + z*math.cos(angle_rad))

def rotate_z(point, angle_rad):
    x, y, z = point
    return (x*math.cos(angle_rad) - y*math.sin(angle_rad),
            x*math.sin(angle_rad) + y*math.cos(angle_rad), z)
```

---

### 6. CURATED REAL PROBLEMS

| # | Problem | Platform | Difficulty | Concepts | Pattern |
|---|---------|----------|------------|----------|---------|
| 1 | 2073D. Tower of Hanoi | Codeforces (2400) | Hard | Recursion | Fractal |
| 2 | ABC 115 D - Christmas | AtCoder (1400) | Medium | Recursion | Fractal Burger |
| 3 | 36B. Fractal | Codeforces (1600) | Medium | Grid Drawing | Fractal |
| 4 | H-Tree Construction | Pramp | Medium | Recursion | Fractal Tree |
| 5 | Mandelbrot Set | CodeAbbey | Hard | Complex Numbers | Fractal |
| 6 | Cubes - 2 | E-Olymp | Very Easy | 3D Geometry | Volume |
| 7 | Spheres | HackerRank | Medium | 3D Geometry | Intersection |
| 8 | Cylinder | SPOJ | Medium | 3D Geometry | Volume |
| 9 | 532 - Dungeon Master | UVa | Medium | BFS in 3D | 3D Grid BFS |
| 10 | ABC 180 E - TSP Aerial Cities | AtCoder | Hard | TSP Bitmask DP | 3D TSP |
| 11 | Cube Summation | HackerRank | Hard | 3D Fenwick | 3D Range Query |
| 12 | Sphere Packing | Project Euler 222 | Very Hard | Packing | Geometry |
| 13 | Bezier Curves | Project Euler 363 | Very Hard | Splines | Curve Geometry |
| 14 | Nanobots on Geodesics | Project Euler 532 | Very Hard | Geodesics | 3D Surface |
| 15 | Ball (12D) | Codeforces | Hard | 3D Fenwick | 3D Data Structure |

---

### 7. GENERATED PRACTICE PROBLEMS

**Easy 1: Cube Surface**
Given the side length of a cube, compute its surface area and volume.

**Easy 2: Recursive Squares**
Start with a square of side 1. At each corner, attach a square of side half the previous. After N steps, total area?

**Medium 1: Tower of Hanoi Simulation**
Given N disks and Kth move, which disk moves where?

**Medium 2: Sphere Overlap**
Two spheres with centers and radii — do they intersect? Compute intersection volume if yes.

**Hard 1: 3D Convex Hull**
Given N points in 3D, compute the faces of their convex hull. N ≤ 2000.

**Hard 2: Fractal Dimension**
Given a fractal rule (e.g., Sierpinski carpet), compute Hausdorff dimension and area after N iterations.

**Interview-Style: Line of Sight in 3D**
Can you see point P₂ from P₁ with a blocking sphere of radius R? Compute visibility.

**Contest-Style: Voronoi on a Torus**
Compute Voronoi diagram of N points on a torus surface. Approximate using 3D embedding metric.

---

### 8. COMPLETE SOLUTION SECTION

---

#### Problem 1: ABC 115 D - Christmas (AtCoder, Fractal Burger)

**A. Intuition**
A level-N "Christmas burger" = bun + level-(N-1) burger + patty + level-(N-1) burger + bun. Need patty count in bottom X layers. Recursive fractal.

**B. Brute Force**
Build entire burger for small N only (exponential size).

**C. Optimized Approach**
Recursion with precomputed totals. At each level, decide which part the bottom X layers fall into.

**D. Step-by-Step**
1. Precompute total_len[N] and patties[N]:
   - len[0] = 1, pat[0] = 1
   - len[N] = 3 + 2·len[N-1], pat[N] = 1 + 2·pat[N-1]
2. Recursive count(N, X):
   - X ≤ 0: 0
   - N = 0: 1
   - X ≤ 1: 0 (just bun)
   - X ≤ 1 + len[N-1]: count(N-1, X-1)
   - X = 1 + len[N-1] + 1: pat[N-1] + 1
   - else: pat[N-1] + 1 + count(N-1, X - 2 - len[N-1])

**E. Complexity** O(N).

**F. Edge Cases**
- X = 0: 0
- X ≥ total_len[N]: full patty count

**G. Code**

```python
def christmas_burger(N, X):
    total_len = [0] * (N + 1)
    patties = [0] * (N + 1)
    total_len[0] = 1
    patties[0] = 1
    for i in range(1, N + 1):
        total_len[i] = 3 + 2 * total_len[i-1]
        patties[i] = 1 + 2 * patties[i-1]
    
    def count(n, x):
        if x <= 0:
            return 0
        if n == 0:
            return 1
        if x <= 1:
            return 0
        if x <= 1 + total_len[n-1]:
            return count(n-1, x - 1)
        if x == 1 + total_len[n-1] + 1:
            return patties[n-1] + 1
        return patties[n-1] + 1 + count(n-1, x - 2 - total_len[n-1])
    
    return count(N, X)
```

```cpp
long long christmas(int N, long long X) {
    vector<long long> len(N+1), pat(N+1);
    len[0] = 1; pat[0] = 1;
    for (int i = 1; i <= N; i++) {
        len[i] = 3 + 2 * len[i-1];
        pat[i] = 1 + 2 * pat[i-1];
    }
    
    function<long long(int, long long)> count = [&](int n, long long x) -> long long {
        if (x <= 0) return 0;
        if (n == 0) return 1;
        if (x <= 1) return 0;
        if (x <= 1 + len[n-1]) return count(n-1, x-1);
        if (x == 1 + len[n-1] + 1) return pat[n-1] + 1;
        return pat[n-1] + 1 + count(n-1, x - 2 - len[n-1]);
    };
    
    return count(N, X);
}
```

```java
public class Main {
    static long[] len, pat;
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt();
        long X = sc.nextLong();
        
        len = new long[N+1];
        pat = new long[N+1];
        len[0] = 1; pat[0] = 1;
        for (int i = 1; i <= N; i++) {
            len[i] = 3 + 2 * len[i-1];
            pat[i] = 1 + 2 * pat[i-1];
        }
        
        System.out.println(count(N, X));
    }
    
    static long count(int n, long x) {
        if (x <= 0) return 0;
        if (n == 0) return 1;
        if (x <= 1) return 0;
        if (x <= 1 + len[n-1]) return count(n-1, x-1);
        if (x == 1 + len[n-1] + 1) return pat[n-1] + 1;
        return pat[n-1] + 1 + count(n-1, x - 2 - len[n-1]);
    }
}
```

---

#### Problem 2: 532 - Dungeon Master (UVa, 3D BFS)

**A. Intuition**
This is a shortest-path problem in a 3D grid. The state is (level, row, col). BFS in 3D works exactly like 2D BFS but with 6 neighbors instead of 4 (up, down, N, S, E, W).

**B. Brute Force**
DFS with exhaustive search: will find the path but not guarantee shortest.

**C. Optimized Approach**
Standard 3D BFS from start 'S' to end 'E'. Use a 3D visited array and a queue.

**D. Step-by-Step**
1. Read L (levels), R (rows), C (columns)
2. Find start 'S' position
3. BFS: for each cell, try 6 neighbor directions
4. If 'E' is reached, return distance
5. If queue empties, return "Trapped!"

**E. Complexity** O(L×R×C) time and space.

**F. Edge Cases**
- Start = End (immediate reach)
- No path exists
- Single cell dungeon

**G. Code**

```python
from collections import deque

def dungeon_master(L, R, C, grid):
    # Find start
    for l in range(L):
        for r in range(R):
            for c in range(C):
                if grid[l][r][c] == 'S':
                    sr, sc, sl = r, c, l
    
    dq = deque([(sr, sc, sl, 0)])
    visited = [[[False]*C for _ in range(R)] for _ in range(L)]
    visited[sl][sr][sc] = True
    dirs = [(0,0,1),(0,0,-1),(0,1,0),(0,-1,0),(1,0,0),(-1,0,0)]
    
    while dq:
        r, c, l, dist = dq.popleft()
        if grid[l][r][c] == 'E':
            return f"Escaped in {dist} minute(s)."
        for dr, dc, dl in dirs:
            nr, nc, nl = r+dr, c+dc, l+dl
            if 0 <= nl < L and 0 <= nr < R and 0 <= nc < C and \
               not visited[nl][nr][nc] and grid[nl][nr][nc] != '#':
                visited[nl][nr][nc] = True
                dq.append((nr, nc, nl, dist+1))
    
    return "Trapped!"
```

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int L, R, C;
    while (cin >> L >> R >> C && (L || R || C)) {
        vector<vector<string>> grid(L, vector<string>(R));
        int sl, sr, sc;
        for (int l = 0; l < L; l++)
            for (int r = 0; r < R; r++) {
                cin >> grid[l][r];
                for (int c = 0; c < C; c++)
                    if (grid[l][r][c] == 'S') sl = l, sr = r, sc = c;
            }
        
        queue<tuple<int,int,int,int>> q;
        q.push({sr, sc, sl, 0});
        vector<vector<vector<bool>>> vis(L, vector<vector<bool>>(R, vector<bool>(C, false)));
        vis[sl][sr][sc] = true;
        
        int dr[] = {0,0,0,0,1,-1};
        int dc[] = {0,0,1,-1,0,0};
        int dl[] = {1,-1,0,0,0,0};
        
        bool found = false;
        while (!q.empty() && !found) {
            auto [r, c, l, d] = q.front(); q.pop();
            if (grid[l][r][c] == 'E') {
                cout << "Escaped in " << d << " minute(s).\n";
                found = true;
            }
            for (int i = 0; i < 6; i++) {
                int nr = r+dr[i], nc = c+dc[i], nl = l+dl[i];
                if (nl >= 0 && nl < L && nr >= 0 && nr < R && nc >= 0 && nc < C &&
                    !vis[nl][nr][nc] && grid[nl][nr][nc] != '#') {
                    vis[nl][nr][nc] = true;
                    q.push({nr, nc, nl, d+1});
                }
            }
        }
        if (!found) cout << "Trapped!\n";
    }
}
```

---

## About the Code

All code in these chapters follows the following conventions:
- **Python:** Uses native types (tuples, lists), math module, and standard library.
- **C++:** Uses `long long` for cross products to avoid overflow, `function` for recursion, and standard library containers.
- **Java:** Uses `long` for cross products, `List<int[]>` for points, and `Arrays.deepEquals` for matrix comparison.

All implementations assume you have already read the input and are working on the core algorithmic logic.
