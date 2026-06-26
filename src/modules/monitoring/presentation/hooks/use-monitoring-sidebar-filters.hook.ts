'use client'

import { useState, type SyntheticEvent } from 'react'
import { useMonitoringContext } from '../components/monitoring/monitoring-context.component'

export function useMonitoringSidebarFilters() {
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    telemetryItems,
    selectedTelemetryFilters,
    setSelectedTelemetryFilters,
    toggleTelemetryFilter,
    isMaximized
  } = useMonitoringContext()

  const [searchQuery, setSearchQuery] = useState('')

  const stopPropagation = (e: SyntheticEvent) => {
    e.stopPropagation()
  }

  // Filter items by search query
  const filteredItems = telemetryItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Checkbox/Selection logic
  const visibleKeys = filteredItems.map((item) => `${item.type}-${item.name}`)
  const allVisibleSelected =
    visibleKeys.length > 0 &&
    visibleKeys.every((key) => selectedTelemetryFilters.has(key))

  const handleSelectAllOrClear = () => {
    if (allVisibleSelected) {
      setSelectedTelemetryFilters((prev) => {
        const next = new Set(prev)
        visibleKeys.forEach((key) => next.delete(key))
        return next
      })
    } else {
      setSelectedTelemetryFilters((prev) => {
        const next = new Set(prev)
        visibleKeys.forEach((key) => next.add(key))
        return next
      })
    }
  }

  return {
    isSidebarOpen,
    setIsSidebarOpen,
    telemetryItems,
    selectedTelemetryFilters,
    toggleTelemetryFilter,
    isMaximized,
    searchQuery,
    setSearchQuery,
    filteredItems,
    allVisibleSelected,
    handleSelectAllOrClear,
    stopPropagation
  }
}
