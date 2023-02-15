import BlockContent from '../../components/helpers/blockContent'
import style from './style.module.scss'
import { FaPlaneDeparture, FaPlaneArrival, FaMapMarkerAlt } from 'react-icons/fa'

function TravelProgram(props) {
  const { _key, heading, program, generalInformation } = props

  if (!program || !generalInformation) return null

  return (
    <section id='travelprogram' key={_key}>
      <h2 className='fancy_heading'>{heading}</h2>
      <div className={style.content}>
        <div className={style.program}>
          {program.map((item, index) => (
            <div className={style.day} key={item._key}>
              <span>
                {index == 0 ? (
                  <FaPlaneDeparture />
                ) : index == program.length - 1 ? (
                  <FaPlaneArrival />
                ) : (
                  <FaMapMarkerAlt />
                )}
              </span>
              <p>
                <b>Dag {index + 1}</b>
                <br />
                {item.description}
              </p>
            </div>
          ))}
        </div>
        <div className={style.generalInformation}>
          <BlockContent value={generalInformation} />
          <a href='#booking' id='goToBooking' className='button_orange'>
            Reserver billetter nå
          </a>
        </div>
      </div>
    </section>
  )
}

export default TravelProgram
