import Head from 'next/head'
import Footer from './footer'
import Header from './header'
import MessengerChat from './messenger'

function Layout({ config, header, footer, breadcrumbs = [], children }) {
  if (!config || !header || !footer) return null

  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, viewport-fit=cover'
        />
        <link rel='icon' href='/favicon.ico' type='image/x-icon' />
      </Head>

      <Header config={config} header={header} breadcrumbs={breadcrumbs} />
      {children}
      <Footer config={config} footer={footer} />

      <MessengerChat pageId={config?.api?.facebookPageId} />
    </>
  )
}

export default Layout
