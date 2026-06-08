'use client'

import { useMemo } from 'react'
import { useMonitoringContext } from '../monitoring/monitoring-context.component'
import { MonitoringGridCell } from './monitoring-view-grid-cell.component'
import { MonitoringHexagonCell } from './monitoring-view-hexagon-cell.component'
import { MonitoringGridCell as IGridCell, MonitoringHexCell as IHexCell } from '../../../domain/interfaces/monitoring-cell.interface'

type ViewCellData = IGridCell | IHexCell

export function MonitoringViewLayer() {
  const { 
    mode, 
    hexes, 
    cells, 
    active, 
    setActive, 
    zoom, 
    CELL_WIDTH, 
    CELL_HEIGHT, 
    points, 
    radius
  } = useMonitoringContext()

  const sortedData = useMemo<ViewCellData[]>(() => {
    const data: ViewCellData[] = mode === 'hex' ? hexes : cells
    return [...data].sort((a, b) => {
      return a.cell.id === active ? 1 : b.cell.id === active ? -1 : 0
    })
  }, [mode, hexes, cells, active])

  return (
    <g transform={mode === 'grid' ? `scale(${zoom})` : undefined}>
      {sortedData.map((data) => {
        const cellId = data.cell.id
        const isActive = active === cellId

        if (mode === 'hex') {
          return (
            <MonitoringHexagonCell
              key={data.id}
              hex={data as IHexCell}
              isActive={isActive}
              points={points}
              radius={radius}
              onSelect={setActive}
            />
          )
        }

        return (
          <MonitoringGridCell
            key={data.id}
            cell={data as IGridCell}
            isActive={isActive}
            width={CELL_WIDTH}
            height={CELL_HEIGHT}
            onSelect={setActive}
          />
        )
      })}
    </g>
  )
}
