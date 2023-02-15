import React from 'react'

function EmbedHTML({ value }) {
  const { html } = value
  if (!html) return undefined

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export default EmbedHTML
