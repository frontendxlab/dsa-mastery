# Geometry and Shape Problems in Data Structures and Algorithms

## From Beginner to Advanced

---

# Chapter 5: Rectangle and Square Problems

## 1. INTRODUCTION

A **rectangle** is a four-sided polygon (quadrilateral) with four right angles (90°). A **square** is a special rectangle where all four sides are equal. These are the most fundamental shapes in computational geometry and appear constantly in coding interviews and competitive programming.

### Real-World Intuition

Think of a rectangle as any rectangular box — a phone screen, a piece of paper, a room floor. In programming, rectangles define bounding areas: the region a character occupies, the clickable area of a button, the visible viewport of a camera.

Squares are rectangles where width = height. They appear in grid-based games (each tile is a square), image processing (pixel neighborhoods), and optimization problems (fitting the largest square into an area).

### Why It Matters

Rectangle and square problems teach you:
- **Coordinate systems**: how (x, y) pairs define regions
- **Intersection logic**: whether two rectangles overlap
- **Area and perimeter computation**: fundamental to any geometric computation
- **Grid reasoning**: rectangles within matrices
- **Greedy and DP patterns**: optimal rectangle placement, largest rectangle in histogram

---

## 2. CORE CONCEPTS

### 2.1 Rectangles in Coordinate Geometry

An **axis-aligned rectangle** (the most common type in coding problems) is defined by two points:

- Bottom-left: `(x1, y1)`
- Top-right: `(x2, y2)`

```
Properties:
  Width  = x2 - x1
  Height = y2 - y1
  Area   = Width × Height = (x2 - x1)(y2 - y1)
  Perimeter = 2 × (Width + Height)
```

### 2.2 Rectangle Representation

In code, rectangles are typically represented in one of these forms:

```
// Form 1: Two corners
(x1, y1) = bottom-left, (x2, y2) = top-right

// Form 2: Center + half-dimensions
(cx, cy, half_w, half_h)

// Form 3: Bottom-left + dimensions
(x, y, width, height)
```

### 2.3 Rectangle Intersection

**Two axis-aligned rectangles overlap if and only if:**

```
overlap_x = max(r1.x1, r2.x1) < min(r1.x2, r2.x2)
overlap_y = max(r1.y1, r2.y1) < min(r1.y2, r2.y2)
```

The **intersection rectangle** (if it exists):

```
ix1 = max(r1.x1, r2.x1)
iy1 = max(r1.y1, r2.y1)
ix2 = min(r1.x2, r2.x2)
iy2 = min(r1.y2, r2.y2)
```

### 2.4 Point-in-Rectangle

A point `(px, py)` lies inside a rectangle iff:

```
x1 <= px <= x2 AND y1 <= py <= y2
```

For exclusive boundaries (strict interior), use `<` instead of `<=`.

### 2.5 Square-Specific Properties

A square has all four sides equal. Given any two properties, you can derive the rest:

```
Side = s
Diagonal = s√2
Area = s²
Perimeter = 4s
```

To check if four points form a square:
1. Compute all six pairwise distances
2. Sort them
3. The four smallest should be equal (sides), and the two largest should be equal (diagonals)

### 2.6 Largest Rectangle in Histogram

The classic algorithmic pattern: given an array of heights, find the largest rectangle that can be formed. Solved with a **monotonic stack** in O(n).

### 2.7 Number of Squares in a Grid

An `N × M` grid contains:
```
Total squares = Σ(k=1 to min(N,M)) (N-k+1)(M-k+1)
```

---

## 3. PROBLEM RECOGNITION

### Common Keywords

| Keyword | Likely Problem Type |
|---------|-------------------|
| "rectangle overlap / intersection" | Axis-aligned rectangle intersection |
| "largest rectangle" | Monotonic stack / histogram |
| "containing rectangle" | Bounding box computation |
| "rectangle area" | Union area (sweep line) |
| "fitting rectangles" | Greedy / bin packing |
| "perfect square / square number" | Number theory with geometry |
| "grid squares" | Combinatorial counting |
| "form a square" | Point set square detection |
| "rectangle cutting / cutting a rectangle" | GCD-based optimization |

### Hidden Geometry Indicators

Some problems don't mention "rectangle" but are rectangle problems:
- Manufacturing/flattening/arranging boxes
- Billboard/poster fitting
- Painting/wall area
- Farm/crop/land division
- Matrix submatrix problems

### How Interviewers Frame These

- "Given N rectangles, find total area covered"
- "Find the largest rectangle of 1s in a binary matrix"
- "Can you fit all these rectangles into a container?"
- "Count number of squares in a chessboard"
- "Do these rectangles overlap?"

---

## 4. PATTERN ANALYSIS

### Pattern 1: Rectangle Intersection Checking

**When to use**: Two or more axis-aligned rectangles need comparison
**Why it works**: The overlap condition is simple — project onto x and y axes independently
**Complexity**: O(1) per pair
**Common mistakes**: Off-by-one on inclusive vs exclusive boundaries, assuming rectangles are sorted

### Pattern 2: Binary Search on Rectangle Area

**When to use**: A "cut" or "fit" problem where you need to find the minimal/maximal dimension
**Why it works**: Area/width/height are monotonic with respect to feasibility
**Complexity**: O(N log MAX)
**Common mistakes**: Not handling integer vs real-valued dimensions

### Pattern 3: Monotonic Stack (Largest Rectangle in Histogram)

**When to use**: Finding maximal rectangle area in a 2D grid of 1s and 0s
**Why it works**: Treat each row as a histogram of consecutive 1s
**Complexity**: O(N × M)
**Common mistakes**: Forgetting to reset heights per row

### Pattern 4: Sweep Line with Coordinate Compression

**When to use**: Multiple rectangle union/intersection, counting covered cells
**Why it works**: Events at x-start and x-end allow processing only at changes
**Complexity**: O(N log N)
**Common mistakes**: Not handling overlapping edges correctly

### Pattern 5: Rectangle Counting in Grids

**When to use**: Matrix problems counting subrectangles meeting a condition
**Why it works**: Often uses prefix sums + enumeration of top/bottom rows
**Complexity**: O(N² × M) or O(N × M²) depending on enumeration direction

---

## 5. REUSABLE CODING TEMPLATES

### 5.1 Rectangle Intersection

```python
def intersect_rect(r1, r2):
    # r = (x1, y1, x2, y2) where (x1,y1) bottom-left, (x2,y2) top-right
    x1 = max(r1[0], r2[0])
    y1 = max(r1[1], r2[1])
    x2 = min(r1[2], r2[2])
    y2 = min(r1[3], r2[3])
    if x1 < x2 and y1 < y2:
        return (x1, y1, x2, y2)
    return None
```

```cpp
struct Rect { int x1, y1, x2, y2; };
Rect intersect(const Rect& a, const Rect& b) {
    int x1 = max(a.x1, b.x1);
    int y1 = max(a.y1, b.y1);
    int x2 = min(a.x2, b.x2);
    int y2 = min(a.y2, b.y2);
    if (x1 < x2 && y1 < y2) return {x1, y1, x2, y2};
    return {};  // no intersection
}
```

```java
class Rect { int x1, y1, x2, y2; }
Rect intersect(Rect a, Rect b) {
    int x1 = Math.max(a.x1, b.x1);
    int y1 = Math.max(a.y1, b.y1);
    int x2 = Math.min(a.x2, b.x2);
    int y2 = Math.min(a.y2, b.y2);
    if (x1 < x2 && y1 < y2) return new Rect(x1, y1, x2, y2);
    return null;
}
```

### 5.2 Point-in-Rectangle Test

```python
def point_in_rect(px, py, r):
    return r[0] <= px <= r[2] and r[1] <= py <= r[3]
```

### 5.3 Union Area of Rectangles (Sweep Line)

