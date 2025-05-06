import * as React from 'react'
import { Trash } from 'lucide-react'

import { cn } from '@/modules/shared/presentation/lib/utils'
import { FormLabel } from '../shadcn/form'
import { Button } from '../shadcn/button'

type FileInputProps = {
  id: string
  value?: Blob[]
  onChange?: (files: Blob[]) => void
  accept?: string
  multiple?: boolean
  className?: string
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ id, value = [], onChange, accept, multiple, className }, ref) => {
    const [files, setFiles] = React.useState<Blob[]>(value)
    const [isDragging, setIsDragging] = React.useState(false)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = Array.from(e.target.files || [])
      handleNewFiles(selected)
      e.target.value = ''
    }

    const handleNewFiles = (newFiles: Blob[]) => {
      const updated = [...files, ...newFiles]
      setFiles(updated)
      onChange?.(updated)
    }

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
      const droppedFiles = Array.from(e.dataTransfer.files)
      handleNewFiles(droppedFiles)
    }

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault()
      e.stopPropagation()
      if (!isDragging) setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
    }

    function formatFileSize(sizeInBytes: number) {
      const units = ['B', 'KB', 'MB', 'GB', 'TB']
      let size = sizeInBytes
      let unitIndex = 0

      while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024
        unitIndex++
      }

      return `${size.toFixed(1)} ${units[unitIndex]}`
    }

    return (
      <div>
        <label
          htmlFor={id}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            'flex flex-col gap-y-9 justify-center items-center border border-dashed py-16 md:px-40 rounded-md cursor-pointer transition-colors',
            isDragging ? 'border-ring bg-muted/40' : '',
            className
          )}
        >
          <p className="text-center text-sm px-10">
            Arraste e solte os arquivos dentro da marcação ou{' '}
            <b className="underline underline-offset-4">
              clique aqui para o envio
            </b>
          </p>
          <p className="text-center text-sm opacity-45">
            PDF, PNG, JPEG e JPG (Máximo 10.0 MB)
          </p>
        </label>

        <input
          ref={ref}
          id={id}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={handleFileChange}
        />

        <FormLabel className="text-sm flex items-center gap-x-1.5 mt-6">
          Arquivos Selecionados:
        </FormLabel>
        {files.length === 0 ? (
          <div className="flex items-center !border-b bg-zinc-50/40 dark:bg-zinc-900/40 h-[55.3px] p-4 mt-2 space-y-1">
            <p className=" text-zinc-700 dark:text-zinc-50 text-sm">
              Nenhum arquivo selecionado
            </p>
          </div>
        ) : (
          <ul className="mt-2 space-y-1">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex justify-between items-center gap-4 h-[55.3px] w-full border border-input rounded-md px-2 ps-3.5"
              >
                <div className="flex flex-col gap-y-0.5 hover:bg-zinc-50/40 hover:dark:bg-zinc-900/40">
                  <h4 className="text-sm">{file.name}</h4>
                  <span className="text-xs opacity-80">
                    {formatFileSize(file.size)}
                  </span>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    const updated = files.filter((_, i) => i !== index)
                    setFiles(updated)
                    onChange?.(updated.length ? updated : [])
                  }}
                >
                  <Trash />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
)

FileInput.displayName = 'FileInput'

export { FileInput }
