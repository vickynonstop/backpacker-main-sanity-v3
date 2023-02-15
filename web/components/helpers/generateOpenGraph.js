import { urlFor } from '../../lib/sanity'

export function generateOpenGraph(image, alt) {
  const openGraphImages = image
    ? [
        {
          url: urlFor(image).width(800).height(450).url(),
          width: 800,
          height: 450,
          alt,
        },
        {
          url: urlFor(image).width(1200).height(630).url(),
          width: 1200,
          height: 630,
          alt,
        },
        {
          url: urlFor(image).width(600).height(600).url(),
          width: 600,
          height: 600,
          alt,
        },
      ]
    : []

  return openGraphImages
}
