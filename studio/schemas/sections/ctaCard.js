import { FiMousePointer } from 'react-icons/fi'

export default {
  title: 'CTA Card',
  name: 'ctaCard',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Include logo',
      name: 'includeLogo',
      type: 'boolean',
    },
    {
      title: 'CTAs',
      name: 'ctas',
      type: 'array',
      of: [{ type: 'cta' }],
    },
    {
      title: 'Background',
      name: 'background',
      type: 'image',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: 'CTA Card',
        subtitle: title,
        media: FiMousePointer,
      }
    },
  },
}
