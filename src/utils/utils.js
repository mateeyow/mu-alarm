export const computeDate = (frequency, time) => {
  const [hour, minute] = time.split(':')
  let date

  if (frequency === 'Everyday') {
    const year = new Date().getFullYear()
    const month = new Date().getMonth()
    const day = new Date().setHours(hour, minute) > new Date() ? new Date().getDate() : new Date().getDate() + 1
    date = new Date(year, month, day, hour, minute)
  }

  return date
}