```python
def rect_union_area(rects):
    # rects: list of (x1, y1, x2, y2)
    events = []
    for x1, y1, x2, y2 in rects:
        events.append((x1, y1, y2, 1))   # start
        events.append((x2, y1, y2, -1))  # end
    events.sort()
    
    active = []
    prev_x = events[0][0]
    area = 0
    
    for x, y1, y2, typ in events:
        # compute covered y-length
        covered = 0
        cur = -1e9
        for ly, ry in sorted(active):
            if ly > cur:
                covered += ry - ly
                cur = ry
            else:
                covered += max(0, ry - cur)
                cur = max(cur, ry)
        
        area += covered * (x - prev_x)
        
        if typ == 1:
            active.append((y1, y2))
        else:
            active.remove((y1, y2))
        prev_x = x
    
    return area
```

### 5.4 Largest Rectangle in Binary Matrix

```python
def largest_rectangle(matrix):
    if not matrix or not matrix[0]:
        return 0
    heights = [0] * len(matrix[0])
    max_area = 0
    
    for row in matrix:
        for i, val in enumerate(row):
            heights[i] = heights[i] + 1 if val == 1 else 0
        
        stack = []
        for i, h in enumerate(heights + [0]):
            while stack and heights[stack[-1]] > h:
                height = heights[stack.pop()]
                left = stack[-1] if stack else -1
                width = i - left - 1
                max_area = max(max_area, height * width)
            stack.append(i)
    
    return max_area
```

### 5.5 Square Detection from Points

```python
def is_square(p1, p2, p3, p4):
    def dist(a, b):
        return (a[0]-b[0])**2 + (a[1]-b[1])**2
    
    d = [
        dist(p1, p2), dist(p1, p3), dist(p1, p4),
        dist(p2, p3), dist(p2, p4), dist(p3, p4)
    ]
    d.sort()
    # four equal smallest (sides), two equal largest (diagonals)
    return (d[0] == d[1] == d[2] == d[3] and d[4] == d[5]
            and d[0] > 0 and d[4] > d[0])
```

---

## 6. CURATED REAL PROBLEMS

| # | Problem | Platform | Difficulty | Concepts | Pattern |
|---|---------|----------|-----------|---------|---------|
| 1 | Rectangle Overlap | BinarySearch | Easy | Axis-aligned intersection | Overlap check |
| 2 | Rectangle Cutting | Codeforces (800) | Easy | GCD, area division | Greedy division |
| 3 | Draw a Square | Codeforces (800) | Easy | Coordinate square | Geometry basics |
| 4 | Construct a Rectangle | Codeforces (800) | Easy | Side length logic | Feasibility check |
| 5 | Rectangle Arrangement | Codeforces (800) | Easy | Bounding box | Area computation |
| 6 | Maximal Square | LeetCode (Medium) | Medium | Largest square of 1s | DP on matrix |
| 7 | Rectangle Area | LeetCode (Medium) | Medium | Union/intersection | Overlap computation |
| 8 | Largest Rectangle in Histogram | LeetCode (Hard) | Hard | Monotonic stack | Stack pattern |
| 9 | Divide Square | Codeforces (2400) | Hard | Segment intersection | Sweep line |
| 10 | Count The Rectangles | Codeforces (2200) | Hard | Combinatorial counting | Tree / BIT |
| 11 | Rectangle Painting | Codeforces (2300) | Hard | DP on rectangles | Divide and conquer DP |
| 12 | Largest Submatrix With Rearrangements | LeetCode (Medium) | Medium | Histogram + sorting | Column sorting |

---

## 7. GENERATED PRACTICE PROBLEMS

### Easy — Rectangle Checker
Given four integer coordinates (x, y), determine if they form a rectangle with sides parallel to axes.

### Easy — Minimum Bounding Square
Given N points in a 2D plane, find the side length of the smallest axis-aligned square that encloses all points.

### Medium — Maximum White Rectangle
Given an N × M binary grid (0 = white, 1 = black), find the area of the largest rectangle containing only white cells.

### Medium — Non-Overlapping Rectangles
Given N rectangles, find the maximum number of rectangles you can select such that no two overlap.

### Hard — Rectangle Filling
Given an N × N grid where you can paint any axis-aligned rectangle in one operation, find the minimum operations to reach a target pattern.

### Contest — Rectangular Islands
Given N axis-aligned rectangles in a 2D plane, count the number of connected components (islands) formed by overlapping or touching rectangles.

### Interview — Max Sum Rectangle
Given an N × M matrix of integers (positive and negative), find the submatrix with maximum sum.

---

## 8. COMPLETE SOLUTION SECTION

### Problem 1: Rectangle Overlap (Easy)

**A. Intuition**: An axis-aligned rectangle is a product of two intervals: [x1, x2] on the x-axis and [y1, y2] on the y-axis. Two rectangles overlap exactly when both intervals overlap on both axes.

**B. Brute Force**: Check all possible relative positions (left, right, above, below) — 4 cases. Not needed.

**C. Optimized Approach**: Direct overlap formula: project onto x and y axes independently.

**D. Step-by-Step**:
1. Compute x-overlap: `max(r1.x1, r2.x1) < min(r1.x2, r2.x2)`
2. Compute y-overlap: `max(r1.y1, r2.y1) < min(r1.y2, r2.y2)`
3. Return true if both conditions hold

**E. Complexity**: O(1) time, O(1) space

**F. Edge Cases**:
- Touching at edges (depends on inclusive/exclusive)
- One rectangle entirely inside another
- Zero-area rectangles

**G. Code**:

```python
def is_rectangle_overlap(rec1, rec2):
    # rec = [x1, y1, x2, y2]
    return (rec1[0] < rec2[2] and rec2[0] < rec1[2]
            and rec1[1] < rec2[3] and rec2[1] < rec1[3])
```

```cpp
bool isRectangleOverlap(vector<int>& r1, vector<int>& r2) {
    return (r1[0] < r2[2] && r2[0] < r1[2] &&
            r1[1] < r2[3] && r2[1] < r1[3]);
}
```

```java
public boolean isRectangleOverlap(int[] r1, int[] r2) {
    return (r1[0] < r2[2] && r2[0] < r1[2] &&
            r1[1] < r2[3] && r2[1] < r1[3]);
}
```

---

### Problem 2: Largest Rectangle in Histogram (Hard)

**A. Intuition**: For each bar, find how far the rectangle can extend left and right while staying at the bar's height. This means finding the nearest smaller element on each side — a classic monotonic stack application.

**B. Brute Force**: For each bar, expand left and right until hitting a smaller bar. O(N²).

**C. Optimized (Monotonic Stack)**:
1. Maintain a stack of indices with strictly increasing heights
2. When a bar is lower than the stack top, pop and compute area using the popped height
3. The popped bar's width extends from the new stack top (left bound) to the current index (right bound)

**D. Step-by-Step**:
1. Append 0 to heights (sentinel)
2. For each index i, while stack not empty and heights[stack[-1]] > heights[i]:
   - Pop top index h_idx
   - Height = heights[h_idx]
   - Left = stack[-1] if stack else -1
   - Right = i
   - Width = right - left - 1
   - Area = height × width
3. Push i onto stack

**E. Complexity**: O(N) time, O(N) stack space

**F. Edge Cases**:
- Decreasing heights (every bar pops the next)
- Increasing heights (nothing pops until sentinel)
- All equal heights

**G. Code**:

```python
def largest_rectangle_area(heights):
    heights.append(0)  # sentinel
    stack = []
    max_area = 0
    
    for i, h in enumerate(heights):
        while stack and heights[stack[-1]] > h:
            height = heights[stack.pop()]
            left = stack[-1] if stack else -1
            width = i - left - 1
            max_area = max(max_area, height * width)
        stack.append(i)
    
    return max_area
```

```cpp
int largestRectangleArea(vector<int>& heights) {
    heights.push_back(0);
    stack<int> st;
    int maxArea = 0;
    for (int i = 0; i < heights.size(); i++) {
        while (!st.empty() && heights[st.top()] > heights[i]) {
            int h = heights[st.top()]; st.pop();
            int left = st.empty() ? -1 : st.top();
            maxArea = max(maxArea, h * (i - left - 1));
        }
        st.push(i);
    }
    return maxArea;
}
```

