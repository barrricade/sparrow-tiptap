import { EditorProvider } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import './styles/tiptap.css'
import PropTypes from 'prop-types'
import SlashMenu from './extensions/slash_menu/javascript/slash-menu.js'
import suggestion from './extensions/slash_menu/javascript/suggestion.js'
const extensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3, 4, 5, 6, 7]
    }
  }),
  SlashMenu.configure({
    suggestion
  })
]

const Tiptap = (props) => {
  let { onUpdate, ...editorOptions } = props
  editorOptions = Object.assign({
    onUpdate: (event) => {
      const { editor } = event
      onUpdate && onUpdate(editor)
    }
  }, editorOptions)
  return (
    <EditorProvider {...editorOptions} extensions={extensions}></EditorProvider>
  )
}
export default Tiptap
Tiptap.propTypes = {
  onUpdate: PropTypes.object
}
