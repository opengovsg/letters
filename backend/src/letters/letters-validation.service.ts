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
  validateBulk(template: string[], params: LetterParamMaps): ValidationResult {
    const errorArray = []

    if (params.length >= BULK_MAX_ROW_LENGTH) {
      return {
        success: false,
        message: 'Number of rows exceeded max length of bulk create',
      }
    }

    for (let i = 0; i < params.length; i++) {
      const obj = params[i]
      // If object has an attribute that doesn't exist in the template
      for (const key in obj) {
        if (
          Object.prototype.hasOwnProperty.call(obj, key) &&
          !template.includes(key)
        ) {
          errorArray.push({
            id: i,
            param: key,
            message: 'Invalid attribute in param',
          })
        }
      }
      for (const attr of template) {
        // If object does not have the attribute in the template
        if (!Object.prototype.hasOwnProperty.call(obj, attr)) {
          errorArray.push({
            id: i,
            param: attr,
            message: 'Missing param',
          })
        }
        // If the object has the attribute, but is empty
        if (obj[attr] === '') {
          errorArray.push({
            id: i,
            param: attr,
            message: 'Field is empty',
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
