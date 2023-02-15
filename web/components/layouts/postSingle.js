import Render from '../helpers/renderSections'
import { ArticleJsonLd } from 'next-seo'
import { Hero } from '../../sections'
import style from '../../styles/layouts/post.module.scss'

function PostSingle({ page, config }) {
  const { title, content, image } = page

  return (
    <main id='content' className={`template_post`}>
      <ArticleJsonLd
        url={config.url + page.slug.current}
        title={page.metaTitle}
        description={page.metaDescription}
        images={page.image.url ? [page.image.url] : []}
        datePublished={page._createdAt}
        dateModified={page._updatedAt}
        authorName='Backpacker Norge'
        publisherName='Backpacker Norge'
      />

      <Hero type={'normal_background'} heading={title} background={image.url} />

      <div className={style.content}>
        <Render sections={content} config={config} />
      </div>

      <section className={style.affiliate_links}>
        <h2>
          <a href='https://femelle.no/forsikring/reiseforsikring?utm_source=backpacker&utm_medium=affiliate&utm_campaign=backpacker_blogpost_insurance'>
            Finn beste reiseforsikring
          </a>
        </h2>
        <h2>
          <a href='https://femelle.no/lan/forbrukslan/forbrukslan-til-ferie?utm_source=backpacker&utm_medium=affiliate&utm_campaign=backpacker_blogpost_loan'>
            Sammenlign billigste forbrukslån til ferie
          </a>
        </h2>
      </section>
    </main>
  )
}

export default PostSingle
