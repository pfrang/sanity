import type {DefaultDocumentNodeResolver} from 'sanity/structure'
import DocumentsPane from 'sanity-plugin-documents-pane'
import { documentTypes } from '../schemaTypes/constants'

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  switch (schemaType) {
    case documentTypes.EVENT:
      return S.document().views([
        S.view.form(),
        S.view
          .component(DocumentsPane)
          .options({
            query: `*[_type == "event"]`,
            params: {id: `_id`},
            options: {perspective: 'previewDrafts'}
          })
          .title('Events'),
      ])
    default:
      return S.document().views([S.view.form()])
  }
}