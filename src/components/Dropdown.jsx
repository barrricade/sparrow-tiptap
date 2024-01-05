import SvgIcon from '@/components/SvgIcon.jsx'
import { useState, Fragment, useRef } from 'react'
import Tippy from '@tippyjs/react'
import PropTypes from 'prop-types'
const Dropdown = ({ items: initialItems, onSelectItem, defaultSelected, className }) => {
  let timeoutId
  const [show, setShow] = useState(false)
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState({})
  const [items, setItems] = useState(initialItems)
  const itemRefs = initialItems.map(() => useRef(null))
  const selectItem = (index, key, label) => {
    setSelected({ index, label })
    onSelectItem(key)
    setShow(false)
  }
  const itemList = (items, parentKey = '') => {
    return items.map((item, index) => {
      const key = parentKey ? `${parentKey}/${index}` : `${index}`
      if (item.type === 'group') {
        return (
          <Fragment key={key}>
            <div className="dropdown__menu-content__group">
              <span>
                {item.label}
              </span>
            </div>
            {dropdownMenu(item.children, key)}
          </Fragment>
        )
      } else if (item.type === 'submenu') {
        const submenuItems = () => {
          return (
            <div className='dropdown__menu-content'>
              {dropdownMenu(item.children, key)}
            </div>
          )
        }
        // TODO: 暂时设置一个timeout解决, 鼠标滑动到子菜单时，子菜单不消失
        return (
          <div key={key} onMouseOver={() => {
            if (timeoutId) {
              clearTimeout(timeoutId)
              timeoutId = null
            }
            setVisible(true)
          }} onMouseLeave={() => {
            timeoutId = setTimeout(() => {
              setVisible(false)
            }, 200)
          }}>
            <Tippy
              placement='right'
              visible={visible}
              content={submenuItems()}
              interactive={true}
            >
              <div
                className={`dropdown__menu-content__item ${item.label === selected.label ? 'dropdown__menu-content--is-selected' : ''}`}
                data-key={item.key}
              >
                {item.icon}
                <span>{item.label}</span>
                <div className="dropdown__menu-content__submenu-arrow">
                  <SvgIcon name="right" className="h-5 w-5"></SvgIcon>
                </div>
              </div >
            </Tippy >
          </div >)
      } else {
        return (
          <div
            key={key}
            className={`dropdown__menu-content__item ${item.label === selected.label ? 'dropdown__menu-content--is-selected' : ''}`}
            onClick={(event) => { selectItem(index, item.key, item.label) }}
            data-key={item.key}
            ref={itemRefs[index]}
          >
            {item.icon}
            <span>{item.label}</span>
            {
              item.label === selected.label
                ? (<div className="dropdown__menu-content__submenu-arrow">
                  <SvgIcon name="checkSmall" className="h-5 w-5"></SvgIcon>
                </div>)
                : ''
            }
          </div >
        )
      }
    })
  }
  const searchItem = (event) => {
    const value = event.target.value
    if (value === '') {
      setItems(initialItems)
    } else {
      const result = initialItems.filter((item) => {
        return item.label.includes(value)
      })
      setItems(result)
    }
  }
  const dropdownMenu = () => {
    return (<div className="dropdown__menu">
      <div className="relative border-b-[1px]">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <SvgIcon name="search" className="h-4 w-4"></SvgIcon>
        </div>
        <input onChange={searchItem} className="block w-full p-2 ps-10 text-sm text-gray-900 focus:outline-none  dark:placeholder-gray-400 dark:text-white" placeholder="搜索" required />
      </div>
      <div className='dropdown__menu-container'>
        <div className='dropdown__menu-content'>
          {items.length
            ? itemList(items)
            : <div className="dropdown__menu__item">No result</div>
          }
        </div>
      </div>
    </div >)
  }
  return (
    <>
      <Tippy
        content={dropdownMenu()}
        appendTo={() => document.body}
        interactive={true}
        visible={show}
        placement="bottom-start"
        onClickOutside={() => { setShow(false) }}
        onShown={() => {
          itemRefs[selected.index]?.current?.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        <button onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          setShow(!show)
        }} className="dropdown__selected-button">
          <span>{selected.label || defaultSelected}</span>
          <SvgIcon name="arrowDown" className="h-5 w-5"></SvgIcon>
        </button>
      </Tippy >
    </>
  )
}

export default Dropdown
Dropdown.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      children: PropTypes.array,
      type: PropTypes.string,
      label: PropTypes.string,
      icon: PropTypes.element,
      command: PropTypes.func
    })
  ),
  onSelectItem: PropTypes.func,
  defaultSelected: PropTypes.string,
  className: PropTypes.string
}
