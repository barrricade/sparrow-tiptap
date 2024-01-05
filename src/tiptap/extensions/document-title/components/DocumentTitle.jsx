import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import { useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import Tippy from '@tippyjs/react'
import PropTypes from 'prop-types'
import Button from '@/components/Button.jsx'
import SvgIcon from '@/components/SvgIcon'
export const DocumentTitleComponent = (props) => {
  const defaultIcon = 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f600.png'
  const [icon, setIcon] = useState(props.node.attrs.icon)
  const [visible, setVisible] = useState(false)
  const [showAddIcon, setShowAddIcon] = useState(false)
  const show = () => setVisible(true)
  const hide = () => setVisible(false)
  const selectIcon = (emojiData, event) => {
    setIcon(emojiData.imageUrl)
    props.updateAttributes({
      icon: emojiData.imageUrl
    })
  }
  const showEmojiPicker = (event) => {
    show()
  }
  const handleShowEmojiSelector = (event) => {
    setIcon(defaultIcon)
    props.updateAttributes({
      icon: defaultIcon
    })
  }
  const handleHideEmojiSelector = (event) => {
    setIcon('')
    props.updateAttributes({
      icon: ''
    })
  }
  const showAddIconButton = (event) => {
    setShowAddIcon(true)
  }
  const hiddenAddIconButton = (event) => {
    setShowAddIcon(false)
  }
  return (
    <NodeViewWrapper onMouseEnter={showAddIconButton} onMouseLeave={hiddenAddIconButton}>
      {
        icon ? <Button className={`${showAddIcon ? '' : 'invisible'}`} icon={<SvgIcon name="closeSmall" className="w-5 h-5"></SvgIcon>} onClick={handleHideEmojiSelector}>移除表情</Button> : <Button className={`${showAddIcon ? '' : 'invisible'}`} icon={<SvgIcon name="emojiHappy" className="w-5 h-5"></SvgIcon>} onClick={handleShowEmojiSelector}>添加表情</Button>
      }
      <div className="document_title">
        <Tippy content={<EmojiPicker onEmojiClick={selectIcon} />} appendTo={() => document.body} interactive={true} visible={visible} onClickOutside={hide}>
          <div className={`document_title__icon ${icon ? '' : 'hidden'}`} onMouseDown={(event) => event.preventDefault()} onClick={showEmojiPicker}>
            <img className="w-9 h-9" src={icon} alt="" />
          </div>
        </Tippy>
        <NodeViewContent className="document_title__content" data-placeholder={props.node.attrs.placeholder} />
      </div>
    </NodeViewWrapper >
  )
}
DocumentTitleComponent.propTypes = {
  node: PropTypes.object,
  updateAttributes: PropTypes.func
}
