import Image from 'next/image'
import style from './style.module.scss'
import { FiArrowRight } from 'react-icons/fi'

function ImageGallery(props) {
  const { _key, images } = props
  const imageHeight = 400

  if (!images) return null

  return (
    <section id='imagegallery' key={_key} className={style.imagegallery_container}>
      <p className={style.scroll_icon}>
        Scroll
        <FiArrowRight />
      </p>
      <div className={style.images}>
        {images.map((item) => {
          return (
            <Image
              src={item.url}
              alt={item.alt}
              width={
                item.metadata.dimensions.width /
                (item.metadata.dimensions.height / imageHeight)
              }
              height={imageHeight}
              layout='fixed'
              placeholder={item.metadata.lqip ? 'blur' : 'empty'}
              blurDataURL={item.metadata.lqip}
              quality={60}
              className={style.image}
              key={item._key}
            />
          )
        })}
      </div>
    </section>
  )
}

export default ImageGallery
