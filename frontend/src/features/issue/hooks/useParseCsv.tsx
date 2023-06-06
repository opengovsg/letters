import { useState } from 'react'

import { csvToJsonArr } from '~utils/csvUtils'

const useParseCsv = () => {
  const [parsedArr, setParsedArr] = useState<Array<{ [key: string]: string }>>(
    [],
  )
  const [error, setError] = useState<string>('')
  const [hasPasswordField, setHasPasswordField] = useState(false)

  const parseCsv = async (file?: File): Promise<void> => {
    setError('') // reset error
    if (!file) return
    try {
      const parsedData = await csvToJsonArr(file)
      if (parsedData.length === 0) {
        setError('CSV does not contain any rows, please upload an updated .csv')
      } else {
        setHasPasswordField(
          Object.hasOwn(parsedData[0] as Record<string, string>, 'Password'),
        )
      }
      setParsedArr(parsedData as Array<{ [key: string]: string }>)
    } catch (error) {
      setError('Error parsing CSV file')
    }
  }

  return {
    parsedArr,
    error,
    hasPasswordField,
    setError,
    parseCsv,
    setHasPasswordField,
  }
}

export default useParseCsv
