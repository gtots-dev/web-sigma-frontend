import { GroupItemSelectorProvider } from '../../contexts/group-item-selector.context'
import { GroupItemSelectorToggleButton } from './group-item-selector-button-toggle.component'
import { GroupItemSelectorCheckCheckboxComponent } from './group-item-selector-check-checkbox.component'
import { GroupItemSelectorItem } from './group-item-selector-item.component'
import { GroupItemSelectorList } from './group-item-selector-list.component'
import { GroupItemSelectorRoot } from './group-item-selector-root.component'
import { GroupItemSelectorSearch } from './group-item-selector-search.component'
import { GroupItemSelectorSquareCheckboxComponent } from './group-item-selector-square-checkbox.component'

export const GroupSelector = {
  Provider: GroupItemSelectorProvider,
  List: GroupItemSelectorList,
  Item: GroupItemSelectorItem,
  Toggle: GroupItemSelectorToggleButton,
  Root: GroupItemSelectorRoot,
  Search: GroupItemSelectorSearch,
  Checkbox: {
    Square: GroupItemSelectorSquareCheckboxComponent,
    Check: GroupItemSelectorCheckCheckboxComponent
  }
}
