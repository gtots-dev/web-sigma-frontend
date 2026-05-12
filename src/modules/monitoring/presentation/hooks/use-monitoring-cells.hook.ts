import { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { MonitoringCell } from '../../domain/interfaces/monitoring-cell.interface'

export function useMonitoringCells(initialCells: MonitoringCell[]) {
  const [cellsDict, setCellsDict] = useState<Record<string, MonitoringCell>>(
    () => initialCells.reduce((acc, cell) => ({ ...acc, [cell.id]: cell }), {})
  )
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  
  // Ref para o active (usado para limpar seleção se célula for deletada sem disparar re-renders extras)
  const activeRef = useRef<string | null>(null)

  const cellsArray = useMemo(() => Object.values(cellsDict), [cellsDict])

  const cellsFingerprint = useMemo(
    () => initialCells.map((i) => `${i.id}-${i.status}-${i.connectionStatus}-${i.json}`).join('|'),
    [initialCells]
  )

  useEffect(() => {
    const dict: Record<string, MonitoringCell> = {}
    initialCells.forEach(cell => {
      dict[cell.id] = cell
    })
    setCellsDict(dict)
    setLastUpdated(new Date())
  }, [cellsFingerprint])

  const upsertCells = useCallback((newCells: (Partial<MonitoringCell> & { id: string })[]) => {
    setCellsDict((prev) => {
      const next = { ...prev }
      let changed = false
      newCells.forEach((cell) => {
        const current = next[cell.id]
        if (!current || current.status !== cell.status || current.name !== cell.name || current.json !== cell.json) {
          next[cell.id] = {
            ...(current || { name: 'Unknown', status: 'ok' }),
            ...cell
          } as MonitoringCell
          changed = true
        }
      })
      if (changed) setLastUpdated(new Date())
      return changed ? next : prev
    })
  }, [])

  const removeCells = useCallback((ids: string[]) => {
    setCellsDict((prev) => {
      const next = { ...prev }
      let changed = false
      ids.forEach((id) => {
        if (next[id]) {
          delete next[id]
          changed = true
        }
      })
      if (changed) setLastUpdated(new Date())
      return changed ? next : prev
    })
  }, [])

  const updateCellsBatch = useCallback((updates: { action: 'upsert' | 'delete', cell: Partial<MonitoringCell> & { id: string } }[]) => {
    setCellsDict((prev) => {
      const next = { ...prev }
      let hasChanged = false

      updates.forEach(({ action, cell }) => {
        if (action === 'upsert') {
          const current = next[cell.id]
          if (!current && !cell.name) return

          const updatedCell = {
            ...(current || { name: 'Unknown', status: 'ok' }),
            ...cell
          } as MonitoringCell

          if (!current || current.status !== updatedCell.status || current.name !== updatedCell.name || current.json !== updatedCell.json) {
            next[cell.id] = updatedCell
            hasChanged = true
          }
        } else if (action === 'delete') {
          if (next[cell.id]) {
            delete next[cell.id]
            hasChanged = true
          }
        }
      })

      if (hasChanged) setLastUpdated(new Date())
      return hasChanged ? next : prev
    })
  }, [])

  return {
    cellsDict,
    cellsArray,
    lastUpdated,
    upsertCells,
    removeCells,
    updateCellsBatch,
    activeRef
  }
}
