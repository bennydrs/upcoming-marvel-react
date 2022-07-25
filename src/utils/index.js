export const convertToDateFormat = (date) => {
  let d = new Date(date)
  let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d)
  let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d)
  let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d)
  return `${da} ${mo} ${ye}`
}

export const timeToReleaseDate = (release_at) =>
  new Date(parseDate(release_at)).getTime() - new Date().getTime()

export const checkDate = (date, month, year) => {
  const toDateFormat = convertToDateFormat(date, month, year)
  return date ? toDateFormat : year ? year : "TBA"
}

export const parseDate = (input) => {
  if (!input) return null
  let parts = input.split("-")

  // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1] - 1, parts[2]) // Note: months are 0-based
}

// export const convertTimeToReleaseDate = (date, month, year) => {
//   const toDateFormat = convertToDateFormat(date, month, year)
//   return new Date(toDateFormat).getTime() - new Date().getTime()
// }
