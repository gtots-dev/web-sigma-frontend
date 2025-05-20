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

interface UserFormInputUsernameComponentProps {
  require?: boolean
  description?: string
}

export function UserFormInputUsernameComponent({
  require,
  description
}: UserFormInputUsernameComponentProps) {
  const { control } = useFormContext()
  return (
    <FormField
      name="login_name"
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            className="text-sm flex items-center gap-x-1.5 dark:text-zinc-50"
            htmlFor="login-name-user"
          >
            Nome de usuário{require ? ': *' : ':'}
            <HelpMeButtonComponent description={description} />
          </FormLabel>
          <FormControl>
            <Input
              type="text"
              id="login-name-user"
              autoComplete="off"
              className="!mt-1 dark:text-zinc-50 dark:border-zinc-800 focus:dark:border-zinc-50"
              placeholder="Ex: Operador"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
