import { Link, createFileRoute } from "@tanstack/react-router";
import { topics, totalProblems, uniquePlatforms } from "#/data/topics";
import { articles } from "#/data/articles";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({ component: HomePage });

// ── Color palette ──────────────────────────────────────────────────────────────
const TOPIC_COLORS: Record<string, string> = {
  math: '#7c3aed', dp: '#0891b2', binary_search: '#2563eb', string: '#ea580c',
  bit: '#ca8a04', tree: '#16a34a', graph: '#0d9488', linked_list: '#db2777',
  advanced_tree: '#6d28d9', sliding_window: '#d97706', heap: '#dc2626',
  shape: '#64748b', backtrack: '#65a30d', trie: '#0284c7',
  sequences: '#9333ea', greedy: '#b45309', combinatorics: '#0f766e',
  game_theory: '#7c3aed', geometry: '#be123c', num_methods: '#1d4ed8',
  miscellaneous: '#475569', linear_algebra: '#6d28d9', scheduling: '#0369a1',
}

const PLATFORMS = ['LeetCode','Codeforces','AtCoder','GeeksforGeeks','CSES','Baekjoon','SPOJ','UVa','HackerRank','CodeChef','Kattis','TopCoder']

const FEATURES = [
  { icon: '⌕', label: 'Explore Problems',   desc: '38,000+ problems across 50+ platforms. Filter by difficulty, platform, topic, and rating range.' },
  { icon: '◈', label: 'Learn Patterns',      desc: `${articles.length} chapters of pattern-based learning. Brute force first, then the insight, then optimal.` },
  { icon: '▦', label: 'Curated Collections', desc: '14 core topics: DP, Graphs, Trees, Binary Search, Sliding Window, and more. Practice systematically.' },
  { icon: '⚡', label: 'Instant Search',      desc: 'Full-text search across problem names, concepts, topics, and platforms. Find what you need instantly.' },
  { icon: '◎', label: 'Track Progress',      desc: 'Mark problems as solved, track per-topic completion. Personal collections — no account needed.' },
  { icon: '✓', label: 'Deduplicated',        desc: 'Every problem carefully deduplicated across platforms. No more solving the same problem twice.' },
]

// ── Floating SVG shape components ─────────────────────────────────────────────
function TreeSVG() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" className="dl" style={{'--dur':'3.2s','--del':'0s'} as React.CSSProperties}>
      <circle cx="36" cy="12" r="6" stroke="#3b9eff" strokeWidth="1.5" className="dl-path"/>
      <circle cx="18" cy="36" r="6" stroke="#3b9eff" strokeWidth="1.5" className="dl-path"/>
      <circle cx="54" cy="36" r="6" stroke="#3b9eff" strokeWidth="1.5" className="dl-path"/>
      <circle cx="9" cy="58" r="5" stroke="#3b9eff" strokeWidth="1.5" className="dl-path"/>
      <circle cx="27" cy="58" r="5" stroke="#3b9eff" strokeWidth="1.5" className="dl-path"/>
      <circle cx="45" cy="58" r="5" stroke="#3b9eff" strokeWidth="1.5" className="dl-path"/>
      <circle cx="63" cy="58" r="5" stroke="#3b9eff" strokeWidth="1.5" className="dl-path"/>
      <line x1="36" y1="18" x2="18" y2="30" stroke="#3b9eff" strokeWidth="1.2" opacity=".5"/>
      <line x1="36" y1="18" x2="54" y2="30" stroke="#3b9eff" strokeWidth="1.2" opacity=".5"/>
      <line x1="18" y1="42" x2="9" y2="53" stroke="#3b9eff" strokeWidth="1.2" opacity=".5"/>
      <line x1="18" y1="42" x2="27" y2="53" stroke="#3b9eff" strokeWidth="1.2" opacity=".5"/>
      <line x1="54" y1="42" x2="45" y2="53" stroke="#3b9eff" strokeWidth="1.2" opacity=".5"/>
      <line x1="54" y1="42" x2="63" y2="53" stroke="#3b9eff" strokeWidth="1.2" opacity=".5"/>
    </svg>
  )
}

function GraphSVG() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" className="dl" style={{'--dur':'4s','--del':'0.4s'} as React.CSSProperties}>
      <circle cx="36" cy="36" r="6" stroke="#6d28d9" strokeWidth="1.5" className="dl-path"/>
      <circle cx="12" cy="20" r="5" stroke="#6d28d9" strokeWidth="1.5" className="dl-path"/>
      <circle cx="60" cy="20" r="5" stroke="#6d28d9" strokeWidth="1.5" className="dl-path"/>
      <circle cx="12" cy="52" r="5" stroke="#6d28d9" strokeWidth="1.5" className="dl-path"/>
      <circle cx="60" cy="52" r="5" stroke="#6d28d9" strokeWidth="1.5" className="dl-path"/>
      <line x1="36" y1="30" x2="12" y2="25" stroke="#6d28d9" strokeWidth="1.2" opacity=".5"/>
      <line x1="36" y1="30" x2="60" y2="25" stroke="#6d28d9" strokeWidth="1.2" opacity=".5"/>
      <line x1="36" y1="42" x2="12" y2="47" stroke="#6d28d9" strokeWidth="1.2" opacity=".5"/>
      <line x1="36" y1="42" x2="60" y2="47" stroke="#6d28d9" strokeWidth="1.2" opacity=".5"/>
      <line x1="12" y1="25" x2="12" y2="47" stroke="#6d28d9" strokeWidth="1.2" opacity=".35"/>
      <line x1="60" y1="25" x2="60" y2="47" stroke="#6d28d9" strokeWidth="1.2" opacity=".35"/>
      <line x1="17" y1="52" x2="31" y2="42" stroke="#6d28d9" strokeWidth="1.2" opacity=".35"/>
    </svg>
  )
}

