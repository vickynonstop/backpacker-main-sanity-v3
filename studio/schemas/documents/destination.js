import { FiMapPin } from 'react-icons/fi'

export default {
  name: 'destination',
  type: 'document',
  title: 'Destination',
  icon: FiMapPin,
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Image',
      name: 'image',
      type: 'figure',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Connected page',
      name: 'connectedPage',
      type: 'reference',
      to: [{ type: 'page' }],
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      name: 'name',
    },
    prepare: ({ name }) => ({
     
      title: name,

    }),
  },
}
