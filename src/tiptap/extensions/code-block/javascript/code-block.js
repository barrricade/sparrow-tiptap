import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'https://esm.sh/lowlight@3'
import { CodeBlockComponent } from '../components/CodeBlock.jsx'
import { ReactNodeViewRenderer } from '@tiptap/react'
const lowlight = createLowlight(common)
const languages = lowlight.listLanguages()
export const CodeBlockLowlightExtension = CodeBlockLowlight.extend({
  addOptions () {
    return {
      ...this.parent,
      lowlight,
      languageClassPrefix: 'language-',
      defaultLanguage: 'plaintext'
    }
  },
  addNodeView () {
    return ReactNodeViewRenderer((props) => { return CodeBlockComponent({ languages, ...props }) })
  }
})
