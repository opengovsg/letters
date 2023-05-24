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
  ): BulkLetterValidationResultDto {
    const errorArray: BulkLetterValidationResultError[] = []

    if (letterParamMaps.length > BULK_MAX_ROW_LENGTH) {
      return {
        success: false,
        message: 'Number of rows exceeded max length of bulk create',
      }
    }

    for (let i = 0; i < letterParamMaps.length; i++) {
      const letterParamMap = letterParamMaps[i]
      // If key in letterParamMap doesn't exist in the template
      for (const key in letterParamMap) {
        if (
          Object.prototype.hasOwnProperty.call(letterParamMap, key) &&
          !fields.includes(key)
        ) {
          errorArray.push({
            id: i,
            param: key,
            message: BulkLetterValidationResultErrorMessage.INVALID_ATTRIBUTE,
          })
        }
      }
      for (const field of fields) {
        // If letterParamMap does not have field in the template, or field is empty
        if (
          !Object.prototype.hasOwnProperty.call(letterParamMap, field) ||
          letterParamMap[field] === ''
        ) {
          errorArray.push({
            id: i,
            param: field,
            message: BulkLetterValidationResultErrorMessage.MISSING_PARAM,
          })
        }
      }
    }

    if (errorArray.length === 0)
      return {
        success: true,
        message: 'Validation Success',
      }

    return {
      success: false,
      message: 'Malformed bulk create object',
      errors: errorArray,
    }
  }
}
