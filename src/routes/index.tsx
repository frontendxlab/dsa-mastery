import { Link, createFileRoute } from "@tanstack/react-router";
import { topics, totalProblems, uniquePlatforms } from "#/data/topics";
import { articles } from "#/data/articles";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

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

// ── SVG animation helper (used by hero floating shapes) ───────────────────────
const A = (dur: number, del: number) => ({ '--dur': `${dur}s`, '--del': `${del}s` } as React.CSSProperties)

// ── Topic card interactive SVG types ──────────────────────────────────────────
type SVGProps = { c: string; hovered: boolean }

// Morph paths — all 6-vertex polygons (M + 5×L + Z) so framer-motion can interpolate
const MATH_PATHS = [
  "M 26,10 L 39.9,18 L 39.9,34 L 26,42 L 12.1,34 L 12.1,18 Z",        // hexagon ≈ circle
  "M 26,10 L 32.9,22 L 39.9,34 L 26,34 L 12.1,34 L 19.1,22 Z",        // triangle
  "M 26,10 L 41.2,21 L 35.4,39 L 16.6,39 L 10.8,21 L 26,10 Z",        // pentagon
  "M 13,13 L 39,13 L 39,26 L 39,39 L 13,39 L 13,26 Z",                 // rectangle
]
const MATH_SYMS = ['∑', '∫', 'π', '∞']
const MATH_FMLS = ['Σkⁿ', '∫f(x)', 'πr²', 'n→∞']

// 1. Math — SVG path morphing via framer-motion
function MathCard({ c, hovered }: SVGProps) {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    if (!hovered) return
    const id = setInterval(() => setTick(t => (t + 1) % 4), 700)
    return () => { clearInterval(id); setTick(0) }
  }, [hovered])
  return (
    <svg viewBox="0 0 52 52" fill="none" width="50" height="50">
      <motion.path
        animate={{ d: MATH_PATHS[tick] }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
        stroke={c}
        strokeWidth="1.5"
        fill={c}
        fillOpacity={0.12}
      />
      <text x="26" y="31" textAnchor="middle" fill={c} fontSize="16" fontFamily="serif" fontWeight="700"
        style={{ transition: 'all .35s' }}>
        {MATH_SYMS[tick]}
      </text>
      <text x="26" y="47" textAnchor="middle" fill={c} fontSize="7.5" fontFamily="monospace"
        opacity={hovered ? 0.72 : 0} style={{ transition: 'opacity .3s' }}>
        {MATH_FMLS[tick]}
      </text>
    </svg>
  )
}

// 2. DP — matrix fills with values cell-by-cell
function DPCard({ c, hovered }: SVGProps) {
  const [step, setStep] = useState(9)
  const VALS = [0,1,1,2,3,5,8,5,3]
  useEffect(() => {
    if (!hovered) { setStep(9); return }
    let s = -1
    const id = setInterval(() => { s = s < 9 ? s+1 : -1; setStep(s) }, 180)
    return () => { clearInterval(id); setStep(9) }
  }, [hovered])
  return (
    <svg viewBox="0 0 52 52" fill="none" width="50" height="50">
      {Array.from({length:9}, (_,i) => {
        const col=i%3, row=Math.floor(i/3)
        const vis = !hovered || step >= i
        const cur = step === i
        return (
          <g key={i}>
            <rect x={4+col*16} y={4+row*16} width="13" height="13" rx="2"
              stroke={c} strokeWidth={cur?2:1} fill={c} fillOpacity={vis?.16:0}
              opacity={vis?1:.35} style={{transition:'all .15s'}}/>
            <text x={10.5+col*16} y={14+row*16} textAnchor="middle" fill={c} fontSize="7"
              fontFamily="monospace" opacity={vis?.9:0} style={{transition:'opacity .12s'}}>{vis?VALS[i]:''}</text>
          </g>
        )
      })}
    </svg>
  )
}

