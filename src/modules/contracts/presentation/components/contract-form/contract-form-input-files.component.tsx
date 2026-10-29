import React, { useState } from 'react'
import { HelpMeButtonComponent } from '@/modules/shared/presentation/components/help-me-button/help-me-button.component'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/modules/shared/presentation/components/shadcn/form'
import { useFormContext } from 'react-hook-form'
import { FileInput } from '@/modules/shared/presentation/components/input-file/input-file.component'

interface ContractFormInputFilesComponentProps {
  require?: boolean
  description?: string
}

export function ContractFormInputFilesComponent({
  require,
  description = 'Selecione a imagem do logotipo do contrato (PNG, JPG ou JPEG).'
}: ContractFormInputFilesComponentProps) {
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
            htmlFor="file-contract-logo"
          >
            Logotipo{require ? ': *' : ':'}
            <HelpMeButtonComponent description={description} />
          </FormLabel>

          <FormControl>
            <FileInput
              id="file-contract-logo"
              accept="image/png,image/jpeg,image/jpg"
              value={fileList}
              onChange={(updatedFiles) => {
                const singleFile = updatedFiles.slice(-1)
                setFileList(singleFile)
                field.onChange(singleFile)
              }}
              multiple={false}
              maxFiles={1}
              description="PNG, JPG ou JPEG (Máximo 10.0 MB)"
              {...field}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
