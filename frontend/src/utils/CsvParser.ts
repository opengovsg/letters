import saveAs from 'file-saver'

import { GetLetterPublicDto } from '~shared/dtos/get-letter.dto'

export const convertJsonToCsvString = (
  bulkGeneratedResponse: GetLetterPublicDto[],
) => {
  return [
    ['publicId', 'createdAt'],
    ...bulkGeneratedResponse.map((item) => [item.publicId, item.createdAt]),
  ]
}

export const convertCsvStringToCsv = (
  templateName: string,
  csvStringArray?: string[],
) => {
  const csvName = `${templateName} (Sample).csv`
  if (csvStringArray) {
    const blob = new Blob([csvStringArray.join(',')], {
      type: 'text/csv;charset=utf-8',
    })
    saveAs(blob, csvName)
  }
}
