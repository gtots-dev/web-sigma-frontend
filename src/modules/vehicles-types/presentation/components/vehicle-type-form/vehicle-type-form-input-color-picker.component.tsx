'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/modules/shared/presentation/components/shadcn/form'

import { HelpMeButtonComponent } from '@/modules/shared/presentation/components/help-me-button/help-me-button.component'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/modules/shared/presentation/components/shadcn/popover'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ColorPicker } from '@/modules/shared/presentation/components/color-picker/color-picker.component'

interface Props {
  name: string
  label: string
  require?: boolean
  description?: string
}

export function ColorPickerFormField({
  name,
  label,
  require,
  description
}: Props) {
  const { control } = useFormContext()

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel className="flex items-center gap-1.5">
              {label}
              {require ? ': *' : ':'}
              <HelpMeButtonComponent description={description} />
            </FormLabel>

            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <div className="flex items-center gap-2 w-full">
                      <div
                        className="h-4 w-4 rounded border"
                        style={{ backgroundColor: field.value }}
                      />
                      <span className="truncate">{field.value}</span>
                    </div>
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-80">
                  <ColorPicker
                    value={field.value ?? '#000000'}
                    onChange={(value) => field.onChange(value)}
                  />
                </PopoverContent>
              </Popover>
            </FormControl>

            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
