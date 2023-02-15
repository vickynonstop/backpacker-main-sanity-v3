import BlockContent from '../../components/helpers/blockContent'
import style from './style.module.scss'

function TravelTopInfo(props) {
  const {
    _key,
    destination,
    title,
    intro,
    priceFrom,
    numberOfDays,
    numberOfParticipants,
  } = props

  if (!destination || !title || !priceFrom) return null

  const formatPrice = new Intl.NumberFormat('no-NB', {
    style: 'currency',
    currency: 'NOK',
    minimumFractionDigits: 0,
  })

  return (
    <section id='traveltopinfo' key={_key} className={style.traveltopinfo_container}>
      <div className={style.heading}>
        <p>{destination}</p>
        <h2>{title}</h2>
        {
          <p>
            {numberOfDays} dager / {numberOfParticipants} deltagere
          </p>
        }
      </div>

      <div className={style.intro}>
        <BlockContent value={intro} />
      </div>

      <div className={style.price}>
        <p>
          <small>Pris</small>
          <br />
          {formatPrice.format(priceFrom)}
        </p>
        <a href='#booking' id='goToBooking' className='button_orange'>
          Sikre din plass nå!
        </a>
      </div>
    </section>
  )
}

export default TravelTopInfo
