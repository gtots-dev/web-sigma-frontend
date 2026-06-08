import { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import {
  MonitoringCell,
  MonitoringHexCell,
  MonitoringGridCell
} from '../../domain/interfaces/monitoring-cell.interface'

const SQRT3 = Math.sqrt(3)
const CELL_WIDTH = 50
const CELL_HEIGHT = 50
const CELL_GAP = 8
const HEX_GAP = 4

export function useMonitoringLayout(
  processedCells: MonitoringCell[],
  containerRef: React.RefObject<HTMLDivElement>,
  radius: number,
  zoom: number
) {
  const [mode, setMode] = useState<'hex' | 'grid'>('hex')
  const [layout, setLayout] = useState<'linear' | 'radial'>('linear')
  const [hexes, setHexes] = useState<MonitoringHexCell[]>([])
  const [cells, setCells] = useState<MonitoringGridCell[]>([])
  const [totalHeight, setTotalHeight] = useState(0)

  // Fingerprint para evitar cálculos e re-renders se os dados forem os mesmos
  const cellIdsFingerprint = useMemo(
    () =>
      processedCells
        .map(
          (i) =>
            `${i.id}-${i.status}-${i.connectionStatus}-${(i.upIds || []).join(',')}-${(i.laneIds || []).join(',')}`
        )
        .join(','),
    [processedCells]
  )

  const generateHexLinear = useCallback(
    (width: number, r: number) => {
      const hexWidth = SQRT3 * r
      const spacingX = hexWidth + HEX_GAP
      const spacingY = 1.5 * r + HEX_GAP

      const cols = Math.floor((width - hexWidth / 2) / spacingX)
      if (cols <= 0) return { list: [], height: 0 }

      const rows = Math.ceil(processedCells.length / cols) + 1
      const gridWidth = cols * spacingX + hexWidth / 2
      const offsetGlobalX = (width - gridWidth) / 2

      const list: MonitoringHexCell[] = []
      let dataIndex = 0

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (dataIndex >= processedCells.length) break
          const offsetX = row % 2 === 0 ? 0 : spacingX / 2
          const cx = col * spacingX + offsetX + r + offsetGlobalX
          const cy = row * spacingY + r
          list.push({
            id: `${row}-${col}`,
            cx,
            cy,
            cell: processedCells[dataIndex]
          })
          dataIndex++
        }
      }
      return { list, height: rows * spacingY + r }
    },
    [processedCells]
  )

  const generateHexRadial = useCallback(
    (width: number, height: number, r: number) => {
      const centerX = width / 2
      const list: MonitoringHexCell[] = []
      let dataIndex = 0

      if (processedCells.length > 0) {
        list.push({
          id: '0-0',
          cx: centerX,
          cy: 0,
          cell: processedCells[dataIndex++]
        })
      }

      const directions = [
        { dx: 1, dy: 0, dz: -1 },
        { dx: 0, dy: 1, dz: -1 },
        { dx: -1, dy: 1, dz: 0 },
        { dx: -1, dy: 0, dz: 1 },
        { dx: 0, dy: -1, dz: 1 },
        { dx: 1, dy: -1, dz: 0 }
      ]

      let x = 0,
        y = 0,
        z = 0
      let ring = 1

      while (dataIndex < processedCells.length) {
        x += directions[4].dx
        y += directions[4].dy
        z += directions[4].dz

        for (let side = 0; side < 6; side++) {
          for (let step = 0; step < ring; step++) {
            if (dataIndex >= processedCells.length) break
            const px = (r * SQRT3 + HEX_GAP) * (x + z / 2)
            const py = (r * 1.5 + HEX_GAP) * z
            list.push({
              id: `r${ring}-s${side}-p${step}`,
              cx: centerX + px,
              cy: py,
              cell: processedCells[dataIndex++]
            })
            x += directions[side].dx
            y += directions[side].dy
            z += directions[side].dz
          }
        }
        ring++
        if (ring > 50) break
      }

      if (list.length === 0) return { list: [], height: 0 }
      const minY = Math.min(...list.map((h) => h.cy)) - r
      const maxY = Math.max(...list.map((h) => h.cy)) + r
      const gridHeight = maxY - minY
      const padding = 100
      const offsetList = list.map((h) => ({ ...h, cy: h.cy - minY + padding }))
      return { list: offsetList, height: gridHeight + padding * 2 }
    },
    [processedCells]
  )

  const generateGrid = useCallback(
    (width: number, z: number) => {
      const totalW = (CELL_WIDTH + CELL_GAP) * z
      const totalH = (CELL_HEIGHT + CELL_GAP) * z
      const cols = Math.floor(width / totalW)
      if (cols <= 0) return { list: [], height: 0 }
      const rows = Math.ceil(processedCells.length / cols)
      const gridWidth = cols * totalW - CELL_GAP * z
      const offsetX = (width - gridWidth) / 2
      const list: MonitoringGridCell[] = []
      let dataIndex = 0
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (dataIndex >= processedCells.length) break
          list.push({
            id: `${row}-${col}`,
            x: (col * totalW + offsetX) / z,
            y: (row * totalH + CELL_GAP * z) / z,
            cell: processedCells[dataIndex]
          })
          dataIndex++
        }
      }
      return { list, height: rows * totalH + CELL_GAP * z }
    },
    [processedCells]
  )

  // Usamos Refs para evitar que a função update dispare re-renders infinitos
  // ao ser lida dentro de dependências
  const lastUpdateRef = useRef('')

  useEffect(() => {
    function update() {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const cs = getComputedStyle(containerRef.current)
      const pLeft = parseFloat(cs.paddingLeft) || 0
      const pRight = parseFloat(cs.paddingRight) || 0
      const contentW = rect.width - pLeft - pRight

      // Cria um hash da situação atual para evitar updates desnecessários
      const currentHash = `${mode}-${layout}-${radius}-${zoom}-${cellIdsFingerprint}-${contentW}`
      if (lastUpdateRef.current === currentHash) return
      lastUpdateRef.current = currentHash

      if (mode === 'hex') {
        if (layout === 'linear') {
          const { list, height } = generateHexLinear(contentW, radius)
          setHexes(list)
          setTotalHeight(height)
        } else {
          const { list, height } = generateHexRadial(contentW, 0, radius)
          setHexes(list)
          setTotalHeight(height)
        }
      } else {
        const { list, height } = generateGrid(contentW, zoom)
        setCells(list)
        setTotalHeight(height)
      }
    }

    // O Observer é assíncrono e evita o estouro de pilha (stack overflow)
    const observer = new ResizeObserver(() => {
      window.requestAnimationFrame(update)
    })

    if (containerRef.current) observer.observe(containerRef.current)

    // Chamada inicial
    update()

    return () => observer.disconnect()
  }, [
    mode,
    layout,
    radius,
    zoom,
    cellIdsFingerprint,
    generateHexLinear,
    generateHexRadial,
    generateGrid,
    containerRef
  ])

  return {
    mode,
    setMode,
    layout,
    setLayout,
    hexes,
    cells,
    totalHeight,
    CELL_WIDTH,
    CELL_HEIGHT
  }
}
