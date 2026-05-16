# Geometry and Shape Problems in Data Structures and Algorithms

## Chapter 9: Distance and Midpoint

### 1. INTRODUCTION

Imagine you are standing at one corner of a city block and your friend is at another corner. The most natural question is: how far apart are you? In the flat world of 2D coordinate geometry, "distance" is the answer to that question, and it comes in several flavors depending on how you measure it.

If you could fly in a straight line (as a crow does), you'd measure **Euclidean distance**. If you had to walk along the grid-like city streets (like a taxicab), you'd measure **Manhattan distance**. If you only cared about the farthest coordinate difference (like a king on a chessboard), you'd measure **Chebyshev distance**. And if you wanted the exact middle point between you and your friend, you'd compute the **midpoint**.

These concepts are the building blocks of computational geometry. Every GPS navigation system, every robot path planner, every collision detection engine in video games uses these distance calculations thousands of times per second. In competitive programming and technical interviews, distance problems are among the most frequently tested topics because they combine mathematical thinking with clean coding patterns.

This chapter will teach you everything from "what is a coordinate?" to advanced distance optimization techniques like Chebyshev transformation and Manhattan distance reduction.

### 2. CORE CONCEPTS

#### 2.1 Euclidean Distance

The straight-line distance between two points P1 = (x1, y1) and P2 = (x2, y2):

    d = sqrt((x2 - x1)^2 + (y2 - y1)^2)

This comes straight from the Pythagorean theorem. If you draw a right triangle between the two points, the horizontal leg is |x2 - x1| and the vertical leg is |y2 - y1|; the hypotenuse is the distance.

In 3D, add the z-dimension:

    d = sqrt((x2 - x1)^2 + (y2 - y1)^2 + (z2 - z1)^2)

**Geometric intuition:** Euclidean distance is rotation-invariant. If you spin the coordinate system, distances stay the same. This makes it the "natural" distance in physical space.

**Computational note:** In competitive programming, avoid floating point sqrt() when possible. Compare squared distances instead:

    d1 < d2  <=>  d1^2 < d2^2

#### 2.2 Manhattan Distance

Also called L1 distance, taxicab distance, or rectilinear distance:

    d = |x2 - x1| + |y2 - y1|

**Geometric intuition:** Imagine a taxicab driving through a city laid out in perfect grid blocks. The driver cannot go through buildings; they must travel along the streets (horizontal and vertical segments). The Manhattan distance is the total length of that path.

**Key insight:** Manhattan distance separates x and y contributions. This allows independent optimization of x and y dimensions, which is enormously powerful.

**Manhattan to Chebyshev transformation:**

    max(|x1 - x2|, |y1 - y2|)  (Chebyshev)
    
    Rotate coordinates by 45 degrees and scale:
    u = x + y, v = x - y
    
    Manhattan distance in (x, y) = Chebyshev distance in (u, v)
    i.e., |x1-x2| + |y1-y2| = max(|u1-u2|, |v1-v2|)

This transformation is one of the most powerful tricks in geometry problem-solving.

#### 2.3 Chebyshev Distance

Also called L-infinity distance or chessboard distance:

    d = max(|x2 - x1|, |y2 - y1|)

**Geometric intuition:** A king on a chessboard can move one square in any direction (horizontal, vertical, or diagonal). The Chebyshev distance is the minimum number of king moves needed to go from one square to another.

**Chebyshev to Manhattan transformation:**

    Given point (x, y), transform to (u, v) = ((x + y)/2, (x - y)/2)
    Chebyshev distance in (x, y) = Manhattan distance in (u, v)

This bidirectional relationship with Manhattan distance is the key to solving many grid-based problems.

#### 2.4 Midpoint

The point exactly halfway between two points:

    M = ((x1 + x2) / 2, (y1 + y2) / 2)

**Properties:**
- The midpoint is equidistant from both endpoints
- It lies on the line segment connecting the two points
- It is the center of mass (centroid) of the two-point system
- For a line segment, the midpoint divides it in ratio 1:1

#### 2.5 Distance from a Point to a Line

The perpendicular distance from point P = (x0, y0) to line Ax + By + C = 0:

    d = |A*x0 + B*y0 + C| / sqrt(A^2 + B^2)

**Intuition:** Drop a perpendicular from the point to the line. The length of that perpendicular segment is the shortest distance.

#### 2.6 Sum of Manhattan Distances

For a set of points, the sum of Manhattan distances to a central point is minimized at the **median** (not the mean):

    Sum = Σ|x_i - x_c| + Σ|y_i - y_c|
    
    Minimized when x_c = median(x_i) and y_c = median(y_i)

This is because the Manhattan distance separates x and y, and the sum of absolute deviations is minimized at the median.

#### 2.7 Sum of Squared Euclidean Distances

Minimized at the **mean** (centroid):

    Sum = Σ((x_i - x_c)^2 + (y_i - y_c)^2)
    
    Minimized when x_c = mean(x_i) and y_c = mean(y_i)

### 3. PROBLEM RECOGNITION

**Common keywords and phrases:**
- "Distance between" / "shortest distance"
- "Manhattan distance" / "taxicab geometry"
- "Euclidean distance" / "straight line distance"
- "Chebyshev distance" / "king's move"
- "Midpoint" / "halfway"
- "Minimum sum of distances" / "meeting point"
- "Farthest pair" / "closest pair"
- "Edit distance" / "Levenshtein distance" (string distance variant)
- "Hamming distance" (bit/string distance)
- "Tree distance" / "distance between nodes"

**Hidden geometry indicators:**
- Grid-based movement problems often imply Manhattan or Chebyshev distance
- "Minimize the maximum distance" suggests binary search on answer
- "Meeting point" / "optimal location" suggests median for Manhattan, mean for squared Euclidean
- Problems about time = distance / speed (where agents meet)
- Pathfinding in grids with 4-directional movement → Manhattan; 8-directional → Chebyshev

**How interviewers frame these problems:**
- "You are given N points on a 2D plane. Find the point that minimizes the sum of distances..."
- "Determine if three points are collinear" (uses slope/cross product, not distance, but often grouped)
- "What is the minimum distance you must travel to collect all items?"
- "Place a mailbox to minimize total distance for all residents."
- "Given two strings, find the minimum edit distance."

### 4. PATTERN ANALYSIS

#### Pattern 1: Manhattan Distance Separation

**When to use:** The objective function involves |x1-x2| + |y1-y2|.

**Why it works:** Manhattan distance separates into independent x and y components. Solve each dimension separately and combine.

**Complexity:** O(N log N) for median-based problems, O(N) for linear scanning.

**Common mistakes:** Forgetting that Manhattan distance minimization uses median, not mean. Using mean (average) for |x-a| + |y-b| type objectives.

#### Pattern 2: 45-Degree Rotation (Chebyshev ↔ Manhattan)

**When to use:** Problems involving max(|dx|, |dy|) or |dx| + |dy| that would benefit from the other form.

**Why it works:** Transforms Chebyshev distance into Manhattan or vice versa, opening up simpler solution paths.

**Transformation:** Let u = x + y, v = x - y. Then Manhattan(x,y) = Chebyshev(u,v).

**Common mistakes:** Forgetting to handle the 1/2 scaling factor correctly in the inverse transformation.

#### Pattern 3: Minimize Maximum Distance (Minimax)

**When to use:** "Minimize the maximum distance" or "find the smallest radius such that..."

**Why it works:** Binary search on the distance value D, then check if a feasible solution exists within that distance.

**Complexity:** O(log(range) * check_complexity).

**Common mistakes:** Not handling floating point precision correctly in Euclidean distance checks.

#### Pattern 4: Closest Pair of Points

**When to use:** Find the minimum distance between any two points in a set.

**Why it works:** Divide and conquer approach (split plane, solve recursively on left and right, check strip near dividing line). Also sweep-line approaches.

**Complexity:** O(N log N).

**Common mistakes:** Forgetting that the strip check must be done carefully; points within strip need to be sorted by y and checked only against a bounded number of neighbors.

#### Pattern 5: Tree Distance using LCA

**When to use:** "Distance between two nodes in a tree" or "sum of distances between all pairs."

**Why it works:** dist(u, v) = depth(u) + depth(v) - 2*depth(LCA(u, v)). Preprocess LCA with binary lifting or Euler tour + RMQ.

**Complexity:** O(N log N) preprocessing, O(log N) per query.

**Common mistakes:** Forgetting that the tree might not be rooted at node 0; always root at 0 or 1 explicitly.

### 5. REUSABLE CODING TEMPLATES

#### Euclidean Distance

```python
def euclidean_distance(p1, p2):
    return ((p1[0] - p2[0])**2 + (p1[1] - p2[1])**2) ** 0.5

def euclidean_distance_squared(p1, p2):
    return (p1[0] - p2[0])**2 + (p1[1] - p2[1])**2
```

```cpp
double euclidean_distance(pair<int,int> p1, pair<int,int> p2) {
    double dx = p1.first - p2.first;
    double dy = p1.second - p2.second;
    return sqrt(dx*dx + dy*dy);
}

long long euclidean_distance_squared(pair<int,int> p1, pair<int,int> p2) {
    long long dx = p1.first - p2.first;
    long long dy = p1.second - p2.second;
    return dx*dx + dy*dy;
}
```

```java
public static double euclideanDistance(int[] p1, int[] p2) {
    double dx = p1[0] - p2[0];
    double dy = p1[1] - p2[1];
    return Math.sqrt(dx*dx + dy*dy);
}

public static long euclideanDistanceSquared(int[] p1, int[] p2) {
    long dx = p1[0] - p2[0];
    long dy = p1[1] - p2[1];
    return dx*dx + dy*dy;
}
```

#### Manhattan Distance

```python
def manhattan_distance(p1, p2):
    return abs(p1[0] - p2[0]) + abs(p1[1] - p2[1])
```

```cpp
int manhattan_distance(pair<int,int> p1, pair<int,int> p2) {
    return abs(p1.first - p2.first) + abs(p1.second - p2.second);
}
```

```java
public static int manhattanDistance(int[] p1, int[] p2) {
    return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
}
```

#### Chebyshev Distance

```python
def chebyshev_distance(p1, p2):
    return max(abs(p1[0] - p2[0]), abs(p1[1] - p2[1]))
```

```cpp
int chebyshev_distance(pair<int,int> p1, pair<int,int> p2) {
    return max(abs(p1.first - p2.first), abs(p1.second - p2.second));
}
```

```java
public static int chebyshevDistance(int[] p1, int[] p2) {
    return Math.max(Math.abs(p1[0] - p2[0]), Math.abs(p1[1] - p2[1]));
}
```

#### Manhattan to Chebyshev / Chebyshev to Manhattan Transformation

```python
# Manhattan distance of (x1,y1) and (x2,y2) = Chebyshev distance of transformed points
def manhattan_to_chebyshev(x, y):
    return (x + y, x - y)

# Chebyshev distance of (x1,y1) and (x2,y2) = Manhattan distance of transformed points
# Note: this may produce non-integer coordinates for odd inputs
def chebyshev_to_manhattan(x, y):
    return ((x + y) // 2, (x - y) // 2)

# Usage: compute Manhattan distance as Chebyshev on transformed points
def manhattan_via_chebyshev(p1, p2):
    u1, v1 = manhattan_to_chebyshev(p1[0], p1[1])
    u2, v2 = manhattan_to_chebyshev(p2[0], p2[1])
    return max(abs(u1 - u2), abs(v1 - v2))
```

