import Link from '@tiptap/extension-link'
// import tippy from 'tippy.js'
// import { DOMSerializer } from 'prosemirror-model'

export const LinkExtension = Link.extend({
    addOptions () {
      return {
        ...this.parent?.(),
        validate: (href) => /^https?:\/\//.test(href)
      }
    },
    addCommands () {
      return {
        // insertLink: (component) => ({ view, tr, commands, editor, dispatch }) => {
        //   const { $cursor } = view.state.selection
        //   const currentNode = $cursor?.parent
        //   const serializer = DOMSerializer.fromSchema(currentNode.type.schema)
        //   const nodes = serializer.serializeNode(currentNode)
        //   console.log(editor.state)
        //   const dom = view.dom.querySelector('.data-placeholder')
        //   console.log(nodes.getBoundingClientRect(), 'mpde')

        //   if (dispatch) {
        //     tippy('body', {
        //     getReferenceClientRect: () => dom.getBoundingClientRect(),
        //     appendTo: () => document.body,
        //     content: '<div>123333333333333333333333<div/>',
        //     allowHTML: true,
        //     showOnCreate: true,
        //     interactive: true,
        //     trigger: 'manual',
        //     placement: 'bottom-start'
        //   })
        //     //   tippy(nodes, {
        //     //     // appendTo: () => document.body,
        //     //     // getReferenceClientRect: nodes?.getBoundingClientRect(),
        //     //     content: '<div class="bg-black w-10 h-10">asdasdasdasdasdasdasdasdasdasdasdasd</div>',
        //     //     showOnCreate: true,
        //     //     allowHTML: true,
        //     //     // interactive: true,
        //     //     trigger: 'manual',
        //     //     placement: 'bottom-start'
        //     // })
        //     // return commands.insertContent({
        //     //   type: this.name,
        //     //   attrs: opts,
        //     //   content: []
        //     // })
        //   }
        //   return true
        // }
      }
    }
  })
