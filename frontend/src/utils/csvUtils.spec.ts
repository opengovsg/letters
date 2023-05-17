import { arrToCsvString, jsonArrToCsvString } from './csvUtils'

describe('jsonArrToCsvString', () => {
  const sampleJsonArr = [
    { name: 'John', age: '30', city: 'New York' },
    { name: 'Alice', age: '25', city: 'London' },
    { name: 'Bob', age: '35', city: 'Paris' },
  ]

  test('should convert JSON array to CSV string', () => {
    const expectedCsvString =
      'name,age,city\r\n"John","30","New York"\r\n"Alice","25","London"\r\n"Bob","35","Paris"'

    const csvString = jsonArrToCsvString(sampleJsonArr)

    expect(csvString).toEqual(expectedCsvString)
  })

  test('should convert JSON array to CSV string with selected keys', () => {
    const selectedKeys = ['name', 'city']
    const expectedCsvString =
      'name,city\r\n"John","New York"\r\n"Alice","London"\r\n"Bob","Paris"'

    const csvString = jsonArrToCsvString(sampleJsonArr, selectedKeys)

    expect(csvString).toEqual(expectedCsvString)
  })
})

describe('arrToCsvString', () => {
  test('should convert string array to CSV string', () => {
    const sampleStrArr = ['apple', 'banana', 'cherry']
    const expectedCsvString = 'apple,banana,cherry'

    const csvString = arrToCsvString(sampleStrArr)

    expect(csvString).toEqual(expectedCsvString)
  })
})
