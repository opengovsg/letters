import { useState } from 'react'

import { csvToJsonArr } from '~utils/csvUtils'

const useParseCsv = () => {
  const [parsedArr, setParsedArr] = useState<Array<{ [key: string]: string }>>(
    [],
  )
  const [error, setError] = useState<string>('')

  const parseCsv = async (file?: File | undefined): Promise<void> => {
    setError('') // reset error
    if (!file) return
    try {
      const parsedData = await csvToJsonArr(file)
      if (parsedData.length === 0) {
        setError('CSV does not contain any rows, please upload an updated .csv')
      }
      setParsedArr(parsedData as Array<{ [key: string]: string }>)
    } catch (error) {
      setError('Error parsing CSV file')
    }
  }

  return {
    parsedArr,
    error,
    setError,
    parseCsv,
  }
}

export default useParseCsv
