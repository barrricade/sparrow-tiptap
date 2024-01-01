import { Extension } from '@tiptap/core'
import { Suggestion } from '@/tiptap/extensions/suggestion/javascript/suggestion.js'
import suggestion from './suggestion.js'
import { PluginKey } from '@tiptap/pm/state'

export const SlashMenu = Extension.create({
  name: 'slashMenu',

  addOptions () {
    return {
      suggestion1: {
        char: '/',
        command: ({ editor, range, props }) => {
          props.command({ editor, range })
        }
      },
      suggestion2: {
        char: '、',
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
        pluginKey: new PluginKey('slashMenu1'),
        editor: this.editor,
        ...this.options.suggestion1,
        ...suggestion(this.options.items)
      }),
      Suggestion({
        pluginKey: new PluginKey('slashMenu2'),
        editor: this.editor,
        ...this.options.suggestion2,
        ...suggestion(this.options.items)
      })
    ]
  }
})
