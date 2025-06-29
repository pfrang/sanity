import type { DefaultDocumentNodeResolver } from 'sanity/structure'
import DocumentsPane from 'sanity-plugin-documents-pane'
import { documentTypes } from '../schemaTypes/constants'

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType, documentId }) => {
  switch (schemaType) {
    case documentTypes.ASSOCIATION:
      return S.document().views([
        S.view.form(),
        S.view
          .component(DocumentsPane)
          .options({
            query: `*[_type == "event" && _id in *[_type == "association" && _id == $id][0].events[]._ref]`,
            params: { id: documentId }, // Fixed: use documentId instead of "_id"
            options: { perspective: 'previewDrafts' }
          })
          .title('Events'),
      ])
    default:
      return S.document().views([S.view.form()])
  }
}