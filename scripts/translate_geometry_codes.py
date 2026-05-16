#!/usr/bin/env python3
"""Add missing language code blocks to geometry book chapter JSON files."""

import json
import sys
import os

REQUIRED = ['python', 'cpp', 'java', 'javascript']
ALL_LANGS_SET = set(REQUIRED)
LANG_ORDER = {'python': 0, 'cpp': 1, 'java': 2, 'javascript': 3}

def find_consecutive_code_groups(blocks):
    """Find consecutive groups of code blocks with different lang values."""
    groups = []
    i = 0
    while i < len(blocks):
        if blocks[i].get('type') == 'code' and blocks[i].get('lang', '').strip():
            group = []
            while i < len(blocks) and blocks[i].get('type') == 'code' and blocks[i].get('lang', '').strip():
                group.append(blocks[i])
                i += 1
            groups.append(group)
        else:
            i += 1
    return groups

def get_missing_langs(group):
    present = set(b['lang'] for b in group)
    return sorted([l for l in REQUIRED if l not in present], key=lambda l: LANG_ORDER[l])

def run():
    base = '/home/rashid/projects/personal/dsa-inventory/public/data/geometry-book'
    files = [
        'circle-problems.json',
        'coordinate-geometry.json',
        'lines-and-slopes.json',
        'distance-and-midpoint.json',
        'polygon-problems.json',
    ]
    
    for fname in files:
        path = os.path.join(base, fname)
        print(f"\n{'='*60}")
        print(f"Processing: {fname}")
        print('='*60)
        
        with open(path) as f:
            data = json.load(f)
        
        blocks = data['blocks']
        
        # We'll build new_blocks by walking through, inserting translations after groups
        new_blocks = []
        i = 0
        added_count = 0
        
        while i < len(blocks):
            # Check if this starts a code group
            if blocks[i].get('type') == 'code' and blocks[i].get('lang', '').strip():
                group = []
                start = i
                while i < len(blocks) and blocks[i].get('type') == 'code' and blocks[i].get('lang', '').strip():
                    group.append(blocks[i])
                    i += 1
                
                missing = get_missing_langs(group)
                
                if missing:
                    # The existing blocks stay as-is
                    new_blocks.extend(group)
                    
                    # Generate new blocks for missing languages
                    # We need to look at context to understand what algorithm this is
                    # Let's capture surrounding text for identification
                    context_before = ''
                    for j in range(len(new_blocks) - len(group) - 1, max(-1, len(new_blocks) - len(group) - 5), -1):
                        if new_blocks[j].get('type') == 'heading':
                            context_before = new_blocks[j].get('text', '')
                            break
                    
                    new_blocks_for_group = generate_translations(fname, group, missing, context_before)
                    new_blocks.extend(new_blocks_for_group)
                    added_count += len(new_blocks_for_group)
                    
                    print(f"  Group '{context_before[:60]}': missing {missing}, added {len(new_blocks_for_group)} blocks")
                else:
                    new_blocks.extend(group)
            else:
                new_blocks.append(blocks[i])
                i += 1
        
        data['blocks'] = new_blocks
        
        with open(path, 'w') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        print(f"  Total added: {added_count} code blocks")
    
    print("\nDone!")

# ============================================================
# Translation generators for each file
# ============================================================

def generate_translations(fname, group, missing, context_before):
    """Generate missing code blocks for a group based on context."""
    lang_map = {b['lang']: b['code'] for b in group}
    
    if fname == 'circle-problems.json':
        return gen_circle(group, missing, context_before, lang_map)
    elif fname == 'coordinate-geometry.json':
        return gen_coordinate(group, missing, context_before, lang_map)
    elif fname == 'lines-and-slopes.json':
        return gen_lines(group, missing, context_before, lang_map)
    elif fname == 'distance-and-midpoint.json':
        return gen_distance(group, missing, context_before, lang_map)
    elif fname == 'polygon-problems.json':
        return gen_polygon(group, missing, context_before, lang_map)
    return []

def make_blocks(missing, code_map):
    """Create code block dicts for missing languages."""
    result = []
    for lang in missing:
        if lang in code_map:
            result.append({
                "type": "code",
                "lang": lang,
                "code": code_map[lang],
                "caption": None
            })
    return result

