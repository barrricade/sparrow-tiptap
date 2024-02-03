import PropTypes from 'prop-types'
import { useState } from 'react'
const AddLink = ({ editor, pos, hide }) => {
  const linkMark = editor.extensionManager.extensions.filter((extension) => extension.name === 'link')[0]
  const [linkUrl, setLinkUrl] = useState('')
  const [linkTitle, setLinkTitle] = useState('')
  const [validate, setValidate] = useState(false)
  const validateLink = (e) => {
    const href = e.target.value
    setLinkUrl(href)
    if (linkMark.options.validate(href)) {
      setValidate(true)
    }
  }
  const confirm = (event) => {
    event.preventDefault()
    event.stopPropagation()
    const link = `<a href="${linkUrl}">${linkTitle || linkUrl}</a>`
    editor.commands.insertContentAt(pos + 1, link, {
      updateSelection: true,
      parseOptions: {
        preserveWhitespace: 'full'
      }
    })
    hide()
  }
  return (
    <div className="p-4 inline-flex bg-white rounded-lg dark:bg-gray-700 dark:border-gray-600 shadow-lg shadow-slate-200">
      <div className="flex flex-col items-center mr-2 space-y-2">
        <label className="flex items-center h-8 w-8 text-center text-sm font-medium text-gray-900 dark:text-white">文本</label>
        <label className="flex items-center h-8 w-8 text-center text-sm font-medium text-gray-900 dark:text-white">链接</label>
      </div >
      <div className="flex flex-col items-center mr-10 space-y-2">
        <input onChange={(e) => setLinkTitle(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:outline-none focus:border-1 focus:ring-blue-500 focus:border-blue-500 block w-72 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='输入文本' />
        <input onChange={validateLink} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:outline-none focus:border-1 focus:ring-blue-500 focus:border-blue-500 block w-72 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='粘贴或输入链接' />
      </div>
      <div className='flex flex-row justify-end items-end'>
        <button disabled={!validate} onClick={confirm} type="button" className="disabled:bg-gray-400 h-8 flex-shrink-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
          确定
        </button>
      </div>
    </div>
  )
}
export default AddLink
AddLink.propTypes = {
  editor: PropTypes.object,
  pos: PropTypes.number,
  hide: PropTypes.func
}
