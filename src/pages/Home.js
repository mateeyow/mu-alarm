import React, { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { compareAsc } from 'date-fns'
import canAutoplay from 'can-autoplay'
import Container from '../components/Container'
import Card from '../components/Card'
import Title from '../components/text/Title'
import Subtitle from '../components/text/Subtitle'
import events from '../events'
import Countdown from '../components/Countdown'
import { computeDate } from "../utils/utils"
import alarm from '../assets/alarm.mp3'
import Button from '../components/Button'

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
        {sortedEvents[0] && <div className='w-3/4 mx-auto mb-10'>
          <Button onClick={enableAlarm}>{isEnabled ? 'Disable' : 'Enable'} alarm</Button>
          <Card className='mt-2'>
            <div className='flex flex-row justify-between'>
              <div>
                <Title>{sortedEvents[0].title}</Title>
                <Subtitle className='mt-2'>{sortedEvents[0].description}</Subtitle>
              </div>
              <Countdown date={sortedEvents[0].datetime} onZero={onZero} onAlarm={onAlarm} />
            </div>
          </Card>
        </div>}
        <div className='w-2/4 mx-auto'>
          {sortedEvents.filter((event, idx) => idx !== 0).map((event, idx) =>
            <Card key={idx} className='mt-2'>
              <div className='flex flex-row justify-between'>
                <div>
                  <Title>{event.title}</Title>
                  <Subtitle className='mt-2'>{event.description}</Subtitle>
                </div>
                <Countdown date={event.datetime} onZero={onZero} onAlarm={onAlarm} />
              </div>
            </Card>
          )}
        </div>
      </div>
    </Container>
  )
}

export default Home
