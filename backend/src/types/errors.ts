import { HttpException, HttpStatus } from '@nestjs/common'

export class CustomBulkError extends HttpException {
  public readonly details: object[]

  constructor(message: string, details: object[]) {
    super(message, HttpStatus.BAD_REQUEST)
    this.details = details
  }
}
