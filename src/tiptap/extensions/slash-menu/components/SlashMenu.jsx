import {
  Fragment,
  forwardRef, useEffect, useImperativeHandle,
  useState
} from 'react'
import PropTypes from 'prop-types'
import Tippy from '@tippyjs/react'
import SvgIcon from '@/components/SvgIcon'
// TODO: 目前暂时只支持两层嵌套(嵌套tippy的展开只用了一个state)
const SlashMenu = forwardRef((props, ref) => {
  let timeoutId = null
  const [selectedIndex, setSelectedIndex] = useState('0')
  // 用于记录当前打开的子菜单的父菜单的index
  // const [parentIndex, setParentIndex] = useState('')
  const [visible, setVisible] = useState(false)
  const selectItem = (index) => {
    let descendants = index.split('/')
    let item = props.items[parseInt(descendants[0])]
    descendants = descendants.splice(1, descendants.length)
    descendants.forEach((element, i) => {
      item = item.children[parseInt(element)]
    })
    if (item) {
      props.command(item)
    }
  }

  const upHandler = () => {
    const descendants = selectedIndex.split('/')
    let currentLevelItems = props.items
    if (descendants.length > 1) {
      descendants.slice(0, descendants.length - 1).forEach((element, i) => {
        currentLevelItems = currentLevelItems[parseInt(element)].children
      })
    }
    let newIndex = parseInt(descendants[descendants.length - 1])
    do {
      newIndex = (newIndex + currentLevelItems.length - 1) % currentLevelItems.length
    } while (currentLevelItems[newIndex].type === 'group')
    descendants[descendants.length - 1] = newIndex
    newIndex = descendants.join('/')
    setSelectedIndex(newIndex)
  }

  const downHandler = () => {
    const descendants = selectedIndex.split('/')
    let currentLevelItems = props.items
    if (descendants.length > 1) {
      descendants.slice(0, descendants.length - 1).forEach((element, i) => {
        currentLevelItems = currentLevelItems[parseInt(element)].children
      })
    }
    let newIndex = parseInt(descendants[descendants.length - 1])
    do {
      newIndex = (newIndex + 1) % currentLevelItems.length
    } while (currentLevelItems[newIndex].type === 'group')
    descendants[descendants.length - 1] = newIndex
    newIndex = descendants.join('/')
    setSelectedIndex(newIndex)
  }
  const leftHandler = () => {
    const descendants = selectedIndex.split('/')
    let currentLevelItems = props.items
    let parentLevelItemType = null
    if (descendants.length > 1) {
      descendants.slice(0, descendants.length - 1).forEach((element, i) => {
        if (i === descendants.length - 2) {
          parentLevelItemType = currentLevelItems[parseInt(element)].type
        }
        currentLevelItems = currentLevelItems[parseInt(element)].children
      })
    }
    let newIndex = parseInt(descendants[descendants.length - 1])
    do {
      if (parentLevelItemType === 'submenu') {
        // 打开侧边栏，设置parentIndex
        setVisible(false)
        descendants.pop()
        break
      } else {
        newIndex = (newIndex + currentLevelItems.length - 1) % currentLevelItems.length
        descendants[descendants.length - 1] = newIndex
      }
    } while (currentLevelItems[newIndex].type === 'group')
    newIndex = descendants.join('/')
    setSelectedIndex(newIndex)
  }
  const rightHandler = () => {
    const descendants = selectedIndex.split('/')
    let currentLevelItems = props.items
    if (descendants.length > 1) {
      descendants.slice(0, descendants.length - 1).forEach((element, i) => {
        currentLevelItems = currentLevelItems[parseInt(element)].children
      })
    }
    let newIndex = parseInt(descendants[descendants.length - 1])
    do {
      if (currentLevelItems[newIndex].type === 'submenu') {
        // 打开侧边栏，设置parentIndex
        setVisible(true)
        descendants.push(0)
        break
      } else {
        newIndex = (newIndex + 1) % currentLevelItems.length
        descendants[descendants.length - 1] = newIndex
      }
    } while (currentLevelItems[newIndex].type === 'group')
    newIndex = descendants.join('/')
    setSelectedIndex(newIndex)
  }
  const enterHandler = () => {
    const descendants = selectedIndex.split('/')
    let currentLevelItems = props.items
    if (descendants.length > 1) {
      descendants.slice(0, descendants.length - 1).forEach((element, i) => {
        currentLevelItems = currentLevelItems[parseInt(element)].children
      })
    }
    let newIndex = parseInt(descendants[descendants.length - 1])
    if (currentLevelItems[newIndex].type === 'submenu') {
      setVisible(true)
      descendants.push(0)
      newIndex = descendants.join('/')
      setSelectedIndex(newIndex)
    } else {
      selectItem(selectedIndex)
    }
  }

  useEffect(() => {
    if (props.items.length !== 0) {
      const index = props.items[0].type === 'group' ? '0/0' : '0'
      setSelectedIndex(index)
    }
  }, [props.items])

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === 'ArrowUp') {
        upHandler()
        return true
      }

      if (event.key === 'ArrowDown') {
        downHandler()
        return true
      }
      if (event.key === 'ArrowRight') {
        rightHandler()
        return true
      }
      if (event.key === 'ArrowLeft') {
        leftHandler()
        return true
      }
      if (event.key === 'Enter') {
        enterHandler()
        return true
      }

      return false
    }
  }))
  const itemList = (items, parentKey = '') => {
    return items.map((item, index) => {
      const key = parentKey ? `${parentKey}/${index}` : `${index}`
      if (item.type === 'group') {
        return (
          <Fragment key={key}>
            <div className="slash-menu__group">
              <span>
                {item.label}
              </span>
            </div>
            {itemList(item.children, key)}
          </Fragment>
        )
      } else if (item.type === 'submenu') {
        const submenuItems = () => {
          return (
            <div className='slash-menu'>
              {itemList(item.children, key)}
            </div>
          )
        }
        // TODO: 暂时设置一个timeout解决
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
                className={`slash-menu__item ${key === selectedIndex ? 'slash-menu--is-selected' : ''}`}
                data-key={item.key}
              >
                {item.icon}
                <span>{item.label}</span>
                <div className="slash-menu__submenu-arrow">
                  <SvgIcon name="right" className="h-5 w-5"></SvgIcon>
                </div>
              </div >
            </Tippy >
          </div >)
      } else {
        return (
          <div
            key={key}
            className={`slash-menu__item ${key === selectedIndex ? 'slash-menu--is-selected' : ''}`}
            onClick={(event) => { selectItem(key) }}
            data-key={item.key}
          >
            {item.icon}
            <span>{item.label}</span>
          </div >
        )
      }
    })
  }
  return (
    <div className="slash-menu">
      {props.items.length
        ? itemList(props.items)
        : <div className="slash-menu__item">No result</div>
      }
    </div >
  )
})
SlashMenu.displayName = 'SlashMenu'
export default SlashMenu
SlashMenu.propTypes = {
  items: PropTypes.array,
  command: PropTypes.func
}
