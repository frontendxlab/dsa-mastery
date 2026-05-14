import type { Article } from '../articles'

export const numericalMethodsArticle: Article = {
  slug: 'numerical-methods',
  title: 'Numerical Methods & Optimization',
  emoji: '📈',
  tagline: 'Binary search on reals. Ternary search on unimodal functions. Simulated annealing for hard optimizations.',
  description: 'Numerical methods for competitive programming: binary search on real-valued answers, ternary search on unimodal functions, Newton\'s method, and simulated annealing for continuous optimization problems.',
  gradient: 'from-emerald-400 to-teal-500',
  topicSlug: 'num_methods',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `Numerical methods bridge continuous math and discrete algorithms. The core skill: recognizing when an answer is real-valued (not integer) and which search/optimization technique applies. Binary search on reals converges in ~50 iterations to any required precision. Ternary search finds the minimum/maximum of a unimodal function. Simulated annealing escapes local optima for NP-hard problems.`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Binary Search on Reals',
    },
    {
      type: 'callout',
      icon: '🔑',
      color: 'teal',
      content: `**Pattern:** "Find smallest/largest real x such that f(x) is true/false." f must be monotone.\n\n**Convergence:** 100 iterations gives precision ~10⁻³⁰. Usually 50 iterations is enough for any problem.\n\n**Common uses:** find radius such that k circles cover all points, find time t such that tasks complete, find speed such that journey is possible.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Binary search on real-valued answer',
      code: `// Template: find smallest x in [lo, hi] where check(x) is true
function binarySearchReal(lo, hi, check, iterations = 100) {
    for (let i = 0; i < iterations; i++) {
        const mid = (lo + hi) / 2;
        if (check(mid)) hi = mid;
        else lo = mid;
    }
    return (lo + hi) / 2;
}

// Example: minimum radius so k circles cover all n points on a line
function minRadius(points, k) {
    points.sort((a, b) => a - b);
    const check = (r) => {
        let covered = 0, circles = 0;
        while (covered < points.length) {
            circles++;
            const start = points[covered];
            // circle covers [start, start + 2r]
            while (covered < points.length && points[covered] <= start + 2*r)
                covered++;
        }
        return circles <= k;
    };
    return binarySearchReal(0, points[points.length-1]-points[0], check);
}`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Ternary Search (Unimodal Functions)',
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'blue',
      content: `**Unimodal:** strictly decreasing then increasing (or vice versa) — one minimum/maximum.\n\n**Ternary search:** at each step, evaluate f at m1=(lo+2lo+hi)/3 and m2=(lo+hi+2hi)/3. Eliminate the third where the function value is worse.\n\n**Convergence:** each iteration shrinks range by 1/3. Need ~200 iterations for float precision.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Ternary search — find minimum of unimodal function',
      code: `// Find x in [lo, hi] minimizing f(x), where f is unimodal (convex)
function ternarySearch(lo, hi, f, iterations = 200) {
    for (let i = 0; i < iterations; i++) {
        const m1 = lo + (hi - lo) / 3;
        const m2 = hi - (hi - lo) / 3;
        if (f(m1) < f(m2)) hi = m2;
        else lo = m1;
    }
    return (lo + hi) / 2;
}

// Example: find point on line segment closest to origin
// f(t) = distance from point (t*ax + (1-t)*bx, t*ay + (1-t)*by) to (0,0)
function closestPointOnSegment(ax, ay, bx, by) {
    const f = t => {
        const x = ax + t*(bx-ax), y = ay + t*(by-ay);
        return x*x + y*y;
    };
    const t = ternarySearch(0, 1, f);
    return [ax + t*(bx-ax), ay + t*(by-ay)];
}

// Integer ternary search
function ternarySearchInt(lo, hi, f) {
    while (hi - lo > 2) {
        const m1 = Math.floor((lo*2 + hi) / 3);
        const m2 = Math.floor((lo + hi*2) / 3);
        if (f(m1) <= f(m2)) hi = m2;
        else lo = m1;
    }
    let best = lo;
    for (let x = lo+1; x <= hi; x++) if (f(x) < f(best)) best = x;
    return best;
}`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Simulated Annealing',
    },
    {
      type: 'callout',
      icon: '🌡️',
      color: 'amber',
      content: `**When to use:** problem is NP-hard or has no clean greedy/DP solution. Accepts slightly worse solutions with probability e^(-delta/T) to escape local optima. Temperature T decreases over time (cooling schedule).\n\n**Common in CP:** TSP variants, continuous coordinate optimization, problems where brute force times out and heuristic is acceptable.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Simulated annealing template',
      code: `function simulatedAnnealing(initialState, energy, neighbor, maxIter = 100000) {
    let state = initialState;
    let bestState = state;
    let bestEnergy = energy(state);
    let T = 1.0; // initial temperature
    const cooling = 0.9999;

    for (let i = 0; i < maxIter; i++) {
        T *= cooling;
        const next = neighbor(state);
        const delta = energy(next) - energy(state);
        // Accept if better, or with probability e^(-delta/T) if worse
        if (delta < 0 || Math.random() < Math.exp(-delta / T)) {
            state = next;
            if (energy(state) < bestEnergy) {
                bestState = state;
                bestEnergy = energy(state);
            }
        }
    }
    return bestState;
}

// Example: minimize sum of distances from point to set of points (geometric median)
// neighbor: small random perturbation of (x, y)
// energy: sum of euclidean distances`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Newton\'s Method',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Newton\'s method — find root of f(x) = 0',
      code: `// Fast square root via Newton's method
function sqrtNewton(n) {
    if (n === 0) return 0;
    let x = n;
    while (true) {
        const next = (x + n/x) / 2;
        if (Math.abs(next - x) < 1e-9) return next;
        x = next;
    }
}

// General Newton iteration: x_{n+1} = x_n - f(x_n)/f'(x_n)
// Converges quadratically (doubles correct digits each step)
function newtonMethod(f, fPrime, x0, tolerance = 1e-9) {
    let x = x0;
    for (let i = 0; i < 100; i++) {
        const dx = f(x) / fPrime(x);
        x -= dx;
        if (Math.abs(dx) < tolerance) break;
    }
    return x;
}`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Kth Smallest Number in Multiplication Table',
      url: 'https://leetcode.com/problems/kth-smallest-number-in-multiplication-table/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Binary search on value — count elements ≤ mid',
          explanation: 'Binary search on answer x: count how many values in m×n multiplication table are ≤ x. For each row i, count = min(x/i, n). Find smallest x where count ≥ k.',
          code: `var findKthNumber = function(m, n, k) {
    let lo=1, hi=m*n;
    while(lo<hi) {
        const mid=(lo+hi)>>1;
        let count=0;
        for(let i=1;i<=m;i++) count+=Math.min(Math.floor(mid/i),n);
        if(count>=k) hi=mid; else lo=mid+1;
    }
    return lo;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Find the Smallest Divisor Given a Threshold',
      url: 'https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Binary search on divisor',
          explanation: 'Binary search on the divisor d. For a given d, sum = Σ ceil(nums[i]/d). Find smallest d where sum ≤ threshold. Function is monotone decreasing in d.',
          code: `var smallestDivisor = function(nums, threshold) {
    let lo=1, hi=Math.max(...nums);
    while(lo<hi) {
        const mid=(lo+hi)>>1;
        const sum=nums.reduce((s,n)=>s+Math.ceil(n/mid),0);
        if(sum<=threshold) hi=mid; else lo=mid+1;
    }
    return lo;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Minimize Max Distance to Gas Station',
      url: 'https://leetcode.com/problems/minimize-max-distance-to-gas-station/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Binary search on real-valued max gap',
          explanation: 'Binary search on answer D (max gap). For a given D, greedily count how many stations needed: for each segment of length L, need ceil(L/D)-1 stations. Binary search on real D with ~100 iterations.',
          code: `var minmaxGasDist = function(stations, k) {
    const check = D => {
        let need = 0;
        for (let i=1;i<stations.length;i++)
            need += Math.ceil((stations[i]-stations[i-1])/D) - 1;
        return need <= k;
    };
    let lo=0, hi=stations[stations.length-1]-stations[0];
    for (let i=0;i<100;i++) {
        const mid=(lo+hi)/2;
        if(check(mid)) hi=mid; else lo=mid;
    }
    return lo;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧠',
      color: 'green',
      content: `**Choosing the right method:**\n- Answer is a real number, condition is monotone → binary search on reals (100 iters)\n- Find min/max of unimodal continuous function → ternary search (200 iters)\n- Need fast root finding → Newton's method (converges in ~10 iters)\n- NP-hard, approximate answer OK → simulated annealing\n\n**Precision rule:** 100 iterations of binary search on [0, 1e9] gives ~10⁻²¹ precision. Way more than enough.`,
    },
  ],
}
