import { FiThumbsUp } from 'react-icons/fi'

export default {
  title: 'Quote',
  name: 'quote',
  type: 'object',
  fields: [
    {
      title: 'Content',
      name: 'content',
      type: 'string',
    },
  ],
  preview: {
    select: {
      content: 'content',
    },
    prepare({ content }) {
      return {
        title: 'Quote',
        subtitle: content,
        media: FiThumbsUp,
      }
    },
  },
}
