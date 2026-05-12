'use client'

import { MonitoringCell } from '../../../domain/interfaces/monitoring-cell.interface'
import { ReactNode, useRef } from 'react'
import { useMonitoringContext } from '../monitoring/monitoring-context.component'
import { useMenuPosition } from '../../hooks/use-menu-position.hook'

interface MonitoringMenuRootProps {
  children?: ReactNode | ((cell: MonitoringCell) => ReactNode)
}

export function MonitoringMenuRoot({
  children
}: MonitoringMenuRootProps) {
  const { activeCell, activeCoords, containerRef } = useMonitoringContext()
  const menuRef = useRef<HTMLDivElement>(null)

  const positionStyle = useMenuPosition(
    activeCell,
    activeCoords,
    containerRef,
    menuRef
  )

  if (!activeCell) return null

  return (
    <div
      ref={menuRef}
      className="absolute z-[110] pointer-events-none"
      style={positionStyle}
    >
      <div className="pointer-events-auto animate-in fade-in zoom-in-95 duration-200">
        <div className="flex flex-col bg-card border min-w-[240px] relative overflow-hidden ms-2 rounded-lg">
          {typeof children === 'function' ? children(activeCell) : children}
        </div>
      </div>
    </div>
  )
}
