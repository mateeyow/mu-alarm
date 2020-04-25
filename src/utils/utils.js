import { setDay, isPast, addDays } from "date-fns"

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function getNextDayOfWeek(date, dayOfWeek) {
  const daysToAdd = (7 + dayOfWeek + 1) % 7

  return addDays(date, daysToAdd);
}

export const computeDate = (frequency, time) => {
  const [hour, minute] = time.split(':')
  const year = new Date().getFullYear()
  const month = new Date().getMonth()
  let date = new Date()

  if (frequency === 'Everyday') {
    const day = new Date().setHours(hour, minute) > new Date() ? new Date().getDate() : new Date().getDate() + 1
    date = new Date(year, month, day, hour, minute)
  } else {
    const eventDay = days.indexOf(frequency)
    const tentativeDate = setDay(new Date(year, month, date.getDate(), hour, minute), eventDay)

    date = isPast(tentativeDate) ? getNextDayOfWeek(new Date(year, month, date.getDate(), hour, minute), eventDay) : tentativeDate
  }

  return date
}
