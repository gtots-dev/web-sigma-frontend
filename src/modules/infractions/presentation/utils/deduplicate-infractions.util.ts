import type { Infraction } from '../../domain/interfaces/infraction.interface'

export interface WithId {
  readonly id?: number | string | null
}

/**
 * Desduplica um array de elementos com base no identificador único `id`.
 * Genérico e imutável para funcionar com qualquer tipo T que possua campo `id`.
 */
export const deduplicateById = <T extends WithId>(items: readonly T[]): T[] => {
  const map = new Map<number | string, T>()
  for (const item of items) {
    if (item?.id != null && !map.has(item.id)) {
      map.set(item.id, item)
    }
  }
  return Array.from(map.values())
}

/**
 * Alias para Infraction[].
 */
export const deduplicateInfractions = (items: readonly Infraction[]): Infraction[] => {
  return deduplicateById<Infraction>(items)
}
