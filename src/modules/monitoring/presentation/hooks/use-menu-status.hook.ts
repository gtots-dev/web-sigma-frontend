import type { MonitoringCell } from '../../domain/interfaces/monitoring-cell.interface'

export function useMenuStatus(status: MonitoringCell['status']) {
  const colorMap = {
    ok: {
      bar: 'bg-[rgb(var(--monitoring-ok))]',
      text: 'text-[rgb(var(--monitoring-ok))]',
      accent: 'bg-[rgb(var(--monitoring-ok))]',
      width: 'w-full'
    },
    error: {
      bar: 'bg-[rgb(var(--monitoring-error))]',
      text: 'text-[rgb(var(--monitoring-error))]',
      accent: 'bg-[rgb(var(--monitoring-error))]',
      width: 'w-1/3'
    },
    warning: {
      bar: 'bg-[rgb(var(--monitoring-warning))]',
      text: 'text-[rgb(var(--monitoring-warning))]',
      accent: 'bg-[rgb(var(--monitoring-warning))]',
      width: 'w-2/3'
    }
  }

  return colorMap[status]
}
