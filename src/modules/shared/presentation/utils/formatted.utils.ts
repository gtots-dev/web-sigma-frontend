export function parseDateOnly(dateStr?: string | null): Date | undefined {
  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return undefined
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function formatDatePTBR(date: Date | string): string {
  if (typeof date === 'string') {
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    }
    const parsed = parseDateOnly(date)
    if (parsed) return formatDatePTBR(parsed)
    date = new Date(date)
  }
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${day}/${month}/${year}`
}

export function formatDateOnly(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function formatTimeOnly(hour: number, minute: number) {
  return [hour, minute].map((v) => String(v).padStart(2, '0')).join(':')
}

const pad = (n: number) => n.toString().padStart(2, '0')

export const normalizeInputValue = (v: string) => {
  const [hh, mm] = v.split(':')
  return `${pad(Number(hh))}:${pad(Number(mm))}`
}

export const toInputHHMM = (v?: string) => (v && /^\d{2}:\d{2}$/.test(v) ? v : '00:00')