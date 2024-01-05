import { EditorProvider } from '@tiptap/react'
import './styles/tiptap.css'
import 'react-toastify/dist/ReactToastify.css'
import PropTypes from 'prop-types'
import { StarterKit } from './extensions/index'
import EditorInput from '@/components/EditorInput.jsx'
import { ToastContainer } from 'react-toastify'
export const Stiptap = (props) => {
  const defaultExtensions = [
    StarterKit
  ]
  const finalExtensions = props.extensions || defaultExtensions
  let { content, outputFormat, getOutput, editable, onBeforeCreate, onCreate, onUpdate, onSelectionUpdate, onTransaction, onFocus, onBlur, onDestroy, ...editorOptions } = props
  editorOptions = Object.assign({
    editorProps: {
      attributes: {
        class: props.className
      }
    },
    onBeforeCreate: (event) => {
      onBeforeCreate && onBeforeCreate(event)
    },
    onCreate: (event) => {
      onCreate && onCreate(event)
    },
    onUpdate: (event) => {
      getOutput(
        outputFormat === 'json' ? JSON.stringify(event.editor.getJSON()) : event.editor.getHTML()
      )
      onUpdate && onUpdate(event)
    },
    onSelectionUpdate: (event) => {
      onSelectionUpdate && onSelectionUpdate(event)
    },
    onTransaction: (event) => {
      onTransaction && onTransaction(event)
    },
    onFocus: (event) => {
      onFocus && onFocus(event)
    },
    onBlur: (event) => {
      onBlur && onBlur(event)
    },
    onDestroy: (event) => {
      onDestroy && onDestroy(event)
    }
  }, editorOptions)
  // TODO: 暂时添加, 后续删除slotAfter
  return (
    <div>
      <ToastContainer />
      <EditorProvider {...editorOptions} slotAfter={<EditorInput content={content} />} extensions={finalExtensions} content={content}></EditorProvider>
    </div>
  )
}
Stiptap.propTypes = {
  content: PropTypes.string,
  outputFormat: PropTypes.oneOf(['json', 'html']),
  getOutput: PropTypes.func,
  onBeforeCreate: PropTypes.func,
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
  onSelectionUpdate: PropTypes.func,
  onTransaction: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onDestroy: PropTypes.func,
  slashMenu: PropTypes.object,
  extensions: PropTypes.array,
  className: PropTypes.string,
  editable: PropTypes.bool
}

export * from '@/tiptap/extensions'
