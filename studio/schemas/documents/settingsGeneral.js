export default {
  name: 'settingsGeneral',
  type: 'document',
  title: 'Settings - General',
  fields: [
    {
      title: 'Site title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'URL',
      name: 'url',
      type: 'url',
    },
    {
      title: 'Frontpage',
      name: 'frontpage',
      type: 'reference',
      to: { type: 'page' },
    },
    {
      title: 'Open Graph Image',
      name: 'openGraphImage',
      type: 'image',
      description: 'Image for sharing previews on Facebook, Twitter etc.',
    },
    {
      title: 'Logo',
      name: 'logo',
      type: 'image',
    },
    {
      title: 'Logo light',
      name: 'logoLight',
      type: 'image',
    },
    {
      title: 'Phone number',
      name: 'phoneNumber',
      type: 'string',
    },
    {
      title: 'Email',
      name: 'email',
      type: 'string',
    },
  ],
}
