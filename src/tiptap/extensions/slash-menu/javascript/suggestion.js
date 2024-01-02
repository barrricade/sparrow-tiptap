import { ReactRenderer } from '@tiptap/react'
import tippy from 'tippy.js'
import React from 'react'
import SvgIcon from '@/components/SvgIcon'
import SlashMenu from '../components/SlashMenu.jsx'
const icon = (name) => React.createElement(SvgIcon, { name, className: 'slash-menu__icon' })

function getItem (label, key, icon, command, children, type) {
  return {
    key,
    icon,
    command,
    label,
    children,
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
  if (key === 'orderedList') {
    return ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleOrderedList()
          .run()
    }
  }
  if (key === 'bubbleList') {
    return ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleBulletList()
        .run()
    }
  }
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
const getItems = (items) => {
  if (items) {
    return items.map((item) => {
      return getItem(item.label, item.key, item.icon, itemCommand(item.key), item.type)
    })
  }
  return [
    getItem('基础', 'grp', null, null, [
      getItem('文本', 'text', icon('text'), itemCommand('text')),
      getItem('一级标题', 'h1', icon('h1'), itemCommand('h1')),
      getItem('二级标题', 'h2', icon('h2'), itemCommand('h2')),
      getItem('三级标题', 'h3', icon('h3'), itemCommand('h3')),
      getItem('多级标题', 'hn', icon('hn'), null, [
        getItem('四级标题', 'h4', icon('h4'), itemCommand('h4')),
        getItem('五级标题', 'h5', icon('h5'), itemCommand('h5')),
        getItem('六级标题', 'h6', icon('h6'), itemCommand('h6')),
        getItem('七级标题', 'h7', icon('h7'), itemCommand('h7'))
      ], 'submenu'),
      getItem('有序列表', 'orderedList', icon('orderedList'), itemCommand('orderedList')),
      getItem('无序列表', 'bubbleList', icon('bubbleList'), itemCommand('bubbleList'))
    ], 'group')
  ]
}
export default (items) => {
  return {
    items: ({ query }) => {
      return getItems(items)
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
}
