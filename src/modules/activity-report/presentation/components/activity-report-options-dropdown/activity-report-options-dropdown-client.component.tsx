'use client'

import { ActivityReportOptionsDropdown } from '.'
import { ViewMoreActivityReportMenu } from '../view-more-user-menu'
import { ViewMoreActivityReportMenuComponent } from '../view-more-user-menu/view-more-activity-report-menu.component'

interface ActivityReportOptionsDropdownClientProps {}

export function ActivityReportOptionsDropdownClient({}: ActivityReportOptionsDropdownClientProps) {
  return (
    <ViewMoreActivityReportMenu.Provider>
      <ActivityReportOptionsDropdown.Root>
        <ActivityReportOptionsDropdown.Trigger />
        <ActivityReportOptionsDropdown.Menu>
          <ActivityReportOptionsDropdown.Item>
            <ViewMoreActivityReportMenu.Trigger />
          </ActivityReportOptionsDropdown.Item>
        </ActivityReportOptionsDropdown.Menu>
      </ActivityReportOptionsDropdown.Root>

      <ViewMoreActivityReportMenuComponent title="Relatório" />
    </ViewMoreActivityReportMenu.Provider>
  )
}
