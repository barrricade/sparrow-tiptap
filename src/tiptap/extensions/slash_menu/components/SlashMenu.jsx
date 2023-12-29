import {
  forwardRef, useEffect, useImperativeHandle,
  useState
} from 'react'
import SvgIcon from '@/components/SvgIcon'
import PropTypes from 'prop-types'

const SlashMenu = forwardRef((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectItem = index => {
    const item = props.items[index]
    if (item) {
      props.command(item)
    }
  }

  const upHandler = () => {
    let newIndex = selectedIndex
    do {
      newIndex = (newIndex + props.items.length - 1) % props.items.length
    } while (props.items[newIndex].type === 'group')
    setSelectedIndex(newIndex)
  }

  const downHandler = () => {
    let newIndex = selectedIndex
    do {
      newIndex = (newIndex + 1) % props.items.length
    } while (props.items[newIndex].type === 'group')
    setSelectedIndex(newIndex)
  }

  const enterHandler = () => {
    selectItem(selectedIndex)
  }

  useEffect(() => {
    const index = props.items.findIndex(item => item.type !== 'group')
    setSelectedIndex(index)
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

      if (event.key === 'Enter') {
        enterHandler()
        return true
      }

      return false
    }
  }))
  return (
    <div className="slash-menu">
      {props.items.length
        ? props.items.map((item, index) => {
          if (item.type === 'group') {
            return (
              <div key={index} className="slash-menu__group">{item.label}</div>
            )
          } else {
            return (
              <div
                key={index}
                className={`slash-menu__item ${index === selectedIndex ? 'slash-menu--is-selected' : ''}`}
                onClick={(event) => { selectItem(index) }}
                data-key={item.key}
              >
                {item.icon && <SvgIcon name={item.icon} className="slash-menu__icon" />}
                <span>{item.label}</span>
              </div >
            )
          }
        })
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
