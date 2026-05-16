# Geometry and Shape Problems in Data Structures and Algorithms — From Beginner to Advanced

---

## Chapter 1: Introduction to Shapes

### 1. INTRODUCTION

Welcome to the world of shapes in programming. If you have never written a geometry algorithm before, do not worry — we will start from the absolute ground floor.

**What is a "shape" in computing?**

When we say "shape" in the context of DSA problems, we mean any structured arrangement of points, lines, or cells that forms a recognizable pattern. This could be:
- A triangle drawn on a grid of `1`s and `0`s
- A rectangle formed by four corners in 2D space
- A polygon defined by a sequence of vertices
- A pattern of `1` cells that looks like an "L" shape in binary matrix

**Real-world intuition:** Think of organizing chairs in a room. You might arrange them in a perfect square grid, in a circle, or in a rectangular block. The shape of your arrangement determines what fits where. Similarly, in coding problems, we often need to detect, count, or transform shapes.

**Why does it matter?** Shape problems teach you:
- How to traverse 2D space systematically
- How to identify patterns in noisy data
- How grid coordinates work (row = y, column = x)
- How to measure geometric properties (area, perimeter, symmetry)

**The fundamental mental model:** Everything on a computer screen is ultimately a grid of pixels. In algorithmic problems, we typically work with much smaller grids or coordinate systems. The core skill is learning to "see" shapes within these grids.

**A shape is defined by its boundaries.** Whether you have a triangle, a square, or a circle, what makes a shape distinct is:
1. Its set of boundary points
2. The relationship between those points
3. The area it encloses

### 2. CORE CONCEPTS

#### 2.1 Grid Basics

A 2D grid (or matrix) is an `m x n` array of cells. Each cell has coordinates `(r, c)` where `r` is the row index (0 to m-1, top to bottom) and `c` is the column index (0 to n-1, left to right).

```
Grid (4 x 5):
    c0  c1  c2  c3  c4
r0  [ ] [ ] [ ] [ ] [ ]
r1  [ ] [ ] [ ] [ ] [ ]
r2  [ ] [ ] [ ] [ ] [ ]
r3  [ ] [ ] [ ] [ ] [ ]
```

**Neighbors:** Each cell has up to 4 orthogonal neighbors (up, down, left, right) and up to 4 diagonal neighbors:

```
(r-1, c-1)  (r-1, c)  (r-1, c+1)
(r,   c-1)  [r,   c]  (r,   c+1)
(r+1, c-1)  (r+1, c)  (r+1, c+1)
```

#### 2.2 Shape Perimeter on a Grid

When shapes are formed by `1`s in a binary matrix, the perimeter can be computed cell by cell:
- Each cell with value `1` contributes 4 to the potential perimeter
- Subtract 1 for each orthogonal neighbor that is also `1`

```
Example:
0 1 0
1 1 1
0 1 0

Perimeter: 
- Center cell has 4 neighbors -> contributes 0
- Top, left, right, bottom cells each have 2 neighbors -> contribute 2 each
- Total = 4 * 2 = 8
```

#### 2.3 Surface Area of 3D Shapes

For 3D shapes built from unit cubes on a grid:
- Each cube has 6 faces
- A face is exposed if no adjacent cube occupies that side
- Projection area: count of non-zero cells when viewed from top, front, side

**Projection rules:**
- **Top view (xy-plane):** Count every cell with height > 0
- **Front view (xz-plane):** For each column, the maximum height
- **Side view (yz-plane):** For each row, the maximum height

#### 2.4 Shape Rotation and Translation

**Translation:** Moving a shape by adding a constant offset to all coordinates:
```
New point = (x + dx, y + dy)
```

**90-degree rotation on grid:** Rotating a shape by 90 degrees clockwise:
- New coordinates: `(r, c) -> (c, rows-1-r)`

**Normalization for shape matching:** To compare shapes regardless of position, translate so the top-left point is at `(0, 0)`:
```
min_r = min(r_i); min_c = min(c_i)
normalized = [(r_i - min_r, c_i - min_c) for each point]
```

#### 2.5 Point-in-Shape Detection

For a point `(x, y)`, determine if it lies inside a shape:

- **Rectangle:** Check if `x` is between rectangle bounds and `y` is between rectangle bounds
- **Circle:** Check if distance from center `<= radius`
- **Triangle:** Use barycentric coordinates or area method

#### 2.6 Convex vs Concave Shapes

- **Convex shape:** All interior angles are <= 180 degrees. Any line segment between two points lies entirely inside the shape.
- **Concave shape:** At least one interior angle > 180 degrees. Has "indentations."

### 3. PROBLEM RECOGNITION

**Keywords that signal shape identification problems:**
- "shape", "pattern", "figure"
- "grid", "matrix", "board"
- "L-shape", "T-shape", "polyomino"
- "rotate", "translate", "reflect", "mirror"
- "connected 1s", "island", "blob"
- "perimeter", "boundary", "contour"
- "projection", "surface area"
- "projection area" (3D shapes)
- "minimum rectangle covering"
- "transform", "normalize" (shape matching)

**How interviewers frame these:**
- "Given a binary matrix, find the perimeter of the shape formed by 1s"
- "Determine if the two shapes are the same after rotation/translation"
- "Calculate the surface area of a 3D shape built on a grid"
- "Find the smallest rectangle that encloses all marked cells"
- "Check if a set of points forms a valid rectangle/square"
- "How many L-shaped pieces can you fit?"

**Hidden geometry indicators:**
- Problems about "painting", "coloring" contiguous regions
- "Game of Life" style grid transformations
- "Puzzle piece" fitting problems
- "Find the pattern" in a matrix

### 4. PATTERN ANALYSIS

#### Pattern 1: Grid Traversal for Shape Detection
- **When to use:** Matrix/grid with 0/1s; need to identify or count shapes
- **Why it works:** BFS/DFS from each unvisited 1-cell collects all connected cells forming the shape
- **Complexity:** O(m * n) time, O(m * n) space
- **Common mistake:** Forgetting that diagonal connections in some problems don't count as connected (4-directional vs 8-directional)

#### Pattern 2: Shape Normalization for Comparison
- **When to use:** Two shapes need to be compared for rotational/translational equality
- **Why it works:** By normalizing to a canonical position, equivalent shapes produce identical representations
- **Complexity:** O(k) where k is the number of cells in the shape
- **Common mistake:** Not generating all rotations — a shape may match after 90, 180, 270 degrees

#### Pattern 3: Perimeter via Neighbor Counting
- **When to use:** Need the perimeter of a shape formed by 1s in a binary matrix
- **Why it works:** Each 1-cell contributes 4 - (number of 1-neighbors) to the perimeter
- **Complexity:** O(m * n)
- **Common mistake:** Only checking 4 directions, not 8 (depends on problem definition)

#### Pattern 4: Bounding Box Analysis
- **When to use:** Need to enclose a shape, check alignment, or detect rectangles
- **Why it works:** The min/max row and column of shape cells define the tightest enclosing rectangle
- **Complexity:** O(m * n) to find boundaries
- **Common mistake:** Assuming the shape is aligned with grid axes

### 5. REUSABLE CODING TEMPLATES

#### Template 1: Grid BFS/DFS for Connected Components

```python
def get_cells(grid, r, c, visited):
    """Collect all cells of a connected shape (4-directional)."""
    m, n = len(grid), len(grid[0])
    stack = [(r, c)]
    visited[r][c] = True
    cells = []
    while stack:
        cr, cc = stack.pop()
        cells.append((cr, cc))
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = cr + dr, cc + dc
            if 0 <= nr < m and 0 <= nc < n and not visited[nr][nc] and grid[nr][nc] == 1:
                visited[nr][nc] = True
                stack.append((nr, nc))
    return cells

def find_shapes(grid):
    m, n = len(grid), len(grid[0])
    visited = [[False] * n for _ in range(m)]
    shapes = []
    for i in range(m):
        for j in range(n):
            if grid[i][j] == 1 and not visited[i][j]:
                shapes.append(get_cells(grid, i, j, visited))
    return shapes
```

```cpp
#include <vector>
#include <stack>
#include <utility>

using namespace std;

vector<pair<int,int>> get_cells(vector<vector<int>>& grid, int r, int c, vector<vector<bool>>& visited) {
    int m = grid.size(), n = grid[0].size();
    stack<pair<int,int>> st;
    st.push({r, c});
    visited[r][c] = true;
    vector<pair<int,int>> cells;
    int dr[] = {1, -1, 0, 0};
    int dc[] = {0, 0, 1, -1};
    while (!st.empty()) {
        auto [cr, cc] = st.top(); st.pop();
        cells.push_back({cr, cc});
        for (int d = 0; d < 4; d++) {
            int nr = cr + dr[d], nc = cc + dc[d];
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc] && grid[nr][nc] == 1) {
                visited[nr][nc] = true;
                st.push({nr, nc});
            }
        }
    }
    return cells;
}
```

```java
import java.util.*;

class ShapeUtils {
    static int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
    
    static List<int[]> getCells(int[][] grid, int r, int c, boolean[][] visited) {
        int m = grid.length, n = grid[0].length;
        Stack<int[]> stack = new Stack<>();
        stack.push(new int[]{r, c});
        visited[r][c] = true;
        List<int[]> cells = new ArrayList<>();
        while (!stack.isEmpty()) {
            int[] cur = stack.pop();
            cells.add(cur);
            for (int[] d : dirs) {
                int nr = cur[0] + d[0], nc = cur[1] + d[1];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc] && grid[nr][nc] == 1) {
                    visited[nr][nc] = true;
                    stack.push(new int[]{nr, nc});
                }
            }
        }
        return cells;
    }
}
```

#### Template 2: Shape Normalization

```python
def normalize(cells):
    """Translate shape so top-left point is at (0,0)."""
    if not cells:
        return []
    min_r = min(r for r, c in cells)
    min_c = min(c for r, c in cells)
    return sorted([(r - min_r, c - min_c) for r, c in cells])

def rotate_90(cells, max_r=None, max_c=None):
    """Rotate shape 90 degrees clockwise."""
    if not cells:
        return []
    if max_r is None:
        max_r = max(r for r, c in cells)
    if max_c is None:
        max_c = max(c for r, c in cells)
    rotated = [(c, max_r - r) for r, c in cells]
    return normalize(rotated)
```

#### Template 3: Perimeter of Shape in Binary Matrix

```python
def perimeter(grid):
    m, n = len(grid), len(grid[0])
    total = 0
    for i in range(m):
        for j in range(n):
            if grid[i][j] == 1:
                total += 4
                if i > 0 and grid[i-1][j] == 1:
                    total -= 2  # shared edge counted twice
                if j > 0 and grid[i][j-1] == 1:
                    total -= 2
    return total
```

#### Template 4: Bounding Box

```python
def bounding_box(cells):
    if not cells:
        return None
    min_r = min(r for r, c in cells)
    max_r = max(r for r, c in cells)
    min_c = min(c for r, c in cells)
    max_c = max(c for r, c in cells)
    return (min_r, min_c, max_r, max_c)
```

#### Template 5: Projection Area (3D Shapes)

```python
def projection_area(grid):
    """grid[i][j] = height of cube at (i,j)."""
    top = sum(1 for row in grid for val in row if val > 0)
    front = sum(max(col) for col in zip(*grid))
    side = sum(max(row) for row in grid)
    return top + front + side
```

#### Template 6: Surface Area of 3D Shapes

```python
def surface_area(grid):
    m, n = len(grid), len(grid[0])
    area = 0
    for i in range(m):
        for j in range(n):
            if grid[i][j]:
                area += 4 * grid[i][j] + 2  # sides + top/bottom
                if i > 0:
                    area -= 2 * min(grid[i][j], grid[i-1][j])
                if j > 0:
                    area -= 2 * min(grid[i][j], grid[i][j-1])
    return area
```

### 6. CURATED REAL PROBLEMS

