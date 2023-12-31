import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import { useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import Tippy from '@tippyjs/react'
import PropTypes from 'prop-types'
import Button from '@/components/Button.jsx'
import SvgIcon from '@/components/SvgIcon'
export const DocumentTitleComponent = (props) => {
  const [icon, setIcon] = useState(props.node.attrs.icon || '😁')
  const [visible, setVisible] = useState(false)
  const [showIcon, setShowIcon] = useState(props.node.attrs.showIcon)
  const [showAddIcon, setShowAddIcon] = useState(false)
  const show = () => setVisible(true)
  const hide = () => setVisible(false)
  const selectIcon = (emojiData, event) => {
    setIcon(emojiData.emoji)
    props.updateAttributes({
      icon: emojiData.emoji,
      icon_value: emojiData.imageUrl
    })
  }
  const showEmojiPicker = (event) => {
    show()
  }
  const handleShowEmojiSelector = (event) => {
    setShowIcon(true)
  }
  const handleHideEmojiSelector = (event) => {
    setShowIcon(false)
  }
  const showAddIconButton = (event) => {
    setShowAddIcon(true)
    props.updateAttributes({
      show_icon: true
    })
  }
  const hiddenAddIconButton = (event) => {
    setShowAddIcon(false)
    props.updateAttributes({
      show_icon: false
    })
  }
  return (
    <NodeViewWrapper onMouseEnter={showAddIconButton} onMouseLeave={hiddenAddIconButton}>
      {
        showIcon ? <Button className={`${showAddIcon ? '' : 'invisible'}`} icon={<SvgIcon name="closeSmall" className="w-5 h-5"></SvgIcon>} label='移除表情' onClick={handleHideEmojiSelector}></Button> : <Button className={`${showAddIcon ? '' : 'invisible'}`} icon={<SvgIcon name="emojiHappy" className="w-5 h-5"></SvgIcon>} label='添加表情' onClick={handleShowEmojiSelector}></Button>
      }
      <div className="document_title">
        <Tippy content={<EmojiPicker onEmojiClick={selectIcon} />} appendTo={() => document.body} interactive={true} visible={visible} onClickOutside={hide}>
          <div className={`document_title__icon ${showIcon ? '' : 'hidden'}`} onMouseDown={(event) => event.preventDefault()} onClick={showEmojiPicker}>{icon}</div>
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
