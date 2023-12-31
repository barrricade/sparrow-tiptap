import { EditorProvider } from '@tiptap/react'
import './styles/tiptap.css'
import PropTypes from 'prop-types'
import { StarterKit } from './extensions/index'
export const Stiptap = (props) => {
  const defaultExtensions = [
    StarterKit
  ]
  const finalExtensions = props.extensions || defaultExtensions
  let { onBeforeCreate, onCreate, onUpdate, onSelectionUpdate, onTransaction, onFocus, onBlur, onDestroy, ...editorOptions } = props
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
  return (
    <EditorProvider {...editorOptions} extensions={finalExtensions}></EditorProvider>
  )
}
Stiptap.propTypes = {
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
  className: PropTypes.string
}

export * from '@/tiptap/extensions'
