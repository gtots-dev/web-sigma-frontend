import { useCallback } from 'react'

export function useDownloadFile() {
  const download = useCallback((file: string, fileName: string) => {
    const url = file
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }, [])

  return { download }
}
