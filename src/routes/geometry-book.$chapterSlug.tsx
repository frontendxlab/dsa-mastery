import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState, useMemo, useRef, useCallback } from 'react'
import useMeasure from 'react-use-measure'
import { motion } from 'framer-motion'
import { ChevronRight, Folder, FolderOpen, FileText, BookOpen } from 'lucide-react'
import { CHAPTER_DIAGRAMS } from '#/components/GeometryDiagrams'
import {
  GridBuilder, ShapeRotationViewer, PerimeterExplorer, ProjectionViewer,
  CoordinatePlane, SlopeExplorer, OrientationExplorer,
} from '#/components/InteractiveDiagrams'
import CodeTabs from '#/components/CodeTabs'
import { SolvedCheckbox, SolvedProvider } from '#/components/SolvedTracker'
import katex from 'katex'

export const Route = createFileRoute('/geometry-book/$chapterSlug')({
  component: ChapterPage,
  notFoundComponent: () => (
    <main className="mx-auto max-w-5xl px-4 py-20 text-center">
      <div className="mx-auto max-w-md rounded-xl border border-[var(--border)] bg-[var(--secondary)] p-8">
        <p className="text-4xl font-bold text-[var(--foreground)]">404</p>
        <Link to="/geometry-book" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[var(--foreground)] px-4 py-2 text-sm font-medium text-[var(--background)] no-underline transition-opacity hover:opacity-90">← Back to Geometry Book</Link>
      </div>
    </main>
  ),
})

interface Block {
  type: string; level?: number; text?: string; content?: string
  lang?: string; code?: string; caption?: string | null
  headers?: string[]; rows?: string[][]; items?: string[]
}

interface ChapterData {
  chapter: number; slug: string; title: string; icon: string
  color: string; problemCount: number; difficulty: string; blocks: Block[]
}