```cpp
pair<int,int> manhattan_to_chebyshev(int x, int y) {
    return {x + y, x - y};
}

// Manhattan dist via Chebyshev transform
int manhattan_dist_fast(pair<int,int> p1, pair<int,int> p2) {
    auto [u1, v1] = manhattan_to_chebyshev(p1.first, p1.second);
    auto [u2, v2] = manhattan_to_chebyshev(p2.first, p2.second);
    return max(abs(u1 - u2), abs(v1 - v2));
}
```

```java
public static long[] manhattanToChebyshev(long x, long y) {
    return new long[]{x + y, x - y};
}

public static long manhattanViaChebyshev(long[] p1, long[] p2) {
    long[] t1 = manhattanToChebyshev(p1[0], p1[1]);
    long[] t2 = manhattanToChebyshev(p2[0], p2[1]);
    return Math.max(Math.abs(t1[0] - t2[0]), Math.abs(t1[1] - t2[1]));
}
```

#### Midpoint

```python
def midpoint(p1, p2):
    return ((p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2)
```

```cpp
pair<double,double> midpoint(pair<int,int> p1, pair<int,int> p2) {
    return {(p1.first + p2.first) / 2.0, (p1.second + p2.second) / 2.0};
}
```

```java
public static double[] midpoint(int[] p1, int[] p2) {
    return new double[]{(p1[0] + p2[0]) / 2.0, (p1[1] + p2[1]) / 2.0};
}
```

#### Point-to-Line Distance

```python
# Line defined by two points p1, p2
def point_to_line_distance(p, p1, p2):
    x0, y0 = p
    x1, y1 = p1
    x2, y2 = p2
    # Area of parallelogram = |cross product|
    # Distance = area / base length
    area = abs((x2 - x1) * (y1 - y0) - (x1 - x0) * (y2 - y1))
    base = ((x2 - x1)**2 + (y2 - y1)**2) ** 0.5
    return area / base if base != 0 else ((x0 - x1)**2 + (y0 - y1)**2) ** 0.5
```

```cpp
double point_to_line_distance(pair<int,int> p, pair<int,int> p1, pair<int,int> p2) {
    double area = abs((p2.first - p1.first) * (p1.second - p.second) -
                      (p1.first - p.first) * (p2.second - p1.second));
    double base = sqrt(pow(p2.first - p1.first, 2) + pow(p2.second - p1.second, 2));
    if (base == 0) return sqrt(pow(p.first - p1.first, 2) + pow(p.second - p1.second, 2));
    return area / base;
}
```

```java
public static double pointToLineDistance(int[] p, int[] p1, int[] p2) {
    double area = Math.abs((p2[0] - p1[0]) * (p1[1] - p[1]) -
                           (p1[0] - p[0]) * (p2[1] - p1[1]));
    double base = Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2));
    if (base == 0) return Math.sqrt(Math.pow(p[0] - p1[0], 2) + Math.pow(p[1] - p1[1], 2));
    return area / base;
}
```

#### Power of 2D Prefix Sum for Sum of Manhattan Distances

```python
# Sum of Manhattan distances from a center point to all points in a grid
def sum_manhattan_to_center(grid):
    rows, cols = len(grid), len(grid[0])
    row_sum = [sum(row) for row in grid]
    col_sum = [sum(grid[r][c] for r in range(rows)) for c in range(cols)]
    
    # Find median row and col (weighted by values)
    total = sum(row_sum)
    running = 0
    med_row = 0
    for r in range(rows):
        running += row_sum[r]
        if running * 2 >= total:
            med_row = r
            break
    
    total = sum(col_sum)
    running = 0
    med_col = 0
    for c in range(cols):
        running += col_sum[c]
        if running * 2 >= total:
            med_col = c
            break
    
    # Sum distances = sum of row distances + sum of col distances (Manhattan separation property!)
    row_dist = sum(abs(r - med_row) * row_sum[r] for r in range(rows))
    col_dist = sum(abs(c - med_col) * col_sum[c] for c in range(cols))
    
    return row_dist + col_dist
```

### 6. CURATED REAL PROBLEMS

| # | Problem Name | Platform | Difficulty | Key Concept | Link |
|---|---|---|---|---|---|
| 1 | ABC 180 B - Various Distances | AtCoder | Easy (200) | Euclidean, Manhattan, Chebyshev | https://atcoder.jp/contests/abc180/tasks/abc180_b |
| 2 | 1612A - Distance | Codeforces | Easy (800) | Distance formula | https://codeforces.com/problemset/problem/1612/A |
| 3 | Matrix Cells in Distance Order | LeetCode | Easy | Manhattan distance sorting | https://leetcode.com/problems/matrix-cells-in-distance-order/ |
| 4 | ABC 186 D - Sum of Difference | AtCoder | Medium (600) | Sum of Manhattan distances | https://atcoder.jp/contests/abc186/tasks/abc186_d |
| 5 | Manhattan Subarrays | Codeforces | Medium (1700) | Manhattan distance / subarrays | https://codeforces.com/problemset/problem/1550/c |
| 6 | 1978C - Manhattan Permutations | Codeforces | Medium (1300) | Manhattan distance in permutations | https://codeforces.com/problemset/problem/1978/C |
| 7 | 1401A - Distance and Axis | Codeforces | Easy (900) | Distance on number line | https://codeforces.com/problemset/problem/1401/A |
| 8 | ABC 210 D - National Railway | AtCoder | Medium (800) | Grid Manhattan DP | https://atcoder.jp/contests/abc210/tasks/abc210_d |
| 9 | Minimize Manhattan Distances | LeetCode | Hard | Manhattan distance optimization | https://leetcode.com/problems/minimize-manhattan-distances/ |
| 10 | 2849. Determine if a Cell Is Reachable at a Given Time | LeetCode | Medium | Chebyshev distance | https://leetcode.com/problems/determine-if-a-cell-is-reachable-at-a-given-time/ |
| 11 | ABC 070 D - Transit Tree Path | AtCoder | Medium (400) | Tree distance | https://atcoder.jp/contests/abc070/tasks/abc070_d |
| 12 | Distance in Tree | Codeforces | Medium (1800) | Tree DP + distance | https://codeforces.com/problemset/problem/161/D |
| 13 | Tree Distances II | CSES | Medium (1600) | Sum of distances in tree | https://cses.fi/problemset/task/1133 |
| 14 | Hamming Distance | LeetCode | Easy | Bit distance | https://leetcode.com/problems/hamming-distance/ |
| 15 | 161D - Distance in Tree | Codeforces | Medium (1800) | Tree distance counting | https://codeforces.com/problemset/problem/161/D |

### 7. GENERATED PRACTICE PROBLEMS

**Problem 1: Delivery Route (Easy)**
You are at position (0, 0) and need to deliver packages at positions (x1, y1), (x2, y2), ..., (xn, yn). You can only move in 4 directions (up, down, left, right). What is the minimum total distance to deliver all packages and return to the origin? Simplify: assume you can visit the points in any order.

**Problem 2: Median Meeting Point (Medium)**
There are N friends living at positions (xi, yi) in a city with grid-like streets. They want to choose a meeting point such that the sum of Manhattan distances from all friends to the meeting point is minimized. Find the minimum possible sum.

**Problem 3: Chebyshev Overlap (Medium)**
Given N axis-aligned squares of side length S centered at points (xi, yi), the "reachable area" from each center using Chebyshev distance is a square. Find the area of overlap of all N squares.

**Problem 4: Minimax School Location (Hard)**
N students live at coordinates (xi, yi). You must place a school such that the maximum Euclidean distance from any student to the school is minimized. This is the smallest enclosing circle problem. Find the minimum possible maximum distance.

**Problem 5: Tree Distance Sum (Hard)**
Given a tree with N nodes, each edge has weight 1. For each node, compute the sum of distances from that node to all other nodes. Solve in O(N) time.

**Problem 6: XOR Distance (Interview-Style)**
You are given an array of N distinct integers. For each pair (i, j), define the XOR distance as the number of bits where their binary representations differ (Hamming distance of bits). Find the total sum of XOR distances over all pairs.

**Problem 7: Taxicab Geometry Spiral (Contest-Style)**
Starting from (0, 0), you move to points with integer coordinates in increasing order of Manhattan distance from the origin. For points with equal Manhattan distance, order by x-coordinate. Find the K-th point visited.

### 8. COMPLETE SOLUTION SECTION

#### Problem 1: ABC 186 D - Sum of Difference

**Given:** N integers A1, A2, ..., AN. Compute Σ Σ |Ai - Aj| for all i < j.

**A. Intuition:**
The sum of absolute differences between all pairs in a 1D array. In 2D, this extends to Manhattan distance.

**B. Brute Force:**
Compute all pairs: O(N^2).

```python
def brute_force(arr):
    n = len(arr)
    total = 0
    for i in range(n):
        for j in range(i+1, n):
            total += abs(arr[i] - arr[j])
    return total
```

**C. Optimized Approach:**
Sort the array. For each element arr[i], its contribution to the sum is: arr[i] * i - prefix_sum[i-1]. This counts arr[i] as positive when paired with smaller elements and negative when paired with larger elements.

**D. Step-by-Step Explanation:**
1. Sort the array ascending.
2. Maintain a running prefix sum.
3. For each element at index i (0-based), add arr[i] * i - prefix to the answer.
4. Add arr[i] to running prefix sum.

**E. Complexity Analysis:**
- Time: O(N log N) for sorting, O(N) for the linear pass = O(N log N).
- Space: O(1) extra.

**F. Edge Cases:**
- Single element: answer is 0.
- All equal elements: answer is 0.
- Very large values: use 64-bit integers.

**G. Fully Working Code:**

```python
def sum_of_abs_diff(arr):
    arr.sort()
    total = 0
    prefix = 0
    for i, x in enumerate(arr):
        total += x * i - prefix
        prefix += x
    return total
```

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

ll sum_of_abs_diff(vector<ll>& arr) {
    sort(arr.begin(), arr.end());
    ll total = 0, prefix = 0;
    for (int i = 0; i < arr.size(); i++) {
        total += arr[i] * i - prefix;
        prefix += arr[i];
    }
    return total;
}
```

```java
import java.util.*;

