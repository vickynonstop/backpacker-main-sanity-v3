export default {
  title: 'Image',
  name: 'figure',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    {
      title: 'Alternative text',
      description: 'Important for SEO and accessiblity. Not visible to users.',
      name: 'alt',
      type: 'string',
      options: {
        isHighlighted: true,
      },
    },
  ],
  preview: {
    select: {
      imageUrl: 'asset.url',
    },
    prepare({ imageUrl }) {
      return {
        title: 'Image',
        imageUrl,
      }
    },
  },
}
