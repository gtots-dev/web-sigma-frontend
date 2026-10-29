export class NextFormDataDecoder {
  static async decode(
    incomingFormData: FormData,
    targetFieldName: string = 'files'
  ): Promise<FormData> {
    const newFormData = new FormData()

    for (const [key, value] of incomingFormData.entries()) {
      if (key.startsWith('file:') && value instanceof File) {
        const originalName = key.replace('file:', '')
        const buffer = await value.arrayBuffer()

        const safeFile = new File([buffer], originalName, {
          type: value.type
        })

        newFormData.append(targetFieldName, safeFile, originalName)
      } else if (value instanceof File) {
        const buffer = await value.arrayBuffer()
        const safeFile = new File([buffer], value.name, {
          type: value.type
        })
        newFormData.append(targetFieldName, safeFile, value.name)
      } else {
        newFormData.append(key, value)
      }
    }

    return newFormData
  }
}
