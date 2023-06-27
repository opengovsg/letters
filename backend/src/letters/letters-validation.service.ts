import { Injectable } from '@nestjs/common'

import { BULK_MAX_ROW_LENGTH } from '~shared/constants/letters'
import {
  BulkLetterValidationResultDto,
  BulkLetterValidationResultError,
  BulkLetterValidationResultErrorMessage,
  LetterParamMaps,
} from '~shared/dtos/letters.dto'

@Injectable()
export class LettersValidationService {
  validateBulk(
    fields: string[],
    letterParamMaps: LetterParamMaps,
    passwords: string[] | undefined,
    phoneNumbers: string[] | undefined,
  ): BulkLetterValidationResultDto {
    if (letterParamMaps.length > BULK_MAX_ROW_LENGTH) {
      return {
        success: false,
        message: 'Number of rows exceeded max length of bulk create',
      }
    }

    if (passwords && letterParamMaps.length !== passwords?.length) {
      return {
        success: false,
        message: 'Number of passwords does not match number of letters',
      }
    }

    if (phoneNumbers && letterParamMaps.length !== phoneNumbers?.length) {
      return {
        success: false,
        message: 'Number of phone numbers does not match number of letters',
      }
    }

    const errors: BulkLetterValidationResultError[] = []

    errors.push(
      ...this.validateLetterParamsExistInTemplate(letterParamMaps, fields),
    )

    errors.push(
      ...this.validateTemplateFieldsAreInLetterParams(letterParamMaps, fields),
    )

    if (passwords) {
      errors.push(...this.validatePasswordsArePresent(passwords))
    }

    if (phoneNumbers) {
      errors.push(...this.validatePhoneNumbers(phoneNumbers))
    }

    if (errors.length === 0)
      return {
        success: true,
        message: 'Validation Success',
      }

    return {
      success: false,
      message: 'Malformed bulk create object',
      errors,
    }
  }

  private validateLetterParamsExistInTemplate(
    letterParamMaps: LetterParamMaps,
    fields: string[],
  ): BulkLetterValidationResultError[] {
    return letterParamMaps.flatMap((letterParamMap, index) =>
      Object.keys(letterParamMap)
        .filter((key) => !fields.includes(key))
        .map((key) => ({
          id: index,
          param: key,
          message: BulkLetterValidationResultErrorMessage.INVALID_ATTRIBUTE,
        })),
    )
  }

  private validateTemplateFieldsAreInLetterParams(
    letterParamMaps: LetterParamMaps,
    fields: string[],
  ): BulkLetterValidationResultError[] {
    return letterParamMaps.flatMap((letterParamMap, index) =>
      fields
        .filter((field) =>
          this.fieldIsNotPopulatedInLetterParams(letterParamMap, field),
        )
        .map((field) => ({
          id: index,
          param: field,
          message: BulkLetterValidationResultErrorMessage.MISSING_PARAM,
        })),
    )
  }

  private validatePasswordsArePresent(
    passwords: string[],
  ): BulkLetterValidationResultError[] {
    return passwords
      .map((password, initialIndex) => ({ password, initialIndex }))
      .filter((password) => password.password === '')
      .map((password) => ({
        id: password.initialIndex,
        param: 'Password',
        message: BulkLetterValidationResultErrorMessage.MISSING_PARAM,
      }))
  }

  private fieldIsNotPopulatedInLetterParams(
    letterParamMap: { [key: string]: string },
    field: string,
  ): boolean {
    return (
      !Object.prototype.hasOwnProperty.call(letterParamMap, field) ||
      letterParamMap[field] === ''
    )
  }

  private validatePhoneNumbers(
    phoneNumbers: string[],
  ): BulkLetterValidationResultError[] {
    return phoneNumbers
      .map((phoneNumber, initialIndex) => ({ phoneNumber, initialIndex }))
      .filter(({ phoneNumber }) => !phoneNumber.match(/^\+65[89]\d{7}$/))
      .map(({ initialIndex }) => ({
        id: initialIndex,
        param: 'PhoneNumber',
        message: BulkLetterValidationResultErrorMessage.INVALID_ATTRIBUTE,
      }))
  }
}
