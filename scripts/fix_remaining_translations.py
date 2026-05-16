import json
import os

FILES = [
    "/home/rashid/projects/personal/dsa-inventory/public/data/geometry-book/introduction-to-shapes.json",
    "/home/rashid/projects/personal/dsa-inventory/public/data/geometry-book/basic-geometry.json",
    "/home/rashid/projects/personal/dsa-inventory/public/data/geometry-book/triangle-problems.json",
    "/home/rashid/projects/personal/dsa-inventory/public/data/geometry-book/right-triangle-problems.json",
    "/home/rashid/projects/personal/dsa-inventory/public/data/geometry-book/rectangle-and-square-problems.json",
]

def make_block(lang, code):
    return {"type": "code", "lang": lang, "code": code, "caption": None}

def fix_file(filepath):
    with open(filepath) as f:
        data = json.load(f)
    blocks = data["blocks"]
    basename = os.path.basename(filepath)
    
    fixes = []
    
    # ─── Find all code groups ───
    i = 0
    groups = []
    while i < len(blocks):
        if blocks[i]["type"] == "code" and blocks[i].get("lang"):
            start = i
            while i < len(blocks) and blocks[i]["type"] == "code" and blocks[i].get("lang"):
                i += 1
            groups.append((start, i, blocks[start:i]))
        else:
            i += 1
    
    print(f"{basename}: checking {len(groups)} code groups")
    
    for gs, ge, group in groups:
        existing_langs = {b["lang"] for b in group}
        ordered = ["python", "cpp", "java", "javascript"]
        missing = [l for l in ordered if l not in existing_langs]
        if not missing:
            continue
        
        # Find the python block (or first block)
        python_block = None
        for b in group:
            if b["lang"] == "python":
                python_block = b
                break
        if not python_block:
            python_block = group[0]
        
        code = python_block["code"].strip()
        
        # Get context (look back up to 10 blocks for heading)
        context = ""
        for lookback in range(max(0, gs - 10), gs):
            if blocks[lookback]["type"] == "heading":
                context = blocks[lookback].get("text", "")
                break
        
        # Try to get heading even further back
        if not any(keyword in context for keyword in ["Template", "Problem", "Pattern"]):
            for lookback in range(max(0, gs - 15), gs):
                if blocks[lookback]["type"] == "heading":
                    h = blocks[lookback].get("text", "")
                    if "Template" in h or "Problem" in h or "Pattern" in h:
                        context = h
                        break
        
        translation = get_translation(code, missing, context, basename)
        if translation:
            # Insert after the group end
            insert_after = ge
            for ml in missing:
                new_block = make_block(ml, translation[ml])
                blocks.insert(insert_after, new_block)
                insert_after += 1
            print(f"  Fixed group [{gs}:{ge}] +{list(translation.keys())} (ctx: {context[:50]})")
    
    data["blocks"] = blocks
    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2)

def get_translation(code, missing_langs, context, basename):
    """Return dict {lang: code_string} for missing translations, or None if can't."""
    result = {}
    
    for ml in missing_langs:
        t = get_single_translation(code, ml, context, basename)
        if t:
            result[ml] = t
    
    return result if result else None

