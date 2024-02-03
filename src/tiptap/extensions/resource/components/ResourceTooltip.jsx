import PropTypes from 'prop-types'
const ResourceTooltipComponent = (props) => {
  return (
    <div className="p-4 inline-flex bg-white rounded-lg dark:bg-gray-700 dark:border-gray-600 shadow-lg shadow-slate-200">
      {props.children}
    </div>
  )
}

export default ResourceTooltipComponent
ResourceTooltipComponent.propTypes = {
  children: PropTypes.element
}
