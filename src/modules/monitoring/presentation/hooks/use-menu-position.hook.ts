import { useLayoutEffect, useState, CSSProperties, RefObject } from 'react'
import type { MonitoringCell } from '../../domain/interfaces/monitoring-cell.interface'

export function useMenuPosition(
  activeCell: MonitoringCell | null,
  activeCoords: { x: number; y: number; itemHeight?: number } | null,
  containerRef: RefObject<HTMLDivElement>,
  MenuRef: RefObject<HTMLDivElement>
) {
  const [positionStyle, setPositionStyle] = useState<CSSProperties>({
    visibility: 'hidden',
    opacity: 0
  })

  useLayoutEffect(() => {
    if (
      !activeCell ||
      !activeCoords ||
      !containerRef.current ||
      !MenuRef.current
    ) {
      setPositionStyle({ visibility: 'hidden', opacity: 0 })
      return
    }

    const containerRect = containerRef.current.getBoundingClientRect()
    const infoRect = MenuRef.current.getBoundingClientRect()

    // Ler padding real do container: SVG começa em (paddingLeft, paddingTop) dentro do border-box
    const cs = getComputedStyle(containerRef.current)
    const paddingLeft = parseFloat(cs.paddingLeft) || 0
    const paddingTop  = parseFloat(cs.paddingTop)  || 0

    // --- Eixo X (horizontal flip) ---
    const spaceRight = containerRect.width - paddingLeft - activeCoords.x
    const spaceLeft  = activeCoords.x
    const OFFSET = 30

    let xOffset = OFFSET // abre à direita por padrão
    if (spaceRight < infoRect.width + OFFSET && spaceLeft > spaceRight) {
      xOffset = -infoRect.width - OFFSET // flip para a esquerda
    }

    // Coordenadas relativas ao container (padding incluso)
    // Coordenada SVG X + padding + offset
    let x = paddingLeft + activeCoords.x + xOffset

    // Coordenada SVG Y + padding
    const itemHeight = activeCoords.itemHeight ?? 0
    const anchorY = paddingTop + activeCoords.y
    const itemBottom = anchorY + itemHeight

    const margin = 10

    // Padrão: topo do popup = topo do item (align-start)
    let y = anchorY

    // Flip vertical dentro do container
    if (y + infoRect.height > containerRect.height - margin) {
      y = itemBottom - infoRect.height
    }

    // Constraints dentro do container
    if (y < margin) y = margin
    if (x < margin) x = margin
    if (x + infoRect.width > containerRect.width - margin) {
      x = containerRect.width - infoRect.width - margin
    }

    setPositionStyle({
      left: x,
      top: y,
      visibility: 'visible',
      opacity: 1
    })
  }, [activeCell, activeCoords, containerRef])

  return positionStyle
}
