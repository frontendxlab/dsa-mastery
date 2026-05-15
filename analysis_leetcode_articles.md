# LeetCode DSA Pattern Articles — Analysis

---

## ARTICLE 1: Graph algorithms + problems to practice
**URL:** https://leetcode.com/discuss/study-guide/1326900/graph-algorithms-problems-to-practice  
**Author:** Aleksei (9u6j)  
**Focus:** Graph algorithms master-reference with code templates and categorized problem lists  

### Patterns Covered
| # | Pattern | Code Template | Key Insight |
|---|---------|---------------|-------------|
| 1 | **BFS** | Full C++ solution for Evaluate Division using queue + visited set | Use `level-size` loop to track depth; can track `parent` to reconstruct path |
| 2 | **DFS** | Recursive traversal with `unordered_set<int> visited` | Use for connected components: iterate all nodes, call DFS on unvisited |
| 3 | **Dijkstra** | `priority_queue<ip, vector<ip>, greater<ip>>` + `dist[]` + `visited[]` | Critical optimizations: skip if `dist[node] < n_cost`; skip visited; early exit if `node == dst` |
| 4 | **Union-Find** | Iterative find with path compression, Union method | Use `vector<int> parent` or `unordered_map<int,int>` if node count unknown; `parent[id] == id` means root |
| 5 | **MST (Kruskal)** | Sort edges by weight + UnionFind + counter `count == n-1` | Early return once graph is fully connected |
| 6 | **Topological Sort (Kahn's)** | `indegree[]` + `queue<int>` — decrement indegree of neighbors; push when 0 | Requires DAG |
| 7 | **Bellman-Ford** | Relax all edges n times; `dist[t[1]] > dist[t[0]] + t[2]` | Stop early if no update occurs in an iteration |
| 8 | **Floyd-Warshall** | 3 loops: `dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])` | All-pairs shortest; O(V³) |
| 9 | **Eulerian Path** | DFS, build result on backtrack — `res.push_back(start)`, then `reverse` | Removes consumed edges from adjacency list while traversing |

### BFS Code Template (C++)
```cpp
double bfs(unordered_map<string, vector<ip>>& adj, vector<string>& query) {
    unordered_set<string> visited;
    string start = query[0], end = query[1];
    queue<ip> q;
    q.push({start, 1.0});
    visited.insert(start);
    while (!q.empty()) {
        int sz = q.size();
        for (int i = 0; i < sz; i++) {
            auto [node, cost] = q.front(); q.pop();
            if (!adj.count(node)) continue;
            if (node == end) return cost;
            for (auto& a : adj[node]) {
                if (!visited.count(a.first)) {
                    q.push({a.first, cost * a.second});
                    visited.insert(node);
                }
            }
        }
    }
    return -1.0;
}
```

### DFS Code Template (C++)
```cpp
void dfs(unordered_map<int, vector<int>>& graph, int node, unordered_set<int>& visited) {
    visited.insert(node);
    for (auto& n : graph[node]) {
        if (!visited.count(n)) {
            dfs(graph, n, visited);
        }
    }
}
// Find connected components:
int count = 0;
for (int i = 0; i < n; i++) {
    if (!visited.count(i)) {
        count++;
        dfs(graph, i, visited);
    }
}
```

### Dijkstra Code Template (C++)
```cpp
using ip = pair<int, int>;
priority_queue<ip, vector<ip>, greater<ip>> pq;
vector<int> dist(n + 1, INT_MAX);
vector<bool> visited(n + 1, false);
pq.push({0, k});
dist[k] = 0;
while (!pq.empty()) {
    auto [n_cost, node] = pq.top(); pq.pop();
    visited[node] = true;
    if (dist[node] < n_cost) continue;       // skip stale entries
    for (auto& [next, cost] : adj[node]) {
        if (visited[next]) continue;         // skip processed
        if (dist[next] > dist[node] + cost) {
            dist[next] = dist[node] + cost;
            pq.push({dist[next], next});
        }
    }
}
```

### Union-Find Code Template (C++)
```cpp
class UnionFind {
public:
    UnionFind(int n) : parent(n) {
        iota(parent.begin(), parent.end(), 0);
    }
    int Find(int x) {
        int temp = x;
        while (temp != parent[temp]) temp = parent[temp];
        while (x != temp) {            // path compression
            int next = parent[x];
            parent[x] = temp;
            x = next;
        }
        return x;
    }
    void Union(int x, int y) {
        int xx = Find(x), yy = Find(y);
        if (xx != yy) parent[xx] = yy;
    }
private:
    vector<int> parent;
};
```

### Problem Groups
| Variation | Problems |
|-----------|----------|
| **BFS** | Flood Fill, Number of Islands, Word Ladder I/II, Evaluate Division, Get Watched Videos by Your Friends, Cut Off Trees for Golf Event |
| **DFS** | Number of Islands, Flood Fill, Longest Increasing Path in Matrix, Evaluate Division, Robot Room Cleaner, Most Stones Removed, Reconstruct Itinerary, Tree Diameter, Accounts Merge |
| **Connected Components** | Number of Provinces, Number of Connected Components in an Undirected Graph, Number of Operations to Make Network Connected, Accounts Merge, Critical Connections in a Network |
| **Dijkstra** | Path With Maximum Minimum Value, Network Delay Time, Path with Maximum Probability, Path With Minimum Effort, Cheapest Flights Within K Stops |
| **Union Find** | Number of Islands, Largest Component Size by Common Factor, Most Stones Removed, Number of Connected Components |
| **MST** | Connecting Cities With Minimum Cost, Min Cost to Connect All Points |
| **Topological Sort** | Course Schedule I/II, Sequence Reconstruction, Alien Dictionary |
| **Floyd Warshall** | Find the City With the Smallest Number of Neighbors, Network Delay Time |
| **Bellman Ford** | Network Delay Time |

### Triggers (When to Use Which)
| Scenario | Algorithm |
|----------|-----------|
| Shortest path, unweighted graph | BFS |
| Shortest path, positive weights | Dijkstra |
| Shortest path, negative weights | Bellman-Ford |
| All-pairs shortest paths | Floyd-Warshall |
| Detect cycle, connected components | DFS / Union-Find |
| Dependency order / task scheduling | Topological Sort (Kahn's) |
| Minimum cost to connect all nodes | MST (Kruskal = Union-Find + sort) |
| Path using every edge once | Eulerian Path |

### Key Insights
- BFS can be used with **weighted cost propagation** (Evaluate Division pattern: multiply costs along path)
- Dijkstra optimizations: skip visited nodes AND skip when `dist[node] < n_cost` (stale priority queue entries)
- Union-Find with `unordered_map<int,int>` when node labels are non-contiguous or unknown
- Eulerian path = DFS that removes edges during traversal + builds result on backtrack
- **Same problem solved with multiple algorithms**: Network Delay Time solved with Dijkstra, Bellman-Ford, AND Floyd-Warshall

---

## ARTICLE 2: Become Master In Graph
**URL:** https://leetcode.com/discuss/study-guide/2360573/become-master-in-graph  
**Author:** Himanshu Malik (hi-malik) — inspired by Striver/TUF  
**Focus:** Beginner-friendly graph tutorial with visual explanations, BFS/DFS fundamentals, cycle detection, bipartite check, topological sort  

### Patterns Covered
1. **Graph representation** (Adjacency Matrix vs Adjacency List with space complexity)
2. **BFS traversal** (connected component version + disconnected graph handling)
3. **DFS traversal** (with connected components loop)
4. **Cycle detection in undirected graph** (BFS: track parent; DFS: pass parent parameter)
5. **Cycle detection in directed graph** (DFS: `vis[]` + `dfsVis[]` arrays)
6. **Bipartite graph check** (BFS: color[] array, 1 - color[nde]; DFS: recursive coloring)
7. **Topological Sort** (DFS with stack + Kahn's algorithm with indegree array)

### Code Templates

**Cycle Detection — Directed Graph (DFS, Java)**
```java
class Solution {
    public boolean isCyclic(int V, ArrayList<ArrayList<Integer>> adj) {
        int vis[] = new int[V + 1];
        int dfsVis[] = new int[V + 1];
        for(int i = 0; i < V; i++) {
            if(vis[i] == 0) {
                if(cycleDFS(i, vis, dfsVis, adj)) return true;
            }
        }
        return false;
    }
    public boolean cycleDFS(int node, int vis[], int dfsVis[], ArrayList<ArrayList<Integer>> adj) {
        vis[node] = 1;
        dfsVis[node] = 1;
        for(Integer i : adj.get(node)) {
            if(vis[i] == 0) {
                if(cycleDFS(i, vis, dfsVis, adj)) return true;
            } else if(dfsVis[i] == 1) return true;
        }
        dfsVis[node] = 0;  // backtrack
        return false;
    }
}
```

**Bipartite Check — BFS (Java)**
```java
public boolean isBipartite(int V, ArrayList<ArrayList<Integer>> adj) {
    int color[] = new int[V + 1];
    Arrays.fill(color, -1);
    for(int i = 0; i < V; i++) {
        if(color[i] == -1) {
            if(!bfs(i, color, adj)) return false;
        }
    }
    return true;
}
public boolean bfs(int node, int color[], ArrayList<ArrayList<Integer>> adj) {
    Queue<Integer> q = new LinkedList<>();
    q.add(node);
    color[node] = 1;
    while(!q.isEmpty()) {
        int nde = q.poll();
        for(Integer i : adj.get(nde)) {
            if(color[i] == -1) {
                q.add(i);
                color[i] = 1 - color[nde];
            } else if(color[i] == color[nde]) return false;
        }
    }
    return true;
}
```

### Problem Groups (implied — practice-based)
| Pattern | Key Problems |
|---------|-------------|
| BFS Traversal | Connected and disconnected graph BFS |
| DFS Traversal | Connected and disconnected graph DFS |
| Cycle in Undirected | BFS with parent tracking, DFS with parent param |
| Cycle in Directed | vis[] + dfsVis[] arrays |
| Bipartite Graph | Color array with BFS/DFS, "same-color neighbor" = violation |
| Topological Sort | DFS stack method; Kahn's (indegree + queue) |

### Triggers
| Pattern | When to Use |
|---------|-------------|
| vis[] + dfsVis[] | Directed graph cycle detection — need both global visited AND recursion stack |
| Color array with `1 - color[nde]` | Bipartite check — if neighbor has same color = not bipartite |
| Indegree array + queue | Kahn's algorithm for topological sort; also detects cycles (if not all nodes processed) |

### Key Insights
- **Adjacency Matrix** is simple but wasteful: O(V²) space, MLE for V > 10⁵. Use adjacency list: `O(V+E)` space
- Directed graph cycle detection needs **two** arrays: `vis[]` (visited globally) and `dfsVis[]` (current DFS recursion stack). If a node is visited AND in current recursion stack = back edge = cycle
- Bipartite check = graph 2-coloring problem. Odd-cycle graphs are NOT bipartite
- BFS for cycle in undirected: track parent per-node. If neighbor is visited AND not parent = cycle
- The article explicitly uses **Hands-on approach**: each concept explained with an example walkthrough, then code, then complexity analysis

---

## ARTICLE 3: Disjoint Set Union (DSU) / Union-Find — A Complete Guide
**URL:** https://leetcode.com/discuss/general-discussion/1072418/Disjoint-Set-Union-(DSU)Union-Find-A-Complete-Guide  
**Author:** Sumukh Bhardwaj  
**Focus:** DSU from first principles with gradual optimization (naive → union by size → path compression)  

### Patterns Covered
1. **Naive DSU** — simple recursive find, arbitrary union
2. **Union by Size** — attach smaller tree under larger tree, keep height minimal
3. **Path Compression** — during find, set parent of all nodes in path to root
4. **Full optimized DSU** — union by size + path compression together

### Code Templates

**Naive DSU**
```java
int find(int u) {
    if(u == representative[u]) return u;
    else return find(representative[u]);
}
void combine(int u, int v) {
    u = find(u);
    v = find(v);
    if(u == v) return;
    else representative[v] = u;
}
```

**Union by Size**
```java
void combine(int u, int v) {
    u = find(u);
    v = find(v);
    if(u == v) return;
    if(size[u] > size[v]) {
        representative[v] = u;
        size[u] += size[v];
    } else {
        representative[u] = v;
        size[v] += size[u];
    }
}
```

**Path Compression (in Find)**
```java
int find(int u) {
    if(u == representative[u]) return u;
    else return representative[u] = find(representative[u]);  // path compression
}
```

### Problem Groups
| Variation | Problems |
|-----------|----------|
| **DSU Practice** | LeetCode List: `5lhmb4mj` (curated by rowe1227 & pleasegetmeajob) |

### Triggers
| Scenario | Use DSU When |
|----------|-------------|
| Connect/disconnect queries on dynamic graph | Online connectivity |
| "Are two elements in same set?" | Find(u) == Find(v) |
| "Merge two groups" | Union(u, v) |
| Counting connected components | Count roots where parent[i] == i |
| Building MST (Kruskal's) | Sort edges, union if not already connected |

### Key Insights
- DSU is **one of the easiest data structures to implement** — the author's claim
- **Three optimizations build on each other**:
  1. Naive: O(N) find
  2. Union by size: O(log N) find (tree stays balanced)
  3. Path compression + union by size: amortized O(α(N)) — practically constant
- Path compression code is deceptively simple: `representative[u] = find(representative[u])` — one-line change with massive impact
- The **representative array** is the core: `representative[i] == i` means i is a root
- **Misconception warning**: path compression can break rank tracking if using actual rank (height), but with union by size this is fine

---

## ARTICLE 4: Tree question pattern || 2021 placement
**URL:** https://leetcode.com/discuss/study-guide/1337373/Tree-question-pattern-oror2021-placement  
**Author:** Manisha  
**Focus:** Categorized problem list for Tree/BST interview preparation  

### Patterns Covered (Problem Categories)
| # | Category | Example Problems | Count |
|---|----------|-----------------|-------|
| 1 | **Ancestor Problems** | LCA BST, LCA BT, Max Diff Node/Ancestor, LCA Deepest Leaves, Kth Ancestor | 6 |
| 2 | **Root to Leaf Path** | Binary Tree Paths, Path Sum III, Smallest String From Leaf, Sum Root to Leaf, Pseudo-Palindromic Paths | 6 |
| 3 | **Serialize/Deserialize** | Serialize BT, Verify Preorder, Serialize BST | 4 |
| 4 | **Leaves Related** | Sum of Left Leaves, Leaf Similar Trees, Deepest Leaves Sum, Delete Leaves | 4 |
| 5 | **Level Order Traversal** | Level Order, ZigZag, Right Side View, Largest Value Each Row, Max Width, Average of Levels, Even Odd Tree | 15 |
| 6 | **Node Deletion** | Delete Nodes Return Forest, Delete Node in BST | 2 |
| 7 | **Tree Construction** | Construct from Pre+In/In+Post/Pre+Post, Sorted Array/List to BST, Unique BSTs II | 10 |
| 8 | **Distance Between Nodes** | Min Distance BST Nodes, Sum of Distances in Tree, All Nodes Distance K | 3 |
| 9 | **Inorder Traversal** | Increasing Order BST, BST to Greater Sum Tree, Validate BST, All Elements in Two BSTs | 6 |
| 10 | **Flipping** | Flip Equivalent BT, Flip BT to Match Preorder | 2 |
| 11 | **Check BT** | Check Completeness, Univalued BT | 3 |
| 12 | **Tree Relations** | Cousins in BT | 1 |
| 13 | **Counting Nodes** | Count Good Nodes, Nodes with Same Label, Good Leaf Pairs, Unique BSTs | 4 |
| 14 | **Recovery** | Recover BST | 1 |
| 15 | **Kth Smallest** | Kth Smallest in BST, Kth Largest in Stream | 2 |
| 16 | **Trimming/Pruning** | Trim BST | 1 |
| 17 | **Searching** | Search in BST | 1 |
| 18 | **Depth Problems** | Max Depth, Min Depth, Min Absolute Diff, Max Depth N-ary | 4 |

### Recommended Study Sequence (from comments)
1. Tree Construction → 2. Inorder Traversal → 3. Root to Leaf → 4. Leaves → 5. Level Order → 6. Node Deletion → 7. Searching → 8. Distance → 9. Kth Smallest → 10. Flipping → 11. Check BT → 12. Relations → 13. Counting → 14. Recovery → 15. Trimming → 16. Checking → 17. Depth

### Key Insights
- **Ancestor types**: BST (use value comparison) vs BT (use recursive LCA) vs Deepest Leaves (find deepest level first) vs Kth (binary lifting)
- **Serialize** patterns: Preorder + marker for null; BFS level-order with nulls
- **Construction pattern**: Need inorder + another traversal for unique tree. Preorder + Postorder = multiple trees possible
- **Distance problems** progress: simple adjacency (BST min diff) → DFS path traversal (Distance K) → rerooting DP (Sum of Distances)
- **Explicit difficulty mapping** per problem (Easy/Medium/Hard) in comments

---

## ARTICLE 5: Master Tree Patterns
**URL:** https://leetcode.com/discuss/study-guide/5020529/Master-Tree-Patterns/  
**Author:** Ezio Super Empath (mercer80)  
**Focus:** Tree patterns organized by technique with solution links  

### Patterns Covered
| # | Pattern | Sub-patterns | Key Insight |
|---|---------|-------------|-------------|
| 1 | **Level Order Traversal** | Basic, Bottom-up, N-ary, ZigZag, Add Row, Reverse Odd Levels, Min Ops to Sort | BFS with queue; DFS with level variable also works |
| 2 | **Depth/Height Based** | Max Depth, Min Depth, N-ary Depth | Check if height is 0 or 1-indexed |
| 3 | **Tree Construction** | Pre+In, In+Post, Pre+Post, Max BT, Construct String | Divide & Conquer; Pre+Post can give multiple trees |
| 4 | **Counting** | Count Complete Tree Nodes, Good Nodes, Univalue Subtrees | Count with condition; DFS + global counter |
| 5 | **Comparison on Two Trees** | Same Tree, Symmetric, Leaf Similar, Subtree | Run DFS/BFS simultaneously on both trees |
| 6 | **Path** | Longest Univalue Path, Max Path Sum | Total paths between any two nodes = n×(n−1)/2 |
| 7 | **Rooted Path** | Sum Root to Leaf, Binary Tree Paths, Path Sum, Smallest String | Backtracking; path forms number/binary |
| 8 | **Leaves** | Sum Left Leaves, Deepest Leaves, Delete Leaves | Operations on leaf nodes specifically |
| 9 | **Ancestor** | LCA BT, LCA Deepest, Kth Ancestor, Max Diff | Recursive LCA = node where left and right both contain targets |
| 10 | **Iterative Traversals** | Inorder, Preorder, Postorder | Stack-based; Inorder = left→root→right |
| 11 | **Graph Creation** | Distance K, Min Height Trees, Sum Distances, BT Infected | Convert tree to graph when needing bi-directional movement |
| 12 | **DP on Trees** | House Robber III, All Possible Full BT, BT Cameras | Postorder DP: compute state for each node from children |
| 13 | **BST** | Search, Validate, Mode, Two Sum, Range Sum, Sorted to BST, LCA BST | Inorder of BST = sorted; Use property for LCA (value comparison) |

### Code Templates (description of approach)

**Tree Construction — Divide & Conquer**
- Preorder[0] = root → find root in inorder → left subarray = left tree, right subarray = right tree
- Recursively build

**BST LCA**
- If both p.val < root.val → go left
- If both p.val > root.val → go right
- Else root is LCA

**Level Order — BFS with Queue**
```cpp
queue<TreeNode*> q;
q.push(root);
while (!q.empty()) {
    int sz = q.size();
    for (int i = 0; i < sz; i++) {
        TreeNode* node = q.front(); q.pop();
        // process node
        if (node->left) q.push(node->left);
        if (node->right) q.push(node->right);
    }
}
```

### Key Insights
- **Graph Creation** pattern: When you need to move bi-directionally (e.g., find nodes at distance K), convert tree to adjacency list graph first
- **Iterative vs Recursive**: Both can solve same problems; iterative avoids stack overflow
- **BST uniqueness**: All BST problems leverage the sorted-inorder property
- **Path formula**: Number of paths between any two nodes = `n × (n-1) / 2`
- **Construction rule**: Inorder + Preorder/Postorder = unique tree; Preorder + Postorder = may have multiple solutions

---

## ARTICLE 6: Binary Trees study guide
**URL:** https://leetcode.com/discuss/study-guide/1212004/Binary-Trees-study-guide  
**Author:** Piyush Agarwal (ag_piyush)  
**Focus:** Learning progression for Binary Trees with intuition building  

### Patterns Covered
| Stage | Categories | Key Intuition |
|-------|-----------|---------------|
| **Basics** | Inorder, Preorder, Postorder, Level Order | DFS → recursion/stack; BFS → queue |
| **Fundamentals** | Same Tree, Symmetric, Max Depth, Balanced, Min Depth, Merge, Diameter, Invert, Tilt | Foundation building blocks |
| **BST** | Search, Two Sum, Min Abs Diff, Range Sum, Delete, Trim, Insert, Kth Smallest, All Elements | Use BST property (left < root < right) |
| **Path Problems** | Binary Tree Paths, Path Sum I/II, Sum Root to Leaf, Max Path Sum, Path Sum III, Pseudo-Palindromic | Root-to-leaf traversal; prefix sum for Path Sum III |
| **Construction** | Pre+In, In+Post, Pre+Post, Sorted Array → BST, BST from Preorder | Observe position of root in each traversal |
| **View Problems** | Right Side View(+ left/bottom/top) | Level-order or DFS with level tracking |
| **LCA** | LCA BT, LCA BST, LCA Deepest Leaves | Recursive: node where left and right each contain one target |
| **Validate** | Validate BT Nodes, Validate BST | Inorder check for BST; BFS for completeness |
| **Miscellaneous** | Flatten to LL, Count Complete Nodes, Max Width, Check Completeness, Cousins, Max Diff, Distance K, Clone, Vertical Order | Diverse patterns combining multiple techniques |

### Level Order Intuition (BFS)
```
queue<TreeNode*> q — initially push root
while queue not empty:
    tempSize = q.size()  // size of current level
    for tempSize iterations:
        pop front, process
        if left exists → push left
        if right exists → push right
```

### Construction Intuition
```
Preorder:  [root, ...left..., ...right...]
Inorder:   [...left..., root, ...right...]
Postorder: [...left..., ...right..., root]
→ Root position tells you where left/right subtrees split
```

### Key Insights
- **Learning progression**: Traversals → Basic problems → BST → Path problems → Construction → Views → LCA → Validate → Advanced
- Two problems marked **utmost important**: Path Sum III (prefix sum on tree) and Pseudo-Palindromic Paths (bitmask on tree path)
- BST property is a **force multiplier**: many problems that are O(n) on BT become O(h) on BST
- **Comment wisdom**: "Once you have the formula for tree level traversal you can apply it to so many problems"
- Comment provides curated list: `9e6fzz02`

---

## ARTICLE 7: Become Master In Recursion
**URL:** https://leetcode.com/discuss/study-guide/1733447/Become-Master-In-Recursion  
**Author:** Himanshu Malik (hi-malik) — inspired by Aditya Verma's recursion series  
**Focus:** Recursion fundamentals with IP-OP method and IBH (Induction-Base-Hypothesis) method  

### Patterns Covered
| # | Method | When to Use | Core Idea |
|---|--------|-------------|-----------|
| 1 | **IP-OP Method** (Decision Tree) | Problems with Choices + Decision | Build recursive tree: at each level, decide Yes/No for current element; input gets smaller |
| 2 | **IBH Method** (Induction-Base-Hypothesis) | Problems without explicit choices | Hypothesis = assume solves for smaller input; Induction = combine; Base = smallest valid input |
| 3 | **Recursive Tree** | All recursive problems | Visual representation of choices branching out |

### Code Templates

**IBH Pattern — Print 1 to N**
```java
void solve(int n) {
    if (n == 0) return;         // Base Condition
    solve(n - 1);               // Hypothesis
    System.out.println(n);      // Induction
}
```

**IBH Pattern — Print N to 1**
```java
void solve(int n) {
    if (n == 0) return;
    System.out.println(n);      // Induction first
    solve(n - 1);               // Hypothesis
}
```

**Tree Height (IBH Pattern)**
```java
int maxDepth(TreeNode root) {
    if (root == null) return 0;                     // Base
    int left = maxDepth(root.left);                 // Hypothesis
    int right = maxDepth(root.right);
    return Math.max(left, right) + 1;               // Induction
}
```

**Sort Array Using Recursion (IBH Pattern)**
```java
ArrayList sort(ArrayList<Integer> arr) {
    if (arr.size() == 1) return arr;                    // Base
    int temp = arr.get(arr.size() - 1);                 // Hypothesis: hold last
    arr.remove(arr.size() - 1);
    sort(arr);                                          // sort rest
    insert(arr, temp);                                  // Induction: insert held
    return arr;
}
ArrayList insert(ArrayList<Integer> arr, int temp) {
    if (arr.size() == 0 || temp >= arr.get(arr.size()-1)) {
        arr.add(temp); return arr;                      // Base
    }
    int val = arr.get(arr.size()-1);                    // Hypothesis
    arr.remove(arr.size()-1);
    insert(arr, temp);                                  // Induction
    arr.add(val);
    return arr;
}
```

**Sort Stack / Reverse Stack** — Same IBH pattern applied to stack data structure
**Delete Middle from Stack** — Same pattern with k = size/2 + 1

### Problem Groups
| Variation | Problems Solved in Article |
|-----------|---------------------------|
| **IBH Basics** | Print 1 to N, Print N to 1 |
| **Tree** | Height of Binary Tree |
| **Array** | Sort an Array |
| **Stack** | Sort a Stack, Delete Middle Element, Reverse a Stack |
| **IP-OP / Subset** | Print Subsets, Unique Subsets |
| **String** | Permutation with Spaces, Permutation with Case Change, Letter Case Permutation |
| **Backtracking** | Generate All Balanced Parenthesis, Tower of Hanoi, Kth Symbol in Grammar |

### Triggers (Recursion Detection)
| Signal | Explanation |
|--------|-------------|
| **Choices + Decisions** | Problem offers choices (include/exclude, left/right) → recursion |
| **Smaller subproblems** | Problem can be broken into identical smaller problems → recursion |
| **Tree/Graph traversal** | Natural recursion due to branching structure |
| **Backtracking** | Need to explore all possibilities → recursion |
| **Divide & Conquer** | Merge sort, Quick sort, Tree construction → recursion |

### Key Insights
- **IBH Method**: Only worry about making input 1 step smaller. Rest happens automatically via recursion stack
- **IP-OP Method**: Draw recursive tree — output is built at leaf nodes
- **Choice + Decision problems always use recursion**: Subset, permutation, combination, parenthesis
- **Stack IBH pattern**: Hold top element, recurse on remaining, then insert/process held element on return — this is the universal "reverse/transform" pattern
- **Print order depends on when you print relative to recursive call**: Before call = descending (N to 1); After call = ascending (1 to N)
- Article is based on Aditya Verma's recursion series (credited in comments)

---

## Cross-Cutting Insights

### Graph — DFS vs BFS Decision
| Criterion | Use BFS | Use DFS |
|-----------|---------|---------|
| Shortest path (unweighted) | ✅ BFS finds shortest path | ❌ May find longer path first |
| All nodes reachable | ✅ | ✅ |
| Topological order | ✅ Kahn's Algorithm | ✅ Stack-based |
| Cycle detection (undirected) | ✅ Track parent in queue | ✅ Track parent parameter |
| Cycle detection (directed) | ❌ (use Kahn's for cycle detection) | ✅ vis[] + dfsVis[] arrays |
| Connected components | ✅ | ✅ |
| Bipartite check | ✅ Color + BFS | ✅ Color + DFS recursion |
| Memory (deep graphs) | Better (queue ≤ width) | Risk of stack overflow |
| Finding ANY path quickly | May explore many nodes | ✅ Goes deep fast |

### Tree — Traversal Decision
| Goal | Traversal |
|------|-----------|
| Process before children | Preorder (root → left → right) |
| Process between children (BST sorted order) | Inorder (left → root → right) |
| Process after children (compute from children up) | Postorder (left → right → root) |
| Process level by level | Level Order (BFS with queue) |
| Right-to-left on odd levels | ZigZag (BFS with flag toggle) |

### DSU Pattern Variations
| Variation | Use Case | Key Change |
|-----------|----------|------------|
| Basic Union-Find | Connectivity queries | `parent[]` array |
| Union by Size | Performance optimization | `size[]` array |
| Path Compression | Near O(1) find | `return parent[u] = find(parent[u])` |
| Union by Rank | Alternative to size | `rank[]` for tree height |
| DSU with Map | Unknown/sparse nodes | `unordered_map<int,int>` |
| DSU Rollback | Offline queries | Stack to undo operations |
| DSU on 2D grid | Island problems | Map (r,c) to linear index: `r * cols + c` |

### Unique Takeaways per Article
1. **Article 1**: Same problem solved via 3 different shortest-path algorithms; BFS with cost multiplication
2. **Article 2**: Two-array technique for directed cycle detection (vis + dfsVis); clear connected-component loop idiom
3. **Article 3**: Progressive optimization (naive → union-by-size → path-compression) shows DSU evolution
4. **Article 4**: Largest categorized problem list (100+ problems); recommended study sequence
5. **Article 5**: Tree-to-graph conversion pattern for bidirectional problems; path count formula
6. **Article 6**: Learning progression from fundamentals to advanced; prefix sum on tree (Path Sum III)
7. **Article 7**: Universal IBH pattern applicable across domains (array, stack, tree); IP-OP method for subset/permutation