# ============================================================
# CIRCLE PROBLEMS
# ============================================================
def gen_circle(group, missing, ctx, lang_map):
    code = {}
    
    if 'point_in_circle' in lang_map.get('python', '') or 'point_in_circle' in ctx:
        # 5.1 Point-Circle Distance
        code['cpp'] = """bool pointInCircle(int px, int py, int cx, int cy, int r) {
    int dx = px - cx, dy = py - cy;
    return dx * dx + dy * dy <= r * r;
}"""
        code['java'] = """public static boolean pointInCircle(int px, int py, int cx, int cy, int r) {
    int dx = px - cx, dy = py - cy;
    return dx * dx + dy * dy <= r * r;
}"""
        code['javascript'] = """function pointInCircle(px, py, cx, cy, r) {
    const dx = px - cx, dy = py - cy;
    return dx * dx + dy * dy <= r * r;
}"""
    
    elif 'circles_intersect' in lang_map.get('python', '') or 'Circle-Circle' in ctx:
        code['cpp'] = """bool circlesIntersect(int cx1, int cy1, int r1, int cx2, int cy2, int r2) {
    long long dx = cx1 - cx2, dy = cy1 - cy2;
    long long dSq = dx * dx + dy * dy;
    long long rSum = r1 + r2;
    long long rDiff = abs(r1 - r2);
    return dSq <= rSum * rSum && dSq >= rDiff * rDiff;
}"""
        code['java'] = """public static boolean circlesIntersect(int cx1, int cy1, int r1, int cx2, int cy2, int r2) {
    long dx = cx1 - cx2, dy = cy1 - cy2;
    long dSq = dx * dx + dy * dy;
    long rSum = r1 + r2;
    long rDiff = Math.abs(r1 - r2);
    return dSq <= rSum * rSum && dSq >= rDiff * rDiff;
}"""
        code['javascript'] = """function circlesIntersect(cx1, cy1, r1, cx2, cy2, r2) {
    const dx = cx1 - cx2, dy = cy1 - cy2;
    const dSq = dx * dx + dy * dy;
    const rSum = r1 + r2;
    const rDiff = Math.abs(r1 - r2);
    return dSq <= rSum * rSum && dSq >= rDiff * rDiff;
}"""
    
    elif 'welzl' in lang_map.get('python', '').lower() or 'Minimum Enclosing' in ctx:
        code['cpp'] = """#include <bits/stdc++.h>
using namespace std;

mt19937 rng(chrono::steady_clock::now().time_since_epoch().count());

struct Circle { double cx, cy, r; };

double dist(double x1, double y1, double x2, double y2) {
    return hypot(x2 - x1, y2 - y1);
}

Circle trivial(vector<pair<double,double>>& R) {
    if (R.empty()) return {0, 0, 0};
    if (R.size() == 1) return {R[0].first, R[0].second, 0};
    if (R.size() == 2) {
        double cx = (R[0].first + R[1].first) / 2;
        double cy = (R[0].second + R[1].second) / 2;
        double d = dist(R[0].first, R[0].second, R[1].first, R[1].second);
        return {cx, cy, d / 2};
    }
    auto [x1,y1] = R[0]; auto [x2,y2] = R[1]; auto [x3,y3] = R[2];
    double d = 2 * (x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2));
    if (abs(d) < 1e-12) return {0, 0, 1e18};
    double ux = ((x1*x1+y1*y1)*(y2-y3) + (x2*x2+y2*y2)*(y3-y1) + (x3*x3+y3*y3)*(y1-y2)) / d;
    double uy = ((x1*x1+y1*y1)*(x3-x2) + (x2*x2+y2*y2)*(x1-x3) + (x3*x3+y3*y3)*(x2-x1)) / d;
    return {ux, uy, dist(ux, uy, x1, y1)};
}

bool pointInCircle(double px, double py, double cx, double cy, double r) {
    double dx = px - cx, dy = py - cy;
    return dx*dx + dy*dy <= r*r + 1e-9;
}

Circle welzl(vector<pair<double,double>> P) {
    function<Circle(vector<pair<double,double>>,vector<pair<double,double>>)> solve =
        [&](vector<pair<double,double>> P, vector<pair<double,double>> R) -> Circle {
        if (P.empty() || R.size() == 3) return trivial(R);
        auto p = P.back(); P.pop_back();
        auto c = solve(P, R);
        if (pointInCircle(p.first, p.second, c.cx, c.cy, c.r + 1e-9)) return c;
        R.push_back(p);
        return solve(P, R);
    };
    shuffle(P.begin(), P.end(), rng);
    return solve(P, {});
}"""
        code['java'] = """import java.util.*;

class Circle {
    double cx, cy, r;
    Circle(double cx, double cy, double r) { this.cx = cx; this.cy = cy; this.r = r; }
}

public class Welzl {
    static Random rand = new Random();
    
    static double dist(double x1, double y1, double x2, double y2) {
        return Math.hypot(x2 - x1, y2 - y1);
    }
    
    static Circle trivial(List<double[]> R) {
        if (R.isEmpty()) return new Circle(0, 0, 0);
        if (R.size() == 1) return new Circle(R.get(0)[0], R.get(0)[1], 0);
        if (R.size() == 2) {
            double cx = (R.get(0)[0] + R.get(1)[0]) / 2;
            double cy = (R.get(0)[1] + R.get(1)[1]) / 2;
            double d = dist(R.get(0)[0], R.get(0)[1], R.get(1)[0], R.get(1)[1]);
            return new Circle(cx, cy, d / 2);
        }
        double x1 = R.get(0)[0], y1 = R.get(0)[1];
        double x2 = R.get(1)[0], y2 = R.get(1)[1];
        double x3 = R.get(2)[0], y3 = R.get(2)[1];
        double d = 2 * (x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2));
        if (Math.abs(d) < 1e-12) return new Circle(0, 0, Double.MAX_VALUE);
        double ux = ((x1*x1+y1*y1)*(y2-y3) + (x2*x2+y2*y2)*(y3-y1) + (x3*x3+y3*y3)*(y1-y2)) / d;
        double uy = ((x1*x1+y1*y1)*(x3-x2) + (x2*x2+y2*y2)*(x1-x3) + (x3*x3+y3*y3)*(x2-x1)) / d;
        return new Circle(ux, uy, dist(ux, uy, x1, y1));
    }
    
    static boolean pointInCircle(double px, double py, double cx, double cy, double r) {
        double dx = px - cx, dy = py - cy;
        return dx*dx + dy*dy <= r*r + 1e-9;
    }
    
    static Circle solve(List<double[]> P, List<double[]> R) {
        if (P.isEmpty() || R.size() == 3) return trivial(R);
        List<double[]> P2 = new ArrayList<>(P);
        double[] p = P2.remove(P2.size() - 1);
        Circle c = solve(P2, R);
        if (pointInCircle(p[0], p[1], c.cx, c.cy, c.r + 1e-9)) return c;
        List<double[]> R2 = new ArrayList<>(R);
        R2.add(p);
        return solve(P2, R2);
    }
    
    static Circle welzl(double[][] pts) {
        List<double[]> P = new ArrayList<>(Arrays.asList(pts));
        Collections.shuffle(P, rand);
        return solve(P, new ArrayList<>());
    }
}"""
        code['javascript'] = """function dist(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
}

function trivial(R) {
    if (R.length === 0) return {cx: 0, cy: 0, r: 0};
    if (R.length === 1) return {cx: R[0][0], cy: R[0][1], r: 0};
    if (R.length === 2) {
        const cx = (R[0][0] + R[1][0]) / 2;
        const cy = (R[0][1] + R[1][1]) / 2;
        const d = dist(R[0][0], R[0][1], R[1][0], R[1][1]);
        return {cx, cy, r: d / 2};
    }
    const [x1, y1] = R[0], [x2, y2] = R[1], [x3, y3] = R[2];
    const d = 2 * (x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2));
    if (Math.abs(d) < 1e-12) return {cx: 0, cy: 0, r: Infinity};
    const ux = ((x1*x1+y1*y1)*(y2-y3) + (x2*x2+y2*y2)*(y3-y1) + (x3*x3+y3*y3)*(y1-y2)) / d;
    const uy = ((x1*x1+y1*y1)*(x3-x2) + (x2*x2+y2*y2)*(x1-x3) + (x3*x3+y3*y3)*(x2-x1)) / d;
    return {cx: ux, cy: uy, r: dist(ux, uy, x1, y1)};
}

function pointInCircle(px, py, cx, cy, r) {
    const dx = px - cx, dy = py - cy;
    return dx * dx + dy * dy <= r * r + 1e-9;
}

function solve(P, R) {
    if (P.length === 0 || R.length === 3) return trivial(R);
    const p = P.pop();
    const c = solve([...P], [...R]);
    if (pointInCircle(p[0], p[1], c.cx, c.cy, c.r + 1e-9)) return c;
    R.push(p);
    return solve([...P], [...R]);
}

function welzl(points) {
    const P = [...points];
    for (let i = P.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [P[i], P[j]] = [P[j], P[i]];
    }
    const c = solve(P, []);
    return [c.cx, c.cy, c.r];
}"""
    
    elif 'max_points_in_circle' in lang_map.get('python', '') or 'Angular Sweep' in ctx:
        code['cpp'] = """int maxPointsInCircle(vector<pair<int,int>>& points, int cx, int cy, int r) {
    int n = points.size(), maxCount = 0;
    for (int i = 0; i < n; i++) {
        vector<pair<double,int>> angles;
        for (int j = 0; j < n; j++) {
            if (i == j) continue;
            double dx = points[j].first - points[i].first;
            double dy = points[j].second - points[i].second;
            double dSq = dx*dx + dy*dy;
            if (dSq > 4.0 * r * r) continue;
            double a = atan2(dy, dx);
            double delta = acos(sqrt(dSq) / (2.0 * r));
            angles.push_back({a - delta, 1});
            angles.push_back({a + delta, -1});
        }
        sort(angles.begin(), angles.end());
        int cnt = 1;
        for (auto [_, typ] : angles) {
            cnt += typ;
            maxCount = max(maxCount, cnt);
        }
    }
    return maxCount;
}"""
        code['java'] = """public static int maxPointsInCircle(int[][] points, int cx, int cy, int r) {
    int n = points.length, maxCount = 0;
    for (int i = 0; i < n; i++) {
        List<double[]> angles = new ArrayList<>();
        for (int j = 0; j < n; j++) {
            if (i == j) continue;
            double dx = points[j][0] - points[i][0];
            double dy = points[j][1] - points[i][1];
            double dSq = dx*dx + dy*dy;
            if (dSq > 4.0 * r * r) continue;
            double a = Math.atan2(dy, dx);
            double delta = Math.acos(Math.sqrt(dSq) / (2.0 * r));
            angles.add(new double[]{a - delta, 1});
            angles.add(new double[]{a + delta, -1});
        }
        angles.sort((x, y) -> Double.compare(x[0], y[0]));
        int cnt = 1;
        for (double[] ang : angles) {
            cnt += (int)ang[1];
            maxCount = Math.max(maxCount, cnt);
        }
    }
    return maxCount;
}"""
        code['javascript'] = """function maxPointsInCircle(points, cx, cy, r) {
    const n = points.length;
    let maxCount = 0;
    for (let i = 0; i < n; i++) {
        const angles = [];
        for (let j = 0; j < n; j++) {
            if (i === j) continue;
            const dx = points[j][0] - points[i][0];
            const dy = points[j][1] - points[i][1];
            const dSq = dx * dx + dy * dy;
            if (dSq > 4 * r * r) continue;
            const a = Math.atan2(dy, dx);
            const delta = Math.acos(Math.sqrt(dSq) / (2 * r));
            angles.push([a - delta, 1]);
            angles.push([a + delta, -1]);
        }
        angles.sort((x, y) => x[0] - y[0]);
        let cnt = 1;
        for (const [, typ] of angles) {
            cnt += typ;
            maxCount = Math.max(maxCount, cnt);
        }
    }
    return maxCount;
}"""
    
    elif 'input().split()' in lang_map.get('python', '') and 'h' in lang_map.get('python', '').split('\n')[0]:
        # Problem 1: Water Lily
        code['cpp'] = """#include <bits/stdc++.h>
using namespace std;

int main() {
    double h, d; cin >> h >> d;
    double depth = (d * d - h * h) / (2 * h);
    cout << fixed << setprecision(9) << depth << endl;
    return 0;
}"""
        code['java'] = """import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double h = sc.nextDouble(), d = sc.nextDouble();
        double depth = (d * d - h * h) / (2 * h);
        System.out.printf("%.9f%n", depth);
    }
}"""
        code['javascript'] = """const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
rl.on('line', line => {
    const [h, d] = line.split(' ').map(Number);
    const depth = (d * d - h * h) / (2 * h);
    console.log(depth.toFixed(9));
    rl.close();
});"""
    
    elif 'SCALE = 10000' in lang_map.get('python', '') or 'lattice' in ctx.lower():
        # Problem 2: Circle Lattice Points
        code['cpp'] = """#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    double cx, cy, r;
    cin >> cx >> cy >> r;
    const ll SCALE = 10000;
    ll sc = round(cx * SCALE), sy = round(cy * SCALE), sr = round(r * SCALE);
    
    ll xMin = (sc - sr + SCALE - 1) / SCALE * SCALE;
    ll xMax = (sc + sr) / SCALE * SCALE;
    ll ans = 0;
    
    for (ll x = xMin; x <= xMax; x += SCALE) {
        ll dx = x - sc;
        ll dySq = sr * sr - dx * dx;
        if (dySq < 0) continue;
        ll maxDy = (ll)sqrtl(dySq);
        ll yLow = (sy - maxDy + SCALE - 1) / SCALE;
        ll yHigh = (sy + maxDy) / SCALE;
        ans += yHigh - yLow + 1;
    }
    
    cout << ans << endl;
    return 0;
}"""
        code['java'] = """import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double cx = sc.nextDouble(), cy = sc.nextDouble(), r = sc.nextDouble();
        final long SCALE = 10000;
        long sc = Math.round(cx * SCALE), sy = Math.round(cy * SCALE), sr = Math.round(r * SCALE);
        
        long xMin = (sc - sr + SCALE - 1) / SCALE * SCALE;
        long xMax = (sc + sr) / SCALE * SCALE;
        long ans = 0;
        
        for (long x = xMin; x <= xMax; x += SCALE) {
            long dx = x - sc;
            long dySq = sr * sr - dx * dx;
            if (dySq < 0) continue;
            long maxDy = (long)Math.sqrt(dySq);
            long yLow = (sy - maxDy + SCALE - 1) / SCALE;
            long yHigh = (sy + maxDy) / SCALE;
            ans += yHigh - yLow + 1;
        }
        
        System.out.println(ans);
    }
}"""
        code['javascript'] = """const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
rl.on('line', line => {
    const [cx, cy, r] = line.split(' ').map(Number);
    const SCALE = 10000;
    const sc = Math.round(cx * SCALE), sy = Math.round(cy * SCALE), sr = Math.round(r * SCALE);
    
    const xMin = Math.floor((sc - sr + SCALE - 1) / SCALE) * SCALE;
    const xMax = Math.floor((sc + sr) / SCALE) * SCALE;
    let ans = 0;
    
    for (let x = xMin; x <= xMax; x += SCALE) {
        const dx = x - sc;
        const dySq = sr * sr - dx * dx;
        if (dySq < 0) continue;
        const maxDy = Math.floor(Math.sqrt(dySq));
        const yLow = Math.floor((sy - maxDy + SCALE - 1) / SCALE);
        const yHigh = Math.floor((sy + maxDy) / SCALE);
        ans += yHigh - yLow + 1;
    }
    
    console.log(ans);
    rl.close();
});"""
    
    elif 'numPoints' in lang_map.get('python', '') or 'Dartboard' in ctx:
        # Problem 3: Max Darts
        code['cpp'] = """int numPoints(vector<vector<int>>& points, int r) {
    int n = points.size(), ans = 1;
    auto countPoints = [&](double cx, double cy) {
        int cnt = 0;
        for (auto& p : points) {
            double dx = p[0] - cx, dy = p[1] - cy;
            if (dx*dx + dy*dy <= r*r + 1e-9) cnt++;
        }
        return cnt;
    };
    for (int i = 0; i < n; i++) {
        for (int j = i+1; j < n; j++) {
            int x1 = points[i][0], y1 = points[i][1];
            int x2 = points[j][0], y2 = points[j][1];
            int dSq = (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1);
            if (dSq > 4*r*r) continue;
            double d = sqrt(dSq);
            double mx = (x1+x2)/2.0, my = (y1+y2)/2.0;
            double h = sqrt(r*r - d*d/4.0);
            double dx = (double)(y2-y1)/d, dy = (double)(-(x2-x1))/d;
            for (int sign : {1, -1}) {
                double cx = mx + sign * h * dx;
                double cy = my + sign * h * dy;
                ans = max(ans, countPoints(cx, cy));
            }
        }
    }
    return ans;
}"""
        code['java'] = """public int numPoints(int[][] points, int r) {
    int n = points.length, ans = 1;
    for (int i = 0; i < n; i++) {
        for (int j = i+1; j < n; j++) {
            int x1 = points[i][0], y1 = points[i][1];
            int x2 = points[j][0], y2 = points[j][1];
            int dSq = (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1);
            if (dSq > 4*r*r) continue;
            double d = Math.sqrt(dSq);
            double mx = (x1+x2)/2.0, my = (y1+y2)/2.0;
            double h = Math.sqrt(r*r - d*d/4.0);
            double dx = (double)(y2-y1)/d, dy = (double)(-(x2-x1))/d;
            for (int sign = -1; sign <= 1; sign += 2) {
                double cx = mx + sign * h * dx;
                double cy = my + sign * h * dy;
                int cnt = 0;
                for (int[] p : points) {
                    double px = p[0] - cx, py = p[1] - cy;
                    if (px*px + py*py <= r*r + 1e-9) cnt++;
                }
                ans = Math.max(ans, cnt);
            }
        }
    }
    return ans;
}"""
        code['javascript'] = """function numPoints(points, r) {
    const n = points.length;
    let ans = 1;
    const countPoints = (cx, cy) => {
        let cnt = 0;
        for (const [px, py] of points) {
            const dx = px - cx, dy = py - cy;
            if (dx * dx + dy * dy <= r * r + 1e-9) cnt++;
        }
        return cnt;
    };
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const [x1, y1] = points[i], [x2, y2] = points[j];
            const dSq = (x2 - x1) ** 2 + (y2 - y1) ** 2;
            if (dSq > 4 * r * r) continue;
            const d = Math.sqrt(dSq);
            const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
            const h = Math.sqrt(r * r - d * d / 4);
            const dx = (y2 - y1) / d, dy = -(x2 - x1) / d;
            for (const sign of [1, -1]) {
                const cx = mx + sign * h * dx;
                const cy = my + sign * h * dy;
                ans = Math.max(ans, countPoints(cx, cy));
            }
        }
    }
    return ans;
}"""
    
    return make_blocks(missing, code)

