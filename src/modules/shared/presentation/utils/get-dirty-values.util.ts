import type { FieldValues, FieldNamesMarkedBoolean } from 'react-hook-form'

/**
 * Extrai apenas os campos marcados como 'dirty' (modificados) pelo React Hook Form,
 * garantindo a preservação do campo 'id' (identificador da entidade) para rotas que o exigem.
 */
export function getDirtyValues<T extends FieldValues>(
  dirtyFields: FieldNamesMarkedBoolean<T> | Record<string, unknown>,
  allValues: T
): Partial<T> {
  const dirtyValues: Partial<T> = {}

  if (
    'id' in allValues &&
    allValues.id !== undefined &&
    allValues.id !== null
  ) {
    dirtyValues['id' as keyof T] = allValues.id
  }

  const dirtyRecord = dirtyFields as Record<string, unknown>
  const dirtyKeys = Object.keys(dirtyRecord) as Array<keyof T>

  for (const key of dirtyKeys) {
    const isFieldDirty = dirtyRecord[key as string]

    if (isFieldDirty === true) {
      dirtyValues[key] = allValues[key]
    } else if (
      typeof isFieldDirty === 'object' &&
      isFieldDirty !== null &&
      !Array.isArray(isFieldDirty)
    ) {
      const nestedValue = allValues[key]
      if (typeof nestedValue === 'object' && nestedValue !== null) {
        dirtyValues[key] = getDirtyValues(
          isFieldDirty as Record<string, unknown>,
          nestedValue as FieldValues
        ) as T[keyof T]
      }
    }
  }

  return dirtyValues
}
