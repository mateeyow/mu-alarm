import { setDay, isFuture, setHours, setMinutes, addDays } from "date-fns"

export const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export const computeDateTime = (frequency, time) => {
  const [hour, minute] = time.split(':')
  const year = new Date().getFullYear()
  const month = new Date().getMonth()
  let date = new Date()

  if (frequency === 'Everyday') {
    const tentativeDate = setMinutes(setHours(new Date(), hour), minute)

    date = isFuture(tentativeDate)
      ? tentativeDate
      : addDays(tentativeDate, 1)
  } else {
    const eventDay = days.indexOf(frequency)
    const tentativeDate = setDay(new Date(year, month, date.getDate(), hour, minute), eventDay)

    date = isFuture(tentativeDate)
      ? tentativeDate
      : addDays(tentativeDate, 7)
  }

  return date
}
