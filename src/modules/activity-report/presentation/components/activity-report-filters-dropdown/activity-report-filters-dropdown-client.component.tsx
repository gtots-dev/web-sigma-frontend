'use client'

import { ActivityReportFiltersDropdown } from '.'
import { ActivityReportForm } from '../activity-report-form'

export function ActivityReportFiltersDropdownClient() {
  return (
    <ActivityReportFiltersDropdown.Root>
      <ActivityReportFiltersDropdown.Trigger />

      <ActivityReportFiltersDropdown.Menu className="flex flex-col w-[400px] h-[450px]">
        <div className="p-4 flex flex-col flex-1 gap-y-5 overflow-auto">
          <ActivityReportForm.Inputs.Date />
          <ActivityReportForm.Inputs.Time />
          <ActivityReportForm.Inputs.Contracts />
          <ActivityReportForm.Inputs.Users />
          <ActivityReportForm.Submit className="mt-auto w-full">
            Filtrar
          </ActivityReportForm.Submit>
        </div>
      </ActivityReportFiltersDropdown.Menu>
    </ActivityReportFiltersDropdown.Root>
  )
}
