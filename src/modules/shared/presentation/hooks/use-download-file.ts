import { useCallback } from 'react'

export function useDownloadFile() {
  const download = useCallback((file: File, fileName: string) => {
    const url = URL.createObjectURL(file)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [])

  return { download }
}
