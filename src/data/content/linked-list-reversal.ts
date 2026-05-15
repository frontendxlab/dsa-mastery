import type { Article } from '../articles'

export const linkedListReversalArticle: Article = {
  slug: 'linked-list-reversal',
  title: 'Linked List Reversal Patterns',
  emoji: '🔀',
  tagline: 'Reverse full list, reverse k-groups, reverse between positions, copy with random.',
  description: 'Linked list reversal is a fundamental building block: reverse full list, reverse k-group, reverse between positions, and reorder list. Core technique: three-pointer reversal (prev, curr, next). For k-group: reverse k nodes at a time, reconnect groups. For random pointer copy: two passes or HashMap approach. These patterns test pointer manipulation under pressure.',
  gradient: 'from-blue-700 to-indigo-800',
  topicSlug: 'linked_list',
  readTime: '13 min',
  sections: [
    {
      type: 'text',
      content: `Reverse full list: prev=null, curr=head. While curr: save next, reverse pointer, advance. Reverse between m and n: walk to position m, reverse n-m+1 nodes, reconnect. Reverse k-groups: reverse k nodes, recurse on rest, connect. Copy with random pointer: first pass clone without random, second pass set randoms using a HashMap of original→clone.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Reverse full list and reverse k-groups',
      code: `// Reverse full linked list
function reverseList(head) {
    let prev = null, curr = head;
    while (curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev; // new head
}

// Reverse nodes in k-group
function reverseKGroup(head, k) {
    // Check if k nodes remain
    let node = head, count = 0;
    while (node && count < k) { node = node.next; count++; }
    if (count < k) return head; // less than k nodes left

    // Reverse k nodes
    let prev = null, curr = head;
    for (let i = 0; i < k; i++) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    // head is now the tail of this group; connect to next group
    head.next = reverseKGroup(curr, k);
    return prev; // new head of this group
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
      title: 'Reverse Linked List II',
      url: 'https://leetcode.com/problems/reverse-linked-list-ii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Walk to position left, reverse right-left+1 nodes, reconnect',
          explanation: `Use dummy node. Walk to node before left position. Save that node as "before". Reverse the sublist [left..right]. Connect before.next to new head of reversed portion; old head.next to what comes after right.`,
          code: `var reverseBetween = function(head, left, right) {
    const dummy={next:head}; let pre=dummy;
    for(let i=0;i<left-1;i++) pre=pre.next;
    let cur=pre.next,prev=null;
    for(let i=0;i<right-left+1;i++){
        const next=cur.next; cur.next=prev; prev=cur; cur=next;
    }
    pre.next.next=cur; pre.next=prev;
    return dummy.next;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Reverse Nodes in k-Group',
      url: 'https://leetcode.com/problems/reverse-nodes-in-k-group/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Recursion — reverse k, recurse on rest, connect',
          explanation: `Count k nodes from head. If < k, return head unchanged. Reverse k nodes. head.next = reverseKGroup(curr, k) where curr is the (k+1)th node.`,
          code: `var reverseKGroup = function(head, k) {
    let node=head,cnt=0;
    while(node&&cnt<k){node=node.next;cnt++;}
    if(cnt<k) return head;
    let prev=null,cur=head;
    for(let i=0;i<k;i++){const n=cur.next;cur.next=prev;prev=cur;cur=n;}
    head.next=reverseKGroup(cur,k);
    return prev;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Copy List with Random Pointer',
      url: 'https://leetcode.com/problems/copy-list-with-random-pointer/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: HashMap original→clone, two passes',
          explanation: `First pass: clone all nodes (next=null, random=null), store map[original]=clone. Second pass: set clone.next = map[original.next], clone.random = map[original.random].`,
          code: `var copyRandomList = function(head) {
    if(!head) return null;
    const map=new Map();
    let cur=head;
    while(cur){map.set(cur,{val:cur.val,next:null,random:null});cur=cur.next;}
    cur=head;
    while(cur){
        map.get(cur).next=map.get(cur.next)||null;
        map.get(cur).random=map.get(cur.random)||null;
        cur=cur.next;
    }
    return map.get(head);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Reorder List',
      url: 'https://leetcode.com/problems/reorder-list/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Find middle, reverse second half, merge two halves',
          explanation: `Three steps: (1) Find middle using slow/fast. (2) Reverse second half. (3) Merge first half and reversed second half alternately.`,
          code: `var reorderList = function(head) {
    // Find middle
    let slow=head,fast=head;
    while(fast.next&&fast.next.next){slow=slow.next;fast=fast.next.next;}
    // Reverse second half
    let prev=null,cur=slow.next; slow.next=null;
    while(cur){const n=cur.next;cur.next=prev;prev=cur;cur=n;}
    // Merge
    let l1=head,l2=prev;
    while(l2){const n1=l1.next,n2=l2.next;l1.next=l2;l2.next=n1;l1=n1;l2=n2;}
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🔀',
      color: 'blue',
      content: `**Reversal pointer sequence:** prev←curr→next. Save next before reversing. Three-pointer dance: next=curr.next; curr.next=prev; prev=curr; curr=next.\n\n**k-group trick:** After reversing k nodes, original head becomes new tail. head.next connects to recursively reversed rest.\n\n**Copy with O(1) space (no HashMap):** Interleave clones: A→A'→B→B'→C→C'. Set randoms: A'.random = A.random.next. Separate lists: A→B→C and A'→B'→C'.`,
    },
  ],
}
