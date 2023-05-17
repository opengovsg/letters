import saveAs from 'file-saver'

export const jsonArrToCsvString = (
  jsonArr: { [key: string]: string }[],
  selectedKeys?: string[],
): string => {
  const replacerFn = (_key: string, value: string) =>
    value === null ? '' : value
  const headers = selectedKeys || Object.keys(jsonArr[0])
  const csv = jsonArr.map((row) =>
    headers.map((header) => JSON.stringify(row[header], replacerFn)).join(','),
  )
  csv.unshift(headers.join(','))
  const csvString = csv.join('\r\n')
  return csvString
}

export const arrToCsvString = (strArr: string[]): string => strArr.join(',')

export const csvStringToCsv = (csvName: string, csvString: string) => {
  if (csvString) {
    const blob = new Blob([csvString], {
      type: 'text/csv;charset=utf-8',
    })
    saveAs(blob, csvName)
  }
}

export const jsonArrToCsv = (
  csvName: string,
  jsonArr: { [key: string]: string }[],
  selectedKeys?: string[],
): void => {
  const csvString = jsonArrToCsvString(jsonArr, selectedKeys)
  return csvStringToCsv(csvName, csvString)
}

export const arrToCsv = (csvName: string, strArr: string[]): void => {
  const csvString = arrToCsvString(strArr)
  return csvStringToCsv(csvName, csvString)
}
