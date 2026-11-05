'use client'

import { usePathname, useRouter } from 'next/navigation'
import { normalizePathname } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { MonitoringMenuDetailsItem } from '../monitoring-menu-details/monitoring-menu-details-item.component'
import type { LaneInfo } from '../../hooks/use-monitoring-menu-details.hook'

export interface ViewMoreMonitoringLaneModalTriggerProps {
  data: LaneInfo
}

export function ViewMoreMonitoringLaneModalTriggerComponent({
  data
}: ViewMoreMonitoringLaneModalTriggerProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleOpen = () => {
    router.push(
      `${normalizePathname(pathname)}/modal/view-more-lane/${data.lane_id}`,
      { scroll: false }
    )
  }

  return (
    <MonitoringMenuDetailsItem data={data} isNested onAccess={handleOpen} />
  )
}
