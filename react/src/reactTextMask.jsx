import React, {PropTypes} from 'react'
import createComponent from '../../core/src/createComponent.js'

export const MaskedInput = React.createClass({
  propTypes: {
    mask: PropTypes.string.isRequired,
    guide: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    validator: PropTypes.func
  },

  componentDidMount() {
    const {props: {mask, placeholderCharacter: placeholderChar, guide, validator, value}} = this

    this.control = createComponent({
      inputElement: this.inputElement,
      mask,
      placeholderChar,
      guide,
      validator
    })

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