const TLDR_CONTENT: Record<number, { what: string; why: string; keyIdea: string; mentalModel: string }> = {
  1: { what: 'Points are the atomic unit of geometry, defined by $(x,y)$ coordinates. The coordinate plane grids 2D space into quadrants. Lines connect points and extend infinitely.', why: 'Every geometric algorithm from collision detection to ConvexHull starts with points and lines. Coordinate transforms are the bridge between geometry and algebra.', keyIdea: 'Points are vectors. The line through two points is $y-y_1=m(x-x_1)$. Quadrant sign patterns $(\\pm,\\pm)$ encode position relative to origin.', mentalModel: 'The Cartesian plane is graph paper with a GPS. Every point has an address (x,y). The origin (0,0) is home base — quadrants are the four neighborhoods.' },
  2: { what: 'Euclidean distance $d=\\sqrt{\\Delta x^2+\\Delta y^2}$ is the straight-line gap between points. Midpoint $M=(\\frac{x_1+x_2}{2},\\frac{y_1+y_2}{2})$ splits a segment in half.', why: 'Distance is the most-asked geometry primitive in interviews. Midpoint formulas power symmetry detection, bisectors, and center-of-mass calculations.', keyIdea: 'Distance squared avoids $\\sqrt{}$ for comparisons. Midpoint = average of coordinates. Manhattan distance $|\\Delta x|+|\\Delta y|$ for grid paths.', mentalModel: 'Distance is a ruler between two pins on a map. The midpoint is the balance point — drop a pin exactly halfway and both endpoints pull equally.' },
  3: { what: 'Slope $m=\\Delta y/\\Delta x$ measures steepness. The angle $\\theta=\\arctan(m)$ relates slope to direction. Cross-product orientation tells clockwise/counterclockwise turn.', why: 'Slope unlocks parallel/perpendicular detection. Orientation is the single most powerful tool in computational geometry — it powers convex hull, intersection, and polygon winding.', keyIdea: 'Cross product $(B-A)\\times(C-A)>0$ means CCW turn. Parallel slopes are equal. Perpendicular slopes multiply to $-1$. Polar angle $\\text{atan2}(y,x)$ for sorting.', mentalModel: 'Slope is the tilt of a ramp. Orientation is a steering wheel — positive cross product turns left, negative turns right. Zero means you keep going straight (collinear).' },
  4: { what: 'A triangle is three non-collinear points. Classification: scalene (all sides different), isosceles (two equal), equilateral (all equal), acute/right/obtuse by angles.', why: 'Triangles are the simplest polygon — mastering them builds intuition for all polygon algorithms. Triangle inequality is the gatekeeper test for valid side lengths.', keyIdea: 'Triangle inequality: $a+b>c$, $a+c>b$, $b+c>a$. Law of Cosines $c^2=a^2+b^2-2ab\\cos C$ generalizes Pythagoras to any triangle.', mentalModel: 'A triangle is a rigid frame — three struts pinned together. If one strut is too long, the frame flops open (violates triangle inequality). Angles determine its shape.' },
  5: { what: 'Triangle area via shoelace $A=\\frac12|\\sum x_i y_{i+1}-x_{i+1} y_i|$, base-height, Heron\'s formula, and cross product. Counting triangles in arrangements uses combinatorics.', why: 'Area formulas trade off precision vs performance. Counting triangles in point sets is a classic DP and two-pointer problem pattern.', keyIdea: 'Shoelace works for any polygon. Cross product $\\frac12|(B-A)\\times(C-A)|$ is fastest. Heron uses only side lengths. Pick\'s theorem links area to lattice points.', mentalModel: 'Shoelace laces the vertices — cross-multiply down, up, subtract, halve. For counting, think "pick two base points, find all third points that form a valid triangle."' },
  6: { what: 'Right triangles follow $a^2+b^2=c^2$. Pythagorean triples are integer solutions $(a,b,c)$. Euclid\'s formula $a=m^2-n^2,\\;b=2mn,\\;c=m^2+n^2$ generates all primitive triples.', why: 'Right triangles dominate coordinate geometry — every axis-aligned distance forms a right triangle. Triple generation is a recurring number-theory pattern in CP.', keyIdea: 'Dot product $=0$ detects right angles. Slope product $=-1$ means perpendicular sides. Generate triples via Euclid\'s formula with $m>n>0$ of opposite parity.', mentalModel: 'Right triangle = corner of a bookshelf. The hypotenuse is the diagonal brace. Dot product zero is the "square corner detector" — if $\\vec{u}\\cdot\\vec{v}=0$, the sides are perpendicular.' },
  7: { what: 'Rectangles are axis-aligned quadrilaterals with four right angles. Squares are rectangles with equal sides. Detection checks right angles and parallel opposite sides.', why: 'Rectangles are the most common shape in UI, image processing, and game dev. Rectangle detection powers document scanning, object detection, and layout analysis.', keyIdea: 'Four points form a rectangle iff diagonals bisect each other and are equal. Opposite sides parallel. For squares, diagonals are perpendicular too.', mentalModel: 'A rectangle is a stretched box — opposite sides parallel, corners square. The diagonal test is the "fold test": fold corner-to-corner; if the folds match and cross at center, it\'s a rectangle.' },
  8: { what: 'Rectangle area is $A=w\\times h$. Union area via sweep line sorts vertical edges and maintains active y-intervals. Largest rectangle in histogram uses a monotonic stack.', why: 'Rectangle union models window layouts, image occlusion, and map overlay. Largest rectangle is a classic interview problem transforming 2D to 1D histogram.', keyIdea: 'Union area: sweep x, merge y-intervals, multiply by $\\Delta x$. Largest in histogram: for each bar, expand left/right while height >= current. 2D: treat each row as histogram base.', mentalModel: 'Sweep line = Venetian blinds closing from left to right. At each vertical edge, the active set of rectangles changes. Union area = sum of active y-length * distance between edges.' },
  9: { what: 'A circle is the set of points at distance $r$ from center $(h,k)$: $(x-h)^2+(y-k)^2=r^2$. Point containment checks $\\text{dist}^2\\le r^2$ to avoid sqrt.', why: 'Circles appear in physics (collision detection), graphics (clipping), and optimization (smallest enclosing circle). Welzl\'s algorithm solves the latter in expected $O(n)$.', keyIdea: 'Containment: $\\Delta x^2+\\Delta y^2\\le r^2$. No sqrt needed. Tangent: distance from center to line = r. Chord: line segment connecting two points on the circle.', mentalModel: 'A circle is a range on a 2D map: "everything within r of this pin." The equation is just the distance formula with the ruler locked to length r. Point containment is "is the point inside the circle\'s range?"' },
  10: { what: 'Two circles intersect if $|r_1-r_2|\\le d\\le r_1+r_2$ where $d$ is center distance. Angular sweep processes events sorted by polar angle around a center point.', why: 'Circle intersection models sensor range overlap, broadcast coverage, and planetary collision. Angular sweep is the standard technique for covering problems with angular range.', keyIdea: 'Intersection conditions: $d<|r_1-r_2|$ = one inside another, $d>r_1+r_2$ = separate, in between = two intersection points. Angular sweep: sort events by start/end angle.', mentalModel: 'Intersection is two ripples on a pond overlapping. If the ripples are far apart, they stay separate. Close enough, they merge. Angular sweep is a radar rotating 360°, marking where each target appears and disappears.' },
  11: { what: 'A polygon is a closed chain of line segments. Classification: convex (all interior angles $<180^\\circ$), concave (at least one reflex angle), simple (non-self-intersecting).', why: 'Polygon algorithms power GIS, computer graphics, and game physics. Point-in-polygon (ray casting) and convexity checks are essential interview skills.', keyIdea: 'Convex: all cross products same sign. Shoelace for area. Point-in-polygon: ray casting counts edge crossings — odd = inside, even = outside. Winding number is more robust.', mentalModel: 'A convex polygon is a rubber band stretched around nails — it pops to a shape where every corner bulges out. A concave polygon has a dent — a "cave" where the rubber band pulls away from a nail.' },
  12: { what: 'Grid shapes are connected components of cells in a 2D array. Flood fill (BFS/DFS) visits all reachable cells of the same color. Component labeling assigns IDs to each shape.', why: 'Grid problems (islands, minesweeper, paint bucket) dominate entry-level geometry interviews. Flood fill teaches the BFS/DFS fundamentals on implicit graphs.', keyIdea: '4-dir vs 8-dir connectivity. BFS queue = iterative flood. DFS recursion = simpler but risks stack overflow. Union-Find labels components in one pass.', mentalModel: 'Flood fill is paint pouring from a bucket — the paint spreads to every connected cell of the same color. The grid is a graph where adjacent cells share an edge; flood fill is just graph traversal on that implicit graph.' },
  13: { what: 'Shape matching identifies when two shapes are congruent under rotation, translation, and reflection. Normalization transforms shapes to a canonical form for comparison.', why: 'Shape matching appears in OCR, fingerprint recognition, and computer vision. Normalizing by centroid and principal axis makes comparison invariant to position and rotation.', keyIdea: 'Translate centroid to origin. Normalize rotation by aligning principal axis. Compare sorted edge-length sequences or moment invariants. Hash-canonicalized point sets.', mentalModel: 'Shape matching = tracing a cookie cutter. Stamp the cutter (reference shape) onto dough (target shape). If you can rotate, slide, or flip the cutter to match, the shapes are congruent.' },
  14: { what: 'Convex hull is the smallest convex set containing all points. Monotone Chain (Andrew\'s) sorts by $(x,y)$ then builds lower and upper hulls in $O(n\\log n)$.', why: 'Convex hull is the gateway to computational geometry — it introduces sorting-based geometric construction. Closest pair, sweep line, and segment intersection follow similar patterns.', keyIdea: 'Sort by x then y. Build lower hull: while last turn is not CCW, pop. Build upper hull similarly. Merge (drop duplicate endpoints). Closest pair: divide and conquer with strip merge.', mentalModel: 'Convex hull = shrink-wrap around scattered pegs. The algorithm builds the bottom half and top half separately, like zipping a jacket from both ends. Everything inside the wrap is irrelevant to the outer shape.' },
  15: { what: 'CP-level geometry: rotating calipers (diameter of convex polygon in $O(n)$), half-plane intersection, Minkowski sum, Delaunay triangulation, and Voronoi diagrams.', why: 'These are the high-scoring geometry topics in competitive programming (Codeforces, ICPC). Each is a reusable weapon for problems that appear impossible at first glance.', keyIdea: 'Rotating calipers: rotate two parallel lines around polygon to measure antipodal pairs. Half-plane intersection: dual to convex hull. Minkowski sum: $A+B=\\{a+b\\mid a\\in A,b\\in B\\}$.', mentalModel: 'Rotating calipers = measuring a diamond with a caliper that rotates — the maximum distance is at antipodal points. Minkowski sum = dragging one shape around the perimeter of another, tracing the swept region.' },
}

