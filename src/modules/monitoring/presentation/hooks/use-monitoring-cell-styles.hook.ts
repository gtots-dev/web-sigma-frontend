import { useMemo } from 'react'
import { useTheme } from 'next-themes'
import { MonitoringCell } from '../../domain/interfaces/monitoring-cell.interface'
import { truncateSvgText } from '../utils/svg-text.utils'

/**
 * Configurações Semânticas de Opacidade para as Células do Monitoramento.
 * Organizado por Tema -> Estado de Seleção -> Estado de Conexão.
 */
const CELL_SIZE_CONFIG = {
  SELECTED: 2.2,
  IDLE: 0.8
}
const CELL_VISUAL_CONFIG = {
  DARK: {
    FILL: {
      SELECTED_ONLINE: 0.25,
      SELECTED_OFFLINE: 0.15,
      IDLE_ONLINE: 0.08,
      IDLE_OFFLINE: 0.15
    },
    STROKE: {
      SELECTED: 1.0,
      IDLE: 1.0
    }
  },
  LIGHT: {
    FILL: {
      SELECTED_ONLINE: 0.25,
      SELECTED_OFFLINE: 0.5,
      IDLE_ONLINE: 0.08,
      IDLE_OFFLINE: 0.08
    },
    STROKE: {
      SELECTED: 1.0,
      IDLE: 0.8
    }
  }
} as const

interface UseMonitoringCellStylesProps {
  cell: MonitoringCell
  isActive: boolean
  widthOrRadius: number
  fontSize: number
}

export function useMonitoringCellStyles({
  cell,
  isActive,
  widthOrRadius,
  fontSize
}: UseMonitoringCellStylesProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const isOffline = cell.connectionStatus === 'offline'

  // Seleciona a configuração baseada no tema atual
  const config = {
    size: CELL_SIZE_CONFIG,
    style: isDark ? CELL_VISUAL_CONFIG.DARK : CELL_VISUAL_CONFIG.LIGHT
  }

  // Cores base extraídas dos tokens do CSS
  const healthStatus = cell.status || 'ok'
  const healthColorToken = `var(--monitoring-${healthStatus})`

  // Define a cor da célula baseada no status de conexão (cinza se offline)
  const cellColorToken = isOffline
    ? `var(--monitoring-offline)`
    : healthColorToken

  // Cálculo da Opacidade de Preenchimento (Fill)
  const fillOpacity = useMemo(() => {
    if (isActive) {
      return isOffline
        ? config.style.FILL.SELECTED_OFFLINE
        : config.style.FILL.SELECTED_ONLINE
    }
    return isOffline
      ? config.style.FILL.IDLE_OFFLINE
      : config.style.FILL.IDLE_ONLINE
  }, [isActive, isOffline, config])

  // Cálculo da Opacidade da Borda (Stroke)
  const strokeOpacity = isActive
    ? config.style.STROKE.SELECTED
    : config.style.STROKE.IDLE

  const strokeWidth = isActive ? config.size.SELECTED : config.size.IDLE

  const fillColor = `rgba(${cellColorToken} / ${fillOpacity})`
  const strokeColor = `rgba(${cellColorToken} / ${strokeOpacity})`

  const displayName = useMemo(
    () => truncateSvgText(cell.name, widthOrRadius, fontSize),
    [cell.name, widthOrRadius, fontSize]
  )

  return {
    isOffline,
    healthColorRgb: `rgb(${healthColorToken})`,
    connectionColorRgb: isOffline
      ? `rgb(var(--monitoring-offline))`
      : `var(--primary-500)`,
    fillColor,
    strokeColor,
    strokeWidth,
    displayName
  }
}