// 3. Binary Search — lo/hi converge on target
function BinarySearchCard({ c, hovered }: SVGProps) {
  const [lo, setLo] = useState(0)
  const [hi, setHi] = useState(6)
  const VALS = [1,3,5,7,9,11,13]
  useEffect(() => {
    if (!hovered) { setLo(0); setHi(6); return }
    const steps: [number,number][] = [[0,6],[0,2],[2,2]]
    let s = 0
    const id = setInterval(() => { const [l,h]=steps[s%steps.length]; setLo(l); setHi(h); s++ }, 700)
    return () => { clearInterval(id); setLo(0); setHi(6) }
  }, [hovered])
  const mid = Math.floor((lo+hi)/2)
  return (
    <svg viewBox="0 0 58 28" fill="none" width="56" height="28">
      {VALS.map((v, i) => {
        const active = i>=lo && i<=hi
        const isMid = hovered && i===mid
        return (
          <g key={i}>
            <rect x={2+i*8} y="4" width="7" height="20" rx="1.5" stroke={c}
              strokeWidth={isMid?2:1}
              fill={isMid?c:active?c:'none'}
              fillOpacity={isMid?.35:active?.1:0}
              opacity={active?1:.22}
              style={{transition:'all .3s'}}/>
            <text x={5.5+i*8} y="17" textAnchor="middle" fill={c} fontSize="6" fontFamily="monospace"
              opacity={active?.85:.2} style={{transition:'opacity .3s'}}>{v}</text>
          </g>
        )
      })}
      {hovered && <g style={{transition:'transform .35s cubic-bezier(.23,1,.32,1)', transform:`translateX(${(mid-3)*8}px)`}}>
        <line x1="28" y1="0" x2="28" y2="4" stroke={c} strokeWidth="1.5" opacity=".8"/>
        <polyline points="25,3 28,0 31,3" stroke={c} strokeWidth="1.3" fill="none" opacity=".8"/>
      </g>}
    </svg>
  )
}

// 4. String — sliding window sweeps through characters
function StringCard({ c, hovered }: SVGProps) {
  const [pos, setPos] = useState(0)
  const CHARS = ['a','b','c','a','b']
  useEffect(() => {
    if (!hovered) { setPos(0); return }
    const id = setInterval(() => setPos(p => (p+1)%3), 420)
    return () => { clearInterval(id); setPos(0) }
  }, [hovered])
  return (
    <svg viewBox="0 0 58 28" fill="none" width="56" height="28">
      {CHARS.map((ch, i) => {
        const inWin = hovered && i>=pos && i<pos+3
        return (
          <g key={i}>
            <rect x={2+i*10} y="4" width="9" height="20" rx="2" stroke={c}
              strokeWidth={inWin?1.6:1}
              fill={inWin?c:'none'} fillOpacity={inWin?.2:0}
              opacity={inWin?1:.5} style={{transition:'all .25s'}}/>
            <text x={6.5+i*10} y="17.5" textAnchor="middle" fill={c} fontSize="8"
              fontFamily="monospace" opacity={inWin?.95:.55} style={{transition:'opacity .2s'}}>{ch}</text>
          </g>
        )
      })}
      {hovered && (
        <g style={{transform:`translateX(${pos*10}px)`, transition:'transform .4s cubic-bezier(.23,1,.32,1)'}}>
          <rect x="1" y="2" width="30" height="24" rx="3" stroke={c} strokeWidth="1.5" fill="none" opacity=".55"/>
        </g>
      )}
    </svg>
  )
}

// 5. Bit Manipulation — bits flip L→R with green for 1
function BitCard({ c, hovered }: SVGProps) {
  const [active, setActive] = useState(-1)
  const BASE = [1,0,1,1,0,1,0,0]
  useEffect(() => {
    if (!hovered) { setActive(-1); return }
    let i = 0
    const id = setInterval(() => { setActive(i%8); i++ }, 200)
    return () => { clearInterval(id); setActive(-1) }
  }, [hovered])
  return (
    <svg viewBox="0 0 68 22" fill="none" width="66" height="22">
      {BASE.map((b, i) => {
        const isFlipping = i === active
        const val = isFlipping ? 1-b : b
        const col = val===1 ? '#34d399' : c
        return (
          <g key={i}>
            <rect x={2+i*8} y="1" width="7" height="20" rx="1.5" stroke={col}
              strokeWidth={isFlipping?2:1} fill={col} fillOpacity={val===1?.22:.05}
              style={{transition:'all .15s'}}/>
            <text x={5.5+i*8} y="14.5" textAnchor="middle" fill={col} fontSize="7.5"
              fontFamily="monospace" opacity={isFlipping?1:.8}
              style={{transition:'all .15s'}}>{val}</text>
          </g>
        )
      })}
    </svg>
  )
}