| # | Problem | Platform | Difficulty | URL | Concepts | Pattern |
|---|---|---|---|---|---|---|
| 1 | Vlad and Shapes | Codeforces | 800 | https://codeforces.com/problemset/problem/1926/b | Grid shape recognition | Bounding box |
| 2 | Projection Area of 3D Shapes | LeetCode | Easy | https://leetcode.com/problems/projection-area-of-3d-shapes/ | 3D projection | Grid traversal |
| 3 | Surface Area of 3D Shapes | LeetCode | Easy | https://leetcode.com/problems/surface-area-of-3d-shapes/ | Surface area | Per-cell counting |
| 4 | L-shapes | Codeforces | 1700 | https://codeforces.com/problemset/problem/1722/F | DFS, L-pattern detection | DFS + pattern matching |
| 5 | ABC218C - Shapes | AtCoder | 300 | https://atcoder.jp/contests/abc218/tasks/abc218_c | 90 rotation + translation | Shape normalization |
| 6 | 478 - Points in Rectangles Circles Triangles | UVa | 1 | https://onlinejudge.org/external/4/478.html | Point-in-shape detection | Geometric containment |
| 7 | Shape Perimeter | Codeforces | 800 | https://codeforces.com/problemset/problem/2056/A | Perimeter | Edge counting |
| 8 | Shape Factory | LintCode | Easy | https://www.lintcode.com/problem/497/ | OO Design | Factory pattern |
| 9 | Making Shapes | Codeforces | 3500 | https://codeforces.com/problemset/problem/1290/F | DP, shape construction | Advanced DP |
| 10 | Find perimeter of shapes formed with 1s in binary matrix | GeeksforGeeks | -- | https://www.geeksforgeeks.org/dsa/find-perimeter-of-shapes-formed-with-1s-in-binary-matrix/ | Grid geometry | Perimeter via neighbors |
| 11 | Mirror Grid | Codeforces | 1200 | https://codeforces.com/problemset/problem/1703/E | Grid rotation/mirror | Symmetry |
| 12 | Convex Shape | Codeforces | 1700 | https://codeforces.com/problemset/problem/275/B | Convexity detection | Grid analysis |
| 13 | Grid L | Codeforces | N/A | https://codeforces.com/problemset/problem/2219/A | L-shapes on grid | Shape detection |
| 14 | Polygon Area | AOJ | Easy | https://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=CGL_3_A | Polygon area | Shoelace formula |
| 15 | Almost Rectangle | Codeforces | 800 | https://codeforces.com/problemset/problem/1512/B | Grid rectangle completion | Bounding box |

### 7. GENERATED PRACTICE PROBLEMS

**Easy 1: Count the Squares**
You are given an `m x n` binary matrix. Count the number of 2x2 squares of all `1`s in the matrix. A 2x2 square is defined as four cells at positions `(r,c)`, `(r,c+1)`, `(r+1,c)`, `(r+1,c+1)`, all with value 1.

**Easy 2: Find the Missing Corner**
You are given three corners of a rectangle aligned with the grid axes. Find the fourth corner.

**Medium 3: Shape Equivalence**
Two shapes are defined as sets of cells in two binary matrices. Determine if they represent the same shape (allowing translation and 90-degree rotation). Matrices can be up to 100x100.

**Medium 4: Hollow Square Detection**
Given an `m x n` binary matrix, find all hollow squares — squares where the border cells are all `1`s and the interior is all `0`s. Return the number of such squares.

**Medium 5: Shape Perimeter with Holes**
Given a binary matrix where `1`s form a shape that may have holes, compute the total perimeter (external + internal hole boundaries).

**Hard 6: Minimum Bounding Shape**
Given scattered `1`s in a large matrix, find the minimum number of unit squares you need to add to make the shape convex. Allowed additions: flip `0` to `1`.

**Hard 7: 3D Layer Stacking**
You have `n` layers, each represented by an `m x m` binary matrix. When stacked, `1`s become cubes in 3D. Compute the total exposed surface area of the combined 3D shape.

**Interview-style 8: Shape Registration**
Given two sets of points in 2D, determine if one can be transformed into the other by a combination of translation, rotation, and reflection (no scaling). Points are integer coordinates. Return the transformation parameters if they exist.

**Contest-style 9: Maximal L-Shapes**
In an `n x n` binary matrix, an L-shape consists of a horizontal segment and a vertical segment of `1`s meeting at a corner cell, forming a right angle. Each segment must have length at least 2. Find the L-shape with the maximum total number of `1`s.

### 8. COMPLETE SOLUTION SECTION

#### Problem 1: Vlad and Shapes (Codeforces 1926B)

**A. Intuition:** Given a binary matrix, determine if the `1`s form a square or a triangle. A square will have equal width and height in its bounding box. A triangle will have either width or height = 1, or the pattern of `1`s will not fill the bounding box.

**B. Brute Force:** Find all `1` cells, compute their bounding box. Check if the number of `1`s equals the area of the bounding box (for a square) or half of it (for a right triangle).

**C. Optimized Approach:** Same as brute force — the problem is small enough.

**D. Step-by-Step:**
1. Read the matrix
2. Find min/max row and col with `1`s
3. Count total `1`s
4. Compute bounding box width = max_c - min_c + 1, height = max_r - min_r + 1
5. If total `1`s == width * height → "SQUARE"
6. Else → "TRIANGLE"

**E. Complexity:** O(n^2) time, O(1) space.

**F. Edge Cases:** Single `1` — both square and triangle are valid, problem guarantees unambiguous.

**G. Code:**

```python
def solve():
    t = int(input())
    for _ in range(t):
        n = int(input())
        grid = [input().strip() for _ in range(n)]
        
        cells = []
        for i in range(n):
            for j in range(n):
                if grid[i][j] == '1':
                    cells.append((i, j))
        
        min_r = min(r for r, c in cells)
        max_r = max(r for r, c in cells)
        min_c = min(c for r, c in cells)
        max_c = max(c for r, c in cells)
        
        w = max_c - min_c + 1
        h = max_r - min_r + 1
        
        if len(cells) == w * h:
            print("SQUARE")
        else:
            print("TRIANGLE")

if __name__ == "__main__":
    solve()
```

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    int t; cin >> t;
    while (t--) {
        int n; cin >> n;
        vector<string> grid(n);
        for (int i = 0; i < n; i++) cin >> grid[i];
        
        int min_r = n, max_r = -1, min_c = n, max_c = -1;
        int cnt = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == '1') {
                    cnt++;
                    min_r = min(min_r, i);
                    max_r = max(max_r, i);
                    min_c = min(min_c, j);
                    max_c = max(max_c, j);
                }
            }
        }
        int w = max_c - min_c + 1;
        int h = max_r - min_r + 1;
        cout << (cnt == w * h ? "SQUARE" : "TRIANGLE") << "\n";
    }
    return 0;
}
```

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        while (t-- > 0) {
            int n = sc.nextInt();
            char[][] grid = new char[n][n];
            for (int i = 0; i < n; i++) {
                grid[i] = sc.next().toCharArray();
            }
            
            int minR = n, maxR = -1, minC = n, maxC = -1;
            int cnt = 0;
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    if (grid[i][j] == '1') {
                        cnt++;
                        minR = Math.min(minR, i);
                        maxR = Math.max(maxR, i);
                        minC = Math.min(minC, j);
                        maxC = Math.max(maxC, j);
                    }
                }
            }
            int w = maxC - minC + 1;
            int h = maxR - minR + 1;
            System.out.println(cnt == w * h ? "SQUARE" : "TRIANGLE");
        }
    }
}
```

#### Problem 2: Projection Area of 3D Shapes (LeetCode 919)

**A. Intuition:** Think of the 3D shape as a city skyline. The top view counts all buildings. The front view is the tallest building in each column. The side view is the tallest in each row.

**B. Brute Force:** Not applicable — the problem definition is the solution.

**C. Optimized Approach:** Single pass: track max per row, max per column, and count non-zero cells.

**D. Step-by-Step:**
1. Initialize `top = 0`, `front = [0]*n`, `side = [0]*m`
2. For each cell `(i, j)` with height `h`:
   - If `h > 0: top++`
   - `side[i] = max(side[i], h)`
   - `front[j] = max(front[j], h)`
3. Sum `top + sum(front) + sum(side)`

**E. Complexity:** O(m*n) time, O(m+n) space.

**F. Edge Cases:** All zeros → 0. Single tall tower → 1 + h + h.

**G. Code:**

```python
def projection_area(grid):
    m, n = len(grid), len(grid[0])
    top = 0
    front = [0] * n
    side = [0] * m
    
    for i in range(m):
        for j in range(n):
            h = grid[i][j]
            if h:
                top += 1
                side[i] = max(side[i], h)
                front[j] = max(front[j], h)
    
    return top + sum(front) + sum(side)
```

```cpp
int projectionArea(vector<vector<int>>& grid) {
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
}
```

```java
public int projectionArea(int[][] grid) {
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
}
```

#### Problem 3: ABC218C - Shapes (AtCoder)

**A. Intuition:** Two shapes are the same if their normalized (translated to origin) cell sets match after some rotation. Generate all 4 rotations of shape S, normalize each to origin, and compare to the normalized T.

**B. Brute Force:** Not applicable — comparison requires normalization.

**C. Optimized Approach:** The grid is small (n <= 200), so generating all rotations is fine.

**D. Step-by-Step:**
1. Find all `#` cells in S and T
2. For each of the 4 rotations of S:
   - Rotate by 90 degrees clockwise
   - Normalize to origin
   - Check if equal to normalized T
3. If any match → Yes, else → No

**E. Complexity:** O(n^2) per rotation, O(n^2) total.

**F. Edge Cases:** Different number of `#` → immediate No. Empty shapes? Not in this problem.

**G. Code:**

```python
def normalize(cells):
    min_r = min(r for r, c in cells)
    min_c = min(c for r, c in cells)
    return frozenset((r - min_r, c - min_c) for r, c in cells)

def rotate(cells, n):
    return [(c, n - 1 - r) for r, c in cells]

def solve():
    n = int(input())
    s = [input().strip() for _ in range(n)]
    t = [input().strip() for _ in range(n)]
    
    s_cells = [(i, j) for i in range(n) for j in range(n) if s[i][j] == '#']
    t_cells = [(i, j) for i in range(n) for j in range(n) if t[i][j] == '#']
    
    if len(s_cells) != len(t_cells):
        print("No")
        return
    
    t_norm = normalize(t_cells)
    cur = s_cells[:]
    for _ in range(4):
        if normalize(cur) == t_norm:
            print("Yes")
            return
        cur = rotate(cur, n)
    print("No")

if __name__ == "__main__":
    solve()
```

#### Problem 4: Largest Triangle Area (LeetCode 830)

**A. Intuition:** Given a set of points, the maximum area triangle can be found by trying all combinations of 3 points and using the shoelace formula to compute the area.

**B. Brute Force:** Try all O(n^3) triples. For n <= 50 (as in this problem), this is acceptable.

**C. Optimized Approach:** Same as brute force for this constraint.

**D. Step-by-Step:**
1. For each triple (i, j, k):
   - Compute area using formula: `0.5 * abs(x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2))`
2. Track maximum

**E. Complexity:** O(n^3) time, O(1) space.

**F. Edge Cases:** Collinear points → area = 0. Minimum 3 points guaranteed.

**G. Code:**

```python
def largest_triangle_area(points):
    n = len(points)
    max_area = 0.0
    for i in range(n):
        x1, y1 = points[i]
        for j in range(i+1, n):
            x2, y2 = points[j]
            for k in range(j+1, n):
                x3, y3 = points[k]
                area = 0.5 * abs(x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2))
                max_area = max(max_area, area)
    return max_area
```

#### Problem 5: Almost Rectangle (Codeforces 1512B)

**A. Intuition:** Given a grid with exactly two `*`s, find the other two corners of the axis-aligned rectangle. The missing corners are determined by taking the row of one `*` and the column of the other.

