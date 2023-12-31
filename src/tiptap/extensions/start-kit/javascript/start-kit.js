import { Extension } from '@tiptap/core'
// Extensions
import { SlashMenu } from '@/tiptap/extensions/slash-menu/javascript/slash-menu.js'
import { Dropcursor } from '@tiptap/extension-dropcursor'
import { Gapcursor } from '@tiptap/extension-gapcursor'
import { History } from '@tiptap/extension-history'
import { Placeholder } from '@tiptap/extension-placeholder'
// Mark
import { Bold } from '@tiptap/extension-bold'
import { Code } from '@tiptap/extension-code'
import { Italic } from '@tiptap/extension-italic'
import { Strike } from '@tiptap/extension-strike'
// Node
import { CustomDocument } from '@/tiptap/extensions/document/javascript/document.js'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'
import { Heading } from '@tiptap/extension-heading'
import { HardBreak } from '@tiptap/extension-hard-break'
import { HorizontalRule } from '@tiptap/extension-horizontal-rule'
import { OrderedList } from '@tiptap/extension-ordered-list'
import { ListItem } from '@tiptap/extension-list-item'
import { BulletList } from '@tiptap/extension-bullet-list'
import { DocumentTitle } from '@/tiptap/extensions/document-title/javascript/document-title.js'

export const StarterKit = Extension.create({
  name: 'starterKit',

  addExtensions () {
    const extensions = []
    // const documentContent = '(block)+'
    // TODO: 为文档添加标题，分栏，高亮块
    if (this.options.documentTitle !== false) {
      extensions.push(DocumentTitle.configure(this.options?.documentTitle))
    }
    if (this.options.document !== false) {
      extensions.push(CustomDocument.configure({ content: 'block+', ...this.options?.document }))
    }

    if (this.options.heading !== false) {
      extensions.push(Heading.configure({ levels: [1, 2, 3, 4, 5, 6, 7], ...this.options?.heading }))
    }

    if (this.options.text !== false) {
      extensions.push(Text.configure(this.options?.text))
    }
    if (this.options.paragraph !== false) {
      extensions.push(Paragraph.configure(this.options?.paragraph))
    }
    if (this.options.hardBreak !== false) {
      extensions.push(HardBreak.configure(this.options?.hardBreak))
    }
    if (this.options.horizontalRule !== false) {
      extensions.push(HorizontalRule.configure(this.options?.horizontalRule))
    }
    if (this.options.slashMenu !== false) {
      extensions.push(SlashMenu.configure(this.options?.slashMenu))
    }
    if (this.options.code !== false) {
      extensions.push(Code.configure(this.options?.code))
    }
    if (this.options.italic !== false) {
      extensions.push(Italic.configure(this.options?.italic))
    }
    if (this.options.strike !== false) {
      extensions.push(Strike.configure(this.options?.strike))
    }
    if (this.options.bold !== false) {
      extensions.push(Bold.configure(this.options?.bold))
    }
    if (this.options.dropcursor !== false) {
      extensions.push(Dropcursor.configure(this.options?.dropcursor))
    }

    if (this.options.gapcursor !== false) {
      extensions.push(Gapcursor.configure(this.options?.gapcursor))
    }
    if (this.options.history !== false) {
      extensions.push(History.configure(this.options?.history))
    }
    if (this.options.orderedList !== false) {
      extensions.push(OrderedList.configure(this.options?.orderedList))
    }
    if (this.options.listItem !== false) {
      extensions.push(ListItem.configure(this.options?.listItem))
    }
    if (this.options.bubbleList !== false) {
      extensions.push(BulletList.configure(this.options?.bubbleList))
    }
    if (this.options.placeholder !== false) {
      extensions.push(Placeholder.configure({ // Use a placeholder:
        showOnlyCurrent: false,
        // Use different placeholders depending on the node type:
        placeholder: ({ editor, node, hasAnchor, pos }) => {
          if (node.type.name === 'documentTitle') {
            return node.attrs.placeholder || 'What’s the title?'
          }
          const { empty } = editor.state.selection
          const isEmpty = empty
          if (hasAnchor && isEmpty && node.type.name === 'paragraph') {
            return '输入"/"快速插入'
          }
        },
        ...this.options?.bubbleList
      }))
    }
    return extensions
  }
})