// 6. Tree — BFS traversal highlights nodes one-by-one
function TreeCard({ c, hovered }: SVGProps) {
  const [step, setStep] = useState(-1)
  const NODES = [{cx:30,cy:7,r:6},{cx:15,cy:21,r:5},{cx:45,cy:21,r:5},{cx:7,cy:35,r:4},{cx:23,cy:35,r:4},{cx:37,cy:35,r:4},{cx:53,cy:35,r:4}]
  const EDGES = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]]
  useEffect(() => {
    if (!hovered) { setStep(-1); return }
    let s = 0
    const id = setInterval(() => { setStep(s<=6?s:-1); s = s<8?s+1:0 }, 280)
    return () => { clearInterval(id); setStep(-1) }
  }, [hovered])
  return (
    <svg viewBox="0 0 60 42" fill="none" width="58" height="42">
      {EDGES.map(([a,b]) => <line key={`${a}-${b}`} x1={NODES[a].cx} y1={NODES[a].cy} x2={NODES[b].cx} y2={NODES[b].cy} stroke={c} strokeWidth=".9" opacity={step>=a&&step>=b?.7:.3} style={{transition:'opacity .2s'}}/>)}
      {NODES.map((n,i) => <circle key={i} cx={n.cx} cy={n.cy} r={n.r} stroke={c} strokeWidth="1.3" fill={c} fillOpacity={step>=i?.35:0} opacity={i===0?1:i<3?.88:.7} style={{transition:'fill-opacity .18s'}}/>)}
    </svg>
  )
}

// 7. Graph — BFS traversal with edge highlighting
function GraphCard({ c, hovered }: SVGProps) {
  const [step, setStep] = useState(-1)
  const NODES = [{cx:28,cy:8},{cx:48,cy:22},{cx:40,cy:44},{cx:16,cy:44},{cx:8,cy:22},{cx:28,cy:28}]
  const EDGES = [[0,1],[1,2],[2,3],[3,4],[4,0],[0,2],[1,4],[0,5]]
  useEffect(() => {
    if (!hovered) { setStep(-1); return }
    let s = 0
    const id = setInterval(() => { setStep(s%7===6?-1:s%7); s++ }, 300)
    return () => { clearInterval(id); setStep(-1) }
  }, [hovered])
  return (
    <svg viewBox="0 0 56 52" fill="none" width="54" height="52">
      {EDGES.map(([a,b]) => <line key={`${a}-${b}`} x1={NODES[a].cx} y1={NODES[a].cy} x2={NODES[b].cx} y2={NODES[b].cy} stroke={c} strokeWidth={step>=a&&step>=b?1.3:.7} opacity={step>=a&&step>=b?.65:.2} style={{transition:'all .2s'}}/>)}
      {NODES.map((n,i) => <circle key={i} cx={n.cx} cy={n.cy} r={i===0?7:i===5?4:5} stroke={c} strokeWidth="1.3" fill={c} fillOpacity={step>=i?.35:0} opacity={i===0?1:.85} style={{transition:'fill-opacity .2s'}}/>)}
    </svg>
  )
}

