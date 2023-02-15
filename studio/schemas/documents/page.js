import { FiFileText } from 'react-icons/fi'
import slugify from 'slugify'
// import sanityClient from 'part:@sanity/base/client'

function generateSlug(input) {
  const parentId = input.split('|')[0]
  const baseSlug = `/${slugify(input.split('|')[1], { lower: true, strict: true })}`

  if (parentId === 'none') return baseSlug

  // const client = sanityClient.withConfig({ apiVersion: '2021-10-21' })
  const query = `*[_id == $parentId && defined(slug.current)][0].slug.current`

  return client.fetch(query, { parentId }).then((result) => {
    if (!result) return baseSlug
    return result + baseSlug
  })
}

export default {
  name: 'page',
  type: 'document',
  title: 'Page',
  icon: FiFileText,
  initialValue: {
    includeInSitemap: true,
    topPage: false,
    metaPageType: 'website',
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
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'topPage',
      type: 'boolean',
      title: 'Top page',
      description: 'This will set the page as a top page and disable child-pages',
      group: 'details',
      hidden: ({ document }) => document.parent || document.category,
    },
    {
      name: 'parent',
      type: 'reference',
      title: 'Parent page',
      to: [{ type: 'page' }],
      options: {
        filter: 'topPage != true',
      },
      group: 'details',
      hidden: ({ document }) => document.topPage,
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description:
        "Note that child-pages won't automatically inherit the updated slug of their parent",
      options: {
        source: (doc) => `${doc.parent ? doc.parent._ref : 'none'}|${doc.title}`,
        slugify: (input) => generateSlug(input),
      },
      group: 'details',
      validation: (Rule) =>
        Rule.required().custom(({ current }) => {
          if (typeof current === 'undefined') return true

          if (current) {
            if (!current.startsWith('/')) {
              return `Slug must begin with "/". Click "Generate" to reset.`
            }

            if (current.endsWith('/') && current !== '/') {
              return `Slug cannot end with "/"`
            }
          }

          return true
        }),
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        { type: 'hero' },
        { type: 'textblock' },
        { type: 'textColumns' },
        { type: 'imageSingle' },
        { type: 'imageGallery' },
        { type: 'faq' },
        { type: 'ctaCard' },
        { type: 'quote' },
        { type: 'instagram' },
        { type: 'newsletter' },
        { type: 'travelCalendar' },
        { type: 'articles' },
        { type: 'destinations' },
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
      name: 'openGraphImage',
      type: 'image',
      title: 'Open Graph Image',
      description: 'Image for sharing previews on Facebook, Twitter etc.',
      group: 'seo',
    },
    {
      name: 'metaPageType',
      type: 'string',
      title: 'Meta page type',
      options: {
        list: [
          { title: 'Article', value: 'article' },
          { title: 'Website', value: 'website' },
        ],
      },
      group: 'seo',
      validation: (Rule) => Rule.required(),
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
      subtitle: 'parent.title',
    },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle: subtitle ? `— ${subtitle}` : '',
    }),
  },
}
