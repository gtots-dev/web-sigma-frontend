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
    isMaximized,
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
      className={`md:relative absolute right-0 top-0 bg-white dark:bg-zinc-950 md:bg-transparent border-zinc-200 dark:border-zinc-800 flex flex-row items-center z-30 transition-all duration-300 ease-in-out ${
        isMaximized ? 'h-full' : 'h-[calc(100svh-115px)]'
      } ${isSidebarOpen ? 'w-[300px] border-l' : 'w-0 border-l-0 pointer-events-none'}`}
    >
      {/* Trigger Tab/Button on the left edge */}
      <MonitoringSidebarFiltersTrigger
        isSidebarOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        stopPropagation={stopPropagation}
      />

      {/* Sidebar Content */}
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