function LinkedListSVG() {
  return (
    <svg width="88" height="32" viewBox="0 0 88 32" fill="none" className="dl" style={{'--dur':'3.6s','--del':'0.8s'} as React.CSSProperties}>
      <rect x="1" y="9" width="18" height="14" rx="3" stroke="#db2777" strokeWidth="1.5" className="dl-path"/>
      <rect x="35" y="9" width="18" height="14" rx="3" stroke="#db2777" strokeWidth="1.5" className="dl-path"/>
      <rect x="69" y="9" width="18" height="14" rx="3" stroke="#db2777" strokeWidth="1.5" className="dl-path"/>
      <line x1="19" y1="16" x2="35" y2="16" stroke="#db2777" strokeWidth="1.2" opacity=".5"/>
      <polyline points="32,12 35,16 32,20" stroke="#db2777" strokeWidth="1.2" opacity=".5"/>
      <line x1="53" y1="16" x2="69" y2="16" stroke="#db2777" strokeWidth="1.2" opacity=".5"/>
      <polyline points="66,12 69,16 66,20" stroke="#db2777" strokeWidth="1.2" opacity=".5"/>
    </svg>
  )
}

function DPGridSVG() {
  return (
    <svg width="66" height="66" viewBox="0 0 66 66" fill="none" className="dl" style={{'--dur':'3.8s','--del':'1.2s'} as React.CSSProperties}>
      {[0,1,2,3].map(r => [0,1,2,3].map(c => (
        <rect key={`${r}-${c}`} x={4+c*16} y={4+r*16} width="12" height="12" rx="2"
          stroke="#0891b2" strokeWidth="1.2" className="dl-path"
          opacity={r+c < 4 ? '1' : r+c < 6 ? '0.6' : '0.25'}
        />
      )))}
    </svg>
  )
}

function StackSVG() {
  return (
    <svg width="56" height="66" viewBox="0 0 56 66" fill="none" className="dl" style={{'--dur':'3.4s','--del':'1.6s'} as React.CSSProperties}>
      <rect x="4" y="48" width="48" height="14" rx="3" stroke="#16a34a" strokeWidth="1.5" className="dl-path"/>
      <rect x="4" y="30" width="48" height="14" rx="3" stroke="#16a34a" strokeWidth="1.5" className="dl-path"/>
      <rect x="4" y="12" width="48" height="14" rx="3" stroke="#16a34a" strokeWidth="1.5" className="dl-path"/>
      <line x1="28" y1="8" x2="28" y2="2" stroke="#16a34a" strokeWidth="1.4" opacity=".5"/>
      <polyline points="22,6 28,2 34,6" stroke="#16a34a" strokeWidth="1.4" opacity=".5"/>
    </svg>
  )
}

// ── SVG animation helper ──────────────────────────────────────────────────────
const A = (dur: number, del: number) => ({ '--dur': `${dur}s`, '--del': `${del}s` } as React.CSSProperties)

