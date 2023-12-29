import { ReactRenderer } from '@tiptap/react'
import tippy from 'tippy.js'

import SlashMenu from '../components/SlashMenu.jsx'

function getItem (label, key, icon, command, type) {
  return {
    key,
    icon,
    command,
    label,
    type
  }
}
const itemCommand = (key) => {
    if (key === 'text') {
      return ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setParagraph()
            .run()
        }
    }
    // if (key == 'blockquote') {
    //     if (level) {
    //         editor.chain().focus().toggleHeading({ level }).run()
    //     }
    //     editor.chain().focus().setBlockquote().run()
    //     return
    // }

    const match = key.match(/^h(\d)$/)
    if (match) {
      return ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setHeading({ level: parseInt(match[1]) })
            .run()
      }
    }
}
export default {
  items: ({ query }) => {
    return [getItem('基础', 'grp', null, null, 'group'),
      getItem('文本', 'text', 'text', itemCommand('text'), null),
      getItem('一级标题', 'h1', 'h1', itemCommand('h1'), null),
      getItem('二级标题', 'h2', 'h2', itemCommand('h2'), null),
      getItem('三级标题', 'h3', 'h3', itemCommand('h3'), null),
      getItem('四级标题', 'h4', 'h4', itemCommand('h4'), null),
      getItem('五级标题', 'h5', 'h5', itemCommand('h5'), null),
      getItem('六级标题', 'h6', 'h6', itemCommand('h6'), null),
      getItem('七级标题', 'h7', 'h7', itemCommand('h7'), null)
    ]
  },

  render: () => {
    let component
    let popup

    return {
      onStart: props => {
        component = new ReactRenderer(SlashMenu, {
          props,
          editor: props.editor
        })

        if (!props.clientRect) {
          return
        }

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start'
        })
      },

      onUpdate (props) {
        component.updateProps(props)

        if (!props.clientRect) {
          return
        }

        popup[0].setProps({
          getReferenceClientRect: props.clientRect
        })
      },

      onKeyDown (props) {
        if (props.event.key === 'Escape') {
          popup[0].hide()

          return true
        }

        return component.ref?.onKeyDown(props)
      },

      onExit () {
        popup[0].destroy()
        component.destroy()
      }
    }
  }
}