```java
public int largestRectangleArea(int[] heights) {
    int n = heights.length;
    int[] h = Arrays.copyOf(heights, n + 1);
    Stack<Integer> st = new Stack<>();
    int maxArea = 0;
    for (int i = 0; i <= n; i++) {
        while (!st.isEmpty() && h[st.peek()] > h[i]) {
            int height = h[st.pop()];
            int left = st.isEmpty() ? -1 : st.peek();
            maxArea = Math.max(maxArea, height * (i - left - 1));
        }
        st.push(i);
    }
    return maxArea;
}
```

---

### Problem 3: Maximal Square (Medium)

**A. Intuition**: A square of side k can only exist at cell (i, j) if the cells above, to the left, and diagonally above-left support a square of side k-1.

**B. DP State**: `dp[i][j]` = side length of the largest square ending at (i, j).

**C. Recurrence**: `dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])` if matrix[i][j] = 1, else 0.

**D. Complexity**: O(N × M) time, O(N × M) space (can be O(M) with rolling array)

**E. Edge Cases**: Single row, single column, all zeros, all ones

```python
def maximal_square(matrix):
    if not matrix or not matrix[0]:
        return 0
    m, n = len(matrix), len(matrix[0])
    dp = [[0] * n for _ in range(m)]
    max_side = 0
    for i in range(m):
        for j in range(n):
            if matrix[i][j] == 1:
                if i == 0 or j == 0:
                    dp[i][j] = 1
                else:
                    dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
                max_side = max(max_side, dp[i][j])
    return max_side * max_side
```

---

# Chapter 6: Circle Problems

## 1. INTRODUCTION

A **circle** is the set of all points at a fixed distance (radius) from a center point. Circles introduce curved geometry into a world of discrete grids and straight lines — and they force us to think in terms of distances, angles, and continuous space.

### Real-World Intuition

Radar range (everyone within a radius), cell tower coverage, throwing a stone in a pond (ripples), the reach of a Wi-Fi signal. Any problem that says "within distance R" is fundamentally a circle problem.

### Why It Matters

Circle problems teach you:
- **Distance metrics**: Euclidean vs Manhattan, the cost of square roots
- **Binary search on continuous space**: "What radius covers all points?"
- **Geometric intersection**: circle-circle and circle-rectangle overlap
- **Numerical precision**: tolerances, floating-point comparison
- **Angular sweep**: counting points within a circle using angles

---

## 2. CORE CONCEPTS

### 2.1 Circle Equation

```
Center: (cx, cy)
Radius: r
Equation: (x - cx)² + (y - cy)² = r²
```

A point (px, py) lies:
- **Inside** the circle if `(px - cx)² + (py - cy)² < r²`
- **On** the circle if `(px - cx)² + (py - cy)² == r²`
- **Outside** if `(px - cx)² + (py - cy)² > r²`

### 2.2 Circle-Circle Intersection

Two circles intersect if the distance between centers ≤ sum of radii AND ≥ |r₁ - r₂|.

```
d = sqrt((cx1 - cx2)² + (cy1 - cy2)²)

Conditions:
  d > r1 + r2      → no intersection (separate)
  d == r1 + r2     → tangent externally
  d < |r1 - r2|    → one inside the other
  d == |r1 - r2|   → tangent internally
  otherwise        → two intersection points
```

### 2.3 Circle Area and Circumference

```
Area = πr²
Circumference = 2πr
```

### 2.4 Angular Coordinates

Any point on a circle can be represented as:

```
x = cx + r × cos(θ)
y = cy + r × sin(θ)
```

This is essential for angular sweep algorithms and constructing polygons from circles.

### 2.5 Circle Through Three Points

Three non-collinear points uniquely determine a circle. The center is the circumcenter of the triangle formed by the points.

```
Given points A, B, C:
- Midpoint of AB → perpendicular bisector
- Midpoint of BC → perpendicular bisector
- Intersection of bisectors = center
- Radius = distance from center to any point
```

### 2.6 Minimum Enclosing Circle

**Welzl's algorithm** (randomized, expected O(N)):
1. If 0-3 points: return trivial circle
2. Pick a random point
3. Recursively compute circle for remaining points
4. If point is inside, return circle
5. Otherwise, it must be on boundary: fix the point and recurse

---

## 3. PROBLEM RECOGNITION

| Keyword | Problem Type |
|---------|-------------|
| "within radius / within distance" | Circle containment |
| "circle covering" | Minimum enclosing circle |
| "circle intersection" | Circle-circle collision |
| "circular / round" | Ring/circle geometry |
| "line of sight / range" | Circle coverage |
| "lattice points in circle" | Number theory on circles |
| "tangent" | Circle-line intersection |
| "sector / arc" | Angular portions |

### Hidden Circle Problems

- "Place a base station": find radius covering all clients
- "Bomb blast radius": circle intersection with obstacles
- "Satellite coverage": angular sweep on Earth (sphere = 3D circle)
- "Parking sensor range": which points are within R?

---

## 4. PATTERN ANALYSIS

### Pattern 1: Binary Search on Radius

**When to use**: "Minimum radius to cover all points"
**Why it works**: Coverage is monotonic — if radius R works, any larger radius works
**Complexity**: O(N × log(PRECISION)) per check
**Common pitfalls**: Using squared distance to avoid sqrt, integer vs double precision

### Pattern 2: Angular Sweep

**When to use**: Maximum points covered by a circle of given radius
**Why it works**: For each point as candidate center-adjacent, sweep angles to count coverage
**Complexity**: O(N² log N)
**Common pitfalls**: Angle normalization (atan2 returns [-π, π], need to handle circularity)

### Pattern 3: Circle Union Area

**When to use**: Total area covered by overlapping circles
**Why it works**: Decompose into circular segments + polygons connecting intersection points
**Complexity**: O(N²) (computational geometry heavyweight)
**Common pitfalls**: Numerical stability of intersection points

### Pattern 4: Lattice Point Counting

**When to use**: Counting integer-coordinate points inside a circle
**Why it works**: Iterate over x, compute y-range via sqrt(r² - x²)
**Complexity**: O(R) where R is radius
**Common pitfalls**: Off-by-one (inclusive vs exclusive boundary)

---

## 5. REUSABLE CODING TEMPLATES

### 5.1 Point-Circle Distance

```python
def point_in_circle(px, py, cx, cy, r):
    dx, dy = px - cx, py - cy
    return dx * dx + dy * dy <= r * r  # squared for integer comparison
```

### 5.2 Circle-Circle Intersection

```python
def circles_intersect(cx1, cy1, r1, cx2, cy2, r2):
    dx, dy = cx1 - cx2, cy1 - cy2
    d_sq = dx * dx + dy * dy
    r_sum = r1 + r2
    r_diff = abs(r1 - r2)
    # Check overlap condition
    return d_sq <= r_sum * r_sum and d_sq >= r_diff * r_diff
```

### 5.3 Minimum Enclosing Circle

```python
import random, math

def welzl(P):
    def trivial(R):
        if len(R) == 0: return (0, 0, 0)
        if len(R) == 1: return (R[0][0], R[0][1], 0)
        if len(R) == 2:
            x1, y1 = R[0]; x2, y2 = R[1]
            cx, cy = (x1+x2)/2, (y1+y2)/2
            d = math.hypot(x2-x1, y2-y1)
            return (cx, cy, d/2)
        # 3 points → circumcircle
        (x1,y1),(x2,y2),(x3,y3) = R[0],R[1],R[2]
        d = 2*(x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2))
        if abs(d) < 1e-12: return (0, 0, float('inf'))
        ux = ((x1*x1+y1*y1)*(y2-y3) + (x2*x2+y2*y2)*(y3-y1) + (x3*x3+y3*y3)*(y1-y2))/d
        uy = ((x1*x1+y1*y1)*(x3-x2) + (x2*x2+y2*y2)*(x1-x3) + (x3*x3+y3*y3)*(x2-x1))/d
        r = math.hypot(ux-x1, uy-y1)
        return (ux, uy, r)
    
    def solve(P, R):
        if not P or len(R) == 3:
            return trivial(R)
        p = P[-1]
        P = P[:-1]
        c = solve(P, R)
        if point_in_circle(p[0], p[1], c[0], c[1], c[2] + 1e-9):
            return c
        return solve(P, R + [p])
    
    random.shuffle(P)
    cx, cy, r = solve(P, [])
    return (cx, cy, r)
```