**B. Brute Force:** Find both `*` cells. The other two corners of the rectangle are `(r1, c2)` and `(r2, c1)`, unless those fall outside the grid, in which case we need to adjust.

**C. Optimized Approach:** Identify the two `*` cells. Compute the missing corners. If a computed corner is out of bounds, swap the rows/columns to the opposite side.

**D. Step-by-Step:**
1. Find the two asterisks at (r1, c1) and (r2, c2)
2. The rectangle corners are (r1, c1), (r1, c2), (r2, c1), (r2, c2)
3. We already have two; the missing two are (r1, c2) and (r2, c1)
4. If r1 == r2, the missing rows must be the row above (r1-1) or below (r1+1), whichever is in bounds
5. Similarly if c1 == c2

**E. Complexity:** O(n^2) or O(1) if coordinates tracked during input.

**F. Edge Cases:** `*` on same row or same column.

**G. Code:**

```python
def solve():
    t = int(input())
    for _ in range(t):
        n = int(input())
        grid = [list(input().strip()) for _ in range(n)]
        
        pts = []
        for i in range(n):
            for j in range(n):
                if grid[i][j] == '*':
                    pts.append((i, j))
        
        r1, c1 = pts[0]
        r2, c2 = pts[1]
        
        if r1 == r2:
            r3 = (r1 + 1) % n
            r4 = r3
            c3, c4 = c1, c2
        elif c1 == c2:
            c3 = (c1 + 1) % n
            c4 = c3
            r3, r4 = r1, r2
        else:
            r3, c3 = r1, c2
            r4, c4 = r2, c1
        
        grid[r3][c3] = '*'
        grid[r4][c4] = '*'
        
        for row in grid:
            print(''.join(row))

if __name__ == "__main__":
    solve()
```

---

## Chapter 2: Basic Geometry

### 1. INTRODUCTION

Geometry in programming is about describing and manipulating objects in space using numbers. If you can put it on a graph, you can compute with it.

**What is basic geometry in DSA?**

At its core, computational geometry answers questions like:
- How far apart are two points?
- Is this point inside a circle?
- Do these two lines intersect?
- What is the area of this polygon?
- Which direction does this triangle turn?

**Real-world intuition:** GPS navigation computes distances between coordinates. Video games detect collisions between shapes. Computer graphics render 3D objects on 2D screens. Every one of these applications uses the same geometric primitives we will learn here.

**Why it matters for interviews:**
- Geometry appears in ~5-10% of coding interviews at top companies
- It tests your ability to translate math into clean code
- It reveals whether you understand floating-point precision
- Many "hard" problems hide a simple geometric insight

**The three great tools of computational geometry:**
1. **Distance formula** (Pythagorean theorem)
2. **Cross product** (orientation, area, direction)
3. **Dot product** (angle, projection)

Master these three, and you can solve 80% of basic geometry problems.

### 2. CORE CONCEPTS

#### 2.1 Points and Coordinates

A point in 2D space is defined by an ordered pair `(x, y)` where:
- `x` = horizontal position (positive = right)
- `y` = vertical position (positive = up, in math; positive = down, in computer graphics)

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
```

#### 2.2 Distance Formula

The Euclidean distance between two points `(x1, y1)` and `(x2, y2)` is:

```
d = sqrt((x2 - x1)^2 + (y2 - y1)^2)
```

This is derived directly from the Pythagorean theorem. The horizontal and vertical differences form the legs of a right triangle; the distance is the hypotenuse.

```python
import math

def distance(p1, p2):
    dx = p2[0] - p1[0]
    dy = p2[1] - p1[1]
    return math.sqrt(dx*dx + dy*dy)
```

**Manhattan distance** (taxicab geometry) is an alternative metric:
```
d_manhattan = |x2 - x1| + |y2 - y1|
```

#### 2.3 Midpoint Formula

The midpoint between two points:
```
M = ((x1 + x2)/2, (y1 + y2)/2)
```

#### 2.4 Slope of a Line

```
slope = (y2 - y1) / (x2 - x1)
```

**Important:** Vertical lines have undefined slope (division by zero). Always check `x2 == x1` before computing slope.

#### 2.5 Line Equation

A line can be represented as:
```
y = mx + b         (slope-intercept form)
ax + by + c = 0    (general form)
```

The general form avoids the vertical line problem.

#### 2.6 Collinearity

Three points are collinear if they lie on the same line. Check using area:
```
area = x1*(y2 - y3) + x2*(y3 - y1) + x3*(y1 - y2)
```
If `area == 0` (or very close to 0 with floating point), the points are collinear.

#### 2.7 Cross Product and Orientation

The cross product of two vectors tells us the signed area of the parallelogram they form:

```
cross(v1, v2) = v1.x * v2.y - v1.y * v2.x
```

Given three points A, B, C, the orientation (counter-clockwise, clockwise, collinear) is:

```
orientation(A, B, C) = cross(B - A, C - A)
                     = (B.x - A.x)*(C.y - A.y) - (B.y - A.y)*(C.x - A.x)
```

- **orientation > 0:** Counter-clockwise (left turn)
- **orientation < 0:** Clockwise (right turn)
- **orientation = 0:** Collinear

This is the single most useful operation in computational geometry. Memorize it.

#### 2.8 Circle Geometry

- **Area:** `A = pi * r^2`
- **Circumference:** `C = 2 * pi * r`
- **Point in circle:** distance from center <= radius

#### 2.9 Rectangle Geometry

- **Area:** `A = width * height`
- **Perimeter:** `P = 2 * (width + height)`
- **Overlap check:** Two axis-aligned rectangles overlap if:
  ```
  not (r1.right < r2.left or r1.left > r2.right or 
       r1.bottom < r2.top or r1.top > r2.bottom)
  ```

#### 2.10 Triangle Classification

By side length:
- **Equilateral:** All three sides equal
- **Isosceles:** Two sides equal
- **Scalene:** All three sides different

By angle:
- **Acute:** All angles < 90 degrees
- **Right:** One angle = 90 degrees
- **Obtuse:** One angle > 90 degrees

#### 2.11 Polygon Area (Shoelace Formula)

For a polygon with vertices `(x0, y0), (x1, y1), ..., (xn-1, yn-1)`:

```
Area = 0.5 * |sum_{i=0}^{n-1} (xi * y_{i+1} - x_{i+1} * yi)|
```

Where `(xn, yn) = (x0, y0)` to close the polygon.

#### 2.12 Line Segment Intersection

Two segments AB and CD intersect if the orientations of (A, B, C) and (A, B, D) are opposite AND the orientations of (C, D, A) and (C, D, B) are opposite. Special case: collinear overlapping segments.

### 3. PROBLEM RECOGNITION

**Common keywords:**
- "distance", "midpoint", "slope"
- "collinear", "colinear"
- "orientation", "clockwise", "counterclockwise"
- "intersect", "intersection"
- "inside", "contained within", "lies within"
- "area", "perimeter", "circumference"
- "circle", "rectangle", "triangle", "polygon"
- "reflection", "mirror", "symmetric"
- "rotate", "translation"
- "minimum enclosing circle"
- "closest pair"

**How interviewers frame geometry:**
- "Given N points, find the pair with the smallest distance..."
- "Check if three points are collinear"
- "Does this point lie inside the triangle?"
- "Calculate the area of a polygon from its vertices"
- "Determine if two rectangles overlap..."
- "How many integer lattice points lie on the line segment?"

**Hidden geometry:**
- "Contains Duplicate III" (LeetCode 220) — uses bucket sort with distance check
- "Points on a line" (max points sharing a line)
- "Valid Square" (check if 4 points form a square)
- "Boomerangs" (count pairs equidistant from a point)

### 4. PATTERN ANALYSIS

#### Pattern 1: Cross-Product for Orientation
- **When to use:** Any problem involving turns, direction, line intersection, point-in-polygon
- **Why it works:** Single formula encodes signed direction
- **Complexity:** O(1)
- **Key formula:** `(B.x-A.x)*(C.y-A.y) - (B.y-A.y)*(C.x-A.x)`

#### Pattern 2: Distance-Based Grouping
- **When to use:** Problems about equidistant points, clustering, circles
- **Why it works:** Group points by (squared) distance from a reference
- **Complexity:** O(n^2) for all-pairs, can be reduced
- **Key insight:** Use squared distance to avoid sqrt

#### Pattern 3: Sweep Line
- **When to use:** Interval overlap, closest pair, rectangle union
- **Why it works:** Processing events in sorted order reduces 2D to 1D
- **Complexity:** O(n log n) typically
- **Common mistake:** Not handling events at the same x coordinate correctly

#### Pattern 4: Convex Hull
- **When to use:** "Smallest polygon containing all points", extreme points
- **Why it works:** Graham scan sorts by angle, then filters non-convex turns
- **Complexity:** O(n log n)

### 5. REUSABLE CODING TEMPLATES

#### Template 1: Point Class with Core Operations

```python
import math
from typing import List, Tuple

Point = Tuple[float, float]

def dist2(p1: Point, p2: Point) -> float:
    """Squared distance (avoids sqrt)."""
    dx = p2[0] - p1[0]
    dy = p2[1] - p1[1]
    return dx*dx + dy*dy

def dist(p1: Point, p2: Point) -> float:
    return math.sqrt(dist2(p1, p2))

def cross(o: Point, a: Point, b: Point) -> float:
    """Cross product (OA x OB). Positive = CCW turn."""
    return (a[0]-o[0])*(b[1]-o[1]) - (a[1]-o[1])*(b[0]-o[0])

def dot(a: Point, b: Point) -> float:
    return a[0]*b[0] + a[1]*b[1]

def collinear(a: Point, b: Point, c: Point) -> bool:
    return abs(cross(a, b, c)) < 1e-9
```

```cpp
#include <cmath>
#include <complex>
using Point = complex<double>;
#define X real()
#define Y imag()

double cross(const Point& a, const Point& b) {
    return (conj(a) * b).Y;
}

double dot(const Point& a, const Point& b) {
    return (conj(a) * b).X;
}

double orient(const Point& o, const Point& a, const Point& b) {
    return cross(a - o, b - o);
}
```

```java
class Point {
    double x, y;
    Point(double x, double y) { this.x = x; this.y = y; }
    
    static double cross(Point o, Point a, Point b) {
        return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
    }
    
    static double dist(Point a, Point b) {
        double dx = a.x - b.x, dy = a.y - b.y;
        return Math.sqrt(dx*dx + dy*dy);
    }
}
```

#### Template 2: Segment Intersection

```python
def on_segment(p: Point, q: Point, r: Point) -> bool:
    """Check if q lies on segment pr (collinear and within bounds)."""
    return (q[0] <= max(p[0], r[0]) and q[0] >= min(p[0], r[0]) and
            q[1] <= max(p[1], r[1]) and q[1] >= min(p[1], r[1]))

def segments_intersect(p1: Point, p2: Point, p3: Point, p4: Point) -> bool:
    """Check if segment p1-p2 intersects segment p3-p4."""
    o1 = cross(p1, p2, p3)
    o2 = cross(p1, p2, p4)
    o3 = cross(p3, p4, p1)
    o4 = cross(p3, p4, p2)
    
    # General case
    if o1 * o2 < 0 and o3 * o4 < 0:
        return True
    
    # Collinear special cases
    if o1 == 0 and on_segment(p1, p3, p2): return True
    if o2 == 0 and on_segment(p1, p4, p2): return True
    if o3 == 0 and on_segment(p3, p1, p4): return True
    if o4 == 0 and on_segment(p3, p2, p4): return True
    
    return False
```

#### Template 3: Shoelace (Polygon Area)

```python
def polygon_area(vertices: List[Point]) -> float:
    """Compute area of a polygon using shoelace formula."""
    n = len(vertices)
    area = 0.0
    for i in range(n):
        j = (i + 1) % n
        area += vertices[i][0] * vertices[j][1]
        area -= vertices[j][0] * vertices[i][1]
    return abs(area) / 2.0
