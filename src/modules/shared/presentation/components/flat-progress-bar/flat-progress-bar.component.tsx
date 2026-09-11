'use client'

import React, { useRef, useCallback } from 'react'
import { cn } from '@/modules/shared/presentation/lib/utils'

interface FlatProgressBarProps {
  /** Current value (e.g. seconds or any unit between min and max). */
  value: number
  min?: number
  max: number
  disabled?: boolean
  className?: string
  /** Called continuously while dragging — lightweight preview updates. */
  onScrub?: (value: number) => void
  /** Called on pointer release — commit the final seek. */
  onCommit: (value: number) => void
}

/**
 * A flat, thumb-less progress bar slider.
 *
 * Visually: a thin track that fills from left to right with the primary color.
 * No native browser thumb is rendered. Pointer events are handled manually
 * so the fill updates in real-time at 60fps (via the RAF loop from the parent).
 */
export function FlatProgressBar({
  value,
  min = 0,
  max,
  disabled = false,
  className,
  onScrub,
  onCommit,
}: FlatProgressBarProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const clampedMax = max || 1
  const fillPercent = Math.min(100, Math.max(0, ((value - min) / (clampedMax - min)) * 100))

  /** Convert a pointer X position to a value within [min, max]. */
  const pointerToValue = useCallback(
    (clientX: number): number => {
      if (!trackRef.current) return value
      const rect = trackRef.current.getBoundingClientRect()
      const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
      return min + ratio * (clampedMax - min)
    },
    [min, clampedMax, value]
  )

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) return
      isDragging.current = true
      ;(e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId)
      const val = pointerToValue(e.clientX)
      onScrub?.(val)
    },
    [disabled, pointerToValue, onScrub]
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging.current || disabled) return
      const val = pointerToValue(e.clientX)
      onScrub?.(val)
    },
    [disabled, pointerToValue, onScrub]
  )

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging.current) return
      isDragging.current = false
      const val = pointerToValue(e.clientX)
      onCommit(val)
    },
    [pointerToValue, onCommit]
  )

  return (
    <div
      ref={trackRef}
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      tabIndex={disabled ? -1 : 0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={cn(
        'relative w-full rounded-full overflow-hidden cursor-pointer select-none',
        'h-1 hover:h-1.5 transition-[height] duration-150',
        'bg-muted',
        disabled && 'opacity-40 pointer-events-none',
        className
      )}
    >
      {/* Fill */}
      <div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{
          width: `${fillPercent}%`,
          background: 'var(--primary-600)',
          transition: isDragging.current ? 'none' : undefined,
        }}
      />
    </div>
  )
}
