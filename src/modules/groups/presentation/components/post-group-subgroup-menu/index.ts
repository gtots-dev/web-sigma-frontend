import { PostGroupSubgroupMenuProvider } from '../../contexts/post-group-subgroup-menu.context'
import { PostGroupSubgroupMenuContentComponent } from './post-group-subgroup-menu-content.component'
import { PostGroupSubgroupMenuFooterComponent } from './post-group-subgroup-menu-footer.component'
import { PostGroupSubgroupMenuHeaderComponent } from './post-group-subgroup-menu-header.component'
import { PostGroupSubgroupMenuRootComponent } from './post-group-subgroup-menu-root.component'
import { PostGroupSubgroupMenuTriggerComponent } from './post-group-subgroup-menu-trigger.component'

export const PostGroupSubgroupMenu = {
  Root: PostGroupSubgroupMenuRootComponent,
  Trigger: PostGroupSubgroupMenuTriggerComponent,
  Content: PostGroupSubgroupMenuContentComponent,
  Footer: PostGroupSubgroupMenuFooterComponent,
  Header: PostGroupSubgroupMenuHeaderComponent,
  Provider: PostGroupSubgroupMenuProvider
}