```

#### Template 4: Point in Convex Polygon

```python
def point_in_convex_polygon(pt: Point, polygon: List[Point]) -> bool:
    """Check if point is inside a convex polygon (CCW order)."""
    n = len(polygon)
    for i in range(n):
        if cross(polygon[i], polygon[(i+1)%n], pt) < 0:
            return False
    return True
```

#### Template 5: Rectangle Overlap (Axis-Aligned)

```python
def rect_overlap(r1, r2):
    """r = (x1, y1, x2, y2) where (x1,y1) is bottom-left, (x2,y2) is top-right."""
    return not (r1[2] <= r2[0] or r1[0] >= r2[2] or r1[3] <= r2[1] or r1[1] >= r2[3])
```

#### Template 6: Finding All Angles of a Triangle

```python
import math

def triangle_angles(a: float, b: float, c: float) -> List[float]:
    """Given 3 sides, return angles in radians (law of cosines)."""
    angles = [
        math.acos((b*b + c*c - a*a) / (2*b*c)),
        math.acos((a*a + c*c - b*b) / (2*a*c)),
        math.acos((a*a + b*b - c*c) / (2*a*b))
    ]
    return angles
```

### 6. CURATED REAL PROBLEMS

| # | Problem | Platform | Difficulty | URL | Concepts | Pattern |
|---|---|---|---|---|---|---|
| 1 | Valid Boomerang | LeetCode | Easy | https://leetcode.com/problems/valid-boomerang/ | Collinearity check | Cross product |
| 2 | 2D Traveling | Codeforces | 1100 | https://codeforces.com/problemset/problem/1869/b | Distance, path optimization | Distance formula |
| 3 | Come Together | Codeforces | 900 | https://codeforces.com/problemset/problem/1845/b | Manhanttan distance | Distance |
| 4 | Bicycle Race | Codeforces | 1500 | https://codeforces.com/problemset/problem/659/d | Turn direction | Cross product |
| 5 | Crazy Town | Codeforces | 1700 | https://codeforces.com/problemset/problem/498/a | Line side test | Orientation |
| 6 | Collinearity (ABC181C) | AtCoder | 248 | https://atcoder.jp/contests/abc181/tasks/abc181_c | 3-point collinearity | Cross product |
| 7 | Points in a Circle | CodeAbbey | Easy | https://codeabbey.com/index/task_view/points-in-a-circle | Circle containment | Distance <= radius |
| 8 | CCW | CodeChef | Medium | https://www.codechef.com/problems/CCW | Counter-clockwise orientation | Cross product |
| 9 | Find Extra One | Codeforces | 800 | https://codeforces.com/problemset/problem/900/a | Point counting by side | Orientation |
| 10 | Where do I Turn? | Codeforces | 1300 | https://codeforces.com/problemset/problem/227/a | Turn direction | Cross product |
| 11 | Triangle Area | CodeAbbey | Easy | https://codeabbey.com/index/task_view/triangle-area | Area via coordinates | Shoelace |
| 12 | Bovine Dilemma | Codeforces | 800 | https://codeforces.com/problemset/problem/1466/a | Distinct triangle areas | Distance + set |
| 13 | Watchmen | Codeforces | 1400 | https://codeforces.com/problemset/problem/650/a | Manhattan vs Euclidean pairs | Distance equality |
| 14 | White Sheet | Codeforces | 1700 | https://codeforces.com/problemset/problem/1216/c | Rectangle overlap | Overlap checking |
| 15 | Follow Directions | Codeforces | 800 | https://codeforces.com/problemset/problem/1791/b | Grid movement | Point tracking |

### 7. GENERATED PRACTICE PROBLEMS

**Easy 1: Hit the Target**
Given a point `(x, y)` and a circle centered at `(cx, cy)` with radius `r`, determine if the point lies on the circumference (within 1e-6 tolerance).

**Easy 2: Collinear Triplets**
Given N points, count the number of collinear triplets. N <= 100.

**Medium 3: Mirror Image**
Given a point `P` and a line defined by two points `A` and `B`, compute the mirror image of `P` across the line.

**Medium 4: Minimum Bounding Circle**
Given N points, find the minimum radius circle centered at `(0, 0)` that contains all points. Then solve for the general case (center can be anywhere).

**Medium 5: Path Simplification**
Given a path as a sequence of points, remove redundant points that are collinear with their neighbors. For example, `[(0,0), (1,1), (2,2), (3,0)]` simplifies to `[(0,0), (2,2), (3,0)]`.

**Hard 6: Closest Pair of Points**
Given N points (N <= 10^5), find the minimum distance between any two points.

**Hard 7: Maximum Points on a Line**
Given N points (N <= 300), find the maximum number of points that lie on the same straight line.

**Interview-style 8: Rectangle Union Area**
Given N axis-aligned rectangles, compute the total area covered by their union. N <= 1000.

**Contest-style 9: Counting Lattice Points in a Polygon**
Given a convex polygon with integer vertices, count the number of integer lattice points strictly inside it.

### 8. COMPLETE SOLUTION SECTION

#### Problem 1: Valid Boomerang (LeetCode 1115)

**A. Intuition:** A boomerang is three non-collinear points. Three points are collinear if the area of the triangle they form (cross product) is zero.

**B. Brute Force:** Compute cross product. That is the solution.

**C. Optimized Approach:** Single cross product.

**D. Step-by-Step:**
1. Let points be (x1,y1), (x2,y2), (x3,y3)
2. Compute area = (x2-x1)*(y3-y1) - (x3-x1)*(y2-y1)
3. Return area != 0

**E. Complexity:** O(1) time, O(1) space.

**F. Edge Cases:** Floating point — use exact integer comparison if coordinates are integers (they are here).

**G. Code:**

```python
def is_boomerang(points):
    (x1, y1), (x2, y2), (x3, y3) = points
    area = (x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1)
    return area != 0
```

```cpp
bool isBoomerang(vector<vector<int>>& points) {
    int x1 = points[0][0], y1 = points[0][1];
    int x2 = points[1][0], y2 = points[1][1];
    int x3 = points[2][0], y3 = points[2][1];
    return (x2 - x1) * (y3 - y1) != (x3 - x1) * (y2 - y1);
}
```

```java
public boolean isBoomerang(int[][] points) {
    int x1 = points[0][0], y1 = points[0][1];
    int x2 = points[1][0], y2 = points[1][1];
    int x3 = points[2][0], y3 = points[2][1];
    return (x2 - x1) * (y3 - y1) != (x3 - x1) * (y2 - y1);
}
```

#### Problem 2: Crazy Town (Codeforces 498A)

**A. Intuition:** Each line divides the plane into two half-planes. If the start and end points are on opposite sides of a line, the walker must cross that line. Count such lines.

**B. Brute Force:** For each line, compute the orientation of the start and end points relative to the line. If the signs differ, increment counter.

**C. Optimized Approach:** Use cross product sign to determine which side of a line a point is on.

**D. Step-by-Step:**
1. For each line (a, b, c): ax + by + c = 0
2. Compute f(x, y) = a*x + b*y + c
3. If f(x1, y1) * f(x2, y2) < 0 → sign differs → must cross → count++

**E. Complexity:** O(n) time, O(1) space.

**F. Edge Cases:** Points exactly on a line (f=0). Problem guarantees start and end are not on any line.

**G. Code:**

```python
def solve():
    x1, y1 = map(int, input().split())
    x2, y2 = map(int, input().split())
    n = int(input())
    count = 0
    for _ in range(n):
        a, b, c = map(int, input().split())
        f1 = a * x1 + b * y1 + c
        f2 = a * x2 + b * y2 + c
        if f1 * f2 < 0:
            count += 1
    print(count)
```

#### Problem 3: Bovine Dilemma (Codeforces 1466A)

**A. Intuition:** With N points on the x-axis, choose two distinct points as base vertices of a triangle, and a third fixed point `(0, 1)` as the apex. The area of each such triangle is `base_length / 2`. Count distinct base lengths.

**B. Brute Force:** Compute all pairwise distances (base lengths). Count unique values.

**C. Optimized Approach:** Use a set to track unique distances.

**D. Step-by-Step:**
1. Read N points (all on x-axis, so only x-coordinates matter)
2. For each pair i < j:
   - Compute base = |x_i - x_j|
   - Add to set
3. Print size of set

**E. Complexity:** O(n^2) time, O(n^2) space for the set.

**F. Edge Cases:** N=1 → no pairs → answer 0.

**G. Code:**

```python
def solve():
    t = int(input())
    for _ in range(t):
        n = int(input())
        xs = list(map(int, input().split()))
        areas = set()
        for i in range(n):
            for j in range(i+1, n):
                areas.add(abs(xs[i] - xs[j]))
        print(len(areas))
```

#### Problem 4: Where do I Turn? (Codeforces 227A)

**A. Intuition:** Given three points A, B, C in order, determine whether the turn at B is left, right, or straight (collinear). Use the cross product of vectors AB and BC.

**B. Brute Force:** Compute cross product at B.

**C. Optimized Approach:** Direct cross product formula.

**D. Step-by-Step:**
1. Compute cross = (B.x - A.x)*(C.y - B.y) - (B.y - A.y)*(C.x - B.x)
2. If cross > 0 → LEFT
3. If cross < 0 → RIGHT
4. If cross == 0 → TOWARDS (collinear)

**E. Complexity:** O(1).

**F. Edge Cases:** Large coordinates, but within 64-bit integer range.

**G. Code:**

```python
ax, ay = map(int, input().split())
bx, by = map(int, input().split())
cx, cy = map(int, input().split())

cross = (bx - ax)*(cy - by) - (by - ay)*(cx - bx)
if cross > 0:
    print("LEFT")
elif cross < 0:
    print("RIGHT")
else:
    print("TOWARDS")
```

#### Problem 5: White Sheet (Codeforces 1216C)

**A. Intuition:** Determine if a white rectangle is fully covered by two black rectangles. The white rectangle is visible if any part of it is not covered by the black rectangles. Compute the union of the black rectangles covering the white rectangle, and check if it equals the white rectangle's area.

**B. Brute Force:** For each cell in the white rectangle (not feasible for large coordinates).

**C. Optimized Approach:** Use rectangle intersection. Compute the overlapping area between the white rectangle and each black rectangle. Also check if the two black rectangles together cover the white rectangle entirely.

**D. Step-by-Step:**
1. Define a function `intersect(r1, r2)` that returns the intersection rectangle (or None)
2. Compute intersection of white with black1, white with black2
3. If these cover the entire white rectangle → NO (fully covered)
4. If the two black rectangles overlap, subtract the overlap from the union area
5. If union area == white area → NO, else → YES

**E. Complexity:** O(1).

**F. Edge Cases:** Large coordinates up to 10^6, but still fits in 64-bit integers.

**G. Code:**

```python
def intersect(r1, r2):
    x1 = max(r1[0], r2[0])
    y1 = max(r1[1], r2[1])
    x2 = min(r1[2], r2[2])
    y2 = min(r1[3], r2[3])
    if x1 < x2 and y1 < y2:
        return (x1, y1, x2, y2)
    return None

def area(r):
    return (r[2] - r[0]) * (r[3] - r[1])

white = tuple(map(int, input().split()))
black1 = tuple(map(int, input().split()))
black2 = tuple(map(int, input().split()))

iw1 = intersect(white, black1)
iw2 = intersect(white, black2)
iw12 = intersect(iw1, iw2) if iw1 and iw2 else None

covered = 0
if iw1: covered += area(iw1)
if iw2: covered += area(iw2)
if iw12: covered -= area(iw12)

