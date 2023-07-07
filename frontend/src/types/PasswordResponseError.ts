export type ResponseErrorJson = {
  statusCode: number
  message: string
  error?: string
}

export type PasswordResponseErrorJson = ResponseErrorJson & {
  passwordInstructions: string
}

export type PasswordResponseError = {
  json: PasswordResponseErrorJson
}
