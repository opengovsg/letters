import { useState } from 'react'

import { csvToJsonArr } from '~utils/csvUtils'

function extractPasswords(parsedData: unknown[]) {
  const passwords: string[] = Array<string>(parsedData.length)
  ;(parsedData as Record<string, string>[]).map((row, index) => {
    passwords[index] = row.Password
    delete row.Password
  })
  return passwords
}

function hasPasswordField(parsedData: unknown[]) {
  return Object.hasOwn(parsedData[0] as Record<string, string>, 'Password')
}

const useParseCsv = () => {
  const [parsedArr, setParsedArr] = useState<Array<{ [key: string]: string }>>(
    [],
  )
  const [error, setError] = useState<string>('')
  const [passwords, setPasswords] = useState<string[]>([])

  const parseCsv = async (file?: File): Promise<void> => {
    setError('') // reset error
    setPasswords([])
    if (!file) return
    try {
      const parsedData = await csvToJsonArr(file)
      if (parsedData.length === 0) {
        setError('CSV does not contain any rows, please upload an updated .csv')
      } else if (hasPasswordField(parsedData)) {
        setPasswords(extractPasswords(parsedData))
      }
      setParsedArr(parsedData as Array<{ [key: string]: string }>)
    } catch (error) {
      setError('Error parsing CSV file')
    }
  }

  return {
    parsedArr,
    error,
    passwords,
    setError,
    parseCsv,
    setPasswords,
  }
}

export default useParseCsv
