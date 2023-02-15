import {
  NextSeo,
  OrganizationJsonLd,
  SiteLinksSearchBoxJsonLd,
  WebPageJsonLd,
} from 'next-seo'
import Link from 'next/link'
import { generateOpenGraph } from '../components/helpers/generateOpenGraph'
import Layout from '../components/layout'
import PageSingle from '../components/layouts/pageSingle'
import PostSingle from '../components/layouts/postSingle'
import TravelSingle from '../components/layouts/travelSingle'
import { getPageContent, getPageSlugs } from '../lib/queries'
import { getClient, usePreviewSubscription } from '../lib/sanity'

function filterDataToSingleItem(data, preview) {
  if (!Array.isArray(data)) return data
  if (data.length === 1) return data[0]
  if (preview) return data.find((item) => item._id.startsWith(`drafts.`)) || data[0]
  return data[0]
}

function Page({ config, header, footer, api, data, preview, query, queryParams }) {
  const { data: previewData } = usePreviewSubscription(query, {
    params: queryParams ?? {},
    initialData: data,
    enabled: preview,
  })

  const pageData = filterDataToSingleItem(previewData, preview)
  const {
    metaTitle,
    metaDescription,
    metaPageType = 'website',
    openGraphImage,
    breadcrumbs,
  } = pageData

  return (
    <Layout
      config={config}
      header={header}
      footer={footer}
      breadcrumbs={breadcrumbs}
      preview={preview}>
      <NextSeo
        title={metaTitle}
        titleTemplate={`%s | ${config.title}`}
        description={metaDescription}
        canonical={config.url + pageData.slug.current}
        site_name={config.title}
        openGraph={{
          url: config.url + pageData.slug.current,
          title: `${metaTitle} | ${config.title}`,
          description: metaDescription,
          images: generateOpenGraph(
            openGraphImage ? openGraphImage : config.openGraphImage,
            metaTitle
          ),
          site_name: config.title,
        }}
        additionalMetaTags={[
          {
            property: 'og:type',
            content: metaPageType,
          },
        ]}
      />

      <SiteLinksSearchBoxJsonLd
        url={config.url}
        potentialActions={[
          {
            target: `${config.url}/sok?q`,
            queryInput: 'search_term_string',
          },
        ]}
      />

      <OrganizationJsonLd
        id={`${config.url}#organization`}
        name={config.title}
        legalName='Backpacker AS'
        url={config.url}
        logo={config.logo.url}
        contactPoints={[
          {
            telephone: config.phoneNumber,
            contactType: 'customer service',
          },
        ]}
      />

      <WebPageJsonLd
        id={`${config.url}${pageData.slug.current}#content`}
        description={metaDescription}
      />

      {preview && (
        <Link href={`/api/exit-preview?slug=${pageData.slug.current}`} passHref>
          <a className='exit_preview'>Exit preview</a>
        </Link>
      )}

      {pageData._type === 'page' && <PageSingle page={pageData} config={config} />}
      {pageData._type === 'post' && <PostSingle page={pageData} config={config} />}
      {pageData._type === 'travel' && <TravelSingle page={pageData} config={config} />}
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const { slug = [] } = params

  const queryParams =
    slug.length === 0
      ? { slug: '/', slugArray: [] }
      : {
          slug: `/${slug.join('/')}`,
          slugArray: slug.map((v, i) => '/' + slug.slice(0, i + 1).join('/')),
        }

  const res = await getClient(preview).fetch(getPageContent, queryParams)

  if (!res || !res.length)
    return {
      redirect: {
        permanent: true,
        destination: '/',
      },
    }

  const page = filterDataToSingleItem(res, preview)

  return {
    props: {
      preview,
      data: page,
      query: getPageContent,
      queryParams,
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  const res = await getClient().fetch(getPageSlugs)
  return {
    paths: res.map((slug) => ({ params: { slug: slug.split('/').filter((p) => p) } })),
    fallback: 'blocking',
  }
}

export default Page
