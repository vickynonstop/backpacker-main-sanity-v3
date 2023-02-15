import { FiMap } from 'react-icons/fi'

export default {
  title: 'Travel calendar',
  name: 'travelCalendar',
  type: 'object',
  fields: [
    {
      title: 'Type',
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'All', value: 'all' },
          { title: 'One destination', value: 'destination' },
        ],
      },
    },
    {
      title: 'Heading',
      name: 'heading',
      type: 'string',
      hidden: ({ parent }) => parent.hideHeading,
    },
    {
      title: 'Hide heading',
      name: 'hideHeading',
      type: 'boolean',
    },
    {
      title: 'Show travels in progress',
      name: 'showInProgress',
      type: 'boolean',
    },
    {
      title: 'Destination',
      name: 'destination',
      type: 'reference',
      to: [{ type: 'destination' }],
      hidden: ({ parent }) => parent.type !== 'destination',
    },
  ],
  preview: {
    select: {
      heading: 'heading',
    },
    prepare({ heading }) {
      return {
        title: 'Travel calendar',
        subtitle: heading,
        media: FiMap,
      }
    },
  },
}
