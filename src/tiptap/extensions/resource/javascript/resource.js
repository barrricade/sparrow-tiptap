import { mergeAttributes, Node } from '@tiptap/core'
import { ResourceComponent } from '../components/resource.jsx'
import { ReactNodeViewRenderer } from '@tiptap/react'

// TODO: 添加回车键的逻辑
// TODO(2023-12-24): 添加tooltip，修改image的放大缩小逻辑
export const Resource =
  Node.create({
    name: 'resource',
    group: 'inline',
    content: 'inline*',
    inline: true,
    //     priority: 1000,
    addOptions () {
      return {
        uploadApi: ''
      }
    },
    parseHTML () {
      return [
        {
          tag: 'span[data-resource]'
        }
      ]
    },
    addAttributes () {
      return {
        id: {
          default: '',
          parseHTML: (element) => element.getAttribute('data-resource-id'),
          renderHTML: (attributes) => ({ 'data-resource-id': attributes.id })
        },
        sync_mode: {
          default: 'master',
          parseHTML: (element) => element.getAttribute('data-resource-sync-mode'),
          renderHTML: (attributes) => ({ 'data-resource-sync-mode': attributes.sync_mode })
        },
        failed: {
          default: '',
          renderHTML: (attributes) => ({})
        },
        opts: {
          default: {}
        }
      }
          },
    // TODO: 新建commands文件夹
    addCommands () {
      return {
        insertResource: (opts, pos = null) => ({ tr, commands, dispatch }) => {
          if (dispatch) {
            if (pos) {
              return commands.insertContentAt(pos, {
                type: this.name,
                attrs: opts,
                content: []
              })
            }
            return commands.insertContent({
              type: this.name,
              attrs: opts,
              content: []
            })
          }
          return true
        }
      }
    },
    renderHTML ({ HTMLAttributes }) {
      return ['span', mergeAttributes(HTMLAttributes, { 'data-resource': true }), 0]
    },
    addNodeView () {
      return ReactNodeViewRenderer(ResourceComponent, { contentDOMElementTag: 'span' })
      // return ({ node, getPos, editor }) => {
        // console.log(node, getPos())
        // const dom = document.createElement('span')
        // dom.setAttribute('contenteditable', 'false')
        // dom.classList.add('relative', 'inline', 'h-auto')
        // if (node.attrs.failed) {
        //   const container = document.createElement('div')
        //   container.classList.add('flex', 'flex-col', 'justify-center', 'items-center', 'w-20', 'h-20', 'space-y-1')
        //   const icon = document.createElement('div')
        //   icon.innerHTML = FileFailed({ size: 30 })
        //   const text = document.createElement('div')
        //   text.innerHTML = node.attrs.failed
        //   container.append(icon, text)
        //   dom.append(container)
        //   return {
        //     dom,
        //     contentDOM: dom
        //   }
        // }
        // const temp = document.createElement('div')
        // temp.classList.add('w-20', 'h-20')
        // const container = document.createElement('div')
        // container.classList.add('absolute', 'z-2', 'top-1/2', 'left-1/2', 'w-20', 'h-20', 'flex', 'items-center', 'justify-center')
        // container.style.transform = 'translate(-50%, -50%)'
        // const spinner = document.createElement('div')
        // spinner.classList.add(
        //   'spinner',
        //   'h-7',
        //   'w-7',
        //   'animate-spin',
        //   'rounded-full',
        //   'border-[3px]',
        //   'border-primary',
        //   'border-r-transparent',
        //   'dark:border-accent',
        //   'dark:border-r-transparent'
        // )
        // container.append(spinner)
        // dom.append(temp, container)
        // const formData = new FormData()
        // formData.append('entity[id]', node.attrs.id)
        // formData.append('entity[sync_mode]', node.attrs.sync_mode)
        // post(editor_partial_sync_dam_desk_files_path, { body: formData }).then((res) => {
        //   if (res.ok) {
        //     res.json.then((data) => {
        //       if (data.type !== 'deleted' && data.type === 'image') {
        //         const image = new Image()
        //         image.src = data.src
        //         image.onload = function () {
        //           const width = this.width
        //           if (node.childCount === 0) {
        //             const insertNode = editor.schema.nodes.image.create({ src: data.src, width })
        //             editor.view.dispatch(editor.view.state.tr.replaceWith(getPos() + 1, getPos() + node.nodeSize, insertNode))
        //           } else {
        //             const insertNode = editor.schema.nodes.image.create({ ...node.firstChild.attrs, src: data.src })
        //             editor.view.dispatch(editor.view.state.tr.replaceWith(getPos() + 1, getPos() + node.nodeSize, insertNode))
        //           }
        //         }
        //       } else {
        //         editor.view.dispatch(editor.view.state.tr.setNodeMarkup(getPos(), null, { ...node.attrs, failed: '资源已删除' }))
        //       }
        //     })
        //   } else {
        //     editor.view.dispatch(editor.view.state.tr.setNodeMarkup(getPos(), null, { ...node.attrs, failed: '加载失败' }))
        //   }
        // })
        // return {
        //   dom,
        //   contentDOM: dom
        // }
      // }
    }
  })
