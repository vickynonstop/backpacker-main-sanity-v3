import Image from 'next/image'

export default function Figure({ value }) {
  const { image } = value
  if (!image.url || !image.metadata) return undefined

  return (
    <figure>
      <Image
        src={image.url}
        alt={image.alt}
        width={image.metadata.dimensions.width}
        height={image.metadata.dimensions.height}
        layout='responsive'
        placeholder={image.metadata.lqip ? 'blur' : 'empty'}
        blurDataURL={image.metadata.lqip}
      />
    </figure>
  )
}
