import { useState, useCallback, useMemo } from 'react'

interface Cell {
  r: number
  c: number
}

function neighbors(r: number, c: number): [number, number][] {
  return [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]]
}

function computeComponents(grid: number[][]): { components: number[][][]; colorMap: number[][] } {
  const m = grid.length
  const n = grid[0].length
  const colorMap = Array.from({ length: m }, () => Array(n).fill(-1))
  const components: number[][][] = []
  let compId = 0
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1 && colorMap[i][j] === -1) {
        const stack: [number, number][] = [[i, j]]
        colorMap[i][j] = compId
        const comp: [number, number][] = []
        while (stack.length) {
          const [cr, cc] = stack.pop()!
          comp.push([cr, cc])
          for (const [nr, nc] of neighbors(cr, cc)) {
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === 1 && colorMap[nr][nc] === -1) {
              colorMap[nr][nc] = compId
              stack.push([nr, nc])
            }
          }
        }
        components.push(comp)
        compId++
      }
    }
  }
  return { components, colorMap }
}

function computePerimeter(grid: number[][]): number {
  const m = grid.length
  const n = grid[0].length
  let total = 0
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        total += 4
        if (i > 0 && grid[i - 1][j] === 1) total -= 2
        if (j > 0 && grid[i][j - 1] === 1) total -= 2
      }
    }
  }
  return total
}

function computeBoundingBox(grid: number[][]): { minR: number; minC: number; maxR: number; maxC: number } | null {
  const m = grid.length
  const n = grid[0].length
  let minR = m, maxR = -1, minC = n, maxC = -1
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        minR = Math.min(minR, i)
        maxR = Math.max(maxR, i)
        minC = Math.min(minC, j)
        maxC = Math.max(maxC, j)
      }
    }
  }
  if (maxR === -1) return null
  return { minR, minC, maxR, maxC }
}

const COMP_COLORS = [
  '#3b9eff', '#22c55e', '#ef4444', '#eab308', '#a855f7',
  '#ec4899', '#f97316', '#14b8a6', '#8b5cf6', '#06b6d4',
]

const CELL_SIZE = 40
const GAP = 2

/* ── Grid Builder ─────────────────────────────────── */

export function GridBuilder() {
  const ROWS = 6
  const COLS = 6
  const [grid, setGrid] = useState(() => Array.from({ length: ROWS }, () => Array(COLS).fill(0)))

  const toggle = useCallback((r: number, c: number) => {
    setGrid(prev => {
      const next = prev.map(row => [...row])
      next[r][c] = next[r][c] === 1 ? 0 : 1
      return next
    })
  }, [])

  const reset = useCallback(() => {
    setGrid(Array.from({ length: ROWS }, () => Array(COLS).fill(0)))
  }, [])

  const presets = useCallback(() => {
    const g = Array.from({ length: ROWS }, () => Array(COLS).fill(0))
    // Draw an L-shape
    for (let i = 0; i < 4; i++) { g[1][1 + i] = 1 }
    for (let i = 0; i < 3; i++) { g[2 + i][1] = 1 }
    setGrid(g)
  }, [])

  const { components, colorMap } = useMemo(() => computeComponents(grid), [grid])
  const perimeter = useMemo(() => computePerimeter(grid), [grid])
  const bb = useMemo(() => computeBoundingBox(grid), [grid])
  const totalCells = useMemo(() => grid.reduce((s, row) => s + row.reduce((a, c) => a + c, 0), 0), [grid])

  const svgSize = COLS * (CELL_SIZE + GAP) + GAP
  const svgHeight = ROWS * (CELL_SIZE + GAP) + GAP + 100

  return (
    <div className="gb-interactive">
      <div className="gb-interactive-header">
        <span className="gb-interactive-icon">🎮</span>
        <span className="gb-interactive-title">Grid Builder — Click cells to build shapes</span>
        <div className="gb-interactive-actions">
          <button className="gb-interactive-btn" onClick={presets}>Load L-shape</button>
          <button className="gb-interactive-btn" onClick={reset}>Clear</button>
        </div>
      </div>
      <div className="gb-interactive-body">
        <svg viewBox={`0 0 ${svgSize} ${svgHeight}`} className="gb-interactive-svg">
          {grid.map((row, r) =>
            row.map((cell, c) => {
              const x = c * (CELL_SIZE + GAP) + GAP
              const y = r * (CELL_SIZE + GAP) + GAP
              const colorIdx = colorMap[r][c]
              const fill = cell === 1
                ? COMP_COLORS[colorIdx % COMP_COLORS.length]
                : 'rgba(255,255,255,.03)'
              const stroke = cell === 1
                ? 'rgba(255,255,255,.15)'
                : 'rgba(255,255,255,.06)'
              return (
                <rect
                  key={`${r}-${c}`}
                  x={x}
                  y={y}
                  width={CELL_SIZE}
                  height={CELL_SIZE}
                  rx={4}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={1}
                  className="gb-interactive-cell"
                  onClick={() => toggle(r, c)}
                  role="button"
                  aria-label={`Cell ${r},${c}`}
                />
              )
            })
          )}
          {/* Bounding box overlay */}
          {bb && (
            <rect
              x={bb.minC * (CELL_SIZE + GAP) + GAP - 2}
              y={bb.minR * (CELL_SIZE + GAP) + GAP - 2}
              width={(bb.maxC - bb.minC + 1) * (CELL_SIZE + GAP) - GAP + 4}
              height={(bb.maxR - bb.minR + 1) * (CELL_SIZE + GAP) - GAP + 4}
              fill="none"
              stroke="rgba(255,200,50,.5)"
              strokeWidth={2}
              strokeDasharray="6,4"
              rx={6}
            />
          )}
          {/* Stats panel */}
          <rect x={GAP} y={ROWS * (CELL_SIZE + GAP) + GAP + 10} width={svgSize - 2 * GAP} height={80} rx={8} fill="rgba(16,18,31,.5)" stroke="rgba(59,158,255,.08)" strokeWidth={1} />
          <text x={GAP + 12} y={ROWS * (CELL_SIZE + GAP) + GAP + 32} fill="#3b9eff" fontSize={11} fontFamily="monospace" fontWeight={600}>Stats</text>
          <text x={GAP + 12} y={ROWS * (CELL_SIZE + GAP) + GAP + 50} fill="#c8cad6" fontSize={10} fontFamily="monospace">Cells: {totalCells}  ·  Perimeter: {perimeter}  ·  Components: {components.length}</text>
          {bb && (
            <text x={GAP + 12} y={ROWS * (CELL_SIZE + GAP) + GAP + 66} fill="#c8cad6" fontSize={10} fontFamily="monospace">
              Bounding Box: ({bb.minR},{bb.minC}) → ({bb.maxR},{bb.maxC})  ·  Size: {bb.maxR - bb.minR + 1}×{bb.maxC - bb.minC + 1}
            </text>
          )}
          {totalCells === 0 && (
            <text x={GAP + 12} y={ROWS * (CELL_SIZE + GAP) + GAP + 66} fill="#7d8299" fontSize={10} fontFamily="monospace">Click cells in the grid above to build a shape</text>
          )}
        </svg>
      </div>
    </div>
  )
}