# ============================================================
# COORDINATE GEOMETRY
# ============================================================
def gen_coordinate(group, missing, ctx, lang_map):
    code = {}
    
    if 'euclidean' in lang_map.get('python', '').lower() and 'hypot' in lang_map.get('python', ''):
        # 5.1 Euclidean Distance
        code['java'] = """public static double euclidean(int[] p, int[] q) {
    return Math.hypot(p[0] - q[0], p[1] - q[1]);
}

public static long euclideanSq(int[] p, int[] q) {
    long dx = p[0] - q[0], dy = p[1] - q[1];
    return dx * dx + dy * dy;
}"""
        code['javascript'] = """function euclidean(p, q) {
    return Math.hypot(p[0] - q[0], p[1] - q[1]);
}

function euclideanSq(p, q) {
    const dx = p[0] - q[0], dy = p[1] - q[1];
    return dx * dx + dy * dy;
}"""
    
    elif 'collinear' in lang_map.get('python', '') and '== 0' in lang_map.get('python', ''):
        # 5.2 Collinearity Check
        code['cpp'] = """bool collinear(vector<int> a, vector<int> b, vector<int> c) {
    return (long long)a[0]*(b[1]-c[1]) + (long long)b[0]*(c[1]-a[1]) + (long long)c[0]*(a[1]-b[1]) == 0;
}"""
        code['java'] = """public static boolean collinear(int[] a, int[] b, int[] c) {
    return (long)a[0]*(b[1]-c[1]) + (long)b[0]*(c[1]-a[1]) + (long)c[0]*(a[1]-b[1]) == 0;
}"""
        code['javascript'] = """function collinear(a, b, c) {
    return a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1]) === 0;
}"""
    
    elif 'slope_key' in lang_map.get('python', '') or 'gcd' in lang_map.get('python', '').split('\n')[0] if 'gcd' in lang_map.get('python', '') else False:
        # 5.3 Slope as Reduced Fraction
        code['cpp'] = """#include <bits/stdc++.h>
using namespace std;

pair<int,int> slope_key(pair<int,int> p, pair<int,int> q) {
    int dx = q.first - p.first;
    int dy = q.second - p.second;
    if (dx == 0) return {0, 1};
    if (dy == 0) return {1, 0};
    int g = gcd(dx, dy);
    dx /= g; dy /= g;
    if (dx < 0) { dx = -dx; dy = -dy; }
    return {dx, dy};
}"""
        code['java'] = """public static String slopeKey(int[] p, int[] q) {
    int dx = q[0] - p[0];
    int dy = q[1] - p[1];
    if (dx == 0) return "0/1";
    if (dy == 0) return "1/0";
    int g = gcd(Math.abs(dx), Math.abs(dy));
    dx /= g; dy /= g;
    if (dx < 0) { dx = -dx; dy = -dy; }
    return dx + "/" + dy;
}

static int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}"""
        code['javascript'] = """function gcd(a, b) {
    return b === 0 ? Math.abs(a) : gcd(b, a % b);
}

function slopeKey(p, q) {
    let dx = q[0] - p[0];
    let dy = q[1] - p[1];
    if (dx === 0) return [0, 1];
    if (dy === 0) return [1, 0];
    const g = gcd(dx, dy);
    dx /= g; dy /= g;
    if (dx < 0) { dx = -dx; dy = -dy; }
    return [dx, dy];
}"""
    
    elif 'max_points' in lang_map.get('python', '') and 'slopes' in lang_map.get('python', ''):
        # 5.4 Max Points on a Line
        code['cpp'] = """int maxPoints(vector<vector<int>>& points) {
    int n = points.size();
    if (n < 2) return n;
    int maxCount = 0;
    for (int i = 0; i < n; i++) {
        map<pair<int,int>, int> slopes;
        int same = 1;
        for (int j = 0; j < n; j++) {
            if (i == j) continue;
            if (points[i] == points[j]) { same++; continue; }
            auto key = slope_key({points[i][0], points[i][1]}, {points[j][0], points[j][1]});
            slopes[key]++;
        }
        int cur = same;
        for (auto& [_, c] : slopes) cur = max(cur, same + c);
        maxCount = max(maxCount, cur);
    }
    return maxCount;
}"""
        code['java'] = """public int maxPoints(int[][] points) {
    int n = points.length;
    if (n < 2) return n;
    int maxCount = 0;
    for (int i = 0; i < n; i++) {
        Map<String, Integer> slopes = new HashMap<>();
        int same = 1;
        for (int j = 0; j < n; j++) {
            if (i == j) continue;
            if (Arrays.equals(points[i], points[j])) { same++; continue; }
            String key = slopeKey(points[i], points[j]);
            slopes.put(key, slopes.getOrDefault(key, 0) + 1);
        }
        int cur = same;
        for (int c : slopes.values()) cur = Math.max(cur, same + c);
        maxCount = Math.max(maxCount, cur);
    }
    return maxCount;
}"""
        code['javascript'] = """function maxPoints(points) {
    const n = points.length;
    if (n < 2) return n;
    let maxCount = 0;
    for (let i = 0; i < n; i++) {
        const slopes = new Map();
        let same = 1;
        for (let j = 0; j < n; j++) {
            if (i === j) continue;
            if (points[i][0] === points[j][0] && points[i][1] === points[j][1]) {
                same++;
                continue;
            }
            const key = slopeKey(points[i], points[j]).join(',');
            slopes.set(key, (slopes.get(key) || 0) + 1);
        }
        let cur = same;
        for (const c of slopes.values()) cur = Math.max(cur, same + c);
        maxCount = Math.max(maxCount, cur);
    }
    return maxCount;
}"""
    
    elif 'min_meeting_point' in lang_map.get('python', '') or 'Meeting Point' in ctx:
        # 5.5 Manhattan Distance / Min Meeting Point
        code['cpp'] = """int minMeetingPoint(vector<vector<int>>& points) {
    vector<int> xs, ys;
    for (auto& p : points) { xs.push_back(p[0]); ys.push_back(p[1]); }
    sort(xs.begin(), xs.end());
    sort(ys.begin(), ys.end());
    int n = xs.size();
    int mx = xs[n/2], my = ys[n/2];
    int sum = 0;
    for (auto& p : points) sum += abs(p[0] - mx) + abs(p[1] - my);
    return sum;
}"""
        code['java'] = """public static int minMeetingPoint(int[][] points) {
    int n = points.length;
    int[] xs = new int[n], ys = new int[n];
    for (int i = 0; i < n; i++) { xs[i] = points[i][0]; ys[i] = points[i][1]; }
    Arrays.sort(xs);
    Arrays.sort(ys);
    int mx = xs[n/2], my = ys[n/2];
    int sum = 0;
    for (int[] p : points) sum += Math.abs(p[0] - mx) + Math.abs(p[1] - my);
    return sum;
}"""
        code['javascript'] = """function minMeetingPoint(points) {
    const xs = points.map(p => p[0]).sort((a, b) => a - b);
    const ys = points.map(p => p[1]).sort((a, b) => a - b);
    const n = xs.length;
    const mx = xs[Math.floor(n / 2)], my = ys[Math.floor(n / 2)];
    return points.reduce((sum, [x, y]) => sum + Math.abs(x - mx) + Math.abs(y - my), 0);
}"""
    
    elif 'compress' in lang_map.get('python', '') and 'coords' in lang_map.get('python', ''):
        # 5.6 Coordinate Compression
        code['cpp'] = """unordered_map<int,int> compress(vector<int>& coords) {
    vector<int> sorted = coords;
    sort(sorted.begin(), sorted.end());
    sorted.erase(unique(sorted.begin(), sorted.end()), sorted.end());
    unordered_map<int,int> mp;
    for (int i = 0; i < sorted.size(); i++) mp[sorted[i]] = i;
    return mp;
}"""
        code['java'] = """public static Map<Integer, Integer> compress(int[] coords) {
    int[] sorted = Arrays.stream(coords).distinct().sorted().toArray();
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < sorted.length; i++) map.put(sorted[i], i);
    return map;
}"""
        code['javascript'] = """function compress(coords) {
    const sorted = [...new Set(coords)].sort((a, b) => a - b);
    const map = new Map();
    sorted.forEach((v, i) => map.set(v, i));
    return map;
}"""
    
    elif 'kClosest' in lang_map.get('python', '') or 'K Closest' in ctx:
        # Problem 1: K Closest Points
        code['javascript'] = """function kClosest(points, k) {
    const heap = [];
    for (const [x, y] of points) {
        const d = x * x + y * y;
        if (heap.length < k) {
            heap.push([-d, x, y]);
            heap.sort((a, b) => a[0] - b[0]);
        } else if (d < -heap[0][0]) {
            heap[0] = [-d, x, y];
            heap.sort((a, b) => a[0] - b[0]);
        }
    }
    return heap.map(([, x, y]) => [x, y]);
}"""
    
    elif 'minTotalDistance' in lang_map.get('python', '') or 'Best Meeting' in ctx:
        # Problem 2: Best Meeting Point
        code['cpp'] = """int minTotalDistance(vector<vector<int>>& grid) {
    vector<int> rows, cols;
    for (int i = 0; i < grid.size(); i++)
        for (int j = 0; j < grid[0].size(); j++)
            if (grid[i][j] == 1) {
                rows.push_back(i);
                cols.push_back(j);
            }
    sort(cols.begin(), cols.end());
    int mx = rows[rows.size()/2], my = cols[cols.size()/2];
    int sum = 0;
    for (int r : rows) sum += abs(r - mx);
    for (int c : cols) sum += abs(c - my);
    return sum;
}"""
        code['java'] = """public static int minTotalDistance(int[][] grid) {
    List<Integer> rows = new ArrayList<>(), cols = new ArrayList<>();
    for (int i = 0; i < grid.length; i++)
        for (int j = 0; j < grid[0].length; j++)
            if (grid[i][j] == 1) {
                rows.add(i);
                cols.add(j);
            }
    Collections.sort(cols);
    int mx = rows.get(rows.size()/2), my = cols.get(cols.size()/2);
    int sum = 0;
    for (int r : rows) sum += Math.abs(r - mx);
    for (int c : cols) sum += Math.abs(c - my);
    return sum;
}"""
        code['javascript'] = """function minTotalDistance(grid) {
    const rows = [], cols = [];
    for (let i = 0; i < grid.length; i++)
        for (let j = 0; j < grid[0].length; j++)
            if (grid[i][j] === 1) {
                rows.push(i);
                cols.push(j);
            }
    cols.sort((a, b) => a - b);
    const mx = rows[Math.floor(rows.length / 2)];
    const my = cols[Math.floor(cols.length / 2)];
    return rows.reduce((s, r) => s + Math.abs(r - mx), 0) +
           cols.reduce((s, c) => s + Math.abs(c - my), 0);
}"""
    
    elif 'closest_pair' in lang_map.get('python', '') or 'Closest Pair' in ctx:
        # Problem 3: Closest Pair
        code['cpp'] = """#include <bits/stdc++.h>
using namespace std;

double dist(pair<double,double> p, pair<double,double> q) {
    return hypot(p.first - q.first, p.second - q.second);
}

double solve(vector<pair<double,double>>& px, vector<pair<double,double>>& py) {
    if (px.size() <= 3) {
        double d = 1e18;
        for (int i = 0; i < px.size(); i++)
            for (int j = i+1; j < px.size(); j++)
                d = min(d, dist(px[i], px[j]));
        return d;
    }
    int mid = px.size() / 2;
    double midX = px[mid].first;
    
    vector<pair<double,double>> lx(px.begin(), px.begin()+mid);
    vector<pair<double,double>> rx(px.begin()+mid, px.end());
    vector<pair<double,double>> ly, ry;
    for (auto& p : py) {
        if (p.first <= midX) ly.push_back(p);
        else ry.push_back(p);
    }
    
    double d = min(solve(lx, ly), solve(rx, ry));
    
    vector<pair<double,double>> strip;
    for (auto& p : py)
        if (abs(p.first - midX) < d) strip.push_back(p);
    
    for (int i = 0; i < strip.size(); i++)
        for (int j = i+1; j < min(i+7, (int)strip.size()); j++)
            d = min(d, dist(strip[i], strip[j]));
    return d;
}

double closestPair(vector<pair<double,double>>& points) {
    auto px = points, py = points;
    sort(px.begin(), px.end());
    sort(py.begin(), py.end(), [](auto& a, auto& b) {
        return a.second < b.second || (a.second == b.second && a.first < b.first);
    });
    return solve(px, py);
}"""
        code['java'] = """import java.util.*;

public class ClosestPair {
    static double dist(double[] p, double[] q) {
        return Math.hypot(p[0]-q[0], p[1]-q[1]);
    }
    
    static double solve(double[][] px, double[][] py) {
        int n = px.length;
        if (n <= 3) {
            double d = Double.MAX_VALUE;
            for (int i = 0; i < n; i++)
                for (int j = i+1; j < n; j++)
                    d = Math.min(d, dist(px[i], px[j]));
            return d;
        }
        int mid = n / 2;
        double midX = px[mid][0];
        
        double[][] lx = Arrays.copyOfRange(px, 0, mid);
        double[][] rx = Arrays.copyOfRange(px, mid, n);
        
        List<double[]> ly = new ArrayList<>(), ry = new ArrayList<>();
        for (double[] p : py) {
            if (p[0] <= midX) ly.add(p);
            else ry.add(p);
        }
        
        double d = Math.min(solve(lx, ly.toArray(new double[0][])),
                           solve(rx, ry.toArray(new double[0][])));
        
        List<double[]> strip = new ArrayList<>();
        for (double[] p : py)
            if (Math.abs(p[0] - midX) < d) strip.add(p);
        
        for (int i = 0; i < strip.size(); i++)
            for (int j = i+1; j < Math.min(i+7, strip.size()); j++)
                d = Math.min(d, dist(strip.get(i), strip.get(j)));
        return d;
    }
    
    static double closestPair(double[][] points) {
        double[][] px = points.clone(), py = points.clone();
        Arrays.sort(px, (a,b) -> Double.compare(a[0], b[0]));
        Arrays.sort(py, (a,b) -> a[1] != b[1] ? Double.compare(a[1], b[1]) : Double.compare(a[0], b[0]));
        return solve(px, py);
    }
}"""
        code['javascript'] = """function dist(p, q) {
    return Math.hypot(p[0] - q[0], p[1] - q[1]);
}

function solve(px, py) {
    if (px.length <= 3) {
        let d = Infinity;
        for (let i = 0; i < px.length; i++)
            for (let j = i + 1; j < px.length; j++)
                d = Math.min(d, dist(px[i], px[j]));
        return d;
    }
    const mid = Math.floor(px.length / 2);
    const midX = px[mid][0];
    
    const lx = px.slice(0, mid), rx = px.slice(mid);
    const ly = py.filter(p => p[0] <= midX);
    const ry = py.filter(p => p[0] > midX);
    
    let d = Math.min(solve(lx, ly), solve(rx, ry));
    
    const strip = py.filter(p => Math.abs(p[0] - midX) < d);
    for (let i = 0; i < strip.length; i++)
        for (let j = i + 1; j < Math.min(i + 7, strip.length); j++)
            d = Math.min(d, dist(strip[i], strip[j]));
    return d;
}

function closestPair(points) {
    const px = [...points].sort((a, b) => a[0] - b[0]);
    const py = [...points].sort((a, b) => a[1] - b[1] || a[0] - b[0]);
    return solve(px, py);
}"""
    
    return make_blocks(missing, code)

