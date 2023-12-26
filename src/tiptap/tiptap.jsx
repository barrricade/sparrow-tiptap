import { EditorProvider } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CustomFloatingMenu from './extensions/CustomFloatingMenu'
import './styles/tiptap.css'
import PropTypes from 'prop-types'

const extensions = [
  StarterKit
]

const Tiptap = (props) => {
  let { onUpdate, ...editorOptions } = props
  editorOptions = Object.assign({
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl p-2'
      }
    },
    onUpdate: (event) => {
      const { editor } = event
      onUpdate && onUpdate(editor)
    }
  }, editorOptions)
  return (
    <EditorProvider {...editorOptions} slotBefore={<CustomFloatingMenu></CustomFloatingMenu>} extensions={extensions}></EditorProvider>
  )
}
export default Tiptap
Tiptap.propTypes = {
  onUpdate: PropTypes.object
}
