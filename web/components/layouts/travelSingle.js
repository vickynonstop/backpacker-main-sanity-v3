import { Hero, TravelTopInfo } from '../../sections'
import Render from '../helpers/renderSections'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import style from '../../styles/layouts/travel.module.scss'
import TravelBooking from '../../sections/travelBooking'
import moment from 'moment'

function TravelSingle({ page, config }) {
  const {
    title,
    heroHeading,
    heroBackground,
    intro,
    dates = [],
    destination,
    content,
  } = page

  const [priceFrom, setPriceFrom] = useState(0)
  const [numberOfDays, setNumberOfDays] = useState(0)
  const [numberOfParticipants, setNumberOfParticipants] = useState('0')

  const router = useRouter()
  const { bookingKey } = router.query

  // Update booking-buttons with the direct Qondor link if bookingKey matches a date
  useEffect(() => {
    const orderButtons = document.querySelectorAll('#goToBooking')
    const travelDateInformation = dates?.find((date) => date._key === bookingKey)

    if (!travelDateInformation) return

    const { qondorProjectId } = travelDateInformation

    orderButtons.forEach((button) => {
      button.setAttribute(
        'href',
        `https://backpacker.qondor.com/ParticipantWeb/Registration/${qondorProjectId}`
      )
      button.setAttribute('target', '_blank')
    })
  }, [bookingKey])

  useEffect(() => {
    // Get lowest and highest price from dates, and set it to state
    const lowestNumberOfParticipants = Math.min(
      ...dates.map((date) => date.numberOfParticipants)
    )
    const highestNumberOfParticipants = Math.max(
      ...dates.map((date) => date.numberOfParticipants)
    )
    setNumberOfParticipants(
      lowestNumberOfParticipants === highestNumberOfParticipants
        ? `${lowestNumberOfParticipants}`
        : `${lowestNumberOfParticipants} - ${highestNumberOfParticipants}`
    )

    // Get lowest and highest number of days from dates, and set it to state
    const lowestNumberOfDays = Math.min(
      ...dates.map((date) => moment(date.dateTo).diff(moment(date.dateFrom), 'days') + 1)
    )
    const highestNumberOfDays = Math.max(
      ...dates.map((date) => moment(date.dateTo).diff(moment(date.dateFrom), 'days') + 1)
    )
    setNumberOfDays(
      lowestNumberOfDays === highestNumberOfDays
        ? `${lowestNumberOfDays}`
        : `${lowestNumberOfDays} til ${highestNumberOfDays}`
    )

    // Get lowest price from dates, and set it to state
    const lowestFromPrice = Math.min(...dates.map((date) => date.priceFrom))
    setPriceFrom(lowestFromPrice)
  }, [])

  const formatPrice = new Intl.NumberFormat('no-NB', {
    style: 'currency',
    currency: 'NOK',
    minimumFractionDigits: 0,
  })

  return (
    <main id='content' className={`template_travel`}>
      <Hero
        type={'normal_background'}
        heading={heroHeading}
        background={heroBackground.url}
      />

      <TravelTopInfo
        destination={destination}
        title={title}
        intro={intro}
        priceFrom={priceFrom}
        numberOfDays={numberOfDays}
        numberOfParticipants={numberOfParticipants}
      />

      <Render sections={content} config={config} />

      <TravelBooking dates={dates} />

      <div className={style.floating_bar}>
        <div className={style.wrapper}>
          <p>
            <b>Pris</b>: {formatPrice.format(priceFrom)}
          </p>
          <a
            href='#booking'
            id='goToBooking'
            className={`button_orange ${style.floating_bar_button}`}>
            Reserver
          </a>
        </div>
      </div>
    </main>
  )
}

export default TravelSingle
