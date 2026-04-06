import { create } from 'zustand'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { GetFileS3RouterApiFactory } from '@/modules/api/infrastructure/factories/get-file-s3.factory'

type S3State = {
  getS3: (url: string) => Promise<File>
}

export const useS3Store = create<S3State>(() => ({
  getS3: async (url: string) => {
    try {
      const getFileS3RouterApiFactory = GetFileS3RouterApiFactory.create()
      const { data } = await getFileS3RouterApiFactory.execute(url)
      return data as File
    } catch (error) {
      if (error instanceof HttpResponseError) throw error
    }
  }
}))
