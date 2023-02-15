import { FiImage } from 'react-icons/fi'

export default {
  title: 'Image gallery',
  name: 'imageGallery',
  type: 'object',
  fields: [
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [
        {
          title: 'Image',
          name: 'figureImage',
          type: 'figure',
        },
      ],
      validation: Rule => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      images: 'images',
    },
    prepare(props) {
      return {
        title: 'Image gallery',
        subtitle: `Number of images: ${props.images.length ?? 0}`,
        media: FiImage,
      }
    },
  },
}
