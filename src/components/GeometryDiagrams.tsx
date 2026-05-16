export function GridDiagram() {
  return (
    <svg viewBox="0 0 240 160" fill="none" className="gb-diagram">
      <rect x="0.5" y="0.5" width="239" height="159" rx="8" stroke="rgba(59,158,255,.12)" />
      {/* Grid lines */}
      {[0,1,2,3,4].map(i => <line key={`h${i}`} x1={20} y1={20+i*30} x2={220} y2={20+i*30} stroke="rgba(59,158,255,.08)" strokeWidth=".5"/>)}
      {[0,1,2,3,4].map(i => <line key={`v${i}`} x1={20+i*50} y1={20} x2={20+i*50} y2={140} stroke="rgba(59,158,255,.08)" strokeWidth=".5"/>)}
      {/* Highlighted shape */}
      <rect x="70" y="50" width="50" height="30" fill="rgba(59,158,255,.12)" stroke="#3b9eff" strokeWidth="1.2" rx="2"/>
      <rect x="120" y="80" width="50" height="30" fill="rgba(34,197,94,.12)" stroke="#22c55e" strokeWidth="1.2" rx="2"/>
      <rect x="120" y="50" width="30" height="30" fill="rgba(239,68,68,.08)" stroke="#ef4444" strokeWidth="1" rx="2"/>
      {/* Labels */}
      <text x="70" y="18" fill="#7d8299" fontSize="8" fontFamily="monospace">Row 1</text>
      <text x="4" y="24" fill="#7d8299" fontSize="8" fontFamily="monospace">Col A</text>
      <text x="54" y="24" fill="#7d8299" fontSize="8" fontFamily="monospace">Col B</text>
      <text x="104" y="24" fill="#7d8299" fontSize="8" fontFamily="monospace">Col C</text>
    </svg>
  )
}

export function PointLineDiagram() {
  return (
    <svg viewBox="0 0 240 160" fill="none" className="gb-diagram">
      <rect x="0.5" y="0.5" width="239" height="159" rx="8" stroke="rgba(59,158,255,.12)" />
      {/* Axes */}
      <line x1="30" y1="130" x2="210" y2="130" stroke="rgba(255,255,255,.15)" strokeWidth="1" />
      <line x1="30" y1="130" x2="30" y2="20" stroke="rgba(255,255,255,.15)" strokeWidth="1" />
      {/* Points */}
      <circle cx="60" cy="90" r="4" fill="#3b9eff" />
      <text x="64" y="84" fill="#3b9eff" fontSize="8" fontFamily="monospace">A(2,3)</text>
      <circle cx="160" cy="50" r="4" fill="#22c55e" />
      <text x="164" y="44" fill="#22c55e" fontSize="8" fontFamily="monospace">B(7,1)</text>
      {/* Line */}
      <line x1="60" y1="90" x2="160" y2="50" stroke="rgba(59,158,255,.2)" strokeWidth="1" strokeDasharray="4,3" />
      {/* Distance label */}
      <text x="100" y="78" fill="#7d8299" fontSize="7" fontFamily="monospace">d = √((x₂-x₁)²+(y₂-y₁)²)</text>
      {/* Axis labels */}
      <text x="215" y="134" fill="#7d8299" fontSize="8" fontFamily="monospace">x</text>
      <text x="24" y="18" fill="#7d8299" fontSize="8" fontFamily="monospace">y</text>
    </svg>
  )
}

export function TriangleDiagram() {
  return (
    <svg viewBox="0 0 240 160" fill="none" className="gb-diagram">
      <rect x="0.5" y="0.5" width="239" height="159" rx="8" stroke="rgba(59,158,255,.12)" />
      {/* Equilateral */}
      <polygon points="40,120 90,30 140,120" fill="rgba(34,197,94,.08)" stroke="#22c55e" strokeWidth="1.2" />
      <text x="75" y="135" fill="#22c55e" fontSize="7" fontFamily="monospace">Equilateral</text>
      <text x="65" y="115" fill="#22c55e" fontSize="7" fontFamily="monospace">a</text>
      <text x="100" y="80" fill="#22c55e" fontSize="7" fontFamily="monospace">a</text>
      <text x="45" y="80" fill="#22c55e" fontSize="7" fontFamily="monospace">a</text>
      {/* Isosceles */}
      <polygon points="155,120 190,30 225,120" fill="rgba(59,158,255,.08)" stroke="#3b9eff" strokeWidth="1.2" />
      <text x="178" y="135" fill="#3b9eff" fontSize="7" fontFamily="monospace">Isosceles</text>
      <line x1="190" y1="30" x2="215" y2="120" stroke="#3b9eff" strokeWidth=".8" />
      <line x1="190" y1="30" x2="165" y2="120" stroke="#3b9eff" strokeWidth=".8" />
      <text x="195" y="80" fill="#3b9eff" fontSize="7" fontFamily="monospace">b</text>
      <text x="175" y="80" fill="#3b9eff" fontSize="7" fontFamily="monospace">b</text>
      <text x="183" y="118" fill="#3b9eff" fontSize="7" fontFamily="monospace">a</text>
    </svg>
  )
}

