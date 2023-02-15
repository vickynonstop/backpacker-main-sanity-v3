import S from '@sanity/desk-tool/structure-builder'
import {
  FiArrowRightCircle,
  FiFileText,
  FiList,
  FiMap,
  FiMapPin,
  FiSettings,
} from 'react-icons/fi'
import Iframe from 'sanity-plugin-iframe-pane'
import pageHierarchy from './pageHierarchy'
import resolveProductionUrl from './resolveProductionUrl'

const hiddenDocTypes = (listItem) =>
  ![
    'page',
    'post',
    'destination',
    'travel',
    'settingsGeneral',
    'settingsHeader',
    'settingsFooter',
    'settingsApi',
  ].includes(listItem.getId())

export const getDefaultDocumentNode = ({ schemaType }) => {
  if (['page', 'post'].some((t) => schemaType === t)) {
    return S.document().views([
      S.view.form(),
      S.view
        .component(Iframe)
        .options({
          url: (doc) => resolveProductionUrl(doc),
        })
        .title('Preview'),
    ])
  }

  return S.document().views([S.view.form()])
}

export default () =>
  S.list()
    .title('Website')
    .items([
      S.listItem()
        .title('All pages')
        .icon(FiList)
        .child(S.documentTypeList('page').title('Pages')),

      S.divider(),

      pageHierarchy(),

      S.listItem()
        .title('Posts')
        .icon(FiFileText)
        .child(S.documentTypeList('post').title('Posts')),

      S.divider(),

      S.listItem()
        .title('Destinations')
        .icon(FiMap)
        .child(S.documentTypeList('destination').title('Destinations')),

      S.listItem()
        .title('Travels')
        .icon(FiMapPin)
        .child(S.documentTypeList('travel').title('Travels')),

      S.divider(),

      S.listItem()
        .title('Settings')
        .icon(FiSettings)
        .child(() =>
          S.list()
            .title('Settings')
            .items([
              S.listItem()
                .title('General')
                .icon(FiArrowRightCircle)
                .child(
                  S.document()
                    .title('General')
                    .schemaType('settingsGeneral')
                    .documentId('settingsGeneral')
                ),
              S.listItem()
                .title('Header')
                .icon(FiArrowRightCircle)
                .child(
                  S.document()
                    .title('Header')
                    .schemaType('settingsHeader')
                    .documentId('settingsHeader')
                ),
              S.listItem()
                .title('Footer')
                .icon(FiArrowRightCircle)
                .child(
                  S.document()
                    .title('Footer')
                    .schemaType('settingsFooter')
                    .documentId('settingsFooter')
                ),
              S.listItem()
                .title('Integrations')
                .icon(FiArrowRightCircle)
                .child(
                  S.document()
                    .title('Integrations')
                    .schemaType('settingsApi')
                    .documentId('settingsApi')
                ),
            ])
        ),

      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])
