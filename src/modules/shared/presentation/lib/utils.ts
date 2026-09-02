import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatChartNumber(
  value: number | string,
  options?: { percentage?: boolean; decimals?: number }
): string {
  const num = Number(value) || 0
  const decimals = options?.decimals ?? 4

  if (options?.percentage) {
    return `${num.toFixed(decimals)}%`
  }

  return num.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })
}
