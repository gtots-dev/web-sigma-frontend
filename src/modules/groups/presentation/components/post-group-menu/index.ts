import { PostGroupMenuProvider } from '../../contexts/post-group-menu.context'
import { PostGroupMenuContentComponent } from './post-group-menu-content.component'
import { PostGroupMenuFooterComponent } from './post-group-menu-footer.component'
import { PostGroupMenuHeaderComponent } from './post-group-menu-header.component'
import { PostGroupMenuRootComponent } from './post-group-menu-root.component'
import { PostGroupMenuTriggerComponent } from './post-group-menu-trigger.component'

export const PostGroupMenu = {
  Root: PostGroupMenuRootComponent,
  Trigger: PostGroupMenuTriggerComponent,
  Content: PostGroupMenuContentComponent,
  Footer: PostGroupMenuFooterComponent,
  Header: PostGroupMenuHeaderComponent,
  Provider: PostGroupMenuProvider
}
