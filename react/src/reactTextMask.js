import React, {PropTypes} from 'react'
import createTextMaskInputElement from '../../core/src/createTextMaskInputElement'

export const MaskedInput = React.createClass({
  propTypes: {
    mask: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.func,
      PropTypes.bool,
      PropTypes.shape({
        mask: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
        pipe: PropTypes.func
      })
    ]).isRequired,
    guide: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    pipe: PropTypes.func,
    placeholderChar: PropTypes.string,
    keepCharPositions: PropTypes.bool,
    showMask: PropTypes.bool
  },

  createTextMaskInputElement,

  initTextMask() {
    const {props, props: {value}} = this

    this.textMaskInputElement = this.createTextMaskInputElement({inputElement: this.inputElement, ...props})
    this.textMaskInputElement.update(value)
  },

  componentDidMount() {
    this.initTextMask()
  },

  componentDidUpdate() {
    this.initTextMask()
  },

  render() {
    const props = {...this.props}

    delete props.mask
    delete props.guide
    delete props.pipe
    delete props.placeholderChar
    delete props.keepCharPositions
    delete props.value
    delete props.onChange
    delete props.showMask

    return (
      <input
        {...props}
        onInput={this.onChange}
        defaultValue={this.props.value}
        ref={(inputElement) => (this.inputElement = inputElement)}
      />
    )
  },

  onChange(event) {
    this.textMaskInputElement.update()

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event)
    }
  }
})

export default MaskedInput
export {default as conformToMask} from '../../core/src/conformToMask.js'
