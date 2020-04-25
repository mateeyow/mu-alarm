import React, { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { compareAsc } from 'date-fns'
import canAutoplay from 'can-autoplay'
import Container from '../components/Container'
import events from '../events'
import { computeDate } from "../utils/utils"
import alarm from '../assets/alarm.mp3'
import Button from '../components/Button'
import EventCard from '../components/EventCard'

const sortEvents = (events) => {
  return events
    .map(event => {
      const datetime = computeDate(event.frequency, event.time)
      return { ...event, datetime }
    })
    .sort((prev, next) => compareAsc(prev.datetime, next.datetime))
}

const Home = () => {
  const audio = useRef(new Audio(alarm))
  const [sortedEvents, setSortedEvents] = useState([])
  console.log('sortedEvents:', sortedEvents.length)
  console.log('events:', events.length)
  const [isEnabled, setEnabled] = useState(false)

  useEffect(() => {
    setSortedEvents(sortEvents(events))
    canAutoplay.audio().then(({ result }) => {
      setEnabled(result)
    })
  }, [])

  const onZero = () => {
    setSortedEvents(sortEvents(events))
  }

  const onAlarm = () => {
    if (isEnabled) {
      audio.current.play()
    }
  }

  const enableAlarm = () => {
    audio.current.play()
    audio.current.pause()
    setEnabled(!isEnabled)
  }

  return (
    <Container>
      <Helmet>
        <title>MU 2 Events Timer</title>
      </Helmet>
      <div className='my-10'>
        {sortedEvents[0] && <div className='w-11/12 md:w-3/4 mx-auto mb-10'>
          <Button onClick={enableAlarm}>{isEnabled ? 'Disable' : 'Enable'} alarm</Button>
          <EventCard event={sortedEvents[0]} onAlarm={onAlarm} onZero={onZero} />
        </div>}
        <div className='w-10/12 md:w-2/4 mx-auto'>
          {sortedEvents.filter((event, idx) => idx !== 0).map((event, idx) =>
            <EventCard key={idx} event={event} onAlarm={onAlarm} onZero={onZero} />
          )}
        </div>
      </div>
    </Container>
  )
}

export default Home
