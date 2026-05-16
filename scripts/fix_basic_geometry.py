#!/usr/bin/env python3
"""Fix basic-geometry.json: remove duplicate templates, add missing translations."""

import json

PATH = 'public/data/geometry-book/basic-geometry.json'

with open(PATH) as f:
    data = json.load(f)
blocks = data['blocks']

print(f'Original: {len(blocks)} blocks')

# Step 1: Remove blocks 87-95 (duplicate 3-template block before Template 1 heading)
# These are 9 blocks: Segment(cpp,java), Polygon(cpp,java), Convex(cpp,java,js,js,js)
del blocks[87:96]

print(f'After step 1: {len(blocks)} blocks')

# After step 1:
# [87] Template 1 heading
# [88-91] T1: python, cpp, java, js ✓
# [92-102] leaked duplicates (11 blocks of Segment/Polygon/Convex templates)
# [103] Template 2 heading
# [104-107] T2: cpp, java, js, python (note: cpp+java+js are triangleAngles, python is on_segment)
# [108] Template 3 heading
# [109] T3: python alone (polygon_area)
# [110] Template 4 heading
# [111] T4: python alone (point_in_convex_polygon)
# [112] Template 5 heading
# [113-116] T5: python, cpp, java, js ✓
# [117] Template 6 heading
# [118] T6: python alone (triangle_angles)

# Step 2: Remove leaked template duplicates from Template 1 section (indices 92-102)
del blocks[92:103]

print(f'After step 2: {len(blocks)} blocks')

# After step 2:
# [87] Template 1 heading
# [88-91] T1: python, cpp, java, js ✓
# [92] Template 2 heading
# [93-96] T2: cpp, java, js, python — 4 langs but content is wrong (js+python don't match cpp+java)
# [97] Template 3 heading
# [98] T3: python alone (polygon_area)
# [99] Template 4 heading
# [100] T4: python alone (point_in_convex_polygon)
# [101] Template 5 heading
# [102-105] T5: python, cpp, java, js ✓
# [106] Template 6 heading
# [107] T6: python alone (triangle_angles)

# Step 3: Fix Template 2 — it has cpp, java, js (triangleAngles) + python (on_segment)
# The template is "Segment Intersection" — triangleAngles doesn't belong here.
# Remove blocks 93-95 (cpp, java, js) and keep only the python on_segment at 96
# Actually, the cpp/java/js are wrong content for Template 2. Remove them.
del blocks[93:96]
# Now: [92] Template 2 heading, [93] python alone
# Need to add cpp, java, js for segment intersection

print(f'After fixing T2 wrong content: {len(blocks)} blocks')

# Now layout:
# [93] T2: python alone (on_segment)
# [94] Template 3 heading
# [95] T3: python alone (polygon_area)
# [96] Template 4 heading
# [97] T4: python alone (point_in_convex_polygon)
# [98] Template 5 heading
# [99-102] T5: python, cpp, java, js ✓
# [103] Template 6 heading
# [104] T6: python alone (triangle_angles)

# Step 4: Add translations

TO_SEG_CPP = """bool onSegment(vector<int> a, vector<int> b, vector<int> c) {
    return min(a[0], b[0]) <= c[0] && c[0] <= max(a[0], b[0]) &&
           min(a[1], b[1]) <= c[1] && c[1] <= max(a[1], b[1]);
}

double cross(vector<int> o, vector<int> a, vector<int> b) {
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
}

bool segmentsIntersect(vector<int> p1, vector<int> p2, vector<int> p3, vector<int> p4) {
    double o1 = cross(p1, p2, p3), o2 = cross(p1, p2, p4);
    double o3 = cross(p3, p4, p1), o4 = cross(p3, p4, p2);
    if (o1 * o2 < 0 && o3 * o4 < 0) return true;
    if (o1 == 0 && onSegment(p1, p3, p2)) return true;
    if (o2 == 0 && onSegment(p1, p4, p2)) return true;
    if (o3 == 0 && onSegment(p3, p1, p4)) return true;
    if (o4 == 0 && onSegment(p3, p2, p4)) return true;
    return false;
}"""

