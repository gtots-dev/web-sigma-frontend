'use client'

import { InfractionsMenu } from '.'
import { InfractionDescription } from '../infraction-description'
import { InfractionViewer } from '../infraction-viewer'
import { InfractionImageViewer } from '../infraction-image-viewer'
import { InfractionVideoViewer } from '../infraction-video-viewer'
import { InfractionsPanel } from '../infractions-panel'
import { InfractionsSidebar } from '../infractions-sidebar'
import { InfractionsTimeline } from '../infractions-timeline'
import { useInfractionsSelection } from '../../hooks/use-infractions-selection.hook'
import { useInfractionsMenuContext } from '../../contexts/infractions-menu.context'
import { useInfractionMedia } from '../../hooks/use-infraction-media.hook'
import { formatCaptureDateTime } from '../../hooks/use-infraction-formatted-date.hook'
import { useInfractionsKeyboardNavigation } from '../../hooks/use-infractions-keyboard-navigation.hook'

export function InfractionsMenuComponent() {
  const { isOpen, close, infractions, selectedInfraction } =
    useInfractionsMenuContext()

  const {
    activeId,
    handleSelect,
    activeInfraction,
    sortedInfractions,
    currentIndex,
    hasPrevious,
    hasNext,
    handleNavigatePrevious,
    handleNavigateNext
  } = useInfractionsSelection(infractions, selectedInfraction?.id)

  const {
    activeAssetIndex,
    setActiveAssetIndex,
    activeMediaAssets,
    activeAsset
  } = useInfractionMedia(activeInfraction)

  useInfractionsKeyboardNavigation({
    enabled: isOpen,
    onNavigatePrevious: handleNavigatePrevious,
    onNavigateNext: handleNavigateNext
  })

  if (!selectedInfraction || !activeInfraction) return null
  if (infractions.length === 0) return <InfractionsPanel.Empty />

  const lane_id = activeInfraction.lane_id
  const activeImageUrl = activeAsset?.src || activeInfraction.files?.[0]?.url

  return (
    <InfractionsMenu.Root isOpen={isOpen} close={close}>
      <InfractionsMenu.Content className="md:max-w-[1200px] lg:max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] w-[98vw] !h-[95vh] p-3">
        <InfractionsPanel.Root>
          <InfractionsSidebar.Root>
            <InfractionsSidebar.Header
              title="Registros"
              count={sortedInfractions.length}
            />
            <InfractionsSidebar.List>
              {sortedInfractions.map((infraction) => {
                const isSelected = String(infraction.id) === String(activeId)
                const { date, time } = formatCaptureDateTime(infraction.date)

                const thumbnailSrc =
                  infraction.files?.[0]?.thumbnails?.[0]?.url ||
                  infraction.files?.[0]?.url

                return (
                  <InfractionsSidebar.List.Item.Root
                    key={infraction.id}
                    isSelected={isSelected}
                    onSelect={() => handleSelect(infraction.id)}
                  >
                    <InfractionsSidebar.List.Item.Thumbnail
                      src={thumbnailSrc || null}
                    />
                    <InfractionsSidebar.List.Item.Info
                      title={date}
                      time={time}
                      isSelected={isSelected}
                    />
                  </InfractionsSidebar.List.Item.Root>
                )
              })}
            </InfractionsSidebar.List>
          </InfractionsSidebar.Root>

          <InfractionViewer.Root>
            {activeAsset?.type === 'video' ? (
              <InfractionVideoViewer.Root src={activeAsset.src}>
                <InfractionVideoViewer.Player />
                <InfractionVideoViewer.Sequence />
              </InfractionVideoViewer.Root>
            ) : (
              <InfractionImageViewer.Root>
                <InfractionImageViewer.Display src={activeImageUrl || null}>
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
                  totalCount={sortedInfractions.length}
                />

                <InfractionImageViewer.Fullscreen
                  src={activeImageUrl || null}
                  hasPrevious={hasPrevious}
                  hasNext={hasNext}
                  onPrevious={handleNavigatePrevious}
                  onNext={handleNavigateNext}
                />
              </InfractionImageViewer.Root>
            )}

            <InfractionViewer.Strip>
              <InfractionsTimeline.Root>
                {activeMediaAssets.map((asset, index) => {
                  const isActive = index === activeAssetIndex
                  return (
                    <InfractionsTimeline.Item.Root
                      key={asset.id || index}
                      isActive={isActive}
                      onSelect={() => setActiveAssetIndex(index)}
                    >
                      {asset.type === 'video' ? (
                        <InfractionsTimeline.Item.Video src={asset.src} />
                      ) : (
                        <InfractionsTimeline.Item.Image src={asset.src} />
                      )}
                    </InfractionsTimeline.Item.Root>
                  )
                })}
              </InfractionsTimeline.Root>
            </InfractionViewer.Strip>
          </InfractionViewer.Root>

          <InfractionDescription.Root>
            <InfractionDescription.Header id={lane_id} laneId={lane_id} />
          </InfractionDescription.Root>
        </InfractionsPanel.Root>
      </InfractionsMenu.Content>
    </InfractionsMenu.Root>
  )
}