const INTERACTIVE_DIAGRAMS: Record<string, React.FC> = {
  'grid-builder': GridBuilder,
  'shape-rotation': ShapeRotationViewer,
  'perimeter-explorer': PerimeterExplorer,
  'projection-viewer': ProjectionViewer,
  'coordinate-plane': CoordinatePlane,
  'slope-explorer': SlopeExplorer,
  'orientation-explorer': OrientationExplorer,
}

const PARTS = [
  { name: 'Part I — Foundations', range: [1, 2, 3, 4], description: 'Points, distance, orientation, and triangle basics.' },
  { name: 'Part II — Triangles & Rectangles', range: [5, 6, 7, 8], description: 'Area, counting, right triangles, and rectangles.' },
  { name: 'Part III — Circles & Polygons', range: [9, 10, 11, 12], description: 'Circles, polygons, and grid-based shapes.' },
  { name: 'Part IV — Advanced Geometry', range: [13, 14, 15], description: 'Shape matching, convex hull, and CP-level geometry.' },
]

const PROBLEM_URLS: Record<string, string> = {}

const CALLOUT_CONFIG: { label: string; emoji: string; cls: string; desc: string }[] = [
  { label: 'When to use', emoji: '🎯', cls: 'callout-algo', desc: 'When to use this pattern' },
  { label: 'Key insight', emoji: '💡', cls: 'callout-insight', desc: 'Key insight' },
  { label: 'Key Idea', emoji: '💡', cls: 'callout-insight', desc: 'Key idea' },
  { label: 'Key Insight', emoji: '💡', cls: 'callout-insight', desc: 'Key insight' },
  { label: 'Why it works', emoji: '⚙️', cls: 'callout-why', desc: 'Why it works' },
  { label: 'Complexity', emoji: '⚡', cls: 'callout-complexity', desc: 'Complexity' },
  { label: 'Edge Cases', emoji: '⚠️', cls: 'callout-edge', desc: 'Edge cases' },
  { label: 'Edge cases', emoji: '⚠️', cls: 'callout-edge', desc: 'Edge cases' },
  { label: 'Real-world intuition', emoji: '🌍', cls: 'callout-intuition', desc: 'Real-world intuition' },
  { label: 'Mental Model', emoji: '🧠', cls: 'callout-mental', desc: 'Mental model' },
  { label: 'Hidden geometry indicators', emoji: '🔍', cls: 'callout-hidden', desc: 'Hidden geometry indicators' },
  { label: 'How interviewers frame these', emoji: '🎙️', cls: 'callout-interview', desc: 'Interview framing' },
  { label: 'What is it', emoji: '❓', cls: 'callout-what', desc: 'What is it' },
  { label: 'Intuition', emoji: '🤔', cls: 'callout-intuition', desc: 'Intuition' },
  { label: 'What is basic geometry in DSA?', emoji: '❓', cls: 'callout-what', desc: 'What is basic geometry' },
  { label: 'What makes right triangles special?', emoji: '❓', cls: 'callout-what', desc: 'What makes right triangles special' },
  { label: 'What makes triangles special?', emoji: '❓', cls: 'callout-what', desc: 'What makes triangles special' },
]