# ============================================================
# LINES AND SLOPES
# ============================================================
def gen_lines(group, missing, ctx, lang_map):
    code = {}
    
    if 'orientation' in lang_map.get('python', '') and 'cross' in lang_map.get('python', '').lower():
        # 5.1 Orientation
        code['javascript'] = """function orientation(a, b, c) {
    const cross = (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
    if (cross > 0) return 1;   // CW
    if (cross < 0) return -1;  // CCW
    return 0;                  // collinear
}"""
    
    elif 'on_segment' in lang_map.get('python', '') and 'segments_intersect' in lang_map.get('python', ''):
        # 5.2 Line Segment Intersection
        code['cpp'] = """bool onSegment(vector<int> a, vector<int> b, vector<int> c) {
    return min(a[0], b[0]) <= c[0] && c[0] <= max(a[0], b[0]) &&
           min(a[1], b[1]) <= c[1] && c[1] <= max(a[1], b[1]);
}

bool segmentsIntersect(vector<int> p1, vector<int> p2, vector<int> p3, vector<int> p4) {
    int o1 = orientation(p1, p2, p3);
    int o2 = orientation(p1, p2, p4);
    int o3 = orientation(p3, p4, p1);
    int o4 = orientation(p3, p4, p2);
    if (o1 != o2 && o3 != o4) return true;
    if (o1 == 0 && onSegment(p1, p2, p3)) return true;
    if (o2 == 0 && onSegment(p1, p2, p4)) return true;
    if (o3 == 0 && onSegment(p3, p4, p1)) return true;
    if (o4 == 0 && onSegment(p3, p4, p2)) return true;
    return false;
}"""
        code['java'] = """public static boolean onSegment(int[] a, int[] b, int[] c) {
    return Math.min(a[0], b[0]) <= c[0] && c[0] <= Math.max(a[0], b[0]) &&
           Math.min(a[1], b[1]) <= c[1] && c[1] <= Math.max(a[1], b[1]);
}

public static boolean segmentsIntersect(int[] p1, int[] p2, int[] p3, int[] p4) {
    int o1 = orientation(p1, p2, p3);
    int o2 = orientation(p1, p2, p4);
    int o3 = orientation(p3, p4, p1);
    int o4 = orientation(p3, p4, p2);
    if (o1 != o2 && o3 != o4) return true;
    if (o1 == 0 && onSegment(p1, p2, p3)) return true;
    if (o2 == 0 && onSegment(p1, p2, p4)) return true;
    if (o3 == 0 && onSegment(p3, p4, p1)) return true;
    if (o4 == 0 && onSegment(p3, p4, p2)) return true;
    return false;
}"""
        code['javascript'] = """function onSegment(a, b, c) {
    return Math.min(a[0], b[0]) <= c[0] && c[0] <= Math.max(a[0], b[0]) &&
           Math.min(a[1], b[1]) <= c[1] && c[1] <= Math.max(a[1], b[1]);
}

function segmentsIntersect(p1, p2, p3, p4) {
    const o1 = orientation(p1, p2, p3);
    const o2 = orientation(p1, p2, p4);
    const o3 = orientation(p3, p4, p1);
    const o4 = orientation(p3, p4, p2);
    if (o1 !== o2 && o3 !== o4) return true;
    if (o1 === 0 && onSegment(p1, p2, p3)) return true;
    if (o2 === 0 && onSegment(p1, p2, p4)) return true;
    if (o3 === 0 && onSegment(p3, p4, p1)) return true;
    if (o4 === 0 && onSegment(p3, p4, p2)) return true;
    return false;
}"""
    
    elif 'line_from_points' in lang_map.get('python', ''):
        # 5.3 Line from Two Points
        code['cpp'] = """tuple<int,int,int> lineFromPoints(vector<int> p1, vector<int> p2) {
    int A = p1[1] - p2[1];
    int B = p2[0] - p1[0];
    int C = p1[0]*p2[1] - p2[0]*p1[1];
    return {A, B, C};
}"""
        code['java'] = """public static int[] lineFromPoints(int[] p1, int[] p2) {
    int A = p1[1] - p2[1];
    int B = p2[0] - p1[0];
    int C = p1[0]*p2[1] - p2[0]*p1[1];
    return new int[]{A, B, C};
}"""
        code['javascript'] = """function lineFromPoints(p1, p2) {
    const A = p1[1] - p2[1];
    const B = p2[0] - p1[0];
    const C = p1[0] * p2[1] - p2[0] * p1[1];
    return [A, B, C];
}"""
    
    elif 'line_intersection' in lang_map.get('python', '') and 'denom' in lang_map.get('python', ''):
        # 5.4 Line-Line Intersection
        code['cpp'] = """pair<double,double> lineIntersection(tuple<int,int,int> l1, tuple<int,int,int> l2) {
    auto [A1, B1, C1] = l1;
    auto [A2, B2, C2] = l2;
    double denom = A1*B2 - A2*B1;
    if (abs(denom) < 1e-12) return {INFINITY, INFINITY};
    double x = (B1*C2 - B2*C1) / denom;
    double y = (C1*A2 - C2*A1) / denom;
    return {x, y};
}"""
        code['java'] = """public static double[] lineIntersection(int[] l1, int[] l2) {
    int A1 = l1[0], B1 = l1[1], C1 = l1[2];
    int A2 = l2[0], B2 = l2[1], C2 = l2[2];
    double denom = A1*B2 - A2*B1;
    if (Math.abs(denom) < 1e-12) return null;
    double x = (double)(B1*C2 - B2*C1) / denom;
    double y = (double)(C1*A2 - C2*A1) / denom;
    return new double[]{x, y};
}"""
        code['javascript'] = """function lineIntersection(l1, l2) {
    const [A1, B1, C1] = l1;
    const [A2, B2, C2] = l2;
    const denom = A1 * B2 - A2 * B1;
    if (Math.abs(denom) < 1e-12) return null;
    const x = (B1 * C2 - B2 * C1) / denom;
    const y = (C1 * A2 - C2 * A1) / denom;
    return [x, y];
}"""
    
    elif 'point_line_distance' in lang_map.get('python', ''):
        # 5.5 Point-to-Line Distance
        code['cpp'] = """double pointLineDistance(int px, int py, tuple<int,int,int> line) {
    auto [A, B, C] = line;
    return abs(A*px + B*py + C) / sqrt(A*A + B*B);
}"""
        code['java'] = """public static double pointLineDistance(int px, int py, int[] line) {
    int A = line[0], B = line[1], C = line[2];
    return Math.abs(A*px + B*py + C) / Math.sqrt(A*A + B*B);
}"""
        code['javascript'] = """function pointLineDistance(px, py, line) {
    const [A, B, C] = line;
    return Math.abs(A * px + B * py + C) / Math.sqrt(A * A + B * B);
}"""
    
    elif 'LiChaoTree' in lang_map.get('python', '') or 'Li Chao' in ctx:
        # 5.6 Li Chao Segment Tree
        code['cpp'] = """#include <bits/stdc++.h>
using namespace std;
using ll = long long;

struct LiChaoTree {
    vector<ll> xs;
    int size;
    vector<pair<ll,ll>> lines;  // (m, b)
    
    LiChaoTree(vector<ll> xs_) : xs(xs_) {
        int n = xs.size();
        size = 1;
        while (size < n) size <<= 1;
        lines.assign(2 * size, {0, LLONG_MIN});
    }
    
    ll f(pair<ll,ll> line, ll x) {
        return line.first * x + line.second;
    }
    
    void addLine(pair<ll,ll> newLine, int node = 1, int l = 0, int r = -1) {
        if (r == -1) r = size - 1;
        int m = (l + r) / 2;
        ll x_mid = (m < xs.size()) ? xs[m] : xs.back();
        ll x_l = (l < xs.size()) ? xs[l] : xs.back();
        
        bool left = f(newLine, x_l) > f(lines[node], x_l);
        bool mid = f(newLine, x_mid) > f(lines[node], x_mid);
        
        if (mid) swap(lines[node], newLine);
        if (l == r) return;
        if (left != mid) addLine(newLine, node*2, l, m);
        else addLine(newLine, node*2+1, m+1, r);
    }
    
    ll query(int idx) {
        ll x = xs[idx];
        ll ans = LLONG_MIN;
        int node = 1, l = 0, r = size - 1;
        while (true) {
            ans = max(ans, f(lines[node], x));
            if (l == r) break;
            int m = (l + r) / 2;
            if (idx <= m) { node = node*2; r = m; }
            else { node = node*2+1; l = m+1; }
        }
        return ans;
    }
};"""
        code['java'] = """import java.util.*;

public class LiChaoTree {
    long[] xs;
    int size;
    long[][] lines; // {m, b}
    
    public LiChaoTree(List<Long> xs) {
        this.xs = xs.stream().mapToLong(Long::longValue).toArray();
        int n = xs.size();
        size = 1;
        while (size < n) size <<= 1;
        lines = new long[2 * size][2];
        for (int i = 0; i < 2 * size; i++) { lines[i][0] = 0; lines[i][1] = Long.MIN_VALUE; }
    }
    
    long f(long[] line, long x) {
        return line[0] * x + line[1];
    }
    
    void addLine(long[] newLine) { addLine(newLine, 1, 0, size - 1); }
    
    void addLine(long[] newLine, int node, int l, int r) {
        int m = (l + r) / 2;
        long xMid = (m < xs.length) ? xs[m] : xs[xs.length - 1];
        long xL = (l < xs.length) ? xs[l] : xs[xs.length - 1];
        
        boolean left = f(newLine, xL) > f(lines[node], xL);
        boolean mid = f(newLine, xMid) > f(lines[node], xMid);
        
        if (mid) { long[] tmp = lines[node]; lines[node] = newLine; newLine = tmp; }
        if (l == r) return;
        if (left != mid) addLine(newLine, node*2, l, m);
        else addLine(newLine, node*2+1, m+1, r);
    }
    
    long query(int idx) {
        long x = xs[idx];
        long ans = Long.MIN_VALUE;
        int node = 1, l = 0, r = size - 1;
        while (true) {
            ans = Math.max(ans, f(lines[node], x));
            if (l == r) break;
            int m = (l + r) / 2;
            if (idx <= m) { node = node*2; r = m; }
            else { node = node*2+1; l = m+1; }
        }
        return ans;
    }
}"""
        code['javascript'] = """class LiChaoTree {
    constructor(xs) {
        this.xs = xs;
        let n = xs.length;
        let size = 1;
        while (size < n) size <<= 1;
        this.size = size;
        this.lines = new Array(2 * size).fill(null).map(() => [0, -Infinity]);
    }

    f(line, x) {
        return line[0] * x + line[1];
    }

    addLine(newLine, node = 1, l = 0, r = null) {
        if (r === null) r = this.size - 1;
        const m = Math.floor((l + r) / 2);
        const xMid = m < this.xs.length ? this.xs[m] : this.xs[this.xs.length - 1];
        const xL = l < this.xs.length ? this.xs[l] : this.xs[this.xs.length - 1];

        const left = this.f(newLine, xL) > this.f(this.lines[node], xL);
        const mid = this.f(newLine, xMid) > this.f(this.lines[node], xMid);

        if (mid) [this.lines[node], newLine] = [newLine, this.lines[node]];
        if (l === r) return;
        if (left !== mid) this.addLine(newLine, node * 2, l, m);
        else this.addLine(newLine, node * 2 + 1, m + 1, r);
    }

    query(idx) {
        const x = this.xs[idx];
        let ans = -Infinity;
        let node = 1, l = 0, r = this.size - 1;
        while (true) {
            ans = Math.max(ans, this.f(this.lines[node], x));
            if (l === r) break;
            const m = Math.floor((l + r) / 2);
            if (idx <= m) { node = node * 2; r = m; }
            else { node = node * 2 + 1; l = m + 1; }
        }
        return ans;
    }
}"""
    
    elif 'checkStraightLine' in lang_map.get('python', '') or 'Straight Line' in ctx:
        # Problem 1: Check Straight Line
        code['javascript'] = """function checkStraightLine(coordinates) {
    const [x0, y0] = coordinates[0];
    const [x1, y1] = coordinates[1];
    for (let i = 2; i < coordinates.length; i++) {
        const [x, y] = coordinates[i];
        if ((x1 - x0) * (y - y0) !== (y1 - y0) * (x - x0))
            return false;
    }
    return true;
}"""
    
    elif 'intersect(p1, p2, p3, p4)' in lang_map.get('python', ''):
        # Problem 2: Segment Intersection
        code['cpp'] = """bool intersect(vector<int> p1, vector<int> p2, vector<int> p3, vector<int> p4) {
    int o1 = orientation(p1, p2, p3);
    int o2 = orientation(p1, p2, p4);
    int o3 = orientation(p3, p4, p1);
    int o4 = orientation(p3, p4, p2);
    if (o1 != o2 && o3 != o4) return true;
    if (o1 == 0 && onSegment(p1, p2, p3)) return true;
    if (o2 == 0 && onSegment(p1, p2, p4)) return true;
    if (o3 == 0 && onSegment(p3, p4, p1)) return true;
    if (o4 == 0 && onSegment(p3, p4, p2)) return true;
    return false;
}"""
        code['java'] = """public static boolean intersect(int[] p1, int[] p2, int[] p3, int[] p4) {
    int o1 = orientation(p1, p2, p3);
    int o2 = orientation(p1, p2, p4);
    int o3 = orientation(p3, p4, p1);
    int o4 = orientation(p3, p4, p2);
    if (o1 != o2 && o3 != o4) return true;
    if (o1 == 0 && onSegment(p1, p2, p3)) return true;
    if (o2 == 0 && onSegment(p1, p2, p4)) return true;
    if (o3 == 0 && onSegment(p3, p4, p1)) return true;
    if (o4 == 0 && onSegment(p3, p4, p2)) return true;
    return false;
}"""
        code['javascript'] = """function intersect(p1, p2, p3, p4) {
    const o1 = orientation(p1, p2, p3);
    const o2 = orientation(p1, p2, p4);
    const o3 = orientation(p3, p4, p1);
    const o4 = orientation(p3, p4, p2);
    if (o1 !== o2 && o3 !== o4) return true;
    if (o1 === 0 && onSegment(p1, p2, p3)) return true;
    if (o2 === 0 && onSegment(p1, p2, p4)) return true;
    if (o3 === 0 && onSegment(p3, p4, p1)) return true;
    if (o4 === 0 && onSegment(p3, p4, p2)) return true;
    return false;
}"""
    
    elif 'getSkyline' in lang_map.get('python', '') or 'Skyline' in ctx:
        # Problem 3: Skyline
        code['cpp'] = """vector<vector<int>> getSkyline(vector<vector<int>>& buildings) {
    vector<tuple<int,int,int>> events;
    for (auto& b : buildings) {
        events.push_back({b[0], -b[2], b[1]});
        events.push_back({b[1], 0, 0});
    }
    sort(events.begin(), events.end());
    
    priority_queue<pair<int,int>> pq; // (height, right)
    pq.push({0, INT_MAX});
    vector<vector<int>> result = {{0, 0}};
    
    for (auto [x, neg_h, r] : events) {
        if (neg_h != 0) pq.push({-neg_h, r});
        while (!pq.empty() && pq.top().second <= x) pq.pop();
        int curH = pq.top().first;
        if (result.back()[1] != curH) {
            if (result.back()[0] == x) result.back()[1] = curH;
            else result.push_back({x, curH});
        }
    }
    return vector<vector<int>>(result.begin() + 1, result.end());
}"""
        code['java'] = """public List<List<Integer>> getSkyline(int[][] buildings) {
    List<int[]> events = new ArrayList<>();
    for (int[] b : buildings) {
        events.add(new int[]{b[0], -b[2], b[1]});
        events.add(new int[]{b[1], 0, 0});
    }
    events.sort((a,b) -> Integer.compare(a[0], b[0]));
    
    PriorityQueue<int[]> pq = new PriorityQueue<>((a,b) -> Integer.compare(b[0], a[0]));
    pq.offer(new int[]{0, Integer.MAX_VALUE});
    List<List<Integer>> result = new ArrayList<>();
    result.add(Arrays.asList(0, 0));
    
    for (int[] ev : events) {
        int x = ev[0], negH = ev[1], r = ev[2];
        if (negH != 0) pq.offer(new int[]{-negH, r});
        while (!pq.isEmpty() && pq.peek()[1] <= x) pq.poll();
        int curH = pq.peek()[0];
        List<Integer> last = result.get(result.size() - 1);
        if (last.get(1) != curH) {
            if (last.get(0) == x) last.set(1, curH);
            else result.add(Arrays.asList(x, curH));
        }
    }
    return result.subList(1, result.size());
}"""
        code['javascript'] = """function getSkyline(buildings) {
    const events = [];
    for (const [l, r, h] of buildings) {
        events.push([l, -h, r]);
        events.push([r, 0, null]);
    }
    events.sort((a, b) => a[0] - b[0]);
    
    const heap = [[0, Infinity]];
    const result = [[0, 0]];
    
    for (const [x, negH, r] of events) {
        if (negH !== 0) heap.push([negH, r]);
        heap.sort((a, b) => a[0] - b[0]);
        while (heap.length > 0 && heap[0][1] <= x) heap.shift();
        const curH = -heap[0][0];
        const last = result[result.length - 1];
        if (last[1] !== curH) {
            if (last[0] === x) last[1] = curH;
            else result.push([x, curH]);
        }
    }
    return result.slice(1);
}"""
    
    elif 'minimumLines' in lang_map.get('python', '') or 'Line Chart' in ctx:
        # Problem 4: Minimum Lines
        code['cpp'] = """int minimumLines(vector<vector<int>>& points) {
    sort(points.begin(), points.end());
    int n = points.size();
    if (n < 2) return 0;
    int lines = 1;
    int dx = points[1][0] - points[0][0], dy = points[1][1] - points[0][1];
    int g = gcd(dx, dy);
    pair<int,int> prev = {dx/g, dy/g};
    for (int i = 2; i < n; i++) {
        dx = points[i][0] - points[i-1][0];
        dy = points[i][1] - points[i-1][1];
        g = gcd(dx, dy);
        pair<int,int> cur = {dx/g, dy/g};
        if (cur != prev) { lines++; prev = cur; }
    }
    return lines;
}"""
        code['java'] = """public int minimumLines(int[][] points) {
    Arrays.sort(points, (a,b) -> Integer.compare(a[0], b[0]));
    int n = points.length;
    if (n < 2) return 0;
    int lines = 1;
    int dx = points[1][0] - points[0][0], dy = points[1][1] - points[0][1];
    int g = gcd(Math.abs(dx), Math.abs(dy));
    String prev = (dx/g) + "/" + (dy/g);
    for (int i = 2; i < n; i++) {
        dx = points[i][0] - points[i-1][0];
        dy = points[i][1] - points[i-1][1];
        g = gcd(Math.abs(dx), Math.abs(dy));
        String cur = (dx/g) + "/" + (dy/g);
        if (!cur.equals(prev)) { lines++; prev = cur; }
    }
    return lines;
}

static int gcd(int a, int b) { return b == 0 ? a : gcd(b, a % b); }"""
        code['javascript'] = """function gcd(a, b) {
    return b === 0 ? Math.abs(a) : gcd(b, a % b);
}

function minimumLines(points) {
    points.sort((a, b) => a[0] - b[0]);
    const n = points.length;
    if (n < 2) return 0;
    let lines = 1;
    let dx = points[1][0] - points[0][0], dy = points[1][1] - points[0][1];
    let g = gcd(dx, dy);
    let prevX = dx / g, prevY = dy / g;
    for (let i = 2; i < n; i++) {
        dx = points[i][0] - points[i - 1][0];
        dy = points[i][1] - points[i - 1][1];
        g = gcd(dx, dy);
        const curX = dx / g, curY = dy / g;
        if (curX !== prevX || curY !== prevY) { lines++; prevX = curX; prevY = curY; }
    }
    return lines;
}"""
    
    elif 'count_parallelograms' in lang_map.get('python', ''):
        # Problem 5: Number of Parallelograms
        code['cpp'] = """long long countParallelograms(vector<pair<int,int>>& points) {
    map<pair<int,int>, long long> midCounts;
    int n = points.size();
    for (int i = 0; i < n; i++)
        for (int j = i+1; j < n; j++) {
            int mx = points[i].first + points[j].first;
            int my = points[i].second + points[j].second;
            midCounts[{mx, my}]++;
        }
    long long ans = 0;
    for (auto& [_, k] : midCounts) ans += k * (k - 1) / 2;
    return ans;
}"""
        code['java'] = """public long countParallelograms(int[][] points) {
    Map<String, Long> midCounts = new HashMap<>();
    int n = points.length;
    for (int i = 0; i < n; i++)
        for (int j = i+1; j < n; j++) {
            int mx = points[i][0] + points[j][0];
            int my = points[i][1] + points[j][1];
            String key = mx + "," + my;
            midCounts.put(key, midCounts.getOrDefault(key, 0L) + 1);
        }
    long ans = 0;
    for (long k : midCounts.values()) ans += k * (k - 1) / 2;
    return ans;
}"""
        code['javascript'] = """function countParallelograms(points) {
    const midCounts = new Map();
    const n = points.length;
    for (let i = 0; i < n; i++)
        for (let j = i + 1; j < n; j++) {
            const mx = points[i][0] + points[j][0];
            const my = points[i][1] + points[j][1];
            const key = mx + ',' + my;
            midCounts.set(key, (midCounts.get(key) || 0) + 1);
        }
    let ans = 0;
    for (const k of midCounts.values()) ans += k * (k - 1) / 2;
    return ans;
}"""
    
    elif 'check_line' in lang_map.get('python', '') and 'two_lines' in lang_map.get('python', ''):
        # Problem 6: Pair Of Lines
        code['cpp'] = """bool checkLine(vector<pair<int,int>>& points, int a, int b) {
    vector<pair<int,int>> off;
    for (auto& p : points)
        if (orientation(points[a], points[b], p) != 0)
            off.push_back(p);
    if (off.size() <= 2) return true;
    for (int i = 2; i < off.size(); i++)
        if (orientation(off[0], off[1], off[i]) != 0) return false;
    return true;
}

bool twoLines(vector<pair<int,int>>& points) {
    int n = points.size();
    if (n <= 4) return true;
    return checkLine(points, 0, 1) ||
           checkLine(points, 0, 2) ||
           checkLine(points, 1, 2);
}"""
        code['java'] = """public static boolean checkLine(int[][] points, int a, int b) {
    List<int[]> off = new ArrayList<>();
    for (int[] p : points)
        if (orientation(points[a], points[b], p) != 0)
            off.add(p);
    if (off.size() <= 2) return true;
    for (int i = 2; i < off.size(); i++)
        if (orientation(off.get(0), off.get(1), off.get(i)) != 0) return false;
    return true;
}

public static boolean twoLines(int[][] points) {
    int n = points.length;
    if (n <= 4) return true;
    return checkLine(points, 0, 1) ||
           checkLine(points, 0, 2) ||
           checkLine(points, 1, 2);
}"""
        code['javascript'] = """function checkLine(points, a, b) {
    const off = [];
    for (const p of points)
        if (orientation(points[a], points[b], p) !== 0)
            off.push(p);
    if (off.length <= 2) return true;
    for (let i = 2; i < off.length; i++)
        if (orientation(off[0], off[1], off[i]) !== 0) return false;
    return true;
}

function twoLines(points) {
    const n = points.length;
    if (n <= 4) return true;
    return checkLine(points, 0, 1) ||
           checkLine(points, 0, 2) ||
           checkLine(points, 1, 2);
}"""
    
    return make_blocks(missing, code)

