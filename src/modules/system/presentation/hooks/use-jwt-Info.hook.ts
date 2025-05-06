'use client'

import { useEffect, useState, useCallback } from 'react'
import { JwtTokenDecodeFactory } from '@/modules/shared/infrastructure/factories/jwt-decode.factory'
import { useSession } from 'next-auth/react'
import type { JwtDecodeDataInterface } from '@/modules/shared/domain/interfaces/jwt-decode-data.interface'

interface UseJwtInfoReturn {
  jwtInfo: JwtDecodeDataInterface | null
  loading: boolean
  error: Error | null
}

export function useJwtInfo(): UseJwtInfoReturn {
  const [jwtInfo, setJwtInfo] = useState<JwtDecodeDataInterface | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const { data: session, status } = useSession()
  const token = session?.token

  const decodeToken = useCallback(() => {
    const jwtDecoder = JwtTokenDecodeFactory.create()
    return jwtDecoder.decode(token.access_token!)
  }, [token.access_token])

  useEffect(() => {
    if (status !== 'authenticated' || !token.access_token) return

    try {
      if (typeof token.access_token !== 'string') {
        throw new Error('Invalid token format')
      }

      const decoded = decodeToken()
      setJwtInfo(decoded as JwtDecodeDataInterface)
    } catch (err) {
      setError(err as Error)
    }
  }, [decodeToken, token, status])

  const loading =
    status === 'loading' || (status === 'authenticated' && !jwtInfo && !error)

  return { jwtInfo, loading, error }
}
