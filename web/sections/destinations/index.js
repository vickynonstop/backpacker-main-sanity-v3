import style from './style.module.scss'
import Link from 'next/link'
import Image from 'next/image'

function Destinations(props) {
  const { _key, destinations, heading } = props

  if (!destinations) return null

  return (
    <section id='destinations' key={_key}>
      {heading && <h2 className='fancy_heading'>{heading}</h2>}
      <div className={style.destinations}>
        {destinations.map((destination, index) => (
          <Link href={destination.url} key={index} passHref>
            <a>
              <div className={style.destination}>
                <Image
                  src={destination.image.url}
                  alt={destination.image.alt}
                  width={9}
                  height={6}
                  layout='responsive'
                  objectFit='cover'
                  placeholder={destination.image.metadata.lqip ? 'blur' : 'empty'}
                  blurDataURL={destination.image.metadata.lqip}
                  quality={60}
                  className={style.image}
                />
                <h3 className={style.title}>{destination.name}</h3>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Destinations
