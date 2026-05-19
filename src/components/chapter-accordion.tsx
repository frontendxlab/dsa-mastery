import React, { useState, type FC } from 'react'
import { motion, MotionConfig, type Transition } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import useMeasure from 'react-use-measure'
import type { BookChapter, BookProblem, BookPart } from '#/data/books'

const springTransition: Transition = {
  type: 'spring',
  stiffness: 600,
  damping: 50,
  mass: 1,
}

const DIFF_COLOR: Record<string, string> = {
  Easy: '#34d399',
  Medium: '#fbbf24',
  Hard: '#f87171',
  Classic: '#a78bfa',
  Puzzle: '#60a5fa',
}

const PLATFORM_COLOR: Record<string, string> = {
  LeetCode: '#f97316', Codeforces: '#3b82f6', CSES: '#10b981',
  UVa: '#8b5cf6', Kattis: '#06b6d4', SPOJ: '#ec4899',
  AtCoder: '#f59e0b', HackerRank: '#22c55e',
}

interface ChapterItemData {
  id: number
  chapter: BookChapter
  accent: string
}

interface ChapterItemProps {
  item: ChapterItemData
  setOpenId: (id: number | null) => void
  index: number
  total: number
  openIndex: number
}

function ProblemRow({ p, accent }: { p: BookProblem; accent: string }) {
  const dColor = p.difficulty ? (DIFF_COLOR[p.difficulty] ?? 'var(--muted-foreground)') : 'var(--muted-foreground)'
  const practiceUrl = p.matchUrl ?? p.url ?? (p.lcNum ? `https://leetcode.com/problems/?search=${p.lcNum}` : null)
  const platformLabel = p.matchPlatform ?? p.platform ?? (p.lcNum ? 'LeetCode' : null)
  const pColor = platformLabel ? (PLATFORM_COLOR[platformLabel] ?? 'var(--muted-foreground)') : 'var(--muted-foreground)'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', fontSize: 14, flexWrap: 'wrap' }}>
      <span style={{ color: 'var(--muted-foreground)', fontFamily: 'ui-monospace,monospace', minWidth: 36, fontSize: 12 }}>{p.id}</span>
      {practiceUrl ? (
        <a href={practiceUrl} target="_blank" rel="noreferrer"
          style={{ color: 'var(--foreground)', textDecoration: 'none', fontWeight: 500, lineHeight: 1.4 }}>
          {p.title}
        </a>
      ) : (
        <span style={{ color: 'var(--foreground)', fontWeight: 500, lineHeight: 1.4 }}>{p.title}</span>
      )}
      {p.hint && <span title={p.hint} style={{ cursor: 'help', fontSize: 13, opacity: 0.4 }}>💡</span>}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
        {(p.tags ?? []).slice(0, 2).map(t => (
          <span key={t} style={{ fontSize: 11, color: 'var(--muted-foreground)', opacity: 0.6 }}>{t}</span>
        ))}
      </div>
      {p.difficulty && (
        <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, border: '1px solid', color: dColor, borderColor: dColor + '44', background: dColor + '12' }}>
          {p.difficulty}
        </span>
      )}
      {practiceUrl && platformLabel && (
        <a href={practiceUrl} target="_blank" rel="noreferrer"
          style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, border: '1px solid', color: pColor, borderColor: pColor + '40', background: pColor + '10', textDecoration: 'none', fontWeight: 500 }}>
          {platformLabel} ↗
        </a>
      )}
    </div>
  )
}

