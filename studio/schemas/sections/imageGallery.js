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
          name: 'image',
          type: 'figure',
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      images: 'images',
    },
    prepare({ images }) {
      return {
        title: 'Image gallery',
        subtitle: `Number of images: ${images.length ?? 0}`,
        media: FiImage,
      }
    },
  },
}
