'use client'

import { useEffect, useState } from 'react'
import { JwtTokenDecodeFactory } from '@/modules/shared/infrastructure/factories/jwt-decode.factory'
import { useSession } from 'next-auth/react'
import type { JwtDecodeDataInterface } from '@/modules/shared/domain/interfaces/jwt-decode-data.interface'

export function useJwtInfo() {
  const [jwtInfo, setJwtInfo] = useState<JwtDecodeDataInterface | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status !== 'authenticated' || !session?.accessToken) return

    try {
      const jwtDecoder = JwtTokenDecodeFactory.create()
      const decoded = jwtDecoder.decode(session.accessToken)
      setJwtInfo(decoded as JwtDecodeDataInterface)
    } catch (err) {
      setError(err as Error)
    }
  }, [session, status])

  const loading =
    status === 'loading' || (status === 'authenticated' && !jwtInfo && !error)

  return { jwtInfo, loading, error }
}
