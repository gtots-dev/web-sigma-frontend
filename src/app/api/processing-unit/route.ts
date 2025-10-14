import { auth } from '@/auth'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { PostProcessingUnitFactory } from '@/modules/processing-units/infrastructure/factories/post-processing-unit.factory'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const [{ token }, processingUnit] = await Promise.all([auth(), req.json()])
    const postProcessingUnitFactory = PostProcessingUnitFactory.create()
    postProcessingUnitFactory.execute(token, processingUnit)
    return NextResponse.json(
      {
        success: true
      },
      { status: Number(HttpStatusCodeEnum.OK) }
    )
  } catch (error) {
    if (error instanceof HttpResponseError) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: error.message
        },
        { status: Number(HttpStatusCodeEnum.BAD_REQUEST) }
      )
    }
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: 'Erro inesperado'
      },
      { status: Number(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR) }
    )
  }
}
