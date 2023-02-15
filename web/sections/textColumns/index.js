import BlockContent from '../../components/helpers/blockContent'
import style from './style.module.scss'

function TextColumns(props) {
  const { _key, content } = props

  if (!content) return null

  return (
    <section id='textcolumns' key={_key} className={style.textcolumns_container}>
      {content.map((item) => {
        return (
          <div key={item._key}>
            <h2 className='fancy_heading'>{item.title}</h2>
            <BlockContent value={item.text} />
          </div>
        )
      })}
    </section>
  )
}

export default TextColumns
