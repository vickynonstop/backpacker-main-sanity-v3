import { FiColumns } from 'react-icons/fi'

export default {
  title: 'Text-columns',
  name: 'textColumns',
  type: 'object',
  fields: [
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              title: 'Title',
              name: 'title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              title: 'Text',
              name: 'text',
              type: 'texteditor',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'title',
            },
            prepare({ title }) {
              return {
                title,
              }
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      content: 'content',
    },
    prepare({ content }) {
      return {
        title: 'Text-columns',
        subtitle: `Number of sections: ${content.length ?? 0}`,
        media: FiColumns,
      }
    },
  },
}