// 8. Linked List — second list fades in + dashed cross-pointer on hover
function LinkedListCard({ c, hovered }: SVGProps) {
  const [show2, setShow2] = useState(false)
  useEffect(() => {
    if (!hovered) { setShow2(false); return }
    const t = setTimeout(() => setShow2(true), 350)
    return () => { clearTimeout(t); setShow2(false) }
  }, [hovered])
  return (
    <svg viewBox="0 0 70 46" fill="none" width="68" height="46">
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x={2+i*17} y="4" width="13" height="14" rx="2.5" stroke={c} strokeWidth="1.3" fill={c} fillOpacity=".1"/>
          <text x={8.5+i*17} y="14" textAnchor="middle" fill={c} fontSize="7" fontFamily="monospace" opacity=".9">{i+1}</text>
          {i<3 && <><line x1={15+i*17} y1="11" x2={19+i*17} y2="11" stroke={c} strokeWidth="1" opacity=".6"/><polyline points={`${17+i*17},8.5 ${19+i*17},11 ${17+i*17},13.5`} stroke={c} strokeWidth="1" fill="none" opacity=".6"/></>}
        </g>
      ))}
      <g opacity={show2?1:0} style={{transition:'opacity .4s'}}>
        {[0,1,2].map(i => (
          <g key={i}>
            <rect x={2+i*17} y="28" width="13" height="14" rx="2.5" stroke={c} strokeWidth="1.1" fill={c} fillOpacity=".06"/>
            <text x={8.5+i*17} y="38" textAnchor="middle" fill={c} fontSize="7" fontFamily="monospace" opacity=".7">{i+5}</text>
            {i<2 && <><line x1={15+i*17} y1="35" x2={19+i*17} y2="35" stroke={c} strokeWidth=".9" opacity=".5"/><polyline points={`${17+i*17},32.5 ${19+i*17},35 ${17+i*17},37.5`} stroke={c} strokeWidth=".9" fill="none" opacity=".5"/></>}
          </g>
        ))}
        <line x1="54" y1="18" x2="8.5" y2="28" stroke={c} strokeWidth="1" strokeDasharray="3,2" opacity=".45"/>
      </g>
    </svg>
  )
}

// 9. Advanced Tree (Segment Tree) — query path illuminates root→subtree→leaves
function AdvancedTreeCard({ c, hovered }: SVGProps) {
  const [qs, setQs] = useState(-1)
  useEffect(() => {
    if (!hovered) { setQs(-1); return }
    let s = 0
    const id = setInterval(() => { setQs(s<=4?s:-1); s = s<6?s+1:0 }, 380)
    return () => { clearInterval(id); setQs(-1) }
  }, [hovered])
  const hi = (n: number) => qs >= n
  return (
    <svg viewBox="0 0 66 54" fill="none" width="64" height="54">
      <rect x="23" y="2" width="20" height="11" rx="2" stroke={c} strokeWidth="1.2" fill={c} fillOpacity={hi(0)?.28:0} style={{transition:'fill-opacity .25s'}}/>
      <text x="33" y="10" textAnchor="middle" fill={c} fontSize="5.5" fontFamily="monospace" opacity=".85">0–7</text>
      <line x1="29" y1="13" x2="18" y2="23" stroke={c} strokeWidth=".9" opacity=".45"/>
      <line x1="37" y1="13" x2="48" y2="23" stroke={c} strokeWidth=".9" opacity=".45"/>
      <rect x="6" y="23" width="22" height="11" rx="2" stroke={c} strokeWidth="1.1" opacity=".7"/>
      <text x="17" y="31" textAnchor="middle" fill={c} fontSize="5" fontFamily="monospace" opacity=".6">0–3</text>
      <rect x="38" y="23" width="22" height="11" rx="2" stroke={c} strokeWidth="1.1" fill={c} fillOpacity={hi(1)?.22:0} opacity=".8" style={{transition:'fill-opacity .25s'}}/>
      <text x="49" y="31" textAnchor="middle" fill={c} fontSize="5" fontFamily="monospace" opacity=".7">4–7</text>
      {[0,1,2,3,4,5,6,7].map(i => (
        <rect key={i} x={2+i*8} y="44" width="6" height="6" rx="1" stroke={c} strokeWidth="1"
          fill={c} fillOpacity={hi(2)&&i>=4&&i<=7?.32:0} opacity=".55" style={{transition:'fill-opacity .2s'}}/>
      ))}
    </svg>
  )
}