export function RightTrianglePythagorean() {
  return (
    <svg viewBox="0 0 240 160" fill="none" className="gb-diagram">
      <rect x="0.5" y="0.5" width="239" height="159" rx="8" stroke="rgba(59,158,255,.12)" />
      {/* Right triangle */}
      <polygon points="30,130 30,30 180,130" fill="rgba(59,158,255,.08)" stroke="#3b9eff" strokeWidth="1.2" />
      {/* Right angle marker */}
      <polyline points="30,110 50,110 50,130" stroke="#3b9eff" strokeWidth=".8" fill="none" />
      {/* Labels */}
      <text x="18" y="85" fill="#3b9eff" fontSize="9" fontFamily="monospace" transform="rotate(-90,18,85)">a</text>
      <text x="95" y="142" fill="#22c55e" fontSize="9" fontFamily="monospace">b</text>
      <text x="90" y="75" fill="#ef4444" fontSize="9" fontFamily="monospace">c</text>
      {/* Formula */}
      <text x="60" y="18" fill="#e8eaf0" fontSize="11" fontFamily="monospace" fontWeight="bold">a² + b² = c²</text>
      {/* Squares on sides visualization */}
      <rect x="30" y="30" width="20" height="20" fill="rgba(59,158,255,.08)" stroke="#3b9eff" strokeWidth=".5" strokeDasharray="2,2" rx="1" />
      <text x="34" y="42" fill="#7d8299" fontSize="6" fontFamily="monospace">a²</text>
      <rect x="50" y="110" width="50" height="20" fill="rgba(34,197,94,.08)" stroke="#22c55e" strokeWidth=".5" strokeDasharray="2,2" rx="1" />
      <text x="60" y="124" fill="#7d8299" fontSize="6" fontFamily="monospace">b²</text>
      <text x="114" y="72" fill="#e8eaf0" fontSize="7" fontFamily="monospace">c = √(a² + b²)</text>
    </svg>
  )
}

export function RectangleSquareDiagram() {
  return (
    <svg viewBox="0 0 240 160" fill="none" className="gb-diagram">
      <rect x="0.5" y="0.5" width="239" height="159" rx="8" stroke="rgba(59,158,255,.12)" />
      {/* Rectangle */}
      <rect x="20" y="30" width="80" height="50" fill="rgba(59,158,255,.08)" stroke="#3b9eff" strokeWidth="1.2" rx="2" />
      <text x="50" y="62" fill="#3b9eff" fontSize="9" fontFamily="monospace">Rectangle</text>
      <line x1="20" y1="25" x2="100" y2="25" stroke="#ef4444" strokeWidth=".8" strokeDasharray="3,2" />
      <text x="44" y="21" fill="#ef4444" fontSize="7" fontFamily="monospace">width (w)</text>
      <line x1="105" y1="30" x2="105" y2="80" stroke="#22c55e" strokeWidth=".8" strokeDasharray="3,2" />
      <text x="108" y="60" fill="#22c55e" fontSize="7" fontFamily="monospace">h</text>
      <text x="20" y="110" fill="#7d8299" fontSize="7" fontFamily="monospace">Area = w × h</text>
      <text x="20" y="125" fill="#7d8299" fontSize="7" fontFamily="monospace">Perimeter = 2(w + h)</text>

      {/* Square */}
      <rect x="140" y="30" width="50" height="50" fill="rgba(34,197,94,.08)" stroke="#22c55e" strokeWidth="1.2" rx="2" />
      <text x="152" y="62" fill="#22c55e" fontSize="9" fontFamily="monospace">Square</text>
      <line x1="140" y1="25" x2="190" y2="25" stroke="#ef4444" strokeWidth=".8" strokeDasharray="3,2" />
      <text x="155" y="21" fill="#ef4444" fontSize="7" fontFamily="monospace">side (s)</text>
      <text x="145" y="110" fill="#7d8299" fontSize="7" fontFamily="monospace">Area = s²</text>
      <text x="145" y="125" fill="#7d8299" fontSize="7" fontFamily="monospace">Perimeter = 4s</text>
      {/* Right angle marks */}
      <polyline points="24,80 24,76 28,76" stroke="#3b9eff" strokeWidth=".6" fill="none" />
      <polyline points="144,80 144,76 148,76" stroke="#22c55e" strokeWidth=".6" fill="none" />
    </svg>
  )
}

