import { FiInstagram } from 'react-icons/fi'

export default {
  title: 'Instagram',
  name: 'instagram',
  type: 'object',
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      heading: 'heading',
    },
    prepare({ heading }) {
      return {
        title: 'Instagram',
        subtitle: heading,
        media: FiInstagram,
      }
    },
  },
}
