import Image from 'next/image'

function ImageSingle(props) {
  const { _key, image } = props

  if (!image) return null

  return (
    <section id='image' key={_key}>
      <Image
        src={image.url}
        alt={image.alt}
        width={image.metadata.dimensions.width}
        height={image.metadata.dimensions.height}
        layout='responsive'
        placeholder={image.metadata.lqip ? 'blur' : 'empty'}
        blurDataURL={image.metadata.lqip}
        quality={60}
      />
    </section>
  )
}

export default ImageSingle