### 5.4 Angular Sweep — Max Points in Circle

```python
def max_points_in_circle(points, cx, cy, r):
    n = len(points)
    max_count = 0
    for i in range(n):
        angles = []
        for j in range(n):
            if i == j: continue
            dx = points[j][0] - points[i][0]
            dy = points[j][1] - points[i][1]
            d_sq = dx*dx + dy*dy
            if d_sq > 4 * r * r: continue
            a = math.atan2(dy, dx)
            delta = math.acos(math.sqrt(d_sq) / (2 * r))
            angles.append((a - delta, 1))
            angles.append((a + delta, -1))
        angles.sort(key=lambda x: (x[0], -x[1]))
        cnt = 1
        for _, typ in angles:
            cnt += typ
            max_count = max(max_count, cnt)
    return max_count
```

---

## 6. CURATED REAL PROBLEMS

| # | Problem | Platform | Difficulty | Concepts | Pattern |
|---|---------|----------|-----------|---------|---------|
| 1 | Circle Area | CodeChef | Easy | πr² formula | Basic computation |
| 2 | Gleb And Pizza | Codeforces (1100) | Easy | Circle geometry | Point in circle |
| 3 | Chat in a Circle | AtCoder (600) | Easy-Medium | Circle arrangement | Greedy ordering |
| 4 | Water Lily | Codeforces (1000) | Easy | Circle/right triangle | Pythagorean |
| 5 | Circle Intersection | Baekjoon (Gold 1) | Medium | Circle-circle overlap | Distance check |
| 6 | Circle Lattice Points | AtCoder (1200) | Medium | Lattice counting | Grid enumeration |
| 7 | Circle Union | CodeChef | Hard | Union area | Geometric decomposition |
| 8 | Max Darts in Dartboard | LeetCode (Hard) | Hard | Circle coverage | Angular sweep |
| 9 | Minimum Enclosing Circle | GFG | Hard | Welzl's algorithm | Randomized algorithm |
| 10 | Circle Covering Points | CodeChef (CHEFCIRC) | Hard | Min radius cover | Binary search + geometry |
| 11 | Best Position for Service Centre | LeetCode (Hard) | Hard | Geometric median | Gradient descent/ternary |
| 12 | Circle of Students | Codeforces (1000) | Easy | Array ordering | String/cyclic check |

---

## 7. GENERATED PRACTICE PROBLEMS

### Easy — Circle Area Comparator
Given two circles defined by (cx, cy, r), determine which has larger area.

### Easy — How Many Inside?
Given N points and a circle (cx, cy, r), count how many points lie strictly inside the circle.

### Medium — Concentric Rings
Given N circles sharing the same center, find if a given point (px, py) is in the annular region between the K-th and (K+1)-th circle.

### Medium — Minimum Covering Radius
Given N points, find the minimum radius of a circle centered at (cx, cy) that covers all points.

### Hard — Circle Packing
Given a rectangular box of dimensions W × H, find the maximum number of circles of radius r that can be packed without overlapping.

### Hard — Overlap Area
Given two circles with centers (0, 0), r1 and (d, 0), r2, compute the area of their intersection.

### Interview — Radar Stations
You are placing N radar stations. Each has a max range r. Given the positions of all stations and M targets, determine if every target is covered by at least one station.

---

## 8. COMPLETE SOLUTION SECTION

### Problem 1: Point in Circle — Water Lily (Codeforces 1199B)

**A. Intuition**: A classic right-triangle problem disguised as geometry. The water lily touches the water surface, then is pulled to the side. This forms a right triangle.

**B. Approach**: Apply Pythagoras theorem. If the original position has the lily at height H and the bank is at distance D, the depth is (D² - H²) / (2H).

**C. Complexity**: O(1)

```python
h, d = map(float, input().split())
depth = (d * d - h * h) / (2 * h)
print(f"{depth:.9f}")
```

---

### Problem 2: Circle Lattice Points (AtCoder ABC 191 D)

**A. Intuition**: Count integer (x, y) points such that (x - cx)² + (y - cy)² ≤ r². The problem is that cx, cy, r are given as decimal numbers (possibly with 4 decimal places).

**B. Approach**: Multiply by 10000 to convert to integers, then iterate x over the bounding box and for each x compute the max y using sqrt.

**C. Complexity**: O(R) where R is the radius in integer units

**D. Edge Cases**: Very large radius, precision issues with floating point, coordinates on exact boundary

```python
import math

cx, cy, r = map(float, input().split())
# Scale by 10000 to handle 4 decimal places
SCALE = 10000
cx = round(cx * SCALE)
cy = round(cy * SCALE)
r = round(r * SCALE)

x_min = (cx - r + SCALE - 1) // SCALE * SCALE  # ceil division
x_max = (cx + r) // SCALE * SCALE

ans = 0
for x in range(x_min, x_max + 1, SCALE):
    dx = x - cx
    dy_sq = r * r - dx * dx
    if dy_sq < 0:
        continue
    max_dy = int(math.isqrt(dy_sq))
    y_low = (cy - max_dy + SCALE - 1) // SCALE
    y_high = (cy + max_dy) // SCALE
    ans += y_high - y_low + 1

print(ans)
```

---

### Problem 3: Max Darts Inside Circular Dartboard (LeetCode 1453)

**A. Intuition**: For any optimal dartboard placement covering maximum points, we can shift it so that two points lie on its boundary. This reduces the problem to iterating over pairs.

**B. Approach**: For each pair of points within 2r of each other, compute the two possible centers, then count points within r of each center.

**C. Complexity**: O(N³)

**D. Edge Cases**: All points coincide, r is very small, single point

```python
def numPoints(points, r):
    def count_points(cx, cy):
        cnt = 0
        for px, py in points:
            if (px-cx)**2 + (py-cy)**2 <= r*r + 1e-9:
                cnt += 1
        return cnt
    
    ans = 1
    for i in range(len(points)):
        for j in range(i+1, len(points)):
            x1, y1 = points[i]
            x2, y2 = points[j]
            d_sq = (x2-x1)**2 + (y2-y1)**2
            if d_sq > 4*r*r: continue
            d = d_sq**0.5
            # midpoint
            mx, my = (x1+x2)/2, (y1+y2)/2
            # perpendicular distance from midpoint to center
            h = (r*r - d*d/4)**0.5
            # unit perpendicular vector
            dx, dy = (y2-y1)/d, -(x2-x1)/d
            for sign in [1, -1]:
                cx = mx + sign * h * dx
                cy = my + sign * h * dy
                ans = max(ans, count_points(cx, cy))
    return ans
```

---

# Chapter 7: Coordinate Geometry

## 1. INTRODUCTION

**Coordinate geometry** (also called analytic geometry) is the study of geometry using a coordinate system. It bridges algebra and geometry — every geometric shape corresponds to an equation, and every equation corresponds to a geometric shape.

### Real-World Intuition

GPS coordinates define positions on Earth. Every location has a latitude and longitude — a pair of numbers. When you look up "restaurants near me", you are solving a coordinate geometry problem: which points are within a certain distance of my current point?

### Why It Matters

Coordinate geometry is the foundation of almost all computational geometry:
- **Position and distance**: compute distances, find nearest neighbors
- **Grid navigation**: robot movement, pathfinding in 2D
- **Point sets**: clustering, collinearity, convex hulls
- **Coordinate transformations**: rotation, translation, scaling
- **Two-pointer technique**: many problems use coordinate-like reasoning on sorted arrays

---

## 2. CORE CONCEPTS

### 2.1 The Coordinate Plane

The Cartesian coordinate system uses two perpendicular axes (x and y) to define any point in the plane as an ordered pair (x, y).

```
Quadrants:
  Q2 (-x, +y)  |  Q1 (+x, +y)
  --------------+--------------
  Q3 (-x, -y)  |  Q4 (+x, -y)
```

### 2.2 Distance Formulas

**Euclidean distance** (straight-line):
```
d = sqrt((x2 - x1)² + (y2 - y1)²)
```