export function CircleDiagram() {
  return (
    <svg viewBox="0 0 240 160" fill="none" className="gb-diagram">
      <rect x="0.5" y="0.5" width="239" height="159" rx="8" stroke="rgba(59,158,255,.12)" />
      {/* Circle */}
      <circle cx="120" cy="80" r="55" fill="rgba(59,158,255,.06)" stroke="#3b9eff" strokeWidth="1.2" />
      {/* Center */}
      <circle cx="120" cy="80" r="2.5" fill="#ef4444" />
      <text x="124" y="76" fill="#ef4444" fontSize="7" fontFamily="monospace">O</text>
      {/* Radius */}
      <line x1="120" y1="80" x2="150" y2="45" stroke="#22c55e" strokeWidth="1" />
      <text x="128" y="60" fill="#22c55e" fontSize="7" fontFamily="monospace">r</text>
      {/* Diameter */}
      <line x1="75" y1="115" x2="165" y2="45" stroke="#ef4444" strokeWidth="1" strokeDasharray="4,3" />
      <text x="110" y="102" fill="#ef4444" fontSize="7" fontFamily="monospace">d = 2r</text>
      {/* Chord */}
      <line x1="80" y1="50" x2="160" y2="90" stroke="#eab308" strokeWidth="1" />
      <text x="125" y="68" fill="#eab308" fontSize="7" fontFamily="monospace">chord</text>
      {/* Arc */}
      <path d="M 80 50 Q 70 30 95 28" stroke="#a855f7" strokeWidth="1" fill="none" strokeDasharray="3,2" />
      <text x="62" y="26" fill="#a855f7" fontSize="7" fontFamily="monospace">arc</text>
      {/* Formulas */}
      <text x="50" y="146" fill="#7d8299" fontSize="7" fontFamily="monospace">C = 2πr</text>
      <text x="120" y="146" fill="#7d8299" fontSize="7" fontFamily="monospace">A = πr²</text>
    </svg>
  )
}

export function CartesianPlaneDiagram() {
  return (
    <svg viewBox="0 0 240 160" fill="none" className="gb-diagram">
      <rect x="0.5" y="0.5" width="239" height="159" rx="8" stroke="rgba(59,158,255,.12)" />
      {/* Axes */}
      <line x1="120" y1="140" x2="120" y2="10" stroke="rgba(255,255,255,.2)" strokeWidth="1" />
      <line x1="10" y1="75" x2="230" y2="75" stroke="rgba(255,255,255,.2)" strokeWidth="1" />
      {/* Quadrant labels */}
      <text x="165" y="30" fill="rgba(59,158,255,.15)" fontSize="24" fontFamily="monospace">Q1</text>
      <text x="60" y="30" fill="rgba(59,158,255,.15)" fontSize="24" fontFamily="monospace">Q2</text>
      <text x="60" y="130" fill="rgba(59,158,255,.15)" fontSize="24" fontFamily="monospace">Q3</text>
      <text x="165" y="130" fill="rgba(59,158,255,.15)" fontSize="24" fontFamily="monospace">Q4</text>
      {/* Points */}
      <circle cx="160" cy="40" r="3.5" fill="#3b9eff" />
      <text x="164" y="36" fill="#3b9eff" fontSize="7" fontFamily="monospace">(3, 2)</text>
      <circle cx="75" cy="45" r="3.5" fill="#22c55e" />
      <text x="40" y="42" fill="#22c55e" fontSize="7" fontFamily="monospace">(-2, 3)</text>
      <circle cx="60" cy="100" r="3.5" fill="#ef4444" />
      <text x="25" y="117" fill="#ef4444" fontSize="7" fontFamily="monospace">(-3, -1)</text>
      <circle cx="180" cy="105" r="3.5" fill="#eab308" />
      <text x="183" y="120" fill="#eab308" fontSize="7" fontFamily="monospace">(4, -2)</text>
      {/* Origin */}
      <text x="112" y="70" fill="#7d8299" fontSize="7" fontFamily="monospace">O(0,0)</text>
      {/* Axis labels */}
      <text x="230" y="79" fill="#7d8299" fontSize="8" fontFamily="monospace">x</text>
      <text x="124" y="8" fill="#7d8299" fontSize="8" fontFamily="monospace">y</text>
    </svg>
  )
}

