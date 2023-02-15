import Ctas from '../ctas'
import style from './style.module.scss'
import Image from 'next/image'

function CtaCard(props) {
  const { _key, config, title, background, ctas, includeLogo } = props

  if (!title || !background) return null

  return (
    <section id='ctacard' key={_key} className={style.ctacard_container}>
      <div className={style.wrapper} style={{ backgroundImage: `url(${background})` }}>
        <div className={style.content}>
          {includeLogo && (
            <div className={style.logo}>
              <Image
                src={config.logoLight.url}
                alt={config.title}
                width={config.logoLight.metadata.dimensions.width}
                height={config.logoLight.metadata.dimensions.height}
                objectFit='contain'
                placeholder={config.logoLight.metadata.lqip ? 'blur' : 'empty'}
                blurDataURL={config.logoLight.metadata.lqip}
                quality={60}
              />
            </div>
          )}
          <h2>{title}</h2>
          <Ctas value={ctas} />
        </div>
      </div>
    </section>
  )
}

export default CtaCard
