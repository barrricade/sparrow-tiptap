import PropTypes from 'prop-types'
import { useCurrentEditor } from '@tiptap/react'

// TODO: 暂时添加, 后续删除
const EditorInput = (props) => {
  const { editor } = useCurrentEditor()
  return (
    < div className="flex space-x-1 mt-1" >
      <div className='flex-1 border-2 border-gray-200 border-dashed'>
        输入：
        <textarea className='h-48 w-full outline-none' type="text" onChange={(event) => { editor.commands.setContent(event.target.value) }} defaultValue={props.content} />
      </div>
      <div className='flex-1 border-2 border-gray-200 border-dashed'>
        输出：
        <div className='h-48 overflow-auto'>
          {editor.getHTML()}
        </div>
      </div>
    </div >
  )
}

export default EditorInput
EditorInput.propTypes = {
  content: PropTypes.string
}
