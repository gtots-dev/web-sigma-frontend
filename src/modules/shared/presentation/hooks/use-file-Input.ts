import { useState, useCallback, type ChangeEvent, type DragEvent } from 'react'
import {
  processNewFiles,
  formatFileSize,
  type FileValidationOptions
} from '../utils/file.util'
export interface UseFileInputOptions extends FileValidationOptions {
  initialFiles?: File[]
  onChange?: (files: File[]) => void
  maxFiles?: number
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

  const updateFiles = useCallback(
    (newFiles: File[]) => {
      const { combinedFiles, errors: newErrors } = processNewFiles(newFiles, {
        currentFiles: files,
        maxFiles,
        maxSizeInBytes,
        acceptTypes
      })

      setFiles(combinedFiles)
      setErrors(newErrors)
      onChange?.(combinedFiles)
    },
    [files, onChange, maxFiles, maxSizeInBytes, acceptTypes]
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