# ============================================================
# DISTANCE AND MIDPOINT
# ============================================================
def gen_distance(group, missing, ctx, lang_map):
    code = {}
    
    if 'euclidean_distance' in lang_map.get('python', '') and '** 0.5' in lang_map.get('python', ''):
        # Euclidean Distance
        code['javascript'] = """function euclideanDistance(p1, p2) {
    return Math.sqrt((p1[0] - p2[0])**2 + (p1[1] - p2[1])**2);
}

function euclideanDistanceSquared(p1, p2) {
    return (p1[0] - p2[0])**2 + (p1[1] - p2[1])**2;
}"""
    
    elif 'manhattan_distance' in lang_map.get('python', ''):
        # Manhattan Distance
        code['javascript'] = """function manhattanDistance(p1, p2) {
    return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
}"""
    
    elif 'chebyshev_distance' in lang_map.get('python', ''):
        # Chebyshev Distance
        code['javascript'] = """function chebyshevDistance(p1, p2) {
    return Math.max(Math.abs(p1[0] - p2[0]), Math.abs(p1[1] - p2[1]));
}"""
    
    elif 'manhattan_to_chebyshev' in lang_map.get('python', '') or 'Transformation' in ctx:
        # Manhattan to Chebyshev
        code['javascript'] = """function manhattanToChebyshev(x, y) {
    return [x + y, x - y];
}

function manhattanViaChebyshev(p1, p2) {
    const [u1, v1] = manhattanToChebyshev(p1[0], p1[1]);
    const [u2, v2] = manhattanToChebyshev(p2[0], p2[1]);
    return Math.max(Math.abs(u1 - u2), Math.abs(v1 - v2));
}"""
    
    elif 'midpoint' in lang_map.get('python', ''):
        # Midpoint
        code['javascript'] = """function midpoint(p1, p2) {
    return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
}"""
    
    elif 'point_to_line_distance' in lang_map.get('python', ''):
        # Point-to-Line Distance
        code['javascript'] = """function pointToLineDistance(p, p1, p2) {
    const [x0, y0] = p;
    const [x1, y1] = p1;
    const [x2, y2] = p2;
    const area = Math.abs((x2 - x1) * (y1 - y0) - (x1 - x0) * (y2 - y1));
    const base = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    if (base === 0) return Math.sqrt((x0 - x1) ** 2 + (y0 - y1) ** 2);
    return area / base;
}"""
    
    elif 'sum_manhattan_to_center' in lang_map.get('python', '') or 'Prefix Sum' in ctx:
        # Power of 2D Prefix Sum
        code['cpp'] = """int sumManhattanToCenter(vector<vector<int>>& grid) {
    int rows = grid.size(), cols = grid[0].size();
    vector<int> rowSum(rows, 0), colSum(cols, 0);
    for (int r = 0; r < rows; r++)
        for (int c = 0; c < cols; c++) {
            rowSum[r] += grid[r][c];
            colSum[c] += grid[r][c];
        }
    
    int total = accumulate(rowSum.begin(), rowSum.end(), 0);
    int running = 0, medRow = 0;
    for (int r = 0; r < rows; r++) {
        running += rowSum[r];
        if (running * 2 >= total) { medRow = r; break; }
    }
    
    total = accumulate(colSum.begin(), colSum.end(), 0);
    running = 0;
    int medCol = 0;
    for (int c = 0; c < cols; c++) {
        running += colSum[c];
        if (running * 2 >= total) { medCol = c; break; }
    }
    
    int rowDist = 0, colDist = 0;
    for (int r = 0; r < rows; r++) rowDist += abs(r - medRow) * rowSum[r];
    for (int c = 0; c < cols; c++) colDist += abs(c - medCol) * colSum[c];
    return rowDist + colDist;
}"""
        code['java'] = """public static int sumManhattanToCenter(int[][] grid) {
    int rows = grid.length, cols = grid[0].length;
    int[] rowSum = new int[rows], colSum = new int[cols];
    for (int r = 0; r < rows; r++)
        for (int c = 0; c < cols; c++) {
            rowSum[r] += grid[r][c];
            colSum[c] += grid[r][c];
        }
    
    int total = 0;
    for (int v : rowSum) total += v;
    int running = 0, medRow = 0;
    for (int r = 0; r < rows; r++) {
        running += rowSum[r];
        if (running * 2 >= total) { medRow = r; break; }
    }
    
    total = 0;
    for (int v : colSum) total += v;
    running = 0;
    int medCol = 0;
    for (int c = 0; c < cols; c++) {
        running += colSum[c];
        if (running * 2 >= total) { medCol = c; break; }
    }
    
    int rowDist = 0, colDist = 0;
    for (int r = 0; r < rows; r++) rowDist += Math.abs(r - medRow) * rowSum[r];
    for (int c = 0; c < cols; c++) colDist += Math.abs(c - medCol) * colSum[c];
    return rowDist + colDist;
}"""
        code['javascript'] = """function sumManhattanToCenter(grid) {
    const rows = grid.length, cols = grid[0].length;
    const rowSum = new Array(rows).fill(0);
    const colSum = new Array(cols).fill(0);
    for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++) {
            rowSum[r] += grid[r][c];
            colSum[c] += grid[r][c];
        }
    
    let total = rowSum.reduce((a, b) => a + b, 0);
    let running = 0, medRow = 0;
    for (let r = 0; r < rows; r++) {
        running += rowSum[r];
        if (running * 2 >= total) { medRow = r; break; }
    }
    
    total = colSum.reduce((a, b) => a + b, 0);
    running = 0;
    let medCol = 0;
    for (let c = 0; c < cols; c++) {
        running += colSum[c];
        if (running * 2 >= total) { medCol = c; break; }
    }
    
    let rowDist = 0, colDist = 0;
    for (let r = 0; r < rows; r++) rowDist += Math.abs(r - medRow) * rowSum[r];
    for (let c = 0; c < cols; c++) colDist += Math.abs(c - medCol) * colSum[c];
    return rowDist + colDist;
}"""
    
    elif 'brute_force' in lang_map.get('python', '') and 'abs(arr[i]' in lang_map.get('python', ''):
        # Problem 1 Brute Force
        code['cpp'] = """long long bruteForce(vector<long long>& arr) {
    int n = arr.size();
    long long total = 0;
    for (int i = 0; i < n; i++)
        for (int j = i+1; j < n; j++)
            total += abs(arr[i] - arr[j]);
    return total;
}"""
        code['java'] = """public static long bruteForce(long[] arr) {
    int n = arr.length;
    long total = 0;
    for (int i = 0; i < n; i++)
        for (int j = i+1; j < n; j++)
            total += Math.abs(arr[i] - arr[j]);
    return total;
}"""
        code['javascript'] = """function bruteForce(arr) {
    const n = arr.length;
    let total = 0;
    for (let i = 0; i < n; i++)
        for (let j = i + 1; j < n; j++)
            total += Math.abs(arr[i] - arr[j]);
    return total;
}"""
    
    elif 'sum_of_abs_diff' in lang_map.get('python', ''):
        # Problem 1 Optimized
        code['javascript'] = """function sumOfAbsDiff(arr) {
    arr.sort((a, b) => a - b);
    let total = 0, prefix = 0;
    for (let i = 0; i < arr.length; i++) {
        total += arr[i] * i - prefix;
        prefix += arr[i];
    }
    return total;
}"""
    
    elif 'minimize_max_manhattan' in lang_map.get('python', '') or 'Minimize Manhattan' in ctx:
        # Problem 2
        code['javascript'] = """function minimizeMaxManhattan(points) {
    const n = points.length;
    if (n <= 2) return 0;
    
    const transformed = points.map(([x, y]) => [x + y, x - y]);
    
    const maxU = transformed.map(([u, v], i) => [u, i]).sort((a, b) => b[0] - a[0]);
    const minU = transformed.map(([u, v], i) => [u, i]).sort((a, b) => a[0] - b[0]);
    const maxV = transformed.map(([u, v], i) => [v, i]).sort((a, b) => b[0] - a[0]);
    const minV = transformed.map(([u, v], i) => [v, i]).sort((a, b) => a[0] - b[0]);
    
    let ans = Infinity;
    for (let rem = 0; rem < n; rem++) {
        const mu = maxU[0][1] !== rem ? maxU[0][0] : maxU[1][0];
        const nu = minU[0][1] !== rem ? minU[0][0] : minU[1][0];
        const mv = maxV[0][1] !== rem ? maxV[0][0] : maxV[1][0];
        const nv = minV[0][1] !== rem ? minV[0][0] : minV[1][0];
        ans = Math.min(ans, Math.max(mu - nu, mv - nv));
    }
    return ans;
}"""
    
    elif 'tree_distances' in lang_map.get('python', '') or 'Tree Distances' in ctx:
        # Problem 3
        code['javascript'] = """function treeDistances(n, edges) {
    const adj = Array.from({length: n}, () => []);
    for (const [u, v] of edges) {
        adj[u - 1].push(v - 1);
        adj[v - 1].push(u - 1);
    }
    
    const subtree = new Array(n).fill(0);
    const sumDown = new Array(n).fill(0);
    const ans = new Array(n).fill(0);
    
    function dfs1(u, parent) {
        subtree[u] = 1;
        for (const v of adj[u]) {
            if (v !== parent) {
                dfs1(v, u);
                subtree[u] += subtree[v];
                sumDown[u] += sumDown[v] + subtree[v];
            }
        }
    }
    
    function dfs2(u, parent) {
        for (const v of adj[u]) {
            if (v !== parent) {
                ans[v] = ans[u] - subtree[v] + (n - subtree[v]);
                dfs2(v, u);
            }
        }
    }
    
    dfs1(0, -1);
    ans[0] = sumDown[0];
    dfs2(0, -1);
    return ans;
}"""
    
    elif 'count_good_subarrays' in lang_map.get('python', ''):
        # Problem 4: Manhattan Subarrays
        code['cpp'] = """int countGoodSubarrays(vector<int>& arr) {
    int n = arr.size();
    int ans = n + (n - 1);
    for (int i = 0; i < n - 2; i++) {
        int a = arr[i], b = arr[i+1], c = arr[i+2];
        if (!(a <= b && b <= c) && !(a >= b && b >= c)) ans++;
        if (i + 3 < n) {
            int d = arr[i+3];
            bool ok = true;
            for (int x = i; x < i+2 && ok; x++)
                for (int y = x+1; y < i+3 && ok; y++)
                    for (int z = y+1; z < i+4; z++) {
                        int p = arr[x], q = arr[y], r = arr[z];
                        if ((p <= q && q <= r) || (p >= q && q >= r)) { ok = false; break; }
                    }
            if (ok) ans++;
        }
    }
    return ans;
}"""
        code['java'] = """public static int countGoodSubarrays(int[] arr) {
    int n = arr.length;
    int ans = n + (n - 1);
    for (int i = 0; i < n - 2; i++) {
        int a = arr[i], b = arr[i+1], c = arr[i+2];
        if (!(a <= b && b <= c) && !(a >= b && b >= c)) ans++;
        if (i + 3 < n) {
            boolean ok = true;
            for (int x = i; x < i+2 && ok; x++)
                for (int y = x+1; y < i+3 && ok; y++)
                    for (int z = y+1; z < i+4; z++) {
                        int p = arr[x], q = arr[y], r = arr[z];
                        if ((p <= q && q <= r) || (p >= q && q >= r)) { ok = false; break; }
                    }
            if (ok) ans++;
        }
    }
    return ans;
}"""
        code['javascript'] = """function countGoodSubarrays(arr) {
    const n = arr.length;
    let ans = n + (n - 1);
    for (let i = 0; i < n - 2; i++) {
        const a = arr[i], b = arr[i+1], c = arr[i+2];
        if (!(a <= b && b <= c) && !(a >= b && b >= c)) ans++;
        if (i + 3 < n) {
            let ok = true;
            for (let x = i; x < i+2 && ok; x++)
                for (let y = x+1; y < i+3 && ok; y++)
                    for (let z = y+1; z < i+4; z++) {
                        const p = arr[x], q = arr[y], r = arr[z];
                        if ((p <= q && q <= r) || (p >= q && q >= r)) { ok = false; break; }
                    }
            if (ok) ans++;
        }
    }
    return ans;
}"""
    
    elif 'hamming_distance' in lang_map.get('python', ''):
        # Problem 5: Hamming Distance
        code['javascript'] = """function hammingDistance(x, y) {
    const xor = x ^ y;
    return (xor >>> 0).toString(2).split('1').length - 1;
}"""
    
    return make_blocks(missing, code)

