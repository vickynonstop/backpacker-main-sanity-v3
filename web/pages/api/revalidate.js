import { isValidRequest } from '@sanity/webhook'

const secret = process.env.SANITY_WEBHOOK_SECRET

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(401).json({ message: 'Must be a POST request' })
  }

  if (!isValidRequest(req, secret)) {
    return res.status(403).json({ message: 'Invalid signature' })
  }

  try {
    const {
      body: { slug },
    } = req

    await res.unstable_revalidate(slug)
    return res.json({ message: `Revalidated "${slug}"` })
  } catch (err) {
    return res.status(500).send({ message: 'Error revalidating' })
  }
}
