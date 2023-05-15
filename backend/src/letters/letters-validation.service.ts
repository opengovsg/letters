import { Injectable } from '@nestjs/common'

import { BULK_MAX_ROW_LENGTH } from '~shared/constants/letters'
import { LetterParamMaps } from '~shared/dtos/letters.dto'

class ValidationResult {
  success: boolean
  message: string
  errors?: object[]
}

@Injectable()
export class LettersValidationService {
  validateBulk(
    fields: string[],
    letterParamMaps: LetterParamMaps,
  ): ValidationResult {
    const errorArray = []

    if (letterParamMaps.length >= BULK_MAX_ROW_LENGTH) {
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
            message: 'Invalid attribute in param',
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
            message: 'Missing param',
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
