import { Node, mergeAttributes } from '@tiptap/core'
import { DocumentTitleComponent } from '../components/DocumentTitle.jsx'
import { ReactNodeViewRenderer } from '@tiptap/react'

export const DocumentTitle = Node.create({
    name: 'documentTitle',
    group: 'document-title',
    content: 'text*',
    marks: '',
    addOptions () {
      return {
        placeholder: '请输入标题'
      }
    },
    addAttributes () {
      return {
        placeholder: {
          default: this.options.placeholder
        },
        icon: {
          default: '',
          parseHTML: (element) => element.getAttribute('document-title-icon'),
          renderHTML: (attributes) => ({ 'document-title-icon': attributes.icon })
        }
      }
    },
    parseHTML () {
      return [
        {
          tag: 'div[document-title]'
        }
      ]
    },
    renderHTML ({ HTMLAttributes }) {
      return [
        'div',
        mergeAttributes(HTMLAttributes, { 'document-title': true, class: 'document_title' }),
        ['div', { class: 'icon' }, ''],
        ['h1', {}, 0]
      ]
    },
    addNodeView () {
      return ReactNodeViewRenderer(DocumentTitleComponent)
    }
  })