print("NO" if covered >= area(white) else "YES")
```

#### Problem 6: Tell Your World (Codeforces 849B)

**A. Intuition:** Given N points, determine if they can be split into two non-empty groups, each lying on a distinct line (both lines parallel). Use the fact that the first point must belong to one of the two lines.

**B. Brute Force:** Try assigning each point to line 1 or line 2. That's O(2^n) — infeasible.

**C. Optimized Approach:** There are only three candidate lines through the first point (connecting it to i=1, 2, 3). For each candidate, try to build two parallel lines.

**D. Step-by-Step:**
1. Check 3 candidates for the slope through point 0:
   - Line through points 0 and 1
   - Line through points 0 and 2
   - Line through points 1 and 2 (if point 0 is alone on a line)
2. For each slope candidate:
   - First line: all points on this slope from the chosen pair
   - Second line: all remaining points, check if they share one common slope (parallel to first)
3. If any candidate works → YES

**E. Complexity:** O(n) time, O(1) space.

**F. Edge Cases:** All points collinear → NO (need two non-empty groups). All but one point collinear → YES if that point alone on the second line.

**G. Code:**

```python
def solve():
    n = int(input())
    pts = list(map(int, input().split()))
    
    def slope(i, j):
        return (pts[j] - pts[i]) / (j - i)
    
    def check_with_slope(s):
        line1 = set()
        for i in range(n):
            if (pts[i] - pts[0]) == s * i:
                line1.add(i)
        if len(line1) == n:
            return False
        line2 = [i for i in range(n) if i not in line1]
        if len(line2) <= 1:
            return True
        s2 = (pts[line2[1]] - pts[line2[0]]) / (line2[1] - line2[0])
        if abs(s2 - s) > 1e-9:
            return False
        for i in line2[2:]:
            if abs((pts[i] - pts[line2[0]]) - s2 * (i - line2[0])) > 1e-9:
                return False
        return True
    
    if check_with_slope(slope(0, 1)) or check_with_slope(slope(0, 2)):
        print("Yes")
        return
    
    # Case where point 0 is alone on its line
    s = slope(1, 2)
    for i in range(3, n):
        if abs((pts[i] - pts[1]) - s * (i - 1)) > 1e-9:
            print("No")
            return
    print("Yes")
```

---

## Chapter 3: Triangle Problems

### 1. INTRODUCTION

If rectangles are the workhorses of geometry, triangles are its magic wands. Triangles are the simplest rigid shape — the only polygon that cannot be deformed without changing side lengths. This makes them fundamental to everything from bridge construction to computer graphics.

**What makes triangles special?**
- **Three points** are the minimum needed to define an area
- **The triangle inequality** gives us a simple test for valid triangles
- **The triangle is rigid** — knowing three sides uniquely determines the shape
- **Any polygon can be triangulated** into triangles
- **Right triangles** unlock the Pythagorean theorem

**Real-world intuition:** Think of a tripod — three legs always form a stable base. Any shape with more than three sides can wobble (hinge at the joints). Triangulation is how bridges, cranes, and geodesic domes stay rigid. In the same way, algorithms often "triangulate" complex problems by breaking them into triangles.

**The triangle journey in this chapter:**
- First, we learn what makes a valid triangle
- Then, we classify triangles by sides and angles
- Next, we compute area, perimeter, and special points
- Finally, we count, construct, and optimize triangles

### 2. CORE CONCEPTS

#### 2.1 Triangle Inequality Theorem

For any valid triangle with side lengths `a, b, c`:
```
a + b > c
a + c > b
b + c > a
```

All three must hold. If any is violated, the triangle is **degenerate** (three collinear points).

**Intuition:** The shortest path between two points is a straight line. If `a + b = c`, points A and C are connected both directly (c) and via B (a+b) with equal length, meaning B lies on segment AC.

#### 2.2 Types of Triangles

**By sides:**
```
Equilateral:  a == b == c
Isosceles:   a == b or b == c or a == c
Scalene:     all sides different
```

**By angles (using law of cosines, with sides a <= b <= c):**
```
Acute:   c^2 < a^2 + b^2    (all angles < 90°)
Right:   c^2 == a^2 + b^2   (one angle = 90°)
Obtuse:  c^2 > a^2 + b^2    (one angle > 90°)
```

#### 2.3 Area Formulas

**Base-height:**
```
Area = (1/2) * base * height
```

**Heron's formula** (when all three sides are known):
```
s = (a + b + c) / 2            (semi-perimeter)
Area = sqrt(s * (s-a) * (s-b) * (s-c))
```

**Coordinate formula** (shoelace for 3 points):
```
Area = (1/2) * |x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2)|
```

**Using cross product:**
```
vectors AB = B - A, AC = C - A
Area = |cross(AB, AC)| / 2
```

#### 2.4 Special Points of a Triangle

| Point | Description | Construction |
|---|---|---|
| **Centroid** | Intersection of medians | Average of 3 vertices: `((x1+x2+x3)/3, (y1+y2+y3)/3)` |
| **Circumcenter** | Center of circumscribed circle | Intersection of perpendicular bisectors |
| **Incenter** | Center of inscribed circle | Intersection of angle bisectors |
| **Orthocenter** | Intersection of altitudes | Intersection of altitudes from each vertex |

#### 2.5 Medians and Their Properties

A median connects a vertex to the midpoint of the opposite side. The three medians intersect at the centroid, which divides each median in a 2:1 ratio (vertex to centroid : centroid to midpoint).

**Area from medians** (m_a, m_b, m_c are median lengths):
```
s_m = (m_a + m_b + m_c) / 2
Area = (4/3) * sqrt(s_m * (s_m - m_a) * (s_m - m_b) * (s_m - m_c))
```

#### 2.6 Angles from Sides (Law of Cosines)

Given sides a, b, c:
```
cos(A) = (b^2 + c^2 - a^2) / (2*b*c)
cos(B) = (a^2 + c^2 - b^2) / (2*a*c)
cos(C) = (a^2 + b^2 - c^2) / (2*a*b)
```

Then `A = arccos(cos(A))` (in radians).

#### 2.7 Circumcircle and Incircle

**Circumradius** (radius of circumscribed circle):
```
R = (a * b * c) / (4 * Area)
```

**Inradius** (radius of inscribed circle):
```
r = (2 * Area) / perimeter
```

#### 2.8 Counting Triangles from Points

Given N points, count how many triples form valid, non-degenerate triangles:
- Brute force: O(N^3) — check all triples
- Sort + two-pointer: O(N^2) — sort side lengths, for each pair count valid third sides

**Counting from side lengths:**
Given an array of lengths, count triples that satisfy the triangle inequality:
- Sort the array
- For each `i` and `j > i`, find the range of `k > j` where `arr[i] + arr[j] > arr[k]`

#### 2.9 Triangle DP on Grids

Triangle path problems (like LeetCode 120 — Triangle) use bottom-up DP:
```
dp[i][j] = triangle[i][j] + min(dp[i+1][j], dp[i+1][j+1])
```

### 3. PROBLEM RECOGNITION

**Keywords that signal triangle problems:**
- "triangle", "triangular"
- "triple", "triplet"
- "three sides", "three points"
- "third side"
- "valid triangle"
- "triangle inequality"
- "perimeter", "area of triangle"
- "non-degenerate"
- "triangulation", "triangulate"
- "3 points" (check if forming a triangle)
- "equilateral", "isosceles", "scalene"
- "acute", "obtuse", "right triangle"
- "Pythagorean triple"
- "polygon triangulation"
- "minimum score triangulation"
- "maximum area triangle"
- "counting triangles"

**How interviewers frame triangle problems:**
- "Given an array of integers, count the number of possible triangles"
- "Find the maximum perimeter triangle from an array of side lengths"
- "Determine if three points form a valid triangle"
- "Classify the triangle from its coordinates"
- "Find the triangle with the largest area from N points"
- "Minimum score triangulation of a convex polygon"
- "Given three side lengths, check if they can form a valid triangle"

**Hidden triangle patterns:**
- Path problems in triangle-shaped grids (LeetCode 120)
- Counting problems using combinatorics and triangle inequality
- DP on triangulations (polygon triangulation)

### 4. PATTERN ANALYSIS

#### Pattern 1: Sort + Two-Pointer for Triangle Counting
- **When to use:** Given an array of side lengths, count valid triangles
- **Why it works:** Sorting lets us use the two-pointer technique — for each pair (i, j), find the largest k such that `arr[i] + arr[j] > arr[k]`
- **Complexity:** O(n^2) time, O(1) space
- **Common mistake:** Forgetting to check all three inequalities (but sorting ensures `arr[i] <= arr[j] <= arr[k]`, so only one check needed)

#### Pattern 2: Cross Product for Triangle Area
- **When to use:** Given 3 points, compute area or check collinearity
- **Why it works:** Cross product = 2 * area, sign indicates orientation
- **Complexity:** O(1)
- **Key insight:** Area = 0 iff points are collinear

#### Pattern 3: DP on Triangle Grid
- **When to use:** Minimum/maximum path sum in a triangle-shaped grid
- **Why it works:** Bottom-up DP propagates optimal values from bottom to top
- **Complexity:** O(n^2)
- **Variation:** Instead of moving to adjacent numbers, you may move through rows

#### Pattern 4: Polygon Triangulation DP
- **When to use:** Minimize/maximize some metric when triangulating a polygon
- **Why it works:** Choose a third vertex k between i and j to form triangle (i, k, j), then recurse
- **Complexity:** O(n^3) for standard DP
- **Key formula:** `dp[i][j] = min over k of (dp[i][k] + dp[k][j] + cost(i, j, k))`

#### Pattern 5: Maximum Area Triangle from Points
- **When to use:** Given N points, find max area triangle
- **Why it works:** O(n^3) for small N, O(n^2) using convex hull + rotating calipers for larger N
- **Key insight:** The maximum area triangle's vertices must lie on the convex hull

### 5. REUSABLE CODING TEMPLATES

#### Template 1: Triangle Validity from Side Lengths

```python
def is_valid_triangle(a: float, b: float, c: float) -> bool:
    sides = sorted([a, b, c])
    return sides[0] + sides[1] > sides[2]
```

#### Template 2: Count Possible Triangles (from array of lengths)

```python
def count_triangles(arr):
    arr.sort()
    n = len(arr)
    count = 0
    for i in range(n - 2):
        k = i + 2
        for j in range(i + 1, n - 1):
            while k < n and arr[i] + arr[j] > arr[k]:
                k += 1
            count += k - j - 1  # all k between j+1 and k-1 work
    return count
```

```cpp
int countTriangles(vector<int>& arr) {
    sort(arr.begin(), arr.end());
    int n = arr.size(), count = 0;
    for (int i = 0; i < n - 2; i++) {
        int k = i + 2;
        for (int j = i + 1; j < n - 1; j++) {
            while (k < n && arr[i] + arr[j] > arr[k]) k++;
            count += k - j - 1;
        }
    }
    return count;
}
```

```java
public int countTriangles(int[] arr) {
    Arrays.sort(arr);
    int n = arr.length, count = 0;
    for (int i = 0; i < n - 2; i++) {
        int k = i + 2;
        for (int j = i + 1; j < n - 1; j++) {
            while (k < n && arr[i] + arr[j] > arr[k]) k++;
            count += k - j - 1;
        }
    }
    return count;
}
```

#### Template 3: Triangle Area from Coordinates

```python
def triangle_area(p1, p2, p3):
    """Area of triangle formed by 3 points (absolute shoelace / 2)."""
    return 0.5 * abs(p1[0]*(p2[1]-p3[1]) + p2[0]*(p3[1]-p1[1]) + p3[0]*(p1[1]-p2[1]))
```

#### Template 4: Triangle Classification

```python
def classify_triangle(a, b, c):
    sides = sorted([a, b, c])
    a, b, c = sides
    
    if not (a + b > c):
        return "Invalid"
    
    if a == b == c:
        side_type = "Equilateral"
    elif a == b or b == c or a == c:
        side_type = "Isosceles"
    else:
        side_type = "Scalene"
    
    c2 = c * c
    if c2 < a*a + b*b:
        angle_type = "Acute"
    elif c2 == a*a + b*b:
        angle_type = "Right"
    else:
        angle_type = "Obtuse"
    
    return f"{side_type} {angle_type}"