export function SlopeLineDiagram() {
  return (
    <svg viewBox="0 0 240 160" fill="none" className="gb-diagram">
      <rect x="0.5" y="0.5" width="239" height="159" rx="8" stroke="rgba(59,158,255,.12)" />
      {/* Axes */}
      <line x1="30" y1="130" x2="210" y2="130" stroke="rgba(255,255,255,.15)" strokeWidth="1" />
      <line x1="30" y1="130" x2="30" y2="20" stroke="rgba(255,255,255,.15)" strokeWidth="1" />
      {/* Positive slope line */}
      <line x1="50" y1="110" x2="190" y2="30" stroke="#3b9eff" strokeWidth="1.5" />
      <circle cx="50" cy="110" r="3" fill="#3b9eff" />
      <text x="54" y="106" fill="#3b9eff" fontSize="7" fontFamily="monospace">(x₁,y₁)</text>
      <circle cx="190" cy="30" r="3" fill="#3b9eff" />
      <text x="172" y="24" fill="#3b9eff" fontSize="7" fontFamily="monospace">(x₂,y₂)</text>
      {/* Rise & Run */}
      <line x1="50" y1="110" x2="190" y2="110" stroke="#ef4444" strokeWidth=".8" strokeDasharray="3,2" />
      <text x="110" y="126" fill="#ef4444" fontSize="7" fontFamily="monospace">run = Δx</text>
      <line x1="190" y1="110" x2="190" y2="30" stroke="#22c55e" strokeWidth=".8" strokeDasharray="3,2" />
      <text x="194" y="72" fill="#22c55e" fontSize="7" fontFamily="monospace">rise = Δy</text>
      {/* Formula */}
      <text x="60" y="16" fill="#e8eaf0" fontSize="10" fontFamily="monospace" fontWeight="bold">m = Δy / Δx</text>
      <text x="60" y="30" fill="#7d8299" fontSize="8" fontFamily="monospace">m = (y₂-y₁)/(x₂-x₁)</text>
      {/* Slope values */}
      <text x="40" y="152" fill="#7d8299" fontSize="7" fontFamily="monospace">m &gt; 0: ↗</text>
      <text x="110" y="152" fill="#7d8299" fontSize="7" fontFamily="monospace">m &lt; 0: ↘</text>
      <text x="180" y="152" fill="#7d8299" fontSize="7" fontFamily="monospace">m = 0: →</text>
    </svg>
  )
}

export function DistanceDiagram() {
  return (
    <svg viewBox="0 0 240 160" fill="none" className="gb-diagram">
      <rect x="0.5" y="0.5" width="239" height="159" rx="8" stroke="rgba(59,158,255,.12)" />
      {/* Grid background */}
      {[0,1,2,3,4].map(i => <line key={`h${i}`} x1={20+i*50} y1={20} x2={20+i*50} y2={140} stroke="rgba(59,158,255,.04)" strokeWidth=".5"/>)}
      {[0,1,2,3,4].map(i => <line key={`v${i}`} x1={20} y1={20+i*30} x2={220} y2={20+i*30} stroke="rgba(59,158,255,.04)" strokeWidth=".5"/>)}
      {/* Euclidean */}
      <line x1="45" y1="100" x2="185" y2="45" stroke="#3b9eff" strokeWidth="1.5" />
      <circle cx="45" cy="100" r="3.5" fill="#3b9eff" />
      <text x="20" y="116" fill="#3b9eff" fontSize="7" fontFamily="monospace">A(2,4)</text>
      <circle cx="185" cy="45" r="3.5" fill="#22c55e" />
      <text x="176" y="40" fill="#22c55e" fontSize="7" fontFamily="monospace">B(7,1)</text>
      <text x="100" y="78" fill="#e8eaf0" fontSize="9" fontFamily="monospace">Euclidean</text>
      <text x="95" y="92" fill="#7d8299" fontSize="7" fontFamily="monospace">√((x₂-x₁)²+(y₂-y₁)²)</text>
      {/* Manhattan path */}
      <polyline points="45,100 185,100 185,45" stroke="#ef4444" strokeWidth="1" strokeDasharray="4,3" fill="none" />
      <text x="95" y="138" fill="#ef4444" fontSize="7" fontFamily="monospace">Manhattan: |Δx| + |Δy|</text>
      {/* Chebyshev */}
      <text x="95" y="152" fill="#eab308" fontSize="7" fontFamily="monospace">Chebyshev: max(|Δx|, |Δy|)</text>
    </svg>
  )
}

