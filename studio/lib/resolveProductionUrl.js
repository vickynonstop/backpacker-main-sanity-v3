const previewSecret = '7e921b0be58103fe7cf18276a124c68abfd9cdb541c5d950d3797778419b32a4'

const remoteUrl = `https://backpacker.no`
const localUrl = `http://localhost:3000`

export default function resolveProductionUrl(document) {
  if (
    [
      'settingsGeneral',
      'settingsHeader',
      'settingsFooter',
      'settingsApi',
      'destination',
    ].some((type) => document._type === type)
  ) {
    return null
  }

  const baseUrl = window.location.hostname === 'localhost' ? localUrl : remoteUrl
  const slug = document.slug.current

  return `${baseUrl}/api/preview?secret=${previewSecret}&slug=${slug}`
}
