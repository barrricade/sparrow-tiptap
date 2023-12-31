import { Document } from '@tiptap/extension-document'
// 功能：
// 1. 为文档添加标题：Document.configure({ documentTitle: true })
// 2. 为文档添加标题占位符
export const CustomDocument = Document.extend({
  addOptions () {
    return {
      placeholder: {
        title: '未命名标题'
      },
      documentTitle: false,
      content: null
    }
  },
  content () {
    let defaultContent = '(block)+'
    if (this.options.content) {
      defaultContent = this.options.content
    }
    if (this.options.documentTitle) {
      return `documentTitle ${defaultContent}`
    } else {
      return defaultContent
    }
  }
})
