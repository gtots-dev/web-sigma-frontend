'use client'

import type { ReactNode } from 'react'
import { ActivityReportOptionsDropdown } from '.'

interface ActivityReportOptionsDropdownClientProps {
  children: ReactNode
}

export function ActivityReportOptionsDropdownClient({
  children
}: ActivityReportOptionsDropdownClientProps) {
  return (
    <ActivityReportOptionsDropdown.Root>
      <ActivityReportOptionsDropdown.Trigger />
      <ActivityReportOptionsDropdown.Menu>
        <ActivityReportOptionsDropdown.Item>
          {children}
        </ActivityReportOptionsDropdown.Item>
      </ActivityReportOptionsDropdown.Menu>
    </ActivityReportOptionsDropdown.Root>
  )
}
