import React, { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { compareAsc } from 'date-fns'
import canAutoplay from 'can-autoplay'
import store from 'store2'
import Container from '../components/Container'
import events from '../events'
import { computeDateTime } from "../utils/utils"
import alarm from '../assets/alarm.mp3'
import Button from '../components/Button'
import EventCard from '../components/EventCard'

const sortEvents = (events) => {
  const eventsArray = events
    .reduce((acc, curr) => {
      const { title, description } = curr
      const eventSchedule = curr.schedule.map(sched => ({
        title,
        description,
        frequency: sched.frequency,
        time: sched.time,
        datetime: computeDateTime(sched.frequency, sched.time)
      }))
      return [...acc, ...eventSchedule]
    }, [])
    .sort((prev, next) => compareAsc(prev.datetime, next.datetime))

  return eventsArray
}

const Home = () => {
  const audio = useRef(new Audio(alarm))
  const [sortedEvents, setSortedEvents] = useState([])
  const [isEnabled, setEnabled] = useState(false)
  const [isDarkMode, setDarkMode] = useState(store('darkMode'))

  useEffect(() => {
    setSortedEvents(sortEvents(events))
    canAutoplay.audio().then(({ result }) => {
      setEnabled(result)
    })

    function checkDarkMode() {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return setDarkMode(true)
      }
      setDarkMode(false)
    }

    if (store('darkMode') === null) {
      if (checkDarkMode()) {
        store('darkMode', true)
        document.documentElement.classList.add('mode-dark');
      } else {
        store('darkMode', false)
        document.documentElement.classList.remove('mode-dark');
      }
    }
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      store('darkMode', true)
      document.documentElement.classList.add('mode-dark');
    } else {
      store('darkMode', false)
      document.documentElement.classList.remove('mode-dark');
    }
  }, [isDarkMode])

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
      <div className='py-10'>
        {sortedEvents[0] && <div className='w-11/12 md:w-3/4 mx-auto mb-10'>
          <Button onClick={enableAlarm}>{isEnabled ? 'Disable' : 'Enable'} alarm</Button>
          <Button className='ml-4' onClick={() => setDarkMode(!isDarkMode)}>{isDarkMode ? 'Disable' : 'Enable'} dark mode</Button>
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
