import { forwardRef } from 'react'
import { Trash } from 'lucide-react'

import { cn } from '@/modules/shared/presentation/lib/utils'
import { Button } from '../shadcn/button'
import { useFileInput } from '../../hooks/use-file-Input'

type FileInputProps = {
  id: string
  value?: File[]
  onChange?: (files: File[]) => void
  accept?: string
  multiple?: boolean
  className?: string
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ id, value = [], onChange, accept, multiple, className }, ref) => {
    const {
      files,
      isDragging,
      handleDrop,
      handleDragOver,
      handleDragLeave,
      handleFileChange,
      removeFile,
      formatFileSize
    } = useFileInput({
      initialFiles: value,
      onChange
    })

    return (
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          'flex flex-col gap-y-9 min-h-56 p-2 transition-colors rounded-md border-2 border-spacing-2 border-separate border-dashed bg-zinc-100/25 dark:bg-zinc-900/25',
          isDragging && 'border-ring bg-muted/40',
          className
        )}
      >
        {files.length === 0 ? (
          <label
            htmlFor={id}
            className="flex flex-col items-center justify-center flex-1 gap-y-3 cursor-pointer hover:bg-zinc-100/35 dark:hover:bg-zinc-900/35"
          >
            <p className="text-center text-sm px-10">
              Arraste e solte os arquivos dentro da marcação <br /> ou <br />
              <b className="underline underline-offset-4">
                clique aqui para o envio
              </b>
            </p>
            <p className="text-center text-sm opacity-45">
              PDF, PNG, JPEG e JPG (Máximo 10.0 MB)
            </p>
          </label>
        ) : (
          <ul className="flex flex-col gap-y-3 flex-1">
            {files.map((file: File, index: number) => (
              <li
                key={index}
                className="flex justify-between items-center gap-4 h-[55.3px] w-full border border-input rounded-md px-2 ps-3.5"
              >
                <div className="flex flex-col gap-y-0.5 hover:bg-zinc-50/40 hover:dark:bg-zinc-900/40">
                  <h4 className="text-sm">{file?.name}</h4>
                  <span className="text-xs opacity-80">
                    {formatFileSize(file.size)}
                  </span>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeFile(index)}
                >
                  <Trash />
                </Button>
              </li>
            ))}
            <li className="w-full rounded-md hover:bg-zinc-100/35 dark:hover:bg-zinc-900/35 cursor-pointer mt-auto">
              <label
                htmlFor={id}
                className="flex justify-center items-center h-[37px] text-sm px-10 py-2 gap-x-1.5 opacity-70 cursor-pointer"
              >
                <p>Arraste os arquivos ou</p>
                <b className="underline underline-offset-4">clique aqui</b>
              </label>
            </li>
          </ul>
        )}

        <input
          ref={ref}
          id={id}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    )
  }
)

FileInput.displayName = 'FileInput'

export { FileInput }
