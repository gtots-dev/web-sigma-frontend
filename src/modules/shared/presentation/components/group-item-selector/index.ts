import { GroupItemSelectorProvider } from '../../contexts/group-item-selector.context'
import { GroupItemSelectorToggleButton } from './group-item-selector-button-toggle.component'
import { GroupItemSelectorItem } from './group-item-selector-item.component'
import { GroupItemSelectorList } from './group-item-selector-list.component'

export const GroupSelector = {
  Provider: GroupItemSelectorProvider,
  List: GroupItemSelectorList,
  Item: GroupItemSelectorItem,
  Toggle: GroupItemSelectorToggleButton
}
