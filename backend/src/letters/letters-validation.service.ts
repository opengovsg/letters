import { BadRequestException, Injectable } from '@nestjs/common'

import { BULK_MAX_ROW_LENGTH } from '~shared/constants/letters'
import { LetterParamMaps } from '~shared/dtos/letters.dto'

import { CustomBulkError } from '../types/errors'

@Injectable()
export class ValidationService {
  bulkValidation(jsonStream: LetterParamMaps, fields: string) {
    // Length validation
    if (jsonStream.length >= BULK_MAX_ROW_LENGTH) {
      throw new BadRequestException(
        'Number of rows exceeded max length of bulk create'
      )
    }

    // Field & attribution validation
    const errorArray = []
    for (let i = 0; i < jsonStream.length; i++) {
      const obj = jsonStream[i]
      // If object has an attribute that doesn't exist in the template
      for (const key in obj) {
        if (
          Object.prototype.hasOwnProperty.call(obj, key) &&
          !fields.includes(key)
        ) {
          errorArray.push({
            id: i,
            param: key,
            message: 'Invalid attribute in param',
          })
        }
      }
      for (const attr of fields) {
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
    if (errorArray.length > 0) {
      throw new CustomBulkError('Malformed bulk create object', errorArray)
    }
  }
}