// 10. Sliding Window — window glides across array on hover
function SlidingWindowCard({ c, hovered }: SVGProps) {
  const [pos, setPos] = useState(0)
  const VALS = [1,3,5,2,8,4,6]
  useEffect(() => {
    if (!hovered) { setPos(0); return }
    let p = 0
    const id = setInterval(() => { p = p<4?p+1:0; setPos(p) }, 430)
    return () => { clearInterval(id); setPos(0) }
  }, [hovered])
  return (
    <svg viewBox="0 0 64 26" fill="none" width="62" height="26">
      {VALS.map((v, i) => {
        const inWin = i>=pos && i<pos+3
        return (
          <g key={i}>
            <rect x={2+i*9} y="4" width="7" height="18" rx="1.5" stroke={c} strokeWidth="1"
              fill={inWin?c:'none'} fillOpacity={inWin?.18:0} opacity={inWin?1:.4} style={{transition:'all .35s'}}/>
            <text x={5.5+i*9} y="16.5" textAnchor="middle" fill={c} fontSize="6.5"
              fontFamily="monospace" opacity={inWin?.9:.45} style={{transition:'opacity .3s'}}>{v}</text>
          </g>
        )
      })}
      <g style={{transform:`translateX(${pos*9}px)`, transition:'transform .42s cubic-bezier(.23,1,.32,1)'}}>
        <rect x="1" y="2" width="27" height="22" rx="3" stroke={c} strokeWidth="1.6" fill="none" opacity=".65"/>
      </g>
    </svg>
  )
}

// 11. Heap — sift-down path highlights on hover
function HeapCard({ c, hovered }: SVGProps) {
  const [hs, setHs] = useState(-1)
  const NODES = [{cx:32,cy:8,r:6.5,v:'1'},{cx:16,cy:24,r:6,v:'3'},{cx:48,cy:24,r:6,v:'5'},{cx:8,cy:40,r:5,v:'7'},{cx:24,cy:40,r:5,v:'8'},{cx:40,cy:40,r:5,v:'6'},{cx:56,cy:40,r:5,v:'9'}]
  useEffect(() => {
    if (!hovered) { setHs(-1); return }
    let s = 0
    const id = setInterval(() => { setHs(s<=3?s:-1); s = s<5?s+1:0 }, 450)
    return () => { clearInterval(id); setHs(-1) }
  }, [hovered])
  const PATH = [0,1,3] // root → left child → left-left leaf
  return (
    <svg viewBox="0 0 64 50" fill="none" width="62" height="50">
      <line x1="32" y1="14" x2="16" y2="18" stroke={c} strokeWidth="1" opacity=".5"/>
      <line x1="32" y1="14" x2="48" y2="18" stroke={c} strokeWidth="1" opacity=".5"/>
      <line x1="16" y1="30" x2="8" y2="35" stroke={c} strokeWidth=".9" opacity=".4"/>
      <line x1="16" y1="30" x2="24" y2="35" stroke={c} strokeWidth=".9" opacity=".4"/>
      <line x1="48" y1="30" x2="40" y2="35" stroke={c} strokeWidth=".9" opacity=".4"/>
      <line x1="48" y1="30" x2="56" y2="35" stroke={c} strokeWidth=".9" opacity=".4"/>
      {NODES.map((n,i) => {
        const inPath = PATH.includes(i) && hs >= PATH.indexOf(i)
        return (
          <g key={i}>
            <circle cx={n.cx} cy={n.cy} r={n.r} stroke={c} strokeWidth={inPath?2:1.3}
              fill={c} fillOpacity={inPath?.35:0} opacity={i===0?1:i<3?.88:.72}
              style={{transition:'all .2s'}}/>
            <text x={n.cx} y={n.cy+2.5} textAnchor="middle" fill={c} fontSize="6.5"
              fontFamily="monospace" opacity={i===0?.95:i<3?.8:.6}>{n.v}</text>
          </g>
        )
      })}
    </svg>
  )
}

