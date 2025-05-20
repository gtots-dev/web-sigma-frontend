import { auth } from '@/auth'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { GetUserFilesFactory } from '@/modules/users/infrastructure/factories/get-user-files.factory'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
): Promise<NextResponse> {
  try {
    const { token } = await auth()
    const getUserFilesFactory = GetUserFilesFactory.create()
    const response = await getUserFilesFactory.execute(token, params.id)
    return NextResponse.json(response, {
      status: Number(HttpStatusCodeEnum.OK)
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
