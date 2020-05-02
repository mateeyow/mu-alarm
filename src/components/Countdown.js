import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNowStrict } from 'date-fns'
import { useInterval } from '../utils/hooks'

const Countdown = ({ date, onZero, onAlarm }) => {
  const [timer, setTimer] = useState()

  useEffect(() => {
    setTimer(formatDistanceToNowStrict(date, { roundingMethod: 'floor' }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useInterval(() => {
    const distance = formatDistanceToNowStrict(date, { roundingMethod: 'floor' })
    setTimer(distance)

    if (distance === '0 seconds') {
      onZero()
    }

    if (distance === '59 seconds') {
      onAlarm()
    }
  }, 1000);

  return (
    <div className='uppercase font-medium text-gray-800 dark:text-gray-200'>{timer}</div>
  )
}

Countdown.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onZero: PropTypes.func,
  onAlarm: PropTypes.func
}

export default Countdown
