import React, {PropTypes} from 'react'
import createTextMaskInputElement from '../../core/src/createTextMaskInputElement.js'

export const MaskedInput = React.createClass({
  propTypes: {
    mask: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    guide: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    validator: PropTypes.func
  },

  componentDidMount() {
    const {props, props: {placeholderCharacter: placeholderChar, value}} = this

    this.control = createTextMaskInputElement(Object.assign({
      inputElement: this.inputElement,
      placeholderChar,
    }, props))

    this.control.update(value)
  },

  componentDidUpdate() {
    this.control.update(this.props.value)
  },

  render() {
    return (
      <input
        {...this.props}
        onChange={this.onChange}
        ref={(inputElement) => (this.inputElement = inputElement)}
      />
    )
  },

  onChange(event) {
    this.control.update()

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event)
    }
  }
})

export default MaskedInput
