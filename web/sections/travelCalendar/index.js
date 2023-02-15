import style from './style.module.scss'
import { useEffect, useState } from 'react'
import moment from 'moment'
import Link from 'next/link'
import Image from 'next/image'
import 'moment/locale/nb'

function TravelCalendar(props) {
  const { _key, heading, travels = [] } = props
  const [allDates, setAllDates] = useState([])

  if (!travels || travels.length <= 0) return null

  useEffect(() => {
    const dates = travels
      .reduce((acc, curr) => {
        const { dates } = curr
        if (!dates) return acc
        return [...acc, ...dates]
      }, [])
      .sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom))
      .filter((date) => moment(date.dateFrom).isAfter(moment()))

    setAllDates(dates)

    const checkAvailability = async () => {
      const availability = await Promise.all(
        dates.map(async (date) => {
          const { qondorProjectId, numberOfParticipants } = date
          const qondorData = await fetch(
            `/api/qondor/participants?id=${qondorProjectId}`
          ).then((res) => res.json())
          const isAvailable = numberOfParticipants > qondorData.participants
          return { ...date, isAvailable }
        })
      )
      setAllDates(availability)
    }

    checkAvailability()
  }, [])

  function capitalizeFirstLetter(str) {
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1)
    return capitalized
  }

  return (
    <section id='travelcalendar' key={_key}>
      <h2 className='fancy_heading'>{heading}</h2>

      <div className={style.dates}>
        {allDates.map((date, index) => {
          const firstMonthIndex = allDates.findIndex((d) => {
            return (
              moment(d.dateFrom).format('YYYY-MM') ===
              moment(date.dateFrom).format('YYYY-MM')
            )
          })

          return (
            <div key={date._key}>
              {firstMonthIndex === index && (
                <div className={style.month}>
                  <p>
                    {capitalizeFirstLetter(moment(date.dateFrom).format('MMMM YYYY'))}
                  </p>
                </div>
              )}
              <div className={style.date}>
                <Link href={`${date.url}?bookingKey=${date._key}`} passHref>
                  <a className={style.date_wrapper}>
                    <div className={style.date_image}>
                      {date.image && (
                        <Image
                          src={date.image.url}
                          alt={date.name}
                          width={9}
                          height={6}
                          layout='responsive'
                          objectFit='cover'
                          placeholder={date.image.metadata.lqip ? 'blur' : 'empty'}
                          blurDataURL={date.image.metadata.lqip}
                          quality={60}
                        />
                      )}
                    </div>
                    <div className={style.date_content}>
                      <h3>{date.name}</h3>
                      <div className={style.date_content_details}>
                        <p>
                          <small>Utreise</small>
                          {moment(date.dateFrom).format('DD.MM.YYYY')}
                        </p>
                        <p>
                          <small>Avreise</small>
                          {moment(date.dateTo).format('DD.MM.YYYY')}
                        </p>
                        <p>
                          <small>Pris: </small>
                          {date.priceFrom} kr
                        </p>
                      </div>
                    </div>
                  </a>
                </Link>
                <div className={style.date_buttons}>
                  <a
                    href={`https://backpacker.qondor.com/ParticipantWeb/Registration/${date.qondorProjectId}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='button_orange'>
                    {date.isAvailable == false ? 'Utsolgt' : 'Book nå'}
                  </a>
                  <Link href={`${date.url}?bookingKey=${date._key}`} passHref>
                    <a id='travelCard' className='button_black'>
                      Les mer
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default TravelCalendar
