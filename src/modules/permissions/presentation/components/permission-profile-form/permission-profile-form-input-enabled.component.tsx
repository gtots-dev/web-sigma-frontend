import { HelpMeButtonComponent } from '@/modules/shared/presentation/components/help-me-button/help-me-button.component'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from '@/modules/shared/presentation/components/shadcn/form'
import { Switch } from '@/modules/shared/presentation/components/shadcn/switch'
import { useFormContext } from 'react-hook-form'

interface PermissionProfileFormInputEnabledComponentProps {
  require?: boolean
  description?: string
  name?: string
}

export function PermissionProfileFormInputEnabledComponent({
  description,
  name
}: PermissionProfileFormInputEnabledComponentProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="enabled"
      render={({ field }) => (
        <FormItem>
          <FormLabel
            className="text-sm flex items-center gap-x-1.5 dark:text-zinc-50"
            htmlFor="enabled-permission"
          >
            <HelpMeButtonComponent description={description} />
          </FormLabel>

          <FormControl>
            <div className="flex flex-row items-center justify-between rounded-lg gap-x-2 border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>
                  Permissão {field.value ? 'Habilitada' : 'Desabilitada'}
                </FormLabel>
                <FormDescription>
                  Permissão{' '}
                  <b className="text-zinc-950 dark:text-white/80">{name}</b>{' '}
                  será{' '}
                  <b className="text-zinc-950 dark:text-white/80">
                    {' '}
                    {!field.value ? 'Habilitada' : 'Desabilitada'}{' '}
                  </b>{' '}
                  caso o botão seja alterado.
                </FormDescription>
              </div>
              <Switch
                className="data-[state=checked]:bg-primary-600"
                id="enabled-permission"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  )
}
