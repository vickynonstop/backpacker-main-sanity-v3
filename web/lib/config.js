export const sanityConfig = {
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2021-10-21',
  useCdn: process.env.NODE_ENV === 'production',
}
