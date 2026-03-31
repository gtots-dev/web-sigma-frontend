'use client'

import { useEffect, useRef, useState } from 'react'
import {
  hexToRgb,
  hslToRgb,
  rgbToHex,
  rgbToHsl
} from '@/modules/vehicles-types/presentation/utils/color-utils'

interface UseColorPickerProps {
  value?: string
  onChange?: (value: string) => void
}

export function useColorPicker({
  value = '#000000',
  onChange
}: UseColorPickerProps) {
  const [hsl, setHsl] = useState(() => {
    const rgb = hexToRgb(value)
    return rgbToHsl(rgb)
  })

  const hslRef = useRef(hsl)

  useEffect(() => {
    hslRef.current = hsl
  }, [hsl])

  const isDragging = useRef(false)
  const colorPlaneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isDragging.current) return

    const rgb = hexToRgb(value)
    const next = rgbToHsl(rgb)

    setHsl((prev) => {
      const resolved = {
        ...next,
        h: next.s === 0 ? prev.h : next.h
      }

      hslRef.current = resolved
      return resolved
    })
  }, [value])

  const updateHSL = (h: number, s: number, l: number) => {
    const next = { h, s, l }

    hslRef.current = next
    setHsl(next)

    const rgb = hslToRgb(next)
    onChange?.(rgbToHex(rgb))
  }

  const handlePlane = (clientX: number, clientY: number) => {
    if (!colorPlaneRef.current) return

    const rect = colorPlaneRef.current.getBoundingClientRect()

    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height))

    const { h } = hslRef.current

    updateHSL(h, Math.round(x * 100), Math.round((1 - y) * 100))
  }

  const startPlaneDrag = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true

    const point = 'touches' in e ? e.touches[0] : e
    handlePlane(point.clientX, point.clientY)
  }

  const movePlane = (e: MouseEvent | TouchEvent) => {
    if (!isDragging.current) return

    const point = 'touches' in e ? e.touches[0] : e
    handlePlane(point.clientX, point.clientY)
  }

  const stopDrag = () => {
    isDragging.current = false
  }

  useEffect(() => {
    window.addEventListener('mousemove', movePlane)
    window.addEventListener('mouseup', stopDrag)

    window.addEventListener('touchmove', movePlane)
    window.addEventListener('touchend', stopDrag)

    return () => {
      window.removeEventListener('mousemove', movePlane)
      window.removeEventListener('mouseup', stopDrag)

      window.removeEventListener('touchmove', movePlane)
      window.removeEventListener('touchend', stopDrag)
    }
  }, [])

  const handleHue = (clientX: number, el: HTMLDivElement) => {
    const rect = el.getBoundingClientRect()
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))

    const nextH = Math.round(x * 360)

    const { s, l } = hslRef.current

    updateHSL(nextH, s, l)
  }

  const startHueDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget

    const move = (ev: MouseEvent) => {
      handleHue(ev.clientX, target)
    }

    const up = () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', up)
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
  }

  const rgb = hexToRgb(value) || { r: 0, g: 0, b: 0 }

  return {
    hsl,
    rgb,
    colorPlaneRef,

    startPlaneDrag,
    startHueDrag,
    handleHue
  }
}