'use client'

import { ReactNode } from 'react'
import { TableBody } from '@/modules/shared/presentation/components/shadcn/table'
import { TableMessage } from '@/modules/shared/presentation/components/table-addons/table-message.component'
import { TableLoading } from '@/modules/shared/presentation/components/table-addons/table-loading.component'
import { TableGroupContext } from '../../contexts/table-group.context'
import { useTableGroups } from '../../hooks/use-table-groups.hook'
import { MESSAGES_GROUP } from '@/modules/shared/presentation/messages/groups'
import type { GroupWithGroupInterface } from '@/modules/groups/domain/interfaces/group-with-group.interface'

interface TableGroupsBodyComponentProps {
  children: ReactNode
}

export function TableGroupsBodyComponent({
  children
}: TableGroupsBodyComponentProps) {
  const { groups, loading } = useTableGroups()

  if (loading)
    return (
      <TableBody>
        <TableLoading colSpan={4} />
      </TableBody>
    )

  if (groups.length === 0)
    return (
      <TableBody>
        <TableMessage colSpan={4} message={MESSAGES_GROUP['14.3']} />
      </TableBody>
    )

  return (
    <TableBody>
      {groups.map((group: GroupWithGroupInterface) => (
        <TableGroupContext.Provider key={group.group.id} value={group}>
          {children}
        </TableGroupContext.Provider>
      ))}
    </TableBody>
  )
}
