import { StatusGroup } from '../../domain/interfaces/monitoring-dashboard-websocket.interface'

export function getLevelColor(level: number, hasData: boolean, offline = false) {
  if (!hasData || offline) return 'bg-[rgb(var(--monitoring-offline))]'
  if (level === 0) return 'bg-[rgb(var(--monitoring-ok))]'
  if (level === 1) return 'bg-[rgb(var(--monitoring-warning))]'
  return 'bg-[rgb(var(--monitoring-error))]'
}

export function getLevelText(level: number, hasData: boolean, offline = false) {
  if (!hasData) return 'Sem dados'
  if (offline) return 'Offline'
  if (level === 0) return 'Normal'
  if (level === 1) return 'Atenção'
  return 'Crítico'
}

export function formatBrDate(dateStr: string): string {
  if (!dateStr) return ''
  try {
    // Se a data já estiver no formato "DD/MM/YYYY HH:mm:ss", limpa os milissegundos/fuso horário extras.
    const brPatternRegex =
      /^(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2}):(\d{2})/
    if (brPatternRegex.test(dateStr)) {
      const match = dateStr.match(/^(\d{2}\/\d{2}\/\d{4}\s+\d{2}:\d{2}:\d{2})/)
      return match ? match[1] : dateStr
    }

    // Tenta converter caso seja um formato ISO ou UTC (ex: "2026-05-26T18:59:43Z")
    const date = new Date(dateStr)
    if (!isNaN(date.getTime())) {
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const seconds = String(date.getSeconds()).padStart(2, '0')
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
    }
  } catch (e) {}
  return dateStr
}

export function getLastUpdateText(hasData: boolean, items: StatusGroup[]): string {
  if (!hasData) return 'Sem atualizações'
  for (const group of items) {
    for (const el of group.elements) {
      if (el.date) return formatBrDate(el.date)
    }
  }
  return 'Atualizado'
}