public class Solution {
    public static long sumOfAbsDiff(long[] arr) {
        Arrays.sort(arr);
        long total = 0, prefix = 0;
        for (int i = 0; i < arr.length; i++) {
            total += arr[i] * i - prefix;
            prefix += arr[i];
        }
        return total;
    }
}
```

---

#### Problem 2: Minimize Manhattan Distances (LeetCode Hard)

**Given:** An array of points on a 2D plane. Find the minimum possible value of maximum Manhattan distance between any two points after removing any one point.

**A. Intuition:**
Manhattan distance is max among transformed coordinates. By transforming (x,y) to (x+y, x-y), the maximum Manhattan distance becomes max of (max_u - min_u, max_v - min_v). Removing one point changes these extremes.

**B. Brute Force:**
For each point, remove it and compute the maximum Manhattan distance among remaining points. O(N^2).

**C. Optimized Approach:**
Compute four extreme values: max_u, min_u, max_v, min_v and their corresponding point indices. When removing a point, if it was one of the extremes, recompute that extreme from the remaining N-1 points.

**D. Step-by-Step Explanation:**
1. Transform each point (x, y) to (u, v) = (x + y, x - y).
2. The max Manhattan distance after removing one point = max(max_u - second_max_u, max_v - second_max_v, ...).
3. Track the top 2 values for max_u, min_u, max_v, min_v and which point produced each.
4. For each point i, if i is in any of the 4 extreme positions, recompute; otherwise the global extremes stand.

**E. Complexity Analysis:**
- Time: O(N) for scanning all points.
- Space: O(1).

**F. Edge Cases:**
- N = 2: removing one leaves one point, distance = 0.
- All points identical: distance = 0.
- Large coordinates: use 64-bit integers.

**G. Fully Working Code:**

```python
def minimize_max_manhattan(points):
    n = len(points)
    if n <= 2:
        return 0
    
    # Transform to u = x + y, v = x - y
    transformed = [(x + y, x - y) for x, y in points]
    
    # Find top 2 max/min of u and v
    max_u = sorted([(u, i) for i, (u, v) in enumerate(transformed)], reverse=True)[:2]
    min_u = sorted([(u, i) for i, (u, v) in enumerate(transformed)])[:2]
    max_v = sorted([(v, i) for i, (u, v) in enumerate(transformed)], reverse=True)[:2]
    min_v = sorted([(v, i) for i, (u, v) in enumerate(transformed)])[:2]
    
    ans = float('inf')
    for remove_idx in range(n):
        # Compute max Manhattan distance without this point
        mu = max_u[0][0] if max_u[0][1] != remove_idx else max_u[1][0]
        nu = min_u[0][0] if min_u[0][1] != remove_idx else min_u[1][0]
        mv = max_v[0][0] if max_v[0][1] != remove_idx else max_v[1][0]
        nv = min_v[0][0] if min_v[0][1] != remove_idx else min_v[1][0]
        
        cur_max = max(mu - nu, mv - nv)
        ans = min(ans, cur_max)
    
    return ans
```

```cpp
int minimizeMaxManhattan(vector<vector<int>>& points) {
    int n = points.size();
    if (n <= 2) return 0;
    
    vector<pair<long long, int>> max_u, min_u, max_v, min_v;
    for (int i = 0; i < n; i++) {
        long long u = (long long)points[i][0] + points[i][1];
        long long v = (long long)points[i][0] - points[i][1];
        max_u.push_back({u, i});
        min_u.push_back({u, i});
        max_v.push_back({v, i});
        min_v.push_back({v, i});
    }
    
    sort(max_u.rbegin(), max_u.rend());
    sort(min_u.begin(), min_u.end());
    sort(max_v.rbegin(), max_v.rend());
    sort(min_v.begin(), min_v.end());
    
    long long ans = LLONG_MAX;
    for (int remove_idx = 0; remove_idx < n; remove_idx++) {
        long long mu = (max_u[0].second != remove_idx) ? max_u[0].first : max_u[1].first;
        long long nu = (min_u[0].second != remove_idx) ? min_u[0].first : min_u[1].first;
        long long mv = (max_v[0].second != remove_idx) ? max_v[0].first : max_v[1].first;
        long long nv = (min_v[0].second != remove_idx) ? min_v[0].first : min_v[1].first;
        
        ans = min(ans, max(mu - nu, mv - nv));
    }
    return (int)ans;
}
```

```java
public int minimizeMaxManhattan(int[][] points) {
    int n = points.length;
    if (n <= 2) return 0;
    
    long[][] transformed = new long[n][2];
    for (int i = 0; i < n; i++) {
        transformed[i][0] = (long)points[i][0] + points[i][1];
        transformed[i][1] = (long)points[i][0] - points[i][1];
    }
    
    // Build sorted arrays with indices
    long[][] maxU = new long[n][2];
    long[][] minU = new long[n][2];
    long[][] maxV = new long[n][2];
    long[][] minV = new long[n][2];
    
    for (int i = 0; i < n; i++) {
        maxU[i] = new long[]{transformed[i][0], i};
        minU[i] = new long[]{transformed[i][0], i};
        maxV[i] = new long[]{transformed[i][1], i};
        minV[i] = new long[]{transformed[i][1], i};
    }
    
    Arrays.sort(maxU, (a,b) -> Long.compare(b[0], a[0]));
    Arrays.sort(minU, (a,b) -> Long.compare(a[0], b[0]));
    Arrays.sort(maxV, (a,b) -> Long.compare(b[0], a[0]));
    Arrays.sort(minV, (a,b) -> Long.compare(a[0], b[0]));
    
    long ans = Long.MAX_VALUE;
    for (int rem = 0; rem < n; rem++) {
        long mu = (maxU[0][1] != rem) ? maxU[0][0] : maxU[1][0];
        long nu = (minU[0][1] != rem) ? minU[0][0] : minU[1][0];
        long mv = (maxV[0][1] != rem) ? maxV[0][0] : maxV[1][0];
        long nv = (minV[0][1] != rem) ? minV[0][0] : minV[1][0];
        
        ans = Math.min(ans, Math.max(mu - nu, mv - nv));
    }
    return (int)ans;
}
```

---

#### Problem 3: Tree Distances II (CSES)

**Given:** A tree with N nodes (1..N). For each node, find the sum of distances to all other nodes.

**A. Intuition:**
Use tree DP with rerooting. First compute distances from node 1 to all others using one DFS. Then propagate the answer through the tree: when moving from parent to child, the answer for the child is based on the parent's answer plus an adjustment.

**B. Brute Force:**
Run BFS/DFS from each node: O(N^2).

**C. Optimized Approach (Rerooting DP):**
1. Root the tree at node 1.
2. First DFS: compute subtree_size and sum_dist_from_root (sum of distances from root to all nodes in its subtree).
3. Second DFS (reroot): For each node, compute answer using parent's answer.

**D. Step-by-Step Explanation:**
1. First DFS from root 1.
   - subtree[node] = 1 + sum of subtree[child] for all children.
   - sum_down[node] = sum of (sum_down[child] + subtree[child]) for all children.
2. ans[1] = sum_down[1].
3. Second DFS: For node u and its child v:
   - When moving root from u to v, all nodes in v's subtree get 1 closer, all other nodes get 1 farther.
   - ans[v] = ans[u] - subtree[v] + (N - subtree[v]).
4. Output ans[1..N].

**E. Complexity Analysis:**
- Time: O(N) for two DFS passes.
- Space: O(N) for adjacency, subtree sizes, answers.

**F. Edge Cases:**
- N = 1: answer is 0.
- Linear chain (line graph): answers follow a pattern.
- Large N: use recursion-safe DFS (iterative or set recursionlimit).

**G. Fully Working Code:**

```python
import sys
sys.setrecursionlimit(300000)

def tree_distances(n, edges):
    adj = [[] for _ in range(n)]
    for u, v in edges:
        u -= 1; v -= 1
        adj[u].append(v)
        adj[v].append(u)
    
    subtree = [0] * n
    sum_down = [0] * n
    ans = [0] * n
    
    def dfs1(u, parent):
        subtree[u] = 1
        for v in adj[u]:
            if v != parent:
                dfs1(v, u)
                subtree[u] += subtree[v]
                sum_down[u] += sum_down[v] + subtree[v]
    
    def dfs2(u, parent):
        for v in adj[u]:
            if v != parent:
                ans[v] = ans[u] - subtree[v] + (n - subtree[v])
                dfs2(v, u)
    
    dfs1(0, -1)
    ans[0] = sum_down[0]
    dfs2(0, -1)
    return ans
```

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    int n; cin >> n;
    vector<vector<int>> adj(n);
    for (int i = 0; i < n-1; i++) {
        int u, v; cin >> u >> v;
        u--; v--;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    
    vector<ll> subtree(n, 0), sum_down(n, 0), ans(n, 0);
    
    function<void(int,int)> dfs1 = [&](int u, int p) {
        subtree[u] = 1;
        for (int v : adj[u]) {
            if (v == p) continue;
            dfs1(v, u);
            subtree[u] += subtree[v];
            sum_down[u] += sum_down[v] + subtree[v];
        }
    };
    
    function<void(int,int)> dfs2 = [&](int u, int p) {
        for (int v : adj[u]) {
            if (v == p) continue;
            ans[v] = ans[u] - subtree[v] + (n - subtree[v]);
            dfs2(v, u);
        }
    };
    
    dfs1(0, -1);
    ans[0] = sum_down[0];
    dfs2(0, -1);
    
    for (ll x : ans) cout << x << " ";
}
```

```java
import java.util.*;

public class TreeDistancesII {
    static int n;
    static List<Integer>[] adj;
    static long[] subtree, sumDown, ans;
    
    static void dfs1(int u, int p) {
        subtree[u] = 1;
        for (int v : adj[u]) {
            if (v == p) continue;
            dfs1(v, u);
            subtree[u] += subtree[v];
            sumDown[u] += sumDown[v] + subtree[v];
        }
    }
    
    static void dfs2(int u, int p) {
        for (int v : adj[u]) {
            if (v == p) continue;
            ans[v] = ans[u] - subtree[v] + (n - subtree[v]);
            dfs2(v, u);
        }
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        n = sc.nextInt();
        adj = new ArrayList[n];
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();
        
        for (int i = 0; i < n-1; i++) {
            int u = sc.nextInt() - 1;
            int v = sc.nextInt() - 1;
            adj[u].add(v);
            adj[v].add(u);
        }
        
        subtree = new long[n];
        sumDown = new long[n];
        ans = new long[n];
        
        dfs1(0, -1);
        ans[0] = sumDown[0];
        dfs2(0, -1);
        
        for (long x : ans) System.out.print(x + " ");
    }
}
```

---

#### Problem 4: Manhattan Subarrays (Codeforces 1550C)

**Given:** An array of integers. A subarray is "bad" if any three indices i < j < k form a "Manhattan triangle" where the Manhattan distances satisfy certain inequality. Count the number of "good" subarrays.

**A. Intuition:**
This is a classic "good subarray" sliding window problem. For Manhattan distance in 1D, a subarray of length <= 2 is always good. For length >= 5, it is always bad. So we only need to check subarrays of length 3, 4.

**B. Brute Force:**
Check every subarray: O(N^3).

**C. Optimized Approach:**
Sliding window with constraint that good subarrays have length <= 4 (since any 5 points in 1D will contain a bad triple by the Erdős–Szekeres theorem). Check lengths 3 and 4 explicitly.

**D. Step-by-Step Explanation:**
1. All subarrays of length 1 and 2 are good. Add N + N-1 to answer.
2. For each starting index i, check length 3 and 4 subarrays.
3. A 3-element subarray is bad if it is monotonic (strictly increasing or decreasing).
4. A 4-element subarray is bad if any 3 of its elements are monotonic.

**E. Complexity Analysis:**
- Time: O(N).
- Space: O(1).

**F. Edge Cases:**
- N = 1, 2: all subarrays good.
- N = 3: check the single subarray of length 3.
- Duplicate values: not monotonic if values equal.

**G. Fully Working Code:**

