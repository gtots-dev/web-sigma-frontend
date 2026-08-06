'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/modules/shared/presentation/components/shadcn/form'
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
}

export function ColorPickerFormField({ name, label, require }: Props) {
  const { control } = useFormContext()

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel className="flex items-center gap-1.5 text-xs font-semibold">
              {label}
              {require ? ': *' : ':'}
            </FormLabel>

            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <div className="flex items-center gap-2 w-full">
                      <div
                        className="h-4 w-4 rounded border shrink-0"
                        style={{ backgroundColor: field.value }}
                      />
                      <span className="truncate">{field.value}</span>
                    </div>
                  </Button>
                </PopoverTrigger>

                <PopoverContent align="start" side="bottom" sideOffset={6} className="w-80 z-50">
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
