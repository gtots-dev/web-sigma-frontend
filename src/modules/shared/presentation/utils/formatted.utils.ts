export function formatDatePTBR(date: Date) {
  return date.toLocaleDateString('pt-BR')
}

export function formatDateOnly(date: Date) {
  return date.toISOString().split('T')[0]
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