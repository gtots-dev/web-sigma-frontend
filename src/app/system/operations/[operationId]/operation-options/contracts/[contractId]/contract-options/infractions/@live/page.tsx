'use client'

import { useInfractionsWebsocketStore } from '@/modules/infractions/presentation/stores/infractions-websocket.store'
import { useLiveInfractionSelection } from '@/modules/infractions/presentation/hooks/use-live-infraction-selection.hook'
import { useLiveModeHotKey } from '@/modules/infractions/presentation/hooks/use-live-mode-hotkey.hook'
import { useInfractionViewedTracker } from '@/modules/infractions/presentation/hooks/use-infraction-viewed-tracker.hook'
import { useLiveInfractionActiveAsset } from '@/modules/infractions/presentation/hooks/use-live-infraction-active-asset.hook'
import { useInfractionsSidebarFilter } from '@/modules/infractions/presentation/hooks/use-infractions-sidebar-filter.hook'
import { InfractionsPanel } from '@/modules/infractions/presentation/components/infractions-panel'
import { InfractionsSidebar } from '@/modules/infractions/presentation/components/infractions-sidebar'
import { InfractionViewer } from '@/modules/infractions/presentation/components/infraction-viewer'
import { InfractionImageViewer } from '@/modules/infractions/presentation/components/infraction-image-viewer'
import { InfractionVideoViewer } from '@/modules/infractions/presentation/components/infraction-video-viewer'
import { InfractionDescription } from '@/modules/infractions/presentation/components/infraction-description'
import { InfractionsTimeline } from '@/modules/infractions/presentation/components/infractions-timeline'

export default function LiveSlotPage() {

  const infractions = useInfractionsWebsocketStore((state) => state.infractions)

  const {
    isLiveMode,
    activeItem,
    currentIndex,
    hasPrevious,
    hasNext,
    handleToggleLive,
    handleSelectToggle,
    handleNavigatePrevious,
    handleNavigateNext
  } = useLiveInfractionSelection(infractions)

  useLiveModeHotKey(handleToggleLive)

  const viewedIds = useInfractionViewedTracker(activeItem)

  const {
    searchQuery,
    setSearchQuery,
    selectedOptions,
    toggleOption,
    setCategoryOptions,
    clearAll,
    availableLanes,
    availableViolations,
    availableRestrictions,
    filteredItems
  } = useInfractionsSidebarFilter({ items: infractions, viewedIds })

  const {
    lane_id,
    activeFiles,
    safeFileIndex,
    activeSrc,
    activeIsVideo,
    setActiveFileIndex
  } = useLiveInfractionActiveAsset(activeItem)

  if (infractions.length === 0) return <InfractionsPanel.Empty />
  if (!activeItem) return null

  return (
    <div className="flex flex-col h-[74vh] min-h-0 w-full overflow-hidden">
      <InfractionsPanel.Root>
        <InfractionsSidebar.Root>
          <InfractionsSidebar.Header
            count={filteredItems.length}
            isLive={isLiveMode}
            onToggleLive={handleToggleLive}
          />
          <InfractionsSidebar.Filter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedOptions={selectedOptions}
            onToggleOption={toggleOption}
            onSetCategoryOptions={setCategoryOptions}
            onClear={clearAll}
            availableLanes={availableLanes}
            availableViolations={availableViolations}
            availableRestrictions={availableRestrictions}
            hasUnread={true}
          />
          <InfractionsSidebar.List>
            {filteredItems.length === 0 ? (
              <div className="py-8 px-4 text-center flex flex-col items-center justify-center gap-1.5 text-muted-foreground">
                <span className="text-xs font-medium">
                  Nenhum registro encontrado
                </span>
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-[11px] text-primary-500 hover:underline font-semibold cursor-pointer"
                >
                  Limpar filtros
                </button>
              </div>
            ) : (
              filteredItems.map((item) => {
                const isSelected = activeItem === item
                const isViewed = viewedIds.has(item.id)
                const thumbnailSrc =
                  item.files[0]?.thumbUrl || item.files[0]?.url || ''

                return (
                  <InfractionsSidebar.List.Item.Root
                    key={item.id}
                    isSelected={isSelected}
                    isViewed={isViewed}
                    onSelect={() => handleSelectToggle(item)}
                  >
                    <InfractionsSidebar.List.Item.Thumbnail
                      src={thumbnailSrc}
                    />
                    <InfractionsSidebar.List.Item.Info
                      title={item.formattedDate}
                      time={item.formattedTime}
                      isSelected={isSelected}
                      isViewed={isViewed}
                      expiresAt={item.expiresAt}
                    />
                  </InfractionsSidebar.List.Item.Root>
                )
              })
            )}
          </InfractionsSidebar.List>
        </InfractionsSidebar.Root>

        <div className="flex flex-1 min-w-0 h-full gap-x-10">
          <InfractionViewer.Root>
            {activeIsVideo && activeSrc ? (
              <InfractionVideoViewer.Root src={activeSrc}>
                <InfractionVideoViewer.Player />
                <InfractionVideoViewer.Sequence />
              </InfractionVideoViewer.Root>
            ) : (
              <InfractionImageViewer.Root>
                <InfractionImageViewer.Display src={activeSrc}>
                  <InfractionViewer.Empty />
                </InfractionImageViewer.Display>

                <InfractionImageViewer.Nav
                  hasPrevious={hasPrevious}
                  hasNext={hasNext}
                  onPrevious={handleNavigatePrevious}
                  onNext={handleNavigateNext}
                />

                <InfractionImageViewer.Badge
                  currentIndex={currentIndex}
                  totalCount={infractions.length}
                  isLive={isLiveMode}
                  onToggleLive={handleToggleLive}
                />

                <InfractionImageViewer.Fullscreen
                  src={activeSrc}
                  hasPrevious={hasPrevious}
                  hasNext={hasNext}
                  onPrevious={handleNavigatePrevious}
                  onNext={handleNavigateNext}
                  currentIndex={currentIndex}
                  totalCount={infractions.length}
                />
              </InfractionImageViewer.Root>
            )}
          </InfractionViewer.Root>

          <InfractionsPanel.RightSidebar>
            <InfractionDescription.Root>
              <InfractionDescription.Header id={lane_id} laneId={lane_id} />
            </InfractionDescription.Root>

            <InfractionViewer.Strip>
              <InfractionsTimeline.Root>
                {activeFiles.map((file, idx) => (
                  <InfractionsTimeline.Item.Root
                    key={idx}
                    isActive={safeFileIndex === idx}
                    onSelect={() => setActiveFileIndex(idx)}
                  >
                    {file.fileType === 'video' ? (
                      <InfractionsTimeline.Item.Video
                        src={file.thumbUrl || file.url}
                      />
                    ) : (
                      <InfractionsTimeline.Item.Image
                        src={file.thumbUrl || file.url}
                      />
                    )}
                  </InfractionsTimeline.Item.Root>
                ))}
              </InfractionsTimeline.Root>
            </InfractionViewer.Strip>
          </InfractionsPanel.RightSidebar>
        </div>
      </InfractionsPanel.Root>
    </div>
  )
}
