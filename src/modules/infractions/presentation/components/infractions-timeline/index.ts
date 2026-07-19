import { InfractionsTimelineRoot } from './infractions-timeline-root.component'
import { InfractionsTimelineItemRoot } from './infractions-timeline-item-root.component'
import { InfractionsTimelineItemImage } from './infractions-timeline-item-image.component'
import { InfractionsTimelineItemVideo } from './infractions-timeline-item-video.component'
import { InfractionsTimelineItemLabel } from './infractions-timeline-item-label.component'

const Item = {
  Root: InfractionsTimelineItemRoot,
  Image: InfractionsTimelineItemImage,
  Video: InfractionsTimelineItemVideo,
  Label: InfractionsTimelineItemLabel,
}

export const InfractionsTimeline = {
  Root: InfractionsTimelineRoot,
  Item,
}
