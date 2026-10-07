'use client'

import { useMonitoringSidebarFilters } from '../../hooks/use-monitoring-sidebar-filters.hook'
import { MonitoringSidebarFiltersTrigger } from './monitoring-sidebar-filters-trigger.component'
import { MonitoringSidebarFiltersContent } from './monitoring-sidebar-filters-content.component'

export function MonitoringSidebarFilters() {
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    telemetryItems,
    selectedTelemetryFilters,
    toggleTelemetryFilter,
    searchQuery,
    setSearchQuery,
    filteredItems,
    allVisibleSelected,
    handleSelectAllOrClear,
    stopPropagation
  } = useMonitoringSidebarFilters()

  return (
    <div
      onPointerDown={stopPropagation}
      onMouseDown={stopPropagation}
      onPointerMove={stopPropagation}
      onMouseMove={stopPropagation}
      onWheel={stopPropagation}
      onTouchStart={stopPropagation}
      onTouchMove={stopPropagation}
      className={`absolute right-0 top-0 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 flex flex-row items-center z-30 transition-transform duration-300 ease-in-out h-full w-[300px] ${
        isSidebarOpen
          ? 'translate-x-0 border-l shadow-xl'
          : 'translate-x-full border-l-0'
      }`}
    >
      <MonitoringSidebarFiltersTrigger
        isSidebarOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        stopPropagation={stopPropagation}
      />

      <MonitoringSidebarFiltersContent
        isSidebarOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        telemetryItems={telemetryItems}
        filteredItems={filteredItems}
        selectedTelemetryFilters={selectedTelemetryFilters}
        selectedCount={selectedTelemetryFilters.size}
        allVisibleSelected={allVisibleSelected}
        onSelectAllOrClear={handleSelectAllOrClear}
        onToggleFilter={toggleTelemetryFilter}
      />
    </div>
  )
}