// ── Per-topic large SVG icons (top-right of card) ─────────────────────────────
const TOPIC_SVGS: Record<string, (props: { c: string }) => React.ReactElement> = {
  math: ({ c }) => (
    <svg viewBox="0 0 52 52" fill="none" width="50" height="50">
      <circle cx="26" cy="26" r="21" stroke={c} strokeWidth="1.2" className="dl" style={A(4.5, 0)}/>
      <polygon points="26,9 40,33 12,33" stroke={c} strokeWidth="1.1" fill="none" className="dl" style={A(4.5, .42)}/>
      <circle cx="26" cy="26" r="4.5" stroke={c} strokeWidth="1" opacity=".48" className="dl" style={A(4.5, 1.0)}/>
    </svg>
  ),
  dp: ({ c }) => {
    const d = [0, .22, .44, .16, .48, .74, .3, .62, .9]
    return (
      <svg viewBox="0 0 52 52" fill="none" width="50" height="50">
        {Array.from({ length: 9 }, (_, i) => <rect key={i} x={4+(i%3)*16} y={4+Math.floor(i/3)*16} width="13" height="13" rx="2" stroke={c} strokeWidth="1" className="dl" style={A(4, d[i])}/>)}
        <rect x="4" y="4" width="13" height="13" rx="2" fill={c} opacity=".14"/>
        <rect x="20" y="20" width="13" height="13" rx="2" fill={c} opacity=".14"/>
        <rect x="36" y="36" width="13" height="13" rx="2" fill={c} opacity=".14"/>
      </svg>
    )
  },
  binary_search: ({ c }) => (
    <svg viewBox="0 0 58 28" fill="none" width="56" height="28">
      {[0,1,2,3,4,5,6].map(i => <rect key={i} x={2+i*8} y="4" width="7" height="20" rx="1.5" stroke={c} strokeWidth={i===3?1.5:1} opacity={i===3?1:.36} fill={i===3?`${c}1a`:'none'} className="dl" style={A(4, i*.1)}/>)}
      <line x1="25.5" y1="0" x2="25.5" y2="4" stroke={c} strokeWidth="1.1" opacity=".7"/>
      <polyline points="22.5,3.5 25.5,0 28.5,3.5" stroke={c} strokeWidth="1" fill="none" opacity=".7"/>
    </svg>
  ),
  string: ({ c }) => (
    <svg viewBox="0 0 58 28" fill="none" width="56" height="28">
      {(['a','b','c','a','b'] as const).map((ch, i) => (
        <g key={i}>
          <rect x={2+i*10} y="4" width="9" height="20" rx="2" stroke={c} strokeWidth={i>=1&&i<=3?1.4:1} opacity={i>=1&&i<=3?1:.32} fill={i>=1&&i<=3?`${c}14`:'none'} className="dl" style={A(4, i*.12)}/>
          <text x={6.5+i*10} y="17.5" textAnchor="middle" fill={c} fontSize="6.5" fontFamily="monospace" opacity=".8">{ch}</text>
        </g>
      ))}
      <rect x="11" y="2" width="30" height="24" rx="2" stroke={c} strokeWidth="1.2" opacity=".42" fill="none"/>
    </svg>
  ),
  bit: ({ c }) => {
    const bits = [1,0,1,1,0,1,0,0]
    return (
      <svg viewBox="0 0 68 22" fill="none" width="66" height="22">
        {bits.map((b, i) => (
          <g key={i}>
            <rect x={2+i*8} y="1" width="7" height="20" rx="1.5" stroke={c} strokeWidth="1" opacity={b?.86:.35} className="dl" style={A(4, i*.1)}/>
            <text x={5.5+i*8} y="14.5" textAnchor="middle" fill={c} fontSize="7.5" fontFamily="monospace" opacity={b?.86:.32}>{b}</text>
          </g>
        ))}
      </svg>
    )
  },
  tree: ({ c }) => (
    <svg viewBox="0 0 60 52" fill="none" width="58" height="52">
      <line x1="30" y1="12" x2="16" y2="26" stroke={c} strokeWidth="1" opacity=".48" className="dl" style={A(4,.3)}/>
      <line x1="30" y1="12" x2="44" y2="26" stroke={c} strokeWidth="1" opacity=".48" className="dl" style={A(4,.42)}/>
      <line x1="14" y1="33" x2="7" y2="45" stroke={c} strokeWidth=".9" opacity=".32" className="dl" style={A(4,.78)}/>
      <line x1="18" y1="33" x2="25" y2="45" stroke={c} strokeWidth=".9" opacity=".32" className="dl" style={A(4,.88)}/>
      <line x1="42" y1="33" x2="35" y2="45" stroke={c} strokeWidth=".9" opacity=".32" className="dl" style={A(4,.98)}/>
      <line x1="46" y1="33" x2="53" y2="45" stroke={c} strokeWidth=".9" opacity=".32" className="dl" style={A(4,1.08)}/>
      <circle cx="30" cy="7" r="6" stroke={c} strokeWidth="1.5" className="dl" style={A(4,0)}/>
      <circle cx="14" cy="30" r="5" stroke={c} strokeWidth="1.3" opacity=".8" className="dl" style={A(4,.54)}/>
      <circle cx="46" cy="30" r="5" stroke={c} strokeWidth="1.3" opacity=".8" className="dl" style={A(4,.64)}/>
      <circle cx="5" cy="49" r="4" stroke={c} strokeWidth="1" opacity=".35" className="dl" style={A(4,1.1)}/>
      <circle cx="27" cy="49" r="4" stroke={c} strokeWidth="1" opacity=".35"/>
      <circle cx="33" cy="49" r="4" stroke={c} strokeWidth="1" opacity=".35"/>
      <circle cx="55" cy="49" r="4" stroke={c} strokeWidth="1" opacity=".35"/>
    </svg>
  ),
  graph: ({ c }) => (
    <svg viewBox="0 0 56 52" fill="none" width="54" height="52">
      <line x1="28" y1="8" x2="48" y2="22" stroke={c} strokeWidth="1" opacity=".44" className="dl" style={A(4,.2)}/>
      <line x1="48" y1="22" x2="40" y2="44" stroke={c} strokeWidth="1" opacity=".44" className="dl" style={A(4,.42)}/>
      <line x1="40" y1="44" x2="16" y2="44" stroke={c} strokeWidth="1" opacity=".44" className="dl" style={A(4,.64)}/>
      <line x1="16" y1="44" x2="8" y2="22" stroke={c} strokeWidth="1" opacity=".44" className="dl" style={A(4,.86)}/>
      <line x1="8" y1="22" x2="28" y2="8" stroke={c} strokeWidth="1" opacity=".44" className="dl" style={A(4,1.08)}/>
      <line x1="28" y1="8" x2="16" y2="44" stroke={c} strokeWidth=".8" opacity=".2" className="dl" style={A(4,1.28)}/>
      <circle cx="28" cy="8" r="6" stroke={c} strokeWidth="1.4" className="dl" style={A(4,0)}/>
      <circle cx="48" cy="22" r="5" stroke={c} strokeWidth="1.2" opacity=".85" className="dl" style={A(4,.2)}/>
      <circle cx="40" cy="44" r="5" stroke={c} strokeWidth="1.2" opacity=".85" className="dl" style={A(4,.4)}/>
      <circle cx="16" cy="44" r="5" stroke={c} strokeWidth="1.2" opacity=".85" className="dl" style={A(4,.6)}/>
      <circle cx="8" cy="22" r="5" stroke={c} strokeWidth="1.2" opacity=".85" className="dl" style={A(4,.8)}/>
    </svg>
  ),
  linked_list: ({ c }) => (
    <svg viewBox="0 0 70 24" fill="none" width="68" height="24">
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x={2+i*17} y="3" width="13" height="18" rx="3" stroke={c} strokeWidth="1.3" opacity={1-i*.1} className="dl" style={A(4,i*.3)}/>
          <text x={8.5+i*17} y="14.5" textAnchor="middle" fill={c} fontSize="6.5" fontFamily="monospace" opacity=".8">{i+1}</text>
          {i < 3 && <polyline key={'a'+i} points={`${15+i*17},12 ${18+i*17},12 ${16+i*17},10 ${18+i*17},12 ${16+i*17},14`} stroke={c} strokeWidth="1" fill="none" opacity=".58" className="dl" style={A(4,.22+i*.3)}/>}
        </g>
      ))}
    </svg>
  ),
  advanced_tree: ({ c }) => (
    <svg viewBox="0 0 66 54" fill="none" width="64" height="54">
      <rect x="23" y="2" width="20" height="12" rx="2" stroke={c} strokeWidth="1.3" className="dl" style={A(4,0)}/>
      <text x="33" y="10.5" textAnchor="middle" fill={c} fontSize="5.5" fontFamily="monospace" opacity=".72">0–7</text>
      <line x1="29" y1="14" x2="18" y2="24" stroke={c} strokeWidth="1" opacity=".48" className="dl" style={A(4,.4)}/>
      <line x1="37" y1="14" x2="48" y2="24" stroke={c} strokeWidth="1" opacity=".48" className="dl" style={A(4,.5)}/>
      <rect x="6" y="24" width="22" height="12" rx="2" stroke={c} strokeWidth="1.1" opacity=".78" className="dl" style={A(4,.56)}/>
      <text x="17" y="32.5" textAnchor="middle" fill={c} fontSize="5" fontFamily="monospace" opacity=".62">0–3</text>
      <rect x="38" y="24" width="22" height="12" rx="2" stroke={c} strokeWidth="1.1" opacity=".78" className="dl" style={A(4,.62)}/>
      <text x="49" y="32.5" textAnchor="middle" fill={c} fontSize="5" fontFamily="monospace" opacity=".62">4–7</text>
      {[0,1,2,3,4,5,6,7].map(i => <rect key={i} x={2+i*8} y="46" width="6" height="6" rx="1" stroke={c} strokeWidth="1" opacity=".26" className="dl" style={A(4,.9+i*.06)}/>)}
    </svg>
  ),
  sliding_window: ({ c }) => (
    <svg viewBox="0 0 64 26" fill="none" width="62" height="26">
      {[0,1,2,3,4,5,6].map(i => <rect key={i} x={2+i*9} y="4" width="7" height="18" rx="1.5" stroke={c} strokeWidth={i>=2&&i<=4?1.4:1} opacity={i>=2&&i<=4?1:.33} fill={i>=2&&i<=4?`${c}14`:'none'} className="dl" style={A(4,i*.1)}/>)}
      <rect x="20" y="2" width="27" height="22" rx="2" stroke={c} strokeWidth="1.3" fill="none" className="dl" style={A(4,.82)}/>
    </svg>
  ),
  heap: ({ c }) => (
    <svg viewBox="0 0 64 52" fill="none" width="62" height="52">
      <circle cx="32" cy="8" r="7" stroke={c} strokeWidth="1.5" className="dl" style={A(4,0)}/>
      <text x="32" y="11.5" textAnchor="middle" fill={c} fontSize="6.5" fontFamily="monospace" opacity=".82">1</text>
      <line x1="26" y1="14" x2="18" y2="26" stroke={c} strokeWidth="1" opacity=".48" className="dl" style={A(4,.42)}/>
      <line x1="38" y1="14" x2="46" y2="26" stroke={c} strokeWidth="1" opacity=".48" className="dl" style={A(4,.52)}/>
      <circle cx="16" cy="32" r="6" stroke={c} strokeWidth="1.3" opacity=".78" className="dl" style={A(4,.58)}/>
      <text x="16" y="35.5" textAnchor="middle" fill={c} fontSize="6" fontFamily="monospace" opacity=".68">3</text>
      <circle cx="48" cy="32" r="6" stroke={c} strokeWidth="1.3" opacity=".78" className="dl" style={A(4,.68)}/>
      <text x="48" y="35.5" textAnchor="middle" fill={c} fontSize="6" fontFamily="monospace" opacity=".68">5</text>
      <circle cx="4" cy="50" r="4" stroke={c} strokeWidth="1" opacity=".26" className="dl" style={A(4,1.0)}/>
      <circle cx="28" cy="50" r="4" stroke={c} strokeWidth="1" opacity=".26"/>
      <circle cx="36" cy="50" r="4" stroke={c} strokeWidth="1" opacity=".26"/>
      <circle cx="60" cy="50" r="4" stroke={c} strokeWidth="1" opacity=".26"/>
    </svg>
  ),
  shape: ({ c }) => {
    const cells: React.ReactElement[] = []
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) cells.push(
      <rect key={i*4+j} x={2+j*13} y={2+i*13} width="11" height="11" rx="1.5" stroke={c} strokeWidth="1" opacity={.32+(i+j)*.045} className="dl" style={A(4,(i+j)*.1)}/>
    )
    return (
      <svg viewBox="0 0 56 56" fill="none" width="54" height="54">
        {cells}
        <polyline points="2,2 54,2 54,54 2,54 2,15 41,15 41,41 15,41 15,28" stroke={c} strokeWidth="1.1" fill="none" opacity=".32" className="dl" style={A(4.5,1.2)}/>
      </svg>
    )
  },
  backtrack: ({ c }) => (
    <svg viewBox="0 0 60 54" fill="none" width="58" height="54">
      <circle cx="30" cy="7" r="6" stroke={c} strokeWidth="1.4" className="dl" style={A(4,0)}/>
      <line x1="25" y1="12" x2="14" y2="25" stroke={c} strokeWidth="1" opacity=".58" className="dl" style={A(4,.3)}/>
      <line x1="35" y1="12" x2="46" y2="25" stroke={c} strokeWidth="1" opacity=".58" className="dl" style={A(4,.42)}/>
      <circle cx="12" cy="29" r="5" stroke={c} strokeWidth="1.2" opacity=".78" className="dl" style={A(4,.52)}/>
      <circle cx="48" cy="29" r="5" stroke={c} strokeWidth="1.2" opacity=".78" className="dl" style={A(4,.62)}/>
      <line x1="37" y1="41" x2="43" y2="48" stroke={c} strokeWidth="1.4" opacity=".62"/>
      <line x1="43" y1="41" x2="37" y2="48" stroke={c} strokeWidth="1.4" opacity=".62"/>
      <line x1="53" y1="41" x2="59" y2="48" stroke={c} strokeWidth="1.4" opacity=".62"/>
      <line x1="59" y1="41" x2="53" y2="48" stroke={c} strokeWidth="1.4" opacity=".62"/>
    </svg>
  ),
  trie: ({ c }) => (
    <svg viewBox="0 0 64 56" fill="none" width="62" height="56">
      <circle cx="32" cy="6" r="5" stroke={c} strokeWidth="1.4" className="dl" style={A(4,0)}/>
      <text x="32" y="8.5" textAnchor="middle" fill={c} fontSize="5" fontFamily="monospace" opacity=".78">*</text>
      <line x1="28" y1="11" x2="14" y2="22" stroke={c} strokeWidth="1" opacity=".48" className="dl" style={A(4,.32)}/>
      <line x1="32" y1="11" x2="32" y2="22" stroke={c} strokeWidth="1" opacity=".48" className="dl" style={A(4,.42)}/>
      <line x1="36" y1="11" x2="50" y2="22" stroke={c} strokeWidth="1" opacity=".48" className="dl" style={A(4,.52)}/>
      <circle cx="12" cy="26" r="5" stroke={c} strokeWidth="1.2" opacity=".78" className="dl" style={A(4,.56)}/>
      <text x="12" y="28.5" textAnchor="middle" fill={c} fontSize="5" fontFamily="monospace" opacity=".72">a</text>
      <circle cx="32" cy="26" r="5" stroke={c} strokeWidth="1.2" opacity=".78" className="dl" style={A(4,.66)}/>
      <text x="32" y="28.5" textAnchor="middle" fill={c} fontSize="5" fontFamily="monospace" opacity=".72">b</text>
      <circle cx="52" cy="26" r="5" stroke={c} strokeWidth="1.2" opacity=".78" className="dl" style={A(4,.76)}/>
      <text x="52" y="28.5" textAnchor="middle" fill={c} fontSize="5" fontFamily="monospace" opacity=".72">c</text>
    </svg>
  ),
}

