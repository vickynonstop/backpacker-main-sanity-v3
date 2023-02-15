import { FiGlobe, FiLink } from 'react-icons/fi'

export default {
  title: 'Texteditor',
  name: 'texteditor',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'H5', value: 'h5' },
        { title: 'H6', value: 'h6' },
        { title: 'Quote', value: 'blockquote' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
          { title: 'Underline', value: 'underline' },
          { title: 'Strike', value: 'strike-through' },
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
                  // { type: 'travel' }
                ],
              },
            ],
          },
        ],
      },
    },
    { type: 'figure' },
    { type: 'embedHTML' },
  ],
}
