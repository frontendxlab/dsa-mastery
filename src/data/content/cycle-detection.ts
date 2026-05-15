import type { Article } from '../articles'

export const cycleDetectionArticle: Article = {
  slug: 'cycle-detection',
  title: 'Cycle Detection',
  emoji: '🔄',
  tagline: "Floyd's tortoise and hare. O(n) time, O(1) space. Detects AND finds the cycle.",
  description: "Cycle detection in linked lists and function sequences uses Floyd's algorithm (tortoise and hare) — two pointers at different speeds meet inside the cycle, then reset one to find the cycle start. Applies to: linked list cycles, find duplicate (array as linked list), Floyd cycle in sequences.",
  gradient: 'from-orange-600 to-red-700',
  topicSlug: 'linked_list',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `Floyd's cycle detection algorithm uses two pointers: slow (moves 1 step) and fast (moves 2 steps). If there's a cycle, they must meet inside it. Once they meet: reset slow to start, keep fast at meeting point, advance both 1 step — they'll meet again at the cycle's entry point. O(n) time, O(1) space.`,
    },
    {
      type: 'heading',
      level: 2,
      text: "Floyd's Algorithm — Template",
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: "Floyd's tortoise and hare — detect cycle AND find entry point",
      code: `// PHASE 1: Detect cycle — does one exist?
function hasCycle(head) {
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) return true; // cycle detected
    }
    return false; // fast reached null = no cycle
}

// PHASE 2: Find cycle entry point
// After slow and fast meet inside cycle:
// Reset slow to head, keep fast at meeting point
// Both advance 1 step — meet again at cycle start
function detectCycle(head) {
    let slow = head, fast = head;
    // Phase 1: find meeting point
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) break;
    }
    if (!fast || !fast.next) return null; // no cycle
    // Phase 2: find cycle entry
    slow = head;
    while (slow !== fast) {
        slow = slow.next;
        fast = fast.next; // both move 1 step now
    }
    return slow; // cycle entry node
}

// WHY DOES PHASE 2 WORK?
// Let d = distance from head to cycle start
// Let c = cycle length, m = meeting point distance from cycle start
// When they meet: slow traveled d+m, fast traveled d+m + kc (k full cycles extra)
// fast = 2×slow → 2(d+m) = d+m+kc → d+m = kc → d = kc-m
// From meeting point, distance to cycle start = c-m (almost there)
// d = kc-m = (k-1)c + (c-m) → "distance from head" = "distance from meeting to start"`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Linked List Cycle',
      url: 'https://leetcode.com/problems/linked-list-cycle/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: HashSet — store visited nodes',
          explanation: `Store all visited nodes in a set. If we revisit a node, cycle exists. O(n) space.`,
          code: `var hasCycle = function(head) {
    const seen=new Set();
    while(head){
        if(seen.has(head)) return true;
        seen.add(head);
        head=head.next;
    }
    return false;
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: Floyd\'s — O(1) space',
          explanation: `Slow and fast pointers. If cycle exists, fast laps slow and they meet. If no cycle, fast reaches null.`,
          code: `var hasCycle = function(head) {
    let slow=head, fast=head;
    while(fast&&fast.next){
        slow=slow.next; fast=fast.next.next;
        if(slow===fast) return true;
    }
    return false;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Linked List Cycle II (find entry)',
      url: 'https://leetcode.com/problems/linked-list-cycle-ii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Floyd\'s two-phase algorithm',
          explanation: `Phase 1: find meeting point. Phase 2: reset slow to head, advance both 1 step until they meet — that's the cycle entry. See template above for the math proof.`,
          code: `var detectCycle = function(head) {
    let slow=head,fast=head;
    while(fast&&fast.next){
        slow=slow.next;fast=fast.next.next;
        if(slow===fast){
            slow=head; // reset slow
            while(slow!==fast){slow=slow.next;fast=fast.next;}
            return slow;
        }
    }
    return null;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Find the Duplicate Number',
      url: 'https://leetcode.com/problems/find-the-duplicate-number/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Array as linked list — Floyd\'s cycle detection',
          explanation: `nums[0..n] contains numbers 1..n, one duplicate. Treat array as linked list: node i points to nums[i]. Since a value repeats, two nodes point to the same next node — creating a cycle. The cycle entry is the duplicate.`,
          code: `var findDuplicate = function(nums) {
    // Array as linked list: i → nums[i]
    let slow=nums[0], fast=nums[0];
    // Phase 1
    do { slow=nums[slow]; fast=nums[nums[fast]]; } while(slow!==fast);
    // Phase 2: find cycle entry = duplicate
    slow=nums[0];
    while(slow!==fast){ slow=nums[slow]; fast=nums[fast]; }
    return slow;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Happy Number',
      url: 'https://leetcode.com/problems/happy-number/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: Floyd\'s on the "next state" function',
          explanation: `The sequence of digit-sum-square operations either reaches 1 (happy) or loops. Apply Floyd's to this sequence: slow moves one step, fast moves two. If fast reaches 1 → happy. If slow === fast (cycle, not 1) → not happy.`,
          code: `var isHappy = function(n) {
    const next=x=>{let s=0;while(x>0){s+=(x%10)**2;x=Math.floor(x/10);}return s;};
    let slow=n, fast=next(n);
    while(fast!==1&&slow!==fast){slow=next(slow);fast=next(next(fast));}
    return fast===1;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Circular Array Loop',
      url: 'https://leetcode.com/problems/circular-array-loop/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Floyd\'s on each starting position',
          explanation: `For each starting position, apply slow/fast pointers to detect a cycle. Conditions: cycle length > 1, all elements in cycle move in the same direction (all positive or all negative). If cycle detected, verify conditions.`,
          code: `var circularArrayLoop = function(nums) {
    const n=nums.length;
    const next=(i,dir)=>{
        const j=((i+nums[i])%n+n)%n;
        // If direction changes, return i (self-loop = invalid)
        return Math.sign(nums[i])===dir && i!==j ? j : -1;
    };
    for(let i=0;i<n;i++){
        if(!nums[i]) continue;
        const dir=Math.sign(nums[i]);
        let slow=i, fast=i;
        while(true){
            slow=next(slow,dir);
            fast=next(fast,dir);
            if(fast!==-1) fast=next(fast,dir);
            if(slow===-1||fast===-1||slow===fast) break;
        }
        if(slow!==-1&&slow===fast) return true;
    }
    return false;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🔄',
      color: 'orange',
      content: `**Floyd's algorithm applications:**\n- Linked list cycle detection and entry point\n- Find duplicate in array (array as linked list)\n- Detect cycle in any f(x) sequence (Happy Number, etc.)\n- Period detection in iterated functions\n\n**Key insight:** Any sequence x, f(x), f(f(x)),... over a finite set must eventually cycle. Floyd's detects this in O(n) time and O(1) space.\n\n**Phase 2 trick:** Once slow and fast meet inside cycle, reset slow to start, keep fast at meeting point. Advance both at speed 1 — they meet at cycle entry. This works because d = kc - m (see template).`,
    },
  ],
}
