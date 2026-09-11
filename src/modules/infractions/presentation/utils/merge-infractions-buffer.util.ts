import type { Infraction } from '../../domain/interfaces/infraction.interface'
import { deduplicateById } from './deduplicate-infractions.util'

export interface MergeBufferResult {
  readonly infractions: Infraction[]
  readonly pageStart: number
  readonly pageEnd: number
  readonly hasOlder: boolean
  readonly hasNewer: boolean
}

export interface BufferWindowOptions {
  readonly pageStart: number
  readonly pageEnd: number
  readonly targetPage: number
  readonly bufferLimit: number
  readonly perPage: number
}

export const mergeOlderInfractionsBuffer = (
  currentInfractions: readonly Infraction[],
  olderInfractions: readonly Infraction[],
  options: BufferWindowOptions
): MergeBufferResult => {
  const { pageStart, targetPage, bufferLimit, perPage } = options
  const uniqueOlder = deduplicateById([...olderInfractions])
  const merged = deduplicateById([...currentInfractions, ...uniqueOlder])
  const shouldSlice = merged.length > bufferLimit
  const sliced = shouldSlice ? merged.slice(perPage) : merged
  const newPageStart = shouldSlice ? pageStart + 1 : pageStart

  return {
    infractions: sliced,
    pageStart: newPageStart,
    pageEnd: targetPage,
    hasOlder: olderInfractions.length === perPage,
    hasNewer: newPageStart > 1
  }
}

export const mergeNewerInfractionsBuffer = (
  currentInfractions: readonly Infraction[],
  newerInfractions: readonly Infraction[],
  options: BufferWindowOptions
): MergeBufferResult => {
  const { pageEnd, targetPage, bufferLimit } = options
  const uniqueNewer = deduplicateById([...newerInfractions])
  const merged = deduplicateById([...uniqueNewer, ...currentInfractions])
  const shouldSlice = merged.length > bufferLimit
  const sliced = shouldSlice ? merged.slice(0, bufferLimit) : merged
  const newPageEnd = shouldSlice ? pageEnd - 1 : pageEnd

  return {
    infractions: sliced,
    pageStart: targetPage,
    pageEnd: newPageEnd,
    hasNewer: targetPage > 1,
    hasOlder: true
  }
}
