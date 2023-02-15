import { FiGrid } from 'react-icons/fi'

export default {
  title: 'Articles',
  name: 'articles',
  type: 'object',
  fields: [
    {
      title: 'Type',
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'All', value: 'all' },
          { title: 'Newest', value: 'newest' },
          { title: 'Selected', value: 'selected' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Heading',
      name: 'heading',
      type: 'string',
      hidden: ({ parent }) => parent.type !== 'newest',
    },
    {
      title: 'Selected',
      name: 'selected',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      hidden: ({ parent }) => parent.type !== 'selected',
    },
  ],
  preview: {
    select: {
      type: 'type',
    },
    prepare({ type }) {
      return {
        title: 'Articles',
        subtitle: `Type: ${type}`,
        media: FiGrid,
      }
    },
  },
}
