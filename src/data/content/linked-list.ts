import type { Article } from '../articles'

export const linkedListArticle: Article = {
  slug: 'linked-list',
  title: 'Linked List',
  emoji: '🔗',
  tagline: 'Dummy node. Slow/fast pointers. Reverse in-place.',
  description: 'Linked list problems have 4-5 core techniques that combine to solve almost everything: dummy node for head modification, slow/fast pointers for middle/cycle, in-place reversal, partition+merge, and the LRU pattern.',
  gradient: 'from-fuchsia-400 to-pink-500',
  topicSlug: 'linked_list',
  readTime: '18 min',
  sections: [
    {
      type: 'callout',
      icon: '💡',
      color: 'teal',
      content: `**While loop condition rule**: Look at what you access INSIDE the loop.\n- Access \`curr.next\` → condition: \`while (curr)\`\n- Access \`curr.next.next\` → condition: \`while (curr && curr.next)\`\n\nThis prevents null pointer errors without special-casing every edge condition.`,
    },
    {
      type: 'callout',
      icon: '🔑',
      color: 'green',
      content: `**Dummy node**: Whenever the head node might be modified or removed, create a dummy node that points to head. This turns "delete head" into a normal node deletion — no special cases. Return \`dummy.next\` at the end.`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Core Templates',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'In-place reversal (prev always starts null)',
      code: `// prev = null because the last node of reversed list points to nothing
let prev = null, curr = head;
while (curr) {
    const next = curr.next;  // save next before overwriting
    curr.next = prev;        // reverse the pointer
    prev = curr;             // prev advances to current
    curr = next;             // curr advances to saved next
}
return prev;  // prev is the new head`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Slow/fast pointer — find middle',
      code: `let slow = head, fast = head;
while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
}
// slow = middle node
// for even-length: slow = second of the two middles`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Partition into two lists, merge at end',
      code: `let left = new ListNode(), right = new ListNode();
const lHead = left, rHead = right;

let curr = head;
while (curr) {
    if (condition(curr.val)) { left.next = curr; left = left.next; }
    else { right.next = curr; right = right.next; }
    curr = curr.next;
}
right.next = null;     // CRITICAL: null-terminate right to prevent cycle
left.next = rHead.next;
return lHead.next;`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Reverse Linked List II (Reverse sublist from left to right)',
      url: 'https://leetcode.com/problems/reverse-linked-list-ii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Find the sublist, reverse it, reconnect',
          explanation: `Navigate to the node just before position left (using dummy + prev pointer). Then perform an in-place reversal for (right - left) iterations using the "splice-to-front" technique: take curr.next, splice it out, prepend it after prev. Each iteration moves one node to the front of the reversing segment.`,
          code: `var reverseBetween = function(head, left, right) {
    const dummy = new ListNode(0, head);
    let prev = dummy;
    // navigate to node before reversal starts
    for (let i = 1; i < left; i++) prev = prev.next;

    let curr = prev.next;
    // splice next node to front, (right-left) times
    for (let i = 0; i < right - left; i++) {
        const temp = curr.next;    // node to move to front
        curr.next = temp.next;     // remove temp from position
        temp.next = prev.next;     // temp now points to current front
        prev.next = temp;          // prev now points to temp (new front)
    }
    return dummy.next;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Reorder List',
      url: 'https://leetcode.com/problems/reorder-list/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Three steps — find middle, reverse second half, merge',
          explanation: `1. Find middle with slow/fast pointers\n2. Cut list at middle (slow.next = null to split)\n3. Reverse second half\n4. Merge first and reversed second half alternately: take one from each, interleave\n\nNote: initial prev = null in reversal is correct — the first node of the reversed half (originally the tail) should point to null.`,
          code: `var reorderList = function(head) {
    // Step 1: find middle
    let slow = head, fast = head;
    while (fast && fast.next) { slow = slow.next; fast = fast.next.next; }

    // Step 2: reverse second half
    let prev = null, curr = slow.next;
    slow.next = null;  // cut at middle
    while (curr) {
        const next = curr.next;
        curr.next = prev; prev = curr; curr = next;
    }

    // Step 3: merge two halves
    let first = head, second = prev;
    while (second) {
        const t1 = first.next, t2 = second.next;
        first.next = second;
        second.next = t1;
        first = t1;
        second = t2;
    }
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Linked List Cycle II (Find cycle entry point)',
      url: 'https://leetcode.com/problems/linked-list-cycle-ii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Floyd\'s algorithm — detect then locate',
          explanation: `Phase 1: Use slow/fast pointers. When they meet, a cycle exists.\nPhase 2: Move slow back to head. Now move BOTH slow and fast one step at a time. Where they meet again is the cycle entry point.\n\nWhy? The math: let F = steps to cycle entry, C = cycle length. When slow/fast meet, slow traveled (F + a), fast traveled (F + a + nC). Since fast = 2*slow: F = (n-1)C + (C - a). So from head, F steps = from meeting point, (C - a) steps. Moving one pointer from head and one from meeting point at same speed: they meet at cycle entry.`,
          code: `var detectCycle = function(head) {
    let slow = head, fast = head;
    // Phase 1: detect
    while (fast && fast.next) {
        slow = slow.next; fast = fast.next.next;
        if (slow === fast) break;
    }
    if (!fast || !fast.next) return null;  // no cycle

    // Phase 2: locate entry
    slow = head;
    while (slow !== fast) { slow = slow.next; fast = fast.next; }
    return slow;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'LRU Cache',
      url: 'https://leetcode.com/problems/lru-cache/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: HashMap + Doubly Linked List for O(1) get and put',
          explanation: `LRU needs: O(1) lookup (HashMap: key→node) + O(1) move-to-front + O(1) evict-tail. Doubly Linked List handles move and evict in O(1) because each node has both prev and next pointers — no traversal needed.\n\nStructure: head (MRU end) ←→ ... ←→ tail (LRU end). For get: lookup in map, remove from current position, insert at head. For put: if exists update+move; if new, insert at head, if over capacity remove tail node.`,
          code: `class Node { constructor(k, v) { this.key=k; this.val=v; this.prev=this.next=null; } }

class LRUCache {
    constructor(cap) {
        this.cap = cap;
        this.map = new Map();
        this.head = new Node(0,0);  // dummy MRU sentinel
        this.tail = new Node(0,0);  // dummy LRU sentinel
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    _remove(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    _insertFront(node) {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next.prev = node;
        this.head.next = node;
    }
    get(key) {
        if (!this.map.has(key)) return -1;
        const node = this.map.get(key);
        this._remove(node); this._insertFront(node);
        return node.val;
    }
    put(key, val) {
        if (this.map.has(key)) {
            const node = this.map.get(key);
            node.val = val;
            this._remove(node); this._insertFront(node);
            return;
        }
        const node = new Node(key, val);
        this.map.set(key, node);
        this._insertFront(node);
        if (this.map.size > this.cap) {
            const lru = this.tail.prev;
            this._remove(lru);
            this.map.delete(lru.key);
        }
    }
}`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: JavaScript Map insertion-order trick',
          explanation: `JavaScript Maps maintain insertion order. For LRU: delete + re-insert to "move to most recently used." To evict LRU: map.keys().next().value gives the first (oldest) key. This works ONLY in JS, not in interviews expecting a general solution.`,
          code: `class LRUCache {
    constructor(cap) { this.cap = cap; this.map = new Map(); }
    get(key) {
        if (!this.map.has(key)) return -1;
        const v = this.map.get(key);
        this.map.delete(key); this.map.set(key, v);  // move to end = most recent
        return v;
    }
    put(key, val) {
        if (this.map.has(key)) this.map.delete(key);
        this.map.set(key, val);
        if (this.map.size > this.cap)
            this.map.delete(this.map.keys().next().value);  // evict oldest
    }
}`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Remove Nodes From Linked List (Monotonic Stack)',
      url: 'https://leetcode.com/problems/remove-nodes-from-linked-list/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Reverse → scan with max tracking → reverse back',
          explanation: `Remove every node that has a node with greater value to its right. Reverse the list, then scan: keep running max, remove any node less than current max. Reverse again. Two reversal + one scan = O(n).`,
        },
        {
          label: 'Intuition 2: Monotonic decreasing stack',
          explanation: `Scan left to right. Maintain a stack where values are monotonically decreasing. For each node, pop all smaller nodes from the stack (they'd be removed anyway — there's a larger value to their right). Push current node. After processing all nodes, reconnect the stack nodes sequentially.`,
          code: `var removeNodes = function(head) {
    const stack = [];
    let curr = head;
    while (curr) {
        while (stack.length && stack.at(-1).val < curr.val) stack.pop();
        stack.push(curr);
        curr = curr.next;
    }
    for (let i = 0; i < stack.length - 1; i++) stack[i].next = stack[i+1];
    if (stack.length) stack[stack.length-1].next = null;
    return stack[0];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'More Worked Problems',
    },
    {
      type: 'problem',
      num: 6,
      title: 'Merge K Sorted Lists',
      url: 'https://leetcode.com/problems/merge-k-sorted-lists/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Divide and conquer — merge pairs recursively',
          explanation: `Instead of merging one by one (O(kN)), merge lists in pairs like merge sort. log(k) rounds, each O(N) total = O(N log k).`,
          code: `var mergeKLists = function(lists) {
    if (!lists.length) return null;
    const merge2 = (l1, l2) => {
        const dummy = new ListNode(0);
        let curr = dummy;
        while (l1 && l2) {
            if (l1.val <= l2.val) { curr.next = l1; l1 = l1.next; }
            else { curr.next = l2; l2 = l2.next; }
            curr = curr.next;
        }
        curr.next = l1 || l2;
        return dummy.next;
    };
    while (lists.length > 1) {
        const merged = [];
        for (let i = 0; i < lists.length; i += 2)
            merged.push(merge2(lists[i], lists[i+1] ?? null));
        lists = merged;
    }
    return lists[0];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 7,
      title: 'Reorder List',
      url: 'https://leetcode.com/problems/reorder-list/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Find middle, reverse second half, merge two halves',
          explanation: `Three steps: (1) Find middle with slow/fast pointers. (2) Reverse the second half. (3) Merge the two halves by alternating nodes (first from left half, then from right half).`,
          code: `var reorderList = function(head) {
    // Step 1: find middle
    let slow = head, fast = head;
    while (fast.next && fast.next.next) { slow = slow.next; fast = fast.next.next; }
    // Step 2: reverse second half
    let prev = null, curr = slow.next;
    slow.next = null;
    while (curr) { const next = curr.next; curr.next = prev; prev = curr; curr = next; }
    // Step 3: merge
    let l1 = head, l2 = prev;
    while (l2) {
        const n1 = l1.next, n2 = l2.next;
        l1.next = l2;
        l2.next = n1;
        l1 = n1; l2 = n2;
    }
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 8,
      title: 'Copy List with Random Pointer',
      url: 'https://leetcode.com/problems/copy-list-with-random-pointer/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: HashMap old→new node, two passes',
          explanation: `Pass 1: create all new nodes, store mapping old→new. Pass 2: for each node, set new.next = map[old.next] and new.random = map[old.random].`,
          code: `var copyRandomList = function(head) {
    if (!head) return null;
    const map = new Map();
    let curr = head;
    while (curr) { map.set(curr, new Node(curr.val)); curr = curr.next; }
    curr = head;
    while (curr) {
        map.get(curr).next = map.get(curr.next) ?? null;
        map.get(curr).random = map.get(curr.random) ?? null;
        curr = curr.next;
    }
    return map.get(head);
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: O(1) space — interleave nodes, then separate',
          explanation: `Weave copy nodes between originals: A→A'→B→B'→C→C'. Set random pointers (A'.random = A.random.next). Then unweave the two lists.`,
          code: `var copyRandomList = function(head) {
    if (!head) return null;
    // Step 1: interleave
    let curr = head;
    while (curr) {
        const copy = new Node(curr.val);
        copy.next = curr.next;
        curr.next = copy;
        curr = copy.next;
    }
    // Step 2: set random on copies
    curr = head;
    while (curr) {
        if (curr.random) curr.next.random = curr.random.next;
        curr = curr.next.next;
    }
    // Step 3: unweave
    curr = head;
    const copyHead = head.next;
    while (curr) {
        const copy = curr.next;
        curr.next = copy.next;
        if (copy.next) copy.next = copy.next.next;
        curr = curr.next;
    }
    return copyHead;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 9,
      title: 'Flatten a Multilevel Doubly Linked List',
      url: 'https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DFS/stack — flatten child lists in-place',
          explanation: `Whenever we encounter a node with a child, insert the flattened child list between current node and current.next. Use a stack or recursion. The key operation: find the tail of the child list, connect it to current.next, then connect current to child.`,
          code: `var flatten = function(head) {
    let curr = head;
    while (curr) {
        if (curr.child) {
            const child = curr.child;
            const next = curr.next;
            // Find tail of child list
            let tail = child;
            while (tail.next) tail = tail.next;
            // Insert child list
            curr.next = child; child.prev = curr; curr.child = null;
            tail.next = next; if (next) next.prev = tail;
        }
        curr = curr.next;
    }
    return head;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'amber',
      content: `**Recursive linked list reversal**: works by reversing the rest of the list first, then fixing the current node's pointers when recursion unwinds.\n\`\`\`\nif (!head || !head.next) return head;\nconst newHead = reverse(head.next);\nhead.next.next = head;  // last node of reversed part now points back\nhead.next = null;       // break old forward link\nreturn newHead;\n\`\`\`\n\n**Linked list pattern checklist:**\n- "Find middle" → slow/fast pointers (slow ends at middle)\n- "Detect cycle" → Floyd's: slow+fast, if they meet, cycle exists\n- "k-th from end" → two pointers gap k apart\n- "Merge/sort" → divide and conquer (merge sort on lists)\n- "Copy with extra pointers" → HashMap OR interleave trick (O(1) space)`,
    },
  ],
}
