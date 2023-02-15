import Render from '../helpers/renderSections'

function PageSingle({ page, config }) {
  const { content } = page

  return (
    <main id='content' className={`template_page`}>
      <Render sections={content} config={config} />
    </main>
  )
}

export default PageSingle
