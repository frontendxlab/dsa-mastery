import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type Corner = 'tl' | 'tr' | 'bl' | 'br'
const CORNERS: Corner[] = ['tl', 'tr', 'bl', 'br']

function CornerBrackets({ size = 4, border = 3 }: { size?: number; border?: number }) {
  const s = size * 4
  return (
    <>
      {CORNERS.map(c => {
        const pos = c === 'tl' ? 'top-0 left-0' : c === 'tr' ? 'top-0 right-0' : c === 'bl' ? 'bottom-0 left-0' : 'bottom-0 right-0'
        return (
          <div
            key={c}
            className={`absolute ${pos}`}
            style={{
              width: s,
              height: s,
              borderColor: 'color-mix(in srgb, var(--foreground) 40%, transparent)',
              borderTopWidth: (c === 'tl' || c === 'tr') ? border : 0,
              borderBottomWidth: (c === 'bl' || c === 'br') ? border : 0,
              borderLeftWidth: (c === 'tl' || c === 'bl') ? border : 0,
              borderRightWidth: (c === 'tr' || c === 'br') ? border : 0,
              borderStyle: 'solid',
            }}
          />
        )
      })}
    </>
  )
}

export function GlobalFocusIndicator() {
  const [mode, setMode] = useState<'idle' | 'cursor' | 'frame'>('idle')
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [idlePos, setIdlePos] = useState({ top: 0, left: 0, width: 0, height: 0 })
  const [framePos, setFramePos] = useState({ top: 0, left: 0, width: 0, height: 0 })
  const targetRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const updateIdlePos = () => {
      const el = document.querySelector('[data-idle-target]') as HTMLElement | null
      if (el) {
        const rect = el.getBoundingClientRect()
        setIdlePos({ top: rect.top - 3, left: rect.left - 3, width: rect.width + 6, height: rect.height + 6 })
      }
    }

    requestAnimationFrame(updateIdlePos)

    const obs = new ResizeObserver(updateIdlePos)
    const el = document.querySelector('[data-idle-target]') as HTMLElement | null
    if (el) obs.observe(el)

    window.addEventListener('resize', updateIdlePos)
    document.addEventListener('scroll', updateIdlePos, { passive: true })

    return () => {
      obs.disconnect()
      window.removeEventListener('resize', updateIdlePos)
      document.removeEventListener('scroll', updateIdlePos)
    }
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = e.clientX, y = e.clientY
      setCursorPos({ x, y })

      const el = document.elementFromPoint(x, y)
      const target = el?.closest('[data-focusable]') as HTMLElement | null

      if (target) {
        if (target !== targetRef.current) {
          targetRef.current?.removeAttribute('data-focus-active')
          targetRef.current = target
          target.setAttribute('data-focus-active', '')
          const rect = target.getBoundingClientRect()
          setFramePos({
            top: rect.top - 3,
            left: rect.left - 3,
            width: rect.width + 6,
            height: rect.height + 6,
          })
        }
        setMode('frame')
      } else {
        if (targetRef.current) {
          targetRef.current.removeAttribute('data-focus-active')
          targetRef.current = null
        }
        setMode('cursor')
      }
    }

    const onLeave = () => {
      targetRef.current?.removeAttribute('data-focus-active')
      targetRef.current = null
      setMode('idle')
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const showFrame = mode === 'frame'
  const hidden = mode === 'idle' && idlePos.width === 0
  const isCursor = mode === 'cursor'

  return (
    <motion.div
      className="fixed pointer-events-none z-[100]"
      style={{ visibility: hidden ? 'hidden' as any : 'visible' }}
      animate={
        mode === 'idle'
          ? { top: idlePos.top, left: idlePos.left, width: idlePos.width, height: idlePos.height, opacity: 1 }
          : isCursor
          ? { top: cursorPos.y - 8, left: cursorPos.x - 8, width: 16, height: 16, opacity: 1, scale: 1 }
          : { top: framePos.top, left: framePos.left, width: framePos.width, height: framePos.height, opacity: 1, scale: 1 }
      }
      initial={false}
      transition={{ type: 'spring', stiffness: 400, damping: 28, mass: 0.8 }}
    >
      {isCursor ? <CornerBrackets size={2} border={2} /> : <CornerBrackets />}
    </motion.div>
  )
}