def get_single_translation(code, lang, context, basename):
    """Get translation for a single missing language."""
    
    # ===== INTRODUCTION TO SHAPES =====
    if basename == "introduction-to-shapes.json":
        
        # Template 5: Projection Area (the inline-sums version)
        if 'def projection_area(grid)' in code and 'top = sum(1' in code:
            if lang == "cpp":
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
            if lang == "java":
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
        
        # Problem 1: Vlad and Shapes - python code that starts with def solve() and reads grid
        if "def solve()" in code and "grid[i][j] == '1'" in code:
            if lang == "javascript":
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
    
    # ===== BASIC GEOMETRY =====
    if basename == "basic-geometry.json":
        
        # Section 2.1: Simple Point class
        if code == "class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y":
            if lang == "cpp":
                return """struct Point {
    double x, y;
    Point(double x, double y) : x(x), y(y) {}
};"""
            if lang == "java":
                return """class Point {
    double x, y;
    Point(double x, double y) { this.x = x; this.y = y; }
}"""
            if lang == "javascript":
                return """class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}"""
        
        # Section 2.2: Distance function
        if code.startswith("import math") and "def distance(p1, p2):" in code:
            if lang == "cpp":
                return """#include <cmath>

double distance(pair<double,double> p1, pair<double,double> p2) {
    double dx = p2.first - p1.first;
    double dy = p2.second - p1.second;
    return sqrt(dx*dx + dy*dy);
}"""
            if lang == "java":
                return """public double distance(int[] p1, int[] p2) {
    double dx = p2[0] - p1[0];
    double dy = p2[1] - p1[1];
    return Math.sqrt(dx*dx + dy*dy);
}"""
            if lang == "javascript":
                return """function distance(p1, p2) {
    const dx = p2[0] - p1[0], dy = p2[1] - p1[1];
    return Math.sqrt(dx*dx + dy*dy);
}"""
        
        # Template 1 (full Point class with cross/dist): need javascript
        if "class Point" in code and "static double cross" not in code and "static double dist" not in code and "constructor" not in code:
            # This is the long template - the combined python template
            if "def cross(o: Point, a: Point, b: Point) -> float:" in code or "def cross(o, a, b):" in code:
                if lang == "javascript":
                    return """function dist2(p1, p2) {
    const dx = p2[0] - p1[0], dy = p2[1] - p1[1];
    return dx*dx + dy*dy;
}

function dist(p1, p2) {
    return Math.sqrt(dist2(p1, p2));
}

function cross(o, a, b) {
    return (a[0]-o[0])*(b[1]-o[1]) - (a[1]-o[1])*(b[0]-o[0]);
}

function dot(a, b) {
    return a[0]*b[0] + a[1]*b[1];
}

function collinear(a, b, c) {
    return Math.abs(cross(a, b, c)) < 1e-9;
}"""
        
        # Template 2: Segment Intersection (with type annotations)
        if "def on_segment(p:" in code:
            if lang == "cpp":
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
            if lang == "java":
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
            if lang == "javascript":
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
        
        # Template 3: Shoelace (with type annotations)
        if "def polygon_area(vertices" in code:
            if lang == "cpp":
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
            if lang == "java":
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
            if lang == "javascript":
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
        
        # Template 4: Point in Convex Polygon (with type annotations)
        if "def point_in_convex_polygon(pt" in code:
            if lang == "cpp":
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
            if lang == "java":
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
            if lang == "javascript":
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
            if lang == "cpp":
                return """#include <vector>
#include <algorithm>
using namespace std;

bool rectOverlap(vector<int>& r1, vector<int>& r2) {
    return !(r1[2] <= r2[0] || r1[0] >= r2[2] || r1[3] <= r2[1] || r1[1] >= r2[3]);
}"""
            if lang == "java":
                return """public boolean rectOverlap(int[] r1, int[] r2) {
    return !(r1[2] <= r2[0] || r1[0] >= r2[2] || r1[3] <= r2[1] || r1[1] >= r2[3]);
}"""
            if lang == "javascript":
                return """function rectOverlap(r1, r2) {
    return !(r1[2] <= r2[0] || r1[0] >= r2[2] || r1[3] <= r2[1] || r1[1] >= r2[3]);
}"""
        
        # Template 6: Triangle Angles (with type annotations)
        if "def triangle_angles(a: float, b: float, c: float)" in code:
            if lang == "cpp":
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
            if lang == "java":
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
            if lang == "javascript":
                return """function triangleAngles(a, b, c) {
    return [
        Math.acos((b*b + c*c - a*a) / (2*b*c)),
        Math.acos((a*a + c*c - b*b) / (2*a*c)),
        Math.acos((a*a + b*b - c*c) / (2*a*b))
    ];
}"""
        
        # Problem 1: Valid Boomerang - already handled by main script
        # Problem 2: Crazy Town
        if "f1 = a * x1 + b * y1 + c" in code:
            if lang == "cpp":
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
            if lang == "java":
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
            if lang == "javascript":
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
        
        # Problem 3: Bovine Dilemma
        if "areas = set()" in code and "abs(xs[i] - xs[j])" in code:
            if lang == "cpp":
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
            if lang == "java":
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
            if lang == "javascript":
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
        
        # Problem 4: Where do I Turn?
        if "cross = (bx - ax)*(cy - by) - (by - ay)*(cx - bx)" in code:
            if lang == "cpp":
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
            if lang == "java":
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
            if lang == "javascript":
                return """function solve(input) {
    const [ax, ay, bx, by, cx, cy] = input.trim().split(/\\s+/).map(Number);
    const cross = (bx - ax) * (cy - by) - (by - ay) * (cx - bx);
    if (cross > 0) console.log("LEFT");
    else if (cross < 0) console.log("RIGHT");
    else console.log("TOWARDS");
}"""
        
        # Problem 5: White Sheet
        if "def intersect(r1, r2)" in code and "def area(r)" in code and "white = tuple(map(int, input().split()))" in code:
            if lang == "cpp":
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
            if lang == "java":
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
            if lang == "javascript":
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
        
        # Problem 6: Tell Your World
        if "def solve()" in code and "def slope(i, j):" in code and "def check_with_slope(s):" in code:
            if lang == "cpp":
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
            if lang == "java":
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
            if lang == "javascript":
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


if __name__ == "__main__":
    for fp in FILES:
        fix_file(fp)
    print("\nDone fixing remaining translations.")
