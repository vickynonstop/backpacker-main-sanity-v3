import Image from 'next/image'
import Link from 'next/link'
import style from '../styles/layouts/footer.module.scss'
import BlockContent from './helpers/blockContent'

function Footer({ config, footer }) {
  return (
    <footer id='footer' className={style.footer_container}>
      <div className={style.wrapper}>
        <div className={style.contact_options}>
          {footer.contactOptions.map(({ _key, icon, title, link }) => {
            return (
              <Link href={link} key={_key} passHref>
                <a className={style.contact_option}>
                  <div className={style.contact_option_icon}>
                    <Image src={icon} width={32} height={32} layout='fixed' alt={title} />
                  </div>
                  <div className={style.contact_option_text}>{title}</div>
                </a>
              </Link>
            )
          })}
        </div>
        <div className={style.copyright}>
           <BlockContent value={footer.copyright} />
        </div>
      </div>
    </footer>
  )
}

export default Footer
