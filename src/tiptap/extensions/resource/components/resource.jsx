import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import { useState, useRef } from 'react'
import AddLink from '@/components/AddLink.jsx'
import PropTypes from 'prop-types'
import Tippy from '@tippyjs/react'
import ResourceTooltipComponent from './ResourceTooltip.jsx'
// TODO: 添加链接修改等功能
const ResourceTooltip = (props) => {
  if (props.content === 'addLink') {
    console.log('addLink', props.hideAddLink)
    return (
      <AddLink editor={props.editor} pos={props.pos} hide={props.hideAddLink}></AddLink>
    )
  }
  return (
    <ResourceTooltipComponent>
      <div>123123</div>
    </ResourceTooltipComponent>
  )
}
export const ResourceComponent = (props) => {
  const ref = useRef()
  const [isAddLinkVisible, setIsAddLinkVisible] = useState(true)
  const [isTooltipVisible, setIsTooltipVisible] = useState(true)
  // const showAddLink = () => setIsAddLinkVisible(true)
  const hideTooltip = () => { setIsTooltipVisible(false) }
  const showTooltip = () => setIsTooltipVisible(true)
  const hideAddLink = () => { hideTooltip(); setIsAddLinkVisible(false) }
  const handleMouseLeave = () => {
    // if (!isAddLinkVisible) {
    //   hideAddLink()
    // }
  }
  const handleMouseEnter = () => {
    // setIsAddLinkVisible(false)
    showTooltip()
  }
  return (
    <NodeViewWrapper ref={ref} className="inline" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {/* 点击添加链接后触发 */}
      <Tippy reference={ref}
        content={<ResourceTooltip content={isAddLinkVisible ? 'addLink' : ''} hideAddLink={hideAddLink} editor={props.editor} pos={props.getPos()} />}
        placement={isAddLinkVisible ? 'bottom-start' : 'top'}
        appendTo={() => document.body}
        interactive={true}
        visible={isTooltipVisible}
        onClickOutside={hideTooltip} />
      <NodeViewContent className="inline" />
    </NodeViewWrapper >
  )
}
ResourceComponent.propTypes = {
  node: PropTypes.object,
  editor: PropTypes.object,
  updateAttributes: PropTypes.func,
  getPos: PropTypes.func
}
ResourceTooltip.propTypes = {
  content: PropTypes.string,
  editor: PropTypes.object,
  pos: PropTypes.number,
  hideAddLink: PropTypes.func
}
