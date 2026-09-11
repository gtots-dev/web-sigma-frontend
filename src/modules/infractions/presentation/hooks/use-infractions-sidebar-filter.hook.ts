'use client'

import { useMemo, useState } from 'react'
import { useViolationStore } from '@/modules/violations/presentation/stores/violations.store'
import { useRestrictionStore } from '@/modules/restrictions/presentation/stores/restrictions.store'
import { useLaneStore } from '@/modules/lanes/presentation/stores/lanes.store'

import { formatCaptureDateTime } from './use-infraction-formatted-date.hook'

export interface FilterableInfractionItem {
  id: string | number
  date?: string | Date
  captured_at?: string
  capturedAt?: string
  created_at?: string
  createdAt?: string
  formattedDate?: string
  formattedTime?: string
  lane_id?: string | number
  laneId?: string | number
  violation_id?: string | number | null
  violationId?: string | number | null
  restrictions_id?: Array<string | number>
  restrictionsId?: Array<string | number>
  restrictions?: Array<string | number>
  files?: Array<{
    fileType?: string
    url?: string
    thumbUrl?: string
    thumbnails?: Array<{ url: string }>
  }>
}

interface UseInfractionsSidebarFilterProps<T extends FilterableInfractionItem> {
  items: T[]
  viewedIds?: Set<string | number>
}

export function useInfractionsSidebarFilter<T extends FilterableInfractionItem>({
  items,
  viewedIds
}: UseInfractionsSidebarFilterProps<T>) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set())

  const { violations } = useViolationStore()
  const { restrictions } = useRestrictionStore()
  const { contractLanes } = useLaneStore()

  // 1. Available Lanes
  const availableLanes = useMemo(() => {
    const laneSet = new Set<string | number>()
    contractLanes.forEach(({ lane }) => {
      if (lane?.id !== undefined && lane?.id !== null) {
        laneSet.add(lane.id)
      }
    })
    items.forEach((item) => {
      const lane = item.lane_id ?? item.laneId
      if (lane !== undefined && lane !== null) {
        laneSet.add(lane)
      }
    })
    return Array.from(laneSet).sort((a, b) => Number(a) - Number(b))
  }, [items, contractLanes])

  // 2. Available Violations
  const availableViolations = useMemo(() => {
    const map = new Map<string | number, string>()
    violations.forEach((v) => {
      map.set(v.id, v.name)
    })
    items.forEach((item) => {
      const vId = item.violation_id ?? item.violationId
      if (vId !== undefined && vId !== null && !map.has(vId)) {
        map.set(vId, `Violação #${vId}`)
      }
    })
    return Array.from(map.entries()).map(([id, label]) => ({ id, label }))
  }, [items, violations])

  // 3. Available Restrictions
  const availableRestrictions = useMemo(() => {
    const map = new Map<string | number, string>()
    restrictions.forEach((r) => {
      map.set(r.id, r.name)
    })
    items.forEach((item) => {
      const list = item.restrictions_id ?? item.restrictionsId ?? item.restrictions ?? []
      list.forEach((rId) => {
        if (rId !== undefined && rId !== null && !map.has(rId)) {
          map.set(rId, `Restrição #${rId}`)
        }
      })
    })
    return Array.from(map.entries()).map(([id, label]) => ({ id, label }))
  }, [items, restrictions])

  const toggleOption = (optionKey: string) => {
    setSelectedOptions((prev) => {
      const next = new Set(prev)
      if (next.has(optionKey)) {
        next.delete(optionKey)
      } else {
        next.add(optionKey)
      }
      return next
    })
  }

  const setCategoryOptions = (prefix: string, newIds: (string | number)[]) => {
    setSelectedOptions((prev) => {
      const next = new Set(prev)
      Array.from(next).forEach((opt) => {
        if (opt.startsWith(prefix)) next.delete(opt)
      })
      newIds.forEach((id) => next.add(`${prefix}${id}`))
      return next
    })
  }

  const clearAll = () => {
    setSearchQuery('')
    setSelectedOptions(new Set())
  }

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const itemLane = item.lane_id ?? item.laneId
      const itemViolation = item.violation_id ?? item.violationId
      const itemRestrictions = item.restrictions_id ?? item.restrictionsId ?? item.restrictions ?? []

      // 1. Text Search Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        const idStr = String(item.id).toLowerCase()
        const laneStr = itemLane !== undefined ? `faixa ${itemLane}` : ''

        // Format date and time if not already formatted on the item
        let dateStr = item.formattedDate?.toLowerCase() || ''
        let timeStr = item.formattedTime?.toLowerCase() || ''

        const rawDate =
          item.date ??
          item.captured_at ??
          item.capturedAt ??
          item.created_at ??
          item.createdAt

        const rawDateStr =
          typeof rawDate === 'string'
            ? rawDate
            : rawDate instanceof Date
            ? rawDate.toISOString()
            : ''

        if (!dateStr || !timeStr) {
          const formatted = formatCaptureDateTime(rawDateStr)
          if (!dateStr) dateStr = formatted.date.toLowerCase()
          if (!timeStr) timeStr = formatted.time.toLowerCase()
        }

        const violationName = availableViolations
          .find((v) => String(v.id) === String(itemViolation))
          ?.label.toLowerCase() || ''

        const restrictionNames = itemRestrictions
          .map((rId) => availableRestrictions.find((r) => String(r.id) === String(rId))?.label.toLowerCase() || '')
          .join(' ')

        const matchesText =
          idStr.includes(query) ||
          laneStr.includes(query) ||
          dateStr.includes(query) ||
          timeStr.includes(query) ||
          rawDateStr.toLowerCase().includes(query) ||
          violationName.includes(query) ||
          restrictionNames.includes(query)

        if (!matchesText) return false
      }

      // 2. Multi-Option N Filters
      if (selectedOptions.size > 0) {
        // "Novos" Filter
        if (selectedOptions.has('new')) {
          const isViewed = viewedIds ? viewedIds.has(item.id) : true
          if (isViewed) return false
        }

        // Lane Filters
        const activeLaneOptions = Array.from(selectedOptions).filter((opt) => opt.startsWith('lane_'))
        if (activeLaneOptions.length > 0) {
          const itemLaneKey = `lane_${itemLane}`
          if (!activeLaneOptions.includes(itemLaneKey)) return false
        }

        // Violation Filters
        const activeViolationOptions = Array.from(selectedOptions).filter((opt) => opt.startsWith('violation_'))
        if (activeViolationOptions.length > 0) {
          const itemViolationKey = `violation_${itemViolation}`
          if (!activeViolationOptions.includes(itemViolationKey)) return false
        }

        // Restriction Filters
        const activeRestrictionOptions = Array.from(selectedOptions).filter((opt) => opt.startsWith('restriction_'))
        if (activeRestrictionOptions.length > 0) {
          const itemRestrictionKeys = itemRestrictions.map((rId) => `restriction_${rId}`)
          const hasMatchingRestriction = activeRestrictionOptions.some((opt) => itemRestrictionKeys.includes(opt))
          if (!hasMatchingRestriction) return false
        }
      }

      return true
    })
  }, [items, searchQuery, selectedOptions, viewedIds, availableViolations, availableRestrictions])

  return {
    searchQuery,
    setSearchQuery,
    selectedOptions,
    toggleOption,
    setCategoryOptions,
    clearAll,
    availableLanes,
    availableViolations,
    availableRestrictions,
    filteredItems,
    hasActiveFilters: searchQuery.length > 0 || selectedOptions.size > 0
  }
}
