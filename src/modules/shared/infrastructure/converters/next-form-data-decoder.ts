export class NextFormDataDecoder {
  static async decode(incomingFormData: FormData): Promise<FormData> {
    const newFormData = new FormData()

    for (const [key, value] of incomingFormData.entries()) {
      if (key.startsWith('file:') && value instanceof File) {
        const originalName = key.replace('file:', '')
        const buffer = await value.arrayBuffer()
        
        const safeFile = new File([buffer], originalName, {
          type: value.type
        })

        newFormData.append('files', safeFile, originalName)
      } else {
        newFormData.append(key, value)
      }
    }

    return newFormData
  }
}
