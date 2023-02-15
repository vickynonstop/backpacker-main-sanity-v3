import BaseApp from 'next/app'
import { config } from '../lib/queries'
import { sanityClient } from '../lib/sanity'

// Import styles
import '../styles/global.scss'
import '../styles/shared.scss'
import '../styles/variables.scss'

class App extends BaseApp {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (ctx.res.statusCode === 404) {
      ctx.res.writeHead(301, { Location: '/' })
      ctx.res.end()
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return sanityClient.fetch(config).then((config = {}) => {
      if (config?.settings) pageProps.config = config.settings
      if (config?.header) pageProps.header = config.header
      if (config?.footer) pageProps.footer = config.footer
      if (config?.api) pageProps.api = config.api

      return { pageProps }
    })
  }

  render() {
    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }
}

export default App