// 12. Shape/Matrix — cells spiral inward on hover
function ShapeCard({ c, hovered }: SVGProps) {
  const [step, setStep] = useState(-1)
  const SPIRAL = [[0,0],[0,1],[0,2],[0,3],[1,3],[2,3],[3,3],[3,2],[3,1],[3,0],[2,0],[1,0],[1,1],[1,2],[2,2],[2,1]]
  useEffect(() => {
    if (!hovered) { setStep(-1); return }
    let s = 0
    const id = setInterval(() => { setStep(s%18<16?s%18:-1); s++ }, 110)
    return () => { clearInterval(id); setStep(-1) }
  }, [hovered])
  return (
    <svg viewBox="0 0 56 56" fill="none" width="54" height="54">
      {Array.from({length:4}, (_,r) => Array.from({length:4}, (_,cc) => {
        const spiralIdx = SPIRAL.findIndex(([sr,sc]) => sr===r && sc===cc)
        const isLit = step >= 0 && spiralIdx <= step
        const isCur = spiralIdx === step
        return (
          <rect key={`${r}-${cc}`} x={2+cc*13} y={2+r*13} width="11" height="11" rx="1.5"
            stroke={c} strokeWidth={isCur?2:1} fill={c}
            fillOpacity={isCur?.45:isLit?.18:0}
            opacity={isLit?1:.45} style={{transition:'all .1s'}}/>
        )
      }))}
    </svg>
  )
}

// 13. Backtracking — path exploration + red X on dead ends
function BacktrackCard({ c, hovered }: SVGProps) {
  const [step, setStep] = useState(-1)
  useEffect(() => {
    if (!hovered) { setStep(-1); return }
    let s = 0
    const id = setInterval(() => { setStep(s%10<9?s%10:-1); s++ }, 370)
    return () => { clearInterval(id); setStep(-1) }
  }, [hovered])
  const NODES = [{cx:30,cy:7,r:5},{cx:14,cy:22,r:4},{cx:46,cy:22,r:4},{cx:7,cy:37,r:3.5},{cx:21,cy:37,r:3.5},{cx:39,cy:37,r:3.5},{cx:53,cy:37,r:3.5}]
  // step: 0=root, 1=root+L, 2=+LL(dead), 3=backtrack, 4=root+L+LR, 5=backtrack, 6=root+R, 7=+RL, 8=+RR(found)
  const LIT = new Set<number>()
  if (step>=0) LIT.add(0)
  if (step>=1&&step<=4) LIT.add(1)
  if (step===2) LIT.add(3)
  if (step===4) LIT.add(4)
  if (step>=6) LIT.add(2)
  if (step>=7) LIT.add(5)
  if (step>=8) LIT.add(6)
  const DEAD = (step===2?new Set([3]):step===4?new Set([3,4]):new Set<number>())
  return (
    <svg viewBox="0 0 60 44" fill="none" width="58" height="44">
      {[[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]].map(([a,b]) => <line key={`${a}-${b}`} x1={NODES[a].cx} y1={NODES[a].cy} x2={NODES[b].cx} y2={NODES[b].cy} stroke={c} strokeWidth=".9" opacity={LIT.has(a)&&LIT.has(b)?.7:.3} style={{transition:'opacity .2s'}}/>)}
      {NODES.map((n,i) => (
        <g key={i}>
          <circle cx={n.cx} cy={n.cy} r={n.r} stroke={DEAD.has(i)?'#ef4444':c} strokeWidth={DEAD.has(i)?1.8:1.2}
            fill={LIT.has(i)?c:'none'} fillOpacity={LIT.has(i)?.28:0}
            opacity={i===0?1:i<3?.88:.75} style={{transition:'all .2s'}}/>
          {DEAD.has(i) && <><line x1={n.cx-2.8} y1={n.cy-2.8} x2={n.cx+2.8} y2={n.cy+2.8} stroke="#ef4444" strokeWidth="1.4"/><line x1={n.cx+2.8} y1={n.cy-2.8} x2={n.cx-2.8} y2={n.cy+2.8} stroke="#ef4444" strokeWidth="1.4"/></>}
          {step>=8 && i===6 && <circle cx={n.cx} cy={n.cy} r={n.r+2.5} stroke="#34d399" strokeWidth="1.5" fill="none" opacity=".7"/>}
        </g>
      ))}
    </svg>
  )
}

