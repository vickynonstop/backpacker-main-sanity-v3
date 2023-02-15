import style from './style.module.scss'

function Quote(props) {
  const { _key, content } = props

  if (!content) return null

  return (
    <section id='quote' key={_key} className={style.quote_container}>
      <div className={style.wrapper}>
        <div className={style.content}>
          <p className={style.text}>{content}</p>
        </div>
      </div>
    </section>
  )
}

export default Quote
