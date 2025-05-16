import {
  validateFile,
  formatFileSize,
  processNewFiles
} from '@/modules/shared/presentation/utils/file.util'

function createFile(name: string, size: number, type: string): File {
  return new File(['a'.repeat(size)], name, { type })
}

describe('validateFile', () => {
  test('should return error if file is too large', () => {
    const file = createFile('large.png', 2000000, 'image/png')
    const error = validateFile(file, { maxSizeInBytes: 1000000 })
    expect(error).toMatch(/excede o tamanho máximo/i)
  })

  test('should return error if type is not accepted', () => {
    const file = createFile('script.js', 1000, 'application/javascript')
    const error = validateFile(file, { acceptTypes: ['image/png'] })
    expect(error).toMatch(/não é aceito/i)
  })

  test('should return null for valid file', () => {
    const file = createFile('image.png', 500000, 'image/png')
    const error = validateFile(file, {
      maxSizeInBytes: 1000000,
      acceptTypes: ['image/png']
    })
    expect(error).toBeNull()
  })
})

describe('formatFileSize', () => {
  test('should format bytes to human-readable', () => {
    expect(formatFileSize(500)).toBe('500.0 B')
    expect(formatFileSize(1024)).toBe('1.0 KB')
    expect(formatFileSize(1048576)).toBe('1.0 MB')
    expect(formatFileSize(1572864)).toBe('1.5 MB')
  })
})

describe('processNewFiles', () => {
  const file1 = createFile('file1.txt', 1000, 'text/plain')
  const file2 = createFile('file2.txt', 2000, 'text/plain')
  const invalidFile = createFile('bad.exe', 1000, 'application/x-msdownload')

  test('should validate and combine files correctly', () => {
    const result = processNewFiles([file1], {
      currentFiles: [],
      maxFiles: 3,
      maxSizeInBytes: 2000,
      acceptTypes: ['text/plain']
    })

    expect(result.combinedFiles).toEqual([file1])
    expect(result.errors).toEqual([])
  })

  test('should return errors for invalid files', () => {
    const result = processNewFiles([invalidFile], {
      currentFiles: [],
      acceptTypes: ['text/plain']
    })

    expect(result.combinedFiles).toEqual([])
    expect(result.errors.length).toBe(1)
    expect(result.errors[0]).toMatch(/não é aceito/i)
  })

  test('should enforce maxFiles limit', () => {
    const result = processNewFiles([file1, file2], {
      currentFiles: [file1, file2],
      maxFiles: 2
    })

    expect(result.combinedFiles).toEqual([file1, file2])
    expect(result.errors[0]).toMatch(/no máximo 2 arquivos/i)
  })
})
