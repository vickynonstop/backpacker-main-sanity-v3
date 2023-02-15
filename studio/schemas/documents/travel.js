import { FiFileText, FiCalendar } from 'react-icons/fi'
import slugify from 'slugify'
// import sanityClient from 'part:@sanity/base/client'
import GetQondorTravels from '../../lib/getQondorTravels'

function generateSlug(input) {
  const parentId = input.split('|')[0]
  const baseSlug = `/${slugify(input.split('|')[1], { lower: true, strict: true })}`

  if (parentId === 'none') return baseSlug

  // const client = sanityClient.withConfig({ apiVersion: '2021-10-21' })
  const query = `*[_id == $parentId && defined(connectedPage)][0].connectedPage->slug.current`

  return client.fetch(query, { parentId }).then((result) => {
    if (!result) return baseSlug
    return result.replace('/destinasjoner', '') + baseSlug
  })
}

export default {
  name: 'travel',
  type: 'document',
  title: 'Travel',
  icon: FiFileText,
  initialValue: {
    includeInSitemap: true,
    metaPageType: 'article',
  },
  groups: [
    { name: 'details', title: 'Details' },
    { name: 'travelinfo', title: 'Travel info' },
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
      name: 'heroHeading',
      type: 'string',
      title: 'Hero heading',
      group: 'details',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'heroBackground',
      type: 'image',
      title: 'Hero background',
      group: 'details',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: (doc) =>
          `${doc.destination ? doc.destination._ref : 'none'}|${doc.title}`,
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
      hidden: ({ parent }) => !parent.destination,
    },
    {
      name: 'destination',
      type: 'reference',
      to: [{ type: 'destination' }],
      title: 'Destination',
      group: 'travelinfo',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'dates',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'qondorProjectId',
              type: 'string',
              title: 'Qondor Connection',
              inputComponent: GetQondorTravels,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'dateFrom',
              type: 'date',
              title: 'Date from',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'dateTo',
              type: 'date',
              title: 'Date to',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'priceFrom',
              type: 'number',
              title: 'Price from',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'numberOfParticipants',
              type: 'number',
              title: 'Number of participants',
              validation: (Rule) => Rule.required(),
            },
            // {
            //   name: 'inProgress',
            //   type: 'boolean',
            //   title: 'In progress',
            // },
          ],
          preview: {
            select: {
              dateFrom: 'dateFrom',
              dateTo: 'dateTo',
              numberOfParticipants: 'numberOfParticipants',
            },
            prepare: ({ dateFrom, dateTo, numberOfParticipants }) => {
              return {
                title: `${dateFrom} - ${dateTo}`,
                subtitle: `(${numberOfParticipants} participants)`,
                media: FiCalendar,
              }
            },
          },
        },
      ],
      title: 'Dates',
      group: 'travelinfo',
    },
    {
      name: 'intro',
      type: 'texteditor',
      title: 'Intro',
      group: 'travelinfo',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        { type: 'textblock' },
        { type: 'textColumns' },
        { type: 'imageSingle' },
        { type: 'imageGallery' },
        { type: 'travelProgram' },
        { type: 'ctaCard' },
        { type: 'faq' },
        { type: 'quote' },
        { type: 'articles' },
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
