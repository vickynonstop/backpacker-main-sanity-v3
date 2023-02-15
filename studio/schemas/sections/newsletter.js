import { FiInbox } from 'react-icons/fi'

export default {
  title: 'Newsletter',
  name: 'newsletter',
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
        title: 'Newsletter',
        subtitle: heading,
        media: FiInbox,
      }
    },
  },
}
