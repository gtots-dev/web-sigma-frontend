import dynamic from 'next/dynamic'
import { MonitoringMapRoot } from './monitoring-map-root.component'

const MonitoringMapCanvas = dynamic(
  () => import('./monitoring-map-canvas.component').then((mod) => mod.MonitoringMapCanvas),
  { ssr: false }
)

export const Map = Object.assign(MonitoringMapRoot, {
  Canvas: MonitoringMapCanvas
})

