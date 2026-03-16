import { useMemo, useRef, useState } from 'react'

export function useChartZoom<T extends { date: string }>(data: T[]) {
  const parsedData = useMemo(() => {
    return data.map((item) => ({
      ...item,
      date: new Date(item.date).getTime()
    }))
  }, [data])

  const zoomRef = useRef<{ start: number; end: number } | null>(null)
  const rafRef = useRef<number | null>(null)

  const [refAreaLeft, setRefAreaLeft] = useState<number | null>(null)
  const [refAreaRight, setRefAreaRight] = useState<number | null>(null)

  const [startDate, setStartDate] = useState<number | null>(null)
  const [endDate, setEndDate] = useState<number | null>(null)

  function handleWheelZoom(e: React.WheelEvent<HTMLDivElement>) {
    e.preventDefault()
    if (!data.length) return

    const direction = e.deltaY < 0 ? 1 : -1
    const zoomFactor = 0.15

    const container = e.currentTarget.getBoundingClientRect()
    const mouseX = e.clientX - container.left
    const mouseRatio = mouseX / container.width

    const min = zoomRef.current?.start ?? parsedData[0].date
    const max = zoomRef.current?.end ?? parsedData[parsedData.length - 1].date

    const range = max - min
    const zoomAmount = range * zoomFactor * direction

    const newStart = min + zoomAmount * mouseRatio
    const newEnd = max - zoomAmount * (1 - mouseRatio)

    if (newEnd - newStart < 60 * 60 * 1000) return

    zoomRef.current = { start: newStart, end: newEnd }

    if (rafRef.current) return

    rafRef.current = requestAnimationFrame(() => {
      if (!zoomRef.current) return

      setStartDate(zoomRef.current.start)
      setEndDate(zoomRef.current.end)

      rafRef.current = null
    })
  }

  function handleMouseDown(e: any) {
    if (typeof e?.activeLabel === 'number') {
      setRefAreaLeft(e.activeLabel)
    }
  }

  function handleMouseMove(e: any) {
    if (refAreaLeft && typeof e?.activeLabel === 'number') {
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

    setStartDate(from)
    setEndDate(to)

    setRefAreaLeft(null)
    setRefAreaRight(null)
  }

  function resetZoom() {
    setStartDate(null)
    setEndDate(null)
  }

  const zoomedData = useMemo(() => {
    if (!startDate || !endDate) return parsedData

    const filtered = parsedData.filter(
      (item) => item.date >= startDate && item.date <= endDate
    )

    return filtered.length > 1 ? filtered : parsedData
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
