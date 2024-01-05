import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@/components/Button.jsx'
import Dropdown from '@/components/Dropdown.jsx'
import { getItem } from '@/tiptap/utils/dropdown'
import { toast } from 'react-toastify'

export const CodeBlockComponent = (props) => {
  const [show, setShow] = useState(false)
  const showHeader = () => {
    setShow(true)
  }
  const hiddenHeader = () => {
    setShow(false)
  }
  const selectItem = (key) => {
    props.updateAttributes({
      language: key
    })
  }
  const handleCopy = () => {
    const code = props.node.textContent
    navigator.clipboard.writeText(code).then(function () {
      // TODO: 添加提示
      toast.success('复制成功', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: false,
        theme: 'light'
      })
    }, function () {
      /* clipboard write failed */
    })
  }
  const items = () => {
    return props.languages.map((language) => {
      return getItem(language, language)
    })
  }
  return (
    <NodeViewWrapper as='pre' onMouseEnter={showHeader} onMouseLeave={hiddenHeader}>
      <div className={`${show ? '' : 'invisible'} flex justify-between px-3 pt-2 text-white`}>
        <Dropdown defaultSelected={props.node.attrs.language} items={items()} onSelectItem={selectItem}>
        </Dropdown>
        <Button className="bg-black text-white hover:bg-gray-600" onClick={handleCopy}>复制</Button>
      </div>
      <NodeViewContent as='code' className={`language-${props.node.attrs.language}`} data-placeholder={props.node.attrs.placeholder}>
      </NodeViewContent>
    </NodeViewWrapper >
  )
}
CodeBlockComponent.propTypes = {
  node: PropTypes.object,
  updateAttributes: PropTypes.func,
  languages: PropTypes.array
}
