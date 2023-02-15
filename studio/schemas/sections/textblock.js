import { FiType } from 'react-icons/fi'

export default {
  title: 'Text',
  name: 'textblock',
  type: 'object',
  fields: [
    {
      title: 'Type',
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'Normal', value: 'normal' },
          { title: 'Fancy', value: 'fancy' },
        ],
      },
    },
    {
      title: 'Heading',
      name: 'heading',
      type: 'string',
      hidden: ({ parent }) => parent.type !== 'fancy',
    },
    {
      title: 'Content',
      name: 'content',
      type: 'texteditor',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      type: 'type',
    },
    prepare({ type }) {
      return {
        title: 'Text',
        subtitle: `Type: ${type}`,
        media: FiType,
      }
    },
  },
}