export function PolygonDiagram() {
  return (
    <svg viewBox="0 0 240 160" fill="none" className="gb-diagram">
      <rect x="0.5" y="0.5" width="239" height="159" rx="8" stroke="rgba(59,158,255,.12)" />
      {/* Pentagon */}
      <polygon points="120,20 200,60 180,130 60,130 40,60" fill="rgba(59,158,255,.06)" stroke="#3b9eff" strokeWidth="1.2" />
      <text x="105" y="140" fill="#3b9eff" fontSize="7" fontFamily="monospace">Pentagon (n=5)</text>
      {/* Hexagon */}
      <polygon points="120,160 185,130 185,60 120,30 55,60 55,130" fill="rgba(22,197,94,.06)" stroke="#22c55e" strokeWidth="1" strokeDasharray="4,3" />
      <text x="175" y="36" fill="#22c55e" fontSize="7" fontFamily="monospace">Hexagon (n=6)</text>
      {/* Shoelace visualization */}
      <text x="20" y="18" fill="#e8eaf0" fontSize="8" fontFamily="monospace">Shoelace Formula:</text>
      <text x="20" y="32" fill="#7d8299" fontSize="7" fontFamily="monospace">A = ½ |∑(xᵢyᵢ₊₁ − xᵢ₊₁yᵢ)|</text>
      {/* Interior angle */}
      <path d="M 120 20 Q 135 25 140 40" stroke="#eab308" strokeWidth=".8" fill="none" />
      <text x="125" y="10" fill="#eab308" fontSize="6" fontFamily="monospace">θ = (n-2)×180°/n</text>
    </svg>
  )
}

export function GridTraversalDiagram() {
  return (
    <svg viewBox="0 0 240 160" fill="none" className="gb-diagram">
      <rect x="0.5" y="0.5" width="239" height="159" rx="8" stroke="rgba(59,158,255,.12)" />
      {/* Grid */}
      {[0,1,2,3,4,5].map(i => <line key={`h${i}`} x1={15} y1={15+i*23} x2={225} y2={15+i*23} stroke="rgba(255,255,255,.08)" strokeWidth=".5"/>)}
      {[0,1,2,3,4,5].map(i => <line key={`v${i}`} x1={15+i*35} y1={15} x2={15+i*35} y2={145} stroke="rgba(255,255,255,.08)" strokeWidth=".5"/>)}
      {/* BFS path */}
      <rect x="50" y="38" width="35" height="23" fill="rgba(59,158,255,.15)" stroke="#3b9eff" strokeWidth="1" rx="2" />
      <text x="59" y="53" fill="#fff" fontSize="7" fontFamily="monospace">1</text>
      <rect x="85" y="38" width="35" height="23" fill="rgba(59,158,255,.15)" stroke="#3b9eff" strokeWidth="1" rx="2" />
      <text x="94" y="53" fill="#fff" fontSize="7" fontFamily="monospace">2</text>
      <rect x="120" y="38" width="35" height="23" fill="rgba(59,158,255,.12)" stroke="#3b9eff" strokeWidth="1" rx="2" />
      <text x="131" y="53" fill="#fff" fontSize="7" fontFamily="monospace">3</text>
      <rect x="120" y="61" width="35" height="23" fill="rgba(34,197,94,.12)" stroke="#22c55e" strokeWidth="1" rx="2" />
      <text x="131" y="76" fill="#fff" fontSize="7" fontFamily="monospace">4</text>
      <rect x="120" y="84" width="35" height="23" fill="rgba(34,197,94,.12)" stroke="#22c55e" strokeWidth="1" rx="2" />
      <text x="131" y="99" fill="#fff" fontSize="7" fontFamily="monospace">5</text>
      <rect x="85" y="84" width="35" height="23" fill="rgba(34,197,94,.08)" stroke="#22c55e" strokeWidth="1" rx="2" />
      <text x="94" y="99" fill="#fff" fontSize="7" fontFamily="monospace">6</text>
      <rect x="50" y="84" width="35" height="23" fill="rgba(239,68,68,.08)" stroke="#ef4444" strokeWidth="1" rx="2" />
      <text x="59" y="99" fill="#fff" fontSize="7" fontFamily="monospace">7</text>
      {/* Legend */}
      <text x="15" y="155" fill="#3b9eff" fontSize="6" fontFamily="monospace">● BFS (level by level)</text>
      <text x="130" y="155" fill="#22c55e" fontSize="6" fontFamily="monospace">● DFS (depth first)</text>
    </svg>
  )
}

