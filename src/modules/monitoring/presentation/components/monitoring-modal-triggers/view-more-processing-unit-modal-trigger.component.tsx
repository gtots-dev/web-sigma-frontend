'use client'

import { usePathname, useRouter } from 'next/navigation'
import { normalizePathname } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { MonitoringMenuDetailsItem } from '../monitoring-menu-details/monitoring-menu-details-item.component'
import type { UpInfo } from '../../hooks/use-monitoring-menu-details.hook'

export interface ViewMoreMonitoringProcessingUnitModalTriggerProps {
  data: UpInfo
}

export function ViewMoreMonitoringProcessingUnitModalTriggerComponent({
  data
}: ViewMoreMonitoringProcessingUnitModalTriggerProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleOpen = () => {
    router.push(
      `${normalizePathname(pathname)}/modal/view-more-processing-unit/${data.up_id}`,
      { scroll: false }
    )
  }

  return <MonitoringMenuDetailsItem data={data} onAccess={handleOpen} />
}
