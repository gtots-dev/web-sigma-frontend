'use client'

import { useRef, type RefObject } from 'react'
import { useMonitoringContext } from '../components/monitoring/monitoring-context.component'
import { useMonitoringMenuDetails, type UpInfo, type LaneInfo } from './use-monitoring-menu-details.hook'
import { useMenuPosition } from './use-menu-position.hook'
import type { MonitoringCell } from '../../domain/interfaces/monitoring-cell.interface'
import type { StatusGroup } from '../../domain/interfaces/monitoring-dashboard-websocket.interface'

// ── Extrai todos os elementos ordenados por gravidade ───────────────────────────
export function getAlertElements(items: StatusGroup[]) {
  const result: { name: string; value: string; level: number; group: string }[] = []
  items.forEach((group) => {
    group.elements.forEach((el) => {
      result.push({ ...el, group: group.group })
    })
  })
  return result.sort((a, b) => b.level - a.level)
}

// ── Utilitário de ordenação por prioridade ────────────────────────────────────
function prioritize<T extends UpInfo | LaneInfo>(arr: T[]): T[] {
  return [...arr].sort((a, b) => {
    const p = (x: T) => {
      if (!x.hasData) return 0
      if ('offline' in x && (x as UpInfo).offline) return 0
      if (x.level >= 2) return 3
      if (x.level === 1) return 2
      return 1
    }
    return p(b) - p(a)
  })
}

// ── Verifica se há algo relevante para exibir ─────────────────────────────────
function hasTooltipContent(ups: UpInfo[], lanes: LaneInfo[]): boolean {
  if (ups.length === 0) return false
  return ups.some((up) => {
    const upIsOk = up.hasData && !up.offline && up.level === 0
    if (!upIsOk) return true
    return lanes.some((l) => l.up_id === up.up_id && (!l.hasData || l.level > 0))
  })
}

export function useMonitoringTooltip(cell: MonitoringCell, containerRef: RefObject<HTMLDivElement>) {
  const { ups, lanes } = useMonitoringMenuDetails(cell)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const { hoveredCoords } = useMonitoringContext()
  const positionStyle = useMenuPosition(cell, hoveredCoords, containerRef, tooltipRef)

  const sortedUps = prioritize(ups)
  const sortedLanesByUp = (upId: number) =>
    prioritize(lanes.filter((l) => l.up_id === upId))

  const showContent = hasTooltipContent(ups, lanes)

  return {
    ups: sortedUps,
    lanes,
    tooltipRef,
    positionStyle,
    sortedLanesByUp,
    showContent
  }
}
