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

interface GroupFormInputNameComponentProps {
  require?: boolean
  description?: string
}

export function GroupFormInputNameComponent({
  require,
  description
}: GroupFormInputNameComponentProps) {
  const { control } = useFormContext()

  return (
    <FormField
      name="name"
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            className="text-sm flex items-center gap-x-1.5 dark:text-zinc-50"
            htmlFor="name-group"
          >
            Nome{require ? ': *' : ':'}
            <HelpMeButtonComponent description={description} />
          </FormLabel>
          <FormControl>
            <Input
              type="text"
              id="name-group"
              autoComplete="off"
              className="!mt-1 dark:text-zinc-50 dark:border-zinc-800 focus:dark:border-zinc-50"
              placeholder="Coloque o nome do grupo"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
