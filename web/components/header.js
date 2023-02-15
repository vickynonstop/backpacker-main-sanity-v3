import { BreadcrumbJsonLd } from 'next-seo'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import style from '../styles/layouts/header.module.scss'

function Header({ config, header, breadcrumbs = [] }) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeStart', () => setIsOpen(false))
  }, [])

  return (
    <header id='header' className={style.header_container}>
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: 'Hjem',
            item: config.url,
          },
          ...breadcrumbs.map((v, i) => {
            return {
              position: i + 2,
              name: v.title,
              item: config.url + v.slug,
            }
          }),
        ]}
      />

      <div className={style.wrapper}>
        <div className={style.menu}>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <>
                <svg
                  width='26'
                  height='23'
                  viewBox='0 0 26 23'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <line
                    x1='1.5'
                    y1='-1.5'
                    x2='30.0589'
                    y2='-1.5'
                    transform='matrix(0.766044 -0.642788 0.476621 0.879109 1.6333 22.6429)'
                    stroke='white'
                    strokeWidth='3'
                    strokeLinecap='round'
                  />
                  <line
                    x1='1.5'
                    y1='-1.5'
                    x2='30.0589'
                    y2='-1.5'
                    transform='matrix(-0.766044 -0.642788 -0.476621 0.879109 24.8667 22.6429)'
                    stroke='white'
                    strokeWidth='3'
                    strokeLinecap='round'
                  />
                </svg>
                <p>LUKK</p>
              </>
            ) : (
              <>
                <svg
                  width='35'
                  height='20'
                  viewBox='0 0 35 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <line
                    x1='1.5'
                    y1='2'
                    x2='33.5'
                    y2='2'
                    stroke='white'
                    strokeWidth='3'
                    strokeLinecap='round'
                  />
                  <line
                    x1='1.5'
                    y1='18'
                    x2='33.5'
                    y2='18'
                    stroke='white'
                    strokeWidth='3'
                    strokeLinecap='round'
                  />
                  <line
                    x1='1.5'
                    y1='10'
                    x2='33.5'
                    y2='10'
                    stroke='white'
                    strokeWidth='3'
                    strokeLinecap='round'
                  />
                </svg>
                <p>MENY</p>
              </>
            )}
          </button>
        </div>
        <div className={style.brand}>
          <Link href='/' passHref>
            <a>
              <Image
                src={header.logo.url}
                alt={config.title}
                width={header.logo.metadata.dimensions.width}
                height={header.logo.metadata.dimensions.height}
                objectFit='contain'
                placeholder={header.logo.metadata.lqip ? 'blur' : 'empty'}
                blurDataURL={header.logo.metadata.lqip}
                priority={true}
                quality={100}
              />
            </a>
          </Link>
        </div>
        <div className={style.button}>
          <Link href={header.button.link} passHref>
            <a className='button_orange'>{header.button.text}</a>
          </Link>
        </div>
      </div>

      <nav className={`${style.navigation} ${isOpen && style.navigation_open}`}>
        <ul>
          {header?.navigation?.map((item) => (
            <li key={item._id}>
              <Link href={item.url} passHref>
                <a>{item.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {isOpen && (
        <div className={style.navigation_overlay} onClick={() => setIsOpen(false)} />
      )}
    </header>
  )
}

export default Header
