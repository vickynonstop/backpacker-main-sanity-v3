import { FiGlobe, FiLink } from 'react-icons/fi'

export default {
  title: 'Simple texteditor',
  name: 'texteditorSimple',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [],
      lists: [],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            blockEditor: {
              icon: FiGlobe,
            },
            fields: [
              {
                name: 'url',
                type: 'url',
                validation: (Rule) =>
                  Rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel'],
                    allowRelative: true,
                  }),
              },
            ],
          },
          {
            name: 'internalLink',
            type: 'object',
            title: 'Internal link',
            blockEditor: {
              icon: FiLink,
            },
            fields: [
              {
                name: 'reference',
                type: 'reference',
                to: [
                  { type: 'page' },
                  { type: 'post' },
                  //  { type: 'travel' }
                ],
              },
            ],
          },
        ],
      },
    },
    {
      type: 'embedHTML',
    },
  ],
}
