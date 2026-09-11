import { useMemo } from 'react'

export interface FormattedCaptureDateTime {
  date: string
  time: string
}

export function formatCaptureDateTime(
  dateStr?: string | null
): FormattedCaptureDateTime {
  if (!dateStr) {
    const now = new Date()
    return {
      date: now.toLocaleDateString('pt-BR'),
      time: now.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }
  }

  try {
    const d = new Date(dateStr)
    if (!isNaN(d.getTime())) {
      return {
        date: d.toLocaleDateString('pt-BR'),
        time: d.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      }
    }
  } catch {}

  const parts = dateStr.split(/[T ]/)
  const datePart = parts[0] || ''
  const timePart = parts[1]?.substring(0, 8) || ''
  return { date: datePart, time: timePart }
}

export function useInfractionFormattedDate(
  dateStr?: string | null
): FormattedCaptureDateTime {
  return useMemo(() => formatCaptureDateTime(dateStr), [dateStr])
}