// ── 3D tilt hook ───────────────────────────────────────────────────────────────
function use3DTilt() {
  const ref = useRef<HTMLDivElement>(null)
  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2
    const color = (el.dataset as Record<string, string>).tc || 'rgba(59,158,255,0.3)'
    el.style.transform = `perspective(560px) rotateX(${-y * 6}deg) rotateY(${x * 4.5}deg) translateZ(8px) scale(1.015)`
    el.style.boxShadow = `${-x * 12}px ${6 + y * 4}px 32px rgba(0,0,0,.44),0 0 0 1px ${color}44`
  }
  const onMouseLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = ''
    el.style.boxShadow = ''
  }
  return { ref, onMouseMove, onMouseLeave }
}

// ── Count-up hook ──────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1200) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          const ease = 1 - Math.pow(1 - p, 3)
          setVal(Math.round(ease * target))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration])

  return { val, ref }
}

// ── StatCell ───────────────────────────────────────────────────────────────────
function StatCell({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const { val, ref } = useCountUp(target)
  return (
    <div className="ld2-stat-cell reveal">
      <div className="ld2-stat-value">
        <span ref={ref}>{val.toLocaleString()}</span>{suffix}
      </div>
      <div className="ld2-stat-label">{label}</div>
    </div>
  )
}

// ── TopicCard ──────────────────────────────────────────────────────────────────
function TopicCard({ t }: { t: typeof topics[0] }) {
  const { ref, onMouseMove, onMouseLeave } = use3DTilt()
  const color = TOPIC_COLORS[t.slug] ?? '#3b9eff'
  const SVGComp = TOPIC_SVGS[t.slug]

  return (
    <Link
      to="/explore"
      search={{ topics: t.slug, q: '', platform: 'all', diff: 'tier', tiers: '', rmin: 800, rmax: 3500, sort: 'name', dir: 'asc', page: 1 }}
      className="ld2-topic-card reveal"
    >
      <div
        ref={ref}
        className="ld2-topic-inner"
        data-tc={color}
        style={{ '--tc': color, '--tc-glow': color + '2a' } as React.CSSProperties}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {SVGComp && <div className="ld2-tsvg">{SVGComp({ c: color })}</div>}
        <span className="ld2-tdot" style={{ background: color }} />
        <div className="ld2-tname">{t.name}</div>
        <div className="ld2-tdesc">{t.description}</div>
        <div className="ld2-tmeta">
          <span className="ld2-tcnt">{(t.count ?? 0).toLocaleString()}</span>
          <span>·</span>
          <span>{t.platforms} platforms</span>
        </div>
      </div>
    </Link>
  )
}

// ── FeatureCard ────────────────────────────────────────────────────────────────
function FeatureCard({ f }: { f: typeof FEATURES[0] }) {
  const { ref, onMouseMove, onMouseLeave } = use3DTilt()
  return (
    <div className="ld2-feature-card reveal">
      <div ref={ref} className="ld2-feature-inner" onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
        <div className="ld2-feature-icon">{f.icon}</div>
        <div className="ld2-feature-name">{f.label}</div>
        <p className="ld2-feature-desc">{f.desc}</p>
      </div>
    </div>
  )
}

// ── OpenBook (Codex) ───────────────────────────────────────────────────────────
const TOC_ITEMS = [
  { n: '01', name: 'Points & Lines',      pg: 2  },
  { n: '02', name: 'Triangles & Area',    pg: 8  },
  { n: '03', name: 'Circles & Arcs',      pg: 14 },
  { n: '04', name: 'Polygons',            pg: 22 },
  { n: '05', name: 'Convex Hull',         pg: 30 },
  { n: '06', name: 'Line Intersection',   pg: 40 },
  { n: '07', name: 'Coord. Geometry',     pg: 48 },
  { n: '08', name: 'Transformations',     pg: 56 },
]

function TocPage() {
  return (
    <>
      <div className="ob-ph">Table of Contents</div>
      {TOC_ITEMS.map(r => (
        <div key={r.n} className="ob-toc-row">
          <span className="ob-toc-n">{r.n}</span>
          <span className="ob-toc-t">{r.name}</span>
          <span className="ob-toc-d" />
          <span className="ob-toc-p">{r.pg}</span>
        </div>
      ))}
      <div className="ob-corner" />
    </>
  )
}

function OpenBook() {
  return (
    <div className="ob-stage">
      <div className="ob-glow" />
      <div className="ob-scene">
        <div className="ob-book">
          {/* Left page — TOC */}
          <div className="ob-left">
            <TocPage />
            {/* Flip layer */}
            <div className="ob-flip-layer">
              <div className="ob-flip-front"><TocPage /></div>
              <div className="ob-flip-back">
                <div className="ob-ph">Chapter 04</div>
                <div className="ob-st">Polygons</div>
                <div className="ob-body">A polygon is a plane figure bounded by straight edges. Its signed area is computed with the Shoelace formula:</div>
                <div className="ob-formula-box">
                  <div className="ob-fml">A = ½|Σ(xᵢyᵢ₊₁ − xᵢ₊₁yᵢ)|</div>
                  <div className="ob-fml-cap">Shoelace / Gauss Area Formula</div>
                </div>
                <div className="ob-body">Works for any simple polygon, convex or concave.</div>
                <div className="ob-body" style={{ marginTop: 8, fontSize: '7px', color: 'rgba(30,10,56,.38)' }}>64 problems · Difficulty: Easy–Hard</div>
                <div className="ob-corner" />
              </div>
            </div>
          </div>
          {/* Spine */}
          <div className="ob-spine" />
          {/* Right page — Chapter content */}
          <div className="ob-right">
            <div className="ob-ph">Chapter 01</div>
            <div className="ob-st">Points, Lines &amp; Distances</div>
            <div className="ob-body">Two points in a plane define a unique segment. The straight-line distance between A(x₁,y₁) and B(x₂,y₂):</div>
            <div className="ob-formula-box">
              <div className="ob-fml">d = √(Δx² + Δy²)</div>
              <div className="ob-fml-cap">Euclidean Distance</div>
            </div>
            <div className="ob-st">Manhattan Distance</div>
            <div className="ob-formula-box">
              <div className="ob-fml">d = |x₂−x₁| + |y₂−y₁|</div>
              <div className="ob-fml-cap">L¹ / Taxicab Metric</div>
            </div>
            <div className="ob-body" style={{ fontSize: '7.5px', color: 'rgba(30,10,56,.42)', marginTop: 6 }}>
              142 problems · Difficulty: Easy–Medium
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── HomePage ───────────────────────────────────────────────────────────────────
function HomePage() {
  // Cursor glow
  useEffect(() => {
    if (typeof window === 'undefined') return
    const glow = document.getElementById('cursor-glow')
    if (!glow) return
    let tx = window.innerWidth / 2
    let ty = window.innerHeight / 2
    let cx = tx
    let cy = ty
    let raf: number

    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY }
    const tick = () => {
      cx += (tx - cx) * 0.09
      cy += (ty - cy) * 0.09
      glow.style.left = cx + 'px'
      glow.style.top = cy + 'px'
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  // Mouse parallax for floating shapes
  useEffect(() => {
    if (typeof window === 'undefined') return
    const onMove = (e: MouseEvent) => {
      const px = (e.clientX / window.innerWidth - 0.5) * 2
      const py = (e.clientY / window.innerHeight - 0.5) * 2
      document.querySelectorAll<HTMLElement>('[data-d]').forEach(el => {
        const d = parseFloat(el.dataset.d ?? '1')
        el.style.transform = `translate(${px * d * 16}px, ${py * d * 10}px)`
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Scroll reveal
  useEffect(() => {
    if (typeof window === 'undefined') return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in') })
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      {/* Cursor glow overlay */}
      <div id="cursor-glow" />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="ld2-hero">
        <div className="ld2-hero-glow" />
        <div className="ld2-hero-dots" />

        {/* Floating shapes */}
        <div className="fwrap" style={{ position: 'absolute', top: '8%', left: '6%' }} data-d="0.6">
          <div className="finner" data-d="0.6"><TreeSVG /></div>
        </div>
        <div className="fwrap" style={{ position: 'absolute', top: '10%', right: '7%' }} data-d="0.8">
          <div className="finner" data-d="0.8"><GraphSVG /></div>
        </div>
        <div className="fwrap" style={{ position: 'absolute', top: '45%', left: '3%' }} data-d="0.5">
          <div className="finner" data-d="0.5"><LinkedListSVG /></div>
        </div>
        <div className="fwrap" style={{ position: 'absolute', top: '42%', right: '4%' }} data-d="0.7">
          <div className="finner" data-d="0.7"><DPGridSVG /></div>
        </div>
        <div className="fwrap" style={{ position: 'absolute', bottom: '12%', left: '50%', transform: 'translateX(-50%)' }} data-d="0.4">
          <div className="finner" data-d="0.4"><StackSVG /></div>
        </div>

        <div className="ld-w ld2-hero-inner">
          <Link to="/explore" className="ld2-announce-badge">
            <span className="ld2-announce-dot" />
            Now with {totalProblems.toLocaleString()}+ curated problems
            <span style={{ opacity: .5, marginLeft: 4 }}>→</span>
          </Link>

          <h1 className="ld2-hero-title">
            Master the Art of<br />
            <span className="ld2-hero-gradient">DSA.</span>
          </h1>

          <p className="ld2-hero-desc">
            Curated, deduplicated problems from 50+ platforms. Organized by
            topic, tagged by concept, ready for systematic practice.
          </p>

          <div className="ld2-hero-actions">
            <Link to="/learn" className="ld2-btn ld2-btn-primary">Start Learning →</Link>
            <Link to="/explore" className="ld2-btn ld2-btn-outline">Explore Problems</Link>
          </div>

          <div className="ld2-scroll-hint">
            <div className="ld2-scroll-line" />
            <span>scroll</span>
          </div>
        </div>
      </section>

      {/* ── Marquee ───────────────────────────────────────── */}
      <div className="ld-marquee-shell">
        <div className="ld-marquee-track">
          {[...PLATFORMS, ...PLATFORMS].map((p, i) => (
            <span key={i} className="ld-marquee-item">
              <span className="ld-marquee-dot" />{p}
            </span>
          ))}
        </div>
      </div>

      {/* ── Stats ─────────────────────────────────────────── */}
      <div className="ld-w">
        <div className="ld2-stats-grid">
          <StatCell target={totalProblems} suffix="+" label="Problems" />
          <StatCell target={topics.length} suffix="" label="Topics" />
          <StatCell target={uniquePlatforms} suffix="+" label="Platforms" />
          <StatCell target={articles.length} suffix="+" label="Chapters" />
        </div>
      </div>

      <div className="ld2-sep" />

      {/* ── Topics ────────────────────────────────────────── */}
      <section className="ld-section ld-w">
        <div className="ld2-section-head reveal">
          <div className="ld2-eyebrow">Browse by Topic</div>
          <h2 className="ld2-section-title">{topics.length} Topics</h2>
          <p className="ld2-section-sub">Every problem tagged, every concept linked. Find exactly what you need.</p>
        </div>
        <div className="ld2-topics-grid">
          {topics.map(t => <TopicCard key={t.slug} t={t} />)}
        </div>
      </section>

      <div className="ld2-sep" />

      {/* ── Codex ─────────────────────────────────────────── */}
      <section className="ld-section">
        <div className="ld-w">
          <div className="codex-grid">
            <OpenBook />
            <div className="codex-info reveal">
              <div className="codex-vol-badge">◆ &nbsp;THE SHAPE CODEX · Vol. I</div>
              <h2 className="codex-main-title">Geometry<br />&amp; <span className="acc">Shapes</span></h2>
              <p className="codex-desc">From the distance formula to convex hull — master every geometric structure with visual explanations, worked formulas, and 1,200+ curated DSA problems.</p>
              <div className="codex-rule" />
              <div className="codex-ch-label">Chapters</div>
              <div className="codex-chapters">
                {[
                  { n: '01', name: 'Points & Lines',            probs: 142 },
                  { n: '02', name: 'Triangles & Area',          probs: 98  },
                  { n: '03', name: 'Circles & Arcs',            probs: 87  },
                  { n: '04', name: 'Polygons & Shoelace',       probs: 64  },
                  { n: '05', name: 'Convex Hull',               probs: 52  },
                  { n: '06', name: 'Line Intersection',         probs: 48  },
                  { n: '07', name: 'Coordinate Geometry',       probs: 38  },
                  { n: '08', name: 'Geometric Transformations', probs: 44  },
                  { n: '09', name: 'DSA Applications',          probs: 120 },
                ].map(ch => (
                  <div key={ch.n} className="codex-ch">
                    <span className="codex-ch-num">{ch.n}</span>
                    <span className="codex-ch-name">{ch.name}</span>
                    <span className="codex-ch-probs">{ch.probs} problems</span>
                  </div>
                ))}
              </div>
              <div className="codex-rule" />
              <div className="codex-stats-row">
                {([['1,200+', 'Problems'], ['18', 'Chapters'], ['340', 'Formulas']] as const).map(([v, l]) => (
                  <div key={l}>
                    <div className="codex-stat-v">{v}</div>
                    <div className="codex-stat-l">{l}</div>
                  </div>
                ))}
              </div>
              <div className="codex-actions">
                <Link to="/geometry-book" className="btn-codex">Start Exploring →</Link>
                <Link to="/learn" className="btn-codex-out">All Chapters</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="ld2-sep" />

      {/* ── Features ──────────────────────────────────────── */}
      <section className="ld-section ld-w">
        <div className="ld2-section-head reveal">
          <div className="ld2-eyebrow">What You Can Do</div>
          <h2 className="ld2-section-title">Everything you need to master DSA</h2>
        </div>
        <div className="ld2-features-grid">
          {FEATURES.map(f => <FeatureCard key={f.label} f={f} />)}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="ld-section ld-w">
        <div className="ld2-cta-block reveal">
          <div className="ld2-cta-glow-l" />
          <div className="ld2-cta-glow-r" />
          <h2 className="ld2-cta-title">Start your DSA journey today.</h2>
          <p className="ld2-cta-desc">{totalProblems.toLocaleString()}+ problems. {articles.length} chapters. One platform.</p>
          <div className="ld2-cta-actions">
            <Link to="/learn" className="ld2-btn ld2-btn-primary">Learn Patterns →</Link>
            <Link to="/explore" className="ld2-btn ld2-btn-outline">Browse Problems</Link>
          </div>
        </div>
      </section>
    </>
  )
}
