import React, { useState } from 'react'
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
import { Trash, X } from 'lucide-react'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { FileInput } from '@/modules/shared/presentation/components/input-file/input-file.component'

interface UserFormInputFilesComponentProps {
  require?: boolean
  description?: string
}

export function UserFormInputFilesComponent({
  require,
  description
}: UserFormInputFilesComponentProps) {
  const { control } = useFormContext()
  const [fileList, setFileList] = useState<File[]>([])

  return (
    <FormField
      name="files"
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            className="text-sm flex items-center gap-x-1.5 dark:text-zinc-50"
            htmlFor="file-user"
          >
            Arquivos{require ? ': *' : ':'}
            <HelpMeButtonComponent description={description} />
          </FormLabel>

          <FormControl>
            <FileInput
              id="file-user"
              accept=".pdf,.png,.jpg,.jpeg"
              value={fileList}
              onChange={(updatedFiles) => {
                setFileList(updatedFiles)
                field.onChange(updatedFiles)
              }}
              multiple
              {...field}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
