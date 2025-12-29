import { NextResponse } from 'next/server'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'

export class RouterApiResponseFactory {
  json(data: unknown, status: number) {
    return NextResponse.json(
      JSON.parse(JSON.stringify(data ?? null)),
      { status }
    )
  }

  ok(data: unknown) {
    return this.json(data, Number(HttpStatusCodeEnum.OK))
  }

  noContent() {
    return this.json(
      null,
      Number(HttpStatusCodeEnum.NO_CONTENT)
    )
  }

  file(
    data: Blob | File | ArrayBuffer,
    status: number,
    headers?: HeadersInit
  ) {
    return new Response(data, {
      status,
      headers
    })
  }
}
