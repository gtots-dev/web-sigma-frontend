import { InfractionsSidebarRoot } from './infractions-sidebar-root.component'
import { InfractionsSidebarHeader } from './infractions-sidebar-header.component'
import { InfractionsSidebarList } from './infractions-sidebar-list.component'
import { InfractionsSidebarItemRoot } from './infractions-sidebar-item-root.component'
import { InfractionsSidebarItemThumbnail } from './infractions-sidebar-item-thumbnail.component'
import { InfractionsSidebarItemInfo } from './infractions-sidebar-item-info.component'

const Item = {
  Root: InfractionsSidebarItemRoot,
  Thumbnail: InfractionsSidebarItemThumbnail,
  Info: InfractionsSidebarItemInfo,
}

const List = Object.assign(InfractionsSidebarList, { Item })

export const InfractionsSidebar = {
  Root: InfractionsSidebarRoot,
  Header: InfractionsSidebarHeader,
  List,
}