```python
def count_good_subarrays(arr):
    n = len(arr)
    ans = n + (n - 1)  # length 1 and 2 subarrays
    
    for i in range(n - 2):
        # Length 3
        a, b, c = arr[i], arr[i+1], arr[i+2]
        if not (a <= b <= c or a >= b >= c):
            ans += 1
        
        # Length 4
        if i + 3 < n:
            a, b, c, d = arr[i], arr[i+1], arr[i+2], arr[i+3]
            if (not (a <= b <= c or a >= b >= c) and
                not (b <= c <= d or b >= c >= d) and
                not (a <= b <= d and a <= c <= d and a <= ... )):
                pass  # Full check
            # Simpler: check all 3-element subarrays of this 4-element window
            ok = True
            for x in range(i, i+2):
                for y in range(x+1, i+3):
                    for z in range(y+1, i+4):
                        p,q,r = arr[x], arr[y], arr[z]
                        if p <= q <= r or p >= q >= r:
                            ok = False
            if ok:
                ans += 1
    
    return ans
```

---

#### Problem 5: Hamming Distance

**Given:** Two integers x and y. Return the number of positions where their bits differ.

**A. Intuition:**
XOR produces 1 wherever bits differ. Count the 1s in x XOR y.

**B. Brute Force:**
Check each bit position one by one.

**C. Optimized Approach:**
Use built-in bit counting (popcount) on x XOR y.

**D. Step-by-Step Explanation:**
1. Compute xor = x ^ y.
2. Count the number of set bits in xor.

**E. Complexity Analysis:**
- Time: O(1) (or O(number of bits) in languages without popcount).
- Space: O(1).

**F. Edge Cases:**
- x = y: distance = 0.
- Very large integers (64-bit).

**G. Fully Working Code:**

```python
def hamming_distance(x, y):
    xor = x ^ y
    return xor.bit_count()
```

```cpp
int hammingDistance(int x, int y) {
    return __builtin_popcount(x ^ y);
}
```

```java
public int hammingDistance(int x, int y) {
    return Integer.bitCount(x ^ y);
}
```

---

## Chapter 10: Polygon Problems

### 1. INTRODUCTION

A polygon is a closed shape formed by connecting line segments end-to-end. From triangles to hexagons to complex irregular shapes, polygons are everywhere in computational geometry — they represent the boundaries of regions, the shapes of objects, and the zones of influence in spatial problems.

Think of a polygon as a fence around a piece of land. The fence posts (vertices) are connected by straight fence segments (edges). The questions we ask about polygons often mirror real-world concerns: How much land is enclosed? (area) How much fencing is needed? (perimeter) Is a point inside the fence? (point-in-polygon) Is my fence convex (bulging outward) or concave (with indentations)?

Polygon problems appear in computer graphics (rendering shapes), GIS (mapping boundaries), robotics (obstacle representation), and game development (collision detection). In competitive programming, polygon problems test your ability to compute areas, detect convexity, and work with geometric properties algorithmically.

### 2. CORE CONCEPTS

#### 2.1 Polygon Definition

A polygon is defined by an ordered list of vertices (x0, y0), (x1, y1), ..., (x_{n-1}, y_{n-1}). The edges connect vertex i to vertex (i+1) mod n.

**Simple polygon:** No two edges intersect except at shared endpoints.
**Convex polygon:** All interior angles < 180 degrees; the polygon bulges outward everywhere.
**Concave polygon:** Has at least one interior angle > 180 degrees (a "dent").

#### 2.2 Shoelace Formula (Area of Polygon)

For a polygon with vertices (x0, y0), (x1, y1), ..., (x_{n-1}, y_{n-1}):

    Area = 0.5 * |Σ (xi * y_{i+1} - x_{i+1} * yi)|

where the indices wrap around (vertex n = vertex 0).

**Geometric intuition:** The formula sums the signed area of trapezoids formed by each edge projected onto the x-axis. The absolute value gives the total area.

**Why it works:** The shoelace formula is derived from Green's theorem, which relates the area of a closed region to a line integral around its boundary.

**Signed area:** If vertices are ordered counterclockwise, the signed area is positive; clockwise gives negative area.

#### 2.3 Convex Polygon Check

A polygon is convex iff for every three consecutive vertices A, B, C, the cross product (B - A) × (C - B) has the same sign (all positive for CCW, all negative for CW).

    cross = (B.x - A.x) * (C.y - B.y) - (B.y - A.y) * (C.x - B.x)

If all cross products have the same sign (or zero for collinear), the polygon is convex.

#### 2.4 Point-in-Polygon (PIP)

**Ray casting algorithm:**
1. Cast a horizontal ray from the point to the right (+x direction).
2. Count how many polygon edges the ray crosses.
3. Odd count = inside, even count = outside.

**Winding number algorithm:**
1. Sum the signed angles subtended by each edge as seen from the point.
2. If the sum is 2π (or 360 degrees), the point is inside.

**Corner cases:** Points on edges are typically considered inside for boundary-inclusive problems.

#### 2.5 Polygon Perimeter

    Perimeter = Σ sqrt((x_{i+1} - xi)^2 + (y_{i+1} - yi)^2)

#### 2.6 Centroid of Polygon

    Cx = (1 / (6 * Area)) * Σ (xi + x_{i+1}) * (xi * y_{i+1} - x_{i+1} * yi)
    Cy = (1 / (6 * Area)) * Σ (yi + y_{i+1}) * (xi * y_{i+1} - x_{i+1} * yi)

#### 2.7 Regular Polygon Properties

- n sides, each of length s
- Interior angle = (n-2) * 180 / n degrees
- Exterior angle = 360 / n degrees
- Circumradius R = s / (2 * sin(π / n))
- Inradius r = s / (2 * tan(π / n))
- Area = (n * s^2) / (4 * tan(π / n))

### 3. PROBLEM RECOGNITION

**Common keywords and phrases:**
- "Polygon" / "regular polygon" / "convex polygon"
- "Area of polygon" / "shoelace formula"
- "Point inside polygon" / "point in polygon"
- "Convex hull" / "convex polygon check"
- "Centroid" / "center of mass"
- "Hexagon" / "pentagon" / "octagon" etc.
- "Interior angle" / "exterior angle"
- "Number of sides" / "vertices"

**Hidden geometry indicators:**
- Problems with many points where you need to find the smallest enclosing shape → convex hull
- Problems about "inside" or "covering" → point-in-polygon
- Area ratio problems → shoelace + convex hull
- Problems about "reflection" or "symmetry" in a shape → regular polygon properties

**How interviewers frame these problems:**
- "Given N points that form a convex polygon, determine..."
- "Find the area of the polygon formed by connecting these points in order."
- "Is a given point inside the polygon?"
- "What is the maximum area quadrilateral you can form from these points?"

### 4. PATTERN ANALYSIS

#### Pattern 1: Shoelace Formula for Area

**When to use:** Any problem asking for polygon area given ordered vertices.

**Why it works:** Simple O(N) computation, no complex math needed.

**Complexity:** O(N).

**Common mistakes:** Forgetting the absolute value; forgetting the wrap-around from last vertex back to first; ordering matters for sign.

#### Pattern 2: Convex Hull + Polygon Properties

**When to use:** Problems about "maximum area shape" or "minimum perimeter enclosure" from a set of points.

**Why it works:** The convex hull of a point set is the smallest convex polygon containing all points. Many optimization problems reduce to computing the hull.

**Common mistakes:** Collinear points on hull edges; floating point precision.

#### Pattern 3: Point-in-Polygon Test

**When to use:** Any problem asking "is this point inside the shape?"

**Why it works:** The ray casting algorithm is simple, O(N) per query, and handles convex and concave polygons.

**Common mistakes:** Forgetting that a ray through a vertex counts as 2 intersections (handle carefully by using a half-open interval).

#### Pattern 4: Regular Polygon Angle Problems

**When to use:** Problems that mention "interior angle" or "exterior angle."

**Why it works:** The interior angle of a regular n-gon is fixed: (n-2)*180/n. This immediately tells you whether a given shape is possible.

**Common mistakes:** Confusing interior and exterior angles.

### 5. REUSABLE CODING TEMPLATES

#### Shoelace Formula (Polygon Area)

```python
def polygon_area(vertices):
    n = len(vertices)
    area = 0
    for i in range(n):
        x1, y1 = vertices[i]
        x2, y2 = vertices[(i + 1) % n]
        area += x1 * y2 - x2 * y1
    return abs(area) / 2.0
```

```cpp
double polygon_area(vector<pair<int,int>>& vertices) {
    int n = vertices.size();
    long long area = 0;
    for (int i = 0; i < n; i++) {
        auto [x1, y1] = vertices[i];
        auto [x2, y2] = vertices[(i + 1) % n];
        area += (long long)x1 * y2 - (long long)x2 * y1;
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
        area += (long)x1 * y2 - (long)x2 * y1;
    }
    return Math.abs(area) / 2.0;
}
```

#### Convex Polygon Check

```python
def cross(o, a, b):
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])

def is_convex(vertices):
    n = len(vertices)
    if n < 3: return False
    sign = None
    for i in range(n):
        o = vertices[i]
        a = vertices[(i + 1) % n]
        b = vertices[(i + 2) % n]
        c = cross(o, a, b)
        if c != 0:
            if sign is None:
                sign = c > 0
            elif (c > 0) != sign:
                return False
    return True
```

```cpp
long long cross(pair<int,int> o, pair<int,int> a, pair<int,int> b) {
    return (long long)(a.first - o.first) * (b.second - o.second) -
           (long long)(a.second - o.second) * (b.first - o.first);
}

bool is_convex(vector<pair<int,int>>& vertices) {
    int n = vertices.size();
    if (n < 3) return false;
    bool sign = false;
    bool set = false;
    for (int i = 0; i < n; i++) {
        auto o = vertices[i], a = vertices[(i+1)%n], b = vertices[(i+2)%n];
        long long c = cross(o, a, b);
        if (c != 0) {
            if (!set) { sign = c > 0; set = true; }
            else if ((c > 0) != sign) return false;
        }
    }
    return true;
}
```

```java
public static long cross(int[] o, int[] a, int[] b) {
    return (long)(a[0] - o[0]) * (b[1] - o[1]) -
           (long)(a[1] - o[1]) * (b[0] - o[0]);
}

public static boolean isConvex(int[][] vertices) {
    int n = vertices.length;
    if (n < 3) return false;
    Boolean sign = null;
    for (int i = 0; i < n; i++) {
        long c = cross(vertices[i], vertices[(i+1)%n], vertices[(i+2)%n]);
        if (c != 0) {
            if (sign == null) sign = c > 0;
            else if ((c > 0) != sign) return false;
        }
    }
    return true;
}
```

#### Point-in-Polygon (Ray Casting)

```python
def point_in_polygon(point, vertices):
    x, y = point
    n = len(vertices)
    inside = False
    for i in range(n):
        x1, y1 = vertices[i]
        x2, y2 = vertices[(i + 1) % n]
        # Check if the point is on the segment first (boundary case)
        if min(x1, x2) <= x <= max(x1, x2) and min(y1, y2) <= y <= max(y1, y2):
            if (x2 - x1) * (y - y1) == (x - x1) * (y2 - y1):  # collinear and on segment
                return True
        # Ray casting: intersect with horizontal ray going right
        if (y1 > y) != (y2 > y):  # crosses the horizontal line at y
            x_intersect = x1 + (x2 - x1) * (y - y1) / (y2 - y1)
            if x < x_intersect:
                inside = not inside
    return inside
```