```

#### Template 5: Triangle Path Sum DP

```python
def minimum_total(triangle):
    n = len(triangle)
    dp = triangle[-1][:]  # start with last row
    for i in range(n - 2, -1, -1):
        for j in range(len(triangle[i])):
            dp[j] = triangle[i][j] + min(dp[j], dp[j + 1])
    return dp[0]
```

#### Template 6: Maximum Perimeter Triangle

```python
def largest_perimeter(nums):
    nums.sort(reverse=True)
    for i in range(len(nums) - 2):
        if nums[i] < nums[i+1] + nums[i+2]:
            return nums[i] + nums[i+1] + nums[i+2]
    return 0
```

### 6. CURATED REAL PROBLEMS

| # | Problem | Platform | Difficulty | URL | Concepts | Pattern |
|---|---|---|---|---|---|---|
| 1 | Type of Triangle | LeetCode | Easy | https://leetcode.com/problems/type-of-triangle/ | Triangle classification | Side/angle check |
| 2 | Largest Perimeter Triangle | LeetCode | Easy | https://leetcode.com/problems/largest-perimeter-triangle/ | Max perimeter | Sorting + greedy |
| 3 | Valid Triangle Number | LeetCode | Medium | https://leetcode.com/problems/valid-triangle-number/ | Counting triangles | Two-pointer |
| 4 | Make a triangle! | Codeforces | 800 | https://codeforces.com/problemset/problem/1064/a | Triangle inequality | Validity check |
| 5 | Mahmoud and a Triangle | Codeforces | 1000 | https://codeforces.com/problemset/problem/766/b | Triangle existence | Sorting |
| 6 | Bad Triangle | Codeforces | 800 | https://codeforces.com/problemset/problem/1398/a | Find non-triangle triple | Triangle inequality |
| 7 | Cut the Triangle | Codeforces | 800 | https://codeforces.com/problemset/problem/1767/A | Axis-aligned classification | Coordinate geometry |
| 8 | Vanya and Triangles | Codeforces | 1900 | https://codeforces.com/problemset/problem/552/d | Counting from points | Combinatorics + slopes |
| 9 | Minimum Score Triangulation of Polygon | LeetCode | Medium | https://leetcode.com/problems/minimum-score-triangulation-of-polygon/ | DP triangulation | Interval DP |
| 10 | Point Location Test | CSES | -- | https://cses.fi/problemset/task/2189 | Cross product orientation | Orientation |
| 11 | Triangle (LeetCode 120) | LeetCode | Medium | https://leetcode.com/problems/triangle/ | Path sum in triangle | Bottom-up DP |
| 12 | Largest Triangle Area | LeetCode | Easy | https://leetcode.com/problems/largest-triangle-area/ | Max area from points | Shoelace |
| 13 | Triangles on a Rectangle | Codeforces | 1000 | https://codeforces.com/problemset/problem/1620/b | Max area from boundary | Edge cases |
| 14 | ABC033D - Triangle Classification | AtCoder | 2248 | https://atcoder.jp/contests/abc033/tasks/abc033_d | Acute/right/obtuse from points | Dot product |
| 15 | Count the number of possible triangles | GeeksforGeeks | Medium | https://www.geeksforgeeks.org/problems/count-the-number-of-possible-triangles | Counting | Two-pointer |

### 7. GENERATED PRACTICE PROBLEMS

**Easy 1: Closest to a Right Triangle**
Given three side lengths, determine the minimum change (increase or decrease any side) to make the triangle a right triangle.

**Easy 2: Triangle from Points**
Given 6 integers representing the coordinates of 3 points, determine if they form a valid non-degenerate triangle. If yes, compute its area.

**Medium 3: Triangle from Partial Data**
Given the coordinates of two vertices of an equilateral triangle, find the third vertex. There are two possible answers.

**Medium 4: Largest Triangle Inside Rectangle**
Given a rectangle (width W, height H), find the maximum area triangle that can be inscribed within it. All three vertices must be on the rectangle's boundary.

**Medium 5: Counting Right Triangles on a Grid**
Given N points on a 2D grid, count the number of right triangles that can be formed. A right triangle has one angle of exactly 90 degrees. N <= 200.

**Hard 6: Triangle Flipping Game**
You have a triangular grid of numbers (like Pascal's triangle). You can flip the sign of any downward-pointing sub-triangle of size k. Determine if you can make all numbers zero.

**Hard 7: Minimum Enclosing Triangle**
Given N points, find the triangle of minimum area that contains all N points. The triangle can be placed anywhere and can have any orientation.

**Interview-style 8: Split Array into Triangles**
Given an array of length 3N, partition it into N triples such that each triple forms a valid triangle. If impossible, explain why.

**Contest-style 9: Counting Triangles with Integer Coordinates**
Given an integer grid of width W and height H, count all right triangles whose vertices are lattice points within the grid and whose legs are parallel to the axes.

### 8. COMPLETE SOLUTION SECTION

#### Problem 1: Largest Perimeter Triangle (LeetCode)

**A. Intuition:** For the maximum perimeter, we want the three largest sides that satisfy the triangle inequality. Since the triangle inequality requires `a + b > c` for the largest side `c`, we can sort and check consecutive triples from the largest end.

**B. Brute Force:** O(n^3) — check all triples.

**C. Optimized Approach:** Sort descending. For each consecutive triple, check if the first (largest) is less than the sum of the next two. The first valid triple gives the maximum perimeter.

**D. Step-by-Step:**
1. Sort array descending
2. For i = 0 to n-3:
   - If nums[i] < nums[i+1] + nums[i+2]: return sum
3. Return 0

**E. Complexity:** O(n log n) time, O(1) space.

**F. Edge Cases:** No valid triangle → 0. Very large values → fits in 32-bit int per problem constraint.

**G. Code:**

```python
def largest_perimeter(nums):
    nums.sort(reverse=True)
    for i in range(len(nums) - 2):
        if nums[i] < nums[i+1] + nums[i+2]:
            return nums[i] + nums[i+1] + nums[i+2]
    return 0
```

```cpp
int largestPerimeter(vector<int>& nums) {
    sort(nums.begin(), nums.end(), greater<int>());
    for (int i = 0; i < (int)nums.size() - 2; i++) {
        if (nums[i] < nums[i+1] + nums[i+2])
            return nums[i] + nums[i+1] + nums[i+2];
    }
    return 0;
}
```

```java
public int largestPerimeter(int[] nums) {
    Arrays.sort(nums);
    for (int i = nums.length - 1; i >= 2; i--) {
        if (nums[i] < nums[i-1] + nums[i-2])
            return nums[i] + nums[i-1] + nums[i-2];
    }
    return 0;
}
```

#### Problem 2: Valid Triangle Number (LeetCode)

**A. Intuition:** Counting all valid triples from an array. Sort the array, fix two sides, and find the range of third sides that work.

**B. Brute Force:** O(n^3) — check every triple.

**C. Optimized Approach:** Sort + two-pointer. For each pair (i, j), find the largest k such that `nums[i] + nums[j] > nums[k]`. All indices between j+1 and k-1 work.

**D. Step-by-Step:**
1. Sort nums
2. For i from 0 to n-3:
   - Initialize k = i + 2
   - For j from i+1 to n-2:
     - Advance k while nums[i] + nums[j] > nums[k]
     - Count += k - j - 1
3. Return count

**E. Complexity:** O(n^2) time, O(1) space.

**F. Edge Cases:** Duplicate values are fine since they produce distinct triples. n < 3 → 0.

**G. Code:**

```python
def triangle_number(nums):
    nums.sort()
    n = len(nums)
    count = 0
    for i in range(n - 2):
        k = i + 2
        for j in range(i + 1, n - 1):
            while k < n and nums[i] + nums[j] > nums[k]:
                k += 1
            count += k - j - 1
    return count
```

#### Problem 3: Make a triangle! (Codeforces 1064A)

**A. Intuition:** Given three sides, find the minimum increase to any side to make a valid triangle. Since we can only increase, we need `max_side < sum_of_other_two`. If already valid, answer is 0. Otherwise, the deficit is `max_side - (sum_of_other_two) + 1`.

**B. Brute Force:** Try increments from 0 upwards. But the math gives the answer directly.

**C. Optimized Approach:** Single formula.

**D. Step-by-Step:**
1. Sort sides
2. If a + b > c: print 0
3. Else: print c - (a + b) + 1

**E. Complexity:** O(1).

**F. Edge Cases:** If `a + b = c`, need to increase by 1.

**G. Code:**

```python
a, b, c = map(int, input().split())
sides = sorted([a, b, c])
a, b, c = sides
if a + b > c:
    print(0)
else:
    print(c - (a + b) + 1)
```

#### Problem 4: Triangle Path Sum (LeetCode 120)

**A. Intuition:** Classic DP. Go bottom-up: from the second-to-last row, each cell's minimum path to bottom is its value plus the minimum of the two adjacent cells below.

**B. Brute Force:** DFS with memoization, O(n^2).

**C. Optimized Approach:** Bottom-up DP using a 1D array.

**D. Step-by-Step:**
1. Start with `dp = last_row` copy
2. For i from second-to-last to 0:
   - For j from 0 to i:
     - dp[j] = triangle[i][j] + min(dp[j], dp[j+1])
3. Return dp[0]

**E. Complexity:** O(n^2) time, O(n) space.

**F. Edge Cases:** Empty triangle → 0. Single row → that value.

**G. Code:**

```python
def minimum_total(triangle):
    n = len(triangle)
    dp = triangle[-1][:]
    for i in range(n - 2, -1, -1):
        for j in range(len(triangle[i])):
            dp[j] = triangle[i][j] + min(dp[j], dp[j + 1])
    return dp[0]
