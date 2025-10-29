'use client'

import { useEffect, useState } from 'react'
import { useUserStore } from '../stores/user.store'
import type { UserEntity } from '../../domain/entities/user.entity'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export interface UseTableUsersResult {
  users: UserEntity[]
  loading: boolean
}

export function useTableUsers(): UseTableUsersResult {
  const { users, getUsers } = useUserStore()
  const { operationId }: UrlParams = useParams()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      await getUsers({ operationId })
      setLoading(false)
    }

    fetchUsers()
  }, [getUsers])

  return { users, loading }
}