```cpp
bool point_in_polygon(pair<int,int> point, vector<pair<int,int>>& vertices) {
    double x = point.first, y = point.second;
    int n = vertices.size();
    bool inside = false;
    for (int i = 0; i < n; i++) {
        auto [x1, y1] = vertices[i];
        auto [x2, y2] = vertices[(i+1)%n];
        if ((y1 > y) != (y2 > y)) {
            double x_intersect = x1 + (double)(x2 - x1) * (y - y1) / (y2 - y1);
            if (x < x_intersect) inside = !inside;
        }
    }
    return inside;
}
```

```java
public static boolean pointInPolygon(int[] point, int[][] vertices) {
    double x = point[0], y = point[1];
    int n = vertices.length;
    boolean inside = false;
    for (int i = 0; i < n; i++) {
        double x1 = vertices[i][0], y1 = vertices[i][1];
        double x2 = vertices[(i+1)%n][0], y2 = vertices[(i+1)%n][1];
        if ((y1 > y) != (y2 > y)) {
            double xIntersect = x1 + (x2 - x1) * (y - y1) / (y2 - y1);
            if (x < xIntersect) inside = !inside;
        }
    }
    return inside;
}
```

#### Polygon Perimeter

```python
def polygon_perimeter(vertices):
    n = len(vertices)
    perim = 0
    for i in range(n):
        x1, y1 = vertices[i]
        x2, y2 = vertices[(i + 1) % n]
        perim += ((x1 - x2)**2 + (y1 - y2)**2) ** 0.5
    return perim
```

```cpp
double polygon_perimeter(vector<pair<int,int>>& vertices) {
    int n = vertices.size();
    double perim = 0;
    for (int i = 0; i < n; i++) {
        auto [x1, y1] = vertices[i];
        auto [x2, y2] = vertices[(i+1)%n];
        perim += sqrt(pow(x1-x2, 2) + pow(y1-y2, 2));
    }
    return perim;
}
```

```java
public static double polygonPerimeter(int[][] vertices) {
    int n = vertices.length;
    double perim = 0;
    for (int i = 0; i < n; i++) {
        double dx = vertices[i][0] - vertices[(i+1)%n][0];
        double dy = vertices[i][1] - vertices[(i+1)%n][1];
        perim += Math.sqrt(dx*dx + dy*dy);
    }
    return perim;
}
```

### 6. CURATED REAL PROBLEMS

| # | Problem Name | Platform | Difficulty | Key Concept | Link |
|---|---|---|---|---|---|
| 1 | ABC117B - Polygon | AtCoder | Easy (258) | Polygon existence theorem | https://atcoder.jp/contests/abc117/tasks/abc117_b |
| 2 | Fancy Fence | Codeforces | Easy (800) | Regular polygon interior angle | https://codeforces.com/problemset/problem/270/A |
| 3 | Two Regular Polygons | Codeforces | Easy (800) | Inscribed polygons | https://codeforces.com/problemset/problem/1312/a |
| 4 | Polygon Area (CSES) | CSES | Medium | Shoelace formula | https://cses.fi/problemset/task/2191 |
| 5 | Polygon Area (AOJ) | AOJ | Easy | Shoelace formula | https://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=CGL_3_A |
| 6 | Convex Polygon | LeetCode | Medium | Convex polygon check | https://leetcode.com/problems/convex-polygon/ |
| 7 | Mister B and Angle in Polygon | Codeforces | Medium (1300) | Regular polygon angles | https://codeforces.com/problemset/problem/820/b |
| 8 | Polygon for the Angle | Codeforces | Medium (1600) | Polygon angle properties | https://codeforces.com/problemset/problem/1096/c |
| 9 | Maximal Area Quadrilateral | Codeforces | Hard (2100) | Max area from point set | https://codeforces.com/problemset/problem/340/b |
| 10 | Gerald's Hexagon | Codeforces | Medium (1600) | Hexagon area via triangle division | https://codeforces.com/problemset/problem/559/a |
| 11 | Find Polygon With the Largest Perimeter | LeetCode | Medium | Triangle inequality + sorting | https://leetcode.com/problems/find-polygon-with-the-largest-perimeter/ |
| 12 | 2971. Find Polygon With the Largest Perimeter | LeetCode | Medium | Greedy selection | https://leetcode.com/problems/find-polygon-with-the-largest-perimeter/ |
| 13 | Polygon (UVa 10078) | UVa | Medium | Convex polygon check | https://onlinejudge.org/external/100/10078.html |
| 14 | ABC022D - Big Bang | AtCoder | Medium (1857) | Convex hull expansion | https://atcoder.jp/contests/abc022/tasks/abc022_d |
| 15 | Janitor Troubles | Kattis | Medium | Max quadrilateral area (Brahmagupta) | https://open.kattis.com/problems/janitortroubles |

### 7. GENERATED PRACTICE PROBLEMS

**Problem 1: Regular or Not (Easy)**
Given three integers a, b, c representing the interior angles (in degrees) of a triangle, determine if a triangle with these angles exists. If so, is it acute, right, or obtuse?

**Problem 2: Polygon Perimeter (Easy)**
Given N ordered vertices of a polygon, compute its perimeter. All vertices are integers.

**Problem 3: Shoelace Practice (Medium)**
Given N points in order, compute the area of the polygon they form. Then compute the area of the convex hull of the same points. Return their ratio.

**Problem 4: Point in Many Polygons (Medium)**
Given M polygons (each with up to 100 vertices) and Q query points, for each query determine how many polygons contain the point.

**Problem 5: Max Area Quadrilateral (Hard)**
Given N points on a plane, find the maximum area quadrilateral that can be formed using any 4 points as vertices. N <= 2000.

**Problem 6: Star Polygon Area (Contest-Style)**
A regular star polygon {n/k} is formed by connecting every k-th point of n equally spaced points on a circle. Given n and k (gcd(n,k) = 1), compute its area and perimeter.

**Problem 7: Irregular Polygon Triangulation (Interview-Style)**
Given a simple (convex or concave) polygon with N vertices, find the minimum total length of diagonals needed to triangulate it (partition it into triangles by non-intersecting diagonals). This is a DP problem.

### 8. COMPLETE SOLUTION SECTION

#### Problem 1: Fancy Fence (Codeforces 270A)

**Given:** An interior angle A. Determine if a regular polygon can have this interior angle.

**A. Intuition:**
Interior angle of regular n-gon = (n-2)*180/n. For a given A, n must be an integer >= 3.

**B. Brute Force:**
Try n from 3 upward until the interior angle matches A.

**C. Optimized Approach:**
Solve for n: n = 360 / (180 - A). Check if n is an integer >= 3.

**D. Step-by-Step Explanation:**
1. If A < 60 or A >= 180: impossible (minimum interior angle of regular polygon is 60 for equilateral triangle, max approaches 180 as n→∞).
2. Compute n = 360 / (180 - A).
3. Check if n is an integer (using floating point epsilon or integer arithmetic).

**E. Complexity Analysis:**
- Time: O(1).
- Space: O(1).

**F. Edge Cases:**
- A = 60: triangle (n = 3).
- A = 90: square (n = 4).
- A close to 180 but not forming integer n.

**G. Fully Working Code:**

```python
def fancy_fence(angle):
    # n = 360 / (180 - angle)
    # Check if n is an integer
    if 360 % (180 - angle) == 0:
        n = 360 // (180 - angle)
        return n >= 3
    return False
```

```cpp
string fancy_fence(int angle) {
    if (360 % (180 - angle) == 0) {
        int n = 360 / (180 - angle);
        return (n >= 3) ? "YES" : "NO";
    }
    return "NO";
}
```

```java
public static boolean fancyFence(int angle) {
    if (360 % (180 - angle) == 0) {
        int n = 360 / (180 - angle);
        return n >= 3;
    }
    return false;
}
```

---

#### Problem 2: Polygon Area (CSES 2191 / Shoelace)

**Given:** N vertices of a polygon in counterclockwise order. Compute the area.

**A. Intuition:**
Direct application of the shoelace formula.

**B. Brute Force:**
Decompose into triangles from a reference point (e.g., (0,0)). Sum cross products = same as shoelace.

**C. Optimized Approach:**
Use the shoelace formula directly in O(N).

**D. Step-by-Step Explanation:**
1. Initialize area = 0.
2. For each vertex i (0 to N-1):
   - Get current vertex (x1, y1) and next vertex (x2, y2).
   - Add x1*y2 - x2*y1 to area.
3. area = abs(area) / 2.

**E. Complexity Analysis:**
- Time: O(N).
- Space: O(1).

**F. Edge Cases:**
- N = 3 (triangle): shoelace still works.
- Clockwise vertices: area will be negative; take absolute value.
- Large coordinates: use 64-bit or 128-bit integers for the intermediate sum.

**G. Fully Working Code:**

```python
def polygon_area(vertices):
    n = len(vertices)
    area = 0
    for i in range(n):
        x1, y1 = vertices[i]
        x2, y2 = vertices[(i + 1) % n]
        area += x1 * y2 - x2 * y1
    return abs(area) / 2
```

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    int n; cin >> n;
    vector<ll> x(n), y(n);
    for (int i = 0; i < n; i++) cin >> x[i] >> y[i];
    
    ll area = 0;
    for (int i = 0; i < n; i++) {
        int j = (i + 1) % n;
        area += x[i] * y[j] - x[j] * y[i];
    }
    
    cout << abs(area) / 2;
    if (area % 2 != 0) cout << ".5";
    cout << endl;
}
```

```java
import java.util.*;

public class PolygonArea {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long[] x = new long[n], y = new long[n];
        for (int i = 0; i < n; i++) { x[i] = sc.nextLong(); y[i] = sc.nextLong(); }
        
        long area = 0;
        for (int i = 0; i < n; i++) {
            int j = (i + 1) % n;
            area += x[i] * y[j] - x[j] * y[i];
        }
        
        area = Math.abs(area);
        System.out.print(area / 2);
        if (area % 2 != 0) System.out.print(".5");
        System.out.println();
    }
}
```

---

#### Problem 3: Convex Polygon (LeetCode 469)

**Given:** A list of points that form a polygon. Determine if the polygon is convex.

**A. Intuition:**
Check that all consecutive triples have the same turn direction (all cross products have the same sign).

**B. Brute Force:**
Check all combinations of 3 vertices for convexity — overkill.

**C. Optimized Approach:**
Linear scan: compute cross product for each consecutive triple.

**D. Step-by-Step Explanation:**
1. If N < 3: not a polygon.
2. Find the first non-zero cross product to determine the expected sign.
3. For each i, compute cross(vertices[i], vertices[i+1], vertices[i+2]).
4. If any cross product has opposite sign, return false.
5. All same sign (or zero = collinear) = convex.

**E. Complexity Analysis:**
- Time: O(N).
- Space: O(1).

**F. Edge Cases:**
- Collinear points on edges: acceptable, treat as "same sign" (zero is neutral).
- N = 3: always convex.
- Degenerate polygon (lines overlapping).

**G. Fully Working Code:**

```python
def is_convex(points):
    n = len(points)
    if n < 3:
        return False
    
    def cross(o, a, b):
        return (a[0]-o[0])*(b[1]-o[1]) - (a[1]-o[1])*(b[0]-o[0])
    
    sign = None
    for i in range(n):
        c = cross(points[i], points[(i+1)%n], points[(i+2)%n])
        if c != 0:
            if sign is None:
                sign = c > 0
            elif (c > 0) != sign:
                return False
    return True
