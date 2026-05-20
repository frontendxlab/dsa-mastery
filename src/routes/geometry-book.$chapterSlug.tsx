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
  1: { what: 'A shape is any connected group of cells in a grid, defined by its boundary points and the area it encloses.', why: 'Shape problems teach systematic grid traversal, pattern recognition, and geometric property measurement — foundational for all geometry algorithms.', keyIdea: 'Traverse the grid. Collect connected cells. Normalize for comparison. Measure perimeter/area.', mentalModel: 'Think of shape detection as "flood fill with a pen" — mark every cell you visit, trace the boundary when you hit empty space.' },
  2: { what: 'Basic geometry covers points, distances, lines, and simple shapes using coordinate math — the vocabulary of all geometric algorithms.', why: 'Every advanced geometry technique (convex hull, polygon intersection, 3D rendering) builds on point math, cross products, and the shoelace formula.', keyIdea: 'Cross product tells you orientation. Shoelace gives area. Distance formulas measure separation.', mentalModel: 'Points are vectors. Cross product = signed area of parallelogram = orientation detector. The same 3-line function powers 80% of computational geometry.' },
  3: { what: 'A triangle is defined by 3 points. Problems test validity (triangle inequality), classification (by sides/angles), area computation, counting, and DP on triangular grids.', why: 'Triangles are the simplest polygon. Master them to build intuition for all polygon algorithms.', keyIdea: 'Triangle inequality + area formulas (Heron, shoelace, cross product) + angle classification.', mentalModel: 'Any 3 non-collinear points form a triangle. The cross product of two edges gives twice the area and tells you orientation.' },
  4: { what: 'Right triangles have one 90° angle. The Pythagorean theorem ($a^2+b^2=c^2$) is the central relationship, with rich number theory from Pythagorean triples.', why: 'Right triangles appear everywhere: coordinate geometry distances, grid problems, trigonometry foundations.', keyIdea: 'Pythagorean triples (a,b,c) satisfy $a^2+b^2=c^2$. Generate them with Euclid\'s formula: $a=m^2-n^2$, $b=2mn$, $c=m^2+n^2$.', mentalModel: 'Right angle ↔ dot product = 0. The hypotenuse is always the longest side, opposite the 90° angle.' },
  5: { what: 'Rectangles and squares are axis-aligned quadrilaterals with 90° angles. Problems cover detection, counting, overlap, and largest area.', why: 'These are the most common shapes in UI, game dev, and image processing. Rectangle intersection powers window managers and collision detection.', keyIdea: 'Two rectangles overlap if and only if their projections on both axes overlap. Largest rectangle in histogram is a classic stack problem.', mentalModel: 'Rectangle = (x₁,y₁) bottom-left + (x₂,y₂) top-right. Overlap = intervals overlap on BOTH axes simultaneously.' },
  6: { what: 'A circle is all points at distance r from center (h,k). Problems cover point-in-circle, circle intersection, lattice points, and minimum enclosing circle.', why: 'Circles appear in geometry, physics simulations, and optimization. Welzl\'s algorithm finds the smallest circle enclosing points in expected $$O(n)$$.', keyIdea: 'Point-in-circle: $\\text{distance}^2 \\le r^2$ eliminates sqrt. Circle intersection: distance between centers vs sum/difference of radii.', mentalModel: 'The circle equation $(x-h)^2+(y-k)^2=r^2$ is just the distance formula set equal to r. All circle problems reduce to distance comparisons.' },
  7: { what: 'Coordinate geometry places points on a 2D plane with (x,y) coordinates. Problems cover quadrants, reflection, transformations, and collinearity.', why: 'Coordinate geometry is the bridge between algebra and geometry. Any geometric problem can be solved algebraically using coordinates.', keyIdea: 'Collinearity: area of triangle formed by 3 points = 0. Slope hashing for points on a line.', mentalModel: 'The Cartesian plane is your canvas. Points are vectors. Transformations are matrix multiplications. The origin O(0,0) is your reference.' },
  8: { what: 'A line is defined by slope (rise/run) and intercept. Problems cover slope calculation, parallel/perpendicular lines, segment intersection, and line equations.', why: 'Lines are everywhere in geometry. Understanding line equations unlocks collision detection, ray casting, and computational geometry foundations.', keyIdea: 'Slope $m=(y_2-y_1)/(x_2-x_1)$. Parallel lines have equal slopes. Perpendicular slopes multiply to -1. Cross product detects segment intersection.', mentalModel: 'The line is the simplest geometric object. Two points define it. Cross product orientation checks if a third point lies on it or to which side.' },
  9: { what: 'Distance measures how far apart points are. Three metrics dominate: Euclidean (straight line), Manhattan (grid-aligned), Chebyshev (max axis distance).', why: 'Distance is the most fundamental geometric operation. Choosing the right metric changes the problem entirely — Manhattan distance on a grid is simpler than Euclidean.', keyIdea: 'Euclidean: $\\sqrt{\\Delta x^2 + \\Delta y^2}$. Manhattan: $|\\Delta x|+|\\Delta y|$. Chebyshev: $\\max(|\\Delta x|,|\\Delta y|)$. Manhattan and Chebyshev are equivalent under 45° rotation + scaling.', mentalModel: 'Distance = cost of moving from A to B. Different metrics model different real-world constraints: Euclidean = crow flies, Manhattan = city blocks, Chebyshev = king moves.' },
  10: { what: 'A polygon is a closed shape formed by line segments. Problems cover area (shoelace), convexity, point containment, and regular polygon properties.', why: 'Polygons are the building blocks of 3D graphics, GIS systems, and game physics. Ray casting (point-in-polygon) is a classic interview problem.', keyIdea: 'Shoelace: $A = \\frac{1}{2}|\\sum(x_i y_{i+1} - x_{i+1} y_i)|$. Convex: all turns same orientation. Point-in-polygon: ray casting counts edge crossings.', mentalModel: 'A polygon is a circular linked list of points. The shoelace formula "laces" the points together, summing cross products of adjacent edges.' },
  11: { what: 'Grid-based geometry operates on 2D arrays where each cell has (row, col) coordinates. Problems cover BFS/DFS traversal, shortest path, component labeling, and transformations.', why: 'Grids are the most common geometry representation in coding interviews (islands, minesweeper, game boards). Grid algorithms teach systematic 2D exploration.', keyIdea: '4-directional or 8-directional neighbors. BFS gives shortest path. DFS gives connected components. 2D prefix sum gives $O(1)$ submatrix queries.', mentalModel: 'A grid is a graph where each cell is a node and adjacency defines edges. BFS/DFS on grid = graph traversal with implicit edges.' },
  12: { what: 'Area measures the 2D space inside a boundary. Perimeter measures the boundary length. Both are fundamental geometric quantities.', why: 'Area and perimeter problems teach careful counting and the relationship between boundary and interior — critical for image processing and graphics.', keyIdea: 'Grid perimeter: each 1-cell contributes 4 − (1-neighbors)×2. Shoelace for polygons. Circle: $A = \\pi r^2$, $C = 2\\pi r$.', mentalModel: 'On a grid, area = count of filled cells. Perimeter = edges that border empty space or the grid boundary. Each interior shared edge hides 2 units of perimeter.' },
  13: { what: 'Angles measure the turn between two lines. Rotation transforms points using trigonometric matrices. Problems cover clock angles, matrix rotation, and polar sorting.', why: 'Angle and rotation problems test your understanding of trigonometric relationships. Rotation matrices are the foundation of computer graphics and robotics.', keyIdea: 'Rotation matrix: $[\\cos\\theta \; -\\sin\\theta; \; \\sin\\theta \; \\cos\\theta]$. Clock angle: $|30H - 5.5M|^\circ$. Polar angle: $\\text{atan2}(y,x)$.', mentalModel: 'Every rotation is a linear transformation. Apply the rotation matrix to each point independently. Clock angles = two independent rotating hands.' },
  14: { what: 'Computational geometry uses algorithms to solve geometric problems: convex hull, segment intersection, closest pair, and sweep line techniques.', why: 'These are the algorithms behind GPS routing, CAD software, and game physics. Convex hull is a classic $O(n \\log n)$ divide-and-conquer algorithm.', keyIdea: 'Convex hull (Monotone Chain): sort by x, build lower/upper hulls. Closest Pair: divide & conquer merges by y. Sweep line: process events in x-order.', mentalModel: 'Computational geometry = sorting + cross products. Almost every algorithm sorts points first, then processes them with orientation checks.' },
  15: { what: 'Advanced geometry extends to 3D space, fractals, Bezier curves, Voronoi diagrams, and specialized data structures like quadtrees.', why: 'These topics appear in graphics programming, computational design, and competitive programming. Fractals teach recursive geometric patterns; 3D vectors extend 2D intuition.', keyIdea: '3D: extend cross product to 3D, dot product for angles. Bezier curves: de Casteljau algorithm recursively interpolates control points.', mentalModel: 'Advanced geometry = same patterns as 2D, but with more dimensions or more complex primitives. Break complex shapes into simpler primitives.' },
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
  { name: 'Part I — Foundations', range: [1, 2, 3, 4], description: 'Core concepts, shapes, triangles, and right triangles.' },
  { name: 'Part II — Planar Shapes', range: [5, 6, 7, 8], description: 'Rectangles, circles, coordinate geometry, and lines.' },
  { name: 'Part III — Spatial Reasoning', range: [9, 10, 11], description: 'Distance, polygons, and grid-based geometry.' },
  { name: 'Part IV — Computation & Analysis', range: [12, 13, 14, 15], description: 'Area, angles, computational geometry, and advanced algorithms.' },
]

const PROBLEM_URLS: Record<string, string> = {
  'Problem 1': 'https://leetcode.com/problems/valid-boomerang/',
  'Problem 2': 'https://codeforces.com/problemset/problem/498/A',
  'Problem 3': 'https://codeforces.com/problemset/problem/1466/A',
  'Problem 4': 'https://codeforces.com/problemset/problem/227/A',
  'Problem 5': 'https://codeforces.com/problemset/problem/1216/C',
  'Problem 6': 'https://codeforces.com/problemset/problem/849/B',
}

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