```

#### Problem 5: Minimum Score Triangulation of Polygon (LeetCode)

**A. Intuition:** This is a classic interval DP problem. For a polygon with vertices i through j, we choose a third vertex k to form a triangle (i, k, j) and recursively triangulate the two remaining sub-polygons.

**B. Brute Force:** O(n!) — try all triangulations.

**C. Optimized Approach:** Interval DP. dp[i][j] = minimum score for polygon formed by vertices i..j.

**D. Step-by-Step:**
1. dp[i][j] = 0 for j - i < 2 (fewer than 3 vertices)
2. For length from 3 to n:
   - For each i, j = i + length - 1:
     - dp[i][j] = min over k from i+1 to j-1 of dp[i][k] + dp[k][j] + values[i]*values[j]*values[k]
3. Return dp[0][n-1]

**E. Complexity:** O(n^3) time, O(n^2) space.

**F. Edge Cases:** n < 3 → 0 (can't form triangle).

**G. Code:**

```python
def min_score_triangulation(values):
    n = len(values)
    dp = [[0] * n for _ in range(n)]
    
    for length in range(3, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            dp[i][j] = float('inf')
            for k in range(i + 1, j):
                score = dp[i][k] + dp[k][j] + values[i] * values[j] * values[k]
                dp[i][j] = min(dp[i][j], score)
    
    return dp[0][n - 1]
```

#### Problem 6: Cut the Triangle (Codeforces 1767A)

**A. Intuition:** Given a triangle's coordinates, determine if it is axis-aligned (one side parallel to x-axis and another parallel to y-axis). Such a triangle has two vertices sharing the same x-coordinate and two vertices sharing the same y-coordinate.

**B. Brute Force:** Check all coordinate matches.

**C. Optimized Approach:** Check if any two points have the same x AND any two points have the same y. If both conditions hold AND the three points form a right triangle with axis-aligned legs, it cannot be cut.

**D. Step-by-Step:**
1. Read 3 points
2. If any two points share x AND any two share y → "NO" (not cuttable — already axis-aligned)
3. Else → "YES" (can be cut by a straight line)

**E. Complexity:** O(1).

**F. Edge Cases:** Points can be anywhere on integer grid.

**G. Code:**

```python
def solve():
    t = int(input())
    for _ in range(t):
        input()  # blank line
        pts = [tuple(map(int, input().split())) for _ in range(3)]
        xs = [p[0] for p in pts]
        ys = [p[1] for p in pts]
        
        same_x = len(set(xs)) < 3
        same_y = len(set(ys)) < 3
        
        if same_x and same_y:
            print("NO")
        else:
            print("YES")
```

---

## Chapter 4: Right Triangle Problems

### 1. INTRODUCTION

The right triangle is the most important triangle in all of mathematics. The Pythagorean theorem — a relationship so fundamental that it appears in every field from carpentry to quantum physics — is the star of this chapter.

**What makes right triangles special?**

A right triangle is a triangle where one interior angle is exactly 90 degrees. The side opposite this angle is called the **hypotenuse** (always the longest side), and the other two sides are called **legs**.

The Pythagorean theorem states:
```
a^2 + b^2 = c^2
```
where `c` is the hypotenuse and `a`, `b` are the legs.

**Why right triangles appear constantly in DSA:**
1. **Distance = right triangle.** The Euclidean distance formula derives directly from the Pythagorean theorem.
2. **Grid problems = right triangles.** On a square grid, axis-aligned paths form right triangles.
3. **Pythagorean triples** appear in number theory problems on multiple platforms.
4. **Many coordinate geometry problems** hide right triangles in their solution.

**Real-world intuition:** When you walk 3 blocks east and 4 blocks north, you've walked 7 blocks. But the straight-line distance (as the crow flies) is only 5 blocks — the hypotenuse of a 3-4-5 right triangle. This is the fundamental insight: the shortest path between two points on a grid is NOT the Manhattan path.

### 2. CORE CONCEPTS

#### 2.1 Pythagorean Theorem

The foundational relationship:

```
c = sqrt(a^2 + b^2)    # hypotenuse from legs
a = sqrt(c^2 - b^2)    # one leg from hypotenuse and other leg
```

Always identify the hypotenuse correctly: it is the side opposite the 90-degree angle and the longest side.

#### 2.2 Pythagorean Triples

A Pythagorean triple is a set of three positive integers `(a, b, c)` such that `a^2 + b^2 = c^2`.

**Primitive triples** have gcd(a, b, c) = 1. They can be generated by Euclid's formula:

```
a = m^2 - n^2
b = 2 * m * n
c = m^2 + n^2
```
where `m > n > 0`, and `m` and `n` are coprime with opposite parity.

**Non-primitive triples** are multiples of primitive ones: `(k*a, k*b, k*c)`.

**Common triples to remember:**
```
(3, 4, 5)    (5, 12, 13)   (8, 15, 17)
(7, 24, 25)  (9, 40, 41)   (20, 21, 29)
(6, 8, 10) [multiple of 3-4-5]
```

#### 2.3 Right Triangle Detection

**From side lengths** (assume c is largest):
```python
is_right = (a*a + b*b) == c*c
```

**From coordinates** (3 points A, B, C):
```python
# Check each vertex for right angle
d2_AB = dist2(A, B)
d2_BC = dist2(B, C)
d2_CA = dist2(C, A)
is_right = (d2_AB + d2_BC == d2_CA) or (d2_BC + d2_CA == d2_AB) or (d2_CA + d2_AB == d2_BC)
```

**Using dot product:** Vectors are perpendicular if their dot product is 0:
```python
dot(AB, AC) == 0  # right angle at A
dot(BA, BC) == 0  # right angle at B
dot(CA, CB) == 0  # right angle at C
```

#### 2.4 Special Right Triangles

**45-45-90 (isosceles right triangle):**
```
legs: a = b
hypotenuse: c = a * sqrt(2)
Area = a^2 / 2
```

**30-60-90 triangle:**
```
short leg = a
long leg = a * sqrt(3)
hypotenuse = 2a
Area = (sqrt(3) / 2) * a^2
```

#### 2.5 Generating Pythagorean Triples

Euclid's formula generates **all** primitive triples:

```python
def generate_triples(limit):
    """Generate all primitive Pythagorean triples with c <= limit."""
    triples = []
    for m in range(2, int(limit**0.5) + 1):
        for n in range(1, m):
            if (m - n) % 2 == 1 and math.gcd(m, n) == 1:
                a = m*m - n*n
                b = 2*m*n
                c = m*m + n*n
                if c <= limit:
                    triples.append(sorted([a, b, c]))
    return triples
```

### 3. PROBLEM RECOGNITION

**Keywords for right triangle problems:**
- "right triangle", "right-angled triangle"
- "Pythagorean", "Pythagoras"
- "hypotenuse", "leg"
- "90 degrees", "perpendicular"
- "integer sides", "integer right triangle"
- "Pythagorean triple", "Pythagorean triplet"
- "distance formula"
- "right angle detection"
- "count right triangles"

**How interviewers frame these:**
- "Find a Pythagorean triple with given sum"
- "Count right triangles formed by N points"
- "Find distance between two points" (implicit right triangle)
- "Given coordinates, check if triangle is right-angled"
- "The Pythagorean expectation in [sports/betting context]"
- "Generate all Pythagorean triples with c <= N"

**Hidden right triangle uses:**
- Any problem asking for **Euclidean distance** is implicitly about right triangles
- **Closest pair** problems use distance = hypotenuse
- **Circle** problems: a point on a circle forms a right triangle with the diameter
- **Grid path** problems often create right triangles

### 4. PATTERN ANALYSIS

#### Pattern 1: Squared Distance Check
- **When to use:** Avoid floating-point sqrt whenever possible
- **Why it works:** `a^2 + b^2 == c^2` for right triangles; distance comparisons work the same with squared values
- **Key insight:** Always use squared distances for comparison

#### Pattern 2: Euclid's Formula for Triple Generation
- **When to use:** Generate all Pythagorean triples with given constraints
- **Why it works:** Generates exactly all primitive triples without duplicates
- **Complexity:** O(limit) — the double loop over m, n converges quickly
- **Common mistake:** Forgetting (m-n) odd and gcd(m,n)==1 constraints

#### Pattern 3: Right Triangle Counting from Points
- **When to use:** Count right triangles from N points on a plane
- **Why it works:** For each point, group other points by slope. Perpendicular slopes form right angles.
- **Complexity:** O(n^2 log n) with hash map of slope vectors
- **Alternative:** For grid points with small coordinates, use the `(dx, dy)` vector approach

#### Pattern 4: Pythagorean Triple Enumeration
- **When to use:** Find a specific triple (e.g., with sum = N or c = N)
- **Approach:** Pre-generate all triples using Euclid's formula, then filter by constraint
- **Complexity:** O(sqrt(N)) for generation

### 5. REUSABLE CODING TEMPLATES

#### Template 1: Right Triangle Detection (Coordinates)

```python
def is_right_triangle(p1, p2, p3):
    """Check if triangle formed by 3 points is right-angled."""
    def dist2(a, b):
        dx = a[0] - b[0]
        dy = a[1] - b[1]
        return dx*dx + dy*dy
    
    d2 = [
        dist2(p1, p2),
        dist2(p2, p3),
        dist2(p3, p1)
    ]
    d2.sort()
    return d2[0] + d2[1] == d2[2]  # a^2 + b^2 == c^2
```

#### Template 2: Generate Pythagorean Triples (Euclid's Formula)

```python
import math

def pythagorean_triples(max_c):
    """Generate all (a, b, c) with c <= max_c and a <= b."""
    triples = []
    limit = int(math.sqrt(max_c))
    for m in range(2, limit + 1):
        for n in range(1, m):
            if (m - n) % 2 == 1 and math.gcd(m, n) == 1:
                a = m*m - n*n
                b = 2*m*n
                c = m*m + n*n
                if c <= max_c:
                    triples.append((a, b, c))
                    # Also add scaled versions
                    k = 2
                    while k * c <= max_c:
                        triples.append((k*a, k*b, k*c))
                        k += 1
    return sorted(triples)
```

#### Template 3: Count Right Triangles from Points

```python
from collections import defaultdict
import math

def count_right_triangles(points):
    """Count right triangles among N points."""
    n = len(points)
    count = 0
    for i in range(n):
        slopes = defaultdict(int)
        for j in range(n):
            if i == j:
                continue
            dx = points[j][0] - points[i][0]
            dy = points[j][1] - points[i][1]
            g = math.gcd(dx, dy)
            dx //= g
            dy //= g
            # Normalize: make dx positive, or if dx==0 make dy positive
            if dx < 0 or (dx == 0 and dy < 0):
                dx, dy = -dx, -dy
            slopes[(dx, dy)] += 1
        
        # For each slope (dx, dy), perpendicular slope is (-dy, dx) or (dy, -dx)
        for (dx, dy), c in slopes.items():
            perp1 = (-dy, dx)
            perp2 = (dy, -dx)
            # Normalize perpendicular vector too
            if perp1[0] < 0 or (perp1[0] == 0 and perp1[1] < 0):
                perp1 = (-perp1[0], -perp1[1])
            if perp2[0] < 0 or (perp2[0] == 0 and perp2[1] < 0):
                perp2 = (-perp2[0], -perp2[1])
            
            if perp1 in slopes:
                count += c * slopes[perp1]
    
    return count // 2  # each triangle counted twice (at each acute vertex)
```

#### Template 4: Find Pythagorean Triples with Given Sum

```python
def find_triple_with_sum(target):
    for a in range(1, target // 3):
        for b in range(a + 1, target // 2):
            c = target - a - b
            if a*a + b*b == c*c:
                return (a, b, c)
    return None
```

### 6. CURATED REAL PROBLEMS

| # | Problem | Platform | Difficulty | URL | Concepts | Pattern |
|---|---|---|---|---|---|---|
| 1 | Pythagorean Theorem | CodeAbbey | Easy | https://www.codeabbey.com/index/task_view/pythagorean-theorem | Basic right triangle check | Pythagoras |
| 2 | Special Pythagorean Triplet | Project Euler | Easy | https://projecteuler.net/problem=9 | Find triple with sum 1000 | Euclid's formula |
| 3 | Pythagorean Theorem II | Codeforces | 1200 | https://codeforces.com/problemset/problem/304/A | Brute force triples | Enumeration |
| 4 | Pythagorean Triples | Codeforces | 1500 | https://codeforces.com/problemset/problem/707/C | Construct any triple given a side | Euclid's formula |
| 5 | Pythagorean Triples | HackerRank | Easy | https://www.hackerrank.com/challenges/pythagorean-triple/problem | Generate a triple | Euclid's formula |
| 6 | Pythagorean Triples | CodeAbbey | Medium | https://www.codeabbey.com/index/task_view/pythagorean-triples | Find many triples | Generation + filter |
| 7 | Project Euler #91 | HackerRank | Hard | https://www.hackerrank.com/contests/projecteuler/challenges/euler091 | Right triangles on grid | Coordinate enumeration |
| 8 | Right Triangles (LeetCode 3128) | LeetCode | Medium | https://leetcode.com/problems/right-triangles/ | Counting axis-aligned right triangles | Combinatorics |
| 9 | 89. Gray Code | LeetCode | Medium | https://leetcode.com/problems/gray-code/ | N/A (not direct geometry) | N/A |
| 10 | Pythagorean Expectation | LightOJ | Easy | https://lightoj.com/problem/pythagorean-expectation | BS on ratio | Binary search |
| 11 | Pythagorean Distance Nodes in a Tree | LeetCode | Medium | https://leetcode.com/problems/pythagorean-distance-nodes-in-a-tree/ | Tree + distance | BFS + Pythagoras |
| 12 | Special Pythagorean Triplet | Project Euler | Easy | https://projecteuler.net/problem=9 | a+b+c=1000 | Brute force |
| 13 | Singular Integer Right Triangles | Project Euler | Hard | https://projecteuler.net/problem=75 | Count one-solution perimeters | Triple generation |

### 7. GENERATED PRACTICE PROBLEMS

**Easy 1: Is it Right?**
Given three side lengths, determine if they form a right triangle. Assume the longest side is the hypotenuse.

**Easy 2: Find the Hypotenuse**
Given two leg lengths `a` and `b`, compute the hypotenuse `c` (rounded to 2 decimal places).

**Medium 3: Count Right Triangles from Side Lengths**
Given an array of N integers (side lengths), count how many triples `(i, j, k)` can form a right triangle. N <= 500.

**Medium 4: Right Triangle from Hypotenuse**
Given a hypotenuse length `c` (integer), find all right triangles with integer legs whose hypotenuse ≤ c. Return the count.

**Hard 5: Maximum Right Triangle Density**
Given N points in 2D space, find the maximum number of points that can form right triangles with a single common vertex. N <= 1000.

**Hard 6: Right Triangle Covering**
Given N points on a plane, find the minimum number of right triangles needed such that every point lies on at least one triangle. Points can be triangle vertices or interior points.

**Interview-style 7: Pythia's Challenge**
Given an integer N, find a Pythagorean triple `(a, b, c)` such that `N = a + b + c` and `a < b < c`. If multiple exist, return the one with minimal `c`.

**Contest-style 8: Grid Right Triangles**
On an `N x N` integer grid, count all right triangles with one vertex at the origin `(0, 0)`, one vertex on the x-axis, and one vertex on the y-axis. All coordinates must be integers.

### 8. COMPLETE SOLUTION SECTION

#### Problem 1: Pythagorean Theorem (CodeAbbey)

**A. Intuition:** Given two leg lengths, compute the hypotenuse using the Pythagorean theorem.

**B. Brute Force:** Direct calculation.

**C. Optimized Approach:** Use sqrt of sum of squares.

**D. Step-by-Step:**
1. For each test case, read a and b
2. Compute c = sqrt(a*a + b*b)
3. Output c rounded appropriately

**E. Complexity:** O(1) per test case.

**F. Edge Cases:** Zero-length legs? Not in problem constraints.

**G. Code:**

```python
import sys, math

def solve():
    data = sys.stdin.read().strip().split()
    n = int(data[0])
    result = []
    for i in range(n):
        a, b = map(int, data[1+2*i: 3+2*i])
        c = math.sqrt(a*a + b*b)
        result.append(f"{c:.10f}")
    print(' '.join(result))
```

#### Problem 2: Special Pythagorean Triplet (Project Euler #9)

**A. Intuition:** Find a, b, c such that `a + b + c = 1000` and `a^2 + b^2 = c^2`, with `a < b < c`.

**B. Brute Force:** Triple nested loops O(1000^3) — way too slow.

**C. Optimized Approach:** Two nested loops: for a and b, compute `c = 1000 - a - b` and check the Pythagorean condition.

**D. Step-by-Step:**
1. For a from 1 to 333:
   - For b from a+1 to 500:
     - c = 1000 - a - b
     - If c <= b: break
     - If a^2 + b^2 == c^2: return a*b*c

**E. Complexity:** O(n^2) = O(10^6), fine for n = 1000.

**F. Edge Cases:** Only one valid triple for sum 1000: (200, 375, 425).

**G. Code:**

```python
def solve():
    for a in range(1, 334):
        for b in range(a + 1, 500):
            c = 1000 - a - b
            if c <= b:
                continue
            if a*a + b*b == c*c:
                return a * b * c
    return -1

print(solve())
```

#### Problem 3: Pythagorean Triples (Codeforces 707C)

**A. Intuition:** Given one integer side `n`, find ANY Pythagorean triple containing that side. Use Euclid's formula creatively. If `n` can be written as `m^2 - n^2`, `2*m*n`, or `m^2 + n^2`, we can construct the other two sides.

**B. Brute Force:** Not applicable — need constructive approach.

**C. Optimized Approach:**
- If n is even: let n = 2*m*k where k divides n/2. Let m = n/2, then other sides: `m^2 - 1` and `m^2 + 1`.
  Actually: if n is even, write n = 2*k. Let other sides = k^2 - 1 and k^2 + 1.
- If n is odd: write n = m^2 - n^2 = (m-n)(m+n). Let m = (n+1)/2, n = (n-1)/2. Then a = 2*m*n, c = m^2 + n^2.

**D. Step-by-Step:**
1. If n <= 2: print -1 (no triple with these)
2. If n is even: let k = n // 2, other sides = k^2 - 1, k^2 + 1
3. If n is odd: let m = (n*n - 1) // 2, other sides = m, m + 1

**E. Complexity:** O(1).

**F. Edge Cases:** n = 1, 2 → impossible.

**G. Code:**

```python
n = int(input())
if n <= 2:
    print(-1)
elif n % 2 == 0:
    k = n // 2
    print(k*k - 1, k*k + 1)
else:
    m = (n*n - 1) // 2
    print(m, m + 1)
```

#### Problem 4: Pythagorean Theorem II (Codeforces 304A)

**A. Intuition:** Count all Pythagorean triples with sides <= N. Use brute force with optimization: fix a and b, compute c = sqrt(a^2 + b^2), check if integer.

**B. Brute Force:** O(N^3) — check all triples.

**C. Optimized Approach:** O(N^2) — for each a, b, compute c and verify.

**D. Step-by-Step:**
1. For a from 1 to N:
   - For b from a to N:
     - c2 = a*a + b*b
     - c = int(sqrt(c2))
     - If c*c == c2 and c <= N: count++

**E. Complexity:** O(N^2), N <= 10^4 → acceptable.

**F. Edge Cases:** N small → 0.

**G. Code:**

```python
import math

n = int(input())
count = 0
for a in range(1, n + 1):
    for b in range(a, n + 1):
        c2 = a*a + b*b
        c = int(math.isqrt(c2))
        if c*c == c2 and c <= n:
            count += 1
print(count)
```

```cpp
#include <iostream>
#include <cmath>
using namespace std;

int main() {
    int n, count = 0;
    cin >> n;
    for (int a = 1; a <= n; a++) {
        for (int b = a; b <= n; b++) {
            int c2 = a*a + b*b;
            int c = sqrt(c2);
            if (c*c == c2 && c <= n) count++;
        }
    }
    cout << count << endl;
    return 0;
}
```

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int count = 0;
        for (int a = 1; a <= n; a++) {
            for (int b = a; b <= n; b++) {
                int c2 = a*a + b*b;
                int c = (int)Math.sqrt(c2);
                if (c*c == c2 && c <= n) count++;
            }
        }
        System.out.println(count);
    }
}
```

#### Problem 5: Project Euler #91 — Right Triangles on Grid

**A. Intuition:** On an N x N grid, count right triangles with vertices at lattice points and one vertex at the origin O(0, 0). The other two vertices P and Q must have integer coordinates. The right angle can be at O, at P, or at Q.

**B. Brute Force:** O(N^4) — try all P and Q — too slow.

**C. Optimized Approach:** O(N^2 log N) — for each P, count Q such that angle is right.

**Case 1: Right angle at O.** P and Q must be on perpendicular axes. Count = N * N (any P on x-axis, Q on y-axis).

**Case 2: Right angle at P (or Q).** Vectors PO and PQ must be perpendicular: `dot(P - O, Q - P) = 0`. For each P, we need Q such that `(P.x * (Q.x - P.x) + P.y * (Q.y - P.y) = 0)`.

**D. Step-by-Step:**
1. For right angle at O: add N*N
2. For each P = (px, py) with px, py in [0, N], not both zero:
   - Compute reduced direction vector. For right angle at P, Q must satisfy: `(Q - P) dot P = 0`
   - Parameterize: Let g = gcd(px, py). The vector perpendicular to P is `(-py/g, px/g)` or `(py/g, -px/g)`
   - Scale and count how many integer Q = P + k * (-py/g, px/g) stay within bounds
3. Count each triangle twice because each leg can be at either endpoint → divide by 2

**E. Complexity:** O(N^2 log N) due to gcd per point.

**F. Edge Cases:** N = 0 → 0 triangles. Points P and Q cannot coincide with O.

**G. Code:**

```python
import math

def solve():
    N = int(input())
    count = N * N  # right angle at O
    
    for px in range(N + 1):
        for py in range(N + 1):
            if px == 0 and py == 0:
                continue
            
            g = math.gcd(px, py)
            # Perpendicular direction: (-py/g, px/g)
            dx = -py // g
            dy = px // g
            
            # Q = P + t * (dx, dy). Q must be within [0, N].
            # t can be positive or negative
            min_t = float('-inf')
            max_t = float('inf')
            
            if dx > 0:
                min_t = max(min_t, -px / dx)
                max_t = min(max_t, (N - px) / dx)
            elif dx < 0:
                min_t = max(min_t, (N - px) / dx)
                max_t = min(max_t, -px / dx)
            else:  # dx == 0, dy must be non-zero
                if dy > 0:
                    min_t = max(min_t, -py / dy)
                    max_t = min(max_t, (N - py) / dy)
                else:
                    min_t = max(min_t, (N - py) / dy)
                    max_t = min(max_t, -py / dy)
            
            t_values = int(max_t) - int(math.ceil(min_t)) + 1
            if int(math.ceil(min_t)) < 0:
                t_values -= 1  # exclude Q = O
            count += max(0, t_values)
    
    print(count // 2)  # each triangle counted at P and Q

if __name__ == "__main__":
    solve()
```

#### Problem 6: Right Triangles (LeetCode 3128)

**A. Intuition:** Given a binary matrix, count right triangles where the legs are along rows and columns. Each right triangle has its right angle at a cell with value 1. The other two vertices are on the same row and column respectively.

**B. Approach:** For each row i and column j, track count of 1s. For each cell (i, j) that is 1, the number of right triangles with right angle there is `(row_count[i] - 1) * (col_count[j] - 1)`.

**C. Step-by-Step:**
1. Count 1s per row (row_cnt[i]) and per column (col_cnt[j])
2. For each cell (i, j) with value 1:
   - Add `(row_cnt[i] - 1) * (col_cnt[j] - 1)` to answer
3. Return answer

**E. Complexity:** O(m * n) time, O(m + n) space.

**F. Edge Cases:** Single 1 → no triangle possible.

**G. Code:**

```python
def number_of_right_triangles(grid):
    m, n = len(grid), len(grid[0])
    row_cnt = [sum(row) for row in grid]
    col_cnt = [sum(grid[i][j] for i in range(m)) for j in range(n)]
    
    ans = 0
    for i in range(m):
        for j in range(n):
            if grid[i][j] == 1:
                ans += (row_cnt[i] - 1) * (col_cnt[j] - 1)
    return ans
```

---

## Summary of Key Formulas

| Concept | Formula |
|---|---|
| Euclidean distance | `d = sqrt((x2-x1)^2 + (y2-y1)^2)` |
| Manhattan distance | `d = |x2-x1| + |y2-y1|` |
| Cross product (orientation) | `(B-A)x(C-A) = (B.x-A.x)*(C.y-A.y) - (B.y-A.y)*(C.x-A.x)` |
| Triangle area (coordinates) | `0.5 * |x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2)|` |
| Triangle area (Heron) | `sqrt(s(s-a)(s-b)(s-c))` where `s = (a+b+c)/2` |
| Triangle inequality | `a + b > c, a + c > b, b + c > a` |
| Right triangle (Pythagorean) | `a^2 + b^2 = c^2` |
| Collinearity | `cross(A, B, C) == 0` |
| Polygon area (shoelace) | `0.5 * |sum(x_i * y_{i+1} - x_{i+1} * y_i)|` |
| Rectangle overlap | `not (r1.right < r2.left or r1.left > r2.right or r1.bottom < r2.top or r1.top > r2.bottom)` |
