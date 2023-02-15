import S from '@sanity/desk-tool/structure-builder'
import documentStore from 'part:@sanity/base/datastore/document'
import { FiArrowRightCircle, FiEdit, FiFileText, FiGrid, FiPlus } from 'react-icons/fi'
import { map } from 'rxjs/operators'
import Iframe from 'sanity-plugin-iframe-pane'
import resolveProductionUrl from './resolveProductionUrl'

function getChildPages(parentName, parentRef) {
  return documentStore
    .listenQuery(
      `*[_type == "page" && parent._ref == $parentRef && !(_id in path("drafts.**"))]`,
      {
        parentRef,
      }
    )
    .pipe(
      map((pages) =>
        S.list()
          .title(parentName)
          .menuItems([
            S.menuItem()
              .title('Add page')
              .icon(FiPlus)
              .intent({
                type: 'create',
                params: [
                  { type: 'page', template: 'page-child' },
                  { parentId: parentRef },
                ],
              }),
          ])
          .initialValueTemplates([
            S.initialValueTemplateItem('page-child', {
              parentId: parentRef,
            }),
          ])
          .items([
            S.listItem()
              .title('Edit this page')
              .icon(FiEdit)
              .child(
                S.document()
                  .id(parentRef)
                  .schemaType('page')
                  .views([
                    S.view.form(),
                    S.view
                      .component(Iframe)
                      .options({
                        url: (doc) => resolveProductionUrl(doc),
                      })
                      .title('Preview'),
                  ])
              ),

            ...pages.map((page) =>
              S.listItem()
                .title(page.title)
                .icon(FiArrowRightCircle)
                .child(getChildPages(page.title, page._id))
            ),
          ])
      )
    )
}

export default function pageHierarchy() {
  const getTopPages = `*[_type == "page" && !defined(parent) && !(_id in path("drafts.**"))] | order(topPage desc)`

  return S.listItem()
    .title('Pages')
    .icon(FiGrid)
    .child(() =>
      documentStore.listenQuery(getTopPages).pipe(
        map((pages) =>
          S.list()
            .title('Pages')
            .menuItems([
              S.menuItem()
                .title('Add page')
                .icon(FiPlus)
                .intent({
                  type: 'create',
                  params: [{ type: 'page' }],
                }),
            ])
            .items([
              ...pages.map((page) =>
                page.topPage
                  ? S.listItem()
                      .title(page.title)
                      .id(page._id)
                      .icon(FiFileText)
                      .child(
                        S.document()
                          .id(page._id)
                          .schemaType('page')
                          .views([
                            S.view.form(),
                            S.view
                              .component(Iframe)
                              .options({
                                url: (doc) => resolveProductionUrl(doc),
                              })
                              .title('Preview'),
                          ])
                      )
                  : S.listItem()
                      .title(page.title)
                      .id(page._id)
                      .icon(FiArrowRightCircle)
                      .child(getChildPages(page.title, page._id))
              ),
            ])
        )
      )
    )
}
