import style from './style.module.scss'
import Link from 'next/link'
import Image from 'next/image'

function Articles(props) {
  const { _key, type, heading, posts } = props

  if (!type || !posts) return null

  return (
    <section id='articles' key={_key} className={style[`articles_${type}`]}>
      {heading && <h2 className='fancy_heading'>{heading}</h2>}
      <div className={style.articles}>
        {posts.map((post, index) => {
          return (
            <Link href={post.url} key={index} passHref>
              <a>
                <div className={style.article}>
                  <Image
                    src={post.image.url}
                    alt={post.image.alt}
                    width={9}
                    height={6}
                    layout='responsive'
                    objectFit='cover'
                    placeholder={post.image.metadata.lqip ? 'blur' : 'empty'}
                    blurDataURL={post.image.metadata.lqip}
                    className={style.image}
                  />
                  <h3 className={style.title}>{post.title}</h3>
                </div>
              </a>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default Articles
