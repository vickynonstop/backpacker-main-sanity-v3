export default {
  name: 'settingsFooter',
  type: 'document',
  title: 'Settings - Footer',
  fields: [
    {
      title: 'Copyright',
      name: 'copyright',
      type: 'texteditorSimple',
    },
    {
      title: 'Contact options',
      name: 'contactOptions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              title: 'Title',
              name: 'title',
              type: 'string',
            },
            {
              title: 'Link',
              name: 'link',
              type: 'url',
              validation: (Rule) =>
                Rule.uri({
                  scheme: ['http', 'https', 'mailto', 'tel'],
                  allowRelative: true,
                }),
            },
            {
              title: 'Icon',
              name: 'icon',
              type: 'image',
            },
          ],
        },
      ],
    },
  ],
}
