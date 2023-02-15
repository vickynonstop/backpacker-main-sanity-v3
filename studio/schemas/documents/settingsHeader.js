export default {
  name: 'settingsHeader',
  type: 'document',
  title: 'Settings - Header',
  fieldsets: [
    {
      title: 'Button',
      name: 'button',
    },
  ],
  fields: [
    {
      title: 'Logo',
      name: 'logo',
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          options: {
            isHighlighted: false,
          },
        },
      ],
    },
    {
      title: 'Button text',
      name: 'buttonText',
      type: 'string',
      fieldsets: 'button',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Button link',
      name: 'buttonLink',
      type: 'reference',
      to: [{ type: 'page' }],
      fieldsets: 'button',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Navigation',
      name: 'navigation',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'page' }, { type: 'post' }, { type: 'destination' }],
        },
      ],
      validation: (Rule) => Rule.unique().error("You can't add the same page twice"),
    },
  ],
}
