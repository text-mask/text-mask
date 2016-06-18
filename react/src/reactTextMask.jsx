import React, {PropTypes} from 'react'
import maskInput from '../../vanilla/src/vanillaTextMask.js'

export const MaskedInput = React.createClass({
  propTypes: {
    mask: PropTypes.string.isRequired,
    guide: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    validator: PropTypes.func
  },

  componentDidMount() {
    const {props: {mask, placeholderCharacter, guide, validator}} = this

    this.control = maskInput({
      inputElement: this.inputElement,
      mask,
      placeholderCharacter,
      guide,
      validator
    })
  },

  componentWillUnmount() {
    this.control.destroy()
  },

  render() {
    return (
      <input {...this.props} ref={(inputElement) => (this.inputElement = inputElement)}/>
    )
  }
})

export default MaskedInput
