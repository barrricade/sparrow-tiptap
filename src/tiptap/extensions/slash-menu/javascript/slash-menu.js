import { Extension } from '@tiptap/core'
import Suggestion from '@tiptap/suggestion'
import suggestion from './suggestion.js'

export const SlashMenu = Extension.create({
  name: 'slashMenu',

  addOptions () {
    return {
      suggestion: {
        char: '/',
        command: ({ editor, range, props }) => {
          props.command({ editor, range })
        }
      },
      items: null
    }
  },

  addProseMirrorPlugins () {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
        ...suggestion(this.options.items)
      })
    ]
  }
})
