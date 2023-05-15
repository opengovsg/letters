import { convertCsvStringToCsv, convertJsonToCsvString } from './CsvParser'

describe('Utils', () => {
  describe('convertJsonToCsvString', () => {
    it('converts a JSON array to a CSV string', () => {
      const bulkGeneratedResponse = [
        {
          publicId: '1234567890',
          createdAt: new Date('2023-05-14T00:00:00Z'),
          issuedLetter: 'test',
        },
        {
          publicId: '9876543210',
          createdAt: new Date('2023-05-15T00:00:00Z'),
          issuedLetter: 'test1',
        },
      ]
      const expectedCsvString = [
        ['publicId', 'createdAt'],
        ['1234567890', new Date('2023-05-14T00:00:00Z')],
        ['9876543210', new Date('2023-05-15T00:00:00Z')],
      ]

      const actualCsvString = convertJsonToCsvString(bulkGeneratedResponse)
      expect(actualCsvString).toEqual(expectedCsvString)
    })
  })

  // TODO: Test saving of CSV file and asserting fields
})
