'use client'

import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

export interface ActiveFilterItem {
  key: string
  label: string
  value: string
}

export interface UseSystemFiltersActiveIndicatorProps<T extends object = object> {
  labels?: Record<string, string>
  values?: T
  /** Função resolutora opcional para converter IDs em nomes amigáveis */
  valueResolver?: (key: string, value: unknown) => string | undefined | null
}

const IGNORED_KEYS = new Set([
  'operation_ids',
  'operation_id',
  'operationId',
  'contract_id',
  'contractId',
  'page',
  'per_page',
  'pagination',
  'filters'
])

function parseAndFormatValue(
  key: string,
  val: unknown,
  valueResolver?: (key: string, value: unknown) => string | undefined | null
): string | null {
  if (val === undefined || val === null || val === '') return null

  if (Array.isArray(val)) {
    if (val.length === 0) return null

    if (valueResolver) {
      const resolvedList = val
        .map((item) => valueResolver(key, item))
        .filter((res): res is string => Boolean(res))

      if (resolvedList.length > 0) {
        return resolvedList.length > 3
          ? `${resolvedList.slice(0, 2).join(', ')} e +${resolvedList.length - 2}`
          : resolvedList.join(', ')
      }
    }

    if (typeof val[0] === 'object' && val[0] !== null) {
      return `${val.length} selecionado(s)`
    }
    return val.join(', ')
  }

  if (valueResolver) {
    const resolved = valueResolver(key, val)
    if (resolved) return resolved
  }

  if (typeof val === 'string') {
    if (/^\d{4}-\d{2}-\d{2}$/.test(val)) {
      const [year, month, day] = val.split('-')
      return `${day}/${month}/${year}`
    }
    return val
  }

  if (typeof val === 'number' || typeof val === 'boolean') {
    return String(val)
  }

  return null
}

function extractActiveFilterItems(
  obj: Record<string, unknown>,
  labels?: Record<string, string>,
  valueResolver?: (key: string, value: unknown) => string | undefined | null,
  prefix = ''
): ActiveFilterItem[] {
  const items: ActiveFilterItem[] = []

  for (const [key, val] of Object.entries(obj)) {
    if (val === undefined || val === null || val === '') continue
    if (Array.isArray(val) && val.length === 0) continue

    const fullKey = prefix ? `${prefix}.${key}` : key

    if (IGNORED_KEYS.has(key) || IGNORED_KEYS.has(fullKey)) continue

    if (labels && !labels[key] && !labels[fullKey]) {
      if (typeof val !== 'object' || val === null || Array.isArray(val)) {
        continue
      }
    }

    // Intervalos de data/hora (start/end)
    if (
      typeof val === 'object' &&
      val !== null &&
      !Array.isArray(val) &&
      ('start' in val || 'end' in val)
    ) {
      const range = val as { start?: string | null; end?: string | null }

      if (key === 'time_range' || fullKey.endsWith('time_range')) {
        const isStartDefault = !range.start || range.start.startsWith('00:00')
        const isEndDefault = !range.end || range.end.startsWith('23:59')
        if (isStartDefault && isEndDefault) continue
      }

      const startFormatted = parseAndFormatValue('start', range.start, valueResolver)
      const endFormatted = parseAndFormatValue('end', range.end, valueResolver)
      const label = labels?.[key] ?? labels?.[fullKey] ?? key

      if (startFormatted && endFormatted) {
        items.push({ key: fullKey, label, value: `${startFormatted} até ${endFormatted}` })
      } else if (startFormatted) {
        items.push({ key: fullKey, label, value: `A partir de ${startFormatted}` })
      } else if (endFormatted) {
        items.push({ key: fullKey, label, value: `Até ${endFormatted}` })
      }
      continue
    }

    // Sub-objetos genéricos
    if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
      const nested = extractActiveFilterItems(
        val as Record<string, unknown>,
        labels,
        valueResolver,
        key
      )
      items.push(...nested)
      continue
    }

    const formatted = parseAndFormatValue(key, val, valueResolver)
    if (formatted !== null) {
      items.push({
        key: fullKey,
        label: labels?.[key] ?? labels?.[fullKey] ?? key,
        value: formatted
      })
    }
  }

  return items
}

export function useSystemFiltersActiveIndicator<T extends object = object>({
  labels,
  values: externalValues,
  valueResolver
}: UseSystemFiltersActiveIndicatorProps<T>) {
  let values: Record<string, unknown> = {}

  try {
    const formContext = useFormContext()
    const rawValues =
      externalValues ?? formContext?.watch?.() ?? formContext?.getValues?.() ?? {}
    values = (rawValues ?? {}) as Record<string, unknown>
  } catch {
    values = (externalValues ?? {}) as Record<string, unknown>
  }

  const activeItems = useMemo(
    () => extractActiveFilterItems(values, labels, valueResolver),
    [values, labels, valueResolver]
  )

  return {
    activeItems,
    count: activeItems.length
  }
}
