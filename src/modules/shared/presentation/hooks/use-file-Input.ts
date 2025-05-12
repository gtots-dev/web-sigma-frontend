import { useState, useCallback, type ChangeEvent, type DragEvent } from 'react'

export interface UseFileInputOptions {
  initialFiles?: File[]
  onChange?: (files: File[]) => void
  maxFiles?: number
  maxSizeInBytes?: number
  acceptTypes?: string[]
}

export interface UseFileInputResult {
  files: File[]
  isDragging: boolean
  handleDrop: (e: DragEvent) => void
  handleDragOver: (e: DragEvent) => void
  handleDragLeave: (e: DragEvent) => void
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void
  removeFile: (index: number) => void
  formatFileSize: (size: number) => string
  errors: string[]
}

export function useFileInput(
  options: UseFileInputOptions = {}
): UseFileInputResult {
  const {
    initialFiles = [],
    onChange,
    maxFiles,
    maxSizeInBytes,
    acceptTypes
  } = options

  const [files, setFiles] = useState<File[]>(initialFiles)
  const [isDragging, setIsDragging] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const validateFile = useCallback(
    (file: File): string | null => {
      if (maxSizeInBytes && file.size > maxSizeInBytes) {
        return `O arquivo "${file.name}" excede o tamanho máximo permitido.`
      }

      if (
        acceptTypes &&
        acceptTypes.length > 0 &&
        !acceptTypes.includes(file.type)
      ) {
        return `O tipo de arquivo "${file.name}" (${file.type}) não é aceito.`
      }

      return null
    },
    [maxSizeInBytes, acceptTypes]
  )

  const updateFiles = useCallback(
    (newFiles: File[]) => {
      const current = [...files]
      const newValidFiles: File[] = []
      const newErrors: string[] = []

      for (const file of newFiles) {
        const error = validateFile(file)
        if (error) {
          newErrors.push(error)
        } else {
          newValidFiles.push(file)
        }
      }

      const combined = [...current, ...newValidFiles]

      if (maxFiles && combined.length > maxFiles) {
        newErrors.push(`Você pode enviar no máximo ${maxFiles} arquivos.`)
        return
      }

      setFiles(combined)
      setErrors(newErrors)
      onChange?.(combined)
    },
    [files, onChange, validateFile, maxFiles]
  )

  const removeFile = useCallback(
    (index: number) => {
      const updated = files.filter((_, i) => i !== index)
      setFiles(updated)
      onChange?.(updated)
    },
    [files, onChange]
  )

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
      const dropped = Array.from(e.dataTransfer.files)
      updateFiles(dropped)
    },
    [updateFiles]
  )

  const handleDragOver = useCallback(
    (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (!isDragging) setIsDragging(true)
    },
    [isDragging]
  )

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const selected = Array.from(e.target.files || [])
      updateFiles(selected)
      e.target.value = ''
    },
    [updateFiles]
  )

  const formatFileSize = (sizeInBytes: number) => {
    const units = ['B', 'KB', 'MB', 'GB', 'TB']
    let size = sizeInBytes
    let unitIndex = 0
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024
      unitIndex++
    }
    return `${size.toFixed(1)} ${units[unitIndex]}`
  }

  return {
    files,
    isDragging,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleFileChange,
    removeFile,
    formatFileSize,
    errors
  }
}
