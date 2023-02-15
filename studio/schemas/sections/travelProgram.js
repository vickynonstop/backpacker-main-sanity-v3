import { FiArrowRight, FiMap } from 'react-icons/fi'

export default {
  title: 'Travel program',
  name: 'travelProgram',
  type: 'object',
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'General information',
      name: 'generalInformation',
      type: 'texteditor',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Program',
      name: 'program',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              title: 'Description',
              name: 'description',
              type: 'text',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              description: 'description',
            },
            prepare({ description }) {
              return {
                title: description,
                media: FiArrowRight,
              }
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      heading: 'heading',
    },
    prepare({ heading }) {
      return {
        title: 'Travel program',
        subtitle: heading,
        media: FiMap,
      }
    },
  },
}