**Manhattan distance** (grid movement, no diagonals):
```
d = |x2 - x1| + |y2 - y1|
```

**Chebyshev distance** (king moves in chess):
```
d = max(|x2 - x1|, |y2 - y1|)
```

### 2.3 Midpoint Formula

```
Midpoint = ((x1 + x2)/2, (y1 + y2)/2)
```

### 2.4 Section Formula

A point P dividing AB in ratio m:n:
```
Px = (m*x2 + n*x1) / (m + n)
Py = (m*y2 + n*y1) / (m + n)
```

### 2.5 Coordinate Transformations

**Translation**: shift by (dx, dy)
```
x' = x + dx
y' = y + dy
```

**Rotation** about origin by angle θ:
```
x' = x*cos(θ) - y*sin(θ)
y' = x*sin(θ) + y*cos(θ)
```

**Reflection** across x-axis:
```
x' = x,  y' = -y
```

### 2.6 Collinearity

Three points A, B, C are collinear (lie on the same line) if:
```
Area of triangle ABC = 0
→ x1(y2 - y3) + x2(y3 - y1) + x3(y1 - y2) = 0
```
Or equivalently: slope(AB) = slope(BC).

### 2.7 Lattice Points

Points with integer coordinates are called **lattice points**. The number of lattice points on the line segment between (x1, y1) and (x2, y2), inclusive, is:

```
gcd(|x2 - x1|, |y2 - y1|) + 1
```

---

## 3. PROBLEM RECOGNITION

| Keyword | Problem Type |
|---------|-------------|
| "distance between" | Euclidean/Manhattan distance |
| "nearest / closest" | Nearest neighbor search |
| "collinear" | Slope/cross product check |
| "coordinate / point" | General coordinate geometry |
| "rotation" | Coordinate transformation |
| "midpoint" | Midpoint formula |
| "quadrant" | Coordinate sign classification |
| "manhattan / taxi" | Manhattan distance |
| "reflection / mirror" | Point reflection/transformation |
| "lattice" | Integer coordinate points |
| "points on the same line" | Collinearity |
| "point in polygon" | Ray casting / winding number |

### Hidden Coordinate Problems

- "Best meeting point" → Manhattan median
- "Minimum time to visit all points" → Chebyshev distance
- "Count pairs with distance k" → Coordinate hashing
- "K closest points to origin" → Euclidean distance sorting

---

## 4. PATTERN ANALYSIS

### Pattern 1: Distance-Based Problems

**When to use**: Problems asking "find nearest/farthest/min-distance/max-distance"
**Why it works**: Distance formulas convert geometric positions to comparable values
**Complexity**: O(N) to O(N²) depending on precision needed
**Variants**: Euclidean, Manhattan, Chebyshev, Minkowski

### Pattern 2: Slope-Based Counting (Collinearity)

**When to use**: "Maximum points on a line", "count triangles"
**Why it works**: Represent lines by their slope (as reduced fraction to avoid floating point)
**Complexity**: O(N²) or O(N² log N)
**Key insight**: Use `(dy/g, dx/g)` representation via gcd to handle vertical lines

### Pattern 3: Manhattan Median

**When to use**: "Minimum sum of distances to a point" (meeting point)
**Why it works**: Manhattan distance separates into independent x and y problems
**Complexity**: O(N log N) after sorting
**Key insight**: The median minimizes sum of absolute deviations

### Pattern 4: Coordinate Compression

**When to use**: Sparse coordinates with large range, sweep line algorithms
**Why it works**: Map large coordinate values to dense indices (0, 1, 2, ...)
**Complexity**: O(N log N) for sorting and mapping

### Pattern 5: BFS/DFS on Coordinate Grid

**When to use**: Movement on a grid with obstacles
**Why it works**: Each cell is a coordinate; movement = transition to adjacent coordinates
**Complexity**: O(N × M)
**Distance trick**: For unweighted grid, BFS gives shortest path in Manhattan steps

---

## 5. REUSABLE CODING TEMPLATES

### 5.1 Euclidean Distance

```python
def euclidean(p, q):
    return math.hypot(p[0] - q[0], p[1] - q[1])

def euclidean_sq(p, q):
    dx, dy = p[0] - q[0], p[1] - q[1]
    return dx * dx + dy * dy
```

```cpp
double dist(pair<int,int> p, pair<int,int> q) {
    return hypot(p.first - q.first, p.second - q.second);
}
long long dist_sq(pair<int,int> p, pair<int,int> q) {
    long long dx = p.first - q.first, dy = p.second - q.second;
    return dx * dx + dy * dy;
}
```

### 5.2 Collinearity Check

```python
def collinear(a, b, c):
    # Returns True if a, b, c lie on same line
    return a[0]*(b[1]-c[1]) + b[0]*(c[1]-a[1]) + c[0]*(a[1]-b[1]) == 0
```

### 5.3 Slope as Reduced Fraction

```python
from math import gcd

def slope_key(p, q):
    dx = q[0] - p[0]
    dy = q[1] - p[1]
    if dx == 0:
        return (0, 1)  # vertical line
    if dy == 0:
        return (1, 0)  # horizontal line
    g = gcd(dx, dy)
    dx //= g
    dy //= g
    # Ensure consistent sign
    if dx < 0:
        dx, dy = -dx, -dy
    return (dx, dy)
```

### 5.4 Max Points on a Line

```python
def max_points(points):
    if len(points) < 2: return len(points)
    max_count = 0
    for i in range(len(points)):
        slopes = {}
        same = 1
        for j in range(len(points)):
            if i == j: continue
            if points[i] == points[j]:
                same += 1
                continue
            key = slope_key(points[i], points[j])
            slopes[key] = slopes.get(key, 0) + 1
        max_count = max(max_count, same + max(slopes.values(), default=0))
    return max_count
```

### 5.5 Manhattan Distance and Min Meeting Point

```python
def min_meeting_point(points):
    # Minimum sum of Manhattan distances to a single point
    xs = sorted(p[0] for p in points)
    ys = sorted(p[1] for p in points)
    n = len(xs)
    median_x = xs[n // 2]
    median_y = ys[n // 2]
    return sum(abs(x - median_x) + abs(y - median_y) for x, y in points)
```

### 5.6 Coordinate Compression

```python
def compress(coords):
    sorted_vals = sorted(set(coords))
    return {v: i for i, v in enumerate(sorted_vals)}
```

---

## 6. CURATED REAL PROBLEMS