/* ── Shape Rotation Viewer ─────────────────────────── */

const BASE_SHAPE: [number, number][] = [
  [0, 0], [0, 1], [0, 2],
  [1, 0],
  [2, 0],
]

function rotate90(points: [number, number][], size: number): [number, number][] {
  return points.map(([r, c]) => [c, size - 1 - r])
}

function normalize(points: [number, number][]): [number, number][] {
  const minR = Math.min(...points.map(p => p[0]))
  const minC = Math.min(...points.map(p => p[1]))
  return points.map(([r, c]) => [r - minR, c - minC]).sort((a, b) => a[0] - b[0] || a[1] - b[1])
}

export function ShapeRotationViewer() {
  const [rotation, setRotation] = useState(0)
  const SIZE = 4

  const rotated = useMemo(() => {
    let pts = BASE_SHAPE
    for (let i = 0; i < rotation; i++) {
      pts = rotate90(pts, SIZE)
    }
    return pts
  }, [rotation])

  const normalized = useMemo(() => normalize(rotated), [rotated])
  const normGrid = useMemo(() => {
    const maxR = Math.max(...normalized.map(p => p[0]))
    const maxC = Math.max(...normalized.map(p => p[1]))
    const g = Array.from({ length: maxR + 1 }, () => Array(maxC + 1).fill(0))
    for (const [r, c] of normalized) g[r][c] = 1
    return g
  }, [normalized])

  const nRows = normGrid.length
  const nCols = normGrid[0]?.length || 1
  const nSize = 30
  const nSvgW = nCols * (nSize + 2) + 2
  const nSvgH = nRows * (nSize + 2) + 2 + 30

  const grid = Array.from({ length: SIZE }, () => Array(SIZE).fill(0))
  for (const [r, c] of rotated) grid[r][c] = 1

  const svgSize = SIZE * (CELL_SIZE + GAP) + GAP

  return (
    <div className="gb-interactive">
      <div className="gb-interactive-header">
        <span className="gb-interactive-icon">🔄</span>
        <span className="gb-interactive-title">Shape Rotation — Rotate an L-shape</span>
      </div>
      <div className="gb-interactive-body" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* Rotation controls + grid */}
        <div>
          <div style={{ display: 'flex', gap: '.5rem', justifyContent: 'center', marginBottom: '.75rem' }}>
            {[0, 1, 2, 3].map(deg => (
              <button
                key={deg}
                className={`gb-interactive-btn${rotation === deg ? ' active' : ''}`}
                onClick={() => setRotation(deg)}
              >
                {deg * 90}°
              </button>
            ))}
          </div>
          <svg viewBox={`0 0 ${svgSize} ${svgSize + 30}`} style={{ maxWidth: 220, height: 'auto' }}>
            {grid.map((row, r) =>
              row.map((cell, c) => {
                const x = c * (CELL_SIZE + GAP) + GAP
                const y = r * (CELL_SIZE + GAP) + GAP
                return (
                  <rect
                    key={`${r}-${c}`}
                    x={x} y={y}
                    width={CELL_SIZE} height={CELL_SIZE}
                    rx={4}
                    fill={cell ? COMP_COLORS[0] : 'rgba(255,255,255,.03)'}
                    stroke={cell ? 'rgba(255,255,255,.15)' : 'rgba(255,255,255,.06)'}
                    strokeWidth={1}
                  />
                )
              })
            )}
            <text x={GAP + 4} y={SIZE * (CELL_SIZE + GAP) + GAP + 18} fill="#7d8299" fontSize={10} fontFamily="monospace">
              Rotated {rotation * 90}°
            </text>
          </svg>
        </div>
        {/* Normalized grid */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '.5rem' }}>
            <span style={{ color: '#7d8299', fontSize: '.75rem', fontFamily: 'monospace' }}>Normalized to origin</span>
          </div>
          <svg viewBox={`0 0 ${nSvgW} ${nSvgH}`} style={{ maxWidth: 150, height: 'auto' }}>
            {normGrid.map((row, r) =>
              row.map((cell, c) => {
                const x = c * (nSize + 2) + 2
                const y = r * (nSize + 2) + 2
                return (
                  <rect
                    key={`${r}-${c}`}
                    x={x} y={y}
                    width={nSize} height={nSize}
                    rx={3}
                    fill={cell ? '#22c55e' : 'rgba(255,255,255,.03)'}
                    stroke={cell ? 'rgba(255,255,255,.15)' : 'rgba(255,255,255,.06)'}
                    strokeWidth={.8}
                  />
                )
              })
            )}
            <text x={4} y={nRows * (nSize + 2) + 2 + 18} fill="#7d8299" fontSize={9} fontFamily="monospace">
              Shape fingerprint
            </text>
          </svg>
        </div>
      </div>
    </div>
  )
}

