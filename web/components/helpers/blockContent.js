import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import EmbedHTML from './embedHTML'
import Figure from './figure'

const portableTextComponents = {
  types: {
    figure: Figure,
    embedHTML: EmbedHTML,
  },
  marks: {
    internalLink: ({ children, value }) => {
      const { url } = value

      if (!url) return

      return (
        <Link href={url} passHref>
          <a>{children}</a>
        </Link>
      )
    },
    link: ({ children, value }) => {
      const { url } = value

      if (!url) return

      const rel = url.startsWith('/') ? undefined : 'noopener noreferrer'
      const target = url.startsWith('/') ? '_self' : '_blank'

      return (
        <a href={url} target={target} rel={rel}>
          {children}
        </a>
      )
    },
  },
}

const BlockContent = (props) => {
  return <PortableText value={props.value} components={portableTextComponents} />
}

export default BlockContent
