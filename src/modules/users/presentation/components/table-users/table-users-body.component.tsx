'use client'

import type { ReactNode } from 'react'
import { TableBody } from '@/modules/shared/presentation/components/shadcn/table'
import { MESSAGES_USERS } from '@/modules/shared/presentation/messages/users'
import { TableMessage } from '@/modules/shared/presentation/components/table-addons/table-message.component'
import { TableLoading } from '@/modules/shared/presentation/components/table-addons/table-loading.component'
import type { UserEntity } from '@/modules/users/domain/entities/user.entity'
import { TableUserContext } from '../../contexts/table-user.context'
import { useTableUsers } from '../../hooks/use-table-users.hook'

export function TableUsersBodyComponent({ children }: { children: ReactNode }) {
  const { users, loading } = useTableUsers()

  if (loading)
    return (
      <TableBody>
        <TableLoading colSpan={4} />
      </TableBody>
    )

  if (users.length === 0)
    return (
      <TableBody>
        <TableMessage colSpan={4} message={MESSAGES_USERS['5.3']} />
      </TableBody>
    )

  return (
    <TableBody>
      {users.map((user: UserEntity) => (
        <TableUserContext.Provider key={user.id} value={user}>
          {children}
        </TableUserContext.Provider>
      ))}
    </TableBody>
  )
}