/* ── Perimeter Explorer ───────────────────────────── */

const PERIM_GRID = [
  [0, 1, 1, 0],
  [1, 1, 1, 0],
  [0, 1, 0, 0],
  [0, 0, 0, 0],
]

const P_SIZE = 36
const P_GAP = 3

export function PerimeterExplorer() {
  const [hovered, setHovered] = useState<[number, number] | null>(null)
  const rows = PERIM_GRID.length
  const cols = PERIM_GRID[0].length
  const svgW = cols * (P_SIZE + P_GAP) + P_GAP
  const svgH = rows * (P_SIZE + P_GAP) + P_GAP + 100

  // Per-cell perimeter contribution
  function cellPerimeter(r: number, c: number): number {
    if (PERIM_GRID[r][c] !== 1) return 0
    let contrib = 4
    if (r > 0 && PERIM_GRID[r - 1][c] === 1) contrib--
    if (r < rows - 1 && PERIM_GRID[r + 1][c] === 1) contrib--
    if (c > 0 && PERIM_GRID[r][c - 1] === 1) contrib--
    if (c < cols - 1 && PERIM_GRID[r][c + 1] === 1) contrib--
    return contrib
  }

  const totalPerim = useMemo(() => {
    let t = 0
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        if (PERIM_GRID[r][c] === 1) t += cellPerimeter(r, c)
    return t
  }, [])

  const hoverContrib = hovered ? cellPerimeter(hovered[0], hovered[1]) : null

  return (
    <div className="gb-interactive">
      <div className="gb-interactive-header">
        <span className="gb-interactive-icon">📏</span>
        <span className="gb-interactive-title">Perimeter Explorer — Hover cells to see contribution</span>
      </div>
      <div className="gb-interactive-body">
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="gb-interactive-svg">
          {PERIM_GRID.map((row, r) =>
            row.map((cell, c) => {
              const x = c * (P_SIZE + P_GAP) + P_GAP
              const y = r * (P_SIZE + P_GAP) + P_GAP
              const contrib = cellPerimeter(r, c)
              const isHovered = hovered?.[0] === r && hovered?.[1] === c
              const opacity = cell === 1 ? (isHovered ? 1 : .6) : .15
              return (
                <g key={`${r}-${c}`}>
                  <rect
                    x={x} y={y}
                    width={P_SIZE} height={P_SIZE}
                    rx={4}
                    fill={cell ? '#3b9eff' : 'transparent'}
                    fillOpacity={opacity}
                    stroke={isHovered ? '#fff' : cell ? 'rgba(255,255,255,.2)' : 'rgba(255,255,255,.06)'}
                    strokeWidth={isHovered ? 2 : .8}
                    style={{ cursor: cell ? 'pointer' : 'default' }}
                    onMouseEnter={() => cell && setHovered([r, c])}
                    onMouseLeave={() => setHovered(null)}
                  />
                  {cell === 1 && (
                    <text
                      x={x + P_SIZE / 2}
                      y={y + P_SIZE / 2 + 2}
                      textAnchor="middle"
                      fill={isHovered ? '#fff' : 'rgba(255,255,255,.7)'}
                      fontSize={11}
                      fontFamily="monospace"
                      fontWeight={isHovered ? 700 : 400}
                    >
                      {contrib}
                    </text>
                  )}
                </g>
              )
            })
          )}
          {/* Info panel */}
          <rect x={P_GAP} y={rows * (P_SIZE + P_GAP) + P_GAP + 8} width={svgW - 2 * P_GAP} height={80} rx={8} fill="rgba(16,18,31,.5)" stroke="rgba(59,158,255,.08)" strokeWidth={1} />
          <text x={P_GAP + 10} y={rows * (P_SIZE + P_GAP) + P_GAP + 28} fill="#3b9eff" fontSize={11} fontFamily="monospace" fontWeight={600}>Perimeter Breakdown</text>
          <text x={P_GAP + 10} y={rows * (P_SIZE + P_GAP) + P_GAP + 46} fill="#c8cad6" fontSize={10} fontFamily="monospace">
            Total perimeter: {totalPerim}
          </text>
          {hovered && hoverContrib !== null && (
            <text x={P_GAP + 10} y={rows * (P_SIZE + P_GAP) + P_GAP + 64} fill="#22c55e" fontSize={10} fontFamily="monospace">
              Cell ({hovered[0]},{hovered[1]}): contributes {hoverContrib} to perimeter {hoverContrib === 4 ? ' (isolated)' : hoverContrib === 2 ? ' (edge)' : hoverContrib === 1 ? ' (corner interior)' : ''}
            </text>
          )}
          {!hovered && (
            <text x={P_GAP + 10} y={rows * (P_SIZE + P_GAP) + P_GAP + 64} fill="#7d8299" fontSize={10} fontFamily="monospace">
              Hover any filled cell to see its perimeter contribution
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}

/* ── 3D Projection Viewer ─────────────────────────── */

const PROJ_GRID = [
  [1, 2, 1],
  [1, 3, 2],
  [0, 1, 1],
]

export function ProjectionViewer() {
  const m = PROJ_GRID.length
  const n = PROJ_GRID[0].length
  const maxH = Math.max(...PROJ_GRID.flat())
  const cubeW = 28
  const cubeH = 20
  const gap = 4

  function drawCube(
    ox: number, oy: number, h: number,
    color: string, opacity: number,
  ) {
    if (h === 0) return null
    const layers: JSX.Element[] = []
    for (let z = 0; z < h; z++) {
      const x = ox
      const y = oy - z * (cubeH * 0.5)
      layers.push(
        <g key={`${ox}-${oy}-${z}`}>
          {/* Top face */}
          <polygon
            points={`${x},${y} ${x + cubeW / 2},${y - cubeH / 2} ${x + cubeW / 2 + cubeW},${y - cubeH / 2} ${x + cubeW},${y}`}
            fill={color} fillOpacity={opacity * (1 - z * 0.08)} stroke={color} strokeOpacity={.3} strokeWidth={.5}
          />
          {/* Front face */}
          <rect
            x={x} y={y}
            width={cubeW} height={cubeH / 2}
            fill={color} fillOpacity={opacity * (0.8 - z * 0.06)} stroke={color} strokeOpacity={.2} strokeWidth={.5}
          />
          {/* Right face */}
          <polygon
            points={`${x + cubeW},${y} ${x + cubeW / 2 + cubeW},${y - cubeH / 2} ${x + cubeW / 2 + cubeW},${y + cubeH / 2 - cubeH / 2} ${x + cubeW},${y + cubeH / 2}`}
            fill={color} fillOpacity={opacity * (0.6 - z * 0.05)} stroke={color} strokeOpacity={.2} strokeWidth={.5}
          />
        </g>
      )
    }
    return layers
  }

  const baseX = 20
  const baseY = 130

  return (
    <div className="gb-interactive">
      <div className="gb-interactive-header">
        <span className="gb-interactive-icon">🧊</span>
        <span className="gb-interactive-title">3D Projection — Top, Front, and Side views</span>
      </div>
      <div className="gb-interactive-body">
        <svg viewBox="0 0 420 200" className="gb-interactive-svg">
          {/* 3D view */}
          {PROJ_GRID.map((row, r) =>
            row.map((h, c) => {
              if (h === 0) return null
              const ox = baseX + c * (cubeW + gap)
              const oy = baseY - r * (cubeH * 0.5 + gap * 0.5)
              return drawCube(ox, oy, h, '#3b9eff', .7)
            })
          )}

          {/* Top projection (xy-plane) */}
          <text x={240} y={25} fill="#3b9eff" fontSize={9} fontFamily="monospace" fontWeight={600}>Top View</text>
          {PROJ_GRID.map((row, r) =>
            row.map((h, c) => (
              <rect
                key={`top-${r}-${c}`}
                x={240 + c * 16}
                y={30 + r * 16}
                width={14} height={14}
                rx={2}
                fill={h > 0 ? '#3b9eff' : 'rgba(255,255,255,.04)'}
                fillOpacity={h > 0 ? .5 : 1}
                stroke={h > 0 ? 'rgba(255,255,255,.2)' : 'rgba(255,255,255,.06)'}
                strokeWidth={.5}
              />
            ))
          )}

          {/* Front projection (xz-plane) — max per column */}
          <text x={240} y={90} fill="#22c55e" fontSize={9} fontFamily="monospace" fontWeight={600}>Front View</text>
          {Array.from({ length: n }, (_, c) => {
            const colMax = Math.max(...PROJ_GRID.map(row => row[c]))
            return (
              <rect
                key={`front-${c}`}
                x={240 + c * 16}
                y={95 + (5 - colMax) * 8}
                width={14}
                height={colMax * 8}
                rx={2}
                fill="#22c55e"
                fillOpacity={.5}
                stroke="rgba(255,255,255,.2)"
                strokeWidth={.5}
              />
            )
          })}

          {/* Side projection (yz-plane) — max per row */}
          <text x={240} y={155} fill="#eab308" fontSize={9} fontFamily="monospace" fontWeight={600}>Side View</text>
          {Array.from({ length: m }, (_, r) => {
            const rowMax = Math.max(...PROJ_GRID[r])
            return (
              <rect
                key={`side-${r}`}
                x={240 + r * 16}
                y={160 + (5 - rowMax) * 8}
                width={14}
                height={rowMax * 8}
                rx={2}
                fill="#eab308"
                fillOpacity={.5}
                stroke="rgba(255,255,255,.2)"
                strokeWidth={.5}
              />
            )
          })}

          <text x={10} y={195} fill="#7d8299" fontSize={8} fontFamily="monospace">
            Each cube contributes 1 to top view. Front = max per column. Side = max per row.
          </text>
        </svg>
      </div>
    </div>
  )
}

/* ── Coordinate Plane Explorer ────────────────────── */

function fmt(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(2)
}

export function CoordinatePlane() {
  const S = 300, M = 20, G = S + M * 2
  const CELL = S / 6
  const [pts, setPts] = useState<{ x: number; y: number }[]>([{ x: -1, y: 2 }, { x: 3, y: -1 }])
  const [nextIdx, setNextIdx] = useState(0)

  const handleClick = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget
    const r = svg.getBoundingClientRect()
    const px = ((e.clientX - r.left) / r.width) * G
    const py = ((e.clientY - r.top) / r.height) * G
    const cx = Math.round(((px - M) / CELL - 3) * 2) / 2
    const cy = Math.round((3 - (py - M) / CELL) * 2) / 2
    if (cx < -3 || cx > 3 || cy < -3 || cy > 3) return
    setPts(prev => {
      const next = [...prev]
      next[nextIdx] = { x: cx, y: cy }
      return next
    })
    setNextIdx(prev => (prev + 1) % 2)
  }, [nextIdx])

  function gridToSvg(x: number, y: number): [number, number] {
    return [M + (x + 3) * CELL, M + (3 - y) * CELL]
  }

  const dist = pts.length === 2 ? Math.sqrt((pts[0].x - pts[1].x) ** 2 + (pts[0].y - pts[1].y) ** 2) : 0
  const mid = pts.length === 2 ? { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 } : null
  const slope = pts.length === 2 && pts[1].x !== pts[0].x ? (pts[1].y - pts[0].y) / (pts[1].x - pts[0].x) : null

  return (
    <div className="gb-interactive">
      <div className="gb-interactive-header">
        <span className="gb-interactive-icon">📐</span>
        <span className="gb-interactive-title">Coordinate Plane — Click to place two points</span>
      </div>
      <div className="gb-interactive-body" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <svg viewBox={`0 0 ${G} ${G + 80}`} style={{ maxWidth: G, height: 'auto' }} onClick={handleClick} className="gb-interactive-svg" role="img" aria-label="Coordinate plane">
          {Array.from({ length: 7 }, (_, i) => (
            <g key={`g-${i}`}>
              <line x1={M + i * CELL} y1={M} x2={M + i * CELL} y2={M + S} stroke="rgba(255,255,255,.08)" strokeWidth={.5} />
              <line x1={M} y1={M + i * CELL} x2={M + S} y2={M + i * CELL} stroke="rgba(255,255,255,.08)" strokeWidth={.5} />
            </g>
          ))}
          <line x1={M} y1={M + S / 2} x2={M + S} y2={M + S / 2} stroke="rgba(255,255,255,.3)" strokeWidth={1.5} />
          <line x1={M + S / 2} y1={M} x2={M + S / 2} y2={M + S} stroke="rgba(255,255,255,.3)" strokeWidth={1.5} />
          <text x={M + S + 6} y={M + S / 2 + 3} fill="rgba(255,255,255,.3)" fontSize={9} fontFamily="monospace">x</text>
          <text x={M + S / 2 + 4} y={M - 6} fill="rgba(255,255,255,.3)" fontSize={9} fontFamily="monospace">y</text>
          <text x={M + S / 2 - 12} y={M + S / 2 + 14} fill="rgba(255,255,255,.15)" fontSize={8} fontFamily="monospace">O</text>
          {pts.length === 2 && (
            <>
              <line
                x1={gridToSvg(pts[0].x, pts[0].y)[0]} y1={gridToSvg(pts[0].x, pts[0].y)[1]}
                x2={gridToSvg(pts[1].x, pts[1].y)[0]} y2={gridToSvg(pts[1].x, pts[1].y)[1]}
                stroke="#3b9eff" strokeWidth={2} strokeOpacity={.6}
              />
              {mid && (() => {
                const [mx, my] = gridToSvg(mid.x, mid.y)
                return (
                  <g>
                    <circle cx={mx} cy={my} r={4} fill="#eab308" />
                    <rect x={mx + 8} y={my - 10} width={40} height={16} rx={4} fill="rgba(0,0,0,.6)" />
                    <text x={mx + 12} y={my + 2} fill="#eab308" fontSize={8} fontFamily="monospace">M ({fmt(mid.x)}, {fmt(mid.y)})</text>
                  </g>
                )
              })()}
            </>
          )}
          {pts.map((p, i) => {
            const [sx, sy] = gridToSvg(p.x, p.y)
            return (
              <g key={i}>
                <circle cx={sx} cy={sy} r={6} fill={i === 0 ? '#22c55e' : '#ef4444'} stroke="#fff" strokeWidth={1.5} style={{ cursor: 'pointer' }} />
                <rect x={sx + 10} y={sy - 8} width={50} height={16} rx={4} fill="rgba(0,0,0,.6)" />
                <text x={sx + 14} y={sy + 2} fill={i === 0 ? '#22c55e' : '#ef4444'} fontSize={8} fontFamily="monospace">P{i + 1} ({fmt(p.x)}, {fmt(p.y)})</text>
              </g>
            )
          })}
          <rect x={M} y={G + 8} width={S} height={60} rx={8} fill="rgba(16,18,31,.5)" stroke="rgba(59,158,255,.08)" strokeWidth={1} />
          <text x={M + 10} y={G + 26} fill="#3b9eff" fontSize={10} fontFamily="monospace" fontWeight={600}>Metrics</text>
          <text x={M + 10} y={G + 44} fill="#c8cad6" fontSize={9} fontFamily="monospace">
            Distance: {fmt(dist)} {slope !== null ? `·  Slope: ${fmt(slope)}` : ''}
          </text>
          {(pts[0].x === pts[1].x) && <text x={M + 10} y={G + 58} fill="#eab308" fontSize={9} fontFamily="monospace">Vertical line — slope is undefined</text>}
        </svg>
      </div>
    </div>
  )
}

/* ── Slope Explorer ───────────────────────────────── */

export function SlopeExplorer() {
  const S = 300, M = 20, G = S + M * 2
  const CELL = S / 6
  const [p1, setP1] = useState({ x: -2, y: 1 })
  const [p2, setP2] = useState({ x: 2, y: 2.5 })
  const [active, setActive] = useState<'p1' | 'p2'>('p1')

  const handleClick = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget
    const r = svg.getBoundingClientRect()
    const px = ((e.clientX - r.left) / r.width) * G
    const py = ((e.clientY - r.top) / r.height) * G
    const cx = Math.round(((px - M) / CELL - 3) * 2) / 2
    const cy = Math.round((3 - (py - M) / CELL) * 2) / 2
    if (cx < -3 || cx > 3 || cy < -3 || cy > 3) return
    const pt = { x: cx, y: cy }
    if (cx === p1.x && cy === p1.y) return
    if (cx === p2.x && cy === p2.y) return
    setActive(prev => { if (prev === 'p1') { setP1(pt); return 'p2' } else { setP2(pt); return 'p1' } })
  }, [p1, p2])

  function gridToSvg(x: number, y: number): [number, number] {
    return [M + (x + 3) * CELL, M + (3 - y) * CELL]
  }

  const dx = p2.x - p1.x
  const dy = p2.y - p1.y
  const slope = dx !== 0 ? dy / dx : null
  const angle = Math.atan2(dy, dx) * 180 / Math.PI

  const [s1x, s1y] = gridToSvg(p1.x, p1.y)
  const [s2x, s2y] = gridToSvg(p2.x, p2.y)
  const runEndX = p2.x
  const runEndY = p1.y
  const [rex, rey] = gridToSvg(runEndX, runEndY)

  return (
    <div className="gb-interactive">
      <div className="gb-interactive-header">
        <span className="gb-interactive-icon">📈</span>
        <span className="gb-interactive-title">Slope Explorer — Click to place two points</span>
      </div>
      <div className="gb-interactive-body" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <svg viewBox={`0 0 ${G} ${G + 80}`} style={{ maxWidth: G, height: 'auto' }} onClick={handleClick} className="gb-interactive-svg" role="img" aria-label="Slope explorer">
          {Array.from({ length: 7 }, (_, i) => (
            <g key={`g-${i}`}>
              <line x1={M + i * CELL} y1={M} x2={M + i * CELL} y2={M + S} stroke="rgba(255,255,255,.08)" strokeWidth={.5} />
              <line x1={M} y1={M + i * CELL} x2={M + S} y2={M + i * CELL} stroke="rgba(255,255,255,.08)" strokeWidth={.5} />
            </g>
          ))}
          <line x1={M} y1={M + S / 2} x2={M + S} y2={M + S / 2} stroke="rgba(255,255,255,.3)" strokeWidth={1.5} />
          <line x1={M + S / 2} y1={M} x2={M + S / 2} y2={M + S} stroke="rgba(255,255,255,.3)" strokeWidth={1.5} />

          <polygon
            points={`${s1x},${s1y} ${rex},${rey} ${s2x},${s2y}`}
            fill="rgba(59,158,255,.1)"
            stroke="rgba(59,158,255,.3)"
            strokeWidth={1}
            strokeDasharray="4,3"
          />
          {dx !== 0 && (
            <>
              <text x={(s1x + rex) / 2} y={s1y + 14} fill="#22c55e" fontSize={8} fontFamily="monospace" textAnchor="middle">run = {fmt(dx)}</text>
              <text x={rex + 8} y={(rey + s2y) / 2 + 3} fill="#ef4444" fontSize={8} fontFamily="monospace" textAnchor="start">rise = {fmt(dy)}</text>
            </>
          )}

          <line x1={s1x} y1={s1y} x2={s2x} y2={s2y} stroke="#3b9eff" strokeWidth={2.5} strokeLinecap="round" />

          {[
            { p: p1, sx: s1x, sy: s1y, color: '#22c55e', label: 'P\u2081' },
            { p: p2, sx: s2x, sy: s2y, color: '#ef4444', label: 'P\u2082' },
          ].map(({ p, sx, sy, color, label }) => (
            <g key={label}>
              <circle cx={sx} cy={sy} r={6} fill={color} stroke="#fff" strokeWidth={1.5} style={{ cursor: 'pointer' }} />
              <rect x={sx + 10} y={sy - 8} rx={4} fill="rgba(0,0,0,.6)" />
              <text x={sx + 14} y={sy + 2} fill={color} fontSize={8} fontFamily="monospace">{label} ({fmt(p.x)}, {fmt(p.y)})</text>
            </g>
          ))}

          <rect x={M} y={G + 8} width={S} height={60} rx={8} fill="rgba(16,18,31,.5)" stroke="rgba(59,158,255,.08)" strokeWidth={1} />
          <text x={M + 10} y={G + 26} fill="#3b9eff" fontSize={10} fontFamily="monospace" fontWeight={600}>Slope Analysis</text>
          {slope !== null ? (
            <text x={M + 10} y={G + 44} fill="#c8cad6" fontSize={9} fontFamily="monospace">
              Rise {fmt(dy)} / Run {fmt(dx)} = slope <tspan fill="#22c55e">{fmt(slope)}</tspan> · Angle {fmt(angle)}°
            </text>
          ) : (
            <text x={M + 10} y={G + 44} fill="#eab308" fontSize={9} fontFamily="monospace">Vertical line — slope is undefined (dx = 0)</text>
          )}
          <text x={M + 10} y={G + 58} fill="#7d8299" fontSize={8} fontFamily="monospace">
            {slope === 0 ? 'Horizontal line · slope = 0' : slope !== null && slope > 0 ? 'Increasing line · positive slope' : slope !== null && slope < 0 ? 'Decreasing line · negative slope' : ''}
          </text>
        </svg>
      </div>
    </div>
  )
}

