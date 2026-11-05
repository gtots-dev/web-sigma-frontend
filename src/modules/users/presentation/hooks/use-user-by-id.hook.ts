'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import { useUserStore } from '../stores/user.store'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { UserEntity } from '../../domain/entities/user.entity'
import type { UserEnableAndDisableInterface } from '../../domain/interfaces/user-enable-and-disable.interface'

export type UserWithStatus = UserEntity & Partial<UserEnableAndDisableInterface>

export function useUserById(userId: number) {
  const { operationId }: UrlParams = useParams()
  const { users, getUsers } = useUserStore()
  const [loading, setLoading] = useState(users.length === 0)

  useEffect(() => {
    let active = true

    if (users.length === 0) {
      setLoading(true)
      getUsers({ operationId })
        .catch(() => undefined)
        .finally(() => {
          if (active) setLoading(false)
        })
    } else {
      setLoading(false)
    }

    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operationId])

  const user = useMemo<UserWithStatus | null>(
    () =>
      (users.find((item) => item.id === userId) as
        | UserWithStatus
        | undefined) ?? null,
    [users, userId]
  )

  return {
    user,
    users,
    loading
  }
}
