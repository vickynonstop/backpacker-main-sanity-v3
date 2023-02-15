import Link from 'next/link'
import style from './style.module.scss'

function Ctas(props) {
  const { value = [] } = props

  return (
    <ctas className={style.ctas}>
      {value?.map((cta) => (
        <Cta key={cta._key} cta={cta} />
      ))}
    </ctas>
  )
}

function Cta({ cta }) {
  const { title, page, link, linkToQondorForm } = cta

  if (linkToQondorForm) {
    return (
      <a href='#booking' id='goToBooking' className='button_orange'>
        {title}
      </a>
    )
  }

  if (page && link) {
    return (
      <Link href={link} passHref>
        <a className='button_orange'>{title}</a>
      </Link>
    )
  }

  if (link && !page) {
    const rel = link.startsWith('/') ? undefined : 'noopener noreferrer'
    const target = link.startsWith('/') ? '_self' : '_blank'

    return (
      <a className='button_orange' href={link} rel={rel} target={target}>
        {title}
      </a>
    )
  }

  return <a className='button_orange'>{title}</a>
}

export default Ctas
