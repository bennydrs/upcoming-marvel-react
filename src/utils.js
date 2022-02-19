export const convertToDateFormat = (date, month, year) =>
  date && `${date} ${month.substring(0, 3)} ${year}`

export const convertTimeToReleaseDate = (date, month, year) => {
  const toDateFormat = convertToDateFormat(date, month, year)
  return new Date(toDateFormat).getTime() - new Date().getTime()
}

export const checkDate = (date, month, year) => {
  const toDateFormat = convertToDateFormat(date, month, year)
  return date ? toDateFormat : year ? year : "TBA"
}
