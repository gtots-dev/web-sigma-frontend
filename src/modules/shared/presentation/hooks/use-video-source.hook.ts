import { useState, useRef, useCallback } from 'react'

interface UseVideoSourceReturn {
  videoSrc: string
  videoName: string
  fileInputRef: React.RefObject<HTMLInputElement | null>
  triggerFileInput: () => void
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  setVideoFromUrl: (url: string) => void
}

interface UseVideoSourceOptions {
  onFileSelected: (objectUrl: string, fileName: string) => void
}

export function useVideoSource({
  onFileSelected
}: UseVideoSourceOptions): UseVideoSourceReturn {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [videoSrc, setVideoSrc] = useState<string>('')
  const [videoName, setVideoName] = useState<string>(
    'Vídeo de Exemplo (Blazes.mp4)'
  )

  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
      const objectUrl = URL.createObjectURL(file)
      setVideoSrc(objectUrl)
      setVideoName(file.name)
      onFileSelected(objectUrl, file.name)
    },
    [onFileSelected]
  )

  const setVideoFromUrl = useCallback(
    (url: string) => {
      if (!url.trim()) return
      setVideoSrc(url.trim())
      const fileName = url.trim().split('/').pop() ?? 'video-url'
      setVideoName(fileName)
      onFileSelected(url.trim(), fileName)
    },
    [onFileSelected]
  )

  return {
    videoSrc,
    videoName,
    fileInputRef,
    triggerFileInput,
    handleFileUpload,
    setVideoFromUrl
  }
}
