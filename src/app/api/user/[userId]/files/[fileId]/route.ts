import { auth } from '@/auth'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { GetUserFileFactory } from '@/modules/users/infrastructure/factories/get-user-file.factory'
import { NextResponse, type NextRequest } from 'next/server'
import type { GetStaticPropsContext } from 'next'

export async function GET(
  req: NextRequest,
  context: GetStaticPropsContext<{ userId: string; fileId: string }>
): Promise<Response> {
  try {
    const { fileId, userId } = context.params
    const { token } = await auth()
    const getUserFileFactory = GetUserFileFactory.create()
    const fileBlob = await getUserFileFactory.execute(
      token,
      Number(userId),
      Number(fileId)
    )

    return new Response(fileBlob, {
      status: Number(HttpStatusCodeEnum.OK),
      headers: {
        'Content-Type': fileBlob.type || 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${fileId}"`
      }
    })
  } catch (error) {
    if (error instanceof HttpResponseError) {
      return NextResponse.json(
        {
          success: false,
          message: error.message
        },
        { status: Number(HttpStatusCodeEnum.BAD_REQUEST) }
      )
    }
  }
}
