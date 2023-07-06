export type ResponseErrorJson = {
  statusCode: number
  message: string
  error?: string
}

export type ResponseError = {
  json: ResponseErrorJson
}
