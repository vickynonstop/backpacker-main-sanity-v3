import { FiLayout } from 'react-icons/fi'

export default {
  title: 'Hero',
  name: 'hero',
  type: 'object',
  fields: [
    {
      title: 'Type',
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'Frontpage', value: 'frontpage' },
          { title: 'Normal', value: 'normal' },
          { title: 'Normal w/ textbackground', value: 'normal_background' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Heading',
      name: 'heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Background',
      name: 'background',
      type: 'image',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Featured travels',
      name: 'featuredTravels',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'travel' }] }],
      hidden: ({ parent }) => parent.type !== 'frontpage',
    },
  ],
  preview: {
    select: {
      heading: 'heading',
      type: 'type',
    },
    prepare({ heading, type }) {
      return {
        title: 'Hero',
        subtitle: `${heading} | Type: ${type}`,
        media: FiLayout,
      }
    },
  },
}
