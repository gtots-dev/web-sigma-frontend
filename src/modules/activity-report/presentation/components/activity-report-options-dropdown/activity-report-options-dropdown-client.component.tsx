'use client'

import { ActivityReportOptionsDropdown } from '.'
import { ViewMoreActivityReportMenu } from '../view-more-activity-report-menu'
import { ViewMoreActivityReportMenuComponent } from '../view-more-activity-report-menu/view-more-activity-report-menu.component'

export function ActivityReportOptionsDropdownClient() {
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