// 14. Trie — highlights path spelling "cat" letter by letter
function TrieCard({ c, hovered }: SVGProps) {
  const [step, setStep] = useState(-1)
  useEffect(() => {
    if (!hovered) { setStep(-1); return }
    let s = 0
    const id = setInterval(() => { setStep(s<=3?s:-1); s = s<=4?s+1:0 }, 450)
    return () => { clearInterval(id); setStep(-1) }
  }, [hovered])
  const NODES = [
    {cx:32,cy:6,r:5,ch:'*'},{cx:14,cy:20,r:4.5,ch:'c'},{cx:32,cy:20,r:4.5,ch:'d'},{cx:50,cy:20,r:4.5,ch:'b'},
    {cx:8,cy:34,r:4,ch:'a'},{cx:22,cy:34,r:4,ch:'o'},{cx:28,cy:34,r:4,ch:'o'},
    {cx:4,cy:46,r:3.5,ch:'t'},{cx:16,cy:46,r:3.5,ch:'r'},
  ]
  const CAT = [0,1,4,7]
  const lit = new Set(step>=0 ? CAT.slice(0,step+1) : [])
  return (
    <svg viewBox="0 0 64 54" fill="none" width="62" height="54">
      {[[0,1],[0,2],[0,3],[1,4],[1,5],[2,6],[4,7],[4,8]].map(([a,b]) => (
        <line key={`${a}-${b}`} x1={NODES[a].cx} y1={NODES[a].cy+NODES[a].r} x2={NODES[b].cx} y2={NODES[b].cy-NODES[b].r}
          stroke={c} strokeWidth=".9" opacity={lit.has(a)&&lit.has(b)?.7:.22} style={{transition:'opacity .25s'}}/>
      ))}
      {NODES.map((n,i) => (
        <g key={i}>
          <circle cx={n.cx} cy={n.cy} r={n.r} stroke={c} strokeWidth="1.2"
            fill={c} fillOpacity={lit.has(i)?.38:0}
            opacity={[0,1,4,7].includes(i)?1:i<4?.8:.55}
            style={{transition:'fill-opacity .22s'}}/>
          <text x={n.cx} y={n.cy+2.5} textAnchor="middle" fill={c} fontSize="5.5"
            fontFamily="monospace" opacity={lit.has(i)?.95:.45} style={{transition:'opacity .22s'}}>{n.ch}</text>
        </g>
      ))}
    </svg>
  )
}

// ── Per-topic SVG map ──────────────────────────────────────────────────────────
const TOPIC_SVGS: Record<string, React.FC<SVGProps>> = {
  math: MathCard,
  dp: DPCard,
  binary_search: BinarySearchCard,
  string: StringCard,
  bit: BitCard,
  tree: TreeCard,
  graph: GraphCard,
  linked_list: LinkedListCard,
  advanced_tree: AdvancedTreeCard,
  sliding_window: SlidingWindowCard,
  heap: HeapCard,
  shape: ShapeCard,
  backtrack: BacktrackCard,
  trie: TrieCard,
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
  const { ref, onMouseMove, onMouseLeave: tiltLeave } = use3DTilt()
  const [hovered, setHovered] = useState(false)
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
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { tiltLeave(); setHovered(false) }}
      >
        {SVGComp && <div className="ld2-tsvg"><SVGComp c={color} hovered={hovered} /></div>}
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
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="ld2-hero">
        <div className="ld2-hero-glow" />
        <div className="ld2-hero-dots" />

        {/* Floating shapes */}
        <div className="fwrap" style={{ position: 'absolute', top: '8%', left: '6%' }}>
          <div className="finner"><TreeSVG /></div>
        </div>
        <div className="fwrap" style={{ position: 'absolute', top: '10%', right: '7%' }}>
          <div className="finner"><GraphSVG /></div>
        </div>
        <div className="fwrap" style={{ position: 'absolute', top: '45%', left: '3%' }}>
          <div className="finner"><LinkedListSVG /></div>
        </div>
        <div className="fwrap" style={{ position: 'absolute', top: '42%', right: '4%' }}>
          <div className="finner"><DPGridSVG /></div>
        </div>
        <div className="fwrap" style={{ position: 'absolute', bottom: '12%', left: '50%', transform: 'translateX(-50%)' }}>
          <div className="finner"><StackSVG /></div>
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
