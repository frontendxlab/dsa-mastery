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
          <polygon
            points={`${x},${y} ${x + cubeW / 2},${y - cubeH / 2} ${x + cubeW / 2 + cubeW},${y - cubeH / 2} ${x + cubeW},${y}`}
            fill={color} fillOpacity={opacity * (1 - z * 0.08)} stroke={color} strokeOpacity={.3} strokeWidth={.5}
          />
          <rect
            x={x} y={y}
            width={cubeW} height={cubeH / 2}
            fill={color} fillOpacity={opacity * (0.8 - z * 0.06)} stroke={color} strokeOpacity={.2} strokeWidth={.5}
          />
          <polygon
            points={`${x + cubeW},${y} ${x + cubeW / 2 + cubeW},${y - cubeH / 2} ${x + cubeW / 2 + cubeW},${y + cubeH / 2 - cubeH / 2} ${x + cubeW},${y + cubeH / 2}`}
            fill={color} fillOpacity={opacity * (0.6 - z * 0.05)} stroke={color} strokeOpacity={.2} strokeWidth={.5}
          />
        </g>
      )
    }
    return layers
  }

  const palette = ['#3b9eff','#22c55e','#eab308','#ef4444','#a855f7']
  const svgW = n * (cubeW + gap) + 60
  const svgH = maxH * cubeH * 0.5 + m * cubeH * 0.5 + 60

  return (
    <div className="gb-interactive">
      <div className="gb-interactive-header">
        <span className="gb-interactive-icon">{'\u25A6'}</span>
        <span className="gb-interactive-title">3D Projection Viewer — See how grid heights translate to isometric blocks</span>
      </div>
      <div className="gb-interactive-body">
        <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{maxWidth:480,height:'auto'}} className="gb-interactive-svg" role="img" aria-label="3D projection viewer">
          {PROJ_GRID.map((row, r) => row.map((h, c) => {
            if (h === 0) return null
            const ox = c * (cubeW + gap) + 30
            const oy = (m - r) * (cubeH * 0.5) + maxH * cubeH * 0.5 + 20
            return drawCube(ox, oy, h, palette[Math.min(h - 1, palette.length - 1)], 0.85)
          }))}
          <text x={10} y={svgH - 8} fill="#7d8299" fontSize={8} fontFamily="monospace">Front view</text>
        </svg>
        <div style={{display:'flex',gap:'1rem',justifyContent:'center',marginTop:'.5rem'}}>
          {PROJ_GRID.flat().filter(h => h > 0).map((h, i) => (
            <div key={i} style={{display:'flex',alignItems:'center',gap:'.3rem'}}>
              <div style={{width:12,height:12,borderRadius:3,background:palette[Math.min(h - 1, palette.length - 1)]}} />
              <span style={{color:'#c8cad6',fontSize:10,fontFamily:'monospace'}}>h={h}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Grid BFS/DFS Explorer ─────────────────────── */

export function GridBFSExplorer() {
  const R = 8, C = 8
  const [grid, setGrid] = useState(() => Array.from({length:R},()=>Array(C).fill(0)))
  const [mode, setMode] = useState<'bfs'|'dfs'>('bfs')
  const [step, setStep] = useState(0)
  const [running, setRunning] = useState(false)
  const [src, setSrc] = useState<[number,number]>([0,0])
  const cell = 36, M = 20, G = C * cell + M * 2

  const steps = useMemo(() => {
    const g = grid.map(r=>[...r])
    const visited = Array.from({length:R},()=>Array(C).fill(false))
    const dist = Array.from({length:R},()=>Array(C).fill(-1))
    const snapshots: {visited:boolean[][];frontier:[number,number][];dist:number[][]}[] = []
    const queue: [number,number][] = [[src[0], src[1]]]
    const frontierSet = new Set<string>()
    frontierSet.add(`${src[0]},${src[1]}`)
    visited[src[0]][src[1]] = true
    dist[src[0]][src[1]] = 0
    snapshots.push({visited:visited.map(r=>[...r]),frontier:[[src[0],src[1]]],dist:dist.map(r=>[...r])})

    while (queue.length > 0) {
      const [r,c] = mode === 'bfs' ? queue.shift()! : queue.pop()!
      frontierSet.delete(`${r},${c}`)
      const dirs = [[-1,0],[1,0],[0,-1],[0,1]]
      const nextFrontier: [number,number][] = []
      for (const [dr,dc] of dirs) {
        const nr = r+dr, nc = c+dc
        if (nr<0||nr>=R||nc<0||nc>=C) continue
        if (visited[nr][nc] || g[nr][nc] === 1) continue
        visited[nr][nc] = true
        dist[nr][nc] = dist[r][c] + 1
        queue.push([nr,nc])
        frontierSet.add(`${nr},${nc}`)
        nextFrontier.push([nr,nc])
      }
      if (nextFrontier.length > 0 || queue.length > 0) {
        snapshots.push({visited:visited.map(r=>[...r]),frontier:Array.from(frontierSet).map(k=>k.split(',').map(Number) as [number,number]),dist:dist.map(r=>[...r])})
      }
    }
    return snapshots
  }, [grid, mode, src])

  useEffect(() => {
    if (!running) return
    if (step >= steps.length - 1) { setRunning(false); return }
    const t = setTimeout(() => setStep(s => Math.min(s + 1, steps.length - 1)), 400)
    return () => clearTimeout(t)
  }, [running, step, steps.length])

  const snap = steps[step] || steps[0]

  return (
    <div className="gb-interactive">
      <div className="gb-interactive-header">
        <span className="gb-interactive-icon">{'\u25A3'}</span>
        <span className="gb-interactive-title">Grid BFS/DFS — Click cells to toggle obstacles, step through traversal</span>
      </div>
      <div className="gb-interactive-body" style={{display:'flex',gap:'1.5rem',flexWrap:'wrap',justifyContent:'center',alignItems:'flex-start'}}>
        <svg viewBox={`0 0 ${G} ${G}`} style={{maxWidth:G,height:'auto'}} className="gb-interactive-svg" role="img" aria-label="Grid BFS/DFS explorer">
          <rect x={M} y={M} width={C*cell} height={R*cell} rx={4} fill="rgba(16,18,31,.4)" stroke="rgba(255,255,255,.06)" strokeWidth={1} />
          {grid.map((row,r)=>row.map((v,c)=>{
            let fill = 'rgba(255,255,255,.03)', stroke = 'rgba(255,255,255,.08)'
            if (v === 1) { fill = 'rgba(239,68,68,.2)'; stroke = '#ef444466' }
            if (snap && snap.visited[r][c] && v !== 1) { fill = 'rgba(59,158,255,.15)'; stroke = '#3b9eff66' }
            if (r === src[0] && c === src[1]) { fill = '#3b9eff'; stroke = '#fff' }
            if (snap && snap.frontier.some(([fr,fc]) => fr===r && fc===c)) { fill = 'rgba(234,179,8,.25)'; stroke = '#eab30888' }
            return <rect key={`${r}-${c}`} x={M+c*cell} y={M+r*cell} width={cell} height={cell}
              fill={fill} stroke={stroke} strokeWidth={.8} rx={2}
              style={{cursor:'pointer'}} onClick={()=>{if(!running){const g=grid.map(r=>[...r]);g[r][c]=g[r][c]?0:1;setGrid(g);setStep(0)}}}/>
          }))}
          {snap && grid.map((row,r)=>row.map((v,c)=>{
            if (snap.visited[r][c] && snap.dist[r][c] >= 0 && !(r===src[0]&&c===src[1])) {
              return <text key={`t${r}-${c}`} x={M+c*cell+cell/2} y={M+r*cell+cell/2+1.5}
                fill={snap.frontier.some(([fr,fc])=>fr===r&&fc===c)?'#eab308':'rgba(255,255,255,.7)'}
                fontSize={10} fontFamily="monospace" textAnchor="middle" dominantBaseline="middle">{snap.dist[r][c]}</text>
            }
            return null
          }))}
        </svg>
        <div style={{display:'flex',flexDirection:'column',gap:'.5rem',minWidth:160}}>
          <div style={{display:'flex',gap:'.5rem'}}>
            <button onClick={()=>{setMode('bfs');setStep(0);setRunning(false)}} style={{
              flex:1,padding:'.4rem .75rem',borderRadius:6,border:'1px solid',
              borderColor:mode==='bfs'?'#3b9eff':'rgba(255,255,255,.12)',
              background:mode==='bfs'?'rgba(59,158,255,.12)':'transparent',
              color:mode==='bfs'?'#3b9eff':'#c8cad6',fontSize:10,fontFamily:'monospace',fontWeight:600,cursor:'pointer'
            }}>BFS</button>
            <button onClick={()=>{setMode('dfs');setStep(0);setRunning(false)}} style={{
              flex:1,padding:'.4rem .75rem',borderRadius:6,border:'1px solid',
              borderColor:mode==='dfs'?'#22c55e':'rgba(255,255,255,.12)',
              background:mode==='dfs'?'rgba(34,197,94,.12)':'transparent',
              color:mode==='dfs'?'#22c55e':'#c8cad6',fontSize:10,fontFamily:'monospace',fontWeight:600,cursor:'pointer'
            }}>DFS</button>
          </div>
          <div style={{display:'flex',gap:'.5rem'}}>
            <button onClick={()=>{if(!running){setStep(0);setRunning(true)}}}
              disabled={running}
              style={{flex:1,padding:'.4rem .75rem',borderRadius:6,border:'1px solid rgba(34,197,94,.4)',background:'rgba(34,197,94,.12)',color:'#22c55e',fontSize:10,fontFamily:'monospace',fontWeight:600,cursor:running?'not-allowed':'pointer'}}>Play</button>
            <button onClick={()=>{setRunning(false)}}
              style={{flex:1,padding:'.4rem .75rem',borderRadius:6,border:'1px solid rgba(239,68,68,.4)',background:'rgba(239,68,68,.12)',color:'#ef4444',fontSize:10,fontFamily:'monospace',fontWeight:600,cursor:'pointer'}}>Stop</button>
            <button onClick={()=>{setStep(0);setRunning(false)}}
              style={{flex:1,padding:'.4rem .75rem',borderRadius:6,border:'1px solid rgba(255,255,255,.12)',background:'transparent',color:'#c8cad6',fontSize:10,fontFamily:'monospace',fontWeight:600,cursor:'pointer'}}>Reset</button>
          </div>
          <div style={{padding:'.5rem .75rem',borderRadius:6,border:'1px solid rgba(255,255,255,.06)',background:'rgba(255,255,255,.03)'}}>
            <div style={{color:'#c8cad6',fontSize:9,fontFamily:'monospace'}}>
              Step: <span style={{color:'#3b9eff',fontWeight:600}}>{step}</span> / {steps.length - 1}
            </div>
            <div style={{color:'#c8cad6',fontSize:9,fontFamily:'monospace',marginTop:2}}>
              Frontier: <span style={{color:'#eab308',fontWeight:600}}>{snap?.frontier.length || 0}</span> cells
            </div>
            <div style={{color:'#7d8299',fontSize:8,fontFamily:'monospace',marginTop:4}}>
              Click cells to toggle obstacles. Source is blue.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Multi-Source BFS ───────────────────────────── */

export function MultiSourceBFS() {
  const R = 7, C = 7
  const [sources, setSources] = useState<Set<string>>(new Set(['0,0','6,6']))
  const [obstacles, setObstacles] = useState<Set<string>>(new Set())
  const [step, setStep] = useState(0)
  const [running, setRunning] = useState(false)
  const cell = 40, M = 20, G = C * cell + M * 2

  const steps = useMemo(() => {
    const dist = Array.from({length:R},()=>Array(C).fill(-1))
    const queue: [number,number][] = []
    const snapshots: {dist:number[][];frontier:[number,number][]}[] = []

    for (const sk of sources) {
      const [sr,sc] = sk.split(',').map(Number)
      dist[sr][sc] = 0
      queue.push([sr,sc])
    }
    snapshots.push({dist:dist.map(r=>[...r]),frontier:[[...queue]]})

    while (queue.length > 0) {
      const [r,c] = queue.shift()!
      const dirs = [[-1,0],[1,0],[0,-1],[0,1]]
      const newFrontier: [number,number][] = []
      for (const [dr,dc] of dirs) {
        const nr = r+dr, nc = c+dc
        if (nr<0||nr>=R||nc<0||nc>=C) continue
        if (dist[nr][nc] >= 0 || obstacles.has(`${nr},${nc}`)) continue
        dist[nr][nc] = dist[r][c] + 1
        queue.push([nr,nc])
        newFrontier.push([nr,nc])
      }
      if (newFrontier.length > 0 || queue.length > 0) {
        snapshots.push({dist:dist.map(r=>[...r]),frontier:newFrontier})
      }
    }
    return snapshots
  }, [sources, obstacles])

  useEffect(() => {
    if (!running) return
    if (step >= steps.length - 1) { setRunning(false); return }
    const t = setTimeout(() => setStep(s => Math.min(s + 1, steps.length - 1)), 200)
    return () => clearTimeout(t)
  }, [running, step, steps.length])

  const snap = steps[step] || steps[0]
  let maxDist = 0
  if (snap) for (const r of snap.dist) for (const v of r) if (v > maxDist) maxDist = v

  const getColor = (d: number, o: boolean) => {
    if (o) return '#ef444433'
    if (d === 0) return '#3b9eff'
    if (d < 0) return 'rgba(255,255,255,.03)'
    const t = maxDist > 0 ? d / maxDist : 0
    const r = Math.round(59 + (234 - 59) * t)
    const g = Math.round(158 + (179 - 158) * t)
    const b = Math.round(255 + (8 - 255) * t)
    return `rgb(${r},${g},${b})`
  }

  return (
    <div className="gb-interactive">
      <div className="gb-interactive-header">
        <span className="gb-interactive-icon">{'\u25A3'}</span>
        <span className="gb-interactive-title">Multi-Source BFS — Click cells to toggle sources, watch distances propagate</span>
      </div>
      <div className="gb-interactive-body" style={{display:'flex',gap:'1.5rem',flexWrap:'wrap',justifyContent:'center',alignItems:'flex-start'}}>
        <svg viewBox={`0 0 ${G} ${G}`} style={{maxWidth:G,height:'auto'}} className="gb-interactive-svg" role="img" aria-label="Multi-source BFS">
          <rect x={M} y={M} width={C*cell} height={R*cell} rx={4} fill="rgba(16,18,31,.4)" stroke="rgba(255,255,255,.06)" strokeWidth={1} />
          {Array.from({length:R},(_,r)=>Array.from({length:C},(_,c)=>{
            const key = `${r},${c}`
            const isSrc = sources.has(key)
            const isObs = obstacles.has(key)
            const d = snap ? snap.dist[r][c] : -1
            const inFrontier = snap ? snap.frontier.some(([fr,fc]) => fr===r && fc===c) : false
            let fill = getColor(d, isObs)
            let stroke = 'rgba(255,255,255,.08)'
            let textColor = isSrc ? '#fff' : d >= 0 ? 'rgba(255,255,255,.9)' : '#7d8299'
            if (isSrc) { stroke = '#fff'; textColor = '#fff' }
            if (inFrontier) stroke = '#eab308'
            return <g key={key}>
              <rect x={M+c*cell} y={M+r*cell} width={cell} height={cell}
                fill={fill} stroke={stroke} strokeWidth={isSrc||inFrontier?1.5:.6} rx={2}
                style={{cursor:'pointer'}}
                onClick={()=>{
                  if (running) return
                  const key2 = `${r},${c}`
                  if (obstacles.has(key2)) { const n = new Set(obstacles); n.delete(key2); setObstacles(n); setStep(0); return }
                  if (sources.has(key2)) { return }
                  if (sources.size >= 4) return
                  const n = new Set(sources); n.add(key2); setSources(n); setStep(0)
                }}
                onContextMenu={e=>{
                  e.preventDefault()
                  if (running) return
                  const key2 = `${r},${c}`
                  if (sources.has(key2)) return
                  if (obstacles.has(key2)) { const n = new Set(obstacles); n.delete(key2); setObstacles(n); setStep(0); return }
                  if (obstacles.size >= 8) return
                  const n = new Set(obstacles); n.add(key2); setObstacles(n); setStep(0)
                }}
              />
              {d >= 0 && <text x={M+c*cell+cell/2} y={M+r*cell+cell/2+1.5}
                fill={textColor} fontSize={11} fontFamily="monospace" fontWeight={isSrc?700:400}
                textAnchor="middle" dominantBaseline="middle"
                style={{pointerEvents:'none'}}>{d}</text>}
              {isSrc && <text x={M+c*cell+cell-4} y={M+r*cell+4} fill="#fff" fontSize={8} fontFamily="monospace"
                style={{pointerEvents:'none'}}>S</text>}
            </g>
          }))}
        </svg>
        <div style={{display:'flex',flexDirection:'column',gap:'.5rem',minWidth:160}}>
          <div style={{display:'flex',gap:'.5rem'}}>
            <button onClick={()=>{if(!running){setStep(0);setRunning(true)}}}
              disabled={running}
              style={{flex:1,padding:'.4rem .75rem',borderRadius:6,border:'1px solid rgba(34,197,94,.4)',background:'rgba(34,197,94,.12)',color:'#22c55e',fontSize:10,fontFamily:'monospace',fontWeight:600,cursor:running?'not-allowed':'pointer'}}>Play</button>
            <button onClick={()=>{setRunning(false)}}
              style={{flex:1,padding:'.4rem .75rem',borderRadius:6,border:'1px solid rgba(239,68,68,.4)',background:'rgba(239,68,68,.12)',color:'#ef4444',fontSize:10,fontFamily:'monospace',fontWeight:600,cursor:'pointer'}}>Stop</button>
            <button onClick={()=>{setStep(0);setRunning(false)}}
              style={{flex:1,padding:'.4rem .75rem',borderRadius:6,border:'1px solid rgba(255,255,255,.12)',background:'transparent',color:'#c8cad6',fontSize:10,fontFamily:'monospace',fontWeight:600,cursor:'pointer'}}>Reset</button>
          </div>
          <div style={{padding:'.5rem .75rem',borderRadius:6,border:'1px solid rgba(255,255,255,.06)',background:'rgba(255,255,255,.03)'}}>
            <div style={{color:'#c8cad6',fontSize:9,fontFamily:'monospace'}}>
              Step: <span style={{color:'#3b9eff',fontWeight:600}}>{step}</span> / {steps.length - 1}
            </div>
            <div style={{color:'#c8cad6',fontSize:9,fontFamily:'monospace',marginTop:2}}>
              Sources: <span style={{color:'#3b9eff',fontWeight:600}}>{sources.size}</span> ({maxDist > 0 ? `max dist: ${maxDist}` : 'no propagation'})
            </div>
            <div style={{color:'#7d8299',fontSize:8,fontFamily:'monospace',marginTop:4}}>
              Left-click to add source (max 4). Right-click to toggle obstacle.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Shoelace Explorer ─────────────────────────── */

export function ShoelaceExplorer() {
  const S = 220, M = 20, G = S + M * 2
  const [pts, setPts] = useState([{x:40,y:140},{x:90,y:40},{x:170,y:60},{x:160,y:150}])
  const handleDrag = (i: number, field: 'x'|'y', val: number) => {
    setPts(v => {
      const n = [...v]
      n[i] = {...n[i], [field]: val}
      return n
    })
  }
  const area = (() => {
    if (pts.length < 3) return 0
    let s = 0
    for (let i = 0; i < pts.length; i++) {
      const j = (i + 1) % pts.length
      s += pts[i].x * pts[j].y
      s -= pts[j].x * pts[i].y
    }
    return Math.abs(s) / 2
  })()
  const terms: {i:number; j:number; xiyj: number; xjyi: number}[] = []
  for (let i = 0; i < pts.length; i++) {
    const j = (i + 1) % pts.length
    terms.push({i, j, xiyj: pts[i].x * pts[j].y, xjyi: pts[j].x * pts[i].y})
  }
  const sx = (v: number) => M + v * S / 200
  const sy = (v: number) => M + S - v * S / 180

  return (
    <div className="gb-interactive">
      <div className="gb-interactive-header">
        <span className="gb-interactive-icon">{'\u2B1F'}</span>
        <span className="gb-interactive-title">Shoelace Explorer — Drag vertices to see the area calculation</span>
      </div>
      <div className="gb-interactive-body" style={{display:'flex',gap:'1.5rem',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
        <svg viewBox={`0 0 ${G} ${G}`} style={{maxWidth:G,height:'auto'}} className="gb-interactive-svg" role="img" aria-label="Shoelace explorer">
          <rect x={M} y={M} width={S} height={S} rx={8} fill="rgba(16,18,31,.4)" stroke="rgba(255,255,255,.06)" strokeWidth={1} />
          {Array.from({length:10},(_,i)=><g key={`g${i}`}>
            <line x1={M+i*S/10} y1={M} x2={M+i*S/10} y2={M+S} stroke="rgba(255,255,255,.04)" strokeWidth={.5}/>
            <line x1={M} y1={M+i*S/10} x2={M+S} y2={M+i*S/10} stroke="rgba(255,255,255,.04)" strokeWidth={.5}/>
          </g>)}
          <polygon points={pts.map(p=>`${sx(p.x)},${sy(p.y)}`).join(' ')}
            fill="rgba(59,158,255,.1)" stroke="#3b9eff" strokeWidth={2} />
          {pts.map((p,i) => (
            <g key={i}>
              <circle cx={sx(p.x)} cy={sy(p.y)} r={5} fill={['#3b9eff','#22c55e','#eab308','#ef4444','#a855f7','#ec4899'][i%6]} stroke="#fff" strokeWidth={1.5} />
              <text x={sx(p.x)+8} y={sy(p.y)-8} fill={['#3b9eff','#22c55e','#eab308','#ef4444','#a855f7','#ec4899'][i%6]} fontSize={8} fontFamily="monospace" fontWeight={600}>V{i}</text>
              <text x={sx(p.x)+8} y={sy(p.y)+4} fill="#7d8299" fontSize={7} fontFamily="monospace">({p.x},{p.y})</text>
            </g>
          ))}
        </svg>
        <div style={{display:'flex',flexDirection:'column',gap:'.5rem',minWidth:200}}>
          <div style={{padding:'.5rem .75rem',borderRadius:6,background:'rgba(59,158,255,.08)',border:'1px solid rgba(59,158,255,.2)'}}>
            <div style={{color:'#3b9eff',fontSize:10,fontFamily:'monospace',fontWeight:600,marginBottom:2}}>Area = {area.toFixed(1)}</div>
            <div style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>|∑(xᵢyᵢ₊₁ − xᵢ₊₁yᵢ)| / 2</div>
          </div>
          <div style={{padding:'.5rem .75rem',borderRadius:6,background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.06)'}}>
            <div style={{color:'#c8cad6',fontSize:8,fontFamily:'monospace',fontWeight:600,marginBottom:4}}>Shoelace Terms</div>
            {terms.map((t,j) => (
              <div key={j} style={{display:'flex',justifyContent:'space-between',color:'#7d8299',fontSize:8,fontFamily:'monospace',padding:'1px 0'}}>
                <span style={{color:'#3b9eff'}}>V{t.i}→V{t.j}</span>
                <span>{t.xiyj} − {t.xjyi} = <span style={{color:'#22c55e',fontWeight:600}}>{t.xiyj - t.xjyi}</span></span>
              </div>
            ))}
            <div style={{borderTop:'1px solid rgba(255,255,255,.08)',marginTop:2,paddingTop:2,display:'flex',justifyContent:'space-between',color:'#c8cad6',fontSize:8,fontFamily:'monospace',fontWeight:600}}>
              <span>Sum</span>
              <span>|{terms.reduce((s,t)=>s+ t.xiyj - t.xjyi, 0)}| / 2 = {area.toFixed(1)}</span>
            </div>
          </div>
          {pts.map((p,i) => (
            <div key={i} style={{display:'flex',gap:'.3rem',alignItems:'center'}}>
              <span style={{color:['#3b9eff','#22c55e','#eab308','#ef4444','#a855f7','#ec4899'][i%6],fontSize:8,fontFamily:'monospace',fontWeight:600,width:16}}>V{i}</span>
              <div style={{flex:1}}><label style={{color:'#7d8299',fontSize:7,fontFamily:'monospace'}}>x</label>
                <input type="range" min={10} max={190} value={p.x} onChange={e=>handleDrag(i,'x',Number(e.target.value))} style={{width:'100%',accentColor:'#3b9eff'}}/></div>
              <div style={{flex:1}}><label style={{color:'#7d8299',fontSize:7,fontFamily:'monospace'}}>y</label>
                <input type="range" min={10} max={170} value={p.y} onChange={e=>handleDrag(i,'y',Number(e.target.value))} style={{width:'100%',accentColor:'#3b9eff'}}/></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Point-in-Polygon (Ray casting) ─────────────── */

export function PointInPolygon() {
  const S = 220, M = 20, G = S + M * 2
  const [poly, setPoly] = useState([{x:30,y:140},{x:80,y:30},{x:160,y:40},{x:180,y:130},{x:120,y:170}])
  const [px, setPx] = useState(100)
  const [py, setPy] = useState(100)
  const [showRay, setShowRay] = useState(true)

  const inside = (() => {
    let c = false
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const xi = poly[i].x, yi = poly[i].y
      const xj = poly[j].x, yj = poly[j].y
      if ((yi > py) !== (yj > py) && px < (xj - xi) * (py - yi) / (yj - yi) + xi) c = !c
    }
    return c
  })()

  const handlePoly = (i: number, field: 'x'|'y', val: number) => {
    setPoly(v => {
      const n = [...v]
      n[i] = {...n[i], [field]: val}
      return n
    })
  }

  const sx = (v: number) => M + v * S / 200
  const sy = (v: number) => M + S - v * S / 180

  return (
    <div className="gb-interactive">
      <div className="gb-interactive-header">
        <span className="gb-interactive-icon">{'\u25B3'}</span>
        <span className="gb-interactive-title">Point-in-Polygon — Drag the point and polygon vertices to test ray casting</span>
      </div>
      <div className="gb-interactive-body" style={{display:'flex',gap:'1.5rem',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
        <svg viewBox={`0 0 ${G} ${G}`} style={{maxWidth:G,height:'auto'}} className="gb-interactive-svg" role="img" aria-label="Point in polygon test">
          <rect x={M} y={M} width={S} height={S} rx={8} fill="rgba(16,18,31,.4)" stroke="rgba(255,255,255,.06)" strokeWidth={1} />
          {Array.from({length:10},(_,i)=><g key={`g${i}`}>
            <line x1={M+i*S/10} y1={M} x2={M+i*S/10} y2={M+S} stroke="rgba(255,255,255,.04)" strokeWidth={.5}/>
            <line x1={M} y1={M+i*S/10} x2={M+S} y2={M+i*S/10} stroke="rgba(255,255,255,.04)" strokeWidth={.5}/>
          </g>)}
          <polygon points={poly.map(p=>`${sx(p.x)},${sy(p.y)}`).join(' ')}
            fill="rgba(59,158,255,.08)" stroke="#3b9eff" strokeWidth={2} />
          {showRay && (
            <line x1={sx(px)} y1={sy(py)} x2={sx(250)} y2={sy(py)} stroke="rgba(234,179,8,.5)" strokeWidth={1.5} strokeDasharray="6,3" />
          )}
          {poly.map((p,i) => (
            <g key={i}>
              <circle cx={sx(p.x)} cy={sy(p.y)} r={3.5} fill={['#3b9eff','#22c55e','#eab308','#ef4444','#a855f7','#ec4899'][i%6]} stroke="#fff" strokeWidth={1} />
              <text x={sx(p.x)+5} y={sy(p.y)-5} fill={['#3b9eff','#22c55e','#eab308','#ef4444','#a855f7','#ec4899'][i%6]} fontSize={6} fontFamily="monospace">V{i}</text>
            </g>
          ))}
          <circle cx={sx(px)} cy={sy(py)} r={5} fill={inside?'#22c55e':'#ef4444'} stroke="#fff" strokeWidth={2} />
          <text x={sx(px)+8} y={sy(py)-8} fill={inside?'#22c55e':'#ef4444'} fontSize={8} fontFamily="monospace" fontWeight={600}>({px},{py})</text>
        </svg>
        <div style={{display:'flex',flexDirection:'column',gap:'.5rem',minWidth:180}}>
          <div style={{padding:'.5rem .75rem',borderRadius:6,border:'1px solid',borderColor:inside?'rgba(34,197,94,.4)':'rgba(239,68,68,.4)',background:inside?'rgba(34,197,94,.08)':'rgba(239,68,68,.08)'}}>
            <div style={{color:inside?'#22c55e':'#ef4444',fontSize:12,fontFamily:'monospace',fontWeight:700}}>{inside ? 'Inside' : 'Outside'}</div>
            <div style={{color:'#c8cad6',fontSize:9,fontFamily:'monospace',marginTop:2}}>{inside ? 'Odd crossings → inside' : 'Even crossings → outside'}</div>
          </div>
          <label style={{display:'flex',alignItems:'center',gap:'.5rem',color:'#c8cad6',fontSize:9,fontFamily:'monospace'}}>
            <input type="checkbox" checked={showRay} onChange={e=>setShowRay(e.target.checked)} />
            Show ray (→ right)
          </label>
          <div>
            <label style={{color:'#eab308',fontSize:9,fontFamily:'monospace',fontWeight:600}}>Point</label>
            <div style={{display:'flex',gap:'.5rem'}}>
              <div style={{flex:1}}><label style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>x</label>
                <input type="range" min={10} max={190} value={px} onChange={e=>setPx(Number(e.target.value))} style={{width:'100%',accentColor:'#eab308'}}/></div>
              <div style={{flex:1}}><label style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>y</label>
                <input type="range" min={10} max={170} value={py} onChange={e=>setPy(Number(e.target.value))} style={{width:'100%',accentColor:'#eab308'}}/></div>
            </div>
          </div>
          {poly.map((p,i) => (
            <div key={i} style={{display:'flex',gap:'.3rem',alignItems:'center'}}>
              <span style={{color:['#3b9eff','#22c55e','#eab308','#ef4444','#a855f7','#ec4899'][i%6],fontSize:7,fontFamily:'monospace',fontWeight:600,width:14}}>V{i}</span>
              <div style={{flex:1}}><input type="range" min={10} max={190} value={p.x} onChange={e=>handlePoly(i,'x',Number(e.target.value))} style={{width:'100%',accentColor:'#3b9eff'}}/></div>
              <div style={{flex:1}}><input type="range" min={10} max={170} value={p.y} onChange={e=>handlePoly(i,'y',Number(e.target.value))} style={{width:'100%',accentColor:'#3b9eff'}}/></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function GridProjection() {
  const cubeW = 28, cubeH = 20, gap = 4
  function drawCube(ox: number, oy: number, h: number, color: string, opacity: number) {
    if (h === 0) return null
    const layers: JSX.Element[] = []
    for (let z = 0; z < h; z++) {
      const x = ox, y = oy - z * (cubeH * 0.5)
      layers.push(<g key={`${ox}-${oy}-${z}`}>
        <polygon points={`${x},${y} ${x+cubeW/2},${y-cubeH/2} ${x+cubeW/2+cubeW},${y-cubeH/2} ${x+cubeW},${y}`}
          fill={color} fillOpacity={opacity*(1-z*0.08)} stroke={color} strokeOpacity={.3} strokeWidth={.5}/>
        <rect x={x} y={y} width={cubeW} height={cubeH/2}
          fill={color} fillOpacity={opacity*(0.8-z*0.06)} stroke={color} strokeOpacity={.2} strokeWidth={.5}/>
        <polygon points={`${x+cubeW},${y} ${x+cubeW/2+cubeW},${y-cubeH/2} ${x+cubeW/2+cubeW},${y+cubeH/2-cubeH/2} ${x+cubeW},${y+cubeH/2}`}
          fill={color} fillOpacity={opacity*(0.6-z*0.05)} stroke={color} strokeOpacity={.2} strokeWidth={.5}/>
      </g>)
    }
    return <g>{layers}</g>
  }
  return (
    <div className="gb-interactive">
      <div className="gb-interactive-header">
        <span className="gb-interactive-icon">{'\u25A6'}</span>
        <span className="gb-interactive-title">3D Grid Projection — Each column height shows the cell value</span>
      </div>
      <div className="gb-interactive-body" style={{display:'flex',gap:'1.5rem',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
        <svg viewBox="0 0 220 200" style={{maxWidth:280,height:'auto'}} className="gb-interactive-svg" role="img" aria-label="3D grid projection">
          {PROJ_GRID.map((row, r) => row.map((v, c) => {
            const ox = 30 + c * (cubeW + gap)
            const oy = 170 - r * 30
            const colors = ['#3b9eff', '#22c55e', '#eab308', '#ef4444']
            return drawCube(ox, oy, v, colors[v] || '#7d8299', 0.85)
          }))}
        </svg>
        <div style={{display:'flex',flexDirection:'column',gap:'.5rem',minWidth:140}}>
          <div style={{padding:'.5rem .75rem',borderRadius:8,background:'rgba(59,158,255,.08)',border:'1px solid rgba(59,158,255,.2)'}}>
            <div style={{color:'#3b9eff',fontSize:10,fontFamily:'monospace',fontWeight:600,marginBottom:4}}>Grid View</div>
            {PROJ_GRID.map((row, r) => (
              <div key={r} style={{display:'flex',gap:4,justifyContent:'center',marginBottom:2}}>
                {row.map((v, c) => (
                  <div key={c} style={{width:28,height:20,borderRadius:3,background:['#3b9eff','#22c55e','#eab308','#ef4444'][v]||'#7d8299',display:'flex',alignItems:'center',justifyContent:'center',color:'#000',fontSize:10,fontFamily:'monospace',fontWeight:700}}>{v}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Manhattan Median Explorer ──────────────────── */

export function ManhattanMedian() {
  const W = 400, H = 280, M = 30
  const [pts, setPts] = useState([1, 3, 7, 8, 12].map(v => ({ x: v * (W - M * 2) / 16 + M })))
  const dragIdx = useState<number | null>(null)[0]
  const setDrag = useState<number | null>(null)[1]
  const sorted = [...pts].sort((a, b) => a.x - b.x)
  const medianX = sorted[Math.floor(sorted.length / 2)].x
  const sumFn = (c: number) => pts.reduce((s, p) => s + Math.abs(p.x - c), 0)
  // Sample the sum function across the range
  const curve: { x: number; y: number }[] = []
  const minC = M, maxC = W - M
  for (let c = minC; c <= maxC; c += 1) {
    curve.push({ x: c, y: -sumFn(c) * (H - M * 2) / 200 + H - M })
  }

  return (
    <div className="gb-interactive">
      <div className="gb-interactive-header">
        <span className="gb-interactive-icon">{'\u2263'}</span>
        <span className="gb-interactive-title">Manhattan Median — Drag points to see how median minimizes total distance</span>
      </div>
      <div className="gb-interactive-body" style={{display:'flex',gap:'1.5rem',flexWrap:'wrap',justifyContent:'center',alignItems:'flex-start'}}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{maxWidth:W,height:'auto'}} className="gb-interactive-svg" role="img" aria-label="Manhattan median explorer">
          {/* Axes */}
          <line x1={M} y1={H - M} x2={W - M} y2={H - M} stroke="rgba(255,255,255,.2)" strokeWidth={1} />
          <line x1={M} y1={M} x2={M} y2={H - M} stroke="rgba(255,255,255,.1)" strokeWidth={.5} />
          {/* Sum function curve */}
          <path d={curve.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')}
            fill="none" stroke="rgba(234,179,8,.5)" strokeWidth={1.5} />
          {/* Points on number line */}
          {pts.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={H - M + 12} r={6} fill={p.x === medianX ? '#22c55e' : '#3b9eff'}
                stroke="#fff" strokeWidth={1.5}
                style={{cursor:'ew-resize'}}
                onPointerDown={() => setDrag(i)}
                onPointerMove={(e) => {
                  if (dragIdx === i) {
                    const rect = e.currentTarget.parentElement?.parentElement?.getBoundingClientRect()
                    if (!rect) return
                    const newX = Math.max(M + 4, Math.min(W - M - 4, e.clientX - rect.left))
                    setPts(prev => prev.map((pt, j) => j === i ? { x: newX } : pt))
                  }
                }}
                onPointerUp={() => setDrag(null)}
              />
              <text x={p.x} y={H - M + 24} fill="#c8cad6" fontSize={7} fontFamily="monospace" textAnchor="middle">{Math.round(p.x * 16 / (W - M * 2))}</text>
            </g>
          ))}
          {/* Median marker */}
          <line x1={medianX} y1={H - M} x2={medianX} y2={M} stroke="#22c55e" strokeWidth={1} strokeDasharray="4,3" opacity={.6} />
          <rect x={medianX - 2} y={M - 4} width={4} height={4} rx={1} fill="#22c55e" />
          <text x={medianX} y={M - 10} fill="#22c55e" fontSize={8} fontFamily="monospace" fontWeight={600} textAnchor="middle">median</text>
          {/* Y-axis label */}
          <text x={M} y={H - M + 40} fill="#7d8299" fontSize={7} fontFamily="monospace" textAnchor="middle">x (drags)</text>
          <text x={M - 8} y={M + 10} fill="#7d8299" fontSize={7} fontFamily="monospace" textAnchor="middle" transform={`rotate(-90,${M - 8},${M + 10})`}>total dist (↓)</text>
        </svg>
        <div style={{display:'flex',flexDirection:'column',gap:'.5rem',minWidth:180}}>
          <div style={{padding:'.5rem .75rem',borderRadius:8,background:'rgba(34,197,94,.08)',border:'1px solid rgba(34,197,94,.2)'}}>
            <div style={{color:'#22c55e',fontSize:10,fontFamily:'monospace',fontWeight:600}}>Minimum total distance</div>
            <div style={{color:'#fff',fontSize:16,fontFamily:'monospace',fontWeight:700,marginTop:2}}>{sumFn(medianX).toFixed(0)}</div>
            <div style={{color:'#c8cad6',fontSize:9,fontFamily:'monospace',marginTop:4}}>Median = {Math.round(medianX * 16 / (W - M * 2))}</div>
          </div>
          <div style={{padding:'.5rem .75rem',borderRadius:8,background:'rgba(234,179,8,.08)',border:'1px solid rgba(234,179,8,.2)'}}>
            <div style={{color:'#eab308',fontSize:9,fontFamily:'monospace',fontWeight:600}}>Compare with Mean</div>
            <div style={{color:'#c8cad6',fontSize:9,fontFamily:'monospace',marginTop:2}}>
              Mean = {Math.round(pts.reduce((s, p) => s + p.x, 0) / pts.length * 16 / (W - M * 2))}
              {' | '}Sum = {sumFn(pts.reduce((s, p) => s + p.x, 0) / pts.length).toFixed(0)}
            </div>
          </div>
          <div style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>Drag any point along the number line. The yellow curve shows total Manhattan distance for each candidate center point.</div>
        </div>
      </div>
    </div>
  )
}

/* ── Distance Transform (Chebyshev ↔ Manhattan) ─── */

export function DistanceTransform() {
  const S = 220, M = 25, G = S + M * 2
  const [px, setPx] = useState(70)
  const [py, setPy] = useState(60)
  const [mode, setMode] = useState<'xy' | 'uv'>('xy')
  const u = px + py, v = px - py
  const sx = (v: number) => M + v * S / 260
  const sy = (v: number) => M + S - v * S / 200
  const axisMax = 130

  return (
    <div className="gb-interactive">
      <div className="gb-interactive-header">
        <span className="gb-interactive-icon">{'\u27F3'}</span>
        <span className="gb-interactive-title">Distance Transform — See how 45° rotation maps Manhattan ↔ Chebyshev</span>
      </div>
      <div className="gb-interactive-body" style={{display:'flex',gap:'1.5rem',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
        <div style={{display:'flex',flexDirection:'column',gap:'.5rem'}}>
          <div style={{display:'flex',gap:'.5rem',justifyContent:'center'}}>
            <button onClick={()=>setMode('xy')} style={{
              padding:'.3rem .75rem',borderRadius:6,border:'1px solid',
              borderColor:mode==='xy'?'#3b9eff':'rgba(255,255,255,.12)',
              background:mode==='xy'?'rgba(59,158,255,.12)':'transparent',
              color:mode==='xy'?'#3b9eff':'#c8cad6',
              fontSize:10,fontFamily:'monospace',fontWeight:600,cursor:'pointer'
            }}>(x, y) Space</button>
            <button onClick={()=>setMode('uv')} style={{
              padding:'.3rem .75rem',borderRadius:6,border:'1px solid',
              borderColor:mode==='uv'?'#22c55e':'rgba(255,255,255,.12)',
              background:mode==='uv'?'rgba(34,197,94,.12)':'transparent',
              color:mode==='uv'?'#22c55e':'#c8cad6',
              fontSize:10,fontFamily:'monospace',fontWeight:600,cursor:'pointer'
            }}>(u, v) Space</button>
          </div>
          <svg viewBox={`0 0 ${G} ${G}`} style={{maxWidth:G,height:'auto'}} className="gb-interactive-svg" role="img" aria-label="Distance transform">
            <rect x={M} y={M} width={S} height={S} rx={8} fill="rgba(16,18,31,.4)" stroke="rgba(255,255,255,.06)" strokeWidth={1} />
            {Array.from({length:8},(_,i)=><g key={`g${i}`}>
              <line x1={M+i*S/8} y1={M} x2={M+i*S/8} y2={M+S} stroke="rgba(255,255,255,.04)" strokeWidth={.5}/>
              <line x1={M} y1={M+i*S/8} x2={M+S} y2={M+i*S/8} stroke="rgba(255,255,255,.04)" strokeWidth={.5}/>
            </g>)}
            {mode === 'xy' ? (
              <>
                <line x1={sx(0)} y1={sy(0)} x2={sx(axisMax)} y2={sy(0)} stroke="rgba(255,255,255,.15)" strokeWidth={.5}/>
                <line x1={sx(0)} y1={sy(0)} x2={sx(0)} y2={sy(axisMax)} stroke="rgba(255,255,255,.15)" strokeWidth={.5}/>
                <text x={sx(axisMax-10)} y={sy(0)+12} fill="#7d8299" fontSize={6} fontFamily="monospace">x</text>
                <text x={sx(0)-10} y={sy(axisMax-10)} fill="#7d8299" fontSize={6} fontFamily="monospace">y</text>
                <circle cx={sx(px)} cy={sy(py)} r={5} fill="#3b9eff" stroke="#fff" strokeWidth={1.5} />
                <text x={sx(px)+8} y={sy(py)-8} fill="#3b9eff" fontSize={7} fontFamily="monospace" fontWeight={600}>
                  P({px},{py})
                </text>
              </>
            ) : (
              <>
                <line x1={sx(0)} y1={sy(0)} x2={sx(axisMax+axisMax)} y2={sy(0)} stroke="rgba(255,255,255,.15)" strokeWidth={.5}/>
                <line x1={sx(0)} y1={sy(0)} x2={sx(0)} y2={sy(axisMax+axisMax)} stroke="rgba(255,255,255,.15)" strokeWidth={.5}/>
                <text x={sx(u+axisMax)} y={sy(0)+12} fill="#7d8299" fontSize={6} fontFamily="monospace">u</text>
                <text x={sx(0)-10} y={sy(v+axisMax)} fill="#7d8299" fontSize={6} fontFamily="monospace">v</text>
                {/* Show original diagonal reference */}
                <line x1={sx(0)} y1={sy(260)} x2={sx(260)} y2={sy(0)}
                  stroke="rgba(59,158,255,.1)" strokeWidth={1} strokeDasharray="4,3" />
                <circle cx={sx(u/2+65)} cy={sy(v/2+65)} r={5} fill="#22c55e" stroke="#fff" strokeWidth={1.5} />
                <text x={sx(u/2+65)+8} y={sy(v/2+65)-8} fill="#22c55e" fontSize={7} fontFamily="monospace" fontWeight={600}>
                  P'({u},{v})
                </text>
              </>
            )}
          </svg>
          <div style={{display:'flex',gap:'.75rem',justifyContent:'center'}}>
            <div style={{padding:'.25rem .5rem',borderRadius:6,background:'rgba(59,158,255,.08)',border:'1px solid rgba(59,158,255,.2)'}}>
              <div style={{color:'#3b9eff',fontSize:8,fontFamily:'monospace',fontWeight:600}}>(x,y)</div>
              <div style={{color:'#fff',fontSize:10,fontFamily:'monospace'}}>({px},{py})</div>
            </div>
            <div style={{color:'#c8cad6',fontSize:14,fontFamily:'monospace',alignSelf:'center'}}>{'\u2192'}</div>
            <div style={{padding:'.25rem .5rem',borderRadius:6,background:'rgba(34,197,94,.08)',border:'1px solid rgba(34,197,94,.2)'}}>
              <div style={{color:'#22c55e',fontSize:8,fontFamily:'monospace',fontWeight:600}}>(u,v)</div>
              <div style={{color:'#fff',fontSize:10,fontFamily:'monospace'}}>({u},{v})</div>
            </div>
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'.5rem',minWidth:160}}>
          <div style={{padding:'.5rem .75rem',borderRadius:8,background:'rgba(59,158,255,.08)',border:'1px solid rgba(59,158,255,.2)'}}>
            <div style={{color:'#eab308',fontSize:9,fontFamily:'monospace',fontWeight:600,marginBottom:4}}>Transformation</div>
            <div style={{color:'#c8cad6',fontSize:9,fontFamily:'monospace'}}>u = x + y = {u}</div>
            <div style={{color:'#c8cad6',fontSize:9,fontFamily:'monospace'}}>v = x - y = {v}</div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'.25rem'}}>
            <label style={{color:'#c8cad6',fontSize:10,fontFamily:'monospace',fontWeight:600}}>x: {px}</label>
            <input type="range" min={10} max={200} value={px} onChange={e=>setPx(Number(e.target.value))} style={{accentColor:'#3b9eff'}}/>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'.25rem'}}>
            <label style={{color:'#c8cad6',fontSize:10,fontFamily:'monospace',fontWeight:600}}>y: {py}</label>
            <input type="range" min={10} max={160} value={py} onChange={e=>setPy(Number(e.target.value))} style={{accentColor:'#3b9eff'}}/>
          </div>
          <div style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>
            Toggle between (x,y) and (u,v) space. The transform rotates the coordinate system by 45°.
          </div>
        </div>
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

/* ── Triangle Inequality Explorer ────────────────── */

export function TriangleInequalityExplorer() {
  const S = 240, M = 20, G = S + M * 2
  const [sides, setSides] = useState({ a: 40, b: 60, c: 50 })
  const update = (k: 'a'|'b'|'c', v: number) => setSides(p=>({...p,[k]:v}))
  const {a,b,c} = sides
  const valid = a + b > c && a + c > b && b + c > a
  const ax = 100, ay = 160
  const bx = 100 + a * 120 / 100, by = 160
  const cx = 100 + (a*a + c*c - b*b) / (2*a) * 120 / 100
  const cy = 160 - Math.sqrt(Math.max(0, c*c - ((a*a + c*c - b*b)/(2*a))**2)) * 120 / 100
  const sx = (v: number) => M + v * S / 240
  const sy = (v: number) => M + S - v * S / 200

  return (
    <div className="gb-interactive">
      <div className="gb-interactive-header">
        <span className="gb-interactive-icon">{'\u25B3'}</span>
        <span className="gb-interactive-title">Triangle Inequality — Adjust side lengths to see valid triangles</span>
      </div>
      <div className="gb-interactive-body" style={{display:'flex',gap:'1.5rem',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
        <svg viewBox={`0 0 ${G} ${G}`} style={{maxWidth:G,height:'auto'}} className="gb-interactive-svg" role="img" aria-label="Triangle inequality explorer">
          <rect x={M} y={M} width={S} height={S} rx={8} fill="rgba(16,18,31,.4)" stroke="rgba(255,255,255,.06)" strokeWidth={1} />
          {isFinite(cx) && isFinite(cy) && (
            <polygon points={`${sx(ax)},${sy(ay)} ${sx(bx)},${sy(by)} ${sx(cx)},${sy(cy)}`}
              fill={valid?'rgba(34,197,94,.12)':'rgba(239,68,68,.08)'} stroke={valid?'#22c55e':'#ef4444'} strokeWidth={1.5} />
          )}
          <circle cx={sx(ax)} cy={sy(ay)} r={3} fill="#3b9eff" />
          <text x={sx(ax)+4} y={sy(ay)-4} fill="#3b9eff" fontSize={7} fontFamily="monospace">a={a}</text>
          <circle cx={sx(bx)} cy={sy(by)} r={3} fill="#22c55e" />
          <text x={sx(bx)-20} y={sy(by)-4} fill="#22c55e" fontSize={7} fontFamily="monospace">b={b}</text>
          {isFinite(cx) && isFinite(cy) && (
            <>
              <circle cx={sx(cx)} cy={sy(cy)} r={3} fill="#eab308" />
              <text x={sx(cx)+4} y={sy(cy)-4} fill="#eab308" fontSize={7} fontFamily="monospace">c={c}</text>
            </>
          )}
        </svg>
        <div style={{display:'flex',flexDirection:'column',gap:'.5rem',minWidth:180}}>
          <div style={{padding:'.5rem .75rem',borderRadius:6,border:'1px solid',borderColor:valid?'rgba(34,197,94,.4)':'rgba(239,68,68,.4)',background:valid?'rgba(34,197,94,.08)':'rgba(239,68,68,.08)'}}>
            <div style={{color:valid?'#22c55e':'#ef4444',fontSize:11,fontFamily:'monospace',fontWeight:700}}>{valid?'Valid Triangle':'Invalid'}</div>
          </div>
          {['a','b','c'].map(k => (
            <div key={k} style={{display:'flex',flexDirection:'column',gap:'.25rem'}}>
              <label style={{color:{a:'#3b9eff',b:'#22c55e',c:'#eab308'}[k as keyof typeof sides],fontSize:10,fontFamily:'monospace',fontWeight:600}}>Side {k.toUpperCase()}: {sides[k as keyof typeof sides]}</label>
              <input type="range" min={10} max={100} value={sides[k as keyof typeof sides]} onChange={e=>update(k as 'a'|'b'|'c', Number(e.target.value))} style={{width:'100%',accentColor:{a:'#3b9eff',b:'#22c55e',c:'#eab308'}[k as keyof typeof sides]}}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Triangle Type Explorer ──────────────────────── */

export function TriangleTypeExplorer() {
  const S = 240, M = 20, G = S + M * 2
  const [a, setA] = useState({ x: 60, y: 140 })
  const [b, setB] = useState({ x: 140, y: 140 })
  const [c, setC] = useState({ x: 100, y: 40 })
  const dAB2 = (a.x-b.x)**2+(a.y-b.y)**2, dAB = Math.sqrt(dAB2)
  const dBC2 = (b.x-c.x)**2+(b.y-c.y)**2, dBC = Math.sqrt(dBC2)
  const dCA2 = (c.x-a.x)**2+(c.y-a.y)**2, dCA = Math.sqrt(dCA2)
  const eps = 0.5
  const eq = Math.abs(dAB-dBC)<eps&&Math.abs(dBC-dCA)<eps?'Equilateral':Math.abs(dAB-dBC)<eps||Math.abs(dBC-dCA)<eps||Math.abs(dCA-dAB)<eps?'Isosceles':'Scalene'
  const sides = [dAB2,dBC2,dCA2].sort((a,b)=>a-b)
  const ang = sides[0]+sides[1]-sides[2]
  const acute = ang>eps?'Acute':ang<-eps?'Obtuse':'Right'
  const sx = (v:number)=>M+v*S/200, sy=(v:number)=>M+S-v*S/180

  return (
    <div className="gb-interactive">
      <div className="gb-interactive-header">
        <span className="gb-interactive-icon">{'\u25B3'}</span>
        <span className="gb-interactive-title">Triangle Type Explorer — Drag vertices to see side-based and angle-based classification</span>
      </div>
      <div className="gb-interactive-body" style={{display:'flex',gap:'1.5rem',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
        <svg viewBox={`0 0 ${G} ${G}`} style={{maxWidth:G,height:'auto'}} className="gb-interactive-svg" role="img" aria-label="Triangle type explorer">
          <rect x={M} y={M} width={S} height={S} rx={8} fill="rgba(16,18,31,.4)" stroke="rgba(255,255,255,.06)" strokeWidth={1} />
          {Array.from({length:10},(_,i)=><g key={`g${i}`}>
            <line x1={M+i*S/10} y1={M} x2={M+i*S/10} y2={M+S} stroke="rgba(255,255,255,.04)" strokeWidth={.5}/>
            <line x1={M} y1={M+i*S/10} x2={M+S} y2={M+i*S/10} stroke="rgba(255,255,255,.04)" strokeWidth={.5}/>
          </g>)}
          <polygon points={`${sx(a.x)},${sy(a.y)} ${sx(b.x)},${sy(b.y)} ${sx(c.x)},${sy(c.y)}`}
            fill="rgba(59,158,255,.1)" stroke="#3b9eff" strokeWidth={1.5} />
          <circle cx={sx(a.x)} cy={sy(a.y)} r={5} fill="#22c55e" stroke="#fff" strokeWidth={1.5} />
          <text x={sx(a.x)+7} y={sy(a.y)-7} fill="#22c55e" fontSize={7} fontFamily="monospace" fontWeight={600}>A</text>
          <circle cx={sx(b.x)} cy={sy(b.y)} r={5} fill="#3b9eff" stroke="#fff" strokeWidth={1.5} />
          <text x={sx(b.x)+7} y={sy(b.y)-7} fill="#3b9eff" fontSize={7} fontFamily="monospace" fontWeight={600}>B</text>
          <circle cx={sx(c.x)} cy={sy(c.y)} r={5} fill="#eab308" stroke="#fff" strokeWidth={1.5} />
          <text x={sx(c.x)+7} y={sy(c.y)-7} fill="#eab308" fontSize={7} fontFamily="monospace" fontWeight={600}>C</text>
        </svg>
        <div style={{display:'flex',flexDirection:'column',gap:'.5rem',minWidth:180}}>
          <div style={{padding:'.5rem .75rem',borderRadius:8,background:'rgba(59,158,255,.08)',border:'1px solid rgba(59,158,255,.2)'}}>
            <div style={{color:'#3b9eff',fontSize:10,fontFamily:'monospace',fontWeight:600,marginBottom:6}}>By Sides</div>
            <div style={{color:'#fff',fontSize:16,fontFamily:'monospace',fontWeight:700}}>{eq}</div>
          </div>
          <div style={{padding:'.5rem .75rem',borderRadius:8,background:'rgba(34,197,94,.08)',border:'1px solid rgba(34,197,94,.2)'}}>
            <div style={{color:'#22c55e',fontSize:10,fontFamily:'monospace',fontWeight:600,marginBottom:6}}>By Angles</div>
            <div style={{color:'#fff',fontSize:16,fontFamily:'monospace',fontWeight:700}}>{acute}</div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'.25rem'}}>
            <label style={{color:'#22c55e',fontSize:9,fontFamily:'monospace',fontWeight:600}}>A</label>
            <div style={{display:'flex',gap:'.5rem'}}>
              <div style={{flex:1}}><label style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>x</label><input type="range" min={10} max={190} value={a.x} onChange={e=>setA(p=>({...p,x:Number(e.target.value)}))} style={{width:'100%',accentColor:'#22c55e'}}/></div>
              <div style={{flex:1}}><label style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>y</label><input type="range" min={10} max={170} value={a.y} onChange={e=>setA(p=>({...p,y:Number(e.target.value)}))} style={{width:'100%',accentColor:'#22c55e'}}/></div>
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'.25rem'}}>
            <label style={{color:'#3b9eff',fontSize:9,fontFamily:'monospace',fontWeight:600}}>B</label>
            <div style={{display:'flex',gap:'.5rem'}}>
              <div style={{flex:1}}><label style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>x</label><input type="range" min={10} max={190} value={b.x} onChange={e=>setB(p=>({...p,x:Number(e.target.value)}))} style={{width:'100%',accentColor:'#3b9eff'}}/></div>
              <div style={{flex:1}}><label style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>y</label><input type="range" min={10} max={170} value={b.y} onChange={e=>setB(p=>({...p,y:Number(e.target.value)}))} style={{width:'100%',accentColor:'#3b9eff'}}/></div>
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'.25rem'}}>
            <label style={{color:'#eab308',fontSize:9,fontFamily:'monospace',fontWeight:600}}>C</label>
            <div style={{display:'flex',gap:'.5rem'}}>
              <div style={{flex:1}}><label style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>x</label><input type="range" min={10} max={190} value={c.x} onChange={e=>setC(p=>({...p,x:Number(e.target.value)}))} style={{width:'100%',accentColor:'#eab308'}}/></div>
              <div style={{flex:1}}><label style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>y</label><input type="range" min={10} max={170} value={c.y} onChange={e=>setC(p=>({...p,y:Number(e.target.value)}))} style={{width:'100%',accentColor:'#eab308'}}/></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Triangle Area Explorer ──────────────────────── */

export function TriangleAreaExplorer() {
  const S = 240, M = 20, G = S + M * 2
  const [a, setA] = useState({ x: 30, y: 140 })
  const [b, setB] = useState({ x: 160, y: 150 })
  const [c, setC] = useState({ x: 100, y: 30 })
  const area = Math.abs(a.x*(b.y-c.y) + b.x*(c.y-a.y) + c.x*(a.y-b.y)) / 2
  const sx = (v:number)=>M+v*S/200, sy=(v:number)=>M+S-v*S/180

  return (
    <div className="gb-interactive">
      <div className="gb-interactive-header">
        <span className="gb-interactive-icon">{'\u25B3'}</span>
        <span className="gb-interactive-title">Triangle Area Explorer — Drag vertices to see area computation in real-time</span>
      </div>
      <div className="gb-interactive-body" style={{display:'flex',gap:'1.5rem',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
        <svg viewBox={`0 0 ${G} ${G}`} style={{maxWidth:G,height:'auto'}} className="gb-interactive-svg" role="img" aria-label="Triangle area explorer">
          <rect x={M} y={M} width={S} height={S} rx={8} fill="rgba(16,18,31,.4)" stroke="rgba(255,255,255,.06)" strokeWidth={1} />
          {Array.from({length:10},(_,i)=><g key={`g${i}`}>
            <line x1={M+i*S/10} y1={M} x2={M+i*S/10} y2={M+S} stroke="rgba(255,255,255,.04)" strokeWidth={.5}/>
            <line x1={M} y1={M+i*S/10} x2={M+S} y2={M+i*S/10} stroke="rgba(255,255,255,.04)" strokeWidth={.5}/>
          </g>)}
          <polygon points={`${sx(a.x)},${sy(a.y)} ${sx(b.x)},${sy(b.y)} ${sx(c.x)},${sy(c.y)}`}
            fill="rgba(59,158,255,.1)" stroke="#3b9eff" strokeWidth={1.5} />
          <circle cx={sx(a.x)} cy={sy(a.y)} r={5} fill="#22c55e" stroke="#fff" strokeWidth={1.5} />
          <text x={sx(a.x)+7} y={sy(a.y)-7} fill="#22c55e" fontSize={7} fontFamily="monospace" fontWeight={600}>A</text>
          <circle cx={sx(b.x)} cy={sy(b.y)} r={5} fill="#3b9eff" stroke="#fff" strokeWidth={1.5} />
          <text x={sx(b.x)+7} y={sy(b.y)-7} fill="#3b9eff" fontSize={7} fontFamily="monospace" fontWeight={600}>B</text>
          <circle cx={sx(c.x)} cy={sy(c.y)} r={5} fill="#eab308" stroke="#fff" strokeWidth={1.5} />
          <text x={sx(c.x)+7} y={sy(c.y)-7} fill="#eab308" fontSize={7} fontFamily="monospace" fontWeight={600}>C</text>
        </svg>
        <div style={{padding:'.75rem',borderRadius:8,background:'rgba(59,158,255,.08)',border:'1px solid rgba(59,158,255,.2)',minWidth:160}}>
          <div style={{color:'#3b9eff',fontSize:10,fontFamily:'monospace',fontWeight:600}}>Shoelace Area</div>
          <div style={{color:'#fff',fontSize:20,fontFamily:'monospace',fontWeight:700,marginTop:4}}>{area.toFixed(1)}</div>
          <div style={{color:'#7d8299',fontSize:8,fontFamily:'monospace',marginTop:4}}>A = \u00BD|x\u2081(y\u2082\u2212y\u2083) + x\u2082(y\u2083\u2212y\u2081) + x\u2083(y\u2081\u2212y\u2082)|</div>
        </div>
      </div>
    </div>
  )
}

/* ── Pythagorean Explorer ────────────────────────── */

export function PythagoreanExplorer() {
  const S = 240, M = 20, G = S + M * 2
  const [legA, setLegA] = useState(3)
  const [legB, setLegB] = useState(4)
  const hyp = Math.sqrt(legA * legA + legB * legB)
  const sx = (v: number) => M + v * S / 180
  const sy = (v: number) => M + S - v * S / 140

  return (
    <div className="gb-interactive">
      <div className="gb-interactive-header">
        <span className="gb-interactive-icon">{'\u25B3'}</span>
        <span className="gb-interactive-title">Pythagorean Explorer — Adjust legs to see the right triangle relationship</span>
      </div>
      <div className="gb-interactive-body" style={{display:'flex',gap:'1.5rem',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
        <svg viewBox={`0 0 ${G} ${G}`} style={{maxWidth:G,height:'auto'}} className="gb-interactive-svg" role="img" aria-label="Pythagorean explorer">
          <rect x={M} y={M} width={S} height={S} rx={8} fill="rgba(16,18,31,.4)" stroke="rgba(255,255,255,.06)" strokeWidth={1} />
          {Array.from({length:10},(_,i)=><g key={`g${i}`}>
            <line x1={M+i*S/10} y1={M} x2={M+i*S/10} y2={M+S} stroke="rgba(255,255,255,.04)" strokeWidth={.5}/>
            <line x1={M} y1={M+i*S/10} x2={M+S} y2={M+i*S/10} stroke="rgba(255,255,255,.04)" strokeWidth={.5}/>
          </g>)}
          <polygon points={`${sx(15)},${sy(120)} ${sx(15+legA*120/legB)},${sy(120)} ${sx(15)},${sy(120-hyp*120/hyp)}`}
            fill="rgba(59,158,255,.12)" stroke="#3b9eff" strokeWidth={1.5} />
          <text x={sx(15+legA*60/legB)} y={sy(125)} fill="#22c55e" fontSize={8} fontFamily="monospace" textAnchor="middle">a={legA}</text>
          <text x={sx(8)} y={sy(120-hyp*60/hyp)} fill="#eab308" fontSize={8} fontFamily="monospace" textAnchor="middle">b={legB}</text>
          <text x={sx(15+legA*60/legB)} y={sy(120-hyp*60/hyp)} fill="#fff" fontSize={7} fontFamily="monospace">{'c='}{hyp.toFixed(2)}</text>
          <rect x={sx(15)} y={sy(120)} width={12} height={12} fill="rgba(59,158,255,.3)" stroke="#3b9eff" strokeWidth={1} />
        </svg>
        <div style={{display:'flex',flexDirection:'column',gap:'.5rem',minWidth:180}}>
          <div style={{padding:'.75rem',borderRadius:8,background:'rgba(59,158,255,.08)',border:'1px solid rgba(59,158,255,.2)'}}>
            <div style={{color:'#3b9eff',fontSize:10,fontFamily:'monospace',fontWeight:600,marginBottom:4}}>a\u00B2 + b\u00B2 = c\u00B2</div>
            <div style={{color:'#fff',fontSize:13,fontFamily:'monospace'}}>{legA}\u00B2 + {legB}\u00B2 = {hyp.toFixed(2)}\u00B2</div>
            <div style={{color:'#c8cad6',fontSize:11,fontFamily:'monospace',marginTop:4}}>{legA*legA} + {legB*legB} = {(legA*legA+legB*legB).toFixed(0)}</div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'.25rem'}}>
            <label style={{color:'#c8cad6',fontSize:10,fontFamily:'monospace',fontWeight:600}}>Leg a: {legA}</label>
            <input type="range" min={1} max={12} step={0.1} value={legA} onChange={e=>setLegA(Number(e.target.value))} style={{accentColor:'#22c55e'}}/>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'.25rem'}}>
            <label style={{color:'#c8cad6',fontSize:10,fontFamily:'monospace',fontWeight:600}}>Leg b: {legB}</label>
            <input type="range" min={1} max={12} step={0.1} value={legB} onChange={e=>setLegB(Number(e.target.value))} style={{accentColor:'#eab308'}}/>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Special Right Triangles ─────────────────────── */

export function SpecialRightTriangles() {
  const S = 240, M = 20, G = S + M * 2
  const [mode, setMode] = useState<'45'|'3060'>('45')
  const [scale, setScale] = useState(1)
  const legColor = '#22c55e', hypColor = '#3b9eff'
  const p = {ax: M+40, ay: M+S-40, bx: M+40, by: M+40, cx: mode==='45'?M+40+80*scale:M+40+173*scale, cy: mode==='45'?M+S-40:M+40+100*scale}

  return (
    <div className="gb-interactive">
      <div className="gb-interactive-header">
        <span className="gb-interactive-icon">{'\u25B3'}</span>
        <span className="gb-interactive-title">Special Right Triangles — Explore 45-45-90 and 30-60-90 ratios</span>
      </div>
      <div className="gb-interactive-body" style={{display:'flex',gap:'1.5rem',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
        <svg viewBox={`0 0 ${G} ${G}`} style={{maxWidth:G,height:'auto'}} className="gb-interactive-svg" role="img" aria-label="Special right triangles">
          <rect x={M} y={M} width={S} height={S} rx={8} fill="rgba(16,18,31,.4)" stroke="rgba(255,255,255,.06)" strokeWidth={1} />
          <polygon points={`${p.ax},${p.ay} ${p.bx},${p.by} ${p.cx},${p.cy}`}
            fill="rgba(59,158,255,.08)" stroke={hypColor} strokeWidth={1.5} />
          <line x1={p.ax} y1={p.ay} x2={p.bx} y2={p.by} stroke={legColor} strokeWidth={1} strokeDasharray="4,3" />
          <line x1={p.bx} y1={p.by} x2={p.cx} y2={p.cy} stroke={legColor} strokeWidth={1} strokeDasharray="4,3" />
          <circle cx={p.ax} cy={p.ay} r={3} fill="#c8cad6" />
          <circle cx={p.bx} cy={p.by} r={3} fill="#c8cad6" />
          <circle cx={p.cx} cy={p.cy} r={3} fill="#c8cad6" />
          {mode==='45'&&<>
            <text x={(p.ax+p.bx)/2-12} y={(p.ay+p.by)/2-4} fill={legColor} fontSize={8} fontFamily="monospace">{scale.toFixed(1)}</text>
            <text x={(p.bx+p.cx)/2-4} y={(p.by+p.cy)/2-8} fill={legColor} fontSize={8} fontFamily="monospace">{scale.toFixed(1)}</text>
            <text x={(p.ax+p.cx)/2+4} y={(p.ay+p.cy)/2-4} fill={hypColor} fontSize={8} fontFamily="monospace">{(scale*Math.SQRT2).toFixed(2)}</text>
          </>}
          {mode==='3060'&&<>
            <text x={(p.ax+p.bx)/2-12} y={(p.ay+p.by)/2-4} fill={legColor} fontSize={8} fontFamily="monospace">{scale.toFixed(1)}</text>
            <text x={(p.bx+p.cx)/2-4} y={(p.by+p.cy)/2-8} fill={legColor} fontSize={8} fontFamily="monospace">{(scale*Math.sqrt(3)).toFixed(2)}</text>
            <text x={(p.ax+p.cx)/2+4} y={(p.ay+p.cy)/2-4} fill={hypColor} fontSize={8} fontFamily="monospace">{(scale*2).toFixed(1)}</text>
          </>}
        </svg>
        <div style={{display:'flex',flexDirection:'column',gap:'.75rem',minWidth:180}}>
          <div style={{display:'flex',gap:'.5rem'}}>
            <button onClick={()=>setMode('45')} style={{
              flex:1,padding:'.4rem .75rem',borderRadius:6,border:'1px solid',
              borderColor:mode==='45'?'#3b9eff':'rgba(255,255,255,.12)',
              background:mode==='45'?'rgba(59,158,255,.12)':'transparent',
              color:mode==='45'?'#3b9eff':'#c8cad6',
              fontSize:10,fontFamily:'monospace',fontWeight:600,cursor:'pointer'
            }}>45-45-90</button>
            <button onClick={()=>setMode('3060')} style={{
              flex:1,padding:'.4rem .75rem',borderRadius:6,border:'1px solid',
              borderColor:mode==='3060'?'#3b9eff':'rgba(255,255,255,.12)',
              background:mode==='3060'?'rgba(59,158,255,.12)':'transparent',
              color:mode==='3060'?'#3b9eff':'#c8cad6',
              fontSize:10,fontFamily:'monospace',fontWeight:600,cursor:'pointer'
            }}>30-60-90</button>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'.25rem'}}>
            <label style={{color:'#c8cad6',fontSize:10,fontFamily:'monospace',fontWeight:600}}>Scale: {scale.toFixed(1)}</label>
            <input type="range" min={0.5} max={2.5} step={0.1} value={scale} onChange={e=>setScale(Number(e.target.value))} style={{accentColor:'#3b9eff'}}/>
          </div>
          <div style={{marginTop:'.25rem',padding:'.75rem',borderRadius:8,background:'rgba(59,158,255,.08)',border:'1px solid rgba(59,158,255,.2)'}}>
            <div style={{color:'#3b9eff',fontSize:10,fontFamily:'monospace',fontWeight:600,marginBottom:6}}>Side Ratios</div>
            {mode === '45' ? (
              <>
                <div style={{color:'#c8cad6',fontSize:9,fontFamily:'monospace'}}>a : a : a\u221A2</div>
                <div style={{color:'#c8cad6',fontSize:9,fontFamily:'monospace',marginTop:2}}>leg : leg : hypotenuse</div>
              </>
            ) : (
              <>
                <div style={{color:'#c8cad6',fontSize:9,fontFamily:'monospace'}}>a : a\u221A3 : 2a</div>
                <div style={{color:'#c8cad6',fontSize:9,fontFamily:'monospace',marginTop:2}}>short : long : hypotenuse</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


export function RectangleOverlap() {
  const S = 260, M = 20, G = S + M * 2
  const [r1, setR1] = useState({ x1: 30, y1: 30, x2: 110, y2: 110 })
  const [r2, setR2] = useState({ x1: 80, y1: 70, x2: 160, y2: 150 })
  const sceneW = 200, sceneH = 200
  const overlapX = Math.max(0, Math.min(r1.x2, r2.x2) - Math.max(r1.x1, r2.x1))
  const overlapY = Math.max(0, Math.min(r1.y2, r2.y2) - Math.max(r1.y1, r2.y1))
  const overlaps = overlapX > 0 && overlapY > 0
  const ix1 = Math.max(r1.x1, r2.x1), iy1 = Math.max(r1.y1, r2.y1)
  const ix2 = Math.min(r1.x2, r2.x2), iy2 = Math.min(r1.y2, r2.y2)
  const sx = (v: number) => M + v * S / sceneW
  const sy = (v: number) => M + S - v * S / sceneH

  return (
    <div className="gb-interactive">
      <div className="gb-interactive-header">
        <span className="gb-interactive-icon">{'\u25A1'}</span>
        <span className="gb-interactive-title">Rectangle Overlap — Adjust rectangles to see when they intersect</span>
      </div>
      <div className="gb-interactive-body" style={{display:'flex',gap:'1.5rem',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
        <svg viewBox={`0 0 ${G} ${G}`} style={{maxWidth:G,height:'auto'}} className="gb-interactive-svg" role="img" aria-label="Rectangle overlap explorer">
          <rect x={M} y={M} width={S} height={S} rx={8} fill="rgba(16,18,31,.4)" stroke="rgba(255,255,255,.06)" strokeWidth={1} />
          {Array.from({length:10},(_,i)=><g key={`g${i}`}>
            <line x1={M+i*S/10} y1={M} x2={M+i*S/10} y2={M+S} stroke="rgba(255,255,255,.04)" strokeWidth={.5}/>
            <line x1={M} y1={M+i*S/10} x2={M+S} y2={M+i*S/10} stroke="rgba(255,255,255,.04)" strokeWidth={.5}/>
          </g>)}
          <rect x={sx(r1.x1)} y={sy(r1.y2)} width={sx(r1.x2)-sx(r1.x1)} height={sy(r1.y1)-sy(r1.y2)}
            fill="rgba(59,158,255,.15)" stroke="#3b9eff" strokeWidth={2} rx={2}/>
          <text x={sx((r1.x1+r1.x2)/2)} y={sy((r1.y1+r1.y2)/2)} fill="#3b9eff" fontSize={9} fontFamily="monospace" textAnchor="middle">R1</text>
          <rect x={sx(r2.x1)} y={sy(r2.y2)} width={sx(r2.x2)-sx(r2.x1)} height={sy(r2.y1)-sy(r2.y2)}
            fill="rgba(239,68,68,.15)" stroke="#ef4444" strokeWidth={2} rx={2}/>
          <text x={sx((r2.x1+r2.x2)/2)} y={sy((r2.y1+r2.y2)/2)} fill="#ef4444" fontSize={9} fontFamily="monospace" textAnchor="middle">R2</text>
          {overlaps && (
            <rect x={sx(ix1)} y={sy(iy2)} width={sx(ix2)-sx(ix1)} height={sy(iy1)-sy(iy2)}
              fill="rgba(34,197,94,.35)" stroke="#22c55e" strokeWidth={2} strokeDasharray="4,3" rx={2}/>
          )}
          <text x={sx(r1.x1)+2} y={sy(r1.y1)-4} fill="#3b9eff" fontSize={7} fontFamily="monospace">({r1.x1},{r1.y1})</text>
          <text x={sx(r2.x1)+2} y={sy(r2.y1)-4} fill="#ef4444" fontSize={7} fontFamily="monospace">({r2.x1},{r2.y1})</text>
        </svg>
        <div style={{display:'flex',flexDirection:'column',gap:'.5rem',minWidth:180}}>
          <div style={{padding:'.5rem .75rem',borderRadius:6,border:'1px solid',borderColor:overlaps?'rgba(34,197,94,.4)':'rgba(239,68,68,.4)',background:overlaps?'rgba(34,197,94,.08)':'rgba(239,68,68,.08)'}}>
            <div style={{color:overlaps?'#22c55e':'#ef4444',fontSize:11,fontFamily:'monospace',fontWeight:600}}>
              {overlaps ? 'Overlapping' : 'Not Overlapping'}
            </div>
            {overlaps && <div style={{color:'#c8cad6',fontSize:9,fontFamily:'monospace',marginTop:2}}>Overlap: {overlapX} x {overlapY}</div>}
          </div>
          <div style={{borderTop:'1px solid rgba(255,255,255,.06)',paddingTop:'.5rem'}}>
            <div style={{color:'#3b9eff',fontSize:9,fontFamily:'monospace',fontWeight:600,marginBottom:4}}>Rectangle 1</div>
            <div style={{display:'flex',gap:'.5rem'}}>
              <div style={{flex:1}}><label style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>x1</label>
                <input type="range" min={0} max={180} value={r1.x1} onChange={e=>setR1(p=>({...p,x1:Number(e.target.value)}))} style={{width:'100%',accentColor:'#3b9eff'}}/></div>
              <div style={{flex:1}}><label style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>y1</label>
                <input type="range" min={0} max={180} value={r1.y1} onChange={e=>setR1(p=>({...p,y1:Number(e.target.value)}))} style={{width:'100%',accentColor:'#3b9eff'}}/></div>
            </div>
            <div style={{display:'flex',gap:'.5rem'}}>
              <div style={{flex:1}}><label style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>x2</label>
                <input type="range" min={20} max={200} value={r1.x2} onChange={e=>setR1(p=>({...p,x2:Number(e.target.value)}))} style={{width:'100%',accentColor:'#3b9eff'}}/></div>
              <div style={{flex:1}}><label style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>y2</label>
                <input type="range" min={20} max={200} value={r1.y2} onChange={e=>setR1(p=>({...p,y2:Number(e.target.value)}))} style={{width:'100%',accentColor:'#3b9eff'}}/></div>
            </div>
          </div>
          <div>
            <div style={{color:'#ef4444',fontSize:9,fontFamily:'monospace',fontWeight:600,marginBottom:4}}>Rectangle 2</div>
            <div style={{display:'flex',gap:'.5rem'}}>
              <div style={{flex:1}}><label style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>x1</label>
                <input type="range" min={0} max={180} value={r2.x1} onChange={e=>setR2(p=>({...p,x1:Number(e.target.value)}))} style={{width:'100%',accentColor:'#ef4444'}}/></div>
              <div style={{flex:1}}><label style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>y1</label>
                <input type="range" min={0} max={180} value={r2.y1} onChange={e=>setR2(p=>({...p,y1:Number(e.target.value)}))} style={{width:'100%',accentColor:'#ef4444'}}/></div>
            </div>
            <div style={{display:'flex',gap:'.5rem'}}>
              <div style={{flex:1}}><label style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>x2</label>
                <input type="range" min={20} max={200} value={r2.x2} onChange={e=>setR2(p=>({...p,x2:Number(e.target.value)}))} style={{width:'100%',accentColor:'#ef4444'}}/></div>
              <div style={{flex:1}}><label style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>y2</label>
                <input type="range" min={20} max={200} value={r2.y2} onChange={e=>setR2(p=>({...p,y2:Number(e.target.value)}))} style={{width:'100%',accentColor:'#ef4444'}}/></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Square Counter in Grid ─────────────────────── */



export function CirclePointTest() {
  const S = 240, M = 20, G = S + M * 2
  const [r, setR] = useState(60)
  const [px, setPx] = useState(90)
  const [py, setPy] = useState(70)
  const cx = 130, cy = 90
  const dx = px - cx, dy = py - cy
  const distSq = dx * dx + dy * dy
  const rSq = r * r
  const EPS = 0.5
  const status = distSq < rSq - EPS ? 'Inside' : distSq > rSq + EPS ? 'Outside' : 'On'
  const statusColor = status === 'Inside' ? '#22c55e' : status === 'Outside' ? '#ef4444' : '#eab308'
  const sx = (v: number) => M + v * S / 260
  const sy = (v: number) => M + S - v * S / 200

  return (
    <div className="gb-interactive">
      <div className="gb-interactive-header">
        <span className="gb-interactive-icon">{'\u25CB'}</span>
        <span className="gb-interactive-title">Point-in-Circle Test — Move the point and adjust radius</span>
      </div>
      <div className="gb-interactive-body" style={{display:'flex',gap:'1.5rem',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
        <svg viewBox={`0 0 ${G} ${G}`} style={{maxWidth:G,height:'auto'}} className="gb-interactive-svg" role="img" aria-label="Point in circle test">
          <rect x={M} y={M} width={S} height={S} rx={8} fill="rgba(16,18,31,.4)" stroke="rgba(255,255,255,.06)" strokeWidth={1} />
          {Array.from({length:8},(_,i)=><g key={`g${i}`}>
            <line x1={M+i*S/8} y1={M} x2={M+i*S/8} y2={M+S} stroke="rgba(255,255,255,.04)" strokeWidth={.5}/>
            <line x1={M} y1={M+i*S/8} x2={M+S} y2={M+i*S/8} stroke="rgba(255,255,255,.04)" strokeWidth={.5}/>
          </g>)}
          <circle cx={sx(cx)} cy={sy(cy)} r={r * S / 260} fill="rgba(59,158,255,.08)" stroke="#3b9eff" strokeWidth={1.5} />
          <circle cx={sx(cx)} cy={sy(cy)} r={2.5} fill="#3b9eff" />
          <text x={sx(cx)+4} y={sy(cy)-4} fill="#3b9eff" fontSize={7} fontFamily="monospace">O({cx},{cy})</text>
          <line x1={sx(cx)} y1={sy(cy)} x2={sx(cx+r)} y2={sy(cy)} stroke="#22c55e" strokeWidth={1} strokeDasharray="4,3" />
          <text x={sx(cx+r/2)-6} y={sy(cy)-4} fill="#22c55e" fontSize={7} fontFamily="monospace">r={r}</text>
          <line x1={sx(cx)} y1={sy(cy)} x2={sx(px)} y2={sy(py)} stroke={statusColor} strokeWidth={1} strokeDasharray="3,2" />
          <circle cx={sx(px)} cy={sy(py)} r={4} fill={statusColor} stroke="#fff" strokeWidth={1} />
          <text x={sx(px)+6} y={sy(py)-6} fill={statusColor} fontSize={7} fontFamily="monospace">({px},{py})</text>
          <text x={(sx(cx)+sx(px))/2+4} y={(sy(cy)+sy(py))/2-4} fill="#c8cad6" fontSize={6} fontFamily="monospace">
            {Math.sqrt(distSq).toFixed(1)}
          </text>
        </svg>
        <div style={{display:'flex',flexDirection:'column',gap:'.5rem',minWidth:180}}>
          <div style={{padding:'.5rem .75rem',borderRadius:6,border:'1px solid',borderColor:`${statusColor}66`,background:`${statusColor}14`}}>
            <div style={{color:statusColor,fontSize:12,fontFamily:'monospace',fontWeight:700}}>{status}</div>
            <div style={{color:'#c8cad6',fontSize:9,fontFamily:'monospace',marginTop:2}}>dist² = {distSq} {status==='Inside'?'<':status==='Outside'?'>':'≈'} r² = {rSq}</div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'.25rem'}}>
            <label style={{color:'#c8cad6',fontSize:10,fontFamily:'monospace',fontWeight:600}}>Radius: {r}</label>
            <input type="range" min={20} max={100} value={r} onChange={e=>setR(Number(e.target.value))} style={{accentColor:'#3b9eff'}}/>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'.25rem'}}>
            <label style={{color:'#c8cad6',fontSize:10,fontFamily:'monospace',fontWeight:600}}>Point X: {px}</label>
            <input type="range" min={10} max={250} value={px} onChange={e=>setPx(Number(e.target.value))} style={{accentColor:'#eab308'}}/>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'.25rem'}}>
            <label style={{color:'#c8cad6',fontSize:10,fontFamily:'monospace',fontWeight:600}}>Point Y: {py}</label>
            <input type="range" min={10} max={190} value={py} onChange={e=>setPy(Number(e.target.value))} style={{accentColor:'#eab308'}}/>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Circle-Circle Intersection Explorer ─────────── */



export function CircleIntersection() {
  const S = 240, M = 20, G = S + M * 2
  const [c1, setC1] = useState({ x: 100, y: 100, r: 60 })
  const [c2, setC2] = useState({ x: 160, y: 100, r: 50 })
  const dx = c2.x - c1.x
  const dy = c2.y - c1.y
  const d = Math.sqrt(dx * dx + dy * dy)
  const rSum = c1.r + c2.r
  const rDiff = Math.abs(c1.r - c2.r)
  let status: string, statusColor: string
  if (d > rSum + 0.01) { status = 'Separate'; statusColor = '#ef4444' }
  else if (d > rSum - 0.01) { status = 'Tangent (external)'; statusColor = '#eab308' }
  else if (d < rDiff - 0.01) { status = 'One inside another'; statusColor = '#a855f7' }
  else if (d < rDiff + 0.01) { status = 'Tangent (internal)'; statusColor = '#eab308' }
  else { status = 'Intersecting'; statusColor = '#22c55e' }
  const sx = (v: number) => M + v * S / 260
  const sy = (v: number) => M + S - v * S / 200

  return (
    <div className="gb-interactive">
      <div className="gb-interactive-header">
        <span className="gb-interactive-icon">{'\u25CB'}</span>
        <span className="gb-interactive-title">Circle Intersection — Adjust circles to explore overlap conditions</span>
      </div>
      <div className="gb-interactive-body" style={{display:'flex',gap:'1.5rem',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
        <svg viewBox={`0 0 ${G} ${G}`} style={{maxWidth:G,height:'auto'}} className="gb-interactive-svg" role="img" aria-label="Circle intersection explorer">
          <rect x={M} y={M} width={S} height={S} rx={8} fill="rgba(16,18,31,.4)" stroke="rgba(255,255,255,.06)" strokeWidth={1} />
          {Array.from({length:8},(_,i)=><g key={`g${i}`}>
            <line x1={M+i*S/8} y1={M} x2={M+i*S/8} y2={M+S} stroke="rgba(255,255,255,.04)" strokeWidth={.5}/>
            <line x1={M} y1={M+i*S/8} x2={M+S} y2={M+i*S/8} stroke="rgba(255,255,255,.04)" strokeWidth={.5}/>
          </g>)}
          <circle cx={sx(c1.x)} cy={sy(c1.y)} r={c1.r * S / 260} fill="rgba(59,158,255,.1)" stroke="#3b9eff" strokeWidth={1.5} />
          <circle cx={sx(c1.x)} cy={sy(c1.y)} r={2.5} fill="#3b9eff" />
          <text x={sx(c1.x)+4} y={sy(c1.y)-4} fill="#3b9eff" fontSize={7} fontFamily="monospace">C1</text>
          <circle cx={sx(c2.x)} cy={sy(c2.y)} r={c2.r * S / 260} fill="rgba(239,68,68,.1)" stroke="#ef4444" strokeWidth={1.5} />
          <circle cx={sx(c2.x)} cy={sy(c2.y)} r={2.5} fill="#ef4444" />
          <text x={sx(c2.x)+4} y={sy(c2.y)-4} fill="#ef4444" fontSize={7} fontFamily="monospace">C2</text>
          <line x1={sx(c1.x)} y1={sy(c1.y)} x2={sx(c2.x)} y2={sy(c2.y)} stroke="rgba(255,255,255,.2)" strokeWidth={1} strokeDasharray="4,3" />
          {status === 'Intersecting' && d > 0 && (() => {
            const a = d / 2 + (c1.r*c1.r - c2.r*c2.r) / (2*d)
            const hSq = c1.r*c1.r - a*a
            if (hSq <= 0) return null
            const h = Math.sqrt(hSq)
            const mx = c1.x + a * (c2.x-c1.x)/d
            const my = c1.y + a * (c2.y-c1.y)/d
            const ix1 = mx + h * (c2.y-c1.y)/d, iy1 = my - h * (c2.x-c1.x)/d
            const ix2 = mx - h * (c2.y-c1.y)/d, iy2 = my + h * (c2.x-c1.x)/d
            return <>
              <circle cx={sx(ix1)} cy={sy(iy1)} r={3.5} fill="#22c55e" stroke="#fff" strokeWidth={1} />
              <circle cx={sx(ix2)} cy={sy(iy2)} r={3.5} fill="#22c55e" stroke="#fff" strokeWidth={1} />
            </>
          })()}
        </svg>
        <div style={{display:'flex',flexDirection:'column',gap:'.5rem',minWidth:180}}>
          <div style={{padding:'.5rem .75rem',borderRadius:6,border:'1px solid',borderColor:`${statusColor}66`,background:`${statusColor}14`}}>
            <div style={{color:statusColor,fontSize:11,fontFamily:'monospace',fontWeight:700}}>{status}</div>
            <div style={{color:'#c8cad6',fontSize:9,fontFamily:'monospace',marginTop:2}}>d = {d.toFixed(1)}, r\u2081+r\u2082 = {rSum.toFixed(1)}, |r\u2081\u2212r\u2082| = {rDiff.toFixed(1)}</div>
          </div>
          <div style={{borderTop:'1px solid rgba(255,255,255,.06)',paddingTop:'.5rem'}}>
            <div style={{color:'#3b9eff',fontSize:9,fontFamily:'monospace',fontWeight:600,marginBottom:4}}>Circle 1</div>
            <div style={{display:'flex',gap:'.3rem'}}>
              <div style={{flex:1}}><label style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>cx</label>
                <input type="range" min={30} max={230} value={c1.x} onChange={e=>setC1(p=>({...p,x:Number(e.target.value)}))} style={{width:'100%',accentColor:'#3b9eff'}}/></div>
              <div style={{flex:1}}><label style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>cy</label>
                <input type="range" min={30} max={170} value={c1.y} onChange={e=>setC1(p=>({...p,y:Number(e.target.value)}))} style={{width:'100%',accentColor:'#3b9eff'}}/></div>
            </div>
            <div style={{display:'flex',gap:'.3rem',marginTop:2}}>
              <div style={{flex:1}}><label style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>r\u2081</label>
                <input type="range" min={10} max={100} value={c1.r} onChange={e=>setC1(p=>({...p,r:Number(e.target.value)}))} style={{width:'100%',accentColor:'#3b9eff'}}/></div>
              <div style={{flex:1}} />
            </div>
          </div>
          <div>
            <div style={{color:'#ef4444',fontSize:9,fontFamily:'monospace',fontWeight:600,marginBottom:4}}>Circle 2</div>
            <div style={{display:'flex',gap:'.3rem'}}>
              <div style={{flex:1}}><label style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>cx</label>
                <input type="range" min={30} max={230} value={c2.x} onChange={e=>setC2(p=>({...p,x:Number(e.target.value)}))} style={{width:'100%',accentColor:'#ef4444'}}/></div>
              <div style={{flex:1}}><label style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>cy</label>
                <input type="range" min={30} max={170} value={c2.y} onChange={e=>setC2(p=>({...p,y:Number(e.target.value)}))} style={{width:'100%',accentColor:'#ef4444'}}/></div>
            </div>
            <div style={{display:'flex',gap:'.3rem',marginTop:2}}>
              <div style={{flex:1}}><label style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>r\u2082</label>
                <input type="range" min={10} max={100} value={c2.r} onChange={e=>setC2(p=>({...p,r:Number(e.target.value)}))} style={{width:'100%',accentColor:'#ef4444'}}/></div>
              <div style={{flex:1}} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Distance Explorer ──────────────────────────── */



export function DistanceExplorer() {
  const S = 240, M = 20, G = S + M * 2
  const [p1, setP1] = useState({ x: 40, y: 60 })
  const [p2, setP2] = useState({ x: 180, y: 130 })
  const dx = Math.abs(p2.x - p1.x), dy = Math.abs(p2.y - p1.y)
  const euclidean = Math.sqrt(dx * dx + dy * dy)
  const manhattan = dx + dy
  const chebyshev = Math.max(dx, dy)
  const sx = (v: number) => M + v * S / 200
  const sy = (v: number) => M + S - v * S / 180

  return (
    <div className="gb-interactive">
      <div className="gb-interactive-header">
        <span className="gb-interactive-icon">{'\u2316'}</span>
        <span className="gb-interactive-title">Distance Explorer — Compare Euclidean, Manhattan, and Chebyshev distances</span>
      </div>
      <div className="gb-interactive-body" style={{display:'flex',gap:'1.5rem',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
        <svg viewBox={`0 0 ${G} ${G}`} style={{maxWidth:G,height:'auto'}} className="gb-interactive-svg" role="img" aria-label="Distance explorer">
          <rect x={M} y={M} width={S} height={S} rx={8} fill="rgba(16,18,31,.4)" stroke="rgba(255,255,255,.06)" strokeWidth={1} />
          {Array.from({length:10},(_,i)=><g key={`g${i}`}>
            <line x1={M+i*S/10} y1={M} x2={M+i*S/10} y2={M+S} stroke="rgba(255,255,255,.04)" strokeWidth={.5}/>
            <line x1={M} y1={M+i*S/10} x2={M+S} y2={M+i*S/10} stroke="rgba(255,255,255,.04)" strokeWidth={.5}/>
          </g>)}
          <line x1={sx(p1.x)} y1={sy(p1.y)} x2={sx(p2.x)} y2={sy(p2.y)} stroke="#3b9eff" strokeWidth={1.5} />
          <line x1={sx(p1.x)} y1={sy(p1.y)} x2={sx(p2.x)} y2={sy(p1.y)} stroke="#22c55e" strokeWidth={1} strokeDasharray="4,3" />
          <text x={sx((p1.x+p2.x)/2)} y={sy(p1.y)-6} fill="#22c55e" fontSize={6} fontFamily="monospace" textAnchor="middle">dx={dx}</text>
          <line x1={sx(p2.x)} y1={sy(p1.y)} x2={sx(p2.x)} y2={sy(p2.y)} stroke="#eab308" strokeWidth={1} strokeDasharray="4,3" />
          <text x={sx(p2.x)+4} y={sy((p1.y+p2.y)/2)} fill="#eab308" fontSize={6} fontFamily="monospace">dy={dy}</text>
          <circle cx={sx(p1.x)} cy={sy(p1.y)} r={4} fill="#3b9eff" stroke="#fff" strokeWidth={1} />
          <text x={sx(p1.x)+6} y={sy(p1.y)-6} fill="#3b9eff" fontSize={7} fontFamily="monospace">P1({p1.x},{p1.y})</text>
          <circle cx={sx(p2.x)} cy={sy(p2.y)} r={4} fill="#ef4444" stroke="#fff" strokeWidth={1} />
          <text x={sx(p2.x)+6} y={sy(p2.y)-6} fill="#ef4444" fontSize={7} fontFamily="monospace">P2({p2.x},{p2.y})</text>
        </svg>
        <div style={{display:'flex',flexDirection:'column',gap:'.5rem',minWidth:180}}>
          <div style={{padding:'.5rem .75rem',borderRadius:8,background:'rgba(59,158,255,.08)',border:'1px solid rgba(59,158,255,.2)'}}>
            <div style={{color:'#3b9eff',fontSize:10,fontFamily:'monospace',fontWeight:600,marginBottom:4}}>Euclidean</div>
            <div style={{color:'#fff',fontSize:14,fontFamily:'monospace',fontWeight:700}}>{euclidean.toFixed(2)}</div>
          </div>
          <div style={{padding:'.5rem .75rem',borderRadius:8,background:'rgba(34,197,94,.08)',border:'1px solid rgba(34,197,94,.2)'}}>
            <div style={{color:'#22c55e',fontSize:10,fontFamily:'monospace',fontWeight:600,marginBottom:4}}>Manhattan</div>
            <div style={{color:'#fff',fontSize:14,fontFamily:'monospace',fontWeight:700}}>{manhattan}</div>
          </div>
          <div style={{padding:'.5rem .75rem',borderRadius:8,background:'rgba(234,179,8,.08)',border:'1px solid rgba(234,179,8,.2)'}}>
            <div style={{color:'#eab308',fontSize:10,fontFamily:'monospace',fontWeight:600,marginBottom:4}}>Chebyshev</div>
            <div style={{color:'#fff',fontSize:14,fontFamily:'monospace',fontWeight:700}}>{chebyshev}</div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'.25rem',marginTop:'.25rem'}}>
            <label style={{color:'#3b9eff',fontSize:9,fontFamily:'monospace',fontWeight:600}}>Point 1</label>
            <div style={{display:'flex',gap:'.5rem'}}>
              <div style={{flex:1}}><label style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>x</label>
                <input type="range" min={10} max={190} value={p1.x} onChange={e=>setP1(p=>({...p,x:Number(e.target.value)}))} style={{width:'100%',accentColor:'#3b9eff'}}/></div>
              <div style={{flex:1}}><label style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>y</label>
                <input type="range" min={10} max={170} value={p1.y} onChange={e=>setP1(p=>({...p,y:Number(e.target.value)}))} style={{width:'100%',accentColor:'#3b9eff'}}/></div>
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'.25rem'}}>
            <label style={{color:'#ef4444',fontSize:9,fontFamily:'monospace',fontWeight:600}}>Point 2</label>
            <div style={{display:'flex',gap:'.5rem'}}>
              <div style={{flex:1}}><label style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>x</label>
                <input type="range" min={10} max={190} value={p2.x} onChange={e=>setP2(p=>({...p,x:Number(e.target.value)}))} style={{width:'100%',accentColor:'#ef4444'}}/></div>
              <div style={{flex:1}}><label style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>y</label>
                <input type="range" min={10} max={170} value={p2.y} onChange={e=>setP2(p=>({...p,y:Number(e.target.value)}))} style={{width:'100%',accentColor:'#ef4444'}}/></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Collinearity Checker ───────────────────────── */



export function CollinearityChecker() {
  const S = 240, M = 20, G = S + M * 2
  const [a, setA] = useState({ x: 30, y: 100 })
  const [b, setB] = useState({ x: 100, y: 80 })
  const [c, setC] = useState({ x: 170, y: 60 })
  const cross = a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y)
  const eps = 0.5
  const collinear = Math.abs(cross) < eps
  const area = Math.abs(cross) / 2
  const sx = (v: number) => M + v * S / 200
  const sy = (v: number) => M + S - v * S / 180

  return (
    <div className="gb-interactive">
      <div className="gb-interactive-header">
        <span className="gb-interactive-icon">{'\u22C0'}</span>
        <span className="gb-interactive-title">Collinearity Checker — Drag three points to test if they lie on a line</span>
      </div>
      <div className="gb-interactive-body" style={{display:'flex',gap:'1.5rem',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
        <svg viewBox={`0 0 ${G} ${G}`} style={{maxWidth:G,height:'auto'}} className="gb-interactive-svg" role="img" aria-label="Collinearity checker">
          <rect x={M} y={M} width={S} height={S} rx={8} fill="rgba(16,18,31,.4)" stroke="rgba(255,255,255,.06)" strokeWidth={1} />
          {Array.from({length:10},(_,i)=><g key={`g${i}`}>
            <line x1={M+i*S/10} y1={M} x2={M+i*S/10} y2={M+S} stroke="rgba(255,255,255,.04)" strokeWidth={.5}/>
            <line x1={M} y1={M+i*S/10} x2={M+S} y2={M+i*S/10} stroke="rgba(255,255,255,.04)" strokeWidth={.5}/>
          </g>)}
          <polygon points={`${sx(a.x)},${sy(a.y)} ${sx(b.x)},${sy(b.y)} ${sx(c.x)},${sy(c.y)}`}
            fill={collinear ? 'rgba(34,197,94,.1)' : 'rgba(239,68,68,.06)'}
            stroke={collinear ? '#22c55e' : 'rgba(239,68,68,.2)'} strokeWidth={1} strokeDasharray="4,3" />
          <circle cx={sx(a.x)} cy={sy(a.y)} r={5} fill="#3b9eff" stroke="#fff" strokeWidth={1.5} />
          <text x={sx(a.x)+7} y={sy(a.y)-7} fill="#3b9eff" fontSize={7} fontFamily="monospace" fontWeight={600}>A({a.x},{a.y})</text>
          <circle cx={sx(b.x)} cy={sy(b.y)} r={5} fill="#22c55e" stroke="#fff" strokeWidth={1.5} />
          <text x={sx(b.x)+7} y={sy(b.y)-7} fill="#22c55e" fontSize={7} fontFamily="monospace" fontWeight={600}>B({b.x},{b.y})</text>
          <circle cx={sx(c.x)} cy={sy(c.y)} r={5} fill="#eab308" stroke="#fff" strokeWidth={1.5} />
          <text x={sx(c.x)+7} y={sy(c.y)-7} fill="#eab308" fontSize={7} fontFamily="monospace" fontWeight={600}>C({c.x},{c.y})</text>
        </svg>
        <div style={{display:'flex',flexDirection:'column',gap:'.5rem',minWidth:180}}>
          <div style={{padding:'.5rem .75rem',borderRadius:6,border:'1px solid',borderColor:collinear?'rgba(34,197,94,.4)':'rgba(239,68,68,.4)',background:collinear?'rgba(34,197,94,.08)':'rgba(239,68,68,.08)'}}>
            <div style={{color:collinear?'#22c55e':'#ef4444',fontSize:11,fontFamily:'monospace',fontWeight:700}}>
              {collinear ? 'Collinear' : 'Not Collinear'}
            </div>
            <div style={{color:'#c8cad6',fontSize:9,fontFamily:'monospace',marginTop:2}}>
              Cross product = {cross.toFixed(2)} | Area = {area.toFixed(2)}
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'.25rem'}}>
            <label style={{color:'#3b9eff',fontSize:9,fontFamily:'monospace',fontWeight:600}}>Point A</label>
            <div style={{display:'flex',gap:'.5rem'}}>
              <div style={{flex:1}}><label style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>x</label>
                <input type="range" min={10} max={190} value={a.x} onChange={e=>setA(p=>({...p,x:Number(e.target.value)}))} style={{width:'100%',accentColor:'#3b9eff'}}/></div>
              <div style={{flex:1}}><label style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>y</label>
                <input type="range" min={10} max={170} value={a.y} onChange={e=>setA(p=>({...p,y:Number(e.target.value)}))} style={{width:'100%',accentColor:'#3b9eff'}}/></div>
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'.25rem'}}>
            <label style={{color:'#22c55e',fontSize:9,fontFamily:'monospace',fontWeight:600}}>Point B</label>
            <div style={{display:'flex',gap:'.5rem'}}>
              <div style={{flex:1}}><label style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>x</label>
                <input type="range" min={10} max={190} value={b.x} onChange={e=>setB(p=>({...p,x:Number(e.target.value)}))} style={{width:'100%',accentColor:'#22c55e'}}/></div>
              <div style={{flex:1}}><label style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>y</label>
                <input type="range" min={10} max={170} value={b.y} onChange={e=>setB(p=>({...p,y:Number(e.target.value)}))} style={{width:'100%',accentColor:'#22c55e'}}/></div>
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'.25rem'}}>
            <label style={{color:'#eab308',fontSize:9,fontFamily:'monospace',fontWeight:600}}>Point C</label>
            <div style={{display:'flex',gap:'.5rem'}}>
              <div style={{flex:1}}><label style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>x</label>
                <input type="range" min={10} max={190} value={c.x} onChange={e=>setC(p=>({...p,x:Number(e.target.value)}))} style={{width:'100%',accentColor:'#eab308'}}/></div>
              <div style={{flex:1}}><label style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>y</label>
                <input type="range" min={10} max={170} value={c.y} onChange={e=>setC(p=>({...p,y:Number(e.target.value)}))} style={{width:'100%',accentColor:'#eab308'}}/></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Line Intersection Explorer ─────────────────── */



export function LineIntersectionExplorer() {
  const S = 240, M = 20, G = S + M * 2
  const sceneW = 10, sceneH = 10
  const [l1, setL1] = useState({ m: 0.5, b: 2 })
  const [l2, setL2] = useState({ m: -0.8, b: 6 })
  const sx = (v: number) => M + (v / sceneW) * S
  const sy = (v: number) => M + S - (v / sceneH) * S

  const denom = l1.m - l2.m
  const parallel = Math.abs(denom) < 0.001
  const ix = parallel ? 0 : (l2.b - l1.b) / denom
  const iy = parallel ? 0 : l1.m * ix + l1.b

  const line1 = Array.from({length:200},(_,i)=>{ const x=i/20-5; return {sy:sx(x),ey:sy(l1.m*x+l1.b)} })
  const line2 = Array.from({length:200},(_,i)=>{ const x=i/20-5; return {sy:sx(x),ey:sy(l2.m*x+l2.b)} })

  return (
    <div className="gb-interactive">
      <div className="gb-interactive-header">
        <span className="gb-interactive-icon">{'\u2571'}</span>
        <span className="gb-interactive-title">Line Intersection Explorer — Drag sliders to see where two lines meet</span>
      </div>
      <div className="gb-interactive-body" style={{display:'flex',gap:'1.5rem',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
        <svg viewBox={`0 0 ${G} ${G}`} style={{maxWidth:G,height:'auto'}} className="gb-interactive-svg" role="img" aria-label="Line intersection explorer">
          <rect x={M} y={M} width={S} height={S} rx={8} fill="rgba(16,18,31,.4)" stroke="rgba(255,255,255,.06)" strokeWidth={1} />
          {Array.from({length:10},(_,i)=><g key={`g${i}`}>
            <line x1={M+i*S/10} y1={M} x2={M+i*S/10} y2={M+S} stroke="rgba(255,255,255,.04)" strokeWidth={.5}/>
            <line x1={M} y1={M+i*S/10} x2={M+S} y2={M+i*S/10} stroke="rgba(255,255,255,.04)" strokeWidth={.5}/>
          </g>)}
          <line x1={sx(0)} y1={M} x2={sx(0)} y2={M+S} stroke="rgba(255,255,255,.15)" strokeWidth={1}/>
          <line x1={M} y1={sy(0)} x2={M+S} y2={sy(0)} stroke="rgba(255,255,255,.15)" strokeWidth={1}/>
          {line1.map((p,i)=>i<199&&<line key={`l1${i}`} x1={p.sy} y1={p.ey} x2={line1[i+1].sy} y2={line1[i+1].ey} stroke="#3b9eff" strokeWidth={2} opacity={.8}/>)}
          {line2.map((p,i)=>i<199&&<line key={`l2${i}`} x1={p.sy} y1={p.ey} x2={line2[i+1].sy} y2={line2[i+1].ey} stroke="#ef4444" strokeWidth={2} opacity={.8}/>)}
          {!parallel && sx(ix) >= M && sx(ix) <= M+S && sy(iy) >= M && sy(iy) <= M+S && (
            <g>
              <circle cx={sx(ix)} cy={sy(iy)} r={5} fill="#22c55e" stroke="#fff" strokeWidth={2}/>
              <circle cx={sx(ix)} cy={sy(iy)} r={2} fill="#22c55e"/>
            </g>
          )}
          <text x={M+8} y={sy(8)} fill="#3b9eff" fontSize={8} fontFamily="monospace">y={l1.m}x+{l1.b}</text>
          <text x={M+8} y={sy(6.5)} fill="#ef4444" fontSize={8} fontFamily="monospace">y={l2.m}x+{l2.b}</text>
        </svg>
        <div style={{display:'flex',flexDirection:'column',gap:'.5rem',minWidth:180}}>
          <div style={{padding:'.5rem .75rem',borderRadius:6,border:'1px solid',borderColor:parallel?'rgba(239,68,68,.4)':'rgba(34,197,94,.4)',background:parallel?'rgba(239,68,68,.08)':'rgba(34,197,94,.08)'}}>
            <div style={{color:parallel?'#ef4444':'#22c55e',fontSize:11,fontFamily:'monospace',fontWeight:700}}>
              {parallel ? 'Parallel (no intersection)' : `Intersection at (${ix.toFixed(2)}, ${iy.toFixed(2)})`}
            </div>
            {!parallel && <div style={{color:'#c8cad6',fontSize:9,fontFamily:'monospace',marginTop:2}}>
              denom = {denom.toFixed(3)}
            </div>}
          </div>
          <div style={{borderTop:'1px solid rgba(255,255,255,.06)',paddingTop:'.5rem'}}>
            <div style={{color:'#3b9eff',fontSize:9,fontFamily:'monospace',fontWeight:600,marginBottom:4}}>Line 1: y = m\u2081x + b\u2081</div>
            <div style={{display:'flex',flexDirection:'column',gap:'.25rem'}}>
              <div><label style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>slope m\u2081 = {l1.m.toFixed(2)}</label>
                <input type="range" min={-3} max={3} step={0.05} value={l1.m} onChange={e=>setL1(p=>({...p,m:Number(e.target.value)}))} style={{width:'100%',accentColor:'#3b9eff'}}/></div>
              <div><label style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>intercept b\u2081 = {l1.b.toFixed(1)}</label>
                <input type="range" min={-3} max={12} step={0.5} value={l1.b} onChange={e=>setL1(p=>({...p,b:Number(e.target.value)}))} style={{width:'100%',accentColor:'#3b9eff'}}/></div>
            </div>
          </div>
          <div>
            <div style={{color:'#ef4444',fontSize:9,fontFamily:'monospace',fontWeight:600,marginBottom:4}}>Line 2: y = m\u2082x + b\u2082</div>
            <div style={{display:'flex',flexDirection:'column',gap:'.25rem'}}>
              <div><label style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>slope m\u2082 = {l2.m.toFixed(2)}</label>
                <input type="range" min={-3} max={3} step={0.05} value={l2.m} onChange={e=>setL2(p=>({...p,m:Number(e.target.value)}))} style={{width:'100%',accentColor:'#ef4444'}}/></div>
              <div><label style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>intercept b\u2082 = {l2.b.toFixed(1)}</label>
                <input type="range" min={-3} max={12} step={0.5} value={l2.b} onChange={e=>setL2(p=>({...p,b:Number(e.target.value)}))} style={{width:'100%',accentColor:'#ef4444'}}/></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SquareCounter() {
  const [N, setN] = useState(4)
  const [M, setM] = useState(5)
  const cell = 24
  const total = (() => {
    let s = 0
    for (let k = 1; k <= Math.min(N, M); k++) s += (N - k + 1) * (M - k + 1)
    return s
  })()
  const breakdown = (() => {
    const b: { k: number; count: number }[] = []
    for (let k = 1; k <= Math.min(N, M); k++) b.push({ k, count: (N - k + 1) * (M - k + 1) })
    return b
  })()
  const svgW = M * cell + 40
  const svgH = N * cell + 40 + 30
  return (
    <div className="gb-interactive">
      <div className="gb-interactive-header">
        <span className="gb-interactive-icon">{'\u25A3'}</span>
        <span className="gb-interactive-title">Square Counter — How many squares in an N×M grid?</span>
      </div>
      <div className="gb-interactive-body" style={{display:'flex',gap:'1.5rem',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
        <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{maxWidth:480,height:'auto'}} className="gb-interactive-svg" role="img" aria-label="Square counter">
          <rect x={20} y={20} width={M * cell} height={N * cell} rx={4} fill="rgba(16,18,31,.4)" stroke="rgba(255,255,255,.06)" strokeWidth={1} />
          {Array.from({length:N},(_,r)=>Array.from({length:M},(_,c)=>(
            <rect key={`${r}-${c}`} x={20+c*cell} y={20+r*cell} width={cell} height={cell}
              fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.08)" strokeWidth={.5}/>
          )))}
          {Array.from({length:N},(_,r)=>Array.from({length:M},(_,c)=>(
            <circle key={`d${r}-${c}`} cx={20+c*cell+cell/2} cy={20+r*cell+cell/2} r={2} fill="#3b9eff" opacity={.5}/>
          )))}
          {N>=2 && M>=2 && (
            <rect x={20+cell} y={20+cell} width={cell*2} height={cell*2}
              fill="rgba(34,197,94,.08)" stroke="#22c55e" strokeWidth={1.5} strokeDasharray="4,3" rx={1}/>
          )}
          <text x={20+M*cell/2} y={20+N*cell+20} fill="#7d8299" fontSize={8} fontFamily="monospace" textAnchor="middle">{M} columns</text>
          <text x={8} y={20+N*cell/2} fill="#7d8299" fontSize={8} fontFamily="monospace" textAnchor="middle" transform={`rotate(-90,8,${20+N*cell/2})`}>{N} rows</text>
          <text x={20} y={20+N*cell+42} fill="#c8cad6" fontSize={8} fontFamily="monospace">Total: {total} square{(total!==1)?'s':''}</text>
        </svg>
        <div style={{display:'flex',flexDirection:'column',gap:'.5rem',minWidth:160}}>
          <div><label style={{color:'#c8cad6',fontSize:10,fontFamily:'monospace',fontWeight:600}}>Rows (N) = {N}</label>
            <input type="range" min={1} max={8} value={N} onChange={e=>setN(Number(e.target.value))} style={{accentColor:'#3b9eff'}}/></div>
          <div><label style={{color:'#c8cad6',fontSize:10,fontFamily:'monospace',fontWeight:600}}>Columns (M) = {M}</label>
            <input type="range" min={1} max={8} value={M} onChange={e=>setM(Number(e.target.value))} style={{accentColor:'#3b9eff'}}/></div>
          <div style={{padding:'.75rem',borderRadius:8,background:'rgba(59,158,255,.08)',border:'1px solid rgba(59,158,255,.2)'}}>
            <div style={{color:'#3b9eff',fontSize:10,fontFamily:'monospace',fontWeight:600,marginBottom:6}}>Breakdown</div>
            {breakdown.map(b => (
              <div key={b.k} style={{display:'flex',justifyContent:'space-between',color:'#c8cad6',fontSize:9,fontFamily:'monospace',padding:'2px 0'}}>
                <span>{b.k}\u00D7{b.k} squares</span><span style={{color:'#22c55e'}}>{b.count}</span>
              </div>
            ))}
            <div style={{borderTop:'1px solid rgba(255,255,255,.1)',marginTop:4,paddingTop:4,display:'flex',justifyContent:'space-between',color:'#fff',fontSize:10,fontFamily:'monospace',fontWeight:600}}>
              <span>Total</span><span style={{color:'#22c55e'}}>{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Shoelace Visualizer ────────────────────────── */

export function ShoelaceVisualizer() {
  const S = 240, M = 20, G = S + M * 2
  const [pts, setPts] = useState([{x:40,y:140},{x:80,y:40},{x:150,y:50},{x:170,y:120},{x:130,y:160}])
  const n = pts.length
  let area = 0
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n
    area += pts[i].x * pts[j].y - pts[j].x * pts[i].y
  }
  area = Math.abs(area) / 2
  const sx = (v: number) => M + v * S / 200
  const sy = (v: number) => M + S - v * S / 180

  return (
    <div className="gb-interactive">
      <div className="gb-interactive-header">
        <span className="gb-interactive-icon">{'\u2B1D'}</span>
        <span className="gb-interactive-title">Shoelace Visualizer — Drag vertices to see polygon area computed via cross-products</span>
      </div>
      <div className="gb-interactive-body" style={{display:'flex',gap:'1.5rem',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
        <svg viewBox={`0 0 ${G} ${G}`} style={{maxWidth:G,height:'auto'}} className="gb-interactive-svg" role="img" aria-label="Shoelace visualizer">
          <rect x={M} y={M} width={S} height={S} rx={8} fill="rgba(16,18,31,.4)" stroke="rgba(255,255,255,.06)" strokeWidth={1} />
          {Array.from({length:10},(_,i)=><g key={`g${i}`}>
            <line x1={M+i*S/10} y1={M} x2={M+i*S/10} y2={M+S} stroke="rgba(255,255,255,.04)" strokeWidth={.5}/>
            <line x1={M} y1={M+i*S/10} x2={M+S} y2={M+i*S/10} stroke="rgba(255,255,255,.04)" strokeWidth={.5}/>
          </g>)}
          <polygon points={pts.map(p=>`${sx(p.x)},${sy(p.y)}`).join(' ')}
            fill="rgba(59,158,255,.1)" stroke="#3b9eff" strokeWidth={2} strokeLinejoin="round"/>
          {pts.map((p,i)=>(
            <g key={i}>
              <circle cx={sx(p.x)} cy={sy(p.y)} r={5} fill={i===0?'#22c55e':'#3b9eff'} stroke="#fff" strokeWidth={1.5}
                onMouseDown={()=>{}}/>
              <text x={sx(p.x)+6} y={sy(p.y)-6} fill={i===0?'#22c55e':'#3b9eff'} fontSize={7} fontFamily="monospace">P{i+1}</text>
            </g>
          ))}
        </svg>
        <div style={{display:'flex',flexDirection:'column',gap:'.5rem',minWidth:160}}>
          <div style={{padding:'.75rem',borderRadius:8,background:'rgba(59,158,255,.08)',border:'1px solid rgba(59,158,255,.2)'}}>
            <div style={{color:'#3b9eff',fontSize:10,fontFamily:'monospace',fontWeight:600}}>Area</div>
            <div style={{color:'#fff',fontSize:16,fontFamily:'monospace',fontWeight:700}}>{area.toFixed(2)}</div>
          </div>
          <div style={{borderTop:'1px solid rgba(255,255,255,.06)',paddingTop:'.5rem'}}>
            <div style={{color:'#c8cad6',fontSize:9,fontFamily:'monospace',fontWeight:600,marginBottom:4}}>Vertices ({n})</div>
            {pts.map((p,i)=>(
              <div key={i} style={{display:'flex',gap:'.5rem',marginBottom:2}}>
                <span style={{color:'#7d8299',fontSize:8,fontFamily:'monospace',minWidth:20}}>P{i+1}</span>
                <span style={{color:'#c8cad6',fontSize:8,fontFamily:'monospace'}}>({p.x},{p.y})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Island Perimeter / Cell Counter ────────────── */

export function IslandExplorer() {
  const [grid, setGrid] = useState(()=>{
    const g = Array.from({length:6},()=>Array(6).fill(0))
    for(let r=1;r<=4;r++) for(let c=1;c<=4;c++) g[r][c]=1
    g[2][2]=0
    return g
  })
  const n=6,m=6

  let perimeter=0, area=0
  for(let r=0;r<n;r++) for(let c=0;c<m;c++){
    if(!grid[r][c]) continue
    area++
    let shared=0
    if(r>0&&grid[r-1][c]) shared++
    if(r<n-1&&grid[r+1][c]) shared++
    if(c>0&&grid[r][c-1]) shared++
    if(c<m-1&&grid[r][c+1]) shared++
    perimeter+=4-shared
  }

  return (
    <div className="gb-interactive">
      <div className="gb-interactive-header">
        <span className="gb-interactive-icon">{'\u25F0'}</span>
        <span className="gb-interactive-title">Island Explorer — Click cells to toggle land/water, see perimeter and area update</span>
      </div>
      <div className="gb-interactive-body" style={{display:'flex',gap:'1.5rem',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
        <svg viewBox="0 0 260 260" style={{maxWidth:260,height:'auto'}} className="gb-interactive-svg" role="img" aria-label="Island explorer">
          <rect x={10} y={10} width={240} height={240} rx={8} fill="rgba(16,18,31,.4)" stroke="rgba(255,255,255,.06)" strokeWidth={1} />
          {Array.from({length:n},(_,r)=>Array.from({length:m},(_,c)=>(
            <rect key={`${r}-${c}`} x={10+c*40+1} y={10+r*40+1} width={38} height={38} rx={2}
              fill={grid[r][c]?'rgba(34,197,94,.35)':'rgba(255,255,255,.03)'}
              stroke={grid[r][c]?'#22c55e':'rgba(255,255,255,.08)'} strokeWidth={1}
              style={{cursor:'pointer'}}
              onClick={()=>setGrid(prev=>{const nv=prev.map(row=>[...row]);nv[r][c]=nv[r][c]?0:1;return nv})}/>
          )))}
        </svg>
        <div style={{display:'flex',flexDirection:'column',gap:'.5rem',minWidth:140}}>
          <div style={{padding:'.5rem .75rem',borderRadius:8,background:'rgba(34,197,94,.08)',border:'1px solid rgba(34,197,94,.2)'}}>
            <div style={{color:'#22c55e',fontSize:10,fontFamily:'monospace',fontWeight:600}}>Area</div>
            <div style={{color:'#fff',fontSize:14,fontFamily:'monospace',fontWeight:700}}>{area}</div>
          </div>
          <div style={{padding:'.5rem .75rem',borderRadius:8,background:'rgba(59,158,255,.08)',border:'1px solid rgba(59,158,255,.2)'}}>
            <div style={{color:'#3b9eff',fontSize:10,fontFamily:'monospace',fontWeight:600}}>Perimeter</div>
            <div style={{color:'#fff',fontSize:14,fontFamily:'monospace',fontWeight:700}}>{perimeter}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Angle Explorer ─────────────────────────────── */

export function AngleExplorer() {
  const [deg, setDeg] = useState(45)
  const rad = deg * Math.PI / 180
  const cosV = Math.cos(rad), sinV = Math.sin(rad)
  const S = 200, M = 40, G = S + M * 2, cx = M + S/2, cy = M + S/2, r = 80
  const ex = cx + r * cosV, ey = cy - r * sinV

  return (
    <div className="gb-interactive">
      <div className="gb-interactive-header">
        <span className="gb-interactive-icon">{'\u2220'}</span>
        <span className="gb-interactive-title">Angle Explorer — Adjust the angle and see sine/cosine values</span>
      </div>
      <div className="gb-interactive-body" style={{display:'flex',gap:'1.5rem',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
        <svg viewBox={`0 0 ${G} ${G}`} style={{maxWidth:G,height:'auto'}} className="gb-interactive-svg" role="img" aria-label="Angle explorer">
          <rect x={M} y={M} width={S} height={S} rx={8} fill="rgba(16,18,31,.4)" stroke="rgba(255,255,255,.06)" strokeWidth={1} />
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth={.5} />
          <line x1={cx} y1={cy} x2={cx+r+10} y2={cy} stroke="rgba(255,255,255,.12)" strokeWidth={.5} />
          <line x1={cx} y1={cy} x2={cx} y2={cy-r-10} stroke="rgba(255,255,255,.12)" strokeWidth={.5} />
          <line x1={cx} y1={cy} x2={ex} y2={ey} stroke="#3b9eff" strokeWidth={2} />
          <path d={`M ${cx + r/4} ${cy} A ${r/4} ${r/4} 0 ${deg>180?1:0} ${sinV>=0?0:1} ${cx + r/4 * cosV} ${cy - r/4 * sinV}`} fill="none" stroke="#eab308" strokeWidth={1.5} />
          <circle cx={ex} cy={ey} r={4} fill="#3b9eff" stroke="#fff" strokeWidth={1} />
          <text x={ex+6} y={ey-6} fill="#3b9eff" fontSize={8} fontFamily="monospace">{deg}\u00B0</text>
          <line x1={ex} y1={cy} x2={ex} y2={ey} stroke="#ef4444" strokeWidth={1} strokeDasharray="4,3" />
          <text x={ex+4} y={(cy+ey)/2} fill="#ef4444" fontSize={7} fontFamily="monospace">sin</text>
          <line x1={cx} y1={cy} x2={ex} y2={cy} stroke="#22c55e" strokeWidth={1} strokeDasharray="4,3" />
          <text x={(cx+ex)/2} y={cy-4} fill="#22c55e" fontSize={7} fontFamily="monospace">cos</text>
        </svg>
        <div style={{display:'flex',flexDirection:'column',gap:'.5rem',minWidth:150}}>
          <div><label style={{color:'#c8cad6',fontSize:10,fontFamily:'monospace',fontWeight:600}}>Angle: {deg}\u00B0</label>
            <input type="range" min={0} max={360} value={deg} onChange={e=>setDeg(Number(e.target.value))} style={{width:'100%',accentColor:'#eab308'}}/></div>
          <div style={{padding:'.5rem .75rem',borderRadius:8,background:'rgba(59,158,255,.08)',border:'1px solid rgba(59,158,255,.2)'}}>
            <div style={{display:'flex',justifyContent:'space-between',color:'#22c55e',fontSize:10,fontFamily:'monospace'}}><span>cos</span><span>{cosV.toFixed(4)}</span></div>
            <div style={{display:'flex',justifyContent:'space-between',color:'#ef4444',fontSize:10,fontFamily:'monospace',marginTop:2}}><span>sin</span><span>{sinV.toFixed(4)}</span></div>
            <div style={{display:'flex',justifyContent:'space-between',color:'#c8cad6',fontSize:9,fontFamily:'monospace',marginTop:4}}><span>radians</span><span>{rad.toFixed(4)}</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Rotation Visualizer ────────────────────────── */

export function RotationVisualizer() {
  const [angle, setAngle] = useState(30)
  const rad = angle * Math.PI / 180
  const c = Math.cos(rad), s = Math.sin(rad)
  const shape = useMemo(()=>[[40,100],[80,60],[120,100],[80,140]],[])
  const rotated = shape.map(([x,y])=>[x*c - y*s, x*s + y*c])
  const S = 200, M = 30, G = S + M * 2, cx = M + S/2, cy = M + S/2

  return (
    <div className="gb-interactive">
      <div className="gb-interactive-header">
        <span className="gb-interactive-icon">{'\u27F3'}</span>
        <span className="gb-interactive-title">Rotation Visualizer — Rotate a shape around the origin</span>
      </div>
      <div className="gb-interactive-body" style={{display:'flex',gap:'1.5rem',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
        <svg viewBox={`0 0 ${G} ${G}`} style={{maxWidth:G,height:'auto'}} className="gb-interactive-svg" role="img" aria-label="Rotation visualizer">
          <rect x={M} y={M} width={S} height={S} rx={8} fill="rgba(16,18,31,.4)" stroke="rgba(255,255,255,.06)" strokeWidth={1} />
          {Array.from({length:10},(_,i)=><g key={`g${i}`}>
            <line x1={M+i*S/10} y1={M} x2={M+i*S/10} y2={M+S} stroke="rgba(255,255,255,.04)" strokeWidth={.5}/>
            <line x1={M} y1={M+i*S/10} x2={M+S} y2={M+i*S/10} stroke="rgba(255,255,255,.04)" strokeWidth={.5}/>
          </g>)}
          <line x1={cx-S/2} y1={cy} x2={cx+S/2} y2={cy} stroke="rgba(255,255,255,.08)" strokeWidth={.5} />
          <line x1={cx} y1={cy-S/2} x2={cx} y2={cy+S/2} stroke="rgba(255,255,255,.08)" strokeWidth={.5} />
          <polygon points={shape.map(([x,y])=>`${cx+x},${cy-y}`).join(' ')}
            fill="rgba(59,158,255,.15)" stroke="#3b9eff" strokeWidth={1.5} strokeLinejoin="round"/>
          <polygon points={rotated.map(([x,y])=>`${cx+x},${cy-y}`).join(' ')}
            fill="rgba(239,68,68,.15)" stroke="#ef4444" strokeWidth={1.5} strokeLinejoin="round"/>
          <circle cx={cx} cy={cy} r={2.5} fill="rgba(255,255,255,.4)" />
        </svg>
        <div style={{display:'flex',flexDirection:'column',gap:'.5rem',minWidth:150}}>
          <div><label style={{color:'#c8cad6',fontSize:10,fontFamily:'monospace',fontWeight:600}}>Rotation: {angle}\u00B0</label>
            <input type="range" min={0} max={360} value={angle} onChange={e=>setAngle(Number(e.target.value))} style={{width:'100%',accentColor:'#eab308'}}/></div>
          <div style={{padding:'.5rem .75rem',borderRadius:8,background:'rgba(239,68,68,.08)',border:'1px solid rgba(239,68,68,.2)'}}>
            <div style={{color:'#ef4444',fontSize:10,fontFamily:'monospace',fontWeight:600}}>Rotated Shape</div>
            <div style={{fontSize:9,fontFamily:'monospace',marginTop:2}}><span style={{color:'#3b9eff'}}>Original</span><span style={{color:'#7d8299'}}> \u2192 </span><span style={{color:'#ef4444'}}>Rotated</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Convex Hull Visualizer ─────────────────────── */

export function ConvexHull() {
  const [pts, setPts] = useState<number[][]>([[40,140],[60,60],[100,40],[140,60],[160,120],[130,160],[80,150],[120,100],[60,110],[150,90]])
  const sorted = useMemo(()=>[...pts].sort((a,b)=>a[0]-b[0]||a[1]-b[1]),[pts])
  const cross = (o:number[],a:number[],b:number[]) => (a[0]-o[0])*(b[1]-o[1]) - (a[1]-o[1])*(b[0]-o[0])
  const hull = useMemo(()=>{
    if(sorted.length<3)return[...sorted]
    const lower:number[][]=[]
    for(const p of sorted){while(lower.length>=2&&cross(lower[lower.length-2],lower[lower.length-1],p)<=0)lower.pop();lower.push(p)}
    const upper:number[][]=[]
    for(const p of sorted.reverse()){while(upper.length>=2&&cross(upper[upper.length-2],upper[upper.length-1],p)<=0)upper.pop();upper.push(p)}
    lower.pop();upper.pop()
    return[...lower,...upper]
  },[sorted])
  const S=200,M=30,G=S+M*2
  const sx=(v:number)=>M+v*S/180,sy=(v:number)=>M+S-v*S/180

  return (
    <div className="gb-interactive">
      <div className="gb-interactive-header">
        <span className="gb-interactive-icon">{'\u2B1F'}</span>
        <span className="gb-interactive-title">Convex Hull (Monotone Chain) — Add points to see the convex hull</span>
      </div>
      <div className="gb-interactive-body" style={{display:'flex',gap:'1.5rem',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
        <svg viewBox={`0 0 ${G} ${G}`} style={{maxWidth:G,height:'auto'}} className="gb-interactive-svg" role="img" aria-label="Convex hull"
          onClick={e=>{const r=e.currentTarget.getBoundingClientRect();const x=Math.round((e.clientX-r.left)*180/r.width);const y=Math.round((r.bottom-e.clientY)*180/r.height);if(x>=5&&x<=175&&y>=5&&y<=175)setPts(p=>[...p,[x,y]])}}>
          <rect x={M} y={M} width={S} height={S} rx={8} fill="rgba(16,18,31,.4)" stroke="rgba(255,255,255,.06)" strokeWidth={1} />
          {Array.from({length:10},(_,i)=><g key={`g${i}`}>
            <line x1={M+i*S/10} y1={M} x2={M+i*S/10} y2={M+S} stroke="rgba(255,255,255,.04)" strokeWidth={.5}/>
            <line x1={M} y1={M+i*S/10} x2={M+S} y2={M+i*S/10} stroke="rgba(255,255,255,.04)" strokeWidth={.5}/>
          </g>)}
          {hull.length>=3&&<polygon points={hull.map(p=>`${sx(p[0])},${sy(p[1])}`).join(' ')}
            fill="rgba(59,158,255,.12)" stroke="#3b9eff" strokeWidth={2} strokeLinejoin="round"/>}
          {pts.map((p,i)=><circle key={i} cx={sx(p[0])} cy={sy(p[1])} r={3.5} fill={hull.some(h=>h[0]===p[0]&&h[1]===p[1])?'#3b9eff':'#7d8299'} stroke="#fff" strokeWidth={.5}/>)}
        </svg>
        <div style={{display:'flex',flexDirection:'column',gap:'.5rem',minWidth:140}}>
          <div style={{padding:'.5rem .75rem',borderRadius:8,background:'rgba(59,158,255,.08)',border:'1px solid rgba(59,158,255,.2)'}}>
            <div style={{color:'#3b9eff',fontSize:10,fontFamily:'monospace',fontWeight:600}}>Points: <span style={{color:'#fff'}}>{pts.length}</span></div>
          </div>
          <div style={{padding:'.5rem .75rem',borderRadius:8,background:'rgba(34,197,94,.08)',border:'1px solid rgba(34,197,94,.2)'}}>
            <div style={{color:'#22c55e',fontSize:10,fontFamily:'monospace',fontWeight:600}}>Hull: <span style={{color:'#fff'}}>{hull.length}</span></div>
          </div>
          <button onClick={()=>{const p:number[][]=[];for(let i=0;i<10;i++)p.push([Math.floor(Math.random()*160)+10,Math.floor(Math.random()*160)+10]);setPts(p)}}
            style={{padding:'.3rem .6rem',borderRadius:4,border:'1px solid rgba(255,255,255,.12)',background:'transparent',color:'#c8cad6',fontSize:9,fontFamily:'monospace',cursor:'pointer'}}>Random</button>
        </div>
      </div>
    </div>
  )
}

/* ── Segment Intersection ────────────────────────── */

export function SegmentIntersection() {
  const S = 200, M = 30, G = S + M * 2
  const [s1, setS1] = useState({x1:30,y1:140,x2:140,y2:50})
  const [s2, setS2] = useState({x1:50,y1:50,x2:160,y2:140})
  const ccw=(ax:number,ay:number,bx:number,by:number,cx:number,cy:number)=>(bx-ax)*(cy-ay)-(by-ay)*(cx-ax)
  const intersect = useMemo(()=>{
    const {x1:a,y1:b,x2:c,y2:d}=s1,{x1:e,y1:f,x2:g,y2:h}=s2
    const o1=ccw(a,b,c,d,e,f),o2=ccw(a,b,c,d,g,h),o3=ccw(e,f,g,h,a,b),o4=ccw(e,f,g,h,c,d)
    if(o1===0&&o2===0&&o3===0&&o4===0)return'collinear'
    return(o1>0!==o2>0)&&(o3>0!==o4>0)?'intersect':'none'
  },[s1,s2])
  const sx=(v:number)=>M+v*S/180,sy=(v:number)=>M+S-v*S/180

  return (
    <div className="gb-interactive">
      <div className="gb-interactive-header">
        <span className="gb-interactive-icon">{'\u2571'}</span>
        <span className="gb-interactive-title">Segment Intersection — Drag endpoints to check intersection</span>
      </div>
      <div className="gb-interactive-body" style={{display:'flex',gap:'1.5rem',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
        <svg viewBox={`0 0 ${G} ${G}`} style={{maxWidth:G,height:'auto'}} className="gb-interactive-svg" role="img" aria-label="Segment intersection">
          <rect x={M} y={M} width={S} height={S} rx={8} fill="rgba(16,18,31,.4)" stroke="rgba(255,255,255,.06)" strokeWidth={1} />
          {Array.from({length:10},(_,i)=><g key={`g${i}`}>
            <line x1={M+i*S/10} y1={M} x2={M+i*S/10} y2={M+S} stroke="rgba(255,255,255,.04)" strokeWidth={.5}/>
            <line x1={M} y1={M+i*S/10} x2={M+S} y2={M+i*S/10} stroke="rgba(255,255,255,.04)" strokeWidth={.5}/>
          </g>)}
          <line x1={sx(s1.x1)} y1={sy(s1.y1)} x2={sx(s1.x2)} y2={sy(s1.y2)} stroke="#3b9eff" strokeWidth={2.5} strokeLinecap="round"/>
          <line x1={sx(s2.x1)} y1={sy(s2.y1)} x2={sx(s2.x2)} y2={sy(s2.y2)} stroke="#ef4444" strokeWidth={2.5} strokeLinecap="round"/>
        </svg>
        <div style={{padding:'.5rem .75rem',borderRadius:6,border:'1px solid',
          borderColor:intersect==='intersect'?'rgba(34,197,94,.4)':intersect==='collinear'?'rgba(234,179,8,.4)':'rgba(239,68,68,.4)',
          background:intersect==='intersect'?'rgba(34,197,94,.08)':intersect==='collinear'?'rgba(234,179,8,.08)':'rgba(239,68,68,.08)'}}>
          <div style={{color:intersect==='intersect'?'#22c55e':intersect==='collinear'?'#eab308':'#ef4444',fontSize:11,fontFamily:'monospace',fontWeight:700}}>
            {intersect==='intersect'?'Intersecting':intersect==='collinear'?'Collinear':'Separate'}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Bezier Curve Explorer ──────────────────────── */

export function BezierCurve() {
  const [pts, setPts] = useState([[30,150],[80,30],[150,50],[170,140]])
  const S=200,M=30,G=S+M*2
  const bezier=(t:number)=>{
    const n=pts.length-1,binom=(n:number,k:number)=>{let r=1;for(let i=1;i<=k;i++)r=r*(n-i+1)/i;return r}
    let x=0,y=0
    for(let i=0;i<=n;i++){const b=binom(n,i)*Math.pow(1-t,n-i)*Math.pow(t,i);x+=pts[i][0]*b;y+=pts[i][1]*b}
    return[x,y]
  }
  const curve:number[][]=[]
  for(let i=0;i<=50;i++)curve.push(bezier(i/50))
  const sx=(v:number)=>M+v*S/180,sy=(v:number)=>M+S-v*S/180

  return (
    <div className="gb-interactive">
      <div className="gb-interactive-header">
        <span className="gb-interactive-icon">{'\u223F'}</span>
        <span className="gb-interactive-title">Bezier Curve — Drag control points to shape the curve</span>
      </div>
      <div className="gb-interactive-body" style={{display:'flex',gap:'1.5rem',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
        <svg viewBox={`0 0 ${G} ${G}`} style={{maxWidth:G,height:'auto'}} className="gb-interactive-svg" role="img" aria-label="Bezier curve">
          <rect x={M} y={M} width={S} height={S} rx={8} fill="rgba(16,18,31,.4)" stroke="rgba(255,255,255,.06)" strokeWidth={1} />
          {Array.from({length:10},(_,i)=><g key={`g${i}`}>
            <line x1={M+i*S/10} y1={M} x2={M+i*S/10} y2={M+S} stroke="rgba(255,255,255,.04)" strokeWidth={.5}/>
            <line x1={M} y1={M+i*S/10} x2={M+S} y2={M+i*S/10} stroke="rgba(255,255,255,.04)" strokeWidth={.5}/>
          </g>)}
          {pts.map((p,i)=>{const next=pts[i+1];return next?<line key={`l${i}`} x1={sx(p[0])} y1={sy(p[1])} x2={sx(next[0])} y2={sy(next[1])} stroke="rgba(255,255,255,.15)" strokeWidth={1} strokeDasharray="4,3"/>:null})}
          <path d={curve.map((p,i)=>`${i===0?'M':'L'}${sx(p[0])},${sy(p[1])}`).join(' ')} fill="none" stroke="#3b9eff" strokeWidth={2}/>
          {pts.map((p,i)=><g key={i}>
            <circle cx={sx(p[0])} cy={sy(p[1])} r={4} fill={i===0?'#22c55e':i===pts.length-1?'#ef4444':'#eab308'} stroke="#fff" strokeWidth={1.5}/>
            <text x={sx(p[0])+6} y={sy(p[1])-6} fill="#c8cad6" fontSize={7} fontFamily="monospace">P{i}</text>
          </g>)}
        </svg>
        <div style={{padding:'.5rem .75rem',borderRadius:8,background:'rgba(59,158,255,.08)',border:'1px solid rgba(59,158,255,.2)'}}>
          <div style={{color:'#3b9eff',fontSize:10,fontFamily:'monospace',fontWeight:600,marginBottom:2}}>Control Points: {pts.length}</div>
          <div style={{color:'#7d8299',fontSize:8,fontFamily:'monospace'}}>Click to add, drag to move</div>
        </div>
      </div>
    </div>
  )
}

/* ── Quadtree Visualizer ────────────────────────── */

export function QuadtreeVisualizer() {
  const [points, setPoints] = useState<{x:number,y:number}[]>([{x:40,y:120},{x:70,y:40},{x:120,y:60},{x:150,y:130},{x:100,y:100}])
  const [newPt, setNewPt] = useState({x:80,y:80})
  const S=200,M=30,G=S+M*2

  const buildQuadtree=(pts:{x:number,y:number}[],x:number,y:number,w:number,h:number,depth:number=0):any=>{
    if(pts.length<=1||depth>=3)return{type:'leaf',pts,x,y,w,h,depth}
    const hw=w/2,hh=h/2
    const q1=pts.filter(p=>p.x<x+hw&&p.y<y+hh),q2=pts.filter(p=>p.x>=x+hw&&p.y<y+hh)
    const q3=pts.filter(p=>p.x<x+hw&&p.y>=y+hh),q4=pts.filter(p=>p.x>=x+hw&&p.y>=y+hh)
    return{type:'branch',x,y,w,h,depth,
      nw:buildQuadtree(q1,x,y,hw,hh,depth+1),
      ne:buildQuadtree(q2,x+hw,y,hw,hh,depth+1),
      sw:buildQuadtree(q3,x,y+hh,hw,hh,depth+1),
      se:buildQuadtree(q4,x+hw,y+hh,hw,hh,depth+1)}
  }

  const tree = useMemo(()=>buildQuadtree(points,0,0,180,180),[points])

  const renderQuad=(node:any):JSX.Element|null=>{
    if(!node)return null
    const x=sx(node.x),y=sy(node.y+node.h),w=node.w*S/180,h=node.h*S/180
    if(node.type==='leaf'){
      return <><rect x={x} y={y} width={w} height={h} fill="rgba(59,158,255,.04)" stroke="rgba(59,158,255,.15)" strokeWidth={.5}/>
        {node.pts.map((p:any,i:number)=><circle key={i} cx={sx(p.x)} cy={sy(p.y)} r={3} fill="#3b9eff"/>)}</>
    }
    return<><rect x={x} y={y} width={w} height={h} fill="none" stroke="rgba(255,255,255,.12)" strokeWidth={.5}/>
      {renderQuad(node.nw)}{renderQuad(node.ne)}{renderQuad(node.sw)}{renderQuad(node.se)}</>
  }

  const sx=(v:number)=>M+v*S/180,sy=(v:number)=>M+S-v*S/180

  return (
    <div className="gb-interactive">
      <div className="gb-interactive-header">
        <span className="gb-interactive-icon">{'\u25F0'}</span>
        <span className="gb-interactive-title">Quadtree Visualizer — See how the quadtree partitions space as points are added</span>
      </div>
      <div className="gb-interactive-body" style={{display:'flex',gap:'1.5rem',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
        <svg viewBox={`0 0 ${G} ${G}`} style={{maxWidth:G,height:'auto'}} className="gb-interactive-svg" role="img" aria-label="Quadtree visualizer">
          <rect x={M} y={M} width={S} height={S} rx={8} fill="rgba(16,18,31,.4)" stroke="rgba(255,255,255,.06)" strokeWidth={1} />
          {renderQuad(tree)}
          {points.map((p,i)=><circle key={i} cx={sx(p.x)} cy={sy(p.y)} r={3.5} fill="#22c55e" stroke="#fff" strokeWidth={.5}/>)}
        </svg>
        <div style={{display:'flex',flexDirection:'column',gap:'.5rem',minWidth:140}}>
          <div style={{padding:'.5rem .75rem',borderRadius:8,background:'rgba(34,197,94,.08)',border:'1px solid rgba(34,197,94,.2)'}}>
            <div style={{color:'#22c55e',fontSize:10,fontFamily:'monospace',fontWeight:600}}>Points: {points.length}</div>
          </div>
          <div style={{display:'flex',gap:'.3rem',alignItems:'center'}}>
            <input type="range" min={10} max={170} value={newPt.x} onChange={e=>setNewPt(p=>({...p,x:Number(e.target.value)}))} style={{flex:1,accentColor:'#3b9eff'}}/>
            <input type="range" min={10} max={170} value={newPt.y} onChange={e=>setNewPt(p=>({...p,y:Number(e.target.value)}))} style={{flex:1,accentColor:'#3b9eff'}}/>
            <button onClick={()=>{setPoints(p=>[...p,{...newPt}])}} style={{padding:'.3rem .6rem',borderRadius:4,border:'1px solid rgba(59,158,255,.4)',background:'rgba(59,158,255,.12)',color:'#3b9eff',fontSize:10,fontFamily:'monospace',cursor:'pointer',whiteSpace:'nowrap'}}>Add</button>
          </div>
          <button onClick={()=>setPoints([])} style={{padding:'.3rem .6rem',borderRadius:4,border:'1px solid rgba(239,68,68,.4)',background:'rgba(239,68,68,.08)',color:'#ef4444',fontSize:9,fontFamily:'monospace',cursor:'pointer'}}>Clear</button>
        </div>
      </div>
    </div>
  )
}

