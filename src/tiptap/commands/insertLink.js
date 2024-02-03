import { ReactRenderer } from '@tiptap/react'
import tippy from 'tippy.js'
import InsertLink from '@/components/InsertLink.jsx'
export const insertLink = () => {
  // return commands.setContent('', emitUpdate)
  const component = new ReactRenderer(InsertLink, {
          })

  tippy('body', {
      appendTo: () => document.body,
      content: component.element,
      showOnCreate: true,
      interactive: true,
      trigger: 'manual',
      placement: 'bottom-start'
    })
}
