'use client'

import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { ActivityReportFiltersDropdown } from '.'
import { ActivityReportForm } from '../activity-report-form'

interface ActivityReportFiltersDropdownClientProps {
  isAdmin: boolean
  permissions: Set<PermissionEnum>
}

export function ActivityReportFiltersDropdownClient({
  isAdmin,
  permissions
}: ActivityReportFiltersDropdownClientProps) {
  return (
    <ActivityReportFiltersDropdown.Root>
      <ActivityReportFiltersDropdown.Trigger />

      <ActivityReportFiltersDropdown.Menu className="flex flex-col w-[400px] h-[450px]">
        <div className="p-4 flex flex-col flex-1 gap-y-5 overflow-auto">
          <ActivityReportForm.Inputs.Date />
          <ActivityReportForm.Inputs.Time />
          {(isAdmin || permissions.has(PermissionEnum.CONTRACTS_VIEW)) && (
            <ActivityReportForm.Inputs.Contracts />
          )}
          {(isAdmin || permissions.has(PermissionEnum.USERS_VIEW)) && (
            <ActivityReportForm.Inputs.Users />
          )}
          <ActivityReportForm.Submit className="mt-auto w-full">
            Filtrar
          </ActivityReportForm.Submit>
        </div>
      </ActivityReportFiltersDropdown.Menu>
    </ActivityReportFiltersDropdown.Root>
  )
}
