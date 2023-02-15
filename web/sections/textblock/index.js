import BlockContent from '../../components/helpers/blockContent'
import style from './style.module.scss'

function TextBlock(props) {
  const { _key, type, heading, content } = props

  if (!type || !content) return null

  return (
    <section id='textblock' key={_key} className={style[`textblock_${type}`]}>
      {heading && <h2 className={style.heading}>{heading}</h2>}
      <div>
        <BlockContent value={content} />
      </div>
    </section>
  )
}

export default TextBlock
