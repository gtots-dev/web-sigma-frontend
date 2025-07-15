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
}

export function PermissionProfileFormInputEnabledComponent({
  require,
  description
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
            htmlFor="enabled-user"
          >
            Habilitado{require ? ': *' : ':'}
            <HelpMeButtonComponent description={description} />
          </FormLabel>

          <FormControl>
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Habilitar usuário?</FormLabel>
                <FormDescription>
                  Caso a opção correspondente esteja desabilitada, o usuário não
                  poderá utilizar os recursos da aplicação.
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
