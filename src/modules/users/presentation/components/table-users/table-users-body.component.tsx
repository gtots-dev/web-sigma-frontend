'use client'

import { useEffect, useState } from 'react'
import {
  TableBody,
  TableCell,
  TableRow
} from '@/modules/shared/presentation/components/shadcn/table'
import { MESSAGES_USERS } from '@/modules/shared/presentation/messages/users'
import { TableUsersMessage } from './table-users-message.component'
import { useUserStore } from '../../stores/user.store'
import { TableUserContext } from '../../contexts/table-user.context'
import { Loader2 } from 'lucide-react'

export function TableUsersBodyComponent({
  children
}: {
  children: React.ReactNode
}) {
  const { users, getUsers } = useUserStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      await getUsers()
      setLoading(false)
    }

    fetchUsers()
  }, [getUsers])

  if (loading) {
    return (
      <TableBody>
        <TableRow className="!border-b bg-zinc-50 dark:bg-zinc-900">
          <TableCell
            className="h-[52px] px-10 text-zinc-700/80 dark:text-zinc-50/80"
            colSpan={4}
          >
            <div className="flex justify-center items-center h-full gap-x-2 w-full">
              <Loader2 className="animate-spin h-4 w-4" />
              <span className="text-sm">Carregando ...</span>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }

  if (!users || users.length === 0) {
    return (
      <TableBody>
        <TableUsersMessage message={MESSAGES_USERS[5.3]} />
      </TableBody>
    )
  }

  return (
    <TableBody>
      {users.map((user) => (
        <TableUserContext.Provider key={user.id} value={user}>
          {children}
        </TableUserContext.Provider>
      ))}
    </TableBody>
  )
}
