import { useState } from 'react'

import { csvToJsonArr } from '~utils/csvUtils'

import { PASSWORD_KEY, PHONENUMBER_KEY } from '../BulkIssueDrawer/UploadCsvForm'

function extractFields(parsedData: unknown[], fieldName: string) {
  const values: string[] = Array<string>(parsedData.length)
  ;(parsedData as Record<string, string>[]).map((row, index) => {
    values[index] = row[fieldName]
    delete row[fieldName]
  })
  return values
}

function hasField(parsedData: unknown[], fieldName: string) {
  return Object.hasOwn(parsedData[0] as Record<string, string>, fieldName)
}
const useParseCsv = () => {
  const [parsedArr, setParsedArr] = useState<Array<{ [key: string]: string }>>(
    [],
  )
  const [error, setError] = useState<string>('')
  const [passwords, setPasswords] = useState<string[]>([])
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([])

  const parseCsv = async (file?: File): Promise<void> => {
    setError('')
    setPasswords([])
    setPhoneNumbers([])

    if (!file) return

    let parsedData: unknown[] = []
    try {
      parsedData = await csvToJsonArr(file)
    } catch (error) {
      return setError('Error parsing CSV file')
    }

    if (parsedData.length === 0) {
      return setError(
        'CSV does not contain any rows, please upload an updated .csv',
      )
    }

    if (hasField(parsedData, PASSWORD_KEY)) {
      setPasswords(extractFields(parsedData, PASSWORD_KEY))
    }

    if (hasField(parsedData, PHONENUMBER_KEY)) {
      setPhoneNumbers(extractFields(parsedData, PHONENUMBER_KEY))
    }

    setParsedArr(parsedData as Array<{ [key: string]: string }>)
  }

  return {
    parsedArr,
    error,
    passwords,
    phoneNumbers,
    setError,
    parseCsv,
    setPasswords,
    setPhoneNumbers,
  }
}

export default useParseCsv
