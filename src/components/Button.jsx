import PropTypes from 'prop-types'

const Button = ({
  icon,
  onClick,
  className,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      type="button"
      className={`cursor-pointer space-x-1 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100 text-gray-500 rounded-lg text-sm px-1.5 py-1 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2 ${className}`}
    >
      {icon}
      <span>{props.children}</span>
    </div>
  )
}

export default Button
Button.propTypes = {
  icon: PropTypes.element,
  label: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.any
}
