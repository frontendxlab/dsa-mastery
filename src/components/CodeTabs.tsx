import { useState } from 'react'

interface CodeTabsProps {
  blocks: { lang: string; code: string; caption?: string | null }[]
}

const LANG_LABELS: Record<string, string> = {
  python: 'Python',
  py: 'Python',
  cpp: 'C++',
  'c++': 'C++',
  c: 'C',
  java: 'Java',
  javascript: 'JavaScript',
  js: 'JavaScript',
  go: 'Go',
  ts: 'TypeScript',
  rust: 'Rust',
  swift: 'Swift',
  kotlin: 'Kotlin',
}

const LANG_ICONS: Record<string, string> = {
  python: '🐍',
  py: '🐍',
  cpp: '⚡',
  'c++': '⚡',
  java: '☕',
  javascript: '🟨',
  js: '🟨',
  go: '🔷',
}

function highlight(line: string, lang: string): string {
  const kw: Record<string, RegExp> = {
    python: /\b(def|class|if|elif|else|for|while|return|import|from|in|not|and|or|True|False|None|try|except|raise|with|as|break|continue|lambda|yield|async|await|self|pass|del|global|nonlocal|print|range|len|int|str|float|list|dict|set|tuple|bool|input|open|sorted|map|filter|zip|enumerate|reversed|any|all|sum|min|max|abs|round|pow|divmod|isinstance|hasattr|getattr|setattr|type|super)\b/g,
    cpp: /\b(int|float|double|char|bool|void|long|short|unsigned|auto|const|static|class|struct|public|private|protected|virtual|override|template|typename|if|else|for|while|do|return|break|continue|switch|case|default|try|catch|throw|new|delete|using|namespace|include|define|nullptr|true|false|vector|map|set|unordered_map|unordered_set|pair|queue|stack|string|size_t|std|auto|constexpr|noexcept|explicit|friend|inline|mutable|this|enum)\b/g,
    java: /\b(public|private|protected|class|interface|enum|extends|implements|static|final|void|int|long|double|float|boolean|char|String|List|ArrayList|Map|HashMap|Set|HashSet|Queue|LinkedList|Stack|if|else|for|while|do|return|break|continue|switch|case|default|try|catch|throw|throws|new|null|true|false|this|super|import|package|abstract|synchronized|volatile|transient|instanceof|native)\b/g,
  }

  const escaped = line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  let hl = escaped
    .replace(/(\/\/.*|#.*)/g, '<span class="gb-syn-comment">$1</span>')
    .replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, '<span class="gb-syn-string">$1</span>')
    .replace(/\b(\d+\.?\d*)\b/g, '<span class="gb-syn-number">$1</span>')
  if (kw[lang]) hl = hl.replace(kw[lang], '<span class="gb-syn-keyword">$1</span>')
  return hl
}

export default function CodeTabs({ blocks }: CodeTabsProps) {
  const [activeIdx, setActiveIdx] = useState(0)
  if (!blocks.length) return null
  const active = blocks[activeIdx] ?? blocks[0]

  return (
    <div className="gb-code-tabs">
      <div className="gb-code-tabs-header">
        <div className="gb-code-tabs-labels">
          {blocks.map((b, i) => (
            <button
              key={i}
              className={`gb-code-tab-label${i === activeIdx ? ' active' : ''}`}
              onClick={() => setActiveIdx(i)}
            >
              {LANG_ICONS[b.lang] && <span className="gb-code-tab-icon">{LANG_ICONS[b.lang]}</span>}
              {LANG_LABELS[b.lang] || b.lang}
            </button>
          ))}
        </div>
        <span className="gb-code-tabs-count">{blocks.length} languages</span>
      </div>
      {active.caption && <div className="gb-code-caption">{active.caption}</div>}
      <pre className={`gb-code-block gb-lang-${active.lang}`}>
        <code dangerouslySetInnerHTML={{
          __html: active.code.split('\n').map(l => highlight(l, active.lang)).join('\n')
        }} />
      </pre>
    </div>
  )
}
