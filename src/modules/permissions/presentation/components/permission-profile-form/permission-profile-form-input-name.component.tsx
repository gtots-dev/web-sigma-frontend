import { HelpMeButtonComponent } from '@/modules/shared/presentation/components/help-me-button/help-me-button.component'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/modules/shared/presentation/components/shadcn/form'
import { Input } from '@/modules/shared/presentation/components/shadcn/input'
import { useFormContext } from 'react-hook-form'

interface PermissionProfileFormInputNameComponentProps {
  require?: boolean
  description?: string
}

export function PermissionProfileFormInputNameComponent({
  require,
  description
}: PermissionProfileFormInputNameComponentProps) {
  const { control } = useFormContext()

  return (
    <FormField
      name="name"
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            className="text-sm flex items-center gap-x-1.5 dark:text-zinc-50"
            htmlFor="name-permission"
          >
            Nome{require ? ': *' : ':'}
            <HelpMeButtonComponent description={description} />
          </FormLabel>
          <FormControl>
            <Input
              type="text"
              id="name-permission"
              autoComplete="off"
              className="!mt-1 dark:text-zinc-50 dark:border-zinc-800 focus:dark:border-zinc-50"
              placeholder="Ex: Administrador"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
