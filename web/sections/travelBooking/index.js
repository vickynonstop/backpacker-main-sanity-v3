import { useState } from 'react'
import { useEffect } from 'react'
import style from './style.module.scss'
import moment from 'moment'

function TravelBooking(props) {
  const { _key, dates } = props
  const [bookingOptions, setBookingOptions] = useState([])

  if (!dates) return null

  useEffect(() => {
    const getTravelData = async () => {
      const options = await Promise.all(
        dates.map(async (date) => {
          const qondorData = await fetch(
            `/api/qondor/participants?id=${date.qondorProjectId}`,
            { method: 'GET' }
          )
            .then((res) => res.json())
            .then((data) => data)

          return {
            ...date,
            availability:
              date.numberOfParticipants - qondorData.participants == 0 ? false : true,
            bookingUrl: `https://backpacker.qondor.com/ParticipantWeb/Registration/${date.qondorProjectId}`,
          }
        })
      )
      setBookingOptions(options)
    }

    getTravelData()
  }, [])

  const formatPrice = new Intl.NumberFormat('no-NB', {
    style: 'currency',
    currency: 'NOK',
    minimumFractionDigits: 0,
  })

  moment().locale('nb')

  return (
    <section id='booking' key={_key}>
      <div className={style.header}>
        <h2 className='fancy_heading'>Tidspunkter og priser</h2>
        <a
          href='https://femelle.no/lan/forbrukslan/forbrukslan-til-ferie?utm_source=backpacker&utm_medium=affiliate&utm_campaign=backpacker_travel_booking_loan'
          target='_blank'>
          Sammenlign billigste og beste ferielån
        </a>
      </div>

      <div className={style.options}>
        {bookingOptions
          .sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom))
          .map((option) => {
            return (
              <div className={style.option} key={option._key}>
                <p className={style.option_date}>
                  {moment(option.dateFrom).format('DD. MMM YYYY')} -{' '}
                  {moment(option.dateTo).format('DD. MMM YYYY')}
                </p>
                <p className={style.option_availability}>
                  {option.availability
                    ? 'Reserver din plass fra 2999 kr'
                    : 'Ingen ledige plasser'}
                </p>
                <a href={option.availability ? option.bookingUrl : ''} target='_blank'>
                  <button className='button_orange'>
                    {option.availability ? 'Reserver nå' : 'Utsolgt'}
                  </button>
                </a>
              </div>
            )
          })}
      </div>
    </section>
  )
}

export default TravelBooking
