import { PostGroupPointMenuProvider } from '../../contexts/post-group-point-menu.context'
import { PostGroupPointMenuContentComponent } from './post-group-point-menu-content.component'
import { PostGroupPointMenuFooterComponent } from './post-group-point-menu-footer.component'
import { PostGroupPointMenuHeaderComponent } from './post-group-point-menu-header.component'
import { PostGroupPointMenuRootComponent } from './post-group-point-menu-root.component'
import { PostGroupPointMenuTriggerComponent } from './post-group-point-menu-trigger.component'

export const PostGroupPointMenu = {
  Root: PostGroupPointMenuRootComponent,
  Trigger: PostGroupPointMenuTriggerComponent,
  Content: PostGroupPointMenuContentComponent,
  Footer: PostGroupPointMenuFooterComponent,
  Header: PostGroupPointMenuHeaderComponent,
  Provider: PostGroupPointMenuProvider
}
