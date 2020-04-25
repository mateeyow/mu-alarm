import React from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import Card from './Card'
import Title from './text/Title'
import Subtitle from './text/Subtitle'
import Countdown from './Countdown'

const EventCard = ({ event, onZero, onAlarm }) => {
  return (
    <Card className='mt-2'>
      <div className='flex flex-row justify-between items-center'>
        <div>
          <Title>{event.title}</Title>
          <Subtitle className='mt-2'>{event.description}</Subtitle>
        </div>
        <div className='flex-shrink-0'>
          <Countdown date={event.datetime} onZero={onZero} onAlarm={onAlarm} />
          <div className='text-gray-600'>{format(event.datetime, 'EEE HH:mm')}</div>
        </div>
      </div>
    </Card>
  )
}

EventCard.propTypes = {
  event: PropTypes.object,
  onZero: PropTypes.func,
  onAlarm: PropTypes.func
}

export default EventCard
