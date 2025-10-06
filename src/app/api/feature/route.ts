import { auth } from "@/auth"
import { HttpStatusCodeEnum } from "@/modules/authentication/domain/enums/status-codes.enum"
import { GetFeatureFactory } from "@/modules/permissions/infrastructure/factories/get-feature.factory"
import { HttpResponseError } from "@/modules/shared/infrastructure/errors/http-response.error"
import { NextResponse } from "next/server"

export async function GET(): Promise<NextResponse> {
  const { token } = await auth()
  const getFeaturesFactory = GetFeatureFactory.create()
  try {
    const response = await getFeaturesFactory.execute(token)
    return NextResponse.json(response, {
      status: Number(HttpStatusCodeEnum.OK)
    })
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
  }
}