import { useEffect, useState } from 'react'
import { useUserStore } from '../stores/user.store'
import type { UserEntity } from '../../domain/entities/user.entity'

export interface UseTableUsersResult {
  users: UserEntity[]
  loading: boolean
}

export function useTableUsers(): UseTableUsersResult {
  const { users, getUsers } = useUserStore()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      await getUsers()
      setLoading(false)
    }

    fetchUsers()
  }, [getUsers])

  return { users, loading }
}
