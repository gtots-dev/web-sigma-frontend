'use client'

import { useEffect, useRef, useState } from 'react'
import * as ColorUtils from '@/modules/vehicles-types/presentation/utils/color-utils'

type ColorMode = 'hex' | 'rgba' | 'hsla'
type CopyState = Record<ColorMode, boolean>

interface Props {
  value: string
  rgb: { r: number; g: number; b: number }
  hsl: { h: number; s: number; l: number }
  onChange?: (value: string) => void
}

export function useColorPickerUI({ value, rgb, hsl, onChange }: Props) {
  const isEditingRef = useRef(false)

  const [mode, setMode] = useState<ColorMode>('hex')

  const [copied, setCopied] = useState<CopyState>({
    hex: false,
    rgba: false,
    hsla: false
  })

  const [hexInput, setHexInput] = useState(value)
  const [rgbInput, setRgbInput] = useState(rgb)
  const [hslInput, setHslInput] = useState(hsl)

  useEffect(() => {
    if (isEditingRef.current) return

    const nextRgb = ColorUtils.hexToRgb(value)
    const nextHsl = ColorUtils.rgbToHsl(nextRgb)

    setHexInput(value)
    setRgbInput(nextRgb)
    setHslInput(nextHsl)
  }, [value])

  const copy = (text: string, type: ColorMode) => {
    navigator.clipboard.writeText(text)

    setCopied((prev) => ({ ...prev, [type]: true }))

    setTimeout(() => {
      setCopied((prev) => ({ ...prev, [type]: false }))
    }, 1200)
  }

  const handleHex = (v: string) => {
    setHexInput(v)

    if (/^#[0-9A-Fa-f]{6}$/.test(v)) onChange?.(v)
  }

  const handleRgb = (key: 'r' | 'g' | 'b', v: string) => {
    const n = Number(v)
    if (isNaN(n) || n < 0 || n > 255) return

    const next = { ...rgb, [key]: n }
    setRgbInput(next)

    onChange?.(ColorUtils.rgbToHex(next))
  }

  const handleHsl = (key: 'h' | 's' | 'l', v: string) => {
    const n = Number(v)
    if (isNaN(n)) return

    const max = key === 'h' ? 360 : 100
    if (n < 0 || n > max) return

    const next = { ...hsl, [key]: n }
    setHslInput(next)

    const rgbConverted = ColorUtils.hslToRgb(next)
    onChange?.(ColorUtils.rgbToHex(rgbConverted))
  }

  const rgba = ColorUtils.formatRgba(rgb)
  const hsla = ColorUtils.formatHsla(hsl)

  return {
    mode,
    setMode,
    copied,
    hexInput,
    rgbInput,
    hslInput,
    rgba,
    hsla,
    isEditingRef,
    copy,
    handleHex,
    handleRgb,
    handleHsl
  }
}