export function AreaPerimeterDiagram() {
  return (
    <svg viewBox="0 0 240 160" fill="none" className="gb-diagram">
      <rect x="0.5" y="0.5" width="239" height="159" rx="8" stroke="rgba(59,158,255,.12)" />
      {/* Rectangle area */}
      <rect x="15" y="20" width="90" height="60" fill="rgba(59,158,255,.08)" stroke="#3b9eff" strokeWidth="1" rx="2" />
      <text x="50" y="55" fill="#3b9eff" fontSize="7" fontFamily="monospace">Area</text>
      <text x="18" y="106" fill="#3b9eff" fontSize="7" fontFamily="monospace">A = l × w</text>
      {/* Circle area */}
      <circle cx="180" cy="50" r="35" fill="rgba(34,197,94,.06)" stroke="#22c55e" strokeWidth="1" />
      <text x="173" y="54" fill="#22c55e" fontSize="7" fontFamily="monospace">Area</text>
      <text x="160" y="106" fill="#22c55e" fontSize="7" fontFamily="monospace">A = πr²</text>
      {/* Triangle area */}
      <polygon points="15,115 60,75 105,115" fill="rgba(239,68,68,.06)" stroke="#ef4444" strokeWidth="1" />
      <line x1="60" y1="75" x2="60" y2="115" stroke="#ef4444" strokeWidth=".6" strokeDasharray="3,2" />
      <text x="64" y="98" fill="#ef4444" fontSize="5" fontFamily="monospace">h</text>
      <text x="42" y="130" fill="#ef4444" fontSize="7" fontFamily="monospace">A = ½ × b × h</text>
      {/* Irregular polygon area (shoelace) */}
      <polygon points="120,130 145,115 170,120 190,100 170,85 145,90 120,100 110,115" fill="rgba(168,85,247,.06)" stroke="#a855f7" strokeWidth=".8" />
      <text x="133" y="145" fill="#a855f7" fontSize="7" fontFamily="monospace">Shoelace: ½|∑(xᵢyᵢ₊₁−xᵢ₊₁yᵢ)|</text>
    </svg>
  )
}