| # | Problem | Platform | Difficulty | Concepts | Pattern |
|---|---------|----------|-----------|---------|---------|
| 1 | Find the Point | HackerRank | Easy | Point reflection | Coordinate transform |
| 2 | Quadrant Selection | Kattis | Easy | Quadrant classification | Sign analysis |
| 3 | Min Time Visiting All Points | LeetCode (Easy) | Easy | Chebyshev distance | Max of dx, dy |
| 4 | K Closest Points to Origin | LeetCode (Medium) | Medium | Euclidean distance | Sorting / heap |
| 5 | Max Points on a Line | LeetCode (Hard) | Hard | Collinearity | Slope hashing |
| 6 | Best Meeting Point | LeetCode (Hard) | Hard | Manhattan median | Median optimization |
| 7 | Closest Pair of Points | GFG / SPOJ | Hard | Divide and conquer | Strip method |
| 8 | Min Cost to Connect All Points | LeetCode (Medium) | Medium | MST on points | Prim's / Kruskal's |
| 9 | Container With Most Water | LeetCode (Medium) | Medium | Two-pointer | Area = width × height |
| 10 | Point in Polygon | CSES | Medium | Ray casting | Winding number |
| 11 | Polygon Lattice Points | CSES (Pick's theorem) | Medium | Lattice counting | Pick's + GCD |
| 12 | Max Points You Can See | LeetCode (Hard) | Hard | Angular sweep | Polar coordinate |

---

## 7. GENERATED PRACTICE PROBLEMS

### Easy — Quadrant Finder
Given N points, count how many lie in each quadrant (points on axes count as 0).

### Easy — Closest Point
Given a target point (tx, ty) and N other points, find the index of the closest point (by Euclidean distance).

### Medium — Minimum Manhattan Spanning Tree
Given N points with Manhattan distances, find the total weight of the MST connecting all points.

### Medium — Symmetric Points
Given N points on a 2D plane, determine if there exists a vertical line x = k such that reflecting every point across this line yields the same set of points.

### Hard — Counting Rectangles from Points
Given N distinct points in the plane, count the number of axis-aligned rectangles that can be formed using these points as corners.

### Hard — Maximum Points You Can Destroy
Given N points and a laser that can destroy all points along a line, find the maximum points destroyable with one shot.

### Interview — Nearest Restaurant
Given N restaurants with coordinates (xᵢ, yᵢ), answer Q queries: "Which restaurant is closest to (qx, qy)?" with N, Q up to 10⁵.

---

## 8. COMPLETE SOLUTION SECTION

### Problem 1: K Closest Points to Origin (LeetCode 973)

**A. Intuition**: Distance from origin is sqrt(x² + y²). Since sqrt is monotonic, we can compare using squared distance.

**B. Approaches**:
1. Sort all points by squared distance: O(N log N)
2. Quickselect (partition): O(N) average
3. Max-heap of size K: O(N log K)

**C. Step-by-Step (Heap)**:
1. Build a max-heap of size K containing (distance², point)
2. For each point, if heap size < K, push. Else if distance² < heap's max, pop and push.
3. Extract all points from heap

**D. Complexity**: O(N log K) time, O(K) space

```python
def kClosest(points, k):
    heap = []
    for x, y in points:
        d = x*x + y*y
        if len(heap) < k:
            heapq.heappush(heap, (-d, x, y))
        elif d < -heap[0][0]:
            heapq.heappushpop(heap, (-d, x, y))
    return [[x, y] for _, x, y in heap]
```

```cpp
vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
    priority_queue<pair<int, vector<int>>> pq;
    for (auto& p : points) {
        int d = p[0]*p[0] + p[1]*p[1];
        pq.push({d, p});
        if (pq.size() > k) pq.pop();
    }
    vector<vector<int>> ans;
    while (!pq.empty()) {
        ans.push_back(pq.top().second);
        pq.pop();
    }
    return ans;
}
```

```java
public int[][] kClosest(int[][] points, int k) {
    PriorityQueue<int[]> pq = new PriorityQueue<>(
        (a,b) -> Integer.compare(b[0]*b[0]+b[1]*b[1], a[0]*a[0]+a[1]*a[1])
    );
    for (int[] p : points) {
        pq.offer(p);
        if (pq.size() > k) pq.poll();
    }
    int[][] ans = new int[k][2];
    for (int i = 0; i < k; i++) ans[i] = pq.poll();
    return ans;
}
```

---

### Problem 2: Best Meeting Point (LeetCode 296)

**A. Intuition**: Manhattan distance is separable: total distance = sum of |x - x_median| + sum of |y - y_median|. The median minimizes sum of absolute deviations.

**B. Brute Force**: Try every point in the grid → O(N × M × K). Inefficient.

**C. Optimized**: Sort x-coordinates and y-coordinates independently, pick medians.

**D. Complexity**: O(N log N) for sorting

```python
def minTotalDistance(grid):
    rows, cols = [], []
    for i in range(len(grid)):
        for j in range(len(grid[0])):
            if grid[i][j] == 1:
                rows.append(i)
                cols.append(j)
    cols.sort()
    mx, my = rows[len(rows)//2], cols[len(cols)//2]
    return sum(abs(r - mx) for r in rows) + sum(abs(c - my) for c in cols)
```

---

### Problem 3: Closest Pair of Points (Divide & Conquer)

**A. Intuition**: Recursively divide points by x-coordinate, find min distance in left and right halves, then check a narrow strip around the dividing line for cross-pairs closer than the current min.

**B. Algorithm**:
1. Sort by x-coordinate
2. Divide into left and right halves (by median x)
3. Recursively find d_left and d_right
4. d = min(d_left, d_right)
5. Build strip of points within d of the dividing line, sorted by y
6. For each point in strip, compare with at most 6 next points

**C. Complexity**: O(N log N)

**D. Key Insight**: Only 6 points need to be checked per point in the strip — the d × 2d rectangle can contain at most 6 points with mutual distance ≥ d.

```python
def closest_pair(points):
    def dist(p, q):
        return math.hypot(p[0]-q[0], p[1]-q[1])
    
    def solve(px, py):
        if len(px) <= 3:
            return min(dist(px[i], px[j]) for i in range(len(px)) for j in range(i+1, len(px)))
        
        mid = len(px) // 2
        mid_x = px[mid][0]
        
        lx = px[:mid]
        rx = px[mid:]
        ly = [p for p in py if p[0] <= mid_x]
        ry = [p for p in py if p[0] > mid_x]
        
        d = min(solve(lx, ly), solve(rx, ry))
        
        strip = [p for p in py if abs(p[0] - mid_x) < d]
        for i in range(len(strip)):
            for j in range(i+1, min(i+7, len(strip))):
                d = min(d, dist(strip[i], strip[j]))
        return d
    
    px = sorted(points)
    py = sorted(points, key=lambda p: (p[1], p[0]))
    return solve(px, py)
```

---

# Chapter 8: Lines and Slopes

## 1. INTRODUCTION

A **line** in a 2D plane is the set of points (x, y) satisfying a linear equation. The **slope** of a line measures its steepness. Lines and slopes are the most basic building blocks of geometry, yet they power everything from collision detection to machine learning (linear regression).

### Real-World Intuition

Think of a ramp: the slope tells you how steep it is. A line represents a straight path — the shortest distance between two points. In computer graphics, lines define edges of shapes. In physics, they represent trajectories.

### Why It Matters

Lines and slopes teach you:
- **Linear equations**: the mathematical backbone of geometry
- **Intersection**: where two paths cross
- **Orientation**: clockwise vs counter-clockwise ordering
- **Sweep line algorithm**: processing events in order of x-coordinate
- **Convex hull**: all points are to one side of each edge line

---

## 2. CORE CONCEPTS

### 2.1 Line Equations

**Slope-Intercept Form**:
```
y = mx + b
m = slope = Δy / Δx = (y2 - y1) / (x2 - x1)
b = y-intercept
```

**General Form** (no division, handles vertical lines):
```
Ax + By + C = 0

Given two points (x1,y1), (x2,y2):
A = y1 - y2
B = x2 - x1
C = x1*y2 - x2*y1
```

**Two-Point Form**:
```
(y - y1) / (x - x1) = (y2 - y1) / (x2 - x1)
```

### 2.2 Slope

```
m = (y2 - y1) / (x2 - x1)
```

- m > 0: line rises (increasing)
- m < 0: line falls (decreasing)
- m = 0: horizontal line (y = constant)
- m = ∞ (undefined): vertical line (x = constant)

**Storing slopes in code**: Use reduced fraction `(dy/g, dx/g)` to avoid floating point.

### 2.3 Parallel and Perpendicular Lines

**Parallel**: same slope (m₁ = m₂)
**Perpendicular**: product of slopes = -1 (m₁ × m₂ = -1) or A₁A₂ + B₁B₂ = 0

### 2.4 Line-Line Intersection

Two lines A₁x + B₁y + C₁ = 0 and A₂x + B₂y + C₂ = 0 intersect at:

```
denom = A₁*B₂ - A₂*B₁
if denom == 0: lines are parallel (or coincident)

x = (B₁*C₂ - B₂*C₁) / denom
y = (C₁*A₂ - C₂*A₁) / denom
```

### 2.5 Line Segment Intersection

Two line segments AB and CD intersect if and only if:
1. The orientations of (A, B, C) and (A, B, D) are different, AND
2. The orientations of (C, D, A) and (C, D, B) are different

**Special case**: Collinear overlapping segments (orientation = 0 for all four).

### 2.6 Orientation Test (Cross Product)

Given three points A(ax, ay), B(bx, by), C(cx, cy):

```
cross = (bx - ax)(cy - ay) - (by - ay)(cx - ax)
```

- cross > 0: counter-clockwise turn (A → B → C)
- cross < 0: clockwise turn
- cross = 0: collinear

This is the single most important operation in computational geometry.

### 2.7 Distance from Point to Line

```
distance = |Ax₀ + By₀ + C| / sqrt(A² + B²)
```

Where (x₀, y₀) is the point and Ax + By + C = 0 is the line.

### 2.8 Sweep Line Algorithm

A technique where a vertical line sweeps from left to right across the plane, processing events at each x-coordinate. Used for:
- Counting intersections between line segments
- Computing union area of rectangles
- Skyline problems
- Finding closest pair of points

---

## 3. PROBLEM RECOGNITION

| Keyword | Problem Type |
|---------|-------------|
| "slope" | Slope computation, collinearity |
| "line through points" | Line equation from two points |
| "intersection / crossing" | Line or segment intersection |
| "perpendicular / parallel" | Line relationships |
| "collinear" | Same line check |
| "sweep line" | Event-based processing |
| "skyline" | Building outlines via sweep |
| "line of sight" | Ray casting / geometry |
| "segment" | Line segment operations |
| "polyline" | Sequence of connected segments |

### Hidden Line Problems

- "Uncrossed lines" → DP (LCS variant)
- "Number of lines in chart" → Slope changes
- "Maximal intersection" → Interval intersection on a line
- "Reflection" → Line as mirror
- "Linear regression" → Best-fit line

---

## 4. PATTERN ANALYSIS

### Pattern 1: Orientation (Cross Product)

**When to use**: Any problem asking about turn direction, intersection, or collinearity
**Why it works**: The cross product sign tells you orientation without computing angles
**Complexity**: O(1)
**Key insight**: Once you know the cross product, you can solve intersection, convex hull, point in polygon

### Pattern 2: Slope Hashing

**When to use**: Counting maximum collinear points, counting parallel lines
**Why it works**: Use reduced fraction (dy/g, dx/g) as dictionary key
**Complexity**: O(N²)
**Key insight**: Always normalize by gcd and handle vertical/horizontal separately

### Pattern 3: Sweep Line

**When to use**: Interval overlapping, skyline, counting intersections
**Why it works**: Sort events by x, maintain active set as line sweeps right
**Complexity**: O(N log N)
**Common data structures**: Segment tree, Fenwick tree, priority queue

### Pattern 4: Line Segment Intersection (via Orientation)

**When to use**: Checking if two segments cross
**Why it works**: The orientation test gives all the information needed
**Complexity**: O(1) per pair
**Edge cases**: Collinear overlapping, touching at endpoints

### Pattern 5: Li Chao Segment Tree

**When to use**: Dynamic line insertion, query max/min at a given x
**Why it works**: Each node stores a line; compare at midpoint to decide which dominates
**Complexity**: O(log C) per query/insert where C is coordinate range

---

## 5. REUSABLE CODING TEMPLATES

### 5.1 Orientation (Cross Product)

```python
def orientation(a, b, c):
    # Returns: 1 = CW, -1 = CCW, 0 = collinear
    cross = (b[0]-a[0])*(c[1]-a[1]) - (b[1]-a[1])*(c[0]-a[0])
    if cross > 0: return 1   # clockwise
    if cross < 0: return -1  # counter-clockwise
    return 0                  # collinear
```

```cpp
int orientation(pair<int,int> a, pair<int,int> b, pair<int,int> c) {
    long long cross = (b.first - a.first) * (c.second - a.second)
                    - (b.second - a.second) * (c.first - a.first);
    if (cross > 0) return 1;   // CW
    if (cross < 0) return -1;  // CCW
    return 0;                   // collinear
}
```

```java
int orientation(int[] a, int[] b, int[] c) {
    long cross = (long)(b[0]-a[0]) * (c[1]-a[1]) - (long)(b[1]-a[1]) * (c[0]-a[0]);
    if (cross > 0) return 1;
    if (cross < 0) return -1;
    return 0;
}
```

### 5.2 Line Segment Intersection

```python
def on_segment(a, b, c):
    # Check if c lies on segment ab (assumes collinear)
    return (min(a[0], b[0]) <= c[0] <= max(a[0], b[0]) and
            min(a[1], b[1]) <= c[1] <= max(a[1], b[1]))

def segments_intersect(p1, p2, p3, p4):
    o1 = orientation(p1, p2, p3)
    o2 = orientation(p1, p2, p4)
    o3 = orientation(p3, p4, p1)
    o4 = orientation(p3, p4, p2)
    
    # General case: different orientations
    if o1 != o2 and o3 != o4:
        return True
    # Special collinear cases
    if o1 == 0 and on_segment(p1, p2, p3): return True
    if o2 == 0 and on_segment(p1, p2, p4): return True
    if o3 == 0 and on_segment(p3, p4, p1): return True
    if o4 == 0 and on_segment(p3, p4, p2): return True
    return False
```

### 5.3 Line from Two Points (General Form)

```python
def line_from_points(p1, p2):
    # Returns (A, B, C) for Ax + By + C = 0
    A = p1[1] - p2[1]
    B = p2[0] - p1[0]
    C = p1[0]*p2[1] - p2[0]*p1[1]
    return (A, B, C)
```

### 5.4 Line-Line Intersection

```python
def line_intersection(l1, l2):
    # l = (A, B, C) for Ax + By + C = 0
    A1, B1, C1 = l1
    A2, B2, C2 = l2
    denom = A1*B2 - A2*B1
    if abs(denom) < 1e-12:
        return None  # parallel or coincident
    x = (B1*C2 - B2*C1) / denom
    y = (C1*A2 - C2*A1) / denom
    return (x, y)
```

### 5.5 Point-to-Line Distance

```python
def point_line_distance(px, py, line):
    # line = (A, B, C)
    A, B, C = line
    return abs(A*px + B*py + C) / math.sqrt(A*A + B*B)
```

### 5.6 Li Chao Segment Tree (Line Container)

```python
class LiChaoTree:
    def __init__(self, xs):
        # xs: sorted list of x-coordinates where we query
        self.xs = xs
        n = len(xs)
        size = 1
        while size < n: size <<= 1
        self.size = size
        self.lines = [(0, -float('inf'))] * (2 * size)  # (m, b)
    
    def f(self, line, x):
        m, b = line
        return m * x + b
    
    def add_line(self, new_line, node=1, l=0, r=None):
        if r is None: r = self.size - 1
        m = (l + r) // 2
        x_mid = self.xs[m] if m < len(self.xs) else self.xs[-1]
        x_l = self.xs[l] if l < len(self.xs) else self.xs[-1]
        
        left = self.f(new_line, x_l) > self.f(self.lines[node], x_l)
        mid = self.f(new_line, x_mid) > self.f(self.lines[node], x_mid)
        
        if mid:
            self.lines[node], new_line = new_line, self.lines[node]
        
        if l == r: return
        if left != mid:
            self.add_line(new_line, node*2, l, m)
        else:
            self.add_line(new_line, node*2+1, m+1, r)
    
    def query(self, idx):
        # idx: index into self.xs
        x = self.xs[idx]
        node = 1
        l, r = 0, self.size - 1
        ans = -float('inf')
        while True:
            ans = max(ans, self.f(self.lines[node], x))
            if l == r: break
            m = (l + r) // 2
            if idx <= m:
                node = node * 2
                r = m
            else:
                node = node * 2 + 1
                l = m + 1
        return ans
```

---

## 6. CURATED REAL PROBLEMS

| # | Problem | Platform | Difficulty | Concepts | Pattern |
|---|---------|----------|-----------|---------|---------|
| 1 | Check If It Is a Straight Line | LeetCode (Easy) | Easy | Collinearity | Orientation check |
| 2 | Parallelogram is Back | Codeforces (1200) | Easy | Lines from points | Coordinate geometry |
| 3 | B. Gentle Pairs | AtCoder (Easy) | Easy | Slope counting | Slope filtering |
| 4 | Anton and Lines | Codeforces (1600) | Medium | Line intersection | Sweep / Sort |
| 5 | Maximal Intersection | Codeforces (1600) | Medium | Interval intersection | Greedy / line |
| 6 | Number of Parallelograms | Codeforces (1900) | Medium | Midpoint matching | Slope/hash grouping |
| 7 | Pair Of Lines | Codeforces (2000) | Hard | Multiple lines collinear | Slope hashing |
| 8 | Check Intersection of Segments | GFG | Medium | Line segment intersect | Orientation |
| 9 | Minimum Lines to Represent Line Chart | LeetCode (Medium) | Medium | Slope tracking | Slope change detection |
| 10 | The Skyline Problem | LeetCode (Hard) | Hard | Sweep line | Event priority queue |
| 11 | Line Intersection (Baekjoon 17387) | Baekjoon (Gold 1) | Hard | Segment intersection | Orientation + collinear |
| 12 | Max Number of Intersections | LeetCode (Hard) | Hard | Sweep line + BIT | Line interval counting |

---

## 7. GENERATED PRACTICE PROBLEMS

### Easy — Is This a Straight Line?
Given N points, determine if all points lie on a single straight line.

### Easy — Slope Between Points
Given N points, count how many pairs form a line with positive slope.

### Medium — Line That Covers Most Points
Given N points, find the line that passes through the maximum number of points. Return the count.

### Medium — Segment Intersection Counter
Given N line segments, count how many pairs intersect (including at endpoints).

### Hard — City Skyline
Given the positions and heights of N buildings, compute the skyline outline as a list of (x, height) switches.

### Hard — Maximum Non-Intersecting Lines
Given N lines of the form y = mᵢx + bᵢ, select the maximum subset such that no two lines intersect within the range x ∈ [0, X].

### Interview — Laser Beam
Given N points, a laser starts at (0, 0) and travels in a straight line. Find the first point it hits. The laser direction is given by an angle θ.

---

## 8. COMPLETE SOLUTION SECTION

### Problem 1: Check If It Is a Straight Line (LeetCode 1232)

**A. Intuition**: All points lie on the same line if the slope between every consecutive point is the same. Use cross product to avoid division.

**B. Approach**: Check that the cross product (determinant) of vectors from point 0 to every other pair is zero.

**C. Complexity**: O(N) time, O(1) space

```python
def checkStraightLine(coordinates):
    x0, y0 = coordinates[0]
    x1, y1 = coordinates[1]
    for x, y in coordinates[2:]:
        if (x1 - x0) * (y - y0) != (y1 - y0) * (x - x0):
            return False
    return True
```

```cpp
bool checkStraightLine(vector<vector<int>>& coord) {
    int x0 = coord[0][0], y0 = coord[0][1];
    int x1 = coord[1][0], y1 = coord[1][1];
    for (int i = 2; i < coord.size(); i++) {
        int x = coord[i][0], y = coord[i][1];
        if ((x1 - x0) * (y - y0) != (y1 - y0) * (x - x0))
            return false;
    }
    return true;
}
```

```java
public boolean checkStraightLine(int[][] coord) {
    int x0 = coord[0][0], y0 = coord[0][1];
    int x1 = coord[1][0], y1 = coord[1][1];
    for (int i = 2; i < coord.length; i++) {
        int x = coord[i][0], y = coord[i][1];
        if ((x1 - x0) * (y - y0) != (y1 - y0) * (x - x0))
            return false;
    }
    return true;
}
```

---

### Problem 2: Line Segment Intersection (Baekjoon 17387)

**A. Intuition**: Two segments AB and CD intersect if the endpoints of each are on opposite sides of the other segment, OR if all four are collinear and the segments overlap.

**B. Approach**: Use the orientation function for both checks.

**C. Complexity**: O(1)

**D. Edge Cases**: One endpoint touches the other segment; collinear overlapping; collinear non-overlapping

```python
def intersect(p1, p2, p3, p4):
    o1 = orientation(p1, p2, p3)
    o2 = orientation(p1, p2, p4)
    o3 = orientation(p3, p4, p1)
    o4 = orientation(p3, p4, p2)
    
    if o1 != o2 and o3 != o4:
        return True
    if o1 == 0 and on_segment(p1, p2, p3): return True
    if o2 == 0 and on_segment(p1, p2, p4): return True
    if o3 == 0 and on_segment(p3, p4, p1): return True
    if o4 == 0 and on_segment(p3, p4, p2): return True
    return False
```

---

### Problem 3: The Skyline Problem (LeetCode 218)

**A. Intuition**: As our sweep line moves right, we want to know the current tallest building at any x. When the tallest building ends, we need the next tallest.

**B. Approach**:
1. Create events: (x, -height) for start, (x, height) for end
2. Sort by x (start before end at same x)
3. Maintain a max-heap of heights
4. When max height changes, record that x and the new height

**C. Complexity**: O(N log N)

```python
def getSkyline(buildings):
    events = []
    for l, r, h in buildings:
        events.append((l, -h, r))  # start
        events.append((r, 0, None)) # end marker
    
    events.sort()
    heap = [(0, float('inf'))]  # (height, right_end)
    result = [[0, 0]]
    
    for x, neg_h, r in events:
        if neg_h != 0:
            heapq.heappush(heap, (neg_h, r))
        
        # Remove expired buildings
        while heap and heap[0][1] <= x:
            heapq.heappop(heap)
        
        cur_h = -heap[0][0]
        if result[-1][1] != cur_h:
            if result[-1][0] == x:
                result[-1][1] = cur_h
            else:
                result.append([x, cur_h])
    
    return result[1:]  # remove the dummy start
```

---

### Problem 4: Minimum Lines to Represent a Line Chart (LeetCode 2280)

**A. Intuition**: A line segment is needed when the slope between consecutive points changes. Track the slope as a reduced fraction (dy, dx).

**B. Complexity**: O(N log N) for sorting, O(N) for slope comparison

```python
def minimumLines(points):
    points.sort()
    if len(points) < 2: return 0
    lines = 1
    dx, dy = points[1][0] - points[0][0], points[1][1] - points[0][1]
    g = math.gcd(dx, dy)
    prev = (dx // g, dy // g)
    
    for i in range(2, len(points)):
        dx = points[i][0] - points[i-1][0]
        dy = points[i][1] - points[i-1][1]
        g = math.gcd(dx, dy)
        cur = (dx // g, dy // g)
        if cur != prev:
            lines += 1
            prev = cur
    return lines
```

---

### Problem 5: Number of Parallelograms (Codeforces 660D)

**A. Intuition**: In a parallelogram, the diagonals bisect each other. Therefore, the midpoints of the two diagonals coincide. For any pair of points, compute their midpoint; for each distinct midpoint, k pairs form kC2 parallelograms.

**B. Complexity**: O(N²)

```python
def count_parallelograms(points):
    mid_counts = {}
    n = len(points)
    for i in range(n):
        for j in range(i+1, n):
            mx = points[i][0] + points[j][0]  # store 2x to avoid fractions
            my = points[i][1] + points[j][1]
            mid_counts[(mx, my)] = mid_counts.get((mx, my), 0) + 1
    
    ans = 0
    for k in mid_counts.values():
        ans += k * (k - 1) // 2
    return ans
```

---

### Problem 6: Pair Of Lines (Codeforces 961D)

**A. Intuition**: You need at most 2 lines to cover all N points. There are at most N² possible lines. If a pair of lines exists, then among the first 3 points, at least 2 must lie on one of the lines.

**B. Approach**:
1. Consider the line through points 0 and 1. Remove all points on this line. Check if remaining points are collinear.
2. Same for line through points 0 and 2.
3. Same for line through points 1 and 2.
4. If any succeeds, answer is YES.

**C. Complexity**: O(N)

```python
def check_line(points, a, b):
    line_points = []
    for p in points:
        if orientation(points[a], points[b], p) != 0:
            line_points.append(p)
    return len(line_points) <= 2 or all(
        orientation(line_points[0], line_points[1], p) == 0
        for p in line_points[2:]
    )

def two_lines(points):
    n = len(points)
    if n <= 4: return True
    return (check_line(points, 0, 1) or
            check_line(points, 0, 2) or
            check_line(points, 1, 2))
```
