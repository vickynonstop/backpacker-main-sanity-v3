import style from './style.module.scss'

function ComponentName(props) {
  const { _key } = props
  console.log(props)

  if (!props) return null

  return <section id='' key={_key}></section>
}

export default ComponentName
