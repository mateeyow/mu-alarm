import { clear, advanceTo } from 'jest-date-mock'
import { computeDateTime } from '../utils'

describe('#utils', () => {
  afterEach(() => {
    clear()
  })

  describe('#computeDateTime', () => {
    it('should return the correct date time if frequency is Everyday', () => {
      advanceTo(new Date(2020, 5, 1, 16))
      const result = computeDateTime('Everyday', '20:00')

      expect(result).toEqual(new Date(2020, 5, 1, 20))
    })

    it('should add a day if time has passed', () => {
      advanceTo(new Date(2020, 3, 30, 20, 1))
      const datetime = computeDateTime('Everyday', '20:00')

      expect(datetime).toEqual(new Date(2020, 4, 1, 20))
    })

    it('should set the schedule for non-daily frequency', () => {
      advanceTo(new Date(2020, 3, 30, 20))
      const datetime = computeDateTime('Friday', '17:30')

      expect(datetime).toEqual(new Date(2020, 4, 1, 17, 30))
    })

    it('should set the date time to the next instance of the day if day has passed', () => {
      advanceTo(new Date(2020, 4, 28, 1))
      const datetime = computeDateTime('Wednesday', '17:30')

      expect(datetime).toEqual(new Date(2020, 5, 3, 17, 30))
    })
  })
})