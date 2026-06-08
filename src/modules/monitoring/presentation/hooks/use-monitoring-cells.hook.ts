import { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { MonitoringCell } from '../../domain/interfaces/monitoring-cell.interface'

export function useMonitoringCells(initialCells: MonitoringCell[]) {
  // Estado local para overrides mutados manualmente (se houver)
  const [localOverrides, setLocalOverrides] = useState<Record<string, Partial<MonitoringCell>>>({})
  const [deletedIds, setDeletedIds] = useState<Set<string>>(() => new Set())
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  
  // Ref para o active (usado para limpar seleção se célula for deletada sem disparar re-renders extras)
  const activeRef = useRef<string | null>(null)

  // Derivação síncrona combinando initialCells e overrides locais
  const { cellsDict, cellsArray } = useMemo(() => {
    const dict: Record<string, MonitoringCell> = {}
    const array: MonitoringCell[] = []

    initialCells.forEach((cell) => {
      if (deletedIds.has(cell.id)) return

      const override = localOverrides[cell.id]
      const finalCell = override ? ({ ...cell, ...override } as MonitoringCell) : cell
      dict[cell.id] = finalCell
      array.push(finalCell)
    })

    // Adicionar itens que foram inseridos e não existem em initialCells
    Object.keys(localOverrides).forEach((id) => {
      if (!dict[id] && !deletedIds.has(id)) {
        const item = {
          id,
          name: 'Unknown',
          status: 'ok',
          upIds: [],
          laneIds: [],
          ...localOverrides[id]
        } as MonitoringCell
        dict[id] = item
        array.push(item)
      }
    })

    return { cellsDict: dict, cellsArray: array }
  }, [initialCells, localOverrides, deletedIds])

  const cellsFingerprint = useMemo(
    () => initialCells.map((i) => `${i.id}-${i.status}-${i.connectionStatus}-${(i.upIds || []).join(',')}-${(i.laneIds || []).join(',')}`).join('|'),
    [initialCells]
  )

  // Atualizar lastUpdated e limpar overrides locais quando os dados iniciais do socket mudarem (resetar cache local)
  useEffect(() => {
    setLocalOverrides({})
    setDeletedIds(new Set())
    setLastUpdated(new Date())
  }, [cellsFingerprint])

  const upsertCells = useCallback((newCells: (Partial<MonitoringCell> & { id: string })[]) => {
    setLocalOverrides((prev) => {
      const next = { ...prev }
      newCells.forEach((cell) => {
        next[cell.id] = {
          ...next[cell.id],
          ...cell
        }
      })
      return next
    })
    setLastUpdated(new Date())
  }, [])

  const removeCells = useCallback((ids: string[]) => {
    setDeletedIds((prev) => {
      const next = new Set(prev)
      ids.forEach((id) => next.add(id))
      return next
    })
    setLastUpdated(new Date())
  }, [])

  const updateCellsBatch = useCallback((updates: { action: 'upsert' | 'delete', cell: Partial<MonitoringCell> & { id: string } }[]) => {
    setLocalOverrides((prev) => {
      const nextOverrides = { ...prev }
      setDeletedIds((prevDeleted) => {
        const nextDeleted = new Set(prevDeleted)
        updates.forEach(({ action, cell }) => {
          if (action === 'upsert') {
            nextOverrides[cell.id] = {
              ...nextOverrides[cell.id],
              ...cell
            }
            nextDeleted.delete(cell.id)
          } else if (action === 'delete') {
            nextDeleted.add(cell.id)
            delete nextOverrides[cell.id]
          }
        })
        return nextDeleted
      })
      return nextOverrides
    })
    setLastUpdated(new Date())
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
