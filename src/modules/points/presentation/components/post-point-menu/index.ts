import { PostPointMenuProvider } from '../../contexts/post-point-menu.context'
import { PostPointMenuContentComponent } from './post-point-menu-content.component'
import { PostPointMenuFooterComponent } from './post-point-menu-footer.component'
import { PostPointMenuHeaderComponent } from './post-point-menu-header.component'
import { PostPointMenuRootComponent } from './post-point-menu-root.component'
import { PostPointMenuTriggerComponent } from './post-point-menu-trigger.component'

export const PostPointMenu = {
  Root: PostPointMenuRootComponent,
  Trigger: PostPointMenuTriggerComponent,
  Content: PostPointMenuContentComponent,
  Footer: PostPointMenuFooterComponent,
  Header: PostPointMenuHeaderComponent,
  Provider: PostPointMenuProvider
}
