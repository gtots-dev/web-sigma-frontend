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
      className="absolute z-[40] pointer-events-none"
      style={positionStyle}
    >
      <div 
        className="pointer-events-auto animate-in fade-in zoom-in-95 duration-200"
        onWheel={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col bg-card border min-w-[270px] relative ms-2 rounded-lg">
          {typeof children === 'function' ? children(activeCell) : children}
        </div>
      </div>
    </div>
  )
}