// ── Section metadata for visual containers ──────────────────────
interface SectionMeta {
  slug: string
  label: string
  num: number
  icon: string
  color: string
  desc: string
}

const SECTION_META: SectionMeta[] = [
  { slug: 'introduction', label: 'Introduction', num: 1, icon: '🎯', color: '#3b82f6', desc: 'What this chapter covers and why it matters' },
  { slug: 'core-concepts', label: 'Core Concepts', num: 2, icon: '📖', color: '#8b5cf6', desc: 'Foundational ideas, formulas, and algorithms' },
  { slug: 'problem-recognition', label: 'Problem Recognition', num: 3, icon: '🔍', color: '#06b6d4', desc: 'How to spot this type of problem in interviews' },
  { slug: 'pattern-analysis', label: 'Pattern Analysis', num: 4, icon: '🧩', color: '#10b981', desc: 'Reusable solution patterns with complexity analysis' },
  { slug: 'reusable-coding-templates', label: 'Coding Templates', num: 5, icon: '⚡', color: '#f59e0b', desc: 'Production-ready code templates you can adapt' },
  { slug: 'curated-real-problems', label: 'Curated Problems', num: 6, icon: '🏆', color: '#ef4444', desc: 'Hand-picked problems from top coding platforms' },
  { slug: 'generated-practice-problems', label: 'Practice Problems', num: 7, icon: '✏️', color: '#ec4899', desc: 'Original problems to test your understanding' },
  { slug: 'complete-solution-section', label: 'Solutions', num: 8, icon: '✅', color: '#14b8a6', desc: 'Step-by-step solutions with intuition and code' },
]

function detectSection(headingText: string): SectionMeta | null {
  const lower = headingText.toLowerCase()
  for (const meta of SECTION_META) {
    if (lower.includes(meta.slug.replace(/-/g, ' '))) return meta
  }
  // Fallback patterns
  if (/^introduction/i.test(headingText)) return SECTION_META[0]
  if (/^core concept/i.test(headingText)) return SECTION_META[1]
  if (/^problem recogni/i.test(headingText)) return SECTION_META[2]
  if (/^pattern/i.test(headingText)) return SECTION_META[3]
  if (/^template|reusable coding/i.test(headingText)) return SECTION_META[4]
  if (/^curated|real problem/i.test(headingText)) return SECTION_META[5]
  if (/^practice|generated problem/i.test(headingText)) return SECTION_META[6]
  if (/^solution|complete solution/i.test(headingText)) return SECTION_META[7]
  return null
}

interface SectionGroup {
  meta: SectionMeta
  headingText: string
  blocks: any[]
}

function groupSections(blocks: any[]): SectionGroup[] {
  const sections: SectionGroup[] = []
  let current: SectionGroup | null = null
  for (const block of blocks) {
    if (block.type === 'heading' && block.level === 2) {
      const meta = detectSection(block.text ?? '')
      if (meta) {
        current = { meta, headingText: block.text ?? '', blocks: [] }
        sections.push(current)
        continue
      }
    }
    if (current) {
      current.blocks.push(block)
    }
  }
  return sections
}

