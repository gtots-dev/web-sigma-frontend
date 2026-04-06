'use client'

import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useDownloadFile } from '@/modules/shared/presentation/hooks/use-download-file'
import { useS3Store } from '@/modules/shared/presentation/stores/s3.store'
import { useParams } from 'next/navigation'
import { useCallback } from 'react'
import { useUserFileStore } from '../stores/user-file.store'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import type { HttpResponseErrorInterface } from '@/modules/shared/domain/interfaces/http-response-error.interface'

type DownloadFileParams = {
  userId: string
  fileId: string
  originalName: string
}

export function useUserFileDownload() {
  const { getS3 } = useS3Store()
  const { getUserFile } = useUserFileStore()
  const { download } = useDownloadFile()
  const { operationId }: UrlParams = useParams()

  const fetchFileUrl = useCallback(
    async ({ userId, fileId }: Omit<DownloadFileParams, 'originalName'>) => {
      const { url } = await getUserFile({
        userId,
        fileId,
        operationId
      })

      return url
    },
    [getUserFile, operationId]
  )

  const fetchFileBlob = useCallback(
    async (url: string) => {
      return await getS3(url)
    },
    [getS3]
  )

  const downloadLocalFile = useCallback(
    (file: File, originalName: string) => {
      download(file, originalName)
    },
    [download]
  )

  const handleError = (error: HttpResponseErrorInterface) => {
    const message = error instanceof Error ? error.message : 'Erro inesperado'
    toast({
      title: 'Erro ao baixar arquivo',
      description: message,
      variant: 'destructive'
    })
  }

  const downloadFile = useCallback(
    async ({ userId, fileId, originalName }: DownloadFileParams) => {
      try {
        const url = await fetchFileUrl({ userId, fileId })
        const file = await fetchFileBlob(url)
        downloadLocalFile(file, originalName)
      } catch (error) {
        handleError(error)
      }
    },
    [fetchFileUrl, fetchFileBlob, downloadLocalFile]
  )

  return { downloadFile }
}
