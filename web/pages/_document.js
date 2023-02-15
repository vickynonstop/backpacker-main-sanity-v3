import Document, { Head, Html, Main, NextScript } from 'next/document'
import { config } from '../lib/queries'
import { sanityClient } from '../lib/sanity'

export default class NextDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return sanityClient.fetch(config).then((config) => {
      return {
        ...initialProps,
        googleTagmanagerId: config?.settings?.api?.googleTagmanagerId || null,
      }
    })
  }

  render() {
    const { googleTagmanagerId = null } = this.props

    return (
      <Html lang='nb-NO'>
        <Head>
          {googleTagmanagerId && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${googleTagmanagerId}');
                `,
              }}
            />
          )}
        </Head>
        <body>
          {googleTagmanagerId && (
            <noscript
              dangerouslySetInnerHTML={{
                __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${googleTagmanagerId}"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
              }}></noscript>
          )}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