```

---

## Chapter 11: Grid-Based Geometry

### 1. INTRODUCTION

A grid is one of the most fundamental structures in computer science. Think of a chessboard, a city map with blocks, a spreadsheet, or a pixelated image — these are all grids. In a grid, the world is divided into discrete cells arranged in rows and columns, and movement is restricted to these cells.

Grid-based geometry problems are among the most common in both interviews and competitive programming. They test your ability to navigate, transform, and compute within a discrete coordinate system. The geometry of grids feels intuitive (we've all played grid-based games), but the algorithmic depth is surprising.

Why does grid geometry deserve its own chapter? Because grids introduce discrete constraints that continuous geometry does not have. You cannot move "half a cell"; you are either in cell (r, c) or you are not. Distances are measured in steps, not straight lines. Rotations must map integer coordinates to integer coordinates.

### 2. CORE CONCEPTS

#### 2.1 Grid Representation

A grid of size R × C can be represented as:
- A 2D array (list of lists): `grid[r][c]`
- Coordinate convention: row r (0 to R-1), column c (0 to C-1)
- Values typically: 0/1 for binary grids, characters for mazes, integers for weighted grids

#### 2.2 Neighbor Directions

**4-directional (von Neumann neighborhood):**
    Up:    (-1, 0)
    Down:  ( 1, 0)
    Left:  ( 0,-1)
    Right: ( 0, 1)

**8-directional (Moore neighborhood):**
    Adds diagonals: (-1,-1), (-1, 1), (1,-1), (1, 1)

#### 2.3 Grid BFS and DFS

**BFS (Breadth-First Search):**
- Uses a queue
- Finds shortest path in unweighted grid (4-dir or 8-dir)
- O(R × C) time and space

**DFS (Depth-First Search):**
- Uses recursion or stack
- Good for connectivity, component finding, maze solving
- O(R × C) time and space

#### 2.4 Grid Distances

**4-directional distance:** Same as Manhattan distance: |r1-r2| + |c1-c2|
**8-directional distance:** Same as Chebyshev distance: max(|r1-r2|, |c1-c2|)

#### 2.5 Grid Transformations

**90° Rotation (clockwise):**
    new_grid[c][R-1-r] = grid[r][c]
    Or equivalently: transpose then reverse each row.

**Reflection (horizontal):**
    new_grid[r][C-1-c] = grid[r][c]

**Reflection (vertical):**
    new_grid[R-1-r][c] = grid[r][c]

**Transpose:**
    new_grid[c][r] = grid[r][c]

#### 2.6 2D Prefix Sum

```python
# Build 2D prefix sum
prefix = [[0]*(C+1) for _ in range(R+1)]
for r in range(R):
    for c in range(C):
        prefix[r+1][c+1] = grid[r][c] + prefix[r][c+1] + prefix[r+1][c] - prefix[r][c]

# Sum of submatrix from (r1,c1) to (r2,c2) inclusive
def submatrix_sum(prefix, r1, c1, r2, c2):
    return (prefix[r2+1][c2+1] - prefix[r1][c2+1] 
            - prefix[r2+1][c1] + prefix[r1][c1])
```

#### 2.7 Multi-source BFS

Initialize the queue with ALL starting cells simultaneously. The BFS frontier expands from all sources at once, giving each cell its distance to the nearest source.

```python
def multi_source_bfs(grid, sources):
    R, C = len(grid), len(grid[0])
    dist = [[-1]*C for _ in range(R)]
    q = deque()
    for r, c in sources:
        dist[r][c] = 0
        q.append((r, c))
    while q:
        r, c = q.popleft()
        for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
            nr, nc = r+dr, c+dc
            if 0 <= nr < R and 0 <= nc < C and dist[nr][nc] == -1:
                dist[nr][nc] = dist[r][c] + 1
                q.append((nr, nc))
    return dist
```

### 3. PROBLEM RECOGNITION

**Common keywords and phrases:**
- "Grid" / "matrix" / "2D array"
- "Maze" / "labyrinth"
- "Shortest path in grid"
- "Island" / "connected components"
- "Flood fill"
- "Number of paths in a grid"
- "Rotate the matrix" / "spiral traversal"
- "Obstacle" / "blocked cells"

**Hidden geometry indicators:**
- "Robot moving on a board" → grid movement simulation
- "Only move right and down" → DP on grid (unique paths)
- "4-directional" or "8-directional" → BFS or DFS
- "Minimum steps" in a grid → BFS (unweighted) or Dijkstra (weighted)
- "Number of ways to reach" → combinatorial DP

### 4. PATTERN ANALYSIS

#### Pattern 1: Grid BFS for Shortest Path

**When to use:** Minimum number of steps to reach a target in an unweighted grid.

**Why it works:** BFS explores in order of increasing distance from the source.

**Complexity:** O(R × C).

**Common mistakes:** Forgetting visited set; not checking bounds.

#### Pattern 2: Grid DP for Counting Paths

**When to use:** Count the number of ways to go from top-left to bottom-right, moving only right/down.

**Why it works:** dp[r][c] = dp[r-1][c] + dp[r][c-1] (with obstacles: set dp = 0 at obstacles).

**Complexity:** O(R × C).

**Common mistakes:** Not handling obstacle cells; overflow (use modulo).

#### Pattern 3: Multi-source BFS

**When to use:** Distance from nearest of multiple sources (e.g., nearest 0 for each 1 in 01 Matrix).

**Why it works:** All sources start at distance 0 in the queue; BFS ensures each cell gets distance to nearest source.

**Complexity:** O(R × C).

**Common mistakes:** Initializing distances incorrectly; not using all sources.

#### Pattern 4: Island Counting / Connected Components

**When to use:** Count distinct connected regions in a binary grid.

**Why it works:** DFS or BFS from each unvisited land cell, marking all cells in that component.

**Complexity:** O(R × C).

**Common mistakes:** Not handling edge connections properly; considering diagonal vs 4-directional connectivity.

#### Pattern 5: Grid Transformations (Rotation, Reflection)

**When to use:** Rotating or reflecting a grid / shape.

**Why it works:** Coordinate mapping functions.

**Complexity:** O(R × C).

**Common mistakes:** Off-by-one in mapping; not handling rectangular (non-square) grids correctly for rotation.

### 5. REUSABLE CODING TEMPLATES

#### Grid BFS (Shortest Path, Unweighted)

```python
from collections import deque

def grid_bfs(grid, start, target):
    R, C = len(grid), len(grid[0])
    visited = [[False]*C for _ in range(R)]
    dist = [[0]*C for _ in range(R)]
    q = deque()
    q.append(start)
    visited[start[0]][start[1]] = True
    
    while q:
        r, c = q.popleft()
        if (r, c) == target:
            return dist[r][c]
        for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
            nr, nc = r+dr, c+dc
            if 0 <= nr < R and 0 <= nc < C and not visited[nr][nc] and grid[nr][nc] != 1:
                visited[nr][nc] = True
                dist[nr][nc] = dist[r][c] + 1
                q.append((nr, nc))
    return -1
```

```cpp
int grid_bfs(vector<vector<int>>& grid, pair<int,int> start, pair<int,int> target) {
    int R = grid.size(), C = grid[0].size();
    vector<vector<bool>> visited(R, vector<bool>(C, false));
    vector<vector<int>> dist(R, vector<int>(C, 0));
    queue<pair<int,int>> q;
    q.push(start);
    visited[start.first][start.second] = true;
    
    int dr[] = {1, -1, 0, 0};
    int dc[] = {0, 0, 1, -1};
    
    while (!q.empty()) {
        auto [r, c] = q.front(); q.pop();
        if (r == target.first && c == target.second) return dist[r][c];
        for (int d = 0; d < 4; d++) {
            int nr = r + dr[d], nc = c + dc[d];
            if (nr >= 0 && nr < R && nc >= 0 && nc < C && 
                !visited[nr][nc] && grid[nr][nc] != 1) {
                visited[nr][nc] = true;
                dist[nr][nc] = dist[r][c] + 1;
                q.push({nr, nc});
            }
        }
    }
    return -1;
}
```

```java
public static int gridBFS(int[][] grid, int[] start, int[] target) {
    int R = grid.length, C = grid[0].length;
    boolean[][] visited = new boolean[R][C];
    int[][] dist = new int[R][C];
    Queue<int[]> q = new LinkedList<>();
    q.offer(start);
    visited[start[0]][start[1]] = true;
    
    int[] dr = {1, -1, 0, 0};
    int[] dc = {0, 0, 1, -1};
    
    while (!q.isEmpty()) {
        int[] cur = q.poll();
        int r = cur[0], c = cur[1];
        if (r == target[0] && c == target[1]) return dist[r][c];
        for (int d = 0; d < 4; d++) {
            int nr = r + dr[d], nc = c + dc[d];
            if (nr >= 0 && nr < R && nc >= 0 && nc < C && 
                !visited[nr][nc] && grid[nr][nc] != 1) {
                visited[nr][nc] = true;
                dist[nr][nc] = dist[r][c] + 1;
                q.offer(new int[]{nr, nc});
            }
        }
    }
    return -1;
}
```

#### Grid DFS (Connected Components)

```python
def count_islands(grid):
    R, C = len(grid), len(grid[0])
    visited = [[False]*C for _ in range(R)]
    
    def dfs(r, c):
        if r < 0 or r >= R or c < 0 or c >= C:
            return
        if visited[r][c] or grid[r][c] == 0:
            return
        visited[r][c] = True
        for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
            dfs(r+dr, c+dc)
    
    count = 0
    for r in range(R):
        for c in range(C):
            if grid[r][c] == 1 and not visited[r][c]:
                count += 1
                dfs(r, c)
    return count
```

```cpp
void dfs(vector<vector<int>>& grid, vector<vector<bool>>& visited, int r, int c) {
    int R = grid.size(), C = grid[0].size();
    if (r < 0 || r >= R || c < 0 || c >= C) return;
    if (visited[r][c] || grid[r][c] == 0) return;
    visited[r][c] = true;
    dfs(grid, visited, r+1, c);
    dfs(grid, visited, r-1, c);
    dfs(grid, visited, r, c+1);
    dfs(grid, visited, r, c-1);
}

int count_islands(vector<vector<int>>& grid) {
    int R = grid.size(), C = grid[0].size();
    vector<vector<bool>> visited(R, vector<bool>(C, false));
    int count = 0;
    for (int r = 0; r < R; r++)
        for (int c = 0; c < C; c++)
            if (grid[r][c] == 1 && !visited[r][c]) {
                count++;
                dfs(grid, visited, r, c);
            }
    return count;
}
```

```java
public static int countIslands(int[][] grid) {
    int R = grid.length, C = grid[0].length;
    boolean[][] visited = new boolean[R][C];
    int count = 0;
    for (int r = 0; r < R; r++)
        for (int c = 0; c < C; c++)
            if (grid[r][c] == 1 && !visited[r][c]) {
                count++;
                dfs(grid, visited, r, c);
            }
    return count;
}

