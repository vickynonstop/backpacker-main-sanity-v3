import { getSitemap } from '../lib/queries'
import { sanityClient } from '../lib/sanity'

export default function Sitemap() {
  return <div>Loading sitemap...</div>
}

export async function getServerSideProps({ res }) {
  const baseUrl = process.env.BASE_URL
  const sitemap = await sanityClient.fetch(getSitemap)

  const createSitemap = () =>
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemap
        .map((location) => {
          return `
            <url>
              <loc>${baseUrl}${location.slug == '/' ? '' : location.slug}</loc>
              <changefreq>weekly</changefreq>
              <lastmod>${location._updatedAt}</lastmod>
            </url>
          `
        })
        .join('')}
    </urlset>`

  res.setHeader('Content-Type', 'text/xml')
  res.write(createSitemap())
  res.end()
  return {
    props: {},
  }
}
