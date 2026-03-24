'use client'

import { useMemo, useRef, useState } from 'react'

const MIN_RANGE = 60 * 60 * 1000

export type ChartMouseEvent = {
  activeLabel?: number
}

export function useChartZoom<T extends { date: number }>(data: T[]) {
  const parsedData = useMemo(() => {
    if (data.length <= 1) return data
    return [...data].sort((a, b) => a.date - b.date)
  }, [data])

  const dataMin = parsedData[0]?.date ?? 0
  const dataMax = parsedData[parsedData.length - 1]?.date ?? 0

  const zoomRef = useRef<{ start: number; end: number } | null>(null)
  const rafRef = useRef<number | null>(null)
  const rectRef = useRef<DOMRect | null>(null)

  const [startDate, setStartDate] = useState<number | null>(null)
  const [endDate, setEndDate] = useState<number | null>(null)

  const [refAreaLeft, setRefAreaLeft] = useState<number | null>(null)
  const [refAreaRight, setRefAreaRight] = useState<number | null>(null)

  function handleWheelZoom(e: React.WheelEvent<HTMLDivElement>) {
    e.preventDefault()

    if (!parsedData.length) return

    if (!rectRef.current) {
      rectRef.current = e.currentTarget.getBoundingClientRect()
    }

    const rect = rectRef.current
    const mouseX = e.clientX - rect.left
    const mouseRatio = mouseX / rect.width

    const zoomIntensity = 0.08
    const delta = Math.sign(e.deltaY)
    const scale = Math.exp(delta * zoomIntensity)

    const currentStart = zoomRef.current?.start ?? dataMin
    const currentEnd = zoomRef.current?.end ?? dataMax

    const range = currentEnd - currentStart
    const newRange = range * scale

    if (newRange < MIN_RANGE) return

    const center = currentStart + range * mouseRatio

    let newStart = center - newRange * mouseRatio
    let newEnd = center + newRange * (1 - mouseRatio)

    newStart = Math.max(dataMin, newStart)
    newEnd = Math.min(dataMax, newEnd)

    if (newEnd <= newStart) return

    zoomRef.current = { start: newStart, end: newEnd }

    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        const z = zoomRef.current
        if (!z) return

        setStartDate((prev) => (prev !== z.start ? z.start : prev))
        setEndDate((prev) => (prev !== z.end ? z.end : prev))

        rafRef.current = null
      })
    }
  }

  function handleMouseDown(e: ChartMouseEvent) {
    if (typeof e.activeLabel === 'number') {
      setRefAreaLeft(e.activeLabel)
      setRefAreaRight(null)
    }
  }

  function handleMouseMove(e: ChartMouseEvent) {
    if (refAreaLeft !== null && typeof e.activeLabel === 'number') {
      setRefAreaRight(e.activeLabel)
    }
  }

  function handleMouseUp() {
    if (refAreaLeft == null || refAreaRight == null) {
      setRefAreaLeft(null)
      setRefAreaRight(null)
      return
    }

    const [from, to] = [refAreaLeft, refAreaRight].sort((a, b) => a - b)

    if (to - from < MIN_RANGE) {
      setRefAreaLeft(null)
      setRefAreaRight(null)
      return
    }

    zoomRef.current = { start: from, end: to }

    setStartDate(from)
    setEndDate(to)

    setRefAreaLeft(null)
    setRefAreaRight(null)
  }

  function resetZoom() {
    zoomRef.current = null
    rectRef.current = null
    setStartDate(null)
    setEndDate(null)
  }

  const zoomedData = useMemo(() => {
    if (startDate == null || endDate == null) return parsedData

    let startIdx = 0
    let endIdx = parsedData.length - 1

    while (
      startIdx < parsedData.length &&
      parsedData[startIdx].date < startDate
    ) {
      startIdx++
    }

    while (endIdx > 0 && parsedData[endIdx].date > endDate) {
      endIdx--
    }

    return parsedData.slice(startIdx, endIdx + 1)
  }, [parsedData, startDate, endDate])

  return {
    zoomedData,
    startDate,
    refAreaLeft,
    refAreaRight,
    handleWheelZoom,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    resetZoom
  }
}
