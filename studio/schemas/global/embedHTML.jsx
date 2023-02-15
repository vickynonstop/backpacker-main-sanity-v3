import React from 'react'



const HTMLpreview = ({ value }) => (
  <div dangerouslySetInnerHTML={{ __html: value.html }} />
)

export default {
  title: 'Embed HTML',
  name: 'embedHTML',
  type: 'object',
  fields: [
    {
      title: 'HTML',
      description:
        'You usually want to avoid storing freeform HTML, but for embed codes it can be useful.',
      name: 'html',
      type: 'text',
      options: {
        language: 'html',
      },
    },
  ],
  preview: {
    select: {
      html: 'html',
    },
    component: HTMLpreview,
  },
}
