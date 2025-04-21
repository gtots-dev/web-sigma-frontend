import { Fragment, type ReactNode } from 'react'
import { getUsers } from '../../utils/get-users.util'
import { TableBody } from '@/modules/shared/presentation/components/shadcn/table'
import { MESSAGES_USERS } from '@/modules/shared/presentation/messages/users'
import type { UserInterface } from '@/modules/users/domain/interfaces/user.interface'
import { TableUsersMessage } from './table-users-message.component'

interface TableUsersBodyComponentProps {
  children: (user: UserInterface) => ReactNode
}

export async function TableUsersBodyComponent({
  children
}: TableUsersBodyComponentProps) {
  const users = await getUsers()

  return (
    <TableBody>
      {users && users.length > 0 ? (
        users.map((user: UserInterface) => children(user))
      ) : (
        <TableUsersMessage message={MESSAGES_USERS[5.3]} />
      )}
    </TableBody>
  )
}
