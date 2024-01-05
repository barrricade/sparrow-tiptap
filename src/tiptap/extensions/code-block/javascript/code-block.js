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
//     addNodeView () {
//       return ({ editor, node, getPos, HTMLAttributes, decorations, extension }) => {
//         // const languages = lowlight.listLanguages()
//         // const dom = document.createElement('pre')
//         // dom.classList.add('is-empty')
//         // const content = document.createElement('code')
//         // content.classList.add(`language-${node.attrs.language}`)
//         // const header = document.createElement('div')
//         // header.classList.add('flex', 'items-center', 'justify-between', 'rounded-t-md', 'px-2', 'pt-6')
//         // const itemList = languages.map((language) => {
//         //   return { name: language }
//         // })
//         // const setLanguage = (language) => {
//         //   editor.view.dispatch(
//         //     editor.view.state.tr.setNodeMarkup(getPos(), undefined, {
//         //       ...node.attrs,
//         //       language
//         //     })
//         //   )
//         // }
//         // const language = dropdown(
//         //   {
//         //     textContent: node.attrs.language,
//         //     selected: node.attrs.language,
//         //     name: '切换代码语言',
//         //     classList: 'flex text-white justify-center align-center items-center p-1 rounded-md text-sm space-x-1 cursor-pointer text-gray-700',
//         //     itemList
//         //   },
//         //   setLanguage
//         // )
//         // const copyButton = buttonView({
//         //   icon: Copy({
//         //     size: 13
//         //   }),
//         //   classList:
//         //     'flex text-white justify-center align-center items-center p-1 rounded-md text-sm space-x-1 cursor-pointer text-gray-700 hover:bg-gray-400/20',
//         //   textContent: '复制'
//         // })
//         // copyButton.addEventListener('click', (event) => {
//         //   event.preventDefault()
//         //   event.stopPropagation()
//         //   copyToClipboard(content.textContent)
//         //   notification({
//         //     text: '复制成功',
//         //     hasCloseBtn: true,
//         //     class: 'success'
//         //   })
//         // })
//         // header.append(language, copyButton)
//         // if (editor.isEditable) {
//         //   dom.addEventListener('mouseover', (event) => {
//         //     header.style.width = `${dom.offsetWidth}px`
//         //     event.stopPropagation()
//         //     tooltip.innerText = ''
//         //     tooltip.append(header)
//         //     tooltip.classList.remove('hidden')
//         //     createPopper(content, tooltip, { placement: 'top-start' })
//         //   })
//         //   dom.addEventListener('click', (event) => {
//         //     event.stopPropagation()
//         //     tooltip.classList.remove('hidden')
//         //   })
//         // }
//         // dom.append(content)
//         // return {
//         //   dom,
//         //   contentDOM: content
//         // }
//       }
//     }
})