TO_SEG_JAVA = """import java.util.*;

class SegmentUtils {
    static boolean onSegment(int[] a, int[] b, int[] c) {
        return Math.min(a[0], b[0]) <= c[0] && c[0] <= Math.max(a[0], b[0]) &&
               Math.min(a[1], b[1]) <= c[1] && c[1] <= Math.max(a[1], b[1]);
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

TO_SEG_JS = """function onSegment(a, b, c) {
    return Math.min(a[0], b[0]) <= c[0] && c[0] <= Math.max(a[0], b[0]) &&
           Math.min(a[1], b[1]) <= c[1] && c[1] <= Math.max(a[1], b[1]);
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

# Insert T2 translations after index 93 (python on_segment)
ins = 94
blocks.insert(ins, {"type": "code", "lang": "cpp", "code": TO_SEG_CPP, "caption": None}); ins += 1
blocks.insert(ins, {"type": "code", "lang": "java", "code": TO_SEG_JAVA, "caption": None}); ins += 1
blocks.insert(ins, {"type": "code", "lang": "javascript", "code": TO_SEG_JS, "caption": None})

print(f'After adding T2 translations: {len(blocks)} blocks')

# Now layout after T2 insertions:
# [94] T2: python, cpp, java, js ✓
# [97] Template 3 heading
# [98] T3: python alone (polygon_area)
# ...

# Template 3: polygon_area — add cpp, java, js
TO_PA_CPP = """double polygonArea(vector<pair<double,double>>& vertices) {
    int n = vertices.size();
    double area = 0.0;
    for (int i = 0; i < n; i++) {
        int j = (i + 1) % n;
        area += vertices[i].first * vertices[j].second;
        area -= vertices[j].first * vertices[i].second;
    }
    return abs(area) / 2.0;
}"""

TO_PA_JAVA = """public double polygonArea(List<double[]> vertices) {
    int n = vertices.size();
    double area = 0.0;
    for (int i = 0; i < n; i++) {
        int j = (i + 1) % n;
        area += vertices.get(i)[0] * vertices.get(j)[1];
        area -= vertices.get(j)[0] * vertices.get(i)[1];
    }
    return Math.abs(area) / 2.0;
}"""

TO_PA_JS = """function polygonArea(vertices) {
    const n = vertices.length;
    let area = 0.0;
    for (let i = 0; i < n; i++) {
        const j = (i + 1) % n;
        area += vertices[i][0] * vertices[j][1];
        area -= vertices[j][0] * vertices[i][1];
    }
    return Math.abs(area) / 2.0;
}"""

ins = 99  # after T3 python block
blocks.insert(ins, {"type": "code", "lang": "cpp", "code": TO_PA_CPP, "caption": None}); ins += 1
blocks.insert(ins, {"type": "code", "lang": "java", "code": TO_PA_JAVA, "caption": None}); ins += 1
blocks.insert(ins, {"type": "code", "lang": "javascript", "code": TO_PA_JS, "caption": None})

# Template 4: point_in_convex_polygon
TO_CV_CPP = """#include <vector>
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

TO_CV_JAVA = """import java.util.*;

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

TO_CV_JS = """function cross(o, a, b) {
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

ins = 104  # after T4 python block (insertion shifted indices)
blocks.insert(ins, {"type": "code", "lang": "cpp", "code": TO_CV_CPP, "caption": None}); ins += 1
blocks.insert(ins, {"type": "code", "lang": "java", "code": TO_CV_JAVA, "caption": None}); ins += 1
blocks.insert(ins, {"type": "code", "lang": "javascript", "code": TO_CV_JS, "caption": None})

# Template 6: triangle_angles — add cpp, java, js
TO_TA_CPP = """#include <vector>
#include <cmath>
using namespace std;

vector<double> triangleAngles(double a, double b, double c) {
    return {
        acos((b*b + c*c - a*a) / (2*b*c)),
        acos((a*a + c*c - b*b) / (2*a*c)),
        acos((a*a + b*b - c*c) / (2*a*b))
    };
}"""

TO_TA_JAVA = """import java.util.*;

class TriangleUtils {
    static List<Double> triangleAngles(double a, double b, double c) {
        return Arrays.asList(
            Math.acos((b*b + c*c - a*a) / (2*b*c)),
            Math.acos((a*a + c*c - b*b) / (2*a*c)),
            Math.acos((a*a + b*b - c*c) / (2*a*b))
        );
    }
}"""

TO_TA_JS = """function triangleAngles(a, b, c) {
    return [
        Math.acos((b*b + c*c - a*a) / (2*b*c)),
        Math.acos((a*a + c*c - b*b) / (2*a*c)),
        Math.acos((a*a + b*b - c*c) / (2*a*b))
    ];
}"""

ins = 114  # after T6 python block
blocks.insert(ins, {"type": "code", "lang": "cpp", "code": TO_TA_CPP, "caption": None}); ins += 1
blocks.insert(ins, {"type": "code", "lang": "java", "code": TO_TA_JAVA, "caption": None}); ins += 1
blocks.insert(ins, {"type": "code", "lang": "javascript", "code": TO_TA_JS, "caption": None})

data['blocks'] = blocks

with open(PATH, 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f'Saved: {len(blocks)} blocks')
print('Done!')
