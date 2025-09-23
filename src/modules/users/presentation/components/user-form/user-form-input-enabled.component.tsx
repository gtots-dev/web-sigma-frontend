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
import { useTableUser } from '../../contexts/table-user.context'

interface UserFormInputEnabledComponentProps {
  require?: boolean
  description?: string
}

export function UserFormInputEnabledComponent({
  description
}: UserFormInputEnabledComponentProps) {
  const { control } = useFormContext()
  const user = useTableUser()

  return (
    <FormField
      control={control}
      name="enabled"
      render={({ field }) => (
        <FormItem>
          <FormLabel
            className="text-sm flex items-center gap-x-1.5 dark:text-zinc-50"
            htmlFor="enabled-user"
          >
            <HelpMeButtonComponent description={description} />
          </FormLabel>

          <FormControl>
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>
                  Usuário {field.value ? 'Habilitado' : 'Desabilitado'}
                </FormLabel>
                <FormDescription>
                  Usuário{' '}
                  <b className="text-zinc-950 dark:text-white/80">
                    {user.name}
                  </b>{' '}
                  será{' '}
                  <b className="text-zinc-950 dark:text-white/80">
                    {' '}
                    {!field.value ? 'Habilitado' : 'Desabilitado'}{' '}
                  </b>{' '}
                  caso o botão seja alterado.
                </FormDescription>
              </div>
              <Switch
                className="data-[state=checked]:bg-primary-600"
                id="enabled-user"
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
