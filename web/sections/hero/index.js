import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'
import Image from 'next/image'
import style from './style.module.scss'

function Hero(props) {
  const { _key, type, heading, background, featuredTravels } = props

  if (!type || !background) return null

  return (
    <section id='hero' key={_key} className={`${style[`hero_${type}`]} fullwidth`}>
      <div
        className={style.wrapper}
        style={{
          backgroundImage: `url(${background})`,
        }}>
        <div className={style.content}>
          <div className={style.heading}>
            <h1>{heading}</h1>
          </div>
        </div>
      </div>

      {featuredTravels && (
        <div className={style.featuredTravels}>
          {featuredTravels.map((travel) => (
            <div className={style.travel} id='travelCard' key={travel._id}>
              <Link href={travel.url} passHref>
                <a>
                  {travel.image && (
                    <Image
                      src={travel.image.url}
                      width={9}
                      height={6}
                      layout='responsive'
                      objectFit='cover'
                      placeholder={travel.image.metadata.lqip ? 'blur' : 'empty'}
                      blurDataURL={travel.image.metadata.lqip}
                      quality={60}
                    />
                  )}
                  <h3>{travel.title}</h3>
                </a>
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Hero