export function AngleRotationDiagram() {
  return (
    <svg viewBox="0 0 240 160" fill="none" className="gb-diagram">
      <rect x="0.5" y="0.5" width="239" height="159" rx="8" stroke="rgba(59,158,255,.12)" />
      {/* Acute */}
      <line x1="20" y1="130" x2="80" y2="130" stroke="#3b9eff" strokeWidth="1.2" />
      <line x1="20" y1="130" x2="65" y2="70" stroke="#3b9eff" strokeWidth="1.2" />
      <path d="M 50 130 A 30 30 0 0 1 53 115" stroke="#3b9eff" strokeWidth=".8" fill="none" />
      <text x="42" y="118" fill="#3b9eff" fontSize="6" fontFamily="monospace">θ &lt; 90°</text>
      <text x="35" y="148" fill="#3b9eff" fontSize="6" fontFamily="monospace">Acute</text>

      {/* Right */}
      <line x1="90" y1="130" x2="140" y2="130" stroke="#22c55e" strokeWidth="1.2" />
      <line x1="90" y1="130" x2="90" y2="75" stroke="#22c55e" strokeWidth="1.2" />
      <polyline points="90,115 105,115 105,130" stroke="#22c55e" strokeWidth=".8" fill="none" />
      <text x="80" y="148" fill="#22c55e" fontSize="6" fontFamily="monospace">Right (90°)</text>

      {/* Rotation */}
      <circle cx="190" cy="85" r="35" fill="rgba(239,68,68,.04)" stroke="#ef4444" strokeWidth="1" />
      <line x1="190" y1="85" x2="190" y2="50" stroke="#ef4444" strokeWidth="1" />
      <line x1="190" y1="85" x2="220" y2="65" stroke="#ef4444" strokeWidth="1" />
      <path d="M 190 55 A 5 5 0 0 1 195 58" stroke="#ef4444" strokeWidth=".8" fill="none" />
      <path d="M 210 82 A 25 25 0 0 1 215 72" stroke="#ef4444" strokeWidth=".8" fill="none" />
      <text x="195" y="148" fill="#ef4444" fontSize="6" fontFamily="monospace">Rotation θ</text>
      <text x="205" y="95" fill="#7d8299" fontSize="7" fontFamily="monospace">(x',y')</text>

      {/* Transform matrix */}
      <text x="135" y="18" fill="#7d8299" fontSize="6" fontFamily="monospace">[x'] = [cosθ -sinθ][x]</text>
      <text x="135" y="28" fill="#7d8299" fontSize="6" fontFamily="monospace">[y']   [sinθ  cosθ][y]</text>
    </svg>
  )
}

export function ConvexHullDiagram() {
  return (
    <svg viewBox="0 0 240 160" fill="none" className="gb-diagram">
      <rect x="0.5" y="0.5" width="239" height="159" rx="8" stroke="rgba(59,158,255,.12)" />
      {/* Convex hull polygon */}
      <polygon points="30,80 60,25 130,20 190,40 210,95 180,140 100,145 45,130" fill="rgba(59,158,255,.08)" stroke="#3b9eff" strokeWidth="1.5" />
      {/* Interior points */}
      <circle cx="80" cy="60" r="2.5" fill="rgba(255,255,255,.3)" />
      <circle cx="120" cy="90" r="2.5" fill="rgba(255,255,255,.3)" />
      <circle cx="95" cy="110" r="2.5" fill="rgba(255,255,255,.3)" />
      <circle cx="150" cy="60" r="2.5" fill="rgba(255,255,255,.3)" />
      <circle cx="100" cy="45" r="2.5" fill="rgba(255,255,255,.3)" />
      <circle cx="170" cy="90" r="2.5" fill="rgba(255,255,255,.3)" />
      <circle cx="65" cy="95" r="2.5" fill="rgba(255,255,255,.3)" />
      {/* Hull points */}
      <circle cx="30" cy="80" r="4" fill="#3b9eff" stroke="#fff" strokeWidth="1" />
      <circle cx="60" cy="25" r="4" fill="#3b9eff" stroke="#fff" strokeWidth="1" />
      <circle cx="130" cy="20" r="4" fill="#3b9eff" stroke="#fff" strokeWidth="1" />
      <circle cx="190" cy="40" r="4" fill="#3b9eff" stroke="#fff" strokeWidth="1" />
      <circle cx="210" cy="95" r="4" fill="#3b9eff" stroke="#fff" strokeWidth="1" />
      <circle cx="180" cy="140" r="4" fill="#3b9eff" stroke="#fff" strokeWidth="1" />
      <circle cx="100" cy="145" r="4" fill="#3b9eff" stroke="#fff" strokeWidth="1" />
      <circle cx="45" cy="130" r="4" fill="#3b9eff" stroke="#fff" strokeWidth="1" />
      {/* Labels */}
      <text x="65" y="20" fill="#3b9eff" fontSize="7" fontFamily="monospace">Convex Hull</text>
      <text x="20" y="158" fill="#7d8299" fontSize="7" fontFamily="monospace">● interior points</text>
      <text x="140" y="158" fill="#3b9eff" fontSize="7" fontFamily="monospace">● hull = extreme points</text>
    </svg>
  )
}

export function FractalDiagram() {
  return (
    <svg viewBox="0 0 240 160" fill="none" className="gb-diagram">
      <rect x="0.5" y="0.5" width="239" height="159" rx="8" stroke="rgba(59,158,255,.12)" />
      {/* Sierpinski Triangle */}
      <polygon points="120,10 230,150 10,150" fill="rgba(59,158,255,.03)" stroke="#3b9eff" strokeWidth=".8" />
      <polygon points="120,70 175,130 65,130" fill="rgba(59,158,255,.06)" stroke="#3b9eff" strokeWidth=".6" />
      <polygon points="120,95 142,130 98,130" fill="rgba(59,158,255,.1)" stroke="#3b9eff" strokeWidth=".4" />
      <polygon points="92,130 120,130 106,112" fill="rgba(59,158,255,.08)" stroke="#3b9eff" strokeWidth=".3" />
      <polygon points="120,130 148,130 134,112" fill="rgba(59,158,255,.08)" stroke="#3b9eff" strokeWidth=".3" />
      {/* Scale label */}
      <text x="100" y="158" fill="#7d8299" fontSize="7" fontFamily="monospace">Sierpinski Triangle</text>
      {/* 3D cube hint */}
      <polygon points="200,30 230,45 230,75 200,60" fill="rgba(34,197,94,.06)" stroke="#22c55e" strokeWidth=".8" />
      <polygon points="200,30 210,20 240,35 230,45" fill="rgba(34,197,94,.04)" stroke="#22c55e" strokeWidth=".6" />
      <polygon points="230,45 240,35 240,65 230,75" fill="rgba(34,197,94,.05)" stroke="#22c55e" strokeWidth=".6" />
      <text x="200" y="90" fill="#22c55e" fontSize="7" fontFamily="monospace">3D Geometry</text>
    </svg>
  )
}

// Map chapter numbers to their primary diagram
export const CHAPTER_DIAGRAMS: Record<number, React.FC> = {
  1: GridDiagram,
  2: PointLineDiagram,
  3: TriangleDiagram,
  4: RightTrianglePythagorean,
  5: RectangleSquareDiagram,
  6: CircleDiagram,
  7: CartesianPlaneDiagram,
  8: SlopeLineDiagram,
  9: DistanceDiagram,
  10: PolygonDiagram,
  11: GridTraversalDiagram,
  12: AreaPerimeterDiagram,
  13: AngleRotationDiagram,
  14: ConvexHullDiagram,
  15: FractalDiagram,
}

// Section-specific diagrams to inject at key headings
export interface DiagramInjectPoint {
  chapter: number
  sectionHeading: string  // substring match on heading text
  diagram: React.FC
  position: 'after-heading' | 'after-paragraph'
}

export const SECTION_DIAGRAMS: DiagramInjectPoint[] = [
  { chapter: 1, sectionHeading: '1. INTRODUCTION', diagram: GridDiagram, position: 'after-paragraph' },
  { chapter: 2, sectionHeading: '2. CORE CONCEPTS', diagram: PointLineDiagram, position: 'after-heading' },
  { chapter: 3, sectionHeading: '2. CORE CONCEPTS', diagram: TriangleDiagram, position: 'after-heading' },
  { chapter: 4, sectionHeading: '2. CORE CONCEPTS', diagram: RightTrianglePythagorean, position: 'after-heading' },
  { chapter: 5, sectionHeading: '1. INTRODUCTION', diagram: RectangleSquareDiagram, position: 'after-paragraph' },
  { chapter: 6, sectionHeading: '2. CORE CONCEPTS', diagram: CircleDiagram, position: 'after-heading' },
  { chapter: 7, sectionHeading: '1. INTRODUCTION', diagram: CartesianPlaneDiagram, position: 'after-paragraph' },
  { chapter: 8, sectionHeading: '2. CORE CONCEPTS', diagram: SlopeLineDiagram, position: 'after-heading' },
  { chapter: 9, sectionHeading: '1. INTRODUCTION', diagram: DistanceDiagram, position: 'after-paragraph' },
  { chapter: 10, sectionHeading: '2. CORE CONCEPTS', diagram: PolygonDiagram, position: 'after-heading' },
  { chapter: 11, sectionHeading: '1. INTRODUCTION', diagram: GridTraversalDiagram, position: 'after-paragraph' },
  { chapter: 12, sectionHeading: '2. CORE CONCEPTS', diagram: AreaPerimeterDiagram, position: 'after-heading' },
  { chapter: 13, sectionHeading: '2. CORE CONCEPTS', diagram: AngleRotationDiagram, position: 'after-heading' },
  { chapter: 14, sectionHeading: '2. CORE CONCEPTS', diagram: ConvexHullDiagram, position: 'after-heading' },
  { chapter: 15, sectionHeading: '2. CORE CONCEPTS', diagram: FractalDiagram, position: 'after-heading' },
]
