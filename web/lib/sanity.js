import createImageUrlBuilder from '@sanity/image-url'
import { createClient, createPreviewSubscriptionHook } from 'next-sanity'
import { sanityConfig } from './config'

export const urlFor = (source) =>
  createImageUrlBuilder(sanityConfig).image(source).auto('format').fit('max')

export const sanityClient = createClient(sanityConfig)

export const previewClient = createClient({
  ...sanityConfig,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export const usePreviewSubscription = createPreviewSubscriptionHook(sanityConfig)
export const getClient = (usePreview) => (usePreview ? previewClient : sanityClient)