static void dfs(int[][] grid, boolean[][] visited, int r, int c) {
    int R = grid.length, C = grid[0].length;
    if (r < 0 || r >= R || c < 0 || c >= C) return;
    if (visited[r][c] || grid[r][c] == 0) return;
    visited[r][c] = true;
    dfs(grid, visited, r+1, c);
    dfs(grid, visited, r-1, c);
    dfs(grid, visited, r, c+1);
    dfs(grid, visited, r, c-1);
}
```

#### Grid Rotation (90° Clockwise)

```python
def rotate_clockwise(grid):
    R, C = len(grid), len(grid[0])
    rotated = [[0]*R for _ in range(C)]
    for r in range(R):
        for c in range(C):
            rotated[c][R-1-r] = grid[r][c]
    return rotated
```

```cpp
vector<vector<int>> rotate_clockwise(vector<vector<int>>& grid) {
    int R = grid.size(), C = grid[0].size();
    vector<vector<int>> rotated(C, vector<int>(R));
    for (int r = 0; r < R; r++)
        for (int c = 0; c < C; c++)
            rotated[c][R-1-r] = grid[r][c];
    return rotated;
}
```

```java
public static int[][] rotateClockwise(int[][] grid) {
    int R = grid.length, C = grid[0].length;
    int[][] rotated = new int[C][R];
    for (int r = 0; r < R; r++)
        for (int c = 0; c < C; c++)
            rotated[c][R-1-r] = grid[r][c];
    return rotated;
}
```

#### Grid Unique Paths DP

```python
def unique_paths(R, C, obstacles=None):
    dp = [[0]*C for _ in range(R)]
    dp[0][0] = 1 if (not obstacles or obstacles[0][0] == 0) else 0
    for r in range(R):
        for c in range(C):
            if obstacles and obstacles[r][c] == 1:
                dp[r][c] = 0
                continue
            if r > 0: dp[r][c] += dp[r-1][c]
            if c > 0: dp[r][c] += dp[r][c-1]
    return dp[R-1][C-1]
```

### 6. CURATED REAL PROBLEMS

| # | Problem Name | Platform | Difficulty | Key Concept | Link |
|---|---|---|---|---|---|
| 1 | 733. Flood Fill | LeetCode | Easy | Grid DFS/BFS | https://leetcode.com/problems/flood-fill/ |
| 2 | 200. Number of Islands | LeetCode | Medium | Grid connected components | https://leetcode.com/problems/number-of-islands/ |
| 3 | 64. Minimum Path Sum | LeetCode | Medium | Grid DP | https://leetcode.com/problems/minimum-path-sum/ |
| 4 | 542. 01 Matrix | LeetCode | Medium | Multi-source BFS | https://leetcode.com/problems/01-matrix/ |
| 5 | ABC 007 C - Maze | AtCoder | Easy (400) | Grid BFS | https://atcoder.jp/contests/abc007/tasks/abc007_c |
| 6 | ABC 176 D - Wizard in Maze | AtCoder | Medium (800) | Grid BFS with warp | https://atcoder.jp/contests/abc176/tasks/abc176_d |
| 7 | Grid Unique Paths | InterviewBit | Easy | Combinatorial paths | https://www.interviewbit.com/problems/grid-unique-paths/ |
| 8 | ABC 335 D - Loong and Takahashi | AtCoder | Medium (600) | Grid spiral traversal | https://atcoder.jp/contests/abc335/tasks/abc335_d |
| 9 | 2087. Minimum Cost Homecoming of a Robot in a Grid | LeetCode | Medium | Manhattan in grid | https://leetcode.com/problems/minimum-cost-homecoming-of-a-robot-in-a-grid/ |
| 10 | 1394. Minimum Path Cost in a Grid | LeetCode | Medium | Grid DP with cost | https://leetcode.com/problems/minimum-path-cost-in-a-grid/ |
| 11 | 2145. Grid Game | LeetCode | Medium | Grid prefix sum | https://leetcode.com/problems/grid-game/ |
| 12 | 2160. Minimum Operations to Make a Uni-Value Grid | LeetCode | Medium | Grid median | https://leetcode.com/problems/minimum-operations-to-make-a-uni-value-grid/ |
| 13 | ABC 337 D - Cheating Gomoku Narabe | AtCoder | Medium (600) | Grid sliding window | https://atcoder.jp/contests/abc337/tasks/abc337_d |
| 14 | 1414. Shortest Path in a Grid with Obstacles Elimination | LeetCode | Hard | BFS with state (k obstacles) | https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/ |
| 15 | 407. Trapping Rain Water II | LeetCode | Hard | Grid Dijkstra / Min-heap | https://leetcode.com/problems/trapping-rain-water-ii/ |

### 7. GENERATED PRACTICE PROBLEMS

**Problem 1: Spiral Walk (Easy)**
Given an R × C grid, start at (0, 0) and walk in a clockwise spiral pattern visiting every cell exactly once. Return the list of coordinates visited in order.

**Problem 2: Island Perimeter (Easy)**
Given a binary grid where 1 = land and 0 = water, compute the total perimeter of all islands (each land cell contributes 4 - number of adjacent land cells).

**Problem 3: Nearest Exit (Medium)**
Given a grid with '.' (empty), '+' (wall), and 'S' (start), find the minimum steps to reach any cell on the boundary (outside). You can only move 4-directionally through empty cells.

**Problem 4: Grid Transformation Matching (Medium)**
Given two binary grids A and B of the same size, determine if A can be transformed into B using any combination of: 90° rotation, horizontal reflection, vertical reflection, and translation (shifting).

**Problem 5: Maximum Submatrix with Sum Zero (Hard)**
Given an R × C grid of integers, find the largest rectangular submatrix whose sum is zero.

**Problem 6: Knight's Minimum Moves (Hard)**
Given a chessboard of size N × N, find the minimum number of knight moves to go from (r1, c1) to (r2, c2). A knight moves in an L-shape: (±1, ±2) or (±2, ±1). N up to 10^5.

**Problem 7: Grid Teleportation (Contest-Style)**
You are on an R × C grid. Cells contain letters 'a'-'z'. When you step on a cell, you can optionally teleport to any other cell with the same letter. Find the minimum steps from start to target.

### 8. COMPLETE SOLUTION SECTION

#### Problem 1: Number of Islands (LeetCode 200)

**Given:** A binary grid of '1's (land) and '0's (water). Count the number of islands. An island is surrounded by water and formed by connecting adjacent lands horizontally or vertically.

**A. Intuition:**
This is a connected components problem on a grid. Each island is a connected component of '1's using 4-directional connectivity.

**B. Brute Force:**
Same as DFS/BFS approach — no truly brute force alternative for counting components.

**C. Optimized Approach:**
Iterate through every cell. When we find unvisited land, increment count and perform DFS/BFS to mark the entire island as visited.

**D. Step-by-Step Explanation:**
1. Initialize visited[R][C] = False, count = 0.
2. For each cell (r, c):
   - If grid[r][c] == '1' and not visited[r][c]:
     - count += 1
     - DFS(r, c): mark current as visited, recursively visit all 4-directional neighbors that are land and unvisited.
3. Return count.

**E. Complexity Analysis:**
- Time: O(R × C) — each cell visited at most once.
- Space: O(R × C) worst case for recursion stack (or visited array).

**F. Edge Cases:**
- Empty grid: return 0.
- All water: return 0.
- All land: return 1.
- Single cell: return grid[0][0] == '1'.
- Diagonal land cells do NOT connect (only 4-dir).

**G. Fully Working Code:**

```python
def num_islands(grid):
    if not grid or not grid[0]:
        return 0
    R, C = len(grid), len(grid[0])
    visited = [[False]*C for _ in range(R)]
    
    def dfs(r, c):
        if r < 0 or r >= R or c < 0 or c >= C:
            return
        if visited[r][c] or grid[r][c] == '0':
            return
        visited[r][c] = True
        dfs(r+1, c)
        dfs(r-1, c)
        dfs(r, c+1)
        dfs(r, c-1)
    
    count = 0
    for r in range(R):
        for c in range(C):
            if grid[r][c] == '1' and not visited[r][c]:
                count += 1
                dfs(r, c)
    return count
```

```cpp
int numIslands(vector<vector<char>>& grid) {
    if (grid.empty() || grid[0].empty()) return 0;
    int R = grid.size(), C = grid[0].size();
    vector<vector<bool>> visited(R, vector<bool>(C, false));
    
    function<void(int,int)> dfs = [&](int r, int c) {
        if (r < 0 || r >= R || c < 0 || c >= C) return;
        if (visited[r][c] || grid[r][c] == '0') return;
        visited[r][c] = true;
        dfs(r+1, c); dfs(r-1, c);
        dfs(r, c+1); dfs(r, c-1);
    };
    
    int count = 0;
    for (int r = 0; r < R; r++)
        for (int c = 0; c < C; c++)
            if (grid[r][c] == '1' && !visited[r][c]) {
                count++;
                dfs(r, c);
            }
    return count;
}
```

```java
public int numIslands(char[][] grid) {
    if (grid == null || grid.length == 0 || grid[0].length == 0) return 0;
    int R = grid.length, C = grid[0].length;
    boolean[][] visited = new boolean[R][C];
    
    int count = 0;
    for (int r = 0; r < R; r++)
        for (int c = 0; c < C; c++)
            if (grid[r][c] == '1' && !visited[r][c]) {
                count++;
                dfs(grid, visited, r, c);
            }
    return count;
}

void dfs(char[][] grid, boolean[][] visited, int r, int c) {
    int R = grid.length, C = grid[0].length;
    if (r < 0 || r >= R || c < 0 || c >= C) return;
    if (visited[r][c] || grid[r][c] == '0') return;
    visited[r][c] = true;
    dfs(grid, visited, r+1, c);
    dfs(grid, visited, r-1, c);
    dfs(grid, visited, r, c+1);
    dfs(grid, visited, r, c-1);
}
```

---

#### Problem 2: 01 Matrix (LeetCode 542)

**Given:** A binary matrix of 0s and 1s. For each cell, find the distance to the nearest 0.

**A. Intuition:**
This is a multi-source BFS problem. Start BFS from ALL 0 cells simultaneously. The distance recorded for each cell is its minimum distance to any 0.

**B. Brute Force:**
For each 1, BFS until we find a 0: O((R*C)^2).

**C. Optimized Approach:**
Multi-source BFS: all 0s are sources with distance 0. Push them all into the queue. BFS processes by expanding level by level, ensuring each cell gets the shortest distance.

**D. Step-by-Step Explanation:**
1. Initialize dist matrix with -1 (unvisited).
2. Push all cells with value 0 into the queue with dist = 0.
3. BFS: pop cell, check 4 neighbors. If neighbor is unvisited, set dist = current dist + 1, push neighbor.
4. Return dist matrix.

**E. Complexity Analysis:**
- Time: O(R × C) — each cell exactly once.
- Space: O(R × C) for queue and dist matrix.

**F. Edge Cases:**
- All zeros: dist is all zeros.
- Single row / single column: still works.
- Large grid: BFS queue may grow large.

**G. Fully Working Code:**

```python
from collections import deque

