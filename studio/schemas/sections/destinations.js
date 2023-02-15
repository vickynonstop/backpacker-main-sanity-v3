import { FiMapPin } from 'react-icons/fi'

export default {
  title: 'Destinations',
  name: 'destinations',
  type: 'object',
  fields: [
    {
      title: 'Type',
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'All', value: 'all' },
          { title: 'Selected', value: 'selected' },
        ],
      },
    },
    {
      title: 'Heading',
      name: 'heading',
      type: 'string',
    },
    {
      title: 'Selected',
      name: 'selected',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'destination' }] }],
      hidden: ({ parent }) => parent.type !== 'selected',
    },
  ],
  preview: {
    select: {
      type: 'type',
    },
    prepare({ type }) {
      return {
        title: 'Destinations',
        subtitle: `Type: ${type}`,
        media: FiMapPin,
      }
    },
  },
}
