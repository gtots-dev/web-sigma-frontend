import { PostPointLaneMenuProvider } from '../../contexts/post-point-lane-menu.context'
import { PostPointLaneMenuContentComponent } from './post-point-lane-menu-content.component'
import { PostPointLaneMenuFooterComponent } from './post-point-lane-menu-footer.component'
import { PostPointLaneMenuHeaderComponent } from './post-point-lane-menu-header.component'
import { PostPointLaneMenuRootComponent } from './post-point-lane-menu-root.component'
import { PostPointLaneMenuTriggerComponent } from './post-point-lane-menu-trigger.component'

export const PostPointLaneMenu = {
  Root: PostPointLaneMenuRootComponent,
  Trigger: PostPointLaneMenuTriggerComponent,
  Content: PostPointLaneMenuContentComponent,
  Footer: PostPointLaneMenuFooterComponent,
  Header: PostPointLaneMenuHeaderComponent,
  Provider: PostPointLaneMenuProvider
}
