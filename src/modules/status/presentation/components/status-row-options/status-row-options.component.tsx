'use client'

import { useTableStatus } from '../../contexts/table-status.context'
import { StatusOptionsDropdown } from '../status-options-dropdown'
import { StatusModalTrigger } from '../status-modal-triggers'

interface StatusRowOptionsProps {
  canEditUps: boolean
  canEditLanes: boolean
}

export function StatusRowOptionsComponent({
  canEditUps,
  canEditLanes
}: StatusRowOptionsProps) {
  const status = useTableStatus()

  const canEdit = status.origin === 'UP' ? canEditUps : canEditLanes

  return (
    <StatusOptionsDropdown.Root>
      <StatusOptionsDropdown.Trigger />
      <StatusOptionsDropdown.Menu>
        <StatusOptionsDropdown.Item>
          <StatusModalTrigger.ViewMore />
        </StatusOptionsDropdown.Item>
        {canEdit && (
          <StatusOptionsDropdown.Item>
            <StatusModalTrigger.Ignore />
          </StatusOptionsDropdown.Item>
        )}
      </StatusOptionsDropdown.Menu>
    </StatusOptionsDropdown.Root>
  )
}
