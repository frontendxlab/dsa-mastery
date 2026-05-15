import { useEffect, useState } from 'react'
import { codeToHtml, bundledThemes } from 'shiki'

interface ShikiCodeBlockProps {
  code: string
  lang?: string
  caption?: string
}

const THEME_LIGHT = 'github-light'
const THEME_DARK = 'github-dark'

export function ShikiCodeBlock({ code, lang = 'javascript', caption }: ShikiCodeBlockProps) {
  const [htmlLight, setHtmlLight] = useState<string>('')
  const [htmlDark, setHtmlDark] = useState<string>('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let mounted = true

    async function highlight() {
      try {
        const [light, dark] = await Promise.all([
          codeToHtml(code, {
            lang,
            theme: THEME_LIGHT,
          }),
          codeToHtml(code, {
            lang,
            theme: THEME_DARK,
          }),
        ])
        if (mounted) {
          setHtmlLight(light)
          setHtmlDark(dark)
        }
      } catch (e) {
        console.error('Shiki highlight failed:', e)
      }
    }

    highlight()

    return () => {
      mounted = false
    }
  }, [code, lang])

  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  if (!htmlLight) {
    return (
      <div className="nb-code-block my-6">
        {caption && <div className="nb-code-caption">{caption}</div>}
        <pre className="overflow-x-auto p-4 text-sm leading-relaxed opacity-50">
          <code>{code}</code>
        </pre>
      </div>
    )
  }

  return (
    <div className="nb-code-block my-6">
      {caption && <div className="nb-code-caption">{caption}</div>}
      <div className="relative">
        <button
          type="button"
          onClick={copy}
          className="absolute right-3 top-3 z-10 nb-chip bg-white text-xs py-1 px-2"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>

        <style>{`
          .light .shiki-block-light { display: block; }
          .light .shiki-block-dark { display: none; }
          .dark .shiki-block-light { display: none; }
          .dark .shiki-block-dark { display: block; }

          .shiki-block-light .shiki,
          .shiki-block-dark .shiki {
            margin: 0 !important;
            border-radius: 0 !important;
            background: var(--nb-code-bg) !important;
          }

          .shiki-code-wrapper pre {
            margin: 0 !important;
            background: transparent !important;
          }

          .shiki-code-wrapper code {
            background: transparent !important;
          }

          .shiki-code-wrapper .line {
            min-height: 1.5em;
          }
        `}</style>

        <div className="shiki-code-wrapper overflow-x-auto">
          <div
            className="shiki-block-light p-4"
            dangerouslySetInnerHTML={{ __html: htmlLight }}
          />
          <div
            className="shiki-block-dark p-4 hidden"
            dangerouslySetInnerHTML={{ __html: htmlDark }}
          />
        </div>
      </div>
    </div>
  )
}

export function SimpleCodeBlock({ code, caption }: { code: string; caption?: string }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="nb-code-block my-6">
      {caption && <div className="nb-code-caption">{caption}</div>}
      <div className="relative">
        <button
          type="button"
          onClick={copy}
          className="absolute right-3 top-3 z-10 nb-chip bg-white text-xs py-1 px-2"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
        <pre className="overflow-x-auto p-4 pr-20 text-sm leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}
