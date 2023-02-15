import style from './style.module.scss'
import { FiInstagram } from 'react-icons/fi'
import { useEffect, useState } from 'react'

function Instagram(props) {
  const { _key, heading, config } = props

  if (!config?.api?.instagramClientToken) return null

  const token = config.api.instagramClientToken
  const fetchUrl = `https://graph.instagram.com/me/media?fields=media_count,media_type,permalink,media_url,caption&access_token=${token}`

  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(fetchUrl)
          .then((response) => response.json())
          .then((result) => setData(result.data.slice(0, 3)))
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [fetchUrl])

  return (
    <section id='instagram' key={_key}>
      {heading && <h2 className='fancy_heading'>{heading}</h2>}
      <div className={style.instagram}>
        {data?.map((post, index) => (
          <a key={index} href={post.permalink} target='_blank'>
            <div className={style.instagram_post}>
              <span>
                <FiInstagram />
              </span>
              <img src={post.media_url} alt={post.caption} loading='lazy' />
              <p>{post.caption.slice(0, 60)}...</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

export default Instagram
