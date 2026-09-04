'use client'

import { use } from 'react'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useInfractionsSocket } from '@/modules/infractions/presentation/hooks/use-infractions-socket.hook'
import { useInfractionsWebsocketStore } from '@/modules/infractions/presentation/stores/infractions-websocket.store'
import { useLiveInfractionSelection } from '@/modules/infractions/presentation/hooks/use-live-infraction-selection.hook'
import { useLiveModeHotKey } from '@/modules/infractions/presentation/hooks/use-live-mode-hotkey.hook'
import { useInfractionViewedTracker } from '@/modules/infractions/presentation/hooks/use-infraction-viewed-tracker.hook'
import { useLiveInfractionActiveAsset } from '@/modules/infractions/presentation/hooks/use-live-infraction-active-asset.hook'
import { InfractionsPanel } from '@/modules/infractions/presentation/components/infractions-panel'
import { InfractionsSidebar } from '@/modules/infractions/presentation/components/infractions-sidebar'
import { InfractionViewer } from '@/modules/infractions/presentation/components/infraction-viewer'
import { InfractionDescription } from '@/modules/infractions/presentation/components/infraction-description'
import { InfractionsTimeline } from '@/modules/infractions/presentation/components/infractions-timeline'

interface LiveSlotPageProps {
  params: Promise<UrlParams>
}

export default function LiveSlotPage({ params }: LiveSlotPageProps) {
  const { contractId } = use(params)
  useInfractionsSocket(String(contractId), true)

  const infractions = useInfractionsWebsocketStore(
    (state) => state.infractions
  )

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
            count={infractions.length}
            isLive={isLiveMode}
            onToggleLive={handleToggleLive}
          />
          <InfractionsSidebar.List>
            {infractions.map((item) => {
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
                  <InfractionsSidebar.List.Item.Thumbnail src={thumbnailSrc} />
                  <InfractionsSidebar.List.Item.Info
                    title={item.formattedDate}
                    time={item.formattedTime}
                    isSelected={isSelected}
                    isViewed={isViewed}
                  />
                </InfractionsSidebar.List.Item.Root>
              )
            })}
          </InfractionsSidebar.List>
        </InfractionsSidebar.Root>

        <InfractionViewer.Root>
          {activeIsVideo && activeSrc ? (
            <InfractionViewer.Video src={activeSrc} />
          ) : (
            <InfractionViewer.Image
              src={activeSrc}
              hasPrevious={hasPrevious}
              hasNext={hasNext}
              onNavigatePrevious={handleNavigatePrevious}
              onNavigateNext={handleNavigateNext}
              currentIndex={currentIndex}
              totalCount={infractions.length}
              isLive={isLiveMode}
              onToggleLive={handleToggleLive}
            >
              <InfractionViewer.Empty />
            </InfractionViewer.Image>
          )}

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
        </InfractionViewer.Root>

        <InfractionDescription.Root>
          <InfractionDescription.Header id={lane_id} laneId={lane_id} />
        </InfractionDescription.Root>
      </InfractionsPanel.Root>
    </div>
  )
}