/* ── Orientation Explorer ─────────────────────────── */

export function OrientationExplorer() {
  const S = 300, M = 20, G = S + M * 2
  const CELL = S / 6
  const [points, setPoints] = useState([
    { x: -1.5, y: -1 },
    { x: 1.5, y: -0.5 },
    { x: 0.5, y: 2 },
  ])
  const [activeIdx, setActiveIdx] = useState(0)

  const handleClick = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget
    const r = svg.getBoundingClientRect()
    const px = ((e.clientX - r.left) / r.width) * G
    const py = ((e.clientY - r.top) / r.height) * G
    const cx = Math.round(((px - M) / CELL - 3) * 2) / 2
    const cy = Math.round((3 - (py - M) / CELL) * 2) / 2
    if (cx < -3 || cx > 3 || cy < -3 || cy > 3) return
    setPoints(prev => {
      const next = [...prev]
      next[activeIdx] = { x: cx, y: cy }
      return next
    })
    setActiveIdx(prev => (prev + 1) % 3)
  }, [activeIdx])

  function gridToSvg(x: number, y: number): [number, number] {
    return [M + (x + 3) * CELL, M + (3 - y) * CELL]
  }

  const orient = (() => {
    const [A, B, C] = points
    const val = (B.x - A.x) * (C.y - A.y) - (B.y - A.y) * (C.x - A.x)
    return { val, type: val > 0.001 ? 'left' : val < -0.001 ? 'right' : 'collinear' } as const
  })()

  const LABELS = ['A', 'B', 'C']
  const COLORS = ['#22c55e', '#3b9eff', '#ef4444']

  return (
    <div className="gb-interactive">
      <div className="gb-interactive-header">
        <span className="gb-interactive-icon">🧭</span>
        <span className="gb-interactive-title">Orientation Explorer — Click to place A → B → C</span>
      </div>
      <div className="gb-interactive-body" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <svg viewBox={`0 0 ${G} ${G + 80}`} style={{ maxWidth: G, height: 'auto' }} onClick={handleClick} className="gb-interactive-svg" role="img" aria-label="Orientation explorer">
          {Array.from({ length: 7 }, (_, i) => (
            <g key={`g-${i}`}>
              <line x1={M + i * CELL} y1={M} x2={M + i * CELL} y2={M + S} stroke="rgba(255,255,255,.06)" strokeWidth={.5} />
              <line x1={M} y1={M + i * CELL} x2={M + S} y2={M + i * CELL} stroke="rgba(255,255,255,.06)" strokeWidth={.5} />
            </g>
          ))}
          <line x1={M} y1={M + S / 2} x2={M + S} y2={M + S / 2} stroke="rgba(255,255,255,.2)" strokeWidth={1.5} />
          <line x1={M + S / 2} y1={M} x2={M + S / 2} y2={M + S} stroke="rgba(255,255,255,.2)" strokeWidth={1.5} />

          {(() => {
            const [A, B, C] = points
            const [ax, ay] = gridToSvg(A.x, A.y)
            const [bx, by] = gridToSvg(B.x, B.y)
            const [cx, cy] = gridToSvg(C.x, C.y)
            const orientationColor = orient.type === 'left' ? '#22c55e' : orient.type === 'right' ? '#ef4444' : '#eab308'
            return (
              <>
                <line x1={ax} y1={ay} x2={bx} y2={by} stroke="#3b9eff" strokeWidth={2.5} strokeLinecap="round" />
                <line x1={ax} y1={ay} x2={cx} y2={cy} stroke="#a855f7" strokeWidth={2} strokeDasharray="6,3" strokeLinecap="round" />
                {orient.type !== 'collinear' && (
                  <path
                    d={`M ${ax + 20} ${ay} A 20 20 0 0 ${orient.type === 'left' ? '0' : '1'} ${ax + 20 * Math.cos(orient.type === 'left' ? .6 : -.6)} ${ay + 20 * Math.sin(orient.type === 'left' ? .6 : -.6)}`}
                    fill="none"
                    stroke={orientationColor}
                    strokeWidth={2}
                    strokeOpacity={.6}
                  />
                )}
                {orient.type !== 'collinear' && (
                  <text x={ax + 26} y={ay + (orient.type === 'left' ? 16 : -8)} fill={orientationColor} fontSize={9} fontFamily="monospace">{orient.type === 'left' ? '\u2190 left turn' : '\u2192 right turn'}</text>
                )}
                {orient.type === 'collinear' && (
                  <text x={ax + 26} y={ay + 2} fill="#eab308" fontSize={8} fontFamily="monospace">\u2195 collinear</text>
                )}
              </>
            )
          })()}

          {points.map((p, i) => {
            const [sx, sy] = gridToSvg(p.x, p.y)
            return (
              <g key={i}>
                <circle cx={sx} cy={sy} r={6} fill={COLORS[i]} stroke="#fff" strokeWidth={1.5} style={{ cursor: 'pointer' }}
                  opacity={activeIdx === i ? .7 : 1} />
                {activeIdx === i && <circle cx={sx} cy={sy} r={10} fill="none" stroke={COLORS[i]} strokeWidth={1} strokeOpacity={.4} />}
                <rect x={sx + 10} y={sy - 8} rx={4} fill="rgba(0,0,0,.6)" />
                <text x={sx + 14} y={sy + 2} fill={COLORS[i]} fontSize={8} fontFamily="monospace">{LABELS[i]} ({fmt(p.x)}, {fmt(p.y)})</text>
              </g>
            )
          })}

          <rect x={M} y={G + 8} width={S} height={60} rx={8} fill="rgba(16,18,31,.5)" stroke="rgba(59,158,255,.08)" strokeWidth={1} />
          <text x={M + 10} y={G + 26} fill="#3b9eff" fontSize={10} fontFamily="monospace" fontWeight={600}>Cross Product</text>
          <text x={M + 10} y={G + 44} fill="#c8cad6" fontSize={9} fontFamily="monospace">
            AB × AC = {fmt(orient.val)}
          </text>
          <text x={M + 10} y={G + 58} fill={
            orient.type === 'left' ? '#22c55e' : orient.type === 'right' ? '#ef4444' : '#eab308'
          } fontSize={9} fontFamily="monospace" fontWeight={600}>
            {orient.type === 'left' ? '\u2190 Counter-clockwise (left turn)' : orient.type === 'right' ? '\u2192 Clockwise (right turn)' : '\u2014 Collinear (no turn)'}
          </text>
        </svg>
      </div>
    </div>
  )
}
