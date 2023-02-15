import T from '@sanity/base/initial-value-template-builder'

export default [
  T.template({
    id: 'page-child',
    title: 'New child page',
    schemaType: 'page',
    parameters: [{ name: `parentId`, title: `Parent ID`, type: `string` }],
    value: ({ parentId }) => ({
      parent: { _type: 'reference', _ref: parentId },
      topPage: false,
    }),
  }),
  ...T.defaults(),
]