# ============================================================
# POLYGON PROBLEMS
# ============================================================
def gen_polygon(group, missing, ctx, lang_map):
    code = {}
    
    if 'polygon_area' in lang_map.get('python', '') and 'area += x1 * y2 - x2 * y1' in lang_map.get('python', ''):
        # Shoelace Formula
        code['javascript'] = """function polygonArea(vertices) {
    const n = vertices.length;
    let area = 0;
    for (let i = 0; i < n; i++) {
        const [x1, y1] = vertices[i];
        const [x2, y2] = vertices[(i + 1) % n];
        area += x1 * y2 - x2 * y1;
    }
    return Math.abs(area) / 2;
}"""
    
    elif 'is_convex' in lang_map.get('python', '') and 'cross(o, a, b)' in lang_map.get('python', ''):
        # Convex Polygon Check (template) / Problem 3: Convex Polygon
        code['cpp'] = """bool isConvex(vector<vector<int>>& points) {
    int n = points.size();
    if (n < 3) return false;
    auto cross = [&](int oi, int ai, int bi) {
        int ox = points[oi][0], oy = points[oi][1];
        int ax = points[ai][0], ay = points[ai][1];
        int bx = points[bi][0], by = points[bi][1];
        return (long long)(ax - ox) * (by - oy) - (long long)(ay - oy) * (bx - ox);
    };
    bool sign = false;
    bool set = false;
    for (int i = 0; i < n; i++) {
        long long c = cross(i, (i+1)%n, (i+2)%n);
        if (c != 0) {
            if (!set) { sign = c > 0; set = true; }
            else if ((c > 0) != sign) return false;
        }
    }
    return true;
}"""
        code['java'] = """public boolean isConvex(int[][] points) {
    int n = points.length;
    if (n < 3) return false;
    Boolean sign = null;
    for (int i = 0; i < n; i++) {
        long c = cross(points[i], points[(i+1)%n], points[(i+2)%n]);
        if (c != 0) {
            if (sign == null) sign = c > 0;
            else if ((c > 0) != sign) return false;
        }
    }
    return true;
}

static long cross(int[] o, int[] a, int[] b) {
    return (long)(a[0] - o[0]) * (b[1] - o[1]) - (long)(a[1] - o[1]) * (b[0] - o[0]);
}"""
        code['javascript'] = """function cross(o, a, b) {
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
}

function isConvex(points) {
    const n = points.length;
    if (n < 3) return false;
    let sign = null;
    for (let i = 0; i < n; i++) {
        const c = cross(points[i], points[(i + 1) % n], points[(i + 2) % n]);
        if (c !== 0) {
            if (sign === null) sign = c > 0;
            else if ((c > 0) !== sign) return false;
        }
    }
    return true;
}"""
    
    elif 'point_in_polygon' in lang_map.get('python', ''):
        # Point-in-Polygon
        code['javascript'] = """function pointInPolygon(point, vertices) {
    const [x, y] = point;
    const n = vertices.length;
    let inside = false;
    for (let i = 0; i < n; i++) {
        const [x1, y1] = vertices[i];
        const [x2, y2] = vertices[(i + 1) % n];
        if ((y1 > y) !== (y2 > y)) {
            const xIntersect = x1 + (x2 - x1) * (y - y1) / (y2 - y1);
            if (x < xIntersect) inside = !inside;
        }
    }
    return inside;
}"""
    
    elif 'polygon_perimeter' in lang_map.get('python', ''):
        # Polygon Perimeter
        code['javascript'] = """function polygonPerimeter(vertices) {
    const n = vertices.length;
    let perim = 0;
    for (let i = 0; i < n; i++) {
        const [x1, y1] = vertices[i];
        const [x2, y2] = vertices[(i + 1) % n];
        perim += Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
    }
    return perim;
}"""
    
    elif 'fancy_fence' in lang_map.get('python', '') or 'Fancy Fence' in ctx:
        # Problem 1: Fancy Fence
        code['javascript'] = """function fancyFence(angle) {
    if (360 % (180 - angle) === 0) {
        const n = 360 / (180 - angle);
        return n >= 3;
    }
    return false;
}"""
    
    return make_blocks(missing, code)

if __name__ == '__main__':
    run()
