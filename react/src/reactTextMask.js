import React from 'react'
import PropTypes from 'prop-types'
import createTextMaskInputElement
  from '../../core/src/createTextMaskInputElement'

export default class MaskedInput extends React.PureComponent {
  constructor(...args) {
    super(...args)

    this.onBlur = this.onBlur.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  initTextMask() {
    const {props, props: {value}} = this

    this.textMaskInputElement = createTextMaskInputElement({
      inputElement: this.inputElement,
      ...props,
    })
    this.textMaskInputElement.update(value)
  }

  componentDidMount() {
    this.initTextMask()
  }

  componentDidUpdate(prevProps) {
    // Getting props affecting value
    const {value, mask, guide, placeholderChar, showMask} = this.props

    // Сalculate that settings was changed:
    // - `pipe` exludes, because it could pass every time in `render` as new function
    // - `keepCharPositions` exludes, because it affect only cursor position
    // - `mask` converting to string, to compare values
    const settings = {guide, placeholderChar, showMask}
    const maskAsArray = typeof mask === 'function' ? mask(value) : mask
    const prevMaskAsArray = typeof prevProps.mask === 'function' ? prevProps.mask(prevProps.value) : prevProps.mask
    const isMaskChanged = maskAsArray.toString() !== prevMaskAsArray.toString()
    const isSettingChanged = Object.keys(settings).some(prop => settings[prop] !== prevProps[prop]) || isMaskChanged

    // Сalculate that value was changed
    const isValueChanged = value !== this.inputElement.value

    // Check value and settings to prevent dublicating update() call
    if (isValueChanged || isSettingChanged) {
      this.initTextMask()
    }
  }

  render() {
    const {render, ...props} = this.props

    delete props.mask
    delete props.guide
    delete props.pipe
    delete props.placeholderChar
    delete props.keepCharPositions
    delete props.value
    delete props.onBlur
    delete props.onChange
    delete props.showMask

    const ref = (inputElement) => (this.inputElement = inputElement)

    return render(ref, {
      onBlur: this.onBlur,
      onChange: this.onChange,
      defaultValue: this.props.value,
      ...props,
    })
  }

  onChange(event) {
    this.textMaskInputElement.update()

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event)
    }
  }

  onBlur(event) {
    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur(event)
    }
  }
}

MaskedInput.propTypes = {
  mask: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func,
    PropTypes.bool,
    PropTypes.shape({
      mask: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
      pipe: PropTypes.func,
    }),
  ]).isRequired,
  guide: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pipe: PropTypes.func,
  placeholderChar: PropTypes.string,
  keepCharPositions: PropTypes.bool,
  showMask: PropTypes.bool,
}

MaskedInput.defaultProps = {
  render: (ref, props) => <input ref={ref} {...props} />
}

export {default as conformToMask} from '../../core/src/conformToMask.js'
