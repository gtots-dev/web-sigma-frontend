import { MonitoringCell } from '../../domain/interfaces/monitoring-cell.interface'

export function generatePointSnapshotImage(cell?: MonitoringCell): string {
  if (typeof window === 'undefined' || !cell) return ''

  const canvas = document.createElement('canvas')
  canvas.width = 280
  canvas.height = 70
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''

  // 1. Fundo Gradiente Estilo Radar/Satélite
  const grad = ctx.createLinearGradient(0, 0, 280, 70)
  grad.addColorStop(0, '#090d16')
  grad.addColorStop(1, '#1e293b')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 280, 70)

  // 2. Grade Geográfica / Crosshairs
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)'
  ctx.lineWidth = 1
  for (let x = 0; x < 280; x += 20) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, 70)
    ctx.stroke()
  }
  for (let y = 0; y < 70; y += 14) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(280, y)
    ctx.stroke()
  }

  // 3. Cor do Status do Ponto
  const isOffline = cell.connectionStatus === 'offline'
  let statusColor = '#6b7280'
  if (!isOffline) {
    if (cell.status === 'ok') statusColor = '#22c55e'
    else if (cell.status === 'warning') statusColor = '#eab308'
    else if (cell.status === 'error') statusColor = '#ef4444'
  }

  // 4. Desenho do Alvo/Radar Central
  const centerX = 140
  const centerY = 35

  // Anel Externo Tracejado
  ctx.beginPath()
  ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI)
  ctx.strokeStyle = statusColor
  ctx.lineWidth = 1.5
  ctx.setLineDash([4, 4])
  ctx.stroke()
  ctx.setLineDash([])

  // Ponto Central com Anel de Borda
  ctx.beginPath()
  ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI)
  ctx.fillStyle = statusColor
  ctx.fill()
  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = 1.5
  ctx.stroke()

  // 5. Coordenadas Geográficas Exatas (Latitude e Longitude)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)'
  ctx.font = 'bold 9px monospace'
  const latStr = cell.latitude !== undefined ? cell.latitude.toFixed(4) : '-23.5505'
  const lngStr = cell.longitude !== undefined ? cell.longitude.toFixed(4) : '-46.6333'
  ctx.fillText(`Latitude: ${latStr} | Longitude: ${lngStr}`, 10, 60)

  // Nome do Ponto no Canto Direito
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
  ctx.font = '8px sans-serif'
  const pointName = cell.name.length > 10 ? cell.name.slice(0, 10) + '...' : cell.name
  ctx.fillText(pointName, 215, 60)

  return canvas.toDataURL('image/png')
}
