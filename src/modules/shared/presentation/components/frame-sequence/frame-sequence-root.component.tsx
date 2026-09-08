'use client'

import React, { ReactNode, useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { ChevronRight, LoaderCircle } from 'lucide-react'
import { Card } from '@/modules/shared/presentation/components/shadcn/card'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'

interface FrameSequenceRootProps {
  children: ReactNode
  isFullyReady: boolean
  capturedCount?: number
  currentExtractingFrame?: number
  totalFrames?: number
  extractionProgress?: number
  detectedFps?: number
}

const contentVariants: Variants = {
  open: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  },
  closed: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] }
  }
}

export function FrameSequenceRootComponent({
  children,
  isFullyReady,
  capturedCount = 0,
  currentExtractingFrame = 0,
  totalFrames = 0,
  extractionProgress = 0,
  detectedFps
}: FrameSequenceRootProps) {
  const [isOpen, setIsOpen] = useState(true)

  // const safeCount = Number.isNaN(capturedCount) ? 0 : capturedCount
  const safeTotal = Number.isNaN(totalFrames) ? 0 : totalFrames

  return (
    <Card className="relative flex flex-col shrink-0 overflow-hidden min-w-0 w-full">
      {/* ── Accordion Trigger ─────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between gap-3 px-3 py-2 w-full text-left hover:bg-muted/50 transition-colors cursor-pointer select-none"
      >
        {/* Left: status icon + minimal header text */}
        <div className="flex items-center gap-2 min-w-0">
          {!isFullyReady ? (
            <LoaderCircle
              className="h-3.5 w-3.5 shrink-0 animate-spin"
              style={{ color: 'var(--primary-600)' }}
            />
          ) : (
            <div
              className="h-2 w-2 rounded-full shrink-0"
              style={{ background: 'var(--primary-600)' }}
            />
          )}

          <p className="text-[11px] text-muted-foreground">
            Arraste a barra ou clique em uma miniatura da imagem.
          </p>

          {detectedFps && isFullyReady ? (
            <span className="text-[10px] px-1.5 py-0.2 rounded font-mono bg-muted text-muted-foreground border font-normal">
              {detectedFps} FPS
            </span>
          ) : null}

          {!isFullyReady && (
            <span className="text-xs text-muted-foreground font-mono">
              ({extractionProgress}%)
            </span>
          )}
        </div>

        {/* Right: progress bar (while loading) + chevron */}
        <div className="flex items-center gap-2 shrink-0">
          <p className="text-xs font-semibold text-muted-foreground animate-pulse">
            Imagem #{currentExtractingFrame} de {safeTotal}
          </p>

          {!isFullyReady && (
            <div className="w-32 h-1 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-150"
                style={{
                  width: `${extractionProgress}%`,
                  background: 'var(--primary-600)'
                }}
              />
            </div>
          )}

          <ChevronRight
            className="h-4 w-4 text-muted-foreground transition-transform duration-200"
            style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
          />
        </div>
      </button>

      {/* ── Accordion Content ──────────────────────────────────────── */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="frame-sequence-content"
            initial="closed"
            animate="open"
            exit="closed"
            variants={contentVariants}
            className="overflow-hidden"
          >
            <Separator />
            <div className="flex flex-col gap-2 p-3 h-[114px]">{children}</div>

            {/* Loading overlay over content area only */}
            {!isFullyReady && (
              <div className="absolute inset-0 top-[37px] flex flex-col items-center justify-center gap-3 bg-background/70 backdrop-blur-sm z-10 rounded-b-[inherit]">
                <div className="relative flex items-center justify-center w-12 h-12">
                  <div className="absolute inset-0 rounded-full border border-primary/10 animate-ping [animation-duration:1.5s]" />
                  <div className="absolute w-9 h-9 rounded-full border border-primary/20 animate-pulse duration-1000" />
                  <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-background border border-muted">
                    <LoaderCircle className="h-3.5 w-3.5 text-primary animate-spin [animation-duration:1s]" />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-0.5 text-center px-4">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-primary/80">
                    Carregando
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
