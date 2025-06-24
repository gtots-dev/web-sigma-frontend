import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/modules/shared/presentation/components/shadcn/form'
import { HelpMeButtonComponent } from '@/modules/shared/presentation/components/help-me-button/help-me-button.component'
import { useFormContext } from 'react-hook-form'
import { GroupSelector } from '@/modules/shared/presentation/components/group-item-selector'
import { MESSAGES_PERMISSIONS } from '@/modules/shared/presentation/messages/permissions'

export interface featuresInterface {
  id: number
  name: string
}

export interface groupFeaturesInterface {
  name: string
  features: featuresInterface[]
}

interface PermissionProfileFormInputFeaturesComponentProps {
  require?: boolean
  description?: string
  permissions: groupFeaturesInterface[]
}

export function PermissionProfileFormInputFeaturesComponent({
  require,
  description,
  permissions
}: PermissionProfileFormInputFeaturesComponentProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="features"
      render={({ field }) => {
        const { value = [], onChange } = field

        return (
          <GroupSelector.Provider
            value={value}
            onChange={onChange}
            groups={permissions.map((g) => ({
              name: g.name,
              items: g.features
            }))}
          >
            <FormItem>
              <FormLabel className="text-sm flex items-center gap-x-1.5 dark:text-zinc-50">
                Permissões{require ? ': *' : ':'}
                <HelpMeButtonComponent description={description} />
                <GroupSelector.Toggle className="ms-auto" />
              </FormLabel>

              <FormControl>
                <GroupSelector.List messageEmpty={MESSAGES_PERMISSIONS[6.6]}>
                  {(group, item) => (
                    <GroupSelector.Item key={item.id} item={item} />
                  )}
                </GroupSelector.List>
              </FormControl>

              <FormMessage />
            </FormItem>
          </GroupSelector.Provider>
        )
      }}
    />
  )
}
