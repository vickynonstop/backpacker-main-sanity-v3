import { FiFileText } from 'react-icons/fi'
import slugify from 'slugify'

function generateSlug(input) {
  return `/aktuelt/${slugify(input, { lower: true, strict: true })}`
}

export default {
  name: 'post',
  type: 'document',
  title: 'Post',
  icon: FiFileText,
  initialValue: {
    includeInSitemap: true,
  },
  groups: [
    { name: 'details', title: 'Details' },
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      group: 'details',
      validation: (Rule) => Rule.required().error('Linked page is required'),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: (doc) => doc.title,
        slugify: (input) => generateSlug(input),
      },
      group: 'details',
      validation: (Rule) =>
        Rule.required().custom(({ current }) => {
          if (typeof current === 'undefined') return true

          if (current) {
            if (!current.startsWith('/aktuelt')) {
              return `Slug must begin with "/aktuelt". Click "Generate" to reset.`
            }

            if (current === '/' || current === '/aktuelt') {
              return `Slug cannot be empty`
            }

            if (current.endsWith('/')) {
              return `Slug cannot end with "/"`
            }
          }

          return true
        }),
    },
    {
      name: 'image',
      type: 'figure',
      title: 'Image',
      group: 'content',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        { type: 'textblock' },
        { type: 'imageSingle' },
        { type: 'imageGallery' },
        { type: 'quote' },
        { type: 'newsletter' },
      ],
      group: 'content',
    },
    {
      name: 'metaTitle',
      type: 'string',
      title: 'Meta title',
      group: 'seo',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'metaDescription',
      type: 'text',
      title: 'Meta description',
      description: 'This description populates meta-tags on the webpage',
      group: 'seo',
    },
    {
      name: 'includeInSitemap',
      type: 'boolean',
      title: 'Include page in sitemap',
      description: 'For search engines. Will be added to /sitemap.xml',
      group: 'seo',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}
