import React, {PropTypes} from 'react'
import createTextMaskInputElement from '../../core/src/createTextMaskInputElement.js'

export const MaskedInput = React.createClass({
  propTypes: {
    mask: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
    guide: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    pipe: PropTypes.func,
    placeholderChar: PropTypes.string,
    onAccept: PropTypes.func,
    onReject: PropTypes.func,
    keepCharPositions: PropTypes.bool
  },

  componentDidMount() {
    const {props, props: {value}} = this

    this.control = createTextMaskInputElement({inputElement: this.inputElement, ...props})

    this.control.update(value)
  },

  componentDidUpdate() {
    this.control.update(this.props.value)
  },

  render() {
    const props = {...this.props}

    delete props.mask
    delete props.guide
    delete props.pipe
    delete props.placeholderChar
    delete props.onAccept
    delete props.onReject
    delete props.keepCharPositions

    return (
      <input
        {...props}
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
