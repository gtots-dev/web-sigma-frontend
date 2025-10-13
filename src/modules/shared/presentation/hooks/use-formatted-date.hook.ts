'use client'

import { useEffect, useMemo, useState } from 'react'

type UseFormattedDateOptions = {
  options?: Intl.DateTimeFormatOptions
}

export function useFormattedDate(
  isoDate: string,
  {options = {} }: UseFormattedDateOptions = {}
): {
  formatted: string
  hasMounted: boolean
} {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  return useMemo(() => {
    const date = new Date(isoDate)
    if (isNaN(date.getTime()))
      return {
        formatted: 'Data inválida',
        hasMounted: false
      }

    const deviceTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const formatOptions: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: deviceTimeZone,
      ...options
    }

    return {
      formatted: new Intl.DateTimeFormat('pt-BR', formatOptions).format(date),
      hasMounted
    }
  }, [isoDate, options, hasMounted])
}