def update_matrix(mat):
    R, C = len(mat), len(mat[0])
    dist = [[-1]*C for _ in range(R)]
    q = deque()
    
    for r in range(R):
        for c in range(C):
            if mat[r][c] == 0:
                dist[r][c] = 0
                q.append((r, c))
    
    while q:
        r, c = q.popleft()
        for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
            nr, nc = r+dr, c+dc
            if 0 <= nr < R and 0 <= nc < C and dist[nr][nc] == -1:
                dist[nr][nc] = dist[r][c] + 1
                q.append((nr, nc))
    
    return dist
```

```cpp
vector<vector<int>> updateMatrix(vector<vector<int>>& mat) {
    int R = mat.size(), C = mat[0].size();
    vector<vector<int>> dist(R, vector<int>(C, -1));
    queue<pair<int,int>> q;
    
    for (int r = 0; r < R; r++)
        for (int c = 0; c < C; c++)
            if (mat[r][c] == 0) {
                dist[r][c] = 0;
                q.push({r, c});
            }
    
    int dr[] = {1, -1, 0, 0};
    int dc[] = {0, 0, 1, -1};
    
    while (!q.empty()) {
        auto [r, c] = q.front(); q.pop();
        for (int d = 0; d < 4; d++) {
            int nr = r + dr[d], nc = c + dc[d];
            if (nr >= 0 && nr < R && nc >= 0 && nc < C && dist[nr][nc] == -1) {
                dist[nr][nc] = dist[r][c] + 1;
                q.push({nr, nc});
            }
        }
    }
    return dist;
}
```

```java
public int[][] updateMatrix(int[][] mat) {
    int R = mat.length, C = mat[0].length;
    int[][] dist = new int[R][C];
    for (int[] row : dist) Arrays.fill(row, -1);
    Queue<int[]> q = new LinkedList<>();
    
    for (int r = 0; r < R; r++)
        for (int c = 0; c < C; c++)
            if (mat[r][c] == 0) {
                dist[r][c] = 0;
                q.offer(new int[]{r, c});
            }
    
    int[] dr = {1, -1, 0, 0};
    int[] dc = {0, 0, 1, -1};
    
    while (!q.isEmpty()) {
        int[] cur = q.poll();
        int r = cur[0], c = cur[1];
        for (int d = 0; d < 4; d++) {
            int nr = r + dr[d], nc = c + dc[d];
            if (nr >= 0 && nr < R && nc >= 0 && nc < C && dist[nr][nc] == -1) {
                dist[nr][nc] = dist[r][c] + 1;
                q.offer(new int[]{nr, nc});
            }
        }
    }
    return dist;
}
```

---

#### Problem 3: Minimum Path Sum (LeetCode 64)

**Given:** An R × C grid of non-negative integers. Find the path from top-left to bottom-right that minimizes the sum of numbers along the path. You can only move right or down.

**A. Intuition:**
This is a classic DP problem. At each cell, the minimum sum to reach it is the cell's value plus the minimum of the incoming paths (from above or from left).

**B. Brute Force:**
Explore all possible paths: exponential (choose R-1 down moves among R+C-2 total moves = C(R+C-2, R-1) paths).

**C. Optimized Approach (DP):**
dp[r][c] = min(dp[r-1][c], dp[r][c-1]) + grid[r][c].

**D. Step-by-Step Explanation:**
1. Initialize dp[0][0] = grid[0][0].
2. Fill first row: dp[0][c] = dp[0][c-1] + grid[0][c].
3. Fill first column: dp[r][0] = dp[r-1][0] + grid[r][0].
4. For each remaining cell: dp[r][c] = min(dp[r-1][c], dp[r][c-1]) + grid[r][c].
5. Return dp[R-1][C-1].

**E. Complexity Analysis:**
- Time: O(R × C).
- Space: O(R × C) or O(C) with space optimization.

**F. Edge Cases:**
- Single cell: return grid[0][0].
- Single row: only right moves.
- Single column: only down moves.
- Large values: use long/int64.

**G. Fully Working Code:**

```python
def min_path_sum(grid):
    R, C = len(grid), len(grid[0])
    dp = [[0]*C for _ in range(R)]
    dp[0][0] = grid[0][0]
    
    for c in range(1, C):
        dp[0][c] = dp[0][c-1] + grid[0][c]
    for r in range(1, R):
        dp[r][0] = dp[r-1][0] + grid[r][0]
    
    for r in range(1, R):
        for c in range(1, C):
            dp[r][c] = min(dp[r-1][c], dp[r][c-1]) + grid[r][c]
    
    return dp[R-1][C-1]
```

```cpp
int minPathSum(vector<vector<int>>& grid) {
    int R = grid.size(), C = grid[0].size();
    vector<vector<int>> dp(R, vector<int>(C));
    dp[0][0] = grid[0][0];
    
    for (int c = 1; c < C; c++) dp[0][c] = dp[0][c-1] + grid[0][c];
    for (int r = 1; r < R; r++) dp[r][0] = dp[r-1][0] + grid[r][0];
    
    for (int r = 1; r < R; r++)
        for (int c = 1; c < C; c++)
            dp[r][c] = min(dp[r-1][c], dp[r][c-1]) + grid[r][c];
    
    return dp[R-1][C-1];
}
```

```java
public int minPathSum(int[][] grid) {
    int R = grid.length, C = grid[0].length;
    int[][] dp = new int[R][C];
    dp[0][0] = grid[0][0];
    
    for (int c = 1; c < C; c++) dp[0][c] = dp[0][c-1] + grid[0][c];
    for (int r = 1; r < R; r++) dp[r][0] = dp[r-1][0] + grid[r][0];
    
    for (int r = 1; r < R; r++)
        for (int c = 1; c < C; c++)
            dp[r][c] = Math.min(dp[r-1][c], dp[r][c-1]) + grid[r][c];
    
    return dp[R-1][C-1];
}
```

---

#### Problem 4: Flood Fill (LeetCode 733)

**Given:** An R × C grid representing an image. Start at (sr, sc) and change all cells connected 4-directionally with the same starting color to a new color.

**A. Intuition:**
Simple DFS/BFS from the starting cell. Visit all connected cells with the same initial color and change them.

**B. Brute Force:**
Same as DFS/BFS — this is the canonical solution.

**C. Optimized Approach:**
DFS (recursive or iterative) or BFS.

**D. Step-by-Step Explanation:**
1. If grid[sr][sc] == newColor: return grid (no change needed).
2. Store starting color.
3. DFS(sr, sc): if out of bounds, return. If current cell != start color, return. Set current cell = newColor. Recursively visit all 4 neighbors.
4. Return modified grid.

**E. Complexity Analysis:**
- Time: O(R × C) — each cell visited at most once.
- Space: O(R × C) worst-case recursion depth.

**F. Edge Cases:**
- Start color = new color: no change needed (infinite loop if not checked).
- Single cell.
- Non-rectangular grid (all are rectangular).

**G. Fully Working Code:**

```python
def flood_fill(image, sr, sc, new_color):
    R, C = len(image), len(image[0])
    start_color = image[sr][sc]
    if start_color == new_color:
        return image
    
    def dfs(r, c):
        if r < 0 or r >= R or c < 0 or c >= C:
            return
        if image[r][c] != start_color:
            return
        image[r][c] = new_color
        dfs(r+1, c)
        dfs(r-1, c)
        dfs(r, c+1)
        dfs(r, c-1)
    
    dfs(sr, sc)
    return image
```

---

#### Problem 5: Minimum Cost Homecoming of a Robot in a Grid (LeetCode 2087)

**Given:** A robot starts at (sr, sc) and wants to go home at (er, ec). Each row r has a cost rowCosts[r] for moving left/right in that row. Each column c has a cost colCosts[c] for moving up/down in that column. Find minimum total cost.

**A. Intuition:**
Since movement costs are per row/column (not per cell), and the robot cannot move diagonally, the total cost is simply: sum of row costs along the path + sum of column costs along the path. The optimal path is any monotonic path (always moving toward the target).

**B. Brute Force:**
BFS/Dijkstra: O(R*C log(R*C)).

**C. Optimized Approach:**
Sum the costs without needing pathfinding. Total cost = sum of rowCosts between sr and er + sum of colCosts between sc and ec.

**D. Step-by-Step Explanation:**
1. Initialize total = 0.
2. For each row from sr to er (in the direction of er): add rowCosts[row] for each step.
3. For each column from sc to ec (in the direction of ec): add colCosts[col] for each step.
4. Return total.

**E. Complexity Analysis:**
- Time: O(R + C) — iterate over rows and columns traversed.
- Space: O(1).

**F. Edge Cases:**
- Start = home: cost = 0.
- Negative costs: path is still optimal because all monotonic paths have the same cost.

**G. Fully Working Code:**

```python
def min_cost_homecoming(sr, sc, er, ec, row_costs, col_costs):
    total = 0
    step_r = 1 if er >= sr else -1
    step_c = 1 if ec >= sc else -1
    
    for r in range(sr + step_r, er + step_r, step_r):
        total += row_costs[r]
    for c in range(sc + step_c, ec + step_c, step_c):
        total += col_costs[c]
    
    return total
```

---

#### Problem 6: Shortest Path in a Grid with Obstacles Elimination (LeetCode 1293)

**Given:** An R × C grid with 0 = empty, 1 = obstacle. You can eliminate at most k obstacles. Find the minimum steps from (0,0) to (R-1,C-1).

**A. Intuition:**
This is BFS with state (r, c, k_remaining). The state space is R × C × (k+1).

**B. Brute Force:**
BFS without obstacle elimination (treat obstacles as walls): may be impossible.

**C. Optimized Approach:**
BFS with visited[r][c][k] = min steps to reach (r,c) with k eliminations remaining. Use a queue and explore 4-directionally.

**D. Step-by-Step Explanation:**
1. visited[r][c][k] = -1 (unvisited). visited[0][0][k] = 0.
2. BFS queue: (r, c, k_remaining).
3. For each neighbor:
   - If neighbor is obstacle and k > 0: new_k = k - 1, cost = visited[r][c][k] + 1.
   - If neighbor is empty: new_k = k, cost = visited[r][c][k] + 1.
   - If cost < visited[nr][nc][new_k]: update and push.
4. Return min over all k of visited[R-1][C-1][k].

**E. Complexity Analysis:**
- Time: O(R × C × k).
- Space: O(R × C × k).

**F. Edge Cases:**
- k >= min obstacle count on best path.
- No path even with eliminations.
- Start = target.

**G. Fully Working Code:**

```python
from collections import deque

def shortest_path_with_elimination(grid, k):
    R, C = len(grid), len(grid[0])
    if R == 1 and C == 1:
        return 0
    
    INF = 10**9
    dist = [[[INF]*(k+1) for _ in range(C)] for _ in range(R)]
    q = deque()
    
    for kk in range(k+1):
        dist[0][0][kk] = 0
    q.append((0, 0, k))
    
    while q:
        r, c, kk = q.popleft()
        d = dist[r][c][kk]
        
        for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
            nr, nc = r+dr, c+dc
            if 0 <= nr < R and 0 <= nc < C:
                nk = kk - (grid[nr][nc] == 1)
                if nk >= 0 and dist[nr][nc][nk] > d + 1:
                    dist[nr][nc][nk] = d + 1
                    q.append((nr, nc, nk))
    
    ans = min(dist[R-1][C-1])
    return ans if ans != INF else -1
```
