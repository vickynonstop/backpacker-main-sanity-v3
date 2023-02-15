const dotenv = require('dotenv')
dotenv.config()

// Security header
const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
]

// Export next settings
module.exports = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SANITY_API_TOKEN: process.env.SANITY_API_TOKEN,
    SANITY_PREVIEW_SECRET: process.env.SANITY_PREVIEW_SECRET,
    SANITY_WEBHOOK_SECRET: process.env.SANITY_WEBHOOK_SECRET,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['cdn.sanity.io'],
  },
  async headers() {
    return [
      {
        source: '/(:*)',
        headers: securityHeaders,
      },
    ]
  },
}
