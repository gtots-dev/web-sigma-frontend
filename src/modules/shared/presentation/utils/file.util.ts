export interface FileValidationOptions {
  maxSizeInBytes?: number
  acceptTypes?: string[]
}

export function validateFile(
  file: File,
  options: FileValidationOptions
): string | null {
  const { maxSizeInBytes, acceptTypes } = options

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
}

export function formatFileSize(sizeInBytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let size = sizeInBytes
  let unitIndex = 0
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }
  return `${size.toFixed(1)} ${units[unitIndex]}`
}

export interface UpdateFilesOptions extends FileValidationOptions {
  currentFiles: File[]
  maxFiles?: number
}

export function processNewFiles(
  newFiles: File[],
  options: UpdateFilesOptions
): { combinedFiles: File[]; errors: string[] } {
  const { currentFiles, maxFiles } = options
  const newValidFiles: File[] = []
  const newErrors: string[] = []

  for (const file of newFiles) {
    const error = validateFile(file, options)
    if (error) {
      newErrors.push(error)
    } else {
      newValidFiles.push(file)
    }
  }

  const combined = [...currentFiles, ...newValidFiles]

  if (maxFiles && combined.length > maxFiles) {
    newErrors.push(`Você pode enviar no máximo ${maxFiles} arquivos.`)
    return { combinedFiles: currentFiles, errors: newErrors }
  }

  return { combinedFiles: combined, errors: newErrors }
}