function escapeHtml(text: string): string {
  return text.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function renderCallouts(text: string): string {
  const labelSet = new Set(CALLOUT_CONFIG.map(c => c.label))
  return text.replace(/\*\*(.+?)\*\*/g, (match, inner) => {
    const trimmed = inner.trim()
    const config = CALLOUT_CONFIG.find(c => trimmed === c.label || trimmed.startsWith(c.label + ' '))
    if (config) {
      const rest = trimmed.slice(config.label.length).trim()
      return `<span class="gb-badge ${config.cls}" title="${config.desc}">${config.emoji} ${config.label}</span>${rest ? ' ' + rest : ''} `
    }
    return match
  })
}

function inlineMarkdown(text: string): string {
  if (typeof text !== 'string') {
    console.error('inlineMarkdown non-string:', typeof text, JSON.stringify(text).slice(0,200))
    return String(text ?? '')
  }
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code class="gb-inline-code">$1</code>')
}

function renderInlineMath(text: string): string {
  return text.replace(/\$([^$\n]+?)\$/g, (_m: string, tex: string) => {
    try { return katex.renderToString(tex.trim(), { displayMode: false, throwOnError: false, output: 'html' }) }
    catch { return `<span class="gb-math-inline">${tex.trim()}</span>` }
  })
}

function renderBlockMath(tex: string): string {
  try { return katex.renderToString(tex.trim(), { displayMode: true, throwOnError: false, output: 'html' }) }
  catch { return `<div class="gb-math-block">${tex.trim()}</div>` }
}

function renderTldrText(text: string): string {
  const normalized = text.replace(/\$\$(.+?)\$\$/g, '$$$1$$')
  return renderInlineMath(inlineMarkdown(normalized))
}

function TldrCard({ chapter }: { chapter: number }) {
  const tldr = TLDR_CONTENT[chapter]
  if (!tldr) return null
  return (
    <div className="gb-tldr">
      <div className="gb-tldr-grid">
        <div className="gb-tldr-card">
          <span className="gb-tldr-emoji">❓</span>
          <span className="gb-tldr-label">What is it?</span>
          <p className="gb-tldr-text" dangerouslySetInnerHTML={{ __html: renderTldrText(tldr.what) }} />
        </div>
        <div className="gb-tldr-card">
          <span className="gb-tldr-emoji">💡</span>
          <span className="gb-tldr-label">Core Idea</span>
          <p className="gb-tldr-text" dangerouslySetInnerHTML={{ __html: renderTldrText(tldr.keyIdea) }} />
        </div>
        <div className="gb-tldr-card">
          <span className="gb-tldr-emoji">🧠</span>
          <span className="gb-tldr-label">Mental Model</span>
          <p className="gb-tldr-text" dangerouslySetInnerHTML={{ __html: renderTldrText(tldr.mentalModel) }} />
        </div>
        <div className="gb-tldr-card">
          <span className="gb-tldr-emoji">🎯</span>
          <span className="gb-tldr-label">Why It Matters</span>
          <p className="gb-tldr-text" dangerouslySetInnerHTML={{ __html: renderTldrText(tldr.why) }} />
        </div>
      </div>
    </div>
  )
}

function PartFolder({ part, chapters, currentSlug, color, isOpen, onToggle, onNav }: {
  part: typeof PARTS[0]
  chapters: { chapter: number; slug: string; title: string }[]
  currentSlug: string
  color: string
  isOpen: boolean
  onToggle: () => void
  onNav: () => void
}) {
  const [contentRef, contentBounds] = useMeasure()

  return (
    <div className="gb-sidebar-part">
      <button className="gb-sidebar-part-trigger" onClick={onToggle}>
        <motion.span
          className="gb-sidebar-part-chevron"
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight size={14} />
        </motion.span>
        <span className="gb-sidebar-part-folder-icon">
          {isOpen ? <FolderOpen size={15} /> : <Folder size={15} />}
        </span>
        <span className="gb-sidebar-part-name">{part.name}</span>
      </button>
      <motion.div
        className="gb-sidebar-part-content"
        initial={false}
        animate={{
          height: isOpen ? contentBounds.height : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
        style={{ overflow: 'hidden' }}
      >
        <div ref={contentRef}>
          <div className="gb-sidebar-part-inner">
            {chapters.map(ch => {
              const isActive = ch.slug === currentSlug
              return (
                <Link
                  key={ch.chapter}
                  to="/geometry-book/$chapterSlug"
                  params={{ chapterSlug: ch.slug }}
                  className={`gb-sidebar-file${isActive ? ' gb-sidebar-file-active' : ''}`}
                  onClick={onNav}
                  style={isActive ? {
                    background: `${color}10`,
                    borderLeftColor: color,
                  } : undefined}
                >
                  {isActive ? (
                    <BookOpen size={13} className="gb-sidebar-file-icon gb-sidebar-file-icon-active" />
                  ) : (
                    <FileText size={13} className="gb-sidebar-file-icon" />
                  )}
                  <span className="gb-sidebar-file-title">{ch.title}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function Sidebar({ chapters, currentSlug, color }: { chapters: { chapter: number; slug: string; title: string }[]; currentSlug: string; color: string }) {
  const [open, setOpen] = useState(false)
  const [openParts, setOpenParts] = useState<string[]>(() => {
    const currentCh = chapters.find(c => c.slug === currentSlug)
    if (currentCh) {
      const partName = PARTS.find(p => p.range.includes(currentCh.chapter))?.name
      return partName ? [partName] : []
    }
    return []
  })

  const togglePart = (name: string) => {
    setOpenParts(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    )
  }

  return (
    <>
      <button className="gb-sidebar-toggle" onClick={() => setOpen(o => !o)}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        <span>Chapters</span>
      </button>
      {open && <div className="gb-sidebar-overlay" onClick={() => setOpen(false)} />}
      <aside className={`gb-sidebar${open ? ' gb-sidebar-open' : ''}`}>
        <div className="gb-sidebar-header">
          <div className="gb-sidebar-header-left">
            <BookOpen size={16} className="gb-sidebar-header-icon" />
            <h3 className="gb-sidebar-title">Chapters</h3>
          </div>
          <span className="gb-sidebar-count">{chapters.length}</span>
          <button className="gb-sidebar-close" onClick={() => setOpen(false)}>✕</button>
        </div>
        <nav className="gb-sidebar-nav">
          {PARTS.map((part) => {
            const partChapters = chapters.filter(c => part.range.includes(c.chapter))
            if (partChapters.length === 0) return null
            return (
              <PartFolder
                key={part.name}
                part={part}
                chapters={partChapters}
                currentSlug={currentSlug}
                color={color}
                isOpen={openParts.includes(part.name)}
                onToggle={() => togglePart(part.name)}
                onNav={() => setOpen(false)}
              />
            )
          })}
        </nav>
        <div className="gb-sidebar-footer">
          <Link to="/geometry-book" className="gb-sidebar-back">← TOC</Link>
        </div>
      </aside>
    </>
  )
}

// ── In-Page Section TOC ───────────────────────────────────────────
function SectionTOC({ sections, chColor }: { sections: SectionGroup[]; chColor: string }) {
  const [activeId, setActiveId] = useState<string>('')
  const [open, setOpen] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (sections.length === 0) return
    const ids = sections.map((_, i) => `gb-section-${i}`)
    const elements = ids.map(id => document.getElementById(id)).filter(Boolean)
    if (elements.length === 0) return

    observerRef.current?.disconnect()
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the first visible section
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-96px 0px -60% 0px', threshold: 0 }
    )
    elements.forEach(el => observerRef.current?.observe(el!))
    return () => observerRef.current?.disconnect()
  }, [sections])

  if (sections.length <= 1) return null

  return (
    <nav className="gb-section-toc">
      <button className="gb-section-toc-toggle" onClick={() => setOpen(o => !o)}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" />
        </svg>
        <span className="gb-section-toc-toggle-label">Sections</span>
        <span className="gb-section-toc-count">{sections.length}</span>
      </button>
      {open && (
        <div className="gb-section-toc-dropdown">
          <div className="gb-section-toc-header">On this page</div>
          {sections.map((sec, i) => {
            const id = `gb-section-${i}`
            const isActive = id === activeId
            return (
              <a
                key={i}
                href={`#${id}`}
                className={`gb-section-toc-link${isActive ? ' active' : ''}`}
                style={isActive ? { color: sec.meta.color, borderLeftColor: sec.meta.color } : undefined}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
                  setOpen(false)
                }}
              >
                <span className="gb-section-toc-num" style={{ color: sec.meta.color }}>{sec.meta.num}</span>
                <span className="gb-section-toc-icon">{sec.meta.icon}</span>
                <span className="gb-section-toc-label">{sec.meta.label}</span>
              </a>
            )
          })}
        </div>
      )}
    </nav>
  )
}

function ChapterPage() {
  const { chapterSlug } = Route.useParams()
  const [chapter, setChapter] = useState<ChapterData | null>(null)
  const [index, setIndex] = useState<{ chapters: { chapter: number; slug: string; title: string }[] } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      fetch(`/data/geometry-book/${chapterSlug}.json`).then(r => r.json()),
      fetch('/data/geometry-book/index.json').then(r => r.json()),
    ]).then(([ch, idx]) => { setChapter(ch); setIndex(idx); setLoading(false); window.scrollTo(0, 0) })
      .catch(() => setLoading(false))
  }, [chapterSlug])

  const ch = chapter
  const chNum = ch?.chapter ?? 0
  const chColor = ch?.color ?? '#3b9eff'
  const ChapterDiagram = chNum ? CHAPTER_DIAGRAMS[chNum] : null

  const BADGE_HEADER_RE = /^\*\*(.+?)\*\*:?\s*$/

  function isBadgeCardHeader(text: string): boolean {
    const m = text.match(BADGE_HEADER_RE)
    if (!m) return false
    const label = m[1].toLowerCase()
    return /keyword|indicator|signal|interviewer|common keyword|hidden|how interview|fram(e|ing)/.test(label)
  }

  // Group consecutive code blocks with different languages into tab groups,
  // and merge keyword/indicator text+list blocks into badge cards
  const processedBlocks = useMemo(() => {
    if (!ch) return [] as (Block | { type: 'code_tabs'; blocks: { lang: string; code: string; caption?: string | null }[] })[]
    const result: any[] = []
    let i = 0
    while (i < ch.blocks.length) {
      const b = ch.blocks[i]
      // Check if this is a badge card header followed by list items
      if (b.type === 'text' && isBadgeCardHeader(b.content ?? '')) {
        const items: string[] = []
        let j = i + 1
        while (j < ch.blocks.length && ch.blocks[j].type === 'list') {
          items.push(...(ch.blocks[j].items ?? []))
          j++
        }
        if (items.length > 0) {
          result.push({ type: 'badge_card', header: b.content, items })
          i = j
          continue
        }
      }
      // Check if this is a code block followed by other code blocks
      if (b.type === 'code' && b.lang) {
        const group: { lang: string; code: string; caption?: string | null }[] = [{ lang: b.lang, code: b.code ?? '', caption: b.caption }]
        let j = i + 1
        while (j < ch.blocks.length && ch.blocks[j].type === 'code' && ch.blocks[j].lang && ch.blocks[j].lang !== group[group.length - 1].lang) {
          group.push({ lang: ch.blocks[j].lang!, code: ch.blocks[j].code ?? '', caption: ch.blocks[j].caption })
          j++
        }
        if (group.length >= 2) {
          result.push({ type: 'code_tabs', blocks: group })
          i = j
          continue
        }
      }
      result.push(b)
      i++
    }
    return result
  }, [ch])

  const sections = useMemo(() => groupSections(processedBlocks), [processedBlocks])

  if (loading) return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-24 sm:pt-28">
      <div className="flex items-center justify-center py-32"><div className="gb-loader" /></div>
    </main>
  )
  if (!ch || !index) return null

  const prevIdx = index.chapters.findIndex(c => c.slug === chapterSlug)
  const prevCh = prevIdx > 0 ? index.chapters[prevIdx - 1] : null
  const nextCh = prevIdx < index.chapters.length - 1 ? index.chapters[prevIdx + 1] : null

  return (
    <div className="gb-layout">
      <Sidebar chapters={index.chapters} currentSlug={chapterSlug} color={chColor} />

      <main className="gb-chapter-main">
        <div className="gb-chapter-hero" style={{ borderLeftColor: chColor }}>
          <div className="gb-chapter-hero-icon" style={{ background: `${chColor}18`, color: chColor }}>{ch.icon}</div>
          <div>
            <span className="gb-chapter-hero-label" style={{ color: chColor }}>Chapter {ch.chapter} · {ch.difficulty}</span>
            <h1 className="gb-chapter-hero-title">{ch.title}</h1>
            <p className="gb-chapter-hero-meta">{ch.problemCount.toLocaleString()} curated problems</p>
          </div>
        </div>

        {/* TLDR section */}
        <TldrCard chapter={chNum} />

        {/* Chapter diagram */}
        {ChapterDiagram && <div className="gb-diagram-wrap"><ChapterDiagram /></div>}

        {/* In-page Section TOC */}
        <SectionTOC sections={sections} chColor={chColor} />

        {/* Content blocks — grouped by sections */}
        <div className="gb-content">
          {sections.map((sec, si) => {
            const secId = `gb-section-${si}`
            const secColor = sec.meta.color
            return (
              <section
                key={si}
                id={secId}
                className="gb-section-wrap"
                style={{ borderLeftColor: secColor }}
              >
                <div className="gb-section-header">
                  <div className="gb-section-badge" style={{ background: `${secColor}14`, color: secColor, borderColor: `${secColor}30` }}>
                    <span className="gb-section-badge-num">{sec.meta.num}</span>
                    <span className="gb-section-badge-icon">{sec.meta.icon}</span>
                    <span className="gb-section-badge-label">{sec.meta.label}</span>
                  </div>
                </div>
                <div className="gb-section-body">
                  {sec.blocks.map((block: any, i: number) => {
                    if (block.type === 'code_tabs') {
                      return <CodeTabs key={i} blocks={block.blocks} />
                    }
                    // Debug: log any unexpected types
                    if (['code_tabs','badge_card','heading','text','code','table','list','divider','interactive_diagram','hint_card','keyword_badges'].indexOf(block.type) === -1) {
                      console.warn('Unknown block type:', block.type, block)
                    }
                    if (block.type === 'badge_card') {
                      const label = block.header.replace(/^\*\*(.+?)\*\*:?\s*$/, '$1')
                      return (
                        <div key={i} className="gb-badge-card">
                          <div className="gb-badge-card-header">{escapeHtml(label)}</div>
                          <div className="gb-badge-card-items">
                            {block.items.map((item: string, j: number) => (
                              <span key={j} className="gb-badge-item" dangerouslySetInnerHTML={{ __html: renderInlineMath(inlineMarkdown(item)) }} />
                            ))}
                          </div>
                        </div>
                      )
                    }

                    const b = block as Block
                    switch (b.type) {
                      case 'heading': {
                        const text = b.text ?? ''
                        const isProblem = /^Problem \d+:/.test(text)
                        const problemKey = isProblem ? `ch${chNum}-${text.match(/\d+/)?.[0] || '0'}` : null
                        const problemUrl = isProblem ? PROBLEM_URLS[text.match(/^Problem \d+/)?.[0] || ''] : null
                        // h2 headings within sections become visual only (section already identified)
                        const headingEl = b.level === 2
                          ? (sec.meta.slug === 'reusable-coding-templates' || sec.meta.slug === 'curated-real-problems' || sec.meta.slug === 'complete-solution-section')
                            ? <h2 key={i} className="gb-heading-2 gb-heading-2-inside" id={text.toLowerCase().replace(/[^\w]+/g, '-')}>{text}</h2>
                            : null  // skip h2 that was already used as section header
                          : b.level === 3
                            ? <h3 key={i} className="gb-heading-3" id={text.toLowerCase().replace(/[^\w]+/g, '-')}>{text}</h3>
                            : <h4 key={i} className="gb-heading-4">{text}</h4>
                        if (isProblem) {
                          return (
                            <div key={i} className="gb-problem-header">
                              <div className="gb-problem-heading-wrap">
                                {headingEl}
                                <div className="gb-problem-actions">
                                  {problemUrl && (
                                    <a href={problemUrl} target="_blank" rel="noopener noreferrer" className="gb-problem-link">
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                                      Solve
                                    </a>
                                  )}
                                  {problemKey && <SolvedCheckbox problemKey={problemKey} />}
                                </div>
                              </div>
                            </div>
                          )
                        }
                        if (headingEl === null) return null
                        return headingEl
                      }
                      case 'interactive_diagram': {
                        const diagramName = (b as any).diagram as string
                        const Diagram = INTERACTIVE_DIAGRAMS[diagramName]
                        if (Diagram) return <div key={i} className="gb-interactive-wrap"><Diagram /></div>
                        return null
                      }
                      case 'hint_card': {
                        const question = (b as any).question ?? ''
                        return (
                          <div key={i} className="gb-hint-card">
                            <div className="gb-hint-card-inner">
                              <span className="gb-hint-icon">💡</span>
                              <p className="gb-hint-text">{question}</p>
                            </div>
                          </div>
                        )
                      }
                      case 'keyword_badges': {
                        const groups = (b as any).groups ?? []
                        const items = (b as any).items ?? []
                        const COLORS = ['#e74c3c','#3498db','#2ecc71','#f39c12','#9b59b6','#1abc9c','#e67e22','#2c3e50','#d35400','#16a085','#c0392b','#2980b9','#8e44ad','#27ae60','#f1c40f']
                        const COLOR_MAP: Record<string,string> = {
                          indigo:'#6366f1', rose:'#e11d48', emerald:'#10b981', amber:'#f59e0b',
                          sky:'#0ea5e9', violet:'#8b5cf6', teal:'#14b8a6', orange:'#f97316',
                          pink:'#ec4899', cyan:'#06b6d4', slate:'#64748b', red:'#ef4444',
                          green:'#22c55e', yellow:'#eab308', blue:'#3b82f6', purple:'#a855f7',
                        }
                        const pills: { text: string; color: string }[] = []
                        if (groups.length > 0) {
                          for (const g of groups) {
                            const color = COLOR_MAP[g.color] ?? '#6366f1'
                            pills.push({ text: g.label, color })
                          }
                        } else {
                          for (const item of items) {
                            const parts = String(item).split(',').map(s => s.replace(/["""']/g, '').trim()).filter(Boolean)
                            for (const p of parts) {
                              pills.push({ text: p, color: COLORS[pills.length % COLORS.length] })
                            }
                          }
                        }
                        return (
                          <div key={i} className="gb-keyword-card">
                            <div className="gb-keyword-items">
                              {pills.map((pill, j) => (
                                <span key={j} className="gb-keyword-pill" style={{ background: pill.color + '18', color: pill.color, borderColor: pill.color + '35' }}>
                                  {pill.text}
                                </span>
                              ))}
                            </div>
                          </div>
                        )
                      }
                      case 'text': {
                        const html = (b.content ?? '').split(/(\$\$[^$]+\$\$)/g).map((part, j) => {
                          if (part.startsWith('$$') && part.endsWith('$$')) {
                            return renderBlockMath(part.slice(2, -2).trim())
                          }
                          const safe = escapeHtml(part)
                          const withBadges = renderCallouts(safe)
                          const withMd = inlineMarkdown(withBadges)
                          const withMath = renderInlineMath(withMd)
                          return `<span>${withMath}</span>`
                        }).join('')
                        return <p key={i} className="gb-text" dangerouslySetInnerHTML={{ __html: html }} />
                      }
                      case 'code': {
                        // Single code block (no tab grouping)
                        const codes = [{ lang: b.lang ?? '', code: b.code ?? '', caption: b.caption }]
                        return <CodeTabs key={i} blocks={codes} />
                      }
                      case 'table':
                        return (
                          <div key={i} className="gb-table-wrap">
                            <table className="gb-table">
                              {b.headers && b.headers.length > 0 && <thead><tr>{b.headers.map((h, j) => <th key={j} dangerouslySetInnerHTML={{ __html: inlineMarkdown(h) }} />)}</tr></thead>}
                              <tbody>{b.rows?.map((row, ri) => <tr key={ri}>{row.map((cell, ci) => <td key={ci} dangerouslySetInnerHTML={{ __html: inlineMarkdown(cell) }} />)}</tr>)}</tbody>
                            </table>
                          </div>
                        )
                      case 'list':
                        return <ul key={i} className="gb-list">{b.items?.map((item, j) => <li key={j} dangerouslySetInnerHTML={{ __html: renderInlineMath(inlineMarkdown(item)) }} />)}</ul>
                      case 'divider':
                        return <hr key={i} className="gb-divider" />
                      default:
                        return null
                    }
                  })}
                </div>
              </section>
            )
          })}
        </div>

        <div className="gb-chapter-nav">
          {prevCh ? (
            <Link to="/geometry-book/$chapterSlug" params={{ chapterSlug: prevCh.slug }} className="gb-nav-link gb-nav-prev">
              <span className="gb-nav-arrow">←</span>
              <div><span className="gb-nav-label">Previous</span><span className="gb-nav-title">{prevCh.title}</span></div>
            </Link>
          ) : <div />}
          {nextCh ? (
            <Link to="/geometry-book/$chapterSlug" params={{ chapterSlug: nextCh.slug }} className="gb-nav-link gb-nav-next">
              <div><span className="gb-nav-label">Next</span><span className="gb-nav-title">{nextCh.title}</span></div>
              <span className="gb-nav-arrow">→</span>
            </Link>
          ) : (
            <Link to="/geometry-book" className="gb-nav-link gb-nav-next">
              <div><span className="gb-nav-label">Back to</span><span className="gb-nav-title">Table of Contents</span></div>
              <span className="gb-nav-arrow">→</span>
            </Link>
          )}
        </div>
      </main>
    </div>
  )
}
