# Geometry and Shape Problems in Data Structures and Algorithms

### From Beginner to Advanced

---

**Generated from 10,692 curated DSA problems across 45+ coding platforms**
**15 chapters covering the complete geometry problem-solving spectrum**

---

*dsa-inventory — Geometry Collection*
*Based on the DSA Inventory problem dataset*

---

## Before You Begin

### Who This Book Is For

This book is designed for **college first-years and self-learners** who have basic data structures knowledge but are new to computational geometry:

- **DSA Interview Candidates** — Prepping for coding interviews at top tech companies
- **Competitive Programmers** — Building geometry problem-solving skills for contests
- **Self-Learners** — Mastering computational geometry from scratch

### Prerequisites

To get the most from this book, you should be comfortable with:

**Programming basics:**
- Variables, loops, arrays, functions in Python, C++, or Java
- Basic recursion and the concept of stacks and queues
- Reading and understanding code in at least one programming language

**Math foundations:**
- Basic algebra: coordinates, equations, variables
- The concept of √ (square root), ² (squaring), and absolute value |x|
- Basic geometry: what points, lines, and shapes are on a coordinate plane

> **Not ready yet?** We recommend brushing up with these free resources:
> - [Khan Academy: Basic Geometry](https://www.khanacademy.org/math/basic-geo) (~3 hours)
> - [Khan Academy: Coordinate Geometry](https://www.khanacademy.org/math/geometry-home/analytic-geometry-topic) (~2 hours)
> - Any introductory programming course covering arrays, loops, and functions

### How This Book Is Structured

Each chapter follows the same format:
1. **Introduction** — What, why, and a mental model for the topic
2. **Core Concepts** — The formulas, algorithms, and visual intuition you need
3. **Problem Recognition** — Keywords and signals to identify problem types in interviews
4. **Pattern Analysis** — Reusable problem-solving patterns with complexity analysis
5. **Reusable Coding Templates** — Code in Python, C++, and Java you can adapt immediately
6. **Curated Real Problems** — Hand-picked problems from LeetCode, Codeforces, and more
7. **Generated Practice Problems** — Original problems to test your understanding
8. **Complete Solution Sections** — Step-by-step solutions with intuition, edge cases, and code

---

### 💡 How to Read This Book

> **New to geometry?** Read chapters 1–5 **in order**. Each builds on the last. Focus on the "Core Concepts" sections and the mental models in "Introduction." Try the Easy practice problems before looking at solutions.
>
> **Prepping for interviews?** Skim chapters 1–2 for fundamentals, then focus on "Problem Recognition" and "Pattern Analysis" in chapters 2–13. Do the Curated Real Problems first.
>
> **Competitive programmer?** Head straight to chapters 13–15 for advanced topics like shape matching, convex hull, and CP-level geometry. Use the "Reusable Coding Templates" as your quick-reference cheat sheet.
>
> **Everyone:** The formula summaries at the end of each chapter make a great quick-reference bookmark.

---

## Table of Contents

| # | Chapter | Problems |
|---|---------|----------|
| 1 | [Points, Lines & the Coordinate Plane](#chapter-1-points-lines--the-coordinate-plane) | 225 |
| 2 | [Distance & Midpoint](#chapter-2-distance--midpoint) | 217 |
| 3 | [Angles, Slope & Orientation](#chapter-3-angles-slope--orientation) | 204 |
| 4 | [Triangles — Classification & Properties](#chapter-4-triangles--classification--properties) | 269 |
| 5 | [Triangles — Area, Counting & DP](#chapter-5-triangles--area-counting--dp) | 150 |
| 6 | [Right Triangles & Pythagorean Theorem](#chapter-6-right-triangles--pythagorean-theorem) | 20 |
| 7 | [Rectangles & Squares — Detection & Properties](#chapter-7-rectangles--squares--detection--properties) | 450 |
| 8 | [Rectangles — Area, Union & Sweep Line](#chapter-8-rectangles--area-union--sweep-line) | 200 |
| 9 | [Circles — Basics & Point Containment](#chapter-9-circles--basics--point-containment) | 4,116 |
| 10 | [Circles — Intersection & Angular Sweep](#chapter-10-circles--intersection--angular-sweep) | 200 |
| 11 | [Polygons — Classification & Area](#chapter-11-polygons--classification--area) | 123 |
| 12 | [Grid-Based Shapes & Flood Fill](#chapter-12-grid-based-shapes--flood-fill) | 402 |
| 13 | [Shape Matching — Rotation & Translation](#chapter-13-shape-matching--rotation--translation) | 100 |
| 14 | [Convex Hull & Computational Geometry](#chapter-14-convex-hull--computational-geometry) | 107 |
| 15 | [Advanced Geometry (CP Level)](#chapter-15-advanced-geometry-cp-level) | 172 |

---

## Chapter 1: Points, Lines & the Coordinate Plane

### 🎯 Learning Objectives

By the end of this chapter, you will be able to:
- Plot and read coordinates on the Cartesian plane
- Compute distances from a point to the axes and origin
- Write the equation of a line in slope-intercept, standard, and parametric forms
- Identify parallel and perpendicular lines from their equations
- Determine whether a point lies on a line
- Handle special cases: vertical lines, horizontal lines, intercepts

### 📖 1. INTRODUCTION

Imagine you are looking at a city map. Every location has an address — a street and an avenue — that tells you exactly where it is. GPS coordinates do the same thing for the entire planet: latitude and longitude define a unique spot on Earth. In mathematics, the **Cartesian coordinate system** is our map. It turns geometric shapes into numbers and equations, which means we can solve geometry problems with algebra and write computer programs that draw shapes, guide robots, or render video game worlds.

If you have ever played a 2D video game, every pixel on the screen lives at a specific (x, y) coordinate. When your character moves right, x increases; when it jumps up, y increases. The game engine is doing coordinate geometry thousands of times per second. This chapter builds the foundation for all of that.

> 📎 [Khan Academy: Coordinate Plane](https://www.khanacademy.org/math/cc-sixth-grade-math/x0267d782:coordinate-plane) — Interactive introduction to plotting points
> 📎 [Wikipedia: Cartesian coordinate system](https://en.wikipedia.org/wiki/Cartesian_coordinate_system) — Comprehensive reference on the history and mathematics
> 📎 [3Blue1Brown: Vectors](https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab) — Visual intuition for coordinates and vectors

### 📚 2. CORE CONCEPTS

#### 2.1 The Cartesian Plane

**Intuition:** Think of a city grid: streets run vertically, avenues run horizontally. Every intersection is defined by a pair of numbers — which avenue and which street. The Cartesian plane is the same idea, except the lines are infinite and we call them *axes*.

**What it computes:** A two-dimensional coordinate system where every point is identified by an ordered pair $(x, y)$.

**How it works (derivation):** Draw a horizontal number line (the **x-axis**) and a vertical number line (the **y-axis**) so they cross at 0. The crossing point is the **origin**, labelled $O(0,0)$. The x-axis measures how far left or right a point is. The y-axis measures how far up or down it is. Positive x is to the right, positive y is upward (by convention).

The two axes divide the plane into four **quadrants**:
- Quadrant I: $x > 0, y > 0$ (north-east)
- Quadrant II: $x < 0, y > 0$ (north-west)
- Quadrant III: $x < 0, y < 0$ (south-west)
- Quadrant IV: $x > 0, y < 0$ (south-east)

**Edge cases:** The origin belongs to no quadrant. Points on the x-axis have $y = 0$. Points on the y-axis have $x = 0$.

**The formula:**
A point is written as $P(x, y)$ where $x$ is the **abscissa** (horizontal coordinate) and $y$ is the **ordinate** (vertical coordinate).

**Code:**
```python
# Representing and plotting a point
class Point:
    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y

    def __repr__(self):
        return f"Point({self.x}, {self.y})"

    def quadrant(self) -> str:
        if self.x > 0 and self.y > 0:
            return "I"
        elif self.x < 0 and self.y > 0:
            return "II"
        elif self.x < 0 and self.y < 0:
            return "III"
        elif self.x > 0 and self.y < 0:
            return "IV"
        else:
            return "On an axis or origin"

# Example
p = Point(3, -2)
print(p)               # Point(3, -2)
print(p.quadrant())    # IV
```

**References:**
> 📎 [Khan Academy: Intro to the Coordinate Plane](https://www.khanacademy.org/math/cc-sixth-grade-math/x0267d782:coordinate-plane/cc-6th-coordinate-plane/v/introduction-to-the-coordinate-plane) — Video walkthrough
> 📎 [Wikipedia: Quadrant](https://en.wikipedia.org/wiki/Quadrant_(plane_geometry)) — Reference on plane quadrants

#### 2.2 Distance from Axes and Origin

**Intuition:** Your distance from a wall is just the shortest path to it — straight across, at a right angle. In the same way, a point's distance from the x-axis is simply how far up or down it is, ignoring how far left or right.

**What it computes:**
- Distance from x-axis: absolute value of the y-coordinate, $|y|$
- Distance from y-axis: absolute value of the x-coordinate, $|x|$
- Distance from origin: straight-line distance using the Pythagorean theorem

**How it works (derivation):**
- The x-axis is the line $y = 0$. Moving straight from a point $(x, y)$ to the x-axis means changing y to 0 while keeping x the same. The distance is $|y - 0| = |y|$.
- Similarly, distance to the y-axis ($x = 0$) is $|x|$.
- For the origin, draw a right triangle: the legs are $|x|$ and $|y|$, and the hypotenuse is the distance from the point to $(0,0)$. By Pythagoras: $d = \sqrt{x^2 + y^2}$.

**Edge cases:**
- If a point lies on the x-axis ($y = 0$), its distance from the x-axis is 0.
- Distance is always non-negative; the absolute value ensures this.
- The origin has distance 0 from itself.

**The formula:**
$$d_{\text{origin}} = \sqrt{x^2 + y^2}$$

**Code:**
```python
import math

def distance_from_origin(p: Point) -> float:
    return math.sqrt(p.x**2 + p.y**2)

def distance_from_x_axis(p: Point) -> float:
    return abs(p.y)

def distance_from_y_axis(p: Point) -> float:
    return abs(p.x)

# Example
p = Point(3, -4)
print(distance_from_origin(p))    # 5.0
print(distance_from_x_axis(p))    # 4
print(distance_from_y_axis(p))    # 3
```

**References:**
> 📎 [Khan Academy: Distance from origin](https://www.khanacademy.org/math/geometry/hs-geo-analytic-geometry/hs-geo-distance-and-midpoints/v/distance-formula) — Derivation of the distance formula

#### 2.3 Slope of a Line

**Intuition:** Slope measures how steep a ramp is. If a ramp rises 2 metres for every 3 metres you walk forward, the slope is $2/3$. A flat road has slope 0. A wall (if you tried to walk up it) has undefined slope — infinite steepness.

**What it computes:** The rate at which $y$ changes as $x$ increases by 1. Slope is the "rise over run" between any two points on the line.

**How it works (derivation):** Take two points on a line, $(x_1, y_1)$ and $(x_2, y_2)$. The rise is the vertical change $y_2 - y_1$. The run is the horizontal change $x_2 - x_1$. Slope is their ratio. Crucially, **this ratio is constant** for any two points on the same straight line — that is what makes a line straight.

**Edge cases:**
- Horizontal lines: rise = 0, slope = 0
- Vertical lines: run = 0, slope is undefined (division by zero)
- Parallel lines: slopes are equal
- Perpendicular lines: slopes are negative reciprocals

**The formula:**
$$m = \frac{y_2 - y_1}{x_2 - x_1}$$

**Code:**
```python
def slope(p1: Point, p2: Point) -> float:
    if p2.x - p1.x == 0:
        raise ValueError("Slope is undefined (vertical line)")
    return (p2.y - p1.y) / (p2.x - p1.x)

# Example
a = Point(1, 2)
b = Point(4, 6)
print(slope(a, b))  # 1.333... (4/3)
```

**References:**
> 📎 [Brilliant: Slope of a Line](https://brilliant.org/wiki/slope-of-a-line/) — Visual explanation with interactive examples

#### 2.4 Slope-Intercept Form ($y = mx + b$)

**Intuition:** This is the "default" way to describe a line. If you know how steep it is (slope $m$) and where it crosses the y-axis (intercept $b$), you know everything about the line.

**What it computes:** For any x value, the corresponding y value on the line.

**How it works (derivation):**
Start with the slope definition: $m = \frac{y - y_1}{x - x_1}$.
If we use the y-intercept $(0, b)$ as our reference point:
$m = \frac{y - b}{x - 0} \implies y - b = mx \implies y = mx + b$.

Every line *except vertical lines* can be written this way. Vertical lines have constant x, so they cannot be expressed as a function $y = f(x)$.

**Edge cases:**
- If $m = 0$, the line is horizontal: $y = b$.
- If $b = 0$, the line passes through the origin: $y = mx$.
- Vertical lines: cannot use this form; use $x = c$ instead.

**The formula:**
$$y = mx + b \quad \text{where } m \text{ is slope and } b \text{ is the y-intercept}$$

**Code:**
```python
class LineSlopeIntercept:
    def __init__(self, m: float, b: float):
        self.m = m  # slope
        self.b = b  # y-intercept

    def y_at(self, x: float) -> float:
        return self.m * x + self.b

    def __repr__(self):
        return f"y = {self.m}x + {self.b}"

# Example: line through (0, 1) with slope 2
line = LineSlopeIntercept(m=2, b=1)
print(line)           # y = 2x + 1
print(line.y_at(3))  # 7
```

**References:**
> 📎 [Khan Academy: Slope-intercept form](https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:forms-of-linear-equations/x2f8bb11595b61c86:slope-intercept-form/v/slope-intercept-form) — Video explanation

#### 2.5 Standard / General Form ($ax + by + c = 0$)

**Intuition:** The slope-intercept form fails for vertical lines. The standard form handles all lines — horizontal, vertical, and slanted — with one uniform equation.

**What it computes:** Whether a point $(x, y)$ lies on the line (the expression equals 0).

**How it works (derivation):**
Any line can be expressed as $ax + by + c = 0$, where $a$, $b$, and $c$ are constants, and at least one of $a$ or $b$ is non-zero. To convert from slope-intercept:
$$y = mx + b \implies mx - y + b = 0 \implies a = m, b = -1, c = b$$
But more commonly we multiply through to avoid fractions.

The x-intercept occurs when $y = 0$: $ax + c = 0 \implies x = -c/a$ (if $a \neq 0$).
The y-intercept occurs when $x = 0$: $by + c = 0 \implies y = -c/b$ (if $b \neq 0$).
The slope is $-a/b$ (if $b \neq 0$).

**Edge cases:**
- If $a = 0$: horizontal line $by + c = 0 \implies y = -c/b$
- If $b = 0$: vertical line $ax + c = 0 \implies x = -c/a$
- If $c = 0$: line passes through the origin

**The formula:**
$$ax + by + c = 0$$

**Code:**
```python
class LineStandard:
    def __init__(self, a: float, b: float, c: float):
        if a == 0 and b == 0:
            raise ValueError("At least one of a or b must be non-zero")
        self.a = a
        self.b = b
        self.c = c

    def contains(self, p: Point) -> bool:
        # Returns True if point satisfies the equation
        return abs(self.a * p.x + self.b * p.y + self.c) < 1e-9

    def slope(self) -> float:
        if self.b == 0:
            raise ValueError("Slope is undefined (vertical line)")
        return -self.a / self.b

    def x_intercept(self) -> float:
        if self.a == 0:
            raise ValueError("No x-intercept (horizontal line)")
        return -self.c / self.a

    def y_intercept(self) -> float:
        if self.b == 0:
            raise ValueError("No y-intercept (vertical line)")
        return -self.c / self.b

# Example: 2x + 3y - 6 = 0
line = LineStandard(2, 3, -6)
print(line.contains(Point(3, 0)))   # True  (2*3 + 3*0 - 6 = 0)
print(line.contains(Point(1, 1)))   # False (2*1 + 3*1 - 6 = -1)
print(line.x_intercept())           # 3.0
print(line.y_intercept())           # 2.0
```

**References:**
> 📎 [Wikipedia: Linear equation](https://en.wikipedia.org/wiki/Linear_equation) — Standard form and general form of linear equations

#### 2.6 Vertical and Horizontal Lines

**Intuition:** Imagine a wall — every point on that wall has the same x-coordinate (same distance from the side wall). That is a vertical line. The horizon is a horizontal line — every point has the same y-coordinate.

**What they are:**
- Horizontal line: $y = c$ (slope = 0)
- Vertical line: $x = c$ (slope is undefined)

**How it works:** In $y = mx + b$, setting $m = 0$ gives $y = b$ — a horizontal line. But no finite $m$ can produce a vertical line. In standard form $ax + by + c = 0$:
- $a = 0$ gives $by + c = 0 \implies y = -c/b$ (horizontal)
- $b = 0$ gives $ax + c = 0 \implies x = -c/a$ (vertical)

**Edge cases:**
- A horizontal line has no x-intercept (unless $c = 0$, in which case it is the x-axis itself, $y = 0$).
- A vertical line has no y-intercept (unless $c = 0$, the y-axis itself, $x = 0$).

**The formula:**
$$y = c \quad \text{(horizontal)} \qquad x = c \quad \text{(vertical)}$$

**Code:**
```python
def is_horizontal(line: LineStandard) -> bool:
    return line.b != 0 and line.a == 0

def is_vertical(line: LineStandard) -> bool:
    return line.a != 0 and line.b == 0

# Example
h = LineStandard(0, 2, -4)   # 2y - 4 = 0 -> y = 2
v = LineStandard(3, 0, 6)    # 3x + 6 = 0 -> x = -2
print(is_horizontal(h))       # True
print(is_vertical(v))         # True
```

**References:**
> 📎 [Khan Academy: Horizontal and vertical lines](https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:linear-equations-graphs/x2f8bb11595b61c86:horizontal-vertical-lines/v/horizontal-and-vertical-lines) — Quick video explanation

#### 2.7 Parallel and Perpendicular Lines

**Intuition:** Railroad tracks are parallel — they stay the same distance apart forever. The corner of a sheet of paper is perpendicular — the two edges meet at a 90° angle.

**What they are:**
- **Parallel:** Two lines that never intersect (same slope).
- **Perpendicular:** Two lines that intersect at a right angle (slopes are negative reciprocals).

**How it works (derivation):**
- Parallel: if $m_1 = m_2$, the lines rise at the same rate and never cross.
- Perpendicular: if one line rises $a$ units for every $b$ units of run (slope $a/b$), a perpendicular line must fall $b$ units for every $a$ units of run (slope $-b/a$). Their product: $(a/b) \times (-b/a) = -1$.

In standard form:
- Parallel: $\frac{a_1}{b_1} = \frac{a_2}{b_2}$ (same slope)
- Perpendicular: $a_1 a_2 + b_1 b_2 = 0$ (dot product of normal vectors is zero)

**Edge cases:**
- A horizontal line ($m = 0$) is perpendicular to a vertical line (undefined slope). The formula $m_1 \cdot m_2 = -1$ does not apply here since vertical slope is undefined.
- A line is parallel to itself.
- Two vertical lines are parallel (both undefined slope).

**The formula:**
$$\text{Parallel: } m_1 = m_2 \qquad \text{Perpendicular: } m_1 \cdot m_2 = -1$$

**Code:**
```python
def are_parallel(l1: LineStandard, l2: LineStandard) -> bool:
    return abs(l1.a * l2.b - l2.a * l1.b) < 1e-9

def are_perpendicular(l1: LineStandard, l2: LineStandard) -> bool:
    return abs(l1.a * l2.a + l1.b * l2.b) < 1e-9

# Example
l1 = LineStandard(1, -2, 0)    # y = 0.5x
l2 = LineStandard(1, -2, 5)    # y = 0.5x + 2.5 (parallel)
l3 = LineStandard(2, 1, 0)     # y = -2x (perpendicular to l1)

print(are_parallel(l1, l2))     # True
print(are_perpendicular(l1, l3)) # True
```

**References:**
> 📎 [Brilliant: Parallel and Perpendicular Lines](https://brilliant.org/wiki/parallel-and-perpendicular-lines/) — Interactive exercises
> 📎 [Khan Academy: Parallel and Perpendicular Lines](https://www.khanacademy.org/math/geometry/hs-geo-analytic-geometry/hs-geo-parallel-perpendicular-lines/v/parallel-and-perpendicular-lines-intro) — Foundational video

#### 2.8 Parametric Form of a Line

**Intuition:** Instead of describing a line with one equation, think of it as a path: "Start at this point and walk in this direction." The parametric form gives you the exact location after $t$ steps.

**What it computes:** The coordinates of every point on the line as a function of a parameter $t$.

**How it works (derivation):**
Pick a point $P_0(x_0, y_0)$ on the line. Pick a direction vector $\vec{v} = (v_x, v_y)$ that points along the line. Then every point on the line can be reached by starting at $P_0$ and moving some multiple $t$ of $\vec{v}$:
$$x = x_0 + t \cdot v_x$$
$$y = y_0 + t \cdot v_y$$

When $t = 0$, you are at $P_0$. When $t = 1$, you are at $P_0 + \vec{v}$. Negative $t$ goes backward. This is extremely useful in computer graphics (ray tracing, animation) and physics (projectile motion).

**Edge cases:**
- Any scaling of $\vec{v}$ still represents the same line (different parametrization).
- If $v_x = 0$ and $v_y = 0$, this is not a direction vector — it degenerates to a point.
- The same line can be represented by infinitely many parametric equations.

**The formula:**
$$(x, y) = (x_0, y_0) + t \cdot (v_x, v_y)$$

**Code:**
```python
class ParametricLine:
    def __init__(self, x0: float, y0: float, vx: float, vy: float):
        self.x0 = x0
        self.y0 = y0
        self.vx = vx
        self.vy = vy

    def at(self, t: float) -> Point:
        return Point(self.x0 + t * self.vx, self.y0 + t * self.vy)

    def slope(self) -> float:
        if self.vx == 0:
            raise ValueError("Vertical line (undefined slope)")
        return self.vy / self.vx

# Example: line through (1, 2) with direction (3, 4)
line = ParametricLine(1, 2, 3, 4)
print(line.at(0))    # Point(1, 2)
print(line.at(1))    # Point(4, 6)
print(line.at(-1))   # Point(-2, -2)
```

**References:**
> 📎 [Wikipedia: Parametric equation](https://en.wikipedia.org/wiki/Parametric_equation) — General reference for parametric representation

#### 2.9 X-Intercept and Y-Intercept

**Intuition:** Imagine a ball thrown across a field. Where does it leave the ground (y = 0)? That is the x-intercept. Where would it be at time 0 (x = 0)? That is the y-intercept. Intercepts tell you where a line crosses the axes.

**What they are:**
- **X-intercept:** the point $(x_0, 0)$ where the line crosses the x-axis.
- **Y-intercept:** the point $(0, y_0)$ where the line crosses the y-axis.

**How it works:**
- For $y = mx + b$: set $y = 0$ to find x-intercept: $0 = mx + b \implies x = -b/m$. The y-intercept is simply $b$ (by definition).
- For $ax + by + c = 0$:
  - X-intercept: set $y = 0 \implies ax + c = 0 \implies x = -c/a$
  - Y-intercept: set $x = 0 \implies by + c = 0 \implies y = -c/b$

**Edge cases:**
- Horizontal line $y = c$ ($c \neq 0$) has no x-intercept (it never crosses the x-axis).
- Vertical line $x = c$ ($c \neq 0$) has no y-intercept.
- When $c = 0$ in standard form, the line passes through origin: both intercepts are 0.

**The formula:**
$$\text{X-intercept: } \left(-\frac{c}{a}, 0\right) \qquad \text{Y-intercept: } \left(0, -\frac{c}{b}\right)$$

**Code:**
```python
def intercepts(line: LineStandard):
    xi = None
    yi = None
    if line.a != 0:
        xi = -line.c / line.a
    if line.b != 0:
        yi = -line.c / line.b
    return xi, yi

line = LineStandard(2, 3, -6)
print(intercepts(line))  # (3.0, 2.0)
```

**References:**
> 📎 [Khan Academy: Intercepts](https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:linear-equations-graphs/x2f8bb11595b61c86:x-intercepts-and-y-intercepts/v/introduction-to-intercepts) — Introduction to intercepts

### 🔍 3. PROBLEM RECOGNITION

**Keywords that signal this type of problem:**
- "Line passing through"
- "Plot the point"
- "Slope of"
- "Parallel / perpendicular"
- "Intercept"
- "Parametric equation of a line"
- "In which quadrant"
- "Find the equation of"
- "Distance from the axis"

**How interviewers frame these:**
- "Find the equation of the line that passes through (2, 3) and is parallel to y = 4x + 1"
- "Determine whether point P lies on line L"
- "What is the slope of the line perpendicular to ax + by + c = 0?"
- "Find the parametric equation of the line through P and Q"
- "In which quadrant does the point (-3, 5) lie?"

**Hidden geometry indicators:**
- Any problem that mentions "collinear" involves checking if points lie on the same line (slope equality)
- "Midpoint", "distance", "reflection" all implicitly involve coordinates
- "Symmetric about an axis" means the axis acts as a mirror
- "Locus of points" often means finding all points satisfying a condition (which could be a line)

### 🧩 4. PATTERN ANALYSIS

#### Pattern 1: Finding the Equation Given Two Points
- **When to use:** You are given two points and need the line through them.
- **Complexity:** O(1)
- **Key insight:** Compute slope $m = (y_2 - y_1)/(x_2 - x_1)$, then plug one point into $y - y_1 = m(x - x_1)$ (point-slope form). Watch for the special case where $x_1 = x_2$ (vertical line: $x = x_1$).

#### Pattern 2: Parallel / Perpendicular Conditions
- **When to use:** A problem asks for a line parallel or perpendicular to a given line.
- **Complexity:** O(1)
- **Key insight:** Parallel preserves the slope ($m_2 = m_1$). Perpendicular uses negative reciprocal ($m_2 = -1/m_1$). For vertical lines, perpendicular means horizontal and vice versa.

#### Pattern 3: Point on a Line Verification
- **When to use:** Asked "does this point lie on this line?" or equivalently "are three points collinear?"
- **Complexity:** O(1)
- **Key insight:** Plug the coordinates into the line equation. If it satisfies the equation (equals 0 in standard form), the point is on the line. For collinearity of three points, check if the slopes between pairs are equal.

#### Pattern 4: Intercept-Based Problems
- **When to use:** Problems mention x-intercept, y-intercept, or the line cuts the axes at specific points.
- **Complexity:** O(1)
- **Key insight:** The intercept form $x/x_0 + y/y_0 = 1$ is often the fastest route when you know both intercepts. Convert to standard form by multiplying through.

### ⚡ 5. BRUTE FORCE → OPTIMIZED SOLUTIONS

#### Problem 1: Find the Equation from Two Points
**Source:** Common interview / contest warm-up | Any platform

**A. Intuition:** Two points determine a line. Compute the slope, then find the intercept.

**B. Brute Force:**
```python
def line_from_points_brutal(p1: Point, p2: Point):
    # Try all possible m, b? No — just use formulas.
    # "Brute force" here means handling every case exhaustively.
    if p1.x == p2.x:
        return f"x = {p1.x}"
    m = (p2.y - p1.y) / (p2.x - p1.x)
    b = p1.y - m * p1.x
    return LineSlopeIntercept(m, b)
```
Complexity: O(1)

**C. Why Slow:** It is not slow — this is an O(1) formula. The real issue is correctly handling all edge cases (vertical lines, floating point precision).

**D. Step-by-Step Optimization:**
1. Check for vertical line ($x_1 = x_2$) — return immediately.
2. Compute slope using float division.
3. Solve for intercept using point-slope form.
4. Return unified representation (standard form avoids special cases).

**E. Final Optimized:**
```python
def line_from_points(p1: Point, p2: Point) -> LineStandard:
    # Standard form handles all cases uniformly
    a = p2.y - p1.y
    b = p1.x - p2.x
    c = p2.x * p1.y - p1.x * p2.y
    # Normalize to avoid sign inconsistencies
    if a < 0 or (a == 0 and b < 0):
        a, b, c = -a, -b, -c
    return LineStandard(a, b, c)

# Usage
line = line_from_points(Point(1, 2), Point(4, 6))
# ax + by + c = 0
print(line.a, line.b, line.c)  # -4 3 2 (or 4 -3 -2 after normalization)
```
Complexity: O(1)

**F. Edge Cases:**
- Both points identical → infinite lines pass through (handle by checking).
- Vertical lines ($x_1 = x_2$) → $b = 0$ case in standard form.
- Integer overflow: use fractions or decimals for large coordinates.

**G. Code (C++/Java):**
```cpp
#include <tuple>
struct Point { double x, y; };
struct Line { double a, b, c; };

Line lineFromPoints(Point p1, Point p2) {
    double a = p2.y - p1.y;
    double b = p1.x - p2.x;
    double c = p2.x * p1.y - p1.x * p2.y;
    if (a < 0 || (a == 0 && b < 0)) { a = -a; b = -b; c = -c; }
    return {a, b, c};
}
```

#### Problem 2: Check if Three Points are Collinear
**Source:** Common coding challenge | HackerRank, LeetCode, Codeforces

**A. Intuition:** Three points are collinear if they all lie on the same line. Equivalent: the area of the triangle they form is zero.

**B. Brute Force:**
```python
def collinear_brute(p1: Point, p2: Point, p3: Point):
    # Compute equation of line through p1, p2, then check p3
    line = line_from_points(p1, p2)
    return line.contains(p3)
```
Complexity: O(1)

**C. Why Slow:** It is not slow. But using the line equation introduces floating-point error. The cross-product method (area = 0) is more robust.

**D. Step-by-Step Optimization:**
1. Compute the cross product: $(p_2 - p_1) \times (p_3 - p_2) = (x_2 - x_1)(y_3 - y_2) - (y_2 - y_1)(x_3 - x_2)$.
2. If it is 0 (within tolerance), the points are collinear.
3. This avoids division (no slope = no division by zero).

**E. Final Optimized:**
```python
def collinear(p1: Point, p2: Point, p3: Point, eps: float = 1e-9) -> bool:
    # Cross product = (p2 - p1) x (p3 - p2)
    cross = (p2.x - p1.x) * (p3.y - p2.y) - (p2.y - p1.y) * (p3.x - p2.x)
    return abs(cross) < eps

# Examples
print(collinear(Point(0, 0), Point(1, 1), Point(2, 2)))   # True
print(collinear(Point(0, 0), Point(1, 1), Point(2, 3)))   # False
```
Complexity: O(1)

**F. Edge Cases:**
- Identical points: cross product is 0, correctly identified as collinear.
- Large coordinates: use integer arithmetic when coordinates are integers (no floating-point error).

**G. Code (C++/Java):**
```cpp
bool collinear(Point p1, Point p2, Point p3) {
    double cross = (p2.x - p1.x) * (p3.y - p2.y) -
                   (p2.y - p1.y) * (p3.x - p2.x);
    return abs(cross) < 1e-9;
}
```

### 🏆 6. CURATED PROBLEMS

| # | Problem | Platform | Difficulty | URL | Concepts |
|---|---------|----------|------------|-----|----------|
| 1 | Points on a Line | LeetCode | Medium | https://leetcode.com/problems/max-points-on-a-line/ | Collinearity, slope, hashmap |
| 2 | Parallel Lines | Codeforces | 1200 | https://codeforces.com/problemset/problem/1142/A | Parallel lines, conditions |
| 3 | Equation of Line | GeeksforGeeks | Easy | https://www.geeksforgeeks.org/program-find-equation-plane-passing-given-points/ | Line through points |
| 4 | Check if points are collinear | GeeksforGeeks | Easy | https://www.geeksforgeeks.org/program-check-three-points-collinear/ | Collinearity, cross product |
| 5 | Minimum Lines to Represent Points | LeetCode | Medium | https://leetcode.com/problems/minimum-lines-to-represent-a-line-chart/ | Lines, slope grouping |
| 6 | Check If It Is a Straight Line | LeetCode | Easy | https://leetcode.com/problems/check-if-it-is-a-straight-line/ | Collinearity |
| 7 | Quadrant of a point | GeeksforGeeks | Easy | https://www.geeksforgeeks.org/find-quadrant-of-the-coordinate-point/ | Quadrants |
| 8 | Reflect a point across a line | AtCoder | ABC | https://atcoder.jp/contests/abc/tasks/abcxxx | Reflection, line geometry |
| 9 | Intersection of two lines | CSES | Easy | https://cses.fi/problemset/task/2189 | Line intersection |
| 10 | Line Segment Intersection | CSES | Medium | https://cses.fi/problemset/task/2190 | Segment intersection geometry |
| 11 | The Lazy Student | Codeforces | 1500 | https://codeforces.com/problemset/problem/1189/C | Line properties |
| 12 | Points and Minimum Distance | CodeChef | Easy | https://www.codechef.com/problems/POINTS | Coordinate geometry basics |

### ✏️ 7. PRACTICE PROBLEMS

#### Easy 1: Identify the Quadrant
Write a function that takes a point $(x, y)$ and returns the quadrant (I, II, III, IV) or "axis" if it lies on an axis.

**Solution:** Check signs of x and y as described in Section 2.1. Return accordingly.

```python
def quadrant(x: float, y: float) -> str:
    if x == 0 or y == 0:
        return "axis"
    if x > 0 and y > 0:
        return "I"
    if x < 0 and y > 0:
        return "II"
    if x < 0 and y < 0:
        return "III"
    return "IV"
```

#### Easy 2: Distance from the Y-Axis
Given a point, compute its distance from the y-axis.

**Solution:** Distance from the y-axis is $|x|$.

```python
def distance_from_y_axis(x: float, y: float) -> float:
    return abs(x)
```

#### Medium 3: Check if Points Lie on Same Line
Given an array of points, determine if they are all collinear.

**Solution:** Take the first two points that are not identical. Compute the line. Check every other point.

```python
def all_collinear(points: list[Point]) -> bool:
    if len(points) < 3:
        return True
    # Find first two distinct points
    anchor = None
    for p in points[1:]:
        if abs(p.x - points[0].x) > 1e-9 or abs(p.y - points[0].y) > 1e-9:
            anchor = p
            break
    if anchor is None:
        return True  # all points are the same

    line = line_from_points(points[0], anchor)
    return all(line.contains(p) for p in points)
```

#### Medium 4: Find the Line Through a Point Parallel to a Given Line
Given the equation of a line $L$ in standard form $ax + by + c = 0$ and a point $P(x_0, y_0)$, find the line through $P$ parallel to $L$.

**Solution:** Parallel lines share the same $(a, b)$ coefficients. Only $c$ changes. Plug $P$ into $ax + by + c' = 0$ to solve for $c'$: $c' = -(ax_0 + by_0)$.

```python
def parallel_line(line: LineStandard, p: Point) -> LineStandard:
    return LineStandard(line.a, line.b, -(line.a * p.x + line.b * p.y))
```

#### Hard 5: Max Points on a Line
Given $n$ points in a plane, find the maximum number of points that lie on the same straight line.

**Solution:** For each point, treat it as the origin and compute the slope to every other point. Group by slope using a hash map (handle vertical lines separately). The maximum group size + 1 is the answer for that point. Repeat for all points.

```python
from collections import defaultdict
import math

def max_points_on_line(points: list[Point]) -> int:
    n = len(points)
    if n < 3:
        return n

    best = 0
    for i in range(n):
        slopes = defaultdict(int)
        same_point = 1
        for j in range(n):
            if i == j:
                continue
            dx = points[j].x - points[i].x
            dy = points[j].y - points[i].y
            if dx == 0 and dy == 0:
                same_point += 1
                continue
            # Normalize slope using reduced fraction
            g = math.gcd(int(dx), int(dy)) if hasattr(math, 'gcd') else 1
            # For Python 3.5+: use math.gcd
            g = math.gcd(dx, dy) if dx != 0 else dy
            # Actually, proper slope key using fraction tuple
            if dx == 0:
                key = (0, 1)  # vertical
            else:
                g = math.gcd(int(dx), int(dy))
                key = (dx // g, dy // g)
            slopes[key] += 1
        best = max(best, (max(slopes.values()) if slopes else 0) + same_point)
    return best
```

*Note: This is the classic "max points on a line" problem (LeetCode 149). The slope grouping using reduced fractions avoids floating-point precision issues.*

### 📝 8. CHAPTER QUIZ

1. **In which quadrant does the point $(-5, 3)$ lie?**
   - A) Quadrant I
   - B) Quadrant II
   - C) Quadrant III
   - D) Quadrant IV

<details>
<summary>Answer</summary>
B — $x < 0, y > 0$ places it in Quadrant II.
</details>

2. **What is the distance from the origin of the point $(6, 8)$?**
   - A) 10
   - B) 14
   - C) 100
   - D) 48

<details>
<summary>Answer</summary>
A — $\sqrt{6^2 + 8^2} = \sqrt{36 + 64} = \sqrt{100} = 10$.
</details>

3. **What is the slope of the line $3x + 6y - 9 = 0$?**
   - A) $-\frac{1}{2}$
   - B) $\frac{1}{2}$
   - C) $-2$
   - D) $2$

<details>
<summary>Answer</summary>
A — In standard form $ax + by + c = 0$, slope $m = -a/b = -3/6 = -1/2$.
</details>

4. **Which of the following lines is parallel to $y = 2x + 5$?**
   - A) $y = -2x + 3$
   - B) $y = 2x - 1$
   - C) $y = \frac{1}{2}x + 5$
   - D) $y = - \frac{1}{2}x + 5$

<details>
<summary>Answer</summary>
B — Parallel lines have equal slopes. The given line has slope 2. Only option B has slope 2.
</details>

5. **The product of slopes of two perpendicular lines (both non-vertical) is:**
   - A) $0$
   - B) $1$
   - C) $-1$
   - D) Undefined

<details>
<summary>Answer</summary>
C — For perpendicular lines, $m_1 \cdot m_2 = -1$.
</details>

6. **What is the y-intercept of the line $2x - 5y + 10 = 0$?**
   - A) $-2$
   - B) $2$
   - C) $-5$
   - D) $5$

<details>
<summary>Answer</summary>
B — Set $x = 0$: $-5y + 10 = 0 \implies y = 2$.
</details>

7. **Which form can represent a vertical line?**
   - A) $y = mx + b$
   - B) $y = b$
   - C) $x = c$
   - D) None of the above

<details>
<summary>Answer</summary>
C — $x = c$ represents a vertical line. The slope-intercept form cannot represent vertical lines.
</details>

8. **Given point $A(2, 3)$ and direction vector $\vec{v} = (4, 1)$, which point is on the parametric line through $A$?**
   - A) $(6, 4)$ when $t = 1$
   - B) $(10, 5)$ when $t = 2$
   - C) Both A and B
   - D) Neither

<details>
<summary>Answer</summary>
C — For $t=1$: $(2+4, 3+1) = (6, 4)$. For $t=2$: $(2+8, 3+2) = (10, 5)$.
</details>

9. **If two lines have slopes $m_1 = 3$ and $m_2 = 3$, the lines are:**
   - A) Perpendicular
   - B) Intersecting at 45°
   - C) Parallel
   - D) Identical

<details>
<summary>Answer</summary>
C — Equal slopes means parallel. They could also be the same line, but without checking intercepts we only know they are parallel.
</details>

10. **What is the x-coordinate of any point on the y-axis?**
    - A) $0$
    - B) $1$
    - C) Depends on the point
    - D) Undefined

<details>
<summary>Answer</summary>
A — The y-axis is defined by $x = 0$.
</details>

### 🃏 9. FLASHCARDS / KEY TAKEAWAYS

**📌 Cartesian Plane** — A 2D coordinate system with x-axis (horizontal), y-axis (vertical), and origin at their intersection. Every point is $(x, y)$.

**📌 Quadrants** — The four regions of the Cartesian plane: I (+,+), II (−,+), III (−,−), IV (+,−). Axes belong to no quadrant.

**📌 Slope** — "Rise over run." For $(x_1, y_1) \to (x_2, y_2)$, slope $m = (y_2 - y_1)/(x_2 - x_1)$. Horizontal: $m = 0$. Vertical: undefined.

**📌 Slope-Intercept Form** — $y = mx + b$. Cannot represent vertical lines. $b$ is the y-intercept.

**📌 Standard Form** — $ax + by + c = 0$. Handles all lines uniformly. Slope is $-a/b$.

**📌 Parallel Lines** — Same slope. $m_1 = m_2$. Never intersect.

**📌 Perpendicular Lines** — Slopes are negative reciprocals. $m_1 \cdot m_2 = -1$. Does not apply when one line is vertical.

**📌 Parametric Form** — $(x, y) = (x_0, y_0) + t(v_x, v_y)$. Describes a line as a starting point plus a direction scaled by $t$. Great for graphics and physics.

**📌 Intercepts** — X-intercept: where $y = 0$. Y-intercept: where $x = 0$. Horizontal lines (except $y = 0$) have no x-intercept. Vertical lines (except $x = 0$) have no y-intercept.

**📌 Collinearity** — Three or more points lie on the same line. Check via equal slopes or cross product = 0.

### 📎 10. REFERENCES & FURTHER READING

- 📎 [Khan Academy: Coordinate Plane](https://www.khanacademy.org/math/cc-sixth-grade-math/x0267d782:coordinate-plane) — Beginner-friendly interactive lessons
- 📎 [Wikipedia: Cartesian coordinate system](https://en.wikipedia.org/wiki/Cartesian_coordinate_system) — Deep reference with history and applications
- 📎 [Brilliant: Lines](https://brilliant.org/wiki/linear-equations/) — Interactive problem-solving for line equations
- 📎 [3Blue1Brown: Vectors and Coordinate Geometry](https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab) — Visual geometric intuition
- 📎 [Paul's Online Math Notes: Algebra - Lines](https://tutorial.math.lamar.edu/Classes/Alg/Lines.aspx) — Comprehensive written tutorial
- 📎 [Desmos Graphing Calculator](https://www.desmos.com/calculator) — Interactive tool to experiment with lines and points
- 📎 [CP-Algorithms: Basic Geometry](https://cp-algorithms.com/geometry/basic-geometry.html) — Competitive programming geometry foundations
- 📎 [LeetCode Discuss: Max Points on a Line](https://leetcode.com/problems/max-points-on-a-line/discuss/) — Community solutions and explanations
## Chapter 2: Distance & Midpoint

### 🎯 Learning Objectives

By the end of this chapter, you will be able to:
- Compute Euclidean distance between two points and understand its Pythagorean roots
- Distinguish between Euclidean, Manhattan, and Chebyshev distance metrics
- Choose the right distance metric for a given application (pathfinding, KNN, chess)
- Use squared distance to avoid expensive square root operations
- Find the midpoint of a segment and apply it in geometric problems
- Compute the perpendicular distance from a point to a line
- Relate Manhattan and Chebyshev distances via a 45° rotation and scaling

### 📖 1. INTRODUCTION

If you ask a GPS navigation app for the shortest driving route between two addresses, it does not give you a straight line through buildings — it computes distance along the grid of city streets. But if you are a pilot flying between two cities, the shortest path **is** a straight line through the air. These are two different notions of "distance" — and both are equally valid, depending on your context.

Distance is the fundamental language of geometry. Every time you compare "how far apart" two things are, you are implicitly choosing a distance metric. In machine learning, the K-Nearest Neighbors algorithm classifies points based on which training examples are "closest." In video games, pathfinding algorithms like A* use distance to decide the best route through a level. In robotics, collision detection uses distance to keep arms from hitting obstacles.

This chapter gives you the full toolkit: the classic Euclidean distance, the city-block Manhattan distance, the chess-inspired Chebyshev distance, and the midpoint formula. By the end, you will know *when* to use each one — and why choosing the wrong metric can give you the wrong answer.

> 📎 [Wikipedia: Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance) — The standard distance we all learn in school
> 📎 [Wikipedia: Taxicab geometry](https://en.wikipedia.org/wiki/Taxicab_geometry) — Distance on a grid (Manhattan distance)
> 📎 [Khan Academy: Distance formula](https://www.khanacademy.org/math/geometry/hs-geo-analytic-geometry/hs-geo-distance-and-midpoints/v/distance-formula) — Interactive derivation from Pythagoras
> 📎 [3Blue1Brown: Pythagorean theorem visual proof](https://www.youtube.com/watch?v=r2G0f6lR8T0) — Beautiful visual intuition for why $a^2 + b^2 = c^2$

### 📚 2. CORE CONCEPTS

#### 2.1 Euclidean Distance

**Intuition:** "As the crow flies." If you draw a straight line between two points on a map, the length of that line is the Euclidean distance. This is the distance you instinctively think of when someone asks "how far apart are these two things?"

**What it computes:** The straight-line distance between two points in the plane.

**How it works (derivation):** Draw a right triangle. The horizontal leg is the difference in x-values ($x_2 - x_1$). The vertical leg is the difference in y-values ($y_2 - y_1$). The straight-line distance is the hypotenuse. By the Pythagorean theorem:
$$d^2 = (x_2 - x_1)^2 + (y_2 - y_1)^2$$
Take the square root of both sides to get $d$.

**Edge cases:**
- Same point: distance is 0.
- Points on the same horizontal line ($y_1 = y_2$): distance = $|x_2 - x_1|$.
- Points on the same vertical line ($x_1 = x_2$): distance = $|y_2 - y_1|$.
- Integers in, irrational out: $\sqrt{1^2 + 1^2} = \sqrt{2}$ (irrational). Use squared distance (Section 2.4) when you only need comparisons.

**The formula:**
$$d_E(P, Q) = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$

**Code:**
```python
import math

def euclidean(p1: Point, p2: Point) -> float:
    dx = p2.x - p1.x
    dy = p2.y - p1.y
    return math.sqrt(dx * dx + dy * dy)

# Example
a = Point(1, 2)
b = Point(4, 6)
print(euclidean(a, b))  # 5.0 (3-4-5 triangle)
```

**References:**
> 📎 [Khan Academy: Distance formula (Pythagorean derivation)](https://www.khanacademy.org/math/geometry/hs-geo-analytic-geometry/hs-geo-distance-and-midpoints/v/distance-formula) — Step-by-step visual walkthrough
> 📎 [Wikipedia: Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance) — Comprehensive mathematical reference

#### 2.2 Manhattan Distance (Taxicab Geometry)

**Intuition:** A taxi driving through a city grid cannot cut diagonally through buildings. It must follow the streets — first go east/west, then go north/south. The total distance travelled is the sum of the horizontal and vertical legs.

**What it computes:** The sum of the absolute differences of the coordinates. Also called $L_1$ distance or taxicab distance.

**How it works (derivation):** How many city blocks must you travel? Count the east-west blocks ($|x_2 - x_1|$) plus the north-south blocks ($|y_2 - y_1|$). That is it — no diagonal shortcuts, no square roots.

**Edge cases:**
- Same point: distance is 0.
- Always at least as large as Euclidean distance (triangle inequality: the direct path is the shortest).
- Can be computed purely with integer arithmetic if coordinates are integers — no floating point.
- The set of points at a fixed Manhattan distance from a centre forms a diamond (rotated square), not a circle.

**The formula:**
$$d_M(P, Q) = |x_2 - x_1| + |y_2 - y_1|$$

**Code:**
```python
def manhattan(p1: Point, p2: Point) -> float:
    return abs(p2.x - p1.x) + abs(p2.y - p1.y)

# Example
a = Point(0, 0)
b = Point(3, 4)
print(euclidean(a, b))   # 5.0
print(manhattan(a, b))   # 7.0 (|3| + |4|)
```

**References:**
> 📎 [Wikipedia: Taxicab geometry](https://en.wikipedia.org/wiki/Taxicab_geometry) — History and properties of Manhattan distance
> 📎 [Brilliant: Taxicab Geometry](https://brilliant.org/wiki/taxicab-geometry/) — Interactive exploration with examples

#### 2.3 Chebyshev Distance (Chessboard / $L_\infty$ Metric)

**Intuition:** A king on a chessboard can move one square in any direction — up, down, left, right, or diagonal. To go from one square to another, the minimum number of moves is the Chebyshev distance. A king does not need to break the diagonal into horizontal + vertical moves; it moves diagonally as far as possible.

**What it computes:** The maximum of the absolute differences along each dimension. Also called $L_\infty$ distance, chessboard distance, or supremum metric.

**How it works (derivation):** If you can move diagonally, the number of steps you need is limited by whichever dimension has the larger gap. If two points are 5 columns apart but only 3 rows apart, you can cover 3 of the columns while also covering the 3 rows (diagonal moves), then need 2 more horizontal moves. Total: 5 steps = max(5, 3).

Formally: $d_{Ch}(P, Q) = \max(|x_2 - x_1|, |y_2 - y_1|)$.

**Edge cases:**
- Same point: distance is 0.
- Same as Euclidean when $|dx| = |dy|$ (points on a diagonal).
- The unit "circle" (points at Chebyshev distance 1) is a square aligned with the axes.
- $L_\infty$ is the limit of $L_p$ norms as $p \to \infty$.

**The formula:**
$$d_{Ch}(P, Q) = \max(|x_2 - x_1|, |y_2 - y_1|)$$

**Code:**
```python
def chebyshev(p1: Point, p2: Point) -> float:
    return max(abs(p2.x - p1.x), abs(p2.y - p1.y))

# Example
a = Point(0, 0)
b = Point(3, 4)
print(chebyshev(a, b))   # 4.0 (max(3, 4))
# King needs 4 moves: 3 diagonal + 1 vertical (or 4 diagonal if allowed)
```

**References:**
> 📎 [Wikipedia: Chebyshev distance](https://en.wikipedia.org/wiki/Chebyshev_distance) — Definition and applications in chess, warehouse logistics, and coding theory

#### 2.4 Squared Euclidean Distance

**Intuition:** Square roots are expensive (slow) for computers. If you only need to *compare* which of two distances is larger, you can skip the square root entirely. If $d_1 < d_2$, then $d_1^2 < d_2^2$ (since square root is monotonic for non-negative numbers).

**What it computes:** The square of the Euclidean distance. Not a true distance metric on its own (breaks the triangle inequality), but useful for comparisons.

**How it works (derivation):** Simply drop the $\sqrt{\phantom{x}}$ from the Euclidean formula:
$$d_E^2(P, Q) = (x_2 - x_1)^2 + (y_2 - y_1)^2$$
This is a monotonic transformation: ranking by squared distance is identical to ranking by Euclidean distance.

**Edge cases:**
- **Not a metric:** It violates the triangle inequality (e.g., points 0, 1, and 2: $d^2(0, 2) = 4$, $d^2(0, 1) + d^2(1, 2) = 1 + 1 = 2 < 4$). So you cannot use it in algorithms that rely on metric properties (e.g., some clustering algorithms like DBSCAN).
- Integer results for integer coordinates — no floating-point error.

**The formula:**
$$d_E^2(P, Q) = (x_2 - x_1)^2 + (y_2 - y_1)^2$$

**Code:**
```python
def euclidean_squared(p1: Point, p2: Point) -> float:
    dx = p2.x - p1.x
    dy = p2.y - p1.y
    return dx * dx + dy * dy

# Example: compare which point is closer
p = Point(0, 0)
a = Point(3, 4)
b = Point(5, 1)
print(euclidean_squared(p, a))   # 25
print(euclidean_squared(p, b))   # 26
# a is closer (25 < 26) — same as comparing sqrt(25) vs sqrt(26)
```

**References:**
> 📎 [CP-Algorithms: Distance](https://cp-algorithms.com/geometry/distance.html) — Notes on squared distance optimisation in competitive programming

#### 2.5 Midpoint Formula

**Intuition:** If you have a rope stretched between two points, the midpoint is the spot where you would pinch it to balance it perfectly on your finger. It is the average of the two positions.

**What it computes:** The point exactly halfway between two given points.

**How it works (derivation):** The midpoint is the average of the x-coordinates and the average of the y-coordinates. Why? Consider the x-coordinate alone. A point halfway between $x_1$ and $x_2$ is at $x_1 + \frac{1}{2}(x_2 - x_1) = \frac{x_1 + x_2}{2}$. Same for y. This works because lines are linear — the midpoint in 2D is just the combination of midpoints in each dimension.

**Edge cases:**
- Same point: midpoint equals the point.
- Works with negative coordinates (averaging handles signs correctly).
- The midpoint is also the centre of mass of two equal masses placed at the points.

**The formula:**
$$M(P, Q) = \left(\frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2}\right)$$

**Code:**
```python
def midpoint(p1: Point, p2: Point) -> Point:
    return Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2)

# Example
a = Point(1, 3)
b = Point(7, 5)
m = midpoint(a, b)
print(m)  # Point(4.0, 4.0)
```

**References:**
> 📎 [Khan Academy: Midpoint formula](https://www.khanacademy.org/math/geometry/hs-geo-analytic-geometry/hs-geo-distance-and-midpoints/v/midpoint-formula) — Video derivation with examples

#### 2.6 Distance from a Point to a Line

**Intuition:** Imagine standing a few metres away from a long straight wall. The shortest distance to the wall is measured along a line perpendicular to it — straight at the wall, not at an angle.

**What it computes:** The shortest (perpendicular) distance from a point to a line.

**How it works (derivation):** Given a line in standard form $ax + by + c = 0$ and a point $P(x_0, y_0)$, plug the point into the left side of the equation. The absolute value $|ax_0 + by_0 + c|$ measures how far "off the line" the point is, but scaled by the length of the normal vector $\sqrt{a^2 + b^2}$. Divide by that length to get the perpendicular distance.

Why does this work? The vector $(a, b)$ is perpendicular to the line. The signed distance from $P$ to the line is the projection of $(P - Q)$ (for any point $Q$ on the line) onto the unit normal vector $(a, b)/\sqrt{a^2 + b^2}$.

**Edge cases:**
- Point is on the line: distance is 0.
- For a horizontal line $y = c$ ($a = 0, b = 1, c = -c$): distance = $|y_0 - c|$.
- For a vertical line $x = c$ ($a = 1, b = 0, c = -c$): distance = $|x_0 - c|$.
- The formula gives the perpendicular distance — the true shortest distance.

**The formula:**
$$d_{\text{point-line}}(P, L) = \frac{|ax_0 + by_0 + c|}{\sqrt{a^2 + b^2}}$$

**Code:**
```python
def point_line_distance(p: Point, line: LineStandard) -> float:
    numerator = abs(line.a * p.x + line.b * p.y + line.c)
    denominator = math.sqrt(line.a**2 + line.b**2)
    return numerator / denominator

# Example: point (0, 0) to line 3x + 4y - 10 = 0
line = LineStandard(3, 4, -10)
dist = point_line_distance(Point(0, 0), line)
print(dist)  # 2.0  (|0 + 0 - 10| / 5 = 10/5 = 2)
```

**References:**
> 📎 [Wikipedia: Distance from a point to a line](https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line) — Complete derivation and formula variants
> 📎 [Brilliant: Point-Line Distance](https://brilliant.org/wiki/distance-between-point-and-line/) — Interactive derivation

#### 2.7 The Relationship Between Manhattan and Chebyshev

**Intuition:** If you rotate a square 45°, it becomes a diamond. Manhattan and Chebyshev distances are related by exactly this kind of transformation — plus a scaling factor.

**What it computes:** A way to convert between the two metrics.

**How it works (derivation):**
- **Chebyshev → Manhattan (45° rotation + scaling):** Rotate the coordinate system by 45° and scale by $\sqrt{2}$. The Chebyshev distance in the original system equals the Manhattan distance in the transformed system divided by $\sqrt{2}$. But more practically for programming:
  $$(u, v) = \left(\frac{x + y}{2}, \frac{x - y}{2}\right)$$
  Then $d_{Ch}((x_1, y_1), (x_2, y_2)) = d_M((u_1, v_1), (u_2, v_2)) / 2$.

Wait — let us be precise. The cleaner relationship is:

**Manhattan ↔ Chebyshev (45° rotation):**
If you rotate coordinates by 45° and scale:
$$u = x + y, \quad v = x - y$$
Then:
$$d_M(P, Q) = \max(|u_2 - u_1|, |v_2 - v_1|) = d_{Ch}(U, V)$$
And:
$$d_{Ch}(P, Q) = \frac{1}{2} \cdot (|u_2 - u_1| + |v_2 - v_1|) = \frac{1}{2} \cdot d_M(U, V)$$

This is useful when you have code that efficiently computes one metric but need the other.

**Edge cases:**
- This relationship generalizes to higher dimensions but the transformation changes.
- The conversion factor varies depending on the exact transformation used. The key takeaway is that they are *linearly equivalent* — one is not fundamentally different from the other.

**The formula:**
$$\text{Let } (u, v) = (x + y, x - y). \quad \text{Then } d_{Ch}(P, Q) = \frac{d_M(U, V)}{2}$$

**Code:**
```python
def chebyshev_via_manhattan(p1: Point, p2: Point) -> float:
    # Transform to (u, v) space
    u1 = p1.x + p1.y
    v1 = p1.x - p1.y
    u2 = p2.x + p2.y
    v2 = p2.x - p2.y
    # Manhattan in transformed space / 2
    return (abs(u2 - u1) + abs(v2 - v1)) / 2.0

# Verify
a, b = Point(0, 0), Point(3, 4)
print(chebyshev(a, b))               # 4
print(chebyshev_via_manhattan(a, b)) # 4.0
```

**References:**
> 📎 [Stack Exchange: Relationship between Chebyshev and Manhattan](https://math.stackexchange.com/questions/885828/relation-between-chebyshev-and-manhattan-distance) — Mathematical derivation

#### 2.8 Applications: Closest Pair, KNN, Pathfinding

**What they compute:** Real-world uses of distance metrics.

**A. Closest Pair of Points:**
Given $n$ points, find the pair with the smallest Euclidean distance. A naive O($n^2$) solution checks all pairs. The divide-and-conquer optimisation (O($n \log n$)) uses the fact that only points within a narrow vertical strip near the dividing line need to be checked.

**B. K-Nearest Neighbors (KNN):**
A classification algorithm: to classify a new point, find the $k$ closest training points and take a vote. The choice of distance metric dramatically affects results:
- Euclidean: sensitive to scale, assumes isotropic (circular) influence
- Manhattan: better for high-dimensional data (less "curse of dimensionality")
- Chebyshev: rarely used directly in KNN but useful when all dimensions matter equally

**C. Pathfinding (A* algorithm):**
A* uses a heuristic to estimate remaining distance to the goal. On a grid:
- **Manhattan distance** is admissible (never overestimates) if you can only move in 4 directions (up, down, left, right).
- **Chebyshev distance** is admissible if you can move in 8 directions (including diagonals).
- **Euclidean distance** is admissible but may lead to more explored nodes — still optimal.

**Edge cases:**
- In KNN, if one feature (e.g., salary) has much larger numbers than another (e.g., age), Euclidean distance will be dominated by salary. Always normalize features first.
- In pathfinding, an inadmissible heuristic (overestimates) can still be useful — it may find a solution faster, just not the optimal one.

**The formula:**
N/A — these are algorithms, not single formulas.

**Code:**
```python
# KNN with configurable distance metric
from collections import Counter

def knn(train: list[Point], train_labels: list, test: Point, k: int,
        dist_func=euclidean) -> str:
    distances = []
    for i, p in enumerate(train):
        d = dist_func(p, test)
        distances.append((d, train_labels[i]))
    distances.sort(key=lambda x: x[0])
    k_nearest = [label for _, label in distances[:k]]
    return Counter(k_nearest).most_common(1)[0][0]

# Example: 4-directional A* heuristic
def manhattan_heuristic(a: tuple, b: tuple) -> int:
    return abs(a[0] - b[0]) + abs(a[1] - b[1])
```

**References:**
> 📎 [Wikipedia: K-nearest neighbors algorithm](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm) — Distance metrics in KNN
> 📎 [Red Blob Games: A* Pathfinding](https://www.redblobgames.com/pathfinding/a-star/introduction.html) — Interactive tutorial with distance heuristic comparisons

### 🔍 3. PROBLEM RECOGNITION

**Keywords that signal this type of problem:**
- "Shortest distance between"
- "Euclidean / Manhattan / Chebyshev / taxicab / L1 / L2 / L-infinity"
- "Midpoint"
- "Closest pair"
- "K nearest neighbors"
- "Grid path" / "minimum moves"
- "Distance from a point to a line"
- "City block distance"
- "How far apart"

**How interviewers frame these:**
- "Find the minimum distance between two points in a 2D plane"
- "Given a point and a line, find the shortest distance"
- "A robot moves in 4 directions on a grid. Minimum steps from A to B?"
- "What is the maximum of the absolute differences?"
- "Find the point that minimizes the sum of distances to several given points"
- "Implement KNN from scratch"
- "Closest pair of points (divide and conquer version)"

**Hidden geometry indicators:**
- "Minimum moves a king needs to travel" → Chebyshev distance
- "Taxi / cab / city block" → Manhattan distance
- "Euclidean distance" in the problem name but coordinates are integers → squared distance is safe
- "Shortest distance between two line *segments*" → requires checking point-line distance for endpoints too
- "Perpendicular distance" always means shortest point-to-line distance
- "Grid with diagonal movement allowed" → Chebyshev
- "Grid with only 4-directional movement" → Manhattan
- "Shearing transformation" / "rotation 45°" may hint at Manhattan ↔ Chebyshev conversion

### 🧩 4. PATTERN ANALYSIS

#### Pattern 1: Distance Comparison Without Square Root
- **When to use:** You only need to compare distances (find the closest / farthest pair), not the actual distance value.
- **Complexity:** O(1) per comparison (vs O(1) with sqrt — but avoiding sqrt is ~10-100× faster)
- **Key insight:** Use squared Euclidean distance. Since $d_1 < d_2 \iff d_1^2 < d_2^2$, you skip the expensive square root. This is crucial in closest pair, KNN, and collision detection.

#### Pattern 2: Correct Metric for Grid Pathfinding
- **When to use:** Computing minimum moves between two cells on a grid.
- **Complexity:** O(1)
- **Key insight:** 4-directional movement → Manhattan. 8-directional (including diagonals) → Chebyshev. Free diagonal movement → Chebyshev. Weighted diagonal (cost 1.414 vs 1.0) → Euclidean × scaling.

#### Pattern 3: Midpoint for Symmetry
- **When to use:** Problems about reflection, balancing, centre of mass, or locus where distances are equal.
- **Complexity:** O(1)
- **Key insight:** The midpoint is the average. The set of all points equidistant from two given points is the perpendicular bisector of the segment (the line through the midpoint, perpendicular to the segment).

#### Pattern 4: Point-to-Line Distance
- **When to use:** Problems about shortest distance to a line, collision with a boundary, or determining parallel lines.
- **Complexity:** O(1)
- **Key insight:** Use the standard form $|ax_0 + by_0 + c| / \sqrt{a^2 + b^2}$. For a horizontal or vertical line, this simplifies to $|y_0 - c|$ or $|x_0 - c|$ respectively.

#### Pattern 5: Manhattan ↔ Chebyshev Conversion
- **When to use:** You have an algorithm that works naturally with one metric, but the problem uses the other. Especially useful when you have optimised grid pathfinding code.
- **Complexity:** O(1)
- **Key insight:** The transformation $(u, v) = (x + y, x - y)$ converts Chebyshev to half-Manhattan. This is often used in competitive programming problems involving "diagonal movement on a grid."

### ⚡ 5. BRUTE FORCE → OPTIMIZED SOLUTIONS

#### Problem 1: Closest Pair of Points
**Source:** LeetCode | https://leetcode.com/problems/minimum-distance-between-bst-nodes/ (2D variant)

**A. Intuition:** Check every pair, track the minimum distance. Simple but slow for many points.

**B. Brute Force:**
```python
def closest_pair_brute(points: list[Point]) -> float:
    n = len(points)
    min_dist = float('inf')
    for i in range(n):
        for j in range(i + 1, n):
            d = euclidean(points[i], points[j])
            if d < min_dist:
                min_dist = d
    return min_dist
```
Complexity: O($n^2$)

**C. Why Slow:** Every pair is examined. For 10,000 points, that is ~50 million pairs.

**D. Step-by-Step Optimization:**
1. **Sort** points by x-coordinate.
2. **Divide:** Split the sorted list at the median x into left and right halves. Recursively find the minimum distance in each ($d_L$ and $d_R$).
3. **Combine:** Let $d = \min(d_L, d_R)$. Only points within $d$ of the dividing line could form a closer pair across the halves.
4. **Strip check:** Filter points within the strip, sort by y, then for each point check the next 7 points (not all). The 7 comes from a packing argument: at most 7 points can fit in a $d \times 2d$ rectangle without being closer than $d$.

**E. Final Optimized:**
```python
def closest_pair(points: list[Point]) -> float:
    def dist(p1, p2):
        dx = p1.x - p2.x
        dy = p1.y - p2.y
        return math.sqrt(dx * dx + dy * dy)

    def strip_closest(strip, d):
        strip.sort(key=lambda p: p.y)
        min_d = d
        for i in range(len(strip)):
            for j in range(i + 1, len(strip)):
                if (strip[j].y - strip[i].y) >= min_d:
                    break
                d_ij = dist(strip[i], strip[j])
                if d_ij < min_d:
                    min_d = d_ij
        return min_d

    def recurse(px):
        if len(px) <= 3:
            return closest_pair_brute(px)

        mid = len(px) // 2
        mid_x = px[mid].x
        dl = recurse(px[:mid])
        dr = recurse(px[mid:])
        d = min(dl, dr)

        strip = [p for p in px if abs(p.x - mid_x) < d]
        return min(d, strip_closest(strip, d))

    px = sorted(points, key=lambda p: p.x)
    return recurse(px)
```
Complexity: O($n \log n$)

**F. Edge Cases:**
- Fewer than 2 points: handle separately.
- Duplicate points: distance 0, return immediately.
- Very close points in the strip: the inner loop is bounded by 7 comparisons.

**G. Code (C++/Java):**
```cpp
#include <vector>
#include <algorithm>
#include <cmath>
#include <limits>

struct Point { double x, y; };

double dist(const Point& a, const Point& b) {
    double dx = a.x - b.x, dy = a.y - b.y;
    return std::sqrt(dx * dx + dy * dy);
}

double bruteForce(const std::vector<Point>& points, int l, int r) {
    double minDist = std::numeric_limits<double>::max();
    for (int i = l; i < r; ++i)
        for (int j = i + 1; j < r; ++j)
            minDist = std::min(minDist, dist(points[i], points[j]));
    return minDist;
}

// Main function (simplified — full implementation handles sorting and strip)
double closestPair(std::vector<Point>& points) {
    std::sort(points.begin(), points.end(),
        [](const Point& a, const Point& b) { return a.x < b.x; });
    // ... recursive implementation follows same pattern as Python
}
```

#### Problem 2: K Nearest Neighbors (KNN) from Scratch
**Source:** Common ML coding interview | LeetCode, HackerRank

**A. Intuition:** Find $k$ closest training points by some distance metric and let them vote on the label.

**B. Brute Force:**
```python
def knn_brute(train: list[Point], train_labels: list,
              test: Point, k: int) -> str:
    distances = [(euclidean(train[i], test), train_labels[i])
                 for i in range(len(train))]
    distances.sort(key=lambda x: x[0])
    k_nearest = [label for _, label in distances[:k]]
    return Counter(k_nearest).most_common(1)[0][0]
```
Complexity: O($n \log n$) per query due to sorting

**C. Why Slow:** Sorting all $n$ distances is overkill when we only need the top $k$.

**D. Step-by-Step Optimization:**
1. Use a **max-heap** of size $k$: maintain the $k$ smallest distances seen so far.
2. For each point, compute distance. If heap size < $k$, push it. Else, if distance < heap root (largest in heap), pop root and push new point.
3. At the end, extract labels from the heap for voting. Complexity: O($n \log k$) instead of O($n \log n$).
4. For very large $n$, use a **KD-Tree** (O($\log n$) average per query), but that is beyond this chapter.

**E. Final Optimized:**
```python
import heapq
from collections import Counter

def knn_optimized(train: list[Point], train_labels: list,
                  test: Point, k: int, dist_func=euclidean) -> str:
    heap = []
    for i, p in enumerate(train):
        d = dist_func(p, test)
        if len(heap) < k:
            heapq.heappush(heap, (-d, train_labels[i]))
        elif -heap[0][0] > d:
            heapq.heappop(heap)
            heapq.heappush(heap, (-d, train_labels[i]))
    # Extract labels from heap for voting
    labels = [label for _, label in heap]
    return Counter(labels).most_common(1)[0][0]
```
Complexity: O($n \log k$) per query

**F. Edge Cases:**
- $k = 1$: trivial (just find the single closest point).
- $k = n$: always returns the majority class of the training set.
- Tie in voting: pick the first, pick randomly, or look at $k+1$.
- Distance metric choice matters: normalize features if scales differ.

**G. Code (C++/Java):**
```cpp
#include <queue>
#include <vector>
#include <string>
#include <unordered_map>

using namespace std;
struct Point { double x, y; };

string knn(const vector<Point>& train, const vector<string>& labels,
           Point test, int k) {
    // Max-heap by distance (negative for max-heap in C++)
    priority_queue<pair<double, string>> pq;
    for (size_t i = 0; i < train.size(); ++i) {
        double d = euclidean(train[i], test);
        pq.push({d, labels[i]});
        if ((int)pq.size() > k) pq.pop();
    }
    unordered_map<string, int> votes;
    while (!pq.empty()) {
        votes[pq.top().second]++;
        pq.pop();
    }
    string best;
    int maxVotes = 0;
    for (auto& [label, count] : votes)
        if (count > maxVotes) { maxVotes = count; best = label; }
    return best;
}
```

### 🏆 6. CURATED PROBLEMS

| # | Problem | Platform | Difficulty | URL | Concepts |
|---|---------|----------|------------|-----|----------|
| 1 | K Closest Points to Origin | LeetCode | Medium | https://leetcode.com/problems/k-closest-points-to-origin/ | Euclidean distance, heap |
| 2 | Minimum Time Visiting All Points | LeetCode | Easy | https://leetcode.com/problems/minimum-time-visiting-all-points/ | Chebyshev distance |
| 3 | Manhattan Distance | Codeforces | 1000 | https://codeforces.com/problemset/problem/1613/A | Manhattan, grid |
| 4 | Closest Pair of Points | GeeksforGeeks | Hard | https://www.geeksforgeeks.org/closest-pair-of-points/ | Divide and conquer, Euclidean |
| 5 | Minimum Distance Between BST Nodes | LeetCode | Easy | https://leetcode.com/problems/minimum-distance-between-bst-nodes/ | Point-to-point distance |
| 6 | The Closest Distance | CSES | Medium | https://cses.fi/problemset/task/2191 | Closest pair |
| 7 | Shortest Distance to a Character | LeetCode | Easy | https://leetcode.com/problems/shortest-distance-to-a-character/ | Minimal absolute difference |
| 8 | Minimum Moves to Equal Array Elements II | LeetCode | Medium | https://leetcode.com/problems/minimum-moves-to-equal-array-elements-ii/ | Manhattan, median |
| 9 | Distance from a point to a line | GeeksforGeeks | Medium | https://www.geeksforgeeks.org/perpendicular-distance-between-a-point-and-a-line-in-2-d/ | Point-line distance |
| 10 | K-Nearest Neighbors | HackerRank | Medium | https://www.hackerrank.com/challenges/k-nearest-neighbors | KNN, distance metrics |
| 11 | Check if a point is inside a circle | CodeChef | Easy | https://www.codechef.com/problems/POINT | Squared distance comparison |
| 12 | Minimum Distance | Baekjoon | Silver 5 | https://www.acmicpc.net/problem/2231 | Distance metrics |
| 13 | A* Pathfinding | Various | Medium | Various (tutorials) | Manhattan/Chebyshev heuristic |
| 14 | Taxicab Geometry | Project Euler | Easy | https://projecteuler.net/problem=xxx | Manhattan distance |
| 15 | Reflect a Point over a Line | LeetCode | Medium | https://leetcode.com/problems/reflect-a-point-over-a-line/ | Midpoint, distance to line |

### ✏️ 7. PRACTICE PROBLEMS

#### Easy 1: K Closest Points to Origin
Given an array of $(x, y)$ points, return the $k$ closest points to the origin $(0, 0)$.

**Solution:** Compute squared distances (avoid sqrt), use a max-heap of size $k$.

```python
def k_closest(points: list[Point], k: int) -> list[Point]:
    heap = []
    for p in points:
        d2 = p.x * p.x + p.y * p.y
        if len(heap) < k:
            heapq.heappush(heap, (-d2, p))
        elif -heap[0][0] > d2:
            heapq.heappop(heap)
            heapq.heappush(heap, (-d2, p))
    return [p for _, p in heap]
```

#### Easy 2: Minimum Time Visiting All Points
On a 2D grid where you can move in 8 directions (including diagonals), find the minimum time to visit a sequence of points in order.

**Solution:** The time between consecutive points is the Chebyshev distance, since diagonal moves cost the same as axis-aligned moves.

```python
def min_time_to_visit(points: list[Point]) -> int:
    total = 0
    for i in range(1, len(points)):
        dx = abs(points[i].x - points[i - 1].x)
        dy = abs(points[i].y - points[i - 1].y)
        total += max(dx, dy)
    return total
```

#### Medium 3: Minimum Moves to Equal Array Elements II
Given $n$ points on a line (1D), find the minimum sum of distances to move all points to the same location. Then extend to 2D with Manhattan distance.

**Solution:** The optimal meeting point in 1D is the **median**. For Manhattan distance in 2D, the x and y coordinates are independent — find the median x and median y separately.

```python
def min_moves_2d(points: list[Point]) -> int:
    xs = sorted([p.x for p in points])
    ys = sorted([p.y for p in points])
    n = len(points)
    mx, my = xs[n // 2], ys[n // 2]
    return sum(abs(p.x - mx) + abs(p.y - my) for p in points)

# Example: points (0, 0), (2, 2), (4, 4)
# Median: (2, 2). Total: |0-2|+|0-2| + |2-2|+|2-2| + |4-2|+|4-2| = 4 + 0 + 4 = 8
```

#### Medium 4: Perpendicular Distance from Point to Line
Given a line $y = 2x + 3$ and a point $(4, 1)$, find the shortest distance.

**Solution:** Convert to standard form $2x - y + 3 = 0$. Apply the formula.

```python
def perpendicular_distance(x0: float, y0: float, a: float, b: float, c: float) -> float:
    return abs(a * x0 + b * y0 + c) / math.sqrt(a * a + b * b)

line = LineStandard(2, -1, 3)  # 2x - y + 3 = 0
print(perpendicular_distance(4, 1, line.a, line.b, line.c))
# |8 - 1 + 3| / sqrt(4 + 1) = |10| / sqrt(5) ≈ 4.472
```

#### Hard 5: The Grid Transformer — Manhattan to Chebyshev
You are given $n$ points. You need to answer $q$ queries: "what is the maximum Chebyshev distance from query point $(x, y)$ to any of the $n$ points?"

**Solution:** Use the transformation $(u, v) = (x + y, x - y)$. The Chebyshev distance becomes half of Manhattan in the transformed space. Precompute max/min $u$ and $v$ across all points. For each query, the maximum transformed-Manhattan is the larger of $\max(|u - u_{\text{min}}|, |u - u_{\text{max}}|)$ plus similarly for $v$, then halve it.

```python
def precompute(points: list[Point]):
    us = [p.x + p.y for p in points]
    vs = [p.x - p.y for p in points]
    return min(us), max(us), min(vs), max(vs)

def max_chebyshev(query: Point, umin, umax, vmin, vmax) -> float:
    u = query.x + query.y
    v = query.x - query.y
    # Maximum Manhattan in transformed space
    max_man = max(abs(u - umin), abs(u - umax)) + max(abs(v - vmin), abs(v - vmax))
    return max_man / 2.0

# Example: points = [(0,0), (5,5), (3,1)]
# Transform: u = [0, 10, 4], v = [0, 0, 2]
# For query (2, 3): u=5, v=-1
# max_man = max(|5-0|,|5-10|) + max(|-1-0|,|-1-2|) = 5 + 3 = 8
# max_cheb = 8/2 = 4.0
```
Complexity: O($n + q$) after precomputation

### 📝 8. CHAPTER QUIZ

1. **What is the Euclidean distance between $(1, 2)$ and $(4, 6)$?**
   - A) 3
   - B) 4
   - C) 5
   - D) 7

<details>
<summary>Answer</summary>
C — $dx = 3$, $dy = 4$, distance = $\sqrt{3^2 + 4^2} = 5$.
</details>

2. **What is the Manhattan distance between $(1, 2)$ and $(4, 6)$?**
   - A) 5
   - B) 7
   - C) 4
   - D) 10

<details>
<summary>Answer</summary>
B — $|4-1| + |6-2| = 3 + 4 = 7$.
</details>

3. **What is the Chebyshev distance between $(1, 2)$ and $(4, 6)$?**
   - A) 3
   - B) 4
   - C) 5
   - D) 7

<details>
<summary>Answer</summary>
B — $\max(3, 4) = 4$.
</details>

4. **If a point lies on the line $3x - 2y + 5 = 0$, what is its perpendicular distance to the line?**
   - A) 0
   - B) $5 / \sqrt{13}$
   - C) $5 / \sqrt{5}$
   - D) 5

<details>
<summary>Answer</summary>
A — If a point is on the line, the distance is 0. The numerator evaluates to 0.
</details>

5. **Which distance metric would you use to compute the minimum moves a king needs on a chessboard?**
   - A) Euclidean
   - B) Manhattan
   - C) Chebyshev
   - D) Squared Euclidean

<details>
<summary>Answer</summary>
C — A king can move diagonally, so the minimum number of moves is $\max(|dx|, |dy|)$.
</details>

6. **Why might you use squared Euclidean distance instead of Euclidean?**
   - A) It is a true metric
   - B) It avoids expensive square root operations
   - C) It is always larger
   - D) It handles negative distances

<details>
<summary>Answer</summary>
B — Square root is computationally expensive. Squared distance preserves ordering since sqrt is monotonic.
</details>

7. **What is the midpoint of $(3, 7)$ and $(-1, 1)$?**
   - A) $(2, 4)$
   - B) $(1, 4)$
   - C) $(1, 3)$
   - D) $(2, 3)$

<details>
<summary>Answer</summary>
B — $((3 + (-1))/2, (7+1)/2) = (2/2, 8/2) = (1, 4)$.
</details>

8. **If $(x_1, y_1)$ and $(x_2, y_2)$ have $|x_2 - x_1| = |y_2 - y_1|$, which distances are equal?**
   - A) Euclidean and Manhattan
   - B) Euclidean and Chebyshev
   - C) Manhattan and Chebyshev
   - D) All three

<details>
<summary>Answer</summary>
B — When $|dx| = |dy|$, Euclidean $= \sqrt{2} \cdot |dx|$ and Chebyshev $= |dx|$. They differ by a factor of $\sqrt{2}$. Manhattan $= 2|dx|$, different from both.
</details>

9. **What does the transformation $(u, v) = (x + y, x - y)$ do to Chebyshev distance?**
   - A) Converts it to Euclidean
   - B) Converts it to half of Manhattan
   - C) Converts it to squared Euclidean
   - D) Leaves it unchanged

<details>
<summary>Answer</summary>
B — Under this transformation, $d_{Ch}(P, Q) = d_M(U, V) / 2$.
</details>

10. **In a pathfinding problem where movement costs 1 for horizontal/vertical and $\sqrt{2}$ for diagonal, which is the correct admissible heuristic?**
    - A) Manhattan distance
    - B) Chebyshev distance
    - C) Euclidean distance
    - D) Squared Euclidean

<details>
<summary>Answer</summary>
C — Euclidean distance is admissible (it never overestimates the true cost with diagonal costing $\sqrt{2}$). Manhattan overestimates (too large). Chebyshev underestimates slightly.
</details>

### 🃏 9. FLASHCARDS / KEY TAKEAWAYS

**📌 Euclidean Distance** — The straight-line distance: $d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$. Derived from Pythagoras. "As the crow flies."

**📌 Manhattan Distance (L1)** — The grid-distance: $d = |x_2 - x_1| + |y_2 - y_1|$. Always ≥ Euclidean. Good for city-block routing and high-dimensional ML.

**📌 Chebyshev Distance (L∞)** — The king's distance: $d = \max(|x_2 - x_1|, |y_2 - y_1|)$. Use for 8-directional movement.

**📌 Squared Distance** — $d^2 = (x_2 - x_1)^2 + (y_2 - y_1)^2$. Same ordering as Euclidean, no sqrt. Use for comparisons only. Not a true metric.

**📌 Midpoint** — $M = ((x_1 + x_2)/2, (y_1 + y_2)/2)$. The average of coordinates. Lies at the centre of the segment.

**📌 Point-Line Distance** — $d = |ax_0 + by_0 + c| / \sqrt{a^2 + b^2}$. The perpendicular (shortest) distance. Always non-negative.

**📌 Manhattan ↔ Chebyshev** — Under $(u, v) = (x + y, x - y)$, Chebyshev becomes half-Manhattan. Useful for conversions and competitive programming.

**📌 Closest Pair** — Naive O($n^2$), divide-and-conquer O($n \log n$). Sort by x, split, recurse, then check only points near the dividing line.

**📌 KNN** — Classify by majority vote of $k$ nearest neighbours. Euclidean is default, Manhattan works better in high dimensions. Heap (max-heap of size $k$) optimises the search.

**📌 Pathfinding Heuristics** — 4-directional grid → Manhattan. 8-directional (uniform cost) → Chebyshev. 8-directional (diagonal costs $\sqrt{2}$) → Euclidean.

### 📎 10. REFERENCES & FURTHER READING

- 📎 [Wikipedia: Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance) — Formal definition, properties, and higher-dimensional generalizations
- 📎 [Wikipedia: Taxicab geometry](https://en.wikipedia.org/wiki/Taxicab_geometry) — History, circles in L1, and applications
- 📎 [Wikipedia: Chebyshev distance](https://en.wikipedia.org/wiki/Chebyshev_distance) — Definition, queen's graph, and coding theory
- 📎 [CP-Algorithms: Basic Geometry](https://cp-algorithms.com/geometry/basic-geometry.html) — Competitive programming reference for all distance formulas
- 📎 [Khan Academy: Distance formula](https://www.khanacademy.org/math/geometry/hs-geo-analytic-geometry/hs-geo-distance-and-midpoints/v/distance-formula) — Video walkthrough
- 📎 [Khan Academy: Midpoint formula](https://www.khanacademy.org/math/geometry/hs-geo-analytic-geometry/hs-geo-distance-and-midpoints/v/midpoint-formula) — Video walkthrough
- 📎 [3Blue1Brown: Pythagorean theorem visual proof](https://www.youtube.com/watch?v=r2G0f6lR8T0) — Visual intuition for the distance formula
- 📎 [Brilliant: Taxicab Geometry](https://brilliant.org/wiki/taxicab-geometry/) — Interactive problem set
- 📎 [Red Blob Games: A* Pathfinding](https://www.redblobgames.com/pathfinding/a-star/introduction.html) — Heuristics for grid pathfinding
- 📎 [Wikipedia: K-nearest neighbors algorithm](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm) — Comprehensive overview, including distance metric choices
- 📎 [Stack Exchange: Manhattan and Chebyshev relationship](https://math.stackexchange.com/questions/885828/relation-between-chebyshev-and-manhattan-distance) — Mathematical derivation
## Chapter 3: Angles, Slope & Orientation

### 🎯 Learning Objectives

By the end of this chapter, you will be able to:
- Convert between degrees and radians fluently
- Compute and interpret the slope of a line from two points
- Use the cross product to determine orientation (CCW / CW / collinear)
- Use the dot product to find the angle between two vectors
- Detect collinearity using both area and slope methods
- Apply slope hashing to solve "max points on a line" problems
- Understand polar coordinates and the atan2 function
- Distinguish acute, obtuse, and right angles from side lengths or dot products

### 📖 1. INTRODUCTION

Imagine you are standing at a street intersection, looking at a map on your phone. The map rotates as you turn — your orientation changes. In geometry, **orientation** is the fundamental idea of which way something faces or turns, and it is measured using **angles**.

Angles are everywhere in programming: game developers rotate sprites, GPS systems compute bearing between coordinates, robotics engineers calculate joint angles, and computer vision pipelines detect corners and edges. The two tools that make all of this possible are the **cross product** (for turning direction) and the **dot product** (for angle magnitude).

**Why this chapter matters:**
1. **Orientation is the single most-used operation in computational geometry.** Every line intersection test, point-in-polygon check, and convex hull algorithm depends on it.
2. **Slope is how we reason about lines.** Problems about collinearity, parallel lines, and "max points on a line" all reduce to slope.
3. **Angles connect geometry with trigonometry.** Understanding the relationship between side lengths and angles unlocks law of cosines, law of sines, and triangle classification.

> 📎 [Wikipedia: Cross product](https://en.wikipedia.org/wiki/Cross_product) — The signed area interpretation of the 2D cross product
> 📎 [3Blue1Brown: Dot products and cross products](https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab) — Intuitive visual explanation of the two fundamental vector operations
> 📎 [CP-Algorithms: Oriented area](https://cp-algorithms.com/geometry/oriented-area.html) — Competitive programming reference for cross product and orientation

### 📚 2. CORE CONCEPTS

#### 2.1 What Is an Angle?

**Intuition:** An angle measures the amount of rotation needed to bring one line segment onto another, sharing a common endpoint (vertex).

**Units:**
- **Degrees:** A full circle = 360°. One degree = 1/360 of a full rotation.
- **Radians:** A full circle = 2π radians. One radian ≈ 57.3° (the angle where the arc length equals the radius).

**Conversion:**
```
radians = degrees * π / 180
degrees = radians * 180 / π
```

**Edge case:** In most programming languages, trigonometric functions (`sin`, `cos`, `atan2`) expect **radians**, not degrees. Always convert.

```python
import math

def deg_to_rad(deg):
    return deg * math.pi / 180

def rad_to_deg(rad):
    return rad * 180 / math.pi
```

#### 2.2 Slope of a Line

**Intuition:** Slope measures how steep a line is — the rate at which y changes as x increases.

**Formula:**
```
m = (y₂ - y₁) / (x₂ - x₁)
```

**Interpretation:**
| Slope value | Meaning |
|---|---|
| m > 0 | Line rises left to right (increasing) |
| m < 0 | Line falls left to right (decreasing) |
| m = 0 | Horizontal line (y constant) |
| m undefined | Vertical line (x₂ = x₁, division by zero) |

**Edge cases:**
- Vertical lines: `x₂ = x₁` → slope is undefined. Always check `dx == 0` before dividing.
- Floating point: slope from floating-point coordinates may produce rounding errors. Prefer comparing cross products instead.

**Code:**
```python
def slope(p1, p2):
    dx = p2[0] - p1[0]
    dy = p2[1] - p1[1]
    if dx == 0:
        return None  # undefined (vertical)
    return dy / dx
```

#### 2.3 Cross Product of Two Vectors

**Intuition:** The 2D cross product `v₁ × v₂` gives the **signed area** of the parallelogram formed by the two vectors. The sign tells us whether `v₂` is to the left or the right of `v₁`.

**Formula:**
```
v₁ × v₂ = x₁·y₂ - y₁·x₂
```

For three points A, B, C, the cross product of vectors AB and AC is:
```
cross(A, B, C) = (B.x - A.x)·(C.y - A.y) - (B.y - A.y)·(C.x - A.x)
```

**Interpretation of the sign:**
```
cross(A, B, C) > 0  → counter-clockwise turn (left turn)
cross(A, B, C) < 0  → clockwise turn (right turn)
cross(A, B, C) = 0  → collinear (straight line)
```

**Derivation:** The 2D cross product is the z-component of the 3D cross product `(v₁, 0) × (v₂, 0)`. The magnitude equals `|v₁|·|v₂|·sin(θ)` where θ is the angle from v₁ to v₂.

**Applications:**
- **Orientation test:** The foundation of line intersection, point-in-polygon, convex hull
- **Signed area:** `Area = |cross(A,B,C)| / 2` for triangle ABC
- **Collinearity test:** Three points are collinear iff cross product is 0

**Edge cases:** Use an epsilon tolerance for floating point: `abs(cross) < 1e-9` instead of `cross == 0`.

```python
def cross(o, a, b):
    """Cross product of OA × OB. Positive = CCW turn at O."""
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])

def orient(o, a, b):
    """Returns 1 (CCW), -1 (CW), or 0 (collinear)."""
    val = cross(o, a, b)
    if abs(val) < 1e-9:
        return 0
    return 1 if val > 0 else -1
```

> 📎 [Wikipedia: Cross product](https://en.wikipedia.org/wiki/Cross_product) — Formal definition and properties

#### 2.4 Acute, Obtuse, and Right Angles

**Intuition:** Angles are classified by their measure relative to 90°.

**Classification:**
```
Acute:    0° < θ < 90°    (θ < π/2)
Right:    θ = 90°         (θ = π/2)
Obtuse:   90° < θ < 180°  (θ > π/2)
Straight: θ = 180°        (θ = π)
```

**Detection from sides:** Given sides a, b, c with c being the longest:
- **Acute:** `c² < a² + b²`
- **Right:** `c² = a² + b²`
- **Obtuse:** `c² > a² + b²`

**Detection from dot product:** Two vectors meet at a right angle if their dot product is zero. A positive dot product means acute (< 90°); negative means obtuse (> 90°).

#### 2.5 Dot Product and Angle Between Vectors

**Intuition:** The dot product measures how much two vectors point in the same direction. It is proportional to the cosine of the angle between them.

**Formula:**
```
v₁ · v₂ = x₁·x₂ + y₁·y₂ = |v₁|·|v₂|·cos(θ)
```

**Angle between two vectors:**
```
cos(θ) = (v₁ · v₂) / (|v₁|·|v₂|)
θ = acos((v₁ · v₂) / (|v₁|·|v₂|))
```

**Interpretation:**
```
dot > 0  → angle < 90° (vectors point in similar direction)
dot = 0  → angle = 90° (perpendicular)
dot < 0  → angle > 90° (vectors point in opposite directions)
```

**Edge case:** If either vector has zero length, the dot product is 0 and the angle is undefined. Always check for zero-length vectors.

```python
import math

def dot(v1, v2):
    return v1[0] * v2[0] + v1[1] * v2[1]

def magnitude(v):
    return math.sqrt(v[0]**2 + v[1]**2)

def angle_between(v1, v2):
    """Returns angle in radians between v1 and v2."""
    mag1, mag2 = magnitude(v1), magnitude(v2)
    if mag1 == 0 or mag2 == 0:
        return 0  # undefined, return 0 as convention
    cos_theta = dot(v1, v2) / (mag1 * mag2)
    cos_theta = max(-1.0, min(1.0, cos_theta))  # clamp for numerical stability
    return math.acos(cos_theta)
```

> 📎 [3Blue1Brown: Dot products](https://www.youtube.com/watch?v=LyGKycYT2v0) — Geometric intuition for dot products

#### 2.6 Collinearity: Area Method vs Slope Method

**Problem:** Determine if three points A, B, C lie on the same straight line.

**Method 1 — Cross product (area method):**
```
collinear iff cross(A, B, C) == 0
```
- **Pros:** No division, exact for integers, handles vertical lines naturally
- **Cons:** Floating point tolerance needed for real coordinates
- **Preferred in 99% of cases**

**Method 2 — Slope comparison:**
```
collinear iff slope(A,B) == slope(B,C)
```
- **Pros:** Intuitive
- **Cons:** Division by zero for vertical lines, floating point errors from division
- **Formula:** `(y₂-y₁)/(x₂-x₁) == (y₃-y₂)/(x₃-x₂)` → cross-multiply: `(y₂-y₁)*(x₃-x₂) == (y₃-y₂)*(x₂-x₁)`

The cross-multiplied form of slope comparison is **identical** to the cross product. Always use the cross product.

```python
def collinear(a, b, c):
    return abs(cross(a, b, c)) < 1e-9
```

#### 2.7 Slope Hashing for "Max Points on a Line"

**Problem:**
> Given N points (N ≤ 300), find the maximum number of points that lie on the same straight line.

**Intuition:** For each point pᵢ, compute the slope to every other point pⱼ. Group points by slope. The largest group (including pᵢ itself) gives the max points on a line through pᵢ.

**The hash representation trick:** Instead of storing slope as a float (prone to precision errors), store the reduced direction vector `(dx/g, dy/g)` where `g = gcd(dx, dy)`. Normalize the sign so that `dx > 0`, or if `dx == 0`, then `dy > 0`.

**Edge cases:**
- Duplicate points: count them separately and add to every group
- Vertical lines: dx = 0 → reduced vector is `(0, 1)`
- Horizontal lines: dy = 0 → reduced vector is `(1, 0)`

```python
import math
from collections import defaultdict

def max_points_on_line(points):
    n = len(points)
    if n <= 2:
        return n

    ans = 0
    for i in range(n):
        slopes = defaultdict(int)
        duplicates = 1
        for j in range(n):
            if i == j:
                continue
            dx = points[j][0] - points[i][0]
            dy = points[j][1] - points[i][1]
            if dx == 0 and dy == 0:
                duplicates += 1  # same point
                continue
            g = math.gcd(dx, dy)
            dx //= g
            dy //= g
            # Normalize: dx > 0, or if dx == 0 then dy > 0
            if dx < 0 or (dx == 0 and dy < 0):
                dx, dy = -dx, -dy
            slopes[(dx, dy)] += 1

        best = 0
        for cnt in slopes.values():
            best = max(best, cnt)
        ans = max(ans, best + duplicates)

    return ans
```

#### 2.8 Polar Coordinates and atan2

**Intuition:** While Cartesian coordinates `(x, y)` describe a point by its horizontal and vertical offsets, polar coordinates `(r, θ)` describe it by its distance from the origin and its angle from the positive x-axis.

**Conversion:**
```
Cartesian → Polar:
  r = sqrt(x² + y²)
  θ = atan2(y, x)    # in radians, range (-π, π]

Polar → Cartesian:
  x = r·cos(θ)
  y = r·sin(θ)
```

**The atan2 function:** Unlike `atan(y/x)`, `atan2(y, x)` handles all four quadrants correctly and avoids division by zero:
```
atan2(y, x) > 0  → point in Q1 or Q2 (counter-clockwise from +x axis)
atan2(y, x) < 0  → point in Q3 or Q4 (clockwise from +x axis)
atan2(0, x) = 0  → point on x-axis (y = 0)
atan2(y, 0) = π/2 or -π/2 → point on y-axis
```

**Use cases:** Sorting points by polar angle (Graham scan for convex hull), computing bearing between GPS coordinates, rotating objects in 2D games.

```python
import math

def to_polar(x, y):
    r = math.hypot(x, y)  # more stable than sqrt(x*x + y*y)
    theta = math.atan2(y, x)
    return r, theta
```

### 🔍 3. PROBLEM RECOGNITION

**Keywords that signal angle / slope / orientation problems:**
- "orientation", "clockwise", "counter-clockwise", "turn direction"
- "collinear", "colinear", "straight line"
- "slope", "steepness", "gradient"
- "angle", "acute", "obtuse", "right angle"
- "maximum points on a line"
- "same line", "common line"
- "cross product", "dot product", "vector"
- "polar angle", "atan2", "sort by angle"
- "bearing", "heading", "direction"
- "left turn", "right turn", "straight"

**How interviewers frame these:**
- "Given N points in a plane, find the maximum number that lie on the same line"
- "Determine if three points are collinear"
- "Check if a set of points forms a convex polygon"
- "Given three points A, B, C in order, did we turn left, right, or go straight?"
- "Sort points by their polar angle around the origin"
- "Calculate the angle between two vectors"
- "Given the coordinates of a triangle, classify it as acute, right, or obtuse"

**Hidden geometry indicators:**
- Problems about "checking if a polygon is convex" → orientation test at each vertex
- "Line segment intersection" → orientation test on all four endpoint pairs
- "Point in polygon" → winding number using orientation
- "Reflection", "mirror" → angle of incidence equals angle of reflection
- "Rotating calipers" → sorting points by polar angle

### 🧩 4. PATTERN ANALYSIS

#### Pattern 1: Cross Product for Orientation
- **When to use:** Any problem involving turns, direction, or ordering of points around a reference
- **Complexity:** O(1) per test
- **Key insight:** `cross(A, B, C) > 0` means C is to the left of directed line AB. This single test is the building block of line intersection, convex hull, and point-in-polygon.
- **Common mistake:** Forgetting to check the collinear case (`cross == 0`) — sometimes it is valid (on-segment test), sometimes not.

#### Pattern 2: Dot Product for Angle Classification
- **When to use:** Need to determine if an angle is acute, right, or obtuse; or compute the exact angle between two vectors
- **Complexity:** O(1)
- **Key insight:** The sign of the dot product immediately tells you if the angle is < 90°, = 90°, or > 90° without computing any trig.
- **Common mistake:** Forgetting that `acos` returns values only in [0, π]; use `atan2` for signed angles.

#### Pattern 3: Reduced Fraction Slope Hashing
- **When to use:** "Maximum points on a line", counting collinear triples, grouping points by shared line
- **Complexity:** O(n²) time, O(n) space per reference point
- **Key insight:** Represent slope as `(dx/g, dy/g)` normalized to a canonical quadrant. This avoids floating point entirely.
- **Common mistake:** Forgetting to handle duplicate points and vertical lines separately.

#### Pattern 4: Polar Angle Sorting
- **When to use:** Convex hull (Graham scan), sorting points radially around a center, visibility problems
- **Complexity:** O(n log n)
- **Key insight:** Use `atan2` for simplicity or cross-product comparator for speed and precision. The cross-product comparator avoids trig entirely.
- **Common mistake:** Cross-product comparator only works when all points are in the same half-plane relative to the origin; use `atan2` or quadrant-based comparator for the general case.

#### Pattern 5: Signed Area for Polygon Operations
- **When to use:** Computing polygon area, checking vertex ordering (CW/CCW), triangulation
- **Complexity:** O(n) for area of an n-gon
- **Key insight:** The sum of cross products around a closed polygon gives twice the signed area. Positive = CCW ordering.
- **Common mistake:** Forgetting to close the polygon (wrapping around to the first vertex).

### ⚡ 5. BRUTE FORCE → OPTIMIZED SOLUTIONS

#### Problem 1: Maximum Points on a Line (LeetCode 149)

**A. Intuition:** Given N points, find the maximum number that lie on the same straight line. For each reference point, we can compute the slope to every other point and count how many share the same slope.

**B. Brute Force (O(n³)):**
```python
def max_points_brute(points):
    n = len(points)
    if n <= 2:
        return n
    ans = 0
    for i in range(n):
        for j in range(i + 1, n):
            cnt = 2  # i and j are on the line
            for k in range(n):
                if k != i and k != j and collinear(points[i], points[j], points[k]):
                    cnt += 1
            ans = max(ans, cnt)
    return ans
```

**C. Why Slow:** Checking every triple is O(n³). For n = 300, that is 27M operations — acceptable but wasteful. For n = 10⁴, impossible.

**D. Step-by-Step Optimization:**
1. **Key observation:** If we fix a reference point pᵢ, any line through pᵢ is uniquely identified by its slope.
2. For each pᵢ, compute slopes to all other points and hash them.
3. Track the maximum count for each pᵢ (including pᵢ itself and any duplicates).
4. Repeat for all n reference points.

**E. Final Optimized (O(n²)):**
```python
import math
from collections import defaultdict

def max_points(points):
    n = len(points)
    if n <= 2:
        return n

    ans = 0
    for i in range(n):
        slopes = defaultdict(int)
        dups = 1
        xi, yi = points[i]

        for j in range(n):
            if i == j:
                continue
            xj, yj = points[j]
            dx = xj - xi
            dy = yj - yi

            if dx == 0 and dy == 0:
                dups += 1
                continue

            g = math.gcd(dx, dy)
            dx //= g
            dy //= g
            if dx < 0 or (dx == 0 and dy < 0):
                dx, dy = -dx, -dy
            slopes[(dx, dy)] += 1

        local_max = 0
        for cnt in slopes.values():
            local_max = max(local_max, cnt)
        ans = max(ans, local_max + dups)

    return ans
```

**F. Edge Cases:**
- All points identical: return n
- n < 3: return n
- Floating-point coordinates: store slope as reduced fraction of integers (if coordinates are integers) or compute cross-product ratio

**G. Code (C++):**
```cpp
#include <vector>
#include <unordered_map>
#include <algorithm>
#include <numeric>
using namespace std;

int maxPoints(vector<vector<int>>& points) {
    int n = points.size();
    if (n <= 2) return n;
    int ans = 0;

    for (int i = 0; i < n; i++) {
        unordered_map<long long, int> slope_cnt;
        int dups = 1;

        for (int j = 0; j < n; j++) {
            if (i == j) continue;
            int dx = points[j][0] - points[i][0];
            int dy = points[j][1] - points[i][1];

            if (dx == 0 && dy == 0) { dups++; continue; }

            int g = gcd(dx, dy);
            dx /= g; dy /= g;
            if (dx < 0 || (dx == 0 && dy < 0)) { dx = -dx; dy = -dy; }
            // Encode pair as 64-bit int to avoid nested maps
            long long key = ((long long)dx << 32) | (unsigned int)dy;
            slope_cnt[key]++;
        }

        int local_max = 0;
        for (auto& p : slope_cnt) local_max = max(local_max, p.second);
        ans = max(ans, local_max + dups);
    }
    return ans;
}
```

#### Problem 2: Find the Turn Direction (Codeforces 227A — Where Do I Turn?)

**A. Intuition:** Given three points A, B, C in order, determine whether we turn left, right, or go straight at B.

**B. Brute Force:** Compute the cross product at B. That is it.

**C. Why No Optimization Needed:** O(1) solution from the cross product.

**D. Step-by-Step:**
1. Read A(x₁, y₁), B(x₂, y₂), C(x₃, y₃)
2. Compute `cross = (x₂ - x₁)·(y₃ - y₂) - (y₂ - y₁)·(x₃ - x₂)`
3. If `cross > 0` → LEFT; if `cross < 0` → RIGHT; else → TOWARDS

**E. Complexity:** O(1).

**F. Edge Cases:** Collinear points (cross = 0) → TOWARDS. Coordinates fit in 64-bit integers.

**G. Code (Java):**
```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long x1 = sc.nextLong(), y1 = sc.nextLong();
        long x2 = sc.nextLong(), y2 = sc.nextLong();
        long x3 = sc.nextLong(), y3 = sc.nextLong();

        long cross = (x2 - x1) * (y3 - y2) - (y2 - y1) * (x3 - x2);

        if (cross > 0) System.out.println("LEFT");
        else if (cross < 0) System.out.println("RIGHT");
        else System.out.println("TOWARDS");
    }
}
```

### 🏆 6. CURATED PROBLEMS

| # | Problem | Platform | Difficulty | URL | Concepts |
|---|---|---|---|---|---|
| 1 | Max Points on a Line | LeetCode | Hard | https://leetcode.com/problems/max-points-on-a-line/ | Slope hashing, collinearity |
| 2 | Valid Boomerang | LeetCode | Easy | https://leetcode.com/problems/valid-boomerang/ | Collinearity, cross product |
| 3 | Where Do I Turn? | Codeforces | 1300 | https://codeforces.com/problemset/problem/227/A | Orientation, cross product |
| 4 | Bicycle Race | Codeforces | 1500 | https://codeforces.com/problemset/problem/659/D | Orientation, turn counting |
| 5 | Crazy Town | Codeforces | 1700 | https://codeforces.com/problemset/problem/498/A | Line side test, orientation |
| 6 | Collinearity (ABC181C) | AtCoder | 248 | https://atcoder.jp/contests/abc181/tasks/abc181_c | 3-point collinearity |
| 7 | Angle Between Vectors | CodeAbbey | Easy | https://www.codeabbey.com/index/task_view/angle-between-vectors | Dot product, angle |
| 8 | CCW | CodeChef | Medium | https://www.codechef.com/problems/CCW | Orientation, cross product |
| 9 | Collinear Points | GeeksforGeeks | Easy | https://www.geeksforgeeks.org/problems/collinear-points/ | Collinearity |
| 10 | Convex Hull (Graham Scan) | CSES | -- | https://cses.fi/problemset/task/2195 | Polar sorting, orientation |
| 11 | Point Location Test | CSES | -- | https://cses.fi/problemset/task/2189 | Orientation, line side |
| 12 | Line Segment Intersection | CSES | -- | https://cses.fi/problemset/task/2190 | Orientation, on-segment |
| 13 | Polygon Area (Shoelace) | AOJ | Easy | https://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=CGL_3_A | Signed area |
| 14 | Tell Your World | Codeforces | 1500 | https://codeforces.com/problemset/problem/849/B | Parallel lines, slope |
| 15 | Vanya and Triangles | Codeforces | 1900 | https://codeforces.com/problemset/problem/552/D | Collinearity counting |

### ✏️ 7. PRACTICE PROBLEMS

**Problem 1: Is It a Left Turn?**
Given N points in a sequence, count how many left turns, right turns, and straight moves occur. A point sequence has at least 3 points.

**Solution:**
```python
def count_turns(points):
    left = right = straight = 0
    for i in range(1, len(points) - 1):
        cp = cross(points[i-1], points[i], points[i+1])
        if cp > 0:
            left += 1
        elif cp < 0:
            right += 1
        else:
            straight += 1
    return left, right, straight
```

**Problem 2: Collinear Triplets**
Given N points (N ≤ 100), count the number of triples that are collinear.

**Solution:** For each point as origin, hash slopes to other points. For each slope with count k, the number of collinear triples with this origin is C(k, 2). Sum over all origins and divide by 3 (each triple counted 3 times, once per vertex).

```python
def count_collinear_triplets(points):
    n = len(points)
    total = 0
    for i in range(n):
        slopes = defaultdict(int)
        for j in range(n):
            if i == j:
                continue
            dx = points[j][0] - points[i][0]
            dy = points[j][1] - points[i][1]
            g = math.gcd(dx, dy)
            dx //= g; dy //= g
            if dx < 0 or (dx == 0 and dy < 0):
                dx, dy = -dx, -dy
            slopes[(dx, dy)] += 1
        for k in slopes.values():
            total += k * (k - 1) // 2
    return total // 3
```

**Problem 3: Sort Points by Polar Angle**
Given N points and an origin O, sort the points by the polar angle they make with O.

**Solution:** Use `atan2` for simplicity. For precision, use a quadrant-based comparator that first distinguishes quadrants, then uses cross product within each quadrant.

```python
def sort_by_angle(points, origin=(0, 0)):
    ox, oy = origin
    def key_func(p):
        return math.atan2(p[1] - oy, p[0] - ox)
    return sorted(points, key=key_func)
```

**Problem 4: Count Right Angles from Points**
Given N points on a plane, count how many triples form a right angle at the middle point (when sorted in order). For each point as potential right-angle vertex, group others by direction vector. For each direction, check if its perpendicular exists in the same group.

**Solution:**
```python
def count_right_angles(points):
    n = len(points)
    count = 0
    for i in range(n):
        vecs = defaultdict(int)
        for j in range(n):
            if i == j:
                continue
            dx = points[j][0] - points[i][0]
            dy = points[j][1] - points[i][1]
            g = math.gcd(dx, dy)
            dx //= g; dy //= g
            if dx < 0 or (dx == 0 and dy < 0):
                dx, dy = -dx, -dy
            vecs[(dx, dy)] += 1
        for (dx, dy), cnt in list(vecs.items()):
            perp = (-dy, dx)
            if perp[0] < 0 or (perp[0] == 0 and perp[1] < 0):
                perp = (-perp[0], -perp[1])
            if perp in vecs:
                count += cnt * vecs[perp]
    return count // 2
```

**Problem 5: Acute/Obtuse/Right Triangle from Coordinates**
Given three points, classify the triangle as acute, right, or obtuse without using any trigonometric functions.

**Solution:** Compute all three squared side lengths. Let them be a², b², c² sorted ascending. Then:
- If a² + b² > c² → acute
- If a² + b² == c² → right
- If a² + b² < c² → obtuse

```python
def classify_angle(p1, p2, p3):
    def d2(a, b):
        return (a[0]-b[0])**2 + (a[1]-b[1])**2
    sides = sorted([d2(p1, p2), d2(p2, p3), d2(p3, p1)])
    if sides[0] + sides[1] > sides[2]:
        return "Acute"
    elif sides[0] + sides[1] == sides[2]:
        return "Right"
    else:
        return "Obtuse"
```

### 📝 8. CHAPTER QUIZ

**Q1:** What is the radian equivalent of 180°?
<details>
<summary>Answer</summary>
π radians
</details>

**Q2:** The cross product of vectors (3, 1) and (2, 5) is:
<details>
<summary>Answer</summary>
3·5 - 1·2 = 15 - 2 = 13 (positive → CCW, second vector is to the left of the first)
</details>

**Q3:** What is the slope of a vertical line through points (3, 1) and (3, 7)?
<details>
<summary>Answer</summary>
Undefined (dx = 0, division by zero)
</details>

**Q4:** Three points A, B, C have cross product cross(A, B, C) = 0. What does this mean?
<details>
<summary>Answer</summary>
The points are collinear — they all lie on the same straight line.
</details>

**Q5:** If v₁ · v₂ = 0, what is the angle between v₁ and v₂?
<details>
<summary>Answer</summary>
90° (π/2 radians) — the vectors are perpendicular.
</details>

**Q6:** What does `atan2(1, 0)` return?
<details>
<summary>Answer</summary>
π/2 (90°) — the point (0, 1) is directly above the origin.
</details>

**Q7:** In the slope hashing technique for "max points on a line", why do we normalize the direction vector using gcd?
<details>
<summary>Answer</summary>
So that collinear points with the same ratio (dx, dy) map to the same reduced key, regardless of how far apart they are from the reference point. For example, (2, 4) and (1, 2) both reduce to (1, 2).
</details>

**Q8:** Which method for testing collinearity handles vertical lines without special-casing?
<details>
<summary>Answer</summary>
The cross product (area) method. It uses only multiplication and subtraction, never division, so vertical lines (dx = 0) are handled automatically.
</details>

**Q9:** What range does `atan2(y, x)` return?
<details>
<summary>Answer</summary>
(-π, π], or equivalently (-180°, 180°]. Negative angles are clockwise from the positive x-axis.
</details>

**Q10:** If a triangle has squared side lengths 9, 16, and 25, what type of angle does it have?
<details>
<summary>Answer</summary>
Right angle. 9 + 16 = 25, so a² + b² = c².
</details>

### 🃏 9. FLASHCARDS / KEY TAKEAWAYS

**Card 1:** **Cross product formula**
`(x₁, y₁) × (x₂, y₂) = x₁·y₂ - y₁·x₂`
For three points: `(B.x-A.x)·(C.y-A.y) - (B.y-A.y)·(C.x-A.x)`

**Card 2:** **Orientation from cross product**
`cross > 0` → CCW (left turn)
`cross < 0` → CW (right turn)
`cross = 0` → collinear

**Card 3:** **Dot product for angle**
`v₁ · v₂ = |v₁||v₂|cos(θ)`
Positive → acute (< 90°), Zero → right (= 90°), Negative → obtuse (> 90°)

**Card 4:** **Slope hashing trick**
Represent slope as reduced `(dx/g, dy/g)` normalized to `dx > 0` (or `dx = 0, dy > 0`). Avoids floating point and handles vertical lines.

**Card 5:** **atan2 vs atan**
Use `atan2(y, x)` not `atan(y/x)`: it handles all four quadrants and avoids division by zero. Returns `(-π, π]`.

**Card 6:** **Collinearity detection**
Prefer the cross product method. The slope method (comparing `(y₂-y₁)/(x₂-x₁)`) requires special-casing vertical lines and is prone to floating-point errors.

**Card 7:** **Degrees to radians**
`radians = degrees · π / 180`. All math library trig functions expect radians.

**Card 8:** **Signed area of a triangle**
`Area = |cross(A, B, C)| / 2`. The sign of the cross product gives the orientation.

**Card 9:** **Angle from side lengths (longest side = c)**
- Acute: `c² < a² + b²`
- Right: `c² = a² + b²`
- Obtuse: `c² > a² + b²`

**Card 10:** **Key insight for max-points-on-a-line**
Fix a reference point. Hash slopes as reduced direction vectors. Max count = max group size + duplicates. Repeat for all reference points. O(n²).

### 📎 10. REFERENCES & FURTHER READING

> 📎 [Wikipedia: Cross product](https://en.wikipedia.org/wiki/Cross_product) — Formal treatment of cross products in 2D and 3D
> 📎 [Wikipedia: Slope](https://en.wikipedia.org/wiki/Slope) — Definition, interpretation, and special cases of slope
> 📎 [CP-Algorithms: Oriented area](https://cp-algorithms.com/geometry/oriented-area.html) — Competitive programming reference for cross product and orientation
> 📎 [Khan Academy: Slope](https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:linear-equations-graphs/x2f8bb11595b61c86:slope) — Interactive introduction to slope
> 📎 [3Blue1Brown: Dot products and cross products](https://www.3blue1brown.com/lessons/dot-products) — Visual, geometric explanation of both fundamental operations
> 📎 [Wikipedia: atan2](https://en.wikipedia.org/wiki/Atan2) — Definition and properties of the quadrant-aware arctangent
> 📎 [CP-Algorithms: Convex Hull](https://cp-algorithms.com/geometry/convex-hull.html) — Practical use of polar angle sorting and orientation
## Chapter 4: Triangles — Classification & Properties

### 🎯 Learning Objectives

By the end of this chapter, you will be able to:
- Identify the parts of a triangle: sides, vertices, angles, base, height, median, centroid
- Classify triangles by both sides (equilateral, isosceles, scalene) and angles (acute, right, obtuse)
- Apply the triangle inequality theorem to validate triangles and detect degenerate cases
- Use Heron's formula to compute area from three side lengths
- Relate side lengths to opposite angles (larger side → larger angle)
- Apply the law of cosines and law of sines to solve triangle problems
- Recognize and exploit special triangles (30-60-90, 45-45-90)
- Choose the correct area formula for a given triangle representation

### 📖 1. INTRODUCTION

A triangle is the simplest rigid polygon — three sides connected by three vertices. Unlike a square or rectangle, a triangle cannot be deformed without changing its side lengths. This rigidity makes triangles the fundamental building block of structures from bridges to computer graphics.

**Real-world intuition:** A bicycle frame is a triangle. A roof truss is a network of triangles. When a video game renders a 3D model, it divides every surface into triangles (triangulation). When a GPS computes your location, it solves triangles between satellites (trilateration). Triangles are the atoms of geometric computing.

**Why it matters in DSA:**
1. **Triangle inequality** is the most common geometry check in competitive programming — it appears in problems about side lengths, paths, and graph distances.
2. **Heron's formula** lets you compute area from side lengths alone — no coordinates needed.
3. **Law of cosines and law of sines** connect the two worlds of sides and angles, enabling triangle classification and solving when you have partial data.
4. **Area formulas** (base·height, Heron's, shoelace, cross product) give you multiple weapons for the same problem.
5. **Triangle counting** (how many valid triangles from N given sides or N given points) is a classic O(n²) two-pointer problem.

> 📎 [Wikipedia: Triangle](https://en.wikipedia.org/wiki/Triangle) — Comprehensive reference on all triangle properties
> 📎 [Wikipedia: Triangle inequality](https://en.wikipedia.org/wiki/Triangle_inequality) — The fundamental constraint on triangle side lengths
> 📎 [CP-Algorithms: Triangles](https://cp-algorithms.com/geometry/triangles.html) — Competitive programming recipes for triangle problems

### 📚 2. CORE CONCEPTS

#### 2.1 Parts of a Triangle

**Intuition:** Every triangle has six elements — three sides and three angles — plus derived elements like medians, altitudes, and the centroid.

**Basic elements:**
- **Vertices:** The three corner points A, B, C (usually labelled in order around the triangle)
- **Sides:** a = BC (opposite A), b = CA (opposite B), c = AB (opposite C)
- **Angles:** ∠A at vertex A, ∠B at vertex B, ∠C at vertex C
- **Base:** Any side can be the base (convention: the bottom side)
- **Height (altitude):** Perpendicular distance from a vertex to the opposite side
- **Median:** Segment from a vertex to the midpoint of the opposite side
- **Centroid:** Intersection of the three medians; also the center of mass

```
Centroid coordinates: ((x₁ + x₂ + x₃) / 3, (y₁ + y₂ + y₃) / 3)
```

#### 2.2 Classification by Sides

**Intuition:** Triangles are named by how many sides have equal length.

| Type | Condition | Properties |
|---|---|---|
| **Equilateral** | a = b = c | All angles = 60°, centroid = incenter = circumcenter = orthocenter |
| **Isosceles** | At least two sides equal | Base angles are equal; altitude to base bisects the vertex angle |
| **Scalene** | No sides equal | All angles different |

**Edge case:** An equilateral triangle is also isosceles (it has at least two equal sides). Some definitions treat them as mutually exclusive; in DSA problems, clarify which definition is used.

```python
def classify_by_sides(a, b, c):
    if a == b == c:
        return "Equilateral"
    if a == b or b == c or a == c:
        return "Isosceles"
    return "Scalene"
```

#### 2.3 Classification by Angles

**Intuition:** Triangles are named by their largest angle.

| Type | Condition (c is largest side) | Max angle |
|---|---|---|
| **Acute** | c² < a² + b² | All angles < 90° |
| **Right** | c² = a² + b² | One angle = 90° |
| **Obtuse** | c² > a² + b² | One angle > 90° |

**Note:** At most one angle can be ≥ 90° (since the sum of all angles = 180°).

```python
def classify_by_angle(a, b, c):
    sides = sorted([a, b, c])
    a2, b2, c2 = sides[0]**2, sides[1]**2, sides[2]**2
    if c2 < a2 + b2:
        return "Acute"
    elif c2 == a2 + b2:
        return "Right"
    else:
        return "Obtuse"
```

#### 2.4 Triangle Inequality Theorem

**Intuition:** The shortest path between two points is a straight line. For any triangle side c, the path through the third vertex (a + b) must be longer than the direct path (c).

**Theorem:** For any valid triangle with side lengths a, b, c:
```
a + b > c
a + c > b
b + c > a
```

All three conditions must hold.

**Degenerate case (collinear):**
```
a + b = c  →  three points are collinear, area = 0
```
This happens when the third vertex lies exactly on the line segment between the other two.

**Optimised check:** If the sides are sorted so that a ≤ b ≤ c, then only `a + b > c` needs to be checked. The other two inequalities are automatically satisfied because c is the largest side and `a + c > b` and `b + c > a` are trivially true.

```python
def is_valid_triangle(a, b, c):
    sides = sorted([a, b, c])
    return sides[0] + sides[1] > sides[2]
```

> 📎 [Wikipedia: Triangle inequality](https://en.wikipedia.org/wiki/Triangle_inequality) — The general principle applied to metric spaces and geometry

#### 2.5 Sum of Angles

**Property:** The interior angles of a triangle always sum to 180° (π radians):
```
∠A + ∠B + ∠C = 180°
```

**Consequences:**
- If two angles are known, the third is determined: `∠C = 180° - ∠A - ∠B`
- At most one angle can be ≥ 90°
- If one angle is > 90°, the triangle is obtuse
- If one angle = 90°, the triangle is right
- If all angles < 90°, the triangle is acute

**Exterior angle theorem:** An exterior angle equals the sum of the two remote interior angles. That is, if you extend one side, the angle formed outside the triangle equals the sum of the two opposite interior angles.

#### 2.6 Heron's Formula for Area

**Intuition:** Given only the three side lengths, Heron's formula computes the area without needing coordinates, angles, or height.

**Formula:**
```
s = (a + b + c) / 2          (semi-perimeter)
Area = √(s · (s - a) · (s - b) · (s - c))
```

**Derivation (brief):** The formula comes from expressing the height in terms of side lengths using the law of cosines and the Pythagorean identity, then simplifying.

**Edge cases:**
- Invalid triangle (violates triangle inequality): the term under the square root becomes negative.
- Very small side lengths: floating point may underflow; use double precision.
- Very unequal sides: subtractive cancellation may occur. For such cases, use the rearranged form that avoids near-equal intermediate values.

```python
import math

def heron_area(a, b, c):
    s = (a + b + c) / 2
    # Input validation
    if s <= 0 or s - a <= 0 or s - b <= 0 or s - c <= 0:
        return 0  # degenerate or invalid
    return math.sqrt(s * (s - a) * (s - b) * (s - c))
```

> 📎 [Wikipedia: Heron's formula](https://en.wikipedia.org/wiki/Heron%27s_formula) — Full derivation, history, and alternative forms

#### 2.7 Relationship: Larger Side → Larger Angle

**Theorem:** In any triangle, the longest side is opposite the largest angle, and the shortest side is opposite the smallest angle.

```
If a > b > c, then ∠A > ∠B > ∠C
If a = b, then ∠A = ∠B
```

**Applications:**
- Without computing angles, you can determine which angle is largest
- For right triangles, the hypotenuse is always the longest side and opposite the 90° angle
- For an isosceles triangle, equal sides imply equal base angles

#### 2.8 Law of Cosines

**Intuition:** The law of cosines generalises the Pythagorean theorem to any triangle. It relates the length of one side to the other two sides and the cosine of the included angle.

**Formula:**
```
c² = a² + b² - 2ab·cos(C)
a² = b² + c² - 2bc·cos(A)
b² = a² + c² - 2ac·cos(B)
```

Where angle C is opposite side c.

**Rearranged to find an angle:**
```
cos(C) = (a² + b² - c²) / (2ab)
```

**Special case:** When C = 90°, cos(C) = 0, and the law of cosines reduces to `c² = a² + b²` (the Pythagorean theorem).

**Edge cases:**
- Angle > 90°: cos(C) is negative, so the `-2ab·cos(C)` term becomes positive (adding to c²)
- Floating point: values just outside [-1, 1] can occur from rounding — clamp before `acos`

```python
import math

def law_of_cosines_angle(a, b, c):
    """Returns angle C (opposite side c) in radians."""
    cos_c = (a*a + b*b - c*c) / (2*a*b)
    cos_c = max(-1.0, min(1.0, cos_c))  # clamp for safety
    return math.acos(cos_c)
```

#### 2.9 Law of Sines

**Intuition:** The law of sines states that the ratio of a side length to the sine of its opposite angle is constant for all three vertex-angle pairs.

**Formula:**
```
a / sin(A) = b / sin(B) = c / sin(C) = 2R
```

Where R is the circumradius (radius of the circle passing through all three vertices).

**Derivation:** Draw the circumcircle. The side a subtends an angle 2A at the center, and the chord length is `2R·sin(A)`. Hence `a = 2R·sin(A)`.

**Applications:**
- **AAS / ASA (two angles + one side):** Compute the third angle (180° - sum), then use law of sines to find the missing sides.
- **SSA (two sides + one angle):** The ambiguous case — there may be 0, 1, or 2 triangles.

**Ambiguous case (SSA):** Given a, b, and angle A:
```
If a < b·sin(A):  no triangle
If a = b·sin(A):  one right triangle
If b·sin(A) < a < b:  two possible triangles
If a ≥ b:  one triangle
```

```python
def circumradius(a, b, c, area):
    """R = (a * b * c) / (4 * Area)."""
    if area == 0:
        return float('inf')
    return (a * b * c) / (4 * area)
```

#### 2.10 Special Triangles

**30-60-90 Triangle:**
```
Angles: 30°, 60°, 90°
Ratio:  short leg : long leg : hypotenuse = 1 : √3 : 2
Area = (short_leg² · √3) / 2
```
To solve: if the shortest side is x, then hypotenuse = 2x, long leg = x√3.

**45-45-90 Triangle (isosceles right):**
```
Angles: 45°, 45°, 90°
Ratio:  leg : leg : hypotenuse = 1 : 1 : √2
Area = leg² / 2
```
To solve: if a leg is x, then hypotenuse = x√2.

**Integer side families:**
- **Pythagorean triples:** (3, 4, 5), (5, 12, 13), (8, 15, 17), (7, 24, 25)
- **Heronian triangles:** Integer sides AND integer area, e.g., (5, 5, 6) area = 12

#### 2.11 Area Formulas: Complete Reference

| Formula | When to Use |
|---|---|
| `Area = ½ · base · height` | Base and height are known or easily computed |
| `Area = ½ · a · b · sin(C)` | Two sides and the included angle are known |
| `Area = √(s(s-a)(s-b)(s-c))` (Heron) | All three side lengths are known |
| `Area = ½ · \|x₁(y₂−y₃) + x₂(y₃−y₁) + x₃(y₁−y₂)\|` (Shoelace) | Three coordinate points are known |
| `Area = \|cross(AB, AC)\| / 2` | Vectors AB and AC are known |
| `Area = r · s` (inradius × semiperimeter) | Inradius is known |
| `Area = (abc) / (4R)` (circumradius) | Circumradius is known |

**Choosing the right formula:**
- Coordinates available → shoelace or cross product
- Side lengths only → Heron's formula
- Two sides + included angle → `½·ab·sin(C)`
- Geometry-heavy → base·height

```python
def area_cross(p1, p2, p3):
    """Area using cross product of vectors (most efficient with coordinates)."""
    return 0.5 * abs(
        (p2[0] - p1[0]) * (p3[1] - p1[1]) -
        (p2[1] - p1[1]) * (p3[0] - p1[0])
    )

def area_sine(a, b, angle_c_rad):
    """Area using two sides and included angle."""
    return 0.5 * a * b * math.sin(angle_c_rad)
```

> 📎 [Khan Academy: Triangle classification](https://www.khanacademy.org/math/geometry/hs-geo-foundations/hs-geo-classify-triangles) — Interactive classification practice
> 📎 [CP-Algorithms: Triangles](https://cp-algorithms.com/geometry/triangles.html) — Area formulas, angle computation, and problem-solving templates

### 🔍 3. PROBLEM RECOGNITION

**Keywords that signal triangle classification / property problems:**
- "triangle", "triangular", "triple", "triplet"
- "valid triangle", "triangle inequality"
- "equilateral", "isosceles", "scalene"
- "acute", "right", "obtuse"
- "hypotenuse", "leg", "base", "height"
- "perimeter", "area of triangle"
- "Heron", "semi-perimeter"
- "law of cosines", "law of sines"
- "Pythagorean triple"
- "non-degenerate"
- "30-60-90", "45-45-90"
- "isosceles right"
- "circumradius", "inradius", "circumcenter", "incenter"
- "centroid", "median"

**How interviewers frame these:**
- "Given three side lengths, determine if they can form a valid triangle"
- "Classify this triangle by its sides and angles"
- "Find the maximum perimeter triangle from an array of side lengths"
- "Count the number of valid triangles that can be formed from an array of lengths"
- "Given three points, find the area of the triangle they form"
- "Determine if a triangle is right-angled from its coordinates"
- "Given two sides and the included angle, find the third side"
- "What is the largest possible side of a triangle if the other two sides are 5 and 8?"
- "Find the third vertex of an equilateral triangle given two vertices"

**Hidden triangle patterns:**
- "Minimum distance to three points" — often involves the Fermat point of a triangle
- "Polygon triangulation" — DP on triangles formed within a polygon
- "Graph shortest path" — the triangle inequality says the direct edge is always ≤ any indirect path
- "Check if points are in convex position" — uses triangle orientation tests
- "Steiner tree" problems often involve triangle geometry

### 🧩 4. PATTERN ANALYSIS

#### Pattern 1: Sort + Triangle Inequality (Greedy)
- **When to use:** Given array of side lengths, find max perimeter triangle
- **Why it works:** After sorting, the three largest sides that satisfy `a + b > c` give the max perimeter (greedy property)
- **Complexity:** O(n log n) sort, O(n) scan
- **Common mistake:** Checking all triples O(n³) instead of using the sorted greedy property
- **Key insight:** If `sorted[i] + sorted[i+1] <= sorted[i+2]` for the largest i, then no triple with those two as smallest sides works; move to the next pair

#### Pattern 2: Sort + Two-Pointer for Triangle Counting
- **When to use:** Count how many triples in an array can form valid triangles
- **Why it works:** Sorting lets us fix two sides and use two-pointer to find valid third sides in O(n²)
- **Complexity:** O(n²) time, O(1) space
- **Common mistake:** Off-by-one in the two-pointer bounds when `k` overruns `n`
- **Key insight:** For a fixed `i` and `j`, all `k` from `j+1` to some upper bound are valid, not just one

#### Pattern 3: Angle Classification from Side Lengths
- **When to use:** Classify a triangle as acute, right, or obtuse from side data
- **Why it works:** The law of cosines directly tells us the type via `c² ≷ a² + b²`
- **Complexity:** O(1)
- **Key insight:** Sort sides first, then compare the square of the largest to the sum of squares of the two smaller ones
- **Common mistake:** Applying the test without sorting — you must use the largest side as `c`

#### Pattern 4: Multiple Area Formulas for Different Data
- **When to use:** Compute triangle area given various input formats (coordinates, sides, angles)
- **Why it works:** Each formula (shoelace, Heron, base·height, ½ab·sinC) uses the data you have and avoids computing what you don't
- **Complexity:** O(1)
- **Key insight:** The cross product / shoelace formula is the most robust for coordinate inputs; Heron is best for side-only inputs
- **Common mistake:** Using Heron when coordinates are available (introduces unnecessary sqrt and subtraction errors)

#### Pattern 5: Special Triangle Properties
- **When to use:** Problems involving 30-60-90 or 45-45-90 triangles, or when you need circumradius / inradius
- **Why it works:** These triangles have fixed side ratios that let you solve for unknowns immediately
- **Complexity:** O(1)
- **Key insight:** The 30-60-90 ratio (1:√3:2) and 45-45-90 ratio (1:1:√2) appear in many grid and coordinate problems
- **Common mistake:** Confusing which side is the short leg vs long leg in 30-60-90

### ⚡ 5. BRUTE FORCE → OPTIMIZED SOLUTIONS

#### Problem 1: Maximum Perimeter Triangle (LeetCode 976)

**A. Intuition:** Given an array of side lengths, find the largest possible perimeter of a valid triangle. The triangle inequality requires `a + b > c` for the three chosen sides.

**B. Brute Force (O(n³)):**
```python
def max_perimeter_brute(nums):
    n = len(nums)
    ans = 0
    for i in range(n):
        for j in range(i + 1, n):
            for k in range(j + 1, n):
                sides = sorted([nums[i], nums[j], nums[k]])
                if sides[0] + sides[1] > sides[2]:
                    ans = max(ans, sum(sides))
    return ans
```

**C. Why Slow:** O(n³) is infeasible for n > 500. The problem constraints allow up to n = 10⁴.

**D. Step-by-Step Optimization:**
1. **Key observation:** After sorting descending, if `nums[i] < nums[i+1] + nums[i+2]`, then this triple is valid and gives the maximum possible perimeter for any triple containing the largest side nums[i].
2. If the first triple (with the largest three numbers) doesn't work, slide the window: try `nums[i+1], nums[i+2], nums[i+3]`, etc.
3. The first valid triple encountered gives the maximum perimeter because we checked the largest possible sides first.

**E. Final Optimized (O(n log n)):**
```python
def largest_perimeter(nums):
    nums.sort(reverse=True)
    for i in range(len(nums) - 2):
        if nums[i] < nums[i+1] + nums[i+2]:
            return nums[i] + nums[i+1] + nums[i+2]
    return 0
```

**F. Edge Cases:**
- No valid triangle → return 0
- Duplicate values → still works because they are distinct elements
- n < 3 → return 0 (need at least 3 sides)

**G. Code (C++):**
```cpp
int largestPerimeter(vector<int>& nums) {
    sort(nums.rbegin(), nums.rend());
    for (int i = 0; i < (int)nums.size() - 2; i++) {
        if (nums[i] < nums[i+1] + nums[i+2])
            return nums[i] + nums[i+1] + nums[i+2];
    }
    return 0;
}
```

#### Problem 2: Count Valid Triangle Triples (LeetCode 611)

**A. Intuition:** Given an array, count all triples `(i, j, k)` that can form a valid triangle.

**B. Brute Force (O(n³)):**
```python
def triangle_count_brute(nums):
    n = len(nums)
    count = 0
    for i in range(n):
        for j in range(i + 1, n):
            for k in range(j + 1, n):
                sides = sorted([nums[i], nums[j], nums[k]])
                if sides[0] + sides[1] > sides[2]:
                    count += 1
    return count
```

**C. Why Slow:** O(n³) for n = 1000 is 10⁹ operations — too slow.

**D. Step-by-Step Optimization:**
1. Sort the array ascending.
2. For each pair `(i, j)` with `i < j`, find the largest `k > j` such that `nums[i] + nums[j] > nums[k]`.
3. Since the array is sorted, all indices between `j+1` and `k-1` also satisfy the inequality.
4. Advance `k` monotonically for each `j` (two-pointer) for O(n²) total.

**E. Final Optimized (O(n²)):**
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

**F. Edge Cases:**
- n < 3 → return 0
- All same values (e.g., [1, 1, 1]) → count = 1 (the only triple)
- Contains zeros → zeros can't be part of a valid triangle (0 + a ≤ a)

**G. Code (Java):**
```java
public int triangleNumber(int[] nums) {
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
}
```

#### Problem 3: Classify Triangle from Coordinates

**A. Intuition:** Given three coordinate points, classify the triangle by both sides and angles.

**B. Brute Force:** Compute squared distances, sort, classify by sides and by angles.

**C. Optimization:** Compute all three squared distances in one pass. Sort them. Apply both classification checks.

**D. Step-by-Step:**
1. Compute squared distances: d²_AB, d²_BC, d²_CA
2. Sort them as s0 ≤ s1 ≤ s2
3. Check triangle inequality: s0 + s1 > s2 (using `>` because these are squared)
4. Classify by sides: check equality of squared distances
5. Classify by angles: compare s2 with s0 + s1

**E. Code:**
```python
def classify_triangle(p1, p2, p3):
    def d2(a, b):
        return (a[0]-b[0])**2 + (a[1]-b[1])**2

    sq = sorted([d2(p1, p2), d2(p2, p3), d2(p3, p1)])

    # Triangle inequality check (using squared distances — equivalent)
    if sq[0] + sq[1] <= sq[2] or sq[0] <= 0:
        return "Invalid"

    # Side classification
    if sq[0] == sq[1] == sq[2]:
        side = "Equilateral"
    elif sq[0] == sq[1] or sq[1] == sq[2] or sq[0] == sq[2]:
        side = "Isosceles"
    else:
        side = "Scalene"

    # Angle classification
    if sq[2] < sq[0] + sq[1]:
        angle = "Acute"
    elif sq[2] == sq[0] + sq[1]:
        angle = "Right"
    else:
        angle = "Obtuse"

    return f"{side} {angle}"
```

**F. Edge Cases:** Collinear points → Invalid. Duplicate points → Invalid (zero area).

### 🏆 6. CURATED PROBLEMS

| # | Problem | Platform | Difficulty | URL | Concepts |
|---|---|---|---|---|---|
| 1 | Type of Triangle | LeetCode | Easy | https://leetcode.com/problems/type-of-triangle/ | Triangle classification |
| 2 | Largest Perimeter Triangle | LeetCode | Easy | https://leetcode.com/problems/largest-perimeter-triangle/ | Max perimeter, greedy |
| 3 | Valid Triangle Number | LeetCode | Medium | https://leetcode.com/problems/valid-triangle-number/ | Counting, two-pointer |
| 4 | Make a triangle! | Codeforces | 800 | https://codeforces.com/problemset/problem/1064/A | Triangle inequality |
| 5 | Mahmoud and a Triangle | Codeforces | 1000 | https://codeforces.com/problemset/problem/766/B | Triangle existence |
| 6 | Bad Triangle | Codeforces | 800 | https://codeforces.com/problemset/problem/1398/A | Non-triangle triple |
| 7 | Cut the Triangle | Codeforces | 800 | https://codeforces.com/problemset/problem/1767/A | Axis-aligned triangles |
| 8 | Vanya and Triangles | Codeforces | 1900 | https://codeforces.com/problemset/problem/552/D | Collinearity, combinatorics |
| 9 | Minimum Score Triangulation of Polygon | LeetCode | Medium | https://leetcode.com/problems/minimum-score-triangulation-of-polygon/ | Interval DP, triangulation |
| 10 | Largest Triangle Area | LeetCode | Easy | https://leetcode.com/problems/largest-triangle-area/ | Shoelace, cross product |
| 11 | Triangle (LeetCode 120) | LeetCode | Medium | https://leetcode.com/problems/triangle/ | Path DP in triangle grid |
| 12 | Triangles on a Rectangle | Codeforces | 1000 | https://codeforces.com/problemset/problem/1620/B | Max area on rectangle boundary |
| 13 | ABC033D — Triangle Classification | AtCoder | 2248 | https://atcoder.jp/contests/abc033/tasks/abc033_d | Acute/right/obtuse counting |
| 14 | Count the number of possible triangles | GeeksforGeeks | Medium | https://www.geeksforgeeks.org/problems/count-the-number-of-possible-triangles | Counting, two-pointer |
| 15 | Point Location Test | CSES | -- | https://cses.fi/problemset/task/2189 | Orientation (cross product) |

### ✏️ 7. PRACTICE PROBLEMS

**Problem 1: Valid Triangle from Three Lengths**
Given three side lengths, return "YES" if they can form a non-degenerate triangle, "NO" otherwise.

**Solution:**
```python
def is_triangle(a, b, c):
    sides = sorted([a, b, c])
    return "YES" if sides[0] + sides[1] > sides[2] else "NO"
```

**Problem 2: Complete the Triangle**
Given two sides a and b of a triangle, find the range of possible integer values for the third side c, assuming c is also an integer.

**Solution:** By the triangle inequality:
- `c > |a - b|` (lower bound, exclusive)
- `c < a + b` (upper bound, exclusive)

So valid integer c satisfies: `|a - b| < c < a + b`.

```python
def third_side_range(a, b):
    lo = abs(a - b) + 1
    hi = a + b - 1
    return lo, hi  # inclusive range of valid integer c
```

**Problem 3: Area from Side Lengths**
Given three side lengths, compute the area rounded to 2 decimal places, or print "Invalid" if they cannot form a triangle.

**Solution:**
```python
import math

def area_from_sides(a, b, c):
    if not (a + b > c and a + c > b and b + c > a):
        return "Invalid"
    s = (a + b + c) / 2
    area = math.sqrt(s * (s - a) * (s - b) * (s - c))
    return round(area, 2)
```

**Problem 4: Right Triangle from Hypotenuse**
Given an integer c (hypotenuse), count how many integer right triangles exist with that exact hypotenuse. A right triangle with integer legs a, b satisfies `a² + b² = c²`.

**Solution:** Iterate a from 1 to c-1, compute `b² = c² - a²`, check if b is an integer.

```python
import math

def count_right_triangles(c):
    count = 0
    c2 = c * c
    for a in range(1, c):
        b2 = c2 - a * a
        b = int(math.isqrt(b2))
        if b * b == b2 and b > 0:
            count += 1
    return count // 2  # each pair (a, b) counted twice
```

**Problem 5: Find the Missing Vertex of an Equilateral Triangle**
Given two vertices of an equilateral triangle (with integer coordinates), find the third vertex. There are two possible answers.

**Solution:** The two known points form one side. The third vertex is obtained by rotating the vector from the midpoint by ±60°.

```python
import math

def third_vertex(p1, p2):
    x1, y1 = p1
    x2, y2 = p2
    mx, my = (x1 + x2) / 2, (y1 + y2) / 2
    dx, dy = x2 - x1, y2 - y1
    # Rotate (dx, dy) by ±90°, scale appropriately
    # For equilateral: height = side * sqrt(3)/2
    h = math.sqrt(3) / 2
    # Third vertex = midpoint ± (-dy, dx) * (sqrt(3)/2)
    v1 = (mx - dy * h, my + dx * h)
    v2 = (mx + dy * h, my - dx * h)
    return v1, v2
```

### 📝 8. CHAPTER QUIZ

**Q1:** What is the minimum number of equal sides an isosceles triangle has?
<details>
<summary>Answer</summary>
Two. An isosceles triangle has at least two equal sides.
</details>

**Q2:** If a triangle has sides 3, 4, and 8, can it be a valid triangle?
<details>
<summary>Answer</summary>
No. 3 + 4 = 7 < 8, violating the triangle inequality.
</details>

**Q3:** What is the semi-perimeter s of a triangle with sides 5, 6, 7?
<details>
<summary>Answer</summary>
s = (5 + 6 + 7) / 2 = 9
</details>

**Q4:** In a right triangle with legs 6 and 8, what is the hypotenuse?
<details>
<summary>Answer</summary>
10. 6² + 8² = 36 + 64 = 100 = 10².
</details>

**Q5:** What is the side ratio for a 30-60-90 triangle?
<details>
<summary>Answer</summary>
Short leg : long leg : hypotenuse = 1 : √3 : 2
</details>

**Q6:** If a triangle has sides 5, 5, 8, what is its angle classification?
<details>
<summary>Answer</summary>
Obtuse. Largest side = 8. 8² = 64 > 5² + 5² = 50.
</details>

**Q7:** How many right angles can a triangle have?
<details>
<summary>Answer</summary>
At most one. The sum of angles is 180°, so if there were two 90° angles, the third would be 0° (degenerate).
</details>

**Q8:** Law of cosines: if a = 5, b = 6, and angle C = 60°, what is c?
<details>
<summary>Answer</summary>
c² = 5² + 6² - 2·5·6·cos(60°) = 25 + 36 - 60·0.5 = 61 - 30 = 31. c = √31 ≈ 5.57.
</details>

**Q9:** Which area formula should you use when given three coordinate points?
<details>
<summary>Answer</summary>
The shoelace formula (or cross product): Area = ½|x₁(y₂−y₃) + x₂(y₃−y₁) + x₃(y₁−y₂)|.
</details>

**Q10:** In a 45-45-90 triangle, if the hypotenuse is 10, what is the length of each leg?
<details>
<summary>Answer</summary>
Leg = hypotenuse / √2 = 10 / √2 = 5√2 ≈ 7.07.
</details>

### 🃏 9. FLASHCARDS / KEY TAKEAWAYS

**Card 1:** **Triangle inequality**
`a + b > c`, `a + c > b`, `b + c > a`. If sides are sorted `a ≤ b ≤ c`, only `a + b > c` matters. Degenerate case: `a + b = c`.

**Card 2:** **Heron's formula**
`Area = √(s(s-a)(s-b)(s-c))` where `s = (a+b+c)/2`. Use when only side lengths are known.

**Card 3:** **Angle classification from sides (c = largest)**
- Acute: `c² < a² + b²`
- Right: `c² = a² + b²`
- Obtuse: `c² > a² + b²`

**Card 4:** **Law of cosines**
`c² = a² + b² - 2ab·cos(C)`. Generalises Pythagoras to any triangle.

**Card 5:** **Law of sines**
`a/sin(A) = b/sin(B) = c/sin(C) = 2R` (circumdiameter).

**Card 6:** **Special triangle ratios**
- 30-60-90: 1 : √3 : 2
- 45-45-90: 1 : 1 : √2

**Card 7:** **Triangle side → angle relationship**
Largest side ↔ largest angle. Smallest side ↔ smallest angle.

**Card 8:** **Centroid coordinates**
`((x₁ + x₂ + x₃)/3, (y₁ + y₂ + y₃)/3)` — intersection of medians, divides each median 2:1.

**Card 9:** **Area formula cheat sheet**
- Coordinates: shoelace / cross product
- Side lengths: Heron
- Two sides + included angle: ½ab·sin(C)
- Base + height: ½·base·height

**Card 10:** **Maximum perimeter triangle (greedy)**
Sort descending. Return the first triple satisfying `a < b + c`. O(n log n).

### 📎 10. REFERENCES & FURTHER READING

> 📎 [Wikipedia: Triangle](https://en.wikipedia.org/wiki/Triangle) — Comprehensive reference on all triangle properties, formulas, and special points
> 📎 [Wikipedia: Triangle inequality](https://en.wikipedia.org/wiki/Triangle_inequality) — The fundamental constraint on triangle side lengths with extensions to metric spaces
> 📎 [Wikipedia: Heron's formula](https://en.wikipedia.org/wiki/Heron%27s_formula) — Full derivation, history, and numerically stable variants
> 📎 [CP-Algorithms: Triangles](https://cp-algorithms.com/geometry/triangles.html) — Competitive programming reference for triangle area computation and angle finders
> 📎 [Khan Academy: Triangle classification](https://www.khanacademy.org/math/geometry/hs-geo-foundations/hs-geo-classify-triangles) — Interactive classification exercises
> 📎 [Wikipedia: Law of cosines](https://en.wikipedia.org/wiki/Law_of_cosines) — Statement, proof, and applications
> 📎 [Wikipedia: Law of sines](https://en.wikipedia.org/wiki/Law_of_sines) — Statement, proof, and the ambiguous case (SSA)
## Chapter 5: Triangles — Area, Counting & DP

### 🎯 Learning Objectives

By the end of this chapter, you will be able to:
- Compute triangle area from coordinates using the Shoelace formula
- Derive the Shoelace formula from the 2D cross product
- Count valid triangles from an array of side lengths in O(n²) using two pointers
- Find the maximum area triangle from a set of points in O(n³)
- Apply interval DP to polygon triangulation problems
- Count triangles in grid graphs and directed graphs
- Distinguish between area computed from coordinates vs side lengths
- Solve distinct-areas and max-area-with-given-base problems

### 📖 1. INTRODUCTION

Triangles are the simplest polygons, yet they form the foundation of computational geometry. Whether you're rendering 3D graphics, computing the convex hull of a point set, or solving competitive programming problems, triangle computations appear everywhere.

The area of a triangle can be computed in two fundamental ways:
1. **From side lengths** — using Heron's formula: $A = \sqrt{s(s-a)(s-b)(s-c)}$ where $s = (a+b+c)/2$
2. **From coordinates** — using the Shoelace formula: $A = \frac{1}{2}|x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2)|$

In competitive programming, coordinate-based approaches dominate because points are the natural input format. This chapter bridges the gap between the raw geometry of triangles and the algorithmic techniques needed to count, compare, and optimize them.

> 📎 [Wikipedia: Shoelace formula](https://en.wikipedia.org/wiki/Shoelace_formula) — comprehensive reference with historical context and derivations

> 📎 [CP-Algorithms: Oriented triangle area](https://cp-algorithms.com/geometry/oriented-triangle-area.html) — practical guide with implementation details

> 📎 [LeetCode: Valid Triangle Number](https://leetcode.com/problems/valid-triangle-number/) — counting triangles from side lengths

> 📎 [LeetCode: Minimum Score Triangulation of Polygon](https://leetcode.com/problems/minimum-score-triangulation-of-polygon/) — DP on polygon triangulation

### 📚 2. CORE CONCEPTS

---

#### Concept 1: Triangle Area from Coordinates — The Shoelace Formula

**Intuition:** Imagine drawing a triangle on graph paper. The Shoelace formula systematically accounts for all the grid squares the triangle covers by summing signed areas of trapezoids formed by each edge with the x-axis. The name comes from the criss-cross pattern of the multiplications — like lacing a shoe.

**What it computes:** Given three vertices $(x_1,y_1), (x_2,y_2), (x_3,y_3)$, the **signed** area (positive if vertices are counterclockwise, negative if clockwise):

$$A = \frac{1}{2}\left|x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2)\right|$$

Equivalently, in determinant form:

$$A = \frac{1}{2}\left|\begin{vmatrix} x_1 & y_1 & 1 \\ x_2 & y_2 & 1 \\ x_3 & y_3 & 1 \end{vmatrix}\right|$$

**Derivation via cross product:** Consider vectors $\vec{AB} = (x_2 - x_1, y_2 - y_1)$ and $\vec{AC} = (x_3 - x_1, y_3 - y_1)$. The area of the parallelogram spanned by these vectors is the magnitude of their 2D cross product:

$$\text{Parallelogram area} = |\vec{AB} \times \vec{AC}| = |(x_2 - x_1)(y_3 - y_1) - (x_3 - x_1)(y_2 - y_1)|$$

The triangle area is half of this. Expanding the determinant gives exactly the Shoelace expression:

$$A = \frac{1}{2}|x_1y_2 + x_2y_3 + x_3y_1 - (y_1x_2 + y_2x_3 + y_3x_1)|$$

**Edge cases:**
- Collinear points → area = 0 (the cross product vanishes)
- Large integer coordinates → use 64-bit integers; $2A$ is always an integer if coordinates are integers
- Floating-point precision → prefer integer arithmetic when possible, use `double` only when necessary

**Formula:** The general Shoelace for a polygon with $n$ vertices:

$$A = \frac{1}{2}\left|\sum_{i=1}^{n} (x_i y_{i+1} - x_{i+1} y_i)\right|$$

where $(x_{n+1}, y_{n+1}) = (x_1, y_1)$.

```python
def triangle_area(x1, y1, x2, y2, x3, y3):
    """Returns twice the signed area (for integer coordinates)."""
    return abs(x1*(y2 - y3) + x2*(y3 - y1) + x3*(y1 - y2))

def triangle_area_double(x1, y1, x2, y2, x3, y3):
    """Returns floating-point area."""
    return 0.5 * triangle_area(x1, y1, x2, y2, x3, y3)
```

> 📎 [Wikipedia: Shoelace formula](https://en.wikipedia.org/wiki/Shoelace_formula)

---

#### Concept 2: Triangle Area from Side Lengths — Heron's Formula

**Intuition:** If you only know the three side lengths (no coordinates), the area is determined uniquely up to congruence. Heron's formula uses the semiperimeter to find the area.

**Formula:** $A = \sqrt{s(s-a)(s-b)(s-c)}$ where $s = \frac{a+b+c}{2}$

**Edge cases:**
- The triangle inequality must hold: $a + b > c$, $a + c > b$, $b + c > a$
- Floating-point precision matters when sides are large
- For integer side lengths, the area may be irrational

```python
import math

def heron_area(a, b, c):
    if a + b <= c or a + c <= b or b + c <= a:
        return 0.0  # degenerate
    s = (a + b + c) / 2.0
    return math.sqrt(s * (s - a) * (s - b) * (s - c))
```

---

#### Concept 3: Triangle Inequality — Counting Valid Triangles

**Intuition:** Three side lengths form a triangle iff the sum of the two smaller sides exceeds the largest side. This single check suffices after sorting.

**Derivation:** For sides $a \le b \le c$, the inequalities $a + c > b$ and $b + c > a$ are automatically true since $c$ is the largest. Only $a + b > c$ matters.

```python
def is_valid_triangle(a, b, c):
    a, b, c = sorted([a, b, c])
    return a + b > c
```

---

#### Concept 4: Counting Triangles in Grid Graphs

**Intuition:** In a directed graph, a triangle is a set of three vertices where each pair is connected by a directed edge forming a cycle. Counting these efficiently requires matrix multiplication or combinatorial tricks.

For an undirected graph, count the number of 3-cycles. For large graphs, use the trace of $A^3$ divided by 6 (each triangle counted 6 times).

---

#### Concept 5: Minimum Score Triangulation of a Polygon (DP)

**Intuition:** Given a convex polygon with vertex weights, triangulate it into $n-2$ triangles minimizing the sum of products of vertex weights per triangle. This is a classic interval DP — the **matrix chain multiplication** pattern applied to polygons.

**What it computes:** For vertices $v_0, v_1, ..., v_{n-1}$, choose the optimal set of non-intersecting diagonals. The key insight: fix vertex $i$ and $j$, then pick a third vertex $k$ between them to form triangle $(i, k, j)$, recursively solve $(i, k)$ and $(k, j)$.

**Recurrence:**
$$dp[i][j] = \min_{i < k < j} \big(dp[i][k] + dp[k][j] + values[i] \times values[k] \times values[j]\big)$$

**Base case:** $dp[i][i+1] = 0$ (no triangle possible with 2 vertices), $dp[i][i+2] = values[i] \times values[i+1] \times values[i+2]$ (a single triangle).

**Edge cases:** $n < 3$ is undefined; $n = 3$ returns the product of all three values.

```python
def min_score_triangulation(values):
    n = len(values)
    dp = [[0] * n for _ in range(n)]
    for length in range(2, n):  # length = j - i
        for i in range(n - length):
            j = i + length
            dp[i][j] = float('inf')
            for k in range(i + 1, j):
                cost = (dp[i][k] + dp[k][j] +
                        values[i] * values[k] * values[j])
                dp[i][j] = min(dp[i][j], cost)
    return dp[0][n - 1]
```

> 📎 [LeetCode: Minimum Score Triangulation of Polygon](https://leetcode.com/problems/minimum-score-triangulation-of-polygon/)

---

#### Concept 6: Cross Product Orientation

**Intuition:** The sign of the 2D cross product tells you whether three points make a left turn (CCW), right turn (CW), or are collinear.

**Formula:** $\text{cross}(A, B, C) = (B_x - A_x)(C_y - A_y) - (B_y - A_y)(C_x - A_x)$

- Positive → counterclockwise (left turn)
- Negative → clockwise (right turn)
- Zero → collinear

This is essential for convex hull algorithms and for determining triangle orientation.

### 🔍 3. PROBLEM RECOGNITION

Triangle problems in competitive programming fall into these categories:

| Category | Signs | Typical Constraints |
|----------|-------|-------------------|
| **Area from coordinates** | Points given, asks for area/max area/distinct areas | $n \le 2000$ |
| **Valid triangle counting** | Array of side lengths, count triplets forming triangle | $n \le 10^3$ or $n \le 10^5$ |
| **Polygon triangulation DP** | Convex polygon, min/max cost triangulation | $n \le 50$ |
| **Triangle in graphs** | Directed/undirected graph, count 3-cycles | $n \le 500$ |
| **Grid triangle counting** | Grid points, count right triangles / all triangles | Grid size $\le 50$ to $2500$ |

**Key triggers:**
- "Number of triplets that can form a triangle" → sorting + two-pointer
- "Maximum area triangle from points" → shoelace + brute force (O(n³) is often acceptable for $n \le 500$)
- "Minimum score triangulation" → interval DP
- "Distinct areas" → compute all areas, store in set
- "Triangles in graph" → $A^3$ trace or combinatorial counting

### 🧩 4. PATTERN ANALYSIS

---

#### Pattern 1: Two-Pointer Triangle Counting

**When to use:** Given an array of side lengths, count how many triplets form a triangle.

**Complexity:** O(n²) after sorting O(n log n).

**Key insight:** Sort the array. Fix the largest side $c$ at index $i$ (iterating from the end). Use two pointers `left` (smallest) and `right = i-1` (middle). If `nums[left] + nums[right] > nums[i]`, then all pairs from `left` to `right-1` also work, so add `right - left` to count and decrement `right`. Otherwise, increment `left`.

---

#### Pattern 2: Shoelace for Max Area

**When to use:** Given points on a plane, find the triangle with maximum area.

**Complexity:** O(n³) brute force, O(n² log n) with rotating calipers on convex hull.

**Key insight:** For $n \le 500$, O(n³) is perfectly acceptable. First compute the convex hull, then the maximum area triangle's vertices lie on the hull. For larger $n$, use rotating calipers to find the farthest point from each edge in O(n²).

---

#### Pattern 3: Interval DP on Polygons

**When to use:** Convex polygon, additive cost function over triangles.

**Complexity:** O(n³) time, O(n²) space.

**Key insight:** Fix two vertices $(i, j)$ as the base of a triangle. Pick a third vertex $k$ between them. The polygon is split into $(i, k)$, $(k, j)$, and triangle $(i, k, j)$. This is the same recurrence as matrix chain multiplication and burst balloons.

---

#### Pattern 4: Distinct Areas Set

**When to use:** Count how many different triangle areas can be formed from a set of points/side lengths.

**Complexity:** O(n³) or O(n²) depending on problem.

**Key insight:** Compute all possible areas, insert into a hash set, return its size. For side-length problems, Heron's formula may produce irrational numbers — use squared area (via cross product) instead to keep things integral.

---

#### Pattern 5: Counting Triangles in Directed Graphs

**When to use:** Given a directed graph, count the number of directed 3-cycles.

**Complexity:** O(n³) naive, O(n^{2.81}) with Strassen, O(n²) for special graphs.

**Key insight:** The number of directed triangles = $\frac{1}{6} \sum_i (A^3)_{ii}$, where $A$ is the adjacency matrix. For sparse graphs, use neighbor intersection checks instead.

### ⚡ 5. BRUTE FORCE → OPTIMIZED SOLUTIONS

---

#### Problem 1: Valid Triangle Number (LeetCode 611)

**Intuition:** Given an array `nums`, count the number of triplets that can form a triangle.

**Brute Force:**

```python
def triangle_number_bruteforce(nums):
    n = len(nums)
    count = 0
    for i in range(n):
        for j in range(i + 1, n):
            for k in range(j + 1, n):
                a, b, c = sorted([nums[i], nums[j], nums[k]])
                if a + b > c:
                    count += 1
    return count
```

**Why Slow:** O(n³) with $n \le 1000$ gives up to $10^9$ iterations. Unacceptable.

**Step-by-Step Optimization:**

1. **Sort** the array — O(n log n). Now if $a \le b \le c$, only $a + b > c$ needs checking.

2. **Fix the largest side $c$** at index $i$ (iterating from $n-1$ down to $2$). The two smaller sides must come from indices $[0, i-1]$.

3. **Two-pointer scan:** Set `left = 0`, `right = i - 1`. If `nums[left] + nums[right] > nums[i]`, then every pair $(left, right), (left+1, right), ..., (right-1, right)$ is valid — that's `right - left` pairs. Decrement `right`. Otherwise, increment `left`.

**Why this works:** Since the array is sorted, if `nums[left] + nums[right] > nums[i]`, then any $k$ with `left < k < right` also satisfies `nums[k] + nums[right] > nums[i]` (because `nums[k] >= nums[left]`). So we count all at once.

**Final Code:**

```python
def triangleNumber(nums):
    nums.sort()
    n = len(nums)
    count = 0
    for i in range(n - 1, 1, -1):
        left, right = 0, i - 1
        while left < right:
            if nums[left] + nums[right] > nums[i]:
                count += right - left
                right -= 1
            else:
                left += 1
    return count
```

**Edge Cases:**
- `n < 3` → return 0
- All zeros → return 0
- Large equal values: `[1000, 1000, 1000, 1000]` → 4 choose 3 = 4
- Duplicates handled correctly by index-based approach

**C++ Code:**

```cpp
int triangleNumber(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    int n = nums.size(), count = 0;
    for (int i = n - 1; i >= 2; i--) {
        int left = 0, right = i - 1;
        while (left < right) {
            if (nums[left] + nums[right] > nums[i]) {
                count += right - left;
                right--;
            } else {
                left++;
            }
        }
    }
    return count;
}
```

**Java Code:**

```java
public int triangleNumber(int[] nums) {
    Arrays.sort(nums);
    int n = nums.length, count = 0;
    for (int i = n - 1; i >= 2; i--) {
        int left = 0, right = i - 1;
        while (left < right) {
            if (nums[left] + nums[right] > nums[i]) {
                count += right - left;
                right--;
            } else {
                left++;
            }
        }
    }
    return count;
}
```

---

#### Problem 2: Largest Triangle Area (LeetCode 812)

**Intuition:** Given an array of points, find the maximum area of any triangle formed by three of them.

**Brute Force:**

```python
def largestTriangleArea(points):
    n = len(points)
    max_area = 0
    for i in range(n):
        x1, y1 = points[i]
        for j in range(i + 1, n):
            x2, y2 = points[j]
            for k in range(j + 1, n):
                x3, y3 = points[k]
                area = abs(x1*(y2 - y3) + x2*(y3 - y1) + x3*(y1 - y2))
                if area > max_area:
                    max_area = area
    return max_area / 2.0
```

**Why Slow (but often acceptable):** O(n³) with $n \le 50$ is at most ~20K iterations. Even for $n = 500$, it's ~20M operations — fine in Python with optimizations.

**Step-by-Step Optimization:**

1. The Shoelace formula gives **twice the signed area** as an integer. Compare `2 * area` directly to avoid floating-point division.
2. Early exit if a point is the same as another (area = 0).
3. For larger $n$ ($n \le 2000$), compute the convex hull first. The maximum area triangle's vertices all lie on the convex hull.
4. On the hull, use **rotating calipers**: for each edge $(i, j)$, find the farthest point $k$ as you rotate around. This is O(h²) where $h$ is hull size.

**Final Code (Brute force, acceptable for $n \le 500$):**

```python
def largestTriangleArea(points):
    n = len(points)
    best = 0
    for i in range(n):
        x1, y1 = points[i]
        for j in range(i + 1, n):
            x2, y2 = points[j]
            for k in range(j + 1, n):
                x3, y3 = points[k]
                area = abs(x1*(y2 - y3) + x2*(y3 - y1) + x3*(y1 - y2))
                if area > best:
                    best = area
    return best / 2.0
```

**Edge Cases:**
- Collinear points → area = 0 (correctly handled)
- Fewer than 3 points → return 0.0
- Integer overflow: coordinates up to $10^4$, area up to $10^8$, fits in 64-bit

**C++ Code:**

```cpp
double largestTriangleArea(vector<vector<int>>& points) {
    int n = points.size();
    double best = 0;
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            for (int k = j + 1; k < n; k++) {
                double area = abs(
                    points[i][0] * (points[j][1] - points[k][1]) +
                    points[j][0] * (points[k][1] - points[i][1]) +
                    points[k][0] * (points[i][1] - points[j][1])
                ) / 2.0;
                best = max(best, area);
            }
        }
    }
    return best;
}
```

**Java Code:**

```java
public double largestTriangleArea(int[][] points) {
    int n = points.length;
    double best = 0;
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            for (int k = j + 1; k < n; k++) {
                double area = Math.abs(
                    points[i][0] * (points[j][1] - points[k][1]) +
                    points[j][0] * (points[k][1] - points[i][1]) +
                    points[k][0] * (points[i][1] - points[j][1])
                ) / 2.0;
                best = Math.max(best, area);
            }
        }
    }
    return best;
}
```

### 🏆 6. CURATED PROBLEMS

| # | Problem | Platform | Difficulty | URL | Concepts |
|---|---------|----------|-----------|-----|----------|
| 1 | Valid Triangle Number | LeetCode | Medium | https://leetcode.com/problems/valid-triangle-number/ | Two-pointer, sorting, triangle inequality |
| 2 | Largest Triangle Area | LeetCode | Easy | https://leetcode.com/problems/largest-triangle-area/ | Shoelace formula, brute force |
| 3 | Bovine Dilemma | Codeforces | 800 | https://codeforces.com/problemset/problem/1466/A | Distinct areas, shoelace, set |
| 4 | Minimum Score Triangulation of Polygon | LeetCode | Medium | https://leetcode.com/problems/minimum-score-triangulation-of-polygon/ | Interval DP, polygon triangulation |
| 5 | Number of Triangles in a Directed Graph | GFG | Medium | https://www.geeksforgeeks.org/number-of-triangles-in-a-directed-graph/ | Graph theory, adjacency matrix, trace |
| 6 | Max Area of Triangle from Points | Codeforces | 1200 | https://codeforces.com/problemset/problem/1466/A | Shoelace, distinct areas |
| 7 | Triangle | Codeforces | 800 | https://codeforces.com/problemset/problem/6/A | Triangle inequality |
| 8 | Minimum Cost Polygon Triangulation | GFG | Hard | https://www.geeksforgeeks.org/minimum-cost-polygon-triangulation/ | DP, perimeter-based cost |
| 9 | Count the number of possible triangles | GFG | Medium | https://www.geeksforgeeks.org/find-number-of-triangles-possible/ | Two-pointer |
| 10 | Points and Minimum Distance | CSES | Medium | https://cses.fi/problemset/ | Geometry, closest pair (related) |

### ✏️ 7. PRACTICE PROBLEMS

---

#### Problem 1: Distinct Triangle Areas

Given points $(0, 1)$ and $(x_i, 0)$ where $x_i$ are distinct integers, count the number of distinct nonzero triangle areas.

**Solution:** The base is from $(0, 1)$ to some $(x_i, 0)$ on the x-axis. The area is $\frac{1}{2} \cdot \text{base} \cdot \text{height}$. Since the third vertex is always at $(0, 1)$, the height is fixed at 1. The area = $\frac{1}{2} \cdot \text{base}$. Bases are differences between any two $x_i$ values and $0$. So count the number of distinct differences $|x_i - 0|$ where $x_i \ne 0$.

More generally, for the Bovine Dilemma problem, count distinct $|x_i - x_j|$ for $i < j$.

```python
def distinct_triangle_areas(x_coords):
    diffs = set()
    n = len(x_coords)
    for i in range(n):
        for j in range(i + 1, n):
            diffs.add(abs(x_coords[i] - x_coords[j]))
    return len(diffs)
```

---

#### Problem 2: Valid Triangle Number (solve from scratch)

Given `nums = [4, 6, 3, 7]`, count triangles.

**Solution:** Sort → `[3, 4, 6, 7]`. Fix `i = 3` (value 7): left=0 (3), right=2 (6). 3+6>7 ✓ → count += 2, right=1 (4). 3+4=7 ✗ → left=1 (4). 4+4=8 >7 ✓ → count += 0? Wait, right=left=1, loop ends. count=2. Fix `i = 2` (value 6): left=0 (3), right=1 (4). 3+4>6 ✓ → count += 1. Total = 3. Combinations: (3,4,6), (3,6,7), (4,6,7).

---

#### Problem 3: Min Score Triangulation

Given `values = [3, 7, 4, 5]`.

**Solution:** Two triangulations:
- (0,1,2)+(0,2,3): 3·7·4 + 3·4·5 = 84 + 60 = 144
- (0,1,3)+(1,2,3): 3·7·5 + 7·4·5 = 105 + 140 = 245

DP yields 144.

```python
def minScoreTriangulation(values):
    n = len(values)
    dp = [[0]*n for _ in range(n)]
    for j in range(2, n):
        for i in range(j-2, -1, -1):
            dp[i][j] = float('inf')
            for k in range(i+1, j):
                dp[i][j] = min(dp[i][j],
                    dp[i][k] + dp[k][j] + values[i]*values[k]*values[j])
    return dp[0][n-1]
```

---

#### Problem 4: Count Triangles in Directed Graph

Given adjacency matrix $A$, find number of directed triangles.

**Solution:** For each vertex $i$, for each neighbor $j$, for each neighbor $k$ of $j$, check if $k$ connects back to $i$. O($n^3$) naive or use trace of $A^3$.

```python
def count_directed_triangles(adj, n):
    count = 0
    for i in range(n):
        for j in range(n):
            if adj[i][j]:
                for k in range(n):
                    if adj[j][k] and adj[k][i]:
                        count += 1
    return count // 3  # each triangle counted 3 times
```

---

#### Problem 5: Maximum Area Triangle with Given Base

Given a set of points and a base segment AB, find the point C that maximizes triangle area.

**Solution:** The area is $\frac{1}{2} \times AB \times \text{distance from C to line AB}$. So find the point with maximum perpendicular distance from line AB. The area sign (cross product) tells you which side.

```python
def max_area_with_base(points, A, B):
    ax, ay = A
    bx, by = B
    best = 0
    for px, py in points:
        area = abs(ax*(by-py) + bx*(py-ay) + px*(ay-by))
        best = max(best, area)
    return best / 2.0
```

### 📝 8. CHAPTER QUIZ

**Q1:** What is the area of a triangle with vertices (0,0), (4,0), (0,3)?

<details><summary>Answer</summary>
$A = \frac{1}{2}|0(0-3) + 4(3-0) + 0(0-0)| = \frac{1}{2} \times 12 = 6$
</details>

**Q2:** What single condition must three side lengths $a \le b \le c$ satisfy to form a triangle?

<details><summary>Answer</summary>
$a + b > c$ (the other two inequalities are automatically true when $c$ is largest)
</details>

**Q3:** What is the time complexity of the optimal solution for Valid Triangle Number (LeetCode 611)?

<details><summary>Answer</summary>
O(n²) after sorting O(n log n). The two-pointer scan for each fixed largest side runs in linear time.
</details>

**Q4:** In the Minimum Score Triangulation DP, what is the base case for $dp[i][i+2]$?

<details><summary>Answer</summary>
$dp[i][i+2] = values[i] \times values[i+1] \times values[i+2]$ — a single triangle formed by three consecutive vertices.
</details>

**Q5:** Why does the Shoelace formula produce a signed area?

<details><summary>Answer</summary>
It computes the sum of cross products, which is positive for counterclockwise vertex ordering and negative for clockwise. The absolute value gives the unsigned area.
</details>

**Q6:** For $n$ points on a plane, what's the best-case time complexity for finding the maximum area triangle?

<details><summary>Answer</summary>
O(n²) with rotating calipers after computing the convex hull (O(n log n)). The hull size $h \le n$, and rotating calipers runs in O(h²).
</details>

**Q7:** How many triangles does a triangulation of an $n$-sided convex polygon contain?

<details><summary>Answer</summary>
$n - 2$ triangles. This follows from the Euler characteristic.
</details>

**Q8:** What's the 2D cross product of vectors (3,0) and (0,4)?

<details><summary>Answer</summary>
$3 \times 4 - 0 \times 0 = 12$. This is twice the area of the triangle formed by these vectors from the origin.
</details>

**Q9:** When can the brute-force O(n³) maximum area triangle be acceptable?

<details><summary>Answer</summary>
When $n \le 500$, O(n³) ≈ 20M operations, fine in most languages. LeetCode's Largest Triangle Area has $n \le 50$.
</details>

**Q10:** True or False: The Shoelace formula only works for triangles, not general polygons.

<details><summary>Answer</summary>
False. The Shoelace formula works for any simple polygon, summing over all edges: $A = \frac{1}{2}|\sum (x_i y_{i+1} - x_{i+1} y_i)|$.
</details>

### 🃏 9. FLASHCARDS

**Card 1:** Shoelace formula for triangle area
$$A = \frac{1}{2}|x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2)|$$

**Card 2:** Triangle inequality (sorted sides $a \le b \le c$)
$$a + b > c$$

**Card 3:** 2D cross product (signed area of parallelogram)
$$\vec{u} \times \vec{v} = u_x v_y - u_y v_x$$

**Card 4:** Min Score Triangulation DP recurrence
$$dp[i][j] = \min_{i < k < j} \big(dp[i][k] + dp[k][j] + v_i \cdot v_k \cdot v_j\big)$$

**Card 5:** Heron's formula
$$A = \sqrt{s(s-a)(s-b)(s-c)},\quad s = \frac{a+b+c}{2}$$

**Card 6:** Triangulation triangle count
$$\text{triangles} = n - 2$$

**Card 7:** Orientation test (cross product)
$$\text{cross}(A,B,C) = (B_x - A_x)(C_y - A_y) - (B_y - A_y)(C_x - A_x)$$

**Card 8:** Counting triangles in arrays — Two-pointer approach
Sort, fix largest, count valid pairs below with `nums[left] + nums[right] > nums[i]`.

**Card 9:** General Shoelace for $n$-gon
$$A = \frac{1}{2}\left|\sum_{i=1}^{n} (x_i y_{i+1} - x_{i+1} y_i)\right|$$

**Card 10:** Directed triangle count from adjacency matrix $A$
$$\text{count} = \frac{1}{6} \cdot \text{trace}(A^3)$$

### 📎 10. REFERENCES & FURTHER READING

1. Wikipedia: Shoelace formula — https://en.wikipedia.org/wiki/Shoelace_formula
2. CP-Algorithms: Oriented triangle area — https://cp-algorithms.com/geometry/oriented-triangle-area.html
3. LeetCode 611: Valid Triangle Number — https://leetcode.com/problems/valid-triangle-number/
4. LeetCode 812: Largest Triangle Area — https://leetcode.com/problems/largest-triangle-area/
5. LeetCode 1039: Minimum Score Triangulation of Polygon — https://leetcode.com/problems/minimum-score-triangulation-of-polygon/
6. Codeforces 1466A: Bovine Dilemma — https://codeforces.com/problemset/problem/1466/A
7. GFG: Number of Triangles in Directed Graph — https://www.geeksforgeeks.org/number-of-triangles-in-a-directed-graph/
8. GFG: Minimum Cost Polygon Triangulation — https://www.geeksforgeeks.org/minimum-cost-polygon-triangulation/
9. CLRS: Introduction to Algorithms — Chapter on Dynamic Programming (matrix chain multiplication pattern)
10. Burkard Polster: The Shoelace Book — AMS, 2006
## Chapter 6: Right Triangles & Pythagorean Theorem

### 🎯 Learning Objectives

By the end of this chapter, you will be able to:
- State and prove the Pythagorean theorem: $a^2 + b^2 = c^2$
- Generate Pythagorean triples using Euclid's formula
- Classify right triangles and identify legs vs hypotenuse
- Solve 30-60-90 and 45-45-90 special triangle problems
- Check right angles in coordinate geometry using dot product
- Count right triangles on a lattice grid
- Apply the law of cosines as a generalization of Pythagoras
- Solve Project Euler #91 and related counting problems

### 📖 1. INTRODUCTION

The Pythagorean theorem is arguably the most famous theorem in all of mathematics. It connects algebra to geometry, appears in every branch of science, and has hundreds of distinct proofs. In competitive programming, right triangles surface in problems about grid counting, coordinate geometry, distance computation, and even graph theory.

The theorem states that in a right triangle, the square of the hypotenuse equals the sum of squares of the two legs:

$$a^2 + b^2 = c^2$$

But more than a formula, Pythagoras is a **tool for classification**: given three points in the plane, we can check whether they form a right triangle by verifying whether the dot product of two edge vectors is zero. This algebraic test — not the length computation itself — is what makes the theorem so powerful in competitive programming.

> 📎 [Wikipedia: Pythagorean theorem](https://en.wikipedia.org/wiki/Pythagorean_theorem) — history, proofs, and generalizations

> 📎 [Wikipedia: Pythagorean triple](https://en.wikipedia.org/wiki/Pythagorean_triple) — generating triples with Euclid's formula

> 📎 [Wikipedia: Euclid's formula](https://en.wikipedia.org/wiki/Pythagorean_triple#Generating_a_triple) — the classical parametric form

> 📎 [Khan Academy: Pythagorean theorem proof](https://www.khanacademy.org/math/geometry/hs-geo-trig/hs-geo-pyth-theorem/v/pythagorean-theorem-proof) — visual proof with squares

### 📚 2. CORE CONCEPTS

---

#### Concept 1: The Pythagorean Theorem

**Intuition:** The most famous visual proof shows squares built on each side of a right triangle. The area of the large square on the hypotenuse equals the sum of the areas of the smaller squares on the legs. This isn't a coincidence — it follows from the additive property of area under congruence and similarity.

**What it computes:** Given a right triangle with legs $a, b$ and hypotenuse $c$:

$$a^2 + b^2 = c^2$$

**Visual proof:** Arrange four copies of the right triangle in a square of side $a+b$. The empty space in the center is $c^2$. Rearranging the triangles shows the same empty space equals $a^2 + b^2$.

**Edge cases:**
- The theorem only applies to **right** triangles (one angle = $90^\circ$)
- If $a^2 + b^2 < c^2$, the triangle is **obtuse** (angle > $90^\circ$)
- If $a^2 + b^2 > c^2$, the triangle is **acute** (all angles < $90^\circ$)

```python
def is_right_triangle(a, b, c):
    a, b, c = sorted([a, b, c])
    return abs(a*a + b*b - c*c) < 1e-9  # floating point tolerance
```

---

#### Concept 2: Pythagorean Triples

**Intuition:** A Pythagorean triple is a set of three positive integers $(a, b, c)$ satisfying $a^2 + b^2 = c^2$. The smallest and most famous triple is $(3, 4, 5)$. These triples represent right triangles with integer side lengths.

**Common triples:**
$$(3, 4, 5), \quad (5, 12, 13), \quad (8, 15, 17), \quad (7, 24, 25), \quad (20, 21, 29)$$
$$(9, 40, 41), \quad (12, 35, 37), \quad (11, 60, 61), \quad (28, 45, 53)$$

Multiples are also triples: $(6, 8, 10)$, $(9, 12, 15)$, $(10, 24, 26)$, etc.

**Primitive triples** have $\gcd(a, b, c) = 1$. In a primitive triple, $a$ and $b$ have opposite parity, and $c$ is always odd.

---

#### Concept 3: Euclid's Formula

**Intuition:** Euclid (c. 300 BC) showed that all primitive Pythagorean triples can be generated by two coprime integers $m > n$ with opposite parity.

**Formula:** For integers $m > n > 0$:

$$a = m^2 - n^2, \quad b = 2mn, \quad c = m^2 + n^2$$

**Primitive condition:** $\gcd(m, n) = 1$ and exactly one of $m, n$ is even.

**Derivation:** Given $a^2 + b^2 = c^2$, rewrite as:

$$\left(\frac{a}{c}\right)^2 + \left(\frac{b}{c}\right)^2 = 1$$

This is a rational point on the unit circle. Let the line from $(0, -1)$ to a point $(\frac{n}{m}, 0)$ intersect the circle again at $(\frac{a}{c}, \frac{b}{c})$. Solving yields Euclid's formulas.

**Edge cases:** Euclid's formula generates all primitive triples but not all non-primitive ones. For those, multiply by a scaling factor $k$:

$$a = k(m^2 - n^2), \quad b = k(2mn), \quad c = k(m^2 + n^2)$$

```python
import math

def generate_triples(limit):
    triples = []
    for m in range(2, int(limit**0.5) + 2):
        for n in range(1, m):
            if (m - n) % 2 == 1 and math.gcd(m, n) == 1:
                a = m*m - n*n
                b = 2*m*n
                c = m*m + n*n
                if c <= limit:
                    triples.append((a, b, c))
    return triples
```

> 📎 [Wikipedia: Euclid's formula](https://en.wikipedia.org/wiki/Pythagorean_triple#Generating_a_triple)

---

#### Concept 4: Right Triangle Classification

**Intuition:** In every right triangle, the side opposite the $90^\circ$ angle is the **hypotenuse** — the longest side. The other two sides are **legs**.

$$\text{Hypotenuse} = c, \quad \text{Legs} = a, b$$

Key relationships:
- Hypotenuse > each leg: $c > a$ and $c > b$
- Hypotenuse < sum of legs: $c < a + b$ (triangle inequality)
- Hypotenuse = $\sqrt{a^2 + b^2}$

---

#### Concept 5: 30-60-90 and 45-45-90 Special Triangles

**Intuition:** Two classes of right triangles have fixed angle ratios that produce nice side ratios:

**45-45-90 Triangle (isosceles right triangle):**
- Angles: $45^\circ, 45^\circ, 90^\circ$
- Side ratio: $1 : 1 : \sqrt{2}$
- Legs are equal; hypotenuse = leg $\times \sqrt{2}$

**30-60-90 Triangle:**
- Angles: $30^\circ, 60^\circ, 90^\circ$
- Side ratio: $1 : \sqrt{3} : 2$
- Short leg (opposite $30^\circ$) = $\frac{1}{2} \times$ hypotenuse
- Long leg (opposite $60^\circ$) = short leg $\times \sqrt{3}$

```python
def special_right_triangle(type_, side, known_side="short_leg"):
    if type_ == "45-45-90":
        if known_side == "leg":
            hyp = side * math.sqrt(2)
            return (side, side, hyp)
    elif type_ == "30-60-90":
        if known_side == "short_leg":
            long_leg = side * math.sqrt(3)
            hyp = 2 * side
            return (side, long_leg, hyp)
        elif known_side == "hypotenuse":
            short_leg = side / 2
            long_leg = short_leg * math.sqrt(3)
            return (short_leg, long_leg, side)
```

---

#### Concept 6: Right Angle Detection via Dot Product

**Intuition:** Two vectors are perpendicular iff their dot product is zero. This is the most efficient way to detect right angles from coordinates.

**What it computes:** For vectors $\vec{AB}$ and $\vec{AC}$:

$$\vec{AB} \cdot \vec{AC} = (B_x - A_x)(C_x - A_x) + (B_y - A_y)(C_y - A_y) = 0$$

The right angle is at $A$ when $\vec{AB} \cdot \vec{AC} = 0$.

```python
def is_right_angle(A, B, C):
    """Check if angle at A is 90 degrees."""
    v1 = (B[0] - A[0], B[1] - A[1])
    v2 = (C[0] - A[0], C[1] - A[1])
    return v1[0]*v2[0] + v1[1]*v2[1] == 0
```

To check if **any** angle in triangle ABC is right:

```python
def has_right_angle(A, B, C):
    return (is_right_angle(A, B, C) or
            is_right_angle(B, A, C) or
            is_right_angle(C, A, B))
```

---

#### Concept 7: Right Triangle Area

**Intuition:** Since the legs are perpendicular, the area is simply half the product of the legs.

$$A = \frac{1}{2} \times \text{leg}_1 \times \text{leg}_2 = \frac{ab}{2}$$

This is often simpler than Heron's formula or the Shoelace formula for right triangles.

---

#### Concept 8: Law of Cosines — Generalization of Pythagoras

**Intuition:** The Pythagorean theorem is a special case of the law of cosines where the angle is $90^\circ$ (and $\cos 90^\circ = 0$).

**Formula:** For any triangle with sides $a, b, c$ and angle $C$ opposite side $c$:

$$c^2 = a^2 + b^2 - 2ab\cos C$$

When $C = 90^\circ$, $\cos C = 0$, giving $c^2 = a^2 + b^2$.

---

#### Concept 9: Lattice Right Triangles (Project Euler #91)

**Intuition:** Count all right triangles where vertices are lattice points in a grid $[0, N] \times [0, N]$ with one vertex at the origin.

**Approach:** For each point $P(x, y)$ (excluding origin), find how many points $Q$ make triangle OPQ right-angled at $P$, $O$, or $Q$. Use GCD to find primitive direction vectors and count perpendicular points.

```python
def count_lattice_right_triangles(N):
    """Count right triangles on N x N grid (Project Euler #91)."""
    total = 3 * N * N  # right angle at origin or on axes
    for x in range(1, N + 1):
        for y in range(1, N + 1):
            g = math.gcd(x, y)
            dx, dy = x // g, y // g
            # Points below: perpendicular direction (-dy, dx)
            total += min(x * dy // y, dx * (N - x) // dy) if dy else 0
            # Points above: perpendicular direction (dy, -dx)
            total += min(y * dx // x, dy * (N - y) // dx) if dx else 0
    return total
```

> 📎 [Project Euler #91](https://projecteuler.net/problem=91)

### 🔍 3. PROBLEM RECOGNITION

Right triangle problems in competitive programming fall into these categories:

| Category | Signs | Typical Approach |
|----------|-------|----------------|
| **Check right angle** | Three points, "right angle", "perpendicular" | Dot product = 0 |
| **Generate triples** | "Pythagorean triple", integer sides | Euclid's formula |
| **Count right triangles on grid** | Lattice points, grid, Project Euler #91 | GCD + perpendicular vectors |
| **Special triangles** | 30-60-90, 45-45-90 | Side ratio rules |
| **Detect squares** | Right angles at corners | Dot product + distance |
| **Law of cosines** | Non-right triangle, angle given | $c^2 = a^2 + b^2 - 2ab\cos C$ |

**Key triggers:**
- "right angle", "perpendicular", "orthogonal" → dot product test
- "integer sides", "Pythagorean triple" → Euclid's formula
- "grid", "lattice points", "intersection points" → counting via GCD
- "isosceles right triangle" → 45-45-90
- "distance" combined with "angle" → law of cosines

### 🧩 4. PATTERN ANALYSIS

---

#### Pattern 1: Right Angle Detection via Dot Product

**When to use:** Given coordinates, check if any angle is $90^\circ$.

**Complexity:** O(1) per triple of points.

**Key insight:** Compute vectors from the candidate vertex. If dot product is zero, it's a right angle. Use integer arithmetic to avoid floating-point errors: $dx_1 \cdot dx_2 + dy_1 \cdot dy_2 = 0$.

---

#### Pattern 2: Pythagorean Triple Generation

**When to use:** Need integer-sided right triangles, often for bounding box or perimeter-limited problems.

**Complexity:** O($N$) where $N$ is the perimeter or hypotenuse limit.

**Key insight:** Iterate $m, n$ with $m > n$, $\gcd(m,n) = 1$, opposite parity. Generate primitive triples, then scale.

---

#### Pattern 3: Counting Right Triangles on a Lattice

**When to use:** Grid of size up to $50 \times 50$ (original Euler) or $2500 \times 2500$ (HackerRank variant).

**Complexity:** O($N^2$) to O($N^2 \log N$).

**Key insight:** For each point $P(x, y)$, find the primitive direction $(x/g, y/g)$. The perpendicular direction is $(-dy, dx)$. Count how many scaled versions stay within the grid. Use the formula $\min(x \cdot m / y, m \cdot (N - x) / y)$ where $m = \gcd(x, y)$.

---

#### Pattern 4: Detect Squares from Points (LeetCode 2013)

**When to use:** Given points, count axis-aligned squares or rotated squares.

**Complexity:** O(n²) for axis-aligned, O(n² log n) for general.

**Key insight:** For axis-aligned squares, two points with same $x$ or same $y$ form a potential side. For general squares, find the diagonal and compute the other two corners using perpendicular vectors: if diagonal is $(p, q)$, the other corners are $((p+q)/2, (p-q)/2)$ and vice versa.

---

#### Pattern 5: Law of Cosines Applications

**When to use:** Non-right triangle, given two sides and included angle, find the third side.

**Complexity:** O(1).

**Key insight:** $c^2 = a^2 + b^2 - 2ab\cos C$. When $\cos C = 0$, this reduces to Pythagoras.

### ⚡ 5. BRUTE FORCE → OPTIMIZED SOLUTIONS

---

#### Problem 1: Project Euler #91 — Right Triangles on a Grid

**Intuition:** Count right triangles with vertices at lattice points on an $N \times N$ grid, one vertex at the origin $O(0,0)$.

**Brute Force:**

```python
def euler91_bruteforce(N):
    points = [(x, y) for x in range(N + 1) for y in range(N + 1)]
    points.remove((0, 0))  # origin is O
    count = 0
    for i in range(len(points)):
        P = points[i]
        for j in range(i + 1, len(points)):
            Q = points[j]
            # Check right angle at O, P, or Q
            if (P[0]*Q[0] + P[1]*Q[1] == 0 or
                is_right_angle(P, (0,0), Q) or
                is_right_angle(Q, (0,0), P)):
                count += 1
    return count
```

**Why Slow:** O($N^4$) — two pairs from O($N^2$) points. For $N = 50$, that's $\binom{2601}{2} \approx 3.38$ million triangles, which is fine. But for $N = 2500$ (HackerRank), it's O($10^{12}$).

**Step-by-Step Optimization:**

1. **Case 1: Right angle at origin.** $P$ and $Q$ must be on perpendicular axes: $P = (x, 0), Q = (0, y)$. There are $N \times N$ such pairs.

2. **Case 2: Right angle on x-axis.** $P = (x, 0)$ with the right angle at $P$. $Q$ must have the same $x$-coordinate: $Q = (x, y)$. There are $N \times N$ such pairs.

3. **Case 3: Right angle on y-axis.** Symmetric to Case 2: $N \times N$ pairs.

4. **Case 4: Right angle at interior point $P(x, y)$ with $x > 0, y > 0$.** For each $P$, find its primitive direction $(dx, dy) = (x/g, y/g)$ where $g = \gcd(x, y)$. The perpendicular direction is $(-dy, dx)$. Points $Q$ in the direction $(-dy, dx)$ lie along the line $P + t \cdot (-dy, dx)$. Count how many such points stay within the grid for $t > 0$. Similarly for the opposite perpendicular direction $(dy, -dx)$.

5. **Symmetry:** Only iterate $P$ where $y \le x$ (lower-right triangle), then double the count for $y < x$.

**Why this works:** The key insight is that for any interior point $P$, the perpendicular direction to $\vec{OP}$ is uniquely determined. We don't need to check all $Q$ — we can directly count how many $Q$ lie on the perpendicular line within the grid.

**Final Code:**

```python
import math

def euler91_optimized(N):
    # Cases 1-3: right angle at origin or on axes
    total = 3 * N * N

    # Case 4: right angle at interior point P(x, y)
    for x in range(1, N + 1):
        for y in range(1, N + 1):
            g = math.gcd(x, y)
            dx, dy = x // g, y // g

            # Perpendicular direction (-dy, dx): Q is "below" P
            if dy != 0:
                below = min(x * dy // y, dx * (N - x) // dy)
                total += below

            # Perpendicular direction (dy, -dx): Q is "above" P
            if dx != 0:
                above = min(y * dx // x, dy * (N - y) // dx)
                total += above

    return total
```

**Edge Cases:**
- $N = 1$: only trivial axis-aligned triangles
- $N = 2$: should return 14 (as specified in the problem)
- Large $N$ (up to 2500): the formula handles it in O($N^2$) time
- Integer overflow: use 64-bit integers

**C++ Code:**

```cpp
long long euler91(int N) {
    long long total = 3LL * N * N;
    for (int x = 1; x <= N; x++) {
        for (int y = 1; y <= N; y++) {
            int g = gcd(x, y);
            int dx = x / g, dy = y / g;
            if (dy != 0)
                total += min(x * dy / y, dx * (N - x) / dy);
            if (dx != 0)
                total += min(y * dx / x, dy * (N - y) / dx);
        }
    }
    return total;
}
```

**Java Code:**

```java
public long euler91(int N) {
    long total = 3L * N * N;
    for (int x = 1; x <= N; x++) {
        for (int y = 1; y <= N; y++) {
            int g = gcd(x, y);
            int dx = x / g, dy = y / g;
            if (dy != 0)
                total += Math.min(x * dy / y, dx * (N - x) / dy);
            if (dx != 0)
                total += Math.min(y * dx / x, dy * (N - y) / dx);
        }
    }
    return total;
}

private int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}
```

---

#### Problem 2: Detect Squares (LeetCode 2013)

**Intuition:** Given a stream of points, count how many axis-aligned squares can be formed with a query point as one corner.

**Brute Force:** For each query point, check all triples of other points — O(n³).

**Optimization:** Use hash maps keyed by $x$ and $y$ coordinates. For a query point $(x, y)$, a square of side $s$ has corners at $(x, y)$, $(x+s, y)$, $(x, y+s)$, $(x+s, y+s)$. Check if the other three exist.

```python
class DetectSquares:
    def __init__(self):
        self.points = {}
        self.x_map = {}

    def add(self, point):
        px, py = point
        key = (px, py)
        self.points[key] = self.points.get(key, 0) + 1
        if px not in self.x_map:
            self.x_map[px] = {}
        self.x_map[px][py] = self.x_map[px].get(py, 0) + 1

    def count(self, point):
        px, py = point
        total = 0
        # For each point sharing the same x-coordinate
        for py2, cnt2 in self.x_map.get(px, {}).items():
            if py2 == py:
                continue
            side = abs(py2 - py)
            # Check right side
            px3 = px + side
            cnt3 = self.x_map.get(px3, {}).get(py, 0)
            cnt4 = self.x_map.get(px3, {}).get(py2, 0)
            total += cnt2 * cnt3 * cnt4
            # Check left side
            px3 = px - side
            cnt3 = self.x_map.get(px3, {}).get(py, 0)
            cnt4 = self.x_map.get(px3, {}).get(py2, 0)
            total += cnt2 * cnt3 * cnt4
        return total
```

### 🏆 6. CURATED PROBLEMS

| # | Problem | Platform | Difficulty | URL | Concepts |
|---|---------|----------|-----------|-----|----------|
| 1 | Detect Squares | LeetCode | Medium | https://leetcode.com/problems/detect-squares/ | Right angles, hash map, axis-aligned squares |
| 2 | Project Euler #91 | Project Euler | 25% | https://projecteuler.net/problem=91 | Lattice right triangles, GCD, counting |
| 3 | Minimum Time Visiting All Points | LeetCode | Easy | https://leetcode.com/problems/minimum-time-visiting-all-points/ | Chebyshev distance, right triangle geometry |
| 4 | Right Triangles | Codeforces | 1500 | https://codeforces.com/blog/entry/11689 | Right triangles from points, dot product |
| 5 | Pythagorean Triples | Codeforces | 1300 | https://codeforces.com/problemset/ | Euclid's formula, triple generation |
| 6 | Points on a Line | Codeforces | 1400 | https://codeforces.com/problemset/ | Collinearity, right triangles |
| 7 | Valid Boomerang | LeetCode | Easy | https://leetcode.com/problems/valid-boomerang/ | Collinearity, cross product |
| 8 | Count Right Triangles in Grid | HackerRank | Medium | https://www.hackerrank.com/contests/projecteuler/challenges/euler091 | Project Euler #91 variant |
| 9 | Number of Right Triangles in a Point Set | CSES | Hard | https://cses.fi/problemset/ | Dot product, angle sorting |
| 10 | Check if Right Triangle from Coordinates | GFG | Easy | https://www.geeksforgeeks.org/check-right-angles-triangle-coordinates/ | Dot product, distance formula |

### ✏️ 7. PRACTICE PROBLEMS

---

#### Problem 1: Check if Points Form a Right Triangle

Given three points $A(0,0)$, $B(3,0)$, $C(0,4)$, verify the right angle.

**Solution:** Compute vectors: $\vec{AB} = (3,0)$, $\vec{AC} = (0,4)$. Dot product: $3\cdot 0 + 0\cdot 4 = 0$. Right angle at $A$. The sides are $3, 4, 5$ — a Pythagorean triple.

```python
def is_right_triangle_coords(A, B, C):
    return has_right_angle(A, B, C)
```

---

#### Problem 2: Generate All Primitive Triples with Perimeter $\le 100$

**Solution:** Use Euclid's formula with $m > n$, $\gcd(m,n) = 1$, opposite parity.

```python
def primitive_triples(max_perimeter):
    triples = []
    for m in range(2, int(max_perimeter**0.5) + 2):
        for n in range(1, m):
            if (m - n) % 2 and math.gcd(m, n) == 1:
                a = m*m - n*n
                b = 2*m*n
                c = m*m + n*n
                if a + b + c <= max_perimeter:
                    triples.append((a, b, c))
    return sorted(triples, key=lambda t: t[2])
```

Result: $(3,4,5)$, $(5,12,13)$, $(8,15,17)$, $(7,24,25)$, $(20,21,29)$, $(12,35,37)$, $(9,40,41)$.

---

#### Problem 3: Detect Squares — Count Axis-Aligned Squares

Given points `[[1,1],[1,2],[2,1],[2,2]]` and query `[1,1]`.

**Solution:** For query $(1,1)$, find points sharing $x=1$: $(1,2)$ with side $= 1$. Check $(2,1)$ and $(2,2)$ — both exist. Count = 1.

---

#### Problem 4: Minimum Time Visiting All Points

Given points `[[1,1],[3,4],[-1,0]]`, find minimum time to visit all in order, moving diagonally (Chebyshev distance).

**Solution:** Between $(1,1)$ and $(3,4)$: $dx=2, dy=3$, time = $\max(2,3) = 3$. Between $(3,4)$ and $(-1,0)$: $dx=4, dy=4$, time = $\max(4,4) = 4$. Total = 7.

```python
def min_time_to_visit(points):
    time = 0
    for i in range(len(points) - 1):
        dx = abs(points[i][0] - points[i+1][0])
        dy = abs(points[i][1] - points[i+1][1])
        time += max(dx, dy)
    return time
```

**Why right triangles?** Each diagonal step covers 1 unit in both $x$ and $y$, corresponding to a 45-45-90 triangle. The remaining difference is covered axis-aligned.

---

#### Problem 5: Count Right Triangles from Point Set

Given $n$ points, count right triangles. Use dot product for each triple O($n^3$), or optimize by centering at each point and sorting by angle O($n^2 \log n$).

```python
def count_right_triangles(points):
    n = len(points)
    count = 0
    for i in range(n):
        for j in range(i + 1, n):
            for k in range(j + 1, n):
                if has_right_angle(points[i], points[j], points[k]):
                    count += 1
    return count
```

### 📝 8. CHAPTER QUIZ

**Q1:** What is the hypotenuse of a right triangle with legs 5 and 12?

<details><summary>Answer</summary>
$c = \sqrt{5^2 + 12^2} = \sqrt{25 + 144} = \sqrt{169} = 13$.
</details>

**Q2:** What condition must $m$ and $n$ satisfy for Euclid's formula to produce a primitive triple?

<details><summary>Answer</summary>
$\gcd(m, n) = 1$ and exactly one of $m, n$ is even (i.e., $m \not\equiv n \pmod{2}$).
</details>

**Q3:** How many right triangles exist on a $2 \times 2$ grid with one vertex at the origin?

<details><summary>Answer</summary>
14 (as given in the Project Euler #91 statement).
</details>

**Q4:** What is the dot product condition for a right angle at vertex $A$ in triangle ABC?

<details><summary>Answer</summary>
$(B_x - A_x)(C_x - A_x) + (B_y - A_y)(C_y - A_y) = 0$
</details>

**Q5:** What is the side ratio of a 45-45-90 triangle?

<details><summary>Answer</summary>
$1 : 1 : \sqrt{2}$
</details>

**Q6:** In a 30-60-90 triangle, if the short leg is 5, what are the other sides?

<details><summary>Answer</summary>
Long leg = $5\sqrt{3}$, hypotenuse = $10$.
</details>

**Q7:** What does the law of cosines reduce to when the angle is $90^\circ$?

<details><summary>Answer</summary>
$c^2 = a^2 + b^2$ — the Pythagorean theorem, since $\cos 90^\circ = 0$.
</details>

**Q8:** True or False: Every Pythagorean triple can be generated by Euclid's formula.

<details><summary>Answer</summary>
False. Euclid's formula generates all **primitive** triples. Non-primitive triples like (9, 12, 15) are generated by scaling a primitive triple.
</details>

**Q9:** How can you classify a triangle with sides $a \le b \le c$ using the Pythagorean theorem?

<details><summary>Answer</summary>
- Right: $a^2 + b^2 = c^2$
- Acute: $a^2 + b^2 > c^2$
- Obtuse: $a^2 + b^2 < c^2$
</details>

**Q10:** What is the area of a right triangle with legs 6 and 8?

<details><summary>Answer</summary>
$A = \frac{1}{2} \times 6 \times 8 = 24$. The hypotenuse is 10 (6-8-10 triple).
</details>

### 🃏 9. FLASHCARDS

**Card 1:** Pythagorean theorem
$$a^2 + b^2 = c^2$$

**Card 2:** Euclid's formula for Pythagorean triples
$$a = m^2 - n^2,\quad b = 2mn,\quad c = m^2 + n^2$$

**Card 3:** Primitive triple conditions
$$\gcd(m,n) = 1,\quad m > n,\quad m \not\equiv n \pmod{2}$$

**Card 4:** Dot product right angle test
$$\vec{u} \cdot \vec{v} = 0 \iff \vec{u} \perp \vec{v}$$

**Card 5:** 45-45-90 triangle ratios
$$1 : 1 : \sqrt{2}$$

**Card 6:** 30-60-90 triangle ratios
$$1 : \sqrt{3} : 2$$

**Card 7:** Right triangle area
$$A = \frac{ab}{2}$$

**Card 8:** Law of cosines
$$c^2 = a^2 + b^2 - 2ab\cos C$$

**Card 9:** Common Pythagorean triples
$$(3,4,5),\;(5,12,13),\;(8,15,17),\;(7,24,25)$$

**Card 10:** Acute/Obtuse classification for $a \le b \le c$
$$a^2 + b^2 > c^2 \text{ (acute)}, \quad a^2 + b^2 < c^2 \text{ (obtuse)}$$

### 📎 10. REFERENCES & FURTHER READING

1. Wikipedia: Pythagorean theorem — https://en.wikipedia.org/wiki/Pythagorean_theorem
2. Wikipedia: Pythagorean triple — https://en.wikipedia.org/wiki/Pythagorean_triple
3. Wikipedia: Euclid's formula — https://en.wikipedia.org/wiki/Pythagorean_triple#Generating_a_triple
4. Khan Academy: Pythagorean theorem proof — https://www.khanacademy.org/math/geometry/hs-geo-trig/hs-geo-pyth-theorem/v/pythagorean-theorem-proof
5. Project Euler #91 — https://projecteuler.net/problem=91
6. LeetCode 2013: Detect Squares — https://leetcode.com/problems/detect-squares/
7. LeetCode 1266: Minimum Time Visiting All Points — https://leetcode.com/problems/minimum-time-visiting-all-points/
8. CP-Algorithms: Dot product and cross product — https://cp-algorithms.com/geometry/basic-geometry.html
9. E. W. Weisstein: Right Triangle — MathWorld — https://mathworld.wolfram.com/RightTriangle.html
10. AoPS: Pythagorean Theorem — https://artofproblemsolving.com/wiki/index.php/Pythagorean_theorem
## Chapter 7: Rectangles & Squares — Detection & Properties

### 🎯 Learning Objectives

- Define axis-aligned rectangles and compute their geometric properties
- Determine whether a point lies inside a rectangle
- Detect overlap between two axis-aligned rectangles and compute the intersection
- Validate whether four points form a square
- Count axis-aligned squares and minimum-area rectangles from point sets
- Compute the largest rectangle in a histogram using a stack-based O(n) algorithm
- Solve maximal rectangle in a binary matrix by reducing to histogram per row

### 📖 1. INTRODUCTION

Forming the foundation of computational geometry, rectangles and squares appear everywhere in computer science — from bounding boxes in object detection to hitboxes in games, from UI layout systems to image processing. An axis-aligned rectangle is defined by its top-left and bottom-right corners $(x_1, y_1, x_2, y_2)$ with edges parallel to the coordinate axes.

> 📎 [Wikipedia: Rectangle](https://en.wikipedia.org/wiki/Rectangle) — Formal definition, properties, and formulas
> 📎 [CP-Algorithms: Rectangle](https://cp-algorithms.com/geometry/rectangle.html) — Geometric operations on rectangles
> 📎 [LeetCode: Rectangle Overlap](https://leetcode.com/problems/rectangle-overlap/) — Classic interview problem
> 📎 [LeetCode: Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/) — Stack-based approach
> 📎 [LeetCode: Maximal Rectangle](https://leetcode.com/problems/maximal-rectangle/) — DP + histogram reduction

### 📚 2. CORE CONCEPTS

#### 2.1 Axis-Aligned Rectangle Definition

**Intuition** — A rectangle whose sides are parallel to the x and y axes. Any such rectangle is fully determined by two opposite corners.

**What it computes** — The rectangular region: all points $(x, y)$ with $x_1 \le x \le x_2$ and $y_1 \le y \le y_2$.

```python
class Rectangle:
    def __init__(self, x1: int, y1: int, x2: int, y2: int):
        self.x1, self.y1 = x1, y1  # bottom-left (or top-left depending on convention)
        self.x2, self.y2 = x2, y2  # top-right (or bottom-right)
```

**Edge cases** — Degenerate rectangles where $x_1 = x_2$ or $y_1 = y_2$ have zero area.

---

#### 2.2 Rectangle Properties

**Intuition** — Width, height, area, and perimeter are direct geometric attributes.

| Property | Formula |
|---|---|
| Width | $w = x_2 - x_1$ |
| Height | $h = y_2 - y_1$ |
| Area | $A = w \times h$ |
| Perimeter | $P = 2 \times (w + h)$ |
| Center | $( \frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2} )$ |

**Derivation** — Width and height follow from coordinate subtraction; area is product of dimensions.

```python
def area(x1: int, y1: int, x2: int, y2: int) -> int:
    return (x2 - x1) * (y2 - y1)

def perimeter(x1: int, y1: int, x2: int, y2: int) -> int:
    return 2 * ((x2 - x1) + (y2 - y1))
```

**Edge cases** — Negative width/height indicates invalid rectangle; check $x_2 > x_1$ and $y_2 > y_1$.

---

#### 2.3 Point-in-Rectangle

**Intuition** — A point lies inside if its coordinates are between both x and both y bounds.

**What it computes** — Boolean membership test.

**Formula** $\text{inside}(p, r) \iff r.x_1 \le p.x \le r.x_2 \land r.y_1 \le p.y \le r.y_2$

```python
def point_in_rect(px: int, py: int, x1: int, y1: int, x2: int, y2: int) -> bool:
    return x1 <= px <= x2 and y1 <= py <= y2
```

**Edge cases** — Points exactly on the boundary are typically considered inside (inclusive).

---

#### 2.4 Rectangle Overlap Detection

**Intuition** — Two rectangles overlap if their projections on both the x-axis and y-axis intersect. This is the **projection method**.

**What it computes** — Boolean: do the two rectangles share any positive-area region?

**Derivation** — Overlap on x-axis: $\max(r_1.x_1, r_2.x_1) < \min(r_1.x_2, r_2.x_2)$. Same for y-axis. Both must be true.

**Formula** $\text{overlaps}(r_1, r_2) \iff \overlap_x > 0 \land \overlap_y > 0$ where $\overlap_x = \max(0, \min(x_2^1, x_2^2) - \max(x_1^1, x_1^2))$

```python
def is_overlap(r1: tuple, r2: tuple) -> bool:
    # r = (x1, y1, x2, y2)
    return r1[0] < r2[2] and r2[0] < r1[2] and r1[1] < r2[3] and r2[1] < r1[3]
```

**Edge cases** — Touching at edges (overlap width/height = 0) is NOT considered overlap.

---

#### 2.5 Intersection Rectangle

**Intuition** — The overlapping region itself is also a rectangle, formed by the inner boundaries.

**What it computes** — The rectangle of the shared area region.

**Formula** $x_{\text{inter}} = [\max(x_1^1, x_1^2), \min(x_2^1, x_2^2)], \quad y_{\text{inter}} = [\max(y_1^1, y_1^2), \min(y_2^1, y_2^2)]$

```python
def intersection(r1: tuple, r2: tuple) -> tuple:
    x1 = max(r1[0], r2[0])
    y1 = max(r1[1], r2[1])
    x2 = min(r1[2], r2[2])
    y2 = min(r1[3], r2[3])
    if x1 >= x2 or y1 >= y2:
        return None  # no overlap
    return (x1, y1, x2, y2)
```

**Edge cases** — Return `None` when there is no overlap.

---

#### 2.6 Valid Square from Four Points

**Intuition** — Four points form a square if all four sides are equal AND both diagonals are equal (which implies right angles). Use squared distances to avoid floating point.

**What it computes** — Boolean: do the 4 points form a valid non-degenerate square?

**Derivation** — Compute 6 pairwise squared distances. Sort them. The 4 smallest must be equal (sides) and the 2 largest must be equal (diagonals). Also sides must be non-zero.

```python
def valid_square(p1, p2, p3, p4) -> bool:
    def dist_sq(a, b):
        return (a[0]-b[0])**2 + (a[1]-b[1])**2
    d = [dist_sq(p1,p2), dist_sq(p1,p3), dist_sq(p1,p4),
         dist_sq(p2,p3), dist_sq(p2,p4), dist_sq(p3,p4)]
    d.sort()
    return d[0] > 0 and d[0]==d[1]==d[2]==d[3] and d[4]==d[5]
```

**Edge cases** — Degenerate (all points identical); points that form a rhombus but not a square (diagonal check catches this).

---

#### 2.7 Counting Axis-Aligned Squares from Points

**Intuition** — For squares with sides parallel to axes, fix two points that serve as one side, then compute the other two vertices and check if they exist in the set.

**Derivation** — Given points $(x_1, y_1)$ and $(x_2, y_2)$, the third vertex is at $(x_3, y_3) = (x_1 + (y_1 - y_2), y_1 + (x_2 - x_1))$. Actually for axis-aligned squares: given $(x_1, y_1)$ and $(x_1, y_2)$ as left side, the other two are $(x_1 + h, y_1)$ and $(x_1 + h, y_2)$.

Better: group points by x-coordinate in a hash map. For each pair of points on the same x, compute the square.

```python
def count_squares(points: list) -> int:
    by_x = {}
    for x, y in points:
        by_x.setdefault(x, set()).add(y)
    count = 0
    for x1, y1 in points:
        for x2, y2 in points:
            if x1 == x2 and y1 < y2:  # same x, pair as vertical side
                side = y2 - y1
                if x1 + side in by_x and y1 in by_x[x1 + side] and y2 in by_x[x1 + side]:
                    count += 1
    return count
```

**Edge cases** — No squares exist; overlapping squares counted from multiple reference points.

---

#### 2.8 Minimum Area Rectangle from Points

**Intuition** — Column-pair hashing: group points by x. For each pair of points on the same x-column, record the y-pair. If another x-column shares the same y-pair, we have a rectangle.

**What it computes** — Minimum area of any axis-aligned rectangle that can be formed from given points.

**Derivation** — Use a hash map `y_pair -> last_x`. For each x-column, iterate over all pairs of y-values. If that y_pair was seen at a previous x, compute area.

```python
def min_area_rect(points: list) -> int:
    by_x = {}
    for x, y in points:
        by_x.setdefault(x, []).append(y)
    min_area = float('inf')
    last_x = {}
    for x in sorted(by_x):
        ys = sorted(by_x[x])
        for i in range(len(ys)):
            for j in range(i + 1, len(ys)):
                y1, y2 = ys[i], ys[j]
                if (y1, y2) in last_x:
                    area = (x - last_x[(y1, y2)]) * (y2 - y1)
                    min_area = min(min_area, area)
                last_x[(y1, y2)] = x
    return 0 if min_area == float('inf') else min_area
```

**Edge cases** — Less than 4 points; points forming lines (no rectangle); integer overflow on large coordinates.

---

#### 2.9 Largest Rectangle in Histogram

**Intuition** — For each bar, the largest rectangle that uses that bar extends left until a shorter bar and right until a shorter bar. A monotonic stack tracks the nearest smaller element on both sides in one pass.

**What it computes** — Maximum rectangular area that fits under the histogram.

**Derivation** — Maintain an increasing stack of bar indices. When a shorter bar arrives, pop taller bars and compute area using the popped bar's height and the distance between the new smaller bar and the previous smaller bar (new top of stack).

```python
def largest_rectangle_area(heights: list) -> int:
    stack = [-1]  # sentinel
    max_area = 0
    for i, h in enumerate(heights + [0]):  # append 0 to flush stack
        while stack[-1] != -1 and heights[stack[-1]] > h:
            height = heights[stack.pop()]
            width = i - stack[-1] - 1
            max_area = max(max_area, height * width)
        stack.append(i)
    return max_area
```

**Edge cases** — All equal heights; single bar; decreasing/increasing heights; empty array.

**References** — > 📎 [Wikipedia: Largest rectangle in a histogram](https://en.wikipedia.org/wiki/Largest_rectangle_in_a_histogram)

---

#### 2.10 Maximal Rectangle in Binary Matrix

**Intuition** — Treat each row as the base of a histogram. Build the histogram by adding 1 for each consecutive `'1'` above. Then apply the largest-rectangle-in-histogram algorithm per row.

**What it computes** — Largest axis-aligned rectangle of all `'1'`s in a binary matrix.

**Derivation** - Let `dp[j]` = number of consecutive `'1'`s ending at row `i`, column `j`. For each row, compute `largest_rectangle_area(dp)`.

```python
def maximal_rectangle(matrix: list) -> int:
    if not matrix:
        return 0
    dp = [0] * len(matrix[0])
    max_area = 0
    for row in matrix:
        for j, val in enumerate(row):
            dp[j] = dp[j] + 1 if val == '1' else 0
        max_area = max(max_area, largest_rectangle_area(dp))
    return max_area
```

**Edge cases** — Empty matrix; single row/column; matrix with no `'1'`s.

**References** — > 📎 [LeetCode: Maximal Rectangle](https://leetcode.com/problems/maximal-rectangle/) — Problem + solutions

### 🔍 3. PROBLEM RECOGNITION

| Indicator | Likely Topic |
|---|---|
| "Check if two rectangles overlap" | Overlap detection |
| "Given four points, determine if square" | Valid square |
| "Count number of squares/rectangles" | Hash map + pair counting |
| "Largest rectangle in histogram/bar chart" | Monotonic stack |
| "Largest rectangle of 1s in binary matrix" | Maximal rectangle (histogram per row) |
| "Minimum area rectangle from points" | Column-pair hashing |
| "Number of rectangles that can form a square" | Greedy: min(side) as limiting dimension |
| "Find the intersection of two rectangles" | Bounding interval overlap |
| "Point lies inside rectangle" | Coordinate bounds check |

**Hidden indicators**: "axis-aligned" suggests simplified rectangle problems; "bounding box" often maps to rectangle overlap or minimum-area enclosing rectangle; "can form largest square" from rectangles means take min(width, height) as the limiting dimension.

### 🧩 4. PATTERN ANALYSIS

**Pattern 1: Overlap Detection via Projection**

- **When to use**: Two intervals/rectangles, check if they share space
- **Complexity**: O(1)
- **Key insight**: Project onto each axis independently; both must overlap

**Pattern 2: Stack-Based Histogram Rectangle**

- **When to use**: Histogram/bar chart; binary matrix with consecutive 1s; water/area problems
- **Complexity**: O(n) time, O(n) space
- **Key insight**: Nearest smaller element — the stack always maintains an increasing sequence of bar heights

**Pattern 3: Hash Pair for Rectangle Counting**

- **When to use**: Points on a grid; counting rectangles/squares; computing areas from scattered points
- **Complexity**: O(n² × ...) depending on pair enumeration
- **Key insight**: Group by x-coordinate, then enumerate y-pairs to find matching columns

**Pattern 4: Row-by-Row DP for Binary Matrix**

- **When to use**: Maximum area of 1s in a binary matrix; submatrix problems
- **Complexity**: O(mn) time, O(n) space
- **Key insight**: Each row builds on the previous row's height array; reduces to histogram problem

**Pattern 5: Valid Square from Distance Spectrum**

- **When to use**: Check if 4 points form a square (axis-aligned or rotated)
- **Complexity**: O(1)
- **Key insight**: All 6 pairwise distances must have exactly 2 distinct values (4 equal sides, 2 equal diagonals)

### ⚡ 5. BRUTE FORCE → OPTIMIZED SOLUTIONS

#### Problem 1: Largest Rectangle in Histogram — Brute Force vs. Stack

**Intuition** — For each possible pair of left and right boundaries, compute the minimum height and the area.

**Brute Force O(n²):**

```python
def largest_rectangle_brute(heights: list) -> int:
    n = len(heights)
    max_area = 0
    for i in range(n):
        min_h = heights[i]
        for j in range(i, n):
            min_h = min(min_h, heights[j])
            max_area = max(max_area, min_h * (j - i + 1))
    return max_area
```

**Why Slow** — O(n²) when n can be 10⁵. We recompute minimum heights redundantly.

**Optimization Step-by-Step — Monotonic Stack O(n):**

1. For each bar, the largest rectangle using that bar extends left until a smaller bar and right until a smaller bar.
2. Use an **increasing stack** that stores indices of bars with strictly increasing heights.
3. When a new bar is shorter than the top, pop the taller bar. Its height is the limiting factor. The width extends from the new top of stack (left boundary) to the current index (right boundary).
4. A sentinel `-1` is pushed before the loop, and a zero-height bar is appended at the end to flush the stack.

**Final O(n):**

```python
def largest_rectangle_area(heights: list) -> int:
    stack = [-1]
    max_area = 0
    for i, h in enumerate(heights + [0]):
        while stack[-1] != -1 and heights[stack[-1]] > h:
            height = heights[stack.pop()]
            width = i - stack[-1] - 1
            max_area = max(max_area, height * width)
        stack.append(i)
    return max_area
```

**Edge cases:** — All increasing: each bar pushed once, stack never pops until sentinel 0 at end. All decreasing: each new bar triggers a pop because `h < heights[stack[-1]]`.

**C++**
```cpp
int largestRectangleArea(vector<int>& heights) {
    stack<int> st; st.push(-1);
    int maxArea = 0, n = heights.size();
    for (int i = 0; i <= n; ++i) {
        int h = (i == n) ? 0 : heights[i];
        while (st.top() != -1 && heights[st.top()] > h) {
            int height = heights[st.top()]; st.pop();
            int width = i - st.top() - 1;
            maxArea = max(maxArea, height * width);
        }
        st.push(i);
    }
    return maxArea;
}
```

**Java**
```java
public int largestRectangleArea(int[] heights) {
    Deque<Integer> stack = new ArrayDeque<>();
    stack.push(-1);
    int maxArea = 0, n = heights.length;
    for (int i = 0; i <= n; ++i) {
        int h = (i == n) ? 0 : heights[i];
        while (stack.peek() != -1 && heights[stack.peek()] > h) {
            int height = heights[stack.pop()];
            int width = i - stack.peek() - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        stack.push(i);
    }
    return maxArea;
}
```

---

#### Problem 2: Minimum Area Rectangle — Brute Force vs. Hash Pairs

**Intuition** — Enumerate all 4-point combinations and check if they form a rectangle.

**Brute Force O(n⁴):**

```python
def min_area_rect_brute(points: list) -> int:
    n, min_area = len(points), float('inf')
    pts = set(map(tuple, points))
    for i in range(n):
        for j in range(i+1, n):
            for k in range(j+1, n):
                for l in range(k+1, n):
                    p = [points[i], points[j], points[k], points[l]]
                    xs = sorted(set(v[0] for v in p))
                    ys = sorted(set(v[1] for v in p))
                    if len(xs) == 2 and len(ys) == 2:
                        if all((x, y) in pts for x in xs for y in ys):
                            area = (xs[1]-xs[0]) * (ys[1]-ys[0])
                            min_area = min(min_area, area)
    return 0 if min_area == float('inf') else min_area
```

**Why Slow** — O(n⁴) is unusable for n > 20. Most quadruple checks are redundant.

**Optimization Step-by-Step — Column-Pair Hashing O(n²):**

1. Group points by x-coordinate: `by_x[x] = [y1, y2, ...]`.
2. Iterate over x-columns in sorted order.
3. For each column, enumerate all pairs of y-values. This is a potential right/left side.
4. For each `(y1, y2)` pair, if we've seen it at an earlier x-column, the rectangle exists. Use `last_x` map to store the rightmost x where each y-pair was seen.
5. Compute area = `(current_x - last_x[(y1, y2)]) * (y2 - y1)` and track minimum.

**Final O(n²) — typically n ≤ 1000 so this is fast:**

```python
def min_area_rect(points: list) -> int:
    by_x = {}
    for x, y in points:
        by_x.setdefault(x, []).append(y)
    min_area = float('inf')
    last_x = {}
    for x in sorted(by_x):
        ys = sorted(by_x[x])
        for i in range(len(ys)):
            for j in range(i + 1, len(ys)):
                y1, y2 = ys[i], ys[j]
                if (y1, y2) in last_x:
                    area = (x - last_x[(y1, y2)]) * (y2 - y1)
                    min_area = min(min_area, area)
                last_x[(y1, y2)] = x
    return 0 if min_area == float('inf') else min_area
```

**Edge cases** — Points with same x: only vertical line, no rectangle. Fewer than 2 columns: impossible.

**C++**
```cpp
int minAreaRect(vector<vector<int>>& points) {
    unordered_map<int, vector<int>> by_x;
    for (auto& p : points) by_x[p[0]].push_back(p[1]);

    int minArea = INT_MAX;
    map<pair<int,int>, int> last_x;

    for (auto& [x, ys] : by_x) {
        sort(ys.begin(), ys.end());
        for (int i = 0; i < (int)ys.size(); ++i) {
            for (int j = i + 1; j < (int)ys.size(); ++j) {
                int y1 = ys[i], y2 = ys[j];
                auto key = make_pair(y1, y2);
                if (last_x.count(key)) {
                    int area = (x - last_x[key]) * (y2 - y1);
                    minArea = min(minArea, area);
                }
                last_x[key] = x;
            }
        }
    }
    return minArea == INT_MAX ? 0 : minArea;
}
```

**Java**
```java
public int minAreaRect(int[][] points) {
    Map<Integer, List<Integer>> byX = new HashMap<>();
    for (int[] p : points)
        byX.computeIfAbsent(p[0], k -> new ArrayList<>()).add(p[1]);

    Map<String, Integer> lastX = new HashMap<>();
    int minArea = Integer.MAX_VALUE;

    for (int x : byX.keySet().stream().sorted().mapToInt(i->i).toArray()) {
        List<Integer> ys = byX.get(x);
        Collections.sort(ys);
        for (int i = 0; i < ys.size(); ++i) {
            for (int j = i + 1; j < ys.size(); ++j) {
                String key = ys.get(i) + "," + ys.get(j);
                if (lastX.containsKey(key)) {
                    int area = (x - lastX.get(key)) * (ys.get(j) - ys.get(i));
                    minArea = Math.min(minArea, area);
                }
                lastX.put(key, x);
            }
        }
    }
    return minArea == Integer.MAX_VALUE ? 0 : minArea;
}
```

### 🏆 6. CURATED PROBLEMS

| # | Problem | Platform | Difficulty | URL | Key Concept |
|---|---|---|---|---|---|
| 1 | Rectangle Overlap | LeetCode | Easy | https://leetcode.com/problems/rectangle-overlap/ | Overlap via projection on both axes |
| 2 | Valid Square | LeetCode | Medium | https://leetcode.com/problems/valid-square/ | Distance spectrum: 6 squared distances |
| 3 | Detect Squares | LeetCode | Medium | https://leetcode.com/problems/detect-squares/ | Point-to-point hash + diagonal computation |
| 4 | Minimum Area Rectangle | LeetCode | Medium | https://leetcode.com/problems/minimum-area-rectangle/ | Column-pair hashing, O(n²) |
| 5 | Largest Rectangle in Histogram | LeetCode | Hard | https://leetcode.com/problems/largest-rectangle-in-histogram/ | Monotonic stack, nearest smaller |
| 6 | Maximal Rectangle | LeetCode | Hard | https://leetcode.com/problems/maximal-rectangle/ | DP histogram per row |
| 7 | Number of Rectangles That Can Form Largest Square | LeetCode | Easy | https://leetcode.com/problems/number-of-rectangles-that-can-form-the-largest-square/ | Greedy min-side |
| 8 | Rectangle Area | LeetCode | Medium | https://leetcode.com/problems/rectangle-area/ | Union of two rectangles |
| 9 | Minimum Area Rectangle II | LeetCode | Medium | https://leetcode.com/problems/minimum-area-rectangle-ii/ | Rotated rectangles, vector geometry |

### ✏️ 7. PRACTICE PROBLEMS

**Problem 1: Rectangle Overlap**

Check if two axis-aligned rectangles overlap. Rectangles given as `[x1, y1, x2, y2]`.

```python
def is_rectangle_overlap(rec1: list, rec2: list) -> bool:
    return rec1[0] < rec2[2] and rec2[0] < rec1[2] and \
           rec1[1] < rec2[3] and rec2[1] < rec1[3]
```

**Key insight**: Strict inequality ensures touching edges are NOT considered overlap.

---

**Problem 2: Valid Square**

Four points form a square? Compute all 6 squared distances; the 4 smallest must be equal (sides) and the 2 largest must be equal (diagonals), and side > 0.

```python
def valid_square(p1, p2, p3, p4) -> bool:
    def d(a, b):
        return (a[0]-b[0])**2 + (a[1]-b[1])**2
    dists = sorted([d(p1,p2), d(p1,p3), d(p1,p4), d(p2,p3), d(p2,p4), d(p3,p4)])
    return 0 < dists[0] == dists[1] == dists[2] == dists[3] and dists[4] == dists[5]
```

---

**Problem 3: Detect Squares**

Count squares parallel to axes. Maintain maps: `count[(x,y)]` for point frequency, and `by_x[x] -> list of y`. For each new point, iterate over existing points with same x and compute the other diagonal vertex.

```python
class DetectSquares:
    def __init__(self):
        self.by_x = defaultdict(list)
        self.pt_count = defaultdict(int)

    def add(self, point: list) -> None:
        x, y = point
        self.by_x[x].append(y)
        self.pt_count[(x, y)] += 1

    def count(self, point: list) -> int:
        x1, y1 = point
        total = 0
        for y2 in self.by_x[x1]:
            side = abs(y2 - y1)
            if side == 0: continue
            for x2 in [x1 - side, x1 + side]:
                total += self.pt_count[(x2, y1)] * self.pt_count[(x2, y2)]
        return total
```

---

**Problem 4: Maximal Rectangle**

Binary matrix, largest rectangle of 1s. Build histogram row by row, run largest-rectangle-in-histogram on each row's height array.

```python
def maximal_rectangle(matrix: list) -> int:
    if not matrix: return 0
    heights = [0] * len(matrix[0])
    max_area = 0
    for row in matrix:
        for j, c in enumerate(row):
            heights[j] = heights[j] + 1 if c == '1' else 0
        max_area = max(max_area, largest_rectangle_area(heights))
    return max_area
```

---

**Problem 5: Number of Rectangles That Can Form Largest Square**

Each rectangle contributes a square of side `min(width, height)`. Find max side and count.

```python
def count_good_rectangles(rectangles: list) -> int:
    max_side = max(min(w, h) for w, h in rectangles)
    return sum(1 for w, h in rectangles if min(w, h) == max_side)
```

### 📝 8. CHAPTER QUIZ

1. Two rectangles overlap if and only if:
   - A) Their areas are both positive
   - B) Their x-projections overlap AND their y-projections overlap
   - C) Their centers are within a certain distance
   - D) They share at least one vertex

<details><summary>Answer</summary>**B**. Overlap requires both axes to have intersecting projections (strictly positive overlap width and height).</details>

2. What is the time complexity of the monotonic stack solution for largest rectangle in histogram?
   - A) O(n log n)
   - B) O(n²)
   - C) O(n)
   - D) O(n³)

<details><summary>Answer</summary>**C**. Each element is pushed and popped at most once, giving O(n) time and O(n) space.</details>

3. To check if 4 points form a square, we compute 6 distances. The sorted distances must satisfy:
   - A) All 6 equal
   - B) First 2 equal, last 4 equal
   - C) First 4 equal, last 2 equal, and first > 0
   - D) First 3 equal, last 3 equal

<details><summary>Answer</summary>**C**. The 4 smallest are equal (sides), the 2 largest are equal (diagonals), and sides > 0 (non-degenerate).</details>

4. In the column-pair hashing approach for Minimum Area Rectangle, what is stored in the hash map?
   - A) Point coordinates mapped to quadrant
   - B) (y1, y2) pair mapped to the last x where this pair appeared
   - C) Area mapped to point index
   - D) (x1, x2) pair mapped to maximum y

<details><summary>Answer</summary>**B**. The pair of y-values on the same x-column is hashed to the x-coordinate where they first appeared, enabling area computation when the same y-pair appears at a later x.</details>

5. What does the sentinel `-1` in the stack for the histogram problem represent?
   - A) The first bar's height
   - B) A virtual left boundary before index 0
   - C) The minimum possible bar height
   - D) An error flag

<details><summary>Answer</summary>**B**. The sentinel `-1` acts as a left boundary so that when computing width `i - stack[-1] - 1`, the formula works even when the rectangle extends to index 0.</details>

6. In Maximal Rectangle, what does each entry `dp[j]` represent?
   - A) The value of matrix[i][j]
   - B) The maximum rectangle width ending at (i, j)
   - C) The number of consecutive '1's ending at (i, j) going upward
   - D) The area of the maximal rectangle up to (i, j)

<details><summary>Answer</summary>**C**. `dp[j]` is the running count of consecutive '1's in column j from the current row upward.</details>

7. A rectangle's width is negative. This means:
   - A) The rectangle is valid but rotated
   - B) The coordinates are swapped — x1 should be left of x2
   - C) The rectangle has zero area
   - D) This is a degenerate point

<details><summary>Answer</summary>**B**. Negative width means the x-coordinates are reversed; normally x1 < x2 for positive width.</details>

8. For the Detect Squares problem, a diagonal vertex is at:
   - A) The origin
   - B) (x1 ± side, y1) and (x1 ± side, y2) where side = |y2 - y1|
   - C) (x1 / 2, y1 / 2)
   - D) (x2, y2) of any rectangle

<details><summary>Answer</summary>**B**. Given two points on the same x: (x1, y1) and (x1, y2), the square's other side is at x ± side, giving the other two vertices at (x ± side, y1) and (x ± side, y2).</details>

### 🃏 9. FLASHCARDS

1. **Axis-aligned rectangle definition** — A rectangle with sides parallel to coordinate axes, defined by two opposite corners: (x1, y1, x2, y2).

2. **Overlap condition for rectangles** — Two axis-aligned rectangles overlap iff `max(x1a, x1b) < min(x2a, x2b)` AND `max(y1a, y1b) < min(y2a, y2b)`.

3. **Valid square check** — Compute all 6 squared distances between 4 points. Sort. The 4 smallest must be equal (sides) and the 2 largest equal (diagonals), with side > 0.

4. **Monotonic stack** — An increasing stack of bar indices. When a shorter bar pops a taller one, area = height × (current_index − new_top_index − 1).

5. **Column-pair hashing** — Group points by x. For each x, enumerate y-pairs. Hash (y1, y2) → last_x. When the same pair reappears at a later column, compute area.

6. **Maximal rectangle reduction** — Each row builds a histogram of consecutive '1's above it. Run O(n) histogram algorithm per row for O(mn) total.

7. **Min side of rectangle** — `min(width, height)` of a rectangle limits the largest square that can be formed from it.

8. **Probe interval overlap** — Two intervals [a, b] and [c, d] overlap iff max(a, c) < min(b, d). Extension of 1D overlap to 2D via independent axes.

9. **Degenerate rectangle** — A rectangle with zero width or zero height has zero area and fails overlap checks.

### 📎 10. REFERENCES & FURTHER READING

> 📎 [Wikipedia: Rectangle](https://en.wikipedia.org/wiki/Rectangle) — Formal definition, properties, and formulas
> 📎 [CP-Algorithms: Rectangle](https://cp-algorithms.com/geometry/rectangle.html) — Geometric rectangle operations
> 📎 [Wikipedia: Largest rectangle in a histogram](https://en.wikipedia.org/wiki/Largest_rectangle_in_a_histogram) — Algorithm and analysis
> 📎 [LeetCode: Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/) — Problem with editorial and solutions
> 📎 [LeetCode: Maximal Rectangle](https://leetcode.com/problems/maximal-rectangle/) — Binary matrix rectangle problem
> 📎 [LeetCode: Minimum Area Rectangle](https://leetcode.com/problems/minimum-area-rectangle/) — Column-pair hashing problem
> 📎 [LeetCode: Rectangle Overlap](https://leetcode.com/problems/rectangle-overlap/) — Fundamental overlap detection
> 📎 [LeetCode: Valid Square](https://leetcode.com/problems/valid-square/) — Square validation from points
> 📎 [LeetCode: Detect Squares](https://leetcode.com/problems/detect-squares/) — Live square counting
> 📎 [Stack: Monotonic Stack Technique](https://citeseerx.ist.psu.edu/document?repid=rep1&type=pdf&doi=2024b5c00a93beb7eb2c348a2a3db5f28baf6c53) — Academic reference for monotonic stack
## Chapter 8: Rectangles — Area, Union & Sweep Line

### 🎯 Learning Objectives

- Compute the area of intersection and union of two overlapping rectangles using inclusion–exclusion
- Validate a set of rectangles that tile a larger rectangle exactly (perfect rectangle)
- Use the sweep line paradigm to compute the union area of multiple rectangles
- Distinguish O(n²) pairwise merge from O(n log n) sweep line + segment tree approaches
- Detect overlap between a circle and a rectangle
- Find the intersection square of two rectangles
- Solve maximum-area rectangle problems with point constraints
- Detect overlap of non-axis-aligned (rotated) rectangles using the separating axis theorem

### 📖 1. INTRODUCTION

When a single rectangle is not enough, we ask: what is the total area covered by several rectangles that may overlap? This is the **rectangle area union** problem, fundamental to computer graphics (damage regions, screen redraw), GIS (map overlay), and VLSI design (chip mask layout). The **sweep line algorithm** — a vertical line moving from left to right, processing events — transforms a 2D problem into a 1D interval-management problem. For rotated rectangles we turn to the **separating axis theorem (SAT)**, a cornerstone of collision detection in game engines.

> 📎 [Wikipedia: Sweep line algorithm](https://en.wikipedia.org/wiki/Sweep_line_algorithm) — General concept and applications
> 📎 [CP-Algorithms: Rectangle union area](https://cp-algorithms.com/geometry/union_of_rectangles.html) — O(n²) and O(n log n) approaches
> 📎 [LeetCode: Rectangle Area](https://leetcode.com/problems/rectangle-area/) — Two-rectangle union
> 📎 [LeetCode: Perfect Rectangle](https://leetcode.com/problems/perfect-rectangle/) — Exact tiling verification
> 📎 [LeetCode: Rectangle Area II](https://leetcode.com/problems/rectangle-area-ii/) — Sweep line with coordinate compression
> 📎 [LeetCode: Circle and Rectangle Overlapping](https://leetcode.com/problems/circle-and-rectangle-overlapping/) — Circle-rectangle overlap
> 📎 [Wikipedia: Separating axis theorem](https://en.wikipedia.org/wiki/Hyperplane_separation_theorem) — Convex polygon overlap detection

### 📚 2. CORE CONCEPTS

#### 2.1 Area of Two Overlapping Rectangles — Inclusion–Exclusion

**Intuition** — The union area of two overlapping rectangles is the sum of their individual areas minus the area of their intersection (which is counted twice).

**What it computes** — `Area(r1 ∪ r2) = Area(r1) + Area(r2) - Area(r1 ∩ r2)`.

**Derivation** — The intersection rectangle is computed identically to §2.5 of Chapter 7: the overlap interval on each axis. Its area is `max(0, overlap_x) × max(0, overlap_y)`.

```python
def area_union(r1: tuple, r2: tuple) -> int:
    def area(r):
        return (r[2]-r[0]) * (r[3]-r[1])
    ox = max(0, min(r1[2], r2[2]) - max(r1[0], r2[0]))
    oy = max(0, min(r1[3], r2[3]) - max(r1[1], r2[1]))
    intersect_area = ox * oy
    return area(r1) + area(r2) - intersect_area
```

```python
def area_intersection(r1: tuple, r2: tuple) -> int:
    ox = max(0, min(r1[2], r2[2]) - max(r1[0], r2[0]))
    oy = max(0, min(r1[3], r2[3]) - max(r1[1], r2[1]))
    return ox * oy
```

**Edge cases** — Rectangles that do not overlap: intersection area is zero, union is just the sum. Identical rectangles: union equals one rectangle's area.

---

#### 2.2 Perfect Rectangle — Exact Cover Check

**Intuition** — A set of axis-aligned rectangles perfectly tiles a larger rectangle if: (1) the sum of all individual areas equals the area of the bounding box, AND (2) every internal corner appears an even number of times and every external corner appears exactly once.

**What it computes** — Boolean: do the given rectangles exactly cover the target rectangle with no gaps and no overlaps?

**Derivation** — Track four pieces of data:
- **Area sum**: sum of all rectangle areas
- **Min/max corners**: overall bounding box of all rectangles
- **Corner count**: use a hash map counting each corner point. For a perfect tiling, all internal corners appear 2 or 4 times; external corners appear exactly once.

Using this, a perfect rectangle has exactly 4 corners with odd count (the outer corners) and all others with even count.

```python
def is_rectangle_cover(rectangles: list) -> bool:
    area_sum = 0
    corners = set()
    x_min = y_min = float('inf')
    x_max = y_max = float('-inf')

    for x1, y1, x2, y2 in rectangles:
        area_sum += (x2 - x1) * (y2 - y1)
        x_min, y_min = min(x_min, x1), min(y_min, y1)
        x_max, y_max = max(x_max, x2), max(y_max, y2)
        for pt in [(x1, y1), (x1, y2), (x2, y1), (x2, y2)]:
            corners ^= {pt}  # toggle (XOR trick — works because points are hashable)
            # Actually: Python sets don't have XOR. Use manual toggle.
```

**Clean version with counter:**

```python
from collections import defaultdict

def is_rectangle_cover(rectangles: list) -> bool:
    area_sum = 0
    corner_count = defaultdict(int)
    x_min = y_min = float('inf')
    x_max = y_max = float('-inf')

    for x1, y1, x2, y2 in rectangles:
        area_sum += (x2 - x1) * (y2 - y1)
        x_min, y_min = min(x_min, x1), min(y_min, y1)
        x_max, y_max = max(x_max, x2), max(y_max, y2)
        for pt in [(x1, y1), (x1, y2), (x2, y1), (x2, y2)]:
            corner_count[pt] += 1

    bounding_area = (x_max - x_min) * (y_max - y_min)
    if area_sum != bounding_area:
        return False

    expected = {(x_min, y_min), (x_min, y_max), (x_max, y_min), (x_max, y_max)}
    for pt, cnt in corner_count.items():
        if pt in expected:
            if cnt != 1:
                return False
        else:
            if cnt % 2 != 0:
                return False
    return True
```

**Edge cases** — Overlapping rectangles (sum area > bounding area); gaps (sum area < bounding area); L-shape arrangements where corners mismatch even though area matches.

---

#### 2.3 Sweep Line Concept

**Intuition** — Imagine a vertical line moving from left to right across the plane. At each x-coordinate where something changes (a rectangle starts or ends), we pause, update our state, and compute the covered y-length. Multiply by the distance to the next event x to get the area slice.

**What it computes** — The total area covered by a union of axis-aligned rectangles.

**Derivation** — The sweep line processes two event types:
- **OPEN** (x1, y1, y2): start covering interval [y1, y2] at x1
- **CLOSE** (x2, y1, y2): stop covering interval [y1, y2] at x2

Between consecutive event x-values, the set of active y-intervals is constant. The covered y-length multiplied by `dx` gives the area contribution.

**Formula** $\text{area} = \sum_{i=1}^{m-1} (x_{i+1} - x_i) \times \text{covered\_length}(x_i)$ where $x_i$ are the sorted unique event coordinates.

```python
def sweep_line_area(rectangles: list) -> int:
    events = []
    for x1, y1, x2, y2 in rectangles:
        events.append((x1, 1, y1, y2))  # open
        events.append((x2, -1, y1, y2)) # close
    events.sort()  # sort by x

    active = defaultdict(int)  # y -> count delta
    prev_x = events[0][0]
    total = 0

    i = 0
    while i < len(events):
        x = events[i][0]
        # process all events at THIS x
        j = i
        while j < len(events) and events[j][0] == x:
            _, typ, y1, y2 = events[j]
            # count coverage (simplified; see 2.4 for interval merging)
            j += 1
        # advance logic continues...
```

**Edge cases** — Rectangles touching at edges (no actual overlap in area). Vertically stacked rectangles.

---

#### 2.4 Rectangle Union — Sweep Line + Interval Merging (O(n²))

**Intuition** — At each event x, we maintain a list of active y-intervals. Merge overlapping intervals to compute covered y-length.

**What it computes** — Union area across all rectangles.

**Derivation** — After processing all events at the current x, merge the active y-intervals: sort by start, then greedily merge overlapping intervals. Sum the merged lengths.

```python
def rectangle_area_union(rectangles: list) -> int:
    events = []
    for x1, y1, x2, y2 in rectangles:
        events.append((x1, 0, y1, y2))  # open
        events.append((x2, 1, y1, y2))  # close
    events.sort()

    active = []
    prev_x = events[0][0]
    total = 0

    def covered_length():
        if not active:
            return 0
        merged = []
        for y1, y2 in sorted(active):
            if not merged or y1 > merged[-1][1]:
                merged.append([y1, y2])
            else:
                merged[-1][1] = max(merged[-1][1], y2)
        return sum(e - s for s, e in merged)

    for x, typ, y1, y2 in events:
        dx = x - prev_x
        total += dx * covered_length()
        if typ == 0:
            active.append((y1, y2))
        else:
            active.remove((y1, y2))
        prev_x = x

    return total
```

**Edge cases** — Removing overlapping intervals: `active.remove((y1, y2))` works only when intervals are unique. For duplicate coordinates, use a multiset or counter.

**Complexity** — O(n²) worst case because each event triggers a merge of O(n) intervals, and each removal is O(n).

---

#### 2.5 Rectangle Union with Segment Tree (O(n log n))

**Intuition** — Replace the O(n) interval merge with a **segment tree** over compressed y-coordinates. Each node stores the count of how many rectangles cover that segment and the total covered length. Updates (add +1 or -1) propagate in O(log n).

**What it computes** — Same union area, but in O(n log n) time.

**Derivation** — Coordinate-compress all y-values. Build a segment tree over the compressed segments `[y_i, y_{i+1}]`. Each rectangle's opening event adds +1 to its y-range; closing event adds -1. The root's covered length × dx gives the area slice.

```python
def rectangle_area_union_segtree(rectangles: list) -> int:
    events = []
    ys = set()
    for x1, y1, x2, y2 in rectangles:
        events.append((x1, 1, y1, y2))
        events.append((x2, -1, y1, y2))
        ys.add(y1); ys.add(y2)
    events.sort()

    sorted_ys = sorted(ys)
    y_to_idx = {v: i for i, v in enumerate(sorted_ys)}
    n = len(sorted_ys) - 1  # number of segments
    cnt = [0] * (4 * n)
    length = [0] * (4 * n)

    def update(node, l, r, ql, qr, val):
        if ql >= r or qr <= l:
            return
        if ql <= l and r <= qr:
            cnt[node] += val
        else:
            mid = (l + r) // 2
            update(node*2, l, mid, ql, qr, val)
            update(node*2+1, mid, r, ql, qr, val)
        if cnt[node] > 0:
            length[node] = sorted_ys[r] - sorted_ys[l]
        elif l + 1 == r:
            length[node] = 0
        else:
            length[node] = length[node*2] + length[node*2+1]

    total = 0
    prev_x = events[0][0]
    for x, typ, y1, y2 in events:
        dx = x - prev_x
        total += dx * length[1]
        update(1, 0, n, y_to_idx[y1], y_to_idx[y2], typ)
        prev_x = x
    return total
```

**Edge cases** — Compressed segments of different lengths (the segment tree stores actual y-differences, not normalized counts).

**Complexity** — O(n log n) time, O(n) space.

**References** — > 📎 [CP-Algorithms: Union of rectangles](https://cp-algorithms.com/geometry/union_of_rectangles.html) — Both O(n²) and O(n log n) approaches

---

#### 2.6 Circle and Rectangle Overlapping

**Intuition** — A circle overlaps a rectangle if the closest point on the rectangle to the circle's center is within the circle's radius.

**What it computes** — Boolean: does the circle intersect the rectangle?

**Derivation** — Find the point on the rectangle that is closest to the circle's center `(cx, cy)`. This is the component-wise clamp of `(cx, cy)` to the rectangle's bounds:

$cx' = \max(x_1, \min(cx, x_2)), \quad cy' = \max(y_1, \min(cy, y_2))$

Then check $(cx - cx')^2 + (cy - cy')^2 \le r^2$.

```python
def circle_rect_overlap(cx: int, cy: int, r: int,
                         x1: int, y1: int, x2: int, y2: int) -> bool:
    closest_x = max(x1, min(cx, x2))
    closest_y = max(y1, min(cy, y2))
    dx = cx - closest_x
    dy = cy - closest_y
    return dx*dx + dy*dy <= r*r
```

**Edge cases** — Circle fully inside rectangle (closest point is the center itself → distance 0 ≤ r). Circle center exactly on rectangle edge.

---

#### 2.7 Intersection Square of Two Rectangles

**Intuition** — Two rectangles' intersection is a rectangle (if it exists). The largest square that fits inside this intersection has side length equal to `min(intersection_width, intersection_height)`.

**What it computes** — The largest axis-aligned square that fits inside the overlap of two rectangles.

```python
def intersection_square(r1: tuple, r2: tuple) -> int:
    ox = min(r1[2], r2[2]) - max(r1[0], r2[0])
    oy = min(r1[3], r2[3]) - max(r1[1], r2[1])
    if ox <= 0 or oy <= 0:
        return 0  # no overlap
    side = min(ox, oy)
    return side * side
```

**Edge cases** — No overlap → zero. Intersection is a thin strip (ox >> oy or vice versa) → square side is the smaller dimension.

---

#### 2.8 Maximum Area Rectangle with Point Constraints

**Intuition** — Given N points, find the maximum area axis-aligned rectangle that does NOT contain any point in its interior (but may have points on its boundary). This is a **Cartesian tree / divide-and-conquer** problem often paired with the histogram technique.

**What it computes** — Maximum empty rectangle bounded by points.

**Derivation** — For type I (all points inside), sort points by x and for each pair of x-coordinates, maintain the largest y-interval that has no points. This is the inverse of the histogram problem.

For type II (points as obstacles), use a sweep line with a monotonic stack tracking the closest obstacle in each direction.

```python
# Max area rectangle avoiding points (conceptual sketch)
def max_area_rect(points: list) -> int:
    # Sort points by x, then for each pair use y-range tracking
    points.sort()
    n = len(points)
    max_area = 0
    for i in range(n):
        top = float('inf')
        bottom = float('-inf')
        for j in range(i + 1, n):
            if points[j][0] == points[i][0]:
                continue
            width = points[j][0] - points[i][0]
            if top > bottom:
                max_area = max(max_area, width * (top - bottom))
            # Update y-bounds based on points[j]'s y position
            if points[j][1] <= points[i][1]:
                bottom = max(bottom, points[j][1])
            else:
                top = min(top, points[j][1])
    return max_area
```

**Edge cases** — 0 or 1 points: no rectangle possible. Points on same x-line: need to skip.

---

#### 2.9 Overlap of Non-Axis-Aligned Rectangles — Separating Axis Theorem

**Intuition** — Two convex polygons (including rotated rectangles) do NOT overlap if there exists a line (axis) onto which their projections are disjoint. For rectangles, this axis is either an edge normal from either rectangle — at most 4 axes to check (2 per rectangle).

**What it computes** — Boolean: do two arbitrarily rotated rectangles overlap?

**Derivation** — A rectangle has 4 edge normals. Project the 8 vertices of both rectangles onto each normal direction. If for ANY normal, the intervals `[min_proj, max_proj]` of the two rectangles are disjoint, they do NOT overlap. If no separating axis found, they overlap.

```python
def rotated_rect_overlap(r1: list, r2: list) -> bool:
    # r = [(x,y), (x,y), (x,y), (x,y)] — 4 corners in order
    def project(vertices, axis):
        dots = [v[0]*axis[0] + v[1]*axis[1] for v in vertices]
        return min(dots), max(dots)

    def overlap_1d(a, b):
        return a[0] <= b[1] and b[0] <= a[1]

    def edges(rect):
        n = len(rect)
        for i in range(n):
            ax = rect[(i+1)%n][0] - rect[i][0]
            ay = rect[(i+1)%n][1] - rect[i][1]
            # normal (perpendicular)
            yield (-ay, ax)

    for axis in list(edges(r1)) + list(edges(r2)):
        p1 = project(r1, axis)
        p2 = project(r2, axis)
        if not overlap_1d(p1, p2):
            return False
    return True
```

**Edge cases** — One rectangle entirely inside the other (all axes will overlap — correctly returns True). Touching edges (barely overlapping — implementation-dependent on strictness of interval check).

**References** — > 📎 [Wikipedia: Separating axis theorem](https://en.wikipedia.org/wiki/Hyperplane_separation_theorem) — Formal treatment of separating axes

### 🔍 3. PROBLEM RECOGNITION

| Indicator | Likely Topic |
|---|---|
| "Union area of multiple rectangles" | Sweep line (+ segment tree for large n) |
| "Exactly cover / no overlap / no gap" | Perfect rectangle (corner parity check) |
| "Area of two overlapping rectangles" | Inclusion–exclusion formula |
| "Circle overlaps rectangle" | Closest point on rectangle to circle center |
| "Rotated rectangle collision" | Separating axis theorem |
| "Largest empty rectangle" | Point constraints, divide & conquer |
| "Compute the total covered area" | Sweep line with interval management |
| "Intersection square" | Min(overlap width, overlap height) |

**Hidden indicators**: "perfect tiling" → corner parity + area check; "sweep" or "scan line" → sweep line algorithm; "any rectangle" (without axis alignment) → SAT for rotated rectangles; "obstacle" or "avoid" → point constraint rectangle.

### 🧩 4. PATTERN ANALYSIS

**Pattern 1: Inclusion–Exclusion for Two Rectangles**

- **When to use**: Exactly two rectangles; area of union or intersection
- **Complexity**: O(1)
- **Key insight**: `union = a1 + a2 - intersection`. The intersection is the overlap of both axes.

**Pattern 2: Corner Parity for Perfect Tiling**

- **When to use**: Multiple rectangles claim to perfectly tile a region; exact cover problem
- **Complexity**: O(n) time, O(n) space
- **Key insight**: Sum area must equal bounding area AND corner parity: outer corners appear once, inner corners appear an even number of times (2 or 4).

**Pattern 3: Sweep Line for Multi-Rectangle Union**

- **When to use**: Area of union of 3+ rectangles (constant or overlapping)
- **Complexity**: O(n²) with naive interval merge; O(n log n) with segment tree
- **Key insight**: Convert 2D area into 1D y-interval problem by sweeping x. Between event xs, the active set is constant.

**Pattern 4: Closest Point for Circle-Rectangle**

- **When to use**: Any circle + axis-aligned rectangle intersection
- **Complexity**: O(1)
- **Key insight**: Closest point on rectangle = component-wise clamp of circle center to rectangle bounds.

**Pattern 5: Separating Axis for Convex Collision**

- **When to use**: Rotated rectangles, arbitrary convex polygons; collision detection
- **Complexity**: O(a·b) where a and b are vertex counts (O(1) for two rectangles)
- **Key insight**: Check edge normals of BOTH polygons. If any axis yields disjoint projections, no overlap.

### ⚡ 5. BRUTE FORCE → OPTIMIZED SOLUTIONS

#### Problem 1: Rectangle Area II — Sweep Line with Segment Tree

**Intuition** — Summing overlapping rectangle areas by pairwise checks would double-count. Sweep a vertical line, track active y-intervals, multiply covered length by the distance to the next event.

**Brute Force O(n³):**

```python
def rect_area_union_brute(rects: list, grid: int = 1000) -> int:
    # Discretize the grid at unit resolution (impractical for large coords)
    covered = set()
    for x1, y1, x2, y2 in rects:
        for x in range(x1, x2):
            for y in range(y1, y2):
                covered.add((x, y))
    return len(covered)
```

**Why Slow** — O(n × area) is unusable when coordinates are large. Does not scale.

**Pairwise Merge O(n²):**

```python
def rect_area_pairwise(rects: list) -> int:
    total = 0
    for i, r in enumerate(rects):
        total += (r[2]-r[0]) * (r[3]-r[1])
        for j in range(i):
            ox = max(0, min(r[2], rects[j][2]) - max(r[0], rects[j][0]))
            oy = max(0, min(r[3], rects[j][3]) - max(r[1], rects[j][1]))
            total -= ox * oy  # subtract pairwise intersections — but triple intersections need += again
    # This only works for pairwise overlaps, breaks for 3+ overlapping
    return total
```

**Why Slow** — Inclusion–exclusion with n rectangles requires 2ⁿ − 1 terms. Infeasible for n > 3.

**Optimization Step-by-Step — Sweep Line + Segment Tree O(n log n):**

1. Collect all **events** (x, type, y1, y2) — OPEN at x1, CLOSE at x2.
2. Coordinate-compress all unique y-values so we can use a segment tree over the compressed segments.
3. Sort events by x.
4. Initialize: segment tree all zeros, prev_x = events[0][0], total = 0.
5. For each event at x:
   - Add `(x - prev_x) × length[1]` to total (length[1] = total covered y at root).
   - Update segment tree: +1 for OPEN, -1 for CLOSE over the compressed y-range.
   - Set prev_x = x.
6. Return total.

**Segment tree trick**: each node stores `cnt` (how many rectangles cover this segment) and `len` (total covered y in the segment). The `len` is computed from children only if `cnt == 0`, otherwise it's the full segment length.

```python
class SegTree:
    def __init__(self, ys):
        self.ys = ys
        self.n = len(ys) - 1
        self.cnt = [0] * (4 * self.n)
        self.len = [0] * (4 * self.n)

    def update(self, node, l, r, ql, qr, val):
        if ql >= r or qr <= l:
            return
        if ql <= l and r <= qr:
            self.cnt[node] += val
        else:
            mid = (l + r) // 2
            self.update(node*2, l, mid, ql, qr, val)
            self.update(node*2+1, mid, r, ql, qr, val)
        if self.cnt[node] > 0:
            self.len[node] = self.ys[r] - self.ys[l]
        elif l + 1 == r:
            self.len[node] = 0
        else:
            self.len[node] = self.len[node*2] + self.len[node*2+1]

def rectangle_area(rectangles: list) -> int:
    events = []
    ys = set()
    for x1, y1, x2, y2 in rectangles:
        events.append((x1, 1, y1, y2))
        events.append((x2, -1, y1, y2))
        ys.add(y1); ys.add(y2)
    events.sort(key=lambda e: e[0])

    sorted_ys = sorted(ys)
    y_idx = {v: i for i, v in enumerate(sorted_ys)}
    seg = SegTree(sorted_ys)

    total = 0
    prev_x = events[0][0]
    for x, typ, y1, y2 in events:
        total += (x - prev_x) * seg.len[1]
        seg.update(1, 0, seg.n, y_idx[y1], y_idx[y2], typ)
        prev_x = x
    return total
```

**Edge cases** — Empty input → 0. Single rectangle → its area. Rectangles sharing edges (no area overlap) → correctly summed.

**C++**
```cpp
struct Event {
    int x, typ, y1, y2;
    bool operator<(const Event& o) const { return x < o.x; }
};

int rectangleArea(vector<vector<int>>& rects) {
    vector<Event> events;
    set<int> ys;
    for (auto& r : rects) {
        events.push_back({r[0], 1, r[1], r[3]});
        events.push_back({r[2], -1, r[1], r[3]});
        ys.insert(r[1]); ys.insert(r[3]);
    }
    sort(events.begin(), events.end());
    vector<int> yv(ys.begin(), ys.end());
    auto yi = [&](int v) { return lower_bound(yv.begin(), yv.end(), v) - yv.begin(); };
    int n = yv.size() - 1;
    vector<int> cnt(4 * n), len(4 * n);
    function<void(int,int,int,int,int,int)> upd = [&](int node, int l, int r, int ql, int qr, int val) {
        if (ql >= r || qr <= l) return;
        if (ql <= l && r <= qr) cnt[node] += val;
        else {
            int mid = (l + r) / 2;
            upd(node*2, l, mid, ql, qr, val);
            upd(node*2+1, mid, r, ql, qr, val);
        }
        if (cnt[node]) len[node] = yv[r] - yv[l];
        else if (l + 1 == r) len[node] = 0;
        else len[node] = len[node*2] + len[node*2+1];
    };
    long long total = 0, prev_x = events[0].x, MOD = 1e9+7;
    for (auto& e : events) {
        total = (total + (e.x - prev_x) * len[1]) % MOD;
        upd(1, 0, n, yi(e.y1), yi(e.y2), e.typ);
        prev_x = e.x;
    }
    return (int)total;
}
```

**Java**
```java
public int rectangleArea(int[][] rectangles) {
    List<Event> events = new ArrayList<>();
    TreeSet<Integer> ys = new TreeSet<>();
    for (int[] r : rectangles) {
        events.add(new Event(r[0], 1, r[1], r[3]));
        events.add(new Event(r[2], -1, r[1], r[3]));
        ys.add(r[1]); ys.add(r[3]);
    }
    events.sort(Comparator.comparingInt(e -> e.x));
    List<Integer> yv = new ArrayList<>(ys);
    int n = yv.size() - 1;
    int[] cnt = new int[4 * n];
    int[] len = new int[4 * n];
    long total = 0, prevX = events.get(0).x, MOD = 1_000_000_007;
    for (Event e : events) {
        total = (total + (e.x - prevX) * len[1]) % MOD;
        update(0, 0, n, Collections.binarySearch(yv, e.y1),
              Collections.binarySearch(yv, e.y2), e.typ, cnt, len, yv);
        prevX = e.x;
    }
    return (int) total;
}
```

---

#### Problem 2: Perfect Rectangle — Brute Force vs. Corner Parity

**Intuition** — Check every pair for overlap and every uncovered cell. But enumeration is impossible for large coordinates.

**Brute Force O(n² + area) — impractical:**

```python
def perfect_rect_brute(rectangles: list) -> bool:
    covered = set()
    for x1, y1, x2, y2 in rectangles:
        for x in range(x1, x2):
            for y in range(y1, y2):
                if (x, y) in covered:
                    return False  # overlap
                covered.add((x, y))
    if not covered:
        return False
    xs = [p[0] for p in covered]
    ys = [p[1] for p in covered]
    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)
    expected_area = (max_x - min_x + 1) * (max_y - min_y + 1)
    return len(covered) == expected_area
```

**Why Slow** — O(total area) — up to 10¹⁰ cells.

**Optimization Step-by-Step — Corner Parity O(n):**

1. Compute bounding box `(x_min, y_min, x_max, y_max)` from all rectangles.
2. Sum all rectangle areas. If sum ≠ bounding area → false.
3. Use a hash map to count every corner point.
4. Check: the 4 outer corners (from bounding box) must have count exactly 1.
5. All other corners must have even count (2 or 4).

```python
def is_rectangle_cover(rectangles: list) -> bool:
    area_sum = 0
    corner_count = defaultdict(int)
    x_min = y_min = float('inf')
    x_max = y_max = float('-inf')

    for x1, y1, x2, y2 in rectangles:
        area_sum += (x2 - x1) * (y2 - y1)
        x_min = min(x_min, x1)
        y_min = min(y_min, y1)
        x_max = max(x_max, x2)
        y_max = max(y_max, y2)
        for pt in [(x1, y1), (x1, y2), (x2, y1), (x2, y2)]:
            corner_count[pt] += 1

    if area_sum != (x_max - x_min) * (y_max - y_min):
        return False

    outer = {(x_min, y_min), (x_min, y_max), (x_max, y_min), (x_max, y_max)}
    for pt, cnt in corner_count.items():
        if pt in outer:
            if cnt != 1:
                return False
        elif cnt % 2 != 0:
            return False
    return True
```

**Edge cases** — Empty input (no rectangles → but problem assumes at least one). L-shaped arrangement that sums to correct area but has odd interior corners.

**C++**
```cpp
bool isRectangleCover(vector<vector<int>>& rectangles) {
    map<pair<int,int>, int> corner_count;
    long long area_sum = 0;
    int x_min = INT_MAX, y_min = INT_MAX, x_max = INT_MIN, y_max = INT_MIN;
    for (auto& r : rectangles) {
        int x1 = r[0], y1 = r[1], x2 = r[2], y2 = r[3];
        area_sum += (long long)(x2 - x1) * (y2 - y1);
        x_min = min(x_min, x1); y_min = min(y_min, y1);
        x_max = max(x_max, x2); y_max = max(y_max, y2);
        corner_count[{x1, y1}]++;
        corner_count[{x1, y2}]++;
        corner_count[{x2, y1}]++;
        corner_count[{x2, y2}]++;
    }
    if (area_sum != (long long)(x_max - x_min) * (y_max - y_min))
        return false;
    set<pair<int,int>> outer = {{x_min, y_min}, {x_min, y_max},
                                 {x_max, y_min}, {x_max, y_max}};
    for (auto& [pt, cnt] : corner_count) {
        if (outer.count(pt)) { if (cnt != 1) return false; }
        else if (cnt % 2 != 0) return false;
    }
    return true;
}
```

**Java**
```java
public boolean isRectangleCover(int[][] rectangles) {
    Map<String, Integer> corners = new HashMap<>();
    long areaSum = 0;
    int xMin = Integer.MAX_VALUE, yMin = Integer.MAX_VALUE;
    int xMax = Integer.MIN_VALUE, yMax = Integer.MIN_VALUE;
    for (int[] r : rectangles) {
        areaSum += (long)(r[2] - r[0]) * (r[3] - r[1]);
        xMin = Math.min(xMin, r[0]); yMin = Math.min(yMin, r[1]);
        xMax = Math.max(xMax, r[2]); yMax = Math.max(yMax, r[3]);
        for (String key : new String[]{
            r[0]+","+r[1], r[0]+","+r[3], r[2]+","+r[1], r[2]+","+r[3]})
            corners.merge(key, 1, Integer::sum);
    }
    if (areaSum != (long)(xMax - xMin) * (yMax - yMin)) return false;
    String[] outer = {xMin+","+yMin, xMin+","+yMax, xMax+","+yMin, xMax+","+yMax};
    for (var e : corners.entrySet()) {
        boolean isOuter = Arrays.asList(outer).contains(e.getKey());
        if (isOuter && e.getValue() != 1) return false;
        if (!isOuter && e.getValue() % 2 != 0) return false;
    }
    return true;
}
```

### 🏆 6. CURATED PROBLEMS

| # | Problem | Platform | Difficulty | URL | Key Concept |
|---|---|---|---|---|---|
| 1 | Rectangle Area | LeetCode | Medium | https://leetcode.com/problems/rectangle-area/ | Inclusion–exclusion for two rectangles |
| 2 | Perfect Rectangle | LeetCode | Hard | https://leetcode.com/problems/perfect-rectangle/ | Corner parity + area sum check |
| 3 | Rectangle Area II | LeetCode | Hard | https://leetcode.com/problems/rectangle-area-ii/ | Sweep line + segment tree |
| 4 | Circle and Rectangle Overlapping | LeetCode | Medium | https://leetcode.com/problems/circle-and-rectangle-overlapping/ | Closest point on rectangle |
| 5 | Max Area Rectangle With Point Constraints I | LeetCode | Hard | https://leetcode.com/problems/maximum-area-rectangle-with-point-constraints-i/ | Point-limited rectangle search |
| 6 | Max Area Rectangle With Point Constraints II | LeetCode | Hard | https://leetcode.com/problems/maximum-area-rectangle-with-point-constraints-ii/ | Advanced point constraints |
| 7 | Largest Rectangle in Histogram | LeetCode | Hard | https://leetcode.com/problems/largest-rectangle-in-histogram/ | Monotonic stack (Chapter 7) |
| 8 | Maximal Rectangle | LeetCode | Hard | https://leetcode.com/problems/maximal-rectangle/ | Histogram per row (Chapter 7) |

### ✏️ 7. PRACTICE PROBLEMS

**Problem 1: Rectangle Area (Union of Two)**

Compute the total area covered by two axis-aligned rectangles that may overlap.

```python
def compute_area(ax1: int, ay1: int, ax2: int, ay2: int,
                 bx1: int, by1: int, bx2: int, by2: int) -> int:
    def area(x1, y1, x2, y2): return (x2-x1) * (y2-y1)
    ox = max(0, min(ax2, bx2) - max(ax1, bx1))
    oy = max(0, min(ay2, by2) - max(ay1, by1))
    return area(ax1, ay1, ax2, ay2) + area(bx1, by1, bx2, by2) - ox * oy
```

**Key insight**: Intersection area is `max(0, overlap_x) × max(0, overlap_y)`.

---

**Problem 2: Perfect Rectangle**

269 rectangles claim to form a perfect rectangle. Area = 64458000, corners pass parity. How?

```python
def is_rectangle_cover(rectangles: list) -> bool:
    corners = defaultdict(int)
    area = 0
    x1 = y1 = float('inf')
    x2 = y2 = float('-inf')
    for r in rectangles:
        area += (r[2]-r[0]) * (r[3]-r[1])
        x1, y1 = min(x1, r[0]), min(y1, r[1])
        x2, y2 = max(x2, r[2]), max(y2, r[3])
        for p in [(r[0], r[1]), (r[0], r[3]), (r[2], r[1]), (r[2], r[3])]:
            corners[p] += 1
    if area != (x2-x1) * (y2-y1): return False
    outer = {(x1, y1), (x1, y2), (x2, y1), (x2, y2)}
    return all(
        (cnt == 1 if pt in outer else cnt % 2 == 0)
        for pt, cnt in corners.items()
    )
```

**Key insight**: Both area parity AND corner parity must hold. The XOR toggle trick (`s.symmetric_difference_update`) is elegant in Python but a counter is clearer.

---

**Problem 3: Circle and Rectangle Overlapping**

Circle center (cx, cy), radius r, rectangle (x1, y1, x2, y2). Does the circle touch the rectangle?

```python
def check_overlap(cx: int, cy: int, r: int,
                  x1: int, y1: int, x2: int, y2: int) -> bool:
    closest_x = max(x1, min(cx, x2))
    closest_y = max(y1, min(cy, y2))
    return (cx - closest_x)**2 + (cy - closest_y)**2 <= r*r
```

**Key insight**: The `clamp` function finds the nearest point. No need for 8 edge/corner cases.

---

**Problem 4: Maximum Area Rectangle With Point Constraints I**

Given N points, find the maximum area axis-aligned rectangle with no points strictly inside.

```python
def max_rectangle(points: list) -> int:
    xs = sorted(set(p[0] for p in points))
    ys = sorted(set(p[1] for p in points))
    pts_set = set(map(tuple, points))
    max_area = 0
    for i in range(len(xs)):
        for j in range(i + 1, len(xs)):
            x1, x2 = xs[i], xs[j]
            prev_y = ys[0]
            for y in ys:
                if all((x1, y) not in pts_set and (x2, y) not in pts_set
                       for y_ in range(prev_y, y)):
                    max_area = max(max_area, (x2 - x1) * (y - prev_y))
                prev_y = y
    return max_area
```

---

**Problem 5: Separating Axis Theorem — Rotated Rectangle Overlap**

Given two rotated rectangles as 4 vertices each, determine if they overlap.

```python
def overlap(r1, r2):
    def axis(rect):
        for i in range(4):
            j = (i + 1) % 4
            yield (rect[j][1] - rect[i][1], rect[i][0] - rect[j][0])  # normal
    def proj(rect, ax):
        dots = [v[0]*ax[0] + v[1]*ax[1] for v in rect]
        return min(dots), max(dots)
    for ax in list(axis(r1)) + list(axis(r2)):
        a, b = proj(r1, ax), proj(r2, ax)
        if a[1] <= b[0] or b[1] <= a[0]:
            return False
    return True
```

**Key insight**: Only 4 potential separating axes (2 per rectangle). Once any axis gives disjoint projections, return False immediately.

### 📝 8. CHAPTER QUIZ

1. The union area of two overlapping rectangles is:
   - A) The sum of both areas
   - B) The sum minus the intersection area
   - C) The intersection area squared
   - D) The maximum of the two areas

<details><summary>Answer</summary>**B**. Inclusion–exclusion: `A∪B = A + B - A∩B`.</details>

2. In the Perfect Rectangle problem, what property must ALL interior corner points satisfy?
   - A) They appear exactly once
   - B) They appear an even number of times (2 or 4)
   - C) They appear an odd number of times
   - D) They appear exactly 3 times

<details><summary>Answer</summary>**B**. Interior corners are shared by 2 or 4 adjacent rectangles, so count must be even.</details>

3. The sweep line algorithm for rectangle area union processes events in order of:
   - A) y-coordinate
   - B) x-coordinate
   - C) rectangle area
   - D) diagonal length

<details><summary>Answer</summary>**B**. The vertical line sweeps from left to right, so events are sorted by x.</details>

4. What is the time complexity of the sweep line + segment tree approach for rectangle area union?
   - A) O(n)
   - B) O(n log n)
   - C) O(n²)
   - D) O(n² log n)

<details><summary>Answer</summary>**B**. O(n log n): O(n) events, each processed in O(log n) via segment tree update.</details>

5. The closest point on an axis-aligned rectangle to a given point (cx, cy) is found by:
   - A) Computing the rectangle's centroid
   - B) Clamping (cx, cy) to the rectangle bounds
   - C) Computing the Minkowski sum
   - D) Taking the average of all 4 corners

<details><summary>Answer</summary>**B**. `closest_x = clamp(cx, x1, x2)`, `closest_y = clamp(cy, y1, y2)`.</details>

6. How many separating axes must be checked for two rotated rectangles?
   - A) 2
   - B) 4
   - C) 8
   - D) 12

<details><summary>Answer</summary>**B**. 4 edge normals total (2 from each rectangle). The SAT requires checking all edge normals of both convex polygons.</details>

7. For rectangle area union with sweep line, what information does each segment tree node store?
   - A) Just the minimum x coordinate
   - B) A count of covering rectangles and the total covered length in that segment
   - C) The maximum rectangle height
   - D) The left and right child pointers

<details><summary>Answer</summary>**B**. `cnt` (active rectangle count) and `len` (total covered y-length). When `cnt > 0`, len = full segment length; otherwise it comes from children.</details>

8. What happens if the sum area of all rectangles equals the bounding area BUT the corner parity check fails?
   - A) The rectangles still perfectly tile
   - B) There are gaps and overlaps that cancel out in area
   - C) The algorithm is incorrect
   - D) The bounding box is too small

<details><summary>Answer</summary>**B**. It's possible to have gaps and overlaps that cancel in total area but leave odd corner counts; both checks are necessary.</details>

9. For two rectangles that do NOT overlap, the intersection square area is:
   - A) Their minimum side squared
   - B) 0
   - C) Their maximum side squared
   - D) The bounding box area

<details><summary>Answer</summary>**B**. If `ox ≤ 0` or `oy ≤ 0`, there is no overlap, so intersection square area is 0.</details>

10. The separating axis theorem says two convex polygons do NOT overlap if:
    - A) Their bounding boxes intersect
    - B) There exists a line onto which their projections are disjoint
    - C) Their perimeters overlap
    - D) They share at least one vertex

<details><summary>Answer</summary>**B**. If a separating axis exists where the one-dimensional projections are disjoint, the polygons cannot overlap.</details>

### 🃏 9. FLASHCARDS

1. **Union area of two rectangles** — `area(r1) + area(r2) - area(intersection)`. Intersection area = `max(0, ox) × max(0, oy)` where `ox = min(x2a, x2b) - max(x1a, x1b)`.

2. **Perfect rectangle conditions** — (1) Sum of areas = bounding box area. (2) Outer corners appear exactly once; all other corners appear an even number of times (2 or 4).

3. **Sweep line paradigm** — Sort events (OPEN/CLOSE) by x. Between event xs, the active y-interval set is constant. Area = Σ (dx × covered_y_length).

4. **Segment tree for union area** — Each node stores `cnt` rectangles covering the segment and `len` of covered y. Update +1/-1 for OPEN/CLOSE. O(log n) per event for O(n log n) total.

5. **Closest point on rectangle** — Component-wise clamp: `closest_x = max(x1, min(cx, x2))`, `closest_y = max(y1, min(cy, y2))`. Circle overlaps if distance from center to this point ≤ r².

6. **Separating axis theorem** — For two convex polygons, if any edge normal yields disjoint 1D projections, the polygons do NOT overlap. For two rectangles, check 4 axes.

7. **Intersection square** — `side = min(overlap_width, overlap_height)`. Area = side² if both overlaps positive, else 0.

8. **Coordinate compression** — Map unique y-values to indices so a segment tree of O(n) nodes can represent arbitrarily large coordinate ranges.

9. **Events vs intervals** — Sweep line processes discrete events (x positions where coverage changes). Between events, the state in y is static.

10. **SAT for non-axis-aligned** — Two rotated rectangle checks cost O(1) (constant 4 axes). The theorem generalizes to any convex polygon in O(a·b) where a, b are vertex counts.

### 📎 10. REFERENCES & FURTHER READING

> 📎 [Wikipedia: Sweep line algorithm](https://en.wikipedia.org/wiki/Sweep_line_algorithm) — General overview
> 📎 [CP-Algorithms: Rectangle union area](https://cp-algorithms.com/geometry/union_of_rectangles.html) — O(n²) and O(n log n) with segment tree
> 📎 [Wikipedia: Inclusion–exclusion principle](https://en.wikipedia.org/wiki/Inclusion%E2%80%93exclusion_principle) — Foundation for union area computation
> 📎 [Wikipedia: Hyperplane separation theorem](https://en.wikipedia.org/wiki/Hyperplane_separation_theorem) — Mathematics behind SAT
> 📎 [LeetCode: Rectangle Area](https://leetcode.com/problems/rectangle-area/) — Two-rectangle union problem
> 📎 [LeetCode: Perfect Rectangle](https://leetcode.com/problems/perfect-rectangle/) — Exact tiling verification
> 📎 [LeetCode: Rectangle Area II](https://leetcode.com/problems/rectangle-area-ii/) — Sweep line with segment tree
> 📎 [LeetCode: Circle and Rectangle Overlapping](https://leetcode.com/problems/circle-and-rectangle-overlapping/) — Circle-rectangle problem
> 📎 [LeetCode: Max Area Rectangle With Point Constraints I](https://leetcode.com/problems/maximum-area-rectangle-with-point-constraints-i/) — Point-constrained rectangle
> 📎 [LeetCode: Max Area Rectangle With Point Constraints II](https://leetcode.com/problems/maximum-area-rectangle-with-point-constraints-ii/) — Advanced point constraints
> 📎 [Wikipedia: Clamping (graphics)](https://en.wikipedia.org/wiki/Clamping_(graphics)) — Clamp function for closest-point computation
> 📎 [Real-Time Collision Detection, Christer Ericson](https://www.elsevier.com/books/real-time-collision-detection/ericson/978-1-55860-732-3) — Comprehensive reference for SAT and collision geometry
## Chapter 9: Circles — Basics & Point Containment

### 🎯 Learning Objectives

- Define a circle as the set of all points at distance r from center (h,k)
- Derive and apply the standard equation of a circle (x−h)² + (y−k)² = r²
- Distinguish between points inside, on, and outside a circle
- Implement point-in-circle tests with squared-distance comparison to avoid sqrt
- Generate uniform random points inside a circle using both rejection sampling and polar coordinates
- Count lattice points on and inside a circle
- Solve queries of points inside a circle with brute force and spatial indexing
- Construct the unique circle passing through three non-collinear points (circumcircle)
- Relate circle properties (area, circumference, symmetry) to programming problems

### 📖 1. INTRODUCTION

Every point on a perfectly round pizza crust is the same distance from the center of the pizza. That distance is the radius, and the set of all such points forms a circle. Whether you're implementing a hit-test in a game, generating random positions inside a blast radius, or counting how many integer grid points lie within a given distance — you're working with **point containment** for circles.

The circle is one of the most fundamental shapes in geometry, and its algebraic representation makes it ideal for computational geometry. Unlike polygons that require multiple edges and winding rules, a circle is fully described by just three numbers: the center (h,k) and the radius r.

> 📎 [Wikipedia: Circle](https://en.wikipedia.org/wiki/Circle) · [Khan Academy: Circle equations](https://www.khanacademy.org/math/geometry/xf63ca4b1:hs-geo-conic-sections) · [3Blue1Brown: π visual proof](https://www.youtube.com/watch?v=d-o3eB9sfls)

### 📚 2. CORE CONCEPTS

#### Concept 1: Circle Definition and Equation

**Intuition.** A circle is the set of all points (x,y) whose distance from the center (h,k) equals the radius r. If you tie a string of length r to a pencil and anchor the other end at (h,k), the pencil traces a circle.

**Derivation.** From the Euclidean distance formula:

```
distance² = (x − h)² + (y − k)² = r²
```

This is the **standard form** of a circle equation. Expanding gives the **general form**: x² + y² + Dx + Ey + F = 0.

**Edge cases.**
- r = 0: degenerate circle (single point)
- r < 0: not a valid circle
- Very large r: may cause floating-point overflow in distance² computation

**Formula.** Circle centered at (h,k) with radius r:

$$(x - h)^2 + (y - k)^2 = r^2$$

**Python code.**

```python
import math

def circle_points(center, radius, num_points=100):
    """Generate num_points evenly spaced points on the circumference."""
    h, k = center
    return [(h + radius * math.cos(2 * math.pi * i / num_points),
             k + radius * math.sin(2 * math.pi * i / num_points))
            for i in range(num_points)]
```

> 📎 [Wikipedia: Circle equation forms](https://en.wikipedia.org/wiki/Circle#Equations)

#### Concept 2: Point-in-Circle Test

**Intuition.** Given a query point, check whether its distance from the center is ≤ r. To avoid the expensive sqrt, compare squared distance against r².

**Derivation.** Instead of `sqrt((x−h)² + (y−k)²) <= r`, compute:

```
d² = (x−h)² + (y−k)²
```

If d² < r² → inside; d² = r² → on the circumference; d² > r² → outside.

**Edge cases.**
- Points exactly on the circumference (floating-point equality is tricky; use an epsilon)
- Integer coordinates: exact comparison works (no precision issues)

**Formula.**

$$d^2 = (x - h)^2 + (y - k)^2$$

$$\text{inside}\iff d^2 \le r^2$$

**Python code.**

```python
def point_in_circle(px, py, h, k, r):
    """Returns True if (px,py) is inside or on the circle."""
    dx, dy = px - h, py - k
    return dx * dx + dy * dy <= r * r
```

#### Concept 3: Circle Properties — Area and Circumference

**Intuition.** π connects the radius to the area and circumference of a circle. These properties appear in problems involving random sampling, sector areas, and physical simulations.

**Formula.**

$$A = \pi r^2 \quad\quad C = 2\pi r$$

**Edge cases.** Floating-point approximations of π: use `math.pi` (double precision, ≈15 decimal digits).

**Python code.**

```python
import math

def circle_area(r): return math.pi * r * r

def circle_circumference(r): return 2 * math.pi * r
```

> 📎 [Wikipedia: π](https://en.wikipedia.org/wiki/Pi)

#### Concept 4: Random Point in a Circle

**Intuition.** Two approaches: (a) rejection sampling — generate random points in the bounding square and keep those inside the circle; (b) polar coordinates — generate a random angle θ and a random radius with appropriate scaling.

**Derivation — why uniform in θ and r doesn't work.** If you pick r uniformly in [0,R], points cluster near the center. The area element in polar coordinates is r·dr·dθ, so r must be sampled from a distribution proportional to r: r = R·√(rand).

**Edge cases.** r = 0: all points collapse to center. Rejection sampling may loop indefinitely for r → 0 (degenerate), but practically this is fine. For very large circles, rejection sampling wastes 21.5% of samples (area ratio: π/4).

**Formula.** Polar method:

$$\theta = 2\pi \cdot U_1,\quad r = R \cdot \sqrt{U_2},\quad x = h + r\cos\theta,\; y = k + r\sin\theta$$

where U₁, U₂ ∼ Uniform(0,1).

**Python code.**

```python
import math, random

def random_point_in_circle_rejection(h, k, r):
    """Rejection sampling — simple, expected 4/π iterations."""
    while True:
        x = random.uniform(h - r, h + r)
        y = random.uniform(k - r, k + r)
        if (x - h) ** 2 + (y - k) ** 2 <= r * r:
            return (x, y)

def random_point_in_circle_polar(h, k, r):
    """Polar coordinates — O(1), no wasted samples."""
    theta = random.random() * 2 * math.pi
    radius = r * math.sqrt(random.random())
    return (h + radius * math.cos(theta),
            k + radius * math.sin(theta))
```

> 📎 [LeetCode: Generate Random Point in a Circle](https://leetcode.com/problems/generate-random-point-in-a-circle/)

#### Concept 5: Lattice Points Inside/On a Circle

**Intuition.** Lattice points are integer grid points (x,y) ∈ ℤ². Counting them inside a circle is a classic problem combining number theory and computational geometry. For each x in [h−r, h+r], solve y² ≤ r² − (x−h)² and count integer y values.

**Derivation.** For a circle centered at the origin: for each integer x from −r to r, the maximum y is floor(√(r²−x²)). Count 2·ymax + 1 per row.

**Edge cases.** When r is large (e.g., r > 10⁵), the O(r) loop is too slow — use symmetry and number-theoretic formulas (Gauss circle problem).

**Formula.** (Centered at origin)

$$\text{count} = \sum_{x=-\lfloor r \rfloor}^{\lfloor r \rfloor} \left(2\left\lfloor \sqrt{r^2 - x^2} \right\rfloor + 1\right)$$

**Python code.**

```python
import math

def count_lattice_points_origin(r):
    """Count lattice points inside/on circle centered at (0,0)."""
    count = 0
    for x in range(-int(r), int(r) + 1):
        y_max = int(math.sqrt(r * r - x * x))
        count += 2 * y_max + 1
    return count
```

> 📎 [LeetCode: Count Lattice Points Inside a Circle](https://leetcode.com/problems/count-lattice-points-inside-a-circle/)

#### Concept 6: Circle from Three Points (Circumcircle)

**Intuition.** Three non-collinear points uniquely determine a circle (the circumcircle of the triangle). The center is the intersection of the perpendicular bisectors of two chords.

**Derivation.** For points A, B, C, compute the perpendicular bisectors of AB and AC. Solve the linear system for the center (h,k):

```
(xA − xB)h + (yA − yB)k = (xA² − xB² + yA² − yB²) / 2
(xA − xC)h + (yA − yC)k = (xA² − xC² + yA² − yC²) / 2
```

Radius r = distance from center to any of A, B, C.

**Edge cases.** Collinear points: determinant is zero, no unique circle (infinite radius). Nearly collinear: ill-conditioned system, use double precision.

**Formula.** Using determinants (D = 2(xA(yB−yC) + xB(yC−yA) + xC(yA−yB))):

$$h = \frac{(x_A^2+y_A^2)(y_B-y_C) + (x_B^2+y_B^2)(y_C-y_A) + (x_C^2+y_C^2)(y_A-y_B)}{D}$$

$$k = \frac{(x_A^2+y_A^2)(x_C-x_B) + (x_B^2+y_B^2)(x_A-x_C) + (x_C^2+y_C^2)(x_B-x_A)}{D}$$

**Python code.**

```python
import math

def circumcircle(p1, p2, p3):
    """Returns (h, k, r) of unique circle through three points.
    Raises ValueError if points are collinear."""
    (x1, y1), (x2, y2), (x3, y3) = p1, p2, p3
    d = 2 * (x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2))
    if abs(d) < 1e-12:
        raise ValueError("Collinear points — no unique circle")
    x1s, y1s = x1 * x1 + y1 * y1, x2 * x2 + y2 * y2
    x3s = x3 * x3 + y3 * y3
    h = (x1s * (y2 - y3) + y1s * (y3 - y1) + x3s * (y1 - y2)) / d
    k = (x1s * (x3 - x2) + y1s * (x1 - x3) + x3s * (x2 - x1)) / d
    r = math.hypot(x1 - h, y1 - k)
    return (h, k, r)
```

> 📎 [Wikipedia: Circumcircle](https://en.wikipedia.org/wiki/Circumcircle)

#### Concept 7: Minimum Cuts to Divide a Circle (Symmetry)

**Intuition.** How many straight cuts through the center are needed to divide a circle into N equal pieces? Each cut is a diameter. With k cuts, you get at most 2k pieces — but only if no two cuts coincide.

**Derivation.** If k cuts (diameters) are drawn, and no two are collinear, they split the circle into 2k sectors. So N pieces → ⌈N/2⌉ cuts. If N is odd, you need (N+1)/2 cuts because each cut adds 2 sectors.

**Edge cases.** N = 1 (no cuts needed), N = 0 (undefined).

**Formula.**

$$\text{min cuts} = \begin{cases} 0 & N = 1 \\ \lceil N/2 \rceil & N > 1 \end{cases}$$

**Python code.**

```python
def min_cuts_to_divide(N):
    """Minimum cuts (diameters) to divide circle into N pieces."""
    if N == 1:
        return 0
    return (N + 1) // 2  # ceil(N/2)
```

> 📎 [LeetCode: Minimum Cuts to Divide a Circle](https://leetcode.com/problems/minimum-cuts-to-divide-a-circle/)

### 🔍 3. PROBLEM RECOGNITION

**Keywords that trigger circle containment problems:**
- "point lies inside/within a circle"
- "distance from center"
- "radius", "diameter", "circumference"
- "generate random point"
- "lattice points", "integer coordinates", "grid points"
- "queries on number of points inside"
- "circle through three points", "circumcircle"

**Interview framing:**
- "Given a set of points and a circle, how many are inside?"
- "Design a function to test if a point is in a circle."
- "How would you generate uniform random points in a circle?"
- "Count the number of integer points on or inside a circle."
- "Given three points, find the center and radius of the circle passing through them."

**Hidden indicators:**
- Problem mentions "blast radius" or "circular range" → point-in-circle
- "Uniform distribution in a disk" → polar coordinates with sqrt
- "Integer coordinates", "grid" → lattice points
- "Multiple queries" → spatial indexing / precomputation
- "Hits" in a circular area → angular sweep (see Chapter 10)

### 🧩 4. PATTERN ANALYSIS

#### Pattern 1: Point-in-Circle Test

- **When to use:** You need to check if a point lies inside a circular region.
- **Complexity:** O(1) time, O(1) space.
- **Key insight:** Always compare squared distances — never compute sqrt for a single test. For bulk queries, precompute squared radii.

#### Pattern 2: Random Sampling in a Circle

- **When to use:** Generate points uniformly distributed within a disk.
- **Complexity:** O(1) expected (polar), O(1) amortized (rejection, 4/π ≈ 1.27 expected iterations).
- **Key insight:** Rejection sampling is simpler but wastes 21.5% of samples. Polar method is exact but requires sqrt. For competitive programming, rejection is usually fine; for production, use polar.

#### Pattern 3: Lattice Point Counting (Gauss Circle Problem)

- **When to use:** Count integer-coordinate points in a circle.
- **Complexity:** O(r) time, O(1) space (naive). For r > 10⁵, consider advanced number theory (Dirichlet divisor sum).
- **Key insight:** Iterate over one axis (x), compute the max y via sqrt, count all integer y values symmetrically.

#### Pattern 4: Query Points in a Circle (Multiple Queries)

- **When to use:** Many circles, many points — need efficient filtering.
- **Complexity:** O(N·Q) brute force, O((N+Q) log N) with kd-tree or quadtree.
- **Key insight:** For static points, sort by x-coordinate and use bounding box pruning. For dynamic points, use a spatial index (R-tree, kd-tree, quadtree).

#### Pattern 5: Circumcircle Construction

- **When to use:** Given three points, find the unique circle passing through all three.
- **Complexity:** O(1) time.
- **Key insight:** Solve using perpendicular bisectors. Handle collinear edge case. This is the foundation for Delaunay triangulation and Voronoi diagrams.

### ⚡ 5. BRUTE FORCE → OPTIMIZED

#### Problem A: Generate Random Point in a Circle (LeetCode 478)

**Intuition.** Return a uniformly random point inside a circle centered at (h,k) with radius r.

**Brute force (rejection sampling).**

```python
import random

def rand_point_rejection(h, k, r):
    while True:
        x = random.uniform(h - r, h + r)
        y = random.uniform(k - r, k + r)
        if (x - h) ** 2 + (y - k) ** 2 <= r * r:
            return (x, y)
```

**Why slow.** In the worst case (tight bounding box), expected iterations = 1/(π/4) ≈ 1.27 — actually very fast. But rejection sampling can have unpredictable latency (rarely, many iterations). More importantly, it doesn't teach the underlying geometry.

**Optimization (polar coordinates).** Use the polar method: pick a uniform angle and a radius sampled proportionally to r (r·√rand) to ensure uniformity. This is deterministic in runtime.

```python
import math, random

def rand_point_polar(h, k, r):
    theta = random.random() * 2 * math.pi
    radius = r * math.sqrt(random.random())
    return (h + radius * math.cos(theta),
            k + radius * math.sin(theta))
```

**Edge cases.** r = 0 → always return center. Floating-point: cos/sin are accurate to ~1e-15.

**C++ version:**

```cpp
#include <random>
#include <cmath>

std::pair<double, double> randPoint(double h, double k, double r) {
    static std::mt19937 gen(std::random_device{}());
    static std::uniform_real_distribution<double> dist(0.0, 1.0);
    double theta = dist(gen) * 2 * M_PI;
    double radius = r * std::sqrt(dist(gen));
    return {h + radius * std::cos(theta), k + radius * std::sin(theta)};
}
```

**Java version:**

```java
import java.util.Random;

class Solution {
    private double h, k, r;
    private Random rand = new Random();

    public double[] randPoint() {
        double theta = rand.nextDouble() * 2 * Math.PI;
        double radius = r * Math.sqrt(rand.nextDouble());
        return new double[]{h + radius * Math.cos(theta), k + radius * Math.sin(theta)};
    }
}
```

#### Problem B: Count Lattice Points Inside a Circle (LeetCode 2249)

**Intuition.** Given a circle centered at (0,0) with radius r, count integer coordinate points (x,y) on or inside it.

**Brute force (O(r²)).**

```python
def count_lattice_brute(r):
    count = 0
    for x in range(-int(r), int(r) + 1):
        for y in range(-int(r), int(r) + 1):
            if x * x + y * y <= r * r:
                count += 1
    return count
```

**Why slow.** O(r²) iterations. For r = 10⁴, that's 4×10⁸ checks — far too slow.

**Optimization (O(r) row scan).** For each integer x, compute y_max = floor(√(r²−x²)). All y from −y_max to y_max are inside. Count 2·y_max + 1 per row.

```python
import math

def count_lattice_optimized(r):
    count = 0
    for x in range(-int(r), int(r) + 1):
        y_max = int(math.sqrt(r * r - x * x))
        count += 2 * y_max + 1
    return count
```

**Edge cases.** r is not an integer — use floor(r) for loop bounds. If r is huge (>10⁶), even O(r) is too slow; use Gauss circle problem number theory.

**C++ version:**

```cpp
int countLatticePoints(int r) {
    int count = 0;
    for (int x = -r; x <= r; ++x) {
        int y_max = (int)std::sqrt((long long)r * r - (long long)x * x);
        count += 2 * y_max + 1;
    }
    return count;
}
```

**Java version:**

```java
public int countLatticePoints(int r) {
    int count = 0;
    for (int x = -r; x <= r; x++) {
        int yMax = (int)Math.sqrt((long)r * r - (long)x * x);
        count += 2 * yMax + 1;
    }
    return count;
}
```

### 🏆 6. CURATED PROBLEMS

| # | Problem | Platform | Difficulty | URL | Concepts |
|---|---|---|---|---|---|
| 1 | Generate Random Point in a Circle | LeetCode | Medium | [Link](https://leetcode.com/problems/generate-random-point-in-a-circle/) | Rejection sampling, polar coordinates, uniform distribution |
| 2 | Minimum Cuts to Divide a Circle | LeetCode | Easy | [Link](https://leetcode.com/problems/minimum-cuts-to-divide-a-circle/) | Symmetry, integer division |
| 3 | Count Lattice Points Inside a Circle | LeetCode | Medium | [Link](https://leetcode.com/problems/count-lattice-points-inside-a-circle/) | Lattice points, sqrt iteration, Gauss circle |
| 4 | Queries on Number of Points Inside a Circle | LeetCode | Medium | [Link](https://leetcode.com/problems/queries-on-number-of-points-inside-a-circle/) | Brute force, spatial indexing, precomputation |
| 5 | Points in a Circle | CodeAbbey | Easy | [Link](https://www.codeabbey.com/index/task_view/points-in-a-circle) | Point-in-circle, distance² |
| 6 | Circle and Rectangle Overlapping | LeetCode | Medium | [Link](https://leetcode.com/problems/circle-and-rectangle-overlapping/) | Geometric intersection, closest point |
| 7 | Detonate the Maximum Bombs | LeetCode | Medium | [Link](https://leetcode.com/problems/detonate-the-maximum-bombs/) | Circle intersection graph, BFS/DFS |

### ✏️ 7. PRACTICE PROBLEMS

#### Problem 1: Basic Point-in-Circle

**Problem:** Given a circle centered at (3,4) with radius 5, determine how many of the following points are inside: (0,0), (3,4), (8,4), (3,9), (6,8), (10,10).

**Solution:**

```python
def point_in_circle(px, py, h, k, r):
    dx, dy = px - h, py - k
    return dx * dx + dy * dy <= r * r

points = [(0,0), (3,4), (8,4), (3,9), (6,8), (10,10)]
h, k, r = 3, 4, 5
inside = [p for p in points if point_in_circle(*p, h, k, r)]
print(len(inside), inside)  # 4: (3,4), (8,4), (3,9), (6,8)
```

#### Problem 2: Random Points in a Circle Benchmark

**Problem:** Generate 10⁵ random points inside a circle of radius 100. Compare the runtime of rejection sampling vs polar coordinates.

**Solution:**

```python
import time, random, math

h, k, r = 0, 0, 100
N = 100000

# Rejection sampling
start = time.time()
rej_points = []
while len(rej_points) < N:
    x = random.uniform(-r, r)
    y = random.uniform(-r, r)
    if x*x + y*y <= r*r:
        rej_points.append((x, y))
t_rej = time.time() - start

# Polar coordinates
start = time.time()
pol_points = []
for _ in range(N):
    theta = random.random() * 2 * math.pi
    rad = r * math.sqrt(random.random())
    pol_points.append((rad * math.cos(theta), rad * math.sin(theta)))
t_pol = time.time() - start

print(f"Rejection: {t_rej:.4f}s, Polar: {t_pol:.4f}s")
# Expected: polar is slightly faster (no wasted samples, but sqrt dominates)
```

#### Problem 3: Maximum Points in One Circle

**Problem:** Given N points (up to 100) with integer coordinates, find the maximum number that lie on or inside a circle of radius r centered at any integer coordinate.

**Solution:** Brute force over possible centers in the bounding box, then count points.

```python
def max_points_in_any_circle(points, r):
    xs = [p[0] for p in points]
    ys = [p[1] for p in points]
    best = 0
    for h in range(min(xs) - r, max(xs) + r + 1):
        for k in range(min(ys) - r, max(ys) + r + 1):
            cnt = sum(1 for (x, y) in points
                      if (x - h)**2 + (y - k)**2 <= r*r)
            best = max(best, cnt)
    return best
```

#### Problem 4: Circumcircle of Triangle

**Problem:** Given three points A(0,0), B(4,0), C(0,3), find the circumcenter and circumradius.

**Solution:**

```python
import math

x1, y1 = 0, 0
x2, y2 = 4, 0
x3, y3 = 0, 3

d = 2 * (x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2))
x1s = x1*x1 + y1*y1
x2s = x2*x2 + y2*y2
x3s = x3*x3 + y3*y3

h = (x1s * (y2 - y3) + x2s * (y3 - y1) + x3s * (y1 - y2)) / d
k = (x1s * (x3 - x2) + x2s * (x1 - x3) + x3s * (x2 - x1)) / d
r = math.hypot(x1 - h, y1 - k)

print(f"Center: ({h:.2f}, {k:.2f}), Radius: {r:.2f}")
# Center: (2.00, 1.50), Radius: 2.50
```

#### Problem 5: Queries on Number of Points Inside a Circle

**Problem:** You have N points and Q circles (each defined by center and radius). For each query, count how many points are inside the circle. N, Q ≤ 10⁵. Points and queries are given as (x,y) and (h,k,r).

**Solution (spatial pruning):** Pre-sort points by x. For each query, only consider points with x in [h−r, h+r].

```python
def query_points_in_circles(points, queries):
    points.sort()  # sort by x
    xs = [p[0] for p in points]
    ys = [p[1] for p in points]
    results = []

    for h, k, r in queries:
        r2 = r * r
        left = bisect_left(xs, h - r)
        right = bisect_right(xs, h + r)
        cnt = 0
        for i in range(left, right):
            dx, dy = xs[i] - h, ys[i] - k
            if dx * dx + dy * dy <= r2:
                cnt += 1
        results.append(cnt)
    return results
```

For very large data, use a kd-tree or grid indexing for O(√N) per query.

### 📝 8. CHAPTER QUIZ

1. **What is the standard equation of a circle centered at (h,k) with radius r?**
   - a) (x+h)² + (y+k)² = r²
   - b) (x−h)² + (y−k)² = r²
   - c) x² + y² = r²
   - d) (x−h)² + (y−k)² = r

<details>
<summary>Answer</summary>
**b)** (x−h)² + (y−k)² = r²
</details>

2. **Why do we compare squared distances instead of distances in point-in-circle tests?**
   - a) Squared distance is more accurate
   - b) Avoids the expensive sqrt operation
   - c) Squared distance is always an integer
   - d) Both a and b

<details>
<summary>Answer</summary>
**b)** Avoids the expensive sqrt operation. Comparing d² ≤ r² is equivalent to d ≤ r but avoids the square root.
</details>

3. **What is the expected number of iterations for rejection sampling to generate a random point in a unit circle using the bounding square?**
   - a) 1.0
   - b) 1.27 (4/π)
   - c) 2.0
   - d) π

<details>
<summary>Answer</summary>
**b)** 1.27 (4/π). The square has area 4, the circle has area π, so the acceptance rate is π/4 ≈ 0.785, meaning 1/0.785 ≈ 1.27 expected iterations.
</details>

4. **Why can't we sample the radius uniformly in [0,R] for random points in a circle?**
   - a) It's incorrect because points cluster near the center
   - b) It's incorrect because points cluster near the edge
   - c) It works perfectly fine
   - d) It only works for integer radii

<details>
<summary>Answer</summary>
**a)** Uniform r causes points to cluster near the center because area is proportional to r². The correct distribution samples r ∝ r, i.e., r = R·√(rand).
</details>

5. **How many lattice points are on or inside a circle centered at (0,0) with radius 2?**
   - a) 9
   - b) 13
   - c) 5
   - d) 21

<details>
<summary>Answer</summary>
**b)** 13. Points: (−2,0),(−1,−2..2),(0,−2..2),(1,−2..2),(2,0). Total = 1+5+5+5+1−4 = 13. (Actually count: all (x,y) with x²+y² ≤ 4 gives 13 points.)
</details>

6. **What is the minimum number of cuts (diameters) needed to divide a circle into 7 equal pieces?**
   - a) 3
   - b) 4
   - c) 7
   - d) 14

<details>
<summary>Answer</summary>
**b)** 4. ceil(7/2) = 4. Each cut adds at most 2 sectors.
</details>

7. **Three collinear points can determine a unique circle.**
   - a) True
   - b) False

<details>
<summary>Answer</summary>
**b)** False. Collinear points cannot determine a finite circle (the circumcircle has infinite radius / is undefined).
</details>

8. **What data structure is most appropriate for answering many "points inside a circle" queries on static points?**
   - a) Hash map
   - b) kd-tree or quadtree
   - c) Linked list
   - d) Stack

<details>
<summary>Answer</summary>
**b)** kd-tree or quadtree. These spatial indexes allow O(log N) or O(√N) range queries.
</details>

9. **What is the circumference of a circle with radius 5?**
   - a) 10π
   - b) 25π
   - c) 5π
   - d) 2π

<details>
<summary>Answer</summary>
**a)** C = 2πr = 10π
</details>

10. **What is the area of a circle with radius 3?**
    - a) 9π
    - b) 6π
    - c) 3π
    - d) π

<details>
<summary>Answer</summary>
**a)** A = πr² = 9π
</details>

### 🃏 9. FLASHCARDS

1. **Q: What is the standard equation of a circle?**
   **A:** (x−h)² + (y−k)² = r² where (h,k) is the center and r is the radius.

2. **Q: How do you test if a point (x,y) is inside a circle?**
   **A:** Compute (x−h)² + (y−k)² ≤ r². Always compare squared distances — never compute sqrt.

3. **Q: How do you generate a uniform random point in a circle?**
   **A:** Rejection sampling (sample bounding square, reject outside) or polar coordinates (θ = 2π·rand, r = R·√rand).

4. **Q: Why must the radius be sampled as r·√(rand) instead of r·rand?**
   **A:** Area is proportional to r²; to maintain uniformity, the CDF must be r², so the inverse transform gives r·√(rand).

5. **Q: How do you count lattice points inside a circle centered at the origin?**
   **A:** Iterate x from −r to r. For each x, y_max = floor(√(r²−x²)). Count 2·y_max+1 per row. Total is O(r).

6. **Q: How many cuts (diameters) to divide a circle into N pieces?**
   **A:** ceil(N/2). Each cut through the center adds at most 2 sectors. N=1 → 0 cuts.

7. **Q: How do you find the circle through three points?**
   **A:** Compute the intersection of two perpendicular bisectors. Use determinant formulas for center (h,k), then r = distance to any point.

8. **Q: What is the area of a circle?**
   **A:** A = πr².

9. **Q: What is the circumference of a circle?**
   **A:** C = 2πr.

10. **Q: What happens to the circumcircle of three collinear points?**
    **A:** No finite circumcircle exists — the three points cannot all lie on a finite circle (the radius approaches infinity).

### 📎 10. REFERENCES & FURTHER READING

- 📎 [Wikipedia: Circle](https://en.wikipedia.org/wiki/Circle) — Comprehensive overview of circle definitions, properties, and equations.
- 📎 [Wikipedia: π](https://en.wikipedia.org/wiki/Pi) — History, approximations, and formulas involving the constant π.
- 📎 [Wikipedia: Circumcircle](https://en.wikipedia.org/wiki/Circumcircle) — Detailed derivation of the circle through three points.
- 📎 [Khan Academy: Circle equations](https://www.khanacademy.org/math/geometry/xf63ca4b1:hs-geo-conic-sections) — Interactive tutorial on the standard and general forms.
- 📎 [3Blue1Brown: π visual proof](https://www.youtube.com/watch?v=d-o3eB9sfls) — Beautiful visual proof of the area of a circle.
- 📎 [Wikipedia: Gauss circle problem](https://en.wikipedia.org/wiki/Gauss_circle_problem) — Number-theoretic approach to counting lattice points.
- 📎 [LeetCode: Generate Random Point in a Circle](https://leetcode.com/problems/generate-random-point-in-a-circle/) — Problem and editorial with multiple approaches.
- 📎 [LeetCode: Count Lattice Points Inside a Circle](https://leetcode.com/problems/count-lattice-points-inside-a-circle/) — Multiple-circle lattice point counting.
- 📎 [LeetCode: Minimum Cuts to Divide a Circle](https://leetcode.com/problems/minimum-cuts-to-divide-a-circle/) — Easy problem testing symmetry insight.
## Chapter 10: Circles — Intersection & Angular Sweep

### 🎯 Learning Objectives

- Classify circle-circle intersection cases: separate, tangent (external/internal), intersecting, concentric
- Compute intersection points of two circles using the chord method
- Solve line-circle intersection by distance-from-center comparison
- Apply the angular sweep technique to find the maximum points covered by a circular arc
- Determine circle-rectangle and circle-triangle overlap
- Implement Welzl's algorithm for the smallest enclosing circle in expected O(n)
- Solve bomb-detonation chain problems using circle intersection graphs with BFS/DFS

### 📖 1. INTRODUCTION

Imagine you're playing darts. The dartboard is a circle, and you've thrown 100 darts — all landed. What's the maximum number you could cover with a single circular dartboard of radius r placed anywhere on the board? This is the **angular sweep** problem, and it appears in LeetCode Hard problems, robotics (sensor range), and computational geometry (visibility).

This chapter moves beyond the single-circle containment of Chapter 9 into interactions between circles, lines, and other shapes. The central algorithmic technique is **angular sweep** — sorting points by polar angle and sliding a window to find the optimal circular coverage.

> 📎 [Wikipedia: Circle-circle intersection](https://en.wikipedia.org/wiki/Circle%E2%80%93circle_intersection) · [CP-Algorithms: Circle intersection](https://cp-algorithms.com/geometry/circle-circle-intersection.html) · [LeetCode: Maximum Number of Darts](https://leetcode.com/problems/maximum-number-of-darts-inside-a-circular-dartboard/)

### 📚 2. CORE CONCEPTS

#### Concept 1: Circle-Circle Intersection

**Intuition.** Two circles intersect depending on the distance d between their centers relative to their radii r₁, r₂. Visualize two coins sliding toward each other: they first touch externally, then overlap, align concentrically, separate again, and touch internally.

**Derivation.** Let centers C₁, C₂ with distance d. Compute the chord perpendicular to C₁C₂ at distance a from C₁:

```
a = (r₁² − r₂² + d²) / (2d)
h² = r₁² − a²
```

Intersection points are at angle θ = atan2(C₂−C₁) ± atan2(h, a) from C₁.

**Edge cases.** d = 0 (concentric): if r₁ = r₂, infinite intersections (coincident circles); otherwise no intersection. d > r₁ + r₂: separate. d = r₁ + r₂: external tangent. d = |r₁ − r₂|: internal tangent.

**Formula.** Circles intersect iff |r₁ − r₂| ≤ d ≤ r₁ + r₂.

**Python code.**

```python
import math

def circle_circle_intersection(c1, r1, c2, r2):
    """Returns list of intersection points of two circles."""
    x1, y1 = c1
    x2, y2 = c2
    dx, dy = x2 - x1, y2 - y1
    d = math.hypot(dx, dy)

    if d > r1 + r2 + 1e-9 or d < abs(r1 - r2) - 1e-9 or d == 0:
        return []  # no intersection or concentric

    a = (r1 * r1 - r2 * r2 + d * d) / (2 * d)
    h2 = r1 * r1 - a * a
    if h2 < 0:
        h2 = 0
    h = math.sqrt(h2)

    xm = x1 + a * dx / d
    ym = y1 + a * dy / d
    xs1 = xm + h * dy / d
    ys1 = ym - h * dx / d
    xs2 = xm - h * dy / d
    ys2 = ym + h * dx / d

    if h == 0:
        return [(xs1, ys1)]  # tangent
    return [(xs1, ys1), (xs2, ys2)]
```

> 📎 [Wikipedia: Circle-circle intersection](https://en.wikipedia.org/wiki/Circle%E2%80%93circle_intersection)

#### Concept 2: Line-Circle Intersection

**Intuition.** A line intersects a circle in 0, 1 (tangent), or 2 points. Compute the perpendicular distance from the center to the line. If this distance exceeds the radius, no intersection.

**Derivation.** Line in form ax + by + c = 0. Distance from (h,k) to line:

```
dist = |a·h + b·k + c| / √(a² + b²)
```

If dist > r: no intersection. If dist = r: one tangent point. If dist < r: two intersection points found by projecting the center onto the line and moving along the line direction by ±√(r² − dist²).

**Edge cases.** Vertical lines (b = 0): handle division by zero. Line segment intersection: also check if intersection points lie within segment bounds.

**Formula.**

$$\text{dist} = \frac{|a h + b k + c|}{\sqrt{a^2 + b^2}}$$

$$\text{intersects}\iff \text{dist} \le r$$

**Python code.**

```python
import math

def line_circle_intersection(a, b, c, h, k, r):
    """Line ax + by + c = 0 with circle centered at (h,k) radius r."""
    dist = abs(a * h + b * k + c) / math.hypot(a, b)
    if dist > r + 1e-9:
        return []

    # Project center onto line
    d = a * h + b * k + c
    x0 = h - a * d / (a * a + b * b)
    y0 = k - b * d / (a * a + b * b)

    if abs(dist - r) < 1e-9:
        return [(x0, y0)]  # tangent

    # Direction along line
    seg = math.sqrt(r * r - dist * dist) / math.hypot(a, b)
    return [(x0 + b * seg, y0 - a * seg),
            (x0 - b * seg, y0 + a * seg)]
```

> 📎 [Wikipedia: Line–sphere intersection](https://en.wikipedia.org/wiki/Line%E2%80%93sphere_intersection) (3D; the 2D case is analogous)

#### Concept 3: Angular Sweep Technique

**Intuition.** You have a set of points and a circular dartboard of fixed radius. You can place the dartboard anywhere. Where should the center go to cover the maximum number of points? The key insight: the optimal dartboard has at least two points on its boundary (or one if all can't fit). Fix one point on the boundary and rotate the circle around it, tracking which points enter/exit.

**Derivation.** For each point Pi, consider it as an "anchor" on the boundary. For every other point Pj, compute the angle range [θ_start, θ_end] where the circle centered at Pi's angular position covers Pj. Sort all angle events (enter/exit) and sweep with a sliding window.

**Edge cases.** Multiple points at the exact same location (include all). Points already inside the anchor point's circle. Floating-point precision for atan2 ranges.

**Key formula.** For anchor Pi and target Pj, the angle range is centered at atan2(Pj−Pi) ± α, where α = arccos(dist(Pi,Pj) / (2r)).

**Python code (angle event generation).**

```python
import math

def count_points_in_circle_angular(points, r):
    if not points:
        return 0
    n = len(points)
    best = 1

    for i in range(n):
        angles = []
        for j in range(n):
            if i == j:
                continue
            dx = points[j][0] - points[i][0]
            dy = points[j][1] - points[i][1]
            d = math.hypot(dx, dy)
            if d > 2 * r + 1e-9:
                continue
            alpha = math.acos(d / (2 * r))
            base = math.atan2(dy, dx)
            lo = base - alpha
            hi = base + alpha
            angles.append((lo, 1))   # enters
            angles.append((hi, -1))  # exits
            # Handle wrap-around: also add [lo+2π, hi+2π]
            angles.append((lo + 2 * math.pi, 1))
            angles.append((hi + 2 * math.pi, -1))

        angles.sort(key=lambda x: (x[0], -x[1]))
        cnt = 1  # anchor point itself
        for _, typ in angles:
            cnt += typ
            best = max(best, cnt)

    return best
```

> 📎 [LeetCode: Maximum Number of Darts Inside a Circular Dartboard](https://leetcode.com/problems/maximum-number-of-darts-inside-a-circular-dartboard/)

#### Concept 4: Circle and Rectangle Overlapping

**Intuition.** A circle overlaps a rectangle if either (a) the center is inside the rectangle, (b) any corner is inside the circle, or (c) the closest point on any edge to the center is within the radius.

**Derivation.** Find the closest point on the rectangle to the circle's center. Clamp the center coordinates to the rectangle bounds — the clamped point is the closest. If distance² ≤ r², they overlap.

**Edge cases.** Circle fully inside rectangle. Rectangle fully inside circle. No overlap.

**Python code.**

```python
def circle_rect_overlap(h, k, r, x1, y1, x2, y2):
    """Rectangle [x1,x2] × [y1,y2], circle center (h,k) radius r."""
    closest_x = max(x1, min(h, x2))
    closest_y = max(y1, min(k, y2))
    dx = h - closest_x
    dy = k - closest_y
    return dx * dx + dy * dy <= r * r
```

> 📎 [LeetCode: Circle and Rectangle Overlapping](https://leetcode.com/problems/circle-and-rectangle-overlapping/)

#### Concept 5: Circle and Triangle Overlapping (Area Method)

**Intuition.** A circle overlaps a triangle if any vertex is inside the circle, any edge crosses the circle, or the circle is entirely inside the triangle.

**Derivation.** Three sub-tests: (1) any triangle vertex inside circle; (2) any edge (line segment) intersects circle; (3) if the circle center is inside the triangle (point-in-triangle test), they overlap. If none, check if the triangle is completely outside by testing the distance from center to each edge's supporting line.

**Edge cases.** Triangle fully inside circle (all vertices inside). Circle inside triangle (center inside + all edges farther than r from center).

**Python code.**

```python
def point_in_triangle(px, py, ax, ay, bx, by, cx, cy):
    """Barycentric coordinate test."""
    d1 = (px - bx) * (ay - by) - (ax - bx) * (py - by)
    d2 = (px - cx) * (by - cy) - (bx - cx) * (py - cy)
    d3 = (px - ax) * (cy - ay) - (cx - ax) * (py - ay)
    return (d1 >= 0 and d2 >= 0 and d3 >= 0) or \
           (d1 <= 0 and d2 <= 0 and d3 <= 0)

def circle_triangle_overlap(h, k, r, t):
    """Triangle t = ((ax,ay), (bx,by), (cx,cy))."""
    (ax, ay), (bx, by), (cx, cy) = t

    # Vertex inside circle?
    for (vx, vy) in [(ax, ay), (bx, by), (cx, cy)]:
        if (vx - h)**2 + (vy - k)**2 <= r*r:
            return True

    # Edge intersects circle? (line segment to circle)
    edges = [((ax, ay), (bx, by)), ((bx, by), (cx, cy)), ((cx, cy), (ax, ay))]
    for (x1, y1), (x2, y2) in edges:
        # Closest point on segment to (h,k)
        dx, dy = x2 - x1, y2 - y1
        t = ((h - x1) * dx + (k - y1) * dy) / (dx*dx + dy*dy)
        t = max(0, min(1, t))
        cx_ = x1 + t * dx
        cy_ = y1 + t * dy
        if (h - cx_)**2 + (k - cy_)**2 <= r*r:
            return True

    # Center inside triangle?
    if point_in_triangle(h, k, ax, ay, bx, by, cx, cy):
        return True

    return False
```

#### Concept 6: Smallest Enclosing Circle (Welzl's Algorithm)

**Intuition.** Given N points, find the smallest circle that contains all of them. This is the classic **minimum enclosing circle (MEC)** problem. Welzl's algorithm uses randomization to achieve expected O(n). It's a recursive "remove and test" approach: randomly permute points, and for each point, if it's outside the current circle, recurse with it as a boundary point.

**Derivation.** The smallest enclosing circle is determined by either 2 points (diameter) or 3 points (circumcircle). Welzl's algorithm maintains a set of boundary points (≤3). When a new point falls outside, it must be on the boundary of the optimal circle.

**Edge cases.** All points collinear → smallest circle uses the farthest pair as diameter. All points identical → r = 0.

**Python code.**

```python
import math, random

def _circumcircle(p1, p2, p3):
    """Circle through three points (or from two)."""
    (x1, y1), (x2, y2), (x3, y3) = p1, p2, p3
    d = 2 * (x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2))
    if abs(d) < 1e-12:
        # Collinear: use farthest pair as diameter
        return _circle_from_two(p1, p2)  # fallback
    x1s, y1s = x1*x1 + y1*y1, x2*x2 + y2*y2
    x3s = x3*x3 + y3*y3
    h = (x1s*(y2-y3) + y1s*(y3-y1) + x3s*(y1-y2)) / d
    k = (x1s*(x3-x2) + y1s*(x1-x3) + x3s*(x2-x1)) / d
    r = math.hypot(x1-h, y1-k)
    return (h, k, r)

def _circle_from_two(p1, p2):
    """Circle with p1,p2 as diameter."""
    h = (p1[0] + p2[0]) / 2
    k = (p1[1] + p2[1]) / 2
    r = math.hypot(p1[0]-p2[0], p1[1]-p2[1]) / 2
    return (h, k, r)

def _welzl(points, boundary, n):
    if n == 0 or len(boundary) == 3:
        if len(boundary) == 0:
            return (0, 0, 0)
        if len(boundary) == 1:
            return (boundary[0][0], boundary[0][1], 0)
        if len(boundary) == 2:
            return _circle_from_two(*boundary)
        return _circumcircle(*boundary)

    idx = random.randrange(n)
    p = points[idx]
    points[idx], points[n-1] = points[n-1], points[idx]

    c = _welzl(points, boundary, n - 1)
    h, k, r = c
    if (p[0] - h)**2 + (p[1] - k)**2 <= r*r + 1e-9:
        return c

    boundary.append(p)
    result = _welzl(points, boundary, n - 1)
    boundary.pop()
    return result

def smallest_enclosing_circle(points):
    """Welzl's algorithm. Returns (h, k, r). Expected O(n)."""
    pts = points[:]
    random.shuffle(pts)
    return _welzl(pts, [], len(pts))
```

> 📎 [Wikipedia: Smallest enclosing circle](https://en.wikipedia.org/wiki/Smallest_enclosing_circle) · [Wikipedia: Welzl's algorithm](https://en.wikipedia.org/wiki/Welzl%27s_algorithm)

#### Concept 7: Detonate the Maximum Bombs (Circle Intersection Graph)

**Intuition.** Each bomb has a blast radius that triggers other bombs within it, forming a directed graph. The maximum detonation chain is the largest reachable set from any starting bomb — found via BFS/DFS.

**Derivation.** For each pair of bombs (i,j), if distance² ≤ rᵢ² (blast radius of i reaches j), add a directed edge i→j. Then for each node, BFS to count reachable nodes. Take the maximum.

**Edge cases.** Self-triggering counts. Chain reactions can be very long. Multiple bombs at the same position with different radii.

**Python code.**

```python
from collections import deque

def maximum_detonation(bombs):
    """bombs: list of (x, y, r). Returns max bombs that can detonate."""
    n = len(bombs)
    graph = [[] for _ in range(n)]

    for i in range(n):
        x1, y1, r1 = bombs[i]
        for j in range(n):
            if i == j:
                continue
            x2, y2, _ = bombs[j]
            dx, dy = x1 - x2, y1 - y2
            if dx * dx + dy * dy <= r1 * r1:
                graph[i].append(j)

    def bfs(start):
        visited = [False] * n
        q = deque([start])
        visited[start] = True
        count = 0
        while q:
            u = q.popleft()
            count += 1
            for v in graph[u]:
                if not visited[v]:
                    visited[v] = True
                    q.append(v)
        return count

    return max(bfs(i) for i in range(n))
```

> 📎 [LeetCode: Detonate the Maximum Bombs](https://leetcode.com/problems/detonate-the-maximum-bombs/)

### 🔍 3. PROBLEM RECOGNITION

**Keywords that trigger circle intersection & angular sweep:**
- "maximum number of points that can be covered by a circle"
- "dartboard", "circular range", "blast radius"
- "circle intersection", "overlap", "tangent"
- "line intersects circle", "line segment circle"
- "minimum enclosing circle", "smallest circle"
- "bomb detonation chain", "chain reaction"
- "angular sweep", "polar angle", "sliding window angle"
- "circle and rectangle", "circle and triangle"

**Interview framing:**
- "Given N points, find the maximum number that can be covered by a circle of radius r."
- "Determine if a circle and rectangle overlap."
- "Find the smallest circle that covers all points."
- "What is the maximum number of bombs that can detonate in a chain reaction?"
- "Given two circles, find their intersection points."

**Hidden indicators:**
- Problem says "circular" + "maximum/optimal placement" → angular sweep
- "Detonate/trigger chain" → directed graph + BFS/DFS on circle intersection
- "Smallest/enclosing" + "points" → Welzl's algorithm
- "Overlap" with rectangle → closest-point clamp test
- "Visible points" + "angle/field of view" → angular sweep with polar angles

### 🧩 4. PATTERN ANALYSIS

#### Pattern 1: Circle-Circle Intersection Classification

- **When to use:** Two circular ranges interact.
- **Complexity:** O(1) time.
- **Key insight:** Check d vs r₁+r₂ and d vs |r₁−r₂|. Concentric circles (d=0) are a special case. Use the chord formula for exact intersection points.

#### Pattern 2: Angular Sweep for Maximum Coverage

- **When to use:** Place a circle of fixed radius to maximize covered points. Field-of-view problems.
- **Complexity:** O(n² log n) — for each anchor point, sort O(n) angle events.
- **Key insight:** The optimal circle touches at least 2 points. Fix one point on the boundary, rotate a circle around it, and track enter/exit events via polar angle.

#### Pattern 3: Closest Point on Rectangle

- **When to use:** Circle-rectangle overlap test.
- **Complexity:** O(1).
- **Key insight:** The closest point on an axis-aligned rectangle to (h,k) is simply (clamp(h, x1, x2), clamp(k, y1, y2)). Compare distance² to r².

#### Pattern 4: Smallest Enclosing Circle (Welzl's)

- **When to use:** Find minimal radius circle covering all points. Facility location, clustering.
- **Complexity:** Expected O(n), worst-case O(n²). Randomization gives linear expected time.
- **Key insight:** The MEC is defined by at most 3 boundary points. Welzl's randomized algorithm recursively removes points and adds them to the boundary set when they're outside the current circle.

#### Pattern 5: Circular Reachability Graph

- **When to use:** Chain reactions, bomb detonation, circular influence propagation.
- **Complexity:** O(n²) to build graph + O(n·(n+e)) for BFS from each node.
- **Key insight:** Problems like "Detonate the Maximum Bombs" reduce to: build a directed graph where i→j if distance(i,j) ≤ rᵢ, then find the largest reachable set.

### ⚡ 5. BRUTE FORCE → OPTIMIZED

#### Problem A: Maximum Number of Darts Inside a Circular Dartboard (LeetCode 1453, Hard)

**Intuition.** Given N points and radius r, place a circle of radius r to maximize the number of points it covers.

**Brute force (O(n³)).**

```python
import math

def max_darts_brute(points, r):
    n = len(points)
    best = 1
    for i in range(n):
        for j in range(n):
            # Try circle with chord (i,j) at angle θ
            x1, y1 = points[i]
            x2, y2 = points[j]
            d = math.hypot(x2 - x1, y2 - y1)
            if d > 2 * r:
                continue
            # Two possible centers
            mx, my = (x1+x2)/2, (y1+y2)/2
            h = math.sqrt(r*r - (d/2)*(d/2))
            perp_x = -(y2 - y1) / d
            perp_y = (x2 - x1) / d
            for sign in [1, -1]:
                cx = mx + sign * h * perp_x
                cy = my + sign * h * perp_y
                cnt = sum(1 for (px, py) in points
                          if (px-cx)**2 + (py-cy)**2 <= r*r + 1e-9)
                best = max(best, cnt)
    return best
```

**Why slow.** O(n³) — testing every pair of points and counting points inside is O(n) per candidate center. For n=100, that's 10⁶ checks, but for n=500 it's 125×10⁶.

**Optimization (angular sweep, O(n² log n)).** For each anchor point, treat it as on the boundary. Compute the angular range that covers every other point. Sweep the circle around the anchor, tracking coverage changes.

```python
import math

def max_darts_angular(points, r):
    n = len(points)
    best = 1

    for i in range(n):
        angles = []
        for j in range(n):
            if i == j:
                continue
            dx = points[j][0] - points[i][0]
            dy = points[j][1] - points[i][1]
            d = math.hypot(dx, dy)
            if d > 2 * r + 1e-9:
                continue
            alpha = math.acos(d / (2 * r))
            base = math.atan2(dy, dx)
            lo = base - alpha
            hi = base + alpha
            angles.append((lo, 1))
            angles.append((hi, -1))
            angles.append((lo + 2 * math.pi, 1))
            angles.append((hi + 2 * math.pi, -1))

        if not angles:
            continue
        angles.sort(key=lambda x: (x[0], -x[1]))
        cnt = 1
        for _, typ in angles:
            cnt += typ
            best = max(best, cnt)

    return best
```

**Edge cases.** r = 0: each point covers only itself → best = 1. All points coincide at same location → best = n. Floating-point: use epsilon in comparisons.

**C++ version:**

```cpp
int numPoints(vector<vector<int>>& points, int r) {
    int n = points.size(), best = 1;
    for (int i = 0; i < n; ++i) {
        vector<pair<double, int>> angles;
        for (int j = 0; j < n; ++j) {
            if (i == j) continue;
            double dx = points[j][0] - points[i][0];
            double dy = points[j][1] - points[i][1];
            double d = hypot(dx, dy);
            if (d > 2 * r + 1e-9) continue;
            double alpha = acos(d / (2 * r));
            double base = atan2(dy, dx);
            double lo = base - alpha, hi = base + alpha;
            angles.emplace_back(lo, 1);
            angles.emplace_back(hi, -1);
            angles.emplace_back(lo + 2*M_PI, 1);
            angles.emplace_back(hi + 2*M_PI, -1);
        }
        sort(angles.begin(), angles.end());
        int cnt = 1;
        for (auto& [_, t] : angles) {
            cnt += t;
            best = max(best, cnt);
        }
    }
    return best;
}
```

**Java version:**

```java
public int numPoints(int[][] points, int r) {
    int n = points.length, best = 1;
    for (int i = 0; i < n; i++) {
        List<double[]> angles = new ArrayList<>();
        for (int j = 0; j < n; j++) {
            if (i == j) continue;
            double dx = points[j][0] - points[i][0];
            double dy = points[j][1] - points[i][1];
            double d = Math.hypot(dx, dy);
            if (d > 2 * r + 1e-9) continue;
            double alpha = Math.acos(d / (2 * r));
            double base = Math.atan2(dy, dx);
            angles.add(new double[]{base - alpha, 1});
            angles.add(new double[]{base + alpha, -1});
            angles.add(new double[]{base - alpha + 2*Math.PI, 1});
            angles.add(new double[]{base + alpha + 2*Math.PI, -1});
        }
        angles.sort((a, b) -> Double.compare(a[0], b[0]));
        int cnt = 1;
        for (double[] ev : angles) {
            cnt += (int) ev[1];
            best = Math.max(best, cnt);
        }
    }
    return best;
}
```

#### Problem B: Detonate the Maximum Bombs (LeetCode 2101)

**Intuition.** Each bomb (x,y,r) detonates all bombs within its blast radius, which may chain-detonate others. Find the maximum bombs detonated starting from any single bomb.

**Brute force (BFS from each node).**

```python
from collections import deque

def max_detonate_brute(bombs):
    n = len(bombs)

    def bfs(start):
        q = deque([start])
        visited = [False] * n
        visited[start] = True
        count = 0
        while q:
            i = q.popleft()
            count += 1
            x1, y1, r1 = bombs[i]
            for j in range(n):
                if visited[j]:
                    continue
                x2, y2, _ = bombs[j]
                dx, dy = x1 - x2, y1 - y2
                if dx * dx + dy * dy <= r1 * r1:
                    visited[j] = True
                    q.append(j)
        return count

    return max(bfs(i) for i in range(n))
```

**Why slow.** O(n³) worst-case — for each starting node, we check all pairs during BFS. For n=100 it's fine; for n=500 it's 125M checks.

**Optimization (precompute graph, O(n² + n·(n+e))).** Build the directed graph once (O(n²) edge checks), then BFS from each node (O(n·(n+e))).

```python
from collections import deque

def max_detonate_optimized(bombs):
    n = len(bombs)
    graph = [[] for _ in range(n)]

    for i in range(n):
        x1, y1, r1 = bombs[i]
        r1_sq = r1 * r1
        for j in range(n):
            if i == j:
                continue
            x2, y2, _ = bombs[j]
            dx, dy = x1 - x2, y1 - y2
            if dx * dx + dy * dy <= r1_sq:
                graph[i].append(j)

    def bfs(start):
        q = deque([start])
        visited = [False] * n
        visited[start] = True
        count = 0
        while q:
            u = q.popleft()
            count += 1
            for v in graph[u]:
                if not visited[v]:
                    visited[v] = True
                    q.append(v)
        return count

    return max(bfs(i) for i in range(n))
```

**Edge cases.** Single bomb → returns 1. All bombs same position with varying radii: depending on radius, some may not chain to others if radius is too small. r = 0: bomb only detonates itself.

**C++ version:**

```cpp
int maximumDetonation(vector<vector<int>>& bombs) {
    int n = bombs.size();
    vector<vector<int>> graph(n);
    for (int i = 0; i < n; ++i) {
        long long x1 = bombs[i][0], y1 = bombs[i][1], r1 = bombs[i][2];
        long long r1_sq = r1 * r1;
        for (int j = 0; j < n; ++j) {
            if (i == j) continue;
            long long dx = x1 - bombs[j][0];
            long long dy = y1 - bombs[j][1];
            if (dx * dx + dy * dy <= r1_sq)
                graph[i].push_back(j);
        }
    }

    int ans = 0;
    for (int i = 0; i < n; ++i) {
        vector<bool> visited(n, false);
        queue<int> q;
        q.push(i);
        visited[i] = true;
        int cnt = 0;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            ++cnt;
            for (int v : graph[u]) {
                if (!visited[v]) {
                    visited[v] = true;
                    q.push(v);
                }
            }
        }
        ans = max(ans, cnt);
    }
    return ans;
}
```

### 🏆 6. CURATED PROBLEMS

| # | Problem | Platform | Difficulty | URL | Concepts |
|---|---|---|---|---|---|
| 1 | Maximum Number of Darts Inside a Circular Dartboard | LeetCode | Hard | [Link](https://leetcode.com/problems/maximum-number-of-darts-inside-a-circular-dartboard/) | Angular sweep, O(n² log n) |
| 2 | Maximum Number of Visible Points | LeetCode | Hard | [Link](https://leetcode.com/problems/maximum-number-of-visible-points/) | Polar angle, angular sweep, field-of-view |
| 3 | Detonate the Maximum Bombs | LeetCode | Medium | [Link](https://leetcode.com/problems/detonate-the-maximum-bombs/) | Circle intersection graph, BFS/DFS |
| 4 | Circle and Rectangle Overlapping | LeetCode | Medium | [Link](https://leetcode.com/problems/circle-and-rectangle-overlapping/) | Closest-point clamp, geometric intersection |
| 5 | Minimum Enclosing Circle | Codeforces | Hard | [Link](https://codeforces.com/problemset/problem/1/A) | Welzl's algorithm, randomized O(n) |
| 6 | Circle-Circle Intersection | CP-Algorithms | Medium | [Link](https://cp-algorithms.com/geometry/circle-circle-intersection.html) | Chord method, distance classification |
| 7 | Points in a Circle | CodeAbbey | Easy | [Link](https://www.codeabbey.com/index/task_view/points-in-a-circle) | Point-in-circle, distance² |

### ✏️ 7. PRACTICE PROBLEMS

#### Problem 1: Circle-Circle Intersection Classification

**Problem:** Given two circles: C₁ at (0,0) with r₁=5, C₂ at (8,0) with r₂=3. Do they intersect?

**Solution:**

```python
import math

x1, y1, r1 = 0, 0, 5
x2, y2, r2 = 8, 0, 3
d = math.hypot(x2 - x1, y2 - y1)

if d > r1 + r2:
    print("Separate — no intersection")
elif abs(d - (r1 + r2)) < 1e-9:
    print("Externally tangent")
elif d > abs(r1 - r2):
    print("Intersecting at 2 points")
elif abs(d - abs(r1 - r2)) < 1e-9 and d > 0:
    print("Internally tangent")
elif d < abs(r1 - r2):
    print("One inside the other — no intersection")
else:
    print("Concentric")

# d = 8, r1+r2 = 8 → "Externally tangent"
```

#### Problem 2: Circle and Rectangle Overlap

**Problem:** Circle centered at (3,4) radius 5. Rectangle from (0,0) to (6,8). Do they overlap?

**Solution:**

```python
def circle_rect_overlap(h, k, r, x1, y1, x2, y2):
    closest_x = max(x1, min(h, x2))
    closest_y = max(y1, min(k, y2))
    dx = h - closest_x
    dy = k - closest_y
    return dx*dx + dy*dy <= r*r

print(circle_rect_overlap(3, 4, 5, 0, 0, 6, 8))  # True
```

#### Problem 3: Angular Sweep for Visible Points

**Problem:** You're at (0,0). Points are at [(1,0), (2,0), (−1,0), (0,2)]. Your field-of-view angle is 90° (π/2). What's the max number you can see?

**Solution:**

```python
import math

def max_visible_points(points, fov):
    angles = [math.atan2(y, x) for (x, y) in points]
    angles.sort()
    # Duplicate with 2π shift for wrap-around
    n = len(angles)
    extended = angles + [a + 2*math.pi for a in angles]

    best = 0
    r = 0
    for l in range(n):
        while r < len(extended) and extended[r] - extended[l] <= fov + 1e-9:
            r += 1
        best = max(best, r - l)

    return best

points = [(1, 0), (2, 0), (-1, 0), (0, 2)]
print(max_visible_points(points, math.pi / 2))  # 3 (0°, 90°, and both 0° points)
```

#### Problem 4: Smallest Enclosing Circle

**Problem:** Find the smallest circle covering [(0,0), (1,0), (0,1), (1,1)].

**Solution:**

```python
import math

def smallest_enclosing_circle_brute(points):
    """Try all pairs (diameter) and all triples (circumcircle). O(n⁴)."""
    n = len(points)
    best = (0, 0, float('inf'))

    def covers(h, k, r):
        return all((x - h)**2 + (y - k)**2 <= r*r + 1e-9 for (x, y) in points)

    # Single point
    for (x, y) in points:
        if covers(x, y, 0):
            return (x, y, 0)

    # Pairs as diameter
    for i in range(n):
        for j in range(i+1, n):
            x1, y1 = points[i]
            x2, y2 = points[j]
            h, k = (x1+x2)/2, (y1+y2)/2
            r = math.hypot(x2-x1, y2-y1) / 2
            if r < best[2] and covers(h, k, r):
                best = (h, k, r)

    # Triples as circumcircle
    for i in range(n):
        for j in range(i+1, n):
            for k in range(j+1, n):
                try:
                    h, kk, r = circumcircle(points[i], points[j], points[k])
                    if r < best[2] and covers(h, kk, r):
                        best = (h, kk, r)
                except ValueError:
                    pass
    return best

# For points [(0,0), (1,0), (0,1), (1,1)], the smallest enclosing
# circle is centered at (0.5, 0.5) with radius √2/2 ≈ 0.707.
```

#### Problem 5: Maximum Bombs Detonated

**Problem:** Bombs: A(0,0,3), B(4,0,2), C(1,0,1). Which start yields the longest chain?

**Solution:**

```python
from collections import deque

bombs = [(0, 0, 3), (4, 0, 2), (1, 0, 1)]
n = len(bombs)

graph = [[] for _ in range(n)]
for i in range(n):
    x1, y1, r1 = bombs[i]
    for j in range(n):
        if i == j: continue
        dx = x1 - bombs[j][0]
        dy = y1 - bombs[j][1]
        if dx*dx + dy*dy <= r1*r1:
            graph[i].append(j)

def bfs(start):
    q = deque([start])
    visited = [False] * n
    visited[start] = True
    cnt = 0
    while q:
        u = q.popleft()
        cnt += 1
        for v in graph[u]:
            if not visited[v]:
                visited[v] = True
                q.append(v)
    return cnt

print([bfs(i) for i in range(n)])  # Start A: 2 (A,C), B: 1, C: 1
```

### 📝 8. CHAPTER QUIZ

1. **Two circles with radii 5 and 3 have centers 10 units apart. What's their relationship?**
   - a) Intersecting at 2 points
   - b) Separate
   - c) Externally tangent
   - d) Concentric

<details>
<summary>Answer</summary>
**b)** Separate. d = 10 > r₁ + r₂ = 8, so they do not intersect.
</details>

2. **What is the angular sweep technique used for?**
   - a) Finding the area of a circle
   - b) Maximizing points covered by a circular arc
   - c) Computing the circumference
   - d) Detecting collinear points

<details>
<summary>Answer</summary>
**b)** Angular sweep finds the maximum points inside a circular region of fixed radius by sorting points by polar angle around an anchor point and sliding a window.
</details>

3. **What is the time complexity of the angular sweep approach for maximum darts?**
   - a) O(n)
   - b) O(n log n)
   - c) O(n² log n)
   - d) O(n³)

<details>
<summary>Answer</summary>
**c)** O(n² log n). For each of n anchor points, we sort O(n) angle events.
</details>

4. **How do you test if a circle overlaps an axis-aligned rectangle?**
   - a) Check if the center is inside the rectangle
   - b) Check if any corner is inside the circle
   - c) Find the closest point on the rectangle to the center and compare distance² to r²
   - d) Both a and b

<details>
<summary>Answer</summary>
**c)** Find the closest point by clamping the center to rectangle bounds, then check distance² ≤ r². This single test covers all cases.
</details>

5. **What is the expected time complexity of Welzl's algorithm for the smallest enclosing circle?**
   - a) O(n)
   - b) O(n log n)
   - c) O(n²)
   - d) O(n³)

<details>
<summary>Answer</summary>
**a)** O(n) expected. Despite the recursive structure, randomization gives linear expected time because most points are discarded quickly.
</details>

6. **How many intersection points can two distinct circles have at most?**
   - a) 1
   - b) 2
   - c) 3
   - d) Infinite

<details>
<summary>Answer</summary>
**b)** 2. Two distinct circles can intersect at most at 2 points. They can have 1 (tangent) or 0 (separate/concentric) intersections.
</details>

7. **What defines the optimal circle in the "maximum darts" problem?**
   - a) It always has the center at a point
   - b) It has at least 2 points on its boundary
   - c) It has exactly 3 points on its boundary
   - d) It's always centered at the origin

<details>
<summary>Answer</summary>
**b)** The optimal circle of fixed radius has at least 2 points on its boundary. The angular sweep exploits this by using each point as an anchor on the boundary.
</details>

8. **In the bomb detonation problem, what graph property determines the maximum chain?**
   - a) Strongly connected components
   - b) Largest out-degree
   - c) Largest reachable set from any single node
   - d) Diameter of the graph

<details>
<summary>Answer</summary>
**c)** The problem asks for the maximum number of nodes reachable from any starting node via directed edges i→j if distance(i,j) ≤ rᵢ.
</details>

9. **When does a line not intersect a circle?**
   - a) When the distance from center to line > r
   - b) When the line is horizontal
   - c) When the line passes through the center
   - d) Never

<details>
<summary>Answer</summary>
**a)** A line does not intersect a circle when the perpendicular distance from the center to the line exceeds the radius.
</details>

10. **What is the smallest enclosing circle of three collinear points?**
    - a) A circle with the middle point as center
    - b) A circle using the two farthest points as diameter
    - c) Undefined (infinite radius)
    - d) A circle of radius 0

<details>
<summary>Answer</summary>
**b)** For collinear points, the MEC uses the two farthest points as the diameter of the circle.
</details>

### 🃏 10. FLASHCARDS

1. **Q: What are the five cases of circle-circle intersection?**
   **A:** Separate (d > r₁+r₂), externally tangent (d = r₁+r₂), intersecting (|r₁−r₂| < d < r₁+r₂), internally tangent (d = |r₁−r₂|, d>0), concentric (d=0).

2. **Q: How do you test line-circle intersection?**
   **A:** Compute perpendicular distance from center to line. If dist ≤ r, the line intersects the circle. For exact points, project the center onto the line and offset by ±√(r²−dist²).

3. **Q: What is the angular sweep technique?**
   **A:** Fix one point on the circle boundary, compute angle ranges for all other points, sort enter/exit events, and sweep to track the coverage count. O(n² log n) total.

4. **Q: How does Welzl's algorithm work?**
   **A:** Randomly permute points. Recursively process: if the current point is outside the enclosing circle, recurse with it as a boundary point. The base case uses 0–3 boundary points. Expected O(n).

5. **Q: How do you test circle-rectangle overlap?**
   **A:** Clamp the center coordinates to the rectangle bounds — the result is the closest point. Compare distance² from center to clamped point ≤ r².

6. **Q: What is the chord method for circle-circle intersection?**
   **A:** Compute a = (r₁²−r₂²+d²)/(2d) (distance from C₁ to the chord), h = √(r₁²−a²) (half-chord length). The midpoint is C₁ + (a/d)·(C₂−C₁).

7. **Q: How do you handle angle wrap-around in angular sweep?**
   **A:** Add 2π to all angle events and duplicate them. This lets the sliding window cross the 0/2π boundary seamlessly.

8. **Q: What is the maximum number of intersection points between a line and a circle?**
   **A:** 2 (if the line cuts through the circle), 1 (tangent), or 0 (no intersection).

9. **Q: How many boundary points define the smallest enclosing circle?**
   **A:** At most 3. The MEC is determined by either 2 points (diameter) or 3 points (circumcircle).

10. **Q: What is the complexity of the bomb detonation chain problem?**
    **A:** O(n²) to build the directed graph, then O(n·(n+e)) for BFS from each starting node.

### 📎 10. REFERENCES & FURTHER READING

- 📎 [Wikipedia: Circle–circle intersection](https://en.wikipedia.org/wiki/Circle%E2%80%93circle_intersection) — Formulas for intersection points of two circles.
- 📎 [Wikipedia: Smallest enclosing circle](https://en.wikipedia.org/wiki/Smallest_enclosing_circle) — History and algorithms for the MEC problem.
- 📎 [Wikipedia: Welzl's algorithm](https://en.wikipedia.org/wiki/Welzl%27s_algorithm) — Randomized algorithm for minimum enclosing circle.
- 📎 [CP-Algorithms: Circle intersection](https://cp-algorithms.com/geometry/circle-circle-intersection.html) — Implementation of circle-circle and line-circle intersection.
- 📎 [CP-Algorithms: Minimum enclosing circle](https://cp-algorithms.com/geometry/minimum_enclosing_circle.html) — Welzl's algorithm implementation.
- 📎 [LeetCode: Maximum Number of Darts Inside a Circular Dartboard](https://leetcode.com/problems/maximum-number-of-darts-inside-a-circular-dartboard/) — Problem and angular sweep solution.
- 📎 [LeetCode: Maximum Number of Visible Points](https://leetcode.com/problems/maximum-number-of-visible-points/) — Angular sweep with field-of-view.
- 📎 [LeetCode: Detonate the Maximum Bombs](https://leetcode.com/problems/detonate-the-maximum-bombs/) — Directed graph from circle intersection.
- 📎 [LeetCode: Circle and Rectangle Overlapping](https://leetcode.com/problems/circle-and-rectangle-overlapping/) — Geometry of circle-rectangle intersection.
- 📎 [3Blue1Brown: π visual proof](https://www.youtube.com/watch?v=d-o3eB9sfls) — Beautiful animation connecting circle geometry to π.
## Chapter 11: Polygons — Classification & Area

### 🎯 Learning Objectives
- Define polygons and distinguish convex, concave, and regular polygons
- Derive and apply the Shoelace formula for polygon area
- Determine CW/CCW ordering from signed area
- Check convexity in O(n) via cross product signs
- Test point-in-convex-polygon in O(log n) via binary search
- Test point-in-any-polygon in O(n) via ray casting
- Detect self-intersecting polygons
- Understand triangulation and its DP connection
- Apply Pick's theorem for lattice point counting

### 📖 1. INTRODUCTION

A polygon is the simplest closed shape in computational geometry — connected line segments enclosing a region. From hexagonal honeycomb cells to triangular meshes rendering 3D models, polygons are everywhere. GIS systems store countries as polygons, robotics uses them for collision detection, and pathfinding relies on navigation meshes.

> 📎 [Wikipedia: Polygon](https://en.wikipedia.org/wiki/Polygon)

### 📚 2. CORE CONCEPTS

#### 2.1 Polygon Definition
**Intuition:** A closed figure from connected line segments. Each segment shares endpoints with exactly two others.

**Formal:** An ordered sequence of points $P_0, P_1, \dots, P_{n-1}$ where edges are $(P_i, P_{i+1})$ and $(P_{n-1}, P_0)$ closes it.

**Edge cases:** Degenerate (collinear vertices), self-intersecting, polygons with holes.

```python
from typing import List, Tuple
Point = Tuple[float, float]

def is_polygon(vertices: List[Point]) -> bool:
    if len(vertices) < 3:
        return False
    for i in range(len(vertices)):
        a, b, c = vertices[i], vertices[(i+1)%len(vertices)], vertices[(i+2)%len(vertices)]
        cross = (b[0]-a[0])*(c[1]-b[1]) - (b[1]-a[1])*(c[0]-b[0])
        if abs(cross) > 1e-9:
            return True
    return False
```

#### 2.2 Convex vs Concave
**Intuition:** Convex bulges outward — any line segment between two interior points stays inside. Concave has an indentation (interior angle > 180°).

**Derivation:** Walk edges, compute cross products. All same sign = convex. Sign change = reflex vertex = concave.

**Formula:** $\text{cross}_i = (P_{i+1} - P_i) \times (P_{i+2} - P_{i+1})$. All $\text{cross}_i \geq 0$ (or all $\leq 0$) for convex.

```python
def cross(o: Point, a: Point, b: Point) -> float:
    return (a[0]-o[0])*(b[1]-o[1]) - (a[1]-o[1])*(b[0]-o[0])

def is_convex(vertices: List[Point]) -> bool:
    n, sign = len(vertices), None
    for i in range(n):
        c = cross(vertices[i], vertices[(i+1)%n], vertices[(i+2)%n])
        if abs(c) < 1e-9: continue
        if sign is None: sign = 1 if c > 0 else -1
        elif (c > 0 and sign < 0) or (c < 0 and sign > 0): return False
    return True
```

#### 2.3 Regular Polygons
**Intuition:** All sides equal, all angles equal (equilateral triangle, square, regular pentagon).

**Properties:** Interior angle $(n-2)\times 180^\circ / n$, circumradius $R = s/(2\sin(\pi/n))$, inradius $r = s/(2\tan(\pi/n))$.

**Formula:** $A = \frac{n s^2}{4 \tan(\pi/n)}$

#### 2.4 Shoelace Formula
**Intuition:** Sum cross products of consecutive vertex pairs — like lacing a shoelace.

**Derivation:** From Green's theorem, area is half the sum of determinants:
$$A = \frac{1}{2} \left| \sum_{i=0}^{n-1} (x_i y_{i+1} - x_{i+1} y_i) \right|$$

**Edge cases:** Self-intersecting polygons give algebraic (not geometric) area. CW order gives negative sum.

```python
def polygon_area(vertices: List[Point]) -> float:
    n, area = len(vertices), 0.0
    for i in range(n):
        x1, y1 = vertices[i]
        x2, y2 = vertices[(i+1)%n]
        area += x1 * y2 - x2 * y1
    return abs(area) / 2.0
```

> 📎 [Wikipedia: Shoelace formula](https://en.wikipedia.org/wiki/Shoelace_formula)

#### 2.5 CW vs CCW
**Intuition:** Signed Shoelace sum sign determines ordering.

**Formula:** $\text{signed area} = \frac{1}{2} \sum (x_i y_{i+1} - x_{i+1} y_i)$. Positive → CCW, Negative → CW.

```python
def is_clockwise(vertices: List[Point]) -> bool:
    n, area = len(vertices), 0.0
    for i in range(n):
        area += vertices[i][0]*vertices[(i+1)%n][1] - vertices[(i+1)%n][0]*vertices[i][1]
    return area < 0
```

#### 2.6 Point-in-Convex-Polygon: O(log n)
**Intuition:** Triangulate from vertex 0. Binary search on the fan to find which triangle contains the point.

**Derivation:** For CCW polygon, check if point is left of every edge. Binary search uses the consistent orientation of triangles $(P_0, P_i, P_{i+1})$.

```python
def point_in_convex_polygon(poly: List[Point], pt: Point) -> bool:
    n = len(poly)
    if cross(poly[0], poly[1], pt) < 0 or cross(poly[0], poly[-1], pt) > 0:
        return False
    lo, hi = 1, n - 1
    while hi - lo > 1:
        mid = (lo + hi) // 2
        if cross(poly[0], poly[mid], pt) >= 0: lo = mid
        else: hi = mid
    return cross(poly[lo], poly[hi], pt) >= 0
```

> 📎 [CP-Algorithms: Point in convex polygon](https://cp-algorithms.com/geometry/point-in-convex-polygon.html)

#### 2.7 Point-in-Any-Polygon: Ray Casting (O(n))
**Intuition:** Shoot a horizontal ray rightward, count edge intersections. Odd = inside, even = outside (Jordan curve theorem).

**Edge cases:** Ray through vertex (handle carefully), ray along edge, point on boundary.

```python
def point_in_polygon(poly: List[Point], pt: Point) -> bool:
    inside = False
    for i in range(len(poly)):
        x1, y1 = poly[i]
        x2, y2 = poly[(i+1)%len(poly)]
        if ((y1 > pt[1]) != (y2 > pt[1])):
            x_intersect = x1 + (x2-x1)*(pt[1]-y1)/(y2-y1)
            if pt[0] < x_intersect: inside = not inside
    return inside
```

> 📎 [Wikipedia: Point in polygon](https://en.wikipedia.org/wiki/Point_in_polygon)

#### 2.8 Self-Intersecting Polygons
**Intuition:** Edges cross each other (e.g., bow-tie shape). Also called complex polygons.

**Detection:** Check all non-adjacent edge pairs for intersection — O(n²) naive.

```python
def segments_intersect(p1, p2, q1, q2) -> bool:
    d1, d2 = cross(p1, p2, q1), cross(p1, p2, q2)
    d3, d4 = cross(q1, q2, p1), cross(q1, q2, p2)
    return (d1 > 0) != (d2 > 0) and (d3 > 0) != (d4 > 0)

def is_self_intersecting(v: List[Point]) -> bool:
    n = len(v)
    for i in range(n):
        for j in range(i+2, n):
            if i == 0 and j == n-1: continue
            if segments_intersect(v[i], v[(i+1)%n], v[j], v[(j+1)%n]):
                return True
    return False
```

#### 2.9 Polygon Triangulation
**Intuition:** Partition an n-vertex polygon into $n-2$ non-overlapping triangles. Essential for rendering and DP.

**Ear clipping:** Find an "ear" (triangle of three consecutive vertices inside the polygon), clip it, repeat.

**Connection to DP:** Minimum weight triangulation uses DP[i][j] = min cost for sub-polygon from i to j.

> 📎 [Wikipedia: Polygon triangulation](https://en.wikipedia.org/wiki/Polygon_triangulation)

#### 2.10 Pick's Theorem
**Intuition:** For lattice-point polygons, area relates to interior and boundary lattice point counts.

**Formula:** $A = I + \frac{B}{2} - 1$ where I = interior lattice points, B = boundary lattice points.

```python
import math
def count_boundary_points(vertices: List[Point]) -> int:
    B = 0
    for i in range(len(vertices)):
        dx = abs(int(vertices[(i+1)%len(vertices)][0]) - int(vertices[i][0]))
        dy = abs(int(vertices[(i+1)%len(vertices)][1]) - int(vertices[i][1]))
        B += math.gcd(dx, dy)
    return B

def interior_lattice_points(vertices: List[Point]) -> int:
    A = polygon_area(vertices)
    B = count_boundary_points(vertices)
    return int(A + 1 - B // 2)
```

> 📎 [Wikipedia: Pick's theorem](https://en.wikipedia.org/wiki/Pick%27s_theorem)

### 🔍 3. PROBLEM RECOGNITION

**Keywords:** polygon, convex, concave, self-intersecting, triangulation, area, lattice points, hull, point inside.

**Interview framing:** "Given points, determine if convex polygon", "Check if point lies inside polygon", "Compute area", "Minimum score to triangulate", "Count integer points inside".

**Hidden indicators:** "Fencing/enclosing" → convex hull. "Partition into triangles" → triangulation DP. "Integer coordinates" → Pick's theorem.

### 🧩 4. PATTERN ANALYSIS

**Pattern 1: Area Computation** — O(n). Shoelace formula. Take absolute value for area.

**Pattern 2: Point Containment** — O(log n) convex (binary search on triangles), O(n) general (ray casting).

**Pattern 3: Convexity Check** — O(n). All cross products must share the same sign.

**Pattern 4: Triangulation DP** — O(n³). DP[i][j] over sub-polygons defined by two vertices.

**Pattern 5: Lattice Point Counting** — O(n). Pick's theorem: A = I + B/2 - 1. Use GCD for B.

### ⚡ 5. BRUTE FORCE → OPTIMIZED

#### Problem 1: Minimum Score Triangulation of Polygon

**Intuition:** Minimize sum of products of vertex values in each triangle across a triangulation.

**Brute Force (exponential):** Recursively try all triangulations.

```python
from functools import lru_cache
def min_score_brute(values: List[int]) -> int:
    @lru_cache(None)
    def dfs(i, j):
        if j - i < 2: return 0
        res = float('inf')
        for k in range(i+1, j):
            res = min(res, dfs(i,k) + dfs(k,j) + values[i]*values[j]*values[k])
        return res
    return dfs(0, len(values)-1)
```

**Why Slow:** O(2ⁿ) — enumerates all triangulations recursively.

**Optimization (DP):** Bottom-up DP by increasing gap length. DP[i][j] = min cost for polygon from i to j.

```python
def min_score_triangulation(values: List[int]) -> int:
    n = len(values)
    dp = [[0]*n for _ in range(n)]
    for length in range(2, n):
        for i in range(n - length):
            j = i + length
            dp[i][j] = float('inf')
            for k in range(i+1, j):
                dp[i][j] = min(dp[i][j], dp[i][k] + dp[k][j] + values[i]*values[j]*values[k])
    return dp[0][n-1]
```

**Edge Cases:** n < 3 → 0. Values can be zero or negative.

**C++/Java:** Same O(n³) DP. C++: `vector<vector<int>> dp(n, vector<int>(n, 0))`. Java: `int[][] dp = new int[n][n]`.

#### Problem 2: Erect the Fence (Convex Hull)

**Intuition:** Find the smallest convex polygon enclosing all points.

**Brute Force (O(n³)):** For each pair, check if all other points are on one side. O(n³).

**Optimization (Monotone Chain, O(n log n)):**
1. Sort points by (x, y). 2. Build lower hull (left turns only). 3. Build upper hull. 4. Concatenate.

```python
def convex_hull(points: List[Point]) -> List[Point]:
    pts = sorted(set(points))
    if len(pts) < 3: return pts
    lower = []
    for p in pts:
        while len(lower) >= 2 and cross(lower[-2], lower[-1], p) <= 0: lower.pop()
        lower.append(p)
    upper = []
    for p in reversed(pts):
        while len(upper) >= 2 and cross(upper[-2], upper[-1], p) <= 0: upper.pop()
        upper.append(p)
    return lower[:-1] + upper[:-1]
```

**Edge Cases:** All collinear → return endpoints. Duplicates. Single point.

**C++:** Same monotone chain with `vector<vector<int>>` and `sort(trees.begin(), trees.end())`.

**Java:** `Arrays.sort(trees, (a,b)->a[0]==b[0]?a[1]-b[1]:a[0]-b[0])` then build lower/upper with `ArrayList<int[]>`.

### 🏆 6. CURATED PROBLEMS

| # | Problem | Platform | Difficulty | URL | Concepts |
|---|---|---|---|---|---|
| 1 | Convex Polygon | LeetCode | Medium | [Link](https://leetcode.com/problems/convex-polygon/) | Convexity check |
| 2 | Erect the Fence | LeetCode | Hard | [Link](https://leetcode.com/problems/erect-the-fence/) | Convex hull |
| 3 | Min Score Triangulation | LeetCode | Medium | [Link](https://leetcode.com/problems/minimum-score-triangulation-of-polygon/) | Triangulation DP |
| 4 | Self Crossing | LeetCode | Hard | [Link](https://leetcode.com/problems/self-crossing/) | Self-intersection |
| 5 | Polygon Area | AOJ | Easy | [Link](https://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=ALDS1_7_D) | Shoelace formula |
| 6 | Point in Polygon | CSES | Easy | [Link](https://cses.fi/problemset/task/2192) | Ray casting |
| 7 | Polygon Lattice Points | CSES | Medium | [Link](https://cses.fi/problemset/task/2193) | Pick's theorem |

### ✏️ 7. PRACTICE PROBLEMS

**Problem 1:** Check convex polygon

```python
def check_convex(v: List[Point]) -> bool:
    pos, neg = 0, 0
    for i in range(len(v)):
        c = cross(v[i], v[(i+1)%len(v)], v[(i+2)%len(v)])
        if c > 0: pos += 1
        elif c < 0: neg += 1
        if pos and neg: return False
    return True
```

**Problem 2:** Count lattice points (Pick's theorem)

```python
def lattice_points(v: List[Point]):
    B = sum(math.gcd(abs(int(v[(i+1)%len(v)][0])-int(v[i][0])), abs(int(v[(i+1)%len(v)][1])-int(v[i][1]))) for i in range(len(v)))
    I = int(polygon_area(v)) - B // 2 + 1
    return int(polygon_area(v)), B, I
```

**Problem 3:** Point in convex polygon binary search

```python
def pip_convex(poly: List[Point], pt: Point) -> bool:
    n = len(poly)
    if cross(poly[0], poly[1], pt) < 0 or cross(poly[0], poly[-1], pt) > 0: return False
    lo, hi = 1, n-1
    while hi - lo > 1:
        mid = (lo+hi)//2
        if cross(poly[0], poly[mid], pt) >= 0: lo = mid
        else: hi = mid
    return cross(poly[lo], poly[hi], pt) >= 0
```

**Problem 4:** Ear clipping triangulation

```python
def ear_clip(v: List[Point]):
    idx = list(range(len(v)))
    tris = []
    while len(idx) > 3:
        for i in range(len(idx)):
            a, b, c = idx[i-1], idx[i], idx[(i+1)%len(idx)]
            if cross(v[a], v[b], v[c]) > 0:
                # Check no other vertex inside triangle
                ear = True
                for j in idx:
                    if j in (a,b,c): continue
                    if point_in_triangle(v[j], v[a], v[b], v[c]): ear = False; break
                if ear:
                    tris.append((a,b,c))
                    idx.pop(i)
                    break
    tris.append((idx[0], idx[1], idx[2]))
    return tris
```

**Problem 5:** Determine CW/CCW orientation

```python
def orientation(v: List[Point]) -> str:
    s = sum(v[i][0]*v[(i+1)%len(v)][1] - v[(i+1)%len(v)][0]*v[i][1] for i in range(len(v)))
    return "CCW" if s > 1e-9 else "CW" if s < -1e-9 else "Degenerate"
```

### 📝 8. CHAPTER QUIZ

1. **Minimum vertices for a simple polygon?** A) 2 B) 3 C) 4 D) 1
   <details><summary>Answer</summary>**B) 3**</details>

2. **All interior angles < 180° means polygon is:** A) Concave B) Regular C) Convex D) Complex
   <details><summary>Answer</summary>**C) Convex**</details>

3. **Shoelace formula complexity:** A) O(n²) B) O(n) C) O(log n) D) O(n log n)
   <details><summary>Answer</summary>**B) O(n)**</details>

4. **Negative signed Shoelace sum means vertices are:** A) CCW B) CW C) Random D) Unknown
   <details><summary>Answer</summary>**B) CW**</details>

5. **Point-in-convex-polygon uses which technique for O(log n)?** A) Binary search on triangles B) Linear scan C) Dijkstra D) Union find
   <details><summary>Answer</summary>**A) Binary search on triangles**</details>

6. **Ray casting: odd intersections means:** A) Outside B) Inside C) On boundary D) Error
   <details><summary>Answer</summary>**B) Inside**</details>

7. **Pick's theorem: A = I + B/2 - 1. I is:** A) Interior lattice points B) Boundary points C) Inradius D) Isoperimetric
   <details><summary>Answer</summary>**A) Interior lattice points**</details>

8. **Triangulation of n-vertex polygon produces how many triangles?** A) n-1 B) n-2 C) n/2 D) 2n-3
   <details><summary>Answer</summary>**B) n-2**</details>

9. **Self-intersection checks which edges?** A) Adjacent B) Non-adjacent C) All D) First/last
   <details><summary>Answer</summary>**B) Non-adjacent**</details>

10. **Monotone chain complexity:** A) O(n²) B) O(n log n) C) O(n) D) O(n³)
    <details><summary>Answer</summary>**B) O(n log n)** — sorting dominates</details>

### 🃏 9. FLASHCARDS

1. **Shoelace formula** — $A = \frac{1}{2} |\sum (x_i y_{i+1} - x_{i+1} y_i)|$
2. **Convexity check** — All cross product signs must be the same
3. **CW vs CCW** — Signed area: positive = CCW, negative = CW
4. **Ray casting** — Odd intersections = inside, even = outside
5. **Point-in-convex O(log n)** — Binary search on triangle fan from vertex 0
6. **Pick's theorem** — $A = I + B/2 - 1$
7. **Triangulation triangle count** — n-2 triangles
8. **Self-intersection detection** — Check non-adjacent edge pairs
9. **Monotone chain** — Sort + lower hull + upper hull
10. **Ear in triangulation** — 3 consecutive vertices forming an interior triangle

### 📎 10. REFERENCES & FURTHER READING

- 📎 [Wikipedia: Polygon](https://en.wikipedia.org/wiki/Polygon)
- 📎 [Wikipedia: Shoelace formula](https://en.wikipedia.org/wiki/Shoelace_formula)
- 📎 [Wikipedia: Point in polygon](https://en.wikipedia.org/wiki/Point_in_polygon)
- 📎 [Wikipedia: Pick's theorem](https://en.wikipedia.org/wiki/Pick%27s_theorem)
- 📎 [Wikipedia: Polygon triangulation](https://en.wikipedia.org/wiki/Polygon_triangulation)
- 📎 [CP-Algorithms: Point in convex polygon](https://cp-algorithms.com/geometry/point-in-convex-polygon.html)
- 📎 [CP-Algorithms: Convex hull](https://cp-algorithms.com/geometry/convex-hull.html)
## Chapter 12: Grid-Based Shapes & Flood Fill

### 🎯 Learning Objectives
- Represent and navigate 2D grids with (r, c) coordinates
- Distinguish 4-directional vs 8-directional neighbor traversal
- Implement BFS/DFS for connected component labeling
- Compute shape perimeter and bounding box on a grid
- Calculate 3D projection area and surface area
- Count patterns: L-shapes, squares, rectangles in grids
- Apply flood fill for region coloring
- Normalize shapes by translating to origin
- Find largest connected component in a binary matrix

### 📖 1. INTRODUCTION

Grids are the discrete canvas of computational geometry — a spreadsheet, chessboard, or pixelated image. When a paint program fills a region, it uses flood fill. When a robot maps a warehouse into traversable cells, it's a grid. When you count islands in satellite imagery, you're finding connected components. Grid algorithms power image processing, game development, and robotics.

> 📎 [Wikipedia: Flood fill](https://en.wikipedia.org/wiki/Flood_fill)

### 📚 2. CORE CONCEPTS

#### 2.1 2D Grid Representation
**Intuition:** A matrix of rows (r) and columns (c). r increases downward, c increases rightward.

**Convention:** `grid[r][c]` — r is vertical index, c is horizontal index.

```python
from typing import List, Tuple
from collections import deque
Grid = List[List[int]]

def in_bounds(grid: Grid, r: int, c: int) -> bool:
    return 0 <= r < len(grid) and 0 <= c < len(grid[0])
```

#### 2.2 4-Directional vs 8-Directional Neighbors
**Intuition:** 4-dir = up/down/left/right (edge-sharing). 8-dir also includes diagonals.

**Formula:**
- 4-dir: $\{(\pm 1, 0), (0, \pm 1)\}$
- 8-dir: 4-dir plus $\{(\pm 1, \pm 1)\}$

```python
DIRS_4 = [(-1,0),(1,0),(0,-1),(0,1)]
DIRS_8 = [(-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1)]

def neighbors_4(grid: Grid, r: int, c: int) -> List[Tuple[int,int]]:
    return [(r+dr, c+dc) for dr,dc in DIRS_4 if in_bounds(grid, r+dr, c+dc)]
```

#### 2.3 BFS on Grid for Connected Components
**Intuition:** BFS expands like a wave from a seed cell. All reachable cells form a component.

**Edge cases:** Empty grid, all blocked, single cell.

```python
def bfs_component(grid: Grid, sr: int, sc: int, vis: List[List[bool]]) -> int:
    q = deque([(sr, sc)])
    vis[sr][sc] = True
    size = 0
    while q:
        r, c = q.popleft()
        size += 1
        for nr, nc in neighbors_4(grid, r, c):
            if grid[nr][nc] and not vis[nr][nc]:
                vis[nr][nc] = True
                q.append((nr, nc))
    return size

def count_components(grid: Grid) -> int:
    R, C = len(grid), len(grid[0])
    vis = [[False]*C for _ in range(R)]
    cnt = 0
    for r in range(R):
        for c in range(C):
            if grid[r][c] and not vis[r][c]:
                bfs_component(grid, r, c, vis)
                cnt += 1
    return cnt
```

> 📎 [CP-Algorithms: BFS on grid](https://cp-algorithms.com/graph/breadth-first-search.html)

#### 2.4 DFS on Grid for Connected Components
**Intuition:** Dive deep along a path, backtrack when stuck. Uses recursion or explicit stack.

**Edge cases:** Deep recursion may overflow stack — prefer iterative or set recursionlimit.

```python
def dfs_component(grid: Grid, r: int, c: int, vis: List[List[bool]]) -> int:
    if not in_bounds(grid, r, c) or not grid[r][c] or vis[r][c]: return 0
    vis[r][c] = True
    return 1 + sum(dfs_component(grid, r+dr, c+dc, vis) for dr,dc in DIRS_4)
```

#### 2.5 Shape Perimeter on a Grid
**Intuition:** Each land cell contributes 4 minus the number of land neighbors (shared edges are internal).

```python
def grid_perimeter(grid: Grid) -> int:
    R, C = len(grid), len(grid[0])
    perim = 0
    for r in range(R):
        for c in range(C):
            if grid[r][c]:
                cell = 4
                for dr,dc in DIRS_4:
                    nr, nc = r+dr, c+dc
                    if in_bounds(grid, nr, nc) and grid[nr][nc]: cell -= 1
                perim += cell
    return perim
```

#### 2.6 Bounding Box of a Shape
**Intuition:** Smallest axis-aligned rectangle containing all component cells.

```python
def bounding_box(comp: List[Tuple[int,int]]):
    min_r = min(r for r,_ in comp); max_r = max(r for r,_ in comp)
    min_c = min(c for _,c in comp); max_c = max(c for _,c in comp)
    return min_r, max_r, min_c, max_c
```

#### 2.7 3D Projection Area
**Intuition:** Grid[r][c] = height of cube stack. Compute area when viewed from top, front, side.

**Derivation:**
- **Top:** Count cells with height > 0.
- **Front:** For each column, max height across rows.
- **Side:** For each row, max height across columns.

**Formula:** $\text{Projection} = \text{top} + \text{front} + \text{side}$

```python
def projection_area(grid: Grid) -> int:
    n, m = len(grid), len(grid[0])
    top = sum(1 for r in range(n) for c in range(m) if grid[r][c])
    front = sum(max(grid[r][c] for r in range(n)) for c in range(m))
    side = sum(max(grid[r][c] for c in range(m)) for r in range(n))
    return top + front + side
```

#### 2.8 3D Surface Area
**Intuition:** Each cube contributes 6. Subtract 2 for each shared face (vertical stacking + adjacent cells).

```python
def surface_area(grid: Grid) -> int:
    n, m = len(grid), len(grid[0])
    area = 0
    for r in range(n):
        for c in range(m):
            h = grid[r][c]
            if not h: continue
            area += 4*h + 2
            if r > 0: area -= 2*min(h, grid[r-1][c])
            if c > 0: area -= 2*min(h, grid[r][c-1])
    return area
```

#### 2.9 Counting Patterns: Squares
**Intuition:** Count squares using DP — each cell as bottom-right corner.

**Formula:** $\text{DP}[i][j] = \min(\text{DP}[i-1][j], \text{DP}[i][j-1], \text{DP}[i-1][j-1]) + 1$ if $\text{grid}[i][j] = 1$

```python
def count_squares(grid: Grid) -> int:
    n, m = len(grid), len(grid[0])
    dp = [[0]*m for _ in range(n)]
    total = 0
    for r in range(n):
        for c in range(m):
            if grid[r][c]:
                if r==0 or c==0: dp[r][c] = 1
                else: dp[r][c] = min(dp[r-1][c], dp[r][c-1], dp[r-1][c-1]) + 1
                total += dp[r][c]
    return total
```

#### 2.10 Flood Fill
**Intuition:** Paint bucket — replace all connected cells of a target color from a seed with a new color.

```python
def flood_fill(grid: List[List[int]], sr: int, sc: int, new_c: int) -> List[List[int]]:
    old_c = grid[sr][sc]
    if old_c == new_c: return grid
    R, C = len(grid), len(grid[0])
    q = deque([(sr, sc)])
    grid[sr][sc] = new_c
    while q:
        r, c = q.popleft()
        for dr,dc in DIRS_4:
            nr, nc = r+dr, c+dc
            if in_bounds(grid, nr, nc) and grid[nr][nc] == old_c:
                grid[nr][nc] = new_c
                q.append((nr, nc))
    return grid
```

#### 2.11 Shape Normalization
**Intuition:** Translate component so min(r,c) = (0,0) — enables shape comparison independent of position.

```python
def normalize(comp: List[Tuple[int,int]]) -> set:
    min_r = min(r for r,_ in comp); min_c = min(c for _,c in comp)
    return {(r-min_r, c-min_c) for r,c in comp}
```

#### 2.12 Largest Connected Component
**Intuition:** BFS/DFS from each unvisited 1-cell, track maximum size.

```python
def largest_component(grid: Grid) -> int:
    R, C = len(grid), len(grid[0])
    vis = [[False]*C for _ in range(R)]
    max_sz = 0
    for r in range(R):
        for c in range(C):
            if grid[r][c] and not vis[r][c]:
                q = deque([(r,c)]); vis[r][c] = True; sz = 0
                while q:
                    cr, cc = q.popleft(); sz += 1
                    for dr,dc in DIRS_4:
                        nr, nc = cr+dr, cc+dc
                        if in_bounds(grid,nr,nc) and grid[nr][nc] and not vis[nr][nc]:
                            vis[nr][nc] = True; q.append((nr,nc))
                max_sz = max(max_sz, sz)
    return max_sz
```

### 🔍 3. PROBLEM RECOGNITION

**Keywords:** grid, matrix, island, flood fill, connected components, perimeter, projection, surface, neighbor.

**Interview framing:** "Largest connected region", "perimeter of a shape", "replace connected cells of a color", "count islands", "3D projection", "unique shapes".

**Hidden indicators:** "Pixels/colors" → flood fill. "Islands/land/water" → connectivity. "Enclaves/border" → boundary-connected BFS. "Tetrominoes/shapes" → normalization.

### 🧩 4. PATTERN ANALYSIS

**Pattern 1: Component Counting** — O(R×C). DFS/BFS from each unvisited cell of target type.

**Pattern 2: Component Size** — O(R×C). Track size during BFS/DFS, keep running max.

**Pattern 3: Boundary/Perimeter** — O(R×C). Perimeter = sum(4 - land_neighbors). Enclaves: BFS from boundary cells.

**Pattern 4: 3D Projection/Surface** — O(R×C). Top = non-zero count. Front = sum column maxima. Side = sum row maxima. Surface = 4h+2 minus shared faces.

**Pattern 5: Shape Normalization** — O(N). Translate to origin, compare relative coordinates.

### ⚡ 5. BRUTE FORCE → OPTIMIZED

#### Problem 1: Max Area of Island

**Intuition:** Find largest connected component of 1s.

**Brute Force (already optimal — O(R×C)):** Visit each 1-cell, BFS to compute component size.

```python
def max_area_brute(grid: Grid) -> int:
    R, C = len(grid), len(grid[0])
    vis = [[False]*C for _ in range(R)]
    best = 0
    for r in range(R):
        for c in range(C):
            if grid[r][c] and not vis[r][c]:
                q = deque([(r,c)]); vis[r][c] = True; sz = 0
                while q:
                    cr, cc = q.popleft(); sz += 1
                    for dr,dc in DIRS_4:
                        nr,nc = cr+dr, cc+dc
                        if in_bounds(grid,nr,nc) and grid[nr][nc] and not vis[nr][nc]:
                            vis[nr][nc] = True; q.append((nr,nc))
                best = max(best, sz)
    return best
```

**Optimization:** Use in-place modification (mark grid[r][c] = 0) to eliminate visited array — saves O(R×C) memory.

```python
def max_area_island(grid: Grid) -> int:
    R, C = len(grid), len(grid[0]); best = 0
    for r in range(R):
        for c in range(C):
            if grid[r][c]:
                stack = [(r,c)]; grid[r][c] = 0; sz = 0
                while stack:
                    cr, cc = stack.pop(); sz += 1
                    for dr,dc in DIRS_4:
                        nr,nc = cr+dr, cc+dc
                        if in_bounds(grid,nr,nc) and grid[nr][nc]:
                            grid[nr][nc] = 0; stack.append((nr,nc))
                best = max(best, sz)
    return best
```

**Edge Cases:** Empty grid, all zeros, all ones, single cell.

**C++:**
```cpp
int maxAreaOfIsland(vector<vector<int>>& grid) {
    int R = grid.size(), C = grid[0].size(), best = 0;
    int dirs[4][2] = {{-1,0},{1,0},{0,-1},{0,1}};
    for (int r=0; r<R; ++r) for (int c=0; c<C; ++c) if (grid[r][c]) {
        stack<pair<int,int>> st; st.push({r,c}); grid[r][c]=0; int sz=0;
        while (!st.empty()) {
            auto [cr,cc] = st.top(); st.pop(); sz++;
            for (auto& d : dirs) {
                int nr=cr+d[0], nc=cc+d[1];
                if (nr>=0 && nr<R && nc>=0 && nc<C && grid[nr][nc])
                    { grid[nr][nc]=0; st.push({nr,nc}); }
            }
        }
        best = max(best, sz);
    }
    return best;
}
```

**Java:**
```java
public int maxAreaOfIsland(int[][] grid) {
    int R = grid.length, C = grid[0].length, best = 0;
    int[][] dirs = {{-1,0},{1,0},{0,-1},{0,1}};
    for (int r=0; r<R; r++) for (int c=0; c<C; c++) if (grid[r][c]==1) {
        Deque<int[]> st = new ArrayDeque<>(); st.push(new int[]{r,c}); grid[r][c]=0; int sz=0;
        while (!st.isEmpty()) {
            int[] cur = st.pop(); sz++;
            for (int[] d : dirs) {
                int nr = cur[0]+d[0], nc = cur[1]+d[1];
                if (nr>=0 && nr<R && nc>=0 && nc<C && grid[nr][nc]==1)
                    { grid[nr][nc]=0; st.push(new int[]{nr,nc}); }
            }
        }
        best = Math.max(best, sz);
    }
    return best;
}
```

#### Problem 2: Surface Area of 3D Shapes

**Intuition:** Given a grid of heights, compute total surface area of stacked cubes.

**Brute Force (O(R×C×maxH)):** Check each individual cube's 6 faces.

**Optimization (O(R×C)):** Each stack contributes 4h+2. Subtract 2 for each shared face with left and top neighbors.

```python
def surface_area_opt(grid: Grid) -> int:
    n, m = len(grid), len(grid[0]); area = 0
    for r in range(n):
        for c in range(m):
            h = grid[r][c]
            if not h: continue
            area += 4*h + 2
            if r > 0: area -= 2*min(h, grid[r-1][c])
            if c > 0: area -= 2*min(h, grid[r][c-1])
    return area
```

**C++:**
```cpp
int surfaceArea(vector<vector<int>>& grid) {
    int n = grid.size(), area = 0;
    for (int r=0; r<n; ++r) for (int c=0; c<n; ++c) {
        int h = grid[r][c]; if (!h) continue;
        area += 4*h + 2;
        if (r) area -= 2*min(h, grid[r-1][c]);
        if (c) area -= 2*min(h, grid[r][c-1]);
    }
    return area;
}
```

**Java:**
```java
public int surfaceArea(int[][] grid) {
    int n = grid.length, area = 0;
    for (int r=0; r<n; r++) for (int c=0; c<n; c++) {
        int h = grid[r][c]; if (h==0) continue;
        area += 4*h + 2;
        if (r>0) area -= 2*Math.min(h, grid[r-1][c]);
        if (c>0) area -= 2*Math.min(h, grid[r][c-1]);
    }
    return area;
}
```

**Edge Cases:** Zero-height cells, single cell, uniform heights.

### 🏆 6. CURATED PROBLEMS

| # | Problem | Platform | Difficulty | URL | Concepts |
|---|---|---|---|---|---|
| 1 | Max Area of Island | LeetCode | Medium | [Link](https://leetcode.com/problems/max-area-of-island/) | DFS/BFS, components |
| 2 | Surface Area of 3D Shapes | LeetCode | Easy | [Link](https://leetcode.com/problems/surface-area-of-3d-shapes/) | Grid surface area |
| 3 | Projection Area of 3D Shapes | LeetCode | Easy | [Link](https://leetcode.com/problems/projection-area-of-3d-shapes/) | Grid projection |
| 4 | Flood Fill | LeetCode | Easy | [Link](https://leetcode.com/problems/flood-fill/) | BFS/DFS, painting |
| 5 | Number of Enclaves | LeetCode | Medium | [Link](https://leetcode.com/problems/number-of-enclaves/) | Boundary BFS |
| 6 | Distinct Islands | LeetCode | Medium | [Link](https://leetcode.com/problems/number-of-distinct-islands/) | Shape normalization |
| 7 | Island Perimeter | LeetCode | Easy | [Link](https://leetcode.com/problems/island-perimeter/) | Grid perimeter |
| 8 | L-Shapes | Codeforces | 1700 | [Link](https://codeforces.com/problemset/problem/1750/C) | Pattern counting |
| 9 | Vlad and Shapes | Codeforces | 1500 | [Link](https://codeforces.com/problemset/problem/1980/C) | Shape recognition |
| 10 | Count Sub-islands | LeetCode | Medium | [Link](https://leetcode.com/problems/count-sub-islands/) | Component matching |

### ✏️ 7. PRACTICE PROBLEMS

**Problem 1:** Number of Enclaves — count land cells not reaching boundary.

```python
def num_enclaves(grid: Grid) -> int:
    R, C = len(grid), len(grid[0])
    def bfs(r,c):
        q = deque([(r,c)]); grid[r][c]=0
        while q:
            cr,cc = q.popleft()
            for dr,dc in DIRS_4:
                nr,nc = cr+dr, cc+dc
                if in_bounds(grid,nr,nc) and grid[nr][nc]: grid[nr][nc]=0; q.append((nr,nc))
    for r in range(R):
        for c in [0,C-1]:
            if grid[r][c]: bfs(r,c)
    for c in range(C):
        for r in [0,R-1]:
            if grid[r][c]: bfs(r,c)
    return sum(sum(row) for row in grid)
```

**Problem 2:** Count distinct islands (shape-normalized).

```python
def num_distinct_islands(grid: Grid) -> int:
    R, C = len(grid), len(grid[0]); shapes = set()
    for r in range(R):
        for c in range(C):
            if grid[r][c]:
                cells = []; stack = [(r,c)]; grid[r][c]=0
                while stack:
                    cr,cc = stack.pop(); cells.append((cr,cc))
                    for dr,dc in DIRS_4:
                        nr,nc = cr+dr, cc+dc
                        if in_bounds(grid,nr,nc) and grid[nr][nc]: grid[nr][nc]=0; stack.append((nr,nc))
                min_r = min(x for x,_ in cells); min_c = min(y for _,y in cells)
                shapes.add(tuple(sorted((x-min_r, y-min_c) for x,y in cells)))
    return len(shapes)
```

**Problem 3:** Island perimeter.

```python
def island_perimeter(grid: Grid) -> int:
    R, C = len(grid), len(grid[0]); perim = 0
    for r in range(R):
        for c in range(C):
            if grid[r][c]:
                for dr,dc in DIRS_4:
                    nr,nc = r+dr, c+dc
                    if not in_bounds(grid,nr,nc) or not grid[nr][nc]: perim += 1
    return perim
```

**Problem 4:** Count sub-islands (islands in grid2 fully inside grid1).

```python
def count_sub_islands(grid1: Grid, grid2: Grid) -> int:
    R, C = len(grid1), len(grid1[0]); cnt = 0
    for r in range(R):
        for c in range(C):
            if grid2[r][c]:
                ok = True; stack = [(r,c)]; grid2[r][c]=0
                while stack:
                    cr,cc = stack.pop()
                    if not grid1[cr][cc]: ok = False
                    for dr,dc in DIRS_4:
                        nr,nc = cr+dr, cc+dc
                        if in_bounds(grid2,nr,nc) and grid2[nr][nc]: grid2[nr][nc]=0; stack.append((nr,nc))
                if ok: cnt += 1
    return cnt
```

**Problem 5:** Count squares in binary grid.

```python
def count_squares(grid: Grid) -> int:
    n,m = len(grid), len(grid[0])
    dp = [[0]*m for _ in range(n)]; total = 0
    for r in range(n):
        for c in range(m):
            if grid[r][c]:
                if r==0 or c==0: dp[r][c]=1
                else: dp[r][c]=min(dp[r-1][c], dp[r][c-1], dp[r-1][c-1])+1
                total += dp[r][c]
    return total
```

### 📝 8. CHAPTER QUIZ

1. **Grid coordinates (r,c) mean:** A) (col,row) B) (row,col) C) (x,y) D) (w,h)
   <details><summary>Answer</summary>**B) (row, col)**</details>

2. **8-directional connectivity has how many neighbors?** A) 4 B) 6 C) 8 D) 9
   <details><summary>Answer</summary>**C) 8**</details>

3. **Flood fill uses which algorithm?** A) Binary search B) BFS/DFS C) DP D) Union find
   <details><summary>Answer</summary>**B) BFS/DFS**</details>

4. **Each land cell contributes ___ to perimeter minus land neighbors:** A) 1 B) 2 C) 4 D) 6
   <details><summary>Answer</summary>**C) 4**</details>

5. **Top projection area = count of:** A) Sum of heights B) Non-zero cells C) Max height D) Row maxima
   <details><summary>Answer</summary>**B) Non-zero cells**</details>

6. **Surface area formula: 4h+2 minus:** A) 1 per neighbor B) 2 per shared face C) 4 per neighbor D) h per neighbor
   <details><summary>Answer</summary>**B) 2 per shared face**</details>

7. **DP for counting squares uses:** A) dp[i-1][j]+dp[i][j-1] B) min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1])+1 C) max(dp[i-1][j],dp[i][j-1]) D) dp[i-1][j]+dp[i][j-1]-dp[i-1][j-1]+1
   <details><summary>Answer</summary>**B) min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1])+1**</details>

8. **Shape normalization translates so min(r,c) =:** A) (0,0) B) (1,1) C) center D) max coordinate
   <details><summary>Answer</summary>**A) (0,0)**</details>

9. **Enclaves are cells that:** A) Touch boundary B) Cannot reach boundary C) Are water D) Are diagonal
   <details><summary>Answer</summary>**B) Cannot reach boundary**</details>

10. **Time for largest component in R×C grid:** A) O(RC log RC) B) O(R²C²) C) O(RC) D) O(log RC)
    <details><summary>Answer</summary>**C) O(RC)** — each cell visited once</details>

### 🃏 9. FLASHCARDS

1. **4-directional offsets** — (-1,0),(1,0),(0,-1),(0,1)
2. **8-directional offsets** — 4-dir + (-1,-1),(-1,1),(1,-1),(1,1)
3. **Flood fill complexity** — O(R×C)
4. **Grid perimeter** — Each land cell: 4 - land_neighbors
5. **3D projection** — Top (non-zero count) + Front (sum column max) + Side (sum row max)
6. **3D surface area** — 4h+2 minus 2 per shared face (left + up)
7. **Square-counting DP** — min(left, up, diag) + 1
8. **Shape normalization** — Translate so min(r)=0, min(c)=0
9. **In-bounds check** — 0 ≤ r < rows and 0 ≤ c < cols
10. **Enclaves algorithm** — BFS from boundary, count remaining 1s

### 📎 10. REFERENCES & FURTHER READING

- 📎 [Wikipedia: Flood fill](https://en.wikipedia.org/wiki/Flood_fill)
- 📎 [Wikipedia: Connected components](https://en.wikipedia.org/wiki/Connected_component_(graph_theory))
- 📎 [CP-Algorithms: BFS on grid](https://cp-algorithms.com/graph/breadth-first-search.html)
- 📎 [Khan Academy: Grid basics](https://www.khanacademy.org/computing/computer-science/algorithms)
- 📎 [LeetCode: Max Area of Island](https://leetcode.com/problems/max-area-of-island/)
- 📎 [LeetCode: Flood Fill](https://leetcode.com/problems/flood-fill/)
- 📎 [LeetCode: Surface Area of 3D Shapes](https://leetcode.com/problems/surface-area-of-3d-shapes/)
- 📎 [LeetCode: Number of Enclaves](https://leetcode.com/problems/number-of-enclaves/)
## Chapter 13: Shape Matching — Rotation & Translation

### 🎯 Learning Objectives

By the end of this chapter, you will be able to:
- Define shape equivalence under translation, rotation, and reflection
- Normalize shapes by translating them to a canonical position
- Derive and apply the 90° clockwise rotation formula on a grid
- Generate all 4 rotations and the mirror of any shape
- Compare shapes using normalized frozensets of coordinates
- Detect symmetry in grids (mirror, rotation)
- Recognize grid-convex shapes
- Complete rectangles from partial grid information

### 📖 1. INTRODUCTION

What does it mean for two shapes to be "the same"? If you cut a triangle out of paper, you can slide it across the table (translation), spin it around (rotation), or flip it over (reflection) — and it's still the same triangle. In competitive programming, we encounter grid-based shapes where we must decide if one set of filled cells can be transformed into another using these rigid motions.

> 📎 [AtCoder ABC218 Editorial — Shapes](https://atcoder.jp/contests/abc218/editorial)
> 📎 [Wikipedia: Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
> 📎 [Wikipedia: Reflection (mathematics)](https://en.wikipedia.org/wiki/Reflection_(mathematics))
> 📎 [CP-Algorithms: Grid rotation](https://cp-algorithms.com/)

### 📚 2. CORE CONCEPTS

#### Concept 1: Translation Invariance

**Intuition:** A shape is the same no matter where it sits on the grid. Dragging it to the top-left corner removes position as a distinguishing factor.

**Derivation:** Given a set of coordinates `{(r1,c1), (r2,c2), ..., (rk,ck)}`, find the minimum row `r_min` and minimum column `c_min`. Subtract `(r_min, c_min)` from every coordinate to get the normalized shape.

**Edge Cases:** Empty shapes (no cells), single-cell shapes (trivially invariant), shapes that touch the grid boundary after normalization.

**Formula:** $S' = \{(r_i - r_{\min}, c_i - c_{\min}) \;|\; (r_i, c_i) \in S\}$

**Python:**
```python
def normalize(coords):
    r_min = min(r for r, c in coords)
    c_min = min(c for r, c in coords)
    return frozenset((r - r_min, c - c_min) for r, c in coords)
```

**References:** > 📎 [CP-Algorithms: Grid operations](https://cp-algorithms.com/)

#### Concept 2: 90° Clockwise Rotation on a Grid

**Intuition:** A shape on an N×N grid can be rotated. The cell `(r, c)` moves to `(c, N-1-r)` when rotated 90° clockwise. Each corner of a square cycles through all four positions.

**Derivation:** 
- Original: row `r`, column `c` from left
- After 90° CW: the original row becomes the column, and the original column becomes `N-1 - original row`
- Verification: top-left `(0,0)` → `(0, N-1)` = top-right ✓
- Verification: top-right `(0,N-1)` → `(N-1, N-1)` = bottom-right ✓

**Edge Cases:** Non-square grids (treat as bounding square), odd vs even dimensions, single row/column.

**Formula:** $R_{90}(r,c) = (c, n-1-r)$

**Python:**
```python
def rotate_90(coords, n):
    return [(c, n - 1 - r) for r, c in coords]
```

**References:** > 📎 [Wikipedia: Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)

#### Concept 3: Generating All 4 Rotations

**Intuition:** A shape rotated 0°, 90°, 180°, and 270° may match its target. Apply rotation four times (or build a cycle).

**Derivation:** Start with original shape `S0`. Apply 90° to get `S1`, then 90° again to `S1` to get `S2` (180°), and again to `S3` (270°). The 4th rotation returns to `S0`.

**Edge Cases:** Shapes with rotational symmetry (a square looks the same after 90°), shapes where only 180° matters.

**Python:**
```python
def all_rotations(coords, n):
    rotations = []
    cur = coords
    for _ in range(4):
        rotations.append(normalize(cur))
        cur = rotate_90(cur, n)
    return rotations
```

**References:** > 📎 [CP-Algorithms: Grid transformations](https://cp-algorithms.com/)

#### Concept 4: Shape Reflection (Mirroring)

**Intuition:** Flipping a shape across the vertical axis: each cell `(r, c)` maps to `(r, n-1-c)`. Horizontal mirroring can be combined with rotation for the full symmetry group.

**Derivation:** Mirror across vertical axis: column `c` → `n-1-c`, row stays. Mirror across horizontal axis: `(r,c)` → `(n-1-r, c)`.

**Edge Cases:** Shapes already symmetric (mirror produces same shape), shapes that match only after mirror + rotation.

**Formula:** $M_v(r,c) = (r, n-1-c)$

**Python:**
```python
def mirror_horizontal(coords, n):
    return [(r, n - 1 - c) for r, c in coords]
```

**References:** > 📎 [Wikipedia: Reflection (mathematics)](https://en.wikipedia.org/wiki/Reflection_(mathematics))

#### Concept 5: Shape Equivalence via Normalized Cell Sets

**Intuition:** Two shapes are equivalent under rigid motions if one can be rotated (0°/90°/180°/270°) and mirrored, then translated so their normalized coordinate sets match exactly. Use `frozenset` for O(1) comparison.

**Derivation:** Generate all 8 transformations (4 rotations × 2 mirror states), normalize each via translation, and check if any matches the normalized target.

**Edge Cases:** Ensure we check all 8 combos, not just rotation alone (some shapes need mirroring).

**Python:**
```python
def equivalent(shape_a, shape_b, n):
    a_norm = normalize(shape_a)
    rotations = all_rotations(shape_a, n)
    mirrored = mirror_horizontal(shape_a, n)
    rotations_m = all_rotations(mirrored, n)
    all_variants = rotations + rotations_m
    return any(normalize(v) == normalize(shape_b) for v in all_variants)
```

**References:** > 📎 [AtCoder ABC218 Editorial](https://atcoder.jp/contests/abc218/editorial)

### 🔍 3. PROBLEM RECOGNITION

**Keywords:** "same shape", "rotate grid", "mirror", "congruent", "transform", "overlap", "normalize", "symmetry"

**Interview framing:** "Given two N×N grids with '#' and '.', can you make them match by rotating the grid?" or "Determine if two polyominoes are the same shape."

**Hidden indicators:**
- Grid size ≤ 200 → O(N²) rotation is fine
- Problem mentions "90-degree increments" → only 4 rotations needed
- "Flip" or "reverse" in problem → include mirroring
- No explicit mention but examples show rotations → test all 8 variants
- Problem about "L-shapes" → shape recognition with normalization
- "Symmetry" detection → check if rotated shape equals original

### 🧩 4. PATTERN ANALYSIS

**Pattern 1: Shape Equivalence via Exhaustive Transform**
- **When to use:** Two grids, decide if one shape can become the other
- **Complexity:** O(N² × 8) = O(N²)
- **Key insight:** Generate all 8 variants, normalize, compare against target

**Pattern 2: Symmetry Detection**
- **When to use:** Count symmetric axes, check if grid is rotation-symmetric
- **Complexity:** O(N²)
- **Key insight:** Apply transformation, compare to original cell-by-cell

**Pattern 3: Rectangle Completion**
- **When to use:** Grid with exactly 2 or 4 filled cells forming an incomplete rectangle
- **Complexity:** O(N²) or O(1)
- **Key insight:** Find min/max row and column of filled cells; the missing corners form the rectangle

**Pattern 4: Grid Convexity Check**
- **When to use:** Determine if shape is "convex" on a grid
- **Complexity:** O(N²)
- **Key insight:** For any two filled cells in same row, all cells between them must be filled; same for columns

**Pattern 5: L-Shape Recognition**
- **When to use:** Detect L-shaped trominoes in a grid
- **Complexity:** O(N²)
- **Key insight:** An L-shape has exactly 3 cells forming 2 adjacent edges of a 2×2 square; check connectivity and shape

### ⚡ 5. BRUTE FORCE → OPTIMIZED

#### Problem 1: AtCoder ABC218C — Shapes

**Intuition:** Given two N×N grids with '#' representing shape cells, determine if they represent the same shape under rotation and translation.

**Brute Force Code:**
```python
def read_grid(n):
    return [list(input().strip()) for _ in range(n)]

def get_coords(grid, n):
    return [(r, c) for r in range(n) for c in range(n) if grid[r][c] == '#']

def normalize(coords):
    if not coords:
        return frozenset()
    r_min = min(r for r, _ in coords)
    c_min = min(c for _, c in coords)
    return frozenset((r - r_min, c - c_min) for r, c in coords)

def rotate_90(coords, n):
    return [(c, n - 1 - r) for r, c in coords]

def solve_brute():
    n = int(input())
    s = read_grid(n)
    t = read_grid(n)
    s_coords = get_coords(s, n)
    t_norm = normalize(get_coords(t, n))
    
    for _ in range(4):
        if normalize(s_coords) == t_norm:
            print("Yes")
            return
        s_coords = rotate_90(s_coords, n)
    print("No")
```

**Why Slow:** Brute force is actually O(N²) which is fine for N ≤ 200. The real issue is not checking mirrored variants — the problem may require mirroring too.

**Optimization Step-by-Step:**
1. Extract '#' coordinates from both grids
2. If count differs → immediately return No
3. Generate all 8 variants (4 rotations × 2 for mirror)
4. Check each variant's normalized form against target
5. Early exit on first match

**Final Code:**
```python
import sys

def solve():
    n = int(sys.stdin.readline())
    s = [sys.stdin.readline().strip() for _ in range(n)]
    t = [sys.stdin.readline().strip() for _ in range(n)]
    
    s_cells = [(r, c) for r in range(n) for c in range(n) if s[r][c] == '#']
    t_cells = [(r, c) for r in range(n) for c in range(n) if t[r][c] == '#']
    
    if len(s_cells) != len(t_cells):
        print("No")
        return
    if len(s_cells) == 0:
        print("Yes")
        return
    
    def normalize(cells):
        r0 = min(r for r, _ in cells)
        c0 = min(c for _, c in cells)
        return frozenset((r - r0, c - c0) for r, c in cells)
    
    def rotate(cells):
        return [(c, n - 1 - r) for r, c in cells]
    
    def mirror(cells):
        return [(r, n - 1 - c) for r, c in cells]
    
    t_norm = normalize(t_cells)
    
    # Check all 8 transformations
    variants = [s_cells]
    # Generate 4 rotations
    cur = s_cells
    for _ in range(3):
        cur = rotate(cur)
        variants.append(cur)
    # Mirror and 4 rotations
    m = mirror(s_cells)
    variants.append(m)
    cur = m
    for _ in range(3):
        cur = rotate(cur)
        variants.append(cur)
    
    for v in variants:
        if normalize(v) == t_norm:
            print("Yes")
            return
    print("No")

if __name__ == "__main__":
    solve()
```

**Edge Cases:** Empty grids (0 '#' cells, always match), single cell (trivially match), different counts (immediate No), shapes with rotational symmetry (some rotations produce same normalized form).

**C++/Java:**
```cpp
// C++ key snippet for rotation
vector<pair<int,int>> rotate90(vector<pair<int,int>> cells, int n) {
    for (auto &[r, c] : cells) {
        int nr = c, nc = n - 1 - r;
        r = nr; c = nc;
    }
    return cells;
}
```

#### Problem 2: Mirror Grid (Codeforces) — Rotation Symmetry

**Intuition:** Given a binary N×N grid, find the minimum number of cell flips to make the grid symmetric under 90° rotation.

**Brute Force Code:**
```python
def min_flips_brute(grid, n):
    """Try flipping subsets of cells — exponential, naive."""
    pass  # Not feasible; we jump to optimized
```

**Why Slow:** Brute force over all subsets is O(2^(N²)).

**Optimization Step-by-Step:**
1. Cells come in cycles of 4 under 90° rotation
2. For each position (r,c), its orbit is {(r,c), (c,N-1-r), (N-1-r,N-1-c), (N-1-c,r)}
3. For each orbit, count how many are 0 and how many are 1
4. Minimum flips for that orbit = min(#zeros, #ones)
5. Sum across all orbits, being careful not to double-count

**Final Code:**
```python
def solve():
    n = int(input())
    grid = [list(input().strip()) for _ in range(n)]
    visited = [[False] * n for _ in range(n)]
    ans = 0
    
    for r in range(n):
        for c in range(n):
            if visited[r][c]:
                continue
            # Collect the rotation orbit
            cells = []
            cr, cc = r, c
            for _ in range(4):
                if not visited[cr][cc]:
                    visited[cr][cc] = True
                    cells.append(grid[cr][cc])
                cr, cc = cc, n - 1 - cr
            if not cells:
                continue
            zeros = cells.count('0')
            ones = cells.count('1')
            ans += min(zeros, ones)
    
    print(ans)
```

**Edge Cases:** Odd N (center cell maps to itself), N=1 (0 flips needed), already symmetric grid.

**C++/Java:**
```cpp
int solve(int n, vector<string>& g) {
    vector<vector<bool>> vis(n, vector<bool>(n));
    int ans = 0;
    for (int r = 0; r < n; r++)
        for (int c = 0; c < n; c++) {
            if (vis[r][c]) continue;
            int cnt[2] = {0, 0};
            int cr = r, cc = c;
            for (int k = 0; k < 4; k++) {
                if (!vis[cr][cc]) {
                    vis[cr][cc] = true;
                    cnt[g[cr][cc]-'0']++;
                }
                int nr = cc, nc = n - 1 - cr;
                cr = nr; cc = nc;
            }
            ans += min(cnt[0], cnt[1]);
        }
    return ans;
}
```

### 🏆 6. CURATED PROBLEMS

| # | Problem | Platform | Difficulty | URL | Concepts |
|---|---|---|---|---|---|
| 1 | Shapes (ABC218 C) | AtCoder | 800 | https://atcoder.jp/contests/abc218/tasks/abc218_c | Shape equivalence, rotation, translation normalization |
| 2 | Mirror Grid | Codeforces | 1400 | https://codeforces.com/problemset/problem/1703/E | Rotation symmetry, minimum flips |
| 3 | Convex Shape | Codeforces | 1500 | https://codeforces.com/problemset/problem/275/B | Grid convexity check |
| 4 | Almost Rectangle | Codeforces | 800 | https://codeforces.com/problemset/problem/1512/B | Rectangle completion |
| 5 | L-shapes | Codeforces | 1500 | https://codeforces.com/problemset/problem/1722/F | Shape recognition, L-tromino |
| 6 | Vlad and Shapes | Codeforces | 1000 | https://codeforces.com/problemset/problem/2056/A | Shape detection, pattern matching |

### ✏️ 7. PRACTICE PROBLEMS

**Problem 1:** Given two N×M grids, determine if one can be transformed into the other using 90° rotations only (no mirror). Write a function `can_rotate_match(grid_a, grid_b)`.

**Solution:**
```python
def can_rotate_match(a, b):
    n, m = len(a), len(a[0])
    def get_cells(g):
        return [(r,c) for r in range(len(g)) for c in range(len(g[0])) if g[r][c]=='#']
    def norm(cells):
        if not cells: return frozenset()
        r0 = min(r for r,_ in cells)
        c0 = min(c for _,c in cells)
        return frozenset((r-r0, c-c0) for r,c in cells)
    def rot90(cells, rows, cols):
        return [(c, rows-1-r) for r,c in cells]
    
    a_cells = get_cells(a)
    b_norm = norm(get_cells(b))
    rows, cols = n, m
    for _ in range(4):
        if norm(a_cells) == b_norm:
            return True
        a_cells = rot90(a_cells, rows, cols)
        rows, cols = cols, rows  # dimensions swap on rotation
    return False
```

**Problem 2:** Given an N×N grid, find the maximum number of '#' cells that can be part of a single symmetric shape (the shape and its 90° rotation overlap). Output the count.

**Solution:** For each rotation orbit of 4 cells, count how many are '#' (call it k). If k >= 2, the orbit contributes all 4 cells to the maximum symmetric shape. If k == 1, it contributes 1 (the single '#' stays). If k == 0, contributes 0. Sum across all orbits.

**Problem 3:** Detect if an arbitrary connected shape on a grid is convex (i.e., for any two cells, the entire Manhattan path between them is filled).

**Solution:** For every pair of cells sharing a row, check all cells between them. For every pair sharing a column, check all cells between them. If any gap found, shape is not convex.

### 📝 8. CHAPTER QUIZ

**Q1:** What is the 90° clockwise rotation of cell (2, 3) on a 5×5 grid?
<details><summary>Answer</summary>(3, 2) — because (r,c) → (c, n-1-r) = (3, 5-1-2) = (3, 2)
</details>

**Q2:** How many distinct transformations must be checked for general shape equivalence (including mirror)?
<details><summary>Answer</summary>8 — 4 rotations × 2 mirror states (original + mirrored)
</details>

**Q3:** What is the minimum number of cell flips required for a 1×1 grid to be rotation-symmetric?
<details><summary>Answer</summary>0 — a single cell is always rotation-symmetric
</details>

**Q4:** In the mirror grid problem, how many cells form a rotation orbit for a cell NOT on the center or diagonal of an odd-sized grid?
<details><summary>Answer</summary>4 — each interior cell belongs to a cycle of 4 distinct positions
</details>

**Q5:** What data structure is best for comparing normalized shapes?
<details><summary>Answer</summary>frozenset of (r, c) tuples — it's hashable, order-independent, and O(1) for comparisons
</details>

**Q6:** What is the complexity of checking shape equivalence for two N×N grids?
<details><summary>Answer</summary>O(N²) — extracting cells is O(N²), rotation is O(K) where K is #cells, and there are at most 8 variants
</details>

**Q7:** If a shape has exactly 1 cell, how many of the 8 transformations produce a distinct normalized shape?
<details><summary>Answer</summary>1 — a single cell normalizes to {(0,0)} regardless of rotation or mirror
</details>

**Q8:** In the rectangle completion problem (Almost Rectangle), what is the missing corner if you have (r1,c1) and (r2,c2)?
<details><summary>Answer</summary>If r1 == r2, the missing corners are (r1, c1 xor c2) and (r2, c1 xor c2) — the opposite corners; generally, the missing two corners are (r1,c2) and (r2,c1)
</details>

**Q9:** What does it mean for a grid shape to be "convex"?
<details><summary>Answer</summary>For any two filled cells in the same row or column, all cells between them must also be filled. No gaps.
</details>

**Q10:** When rotating a rectangular grid (not square), what happens to dimensions?
<details><summary>Answer</summary>The dimensions swap: a N×M grid becomes M×N after 90° rotation.
</details>

### 🃏 9. FLASHCARDS

1. **90° clockwise rotation formula:** (r, c) → (c, n-1-r)
2. **180° rotation:** (r, c) → (n-1-r, n-1-c)
3. **Translation normalization:** subtract min(r) and min(c) from all coordinates
4. **Shape equivalence check:** generate 8 variants (4 rot × 2 mirror), normalize each, compare
5. **Rotation symmetry flips:** for each orbit of 4 cells, add min(#0, #1) to answer
6. **Non-square rotations:** dimensions swap after 90° rotation (N×M → M×N)
7. **Grid convexity:** no gaps between filled cells in same row/column
8. **Rectangle completion:** missing corners are (r1,c2) and (r2,c1)
9. **L-shape:** exactly 3 cells forming adjacent edges of a 2×2 square
10. **Empty shape edge case:** if both shapes have 0 filled cells, they are always equivalent

### 📎 10. REFERENCES & FURTHER READING

- [AtCoder ABC218 Editorial — Shapes](https://atcoder.jp/contests/abc218/editorial)
- [Codeforces: Mirror Grid (1703E)](https://codeforces.com/problemset/problem/1703/E)
- [Codeforces: Convex Shape (275B)](https://codeforces.com/problemset/problem/275/B)
- [Codeforces: Almost Rectangle (1512B)](https://codeforces.com/problemset/problem/1512/B)
- [Codeforces: L-shapes (1722F)](https://codeforces.com/problemset/problem/1722/F)
- [CP-Algorithms: Grid rotation and transformations](https://cp-algorithms.com/)
- [Wikipedia: Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)
- [Wikipedia: Reflection (mathematics)](https://en.wikipedia.org/wiki/Reflection_(mathematics))
- [arXiv: Polyomino enumeration](https://arxiv.org/abs/math/9805015)
## Chapter 14: Convex Hull & Computational Geometry

### 🎯 Learning Objectives

By the end of this chapter, you will be able to:
- Define the convex hull of a set of points
- Implement Jarvis march (gift wrapping) in O(nh)
- Implement Graham scan in O(n log n)
- Implement Andrew's monotone chain in O(n log n)
- Compute cross products for orientation tests
- Detect line segment intersections using orientation
- Solve closest pair of points with divide & conquer
- Test if a point lies inside a convex polygon in O(log n)
- Recognize computational geometry problems in competitive programming

### 📖 1. INTRODUCTION

Imagine you have a handful of nails hammered into a board. If you stretch a rubber band around the outermost nails, the rubber band forms a convex polygon — the smallest convex shape containing all the points. This is the **convex hull**, one of the most fundamental structures in computational geometry. From collision detection in games to finding the diameter of a point set, the convex hull is everywhere.

> 📎 [Wikipedia: Convex hull](https://en.wikipedia.org/wiki/Convex_hull)
> 📎 [Wikipedia: Graham scan](https://en.wikipedia.org/wiki/Graham_scan)
> 📎 [Wikipedia: Monotone chain](https://en.wikipedia.org/wiki/Monotone_chain)
> 📎 [CP-Algorithms: Convex hull](https://cp-algorithms.com/geometry/convex-hull.html)
> 📎 [CP-Algorithms: Closest pair](https://cp-algorithms.com/geometry/nearest_points.html)
> 📎 [CP-Algorithms: Line intersection](https://cp-algorithms.com/geometry/lines-intersection.html)

### 📚 2. CORE CONCEPTS

#### Concept 1: Convex Hull Definition

**Intuition:** The convex hull is the smallest convex polygon that contains all points. A polygon is convex if any line segment between two points inside it stays entirely inside. Think of shrinking-wrap around a set of points.

**Derivation:** Formally, the convex hull of set S is the set of all convex combinations of points in S: $\{\sum_{i=1}^{|S|} \lambda_i p_i \;|\; \lambda_i \ge 0, \sum \lambda_i = 1\}$. The hull vertices are a subset of S.

**Edge Cases:** All points collinear (hull is a line segment), single point (hull is that point), duplicate points (must deduplicate).

**Formula:** $CH(S) = \bigcap_{\text{convex } C \supseteq S} C$

**Python:**
```python
# A point is represented as a tuple (x, y) or a custom class
from dataclasses import dataclass

@dataclass
class Point:
    x: float
    y: float
```

**References:** > 📎 [Wikipedia: Convex hull](https://en.wikipedia.org/wiki/Convex_hull)

#### Concept 2: Cross Product & Orientation

**Intuition:** Given three points A, B, C, the cross product (B-A) × (C-B) tells us whether C is to the left of AB (positive), to the right (negative), or collinear (zero). This is the fundamental building block of all hull algorithms.

**Derivation:** $\text{cross}(A, B, C) = (B.x - A.x)(C.y - A.y) - (B.y - A.y)(C.x - A.x)$. Positive = counter-clockwise turn, negative = clockwise, zero = collinear.

**Edge Cases:** Collinear points on hull boundary (include or exclude based on problem), integer overflow with large coordinates (use Python's big ints or 128-bit in C++).

**Formula:** $\text{orientation}(A,B,C) = (B_x - A_x)(C_y - A_y) - (B_y - A_y)(C_x - A_x)$

**Python:**
```python
def cross(o, a, b):
    """Cross product (OA x OB). Positive = CCW turn."""
    return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x)

def orientation(a, b, c):
    """Returns >0 if CCW, <0 if CW, 0 if collinear."""
    return cross(a, b, c)
```

**References:** > 📎 [CP-Algorithms: Orientation](https://cp-algorithms.com/geometry/oriented-triangle-area.html)

#### Concept 3: Jarvis March (Gift Wrapping)

**Intuition:** Start at the leftmost point, then repeatedly pick the point that makes the smallest right turn. Like gift-wrapping — you pull the paper around the gift, one vertex at a time.

**Derivation:** Find point with smallest x (and smallest y if tie). At each step, choose the next point Q that maximizes the angle (or makes the most counter-clockwise turn) relative to the current point P.

**Edge Cases:** All points collinear (algorithm terminates after 2 points), points with same angle (pick farthest).

**Complexity:** O(nh) where h is number of hull vertices. Fast when h is small, O(n²) in worst case.

**Python:**
```python
def jarvis_march(points):
    n = len(points)
    if n < 3:
        return points
    
    start = min(points, key=lambda p: (p.x, p.y))
    hull = []
    p = start
    
    while True:
        hull.append(p)
        q = points[0]
        for r in points:
            if r == p:
                continue
            o = orientation(p, q, r)
            if o > 0 or (o == 0 and dist(p, r) > dist(p, q)):
                q = r
        p = q
        if p == start:
            break
    
    return hull
```

**References:** > 📎 [Wikipedia: Gift wrapping](https://en.wikipedia.org/wiki/Gift_wrapping_algorithm)

#### Concept 4: Graham Scan

**Intuition:** Sort points by polar angle relative to the lowest point, then scan counter-clockwise. Whenever we make a right turn, pop the previous point — it's interior. This is the classic textbook algorithm.

**Derivation:** Sort by y then x. Take the bottom-most point as pivot. Sort remaining by polar angle (using cross product). Iterate: push current point, while last 3 points make a non-left turn, pop the middle one.

**Edge Cases:** Collinear points on hull edge (the algorithm may include/exclude them depending on implementation). Need careful comparator for sorting by angle.

**Complexity:** O(n log n) for sorting, O(n) for the scan.

**Python:**
```python
def graham_scan(points):
    points = sorted(set(points))  # Deduplicate & sort
    if len(points) < 3:
        return points
    
    # Sort by polar angle from bottom-most point
    pivot = points[0]  # Already sorted, so this is bottom-left
    sorted_pts = sorted(points[1:], key=lambda p: (orientation(pivot, Point(0,0), p), dist(pivot, p)))
    
    stack = [pivot]
    for p in sorted_pts:
        while len(stack) >= 2 and orientation(stack[-2], stack[-1], p) <= 0:
            stack.pop()
        stack.append(p)
    
    return stack
```

**References:** > 📎 [Wikipedia: Graham scan](https://en.wikipedia.org/wiki/Graham_scan)

#### Concept 5: Monotone Chain (Andrew's Algorithm)

**Intuition:** Sort points by x, then y. Build the lower hull left-to-right, then the upper hull right-to-left. Merge them. No angle sorting needed — just cross products.

**Derivation:** Sort points. Build lower hull: iterate sorted points, while last 3 points make a clockwise turn, pop. Build upper hull: iterate reversed points, same rule. Remove duplicate endpoints and concatenate.

**Edge Cases:** Fewer than 3 points (return as-is), all points collinear (lower hull has all, upper hull has none).

**Complexity:** O(n log n) sorting, O(n) hull building.

**Python:**
```python
def monotone_chain(points):
    points = sorted(set(points))
    if len(points) < 3:
        return points
    
    def build_hull(pts):
        hull = []
        for p in pts:
            while len(hull) >= 2 and orientation(hull[-2], hull[-1], p) <= 0:
                hull.pop()
            hull.append(p)
        return hull
    
    lower = build_hull(points)
    upper = build_hull(reversed(points))
    
    # Remove duplicate endpoints
    return lower[:-1] + upper[:-1]
```

**References:** > 📎 [Wikipedia: Monotone chain](https://en.wikipedia.org/wiki/Monotone_chain)

#### Concept 6: Line Segment Intersection

**Intuition:** Two line segments intersect if they straddle each other: the endpoints of one segment are on opposite sides of the line containing the other, and vice versa.

**Derivation:** Segments AB and CD intersect iff orientation(A,B,C) × orientation(A,B,D) < 0 AND orientation(C,D,A) × orientation(C,D,B) < 0. Handle collinear overlap separately.

**Edge Cases:** Collinear overlapping segments (check bounding boxes), segments sharing an endpoint, vertical/horizontal segments.

**Python:**
```python
def on_segment(a, b, c):
    """Check if point c lies on segment ab (collinear)."""
    return (min(a.x, b.x) <= c.x <= max(a.x, b.x) and
            min(a.y, b.y) <= c.y <= max(a.y, b.y))

def segments_intersect(a, b, c, d):
    o1 = orientation(a, b, c)
    o2 = orientation(a, b, d)
    o3 = orientation(c, d, a)
    o4 = orientation(c, d, b)
    
    if o1 == 0 and on_segment(a, b, c): return True
    if o2 == 0 and on_segment(a, b, d): return True
    if o3 == 0 and on_segment(c, d, a): return True
    if o4 == 0 and on_segment(c, d, b): return True
    
    return (o1 > 0) != (o2 > 0) and (o3 > 0) != (o4 > 0)
```

**References:** > 📎 [CP-Algorithms: Line intersection](https://cp-algorithms.com/geometry/lines-intersection.html)

#### Concept 7: Closest Pair of Points

**Intuition:** Find the minimum distance between any two points. Sweeping through all pairs is O(n²) — divide and conquer achieves O(n log n).

**Derivation:** Sort points by x. Recursively find min distance in left and right halves (δ). Consider the vertical strip of width 2δ around the midline. Sort strip points by y. For each point, check the next 7 points — the geometry guarantees we only need 7 comparisons.

**Edge Cases:** Fewer than 2 points (return infinity), many collinear points (7-point check still holds).

**Complexity:** O(n log n) — T(n) = 2T(n/2) + O(n) for the merge step.

**Python:**
```python
import math

def closest_pair(points):
    pts = sorted(points, key=lambda p: p.x)
    
    def dist2(a, b):
        return (a.x - b.x)**2 + (a.y - b.y)**2
    
    def solve(l, r):
        if r - l <= 3:
            return min(dist2(pts[i], pts[j]) for i in range(l, r) for j in range(i+1, r))
        
        m = (l + r) // 2
        d = min(solve(l, m), solve(m, r))
        
        strip = [pts[i] for i in range(l, r) if abs(pts[i].x - pts[m].x) < math.sqrt(d)]
        strip.sort(key=lambda p: p.y)
        
        for i in range(len(strip)):
            for j in range(i+1, len(strip)):
                if (strip[j].y - strip[i].y)**2 >= d:
                    break
                d = min(d, dist2(strip[i], strip[j]))
        
        return d
    
    return math.sqrt(solve(0, len(pts)))
```

**References:** > 📎 [CP-Algorithms: Closest pair](https://cp-algorithms.com/geometry/nearest_points.html)

#### Concept 8: Point-in-Convex-Polygon (O(log n))

**Intuition:** For a convex polygon sorted counter-clockwise, check if the point lies inside using binary search on the angle from the first vertex.

**Derivation:** Pick the first vertex V0. Binary search to find the wedge V0-Vi-V(i+1) that contains the point. Then check if the point is to the left of edge Vi-V(i+1).

**Edge Cases:** Point on polygon boundary, point very close to V0, polygon is a triangle (trivial wedge check).

**Python:**
```python
def point_in_convex_polygon(poly, pt):
    """poly is CCW-ordered list of Points. O(log n)."""
    n = len(poly)
    if orientation(poly[0], poly[1], pt) < 0: return False
    if orientation(poly[0], poly[n-1], pt) > 0: return False
    
    lo, hi = 1, n - 1
    while hi - lo > 1:
        mid = (lo + hi) // 2
        if orientation(poly[0], poly[mid], pt) >= 0:
            lo = mid
        else:
            hi = mid
    
    return orientation(poly[lo], poly[hi], pt) >= 0
```

**References:** > 📎 [CP-Algorithms: Point in convex polygon](https://cp-algorithms.com/geometry/point-in-convex-polygon.html)

### 🔍 3. PROBLEM RECOGNITION

**Keywords:** "convex hull", "minimum bounding", "outermost points", "fence", "rubber band", "enclosing", "closest pair", "nearest points", "intersect", "collinear", "points on a line"

**Interview framing:** "Find the smallest convex polygon containing all points" (LeetCode: Erect the Fence), "Maximum number of points on a line" (LeetCode: Max Points on a Line), "Do these points make a straight line?" (LeetCode: Check Straight Line)

**Hidden indicators:**
- Problem mentions "enclose" or "surround" → convex hull
- Problem mentions "minimum distance between any two points" → closest pair
- Problem mentions "line that passes through most points" → collinearity hashing
- Problem requires checking if two shapes touch → line segment intersection
- Problem says "inside a polygon" → point-in-polygon
- Problem has "circle" or "circumference" → could be minimum enclosing circle (Chapter 15)

### 🧩 4. PATTERN ANALYSIS

**Pattern 1: Convex Hull Construction**
- **When to use:** "Smallest polygon containing all points", "erect fence around trees"
- **Complexity:** O(n log n) for monotone chain
- **Key insight:** Monotone chain avoids angle sorting issues; use `<= 0` to exclude collinear points from hull

**Pattern 2: Collinearity Detection**
- **When to use:** "Maximum points on a line", "check if straight line"
- **Complexity:** O(n²) or O(n² log n) with hashing
- **Key insight:** Hash slopes as reduced fractions (dx/gcd, dy/gcd) to avoid floating point; handle vertical lines (dx=0) separately

**Pattern 3: Line Segment Intersection**
- **When to use:** "Do these lines cross?", "Crazy town" (count how many walls a path crosses)
- **Complexity:** O(1) per pair
- **Key insight:** Use orientation test; don't use y = mx + b (floating point errors with vertical lines)

**Pattern 4: Closest Pair of Points**
- **When to use:** "Minimum distance between any two points" in a set of 10⁵ points
- **Complexity:** O(n log n)
- **Key insight:** The vertical strip + 7-point check is the key insight for the O(n) merge

**Pattern 5: Point Location / Inclusion**
- **When to use:** "Is this point inside the polygon?", "Count points inside convex shape"
- **Complexity:** O(log n) for convex, O(n) for arbitrary
- **Key insight:** For convex polygons, binary search by angle from the first vertex

### ⚡ 5. BRUTE FORCE → OPTIMIZED

#### Problem 1: Erect the Fence (LeetCode) — Convex Hull

**Intuition:** You have a set of trees (points). Erect a fence that encloses all trees with minimum fence length. This is exactly the convex hull.

**Brute Force Code:**
```python
def outerTrees_brute(points):
    """Check every subset — exponential, O(2^n)."""
    pass  # Impractical
```

**Why Slow:** Checking every subset is O(2^n). We need the convex hull.

**Optimization Step-by-Step (Jarvis March):**
1. Find leftmost point as start
2. Repeatedly find the point that is "most counter-clockwise" from current
3. For each step, test all n points to find the next hull vertex
4. Stop when we return to start

**Final Code (Monotone Chain):**
```python
def outerTrees(points):
    pts = sorted(set((p[0], p[1]) for p in points))
    if len(pts) < 3:
        return list(pts)
    
    def cross(o, a, b):
        return (a[0]-o[0])*(b[1]-o[1]) - (a[1]-o[1])*(b[0]-o[0])
    
    def build(pts):
        hull = []
        for p in pts:
            while len(hull) >= 2 and cross(hull[-2], hull[-1], p) < 0:
                hull.pop()
            hull.append(p)
        return hull
    
    lower = build(pts)
    upper = build(reversed(pts))
    return list(set(lower[:-1] + upper[:-1]))
```

**Edge Cases:** All points collinear (hull is the line segment, all boundary points included), fewer than 3 points, duplicate points.

**C++/Java:**
```cpp
vector<vector<int>> outerTrees(vector<vector<int>>& points) {
    sort(points.begin(), points.end());
    if (points.size() < 3) return points;
    
    auto cross = [](auto& o, auto& a, auto& b) {
        return (a[0]-o[0])*(b[1]-o[1]) - (a[1]-o[1])*(b[0]-o[0]);
    };
    
    vector<vector<int>> lower, upper;
    for (auto& p : points) {
        while (lower.size() >= 2 && cross(lower[lower.size()-2], lower.back(), p) < 0)
            lower.pop_back();
        lower.push_back(p);
    }
    for (int i = points.size()-1; i >= 0; i--) {
        while (upper.size() >= 2 && cross(upper[upper.size()-2], upper.back(), points[i]) < 0)
            upper.pop_back();
        upper.push_back(points[i]);
    }
    
    set<vector<int>> hull(lower.begin(), lower.end());
    hull.insert(upper.begin(), upper.end());
    return {hull.begin(), hull.end()};
}
```

#### Problem 2: Closest Pair of Points (CSES/CF)

**Intuition:** Given n points, find the minimum Euclidean distance between any two distinct points.

**Brute Force Code:**
```python
def closest_brute(points):
    ans = float('inf')
    for i in range(len(points)):
        for j in range(i+1, len(points)):
            d = (points[i].x - points[j].x)**2 + (points[i].y - points[j].y)**2
            ans = min(ans, d)
    return math.sqrt(ans)
```

**Why Slow:** O(n²) — 100k points would take ~10¹⁰ operations. We need O(n log n).

**Optimization Step-by-Step:**
1. Sort points by x-coordinate
2. Divide into left and right halves, recursively find min distance in each
3. δ = min(left_min, right_min)
4. Consider the strip of width 2δ around the midline
5. Sort strip points by y-coordinate
6. For each point in strip, check the next 7 points (geometry guarantee)

**Final Code:**
```python
import sys
import math

def solve():
    n = int(sys.stdin.readline())
    pts = [tuple(map(int, sys.stdin.readline().split())) for _ in range(n)]
    pts.sort()
    
    def dist2(a, b):
        return (a[0]-b[0])**2 + (a[1]-b[1])**2
    
    def solve_range(l, r):
        if r - l <= 3:
            d = float('inf')
            for i in range(l, r):
                for j in range(i+1, r):
                    d = min(d, dist2(pts[i], pts[j]))
            return d
        
        m = (l + r) // 2
        d = min(solve_range(l, m), solve_range(m, r))
        sqrt_d = math.sqrt(d)
        
        strip = []
        for i in range(l, r):
            if abs(pts[i][0] - pts[m][0]) < sqrt_d:
                strip.append(pts[i])
        strip.sort(key=lambda p: p[1])
        
        for i in range(len(strip)):
            for j in range(i+1, len(strip)):
                if (strip[j][1] - strip[i][1])**2 >= d:
                    break
                d = min(d, dist2(strip[i], strip[j]))
        
        return d
    
    print(f"{math.sqrt(solve_range(0, n)):.6f}")
```

**Edge Cases:** n < 2 (answer is infinity or 0), integer overflow in distance squared, points sharing same coordinates (distance = 0).

**C++/Java:**
```cpp
typedef long long ll;
struct Point { ll x, y; };
ll dist2(Point a, Point b) {
    return (a.x-b.x)*(a.x-b.x) + (a.y-b.y)*(a.y-b.y);
}

// In the strip-sort phase, use the 7-point guarantee
for (int i = 0; i < (int)strip.size(); i++)
    for (int j = i+1; j < (int)strip.size() && j < i+7; j++)
        d = min(d, dist2(strip[i], strip[j]));
```

### 🏆 6. CURATED PROBLEMS

| # | Problem | Platform | Difficulty | URL | Concepts |
|---|---|---|---|---|---|
| 1 | Erect the Fence | LeetCode | Hard | https://leetcode.com/problems/erect-the-fence/ | Convex hull, monotone chain |
| 2 | Max Points on a Line | LeetCode | Hard | https://leetcode.com/problems/max-points-on-a-line/ | Collinearity, slope hashing |
| 3 | Check if Straight Line | LeetCode | Easy | https://leetcode.com/problems/check-if-it-is-a-straight-line/ | Collinearity, orientation |
| 4 | Closest Pair of Points | CSES | Hard | https://cses.fi/problemset/task/2194 | Closest pair, divide & conquer |
| 5 | Crazy Town | Codeforces | 1500 | https://codeforces.com/problemset/problem/498/A | Line side test, intersection |

### ✏️ 7. PRACTICE PROBLEMS

**Problem 1:** Given N points, count how many lie on the same line as the first two points. Write a function `count_collinear_with_first_two(points)`.

**Solution:**
```python
def count_collinear_with_first_two(points):
    if len(points) < 3:
        return len(points)
    a, b = points[0], points[1]
    count = 2
    for c in points[2:]:
        if orientation(a, b, c) == 0:
            count += 1
    return count
```

**Problem 2:** Given a set of points, find the number of pairs of points that are within distance D of each other. N ≤ 10⁵.

**Solution:** Use the closest-pair divide-and-conquer structure. Instead of tracking global min, modify to count pairs within distance D. In the strip phase, build a balanced BST of points by y-coordinate, and for each point, query points with y within D.

**Problem 3:** Given the convex hull of a set of points, find its area.

**Solution:**
```python
def polygon_area(hull):
    """Shoelace formula. hull is CCW-ordered."""
    n = len(hull)
    area = 0
    for i in range(n):
        j = (i + 1) % n
        area += hull[i].x * hull[j].y
        area -= hull[j].x * hull[i].y
    return abs(area) / 2.0
```

### 📝 8. CHAPTER QUIZ

**Q1:** What is the orientation of points A(0,0), B(1,1), C(2,2)?
<details><summary>Answer</summary>Collinear (cross = 0). The cross product is (1)(2) — (1)(2) = 0.
</details>

**Q2:** What is the time complexity of Jarvis march?
<details><summary>Answer</summary>O(nh) where n is total points and h is hull size. Worst case O(n²).
</details>

**Q3:** In Andrew's monotone chain, how many hulls are built?
<details><summary>Answer</summary>Two — the lower hull (left to right) and the upper hull (right to left).
</details>

**Q4:** In the closest pair algorithm, how many points in the strip need to be checked for each point?
<details><summary>Answer</summary>7 — due to the packing lemma; the next 7 sorted by y are guaranteed to cover all candidates within distance δ.
</details>

**Q5:** What does a negative cross product (a,b,c) indicate?
<details><summary>Answer</summary>A clockwise (right) turn from a→b→c.
</details>

**Q6:** What is the minimum number of points needed for a non-degenerate convex hull polygon?
<details><summary>Answer</summary>3 — a triangle is the smallest convex polygon.
</details>

**Q7:** For point-in-convex-polygon, what operation enables O(log n) time?
<details><summary>Answer</summary>Binary search on the wedge (angle from the first vertex).
</details>

**Q8:** In the shoelace formula, what should the order of vertices be?
<details><summary>Answer</summary>Counter-clockwise (CCW) or clockwise (CW); the formula returns area with sign, and absolute value gives the area.
</details>

**Q9:** How do you handle vertical lines when hashing slopes for collinearity?
<details><summary>Answer</summary>Use a special sentinel (e.g., infinity or None) for dx = 0, since slope = dy/0 is undefined.
</details>

**Q10:** What is the wrap-around condition for Jarvis march termination?
<details><summary>Answer</summary>When the next selected point equals the starting point.
</details>

### 🃏 9. FLASHCARDS

1. **Cross product (orientation):** cross(a,b,c) = (b.x-a.x)(c.y-a.y) — (b.y-a.y)(c.x-a.x). Positive = CCW/left turn
2. **Convex hull:** Smallest convex polygon containing all points. Rubber band analogy
3. **Jarvis march:** O(nh) — start at leftmost, repeatedly pick most CCW point
4. **Graham scan:** O(n log n) — sort by polar angle, scan, pop on right turn
5. **Monotone chain:** O(n log n) — sort by x, build lower + upper hull, merge
6. **Closest pair:** O(n log n) — divide & conquer with 7-point strip check
7. **Segment intersection:** orientation test + collinear overlap check
8. **Point in convex polygon:** O(log n) — binary search the wedge from V₀
9. **Shoelace formula:** polygon area = ½ |Σ(xi·yi+1 — xi+1·yi)|
10. **Collinearity hashing:** store slope as reduced fraction (dx/gcd, dy/gcd); special case for verticals

### 📎 10. REFERENCES & FURTHER READING

- [LeetCode: Erect the Fence](https://leetcode.com/problems/erect-the-fence/)
- [LeetCode: Max Points on a Line](https://leetcode.com/problems/max-points-on-a-line/)
- [LeetCode: Check Straight Line](https://leetcode.com/problems/check-if-it-is-a-straight-line/)
- [CSES: Closest Pair of Points](https://cses.fi/problemset/task/2194)
- [Codeforces: Crazy Town (498A)](https://codeforces.com/problemset/problem/498/A)
- [CP-Algorithms: Convex hull (monotone chain)](https://cp-algorithms.com/geometry/convex-hull.html)
- [CP-Algorithms: Closest pair](https://cp-algorithms.com/geometry/nearest_points.html)
- [CP-Algorithms: Line intersection](https://cp-algorithms.com/geometry/lines-intersection.html)
- [Wikipedia: Convex hull](https://en.wikipedia.org/wiki/Convex_hull)
- [Wikipedia: Graham scan](https://en.wikipedia.org/wiki/Graham_scan)
- [Wikipedia: Monotone chain](https://en.wikipedia.org/wiki/Monotone_chain)
- [Computational Geometry: Algorithms and Applications (de Berg et al.)](https://www.springer.com/gp/book/9783540779735)
## Chapter 15: Advanced Geometry (CP Level)

### 🎯 Learning Objectives

By the end of this chapter, you will be able to:
- Compute the diameter and minimum bounding rectangle of a convex polygon using rotating calipers
- Implement Welzl's randomized minimum enclosing circle algorithm
- Understand Bentley-Ottmann sweep line for line segment intersection
- Compute half-plane intersection for convex region representation
- Apply Minkowski sums for collision detection and motion planning
- Understand Delaunay triangulation and Voronoi diagram properties
- Compute the geometric median using Weiszfeld's algorithm
- Hash geometric objects (slopes, midpoints) for O(1) lookups
- Handle floating point precision in computational geometry
- Integrate geometry with DP and binary search

### 📖 1. INTRODUCTION

The first two chapters of this course built the foundation: convex hull, orientation, closest pair. Now we enter expert territory — algorithms that power robotics (Minkowski sums), computer graphics (Delaunay triangulation), geographic information systems (Voronoi diagrams), and precision manufacturing (rotating calipers). These are the tools that appear in Codeforces 3500-level problems and the hardest ICPC geometry tasks.

> 📎 [Wikipedia: Rotating calipers](https://en.wikipedia.org/wiki/Rotating_calipers)
> 📎 [Wikipedia: Welzl's algorithm](https://en.wikipedia.org/wiki/Smallest-circle_problem)
> 📎 [Wikipedia: Voronoi diagram](https://en.wikipedia.org/wiki/Voronoi_diagram)
> 📎 [Wikipedia: Delaunay triangulation](https://en.wikipedia.org/wiki/Delaunay_triangulation)
> 📎 [CP-Algorithms: Rotating calipers](https://cp-algorithms.com/geometry/rotating-calipers.html)
> 📎 [CP-Algorithms: Half-plane intersection](https://cp-algorithms.com/geometry/halfplane-intersection.html)
> 📎 [Competitive Programming 3 — Chapter on Geometry](https://cpbook.net/)

### 📚 2. CORE CONCEPTS

#### Concept 1: Rotating Calipers

**Intuition:** Imagine a pair of calipers (like for measuring nuts) clamped around a convex polygon. As you rotate the calipers, they maintain contact with the polygon at a pair of points. The widest separation gives the polygon's diameter.

**Derivation:** Start with the leftmost and rightmost points (known as antipodal pairs). For each edge of the polygon, rotate the calipers so the edge is flush against one side, and the opposite side contacts the farthest point. The distance between the two caliper arms at each orientation gives the width; the maximum distance between antipodal points gives the diameter.

**Key Insight:** As we advance to the next edge, the opposite caliper point only moves forward (never backward), making the algorithm O(n) after the convex hull is built.

**Edge Cases:** Degenerate hulls (line segments, triangles), polygons with parallel edges.

**Formula:** Width = minimum distance between parallel supporting lines

**Python:**
```python
def rotating_calipers(hull):
    """Returns (diameter, width) of a convex polygon."""
    n = len(hull)
    if n < 3:
        return 0, 0
    
    def dist2(a, b):
        return (a.x - b.x)**2 + (a.y - b.y)**2
    
    k = 1
    diameter = 0
    width = float('inf')
    
    for i in range(n):
        # Advance k while area of triangle (i, i+1, k+1) > area(i, i+1, k)
        while True:
            cur = abs(cross(hull[i], hull[(i+1)%n], hull[k%n]))
            nxt = abs(cross(hull[i], hull[(i+1)%n], hull[(k+1)%n]))
            if nxt > cur:
                k += 1
            else:
                break
        diameter = max(diameter, dist2(hull[i], hull[k%n]))
        # Width = perpendicular distance from hull[k] to edge (i, i+1)
        area = abs(cross(hull[i], hull[(i+1)%n], hull[k%n]))
        edge_len = math.sqrt(dist2(hull[i], hull[(i+1)%n]))
        width = min(width, area / edge_len)
    
    return math.sqrt(diameter), width
```

**References:** > 📎 [CP-Algorithms: Rotating calipers](https://cp-algorithms.com/geometry/rotating-calipers.html)

#### Concept 2: Minimum Enclosing Circle — Welzl's Algorithm

**Intuition:** Find the smallest circle that covers all points. Welzl's algorithm uses randomization and the fact that the minimum circle is determined by at most 3 points on its boundary.

**Derivation:** Shuffle points randomly. Build the circle incrementally. If a new point lies outside the current circle, it must be on the boundary of the new minimum circle. Recurse with this point fixed as a boundary point. The recursion depth is at most 3.

**Key Insight:** The expected runtime is O(n) because randomization makes it unlikely that many points require recursive calls. The worst-case is O(n³) but practically never occurs.

**Edge Cases:** 1 point (radius 0), 2 points (circle with diameter = segment), 3+ collinear points.

**Formula:** Circle defined by center (cx, cy) and radius r

**Python:**
```python
import random
import math

def welzl(points):
    """Minimum enclosing circle using Welzl's randomized algorithm."""
    shuffled = points[:]
    random.shuffle(shuffled)
    
    def circle_from_1(p):
        return (p.x, p.y), 0.0
    
    def circle_from_2(p1, p2):
        cx, cy = (p1.x + p2.x) / 2, (p1.y + p2.y) / 2
        r = math.sqrt((p1.x - cx)**2 + (p1.y - cy)**2)
        return (cx, cy), r
    
    def circle_from_3(p1, p2, p3):
        # Perpendicular bisector intersection
        d = 2 * (p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y))
        if abs(d) < 1e-12:
            # Collinear — fall back to circle_from_2
            return circle_from_2(p1, p2)
        ux = ((p1.x**2 + p1.y**2) * (p2.y - p3.y) +
              (p2.x**2 + p2.y**2) * (p3.y - p1.y) +
              (p3.x**2 + p3.y**2) * (p1.y - p2.y)) / d
        uy = ((p1.x**2 + p1.y**2) * (p3.x - p2.x) +
              (p2.x**2 + p2.y**2) * (p1.x - p3.x) +
              (p3.x**2 + p3.y**2) * (p2.x - p1.x)) / d
        r = math.sqrt((p1.x - ux)**2 + (p1.y - uy)**2)
        return (ux, uy), r
    
    def dist2(p, c):
        return (p.x - c[0])**2 + (p.y - c[1])**2
    
    def welzl_rec(points, boundary):
        if len(points) == 0 or len(boundary) == 3:
            if len(boundary) == 0:
                return (0, 0), -1
            elif len(boundary) == 1:
                return circle_from_1(boundary[0])
            elif len(boundary) == 2:
                return circle_from_2(boundary[0], boundary[1])
            else:
                return circle_from_3(boundary[0], boundary[1], boundary[2])
        
        # Pick a random point
        idx = random.randrange(len(points))
        p = points[idx]
        points[-1], points[idx] = points[idx], points[-1]  # Swap to end
        
        center, r = welzl_rec(points[:-1], boundary)
        
        if dist2(p, center) > r * r + 1e-12:  # Outside current circle
            boundary.append(p)
            center, r = welzl_rec(points[:-1], boundary)
            boundary.pop()
        
        return center, r
    
    return welzl_rec(shuffled, [])
```

**References:** > 📎 [Wikipedia: Welzl's algorithm](https://en.wikipedia.org/wiki/Smallest-circle_problem)

#### Concept 3: Sweep Line — Bentley-Ottmann (Concept)

**Intuition:** Finding all intersections among N line segments by sweeping a vertical line left-to-right. The sweep line maintains the order of segments it crosses; intersections occur when adjacent segments swap order.

**Key Components:**
- **Event queue:** segment endpoints (left/right) and intersection points
- **Status structure:** balanced BST of segments sorted by y at the sweep line position
- **Processing:** at each event, update the status and check newly-adjacent pairs for intersections

**Key Insight:** The algorithm reports only O((n+k) log n) events where k is the number of intersections. For most CP problems, a simpler O(n²) check suffices since intersection-heavy inputs are rare.

**Edge Cases:** Vertical segments, multiple segments intersecting at the same point, overlapping collinear segments.

**Complexity:** O((n + k) log n) where k = number of intersections.

**Python (simplified):**
```python
# Simplified line sweep for segment intersections
# Full Bentley-Ottmann is ~300 lines. Most CP problems use simpler approaches.

def sweep_intersections(segments):
    """Return list of intersection points. Simplified: only checks
    adjacent segments in the sweep status. Full BO not shown."""
    events = []
    for i, (a, b) in enumerate(segments):
        events.append((min(a.x, b.x), 0, i, a, b))
        events.append((max(a.x, b.x), 2, i, a, b))
    events.sort()
    # ... status structure with balanced BST ...
```

**References:** > 📎 [Wikipedia: Bentley-Ottmann](https://en.wikipedia.org/wiki/Bentley%E2%80%93Ottmann_algorithm)

#### Concept 4: Half-Plane Intersection

**Intuition:** Each line divides the plane into two half-planes (left and right). Given many half-planes, find the region that satisfies all of them simultaneously. The result is a convex polygon (possibly empty or unbounded).

**Derivation:** Sort lines by angle. Use a deque to maintain the intersection polygon. For each new line, pop from front/back if the intersection of previous lines is not on the correct side of the new line.

**Key Insight:** The intersection of convex regions is convex. Each half-plane is the region to one side of a line: `ax + by + c >= 0`.

**Edge Cases:** Empty intersection (infeasible), unbounded region (no intersection on some side), parallel half-planes.

**Complexity:** O(n log n) — dominated by sorting lines by angle.

**Python:**
```python
from dataclasses import dataclass
import math

@dataclass
class Line:
    a: float  # ax + by + c >= 0
    b: float
    c: float
    angle: float = None
    
    def __post_init__(self):
        self.angle = math.atan2(self.b, self.a)

def halfplane_intersection(lines):
    """Returns convex polygon of intersection. O(n log n)."""
    lines = sorted(lines, key=lambda l: l.angle)
    # Deque-based algorithm using cross product intersection
    # Each step: add line, then check if intersection of first two
    #    deque lines violates the new line → pop
    # Standard implementation ~50 lines
    pass
```

**References:** > 📎 [CP-Algorithms: Half-plane intersection](https://cp-algorithms.com/geometry/halfplane-intersection.html)

#### Concept 5: Minkowski Sum

**Intuition:** The Minkowski sum of two convex polygons A and B is the set {a + b | a ∈ A, b ∈ B}. Visually, drag one polygon around the boundary of the other; the swept area is the Minkowski sum. Used in collision detection: to check if two polygons overlap, check if origin is in their Minkowski difference.

**Derivation:** Take all edges from both polygons sorted by polar angle. Stitch them together — the result is another convex polygon. If A has m vertices and B has n vertices, the Minkowski sum has at most m + n vertices.

**Key Insight:** For convex polygons, Minkowski sum = convex hull of all pairwise sums, which is also the result of merging sorted edge vectors.

**Edge Cases:** Non-convex polygons (must be decomposed into convex parts first), degenerate polygons.

**Complexity:** O(m + n) after convex hull of each input.

**Python:**
```python
def minkowski_sum(A, B):
    """Minkowski sum of two convex polygons A, B (CCW)."""
    # Extract edge vectors from both polygons
    def get_edges(poly):
        n = len(poly)
        return [(poly[(i+1)%n].x - poly[i].x, poly[(i+1)%n].y - poly[i].y) for i in range(n)]
    
    edges_A = get_edges(A)
    edges_B = get_edges(B)
    
    # Merge edges sorted by polar angle
    merged = []
    i = j = 0
    while i < len(edges_A) and j < len(edges_B):
        if cross_angle(edges_A[i], edges_B[j]) >= 0:
            merged.append(edges_A[i])
            i += 1
        else:
            merged.append(edges_B[j])
            j += 1
    merged.extend(edges_A[i:])
    merged.extend(edges_B[j:])
    
    # Build polygon from merged edges starting at (0,0)
    result = [(0, 0)]
    for dx, dy in merged:
        result.append((result[-1][0] + dx, result[-1][1] + dy))
    
    return result[:-1]  # Remove duplicate of first point
```

**References:** > 📎 [Wikipedia: Minkowski addition](https://en.wikipedia.org/wiki/Minkowski_addition)

#### Concept 6: Delaunay Triangulation (Properties & Applications)

**Intuition:** Given a set of points, triangulate them so that no point lies inside the circumcircle of any triangle. The Delaunay triangulation maximizes the minimum angle of all triangles — avoiding skinny triangles.

**Key Properties:**
- Unique if no 4 points are co-circular
- The dual graph is the Voronoi diagram
- Maximizes the minimum angle
- Can be computed in O(n log n) with Bowyer-Watson or divide & conquer

**Applications:**
- Nearest neighbor queries: the Delaunay triangulation contains the MST and the relative neighborhood graph
- Interpolation: natural neighbor interpolation uses Voronoi cells
- Mesh generation: guarantees well-shaped triangles

**Edge Cases:** Co-circular points (non-unique triangulation), collinear points (degenerate).

**References:** > 📎 [Wikipedia: Delaunay triangulation](https://en.wikipedia.org/wiki/Delaunay_triangulation)

#### Concept 7: Voronoi Diagrams & Fortune's Algorithm

**Intuition:** Given "sites" on a plane, partition the plane into regions where each region contains all points closest to a particular site. The cell boundaries are perpendicular bisectors between neighboring sites.

**Fortune's Algorithm:** Sweep line + beach line (parabolic front). As the sweep line moves left to right, the beach line tracks the set of points equidistant from the sweep line and a site. Intersections of parabolic arcs (breakpoints) trace out Voronoi edges.

**Key Properties:**
- A Voronoi cell is a convex polygon (possibly unbounded)
- Each cell contains exactly one site
- Edges are on perpendicular bisectors of pairs of sites

**Edge Cases:** Multiple sites with same x-coordinate, collinear sites, sites forming a regular grid.

**Complexity:** O(n log n) for Fortune's algorithm.

**References:** > 📎 [Wikipedia: Fortune's algorithm](https://en.wikipedia.org/wiki/Fortune%27s_algorithm)

#### Concept 8: Geometric Median (Fermat-Weber Point)

**Intuition:** Find the point that minimizes the sum of Euclidean distances to all given points. Unlike the mean (minimizes squared distances), there's no closed form — requires iterative optimization.

**Derivation:** Weiszfeld's algorithm: start with an initial guess (e.g., the centroid), then iteratively update:
$x_{t+1} = \frac{\sum w_i x_i}{\sum w_i}$ where $w_i = 1 / \|x_i - x_t\|$

**Key Insight:** The update is a weighted average where weights are inverse distances. If the current estimate lands exactly on a data point, the denominator becomes infinite — we use a perturbed step.

**Edge Cases:** Estimate landing exactly on a data point (apply perturbation), points forming a collinear set, convergence criteria (relative change < ε).

**Complexity:** O(n · iterations) per test case; typically ~100 iterations suffice.

**Python:**
```python
import math

def geometric_median(points, eps=1e-8):
    """Weiszfeld's algorithm for geometric median."""
    x = sum(p.x for p in points) / len(points)
    y = sum(p.y for p in points) / len(points)
    
    for _ in range(200):
        num_x = num_y = denom = 0.0
        for p in points:
            d = math.sqrt((x - p.x)**2 + (y - p.y)**2)
            if d < eps:
                # Perturb: skip this point
                continue
            w = 1.0 / d
            num_x += w * p.x
            num_y += w * p.y
            denom += w
        
        if denom < eps:
            break
        
        nx = num_x / denom
        ny = num_y / denom
        
        if math.hypot(nx - x, ny - y) < eps:
            break
        
        x, y = nx, ny
    
    return x, y
```

**References:** > 📎 [Wikipedia: Geometric median](https://en.wikipedia.org/wiki/Geometric_median)

#### Concept 9: Quad Trees & Spatial Indexing

**Intuition:** Recursively subdivide the plane into four quadrants. Each node represents a rectangular region and either contains a single point or has 4 children. Queries like "find all points within radius r" can skip entire quadrants whose bounding box is too far.

**Key Uses:**
- Range queries (points within a rectangle/circle)
- Nearest neighbor search acceleration
- Collision detection broad phase

**Edge Cases:** Many points with same coordinates (infinite recursion — use depth limit), unbalanced distribution.

**Complexity:** O(log n) average for point queries, O(n) worst case.

**Python (concept):**
```python
class QuadTree:
    def __init__(self, x, y, w, h, capacity=4):
        self.bounds = (x, y, w, h)
        self.capacity = capacity
        self.points = []
        self.children = None
    
    def insert(self, pt):
        if not self._contains(pt):
            return False
        if len(self.points) < self.capacity and not self.children:
            self.points.append(pt)
            return True
        if not self.children:
            self._subdivide()
        for child in self.children:
            if child.insert(pt):
                return True
        return False
```

**References:** > 📎 [Wikipedia: Quadtree](https://en.wikipedia.org/wiki/Quadtree)

#### Concept 10: Hashing Geometry

**Intuition:** Many geometric problems reduce to counting pairs/triples with a given property. Hashing geometric primitives (slopes, midpoints, distances) gives O(1) lookups.

**Slope Hashing for Collinearity:**
```python
from math import gcd

def slope_key(dx, dy):
    """Reduced fraction representation of slope."""
    g = gcd(dx, dy)
    dx //= g
    dy //= g
    if dx < 0 or (dx == 0 and dy < 0):
        dx, dy = -dx, -dy
    return (dx, dy)
```

**Midpoint Hashing for Parallelograms:**
```python
from collections import Counter

def count_parallelograms(points):
    """Count parallelograms: pairs of points share the same midpoint."""
    midpoints = Counter()
    for i in range(len(points)):
        for j in range(i+1, len(points)):
            mid = ((points[i].x + points[j].x) / 2,
                   (points[i].y + points[j].y) / 2)
            midpoints[mid] += 1
    # Each pair of segments with same midpoint forms a parallelogram
    return sum(c * (c-1) // 2 for c in midpoints.values())
```

**Edge Cases:** Duplicate points (handle carefully — a pair of dupes has infinite midpoints), integer division vs float (use fractions.Fraction for exact rationals).

**References:** > 📎 [CP-Algorithms: Hashing geometry patterns](https://cp-algorithms.com/)

#### Concept 11: Floating Point Precision

**Intuition:** Floating point arithmetic is inexact. In geometry, this causes orientation tests to give wrong answers, intersection points to drift, and collinear checks to fail.

**Key Techniques:**
- Use epsilon comparisons: `abs(a - b) < eps` instead of `a == b`
- Use integer arithmetic when coordinates are integers (cross product is exact)
- Avoid division when possible (store slope as dx/dy pair, not quotient)
- Use `math.isclose()` and `math.inf` appropriately

**Python:**
```python
EPS = 1e-9

def eq(a, b): return abs(a - b) < EPS
def lt(a, b): return a < b - EPS
def le(a, b): return a <= b + EPS
def gt(a, b): return a > b + EPS
def ge(a, b): return a >= b - EPS
```

**Edge Cases:** Very close points (consider as duplicate if within EPS), nearly-collinear triples (use squared cross product with threshold), comparing to zero (use `abs(x) < EPS`).

**References:** > 📎 [CP-Algorithms: Precision](https://cp-algorithms.com/geometry/precision.html)

#### Concept 12: Geometry + DP / Geometry + Binary Search

**Intuition:** Geometry rarely appears in isolation in hard CP problems. The most challenging problems combine geometry with DP (e.g., "Making Shapes") or binary search (e.g., "Best Position for a Service Centre").

**Pattern: Geometry + Binary Search**
- Binary search on the answer (radius, distance, area)
- For each candidate value, run a geometric feasibility check
- Example: "What is the smallest circle covering K of N points?" → binary search R, check if any circle of radius R covers K points

**Pattern: Geometry + DP**
- State is often a geometric configuration (current point, direction, mask of visited points)
- DP over subsets of points with geometric constraints
- Example: "Making Shapes" — DP over polygons formed from subset of points, using area/angle constraints

**Pattern: Geometry + Sweep Line**
- Sort by x or angle
- Maintain a data structure (Fenwick, segment tree) over y-coordinates
- Classic: count orthogonal intersections, count points in axis-aligned rectangles

**Edge Cases:** Integer overflow in DP states (use big ints), floating point in binary search (use integer coordinates or rational bounds).

**References:** > 📎 [Codeforces: Making Shapes (3500)](https://codeforces.com/problemset/problem/1795/F)

### 🔍 3. PROBLEM RECOGNITION

**Keywords (Advanced):** "rotating calipers", "minimum enclosing circle", "sweep line", "intersection count", "half-plane", "Minkowski sum", "Voronoi", "Delaunay", "geometric median", "service centre", "spatial indexing", "quadtree"

**Interview framing (rare at this level):** "Best Position for a Service Centre" (LeetCode) — geometric median. "Self Crossing" (LeetCode) — sweep line for path self-intersection.

**Hidden indicators:**
- "Minimum radius to cover K points" → binary search + geometric check
- "Polygon with maximum area from subset" → DP + geometry
- "Does path cross itself?" → segment intersection on path edges
- "Minimum distance to travel visiting all points" → Steiner tree / geometric DP
- "Count rectangles among points" → midpoint hashing
- "Largest empty circle" → Voronoi vertex check
- "Minimum width corridor" → rotating calipers for width

### 🧩 4. PATTERN ANALYSIS

**Pattern 1: Rotating Calipers for Convex Polygon Measurements**
- **When to use:** Need diameter, width, min bounding rectangle, or max inscribed circle of a convex polygon
- **Complexity:** O(n) after convex hull (O(n log n) total)
- **Key insight:** Antipodal pairs advance monotonically — each vertex is visited once per full rotation

**Pattern 2: Binary Search on Geometric Answer**
- **When to use:** "Minimum radius/length/area such that some geometric condition holds"
- **Complexity:** O(log R × feasibility_check)
- **Key insight:** Feasibility check often simplifies to a different geometric problem (e.g., "can K points be covered by radius R" becomes "do K circles of radius R overlap?")

**Pattern 3: Minkowski Sum for Collision Detection**
- **When to use:** Check if two moving polygons intersect, compute configuration space obstacles
- **Complexity:** O(m + n) for convex polygons
- **Key insight:** Two convex bodies A and B intersect iff origin ∈ Minkowski difference A ⊕ (-B)

**Pattern 4: Geometric Hashing for Counting**
- **When to use:** Count parallelograms, maximum collinear points, symmetric pairs
- **Complexity:** O(n²) typically with hashing for O(1) per pair
- **Key insight:** Hash rational slopes, midpoints, squared distances using reduced fractions

**Pattern 5: Sweep Line + Data Structure**
- **When to use:** Count intersecting segments, points inside rectangles, nearest neighbor queries
- **Complexity:** O(n log n) typically
- **Key insight:** The sweep status structure is a BST keyed by y-coordinate at the current x

### ⚡ 5. BRUTE FORCE → OPTIMIZED

#### Problem 1: Best Position for a Service Centre (LeetCode) — Geometric Median

**Intuition:** Find a point (x, y) that minimizes the sum of Manhattan distances to all customer locations. Wait — the problem says "Euclidean distance"? Actually LeetCode's "Best Position for a Service Centre" minimizes Euclidean distance. That's the geometric median.

**Brute Force:** Try a grid of candidate positions — O(N × grid_resolution²), impractical for 10⁵ points.

**Why Slow:** Grid search has fixed resolution regardless of convergence. Points far apart require either huge grid or coarse precision.

**Optimization Step-by-Step (Weiszfeld):**
1. Start at the centroid (mean of all points)
2. Compute weighted average: weight = 1/distance for each point
3. Update position
4. Repeat until convergence (< ε change)
5. Return the answer

**Final Code:**
```python
def getMinDistSum(positions):
    n = len(positions)
    x = sum(p[0] for p in positions) / n
    y = sum(p[1] for p in positions) / n
    
    eps = 1e-8
    step = 1.0
    
    for _ in range(100):
        num_x = num_y = denom = 0.0
        for px, py in positions:
            d = math.hypot(px - x, py - y)
            if d < eps:
                continue
            w = 1.0 / d
            num_x += w * px
            num_y += w * py
            denom += w
        
        if denom < eps:
            break
        
        nx = num_x / denom
        ny = num_y / denom
        
        if math.hypot(nx - x, ny - y) < 1e-12:
            break
        x, y = nx, ny
    
    return math.sqrt(sum(math.hypot(px - x, py - y)**2 for px, py in positions))
```

**Edge Cases:** Single point (distance = 0), all points identical, estimate landing exactly on a data point.

**C++/Java:**
```cpp
double getMinDistSum(vector<vector<int>>& positions) {
    double x = 0, y = 0;
    for (auto& p : positions) { x += p[0]; y += p[1]; }
    x /= positions.size(); y /= positions.size();
    
    double eps = 1e-8;
    for (int iter = 0; iter < 100; iter++) {
        double num_x = 0, num_y = 0, denom = 0;
        for (auto& p : positions) {
            double d = hypot(p[0] - x, p[1] - y);
            if (d < eps) continue;
            double w = 1.0 / d;
            num_x += w * p[0];
            num_y += w * p[1];
            denom += w;
        }
        if (denom < eps) break;
        double nx = num_x / denom, ny = num_y / denom;
        if (hypot(nx - x, ny - y) < 1e-12) break;
        x = nx; y = ny;
    }
    
    double ans = 0;
    for (auto& p : positions)
        ans += hypot(p[0] - x, p[1] - y);
    return ans;
}
```

#### Problem 2: Minimum Enclosing Circle (Codeforces) — Welzl's

**Intuition:** Find the smallest circle covering all points. A slow approach: try all pairs (as diameter) and all triples (as circumcircles).

**Brute Force:**
```python
def mec_brute(points):
    n = len(points)
    best = None
    # Try all pairs as diameter
    for i in range(n):
        for j in range(i+1, n):
            cx, cy = (points[i].x + points[j].x)/2, (points[i].y + points[j].y)/2
            r = hypot(points[i].x - cx, points[i].y - cy)
            if all(hypot(p.x - cx, p.y - cy) <= r + 1e-9 for p in points):
                if best is None or r < best.r:
                    best = Circle(cx, cy, r)
    # Try all triples
    for i in range(n):
        for j in range(i+1, n):
            for k in range(j+1, n):
                cx, cy, r = circle_from_3(points[i], points[j], points[k])
                if all(hypot(p.x - cx, p.y - cy) <= r + 1e-9 for p in points):
                    if best is None or r < best.r:
                        best = Circle(cx, cy, r)
    return best
```

**Why Slow:** O(n⁴) — triple nested loops × validation of all n points.

**Optimization Step-by-Step (Welzl):**
1. Shuffle points for randomization
2. Recursively build the circle: if a point is outside the current circle, it must be on the boundary
3. When we have 3 boundary points, the circle is uniquely determined
4. Expected O(n), worst case O(n³) but never occurs with good randomization

**Final Code:** (see Core Concept 2 above for full Python implementation)

**Edge Cases:** 1-2 points, collinear points (the circumcircle from 3 collinear points has infinite radius — fall back to circle from 2 points).

**C++/Java:** Use `random_shuffle` or `shuffle` on the input vector; implement circle-from-2 and circle-from-3 using perpendicular bisectors.

### 🏆 6. CURATED PROBLEMS

| # | Problem | Platform | Difficulty | URL | Concepts |
|---|---|---|---|---|---|
| 1 | Best Position for a Service Centre | LeetCode | Hard | https://leetcode.com/problems/best-position-for-a-service-centre/ | Geometric median, Weiszfeld |
| 2 | Self Crossing | LeetCode | Hard | https://leetcode.com/problems/self-crossing/ | Sweep line, segment intersection |
| 3 | Minimum Enclosing Circle | Codeforces | 2400 | https://codeforces.com/problemset/problem/1059/E | Welzl's algorithm |
| 4 | Manhattan Triangle | Codeforces | 2700 | https://codeforces.com/problemset/problem/1730/E | Advanced distance, sweep line |
| 5 | Making Shapes | Codeforces | 3500 | https://codeforces.com/problemset/problem/1795/F | DP + geometry |
| 6 | Voronoi Diagrams | Kattis/SPOJ | Expert | https://open.kattis.com/problems/voronoi | Fortune's algorithm |

### ✏️ 7. PRACTICE PROBLEMS

**Problem 1:** Given N points, find the minimum-area axis-aligned rectangle that encloses at least K points.

**Solution:** Binary search on rectangle size? Actually, solution is O(N² log N): sort points by x, sweep x, maintain y-coordinates of points in the window in a Fenwick tree, binary search for the smallest y-range that covers K points. This is geometry + binary search + data structures.

**Problem 2:** Given the convex hull of N points, count the number of "antipodal pairs" (pairs of hull vertices with parallel supporting lines).

**Solution:** Use rotating calipers. For each edge of the hull, the advancing caliper point gives one antipodal pair. Count all distinct pairs. O(n) after hull (O(n log n) total).

**Problem 3:** Given N points, count the number of right triangles (triangles with exactly one 90° angle).

**Solution:** For each point as potential right angle vertex, hash slopes of vectors to all other points. For each slope, look for its negative reciprocal (perpendicular). Count pairs. O(N² log N) or O(N²) with hashing.

### 📝 8. CHAPTER QUIZ

**Q1:** What data structure does Fortune's algorithm use to maintain the beach line?
<details><summary>Answer</summary>A balanced BST (e.g., std::set) of parabolic arcs, keyed by x-coordinate of intersection points.
</details>

**Q2:** What is the expected time complexity of Welzl's minimum enclosing circle algorithm?
<details><summary>Answer</summary>O(n) expected, due to randomization shuffling points so that most points are inside the current circle.
</details>

**Q3:** In rotating calipers, how many times does each vertex become the "advancing" caliper point?
<details><summary>Answer</summary>Once per full rotation — the advancing point moves monotonically, visiting each vertex exactly once.
</details>

**Q4:** What is the maximum number of vertices in the Minkowski sum of two convex polygons with m and n vertices?
<details><summary>Answer</summary>m + n. Each edge from either polygon appears exactly once in the sum.
</details>

**Q5:** What does the geometric median minimize?
<details><summary>Answer</summary>The sum of Euclidean distances to all points: Σ ‖x - p_i‖ (not squared distances).
</details>

**Q6:** In Weiszfeld's algorithm, what happens when the current estimate lands on a data point?
<details><summary>Answer</summary>The weight for that point becomes 1/0 = ∞. The algorithm must skip or perturb around that point, using a sub-gradient step.
</details>

**Q7:** What makes the Delaunay triangulation "optimal" among triangulations?
<details><summary>Answer</summary>It maximizes the minimum angle, avoiding skinny triangles. It also minimizes the maximum circumradius.
</details>

**Q8:** What is the dual graph of a Voronoi diagram?
<details><summary>Answer</summary>The Delaunay triangulation of the same point set. Each Delaunay edge corresponds to adjacent Voronoi cells.
</details>

**Q9:** What does the slope hash (dx, dy) use to ensure a unique representation?
<details><summary>Answer</summary>Reduce by gcd, then normalize so that the first non-zero component is positive (or an arbitrary sign convention).
</details>

**Q10:** What is the recommended epsilon for floating point comparisons in competitive programming?
<details><summary>Answer</summary>1e-9 for double precision, though 1e-6 may suffice for coordinate magnitudes ≤ 10⁶.
</details>

### 🃏 9. FLASHCARDS

1. **Rotating calipers:** O(n) measurement of convex polygon diameter/width using antipodal pair monotonicity
2. **Welzl's MEC:** O(n) randomized — shuffle, if point outside current circle, recurse with it as boundary
3. **Bentley-Ottmann:** O((n+k) log n) sweep line for segment intersections; too complex for most CP — use O(n²) directly
4. **Half-plane intersection:** O(n log n) — sort lines by angle, deque-based clipping
5. **Minkowski sum:** O(m+n) — merge edge vectors sorted by angle; result has ≤ m+n vertices
6. **Geometric median:** No closed form; Weiszfeld: iterative weighted average with 1/distance weights
7. **Slope hashing:** store (dx/gcd, dy/gcd) with sign normalization — never store floating slopes
8. **Epsilon comparisons:** use `abs(a - b) < EPS` not `a == b`; EPS = 1e-9 for doubles
9. **Binary search + geometry:** search on radius R, check feasibility (can K points be covered?)
10. **DP + geometry:** DP over subsets with geometric constraints (area, angle, convexity)

### 📎 10. REFERENCES & FURTHER READING

- [LeetCode: Best Position for a Service Centre](https://leetcode.com/problems/best-position-for-a-service-centre/)
- [LeetCode: Self Crossing](https://leetcode.com/problems/self-crossing/)
- [Codeforces: Minimum Enclosing Circle (1059E)](https://codeforces.com/problemset/problem/1059/E)
- [Codeforces: Making Shapes (1795F)](https://codeforces.com/problemset/problem/1795/F)
- [Codeforces: Manhattan Triangle (1730E)](https://codeforces.com/problemset/problem/1730/E)
- [CP-Algorithms: Rotating calipers](https://cp-algorithms.com/geometry/rotating-calipers.html)
- [CP-Algorithms: Half-plane intersection](https://cp-algorithms.com/geometry/halfplane-intersection.html)
- [Wikipedia: Rotating calipers](https://en.wikipedia.org/wiki/Rotating_calipers)
- [Wikipedia: Welzl's algorithm](https://en.wikipedia.org/wiki/Smallest-circle_problem)
- [Wikipedia: Voronoi diagram](https://en.wikipedia.org/wiki/Voronoi_diagram)
- [Wikipedia: Delaunay triangulation](https://en.wikipedia.org/wiki/Delaunay_triangulation)
- [Wikipedia: Geometric median](https://en.wikipedia.org/wiki/Geometric_median)
- [Wikipedia: Minkowski addition](https://en.wikipedia.org/wiki/Minkowski_addition)
- [Wikipedia: Fortune's algorithm](https://en.wikipedia.org/wiki/Fortune%27s_algorithm)
- [Wikipedia: Quadtree](https://en.wikipedia.org/wiki/Quadtree)
- [Competitive Programming 3 — Chapter on Geometry](https://cpbook.net/)
- [Computational Geometry: Algorithms and Applications (de Berg et al.)](https://www.springer.com/gp/book/9783540779735)
- [Real-Time Collision Detection (Christer Ericson)](https://realtimecollisiondetection.net/)
