import { PostGroupLaneMenuProvider } from '../../contexts/post-group-lane-menu.context'
import { PostGroupLaneMenuContentComponent } from './post-group-lane-menu-content.component'
import { PostGroupLaneMenuFooterComponent } from './post-group-lane-menu-footer.component'
import { PostGroupLaneMenuHeaderComponent } from './post-group-lane-menu-header.component'
import { PostGroupLaneMenuRootComponent } from './post-group-lane-menu-root.component'
import { PostGroupLaneMenuTriggerComponent } from './post-group-lane-menu-trigger.component'

export const PostGroupLaneMenu = {
  Root: PostGroupLaneMenuRootComponent,
  Trigger: PostGroupLaneMenuTriggerComponent,
  Content: PostGroupLaneMenuContentComponent,
  Footer: PostGroupLaneMenuFooterComponent,
  Header: PostGroupLaneMenuHeaderComponent,
  Provider: PostGroupLaneMenuProvider
}