function ChapterItem({ item, setOpenId, index, total, openIndex }: ChapterItemProps) {
  const [ref, bounds] = useMeasure()
  const isOpen = index === openIndex

  const isFirst = index === 0
  const isLast = index === total - 1

  const isBeforeOpen = index === openIndex - 1
  const isAfterOpen = index === openIndex + 1

  const isAlone = (isAfterOpen && isLast) || (isBeforeOpen && isFirst)

  const BORDER_WIDTH = '1px'
  const borderTopWidth = isFirst || isAfterOpen || isOpen ? BORDER_WIDTH : '0px'
  const borderBottomWidth = isLast || isBeforeOpen || isOpen ? BORDER_WIDTH : '0px'
  const borderLeftWidth = BORDER_WIDTH
  const borderRightWidth = BORDER_WIDTH

  let borderTopLeftRadius = 0
  let borderTopRightRadius = 0
  let borderBottomLeftRadius = 0
  let borderBottomRightRadius = 0

  if (isOpen || isAlone) {
    borderTopLeftRadius = 20
    borderTopRightRadius = 20
    borderBottomLeftRadius = 20
    borderBottomRightRadius = 20
  } else if (isBeforeOpen) {
    borderBottomLeftRadius = 20
    borderBottomRightRadius = 20
  } else if (isAfterOpen) {
    borderTopLeftRadius = 20
    borderTopRightRadius = 20
  } else if (isFirst) {
    borderTopLeftRadius = 20
    borderTopRightRadius = 20
  } else if (isLast) {
    borderBottomLeftRadius = 20
    borderBottomRightRadius = 20
  }

  const { chapter, accent } = item

  return (
    <MotionConfig transition={springTransition}>
      <motion.li layout>
        <motion.div
          animate={{
            borderTopLeftRadius,
            borderTopRightRadius,
            borderBottomLeftRadius,
            borderBottomRightRadius,
          }}
          style={{
            overflow: 'hidden',
            borderTopWidth,
            borderBottomWidth,
            borderLeftWidth,
            borderRightWidth,
            borderStyle: 'solid',
            borderColor: 'var(--border)',
            background: 'var(--card)',
            marginBlock: isOpen ? '10px' : '0px',
            willChange: 'transform',
          }}
        >
          <button
            onClick={() => setOpenId(isOpen ? null : item.id)}
            style={{
              display: 'flex',
              width: '100%',
              cursor: 'pointer',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 16px',
              border: 'none',
              background: 'none',
              color: 'inherit',
              font: 'inherit',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 24,
                  height: 24,
                  borderRadius: 4,
                  fontSize: 11,
                  fontWeight: 700,
                  color: accent,
                  border: `1px solid ${accent}33`,
                  background: `${accent}11`,
                  fontFamily: 'ui-monospace,monospace',
                }}
              >
                {chapter.num}
              </span>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--foreground)' }}>
                {chapter.title}
              </span>
              {chapter.page && (
                <span style={{ fontSize: 12, color: 'var(--muted-foreground)', display: 'none' }} className="md:inline">
                  p.{chapter.page}
                </span>
              )}
              <span style={{ fontSize: 12, color: 'var(--muted-foreground)', display: 'none' }} className="md:inline">
                {chapter.problems.length} problems
              </span>
            </div>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
              <ChevronDown style={{ width: 18, height: 18, color: 'var(--muted-foreground)' }} />
            </motion.div>
          </button>

          <motion.div
            initial={false}
            animate={{
              height: isOpen ? bounds.height : 0,
              opacity: isOpen ? 1 : 0,
            }}
            style={{ overflow: 'hidden', willChange: 'transform' }}
          >
            <div ref={ref}>
              <div style={{ padding: '0 16px 12px' }}>
                {chapter.summary && (
                  <p style={{ fontSize: 12, color: 'var(--muted-foreground)', marginBottom: 8, lineHeight: 1.6 }}>
                    {chapter.summary}
                  </p>
                )}
                <div>
                  {chapter.problems.map(p => <ProblemRow key={p.id} p={p} accent={accent} />)}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.li>
    </MotionConfig>
  )
}

interface ChapterAccordionProps {
  chapters: BookChapter[]
  accent: string
  parts?: BookPart[]
}

export const ChapterAccordion: FC<ChapterAccordionProps> = ({ chapters, accent, parts }) => {
  const [openId, setOpenId] = useState<number | null>(null)

  if (!parts) {
    const items: ChapterItemData[] = chapters.map((ch, i) => ({
      id: i,
      chapter: ch,
      accent,
    }))

    const openIndex = items.findIndex(item => item.id === openId)

    return (
      <div style={{ display: 'flex', width: '100%', flexDirection: 'column', paddingTop: 8 }}>
        <ul style={{ width: '100%', listStyle: 'none', padding: 0, margin: 0 }}>
          {items.map((item, index) => (
            <ChapterItem
              key={item.chapter.num}
              item={item}
              setOpenId={setOpenId}
              index={index}
              total={items.length}
              openIndex={openIndex}
            />
          ))}
        </ul>
      </div>
    )
  }

  const partRanges = parts.map((_, pi) => {
    const start = pi * 6
    const end = start + 5
    return { start, end }
  })

  const PartIcons = [ChevronDown, ChevronDown, ChevronDown, ChevronDown]

  return (
    <div style={{ display: 'flex', width: '100%', flexDirection: 'column', paddingTop: 8 }}>
      <ul style={{ width: '100%', listStyle: 'none', padding: 0, margin: 0 }}>
        {parts.map((part, pi) => {
          const partChs = chapters.slice(partRanges[pi].start, partRanges[pi].end + 1)
          const PartIcon = PartIcons[pi] ?? ChevronDown
          const items: ChapterItemData[] = partChs.map((ch, ci) => ({
            id: pi * 100 + ci,
            chapter: ch,
            accent: part.accentColor,
          }))
          const openIndex = items.findIndex(item => item.id === openId)

          return (
            <li key={part.num} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 4px 4px', color: part.accentColor }}>
                <PartIcon style={{ width: 16, height: 16 }} />
                <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Part {part.num}: {part.title}
                </span>
              </div>
              {part.summary && (
                <p style={{ fontSize: 12, color: 'var(--muted-foreground)', padding: '0 4px 8px', margin: 0 }}>
                  {part.summary}
                </p>
              )}
              <ul style={{ width: '100%', listStyle: 'none', padding: 0, margin: 0 }}>
                {items.map((item, index) => (
                  <ChapterItem
                    key={`${part.num}-${item.chapter.num}`}
                    item={item}
                    setOpenId={setOpenId}
                    index={index}
                    total={items.length}
                    openIndex={openIndex}
                  />
                ))}
              </ul>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
